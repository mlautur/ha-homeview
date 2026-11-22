// WebKit (Safari / iOS app engine) smoke check for dist/homeview.js at iPhone width.
// Fails if the bundle does not load or define its cards in WebKit, if a card throws
// while rendering, if the clock face is not round in a cell taller than it is wide, if a
// photo card in a hidden section browses the media server before it is shown, or if a failed
// Assist run spills out of the voice card, stretches its visualizer or does not clear on retry, or
// if a mic run (stubbed microphone) sends noise to speech-to-text, drops a tap-stop or leaves a run open,
// or if an earlier tap's recorder still feeds a later run, if more than one microphone capture is ever live or one
// outlives its run (stop, error, typed request, detach, a tap or typed request while the microphone opens),
// if a long transcript or reply grows past two lines or out of the card,
// or if a spoken reply streamed without a length (as Home Assistant streams TTS) leaves the card stuck in
// "Responding": headless WebKit reports it as playing but never advances it, like a stalled stream,
// or if a reply whose first audio is slow to arrive (slow TTS or agent) is given up before it plays.
// or if a photo frame whose Home Assistant answers are lost (a tablet's Wi-Fi drops, or it sleeps, mid-request)
// stays empty instead of giving up on the lost answer and trying again.
// or if swiping the photo frame does not step to the next / previous picture (retracing a shuffled order),
// or a vertical drag changes it, or a tap does not open a full-screen slideshow that covers the screen,
// swipes along with the card, and closes on a swipe down, on Escape and by itself after 3 hours.
// or if the weather, up next, camera, vacuum or media cards show the wrong data, make the wrong service calls, or their
// full-screen live view / vacuum panel does not open and close,
// or if the camera card's page mode does not stream just the camera on screen, swipe between cameras while ignoring
// vertical drags, hide a swipe between cameras from Swipe Navigation or keep a swipe past the first / last camera from it, unmute, pick from its grid, or go home.
// or if the Now Playing card does not tick its progress, control its one player, open its volume slider or go back home.
// or if the digital clock, the calendar's day and list layouts, the weather page or a tile's navigate tap go wrong
// (wrong text, glass where the text should sit on the wallpaper, a free/busy event without "Busy", no navigation),
// or if the voice overlay does not follow its satellite (shown, linger, hide, never unavailable or in edit mode), takes touches
// or history, drops out on a swipe mid-reply, or reads the transcript without transcript: true or as a non-admin.
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

  // a long transcript and reply (a run that heard a whole paragraph) stay inside the card, two lines each,
  // in the live wall-panel cell: a 12x3 voice card, 374x184 at a 390 px viewport, idle
  {
    const cell = document.body.appendChild(document.createElement("div"));
    cell.style.cssText = "width:374px;height:184px;margin:8px";
    const el = document.createElement("homeview-voice-card");
    el.setConfig({ name: "Assist", speak: true, grid_options: { columns: 12, rows: 3 } });
    el.hass = hass;
    cell.appendChild(el);
    el._heard = "Привет! Как твои дела сегодня? Я только что закончил читать интересную книгу и решил поделиться своими мыслями о ней.";
    el._reply = "Привет! Всё отлично, спасибо. Рада за тебя! О какой книге идет речь? Расскажи, что тебе понравилось больше всего.";
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 100));
    const q = (s) => el.shadowRoot.querySelector(s);
    const card = q("ha-card").getBoundingClientRect();
    const m = (s) => { const b = q(s).getBoundingClientRect(); return { lines: Math.round(b.height / parseFloat(getComputedStyle(q(s)).lineHeight)), out: b.bottom > card.bottom + 1 || b.right > card.right + 1 }; };
    out.longText = { status: q(".sub").textContent, heard: m(".heard"), reply: m(".reply") };
    cell.remove();
  }

  // the microphone flows, with a stubbed mic and audio graph fed faster than real time
  const log = [];
  const tracks = [];
  const recorders = [];
  // while set, getUserMedia waits for it, as it does while the permission prompt is open
  let gate = null;
  Object.defineProperty(MediaDevices.prototype, "getUserMedia", {
    configurable: true,
    value: async () => {
      if (gate) await gate;
      const track = { readyState: "live", stop() { this.readyState = "ended"; log.push("track-stop"); } };
      tracks.push(track);
      return { getTracks: () => [track] };
    },
  });
  // what still holds the microphone or can still deliver audio: never more than one of each, none once a run is over
  const live = () => ({ tracks: tracks.filter((t) => t.readyState === "live").length, recorders: recorders.filter((w) => w.port.onmessage).length });
  let worklet;
  let contexts = 0;
  const node = () => ({ connect() {}, disconnect() {} });
  // disconnect() does nothing here, as a real recorder still attached to the graph keeps delivering audio
  window.AudioContext = class {
    constructor() { contexts++; }
    sampleRate = 16000;
    destination = node();
    audioWorklet = { addModule: async () => {} };
    async resume() {}
    async close() {}
    createMediaStreamSource() { return node(); }
    createAnalyser() { return { ...node(), frequencyBinCount: 128, getByteFrequencyData() {} }; }
  };
  window.AudioWorkletNode = class { constructor() { worklet = this; recorders.push(this); this.port = { onmessage: null }; } connect() {} disconnect() {} };
  let emit;
  let subFails = false;
  const frames = [];
  const micHass = {
    ...hass,
    connection: {
      socket: { send: (b) => frames.push(b.length) },
      subscribeMessage: async (cb, msg) => {
        const n = log.filter((l) => l.startsWith("sub")).length + 1;
        log.push(`sub${n}:${msg.start_stage}`);
        if (subFails) throw { code: "pipeline-not-found", message: "Pipeline not found" };
        emit = cb;
        return async () => log.push(`unsub${n}`);
      },
    },
  };
  // RMS ~0.002, below the speech threshold
  const feed = (seconds, from = worklet) => {
    for (let i = 0; i < seconds * 16000; i += 2048) {
      from.port.onmessage?.({ data: Float32Array.from({ length: 2048 }, () => (Math.random() - 0.5) * 0.007) });
    }
  };
  const tick = () => new Promise((r) => setTimeout(r, 50));
  const runStart = () => emit({ type: "run-start", data: { runner_data: { stt_binary_handler_id: 1 } } });
  const typeRequest = async (q, el) => {
    q(".kbd").click();
    await el.updateComplete;
    q("input[name=q]").value = "turn on the lights";
    q("form.type").requestSubmit();
  };
  // `before` runs ahead of the tap; `live` is read once the scenario is over, `afterDetach` once the card is removed
  const mic = async (scenario, before = () => {}) => {
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
    before();
    q(".orb").click();
    await tick();
    const extra = await scenario(q, el);
    await tick();
    const r = { ...extra, status: q(".sub").textContent, log: [...log], ends: frames.filter((f) => f === 1).length, audio: frames.filter((f) => f > 1).length, live: live() };
    cell.remove();
    await tick();
    r.afterDetach = live();
    return r;
  };
  // a tap whose microphone is still opening (permission prompt) when the scenario acts; the prompt is answered after
  const opening = (act) => {
    let answer;
    return [
      async (q, el) => {
        await act(q, el);
        await tick();
        answer();
        gate = null;
        await tick();
      },
      () => (gate = new Promise((r) => (answer = r))),
    ];
  };
  out.mic = {
    silence: await mic(async () => { runStart(); feed(7.2); }),
    tapQuiet: await mic(async (q) => { runStart(); feed(2.6); q(".orb").click(); }),
    typed: await mic(async (q, el) => {
      runStart();
      feed(1);
      await typeRequest(q, el);
    }),
    tapEarly: await mic(async (q) => { feed(0.5); q(".orb").click(); await tick(); runStart(); }),
    // the first tap's recorder must not feed the second run: each earlier tap would add a copy of the audio
    secondTap: await mic(async (q) => {
      contexts = 0;
      runStart();
      feed(1);
      q(".orb").click();
      emit({ type: "run-end", data: {} });
      await tick();
      const first = worklet;
      q(".orb").click();
      await tick();
      runStart();
      frames.length = 0;
      feed(1, first);
      const stale = frames.filter((f) => f > 1).length;
      feed(1);
      return { stale, fresh: frames.filter((f) => f > 1).length - stale, contexts, during: live() };
    }),
    // the run fails to start: the microphone it opened is released
    runFails: await mic(async () => { subFails = false; }, () => (subFails = true)),
    // removed from the page mid-sentence
    detached: await mic(async (q, el) => {
      runStart();
      feed(1);
      el.remove();
      await tick();
    }),
    // tapped again before the microphone opened: cancelled, no run, nothing left open once the prompt is answered
    tapWhileOpening: await mic(...opening((q) => q(".orb").click())),
    // a typed request before the microphone opened: only the typed run goes ahead
    typedWhileOpening: await mic(...opening(typeRequest)),
  };

  // the reply scenario below drives this card from separate evaluate calls
  window.__smoke = { emit: (e) => emit(e), log, micHass, tick };
  return out;
});

