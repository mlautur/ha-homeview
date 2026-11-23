/**
 * HomeView "Up next": a glass strip with the next few events from one or more calendars, each
 * with a day badge, its title, a dot in its calendar's colour and its time (or "All day").
 * `layout: day` is a glass panel with what is left of today, or what's next once today is done;
 * `layout: glance` is a glass panel read from across a room: the meeting under way, else the next one, in
 * large type, then what follows while there is room;
 * `layout: list` is a full-page agenda on the wallpaper, one row per event with a date badge.
 * Events come from calendar.get_events, read again every 15 minutes and whenever a calendar
 * starts or ends an event; nothing is read while the card is hidden.
 */
import { css, html, nothing, type TemplateResult } from "lit";
import { HomeViewCard, glassStyles, type BaseConfig } from "./base.ts";
import { domainOf, registerCard, type GridOptions, type Hass } from "../ha.ts";
import type { EditorField } from "../editor.ts";
import { ICONS } from "../icons.ts";
import { CALENDAR_LAYOUTS, calendarTime, capitalize, dayAgenda, dayBadge, daysUntil, duration, endCue, eventTime, eventTitle, glance, isAllDay, relativeDay, startCue, upcoming, within, type CalendarEvent } from "../logic.ts";

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
  /** at most this many events (default 3 on the strip, as many as fit otherwise; fewer when there is no room) */
  count?: number;
  /** strip (default): a row of the next events; day: today, else what's next; glance: now, else next, in large type; list: a full-page agenda */
  layout?: "strip" | "day" | "glance" | "list";
}

const LAYOUTS: string[] = CALENDAR_LAYOUTS.map((l) => l.value);

const COLORS = ["#ff9f0a", "#30d158", "#0a84ff", "#bf5af2", "#ff375f", "#64d2ff"];
const REFRESH_MS = 15 * 60 * 1000;
const ANSWER_MS = 30 * 1000;
/** the narrowest an event may get before the strip shows one fewer */
const EVENT_MIN_PX = 190;
/** day panel and agenda geometry, in --hv-ref units (kept in step with the styles below) */
const DAY = { pad: 0.07, head: 0.13, gap: 0.03, row: 0.22 };
const LIST = { edge: 0.045, row: 0.227 };
const GLANCE = { pad: 0.07, hero: 0.14 + 0.03 + 0.244 + 0.15, gap: 0.04, row: 0.125 };

export const calendarEntries = (c: CalendarConfig): CalendarEntry[] =>
  (c.entities ?? []).map((e) => (typeof e === "string" ? { entity: e } : e)).map((e, i) => ({ entity: e.entity, color: e.color ?? COLORS[i % COLORS.length] }));

export class HomeViewCalendarCard extends HomeViewCard<CalendarConfig> {
  static properties = { ...HomeViewCard.properties, _events: { state: true }, _error: { state: true }, _width: { state: true }, _height: { state: true }, _now: { state: true } };
  private _events?: CalendarEvent[];
  private _error = "";
  private _width = 0;
  private _height = 0;
  private _now = new Date();
  private fetchedAt = 0;
  private fetchedFor = "";
  private calendarStates = "";
  private run = 0;
  private tick = 0;

  static editorFields: EditorField[] = [
    { name: "entities", label: "Calendars", required: true, selector: { entity: { multiple: true, filter: { domain: "calendar" } } } },
    {
      name: "layout",
      selector: {
        select: {
          mode: "dropdown",
          options: [...CALENDAR_LAYOUTS],
        },
      },
    },
    { name: "title", helper: "Strip and day: defaults to Up next, or Today", selector: { text: {} } },
    { name: "days", label: "Days ahead", selector: { number: { min: 1, max: 60, mode: "box" } } },
    { name: "count", label: "Most events shown", selector: { number: { min: 1, max: 6, mode: "box" } } },
  ];

  static getStubConfig(hass: Hass): Partial<CalendarConfig> {
    return { entities: Object.keys(hass.states).filter((e) => domainOf(e) === "calendar").slice(0, 2), grid_options: { columns: "full", rows: 2 } };
  }

  protected validate(config: CalendarConfig): void {
    if (!Array.isArray(config.entities) || !config.entities.length) throw new Error("Add one or more calendar entities");
    for (const e of calendarEntries(config)) if (!e.entity || domainOf(e.entity) !== "calendar") throw new Error(`Not a calendar: ${e.entity}`);
    if (config.layout && !LAYOUTS.includes(config.layout)) throw new Error(`Unknown layout: ${config.layout} (strip, day, glance or list)`);
  }

