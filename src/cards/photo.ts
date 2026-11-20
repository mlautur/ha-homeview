/**
 * HomeView photo frame: a slideshow of the pictures in a Home Assistant media
 * source folder (local media, a DLNA / Synology / Immich server, ... anything
 * HA's Media panel can browse), read over the media_source websocket API.
 * Swipe left / right for the next / previous picture; tap for a full-screen slideshow.
 */
import { css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { HomeViewCard, glassStyles, type BaseConfig } from "./base.ts";
import { registerCard, type GridOptions } from "../ha.ts";
import type { EditorField } from "../editor.ts";
import { ShownHistory, listImages, mediaFolders, shuffled, within, type Gesture } from "../logic.ts";
import { trackGestures } from "../util/gesture.ts";
import { inDialog } from "../glass/backdrop.ts";
import { SLIDE_MS, emptyStage, stage, stageStyles, type StageState } from "./photo-stage.ts";
import { HomeViewPhotoSlideshow, type SlideshowHost } from "./photo-fullscreen.ts";
import { openOverlay } from "./overlay.ts";

export interface PhotoConfig extends BaseConfig {
  /** one media-source folder, or a list of them: the slideshow cycles through all */
  media: string | string[];
  interval?: number;
  shuffle?: boolean;
  recursive?: boolean;
  fit?: "cover" | "contain";
}

const RELIST_MS = 30 * 60 * 1000;
/** longest wait for one websocket answer or one picture; a normal browse of a 1,500-photo album takes under 1 s */
const ANSWER_MS = 30 * 1000;
/** a folder list that failed is tried again after 10 s, doubling up to 5 min */
const retryMs = (failures: number): number => Math.min(5 * 60 * 1000, 10 * 1000 * 2 ** failures);
/** resolved picture URLs are signed for an hour (expires: 3600); resolve again before that */
const URL_TTL_MS = 50 * 60 * 1000;

/** a picture: its media id, and once fetched, its URL (decoded and ready to show) */
interface Picture {
  id: string;
  url?: string;
  at?: number;
  ready?: boolean;
}

export class HomeViewPhotoCard extends HomeViewCard<PhotoConfig> implements SlideshowHost {
  static properties = { ...HomeViewCard.properties, _stage: { state: true }, _error: { state: true } };
  private _stage: StageState = emptyStage();
  private _error = "";
  private items: string[] = [];
  private index = -1;
  private timer = 0;
  private settleTimer = 0;
  private listedAt = 0;
  private fails = 0;
  private parked = false;
  private loadedFor = "";
  private listRun = 0;
  private listFails = 0;
  /** what has been shown, so "previous" retraces it even when shuffled */
  private shown = new ShownHistory<Picture>();
  /** the next unseen picture, fetched ahead so the timed change and a swipe to it are instant */
  private ahead?: Picture;
  /** the newest picture change; an older one still loading gives way to it */
  private nav = 0;
  private dragging = false;
  private untrack?: () => void;
  private slideshow?: HomeViewPhotoSlideshow;

  static editorFields: EditorField[] = [
    { name: "media", label: "Media folders", required: true, list: true, helper: "One or more media-source folders, e.g. media-source://media_source/local/photos; the slideshow cycles through all of them. Open Media in the sidebar to find a folder; DLNA, Synology Photos and other media servers HA can browse work too.", selector: { text: { multiple: true } } },
    { name: "interval", label: "Seconds per picture", selector: { number: { min: 5, max: 3600, step: 1, mode: "box", unit_of_measurement: "s" } } },
    { name: "shuffle", selector: { boolean: {} } },
    { name: "recursive", label: "Include subfolders", selector: { boolean: {} } },
    { name: "fit", selector: { select: { mode: "dropdown", options: [{ value: "cover", label: "Fill" }, { value: "contain", label: "Fit whole picture" }] } } },
  ];

  static getStubConfig(): Partial<PhotoConfig> {
    return { media: "media-source://media_source/local", interval: 30, recursive: true };
  }

  protected validate(config: PhotoConfig): void {
    const folders = mediaFolders(config.media);
    if (!folders.length || folders.some((m) => !m.startsWith("media-source://"))) throw new Error("Set media to a media-source:// folder, or a list of them");
  }

  getGridOptions(): GridOptions {
    return { columns: 4, rows: "auto", min_columns: 3, min_rows: 2 };
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearTimeout(this.timer);
    this.loadedFor = "";
    this.slideshow?.close(); // the dashboard moved on (another view, or the card was removed)
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (this.hass && this._config) this.requestUpdate();
  }

  protected firstUpdated(changed: PropertyValues): void {
    super.firstUpdated(changed);
    const card = this.renderRoot.querySelector<HTMLElement>("ha-card");
    if (!card || this.untrack) return;
    this.untrack = trackGestures(card, { move: (dx) => this.dragTo(dx), end: (g) => (g === "tap" ? this.openSlideshow() : this.dragEnd(g)) }, false);
  }

  protected updated(changed: PropertyValues): void {
    super.updated?.(changed);
    if (this.slideshow) this.slideshow.state = this._stage;
    this.load();
  }

  /** list the folder for a new config; deferred while hidden so off-screen copies browse nothing */
  private load(): boolean {
    const c = this._config;
    if (!this.hass || !c || !this.onScreen) return false;
    const key = JSON.stringify([mediaFolders(c.media), !!c.recursive, !!c.shuffle]);
    if (key === this.loadedFor) return false;
    this.loadedFor = key;
    this.listFails = 0;
    void this.relist(true);
    return true;
  }

  /** the folder list for the current config; a failed first list is retried (with backoff) instead of leaving the frame empty */
  private async relist(restart: boolean): Promise<void> {
    const c = this._config!;
    const hass = this.hass!;
    const run = ++this.listRun;
    clearTimeout(this.timer);
    try {
      const ids = await listImages({ callWS: <T>(m: Record<string, unknown>) => within(hass.callWS<T>(m), ANSWER_MS) }, c.media, !!c.recursive);
      if (run !== this.listRun) return; // a newer list (new config, reattached card) owns the slideshow
      this.items = c.shuffle ? shuffled(ids) : ids;
      this.listedAt = Date.now();
      this.listFails = 0;
      this._error = ids.length ? "" : "No pictures in this folder";
      if (restart) {
        this.index = -1;
        this.shown.clear();
        this.ahead = undefined;
        void this.advance();
      }
    } catch (e) {
      if (run !== this.listRun) return;
      // a periodic relist that fails keeps the pictures it has; the next timed change tries again
      if (!restart) return;
      // Home Assistant rejects with {code, message}, or {error: {code, message}} when the connection drops
      const err = e as { message?: string; error?: { message?: string } };
      this._error = `Cannot open ${mediaFolders(c.media).join(", ")}: ${err.message ?? err.error?.message ?? e}`;
      if (!this.isConnected) return;
      this.timer = window.setTimeout(() => {
        if (this.onScreen) void this.relist(true);
        else this.loadedFor = ""; // hidden meanwhile: resume() lists again once it is shown
      }, retryMs(this.listFails++));
    }
  }

  /** the timed change to the next picture */
  private async advance(): Promise<void> {
    clearTimeout(this.timer);
    if (!this._config || !this.items.length || !this.isConnected) return;
    // hidden (another screen size's section) and not full screen: fetch nothing until resume()
    this.parked = !this.onScreen && !this.slideshow;
    if (this.parked) return;
    const nav = this.nav;
    if (Date.now() - this.listedAt > RELIST_MS) await this.relist(false);
    if (nav === this.nav) await this.go(1, false);
  }

  private schedule(): void {
    clearTimeout(this.timer);
    if (!this._config || !this.isConnected) return;
    this.timer = window.setTimeout(() => void this.advance(), Math.max(5, this._config.interval ?? 30) * 1000);
  }

  /** the next unseen picture */
  private unseen(): Picture | undefined {
    if (!this.items.length) return undefined;
    const id = this.items[(this.index + 1) % this.items.length];
    return this.ahead?.id === id ? this.ahead : { id };
  }

  /** resolve (or reuse) a picture's URL and decode it, so it can be swapped in at once */
  private async fetch(p: Picture): Promise<string> {
    if (!p.url || Date.now() - (p.at ?? 0) > URL_TTL_MS) {
      p.ready = false;
      const r = await within(this.hass!.callWS<{ url: string }>({ type: "media_source/resolve_media", media_content_id: p.id, expires: 3600 }), ANSWER_MS);
      p.url = r.url.startsWith("http") ? r.url : this.hass!.hassUrl(r.url);
      p.at = Date.now();
    }
    const img = new Image();
    img.src = p.url;
    await within(img.decode(), ANSWER_MS);
    p.ready = true;
    return p.url;
  }

  /** fetch the picture after the current one ahead of time */
  private async prefetch(): Promise<void> {
    const p = this.shown.peek(1) ?? (this.ahead = this.unseen());
    if (!p || p.ready) return;
    try {
      await this.fetch(p);
    } catch {
      // the change to it fetches it again, and skips it if it still fails
    }
  }

  /** change to the picture one step forward or back: the history first, else the next unseen one */
  private async go(dir: 1 | -1, slide: boolean): Promise<void> {
    const nav = ++this.nav;
    clearTimeout(this.timer);
    for (;;) {
      const fromHistory = this.shown.peek(dir);
      const p = fromHistory ?? (dir > 0 ? this.unseen() : undefined);
      if (!p) break; // nothing before the first picture shown
      if (!fromHistory) this.index = (this.index + 1) % this.items.length;
      try {
        const url = await this.fetch(p);
        if (nav !== this.nav) return;
        if (fromHistory) this.shown.step(dir);
        else this.shown.push(p);
        if (p === this.ahead) this.ahead = undefined;
        this.fails = 0;
        await this.show(url, slide ? dir : 0);
        void this.prefetch();
        break;
      } catch {
        if (nav !== this.nav) return;
        if (p === this.ahead) this.ahead = undefined;
        if (fromHistory) this.shown.drop(p);
        // A picture this browser cannot decode (HEIC outside Safari, a broken file) is skipped at once
        // instead of holding the previous one, or a blank frame, for a whole interval.
        // After a run of failures, wait the interval so an unreadable folder does not spin.
        if (++this.fails >= Math.min(this.items.length, 20)) break;
      }
    }
    this.settle();
    this.schedule();
  }

  /** swap in a fetched picture: a crossfade for the timed slideshow, a slide (dir 1 from the right, -1 from the left) for a swipe */
  private async show(url: string, dir: number): Promise<void> {
    clearTimeout(this.settleTimer);
    const s = this._stage;
    const back = 1 - s.front;
    const urls: [string, string] = [...s.urls];
    urls[back] = url;
    if (!dir) {
      this._stage = { urls, front: back, drag: 0, side: 0, still: false };
      return;
    }
    if (s.urls[back] !== url || s.side !== dir) {
      // not peeking in yet (an arrow key, or nothing was ready during the drag): place it beside first
      this._stage = { ...s, urls, side: dir, still: true };
      await this.painted();
    }
    this._stage = { urls, front: back, drag: 0, side: -dir, still: false };
  }

  /** a drag or slide is over: the picture beside the shown one goes away once it has moved off */
  private settle(): void {
    const s = this._stage;
    if (!s.drag && !s.side) return;
    clearTimeout(this.settleTimer);
    this._stage = { ...s, drag: 0, still: false };
    this.settleTimer = window.setTimeout(() => (this._stage = { ...this._stage, side: 0, still: true }), SLIDE_MS + 60);
  }

  /** render, and make the browser take in the new positions before they change again */
  private async painted(): Promise<void> {
    await this.updateComplete;
    if (this.slideshow) {
      this.slideshow.state = this._stage;
      await this.slideshow.updateComplete;
      this.slideshow.shadowRoot?.querySelector("img")?.getBoundingClientRect();
    }
    this.renderRoot.querySelector("img")?.getBoundingClientRect();
  }

  // ---- gestures (the card and its full-screen slideshow) ----

  dragTo(dx: number): void {
    if (!this.dragging) {
      this.dragging = true;
      this.nav++; // a change still loading gives way to the finger
      clearTimeout(this.timer);
      clearTimeout(this.settleTimer);
    }
    const dir = dx < 0 ? 1 : -1;
    const next = this.shown.peek(dir) ?? (dir > 0 ? this.ahead : undefined);
    const peek = next?.ready ? next.url! : "";
    const s = this._stage;
    const urls: [string, string] = [...s.urls];
    if (peek) urls[1 - s.front] = peek;
    // no picture that way (going back from the first one): the picture resists
    const blocked = dir < 0 ? !this.shown.peek(-1) : this.items.length < 2;
    this._stage = { ...s, urls, drag: blocked ? dx / 3 : dx, side: peek ? dir : 0, still: true };
  }

  dragEnd(g: Gesture): void {
    if (!this.dragging) return;
    this.dragging = false;
    if (g === "left" || g === "right") {
      void this.go(g === "left" ? 1 : -1, true);
      return;
    }
    this.settle();
    this.schedule();
  }

  step(dir: 1 | -1): void {
    if (this.items.length) void this.go(dir, true);
  }

  private openSlideshow(): void {
    // not from the card editor's preview: the slideshow would open under the editor dialog
    if (this.slideshow || !this._stage.urls[this._stage.front] || inDialog(this)) return;
    const el = document.createElement("homeview-photo-slideshow") as HomeViewPhotoSlideshow;
    el.host = this;
    el.state = this._stage;
    this.slideshow = el;
    openOverlay(el);
  }

  slideshowClosed(): void {
    this.slideshow = undefined;
    if (this.isConnected) this.renderRoot.querySelector<HTMLElement>("ha-card")?.focus({ preventScroll: true });
  }

  private onKey = (e: KeyboardEvent): void => {
    if (e.key === "Enter" || e.key === " ") this.openSlideshow();
    else if (e.key === "ArrowRight") this.step(1);
    else if (e.key === "ArrowLeft") this.step(-1);
    else return;
    e.preventDefault();
  };

  protected resume(): void {
    if (!this.load() && this.parked) void this.advance();
  }

  protected render(): TemplateResult {
    if (!this._config) return html``;
    const fit = this._config.fit ?? "cover";
    const shown = !!this._stage.urls[this._stage.front];
    // "swiper": Swipe Navigation (a popular add-on that swipes between dashboard views) leaves
    // drags on that class alone, so swiping the frame changes the picture, not the view
    return html`<ha-card
      class="photo swiper ${this.square ? "square" : ""} ${shown ? "shown" : ""}"
      role=${shown ? "button" : nothing}
      tabindex=${shown ? "0" : nothing}
      aria-label=${shown ? "Photo frame: open the full-screen slideshow" : nothing}
      @keydown=${this.onKey}
    >
      ${stage(this._stage, fit)} ${this._error ? html`<div class="msg">${this._error}</div>` : nothing}
    </ha-card>`;
  }

  protected renderContent(): typeof nothing {
    return nothing;
  }

  static styles = [
    glassStyles,
    stageStyles,
    css`
      ha-card.photo {
        position: relative;
        height: 100%;
        overflow: hidden;
        border: none;
        border-radius: var(--hv-radius, 24px);
        background: rgb(0 0 0 / 0.25);
        box-shadow: 0 calc(var(--hv-ref, 200px) * 0.03) calc(var(--hv-ref, 200px) * 0.09) rgb(40 30 20 / 0.18);
        --hv-gap: 12px;
        /* horizontal drags are ours (swipe), vertical ones still scroll the page */
        touch-action: pan-y;
        user-select: none;
        -webkit-user-select: none;
        -webkit-tap-highlight-color: transparent;
      }
      ha-card.photo.shown {
        cursor: pointer;
      }
      ha-card.photo.square {
        aspect-ratio: 1;
        height: auto;
      }
      ha-card.photo::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        box-shadow: inset 0 0 0 0.5px rgb(255 255 255 / 0.35);
        pointer-events: none;
      }
      .msg {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        padding: 12%;
        text-align: center;
        overflow-wrap: anywhere;
        color: #fff;
        font-family: var(--hv-font);
        font-size: calc(var(--hv-ref, 200px) * 0.075);
        text-shadow: var(--hv-shadow-text);
      }
    `,
  ];
}

customElements.define("homeview-photo-card", HomeViewPhotoCard);
registerCard("homeview-photo-card", "HomeView Photo Frame", "Slideshow of pictures from a Home Assistant media source.");
