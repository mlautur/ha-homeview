/**
 * Dashboard-wide behaviour carried by a card option. Home Assistant mounts only the current view's cards, so such
 * an option goes on one card in every view; the cards carrying the same option share one watcher, so it acts once
 * however many of them are on screen. A card feeds its option and `hass` on every update, and no option when it
 * leaves the page. Used by `music_page` (music-page.ts) and `voice_overlay` (voice-overlay.ts).
 */
import type { Hass } from "./ha.ts";

export interface Watcher {
  /** a look at the latest hass, after any card update (and on `lookAll`) */
  look(hass: Hass): void;
  /** the last card carrying this option left the page */
  stop(): void;
}

export interface CardWatch<C> {
  /** a card's option and hass (on every update), or no option (removed from the page) */
  feed(card: object, cfg: C | undefined, hass?: Hass): void;
  /** look again with every watcher's last hass */
  lookAll(): void;
}

/**
 * `key` names an option (cards with the same key share a watcher; undefined: not set up), `start` makes its watcher.
 * `first` and `last` run when the first watcher starts and when the last one stops.
 */
export function cardWatch<C>(key: (cfg: C) => string | undefined, start: (cfg: C) => Watcher, first?: () => void, last?: () => void): CardWatch<C> {
  const watchers = new Map<string, { w: Watcher; cards: Set<object>; hass?: Hass }>();
  const owners = new Map<object, string>();
  return {
    feed(card, cfg, hass) {
      const k = cfg ? key(cfg) : undefined;
      const old = owners.get(card);
      if (old && old !== k) {
        owners.delete(card);
        const e = watchers.get(old)!;
        e.cards.delete(card);
        if (!e.cards.size) {
          watchers.delete(old);
          e.w.stop();
          if (!watchers.size) last?.();
        }
      }
      if (!k) return;
      if (!watchers.size) first?.();
      owners.set(card, k);
      let e = watchers.get(k);
      if (!e) watchers.set(k, (e = { w: start({ ...cfg! }), cards: new Set() }));
      e.cards.add(card);
      if (hass) e.hass = hass;
      if (e.hass) e.w.look(e.hass);
    },
    lookAll() {
      watchers.forEach((e) => e.hass && e.w.look(e.hass));
    },
  };
}
