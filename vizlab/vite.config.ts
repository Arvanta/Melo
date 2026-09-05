import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

// Dev-only config for the visualizer harness. Serves `vizlab/` as the site
// root (so the preview URL lands straight on the lab) while still allowing
// imports from ../src. Not used by the app build in any way.
const projectRoot = fileURLToPath(new URL("..", import.meta.url));

export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: false,
    host: "0.0.0.0",
    cors: true,
    // @ts-ignore - allow the sandbox preview host
    allowedHosts: true,
    fs: { allow: [projectRoot] },
  },
});
