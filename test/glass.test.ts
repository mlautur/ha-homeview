import { test } from "node:test";
import assert from "node:assert/strict";
import { bendFromDepth, buildMap, glassParams, sdRoundedBox } from "../src/glass/map.ts";
import { bake, boxBlur, boxRadius, crop, meanLuminance, scrimAlpha, type Pixels } from "../src/glass/bake.ts";
import { backgroundRect } from "../src/glass/backdrop.ts";
import { springAt, springEasing } from "../src/util/spring.ts";
import { Resampler, audioFrame, toPcm16 } from "../src/util/audio.ts";

const px = (img: { width: number; data: Uint8ClampedArray }, x: number, y: number): number[] =>
  Array.from(img.data.slice((y * img.width + x) * 4, (y * img.width + x) * 4 + 4));

function solid(w: number, h: number, rgb: [number, number, number]): Pixels {
  const data = new Uint8ClampedArray(w * h * 4);
  for (let i = 0; i < w * h; i++) data.set([...rgb, 255], i * 4);
  return { width: w, height: h, data };
}

test("signed distance: negative inside, positive outside, zero on the edge", () => {
  assert.ok(sdRoundedBox(0, 0, 50, 50, 10) < 0);
  assert.ok(sdRoundedBox(60, 0, 50, 50, 10) > 0);
  assert.equal(Math.round(sdRoundedBox(50, 0, 50, 50, 10)), 0);
});

test("bend is zero on the flat plateau and strongest near the rim", () => {
  assert.equal(bendFromDepth(1), 0);
  assert.ok(bendFromDepth(0.05) > bendFromDepth(0.5));
});

test("map: mask outside the rounded rect, neutral plateau, bend + specular on the rim", () => {
  const m = buildMap(100, 80, 20, 12, 1);
  assert.equal(m.width, 100);
  assert.equal(px(m, 0, 0)[3], 0, "corner outside the radius is transparent");
  assert.deepEqual(px(m, 50, 40), [128, 128, 0, 255], "centre: no bend, no specular");
  const left = px(m, 2, 40);
  const right = px(m, 97, 40);
  assert.ok(left[0] > 128 && right[0] < 128, "x bend points inward on both sides");
  const top = px(m, 50, 2)[2];
  const bottom = px(m, 50, 77)[2];
  assert.ok(top > bottom, "light from the top-left: brighter specular on top");
});

test("map scales with the device pixel ratio", () => {
  const m = buildMap(50, 40, 10, 8, 2);
  assert.equal(m.width, 100);
  assert.equal(m.height, 80);
});

test("glass params follow the mockup ratios", () => {
  const p = glassParams(249, 31);
  assert.equal(p.bevel, 32);
  assert.equal(p.scale, 75);
  assert.equal(p.aberration, 5);
  assert.equal(p.frost, 1.74);
});

test("bake: plateau passes the wallpaper through (saturated), outside stays transparent", () => {
  const wall = solid(200, 200, [100, 100, 100]);
  const m = buildMap(60, 60, 12, 10, 1);
  const out = bake(wall, m, 70, 70, glassParams(120, 12), 1);
  const centre = px(out, 30, 30);
  assert.equal(centre[3], 255);
  assert.ok(Math.abs(centre[0] - 103) <= 1, "grey stays grey; brightness 1.03");
  assert.equal(px(out, 0, 0)[3], 0);
});

test("bake: refraction pulls wallpaper detail into the rim", () => {
  // left half dark, right half light: the rim on the dark side samples inward,
  // so a sharp edge just inside the card shifts.
  const wall = solid(200, 100, [20, 20, 20]);
  for (let y = 0; y < 100; y++) for (let x = 100; x < 200; x++) wall.data.set([240, 240, 240, 255], (y * 200 + x) * 4);
  const m = buildMap(100, 60, 14, 16, 1);
  const p = { ...glassParams(120, 14), specular: 0 };
  const refracted = bake(wall, m, 92, 20, p, 1); // card spans x 92..192: the edge sits in the left rim (local x 8)
  const flat = bake(wall, buildMap(100, 60, 14, 0.0001, 1), 92, 20, p, 1);
  let differs = 0;
  for (let x = 0; x < 16; x++) if (Math.abs(px(refracted, x, 30)[0] - px(flat, x, 30)[0]) > 30) differs++;
  assert.ok(differs > 0, "refracted row differs from an unrefracted one near the rim");
});

