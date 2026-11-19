/**
 * HomeView voice: talk to Home Assistant Assist from the panel, with an
 * audio-reactive visualizer. Tap the mic to stream the browser microphone
 * through `assist_pipeline/run` (stt -> intent -> tts) and hear the reply;
 * or type a request. Can instead mirror an `assist_satellite.*` entity when a
 * separate voice device handles the audio.
 */
import { css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { HomeViewCard, glassStyles, type BaseConfig } from "./base.ts";
import { registerCard, type GridOptions } from "../ha.ts";
import { ICONS } from "../icons.ts";
import { Endpointer, RECORDER_WORKLET, Resampler, audioFrame, toPcm16 } from "../util/audio.ts";
import type { EditorField } from "../editor.ts";
import { phaseAfter, satellitePhase, voiceError, type PipelineEvent, type VoicePhase } from "../logic.ts";

export interface VoiceConfig extends BaseConfig {
  pipeline?: string;
  satellite?: string;
  name?: string;
  speak?: boolean;
}

/** backstop if the microphone stops delivering audio; the Endpointer caps listening at 15 s */
const LISTEN_LIMIT_MS = 16000;
/** seconds a spoken reply may take to start playing (slow TTS or agent) before the card stops waiting */
const REPLY_START_S = 30;
/** seconds a playing reply may stop advancing before the card stops waiting */
const REPLY_STALL_S = 6;
const PHASE_TEXT: Record<VoicePhase, string> = {
  idle: "Tap to talk",
  listening: "Listening",
  thinking: "Thinking",
  responding: "Responding",
  error: "Something went wrong",
};

export class HomeViewVoiceCard extends HomeViewCard<VoiceConfig> {
  static properties = {
    ...HomeViewCard.properties,
    _phase: { state: true },
    _heard: { state: true },
    _reply: { state: true },
    _error: { state: true },
    _detail: { state: true },
    _showDetail: { state: true },
    _typing: { state: true },
  };
  private _phase: VoicePhase = "idle";
  private _heard = "";
  private _reply = "";
  private _error = "";
  private _detail = "";
  private _showDetail = false;
  /** the last typed request, re-sent by "try again"; empty after a spoken one */
  private lastText = "";
  private _typing = false;

  private ctx?: AudioContext;
  private stream?: MediaStream;
  private analyser?: AnalyserNode;
  private recorder?: AudioWorkletNode | ScriptProcessorNode;
  private resampler?: Resampler;
  private handlerId: number | null = null;
  private pending: Int16Array[] = [];
  private endpointer?: Endpointer;
  /** audio ended before Home Assistant handed out the stream id: send the end with the backlog */
  private audioDone = false;
  private unsub?: () => Promise<void>;
  /** bumped on teardown, so a run whose subscription resolves later is dropped */
  private runId = 0;
  private conversationId?: string;
  private audio?: HTMLAudioElement;
  private speaking = false;
  private stopTimer = 0;
  private raf = 0;
  private levels = new Float32Array(48);
  private t0 = performance.now();

  static editorFields: EditorField[] = [
    { name: "name", selector: { text: {} } },
    { name: "pipeline", label: "Assist pipeline", helper: "Defaults to the preferred pipeline", selector: { assist_pipeline: {} } },
    { name: "satellite", label: "Voice satellite (optional)", helper: "Show this assist_satellite's state instead of using this device's microphone", selector: { entity: { filter: { domain: "assist_satellite" } } } },
    { name: "speak", label: "Play spoken replies", selector: { boolean: {} } },
  ];

  static getStubConfig(): Partial<VoiceConfig> {
    return { speak: true };
  }

  getGridOptions(): GridOptions {
    return { columns: 12, rows: "auto", min_columns: 6, min_rows: 3 };
  }

  getCardSize(): number {
    return 5;
  }

  protected get square(): boolean {
    return false;
  }

  /** a tall cell would otherwise scale the text past what the orb and lines can hold */
  protected refFrom(w: number, h: number): number {
    return Math.min(w, h, 220);
  }

  protected cardClass(): string {
    const auto = typeof this._config?.grid_options?.rows !== "number";
    return `voice ${auto ? "wide" : ""} ${this.phase()}`;
  }

  private phase(): VoicePhase {
    const sat = this._config?.satellite;
    if (sat) return satellitePhase(this.hass?.states[sat]?.state);
    return this._phase;
  }

  private micBlocked(): string | null {
    if (!window.isSecureContext) return "insecure";
    if (!navigator.mediaDevices?.getUserMedia) return "unsupported";
    return null;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.loop();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    cancelAnimationFrame(this.raf);
    void this.teardown();
    if (this.speaking) {
      this.speaking = false;
      this._phase = "idle";
    }
    this.stopAudio();
  }

  private stopAudio(): void {
    const audio = this.audio;
    if (!audio) return;
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
  }

  // ---------- pipeline ----------

  private async talk(): Promise<void> {
    if (this._phase === "listening") return this.endAudio();
    if (this._phase === "thinking" || this._phase === "responding") return;
    if (this.micBlocked()) {
      this._typing = true;
      return;
    }
    this.reset();
    this.lastText = "";
    this.endpointer = new Endpointer();
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
      this.ctx = new AudioContext();
      await this.ctx.resume(); // some browsers start contexts suspended
      const source = this.ctx.createMediaStreamSource(this.stream);
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.6;
      source.connect(this.analyser);
      this.resampler = new Resampler(this.ctx.sampleRate);
      if (this.ctx.audioWorklet) {
        const url = URL.createObjectURL(new Blob([RECORDER_WORKLET], { type: "text/javascript" }));
        await this.ctx.audioWorklet.addModule(url);
        URL.revokeObjectURL(url);
        const node = new AudioWorkletNode(this.ctx, "homeview-recorder");
        node.port.onmessage = (e: MessageEvent<Float32Array>) => this.onAudio(e.data);
        source.connect(node);
        this.recorder = node;
      } else {
        // Safari < 14.1
        const node = this.ctx.createScriptProcessor(4096, 1, 1);
        node.onaudioprocess = (e) => this.onAudio(e.inputBuffer.getChannelData(0));
        source.connect(node);
        node.connect(this.ctx.destination);
        this.recorder = node;
      }
      this._phase = "listening";
      this.stopTimer = window.setTimeout(() => this.endAudio(), LISTEN_LIMIT_MS);
      await this.run({ start_stage: "stt", end_stage: this._config?.speak === false ? "intent" : "tts", input: { sample_rate: 16000, no_vad: true } });
    } catch (e) {
      this.fail(e);
    }
  }

  private retry(): void {
    if (this.lastText) void this.ask(this.lastText);
    else void this.talk();
  }

  private async ask(text: string): Promise<void> {
    if (!text.trim()) return;
    await this.teardown();
    this.reset();
    this.lastText = text;
    this._heard = text;
    this._phase = "thinking";
    try {
      await this.run({ start_stage: "intent", end_stage: this._config?.speak === false ? "intent" : "tts", input: { text } });
    } catch (e) {
      this.fail(e);
    }
  }

  private async run(msg: Record<string, unknown>): Promise<void> {
    const c = this._config!;
    const id = ++this.runId;
    const unsub = await this.hass!.connection.subscribeMessage<PipelineEvent>((ev) => id === this.runId && this.onEvent(ev), {
      type: "assist_pipeline/run",
      ...msg,
      ...(c.pipeline ? { pipeline: c.pipeline } : {}),
      ...(this.conversationId ? { conversation_id: this.conversationId } : {}),
    });
    if (id === this.runId) this.unsub = unsub;
    else await unsub().catch(() => undefined);
  }

  private onEvent(ev: PipelineEvent): void {
    const d = ev.data ?? {};
    if (ev.type === "run-start") {
      this.handlerId = d.runner_data?.stt_binary_handler_id ?? null;
      for (const pcm of this.pending) this.sendPcm(pcm);
      this.pending = [];
      if (this.audioDone && this.handlerId !== null) this.hass?.connection.socket?.send(audioFrame(this.handlerId));
      this.audioDone = false;
    }
    if (ev.type === "stt-vad-end" || ev.type === "stt-end") this.endAudio();
    if (ev.type === "stt-end") this._heard = d.stt_output?.text ?? "";
    if (ev.type === "intent-end") {
      const r = d.intent_output;
      this.conversationId = r?.conversation_id ?? this.conversationId;
      this._reply = r?.response?.speech?.plain?.speech ?? "";
    }
    if (ev.type === "tts-end" && d.tts_output?.url) this.play(d.tts_output.url);
    if (ev.type === "error") this.fail(d);
    const next = phaseAfter(this._phase, ev);
    if (ev.type === "run-end") {
      void this.unsub?.();
      this.unsub = undefined;
      if (!this.speaking) this._phase = this._phase === "error" ? "error" : "idle";
      return;
    }
    this._phase = next;
  }

  private onAudio(samples: Float32Array): void {
    if (this._phase !== "listening" || !this.resampler) return;
    const frame = this.resampler.push(samples);
    const pcm = toPcm16(frame);
    if (this.handlerId === null) this.pending.push(pcm);
    else this.sendPcm(pcm);
    const heard = this.endpointer?.push(frame);
    if (heard === "end") this.endAudio();
    else if (heard === "none") this.noSpeech();
  }

  /** nothing was said: cancel the run rather than have speech-to-text guess at room noise */
  private noSpeech(): void {
    this.fail({ code: "stt-no-text-recognized", message: "No speech was detected" });
  }

  private sendPcm(pcm: Int16Array): void {
    if (this.handlerId === null) return;
    this.hass?.connection.socket?.send(audioFrame(this.handlerId, pcm));
  }

  /** stop the microphone and tell HA the audio is complete */
  private endAudio(): void {
    clearTimeout(this.stopTimer);
    if (this.stream) {
      if (this.handlerId !== null) this.hass?.connection.socket?.send(audioFrame(this.handlerId));
      else this.audioDone = true;
    }
    if (this._phase === "listening") this._phase = "thinking";
    void this.stopMic();
  }

  private async stopMic(): Promise<void> {
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = undefined;
    this.recorder?.disconnect();
    this.recorder = undefined;
    this.handlerId = null;
  }

  private play(url: string): void {
    const src = url.startsWith("http") ? url : this.hass!.hassUrl(url);
    this.audio?.pause();
    const audio = new Audio(src);
    this.audio = audio;
    try {
      this.ctx ??= new AudioContext();
      const node = this.ctx.createMediaElementSource(audio);
      this.analyser ??= this.ctx.createAnalyser();
      this.analyser.fftSize = 256;
      node.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
      void this.ctx.resume();
    } catch {
      // visualizer falls back to a synthetic wave; audio still plays
    }
    this._phase = "responding";
    this.speaking = true;
    // Never stay stuck in "responding": Home Assistant streams the reply, so its duration is often
    // unknown (Infinity). Give up once playback stops advancing, whatever the length or the reason
    // (stalled stream, blocked or silent output device), allowing a longer wait for the first audio.
    let started = false;
    let last = 0;
    let still = 0;
    audio.onplaying = () => {
      started = true;
      still = 0;
    };
    const watch = window.setInterval(() => {
      if (this.audio !== audio || !this.speaking) done();
      else if (audio.currentTime !== last) {
        last = audio.currentTime;
        still = 0;
      } else if (++still >= (started ? REPLY_STALL_S : REPLY_START_S)) done(true);
    }, 1000);
    const done = (stalled = false): void => {
      clearInterval(watch);
      // a newer run (reset() clears speaking) or a newer reply owns the phase now
      if (this.audio !== audio || !this.speaking) return;
      this.speaking = false;
      if (!stalled) {
        this._phase = "idle";
        return;
      }
      this.stopAudio();
      this.fail({ code: "tts-failed", message: "The spoken reply stopped before it finished" });
    };
    audio.onended = () => done();
    audio.onerror = () => done();
    audio.play().catch(() => done());
  }

  private fail(e: unknown): void {
    const { text, detail } = voiceError(e);
    console.warn("HomeView voice:", detail);
    this._error = text;
    this._detail = detail;
    this._phase = "error";
    void this.teardown();
  }

  private reset(): void {
    this._heard = "";
    this._reply = "";
    this._error = "";
    this._detail = "";
    this._showDetail = false;
    this.pending = [];
    this.audioDone = false;
    this.handlerId = null;
    this.speaking = false;
    this.audio?.pause();
  }

  private async teardown(): Promise<void> {
    this.runId++;
    clearTimeout(this.stopTimer);
    await this.stopMic();
    await this.unsub?.().catch(() => undefined);
    this.unsub = undefined;
  }

  // ---------- visualizer ----------

  private loop = (): void => {
    // idle and settled: stop redrawing until the phase changes (see updated)
    this.raf = this.draw() ? requestAnimationFrame(this.loop) : 0;
  };

  /** returns whether another frame is needed */
  private draw(): boolean {
    const canvas = this.renderRoot?.querySelector<HTMLCanvasElement>("canvas.viz");
    if (!canvas) return true;
    const k = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return false; // hidden or not laid out yet: resume() restarts
    if (canvas.width !== Math.round(w * k) || canvas.height !== Math.round(h * k)) {
      canvas.width = Math.round(w * k);
      canvas.height = Math.round(h * k);
    }
    const g = canvas.getContext("2d")!;
    g.setTransform(k, 0, 0, k, 0, 0);
    g.clearRect(0, 0, w, h);
    const phase = this.phase();
    const t = (performance.now() - this.t0) / 1000;
    const n = this.levels.length;
    let moving = phase !== "idle" && phase !== "error";
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // target levels: live audio when we have it, otherwise a gentle synthetic wave per phase
    const bins = this.analyser ? new Uint8Array(this.analyser.frequencyBinCount) : null;
    const live = !!bins && (phase === "listening" || phase === "responding") && !this._config?.satellite;
    if (live) this.analyser!.getByteFrequencyData(bins!);
    for (let i = 0; i < n; i++) {
      let target = 0;
      if (live) {
        const b = bins![Math.min(bins!.length - 1, 2 + Math.floor((Math.abs(i - n / 2) / (n / 2)) * 40))];
        target = (b / 255) ** 1.4;
      } else if (phase === "listening" || phase === "responding") {
        target = 0.25 + 0.2 * Math.sin(t * 5 + i * 0.6) * Math.sin(t * 1.7 + i * 0.21);
      } else if (phase === "thinking") {
        const a = (i / n) * Math.PI * 2;
        target = 0.12 + 0.3 * Math.max(0, Math.cos(a - t * 3)) ** 6;
      } else target = 0.06;
      if (reduce) target = Math.min(target, 0.15);
      if (Math.abs(target - this.levels[i]) > 0.002) moving = true;
      this.levels[i] += (target - this.levels[i]) * 0.25;
    }
    const cx = w / 2;
    const cy = h / 2;
    const R = Math.min(w, h) * 0.34;
    // soft core
    const glow = g.createRadialGradient(cx, cy, R * 0.1, cx, cy, R * 1.25);
    const tint = phase === "error" ? "255 120 110" : phase === "listening" ? "255 255 255" : "255 236 210";
    glow.addColorStop(0, `rgb(${tint} / ${phase === "idle" ? 0.22 : 0.42})`);
    glow.addColorStop(1, `rgb(${tint} / 0)`);
    g.fillStyle = glow;
    g.beginPath();
    g.arc(cx, cy, R * 1.25, 0, Math.PI * 2);
    g.fill();
    g.strokeStyle = "rgb(255 255 255 / 0.95)";
    g.lineCap = "round";
    g.lineWidth = Math.max(2, R * 0.06);
    g.shadowColor = "rgb(40 30 20 / 0.25)";
    g.shadowBlur = 4;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      const len = R * (0.08 + this.levels[i] * 0.9);
      const r0 = R * 0.78;
      g.beginPath();
      g.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0);
      g.lineTo(cx + Math.cos(a) * (r0 + len), cy + Math.sin(a) * (r0 + len));
      g.stroke();
    }
    return moving;
  }

  // ---------- render ----------

  protected renderContent(): TemplateResult {
    const c = this._config!;
    const phase = this.phase();
    const blocked = !c.satellite && this.micBlocked();
    const sat = c.satellite ? this.hass?.states[c.satellite] : undefined;
    const status = c.satellite
      ? sat
        ? `${sat.attributes.friendly_name ?? c.satellite}: ${phase === "idle" ? "Ready" : PHASE_TEXT[phase]}`
        : `Satellite not found: ${c.satellite}`
      : phase === "error"
        ? this._error || PHASE_TEXT.error
        : phase === "idle" && blocked
          ? "Type a request"
          : PHASE_TEXT[phase];
    const failed = phase === "error" && !c.satellite;
    const [label, glyph] = phase === "listening" ? ["Stop listening", ICONS.stop] : failed ? ["Try again", ICONS.retry] : ["Talk to Assist", ICONS.mic];
    const sheet = failed && this._showDetail;
    return html`<div class="voice-wrap ${sheet ? "covered" : ""}">
      <div class="head ink">
        <span class="title">${c.name ?? "Assist"}</span>
        ${failed
          ? html`<span class="sub status" aria-live="polite" role="button" tabindex="0" title=${this._detail} @click=${this.showDetail} @keydown=${(e: KeyboardEvent) => (e.key === "Enter" || e.key === " ") && this.showDetail(e)}>${status}</span>`
          : html`<span class="sub status" aria-live="polite">${status}</span>`}
      </div>
      <button class="orb" ?disabled=${!!c.satellite} aria-label=${label} @click=${() => void (failed ? this.retry() : this.talk())}>
        <canvas class="viz" aria-hidden="true"></canvas>
        <span class="mic">${glyph}</span>
      </button>
      <div class="lines ink" aria-live="polite">
        ${this._heard ? html`<div class="heard">&ldquo;${this._heard}&rdquo;</div>` : nothing}
        ${this._reply ? html`<div class="reply">${this._reply}</div>` : nothing}
        ${failed && this._detail ? html`<button class="more" @click=${this.showDetail}><span>Details</span></button>` : nothing}
        ${blocked === "insecure" && !this._heard && !this._reply && !failed
          ? html`<div class="notice">The microphone needs Home Assistant over HTTPS. Type instead, or see the README for options.</div>`
          : nothing}
      </div>
      ${c.satellite
        ? nothing
        : this._typing || blocked
          ? html`<form class="type" @submit=${this.submit}>
              <input name="q" type="text" placeholder="Ask Assist" autocomplete="off" aria-label="Request" />
              <button class="send" aria-label="Send">${ICONS.send}</button>
            </form>`
          : html`<button class="kbd" aria-label="Type a request" @click=${() => (this._typing = true)}>${ICONS.keyboard}</button>`}
      ${sheet
        ? html`<div class="sheet ink" role="dialog" aria-label="Error details">
            <div class="sheet-head">
              <span class="title">${this._error}</span>
              <button class="more" @click=${() => (this._showDetail = false)}><span>Done</span></button>
            </div>
            <div class="detail">${this._detail}</div>
          </div>`
        : nothing}
    </div>`;
  }

  private showDetail = (e: Event): void => {
    e.preventDefault();
    this._showDetail = true;
  };

  private submit = (e: Event): void => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).elements.namedItem("q") as HTMLInputElement;
    void this.ask(input.value);
    input.value = "";
  };

  protected resume(): void {
    if (!this.raf && this.isConnected) this.loop();
  }

  protected updated(changed: PropertyValues): void {
    super.updated?.(changed);
    if (changed.has("_typing") && this._typing) this.renderRoot.querySelector<HTMLInputElement>("input[name=q]")?.focus();
    if (!this.raf && this.isConnected) this.loop();
  }

  static styles = [
    glassStyles,
    css`
      ha-card.voice.wide {
        aspect-ratio: 1.6;
        height: auto;
      }
      .voice-wrap {
        height: 100%;
        box-sizing: border-box;
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        grid-template-rows: auto minmax(0, 1fr) auto auto;
        justify-items: center;
        padding: calc(var(--hv-ref) * 0.07) calc(var(--hv-ref) * 0.08);
        gap: calc(var(--hv-ref) * 0.03);
      }
      /* wide card: orb on the left, conversation on the right */
      ha-card[data-wide] .voice-wrap {
        grid-template-columns: minmax(0, 36%) minmax(0, 1fr) 44px;
        grid-template-rows: auto minmax(0, 1fr) auto;
        grid-template-areas: "orb head kbd" "orb lines lines" "orb type type";
        justify-items: start;
        align-items: center;
        column-gap: calc(var(--hv-ref) * 0.06);
      }
      ha-card[data-wide] .head {
        grid-area: head;
        text-align: left;
        align-self: end;
      }
      ha-card[data-wide] .orb {
        grid-area: orb;
        width: 100%;
        height: 100%;
        min-height: 0;
      }
      ha-card[data-wide] .lines {
        grid-area: lines;
        text-align: left;
        align-self: stretch;
        align-items: start;
        justify-self: stretch;
      }
      ha-card[data-wide] .kbd {
        grid-area: kbd;
        align-self: start;
      }
      ha-card[data-wide] .type {
        grid-area: type;
        justify-self: stretch;
        width: auto;
      }
      .head {
        text-align: center;
        display: flex;
        flex-direction: column;
        min-width: 0;
        max-width: 100%;
      }
      /* never more than two lines, whatever Home Assistant reports */
      .status {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        overflow-wrap: anywhere;
      }
      .orb {
        appearance: none;
        border: 0;
        background: none;
        padding: 0;
        cursor: pointer;
        position: relative;
        width: 100%;
        height: 100%;
        min-height: 0;
        display: grid;
        place-items: center;
        container-type: size;
        -webkit-tap-highlight-color: transparent;
        transition: transform 0.45s var(--hv-spring);
      }
      .orb:active {
        transform: scale(0.95);
        transition-duration: 0.12s;
      }
      .orb:disabled {
        cursor: default;
      }
      canvas.viz {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }
      /* stays inside the ring (drawn from 0.26 of the orb's short side) when the orb is squeezed */
      .mic {
        position: relative;
        width: calc(var(--hv-ref) * 0.2);
        height: calc(var(--hv-ref) * 0.2);
        width: min(calc(var(--hv-ref) * 0.2), 38cqmin);
        height: min(calc(var(--hv-ref) * 0.2), 38cqmin);
        filter: drop-shadow(var(--hv-shadow-text));
      }
      .mic svg {
        width: 100%;
        height: 100%;
        display: block;
      }
      .lines {
        text-align: center;
        max-width: 100%;
        min-height: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
        font-size: calc(var(--hv-ref) * 0.082);
        line-height: 1.35;
        min-height: 1.35em;
      }
      .heard {
        color: var(--hv-ink-2);
      }
      .reply {
        font-weight: 600;
      }
      .heard,
      .reply,
      .notice {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        overflow-wrap: anywhere;
        flex: none;
      }
      .notice {
        -webkit-line-clamp: 3;
      }
      [role="button"] {
        cursor: pointer;
      }
      /* a failed run keeps what was heard and answered to one line each, beside "Details" */
      ha-card.error .heard,
      ha-card.error .reply {
        -webkit-line-clamp: 1;
      }
      /* a short cell keeps the answer (when only speaking failed) and the way to the details */
      ha-card.error[data-short] .heard {
        display: none;
      }
      /* a short, narrow cell only has room for the status, the orb and the keyboard */
      ha-card[data-short]:not([data-wide]) .lines {
        display: none;
      }
      ha-card[data-short]:not([data-wide]) .status {
        -webkit-line-clamp: 1;
      }
      .voice-wrap.covered > :not(.sheet) {
        visibility: hidden;
      }
      /* the full error, over the card's own content */
      .sheet {
        position: absolute;
        inset: 0;
        z-index: 1;
        display: flex;
        flex-direction: column;
        gap: calc(var(--hv-ref) * 0.03);
        padding: calc(var(--hv-ref) * 0.07) calc(var(--hv-ref) * 0.08);
      }
      .sheet-head {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 12px;
      }
      .sheet-head .title {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .detail {
        min-height: 0;
        overflow-y: auto;
        overflow-wrap: anywhere;
        font-size: calc(var(--hv-ref) * 0.07);
        line-height: 1.35;
        color: var(--hv-ink-2);
        user-select: text;
        -webkit-user-select: text;
      }
      .more {
        appearance: none;
        border: 0;
        background: none;
        padding: 0;
        line-height: 1.25;
        flex: none;
        cursor: pointer;
        color: var(--hv-ink-2);
        font-size: calc(var(--hv-ref) * 0.07);
      }
      /* on the label, not the button: WebKit does not underline button text */
      .more span {
        text-decoration: underline;
        text-underline-offset: 2px;
      }
      .notice {
        color: var(--hv-ink-2);
        font-size: calc(var(--hv-ref) * 0.07);
      }
      .kbd,
      .send {
        appearance: none;
        border: 0;
        background: rgb(255 255 255 / 0.14);
        border-radius: 999px;
        width: 44px;
        height: 44px;
        display: grid;
        place-items: center;
        cursor: pointer;
      }
      .kbd svg,
      .send svg {
        width: 22px;
        height: 22px;
      }
      .type {
        display: flex;
        gap: 8px;
        width: 100%;
      }
      .type input {
        flex: 1;
        min-width: 0;
        min-height: 44px;
        border: 0;
        border-radius: 999px;
        padding: 0 16px;
        font: inherit;
        font-size: 16px;
        color: #2b241d;
        background: rgb(255 255 255 / 0.85);
      }
    `,
  ];
}

customElements.define("homeview-voice-card", HomeViewVoiceCard);
registerCard("homeview-voice-card", "HomeView Voice", "Talk to Home Assistant Assist with an audio-reactive liquid-glass visualizer.");
