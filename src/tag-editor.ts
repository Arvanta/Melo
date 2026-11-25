// Tag editor window (round 119, stage 1).
//
// Runs inside the `?panel=tagedit` window. The ids to edit arrive through
// localStorage (`melo-tagedit-ids`, read once at load) and through the
// `melo:tagedit-load` bus event when the window is already open.
//
// Rules the UI keeps:
//  - a field is written ONLY when the user touched it (dirty); untouched
//    fields — including `<mixed>` ones — are never sent;
//  - clearing a field is an explicit act (empty text on a field the user
//    touched, or the ✕ button on a mixed one);
//  - the player releases the playing file before the write and reloads it
//    after (melo:tags-will-write / melo:tags-written);
//  - the backend writes through a temp copy, so a failed file is untouched.
import { busEmit, busOn } from "./bus";
import {
  findReplaceAll, normalizeValue, numberTracks, tagsFromFilenames,
  TEXT_FIELDS as TOOL_TEXT_FIELDS,
  type FieldKey, type FileRef, type PerFile,
} from "./tag-tools";
import { splitFileName, stemProblem } from "./file-rename";
import { clampStars, nextStars, starsHtml, starsLabel } from "./rating";
import {
  allowedTargets, defaultTarget, infoRows, KIND_LABEL, planLyricWrites, slotOf,
  type Info, type LyricDraft, type LyricKind, type LyricSlot, type LyricSource,
} from "./tag-info";

type Fields = {
  title: string; artist: string; albumArtist: string; album: string; genre: string;
  composer: string; comment: string; year: number; track: number; trackTotal: number;
  disc: number; discTotal: number; hasCover: boolean; rating: number;
};
type Common = {
  title: string | null; artist: string | null; albumArtist: string | null; album: string | null;
  genre: string | null; composer: string | null; comment: string | null;
  year: number | null; track: number | null; trackTotal: number | null;
  disc: number | null; discTotal: number | null; hasCover: boolean | null; rating: number | null;
};
type FileInfo = { id: string; path: string; fileName: string; fields: Fields | null; error: string | null };
type ReadResult = { files: FileInfo[]; common: Common };
type CoverInfo = { dataUrl: string; mime: string; bytes: number };
type WriteResult = { ok: string[]; failed: { id: string; path: string; error: string }[] };

type TextKey = "title" | "artist" | "albumArtist" | "album" | "genre" | "composer" | "comment";
type NumKey = "year" | "track" | "trackTotal" | "disc" | "discTotal";

export const TAGEDIT_IDS_KEY = "melo-tagedit-ids";
const CHUNK = 25;

const TEXT_FIELDS: { key: TextKey; label: string; area?: boolean }[] = [
  { key: "title", label: "Title" },
  { key: "artist", label: "Artist" },
  { key: "albumArtist", label: "Album artist" },
  { key: "album", label: "Album" },
  { key: "genre", label: "Genre" },
  { key: "composer", label: "Composer" },
];
const LABELS: Record<FieldKey, string> = {
  title: "Title", artist: "Artist", albumArtist: "Album artist", album: "Album", genre: "Genre",
  composer: "Composer", comment: "Comment", year: "Year", track: "Track", trackTotal: "Track total",
  disc: "Disc", discTotal: "Disc total",
};
const NUM_MAX: Record<NumKey, number> = { year: 9999, track: 9999, trackTotal: 9999, disc: 999, discTotal: 999 };

const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c]!));

/** Pure: the `edit` object sent to `tag_write` from the dirty map. Exported for tests. */
export function buildEdit(
  dirty: Map<FieldKey, string>,
  cover: { action: "set"; path: string } | { action: "remove" } | null,
): { edit: Record<string, unknown>; errors: string[] } {
  const edit: Record<string, unknown> = {};
  const errors: string[] = [];
  for (const [key, raw] of dirty) {
    if (key in NUM_MAX) {
      const text = raw.trim();
      if (text === "") { edit[key] = 0; continue; }
      if (!/^\d+$/.test(text)) { errors.push(`${LABELS[key]} must be a number`); continue; }
      const n = Number(text);
      if (n > NUM_MAX[key as NumKey]) { errors.push(`${LABELS[key]} must be at most ${NUM_MAX[key as NumKey]}`); continue; }
      edit[key] = n;
    } else {
      edit[key] = raw;
    }
  }
  if (cover) edit.cover = cover;
  return { edit, errors };
}

const PATTERN_KEY = "melo-tagedit-pattern";
const PATTERN_PRESETS = ["%track% - %title%", "%artist% - %title%", "%track% %title%", "%track%. %title%", "%artist% - %album% - %track% - %title%", "%disc%-%track% - %title%", "%artist%/%album%/%track% - %title%"];

