/**
 * Card behaviour that does not need the DOM: setpoint maths, tile actions,
 * clock angles, media listing, voice phases, weather, calendar, camera and
 * vacuum helpers. Unit-tested in test/logic.test.ts.
 */
import type { Hass, HassEntity } from "./ha.ts";

export interface BrowseItem {
  title: string;
  media_class: string;
  media_content_type: string;
  media_content_id: string;
  can_expand: boolean;
  children?: BrowseItem[];
}

// ponytail: ids are short strings, so keep a whole family library (tens of thousands);
// a cap that small would only ever reach the first folders. Sample per folder if libraries outgrow it.
const MAX_ITEMS = 50000;

export const isImage = (i: BrowseItem): boolean => i.media_class === "image" || !!i.media_content_type?.startsWith("image/");

export interface PipelineEvent {
  type: string;
  data?: any;
}

export type VoicePhase = "idle" | "listening" | "thinking" | "responding" | "error";

export function setpoints(s: HassEntity): { mode: "single" | "dual" | "none"; value?: number; low?: number; high?: number } {
  const a = s.attributes;
  if (typeof a.temperature === "number") return { mode: "single", value: a.temperature };
  if (typeof a.target_temp_low === "number" && typeof a.target_temp_high === "number")
    return { mode: "dual", low: a.target_temp_low, high: a.target_temp_high };
  return { mode: "none" };
}

export function clampStep(v: number, step: number, min: number, max: number): number {
  const snapped = Math.round(v / step) * step;
  return +Math.min(max, Math.max(min, snapped)).toFixed(step < 1 ? 1 : 0);
}

export function defaultSide(s: HassEntity): "low" | "high" {
  const a = s.attributes;
  if (a.hvac_action === "cooling") return "high";
  if (a.hvac_action === "heating") return "low";
  const cur = a.current_temperature;
  if (typeof cur === "number" && typeof a.target_temp_low === "number" && typeof a.target_temp_high === "number")
    return Math.abs(cur - a.target_temp_high) < Math.abs(cur - a.target_temp_low) ? "high" : "low";
  return "low";
}

export function isActive(domain: string, state: string): boolean {
  switch (domain) {
    case "media_player":
      return state === "playing";
    case "lock":
      return state !== "locked" && state !== "unlocking";
    case "cover":
      return state === "open" || state === "opening";
    case "scene":
      return false;
    default:
      return state === "on";
  }
}

export function tapService(domain: string, state: string): [string, string] | null {
  switch (domain) {
    case "lock":
      return state === "locked" ? ["lock", "unlock"] : ["lock", "lock"];
    case "scene":
      return ["scene", "turn_on"];
    case "script":
      return state === "on" ? ["script", "turn_off"] : ["script", "turn_on"];
    case "cover":
      return ["cover", "toggle"];
    case "media_player":
      return state === "playing" || state === "paused" ? ["media_player", "media_play_pause"] : null;
    case "light":
    case "switch":
    case "fan":
    case "input_boolean":
      return [domain, "toggle"];
    default:
      return ["homeassistant", "toggle"];
  }
}

export function handAngles(h: number, m: number, s: number): { h: number; m: number; s: number } {
  const min = m + s / 60;
  return { h: ((h % 12) + min / 60) * 30, m: min * 6, s: s * 6 };
}

export function nowIn(timeZone?: string, d = new Date()): { h: number; m: number; s: number; ms: number } {
  if (!timeZone) return { h: d.getHours(), m: d.getMinutes(), s: d.getSeconds(), ms: d.getMilliseconds() };
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone, hour: "numeric", minute: "numeric", second: "numeric", hourCycle: "h23" }).formatToParts(d);
  const get = (t: string): number => +(parts.find((p) => p.type === t)?.value ?? 0);
  return { h: get("hour"), m: get("minute"), s: get("second"), ms: d.getMilliseconds() };
}

/**
 * The digital clock's text: the time without AM/PM, and the date. The 12 / 24 hour choice follows the
 * Home Assistant profile (`time_format`: "12", "24", "system" for the device's own, else the language's).
 */
