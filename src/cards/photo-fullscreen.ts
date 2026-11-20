/**
 * The photo frame's full-screen slideshow: the card's own pictures over the whole Home Assistant
 * view, on a blurred copy of the picture. Swipe left / right to step, swipe down (or Escape, or
 * the back gesture) to close; it also closes by itself after 3 hours.
 */
import { css, type TemplateResult } from "lit";
import type { Gesture } from "../logic.ts";
import { HomeViewOverlay } from "./overlay.ts";
import { emptyStage, stage, stageStyles, type StageState } from "./photo-stage.ts";

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

export class HomeViewPhotoSlideshow extends HomeViewOverlay {
  static properties = { ...HomeViewOverlay.properties, state: { attribute: false } };
  state: StageState = emptyStage();
  host?: SlideshowHost;
  protected readonly label = "Photo slideshow";
  protected readonly closeLabel = "Close slideshow";
  protected readonly openMs = 3 * 3600 * 1000;

  protected renderBackdrop(): TemplateResult {
    return stage(this.state, "cover");
  }

  protected renderBody(): TemplateResult {
    return stage(this.state, "contain");
  }

  protected dragX(dx: number): void {
    this.host?.dragTo(dx);
  }

  protected dragXEnd(g: Gesture): void {
    this.host?.dragEnd(g);
  }

  protected arrow(dir: 1 | -1): boolean {
    this.host?.step(dir);
    return true;
  }

  protected closed(): void {
    this.host?.slideshowClosed();
  }

  static styles = [
    stageStyles,
    HomeViewOverlay.overlayStyles,
    css`
      :host {
        --hv-gap: 28px;
      }
      .backdrop img {
        filter: blur(40px) saturate(1.3) brightness(0.55);
        scale: 1.15;
        will-change: transform;
      }
      @media (prefers-reduced-motion: reduce) {
        img {
          transition-duration: 0.01ms !important;
        }
      }
    `,
  ];
}

if (!customElements.get("homeview-photo-slideshow")) customElements.define("homeview-photo-slideshow", HomeViewPhotoSlideshow);
