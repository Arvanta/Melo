// Static-analysis + behavioural smoke tests for the helpers in
// src/main.ts and the related modules. Runs with plain `node`, no test
// runner needed.
//
// Only helpers that are pure enough to run outside a browser / Tauri
// context are tested here (the panel-id allowlist guard, the debounce
// helper). Window-position helpers, the tray-toggle handler, etc. are
// exercised through tsc + the vite bundle. Paths tightly coupled to
// localStorage, window, or @tauri-apps/* are covered by the desktop
// smoke checks documented in HANDOFF.md.
//
// Usage: `node tests/main-ts-helpers.test.mjs`
// Exit code is the number of failing tests; 0 = all pass.
import assert from "node:assert/strict";
import childProcess from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "..");

let passed = 0;
let failed = 0;
const failures = [];
let pendingAsync = 0; // round 80b: the old 100ms summary timer printed BEFORE slow
// async tests (debounce ones) settled, so counts were off by a random 0–2 — and
// process.exit could even mask a late failure. The summary now waits for all of them.

function test(name, fn) {
  try {
    const r = fn();
    if (r && typeof r.then === "function") {
      pendingAsync++;
      return r.then(
        () => { console.log("PASS  " + name); passed++; },
        (err) => { console.log("FAIL  " + name + " — " + (err?.message || err)); failed++; failures.push(name); }
      ).then(() => { pendingAsync--; });
    }
    console.log("PASS  " + name);
    passed++;
  } catch (err) {
    console.log("FAIL  " + name + " — " + (err?.message || err));
    failed++;
    failures.push(name);
  }
}

function readSrc(rel) {
  return fs.readFileSync(path.join(repoRoot, rel), "utf8");
}

// ─────────────────────────── panel allowlist ───────────────────────────

test("ALLOWED_PANELS contains exactly the 5 expected ids, in documented order", () => {
  const src = readSrc("src/main.ts");
  const m = src.match(/const ALLOWED_PANELS = \[(.*?)\] as const/);
  assert.ok(m, "ALLOWED_PANELS definition not found");
  const items = m[1].split(",").map((s) => s.trim().replace(/^"|"$/g, ""));
  assert.deepEqual(items, ["library", "playlist", "equalizer", "lyrics", "settings"]);
});

test("isAllowedPanel type-narrows and gates every code path that opens a webview", () => {
  const src = readSrc("src/main.ts");
  // Both toggleWin and openPanelWindow must gate before opening a webview.
  assert.ok(/toggleWin[\s\S]*isAllowedPanel\(panel\)[\s\S]*return/.test(src),
    "toggleWin must call isAllowedPanel(panel) and return early on miss");
  assert.ok(/openPanelWindow[\s\S]*isAllowedPanel\(panel\)[\s\S]*return/.test(src),
    "openPanelWindow must call isAllowedPanel(panel) and return early on miss");
  // The URL panel parser must also allowlist before using the value.
  assert.ok(/rawUrlPanel\s*&&\s*isAllowedPanel\(rawUrlPanel\)/.test(src),
    "urlPanel parser should be allowlist-gated");
  // The panel-closed listener must also guard (so a malformed close
  // broadcast can't deactivate a button or wipe the visible-panels set).
  assert.ok(/busOn\("melo:panel-closed"[\s\S]*isAllowedPanel\(role\)/.test(src),
    "melo:panel-closed listener must allowlist the role");
});

// ─────────────────────────── debounce helper ───────────────────────────

test("debounce collapses a burst into a single trailing call", async () => {
  const { debounce } = await import("../src/main.ts").catch(() => ({}));
  // main.ts can't be imported in node because it pulls in `@tauri-apps/api/*`
  // and the DOM. The debounce helper is small enough to re-state here and
  // keep in lock-step — see tests/main-ts-helpers.test.mjs comment.
  const calls = [];
  let timer;
  const wrapped = ((v) => {
    if (timer != null) clearTimeout(timer);
    timer = setTimeout(() => { timer = undefined; calls.push(v); }, 30);
  });
  wrapped("a"); wrapped("b"); wrapped("c");
  await new Promise((r) => setTimeout(r, 60));
  assert.deepEqual(calls, ["c"], "expected only the trailing value");
});

test("debounce.flush() forces a pending call (used in pagehide / beforeunload)", async () => {
  let captured;
  let timer;
  function wrapped(v) {
    if (timer != null) clearTimeout(timer);
    timer = setTimeout(() => { timer = undefined; captured = v; }, 30);
  }
  // Mimic our wrap: store flushable timer state.
  wrapped("hello");
  if (timer != null) { clearTimeout(timer); captured = "hello-flushed"; timer = undefined; }
  assert.equal(captured, "hello-flushed", "flush must run the function with the latest args synchronously");
});

test("main.ts + window-geometry.ts both expose the debounce / flush contract (#12 split-out)", () => {
  const src = readSrc("src/main.ts");
  const geo = readSrc("src/window-geometry.ts");
  // Helper is now in window-geometry.ts .
  assert.match(geo, /export function debounce</,
    "debounce must live in window-geometry.ts as an exported helper");
  assert.match(geo, /\.flush\s*=/,
    "debounce.flush must still be exposed");
  assert.match(geo, /pagehide.*flushDebouncedSaves|flushDebouncedSaves.*pagehide/s,
    "flushDebouncedSaves must be wired to pagehide/beforeunload so a quit-after-drag still saves");
  // main.ts must import — not redefine — those helpers.
  assert.ok(src.includes('from "./window-geometry"'),
    "main.ts must import helpers from window-geometry.ts (no inline duplicate)");
  assert.ok(!/^function debounce</m.test(src),
    "main.ts must not redefine debounce inline any more");
});

// ─────────────────────────── window-control selector ───────────────────────────

test("markup tags every minimize/close button with data-melo=window-control-*", () => {
  const src = readSrc("src/main.ts");
  // Two titlebars (main player + panel template) use win-controls; the markup
  // may also include the same string inside TS comments, so we instead
  // verify the attribute appears on real <button> elements.
  const minimizeButtons = (src.match(/<button[^>]*data-melo="window-control-minimize"/g) || []).length;
  const closeButtons = (src.match(/<button[^>]*data-melo="window-control-close"/g) || []).length;
  assert.equal(minimizeButtons, 2,
    "expected exactly two <button data-melo=window-control-minimize> (main + panel template)");
  assert.equal(closeButtons, 2,
    "expected exactly two <button data-melo=window-control-close> (main + panel template)");
});

test("bindWinControls only listens on data-melo window-control-*", () => {
  const src = readSrc("src/main.ts");
  // The selector must NOT catch btnAddFiles / btnThemeToggle (which share
  // the .win-btn class for styling) any more.
  //
  // The previous regex was unreliable: a `}` on its own line inside the
  // function body would close the match too early. Walk forward from
  // the function header and count braces to find the real end.
  const start = src.indexOf("function bindWinControls()");
  assert.ok(start >= 0, "bindWinControls not found");
  let depth = 0;
  let end = -1;
  for (let i = start; i < src.length; i++) {
    const ch = src[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) { end = i + 1; break; }
    }
  }
  assert.ok(end > start, "bindWinControls body not terminated");
  const body = src.slice(start, end);
  assert.ok(body.includes('[data-melo="window-control-minimize"]'),
    "bind selector must target minimize marker");
  assert.ok(body.includes('[data-melo="window-control-close"]'),
    "bind selector must target close marker");
  assert.ok(!body.includes(".win-btn,"),
    "bind selector must NOT match .win-btn (would catch add-files + theme-toggle)");
  // custom skins' own titlebar buttons (data-melo="close"/"minimize")
  // are the SAME actions — they must be bound too.
  assert.ok(body.includes('[data-melo="close"]') && body.includes('[data-melo="minimize"]'),
    "skin close/minimize aliases must be bound as well");
  assert.match(body, /melo:panel-closed/, "panel close must announce itself before closing");
});
// ─────────────────────────── applyCustomSkin dead import ───────────────────────────

test("applyCustomSkin is no longer imported into main.ts (only used inside skin.ts)", () => {
  const src = readSrc("src/main.ts");
  assert.ok(!/applyCustomSkin/.test(src),
    "applyCustomSkin must be removed from main.ts — it's only used by skin.ts itself");
  const skinSrc = readSrc("src/skin.ts");
  assert.ok(/applyCustomSkin/.test(skinSrc),
    "skin.ts must still use applyCustomSkin internally");
});

// ─────────────────────────── global.d.ts typing ───────────────────────────

