// WebKit (Safari / iOS app engine) smoke check for dist/homeview.js at iPhone width.
// Fails if the bundle does not load or define its cards in WebKit, if a card throws
// while rendering, if the clock face is not round in a cell taller than it is wide, if a
// photo card in a hidden section browses the media server before it is shown, or if a failed
// Assist run spills out of the voice card, stretches its visualizer or does not clear on retry, or
// if a mic run (stubbed microphone) sends noise to speech-to-text, drops a tap-stop or leaves a run open,
// or if a spoken reply streamed without a length (as Home Assistant streams TTS) leaves the card stuck in
// "Responding": headless WebKit reports it as playing but never advances it, like a stalled stream,
// or if a reply whose first audio is slow to arrive (slow TTS or agent) is given up before it plays.
// One-time setup: npx playwright-core install webkit. Run: npm run test:webkit
import { readFileSync } from "node:fs";
import http from "node:http";
import { webkit } from "playwright-core";

// dev/fixtures/silence.mp3: 5 s of silence (ffmpeg -f lavfi -i anullsrc=r=22050:cl=mono -t 5 -b:a 32k),
// sent in chunks with no Content-Length, so the browser cannot know its duration
const mp3 = readFileSync(new URL("fixtures/silence.mp3", import.meta.url));
// /slow.mp3 holds back its first bytes for 8 s: longer than the playing-stall limit, shorter than the start limit
const tts = http.createServer((req, res) => {
  setTimeout(() => {
    res.writeHead(200, { "Content-Type": "audio/mpeg" });
    res.write(mp3.subarray(0, 2000));
    setTimeout(() => res.end(mp3.subarray(2000)), 100);
  }, req.url.endsWith("/slow.mp3") ? 8000 : 0);
});
await new Promise((r) => tts.listen(0, "127.0.0.1", r));
const replyUrl = `http://127.0.0.1:${tts.address().port}/api/tts_proxy/reply.mp3`;
const slowUrl = `http://127.0.0.1:${tts.address().port}/api/tts_proxy/slow.mp3`;

const bundle = readFileSync(new URL("../dist/homeview.js", import.meta.url), "utf8");
const browser = await webkit.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
// a secure origin, as Home Assistant over HTTPS: the card only offers the microphone there
await page.route("https://homeview.test/", (r) => r.fulfill({ contentType: "text/html", body: "<!doctype html><body style='margin:0;background:#888'></body>" }));
await page.goto("https://homeview.test/");
// Home Assistant's own ha-card is a block box; stand in for it outside Home Assistant.
await page.addScriptTag({
  content: `customElements.define("ha-card", class extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: "open" }).innerHTML = "<style>:host{display:block}</style><slot></slot>"; }
  });`,
});
await page.addScriptTag({ type: "module", content: bundle });

