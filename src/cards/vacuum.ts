/**
 * HomeView vacuum: a glass tile with the robot's status ("Docked \u00b7 100%") that turns while it
 * cleans. Tap opens a glass panel over the dashboard: status and battery, the map, rooms to
 * clean, start / pause / dock / locate, suction and the robot's mode selects. Hold opens
 * Home Assistant's own dialog.
 */
import { css, html, nothing, type TemplateResult } from "lit";
import { HomeViewCard, type BaseConfig } from "./base.ts";
import { HomeViewTileCard } from "./tile.ts";
import { HomeViewOverlay, openOverlay } from "./overlay.ts";
import { domainOf, fireEvent, friendlyName, isUnavailable, registerCard, type GridOptions, type Hass, type HassEntity } from "../ha.ts";
import type { EditorField } from "../editor.ts";
import { ICONS } from "../icons.ts";
import { VACUUM_RUNNING, capitalize, roborockRooms, vacuumStatus, within } from "../logic.ts";
import { inDialog } from "../glass/backdrop.ts";

export interface VacuumConfig extends BaseConfig {
  entity: string;
  name?: string;
  /** battery sensor; defaults to the robot's own battery sensor */
  battery?: string;
  /** map image (image.* or camera.*); defaults to the robot's own map image */
  map?: string;
  /** select entities shown as choices in the panel, e.g. mop mode and intensity */
  modes?: string[];
}

/** vacuum supported_features bits */
const PAUSE = 4;
const RETURN_HOME = 16;
const FAN_SPEED = 32;
const SEND_COMMAND = 256;
const LOCATE = 512;
const START = 8192;

const HOLD_MS = 500;

/** the robot's other entities, found through its device */
function deviceEntities(hass: Hass, entity: string): string[] {
  const dev = hass.entities?.[entity]?.device_id;
  if (!dev) return [];
  return Object.entries(hass.entities ?? {})
    .filter(([id, e]) => e.device_id === dev && id !== entity && hass.states[id])
    .map(([id]) => id);
}

function batteryOf(hass: Hass, c: VacuumConfig): number | undefined {
  const id = c.battery ?? deviceEntities(hass, c.entity).find((id) => domainOf(id) === "sensor" && hass.states[id].attributes.device_class === "battery");
  // older integrations still report it on the vacuum itself
  const raw: unknown = id ? hass.states[id]?.state : hass.states[c.entity]?.attributes.battery_level;
  const v = Number(raw);
  return raw === undefined || raw === null || raw === "" || !isFinite(v) ? undefined : v;
}

function mapOf(hass: Hass, c: VacuumConfig): string | undefined {
  if (c.map) return c.map;
  return deviceEntities(hass, c.entity).find((id) => (domainOf(id) === "image" || domainOf(id) === "camera") && !isUnavailable(hass.states[id]) && hass.states[id].attributes.entity_picture);
}

export class HomeViewVacuumCard extends HomeViewCard<VacuumConfig> {
  private holdTimer = 0;
  private held = false;
  private panel?: HomeViewVacuumPanel;

  static editorFields: EditorField[] = [
    { name: "entity", required: true, selector: { entity: { filter: { domain: "vacuum" } } } },
    { name: "name", selector: { text: {} } },
    { name: "battery", helper: "Defaults to the robot's own battery sensor", selector: { entity: { filter: { domain: "sensor", device_class: "battery" } } } },
    { name: "map", helper: "Defaults to the robot's own map image", selector: { entity: { filter: { domain: ["image", "camera"] } } } },
    { name: "modes", label: "Mode choices", helper: "Select entities offered in the panel, such as mop mode or intensity", selector: { entity: { multiple: true, filter: { domain: "select" } } } },
  ];

  static getStubConfig(hass: Hass): Partial<VacuumConfig> {
    return { entity: Object.keys(hass.states).find((e) => domainOf(e) === "vacuum") ?? "" };
  }

  protected validate(config: VacuumConfig): void {
    if (!config.entity || domainOf(config.entity) !== "vacuum") throw new Error("Pick a vacuum entity");
  }

  getGridOptions(): GridOptions {
    return { columns: 4, rows: "auto", min_columns: 3, min_rows: 2 };
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.panel?.close();
  }

  protected updated(changed: Map<PropertyKey, unknown>): void {
    super.updated?.(changed);
    if (this.panel && changed.has("hass") && this.hass) this.panel.hass = this.hass;
  }