  // not `layout`: Home Assistant sets that property on every card
  private get kind(): "strip" | "day" | "glance" | "list" {
    return this._config?.layout ?? "strip";
  }

  getGridOptions(): GridOptions {
    if (this.kind === "day" || this.kind === "glance") return { columns: 12, rows: 4, min_columns: 6, min_rows: 3 };
    if (this.kind === "list") return { columns: "full", rows: 8, min_columns: 6, min_rows: 4 };
    return { columns: "full", rows: 2, min_columns: 6, min_rows: 1 };
  }

  /** a strip, panel or page, never square */
  protected get square(): boolean {
    return false;
  }

  /** the agenda sits on the wallpaper */
  protected get bare(): boolean {
    return this.kind === "list";
  }

  /** type is sized from the height (the agenda's 2:1 page from its short side); the size decides how many events fit */
  protected refFrom(w: number, h: number): number {
    this._width = w;
    this._height = h;
    if (this.kind === "day" || this.kind === "glance") return Math.min(h, w * 0.5);
    if (this.kind === "list") return Math.min(w / 2, h);
    return Math.min(w, h * 2);
  }

  /** how many events the card has room for */
  private room(): number {
    const w = this._width;
    const h = this._height;
    if (!w || !h) return 1;
    if (this.kind === "strip") return Math.max(1, Math.floor((w * 0.82) / EVENT_MIN_PX));
    const ref = this.refFrom(w, h);
    if (this.kind === "day") return Math.max(1, Math.floor((h - ref * (2 * DAY.pad + DAY.head + DAY.gap) + 1) / (ref * DAY.row)));
    // the big now / next, then a row for each later event that fits
    if (this.kind === "glance") return 1 + Math.max(0, Math.floor((h - ref * (2 * GLANCE.pad + GLANCE.hero + GLANCE.gap) + 1) / (ref * GLANCE.row)));
    return Math.max(1, Math.floor((h - ref * 2 * LIST.edge + 1) / (ref * LIST.row)));
  }

  protected cardClass(): string {
    return `calendar ${this.kind}`;
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
    const color = (e: CalendarEvent): string => colors[e.calendar ?? ""] ?? "#fff";
    const lang = this.hass.language;
    const n = Math.min(c.count ?? (this.kind === "strip" ? 3 : Infinity), this.room());
    const note = (text: string): TemplateResult => html`<div class="note ink">${text}</div>`;
    const waiting = !this._events ? note(this._error ? "Calendar unavailable" : "Loading\u2026") : undefined;
    if (this.kind === "day") return this.renderDay(n, color, waiting);
    if (this.kind === "glance") return this.renderGlance(n, color, waiting);
    if (this.kind === "list") return this.renderList(n, color, waiting);
    const head = html`<div class="head ink">${ICONS.calendar}<span>${c.title ?? "Up next"}</span></div>`;
    const events = this._events ? upcoming(this._events, this._now, n) : [];
    let body: TemplateResult;
    if (waiting) body = waiting;
    else if (!events.length) body = note("Nothing coming up");
    else
      body = html`${events.map((e) => {
        const b = dayBadge(e, this._now, lang);
        return html`<div class="event ${b.today ? "today" : ""}">
          <div class="badge"><span class="wd">${b.label}</span><span class="day">${b.day}</span></div>
          <div class="text ink">
            <div class="summary">${eventTitle(e)}</div>
            <div class="when"><i style="background:${color(e)}"></i>${eventTime(e, lang)}</div>
          </div>
        </div>`;
      })}`;
    return html`<div class="strip" title=${this._error || nothing}>${head}${body}</div>`;
  }