const result = await page.evaluate(async (replyUrl) => {
  const names = ["thermostat", "tile", "clock", "photo", "voice"].map((n) => `homeview-${n}-card`);
  await Promise.all(names.map((n) => customElements.whenDefined(n)));
  const state = (entity_id, state, attributes = {}) => ({ entity_id, state, attributes, last_changed: "", last_updated: "", context: { id: "" } });
  const hass = {
    states: {
      "climate.home": state("climate.home", "heat_cool", { current_temperature: 72, target_temp_low: 71, target_temp_high: 76, min_temp: 40, max_temp: 99, hvac_modes: ["heat_cool"] }),
      "light.lamp": state("light.lamp", "on", { friendly_name: "Lamp" }),
    },
    entities: {}, devices: {}, areas: {},
    config: { unit_system: { temperature: "°F" } },
    callService: async () => {},
    callWS: async () => ({ children: [] }),
    connection: { subscribeMessage: async () => () => {} },
    hassUrl: (p) => p,
  };
  const cells = [
    ["homeview-thermostat-card", { entity: "climate.home", grid_options: { rows: 6 } }, 358, 376],
    ["homeview-tile-card", { entity: "light.lamp", grid_options: { rows: 3 } }, 175, 184],
    ["homeview-clock-card", { grid_options: { rows: 3 } }, 175, 184],
    ["homeview-photo-card", { media: "media-source://media_source/local", grid_options: { rows: 6 } }, 358, 376],
    ["homeview-voice-card", { grid_options: { rows: 3 } }, 358, 184],
  ];
  const out = { defined: names.filter((n) => customElements.get(n)), rendered: [] };
  for (const [tag, config, w, h] of cells) {
    const cell = document.body.appendChild(document.createElement("div"));
    cell.style.cssText = `width:${w}px;height:${h}px;margin:8px`;
    const el = document.createElement(tag);
    el.setConfig(config);
    el.hass = hass;
    cell.appendChild(el);
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 300));
    const card = el.shadowRoot.querySelector("ha-card");
    const r = card?.getBoundingClientRect();
    out.rendered.push({ tag, card: !!card, w: Math.round(r?.width ?? 0), h: Math.round(r?.height ?? 0) });
  }
  // a photo card in a hidden section must not browse the media server until it is shown
  let browses = 0;
  const counting = { ...hass, callWS: async (m) => (m.type === "media_source/browse_media" && browses++, { children: [] }) };
  const hidden = document.body.appendChild(document.createElement("div"));
  hidden.style.cssText = "display:none;width:358px;height:376px";
  const photo = document.createElement("homeview-photo-card");
  photo.setConfig({ media: "media-source://media_source/local" });
  photo.hass = counting;
  hidden.appendChild(photo);
  await photo.updateComplete;
  await new Promise((r) => setTimeout(r, 300));
  out.hiddenBrowses = browses;
  hidden.style.display = "block";
  await new Promise((r) => setTimeout(r, 300));
  out.shownBrowses = browses;

  // a failed Assist run, in every cell shape the voice card allows: phone 12x3 / 6x3 / 6x6 / 12x6
  const long = "Text-to-speech engine tts.example_text_to_speech does not support language en or options {'voice': 'dummy_voice_000000000000'}: Provider tts.example_text_to_speech not found";
  let ok = false;
  const voiceHass = { ...hass, connection: { subscribeMessage: async () => { if (ok) return () => {}; throw { code: "tts-not-supported", message: long }; } } };
  out.voice = [];
  for (const [w, h] of [[358, 184], [175, 184], [175, 376], [358, 376]]) {
    ok = false;
    const cell = document.body.appendChild(document.createElement("div"));
    cell.style.cssText = `width:${w}px;height:${h}px;margin:8px`;
    const el = document.createElement("homeview-voice-card");
    el.setConfig({ grid_options: { rows: h > 300 ? 6 : 3 } });
    el.hass = voiceHass;
    cell.appendChild(el);
    await el.updateComplete;
    const q = (s) => el.shadowRoot.querySelector(s);
    q(".kbd")?.click();
    await el.updateComplete;
    q("input[name=q]").value = "turn on the lights";
    q("form.type").requestSubmit();
    await new Promise((r) => setTimeout(r, 400));
    const card = q("ha-card").getBoundingClientRect();
    const sub = q(".sub");
    const canvas = q("canvas.viz");
    const spill = [".head", ".sub", ".orb", "canvas.viz", ".lines", ".kbd", ".type"].filter((s) => {
      const e = q(s);
      const b = e?.getBoundingClientRect();
      return b && b.width && (b.left < card.left - 1 || b.top < card.top - 1 || b.right > card.right + 1 || b.bottom > card.bottom + 1);
    });
    const lines = Math.round(sub.getBoundingClientRect().height / parseFloat(getComputedStyle(sub).lineHeight));
    const r = { w, h, status: sub.textContent, title: sub.title, spill, lines, css: canvas.clientWidth / canvas.clientHeight, buffer: canvas.width / canvas.height };
    // try again: the next run clears the error
    ok = true;
    q(".orb").click();
    await new Promise((r) => setTimeout(r, 200));
    r.after = q(".sub").textContent;
    out.voice.push(r);
  }

  // the microphone flows, with a stubbed mic and audio graph fed faster than real time
  const log = [];
  let track;
  Object.defineProperty(MediaDevices.prototype, "getUserMedia", {
    configurable: true,
    value: async () => {
      track = { readyState: "live", stop() { this.readyState = "ended"; log.push("track-stop"); } };
      return { getTracks: () => [track] };
    },
  });
  let worklet;
  const node = () => ({ connect() {}, disconnect() {} });
  window.AudioContext = class {
    sampleRate = 16000;
    destination = node();
    audioWorklet = { addModule: async () => {} };
    async resume() {}
    createMediaStreamSource() { return node(); }
    createAnalyser() { return { ...node(), frequencyBinCount: 128, getByteFrequencyData() {} }; }
  };
  window.AudioWorkletNode = class { constructor() { worklet = this; this.port = { onmessage: null }; } connect() {} disconnect() {} };
  let emit;
  const frames = [];
  const micHass = {
    ...hass,
    connection: {
      socket: { send: (b) => frames.push(b.length) },
      subscribeMessage: async (cb, msg) => {
        const n = log.filter((l) => l.startsWith("sub")).length + 1;
        log.push(`sub${n}:${msg.start_stage}`);
        emit = cb;
        return async () => log.push(`unsub${n}`);
      },
    },
  };
  // RMS ~0.002, below the speech threshold
  const feed = (seconds) => {
    for (let i = 0; i < seconds * 16000; i += 2048) {
      worklet.port.onmessage({ data: Float32Array.from({ length: 2048 }, () => (Math.random() - 0.5) * 0.007) });
    }
  };
  const tick = () => new Promise((r) => setTimeout(r, 50));
  const runStart = () => emit({ type: "run-start", data: { runner_data: { stt_binary_handler_id: 1 } } });
  const mic = async (scenario) => {
    log.length = 0;
    frames.length = 0;
    const cell = document.body.appendChild(document.createElement("div"));
    cell.style.cssText = "width:358px;height:184px;margin:8px";
    const el = document.createElement("homeview-voice-card");
    el.setConfig({ grid_options: { rows: 3 } });
    el.hass = micHass;
    cell.appendChild(el);
    await el.updateComplete;
    const q = (s) => el.shadowRoot.querySelector(s);
    q(".orb").click();
    await tick();
    await scenario(q, el);
    await tick();
    const r = { status: q(".sub").textContent, log: [...log], ends: frames.filter((f) => f === 1).length, audio: frames.filter((f) => f > 1).length };
    cell.remove();
    return r;
  };
  out.mic = {
    silence: await mic(async () => { runStart(); feed(7.2); }),
    tapQuiet: await mic(async (q) => { runStart(); feed(2.6); q(".orb").click(); }),
    typed: await mic(async (q, el) => {
      runStart();
      feed(1);
      q(".kbd").click();
      await el.updateComplete;
      q("input[name=q]").value = "turn on the lights";
      q("form.type").requestSubmit();
    }),
    tapEarly: await mic(async (q) => { feed(0.5); q(".orb").click(); await tick(); runStart(); }),
  };
  out.mic.typed.track = track.readyState;

  // the reply scenario below drives this card from separate evaluate calls
  window.__smoke = { emit: (e) => emit(e), log, micHass, tick };
  return out;
});