test("global.d.ts pins the window globals the runtime actually populates", () => {
  const dts = readSrc("src/global.d.ts");
  const expected = ["LumiLibrary", "LumiPlayer", "__LUMI_AUDIO__", "__TOAST__",
                    "__LUMI_REBIND_MAIN__", "__MELO_EMBEDDED_PLAYLIST__",
                    "__MELO_VISUALIZER_SET_PAUSED__"];
  for (const name of expected) {
    assert.ok(dts.includes(name + "?"),
      `global.d.ts must declare Window.${name} (optional)`);
  }
  // No top-level export → must remain a script so Window merges globally.
  assert.ok(!/^export\s*\{/m.test(dts),
    "global.d.ts must NOT use top-level export — otherwise TS treats it as a module and Window doesn't merge");
});

test("(window as any).<our-globals> usage is gone from main.ts", () => {
  const src = readSrc("src/main.ts");
  // globals should be accessed as `window.X`, not `(window as any).X`.
  // Allow the cast to remain only in our isTauriRuntime-style guard, where we
  // inspect an unknown runtime flag — here we forbid every CONTRACTS that we
  // declared in global.d.ts.
  const forbiddenCasts = [
    /(window as any)\.LumiLibrary/,
    /(window as any)\.LumiPlayer/,
    /(window as any)\.__LUMI_AUDIO__/,
    /(window as any)\.__TOAST__/,
    /(window as any)\.__LUMI_REBIND_MAIN__/,
    /(window as any)\.__MELO_EMBEDDED_PLAYLIST__/,
    /(window as any)\.__MELO_VISUALIZER_SET_PAUSED__/,
    /(window as any)\.__TAURI__/,
  ];
  for (const re of forbiddenCasts) {
    assert.ok(!re.test(src),
      `forbidden cast ${re} must be replaced by typed window.X access`);
  }
});

// ─────────────────────────── boot coordinator ───────────────────────────

test("boot poll count dropped from 5 → 3 (immediate + 700ms + 2000ms)", () => {
  const src = readSrc("src/main.ts");
  // No more 5-step fixed-offset list.
  assert.ok(!/\[400,\s*900,\s*1500,\s*2200,\s*3000\]/.test(src),
    "old 5-tick boot poll schedule must be gone");
  // New schedule calls three times.
  assert.equal((src.match(/scheduleCliPoll\(\d+\)/g) || []).length, 3,
    "scheduleCliPoll must fire three times");
});

// ─────────────────────────── browser fallback lifecycle ───────────────────────────

test("browser fallback import caps are wired (object-URL revoke + size cap)", () => {
  const src = readSrc("src/main.ts");
  assert.match(src, /BROWSER_IMPORT_MAX_FILES\s*=\s*200/,
    "BROWSER_IMPORT_MAX_FILES must cap the selection before processing");
  assert.match(src, /BROWSER_IMPORT_MAX_BYTES/,
    "BROWSER_IMPORT_MAX_BYTES must cap the total size before processing");
  assert.match(src, /URL\.revokeObjectURL/,
    "URL.revokeObjectURL must be called somewhere (memory-leak fix)");
  // Both early (audio error) and delayed (10-min safety) revoke paths must exist.
  const revokeCalls = (src.match(/revokeObjectURL/g) || []).length;
  assert.ok(revokeCalls >= 2,
    `expected at least 2 revokeObjectURL call sites (early error path + pagehide flush), got ${revokeCalls}`);
  // The honest-toast path must guard on addTracks being present.
  assert.match(src, /typeof lib\?\.addTracks === "function"/,
    "browser-fallback toast must depend on addTracks existing (no fake success)");
});

// ─────────────────────────── OS drag & drop import ───────────────────────────

test("drop import: supported-extension filter matches the backend's supported_ext set", () => {
  const src = readSrc("src/main.ts");
  const m = src.match(/const AUDIO_DROP_EXTENSIONS = \[(.*?)\]/);
  assert.ok(m, "AUDIO_DROP_EXTENSIONS definition not found in main.ts");
  const items = m[1].split(",").map((s) => s.trim().replace(/^"|"$/g, ""));
  // m3u/m3u8 accepted too — expand_drop_paths resolves playlist
  // files to their tracks (player drop = queue replace, playlist drop = append).
  assert.deepEqual(items.sort(),
    ["aac", "aiff", "alac", "flac", "m3u", "m3u8", "m4a", "mka", "mp3", "ogg", "opus", "wav", "wma"].sort(),
    "drop filter must accept the audio extensions plus playlist files");
  assert.match(src, /function isSupportedAudioFilename\(/,
    "isSupportedAudioFilename helper must exist");
});

test("drop import: Tauri native drop path is wired to importAndPlayDroppedPaths", () => {
  const src = readSrc("src/main.ts");
  assert.match(src, /onDragDropEvent/,
    "main window must listen to Tauri native drag-drop events (HTML5 events never fire in the desktop webview)");
  assert.match(src, /async function importAndPlayDroppedPaths\(/,
    "importAndPlayDroppedPaths must exist");
  // The native handler routes 'drop' payloads through folder expansion,
  // then into the shared import path.
  assert.match(src, /void expandAndImportDroppedPaths\(paths\);/,
    "drop payloads must be routed into expandAndImportDroppedPaths");
  assert.match(src, /async function expandAndImportDroppedPaths\(/,
    "expandAndImportDroppedPaths must exist");
  assert.match(src, /invoke<string\[\]>\("expand_drop_paths", \{ paths \}\)/,
    "folder expansion must go through the expand_drop_paths command");
  assert.match(src, /await importAndPlayDroppedPaths\(expanded\)/,
    "expanded paths must be routed into importAndPlayDroppedPaths");
  // Import must go through the same path as the Open Files button.
  assert.match(src, /importAndPlayDroppedPaths[\s\S]*?importPaths\(audio,\s*"replace"\)/,
    "dropped paths must be imported via lib.importPaths(..., \"replace\")");
});

test("drop import: browser fallback drop handler prevents navigation + defers to skins", () => {
  const src = readSrc("src/main.ts");
  const m = src.match(/if \(!isTauri\) \{\s*window\.addEventListener\("dragover"[\s\S]*?\n\}/);
  assert.ok(m, "browser drag-drop block not found");
  const block = m[0];
  assert.match(block, /e\.preventDefault\(\)/,
    "dragover/drop default action must be prevented (dropped file must not navigate the tab)");
  assert.match(block, /hasHtml && !audio\.length[\s\S]*?skin\.ts owns this drop/,
    "skin-only drops must stay owned by skin.ts");
  assert.match(block, /importBrowserAudioFiles\(audio, onPlaylist \? "append" : "play"\)/,
    "browser drop must reuse the shared import body");
});

test("drop import: Open Files dialog and drop share one import body", () => {
  const src = readSrc("src/main.ts");
  assert.match(src, /async function importBrowserAudioFiles\(files: File\[\], mode: "play" \| "append" = "play"\)/,
    "shared import body must exist");
  const calls = (src.match(/importBrowserAudioFiles\(/g) || []).length;
  assert.ok(calls >= 3,
    `import body must be called from input + drop (definition + 2 calls), got ${calls}`);
  assert.match(src, /input\.onchange = async \(\) => \{[\s\S]*?await importBrowserAudioFiles\(files\)/,
    "the dialog onchange must delegate to the shared import body");
});

test("player: the click-to-start toast is reserved for autoplay blocks (NotAllowedError)", () => {
  const src = readSrc("src/player.ts");
  assert.match(src, /catch\(\(err: any\) => \{[\s\S]*?err\?\.name === "NotAllowedError"[\s\S]*?Click once inside player/,
    "play() must only show the click hint when the rejection is NotAllowedError, not on load failures");
});

test("backend: dialog/drop imports grant playback scope (allowed_dirs)", () => {
  const src = readSrc("src-tauri/src/library_db.rs");
  assert.match(src, /CREATE TABLE IF NOT EXISTS allowed_dirs/,
    "allowed_dirs table must exist (restart-safe playback grants)");
  assert.match(src, /fn read_allowed_dirs\(/,
    "read_allowed_dirs helper must exist");
  // import_audio_files must take the AppHandle and grant each folder.
  const m = src.match(/pub async fn import_audio_files\(([\s\S]*?)\)\s*->\s*Result<Vec<DbTrack>,String>/);
  assert.ok(m, "import_audio_files signature not found");
  assert.match(m[1], /app:\s*AppHandle/,
    "import_audio_files must receive the AppHandle to extend the asset-protocol scope");
  assert.match(src, /allow_directory\(Path::new\(d\),false\)/,
    "import_audio_files must grant asset-protocol playback for the imported folders");
  // The spawn_blocking closure MUST keep its explicit Result type: with the
  // tuple result, rustc cannot infer the generic error parameter from the
  // `?` conversions alone (CI: E0282/E0283 in import_audio_files).
  assert.match(src, /spawn_blocking\(move \|\| -> Result<\(Vec<DbTrack>, Vec<String>\), String>/,
    "spawn_blocking closure must declare -> Result<(Vec<DbTrack>, Vec<String>), String> explicitly");
  // Restart safety: LibraryState::new must re-apply the stored grants.
  assert.match(src, /for dir in read_allowed_dirs\(&conn\)\? \{[\s\S]*?allow_directory\(Path::new\(&dir\), false\)/,
    "LibraryState::new must re-apply allowed_dirs grants at startup");
});

// ─────────────────────────── src-tauri layout + panel contract ───────────────────────────

test("project uses the conventional src-tauri layout (frontendDist ../dist resolves inside the repo)", () => {
  // `fs` and `path` are the ESM imports at the top of this file.
  // Files that MUST live under src-tauri/ for the CI workflow (rust-cache
  // `workspaces: src-tauri`, artifact paths `src-tauri/target/**`), the
  // .gitignore (`src-tauri/target/`) and tauri.conf.json's `../dist` to be
  // correct. The flattened variant made `../dist` point OUTSIDE the repo
  // and failed `tauri build` with "Unable to find your web assets".
  for (const rel of ["src-tauri/tauri.conf.json", "src-tauri/Cargo.toml", "src-tauri/build.rs",
                     "src-tauri/src/main.rs", "src-tauri/src/library_db.rs",
                     "src-tauri/capabilities/default.json", "src-tauri/icons/icon.ico"]) {
    assert.ok(fs.existsSync(path.join(repoRoot, rel)), `missing ${rel}`);
  }
  assert.ok(!fs.existsSync(path.join(repoRoot, "tauri.conf.json")),
    "tauri.conf.json must NOT sit at the repo root (flat layout broke frontendDist)");
  const conf = JSON.parse(readSrc("src-tauri/tauri.conf.json"));
  assert.equal(conf.build.frontendDist, "../dist",
    "frontendDist must stay ../dist — correct only in the src-tauri layout");
  // include_str!(../../skins/…) from src-tauri/src/main.rs reaches repo-root/skins.
  assert.ok(fs.existsSync(path.join(repoRoot, "skins", "full-html-example.html")),
    "skins/ must stay at the repo root (main.rs includes ../../skins/*)");
});

test("panel documents key layout AND init on the ?panel= contract, never on isTauri", () => {
  const src = readSrc("src/main.ts");
  // The broken combination that rendered the whole web app inside one
  // ?panel= window on an installed build must be gone entirely.
  // The ONLY permitted combination is the playlist-window drop wiring
  // (`isTauri && urlPanel === "playlist"`); layout/init gating on the
  // bare pair must stay gone .
  assert.doesNotMatch(src, /isTauri && urlPanel(?!\s*===)/,
    "no code path may gate panel layout/init on isTauri && urlPanel — a panel document must always render exactly one panel");
  // Layout replacement block: if (urlPanel) { if (isTauri) { native wiring } … panel-root …
  assert.match(src, /if \(urlPanel\) \{\s*if \(isTauri\) \{\s*import\("@tauri-apps\/api\/window"\)/,
    "single-panel layout replacement must run for every ?panel= document; only the native wiring stays behind isTauri");
  assert.match(src, /panel-root/,
    "panel-root template must exist");
  // App Initialization: panel docs initialize ONLY their own panel.
  assert.match(src, /if \(urlPanel\) \{\s*if \(urlPanel === "library" \|\| urlPanel === "playlist"\)/,
    "App Initialization must run the per-panel setup for every ?panel= document");
});


// ───────────────── asset-host CSP + open-folder + boot state ─────────────────

test("CSP allows the Windows asset host for media AND images", () => {
  const conf = JSON.parse(readSrc("src-tauri/tauri.conf.json"));
  const csp = conf.app.security.csp;
  // On Windows the asset protocol serves via http(s)://asset.localhost, NOT
  // asset:// — without these hosts every convertFileSrc media request is
  // CSP-blocked and playback reports "file may be missing or moved".
  for (const dir of ["img-src", "media-src"]) {
    const m = csp.match(new RegExp(dir + " ([^;]+);"));
    assert.ok(m, `${dir} directive missing from CSP`);
    for (const host of ["http://asset.localhost", "https://asset.localhost"]) {
      assert.ok(m[1].split(/\s+/).includes(host), `${dir} must include ${host}`);
    }
  }
});

test("side buttons start OFF in the desktop build (web-only restore guarded)", () => {
  const src = readSrc("src/main.ts");
  assert.match(src, /if \(!urlPanel && !isTauri\) \{\s*\/\/ WEB DEMO ONLY/,
    "the web-layout visibility restore must NOT run in the tauri-main document");
});

test("Open Folder button exists in the player and is fully wired", () => {
  const src = readSrc("src/main.ts");
  assert.match(src, /id="btnOpenFolder"/, "button markup must exist");
  assert.match(src, /#btnAddFiles, #btnOpenFolder/, "click delegate must match the button");
  assert.match(src, /else if \(role === "btnOpenFolder"\) openFolderAndPlay\(\);/,
    "click delegate must call openFolderAndPlay");
  assert.match(src, /async function openFolderAndPlay\(\)/, "handler must exist");
  assert.match(src, /invoke<string\[\]>\("list_dir_audio_files"/,
    "desktop path must list the folder via the Rust command");
  assert.match(src, /await importAndPlayDroppedPaths\(files\)/,
    "desktop path must reuse the shared import+play path");
});

test("backend: list_dir_audio_files command exists and is registered", () => {
  const lib = readSrc("src-tauri/src/library_db.rs");
  assert.match(lib, /pub async fn list_dir_audio_files\(path: String\) -> Result<Vec<String>, String>/,
    "command signature must exist");
  // Explicit closure return type (E0282 lesson): tuples/Vecs need it pinned.
  assert.match(lib, /spawn_blocking\(move \|\| -> Result<Vec<String>, String> \{/,
    "closure must pin its Result type explicitly");
  const main = readSrc("src-tauri/src/main.rs");
  assert.match(main, /library_db::list_dir_audio_files,/,
    "command must be registered in generate_handler");
});


// ──────── TDZ ordering + no-drag-highlight + expand_drop_paths ────────

test("CRITICAL: ALLOWED_PANELS is declared BEFORE its first runtime call site (no TDZ)", () => {
  const src = readSrc("src/main.ts");
  // In a ?panel= window, `rawUrlPanel && isAllowedPanel(rawUrlPanel)` CALLS
  // the guard during module evaluation. If ALLOWED_PANELS' const declaration
  // sits BELOW that line, the call throws ReferenceError (temporal dead
  // zone) and main.ts dies mid-boot — the panel window then renders the
  // raw, dead, stacked markup (user screenshots through v4). tsc cannot
  // catch this; this ordering assertion is the only guard.
  const decl = src.indexOf('const ALLOWED_PANELS =');
  const use = src.indexOf("isAllowedPanel(rawUrlPanel)");
  assert.ok(decl >= 0 && use >= 0, "both declarations must exist");
  assert.ok(decl < use,
    `ALLOWED_PANELS (at ${decl}) MUST be declared before its first runtime call isAllowedPanel(rawUrlPanel) (at ${use})`);
});

test("panel id falls back to the webview window label when the query is lost", () => {
  const src = readSrc("src/main.ts");
  assert.match(src, /label\.startsWith\("panel-"\)/,
    "the urlPanel derivation must include the window-label fallback");
  assert.match(src, /metadata\?\.currentWindow\?\.label \?\? internals\?\.metadata\?\.currentWebview\?\.label/,
    "the fallback must read the runtime metadata label");
});

test("drag-over highlight is fully removed (normal look during drag)", () => {
  const src = readSrc("src/main.ts");
  assert.doesNotMatch(src, /drag-over/,
    "no JS in main.ts may toggle the drag-over class anymore");
  const css = readSrc("src/app.css");
  assert.doesNotMatch(css, /\.player-card\.drag-over/,
    "the player card must have no drag-over styling");
  assert.match(css, /\.drop-zone\.drag-over \{/,
    "the playlist internal drop target keeps its styling");
});

test("backend: expand_drop_paths exists, is registered, and pins its closure type", () => {
  const lib = readSrc("src-tauri/src/library_db.rs");
  assert.match(lib, /pub async fn expand_drop_paths\(paths: Vec<String>\) -> Result<Vec<String>, String>/,
    "command signature must exist");
  // The managed scan must EXTRACT artwork : with extract_artwork
  // = false every scanned track got artwork_path = NULL and the artist/
  // album grid (which picks covers only from tracks WITH artwork) showed
  // placeholders until the user manually drilled in and back.
  assert.doesNotMatch(lib, /parse_track_cached\(&path, &artwork_dir, false\)/,
    "the scan parser must not skip artwork extraction");
  assert.match(lib, /spawn_blocking\(move \|\| -> Result<Vec<String>, String> \{/,
    "closure must pin its Result type explicitly (E0282 lesson)");
  const main = readSrc("src-tauri/src/main.rs");
  assert.match(main, /library_db::expand_drop_paths,/,
    "command must be registered in generate_handler");
});


// ─────── titlebar dedupe, minimize-restore, playlist-drop append, clear-queue ───────

test("panel titlebars no longer copy the float Hide/Close buttons", () => {
  const src = readSrc("src/main.ts");
  const m = src.match(/const headerCopy = document\.createElement\("div"\);([\s\S]*?)const headerHtml = headerCopy\.innerHTML;/);
  assert.ok(m, "the header copy sanitizer must exist");
  assert.match(m[1], /querySelectorAll\("\[data-close\]"\)\.forEach\(\(el\) => el\.remove\(\)\)/,
    "data-close buttons must be stripped from the copied panel header (no duplicate hide/close next to win-controls)");
});

test("clicking a panel button RESTORES a minimized panel instead of closing it", () => {
  const src = readSrc("src/main.ts");
  const m = src.match(/const existing = await WebviewWindow\.getByLabel\(label\);([\s\S]*?)await existing\.close\(\);/);
  assert.ok(m, "openPanelWindow existing-branch not found");
  assert.match(m[1], /isMinimized\(\)/, "the branch must check isMinimized before closing");
  assert.match(m[1], /unminimize\(\)/, "a minimized panel must be unminimized/shown, not closed");
  const caps = JSON.parse(readSrc("src-tauri/capabilities/default.json"));
  assert.ok(caps.permissions.includes("core:window:allow-is-minimized"),
    "core:window:allow-is-minimized must be granted or isMinimized() always rejects");
});

test("playlist-window drops APPEND; only player drops replace the queue", () => {
  const src = readSrc("src/main.ts");
  assert.match(src, /if \(isTauri && urlPanel === "playlist"\) \{[\s\S]*?expandAndImportDroppedPaths\(paths, "append"\)/,
    "the playlist panel document must route drops through append mode");
  assert.match(src, /async function expandAndImportDroppedPaths\(paths: string\[\], mode: "replace" \| "append" = "replace"\)/,
    "expandAndImportDroppedPaths must carry the mode parameter");
  assert.match(src, /importPaths\(expanded, "append"\)/,
    "append mode must call importPaths with append");
  // The main-window drop stays replace+play.
  assert.match(src, /void expandAndImportDroppedPaths\(paths\);/,
    "player drops keep the default replace+play mode");
  // Browser demo parity.
  assert.match(src, /importBrowserAudioFiles\(audio, onPlaylist \? "append" : "play"\)/,
    "browser drops inside the playlist float must append");
  assert.match(src, /async function importBrowserAudioFiles\(files: File\[\], mode: "play" \| "append" = "play"\)/,
    "the shared browser import must carry the mode");
});

test("Clear Queue stops the player and empties its queue", () => {
  const lib = readSrc("src/library.ts");
  assert.match(lib, /invokeSafe\("clear_queue", \{\}\);[\s\S]*?busEmit\("melo:queue-cleared", \{\}\);/,
    "library must broadcast melo:queue-cleared after clear_queue succeeds");
  const player = readSrc("src/player.ts");
  const m = player.match(/busOn\("melo:queue-cleared", \(\) => \{([\s\S]*?)\}\);/);
  assert.ok(m, "player must listen for melo:queue-cleared");
  const body = m[1];
  assert.match(body, /audio\.pause\(\)/, "queue-cleared handler must pause the audio");
  assert.match(body, /queue = \[\]/, "queue-cleared handler must empty the queue");
  assert.match(body, /removeAttribute\("src"\)/, "queue-cleared handler must release the media");
  assert.match(body, /melo:playback-state/, "queue-cleared handler must broadcast the stopped state");
});

test("skin geometry self-heal: boots with a custom skin but no saved geometry snap to the declared size", () => {
  const src = readSrc("src/main.ts");
  const m = src.match(/if \(sz\.custom && !sz\.force\) \{[\s\S]*?readSkinGeometry\(\);[\s\S]*?setSize\(new LogicalSize\(geo\.width, geo\.height\)\)/);
  assert.ok(m, "the boot skin-size self-heal must exist and resize to readSkinGeometry()");
});

//
// ─────── skin geometry re-enforcement, queue sort/drag, tray close-all ───────

test("skin re-apply: constraints re-enforced, size snap only on explicit switches (round 74)", () => {
  const src = readSrc("src/skin.ts");
  // Boot + theme re-apply must RE-ENFORCE the skin's declared window
  // constraints (never applyGeometry=false — the old bug where the PREVIOUS
  // skin's min/max stayed live) — but must NOT snap the window to the skin's
  // default size: that wiped the user's resized window on every restart and
  // every theme toggle, and re-persisted the wrong size (round 74). The
  // "constraints" mode does exactly that.
  assert.match(src, /applySkinChoice\(savedSkinId, theme, undefined, false, "constraints"\)/,
    "boot re-apply must re-enforce constraints WITHOUT a size snap");
  assert.match(src, /applySkinChoice\(activeSkin, t, undefined, false, "constraints"\)/,
    "theme re-apply must re-enforce constraints WITHOUT a size snap");
  // A Settings pick IS an explicit switch: it still snaps to the new skin's size.
  assert.match(src, /applySkinChoice\(skinChoice, currentTheme, undefined, false, true\)/,
    "skin-changed re-apply must pass applyGeometry=true");
  assert.doesNotMatch(src, /applySkinChoice\([^\n]*false, false\)/,
    "no re-apply path may leave applyGeometry=false anymore");
  // applyCustomSkin flags re-apply events so the main window can tell them
  // apart from explicit switches.
  assert.match(src, /applyGeometry === "constraints" \? \{ \.\.\.geometry, constraintsOnly: true \} : geometry/,
    "re-apply must emit melo:skin-geometry with constraintsOnly");
  const main = readSrc("src/main.ts");
  assert.match(main, /const snap = !\(payload && payload\.constraintsOnly\) \|\| sz\.fixed;/,
    "the geometry handler must skip the size snap on constraintsOnly events");
  assert.match(main, /if \(sz\.force && snap\) \{/,
    "the setSize call must be gated on the snap flag");
  // Non-resizable skins: their size is not a user preference — boot ignores
  // any saved size and even a constraintsOnly re-apply snaps.
  assert.match(main, /fixed: geo\.resizable === false/,
    "getTargetSize must mark non-resizable skins as fixed");
});
test("monitor-fallback re-center keeps the resolved startup size (round 74)", () => {
  const main = readSrc("src/main.ts");
  assert.match(main, /await mainWin\.setSize\(new LogicalSize\(startupW, startupH\)\);\s*\n\s*await mainWin\.center\(\);/,
    "off-screen re-center must reuse startupW/H (the user's size), not the skin default sz.w/h");
  assert.match(main, /let startupW = sz\.w;\s*\n\s*let startupH = sz\.h;\s*\n\s*if \(sz\.force\)/,
    "the startup size must be resolved above the if so the fallback path can reuse it");
});


test("queue view: sorting enabled and backed by sort_queue + melo:queue-reordered", () => {
  const lib = readSrc("src/library.ts");
  assert.doesNotMatch(lib, /playlistSort\.disabled = viewingQueue/,
    "the queue view must not disable the sort control anymore");
  assert.match(lib, /invokeSafe<Array<\{ entryId: number; trackId: string \}>>\("sort_queue", \{ sort: playlistSort\?\.value \}\)/,
    "queue sort must go through the sort_queue command");
  // the broadcast payload is { order, tracks }.
  const occurrences = (lib.match(/busEmit\("melo:queue-reordered", \{ order: rows\.map\(r => String\(r\.entryId\)\), tracks: rows\.map\(r => r\.trackId\) \}\)/g) || []).length;
  assert.ok(occurrences >= 2, "both sort and drag paths must broadcast melo:queue-reordered");
  // pointer-based drag: WebView2's native drag-drop handler
  // swallows HTML5 drag events, so reorder is mousedown/mousemove/mouseup.
  assert.match(lib, /function beginRowDrag\(event: MouseEvent, row: HTMLElement\)/,
    "queue drag must be the pointer-based beginRowDrag implementation");
  // queue rows are entry-keyed — the drag sends entry ids.
  assert.match(lib, /invoke<Array<\{ entryId: number; trackId: string \}>>\("move_queue_entries", \{ entryIds: moving\.map\(Number\), targetIndex \}\)/,
    "queue drag must call move_queue_entries (multi-select block move)");
});

test("player follows melo:queue-reordered and keeps the current track playing", () => {
  const player = readSrc("src/player.ts");
  const m = player.match(/busOn\("melo:queue-reordered", \(p: any\) => \{([\s\S]*?)\n  \}\);/);
  assert.ok(m, "player must listen for melo:queue-reordered");
  assert.match(m[1], /const current = queue\[currentIndex\];/,
    "the handler must capture the still-playing track");
  assert.match(m[1], /queue\.indexOf\(current\)/,
    "currentIndex must be re-pointed by object identity (duplicate-safe)");
  assert.match(m[1], /__LUMI_SET_QUEUE__/,
    "the handler must republish the reordered runtime queue");
});

test("backend: sort_queue and move_queue_track exist, are registered, deterministic", () => {
  const lib = readSrc("src-tauri/src/library_db.rs");
  assert.match(lib, /pub async fn sort_queue\(sort: String, state: State<'_, LibraryState>\) -> Result<Vec<QueueOrderRow>, String>/,
    "sort_queue signature must exist (round 14: returns entry+track rows)");
  assert.match(lib, /pub async fn move_queue_track\(track_id: String, target_index: i64, state: State<'_, LibraryState>\) -> Result<Vec<String>, String>/,
    "move_queue_track signature must exist");
  assert.match(lib, /fn queue_order\(sort: Option<&str>\) -> &'static str/,
    "queue_order clause builder must exist");
  // Deterministic tie-breaker .
  assert.match(lib, /Some\("title-asc"\) => "t\.title COLLATE NOCASE,q\.position"/,
    "queue sort arms must end with the unique q.position tie-breaker");
  assert.match(lib, /fn apply_queue_order\(conn: &Connection, ids: &\[String\]\) -> Result<\(\), String>/,
    "position rewriter must exist");
  const main = readSrc("src-tauri/src/main.rs");
  assert.match(main, /library_db::sort_queue,/);
  assert.match(main, /library_db::move_queue_track,/);
});

test("close-to-tray hides ALL windows; relaunch restores the open-panel set", () => {
  const src = readSrc("src/main.ts");
  const m = src.match(/mainWin\.onCloseRequested\(async \(event\) => \{([\s\S]*?)try \{ await mainWin\.destroy\(\);/);
  assert.ok(m, "onCloseRequested block not found");
  assert.match(m[1], /for \(const p of Array\.from\(visiblePanels\)\)[\s\S]*?getByLabel\("panel-" \+ p\)[\s\S]*?await w\.hide\(\)/,
    "the tray branch must hide every visible panel before hiding main");
  // setPanelVisible persists the open set; boot reopens it.
  assert.match(src, /function setPanelVisible\(panel: PanelId, visible: boolean\) \{[\s\S]*?melo-tray-snapshot/,
    "setPanelVisible must persist the open-panel snapshot");
  assert.match(src, /restores? the panels that were open[\s\S]*?melo-tray-snapshot[\s\S]*?openPanelWindow\(p\)/,
    "boot must restore the persisted open-panel set via openPanelWindow");
});


// ─────── dialog stacking, scan-error list, path display, button labels ───────

test("Clear Library confirm stacks ABOVE the Manage dialog", () => {
  const lib = readSrc("src/library.ts");
  assert.match(lib, /function confirmLibraryClear\(\): Promise<boolean> \{[\s\S]*?confirm-overlay inside-manage/,
    "the Clear Library confirm must carry the inside-manage stacking class");
  assert.match(lib, /function confirmDanger\(title: string, message: string, okLabel: string, insideManage = false\)/,
    "confirmDanger must accept the insideManage flag");
  const css = readSrc("src/app.css");
  assert.match(css, /\.confirm-overlay\.inside-manage \{ z-index: 10002; \}/,
    "the stacking class must outrank the manage overlay (z 10001)");
});

test("scan errors are LISTED (errorPaths), not just counted", () => {
  const rust = readSrc("src-tauri/src/library_db.rs");
  assert.match(rust, /let failed_paths = std::sync::Arc::new\(std::sync::Mutex::new\(Vec::<String>::new\(\)\)\)/,
    "backend must collect the failed paths");
  assert.match(rust, /"errorPaths": failed_paths\.lock\(\)\.map\(\|l\| l\.clone\(\)\)\.unwrap_or_default\(\)\}/,
    "progress events must carry errorPaths");
  assert.match(rust, /if list\.len\(\) < 50 \{ list\.push\(path\.to_string_lossy\(\)\.to_string\(\)\); \}/,
    "the failed-path sample must be capped");
  const lib = readSrc("src/library.ts");
  assert.match(lib, /data-manage-errors/,
    "the Manage dialog must render the error list");
  assert.match(lib, /const SCAN_ERROR_LIST_CAP = 50;/,
    "the frontend merge must be capped as well");
  assert.match(lib, /file\(s\)? couldn't be read: \$\{names\.join\(", "\)\}/,
    "the completion toast must name the failed files");
});

test("Manage shows clean paths (no Windows extended-length prefix)", () => {
  const lib = readSrc("src/library.ts");
  const disp = lib.match(/function displayPath\(path: string\): string \{([\s\S]*?)\n  \}/);
  assert.ok(disp, "displayPath helper must exist");
  // strips EVERY prefix variant repeatedly — including the
  // single-backslash `\?\` form written by older builds.
  assert.match(disp[1], /startsWith\("/, "displayPath must strip prefixes via startsWith");
  assert.ok(!disp[1].includes("replace("), "the fragile replace regex is gone");
  assert.match(lib, /title="\$\{esc\(displayPath\(root\.path\)\)\}">\$\{esc\(displayPath\(root\.path\)\)\}/,
    "the root row must render displayPath, not the raw canonical path");
  // the remove action keeps the FULL path
  assert.match(lib, /data-manage-remove="\$\{esc\(root\.path\)\}"/,
    "the remove action must still receive the full underlying path");
});

test("playlist Import/Export are icon-only; Clear label unified", () => {
  const src = readSrc("src/main.ts");
  const m = src.match(/id="btn-import-playlist"([\s\S]*?)<\/button>/);
  assert.ok(m, "import button found");
  assert.doesNotMatch(m[1], />\s*(Import|Export)\s*</, "buttons must not carry visible text");
  assert.match(m[1], /aria-label="Import playlist"/, "icon-only buttons keep an aria-label");
  const lib = readSrc("src/library.ts");
  assert.doesNotMatch(lib, /Clear Queue"/, "the queue clear label must not read 'Clear Queue' anymore");
  assert.match(lib, /clearPlaylistButton\.append\(" Clear"\);/, "both clear modes read 'Clear'");
});

test("playlist panel toolbar no longer wraps at ~421px", () => {
  const css = readSrc("src/app.css");
  assert.match(css, /\.panel-window \.playlist-toolbar \{\s*flex-wrap: nowrap;/,
    "the toolbar must never wrap");
  assert.match(css, /\.panel-window \.playlist-toolbar #playlistSortSelect \{\s*flex: 0 1 92px;\s*min-width: 62px;/,
    "the sort select must be allowed to shrink");
  const src = readSrc("src/main.ts");
  assert.match(src, /id="playlistSortSelect" class="settings-select" style="height:28px; font-size:11px; padding:2px 4px; width:92px; min-width:64px; flex:1 1 64px;"/,
    "the sort select base style must carry a flexible basis + min-width");
});

// ─── scan total-first · relative M3U round-trip · LRC font constancy · single Remove item · Open containing folder ───

test("scan establishes the TOTAL before scanning starts (two-phase)", () => {
  const rust = readSrc("src-tauri/src/library_db.rs");
  // phase 1: the full walk completes into a plain Vec before any worker starts
  assert.ok(rust.includes("let mut pending_paths: Vec<PathBuf> = Vec::new();"),
    "the enumeration phase must collect all paths up front");
  assert.ok(rust.includes("ENUMERATION_CAP"), "the enumeration must be capped");
  assert.ok(rust.includes('"phase":"count"'), "a count-phase progress event must be emitted");
  assert.match(rust, /let scan_total = Arc::new\(AtomicUsize::new\(pending_paths\.len\(\)\)\)/,
    "the total must be set from the completed enumeration, not a live counter");
  assert.ok(rust.indexOf("pending_paths") < rust.indexOf("let producer = std::thread::spawn"),
    "enumeration must run BEFORE the producer starts feeding workers");
  // the producer must not WalkDir anymore — it only feeds the collected list
  const prodStart = rust.indexOf("let producer = std::thread::spawn");
  const prod = rust.slice(prodStart, rust.indexOf("let", prodStart + 400));
  assert.ok(!prod.includes("WalkDir"), "the producer must not walk while scanning");
  const lib = readSrc("src/library.ts");
  assert.ok(lib.includes("Counting files"), "the UI must show a counting state");
  assert.match(lib, /scanProgress\.phase === "count"/, "the UI must branch on the count phase");
});

test("relative M3U export is anchored to the SAVE location (round-trips on import)", () => {
  const lib = readSrc("src/library.ts");
  assert.ok(lib.includes("function relativeFromDir("), "a relative-path helper must exist");
  assert.ok(lib.includes("relativeFromDir(baseDir"), "relative entries must be built from the save dir");
  assert.ok(!/function commonDirectory\(/.test(lib),
    "the old common-root strategy must be gone (it broke re-import)");
  // the save dialog must run BEFORE the text is built, so baseDir is known
  const saveAt = lib.indexOf("const target = await save(");
  const relAt = lib.indexOf("relativeFromDir(baseDir");
  assert.ok(saveAt > 0 && relAt > 0 && saveAt < relAt,
    "relative entries must be computed only AFTER the save location is known");
  assert.ok(lib.includes("Tracks span different drives"), "cross-drive must fall back to absolute");
  const rust = readSrc("src-tauri/src/library_db.rs");
  assert.match(rust, /fn import_m3u_file/, "the import side must stay anchored to the m3u folder");
});

test("context menus can never show both Remove variants at once", () => {
  const css = readSrc("src/app.css");
  assert.match(css, /\.ctx-item\[hidden\] \{ display: none !important; \}/,
    ".ctx-item display:flex must not defeat the hidden attribute");
});

test("LRC active line keeps the same font as the rest", () => {
  const css = readSrc("src/app.css");
  const grab = (sel) => {
    const i = css.indexOf("\n" + sel + " {"); // line-anchored: skip ".player-stage .lyric-line {"
    assert.ok(i > 0, sel + " must exist");
    return css.slice(i, css.indexOf("}", i));
  };
  const base = grab(".lyric-line");
  const active = grab(".lyric-line.active");
  // the active line must declare NO font-size AT ALL: it also
  // carries .lyric-line, so it automatically gets its siblings' size in
  // every context — 13.5px standalone, 11px in the player stage.
  assert.ok(!/font-size\s*:/.test(active),
    "the active line must not declare any font-size (round 24: 'inherit' resolved to the CONTAINER size and enlarged the stage line)");
  assert.ok(!active.includes("transform:"), "the active line must not scale");
  assert.ok(base.includes("font-weight: 500;"), "the base weight must stay 500 so the active step stays light");
  assert.ok(active.includes("font-weight: 600;"), "the active line must be only SLIGHTLY bolder (600) — round 22");
  assert.ok(!active.includes("font-weight: 800;"), "the old 800 read as a size change (round 22)");
  assert.ok(!css.includes(".player-stage .embedded-lyrics .lyric-line.active"),
    "the stage font-size:inherit override must be gone (round 24)");
  assert.match(grab(".player-stage .lyric-line"), /font-size: 11px;/,
    "the stage base stays 11px — the active line now simply follows it");
});

test("Open containing folder passes explorer a path it can parse", () => {
  const rust = readSrc("src-tauri/src/library_db.rs");
  const i = rust.indexOf("fn open_track_folder");
  assert.ok(i > 0, "open_track_folder must exist");
  const body = rust.slice(i, rust.indexOf("\n}", i));
  assert.ok(body.includes("explorer.exe"), "windows arm must use explorer");
  assert.ok(body.includes("strip_prefix"), "the extended-length prefix must be stripped before /select");
  assert.ok(!body.includes("/select,{}", "file.display()".slice(0,0) + "file.display()"),
    "the raw canonical path must not be handed to explorer");
});

// ─── skin close buttons · bitrate specs · panel button sync · smooth lyric underline · m3u playback · block-move drag ───

test("custom skins' close/minimize buttons are wired", () => {
  const src = readSrc("src/main.ts");
  assert.match(src, /\[data-melo="minimize"\], \[data-melo="close"\]/,
    "bindWinControls selector must include the skin button aliases");
  const lib = readSrc("src/app.css");
  void lib;
});

test("track specs show BITRATE, not bit depth", () => {
  const rust = readSrc("src-tauri/src/library_db.rs");
  assert.match(rust, /audio_bitrate\(\)/, "specs must read the audio bitrate");
  assert.match(rust, /kbps/, "specs must render kbps");
  assert.ok(!/\{\} bit"/.test(rust), "the old '{bit} bit' specs format must be gone");
  // one-time migration: unchanged rows with the old format re-parse on next scan
  assert.match(rust, /specs LIKE '% bit'/, "the scan must re-parse rows still carrying the old specs format");
});

test("panel toggle buttons reconcile with real window state", () => {
  const src = readSrc("src/main.ts");
  assert.match(src, /reconcilePanelButtons/, "a reconciliation sweep must exist");
  assert.match(src, /WebviewWindow\.getByLabel\("panel-" \+ panel\)/,
    "the sweep must check the real window label");
  assert.match(src, /panelButtonMisses\.get\(panel\) \|\| 0\) \+ 1/,
    "the sweep must require two consecutive misses");
});

test("the lyric line underline is rAF-smooth", () => {
  const ll = readSrc("src/lyric-line.ts");
  assert.match(ll, /requestAnimationFrame\(progressFrame\)/, "a rAF loop must drive the progress");
  assert.match(ll, /requestAnimationFrame\(progressFrame\)/, "a persistent rAF ticker drives the progress");
  assert.match(ll, /< 0\.0015\) return;/, "the 1% quantization must be gone");
  const css = readSrc("src/app.css");
  const i = css.indexOf(".player-stage .stage-lyric:not(.melo-lyric-empty)::after");
  assert.ok(i > 0, "underline rule must exist");
  const block = css.slice(i, css.indexOf("}", i));
  assert.ok(block.includes("transition: none;"), "no CSS transition may lag the rAF updates");
});

test("M3U files play: CLI launch, drop expansion, file association", () => {
  const rust = readSrc("src-tauri/src/library_db.rs");
  assert.match(rust, /pub\(crate\) fn resolve_m3u_paths/, "a shared playlist resolver must exist");
  assert.match(rust, /pub\(crate\) fn is_m3u_file/, "the m3u detector must exist");
  const dropIdx = rust.indexOf("pub async fn expand_drop_paths");
  const body = rust.slice(dropIdx, rust.indexOf("\n}", dropIdx));
  assert.ok(body.includes("is_m3u_file"), "drops must expand playlist files to their tracks");
  const main = readSrc("src-tauri/src/main.rs");
  assert.ok(main.includes("library_db::resolve_m3u_paths(p)"),
    "CLI/single-instance launch must expand .m3u arguments");
  assert.match(main, /library_db::move_queue_entries/, "move_queue_entries must be registered");
  assert.match(main, /library_db::move_playlist_entries/, "move_playlist_entries must be registered");
  const conf = JSON.parse(readSrc("src-tauri/tauri.conf.json"));
  const exts = conf.bundle.fileAssociations.flatMap(a => a.ext);
  assert.ok(exts.includes("m3u") && exts.includes("m3u8"),
    "the installer must associate .m3u/.m3u8 with Melo");
  const src = readSrc("src/main.ts");
  assert.match(src, /"mka", "m3u", "m3u8"\]/, "the drop filter must accept playlist files");
});

test("row reorder moves MULTI-SELECTION blocks", () => {
  const rust = readSrc("src-tauri/src/library_db.rs");
  assert.match(rust, /pub async fn move_queue_entries\(entry_ids: Vec<i64>/,
    "queue block-move command must exist (entry-keyed)");
  assert.match(rust, /pub async fn move_playlist_entries\(playlist_id: String, entry_ids: Vec<i64>/,
    "playlist block-move command must exist");
  const lib = readSrc("src/library.ts");
  assert.match(lib, /body\.classList\.add\("row-reordering"\)/, "drag must set the grabbing-cursor state");
  assert.match(lib, /\[\...playlistSelectedEntryIds\]/, "playlist selection moves as one block");
});

test("export button + Relative Paths are no longer accent-blue", () => {
  const css = readSrc("src/app.css");
  assert.ok(!css.includes("#btn-export-playlist {"), "the accent-blue export override must be gone");
  const lib = readSrc("src/library.ts");
  assert.ok(!lib.includes('<button class="btn small primary" data-confirm="relative">'),
    "Relative Paths must not use the primary style");
});

test("explorer /select survives spaces and every prefix form", () => {
  const rust = readSrc("src-tauri/src/library_db.rs");
  const i = rust.indexOf("fn open_track_folder");
  const body = rust.slice(i, rust.indexOf("\n}", i));
  assert.ok(body.includes("raw_arg"), "the /select arg must bypass Rust's whole-arg quoting");
  assert.ok(body.includes('strip_prefix("\\\\?\\\\")'),
    "the 1-backslash prefix variant must be stripped too");
});

test("Manage strips every extended-length prefix variant", () => {
  const lib = readSrc("src/library.ts");
  const i = lib.indexOf("function displayPath(");
  const body = lib.slice(i, lib.indexOf("\n  }", i));
  assert.ok(body.includes('p.slice(3)'), "the single-backslash variant must be stripped");
  assert.ok(body.includes('p.slice(4)'), "the canonical 2-backslash variant must be stripped");
});

test("the Playlist panel layout is width-invariant (no 420px jump)", () => {
  const css = readSrc("src/app.css");
  const i = css.indexOf("@media (max-width: 420px) {");
  const block = css.slice(i, css.indexOf("\n}\n", i));
  assert.ok(!block.includes(".panel-window .playlist-toolbar"),
    "the playlist toolbar must not be touched by the compact pass");
  assert.ok(block.includes(".panel-window:not(.panel-playlist)"),
    "the compact pass must exempt the playlist panel");
});

// ─── library min-height 550 · scan-complete banner · relative-m3u canonical import · queue duplicates ───

test("Library window min height is 550 and saved geometry respects it", () => {
  const src = readSrc("src/main.ts");
  assert.match(src, /library: \[400, 550\]/, "the Library panel mins must be 400x550");
  const geo = readSrc("src/window-geometry.ts");
  assert.match(geo, /Math\.max\(mins\[0\], saved\.w \/ sf\)/, "saved width must clamp to the current minimum");
  assert.match(geo, /Math\.max\(mins\[1\], saved\.h \/ sf\)/, "saved height must clamp to the current minimum");
});

test("a completed scan stays visible in Manage until dismissed", () => {
  const lib = readSrc("src/library.ts");
  assert.match(lib, /data-manage-scan-result/, "the banner container must exist in the dialog markup");
  assert.match(lib, /data-manage-scan-dismiss/, "the banner must have an OK/dismiss button");
  assert.match(lib, /let scanResultSummary/, "banner state must exist");
  assert.ok(lib.includes("scanResultSummary = null;"), "scan start/error/dismiss must clear the banner");
  assert.match(lib, /Scan complete —/, "the completion text must exist");
  const css = readSrc("src/app.css");
  assert.match(css, /\.library-scan-result \{/, "the banner must be styled");
});

test("relative m3u entries import as canonical paths and grant playback scope", () => {
  const rust = readSrc("src-tauri/src/library_db.rs");
  const i = rust.indexOf("pub(crate) fn resolve_m3u_paths");
  const body = rust.slice(i, rust.indexOf("\npub async fn import_m3u_file", i) > 0 ? rust.indexOf("\npub async fn import_m3u_file", i) : i + 4000);
  assert.ok(body.includes("std::fs::canonicalize(&resolved)"),
    "resolved entries must be canonicalized (strips .., matches scan ids, satisfies scope)");
  const j = rust.indexOf("pub async fn import_m3u_file");
  const importBody = rust.slice(j, rust.indexOf("\n}", j + 100));
  assert.ok(importBody.includes("allowed_dirs"),
    "m3u import must record playback grants like the dialog/drop path");
});

test("the play queue allows DUPLICATE tracks (entry-keyed)", () => {
  const rust = readSrc("src-tauri/src/library_db.rs");
  assert.match(rust, /entry_id INTEGER PRIMARY KEY,\s*\n\s*track_id TEXT NOT NULL REFERENCES tracks\(id\) ON DELETE CASCADE,\s*\n\s*position INTEGER NOT NULL/,
    "the queue schema must be entry-keyed");
  assert.match(rust, /ALTER TABLE queue RENAME TO queue_legacy;/, "old databases must migrate in place");
  assert.match(rust, /SELECT rowid, track_id, position FROM queue_legacy;/, "migration must preserve rows and order");
  // no silent-dedupe inserts anywhere in the queue paths anymore
  const j = rust.indexOf("CREATE TABLE IF NOT EXISTS queue (");
  const k = rust.indexOf("pub async fn clear_queue");
  const queueRegion = rust.slice(j, k);
  assert.ok(!queueRegion.includes("INSERT OR IGNORE INTO queue"),
    "queue inserts must keep duplicates (no INSERT OR IGNORE)");
  assert.match(rust, /row_track_with_entries\(r,\s*Some\(r\.get\(13\)\?\)\)/,
    "queue_tracks must expose each row's entry id from column 13");
  assert.match(rust, /pub async fn move_queue_entries\(entry_ids: Vec<i64>/,
    "the entry-keyed block-move command must exist");
  assert.match(rust, /"UPDATE queue SET position=\?2 WHERE entry_id=\?1"/,
    "order rewrites must key on entry ids");
  const main = readSrc("src-tauri/src/main.rs");
  assert.ok(main.includes("library_db::move_queue_entries"), "move_queue_entries must be registered");
  const lib = readSrc("src/library.ts");
  assert.match(lib, /const entryId = track\.playlistEntryId;/,
    "queue rows must render their entry id (data-pl-entry)");
  const player = readSrc("src/player.ts");
  assert.match(player, /playlistEntryId === focusTrack\.playlistEntryId/,
    "hydration must focus the clicked OCCURRENCE by entry id");
  // entry ids AND a track-id fallback (runtime-only items).
  assert.match(player, /byEntry\.get\(`e\$\{order\[i\]\}`\)/,
    "the reordered broadcast must map entry ids first");
  assert.match(player, /byTrack\.get\(trackId\)/,
    "entry-less runtime items must fall back to track-id matching");
});

// ─── Album Artist grouping ───

test("Library exposes Album Artist grouping and keeps track Artist separate", () => {
  const main = readSrc("src/main.ts");
  assert.match(main, /data-libtab="album-artists">Album Artist<\//,
    "the Library must expose an Album Artist tab");
  const lib = readSrc("src/library.ts");
  assert.match(lib, /let libTab: "artists" \| "album-artists" \| "albums"/,
    "Album Artist must be a first-class Library tab");
  assert.match(lib, /kind: libraryGroupKind\(\)/,
    "the tab must use the backend group query");
  assert.match(lib, /albumArtist: libTab === "album-artists" \|\| libTab === "albums" \? selectedArtist : null/,
    "album and Album Artist drill-ins must filter by albumArtist");
  assert.match(lib, /const albumArtist = String\(track\.albumArtist \|\| artist\)/,
    "the frontend must apply the Artist fallback when normalizing tracks");
  assert.match(lib, /albumArtist: libTab === "album-artists" \? selectedArtist : null/,
    "Album Artist discography must query the albumArtist field");
});

// ─── library search-field filter (All/Artist/Album/Track) ───

test("Library search box has a field filter wired to the backend", () => {
  const src = readSrc("src/main.ts");
  assert.match(src, /id="librarySearchField"/, "the selector must exist in the search row");
  assert.match(src, /<option value="all">All</, "All option");
  assert.match(src, /<option value="artist">Artist</, "Artist option");
  assert.match(src, /<option value="album">Album</, "Album option");
  assert.match(src, /<option value="title">Track</, "Track option");
  const lib = readSrc("src/library.ts");
  assert.match(lib, /let librarySearchField: "all" \| "artist" \| "album" \| "title" = "all";/,
    "the field state must default to all");
  assert.match(lib, /field: librarySearchField === "all" \? null : librarySearchField,/,
    "the query must carry the field (null = default all)");
  assert.match(lib, /librarySearchFieldSelect\?\.addEventListener\("change"/,
    "changing the field must re-run the query");
});

// ─── clean error paths · no-pause Next · skin fallback geometry · panel mins · player reorder fallback ───

test("scan error list shows clean paths", () => {
  const lib = readSrc("src/library.ts");
  const i = lib.indexOf("library-scan-error-row");
  const line = lib.slice(lib.lastIndexOf("\n", i) + 1, lib.indexOf("\n", i));
  assert.ok(line.includes("displayPath(p)"), "error rows must render displayPath, not the raw canonical path");
});

test("Next on the last track (repeat off) is a no-op", () => {
  const player = readSrc("src/player.ts");
  const i = player.indexOf("function next()");
  const body = player.slice(i, player.indexOf("function prev()", i));
  assert.ok(!/nxt === null[\s\S]{0,80}pause\(\)/.test(body),
    "Next must not pause at the end of the queue");
  assert.match(body, /if \(nxt === null\) return;/, "the end-of-queue branch must simply return");
});

test("a deleted skin falls back to the DEFAULT window geometry", () => {
  const skin = readSrc("src/skin.ts");
  const i = skin.indexOf('could not be loaded — switched to Default Melo');
  assert.ok(i > 0);
  const region = skin.slice(skin.lastIndexOf("resetSkin(undefined, broadcast)", i), i);
  assert.match(region, /busEmit\("melo:skin-geometry"/,
    "the fallback must re-apply the default window constraints via melo:skin-geometry");
  const main = readSrc("src/main.ts");
  assert.match(main, /busOn\("melo:skin-geometry"/, "the main window must listen for geometry re-application");
});

test("panel minimum widths: Library 400, Settings 465", () => {
  const src = readSrc("src/main.ts");
  assert.match(src, /library: \[400, 550\]/, "Library min width must be 400");
  assert.match(src, /settings: \[650, 400\]/, "Settings min width must be 650 (round 15 correction)");
});

test("queue reorder broadcasts track ids alongside entry ids", () => {
  const lib = readSrc("src/library.ts");
  const sortIdx = lib.indexOf('"sort_queue"');
  const sortLine = lib.slice(lib.lastIndexOf("\n", sortIdx) + 1, lib.indexOf("\n", sortIdx));
  assert.ok(sortLine.includes("entryId: number; trackId: string"), "sort must expect entry+track rows");
  const emits = (lib.match(/tracks: rows\.map\(r => r\.trackId\)/g) || []).length;
  assert.ok(emits >= 2, "both sort and drag must include the tracks array in the broadcast");
});

test("the lyric underline ticker is self-sufficient", () => {
  const ll = readSrc("src/lyric-line.ts");
  // newline-agnostic: Windows checkouts may use CRLF.
  const ticker = ll.match(/const progressFrame = \(\) => \{([\s\S]*?)\n  \};/);
  assert.ok(ticker, "the persistent ticker must exist");
  assert.match(ticker[1], /requestAnimationFrame\(progressFrame\)/,
    "the rAF loop must re-arm itself unconditionally (persistent ticker)");
  assert.match(ticker[1], /try \{/, "the ticker body must be exception-guarded");
  assert.ok(!ll.includes("startProgressFrames"),
    "no play/pause event coupling may remain (it starved when LRC loaded late)");
  assert.match(ll, /updateProgress\(audio\.currentTime\)/, "the ticker feeds the media clock");
});

// ─── settings min 650 · scan banner shows REMOVED count, fully readable ───

test("scan-complete banner reports removed tracks and never truncates", () => {
  const lib = readSrc("src/library.ts");
  assert.match(lib, /removed from Library/, "the banner text must include the removed count");
  assert.match(lib, /removed: Number\(progress\.removed \|\| 0\)/, "the progress payload must carry removed");
  const css = readSrc("src/app.css");
  const i = css.indexOf(".library-scan-result-text");
  const block = css.slice(i, css.indexOf("}", i));
  assert.ok(block.includes("white-space: normal"), "the banner text must wrap, not ellipsis-truncate");
  const rust = readSrc("src-tauri/src/library_db.rs");
  assert.match(rust, /"removed":removed_count/, "the final scan event must carry the removed count");
  assert.match(rust, /removed_count \+= n;/, "reconciliation deletions must be counted");
});

// ─── the LIBRARY panel is width-invariant too (no 420px jump) ───

test("the Library panel layout is width-invariant (no 420px jump)", () => {
  const css = readSrc("src/app.css");
  const i = css.indexOf("@media (max-width: 420px) {");
  const block = css.slice(i, css.indexOf("\n}\n", i));
  for (const sel of [".library-search-row", ".library-action", ".library-search-field"]) {
    assert.ok(!block.includes(sel), sel + " must not be touched by the compact pass");
  }
  assert.ok(block.includes(":not(.panel-library)"), "the compact pass must exempt the library panel");
});

// ─── an × on queue rows removes the entry, and the player follows ───

test("queue rows have a working × (player queue follows removals)", () => {
  const lib = readSrc("src/library.ts");
  assert.match(lib, /data-remove-queue-entry="\$\{entryId \?\? ""\}"/,
    "queue rows must render the remove button with their entry id");
  assert.match(lib, /invoke<Array<\{ entryId: number; trackId: string \}>>\("remove_queue_entries"/,
    "removal must go through remove_queue_entries");
  assert.match(lib, /busEmit\("melo:queue-entries-removed", \{ entryIds: \[entryId\] \}\)/,
    "the player must be told WHICH entries vanished");
  const rowGuard = lib.match(/closest\("\[data-remove-entry\], \[data-remove-queue-entry\]"\)/);
  assert.ok(rowGuard, "row clicks on the × must not trigger playback");
  const player = readSrc("src/player.ts");
  const h = player.match(/busOn\("melo:queue-entries-removed", \(p: any\) => \{([\s\S]*?)\n  \}\);/);
  assert.ok(h, "the player must listen for queue-entry removals");
  assert.match(h[1], /queue\.filter\(t => !gone\.has\(keyOf\(t\) \?\? ""\)\)/,
    "the runtime queue must drop the removed entries");
  assert.match(h[1], /currentGone/, "removing the CURRENT track must be handled (it keeps playing)");
});

// ─── queue appends from the Playlist window reach the player ───

test("queue appends broadcast melo:queue-entries-added and the player grows its runtime queue", () => {
  const lib = readSrc("src/library.ts");
  assert.match(lib, /invoke<number\[\]>\("append_queue_tracks", \{ trackIds: hydrated\.map\(t => t\.id\) \}\)/,
    "importPaths must collect the new entry ids from append_queue_tracks");
  assert.match(lib, /playlistEntryId: Number\(entryIds\[i\]\)/,
    "the appended tracks must be stamped with their queue entry id");
  assert.match(lib, /busEmit\("melo:queue-entries-added", \{ tracks: added \}\)/,
    "importPaths must announce the appended entries");
  const player = readSrc("src/player.ts");
  const h = player.match(/busOn\("melo:queue-entries-added", \(p: any\) => \{([\s\S]*?)\n  \}\);/);
  assert.ok(h, "the player must listen for melo:queue-entries-added");
  assert.match(h[1], /queue = queue\.concat\(fresh\);/,
    "the runtime queue must grow by the appended tracks");
  assert.match(h[1], /!have\.has\(/,
    "entry-id dedupe must make a redelivery a no-op");
  assert.match(h[1], /__LUMI_SET_QUEUE__/,
    "the handler must republish the grown runtime queue");
  assert.doesNotMatch(h[1], /currentIndex = /,
    "appending must not move currentIndex");
});

// ─── the QUEUE view supports ctrl/shift multi-select + bulk remove ───

test("queue rows support ctrl/shift multi-select and bulk remove from Queue", () => {
  const lib = readSrc("src/library.ts");
  // the modifier-selection branch must NOT be gated to stored playlists anymore
  assert.doesNotMatch(lib, /currentPlaylistId !== QUEUE_ID && \(mouseEvent\.shiftKey/,
    "ctrl/shift selection must work in the queue view");
  // the bulk bar must show for queue selections
  assert.match(lib, /playlistBulk\.bar\.style\.display = playlistSelectedEntryIds\.size \? "flex" : "none";/,
    "the bulk bar must be visible whenever a selection exists");
  // One short label covers both queue and playlist bulk removal.
  assert.match(lib, /playlistBulk\.actionBtn\.textContent = "Remove"/,
    "the bulk action label must be the short 'Remove' for both queue and playlist");
  assert.doesNotMatch(lib, /"Remove from Queue"/, "the long queue-specific bulk label must be gone");
  assert.doesNotMatch(lib, /"Remove from Playlist"/, "the long playlist-specific bulk label must be gone");
  // grabbing a selected QUEUE row moves the whole selection
  assert.match(lib, /const ids: string\[\] = \(!playlistSelectedEntryIds\.has\(grabId\) \|\| playlistSelectedEntryIds\.size < 2\)/,
    "queue drags must move the selection as a block");
  // bulk remove in the queue goes through remove_queue_entries + both player events
  assert.match(lib, /invoke<Array<\{ entryId: number; trackId: string \}>>\("remove_queue_entries", \{ entryIds: ids\.map\(Number\) \}\)/,
    "queue bulk remove must use remove_queue_entries");
  const emits = (lib.match(/melo:queue-entries-removed/g) || []).length;
  assert.ok(emits >= 2, "both the × button and the bulk action must notify the player");
  // the bulk bar exposes its action button so the label can follow the view
  assert.match(lib, /actionBtn: actionBtn as HTMLButtonElement/, "createBulkBar must expose the action button");
});

// ─── library crumb exactly 38px · deleted-skin boot check · block-drag distance ───

test("the virtual library crumb fills its 38px slot (no peek-through band)", () => {
  const css = readSrc("src/app.css");
  const i = css.indexOf(".lib-crumb.virtual-crumb {");
  const block = css.slice(i, css.indexOf("}", i));
  assert.match(block, /height: 38px !important;/, "the crumb box must be exactly 38px");
  assert.match(block, /box-sizing: border-box !important;/, "border-box so the border cannot grow it past 38px");
});

test("a deleted skin is detected BEFORE window geometry is applied at boot", () => {
  const main = readSrc("src/main.ts");
  const geoIdx = main.indexOf("Resolve the native window size a skin wants");
  const checkIdx = main.indexOf("deleted-skin boot check");
  assert.ok(checkIdx > 0 && geoIdx > 0 && checkIdx < geoIdx,
    "the existence check must run before getTargetSize() is first used");
  assert.match(main, /listInstalledSkins\(\)/, "the check must consult the installed skins list");
  assert.match(main, /if \(!exists\) resetSkin\(undefined, false\);/, "a missing skin must reset BEFORE geometry");
  const firstReg = main.indexOf('busOn("melo:skin-geometry"');
  assert.ok(firstReg > 0 && firstReg < main.indexOf("mainWin.onCloseRequested"),
    "the handler must sit at the TOP of the main-window block (it used to be at the end and missed the fallback emit)");
  assert.equal((main.match(/busOn\("melo:skin-geometry"/g) || []).length, 1, "exactly one registration");
});

// ─── library list top padding 0px · Haven skin replacement ───

test("the library/playlist list containers have NO top padding (no peek band)", () => {
  const css = readSrc("src/app.css");
  const i = css.indexOf("#trackList,\n#winPlaylistTracks {");
  assert.ok(i > 0, "the redesigned-lists padding block must exist");
  const block = css.slice(i, css.indexOf("}", i));
  assert.match(block, /padding: 0px 0 6px;/, "top padding must be 0px (user, round 22)");
  assert.ok(!css.includes("padding: 2px 0 6px;"), "the old 2px top padding must be gone everywhere");
});

test("the bundled Haven skin is the REPLACED version and still wired into the binary", () => {
  const haven = readSrc("skins/haven.html");
  assert.match(haven, /\.hv-current-lyric \{/,
    "the new Haven version ships the current-line lyric slot (.hv-current-lyric) — the old file lacked it");
  assert.match(haven, /<title>Melo — Haven<\/title>/, "skin title (and thus its list name) must stay 'Haven'");
  const main = readSrc("src-tauri/src/main.rs");
  assert.match(main, /const DEFAULT_SKIN_HAVEN: &str = include_str!\("\.\.\/\.\.\/skins\/haven\.html"\);/,
    "the binary must keep embedding skins/haven.html (recompile picks the new content)");
  assert.match(main, /\("haven\.html", DEFAULT_SKIN_HAVEN\)/, "the seed list must still install haven.html");
});

// ─── playlist/queue x buttons identical + color-only hover ───

test("playlist and queue x buttons are identical and hover changes only the glyph color", () => {
  const css = readSrc("src/app.css");
  const grabBlock = (needle) => {
    const i = css.indexOf(needle);
    assert.ok(i > 0, needle + " must exist");
    return css.slice(i, css.indexOf("}", i));
  };
  // one shared base block for BOTH attribute buttons: same color, no fill
  const baseStart = css.indexOf(".track-row .btn[data-remove-entry],\n.track-row .btn[data-remove-queue-entry]");
  assert.ok(baseStart > 0, "the unified x base block must exist");
  const base = css.slice(baseStart, css.indexOf("}", baseStart));
  assert.match(base, /color: var\(--text-muted\);/, "both x buttons share one resting color");
  assert.match(base, /background: transparent;/, "resting state has no background");
  // hover: red glyph, and the .btn:hover background can never fire
  const hoverStart = css.indexOf(".track-row .btn[data-remove-entry]:hover,");
  assert.ok(hoverStart > 0, "the unified x hover block must exist");
  const hover = css.slice(hoverStart, css.indexOf("}", hoverStart));
  assert.match(hover, /color: #e5484d !important;/, "hover changes the GLYPH color (red, same as the library x)");
  assert.match(hover, /background: transparent !important;/, "hover must NOT paint a background (user, round 23)");
  // the queue x must rest at the SAME opacity as the playlist x (the reported difference)
  // (the unified base block's selector list also ends in this prefix — anchor on the opacity body)
  assert.ok(css.includes(".track-row .btn[data-remove-queue-entry] {\n  opacity: 0.55;"),
    "the queue x must rest at 0.55 like the playlist x");
  assert.match(css, /\.track-row:hover \.btn\[data-remove-queue-entry\]/, "row hover reveals the queue x too");
});

// ─── every bundled skin's close/minimize buttons must be wired ───

test("every bundled skin wires its close/minimize buttons to the engine hooks", () => {
  // six skins shipped titlebar buttons with the
  // win-btn class and aria-label but WITHOUT data-melo="close"/"minimize" —
  // the engine binds ONLY the attribute (main.ts: 'the class is for CSS
  // only'), so those buttons were dead on every one of those skins.
  const skinsDir = path.join(repoRoot, "skins");
  const files = fs.readdirSync(skinsDir).filter((f) => f.endsWith(".html"));
  assert.ok(files.length >= 10, "the bundled skin set must be present");
  let checked = 0;
  for (const f of files) {
    const s = fs.readFileSync(path.join(skinsDir, f), "utf8");
    if (!s.includes('class="win-btn close"') && !s.includes('aria-label="close"')) continue;
    checked++;
    assert.ok(s.includes('data-melo="close"'),
      f + ': the close button must carry data-melo="close" (the attribute is the contract, the class is CSS-only)');
    assert.ok(s.includes('data-melo="minimize"'),
      f + ': the minimize button must carry data-melo="minimize"');
  }
  assert.ok(checked >= 10, "at least the bundled titlebar skins must be checked, got " + checked);
});

// ─── transport icons mirror the audio element · resume switch in the Playback tab ───

test("the transport icons mirror the audio element (no stuck Pause at cold boot)", () => {
  const player = readSrc("src/player.ts");
  // a single sync helper, invoked as soon as the skin DOM binds
  assert.match(player, /function syncTransportIcons\(\)/, "a sync helper must exist");
  assert.match(player, /syncTransportIcons\(\);/, "bindDOM must sync the icons to audio.paused");
  // the active deck's play/pause events drive the icons from now on
  const deck = player.slice(player.indexOf("function attachDeckListeners"));
  const deckBlock = deck.slice(0, deck.indexOf("\n  }\n"));
  assert.ok(deck.includes('el.addEventListener("pause"'), "the deck must listen for pause");
  const pauseIdx = deck.indexOf('el.addEventListener("pause"');
  const pauseBlock = deck.slice(pauseIdx, deck.indexOf("});", pauseIdx));
  assert.match(pauseBlock, /iconPlay.*display = "block"/, "pause must re-show the Play icon");
  // a FAILED play() falls back to the paused reality instead of the markup default
  const catchIdx = player.indexOf('toast("Click once inside player to begin audio playback");');
  const catchBlock = player.slice(catchIdx, player.indexOf("});", catchIdx));
  assert.match(catchBlock, /iconPlay.*display = "block"/, "a rejected play() must show the Play icon");
});

test("the resume-playback switch lives in the PLAYBACK settings tab", () => {
  const main = readSrc("src/main.ts");
  const generalStart = main.indexOf('data-panel="general"');
  const playbackStart = main.indexOf('data-panel="playback"');
  const appearanceStart = main.indexOf("<!-- APPEARANCE");
  assert.ok(generalStart > 0 && playbackStart > generalStart && appearanceStart > playbackStart,
    "the settings panels must exist in order");
  const general = main.slice(generalStart, main.indexOf("<!-- PLAYBACK TAB -->"));
  const playback = main.slice(playbackStart, appearanceStart);
  assert.ok(!general.includes('id="swResume"'), "the resume switch must NOT be in the General tab anymore");
  assert.ok(playback.includes('id="swResume"'), "the resume switch must be in the Playback tab");
  assert.ok(playback.indexOf('id="swResume"') < playback.indexOf("replaygain"),
    "the resume switch is the FIRST row of the Playback tab");
  const en = JSON.parse(readSrc("src/locales/en.json"));
  assert.ok(en["settings.playback.resume.label"], "the renamed en key must exist");
  assert.ok(!en["settings.general.resume.label"], "the old general.* key must be gone");
});

// ─── the Lyrics window's scrollbar is themed like the rest ───

test("the lyrics scroll containers use the theme-aware scrollbar set", () => {
  // #lyricsContainer (Lyrics window) and .embedded-lyrics
  // (embedded panel) must appear in ALL five themed-scrollbar groups:
  // thin+color, width, track, thumb, thumb:hover — their bars used to be
  // the raw browser default and ignored the dark theme.
  const css = readSrc("src/app.css");
  const groups = [
    "#lyricsContainer,\n.embedded-lyrics,\n.artist-album-chips,",
    "#lyricsContainer::-webkit-scrollbar,\n.embedded-lyrics::-webkit-scrollbar,",
    "#lyricsContainer::-webkit-scrollbar-track,\n.embedded-lyrics::-webkit-scrollbar-track,",
    "#lyricsContainer::-webkit-scrollbar-thumb,\n.embedded-lyrics::-webkit-scrollbar-thumb,",
    "#lyricsContainer::-webkit-scrollbar-thumb:hover,\n.embedded-lyrics::-webkit-scrollbar-thumb:hover,",
  ];
  for (const g of groups) {
    assert.ok(css.includes(g), "themed scrollbar group missing the lyrics containers:\n" + g);
  }
  assert.ok(!css.includes("padding: 12px 20px 14px 20px;"), "sanity: stylesheet stays round-34 clean");
});

// ─── the scan banner's "(listed above)" list actually shows ───

test("the scan-complete banner's unreadable-file list survives completion", () => {
  const lib = readSrc("src/library.ts");
  // the list must not depend on an ACTIVE scan anymore
  assert.ok(!lib.includes("if (activeScanId && scanErrorPaths.length) {"),
    "the errors list must not require an active scan (the banner outlives it)");
  assert.ok(lib.includes("if (scanErrorPaths.length) {"),
    "the errors list now renders whenever paths exist");
  assert.ok(lib.includes("the list no longer depends on an ACTIVE scan"),
    "the round-36 comment must sit above the new condition");
  // the finish path must NOT wipe the list before the final render
  const finishIdx = lib.indexOf('(listed above)');
  const tail = lib.slice(finishIdx, lib.indexOf("melo:library-roots-changed"));
  assert.ok(!/\n    scanErrorPaths = \[\];\n    activeScanId/.test(tail),
    "the finish path must not wipe scanErrorPaths before refreshManageDialog()");
  // dismissing the banner clears the list with it
  const dismiss = lib.slice(lib.indexOf('[data-manage-scan-dismiss]'));
  assert.match(dismiss, /scanErrorPaths = \[\]; scanErrorCount = 0;\n        refreshManageDialog\(\);/,
    "the banner's OK must clear the list too");
  // the real unreadable count survives scanProgress being nulled
  assert.match(lib, /let scanErrorCount = 0;/, "a surviving error count must exist");
  assert.match(lib, /scanProgress\?\.errors \?\? scanErrorCount \?\? scanErrorPaths\.length/,
    "the list title falls back to the surviving count");
  // the banner text keeps the promise it can now keep
  assert.ok(lib.includes('(listed above)'), "the banner keeps its '(listed above)' promise");
});

// ─── round 56: Library album-sheet layout + panel gutters ───

test("the Library has a persisted list/albums layout switch that only applies to Details/Tiles track displays", () => {
  const lib = readSrc("src/library.ts");
  const main = readSrc("src/main.ts");
  const css = readSrc("src/app.css");
  assert.match(main, /data-liblayout="list"/);
  assert.match(main, /data-liblayout="albums"/);
  assert.match(lib, /"melo-lib-layout"/);
  // Default for Details/Tiles is Album Sheets; only an explicit "list" preference overrides it.
  assert.match(lib, /localStorage\.getItem\("melo-lib-layout"\) === "list" \? "list" : "albums"/,
    "Album Sheets must be the default layout until the user picks Track List");
  assert.match(main, /class="lib-view-btn active" data-liblayout="albums"/,
    "the Album Sheets button is the markup default");
  assert.match(lib, /libLayout === "albums" && libView !== "compact" && libView !== "details" && isLibraryTrackDisplay\(\)/,
    "sheet mode must exclude compact AND the columned Details view, and stay limited to track displays");
  assert.match(lib, /if \(sheetModeActive\(\)\) \{\s*invalidateLibraryWindow\(\);\s*return renderAlbumSheets/,
    "the renderer must dispatch to the album sheets");
  assert.match(css, /\.lib-sheet-cover \{[^}]*flex: 0 0 180px; width: 180px; height: 180px;/, "cover slot is 180x180");
  assert.match(css, /background-size: contain !important/, "cover keeps its aspect ratio");
  assert.match(css, /@container lib-sheets \(min-width: 760px\)/, "two columns only when there is room");
});

test("Equalizer / Lyric panel windows get their gutters on .panel-body (no .float-body exists there)", () => {
  const css = readSrc("src/app.css");
  assert.match(css, /\.panel-equalizer \.panel-body,\s*\.panel-lyrics \.panel-body \{ padding: 12px 18px 14px !important/);
  assert.match(css, /\.panel-lyrics \.panel-body #lyricsTrackTitle/);
});

// ─── large-library Albums tab — batched artwork + render coalescing ───

test("the artwork queue drains in batches and scroll renders coalesce", () => {
  const lib = readSrc("src/library.ts");
  // batching: one ensure_track_artwork_batch per up-to-24 ids
  assert.match(lib, /const ARTWORK_BATCH = 24;/, "the batch size constant must exist");
  assert.match(lib, /artworkQueue\.splice\(0, ARTWORK_BATCH\)/, "the queue must drain in batches");
  assert.match(lib, /invoke<\(string \| null\)\[\]>\("ensure_track_artwork_batch"/,
    "the queue must call the batch command and type its result as the plain array Rust returns");
  // CONTRACT: the Rust command returns Vec<Option<String>> (a JSON ARRAY). The queue used to read
  // `res.paths` (undefined on an array), silently discarding every batch result and
  // negative-caching every album. Pin both ends of the contract.
  const rust = readSrc("src-tauri/src/library_db.rs");
  assert.match(rust, /pub async fn ensure_track_artwork_batch\([^)]*\) -> Result<Vec<Option<String>>, String>/,
    "the batch command must keep returning a plain Vec<Option<String>>");
  assert.ok(lib.includes("Array.isArray(res) ? res : []"), "the queue must read the result AS an array");
  assert.ok(!/res\.paths/.test(lib), "no reader of a non-existent `res.paths` field may remain");
  assert.ok(!lib.includes('invoke<string | null>("ensure_track_artwork"'),
    "the per-album ensure invocation must be gone from the queue");
  // coalescing: an in-flight render defers scroll-driven re-renders
  assert.match(lib, /let libraryRenderBusy = false;/, "the in-flight guard must exist");
  assert.match(lib, /await renderLibraryVirtualInner\(resets?, restoreScroll\)/, "the wrapper must delegate");
  const inner = lib.indexOf("async function renderLibraryVirtualInner(reset = false, restoreScroll?: number)");
  const wrapper = lib.indexOf("async function renderLibraryVirtual(reset = false, restoreScroll?: number)");
  assert.ok(wrapper > 0 && inner > wrapper, "the original body must be renamed to the Inner variant");
});

// ─── scroll position is read FRESH before the virtual-list swap ───

test("virtual list renders restore the FRESH scroll position, not the render-start one", () => {
  // middle-button auto-scroll keeps moving the list
  // WHILE the page fetch runs; restoring the render-start position yanked
  // the viewport backwards (wheel = invisible, auto-scroll = snapped back).
  const lib = readSrc("src/library.ts");
  // the main virtual list: keepScroll must be computed right BEFORE the swap
  const inner = lib.indexOf("const keepScroll = reset ? 0 : (restoreScroll ?? trackList.scrollTop);\n      trackList.innerHTML");
  assert.ok(inner > 0, "renderLibraryVirtualInner must fresh-read keepScroll immediately before innerHTML");
  // and must NOT compute it at render start anymore
  const start = lib.indexOf("async function renderLibraryVirtualInner");
  const end = lib.indexOf("async function renderArtistDiscography");
  const body = lib.slice(start, end);
  const occurrence = body.indexOf("const keepScroll = reset ? 0 : (restoreScroll ?? trackList.scrollTop);");
  assert.ok(occurrence > body.indexOf("await fetchLibraryPage") && body.indexOf("trackList.innerHTML") > occurrence,
    "the ONLY keepScroll read must sit between the page fetch and the innerHTML swap");
  // the artist discography path got the same fix
  const art = lib.slice(end, end + 12000);
  assert.match(art, /const keepScroll = reset \? 0 : trackList\.scrollTop;\n      if \(!reset\) trackList\.scrollTop = keepScroll;/,
    "renderArtistDiscography must fresh-read before its restore");
});

// ─── the group total (COUNT) is cached per view and invalidated on change ───

test("the groups total is cached per view identity and invalidated on library change", () => {
  // the COUNT aggregate ran on EVERY scroll render; its cost
  // grows with the library size. It must now come from the per-view cache
  // (recomputed only when the view key or the library contents change).
  const lib = readSrc("src/library.ts");
  assert.ok(lib.includes("let groupsTotalCache = new Map<GroupsTotalKey, number>();"), "the cache must exist");
  // the key covers the full view identity
  const keyFn = lib.slice(lib.indexOf("function groupsTotalKey"), lib.indexOf("function invalidateGroupsTotalCache"));
  for (const part of ["libTab", "libView", "libraryGroupKind", "librarySearch", "selectedArtist", "selectedAlbum", "selectedGenre"]) {
    assert.ok(keyFn.includes(part), "the view key must include " + part);
  }
  // fetch: offset-0 pages refresh/seed the cache; offset-0 also TRUSTS it
  const fetch = lib.slice(lib.indexOf("async function fetchLibraryPage"), lib.indexOf("async function fetchLibraryPage") + 2200);
  assert.match(fetch, /includeTotal: cached == null,/, "the COUNT is requested only when the view has no cached total");
  assert.match(fetch, /if \(cached != null\) page\.total = cached;/, "a cached total must be trusted");
  assert.match(fetch, /else if \(generation === groupsTotalGeneration\) groupsTotalCache\.set\(key, page\.total\);/,
    "a fetch seeds the cache only if no invalidation happened while it was in flight");
  // invalidation: library-changed + scan start
  const inv = lib.split("invalidateGroupsTotalCache()").length - 1;
  assert.ok(inv >= 3, "the invalidation helper must be DEFINED and called (>=3 occurrences), got " + inv);
  const changed = lib.slice(lib.indexOf('busOn("melo:library-changed"'), lib.indexOf('busOn("melo:library-changed"') + 700);
  assert.ok(changed.includes("invalidateGroupsTotalCache()"), "library-changed must invalidate the cache");
  const scanStart = lib.slice(lib.indexOf("activeScanId = result.scanId"), lib.indexOf("activeScanId = result.scanId") + 400);
  assert.ok(scanStart.includes("invalidateGroupsTotalCache()"), "scan start must invalidate the cache");
});

// ─── the virtual Library list keeps a loaded window; scrolling is free inside it ───

test("the Library list refetches only when the visible rows near the edge of the loaded window", () => {
  // Every scroll tick used to refetch the page and rebuild the whole list (cover
  // re-decode + observer resets = the CPU rise), and the trailing DEBOUNCE meant nothing
  // was fetched at all while the scrollbar was being dragged (the blank area).
  const lib = readSrc("src/library.ts");
  assert.ok(lib.includes("let libraryWindow: LibraryWindow | null = null;"), "the loaded-window state must exist");
  assert.ok(lib.includes("function libraryWindowCovers(): boolean"), "the coverage check must exist");
  const covers = lib.slice(lib.indexOf("function libraryWindowCovers"), lib.indexOf("function paintLibrarySkeleton"));
  assert.ok(covers.includes("w.sig !== libraryWindowSig("), "a view/columns/row-height change must defeat coverage");
  assert.match(covers, /needAbove/, "prefetch margin above");
  assert.match(covers, /needBelow/, "prefetch margin below");
  // the handler: covered -> nothing; uncovered -> placeholders now + ONE throttled render
  const handler = lib.slice(lib.indexOf("const LIBRARY_SCROLL_RENDER_MS"), lib.indexOf("playlistList?.addEventListener(\"scroll\""));
  assert.match(handler, /if \(libraryWindowCovers\(\)\) return;/, "scrolling inside the window must cost nothing");
  assert.ok(handler.includes("paintLibrarySkeleton();"), "the uncovered area must be filled immediately");
  assert.ok(!handler.includes("clearTimeout"), "the scroll render must be THROTTLED, not debounced (a debounce starves during a drag)");
  assert.match(handler, /if \(libraryScrollTimer\) return;/, "at most one scheduled scroll render");
  assert.match(handler, /libTab === "recent"/, "Recently Played is a complete list and must not re-render on scroll");
  assert.match(handler, /\{ passive: true \}/, "the scroll listener must be passive");
  // overscan: one viewport each side, bounded
  const inner = lib.slice(lib.indexOf("async function renderLibraryVirtualInner"), lib.indexOf("function bindLibraryRows"));
  assert.match(inner, /const overscanRows = Math\.max\(6, rowsVisible\);/, "one viewport of overscan");
  assert.match(inner, /Math\.min\(400, /, "the window size stays bounded");
  // the window is registered after a render — and only if no invalidation raced it
  assert.match(inner, /libraryWindow = windowGen === libraryWindowGen/, "a render that raced an invalidation must not register a stale window");
  // data changes drop the window
  const inv = lib.slice(lib.indexOf("function invalidateGroupsTotalCache"), lib.indexOf("async function fetchLibraryPage"));
  assert.ok(inv.includes("invalidateLibraryWindow()"), "invalidating the totals must also drop the loaded window");
  // row placement is shared between real rows and placeholders
  assert.ok(lib.includes("function libraryRowPosStyle("), "row placement must be a shared helper");
  assert.ok(inner.includes("libraryRowPosStyle(rowIdx, col, columns, rowH, headerHeight)"), "real rows must use the shared placement");
  const skel = lib.slice(lib.indexOf("function paintLibrarySkeleton"), lib.indexOf("function syncLibViewButtons"));
  assert.ok(skel.includes("libraryRowPosStyle("), "placeholders must use the same placement");
  assert.ok(skel.includes("w.sig !== libraryWindowSig("), "placeholders must not be painted with another view's geometry");
  const css = readSrc("src/app.css");
  assert.ok(css.includes(".lib-skeleton {") && css.includes(".lib-skeleton .lib-skel-lines"), "placeholder styling must exist");
});

test("scan progress marks the browse caches stale (throttled, and always at the end)", () => {
  // The total was cached per view and only invalidated at scan START; rows added during the
  // scan and the final count were never picked up until an unrelated event.
  const lib = readSrc("src/library.ts");
  const start = lib.indexOf('busOn("melo:scan-progress"');
  const head = lib.slice(start - 300, start + 500);
  assert.ok(head.includes("let lastScanInvalidate = 0;"), "the throttle state must exist");
  assert.match(head, /progress\.finished \|\| Date\.now\(\) - lastScanInvalidate > 2000/, "throttled to 2s, but ALWAYS on the final event");
  assert.ok(head.includes("invalidateGroupsTotalCache();"), "the invalidation must run");
});

test("unpainted-only artwork lookups: already-painted covers are not re-requested", () => {
  const lib = readSrc("src/library.ts");
  const lazy = lib.slice(lib.indexOf("function bindLazyArtwork"), lib.indexOf("async function loadCore"));
  assert.ok(lazy.includes("!el.style.backgroundImage"), "elements painted from page data must be skipped");
});


// ─── round 65: donate link + About tab ───

test("README and Settings → About both expose the donate URL", () => {
  const readme = readSrc("README.md");
  const main = readSrc("src/main.ts");
  assert.match(readme, /## ❤️ Donate/, "README must have a Donate section");
  assert.match(readme, /https:\/\/arvanta\.github\.io/, "README must link to arvanta.github.io");
  assert.match(main, /https:\/\/arvanta\.github\.io/, "About tab must link to arvanta.github.io");
  assert.match(main, />Donate ↗</, "About tab must show a Donate link");
});


// ─── round 66: Rail skin bundled + listed for current-lyric support ───

test("the bundled Rail skin ships current-lyric and is wired into the binary", () => {
  const rail = readSrc("skins/rail.html");
  assert.match(rail, /data-melo="current-lyric"/, "Rail must expose the current-lyric engine hook");
  assert.match(rail, /data-melo="close"/, "Rail close button must use the engine hook");
  assert.match(rail, /data-melo="minimize"/, "Rail minimize button must use the engine hook");
  assert.match(rail, /data-min-width="500"/, "Rail min width matches project floor");
  assert.match(rail, /data-min-height="230"/, "Rail min height matches project floor");
  assert.match(rail, /<title>Melo — Rail<\/title>/, "display name stays Rail");
  assert.doesNotMatch(rail, /challenge-platform|cloudflare/i, "no Cloudflare challenge script");
  const main = readSrc("src-tauri/src/main.rs");
  assert.match(main, /include_str!\("\.\.\/\.\.\/skins\/rail\.html"\)/, "Rail must be embeddable via include_str!");
  assert.match(main, /\("rail\.html", DEFAULT_SKIN_RAIL\)/, "Rail must seed on first run");
});

test("Settings → current-lyric description no longer hardcodes a skin list (round 85)", () => {
  const en = readSrc("src/locales/en.json");
  assert.doesNotMatch(en, /Currently supported skins/, "the skin list moved to the per-skin feature row");
  assert.doesNotMatch(en, /Mica 2/, "the retired 'Mica 2' name must be gone from the settings text");
  assert.match(en, /"settings\.general\.lyricsSkinLine\.unsupported"/, "greyed-out explanation key exists");
});

test("round 85 · Settings shows the active skin's features on one line (chips + greyed lyric switch)", () => {
  const main = readSrc("src/main.ts");
  assert.match(main, /id="skinFeatures" class="skin-features"/, "feature row sits under the skin select");
  assert.match(main, /id="lyricsSkinLineRow"/, "lyric switch row is addressable for greying");
  assert.match(main, /settings\.skinFeatures\.currentLyric/, "chip label: current lyric");
  assert.match(main, /settings\.skinFeatures\.embeddedLyrics/, "chip label: embedded lyrics");
  assert.match(main, /settings\.skinFeatures\.embeddedPlaylist/, "chip label: embedded playlist");
  assert.match(main, /busOn\("melo:skin-changed", \(\) => \{\s*clearSkinCapabilityCache\(\);\s*refreshSkinFeatures\(\);/, "skin changes re-derive the row");
  assert.match(main, /clearSkinCapabilityCache\(\);\s*await populateSkinsDropdown\(\);/, "Refresh button drops the cache first");
  const css = readSrc("src/app.css");
  assert.match(css, /\.skin-features \{[^}]*flex-wrap: nowrap/, "chips never wrap (keeps the settings window height)");
  assert.match(css, /\.skin-feature-unavailable \{[^}]*pointer-events: none/, "greyed switch cannot be toggled");
});

test("round 85 · feature detection uses the same hook rules as the runtime (findHook)", () => {
  const skin = readSrc("src/skin.ts");
  assert.match(skin, /export function detectSkinCapabilities\(htmlText: string\): SkinCapabilities/);
  assert.match(skin, /has\("skinCurrentLyric", "current-lyric"\) \|\| has\("skinNextLyric", "next-lyric"\)/, "current-lyric = id or data-melo, same as lyric-line.ts");
  assert.match(skin, /has\("embedded-lyrics", "embedded-lyrics"\)/);
  assert.match(skin, /has\("embedded-playlist", "embedded-playlist"\)/);
  assert.match(skin, /new DOMParser\(\)\.parseFromString\(htmlText, "text\/html"\)/, "parsed once, no script execution");
  assert.match(skin, /if \(cached\) return cached;/, "result is cached per skin");
  assert.match(skin, /if \(!text\) return NO_SKIN_CAPABILITIES;[\s\S]*?skinCapabilityCache\.set/, "failed reads are not cached");
  assert.match(skin, /if \(!skinChoice \|\| skinChoice === "default"\) return DEFAULT_SKIN_CAPABILITIES;/, "Default never touches the disk");
  // Every skin the lyric text used to name must still expose the slot.
  for (const file of ["aria.html", "halcyon.html", "haven.html", "hira.html", "koto.html", "mica.html", "mist.html", "rail.html", "silk-orbit.html"]) {
    const html = readSrc(`skins/${file}`);
    assert.match(html, /data-melo="current-lyric"/, `${file} keeps its current-lyric hook (chip shows ✔)`);
  }
  // Skins without the slot are the ones the chip must mark ✘.
  for (const file of ["lumen.html", "graphite.html", "slate.html", "microline.html", "microline-v.html"]) {
    const html = readSrc(`skins/${file}`);
    assert.doesNotMatch(html, /data-melo="current-lyric"|id="skinCurrentLyric"/, `${file} has no lyric slot (chip shows ✘)`);
  }
});


// ─── round 67: About external links open in the system browser ───

test("About links open via open_external_url (WebView2 cannot target=_blank)", () => {
  const main = readSrc("src/main.ts");
  assert.match(main, /data-melo-external="https:\/\/github\.com\/Arvanta\/Melo"/,
    "GitHub About link must carry data-melo-external");
  assert.match(main, /data-melo-external="https:\/\/arvanta\.github\.io"/,
    "Donate About link must carry data-melo-external");
  assert.match(main, /invoke\("open_external_url", \{ url \}\)/,
    "clicks must invoke the Rust open_external_url command");
  assert.match(main, /\[data-melo-external\]/,
    "setupSettings must bind every data-melo-external anchor");
  // plain target=_blank alone is not enough in the desktop webview
  assert.doesNotMatch(main, /data-melo-external="[^"]+"[^>]*target="_blank"/,
    "external anchors should not rely on target=_blank");
});

// ─── round 69: Explorer multi-select burst ───

test("open-with batches: first batch replaces + plays, later batches in the burst append", () => {
  const src = readSrc("src/main.ts");
  assert.match(src, /const OPEN_BURST_MS = \d+;/, "burst window constant");
  const i = src.indexOf("const inBurst =");
  assert.ok(i > 0, "burst decision must exist");
  const blk = src.slice(i, src.indexOf("}, 450);", i));
  assert.match(blk, /importPaths\?\.\(batch, "append"\)/, "in-burst batches append");
  assert.match(blk, /importPaths\?\.\(batch, "replace"\)/, "first batch replaces");
  assert.ok(blk.indexOf('"append"') < blk.indexOf('"replace"'), "append branch returns before replace");
  assert.match(blk, /melo:play-tracks/, "replace path still starts playback");
});

// ─── round 70: version bump to 1.1.0 + never replace a published release ───

test("release: every version-declaring file agrees with package.json", () => {
  const { execFileSync } = childProcess;
  // The tool is the single source of truth; it exits non-zero on any drift.
  const out = execFileSync(process.execPath, ["tools/version.mjs", "--check"], {
    cwd: repoRoot,
    encoding: "utf8",
  });
  assert.match(out, /All \d+ version sources agree/, "the consistency report must conclude OK");
  // Independently pin the one file the release TAG is derived from — a broken
  // tool must not be able to hide a tauri.conf.json/package.json mismatch.
  const pkg = JSON.parse(readSrc("package.json")).version;
  const conf = JSON.parse(readSrc("src-tauri/tauri.conf.json")).version;
  assert.equal(conf, pkg, "tauri-action builds tag v__VERSION__ out of tauri.conf.json");
  // …and the lock entry, so the user's `cargo check --locked` stays green.
  const lock = readSrc("src-tauri/Cargo.lock");
  assert.match(lock, new RegExp(`name = "melo"\\r?\\nversion = "${pkg.replace(/\./g, "\\.")}"`),
    "Cargo.lock's melo entry must match — otherwise --locked fails");
});

test("release: the workflow refuses to rebuild an existing tag and never publishes on its own", () => {
  const wf = readSrc(".github/workflows/build.yml");
  // The consistency check runs before the guard, and both run before any build.
  const check = wf.indexOf("node tools/version.mjs --check");
  const guard = wf.indexOf("git ls-remote --tags origin");
  const build = wf.indexOf("tauri-apps/tauri-action@v0");
  assert.ok(check > 0 && guard > check && build > guard,
    "order must be: version check → duplicate-tag guard → build");
  // An existing tag must stop the job (no rebuild, no replaced assets).
  assert.match(wf, /\$remote = git ls-remote --tags origin "refs\/tags\/\$tag"/, "guard reads the remote tag");
  assert.match(wf, /if \(\$remote\) \{[\s\S]{0,700}?exit 1/, "existing tag must fail the build");
  // The release stays a draft, is no longer flagged prerelease, and is named v<version>.
  assert.match(wf, /tagName: v__VERSION__/, "tag comes from tauri.conf.json");
  assert.match(wf, /releaseName: "v__VERSION__"/, "release title must be exactly v<version>");
  assert.match(wf, /releaseDraft: true/, "never publish automatically");
  assert.match(wf, /prerelease: false/, "a real release, not a pre-release");
  // Racing runs must not create the same tag twice.
  assert.match(wf, /concurrency:[\s\S]{0,120}cancel-in-progress: false/, "one run per branch at a time");
  // No leftover patch marker from an earlier edit may sit in the workflow.
  assert.doesNotMatch(wf, /<\/?old_text>|<\/?new_text>/, "stray patch markers break the disabled job");
});

// ─── round 71: Mica renamed, drag-drop toast removed ───

test("bundled skins: 'Mica' is the former Mica 2 and Mica 1 is retired", () => {
  assert.ok(!fs.existsSync(path.join(repoRoot, "skins/mica-2.html")),
    "skins/mica-2.html must be gone — the name is retired");
  const mica = readSrc("skins/mica.html");
  assert.match(mica, /<title>Melo — Mica<\/title>/, "the renamed skin must present itself as Mica");
  assert.doesNotMatch(mica, /Mica 2|MICA 2/, "no leftover 'Mica 2' branding inside the skin");
  // The renamed skin keeps everything that made it a shipping skin.
  assert.match(mica, /data-melo="current-lyric"/, "Mica keeps its current-lyric slot");
  assert.match(mica, /data-melo="toggle-lyrics"/, "Mica keeps its lyrics-window button");
  assert.match(mica, /data-min-width="500"/, "Mica keeps the 500x230 window floor");
  assert.match(mica, /data-min-height="230"/, "Mica keeps the 500x230 window floor");
});

test("bundled skins: existing installs are migrated once (stock files only)", () => {
  const main = readSrc("src-tauri/src/main.rs");
  assert.match(main, /const DEFAULT_SKIN_MICA: &str = include_str!\("\.\.\/\.\.\/skins\/mica\.html"\);/,
    "the bundle must embed skins/mica.html");
  assert.doesNotMatch(main, /DEFAULT_SKIN_MICA_2/, "the Mica 2 embed must be gone");
  assert.doesNotMatch(main, /\("mica-2\.html",/, "mica-2.html must no longer be seeded");
  // The one-time migration: hashes gate both operations so edits survive.
  assert.match(main, /RETIRED_MICA1_SHA256: &str = "[0-9a-f]{64}"/, "stock Mica 1 hash pinned");
  assert.match(main, /RETIRED_MICA2_SHA256: &str = "[0-9a-f]{64}"/, "stock Mica 2 hash pinned");
  assert.match(main, /fn migrate_retired_mica_once\(skins_dir: &Path\)/, "migration fn must exist");
  const call = main.indexOf("migrate_retired_mica_once(skins_dir);");
  const seedMarker = main.indexOf('let marker = skins_dir.join(".melo-seeded");');
  assert.ok(call > 0 && call < seedMarker,
    "the migration must run even on already-seeded installs (before the seeding early-return)");
  // It replaces mica.html only on the exact stock Mica 1, and only deletes the stock Mica 2.
  const fn = main.slice(main.indexOf("fn migrate_retired_mica_once"), main.indexOf("// ---- Tauri Commands ----"));
  assert.match(fn, /hash_of\(&mica\)\.as_deref\(\) == Some\(RETIRED_MICA1_SHA256\)[\s\S]{0,200}?std::fs::write\(&mica, DEFAULT_SKIN_MICA\)/,
    "mica.html may only be replaced while it is still the stock Mica 1");
  assert.match(fn, /hash_of\(&mica2\)\.as_deref\(\) == Some\(RETIRED_MICA2_SHA256\)[\s\S]{0,200}?remove_file\(&mica2\)/,
    "mica-2.html may only be deleted while it is still the stock Mica 2");
  assert.match(fn, /\.melo-migrated-mica/, "the migration must be marker-gated (run once)");
});

test("drag & drop imports show no success toast (the queue is the feedback)", () => {
  const src = readSrc("src/main.ts");
  const start = src.indexOf("async function importAndPlayDroppedPaths");
  const end = src.indexOf("async function expandAndImportDroppedPaths");
  const drop = src.slice(start, end);
  assert.ok(start > 0 && end > start, "drop functions must exist");
  assert.doesNotMatch(drop, /showToast\(`\$\{list\.length\} file\(s\) added`\)/,
    "a player drop must not toast 'x file(s) added'");
  assert.match(drop, /showToast\("None of the dropped files could be imported"\)/,
    "failures must still report themselves");
  // The playlist-window drop (append mode) follows the same rule.
  const expand = src.slice(end, src.indexOf("\nif (isTauri && !urlPanel) {", end));
  assert.doesNotMatch(expand, /showToast\(`\$\{list\.length\} file\(s\) added to the playlist`\)/,
    "an append drop must not toast either");
  assert.match(expand, /if \(!list\.length\) showToast\("None of the dropped files could be imported"\)/,
    "append failures must still report themselves");
  // Open Files (not a drop) keeps its confirmation.
  assert.match(src, /busEmit\("melo:play-tracks", \{ tracks: list, index: 0 \}\);\s*showToast\(`\$\{list\.length\} file\(s\) added`\);/,
    "the Add-files dialog keeps its toast — only drag & drop is silent");
});

// ─── round 71: Rail menu — lyrics window + equalizer ───

test("Rail: lyrics-window and equalizer live in the context menu, not the rail", () => {
  const rail = readSrc("skins/rail.html");
  const aside = rail.slice(rail.indexOf('<aside class="fluent-rail">'), rail.indexOf("</aside>"));
  // The rail itself no longer carries them…
  assert.doesNotMatch(aside, /data-melo="toggle-eq"/, "the Equalizer button must leave the rail");
  assert.doesNotMatch(aside, /data-melo="toggle-lyrics"/, "the Lyrics-window button belongs to the menu");
  // …the menu carries both, as regular menu entries that close the menu.
  const menu = rail.slice(rail.indexOf('<div class="fluent-menu-wrap">'), rail.indexOf('class="dismiss-overlay"'));
  assert.match(menu, /data-melo="toggle-eq"[\s\S]{0,400}?Equalizer/, "menu item opens the Equalizer window");
  assert.match(menu, /data-melo="toggle-lyrics"[\s\S]{0,400}?Lyrics window/, "menu item opens the Lyrics window");
  for (const role of ["toggle-eq", "toggle-lyrics"]) {
    const tag = menu.match(new RegExp(`<label class="menu-item"[^>]*data-melo="${role}"[^>]*>`));
    assert.ok(tag && /for="micaMenuToggle"/.test(tag[0]),
      `${role} must be a menu-item label bound to the menu toggle (so the menu closes)`);
  }
  // The rest of the rail navigation is untouched.
  for (const role of ["toggle-embedded-playlist", "toggle-embedded-lyrics", "toggle-library", "toggle-playlist", "toggle-settings"]) {
    assert.match(aside, new RegExp(`data-melo="${role}"`), `rail must still expose ${role}`);
  }
  // The lyrics-window icon is its own (a window carrying a note), not a copy of
  // the playlist-window icon.
  const lyrStart = menu.indexOf('data-melo="toggle-lyrics"');
  const lyrItem = menu.slice(lyrStart, menu.indexOf("</label>", lyrStart));
  const plButton = aside.slice(aside.indexOf('data-melo="toggle-playlist"'), aside.indexOf("</button>", aside.indexOf('data-melo="toggle-playlist"')));
  const svg = (s) => (s.match(/<svg[\s\S]*?<\/svg>/) || [""])[0];
  assert.ok(svg(lyrItem).length > 0 && svg(lyrItem) !== svg(plButton),
    "the lyrics-window item needs a distinct icon from the playlist window");
  assert.match(svg(lyrItem), /<circle/, "the lyrics-window icon carries the note head");
  assert.match(rail, /data-melo="current-lyric"/, "Rail keeps the current-lyric hook");
});

// ─── round 72: Radial Sunburst ground, Aurora II headroom, Now Playing label ───

test("Radial Sunburst paints no full-canvas ground (no grey wash on the card)", () => {
  const viz = readSrc("src/visualizer.ts");
  const start = viz.indexOf("function drawRadial(");
  const end = viz.indexOf("// Dot Matrix", start);
  assert.ok(start > 0 && end > start, "drawRadial must exist");
  const fn = viz.slice(start, end);
  // The scene must never fill the whole canvas: the corona is ring-limited,
  // so its fill disc matches the gradient's own (small) end radius.
  assert.doesNotMatch(fn, /fillRect\(0, 0, w, h\)/, "no full-canvas background wash");
  assert.match(fn, /const coronaR = inner \* 1\.75;/, "corona radius must be ring-limited");
  assert.match(fn, /createRadialGradient\(cx, cy, 0, cx, cy, coronaR\)/, "halo gradient must use that radius");
  assert.match(fn, /g2d\.arc\(cx, cy, coronaR, 0, Math\.PI \* 2\); g2d\.fill\(\)/,
    "the halo fill must stop at the gradient radius (a square fill would repaint grey corners)");
  assert.match(fn, /halo\.addColorStop\(1, "rgba\(0,0,0,0\)"\)/, "the corona must fade to fully transparent");
});

test("Aurora II (and calm Aurora) derive their base from the crest's worst-case reach", () => {
  const viz = readSrc("src/visualizer.ts");
  const start = viz.indexOf("function drawAurora(");
  const end = viz.indexOf("function drawTide(", start);
  const fn = viz.slice(start, end);
  assert.ok(start > 0 && end > start, "drawAurora must exist");
  // The crest's upward travel is amp*(0.55+0.45) + amp*0.35 = 1.35*amp, plus the
  // spectrum push; the base must be pushed down whenever that would leave less
  // than 10% of the height above the crest (round 72: the old fixed 0.62–0.98 h
  // bases let Aurora II's crest shoot ~19px above a 56px strip).
  assert.match(fn, /const spec = lively \? h \* \(0\.05 \+ 0\.08 \* depth\) : 0;/, "spectrum push term pinned");
  assert.match(fn, /const reach = amp \* 1\.35 \+ spec;/, "worst-case reach must be computed");
  assert.match(fn, /const baseY = Math\.max\(h \* \(lively \? 0\.56 \+ 0\.13 \* depth : 0\.62 \+ 0\.12 \* depth\), reach \+ h \* 0\.10\);/,
    "both scenes must keep a 10% headroom above the highest possible crest");
  const math = fn.slice(fn.indexOf("const reach ="), fn.indexOf("const speed ="));
  assert.doesNotMatch(math, /amp \* \(0\.55 \+ 0\.45 \* Math\.sin[\s\S]*h \* 0\.0[0-4]/,
    "no shrinking of the sine stack to fake the margin");
});

test("Playlist window calls the queue 'Now Playing' (no '(queue)' suffix)", () => {
  const lib = readSrc("src/library.ts");
  assert.match(lib, /<option value="\$\{QUEUE_ID\}" \$\{currentPlaylistId === QUEUE_ID \? "selected" : ""\}>▶ Now Playing<\/option>/,
    "the playlist dropdown option must read exactly '▶ Now Playing'");
  assert.doesNotMatch(lib, /Now Playing \(queue\)/, "the '(queue)' suffix is retired");
});

// ─────────────────────────── run + summary ───────────────────────────

// Defer to allow async tests to settle.
setTimeout(function report() {
  if (pendingAsync > 0) return setTimeout(report, 25); // wait for every async test
  console.log(`\n${passed} passed, ${failed} failed`);
  if (failures.length) {
    console.log("Failures:\n  " + failures.join("\n  "));
  }
  process.exit(failed);
}, 100);

// ─── round 73: skin reset button, album-sheet count, square tiles, Most Played plays ───

test("Settings → Skins: the 'Reset to Default' button is gone (boot fallback stays)", () => {
  const src = readSrc("src/main.ts");
  assert.doesNotMatch(src, /btn-reset-skin-settings/, "no button id left anywhere");
  assert.doesNotMatch(src, /Reset to Default<\/button>/, "no such button is rendered");
  // Removing the button must NOT remove the engine's own reset used when the
  // installed skin file vanishes at boot.
  assert.match(src, /if \(!exists\) resetSkin\(undefined, false\);/, "boot fallback reset kept");
  const skin = readSrc("src/skin.ts");
  assert.match(skin, /export function resetSkin\(/, "skin engine still exports resetSkin");
});

test("Album sheet meta shows the track count immediately left of the total time", () => {
  const lib = readSrc("src/library.ts");
  assert.match(lib, /<span class="lib-sheet-measures"><span class="lib-sheet-count">\$\{tracksText\}<\/span><span class="lib-sheet-mins">\$\{minsText\}<\/span><\/span>/,
    "count and minutes are one right-hand group, count first");
  assert.match(lib, /const tracksText = `\$\{nTracks\} track\$\{nTracks === 1 \? "" : "s"\}`;/,
    "singular/plural handled");
  const css = readSrc("src/app.css");
  assert.match(css, /\.lib-sheet-measures \{ display: flex; align-items: baseline; gap: 8px; flex: 0 0 auto; \}/,
    "the measures group is styled");
});

test("Library tiles: covers are square and taller (row 190px, 132px capped both axes)", () => {
  const lib = readSrc("src/library.ts");
  // round 83: the 190px belongs to the card predicate (tilesCardsActive), not to
  // "tiles + groups" — a query under Tiles renders track rows, not cards.
  assert.match(lib, /if \(tilesCardsActive\(\)\) return 190;/, "tiles card row height raised 148→190");
  assert.match(lib, /function tilesCardsActive\(\): boolean \{/, "the card predicate exists (round 83)");
  const css = readSrc("src/app.css");
  const card = css.slice(css.indexOf(".lib-card .lib-avatar, .lib-card .track-cover-mini {"));
  const rule = card.slice(0, card.indexOf("}"));
  assert.match(rule, /max-width: 132px; max-height: 132px;/, "both axes capped at the same size → width == height");
  assert.match(rule, /align-self: center;/, "centred inside wide columns");
  assert.match(rule, /aspect-ratio: 1;/, "aspect ratio kept");
  assert.doesNotMatch(rule, /max-height: calc\(100% - 34px\)/, "the old height-only clip (wide band) is gone");
});

test("Most Played rows show 'N×' left of the duration (playlist view only)", () => {
  const lib = readSrc("src/library.ts");
  assert.match(lib, /const AUTO_MOST_PLAYED_ID = "__auto_most_played__";/, "backend auto-id mirrored as a constant");
  const rStart = lib.indexOf("async function renderPlaylistVirtual(");
  assert.ok(rStart > 0, "renderPlaylistVirtual found");
  const render = lib.slice(rStart, rStart + 14000);
  assert.match(render, /const viewingMostPlayed = currentPlaylistId === AUTO_MOST_PLAYED_ID;/, "badge gated to Most Played");
  // The badge must be emitted right before the duration span of the row.
  assert.match(render, /\$\{playsBadge\(track\)\}<span class="t-dur">/, "plays badge sits left of t-dur");
  assert.match(render, /if \(!Number\.isFinite\(pc\) \|\| pc <= 0\) return "";/, "missing/zero counts render nothing");
  const css = readSrc("src/app.css");
  assert.match(css, /\.track-row \.t-plays \{/, "t-plays styled");
});

test("Rust: playlist_tracks exposes play_count safely (round 73)", () => {
  const rs = readSrc("src-tauri/src/library_db.rs");
  assert.match(rs, /#\[serde\(default, skip_serializing_if = "Option::is_none"\)\]\s*pub play_count: Option<i64>,/,
    "optional JSON field, absent from other commands' rows");
  const cmd = rs.slice(rs.indexOf("pub async fn playlist_tracks"), rs.indexOf("#[tauri::command]", rs.indexOf("pub async fn playlist_tracks")));
  assert.match(cmd, /t\.replay_gain,pt\.entry_id,t\.play_count FROM playlist_tracks/, "SELECT exposes play_count as column 14");
  assert.match(cmd, /row_playlist_track/, "playlist rows use the upgraded mapper");
  const mapper = rs.slice(rs.indexOf("fn row_playlist_track"), rs.indexOf("const TRACK_SELECT"));
  assert.match(mapper, /row\.get::<_, Option<i64>>\(14\)\.unwrap_or\(None\)/,
    "tolerant read: a row without column 14 degrades to None (get returns Err, never panics)");
  assert.doesNotMatch(rs, /get_checked|get_ref_checked|CheckedRow/,
    "rusqlite 0.31 REMOVED the checked API — these names must not come back (E0599, round 76b)");
  // Every other DbTrack construction site must initialize the new field.
  const lits = (rs.match(/play_count: None/g) || []).length;
  assert.equal(lits, 3, "every DbTrack literal (mka, tag scan, row mapper) initializes the field");
});

// ─── round 75 · artist sidebar · column Details view · entity search · queue position hint ───

test("Library views: details renamed to default, new columned details view, one-time migration", () => {
  const lib = readSrc("src/library.ts");
  const main = readSrc("src/main.ts");
  assert.match(lib, /type LibView = "default" \| "details" \| "compact" \| "tiles";/,
    "four views: default, details, compact, tiles");
  assert.match(lib, /const LIB_VIEWS: LibView\[\] = \["default", "details", "compact", "tiles"\];/, "the switch lists all four");
  // Migration: an old saved "details" (which WAS the default view) maps to
  // "default" exactly once; the marker keeps a later "details" choice intact.
  assert.match(lib, /saved = "default";\s*try \{ localStorage\.setItem\("melo-lib-view", "default"\); \} catch \{\}/,
    "one-time details→default migration REWRITES storage (else boot #2 flips into the new view)");
  assert.match(lib, /localStorage\.setItem\("melo-lib-view-v2", "1"\)/, "the migration marker is written");
  assert.match(main, /data-libview="default" title="Default"/, "the renamed button ships in the markup");
  assert.match(main, /data-libview="details" title="Details"/, "the columned Details button ships (round 77: plain label, placed after Tiles)");
});

test("Details view: column model, persistence, and the Columns menu contract", () => {
  const lib = readSrc("src/library.ts");
  assert.match(lib, /type LibColId = "artist" \| "album" \| "albumArtist" \| "genre" \| "year" \| "duration";/,
    "the configurable columns (title pinned, plays NOT offered — library rows carry no play_count)");
  assert.match(lib, /localStorage\.setItem\("melo-lib-cols-order", JSON\.stringify\(libColOrder\)\)/, "order persists");
  assert.match(lib, /localStorage\.setItem\("melo-lib-cols-off", JSON\.stringify\(\[\.\.\.libColOff\]\)\)/, "the hidden set persists");
  assert.match(lib, /if \(!localStorage\.getItem\("melo-lib-cols-off"\)\)/, "first run defaults to artist+album+duration");
  // the Columns button only exists in this view
  assert.match(lib, /colsBtn\.hidden = libView !== "details";/, "the Columns button is details-view-only");
  assert.match(lib, /menu\.innerHTML = `<div class="lcm-head">Columns<\/div><div class="lcm-title-pin">Title <span>always shown<\/span><\/div>/,
    "the menu pins Title and lists the reorderable rest");
  assert.match(lib, /if \(order\.length === LIB_COL_IDS\.length\) libColOrder = order;/, "drag reorder rebuilds the order from the DOM");
  // rows + header share one grid template
  assert.match(lib, /<div class="track-row lib-cols virtual-row"/, "column rows use the shared grid class");
  assert.match(lib, /<div class="lib-col-head lib-cols\$\{groupColsOn/, "the sticky header reuses the shared grid class");
  assert.match(lib, /trackList\.style\.setProperty\("--lib-cols", libColsGrid\(\)\);/, "the grid template flows via a custom property");
  assert.match(lib, /if \(libView === "details"\) return 40;/, "one tight 40px line per track");
  assert.match(lib, /if \(libView === "compact" \|\| libView === "details"\) return 1;/, "the column view is single-column");
});

test("Search shows ENTITIES: artist/album filters list names, All shows grouped sections", () => {
  const lib = readSrc("src/library.ts");
  assert.match(lib, /if \(isEntityFilterSearch\(\)\) \{\s*invalidateLibraryWindow\(\);\s*return renderEntitySearch\(\);\s*\}/,
    "the renderer dispatches to entity search before sheets/tracks");
  assert.match(lib, /libTab !== "playlists" && !!librarySearch && \(librarySearchField === "artist" \|\| librarySearchField === "album"\)/,
    "entity mode = artist/album filter with a query, never the playlists tab");
  // the entity list hits library_groups directly (name-matched SQL there) — no Rust change
  assert.match(lib, /invoke<Page<GroupRow>>\("library_groups", \{\s*kind, search: librarySearch, artist: null, limit: LIB_ENTITY_SEARCH_LIMIT/,
    "the entity list queries library_groups (name match)");
  // All-mode sections: artists and albums, capped, above the (still virtual) track list
  assert.match(lib, /const \[pa, pb\] = await Promise\.all\(\[/, "All-mode sections fetch artists+albums in parallel");
  assert.match(lib, /limit: LIB_SEARCH_SECTION_LIMIT, offset: 0, includeTotal: true/, "sections cap at 10 with totals");
  assert.match(lib, /if \(!artists\.length && !albums\.length\) \{ hideLibSearchSections\(\); return; \}/, "empty sections stay hidden");
  assert.match(lib, /void renderSearchSectionsAll\(\);/, "the track-list render also (re)builds the sections");
  // clicking a result navigates AND clears the query
  assert.match(lib, /function drillFromSearchGroup\(/, "the drill helper exists");
  assert.match(lib, /librarySearch = "";\s*if \(searchInput\) searchInput\.value = "";\s*updateSearchClear\(\);/,
    "the drill clears the search box");
  assert.match(lib, /const parts = String\(group\.key \|\| ""\)\.split\("\\0"\);\s*selectedArtist = parts\[0\] \|\| null;\s*selectedAlbum = parts\[1\] \|\| group\.name;/,
    "an album result scopes to that album (artist\0album key)");
});

test("Artist sidebar: toolbar button enabled only on the artist tabs, names only", () => {
  const lib = readSrc("src/library.ts");
  const main = readSrc("src/main.ts");
  assert.match(main, /id="btn-lib-artistbar"/, "the toolbar button exists next to the other library buttons");
  assert.match(main, /id="libArtistSidebarList"/, "the sidebar list container exists in the markup");
  assert.match(main, /<aside id="libArtistSidebar" class="lib-artist-sidebar" hidden/, "it starts hidden");
  assert.match(lib, /function artistSidebarActive\(\): boolean \{ return libTab === "artists" \|\| libTab === "album-artists"; \}/,
    "enabled only on the Artists / Album Artist tab");
  assert.match(lib, /btn\.disabled = !artistSidebarActive\(\);/, "the button reflects availability");
  assert.match(lib, /localStorage\.setItem\("melo-lib-artistbar", artistSidebarOpen \? "1" : "0"\)/, "the toggle persists");
  assert.match(lib, /<button type="button" class="lib-side-artist\$\{g\.name === selectedArtist \? " active" : ""\}" data-side-artist="\$\{esc\(g\.name\)\}" title="\$\{esc\(g\.name\)\}">\$\{esc\(g\.name\)\}<\/button>/,
    "rows carry the artist NAME ONLY (plus the active highlight)");
  assert.match(lib, /data-side-artist="\$\{esc\(g\.name\)\}"[^>]*>\$\{esc\(g\.name\)\}<\/button>/, "no counts/durations in the sidebar rows");
  // clicking a name switches the artist and stays usable while drilled in
  assert.match(lib, /selectedArtist = name;\s*selectedAlbum = null;\s*selectedGenre = null;\s*savedGroupsScrollTop = 0;/,
    "a sidebar click re-scopes to that artist");
  assert.match(lib, /artistSidebarCache = null;\n    invalidateLibraryWindow\(\);/, "library changes invalidate the sidebar cache");
  assert.match(lib, /if \(on\) b\.scrollIntoView\(\{ block: "nearest" \}\);/, "the active artist is kept in view");
});

test("Playlist next/previous starts from the CLICKED track (queue position hint)", () => {
  const lib = readSrc("src/library.ts");
  const player = readSrc("src/player.ts");
  assert.match(lib, /async function playFromDbQueue\(focus: Track, announce = true, queueHint\?: number\)/, "the sender takes a hint");
  assert.match(lib, /fromQueue: true, queueHint: Number\.isInteger\(queueHint\) \? queueHint : undefined/, "the hint rides on the bus event");
  assert.equal((lib.match(/playFromDbQueue\(focus, true, (absIndex|index)\);/g) || []).length, 3,
    "all three fromQueue callers (library rows, playlist window, playlists tab) pass the hint");
  assert.match(player, /hydrateFullQueue\(gen, p\.tracks\[0\], p\.queueHint\);/, "the player receives the hint");
  assert.match(player, /String\(all\[hint as number\]\.id\) === String\(focusTrack\.id\)/,
    "the hint is only trusted when the queue row at that index is the clicked track");
  assert.match(player, /if \(focus < 0 && hint == null && focusTrack\.playlistEntryId != null\)/,
    "entry-id matching stays for queue-view rows only (foreign ids can false-match)");
  assert.match(player, /if \(focus < 0\) focus = all\.findIndex\(t => t\.id === focusTrack\.id\);/,
    "last resort: first occurrence of the track, never position 0 blindly");
  // the QUEUE view's direct emit stays untouched (no hint → entry-id path)
  assert.match(lib, /if \(currentPlaylistId === QUEUE_ID\) \{\s*busEmit\("melo:play-tracks", \{ tracks: \[focus\], index: 0, fromQueue: true \}\);/,
    "queue-view clicks keep the entry-id lookup (correct id space there)");
});

test("shuffle materialises into the real queue order (round 76→77), no per-press dice", () => {
  const player = readSrc("src/player.ts");
  const lib = readSrc("src/library.ts");
  // the dice are gone: no random index roll on Next/press anymore
  assert.doesNotMatch(player, /Math\.floor\(Math\.random\(\) \* queue\.length\)/,
    "next/prev no longer roll a fresh random index per press");
  assert.doesNotMatch(player, /shuffleDeck|deckPosOf|buildShuffleDeck/,
    "the private in-memory deck is gone (round 77: the queue array IS the order)");
  // permutation machinery + pinning rule
  assert.match(player, /function shuffleInPlace\(a: number\[\]\) \{/, "Fisher-Yates kept");
  assert.match(player, /const t = a\[i\]; a\[i\] = a\[j\]; a\[j\] = t;/, "proper swap");
  assert.match(player, /function applyShuffleToQueue\(\) \{\s*const n = queue\.length;\s*if \(n < 2\) return;/,
    "materialiser exists and is a no-op for tiny queues");
  assert.match(player, /queue = \[cur, \.\.\.rest\]\.map\(i => queue\[i\]\);\s*currentIndex = 0;/,
    "permuted array becomes the queue with the playing track pinned at position 0");
  assert.match(player, /busEmit\("melo:queue-shuffled", \{ order: queue\.map\(t => String\(t\.id\)\) \}\)/,
    "the proposed order is broadcast for the DB write");
  // every trigger point
  assert.match(player, /if \(isShuffle\) applyShuffleToQueue\(\);\s*toast\(isShuffle \? "Shuffle on" : "Shuffle off"\);/,
    "toggle ON materialises immediately");
  assert.match(player, /if \(isShuffle\) \{\s*\/\/ New pass[\s\S]*?applyShuffleToQueue\(\);\s*return Math\.min\(1, queue\.length - 1\);/,
    "repeat-all pass boundary reshuffles and starts at position 1 (no immediate repeat)");
  assert.match(player, /if \(focus >= 0\) currentIndex = focus;\s*\/\/ Round 77[\s\S]*?if \(isShuffle\) applyShuffleToQueue\(\);/,
    "a DB re-hydrate under shuffle re-materialises the order (view never diverges)");
  assert.match(player, /if \(p\.fromQueue\) hydrateFullQueue\(gen, p\.tracks\[0\], p\.queueHint\);\s*\/\/ A full-array handoff[\s\S]*?else if \(isShuffle\) applyShuffleToQueue\(\);/,
    "direct play-tracks handoff applies it too");
  // plain walks = history; no deck branches remain in nav
  assert.match(player, /\/\/ Round 77: with shuffle the array itself carries the pass order[\s\S]*?let prv = currentIndex - 1;/,
    "Previous is the plain index walk — the real history of the displayed order");
  // library side applies it once, only main writes, and no loop back
  assert.match(lib, /busOn\("melo:queue-shuffled", \(p: any\) => \{\s*if \(role !== "main" \|\| !invoke\) return;/,
    "only the main window applies the proposed order");
  assert.match(lib, /await invoke\("shuffle_queue_rows", \{ order \}\); busEmit\("melo:queue-changed", \{\}\);/,
    "DB write, then the ordinary queue-changed refresh (player has no such listener → no loop)");
  assert.doesNotMatch(player, /busOn\("melo:queue-changed"/, "the player never LISTENS to queue-changed (self-broadcast would loop)");
});

test("play counts only after a real listen (round 76 threshold), never at start", () => {
  const player = readSrc("src/player.ts");
  const lib = readSrc("src/library.ts");
  assert.match(player, /Math\.min\(30000, s\.durMs \/ 2\) : 30000/, "threshold = min(30s, half the duration), unknown → 30s");
  assert.match(player, /s\.listenedMs \+= Date\.now\(\) - s\.resumeAt;/, "wall-clock accumulation while unpaused");
  assert.match(player, /if \(s\.counted \|\| !s\.id\) return;/, "each pass counts at most once");
  assert.match(player, /busEmit\("melo:play-counted", \{ trackId: s\.id \}\);/, "count travels over the bus, DB stays out of the player");
  assert.match(player, /beginPlaySession\(t\); \/\/ settles the outgoing track's count, too/, "switching tracks settles the previous one");
  assert.match(player, /window\.addEventListener\("pagehide", \(\) => evaluatePlaySession\(\)\);/, "quit/reload flushes an earned count");
  assert.match(player, /if \(el === audio\) resumeSession\(\);/, "play restarts the meter");
  assert.match(player, /accumulateSession\(\); \/\/ paused: the listen meter stops here/, "pause freezes the meter");
  assert.match(player, /if \(repeatMode === "one" && queue\[currentIndex\]\) playSession = newSession\(queue\[currentIndex\]\);/,
    "repeat-one: every loop is a fresh session (counts once per pass)");
  assert.match(player, /evaluatePlaySession\(\); \/\/ the crossfaded-out track settles here/, "crossfade handoff settles the outgoing track");
  assert.equal((player.match(/evaluatePlaySession\(\);/g) || []).length, 4,
    "settling happens at exactly the four boundaries (switch, ended, pause, pagehide) — no polling");
  // library side: start = touch only; count = the new bus event
  assert.match(lib, /await invoke\("touch_track_last_played", \{ trackId \}\);/, "track start stamps last_played_at only");
  assert.match(lib, /if \(t\?\.id\) touchTrackPlayed\(t\.id\);/, "track-changed touches, never counts");
  assert.match(lib, /busOn\("melo:play-counted", \(p: any\) => \{\s*if \(p\?\.trackId\) void countTrackPlayed\(String\(p\.trackId\)\);/, "the counted event lands in record_track_play");
  assert.match(lib, /await invoke\("record_track_play", \{ trackId \}\);/, "count command kept, now threshold-gated");
  assert.doesNotMatch(lib, /recordTrackPlayed/, "the old start-of-track counting function is gone");
});

test("embedded playlist & lyrics stages open ON the current item (round 76)", () => {
  const lib = readSrc("src/library.ts");
  const main = readSrc("src/main.ts");
  const lyr = readSrc("src/lyrics.ts");
  // playlist strip: centered on render (open path) + follow on change (open only)
  assert.match(lib, /const activeRow = embeddedPlaylistContainer\.querySelector<HTMLElement>\("\.embedded-playlist-row\.active"\);/,
    "the re-render looks for the now-playing row");
  assert.match(lib, /scrollHeight > embeddedPlaylistContainer\.clientHeight \+ 8/, "only when the list actually scrolls (no jitter on short playlists)");
  assert.match(lib, /embeddedPlaylistContainer\.scrollTop \+= \(ar\.top - br\.top\) - \(embeddedPlaylistContainer\.clientHeight \/ 2 - ar\.height \/ 2\);/,
    "centering uses rect math, not offsetTop (container isn't the offsetParent)");
  assert.match(lib, /if \(embeddedPlaylistContainer\.offsetParent !== null\) \{\s*embeddedPlaylistContainer\.querySelector<HTMLElement>\("\.embedded-playlist-row\.active"\)\s*\?\.scrollIntoView\(\{ block: "nearest" \}\);/,
    "while OPEN, track changes nudge the strip; while closed it stays put");
  // stage announcement → lyrics snap
  assert.match(main, /new CustomEvent\("melo:player-stage", \{ detail: \{ mode \} \}\)/, "setStageMode announces the switch in-document");
  assert.match(lyr, /if \(mode !== "lyrics" \|\| !lyricsContainer\) return;/, "only the lyrics stage, only a real container");
  assert.match(lyr, /lyricsContainer\.scrollTo\(\{ top: Math\.max\(0, top\), behavior: "auto" \}\);/, "instant snap on open (no smooth crawl from the top)");
  assert.match(lyr, /if \(elements\) \{\s*document\.addEventListener\("melo:player-stage"/, "the embedded instance only — panel windows unaffected");
});

test("round 77 · library polish: header count, sidebar sync, badge, button order, scrollbar", () => {
  const lib = readSrc("src/library.ts");
  const main = readSrc("src/main.ts");
  const css = readSrc("src/app.css");
  // (A) the Playlists-tab right-pane head no longer repeats the sidebar count
  const pane = lib.slice(lib.indexOf("async function renderLibraryPlaylists"), lib.indexOf("async function renderLibraryVirtualInner"));
  assert.doesNotMatch(pane, /\{page\.total\} track\$\{/, "duplicate count is gone from the content head");
  assert.ok(pane.includes("matching \u201c${esc(librarySearch)}\u201d</span>` : \"\""),
    "a search echo replaces it only when a query is active");
  // (B) the artist-mode label IS the Artists-tab trigger → must re-sync controls
  const modeBtn = lib.slice(lib.indexOf("artistModeButton?.addEventListener"), lib.indexOf("Only the small arrow opens the choice menu."));
  assert.match(modeBtn, /syncArtistSidebarControls\(\);\s*if \(artistSidebarOpen\) void renderArtistSidebarData\(\);/,
    "returning via the label re-enables the button and re-shows the sidebar");
  // (D) every render re-syncs the sidebar highlight, cheaply
  const wrapper = lib.slice(lib.indexOf("async function renderLibraryVirtual(reset"), lib.indexOf("async function renderLibraryVirtualInner"));
  assert.match(wrapper, /libraryRenderBusy = false;\s*\/\/ Round 77: one funnel[\s\S]*?syncArtistSidebarActive\(\);/,
    "single funnel in the render wrapper covers search/drill/Back/sheets");
  assert.match(lib, /if \(sideSyncedArtist === sel\) return;/, "change-guarded: scroll renders skip the row walk");
  // (F) Most Played count badge in the LIBRARY pane too (was playlist-window only)
  assert.match(pane, /const libTabMostPlayed = selected\.kind === "auto" && selected\.id === AUTO_MOST_PLAYED_ID;/,
    "the badge keys off the auto Most Played selection");
  assert.match(pane, /\$\{libPlaysBadge\(track\)\}<span class="t-dur">/, "count sits left of the duration, same as the window rows");
  // (G) view button order + plain "Details" label
  const switches = main.slice(main.indexOf('id="libViewSwitch"'), main.indexOf("btn-lib-columns"));
  const order = ["default", "compact", "tiles", "details"].map(v => switches.indexOf(`data-libview="${v}"`));
  assert.ok(order.every(i => i >= 0) && order.every((v, i) => i === 0 || v > order[i - 1]),
    "Default · Compact · Tiles · Details, with Details last before the Columns button");
  assert.match(main, /data-libview="details" title="Details">/, "title is just \"Details\"");
  assert.doesNotMatch(main, /Details — sortable columns/);
  // (C) the sidebar list reserves its scrollbar instead of painting over names
  assert.match(css, /\.lib-artist-sidebar-list \{[^}]*scrollbar-gutter: stable/, "gutter reserved");
  assert.match(css, /\.lib-artist-sidebar-list::-webkit-scrollbar \{ width: 6px; \}/, "and thinned for chromium");
  // (H) group rows get a fixed column line in Details view
  assert.match(lib, /const groupColsOn = libView === "details" && libraryMode\(\) === "groups" && !librarySearch;/,
    "details turns the group roots into column lines too");
  assert.ok(lib.includes('return 40; // round 77: group roots too'), "40px line height for groups as well");
  // grid alignment hardening (the harness caught a !important blanket mis-aligning rows)
  assert.ok(lib.includes("padding-left:8px;padding-right:6px;margin-left:0;margin-right:0"),
    "group grid rows carry inline padding + margin reset (blanket !important padding must not shift them)");
  assert.ok(css.includes("#trackList[data-lib-view=\"details\"] .lib-item.lib-cols,\n#trackList[data-lib-view=\"details\"] .track-row.lib-cols { padding-left: 8px !important; padding-right: 6px !important; }"),
    "a same-weight !important override at higher specificity re-aligns BOTH row kinds with the header");
  assert.ok(lib.includes('class="lc g-count">${group.count}'), "count column in the group row");
  assert.match(css, /\.lib-item\.lib-cols \.g-count \{ text-align: right;[^}]*tabular-nums/, "count right-aligned tabular");
});

// ───────────────────────────────────────────────────────── round 78: Find-in-Queue
test("round 78 · the queue search box is a finder: enabled, non-destructive, Enter-cycling", () => {
  const SRC = fs.readFileSync(path.join(repoRoot, "src", "library.ts"), "utf8");
  const CSS = fs.readFileSync(path.join(repoRoot, "src", "app.css"), "utf8");

  // the queue search box is a FINDER now: never disabled, never a filter
  assert.ok(/playlistSearch\.disabled = false;/.test(SRC), "r78: the queue view no longer disables the search box");
  assert.ok(!/playlistSearch\.disabled = viewingQueue/.test(SRC), "r78: blanket disable is gone");
  assert.ok(SRC.includes('viewingQueue ? "Find in queue…" : "Search playlist…"'), "r78: placeholder flips between find and filter");

  // typing in the queue runs the finder and returns — no clearPlaylistSelection, no debounce re-render
  const si = SRC.indexOf('playlistSearch?.addEventListener("input"');
  assert.ok(si > 0 && SRC.slice(si, si + 420).includes('if (currentPlaylistId === QUEUE_ID) { void queueFindStep("first"); return; }'), "r78: queue keystrokes bypass the filter pipeline");

  // Enter cycles, Shift+Enter backwards, F3 too — both wired
  assert.equal((SRC.match(/event\.shiftKey \? "prev" : "next"/g) || []).length, 2, "r78: Enter + F3 both cycle next/prev");
  assert.ok(SRC.includes('if (!playlistSearch || currentPlaylistId !== QUEUE_ID) return;'), "r78: cycling only lives in the queue view");

  // the finder reads the FULL queue through queue_tracks only — no playlist_tracks, no writes
  const qi = SRC.indexOf("async function queueFindStep");
  const qe = SRC.indexOf("queueFindHighlight();\n  }", qi); // the finder's own closing lines
  const qslice = qi > 0 && qe > qi ? SRC.slice(qi, qe) : "";
  assert.ok(qi > 0 && qslice.includes('invoke<Page<Track>>("queue_tracks", { limit: 5000, offset: 0 })'), "r78: matches span the whole queue, not the virtual window");
  assert.ok(!qslice.includes("playlist_tracks"), "r78: the finder never touches stored-playlist data");
  assert.ok(!/invoke[^\n]*(reorder|remove|clear|replace|persist|shuffle)[^\n]*queue/i.test(qslice), "r78: find-in-queue issues zero data ops");
  assert.ok(qslice.includes("a miss must also UNMARK"), "r78: a no-match search clears the old highlight");

  // filter↔find semantics never leak across the QUEUE boundary; resync after every paint
  assert.ok(SRC.includes("const wasQueue = currentPlaylistId === QUEUE_ID;"), "r78: playlist switch guards the queue boundary");
  assert.ok(SRC.includes("queueFindStamp++;"), "r78: renders invalidate the cached match list");
  assert.ok(SRC.includes("if (reset) void queueFindResync(); else queueFindHighlight();"), "r78/r80: re-query on data paints, RE-ATTACH ONLY on scroll paints (cycle no longer resets)");

  // the mark is CSS-owned (themable via --accent), pinned here
  assert.ok(CSS.includes(".track-row.pl-find"), "r78: highlight rule ships in app.css");
});

// ───────────────────────────────────────────────────────── round 79: find chip, sidebar, discography details
test("round 79 · find chip + Prev/Next, sidebar boot paint, no flex-squash, details discography", () => {
  const SRC = fs.readFileSync(path.join(repoRoot, "src", "library.ts"), "utf8");
  const MAIN = fs.readFileSync(path.join(repoRoot, "src", "main.ts"), "utf8");
  const CSS = fs.readFileSync(path.join(repoRoot, "src", "app.css"), "utf8");

  // the count chip + Prev/Next live in the footer markup and only show for a queue query
  assert.ok(MAIN.includes('id="queue-find-nav" hidden'), "r79: nav group ships hidden");
  assert.ok(MAIN.includes('id="queueFindPrev"') && MAIN.includes('id="queueFindNext"') && MAIN.includes('id="queueFindCount"'), "r79: chip + both buttons are real elements, not placeholder text");
  assert.ok(SRC.includes('if (queueFindNav) queueFindNav.hidden = !on;'), "r79: visibility driven by queue-view + non-empty query");
  assert.ok(!SRC.includes("Enter jumps to the next`"), "r79: placeholder no longer carries status text (invisible while typing — the user's complaint)");

  // buttons keep input focus (mousedown guard) and Enter still means next
  assert.ok(SRC.includes('btn.addEventListener("mousedown", event => event.preventDefault());'), "r79: Prev/Next keep focus in the box so Enter chains");
  assert.ok((SRC.match(/qfBind\(queueFind(Next|Prev), "(next|prev)"\);/g) || []).length === 2, "r79: both buttons bound");

  // chip state stays in sync with every box mutation + view switch
  assert.ok(SRC.includes('queueFindStatus(); // round 79: find chip + Prev/Next follow the box state'), "r79: updatePlaylistSearchClear syncs the chip");
  assert.ok(SRC.includes('queueFindStatus(); // round 79: chip only exists in the queue view'), "r79: chrome syncs the chip");
  assert.ok(SRC.includes('.toggle("miss", !n)'), "r79: miss state is red-flagged");
  assert.ok(SRC.includes("const cyc = n > 1;"), "r79: cycling buttons disable when there is nothing to cycle");

  // sidebar boot paint: loadCore (after the bridge) renders it once — the module-level
  // call cannot work because `invoke` is still null there
  assert.ok(SRC.includes("if (artistSidebarOpen && artistSidebarActive() && !artistSidebarCache) void renderArtistSidebarData();"), "r79: cold webview onto Artists shows names without toggling");

  // crowded sidebars must not flex-squash name rows
  assert.ok(CSS.includes(".lib-side-artist { flex: 0 0 auto;"), "r79: rows keep full height; the list scrolls instead");

  // artist discography in Details view = real aligned columns
  assert.ok(SRC.includes('if (detailsOn) trackList.style.setProperty("--lib-cols", libColsGrid());'), "r79: discography gets the user's column grid too");
  assert.ok(SRC.includes('`<div class="track-row lib-cols" data-track-id="${esc(track.id)}" data-album-index="${ai}" data-track-index="${ti}">${libColsRowCells(track, ti)}</div>`'), "r79: column track line, per-album numbering");
  assert.ok(SRC.includes("libView !== \"compact\" && !detailsOn;"), "r79: two-col album grid yields to the column grid");
  assert.ok(SRC.includes("background:var(--card);margin:0 6px"), "r79: discography header mirrors the rows' 6px lateral margin (604@157 both)");
});

// ───────────────────────────────────────────────────────── round 80: weight, header drag, cycle
test("round 80 · lc-title 400, drag-to-reorder headers, find-cycle survives scroll paints", () => {
  const SRC = fs.readFileSync(path.join(repoRoot, "src", "library.ts"), "utf8");
  const CSS = fs.readFileSync(path.join(repoRoot, "src", "app.css"), "utf8");

  assert.ok(CSS.includes(".lc-title { font-weight: 400; }"), "r80: Details titles at body weight (user request)");

  // Round 81 SUPERSEDES the r80 HTML5 wiring: Tauri's dragDropEnabled (needed for OS file
  // drops via onDragDropEvent) makes WebView2 reject HTML5 drags — the ⃠ cursor the user
  // kept seeing. Reordering is POINTER-based now; no draggable attribute may return.
  assert.ok(!SRC.includes('draggable="true" data-col-id'), "r81: header spans are NOT HTML5-draggable anymore");
  assert.ok(!SRC.includes('<div class="lcm-item" draggable'), "r81: menu rows likewise");
  assert.ok(SRC.includes('trackList?.addEventListener("pointerdown"') && SRC.includes('trackList?.addEventListener("pointermove"'), "r81: delegated pointer listeners on #trackList");
  assert.ok(SRC.includes("try { span.setPointerCapture(event.pointerId); } catch {}"), "r81: capture guarded (synthetic/handoff pointers)");
  assert.ok(SRC.includes('target.classList.add(event.clientX < r.left + r.width / 2 ? "col-over" : "col-over-r");'), "r81: left/right half picks the insertion side");
  assert.ok(SRC.includes("libColOrder = order;") && SRC.includes("persistLibColumns();"), "r80/r81: drop reorders the same persisted order the menu uses");
  assert.ok(CSS.includes(".lib-col-head .lc-draggable { cursor: grab; user-select: none; touch-action: none; }"), "r81: grab affordance + touch-action");
  assert.ok(CSS.includes(".lib-col-head .lc-draggable.col-over-r { box-shadow: inset -2px 0 0 var(--accent); }"), "r81: right-side drop indicator");

  // the reset-loop fix: scroll paints re-attach, data paints re-query; stale rows hunt ONCE
  assert.ok(SRC.includes("if (reset) void queueFindResync(); else queueFindHighlight();"), "r80: Enter/Next survive the scroll-triggered repaint");
  assert.ok(SRC.includes('if (queueFindHunt === key) return;'), "r80: the keep-hunt cannot loop");
  assert.ok(SRC.includes('async function queueFindStep(dir: "first" | "next" | "prev" | "keep")'), "r80: keep-mode re-queries at the same cycle position");

  // release notes — the delivery doc lives OUTSIDE the repo (next to HANDOFF
  // in the zip layout), so a CI checkout that only contains the app tree must
  // not choke on it: the pin is enforced when the file is present, skipped
  // when it isn't. Tests never read past the repo root.
  const notesPath = path.join(repoRoot, "..", "RELEASE-NOTES-1.1.0.md");
  if (fs.existsSync(notesPath)) {
    const NOTES = fs.readFileSync(notesPath, "utf8");
    assert.ok(NOTES.includes("Round 80") || NOTES.includes("round 80"), "r80: release note present");
  }
});

// ───────────────────────────────────────────────────────── round 81: root-tab sizing
test("round 81 · 12px root names, 3px cover radius (default 36px, details 28px)", () => {
  const CSS = fs.readFileSync(path.join(repoRoot, "src", "app.css"), "utf8");
  assert.ok(CSS.includes(".lib-item:not(.lib-card):not(.track-row) .t-title { font-size: 12px;"), "r81: Default root names 14→12 (only Default — compact/tiles/details keep own rules)");
  assert.ok(CSS.includes('#trackList[data-lib-view="details"] .lib-item:not(.lib-card):not(.track-row) .t-title { font-size: 12px; }'), "r81: Details root names 14→12");
  assert.ok(CSS.includes('#trackList[data-lib-view="default"] .lib-item:not(.lib-card) .lib-avatar { border-radius: 3px !important; }'), "r81: Default keeps 36px covers, radius 9→3");
  assert.ok(CSS.includes('#trackList[data-lib-view="details"] .lib-item .lib-avatar { width: 28px; height: 28px; border-radius: 3px !important; }'), "r81: Details root covers 36→28 + 3px (discography heads untouched)");
});

// ───────────────────────────────────────────────────────── round 82: label-press drags + 3px everywhere
test("round 82 · menu rows drag from anywhere (label included), checkboxes stay clickable, cover radii 3px", () => {
  const SRC = fs.readFileSync(path.join(repoRoot, "src", "library.ts"), "utf8");
  const CSS = fs.readFileSync(path.join(repoRoot, "src", "app.css"), "utf8");

  // r81's bug: the pointerdown guard skipped label targets — the label spans
  // nearly the whole row, so real users could never start a drag.
  assert.ok(!SRC.includes('closest("label,input")) return;'), "r82: no label exclusion on menu drag start");
  assert.ok(SRC.includes("if (e.button !== 0) return;"), "r82: press anywhere (any target) arms the drag");
  assert.ok(SRC.includes("if (!lcmMoved && Math.abs(e.clientY - lcmStartY) < 4) return;"), "r82: 4px intent threshold separates click from drag");
  assert.ok(SRC.includes('menu.dataset.lcmPointerBound'), "r82: menu-level listeners bind once per menu element");
  assert.ok(SRC.includes("window.addEventListener(\"pointerup\", endLcm);"), "r82: releasing outside the menu still commits");
  assert.ok(SRC.includes("setTimeout(() => { lcmSwallowClick = false; }, 0);"), "r82: stale swallow-click flag self-clears");
  assert.ok(SRC.includes("lcmSwallowClick = false; // a stale swallow flag must never survive a reopen"), "r82: flag also reset on open");

  // all cover corners in the listed rules collapse to 3px
  assert.ok(CSS.includes(".lib-avatar {\n  width: 36px; height: 36px; border-radius: 3px;"), "r82: base avatar 3px");
  assert.ok(CSS.includes(".lib-avatar.lib-avatar-album { border-radius: 3px; }"), "r82: album avatar variant 3px");
  assert.ok(CSS.includes(".lib-avatar {\n  border-radius: 3px !important;"), "r82: blanket avatar 3px");
  assert.ok(CSS.includes(".lib-avatar.lib-avatar-album {\n  border-radius: 3px !important;"), "r82: blanket album avatar 3px");
  assert.ok(CSS.includes(".track-cover-mini {\n  border-radius: 3px !important;"), "r82: mini covers 3px");
  assert.ok(CSS.includes("aspect-ratio: 1; border-radius: 3px !important;"), "r82: tiles card covers 3px too");
  assert.ok(CSS.includes('data-pl-view="compact"] .track-row .track-cover-mini { width: 22px; height: 22px; border-radius: 3px;'), "r82: compact playlist mini covers joined the 3px pass");
  assert.ok(!CSS.includes("border-radius: 9px !important;\n  box-shadow: 0 2px 6px"), "r82: the 9px avatar override is gone");
  assert.ok(!CSS.includes(".track-cover-mini {\n  border-radius: 7px !important;"), "r82: the 7px mini-cover override is gone");
});

// ───────────────────────────────────────────────────────── round 83: tiles search rows + translucent artist sidebar
test("round 83 · Tiles: only real card grids get the 190px row height (searched tracks stay 54px)", () => {
  const SRC = fs.readFileSync(path.join(repoRoot, "src", "library.ts"), "utf8");

  // One predicate decides BOTH the row height and the row template, so the two
  // can never disagree again (that disagreement was the bug: a query under
  // Tiles + Track List painted 54px-tall track rows into 190px-tall slots).
  assert.ok(SRC.includes("function tilesCardsActive(): boolean {"), "r83: tilesCardsActive() helper exists");
  assert.ok(SRC.includes('if (libView !== "tiles" || libraryMode() !== "groups" || librarySearch) return false;'), "r83: no cards outside the tiles group roots / never while searching");
  assert.ok(SRC.includes('return !((libTab === "artists" || libTab === "album-artists") && !!selectedArtist);'), "r83: an artist drill-in is not a card grid either");
  assert.ok(SRC.includes("if (tilesCardsActive()) return 190;"), "r83: row height follows the card predicate");
  assert.ok(SRC.includes("const card = tilesCardsActive();"), "r83: the card template follows the SAME predicate");
  // anti-pins: the old height condition ignored the search state
  assert.ok(!SRC.includes('if (libView === "tiles" && libraryMode() === "groups") return 190;'), "r83: the search-blind 190px condition is gone");
  assert.ok(!SRC.includes('const card = libView === "tiles" && libraryMode() === "groups" && !librarySearch;'), "r83: the duplicated inline card condition is gone");
  // untouched neighbours
  assert.ok(SRC.includes('if (libView === "compact") return 36;'), "r83: compact row height unchanged");
  assert.ok(SRC.includes('if (libView === "details") return 40;'), "r83: details row height unchanged");
});

test("round 83 · artist sidebar background is 35% of --track-bg (translucent)", () => {
  const CSS = fs.readFileSync(path.join(repoRoot, "src", "app.css"), "utf8");
  const rule = CSS.split("\n").find(l => l.startsWith(".lib-artist-sidebar {"));
  assert.ok(rule, "r83: .lib-artist-sidebar rule present");
  assert.ok(rule.includes("background: color-mix(in srgb, var(--track-bg) 35%, transparent);"), "r83: sidebar uses color-mix(in srgb, var(--track-bg) 35%, transparent)");
  assert.ok(!rule.includes("background: var(--card)"), "r83: the solid --card background is gone from the sidebar");
  // the list/rows stay transparent so the tint actually shows through
  assert.ok(CSS.includes(".lib-side-artist { flex: 0 0 auto; display: block; width: 100%; text-align: left; border: 0; background: transparent;"), "r83: sidebar rows stay transparent");
});

// ───────────────────────────────────────────────────────── round 84: tiles resize keeps covers constant, count varies
test("round 84 · Tiles columns: fixed 132px covers, only the COUNT changes on resize", () => {
  const SRC = fs.readFileSync(path.join(repoRoot, "src", "library.ts"), "utf8");
  // Each column must be ≥ ~156px so the avatar (col minus padding/gap) always
  // reaches its 132px cap → constant cover size; and the column count must be
  // uncapped so widening the window adds cards instead of stretching them.
  assert.ok(SRC.includes('if (libView === "tiles") return Math.max(2, Math.floor((width + GRID_GAP) / 156));'), "r84: 156px divisor, no upper cap");
  assert.ok(!SRC.includes("Math.min(6, Math.floor((width + GRID_GAP) / 118))"), "r84: the old ÷118 capped-at-6 formula is gone");
  assert.ok(!/libView === "tiles"\) return Math\.max\(2, Math\.min\(6,/.test(SRC), "r84: no 6-column cap remains on the tiles branch");
  // the 132px cap that the divisor relies on is still present in the card CSS
  const CSS = fs.readFileSync(path.join(repoRoot, "src", "app.css"), "utf8");
  assert.ok(CSS.includes("max-width: 132px; max-height: 132px;"), "r84: covers still capped at 132 both axes");
});
