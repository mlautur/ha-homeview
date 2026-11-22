/**
 * The voice overlay: while a voice satellite (the Echo's own Assist) listens, thinks or responds, a warm light runs
 * around the screen's edge and a frost pill at the bottom says what it is doing, on whichever page is showing.
 * Any HomeView card can carry the `voice_overlay` option; put it on one card in every view (see card-watch.ts).
 * It never takes a touch, a history entry or the focus: the page under it keeps working.
 */
import { LitElement, css, html, type TemplateResult } from "lit";
import { cardWatch } from "./card-watch.ts";
import type { Hass } from "./ha.ts";
import { newestRun, overlayLine, runText, voiceOverlayStep, type OverlayPhase, type PipelineEvent, type VoiceWatch } from "./logic.ts";
import { openOverlay } from "./cards/overlay.ts";

export interface VoiceOverlayConfig {
  /** the assist_satellite entity to follow */
  satellite?: string;
  /** show what was heard and the reply (reads Assist's debug log: Home Assistant admins only) */
  transcript?: boolean;
}

/** how long the reply stays after the satellite is back to idle */
const LINGER_MS = 2000;
/** a swipe moves the option from one view's card to the next: keep the overlay through the gap */
const HANDOVER_MS = 1500;
const FADE_MS = 400;

/** the synthetic level per phase: the Echo's microphone belongs to its own app, so there is no real one to follow */
function level(p: OverlayPhase, t: number): number {
  const speech = (f: number): number => Math.abs(Math.sin(t * f) * Math.sin(t * f * 0.37 + 1.3));
  if (p === "listening") return 0.3 + 0.55 * speech(5.3);
  if (p === "responding") return 0.28 + 0.5 * speech(6.1);
  return 0.12;
}

export class HomeViewVoiceOverlay extends LitElement {
  static properties = { phase: { attribute: false }, line: { attribute: false } };
  /** undefined: hidden */
  phase?: OverlayPhase;
  line = "";
  private raf = 0;
  private stopAt = 0;
  private last = 0;
  private angle = 0;
  private lvl = 0;

