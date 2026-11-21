/**
 * Open the music page when a player starts, and go back home after it has been quiet there a while.
 * Any HomeView card can carry the `music_page` option; Home Assistant mounts only the current view's cards,
 * so put it on one card in every view. Cards with the same option share one watcher, so it acts once.
 */
import { navigate, type Hass } from "./ha.ts";
import { musicStep, type MusicWatch } from "./logic.ts";

export interface MusicPageConfig {
  /** the media player to watch */
  entity?: string;
  /** the music page, e.g. /echo-show/music */
  path?: string;
  /** go back here after the player has been quiet on the music page; no going back without it */
  home_path?: string;
  /** seconds of quiet on the music page before going back (default 60, 0 never) */
  return_after?: number;
}

interface Watcher {
  cfg: MusicPageConfig;
  cards: Set<object>;
  hass?: Hass;
  mem: MusicWatch;
  timer: number;
}

const watchers = new Map<string, Watcher>();
const owners = new Map<object, string>();
const bare = (p: string): string => p.replace(/\/+$/, "");

function look(w: Watcher): void {
  clearTimeout(w.timer);
  w.timer = 0;
  if (!w.hass) return;
  const { entity, path, home_path, return_after = 60 } = w.cfg;
  const onMusic = bare(location.pathname) === bare(path!);
  const r = musicStep(w.mem, w.hass.states[entity!]?.state, onMusic, Date.now(), home_path ? return_after * 1000 : 0);
  // the dashboard is being edited: never pull the editor away
  if (new URLSearchParams(location.search).has("edit")) return;
  if (r.go === "music") navigate(path!);
  else if (r.go === "home") navigate(home_path!);
  else if (r.wakeIn) w.timer = window.setTimeout(() => look(w), r.wakeIn);
}

const lookAll = (): void => watchers.forEach(look);

/** a card's option and hass (on every update), or no option (removed from the page) */
export function musicPage(card: object, cfg: MusicPageConfig | undefined, hass?: Hass): void {
  const key = cfg?.entity && cfg.path ? JSON.stringify([cfg.entity, cfg.path, cfg.home_path, cfg.return_after]) : undefined;
  const old = owners.get(card);
  if (old && old !== key) {
    owners.delete(card);
    const w = watchers.get(old)!;
    w.cards.delete(card);
    // the last one went: forget the player, so a later return is a fresh start rather than a "transition"
    if (!w.cards.size) {
      clearTimeout(w.timer);
      watchers.delete(old);
    }
    if (!watchers.size) {
      window.removeEventListener("location-changed", lookAll);
      window.removeEventListener("popstate", lookAll);
    }
  }
  if (!key) return;
  if (!watchers.size) {
    window.addEventListener("location-changed", lookAll);
    window.addEventListener("popstate", lookAll);
  }
  owners.set(card, key);
  let w = watchers.get(key);
  if (!w) watchers.set(key, (w = { cfg: { ...cfg }, cards: new Set(), mem: {}, timer: 0 }));
  w.cards.add(card);
  if (hass) w.hass = hass;
  look(w);
}
