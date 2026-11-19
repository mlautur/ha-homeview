/** Microphone audio -> 16 kHz mono PCM16 frames for the Assist pipeline. Pure, unit-tested. */

/** Streaming box-filter decimator from `inRate` to `outRate` (inRate >= outRate). */
export class Resampler {
  private ratio: number;
  private acc = 0;
  private n = 0;
  private pos = 0; // position inside the current output window, in input samples

  constructor(inRate: number, outRate = 16000) {
    this.ratio = inRate / outRate;
  }

  push(input: Float32Array): Float32Array {
    if (this.ratio <= 1) return input.slice();
    const out: number[] = [];
    for (let i = 0; i < input.length; i++) {
      this.acc += input[i];
      this.n++;
      this.pos += 1;
      if (this.pos >= this.ratio) {
        out.push(this.acc / this.n);
        this.acc = 0;
        this.n = 0;
        this.pos -= this.ratio;
      }
    }
    return Float32Array.from(out);
  }
}

/**
 * End of speech, decided on the device. Home Assistant's own VAD ends a browser command after
 * 0.7 s of silence and adds short pauses together, so it cuts people off mid-sentence; the card
 * streams with `no_vad` and asks this instead, from the level of 20 ms frames at 16 kHz.
 * `push` answers "listen", "end" (spoken, then `silence` seconds of quiet, or `max` reached)
 * or "none" (nothing spoken within `noSpeech` seconds, or by `max`): don't transcribe noise.
 */
export class Endpointer {
  heard = false;
  private floor = 0.01; // room level: drops at once, rises over about two seconds
  private sum = 0;
  private n = 0;
  private run = 0;
  private quiet = 0;
  private frames = 0;

  // ponytail: energy against an adaptive floor, not a speech model; a loud TV keeps it listening
  // until `max` (or a tap). Swap in a model VAD if that becomes the common case.
  readonly silence: number;
  readonly noSpeech: number;
  readonly max: number;
  constructor(silence = 1.2, noSpeech = 7, max = 15) {
    this.silence = silence;
    this.noSpeech = noSpeech;
    this.max = max;
  }

  push(samples: Float32Array): "listen" | "end" | "none" {
    for (const v of samples) {
      this.sum += v * v;
      if (++this.n < 320) continue;
      this.frame(Math.sqrt(this.sum / this.n));
      this.sum = 0;
      this.n = 0;
    }
    const elapsed = this.frames / 50;
    if (this.heard) return this.quiet >= this.silence - 1e-9 || elapsed >= this.max ? "end" : "listen";
    return elapsed >= Math.min(this.noSpeech, this.max) ? "none" : "listen";
  }

  private frame(rms: number): void {
    const dt = 0.02;
    this.frames++;
    if (rms > Math.max(this.floor * 3, 0.006)) {
      this.run += dt;
      if (this.run >= 0.1) {
        this.heard = true;
        this.quiet = 0;
      }
      return;
    }
    this.run = 0;
    this.floor = rms < this.floor ? rms : this.floor + (rms - this.floor) * (dt / 2);
    if (this.heard) this.quiet += dt;
  }
}

/** Float [-1, 1] -> little-endian PCM16. */
export function toPcm16(samples: Float32Array): Int16Array {
  const out = new Int16Array(samples.length);
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    out[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return out;
}

/** HA binary websocket frame: one handler-id byte followed by the audio bytes (empty = end of audio). */
export function audioFrame(handlerId: number, pcm?: Int16Array): Uint8Array {
  const bytes = pcm ? new Uint8Array(pcm.buffer, pcm.byteOffset, pcm.byteLength) : new Uint8Array(0);
  const out = new Uint8Array(1 + bytes.length);
  out[0] = handlerId;
  out.set(bytes, 1);
  return out;
}

/** Recorder worklet, loaded from a Blob URL so the card stays a single file. */
export const RECORDER_WORKLET = `
class HomeViewRecorder extends AudioWorkletProcessor {
  constructor() { super(); this.buf = []; this.len = 0; }
  process(inputs) {
    const ch = inputs[0] && inputs[0][0];
    if (ch) {
      this.buf.push(ch.slice(0)); this.len += ch.length;
      if (this.len >= 2048) {
        const out = new Float32Array(this.len); let o = 0;
        for (const b of this.buf) { out.set(b, o); o += b.length; }
        this.port.postMessage(out, [out.buffer]); this.buf = []; this.len = 0;
      }
    }
    return true;
  }
}
// added once per tap to the card's one AudioContext: the name is already taken from the second tap on
try { registerProcessor("homeview-recorder", HomeViewRecorder); } catch {}
`;
