/**
 * Pointer gestures for the photo card and its full-screen slideshow: one code path for touch,
 * mouse and pen. A drag reports its offset as it moves; the end reports what it was.
 */
import { gestureOf, type Gesture } from "../logic.ts";

export interface GestureHandlers {
  /** a drag along its axis ("x", or "y" when vertical drags are tracked), offset from where it started */
  move(dx: number, dy: number, axis: "x" | "y"): void;
  /** the pointer was released or the gesture was abandoned (null) */
  end(gesture: Gesture, dx: number, dy: number): void;
}

/**
 * Track gestures on `el`. With `vertical` false a vertical drag is left to the browser, so the
 * page still scrolls (pair it with `touch-action: pan-y`). Returns a function that stops tracking.
 */
export function trackGestures(el: HTMLElement, h: GestureHandlers, vertical: boolean): () => void {
  let start: { id: number; x: number; y: number; t: number } | undefined;
  let axis: "x" | "y" | undefined;
  const down = (e: PointerEvent): void => {
    if (start || (e.pointerType === "mouse" && e.button !== 0)) return;
    start = { id: e.pointerId, x: e.clientX, y: e.clientY, t: e.timeStamp };
    axis = undefined;
  };
  const move = (e: PointerEvent): void => {
    if (!start || e.pointerId !== start.id) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (!axis) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 8) return;
      axis = Math.abs(dx) >= Math.abs(dy) ? "x" : "y";
      if (axis === "y" && !vertical) {
        start = undefined; // a scroll: the browser's
        return;
      }
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        // the pointer already ended
      }
    }
    h.move(dx, dy, axis);
  };
  const up = (e: PointerEvent): void => {
    if (!start || e.pointerId !== start.id) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    const g = gestureOf(dx, dy, e.timeStamp - start.t);
    start = undefined;
    // a drag never ends as a tap; a horizontal drag never ends as a vertical swipe, and the other way round
    const fits = !axis || (axis === "x" ? g === "left" || g === "right" : g === "up" || g === "down");
    h.end(fits ? g : null, dx, dy);
  };
  const cancel = (e: PointerEvent): void => {
    if (!start || e.pointerId !== start.id) return;
    start = undefined;
    h.end(null, 0, 0);
  };
  el.addEventListener("pointerdown", down);
  el.addEventListener("pointermove", move);
  el.addEventListener("pointerup", up);
  el.addEventListener("pointercancel", cancel);
  return () => {
    el.removeEventListener("pointerdown", down);
    el.removeEventListener("pointermove", move);
    el.removeEventListener("pointerup", up);
    el.removeEventListener("pointercancel", cancel);
  };
}
