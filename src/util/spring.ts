/** Damped spring sampled into a CSS `linear()` easing; overshoot bezier where linear() is unsupported. */

export interface SpringEasing {
  easing: string;
  duration: number;
}

export const SPRING_FALLBACK: SpringEasing = { easing: "cubic-bezier(.34,1.56,.64,1)", duration: 520 };

/** Position of a unit spring released from 0 towards 1, at time t (seconds). */
export function springAt(t: number, stiffness: number, damping: number, mass = 1): number {
  const w0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  if (zeta >= 1) return 1 - Math.exp(-w0 * t) * (1 + w0 * t); // critically damped / overdamped approx
  const wd = w0 * Math.sqrt(1 - zeta * zeta);
  return 1 - Math.exp(-zeta * w0 * t) * (Math.cos(wd * t) + ((zeta * w0) / wd) * Math.sin(wd * t));
}

export function springEasing(stiffness = 210, damping = 17, mass = 1, samples = 48): SpringEasing {
  const x = (t: number): number => springAt(t, stiffness, damping, mass);
  let T = 0;
  while (T < 4 && !(Math.abs(1 - x(T)) < 0.002 && Math.abs(1 - x(T + 0.05)) < 0.002)) T += 0.01;
  const pts = Array.from({ length: samples + 1 }, (_, i) => +x((i / samples) * T).toFixed(4));
  pts[samples] = 1;
  return { easing: `linear(${pts.join(",")})`, duration: Math.round(T * 1000) };
}

let cached: SpringEasing | undefined;
/** The spring for this browser: linear() when supported, else the bezier fallback. */
export function spring(): SpringEasing {
  if (cached) return cached;
  const s = springEasing();
  const ok = typeof CSS !== "undefined" && typeof CSS.supports === "function" && CSS.supports("transition-timing-function", "linear(0, 1)");
  cached = ok ? s : SPRING_FALLBACK;
  return cached;
}
