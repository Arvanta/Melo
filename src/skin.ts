import { busEmit, busOn, isTauri } from "./bus";

let customStyleEl: HTMLStyleElement | null = null;
let customFrame: HTMLIFrameElement | null = null;

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

// No embedded skins after compact-pill removal. All bundled skins are
// served from disk / via the `skins/` web folder; `EMBEDDED_SKINS` is kept
// as an empty map so callers don't need special-casing.
const EMBEDDED_SKINS: Record<string, string> = {};

const WEB_SKINS_LIST: SkinItem[] = [
  { id: "full-html-example", name: "Full HTML Example", filename: "full-html-example.html" },
  { id: "slate", name: "Slate", filename: "slate.html" },
  { id: "silk-orbit", name: "Silk Orbit", filename: "silk-orbit.html" },
  { id: "microline", name: "Microline", filename: "microline.html" },
  // Community skins (bundled)
  { id: "aria", name: "Aria", filename: "aria.html" },
  { id: "graphite", name: "Graphite", filename: "graphite.html" },
  { id: "halcyon", name: "Halcyon", filename: "halcyon.html" },
  { id: "haven", name: "Haven", filename: "haven.html" },
  { id: "hira", name: "Hira", filename: "hira.html" },
  { id: "koto", name: "Koto", filename: "koto.html" },
  { id: "lumen", name: "Lumen", filename: "lumen.html" },
  { id: "microline-v", name: "Microline V (Vertical)", filename: "microline-v.html" },
  { id: "mist", name: "Mist", filename: "mist.html" },
];

export function isFullHtmlSkin(htmlText: string): boolean {
  const idMarkers = ["trackTitle", "btnPlay", "seekBar", "coverImg"];
  let count = 0;
  for (const m of idMarkers) if (htmlText.includes(m)) count++;
  // `data-melo` based skins (new convention) also count as full skins.
  const meloAttrCount = (htmlText.match(/data-melo\s*=/g) || []).length;
  count += Math.min(meloAttrCount, 3);
  return count >= 3;
}

export function applyCustomSkin(htmlText: string, toast?: (m: string) => void, applyGeometry = true) {
  const playerCard = document.getElementById("playerCard") as HTMLElement;
  if (!playerCard) return;
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
  // "melo-player" is the current root id documented in skins/README.md.
  // "lumi-player" is kept as a fallback purely for backward-compatibility
  // with custom skins created before the app was renamed from Lumi to
  // Melo — those existing user skins must keep working unmodified.
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

  // Persist the window geometry declared by a full skin (any size/shape).
  // The geometry is always saved (so a restart can honour it), but the
  // resize event is only emitted when the user explicitly picks/imports a
  // skin — re-applying the same skin at boot or on a theme change must NOT
  // snap the window back to the skin's default size.
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
      if (Array.isArray(list) && list.length > 0) {
        return list;
      }
    } catch {}
  }
  return WEB_SKINS_LIST;
}