// A spoken reply streamed without a length that never finishes playing: the card must stop it, show the
// short reply error and re-send the typed request from the retry orb. The reply events arrive in their own evaluate, which carries a user gesture as a real tap does, so
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
  const stopped = audio.paused && !audio.hasAttribute("src");
  const subs = log.filter((l) => l.startsWith("sub")).length;
  q(".orb").click();
  await tick();
  return { playing, status, settledAfter, stopped, retried: log.slice(subs).some((l) => /^sub\d+:intent$/.test(l)) };
});
// a typed request sent while a reply plays: the old reply's give-up must not reset the new run to idle
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
// a card detached while its reply plays (dashboard view switch) and reattached later must be idle, not failed
await page.evaluate((replyUrl) => {
  const { emit } = window.__smoke;
  emit({ type: "tts-end", data: { tts_output: { url: replyUrl } } });
}, replyUrl);
result.detached = await page.evaluate(async () => {
  const { card: el } = window.__smoke;
  const audio = el.audio;
  const t1 = performance.now();
  while (!(audio.readyState >= 3 && !audio.paused) && performance.now() - t1 < 5000) await new Promise((r) => setTimeout(r, 50));
  const playing = el.shadowRoot.querySelector(".sub").textContent;
  const parent = el.parentNode;
  el.remove();
  await new Promise((r) => setTimeout(r, 7500));
  parent.appendChild(el);
  await el.updateComplete;
  return { playing, after: el.shadowRoot.querySelector(".sub").textContent, stopped: audio.paused && !audio.hasAttribute("src") };
});
// lost answers: the first folder list and the first picture's resolve never answer (a reply lost on a
// connection that died without closing). Fake clock, so the 30 s answer limit and the retry run instantly.
const photoPage = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true });
photoPage.on("pageerror", (e) => errors.push(e.message));
await photoPage.clock.install();
await photoPage.route("https://homeview.test/", (r) => r.fulfill({ contentType: "text/html", body: "<!doctype html><body style='margin:0;background:#888'></body>" }));
await photoPage.goto("https://homeview.test/");
await photoPage.addScriptTag({
  content: `customElements.define("ha-card", class extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: "open" }).innerHTML = "<style>:host{display:block}</style><slot></slot>"; }
  });`,
});
await photoPage.addScriptTag({ type: "module", content: bundle });
await photoPage.evaluate(async () => {
  await customElements.whenDefined("homeview-photo-card");
  const png = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==";
  const img = (id) => ({ media_class: "image", media_content_type: "image/png", media_content_id: id, can_expand: false });
  const calls = (window.__calls = []);
  const lost = new Promise(() => {});
  const hass = {
    states: {}, entities: {}, devices: {}, areas: {}, config: { unit_system: { temperature: "°F" } },
    callService: async () => {}, connection: { subscribeMessage: async () => () => {} }, hassUrl: (p) => p,
    callWS: (m) => {
      calls.push(m.type);
      const nth = calls.filter((t) => t === m.type).length;
      if (m.type === "media_source/browse_media") return nth === 1 ? lost : Promise.resolve({ children: [img("a.png"), img("b.png")] });
      if (m.type === "media_source/resolve_media") return nth === 1 ? lost : Promise.resolve({ url: png });
      return Promise.resolve({});
    },
  };
  const cell = document.body.appendChild(document.createElement("div"));
  cell.style.cssText = "width:358px;height:376px;margin:8px";
  const el = document.createElement("homeview-photo-card");
  el.setConfig({ media: "media-source://media_source/local", interval: 30 });
  el.hass = hass;
  cell.appendChild(el);
  await el.updateComplete;
});
const frame = async () => {
  await photoPage.waitForTimeout(300); // real time for the picture to decode and the card to render
  return photoPage.evaluate(() => {
    const root = document.querySelector("homeview-photo-card").shadowRoot;
    return { picture: !!root.querySelector("img.front")?.getAttribute("src"), msg: root.querySelector(".msg")?.textContent ?? "", calls: window.__calls.length };
  });
};
result.lostAnswers = {};
await photoPage.clock.runFor(5000);
result.lostAnswers.at5s = await frame();
await photoPage.clock.runFor(30000); // the lost folder list gives up at 30 s
result.lostAnswers.at35s = await frame();
await photoPage.clock.runFor(10000); // retried 10 s later; that picture's resolve is lost too
await photoPage.clock.runFor(31000); // ...and gives up at 30 s, so the next picture shows
result.lostAnswers.at76s = await frame();

// gestures: swipe left / right on the card, tap for the full-screen slideshow, swipe in it, close it.
// Synthetic pointer events (headless WebKit has no touch input); fake clock for the timers.
const gesturePage = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true });
gesturePage.on("pageerror", (e) => errors.push(e.message));
await gesturePage.clock.install();
await gesturePage.route("https://homeview.test/", (r) => r.fulfill({ contentType: "text/html", body: "<!doctype html><meta name=viewport content=\'width=device-width\'><body style='margin:0;background:#888'></body>" }));
await gesturePage.goto("https://homeview.test/");
await gesturePage.addScriptTag({
  content: `customElements.define("ha-card", class extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: "open" }).innerHTML = "<style>:host{display:block}</style><slot></slot>"; }
  });`,
});
await gesturePage.addScriptTag({ type: "module", content: bundle });
await gesturePage.evaluate(async () => {
  await customElements.whenDefined("homeview-photo-card");
  // one solid-colour picture per media id, so the shown picture tells which item it is
  const ids = ["a", "b", "c", "d", "e"];
  const urls = Object.fromEntries(ids.map((id, i) => {
    const c = document.createElement("canvas");
    c.width = c.height = 8;
    const g = c.getContext("2d");
    g.fillStyle = `hsl(${i * 70} 70% 50%)`;
    g.fillRect(0, 0, 8, 8);
    return [id, c.toDataURL()];
  }));
  const byUrl = Object.fromEntries(Object.entries(urls).map(([k, v]) => [v, k]));
  const hass = {
    states: {}, entities: {}, devices: {}, areas: {}, config: { unit_system: { temperature: "°F" } },
    callService: async () => {}, connection: { subscribeMessage: async () => () => {} }, hassUrl: (p) => p,
    callWS: async (m) => {
      if (m.type === "media_source/browse_media") return { children: ids.map((id) => ({ media_class: "image", media_content_type: "image/png", media_content_id: id, can_expand: false })) };
      if (m.type === "media_source/resolve_media") return { url: urls[m.media_content_id] };
      return {};
    },
  };
  const make = (config) => {
    const cell = document.body.appendChild(document.createElement("div"));
    cell.style.cssText = "width:358px;height:376px;margin:8px";
    const el = document.createElement("homeview-photo-card");
    el.setConfig({ media: "media-source://media_source/local", interval: 30, shuffle: true, ...config });
    el.hass = hass;
    cell.appendChild(el);
    return el;
  };
  const cards = [make({}), make({ swipe: false })];
  const show = () => document.querySelector("homeview-photo-slideshow");
  // a pointer gesture from the middle of `target` by (dx, dy)
  const gesture = (target, dx, dy) => {
    const r = target.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const ev = (type, px, py) => target.dispatchEvent(new PointerEvent(type, { pointerId: 7, pointerType: "touch", isPrimary: true, clientX: px, clientY: py, bubbles: true, composed: true }));
    ev("pointerdown", x, y);
    for (let i = 1; i <= 6; i++) ev("pointermove", x + (dx * i) / 6, y + (dy * i) / 6);
    ev("pointerup", x + dx, y + dy);
  };
  window.__g = {
    card: (n) => cards[n].shadowRoot.querySelector("ha-card"),
    shown: (n) => byUrl[cards[n].shadowRoot.querySelector("img.front")?.getAttribute("src")] ?? "",
    swipe: (n, dx, dy = 0) => gesture(window.__g.card(n), dx, dy),
    tap: (n) => gesture(window.__g.card(n), 0, 0),
    slideshow: () => {
      const s = show();
      if (!s) return null;
      const r = s.getBoundingClientRect();
      return { covers: r.left === 0 && r.top === 0 && r.width === innerWidth && r.height === innerHeight, box: [r.width, r.height, innerWidth, innerHeight].map(Math.round), shown: byUrl[s.shadowRoot.querySelector(".stage img.front")?.getAttribute("src")] ?? "" };
    },
    swipeSlideshow: (dx, dy) => gesture(show(), dx, dy),
  };
});
const g = (fn, ...args) => gesturePage.evaluate(([fn, args]) => window.__g[fn](...args), [fn, args]);
const settle = async (ms = 1000) => {
  await gesturePage.clock.runFor(ms);
  await gesturePage.waitForTimeout(150); // real time for decoding and rendering
};
const gs = (result.gestures = {});
await settle(2000);
// swipe: false (checked first, well inside its 30 s picture time, so a timed change cannot pass for a swipe): horizontal drags are the page's (no "swiper" class, no stepping); a tap still opens the slideshow
gs.noSwipe = { swiper: await gesturePage.evaluate(() => window.__g.card(1).classList.contains("swiper")), before: await g("shown", 1) };
await g("swipe", 1, -200);
await settle();
gs.noSwipe.afterLeft = await g("shown", 1);
await g("tap", 1);
await settle(500);
gs.noSwipe.open = !!(await g("slideshow"));
await gesturePage.keyboard.press("Escape");
await settle();
gs.first = await g("shown", 0);
await g("swipe", 0, -200);
await settle();
gs.afterLeft = await g("shown", 0);
await g("swipe", 0, 200);
await settle();
gs.afterRight = await g("shown", 0);
await g("swipe", 0, 200); // nothing before the first picture: it settles back
await settle();
gs.beforeFirst = await g("shown", 0);
await g("swipe", 0, 0, -200);
await settle();
gs.afterVertical = await g("shown", 0);
await g("swipe", 0, -200);
await settle();
gs.second = await g("shown", 0);
await settle(25000); // a swipe restarts the 30 s picture time
gs.at26s = await g("shown", 0);
await settle(6000);
gs.at32s = await g("shown", 0);
await g("tap", 0);
await settle(500);
gs.open = await g("slideshow");
gs.cardAtOpen = await g("shown", 0);
await g("swipeSlideshow", -200, 0);
await settle();
gs.openAfterLeft = await g("slideshow");
gs.cardAfterLeft = await g("shown", 0);
await g("swipeSlideshow", 0, 200);
await settle();
gs.afterSwipeDown = await g("slideshow");
await g("tap", 0);
await settle(500);
gs.reopened = !!(await g("slideshow"));
await gesturePage.keyboard.press("Escape");
await settle();
gs.afterEscape = await g("slideshow");
await g("swipe", 0, 9); // a tap that drifts past the drag threshold
await settle(500);
gs.driftOpen = !!(await g("slideshow"));
gs.beforeDrift = await g("shown", 0);
await settle(31000);
gs.afterDrift = await g("shown", 0);
await g("tap", 0);
await settle(500);
await settle(3 * 3600 * 1000 - 5000);
gs.before3h = !!(await g("slideshow"));
await settle(6000);
gs.after3h = !!(await g("slideshow"));

