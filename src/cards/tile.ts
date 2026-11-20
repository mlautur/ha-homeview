/**
 * HomeView tile: light, switch, fan, lock, cover, scene, script, input_boolean
 * and media player (what is playing, tap to play / pause). Tap runs the domain
 * action, hold opens more-info.
 */
import { css, html, nothing, type TemplateResult } from "lit";
import { HomeViewCard, glassStyles, type BaseConfig } from "./base.ts";
import { areaName, domainOf, fireEvent, friendlyName, isUnavailable, registerCard, type GridOptions, type Hass } from "../ha.ts";
import { iconFor } from "../icons.ts";
import type { EditorField } from "../editor.ts";
import { isActive, mediaLines, tapService } from "../logic.ts";

export const TILE_DOMAINS = ["light", "switch", "fan", "lock", "cover", "scene", "script", "input_boolean", "media_player"];

export interface TileConfig extends BaseConfig {
  entity: string;
  name?: string;
  subtitle?: string;
  icon?: string;
  tap_action?: "toggle" | "more-info" | "none";
  confirm_unlock?: boolean;
}

/** Whether the entity is in its highlighted ("on") state. Locks highlight when NOT locked. */

/** The service call a tap performs, or null when nothing should happen. */

const HOLD_MS = 500;

export class HomeViewTileCard extends HomeViewCard<TileConfig> {
  static properties = { ...HomeViewCard.properties, _confirming: { state: true }, _flash: { state: true } };
  private _confirming = false;
  private _flash = false;
  private holdTimer = 0;
  private held = false;
  private confirmTimer = 0;

  static editorFields: EditorField[] = [
    { name: "entity", required: true, selector: { entity: { filter: { domain: TILE_DOMAINS } } } },
    { name: "name", selector: { text: {} } },
    { name: "subtitle", helper: "Defaults to the entity's area", selector: { text: {} } },
    { name: "icon", helper: "Optional mdi: icon; HomeView glyphs are used by default", selector: { icon: {} } },
    {
      name: "tap_action",
      label: "Tap action",
      selector: { select: { mode: "dropdown", options: [{ value: "toggle", label: "Toggle / run" }, { value: "more-info", label: "More info" }, { value: "none", label: "Nothing" }] } },
    },
    { name: "confirm_unlock", label: "Confirm before unlocking (locks)", selector: { boolean: {} } },
  ];

  static getStubConfig(hass: Hass): Partial<TileConfig> {
    const pick = Object.keys(hass.states).find((e) => domainOf(e) === "light") ?? Object.keys(hass.states).find((e) => TILE_DOMAINS.includes(domainOf(e)));
    return { entity: pick ?? "" };
  }

  protected validate(config: TileConfig): void {
    if (!config.entity) throw new Error("Pick an entity");
  }

  getGridOptions(): GridOptions {
    return { columns: 4, rows: "auto", min_columns: 3, min_rows: 2 };
  }

  getCardSize(): number {
    return 3;
  }

  protected cardClass(): string {
    const c = this._config!;
    const s = this.hass?.states[c.entity];
    const domain = domainOf(c.entity);
    // a media player stays clear glass with white ink: what is playing is the news, not an "on" state
    const on = s && !isUnavailable(s) && isActive(domain, s.state) && domain !== "media_player";
    return `tile ${domain} ${on || this._flash ? "on" : ""} ${isUnavailable(s) ? "unavailable" : ""} ${this._confirming ? "confirming" : ""}`;
  }

  protected renderContent(): TemplateResult | typeof nothing {
    const c = this._config!;
    if (!this.hass) return nothing;
    const s = this.hass.states[c.entity];
    const domain = domainOf(c.entity);
    const on = !!s && !isUnavailable(s) && isActive(domain, s.state);
    let name = c.name ?? (s ? friendlyName(this.hass, c.entity) : c.entity);
    let sub = c.subtitle ?? areaName(this.hass, c.entity) ?? "";
    // a media player reads what is playing: the title, then the artist (or the player when idle)
    let art = "";
    if (s && domain === "media_player" && !isUnavailable(s)) {
      ({ title: name, sub } = mediaLines(s, name));
      if ((s.state === "playing" || s.state === "paused") && s.attributes.entity_picture) art = this.hass.hassUrl(s.attributes.entity_picture);
    }
    if (!s) sub = "Entity not found";
    else if (s.state === "unavailable") sub = "Unavailable";
    else if (this._confirming) sub = "Tap again to unlock";
    // a lock in motion reads "Locking…" while the tile keeps its old look until Home Assistant reports the new state
    else if (domain === "lock" && ["locking", "unlocking", "jammed", "opening", "open"].includes(s.state))
      sub = s.state[0].toUpperCase() + s.state.slice(1) + (s.state.endsWith("ing") ? "\u2026" : "");
    // locks and covers read their own state (locked, open, closing...); scenes and scripts have none worth reading
    const stateText = !s ? "missing" : domain === "lock" || domain === "cover" || domain === "media_player" ? s.state : domain === "scene" || domain === "script" ? "" : on ? "on" : "off";
    return html`<button
      class="hit"
      aria-label="${[name, sub, stateText].filter(Boolean).join(", ")}"
      aria-pressed=${domain === "scene" || domain === "script" || domain === "media_player" ? nothing : String(on)}
      ?disabled=${!s || s.state === "unavailable"}
      @pointerdown=${this.down}
      @pointerup=${this.up}
      @pointerleave=${this.cancel}
      @pointercancel=${this.cancel}
      @click=${this.onTap}
      @contextmenu=${(e: Event) => e.preventDefault()}
    >
      <span class="icon">${art ? html`<img class="art" src=${art} alt="" draggable="false" />` : c.icon ? html`<ha-icon .icon=${c.icon}></ha-icon>` : iconFor(domain, s?.attributes.device_class, on)}</span>
      <span class="label ink"><span class="title">${name}</span><br /><span class="sub">${sub}</span></span>
    </button>`;
  }

