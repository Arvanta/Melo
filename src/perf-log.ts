// Round 130: tiny shared writer for `melo-perf.log` (see library_db.rs `perf`).
// Lines are batched (1.5 s, max 50 per flush, queue capped) and never throw.
// Used by the player for diagnostics: playback errors and queue/advance anomalies.
let queue: string[] = [];
let timer = 0;
const win = (() => { try { return new URLSearchParams(location.search).get("panel") || "main"; } catch { return "main"; } })();

function send(cmd: string, args: Record<string, unknown>): Promise<unknown> {
  const inv = (window as any).__TAURI_INTERNALS__?.invoke;
  return inv ? Promise.resolve(inv(cmd, args)) : Promise.resolve(null);
}

export function perfNote(line: string) {
  if (queue.length > 200) return;
  queue.push(`${win}: ${line}`);
  if (timer) return;
  timer = window.setTimeout(() => {
    timer = 0;
    const lines = queue.splice(0, 50);
    void send("perf_log", { lines }).catch(() => {});
  }, 1500);
}

/** Asks the backend what is on disk for a file that failed to play (exists / size / can be opened). */
export function perfProbeFile(path: string) {
  void send("perf_probe_file", { path }).catch(() => {});
}

/** Database queue length (the number the queue views show), or null if unavailable. */
export async function dbQueueTotal(): Promise<number | null> {
  try {
    const page: any = await send("queue_tracks", { limit: 1, offset: 0 });
    return typeof page?.total === "number" ? page.total : null;
  } catch { return null; }
}
