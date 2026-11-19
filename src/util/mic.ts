/**
 * One microphone capture: the stream, its source, the recorder and its handler, owned together.
 * Pattern from assistant-ui's `openMicrophone`: every step of opening checks the abort signal, an open
 * that fails or is cancelled releases what it already took, and `close()` (idempotent) detaches the
 * handler before disconnecting, so a closed capture never delivers audio again.
 */
import { RECORDER_WORKLET } from "./audio.ts";

export interface Mic {
  analyser: AnalyserNode;
  close(): void;
}

/** Opens the microphone into `ctx` and calls `onSamples` with mono audio at `ctx.sampleRate` until `close()`. */
export async function openMic(ctx: AudioContext, signal: AbortSignal, onSamples: (samples: Float32Array) => void): Promise<Mic> {
  let stream: MediaStream | undefined;
  const stopTracks = () => stream?.getTracks().forEach((t) => t.stop());
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
    signal.throwIfAborted();
    await ctx.resume(); // some browsers start contexts suspended
    signal.throwIfAborted();
    let closed = false;
    const push = (samples: Float32Array) => {
      if (!closed) onSamples(samples);
    };
    let node: AudioWorkletNode | ScriptProcessorNode;
    let detach = () => {};
    if (ctx.audioWorklet) {
      const url = URL.createObjectURL(new Blob([RECORDER_WORKLET], { type: "text/javascript" }));
      try {
        await ctx.audioWorklet.addModule(url);
      } finally {
        URL.revokeObjectURL(url);
      }
      signal.throwIfAborted();
      const worklet = new AudioWorkletNode(ctx, "homeview-recorder");
      worklet.port.onmessage = (e: MessageEvent<Float32Array>) => push(e.data);
      detach = () => (worklet.port.onmessage = null);
      node = worklet;
    } else {
      // Safari < 14.1: no worklet
      const processor = ctx.createScriptProcessor(4096, 1, 1);
      processor.onaudioprocess = (e) => push(e.inputBuffer.getChannelData(0));
      detach = () => (processor.onaudioprocess = null);
      processor.connect(ctx.destination);
      node = processor;
    }
    const source = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.6;
    source.connect(analyser);
    source.connect(node);
    const recorder = node;
    return {
      analyser,
      close() {
        if (closed) return;
        closed = true;
        detach();
        recorder.disconnect();
        source.disconnect();
        stopTracks();
      },
    };
  } catch (e) {
    stopTracks();
    throw e;
  }
}