  private down = (): void => {
    this.held = false;
    clearTimeout(this.holdTimer);
    this.holdTimer = window.setTimeout(() => {
      this.held = true;
      fireEvent(this, "hass-more-info", { entityId: this._config!.entity });
    }, HOLD_MS);
  };

  private up = (): void => clearTimeout(this.holdTimer);
  private cancel = (): void => clearTimeout(this.holdTimer);

  private onTap = (): void => {
    if (this.held) {
      this.held = false;
      return;
    }
    const c = this._config!;
    const action = c.tap_action ?? "toggle";
    if (action === "none" || !this.hass) return;
    if (action === "more-info") {
      fireEvent(this, "hass-more-info", { entityId: c.entity });
      return;
    }
    const s = this.hass.states[c.entity];
    if (!s) return;
    const domain = domainOf(c.entity);
    if (domain === "lock" && s.state === "locked" && c.confirm_unlock && !this._confirming) {
      this._confirming = true;
      clearTimeout(this.confirmTimer);
      this.confirmTimer = window.setTimeout(() => (this._confirming = false), 3000);
      return;
    }
    this._confirming = false;
    const svc = tapService(domain, s.state);
    if (!svc) return;
    if (domain === "scene") {
      this._flash = true;
      setTimeout(() => (this._flash = false), 1200);
    }
    void this.hass.callService(svc[0], svc[1], {}, { entity_id: c.entity });
  };

  static styles = [
    glassStyles,
    css`
      .hit {
        appearance: none;
        border: 0;
        background: none;
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: calc(var(--hv-ref) * 0.07);
        text-align: center;
        border-radius: inherit;
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
        user-select: none;
        -webkit-user-select: none;
      }
      .hit:disabled {
        cursor: default;
        opacity: 0.55;
      }
      ha-card.tile {
        transition: transform 0.45s var(--hv-spring), box-shadow 0.35s ease;
      }
      ha-card.tile:active {
        transform: scale(0.94);
        transition-duration: 0.12s;
      }
      .icon {
        width: calc(var(--hv-ref) * 0.31);
        height: calc(var(--hv-ref) * 0.31);
        display: grid;
        place-items: center;
        --mdc-icon-size: calc(var(--hv-ref) * 0.27);
      }
      .icon svg {
        width: 100%;
        height: 100%;
        display: block;
        filter: drop-shadow(var(--hv-shadow-text));
        transition: color 0.35s ease, filter 0.35s ease;
      }
      .label {
        padding: 0 6px;
        max-width: 100%;
        overflow: hidden;
      }
      .label .title,
      .label .sub {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
        max-width: 100%;
      }
      /* active: frosted white glass, navy glyph and ink, as Apple's HomeView "on" tiles (the wallpaper tints it lavender).
         The glass swaps in ~0.1 s; the glyph follows a beat later, as on the panel. */
      ha-card.tile .hv-tint {
        transition-duration: 0.08s;
      }
      /* the ink fades with the glass so it never sits white on white (or navy on blue) mid-swap */
      ha-card.tile .label,
      ha-card.tile .label .sub {
        transition: color 0.08s ease, text-shadow 0.08s ease;
      }
      ha-card.tile .icon svg {
        transition: color 0.18s ease 0.08s, filter 0.18s ease 0.08s;
      }
      ha-card.on {
        --hv-fill: rgb(255 255 255 / 0.8);
      }
      ha-card.on .icon {
        color: #1b1c6c;
      }
      ha-card.on .label {
        text-shadow: none;
        color: #0c0e38;
      }
      ha-card.on .label .sub {
        color: rgb(12 14 56 / 0.6);
      }
      ha-card.on .icon svg {
        filter: none;
      }
      /* padlock: locking flips the shackle 180deg about the leg it shares with the closed shackle (scaleX through 0)
         and slides the lock home; unlocking runs the same flip back. Transforms only, so it stays on the compositor. */
      .padlock .pl {
        transition: transform 0.2s cubic-bezier(0.3, 0, 0.2, 1) 0.22s;
      }
      .padlock .sh-open,
      .padlock .sh-closed {
        transform-origin: 16.55px 0;
      }
      ha-card:not(.on) .padlock .sh-open,
      ha-card.on .padlock .sh-closed {
        transform: scaleX(0);
        transition: transform 0.1s cubic-bezier(0.4, 0, 1, 1) 0.22s;
      }
      ha-card:not(.on) .padlock .sh-closed,
      ha-card.on .padlock .sh-open {
        transform: none;
        transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1) 0.32s;
      }
      ha-card.on .padlock .pl {
        transform: translateX(-1.9px);
      }
      @media (prefers-reduced-motion: reduce) {
        .padlock * {
          transition: none !important;
        }
      }
      ha-card.confirming .icon {
        color: #ffb27a;
      }
      ha-card.confirming .sub {
        color: #fff;
        font-weight: 600;
      }
      ha-card.fan.on .blades {
        animation: spin 1.1s linear infinite;
        transform-origin: 12px 10px;
      }
      .icon img.art {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: calc(var(--hv-ref) * 0.05);
        box-shadow: 0 calc(var(--hv-ref) * 0.015) calc(var(--hv-ref) * 0.05) rgb(40 30 20 / 0.3);
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ];
}

customElements.define("homeview-tile-card", HomeViewTileCard);
registerCard("homeview-tile-card", "HomeView Tile", "Liquid-glass tile for lights, switches, fans, locks, covers, scenes and scripts.");
