/**
 * Per-card glass. A Lit ReactiveController that bakes the refracted wallpaper
 * into the card's `canvas.hv-bake`, and re-bakes when the card is added,
 * moved (edit-mode drag, layout change, scroll), resized, or when the
 * wallpaper / theme / device pixel ratio changes.
 */
import type { ReactiveController, ReactiveControllerHost } from "lit";
import { bake, boxBlur, crop, meanLuminance, scrimAlpha } from "./bake.ts";
import { backdropFor, findViewBackground, type Backdrop } from "./backdrop.ts";
import { buildMap, glassParams, type GlassParams, type MapImage } from "./map.ts";
import { filterMarkup, supportsLive } from "./live.ts";

export type GlassMode = "auto" | "baked" | "live" | "frost";

export interface GlassOptions {
  glass?: GlassMode;
  wallpaper?: string;
  bevel?: number;
  refraction?: number;
  aberration?: number;
  frost?: number;
}

type Host = ReactiveControllerHost & HTMLElement & { renderRoot: HTMLElement | DocumentFragment };

export interface BakeTiming {
  card: string;
  w: number;
  h: number;
  ms: number;
}

/** Debug/measurement hook: window.homeview.timings */
const stats = ((window as unknown as { homeview?: { timings: BakeTiming[] } }).homeview ??= { timings: [] });

const maps = new Map<string, MapImage>();
function getMap(w: number, h: number, p: GlassParams, k: number): MapImage {
  const key = [w, h, p.radius.toFixed(1), p.bevel, k].join("|");
  let m = maps.get(key);
  if (!m) {
    m = buildMap(w, h, p.radius, p.bevel, k);
    if (maps.size > 24) maps.delete(maps.keys().next().value as string);
    maps.set(key, m);
  }
  return m;
}

// one bake per animation frame keeps the UI responsive when many cards bake at once
const queue = new Set<GlassController>();
let pumping = false;
function pump(): void {
  if (pumping) return;
  pumping = true;
  requestAnimationFrame(() => {
    pumping = false;
    const t0 = performance.now();
    for (const c of queue) {
      queue.delete(c);
      c.bakeNow();
      if (performance.now() - t0 > 12) break;
    }
    if (queue.size) pump();
  });
}

const reducedTransparency = (): boolean => matchMedia("(prefers-reduced-transparency: reduce)").matches;

export class GlassController implements ReactiveController {
  mode: "baked" | "live" | "frost" = "frost";
  private host: Host;
  private opts: GlassOptions = {};
  private shape: "rect" | "circle" = "rect";
  private backdrop: Backdrop | null = null;
  private unsub?: () => void;
  private ro?: ResizeObserver;
  private poll = 0;
  private lastKey = "";
  private onScroll = (): void => this.request();

  constructor(host: Host, shape: "rect" | "circle" = "rect") {
    this.host = host;
    this.shape = shape;
    host.addController(this);
  }

  setOptions(opts: GlassOptions): void {
    const changed = JSON.stringify(opts) !== JSON.stringify(this.opts);
    this.opts = { ...opts };
    if (changed && this.host.isConnected) this.attach();
  }

  hostConnected(): void {
    // wait one frame: our ancestors (and the view background) are in place by then
    requestAnimationFrame(() => this.attach());
    window.addEventListener("scroll", this.onScroll, { capture: true, passive: true });
    window.addEventListener("resize", this.onScroll, { passive: true });
    this.poll = window.setInterval(() => this.request(), 700);
  }

  hostDisconnected(): void {
    this.detach();
    window.removeEventListener("scroll", this.onScroll, { capture: true });
    window.removeEventListener("resize", this.onScroll);
    clearInterval(this.poll);
    this.ro?.disconnect();
    this.ro = undefined;
    queue.delete(this);
  }

  hostUpdated(): void {
    const card = this.card();
    if (card && !this.ro) {
      this.ro = new ResizeObserver(() => this.request());
      this.ro.observe(card);
    }
    this.request();
  }

  private card(): HTMLElement | null {
    return (this.host.renderRoot as ParentNode).querySelector(".hv-glass");
  }

  private canvas(): HTMLCanvasElement | null {
    return (this.host.renderRoot as ParentNode).querySelector("canvas.hv-bake");
  }

  private detach(): void {
    this.unsub?.();
    this.unsub = undefined;
    this.backdrop?.setWallpaper(this, undefined);
    this.backdrop = null;
  }

  private attach(): void {
    if (!this.host.isConnected) return;
    this.detach();
    const bg = findViewBackground(this.host);
    this.backdrop = bg ? backdropFor(bg) : null;
    const wp = this.opts.wallpaper ?? "champagne";
    if (this.backdrop && wp !== "view" && wp !== "none") this.backdrop.setWallpaper(this, wp, this.opts.wallpaper !== undefined);
    if (this.backdrop) this.unsub = this.backdrop.subscribe(() => this.request(true));
    this.lastKey = "";
    this.request(true);
  }

  /** Schedule a bake if the geometry or backdrop changed (cheap to call often). */
  request(force = false): void {
    if (force) this.lastKey = "";
    if (!this.host.isConnected || !this.card()) return; // e.g. the photo card has no glass surface
    if (this.key() === this.lastKey) return;
    queue.add(this);
    pump();
  }

