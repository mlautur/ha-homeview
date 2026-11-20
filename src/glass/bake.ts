/**
 * Baked refraction: run the liquid-glass displacement once on the CPU against
 * the (static) wallpaper pixels. Same maths as the SVG filter in live mode:
 * three displacement passes (chromatic aberration), saturate/brightness, then
 * the specular rim composited "over". Pure functions, no DOM.
 */
import type { GlassParams, MapImage } from "./map.ts";

export interface Pixels {
  width: number;
  height: number;
  data: Uint8ClampedArray<ArrayBuffer>;
}

/** Box radius whose `passes`-fold repetition matches a gaussian of std-dev `sigma`. */
export function boxRadius(sigma: number, passes = 3): number {
  return Math.round((Math.sqrt((12 * sigma * sigma) / passes + 1) - 1) / 2);
}

/**
 * Gaussian-equivalent blur (std-dev `sigma`, the same unit as SVG/CSS blur) as a
 * separable box blur run `passes` times. In place. Replaces canvas
 * `ctx.filter = blur()`, which Safari only supports from 18.
 */
export function boxBlur(img: Pixels, sigma: number, passes = 3): Pixels {
  const r = boxRadius(sigma, passes);
  if (r < 1) return img;
  const { width: W, height: H } = img;
  let src = img.data;
  let tmp = new Uint8ClampedArray(src.length);
  const run = (from: Uint8ClampedArray, to: Uint8ClampedArray, horizontal: boolean): void => {
    const len = horizontal ? W : H;
    const lines = horizontal ? H : W;
    const stride = horizontal ? 4 : W * 4;
    const span = 2 * r + 1;
    for (let line = 0; line < lines; line++) {
      const base = horizontal ? line * W * 4 : line * 4;
      for (let c = 0; c < 4; c++) {
        // edge-clamped running sum
        let acc = 0;
        for (let k = -r; k <= r; k++) acc += from[base + Math.min(len - 1, Math.max(0, k)) * stride + c];
        for (let i = 0; i < len; i++) {
          to[base + i * stride + c] = acc / span;
          const add = Math.min(len - 1, i + r + 1);
          const sub = Math.max(0, i - r);
          acc += from[base + add * stride + c] - from[base + sub * stride + c];
        }
      }
    }
  };
  for (let p = 0; p < passes; p++) {
    run(src, tmp, true);
    run(tmp, src, false);
  }
  tmp = new Uint8ClampedArray(0);
  return img;
}

/** Copy a region (clamped to the source) out of a larger pixel buffer. */
export function crop(src: Pixels, x: number, y: number, w: number, h: number): Pixels {
  const out = new Uint8ClampedArray(w * h * 4);
  for (let row = 0; row < h; row++) {
    const sy = Math.min(src.height - 1, Math.max(0, y + row));
    for (let col = 0; col < w; col++) {
      const sx = Math.min(src.width - 1, Math.max(0, x + col));
      const si = (sy * src.width + sx) * 4;
      const di = (row * w + col) * 4;
      out[di] = src.data[si];
      out[di + 1] = src.data[si + 1];
      out[di + 2] = src.data[si + 2];
      out[di + 3] = src.data[si + 3];
    }
  }
  return { width: w, height: h, data: out };
}

/**
 * Refract `wall` through `map`. (ox, oy) is the map's top-left inside `wall`, in
 * device px. `k` = device pixels per CSS px. Returns RGBA, transparent outside the shape.
 */
