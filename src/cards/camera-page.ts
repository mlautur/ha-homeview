/**
 * The camera card's page mode (`entities:`): one live camera filling the card edge to edge, made for
 * a panel view. Swipe left / right (or the arrow keys) for the next / previous camera, wrapping
 * around; the grid button picks one from all of them; the speaker unmutes; the home button leaves
 * for another view. Only the camera on screen streams, and only while the page is visible.
 */
import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { keyed } from "lit/directives/keyed.js";
import { friendlyName, isUnavailable, type Hass } from "../ha.ts";
import { ICONS } from "../icons.ts";
import { cameraPages, cropTop, pickerColumns, within, wrap, type CameraPage } from "../logic.ts";
import { trackGestures } from "../util/gesture.ts";
import { SLIDE_MS } from "./photo-stage.ts";

/** the page's part of the camera card's config */
export interface CameraPageConfig {
  entities?: unknown[];
  crop_top?: number;
  /** where the home button goes (default: the dashboard's first view) */
  home_path?: string;
}

/** space between two cameras while one slides in, as in the photo frame */
const GAP = 16;
/** the picker keeps clear of the page's controls (52 px buttons 14 px in, plus room) */
const PICKER_PAD = { x: 88, y: 76 };
const TILE_GAP = 16;

type CardHelpers = { createCardElement(config: Record<string, unknown>): HTMLElement };

/**
 * Home Assistant's camera player (`ha-camera-stream`) is loaded with its picture cards. Load it
 * through the card helpers if no card on this dashboard has yet; false when it cannot be had.
 */
export async function cameraPlayer(entity: string): Promise<boolean> {
  if (customElements.get("ha-camera-stream")) return true;
  try {
    const load = (window as unknown as { loadCardHelpers?: () => Promise<CardHelpers> }).loadCardHelpers;
    if (!load) return false; // not inside Home Assistant's frontend
    (await load()).createCardElement({ type: "picture-entity", entity, camera_view: "live" });
    await within(customElements.whenDefined("ha-camera-stream"), 5000);
    return true;
  } catch {
    return false;
  }
}

export class HomeViewCameraPage extends LitElement {
  static properties = {
    hass: { attribute: false },
    config: { attribute: false },
    _cur: { state: true },
    _drag: { state: true },
    _slide: { state: true },
    _still: { state: true },
    _picker: { state: true },
    _muted: { state: true },
    _seen: { state: true },
    _player: { state: true },
    _box: { state: true },
  };
  hass?: Hass;
  config?: CameraPageConfig;
  /** the camera on screen */
  private _cur = 0;
  /** how far (px) a drag has moved the cameras */
  private _drag = 0;
  /** 1 / -1 while the next / previous camera slides in */
  private _slide = 0;
  /** no transition: the cameras jump (during a drag, and when a slide is done) */
  private _still = false;
  private _picker = false;
  private _muted = true;
  /** the page is on screen: false while another view, a hidden section or a hidden tab covers it */
  private _seen = false;
  /** undefined while loading Home Assistant's player; false falls back to the MJPEG stream */
  private _player?: boolean;
  private _box = { w: 0, h: 0 };
  /** when the snapshots of the cameras beside this one were taken (refreshed when the page comes into view and when the picker opens) */
  private stamp = Date.now();
  private slideTimer = 0;
  private asked = false;
  /** the page intersects the viewport (not display:none, not scrolled away) */
  private inView = false;
  private untrack?: () => void;
  private watchers?: { io: IntersectionObserver; ro: ResizeObserver };

  private get cams(): CameraPage[] {
    return cameraPages(this.config?.entities);
  }