export function clockText(d: Date, language?: string, timeFormat?: string, timeZone?: string): { time: string; date: string } {
  const locale = timeFormat === "system" ? undefined : language;
  const hourCycle = timeFormat === "12" ? "h12" : timeFormat === "24" ? "h23" : undefined;
  const parts = new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit", hourCycle, timeZone }).formatToParts(d);
  const time = parts
    .filter((p) => p.type !== "dayPeriod")
    .map((p) => p.value)
    .join("")
    .replace(/[\s\u202f]+/g, " ")
    .trim();
  return { time, date: d.toLocaleDateString(locale, { weekday: "long", month: "long", day: "numeric", timeZone }) };
}

/** The photo card's `media`: one folder or a list of folders. */
export function mediaFolders(media: unknown): string[] {
  const list = Array.isArray(media) ? media : [media];
  return list.filter((m): m is string => typeof m === "string").map((m) => m.trim()).filter(Boolean);
}

/**
 * Image ids under one or more media-source folders, breadth first across all of them.
 * A top-level folder that cannot be opened is skipped; the error is thrown only when none can be.
 */
export async function listImages(hass: Pick<Hass, "callWS">, roots: string | string[], recursive: boolean): Promise<string[]> {
  const out = new Set<string>();
  const queue: Array<[string, number]> = mediaFolders(roots).map((r) => [r, 0]);
  let opened = 0;
  let firstError: unknown;
  while (queue.length && out.size < MAX_ITEMS) {
    const [id, depth] = queue.shift()!;
    let node: BrowseItem;
    try {
      node = await hass.callWS<BrowseItem>({ type: "media_source/browse_media", media_content_id: id });
    } catch (e) {
      if (depth > 0) throw e;
      firstError ??= e;
      continue;
    }
    if (depth === 0) opened++;
    for (const child of node.children ?? []) {
      if (isImage(child)) out.add(child.media_content_id);
      else if (recursive && child.can_expand && depth < 3) queue.push([child.media_content_id, depth + 1]);
      if (out.size >= MAX_ITEMS) break;
    }
  }
  if (!opened && firstError) throw firstError;
  return [...out];
}

/**
 * Settle like `p`, or reject once `ms` pass without an answer. A websocket reply lost on a connection
 * that died without closing (tablet Wi-Fi drop, sleep) never arrives, and Home Assistant's callWS has no timeout.
 */
export function within<T>(p: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const late = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error("Home Assistant did not answer")), ms);
  });
  return Promise.race([p, late]).finally(() => clearTimeout(timer));
}

/** Visual editor: show list fields (e.g. the photo card's media) as lists... */
export function toFormList<T extends Record<string, unknown>>(config: T, names: string[]): T {
  const data: Record<string, unknown> = { ...config };
  for (const n of names) if (n in data && !Array.isArray(data[n])) data[n] = mediaFolders(data[n]);
  return data as T;
}

/** ...and save them back as a plain string when there is only one value; a list with blank rows is kept as entered. */
export function fromFormList<T extends Record<string, unknown>>(data: T, names: string[]): T {
  const config: Record<string, unknown> = { ...data };
  for (const n of names) {
    if (!(n in config)) continue;
    const raw = config[n];
    if (Array.isArray(raw) && raw.some((m) => typeof m !== "string" || !m.trim())) continue;
    const list = mediaFolders(raw);
    if (!list.length) delete config[n];
    else config[n] = list.length === 1 ? list[0] : list;
  }
  return config as T;
}

export type Gesture = "left" | "right" | "up" | "down" | "tap" | null;

/**
 * What a finished pointer gesture was, from how far it moved (px) and how long it took (ms).
 * A swipe must clearly favour one axis; a quick flick counts at a shorter distance.
 */
export function gestureOf(dx: number, dy: number, ms: number): Gesture {
  const ax = Math.abs(dx);
  const ay = Math.abs(dy);
  if (ax < 10 && ay < 10) return ms < 600 ? "tap" : null;
  const flick = Math.max(ax, ay) / Math.max(ms, 1) > 0.5;
  if (ax > ay * 1.2 && (ax >= 60 || (flick && ax >= 25))) return dx < 0 ? "left" : "right";
  if (ay > ax * 1.2 && (ay >= 90 || (flick && ay >= 30))) return dy < 0 ? "up" : "down";
  return null;
}

