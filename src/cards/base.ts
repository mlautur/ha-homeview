/**
 * Shared base for every HomeView card: the glass surface (bake canvas, tint,
 * specular edge), size-relative typography (`--hv-ref`, set from JS so it
 * also works on Safari without container queries), grid options for the
 * Sections view, and the visual editor hook.
 */
import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { GlassController, type GlassOptions } from "../glass/surface.ts";
import type { GridOptions, Hass, LovelaceCardConfig } from "../ha.ts";
import type { EditorField } from "../editor.ts";

export interface BaseConfig extends LovelaceCardConfig, GlassOptions {}

export const glassStyles = css`
  :host {
    display: block;
    height: 100%;
    --hv-ink: #fff;
    --hv-ink-2: rgb(255 255 255 / 0.82);
    --hv-shadow-text: 0 1px 3px rgb(40 30 20 / 0.32), 0 0 14px rgb(40 30 20 / 0.14);
    --hv-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    --hv-font: -apple-system, "SF Pro Display", "Inter", system-ui, "Segoe UI", Roboto, sans-serif;
  }
  ha-card.hv-glass {
    position: relative;
    isolation: isolate;
    box-sizing: border-box;
    height: 100%;
    overflow: hidden;
    border: none;
    border-radius: var(--hv-radius, 24px);
    background: none;
    color: var(--hv-ink);
    font-family: var(--hv-font);
    -webkit-font-smoothing: antialiased;
    box-shadow:
      0 0 0 0.75px rgb(60 46 32 / 0.2),
      0 calc(var(--hv-ref, 200px) * 0.03) calc(var(--hv-ref, 200px) * 0.09) rgb(60 45 30 / 0.14);
    transition: box-shadow 0.35s ease;
  }
  ha-card.hv-glass.square {
    aspect-ratio: 1;
    height: auto;
  }
  ha-card.hv-glass[data-glass="frost"] {
    backdrop-filter: blur(22px) saturate(1.5) brightness(1.04);
    -webkit-backdrop-filter: blur(22px) saturate(1.5) brightness(1.04);
  }
  canvas.hv-bake {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    border-radius: inherit;
    pointer-events: none;
    transition: opacity 0.5s ease;
  }
  ha-card:not([data-glass="baked"]) canvas.hv-bake {
    opacity: 0;
  }
  .hv-tint {
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
    pointer-events: none;
    background: var(--hv-fill, rgb(var(--hv-tint-rgb, 84 74 64) / var(--hv-tint-a, 0.13)));
    transition: background-color 0.35s ease;
  }
  /* specular edge + soft inner shading on top of the refraction */
  ha-card.hv-glass::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    z-index: 2;
    box-shadow:
      inset 0 0 0 1px rgb(255 255 255 / 0.16),
      inset 1.5px 1.5px 0.5px -0.5px rgb(255 255 255 / 0.8),
      inset -1px -1px 0.5px -0.5px rgb(255 255 255 / 0.4),
      inset 0 0 calc(var(--hv-ref, 200px) * 0.035) rgb(50 38 26 / 0.1);
  }
  /* bare: text straight on the wallpaper, no glass surface (digital clock, full-page layouts) */
  ha-card.hv-bare {
    position: relative;
    box-sizing: border-box;
    height: 100%;
    border: none;
    border-radius: 0;
    background: none;
    box-shadow: none;
    color: var(--hv-ink);
    font-family: var(--hv-font);
    -webkit-font-smoothing: antialiased;
  }
  /* a glass piece inside a card: frost, with the cards' specular edge */
  .hv-frost {
    position: relative;
    isolation: isolate;
    border-radius: var(--hv-radius, 24px);
    background: rgb(84 74 64 / 0.2);
    backdrop-filter: blur(22px) saturate(1.5) brightness(1.04);
    -webkit-backdrop-filter: blur(22px) saturate(1.5) brightness(1.04);
    box-shadow:
      0 0 0 0.75px rgb(60 46 32 / 0.2),
      0 calc(var(--hv-ref, 200px) * 0.015) calc(var(--hv-ref, 200px) * 0.045) rgb(60 45 30 / 0.14);
  }
  .hv-frost::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    box-shadow:
      inset 0 0 0 1px rgb(255 255 255 / 0.16),
      inset 1.5px 1.5px 0.5px -0.5px rgb(255 255 255 / 0.8),
      inset -1px -1px 0.5px -0.5px rgb(255 255 255 / 0.4);
  }
  .hv-content {
    position: relative;
    height: 100%;
    box-sizing: border-box;
  }
  .title {
    font-size: calc(var(--hv-ref, 200px) * 0.098);
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.25;
  }
  .sub {
    font-size: calc(var(--hv-ref, 200px) * 0.096);
    font-weight: 400;
    color: var(--hv-ink-2);
    line-height: 1.3;
  }
  .ink {
    text-shadow: var(--hv-shadow-text);
  }
  .warning {
    font-size: calc(var(--hv-ref, 200px) * 0.075);
    color: var(--hv-ink-2);
    text-align: center;
    padding: 0 8%;
  }
  button {
    font: inherit;
    color: inherit;
  }
  :focus-visible {
    outline: 2px solid rgb(255 255 255 / 0.9);
    outline-offset: 3px;
  }
  @media (prefers-reduced-transparency: reduce) {
    ha-card.hv-glass {
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }
    .hv-tint {
      background: rgb(var(--hv-tint-rgb, 84 74 64)) !important;
    }
    .hv-frost {
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      background: rgb(84 74 64) !important;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      transition-duration: 0.01ms !important;
      animation: none !important;
    }
  }
`;

