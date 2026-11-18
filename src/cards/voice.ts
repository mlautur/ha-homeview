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
import { RECORDER_WORKLET, Resampler, audioFrame, toPcm16 } from "../util/audio.ts";
import type { EditorField } from "../editor.ts";
import { phaseAfter, satellitePhase, type PipelineEvent, type VoicePhase } from "../logic.ts";

export interface VoiceConfig extends BaseConfig {
  pipeline?: string;
  satellite?: string;
  name?: string;
  speak?: boolean;
}



/** Map pipeline events to the visible phase (pure; unit-tested). */

/** assist_satellite entity state -> phase */

const LISTEN_LIMIT_MS = 15000;

/** Errors arrive as Error objects or as Home Assistant {code, message} objects. */
const errorText = (e: unknown): string => (e as { message?: string })?.message || String(e);
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
    _typing: { state: true },
  };
  private _phase: VoicePhase = "idle";
  private _heard = "";
  private _reply = "";
  private _error = "";
  private _typing = false;

  private ctx?: AudioContext;
  private stream?: MediaStream;
  private analyser?: AnalyserNode;
  private recorder?: AudioWorkletNode | ScriptProcessorNode;
  private resampler?: Resampler;
  private handlerId: number | null = null;
  private pending: Int16Array[] = [];
  private unsub?: () => Promise<void>;
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
    this.audio?.pause();
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
      await this.run({ start_stage: "stt", end_stage: this._config?.speak === false ? "intent" : "tts", input: { sample_rate: 16000 } });
    } catch (e) {
      this.fail(e instanceof Error && e.name === "NotAllowedError" ? "Microphone permission was denied" : errorText(e));
    }
  }

  private async ask(text: string): Promise<void> {
    if (!text.trim()) return;
    this.reset();
    this._heard = text;
    this._phase = "thinking";
    try {
      await this.run({ start_stage: "intent", end_stage: this._config?.speak === false ? "intent" : "tts", input: { text } });
    } catch (e) {
      this.fail(errorText(e));
    }
  }

  private async run(msg: Record<string, unknown>): Promise<void> {
    const c = this._config!;
    this.unsub = await this.hass!.connection.subscribeMessage<PipelineEvent>((ev) => this.onEvent(ev), {
      type: "assist_pipeline/run",
      ...msg,
      ...(c.pipeline ? { pipeline: c.pipeline } : {}),
      ...(this.conversationId ? { conversation_id: this.conversationId } : {}),
    });
  }

  private onEvent(ev: PipelineEvent): void {
    const d = ev.data ?? {};
    if (ev.type === "run-start") {
      this.handlerId = d.runner_data?.stt_binary_handler_id ?? null;
      for (const pcm of this.pending) this.sendPcm(pcm);
      this.pending = [];
    }
    if (ev.type === "stt-vad-end" || ev.type === "stt-end") this.endAudio();
    if (ev.type === "stt-end") this._heard = d.stt_output?.text ?? "";
    if (ev.type === "intent-end") {
      const r = d.intent_output;
      this.conversationId = r?.conversation_id ?? this.conversationId;
      this._reply = r?.response?.speech?.plain?.speech ?? "";
    }
    if (ev.type === "tts-end" && d.tts_output?.url) this.play(d.tts_output.url);
    if (ev.type === "error") this.fail(d.message ?? d.code ?? "Assist error");
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
    const pcm = toPcm16(this.resampler.push(samples));
    if (this.handlerId === null) this.pending.push(pcm);
    else this.sendPcm(pcm);
  }

  private sendPcm(pcm: Int16Array): void {
    if (this.handlerId === null) return;
    this.hass?.connection.socket?.send(audioFrame(this.handlerId, pcm));
  }

  /** stop the microphone and tell HA the audio is complete */
  private endAudio(): void {
    clearTimeout(this.stopTimer);
    if (this.handlerId !== null && this.stream) this.hass?.connection.socket?.send(audioFrame(this.handlerId));
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
    const done = (): void => {
      if (this.audio !== audio) return;
      this.speaking = false;
      this._phase = "idle";
    };
    audio.onended = done;
    audio.onerror = done;
    // never stay stuck in "responding" if the audio device stalls
    const cap = window.setTimeout(done, 30000);
    audio.onloadedmetadata = () => {
      clearTimeout(cap);
      if (Number.isFinite(audio.duration)) window.setTimeout(done, audio.duration * 1000 + 3000);
    };
    audio.play().catch(done);
  }

  private fail(message: string): void {
    this._error = message;
    this._phase = "error";
    void this.teardown();
  }

  private reset(): void {
    this._heard = "";
    this._reply = "";
    this._error = "";
    this.pending = [];
    this.handlerId = null;
    this.speaking = false;
    this.audio?.pause();
  }

  private async teardown(): Promise<void> {
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
    if (canvas.width !== Math.round(w * k)) {
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
    return html`<div class="voice-wrap">
      <div class="head ink">
        <span class="title">${c.name ?? "Assist"}</span>
        <span class="sub status" aria-live="polite">${status}</span>
      </div>
      <button class="orb" ?disabled=${!!c.satellite} aria-label=${phase === "listening" ? "Stop listening" : "Talk to Assist"} @click=${() => void this.talk()}>
        <canvas class="viz" aria-hidden="true"></canvas>
        <span class="mic">${phase === "listening" ? ICONS.stop : ICONS.mic}</span>
      </button>
      <div class="lines ink" aria-live="polite">
        ${this._heard ? html`<div class="heard">&ldquo;${this._heard}&rdquo;</div>` : nothing}
        ${this._reply ? html`<div class="reply">${this._reply}</div>` : nothing}
        ${blocked === "insecure" && !this._heard && !this._reply
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
    </div>`;
  }

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
        grid-template-rows: auto 1fr auto auto;
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
        align-self: start;
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
        min-height: 88px;
        display: grid;
        place-items: center;
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
      .mic {
        position: relative;
        width: calc(var(--hv-ref) * 0.2);
        height: calc(var(--hv-ref) * 0.2);
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
