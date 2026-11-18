/**
 * Liquid-glass displacement map, ported 1:1 from the approved mockup
 * (itself after the aceternity ui/liquid-glass technique).
 *
 * Channels: R = x bend, G = y bend (128 = none), B = rim specular, A = shape mask.
 * Pure functions, no DOM: unit-tested in test/map.test.ts.
 */

export interface MapImage {
  width: number;
  height: number;
  data: Uint8ClampedArray<ArrayBuffer>;
}

/** Signed distance to a rounded box centred at the origin. < 0 inside. */
export function sdRoundedBox(px: number, py: number, hw: number, hh: number, r: number): number {
  const qx = Math.abs(px) - hw + r;
  const qy = Math.abs(py) - hh + r;
  return Math.min(Math.max(qx, qy), 0) + Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) - r;
}

/** Squircle-dome surface slope -> refracted ray bend (n = 1.5). x: 0 at the rim, 1 at the plateau. */
export function bendFromDepth(x: number): number {
  const u = 1 - Math.min(1, Math.max(0, x));
  const denom = (1 - u ** 4) ** 0.75;
  if (denom < 1e-6) return 0;
  const ti = Math.atan(Math.min(u ** 3 / denom, 8));
  const st = Math.sin(ti) / 1.5;
  return st >= 1 ? Math.sin(ti) : Math.sin(ti - Math.asin(st));
}

/**
 * Build the map for a w x h (CSS px) rounded rect at device scale k.
 * radius and bevel are CSS px.
 */
export function buildMap(w: number, h: number, radius: number, bevelCss: number, k: number): MapImage {
  const W = Math.max(1, Math.round(w * k));
  const H = Math.max(1, Math.round(h * k));
  const hw = W / 2;
  const hh = H / 2;
  const r = Math.min(radius * k, hw, hh);
  const bevel = Math.max(1, bevelCss * k);
  const n = Math.ceil(bevel);
  const phi = new Float32Array(n + 1);
  for (let d = 1; d <= n; d++) phi[d] = phi[d - 1] + bendFromDepth(d / n);
  const samplePhi = (depth: number): number => {
    if (depth <= 0) return 0;
    if (depth >= n) return phi[n];
    const i = Math.floor(depth);
    const f = depth - i;
    return phi[i] * (1 - f) + phi[i + 1] * f;
  };

  const field = new Float32Array(W * H);
  const sd = new Float32Array(W * H);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const d = sdRoundedBox(x - hw + 0.5, y - hh + 0.5, hw, hh, r);
      sd[y * W + x] = d;
      field[y * W + x] = d > 0 ? 0 : samplePhi(Math.min(bevel, -d));
    }
  }

  const gain = 1.35;
  const lx = -0.54; // light from the top-left
  const ly = -0.84;
  const data = new Uint8ClampedArray(W * H * 4);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const k2 = y * W + x;
      const i = k2 << 2;
      const d = sd[k2];
      if (d > 0) {
        data[i] = data[i + 1] = data[i + 2] = 128;
        data[i + 3] = 0;
        continue;
      }
      if (d < -bevel - 2) {
        // flat plateau: no bend, no specular
        data[i] = data[i + 1] = 128;
        data[i + 2] = 0;
        data[i + 3] = 255;
        continue;
      }
      const x0 = Math.max(0, x - 1);
      const x1 = Math.min(W - 1, x + 1);
      const y0 = Math.max(0, y - 1);
      const y1 = Math.min(H - 1, y + 1);
      const dx = Math.max(-1, Math.min(1, ((field[y * W + x1] - field[y * W + x0]) / (x1 - x0 || 1)) * gain));
      const dy = Math.max(-1, Math.min(1, ((field[y1 * W + x] - field[y0 * W + x]) / (y1 - y0 || 1)) * gain));
      let spec = 0;
      if (d >= -bevel) {
        const gx = sd[y * W + x1] - sd[y * W + x0];
        const gy = sd[y1 * W + x] - sd[y0 * W + x];
        const len = Math.hypot(gx, gy) || 1;
        const dot = (gx / len) * lx + (gy / len) * ly;
        const rim = (1 - Math.min(1, -d / bevel)) ** 1.6;
        spec = (Math.max(0, dot) + Math.max(0, -dot) * 0.35) * rim;
      }
      data[i] = 128 + dx * 127;
      data[i + 1] = 128 + dy * 127;
      data[i + 2] = Math.round(spec * 255);
      data[i + 3] = 255;
    }
  }
  return { width: W, height: H, data };
}

export interface GlassParams {
  radius: number;
  bevel: number;
  scale: number;
  aberration: number;
  frost: number;
  specular: number;
}

/** Glass parameters scale with a reference size (the mockup used the grid cell). */
export function glassParams(ref: number, radius: number, opts: Partial<Record<"bevel" | "refraction" | "aberration" | "frost", number>> = {}): GlassParams {
  return {
    radius,
    bevel: Math.max(4, Math.round(ref * (opts.bevel ?? 0.13))),
    scale: Math.round(ref * (opts.refraction ?? 0.3)),
    aberration: Math.max(1, Math.round(ref * (opts.aberration ?? 0.02))),
    frost: +(ref * (opts.frost ?? 0.007)).toFixed(2),
    specular: 0.55,
  };
}