export abstract class HomeViewCard<C extends BaseConfig = BaseConfig> extends LitElement {
  static properties = { hass: { attribute: false }, _config: { state: true } };

  hass?: Hass;
  protected _config?: C;
  protected glass: GlassController;
  private sizer?: ResizeObserver;

  /** fields shown in the visual editor (in addition to the shared glass fields) */
  static editorFields: EditorField[] = [];

  constructor(shape: "rect" | "circle" = "rect") {
    super();
    this.glass = new GlassController(this as never, shape);
  }

  static getConfigElement(): HTMLElement {
    const el = document.createElement("homeview-card-editor") as HTMLElement & { fields: EditorField[] };
    el.fields = (this as unknown as typeof HomeViewCard).editorFields;
    return el;
  }

  setConfig(config: C): void {
    if (!config) throw new Error("Invalid configuration");
    this.validate(config);
    this._config = config;
    this.glass.setOptions({
      glass: config.glass,
      wallpaper: config.wallpaper,
      bevel: config.bevel,
      refraction: config.refraction,
      aberration: config.aberration,
      frost: config.frost,
    });
  }

  /** throw an Error with a readable message for invalid config */
  protected validate(_config: C): void {}

  getCardSize(): number {
    return 3;
  }

  abstract getGridOptions(): GridOptions;

  /** Square by default unless the user fixed the height with the Sections editor. */
  protected get square(): boolean {
    return typeof this._config?.grid_options?.rows !== "number";
  }

  /** reference length for typography, from the card's own size */
  protected refFrom(w: number, h: number): number {
    return Math.min(w, h);
  }

  protected abstract renderContent(): TemplateResult | typeof nothing;

  /** false while the card or an ancestor is display:none, e.g. a section hidden by a screen condition */
  protected get onScreen(): boolean {
    return this.getClientRects().length > 0;
  }

  /** the card has a size again: restart work paused while hidden (must be idempotent) */
  protected resume(): void {}

  protected cardClass(): string {
    return "";
  }

  /** no glass surface: the content sits on the wallpaper (the card still sets the wallpaper) */
  protected get bare(): boolean {
    return false;
  }

  protected render(): TemplateResult {
    if (!this._config) return html``;
    if (this.bare) return html`<ha-card class="hv-bare ${this.cardClass()}"><div class="hv-content">${this.renderContent()}</div></ha-card>`;
    return html`<ha-card class="hv-glass ${this.square ? "square" : ""} ${this.cardClass()}">
      <canvas class="hv-bake" aria-hidden="true"></canvas>
      <div class="hv-tint"></div>
      <div class="hv-content">${this.renderContent()}</div>
    </ha-card>`;
  }

  protected firstUpdated(_changed: PropertyValues): void {
    this.observeCard();
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    // a config change between glass and bare swaps the ha-card element: size the new one
    if (this.sizer && this.renderRoot.querySelector("ha-card") !== this.sized) this.observeCard();
  }

  private sized?: HTMLElement;

  private observeCard(): void {
    const card = this.renderRoot.querySelector<HTMLElement>("ha-card");
    this.sizer?.disconnect();
    this.sized = card ?? undefined;
    if (!card) return;
    this.sizer = new ResizeObserver(() => {
      const ref = this.refFrom(card.offsetWidth, card.offsetHeight);
      card.style.setProperty("--hv-ref", `${ref}px`);
      card.style.setProperty("--hv-radius", `${Math.round(Math.max(14, Math.min(34, ref * 0.125)))}px`);
      card.toggleAttribute("data-wide", card.offsetWidth > card.offsetHeight * 1.5);
      card.toggleAttribute("data-short", card.offsetHeight < 240);
      this.glass.request(true); // radius depends on size: bake with the final shape
      if (card.offsetWidth) this.resume();
    });
    this.sizer.observe(card);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.sizer?.disconnect();
    this.sizer = undefined;
  }

  connectedCallback(): void {
    super.connectedCallback();
    // re-attach the sizer after a move between parents (Sections drag and drop)
    if (this.hasUpdated && !this.sizer) this.observeCard();
  }
}
