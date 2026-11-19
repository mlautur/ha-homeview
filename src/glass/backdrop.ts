/**
 * The wallpaper the glass refracts is whatever Home Assistant paints in the
 * view's `hui-view-background` (position: fixed or absolute, z-index -1,
 * `background: var(--view-background, var(--lovelace-background, ...))`).
 * We read its computed background and geometry and rasterise exactly that, so
 * a wallpaper set in HA's own view "Background" settings, a theme's
 * `lovelace-background`, or a HomeView card's `wallpaper` option all bake the
 * same way. A card's `wallpaper` option feeds `--lovelace-background`, so a
 * view background chosen in HA's UI still wins.
 */
import type { Pixels } from "./bake.ts";
import { wallpaperCss } from "../wallpapers.ts";

export interface BackdropSnapshot {
  pixels: Pixels;
  /** Backdrop element rect (CSS px, viewport coords) at raster time. */
  x: number;
  y: number;
  /** device px per CSS px */
  k: number;
  /** changes whenever the pixels change */
  version: number;
}

type Listener = () => void;

const instances = new WeakMap<Element, Backdrop>();

const DIALOG = /^(ha-dialog|ha-md-dialog|hui-dialog-|ha-more-info)/;

/** Whether `node` sits in a Home Assistant dialog (card picker, editor preview, more-info). */
export function inDialog(node: Node): boolean {
  for (let cur: Node | null = node; cur; cur = cur instanceof ShadowRoot ? cur.host : cur.parentNode) {
    if (cur instanceof HTMLElement && DIALOG.test(cur.localName)) return true;
  }
  return false;
}

/** Walk up the composed tree from `node` and return the nearest view background element. */
export function findViewBackground(node: Node): HTMLElement | null {
  let cur: Node | null = node;
  while (cur) {
    if (cur instanceof ShadowRoot || cur instanceof Document) {
      const hit = (cur as ParentNode).querySelector("hui-view-background");
      if (hit) return hit as HTMLElement;
    }
    // inside a dialog (card picker / editor preview): no wallpaper behind us
    if (cur instanceof HTMLElement && DIALOG.test(cur.localName)) return null;
    cur = cur instanceof ShadowRoot ? cur.host : cur.parentNode;
  }
  return null;
}

export function backdropFor(el: HTMLElement): Backdrop {
  let b = instances.get(el);
  if (!b) {
    b = new Backdrop(el);
    instances.set(el, b);
  }
  return b;
}

const dpr = (): number => Math.min(window.devicePixelRatio || 1, 2);
const SETTLE_MS = 150;

