import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { transformSync } from "esbuild";

const here = dirname(fileURLToPath(import.meta.url));
const js = transformSync(readFileSync(join(here, "..", "src/tag-info.ts"), "utf8"), { loader: "ts", format: "esm" }).code;
const T = await import("data:text/javascript;base64," + Buffer.from(js).toString("base64"));

const info = (o) => ({ id: "a", path: "E:\\Music\\A\\a.mp3", error: null, format: "MPEG audio (MP3)", tagTypes: ["ID3v2"], id3Version: "ID3v2.3",
  size: 14400000, modified: 1, durationMs: 357000, overallBitrate: 320, audioBitrate: 320, sampleRate: 44100, channels: 2, bitDepth: null,
  encoder: "Lame3.99", addedAt: 1, playCount: 0, lastPlayedAt: null, ...o });

test("formatters", () => {
  assert.equal(T.fmtDuration(357000), "5:57");
  assert.equal(T.fmtDuration(3723000), "1:02:03");
  assert.equal(T.fmtSize(14400000), "13.7 MB");
  assert.equal(T.fmtSampleRate(44100), "44.1 kHz");
  assert.equal(T.fmtSampleRate(48000), "48 kHz");
  assert.equal(T.fmtChannels(2), "Stereo");
});

test("single-file info rows", () => {
  const rows = Object.fromEntries(T.infoRows([info({})]));
  assert.equal(rows["Type"], "MPEG audio (MP3)");
  assert.equal(rows["Tag version"], "ID3v2.3");
  assert.equal(rows["Bitrate"], "320 kbps");
  assert.equal(rows["Last played"], "Never");
  assert.equal(rows["Location"], "E:\\Music\\A\\a.mp3");
});

test("multi-file info: totals, mixed type, bitrate range, folders", () => {
  const rows = Object.fromEntries(T.infoRows([
    info({ id: "a" }),
    info({ id: "b", format: "FLAC", audioBitrate: 900, overallBitrate: 900, path: "E:\\Music\\B\\b.flac", playCount: 2 }),
  ]));
  assert.equal(rows["Files"], "2");
  assert.match(rows["Type"], /^Mixed — /);
  assert.equal(rows["Bitrate"], "320–900 kbps");
  assert.equal(rows["Location"], "Several folders");
  assert.equal(rows["Play count"], "2 in total");
  assert.deepEqual(T.infoRows([info({ error: "x" })]), []);
});

test("synced detection", () => {
  assert.equal(T.looksSynced("[00:12.50] hello"), true);
  assert.equal(T.looksSynced("[1:02] x"), true);
  assert.equal(T.looksSynced("[ar:Someone]\n[00:01.00]x"), true);
  assert.equal(T.looksSynced("just words [not a time]"), false);
  assert.equal(T.slotOf("plain\nlines"), "plain");
});

test("lyric write plans: targets, validation, clashes, deletes", () => {
  const src = [{ kind: "embedded", text: "plain", path: null }, { kind: "sidecar", text: "[00:01.00]x", path: "x.lrc" }];
  // synced edit into the sidecar: fine
  let r = T.planLyricWrites(src, { synced: { text: "[00:02.00]y", target: "sidecar" } }, { synced: "sidecar" });
  assert.deepEqual(r.errors, []);
  assert.deepEqual(r.writes, [{ slot: "synced", kind: "sidecar", text: "[00:02.00]y\n" }]);
  // plain edit into the tag: no trailing newline added
  r = T.planLyricWrites(src, { plain: { text: "new words", target: "embedded" } }, { plain: "embedded" });
  assert.equal(r.writes[0].text, "new words");
  // timestamps in the plain view / plain text in the synced view
  assert.ok(T.planLyricWrites(src, { plain: { text: "[00:01.00]x", target: "embedded" } }, {}).errors.length);
  assert.ok(T.planLyricWrites(src, { synced: { text: "no stamps", target: "sidecar" } }, {}).errors.length);
  // synced text cannot go into the tag
  assert.ok(T.planLyricWrites(src, { synced: { text: "[00:01.00]x", target: "embedded" } }, {}).errors.length);
  // plain text must not overwrite the synced .lrc
  assert.ok(T.planLyricWrites(src, { plain: { text: "words", target: "sidecar" } }, { plain: "embedded" }).errors.length);
  // two slots, same place
  assert.ok(T.planLyricWrites(src, { plain: { text: "w", target: "cache" }, synced: { text: "[00:01.00]x", target: "cache" } }, {}).errors.length);
  // clearing = delete (empty text)
  r = T.planLyricWrites(src, { plain: { text: "", target: "embedded" } }, { plain: "embedded" });
  assert.deepEqual(r.writes, [{ slot: "plain", kind: "embedded", text: "" }]);
});
