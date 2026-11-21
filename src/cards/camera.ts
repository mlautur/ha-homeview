/**
 * HomeView camera: a snapshot tile, refreshed every few seconds, with the camera's name over a
 * soft shade. Tap opens the live stream full screen (Home Assistant's own player: HLS or WebRTC,
 * whatever the camera offers); swipe down, Escape or the back gesture closes it.
 * Snapshots pause while the card is hidden or the screen is off.
 * With `entities:` it is a full-screen page of live cameras instead (camera-page.ts).
 */
import { css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { HomeViewCard, glassStyles, type BaseConfig } from "./base.ts";
import { domainOf, fireEvent, friendlyName, isUnavailable, registerCard, type GridOptions, type Hass, type HassEntity } from "../ha.ts";
import type { EditorField } from "../editor.ts";
import { ICONS } from "../icons.ts";
import { cameraPages, cropTop, snapshotUrl } from "../logic.ts";
import { inDialog } from "../glass/backdrop.ts";
import { HomeViewOverlay, openOverlay } from "./overlay.ts";
import { cameraPlayer, type CameraPageConfig } from "./camera-page.ts";

export interface CameraConfig extends BaseConfig, CameraPageConfig {
  /** the tile's camera; `entities` makes the card a full-screen page of cameras instead */
  entity?: string;
  name?: string;
  /** seconds between snapshots (default 10) */
  refresh?: number;
  fit?: "cover" | "contain";
  /** percent of the snapshot hidden at the top when filling the tile, 0-20 (default 0) */
  crop_top?: number;
  tap_action?: "live" | "more-info" | "none";
}

const STALE_AFTER = 2;

export class HomeViewCameraCard extends HomeViewCard<CameraConfig> {
  static properties = { ...HomeViewCard.properties, _src: { state: true }, _fails: { state: true } };
  /** the snapshot on screen; the next one loads off screen and replaces it when decoded */
  private _src = "";
  private loading = "";
  /** snapshots that failed in a row; from STALE_AFTER on, the last frame gives way to a hint */
  private _fails = 0;
  private timer = 0;
  private live?: HomeViewCameraLive;

  static editorFields: EditorField[] = [
    { name: "entity", label: "Camera (tile)", selector: { entity: { filter: { domain: "camera" } } } },
    {
      name: "entities",
      label: "Cameras (full-screen page)",
      helper: "Set these instead of one camera for a page of live cameras that fills a panel view: swipe between them. Name and crop_top per camera can be set in YAML.",
      selector: { entity: { multiple: true, filter: { domain: "camera" } } },
    },
    { name: "home_path", label: "Home button goes to", helper: "Page only. Defaults to the dashboard's first view, e.g. /echo-show/home", selector: { text: {} } },
    { name: "name", selector: { text: {} } },
    { name: "refresh", label: "Seconds between snapshots", selector: { number: { min: 2, max: 600, mode: "box", unit_of_measurement: "s" } } },
    { name: "fit", selector: { select: { mode: "dropdown", options: [{ value: "cover", label: "Fill" }, { value: "contain", label: "Fit whole picture" }] } } },
    { name: "crop_top", label: "Hide the top (percent, when filling)", selector: { number: { min: 0, max: 20, mode: "box", unit_of_measurement: "%" } } },
    {
      name: "tap_action",
      label: "Tap action",
      selector: { select: { mode: "dropdown", options: [{ value: "live", label: "Live view, full screen" }, { value: "more-info", label: "More info" }, { value: "none", label: "Nothing" }] } },
    },
  ];

  static getStubConfig(hass: Hass): Partial<CameraConfig> {
    return { entity: Object.keys(hass.states).find((e) => domainOf(e) === "camera") ?? "" };
  }

  protected validate(config: CameraConfig): void {
    // an empty list (the visual editor's, once cleared) leaves the tile as it was
    if (Array.isArray(config.entities) && config.entities.length) {
      if (!cameraPages(config.entities).length) throw new Error("Add one or more camera entities");
    } else if (!config.entity || domainOf(config.entity) !== "camera") throw new Error("Pick a camera entity");
  }

  /** a full-screen page of live cameras (`entities:`) rather than a snapshot tile */
  private get page(): boolean {
    return Array.isArray(this._config?.entities) && this._config.entities.length > 0;
  }

  protected get square(): boolean {
    return !this.page && super.square;
  }

  getGridOptions(): GridOptions {
    if (this.page) return { columns: "full", rows: "auto", min_columns: 6, min_rows: 4 };
    return { columns: 6, rows: "auto", min_columns: 3, min_rows: 2 };
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.resume();
    document.addEventListener("visibilitychange", this.onVisible);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearTimeout(this.timer);
    this.timer = 0;
    document.removeEventListener("visibilitychange", this.onVisible);
    this.live?.close(); // the dashboard moved on
  }

  private onVisible = (): void => this.resume();

  protected resume(): void {
    if (!this.timer) this.snap();
  }

  protected updated(changed: PropertyValues): void {
    super.updated?.(changed);
    if (changed.has("_config")) {
      this._src = "";
      this._fails = 0;
      clearTimeout(this.timer);
      this.timer = 0;
    }
    if (!this.timer) this.snap();
    if (this.live && changed.has("hass") && this.hass) this.live.hass = this.hass;
  }

  /** fetch a snapshot now and schedule the next; stops while hidden (resume() restarts it) */
  private snap = (): void => {
    this.timer = 0;
    const c = this._config;
    if (!c?.entity || this.page || !this.hass || !this.onScreen || document.visibilityState === "hidden") return;
    const every = Math.max(2, c.refresh ?? 10);
    this.timer = window.setTimeout(this.snap, every * 1000);
    const s = this.hass.states[c.entity];
    const pic = s && !isUnavailable(s) ? (s.attributes.entity_picture as string | undefined) : undefined;
    if (!pic) {
      this._src = "";
      return;
    }
    const url = this.hass.hassUrl(snapshotUrl(pic, Date.now(), every));
    if (url === this._src || url === this.loading) return;
    this.loading = url;
    const img = new Image();
    img.onload = () => {
      if (this.loading !== url) return;
      this._src = url;
      this._fails = 0;
    };
    img.onerror = () => {
      if (this.loading !== url) return;
      this.loading = "";
      this._fails++;
    };
    img.src = url;
  };

  // the tile's own code: it only runs with `entity` set (no `entities`)
  private tap = (): void => {
    const c = this._config as CameraConfig & { entity: string };
    const action = c.tap_action ?? "live";
    if (action === "none" || !this.hass) return;
    const s = this.hass.states[c.entity];
    // not from the card editor's preview: the overlay would open under the editor dialog
    if (action === "more-info" || !s || isUnavailable(s) || inDialog(this)) {
      fireEvent(this, "hass-more-info", { entityId: c.entity });
      return;
    }
    if (this.live) return;
    const el = document.createElement("homeview-camera-live") as HomeViewCameraLive;
    el.hass = this.hass;
    el.entity = c.entity;
    el.name = this.name();
    el.onClosed = () => {
      this.live = undefined;
      if (this.isConnected) this.renderRoot.querySelector<HTMLElement>("ha-card")?.focus({ preventScroll: true });
    };
    this.live = el;
    openOverlay(el);
  };

  private name(): string {
    const c = this._config as CameraConfig & { entity: string };
    return c.name ?? (this.hass ? friendlyName(this.hass, c.entity) : c.entity);
  }

  private onKey = (e: KeyboardEvent): void => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    this.tap();
  };

  protected render(): TemplateResult {
    const c = this._config;
    if (!c || !this.hass) return html``;
    if (this.page) return html`<homeview-camera-page .hass=${this.hass} .config=${c}></homeview-camera-page>`;
    if (!c.entity) return html``;
    const s = this.hass.states[c.entity];
    const off = !s || isUnavailable(s);
    const name = this.name();
    const fit = c.fit ?? "cover";
    const crop = fit === "cover" ? cropTop(c.crop_top) : 0;
    const src = this._fails >= STALE_AFTER ? "" : this._src;
    const hint = !s ? "Camera not found" : off ? "Offline" : this._fails >= STALE_AFTER ? "Not responding" : "Loading\u2026";
    return html`<ha-card
      class="camera ${this.square ? "square" : ""} ${src ? "shown" : ""}"
      role="button"
      tabindex="0"
      aria-label="${name}: ${off ? "offline" : "open the live view"}"
      @click=${this.tap}
      @keydown=${this.onKey}
    >
      ${src ? html`<img src=${src} alt="" draggable="false" style="object-fit:${fit};top:${-crop}%;height:${100 + crop}%" />` : nothing}
      ${!src || off ? html`<div class="empty">${ICONS.camera}<span>${hint}</span></div>` : nothing}
      <div class="name">${name}</div>
    </ha-card>`;
  }

  protected renderContent(): typeof nothing {
    return nothing;
  }

  static styles = [
    glassStyles,
    css`
      ha-card.camera {
        position: relative;
        height: 100%;
        overflow: hidden;
        border: none;
        border-radius: var(--hv-radius, 24px);
        background: linear-gradient(180deg, rgb(88 96 104 / 0.55), rgb(40 42 44 / 0.7));
        box-shadow: 0 calc(var(--hv-ref, 200px) * 0.03) calc(var(--hv-ref, 200px) * 0.09) rgb(40 30 20 / 0.18);
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
        -webkit-tap-highlight-color: transparent;
        font-family: var(--hv-font);
        transition: transform 0.45s var(--hv-spring);
      }
      ha-card.camera:active {
        transform: scale(0.97);
        transition-duration: 0.12s;
      }
      ha-card.camera.square {
        aspect-ratio: 1;
        height: auto;
      }
      ha-card.camera::after {
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
        -webkit-user-drag: none;
      }
      .empty {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: calc(var(--hv-ref, 200px) * 0.04);
        color: rgb(255 255 255 / 0.85);
        font-size: calc(var(--hv-ref, 200px) * 0.075);
      }
      .empty svg {
        width: calc(var(--hv-ref, 200px) * 0.2);
        height: calc(var(--hv-ref, 200px) * 0.2);
      }
      .name {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: calc(var(--hv-ref, 200px) * 0.2) calc(var(--hv-ref, 200px) * 0.08) calc(var(--hv-ref, 200px) * 0.07);
        background: linear-gradient(180deg, transparent, rgb(0 0 0 / 0.5));
        color: #fff;
        font-size: calc(var(--hv-ref, 200px) * 0.085);
        font-weight: 600;
        text-shadow: 0 1px 3px rgb(0 0 0 / 0.4);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        pointer-events: none;
      }
    `,
  ];
}

