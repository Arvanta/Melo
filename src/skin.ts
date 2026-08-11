import { busEmit, busOn } from "./bus";

let customStyleEl: HTMLStyleElement | null = null;
let customFrame: HTMLIFrameElement | null = null;

export interface SkinItem {
  id: string;
  name: string;
  filename: string;
  path?: string;
}

// Fallback list of skins for Web demo mode
const WEB_SKINS_LIST: SkinItem[] = [
  { id: "compact-pill-light", name: "Minimal Compact (Light)", filename: "compact-pill-light.html" },
  { id: "compact-pill-dark", name: "Minimal Compact (Dark)", filename: "compact-pill-dark.html" },
  { id: "full-html-example", name: "Full HTML Example", filename: "full-html-example.html" },
  { id: "example-custom", name: "Custom CSS Example", filename: "example-custom.html" },
];

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
  const lumiRoot = tempDiv.querySelector("#lumi-player");
  if (lumiRoot) bodyHTML = lumiRoot.innerHTML;

  if (isFull && bodyHTML.trim().length > 20) {
    const trimmed = bodyHTML.trim();
    playerCard.innerHTML = trimmed;
    if (toast) toast("Skin applied from disk");
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

  localStorage.setItem("lumi-custom-skin", htmlText);
  localStorage.setItem("lumi-custom-skin-isFull", isFull ? "1" : "0");
}

export function resetSkin(toast?: (m: string) => void) {
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
  localStorage.removeItem("lumi-custom-skin");
  localStorage.removeItem("lumi-custom-skin-isFull");
  localStorage.setItem("melo-active-skin-id", "default");
  busEmit("melo:skin-changed", "default");
  if (toast) toast("Switched to Default Melo skin");
}

export async function listInstalledSkins(): Promise<SkinItem[]> {
  if ((window as any).__TAURI__) {
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
  if ((window as any).__TAURI__) {
    try {
      const { invoke } = await import("@tauri-apps/api/core");
      const content: string = await invoke("read_skin_file", { filenameOrPath });
      if (content && content.trim().length > 0) {
        applyCustomSkin(content, toast);
        return true;
      }
    } catch (err: any) {
      if (toast) toast(`Error loading skin: ${err}`);
      return false;
    }
  } else {
    // Web demo fallback fetch
    try {
      const resp = await fetch(`skins/${filenameOrPath}`);
      if (resp.ok) {
        const text = await resp.text();
        applyCustomSkin(text, toast);
        return true;
      }
    } catch {}
  }
  return false;
}

export async function applySkinChoice(skinChoice: string, currentTheme: "light" | "dark", toast?: (m: string) => void) {
  if (skinChoice === "default") {
    resetSkin(toast);
    return;
  }

  // Check if choosing compact-pill preset
  let targetFile = skinChoice;
  if (skinChoice === "compact-pill" || skinChoice.startsWith("compact-pill")) {
    targetFile = currentTheme === "dark" ? "compact-pill-dark.html" : "compact-pill-light.html";
  } else if (!targetFile.endsWith(".html") && !targetFile.endsWith(".htm")) {
    targetFile = targetFile + ".html";
  }

  const success = await loadSkinFromDisk(targetFile, toast);
  if (success) {
    localStorage.setItem("melo-active-skin-id", skinChoice);
    busEmit("melo:skin-changed", skinChoice);
  }
}

export async function openSkinsFolderOnDisk(toast?: (m: string) => void) {
  if ((window as any).__TAURI__) {
    try {
      const { invoke } = await import("@tauri-apps/api/core");
      await invoke("open_skins_folder");
      if (toast) toast("Opened skins folder in Explorer");
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
      loadSkinFromDisk("compact-pill-light.html").then(ok => {
        if (!ok) {
          toast("Sample skin is in skins/compact-pill-light.html");
        }
      });
    });
  }

  // Load saved active skin directly from disk on startup
  const savedSkinId = localStorage.getItem("melo-active-skin-id") || "default";
  const theme = (localStorage.getItem("lumi-theme") as "light" | "dark") || "dark";

  if (savedSkinId && savedSkinId !== "default") {
    setTimeout(() => {
      applySkinChoice(savedSkinId, theme);
    }, 150);
  }

  // Theme changes update compact-pill if active
  busOn("melo:theme", (t: any) => {
    const activeSkin = localStorage.getItem("melo-active-skin-id");
    if (activeSkin && activeSkin !== "default") {
      applySkinChoice(activeSkin, t);
    }
  });

  if (skinUpload) {
    skinUpload.addEventListener("change", async () => {
      const file = skinUpload.files?.[0];
      if (!file) return;
      const text = await file.text();
      const filename = file.name;
      
      // Save directly to skins folder if in Tauri
      if ((window as any).__TAURI__) {
        try {
          const { invoke } = await import("@tauri-apps/api/core");
          await invoke("save_custom_skin_file", { filename, content: text });
          toast(`Saved ${filename} to skins folder`);
        } catch {}
      }
      
      applyCustomSkin(text, toast);
      const stem = filename.replace(/\.[^/.]+$/, "");
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
        if ((window as any).__TAURI__) {
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
