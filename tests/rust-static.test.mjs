import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const readSrc = (p) => readFileSync(join(here, "..", p), "utf8");

// Static checks that tokenize Rust string/comment-aware and pin the
// invariants `cargo check` cannot catch in this workspace (no cargo
// here): SQL-style `--` comment lines at Rust code position, and
// `#[tauri::command]` attributes that drifted onto a helper.

const RS_FILES = [
  "src-tauri/src/library_db.rs",
  "src-tauri/src/main.rs",
];

// Tokenize: strip string literals ("…", r#"…"#, 'c') and comments (// /* */),
// remembering where each code character came from.
function splitCodeAndText(src) {
  let i = 0;
  let code = "";
  const text = []; // { ch, index }
  const n = src.length;
  const rawHashes = () => {
    // at src[i] === '"' preceded by r#* — count leading hashes
    let h = 0;
    while (src[i - 1 - h] === "#") h++;
    return h;
  };
  while (i < n) {
    const c = src[i];
    const c2 = src.slice(i, i + 2);
    if (c2 === "//") {
      while (i < n && src[i] !== "\n") i++;
      continue;
    }
    if (c2 === "/*") {
      i += 2;
      while (i < n && src.slice(i, i + 2) !== "*/") i++;
      i += 2;
      continue;
    }
    if (c === '"') {
      i++;
      while (i < n && src[i] !== '"') { if (src[i] === "\\") i++; i++; }
      i++;
      continue;
    }
    if (c === "r" && (src[i + 1] === '"' || src[i + 1] === "#")) {
      // raw string: r"…" or r#"…"# / r##"…"##
      let j = i + 1;
      let hashes = 0;
      while (src[j] === "#") { hashes++; j++; }
      if (src[j] === '"') {
        const end = `"${"#".repeat(hashes)}`;
        const k = src.indexOf(end, j + 1);
        i = (k === -1 ? n : k + end.length);
        continue;
      }
      // plain identifier starting with r — fall through
    }
    if (c === "'") {
      // char literal vs lifetime: char is 'x' or '\x'
      if (src[i + 1] === "\\") {
        i += 2;
        while (i < n && src[i] !== "'") i++;
        i++;
        continue;
      }
      if (src[i + 2] === "'") { i += 3; continue; }
      // lifetime — just an identifier char, treat as code
    }
    code += c;
    text.push({ ch: c, index: i });
    i++;
  }
  return { code, text, src };
}

function lineOf(src, index) {
  let line = 1;
  for (let i = 0; i < index && i < src.length; i++) if (src[i] === "\n") line++;
  return line;
}

for (const file of RS_FILES) {
  test(`rust static: ${file} — no SQL-style comments at code position`, () => {
    const src = readSrc(file);
    const { code, text } = splitCodeAndText(src);
    const bad = [];
    for (let ln = 0; ln < code.split("\n").length; ln++) { /* warm nothing */ }
    // walk the code view line by line using the text mapping
    const lines = code.split("\n");
    // rebuild per-line char→original-index lookup
    const idxOf = [];
    for (const t of text) idxOf.push(t.index);
    let pos = 0;
    lines.forEach((line, no) => {
      const trimmed = line.trimStart();
      if (trimmed.startsWith("--")) {
        // map back: this line's first code char
        bad.push(`line ${no + 1}: ${trimmed.slice(0, 60)}`);
      }
    });
    assert.deepEqual(bad, [], "`--` comment lines at Rust code position (SQL style) are parse errors");
  });

  test(`rust static: ${file} — only ASCII at code position`, () => {
    const src = readSrc(file);
    const { text } = splitCodeAndText(src);
    const bad = [];
    for (const { ch, index } of text) {
      if (ch.charCodeAt(0) > 127) bad.push(`line ${lineOf(src, index)}: ${JSON.stringify(ch)}`);
      if (bad.length >= 5) break;
    }
    assert.deepEqual(bad, [], "non-ASCII characters at CODE position are token errors (em-dash class)");
  });

  test(`rust static: ${file} — braces/parens/brackets balance`, () => {
    const src = readSrc(file);
    const { code } = splitCodeAndText(src);
    const pairs = { "{": "}", "(": ")", "[": "]" };
    const stack = [];
    for (const ch of code) {
      if (pairs[ch]) stack.push(pairs[ch]);
      else if (ch === "}" || ch === ")" || ch === "]") {
        assert.equal(stack.pop(), ch, `unbalanced '${ch}' near the end of the file`);
      }
    }
    assert.equal(stack.length, 0, `unclosed: ${stack.join("")}`);
  });
}

