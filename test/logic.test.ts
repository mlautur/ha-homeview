import { test } from "node:test";
import assert from "node:assert/strict";
import {
  clampStep, defaultSide, fromFormList, handAngles, isActive, listImages, mediaFolders, nowIn, phaseAfter, satellitePhase, setpoints, shuffled, tapService, toFormList, voiceError,
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

test("photo: a large first folder does not hide the later ones", async () => {
  const img = (id: string) => ({ media_class: "image", media_content_type: "image/jpeg", media_content_id: id, can_expand: false });
  const dir = (id: string) => ({ media_class: "directory", media_content_type: "", media_content_id: id, can_expand: true });
  const tree: Record<string, { children: object[] }> = {
    root: { children: [dir("big"), dir("later")] },
    big: { children: Array.from({ length: 1500 }, (_, i) => img(`big/${i}.jpg`)) },
    later: { children: [img("later/x.jpg")] },
  };
  const hass = { callWS: async <T>(m: Record<string, unknown>) => tree[m.media_content_id as string] as T };
  const ids = await listImages(hass, "root", true);
  assert.equal(ids.length, 1501);
  assert.ok(ids.includes("later/x.jpg"));
});

test("photo: media is one folder or a list of folders", () => {
  assert.deepEqual(mediaFolders("media-source://a"), ["media-source://a"]);
  assert.deepEqual(mediaFolders(["media-source://a", " media-source://b ", ""]), ["media-source://a", "media-source://b"]);
  assert.deepEqual(mediaFolders(undefined), []);
  assert.deepEqual(mediaFolders([]), []);
});

test("photo: lists every folder, without duplicates, skipping one that fails", async () => {
  const img = (id: string) => ({ media_class: "image", media_content_type: "image/jpeg", media_content_id: id, can_expand: false });
  const tree: Record<string, { children: object[] }> = {
    a: { children: [img("a/1.jpg"), img("shared.jpg")] },
    b: { children: [img("b/1.jpg"), img("shared.jpg"), { media_class: "directory", media_content_type: "", media_content_id: "b/sub", can_expand: true }] },
    "b/sub": { children: [img("b/sub/1.jpg")] },
  };
  const hass = {
    callWS: async <T>(m: Record<string, unknown>) => {
      const node = tree[m.media_content_id as string];
      if (!node) throw new Error("Path does not exist.");
      return node as T;
    },
  };
  assert.deepEqual(await listImages(hass, ["a", "b"], true), ["a/1.jpg", "shared.jpg", "b/1.jpg", "b/sub/1.jpg"]);
  assert.deepEqual(await listImages(hass, ["gone", "a"], false), ["a/1.jpg", "shared.jpg"]);
  await assert.rejects(listImages(hass, ["gone", "also-gone"], false), /Path does not exist/);
  tree.c = { children: [{ media_class: "directory", media_content_type: "", media_content_id: "c/broken", can_expand: true }] };
  await assert.rejects(listImages(hass, ["a", "c"], true), /Path does not exist/);
  assert.deepEqual(await listImages(hass, ["a", "c"], false), ["a/1.jpg", "shared.jpg"]);
});

test("editor: a list field shows as a list and saves one value as a plain string", () => {
  assert.deepEqual(toFormList({ media: "x", interval: 5 }, ["media"]), { media: ["x"], interval: 5 });
  assert.deepEqual(toFormList({ interval: 5 }, ["media"]), { interval: 5 });
  assert.deepEqual(fromFormList({ media: ["x"] }, ["media"]), { media: "x" });
  assert.deepEqual(fromFormList({ media: [] }, ["media"]), {});
});

test("editor: a row just added survives the setConfig round trip", () => {
  for (const media of [[""], ["x", ""], ["x", "", "y"]]) {
    const saved = fromFormList({ media }, ["media"]);
    assert.deepEqual(saved, { media });
    assert.deepEqual(toFormList(saved, ["media"]), { media });
  }
  assert.deepEqual(mediaFolders(["x", ""]), ["x"]);
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

test("voice: failures become a short status line and keep the full detail", () => {
  const tts = "Text-to-speech engine tts.example does not support language en or options {'voice': 'dummy'}: Unsupported options: voice";
  assert.deepEqual(voiceError({ code: "tts-not-supported", message: tts }), { text: "Couldn't speak the reply", detail: tts });
  assert.equal(voiceError({ code: "tts-failed", message: "x" }).text, "Couldn't speak the reply");
  assert.equal(voiceError({ code: "stt-no-text-recognized", message: "No text recognized" }).text, "Didn't catch that");
  assert.equal(voiceError({ code: "stt-stream-failed", message: "x" }).text, "Couldn't recognize speech");
  assert.equal(voiceError({ code: "intent-failed", message: "x" }).text, "Couldn't handle the request");
  assert.equal(voiceError({ code: "pipeline-not-found", message: "x" }).text, "Assist pipeline not found");
  assert.equal(voiceError(new DOMException("Permission denied", "NotAllowedError")).text, "Microphone access was denied");
  assert.deepEqual(voiceError(new Error("socket closed")), { text: "Something went wrong", detail: "socket closed" });
  assert.deepEqual(voiceError({ code: "unknown_error" }), { text: "Something went wrong", detail: "unknown_error" });
  assert.deepEqual(voiceError("Assist error"), { text: "Something went wrong", detail: "Assist error" });
  assert.deepEqual(voiceError(undefined), { text: "Something went wrong", detail: "undefined" });
});
