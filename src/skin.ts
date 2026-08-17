import { busEmit, busOn, isTauri } from "./bus";

let customStyleEl: HTMLStyleElement | null = null;
let customFrame: HTMLIFrameElement | null = null;

export interface SkinItem {
  id: string;
  name: string;
  filename: string;
  path?: string;
}

// The compact pill skin ships on disk (skins/compact-pill.html) and is
// theme-aware (light/dark). It is loaded via loadSkinFromDisk(); the
// embedded Rust copy is the ultimate fallback. No inline copy here to
// keep this bundle small.
const COMPACT_PILL = "";


const EMBEDDED_SKINS: Record<string, string> = {
  "compact-pill.html": COMPACT_PILL,
  "compact-pill": COMPACT_PILL,
};

const WEB_SKINS_LIST: SkinItem[] = [
  { id: "compact-pill", name: "Minimal Compact (Pill)", filename: "compact-pill.html" },
  { id: "full-html-example", name: "Full HTML Example (Vertical)", filename: "full-html-example.html" },
];

// Last full HTML skin applied, so callers (e.g. main window sizing) can read
// its <meta name="melo-window"> hints without re-reading the file.
let lastAppliedSkinHtml: string | null = null;
export function getLastAppliedSkinHtml(): string | null {
  return lastAppliedSkinHtml;
}

export function isFullHtmlSkin(htmlText: string): boolean {
  const markers = ["trackTitle", "btnPlay", "seekBar", "coverImg"];
  let count = 0;
  for (const m of markers) if (htmlText.includes(m)) count++;
  return count >= 3;
}

export interface SkinWindowHints {
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  resizable?: boolean;
  transparent?: boolean;
}

/**
 * Parse an optional <meta name="melo-window" content="..."> tag that lets a
 * skin declare its own window geometry. Values are comma-separated CSS-like
 * key/value pairs, e.g.:
 *   content="width=340, height=580, resizable=true"
 */
