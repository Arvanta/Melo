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