  private geometry(): { x: number; y: number; w: number; h: number } | null {
    const card = this.card();
    if (!card) return null;
    const w = card.offsetWidth;
    const h = card.offsetHeight;
    if (w < 8 || h < 8) return null;
    const r = card.getBoundingClientRect();
    // centre-based so a pressed (scaled) card still maps to its resting position
    return { x: r.x + r.width / 2 - w / 2, y: r.y + r.height / 2 - h / 2, w, h };
  }

  private key(): string {
    const g = this.geometry();
    if (!g) return "none";
    const o = this.backdrop?.origin() ?? { x: 0, y: 0 };
    return [Math.round(g.x - o.x), Math.round(g.y - o.y), g.w, g.h, this.backdrop?.snapshot?.version ?? -1,
      this.mode, JSON.stringify(this.opts)].join("|");
  }

  private params(w: number, h: number): GlassParams {
    const card = this.card()!;
    const ref = Math.max(110, Math.min(260, Math.min(w, h)));
    const radius = this.shape === "circle" ? Math.min(w, h) / 2 : parseFloat(getComputedStyle(card).borderTopLeftRadius) || 0;
    return glassParams(ref, radius, this.opts);
  }

  private resolveMode(): "baked" | "live" | "frost" {
    const want = this.opts.glass ?? "auto";
    if (reducedTransparency() || want === "frost") return "frost";
    if (want === "live") return supportsLive() ? "live" : "frost";
    return this.backdrop?.snapshot ? "baked" : "frost";
  }

  bakeNow(): void {
    const card = this.card();
    const canvas = this.canvas();
    const g = this.geometry();
    // wait for the size-relative radius from the card's sizer (it re-requests a bake)
    if (!card || !canvas || !g || !card.style.getPropertyValue("--hv-radius")) return;
    this.mode = this.resolveMode();
    this.lastKey = this.key();
    card.dataset.glass = this.mode;
    if (this.mode !== "live") card.style.removeProperty("backdrop-filter");
    if (this.mode === "frost") {
      card.style.setProperty("--hv-tint-rgb", "84 74 64");
      card.style.setProperty("--hv-tint-a", ".28");
      return;
    }
    const p = this.params(g.w, g.h);
    if (this.mode === "live") {
      this.applyLive(card, g.w, g.h, p);
      return;
    }
    const t0 = performance.now();
    const snap = this.backdrop!.snapshot!;
    const k = snap.k;
    const o = this.backdrop!.origin();
    const map = getMap(g.w, g.h, p, k);
    const sigma = p.frost * k;
    const pad = Math.ceil((p.scale + p.aberration) * k + sigma * 3 + 2);
    const ox = Math.round((g.x - o.x) * k) - pad;
    const oy = Math.round((g.y - o.y) * k) - pad;
    const region = boxBlur(crop(snap.pixels, ox, oy, map.width + 2 * pad, map.height + 2 * pad), sigma);
    const out = bake(region, map, pad, pad, p, k);
    canvas.width = out.width;
    canvas.height = out.height;
    canvas.getContext("2d")!.putImageData(new ImageData(out.data, out.width, out.height), 0, 0);
    // keep white ink legible: smoky tint sized to the wallpaper under this card
    const lum = meanLuminance(out);
    if (lum < 0.18) {
      card.style.setProperty("--hv-tint-rgb", "255 255 255");
      card.style.setProperty("--hv-tint-a", ".13");
    } else {
      card.style.setProperty("--hv-tint-rgb", "84 74 64");
      card.style.setProperty("--hv-tint-a", String(Math.max(0.13, scrimAlpha(lum)).toFixed(3)));
    }
    stats.timings.push({ card: this.host.localName, w: g.w, h: g.h, ms: Math.round(performance.now() - t0) });
    if (stats.timings.length > 200) stats.timings.splice(0, 100);
  }

  private applyLive(card: HTMLElement, w: number, h: number, p: GlassParams): void {
    const k = Math.min(window.devicePixelRatio || 1, 2);
    const map = getMap(w, h, p, k);
    const c = document.createElement("canvas");
    c.width = map.width;
    c.height = map.height;
    c.getContext("2d")!.putImageData(new ImageData(map.data, map.width, map.height), 0, 0);
    const url = c.toDataURL("image/png");
    const id = `hv-${Math.random().toString(36).slice(2, 9)}`; // fresh id: browsers cache filter output by id
    const root = this.host.renderRoot as ParentNode;
    let svg = root.querySelector("svg.hv-filters");
    if (!svg) {
      svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("class", "hv-filters");
      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("style", "position:absolute;width:0;height:0;overflow:hidden");
      (this.host.renderRoot as Node).appendChild(svg);
    }
    svg.innerHTML = filterMarkup(id, url, w, h, p);
    const bf = `url(#${id}) saturate(1.25) brightness(1.03)`;
    card.style.setProperty("backdrop-filter", bf);
    card.style.setProperty("-webkit-backdrop-filter", bf);
    card.style.setProperty("--hv-tint-rgb", "255 255 255");
    card.style.setProperty("--hv-tint-a", ".13");
  }
}