  disconnectedCallback(): void {
    super.disconnectedCallback();
    cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  protected updated(): void {
    const shown = !!this.phase;
    if (shown !== this.hasAttribute("shown")) this.toggleAttribute("shown", shown);
    this.setAttribute("data-phase", this.phase ?? "");
    // animate while shown, and through the fade out
    this.stopAt = shown ? Infinity : performance.now() + FADE_MS + 50;
    if (!this.raf) this.raf = requestAnimationFrame(this.frame);
  }

  private frame = (now: number): void => {
    const dt = this.last ? Math.min(0.1, (now - this.last) / 1000) : 0;
    this.last = now;
    // fading out keeps the last motion (a reply's slow turn)
    const p = this.phase ?? "responding";
    const t = now / 1000;
    this.lvl += (level(p, t) - this.lvl) * 0.2;
    this.angle = (this.angle + dt * (p === "thinking" ? 260 : p === "listening" ? 40 : 70)) % 360;
    const s = this.style;
    s.setProperty("--a", `${this.angle.toFixed(1)}deg`);
    s.setProperty("--k", Math.min(1, p === "thinking" ? 0.9 : 0.55 + this.lvl * 0.6).toFixed(3));
    s.setProperty("--bw", `${(p === "thinking" ? 6 : 5 + this.lvl * 9).toFixed(1)}px`);
    s.setProperty("--gw", `${(14 + this.lvl * 22).toFixed(1)}px`);
    s.setProperty("--dot", p === "thinking" ? (0.35 + 0.65 * Math.abs(Math.sin(t * 4))).toFixed(2) : "1");
    if (now < this.stopAt) this.raf = requestAnimationFrame(this.frame);
    else this.raf = this.last = 0;
  };

  protected render(): TemplateResult {
    return html`<div class="shade"></div>
      <div class="bloomwrap"><div class="light bloom"></div></div>
      <div class="light ring"></div>
      <div class="pill" role="status" aria-live="polite"><span class="dot"></span><span class="txt">${this.line}</span></div>`;
  }

  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      /* over everything, HomeView's own full-screen pages included */
      z-index: 2147483600;
      pointer-events: none;
      overflow: hidden;
      visibility: hidden;
      transition: visibility 0s linear ${FADE_MS}ms;
      --a: 0deg;
      --k: 0.6;
      --bw: 6px;
      --gw: 22px;
      --dot: 1;
      color: #fff;
      font-family: -apple-system, "SF Pro Display", "Inter", system-ui, "Segoe UI", Roboto, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    :host([shown]) {
      visibility: visible;
      transition: none;
    }
    /* each piece fades itself: an opacity on the host would cut the pill's frost off from the page behind it */
    .shade,
    .bloomwrap,
    .light,
    .pill {
      opacity: 0;
      transition: opacity ${FADE_MS}ms ease;
    }
    :host([shown]) .shade,
    :host([shown]) .bloomwrap,
    :host([shown]) .light,
    :host([shown]) .pill {
      opacity: 1;
    }
    .shade,
    .bloomwrap,
    .light {
      position: absolute;
      inset: 0;
    }
    /* a soft dark band just inside the light: on a pale wallpaper the light would melt into it */
    .shade {
      box-shadow:
        inset 0 0 0 var(--bw) rgb(50 36 22 / 0.18),
        inset 0 0 calc(var(--gw) * 1.6) calc(var(--gw) * 0.35) rgb(50 36 22 / calc(0.12 + var(--k) * 0.3));
    }
    .light {
      --w: var(--bw);
      padding: var(--w);
      background: conic-gradient(
        from var(--a),
        rgb(255 255 255 / var(--k)),
        rgb(255 214 170 / calc(var(--k) * 0.7)) 8%,
        rgb(255 222 190 / calc(var(--k) * 0.35)) 20%,
        rgb(255 222 190 / calc(var(--k) * 0.35)) 36%,
        rgb(255 236 214 / calc(var(--k) * 0.8)) 46%,
        rgb(255 255 255 / var(--k)) 52%,
        rgb(255 200 160 / calc(var(--k) * 0.6)) 60%,
        rgb(255 222 190 / calc(var(--k) * 0.35)) 72%,
        rgb(255 222 190 / calc(var(--k) * 0.35)) 88%,
        rgb(255 240 222 / calc(var(--k) * 0.8)) 96%,
        rgb(255 255 255 / var(--k))
      );
      /* only the rim: the padding box minus the content box */
      -webkit-mask:
        linear-gradient(#000 0 0) content-box,
        linear-gradient(#000 0 0);
      -webkit-mask-composite: xor;
      mask:
        linear-gradient(#000 0 0) content-box exclude,
        linear-gradient(#000 0 0);
    }
    /* the blur sits on a wrapper: on the masked rim itself it would be cut back to the rim. No blend mode: one here
       would isolate the overlay, and the pill's frost would then blur only the overlay, not the page behind it */
    .bloomwrap {
      filter: blur(10px) brightness(1.3);
    }
    .bloom {
      --w: var(--gw);
    }
    .pill {
      position: absolute;
      left: 50%;
      bottom: max(22px, env(safe-area-inset-bottom));
      box-sizing: border-box;
      max-width: min(660px, calc(100vw - 80px));
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 22px 10px 16px;
      border-radius: 999px;
      font-size: 17px;
      line-height: 1.3;
      white-space: nowrap;
      text-shadow:
        0 1px 3px rgb(40 30 20 / 0.32),
        0 0 14px rgb(40 30 20 / 0.14);
      /* HomeView frost with its specular edge (base.ts .hv-frost) */
      background: rgb(84 74 64 / 0.2);
      backdrop-filter: blur(22px) saturate(1.5) brightness(1.04);
      -webkit-backdrop-filter: blur(22px) saturate(1.5) brightness(1.04);
      box-shadow:
        0 0 0 0.75px rgb(60 46 32 / 0.2),
        0 6px 18px rgb(60 45 30 / 0.14),
        inset 0 0 0 1px rgb(255 255 255 / 0.16),
        inset 1.5px 1.5px 0.5px -0.5px rgb(255 255 255 / 0.8),
        inset -1px -1px 0.5px -0.5px rgb(255 255 255 / 0.4);
      transform: translate(-50%, 10px);
      transition:
        opacity ${FADE_MS}ms ease,
        transform 0.24s ease;
    }
    :host([shown]) .pill {
      transform: translate(-50%, 0);
      transition:
        opacity ${FADE_MS}ms ease,
        transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .dot {
      flex: none;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 0 10px #fff;
      opacity: var(--dot);
    }
    .txt {
      overflow: hidden;
      text-overflow: ellipsis;
    }
    @media (prefers-reduced-transparency: reduce) {
      .pill {
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        background: rgb(84 74 64);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      :host,
      .shade,
      .bloomwrap,
      .light,
      .pill,
      :host([shown]) .pill {
        transition-duration: 0.01ms;
        transition-delay: 0s;
      }
    }
  `;
}

if (!customElements.get("homeview-voice-overlay")) customElements.define("homeview-voice-overlay", HomeViewVoiceOverlay);

/** one satellite's overlay and what it remembers, kept through a swipe's handover between cards */
interface Run {
  el?: HomeViewVoiceOverlay;
  mem: VoiceWatch;
  text: { heard?: string; reply?: string };
  /** when the satellite started listening (the server's clock), to tell this run's debug log from older ones */
  since?: string;
  /** the satellite state the transcript was last read for */
  readFor?: string;
  ask: number;
  timer: number;
  drop: number;
}
const runs = new Map<string, Run>();

interface PipelineRun {
  pipeline_id: string;
  pipeline_run_id: string;
  timestamp: string;
}

/** what was heard and the reply, from the newest run in Assist's debug log; undefined when it can't be read */
async function transcript(hass: Hass, since: string | undefined): Promise<{ heard?: string; reply?: string } | undefined> {
  if (hass.user && !hass.user.is_admin) return undefined;
  try {
    const { pipelines } = await hass.callWS<{ pipelines: { id: string }[] }>({ type: "assist_pipeline/pipeline/list" });
    // ponytail: the newest run of any pipeline; one other satellite talking at the same moment could win, then the
    // satellite's own pipeline (its select entity) is the upgrade
    const lists = await Promise.all(
      pipelines.map(({ id }) =>
        hass
          .callWS<{ pipeline_runs: Omit<PipelineRun, "pipeline_id">[] }>({ type: "assist_pipeline/pipeline_debug/list", pipeline_id: id })
          .then((r) => r.pipeline_runs.map((run) => ({ ...run, pipeline_id: id }))),
      ),
    );
    const run = newestRun(lists.flat(), since);
    if (!run) return undefined;
    const { events } = await hass.callWS<{ events: PipelineEvent[] }>({ type: "assist_pipeline/pipeline_debug/get", pipeline_id: run.pipeline_id, pipeline_run_id: run.pipeline_run_id });
    return runText(events);
  } catch {
    // not an admin, or an Assist without the debug log: the status words stay
    return undefined;
  }
}

function watcher(key: string, cfg: VoiceOverlayConfig) {
  let r = runs.get(key);
  if (!r) runs.set(key, (r = { mem: {}, text: {}, ask: 0, timer: 0, drop: 0 }));
  const run = r;
  // a card of the next view took over before the handover ran out
  clearTimeout(run.drop);

  const show = (): void => {
    const phase = run.mem.phase;
    if (!phase && !run.el) return;
    if (!run.el) openOverlay((run.el = document.createElement("homeview-voice-overlay") as HomeViewVoiceOverlay));
    run.el.phase = phase;
    if (phase) run.el.line = overlayLine(phase, run.text);
  };

  const look = (hass: Hass): void => {
    clearTimeout(run.timer);
    run.timer = 0;
    const st = hass.states[cfg.satellite!];
    // nothing on screen, or a reply lingering: a show now is a new run
    const fresh = !run.mem.phase || run.mem.idleSince !== undefined;
    const r = voiceOverlayStep(run.mem, st?.state, new URLSearchParams(location.search).has("edit"), Date.now(), LINGER_MS);
    if (!r.show || (fresh && run.mem.idleSince === undefined)) {
      // forget the last run's words; a read still on its way is for that run
      run.text = {};
      run.since = r.show ? st?.last_changed : undefined;
      run.readFor = undefined;
      run.ask++;
    }
    if (r.hideIn) run.timer = window.setTimeout(() => look(hass), r.hideIn);
    show();
    // the words, read once per satellite state after listening: heard from thinking on, the reply from responding
    if (cfg.transcript && r.show && st && st.state !== "listening" && st.state !== run.readFor) {
      run.readFor = st.state;
      const ask = ++run.ask;
      void transcript(hass, run.since).then((t) => {
        if (!t || ask !== run.ask || !run.mem.phase) return;
        run.text = { heard: t.heard ?? run.text.heard, reply: t.reply ?? run.text.reply };
        show();
      });
    }
  };

  return {
    look,
    stop: () => {
      clearTimeout(run.timer);
      // the next view's card takes over within a moment; if none does, hide and forget
      run.drop = window.setTimeout(() => {
        runs.delete(key);
        const el = run.el;
        if (!el) return;
        el.phase = undefined;
        window.setTimeout(() => el.remove(), FADE_MS);
      }, HANDOVER_MS);
    },
  };
}

const watch = cardWatch<VoiceOverlayConfig>(
  (c) => (c.satellite ? JSON.stringify([c.satellite, !!c.transcript]) : undefined),
  (c) => watcher(JSON.stringify([c.satellite, !!c.transcript]), c),
);

/** a card's option and hass (on every update), or no option (removed from the page) */
export const voiceOverlay = watch.feed;
