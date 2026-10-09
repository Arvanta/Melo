#!/usr/bin/env node
// tools/version.mjs — single-source version maintenance for Melo.
//
//   node tools/version.mjs            # same as --check
//   node tools/version.mjs --check    # verify every version-declaring file agrees
//   node tools/version.mjs 1.1.0      # write the new version into every file
//
// Why this exists: the GitHub Actions workflow refuses to build a version whose
// git tag already exists on the remote, so a published release can never be
// rebuilt or replaced. That guard is only as trustworthy as the version files
// themselves — `tauri-action` derives the tag from `tauri.conf.json`, while the
// guard's message and the installers' names come from the other files. This
// script is the one place that knows every spot a version is declared and keeps
// them in sync; the workflow runs `--check` before it touches anything.
//
// package.json is the source of truth for the version number.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;
// One capture group, always the version itself, so a write can replace exactly
// the matched version and leave the surrounding syntax alone.
const NUM = String.raw`(\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?)`;

// Every file that declares the app version. `limit` caps how many matches are
// expected: lock files also carry dependency versions that must never be
// touched (they live after the root block, so the first N matches are ours).
const SOURCES = [
  {
    file: "package.json",
    label: "package.json",
    patterns: [new RegExp(String.raw`"version":\s*"${NUM}"`, "g")],
    limit: 1,
  },
  {
    file: "package-lock.json",
    label: 'package-lock.json (root + packages[""])',
    patterns: [new RegExp(String.raw`"version":\s*"${NUM}"`, "g")],
    limit: 2,
  },
  {
    file: "src-tauri/tauri.conf.json",
    label: "tauri.conf.json (the tag tauri-action builds)",
    patterns: [new RegExp(String.raw`"version":\s*"${NUM}"`, "g")],
    limit: 1,
  },
  {
    file: "src-tauri/Cargo.toml",
    label: "Cargo.toml [package]",
    patterns: [new RegExp(String.raw`^version = "${NUM}"`, "gm")],
    limit: 1,
  },
  {
    file: "src-tauri/Cargo.lock",
    label: "Cargo.lock melo entry (keeps --locked green)",
    patterns: [new RegExp(String.raw`(?:name = "melo"\r?\nversion = ")${NUM}"`, "g")],
    limit: 1,
  },
  {
    file: "src/version.ts",
    label: "src/version.ts FALLBACK_VERSION (browser/demo + User-Agent)",
    patterns: [new RegExp(String.raw`FALLBACK_VERSION = "${NUM}"`, "g")],
    limit: 1,
  },
  {
    file: "README.md",
    label: "README.md release runbook",
    patterns: [
      new RegExp(String.raw`Version: \*\*${NUM}\*\*`, "g"),
      new RegExp(String.raw`Melo_${NUM}_x64-setup\.exe`, "g"),
      new RegExp(String.raw`release \`v${NUM}\``, "g"),
      new RegExp(String.raw`commit -m "Melo ${NUM}"`, "g"),
    ],
    limit: Infinity,
  },
];

function scan(entry, src) {
  const hits = [];
  for (const rx of entry.patterns) {
    let seen = 0;
    for (const m of src.matchAll(rx)) {
      if (seen >= entry.limit) break;
      seen += 1;
      hits.push({ match: m[0], version: m[1] });
    }
  }
  return hits;
}

function classify(entry, hits, expected) {
  if (!hits.length) return "missing";
  return hits.every((h) => h.version === expected) ? "match" : "mismatch";
}

function readEntry(entry) {
  return readFileSync(path.join(repoRoot, entry.file), "utf8");
}

function writeEntry(entry, src, from, to) {
  let out = src;
  let count = 0;
  for (const rx of entry.patterns) {
    let seen = 0;
    out = out.replace(rx, (full, version) => {
      if (seen >= entry.limit) return full;
      seen += 1;
      if (version !== from) return full;
      count += 1;
      return full.replace(version, to);
    });
  }
  return { out, count };
}

function currentVersion() {
  const pkg = JSON.parse(readFileSync(path.join(repoRoot, "package.json"), "utf8"));
  return pkg.version;
}

function report(expected, { write = false } = {}) {
  const rows = [];
  let failures = 0;
  for (const entry of SOURCES) {
    const src = readEntry(entry);
    const hits = scan(entry, src);
    const state = classify(entry, hits, expected);
    if (state !== "match") failures += 1;
    let written = 0;
    if (write) {
      const { out, count } = writeEntry(entry, src, hits[0]?.version ?? expected, expected);
      written = count;
      if (count) writeFileSync(path.join(repoRoot, entry.file), out, "utf8");
    }
    rows.push({
      label: entry.label,
      found: hits.map((h) => h.version).join(", ") || "—",
      hits: hits.length,
      state,
      written,
    });
  }
  return { rows, failures };
}

function main(argv) {
  const args = argv.slice(2);
  const check = args.includes("--check") || args.length === 0;
  const target = args.find((a) => !a.startsWith("-"));

  if (check && target) {
    console.error("version.mjs: use either --check or a new version, not both.");
    process.exit(2);
  }

  if (check) {
    const expected = currentVersion();
    if (!SEMVER.test(expected)) {
      console.error(`version.mjs: package.json version "${expected}" is not a valid semver.`);
      process.exit(1);
    }
    const { rows, failures } = report(expected);
    console.log(`Version consistency check — package.json says ${expected}\n`);
    for (const r of rows) {
      const mark = r.state === "match" ? "OK  " : "FAIL";
      console.log(`  ${mark} ${r.label} — found: ${r.found}`);
    }
    console.log("");
    if (failures) {
      console.error(
        `${failures} file(s) disagree with package.json (${expected}).\n` +
          `Fix with:  node tools/version.mjs ${expected}\n` +
          "The CI guard derives the release tag from tauri.conf.json — a mismatch\n" +
          "would build a differently-versioned installer than the one it checks."
      );
      process.exit(1);
    }
    console.log(`All ${rows.length} version sources agree: ${expected} — safe to build tag v${expected}.`);
    return;
  }

  if (!SEMVER.test(target)) {
    console.error(`version.mjs: "${target}" is not a valid semver (expected e.g. 1.1.0).`);
    process.exit(2);
  }
  const from = currentVersion();
  if (from === target) {
    console.log(`Nothing to do — the project is already at ${target}.`);
    return;
  }
  console.log(`Bumping ${from} → ${target}\n`);
  for (const entry of SOURCES) {
    const src = readEntry(entry);
    const { out, count } = writeEntry(entry, src, from, target);
    if (count) writeFileSync(path.join(repoRoot, entry.file), out, "utf8");
    console.log(`  ${count ? "wrote" : "MISS "} ${entry.label} (${count} spot${count === 1 ? "" : "s"})`);
  }
  const { failures } = report(target);
  console.log("");
  if (failures) {
    console.error(`${failures} source(s) still do not read ${target} — inspect tools/version.mjs's patterns.`);
    process.exit(1);
  }
  console.log(
    `Done. Now push; the workflow will refuse to build if tag v${target} already exists,\n` +
      `so v${from} and every older release stay untouched.`
  );
}

main(process.argv);
