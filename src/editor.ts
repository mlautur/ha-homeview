/**
 * One visual editor for every HomeView card, built on Home Assistant's own
 * `ha-form` so it looks and behaves like the built-in card editors. Each card
 * declares its fields; the shared glass/wallpaper fields are appended in a
 * collapsible "Glass and wallpaper" group (flattened into the card config).
 */
import { LitElement, html, nothing } from "lit";
import { fireEvent, type Hass, type LovelaceCardConfig } from "./ha.ts";
import { fromFormList, toFormList } from "./logic.ts";

export interface EditorField {
  name: string;
  label?: string;
  helper?: string;
  required?: boolean;
  selector?: Record<string, unknown>;
  type?: string;
  /** a value that may be one string or a list of strings (text selector with multiple) */
  list?: boolean;
  flatten?: boolean;
  title?: string;
  schema?: EditorField[];
}

export const GLASS_FIELDS: EditorField[] = [
  {
    name: "",
    type: "expandable",
    flatten: true,
    title: "Glass and wallpaper",
    schema: [
      {
        name: "wallpaper",
        label: "Wallpaper",
        helper: "Built-in champagne or teal, an image URL such as /local/wall.jpg, or 'view' to use the view background set in Home Assistant. A view background always wins.",
        selector: {
          select: {
            custom_value: true,
            mode: "dropdown",
            options: [
              { value: "champagne", label: "Champagne (built-in)" },
              { value: "teal", label: "Teal (built-in)" },
              { value: "view", label: "View background" },
            ],
          },
        },
      },
      {
        name: "glass",
        label: "Glass rendering",
        helper: "Auto pre-renders the refraction (fast, works everywhere). Live refracts in real time (Chromium only, GPU heavy). Frost is plain blur.",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "auto", label: "Auto (pre-rendered)" },
              { value: "live", label: "Live (Chromium)" },
              { value: "frost", label: "Frost" },
            ],
          },
        },
      },
    ],
  },
];

/** the shared `music_page` option, nested under its own name */
export const MUSIC_FIELDS: EditorField[] = [
  {
    name: "music_page",
    type: "expandable",
    title: "Open the music page when a player starts",
    schema: [
      { name: "entity", label: "Media player", selector: { entity: { filter: { domain: "media_player" } } } },
      { name: "path", label: "Music page", helper: "A dashboard path such as /echo-show/music. Put this option on one card in every view.", selector: { text: {} } },
      { name: "home_path", label: "Then go back to", helper: "A dashboard path such as /echo-show/home, once the player has been quiet on the music page. Leave empty to stay.", selector: { text: {} } },
      { name: "return_after", label: "Go back after (seconds)", helper: "Default 60. 0 never goes back.", selector: { number: { min: 0, max: 3600, mode: "box", unit_of_measurement: "s" } } },
    ],
  },
];

/** the shared `voice_overlay` option, nested under its own name */
export const VOICE_FIELDS: EditorField[] = [
  {
    name: "voice_overlay",
    type: "expandable",
    title: "Show the voice assistant over every page",
    schema: [
      { name: "satellite", label: "Voice satellite", helper: "Its listening, thinking and responding light up the screen's edge. Put this option on one card in every view.", selector: { entity: { filter: { domain: "assist_satellite" } } } },
      { name: "transcript", label: "Show what was heard and the reply", helper: "Reads Assist's debug log, so it needs a Home Assistant admin user. Otherwise only the status shows.", selector: { boolean: {} } },
    ],
  },
];

const labelize = (name: string): string => name.replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase());

export class HomeViewCardEditor extends LitElement {
  static properties = { hass: { attribute: false }, fields: { attribute: false }, _config: { state: true } };
  hass?: Hass;
  fields: EditorField[] = [];
  private _config?: LovelaceCardConfig;

  setConfig(config: LovelaceCardConfig): void {
    this._config = config;
  }

  protected render(): unknown {
    if (!this.hass || !this._config) return nothing;
    return html`<ha-form
      .hass=${this.hass}
      .data=${toFormList(this._config, this.listNames())}
      .schema=${[...this.fields, ...MUSIC_FIELDS, ...VOICE_FIELDS, ...GLASS_FIELDS]}
      .computeLabel=${(s: EditorField) => s.label ?? labelize(s.name)}
      .computeHelper=${(s: EditorField) => s.helper}
      @value-changed=${this.changed}
    ></ha-form>`;
  }

  private listNames(): string[] {
    return this.fields.filter((f) => f.list).map((f) => f.name);
  }

  private changed(ev: CustomEvent<{ value: LovelaceCardConfig }>): void {
    ev.stopPropagation();
    const config: LovelaceCardConfig = fromFormList({ ...ev.detail.value }, this.listNames());
    const blank = (v: unknown): boolean => v === "" || v === undefined || v === null;
    for (const name of ["music_page", "voice_overlay"]) {
      const o = config[name];
      if (!o || typeof o !== "object") continue;
      const m = Object.fromEntries(Object.entries(o).filter(([, v]) => !blank(v)));
      config[name] = Object.keys(m).length ? m : undefined;
    }
    for (const [k, v] of Object.entries(config)) if (blank(v)) delete config[k];
    fireEvent(this, "config-changed", { config });
  }
}
