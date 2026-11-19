/**
 * Card behaviour that does not need the DOM: setpoint maths, tile actions,
 * clock angles, media listing, voice phases. Unit-tested in test/logic.test.ts.
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
    case "lock":
      return state !== "locked" && state !== "locking";
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
