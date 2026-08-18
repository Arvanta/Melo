import { busEmit, busOn, isTauri } from "./bus";
import COMPACT_PILL from "../skins/compact-pill.html?raw";

let customStyleEl: HTMLStyleElement | null = null;
let customFrame: HTMLIFrameElement | null = null;

export interface SkinItem {
  id: string;
  name: string;
  filename: string;
  path?: string;
}

const EMBEDDED_SKINS: Record<string, string> = {
  "compact-pill.html": COMPACT_PILL,
  "compact-pill": COMPACT_PILL,
  "compact-pill-light.html": COMPACT_PILL,
  "compact-pill-dark.html": COMPACT_PILL,
  "compact-pill-light": COMPACT_PILL,
  "compact-pill-dark": COMPACT_PILL,
};

const WEB_SKINS_LIST: SkinItem[] = [
  { id: "compact-pill", name: "Minimal Compact", filename: "compact-pill.html" },
  { id: "full-html-example", name: "Starter Template (Vertical)", filename: "full-html-example.html" },
];

export type SkinWindowSpec = {
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  resizable?: boolean;
  vizBars?: number;
};

function metaContent(html: string, name: string): string | undefined {
  const re1 = new RegExp(`<meta[^>]*name=["']melo-${name}["'][^>]*content=["']([^"']+)["']`, "i");
  const re2 = new RegExp(`<meta[^>]*content=["']([^"']+)["'][^>]*name=["']melo-${name}["']`, "i");
  return html.match(re1)?.[1] || html.match(re2)?.[1];
}

function numAttr(value?: string | null): number | undefined {
  if (value == null || value === "") return undefined;
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

export function parseSkinManifest(html: string): SkinWindowSpec {
  const rootMatch = html.match(/<(?:div|section)[^>]*id=["'](?:melo-player|lumi-player)["'][^>]*>/i);
  const rootTag = rootMatch?.[0] || "";
  const data = (key: string) => {
    const m = rootTag.match(new RegExp(`data-melo-${key}=["']([^"']+)["']`, "i"));
    return m?.[1];
  };
  const resizableRaw = metaContent(html, "resizable") || data("resizable");
  return {
    width: numAttr(metaContent(html, "width") || data("width")),
    height: numAttr(metaContent(html, "height") || data("height")),
    minWidth: numAttr(metaContent(html, "min-width") || data("min-width")),
    minHeight: numAttr(metaContent(html, "min-height") || data("min-height")),
    maxWidth: numAttr(metaContent(html, "max-width") || data("max-width")),
    maxHeight: numAttr(metaContent(html, "max-height") || data("max-height")),
    resizable: resizableRaw == null ? undefined : !/^(0|false|no)$/i.test(resizableRaw),
    vizBars: numAttr(metaContent(html, "viz-bars") || data("viz-bars")),
  };
}

export function applySkinWindowSpec(spec: SkinWindowSpec | null, mode: "default" | "compact" | "custom") {
  document.documentElement.classList.toggle("compact-skin-active", mode === "compact");
  document.body.classList.toggle("compact-skin-active", mode === "compact");
  document.documentElement.classList.toggle("custom-skin-active", mode === "custom");
  document.body.classList.toggle("custom-skin-active", mode === "custom");
  if (spec?.vizBars) document.documentElement.dataset.meloVizBars = String(spec.vizBars);
  else delete document.documentElement.dataset.meloVizBars;
  if (spec && (spec.width || spec.height)) {
    localStorage.setItem("melo-skin-window", JSON.stringify(spec));
  } else {
    localStorage.removeItem("melo-skin-window");
  }
  busEmit("melo:skin-window", spec || null);
}

export function isFullHtmlSkin(htmlText: string): boolean {
  const markers = ["trackTitle", "btnPlay", "seekBar", "coverImg"];
  let count = 0;
  for (const m of markers) if (htmlText.includes(m)) count++;
  return count >= 3;
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
  let bodyHTML = "";
  const bodyMatch = htmlText.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) bodyHTML = bodyMatch[1];
  else {
    const afterStyle = htmlText.split(/<\/style>/i).pop() || "";
    bodyHTML = afterStyle;
  }
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = bodyHTML;
  const skinRoot = tempDiv.querySelector("#melo-player, #lumi-player");
  if (skinRoot) bodyHTML = skinRoot.innerHTML;

  const spec = parseSkinManifest(htmlText);
  if (spec.width || spec.height) applySkinWindowSpec(spec, "custom");

  if (isFull && bodyHTML.trim().length > 20) {
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
      try {
        const p = (window as any).MeloPlayer;
        const cover = p?.queue?.[p?.currentIndex || 0]?.cover || null;
        import("./cover").then(m => m.applyDynamicAmbientTheme(cover)).catch(() => {});
      } catch {}
    }, 40);
  } else if (css && toast) {
    toast("Skin CSS applied");
  }

  localStorage.setItem("melo-custom-skin", htmlText);
  localStorage.setItem("melo-custom-skin-isFull", isFull ? "1" : "0");
}

export function resetSkin(toast?: (m: string) => void, broadcast = true) {
  applySkinWindowSpec(null, "default");
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
      try {
        const p = (window as any).MeloPlayer;
        const cover = p?.queue?.[p?.currentIndex || 0]?.cover || null;
        import("./cover").then(m => m.applyDynamicAmbientTheme(cover)).catch(() => {});
      } catch {}
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
  if (isCompact) {
    applySkinWindowSpec({ width: 780, height: 138, resizable: false }, "compact");
  }
  if (isCompact) {
    targetFile = "compact-pill.html";
  } else if (!targetFile.endsWith(".html") && !targetFile.endsWith(".htm")) {
    targetFile = targetFile + ".html";
  }

  // Built-in compact skins are loaded from this build's embedded copy.
  // This prevents an old skin file left in AppData by an earlier install
  // from silently overriding layout and bug fixes in a newer version.
  let success = false;
  if (isCompact && EMBEDDED_SKINS[targetFile]) {
    applyCustomSkin(EMBEDDED_SKINS[targetFile], toast);
    applySkinWindowSpec({ width: 780, height: 138, resizable: false }, "compact");
    success = true;
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
      loadSkinFromDisk("compact-pill.html");
    });
  }

  const savedSkinId = localStorage.getItem("melo-active-skin-id") || "default";
  const theme = ((localStorage.getItem("melo-theme") || localStorage.getItem("lumi-theme")) as "light" | "dark") || "dark";

  if (savedSkinId && savedSkinId !== "default") {
    setTimeout(() => {
      applySkinChoice(savedSkinId, theme, undefined, false);
    }, 150);
  }

  busOn("melo:theme", (t: any) => {
    const activeSkin = localStorage.getItem("melo-active-skin-id");
    if (!activeSkin || activeSkin === "default") return;
    // Compact uses [data-theme] tokens — no reload needed.
    if (activeSkin === "compact-pill" || activeSkin.startsWith("compact-pill")) return;
    applySkinChoice(activeSkin, t, undefined, false);
  });

  busOn("melo:skin-changed", (skinChoice: any) => {
    if (skinChoice && typeof skinChoice === "string") {
      const currentTheme = ((localStorage.getItem("melo-theme") || localStorage.getItem("lumi-theme")) as "light" | "dark") || "dark";
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

  (window as any).MeloSkin = (window as any).LumiSkin = { applyCustomSkin, resetSkin, applySkinChoice, listInstalledSkins, openSkinsFolderOnDisk };
}