// the weather, up next, camera, vacuum and media cards against a stub Home Assistant: what they show,
// the service calls they make (recorded, nothing real), and the camera / vacuum overlays.
const cardsPage = await browser.newPage({ viewport: { width: 1024, height: 768 } });
cardsPage.on("pageerror", (e) => errors.push(e.message));
const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==", "base64");
let snapshots = 0;
await cardsPage.route("https://homeview.test/", (r) => r.fulfill({ contentType: "text/html", body: "<!doctype html><body style='margin:0;background:#888'></body>" }));
await cardsPage.route(/\/api\/(camera_proxy|camera_proxy_stream|image_proxy|media_player_proxy)\//, (r) => {
  const url = r.request().url();
  if (url.includes("camera.broken")) return r.fulfill({ status: 500, body: "" });
  if (url.includes("/api/camera_proxy/")) snapshots++;
  return r.fulfill({ contentType: "image/png", body: png });
});
await cardsPage.goto("https://homeview.test/");
await cardsPage.addScriptTag({
  content: `customElements.define("ha-card", class extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: "open" }).innerHTML = "<style>:host{display:block}</style><slot></slot>"; }
  });`,
});
await cardsPage.addScriptTag({ type: "module", content: bundle });
result.cards = await cardsPage.evaluate(async () => {
  const tags = ["weather", "calendar", "camera", "vacuum", "tile", "media", "clock"].map((n) => `homeview-${n}-card`);
  await Promise.all(tags.map((n) => customElements.whenDefined(n)));
  const st = (entity_id, state, attributes = {}) => ({ entity_id, state, attributes, last_changed: "", last_updated: "", context: { id: "" } });
  const day = (d, h, m = 0) => { const x = new Date(); x.setDate(x.getDate() + d); x.setHours(h, m, 0, 0); return x.toISOString(); };
  const date = (d) => { const x = new Date(); x.setDate(x.getDate() + d); return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`; };
  const calls = [];
  const ws = [];
  const forecast = { forecast: [{ datetime: date(0), condition: "rainy", temperature: 71.4, templow: 53.6, precipitation_probability: 40 }] };
  const hass = {
    language: "en-US",
    locale: { language: "en-US", time_format: "24" },
    states: {
      "weather.home": st("weather.home", "partlycloudy", { temperature: 64.2, supported_features: 1, friendly_name: "Home" }),
      "calendar.family": st("calendar.family", "off"),
      "calendar.school": st("calendar.school", "off"),
      "calendar.busy": st("calendar.busy", "off"),
      "camera.door": st("camera.door", "idle", { entity_picture: "/api/camera_proxy/camera.door?token=t", access_token: "t", friendly_name: "Door" }),
      "camera.gone": st("camera.gone", "unavailable", { friendly_name: "Gone" }),
      "camera.broken": st("camera.broken", "idle", { entity_picture: "/api/camera_proxy/camera.broken?token=t", access_token: "t", friendly_name: "Broken" }),
      "vacuum.robot": st("vacuum.robot", "docked", { friendly_name: "Robot", fan_speed: "balanced", fan_speed_list: ["quiet", "balanced", "max", "custom"], supported_features: 4 | 16 | 32 | 256 | 512 | 8192 }),
      "sensor.robot_battery": st("sensor.robot_battery", "80", { device_class: "battery", unit_of_measurement: "%" }),
      "image.robot_map": st("image.robot_map", "2026-01-01T00:00:00", { entity_picture: "/api/image_proxy/image.robot_map?token=m" }),
      "select.robot_mop": st("select.robot_mop", "standard", { options: ["standard", "deep", "custom"], friendly_name: "Robot Mop mode" }),
      "media_player.room": st("media_player.room", "playing", { media_title: "Song", media_artist: "Band", friendly_name: "Room" }),
      "media_player.echo": st("media_player.echo", "playing", { entity_picture: "/api/media_player_proxy/media_player.echo?token=t", media_title: "Golden Hour", media_artist: "Artist", media_album_name: "Album", media_duration: 209, media_position: 23, media_position_updated_at: new Date().toISOString(), volume_level: 0.42, shuffle: false, repeat: "off", supported_features: 1 | 2 | 4 | 16 | 32 | 16384 | 32768 | 262144, friendly_name: "Echo Show" }),
      "media_player.quiet": st("media_player.quiet", "idle", { friendly_name: "Quiet", supported_features: 1 | 16384 }),
    },
    entities: {
      "vacuum.robot": { device_id: "d1", platform: "roborock" },
      "sensor.robot_battery": { device_id: "d1", platform: "roborock" },
      "image.robot_map": { device_id: "d1", platform: "roborock" },
      "select.robot_mop": { device_id: "d1", platform: "roborock" },
    },
    devices: {}, areas: {},
    config: { unit_system: { temperature: "°F" } },
    callService: async (domain, service, data, target) => { calls.push([`${domain}.${service}`, data, target?.entity_id]); },
    callWS: async (m) => {
      ws.push(m.type === "call_service" ? `${m.domain}.${m.service}` : m.type);
      if (m.type === "call_service" && m.service === "get_events")
        return { response: {
          "calendar.family": { events: [{ summary: "Later", start: day(3, 9), end: day(3, 10) }, { summary: "Over", start: day(0, 0, 1), end: day(0, 0, 2) }, { summary: "Holiday", start: date(1), end: date(2) }] },
          "calendar.school": { events: [{ summary: "Now", start: day(-1, 23), end: day(1, 1) }, { summary: "Far", start: day(5, 9), end: day(5, 10) }] },
          // a free/busy-only shared calendar: no title
          "calendar.busy": { events: [{ summary: "", start: day(2, 9), end: day(2, 10) }] },
        } };
      if (m.type === "vacuum/get_segments") return { segments: [{ id: "0_16", name: "Kitchen" }, { id: "0_17", name: "Office" }] };
      return {};
    },
    connection: {
      subscribeMessage: async (cb, m) => { ws.push(m.type); if (m.type === "weather/subscribe_forecast") setTimeout(() => cb(forecast), 10); return async () => ws.push("unsub:" + m.type); },
    },
    hassUrl: (p) => p,
  };
  const make = async (tag, config, w, h) => {
    const cell = document.body.appendChild(document.createElement("div"));
    cell.style.cssText = `width:${w}px;height:${h}px;margin:8px;display:inline-block;vertical-align:top`;
    const el = document.createElement(tag);
    el.layout = "grid"; // Home Assistant sets this on every card
    el.setConfig(config);
    el.hass = hass;
    cell.appendChild(el);
    await el.updateComplete;
    return el;
  };
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const text = (el) => el.shadowRoot.querySelector("ha-card").textContent.replace(/\s+/g, " ").trim();
  const out = {};
  const weather = await make("homeview-weather-card", { entity: "weather.home", grid_options: { rows: 6 } }, 476, 376);
  const calendar = await make("homeview-calendar-card", { entities: ["calendar.family", { entity: "calendar.school", color: "#123456" }] }, 900, 120);
  const narrow = await make("homeview-calendar-card", { entities: ["calendar.family"] }, 300, 120);
  const camera = await make("homeview-camera-card", { entity: "camera.door", refresh: 2, grid_options: { rows: 3 } }, 234, 184);
  const offline = await make("homeview-camera-card", { entity: "camera.gone", grid_options: { rows: 3 } }, 234, 184);
  const cropped = await make("homeview-camera-card", { entity: "camera.door", crop_top: 50, grid_options: { rows: 3 } }, 234, 184);
  const contained = await make("homeview-camera-card", { entity: "camera.door", fit: "contain", crop_top: 10, grid_options: { rows: 3 } }, 234, 184);
  window.brokenCamera = await make("homeview-camera-card", { entity: "camera.broken", refresh: 2, grid_options: { rows: 3 } }, 234, 184);
  // up next: removed before its first answer came back, then put back (a view change): it reads the calendars again
  let held = 0;
  const slowHass = { ...hass, callWS: (m) => (m.service === "get_events" && !held++ ? new Promise(() => {}) : hass.callWS(m)) };
  const moved = document.body.appendChild(document.createElement("div"));
  moved.style.cssText = "width:900px;height:120px;margin:8px;display:inline-block";
  const movedCal = document.createElement("homeview-calendar-card");
  movedCal.setConfig({ entities: ["calendar.family"] });
  movedCal.hass = slowHass;
  moved.appendChild(movedCal);
  await movedCal.updateComplete;
  movedCal.remove();
  moved.appendChild(movedCal);
  const vacuum = await make("homeview-vacuum-card", { entity: "vacuum.robot", modes: ["select.robot_mop"], grid_options: { rows: 3 } }, 234, 184);
  const media = await make("homeview-tile-card", { entity: "media_player.room", grid_options: { rows: 3 } }, 234, 184);
  const camPage = await make("homeview-camera-card", { entities: [{ entity: "camera.door", name: "Front" }, "camera.gone", { entity: "camera.door", name: "Back" }], crop_top: 7, home_path: "/echo-show/home" }, 960, 480);
  // the page anywhere but a panel view or a fixed-rows cell (a Sections cell with rows auto): an auto-height cell
  const autoCell = document.body.appendChild(document.createElement("div"));
  autoCell.style.cssText = "width:600px;margin:8px";
  const autoPage = document.createElement("homeview-camera-card");
  autoPage.setConfig({ entities: ["camera.door"] });
  autoPage.hass = hass;
  autoCell.appendChild(autoPage);
  const np = await make("homeview-media-card", { entity: "media_player.echo", navigation_path: "/echo-show/home" }, 960, 480);
  const npIdle = await make("homeview-media-card", { entity: "media_player.quiet" }, 960, 480);
  const three = ["calendar.family", "calendar.school", "calendar.busy"];
  const dayCal = await make("homeview-calendar-card", { layout: "day", entities: three }, 448, 208);
  const listCal = await make("homeview-calendar-card", { layout: "list", entities: three }, 960, 480);
  const page = await make("homeview-weather-card", { entity: "weather.home", forecast_days: 4 }, 960, 480);
  const digital = await make("homeview-clock-card", { face: "digital" }, 448, 208);
  const goes = await make("homeview-tile-card", { entity: "media_player.room", tap_action: "navigate", navigation_path: "/echo-show/music", grid_options: { rows: 3 } }, 234, 184);
  await wait(600);
  const ar = autoPage.getBoundingClientRect();
  out.autoPageSize = [ar.width, ar.height];
  const all = (el, sel) => [...el.shadowRoot.querySelectorAll(sel)].map((e) => e.textContent.replace(/\s+/g, " ").trim());
  const glassy = (el) => !!el.shadowRoot.querySelector("canvas.hv-bake, .hv-glass");
  out.day = { head: all(dayCal, ".dtitle")[0], titles: all(dayCal, ".summary"), when: all(dayCal, ".when") };
  out.list = { titles: all(listCal, ".ltitle"), rel: all(listCal, ".rel"), today: !!listCal.shadowRoot.querySelector(".lbadge.today.hv-frost"), glassy: glassy(listCal) };
  out.page = { text: text(page), days: all(page, ".dn"), glassy: glassy(page), frost: !!page.shadowRoot.querySelector(".days.hv-frost") };
  out.digital = { time: all(digital, ".time")[0], date: all(digital, ".date")[0], glassy: glassy(digital) };
  let navigated = 0;
  window.addEventListener("location-changed", () => navigated++);
  goes.shadowRoot.querySelector("button").click();
  out.navigate = { path: location.pathname, events: navigated };
  // music page: two cards on Home share the option and open the music page once when the player starts;
  // on the music page, a paused player goes back home after return_after
  history.replaceState(null, "", "/echo-show/home");
  const mp = { entity: "media_player.voice", path: "/echo-show/music", home_path: "/echo-show/home", return_after: 1 };
  const withPlayer = (state) => ({ ...hass, states: { ...hass.states, "media_player.voice": st("media_player.voice", state, { friendly_name: "Voice" }) } });
  const homeCards = [await make("homeview-clock-card", { face: "digital", music_page: mp }, 200, 100), await make("homeview-weather-card", { entity: "weather.home", music_page: mp }, 200, 100)];
  const setAll = async (els, h) => { for (const el of els) el.hass = h; await Promise.all(els.map((el) => el.updateComplete)); };
  await setAll(homeCards, withPlayer("idle"));
  const before = navigated;
  await setAll(homeCards, withPlayer("playing"));
  out.musicOpen = { path: location.pathname, events: navigated - before };
  homeCards.forEach((el) => el.remove());
  const musicCard = await make("homeview-media-card", { entity: "media_player.voice", music_page: mp }, 480, 240);
  await setAll([musicCard], withPlayer("playing"));
  await setAll([musicCard], withPlayer("paused"));
  await wait(400);
  out.musicStays = location.pathname;
  await wait(1000);
  out.musicBack = location.pathname;
  musicCard.remove();
  // a cached view comes back: its card reconnects holding the idle player it saw when the view was left,
  // then gets the fresh hass where the player is already playing; that is not a start
  history.replaceState(null, "", "/echo-show/cameras");
  const cached = await make("homeview-clock-card", { face: "digital", music_page: mp }, 200, 100);
  await setAll([cached], withPlayer("idle"));
  const cachedCell = cached.parentElement;
  cached.remove();
  cachedCell.appendChild(cached);
  const beforeCached = navigated;
  await setAll([cached], withPlayer("playing"));
  out.musicCached = { path: location.pathname, events: navigated - beforeCached };
  cached.remove();
  out.weather = text(weather);
  out.calendar = [...calendar.shadowRoot.querySelectorAll(".summary")].map((e) => e.textContent);
  out.calendarBadges = [...calendar.shadowRoot.querySelectorAll(".wd")].map((e) => e.textContent);
  out.calendarDot = calendar.shadowRoot.querySelector(".when i")?.style.background ?? "";
  out.narrow = narrow.shadowRoot.querySelectorAll(".event").length;
  out.cameraShown = !!camera.shadowRoot.querySelector("img")?.getAttribute("src");
  out.offline = text(offline);
  const imgStyle = (el) => { const i = el.shadowRoot.querySelector("img"); return i ? { top: i.style.top, height: i.style.height } : null; };
  out.cropDefault = imgStyle(camera);
  out.cropClamped = imgStyle(cropped);
  out.cropContain = imgStyle(contained);
  out.movedCalendar = text(movedCal);
  out.vacuum = text(vacuum);
  out.media = text(media);
  // camera page: only the camera on screen streams; swipes (pointer drags) step, a vertical drag does not; past the
  // first / last camera a swipe stays put and its touchend reaches Swipe Navigation (a capture listener on ha-app-layout)
  const pg = camPage.shadowRoot.querySelector("homeview-camera-page");
  const pq = (s) => pg.shadowRoot.querySelector(s);
  const pageNow = () => ({ name: pq(".pill-name")?.textContent, live: [...pg.shadowRoot.querySelectorAll("img.live")].map((i) => i.getAttribute("src")), mute: pq(".mute").getAttribute("aria-label"), dots: pg.shadowRoot.querySelectorAll(".dots i").length });
  const drag = async (dx, dy, ms = 700, moves = 5) => {
    const st = pq(".stage");
    const ev = (type, x, y) => st.dispatchEvent(new PointerEvent(type, { pointerId: 7, pointerType: "touch", isPrimary: true, clientX: x, clientY: y, bubbles: true, composed: true }));
    ev("pointerdown", 500, 240);
    for (let i = 1; i <= moves; i++) ev("pointermove", 500 + (dx * i) / moves, 240 + (dy * i) / moves);
    ev("pointerup", 500 + dx, 240 + dy);
    let reached = false;
    const seen = () => (reached = true);
    document.addEventListener("touchend", seen, true);
    st.dispatchEvent(new Event("touchend", { bubbles: true, composed: true }));
    document.removeEventListener("touchend", seen, true);
    await wait(ms);
    return reached;
  };
  // below the fold it streams nothing; scrolled into view, the camera on screen streams
  out.camPage = { hidden: pageNow() };
  camPage.scrollIntoView();
  await wait(300);
  out.camPage.first = pageNow();
  const pr = camPage.getBoundingClientRect();
  out.camPage.size = [pr.width, pr.height];
  out.camPage.frameTop = pg.shadowRoot.querySelectorAll(".cam .frame")[1]?.style.top; // [-1, 0, 1]: the one on screen
  out.camPage.leftReached = await drag(-300, 0);
  out.camPage.left = pageNow();
  out.camPage.offlineHint = pq(".empty")?.textContent.trim();
  await drag(0, 200);
  out.camPage.vertical = pageNow();
  const snapOf = (cam) => cam?.querySelector(".snap")?.getAttribute("src");
  const slidIn = snapOf(pg.shadowRoot.querySelector(".cam")); // the one before it, waiting on the left
  await drag(300, 0);
  out.camPage.landedSnap = [slidIn, snapOf(pg.shadowRoot.querySelector('.cam[aria-hidden="false"]'))];
  out.camPage.firstReached = await drag(300, 0);
  out.camPage.first2 = { ...pageNow(), cams: pg.shadowRoot.querySelectorAll(".cam").length };
  await drag(-300, 0);
  // a quick second flick (one move) while the last camera still slides in: it lands there and leaves the page
  await drag(-300, 0, 0);
  out.camPage.quickLastReached = await drag(-300, 0, 700, 1);
  out.camPage.quickLast = pageNow();
  out.camPage.lastReached = await drag(-300, 0);
  out.camPage.last = pageNow();
  pq(".mute").click();
  await wait(50);
  out.camPage.unmuted = pageNow();
  pq(".grid-btn").click();
  await wait(50);
  out.camPage.tiles = [...pg.shadowRoot.querySelectorAll(".tile")].map((t) => t.textContent.trim());
  out.camPage.tileTops = [...pg.shadowRoot.querySelectorAll(".tile img")].map((i) => i.style.top);
  pg.shadowRoot.querySelectorAll(".tile")[0].click();
  await wait(100);
  out.camPage.picked = pageNow();
  out.camPage.pickerClosed = !pq(".picker");
  pq(".home").click();
  out.camPage.path = location.pathname;
  // media tile: a tap plays / pauses
  media.shadowRoot.querySelector("button").click();
  // now playing: what is on, a clock that runs on, every control on its one player, the volume slider, and the close button
  {
    const q = (s) => np.shadowRoot.querySelector(s);
    const btn = (label) => [...np.shadowRoot.querySelectorAll("button")].find((b) => b.getAttribute("aria-label").startsWith(label));
    const elapsed = () => q(".times span").textContent;
    // where the bar should be: 0:23 when the state was made, plus the time the cards before it took
    const since = (Date.now() - Date.parse(hass.states["media_player.echo"].attributes.media_position_updated_at)) / 1000;
    out.np = { expect: Math.floor(23 + since), text: text(np), at: elapsed(), art: q(".art img")?.getAttribute("src") ?? "", backdrop: !!q(".bg img"), close: !!btn("Close") };
    out.np.sizes = [...np.shadowRoot.querySelectorAll("button")].map((b) => Math.min(b.offsetWidth, b.offsetHeight));
    await wait(1500);
    out.np.later = elapsed();
    for (const l of ["Previous", "Pause", "Next", "Shuffle", "Repeat"]) btn(l).click();
    const seek = q(".prog input");
    // a position report mid-drag leaves the thumb under the finger
    seek.value = "120";
    seek.dispatchEvent(new Event("input"));
    const echo = hass.states["media_player.echo"];
    np.hass = { ...hass, states: { ...hass.states, "media_player.echo": { ...echo, attributes: { ...echo.attributes, media_position_updated_at: new Date(Date.now() + 1000).toISOString() } } } };
    await np.updateComplete;
    out.np.heldDrag = q(".prog input").value;
    seek.value = "100";
    seek.dispatchEvent(new Event("change"));
    btn("Volume").click();
    await np.updateComplete;
    const vol = q(".pop input");
    out.np.volumeOpen = !!vol && !btn("Shuffle");
    if (vol) {
      // as a browser does: input while the thumb moves, then change on release
      vol.value = "60";
      vol.dispatchEvent(new Event("input"));
      vol.dispatchEvent(new Event("change"));
    }
    // a tap elsewhere closes the slider
    document.body.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, composed: true }));
    await np.updateComplete;
    out.np.volumeClosed = !q(".pop") && !!btn("Shuffle");
    let changed = false;
    window.addEventListener("location-changed", () => (changed = true), { once: true });
    btn("Close").click();
    out.np.navigated = changed && location.pathname === "/echo-show/home";
    const iq = (s) => npIdle.shadowRoot.querySelector(s);
    out.np.idle = { text: text(npIdle), art: !!iq(".art .none"), prog: !!iq(".prog"), close: !!iq(".top"), next: iq("button[aria-label=Next]")?.disabled };
  }
  // camera: a tap opens the live view full screen (no Home Assistant player here: the MJPEG stream); Escape closes it
  camera.shadowRoot.querySelector("ha-card").click();
  await wait(400);
  const live = document.querySelector("homeview-camera-live");
  const r = live?.getBoundingClientRect();
  out.live = live ? { covers: r.left === 0 && r.top === 0 && r.width === innerWidth && r.height === innerHeight, stream: live.shadowRoot.querySelector("img")?.getAttribute("src") ?? "" } : null;
  document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
  window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  await wait(500);
  out.liveClosed = !document.querySelector("homeview-camera-live");
  // vacuum: the panel lists rooms, suction and modes; picking a room makes Start clean just that room
  vacuum.shadowRoot.querySelector("button").click();
  await wait(400);
  const panel = document.querySelector("homeview-vacuum-panel");
  const q = (s) => [...(panel?.shadowRoot.querySelectorAll(s) ?? [])];
  out.panel = panel ? { chips: q(".chip").map((b) => b.textContent.trim()), acts: q(".act").map((b) => b.textContent.trim()), map: !!q(".map img").length } : null;
  q(".chip").find((b) => b.textContent.trim() === "Kitchen")?.click();
  await panel?.updateComplete;
  out.startLabel = q(".act.primary")[0]?.textContent.trim();
  q(".act.primary")[0]?.click();
  q(".chip").find((b) => b.textContent.trim() === "Max")?.click();
  q(".chip").find((b) => b.textContent.trim() === "Deep")?.click();
  // a tap outside the sheet closes the panel
  const scrim = panel?.shadowRoot.querySelector(".scrim");
  scrim?.dispatchEvent(new MouseEvent("click", { bubbles: true, clientX: 5, clientY: 5 }));
  await wait(500);
  out.panelClosed = !document.querySelector("homeview-vacuum-panel");
  // removing the card ends its forecast stream
  weather.remove();
  await wait(50);
  out.calls = calls;
  out.ws = ws;
  return out;
});
await cardsPage.waitForTimeout(2500);
result.cards.snapshotsAfter = snapshots;
result.cards.broken = await cardsPage.evaluate(() => ({ text: brokenCamera.shadowRoot.querySelector("ha-card").textContent.replace(/\s+/g, " ").trim(), img: !!brokenCamera.shadowRoot.querySelector("img") }));
// voice overlay: cards carrying the same voice_overlay share one overlay that follows the satellite on any page
const voicePage = await browser.newPage({ viewport: { width: 960, height: 480 } });
voicePage.on("pageerror", (e) => errors.push(e.message));
await voicePage.route("https://homeview.test/", (r) => r.fulfill({ contentType: "text/html", body: "<!doctype html><body style='margin:0;background:#888'></body>" }));
await voicePage.goto("https://homeview.test/");
await voicePage.addScriptTag({
  content: `customElements.define("ha-card", class extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: "open" }).innerHTML = "<style>:host{display:block}</style><slot></slot>"; }
  });`,
});
await voicePage.addScriptTag({ type: "module", content: bundle });
result.overlay = await voicePage.evaluate(async () => {
  await customElements.whenDefined("homeview-clock-card");
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const SAT = "assist_satellite.echo";
  const ws = [];
  const t0 = new Date().toISOString();
  // the run's debug log so far: the heard text once it is thinking, the reply once it responds
  let logged = [];
  const hassWith = (state, admin = true) => ({
    states: { [SAT]: { entity_id: SAT, state, attributes: {}, last_changed: t0 } },
    entities: {}, devices: {}, areas: {}, config: { unit_system: { temperature: "°F" }, time_zone: "UTC" }, language: "en-US",
    user: { is_admin: admin },
    callService: async () => {},
    callWS: async (m) => {
      ws.push(m.type);
      if (!admin && m.type.includes("pipeline_debug")) throw { code: "unauthorized", message: "Unauthorized" };
      if (m.type === "assist_pipeline/pipeline/list") return { pipelines: [{ id: "p1" }], preferred_pipeline: "p1" };
      if (m.type === "assist_pipeline/pipeline_debug/list") return { pipeline_runs: [{ pipeline_run_id: "old", timestamp: "2020-01-01T00:00:00+00:00" }, { pipeline_run_id: "now", timestamp: t0 }] };
      if (m.type === "assist_pipeline/pipeline_debug/get")
        return { events: m.pipeline_run_id !== "now" ? [{ type: "stt-end", data: { stt_output: { text: "stale" } } }] : logged };
      return {};
    },
    connection: { subscribeMessage: async () => () => {} },
    hassUrl: (p) => p,
  });
  const make = async (config, state, admin) => {
    const el = document.createElement("homeview-clock-card");
    el.setConfig({ type: "custom:homeview-clock-card", face: "digital", ...config });
    el.hass = hassWith(state, admin);
    const cell = document.body.appendChild(document.createElement("div"));
    cell.style.cssText = "width:200px;height:100px";
    cell.appendChild(el);
    await el.updateComplete;
    return el;
  };
  const setAll = async (els, state, admin) => { for (const el of els) el.hass = hassWith(state, admin); await Promise.all(els.map((el) => el.updateComplete)); await wait(30); };
  const overlays = () => document.querySelectorAll("homeview-voice-overlay");
  const look = () => {
    const o = overlays()[0];
    if (!o) return { count: 0 };
    const pill = o.shadowRoot.querySelector(".pill");
    const cs = getComputedStyle(o);
    return { count: overlays().length, shown: o.hasAttribute("shown"), line: o.shadowRoot.querySelector(".txt")?.textContent ?? "", live: pill?.getAttribute("aria-live"), pointer: cs.pointerEvents, z: cs.zIndex, position: cs.position };
  };
  const out = {};
  const opt = { satellite: SAT };
  const historyBefore = history.length;
  const home = [await make({ voice_overlay: opt }, "idle"), await make({ voice_overlay: opt }, "idle")];
  out.idle = look();
  await setAll(home, "listening");
  out.listening = look();
  out.history = history.length - historyBefore;
  out.under = document.elementFromPoint(480, 240)?.localName;
  await setAll(home, "processing");
  out.thinking = look();
  await setAll(home, "responding");
  out.responding = look();
  // a swipe: this view's cards leave, the next view's card arrives a moment later, mid-reply
  home.forEach((el) => el.parentElement.remove());
  await wait(200);
  const next = [await make({ voice_overlay: opt }, "responding")];
  out.swiped = look();
  await setAll(next, "idle");
  out.linger = look();
  await wait(2300);
  out.after = look();
  // a wake word with no speech: gone as soon as it is idle
  await setAll(next, "listening");
  await setAll(next, "idle");
  out.noSpeech = look();
  await setAll(next, "unavailable");
  out.unavailable = look();
  out.noTranscriptWs = ws.length;
  // the dashboard being edited
  history.replaceState(null, "", "?edit=1");
  await setAll(next, "listening");
  out.editing = look();
  history.replaceState(null, "", location.pathname);
  await setAll(next, "idle");
  next.forEach((el) => el.parentElement.remove());
  await wait(2100);
  out.forgotten = overlays().length;
  // transcript: an admin sees what was heard and the reply, from this run (not an older one)
  const tr = [await make({ voice_overlay: { satellite: SAT, transcript: true } }, "listening")];
  logged = [{ type: "stt-end", data: { stt_output: { text: "Turn off the lights" } } }];
  await setAll(tr, "processing");
  await wait(50);
  out.heard = look().line;
  logged = [...logged, { type: "intent-end", data: { intent_output: { response: { speech: { plain: { speech: "Lights off" } } } } } }];
  await setAll(tr, "responding");
  await wait(50);
  out.reply = look().line;
  await setAll(tr, "idle");
  tr.forEach((el) => el.parentElement.remove());
  await wait(2100);
  // not an admin: the status words, and no debug log reads
  ws.length = 0;
  const user = [await make({ voice_overlay: { satellite: SAT, transcript: true } }, "listening", false)];
  await setAll(user, "processing", false);
  await wait(50);
  out.userLine = look().line;
  out.userWs = [...ws];
  return out;
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
if (result.longText.status !== "Tap to talk") fail.push(`voice long text: status "${result.longText.status}", expected idle "Tap to talk"`);
for (const k of ["heard", "reply"]) {
  const t = result.longText[k];
  if (t.out || t.lines > 2) fail.push(`voice long ${k} in the 374x184 panel cell: ${t.lines} lines${t.out ? ", outside the card" : ""}, expected at most 2 inside`);
}
const { silence, tapQuiet, typed, tapEarly } = result.mic;
if (silence.status !== "Didn't catch that") fail.push(`mic silence: status "${silence.status}", expected "Didn't catch that"`);
if (silence.ends) fail.push("mic silence: sent end-of-audio, so speech-to-text would transcribe the noise");
if (!silence.log.includes("unsub1")) fail.push("mic silence: run not unsubscribed");
if (tapQuiet.ends !== 1) fail.push(`mic tap stop with quiet audio: ${tapQuiet.ends} end-of-audio frames, expected 1`);
if (!tapQuiet.audio) fail.push("mic tap stop with quiet audio: no audio sent");
const order = (l) => typed.log.indexOf(l);
if (!(order("track-stop") >= 0 && order("unsub1") > order("track-stop") && order("sub2:intent") > order("unsub1")))
  fail.push(`mic typed while listening: expected track-stop, unsub1, sub2:intent; got ${typed.log.join(", ")}`);
if (tapEarly.ends !== 1) fail.push(`mic tap stop before run-start: ${tapEarly.ends} end-of-audio frames, expected 1`);
const { secondTap } = result.mic;
if (secondTap.stale) fail.push(`mic second tap: the first tap's recorder sent ${secondTap.stale} frames into the second run, garbling it`);
if (!secondTap.fresh) fail.push("mic second tap: the second run sent no audio");
if (secondTap.contexts !== 0) fail.push(`mic second tap: ${secondTap.contexts} new AudioContext(s) on the second tap, expected the card's first one reused`);
// the microphone lifecycle: at most one live capture, released on every way out (stop, error, typed, detach, cancel)
const held = (l) => `${l.tracks} microphone track(s) and ${l.recorders} recorder(s) live`;
for (const [name, r] of Object.entries(result.mic)) {
  const listening = name === "secondTap";
  if (listening ? r.live.tracks !== 1 || r.live.recorders !== 1 : r.live.tracks || r.live.recorders) fail.push(`mic ${name}: ${held(r.live)} at the end, expected ${listening ? "exactly one of each" : "none"}`);
  if (r.afterDetach.tracks || r.afterDetach.recorders) fail.push(`mic ${name}: ${held(r.afterDetach)} after the card was removed`);
}
const { runFails, detached: micDetached, tapWhileOpening: tapOpen, typedWhileOpening: typedOpen } = result.mic;
if (!runFails.log.includes("sub1:stt") || !runFails.status) fail.push(`mic run fails to start: log ${runFails.log.join(", ")}, status "${runFails.status}"`);
if (!micDetached.log.includes("unsub1")) fail.push("mic detached while listening: run not unsubscribed");
if (micDetached.status !== "Tap to talk") fail.push(`mic detached while listening: shows "${micDetached.status}" with no run behind it, expected "Tap to talk"`);
// the microphone granted after the cancel is stopped at once ("track-stop") and never starts a run
if (tapOpen.log.join() !== "track-stop" || tapOpen.status !== "Tap to talk") fail.push(`mic tap while opening: expected only track-stop and "Tap to talk", got ${tapOpen.log.join(", ")} / "${tapOpen.status}"`);
if (typedOpen.log.join() !== "sub1:intent,track-stop") fail.push(`mic typed while opening: expected the typed run, then the late microphone stopped; got ${typedOpen.log.join(", ")}`);
const { reply } = result;
if (reply.playing !== "Responding") fail.push(`voice reply: status "${reply.playing}" while the reply plays, expected "Responding"`);
if (reply.status !== "Couldn't speak the reply" || reply.settledAfter > 9) fail.push(`voice reply: status "${reply.status}" ${reply.settledAfter} s after a playing reply stopped advancing (expected "Couldn't speak the reply" after about 6 s)`);
if (!reply.stopped) fail.push("voice reply: the stalled reply was not paused and cleared, so it could play later under the card");
if (!reply.retried) fail.push("voice reply: the retry orb did not re-send the typed request");
const { replyThenTyped: rt } = result;
if (rt.playing !== "Responding") fail.push(`voice reply then typed: status "${rt.playing}" while the second reply plays, expected "Responding"`);
if (rt.after !== "Thinking") fail.push(`voice reply then typed: the new run shows "${rt.after}" after the old reply gave up, expected "Thinking"`);
if (result.slowReply.at7s !== "Responding") fail.push(`voice slow reply: status "${result.slowReply.at7s}" 7 s into a reply whose first audio takes 8 s, expected "Responding"`);
console.log(JSON.stringify(result.rendered));
console.log(JSON.stringify(result.mic));
const { detached } = result;
if (detached.playing !== "Responding") fail.push(`voice reply detached: status "${detached.playing}" before detaching, expected "Responding"`);
if (detached.after !== "Tap to talk") fail.push(`voice reply detached: reattached card shows "${detached.after}", expected "Tap to talk"`);
if (!detached.stopped) fail.push("voice reply detached: the reply was not stopped and cleared");
console.log(JSON.stringify(result.reply), JSON.stringify(result.replyThenTyped), JSON.stringify(result.slowReply), JSON.stringify(detached));
const { lostAnswers: la } = result;
if (la.at5s.picture) fail.push("photo lost answers: a picture showed before any folder was listed");
if (!/did not answer/.test(la.at35s.msg)) fail.push(`photo lost answers: 35 s after a folder list that never answered the frame says "${la.at35s.msg}", expected that Home Assistant did not answer`);
if (!la.at76s.picture || la.at76s.msg) fail.push(`photo lost answers: the frame is still empty (${JSON.stringify(la.at76s)}) after a lost folder list and a lost picture, expected a retry to show a picture`);
console.log(JSON.stringify(la));
// (gs: result.gestures, set above)
if (!gs.first) fail.push("photo gestures: no picture shown");
if (!gs.afterLeft || gs.afterLeft === gs.first) fail.push(`photo gestures: a swipe left kept "${gs.first}", expected the next picture`);
if (gs.afterRight !== gs.first) fail.push(`photo gestures: a swipe right shows "${gs.afterRight}", expected the previous picture "${gs.first}" (shuffled)`);
if (gs.beforeFirst !== gs.first) fail.push(`photo gestures: a swipe right on the first picture changed it to "${gs.beforeFirst}"`);
if (gs.afterVertical !== gs.first) fail.push(`photo gestures: a vertical drag changed the picture to "${gs.afterVertical}"`);
if (gs.second !== gs.afterLeft) fail.push(`photo gestures: next after going back shows "${gs.second}", expected "${gs.afterLeft}" again from the history`);
if (gs.at26s !== gs.second) fail.push("photo gestures: the timed change came less than 30 s after a swipe");
if (gs.at32s === gs.second) fail.push("photo gestures: no timed change 30 s after a swipe");
if (!gs.open?.covers) fail.push(`photo slideshow: a tap did not open a full-screen slideshow (${JSON.stringify(gs.open)})`);
if (gs.open && gs.open.shown !== gs.cardAtOpen) fail.push(`photo slideshow: opened on "${gs.open.shown}", expected the card's picture "${gs.cardAtOpen}"`);
if (!gs.openAfterLeft || gs.openAfterLeft.shown === gs.open?.shown || gs.openAfterLeft.shown !== gs.cardAfterLeft) fail.push(`photo slideshow: a swipe left did not step the slideshow and the card together (${JSON.stringify([gs.openAfterLeft, gs.cardAfterLeft])})`);
if (gs.afterSwipeDown) fail.push("photo slideshow: still open after a swipe down");
if (!gs.reopened || gs.afterEscape) fail.push("photo slideshow: Escape did not close it");
if (gs.noSwipe.swiper || !gs.noSwipe.before || gs.noSwipe.afterLeft !== gs.noSwipe.before) fail.push(`photo swipe: false: expected no swiper class and a swipe that keeps the picture, got ${JSON.stringify(gs.noSwipe)}`);
if (!gs.noSwipe.open) fail.push("photo swipe: false: a tap did not open the slideshow");
if (gs.driftOpen) fail.push("photo slideshow: a 9 px drag opened the slideshow as a tap");
if (gs.afterDrift === gs.beforeDrift) fail.push("photo gestures: no timed change after a 9 px drag; the slideshow stopped");
if (!gs.before3h || gs.after3h) fail.push(`photo slideshow: expected it open until 3 h and closed after (open before: ${gs.before3h}, after: ${gs.after3h})`);
console.log(JSON.stringify(gs));

