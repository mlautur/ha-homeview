/** Filled SF-style glyphs (24x24), from the approved mockup. No emoji, no icon font needed. */
import { svg, type SVGTemplateResult } from "lit";

const g = (body: SVGTemplateResult): SVGTemplateResult =>
  svg`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${body}</svg>`;

export const ICONS: Record<string, SVGTemplateResult> = {
  sun: g(svg`<circle cx="12" cy="12" r="4.3"/><g stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2.2v2.4M12 19.4v2.4M2.2 12h2.4M19.4 12h2.4M5.1 5.1l1.7 1.7M17.2 17.2l1.7 1.7M5.1 18.9l1.7-1.7M17.2 6.8l1.7-1.7"/></g>`),
  moon: g(svg`<path d="M20.2 14.6A8.6 8.6 0 0 1 9.4 3.8a8.6 8.6 0 1 0 10.8 10.8z"/><path d="M17 3.2l.6 1.5 1.5.6-1.5.6-.6 1.5-.6-1.5-1.5-.6 1.5-.6zM20.6 7.6l.4.9.9.4-.9.4-.4.9-.4-.9-.9-.4.9-.4z"/>`),
  // one padlock for both states: the tile flips the shackle about its shared leg (x 16.55) and slides the lock
  // 1.9 to the left when open, so locking / unlocking animates instead of swapping glyphs (see tile.ts)
  padlock: svg`<svg class="padlock" viewBox="0 0 24 24" fill="currentColor" overflow="visible" aria-hidden="true"><g class="pl"><path class="sh-open" d="M16.55 12V7a4.4 4.4 0 0 1 8.8 0v2.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path class="sh-closed" d="M7.75 12V7a4.4 4.4 0 0 1 8.8 0v5" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="5" y="11" width="14" height="11.25" rx="2.4"/></g></svg>`,
  light: g(svg`<rect x="11.1" y="1.5" width="1.8" height="5" rx=".9"/><rect x="8.6" y="1.2" width="6.8" height="1.9" rx=".95"/><path d="M12 6.2c-4.1 0-7.6 3.2-8 7.3-.05.5.35.9.85.9h14.3c.5 0 .9-.4.85-.9-.4-4.1-3.9-7.3-8-7.3z"/><path d="M8.6 15.6h6.8a3.4 3.4 0 0 1-6.8 0z"/>`),
  fan: g(svg`<circle cx="12" cy="10" r="8.2" fill="none" stroke="currentColor" stroke-width="1.6"/><g class="blades"><path d="M12 10c-.4-2.6.2-5 1.9-5.6 1.6-.5 2.6 1.4 1.4 3.1-.8 1.2-2 1.9-3.3 2.5z"/><path d="M12 10c2.4 1 4.2 2.8 3.8 4.5-.4 1.6-2.6 1.5-3.4-.4-.6-1.3-.6-2.7-.4-4.1z"/><path d="M12 10c-2 1.6-4.4 2.3-5.6 1.1-1.2-1.2.1-3 2.1-2.8 1.4.1 2.5.9 3.5 1.7z"/></g><circle cx="12" cy="10" r="1.3"/><path d="M10.6 18.1h2.8l.9 3.4H9.7z"/><rect x="7.5" y="21" width="9" height="1.8" rx=".9"/>`),
  curtains: g(svg`<rect x="2" y="2.5" width="20" height="1.8" rx=".9"/><path d="M4 4.3h6.5c-.3 4.6-1.4 9.8-3.5 16.9H4z"/><path d="M20 4.3h-6.5c.3 4.6 1.4 9.8 3.5 16.9H20z"/>`),
  curtainsOpen: g(svg`<rect x="2" y="2.5" width="20" height="1.8" rx=".9"/><path d="M4 4.3h3.2c-.2 4.6-.6 9.8-1.4 16.9H4z"/><path d="M20 4.3h-3.2c.2 4.6.6 9.8 1.4 16.9H20z"/>`),
  garage: g(svg`<path d="M2 9.6 12 3l10 6.6V21a1 1 0 0 1-1 1h-1.6V11.4H4.6V22H3a1 1 0 0 1-1-1z"/><rect x="6.2" y="13" width="11.6" height="2" rx=".5"/><rect x="6.2" y="16.2" width="11.6" height="2" rx=".5"/><rect x="6.2" y="19.4" width="11.6" height="2" rx=".5"/>`),
  garageOpen: g(svg`<path d="M2 9.6 12 3l10 6.6V21a1 1 0 0 1-1 1h-1.6V11.4H4.6V22H3a1 1 0 0 1-1-1z"/><rect x="6.2" y="13" width="11.6" height="2" rx=".5"/>`),
  power: g(svg`<path d="M12 2.5v8.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M7.1 5.4a8 8 0 1 0 9.8 0" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>`),
  play: g(svg`<path d="M8 4.7v14.6c0 .9 1 1.4 1.7.9l11-7.3c.7-.4.7-1.4 0-1.8l-11-7.3C9 3.3 8 3.8 8 4.7z"/><path d="M3.5 6.5l.5 1.3 1.3.5-1.3.5-.5 1.3-.5-1.3-1.3-.5 1.3-.5z"/>`),
  dot: g(svg`<circle cx="12" cy="12" r="6"/>`),
  music: g(svg`<path d="M20 2.6v12.9a3.4 3.4 0 1 1-1.9-3.06V7.1L9.6 8.9v8.6a3.4 3.4 0 1 1-1.9-3.06V5.6c0-.6.4-1.1 1-1.2l10.1-2.4c.6-.15 1.2.3 1.2.6z"/>`),
  start: g(svg`<path d="M7 4.7v14.6c0 .9 1 1.4 1.7.9l11-7.3c.7-.4.7-1.4 0-1.8l-11-7.3C8 3.3 7 3.8 7 4.7z"/>`),
  home: g(svg`<path d="M3 11.2 12 3.5l9 7.7V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>`),
  locate: g(svg`<circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3"/><path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`),
  pause: g(svg`<rect x="6" y="4.5" width="4.2" height="15" rx="1.4"/><rect x="13.8" y="4.5" width="4.2" height="15" rx="1.4"/>`),
  vacuum: g(svg`<path fill-rule="evenodd" d="M12 2.4a9.6 9.6 0 1 1 0 19.2 9.6 9.6 0 0 1 0-19.2zM4.2 9.16a8.3 8.3 0 0 1 15.6 0l-1.13.41a7.1 7.1 0 0 0-13.34 0zM12 5.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8zm0 1.1a2.3 2.3 0 1 1 0 4.6 2.3 2.3 0 0 1 0-4.6z"/>`),
  calendar: g(svg`<rect x="3" y="4.5" width="18" height="16.5" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 9.5h18" stroke="currentColor" stroke-width="1.8"/><path d="M8 2.5v4M16 2.5v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><rect x="6.5" y="12.5" width="3" height="2.6" rx=".6"/><rect x="10.5" y="12.5" width="3" height="2.6" rx=".6"/><rect x="14.5" y="12.5" width="3" height="2.6" rx=".6"/><rect x="6.5" y="16.3" width="3" height="2.6" rx=".6"/><rect x="10.5" y="16.3" width="3" height="2.6" rx=".6"/>`),
  camera: g(svg`<rect x="2" y="6" width="14.5" height="12" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M16.5 10.4 22 7.2v9.6l-5.5-3.2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>`),
  drop: g(svg`<path d="M12 3c-.2 0-.4.1-.5.3C9.6 6 6.5 10.3 6.5 14a5.5 5.5 0 0 0 11 0c0-3.7-3.1-8-5-10.7-.1-.2-.3-.3-.5-.3z" fill="none" stroke="currentColor" stroke-width="1.8"/>`),
  chevronUp: svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 15l7-7 7 7"/></svg>`,
  chevronDown: svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 9l7 7 7-7"/></svg>`,
  mic: g(svg`<rect x="8.5" y="2" width="7" height="12.5" rx="3.5"/><path d="M5 11a7 7 0 0 0 14 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 18v3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`),
  keyboard: g(svg`<rect x="2" y="5.5" width="20" height="13" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M6 9.5h1.6M9.2 9.5h1.6M12.4 9.5h1.6M15.6 9.5h1.6M6 12.5h1.6M15.6 12.5h1.6M9.2 12.5h4.8M7.5 15.5h9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`),
  retry: g(svg`<path d="M19 12a7 7 0 1 1-2.05-4.95" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M20 3.6v6h-6z"/>`),
  stop: g(svg`<rect x="6" y="6" width="12" height="12" rx="2.5"/>`),
  close: svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  send: g(svg`<path d="M3.4 11.2 19.6 4.1c.8-.3 1.6.5 1.3 1.3l-7.1 16.2c-.3.8-1.5.7-1.7-.1l-1.6-6.2-6.2-1.6c-.8-.2-.9-1.4-.1-1.7z"/>`),
};

/** Default glyph per domain / device class / state. */
export function iconFor(domain: string, deviceClass: string | undefined, active: boolean): SVGTemplateResult {
  switch (domain) {
    case "light":
      return ICONS.light;
    case "lock":
      return ICONS.padlock;
    case "fan":
      return ICONS.fan;
    case "cover":
      if (deviceClass === "garage" || deviceClass === "gate") return active ? ICONS.garageOpen : ICONS.garage;
      return active ? ICONS.curtainsOpen : ICONS.curtains;
    case "scene":
      return ICONS.sun;
    case "script":
      return ICONS.play;
    case "switch":
    case "input_boolean":
      return ICONS.power;
    case "media_player":
      return active ? ICONS.pause : ICONS.music;
    case "vacuum":
      return ICONS.vacuum;
    default:
      return ICONS.dot;
  }
}
