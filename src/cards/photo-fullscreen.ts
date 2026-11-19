/**
 * The photo frame's full-screen slideshow: the card's own pictures over the whole Home Assistant
 * view, on a blurred copy of the picture. Swipe left / right to step, swipe down (or Escape, or
 * the back gesture) to close; it also closes by itself after 3 hours.
 * Attached to <body>, so no card or section layout can clip it.
 */
import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import type { Gesture } from "../logic.ts";
import { trackGestures } from "../util/gesture.ts";
import { ICONS } from "../icons.ts";
import { SLIDE_MS, emptyStage, stage, stageStyles, type StageState } from "./photo-stage.ts";

/** what the slideshow asks of the photo card that drives it */
export interface SlideshowHost {
  /** a horizontal drag moved the picture by dx px */
  dragTo(dx: number): void;
  /** a horizontal drag ended: swipe to the next / previous picture, or settle back */
  dragEnd(g: Gesture): void;
  /** step without a drag (arrow keys) */
  step(dir: 1 | -1): void;
  /** the slideshow is gone */
  slideshowClosed(): void;
}

const CHROME_MS = 3000;
const OPEN_MS = 3 * 3600 * 1000;
const HISTORY_KEY = "homeviewSlideshow";

export class HomeViewPhotoSlideshow extends LitElement {
  static properties = { state: { attribute: false }, _pull: { state: true }, _chrome: { state: true }, _closing: { state: true } };
  state: StageState = emptyStage();
  host?: SlideshowHost;
  private _pull = 0;
  private _chrome = true;
  private _closing = false;
  private axis: "x" | "y" | undefined;
  private untrack?: () => void;
  private closeTimer = 0;
  private chromeTimer = 0;
  private wake?: WakeLockSentinel;

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute("role", "dialog");
    this.setAttribute("aria-modal", "true");
    this.setAttribute("aria-label", "Photo slideshow");
    this.tabIndex = -1;
    // the back gesture / button closes the slideshow instead of leaving the dashboard
    history.pushState({ ...(history.state ?? {}), [HISTORY_KEY]: true }, "");
    window.addEventListener("popstate", this.onPop);
    window.addEventListener("keydown", this.onKey);
    document.addEventListener("visibilitychange", this.onVisible);
    // no page scroll or pull-to-refresh behind the slideshow
    this.addEventListener("touchmove", this.noScroll, { passive: false });
    this.closeTimer = window.setTimeout(() => this.close(), OPEN_MS);
    this.showChrome();
    void this.keepAwake();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.untrack?.();
    this.untrack = undefined;
    window.removeEventListener("popstate", this.onPop);
    window.removeEventListener("keydown", this.onKey);
    document.removeEventListener("visibilitychange", this.onVisible);
    this.removeEventListener("touchmove", this.noScroll);
    clearTimeout(this.closeTimer);
    clearTimeout(this.chromeTimer);
    void this.wake?.release().catch(() => {});
    this.wake = undefined;
  }

  protected firstUpdated(): void {
    this.untrack = trackGestures(
      this,
      {
        move: (dx, dy, axis) => {
          this.axis = axis;
          if (axis === "x") this.host?.dragTo(dx);
          else this._pull = dy > 0 ? dy : dy / 4; // only down closes; up resists
        },
        end: (g) => {
          const axis = this.axis;
          this.axis = undefined;
          if (g === "tap") return this.showChrome(!this._chrome);
          if (axis === "x") return this.host?.dragEnd(g);
          if (g === "down") return this.close();
          this._pull = 0;
        },
      },
      true,
    );
    this.focus();
  }

  /** close (animated), returning to the dashboard */
  close(fromHistory = false): void {
    if (this._closing) return;
    this._closing = true;
    if (!fromHistory && history.state?.[HISTORY_KEY]) history.back();
    window.setTimeout(() => {
      this.remove();
      this.host?.slideshowClosed();
    }, 320);
  }

  private onPop = (): void => {
    if (!history.state?.[HISTORY_KEY]) this.close(true);
  };

  private onKey = (e: KeyboardEvent): void => {
    if (e.key === "Escape") this.close();
    else if (e.key === "ArrowRight") this.host?.step(1);
    else if (e.key === "ArrowLeft") this.host?.step(-1);
    else return;
    e.preventDefault();
  };

  private onVisible = (): void => {
    // the browser drops a wake lock whenever the page is hidden
    if (document.visibilityState === "visible" && !this._closing) void this.keepAwake();
  };

  private noScroll = (e: TouchEvent): void => e.preventDefault();

  /** keep the screen on while the slideshow runs, where the browser allows it (secure origin) */
  private async keepAwake(): Promise<void> {
    try {
      this.wake = await navigator.wakeLock?.request("screen");
    } catch {
      // not allowed here (plain http, battery saver): the screen follows its own timeout
    }
  }

  private showChrome(on = true): void {
    this._chrome = on;
    clearTimeout(this.chromeTimer);
    if (on) this.chromeTimer = window.setTimeout(() => (this._chrome = false), CHROME_MS);
  }

  protected render(): TemplateResult {
    const pull = this._pull;
    const fade = pull > 0 ? Math.max(0, 1 - pull / 500) : 1;
    const settling = this.axis !== "y";
    return html`<div class="backdrop ${settling ? "settle" : ""}" style="opacity:${fade}">${stage(this.state, "cover")}</div>
      <div class="stage ${settling ? "settle" : ""}" style="transform:translateY(${pull}px) scale(${pull > 0 ? 1 - pull / 2500 : 1})">
        ${stage(this.state, "contain")}
      </div>
      ${this._chrome ? html`<button class="close" aria-label="Close slideshow" @pointerdown=${(e: Event) => e.stopPropagation()} @click=${() => this.close()}>${ICONS.close}</button>` : nothing}`;
  }

  static styles = [
    stageStyles,
    css`
      :host {
        position: fixed;
        inset: 0;
        z-index: 2147483000;
        display: block;
        overflow: hidden;
        --hv-gap: 28px;
        background: #000;
        touch-action: none;
        overscroll-behavior: contain;
        outline: none;
        cursor: default;
        animation: open 0.32s ease both;
        transition: opacity 0.32s ease;
      }
      :host([closing]) {
        opacity: 0;
      }
      @keyframes open {
        from {
          opacity: 0;
        }
      }
      .backdrop,
      .stage {
        position: absolute;
        inset: 0;
      }
      .settle {
        transition:
          transform ${SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1),
          opacity ${SLIDE_MS}ms ease;
      }
      .backdrop img {
        filter: blur(40px) saturate(1.3) brightness(0.55);
        scale: 1.15;
        will-change: transform;
      }
      .close {
        position: absolute;
        top: max(16px, env(safe-area-inset-top));
        right: max(16px, env(safe-area-inset-right));
        width: 44px;
        height: 44px;
        padding: 11px;
        border: 0;
        border-radius: 50%;
        color: #fff;
        background: rgb(255 255 255 / 0.16);
        backdrop-filter: blur(20px) saturate(1.6);
        -webkit-backdrop-filter: blur(20px) saturate(1.6);
        box-shadow:
          inset 0 0 0 0.5px rgb(255 255 255 / 0.4),
          0 4px 16px rgb(0 0 0 / 0.25);
        cursor: pointer;
        animation: open 0.25s ease both;
      }
      .close svg {
        width: 100%;
        height: 100%;
        display: block;
      }
      .close:focus-visible {
        outline: 2px solid rgb(255 255 255 / 0.9);
        outline-offset: 3px;
      }
      @media (prefers-reduced-motion: reduce) {
        :host,
        .close {
          animation: none;
        }
        .settle,
        img {
          transition-duration: 0.01ms !important;
        }
      }
    `,
  ];

  protected updated(): void {
    this.toggleAttribute("closing", this._closing);
  }
}

if (!customElements.get("homeview-photo-slideshow")) customElements.define("homeview-photo-slideshow", HomeViewPhotoSlideshow);