  protected cardClass(): string {
    const s = this.hass?.states[this._config!.entity];
    const running = !!s && VACUUM_RUNNING.includes(s.state);
    return `tile vacuum ${running ? "on" : ""} ${s?.state === "cleaning" ? "cleaning" : ""} ${isUnavailable(s) ? "unavailable" : ""}`;
  }

  protected renderContent(): TemplateResult | typeof nothing {
    const c = this._config!;
    if (!this.hass) return nothing;
    const s = this.hass.states[c.entity];
    const name = c.name ?? (s ? friendlyName(this.hass, c.entity) : c.entity);
    const sub = !s ? "Entity not found" : vacuumStatus(s.state, batteryOf(this.hass, c));
    return html`<button
      class="hit"
      aria-label="${name}, ${sub}"
      aria-haspopup="dialog"
      ?disabled=${!s}
      @pointerdown=${this.down}
      @pointerup=${this.up}
      @pointerleave=${this.up}
      @pointercancel=${this.up}
      @click=${this.tap}
      @contextmenu=${(e: Event) => e.preventDefault()}
    >
      <span class="icon">${ICONS.vacuum}</span>
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

  private tap = (): void => {
    if (this.held) {
      this.held = false;
      return;
    }
    if (!this.hass || this.panel) return;
    // not from the card editor's preview: the panel would open under the editor dialog
    if (inDialog(this)) return fireEvent(this, "hass-more-info", { entityId: this._config!.entity });
    const el = document.createElement("homeview-vacuum-panel") as HomeViewVacuumPanel;
    el.hass = this.hass;
    el.config = this._config!;
    el.onClosed = () => {
      this.panel = undefined;
      if (this.isConnected) this.renderRoot.querySelector<HTMLElement>("button")?.focus({ preventScroll: true });
    };
    this.panel = el;
    openOverlay(el);
  };

  static styles = [
    ...HomeViewTileCard.styles,
    css`
      ha-card.vacuum.on .icon {
        color: #0a9d8f;
      }
      ha-card.cleaning .icon svg {
        animation: spin 2.4s linear infinite;
      }
    `,
  ];
}

interface Segment {
  id: string;
  name: string;
}

/** The vacuum's panel: a glass sheet over the blurred dashboard. Tap outside or swipe down to close. */
export class HomeViewVacuumPanel extends HomeViewOverlay {
  static properties = { ...HomeViewOverlay.properties, hass: { attribute: false }, _rooms: { state: true }, _picked: { state: true } };
  hass?: Hass;
  config!: VacuumConfig;
  onClosed?: () => void;
  private _rooms?: Segment[];
  private _picked: string[] = [];
  protected readonly label = "Vacuum";
  protected readonly closeLabel = "Close vacuum";
  protected readonly openMs = 30 * 60 * 1000;
  protected readonly ownClose = true;

  connectedCallback(): void {
    super.connectedCallback();
    void this.loadRooms();
  }

  protected closed(): void {
    this.onClosed?.();
  }

  /** rooms the robot knows, from Home Assistant's vacuum segments (Roborock rooms can be cleaned by id) */
  private async loadRooms(): Promise<void> {
    const c = this.config;
    if (!this.hass || this.hass.entities?.[c.entity]?.platform !== "roborock") return;
    try {
      const r = await within(this.hass.callWS<{ segments: Segment[] }>({ type: "vacuum/get_segments", entity_id: c.entity }), 15000);
      this._rooms = r.segments ?? [];
    } catch (e) {
      console.warn("HomeView vacuum: no rooms", e);
      this._rooms = [];
    }
  }

  private call(domain: string, service: string, data: Record<string, unknown> = {}, entity = this.config.entity): void {
    void this.hass?.callService(domain, service, data, { entity_id: entity });
  }

  private start = (): void => {
    const rooms = roborockRooms(this._picked);
    if (rooms.length) {
      // ponytail: Roborock's own command; Home Assistant's vacuum.clean_area needs the rooms mapped
      // to areas first. Switch to it once that mapping is common.
      this.call("vacuum", "send_command", { command: "app_segment_clean", params: [{ segments: rooms, repeat: 1 }] });
      this._picked = [];
    } else this.call("vacuum", "start");
  };

  private toggleRoom(id: string): void {
    this._picked = this._picked.includes(id) ? this._picked.filter((r) => r !== id) : [...this._picked, id];
  }

  private chips(options: string[], current: string | undefined, pick: (o: string) => void, disabled = false): TemplateResult {
    return html`<div class="chips">
      ${options.map((o) => html`<button class="chip ${o === current ? "on" : ""}" ?disabled=${disabled} aria-pressed=${String(o === current)} @click=${() => pick(o)}>${capitalize(o)}</button>`)}
    </div>`;
  }

  protected renderBody(): TemplateResult {
    const c = this.config;
    const hass = this.hass;
    const s: HassEntity | undefined = hass?.states[c.entity];
    if (!hass || !s) return html`<div class="scrim" @click=${() => this.close()}></div>`;
    const f = Number(s.attributes.supported_features) || 0;
    const off = isUnavailable(s);
    const running = VACUUM_RUNNING.includes(s.state);
    const battery = batteryOf(hass, c);
    const name = c.name ?? friendlyName(hass, c.entity);
    const map = mapOf(hass, c);
    const mapPic = map ? (hass.states[map]?.attributes.entity_picture as string | undefined) : undefined;
    const speeds = ((s.attributes.fan_speed_list as string[] | undefined) ?? []).filter((o) => o !== "custom");
    const btn = (label: string, icon: TemplateResult, on: () => void, show: boolean, primary = false): TemplateResult | typeof nothing =>
      show ? html`<button class="act ${primary ? "primary" : ""}" ?disabled=${off} @click=${on}>${icon}<span>${label}</span></button>` : nothing;
    const picked = this._picked.length;
    return html`<div class="scrim" @click=${() => this.close()}></div>
      <section class="sheet" @pointerdown=${(e: Event) => e.stopPropagation()} @touchmove=${(e: Event) => e.stopPropagation()}>
        <header>
          <span class="robot ${s.state === "cleaning" ? "cleaning" : ""}">${ICONS.vacuum}</span>
          <div>
            <h2>${vacuumStatus(s.state)}</h2>
            <p>${[name, battery === undefined ? "" : `${Math.round(battery)}% battery`].filter(Boolean).join(" \u00b7 ")}</p>
          </div>
          ${this.closeButton()}
        </header>
        <div class="cols ${mapPic ? "" : "nomap"}">
          ${mapPic ? html`<div class="map"><img src=${hass.hassUrl(mapPic)} alt="Map" draggable="false" /></div>` : nothing}
          <div class="controls">
            <div class="acts">
              ${btn(s.state === "paused" ? "Resume" : picked ? `Clean ${picked} room${picked > 1 ? "s" : ""}` : "Start", html`<span class="g">${ICONS.start}</span>`, this.start, !!(f & START) && s.state !== "cleaning", true)}
              ${btn("Pause", html`<span class="g">${ICONS.pause}</span>`, () => this.call("vacuum", "pause"), !!(f & PAUSE) && s.state === "cleaning")}
              ${btn("Dock", html`<span class="g">${ICONS.home}</span>`, () => this.call("vacuum", "return_to_base"), !!(f & RETURN_HOME) && (running || s.state === "idle" || s.state === "error"))}
              ${btn("Locate", html`<span class="g">${ICONS.locate}</span>`, () => this.call("vacuum", "locate"), !!(f & LOCATE))}
            </div>
            ${this._rooms?.length && f & SEND_COMMAND && !running
              ? html`<h3>Rooms</h3>
                  <div class="chips">
                    <button class="chip ${picked ? "" : "on"}" aria-pressed=${String(!picked)} @click=${() => (this._picked = [])}>Entire home</button>
                    ${this._rooms.map((r) => html`<button class="chip ${this._picked.includes(r.id) ? "on" : ""}" aria-pressed=${String(this._picked.includes(r.id))} @click=${() => this.toggleRoom(r.id)}>${r.name}</button>`)}
                  </div>`
              : nothing}
            ${speeds.length && f & FAN_SPEED
              ? html`<h3>Suction</h3>
                  ${this.chips(speeds, s.attributes.fan_speed as string | undefined, (o) => this.call("vacuum", "set_fan_speed", { fan_speed: o }), off)}`
              : nothing}
            ${(c.modes ?? []).map((id) => {
              const m = hass.states[id];
              if (!m) return nothing;
              const options = ((m.attributes.options as string[] | undefined) ?? []).filter((o) => o !== "custom");
              const label = friendlyName(hass, id).replace(friendlyName(hass, c.entity), "").trim() || id;
              return html`<h3>${capitalize(label)}</h3>
                ${this.chips(options, m.state, (o) => this.call("select", "select_option", { option: o }, id), isUnavailable(m))}`;
            })}
          </div>
        </div>
      </section>`;
  }

  static styles = [
    HomeViewOverlay.overlayStyles,
    css`
      /* tinted enough to read without the blur (browsers that drop backdrop-filter here) */
      :host {
        background: rgb(28 22 16 / 0.5);
        backdrop-filter: blur(18px) saturate(1.3);
        -webkit-backdrop-filter: blur(18px) saturate(1.3);
        font-family: -apple-system, "SF Pro Display", "Inter", system-ui, "Segoe UI", Roboto, sans-serif;
        color: #fff;
      }
      .stage {
        display: grid;
        place-items: center;
        padding: max(24px, env(safe-area-inset-top)) 16px 24px;
        box-sizing: border-box;
      }
      .scrim {
        position: absolute;
        inset: 0;
      }
      .sheet {
        position: relative;
        width: min(860px, 100%);
        max-height: 100%;
        box-sizing: border-box;
        overflow: auto;
        overscroll-behavior: contain;
        touch-action: pan-y;
        padding: 26px 28px 28px;
        border-radius: 32px;
        background: rgb(74 64 54 / 0.78);
        backdrop-filter: blur(30px) saturate(1.6);
        -webkit-backdrop-filter: blur(30px) saturate(1.6);
        box-shadow:
          inset 0 0 0 1px rgb(255 255 255 / 0.18),
          inset 1.5px 1.5px 0.5px -0.5px rgb(255 255 255 / 0.7),
          0 24px 60px rgb(0 0 0 / 0.3);
        text-shadow: 0 1px 3px rgb(40 30 20 / 0.3);
      }
      header {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 20px;
      }
      header > div {
        flex: 1;
        min-width: 0;
      }
      header .close {
        position: static;
        flex: none;
        align-self: flex-start;
      }
      .robot svg {
        width: 48px;
        height: 48px;
        display: block;
      }
      .robot.cleaning svg {
        color: #4fe0cf;
        animation: spin 2.4s linear infinite;
      }
      h2 {
        margin: 0;
        font-size: 28px;
        font-weight: 700;
        line-height: 1.1;
      }
      header p {
        margin: 4px 0 0;
        font-size: 16px;
        color: rgb(255 255 255 / 0.8);
      }
      .cols {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
        align-items: start;
      }
      .cols.nomap {
        grid-template-columns: 1fr;
      }
      @media (max-width: 640px) {
        .cols {
          grid-template-columns: 1fr;
        }
      }
      .map {
        border-radius: 20px;
        background: rgb(255 255 255 / 0.12);
        box-shadow: inset 0 0 0 0.5px rgb(255 255 255 / 0.35);
        padding: 10px;
        aspect-ratio: 1;
        box-sizing: border-box;
      }
      .map img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
        -webkit-user-drag: none;
      }
      h3 {
        margin: 18px 0 8px;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: rgb(255 255 255 / 0.72);
      }
      .acts {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      button {
        font: inherit;
        color: inherit;
        border: 0;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
        text-shadow: none;
        transition:
          background 0.2s ease,
          transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      button:active {
        transform: scale(0.95);
      }
      button:disabled {
        opacity: 0.45;
        cursor: default;
      }
      .act {
        height: 48px;
        min-width: 120px;
        border-radius: 24px;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font-size: 16px;
        font-weight: 600;
        background: rgb(255 255 255 / 0.16);
        box-shadow: inset 0 0 0 0.5px rgb(255 255 255 / 0.4);
        white-space: nowrap;
      }
      .act.primary {
        background: rgb(255 255 255 / 0.88);
        color: #2b241d;
      }
      .g svg {
        width: 18px;
        height: 18px;
        display: block;
      }
      .chip {
        height: 40px;
        border-radius: 20px;
        padding: 0 16px;
        font-size: 15px;
        font-weight: 600;
        background: rgb(255 255 255 / 0.14);
        box-shadow: inset 0 0 0 0.5px rgb(255 255 255 / 0.35);
      }
      .chip.on {
        background: rgb(255 255 255 / 0.88);
        color: #2b241d;
      }
      :focus-visible {
        outline: 2px solid rgb(255 255 255 / 0.9);
        outline-offset: 3px;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ];
}

if (!customElements.get("homeview-vacuum-panel")) customElements.define("homeview-vacuum-panel", HomeViewVacuumPanel);
customElements.define("homeview-vacuum-card", HomeViewVacuumCard);
registerCard("homeview-vacuum-card", "HomeView Vacuum", "Robot vacuum tile with a glass panel: map, rooms, start / pause / dock and suction.");