  /** today's events, or what's next once today is done: a glass panel sized for a quadrant */
  private renderDay(n: number, color: (e: CalendarEvent) => string, waiting?: TemplateResult): TemplateResult {
    const c = this._config!;
    const lang = this.hass!.language;
    const agenda = this._events ? dayAgenda(this._events, this._now, n) : { today: 0, events: [] };
    const shown = agenda.events;
    const more = agenda.today - Math.min(agenda.today, shown.length);
    const aside = waiting ? "" : !agenda.today ? (shown.length ? "Nothing else today" : "") : more > 0 ? `+${more} more today` : "";
    // today's events read their time; later ones say which day too
    const when = (e: CalendarEvent): string => {
      const d = daysUntil(e, this._now);
      if (d === 0) return eventTime(e, lang);
      const day = d === 1 ? capitalize(relativeDay(e, this._now, lang)) : dayBadge(e, this._now, lang).weekday;
      return `${day} \u00b7 ${eventTime(e, lang)}`;
    };
    let body: TemplateResult;
    if (waiting) body = waiting;
    else if (!shown.length) body = html`<div class="note ink">Nothing coming up</div>`;
    else
      body = html`${shown.map(
        (e) => html`<div class="row ${calendarTime(e.start) <= this._now ? "now" : ""}">
          <i class="bar" style="background:${color(e)}"></i>
          <div class="text ink">
            <div class="summary">${eventTitle(e)}</div>
            <div class="when">${when(e)}</div>
          </div>
        </div>`,
      )}`;
    return html`<div class="dayview" title=${this._error || nothing}>
      <div class="dhead ink">
        ${ICONS.calendar}<span class="dtitle">${c.title ?? (agenda.today || waiting ? "Today" : "Up next")}</span>
        <span class="aside">${aside}</span>
      </div>
      <div class="rows">${body}</div>
    </div>`;
  }

  /**
   * The glance: is a meeting on now (and how long is left), else when is the next one; large, to read from
   * across the room. Later events follow, one short line each, while there is room. An all-day event is
   * never the big one: a holiday is not a meeting.
   */
  private renderGlance(n: number, color: (e: CalendarEvent) => string, waiting?: TemplateResult): TemplateResult {
    const lang = this.hass!.language;
    const now = this._now;
    const g = this._events ? glance(this._events, now) : { rest: [] as CalendarEvent[] };
    const hero = g.now ?? g.next;
    const rows = (g.now && g.next ? [g.next, ...g.rest] : g.rest).slice(0, Math.max(0, n - 1));
    const soon = !g.now && !!hero && calendarTime(hero.start).getTime() - now.getTime() <= 3600000;
    const pill = g.now ? "Now" : hero ? "Next" : "Free";
    const cue = g.now ? `${duration(now, calendarTime(g.now.end))} left` : hero ? startCue(hero, now, lang) : "";
    const title = hero ? eventTitle(hero) : g.rest.length ? "No meetings" : "Nothing scheduled";
    const time = g.now ? endCue(g.now, now, lang) : hero ? eventTime(hero, lang) : g.rest.length ? "" : `Next ${this._config!.days ?? 7} days are clear`;
    // a later row: its time today, else its day too
    const when = (e: CalendarEvent): string => {
      const d = daysUntil(e, now);
      const day = d === 0 ? "" : d === 1 ? capitalize(relativeDay(e, now, lang)) : dayBadge(e, now, lang).weekday;
      if (isAllDay(e)) return day || "All day";
      return [day, calendarTime(e.start).toLocaleTimeString(lang, { hour: "numeric", minute: "2-digit" })].filter(Boolean).join(" ");
    };
    if (waiting) return html`<div class="glanceview" title=${this._error || nothing}>${waiting}</div>`;
    return html`<div class="glanceview ink ${g.now ? "is-now" : soon ? "is-soon" : hero ? "is-next" : "is-free"}" title=${this._error || nothing}>
      <div class="eyebrow"><span class="pill">${pill}</span><span class="cue">${cue}</span></div>
      <div class="hero">${title}</div>
      ${time ? html`<div class="htime">${hero ? html`<i style="background:${color(hero)}"></i>` : nothing}${time}</div>` : nothing}
      ${rows.length
        ? html`<div class="later">
            ${rows.map((e) => html`<div class="lat"><i style="background:${color(e)}"></i><span class="gwhen">${when(e)}</span><span class="gtitle">${eventTitle(e)}</span></div>`)}
          </div>`
        : nothing}
    </div>`;
  }