/** The live view: the camera full screen, closed by a swipe down, Escape or the back gesture. */
export class HomeViewCameraLive extends HomeViewOverlay {
  static properties = { ...HomeViewOverlay.properties, hass: { attribute: false }, _player: { state: true } };
  hass?: Hass;
  entity = "";
  name = "";
  onClosed?: () => void;
  /** undefined while loading Home Assistant's player; false falls back to the MJPEG stream */
  private _player?: boolean;
  protected readonly label = "Camera live view";
  protected readonly closeLabel = "Close live view";
  // ponytail: a live stream left open keeps the camera streaming; 10 minutes, then back to the dashboard
  protected readonly openMs = 10 * 60 * 1000;

  connectedCallback(): void {
    super.connectedCallback();
    void cameraPlayer(this.entity).then((ok) => (this._player = ok));
  }

  protected closed(): void {
    this.onClosed?.();
  }

  protected renderBody(): TemplateResult {
    const s: HassEntity | undefined = this.hass?.states[this.entity];
    let view: TemplateResult | typeof nothing = nothing;
    if (s && this.hass && this._player) view = html`<ha-camera-stream .hass=${this.hass} .stateObj=${s} .muted=${true} .controls=${false} fit-mode="contain"></ha-camera-stream>`;
    else if (s && this.hass && this._player === false)
      view = html`<img src=${this.hass.hassUrl(`/api/camera_proxy_stream/${this.entity}?token=${s.attributes.access_token}`)} alt="" draggable="false" />`;
    return html`${view}${this._chrome ? html`<div class="title">${this.name}</div>` : nothing}`;
  }

  static styles = [
    HomeViewOverlay.overlayStyles,
    css`
      ha-camera-stream,
      img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
        object-fit: contain;
        -webkit-user-drag: none;
        /* the overlay owns every gesture: a swipe down closes it */
        pointer-events: none;
      }
      ha-camera-stream {
        --video-max-height: 100vh;
      }
      /* bottom left: cameras burn their clock into the top left */
      .title {
        position: absolute;
        bottom: max(20px, env(safe-area-inset-bottom));
        left: max(24px, env(safe-area-inset-left));
        color: #fff;
        font: 600 20px/44px -apple-system, "SF Pro Display", "Inter", system-ui, "Segoe UI", Roboto, sans-serif;
        text-shadow: 0 1px 4px rgb(0 0 0 / 0.5);
      }
    `,
  ];
}

if (!customElements.get("homeview-camera-live")) customElements.define("homeview-camera-live", HomeViewCameraLive);
customElements.define("homeview-camera-card", HomeViewCameraCard);
registerCard("homeview-camera-card", "HomeView Camera", "Camera snapshot tile; tap for the live view full screen.");