  /** percent hidden at the top of every camera, 0-20 */
  private get crop(): number {
    return cropTop(this.config?.crop_top);
  }

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener("visibilitychange", this.onVisible);
    if (this.hasUpdated) this.watch();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener("visibilitychange", this.onVisible);
    this.untrack?.();
    this.untrack = undefined;
    this.watchers?.io.disconnect();
    this.watchers?.ro.disconnect();
    this.watchers = undefined;
    this.finishSlide();
    // back to the dashboard later: muted, no picker
    this._muted = true;
    this._picker = false;
    this.inView = false;
    this._seen = false;
  }

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has("config")) this._cur = wrap(this._cur, this.cams.length);
    if (!this.asked && this.cams.length && this.hass) {
      this.asked = true;
      void cameraPlayer(this.cams[0].entity).then((ok) => (this._player = ok));
    }
  }

  protected firstUpdated(): void {
    this.watch();
  }

  /** follow the page's size and whether it is on screen, and take its drags */
  private watch(): void {
    const stage = this.renderRoot.querySelector<HTMLElement>(".stage");
    if (!stage || this.watchers) return;
    const io = new IntersectionObserver(([e]) => {
      this.inView = e.isIntersecting;
      this.setSeen();
    });
    const ro = new ResizeObserver(([e]) => (this._box = { w: e.contentRect.width, h: e.contentRect.height }));
    io.observe(this);
    ro.observe(stage);
    this.watchers = { io, ro };
    this.untrack = trackGestures(stage, { move: (dx) => this.dragTo(dx), end: (g) => this.dragEnd(g) }, false);
  }

  private setSeen(): void {
    const on = this.inView && document.visibilityState !== "hidden";
    if (on === this._seen) return;
    this._seen = on;
    if (!on) this._muted = true; // auto-mute when hidden: it never comes back with sound
    else this.stamp = Date.now();
  }

  private onVisible = (): void => this.setSeen();

  // ---- moving between cameras ----

  private dragTo(dx: number): void {
    if (this._picker) return;
    this.finishSlide();
    this._still = true;
    this._drag = this.cams.length < 2 ? dx / 3 : dx; // a single camera resists
  }

  private dragEnd(g: string | null): void {
    if (this._picker) return;
    if ((g === "left" || g === "right") && this.cams.length > 1) return this.step(g === "left" ? 1 : -1);
    this._still = false;
    this._drag = 0;
  }

  /** slide to the next (1) or previous (-1) camera */
  private step(dir: 1 | -1): void {
    if (this.cams.length < 2) return;
    if (this._slide) {
      // a second swipe while the last camera still slides in: land that one first, then slide on from it
      this.finishSlide();
      void this.moveAgain().then(() => this.step(dir));
      return;
    }
    clearTimeout(this.slideTimer);
    this._still = false;
    this._drag = 0;
    this._slide = dir;
    this.slideTimer = window.setTimeout(() => this.finishSlide(), SLIDE_MS);
  }

  /** a slide is over: the camera that slid in becomes the one on screen, without moving */
  private finishSlide(): void {
    if (!this._slide) return;
    clearTimeout(this.slideTimer);
    this.show(this._cur + this._slide);
    void this.moveAgain();
  }

  /** after a jump (still), let the cameras move again once the browser has taken in where they are */
  private async moveAgain(): Promise<void> {
    await this.updateComplete;
    this.renderRoot.querySelector(".cam")?.getBoundingClientRect();
    this._still = false;
  }

  /** put camera i on screen at once (the picker, or the end of a slide) */
  private show(i: number): void {
    this._cur = wrap(i, this.cams.length);
    this._slide = 0;
    this._drag = 0;
    this._still = true;
    this._muted = true;
  }

  private togglePicker = (): void => {
    this._picker = !this._picker;
    if (this._picker) this.stamp = Date.now(); // fresh snapshots of every camera
  };

  private pick(i: number): void {
    this.show(i);
    this._picker = false;
    void this.moveAgain().then(() => this.renderRoot.querySelector<HTMLElement>(".grid-btn")?.focus({ preventScroll: true }));
  }

  private goHome = (): void => {
    const path = this.config?.home_path || `/${location.pathname.split("/")[1] ?? ""}`;
    history.pushState(null, "", path);
    window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
  };

  private onKey = (e: KeyboardEvent): void => {
    if (e.key === "Escape" && this._picker) this._picker = false;
    else if (e.key === "ArrowRight" && !this._picker) this.step(1);
    else if (e.key === "ArrowLeft" && !this._picker) this.step(-1);
    else return;
    e.preventDefault();
    e.stopPropagation();
  };

  // ---- drawing ----

  private nameOf(c: CameraPage): string {
    return c.name ?? (this.hass ? friendlyName(this.hass, c.entity) : c.entity);
  }

  private snapshot(c: CameraPage): string {
    const s = this.hass?.states[c.entity];
    const pic = s && !isUnavailable(s) ? (s.attributes.entity_picture as string | undefined) : undefined;
    return pic && this.hass ? this.hass.hassUrl(`${pic}${pic.includes("?") ? "&" : "?"}hv=${this.stamp}`) : "";
  }

  /** the live player for the camera on screen; keyed, so a new camera or unmuting starts a fresh stream (WebRTC only takes sound it was started with) */
  private stream(c: CameraPage): unknown {
    const s = this.hass?.states[c.entity];
    if (!s || isUnavailable(s) || !this.hass || !this._seen || this._player === undefined || !this._box.h) return nothing;
    // the player sizes its video from the aspect ratio: the frame's, which is taller than the page by the crop
    const ratio = this._box.w / (this._box.h * (1 + this.crop / 100));
    const player = customElements.get("ha-camera-stream") && this._player;
    return keyed(
      `${c.entity}:${this._muted}`,
      player
        ? html`<ha-camera-stream .hass=${this.hass} .stateObj=${s} .muted=${this._muted} .controls=${false} .fitMode=${"cover"} .aspectRatio=${ratio}></ha-camera-stream>`
        : html`<img class="live" src=${this.hass.hassUrl(`/api/camera_proxy_stream/${c.entity}?token=${s.attributes.access_token}`)} alt="" draggable="false" />`,
    );
  }

  /** one camera at `off` from the one on screen (-1, 0, 1) */
  private camAt(off: number): TemplateResult | typeof nothing {
    const cams = this.cams;
    if (off && cams.length < 2) return nothing;
    const c = cams[wrap(this._cur + off, cams.length)];
    const s = this.hass?.states[c.entity];
    const snap = this.snapshot(c);
    const hint = !s ? "Camera not found" : isUnavailable(s) ? "Offline" : "";
    const x = `calc(${off - this._slide} * (100% + ${GAP}px) + ${this._drag}px)`;
    return html`<div class="cam" style="transform:translateX(${x})" aria-hidden=${off ? "true" : "false"}>
      <div class="frame" style="top:${-this.crop}%;height:${100 + this.crop}%">
        ${snap ? html`<img class="snap" src=${snap} alt="" draggable="false" />` : nothing} ${off ? nothing : this.stream(c)}
      </div>
      ${hint ? html`<div class="empty">${ICONS.camera}<span>${hint}</span></div>` : nothing}
    </div>`;
  }

  private picker(): TemplateResult {
    const cams = this.cams;
    // the largest 16:9 tiles that fit between the page's top and bottom controls
    const cols = pickerColumns(cams.length);
    const rows = Math.ceil(cams.length / cols);
    const h = (this._box.h - 2 * PICKER_PAD.y - (rows - 1) * TILE_GAP) / rows;
    const w = Math.max(44, Math.min((h * 16) / 9, (this._box.w - 2 * PICKER_PAD.x - (cols - 1) * TILE_GAP) / cols));
    return html`<div class="picker" role="dialog" aria-label="Cameras" @click=${(e: Event) => e.target === e.currentTarget && (this._picker = false)}>
      <div class="tiles" style="grid-template-columns:repeat(${cols}, ${w}px)">
        ${cams.map((c, i) => {
          const snap = this.snapshot(c);
          const name = this.nameOf(c);
          return html`<button class="tile ${i === this._cur ? "cur" : ""}" aria-label=${name} aria-current=${i === this._cur ? "true" : "false"} @click=${() => this.pick(i)}>
            ${snap ? html`<img src=${snap} alt="" draggable="false" style="top:${-this.crop}%;height:${100 + this.crop}%" />` : html`<span class="tile-icon">${ICONS.camera}</span>`}
            <span class="tile-name">${name}</span>
          </button>`;
        })}
      </div>
    </div>`;
  }

  protected render(): TemplateResult {
    const cams = this.cams;
    if (!cams.length || !this.hass) return html``;
    const c = cams[wrap(this._cur, cams.length)];
    const s = this.hass.states[c.entity];
    const live = !!s && !isUnavailable(s);
    const name = this.nameOf(c);
    const many = cams.length > 1;
    // "swiper": Swipe Navigation (swipes between dashboard views) leaves drags on that class alone,
    // so a swipe here changes the camera, not the view
    return html`<div
      class="stage swiper ${this._still ? "still" : ""}"
      role="region"
      aria-roledescription="carousel"
      aria-label="Cameras: ${name}, ${this._cur + 1} of ${cams.length}"
      tabindex="0"
      @keydown=${this.onKey}
    >
      ${this.camAt(-1)}${this.camAt(0)}${this.camAt(1)}
      <div class="shade top"></div>
      <div class="shade bottom"></div>
      <div class="glass pill" aria-live="polite"><span class="rec ${live ? "on" : ""}"></span><span class="pill-name">${name}</span></div>
      <button class="glass round home" aria-label="Home" @click=${this.goHome}>${ICONS.home}</button>
      ${many
        ? html`<div class="glass dots" aria-hidden="true">${cams.map((_, i) => html`<i class=${i === this._cur ? "cur" : ""}></i>`)}</div>
            <button class="glass round grid-btn" aria-label=${this._picker ? "Close cameras" : "All cameras"} aria-expanded=${this._picker ? "true" : "false"} @click=${this.togglePicker}>
              ${this._picker ? ICONS.close : ICONS.grid}
            </button>`
        : nothing}
      <button class="glass round mute" aria-label=${this._muted ? "Unmute" : "Mute"} @click=${() => (this._muted = !this._muted)}>
        ${this._muted ? ICONS.muted : ICONS.sound}
      </button>
      ${this._picker ? this.picker() : nothing}
    </div>`;
  }

  static styles = css`
    :host([wide]) {
      height: auto;
      aspect-ratio: 2;
    }
    :host {
      display: block;
      height: 100%;
      font-family: -apple-system, "SF Pro Display", "Inter", system-ui, "Segoe UI", Roboto, sans-serif;
      -webkit-font-smoothing: antialiased;
      color: #fff;
    }
    .stage {
      position: relative;
      height: 100%;
      overflow: hidden;
      background: #000;
      outline: none;
      /* every drag is ours: horizontal ones change the camera, and none scrolls or changes the view */
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
    .cam {
      position: absolute;
      inset: 0;
      overflow: hidden;
      transition: transform ${SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    .still .cam {
      transition: none;
    }
    .frame {
      position: absolute;
      left: 0;
      width: 100%;
    }
    .frame > * {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      -webkit-user-drag: none;
      pointer-events: none;
    }
    ha-camera-stream {
      --video-max-height: none;
    }
    .empty {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      font-size: 20px;
      color: rgb(255 255 255 / 0.85);
      background: linear-gradient(180deg, rgb(88 96 104 / 0.55), rgb(40 42 44 / 0.7));
    }
    .empty svg {
      width: 64px;
      height: 64px;
    }
    /* soft shading under the controls, so white glyphs read on a bright picture */
    .shade {
      position: absolute;
      left: 0;
      right: 0;
      height: 110px;
      pointer-events: none;
    }
    .shade.top {
      top: 0;
      background: linear-gradient(rgb(0 0 0 / 0.32), transparent);
    }
    .shade.bottom {
      bottom: 0;
      background: linear-gradient(transparent, rgb(0 0 0 / 0.32));
    }
    /* HomeView frost glass (base.ts), for the controls over the picture */
    .glass {
      position: absolute;
      box-sizing: border-box;
      isolation: isolate;
      border: 0;
      color: #fff;
      background: rgb(84 74 64 / 0.13);
      backdrop-filter: blur(22px) saturate(1.5) brightness(1.04);
      -webkit-backdrop-filter: blur(22px) saturate(1.5) brightness(1.04);
      box-shadow:
        0 0 0 0.75px rgb(60 46 32 / 0.2),
        0 6px 18px rgb(60 45 30 / 0.14);
      text-shadow: 0 1px 3px rgb(40 30 20 / 0.32), 0 0 14px rgb(40 30 20 / 0.14);
    }
    .glass::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      box-shadow:
        inset 0 0 0 1px rgb(255 255 255 / 0.16),
        inset 1.5px 1.5px 0.5px -0.5px rgb(255 255 255 / 0.8),
        inset -1px -1px 0.5px -0.5px rgb(255 255 255 / 0.4),
        inset 0 0 7px rgb(50 38 26 / 0.1);
    }
    .pill {
      left: 20px;
      top: 18px;
      height: 44px;
      max-width: calc(100% - 120px);
      padding: 0 18px 0 14px;
      border-radius: 22px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 17px;
      font-weight: 600;
      white-space: nowrap;
      pointer-events: none;
    }
    .pill-name {
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .rec {
      flex: none;
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: rgb(255 255 255 / 0.5);
    }
    .rec.on {
      background: #ff453a;
      box-shadow: 0 0 8px #ff453a;
    }
    .round {
      width: 52px;
      height: 52px;
      padding: 14px;
      border-radius: 50%;
      cursor: pointer;
      z-index: 3;
      transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .round:active {
      transform: scale(0.9);
      transition-duration: 0.12s;
    }
    .round svg {
      width: 100%;
      height: 100%;
      display: block;
      filter: drop-shadow(0 1px 2px rgb(40 30 20 / 0.35));
    }
    .home {
      right: 20px;
      top: 14px;
    }
    .grid-btn {
      left: 20px;
      bottom: 14px;
    }
    .mute {
      right: 20px;
      bottom: 14px;
    }
    .dots {
      left: 50%;
      bottom: 22px;
      transform: translateX(-50%);
      display: flex;
      gap: 8px;
      padding: 10px 14px;
      border-radius: 14px;
      pointer-events: none;
    }
    .dots i {
      width: 8px;
      height: 8px;
      border-radius: 4px;
      background: rgb(255 255 255 / 0.5);
      transition:
        width 0.3s ease,
        background-color 0.3s ease;
    }
    .dots i.cur {
      width: 22px;
      background: #fff;
    }
    .picker {
      position: absolute;
      inset: 0;
      z-index: 2;
      display: grid;
      place-items: center;
      padding: ${PICKER_PAD.y}px ${PICKER_PAD.x}px;
      background: rgb(0 0 0 / 0.42);
      backdrop-filter: blur(22px) saturate(1.5);
      -webkit-backdrop-filter: blur(22px) saturate(1.5);
      animation: fade 0.25s ease both;
    }
    @keyframes fade {
      from {
        opacity: 0;
      }
    }
    .tiles {
      display: grid;
      gap: ${TILE_GAP}px;
    }
    .tile {
      position: relative;
      aspect-ratio: 16 / 9;
      min-height: 44px;
      overflow: hidden;
      padding: 0;
      border: 0;
      border-radius: 18px;
      background: linear-gradient(180deg, rgb(88 96 104 / 0.55), rgb(40 42 44 / 0.7));
      color: #fff;
      font: inherit;
      cursor: pointer;
      box-shadow:
        inset 0 0 0 0.5px rgb(255 255 255 / 0.35),
        0 6px 18px rgb(0 0 0 / 0.25);
      transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .tile:active {
      transform: scale(0.96);
      transition-duration: 0.12s;
    }
    .tile.cur {
      box-shadow:
        0 0 0 3px #fff,
        0 6px 18px rgb(0 0 0 / 0.25);
    }
    .tile img {
      position: absolute;
      left: 0;
      width: 100%;
      object-fit: cover;
      pointer-events: none;
    }
    .tile-icon {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      color: rgb(255 255 255 / 0.85);
    }
    .tile-icon svg {
      width: 40px;
      height: 40px;
    }
    .tile-name {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 28px 14px 10px;
      text-align: left;
      font-size: 16px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      background: linear-gradient(transparent, rgb(0 0 0 / 0.55));
      text-shadow: 0 1px 3px rgb(0 0 0 / 0.4);
    }
    :focus-visible {
      outline: 2px solid rgb(255 255 255 / 0.9);
      outline-offset: 3px;
    }
    .stage:focus-visible {
      outline-offset: -3px;
    }
    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        transition-duration: 0.01ms !important;
        animation: none !important;
      }
    }
    @media (prefers-reduced-transparency: reduce) {
      .glass,
      .picker {
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
      }
      .glass {
        background: rgb(84 74 64 / 0.85);
      }
      .picker {
        background: rgb(0 0 0 / 0.85);
      }
    }
  `;
}

if (!customElements.get("homeview-camera-page")) customElements.define("homeview-camera-page", HomeViewCameraPage);
