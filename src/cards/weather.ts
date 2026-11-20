/**
 * HomeView weather: the time and date, a big temperature, the condition, and today's high, low
 * and chance of rain, on the same glass as the tiles. The forecast streams from Home Assistant
 * (weather/subscribe_forecast), so it follows the weather entity without polling.
 * Tap for Home Assistant's own weather dialog.
 */
import { css, html, nothing, type TemplateResult } from "lit";
import { HomeViewCard, glassStyles, type BaseConfig } from "./base.ts";
import { domainOf, fireEvent, isUnavailable, registerCard, type GridOptions, type Hass } from "../ha.ts";
import type { EditorField } from "../editor.ts";
import { ICONS } from "../icons.ts";
import { WEATHER_ICONS, forecastType, todayOutlook, weatherName, type ForecastEntry } from "../logic.ts";

export interface WeatherConfig extends BaseConfig {
  entity: string;
  /** show the time and date along the top (default true) */
  show_time?: boolean;
}

export class HomeViewWeatherCard extends HomeViewCard<WeatherConfig> {
  static properties = { ...HomeViewCard.properties, _forecast: { state: true }, _now: { state: true } };
  private _forecast?: ForecastEntry[];
  private _now = new Date();
  private unsub?: Promise<() => Promise<void>>;
  private subscribedTo = "";
  private tick = 0;

  static editorFields: EditorField[] = [
    { name: "entity", required: true, selector: { entity: { filter: { domain: "weather" } } } },
    { name: "show_time", label: "Show the time and date", selector: { boolean: {} } },
  ];

  static getStubConfig(hass: Hass): Partial<WeatherConfig> {
    return { entity: Object.keys(hass.states).find((e) => domainOf(e) === "weather") ?? "" };
  }

  protected validate(config: WeatherConfig): void {
    if (!config.entity || domainOf(config.entity) !== "weather") throw new Error("Pick a weather entity");
  }

  getGridOptions(): GridOptions {
    return { columns: 6, rows: "auto", min_columns: 4, min_rows: 2 };
  }

  protected cardClass(): string {
    return "weather";
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.resume();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unsubscribe();
    clearTimeout(this.tick);
    this.tick = 0;
  }

  /** start (or restart) the forecast stream and the minute tick; nothing runs while hidden */
  protected resume(): void {
    if (!this.onScreen || !this.hass || !this._config) return;
    this.subscribe();
    if (!this.tick) this.minute();
  }

  protected updated(changed: Map<PropertyKey, unknown>): void {
    super.updated?.(changed);
    if (changed.has("hass") || changed.has("_config")) this.resume();
  }

  private minute = (): void => {
    this.tick = 0;
    if (!this.onScreen) return; // resume() restarts it
    this._now = new Date();
    this.tick = window.setTimeout(this.minute, 60000 - (Date.now() % 60000) + 50);
  };

  private subscribe(): void {
    const id = this._config!.entity;
    const s = this.hass!.states[id];
    const type = forecastType(s?.attributes.supported_features);
    const key = type ? `${id}|${type}` : "";
    if (key === this.subscribedTo) return;
    this.unsubscribe();
    this.subscribedTo = key;
    if (!type) return;
    this.unsub = this.hass!.connection.subscribeMessage<{ forecast: ForecastEntry[] | null }>((m) => (this._forecast = m.forecast ?? undefined), {
      type: "weather/subscribe_forecast",
      entity_id: id,
      forecast_type: type,
    });
    this.unsub.catch(() => {
      // the entity went away or cannot forecast: show the current conditions only
      if (this.subscribedTo === key) this.subscribedTo = "";
    });
  }

  private unsubscribe(): void {
    const u = this.unsub;
    this.unsub = undefined;
    this.subscribedTo = "";
    this._forecast = undefined;
    void u?.then((f) => f()).catch(() => {});
  }

  protected renderContent(): TemplateResult | typeof nothing {
    const c = this._config!;
    if (!this.hass) return nothing;
    const s = this.hass.states[c.entity];
    if (!s) return html`<div class="center warning">Entity not found: ${c.entity}</div>`;
    const lang = this.hass.language;
    const now = this._now;
    const top =
      c.show_time === false
        ? nothing
        : html`<div class="top ink">
            <span class="time">${now.toLocaleTimeString(lang, { hour: "numeric", minute: "2-digit" })}</span>
            <span class="date">${now.toLocaleDateString(lang, { weekday: "long", month: "short", day: "numeric" })}</span>
          </div>`;
    if (isUnavailable(s)) return html`<button class="hit" @click=${this.more}>${top}<div class="center warning">Weather unavailable</div></button>`;
    const t = Number(s.attributes.temperature);
    const temp = isFinite(t) ? `${Math.round(t)}\u00b0` : "\u2013";
    const condition = (this.hass as Hass & { formatEntityState?: (s: unknown) => string }).formatEntityState?.(s) ?? weatherName(s.state);
    const o = todayOutlook(this._forecast);
    const deg = (v?: number): string => (v === undefined ? "\u2013" : `${Math.round(v)}\u00b0`);
    return html`<button class="hit" aria-label="${condition}, ${temp}" @click=${this.more}>
      ${top}
      <div class="now ink">
        <span class="temp ${temp.length > 3 ? "long" : ""}">${temp}</span>
        <span class="cond"><ha-icon .icon=${WEATHER_ICONS[s.state] ?? "mdi:weather-partly-cloudy"}></ha-icon><span>${condition}</span></span>
      </div>
      <div class="outlook ink">
        <span>H: ${deg(o.high)}</span><i></i><span class="dim">L: ${deg(o.low)}</span><i></i><span class="rain">${ICONS.drop}${this.wet(o, s.attributes.precipitation_unit)}</span>
      </div>
    </button>`;
  }

