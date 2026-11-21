import { test } from "node:test";
import assert from "node:assert/strict";
import {
  clampStep, defaultSide, fromFormList, handAngles, isActive, listImages, mediaFolders, nowIn, phaseAfter, satellitePhase, setpoints, shuffled, tapService, toFormList, voiceError, within, gestureOf, ShownHistory,
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
  // a lock in motion keeps the look it had until Home Assistant reports the new state
  assert.equal(isActive("lock", "locking"), true);
  assert.equal(isActive("lock", "unlocking"), false);
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

test("photo: a websocket answer that never comes fails after the limit instead of hanging the frame", async () => {
  assert.equal(await within(Promise.resolve(7), 50), 7);
  await assert.rejects(within(Promise.reject(new Error("Connection lost")), 50), /Connection lost/);
  const t = Date.now();
  await assert.rejects(within(new Promise(() => {}), 50), /did not answer/);
  assert.ok(Date.now() - t < 1000);
  // the live failure: the reply to the first album's browse is lost, so listing used to wait forever
  const img = (id: string) => ({ media_class: "image", media_content_type: "image/jpeg", media_content_id: id, can_expand: false });
  let calls = 0;
  const lossy = {
    callWS: <T>(m: Record<string, unknown>) =>
      within(calls++ === 0 ? new Promise<T>(() => {}) : Promise.resolve({ children: [img(`${m.media_content_id}/1.jpg`)] } as T), 50),
  };
  assert.deepEqual(await listImages(lossy, ["a", "b"], false), ["b/1.jpg"]);
  calls = 0;
  await assert.rejects(listImages(lossy, ["a"], false), /did not answer/);
});

test("photo: a gesture is a tap, a clear swipe on one axis, or nothing", () => {
  assert.equal(gestureOf(3, -4, 120), "tap");
  assert.equal(gestureOf(3, -4, 900), null, "a long press is not a tap");
  assert.equal(gestureOf(-120, 10, 300), "left");
  assert.equal(gestureOf(120, -20, 300), "right");
  assert.equal(gestureOf(-40, 0, 40), "left", "a short quick flick counts");
  assert.equal(gestureOf(-40, 0, 400), null, "a short slow drag does not");
  assert.equal(gestureOf(-80, -75, 200), null, "a diagonal is neither");
  assert.equal(gestureOf(5, 140, 300), "down");
  assert.equal(gestureOf(0, -140, 300), "up");
  assert.equal(gestureOf(10, 60, 600), null, "a short slow pull down does not close");
});

test("photo: history retraces shuffled pictures back and then forward before new ones", () => {
  const h = new ShownHistory<string>(3);
  assert.equal(h.peek(-1), undefined);
  for (const id of ["a", "b", "c"]) h.push(id);
  assert.equal(h.step(-1), "b");
  assert.equal(h.step(-1), "a");
  assert.equal(h.step(-1), undefined, "nothing before the first picture");
  assert.equal(h.peek(1), "b");
  assert.equal(h.step(1), "b");
  h.push("d"); // a new picture after going back replaces what was ahead
  assert.equal(h.peek(1), undefined);
  assert.equal(h.step(-1), "b");
  h.step(1);
  h.push("e");
  h.push("f"); // capped at 3: "a" and "b" fall off
  assert.equal(h.step(-1), "e");
  assert.equal(h.step(-1), "d");
  assert.equal(h.step(-1), undefined);
  h.drop("d");
  assert.equal(h.peek(1), "e");
  h.clear();
  assert.equal(h.peek(-1), undefined);
  assert.equal(h.peek(1), undefined);
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

import {
  calendarTime, cameraPages, clockText, cropTop, dayAgenda, dayBadge, eventTime, eventTitle, forecastDays, forecastType, mediaLines, pickerColumns, relativeDay,
  roborockRooms, snapshotUrl, todayOutlook, upcoming, vacuumStatus, weatherName, wrap,
} from "../src/logic.ts";

test("media tile: playing, paused and idle lines; tap toggles play / pause", () => {
  const p = (state: string, attributes: Record<string, unknown> = {}) => ({ entity_id: "media_player.x", state, attributes });
  assert.deepEqual(mediaLines(p("playing", { media_title: "Song", media_artist: "Band" }), "Family Room"), { title: "Song", sub: "Band" });
  assert.deepEqual(mediaLines(p("paused", { media_title: "Song", media_artist: "Band" }), "Family Room"), { title: "Song", sub: "Paused · Band" });
  assert.deepEqual(mediaLines(p("playing", { media_title: "TV Audio" }), "Family Room"), { title: "TV Audio", sub: "Family Room" });
  assert.deepEqual(mediaLines(p("idle", { media_title: "Old" }), "Family Room"), { title: "Family Room", sub: "Not playing" });
  assert.equal(isActive("media_player", "playing"), true);
  assert.equal(isActive("media_player", "paused"), false);
  assert.deepEqual(tapService("media_player", "paused"), ["media_player", "media_play_pause"]);
  assert.equal(tapService("media_player", "idle"), null);
});

test("weather: forecast type and today's high / low / rain", () => {
  assert.equal(forecastType(1 | 2), "daily");
  assert.equal(forecastType(4), "twice_daily");
  assert.equal(forecastType(2), undefined);
  assert.deepEqual(todayOutlook([{ datetime: "d", temperature: 71, templow: 54, precipitation_probability: 20 }]), { high: 71, low: 54, rain: 20, amount: undefined });
  assert.deepEqual(todayOutlook([{ datetime: "d", temperature: 71, templow: 54, precipitation: 0.2 }]), { high: 71, low: 54, rain: undefined, amount: 0.2 });
  const twice = [
    { datetime: "a", is_daytime: false, temperature: 48, precipitation_probability: 10 },
    { datetime: "b", is_daytime: true, temperature: 70, precipitation_probability: 40 },
    { datetime: "c", is_daytime: false, temperature: 45, precipitation_probability: 90 },
  ];
  assert.deepEqual(todayOutlook(twice), { high: 70, low: 48, rain: 40, amount: undefined });
  assert.deepEqual(todayOutlook([]), {});
  assert.equal(weatherName("partlycloudy"), "Partly Cloudy");
  assert.equal(weatherName("sunny"), "Sunny");
});

test("calendar: all-day dates are local, ended events drop, soonest first", () => {
  assert.equal(calendarTime("2026-11-20").getHours(), 0);
  assert.equal(calendarTime("2026-11-20").getDate(), 20);
  const now = new Date(2026, 10, 20, 12, 0);
  const at = (d: number, h: number) => new Date(2026, 10, d, h).toISOString();
  const events = [
    { summary: "Later", start: at(22, 9), end: at(22, 10) },
    { summary: "Over", start: at(20, 8), end: at(20, 9) },
    { summary: "Now", start: at(20, 11), end: at(20, 13) },
    { summary: "Holiday", start: "2026-11-21", end: "2026-11-22" },
  ];
  assert.deepEqual(upcoming(events, now, 3).map((e) => e.summary), ["Now", "Holiday", "Later"]);
  assert.deepEqual(dayBadge(events[2], now, "en-US"), { label: "TODAY", day: 20, today: true, weekday: "Fri", month: "NOV", key: "2026-10-20" });
  assert.deepEqual(dayBadge(events[0], now, "en-US"), { label: "SUN", day: 22, today: false, weekday: "Sun", month: "NOV", key: "2026-10-22" });
  // started yesterday, still going: today
  assert.equal(dayBadge({ summary: "Trip", start: "2026-11-19", end: "2026-11-23" }, now, "en-US").label, "TODAY");
  assert.equal(eventTime(events[3], "en-US"), "All day");
  assert.equal(eventTime(events[0], "en-US"), "9:00 AM – 10:00 AM");
});

test("calendar: day view is what is left of today, else what's next", () => {
  const now = new Date(2026, 10, 20, 12, 0);
  const at = (d: number, h: number) => new Date(2026, 10, d, h).toISOString();
  const events = [
    { summary: "Dinner", start: at(20, 18), end: at(20, 19) },
    { summary: "Lunch", start: at(20, 11), end: at(20, 13) },
    { summary: "Breakfast", start: at(20, 8), end: at(20, 9) },
    { summary: "Dentist", start: at(23, 9), end: at(23, 10) },
  ];
  // today's two left, then the next to fill the rows
  assert.deepEqual(dayAgenda(events, now, 5), { today: 2, events: [events[1], events[0], events[3]] });
  assert.deepEqual(dayAgenda(events, now, 1), { today: 2, events: [events[1]] });
  // today is done: what's next instead
  const late = new Date(2026, 10, 20, 20, 0);
  assert.deepEqual(dayAgenda(events, late, 5), { today: 0, events: [events[3]] });
  assert.deepEqual(dayAgenda([], late, 5), { today: 0, events: [] });
  // an all-day event today counts as today
  assert.equal(dayAgenda([{ summary: "Holiday", start: "2026-11-20", end: "2026-11-21" }], late, 5).today, 1);
  assert.equal(relativeDay(events[1], now, "en-US"), "today");
  assert.equal(relativeDay({ summary: "x", start: "2026-11-21", end: "2026-11-22" }, now, "en-US"), "tomorrow");
  assert.equal(relativeDay(events[3], now, "en-US"), "in 3 days");
});

test("calendar: a free/busy-only event has no title and reads Busy", () => {
  const now = new Date(2026, 10, 20, 12, 0);
  const at = (h: number) => new Date(2026, 10, 20, h).toISOString();
  const events = [{ summary: "", start: at(14), end: at(15) }, { start: at(13), end: at(14) } as never, { summary: "  ", start: at(14), end: at(15) }];
  assert.deepEqual(upcoming(events, now, 3).map(eventTitle), ["Busy", "Busy", "Busy"]);
  assert.equal(eventTitle({ summary: " Gym ", start: at(1), end: at(2) }), "Gym");
});

test("clock: digital time follows the profile's 12 / 24 hour setting, without AM / PM", () => {
  const d = new Date(2026, 10, 21, 15, 7);
  assert.deepEqual(clockText(d, "en-US", "language"), { time: "3:07", date: "Saturday, November 21" });
  assert.equal(clockText(d, "en-US", "24").time, "15:07");
  assert.equal(clockText(d, "en-GB", "language").time, "15:07");
  assert.equal(clockText(d, "en-GB", "12").time, "3:07");
  assert.equal(clockText(new Date(Date.UTC(2026, 10, 21, 23, 30)), "en-US", "24", "Asia/Tokyo").time, "08:30");
  const midnight = new Date(2026, 10, 21, 0, 5);
  assert.equal(clockText(midnight, "en-US", "24").time, "00:05");
  assert.equal(clockText(midnight, "ja", "12").time, "12:05");
  assert.equal(clockText(midnight, "en-US", "12").time, "12:05");
});

test("weather: forecast days from a daily or a twice-daily forecast", () => {
  const daily = [1, 2, 3, 4, 5].map((d) => ({ datetime: `2026-11-2${d}T12:00:00Z`, condition: "sunny", temperature: 60 + d, templow: 40 + d, precipitation_probability: d * 10 }));
  assert.deepEqual(forecastDays(daily, 4).map((d) => [d.high, d.low, d.rain]), [[61, 41, 10], [62, 42, 20], [63, 43, 30], [64, 44, 40]]);
  assert.deepEqual(forecastDays(undefined, 4), []);
  const t = (d: number, h: number) => new Date(2026, 10, d, h).toISOString();
  const twice = [
    { datetime: t(21, 18), is_daytime: false, condition: "clear-night", temperature: 41, precipitation_probability: 5 },
    { datetime: t(22, 6), is_daytime: true, condition: "rainy", temperature: 55, precipitation_probability: 70 },
    { datetime: t(22, 18), is_daytime: false, condition: "rainy", temperature: 44, precipitation_probability: 80 },
    { datetime: t(23, 6), is_daytime: true, condition: "sunny", temperature: 58 },
  ];
  assert.deepEqual(forecastDays(twice, 3), [
    { datetime: t(21, 18), condition: "clear-night", high: undefined, low: 41, rain: 5 },
    { datetime: t(22, 6), condition: "rainy", high: 55, low: 44, rain: 80 },
    { datetime: t(23, 6), condition: "sunny", high: 58, low: undefined, rain: undefined },
  ]);
});

test("camera: snapshot URL changes once per interval", () => {
  assert.equal(snapshotUrl("/api/camera_proxy/camera.x?token=t", 25000, 10), "/api/camera_proxy/camera.x?token=t&hv=2");
  assert.equal(snapshotUrl("/a", 9999, 10), "/a?hv=0");
});

test("camera page: cameras from ids or objects, crop clamped", () => {
  assert.deepEqual(cameraPages(["camera.a", { entity: "camera.b", name: "B" }, { entity: "light.x" }, null, 3]), [
    { entity: "camera.a", name: undefined },
    { entity: "camera.b", name: "B" },
  ]);
  assert.equal(cropTop(50), 20);
  assert.deepEqual(cameraPages(undefined), []);
  assert.equal(cropTop(-3), 0);
  assert.equal(cropTop("x"), 0);
});

test("camera page: swiping wraps around, picker columns", () => {
  assert.equal(wrap(4, 4), 0);
  assert.equal(wrap(-1, 4), 3);
  assert.equal(wrap(5, 0), 0);
  assert.deepEqual([1, 2, 3, 4, 5, 6].map(pickerColumns), [1, 2, 3, 2, 3, 3]);
});

test("vacuum: status line and Roborock room ids", () => {
  assert.equal(vacuumStatus("docked", 100), "Docked · 100%");
  assert.equal(vacuumStatus("returning"), "Returning to dock");
  assert.equal(vacuumStatus("unavailable", 50), "Offline");
  assert.deepEqual(roborockRooms(["0_16", "0_21", "x_y", "22"]), [16, 21, 22]);
});

import { mediaProgress, nextRepeat, trackTime } from "../src/logic.ts";

test("now playing: position runs on from the last report while playing, clamped to the track", () => {
  const at = "2026-11-21T10:00:00Z";
  const t0 = Date.parse(at);
  const s = (state: string, a: Record<string, unknown>) => ({ entity_id: "media_player.x", state, attributes: a });
  assert.deepEqual(mediaProgress(s("playing", { media_duration: 209, media_position: 23, media_position_updated_at: at }), t0 + 10_000), { pos: 33, dur: 209 });
  assert.deepEqual(mediaProgress(s("paused", { media_duration: 209, media_position: 23, media_position_updated_at: at }), t0 + 10_000), { pos: 23, dur: 209 });
  assert.deepEqual(mediaProgress(s("playing", { media_duration: 209, media_position: 200, media_position_updated_at: at }), t0 + 60_000), { pos: 209, dur: 209 });
  assert.deepEqual(mediaProgress(s("playing", { media_duration: 209 }), t0), { pos: 0, dur: 209 });
  assert.equal(mediaProgress(s("playing", { media_position: 5 }), t0), null); // a live stream has no length
});

test("now playing: track times and the repeat cycle", () => {
  assert.equal(trackTime(0), "0:00");
  assert.equal(trackTime(83.9), "1:23");
  assert.equal(trackTime(3725), "1:02:05");
  assert.equal(nextRepeat("off"), "all");
  assert.equal(nextRepeat("all"), "one");
  assert.equal(nextRepeat("one"), "off");
  assert.equal(nextRepeat(undefined), "all");
});
