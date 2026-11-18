/**
 * HomeView thermostat: big setpoint with a spring roll, chevrons, current
 * temperature. Single setpoint (`temperature`) and dual heat_cool
 * (`target_temp_low` / `target_temp_high`, tap the chips to pick a side).
 * Changes are applied locally at once and sent after the user stops tapping.
 */
import { css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { HomeViewCard, glassStyles, type BaseConfig } from "./base.ts";
import { areaName, isUnavailable, registerCard, type GridOptions, type Hass, type HassEntity } from "../ha.ts";
import { ICONS } from "../icons.ts";
import { spring } from "../util/spring.ts";
import type { EditorField } from "../editor.ts";
import { clampStep, defaultSide, setpoints } from "../logic.ts";

export interface ThermostatConfig extends BaseConfig {
  entity: string;
  name?: string;
  subtitle?: string;
  step?: number;
}

type Side = "single" | "low" | "high";

export const DEBOUNCE_MS = 800;

/** Setpoint model derived from a climate entity. */

/** Clamp to [min, max] and snap to the step grid. */

/** Which side of a heat_cool range the big number shows by default. */

export class HomeViewThermostatCard extends HomeViewCard<ThermostatConfig> {
  static properties = { ...HomeViewCard.properties, _pending: { state: true }, _side: { state: true } };
  private _pending?: { low?: number; high?: number; value?: number; at: number };
  private _side?: "low" | "high";
  private sendTimer = 0;
  private lastDir = 0;

  static editorFields: EditorField[] = [
    { name: "entity", required: true, selector: { entity: { filter: { domain: "climate" } } } },
    { name: "name", selector: { text: {} } },
    { name: "subtitle", helper: "Defaults to the entity's area", selector: { text: {} } },
    { name: "step", helper: "Defaults to the entity's target temperature step", selector: { number: { min: 0.1, max: 5, step: 0.1, mode: "box" } } },
  ];

  static getStubConfig(hass: Hass): Partial<ThermostatConfig> {
    return { entity: Object.keys(hass.states).find((e) => e.startsWith("climate.")) ?? "" };
  }

  protected validate(config: ThermostatConfig): void {
    if (!config.entity || !config.entity.startsWith("climate.")) throw new Error("Pick a climate entity");
  }

  getGridOptions(): GridOptions {
    return { columns: 8, rows: "auto", min_columns: 6, min_rows: 4 };
  }

  getCardSize(): number {
    return 6;
  }

  /** typography follows the mockup's grid cell: half the thermostat */
  protected refFrom(w: number, h: number): number {
    return Math.min(w, h) / 2;
  }

  private get stateObj(): HassEntity | undefined {
    return this.hass?.states[this._config!.entity];
  }

  private get step(): number {
    return this._config?.step ?? (this.stateObj?.attributes.target_temp_step as number | undefined) ?? (this.hass?.config.unit_system.temperature === "°C" ? 0.5 : 1);
  }

  /** setpoints with any not-yet-confirmed local change applied */
  private current(): { mode: "single" | "dual" | "none"; value?: number; low?: number; high?: number } {
    const s = this.stateObj;
    if (!s) return { mode: "none" };
    const sp = setpoints(s);
    const p = this._pending;
    if (p && Date.now() - p.at < 6000) return { ...sp, ...Object.fromEntries(Object.entries(p).filter(([k, v]) => k !== "at" && v !== undefined)) };
    return sp;
  }

  private activeSide(): Side {
    const sp = this.current();
    if (sp.mode !== "dual") return "single";
    return this._side ?? defaultSide(this.stateObj!);
  }

  protected willUpdate(changed: PropertyValues): void {
    // drop the local override once HA reports the value we sent
    if (changed.has("hass") && this._pending && this.stateObj && !this.sendTimer) {
      const sp = setpoints(this.stateObj);
      const p = this._pending;
      const done = (p.value === undefined || p.value === sp.value) && (p.low === undefined || p.low === sp.low) && (p.high === undefined || p.high === sp.high);
      if (done || Date.now() - p.at > 6000) this._pending = undefined;
    }
  }

  private shown(): number | undefined {
    const sp = this.current();
    const side = this.activeSide();
    return side === "single" ? sp.value : side === "low" ? sp.low : sp.high;
  }

  private stepBy(dir: 1 | -1): void {
    const s = this.stateObj;
    if (!s) return;
    const sp = this.current();
    const side = this.activeSide();
    const a = s.attributes;
    const min = (a.min_temp as number | undefined) ?? -Infinity;
    const max = (a.max_temp as number | undefined) ?? Infinity;
    const step = this.step;
    const cur = this.shown();
    if (cur === undefined) return;
    let lo = min;
    let hi = max;
    // keep heat below cool
    if (side === "low" && sp.high !== undefined) hi = Math.min(max, sp.high - step);
    if (side === "high" && sp.low !== undefined) lo = Math.max(min, sp.low + step);
    const next = clampStep(cur + dir * step, step, lo, hi);
    if (next === cur) return;
    this.ghost(dir);
    const p = { ...(this._pending ?? {}), at: Date.now() };
    if (side === "single") p.value = next;
    else p[side] = next;
    this._pending = p;
    clearTimeout(this.sendTimer);
    this.sendTimer = window.setTimeout(() => this.send(), DEBOUNCE_MS);
  }

  private send(): void {
    this.sendTimer = 0;
    const s = this.stateObj;
    if (!s || !this.hass || !this._pending) return;
    const sp = this.current();
    const data: Record<string, unknown> =
      sp.mode === "dual" ? { target_temp_low: sp.low, target_temp_high: sp.high } : { temperature: sp.value };
    this._pending = { ...this._pending, at: Date.now() };
    void this.hass.callService("climate", "set_temperature", data, { entity_id: s.entity_id });
  }

  /** old number slides out; the new one springs in from the direction of travel (see updated) */
  private ghost(dir: 1 | -1): void {
    this.lastDir = dir;
    const num = this.renderRoot.querySelector<HTMLElement>(".num:not(.ghost)");
    if (!num || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const g = num.cloneNode(true) as HTMLElement;
    g.classList.add("ghost");
    num.parentElement!.appendChild(g);
    g.animate([{ transform: "none", opacity: 1 }, { transform: `translateY(${-36 * dir}%) scale(.9)`, opacity: 0 }], {
      duration: 200,
      easing: "cubic-bezier(.4,0,1,1)",
      fill: "forwards",
    }).finished.then(() => g.remove(), () => g.remove());
  }

  protected updated(changed: PropertyValues): void {
    super.updated?.(changed);
    if (!this.lastDir) return;
    const dir = this.lastDir;
    this.lastDir = 0;
    const num = this.renderRoot.querySelector<HTMLElement>(".num:not(.ghost)");
    if (!num || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sp = spring();
    num.animate([{ transform: `translateY(${40 * dir}%) scale(.9)` }, { transform: "none" }], { duration: sp.duration, easing: sp.easing });
    num.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, easing: "ease-out" });
  }

  private fmt(v: number | undefined): string {
    if (v === undefined) return "--";
    return this.step < 1 ? v.toFixed(1) : String(Math.round(v));
  }

  protected renderContent(): TemplateResult | typeof nothing {
    const c = this._config!;
    if (!this.hass) return nothing;
    const s = this.stateObj;
    if (!s) return html`<div class="center warning ink">Entity not found: ${c.entity}</div>`;
    const sp = this.current();
    const side = this.activeSide();
    const off = s.state === "off";
    const unavailable = isUnavailable(s);
    const shown = this.shown();
    const cur = s.attributes.current_temperature;
    const sub = c.subtitle ?? areaName(this.hass, c.entity) ?? s.attributes.friendly_name;
    const a = s.attributes;
    const canStep = !unavailable && shown !== undefined;
    const upDisabled = !canStep || shown! >= ((side === "low" && sp.high !== undefined ? sp.high - this.step : a.max_temp) ?? Infinity);
    const downDisabled = !canStep || shown! <= ((side === "high" && sp.low !== undefined ? sp.low + this.step : a.min_temp) ?? -Infinity);
    return html`<div class="thermo">
      <div class="temp" aria-live="polite">
        <span class="num ink ${off || unavailable ? "dim" : ""}">${unavailable ? "--" : sp.mode === "none" ? this.fmt(cur) : this.fmt(shown)}</span>
        ${sp.mode === "dual"
          ? html`<div class="sides ink">
              <button class="side ${side === "low" ? "sel" : ""}" @click=${() => (this._side = "low")} aria-pressed=${String(side === "low")}>Heat ${this.fmt(sp.low)}</button>
              <button class="side ${side === "high" ? "sel" : ""}" @click=${() => (this._side = "high")} aria-pressed=${String(side === "high")}>Cool ${this.fmt(sp.high)}</button>
            </div>`
          : nothing}
      </div>
      <div class="bar">
        <button class="chev" aria-label="Lower setpoint" ?disabled=${downDisabled} @click=${() => this.stepBy(-1)}>${ICONS.chevronDown}</button>
        <div class="label ink">
          <div class="title">${c.name ?? "Thermostat"}</div>
          <div class="sub">${off ? "Off" : sub}${typeof cur === "number" ? html` &bull; ${this.fmt(cur)}&deg;` : nothing}</div>
        </div>
        <button class="chev" aria-label="Raise setpoint" ?disabled=${upDisabled} @click=${() => this.stepBy(1)}>${ICONS.chevronUp}</button>
      </div>
    </div>`;
  }

  static styles = [
    glassStyles,
    css`
      .thermo {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
      }
      .temp {
        position: relative;
        flex: 1;
        width: 100%;
        display: grid;
        place-items: center;
        overflow: hidden;
        padding-top: calc(var(--hv-ref) * 0.06);
      }
      .num {
        grid-area: 1 / 1;
        font-size: calc(var(--hv-ref) * 0.82);
        font-weight: 520;
        line-height: 1;
        letter-spacing: -0.035em;
        font-variant-numeric: tabular-nums;
        text-shadow: 0 2px 8px rgb(40 30 20 / 0.12);
        will-change: transform;
      }
      .num.dim {
        opacity: 0.55;
      }
      .sides {
        position: absolute;
        bottom: calc(var(--hv-ref) * 0.02);
        display: flex;
        gap: calc(var(--hv-ref) * 0.05);
      }
      .side {
        appearance: none;
        border: 0;
        cursor: pointer;
        border-radius: 999px;
        padding: calc(var(--hv-ref) * 0.025) calc(var(--hv-ref) * 0.07);
        min-height: 32px;
        background: rgb(255 255 255 / 0.12);
        font-size: calc(var(--hv-ref) * 0.075);
        font-weight: 600;
      }
      .side.sel {
        background: rgb(255 255 255 / 0.85);
        color: #2b241d;
        text-shadow: none;
      }
      .bar {
        width: 100%;
        box-sizing: border-box;
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        padding: 0 calc(var(--hv-ref) * 0.1) calc(var(--hv-ref) * 0.14);
      }
      .label {
        text-align: center;
        min-width: 0;
      }
      .label .sub {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .chev {
        appearance: none;
        border: 0;
        background: none;
        cursor: pointer;
        width: calc(var(--hv-ref) * 0.3);
        height: calc(var(--hv-ref) * 0.3);
        min-width: 44px;
        min-height: 44px;
        display: grid;
        place-items: center;
        border-radius: 50%;
        -webkit-tap-highlight-color: transparent;
        transition: background-color 0.2s, transform 0.35s var(--hv-spring);
      }
      .chev svg {
        width: calc(var(--hv-ref) * 0.2);
        height: calc(var(--hv-ref) * 0.2);
        filter: drop-shadow(var(--hv-shadow-text));
      }
      .chev:active {
        transform: scale(0.86);
        background: rgb(255 255 255 / 0.16);
      }
      .chev:disabled {
        opacity: 0.35;
        cursor: default;
      }
      .center {
        height: 100%;
        display: grid;
        place-items: center;
      }
    `,
  ];
}

customElements.define("homeview-thermostat-card", HomeViewThermostatCard);
registerCard("homeview-thermostat-card", "HomeView Thermostat", "Large liquid-glass thermostat with spring setpoint and heat/cool support.");
