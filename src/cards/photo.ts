/**
 * HomeView photo frame: a slideshow of the pictures in a Home Assistant media
 * source folder (local media, a DLNA / Synology / Immich server, ... anything
 * HA's Media panel can browse), read over the media_source websocket API.
 */
import { css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { HomeViewCard, glassStyles, type BaseConfig } from "./base.ts";
import { registerCard, type GridOptions } from "../ha.ts";
import type { EditorField } from "../editor.ts";
import { listImages, shuffled } from "../logic.ts";

export interface PhotoConfig extends BaseConfig {
  media: string;
  interval?: number;
  shuffle?: boolean;
  recursive?: boolean;
  fit?: "cover" | "contain";
}


const RELIST_MS = 30 * 60 * 1000;


/** Collect image ids under a media-source folder (breadth first, bounded). */


export class HomeViewPhotoCard extends HomeViewCard<PhotoConfig> {
  static properties = { ...HomeViewCard.properties, _urls: { state: true }, _front: { state: true }, _error: { state: true } };
  private _urls: [string, string] = ["", ""];
  private _front = 0;
  private _error = "";
  private items: string[] = [];
  private index = -1;
  private timer = 0;
  private listedAt = 0;
  private fails = 0;
  private parked = false;
  private loadedFor = "";

  static editorFields: EditorField[] = [
    { name: "media", label: "Media folder", required: true, helper: "A media-source folder, e.g. media-source://media_source/local/photos. Open Media in the sidebar to find the folder; DLNA, Synology Photos and other media servers HA can browse work too.", selector: { text: {} } },
    { name: "interval", label: "Seconds per picture", selector: { number: { min: 5, max: 3600, step: 1, mode: "box", unit_of_measurement: "s" } } },
    { name: "shuffle", selector: { boolean: {} } },
    { name: "recursive", label: "Include subfolders", selector: { boolean: {} } },
    { name: "fit", selector: { select: { mode: "dropdown", options: [{ value: "cover", label: "Fill" }, { value: "contain", label: "Fit whole picture" }] } } },
  ];

  static getStubConfig(): Partial<PhotoConfig> {
    return { media: "media-source://media_source/local", interval: 30, recursive: true };
  }

  protected validate(config: PhotoConfig): void {
    if (!config.media || !config.media.startsWith("media-source://")) throw new Error("Set media to a media-source:// folder");
  }

  getGridOptions(): GridOptions {
    return { columns: 4, rows: "auto", min_columns: 3, min_rows: 2 };
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearTimeout(this.timer);
    this.loadedFor = "";
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (this.hass && this._config) this.requestUpdate();
  }

  protected updated(changed: PropertyValues): void {
    super.updated?.(changed);
    this.load();
  }

  /** list the folder for a new config; deferred while hidden so off-screen copies browse nothing */
  private load(): boolean {
    const c = this._config;
    if (!this.hass || !c || !this.onScreen) return false;
    const key = `${c.media}|${c.recursive}|${c.shuffle}`;
    if (key === this.loadedFor) return false;
    this.loadedFor = key;
    void this.relist(true);
    return true;
  }

  private async relist(restart: boolean): Promise<void> {
    const c = this._config!;
    try {
      const ids = await listImages(this.hass!, c.media, !!c.recursive);
      this.items = c.shuffle ? shuffled(ids) : ids;
      this.listedAt = Date.now();
      this._error = ids.length ? "" : "No pictures in this folder";
      if (restart) {
        this.index = -1;
        void this.next();
      }
    } catch (e) {
      this._error = `Cannot open ${c.media}: ${(e as { message?: string }).message ?? e}`;
    }
  }

  private async next(): Promise<void> {
    clearTimeout(this.timer);
    const c = this._config;
    if (!c || !this.items.length || !this.isConnected) return;
    // hidden (another screen size's section): fetch nothing until resume()
    this.parked = !this.onScreen;
    if (this.parked) return;
    if (Date.now() - this.listedAt > RELIST_MS) await this.relist(false);
    this.index = (this.index + 1) % this.items.length;
    try {
      const r = await this.hass!.callWS<{ url: string }>({ type: "media_source/resolve_media", media_content_id: this.items[this.index], expires: 3600 });
      const url = r.url.startsWith("http") ? r.url : this.hass!.hassUrl(r.url);
      const img = new Image();
      img.src = url;
      await img.decode(); // swap only once the next picture is ready
      const back = 1 - this._front;
      const urls: [string, string] = [...this._urls] as [string, string];
      urls[back] = url;
      this._urls = urls;
      this._front = back;
      this.fails = 0;
    } catch {
      this.fails++;
    }
    // A picture this browser cannot decode (HEIC outside Safari, a broken file) is skipped
    // at once instead of holding the previous one, or a blank frame, for a whole interval.
    // After a run of failures, wait the interval so an unreadable folder does not spin.
    const skip = this.fails > 0 && this.fails < Math.min(this.items.length, 20);
    this.timer = window.setTimeout(() => void this.next(), skip ? 0 : Math.max(5, c.interval ?? 30) * 1000);
  }

  protected resume(): void {
    if (!this.load() && this.parked) void this.next();
  }

  protected render(): TemplateResult {
    if (!this._config) return html``;
    const fit = this._config.fit ?? "cover";
    return html`<ha-card class="photo ${this.square ? "square" : ""}">
      ${this._urls.map((u, i) => (u ? html`<img class=${i === this._front ? "front" : ""} src=${u} alt="" style="object-fit:${fit}" />` : nothing))}
      ${this._error ? html`<div class="msg">${this._error}</div>` : nothing}
    </ha-card>`;
  }

  protected renderContent(): typeof nothing {
    return nothing;
  }

  static styles = [
    glassStyles,
    css`
      ha-card.photo {
        position: relative;
        height: 100%;
        overflow: hidden;
        border: none;
        border-radius: var(--hv-radius, 24px);
        background: rgb(0 0 0 / 0.25);
        box-shadow: 0 calc(var(--hv-ref, 200px) * 0.03) calc(var(--hv-ref, 200px) * 0.09) rgb(40 30 20 / 0.18);
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
      img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
        opacity: 0;
        transition: opacity 1.2s ease;
      }
      img.front {
        opacity: 1;
      }
      .msg {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        padding: 12%;
        text-align: center;
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
