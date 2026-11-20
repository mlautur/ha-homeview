/**
 * HomeView "Up next": a glass strip with the next few events from one or more calendars, each
 * with a day badge, its title, a dot in its calendar's colour and its time (or "All day").
 * Events come from calendar.get_events, read again every 15 minutes and whenever a calendar
 * starts or ends an event; nothing is read while the card is hidden.
 */
import { css, html, nothing, type TemplateResult } from "lit";
import { HomeViewCard, glassStyles, type BaseConfig } from "./base.ts";
import { domainOf, registerCard, type GridOptions, type Hass } from "../ha.ts";
import type { EditorField } from "../editor.ts";
import { ICONS } from "../icons.ts";
import { dayBadge, eventTime, upcoming, within, type CalendarEvent } from "../logic.ts";

export interface CalendarEntry {
  entity: string;
  color?: string;
}

export interface CalendarConfig extends BaseConfig {
  /** calendar entities, as ids or { entity, color } */
  entities: (string | CalendarEntry)[];
  title?: string;
  /** how far ahead to look, in days (default 7) */
  days?: number;
  /** at most this many events (default 3; fewer when the strip is narrow) */
  count?: number;
}

const COLORS = ["#ff9f0a", "#30d158", "#0a84ff", "#bf5af2", "#ff375f", "#64d2ff"];
const REFRESH_MS = 15 * 60 * 1000;
const ANSWER_MS = 30 * 1000;
/** the narrowest an event may get before the strip shows one fewer */
const EVENT_MIN_PX = 190;

export const calendarEntries = (c: CalendarConfig): CalendarEntry[] =>
  (c.entities ?? []).map((e) => (typeof e === "string" ? { entity: e } : e)).map((e, i) => ({ entity: e.entity, color: e.color ?? COLORS[i % COLORS.length] }));

export class HomeViewCalendarCard extends HomeViewCard<CalendarConfig> {
  static properties = { ...HomeViewCard.properties, _events: { state: true }, _error: { state: true }, _width: { state: true }, _now: { state: true } };
  private _events?: CalendarEvent[];
  private _error = "";
  private _width = 0;
  private _now = new Date();
  private fetchedAt = 0;
  private fetchedFor = "";
  private calendarStates = "";
  private run = 0;
  private tick = 0;

  static editorFields: EditorField[] = [
    { name: "entities", label: "Calendars", required: true, selector: { entity: { multiple: true, filter: { domain: "calendar" } } } },
    { name: "title", helper: "Defaults to Up next", selector: { text: {} } },
    { name: "days", label: "Days ahead", selector: { number: { min: 1, max: 60, mode: "box" } } },
    { name: "count", label: "Most events shown", selector: { number: { min: 1, max: 6, mode: "box" } } },
  ];

  static getStubConfig(hass: Hass): Partial<CalendarConfig> {
    return { entities: Object.keys(hass.states).filter((e) => domainOf(e) === "calendar").slice(0, 2), grid_options: { columns: "full", rows: 2 } };
  }

  protected validate(config: CalendarConfig): void {
    if (!Array.isArray(config.entities) || !config.entities.length) throw new Error("Add one or more calendar entities");
    for (const e of calendarEntries(config)) if (!e.entity || domainOf(e.entity) !== "calendar") throw new Error(`Not a calendar: ${e.entity}`);
  }

  getGridOptions(): GridOptions {
    return { columns: "full", rows: 2, min_columns: 6, min_rows: 1 };
  }

  /** a strip, never square */
  protected get square(): boolean {
    return false;
  }

  /** type is sized from the strip's height; the width decides how many events fit */
  protected refFrom(w: number, h: number): number {
    this._width = w;
    return Math.min(w, h * 2);
  }

  protected cardClass(): string {
    return "calendar";
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.resume();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearTimeout(this.tick);
    this.tick = 0;
    this.run++; // an answer still on its way is dropped
    this.fetchedFor = "";
  }

  protected resume(): void {
    if (!this.onScreen || !this.hass || !this._config) return;
    this.refresh();
    if (!this.tick) this.minute();
  }

  protected updated(changed: Map<PropertyKey, unknown>): void {
    super.updated?.(changed);
    if (changed.has("hass") || changed.has("_config")) this.resume();
  }

  /** once a minute: drop events that ended, and read the calendars again when due */
  private minute = (): void => {
    this.tick = 0;
    if (!this.onScreen) return;
    this._now = new Date();
    this.refresh();
    this.tick = window.setTimeout(this.minute, 60000 - (Date.now() % 60000) + 50);
  };

  private refresh(): void {
    const c = this._config!;
    const ids = calendarEntries(c).map((e) => e.entity);
    const key = JSON.stringify([ids, c.days ?? 7]);
    // a calendar entity changes state when one of its events starts or ends, or the next one changes
    const states = ids.map((id) => `${this.hass!.states[id]?.state}|${this.hass!.states[id]?.attributes.message ?? ""}`).join(",");
    const due = key !== this.fetchedFor || states !== this.calendarStates || Date.now() - this.fetchedAt > REFRESH_MS;
    if (!due) return;
    this.fetchedFor = key;
    this.calendarStates = states;
    this.fetchedAt = Date.now();
    void this.fetch(ids, c.days ?? 7, ++this.run);
  }

