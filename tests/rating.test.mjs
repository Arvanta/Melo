import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { transformSync } from "esbuild";

const here = dirname(fileURLToPath(import.meta.url));
const read = (p) => readFileSync(join(here, "..", p), "utf8");
const js = transformSync(read("src/rating.ts"), { loader: "ts", format: "esm" }).code;
const R = await import("data:text/javascript;base64," + Buffer.from(js).toString("base64"));

test("clicking the current star clears, another star sets", () => {
  assert.equal(R.nextStars(0, 4), 4);
  assert.equal(R.nextStars(4, 4), 0);
  assert.equal(R.nextStars(4, 2), 2);
  assert.equal(R.nextStars(-1, 3), 3, "unknown/mixed current never toggles off");
  assert.equal(R.nextStars(2, 9), 5);
});

test("digit keys 0-5 only", () => {
  for (const k of ["0", "1", "5"]) assert.equal(R.starsForKey(k), Number(k));
  for (const k of ["6", "a", "10", " ", "F1"]) assert.equal(R.starsForKey(k), null);
});

test("clampStars and labels", () => {
  assert.equal(R.clampStars(7), 5);
  assert.equal(R.clampStars(-2), 0);
  assert.equal(R.clampStars("3"), 3);
  assert.equal(R.clampStars(NaN), 0);
  assert.equal(R.starsLabel(0), "No rating");
  assert.equal(R.starsLabel(1), "1 star");
  assert.equal(R.starsLabel(4), "4 stars");
});

test("starsHtml fills up to the value", () => {
  const h = R.starsHtml(3);
  assert.equal((h.match(/ on"/g) || []).length, 3);
  assert.equal((h.match(/data-star=/g) || []).length, 5);
});

test("rating is wired end to end", () => {
  const te = read("src/tag-editor.ts");
  assert.match(te, /ratingDraft/);
  assert.match(te, /edit\.rating = ratingDraft/);
  assert.match(te, /r\.edit\.rating = ratingDraft/);
  const main = read("src/main.ts");
  assert.match(main, /setupRating\(showToast, true\)/);
  assert.match(main, /setupRating\(showToast, false\)/);
  assert.match(main, /id="trackRating"/);
  const ui = read("src/rating-ui.ts");
  for (const c of ["ratings_of", "rating_set", "rating_flush"]) assert.match(ui, new RegExp(c));
  assert.match(read("src/library.ts"), /id="ctxRate"/);
  const rs = read("src-tauri/src/main.rs");
  for (const c of ["library_db::ratings_of,", "library_db::rating_set,", "library_db::rating_flush,"]) assert.ok(rs.includes(c), c);
  const db = read("src-tauri/src/library_db.rs");
  assert.match(db, /rating_dirty/);
  assert.match(db, /CASE WHEN tracks\.rating_dirty=1 THEN tracks\.rating ELSE excluded\.rating END/);
});

test("default skin height includes the star row (245 + 24) everywhere it is encoded", () => {
  const conf = JSON.parse(read("src-tauri/tauri.conf.json"));
  const win = conf.app.windows[0];
  assert.equal(win.height, 269);
  assert.equal(win.minHeight, 254);
  assert.match(read("src/app.css"), /min-height: 269px;\s*height: 269px;/);
  assert.match(read("src/main.ts"), /w: 960, h: 269,[^}]*maxH: 284/);
  assert.match(read("src/app.css"), /\.track-rating\[hidden\] \{ display: flex; visibility: hidden; \}/);
});

test("no star row in the playlist / queue context menu", () => {
  const lib = read("src/library.ts");
  const i = lib.indexOf("function showEntryContextMenu");
  assert.match(lib.slice(i, i + 900), /showContextRate\(null\)/);
});

test("rating writes tell the player (stale WebView2 copy of a rewritten file)", () => {
  const ui = read("src/rating-ui.ts");
  assert.match(ui, /busEmit\("melo:tags-written", \{ ids: \[\], paths, released: \[\] \}\)/);
  assert.match(ui, /announceWritten\(res\.paths\)/);
  assert.match(ui, /announceWritten\(res\?\.paths\)/, "also after the deferred flush");
  assert.match(ui, /busEmit\("melo:tags-will-write", \{ paths: willWrite \}\)/);
  assert.match(read("src-tauri/src/library_db.rs"), /pub paths: Vec<String>/);
});
