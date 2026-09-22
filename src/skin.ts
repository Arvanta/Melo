import { busEmit, busOn, isTauri } from "./bus";

let customStyleEl: HTMLStyleElement | null = null;
let customFrame: HTMLIFrameElement | null = null;

// Import guard: a skin is injected into the live UI as trusted markup, so
// importing one is an explicit, confirmed action — only files that look
// like a skin and stay within a sane size are accepted.
const MAX_SKIN_IMPORT_CHARS = 512 * 1024; // 512 KB is far beyond any real skin

function looksLikeSkin(text: string): boolean {
  return text.includes("<style") || text.includes("<html") || isFullHtmlSkin(text);
}

function confirmSkinImport(filename: string): Promise<boolean> {
  return new Promise(resolve => {
    const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const overlay = document.createElement("div");
    overlay.className = "confirm-overlay";
    overlay.innerHTML = `<div class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="skinImportTitle">
      <div id="skinImportTitle" class="confirm-title">Import custom skin?</div>
      <div class="confirm-message">"${esc(filename)}" will be applied to Melo's interface as trusted markup (scripts are stripped). Only import skins from sources you trust.</div>
      <div class="confirm-actions"><button class="btn small" data-confirm="cancel">Cancel</button><button class="btn small primary" data-confirm="ok">Import</button></div>
    </div>`;
    document.body.appendChild(overlay);
    const finish = (answer: boolean) => { document.removeEventListener("keydown", onKey); overlay.remove(); resolve(answer); };
    overlay.querySelector<HTMLElement>("[data-confirm='cancel']")!.onclick = () => finish(false);
    overlay.querySelector<HTMLElement>("[data-confirm='ok']")!.onclick = () => finish(true);
    overlay.onclick = event => { if (event.target === overlay) finish(false); };
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") finish(false); };
    document.addEventListener("keydown", onKey);
    overlay.querySelector<HTMLElement>("[data-confirm='cancel']")!.focus();
  });
}

// Monotonic race token: every skin switch bumps the counter, and any
// in-flight load that is no longer the latest request drops its result —
// no stale DOM injection, preference write, toast, or cross-window
// broadcast. Fast A→B→A toggling resolves to A.
let skinApplyToken = 0;

export interface SkinItem {
  id: string;
  name: string;
  filename: string;
  path?: string;
}

export interface SkinGeometry {
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  resizable?: boolean;
}

/**
 * Resolve a player hook by legacy id first, then by the position-independent
 * `data-melo` role attribute. Skins may use either (or both) conventions.
 */
export function findHook<T extends HTMLElement = HTMLElement>(id: string, role: string): T | null {
  const byId = document.getElementById(id);
  if (byId) return byId as T;
  return document.querySelector<T>(`[data-melo="${role}"]`);
}

/**
 * A full HTML skin may declare the native window size it wants via
 * data-window-width / data-window-height (plus optional min sizes and
 * resizability) on <html>, <body> or the #melo-player root.
 */