/**
 * The pictures a slideshow has shown, so "previous" retraces them even when shuffled.
 * After going back, "next" walks forward through the history before showing anything new.
 */
export class ShownHistory<T> {
  private list: T[] = [];
  private pos = -1;
  private readonly max: number;
  constructor(max = 100) {
    this.max = max;
  }

  /** the entry one step back (-1) or forward (1) from the current one, if there is one */
  peek(dir: -1 | 1): T | undefined {
    return this.list[this.pos + dir];
  }

  /** move to the entry one step back or forward; returns it */
  step(dir: -1 | 1): T | undefined {
    const e = this.peek(dir);
    if (e !== undefined) this.pos += dir;
    return e;
  }

  /** a newly shown entry, after the current one; anything ahead of it is dropped */
  push(e: T): void {
    this.list.splice(this.pos + 1, Infinity, e);
    if (this.list.length > this.max) this.list.shift();
    this.pos = this.list.length - 1;
  }

  /** forget an entry that can no longer be shown (removed from the folder, unreadable) */
  drop(e: T): void {
    const i = this.list.indexOf(e);
    if (i < 0) return;
    this.list.splice(i, 1);
    if (i <= this.pos) this.pos--;
  }

  clear(): void {
    this.list = [];
    this.pos = -1;
  }
}

