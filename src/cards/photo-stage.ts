/**
 * The photo frame's two-picture stage, drawn by the card and by its full-screen slideshow from
 * the same state: a crossfade for the timed slideshow, and a slide that follows a swipe.
 */
import { css, html, nothing, type TemplateResult } from "lit";

/** how long a picture takes to slide in or snap back */
export const SLIDE_MS = 420;

export interface StageState {
  urls: [string, string];
  /** which of the two pictures is shown */
  front: number;
  /** how far (px) a drag has moved the shown picture */
  drag: number;
  /**
   * Where the other picture sits, in picture widths (plus --hv-gap between them): 1 just right of the shown one (the next
   * picture peeking in), -1 just left (the previous one, or the picture that slid out), 0 hidden.
   */
  side: number;
  /** no transitions: positions jump (during a drag, and while setting up a slide) */
  still: boolean;
}

export const emptyStage = (): StageState => ({ urls: ["", ""], front: 0, drag: 0, side: 0, still: false });

export function stage(s: StageState, fit: string): TemplateResult {
  return html`${s.urls.map((u, i) => {
    if (!u) return nothing;
    const front = i === s.front;
    const x = front ? `${s.drag}px` : `calc(${s.side} * (100% + var(--hv-gap, 0px)) + ${s.drag}px)`;
    const cls = `${front ? "front" : s.side ? "beside" : ""} ${s.still ? "still" : ""}`;
    return html`<img class=${cls} src=${u} alt="" draggable="false" style="object-fit:${fit};transform:translateX(${x})" />`;
  })}`;
}

export const stageStyles = css`
  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    opacity: 0;
    transition:
      opacity 1.2s ease,
      transform ${SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1);
    -webkit-user-drag: none;
    user-select: none;
    -webkit-user-select: none;
  }
  img.front,
  img.beside {
    opacity: 1;
  }
  img.beside {
    transition: transform ${SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  img.still {
    transition: none;
  }
`;
