import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { transformSync } from "esbuild";

const here = dirname(fileURLToPath(import.meta.url));
const read = (p) => readFileSync(join(here, "..", p), "utf8");
const js = transformSync(read("src/smart-rules.ts"), { loader: "ts", format: "esm" }).code;
const S = await import("data:text/javascript;base64," + Buffer.from(js).toString("base64"));
const rule = (op, value, value2 = 0) => ({ field: "rating", op, value, value2 });

test("rules are normalised: clamped, between ordered, limit capped", () => {
  const r = S.normalizeSmartRules({ rules: [rule("between", 5, 2), rule("is", 9), rule("atLeast", -3)], matchAll: false, sort: "title", limit: 999999999 });
  assert.ok(r.ok);
  assert.deepEqual(r.ok.rules.map(x => [x.op, x.value, x.value2]), [["between", 2, 5], ["is", 5, 0], ["atLeast", 0, 0]]);
  assert.equal(r.ok.limit, S.MAX_SMART_LIMIT);
  assert.equal(r.ok.matchAll, false);
});
test("empty rule list, too many rules are errors; limit 0 means none", () => {
  assert.ok(S.normalizeSmartRules({ rules: [], matchAll: true, sort: "title", limit: null }).error);
  const many = Array.from({ length: S.MAX_SMART_RULES + 1 }, () => rule("is", 1));
  assert.ok(S.normalizeSmartRules({ rules: many, matchAll: true, sort: "title", limit: null }).error);
  assert.equal(S.normalizeSmartRules({ rules: [rule("is", 1)], matchAll: true, sort: "title", limit: 0 }).ok.limit, null);
});
test("rules are described for humans", () => {
  assert.equal(S.describeRule(rule("atLeast", 4)), "Rating ≥ 4★");
  assert.equal(S.describeRule(rule("is", 0)), "Rating is unrated");
  assert.equal(S.describeRules({ rules: [rule("is", 5), rule("is", 0)], matchAll: false, sort: "title", limit: 20 }), "Rating is 5★ or Rating is unrated · first 20");
});
test("library.ts treats smart playlists as read-only and offers the dialog", () => {
  const lib = read("src/library.ts");
  assert.match(lib, /isReadOnlyPlaylist = /);
  assert.equal((lib.match(/kind === "auto"/g) || []).length <= 4, true, "remaining kind==='auto' checks are only the deliberate ones");
  for (const cmd of ["create_smart_playlist", "update_smart_playlist", "smart_playlist_rules"]) assert.ok(lib.includes(`"${cmd}"`), cmd);
  assert.match(lib, /id="libNewSmart"/);
  assert.match(lib, /plCtxEditRules/);
  const main = read("src-tauri/src/main.rs");
  for (const cmd of ["create_smart_playlist", "update_smart_playlist", "smart_playlist_rules"]) assert.ok(main.includes(`library_db::${cmd}`), cmd);
});

// ── round 127 ──
const R = await (async () => {
  const code = transformSync(read("src/rating.ts"), { loader: "ts", format: "esm" }).code;
  return import("data:text/javascript;base64," + Buffer.from(code).toString("base64"));
})();
test("star hover preview: unrated, rated above, rated below, same", () => {
  assert.deepEqual(R.previewStars(0, 3), ["add", "add", "add", "", ""]);
  assert.deepEqual(R.previewStars(3, 4), ["", "", "", "add", ""]);
  assert.deepEqual(R.previewStars(3, 1), ["", "remove", "remove", "", ""]);
  assert.deepEqual(R.previewStars(3, 3), ["", "", "", "", ""]);
  assert.deepEqual(R.previewStars(-1, 2), ["add", "add", "", "", ""]);
});
test("round 127 static pins", () => {
  const ui = read("src/rating-ui.ts"), rt = read("src/rating.ts"), lib = read("src/library.ts");
  assert.ok(!/title="\$\{i\} star/.test(rt), "no per-star tooltip");
  assert.match(ui, /removeAttribute\("title"\)/);
  assert.match(ui, /observe\(card, \{ childList: true \}\)/);
  assert.match(read("src/tag-editor.ts"), /bindStarPreview\(box/);
  assert.match(lib, /cz-flash-/);
  assert.match(read("src/tag-info.ts"), /export function cleanPath/);
});
test("cleanPath strips the extended-length prefix", async () => {
  const code = transformSync(read("src/tag-info.ts"), { loader: "ts", format: "esm" }).code;
  const T = await import("data:text/javascript;base64," + Buffer.from(code).toString("base64"));
  assert.equal(T.cleanPath("\\\\?\\E:\\Music\\a.mp3"), "E:\\Music\\a.mp3");
  assert.equal(T.cleanPath("\\\\?\\UNC\\srv\\share\\a.mp3"), "\\\\srv\\share\\a.mp3");
  assert.equal(T.cleanPath("E:\\a.mp3"), "E:\\a.mp3");
});

test("round 128 static pins: Edit/Delete dialog, timing log, softer flash", () => {
  const lib = read("src/library.ts"), rs = read("src-tauri/src/library_db.rs"), css = read("src/app.css");
  assert.match(lib, /id="libEditSmart">Edit<\/button>/);
  assert.match(lib, /data-confirm="delete"/);
  assert.match(lib, /"delete_playlist", \{ playlistId: pl\.id \}/);
  assert.match(rs, /mod perf \{/);
  assert.match(rs, /melo-perf\.log/);
  assert.match(rs, /pub fn perf_log/);
  assert.ok(read("src-tauri/src/main.rs").includes("library_db::perf_log"));
  assert.match(lib, /HOME_FLASH_MS = 1800/);
  assert.match(css, /czFlashOk 1\.8s/);
});

test("round 130 static pins: coalesced refresh, player diagnostics, README rating", () => {
  const lib = read("src/library.ts"), pl = read("src/player.ts"), rs = read("src-tauri/src/library_db.rs");
  assert.match(lib, /let playlistsNext: Promise<void> \| null/);
  assert.match(lib, /async function doRefreshPlaylists/);
  assert.match(lib, /class="library-smart-btn library-smart-new"/);
  assert.match(lib, /class="library-smart-btn library-smart-edit"/);
  assert.match(read("src/app.css"), /\.library-smart-btn \{/);
  for (const k of ["logPlaybackError", "logAdvance", "QUEUE MISMATCH", "perfProbeFile", "queue entries removed"]) assert.ok(pl.includes(k), k);
  const body = pl.slice(pl.indexOf("function logAdvance"), pl.indexOf("function next()")).replace(/\/\/.*$/gm, "");
  assert.ok(!body.includes("computeNextIndex("), "diagnostic must not call computeNextIndex (it reshuffles)");
  assert.match(rs, /pub fn perf_probe_file/);
  assert.ok(read("src-tauri/src/main.rs").includes("library_db::perf_probe_file"));
  const readme = read("skins/README.md");
  for (const k of ["5.3b", "pv-add", "pv-remove", "track-rating", "Everything else (one-line index)", "--accent-2"]) assert.ok(readme.includes(k), k);
});

test("round 131 static pins: stable gutter, no re-render on re-click", () => {
  assert.match(read("src/app.css"), /\.panel-library #trackList \{ scrollbar-gutter: stable; \}/);
  const lib = read("src/library.ts");
  assert.match(lib, /clicking the tab you are already on, at its root/);
  assert.match(lib, /!selectedArtist && !selectedAlbum && !selectedGenre\) \{\s*if \(trackList\) trackList\.scrollTop = 0;\s*return;/);
});
