/** HomeView analog clock on a circular glass face. */
import { css, html, svg, type PropertyValues, type TemplateResult } from "lit";
import { HomeViewCard, glassStyles, type BaseConfig } from "./base.ts";
import { registerCard, type GridOptions } from "../ha.ts";
import type { EditorField } from "../editor.ts";
import { handAngles, nowIn } from "../logic.ts";

export interface ClockConfig extends BaseConfig {
  seconds?: "sweep" | "tick" | "off";
  time_zone?: string;
}

/** Hand angles in degrees for a wall-clock time (h 0-23, m, s with fraction). */

/** h/m/s/ms "now" in a time zone (local when undefined). */

export class HomeViewClockCard extends HomeViewCard<ClockConfig> {
  private raf = 0;
  private timer = 0;
  private fit?: ResizeObserver;

  static editorFields: EditorField[] = [
    {
      name: "seconds",
      label: "Seconds hand",
      selector: { select: { mode: "dropdown", options: [{ value: "sweep", label: "Smooth sweep" }, { value: "tick", label: "Tick" }, { value: "off", label: "Hidden" }] } },
    },
    { name: "time_zone", label: "Time zone", helper: "IANA name such as Europe/Paris; defaults to this device's time", selector: { text: {} } },
  ];

  constructor() {
    super("circle");
  }

  static getStubConfig(): Partial<ClockConfig> {
    return { seconds: "sweep" };
  }

  getGridOptions(): GridOptions {
    return { columns: 4, rows: "auto", min_columns: 3, min_rows: 2 };
  }

  protected validate(config: ClockConfig): void {
    if (config.time_zone) {
      try {
        new Intl.DateTimeFormat("en", { timeZone: config.time_zone });
      } catch {
        throw new Error(`Unknown time zone: ${config.time_zone}`);
      }
    }
  }

  protected cardClass(): string {
    return "clock";
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.loop();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    cancelAnimationFrame(this.raf);
    clearTimeout(this.timer);
    this.fit?.disconnect();
    this.fit = undefined;
  }

  protected firstUpdated(changed: PropertyValues): void {
    super.firstUpdated(changed);
    this.fit ??= new ResizeObserver(() => this.fitFace());
    this.fit.observe(this);
  }

  /** A fixed Sections cell can be wider or taller than it is high: keep a true circle, centred. */
  private fitFace(): void {
    const card = this.renderRoot.querySelector<HTMLElement>("ha-card");
    if (!card) return;
    const w = this.clientWidth;
    const h = this.clientHeight;
    const s = this.square || !w || !h ? 0 : Math.min(w, h);
    card.style.width = card.style.height = s ? `${s}px` : "";
    card.style.margin = s ? `${(h - s) / 2}px auto 0` : "";
  }

  protected resume(): void {
    if (!this.raf && !this.timer) this.loop();
  }

  private mode(): "sweep" | "tick" | "off" {
    const m = this._config?.seconds ?? "sweep";
    return m === "sweep" && matchMedia("(prefers-reduced-motion: reduce)").matches ? "tick" : m;
  }

  private loop = (): void => {
    this.raf = this.timer = 0;
    if (!this.onScreen) return; // hidden: resume() restarts the hands
    this.draw();
    const m = this.mode();
    if (m === "sweep") this.raf = requestAnimationFrame(this.loop);
    else this.timer = window.setTimeout(this.loop, (m === "off" ? 60000 - new Date().getSeconds() * 1000 : 1000) - new Date().getMilliseconds() + 5);
  };

  private draw(): void {
    const root = this.renderRoot;
    const hh = root.querySelector("#hh");
    if (!hh) return;
    const t = nowIn(this._config?.time_zone);
    const a = handAngles(t.h, t.m, t.s + (this.mode() === "sweep" ? t.ms / 1000 : 0));
    hh.setAttribute("transform", `rotate(${a.h})`);
    root.querySelector("#mh")!.setAttribute("transform", `rotate(${a.m})`);
    root.querySelector("#sh")?.setAttribute("transform", `rotate(${a.s})`);
  }

  protected renderContent(): TemplateResult {
    const ticks = Array.from({ length: 12 }, (_, i) => svg`<line class="tick" x1="0" x2="0" y1="-84" y2="-68" transform="rotate(${i * 30})"/>`);
    const t = nowIn(this._config?.time_zone);
    return html`<svg class="face" viewBox="-100 -100 200 200" role="img" aria-label="Clock, ${String(t.h).padStart(2, "0")}:${String(t.m).padStart(2, "0")}">
      ${ticks}
      <line class="hand" id="hh" x1="0" y1="0" x2="0" y2="-42" stroke-width="7" />
      <line class="hand" id="mh" x1="0" y1="0" x2="0" y2="-66" stroke-width="5.5" />
      ${this.mode() === "off" ? "" : svg`<line class="hand" id="sh" x1="0" y1="18" x2="0" y2="-80" stroke-width="1.8" />`}
      <circle r="4.2" fill="#fff" />
    </svg>`;
  }

  protected updated(changed: Map<PropertyKey, unknown>): void {
    super.updated?.(changed);
    this.draw();
  }

  static styles = [
    glassStyles,
    css`
      ha-card.hv-glass.clock {
        border-radius: 50%;
        aspect-ratio: 1;
      }
      .face {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        overflow: visible;
      }
      .tick {
        stroke: #fff;
        stroke-width: 4.4;
        stroke-linecap: round;
      }
      .hand {
        stroke: #fff;
        stroke-linecap: round;
        filter: drop-shadow(0 1px 1.5px rgb(40 30 20 / 0.25));
      }
    `,
  ];
}

customElements.define("homeview-clock-card", HomeViewClockCard);
registerCard("homeview-clock-card", "HomeView Clock", "Analog clock on a round liquid-glass face.");
