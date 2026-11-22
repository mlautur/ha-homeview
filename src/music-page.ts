/**
 * Open the music page when a player starts, and go back home after it has been quiet there a while.
 * Any HomeView card can carry the `music_page` option; put it on one card in every view (see card-watch.ts).
 */
import { cardWatch } from "./card-watch.ts";
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

const bare = (p: string): string => p.replace(/\/+$/, "");

function watcher(cfg: MusicPageConfig) {
  const { entity, path, home_path, return_after = 60 } = cfg;
  const mem: MusicWatch = {};
  let timer = 0;
  const look = (hass: Hass): void => {
    clearTimeout(timer);
    timer = 0;
    const onMusic = bare(location.pathname) === bare(path!);
    const r = musicStep(mem, hass.states[entity!]?.state, onMusic, Date.now(), home_path ? return_after * 1000 : 0);
    // the dashboard is being edited: never pull the editor away
    if (new URLSearchParams(location.search).has("edit")) return;
    if (r.go === "music") navigate(path!);
    else if (r.go === "home") navigate(home_path!);
    else if (r.wakeIn) timer = window.setTimeout(() => look(hass), r.wakeIn);
  };
  // the last card went: forget the player, so a later return is a fresh start rather than a "transition"
  return { look, stop: () => clearTimeout(timer) };
}

const lookAll = (): void => watch.lookAll();
const watch = cardWatch<MusicPageConfig>(
  (c) => (c.entity && c.path ? JSON.stringify([c.entity, c.path, c.home_path, c.return_after]) : undefined),
  watcher,
  () => {
    window.addEventListener("location-changed", lookAll);
    window.addEventListener("popstate", lookAll);
  },
  () => {
    window.removeEventListener("location-changed", lookAll);
    window.removeEventListener("popstate", lookAll);
  },
);

/** a card's option and hass (on every update), or no option (removed from the page) */
export const musicPage = watch.feed;
