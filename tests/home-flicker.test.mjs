import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";
const lib = readFileSync(new URL("../src/library.ts", import.meta.url), "utf8");
const css = readFileSync(new URL("../src/app.css", import.meta.url), "utf8");
test("Home is not re-rendered by the column reflow", () => {
  assert.match(lib, /function maybeReflowLibrary\(\) \{[\s\S]{0,400}libTab === "home" \|\| libTab === "playlists"\) return;/);
});
test("Home reserves the scrollbar and the async blocks' height", () => {
  assert.match(css, /#trackList\[data-home\] \{[^}]*scrollbar-gutter: stable/);
  assert.match(lib, /homeStatsH/);
  assert.match(lib, /homeBestH/);
});
