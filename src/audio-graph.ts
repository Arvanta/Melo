// Shared Web Audio graph: ONE unified, persistent chain for the entire application.
// Chain: source -> [10 EQ peaking filters] -> gainNode -> analyserNode -> destination

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
  resume(): void;
}

export function getAudioGraph(audio: HTMLAudioElement): AudioGraphEngine {
  if (!ctx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    ctx = new AudioContextClass();
    sourceNode = ctx.createMediaElementSource(audio);

    // Create 10 EQ Peaking Filters
    eqFilterNodes = frequencies.map((freq) => {
      const f = ctx!.createBiquadFilter();
      f.type = "peaking";
      f.frequency.value = freq;
      f.Q.value = 1.4;
      f.gain.value = 0;
      return f;
    });

    // Create Gain Node (for ReplayGain / Preamp)
    gainNode = ctx.createGain();
    gainNode.gain.value = 1.0;

    // Create Analyser Node (for Visualizer)
    analyserNode = ctx.createAnalyser();
    analyserNode.fftSize = 2048;
    analyserNode.smoothingTimeConstant = 0.72;

    // Connect entire chain linearly
    let prevNode: AudioNode = sourceNode;
    for (const filter of eqFilterNodes) {
      prevNode.connect(filter);
      prevNode = filter;
    }
    prevNode.connect(gainNode);
    gainNode.connect(analyserNode);
    analyserNode.connect(ctx.destination);
  }

  return {
    ctx: ctx!,
    filters: eqFilterNodes,
    gain: gainNode!,
    analyser: analyserNode!,
    resume() {
      if (ctx && ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
    },
  };
}
