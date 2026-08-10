export const skins = {
  light: `<!-- Melo Light skin — this is default. You can copy and edit -->`,
};

export function setupSkinEngine(toast: (m: string) => void) {
  const skinUpload = document.getElementById("skinUpload") as HTMLInputElement;
  const skinPreview = document.getElementById("skinPreview") as HTMLElement;
  const linkDownload = document.getElementById("linkDownloadExample") as HTMLAnchorElement;

  // Example skin template to download - now includes FULL HTML example too
  const exampleSkin = `<!doctype html>
<html lang="fa">
<head>
<meta charset="UTF-8">
<style>
  /* == Melo Custom Skin - CSS ONLY example == 
     تمام متغیرهای تم را override کنید:
  */
  :root {
    --card: #fefcfb;
    --accent: #ff6b6b;
    --visualizer: #ff6b6b;
    --radius: 20px;
  }
  .player-card {
    background: linear-gradient(135deg, #fff8f0, #ffffff) !important;
    border: 2px solid #ffe0cc !important;
  }
  .cover-wrap {
    border-radius: 50% !important;
    transform: rotate(2deg);
  }
  .v-bar {
    background: linear-gradient(to top, #ff6b6b, #ffd93d) !important;
  }
</style>
</head>
<body>
  <!-- این فقط CSS بود. برای آزادی کامل، HTML کامل را ببینید: skins/full-html-example.html -->
</body>
</html>`;

  const fullExample = `<!doctype html>
<html lang="fa">
<head>
<meta charset="UTF-8">
<style>
  /* FULL HTML SKIN - آزادی کامل */
  /* اینجا هر CSS که بخوای بنویس - حتی جای پراگرس‌بار رو عوض کن */
  .player-card { background: #0f172a !important; border-color: #1e293b !important; }
  .player-main { display: grid !important; grid-template-columns: 100px 1fr 140px; gap: 16px !important; }
  .cover-wrap { width: 100px !important; height: 100px !important; border-radius: 16px !important; order: 2; }
  .track-info { order: 1; }
  .right-panel { order: 3; }
  .seek-row { position: absolute !important; bottom: 12px !important; left: 20px !important; right: 20px !important; }
  .track-title { font-size: 22px !important; color: #f8fafc !important; }
</style>
</head>
<body>
<!-- 
  FULL HTML SKIN: هر چیزی که اینجا بنویسی جایگزین .player-card میشه
  فقط این ID ها رو نگه دار تا دکمه‌ها کار کنن:
  coverImg, coverFallback, trackTitle, trackArtist, trackAlbum, trackCodec, trackSpecs,
  btnShuffle, btnPrev, btnPlay, iconPlay, iconPause, btnNext, btnRepeat,
  curTime, durTime, seekBar, volBar, volPct, volIcon, vizBars
  می‌تونی جاشون رو هر جا بذاری، شکلشون رو هر طور بخوای عوض کنی!
-->
<div class="player-titlebar" data-tauri-drag-region>
  <button class="app-name-btn" id="appMenuBtn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12h2l1-7 2 14 3-10 2 6h2l2-9 2 14 2-7h2"/></svg> Melo <span class="chev">▾</span></button>
  <div class="win-controls"><button class="win-btn" aria-label="minimize">—</button><button class="win-btn" aria-label="maximize">□</button><button class="win-btn close" aria-label="close">×</button></div>
</div>
<div class="player-main">
  <div class="cover-wrap" id="coverWrap"><img id="coverImg" style="display:none"/><div id="coverFallback" class="cover-fallback">♪</div></div>
  <div class="track-info">
    <div class="track-meta">
      <div class="track-title" id="trackTitle">The Horizon</div>
      <div class="track-artist" id="trackArtist">Tycho</div>
      <div class="track-album" id="trackAlbum">Simulcast</div>
      <div class="track-format"><span class="badge-flac" id="trackCodec">FLAC</span><span id="trackSpecs">44.1 kHz</span></div>
    </div>
    <div class="transport">
      <button id="btnShuffle">⤨</button><button id="btnPrev">⏮</button>
      <button id="btnPlay"><span id="iconPause">⏸</span><span id="iconPlay" style="display:none">▶</span></button>
      <button id="btnNext">⏭</button><button id="btnRepeat">↻</button>
    </div>
    <div class="seek-row"><span id="curTime">1:24</span><input id="seekBar" type="range" class="seek"/><span id="durTime">4:36</span></div>
  </div>
  <div class="right-panel">
    <div class="right-main">
      <div class="volume-row"><span id="volIcon">🔊</span><input id="volBar" type="range" class="vol"/><span id="volPct">60%</span></div>
      <div class="visualizer-bars" id="vizBars"><div class="v-bar"></div><div class="v-bar"></div><div class="v-bar"></div><div class="v-bar"></div><div class="v-bar"></div><div class="v-bar"></div><div class="v-bar"></div><div class="v-bar"></div><div class="v-bar"></div><div class="v-bar"></div><div class="v-bar"></div><div class="v-bar"></div></div>
    </div>
    <div class="side-actions">
      <button id="btnToggleLibrary">📚</button><button id="btnTogglePlaylist">≡</button><button id="btnToggleEq">🎛</button><button id="btnOpenSettings">⚙</button>
    </div>
  </div>
</div>
</body>
</html>`;

  linkDownload.addEventListener("click", (e) => {
    e.preventDefault();
    // Download CSS example by default, full example via second link if needed
    const blob = new Blob([exampleSkin], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lumi-custom-skin.html";
    a.click();
    URL.revokeObjectURL(url);
    toast("نمونه اسکین CSS دانلود شد — برای HTML کامل skins/full-html-example.html را ببینید");
  });

  let customStyleEl: HTMLStyleElement | null = null;
  let customFrame: HTMLIFrameElement | null = null;
  const playerCard = document.getElementById("playerCard") as HTMLElement;
  const originalPlayerHTML = playerCard ? playerCard.innerHTML : "";

  function isFullHtmlSkin(htmlText: string): boolean {
    // If it contains core IDs, it's a full HTML skin
    const markers = ["trackTitle", "btnPlay", "seekBar", "coverImg", "vizBars"];
    let count = 0;
    for (const m of markers) if (htmlText.includes(m)) count++;
    return count >= 3;
  }

  function applyCustomSkin(htmlText: string) {
    // Clean previous style
    if (customStyleEl) {
      customStyleEl.remove();
      customStyleEl = null;
    }
    if (customFrame) {
      customFrame.remove();
      customFrame = null;
    }

    const styleMatches = [...htmlText.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
    let css = styleMatches.map((m) => m[1]).join("\n");

    if (css) {
      customStyleEl = document.createElement("style");
      customStyleEl.id = "lumi-custom-skin";
      customStyleEl.textContent = css;
      document.head.appendChild(customStyleEl);
    }

    const isFull = isFullHtmlSkin(htmlText);
    let bodyHTML = "";
    const bodyMatch = htmlText.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch) bodyHTML = bodyMatch[1];
    else {
      // No body tag, try to extract after </style>
      const afterStyle = htmlText.split(/<\/style>/i).pop() || "";
      bodyHTML = afterStyle;
    }
    // If body contains #lumi-player wrapper, use its innerHTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = bodyHTML;
    const lumiRoot = tempDiv.querySelector("#lumi-player");
    if (lumiRoot) bodyHTML = lumiRoot.innerHTML;

    // Preview
    skinPreview.innerHTML = "";
    const hasHtmlTag = /<html/i.test(htmlText);
    if (hasHtmlTag || isFull) {
      if (isFull) {
        skinPreview.innerHTML = `<div style="padding:10px; font-size:11px; line-height:1.6;">
          <div style="font-weight:700; color:var(--accent);">✓ اسکین HTML کامل تشخیص داده شد</div>
          <div style="color:var(--text-muted);">کل player-card با HTML شما جایگزین شد. موقعیت هر چیزی رو خودت تعیین کردی.</div>
          <div style="display:flex; gap:6px; margin-top:8px;">
            <button class="btn small primary" id="btn-preview-full">نمایش زنده</button>
            <button class="btn small" id="btn-reset-skin2">بازگشت</button>
          </div>
        </div>`;
        document.getElementById("btn-reset-skin2")?.addEventListener("click", resetSkin);
        document.getElementById("btn-preview-full")?.addEventListener("click", () => {
          const win = window.open("", "_blank");
          if (win) { win.document.write(htmlText); win.document.close(); }
        });
      } else {
        customFrame = document.createElement("iframe");
        customFrame.className = "skin-frame";
        customFrame.srcdoc = htmlText;
        customFrame.style.height = "140px";
        skinPreview.appendChild(customFrame);
      }
    } else {
      skinPreview.innerHTML = `<div style="padding:16px;text-align:center;">
        <div style="font-weight:600;margin-bottom:6px;">✓ اسکین CSS اعمال شد</div>
        <div style="font-size:11px;color:var(--text-muted);">برای حذف، صفحه را رفرش کنید</div>
        <button class="btn small" style="margin-top:10px;" id="btn-reset-skin">بازگشت به پیش‌فرض</button>
      </div>`;
      document.getElementById("btn-reset-skin")?.addEventListener("click", resetSkin);
    }

    // Apply FULL HTML replacement if detected
    if (isFull && bodyHTML.trim().length > 20) {
      // Save original if not already saved
      if (!(playerCard as any)._originalHTML) (playerCard as any)._originalHTML = originalPlayerHTML;
      // Replace playerCard content (keep outer wrapper, replace inner)
      // If bodyHTML contains player-titlebar and player-main, use as is
      // Otherwise wrap
      const trimmed = bodyHTML.trim();
      // Detect if body already contains player-titlebar - if not, keep original titlebar
      const hasTitlebar = trimmed.includes("player-titlebar") || trimmed.includes("appMenuBtn");
      if (hasTitlebar) {
        playerCard.innerHTML = trimmed;
      } else {
        // Keep titlebar from original, replace only player-main part if needed
        // For simplicity, replace whole innerHTML
        playerCard.innerHTML = trimmed;
      }
      // Toast
      toast("اسکین HTML کامل اعمال شد — آزادی کامل!");
      // Rebind player & visualizer & window controls
      setTimeout(() => {
        // Trigger rebind via global hook
        (window as any).__LUMI_REBIND__?.();
        // Also re-setup visualizer for new bars
        const audio = (window as any).__LUMI_AUDIO__ as HTMLAudioElement;
        if (audio && (window as any).__LUMI_REBIND_VISUALIZER__) {
          (window as any).__LUMI_REBIND_VISUALIZER__(audio);
        }
        // Rebind app menu & win controls (in main.ts)
        (window as any).__LUMI_REBIND_MAIN__?.();
      }, 50);
    } else if (css) {
      toast("اسکین CSS اعمال شد");
    }

    localStorage.setItem("lumi-custom-skin", htmlText);
    localStorage.setItem("lumi-custom-skin-isFull", isFull ? "1" : "0");
  }

  function resetSkin() {
    if (customStyleEl) customStyleEl.remove();
    if (customFrame) customFrame.remove();
    customStyleEl = null;
    customFrame = null;
    skinPreview.innerHTML = `پیش‌نمایش اسکین اینجا`;
    localStorage.removeItem("lumi-custom-skin");
    localStorage.removeItem("lumi-custom-skin-isFull");
    // Restore original player HTML if it was replaced
    if ((playerCard as any)._originalHTML) {
      playerCard.innerHTML = (playerCard as any)._originalHTML;
      setTimeout(() => {
        (window as any).__LUMI_REBIND__?.();
        const audio = (window as any).__LUMI_AUDIO__ as HTMLAudioElement;
        if (audio && (window as any).__LUMI_REBIND_VISUALIZER__) {
          (window as any).__LUMI_REBIND_VISUALIZER__(audio);
        }
        (window as any).__LUMI_REBIND_MAIN__?.();
      }, 50);
    }
    toast("بازگشت به اسکین پیش‌فرض");
  }

  // Load saved skin
  const saved = localStorage.getItem("lumi-custom-skin");
  if (saved) {
    try {
      // Defer to allow DOM ready
      setTimeout(() => applyCustomSkin(saved), 300);
    } catch {}
  }

  skinUpload.addEventListener("change", async () => {
    const file = skinUpload.files?.[0];
    if (!file) return;
    const text = await file.text();
    applyCustomSkin(text);
    skinUpload.value = "";
  });

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
        applyCustomSkin(text);
      }
    }
  });

  // Expose for debugging
  (window as any).LumiSkin = { applyCustomSkin, resetSkin, exampleSkin, fullExample };
}
