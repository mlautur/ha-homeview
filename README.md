# HomeView for Home Assistant

A card pack that brings an Apple HomeView-style wall panel to Home Assistant. Real liquid glass refracts the wallpaper through a curved, bevelled rim, with chromatic aberration, a specular edge and a light frost. All of it is pre-rendered, so it stays smooth on tablets.

| Card | Type | What it does |
|---|---|---|
| Thermostat | `custom:homeview-thermostat-card` | Big setpoint with a spring roll and chevrons. Single and heat/cool setpoints. Calls are debounced. |
| Tile | `custom:homeview-tile-card` | Light, switch, fan, lock (optional unlock confirm), cover, scene, script, media player (what is playing; tap plays / pauses). Tap acts, hold opens more-info. |
| Clock | `custom:homeview-clock-card` | Analog clock on a round glass face. Smooth, ticking or hidden seconds hand. |
| Photo frame | `custom:homeview-photo-card` | Slideshow from one or more Home Assistant media source folders (local media, DLNA, Synology Photos, ...). Swipe for the next or previous picture; tap for a full-screen slideshow. |
| Voice | `custom:homeview-voice-card` | Talk to Assist with an audio-reactive visualizer, or mirror an `assist_satellite` device. |
| Weather | `custom:homeview-weather-card` | Time and date, a big temperature, the condition, and today's high, low and chance of rain. |
| Up next | `custom:homeview-calendar-card` | A strip with the next events from one or more calendars. |
| Camera | `custom:homeview-camera-card` | Snapshot tile, refreshed every few seconds. Tap for the live stream full screen. |
| Vacuum | `custom:homeview-vacuum-card` | Robot vacuum tile. Tap for a panel with the map, rooms, start / pause / dock / locate, suction and mop modes. |
| Now Playing | `custom:homeview-media-card` | One media player full screen: album art over a blurred copy of it, a seekable progress bar, previous / play / next, volume, shuffle and repeat. |

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
- An active tile turns frosted white with dark text, like Apple's HomeView "on" tiles. Its glyph glows warm gold.
- Locks highlight when they are *not* locked. The padlock animates between open and closed, and a lock in motion reads "Locking…" or "Unlocking…" until Home Assistant reports the new state.
- Fans spin.
- Scenes flash when run.

A media player tile shows the title and artist of what is playing, with the album art when there is one. Tap plays or pauses.

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

Swipe left on the frame for the next picture and right for the previous one. Previous retraces the pictures already shown, so it also works with `shuffle`. A swipe restarts the picture's time. Vertical drags still scroll the page.

Tap the frame for a full-screen slideshow over the whole dashboard. It shows the same pictures at the same pace, and swiping left and right works there too. To close it, swipe down, press Escape or use the back gesture. It also closes by itself after 3 hours. While it runs, the screen stays on where the browser allows it: over HTTPS, in browsers with the Screen Wake Lock API.

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

```yaml
type: custom:homeview-weather-card
entity: weather.home
show_time: true           # the time and date along the top
```

The forecast streams from Home Assistant, so the card updates when the weather entity does. A forecast that has no chance of rain shows the expected amount instead. Tap for Home Assistant's weather dialog. In a short, wide cell the card leaves out the time and puts the high, low and rain beside the temperature.

```yaml
type: custom:homeview-calendar-card
entities:
  - calendar.family
  - entity: calendar.school
    color: "#30d158"      # optional; each calendar gets its own colour by default
title: Up next            # optional
days: 14                  # how far ahead to look (7)
count: 3                  # at most this many events; fewer when the strip is narrow
```

Each event has a day badge (TODAY, or the weekday), its title, a dot in its calendar's colour and its time or "All day". Events that ended drop off. An event that is still going counts as today. The card reads the calendars again every 15 minutes, and whenever a calendar starts or ends an event. Size it as a strip, for example full width by 2 rows.

```yaml
type: custom:homeview-camera-card
entity: camera.front_door
name: Front Door          # optional
refresh: 10               # seconds between snapshots
fit: cover                # cover | contain
crop_top: 0               # percent hidden at the top with fit: cover, 0-20 (0), e.g. a burned-in clock
tap_action: live          # live (default) | more-info | none
```

Tap for the live stream over the whole dashboard, played by Home Assistant's own camera player (HLS or WebRTC, whatever the camera offers). To close it, swipe down, press Escape or use the back gesture. It also closes by itself after 10 minutes. Snapshots pause while the card is hidden or the screen is off. A camera that is unavailable shows *Offline*; one whose snapshots keep failing shows *Not responding* instead of a frozen frame.

```yaml
type: custom:homeview-vacuum-card
entity: vacuum.robot
name: Vacuum              # optional
battery: sensor.robot_battery   # optional; defaults to the robot's own battery sensor
map: image.robot_map            # optional; defaults to the robot's own map image
modes:                    # optional select entities offered as choices
  - select.robot_mop_mode
  - select.robot_mop_intensity
```

The tile shows the status and battery ("Docked · 100%"). It turns while the robot cleans. Tap opens a panel over the dashboard:
- the status, battery and map;
- Start (or Resume), Pause, Dock and Locate, as the robot supports them;
- rooms: pick some, and Start becomes *Clean N rooms*. Rooms come from the robot's map and are cleaned with Roborock's room command, so they show for Roborock robots only;
- suction, and a row of choices for each `modes` select.

Tap outside the panel, swipe down or press Escape to close it. Hold the tile for Home Assistant's own dialog.

```yaml
type: custom:homeview-media-card
entity: media_player.echo_show
name: Echo Show           # optional; shown when nothing is playing
navigation_path: /echo-show/home   # optional: a close button top right goes there
```

A full-screen Now Playing screen, laid out for a landscape wall panel or an Echo Show (drawn at 960x480, scaled to any size):
- the album art on the left, over a blurred copy of it that fills the screen;
- the title, artist and album; a long title is cut to one line;
- a progress bar that runs on between Home Assistant's updates. Drag it to seek;
- previous, play / pause and next;
- volume, shuffle and repeat (off, all, one). Volume opens a slider beside its button; a tap elsewhere closes it, and so does leaving it alone for 5 seconds.

Buttons the player does not support are hidden (volume, shuffle, repeat) or dimmed (previous, next, seek). When nothing is playing, the card shows an empty art frame, *Not playing* and the player's name over the wallpaper, and play resumes the player. The card controls only its own player: there is no speaker picker. The layout is landscape only: art on the left, controls on the right, scaled to the screen.

Put it in a **panel** view so it fills the screen:

```yaml
views:
  - title: Music
    path: music
    type: panel
    cards:
      - type: custom:homeview-media-card
        entity: media_player.echo_show
        navigation_path: /echo-show/home
```

In a Sections view it spans the full width and 8 rows by default.

### Swipe Navigation

[Swipe Navigation](https://github.com/zanna-37/hass-swipe-navigation) swipes between dashboard views, for example from the panel to a view of cameras. It works with HomeView. Swipes on the photo frame still change the picture and do not change the view.

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