function parseUrl(bgImage: string): string | null {
  const m = /url\((['"]?)(.*?)\1\)/.exec(bgImage);
  return m ? m[2] : null;
}

/** Resolve CSS background-size / background-position for one image into a draw rect. */
export function backgroundRect(
  boxW: number, boxH: number, imgW: number, imgH: number, size: string, position: string,
): { x: number; y: number; w: number; h: number } {
  let w = imgW;
  let h = imgH;
  const s = size.trim().split(/\s+/);
  if (s[0] === "cover" || s[0] === "contain") {
    const f = s[0] === "cover" ? Math.max(boxW / imgW, boxH / imgH) : Math.min(boxW / imgW, boxH / imgH);
    w = imgW * f;
    h = imgH * f;
  } else if (s[0] !== "auto" || (s[1] && s[1] !== "auto")) {
    const len = (v: string, ref: number): number | null =>
      v === "auto" || v === undefined ? null : v.endsWith("%") ? (parseFloat(v) / 100) * ref : parseFloat(v);
    const sw = len(s[0], boxW);
    const sh = len(s[1] ?? "auto", boxH);
    if (sw !== null && sh !== null) { w = sw; h = sh; }
    else if (sw !== null) { w = sw; h = (imgH * sw) / imgW; }
    else if (sh !== null) { h = sh; w = (imgW * sh) / imgH; }
  }
  const p = position.trim().split(/\s+/);
  const pos = (v: string | undefined, free: number): number => {
    if (!v) return free / 2;
    if (v.endsWith("%")) return (parseFloat(v) / 100) * free || 0; // no -0
    if (v === "left" || v === "top") return 0;
    if (v === "right" || v === "bottom") return free;
    if (v === "center") return free / 2;
    return parseFloat(v) || 0;
  };
  // computed background-position is always two values ("50% 50%", "0px 0px")
  return { x: pos(p[0], boxW - w), y: pos(p[1] ?? "50%", boxH - h), w, h };
}

export class Backdrop {
  readonly el: HTMLElement;
  snapshot: BackdropSnapshot | null = null;
  /** why we cannot refract (gradient background, cross-origin image, ...) */
  failure: string | null = null;
  private listeners = new Set<Listener>();
  private key = "";
  private version = 0;
  private pending: Promise<void> | null = null;
  private recheck = false;
  private timer = 0;
  private settle = 0;
  private ro?: ResizeObserver;
  private mo?: MutationObserver;
  private overrides = new Map<object, { value: string; explicit: boolean }>();

  constructor(el: HTMLElement) {
    this.el = el;
  }

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    if (this.listeners.size === 1) this.start();
    else if (this.snapshot) queueMicrotask(fn);
    return () => {
      this.listeners.delete(fn);
      if (!this.listeners.size) this.stop();
    };
  }

  /**
   * A card asks for a wallpaper (built-in name or image URL); undefined releases it.
   * A card that set `wallpaper` explicitly beats cards that only carry the default.
   */
  setWallpaper(owner: object, value: string | undefined, explicit = true): void {
    if (value) this.overrides.set(owner, { value, explicit });
    else this.overrides.delete(owner);
    const host = this.el.parentElement ?? ((this.el.getRootNode() as ShadowRoot).host as HTMLElement | undefined);
    if (!host) return;
    const all = [...this.overrides.values()];
    const pick = all.find((o) => o.explicit) ?? all[0];
    if (!pick) host.style.removeProperty("--lovelace-background");
    else host.style.setProperty("--lovelace-background", wallpaperCss(pick.value));
    this.check();
  }

  /** Re-read the computed background; re-rasterise if anything that matters changed. */
  check(): void {
    if (this.pending) {
      this.recheck = true;
      return;
    }
    const cs = getComputedStyle(this.el);
    const r = this.el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return;
    const key = [cs.backgroundImage, cs.backgroundSize, cs.backgroundPosition, cs.backgroundColor, cs.opacity,
      Math.round(r.width), Math.round(r.height), dpr()].join("|");
    if (key === this.key) return;
    this.key = key;
    // let the view settle (cards still rendering resize the background) before rasterising
    clearTimeout(this.settle);
    this.settle = window.setTimeout(() => {
      const box = this.el.getBoundingClientRect();
      this.pending = this.raster(getComputedStyle(this.el), box).finally(() => {
        this.pending = null;
        if (this.recheck) {
          this.recheck = false;
          this.check();
        }
      });
    }, SETTLE_MS);
  }

  /** Current offset of the backdrop element (it may scroll when not fixed). */
  origin(): { x: number; y: number } {
    const r = this.el.getBoundingClientRect();
    return { x: r.x, y: r.y };
  }

  private start(): void {
    this.ro = new ResizeObserver(() => this.check());
    this.ro.observe(this.el);
    this.mo = new MutationObserver(() => this.check());
    this.mo.observe(this.el, { attributes: true, attributeFilter: ["style", "class", "fixed-background"] });
    if (this.el.parentElement) this.mo.observe(this.el.parentElement, { attributes: true, attributeFilter: ["style"] });
    // themes and media-source backgrounds change without touching our observers
    this.timer = window.setInterval(() => this.check(), 2000);
    this.check();
  }

  private stop(): void {
    clearTimeout(this.settle);
    this.ro?.disconnect();
    this.mo?.disconnect();
    clearInterval(this.timer);
    this.key = "";
  }

  private async raster(cs: CSSStyleDeclaration, r: DOMRect): Promise<void> {
    const k = dpr();
    const W = Math.max(1, Math.round(r.width * k));
    const H = Math.max(1, Math.round(r.height * k));
    try {
      const canvas = document.createElement("canvas");
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) throw new Error("no 2d context");
      const under = getComputedStyle(document.documentElement).backgroundColor;
      ctx.fillStyle = under && under !== "rgba(0, 0, 0, 0)" ? under : "#111";
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = parseFloat(cs.opacity) || 1;
      ctx.fillStyle = cs.backgroundColor;
      ctx.fillRect(0, 0, W, H);
      const img = cs.backgroundImage;
      if (img && img !== "none") {
        const url = parseUrl(img);
        if (!url || /gradient\(/.test(img.replace(/url\(.*?\)/g, ""))) throw new Error("background is not a plain image");
        const image = await loadImage(url);
        const box = backgroundRect(r.width, r.height, image.naturalWidth || r.width, image.naturalHeight || r.height,
          cs.backgroundSize, cs.backgroundPosition);
        ctx.drawImage(image, box.x * k, box.y * k, box.w * k, box.h * k);
      }
      const data = ctx.getImageData(0, 0, W, H); // throws when tainted (cross-origin without CORS)
      this.failure = null;
      this.snapshot = { pixels: { width: W, height: H, data: data.data }, x: r.x, y: r.y, k, version: ++this.version };
    } catch (e) {
      this.failure = e instanceof Error ? e.message : String(e);
      this.snapshot = null;
    }
    this.listeners.forEach((fn) => fn());
  }
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const abs = new URL(url, location.href);
    if (abs.origin !== location.origin && abs.protocol.startsWith("http")) img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`cannot load background ${url.slice(0, 80)}`));
    img.src = url;
  });
}