const c = result.cards;
if (!/64°/.test(c.weather) || !/H: 71°/.test(c.weather) || !/L: 54°/.test(c.weather) || !/40%/.test(c.weather) || !/Partly Cloudy/.test(c.weather))
  fail.push(`weather: shows "${c.weather}", expected 64°, Partly Cloudy, H: 71°, L: 54° and 40%`);
if (!c.ws.includes("weather/subscribe_forecast") || !c.ws.includes("unsub:weather/subscribe_forecast")) fail.push(`weather: forecast not subscribed, or not dropped when the card was removed (${c.ws.join(", ")})`);
if (c.calendar.join() !== "Now,Holiday,Later") fail.push(`up next: shows ${c.calendar.join(", ")}, expected Now, Holiday, Later (ended events dropped, soonest first, at most 3)`);
if (c.calendarBadges[0] !== "TODAY") fail.push(`up next: an event under way since yesterday is badged "${c.calendarBadges[0]}", expected TODAY`);
if (!/18, 52, 86|#123456/i.test(c.calendarDot)) fail.push(`up next: the school event's dot is "${c.calendarDot}", expected its calendar's colour`);
if (c.narrow !== 1) fail.push(`up next: a 300px strip shows ${c.narrow} events, expected 1`);
if (!c.cameraShown) fail.push("camera: no snapshot shown");
if (c.snapshotsAfter < 2) fail.push(`camera: ${c.snapshotsAfter} snapshot(s) in about 3 s with a 2 s refresh, expected a refresh`);
if (!/Offline/.test(c.offline)) fail.push(`camera: an unavailable camera shows "${c.offline}", expected Offline`);
if (c.cropDefault?.top !== "0%" || c.cropDefault?.height !== "100%") fail.push(`camera: the top is cropped by default (${JSON.stringify(c.cropDefault)})`);
if (c.cropClamped?.top !== "-20%" || c.cropClamped?.height !== "120%") fail.push(`camera: crop_top 50 gives ${JSON.stringify(c.cropClamped)}, expected clamped to 20%`);
if (c.cropContain?.top !== "0%" || c.cropContain?.height !== "100%") fail.push(`camera: crop_top applied with fit contain (${JSON.stringify(c.cropContain)})`);
if (c.broken.img || !/Not responding/.test(c.broken.text)) fail.push(`camera: a camera whose snapshots keep failing shows ${JSON.stringify(c.broken)}, expected Not responding and no frame`);
if (!/Later/.test(c.movedCalendar)) fail.push(`up next: removed before its answer and put back, it shows "${c.movedCalendar}", expected the events read again`);
if (!c.live?.covers || !c.live.stream.includes("/api/camera_proxy_stream/camera.door")) fail.push(`camera: a tap did not open the full-screen live view (${JSON.stringify(c.live)})`);
if (!c.liveClosed) fail.push("camera: Escape did not close the live view");
if (!/Robot/.test(c.vacuum) || !/Docked · 80%/.test(c.vacuum)) fail.push(`vacuum: tile shows "${c.vacuum}", expected Robot / Docked · 80%`);
if (!c.panel || !c.panel.map || !["Entire home", "Kitchen", "Office", "Quiet", "Balanced", "Max", "Standard", "Deep"].every((x) => c.panel.chips.includes(x)) || c.panel.chips.includes("Custom"))
  fail.push(`vacuum: panel ${JSON.stringify(c.panel)}, expected the map, rooms, suction and mop choices (no Custom)`);
if (c.panel && (c.panel.acts.includes("Pause") || !c.panel.acts.includes("Locate"))) fail.push(`vacuum: a docked robot offers ${c.panel.acts.join(", ")}, expected Start and Locate, no Pause`);
if (c.startLabel !== "Clean 1 room") fail.push(`vacuum: Start reads "${c.startLabel}" with one room picked, expected "Clean 1 room"`);
const want = [
  ["media_player.media_play_pause", "media_player.room"],
  ["media_player.media_previous_track", "media_player.echo"],
  ["media_player.media_play_pause", "media_player.echo"],
  ["media_player.media_next_track", "media_player.echo"],
  ["media_player.shuffle_set", "media_player.echo", { shuffle: true }],
  ["media_player.repeat_set", "media_player.echo", { repeat: "all" }],
  ["media_player.media_seek", "media_player.echo", { seek_position: 100 }],
  ["media_player.volume_set", "media_player.echo", { volume_level: 0.6 }],
  // the release resends the last level, which the 250 ms throttle may have skipped
  ["media_player.volume_set", "media_player.echo", { volume_level: 0.6 }],
  ["vacuum.send_command", "vacuum.robot", { command: "app_segment_clean", params: [{ segments: [16], repeat: 1 }] }],
  ["vacuum.set_fan_speed", "vacuum.robot", { fan_speed: "max" }],
  ["select.select_option", "select.robot_mop", { option: "deep" }],
];
for (const [svc, entity, data] of want)
  if (!c.calls.some(([s, d, e]) => s === svc && e === entity && (!data || JSON.stringify(d) === JSON.stringify(data)))) fail.push(`service call missing: ${svc} on ${entity} ${data ? JSON.stringify(data) : ""} (made: ${JSON.stringify(c.calls)})`);
if (c.calls.length !== want.length) fail.push(`unexpected service calls: ${JSON.stringify(c.calls)}`);
if (!c.panelClosed) fail.push("vacuum: a tap outside the panel did not close it");
if (!/Song/.test(c.media) || !/Band/.test(c.media)) fail.push(`media tile: shows "${c.media}", expected the title and artist`);
const cp = c.camPage;
const doorLive = (s) => s.live.length === 1 && s.live[0].includes("/api/camera_proxy_stream/camera.door");
if (c.autoPageSize.join() !== "600,300") fail.push(`camera page: in an auto-height 600px cell it is ${c.autoPageSize.join("x")}, expected 600x300 (2:1), not 0 px tall`);
if (cp.size.join() !== "960,480") fail.push(`camera page: card is ${cp.size.join("x")} in a 960x480 cell, expected to fill it`);
if (cp.hidden.live.length) fail.push("camera page: streams while scrolled out of view");
if (cp.first.name !== "Front" || !doorLive(cp.first) || cp.first.mute !== "Unmute" || cp.first.dots !== 3) fail.push(`camera page: opens as ${JSON.stringify(cp.first)}, expected Front, one live stream, muted, 3 dots`);
if (cp.frameTop !== "-7%") fail.push(`camera page: crop_top 7 gives frame top ${cp.frameTop}`);
if (cp.left.name !== "Gone" || cp.left.live.length || !/Offline/.test(cp.offlineHint ?? "")) fail.push(`camera page: a swipe left shows ${JSON.stringify(cp.left)} / "${cp.offlineHint}", expected the offline camera, no stream`);
if (cp.vertical.name !== "Gone") fail.push(`camera page: a vertical drag changed the camera to ${cp.vertical.name}`);
if (cp.leftReached) fail.push("camera page: Swipe Navigation saw the end of a swipe between cameras, so it would change the view too");
if (cp.first2.name !== "Front" || cp.first2.cams !== 2) fail.push(`camera page: a swipe right on the first camera shows ${cp.first2.name} with ${cp.first2.cams} cameras in the strip, expected Front and no wrapped-in last camera`);
if (!cp.firstReached) fail.push("camera page: a swipe right on the first camera never reached Swipe Navigation, so it cannot go to the previous view");
if (cp.last.name !== "Back" || !doorLive(cp.last)) fail.push(`camera page: a swipe left on the last camera shows ${JSON.stringify(cp.last)}, expected to stay on Back with its stream`);
if (!cp.quickLastReached || cp.quickLast.name !== "Back") fail.push(`camera page: a quick second swipe left while sliding to the last camera shows ${cp.quickLast.name} and ${cp.quickLastReached ? "reached" : "never reached"} Swipe Navigation, expected Back and the next view`);
if (!cp.lastReached) fail.push("camera page: a swipe left on the last camera never reached Swipe Navigation, so it cannot go to the next view");
if (!cp.landedSnap[0] || cp.landedSnap[0] !== cp.landedSnap[1]) fail.push(`camera page: the camera that slid in showed ${cp.landedSnap[0]} but landed with ${cp.landedSnap[1]}, a new snapshot the old picture shows through until it loads`);
if (cp.unmuted.mute !== "Mute") fail.push("camera page: the speaker button did not unmute");
if (!cp.tileTops.length || cp.tileTops.some((t) => t !== "-7%")) fail.push(`camera page: picker tiles' tops are ${cp.tileTops.join(", ")}, expected the card's crop_top 7 (-7%) on each`);
if (cp.tiles.join() !== "Front,Gone,Back") fail.push(`camera page: picker shows ${cp.tiles.join(", ")}, expected Front, Gone, Back`);
if (cp.picked.name !== "Front" || !cp.pickerClosed || cp.picked.mute !== "Unmute") fail.push(`camera page: picking Front shows ${JSON.stringify(cp.picked)} (picker closed: ${cp.pickerClosed}), expected Front, muted again, picker closed`);
if (cp.path !== "/echo-show/home") fail.push(`camera page: the home button went to ${cp.path}, expected /echo-show/home`);
const np = c.np;
if (!/Golden Hour/.test(np.text) || !/Artist/.test(np.text) || !/Album/.test(np.text) || !/3:29/.test(np.text)) fail.push(`now playing: shows "${np.text}", expected the title, artist, album and length`);
const secs = (t) => t.split(":").reduce((a, b) => a * 60 + Number(b), 0);
if (Math.abs(secs(np.at) - np.expect) > 1 || secs(np.later) <= secs(np.at))
  fail.push(`now playing: progress read ${np.at} then ${np.later} 1.5 s later, expected about ${np.expect} s (0:23 plus the time since) and running on`);
if (!np.art || !np.backdrop || !np.close) fail.push(`now playing: art ${np.art}, blurred backdrop ${np.backdrop}, close button ${np.close}`);
if (np.sizes.some((s) => s < 44)) fail.push(`now playing: buttons smaller than 44px (${np.sizes.join(", ")})`);
if (!np.volumeOpen || !np.volumeClosed) fail.push(`now playing: volume slider open ${np.volumeOpen}, closed by a tap elsewhere ${np.volumeClosed}`);
if (np.heldDrag !== "120") fail.push(`now playing: a position report mid-drag moved the seek thumb to ${np.heldDrag}, expected it held at 120`);
if (!np.navigated) fail.push("now playing: the close button did not navigate to its navigation_path");
if (!/Not playing/.test(np.idle.text) || !/Quiet/.test(np.idle.text) || !np.idle.art || np.idle.prog || np.idle.close || np.idle.next !== true)
  fail.push(`now playing: an idle player shows ${JSON.stringify(np.idle)}, expected Not playing, its name, an empty art frame, no progress, no close button and Next disabled`);
if (c.day.head !== "Today" || c.day.titles.join() !== "Now,Holiday,Busy" || !/^Tomorrow · All day$/.test(c.day.when[1] ?? ""))
  fail.push(`calendar day: ${JSON.stringify(c.day)}, expected Today with Now, then Holiday (Tomorrow · All day) and the untitled event as Busy`);
if (c.list.titles.join() !== "Now,Holiday,Busy,Later" || c.list.rel.join() !== "today,tomorrow,in 2 days,in 3 days" || !c.list.today || c.list.glassy)
  fail.push(`calendar list: ${JSON.stringify(c.list)}, expected 4 rows today / tomorrow / in 2 / in 3 days, today's badge on glass and no glass card`);
if (!/Partly Cloudy/.test(c.page.text) || !/64°/.test(c.page.text) || !/71° \/ 54° · 40% rain/.test(c.page.text) || c.page.days.join() !== "Today" || c.page.glassy || !c.page.frost)
  fail.push(`weather page: ${JSON.stringify(c.page)}, expected the condition, 64°, "71° / 54° · 40% rain", a Today column on a glass row and no glass card`);
if (!/^\d{2}:\d{2}$/.test(c.digital.time ?? "") || !c.digital.date || c.digital.glassy) fail.push(`digital clock: ${JSON.stringify(c.digital)}, expected a 24-hour time from the profile, the date and no glass`);
if (c.navigate.path !== "/echo-show/music" || c.navigate.events !== 1) fail.push(`tile navigate: ${JSON.stringify(c.navigate)}, expected /echo-show/music and one location-changed`);
if (c.musicOpen.path !== "/echo-show/music" || c.musicOpen.events !== 1) fail.push(`music page: the player starting gave ${JSON.stringify(c.musicOpen)}, expected /echo-show/music and one location-changed from two cards`);
if (c.musicStays !== "/echo-show/music" || c.musicBack !== "/echo-show/home") fail.push(`music page: paused on the music page it was at ${c.musicStays} after 0.4 s and ${c.musicBack} after 1.4 s, expected to stay, then go home after return_after 1 s`);
if (c.musicCached.path !== "/echo-show/cameras" || c.musicCached.events !== 0) fail.push(`music page: a reconnected cached card gave ${JSON.stringify(c.musicCached)}, expected to stay on /echo-show/cameras with no location-changed`);
const ov = result.overlay;
const shownAs = (o, line) => o.count === 1 && o.shown && o.line === line;
if (ov.idle.count && ov.idle.shown) fail.push(`voice overlay: shown while the satellite is idle (${JSON.stringify(ov.idle)})`);
if (!shownAs(ov.listening, "Listening") || ov.listening.live !== "polite" || ov.listening.pointer !== "none" || ov.listening.position !== "fixed" || Number(ov.listening.z) < 2147483000)
  fail.push(`voice overlay: on listening ${JSON.stringify(ov.listening)}, expected one fixed, untouchable overlay above HomeView's pages saying Listening in a polite live region`);
if (ov.history !== 0) fail.push(`voice overlay: added ${ov.history} history entries, expected none`);
if (ov.under === "homeview-voice-overlay") fail.push("voice overlay: takes touches meant for the page under it");
if (!shownAs(ov.thinking, "Thinking") || !shownAs(ov.responding, "Responding")) fail.push(`voice overlay: thinking ${JSON.stringify(ov.thinking)}, responding ${JSON.stringify(ov.responding)}`);
if (!shownAs(ov.swiped, "Responding")) fail.push(`voice overlay: a swipe mid-reply gave ${JSON.stringify(ov.swiped)}, expected the same overlay still up`);
if (!shownAs(ov.linger, "Responding") || ov.after.shown) fail.push(`voice overlay: after the reply ${JSON.stringify(ov.linger)} then ${JSON.stringify(ov.after)}, expected it to stay about 2 s, then hide`);
if (ov.noSpeech.shown || ov.unavailable.shown || ov.editing.shown) fail.push(`voice overlay: shown for a wake word with no speech (${ov.noSpeech.shown}), an unavailable satellite (${ov.unavailable.shown}) or while editing (${ov.editing.shown})`);
if (ov.noTranscriptWs !== 0) fail.push(`voice overlay: read Assist's debug log ${ov.noTranscriptWs} times without transcript: true`);
if (ov.forgotten !== 0) fail.push(`voice overlay: ${ov.forgotten} overlay(s) left after every card carrying it left the page`);
if (ov.heard !== "“Turn off the lights”" || ov.reply !== "Lights off") fail.push(`voice overlay: with transcript an admin saw "${ov.heard}" then "${ov.reply}", expected the heard text then the reply`);
if (ov.userLine !== "Thinking" || ov.userWs.some((t) => t.includes("pipeline_debug"))) fail.push(`voice overlay: a non-admin saw "${ov.userLine}" after ${ov.userWs.join(", ")}, expected Thinking and no debug log reads`);
console.log(JSON.stringify(c));
if (fail.length) {
  console.error(`WebKit smoke FAILED:\n- ${fail.join("\n- ")}`);
  process.exit(1);
}
console.log("WebKit smoke passed: 5 cards defined and rendered, weather / up next / camera / vacuum / media tile / now playing show their data and make the right calls, camera live view and vacuum panel open and close, camera page streams one camera, swipes, leaves its ends to Swipe Navigation, unmutes, picks and goes home, digital clock / day and list calendars / weather page / tile navigate right, music page opens on play and goes home after a pause, voice overlay follows the satellite across a swipe, lingers after a reply and reads the transcript only for admins, clock round, hidden photo card idle, voice error contained and round, long transcript clamped, mic flows end runs and release the microphone, stalled reply stopped and retried, slow reply waits, detached reply ends quietly, photo frame recovers from lost answers, swipes and opens / closes its full-screen slideshow");