export function setupTagEditor(toast: (m: string) => void) {
  const root = document.getElementById("tagEditRoot");
  if (!root) return;
  let invoke: (<T = any>(cmd: string, args?: Record<string, unknown>) => Promise<T>) | null = null;
  let files: FileInfo[] = [];
  let common: Common | null = null;
  const dirty = new Map<FieldKey, string>();
  // Per-file values produced by the batch tools (layered over `dirty`).
  const perFile: PerFile = new Map();
  // New star rating for every selected file (null = untouched, 0 = clear).
  let ratingDraft: number | null = null;
  let cover: { action: "set"; path: string } | { action: "remove" } | null = null;
  let coverPreview: string | null = null;
  let busy = false;
  let loadGen = 0;
  let toAsset: ((p: string) => string) | null = null;
  // The cover actually stored in the file (first editable file that has one).
  let current: { url: string; note: string } | null = null;

  // Info tab (loaded lazily, once per load()).
  let infos: Info[] | null = null;
  // Lyrics tab (single file only).
  let lyr: { sources: LyricSource[]; playerUses: LyricKind | null } | null = null;
  let lyrSlot: LyricSlot = "plain";
  const lyrChosen: Partial<Record<LyricSlot, LyricKind | null>> = {};
  let lyrDrafts: Partial<Record<LyricSlot, LyricDraft>> = {};

  const editable = () => files.filter(f => f.fields && !f.error);
  const n = () => editable().length;

  root.innerHTML = `
    <div class="te-wrap">
      <div class="te-summary" id="teSummary"></div>
      <div class="te-tabbar" id="teTabbar">
        <button type="button" class="on" data-tab="tags">Tags</button>
        <button type="button" data-tab="batch" id="teTabBatch">Batch tools</button>
        <button type="button" data-tab="info">Info</button>
        <button type="button" data-tab="lyrics" id="teTabLyrics">Lyrics</button>
      </div>
      <div class="te-panes">
      <div class="te-tabpane" data-tabpane="tags">
      <div class="te-main">
        <div class="te-cover">
          <div class="te-cover-box" id="teCoverBox"></div>
          <div class="te-cover-actions">
            <button class="btn small" id="teCoverSet">Change…</button>
            <button class="btn small" id="teCoverRemove">Remove</button>
          </div>
          <div class="te-cover-note" id="teCoverNote"></div>
        </div>
        <div class="te-form" id="teForm"></div>
      </div>
      </div>
      <div class="te-tabpane" data-tabpane="batch" style="display:none">
      <div class="te-tools" id="teTools">
        <div class="te-tabs">
          <button type="button" class="on" data-tool="name">From file name</button>
          <button type="button" data-tool="num">Number tracks</button>
          <button type="button" data-tool="find">Find &amp; replace</button>
        </div>
        <div class="te-pane" data-pane="name">
          <label class="te-field"><span class="te-label">Pattern</span>
            <input class="te-input" id="teTPattern" list="tePatterns" spellcheck="false" autocomplete="off">
            <datalist id="tePatterns">${PATTERN_PRESETS.map(p => `<option value="${esc(p)}"></option>`).join("")}</datalist></label>
          <div class="te-hint">%track% %disc% %title% %artist% %albumartist% %album% %year% %genre% %composer% %comment% %ignore% — use / for folder levels.</div>
          <label class="te-check"><input type="checkbox" id="teTUnderscore"> Underscores → spaces</label>
          <label class="te-check"><input type="checkbox" id="teTEmpty"> Only fill fields that are empty</label>
          <button type="button" class="btn small" id="teTNameGo">Apply to files</button>
        </div>
        <div class="te-pane" data-pane="num" style="display:none">
          <div class="te-toolrow">
            <label class="te-field narrow"><span class="te-label">Start at</span><input class="te-input" id="teTStart" value="1" inputmode="numeric"></label>
            <label class="te-field"><span class="te-label">Order</span>
              <select class="te-input" id="teTOrder"><option value="filename">By file name</option><option value="list">As selected</option></select></label>
          </div>
          <label class="te-check"><input type="checkbox" id="teTTotal"> Also set the track total</label>
          <button type="button" class="btn small" id="teTNumGo">Number tracks</button>
        </div>
        <div class="te-pane" data-pane="find" style="display:none">
          <label class="te-field"><span class="te-label">Field</span>
            <select class="te-input" id="teTField"><option value="*">All text fields</option>${TOOL_TEXT_FIELDS.map(k => `<option value="${k}">${esc(LABELS[k])}</option>`).join("")}</select></label>
          <label class="te-field"><span class="te-label">Find</span><input class="te-input" id="teTFind" spellcheck="false" autocomplete="off"></label>
          <label class="te-field"><span class="te-label">Replace with</span><input class="te-input" id="teTRepl" spellcheck="false" autocomplete="off"></label>
          <label class="te-check"><input type="checkbox" id="teTCase"> Match case</label>
          <label class="te-check"><input type="checkbox" id="teTRegex"> Regular expression</label>
          <button type="button" class="btn small" id="teTFindGo">Replace in files</button>
        </div>
        <div class="te-toolmsg" id="teToolMsg"></div>
      </div>
      </div>
      <div class="te-tabpane" data-tabpane="info" style="display:none"><div id="teInfo" class="te-info"></div></div>
      <div class="te-tabpane" data-tabpane="lyrics" style="display:none"><div id="teLyrics" class="te-lyrics"></div></div>
      </div>
      <div class="te-preview" id="tePreview"></div>
      <div class="te-files" id="teFiles"></div>
      <div class="te-footer">
        <div class="te-status" id="teStatus"></div>
        <button class="btn" id="teRevert">Revert</button>
        <button class="btn primary" id="teSave">Save</button>
      </div>
    </div>`;

  const $ = <T extends HTMLElement>(id: string) => root.querySelector<T>("#" + id)!;
  const summaryEl = $("teSummary");
  const formEl = $("teForm");
  const previewEl = $("tePreview");
  const tabBatchBtn = $<HTMLButtonElement>("teTabBatch");
  const tabLyricsBtn = $<HTMLButtonElement>("teTabLyrics");
  const infoEl = $("teInfo");
  const lyricsEl = $("teLyrics");
  const filesEl = $("teFiles");
  const statusEl = $("teStatus");
  const saveBtn = $<HTMLButtonElement>("teSave");
  const revertBtn = $<HTMLButtonElement>("teRevert");
  const coverBox = $("teCoverBox");
  const coverNote = $("teCoverNote");
  const coverSetBtn = $<HTMLButtonElement>("teCoverSet");
  const coverRemoveBtn = $<HTMLButtonElement>("teCoverRemove");

  function valueOf(key: FieldKey): string | null {
    if (!common) return "";
    const v = common[key];
    if (v === null) return null; // mixed
    return typeof v === "number" ? (v ? String(v) : "") : v;
  }

  const fileOf = (id: string) => files.find(f => f.id === id);
  const origOf = (f: FileInfo | undefined, k: FieldKey): string => {
    const v = f?.fields ? (f.fields as any)[k] : "";
    return typeof v === "number" ? (v ? String(v) : "") : (v ?? "");
  };
  /** Base value of a file before per-file tools: shared edit, else what the file has. */
  const baseOf = (id: string, k: FieldKey) => (dirty.has(k) ? dirty.get(k)! : origOf(fileOf(id), k));
  const effective = (id: string, k: FieldKey) => perFile.get(id)?.get(k) ?? baseOf(id, k);
  const hasPer = (k: FieldKey) => { for (const m of perFile.values()) if (m.has(k)) return true; return false; };
  function clearPerKey(k: FieldKey) {
    for (const [id, m] of perFile) { m.delete(k); if (!m.size) perFile.delete(id); }
  }
  /** Drops tool values that equal what would be written anyway. */
  function prunePerFile() {
    for (const [id, m] of perFile) {
      for (const [k, v] of m) if (normalizeValue(k, v) === normalizeValue(k, baseOf(id, k))) m.delete(k);
      if (!m.size) perFile.delete(id);
    }
  }
  function mergePer(values: PerFile) {
    for (const [id, m] of values) for (const [k, v] of m) {
      let t = perFile.get(id); if (!t) { t = new Map(); perFile.set(id, t); }
      t.set(k, v);
    }
    prunePerFile();
  }
  const fileRefs = (): FileRef[] => editable().map(f => ({ id: f.id, path: f.path, fileName: f.fileName }));

  type Plan =
    | { mode: "shared"; targets: FileInfo[]; edit: Record<string, unknown>; errors: string[] }
    | { mode: "each"; targets: FileInfo[]; items: { trackId: string; edit: Record<string, unknown> }[]; errors: string[] };
  function buildPlan(): Plan {
    const targets = editable();
    if (!perFile.size) {
      const { edit, errors } = buildEdit(dirty, cover);
      if (ratingDraft !== null) edit.rating = ratingDraft;
      return { mode: "shared", targets: Object.keys(edit).length ? targets : [], edit, errors };
    }
    const items: { trackId: string; edit: Record<string, unknown> }[] = [];
    const errors: string[] = [];
    const used: FileInfo[] = [];
    for (const f of targets) {
      const m = new Map(dirty);
      for (const [k, v] of perFile.get(f.id) || []) m.set(k, v);
      const r = buildEdit(m, cover);
      if (ratingDraft !== null) r.edit.rating = ratingDraft;
      for (const e of r.errors) { const msg = `${f.fileName}: ${e}`; if (!errors.includes(msg)) errors.push(msg); }
      if (Object.keys(r.edit).length) { items.push({ trackId: f.id, edit: r.edit }); used.push(f); }
    }
    return { mode: "each", targets: used, items, errors };
  }

  function fieldHtml(key: FieldKey, label: string, opts: { area?: boolean; narrow?: boolean } = {}): string {
    const mixed = valueOf(key) === null;
    const multi = n() > 1;
    const input = opts.area
      ? `<textarea class="te-input" data-key="${key}" rows="3" spellcheck="false"></textarea>`
      : `<input class="te-input" data-key="${key}" type="text" ${key in NUM_MAX ? 'inputmode="numeric"' : ""} spellcheck="false" autocomplete="off">`;
    return `<label class="te-field${opts.narrow ? " narrow" : ""}" data-field="${key}">
      <span class="te-label">${esc(label)}</span>
      <span class="te-inputrow">${input}${multi && mixed ? `<button type="button" class="te-clear" data-clear="${key}" title="Clear this field in every selected file">✕</button>` : ""}</span>
    </label>`;
  }

  function buildForm() {
    formEl.innerHTML =
      TEXT_FIELDS.map(f => fieldHtml(f.key, f.label)).join("") +
      `<div class="te-row2">${fieldHtml("year", "Year", { narrow: true })}
        <div class="te-pair"><span class="te-label">Track</span><span class="te-pairrow">${fieldHtml("track", "No.", { narrow: true })}<span class="te-of">of</span>${fieldHtml("trackTotal", "Total", { narrow: true })}</span></div>
        <div class="te-pair"><span class="te-label">Disc</span><span class="te-pairrow">${fieldHtml("disc", "No.", { narrow: true })}<span class="te-of">of</span>${fieldHtml("discTotal", "Total", { narrow: true })}</span></div>
      </div>` +
      `<div class="te-field te-ratingrow" data-field="rating"><span class="te-label">Rating</span><span class="te-inputrow"><span class="te-stars" id="teStars" role="radiogroup" aria-label="Rating"></span><span class="te-ratinghint" id="teRatingHint"></span></span></div>` +
      fieldHtml("comment", "Comment", { area: true });
    renderRatingRow();
    formEl.querySelectorAll<HTMLElement>(".te-input").forEach(el => {
      const key = el.dataset.key as FieldKey;
      applyInput(el as HTMLInputElement, key);
      el.addEventListener("input", () => {
        if (hasPer(key)) clearPerKey(key); // typing sets ONE value for every file
        dirty.set(key, (el as HTMLInputElement).value);
        markDirty(el as HTMLInputElement, key);
        renderPreview();
      });
    });
    formEl.querySelectorAll<HTMLElement>("[data-clear]").forEach(btn => {
      btn.onclick = () => {
        const key = btn.dataset.clear as FieldKey;
        clearPerKey(key);
        dirty.set(key, "");
        const el = formEl.querySelector<HTMLInputElement>(`.te-input[data-key="${key}"]`)!;
        el.value = "";
        markDirty(el, key);
        renderPreview();
      };
    });
  }

  function renderRatingRow() {
    const box = formEl.querySelector<HTMLElement>("#teStars");
    const hint = formEl.querySelector<HTMLElement>("#teRatingHint");
    if (!box || !hint) return;
    const orig = common?.rating ?? null; // null = the files disagree
    const shown = ratingDraft ?? orig;
    box.innerHTML = starsHtml(shown ?? 0, "te-star");
    box.classList.toggle("dirty", ratingDraft !== null);
    box.classList.toggle("mixed", shown === null);
    hint.textContent = shown === null ? "<mixed> — click a star to set all" : starsLabel(shown);
    box.querySelectorAll<HTMLButtonElement>("[data-star]").forEach(b => {
      b.onclick = () => {
        const next = nextStars(shown ?? -1, Number(b.dataset.star));
        ratingDraft = next === orig ? null : clampStars(next);
        renderRatingRow();
        renderPreview();
      };
    });
  }

  function applyInput(el: HTMLInputElement, key: FieldKey) {
    const v = valueOf(key);
    el.value = hasPer(key) ? "" : dirty.has(key) ? dirty.get(key)! : (v ?? "");
    markDirty(el, key);
  }
  function markDirty(el: HTMLInputElement, key: FieldKey) {
    const isDirty = dirty.has(key);
    const mixed = valueOf(key) === null;
    const per = hasPer(key);
    el.classList.toggle("dirty", isDirty && !per);
    el.classList.toggle("perfile", per);
    if (per) { el.placeholder = "<per file>"; return; }
    el.placeholder = mixed ? (isDirty && !el.value ? "(cleared)" : "<mixed>") : "";
  }

  function renderSummary() {
    const total = files.length;
    const ok = n();
    const bad = total - ok;
    if (!total) { summaryEl.textContent = "No tracks selected."; return; }
    if (total === 1) {
      summaryEl.textContent = files[0].fileName || "1 track";
      summaryEl.title = files[0].path;
    } else {
      summaryEl.textContent = `${ok} tracks selected` + (bad ? ` · ${bad} cannot be edited` : "");
      summaryEl.title = "";
    }
  }

  function renderCover() {
    const multi = n() > 1;
    let state: "has" | "none" | "mixed" = "none";
    if (common?.hasCover === true) state = "has";
    else if (common?.hasCover === null) state = "mixed";
    if (cover?.action === "set") {
      coverBox.innerHTML = coverPreview ? `<img alt="" src="${esc(coverPreview)}">` : `<span>New cover</span>`;
      coverNote.textContent = multi ? `New cover for ${n()} files` : "New cover (not saved yet)";
    } else if (cover?.action === "remove") {
      coverBox.innerHTML = `<span>Cover removed</span>`;
      coverNote.textContent = "Will be removed on save";
    } else if (current && state !== "none") {
      coverBox.innerHTML = `<img alt="" src="${esc(current.url)}">`;
      coverNote.textContent = state === "mixed" ? `Some files have no cover or a different one · ${current.note}` : (multi ? `Every file has a cover · ${current.note}` : current.note);
    } else {
      coverBox.innerHTML = `<span>${state === "has" ? "Has cover" : state === "mixed" ? "Mixed" : "No cover"}</span>`;
      coverNote.textContent = state === "mixed" ? "Some files have a cover" : "";
    }
    coverRemoveBtn.disabled = busy || (cover?.action === "remove") || (!cover && state === "none");
  }

  function renderPreview() {
    const plan = buildPlan();
    const lines: string[] = [];
    const sharedEdit = buildEdit(dirty, cover).edit;
    const shown = (v: unknown) => (v === "" || v === 0 ? "(empty)" : String(v));
    for (const key of Object.keys(LABELS) as FieldKey[]) {
      if (!(key in sharedEdit) || hasPer(key)) continue;
      const before = valueOf(key);
      const prev = before === null ? "<mixed>" : before === "" ? "(empty)" : before;
      lines.push(`<div class="te-pl"><b>${esc(LABELS[key])}</b> ${esc(prev)} → <i>${esc(shown(sharedEdit[key]))}</i></div>`);
    }
    if (ratingDraft !== null) {
      const before = common?.rating;
      lines.push(`<div class="te-pl"><b>Rating</b> ${esc(before == null ? "<mixed>" : starsLabel(before))} → <i>${esc(starsLabel(ratingDraft))}</i></div>`);
    }
    if (cover?.action === "set") lines.push(`<div class="te-pl"><b>Cover</b> → new image</div>`);
    if (cover?.action === "remove") lines.push(`<div class="te-pl"><b>Cover</b> → removed</div>`);
    // Per-file rows from the batch tools: one line per file, only changed fields.
    for (const f of editable()) {
      const m = perFile.get(f.id);
      if (!m) continue;
      const parts: string[] = [];
      for (const key of Object.keys(LABELS) as FieldKey[]) {
        if (!m.has(key)) continue;
        const before = origOf(f, key);
        parts.push(`${esc(LABELS[key])}: ${esc(before === "" ? "(empty)" : before)} → <i>${esc(m.get(key)! === "" ? "(empty)" : m.get(key)!)}</i>`);
      }
      lines.push(`<div class="te-pl"><b>${esc(f.fileName || f.id)}</b> ${parts.join(" · ")}</div>`);
    }
    const lp = lyricsPlan();
    for (const w of lp.writes) {
      const what = `${w.slot === "synced" ? "Synchronised" : "Plain"} lyrics (${KIND_LABEL[w.kind]})`;
      lines.push(`<div class="te-pl"><b>Lyrics</b> ${esc(what)} → <i>${w.text ? "updated" : "will be deleted"}</i></div>`);
    }
    for (const e of plan.errors) lines.push(`<div class="te-pl err">${esc(e)}</div>`);
    for (const e of lp.errors) lines.push(`<div class="te-pl err">${esc(e)}</div>`);
    const count = plan.targets.length;
    if (!lines.length) {
      previewEl.innerHTML = `<div class="te-pl muted">No changes yet. Only the fields you edit are written${n() > 1 ? "; &lt;mixed&gt; fields stay as they are" : ""}.</div>`;
    } else {
      const heading = count ? (count === 1 ? "Will change 1 file" : `Will change ${count} files`) : "Will change";
      previewEl.innerHTML = `<div class="te-ph">${heading}</div>` + lines.join("");
    }
    saveBtn.disabled = busy || (!count && !lp.writes.length) || plan.errors.length > 0 || lp.errors.length > 0;
    revertBtn.disabled = busy || (ratingDraft === null && !dirty.size && !cover && !perFile.size && !Object.keys(lyrDrafts).length);
    tabBatchBtn.style.display = n() ? "" : "none";
    tabLyricsBtn.style.display = n() === 1 ? "" : "none";
    if (activeTab === "lyrics" && n() !== 1) showTab("tags");
    renderCover();
  }

  function renderFiles(failed?: { id: string; error: string }[]) {
    const problems: string[] = [];
    for (const f of files) if (f.error) problems.push(`<div class="te-pl err"><b>${esc(f.fileName || f.id)}</b> ${esc(f.error)}</div>`);
    for (const f of failed || []) {
      const info = files.find(x => x.id === f.id);
      problems.push(`<div class="te-pl err"><b>${esc(info?.fileName || f.id)}</b> ${esc(f.error)}</div>`);
    }
    filesEl.innerHTML = problems.length ? `<div class="te-ph">Problems</div>${problems.join("")}` : "";
    filesEl.style.display = problems.length ? "block" : "none";
  }

  async function ensureInvoke() {
    if (invoke) return;
    const core = await import("@tauri-apps/api/core");
    invoke = core.invoke as any;
    toAsset = core.convertFileSrc;
  }

  async function load(ids: string[]) {
    const gen = ++loadGen;
    dirty.clear();
    perFile.clear();
    ratingDraft = null;
    infos = null; lyr = null; lyrDrafts = {}; lyrChosen.plain = undefined; lyrChosen.synced = undefined;
    cover = null;
    coverPreview = null;
    current = null;
    toolMsg.textContent = "";
    statusEl.textContent = "Reading tags…";
    try {
      await ensureInvoke();
      const res = await invoke!<ReadResult>("tag_read", { trackIds: ids });
      if (gen !== loadGen) return;
      files = res.files;
      common = res.common;
    } catch (e) {
      if (gen !== loadGen) return;
      files = []; common = null;
      statusEl.textContent = "Couldn't read the tags — " + String(e);
    }
    if (gen !== loadGen) return;
    if (files.length) statusEl.textContent = "";
    void loadCurrentCover(gen);
    renderSummary();
    buildForm();
    renderFiles();
    renderPreview();
    if (activeTab === "info") void ensureInfo();
    if (activeTab === "lyrics") void ensureLyrics();
  }

  const fmtBytes = (b: number) => (b >= 1048576 ? (b / 1048576).toFixed(1) + " MB" : Math.max(1, Math.round(b / 1024)) + " KB");
  async function loadCurrentCover(gen: number) {
    const first = editable().find(f => f.fields?.hasCover);
    if (!first || !invoke) { renderPreview(); return; }
    try {
      const info = await invoke<CoverInfo | null>("tag_cover_read", { trackId: first.id });
      if (gen !== loadGen || !info) return;
      const kind = /png/i.test(info.mime) ? "PNG" : /jpe?g/i.test(info.mime) ? "JPEG" : info.mime.replace("image/", "").toUpperCase();
      current = { url: info.dataUrl, note: `${kind} · ${fmtBytes(info.bytes)}` };
      renderPreview();
      const img = new Image();
      img.onload = () => {
        if (gen !== loadGen || !current) return;
        current.note = `${kind} · ${img.naturalWidth}×${img.naturalHeight} · ${fmtBytes(info.bytes)}`;
        renderCover();
      };
      img.src = info.dataUrl;
    } catch { /* the "Has cover" label stays */ }
  }

  coverSetBtn.onclick = async () => {
    if (busy || !n()) return;
    try {
      const { open } = await import("@tauri-apps/plugin-dialog");
      const picked = await open({ multiple: false, filters: [{ name: "Images", extensions: ["jpg", "jpeg", "png"] }] });
      const path = Array.isArray(picked) ? picked[0] : picked;
      if (!path) return;
      await ensureInvoke();
      cover = { action: "set", path };
      coverPreview = toAsset ? toAsset(path) : null;
      renderPreview();
    } catch (e) { toast("Couldn't choose the image — " + String(e)); }
  };
  coverRemoveBtn.onclick = () => {
    if (busy) return;
    cover = { action: "remove" };
    coverPreview = null;
    renderPreview();
  };
  // ── Info tab ──
  async function ensureInfo() {
    if (infos) { renderInfo(); return; }
    const gen = loadGen;
    infoEl.innerHTML = `<div class="te-pl muted">Reading file details…</div>`;
    try {
      await ensureInvoke();
      const res = await invoke!<Info[]>("tag_info", { trackIds: editable().map(f => f.id) });
      if (gen !== loadGen) return;
      infos = res;
    } catch (e) {
      infoEl.innerHTML = `<div class="te-pl err">${esc("Couldn't read the file details — " + String(e))}</div>`;
      return;
    }
    renderInfo();
  }
  function renderInfo() {
    const rows = infoRows(infos || []);
    if (!rows.length) { infoEl.innerHTML = `<div class="te-pl muted">No details available.</div>`; return; }
    const f = n() === 1 ? editable()[0] : null;
    const sp = f ? splitFileName(f.fileName) : null;
    const renameBox = f && sp ? `
      <div class="te-rename">
        <div class="te-label">File name</div>
        <div class="te-renamerow">
          <input class="te-input" id="teRenameInput" spellcheck="false" autocomplete="off">
          <span class="te-ext">${esc(sp.ext)}</span>
          <button type="button" class="btn small" id="teRenameBtn">Rename</button>
        </div>
        <div class="te-hint" id="teRenameHint"></div>
      </div>` : "";
    infoEl.innerHTML = renameBox + rows.map(([k, v]) => `<div class="te-inforow"><span class="te-infokey">${esc(k)}</span><span class="te-infoval" title="${esc(v)}">${esc(v)}</span></div>`).join("");
    if (f && sp) wireRename(f, sp);
  }

  // ── Rename the file (one track; the folder and the extension never change) ──
  function hasUnsaved() { return ratingDraft !== null || dirty.size > 0 || perFile.size > 0 || !!cover || Object.keys(lyrDrafts).length > 0; }
  function wireRename(f: FileInfo, sp: { stem: string; ext: string }) {
    const input = infoEl.querySelector<HTMLInputElement>("#teRenameInput")!;
    const btn = infoEl.querySelector<HTMLButtonElement>("#teRenameBtn")!;
    const hint = infoEl.querySelector<HTMLElement>("#teRenameHint")!;
    input.value = sp.stem;
    const refresh = () => {
      const value = input.value.trim();
      const problem = stemProblem(input.value);
      const unchanged = value === sp.stem;
      const unsaved = hasUnsaved();
      hint.classList.toggle("err", !!problem && !unchanged);
      hint.textContent = unsaved ? "Save or revert your tag changes first, then rename."
        : problem && !unchanged ? problem
        : unchanged ? "Only the name changes — the folder and the extension stay as they are. A .lrc file next to the song is renamed with it."
        : `New name: ${value}${sp.ext}`;
      btn.disabled = busy || unsaved || !!problem || unchanged;
    };
    input.oninput = refresh;
    input.onkeydown = ev => { if (ev.key === "Enter" && !btn.disabled) btn.click(); };
    btn.onclick = () => { void renameFile(f, input.value.trim(), hint, btn); };
    refresh();
  }
  async function renameFile(f: FileInfo, stem: string, hint: HTMLElement, btn: HTMLButtonElement) {
    if (busy || stemProblem(stem)) return;
    busy = true;
    btn.disabled = true;
    hint.classList.remove("err");
    hint.textContent = "Renaming…";
    // The player lets go of the file first (Windows will not rename an open file).
    busEmit("melo:tags-will-write", { paths: [f.path] });
    await sleep(350);
    let renamed: { oldId: string; newId: string; newPath: string }[] = [];
    let failure = "";
    try {
      await ensureInvoke();
      renamed = await invoke!<{ oldId: string; newId: string; newPath: string }[]>("rename_tracks", { items: [{ trackId: f.id, newStem: stem }] });
    } catch (e) {
      failure = String(e);
    }
    if (renamed.length) busEmit("melo:tracks-renamed", { map: renamed });
    busEmit("melo:tags-written", { ids: [], paths: [], released: [f.path] });
    busy = false;
    if (failure) {
      hint.classList.add("err");
      hint.textContent = failure;
      btn.disabled = false;
      return;
    }
    if (renamed.length) {
      busEmit("melo:library-changed", { tagsEdited: 1 });
      try { localStorage.setItem(TAGEDIT_IDS_KEY, JSON.stringify([renamed[0].newId])); } catch {}
      toast("File renamed");
      await load([renamed[0].newId]);
    } else {
      await load([f.id]);
    }
  }

  // ── Lyrics tab (single file) ──
  const lyricFile = () => (n() === 1 ? editable()[0] : null);
  function lyricsPlan() {
    if (!lyr) return { writes: [] as { slot: LyricSlot; kind: LyricKind; text: string }[], errors: [] as string[] };
    return planLyricWrites(lyr.sources, lyrDrafts, lyrChosen);
  }
  const slotSources = (slot: LyricSlot) => (lyr ? lyr.sources.filter(s => slotOf(s.text) === slot) : []);
  function slotState(slot: LyricSlot) {
    const cands = slotSources(slot);
    const wanted = lyrChosen[slot];
    const src = cands.find(c => c.kind === wanted) || cands[0] || null;
    const draft = lyrDrafts[slot];
    return {
      cands, src,
      text: draft ? draft.text : (src ? src.text : ""),
      target: draft ? draft.target : (src ? src.kind : defaultTarget(slot)),
    };
  }
  async function ensureLyrics() {
    const f = lyricFile();
    if (!f) { lyricsEl.innerHTML = `<div class="te-pl muted">Lyrics can be edited for one track at a time.</div>`; return; }
    if (lyr) { renderLyricsTab(); return; }
    const gen = loadGen;
    lyricsEl.innerHTML = `<div class="te-pl muted">Looking for lyrics…</div>`;
    try {
      await ensureInvoke();
      const res = await invoke!<{ sources: LyricSource[]; playerUses: LyricKind | null }>("lyrics_read", { trackPath: f.path });
      if (gen !== loadGen) return;
      lyr = res;
      // Open on the kind that exists (plain first, like MusicBee's default radio).
      lyrSlot = slotSources("plain").length || !slotSources("synced").length ? "plain" : "synced";
    } catch (e) {
      lyricsEl.innerHTML = `<div class="te-pl err">${esc("Couldn't read the lyrics — " + String(e))}</div>`;
      return;
    }
    renderLyricsTab();
    renderPreview();
  }
  function renderLyricsTab() {
    if (!lyr) return;
    const st = slotState(lyrSlot);
    const has = (s: LyricSlot) => slotSources(s).length > 0 || !!lyrDrafts[s];
    const found = lyr.sources.map(s => `${KIND_LABEL[s.kind]} (${slotOf(s.text) === "synced" ? "synchronised" : "plain"})`);
    const targets = allowedTargets(lyrSlot);
    lyricsEl.innerHTML = `
      <div class="te-lyr-top">
        <label class="te-check"><input type="radio" name="teLyrSlot" value="plain" ${lyrSlot === "plain" ? "checked" : ""}> Unsynchronised${has("plain") ? " ✓" : ""}</label>
        <label class="te-check"><input type="radio" name="teLyrSlot" value="synced" ${lyrSlot === "synced" ? "checked" : ""}> Synchronised${has("synced") ? " ✓" : ""}</label>
      </div>
      <div class="te-hint">${found.length ? "Found: " + esc(found.join(" · ")) : "No lyrics found for this track."}${lyr.playerUses ? `<br>The player shows: ${esc(KIND_LABEL[lyr.playerUses])}.` : ""}</div>
      ${st.cands.length > 1 ? `<label class="te-field"><span class="te-label">Show</span><select class="te-input" id="teLyrSource">${st.cands.map(c => `<option value="${c.kind}" ${st.src && st.src.kind === c.kind ? "selected" : ""}>${esc(KIND_LABEL[c.kind])}</option>`).join("")}</select></label>` : ""}
      <textarea class="te-input te-lyr-text" id="teLyrText" dir="auto" spellcheck="false" placeholder="${lyrSlot === "synced" ? "[00:12.50] Line of lyrics" : "Lyrics text"}"></textarea>
      <div class="te-lyr-bottom">
        <label class="te-field"><span class="te-label">Save to</span>
          <select class="te-input" id="teLyrTarget">${targets.map(t => `<option value="${t}" ${st.target === t ? "selected" : ""}>${esc(KIND_LABEL[t])}</option>`).join("")}</select></label>
        <button type="button" class="btn small" id="teLyrClear">Clear</button>
      </div>`;
    const ta = lyricsEl.querySelector<HTMLTextAreaElement>("#teLyrText")!;
    ta.value = st.text;
    lyricsEl.querySelectorAll<HTMLInputElement>('input[name="teLyrSlot"]').forEach(r => {
      r.onchange = () => { lyrSlot = r.value as LyricSlot; renderLyricsTab(); };
    });
    const sel = lyricsEl.querySelector<HTMLSelectElement>("#teLyrSource");
    if (sel) sel.onchange = () => { lyrChosen[lyrSlot] = sel.value as LyricKind; delete lyrDrafts[lyrSlot]; renderLyricsTab(); renderPreview(); };
    const setDraft = (text: string, target: LyricKind) => {
      const cur = slotState(lyrSlot);
      const origText = cur.src ? cur.src.text : "";
      const origTarget = cur.src ? cur.src.kind : defaultTarget(lyrSlot);
      if (text === origText && target === origTarget) delete lyrDrafts[lyrSlot];
      else lyrDrafts[lyrSlot] = { text, target };
      renderPreview();
    };
    ta.oninput = () => setDraft(ta.value, slotState(lyrSlot).target);
    lyricsEl.querySelector<HTMLSelectElement>("#teLyrTarget")!.onchange = ev => setDraft(ta.value, (ev.target as HTMLSelectElement).value as LyricKind);
    lyricsEl.querySelector<HTMLButtonElement>("#teLyrClear")!.onclick = () => { ta.value = ""; setDraft("", slotState(lyrSlot).target); };
  }

  // ── tabs ──
  let activeTab = "tags";
  function showTab(name: string) {
    activeTab = name;
    root!.querySelectorAll<HTMLElement>("[data-tab]").forEach(b => b.classList.toggle("on", b.dataset.tab === name));
    root!.querySelectorAll<HTMLElement>("[data-tabpane]").forEach(p => { p.style.display = p.dataset.tabpane === name ? "" : "none"; });
    if (name === "info") void ensureInfo();
    if (name === "lyrics") void ensureLyrics();
    if (name !== "lyrics" && lyr) { /* drafts persist across tabs */ }
  }
  root.querySelectorAll<HTMLButtonElement>("[data-tab]").forEach(b => { b.onclick = () => showTab(b.dataset.tab!); });

  // ── batch tools ──
  const toolMsg = $("teToolMsg");
  const chk = (id: string) => $<HTMLInputElement>(id).checked;
  const val = (id: string) => $<HTMLInputElement>(id).value;
  root.querySelectorAll<HTMLButtonElement>("[data-tool]").forEach(btn => {
    btn.onclick = () => {
      root.querySelectorAll<HTMLElement>("[data-tool]").forEach(b => b.classList.toggle("on", b === btn));
      root.querySelectorAll<HTMLElement>("[data-pane]").forEach(p => { p.style.display = p.dataset.pane === btn.dataset.tool ? "" : "none"; });
      toolMsg.textContent = "";
    };
  });
  try { $<HTMLInputElement>("teTPattern").value = localStorage.getItem(PATTERN_KEY) || PATTERN_PRESETS[0]; }
  catch { $<HTMLInputElement>("teTPattern").value = PATTERN_PRESETS[0]; }
  const afterTool = (msg: string, isErr = false) => {
    toolMsg.textContent = msg;
    toolMsg.classList.toggle("err", isErr);
    buildForm();
    renderPreview();
  };
  $("teTNameGo").onclick = () => {
    if (busy) return;
    const pattern = val("teTPattern");
    const r = tagsFromFilenames(fileRefs(), pattern, effective, { underscores: chk("teTUnderscore"), onlyEmpty: chk("teTEmpty") });
    if (r.error) { afterTool(r.error, true); return; }
    try { localStorage.setItem(PATTERN_KEY, pattern); } catch {}
    mergePer(r.values);
    const miss = r.unmatched.length;
    afterTool(`Matched ${r.matched} of ${r.matched + miss} files` + (miss ? ` · ${miss} did not fit the pattern and are unchanged` : ""), r.matched === 0);
  };
  $("teTNumGo").onclick = () => {
    if (busy) return;
    const startText = val("teTStart").trim();
    if (!/^\d+$/.test(startText)) { afterTool("Start must be a number", true); return; }
    mergePer(numberTracks(fileRefs(), { start: Number(startText), setTotal: chk("teTTotal"), order: val("teTOrder") === "list" ? "list" : "filename" }));
    afterTool(`Numbered ${n()} files from ${Number(startText)}`);
  };
  $("teTFindGo").onclick = () => {
    if (busy) return;
    const f = val("teTField");
    const fields: FieldKey[] = f === "*" ? [...TOOL_TEXT_FIELDS] : [f as FieldKey];
    const r = findReplaceAll(fileRefs(), fields, effective, val("teTFind"), val("teTRepl"), { matchCase: chk("teTCase"), regex: chk("teTRegex") });
    if (r.error) { afterTool(r.error, true); return; }
    mergePer(r.values);
    afterTool(r.changed ? `Changed ${r.changed} file${r.changed === 1 ? "" : "s"}` : "Nothing matched");
  };

  revertBtn.onclick = () => {
    if (busy) return;
    dirty.clear(); perFile.clear(); cover = null; coverPreview = null; ratingDraft = null;
    lyrDrafts = {};
    toolMsg.textContent = "";
    if (activeTab === "lyrics") renderLyricsTab();
    buildForm();
    renderPreview();
  };

  const sleep = (ms: number) => new Promise(r => window.setTimeout(r, ms));

  async function save() {
    if (busy) return;
    const plan = buildPlan();
    const lp = lyricsPlan();
    if (plan.errors.length || lp.errors.length) return;
    if (!plan.targets.length && !lp.writes.length) return;
    const targets = plan.targets;
    const lyricFileInfo = lyricFile();
    busy = true;
    saveBtn.disabled = true;
    const ids = targets.map(f => f.id);
    const paths = targets.map(f => f.path);
    // Lyrics stored in the tag rewrite the audio file too, so the player must let go of it.
    if (lyricFileInfo && lp.writes.some(w => w.kind === "embedded") && !paths.includes(lyricFileInfo.path)) paths.push(lyricFileInfo.path);
    // Let the player release the playing file (Windows will not replace a file
    // that is open) before the first write.
    busEmit("melo:tags-will-write", { paths });
    await sleep(350);
    const okIds: string[] = [];
    const failed: { id: string; path: string; error: string }[] = [];
    let lyricsSaved = false;
    try {
      await ensureInvoke();
      for (let i = 0; i < ids.length; i += CHUNK) {
        statusEl.textContent = ids.length > 1 ? `Saving ${Math.min(i + CHUNK, ids.length)} / ${ids.length}…` : "Saving…";
        const part = ids.slice(i, i + CHUNK);
        try {
          const res = plan.mode === "shared"
            ? await invoke!<WriteResult>("tag_write", { trackIds: part, edit: plan.edit })
            : await invoke!<WriteResult>("tag_write_each", { items: plan.items.slice(i, i + CHUNK) });
          okIds.push(...res.ok);
          failed.push(...res.failed);
        } catch (e) {
          // A whole-request failure (bad cover image…) — nothing in this chunk changed.
          for (const id of part) failed.push({ id, path: "", error: String(e) });
          break;
        }
      }
      // Lyrics (single file): sidecar / cache / tag, each written on its own.
      if (lyricFileInfo) {
        for (const w of lp.writes) {
          statusEl.textContent = "Saving lyrics…";
          try {
            await invoke!("lyrics_write", { trackPath: lyricFileInfo.path, kind: w.kind, text: w.text });
            lyricsSaved = true;
          } catch (e) {
            failed.push({ id: lyricFileInfo.id, path: lyricFileInfo.path, error: "Lyrics: " + String(e) });
          }
        }
      }
    } finally {
      if (lyricsSaved && lyricFileInfo) busEmit("melo:lyrics-changed", { trackPath: lyricFileInfo.path });
      busEmit("melo:tags-written", { ids: okIds, paths: targets.filter(f => okIds.includes(f.id)).map(f => f.path), released: paths });
      if (okIds.length) busEmit("melo:library-changed", { tagsEdited: okIds.length });
      busy = false;
    }
    if (!failed.length) {
      toast(!okIds.length && lyricsSaved ? "Lyrics saved" : okIds.length === 1 ? "Saved" : `Saved ${okIds.length} files`);
      statusEl.textContent = "";
      await load(files.map(f => f.id));
      return;
    }
    statusEl.textContent = okIds.length
      ? `Saved ${okIds.length}, failed ${failed.length}. Failed files are unchanged.`
      : `Nothing was saved (${failed.length} failed).`;
    // Reload what is on disk now, keep the user's edits so a retry is one click.
    const keepDirty = new Map(dirty);
    const keepPer: PerFile = new Map(Array.from(perFile, ([id, m]) => [id, new Map(m)] as [string, Map<FieldKey, string>]));
    const keepCover = cover;
    const keepPreview = coverPreview;
    const keepLyr = { ...lyrDrafts };
    await load(files.map(f => f.id));
    for (const [k, v] of keepDirty) dirty.set(k, v);
    mergePer(keepPer); // values already on disk equal their file and are pruned
    cover = keepCover; coverPreview = keepPreview;
    if (Object.keys(keepLyr).length) { await ensureLyrics(); lyrDrafts = keepLyr; renderLyricsTab(); }
    buildForm();
    renderFiles(failed);
    renderPreview();
  }
  saveBtn.onclick = () => { void save(); };

  window.addEventListener("keydown", ev => {
    if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === "s") { ev.preventDefault(); void save(); }
  });

  const idsFromStorage = (): string[] => {
    try {
      const raw = JSON.parse(localStorage.getItem(TAGEDIT_IDS_KEY) || "[]");
      return Array.isArray(raw) ? raw.filter((x: unknown): x is string => typeof x === "string") : [];
    } catch { return []; }
  };
  busOn("melo:tagedit-load", () => {
    if (busy) return;
    void load(idsFromStorage());
  });
  void load(idsFromStorage());
}
