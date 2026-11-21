/**
 * HomeView Now Playing: one media player full screen, for a panel view on a wall panel or an Echo Show.
 * Square album art on the left over a blurred copy of it; title, artist and album, a seekable progress
 * bar, previous / play-pause / next, then volume, shuffle and repeat on frosted glass. An optional close
 * button top right goes back to another view. It controls one player only: no speaker picker.
 */
import { css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { HomeViewCard, glassStyles, type BaseConfig } from "./base.ts";
import { domainOf, fireEvent, friendlyName, isUnavailable, registerCard, type GridOptions, type Hass } from "../ha.ts";
import type { EditorField } from "../editor.ts";
import { ICONS } from "../icons.ts";
import { MEDIA, nextRepeat, mediaProgress, trackTime } from "../logic.ts";

export interface MediaConfig extends BaseConfig {
  entity: string;
  name?: string;
  /** the close button goes to this dashboard path, e.g. /echo-show/home; no close button without it */
  navigation_path?: string;
}

/** volume_set while the slider moves, at most this often */
const VOLUME_MS = 250;
/** the volume popover closes by itself after this long untouched */
const POPOVER_MS = 5000;

export class HomeViewMediaCard extends HomeViewCard<MediaConfig> {
  static properties = { ...HomeViewCard.properties, _now: { state: true }, _seek: { state: true }, _volume: { state: true }, _vol: { state: true }, _artFailed: { state: true } };
  /** the clock the progress bar reads; ticks every second while playing */
  private _now = Date.now();
  /** a seek dragged or sent and not yet reported back: [position, media_position_updated_at when sent] */
  private _seek?: [number, string | undefined];
  /** the volume slider while it is dragged */
  private _volume?: number;
  /** the volume popover is open */
  private _vol = false;
  /** the art URL that failed to load */
  private _artFailed = "";
  /** a finger is on the progress slider */
  private dragging = false;
  private ticker = 0;
  private seekTimer = 0;
  private volDone = 0;
  private volTimer = 0;
  private volSent = 0;

  static editorFields: EditorField[] = [
    { name: "entity", required: true, selector: { entity: { filter: { domain: "media_player" } } } },
    { name: "name", selector: { text: {} } },
    { name: "navigation_path", label: "Close button goes to", helper: "A dashboard path such as /echo-show/home. Leave empty for no close button.", selector: { text: {} } },
  ];

  static getStubConfig(hass: Hass): Partial<MediaConfig> {
    return { entity: Object.keys(hass.states).find((e) => domainOf(e) === "media_player") ?? "" };
  }

  protected validate(config: MediaConfig): void {
    if (!config.entity || domainOf(config.entity) !== "media_player") throw new Error("Pick a media player entity");
  }

  getGridOptions(): GridOptions {
    return { columns: "full", rows: 8, min_columns: 6, min_rows: 4 };
  }

  getCardSize(): number {
    return 8;
  }

  /** it fills its view (a panel view) or its grid cell, never a square */
  protected get square(): boolean {
    return false;
  }

  /** the layout is drawn for 960x480 landscape: everything scales with --hv-ref / 480 */
  protected refFrom(w: number, h: number): number {
    return Math.min(h, w / 2);
  }

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener("visibilitychange", this.onVisible);
    document.addEventListener("pointerdown", this.onOutside, true);
    window.addEventListener("keydown", this.onKey);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener("visibilitychange", this.onVisible);
    document.removeEventListener("pointerdown", this.onOutside, true);
    window.removeEventListener("keydown", this.onKey);
    this.tick(false);
    clearTimeout(this.seekTimer);
    clearTimeout(this.volTimer);
    clearTimeout(this.volDone);
  }

  private onVisible = (): void => this.resume();

  protected resume(): void {
    this._now = Date.now();
    this.tick(this.state()?.state === "playing" && this.onScreen && document.visibilityState !== "hidden");
  }

  /** run the progress clock (while playing on screen) or stop it */
  private tick(on: boolean): void {
    if (on && !this.ticker)
      this.ticker = window.setInterval(() => {
        if (!this.onScreen || document.visibilityState === "hidden") this.tick(false);
        else this._now = Date.now();
      }, 1000);
    else if (!on && this.ticker) {
      clearInterval(this.ticker);
      this.ticker = 0;
    }
  }

  protected updated(changed: PropertyValues): void {
    super.updated?.(changed);
    if (!changed.has("hass") && !changed.has("_config")) return;
    this.resume();
    // the player reported a new position: the seek landed
    const s = this.state();
    if (this._seek && !this.dragging && s && s.attributes.media_position_updated_at !== this._seek[1]) this._seek = undefined;
  }

  private state() {
    return this._config && this.hass ? this.hass.states[this._config.entity] : undefined;
  }

  private call(service: string, data: Record<string, unknown> = {}): void {
    void this.hass?.callService("media_player", service, data, { entity_id: this._config!.entity });
  }

  private seeking = (e: Event): void => {
    this.dragging = true;
    clearTimeout(this.seekTimer);
    this._seek = [Number((e.target as HTMLInputElement).value), this.state()?.attributes.media_position_updated_at];
  };

  private seek = (e: Event): void => {
    const v = Number((e.target as HTMLInputElement).value);
    this.dragging = false;
    this._seek = [v, this.state()?.attributes.media_position_updated_at];
    this.call("media_seek", { seek_position: v });
    this.seekEnd();
  };

  /** the finger left the slider, with or without a change event */
  private seekEnd = (): void => {
    this.dragging = false;
    // ponytail: a player that never reports the new position would freeze the bar; let it go after 5 s
    clearTimeout(this.seekTimer);
    this.seekTimer = window.setTimeout(() => (this._seek = undefined), 5000);
  };

  private volumeInput = (e: Event): void => {
    clearTimeout(this.volDone);
    this.volDone = 0;
    this._volume = Number((e.target as HTMLInputElement).value) / 100;
    this.keepPopover();
    if (Date.now() - this.volSent < VOLUME_MS) return;
    this.volSent = Date.now();
    this.call("volume_set", { volume_level: this._volume });
  };

  /** the drag ended (change, release, cancel or blur): send the last level, which the throttle may have skipped */
  private volumeEnd = (): void => {
    if (this.volDone || this._volume === undefined) return;
    this.call("volume_set", { volume_level: this._volume });
    // keep showing it until the player reports it back
    this.volDone = window.setTimeout(() => (this._volume = undefined), 1500);
  };

  private toggleVolume = (): void => {
    this._vol = !this._vol;
    this.keepPopover();
  };

  private keepPopover(): void {
    clearTimeout(this.volTimer);
    if (this._vol) this.volTimer = window.setTimeout(() => (this._vol = false), POPOVER_MS);
  }

  /** a tap anywhere but the volume button and its popover closes the popover */
  private onOutside = (e: Event): void => {
    if (!this._vol) return;
    const vol = this.renderRoot.querySelector(".volwrap");
    if (vol && !e.composedPath().includes(vol)) this._vol = false;
  };

  private onKey = (e: KeyboardEvent): void => {
    if (e.key === "Escape" && this._vol) this._vol = false;
  };

  private close = (): void => {
    const path = this._config?.navigation_path;
    if (!path) return;
    // Home Assistant's own navigate(): push the path, then tell the app the location changed
    history.pushState(null, "", path);
    fireEvent(window, "location-changed", { replace: false });
  };

  protected render(): TemplateResult {
    const c = this._config;
    if (!c || !this.hass) return html``;
    const s = this.state();
    const off = !s || isUnavailable(s);
    const a = s?.attributes ?? {};
    const f = off ? 0 : Number(a.supported_features) || 0;
    const live = !!s && (s.state === "playing" || s.state === "paused" || s.state === "buffering");
    const name = c.name ?? (s ? friendlyName(this.hass, c.entity) : c.entity);
    const pic = live && a.entity_picture ? this.hass.hassUrl(a.entity_picture) : "";
    const art = pic && pic !== this._artFailed ? pic : "";
    const title = live && a.media_title ? String(a.media_title) : !s ? "Player not found" : off ? "Unavailable" : "Not playing";
    const artist = live && a.media_title ? String(a.media_artist || a.media_album_artist || a.app_name || "") : name;
    const album = live && a.media_title ? String(a.media_album_name || "") : "";
    const prog = live && s ? mediaProgress(s, this._now) : null;
    const pos = this._seek ? this._seek[0] : (prog?.pos ?? 0);
    const playing = s?.state === "playing";
    const vol = this._volume ?? (typeof a.volume_level === "number" ? a.volume_level : 0);
    const muted = !!a.is_volume_muted || vol === 0;
    const repeat = (a.repeat as string | undefined) ?? "off";
    const btn = (label: string, icon: TemplateResult, onClick: () => void, opts: { cls?: string; disabled?: boolean; pressed?: boolean } = {}): TemplateResult =>
      html`<button
        class="g ${opts.cls ?? ""} ${opts.pressed ? "on" : ""}"
        aria-label=${label}
        aria-pressed=${opts.pressed === undefined ? nothing : String(opts.pressed)}
        ?disabled=${opts.disabled}
        @click=${onClick}
      >
        ${icon}
      </button>`;
    return html`<ha-card class="media" aria-label="Now playing on ${name}">
      ${art ? html`<div class="bg" aria-hidden="true"><img src=${art} alt="" /></div><div class="scrim"></div>` : nothing}
      <div class="np">
        <div class="art">
          ${art
            ? html`<img src=${art} alt=${album || title} draggable="false" @error=${() => (this._artFailed = art)} />`
            : html`<div class="none">${ICONS.music}</div>`}
        </div>
        <div class="col ink">
          <div class="title">${title}</div>
          ${artist ? html`<div class="artist">${artist}</div>` : nothing}
          ${album ? html`<div class="album">${album}</div>` : nothing}
          ${prog
            ? html`<div class="prog">
                <input
                  type="range"
                  min="0"
                  max=${prog.dur}
                  step="1"
                  .value=${String(Math.round(pos))}
                  style="--p:${(pos / prog.dur) * 100}%"
                  aria-label="Position"
                  aria-valuetext="${trackTime(pos)} of ${trackTime(prog.dur)}"
                  ?disabled=${!(f & MEDIA.SEEK)}
                  @input=${this.seeking}
                  @change=${this.seek}
                  @pointerup=${this.seekEnd}
                  @pointercancel=${this.seekEnd}
                  @lostpointercapture=${this.seekEnd}
                  @blur=${this.seekEnd}
                />
                <div class="times"><span>${trackTime(pos)}</span><span>${trackTime(prog.dur)}</span></div>
              </div>`
            : nothing}
          <div class="row">
            ${btn("Previous", ICONS.previous, () => this.call("media_previous_track"), { cls: "skip", disabled: !live || !(f & MEDIA.PREVIOUS) })}
            ${btn(playing ? "Pause" : "Play", playing ? ICONS.pause : ICONS.start, () => this.call(live ? "media_play_pause" : "media_play"), {
              cls: "play",
              disabled: off || !(f & (MEDIA.PLAY | MEDIA.PAUSE)),
            })}
            ${btn("Next", ICONS.next, () => this.call("media_next_track"), { cls: "skip", disabled: !live || !(f & MEDIA.NEXT) })}
          </div>
          <div class="row sec">
            ${f & MEDIA.VOLUME_SET
              ? html`<div class="volwrap">
                  ${btn(`Volume ${Math.round(vol * 100)}%`, muted ? ICONS.muted : ICONS.sound, this.toggleVolume, { pressed: this._vol })}
                  ${this._vol
                    ? html`<div class="pop" role="group" aria-label="Volume">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="1"
                          .value=${String(Math.round(vol * 100))}
                          style="--p:${vol * 100}%"
                          aria-label="Volume"
                          @input=${this.volumeInput}
                          @change=${this.volumeEnd}
                          @pointerup=${this.volumeEnd}
                          @pointercancel=${this.volumeEnd}
                          @lostpointercapture=${this.volumeEnd}
                          @blur=${this.volumeEnd}
                        />
                        <span class="pct">${Math.round(vol * 100)}</span>
                      </div>`
                    : nothing}
                </div>`
              : nothing}
            ${this._vol ? nothing : html`${f & MEDIA.SHUFFLE ? btn("Shuffle", ICONS.shuffle, () => this.call("shuffle_set", { shuffle: !a.shuffle }), { pressed: !!a.shuffle }) : nothing}
            ${f & MEDIA.REPEAT
              ? btn(`Repeat ${repeat === "one" ? "one" : repeat === "all" ? "all" : "off"}`, repeat === "one" ? ICONS.repeatOne : ICONS.repeat, () => this.call("repeat_set", { repeat: nextRepeat(repeat) }), {
                  pressed: repeat !== "off",
                })
              : nothing}`}
          </div>
        </div>
      </div>
      ${c.navigation_path ? html`<div class="top">${btn("Close", ICONS.close, this.close, { cls: "close" })}</div>` : nothing}
    </ha-card>`;
  }

  protected renderContent(): typeof nothing {
    return nothing;
  }

  static styles = [
    glassStyles,
    css`
      :host {
        /* the layout is drawn at 960x480; one unit is one pixel there */
        --u: calc(var(--hv-ref, 480px) / 480);
        --hv-btn: 48px;
      }
      ha-card.media {
        position: relative;
        isolation: isolate;
        height: 100%;
        min-height: 240px;
        overflow: hidden;
        border: none;
        border-radius: var(--ha-card-border-radius, 0);
        background: none;
        box-shadow: none;
        color: #fff;
        font-family: var(--hv-font);
        -webkit-font-smoothing: antialiased;
        user-select: none;
        -webkit-user-select: none;
      }
      /* the album art, blurred and enlarged, behind everything; nothing playing leaves the wallpaper */
      .bg {
        position: absolute;
        inset: calc(var(--u) * -60);
        z-index: -2;
      }
      .bg img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: blur(calc(var(--u) * 48)) saturate(1.3);
        transform: scale(1.15);
      }
      .scrim {
        position: absolute;
        inset: 0;
        z-index: -1;
        background: linear-gradient(90deg, rgb(20 14 20 / 0.25), rgb(20 14 20 / 0.45));
      }
      .np {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: calc(var(--u) * 40);
        padding: 0 calc(var(--u) * 40) 0 calc(var(--u) * 56);
        box-sizing: border-box;
      }
      .art {
        flex: none;
        width: calc(var(--u) * 352);
        height: calc(var(--u) * 352);
        border-radius: calc(var(--u) * 24);
        overflow: hidden;
        box-shadow:
          0 0 0 0.75px rgb(60 46 32 / 0.25),
          0 calc(var(--u) * 14) calc(var(--u) * 36) rgb(20 12 10 / 0.35);
      }
      .art img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        -webkit-user-drag: none;
      }
      /* nothing playing: an empty frosted square with a note */
      .art .none {
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
        background: rgb(84 74 64 / 0.28);
        backdrop-filter: blur(22px) saturate(1.5) brightness(1.04);
        -webkit-backdrop-filter: blur(22px) saturate(1.5) brightness(1.04);
        box-shadow:
          inset 0 0 0 1px rgb(255 255 255 / 0.16),
          inset 1.5px 1.5px 0.5px -0.5px rgb(255 255 255 / 0.8),
          inset -1px -1px 0.5px -0.5px rgb(255 255 255 / 0.4);
        border-radius: inherit;
      }
      .art .none svg {
        width: 34%;
        height: 34%;
        color: rgb(255 255 255 / 0.85);
        filter: drop-shadow(var(--hv-shadow-text));
      }
      .col {
        flex: 1;
        min-width: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
      .col .title {
        font-size: calc(var(--u) * 36);
        font-weight: 700;
        letter-spacing: -0.01em;
        line-height: 1.15;
        max-width: 100%;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .artist,
      .album {
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .artist {
        font-size: calc(var(--u) * 20);
        color: rgb(255 255 255 / 0.88);
        margin-top: calc(var(--u) * 8);
      }
      .album {
        font-size: calc(var(--u) * 18);
        color: rgb(255 255 255 / 0.76);
        margin-top: calc(var(--u) * 4);
      }
      .prog {
        width: min(calc(var(--u) * 400), 100%);
        margin-top: calc(var(--u) * 14);
      }
      .times {
        display: flex;
        justify-content: space-between;
        font-size: max(12px, calc(var(--u) * 13));
        color: rgb(255 255 255 / 0.8);
        margin-top: calc(var(--u) * -4);
        font-variant-numeric: tabular-nums;
      }
      /* sliders: a thin white track in a 44px-tall touch area */
      input[type="range"] {
        -webkit-appearance: none;
        appearance: none;
        display: block;
        width: 100%;
        height: 44px;
        margin: 0;
        background: none;
        cursor: pointer;
        touch-action: none;
        --track: max(4px, calc(var(--u) * 6));
        --knob: max(14px, calc(var(--u) * 16));
      }
      input[type="range"]:disabled {
        cursor: default;
      }
      input[type="range"]::-webkit-slider-runnable-track {
        height: var(--track);
        border-radius: 99px;
        background: linear-gradient(90deg, #fff var(--p, 0%), rgb(255 255 255 / 0.28) var(--p, 0%));
      }
      input[type="range"]::-moz-range-track {
        height: var(--track);
        border-radius: 99px;
        background: linear-gradient(90deg, #fff var(--p, 0%), rgb(255 255 255 / 0.28) var(--p, 0%));
      }
      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: var(--knob);
        height: var(--knob);
        margin-top: calc((var(--track) - var(--knob)) / 2);
        border-radius: 50%;
        background: #fff;
        border: 0;
        box-shadow: 0 1px 4px rgb(0 0 0 / 0.35);
      }
      input[type="range"]::-moz-range-thumb {
        width: var(--knob);
        height: var(--knob);
        border-radius: 50%;
        background: #fff;
        border: 0;
        box-shadow: 0 1px 4px rgb(0 0 0 / 0.35);
      }
      input[type="range"]:disabled::-webkit-slider-thumb {
        visibility: hidden;
      }
      input[type="range"]:disabled::-moz-range-thumb {
        visibility: hidden;
      }
      .row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: calc(var(--u) * 28);
        margin-top: calc(var(--u) * 14);
      }
      .row.sec {
        gap: max(10px, calc(var(--u) * 20));
        margin-top: calc(var(--u) * 16);
      }
      /* frosted glass buttons, the HomeView card glass at button size */
      button.g {
        position: relative;
        isolation: isolate;
        flex: none;
        width: max(44px, calc(var(--u) * 48));
        height: max(44px, calc(var(--u) * 48));
        padding: 0;
        border: 0;
        border-radius: 50%;
        display: grid;
        place-items: center;
        cursor: pointer;
        color: #fff;
        background: rgb(84 74 64 / 0.13);
        backdrop-filter: blur(22px) saturate(1.5) brightness(1.04);
        -webkit-backdrop-filter: blur(22px) saturate(1.5) brightness(1.04);
        box-shadow:
          0 0 0 0.75px rgb(60 46 32 / 0.2),
          0 calc(var(--u) * 6) calc(var(--u) * 18) rgb(60 45 30 / 0.14);
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
        transition:
          transform 0.45s var(--hv-spring),
          background-color 0.2s ease,
          opacity 0.2s ease;
      }
      button.g::after {
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
      button.g svg {
        width: 46%;
        height: 46%;
        display: block;
        filter: drop-shadow(0 1px 2px rgb(40 30 20 / 0.35));
      }
      button.g:active:not(:disabled) {
        transform: scale(0.9);
        transition-duration: 0.12s;
      }
      button.g:disabled {
        opacity: 0.4;
        cursor: default;
      }
      button.g.skip {
        width: max(44px, calc(var(--u) * 60));
        height: max(44px, calc(var(--u) * 60));
      }
      button.g.skip svg {
        width: 40%;
        height: 40%;
      }
      /* play / pause: a solid white disc, the one thing to find at a glance */
      button.g.play {
        width: max(56px, calc(var(--u) * 76));
        height: max(56px, calc(var(--u) * 76));
        background: #fff;
        color: #2b241d;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        box-shadow: 0 calc(var(--u) * 6) calc(var(--u) * 18) rgb(20 12 10 / 0.3);
      }
      button.g.play svg {
        width: 42%;
        height: 42%;
        filter: none;
      }
      button.g.play::after {
        box-shadow: none;
      }
      /* shuffle / repeat on, and the open volume button: white glass, dark glyph */
      button.g.on {
        background: rgb(255 255 255 / 0.85);
        color: #2b241d;
      }
      button.g.on svg {
        filter: none;
      }
      .top {
        position: absolute;
        top: max(12px, calc(var(--u) * 18));
        right: max(12px, calc(var(--u) * 20));
      }
      /* the volume slider opens beside its button, in place of shuffle and repeat */
      .volwrap {
        display: flex;
        align-items: center;
        gap: max(10px, calc(var(--u) * 12));
      }
      .pop {
        width: max(200px, calc(var(--u) * 236));
        height: max(44px, calc(var(--u) * 48));
        box-sizing: border-box;
        padding: 0 16px 0 18px;
        display: flex;
        align-items: center;
        gap: 10px;
        border-radius: 999px;
        background: rgb(84 74 64 / 0.13);
        backdrop-filter: blur(22px) saturate(1.5) brightness(1.04);
        -webkit-backdrop-filter: blur(22px) saturate(1.5) brightness(1.04);
        box-shadow:
          0 0 0 0.75px rgb(60 46 32 / 0.2),
          inset 0 0 0 1px rgb(255 255 255 / 0.16),
          inset 1.5px 1.5px 0.5px -0.5px rgb(255 255 255 / 0.8),
          inset -1px -1px 0.5px -0.5px rgb(255 255 255 / 0.4);
        transform-origin: left center;
        animation: pop 0.35s var(--hv-spring);
      }
      .pop input {
        flex: 1;
        min-width: 0;
      }
      .pct {
        width: 2.4em;
        text-align: right;
        font-size: 15px;
        font-weight: 600;
        font-variant-numeric: tabular-nums;
        text-shadow: var(--hv-shadow-text);
      }
      @keyframes pop {
        from {
          opacity: 0;
          transform: scaleX(0.6);
        }
      }
    `,
  ];
}

customElements.define("homeview-media-card", HomeViewMediaCard);
registerCard("homeview-media-card", "HomeView Now Playing", "One media player full screen: album art, progress, transport, volume, shuffle and repeat.");