// A spoken reply streamed without a length that never finishes playing: the card must give up and accept
// taps. The reply events arrive in their own evaluate, which carries a user gesture as a real tap does, so
// the browser lets the reply play (it stays at 0 s in headless WebKit, like a stalled stream).
await page.evaluate(async () => {
  const { micHass, log, tick } = window.__smoke;
  log.length = 0;
  const cell = document.body.appendChild(document.createElement("div"));
  cell.style.cssText = "width:358px;height:184px;margin:8px";
  const el = document.createElement("homeview-voice-card");
  el.setConfig({ grid_options: { rows: 3 } });
  el.hass = micHass;
  cell.appendChild(el);
  await el.updateComplete;
  const q = (s) => el.shadowRoot.querySelector(s);
  q(".kbd").click();
  await el.updateComplete;
  q("input[name=q]").value = "what time is it";
  q("form.type").requestSubmit();
  await tick();
  window.__smoke.card = el;
});
await page.evaluate((replyUrl) => {
  const { emit } = window.__smoke;
  emit({ type: "run-start", data: { runner_data: {} } });
  emit({ type: "intent-end", data: { intent_output: { response: { speech: { plain: { speech: "It is seven." } } } } } });
  emit({ type: "tts-start", data: {} });
  emit({ type: "tts-end", data: { tts_output: { url: replyUrl } } });
  emit({ type: "run-end", data: null });
}, replyUrl);
result.reply = await page.evaluate(async () => {
  const { card: el, log, tick } = window.__smoke;
  const q = (s) => el.shadowRoot.querySelector(s);
  // once the reply plays, stop it under the card, as a stalled stream or a dead output device would; nothing
  // but the card's own watchdog can end it then (headless WebKit may not advance playback at all: same case)
  const audio = el.audio;
  const t1 = performance.now();
  while (!(audio.readyState >= 3 && !audio.paused) && performance.now() - t1 < 5000) await new Promise((r) => setTimeout(r, 50));
  audio.pause();
  const playing = q(".sub").textContent;
  const t0 = performance.now();
  while (q(".sub").textContent === "Responding" && performance.now() - t0 < 15000) await new Promise((r) => setTimeout(r, 250));
  const settledAfter = +((performance.now() - t0) / 1000).toFixed(1);
  const status = q(".sub").textContent;
  q(".orb").click();
  await tick();
  return { playing, status, settledAfter, tapStarted: log.some((l) => /^sub\d+:stt$/.test(l)) };
});
// a typed request sent while a reply plays: the old reply's give-up must not reset the new run to idle
await page.evaluate(async () => {
  const { card: el, tick } = window.__smoke;
  el.shadowRoot.querySelector(".orb").click(); // stop the listening run started above
  await tick();
});
await page.evaluate((replyUrl) => {
  const { emit } = window.__smoke;
  emit({ type: "run-start", data: { runner_data: {} } });
  emit({ type: "tts-end", data: { tts_output: { url: replyUrl } } });
}, replyUrl);
result.replyThenTyped = await page.evaluate(async () => {
  const { card: el, tick } = window.__smoke;
  const q = (s) => el.shadowRoot.querySelector(s);
  await new Promise((r) => setTimeout(r, 1000));
  const playing = q(".sub").textContent;
  if (!q("input[name=q]")) { q(".kbd").click(); await el.updateComplete; }
  q("input[name=q]").value = "and the date";
  q("form.type").requestSubmit();
  await tick();
  await new Promise((r) => setTimeout(r, 7500));
  return { playing, after: q(".sub").textContent };
});
// a reply whose first audio takes 8 s to arrive must still show "Responding" at 7 s
await page.evaluate((slowUrl) => {
  const { emit } = window.__smoke;
  emit({ type: "run-start", data: { runner_data: {} } });
  emit({ type: "tts-end", data: { tts_output: { url: slowUrl } } });
}, slowUrl);
result.slowReply = await page.evaluate(async () => {
  const { card: el } = window.__smoke;
  await new Promise((r) => setTimeout(r, 7000));
  return { at7s: el.shadowRoot.querySelector(".sub").textContent };
});
await browser.close();
tts.closeAllConnections();
tts.close();

