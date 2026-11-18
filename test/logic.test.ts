import { test } from "node:test";
import assert from "node:assert/strict";
import {
  clampStep, defaultSide, handAngles, isActive, listImages, nowIn, phaseAfter, satellitePhase, setpoints, shuffled, tapService,
} from "../src/logic.ts";

const climate = (attributes: Record<string, unknown>, state = "heat") => ({ entity_id: "climate.x", state, attributes });

test("thermostat: single, dual and no setpoint", () => {
  assert.deepEqual(setpoints(climate({ temperature: 68 })), { mode: "single", value: 68 });
  assert.deepEqual(setpoints(climate({ temperature: null, target_temp_low: 70, target_temp_high: 75 })), { mode: "dual", low: 70, high: 75 });
  assert.deepEqual(setpoints(climate({})), { mode: "none" });
});

test("thermostat: clamp and snap to the step", () => {
  assert.equal(clampStep(69.4, 1, 50, 90), 69);
  assert.equal(clampStep(21.26, 0.5, 7, 35), 21.5);
  assert.equal(clampStep(95, 1, 50, 90), 90);
  assert.equal(clampStep(4, 0.5, 7, 35), 7);
});

test("thermostat: heat_cool picks the active or nearest side", () => {
  assert.equal(defaultSide(climate({ hvac_action: "cooling", target_temp_low: 70, target_temp_high: 75 })), "high");
  assert.equal(defaultSide(climate({ hvac_action: "heating", target_temp_low: 70, target_temp_high: 75 })), "low");
  assert.equal(defaultSide(climate({ current_temperature: 74, target_temp_low: 70, target_temp_high: 75 })), "high");
  assert.equal(defaultSide(climate({ current_temperature: 69, target_temp_low: 70, target_temp_high: 75 })), "low");
});

test("tile: active state per domain (locks highlight when not locked)", () => {
  assert.equal(isActive("light", "on"), true);
  assert.equal(isActive("light", "off"), false);
  assert.equal(isActive("lock", "locked"), false);
  assert.equal(isActive("lock", "unlocked"), true);
  assert.equal(isActive("lock", "jammed"), true);
  assert.equal(isActive("cover", "open"), true);
  assert.equal(isActive("cover", "closed"), false);
  assert.equal(isActive("scene", "2026-01-01"), false);
});

test("tile: tap service per domain and state", () => {
  assert.deepEqual(tapService("lock", "locked"), ["lock", "unlock"]);
  assert.deepEqual(tapService("lock", "unlocked"), ["lock", "lock"]);
  assert.deepEqual(tapService("scene", "x"), ["scene", "turn_on"]);
  assert.deepEqual(tapService("script", "on"), ["script", "turn_off"]);
  assert.deepEqual(tapService("script", "off"), ["script", "turn_on"]);
  assert.deepEqual(tapService("cover", "open"), ["cover", "toggle"]);
  assert.deepEqual(tapService("fan", "off"), ["fan", "toggle"]);
  assert.deepEqual(tapService("vacuum", "docked"), ["homeassistant", "toggle"]);
});

test("clock: hand angles and time zones", () => {
  assert.deepEqual(handAngles(3, 0, 0), { h: 90, m: 0, s: 0 });
  assert.deepEqual(handAngles(15, 30, 30), { h: 105.25, m: 183, s: 180 });
  const d = new Date("2026-11-17T12:34:56Z");
  assert.deepEqual(nowIn("UTC", d), { h: 12, m: 34, s: 56, ms: 0 });
  assert.equal(nowIn("Asia/Tokyo", d).h, 21);
});

test("photo: lists images, recurses into folders only when asked", async () => {
  const tree: Record<string, { children: object[] }> = {
    root: { children: [
      { media_class: "image", media_content_type: "image/jpeg", media_content_id: "a.jpg", can_expand: false },
      { media_class: "directory", media_content_type: "", media_content_id: "sub", can_expand: true },
      { media_class: "video", media_content_type: "video/mp4", media_content_id: "v.mp4", can_expand: false },
    ] },
    sub: { children: [{ media_class: "image", media_content_type: "image/png", media_content_id: "b.png", can_expand: false }] },
  };
  const hass = { callWS: async <T>(m: Record<string, unknown>) => tree[m.media_content_id as string] as T };
  assert.deepEqual(await listImages(hass, "root", false), ["a.jpg"]);
  assert.deepEqual(await listImages(hass, "root", true), ["a.jpg", "b.png"]);
});

test("photo: shuffle is a permutation", () => {
  let seed = 1;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const s = shuffled([1, 2, 3, 4, 5], rnd);
  assert.deepEqual([...s].sort(), [1, 2, 3, 4, 5]);
});

test("voice: pipeline events drive the phase", () => {
  let p = phaseAfter("idle", { type: "run-start" });
  assert.equal(p, "listening");
  p = phaseAfter(p, { type: "stt-vad-end" });
  assert.equal(p, "thinking");
  p = phaseAfter(p, { type: "intent-end" });
  assert.equal(p, "thinking");
  p = phaseAfter(p, { type: "tts-end" });
  assert.equal(p, "responding");
  assert.equal(phaseAfter("thinking", { type: "error" }), "error");
  assert.equal(phaseAfter("thinking", { type: "run-start" }), "thinking", "text runs start in thinking");
});

test("voice: satellite states", () => {
  assert.equal(satellitePhase("listening"), "listening");
  assert.equal(satellitePhase("processing"), "thinking");
  assert.equal(satellitePhase("responding"), "responding");
  assert.equal(satellitePhase("idle"), "idle");
  assert.equal(satellitePhase(undefined), "error");
});