export function shuffled<T>(a: T[], rnd = Math.random): T[] {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

export function phaseAfter(phase: VoicePhase, ev: PipelineEvent): VoicePhase {
  switch (ev.type) {
    case "run-start":
      return phase === "idle" ? "listening" : phase;
    case "stt-vad-end":
    case "stt-end":
    case "intent-start":
      return "thinking";
    case "tts-start":
    case "tts-end":
      return "responding";
    case "error":
      return "error";
    default:
      return phase;
  }
}

/** Short status line for an Assist failure code; the full message goes to the details view. */
function errorTitle(code: string): string {
  if (code === "NotAllowedError" || code === "SecurityError") return "Microphone access was denied";
  if (code === "NotFoundError") return "No microphone found";
  if (code === "stt-no-text-recognized") return "Didn't catch that";
  if (code === "pipeline-not-found") return "Assist pipeline not found";
  if (code === "timeout") return "Assist timed out";
  if (code.startsWith("wake")) return "Wake word detection failed";
  if (code.startsWith("stt")) return "Couldn't recognize speech";
  if (code.startsWith("intent")) return "Couldn't handle the request";
  if (code.startsWith("tts")) return "Couldn't speak the reply";
  return "Something went wrong";
}

/**
 * A failed Assist run, from an Error/DOMException, a Home Assistant {code, message}
 * object or a pipeline error event's data: a short status line plus the full text.
 */
export function voiceError(e: unknown): { text: string; detail: string } {
  const err = (e ?? {}) as { code?: unknown; name?: unknown; message?: unknown };
  const code = typeof err.code === "string" ? err.code : typeof err.name === "string" ? err.name : "";
  const detail = (typeof err.message === "string" && err.message) || code || String(e);
  return { text: errorTitle(code), detail };
}

export function satellitePhase(state: string | undefined): VoicePhase {
  switch (state) {
    case "listening":
      return "listening";
    case "processing":
      return "thinking";
    case "responding":
      return "responding";
    case undefined:
    case "unavailable":
      return "error";
    default:
      return "idle";
  }
}

/** A media player tile's two lines: what is playing and who by, or the player's name and state. */
export function mediaLines(s: HassEntity, name: string): { title: string; sub: string } {
  const a = s.attributes;
  const live = s.state === "playing" || s.state === "paused";
  if (!live || !a.media_title) return { title: name, sub: live ? capitalize(s.state) : "Not playing" };
  const by = a.media_artist || a.media_album_artist || a.app_name || "";
  return { title: String(a.media_title), sub: s.state === "paused" ? (by ? `Paused \u00b7 ${by}` : "Paused") : String(by || name) };
}

export const capitalize = (s: string): string => (s ? s[0].toUpperCase() + s.slice(1).replace(/_/g, " ") : s);

// ---- weather ----

export interface ForecastEntry {
  datetime: string;
  condition?: string;
  temperature?: number;
  templow?: number;
  precipitation_probability?: number;
  /** expected amount, for forecasts without a chance of rain */
  precipitation?: number;
  is_daytime?: boolean;
}

/** weather entity supported_features bits: which forecast types it can stream */
export const FORECAST_DAILY = 1;
export const FORECAST_TWICE_DAILY = 4;

/** The forecast type to subscribe to: daily where offered, else twice-daily, else none. */
export function forecastType(features: number | undefined): "daily" | "twice_daily" | undefined {
  const f = features ?? 0;
  return f & FORECAST_DAILY ? "daily" : f & FORECAST_TWICE_DAILY ? "twice_daily" : undefined;
}

/**
 * Today's high, low and chance of rain from a daily or twice-daily forecast. A daily entry
 * carries both temperatures; a twice-daily one has a day entry (high) and a night entry (low).
 */
export function todayOutlook(f: ForecastEntry[] | undefined): { high?: number; low?: number; rain?: number; amount?: number } {
  if (!f?.length) return {};
  const num = (v: unknown): number | undefined => (typeof v === "number" && isFinite(v) ? v : undefined);
  const daily = f[0].is_daytime === undefined;
  const pair = daily ? f.slice(0, 1) : f.slice(0, 2);
  const rains = pair.map((e) => num(e.precipitation_probability)).filter((v): v is number => v !== undefined);
  const amounts = pair.map((e) => num(e.precipitation)).filter((v): v is number => v !== undefined);
  const wet = { rain: rains.length ? Math.max(...rains) : undefined, amount: amounts.length ? amounts.reduce((a, b) => a + b, 0) : undefined };
  if (daily) return { high: num(f[0].temperature), low: num(f[0].templow), ...wet };
  const day = pair.find((e) => e.is_daytime);
  const night = pair.find((e) => !e.is_daytime);
  return { high: num(day?.temperature), low: num(night?.temperature ?? night?.templow), ...wet };
}

export interface ForecastDay {
  datetime: string;
  condition?: string;
  high?: number;
  low?: number;
  rain?: number;
}

/**
 * The next `n` days of a daily or twice-daily forecast, one entry per day. Twice-daily entries are
 * paired by local date: the day part gives the high and the condition, the night part the low.
 */
export function forecastDays(f: ForecastEntry[] | undefined, n: number): ForecastDay[] {
  if (!f?.length || n < 1) return [];
  const num = (v: unknown): number | undefined => (typeof v === "number" && isFinite(v) ? v : undefined);
  if (f[0].is_daytime === undefined)
    return f.slice(0, n).map((e) => ({ datetime: e.datetime, condition: e.condition, high: num(e.temperature), low: num(e.templow), rain: num(e.precipitation_probability) }));
  const days = new Map<string, ForecastEntry[]>();
  for (const e of f) {
    const d = calendarTime(e.datetime);
    const key = isNaN(d.getTime()) ? e.datetime : `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    days.set(key, [...(days.get(key) ?? []), e]);
  }
  return [...days.values()].slice(0, n).map((parts) => {
    const day = parts.find((e) => e.is_daytime);
    const night = parts.find((e) => !e.is_daytime);
    const rains = parts.map((e) => num(e.precipitation_probability)).filter((v): v is number => v !== undefined);
    return {
      datetime: (day ?? parts[0]).datetime,
      condition: (day ?? parts[0]).condition,
      high: num(day?.temperature),
      low: num(night?.temperature ?? night?.templow),
      rain: rains.length ? Math.max(...rains) : undefined,
    };
  });
}

export const WEATHER_ICONS: Record<string, string> = {
  "clear-night": "mdi:weather-night",
  cloudy: "mdi:weather-cloudy",
  exceptional: "mdi:alert-circle-outline",
  fog: "mdi:weather-fog",
  hail: "mdi:weather-hail",
  lightning: "mdi:weather-lightning",
  "lightning-rainy": "mdi:weather-lightning-rainy",
  partlycloudy: "mdi:weather-partly-cloudy",
  pouring: "mdi:weather-pouring",
  rainy: "mdi:weather-rainy",
  snowy: "mdi:weather-snowy",
  "snowy-rainy": "mdi:weather-snowy-rainy",
  sunny: "mdi:weather-sunny",
  windy: "mdi:weather-windy",
  "windy-variant": "mdi:weather-windy-variant",
};

const WEATHER_NAMES: Record<string, string> = {
  "clear-night": "Clear",
  partlycloudy: "Partly Cloudy",
  "lightning-rainy": "Thunderstorms",
  "snowy-rainy": "Sleet",
  "windy-variant": "Windy",
  exceptional: "Alert",
  rainy: "Rain",
  snowy: "Snow",
};

/** English name for a weather condition (the card prefers Home Assistant's own translation). */
export const weatherName = (condition: string): string => WEATHER_NAMES[condition] ?? capitalize(condition);

// ---- calendar ----

export interface CalendarEvent {
  /** "2026-11-20" for an all-day event, an ISO date-time otherwise */
  start: string;
  end: string;
  /** empty or missing for a free/busy-only calendar */
  summary?: string;
  /** which calendar entity it came from */
  calendar?: string;
}

export const isAllDay = (e: CalendarEvent): boolean => e.start.length === 10;

/** A calendar time: a bare date is local midnight (not UTC midnight, as Date would read it). */
export function calendarTime(s: string): Date {
  if (s.length === 10) {
    const [y, m, d] = s.split("-").map(Number);
    return new Date(y, m - 1, d);
  }
  return new Date(s);
}

const dayStart = (d: Date): Date => new Date(d.getFullYear(), d.getMonth(), d.getDate());

/** An event's title; a free/busy-only calendar shares events without one. */
export const eventTitle = (e: CalendarEvent): string => e.summary?.trim() || "Busy";

/** The next `n` events that have not ended, soonest first; an event already under way comes first. */
export function upcoming(events: CalendarEvent[], now: Date, n: number): CalendarEvent[] {
  return events
    .filter((e) => calendarTime(e.end) > now)
    .sort((a, b) => calendarTime(a.start).getTime() - calendarTime(b.start).getTime() || eventTitle(a).localeCompare(eventTitle(b)))
    .slice(0, n);
}

/**
 * The day view: what is left of today (under way or still to come), soonest first, then what comes after
 * to fill the rest of the `n` rows. `today` counts today's events (all of them, shown or not); when it is 0
 * the card says what's next instead.
 */
export function dayAgenda(events: CalendarEvent[], now: Date, n: number): { today: number; events: CalendarEvent[] } {
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const left = upcoming(events, now, Infinity);
  return { today: left.filter((e) => calendarTime(e.start) < tomorrow).length, events: left.slice(0, n) };
}

/** Whole days from today to an event's day (0 for an event under way). */
export function daysUntil(e: CalendarEvent, now: Date): number {
  const start = calendarTime(e.start);
  return Math.round((dayStart(start < now ? now : start).getTime() - dayStart(now).getTime()) / 86400000);
}

/** How far off an event's day is: "today", "tomorrow", "in 3 days". */
export const relativeDay = (e: CalendarEvent, now: Date, locale?: string): string =>
  new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(daysUntil(e, now), "day");

/**
 * The day badge for an event: TODAY, else the short weekday, and the day of the month. An event
 * under way since an earlier day counts as today.
 */
export function dayBadge(e: CalendarEvent, now: Date, locale?: string): { label: string; day: number; today: boolean; weekday: string; month: string; key: string } {
  const start = calendarTime(e.start);
  const d = dayStart(start < now ? now : start);
  const today = d.getTime() === dayStart(now).getTime();
  const weekday = d.toLocaleDateString(locale, { weekday: "short" });
  return {
    label: today ? "TODAY" : weekday.toUpperCase(),
    day: d.getDate(),
    today,
    weekday,
    month: d.toLocaleDateString(locale, { month: "short" }).toUpperCase(),
    key: `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`,
  };
}

/** "All day", or the event's start and end times ("4:00 PM - 5:00 PM"). */
export function eventTime(e: CalendarEvent, locale?: string): string {
  if (isAllDay(e)) return "All day";
  const t = (s: string): string => calendarTime(s).toLocaleTimeString(locale, { hour: "numeric", minute: "2-digit" });
  return `${t(e.start)} \u2013 ${t(e.end)}`;
}

// ---- camera ----

/** A camera snapshot URL that changes every `seconds`, so the browser fetches a fresh frame. */
export function snapshotUrl(entityPicture: string, now: number, seconds: number): string {
  return `${entityPicture}${entityPicture.includes("?") ? "&" : "?"}hv=${Math.floor(now / (seconds * 1000))}`;
}

/** percent hidden at the top of a camera picture, clamped to 0-20 */
export const cropTop = (v: unknown): number => Math.min(20, Math.max(0, Number(v) || 0));

export interface CameraPage {
  entity: string;
  name?: string;
}

/** the camera page's cameras, from ids or { entity, name } */
export function cameraPages(entities: unknown): CameraPage[] {
  if (!Array.isArray(entities)) return [];
  return entities.flatMap((e) => {
    const c = (typeof e === "string" ? { entity: e } : e) as { entity?: unknown; name?: unknown } | null;
    if (!c || typeof c.entity !== "string" || !c.entity.startsWith("camera.")) return [];
    return [{ entity: c.entity, name: typeof c.name === "string" ? c.name : undefined }];
  });
}

/**
 * The camera a swipe on the camera page moves to from camera `cur` of `n` (dir 1: the next one), or
 * null past the first or last camera: that swipe is not the page's, it leaves for another view.
 */
export const cameraStep = (cur: number, dir: 1 | -1, n: number): number | null => (cur + dir >= 0 && cur + dir < n ? cur + dir : null);

/** columns of the camera page's picker: two for up to four cameras, three past that (three in a row for three) */
export const pickerColumns = (n: number): number => (n <= 2 ? Math.max(1, n) : n === 4 ? 2 : 3);

// ---- vacuum ----

export const VACUUM_RUNNING = ["cleaning", "paused", "returning"];

/** The vacuum's status line: "Docked", "Cleaning", ... and the battery when known ("Docked \u00b7 100%"). */
export function vacuumStatus(state: string, battery?: number): string {
  const names: Record<string, string> = { docked: "Docked", cleaning: "Cleaning", paused: "Paused", returning: "Returning to dock", idle: "Idle", error: "Error", unavailable: "Offline" };
  const text = names[state] ?? capitalize(state);
  return battery === undefined || state === "unavailable" ? text : `${text} \u00b7 ${Math.round(battery)}%`;
}

/**
 * Roborock room ids from Home Assistant vacuum segment ids ("<map>_<room>"), for the
 * `app_segment_clean` command. Ids that are not numbers are dropped.
 */
export function roborockRooms(segmentIds: string[]): number[] {
  return segmentIds.map((id) => Number(id.split("_").pop())).filter((n) => Number.isInteger(n));
}

// ---- now playing ----

/** media_player supported_features bits the Now Playing card uses */
export const MEDIA = { PAUSE: 1, SEEK: 2, VOLUME_SET: 4, VOLUME_MUTE: 8, PREVIOUS: 16, NEXT: 32, PLAY: 16384, SHUFFLE: 32768, REPEAT: 262144 };

/**
 * Where the track is now, in seconds, and its length. Home Assistant reports the position only when it
 * changes, with the time it was read; while playing, the clock has moved on since then.
 */
export function mediaProgress(s: HassEntity, now: number): { pos: number; dur: number } | null {
  const a = s.attributes;
  const dur = Number(a.media_duration);
  if (!(dur > 0)) return null;
  let pos = Number(a.media_position);
  if (!isFinite(pos)) pos = 0;
  const at = Date.parse(a.media_position_updated_at ?? "");
  if (s.state === "playing" && isFinite(at)) pos += (now - at) / 1000;
  return { pos: Math.min(dur, Math.max(0, pos)), dur };
}

/** 83 -> "1:23", 3725 -> "1:02:05" */
export function trackTime(seconds: number): string {
  const t = Math.max(0, Math.floor(seconds));
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = String(t % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${s}` : `${m}:${s}`;
}

/** repeat button cycle: off -> all -> one -> off */
export const nextRepeat = (r: unknown): "off" | "all" | "one" => (r === "all" ? "one" : r === "one" ? "off" : "all");

/** What the music page watcher remembers between looks: the player's last state, and since when it is quiet on the music page */
export interface MusicWatch {
  state?: string;
  quietSince?: number;
}

/**
 * One look at the player and the location (see music-page.ts). Opens the music page when the player starts
 * playing, but not when it was already playing at the first look (a page load), not after a reconnect
 * (unavailable -> playing), and not when the music page is already showing (play pressed there). Goes back
 * home after `returnMs` of quiet on the music page; leaving the page resets the count. `wakeIn`: look again then.
 */
export function musicStep(w: MusicWatch, state: string | undefined, onMusic: boolean, now: number, returnMs: number): { go?: "music" | "home"; wakeIn?: number } {
  const prev = w.state;
  w.state = state;
  if (state === "playing") {
    w.quietSince = undefined;
    const started = prev !== undefined && prev !== "playing" && prev !== "unavailable" && prev !== "unknown";
    return started && !onMusic ? { go: "music" } : {};
  }
  if (!onMusic || returnMs <= 0) {
    w.quietSince = undefined;
    return {};
  }
  w.quietSince ??= now;
  const left = w.quietSince + returnMs - now;
  if (left > 0) return { wakeIn: left };
  w.quietSince = undefined;
  return { go: "home" };
}

/** The voice overlay's phases: it is shown only in these */
export type OverlayPhase = "listening" | "thinking" | "responding";

/** What the voice overlay watcher remembers between looks: the phase on show, whether a reply came, since when idle */
export interface VoiceWatch {
  phase?: OverlayPhase;
  replied?: boolean;
  idleSince?: number;
}

/**
 * One look at the voice satellite (see voice-overlay.ts). Shows the overlay while it listens (the wake word),
 * thinks or responds, a page load mid-run included. Back at idle it hides at once, or `lingerMs` after a reply so
 * the reply can be read. Never for an unavailable / unknown satellite, never while the dashboard is edited.
 * `hideIn`: look again then.
 */
export function voiceOverlayStep(w: VoiceWatch, state: string | undefined, editing: boolean, now: number, lingerMs: number): { show?: OverlayPhase; hideIn?: number } {
  const p = state === "unknown" ? "error" : satellitePhase(state);
  if (!editing && (p === "listening" || p === "thinking" || p === "responding")) {
    // a new run: nothing shown, or a reply lingering
    if (!w.phase || w.idleSince !== undefined) w.replied = false;
    w.phase = p;
    w.replied ||= p === "responding";
    w.idleSince = undefined;
    return { show: p };
  }
  if (p === "idle" && !editing && w.phase && w.replied) {
    w.idleSince ??= now;
    const left = w.idleSince + lingerMs - now;
    if (left > 0) return { show: w.phase, hideIn: left };
  }
  w.phase = undefined;
  w.replied = false;
  w.idleSince = undefined;
  return {};
}

/** what was heard and the reply, from an Assist pipeline run's debug events */
export function runText(events: PipelineEvent[]): { heard?: string; reply?: string } {
  const heard = events.find((e) => e.type === "stt-end")?.data?.stt_output?.text;
  const reply = events.find((e) => e.type === "intent-end")?.data?.intent_output?.response?.speech?.plain?.speech;
  return { heard: heard || undefined, reply: reply || undefined };
}

/** the newest pipeline run that started no earlier than `since` - slack (ISO times, the server's clock), or undefined */
export function newestRun<T extends { timestamp: string }>(runs: T[], since: string | undefined, slackMs = 30000): T | undefined {
  const from = since ? Date.parse(since) - slackMs : -Infinity;
  let best: T | undefined;
  for (const r of runs) if (Date.parse(r.timestamp) >= from && (!best || Date.parse(r.timestamp) > Date.parse(best.timestamp))) best = r;
  return best;
}

/** the voice overlay's one line: the reply, else what was heard (quoted), else the status word */
export function overlayLine(phase: OverlayPhase, text: { heard?: string; reply?: string }): string {
  return text.reply ?? (text.heard ? `“${text.heard}”` : { listening: "Listening", thinking: "Thinking", responding: "Responding" }[phase]);
}
