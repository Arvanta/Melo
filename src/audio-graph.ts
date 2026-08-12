// Shared Web Audio graph: ONE unified chain for equalizer and visualizer.
// source -> [10 EQ peaking filters] -> gainNode -> analyserNode -> destination

export const frequencies = [31, 62, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];

let ctx: AudioContext | null = null;
let sourceNode: MediaElementAudioSourceNode | null = null;
let eqFilterNodes: BiquadFilterNode[] = [];
let gainNode: GainNode | null = null;
let analyserNode: AnalyserNode | null = null;

export interface AudioGraphEngine {
  ctx: AudioContext;
  filters: BiquadFilterNode[];
  gain: GainNode;
  analyser: AnalyserNode;
  resume(): Promise<void>;
}

export function getAudioGraph(audio: HTMLAudioElement): AudioGraphEngine {
  if (!ctx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    ctx = new AudioContextClass();

    try {
      sourceNode = ctx.createMediaElementSource(audio);
    } catch {}

    eqFilterNodes = frequencies.map((freq) => {
      const f = ctx!.createBiquadFilter();
      f.type = "peaking";
      f.frequency.value = freq;
      f.Q.value = 1.4;
      f.gain.value = 0;
      return f;
    });

    gainNode = ctx.createGain();
    gainNode.gain.value = 1.0;

    analyserNode = ctx.createAnalyser();
    analyserNode.fftSize = 2048;
    analyserNode.smoothingTimeConstant = 0.72;

    if (sourceNode) {
      let prevNode: AudioNode = sourceNode;
      for (const filter of eqFilterNodes) {
        prevNode.connect(filter);
        prevNode = filter;
      }
      prevNode.connect(gainNode);
      gainNode.connect(analyserNode);
      analyserNode.connect(ctx.destination);
    }
  }

  return {
    ctx: ctx!,
    filters: eqFilterNodes,
    gain: gainNode!,
    analyser: analyserNode!,
    async resume() {
      if (ctx && ctx.state === "suspended") {
        await ctx.resume().catch(() => {});
      }
    },
  };
}
