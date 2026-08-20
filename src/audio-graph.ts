// Shared Web Audio graph: ONE unified chain for equalizer and visualizer,
// supporting multiple "decks" (HTMLAudioElement sources) fed into it for
// crossfade. Each deck gets its own GainNode (used to automate the
// crossfade fade curve); all decks then mix down into the same shared
// EQ filter bank -> master gain -> analyser -> destination chain that the
// equalizer / visualizer already read from.
//
// source(deck A) -> deckGain(A) -\
//                                  +-> [10 EQ peaking filters] -> masterGain -> analyser -> destination
// source(deck B) -> deckGain(B) -/

export const frequencies = [31, 62, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];

export interface Deck {
  source: MediaElementAudioSourceNode;
  gain: GainNode;
}

let ctx: AudioContext | null = null;
let eqFilterNodes: BiquadFilterNode[] = [];
let masterGainNode: GainNode | null = null;
let analyserNode: AnalyserNode | null = null;
const decks = new WeakMap<HTMLAudioElement, Deck>();

export interface AudioGraphEngine {
  ctx: AudioContext;
  filters: BiquadFilterNode[];
  gain: GainNode;
  analyser: AnalyserNode;
  resume(): Promise<void>;
  /** Get (or lazily create) the per-element deck feeding the shared chain. */
  getDeck(audio: HTMLAudioElement): Deck | null;
}

function ensureContext() {
  if (ctx) return;
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  ctx = new AudioContextClass();

  eqFilterNodes = frequencies.map((freq) => {
    const f = ctx!.createBiquadFilter();
    f.type = "peaking";
    f.frequency.value = freq;
    f.Q.value = 1.4;
    f.gain.value = 0;
    return f;
  });
  for (let i = 0; i < eqFilterNodes.length - 1; i++) {
    eqFilterNodes[i].connect(eqFilterNodes[i + 1]);
  }

  masterGainNode = ctx.createGain();
  masterGainNode.gain.value = 1.0;

  analyserNode = ctx.createAnalyser();
  analyserNode.fftSize = 2048;
  analyserNode.smoothingTimeConstant = 0.72;

  eqFilterNodes[eqFilterNodes.length - 1].connect(masterGainNode);
  masterGainNode.connect(analyserNode);
  analyserNode.connect(ctx.destination);
}

function ensureDeck(audio: HTMLAudioElement): Deck | null {
  ensureContext();
  const existing = decks.get(audio);
  if (existing) return existing;
  try {
    const source = ctx!.createMediaElementSource(audio);
    const gain = ctx!.createGain();
    gain.gain.value = 1.0;
    source.connect(gain);
    gain.connect(eqFilterNodes[0]);
    const deck: Deck = { source, gain };
    decks.set(audio, deck);
    return deck;
  } catch {
    return null;
  }
}

export function getAudioGraph(audio: HTMLAudioElement): AudioGraphEngine {
  ensureContext();
  ensureDeck(audio);
  return {
    ctx: ctx!,
    filters: eqFilterNodes,
    gain: masterGainNode!,
    analyser: analyserNode!,
    async resume() {
      if (ctx && ctx.state === "suspended") {
        await ctx.resume().catch(() => {});
      }
    },
    getDeck(el: HTMLAudioElement) {
      return ensureDeck(el);
    },
  };
}