test("rust static: reorder commands return entry+track rows", () => {
  const lib = readSrc("src-tauri/src/library_db.rs");
  assert.match(lib, /pub struct QueueOrderRow/, "the broadcast row struct must exist");
  assert.match(lib, /pub async fn sort_queue\(sort: String, state: State<'_, LibraryState>\) -> Result<Vec<QueueOrderRow>, String>/,
    "sort_queue must return entry+track rows");
  assert.match(lib, /pub async fn move_queue_entries\(entry_ids: Vec<i64>, target_index: i64, state: State<'_, LibraryState>\) -> Result<Vec<QueueOrderRow>, String>/,
    "move_queue_entries must return entry+track rows");
  assert.match(lib, /fn queue_order_rows\(/, "the shared row builder must exist");
});

test("rust static: append_queue_tracks returns the created entry ids", () => {
  const lib = readSrc("src-tauri/src/library_db.rs");
  assert.match(lib, /pub async fn append_queue_tracks\(track_ids: Vec<String>, state: State<'_, LibraryState>\) -> Result<Vec<i64>, String>/,
    "append_queue_tracks must return the new entry ids");
  const i = lib.indexOf("pub async fn append_queue_tracks");
  const body = lib.slice(i, lib.indexOf("\n}", i));
  assert.ok(body.includes("entry_ids.push(tx.last_insert_rowid())"),
    "one entry id must be collected per inserted row (entry_id is the rowid)");
  assert.ok(body.includes("Ok(entry_ids)"),
    "the command must return the collected ids");
  assert.ok(body.includes("renumber_queue(&tx)?"),
    "positions must still be renumbered inside the transaction");
});

test("rust static: queue_tracks maps q.entry_id from column 13 (not replay_gain)", () => {
  // SELECT order is id,path,title,artist,album_artist,album,genre,year,duration,
  // artwork_path,codec,specs,replay_gain,q.entry_id — so entry_id is index 13.
  // Reading r.get(12) used to put replay_gain into playlist_entry_id and left
  // every queue row without an entry id → drag/multi-select dead in the UI.
  const lib = readSrc("src-tauri/src/library_db.rs");
  const i = lib.indexOf("pub async fn queue_tracks");
  assert.ok(i >= 0, "queue_tracks must exist");
  const body = lib.slice(i, lib.indexOf("\n}", i + 1));
  assert.ok(body.includes("q.entry_id"), "the SELECT must project q.entry_id");
  assert.match(body, /row_track_with_entries\(r,\s*Some\(r\.get\(13\)\?\)\)/,
    "entry_id must be read from column 13 and wrapped in Some");
  assert.doesNotMatch(body, /row_track_with_entries\(r,\s*r\.get\(12\)/,
    "must never read column 12 (replay_gain) as the entry id");
});

test("rust static: remove_queue_entries removes rows and returns the order", () => {
  const lib = readSrc("src-tauri/src/library_db.rs");
  assert.match(lib, /pub async fn remove_queue_entries\(entry_ids: Vec<i64>, state: State<'_, LibraryState>\) -> Result<Vec<QueueOrderRow>, String>/,
    "the queue-entry removal command must exist and return order rows");
  assert.match(lib, /DELETE FROM queue WHERE entry_id = \?1/, "removal must delete by entry id");
  const main = readSrc("src-tauri/src/main.rs");
  assert.ok(main.includes("library_db::remove_queue_entries"), "remove_queue_entries must be registered");
});

test("rust static: queue reorder commands return the type their signature promises", () => {
  // move_queue_entries kept a pre-round-14 early return
  // (Ok(Vec<String>) inside a Vec<QueueOrderRow> command) that only rustc
  // could catch. Pin the invariant statically: in every queue command
  // body, every Ok(...) must match the signature's payload type.
  const lib = readSrc("src-tauri/src/library_db.rs");
  const sigRe = /pub async fn (\w+)\([^)]*\) -> Result<(Vec<QueueOrderRow>|Vec<String>), String> \{/g;
  let found = 0;
  let m;
  while ((m = sigRe.exec(lib)) !== null) {
    const name = m[1];
    const rows = m[2] === "Vec<QueueOrderRow>";
    const bodyStart = m.index + m[0].length;
    const bodyEnd = lib.indexOf("\n}", bodyStart);
    const body = lib.slice(bodyStart, bodyEnd);
    if (!body.includes("Ok(")) continue; // tail-expression only
    for (const om of body.matchAll(/Ok\(([^)]*)\)/g)) {
      const inner = om[1];
      if (rows) {
        assert.ok(inner.includes("queue_order_rows"),
          `${name}: Ok(${inner.trim()}) must be Ok(queue_order_rows(...)) — the signature returns QueueOrderRow rows`);
      } else {
        assert.ok(!inner.includes("queue_order_rows"),
          `${name}: signature returns Vec<String> but the body returns rows`);
      }
    }
    found++;
  }
  assert.ok(found >= 3, "the three reorder commands (sort/move/remove) must be checked");
});

test("rust static: block drops BELOW the selection move the block exactly one row", () => {
  // insertion must subtract the block entries before the hovered
  // row and land AFTER it — otherwise an N-row block jumped N rows down.
  const lib = readSrc("src-tauri/src/library_db.rs");
  for (const fn of ["move_queue_entries", "move_playlist_entries"]) {
    const i = lib.indexOf(`pub async fn ${fn}`);
    assert.ok(i > 0, fn + " must exist");
    const body = lib.slice(i, lib.indexOf("\n}", i));
    assert.ok(body.includes("moving_before_t"), fn + " must subtract block entries before the hovered row");
    assert.ok(body.includes("if below {"), fn + " must land AFTER the hovered row when dropping below");
    assert.ok(body.includes("saturating_sub"), fn + " must guard the subtraction");
  }
});

test("rust static: move_queue_entries borrows order_ids only before consuming it (E0382 guard)", () => {
  // the round-20 insertion math borrowed order_ids AFTER
  // order_ids.into_iter() had consumed it — rustc E0382 on CI. Pin the
  // ordering: every borrow must textually precede the consuming into_iter.
  const lib = readSrc("src-tauri/src/library_db.rs");
  const i = lib.indexOf("pub async fn move_queue_entries");
  const body = lib.slice(i, lib.indexOf("\n}", i));
  const code = body.split("\n").map((l) => l.replace(/\/\/.*$/, "")).join("\n"); // comments may NAME the pattern
  const consumeRe = /order_ids\s*\.\s*into_iter\(\)/;
  const mConsume = consumeRe.exec(code);
  assert.ok(mConsume, "the consuming order_ids.into_iter() must exist");
  const borrowRe = /order_ids\s*\.\s*iter\(\)/g;
  let m, borrows = 0;
  while ((m = borrowRe.exec(code)) !== null) {
    borrows++;
    assert.ok(m.index < mConsume.index,
      "order_ids.iter() must appear BEFORE the consuming into_iter() (borrow-after-move)");
  }
  assert.ok(borrows >= 2, "the block-distance math must borrow order_ids at least twice");
});

test("rust static: batched artwork resolution shares one connection", () => {
  // the Albums-tab artwork stall: one command per album, each
  // opening its own SQLite connection. The batch command must resolve the
  // whole page over a SINGLE connection via the shared sync helper.
  const lib = readSrc("src-tauri/src/library_db.rs");
  assert.match(lib, /pub async fn ensure_track_artwork_batch\(ids: Vec<String>/,
    "the batch command must exist");
  assert.match(lib, /fn ensure_track_artwork_sync\(conn: &Connection/,
    "the shared sync helper must exist");
  const i = lib.indexOf("pub async fn ensure_track_artwork_batch");
  const body = lib.slice(i, lib.indexOf("\n}", i));
  assert.equal((body.match(/open_db\(/g) || []).length, 1,
    "the batch body must open the DB exactly ONCE");
  assert.match(body, /ensure_track_artwork_sync\(&conn, id, &artwork_dir\)/,
    "the batch loop must delegate to the shared helper");
  const singleStart = lib.indexOf("pub async fn ensure_track_artwork(");
  const single = lib.slice(singleStart, lib.indexOf("\n}", singleStart));
  assert.match(single, /ensure_track_artwork_sync\(&conn,&id,&artwork_dir\)/,
    "the single command must delegate to the same helper");
  const main = readSrc("src-tauri/src/main.rs");
  assert.match(main, /library_db::ensure_track_artwork_batch,/,
    "the batch command must be registered in the invoke handler");
});

test("rust static: every #[tauri::command] attaches to a real fn and every registered command exists", () => {
  const lib = readSrc("src-tauri/src/library_db.rs");
  const main = readSrc("src-tauri/src/main.rs");

  const collectCommands = (src) => {
    const names = new Set();
    const lines = src.split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() !== "#[tauri::command]") continue;
      let j = i + 1;
      while (j < lines.length) {
        const t = lines[j].trim();
        if (t === "" || t.startsWith("///") || t.startsWith("//") || t.startsWith("#[")) { j++; continue; }
        const m = t.match(/^(?:pub(?:\([^)]*\))?\s+)?(?:async\s+)?fn\s+(\w+)/);
        assert.ok(m, `#[tauri::command] at line ${i + 1} must be followed by a function, found: ${t.slice(0, 60)}`);
        names.add(m[1]);
        break;
      }
    }
    return names;
  };

  const libCmds = collectCommands(lib);
  const mainCmds = collectCommands(main);
  assert.ok(libCmds.has("import_m3u_file"), "import_m3u_file must carry #[tauri::command]");
  assert.ok(!libCmds.has("resolve_m3u_paths") && !libCmds.has("is_m3u_file"),
    "internal helpers must NOT carry #[tauri::command]");

  // registered names inside generate_handler![ … ]
  const h0 = main.indexOf("generate_handler![");
  assert.ok(h0 > 0, "generate_handler! must exist");
  const h1 = main.indexOf("])", h0);
  const region = main.slice(h0, h1);
  const registered = new Set();
  for (const m of region.matchAll(/(?:library_db::)?(\w+),/g)) registered.add(m[1]);

  const defined = new Set([...libCmds, ...mainCmds]);
  const missing = [...registered].filter((r) => !defined.has(r));
  assert.deepEqual(missing, [],
    "registered commands without #[tauri::command] — exactly the round-11 build breaker");
  const unregistered = [...libCmds].filter((c) => !registered.has(c));
  assert.deepEqual(unregistered.filter((c) => !["resolve_m3u_paths", "is_m3u_file"].includes(c)), [],
    "commands defined but never registered (helpers excluded)");
});

test("rust static: the obsolete-schema guard no longer rejects the round-11 queue v2", () => {
  const lib = readSrc("src-tauri/src/library_db.rs");
  const i = lib.indexOf("Library database schema is obsolete");
  assert.ok(i > 0, "the obsolete guard must exist");
  const guard = lib.slice(lib.lastIndexOf("if !table_has_column", i), i);
  assert.ok(guard.includes("playlist_tracks"), "the guard must key on playlist_tracks");
  assert.ok(!guard.includes('"queue"'),
    "the guard must NOT reject queue.entry_id anymore (round-11 v2 schema) — this exact bug made every fresh install exit silently at launch");
  // the round-11 queue migration must still exist for old databases
  assert.match(lib, /ALTER TABLE queue RENAME TO queue_legacy;/, "old queue layouts must still migrate");
  // a fresh DB creates the v2 queue up front
  assert.match(lib, /entry_id INTEGER PRIMARY KEY,\s*\n\s*track_id TEXT NOT NULL REFERENCES tracks\(id\) ON DELETE CASCADE,/,
    "fresh installs must create the entry-keyed queue");
});

test("rust static: Album Artist metadata is stored and drives library grouping", () => {
  const lib = readSrc("src-tauri/src/library_db.rs");
  assert.match(lib, /pub album_artist: String/, "DbTrack must expose album_artist");
  assert.match(lib, /album_artist TEXT NOT NULL DEFAULT ''/, "the tracks table must persist album_artist");
  assert.match(lib, /ItemKey::AlbumArtist/, "scan metadata must read the Album Artist tag");
  assert.match(lib, /unwrap_or_else\(\|\| artist\.clone\(\)\)/, "missing Album Artist must fall back to Artist");
  assert.match(lib, /album_artist=excluded\.album_artist/, "rescans must refresh album_artist");
  assert.match(lib, /"album-artists"/, "the backend must support Album Artist groups");
  assert.match(lib, /album_artist \|\| char\(0\) \|\| album/, "Albums must key by album artist plus album");
  assert.match(lib, /SELECT COUNT\(\*\) FROM \(SELECT album_artist,album FROM tracks/, "stats must count album artist plus album groups");
  assert.match(lib, /album_artist=\?1 COLLATE NOCASE/, "Album Artist cover/filter lookups must use the new field");
  const main = readSrc("src-tauri/src/main.rs");
  assert.match(main, /album_artist: String/, "CLI-opened tracks must carry album_artist too");
});

test("rust static: library search field filter", () => {
  const lib = readSrc("src-tauri/src/library_db.rs");
  assert.match(lib, /fn library_filter_field\(/, "the field-aware filter must exist");
  assert.match(lib, /Some\("artist"\) =>/, "artist narrowing must exist");
  assert.match(lib, /Some\("album"\) =>/, "album narrowing must exist");
  assert.match(lib, /Some\("title"\) =>/, "title narrowing must exist");
  assert.match(lib, /field: Option<String>,/, "library_tracks must accept the field parameter");
});


// A block of `src` from `startNeedle` to the first line that is exactly "}" after it.
function fnBody(src, startNeedle) {
  const i = src.indexOf(startNeedle);
  assert.ok(i >= 0, `missing: ${startNeedle}`);
  const end = src.indexOf("\n}\n", i);
  assert.ok(end > i, `unterminated: ${startNeedle}`);
  return src.slice(i, end + 2);
}

test("rust static: library_groups pages first, resolves covers per PAGE ROW with NOCASE, and COUNT is optional", () => {
  // The Albums-tab stall: covers came from correlated subqueries comparing with the column's
  // BINARY collation, which the NOCASE indexes cannot serve -> a full-table scan per group,
  // evaluated for EVERY group before LIMIT applied (O(groups x tracks) per page).
  const lib = readSrc("src-tauri/src/library_db.rs");
  const q = fnBody(lib, "fn query_groups(");
  assert.ok(!/\bt2\./.test(q) && !q.includes("artwork_pick"), "no correlated cover subqueries may return");
  const pageSql = q.slice(q.indexOf("let page_sql"), q.indexOf("let pin_album_index"));
  assert.ok(pageSql.length > 50 && !pageSql.includes("(SELECT"), "the paged statement must not embed subselects");
  for (const re of [/album_artist=\?1 COLLATE NOCASE AND album=\?2 COLLATE NOCASE/, /album_artist=\?1 COLLATE NOCASE AND artwork_path/, /genre=\?1 COLLATE NOCASE/, /artist=\?1 COLLATE NOCASE AND artwork_path/]) {
    assert.match(q, re, "every cover lookup must compare with COLLATE NOCASE (index-servable): " + re);
  }
  assert.ok(q.indexOf("page_rows.push(") < q.indexOf("cover_stmt.query_row"),
    "covers must be resolved AFTER the page rows exist (only for the returned rows)");
  assert.match(q, /include_total: bool/, "the COUNT must be optional");
  assert.match(q, /if include_total \{[\s\S]*?SELECT COUNT\(\*\) FROM \(SELECT 1 FROM tracks[\s\S]*?\} else \{\s*0\s*\}/,
    "the aggregate COUNT must only run when requested");
  // deterministic album paging + the terms the album index is declared with
  assert.ok(q.includes('"album COLLATE NOCASE, album_artist COLLATE NOCASE"'), "album groups must order by album then album artist (stable paging)");
  assert.ok(q.includes("ORDER BY {group_by}"), "ORDER BY must equal GROUP BY so the index order satisfies both");
  // pinned index with a safe fallback
  assert.ok(q.includes("INDEXED BY idx_lib_album_album_artist"), "the album-first index must be pinned for the unscoped album list");
  assert.match(q, /Err\(_\) if pin_album_index => conn\.prepare\(&page_sql\("tracks"\)\)/, "a refused hint must fall back to the plain statement");
});

test("rust static: library_groups runs on the blocking pool with its OWN connection", () => {
  // Holding the shared connection's mutex during a long browse query stalled every other
  // command, and running it inline occupied an async worker.
  const lib = readSrc("src-tauri/src/library_db.rs");
  const cmd = fnBody(lib, "pub async fn library_groups(");
  assert.match(cmd, /include_total: Option<bool>/, "the command must expose the optional total");
  assert.ok(cmd.includes("spawn_blocking"), "must run on the blocking pool");
  assert.ok(cmd.includes("open_db(&db_path)?"), "must open its own connection");
  assert.ok(!cmd.includes("locked_db"), "must NOT take the shared connection mutex");
  assert.ok(cmd.includes("-> Result<Page<GroupRow>, String>"), "explicit closure return type (E0282 guard)");
  const main = readSrc("src-tauri/src/main.rs");
  assert.match(main, /library_db::library_groups,/, "still registered");
});

test("rust static: the Library browse indexes exist, are partial and match the query collations", () => {
  const lib = readSrc("src-tauri/src/library_db.rs");
  const schema = fnBody(lib, "fn init_schema(");
  const want = [
    ["idx_lib_album_album_artist", "album COLLATE NOCASE, album_artist COLLATE NOCASE"],
    ["idx_lib_album_artist_album", "album_artist COLLATE NOCASE, album COLLATE NOCASE"],
    ["idx_lib_album_artist", "album COLLATE NOCASE, artist COLLATE NOCASE"],
    ["idx_lib_artist_album", "artist COLLATE NOCASE, album COLLATE NOCASE"],
    ["idx_lib_genre", "genre COLLATE NOCASE"],
    ["idx_lib_title_id", "title COLLATE NOCASE, id"],
  ];
  for (const [name, cols] of want) {
    const re = new RegExp(`CREATE INDEX IF NOT EXISTS ${name} ON tracks\\(${cols.replace(/[()]/g, "\\$&")}\\) WHERE library_owned=1;`);
    assert.match(schema, re, `${name} must be created as a partial index over (${cols})`);
  }
  // every index the queries pin by name must be one that init_schema creates
  for (const m of lib.matchAll(/INDEXED BY (\w+)/g)) {
    assert.ok(schema.includes(`EXISTS ${m[1]} ON`), `INDEXED BY ${m[1]} refers to an index init_schema does not create`);
  }
});
