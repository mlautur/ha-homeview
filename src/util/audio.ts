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
registerProcessor("homeview-recorder", HomeViewRecorder);
`;