export function parseSkinWindowHints(htmlText: string): SkinWindowHints {
  const hints: SkinWindowHints = {};
  const match = htmlText.match(
    /<meta[^>]+name=["']melo-window["'][^>]*content=["']([^"']*)["']/i,
  );
  if (!match) return hints;
  for (const part of match[1].split(",")) {
    const [rawKey, rawVal] = part.split("=").map((s) => s.trim());
    if (!rawKey || rawVal === undefined) continue;
    const key = rawKey as keyof SkinWindowHints;
    if (key === "resizable" || key === "transparent") {
      (hints as Record<string, unknown>)[key] = /^(1|true|yes)$/i.test(rawVal);
    } else {
      const n = parseInt(rawVal, 10);
      if (Number.isFinite(n) && n > 0) {
        (hints as Record<string, unknown>)[key] = n;
      }
    }
  }
  return hints;
}

export function applyCustomSkin(htmlText: string, toast?: (m: string) => void) {
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
  document.documentElement.classList.toggle("full-html-skin-active", isFull);
  document.body.classList.toggle("full-html-skin-active", isFull);
  let bodyHTML = "";
  const bodyMatch = htmlText.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) bodyHTML = bodyMatch[1];
  else {
    const afterStyle = htmlText.split(/<\/style>/i).pop() || "";
    bodyHTML = afterStyle;
  }
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = bodyHTML;
  const meloRoot = tempDiv.querySelector("#melo-player");
  if (meloRoot) bodyHTML = meloRoot.innerHTML;

  if (isFull && bodyHTML.trim().length > 20) {
    lastAppliedSkinHtml = htmlText;
    const trimmed = bodyHTML.trim();
    playerCard.innerHTML = trimmed;
    if (toast) toast("Skin applied");
    setTimeout(() => {
      (window as any).__MELO_REBIND__?.();
      const audio = (window as any).__MELO_AUDIO__ as HTMLAudioElement;
      if (audio && (window as any).__MELO_REBIND_VISUALIZER__) {
        (window as any).__MELO_REBIND_VISUALIZER__(audio);
      }
      (window as any).__MELO_REBIND_MAIN__?.();
    }, 40);
  } else if (css && toast) {
    toast("Skin CSS applied");
  }

  localStorage.setItem("melo-custom-skin", htmlText);
  localStorage.setItem("melo-custom-skin-isFull", isFull ? "1" : "0");
}

export function resetSkin(toast?: (m: string) => void, broadcast = true) {
  lastAppliedSkinHtml = null;
  document.documentElement.classList.remove(
    "compact-skin-active",
    "full-html-skin-active"
  );
  document.body.classList.remove(
    "compact-skin-active",
    "full-html-skin-active"
  );
  if (customStyleEl) { customStyleEl.remove(); customStyleEl = null; }
  if (customFrame) { customFrame.remove(); customFrame = null; }
  const playerCard = document.getElementById("playerCard") as HTMLElement;
  if (playerCard && (playerCard as any)._originalHTML) {
    playerCard.innerHTML = (playerCard as any)._originalHTML;
    setTimeout(() => {
      (window as any).__MELO_REBIND__?.();
      const audio = (window as any).__MELO_AUDIO__ as HTMLAudioElement;
      if (audio && (window as any).__MELO_REBIND_VISUALIZER__) {
        (window as any).__MELO_REBIND_VISUALIZER__(audio);
      }
      (window as any).__MELO_REBIND_MAIN__?.();
    }, 40);
  }
  localStorage.removeItem("melo-custom-skin");
  localStorage.removeItem("melo-custom-skin-isFull");
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

export async function loadSkinFromDisk(filenameOrPath: string, toast?: (m: string) => void): Promise<boolean> {
  // 1. Try reading directly from disk via Rust command
  if (isTauri) {
    try {
      const { invoke } = await import("@tauri-apps/api/core");
      const content: string = await invoke("read_skin_file", { filenameOrPath });
      if (content && content.trim().length > 0) {
        applyCustomSkin(content, toast);
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
      applyCustomSkin(text, toast);
      return true;
    }
  } catch {}

  // 3. Guaranteed embedded fallback
  const baseName = filenameOrPath.replace(/^.*[\\/]/, "");
  if (EMBEDDED_SKINS[baseName]) {
    applyCustomSkin(EMBEDDED_SKINS[baseName], toast);
    return true;
  }

  if (toast) toast(`Could not load skin: ${filenameOrPath}`);
  return false;
}

export async function applySkinChoice(skinChoice: string, currentTheme: "light" | "dark", toast?: (m: string) => void, broadcast = true) {
  if (skinChoice === "default") {
    resetSkin(toast, broadcast);
    return;
  }

  let targetFile = skinChoice;
  const isCompact = skinChoice === "compact-pill" || skinChoice.startsWith("compact-pill");
  document.documentElement.classList.toggle("compact-skin-active", isCompact);
  document.body.classList.toggle("compact-skin-active", isCompact);
  if (isCompact) {
    // Single theme-aware compact pill skin; it responds to
    // html[data-theme="dark"] automatically.
    targetFile = "compact-pill.html";
  } else if (!targetFile.endsWith(".html") && !targetFile.endsWith(".htm")) {
    targetFile = targetFile + ".html";
  }

  // Load skins from the (single) AppData skins directory. The bundled
  // defaults are seeded there on first run, and the Rust backend also has
  // an embedded fallback if a file is ever missing.
  let success = false;
  if (isCompact && EMBEDDED_SKINS[targetFile]) {
    // Inline fallback (empty in normal builds) — prefer the disk copy.
    success = await loadSkinFromDisk(targetFile, toast);
    if (!success) {
      applyCustomSkin(EMBEDDED_SKINS[targetFile], toast);
      success = true;
    }
  } else {
    success = await loadSkinFromDisk(targetFile, toast);
  }
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

export function setupSkinEngine(toast: (m: string) => void) {
  const skinUpload = document.getElementById("skinUpload") as HTMLInputElement;
  const linkDownload = document.getElementById("linkDownloadExample") as HTMLAnchorElement;

  if (linkDownload) {
    linkDownload.addEventListener("click", (e) => {
      e.preventDefault();
      loadSkinFromDisk("compact-pill-light.html");
    });
  }

  const savedSkinId = localStorage.getItem("melo-active-skin-id") || "default";
  const theme = (localStorage.getItem("melo-theme") as "light" | "dark") || "dark";

  if (savedSkinId && savedSkinId !== "default") {
    setTimeout(() => {
      applySkinChoice(savedSkinId, theme, undefined, false);
    }, 150);
  }

  busOn("melo:theme", (t: any) => {
    const activeSkin = localStorage.getItem("melo-active-skin-id");
    if (activeSkin && activeSkin !== "default") {
      applySkinChoice(activeSkin, t, undefined, false);
    }
  });

  busOn("melo:skin-changed", (skinChoice: any) => {
    if (skinChoice && typeof skinChoice === "string") {
      const currentTheme = (localStorage.getItem("melo-theme") as "light" | "dark") || "dark";
      applySkinChoice(skinChoice, currentTheme, undefined, false);
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
          const savedPath = await invoke<string>("save_custom_skin_file", { filename, content: text });
          // Let the dropdown pick the new file up, then apply by filename
          // (the backend resolves it from the writable skins folder).
          busEmit("melo:skins-changed");
          toast(`Imported ${filename}`);
          applyCustomSkin(text, toast);
          localStorage.setItem("melo-active-skin-id", filename);
          busEmit("melo:skin-changed", filename);
          skinUpload.value = "";
          return;
        } catch (err) {
          console.error("Failed to save imported skin", err);
          toast("Could not save skin to the skins folder. See the log for details.");
        }
      }

      // Non-Tauri / save failed: still apply for this session.
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
            busEmit("melo:skins-changed");
          } catch (err) {
            console.error("Failed to save dragged skin", err);
            toast("Could not save skin to the skins folder.");
          }
        }
        applyCustomSkin(text, toast);
        localStorage.setItem("melo-active-skin-id", filename);
        busEmit("melo:skin-changed", filename);
      }
    }
  });

  (window as any).MeloSkin = { applyCustomSkin, resetSkin, applySkinChoice, listInstalledSkins, openSkinsFolderOnDisk };
}
