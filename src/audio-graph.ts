// Shared Web Audio graph: ONE AudioContext + ONE MediaElementSourceNode per audio element.
// An HTMLMediaElement can only be connected to a single MediaElementSourceNode,
// so the equalizer and the visualizer must build on the same chain:
// source -> [EQ filters -> gain] -> [analyser] -> destination
let ctx: AudioContext | null = null;
let source: MediaElementAudioSourceNode | null = null;
let tail: AudioNode | null = null;

export interface AudioGraph {
  ctx: AudioContext;
  /** append processor nodes in series after the current tail */
  append(nodes: AudioNode[]): AudioGraph;
  /** insert a pass-through node (e.g. analyser) between tail and destination */
  tap(node: AudioNode): AudioGraph;
  /** connect the current tail to the speakers */
  toDestination(): AudioGraph;
  resume(): void;
}

export function getAudioGraph(audio: HTMLAudioElement): AudioGraph {
  if (!ctx) {
    ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    source = ctx.createMediaElementSource(audio);
    tail = source;
  }
  const g: AudioGraph = {
    get ctx() { return ctx!; },
    append(nodes) {
      try { tail!.disconnect(); } catch {} // drop any previous tail->destination wiring
      let prev: AudioNode = tail!;
      for (const n of nodes) { prev.connect(n); prev = n; }
      tail = prev;
      return g;
    },
    tap(node) {
      try { tail!.disconnect(); } catch {}
      tail!.connect(node);
      node.connect(ctx!.destination);
      tail = node;
      return g;
    },
    toDestination() {
      try { tail!.disconnect(); } catch {}
      tail!.connect(ctx!.destination);
      return g;
    },
    resume() { if (ctx!.state === "suspended") ctx!.resume(); }
  };
  return g;
}