  private async fetch(ids: string[], days: number, run: number): Promise<void> {
    try {
      const r = await within(
        this.hass!.callWS<{ response: Record<string, { events?: CalendarEvent[] }> }>({
          type: "call_service",
          domain: "calendar",
          service: "get_events",
          target: { entity_id: ids },
          service_data: { duration: { days } },
          return_response: true,
        }),
        ANSWER_MS,
      );
      if (run !== this.run) return;
      this._events = ids.flatMap((id) => (r.response?.[id]?.events ?? []).map((e) => ({ ...e, calendar: id })));
      this._error = "";
    } catch (e) {
      if (run !== this.run) return;
      this._error = (e as { message?: string })?.message ?? String(e);
      this.fetchedAt = Date.now() - REFRESH_MS + 60000; // try again in a minute
      console.warn("HomeView calendar:", e);
    }
  }

  protected renderContent(): TemplateResult | typeof nothing {
    const c = this._config!;
    if (!this.hass) return nothing;
    const colors = Object.fromEntries(calendarEntries(c).map((e) => [e.entity, e.color]));
    const lang = this.hass.language;
    const head = html`<div class="head ink">${ICONS.calendar}<span>${c.title ?? "Up next"}</span></div>`;
    const room = this._width ? Math.max(1, Math.floor((this._width * 0.82) / EVENT_MIN_PX)) : 1;
    const events = this._events ? upcoming(this._events, this._now, Math.min(c.count ?? 3, room)) : [];
    let body: TemplateResult;
    if (!this._events) body = html`<div class="note ink">${this._error ? "Calendar unavailable" : "Loading\u2026"}</div>`;
    else if (!events.length) body = html`<div class="note ink">Nothing coming up</div>`;
    else
      body = html`${events.map((e) => {
        const b = dayBadge(e, this._now, lang);
        return html`<div class="event ${b.today ? "today" : ""}">
          <div class="badge"><span class="wd">${b.label}</span><span class="day">${b.day}</span></div>
          <div class="text ink">
            <div class="summary">${e.summary}</div>
            <div class="when"><i style="background:${colors[e.calendar ?? ""] ?? "#fff"}"></i>${eventTime(e, lang)}</div>
          </div>
        </div>`;
      })}`;
    return html`<div class="strip" title=${this._error || nothing}>${head}${body}</div>`;
  }

  static styles = [
    glassStyles,
    css`
      .strip {
        height: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        gap: calc(var(--hv-ref) * 0.05);
        padding: calc(var(--hv-ref) * 0.04) calc(var(--hv-ref) * 0.06);
      }
      .head {
        flex: none;
        width: calc(var(--hv-ref) * 0.3);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: calc(var(--hv-ref) * 0.01);
        font-size: calc(var(--hv-ref) * 0.058);
        font-weight: 600;
        white-space: nowrap;
      }
      .head svg {
        width: calc(var(--hv-ref) * 0.125);
        height: calc(var(--hv-ref) * 0.125);
        filter: drop-shadow(var(--hv-shadow-text));
      }
      .event {
        flex: 1 1 0;
        min-width: 0;
        align-self: stretch;
        display: flex;
        align-items: center;
        gap: calc(var(--hv-ref) * 0.05);
        padding: 0 calc(var(--hv-ref) * 0.04) 0 calc(var(--hv-ref) * 0.06);
        border-left: 0.5px solid rgb(255 255 255 / 0.3);
      }
      .event.today {
        background: rgb(255 255 255 / 0.1);
        border-radius: calc(var(--hv-ref) * 0.05);
        border-left-color: transparent;
      }
      .badge {
        flex: none;
        width: calc(var(--hv-ref) * 0.225);
        height: calc(var(--hv-ref) * 0.235);
        box-sizing: border-box;
        border-radius: calc(var(--hv-ref) * 0.05);
        background: rgb(255 255 255 / 0.14);
        box-shadow:
          inset 0 0 0 0.5px rgb(255 255 255 / 0.4),
          inset 1px 1px 0 rgb(255 255 255 / 0.3);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .today .badge {
        background: rgb(255 255 255 / 0.3);
      }
      .wd {
        font-size: calc(var(--hv-ref) * 0.05);
        font-weight: 600;
        letter-spacing: 0.04em;
        line-height: 1.2;
        color: var(--hv-ink-2);
      }
      .today .wd {
        color: var(--hv-ink);
      }
      .day {
        font-size: calc(var(--hv-ref) * 0.1);
        font-weight: 600;
        line-height: 1;
        font-family: ui-rounded, "SF Pro Rounded", var(--hv-font);
      }
      .text {
        min-width: 0;
      }
      .summary {
        font-size: calc(var(--hv-ref) * 0.075);
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .when {
        margin-top: 2px;
        font-size: calc(var(--hv-ref) * 0.062);
        color: var(--hv-ink-2);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .when i {
        display: inline-block;
        width: 0.6em;
        height: 0.6em;
        border-radius: 50%;
        margin-right: 0.4em;
        vertical-align: 0.05em;
      }
      .note {
        flex: 1;
        padding-left: calc(var(--hv-ref) * 0.06);
        font-size: calc(var(--hv-ref) * 0.07);
        color: var(--hv-ink-2);
      }
    `,
  ];
}

customElements.define("homeview-calendar-card", HomeViewCalendarCard);
registerCard("homeview-calendar-card", "HomeView Up Next", "The next events from your calendars, on a liquid-glass strip.");
