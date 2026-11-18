// WebKit (Safari / iOS app engine) smoke check for dist/homeview.js at iPhone width.
// Fails if the bundle does not load or define its cards in WebKit, if a card throws
// while rendering, if the clock face is not round in a cell taller than it is wide, if a
// photo card in a hidden section browses the media server before it is shown, or if a failed
// Assist run spills out of the voice card, stretches its visualizer or does not clear on retry.
// One-time setup: npx playwright-core install webkit. Run: npm run test:webkit
import { readFileSync } from "node:fs";
import { webkit } from "playwright-core";

const bundle = readFileSync(new URL("../dist/homeview.js", import.meta.url), "utf8");
const browser = await webkit.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.setContent("<!doctype html><body style='margin:0;background:#888'></body>");
// Home Assistant's own ha-card is a block box; stand in for it outside Home Assistant.
await page.addScriptTag({
  content: `customElements.define("ha-card", class extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: "open" }).innerHTML = "<style>:host{display:block}</style><slot></slot>"; }
  });`,
});
await page.addScriptTag({ type: "module", content: bundle });

const result = await page.evaluate(async () => {
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
  return out;
});
await browser.close();

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
console.log(JSON.stringify(result.rendered));
if (fail.length) {
  console.error(`WebKit smoke FAILED:\n- ${fail.join("\n- ")}`);
  process.exit(1);
}
console.log("WebKit smoke passed: 5 cards defined and rendered, clock round, hidden photo card idle, voice error contained and round");
