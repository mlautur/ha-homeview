/** HomeView card pack entry: registers the editor and every card. */
import { HomeViewCardEditor } from "./editor.ts";

if (!customElements.get("homeview-card-editor")) customElements.define("homeview-card-editor", HomeViewCardEditor);

import "./cards/thermostat.ts";
import "./cards/tile.ts";
import "./cards/clock.ts";
import "./cards/photo.ts";
import "./cards/voice.ts";

declare const __VERSION__: string;
console.info(`%c HOMEVIEW %c ${__VERSION__} `, "background:#928980;color:#fff;border-radius:3px 0 0 3px", "background:#2b241d;color:#fff;border-radius:0 3px 3px 0");
