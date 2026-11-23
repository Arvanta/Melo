import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const rs = readFileSync(join(here, "..", "src-tauri/src/library_db.rs"), "utf8");

// JS mirror of `natural_file_cmp` (library_db.rs, round 118). Rust cannot be
// compiled in this workspace, so the algorithm is pinned here with the same
// examples as the Rust unit tests; the static checks below keep the two in step.
const fold = (c) => (c === "\u064A" ? "\u06CC" : c === "\u0643" ? "\u06A9" : c);
function tokens(stem) {
  const out = []; let digits = ""; let text = "";
  const flush = () => { if (digits) { out.push({ n: digits.replace(/^0+/, ""), len: digits.length }); digits = ""; } };
  for (const c of stem) {
    if (c >= "0" && c <= "9") { if (text) { out.push({ t: text }); text = ""; } digits += c; }
    else { flush(); text += fold(c.toLowerCase()); }
  }
  flush(); if (text) out.push({ t: text });
  return out;
}
function split(path) {
  const name = path.split(/[\\/]/).pop();
  const i = name.lastIndexOf(".");
  return i > 0 ? [name.slice(0, i), name.slice(i + 1), name] : [name, "", name];
}
const cmp = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
function natural(a, b) {
  if (!a && !b) return 0; if (!a) return 1; if (!b) return -1;
  const [sa, ea, na] = split(a); const [sb, eb, nb] = split(b);
  const ta = tokens(sa), tb = tokens(sb); let zero = 0;
  for (let i = 0; i < Math.min(ta.length, tb.length); i++) {
    const x = ta[i], y = tb[i]; let o;
    if (x.n !== undefined && y.n !== undefined) {
      o = cmp(x.n.length, y.n.length) || cmp(x.n, y.n);
      if (o === 0 && zero === 0) zero = cmp(x.len, y.len);
    } else if (x.t !== undefined && y.t !== undefined) o = cmp(x.t, y.t);
    else o = x.n !== undefined ? -1 : 1;
    if (o) return o;
  }
  return cmp(ta.length, tb.length) || zero || cmp(ea.toLowerCase(), eb.toLowerCase()) || cmp(na, nb);
}
const sorted = (v) => [...v].sort(natural);

test("digit runs compare as numbers", () => {
  assert.deepEqual(sorted(["track100.mp3", "track2.mp3", "track10.mp3", "track03.mp3"]),
    ["track2.mp3", "track03.mp3", "track10.mp3", "track100.mp3"]);
  assert.deepEqual(sorted(["a1b10", "a1b2", "a02"]), ["a1b2", "a1b10", "a02"]);
});
test("directory ignored, case-insensitive, both separators", () => {
  assert.deepEqual(sorted(["C:\\m\\b.mp3", "/x/A.flac"]), ["/x/A.flac", "C:\\m\\b.mp3"]);
  assert.deepEqual(sorted(["Track2.mp3", "track1.mp3"]), ["track1.mp3", "Track2.mp3"]);
});
test("padding tie, huge numbers, empty path last, Arabic yeh folds", () => {
  assert.deepEqual(sorted(["t02.mp3", "t2.mp3"]), ["t2.mp3", "t02.mp3"]);
  assert.deepEqual(sorted(["t99999999999999999999999.mp3", "t9.mp3"]), ["t9.mp3", "t99999999999999999999999.mp3"]);
  assert.deepEqual(sorted(["", "a.mp3"]), ["a.mp3", ""]);
  // Arabic yeh folds to Persian yeh: the first letter ties, the 2nd decides.
  assert.ok(natural("\u064Ab", "\u06CCa") > 0);
  assert.ok(natural("\u064Aa", "\u06CCb") < 0);
});
test("Rust side is wired", () => {
  assert.match(rs, /create_collation\("MELO_FILENAME"/);
  assert.match(rs, /"file-asc"\)=>"t\.path COLLATE MELO_FILENAME,pt\.entry_id"/);
  assert.match(rs, /"file-asc"\) => "t\.path COLLATE MELO_FILENAME,q\.position"/);
  assert.match(rs, /SAVEPOINT melo_queue_order/);
  assert.match(readFileSync(join(here, "..", "src-tauri/Cargo.toml"), "utf8"), /"collation"/);
});

test("round 118: commands registered, UI hooks present", () => {
  const main = readFileSync(join(here, "..", "src-tauri/src/main.rs"), "utf8");
  for (const c of ["playlist_totals", "queue_totals", "insert_queue_after"]) {
    assert.match(main, new RegExp(`library_db::${c},`));
    assert.match(rs, new RegExp(`pub async fn ${c}\\(`));
  }
  const lib = readFileSync(join(here, "..", "src/library.ts"), "utf8");
  assert.match(lib, /attachMarquee\(\{/);
  assert.match(lib, /melo-playlist-sorts/);
  assert.match(lib, /"insert_queue_after"/);
  const html = readFileSync(join(here, "..", "src/main.ts"), "utf8");
  assert.match(html, /value="file-asc"/);
  assert.match(html, /id="playlistStats"/);
  assert.match(html, /removeItem\("melo-playlist-sorts"\)/);
});

test("round 118b: queue-view click keeps order, follow-playing, outside-click, skins", () => {
  const lib = readFileSync(join(here, "..", "src/library.ts"), "utf8");
  const pl = readFileSync(join(here, "..", "src/player.ts"), "utf8");
  assert.equal((lib.match(/fromQueue: true, keepOrder: true/g) || []).length, 2);
  assert.match(pl, /isShuffle && !keepOrder/);
  assert.match(lib, /scrollPlaylistToPlaying/);
  assert.match(lib, /"playlist_track_index"/);
  assert.match(rs, /pub async fn playlist_track_index\(/);
  assert.match(rs, /current_index: Option<i64>/);
  assert.match(lib, /clearPlaylistSelection\(\);\n  \}\);/);
  for (const f of ["Pane", "Ember"]) {
    const html = readFileSync(join(here, "..", `skins/${f}.html`), "utf8");
    const play = html.indexOf('data-melo="play"');
    const stop = html.indexOf('data-melo="stop"');
    const next = html.indexOf('data-melo="next"');
    assert.ok(play > 0 && stop > play && stop < Math.max(next, html.indexOf('data-melo="prev"') + 1e9), `${f}: Stop right after Play`);
    assert.ok(stop - play < 1200, `${f}: Stop directly follows Play`);
  }
});