export function parseSkinGeometry(htmlText: string): SkinGeometry | null {
  const read = (attr: string): number | null => {
    const m = htmlText.match(new RegExp(attr + '\\s*=\\s*["\']?(\\d+)'));
    return m ? parseInt(m[1], 10) : null;
  };
  const width = read("data-window-width");
  const height = read("data-window-height");
  const minWidth = read("data-min-width");
  const minHeight = read("data-min-height");
  const maxWidth = read("data-max-width");
  const maxHeight = read("data-max-height");
  const resizable = !/data-resizable\s*=\s*["']?false/i.test(htmlText);
  // Return geometry whenever the skin declares anything about its window —
  // a target size, min/max bounds, or both.
  if (
    width == null && height == null &&
    minWidth == null && minHeight == null &&
    maxWidth == null && maxHeight == null
  ) return null;
  return {
    width: width ?? undefined,
    height: height ?? undefined,
    minWidth: minWidth ?? undefined,
    minHeight: minHeight ?? undefined,
    maxWidth: maxWidth ?? undefined,
    maxHeight: maxHeight ?? undefined,
    resizable,
  };
}

export function readSkinGeometry(): SkinGeometry | null {
  try {
    const geo = JSON.parse(localStorage.getItem("melo-skin-geometry") || "null");
    if (!geo || typeof geo !== "object") return null;
    return geo as SkinGeometry;
  } catch {}
  return null;
}

// The skins dropdown reflects ONLY what is in the skins folder on disk
// (Rust `list_installed_skins`): bundled skins are seeded once at first
// launch, and a skin the user deletes stays deleted.

export function isFullHtmlSkin(htmlText: string): boolean {
  const idMarkers = ["trackTitle", "btnPlay", "seekBar", "coverImg"];
  let count = 0;
  for (const m of idMarkers) if (htmlText.includes(m)) count++;
  // `data-melo` based skins (new convention) also count as full skins.
  const meloAttrCount = (htmlText.match(/data-melo\s*=/g) || []).length;
  count += Math.min(meloAttrCount, 3);
  return count >= 3;
}

/**
 * Skins provide markup and CSS to the application DOM, so they are a
 * trusted-extension surface rather than a browser sandbox. CSP blocks
 * inline script too; this strips script/event payloads before a skin is
 * persisted or injected — defense-in-depth that keeps skin behavior
 * limited to the documented markup/CSS/data-melo hooks.
 */
function cleanTrustedSkinHtml(html: string): string {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, "")
    .replace(/\son[a-z][a-z0-9_-]*\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");
}

export function applyCustomSkin(htmlText: string, toast?: (m: string) => void, applyGeometry = true) {
  htmlText = cleanTrustedSkinHtml(htmlText);
  const playerCard = document.getElementById("playerCard") as HTMLElement;
  if (!playerCard) return;
  // The custom-skin layout class is added only once content is actually
  // applied — a failed load must not leave the app stuck in half-custom-skin
  // layout mode.
  document.documentElement.classList.add("custom-skin-active");
  document.body.classList.add("custom-skin-active");
  const originalPlayerHTML = (playerCard as any)._originalHTML || playerCard.innerHTML;
  if (!(playerCard as any)._originalHTML) (playerCard as any)._originalHTML = originalPlayerHTML;

  if (customStyleEl) { customStyleEl.remove(); customStyleEl = null; }
  if (customFrame) { customFrame.remove(); customFrame = null; }

  const styleMatches = [...htmlText.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
  let css = styleMatches.map((m) => m[1]).join("\n");

  if (css) {
    customStyleEl = document.createElement("style");
    customStyleEl.id = "melo-custom-skin";
    customStyleEl.textContent = css;
    document.head.appendChild(customStyleEl);
  }

  const isFull = isFullHtmlSkin(htmlText);
  let bodyHTML = "";
  const bodyMatch = htmlText.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) bodyHTML = bodyMatch[1];
  else {
    const afterStyle = htmlText.split(/<\/style>/i).pop() || "";
    bodyHTML = afterStyle;
  }
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = bodyHTML;
  // "melo-player" is the current root id (skins/README.md); "lumi-player"
  // stays as a fallback for custom skins created before the Lumi → Melo
  // rename — they must keep working unmodified.
  const lumiRoot = tempDiv.querySelector("#melo-player") || tempDiv.querySelector("#lumi-player");
  if (lumiRoot) bodyHTML = lumiRoot.innerHTML;

  if (isFull && bodyHTML.trim().length > 20) {
    const trimmed = bodyHTML.trim();
    playerCard.innerHTML = trimmed;
    if (toast) toast("Skin applied");
    setTimeout(() => {
      (window as any).__LUMI_REBIND__?.();
      const audio = (window as any).__LUMI_AUDIO__ as HTMLAudioElement;
      if (audio && (window as any).__LUMI_REBIND_VISUALIZER__) {
        (window as any).__LUMI_REBIND_VISUALIZER__(audio);
      }
      (window as any).__LUMI_REBIND_MAIN__?.();
    }, 40);
  } else if (css && toast) {
    toast("Skin CSS applied");
  }

  // Persist the window geometry declared by a full skin. Always saved (so a
  // restart can honour it), but the resize event is emitted only when the
  // user explicitly picks/imports a skin — re-applying the same skin at
  // boot or on a theme change must NOT snap the window back to the skin's
  // default size.
  if (isFull) {
    const geometry = parseSkinGeometry(htmlText);
    if (geometry) {
      localStorage.setItem("melo-skin-geometry", JSON.stringify(geometry));
      if (applyGeometry) busEmit("melo:skin-geometry", geometry);
    } else {
      localStorage.removeItem("melo-skin-geometry");
    }
  }

  localStorage.setItem("melo-custom-skin", htmlText);
  localStorage.setItem("melo-custom-skin-isFull", isFull ? "1" : "0");
}

export function resetSkin(toast?: (m: string) => void, broadcast = true) {
  document.documentElement.classList.remove("custom-skin-active");
  document.body.classList.remove("custom-skin-active");
  if (customStyleEl) { customStyleEl.remove(); customStyleEl = null; }
  if (customFrame) { customFrame.remove(); customFrame = null; }
  const playerCard = document.getElementById("playerCard") as HTMLElement;
  if (playerCard && (playerCard as any)._originalHTML) {
    playerCard.innerHTML = (playerCard as any)._originalHTML;
    setTimeout(() => {
      (window as any).__LUMI_REBIND__?.();
      const audio = (window as any).__LUMI_AUDIO__ as HTMLAudioElement;
      if (audio && (window as any).__LUMI_REBIND_VISUALIZER__) {
        (window as any).__LUMI_REBIND_VISUALIZER__(audio);
      }
      (window as any).__LUMI_REBIND_MAIN__?.();
    }, 40);
  }
  localStorage.removeItem("melo-custom-skin");
  localStorage.removeItem("melo-custom-skin-isFull");
  localStorage.removeItem("melo-skin-geometry");
  localStorage.setItem("melo-active-skin-id", "default");
  if (broadcast) busEmit("melo:skin-changed", "default");
  if (toast) toast("Switched to Default Melo skin");
}

export async function listInstalledSkins(): Promise<SkinItem[]> {
  if (isTauri) {
    try {
      const { invoke } = await import("@tauri-apps/api/core");
      const list: SkinItem[] = await invoke("list_installed_skins");
      if (Array.isArray(list)) return list;
    } catch {}
  }
  // No hard-coded fallback list: the dropdown shows exactly what exists on
  // disk. In browser/demo mode (no Rust backend) that is simply nothing.
  return [];
}

export async function loadSkinFromDisk(
  filenameOrPath: string,
  toast?: (m: string) => void,
  applyGeometry = true,
  token?: number,
  silentFail = false
): Promise<boolean> {
  // Every await can outlive a newer skin request; re-check the race token
  // before each apply so a stale load can never inject its content.
  const stale = () => token !== undefined && token !== skinApplyToken;

  // 1. Try reading directly from disk via Rust command
  if (isTauri) {
    try {
      const { invoke } = await import("@tauri-apps/api/core");
      const content: string = await invoke("read_skin_file", { filenameOrPath });
      if (content && content.trim().length > 0) {
        if (stale()) return false;
        applyCustomSkin(content, toast, applyGeometry);
        return true;
      }
    } catch {}
  }

  // 2. Try fetching from web root
  try {
    const cleanPath = filenameOrPath.startsWith("skins/") ? filenameOrPath : `skins/${filenameOrPath}`;
    const resp = await fetch(cleanPath);
    if (resp.ok) {
      const text = await resp.text();
      if (stale()) return false;
      applyCustomSkin(text, toast, applyGeometry);
      return true;
    }
  } catch {}

  // silentFail: the caller (applySkinChoice) reports the failure itself and
  // handles the fallback to Default. There is deliberately no embedded
  // fallback: a skin deleted by the user must fail cleanly instead of
  // reappearing.
  if (toast && !silentFail) toast(`Could not load skin: ${filenameOrPath}`);
  return false;
}

export async function applySkinChoice(skinChoice: string, currentTheme: "light" | "dark", toast?: (m: string) => void, broadcast = true, applyGeometry = true): Promise<boolean> {
  // Claim the race token: any older in-flight switch becomes a no-op.
  const token = ++skinApplyToken;
  const guardedToast = toast
    ? (m: string) => { if (token === skinApplyToken) toast(m); }
    : undefined;

  if (skinChoice === "default") {
    resetSkin(toast, broadcast);
    return true;
  }

  let targetFile = skinChoice;
  // NOTE: the custom-skin-active layout class is intentionally NOT added
  // here — applyCustomSkin sets it only once content is actually applied,
  // so a failed load never leaves a half-switched layout behind.
  if (!targetFile.endsWith(".html") && !targetFile.endsWith(".htm")) {
    targetFile = targetFile + ".html";
  }

  const success = await loadSkinFromDisk(targetFile, guardedToast, applyGeometry, token, true);
  if (token !== skinApplyToken) return false; // superseded by a newer request

  if (success) {
    localStorage.setItem("melo-active-skin-id", skinChoice);
    if (broadcast) busEmit("melo:skin-changed", skinChoice);
    return true;
  }
  // Deterministic fallback: report the failure and return to the Default
  // Melo skin. The DEFAULT WINDOW GEOMETRY must be re-enforced too —
  // resetSkin restores the default content, but the OS window would keep
  // the missing skin's min/max/size. `melo:skin-geometry` makes the main
  // window resolve the CURRENT active skin (now default) and re-apply its
  // constraints + 960×240 size.
  resetSkin(undefined, broadcast);
  try { busEmit("melo:skin-geometry", null); } catch {}
  if (toast) toast(`Skin "${skinChoice}" could not be loaded — switched to Default Melo`);
  return false;
}

export async function openSkinsFolderOnDisk(toast?: (m: string) => void) {
  if (isTauri) {
    try {
      const { invoke } = await import("@tauri-apps/api/core");
      await invoke("open_skins_folder");
      if (toast) toast("Opening skins folder...");
    } catch {
      if (toast) toast("Could not open skins folder");
    }
  } else {
    if (toast) toast("Skins are located in the skins/ folder");
  }
}

export function setupSkinEngine(toast: (m: string) => void) {
  const skinUpload = document.getElementById("skinUpload") as HTMLInputElement;

  let savedSkinId = localStorage.getItem("melo-active-skin-id") || "default";
  const theme = (localStorage.getItem("melo-theme") as "light" | "dark") || "dark";

  if (savedSkinId && savedSkinId !== "default") {
    setTimeout(() => {
      // Boot re-application RE-ENFORCES the skin's declared geometry
      // (applyGeometry=true): with `false`, the PREVIOUS skin's min/max/
      // resizable constraints stayed on the OS window and skins booted
      // height-locked or at wrong sizes. If the saved skin can no longer be
      // loaded (removed from disk), fall back to Default without an error.
      applySkinChoice(savedSkinId, theme, undefined, false, true).catch?.(() => {
        resetSkin(undefined, false);
      });
    }, 150);
  }

  busOn("melo:theme", (t: any) => {
    const activeSkin = localStorage.getItem("melo-active-skin-id");
    if (activeSkin && activeSkin !== "default") {
      // applyGeometry=true: a theme re-apply must also restore the skin's
      // declared window constraints, not keep stale ones.
      applySkinChoice(activeSkin, t, undefined, false, true);
    }
  });

  busOn("melo:skin-changed", (skinChoice: any) => {
    if (skinChoice && typeof skinChoice === "string") {
      const currentTheme = (localStorage.getItem("melo-theme") as "light" | "dark") || "dark";
      // applyGeometry=true: this re-apply runs in the MAIN window after the
      // Settings panel switched skins. Without it the PREVIOUS skin's window
      // constraints stayed live — the main cause of "skins' dimensions are
      // all wrong". Re-enforcing makes every switch deterministic.
      applySkinChoice(skinChoice, currentTheme, undefined, false, true);
    }
  });

  if (skinUpload) {
    skinUpload.addEventListener("change", async () => {
      const file = skinUpload.files?.[0];
      if (!file) return;
      const text = await file.text();
      const filename = file.name;

      // Guard both sides of the save: an empty selection must never reach
      // the skins folder as a 0-byte file, and a failed save must be
      // reported instead of silently swallowed.
      if (!text || !text.trim()) {
        toast(`"${filename}" is empty — nothing to import`);
        skinUpload.value = "";
        return;
      }
      // Size + structure validation before anything touches disk.
      if (text.length > MAX_SKIN_IMPORT_CHARS) {
        toast(`"${filename}" is too large to be a skin (limit 512 KB)`);
        skinUpload.value = "";
        return;
      }
      if (!looksLikeSkin(text)) {
        toast(`"${filename}" doesn't look like a Melo skin (no markup found)`);
        skinUpload.value = "";
        return;
      }
      // Explicit trust confirmation for trusted-extension content.
      const confirmed = await confirmSkinImport(filename);
      if (!confirmed) {
        skinUpload.value = "";
        return;
      }

      if (isTauri) {
        try {
          const { invoke } = await import("@tauri-apps/api/core");
          await invoke("save_custom_skin_file", { filename, content: text });
          toast(`Saved ${filename} to skins folder`);
        } catch (err) {
          toast(`Could not save ${filename} to the skins folder (${err})`);
          skinUpload.value = "";
          return;
        }
      }

      applyCustomSkin(text, toast);
      localStorage.setItem("melo-active-skin-id", filename);
      busEmit("melo:skin-changed", filename);
      skinUpload.value = "";
    });
  }

  document.addEventListener("dragover", (e) => {
    if ([...(e.dataTransfer?.types || [])].includes("Files")) e.preventDefault();
  });
  document.addEventListener("drop", async (e) => {
    const file = [...(e.dataTransfer?.files || [])].find(
      (f) => f.name.endsWith(".html") || f.name.endsWith(".htm")
    );
    if (file) {
      e.preventDefault();
      const text = await file.text();
      // Same guard as the Import button: size cap, structure check, explicit
      // trust confirmation.
      if (text.length > MAX_SKIN_IMPORT_CHARS || !looksLikeSkin(text)) {
        toast(`"${file.name}" was not imported — not a valid Melo skin`);
        return;
      }
      {
        const filename = file.name;
        const confirmed = await confirmSkinImport(filename);
        if (!confirmed) return;
        if (isTauri) {
          try {
            const { invoke } = await import("@tauri-apps/api/core");
            await invoke("save_custom_skin_file", { filename, content: text });
          } catch (err) {
            // The skin still applies for this session, but say so honestly
            // instead of implying it was stored.
            toast(`Skin applied for this session only — could not save ${filename} (${err})`);
            applyCustomSkin(text, undefined);
            localStorage.setItem("melo-active-skin-id", filename);
            busEmit("melo:skin-changed", filename);
            return;
          }
        }
        applyCustomSkin(text, toast);
        localStorage.setItem("melo-active-skin-id", filename);
        busEmit("melo:skin-changed", filename);
      }
    }
  });

  (window as any).LumiSkin = { applyCustomSkin, resetSkin, applySkinChoice, listInstalledSkins, openSkinsFolderOnDisk };
}