export function bake(wall: Pixels, map: MapImage, ox: number, oy: number, p: GlassParams, k: number): Pixels {
  const W = map.width;
  const H = map.height;
  const WW = wall.width;
  const WH = wall.height;
  const src = wall.data;
  const m = map.data;
  const out = new Uint8ClampedArray(W * H * 4);
  const sR = (p.scale + p.aberration) * k;
  const sG = p.scale * k;
  const sB = Math.max(0, p.scale - p.aberration) * k;
  const sat = 1.25;
  const bright = 1.03;
  const sample = (x: number, y: number, ch: number): number => {
    // bilinear, clamped
    x = Math.min(WW - 1.001, Math.max(0, x));
    y = Math.min(WH - 1.001, Math.max(0, y));
    const x0 = x | 0;
    const y0 = y | 0;
    const fx = x - x0;
    const fy = y - y0;
    const i = (y0 * WW + x0) * 4 + ch;
    const j = i + WW * 4;
    return (src[i] * (1 - fx) + src[i + 4] * fx) * (1 - fy) + (src[j] * (1 - fx) + src[j + 4] * fx) * fy;
  };
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4;
      if (!m[i + 3]) continue;
      const ddx = m[i] / 255 - 0.5;
      const ddy = m[i + 1] / 255 - 0.5;
      const X = ox + x + 0.5;
      const Y = oy + y + 0.5;
      let r = sample(X + sR * ddx, Y + sR * ddy, 0);
      let g = sample(X + sG * ddx, Y + sG * ddy, 1);
      let b = sample(X + sB * ddx, Y + sB * ddy, 2);
      const l = 0.2126 * r + 0.7152 * g + 0.0722 * b; // saturate()
      r = (l + (r - l) * sat) * bright;
      g = (l + (g - l) * sat) * bright;
      b = (l + (b - l) * sat) * bright;
      const a = (m[i + 2] / 255) * p.specular; // specular rim, "over"
      out[i] = r + (255 - r) * a;
      out[i + 1] = g + (255 - g) * a;
      out[i + 2] = b + (255 - b) * a;
      out[i + 3] = 255;
    }
  }
  return { width: W, height: H, data: out };
}

const lin = (v: number): number => {
  const s = v / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};

/** Mean relative luminance (0..1, linear) of the opaque pixels. */
export function meanLuminance(img: Pixels): number {
  let sum = 0;
  let n = 0;
  const d = img.data;
  // sample every 4th pixel: plenty for a mean
  for (let i = 0; i < d.length; i += 16) {
    if (d[i + 3] === 0) continue;
    sum += 0.2126 * lin(d[i]) + 0.7152 * lin(d[i + 1]) + 0.0722 * lin(d[i + 2]);
    n++;
  }
  return n ? sum / n : 0;
}

/**
 * Smoky tint alpha that keeps white text >= 3:1 (WCAG large text) over a
 * background of linear luminance `bg`. Tint colour luminance `tintL`.
 */
export function scrimAlpha(bg: number, tintL = 0.07, min = 0.1, max = 0.5): number {
  const target = 1.05 / 3 - 0.05; // 0.30
  if (bg <= target) return min;
  return Math.min(max, Math.max(min, (bg - target) / (bg - tintL)));
}

/**
 * Accent for "on" glyphs taken from the wallpaper: its dominant hue (chroma-weighted circular mean),
 * vivid and dark enough to read at >= 3:1 on the white "on" glass. Null when the wallpaper is too grey
 * to carry a hue (the champagne default), so the tile keeps its warm gold.
 */
export function wallpaperAccent(img: Pixels): [number, number, number] | null {
  let x = 0;
  let y = 0;
  let n = 0;
  const d = img.data;
  // every 16th pixel: plenty for a hue
  for (let i = 0; i < d.length; i += 64) {
    if (d[i + 3] === 0) continue;
    n++;
    const [r, g, b] = [d[i], d[i + 1], d[i + 2]];
    const max = Math.max(r, g, b);
    const c = (max - Math.min(r, g, b)) / 255;
    if (!c) continue;
    const h = max === r ? (g - b) / 255 / c : max === g ? (b - r) / 255 / c + 2 : (r - g) / 255 / c + 4;
    x += Math.cos((h * Math.PI) / 3) * c;
    y += Math.sin((h * Math.PI) / 3) * c;
  }
  if (!n || Math.hypot(x, y) / n < 0.12) return null;
  const hue = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
  const hsl = (l: number): [number, number, number] => {
    const a = 0.85 * Math.min(l, 1 - l);
    const f = (k: number): number => {
      const t = (k + hue / 30) % 12;
      return Math.round(255 * (l - a * Math.max(-1, Math.min(t - 3, 9 - t, 1))));
    };
    return [f(0), f(8), f(4)];
  };
  for (let l = 0.5; ; l -= 0.02) {
    const rgb = hsl(l);
    if (1.05 / (0.2126 * lin(rgb[0]) + 0.7152 * lin(rgb[1]) + 0.0722 * lin(rgb[2]) + 0.05) >= 3 || l < 0.2) return rgb;
  }
}
