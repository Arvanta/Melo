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

type Fields = {
  title: string; artist: string; albumArtist: string; album: string; genre: string;
  composer: string; comment: string; year: number; track: number; trackTotal: number;
  disc: number; discTotal: number; hasCover: boolean;
};
type Common = {
  title: string | null; artist: string | null; albumArtist: string | null; album: string | null;
  genre: string | null; composer: string | null; comment: string | null;
  year: number | null; track: number | null; trackTotal: number | null;
  disc: number | null; discTotal: number | null; hasCover: boolean | null;
};
type FileInfo = { id: string; path: string; fileName: string; fields: Fields | null; error: string | null };
type ReadResult = { files: FileInfo[]; common: Common };
type WriteResult = { ok: string[]; failed: { id: string; path: string; error: string }[] };

type TextKey = "title" | "artist" | "albumArtist" | "album" | "genre" | "composer" | "comment";
type NumKey = "year" | "track" | "trackTotal" | "disc" | "discTotal";
type FieldKey = TextKey | NumKey;

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

export function setupTagEditor(toast: (m: string) => void) {
  const root = document.getElementById("tagEditRoot");
  if (!root) return;
  let invoke: (<T = any>(cmd: string, args?: Record<string, unknown>) => Promise<T>) | null = null;
  let files: FileInfo[] = [];
  let common: Common | null = null;
  const dirty = new Map<FieldKey, string>();
  let cover: { action: "set"; path: string } | { action: "remove" } | null = null;
  let coverPreview: string | null = null;
  let busy = false;
  let loadGen = 0;
  let toAsset: ((p: string) => string) | null = null;

  const editable = () => files.filter(f => f.fields && !f.error);
  const n = () => editable().length;

  root.innerHTML = `
    <div class="te-wrap">
      <div class="te-summary" id="teSummary"></div>
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
      fieldHtml("comment", "Comment", { area: true });
    formEl.querySelectorAll<HTMLElement>(".te-input").forEach(el => {
      const key = el.dataset.key as FieldKey;
      applyInput(el as HTMLInputElement, key);
      el.addEventListener("input", () => {
        dirty.set(key, (el as HTMLInputElement).value);
        markDirty(el as HTMLInputElement, key);
        renderPreview();
      });
    });
    formEl.querySelectorAll<HTMLElement>("[data-clear]").forEach(btn => {
      btn.onclick = () => {
        const key = btn.dataset.clear as FieldKey;
        dirty.set(key, "");
        const el = formEl.querySelector<HTMLInputElement>(`.te-input[data-key="${key}"]`)!;
        el.value = "";
        markDirty(el, key);
        renderPreview();
      };
    });
  }

  function applyInput(el: HTMLInputElement, key: FieldKey) {
    const v = valueOf(key);
    el.value = dirty.has(key) ? dirty.get(key)! : (v ?? "");
    markDirty(el, key);
  }
  function markDirty(el: HTMLInputElement, key: FieldKey) {
    const isDirty = dirty.has(key);
    const mixed = valueOf(key) === null;
    el.classList.toggle("dirty", isDirty);
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
    } else {
      coverBox.innerHTML = `<span>${state === "has" ? "Has cover" : state === "mixed" ? "Mixed" : "No cover"}</span>`;
      coverNote.textContent = state === "has" ? (multi ? "Every file has a cover" : "Embedded cover") : state === "mixed" ? "Some files have a cover" : "";
    }
    coverRemoveBtn.disabled = busy || (cover?.action === "remove") || (!cover && state === "none");
  }

  function renderPreview() {
    const { edit, errors } = buildEdit(dirty, cover);
    const lines: string[] = [];
    for (const key of Object.keys(LABELS) as FieldKey[]) {
      if (!(key in edit)) continue;
      const before = valueOf(key);
      const after = edit[key];
      const shown = (v: unknown) => (v === "" || v === 0 ? "(empty)" : String(v));
      const prev = before === null ? "<mixed>" : before === "" ? "(empty)" : before;
      lines.push(`<div class="te-pl"><b>${esc(LABELS[key])}</b> ${esc(prev)} → <i>${esc(shown(after))}</i></div>`);
    }
    if (cover?.action === "set") lines.push(`<div class="te-pl"><b>Cover</b> → new image</div>`);
    if (cover?.action === "remove") lines.push(`<div class="te-pl"><b>Cover</b> → removed</div>`);
    for (const e of errors) lines.push(`<div class="te-pl err">${esc(e)}</div>`);
    if (!lines.length) {
      previewEl.innerHTML = `<div class="te-pl muted">No changes yet. Only the fields you edit are written${n() > 1 ? "; <mixed> fields stay as they are" : ""}.</div>`;
    } else {
      previewEl.innerHTML = `<div class="te-ph">${n() > 1 ? `Will change ${n()} files` : "Will change this file"}</div>` + lines.join("");
    }
    saveBtn.disabled = busy || !n() || !lines.length || errors.length > 0;
    revertBtn.disabled = busy || (!dirty.size && !cover);
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
    cover = null;
    coverPreview = null;
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
    renderSummary();
    buildForm();
    renderFiles();
    renderPreview();
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
  revertBtn.onclick = () => {
    if (busy) return;
    dirty.clear(); cover = null; coverPreview = null;
    buildForm();
    renderPreview();
  };

  const sleep = (ms: number) => new Promise(r => window.setTimeout(r, ms));

  async function save() {
    if (busy) return;
    const { edit, errors } = buildEdit(dirty, cover);
    if (errors.length || !Object.keys(edit).length) return;
    const targets = editable();
    if (!targets.length) return;
    busy = true;
    saveBtn.disabled = true;
    const ids = targets.map(f => f.id);
    const paths = targets.map(f => f.path);
    // Let the player release the playing file (Windows will not replace a file
    // that is open) before the first write.
    busEmit("melo:tags-will-write", { paths });
    await sleep(350);
    const okIds: string[] = [];
    const failed: { id: string; path: string; error: string }[] = [];
    try {
      await ensureInvoke();
      for (let i = 0; i < ids.length; i += CHUNK) {
        statusEl.textContent = ids.length > 1 ? `Saving ${Math.min(i + CHUNK, ids.length)} / ${ids.length}…` : "Saving…";
        const part = ids.slice(i, i + CHUNK);
        try {
          const res = await invoke!<WriteResult>("tag_write", { trackIds: part, edit });
          okIds.push(...res.ok);
          failed.push(...res.failed);
        } catch (e) {
          // A whole-request failure (bad cover image…) — nothing in this chunk changed.
          for (const id of part) failed.push({ id, path: "", error: String(e) });
          break;
        }
      }
    } finally {
      busEmit("melo:tags-written", { ids: okIds, paths: targets.filter(f => okIds.includes(f.id)).map(f => f.path), released: paths });
      if (okIds.length) busEmit("melo:library-changed", { tagsEdited: okIds.length });
      busy = false;
    }
    if (!failed.length) {
      toast(okIds.length === 1 ? "Tags saved" : `Tags saved for ${okIds.length} files`);
      statusEl.textContent = "";
      await load(files.map(f => f.id));
      return;
    }
    statusEl.textContent = okIds.length
      ? `Saved ${okIds.length}, failed ${failed.length}. Failed files are unchanged.`
      : `Nothing was saved (${failed.length} failed).`;
    // Reload what is on disk now, keep the user's edits so a retry is one click.
    const keepDirty = new Map(dirty);
    const keepCover = cover;
    const keepPreview = coverPreview;
    await load(files.map(f => f.id));
    for (const [k, v] of keepDirty) dirty.set(k, v);
    cover = keepCover; coverPreview = keepPreview;
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
