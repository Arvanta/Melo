import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");
const ui = read("src/tag-editor.ts");
const main = read("src/main.ts");
const lib = read("src/library.ts");
const player = read("src/player.ts");
const rs = read("src-tauri/src/library_db.rs");
const mainRs = read("src-tauri/src/main.rs");

test("tag editor is its own panel window, reused and never auto-restored", () => {
  assert.match(main, /ALLOWED_PANELS = \[[^\]]*"tagedit"/);
  assert.match(main, /id="win-tagedit"/);
  assert.match(main, /noToggle\?: boolean/);
  assert.match(main, /p !== "tagedit" && isAllowedPanel\(p\)/);
  assert.match(main, /urlPanel === "tagedit"\) setupTagEditor/);
  assert.match(main, /busOn\("melo:open-tag-editor"/);
});

test("only touched fields are written; clearing is explicit", () => {
  assert.match(ui, /dirty\.set\(key, /);
  assert.match(ui, /for \(const \[key, raw\] of dirty\)/);
  assert.match(ui, /data-clear=/);
  assert.match(ui, /<mixed>/);
});

test("player releases the playing file around a write", () => {
  assert.match(ui, /busEmit\("melo:tags-will-write"/);
  assert.match(ui, /busEmit\("melo:tags-written"/);
  assert.match(player, /busOn\("melo:tags-will-write"/);
  assert.match(player, /busOn\("melo:tags-written"/);
});

test("library entry points open the editor", () => {
  assert.match(lib, /id="ctxEditTags"/);
  assert.match(lib, /label: "Tags…"/);
  assert.match(lib, /busEmit\("melo:open-tag-editor"/);
});

test("backend commands exist and are registered", () => {
  assert.match(rs, /pub async fn tag_read/);
  assert.match(rs, /pub async fn tag_write/);
  assert.match(mainRs, /tag_read,/);
  assert.match(mainRs, /tag_write,/);
  assert.match(mainRs, /mod tag_edit;/);
});

test("cover is shown from the file, and removal forgets listening history", () => {
  assert.match(ui, /invoke!?<CoverInfo \| null>\("tag_cover_read"/);
  assert.match(rs, /pub async fn tag_cover_read/);
  assert.match(mainRs, /tag_cover_read,/);
  assert.match(rs, /fn purge_orphan_listens/);
  // every user-initiated delete path purges, plus scan prune and a one-time cleanup
  assert.equal((rs.match(/purge_orphan_listens\(/g) || []).length >= 5, true);
  assert.match(rs, /PRAGMA user_version/);
});

test("bulk bar keeps buttons on one line each and wraps the bar", () => {
  const css = read("src/app.css");
  assert.match(css, /\.bulk-action-bar \.btn \{ white-space: nowrap; \}/);
  assert.match(css, /flex-wrap: wrap; justify-content: center; width: max-content/);
});
