/**
 * A full-screen overlay over the whole Home Assistant view: the photo frame's slideshow and the
 * camera card's live view. Swipe down (or Escape, or the back gesture) to close; it also closes
 * by itself after `openMs`. Tapping shows or hides the close button. The screen stays on while it
 * is open, where the browser allows it. Mounted at the top of Home Assistant's app (where its own
 * dialogs go), so no card or section layout can clip it and Home Assistant's elements inside it
 * (the camera player) still reach the app's shared state.
 */
import { LitElement, css, html, nothing, type CSSResultGroup, type TemplateResult } from "lit";
import type { Gesture } from "../logic.ts";
import { trackGestures } from "../util/gesture.ts";
import { ICONS } from "../icons.ts";
import { SLIDE_MS } from "./photo-stage.ts";

const CHROME_MS = 3000;
const HISTORY_KEY = "homeviewOverlay";
/** how long the overlay takes to fade out; its content is removed after it */
export const CLOSE_MS = 320;

/** where overlays are mounted: Home Assistant's app root, or the page outside Home Assistant */
export function openOverlay(el: HomeViewOverlay): void {
  (document.querySelector("home-assistant")?.shadowRoot ?? document.body).appendChild(el);
}

export abstract class HomeViewOverlay extends LitElement {
  static properties = { _pull: { state: true }, _chrome: { state: true }, _closing: { state: true } };
  protected _pull = 0;
  protected _chrome = true;
  protected _closing = false;
  /** the axis of the drag in progress */
  protected axis: "x" | "y" | undefined;
  private untrack?: () => void;
  private closeTimer = 0;
  private chromeTimer = 0;
  private wake?: WakeLockSentinel;

  /** what a screen reader announces for the dialog */
  protected abstract readonly label: string;
  /** the close button's name for a screen reader */
  protected abstract readonly closeLabel: string;
  /** it closes by itself after this long */
  protected abstract readonly openMs: number;
  /** the full-screen content; it follows a swipe down */
  protected abstract renderBody(): TemplateResult;
  /** drawn behind the content and fading as it is pulled down */
  protected renderBackdrop(): TemplateResult | typeof nothing {
    return nothing;
  }
  /** a panel of controls places closeButton() itself and keeps it up; otherwise it floats top right and a tap shows or hides it */
  protected readonly ownClose: boolean = false;
  /** a horizontal drag moved by dx px (only overlays that page sideways use it) */
  protected dragX(_dx: number): void {}
  /** a horizontal drag ended */
  protected dragXEnd(_g: Gesture): void {}
  /** ArrowLeft / ArrowRight; return false to leave the key alone */
  protected arrow(_dir: 1 | -1): boolean {
    return false;
  }
  /** the overlay is gone */
  protected closed(): void {}

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute("role", "dialog");
    this.setAttribute("aria-modal", "true");
    this.setAttribute("aria-label", this.label);
    this.tabIndex = -1;
    // the back gesture / button closes the overlay instead of leaving the dashboard
    history.pushState({ ...(history.state ?? {}), [HISTORY_KEY]: true }, "");
    window.addEventListener("popstate", this.onPop);
    window.addEventListener("keydown", this.onKey);
    document.addEventListener("visibilitychange", this.onVisible);
    // no page scroll or pull-to-refresh behind the overlay
    this.addEventListener("touchmove", this.noScroll, { passive: false });
    this.closeTimer = window.setTimeout(() => this.close(), this.openMs);
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
          if (axis === "x") this.dragX(dx);
          else this._pull = dy > 0 ? dy : dy / 4; // only down closes; up resists
        },
        end: (g) => {
          const axis = this.axis;
          this.axis = undefined;
          if (g === "tap") return this.showChrome(!this._chrome);
          if (axis === "x") return this.dragXEnd(g);
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
      this.closed();
    }, CLOSE_MS);
  }

  private onPop = (): void => {
    if (!history.state?.[HISTORY_KEY]) this.close(true);
  };

  private onKey = (e: KeyboardEvent): void => {
    if (e.key === "Escape") this.close();
    else if (!(e.key === "ArrowRight" || e.key === "ArrowLeft") || !this.arrow(e.key === "ArrowRight" ? 1 : -1)) return;
    e.preventDefault();
  };

  private onVisible = (): void => {
    // the browser drops a wake lock whenever the page is hidden
    if (document.visibilityState === "visible" && !this._closing) void this.keepAwake();
  };

  private noScroll = (e: TouchEvent): void => e.preventDefault();

  /** keep the screen on while the overlay is open, where the browser allows it (secure origin) */
  private async keepAwake(): Promise<void> {
    try {
      this.wake = await navigator.wakeLock?.request("screen");
    } catch {
      // not allowed here (plain http, battery saver): the screen follows its own timeout
    }
  }

  private showChrome(on = true): void {
    this._chrome = on || this.ownClose;
    if (this.ownClose) return;
    clearTimeout(this.chromeTimer);
    if (on) this.chromeTimer = window.setTimeout(() => (this._chrome = false), CHROME_MS);
  }

  protected render(): TemplateResult {
    const pull = this._pull;
    const fade = pull > 0 ? Math.max(0, 1 - pull / 500) : 1;
    const settling = this.axis !== "y";
    return html`<div class="backdrop ${settling ? "settle" : ""}" style="opacity:${fade}">${this.renderBackdrop()}</div>
      <div class="stage ${settling ? "settle" : ""}" style="transform:translateY(${pull}px) scale(${pull > 0 ? 1 - pull / 2500 : 1})">${this.renderBody()}</div>
      ${this._chrome && !this.ownClose ? this.closeButton() : nothing}`;
  }

  protected closeButton(): TemplateResult {
    return html`<button class="close" aria-label=${this.closeLabel} @pointerdown=${(e: Event) => e.stopPropagation()} @click=${() => this.close()}>${ICONS.close}</button>`;
  }

  protected updated(): void {
    this.toggleAttribute("closing", this._closing);
  }

  static overlayStyles: CSSResultGroup = css`
    /* a release settles back (or slides on) at the photo frame's slide speed */
    :host {
      position: fixed;
      inset: 0;
      z-index: 2147483000;
      display: block;
      overflow: hidden;
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
      .settle {
        transition-duration: 0.01ms !important;
      }
    }
  `;
}
