import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

// In desktop (Tauri) builds, audio metadata is read natively by Rust (lofty),
// so music-metadata-browser is stubbed out (no eval warning, smaller bundle).
const mmbStub = fileURLToPath(new URL("./src/mmb-stub.ts", import.meta.url));
const isTauriBuild = !!(process.env.TAURI_PLATFORM || process.env.TAURI_ENV_PLATFORM);

export default defineConfig({
  clearScreen: false,
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
    sourcemap: true
  }
});
