# HomeView for Home Assistant

A card pack that brings an Apple HomeView-style wall panel to Home Assistant. Real liquid glass refracts the wallpaper through a curved, bevelled rim, with chromatic aberration, a specular edge and a light frost. All of it is pre-rendered, so it stays smooth on tablets.

| Card | Type | What it does |
|---|---|---|
| Thermostat | `custom:homeview-thermostat-card` | Big setpoint with a spring roll and chevrons. Single and heat/cool setpoints. Calls are debounced. |
| Tile | `custom:homeview-tile-card` | Light, switch, fan, lock (optional unlock confirm), cover, scene, script. Tap acts, hold opens more-info. |
| Clock | `custom:homeview-clock-card` | Analog clock on a round glass face. Smooth, ticking or hidden seconds hand. |
| Photo frame | `custom:homeview-photo-card` | Slideshow from any Home Assistant media source folder (local media, DLNA, Synology Photos, ...). |
| Voice | `custom:homeview-voice-card` | Talk to Assist with an audio-reactive visualizer, or mirror an `assist_satellite` device. |

Every card works like a built-in card in the **Sections** view:
- add it from the card picker (search "HomeView");
- resize it on the **Layout** tab;
- edit it in the visual editor or in YAML.

Each card has a **Glass and wallpaper** group in the visual editor.

## Install

**HACS** (custom repository):
1. Open HACS.
2. Choose *Custom repositories*.
3. Add this repository with the **Dashboard** type.
4. Install **HomeView** and reload the browser.

HACS registers the resource for you.

**Manual:**
1. Copy `dist/homeview.js` to `/config/www/homeview.js`.
2. Add it as a dashboard resource (*Settings > Dashboards > Resources*): URL `/local/homeview.js`, type *JavaScript module*.

Requires Home Assistant 2024.11 or newer (Sections grid options). Verified on 2026.11.1.

## Wallpaper and glass

The glass refracts whatever Home Assistant paints as the **view background**. You pick the wallpaper in one of two ways:

- **Card option** `wallpaper:`
  - `champagne` (default) or `teal` for the built-in wallpapers;
  - any image URL, such as `/local/wall.jpg`;
  - `view` to leave the background alone.

  HomeView cards share one wallpaper per view. A card that sets `wallpaper` explicitly wins over cards that keep the default, so set it on one card.
- **Home Assistant's own view background**: *Edit view > Background*. It always wins over the card option. Fixed and scrolling backgrounds both work. Images from another origin need CORS, or the glass falls back to frost.

`glass:` sets how the glass is drawn:

| Value | Rendering |
|---|---|
| `auto` (default) | Pre-rendered refraction: the refraction maths runs once per card against the wallpaper pixels. Re-renders automatically when a card is added, moved, resized or scrolled over a fixed background, and when the wallpaper or screen density changes. Zero per-frame cost; works in Chrome, Android WebView, Safari and Firefox. |
| `live` | Real-time refraction through an SVG filter used as `backdrop-filter`. Chromium only. GPU heavy: every displacement filter re-runs on each frame while anything animates, so use it only on fast devices. |
| `frost` | Plain blur. Used automatically inside dialogs (card picker, editor preview), when the background is a gradient or unreadable, and when the device asks for reduced transparency. |

Fine-tuning, all relative to the card size: `bevel` (0.13), `refraction` (0.30), `aberration` (0.02), `frost` (0.007).

On light wallpapers the glass tint deepens automatically so white text keeps at least 3:1 contrast.

## Cards

```yaml
type: custom:homeview-thermostat-card
entity: climate.living_room
name: Thermostat          # optional
subtitle: Living Room     # optional, defaults to the entity's area
step: 0.5                 # optional, defaults to the entity's step
```

On a `heat_cool` thermostat:
- the card shows *Heat* and *Cool* chips;
- tap a chip to choose which setpoint the chevrons change;
- both setpoints are sent in one call once you stop tapping (800 ms).