const fail = [];
if (errors.length) fail.push(`page errors: ${errors.join(" | ")}`);
if (result.defined.length !== 5) fail.push(`defined only ${result.defined.join(", ")}`);
for (const r of result.rendered) if (!r.card || !r.w || !r.h) fail.push(`${r.tag} did not render`);
if (result.hiddenBrowses !== 0) fail.push(`hidden photo card browsed media ${result.hiddenBrowses} times`);
if (result.shownBrowses !== 1) fail.push(`shown photo card browsed media ${result.shownBrowses} times, expected 1`);
const clock = result.rendered.find((r) => r.tag === "homeview-clock-card");
if (clock && Math.abs(clock.w - clock.h) > 1) fail.push(`clock face is ${clock.w}x${clock.h}, not round`);
for (const v of result.voice) {
  const at = `voice ${v.w}x${v.h} error`;
  if (v.status !== "Couldn't speak the reply") fail.push(`${at}: status "${v.status}", expected the short message`);
  if (!v.title.includes("not found")) fail.push(`${at}: full error not kept in the status tooltip`);
  if (v.spill.length) fail.push(`${at}: ${v.spill.join(", ")} outside the card`);
  if (v.lines > 2) fail.push(`${at}: status wraps to ${v.lines} lines`);
  if (Math.abs(v.css / v.buffer - 1) > 0.02) fail.push(`${at}: visualizer drawn at ${v.buffer.toFixed(2)} for a ${v.css.toFixed(2)} box, not round`);
  if (v.after === v.status) fail.push(`${at}: retry did not clear the error`);
}
const { silence, tapQuiet, typed, tapEarly } = result.mic;
if (silence.status !== "Didn't catch that") fail.push(`mic silence: status "${silence.status}", expected "Didn't catch that"`);
if (silence.ends) fail.push("mic silence: sent end-of-audio, so speech-to-text would transcribe the noise");
if (!silence.log.includes("unsub1")) fail.push("mic silence: run not unsubscribed");
if (tapQuiet.ends !== 1) fail.push(`mic tap stop with quiet audio: ${tapQuiet.ends} end-of-audio frames, expected 1`);
if (!tapQuiet.audio) fail.push("mic tap stop with quiet audio: no audio sent");
const order = (l) => typed.log.indexOf(l);
if (typed.track !== "ended") fail.push("mic typed while listening: microphone track still live");
if (!(order("track-stop") >= 0 && order("unsub1") > order("track-stop") && order("sub2:intent") > order("unsub1")))
  fail.push(`mic typed while listening: expected track-stop, unsub1, sub2:intent; got ${typed.log.join(", ")}`);
