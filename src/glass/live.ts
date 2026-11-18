/** Live mode (opt-in): the displacement map as an SVG filter used as backdrop-filter. Chromium only. */
import type { GlassParams } from "./map.ts";

export function supportsLive(): boolean {
  const ua = navigator.userAgent;
  const safari = /Safari/.test(ua) && !/Chrome|Chromium|Edg|OPR/.test(ua);
  return !safari && (CSS.supports("backdrop-filter", "url(#x)") || CSS.supports("-webkit-backdrop-filter", "url(#x)"));
}

export function filterMarkup(id: string, url: string, w: number, h: number, p: GlassParams): string {
  const pad = Math.ceil(p.scale + p.aberration + 4);
  const px = (pad / w) * 100;
  const py = (pad / h) * 100;
  const disp = (s: number, res: string): string =>
    `<feDisplacementMap in="SourceGraphic" in2="map" scale="${s}" xChannelSelector="R" yChannelSelector="G" result="${res}"/>`;
  return `<filter id="${id}" color-interpolation-filters="sRGB" x="-${px}%" y="-${py}%" width="${100 + 2 * px}%" height="${100 + 2 * py}%">
  <feImage href="${url}" x="0" y="0" width="${w}" height="${h}" preserveAspectRatio="none" result="map"/>
  ${disp(p.scale + p.aberration, "dR")}<feColorMatrix in="dR" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r"/>
  ${disp(p.scale, "dG")}<feColorMatrix in="dG" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g"/>
  ${disp(Math.max(0, p.scale - p.aberration), "dB")}<feColorMatrix in="dB" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b"/>
  <feBlend in="r" in2="g" mode="screen" result="rg"/><feBlend in="rg" in2="b" mode="screen" result="rgb"/>
  <feGaussianBlur in="rgb" stdDeviation="${p.frost}" result="frosted"/>
  <feColorMatrix in="map" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 ${p.specular} 0 0" result="spec"/>
  <feComposite in="spec" in2="frosted" operator="over"/>
</filter>`;
}