test("box blur keeps flat colour and spreads an impulse", () => {
  const flat = boxBlur(solid(20, 20, [50, 60, 70]), 3);
  assert.deepEqual(px(flat, 10, 10), [50, 60, 70, 255]);
  const img = solid(21, 21, [0, 0, 0]);
  img.data.set([255, 255, 255, 255], (10 * 21 + 10) * 4);
  boxBlur(img, 3);
  assert.ok(px(img, 10, 10)[0] < 255 && px(img, 12, 10)[0] > 0);
});

test("box radius matches the gaussian std-dev (3 passes)", () => {
  // variance of n box passes of radius r = n((2r+1)^2 - 1)/12
  for (const sigma of [1.74, 3.48, 6]) {
    const r = boxRadius(sigma);
    const sd = Math.sqrt((3 * ((2 * r + 1) ** 2 - 1)) / 12);
    assert.ok(Math.abs(sd - sigma) < 0.8, `sigma ${sigma} -> r ${r} -> sd ${sd}`);
  }
  assert.equal(boxRadius(0.3), 0);
});

test("crop clamps at the edges", () => {
  const img = solid(4, 4, [9, 9, 9]);
  const c = crop(img, -2, -2, 3, 3);
  assert.deepEqual(px(c, 0, 0), [9, 9, 9, 255]);
});

test("scrim keeps white text at >= 3:1 over bright wallpaper", () => {
  assert.equal(scrimAlpha(0.1), 0.1, "dark wallpaper: minimum tint");
  for (const bg of [0.35, 0.5, 0.7]) {
    const a = scrimAlpha(bg, 0.07, 0.1, 1);
    const eff = (1 - a) * bg + a * 0.07;
    assert.ok(1.05 / (eff + 0.05) >= 2.999, `bg ${bg}`);
  }
  assert.ok(meanLuminance(solid(4, 4, [255, 255, 255])) > 0.99);
});

test("background geometry: cover, contain and position", () => {
  assert.deepEqual(backgroundRect(200, 100, 100, 100, "cover", "50% 50%"), { x: 0, y: -50, w: 200, h: 200 });
  assert.deepEqual(backgroundRect(200, 100, 100, 100, "contain", "50% 50%"), { x: 50, y: 0, w: 100, h: 100 });
  assert.deepEqual(backgroundRect(200, 100, 100, 100, "cover", "0% 0%"), { x: 0, y: 0, w: 200, h: 200 });
  assert.deepEqual(backgroundRect(200, 100, 50, 50, "auto", "0px 0px"), { x: 0, y: 0, w: 50, h: 50 });
});

test("spring easing starts at 0, overshoots, settles at 1", () => {
  const s = springEasing();
  assert.match(s.easing, /^linear\(0,/);
  assert.match(s.easing, /,1\)$/);
  const pts = s.easing.slice(7, -1).split(",").map(Number);
  assert.ok(Math.max(...pts) > 1, "overshoot");
  assert.ok(s.duration > 300 && s.duration < 1500);
  assert.ok(Math.abs(springAt(5, 210, 17) - 1) < 1e-3);
});

test("audio: 48 kHz -> 16 kHz, PCM16 clamps, frames carry the handler id", () => {
  const r = new Resampler(48000);
  const out = r.push(new Float32Array(4800).fill(0.5));
  assert.equal(out.length, 1600);
  assert.ok(Math.abs(out[0] - 0.5) < 1e-6);
  const pcm = toPcm16(Float32Array.from([1, -1, 2, 0]));
  assert.deepEqual(Array.from(pcm), [32767, -32768, 32767, 0]);
  const f = audioFrame(7, pcm);
  assert.equal(f[0], 7);
  assert.equal(f.length, 9);
  assert.deepEqual(Array.from(audioFrame(3)), [3]);
});