  /** a full-page agenda: date badge, rule, title and time, and how far off it is; one badge per day */
  private renderList(n: number, color: (e: CalendarEvent) => string, waiting?: TemplateResult): TemplateResult {
    const lang = this.hass!.language;
    const events = this._events ? upcoming(this._events, this._now, n) : [];
    let last = "";
    const rows = events.map((e) => {
      const b = dayBadge(e, this._now, lang);
      const first = b.key !== last;
      last = b.key;
      return html`<div class="lrow">
        <div class="lbadge ${first && b.today ? "hv-frost today" : ""}">
          ${first ? html`<small>${b.weekday}</small><b>${b.day}</b><small class="mon">${b.month}</small>` : nothing}
        </div>
        <i class="rule"></i>
        <div class="text">
          <div class="ltitle">${eventTitle(e)}</div>
          <div class="lwhen"><i style="background:${color(e)}"></i>${eventTime(e, lang)}</div>
        </div>
        <div class="rel">${first ? relativeDay(e, this._now, lang) : ""}</div>
      </div>`;
    });
    return html`<div class="agenda ink" title=${this._error || nothing}>
      ${waiting ?? (rows.length ? rows : html`<div class="note">Nothing coming up</div>`)}
    </div>`;
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

      /* day: a quadrant panel (pad 0.07, head 0.13, gap 0.03, rows 0.22 of --hv-ref; see DAY) */
      .dayview {
        height: 100%;
        box-sizing: border-box;
        padding: calc(var(--hv-ref) * 0.07) calc(var(--hv-ref) * 0.08);
        display: flex;
        flex-direction: column;
        gap: calc(var(--hv-ref) * 0.03);
      }
      .dhead {
        flex: none;
        height: calc(var(--hv-ref) * 0.13);
        display: flex;
        align-items: center;
        gap: calc(var(--hv-ref) * 0.035);
        font-size: calc(var(--hv-ref) * 0.075);
        font-weight: 600;
        white-space: nowrap;
      }
      .dhead svg {
        flex: none;
        width: calc(var(--hv-ref) * 0.1);
        height: calc(var(--hv-ref) * 0.1);
        filter: drop-shadow(var(--hv-shadow-text));
      }
      .dtitle {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .aside {
        margin-left: auto;
        font-size: calc(var(--hv-ref) * 0.066);
        font-weight: 400;
        color: var(--hv-ink-2);
      }
      .rows {
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }
      .rows .note {
        flex: 1;
        display: grid;
        place-items: center;
        padding: 0 0 calc(var(--hv-ref) * 0.08);
        font-size: calc(var(--hv-ref) * 0.08);
      }
      .row {
        flex: none;
        height: calc(var(--hv-ref) * 0.22);
        box-sizing: border-box;
        display: flex;
        align-items: center;
        gap: calc(var(--hv-ref) * 0.05);
        padding: 0 calc(var(--hv-ref) * 0.03);
        border-radius: calc(var(--hv-ref) * 0.05);
      }
      .row.now {
        background: rgb(255 255 255 / 0.12);
      }
      .bar {
        flex: none;
        width: calc(var(--hv-ref) * 0.02);
        min-width: 3px;
        height: 70%;
        border-radius: 2px;
        box-shadow: 0 0 0 0.5px rgb(255 255 255 / 0.4);
      }
      .row .summary {
        font-size: calc(var(--hv-ref) * 0.088);
        line-height: 1.2;
      }
      .row .when {
        margin-top: 0;
        font-size: calc(var(--hv-ref) * 0.066);
        line-height: 1.25;
      }

      /* glance: a quadrant panel read from across a room (pad 0.07; eyebrow 0.14, gap 0.03, title 0.244 and time 0.15
         of --hv-ref; then 0.04 and rows of 0.125; see GLANCE), centred when there is less to show */
      .glanceview {
        height: 100%;
        box-sizing: border-box;
        padding: calc(var(--hv-ref) * 0.07) calc(var(--hv-ref) * 0.085);
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-width: 0;
      }
      .glanceview > .note {
        flex: 1;
        display: grid;
        place-items: center;
        padding: 0;
        font-size: calc(var(--hv-ref) * 0.09);
      }
      .eyebrow {
        flex: none;
        height: calc(var(--hv-ref) * 0.14);
        margin-bottom: calc(var(--hv-ref) * 0.03);
        display: flex;
        align-items: center;
        gap: calc(var(--hv-ref) * 0.04);
        font-size: calc(var(--hv-ref) * 0.09);
        font-weight: 700;
        white-space: nowrap;
      }
      .pill {
        flex: none;
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 calc(var(--hv-ref) * 0.05);
        border-radius: 999px;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        font-size: calc(var(--hv-ref) * 0.075);
        background: rgb(255 255 255 / 0.9);
        color: #2b2520;
        text-shadow: none;
      }
      /* the state reads in words; the colour only backs it up (dark ink on every fill) */
      .is-now .pill {
        background: #30d158;
        color: #03240d;
      }
      .is-soon .pill {
        background: #ff9f0a;
        color: #2a1600;
      }
      .cue {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .hero {
        flex: none;
        font-size: calc(var(--hv-ref) * 0.215);
        line-height: 1.135;
        font-weight: 700;
        letter-spacing: -0.01em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .htime {
        flex: none;
        font-size: calc(var(--hv-ref) * 0.125);
        line-height: 1.2;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .htime i,
      .lat i {
        display: inline-block;
        flex: none;
        width: 0.5em;
        height: 0.5em;
        border-radius: 50%;
        margin-right: 0.4em;
        vertical-align: 0.08em;
        box-shadow: 0 0 0 0.5px rgb(255 255 255 / 0.5);
      }
      .later {
        flex: none;
        overflow: hidden;
        margin-top: calc(var(--hv-ref) * 0.04);
        border-top: 0.5px solid rgb(255 255 255 / 0.35);
      }
      .lat {
        height: calc(var(--hv-ref) * 0.125);
        display: flex;
        align-items: center;
        gap: calc(var(--hv-ref) * 0.03);
        font-size: calc(var(--hv-ref) * 0.08);
        white-space: nowrap;
      }
      .lat i {
        margin-right: 0;
      }
      .gwhen {
        flex: none;
        font-weight: 500;
        color: var(--hv-ink-2);
      }
      .gtitle {
        min-width: 0;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /* list: a full-page agenda on the wallpaper (edge 0.045, rows 0.227 of --hv-ref; see LIST) */
      .agenda {
        height: 100%;
        box-sizing: border-box;
        padding: calc(var(--hv-ref) * 0.045) calc(var(--hv-ref) * 0.083);
        /* a deeper shadow: the text sits on the light parts of the wallpaper too */
        --hv-shadow-text: 0 1px 3px rgb(40 30 20 / 0.45), 0 0 16px rgb(40 30 20 / 0.28);
      }
      .agenda .note {
        padding: calc(var(--hv-ref) * 0.04) 0;
        font-size: calc(var(--hv-ref) * 0.054);
      }
      .lrow {
        height: calc(var(--hv-ref) * 0.227);
        display: grid;
        grid-template-columns: calc(var(--hv-ref) * 0.158) auto minmax(0, 1fr) auto;
        column-gap: calc(var(--hv-ref) * 0.0375);
        align-items: center;
      }
      .lbadge {
        height: calc(var(--hv-ref) * 0.19);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        line-height: 1.05;
        --hv-radius: calc(var(--hv-ref) * 0.045);
      }
      .lbadge small {
        font-size: calc(var(--hv-ref) * 0.031);
        color: rgb(255 255 255 / 0.9);
      }
      .lbadge small.mon {
        font-size: calc(var(--hv-ref) * 0.027);
        letter-spacing: 0.06em;
      }
      .lbadge b {
        font-size: calc(var(--hv-ref) * 0.079);
        font-weight: 600;
        font-family: ui-rounded, "SF Pro Rounded", var(--hv-font);
      }
      .rule {
        width: 3px;
        height: calc(var(--hv-ref) * 0.167);
        border-radius: 2px;
        background: rgb(255 255 255 / 0.7);
        box-shadow: 0 0 4px rgb(40 30 20 / 0.2);
      }
      .ltitle {
        font-size: calc(var(--hv-ref) * 0.054);
        font-weight: 600;
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .lwhen {
        margin-top: calc(var(--hv-ref) * 0.008);
        font-size: calc(var(--hv-ref) * 0.035);
        color: rgb(255 255 255 / 0.9);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .lwhen i {
        display: inline-block;
        width: 0.55em;
        height: 0.55em;
        border-radius: 50%;
        margin-right: 0.5em;
        vertical-align: 0.05em;
        box-shadow: 0 0 0 0.5px rgb(255 255 255 / 0.5);
      }
      .rel {
        font-size: calc(var(--hv-ref) * 0.035);
        font-weight: 500;
        white-space: nowrap;
      }
    `,
  ];
}

customElements.define("homeview-calendar-card", HomeViewCalendarCard);
registerCard("homeview-calendar-card", "HomeView Up Next", "The next events from your calendars: a liquid-glass strip, a day panel, or a full-page agenda.");
