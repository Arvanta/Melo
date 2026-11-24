import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { transformSync } from "esbuild";

const here = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(join(here, "..", "src/tag-tools.ts"), "utf8");
const js = transformSync(src, { loader: "ts", format: "esm" }).code;
const T = await import("data:text/javascript;base64," + Buffer.from(js).toString("base64"));

const F = (path) => ({ id: path, path, fileName: path.split(/[\\/]/).pop() });
const none = () => "";

test("pattern: track - title, numeric track, lazy title", () => {
  const r = T.tagsFromFilenames([F("/m/01 - Hello - World.mp3"), F("C:\\m\\12 - Foo.flac")], "%track% - %title%", none);
  assert.equal(r.matched, 2);
  assert.equal(r.values.get("/m/01 - Hello - World.mp3").get("title"), "Hello - World");
  assert.equal(r.values.get("/m/01 - Hello - World.mp3").get("track"), "01");
  assert.equal(r.values.get("C:\\m\\12 - Foo.flac").get("title"), "Foo");
});

test("pattern: folder levels and unmatched files", () => {
  const files = [F("/Music/Nova/Midnight/03 - Static.mp3"), F("/Music/loose.mp3")];
  const r = T.tagsFromFilenames(files, "%artist%/%album%/%track% - %title%", none);
  assert.equal(r.matched, 1);
  assert.deepEqual(r.unmatched, ["/Music/loose.mp3"]);
  const m = r.values.get(files[0].id);
  assert.equal(m.get("artist"), "Nova"); assert.equal(m.get("album"), "Midnight"); assert.equal(m.get("title"), "Static");
});

test("pattern: underscores, only-empty, errors", () => {
  const f = F("/m/05_My_Song.mp3");
  let r = T.tagsFromFilenames([f], "%track%_%title%", none, { underscores: true });
  assert.equal(r.values.get(f.id).get("title"), "My Song");
  r = T.tagsFromFilenames([f], "%track%_%title%", (id, k) => (k === "title" ? "Keep" : ""), { onlyEmpty: true });
  assert.equal(r.values.get(f.id).has("title"), false);
  assert.equal(r.values.get(f.id).get("track"), "05");
  assert.ok(T.tagsFromFilenames([f], "%bogus%", none).error);
  assert.ok(T.tagsFromFilenames([f], "", none).error);
  assert.ok(T.tagsFromFilenames([f], "%title% %title%", none).error);
  assert.ok(T.tagsFromFilenames([f], "plain text", none).error);
});

test("numbering: list order vs natural file-name order, total", () => {
  const files = [F("/m/track10.mp3"), F("/m/track2.mp3"), F("/m/track1.mp3")];
  let n = T.numberTracks(files, { start: 1, setTotal: true, order: "filename" });
  assert.equal(n.get("/m/track1.mp3").get("track"), "1");
  assert.equal(n.get("/m/track2.mp3").get("track"), "2");
  assert.equal(n.get("/m/track10.mp3").get("track"), "3");
  assert.equal(n.get("/m/track10.mp3").get("trackTotal"), "3");
  n = T.numberTracks(files, { start: 5, setTotal: false, order: "list" });
  assert.equal(n.get("/m/track10.mp3").get("track"), "5");
  assert.equal(n.get("/m/track1.mp3").get("track"), "7");
  assert.equal(n.get("/m/track1.mp3").has("trackTotal"), false);
});

test("find & replace: plain, case, regex, literal $", () => {
  const files = [F("a"), F("b")];
  const cur = (id, k) => (k !== "title" ? "" : id === "a" ? "Foo feat. Bar (Live)" : "nothing");
  let r = T.findReplaceAll(files, ["title"], cur, " (Live)", "", { matchCase: true, regex: false });
  assert.equal(r.changed, 1);
  assert.equal(r.values.get("a").get("title"), "Foo feat. Bar");
  r = T.findReplaceAll(files, ["title"], cur, "FEAT.", "ft.", { matchCase: false, regex: false });
  assert.equal(r.values.get("a").get("title"), "Foo ft. Bar (Live)");
  r = T.findReplaceAll(files, ["title"], cur, "FEAT.", "ft.", { matchCase: true, regex: false });
  assert.equal(r.changed, 0);
  r = T.findReplaceAll(files, ["title"], cur, "(\\w+) feat", "$1 &", { matchCase: false, regex: true });
  assert.equal(r.values.get("a").get("title"), "Foo &. Bar (Live)");
  r = T.findReplaceAll(files, ["title"], cur, "Foo", "$&$&", { matchCase: true, regex: false });
  assert.equal(r.values.get("a").get("title").startsWith("$&$& feat"), true);
  assert.ok(T.findReplaceAll(files, ["title"], cur, "(", "x", { matchCase: true, regex: true }).error);
  assert.ok(T.findReplaceAll(files, ["title"], cur, "", "x", { matchCase: true, regex: false }).error);
});

test("normalizeValue treats 07 and 7 alike", () => {
  assert.equal(T.normalizeValue("track", "07"), "7");
  assert.equal(T.normalizeValue("track", "0"), "");
  assert.equal(T.normalizeValue("title", "  x "), "x");
});
