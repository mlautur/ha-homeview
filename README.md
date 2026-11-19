# HomeView for Home Assistant

A card pack that brings an Apple HomeView-style wall panel to Home Assistant. Real liquid glass refracts the wallpaper through a curved, bevelled rim, with chromatic aberration, a specular edge and a light frost. All of it is pre-rendered, so it stays smooth on tablets.

| Card | Type | What it does |
|---|---|---|
| Thermostat | `custom:homeview-thermostat-card` | Big setpoint with a spring roll and chevrons. Single and heat/cool setpoints. Calls are debounced. |
| Tile | `custom:homeview-tile-card` | Light, switch, fan, lock (optional unlock confirm), cover, scene, script. Tap acts, hold opens more-info. |
| Clock | `custom:homeview-clock-card` | Analog clock on a round glass face. Smooth, ticking or hidden seconds hand. |
| Photo frame | `custom:homeview-photo-card` | Slideshow from one or more Home Assistant media source folders (local media, DLNA, Synology Photos, ...). |
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

Reload every Home Assistant window that was already open, including the companion apps (pull down to refresh, or quit and reopen the app). Home Assistant loads dashboard resources once per session, so a window opened before the install shows *Configuration error* on every HomeView card until it reloads.

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

`media` also takes a list. The slideshow then cycles through every folder, shuffled across all of them when `shuffle` is on:

```yaml
media:
  - media-source://media_source/local/photos/2024
  - media-source://media_source/local/photos/2025
```

A listed folder that cannot be opened is skipped; the card shows an error only when none of them can be. A subfolder that cannot be opened still shows an error.

A folder or picture that Home Assistant does not answer for within 30 s is treated as failed, so a request lost to a Wi-Fi drop or a sleeping tablet cannot leave the frame empty. When no folder could be listed, the card tries again after 10 s, then less often, up to every 5 minutes.

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

The card stops listening after 1.2 seconds of quiet, so short pauses mid-sentence don't cut you off. If it hears nothing for 7 seconds, it shows "Didn't catch that" and sends nothing to speech-to-text, so the engine can't invent a sentence from room noise. Tap again to stop early; whatever was recorded is sent to speech-to-text. The keyboard button sends a typed request instead.

When a run fails, the card shows a short reason ("Couldn't speak the reply", "Didn't catch that", ...). The orb becomes a retry button: it repeats a typed request, or listens again. **Details** shows Home Assistant's full error, which is also logged to the browser console.

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

[`examples/wall-panel.yaml`](examples/wall-panel.yaml) is a complete one-screen panel: thermostat, clock, photo frame, Assist and seven tiles.
- It fits 1280x800, 1180x820 and 1024x768 without scrolling, with the sidebar hidden. A docked sidebar takes 256px, so the wide layout then needs a 1344px screen.
- Sections columns are at least 320px wide: three columns from 1088px, two from 736px, one below. The example keeps one section per width and hides the others with a *Screen* visibility condition. The two-column one drops three tiles; the phone one stacks everything in one column.
- Cards in a hidden section pause: no clock or visualizer frames, no photo folder listing and no photo downloads until they are shown.

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
npm run test:webkit  # the built bundle in WebKit (Safari, iOS app) at phone width; once: npx playwright-core install webkit
dev/run-ha.sh <state-dir> <media-dir> [port]   # throwaway Home Assistant 2026.11.1 with demo entities
```

`dev/ha/` holds the demo configuration, plus a speech-to-text test fixture that accepts 16 kHz audio, so the voice card can be checked end to end.
