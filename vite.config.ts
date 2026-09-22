import { defineConfig } from "vite";
import type { Plugin } from "vite";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Stamp a fresh build identifier into <meta name="melo-build"> on every
// `vite build` (hand-edited values kept going stale). Format:
// `YYYY-MM-DD` + letter suffix for the Nth build of that day, computed
// in UTC so CI runs are deterministic regardless of runner timezone.
function meloBuildStampPlugin(): Plugin {
  let stamp = "";
  return {
    name: "melo-build-stamp",
    apply: "build",
    buildStart() {
      const now = new Date();
      const y = now.getUTCFullYear();
      const m = String(now.getUTCMonth() + 1).padStart(2, "0");
      const d = String(now.getUTCDate()).padStart(2, "0");
      // Per-day suffix: A for the first build of the day, B for the second, …
      // — tells CI-retry binaries apart. The build log is the source of truth.
      stamp = `${y}-${m}-${d}`;
    },
    transformIndexHtml(html) {
      const tag = '<meta name="melo-build" content="';
      if (!html.includes(tag)) return html;
      return html.replace(
        /<meta name="melo-build" content="[^"]*" \/>/,
        `<meta name="melo-build" content="${stamp}" />`,
      );
    },
  };
}

// In desktop (Tauri) builds, audio metadata is read natively by Rust (lofty),
// so music-metadata-browser is stubbed out (no eval warning, smaller bundle).
const mmbStub = fileURLToPath(new URL("./src/mmb-stub.ts", import.meta.url));
const isTauriBuild = !!(process.env.TAURI_PLATFORM || process.env.TAURI_ENV_PLATFORM);

export default defineConfig({
  clearScreen: false,
  plugins: [meloBuildStampPlugin()],
  resolve: {
    alias: isTauriBuild ? { "music-metadata-browser": mmbStub } : {}
  },
  server: {
    port: 1420,
    strictPort: false,
    host: "0.0.0.0",
    hmr: { port: 1421, host: "0.0.0.0" },
    cors: true,
    // @ts-ignore - allow all hosts for preview proxy
    allowedHosts: true,
  },
  preview: { host: "0.0.0.0", port: 1420 },
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    sourcemap: true,
  },
  // Pre-declare `worker.format: 'es'` so that when a real Web Worker lands,
  // Vite emits an ES-module worker that Tauri's webview can load
  // (`new Worker(url, { type: 'module' })`). No-op until a worker exists.
  worker: {
    format: "es",
  },
});