  /** the chance of rain, else the expected amount (some forecasts give only that) */
  private wet(o: { rain?: number; amount?: number }, unit?: string): string {
    if (o.rain !== undefined) return `${Math.round(o.rain)}%`;
    if (o.amount !== undefined) return `${Math.round(o.amount * 10) / 10}${unit ? ` ${unit}` : ""}`;
    return "\u2013";
  }

  private more = (): void => fireEvent(this, "hass-more-info", { entityId: this._config!.entity });

  static styles = [
    glassStyles,
    css`
      .hit {
        appearance: none;
        border: 0;
        background: none;
        margin: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: calc(var(--hv-ref) * 0.07) calc(var(--hv-ref) * 0.075) calc(var(--hv-ref) * 0.06);
        display: flex;
        flex-direction: column;
        cursor: pointer;
        text-align: left;
        border-radius: inherit;
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
      }
      .top {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 8px;
        white-space: nowrap;
      }
      .time {
        font-size: calc(var(--hv-ref) * 0.075);
        font-weight: 600;
      }
      .date {
        font-size: calc(var(--hv-ref) * 0.055);
        color: var(--hv-ink-2);
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .now {
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: calc(var(--hv-ref) * 0.025);
      }
      .temp {
        font-size: calc(var(--hv-ref) * 0.42);
        font-weight: 500;
        line-height: 0.85;
        letter-spacing: -0.04em;
        /* the degree sign hangs right: nudge the number back to the optical centre */
        padding-left: 0.12em;
        font-family: ui-rounded, "SF Pro Rounded", var(--hv-font);
      }
      .temp.long {
        font-size: calc(var(--hv-ref) * 0.32);
      }
      .cond {
        display: flex;
        align-items: center;
        gap: calc(var(--hv-ref) * 0.03);
        font-size: calc(var(--hv-ref) * 0.08);
        font-weight: 600;
        --mdc-icon-size: calc(var(--hv-ref) * 0.11);
      }
      .outlook {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: calc(var(--hv-ref) * 0.05);
        border-top: 0.5px solid rgb(255 255 255 / 0.35);
        padding-top: calc(var(--hv-ref) * 0.045);
        font-size: calc(var(--hv-ref) * 0.075);
        font-weight: 500;
        white-space: nowrap;
      }
      .outlook i {
        width: 0;
        height: 1em;
        border-left: 0.5px solid rgb(255 255 255 / 0.35);
      }
      .dim {
        color: var(--hv-ink-2);
      }
      .rain {
        display: flex;
        align-items: center;
        gap: 0.15em;
      }
      .rain svg {
        width: 0.95em;
        height: 0.95em;
      }
      .center {
        flex: 1;
        display: grid;
        place-items: center;
      }
      /* a short wide cell (3 rows): no clock line, temperature and outlook side by side */
      ha-card[data-short][data-wide] .hit {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: 1fr auto;
        column-gap: calc(var(--hv-ref) * 0.12);
        align-items: center;
      }
      ha-card[data-short][data-wide] .top {
        display: none;
      }
      ha-card[data-short][data-wide] .now {
        grid-row: 1 / 3;
        flex-direction: column;
      }
      ha-card[data-short][data-wide] .outlook {
        grid-column: 2;
        grid-row: 1 / 3;
        flex-direction: column;
        align-items: flex-start;
        border: 0;
        border-left: 0.5px solid rgb(255 255 255 / 0.35);
        padding: 0 0 0 calc(var(--hv-ref) * 0.12);
        gap: calc(var(--hv-ref) * 0.04);
      }
      ha-card[data-short][data-wide] .outlook i {
        display: none;
      }
    `,
  ];
}

customElements.define("homeview-weather-card", HomeViewWeatherCard);
registerCard("homeview-weather-card", "HomeView Weather", "Time, temperature, condition and today's high, low and rain chance on liquid glass.");
