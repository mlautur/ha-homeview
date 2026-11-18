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

export async function listImages(hass: Pick<Hass, "callWS">, root: string, recursive: boolean): Promise<string[]> {
  const out: string[] = [];
  const queue: Array<[string, number]> = [[root, 0]];
  while (queue.length && out.length < MAX_ITEMS) {
    const [id, depth] = queue.shift()!;
    const node = await hass.callWS<BrowseItem>({ type: "media_source/browse_media", media_content_id: id });
    for (const child of node.children ?? []) {
      if (isImage(child)) out.push(child.media_content_id);
      else if (recursive && child.can_expand && depth < 3) queue.push([child.media_content_id, depth + 1]);
      if (out.length >= MAX_ITEMS) break;
    }
  }
  return out;
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