```yaml
type: custom:homeview-tile-card
entity: lock.front_door
name: Door Lock
subtitle: Front Door
confirm_unlock: true      # locks: first tap asks "Tap again to unlock"
tap_action: toggle        # toggle (default) | more-info | none
icon: mdi:door            # optional; HomeView glyphs are used by default
```

Active states:
- Lights glow warm.
- An unlocked lock turns orange: locks highlight when they are *not* locked.
- Fans spin.
- Open covers turn blue.
- Scenes flash when run.

```yaml
type: custom:homeview-clock-card
seconds: sweep            # sweep | tick | off
time_zone: Europe/Paris   # optional
```

```yaml
type: custom:homeview-photo-card
media: media-source://media_source/local/photos
interval: 30              # seconds per picture
shuffle: true
recursive: true           # include subfolders
fit: cover                # cover | contain
```

To find a folder id:
1. Open **Media** in the sidebar.
2. Browse to the folder.
3. Use its `media-source://...` id.

Anything Home Assistant can browse works: local media (`media_dirs`), DLNA/UPnP servers, Synology Photos, Immich and others.

```yaml
type: custom:homeview-voice-card
name: Assist
pipeline: 01h...          # optional, defaults to the preferred pipeline
speak: true               # play the spoken reply
satellite: assist_satellite.kitchen   # optional: mirror a voice device instead of using this mic
```

Tap the orb to talk:
- the browser microphone streams through the Assist pipeline (speech-to-text, intent, text-to-speech);
- the visualizer follows your voice, then the spoken reply;
- the card shows what was heard and the answer.

Tap again to stop early. The keyboard button sends a typed request instead.

### Voice needs HTTPS for the microphone

Browsers only allow the microphone on secure pages. On a plain `http://192.168.x.x:8123` dashboard, the card says so and offers the keyboard instead. To talk to it, use one of these:

1. **Home Assistant Cloud (Nabu Casa)**: open the dashboard through your `https://...ui.nabu.casa` address.
2. **A reverse proxy with a certificate** in front of Home Assistant (Caddy, NGINX Proxy Manager, Traefik), reached by a local DNS name.
3. **Home Assistant's own TLS**: `http: ssl_certificate` / `ssl_key` in `configuration.yaml`.
4. **Chrome on the tablet only**: `chrome://flags/#unsafely-treat-insecure-origin-as-secure`, adding your Home Assistant URL. This does not apply to Android WebView apps such as the Home Assistant companion app or Fully Kiosk.
5. **A voice satellite** (Home Assistant Voice, ESPHome) handles the audio itself. Point the card's `satellite:` option at it to show its listening, thinking and responding states on the panel.

Typed requests work without HTTPS.

## Wall-panel layout

For the full HomeView look:
1. Use a Sections view with one section spanning all columns.
2. Size the cards on the Layout tab, for example thermostat and photo 12x6, tiles and clock 6x3 in a 3-column section.
3. Hide the sidebar for the user (*Profile > Always hide sidebar*).
4. Use your kiosk browser's kiosk mode.

## Performance

Measured on Chrome, 1280x800 at DPR 2, ten cards:

| Device | Pre-render cost (once, spread across frames) | Frame rate afterwards |
|---|---|---|
| Apple M1 Pro | about 0.75 s | 60 fps, with the clock sweeping |
| Same, 4x CPU slowdown | about 3.1 s; the largest single card (thermostat) about 0.9 s | 60 fps |

Live mode, by comparison, drops to about 20 fps at DPR 2 on the same machine whenever anything animates.

## Development

```sh
npm install
npm run check        # typecheck + unit tests + build -> dist/homeview.js
dev/run-ha.sh <state-dir> <media-dir> [port]   # throwaway Home Assistant 2026.11.1 with demo entities
```

`dev/ha/` holds the demo configuration, plus a speech-to-text test fixture that accepts 16 kHz audio, so the voice card can be checked end to end.