export async function loadSkinFromDisk(filenameOrPath: string, toast?: (m: string) => void, applyGeometry = true): Promise<boolean> {
  // 1. Try reading directly from disk via Rust command
  if (isTauri) {
    try {
      const { invoke } = await import("@tauri-apps/api/core");
      const content: string = await invoke("read_skin_file", { filenameOrPath });
      if (content && content.trim().length > 0) {
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
      applyCustomSkin(text, toast, applyGeometry);
      return true;
    }
  } catch {}

  // 3. Guaranteed embedded fallback
  const baseName = filenameOrPath.replace(/^.*[\\/]/, "");
  if (EMBEDDED_SKINS[baseName]) {
    applyCustomSkin(EMBEDDED_SKINS[baseName], toast, applyGeometry);
    return true;
  }

  if (toast) toast(`Could not load skin: ${filenameOrPath}`);
  return false;
}

export async function applySkinChoice(skinChoice: string, currentTheme: "light" | "dark", toast?: (m: string) => void, broadcast = true, applyGeometry = true) {
  if (skinChoice === "default") {
    resetSkin(toast, broadcast);
    return;
  }

  let targetFile = skinChoice;
  document.documentElement.classList.add("custom-skin-active");
  document.body.classList.add("custom-skin-active");
  if (!targetFile.endsWith(".html") && !targetFile.endsWith(".htm")) {
    targetFile = targetFile + ".html";
  }

  const success = await loadSkinFromDisk(targetFile, toast, applyGeometry);
  if (success) {
    localStorage.setItem("melo-active-skin-id", skinChoice);
    if (broadcast) busEmit("melo:skin-changed", skinChoice);
  }
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

// Skin ids that used to ship with Melo but have been retired. If a user's
// saved preference still points at one, silently fall back to Default so
// the player doesn't try to load a missing file on every boot.
const RETIRED_SKINS = new Set([
  "compact-pill", "compact-pill.html",
  "compact-pill-light", "compact-pill-light.html",
  "compact-pill-dark", "compact-pill-dark.html",
  "ivory", "ivory.html",
]);

export function setupSkinEngine(toast: (m: string) => void) {
  const skinUpload = document.getElementById("skinUpload") as HTMLInputElement;

  let savedSkinId = localStorage.getItem("melo-active-skin-id") || "default";
  const theme = (localStorage.getItem("melo-theme") as "light" | "dark") || "dark";

  // Migrate retired-skin preferences back to Default so the player doesn't
  // try to load a missing file after an upgrade.
  if (RETIRED_SKINS.has(savedSkinId)) {
    localStorage.setItem("melo-active-skin-id", "default");
    localStorage.removeItem("melo-custom-skin");
    localStorage.removeItem("melo-custom-skin-isFull");
    localStorage.removeItem("melo-skin-geometry");
    savedSkinId = "default";
  }

  if (savedSkinId && savedSkinId !== "default") {
    setTimeout(() => {
      // Boot re-application must not snap the window back to the skin's
      // default size — a resizable skin keeps its saved dimensions.
      // If the saved skin can no longer be loaded (removed from disk),
      // fall back to Default without raising an error.
      applySkinChoice(savedSkinId, theme, undefined, false, false).catch?.(() => {
        resetSkin(undefined, false);
      });
    }, 150);
  }

  busOn("melo:theme", (t: any) => {
    const activeSkin = localStorage.getItem("melo-active-skin-id");
    if (activeSkin && activeSkin !== "default") {
      applySkinChoice(activeSkin, t, undefined, false, false);
    }
  });

  busOn("melo:skin-changed", (skinChoice: any) => {
    if (skinChoice && typeof skinChoice === "string") {
      const currentTheme = (localStorage.getItem("melo-theme") as "light" | "dark") || "dark";
      applySkinChoice(skinChoice, currentTheme, undefined, false, false);
    }
  });

  if (skinUpload) {
    skinUpload.addEventListener("change", async () => {
      const file = skinUpload.files?.[0];
      if (!file) return;
      const text = await file.text();
      const filename = file.name;
      
      if (isTauri) {
        try {
          const { invoke } = await import("@tauri-apps/api/core");
          await invoke("save_custom_skin_file", { filename, content: text });
          toast(`Saved ${filename} to skins folder`);
        } catch {}
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
      if (text.includes("<style") || text.includes("<html") || isFullHtmlSkin(text)) {
        const filename = file.name;
        if (isTauri) {
          try {
            const { invoke } = await import("@tauri-apps/api/core");
            await invoke("save_custom_skin_file", { filename, content: text });
          } catch {}
        }
        applyCustomSkin(text, toast);
        localStorage.setItem("melo-active-skin-id", filename);
        busEmit("melo:skin-changed", filename);
      }
    }
  });

  (window as any).LumiSkin = { applyCustomSkin, resetSkin, applySkinChoice, listInstalledSkins, openSkinsFolderOnDisk };
}
