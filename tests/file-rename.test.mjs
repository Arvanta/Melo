import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { transformSync } from "esbuild";

const here = dirname(fileURLToPath(import.meta.url));
const read = (p) => readFileSync(join(here, "..", p), "utf8");
const js = transformSync(read("src/file-rename.ts"), { loader: "ts", format: "esm" }).code;
const R = await import("data:text/javascript;base64," + Buffer.from(js).toString("base64"));

test("UI name rules match the Rust rules", () => {
  assert.equal(R.stemProblem("  01 - Hello  "), null);
  assert.equal(R.stemProblem("سلام دنیا"), null);
  for (const bad of ["", "   ", "a/b", "a\\b", "a:b", "a*b", "a?b", 'a"b', "a<b", "a>b", "a|b", "a\u0001b", "name.", "CON", "nul.txt", "com1", "a".repeat(201)]) {
    assert.ok(R.stemProblem(bad), JSON.stringify(bad));
  }
  assert.equal(R.stemProblem("console"), null);
  assert.equal(R.stemProblem("a".repeat(200)), null);
});

test("splitFileName keeps the extension apart", () => {
  assert.deepEqual(R.splitFileName("01 - Song.mp3"), { stem: "01 - Song", ext: ".mp3" });
  assert.deepEqual(R.splitFileName("a.b.flac"), { stem: "a.b", ext: ".flac" });
  assert.deepEqual(R.splitFileName("noext"), { stem: "noext", ext: "" });
  assert.deepEqual(R.splitFileName(".hidden"), { stem: ".hidden", ext: "" });
});

test("rename is wired end to end", () => {
  const ui = read("src/tag-editor.ts");
  assert.match(ui, /"rename_tracks"/);
  assert.match(ui, /busEmit\("melo:tracks-renamed"/);
  assert.match(ui, /Save or revert your tag changes first/);
  for (const f of ["src/player.ts", "src/library.ts", "src/lyrics.ts"]) assert.match(read(f), /busOn\("melo:tracks-renamed"/, f);
  const rs = read("src-tauri/src/library_db.rs");
  assert.match(rs, /pub async fn rename_tracks/);
  assert.match(rs, /defer_foreign_keys/);
  assert.match(rs, /fn move_track_rows/);
  assert.match(read("src-tauri/src/main.rs"), /mod file_rename;/);
  assert.match(read("src-tauri/src/main.rs"), /library_db::rename_tracks,/);
});