if (tapEarly.ends !== 1) fail.push(`mic tap stop before run-start: ${tapEarly.ends} end-of-audio frames, expected 1`);
const { reply } = result;
if (reply.playing !== "Responding") fail.push(`voice reply: status "${reply.playing}" while the reply plays, expected "Responding"`);
if (reply.status === "Responding" || reply.settledAfter > 9) fail.push(`voice reply: still "Responding" ${reply.settledAfter} s after a playing reply stopped advancing (expected about 6 s)`);
if (!reply.tapStarted) fail.push("voice reply: tapping the orb after the reply did not start listening");
const { replyThenTyped: rt } = result;
if (rt.playing !== "Responding") fail.push(`voice reply then typed: status "${rt.playing}" while the second reply plays, expected "Responding"`);
if (rt.after !== "Thinking") fail.push(`voice reply then typed: the new run shows "${rt.after}" after the old reply gave up, expected "Thinking"`);
if (result.slowReply.at7s !== "Responding") fail.push(`voice slow reply: status "${result.slowReply.at7s}" 7 s into a reply whose first audio takes 8 s, expected "Responding"`);
console.log(JSON.stringify(result.rendered));
console.log(JSON.stringify(result.mic));
console.log(JSON.stringify(result.reply), JSON.stringify(result.replyThenTyped), JSON.stringify(result.slowReply));
if (fail.length) {
  console.error(`WebKit smoke FAILED:\n- ${fail.join("\n- ")}`);
  process.exit(1);
}
console.log("WebKit smoke passed: 5 cards defined and rendered, clock round, hidden photo card idle, voice error contained and round, mic flows end runs, stalled reply recovers, slow reply waits");
