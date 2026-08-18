const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/event-CNdo2oXa.js","assets/core-DhEqZVGG.js","assets/index-DiyoAAdc.js","assets/index-CHth0gh2.js","assets/index-Bq0iOnRE.js","assets/index-CS3Qnt9j.js","assets/webviewWindow-mjQkSB26.js","assets/dpi-fvP-W2qr.js","assets/window-BWd3Cypy.js"])))=>i.map(i=>d[i]);
(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))e(l);new MutationObserver(l=>{for(const n of l)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&e(s)}).observe(document,{childList:!0,subtree:!0});function i(l){const n={};return l.integrity&&(n.integrity=l.integrity),l.referrerPolicy&&(n.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?n.credentials="include":l.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function e(l){if(l.ep)return;l.ep=!0;const n=i(l);fetch(l.href,n)}})();const ra="modulepreload",ca=function(t){return"/"+t},ke={},Y=function(a,i,e){let l=Promise.resolve();if(i&&i.length>0){let s=function(c){return Promise.all(c.map(u=>Promise.resolve(u).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),p=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));l=s(i.map(c=>{if(c=ca(c),c in ke)return;ke[c]=!0;const u=c.endsWith(".css"),f=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${f}`))return;const y=document.createElement("link");if(y.rel=u?"stylesheet":ra,u||(y.as="script"),y.crossOrigin="",y.href=c,p&&y.setAttribute("nonce",p),document.head.appendChild(y),u)return new Promise((S,k)=>{y.addEventListener("load",S),y.addEventListener("error",()=>k(new Error(`Unable to preload CSS for ${c}`)))})}))}function n(s){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=s,window.dispatchEvent(r),!r.defaultPrevented)throw s}return l.then(s=>{for(const r of s||[])r.status==="rejected"&&n(r.reason);return a().catch(n)})},nt=typeof window.__TAURI_INTERNALS__<"u"||typeof window.__TAURI__<"u";async function D(t,a){if(nt)try{const{emit:i}=await Y(async()=>{const{emit:e}=await import("./event-CNdo2oXa.js");return{emit:e}},__vite__mapDeps([0,1]));await i(t,a);return}catch{}window.dispatchEvent(new CustomEvent(t,{detail:a}))}function at(t,a){nt&&Y(async()=>{const{listen:i}=await import("./event-CNdo2oXa.js");return{listen:i}},__vite__mapDeps([0,1])).then(({listen:i})=>{i(t,e=>{a(e.payload)})}).catch(()=>{}),window.addEventListener(t,i=>a(i.detail))}let xe=!1;async function da(){if(!xe){xe=!0;try{const t=globalThis;if(typeof t.Buffer>"u"){const a=await Y(()=>import("./index-DiyoAAdc.js").then(i=>i.i),__vite__mapDeps([2,3]));t.Buffer=a.Buffer}typeof t.process>"u"&&(t.process={env:{},browser:!0,nextTick:a=>setTimeout(a,0)})}catch{}}}async function ua(t,a){var i;try{await da();const e=await Y(()=>import("./index-Bq0iOnRE.js").then(c=>c.i),__vite__mapDeps([4,3])),l=e&&typeof e.parseBlob=="function"?e:e.default||e,n=await Promise.race([l.parseBlob(t),new Promise((c,u)=>setTimeout(()=>u(new Error("timeout")),1800))]),s=n==null?void 0:n.common;if(!s)return;s.title&&(a.title=s.title),s.artist?a.artist=s.artist:s.artists&&s.artists[0]&&(a.artist=s.artists[0]),s.album&&(a.album=s.album),s.genre&&s.genre[0]&&(a.genre=s.genre[0]),s.year&&(a.year=s.year);const r=(i=s.picture)==null?void 0:i[0];if(r&&r.data){const c=r.format||"image/jpeg",u=r.data;if(u.length>6e5)return;let f="";const y=8192;for(let S=0;S<u.length;S+=y){const k=u.subarray(S,S+y);f+=String.fromCharCode.apply(null,k)}a.cover=`data:${c};base64,${btoa(f)}`}const p=n==null?void 0:n.format;p&&p.duration&&!a.duration&&(a.duration=Math.floor(p.duration))}catch{}}async function Re(t,a,i=1800){return await ua(t,a),a}async function pa(t){return new Promise(a=>{if(!t)return a(null);const i=new Image;i.crossOrigin="anonymous",i.onload=()=>{try{const e=document.createElement("canvas"),l=e.getContext("2d");if(!l)return a(null);e.width=40,e.height=40,l.drawImage(i,0,0,40,40);const n=l.getImageData(0,0,40,40).data;let s={r:42,g:123,b:214},r=-1;for(let p=0;p<n.length;p+=4){const c=n[p],u=n[p+1],f=n[p+2];if(n[p+3]<128)continue;const S=Math.max(c,u,f),k=Math.min(c,u,f),h=(S+k)/510,B=S-k,P=B===0?0:B/(1-Math.abs(2*h-1));if(P>.25&&h>.25&&h<.82){const x=P*1.5+(1-Math.abs(h-.5));x>r&&(r=x,s={r:c,g:u,b:f})}}r>0?a(s):a(null)}catch{a(null)}},i.onerror=()=>a(null),i.src=t})}async function qe(t){const a=localStorage.getItem("melo-dynamic-theme")!=="0",i=document.documentElement;if(!a||!t){i.style.removeProperty("--accent"),i.style.removeProperty("--visualizer"),i.style.removeProperty("--accent-glow");return}const e=await pa(t);if(e){const l=`rgb(${e.r}, ${e.g}, ${e.b})`;i.style.setProperty("--accent",l),i.style.setProperty("--visualizer",l),i.style.setProperty("--accent-glow",`rgba(${e.r}, ${e.g}, ${e.b}, 0.35)`)}else i.style.removeProperty("--accent"),i.style.removeProperty("--visualizer"),i.style.removeProperty("--accent-glow")}const Yt=[31,62,125,250,500,1e3,2e3,4e3,8e3,16e3];let Lt=null,se=null,re=[],jt=null,Ut=null;function te(t){if(!Lt){const a=window.AudioContext||window.webkitAudioContext;Lt=new a;try{se=Lt.createMediaElementSource(t)}catch{}if(re=Yt.map(i=>{const e=Lt.createBiquadFilter();return e.type="peaking",e.frequency.value=i,e.Q.value=1.4,e.gain.value=0,e}),jt=Lt.createGain(),jt.gain.value=1,Ut=Lt.createAnalyser(),Ut.fftSize=2048,Ut.smoothingTimeConstant=.72,se){let i=se;for(const e of re)i.connect(e),i=e;i.connect(jt),jt.connect(Ut),Ut.connect(Lt.destination)}}return{ctx:Lt,filters:re,gain:jt,analyser:Ut,async resume(){Lt&&Lt.state==="suspended"&&await Lt.resume().catch(()=>{})}}}let Tt=null;function et(t,a){const i=document.getElementById(t);return i||document.querySelector(`[data-melo="${a}"]`)}function ma(t){const a=r=>{const p=t.match(new RegExp(r+`\\s*=\\s*["']?(\\d+)`));return p?parseInt(p[1],10):null},i=a("data-window-width"),e=a("data-window-height");if(!i||!e)return null;const l=a("data-min-width"),n=a("data-min-height"),s=!/data-resizable\s*=\s*["\']?false/i.test(t);return{width:i,height:e,minWidth:l!=null?l:void 0,minHeight:n!=null?n:void 0,resizable:s}}function fa(){try{const t=JSON.parse(localStorage.getItem("melo-skin-geometry")||"null");if(t&&Number.isFinite(t.width)&&Number.isFinite(t.height))return t}catch{}return null}const Vt=`<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Melo Skin - Minimal Compact (Light/Dark)</title>
<style>
  /* Theme tokens — dark is the default, light overrides via [data-theme] */
  :root {
    --card: #151b23;
    --card-border: rgba(255, 255, 255, 0.1);
    --text: #f3f4f6;
    --text-soft: #9ca3af;
    --text-muted: #6b7280;
    --accent: #4db6ac;
    --track-bg: #212833;
    --shadow: 0 16px 36px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3);
    --accent-soft: rgba(77, 182, 172, 0.2);
    --cover-bg: #0d1117;
    --cover-border: #30363d;
    --cover-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
    --fallback-grad: linear-gradient(135deg, #1e293b, #0f766e);
    --fallback-fg: #5eead4;
    --thumb-shadow: 0 0 8px rgba(77, 182, 172, 0.4);
    --transport-fg: #9ca3af;
  }
  :root[data-theme="light"] {
    --card: #ffffff;
    --card-border: rgba(0, 0, 0, 0.08);
    --text: #111827;
    --text-soft: #6b7280;
    --text-muted: #9ca3af;
    --accent: #5b92a5;
    --track-bg: #e5e7eb;
    --shadow: 0 12px 32px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04);
    --accent-soft: rgba(91, 146, 165, 0.15);
    --cover-bg: #e2e8f0;
    --cover-border: #ffffff;
    --cover-shadow: 0 4px 12px rgba(0, 0, 0, 0.10);
    --fallback-grad: linear-gradient(135deg, #a5b4fc, #67e8f9);
    --fallback-fg: #ffffff;
    --thumb-shadow: 0 1px 4px rgba(0, 0, 0, 0.18);
    --transport-fg: #4b5563;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: transparent;
    color: var(--text);
    overflow: hidden;
    height: 100vh;
    display: flex;
    align-items: stretch;
  }
  .player-card {
    background: var(--card) !important;
    border: none !important;
    border-radius: 24px !important;
    box-shadow: none !important;
    clip-path: inset(0 round 24px) !important;
    padding: 10px 18px 12px 18px !important;
    width: 100% !important;
    height: 100% !important;
    min-height: 135px !important;
    max-height: 145px !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    position: relative !important;
    box-sizing: border-box !important;
  }

  /* Top Bar */
  .player-titlebar {
    position: relative !important;
    height: 24px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    margin-bottom: 2px !important;
    -webkit-app-region: drag !important;
    user-select: none !important;
  }

  /* Top-Left: Brand + Action Buttons in ordered compact row */
  .titlebar-left {
    display: flex !important;
    align-items: center !important;
    gap: 4px !important;
    -webkit-app-region: no-drag !important;
  }
  .app-name-btn {
    display: flex; align-items: center; gap: 5px;
    font-size: 11.5px; font-weight: 700; color: var(--text);
    background: transparent; border: none; padding: 2px 6px;
    border-radius: 6px; cursor: default; letter-spacing: 0.02em;
    pointer-events: none; user-select: none;
  }

  .mini-btn {
    width: 22px; height: 22px; border-radius: 5px; border: none;
    background: transparent; color: var(--text-soft); display: grid;
    place-items: center; cursor: pointer; font-size: 11px;
    transition: all 0.15s; padding: 0;
  }
  .mini-btn:hover { background: var(--track-bg); color: var(--text); }
  .mini-btn.active { color: var(--accent); background: var(--accent-soft); font-weight: bold; }
  .mini-sep { width: 1px; height: 12px; background: var(--card-border); margin: 0 2px; }

  /* Top-Right: Window Controls (NO MAXIMIZE) */
  .win-controls {
    display: flex !important;
    gap: 2px !important;
    -webkit-app-region: no-drag !important;
  }
  .win-btn {
    width: 24px !important; height: 20px !important; border-radius: 4px !important;
    border: none !important; background: transparent !important; color: var(--text-soft) !important;
    display: grid !important; place-items: center !important; cursor: pointer !important;
    font-size: 11px !important; transition: all 0.15s !important;
  }
  .win-btn:hover { background: var(--track-bg) !important; color: var(--text) !important; }
  .win-btn.close:hover { background: #ef4444 !important; color: white !important; }

  /* Main Streamlined Player Row */
  .player-main {
    display: flex !important;
    align-items: center !important;
    gap: 14px !important;
    flex: 1 !important;
    margin-top: 0 !important;
    min-height: 0 !important;
  }

  /* Circular Album Art */
  .cover-col {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-shrink: 0 !important;
  }
  .cover-wrap {
    width: 78px !important;
    height: 78px !important;
    border-radius: 50% !important;
    overflow: hidden !important;
    background: var(--cover-bg) !important;
    box-shadow: var(--cover-shadow) !important;
    flex-shrink: 0 !important;
    border: 2px solid var(--cover-border) !important;
  }
  .cover-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .cover-fallback { width: 100%; height: 100%; display: grid; place-items: center; background: var(--fallback-grad); color: var(--fallback-fg); font-size: 24px; }

  /* Track Title & Artist */
  .track-info {
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    width: 180px !important;
    min-width: 180px !important;
    max-width: 180px !important;
    flex: 0 0 180px !important;
  }
  .track-title {
    font-size: 17.5px !important;
    font-weight: 700 !important;
    color: var(--text) !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    line-height: 1.25 !important;
  }
  .track-artist {
    font-size: 13px !important;
    color: var(--text-soft) !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    margin-top: 3px !important;
  }
  .track-album, .track-format { display: none !important; }

  /* Center Sleek Seeker */
  .seek-center {
    flex: 1 !important;
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
    padding: 0 4px !important;
    min-width: 120px !important;
  }
  .time-label {
    font-size: 11px !important;
    color: var(--text-muted) !important;
    font-variant-numeric: tabular-nums !important;
    min-width: 28px !important;
  }
  .time-label.cur { text-align: right !important; }
  .time-label.dur { text-align: left !important; }

  .seek-row { flex: 1 !important; display: flex !important; align-items: center !important; }
  input[type="range"].seek {
    -webkit-appearance: none !important;
    appearance: none !important;
    width: 100% !important;
    height: 5px !important;
    border-radius: 999px !important;
    background: linear-gradient(to right, var(--accent, #4db6ac) 0%, var(--accent, #4db6ac) var(--progress, 35%), var(--track-bg) var(--progress, 35%), var(--track-bg) 100%) !important;
    outline: none !important;
    cursor: pointer !important;
  }
  input[type="range"].seek::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    width: 15px !important;
    height: 15px !important;
    border-radius: 50% !important;
    background: #ffffff !important;
    /* Border (and glow) follow the Dynamic Album Artwork accent color when
       it is active; otherwise they fall back to the theme's static values. */
    border: 3.5px solid var(--accent, #4db6ac) !important;
    box-shadow: 0 0 8px var(--accent-glow, var(--thumb-shadow)) !important;
    cursor: pointer !important;
    transition: transform 0.1s !important;
  }
  input[type="range"].seek::-webkit-slider-thumb:hover { transform: scale(1.2) !important; }

  /* Right Transport Controls */
  .transport {
    display: flex !important;
    align-items: center !important;
    gap: 6px !important;
    flex-shrink: 0 !important;
    padding-right: 2px !important;
  }
  .transport button, .transport .icon-btn, .transport .play-btn {
    border: none !important;
    background: transparent !important;
    color: var(--transport-fg) !important;
    cursor: pointer !important;
    display: grid !important;
    place-items: center !important;
    width: 28px !important;
    height: 28px !important;
    padding: 3px !important;
    border-radius: 6px !important;
    transition: all 0.15s !important;
  }
  .transport button:hover, .transport .play-btn:hover {
    color: var(--text) !important;
    background: var(--track-bg) !important;
    transform: scale(1.08) !important;
  }
  .transport button.active {
    color: var(--accent) !important;
    background: var(--accent-soft) !important;
  }
  .transport button svg, .transport .icon-btn svg { width: 16px !important; height: 16px !important; }
  .transport .play-btn { width: 32px !important; height: 32px !important; }
  .transport .play-btn svg { width: 20px !important; height: 20px !important; }

  /* Hidden audio support elements (kept for JS event listeners) */
  .hidden-helper { display: none !important; }
</style>
</head>
<body>
<div id="lumi-player">
  <div class="player-titlebar" data-tauri-drag-region>
    <!-- Top-Left: App name + Add files + Add folder + Theme toggle + Windows buttons -->
    <div class="titlebar-left">
      <button class="app-name-btn" id="appMenuBtn">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M2 12h2l1-7 2 14 3-10 2 6h2l2-9 2 14 2-7h2"/></svg>
        Melo
      </button>
      <div class="mini-sep"></div>
      <button class="mini-btn" id="btnAddFiles" title="Add files (Ctrl+O)">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 12v6"/><path d="M9 15h6"/></svg>
      </button>
      <button class="mini-btn" id="btnAddFolder" title="Add folder (Ctrl+Shift+O)">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><path d="M12 10v6"/><path d="M9 13h6"/></svg>
      </button>
      <button class="mini-btn" id="btnThemeToggle" title="Toggle Light / Dark Theme">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M6.34 17.66l-1.41 1.41"/><path d="M19.07 4.93l-1.41 1.41"/></svg>
      </button>
      <div class="mini-sep"></div>
      <button class="mini-btn" id="btnToggleLibrary" title="Library">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/></svg>
      </button>
      <button class="mini-btn" id="btnTogglePlaylist" title="Playlist">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15V6"/><path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/><path d="M12 12H3"/><path d="M16 6H3"/><path d="M12 18H3"/></svg>
      </button>
      <button class="mini-btn" id="btnToggleEq" title="Equalizer">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 14h3v7H3zM9 10h3v11H9zM15 6h3v15h-3z"/></svg>
      </button>
      <button class="mini-btn" id="btnToggleLyrics" title="Lyric">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      </button>
      <button class="mini-btn" id="btnOpenSettings" title="Settings">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
      </button>
      <div class="mini-sep"></div>
      <button class="mini-btn" id="btnShuffle" title="Shuffle (S)">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5"/><path d="M4 20l8-8"/><path d="M21 3l-8 8"/><path d="M16 21h5v-5"/><path d="M4 4l5 5"/><path d="M9 15l-5 5"/></svg>
      </button>
      <button class="mini-btn" id="btnRepeat" title="Repeat (R)">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
      </button>
    </div>

    <!-- Top-Right: Window Controls (NO MAXIMIZE) -->
    <div class="win-controls">
      <button class="win-btn" aria-label="minimize" title="Minimize">—</button>
      <button class="win-btn close" aria-label="close" title="Close">×</button>
    </div>
  </div>

  <!-- Main Streamlined Content Row -->
  <div class="player-main">
    <div class="cover-col">
      <div class="cover-wrap" id="coverWrap">
        <img id="coverImg" style="display:none" alt="cover"/>
        <div id="coverFallback" class="cover-fallback">♪</div>
      </div>
    </div>

    <div class="track-info">
      <div class="track-title" id="trackTitle">Morning Sun</div>
      <div class="track-artist" id="trackArtist">Serenity Now</div>
      <div id="trackAlbum" class="hidden-helper"></div>
      <div id="trackCodec" class="hidden-helper"></div>
      <div id="trackSpecs" class="hidden-helper"></div>
    </div>

    <div class="seek-center">
      <span class="time-label cur" id="curTime">0:00</span>
      <div class="seek-row">
        <input id="seekBar" type="range" class="seek" min="0" max="276" value="130"/>
      </div>
      <span class="time-label dur" id="durTime">4:36</span>
    </div>

    <div class="transport">
      <button class="icon-btn" id="btnPrev" title="Previous">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>
      </button>
      <button class="play-btn" id="btnPlay" title="Play / Pause (Space)">
        <svg id="iconPause" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        <svg id="iconPlay" viewBox="0 0 24 24" fill="currentColor" style="display:none"><path d="M8 5v14l11-7z"/></svg>
      </button>
      <button class="icon-btn" id="btnStop" title="Stop">
        <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>
      </button>
      <button class="icon-btn" id="btnNext" title="Next">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="m6 18 8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
      </button>
    </div>
  </div>

  <!-- Hidden volume & visualizer placeholders for player bindings -->
  <div class="hidden-helper">
    <input id="volBar" type="range" min="0" max="100" value="60"/>
    <span id="volIcon">🔊</span>
    <span id="volPct">60%</span>
    <div id="vizBars"></div>
  </div>
</div>
</body>
</html>
`,ee={"compact-pill.html":Vt,"compact-pill":Vt,"compact-pill-light.html":Vt,"compact-pill-dark.html":Vt,"compact-pill-light":Vt,"compact-pill-dark":Vt},ga=[{id:"compact-pill",name:"Minimal Compact (Light/Dark)",filename:"compact-pill.html"},{id:"full-html-example",name:"Full HTML Example",filename:"full-html-example.html"}];function $e(t){const a=["trackTitle","btnPlay","seekBar","coverImg"];let i=0;for(const l of a)t.includes(l)&&i++;const e=(t.match(/data-melo\s*=/g)||[]).length;return i+=Math.min(e,3),i>=3}function Ot(t,a){const i=document.getElementById("playerCard");if(!i)return;const e=i._originalHTML||i.innerHTML;i._originalHTML||(i._originalHTML=e),Tt&&(Tt.remove(),Tt=null);let n=[...t.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(f=>f[1]).join(`
`);n&&(Tt=document.createElement("style"),Tt.id="melo-custom-skin",Tt.textContent=n,document.head.appendChild(Tt));const s=$e(t);let r="";const p=t.match(/<body[^>]*>([\s\S]*?)<\/body>/i);p?r=p[1]:r=t.split(/<\/style>/i).pop()||"";const c=document.createElement("div");c.innerHTML=r;const u=c.querySelector("#lumi-player");if(u&&(r=u.innerHTML),s&&r.trim().length>20){const f=r.trim();i.innerHTML=f,a&&a("Skin applied"),setTimeout(()=>{var S,k;(S=window.__LUMI_REBIND__)==null||S.call(window);const y=window.__LUMI_AUDIO__;y&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(y),(k=window.__LUMI_REBIND_MAIN__)==null||k.call(window)},40)}else n&&a&&a("Skin CSS applied");if(s){const f=ma(t);f?(localStorage.setItem("melo-skin-geometry",JSON.stringify(f)),D("melo:skin-geometry",f)):localStorage.removeItem("melo-skin-geometry")}localStorage.setItem("lumi-custom-skin",t),localStorage.setItem("lumi-custom-skin-isFull",s?"1":"0")}function ue(t,a=!0){document.documentElement.classList.remove("compact-skin-active"),document.body.classList.remove("compact-skin-active"),document.documentElement.classList.remove("custom-skin-active"),document.body.classList.remove("custom-skin-active"),Tt&&(Tt.remove(),Tt=null);const i=document.getElementById("playerCard");i&&i._originalHTML&&(i.innerHTML=i._originalHTML,setTimeout(()=>{var l,n;(l=window.__LUMI_REBIND__)==null||l.call(window);const e=window.__LUMI_AUDIO__;e&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(e),(n=window.__LUMI_REBIND_MAIN__)==null||n.call(window)},40)),localStorage.removeItem("lumi-custom-skin"),localStorage.removeItem("lumi-custom-skin-isFull"),localStorage.removeItem("melo-skin-geometry"),localStorage.setItem("melo-active-skin-id","default"),a&&D("melo:skin-changed","default"),t&&t("Switched to Default Melo skin")}async function Oe(){if(nt)try{const{invoke:t}=await Y(async()=>{const{invoke:i}=await import("./core-DhEqZVGG.js");return{invoke:i}},[]),a=await t("list_installed_skins");if(Array.isArray(a)&&a.length>0)return a}catch{}return ga}async function ha(t,a){if(nt)try{const{invoke:e}=await Y(async()=>{const{invoke:n}=await import("./core-DhEqZVGG.js");return{invoke:n}},[]),l=await e("read_skin_file",{filenameOrPath:t});if(l&&l.trim().length>0)return Ot(l,a),!0}catch{}try{const e=t.startsWith("skins/")?t:`skins/${t}`,l=await fetch(e);if(l.ok){const n=await l.text();return Ot(n,a),!0}}catch{}const i=t.replace(/^.*[\\/]/,"");return ee[i]?(Ot(ee[i],a),!0):(a&&a(`Could not load skin: ${t}`),!1)}async function $t(t,a,i,e=!0){if(t==="default"){ue(i,e);return}let l=t;const n=t==="compact-pill"||t.startsWith("compact-pill"),s=!n;document.documentElement.classList.toggle("compact-skin-active",n),document.body.classList.toggle("compact-skin-active",n),document.documentElement.classList.toggle("custom-skin-active",s),document.body.classList.toggle("custom-skin-active",s),n?l="compact-pill.html":!l.endsWith(".html")&&!l.endsWith(".htm")&&(l=l+".html");let r=!1;n&&ee[l]?(Ot(ee[l],i),r=!0):r=await ha(l,i),r&&(localStorage.setItem("melo-active-skin-id",t),e&&D("melo:skin-changed",t))}async function De(t){if(nt)try{const{invoke:a}=await Y(async()=>{const{invoke:i}=await import("./core-DhEqZVGG.js");return{invoke:i}},[]);await a("open_skins_folder"),t&&t("Opening skins folder...")}catch{t&&t("Could not open skins folder")}else t&&t("Skins are located in the skins/ folder")}function Se(t){const a=document.getElementById("skinUpload"),i=localStorage.getItem("melo-active-skin-id")||"default",e=localStorage.getItem("lumi-theme")||"dark";i!=="default"&&setTimeout(()=>{$t(i,e,void 0,!1)},150),at("melo:theme",l=>{const n=localStorage.getItem("melo-active-skin-id");n&&n!=="default"&&$t(n,l,void 0,!1)}),at("melo:skin-changed",l=>{if(l&&typeof l=="string"){const n=localStorage.getItem("lumi-theme")||"dark";$t(l,n,void 0,!1)}}),a&&a.addEventListener("change",async()=>{var r;const l=(r=a.files)==null?void 0:r[0];if(!l)return;const n=await l.text(),s=l.name;if(nt)try{const{invoke:p}=await Y(async()=>{const{invoke:c}=await import("./core-DhEqZVGG.js");return{invoke:c}},[]);await p("save_custom_skin_file",{filename:s,content:n}),t(`Saved ${s} to skins folder`)}catch{}Ot(n,t),localStorage.setItem("melo-active-skin-id",s),D("melo:skin-changed",s),a.value=""}),document.addEventListener("dragover",l=>{var n;[...((n=l.dataTransfer)==null?void 0:n.types)||[]].includes("Files")&&l.preventDefault()}),document.addEventListener("drop",async l=>{var s;const n=[...((s=l.dataTransfer)==null?void 0:s.files)||[]].find(r=>r.name.endsWith(".html")||r.name.endsWith(".htm"));if(n){l.preventDefault();const r=await n.text();if(r.includes("<style")||r.includes("<html")||$e(r)){const p=n.name;if(nt)try{const{invoke:c}=await Y(async()=>{const{invoke:u}=await import("./core-DhEqZVGG.js");return{invoke:u}},[]);await c("save_custom_skin_file",{filename:p,content:r})}catch{}Ot(r,t),localStorage.setItem("melo-active-skin-id",p),D("melo:skin-changed",p)}}}),window.LumiSkin={applyCustomSkin:Ot,resetSkin:ue,applySkinChoice:$t,listInstalledSkins:Oe,openSkinsFolderOnDisk:De}}function va(t,a){let i,e,l,n,s,r,p,c=null,u,f,y,S,k,h,B,P,x,it,lt,L,m,v=[],E=0,J=!1,Z="off",mt=!1;function K(){if(!v.length)return null;if(Z==="one")return E;let o=E+1;if(J&&(o=Math.floor(Math.random()*v.length),o===E&&v.length>1&&(o=(o+1)%v.length)),o>=v.length)if(Z==="all")o=0;else return null;return o}window.__LUMI_QUEUE__=v,window.__LUMI_SET_QUEUE__=o=>{v=o,window.__LUMI_QUEUE__=o};function V(o){if(!isFinite(o))return"0:00";const M=Math.floor(o/60),W=Math.floor(o%60).toString().padStart(2,"0");return`${M}:${W}`}function j(){if(!u)return;const o=parseFloat(u.max)||100,M=parseFloat(u.value)||0,W=o>0?M/o*100:0;u.style.setProperty("--progress",W+"%")}function pt(){f&&f.style.setProperty("--vol",f.value+"%")}function wt(){h&&(h.classList.toggle("muted",t.muted),h.title=t.muted?"Unmute":"Mute")}function xt(o=!0){t.muted=!t.muted,wt(),o&&a(t.muted?"Muted":"Unmuted")}async function St(o){if(!o)return"";if(/^(https?|data|blob):/.test(o))return o;if(nt)try{const{convertFileSrc:M}=await Y(async()=>{const{convertFileSrc:W}=await import("./core-DhEqZVGG.js");return{convertFileSrc:W}},[]);return M(o)}catch{}return o}async function kt(o,M=!0,W){if(!v.length)return;o<0&&(o=v.length-1),o>=v.length&&(o=0),E=o;const H=v[o];if(H){if(B||G(),t.src=await St(H.path),t.load(),W&&W>0){const X=()=>{t.removeEventListener("loadedmetadata",X);try{t.currentTime=W}catch{}};t.addEventListener("loadedmetadata",X)}B&&(B.textContent=H.title||"Unknown Title"),P&&(P.textContent=H.artist||"Unknown Artist"),x&&(x.textContent=H.album||""),it&&(it.textContent=H.codec||"AUDIO"),lt&&(lt.textContent=H.specs||""),H.cover&&L?(L.src=H.cover,L.style.display="block",m&&(m.style.display="none")):(L&&(L.style.display="none"),m&&(m.style.display="grid")),u&&(u.max=String(H.duration||240),u.value="0",j()),S&&(S.textContent=V(H.duration)),y&&(y.textContent="0:00"),C(),qe(H.cover||null),document.querySelectorAll(".track-row").forEach((X,ht)=>{var Pt;X.classList.toggle("active",((Pt=v[ht])==null?void 0:Pt.id)===H.id)}),"mediaSession"in navigator&&(navigator.mediaSession.metadata=new MediaMetadata({title:H.title,artist:H.artist,album:H.album,artwork:H.cover?[{src:H.cover,sizes:"512x512",type:"image/jpeg"}]:[]}),navigator.mediaSession.setActionHandler("play",()=>g()),navigator.mediaSession.setActionHandler("pause",()=>b()),navigator.mediaSession.setActionHandler("previoustrack",()=>O()),navigator.mediaSession.setActionHandler("nexttrack",()=>T()),navigator.mediaSession.setActionHandler("seekto",X=>{X.seekTime&&(t.currentTime=X.seekTime)})),M&&g();try{const{cover:X,...ht}=H;localStorage.setItem("melo-current-track",JSON.stringify(ht))}catch{}window.dispatchEvent(new CustomEvent("lumi:trackChange",{detail:H})),D("melo:track-changed",H),D("melo:playback-state",{track:H,currentTime:t.currentTime||0,paused:t.paused})}}let _t=!1;async function zt(){try{await te(t).resume()}catch{}_t&&(_t=!1,t.play().then(()=>{e&&(e.style.display="none"),l&&(l.style.display="block")}).catch(()=>{}))}window.addEventListener("pointerdown",zt),window.addEventListener("keydown",zt),at("melo:pref-changed",o=>{o&&o.key==="replayGainGlobal"&&C(),o&&o.key==="showStopBtn"&&R(!!o.value)}),at("melo:request-playback-state",()=>{const o=v[E]||null;D("melo:playback-state",{track:o,currentTime:t.currentTime||0,paused:t.paused})}),at("melo:seek-playback",o=>{const M=Number(o);Number.isFinite(M)&&M>=0&&(t.currentTime=M)});let rt=null,ft=!1;const It=500;function ct(o,M,W){rt&&cancelAnimationFrame(rt);const H=t.volume,X=performance.now(),ht=Pt=>{const Ht=Math.min(1,(Pt-X)/M);t.volume=H+(o-H)*Ht,Ht<1?rt=requestAnimationFrame(ht):(rt=null,W==null||W())};rt=requestAnimationFrame(ht)}async function g(){try{await te(t).resume()}catch{}const o=localStorage.getItem("melo-pref-fadePause")!=="0",M=$();o&&ft&&(t.volume=0),t.play().then(()=>{_t=!1,e&&(e.style.display="none"),l&&(l.style.display="block"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="playing"),o&&ft?(ft=!1,ct(M,It)):t.volume=M}).catch(()=>{_t||(_t=!0,a("Click once inside player to begin audio playback"))})}function b(){localStorage.getItem("melo-pref-fadePause")!=="0"&&!t.paused?(ft=!0,ct(0,It,()=>t.pause())):(ft=!1,t.pause()),e&&(e.style.display="block"),l&&(l.style.display="none"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused");const M=v[E];if(M)try{localStorage.setItem("melo-resume-state",JSON.stringify({trackId:M.id,position:t.currentTime}))}catch{}}function _(){t.paused?g():b()}function I(){t.pause();try{t.currentTime=0}catch{}e&&(e.style.display="block"),l&&(l.style.display="none"),u&&(u.value="0",j()),y&&(y.textContent="0:00"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}function T(){if(!v.length)return;if(Z==="one"){t.currentTime=0,g();return}const o=K();if(o===null){b();return}kt(o)}function O(){if(!v.length)return;if(t.currentTime>3){t.currentTime=0;return}let o=E-1;J&&(o=Math.floor(Math.random()*v.length)),o<0&&(Z==="all"?o=v.length-1:o=0),kt(o)}function $(){var ht;const o=v[E];if(!f)return 1;const M=parseInt(f.value,10)/100,H=localStorage.getItem("melo-pref-replayGainGlobal")!=="0"&&(ht=o==null?void 0:o.replayGain)!=null?ht:0,X=Math.pow(10,H/20);return Math.min(1,Math.max(0,M*X))}function C(){!v[E]||!f||(t.volume=$())}function R(o=localStorage.getItem("melo-pref-showStopBtn")==="1"){const M=et("btnStop","stop");M&&M.style.setProperty("display",o?"inline-flex":"none","important")}function G(){if(i=et("btnPlay","play"),e=et("iconPlay","play-icon"),l=et("iconPause","pause-icon"),n=et("btnPrev","prev"),s=et("btnNext","next"),r=et("btnShuffle","shuffle"),p=et("btnRepeat","repeat"),c=et("btnStop","stop"),R(),u=et("seekBar","seek"),f=et("volBar","volume"),y=et("curTime","current-time"),S=et("durTime","duration"),k=et("volPct","volume-pct"),h=et("volIcon","volume-icon"),h&&(h.onclick=()=>xt()),wt(),B=et("trackTitle","title"),P=et("trackArtist","artist"),x=et("trackAlbum","album"),it=et("trackCodec","codec"),lt=et("trackSpecs","specs"),L=et("coverImg","cover"),m=et("coverFallback","cover-fallback"),i&&(i.onclick=_),c&&(c.onclick=I),n&&(n.onclick=O),s&&(s.onclick=T),r&&(r.onclick=()=>{J=!J,r.classList.toggle("active",J),a(J?"Shuffle on":"Shuffle off")}),p&&(p.onclick=()=>{Z=Z==="off"?"all":Z==="all"?"one":"off",p.classList.toggle("active",Z!=="off");const o={off:"Repeat off",all:"Repeat all",one:"Repeat one"};a(o[Z]),p.title=o[Z]}),u&&(u.oninput=()=>{mt=!0,y&&(y.textContent=V(parseFloat(u.value))),j()},u.onchange=()=>{t.currentTime=parseFloat(u.value),mt=!1}),f&&(f.oninput=()=>{pt(),k&&(k.textContent=f.value+"%"),C()}),j(),pt(),v[E]){const o=v[E];if(B&&(B.textContent=o.title||"Unknown Title"),P&&(P.textContent=o.artist||"Unknown Artist"),x&&(x.textContent=o.album||""),it&&(it.textContent=o.codec||"AUDIO"),lt&&(lt.textContent=o.specs||""),o.cover&&L?(L.src=o.cover,L.style.display="block",m&&(m.style.display="none")):(L&&(L.style.display="none"),m&&(m.style.display="grid")),u){const M=Math.floor(t.duration||o.duration||240);u.max=String(M),u.value=String(Math.floor(t.currentTime||0)),j()}if(S&&(S.textContent=V(t.duration||o.duration)),y&&(y.textContent=V(t.currentTime||0)),f&&k&&(k.textContent=f.value+"%",pt()),e&&l){const M=!t.paused;e.style.display=M?"none":"block",l.style.display=M?"block":"none"}r&&r.classList.toggle("active",J),p&&p.classList.toggle("active",Z!=="off")}}G(),document.addEventListener("wheel",o=>{const M=o.target;if(!(M!=null&&M.closest("#playerCard"))||!f)return;o.preventDefault();const W=o.deltaY<0?5:-5;f.value=String(Math.max(0,Math.min(100,Number(f.value)+W))),f.dispatchEvent(new Event("input"))},{passive:!1}),t.addEventListener("timeupdate",()=>{D("melo:playback-position",t.currentTime||0),!mt&&u&&y&&(u.value=String(Math.floor(t.currentTime)),y.textContent=V(t.currentTime),j()),F()});let A=null;function F(){A||(A=setTimeout(()=>{A=null;const o=v[E];if(!(!o||t.paused))try{localStorage.setItem("melo-resume-state",JSON.stringify({trackId:o.id,position:t.currentTime}))}catch{}},4e3))}t.addEventListener("loadedmetadata",()=>{var M;if(!u||!S)return;const o=Math.floor(t.duration||((M=v[E])==null?void 0:M.duration)||240);u.max=String(o),S.textContent=V(o),j()}),t.addEventListener("ended",()=>{T()}),window.addEventListener("keydown",o=>{o.target.tagName!=="INPUT"&&(o.code==="Space"&&(o.preventDefault(),_()),o.code==="ArrowRight"&&(t.currentTime+=5),o.code==="ArrowLeft"&&(t.currentTime-=5),(o.key==="m"||o.key==="M")&&xt(),(o.key==="s"||o.key==="S")&&r&&r.click(),(o.key==="r"||o.key==="R")&&p&&p.click(),o.code==="ArrowUp"&&f&&(f.value=String(Math.min(100,parseInt(f.value,10)+5)),f.dispatchEvent(new Event("input"))),o.code==="ArrowDown"&&f&&(f.value=String(Math.max(0,parseInt(f.value,10)-5)),f.dispatchEvent(new Event("input"))))}),at("melo:tray-action",o=>{o==="play_pause"?_():o==="next"?T():o==="prev"?O():o==="mute"&&xt()}),window.LumiPlayer={get queue(){return v},set queue(o){v=o,window.__LUMI_QUEUE__=o},get currentIndex(){return E},loadTrack:kt,play:g,pause:b,stop:I,next:T,prev:O,get audio(){return t},rebind:G},window.__LUMI_REBIND__=G,at("melo:play-tracks",o=>{if(!o||!Array.isArray(o.tracks)||!o.tracks.length)return;v=o.tracks,window.__LUMI_SET_QUEUE__(v);const M=Math.max(0,Math.min(o.index||0,v.length-1));kt(M,!0)})}const ce=new URLSearchParams(location.search).get("panel")||"main",Q=t=>String(t!=null?t:"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");function Le(t){const a=Number.isFinite(t)?Math.max(0,t):0;return`${Math.floor(a/60)}:${String(Math.floor(a%60)).padStart(2,"0")}`}function Ee(t,a){const i=document.getElementById("trackList"),e=document.getElementById("libraryStats"),l=document.getElementById("searchInput"),n=document.getElementById("searchClear"),s=document.getElementById("libraryTabs"),r=document.getElementById("btn-scan"),p=document.getElementById("btn-clear-library"),c=document.getElementById("winPlaylistTracks"),u=document.getElementById("winPlaylistEmpty"),f=document.getElementById("playlistSelect"),y=document.getElementById("playlistSearchInput"),S=document.getElementById("playlistSearchClear"),k=document.getElementById("playlistSortSelect"),h=document.getElementById("btn-clear-playlist"),B=document.getElementById("btn-export-playlist"),P=document.getElementById("btn-new-playlist");let x=null,it=null,lt=!1,L=localStorage.getItem("melo-currentPlaylist")||"p1",m=[],v=null,E=null,J=!1,Z=[];const mt=new Map;let K="artists",V=null,j=null,pt=null,wt="",xt=null;const St=54,kt=52;let _t=0,zt=0,rt=0,ft=0,It=null;const ct=document.createElement("div");ct.className="ctx-menu",ct.style.display="none",ct.innerHTML='<button class="ctx-item danger" id="ctxRemoveLibraryTrack">Remove from Library</button>',document.body.appendChild(ct),document.addEventListener("click",d=>{d.target.closest("#ctxRemoveLibraryTrack")||(ct.style.display="none")}),ct.querySelector("#ctxRemoveLibraryTrack").onclick=async d=>{d.stopPropagation(),!(!x||!It)&&(await x("delete_tracks",{ids:[It]}),ct.style.display="none",It=null,D("melo:library-changed",{removed:1}))};function g(){return new Promise(d=>{const w=document.createElement("div");w.className="confirm-overlay",w.innerHTML=`<div class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="clearLibraryTitle">
        <div id="clearLibraryTitle" class="confirm-title">Clear Library?</div>
        <div class="confirm-message">All tracks will be removed from Library browsing. Your playlists and their tracks will remain unchanged.</div>
        <div class="confirm-actions"><button class="btn small" data-confirm="cancel">Cancel</button><button class="btn small danger-confirm" data-confirm="yes">Clear Library</button></div>
      </div>`,document.body.appendChild(w);const q=N=>{document.removeEventListener("keydown",U),w.remove(),d(N)};w.querySelector("[data-confirm='cancel']").onclick=()=>q(!1),w.querySelector("[data-confirm='yes']").onclick=()=>q(!0),w.onclick=N=>{N.target===w&&q(!1)};const U=N=>{N.key==="Escape"&&(document.removeEventListener("keydown",U),q(!1))};document.addEventListener("keydown",U)})}function b(d){const w=r==null?void 0:r.querySelector(".scan-label");w&&(w.textContent=d)}function _(){n==null||n.classList.toggle("show",!!(l!=null&&l.value))}function I(){S==null||S.classList.toggle("show",!!(y!=null&&y.value))}function T(){c==null||c.querySelectorAll("[data-pl-track]").forEach(d=>{d.classList.toggle("active",d.dataset.plTrack===xt)})}function O(d){xt=d,T()}function $(d){if(!d)return"";if(/^(data:|blob:|https?:)/i.test(d))return d;try{return it?it(d):""}catch{return""}}function C(d){return{...d,cover:$(d.cover),source:"scan"}}const R=[],G=new Set;let A=0;function F(d,w){!d||!x||G.has(d)||(G.add(d),R.push({id:d,element:w}),o())}function o(){for(;x&&A<2&&R.length;){const d=R.shift();A++,x("ensure_track_artwork",{id:d.id}).then(w=>{if(!w||!d.element.isConnected)return;const q=$(w),U=Z.find(N=>N.id===d.id);U&&(U.cover=q),d.element.style.backgroundImage=`url("${q.replace(/"/g,"%22")}")`,d.element.textContent=""}).catch(()=>{}).finally(()=>{A--,G.delete(d.id),o()})}}function M(d){const w=[...d.querySelectorAll("[data-artwork-id]")];if(!("IntersectionObserver"in window)){w.forEach(U=>F(U.dataset.artworkId,U));return}const q=new IntersectionObserver(U=>{U.forEach(N=>{if(!N.isIntersecting)return;const z=N.target;q.unobserve(z),F(z.dataset.artworkId,z)})},{root:d,rootMargin:"120px"});w.forEach(U=>q.observe(U))}async function W(){if(lt)return;if(!nt){lt=!0,H();return}const d=await Y(()=>import("./core-DhEqZVGG.js"),[]);x=d.invoke,it=d.convertFileSrc,lt=!0,await Promise.all([X(),Bt()]),await gt(!0),await vt(!0)}function H(){i&&(i.innerHTML='<div style="padding:30px;text-align:center;color:var(--text-muted)">The persistent Library is available in the Tauri desktop build.</div>')}async function X(){if(!(!x||!e))try{const d=await x("library_stats");e.textContent=`${d.tracks} tracks • ${d.artists} artists • ${d.albums} albums`}catch{}}function ht(){V=j=pt=null,i&&(i.scrollTop=0)}function Pt(){return K==="artists"?V?"tracks":"groups":K==="albums"?j?"tracks":"groups":pt?"tracks":"groups"}function Ht(){return K}function Xe(){return K==="artists"&&V?j?`${V} › ${j}`:V:K==="albums"&&j?j:K==="genres"&&pt?pt:""}async function Ze(d,w){if(!x)return{items:[],total:0,limit:w,offset:d};if(Pt()==="groups")return x("library_groups",{kind:Ht(),search:wt||null,artist:K==="artists"?V:null,limit:w,offset:d});const q=await x("library_tracks",{search:wt||null,artist:V,album:j,genre:pt,sort:"title-asc",limit:w,offset:d});return q.items=q.items.map(C),Z=q.items,q}async function Ke(d){const w=mt.get(d);if(w)return w;if(!x)return[];const q=await x("library_groups",{kind:"albums",search:null,artist:d,limit:500,offset:0});return mt.set(d,q.items),q.items}async function gt(d=!1){if(!i||!x)return;d&&(i.scrollTop=0),i.style.display="block",i.style.position="relative",i.style.overflowY="auto";const w=Math.max(300,i.clientHeight||420),q=K==="artists"&&!!V,U=Xe(),N=q?84:U?38:0,z=Math.ceil(w/St),yt=Math.max(0,i.scrollTop-N),tt=Math.max(0,Math.floor(yt/St)-8),dt=Math.max(40,z+16),aa=++_t;try{const ye=q&&V?Ke(V):Promise.resolve(null),[Zt,oe]=await Promise.all([Ze(tt,dt),ye]);if(aa!==_t)return;const ia=Zt.total*St+N,na=Zt.items.map((Rt,Wt)=>{const Ft=Zt.offset+Wt,Kt=N+Ft*St;if(Pt()==="groups"){const Nt=Rt,be=$(Nt.cover),we=`lib-avatar ${Ht()==="albums"?"lib-avatar-album":""}`,oa=Ht()==="albums"?"💿":Q((Nt.name[0]||"?").toUpperCase()),sa=be?`<div class="${we}" style="background-image:url('${Q(be)}')"></div>`:`<div class="${we}" data-artwork-id="${Q(Nt.artworkTrackId||"")}">${oa}</div>`;return`<div class="lib-item virtual-row" data-group-index="${Wt}" style="position:absolute;left:0;right:0;top:${Kt}px;height:${St}px">${sa}<div style="flex:1;min-width:0"><div class="t-title">${Q(Nt.name)}</div><div class="t-artist">${Q(Nt.subtitle||`${Nt.count} tracks`)}</div></div><span class="chev-r">›</span></div>`}const At=Rt;return`<div class="track-row virtual-row" data-track-id="${Q(At.id)}" data-page-index="${Wt}" style="position:absolute;left:0;right:0;top:${Kt}px;height:${St}px">
          <span class="num">${Ft+1}</span>
          ${At.cover?`<div class="track-cover-mini" style="background-image:url('${Q(At.cover)}');background-size:cover;background-position:center"></div>`:`<div class="track-cover-mini cover-default" data-artwork-id="${Q(At.id)}">♪</div>`}
          <div style="flex:1;min-width:0"><div class="t-title">${Q(At.title)}</div><div class="t-artist">${Q(At.artist)} • ${Q(At.album)}</div></div>
          <span class="t-dur">${Le(At.duration)}</span>
          <button class="btn small ghost" data-add-track="${Q(At.id)}" title="Add to current playlist">+</button>
        </div>`}).join(""),la=q&&oe?`<div class="artist-detail-header" style="position:sticky;top:0;height:${N}px;z-index:4;background:var(--card)">
            <div class="lib-crumb" style="height:38px"><button class="btn small" id="virtualBack">‹ Artists</button><b>${Q(V)}</b></div>
            <div class="chip-row artist-album-chips custom-scrollbar" style="height:46px;padding-top:6px;padding-bottom:6px">
              <button class="chip ${j===null?"active":""}" data-artist-album="all">All Tracks</button>
              ${oe.map((Rt,Wt)=>{const Ft=$(Rt.cover),Kt=Ft?`<span class="chip-thumb" style="background-image:url('${Q(Ft)}')"></span>`:`<span class="chip-thumb cover-default" data-artwork-id="${Q(Rt.artworkTrackId||"")}">♪</span>`;return`<button class="chip ${j===Rt.name?"active":""}" data-artist-album-index="${Wt}">${Kt}${Q(Rt.name)}</button>`}).join("")}
            </div>
          </div>`:U?`<div class="lib-crumb virtual-crumb" style="position:sticky;top:0;height:${N}px;z-index:3;background:var(--card)"><button class="btn small" id="virtualBack">‹ Back</button><b>${Q(U)}</b></div>`:"";i.innerHTML=`<div class="virtual-list-space" style="position:relative;height:${Math.max(ia,w)}px">${la}${na}</div>`,Qe(Zt.items,oe||[]),M(i)}catch{i.innerHTML='<div style="padding:24px;text-align:center;color:var(--text-muted)">Could not read the Library database.</div>'}}function Qe(d,w=[]){var q,U;i&&(i.querySelectorAll("[data-group-index]").forEach(N=>{N.onclick=()=>{const z=d[Number(N.dataset.groupIndex||0)],yt=(z==null?void 0:z.name)||"",tt=(z==null?void 0:z.key)||yt;if(K==="artists"&&!V)V=yt;else if(K==="artists"&&V||K==="albums"){const dt=tt.split("\0");K==="albums"&&(V=dt[0]||null),j=dt[1]||yt}else K==="genres"&&(pt=yt);gt(!0)}}),i.querySelectorAll("[data-add-track]").forEach(N=>{N.onclick=async z=>{z.stopPropagation(),!(!x||!N.dataset.addTrack)&&(await x("add_tracks_to_playlist",{playlistId:L,trackIds:[N.dataset.addTrack]}),D("melo:playlist-changed",{playlistId:L}))}}),i.querySelectorAll("[data-track-id]").forEach(N=>{N.onclick=async z=>{if(z.target.closest("[data-add-track]"))return;const yt=Number(N.dataset.pageIndex||0),tt=d.filter(dt=>"path"in dt).map(C);x&&tt.length&&(await x("replace_playlist_tracks",{playlistId:L,trackIds:tt.map(dt=>dt.id)}),D("melo:playlist-changed",{playlistId:L})),D("melo:play-tracks",{tracks:tt,index:yt})},N.oncontextmenu=z=>{z.preventDefault(),z.stopPropagation(),It=N.dataset.trackId||null,ct.style.display="block";const yt=ct.getBoundingClientRect();ct.style.left=`${Math.max(6,Math.min(z.clientX,window.innerWidth-yt.width-6))}px`,ct.style.top=`${Math.max(6,Math.min(z.clientY,window.innerHeight-yt.height-6))}px`}}),(q=i.querySelector("#virtualBack"))==null||q.addEventListener("click",()=>{K==="artists"&&V?(V=null,j=null):j?j=null:V?V=null:pt=null,gt(!0)}),(U=i.querySelector("[data-artist-album='all']"))==null||U.addEventListener("click",()=>{j=null,gt(!0)}),i.querySelectorAll("[data-artist-album-index]").forEach(N=>{N.onclick=()=>{const z=w[Number(N.dataset.artistAlbumIndex||0)];j=(z==null?void 0:z.name)||null,gt(!0)}}))}async function Bt(){var d;x&&(m=await x("list_playlists"),m.some(w=>w.id===L)||(L=((d=m[0])==null?void 0:d.id)||"p1"),localStorage.setItem("melo-currentPlaylist",L),f&&(f.innerHTML=m.map(w=>`<option value="${Q(w.id)}" ${w.id===L?"selected":""}>${Q(w.name)} (${w.trackCount})</option>`).join("")))}async function vt(d=!1){if(!c||!x)return;d&&(c.scrollTop=0),c.style.display="block",c.style.position="relative",c.style.overflowY="auto";const w=Math.max(260,c.clientHeight||420),q=Math.max(0,Math.floor(c.scrollTop/kt)-8),U=Math.max(40,Math.ceil(w/kt)+16),N=++zt,z=await x("playlist_tracks",{playlistId:L,search:(y==null?void 0:y.value)||null,sort:(k==null?void 0:k.value)||"default",limit:U,offset:q});if(N!==zt)return;if(z.items=z.items.map(C),Z=z.items,u&&(u.style.display=z.total?"none":"block"),c.style.display=z.total?"block":"none",!z.total){c.innerHTML="";return}const yt=z.items.map((tt,dt)=>`<div class="track-row virtual-row ${tt.id===xt?"active":""}" data-pl-track="${Q(tt.id)}" data-page-index="${dt}" style="position:absolute;left:0;right:0;top:${(z.offset+dt)*kt}px;height:${kt}px"><span class="num">${z.offset+dt+1}</span>${tt.cover?`<div class="track-cover-mini" style="background-image:url('${Q(tt.cover)}');background-size:cover;background-position:center"></div>`:`<div class="track-cover-mini cover-default" data-artwork-id="${Q(tt.id)}">♪</div>`}<div style="flex:1;min-width:0"><div class="t-title">${Q(tt.title)}</div><div class="t-artist">${Q(tt.artist)} • ${Q(tt.album)}</div></div><span class="t-dur">${Le(tt.duration)}</span><button class="btn small ghost" data-remove-track="${Q(tt.id)}">×</button></div>`).join("");c.innerHTML=`<div style="position:relative;height:${Math.max(w,z.total*kt)}px">${yt}</div>`,M(c),c.querySelectorAll("[data-pl-track]").forEach(tt=>{tt.onclick=dt=>{dt.target.closest("[data-remove-track]")||D("melo:play-tracks",{tracks:z.items,index:Number(tt.dataset.pageIndex||0)})}}),c.querySelectorAll("[data-remove-track]").forEach(tt=>{tt.onclick=async dt=>{dt.stopPropagation(),await x("remove_track_from_playlist",{playlistId:L,trackId:tt.dataset.removeTrack}),D("melo:playlist-changed",{playlistId:L})}})}async function ge(d,w){return x?x(d,w):null}async function he(d,w="replace"){if(await W(),!x||!d.length)return[];const U=(await x("import_audio_files",{paths:d,playlistId:w==="none"?null:L,replacePlaylist:w==="replace"})).map(C);return await Promise.all([X(),Bt(),gt(),vt()]),D("melo:library-changed",{imported:U.length}),U}async function le(d,w=!1){if(await W(),!x)return null;if(v)return v;const q=await x("start_library_scan",{path:d});return v=q.scanId,E=q.scanId,J=w,r&&b("Cancel Scan"),v}async function ta(){if(!nt)return;if(v&&x){await x("cancel_library_scan",{scanId:v});return}const{open:d}=await Y(async()=>{const{open:q}=await import("./index-CS3Qnt9j.js");return{open:q}},__vite__mapDeps([5,1])),w=await d({directory:!0,multiple:!1});w&&await le(w)}async function ea(d){if(await W(),!x)return null;const w=await x("get_track_by_id",{id:d});return w?C(w):null}s==null||s.querySelectorAll("[data-libtab]").forEach(d=>{d.onclick=()=>{s.querySelectorAll("[data-libtab]").forEach(w=>w.classList.remove("active")),d.classList.add("active"),K=d.dataset.libtab||"artists",ht(),gt(!0)}}),l==null||l.addEventListener("input",()=>{_(),wt=l.value.trim(),window.clearTimeout(rt),rt=window.setTimeout(()=>gt(!0),180)}),n==null||n.addEventListener("click",()=>{l&&(l.value="",l.focus(),_(),wt="",window.clearTimeout(rt),gt(!0))}),i==null||i.addEventListener("scroll",()=>{window.clearTimeout(rt),rt=window.setTimeout(()=>gt(),60)}),c==null||c.addEventListener("scroll",()=>{window.clearTimeout(ft),ft=window.setTimeout(()=>vt(),60)}),y==null||y.addEventListener("input",()=>{I(),window.clearTimeout(ft),ft=window.setTimeout(()=>vt(!0),180)}),S==null||S.addEventListener("click",()=>{y&&(y.value="",y.focus(),I(),window.clearTimeout(ft),vt(!0))}),k==null||k.addEventListener("change",()=>vt(!0)),f==null||f.addEventListener("change",()=>{L=f.value,localStorage.setItem("melo-currentPlaylist",L),vt(!0)}),r==null||r.addEventListener("click",ta),p==null||p.addEventListener("click",async()=>{if(x){if(v){alert("Cancel the active scan before clearing the Library database.");return}await g()&&(await x("clear_library_database"),Z=[],mt.clear(),await Promise.all([X(),Bt(),gt(!0),vt(!0)]),D("melo:library-changed",{cleared:!0}))}}),h==null||h.addEventListener("click",async()=>{await ge("clear_playlist",{playlistId:L}),await Promise.all([Bt(),vt(!0)]),D("melo:playlist-changed",{playlistId:L})}),P==null||P.addEventListener("click",async()=>{var q;const d=(q=prompt("New playlist name:"))==null?void 0:q.trim();if(!d)return;const w=await ge("create_playlist",{name:d});w&&(L=w.id),await Promise.all([Bt(),vt(!0)])}),B==null||B.addEventListener("click",async()=>{var N;if(!x)return;const d=[];let w=0;for(;;){const z=await x("playlist_tracks",{playlistId:L,search:null,sort:"default",limit:500,offset:w});if(d.push(...z.items),w+=z.items.length,w>=z.total||!z.items.length)break}if(!d.length)return;const q=`#EXTM3U
`+d.map(z=>`#EXTINF:${Math.floor(z.duration)},${z.artist} - ${z.title}
${z.path}`).join(`
`),U=document.createElement("a");U.href=URL.createObjectURL(new Blob([q],{type:"audio/x-mpegurl"})),U.download=`${((N=m.find(z=>z.id===L))==null?void 0:N.name)||"playlist"}.m3u`,U.click(),setTimeout(()=>URL.revokeObjectURL(U.href),1e3)}),nt&&Y(async()=>{const{getCurrentWebviewWindow:d}=await import("./webviewWindow-mjQkSB26.js");return{getCurrentWebviewWindow:d}},__vite__mapDeps([6,7,1,0,8])).then(({getCurrentWebviewWindow:d})=>{d().onDragDropEvent(async w=>{if(w.payload.type!=="drop")return;const q=w.payload.paths||[];if(!q.length)return;const U=await he(q,ce==="playlist"?"append":"replace");if(U.length)ce!=="playlist"&&D("melo:play-tracks",{tracks:U,index:0});else for(const N of q)try{await le(N,ce!=="playlist")}catch{}})}).catch(()=>{}),at("melo:scan-progress",async d=>{if(d){if(d.scanId&&(v=d.scanId),r&&!d.finished&&b(`Cancel ${d.done||0}/${d.total||"…"}`),r){const w=d.total?Math.max(0,Math.min(100,Number(d.done||0)/Number(d.total)*100)):0;r.style.setProperty("--scan-progress",`${w}%`),r.classList.toggle("scanning",!d.finished)}if(d.finished){if(d.scanId===E&&J&&!d.cancelled&&x){await x("replace_playlist_from_scan",{playlistId:L,scanId:d.scanId});const U=(await x("playlist_tracks",{playlistId:L,search:null,sort:"default",limit:100,offset:0})).items.map(C);U.length&&D("melo:play-tracks",{tracks:U,index:0}),D("melo:playlist-changed",{playlistId:L})}v=null,E=null,J=!1,r&&(b("Scan"),r.classList.remove("scanning"),r.style.setProperty("--scan-progress","0%")),await Promise.all([X(),Bt(),gt(),vt()])}}});let ve=0;at("melo:library-changed",()=>{mt.clear(),window.clearTimeout(ve),ve=window.setTimeout(()=>{X(),gt(),vt()},500)}),at("melo:playlist-changed",()=>{Bt(),vt()}),at("melo:track-changed",d=>O((d==null?void 0:d.id)||null)),at("melo:playback-state",d=>{var w;return O(((w=d==null?void 0:d.track)==null?void 0:w.id)||null)});try{const d=JSON.parse(localStorage.getItem("melo-current-track")||"null");d!=null&&d.id&&O(d.id)}catch{}D("melo:request-playback-state"),setTimeout(()=>D("melo:request-playback-state"),250),window.LumiLibrary={get tracks(){return Z},get playlists(){return m},scanFolder:le,importPaths:he,getTrack:ea,render:()=>gt(),addTracks:()=>{},addToCurrentPlaylist:async d=>{!x||!d.length||(await x("add_tracks_to_playlist",{playlistId:L,trackIds:d.map(w=>w.id)}),D("melo:playlist-changed",{playlistId:L}))},currentPlaylistName:()=>{var d;return((d=m.find(w=>w.id===L))==null?void 0:d.name)||"Playlist"}},W().catch(()=>a("Could not initialize the Library database"))}const Jt={flat:[0,0,0,0,0,0,0,0,0,0],pop:[-1,2,4,4,2,-1,-1,2,3,3],rock:[4,3,2,-1,-2,-2,1,3,4,4],bass:[6,5,4,2,1,0,-1,-1,-2,-3],treble:[-3,-2,-1,0,1,2,3,5,6,6],dance:[5,4,2,0,-1,-1,2,4,5,3],jazz:[2,1,2,3,2,0,1,2,3,2],classical:[3,2,1,0,0,0,-1,2,3,4],vocal:[-2,-1,0,2,4,4,3,1,0,-1],acoustic:[3,2,1,1,2,2,3,3,2,1],hiphop:[5,4,1,2,-1,-1,1,-1,2,3],metal:[4,2,-1,-2,-1,1,3,4,5,4]};function de(t){for(const[a,i]of Object.entries(Jt))if(i.every((e,l)=>e===t[l]))return a;return"custom"}function Me(t,a,i={}){const e=!!i.remote,l=document.getElementById("eqEnable"),n=document.getElementById("eqPreset"),s=document.getElementById("btnEqReset"),r=document.getElementById("eqBands"),p=document.getElementById("eqCanvas"),c=p?p.getContext("2d"):null;let u=null,f=[],y=[],S=new Array(Yt.length).fill(0);try{const m=JSON.parse(localStorage.getItem("melo-eq-gains")||"null");Array.isArray(m)&&m.length===Yt.length&&(S=m.map(v=>typeof v=="number"?Math.max(-12,Math.min(12,v)):0))}catch{}let k=localStorage.getItem("melo-eq-preset")||de(S),h=localStorage.getItem("melo-eq-enabled")!=="0";function B(){if(!u)try{const m=te(t);u=m.ctx,f=m.filters,f.forEach((v,E)=>{v.gain.value=h?S[E]:0})}catch{}}function P(m,v){B(),f[m]&&h&&(f[m].gain.value=v)}function x(m){B(),S=[...m],h&&m.forEach((v,E)=>{f[E]&&(f[E].gain.value=v)}),L()}function it(m){B(),h=m,m?S.forEach((v,E)=>{f[E]&&(f[E].gain.value=v)}):f.forEach(v=>{v.gain.value=0}),L()}e||t&&t.addEventListener("play",()=>{B(),(u==null?void 0:u.state)==="suspended"&&u.resume().catch(()=>{})}),at("melo:eq",m=>{m&&(m.type==="gain"?(e||P(m.idx,m.val),S[m.idx]=m.val,y[m.idx]&&(y[m.idx].value=String(m.val),lt(y[m.idx])),n&&(n.value=de(S)),L()):m.type==="gains"?(e||x(m.values),S=[...m.values],y.length&&y.forEach((v,E)=>{v.value=String(S[E]),lt(v)}),n&&m.preset&&(n.value=m.preset),L()):m.type==="enable"&&(h=!!m.on,e||it(h),l&&(l.checked=h),L()))});function lt(m){var J;const v=parseInt(m.value),E=(J=m.parentElement)==null?void 0:J.querySelector(".val");E&&(E.textContent=(v>0?"+":"")+v+"dB")}function L(){if(!p||!c)return;const m=window.devicePixelRatio||1,v=p.clientWidth*m,E=p.clientHeight*m;if(v<=0||E<=0)return;p.width=v,p.height=E,c.clearRect(0,0,v,E);const J=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#2a7bd6",Z=S;if(!h){c.strokeStyle="rgba(100,120,150,0.25)",c.lineWidth=2*m,c.beginPath(),c.moveTo(0,E/2),c.lineTo(v,E/2),c.stroke();return}c.strokeStyle=J,c.lineWidth=2.5*m,c.lineJoin="round",c.beginPath(),Z.forEach((mt,K)=>{const V=K/(Z.length-1)*v,j=E/2-mt/12*(E/2-10*m);if(K===0)c.moveTo(V,j);else{const pt=(K-1)/(Z.length-1)*v,wt=E/2-Z[K-1]/12*(E/2-10*m);c.quadraticCurveTo((pt+V)/2,wt,V,j)}}),c.stroke(),Z.forEach((mt,K)=>{const V=K/(Z.length-1)*v,j=E/2-mt/12*(E/2-10*m);c.fillStyle=J,c.beginPath(),c.arc(V,j,4*m,0,Math.PI*2),c.fill(),c.fillStyle="white",c.beginPath(),c.arc(V,j,2*m,0,Math.PI*2),c.fill()}),c.strokeStyle="rgba(100,120,150,0.3)",c.lineWidth=1*m,c.setLineDash([4*m,4*m]),c.beginPath(),c.moveTo(0,E/2),c.lineTo(v,E/2),c.stroke(),c.setLineDash([])}r&&(r.innerHTML="",Yt.forEach((m,v)=>{const E=S[v]||0,J=document.createElement("div");J.className="eq-band",J.innerHTML=`
        <input type="range" min="-12" max="12" value="${E}" step="1" data-idx="${v}" orient="vertical" />
        <label>${m>=1e3?m/1e3+"k":m}</label>
        <span style="font-size:10px;color:var(--text-muted);min-height:12px;" class="val">${(E>0?"+":"")+E+"dB"}</span>
      `,r.appendChild(J)}),y=Array.from(r.querySelectorAll("input")),y.forEach(m=>{m.addEventListener("input",()=>{const v=parseInt(m.dataset.idx),E=parseInt(m.value);lt(m),S[v]=E,L();const J=de(S);n&&(n.value=J),localStorage.setItem("melo-eq-gains",JSON.stringify(S)),localStorage.setItem("melo-eq-preset",J),e||P(v,E),D("melo:eq",{type:"gain",idx:v,val:E,values:S})})})),n&&(n.value=k,n.addEventListener("change",()=>{const m=Jt[n.value]||Jt.flat;y.length&&y.forEach((v,E)=>{v.value=String(m[E]),lt(v)}),S=[...m],L(),localStorage.setItem("melo-eq-gains",JSON.stringify(S)),localStorage.setItem("melo-eq-preset",n.value),e||x(m),D("melo:eq",{type:"gains",values:m,preset:n.value}),a(`Preset: ${n.options[n.selectedIndex].text}`)})),s&&s.addEventListener("click",()=>{const m=Jt.flat;y.length&&y.forEach((v,E)=>{v.value="0",lt(v)}),S=[...m],n&&(n.value="flat"),localStorage.setItem("melo-eq-gains",JSON.stringify(S)),localStorage.setItem("melo-eq-preset","flat"),e||x(m),D("melo:eq",{type:"gains",values:m,preset:"flat"}),L(),a("Equalizer reset to Flat (0dB)")}),l&&(l.checked=h,l.addEventListener("change",()=>{h=l.checked,localStorage.setItem("melo-eq-enabled",h?"1":"0"),e||it(h),D("melo:eq",{type:"enable",on:h}),L(),a(h?"Equalizer On":"Equalizer off — Flat")})),p&&new ResizeObserver(()=>L()).observe(p),L(),window.LumiEqualizer={presets:Jt,frequencies:Yt,displayGains:S,reset:()=>s==null?void 0:s.click()}}const Gt=[{id:"bars",label:"Classic Bars"},{id:"thin",label:"Thin Bars"},{id:"line",label:"Spectrum Line"},{id:"mirror",label:"Mirror Bars"},{id:"wave",label:"Oscilloscope"},{id:"spectrumWave",label:"Spectrum Wave"},{id:"blocks",label:"Block Equalizer"}];function _e(){return document.getElementById("vizBars")||document.querySelector('[data-melo="visualizer"]')}function ya(t){let a=_e();if(!a)return;let i=h(a),e=i.getContext("2d"),l=null,n=null,s=null,r=null,p=null,c=!1,u=localStorage.getItem("melo-viz-mode")||"bars";Gt.some(g=>g.id===u)||(u="bars");let f=0,y=[],S=.45,k=null;function h(g){let b=g.querySelector("canvas");return b||(g.innerHTML="",b=document.createElement("canvas"),g.appendChild(b)),b}function B(){if(!(n&&s))try{const g=te(t);l=g.ctx,n=g.analyser,s=new Uint8Array(n.frequencyBinCount),r=new Uint8Array(n.fftSize)}catch{c=!0}}function P(g){const b=s.length,_=((l==null?void 0:l.sampleRate)||44100)/2,I=45,T=Math.min(15e3,_*.95),O=Math.log(I),$=Math.log(T),C=[];for(let R=0;R<g;R++){const G=Math.exp(O+($-O)*R/g),A=Math.exp(O+($-O)*(R+1)/g);let F=Math.floor(G/_*b),o=Math.max(F+1,Math.ceil(A/_*b));F<0&&(F=0),o>b&&(o=b);let M=0;for(let W=F;W<o;W++)M+=s[W];C.push(M/(o-F)/255)}return C}function x(g){const b=performance.now()/1e3,_=Math.pow(Math.abs(Math.sin(b*2.2)),2.5),I=[];for(let T=0;T<g;T++){let O=.42+.26*Math.sin(b*1.35+T*.62)+.2*Math.sin(b*2.9+T*1.31)+Math.random()*.07;O*=.55+.5*_,I.push(Math.max(.04,Math.min(1,O)))}return I}function it(g){const b=performance.now()/1e3,_=.5+.5*Math.pow(Math.abs(Math.sin(b*1.9)),2);for(let I=0;I<g.length;I++){const T=I/g.length;g[I]=128+66*_*(Math.sin(T*Math.PI*6+b*7)*.6+Math.sin(T*Math.PI*13-b*11)*.4)}}function lt(g){let b;if(c||!n||!s)b=x(g);else if(n.getByteFrequencyData(s),b=P(g),!b.some(T=>T>.01)&&!t.paused)b=x(g);else for(let T=0;T<g;T++)b[T]*=1+1.7*(T/Math.max(1,g-1));let _=0;for(const I of b)I>_&&(_=I);_>S?S=_:S=Math.max(.35,S*.985),y.length!==g&&(y=new Array(g).fill(0));for(let I=0;I<g;I++){const T=Math.min(1,b[I]/S),O=T>y[I]?.55:.16;y[I]+=(T-y[I])*O}return y}function L(g,b){return getComputedStyle(document.documentElement).getPropertyValue(g).trim()||b}function m(){return i.width/Math.max(1,i.clientWidth)||1}function v(g,b,_,I,T){if(T=Math.min(T,_/2,I/2),e.roundRect){e.roundRect(g,b,_,I,T);return}e.rect(g,b,_,I)}function E(){const g=window.devicePixelRatio||1,b=i.clientWidth||(a==null?void 0:a.clientWidth)||200,_=i.clientHeight||(a==null?void 0:a.clientHeight)||56;b>0&&_>0&&(i.width=Math.round(b*g),i.height=Math.round(_*g))}new ResizeObserver(E).observe(i),E();function J(g,b,_,I){const T=m(),O=L("--visualizer","#38bdf8"),$=L("--accent","#0284c7"),C=g.length,R=b/C,G=Math.max(1.2*T,R*(1-I));for(let A=0;A<C;A++){const F=g[A],o=Math.max(2*T,F*(_-4*T)),M=A*R+(R-G)/2,W=_-o-1*T,H=e.createLinearGradient(0,W,0,_);H.addColorStop(0,$),H.addColorStop(1,O),e.fillStyle=H,e.beginPath(),v(M,W,G,o,Math.min(G/2,3.5*T)),e.fill()}}function Z(g,b,_){const I=m(),T=L("--visualizer","#38bdf8"),O=L("--accent","#0284c7"),$=g.length,C=b/$,R=_/2,G=Math.max(1.5*I,C*.62);for(let A=0;A<$;A++){const F=Math.max(1.5*I,g[A]*(_/2-3*I)),o=A*C+(C-G)/2,M=e.createLinearGradient(0,R-F,0,R+F);M.addColorStop(0,O),M.addColorStop(.5,T),M.addColorStop(1,O),e.fillStyle=M,e.beginPath(),v(o,R-F,G,F*2,Math.min(G/2,3*I)),e.fill()}}function mt(g,b,_){const I=m(),T=L("--visualizer","#38bdf8"),O=L("--accent","#0284c7"),$=g.length,C=[],R=[];for(let A=0;A<$;A++)C.push((A+.5)/$*b),R.push(_-2*I-g[A]*(_-8*I));e.beginPath(),e.moveTo(C[0],_),e.lineTo(C[0],R[0]);for(let A=1;A<$;A++){const F=(C[A-1]+C[A])/2;e.quadraticCurveTo(C[A-1],R[A-1],F,(R[A-1]+R[A])/2)}e.lineTo(C[$-1],R[$-1]),e.lineTo(C[$-1],_),e.closePath();const G=e.createLinearGradient(0,0,0,_);G.addColorStop(0,T),G.addColorStop(1,"transparent"),e.globalAlpha=.18,e.fillStyle=G,e.fill(),e.globalAlpha=1,e.beginPath(),e.moveTo(C[0],R[0]);for(let A=1;A<$;A++){const F=(C[A-1]+C[A])/2;e.quadraticCurveTo(C[A-1],R[A-1],F,(R[A-1]+R[A])/2)}e.lineTo(C[$-1],R[$-1]),e.strokeStyle=O,e.lineWidth=2*I,e.lineJoin="round",e.stroke()}function K(g,b,_){const I=m(),T=L("--visualizer","#38bdf8"),O=L("--accent","#0284c7"),$=_/2,C=g.length,R=g.map((F,o)=>{const M=o/Math.max(1,C-1),W=Math.pow(Math.sin(Math.PI*M),.28);return Math.max(.7*I,F*W*(_*.46))}),G=F=>{e.beginPath();for(let o=0;o<C;o++){const M=o/Math.max(1,C-1)*b,W=$+(F?-R[o]:R[o]);if(o===0)e.moveTo(M,W);else{const H=(o-1)/Math.max(1,C-1)*b,X=$+(F?-R[o-1]:R[o-1]);e.quadraticCurveTo(H,X,(H+M)/2,(X+W)/2)}}};G(!0);for(let F=C-1;F>=0;F--){const o=F/Math.max(1,C-1)*b;e.lineTo(o,$+R[F])}e.closePath();const A=e.createLinearGradient(0,0,0,_);A.addColorStop(0,O),A.addColorStop(.5,T),A.addColorStop(1,O),e.fillStyle=A,e.globalAlpha=.3,e.fill(),e.globalAlpha=.18,e.shadowColor=T,e.shadowBlur=8*I,G(!0),e.strokeStyle=T,e.lineWidth=4*I,e.stroke(),G(!1),e.stroke(),e.shadowBlur=0,e.globalAlpha=1,G(!0),e.strokeStyle=O,e.lineWidth=1.2*I,e.stroke(),G(!1),e.stroke(),e.beginPath(),e.moveTo(0,$),e.lineTo(b,$),e.strokeStyle=T,e.globalAlpha=.45,e.lineWidth=.8*I,e.stroke(),e.globalAlpha=1}function V(g,b,_){const I=m(),T=L("--visualizer","#38bdf8"),O=L("--accent","#0284c7"),$=g.length,C=8,R=Math.max(1*I,b*.0035),G=Math.max(1*I,_*.025),A=Math.max(1,(b-R*($-1))/$),F=Math.max(1,(_-G*(C-1))/C),o=e.createLinearGradient(0,0,0,_);o.addColorStop(0,O),o.addColorStop(1,T),e.fillStyle=o;for(let M=0;M<$;M++){const W=Math.max(1,Math.min(C,Math.round(g[M]*C))),H=M*(A+R);for(let X=0;X<W;X++){const ht=_-(X+1)*F-X*G;e.globalAlpha=.58+.42*((X+1)/C),e.fillRect(H,ht,A,F)}}e.globalAlpha=1}function j(){const g=i.width,b=i.height,_=m(),I=L("--accent","#0284c7");let T;c||!n||!r?(p||(p=new Uint8Array(1024)),it(p),T=p):(n.getByteTimeDomainData(r),T=r);const O=()=>{e.beginPath();for(let $=0;$<=g;$+=2){const C=Math.min(T.length-1,Math.floor($/g*T.length)),R=T[C]/255*b;$===0?e.moveTo($,R):e.lineTo($,R)}};O(),e.strokeStyle=I,e.globalAlpha=.16,e.lineWidth=6*_,e.lineJoin="round",e.stroke(),O(),e.globalAlpha=1,e.lineWidth=1.8*_,e.stroke()}function pt(){const g=i.width,b=i.height;if(!g||!b)return;if(e.clearRect(0,0,g,b),u==="wave"){j();return}const _=u==="bars"?16:u==="thin"?56:u==="line"?64:u==="spectrumWave"?72:u==="blocks"?22:24,I=parseInt((a==null?void 0:a.dataset.bars)||"",10),T=Number.isFinite(I)&&I>0?I:_,O=lt(T);u==="bars"?J(O,g,b,.34):u==="thin"?J(O,g,b,.32):u==="line"?mt(O,g,b):u==="mirror"?Z(O,g,b):u==="spectrumWave"?K(O,g,b):u==="blocks"&&V(O,g,b)}function wt(){f=requestAnimationFrame(wt),pt()}function xt(){f||wt()}function St(g,b=!1){u=g,y=[],localStorage.setItem("melo-viz-mode",g)}function kt(){return k||(k=document.createElement("div"),k.className="viz-menu",k.style.display="none",document.body.appendChild(k),k)}function _t(){const g=kt();g.innerHTML='<div class="viz-menu-label">Visualizer type</div>'+Gt.map(b=>`<button class="viz-menu-item ${b.id===u?"active":""}" data-mode="${b.id}">${b.id===u?"✓":""}<span>${b.label}</span></button>`).join(""),g.querySelectorAll("[data-mode]").forEach(b=>{b.addEventListener("click",_=>{_.stopPropagation(),St(b.dataset.mode),rt()})})}function zt(g,b){_t();const _=k;_.style.display="block";const I=_.getBoundingClientRect();_.style.left=Math.max(8,Math.min(g,window.innerWidth-I.width-8))+"px",_.style.top=Math.max(8,Math.min(b,window.innerHeight-I.height-8))+"px"}function rt(){k&&(k.style.display="none")}function ft(){a&&(a.title="Click: next mode • Right-click: choose mode",a.addEventListener("click",()=>{rt();const g=Gt.findIndex(b=>b.id===u);St(Gt[(g+1)%Gt.length].id)}),a.addEventListener("contextmenu",g=>{g.preventDefault(),g.stopPropagation(),zt(g.clientX,g.clientY)}))}document.addEventListener("click",g=>{k&&k.style.display!=="none"&&!k.contains(g.target)&&rt()}),document.addEventListener("keydown",g=>{g.key==="Escape"&&rt()});function It(){B(),xt(),(l==null?void 0:l.state)==="suspended"&&l.resume().catch(()=>{})}t.addEventListener("play",It),It(),ft(),document.addEventListener("visibilitychange",()=>{document.hidden?(cancelAnimationFrame(f),f=0):xt()});function ct(){cancelAnimationFrame(f),f=0,a=_e(),a&&(i=h(a),e=i.getContext("2d"),new ResizeObserver(E).observe(i),E(),ft(),xt())}window.__LUMI_REBIND_VISUALIZER__=ct}function Ie(t){if(!t||!t.trim())return{isSynced:!1,lines:[],raw:""};const a=[],i=t.split(/\r?\n/),e=/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;let l=!1;for(const n of i){const s=n.trim();if(!s||/^\[[a-z]{2,8}:/i.test(s))continue;const r=[...s.matchAll(e)];if(r.length>0){l=!0;const p=s.replace(e,"").trim();for(const c of r){const u=parseInt(c[1],10),f=parseInt(c[2],10),y=c[3]||"0",S=y.length===2?parseInt(y,10)*10:y.length===1?parseInt(y,10)*100:parseInt(y.slice(0,3),10),k=u*60+f+S/1e3;a.push({time:k,text:p})}}else a.push({time:-1,text:s})}return a.sort((n,s)=>n.time-s.time),{isSynced:l,lines:a,raw:t}}function Te(t,a){var k;const i=document.getElementById("lyricsContainer"),e=document.getElementById("lyricsStatus"),l=document.getElementById("lyricsTrackTitle");let n={isSynced:!1,lines:[]},s=null,r=-1,p=0;async function c(h){if(h.lyrics&&h.lyrics.trim().length>0)return h.lyrics;if(window.__TAURI__)try{const{invoke:B}=await Y(async()=>{const{invoke:x}=await import("./core-DhEqZVGG.js");return{invoke:x}},[]),P=await B("get_track_lyrics",{path:h.path});if(P)return P}catch{}return null}async function u(h){if(!h){s=null,n={isSynced:!1,lines:[],raw:""},l&&(l.textContent="No track playing"),f();return}s=h.id,l&&(l.textContent=`${h.title} — ${h.artist}`);const B=await c(h);n=Ie(B||""),f()}function f(){if(i){if(i.innerHTML="",r=-1,!n.lines.length){e&&(e.style.display="block",e.innerHTML='No synced lyrics found (.lrc)<br/><span style="font-size:10.5px; opacity:0.7;">Place a matching .lrc file in the song folder or add lyrics in the tag editor.</span>');return}e&&(e.style.display="none"),n.lines.forEach((h,B)=>{const P=document.createElement("div");P.className="lyric-line",P.dataset.idx=String(B),P.dataset.time=String(h.time),P.textContent=h.text||"♪",h.time>=0&&(P.style.cursor="pointer",P.title=`Seek to ${Math.floor(h.time/60)}:${Math.floor(h.time%60).toString().padStart(2,"0")}`,P.addEventListener("click",()=>{D("melo:seek-playback",h.time),window.__TAURI__||(t.currentTime=h.time,t.play().catch(()=>{}))})),i.appendChild(P)})}}function y(){if(!i||!n.isSynced||!n.lines.length)return;const h=window.__TAURI__?p:t.currentTime;let B=-1;for(let P=0;P<n.lines.length&&n.lines[P].time<=h;P++)B=P;if(B!==r){r=B;const P=i.querySelectorAll(".lyric-line");if(P.forEach((x,it)=>{x.classList.toggle("active",it===r),x.classList.toggle("passed",it<r)}),r>=0&&P[r]){const x=P[r],it=i.clientHeight,L=x.offsetTop-i.offsetTop-it/2+x.clientHeight/2;i.scrollTo({top:Math.max(0,L),behavior:"smooth"})}}}t.addEventListener("timeupdate",y),window.addEventListener("lumi:trackChange",h=>{u(h.detail)}),at("melo:track-changed",h=>{u(h)}),at("melo:playback-state",h=>{h&&(p=Number(h.currentTime)||0,h.track&&h.track.id!==s?u(h.track):y())}),at("melo:playback-position",h=>{p=Number(h)||0,y()});const S=window.__LUMI_QUEUE__;if(Array.isArray(S)&&S.length>0)u(S[((k=window.LumiPlayer)==null?void 0:k.currentIndex)||0]);else try{const h=JSON.parse(localStorage.getItem("melo-current-track")||"null");h&&u(h)}catch{}D("melo:request-playback-state"),setTimeout(()=>D("melo:request-playback-state"),250),window.LumiLyrics={loadTrackLyrics:u,parseLRC:Ie}}const ba=(t,a,i)=>{const e=t[a];return e?typeof e=="function"?e():Promise.resolve(e):new Promise((l,n)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(n.bind(null,new Error("Unknown variable dynamic import: "+a+(a.split("/").length!==i?". Note that variables only represent file names one level deep.":""))))})},He={code:"en",name:"English",nativeName:"English",authors:["Melo Team"]},pe={_meta:He,"settings.tabs.general":"General","settings.tabs.playback":"Playback","settings.tabs.appearance":"Appearance & Skin","settings.tabs.shortcuts":"Shortcuts","settings.tabs.about":"About","settings.general.language.label":"Language","settings.general.language.desc":"Interface language — more languages coming via community translation","settings.general.tray.label":"Close to system tray","settings.general.tray.desc":"Minimize to system tray on window close","settings.general.resume.label":"Resume playback on reopen","settings.general.resume.desc":"Continue playback of the previous track where you left off","settings.playback.replaygain.label":"ReplayGain normalization","settings.playback.replaygain.desc":"Equalize track volume levels automatically","settings.playback.fadepause.label":"Fade out on pause","settings.playback.fadepause.desc":"Smooth 0.5s fade-out on pause, fade back in on resume","settings.appearance.showstop.label":"Show Stop button","settings.appearance.showstop.desc":"Display a Stop control next to Play/Pause in the player"},wa=Object.freeze(Object.defineProperty({__proto__:null,_meta:He,default:pe},Symbol.toStringTag,{value:"Module"})),Ne=[{code:"en",nativeName:"English"}],qt={en:pe};let Ue=qt.en,Ve="en";function ka(){return Ve}async function We(t){if(Ne.some(a=>a.code===t)||(t="en"),!qt[t])if(t==="en")qt.en=pe;else try{const a=await ba(Object.assign({"./locales/en.json":()=>Y(()=>Promise.resolve().then(()=>wa),void 0)}),`./locales/${t}.json`,3);qt[t]=a.default||a}catch{t="en"}Ve=t,Ue=qt[t]||qt.en,localStorage.setItem("melo-pref-language",t),document.dispatchEvent(new CustomEvent("melo:locale-changed",{detail:t}))}function st(t){var a,i;return(i=(a=Ue[t])!=null?a:qt.en[t])!=null?i:t}function Ae(){const t=localStorage.getItem("melo-pref-language")||"en";We(t)}const Fe=document.querySelector("#app");Fe.innerHTML=`
<div class="app-shell" data-testid="app-shell">
  <!-- DESKTOP FOR FLOATING WINDOWS -->
  <div class="desktop" id="desktop">

    <!-- LIBRARY WINDOW -->
    <div class="float-win" id="win-library" style="left:14px; top:12px; width:340px; height:460px; z-index:2;">
      <div class="float-header" data-drag="win-library">
        <div class="float-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/></svg>
          Library
        </div>
        <div class="float-actions">
          <button class="float-btn" data-close="win-library" title="Hide">—</button>
          <button class="float-btn close" data-close="win-library" title="Close">×</button>
        </div>
      </div>
      <div class="float-body" style="padding:0; display:flex; flex-direction:column;">
        <div class="library-search-row">
          <div class="search-wrap">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input id="searchInput" class="search-input" placeholder="Search artist, album, track…" />
            <button class="search-clear" id="searchClear" type="button" aria-label="Clear search" title="Clear search">×</button>
          </div>
          <button class="btn small library-action scan-action" id="btn-scan" title="Scan a music folder">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><path d="M12 10v6M9 13h6"/></svg>
            <span class="scan-label">Scan</span>
          </button>
          <button class="btn small library-action danger" id="btn-clear-library" title="Clear the entire Library database">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>
            <span>Clear</span>
          </button>
        </div>
        <div class="tabs" id="libraryTabs" style="flex-shrink:0;">
          <button class="tab active" data-libtab="artists">Artists</button>
          <button class="tab" data-libtab="albums">Albums</button>
          <button class="tab" data-libtab="genres">Genres</button>
        </div>
        <div class="library-stats-row" style="padding:8px 12px; display:flex; justify-content:space-between; align-items:center; font-size:11px; color:var(--text-muted); border-bottom:1px solid var(--card-border); flex-shrink:0;">
          <span id="libraryStats">0 tracks • 0 artists • 0 albums</span>
        </div>
        <div id="trackList" style="display:flex; flex-direction:column; flex:1; overflow:auto;"></div>
        <div id="tagEditor" style="display:none; margin:8px 10px 0; background:var(--track-bg); border-radius:10px; padding:12px; gap:10px; flex-direction:column; border:1px solid var(--card-border); flex-shrink:0;">
          <div style="font-weight:600; font-size:12px;">Metadata Editor</div>
          <div class="tag-editor-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
            <label class="col" style="gap:4px; font-size:11px;">Title<input id="tagTitle" class="search-input" style="padding-left:10px;" /></label>
            <label class="col" style="gap:4px; font-size:11px;">Artist<input id="tagArtist" class="search-input" style="padding-left:10px;" /></label>
            <label class="col" style="gap:4px; font-size:11px;">Album<input id="tagAlbum" class="search-input" style="padding-left:10px;" /></label>
            <label class="col" style="gap:4px; font-size:11px;">Year<input id="tagYear" class="search-input" style="padding-left:10px;" /></label>
          </div>
          <label class="col" style="gap:4px; font-size:11px;">Cover<input id="tagCover" type="file" accept="image/*" /></label>
          <div class="row" style="justify-content:flex-end;">
            <button class="btn small" id="btn-tag-cancel">Cancel</button>
            <button class="btn small primary" id="btn-tag-save">Save</button>
          </div>
        </div>
        <!-- hidden playlistList kept for library.ts internal logic -->
        <div id="playlistList" style="display:none;"></div>
        <div id="queueList" style="display:none;"></div>
      </div>
      <div class="resize-handle" data-resize="win-library">◢</div>
    </div>

    <!-- PLAYLIST WINDOW -->
    <div class="float-win" id="win-playlist" style="left:370px; top:12px; width:360px; height:480px; z-index:3;">
      <div class="float-header" data-drag="win-playlist">
        <div class="float-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          Playlist
        </div>
        <div class="float-actions">
          <button class="float-btn" data-close="win-playlist" title="Hide">—</button>
          <button class="float-btn close" data-close="win-playlist">×</button>
        </div>
      </div>
      <div class="float-body" style="padding:8px; display:flex; flex-direction:column; gap:6px;">
        <div class="playlist-toolbar" style="display:flex; gap:6px; align-items:center; flex-shrink:0; flex-wrap:wrap;">
          <div class="playlist-search-wrap" style="flex:1 1 160px; position:relative; min-width:120px; height:26px;">
            <input id="playlistSearchInput" class="search-input" placeholder="Search playlist..." style="width:100%; height:100%; font-size:11px; padding:0 28px 0 10px;" />
            <button class="search-clear" id="playlistSearchClear" type="button" aria-label="Clear search" title="Clear search">×</button>
          </div>
          <select id="playlistSelect" class="settings-select" style="height:26px; font-size:11px; padding:2px 6px; flex:1 1 120px; min-width:80px;" title="Current playlist"></select>
          <button class="btn small ghost" id="btn-new-playlist" title="New playlist" style="height:26px; width:26px; padding:0; font-size:16px; line-height:1; justify-content:center; flex:0 0 auto;">+</button>
          <select id="playlistSortSelect" class="settings-select" style="height:26px; font-size:11px; padding:2px 4px; width:92px; flex:0 0 auto;" title="Sort tracks">
            <option value="default">Sort: Default</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="artist-asc">Artist (A-Z)</option>
            <option value="album-asc">Album (A-Z)</option>
            <option value="dur-asc">Shortest</option>
            <option value="dur-desc">Longest</option>
          </select>
        </div>
        <div id="winPlaylistTracks" class="drop-zone" style="flex:1; overflow:auto; display:flex; flex-direction:column; min-height:140px;"></div>
        <div id="winPlaylistEmpty" style="display:none; border:1px dashed var(--card-border); border-radius:10px; padding:16px 10px; background:var(--track-bg); text-align:center; font-size:11px; color:var(--text-muted); line-height:1.8;">
          Playlist is empty<br/>Drag tracks from Library or drop audio files here
        </div>
        <div class="playlist-footer-actions" style="display:flex; gap:6px; flex-shrink:0;">
          <button class="btn small" id="btn-clear-playlist" style="justify-content:center; color:#e5484d;" title="Remove all tracks from the current playlist">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="m19 6-1 14H6L5 6"/></svg>
            Clear
          </button>
          <button class="btn small block" id="btn-export-playlist">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export M3U
          </button>
        </div>
      </div>
      <div class="resize-handle" data-resize="win-playlist">◢</div>
    </div>

    <!-- EQUALIZER WINDOW -->
    <div class="float-win" id="win-equalizer" style="left:14px; top:12px; width:540px; height:320px; z-index:2;">
      <div class="float-header" data-drag="win-equalizer">
        <div class="float-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 14h3v7H3zM9 10h3v11H9zM15 6h3v15h-3zM21 12h-3v9h3z"/></svg>
          Equalizer
        </div>
        <div class="float-actions">
          <button class="float-btn" data-close="win-equalizer">—</button>
          <button class="float-btn close" data-close="win-equalizer">×</button>
        </div>
      </div>
      <div class="float-body" style="padding:10px 12px; display:flex; flex-direction:column; gap:8px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; padding-bottom:2px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <label style="font-size:11px; font-weight:600; color:var(--text-soft);">Preset:</label>
            <select id="eqPreset" class="settings-select" style="height:26px; font-size:11px; padding:2px 8px; min-width:130px;">
              <option value="flat">Flat</option>
              <option value="pop">Pop</option>
              <option value="rock">Rock</option>
              <option value="bass">Bass Boost</option>
              <option value="treble">Treble Boost</option>
              <option value="dance">Electronic / Dance</option>
              <option value="jazz">Jazz</option>
              <option value="classical">Classical</option>
              <option value="vocal">Vocal Boost</option>
              <option value="acoustic">Acoustic</option>
              <option value="hiphop">Hip Hop</option>
              <option value="metal">Metal</option>
              <option value="custom" disabled>Custom</option>
            </select>
            <button class="btn small" id="btnEqReset" style="height:26px; padding:2px 10px; font-size:11px;" title="Reset EQ to Flat (0dB)">Reset</button>
          </div>
          <label class="row" style="gap:6px; font-size:11px; font-weight:600; cursor:pointer;"><input type="checkbox" id="eqEnable" checked /> Equalizer On</label>
        </div>
        <div class="eq-grid" id="eqGrid" style="background:var(--track-bg); border-radius:12px; padding:10px; border:1px solid var(--card-border);">
          <div class="eq-bands" id="eqBands"></div>
          <canvas id="eqCanvas" class="equalizer-canvas"></canvas>
          <div class="row" style="justify-content:space-between; font-size:11px; color:var(--text-muted); margin-top:4px;">
            <span>31Hz — 16kHz • 10 bands</span>
            <span id="eqHint" style="font-size:10px;">Drag sliders to adjust</span>
          </div>
        </div>
      </div>
      <div class="resize-handle" data-resize="win-equalizer">◢</div>
    </div>

    <!-- LYRICS WINDOW -->
    <div class="float-win" id="win-lyrics" style="left:740px; top:12px; width:340px; height:460px; z-index:3;">
      <div class="float-header" data-drag="win-lyrics">
        <div class="float-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Lyric
        </div>
        <div class="float-actions">
          <button class="float-btn" data-close="win-lyrics" title="Hide">—</button>
          <button class="float-btn close" data-close="win-lyrics">×</button>
        </div>
      </div>
      <div class="float-body" style="padding:10px; display:flex; flex-direction:column;">
        <div id="lyricsTrackTitle" style="font-size:11px; font-weight:700; color:var(--text-soft); padding-bottom:8px; border-bottom:1px solid var(--card-border); margin-bottom:8px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">No track playing</div>
        <div id="lyricsStatus" style="display:none; text-align:center; padding:20px 10px; font-size:12px; color:var(--text-muted); line-height:1.6;"></div>
        <div id="lyricsContainer" class="lyrics-scroll-container" style="flex:1; overflow-y:auto; display:flex; flex-direction:column; gap:8px; padding:20px 8px; text-align:center;"></div>
      </div>
      <div class="resize-handle" data-resize="win-lyrics">◢</div>
    </div>

    <!-- SETTINGS WINDOW -->
    <div class="float-win hidden" id="win-settings" style="left:50%; top:50%; width:600px; height:540px; transform:translate(-50%,-50%); z-index:10;">
      <div class="float-header" data-drag="win-settings" style="cursor:move;">
        <div class="float-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
          Settings
        </div>
        <div class="float-actions">
          <button class="btn small" id="btn-settings-reset" style="height:22px; padding:2px 8px; font-size:11px;">Reset</button>
          <button class="float-btn close" data-close="win-settings">×</button>
        </div>
      </div>
      <div class="float-body" style="padding:0; overflow:auto;">
        <div class="settings-tabs" id="settingsTabs">
          <button class="settings-tab active" data-stab="general"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>${st("settings.tabs.general")}</button>
          <button class="settings-tab" data-stab="playback"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4z"/></svg>${st("settings.tabs.playback")}</button>
          <button class="settings-tab" data-stab="appearance"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>${st("settings.tabs.appearance")}</button>
          <button class="settings-tab" data-stab="shortcuts"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M18 14h.01M9 14h6"/></svg>${st("settings.tabs.shortcuts")}</button>
          <button class="settings-tab" data-stab="about"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>${st("settings.tabs.about")}</button>
        </div>

        <!-- GENERAL TAB -->
        <div class="settings-section active" data-panel="general">
          <div class="settings-row">
            <div><div class="label">${st("settings.general.language.label")}</div><div class="desc">${st("settings.general.language.desc")}</div></div>
            <select class="settings-select" id="setLanguage">${Ne.map(t=>`<option value="${t.code}">${t.nativeName}</option>`).join("")}</select>
          </div>
          <div class="settings-row">
            <div><div class="label">${st("settings.general.tray.label")}</div><div class="desc">${st("settings.general.tray.desc")}</div></div>
            <div class="switch" id="swTray" data-key="tray"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">${st("settings.general.resume.label")}</div><div class="desc">${st("settings.general.resume.desc")}</div></div>
            <div class="switch on" id="swResume" data-key="resume"></div>
          </div>
        </div>

        <!-- PLAYBACK TAB -->
        <div class="settings-section" data-panel="playback">
          <div class="settings-row">
            <div><div class="label">${st("settings.playback.replaygain.label")}</div><div class="desc">${st("settings.playback.replaygain.desc")}</div></div>
            <div class="switch on" id="swReplayGain" data-key="replayGainGlobal"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">${st("settings.playback.fadepause.label")}</div><div class="desc">${st("settings.playback.fadepause.desc")}</div></div>
            <div class="switch on" id="swFadePause" data-key="fadePause"></div>
          </div>
        </div>

        <!-- APPEARANCE & SKINS TAB -->
        <div class="settings-section" data-panel="appearance">
          <div class="settings-row" style="flex-direction:column; align-items:stretch; gap:10px;">
            <div>
              <div class="label">Active Skin & Theme</div>
              <div class="desc">Select skin loaded directly from the skins/ folder and toggle theme</div>
            </div>
            <div style="display:flex; gap:6px; align-items:center;">
              <select class="settings-select" id="skinSelect" style="flex:1; height:34px; font-size:12px; padding:4px 10px;">
                <option value="default">Default Melo (Standard)</option>
                <option value="compact-pill">Minimal Compact (Pill Bar)</option>
              </select>
              <button class="btn small" id="btnRefreshSkins" title="Refresh skins from disk" style="height:34px; width:34px; padding:0; display:grid; place-items:center; flex-shrink:0;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
              </button>
              <button class="btn small" id="btnSkinThemeToggle" title="Toggle Light / Dark theme" style="height:34px; padding:0 14px; font-size:12px; display:inline-flex; align-items:center; gap:6px; flex-shrink:0;">
                <span id="skinThemeIcon">🌙</span>
                <span id="skinThemeLabel">Dark</span>
              </button>
            </div>
          </div>

          <div class="settings-row">
            <div><div class="label">Dynamic Album Artwork Theme</div><div class="desc">Automatically adapt accent and visualizer glow colors to matching album art</div></div>
            <div class="switch on" id="swDynamicTheme" data-key="dynamicTheme"></div>
          </div>

          <div class="settings-row">
            <div><div class="label">${st("settings.appearance.showstop.label")}</div><div class="desc">${st("settings.appearance.showstop.desc")}</div></div>
            <div class="switch" id="swShowStop" data-key="showStopBtn"></div>
          </div>

          <div class="settings-row" style="flex-direction:column; align-items:stretch;">
            <div class="label" style="margin-bottom:4px;">Skins Directory (Disk)</div>
            <div style="font-size:11px; color:var(--text-soft); line-height:1.6; margin-bottom:8px;">
              Files in the <code>skins/</code> installation folder are loaded dynamically. You can modify CSS/HTML files with any editor.
            </div>
            <div style="display:flex; gap:8px;">
              <button class="btn small" id="btnOpenSkinsFolder" style="flex:1; justify-content:center;">Open Skins Folder 📁</button>
              <label class="btn small" style="cursor:pointer; flex:1; justify-content:center;">
                Import Skin (.html) 📥
                <input id="skinUpload" type="file" accept=".html,.htm" style="display:none" />
              </label>
              <button class="btn small" id="btn-reset-skin-settings">Reset to Default</button>
            </div>
          </div>
        </div>

        <!-- SHORTCUTS TAB -->
        <div class="settings-section" data-panel="shortcuts">
          <div style="display:grid; grid-template-columns: 150px 1fr; gap:10px 16px; font-size:12px; line-height:1.6; padding:4px 0;">
            <b>Space</b><span>Play / Pause</span>
            <b>Left / Right</b><span>Seek 5 seconds backward / forward</span>
            <b>Up / Down</b><span>Adjust volume (±5%)</span>
            <b>M</b><span>Mute / Unmute audio</span>
            <b>S</b><span>Toggle Shuffle playback</span>
            <b>R</b><span>Toggle Repeat mode (Off / All / One)</span>
            <b>Ctrl + O</b><span>Add audio files via file dialog</span>
            <b>Ctrl + Shift + O</b><span>Scan folder via folder dialog</span>
            <b>Ctrl + , / F2</b><span>Open / Close Settings window</span>
            <b>Escape</b><span>Close popup menus & visualizer selector</span>
          </div>
        </div>

        <!-- ABOUT TAB -->
        <div class="settings-section" data-panel="about">
          <div style="font-size:12px; color:var(--text-soft); line-height:1.8;">
            <div style="font-size:16px; font-weight:800; color:var(--text); margin-bottom:4px;">Melo 0.5.1 Beta</div>
            <b>Tauri 2 + TypeScript + Vite + Rust</b><br/>
            Supports: FLAC, ALAC, MP3, WAV, AAC, OGG, OPUS • 10-band EQ • Real-time FFT Visualizer • Lyric • Dynamic Ambient Theme<br/>
            License: <b>GPL-3.0</b> • Open Source on GitHub:<br/>
            <a href="https://github.com/Arvanta/Melo" target="_blank" rel="noopener" style="color:var(--accent); font-weight:600;">github.com/Arvanta/Melo ↗</a>
          </div>
        </div>
      </div>
      <div class="resize-handle" data-resize="win-settings">◢</div>
    </div>

  </div>

  <!-- PLAYER BAR -->
  <div class="player-card" id="playerCard">
    <div class="player-titlebar" data-tauri-drag-region>
      <span class="app-name-static">
        <svg class="app-brand-mark" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M2 12h2l1-7 2 14 3-10 2 6h2l2-9 2 14 2-7h2"/></svg>
        Melo
      </span>
      <div class="titlebar-actions">
        <button class="win-btn" id="btnAddFiles" title="Add files (Ctrl+O)">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 12v6"/><path d="M9 15h6"/></svg>
        </button>
        <button class="win-btn" id="btnAddFolder" title="Add folder (Ctrl+Shift+O)">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><path d="M12 10v6"/><path d="M9 13h6"/></svg>
        </button>
        <button class="win-btn" id="btnAbout" title="About Melo">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        </button>
        <button class="win-btn" id="btnThemeToggle" title="Toggle light / dark theme">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
        </button>
      </div>
      <div class="win-controls">
        <button class="win-btn" aria-label="minimize">—</button>
        <button class="win-btn close" aria-label="close">×</button>
      </div>
    </div>

    <div class="player-main">
      <div class="cover-col">
        <div class="cover-wrap" id="coverWrap">
          <img id="coverImg" src="" alt="cover" style="display:none" />
          <div id="coverFallback" class="cover-fallback">♪</div>
        </div>
        <div class="volume-row volume-under">
          <span class="vol-icon" id="volIcon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.08"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
          </span>
          <input type="range" class="vol" id="volBar" min="0" max="100" value="60" />
          <span class="vol-pct" id="volPct">60%</span>
        </div>
      </div>

      <div class="track-info">
        <div class="track-meta">
          <div class="track-title" id="trackTitle">No track loaded</div>
          <div class="track-artist" id="trackArtist">Add music to start playing</div>
          <div class="track-album" id="trackAlbum"></div>
          <div class="track-format">
            <span class="badge-flac" id="trackCodec">—</span>
            <span id="trackSpecs"></span>
          </div>
        </div>

        <div class="transport" id="transport">
          <button class="icon-btn" id="btnShuffle" title="Shuffle (S)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M16 3h5v5"/><path d="M4 20l8-8"/><path d="M21 3l-8 8"/><path d="M16 21h5v-5"/><path d="M4 4l5 5"/><path d="M9 15l-5 5"/></svg>
          </button>
          <button class="icon-btn" id="btnPrev" title="Previous">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 20L9 12l10-8z"/><rect x="5" y="4" width="3" height="16" rx="1"/></svg>
          </button>
          <button class="icon-btn" id="btnStop" title="Stop">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="5" width="14" height="14" rx="2.5"/></svg>
          </button>
          <button class="play-btn" id="btnPlay" title="Play/Pause (Space)">
            <svg id="iconPause" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
            <svg id="iconPlay" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="display:none; margin-left:2px;"><path d="M7 4.5L19 12 7 19.5z"/></svg>
          </button>
          <button class="icon-btn" id="btnNext" title="Next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M5 4l10 8L5 20z"/><rect x="16" y="4" width="3" height="16" rx="1"/></svg>
          </button>
          <button class="icon-btn" id="btnRepeat" title="Repeat (R)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
          </button>
        </div>

        <div class="seek-row">
          <span class="time" id="curTime">0:00</span>
          <div class="seek-wrap">
            <input type="range" class="seek" id="seekBar" min="0" max="276" value="0" />
          </div>
          <span class="time" id="durTime">0:00</span>
        </div>
      </div>

      <div class="right-panel">
        <div class="right-main">
          <div class="visualizer-bars" id="vizBars"></div>
        </div>
        <div class="side-actions">
          <button class="sbtn active" id="btnToggleLibrary" title="Library">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/></svg>
          </button>
          <button class="sbtn active" id="btnTogglePlaylist" title="Playlist">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15V6"/><path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/><path d="M12 12H3"/><path d="M16 6H3"/><path d="M12 18H3"/></svg>
          </button>
          <button class="sbtn active" id="btnToggleEq" title="Equalizer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 14h3v7H3zM9 10h3v11H9zM15 6h3v15h-3z"/></svg>
          </button>
          <button class="sbtn active" id="btnToggleLyrics" title="Lyric">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </button>
          <button class="sbtn" id="btnOpenSettings" title="Settings">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div id="toast" class="toast"></div>
</div>
`;const ot=new URLSearchParams(location.search).get("panel");ot&&(document.documentElement.classList.add("panel-window",`panel-${ot}`),document.body.classList.add("panel-window",`panel-${ot}`));var Pe,Be;if(nt&&ot){Y(async()=>{const{getCurrentWindow:e}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:e}},__vite__mapDeps([8,7,1,0])).then(({getCurrentWindow:e})=>{const l=e();Ea(l,"melo-geo-panel-"+ot),l.onCloseRequested(()=>{D("melo:panel-closed",ot)}),window.addEventListener("beforeunload",()=>{D("melo:panel-closed",ot)})});const t=document.getElementById("win-"+ot),a=((Pe=t==null?void 0:t.querySelector(".float-title"))==null?void 0:Pe.innerHTML)||"",i=((Be=t==null?void 0:t.querySelector(".float-body"))==null?void 0:Be.innerHTML)||"";Fe.innerHTML=`
<div class="panel-root">
  <div class="panel-titlebar" data-tauri-drag-region>
    <div class="panel-title" data-tauri-drag-region>${a}</div>
    <div class="win-controls">
      <button class="win-btn" aria-label="minimize" title="Minimize">—</button>
      <button class="win-btn close" aria-label="close" title="Close">×</button>
    </div>
  </div>
  <div class="panel-body">${i}</div>
  <div id="toast" class="toast"></div>
</div>`}nt&&!ot&&(document.documentElement.classList.add("tauri-main"),document.body.classList.add("tauri-main"),document.querySelectorAll(".side-actions .sbtn").forEach(t=>t.classList.remove("active")),Y(async()=>{const{WebviewWindow:t}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:t}},__vite__mapDeps([6,7,1,0,8])).then(({WebviewWindow:t})=>{const a=async()=>{var i;for(const e of["library","playlist","equalizer","lyrics","settings"])try{const l=await t.getByLabel("panel-"+e);(i=document.getElementById(me[e]))==null||i.classList.toggle("active",!!l)}catch{}};a(),setInterval(a,1200)}));nt&&!ot&&(Y(()=>import("./window-BWd3Cypy.js"),__vite__mapDeps([8,7,1,0])).then(async({getCurrentWindow:t})=>{const a=t(),i=()=>{const n=localStorage.getItem("melo-active-skin-id")||"default";if(n==="compact-pill"||typeof n=="string"&&n.startsWith("compact-pill"))return{w:780,h:138,resizable:!1,fixed:!0,custom:!1,force:!0};if(n!=="default"){const r=fa();return r?{w:r.width,h:r.height,resizable:r.resizable!==!1,fixed:!1,custom:!0,force:!0,minW:r.minWidth,minH:r.minHeight}:{w:0,h:0,resizable:!0,fixed:!1,custom:!0,force:!1}}return{w:960,h:240,resizable:!0,fixed:!1,custom:!1,force:!0}},e=async n=>{try{const{LogicalSize:s}=await Y(async()=>{const{LogicalSize:r}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:r}},__vite__mapDeps([7,1]));n.fixed?(await a.setMinSize(new s(n.w,n.h)),await a.setMaxSize(new s(n.w,n.h))):n.custom?(await a.setMinSize(new s(n.minW||240,n.minH||120)),await a.setMaxSize(new s(1e4,1e4))):(await a.setMinSize(new s(650,135)),await a.setMaxSize(new s(1e4,260))),await a.setResizable(n.resizable)}catch{}};try{const n=JSON.parse(localStorage.getItem("melo-geo-main")||"null"),{LogicalPosition:s,LogicalSize:r}=await Y(async()=>{const{LogicalPosition:u,LogicalSize:f}=await import("./dpi-fvP-W2qr.js");return{LogicalPosition:u,LogicalSize:f}},__vite__mapDeps([7,1])),p=i(),c=localStorage.getItem("melo-active-skin-id")||"default";if(p.force){const f=!p.fixed&&c==="default"&&(n==null?void 0:n.w)?Math.max(650,n.w):p.w;await a.setSize(new r(f,p.h))}await e(p),(n==null?void 0:n.x)!=null&&(n==null?void 0:n.y)!=null&&await a.setPosition(new s(n.x,n.y))}catch{}const l=async()=>{try{const n=await a.outerPosition(),s=await a.innerSize();localStorage.setItem("melo-geo-main",JSON.stringify({x:n.x,y:n.y,w:s.width,h:s.height}))}catch{}};a.onMoved(l),a.onResized(async()=>{try{const n=i(),{LogicalSize:s}=await Y(async()=>{const{LogicalSize:r}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:r}},__vite__mapDeps([7,1]));if(n.fixed)await a.setSize(new s(n.w,n.h));else if(!n.custom){const p=(await a.innerSize()).toLogical(await a.scaleFactor());(p.width<650||p.height!==n.h)&&await a.setSize(new s(Math.max(650,p.width),n.h))}}catch{}l()}),at("melo:skin-changed",async n=>{try{!ot&&n&&await $t(n,Ct,void 0,!1);const s=i();if(s.force){const{LogicalSize:r}=await Y(async()=>{const{LogicalSize:p}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:p}},__vite__mapDeps([7,1]));await a.setSize(new r(s.w,s.h))}await e(s),l()}catch{}}),at("melo:skin-geometry",async()=>{try{const n=i();if(n.force){const{LogicalSize:s}=await Y(async()=>{const{LogicalSize:r}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:r}},__vite__mapDeps([7,1]));await a.setSize(new s(n.w,n.h))}await e(n),l()}catch{}}),a.onCloseRequested(async n=>{if(n.preventDefault(),localStorage.getItem("melo-pref-tray")==="1")try{await a.hide();return}catch{}const{WebviewWindow:r}=await Y(async()=>{const{WebviewWindow:p}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:p}},__vite__mapDeps([6,7,1,0,8]));for(const p of["library","playlist","equalizer","lyrics","settings"])try{const c=await r.getByLabel("panel-"+p);c&&await c.close()}catch{}try{await a.destroy()}catch{window.close()}})}),Y(()=>import("./core-DhEqZVGG.js"),[]).then(async({invoke:t})=>{try{const a=await t("get_cli_tracks");Array.isArray(a)&&a.length>0&&setTimeout(async()=>{const i=window.LumiLibrary,e=a.map(n=>n.path).filter(Boolean),l=await(i==null?void 0:i.importPaths(e,"replace"))||[];l.length&&D("melo:play-tracks",{tracks:l,index:0})},350)}catch{}}),at("melo:open-files",t=>{if(Array.isArray(t)&&t.length>0){const a=t.map(i=>i.path).filter(Boolean);setTimeout(async()=>{const i=window.LumiLibrary,e=await(i==null?void 0:i.importPaths(a,"replace"))||[];e.length&&D("melo:play-tracks",{tracks:e,index:0})},100)}}));document.addEventListener("contextmenu",t=>{t.preventDefault()});const Qt=document.getElementById("toast"),ut=t=>{Qt&&(Qt.textContent=t,Qt.classList.add("show"),setTimeout(()=>Qt.classList.remove("show"),2200))},Et=new Audio;Et.preload="metadata";Et.crossOrigin="anonymous";window.__LUMI_AUDIO__=Et;window.__TOAST__=ut;localStorage.getItem("melo-dynamic-theme")===null&&localStorage.setItem("melo-dynamic-theme","1");let Ct=localStorage.getItem("lumi-theme")||"dark";function ie(t){document.documentElement.setAttribute("data-theme",t),localStorage.setItem("lumi-theme",t),Ct=t}function je(t){ie(t),D("melo:theme",t)}ie(Ct);at("melo:theme",t=>{(t==="light"||t==="dark")&&ie(t)});setInterval(()=>{const t=localStorage.getItem("lumi-theme");(t==="light"||t==="dark")&&t!==Ct&&ie(t)},1e3);document.body.classList.toggle("show-stop-btn",localStorage.getItem("melo-pref-showStopBtn")==="1");at("melo:pref-changed",t=>{t&&t.key==="showStopBtn"&&document.body.classList.toggle("show-stop-btn",!!t.value)});const xa=["win-library","win-playlist","win-equalizer","win-lyrics","win-settings"],ae=document.getElementById("desktop"),Sa={btnToggleLibrary:"win-library",btnTogglePlaylist:"win-playlist",btnToggleEq:"win-equalizer",btnToggleLyrics:"win-lyrics",btnOpenSettings:"win-settings",menuToggleLibrary:"win-library",menuTogglePlaylist:"win-playlist",menuToggleEq:"win-equalizer",menuToggleLyrics:"win-lyrics",menuToggleSettings:"win-settings"};function La(t){const a=document.getElementById(t);return!!a&&!a.classList.contains("hidden")}const me={library:"btnToggleLibrary",playlist:"btnTogglePlaylist",equalizer:"btnToggleEq",lyrics:"btnToggleLyrics",settings:"btnOpenSettings"};async function Ea(t,a){const i=async()=>{try{const e=await t.outerPosition(),l=await t.outerSize();localStorage.setItem(a,JSON.stringify({x:e.x,y:e.y,w:l.width,h:l.height}))}catch{}};t.onMoved(i),t.onResized(i)}async function Ma(t){const{WebviewWindow:a}=await Y(async()=>{const{WebviewWindow:u}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:u}},__vite__mapDeps([6,7,1,0,8])),i="panel-"+t,e=document.getElementById(me[t]),l=await a.getByLabel(i);if(l){await l.close(),e==null||e.classList.remove("active");return}const n={library:[430,620],playlist:[440,560],equalizer:[700,440],lyrics:[380,520],settings:[600,540]},s={library:[360,400],playlist:[360,360],equalizer:[620,400],lyrics:[320,360],settings:[500,400]},r={library:"Library",playlist:"Playlist",equalizer:"Equalizer",lyrics:"Lyric",settings:"Settings"},p=n[t]||[420,520];let c=null;try{c=JSON.parse(localStorage.getItem("melo-geo-panel-"+t)||"null")}catch{}new a(i,{url:`/?panel=${t}`,title:r[t]||t,width:(c==null?void 0:c.w)||p[0],height:(c==null?void 0:c.h)||p[1],minWidth:(s[t]||[360,360])[0],minHeight:(s[t]||[360,360])[1],...(c==null?void 0:c.x)!=null?{x:c.x,y:c.y}:{center:!0},decorations:!1,transparent:!0,shadow:!1,skipTaskbar:!0}),e==null||e.classList.add("active")}at("melo:panel-closed",t=>{var i;const a=me[t];a&&((i=document.getElementById(a))==null||i.classList.remove("active"))});function fe(t){if(nt){Ma(t.replace(/^win-/,""));return}const a=La(t);Xt(t,!a),a||ne(document.getElementById(t))}function _a(t){if(t.classList.contains("hidden")||!ae||window.matchMedia("(max-width: 860px)").matches)return;const a=ae.getBoundingClientRect();if(a.width<=0||a.height<=0)return;const i=t.getBoundingClientRect(),e=Math.min(i.width,a.width),l=Math.min(i.height,a.height);let n=i.left-a.left,s=i.top-a.top;n=Math.max(0,Math.min(a.width-e,n)),s=Math.max(0,Math.min(a.height-l,s)),t.style.left=n+"px",t.style.top=s+"px",t.style.right="auto",t.style.bottom="auto",t.style.transform="none"}function Xt(t,a){var l,n,s,r,p,c,u,f,y,S;const i=document.getElementById(t);if(!i)return;i.classList.toggle("hidden",!a),localStorage.setItem("lumiv2-"+t,a?"1":"0"),a&&_a(i);const e=a;t==="win-library"&&((l=document.getElementById("btnToggleLibrary"))==null||l.classList.toggle("active",e),(n=document.getElementById("menuToggleLibrary"))==null||n.classList.toggle("active",e)),t==="win-playlist"&&((s=document.getElementById("btnTogglePlaylist"))==null||s.classList.toggle("active",e),(r=document.getElementById("menuTogglePlaylist"))==null||r.classList.toggle("active",e)),t==="win-equalizer"&&((p=document.getElementById("btnToggleEq"))==null||p.classList.toggle("active",e),(c=document.getElementById("menuToggleEq"))==null||c.classList.toggle("active",e)),t==="win-lyrics"&&((u=document.getElementById("btnToggleLyrics"))==null||u.classList.toggle("active",e),(f=document.getElementById("menuToggleLyrics"))==null||f.classList.toggle("active",e)),t==="win-settings"&&((y=document.getElementById("btnOpenSettings"))==null||y.classList.toggle("active",e),(S=document.getElementById("menuToggleSettings"))==null||S.classList.toggle("active",e))}ot||xa.forEach(t=>{const a=localStorage.getItem("lumiv2-"+t);a!==null?Xt(t,a==="1"):t==="win-settings"?Xt(t,!1):Xt(t,!0)});Object.entries(Sa).forEach(([t,a])=>{var i;(i=document.getElementById(t))==null||i.addEventListener("click",()=>fe(a))});document.querySelectorAll("[data-close]").forEach(t=>{t.addEventListener("click",()=>{const a=t.dataset.close;Xt(a,!1)})});let bt=null,Mt=null,Ce=10;function ne(t){Ce++,t.style.zIndex=String(Ce),document.querySelectorAll(".float-win").forEach(a=>a.classList.remove("active")),t.classList.add("active")}document.querySelectorAll(".float-win").forEach(t=>{t.addEventListener("mousedown",()=>ne(t))});document.querySelectorAll("[data-drag]").forEach(t=>{t.addEventListener("mousedown",a=>{if(a.target.closest("button")||a.target.closest("input")||a.target.closest("select"))return;const i=t.dataset.drag,e=document.getElementById(i);ne(e),e.classList.add("dragging");const l=e.getBoundingClientRect();bt={id:i,startX:a.clientX,startY:a.clientY,initX:l.left,initY:l.top,width:l.width,height:l.height}})});document.querySelectorAll("[data-resize]").forEach(t=>{t.addEventListener("mousedown",a=>{a.stopPropagation();const i=t.dataset.resize,e=document.getElementById(i);ne(e),e.classList.add("resizing");const l=e.getBoundingClientRect();Mt={id:i,startX:a.clientX,startY:a.clientY,initW:l.width,initH:l.height}})});window.addEventListener("mousemove",t=>{if(bt){const a=document.getElementById(bt.id);let i=t.clientX-bt.startX,e=t.clientY-bt.startY,l=bt.initX+i,n=bt.initY+e;if(ae&&!window.matchMedia("(max-width: 860px)").matches){const s=ae.getBoundingClientRect(),r=s.left,p=s.right-bt.width,c=s.top,u=s.bottom-bt.height;l=Math.max(r,Math.min(p,l))-s.left,n=Math.max(c,Math.min(u,n))-s.top}a.style.left=l+"px",a.style.top=n+"px",a.style.right="auto",a.style.bottom="auto",a.style.transform="none"}if(Mt){const a=document.getElementById(Mt.id);let i=Mt.initW+(t.clientX-Mt.startX),e=Mt.initH+(t.clientY-Mt.startY);i=Math.max(260,i),e=Math.max(160,e),a.style.width=i+"px",a.style.height=e+"px"}});window.addEventListener("mouseup",()=>{if(bt){const t=document.getElementById(bt.id);t&&(t.classList.remove("dragging"),localStorage.setItem("lumiv2-pos-"+bt.id,JSON.stringify({left:t.style.left,top:t.style.top}))),bt=null}if(Mt){const t=document.getElementById(Mt.id);t&&(t.classList.remove("resizing"),localStorage.setItem("lumiv2-size-"+Mt.id,JSON.stringify({width:t.style.width,height:t.style.height}))),Mt=null}});async function Ge(){const t=window.LumiLibrary,a=window.LumiPlayer;if(nt){try{const{open:e}=await Y(async()=>{const{open:r}=await import("./index-CS3Qnt9j.js");return{open:r}},__vite__mapDeps([5,1])),l=await e({multiple:!0,filters:[{name:"Audio",extensions:["mp3","flac","wav","aac","ogg","m4a","alac","opus","wma","aiff"]}]});if(!l)return;const n=Array.isArray(l)?l:[l],s=await(t==null?void 0:t.importPaths(n,"replace"))||[];s.length&&(D("melo:play-tracks",{tracks:s,index:0}),ut(`${s.length} file(s) added`))}catch{ut("Error opening files")}return}const i=document.createElement("input");i.type="file",i.multiple=!0,i.accept="audio/*,.mp3,.flac,.wav,.aac,.ogg,.m4a,.alac,.opus,.wma,.aiff",i.onchange=async()=>{const e=Array.from(i.files||[]);if(!e.length)return;const l=[];for(const n of e){const s=n.path,r=s||URL.createObjectURL(n),p=n.name,c=p.lastIndexOf("."),u=c>0?p.slice(0,c):p,f=c>0?p.slice(c+1).toUpperCase():"AUDIO",y={id:s||"imp_"+Math.random().toString(36).slice(2,9),title:u,artist:"Unknown Artist",album:"Single",duration:0,path:r,codec:f,specs:"Local File",source:"import"};await Re(n,y),l.push(y)}t==null||t.addTracks(l,!0),t==null||t.addToCurrentPlaylist(l),l.forEach(n=>a==null?void 0:a.queue.push(n)),D("melo:play-tracks",{tracks:l,index:0}),ut(`${l.length} file(s) added`)},i.click()}async function Ye(){const t=window.LumiLibrary,a=window.LumiPlayer;if(nt){try{const{open:e}=await Y(async()=>{const{open:s}=await import("./index-CS3Qnt9j.js");return{open:s}},__vite__mapDeps([5,1])),l=await e({directory:!0});if(!l)return;const n=l;await(t==null?void 0:t.scanFolder(n,!0))}catch{ut("Error scanning folder")}return}const i=document.createElement("input");i.type="file",i.webkitdirectory=!0,i.multiple=!0,i.accept="audio/*",i.onchange=async()=>{const e=Array.from(i.files||[]).filter(n=>/\.(mp3|flac|wav|aac|ogg|m4a|alac|opus|wma|aiff)$/i.test(n.name));if(!e.length)return;const l=[];for(const n of e){const s=n.path,r=s||URL.createObjectURL(n),p=n.name,c=p.lastIndexOf("."),u=c>0?p.slice(0,c):p,f=c>0?p.slice(c+1).toUpperCase():"AUDIO",y={id:s||"imp_"+Math.random().toString(36).slice(2,9),title:u,artist:"Unknown Artist",album:"Folder Import",duration:0,path:r,codec:f,specs:"Local File",source:"import"};await Re(n,y),l.push(y)}t==null||t.addTracks(l,!0),t==null||t.addToCurrentPlaylist(l),l.forEach(n=>a==null?void 0:a.queue.push(n)),D("melo:play-tracks",{tracks:l,index:0}),ut(`${l.length} file(s) added from folder`)},i.click()}document.addEventListener("click",t=>{var e;const a=(e=t.target)==null?void 0:e.closest('#btnAddFiles, #btnAddFolder, #btnThemeToggle, [data-melo="add-files"], [data-melo="add-folder"], [data-melo="theme-toggle"]');if(!a)return;const i=a.getAttribute("data-melo")||a.id;i==="btnAddFiles"||i==="add-files"?Ge():i==="btnAddFolder"||i==="add-folder"?Ye():(i==="btnThemeToggle"||i==="theme-toggle")&&je(Ct==="light"?"dark":"light")});window.addEventListener("keydown",t=>{(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="o"&&(t.shiftKey?(t.preventDefault(),Ye()):(t.preventDefault(),Ge())),((t.ctrlKey||t.metaKey)&&t.key===","||t.key==="F2")&&(t.preventDefault(),fe("win-settings"))});function ze(t){var y,S;function a(k){document.querySelectorAll(".settings-tab").forEach(h=>{h.classList.toggle("active",h.dataset.stab===k)}),document.querySelectorAll(".settings-section[data-panel]").forEach(h=>{h.classList.toggle("active",h.dataset.panel===k)}),localStorage.setItem("melo-settings-tab",k)}document.querySelectorAll(".settings-tab").forEach(k=>{k.addEventListener("click",()=>a(k.dataset.stab))}),a(localStorage.getItem("melo-settings-tab")||"general"),document.querySelectorAll(".switch[data-key]").forEach(k=>{const h=k.dataset.key,B=localStorage.getItem("melo-pref-"+h);B!==null&&k.classList.toggle("on",B==="1"),k.onclick=()=>{k.classList.toggle("on");const P=k.classList.contains("on");localStorage.setItem("melo-pref-"+h,P?"1":"0"),D("melo:pref-changed",{key:h,value:P})}});const i=document.getElementById("setLanguage");i&&(i.value=ka(),i.onchange=async()=>{await We(i.value),t(`Language set to ${i.options[i.selectedIndex].text} — restart Melo to fully apply`)});const e=document.getElementById("swDynamicTheme");if(e){const k=localStorage.getItem("melo-dynamic-theme")!=="0";e.classList.toggle("on",k),e.onclick=()=>{var x,it;const h=!e.classList.contains("on");e.classList.toggle("on",h),localStorage.setItem("melo-dynamic-theme",h?"1":"0");const B=window.__LUMI_QUEUE__,P=(it=(x=window.LumiPlayer)==null?void 0:x.currentIndex)!=null?it:0;B&&B[P]&&qe(h?B[P].cover:null)}}const l=document.getElementById("skinSelect"),n=document.getElementById("btnSkinThemeToggle"),s=document.getElementById("btnRefreshSkins"),r=document.getElementById("btnOpenSkinsFolder"),p=document.getElementById("skinThemeIcon"),c=document.getElementById("skinThemeLabel");function u(k){p&&(p.textContent=k==="dark"?"🌙":"☀️"),c&&(c.textContent=k==="dark"?"Dark":"Light")}u(Ct),n==null||n.addEventListener("click",()=>{const k=Ct==="dark"?"light":"dark";je(k),u(k),t(k==="dark"?"Dark theme":"Light theme")}),at("melo:theme",k=>{(k==="light"||k==="dark")&&u(k)});async function f(){if(!l)return;const k=localStorage.getItem("melo-active-skin-id")||"default",h=await Oe();l.innerHTML=`
      <option value="default">Default Melo (Standard)</option>
      <option value="compact-pill">Minimal Compact (Pill Bar)</option>
    `,h.forEach(B=>{if(B.filename!=="compact-pill.html"&&B.filename!=="compact-pill-light.html"&&B.filename!=="compact-pill-dark.html"){const P=document.createElement("option");P.value=B.filename,P.textContent=`${B.name} (${B.filename})`,l.appendChild(P)}}),l.value=k}f(),l&&(l.onchange=()=>{const k=l.value;$t(k,Ct,t)}),s==null||s.addEventListener("click",async()=>{await f();const k=localStorage.getItem("melo-active-skin-id")||"default";$t(k,Ct,t),t("Skins reloaded from disk")}),r==null||r.addEventListener("click",()=>{De(t)}),(y=document.getElementById("btn-reset-skin-settings"))==null||y.addEventListener("click",()=>{ue(t),l&&(l.value="default")}),(S=document.getElementById("btn-settings-reset"))==null||S.addEventListener("click",()=>{localStorage.clear(),t("Settings reset — reloading..."),setTimeout(()=>location.reload(),600)})}function Je(){document.querySelectorAll('.win-btn, [data-melo="minimize"], [data-melo="close"]').forEach(t=>{t.onclick=async()=>{const a=t.getAttribute("aria-label")||t.getAttribute("data-melo");if(window.__TAURI__){const{getCurrentWindow:i}=await Y(async()=>{const{getCurrentWindow:l}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:l}},__vite__mapDeps([8,7,1,0])),e=i();a==="minimize"?e.minimize():a==="close"&&e.close()}else a==="close"&&ut("Window close requires the Tauri desktop build")}})}Je();const Ia=[["btnToggleLibrary","toggle-library","win-library"],["btnTogglePlaylist","toggle-playlist","win-playlist"],["btnToggleEq","toggle-eq","win-equalizer"],["btnToggleLyrics","toggle-lyrics","win-lyrics"],["btnOpenSettings","toggle-settings","win-settings"]];window.__LUMI_REBIND_MAIN__=()=>{Je(),Ia.forEach(([t,a,i])=>{const e=et(t,a);e&&(e.onclick=()=>fe(i))})};const Dt=document.createElement("div");Dt.id="aboutPop";Dt.style.display="none";document.body.appendChild(Dt);document.addEventListener("click",t=>{var a,i;(a=t.target)!=null&&a.closest('#btnAbout, [data-melo="about"]')&&(t.stopPropagation(),Dt.innerHTML=`
    <div class="about-head">Melo <b>0.5.1 Beta</b></div>
    <div style="font-size:11.5px; color:var(--text-soft); margin:6px 0 10px;">
      Modern Windows Music Player<br/>
      Tauri 2 + TypeScript + Rust
    </div>
    <a class="about-link" id="aboutLink" href="https://github.com/Arvanta/Melo" rel="noopener">github.com/Arvanta/Melo ↗</a>`,Dt.style.display=Dt.style.display==="none"?"block":"none",(i=document.getElementById("aboutLink"))==null||i.addEventListener("click",e=>{e.preventDefault();const l="https://github.com/Arvanta/Melo";nt?Y(()=>import("./core-DhEqZVGG.js"),[]).then(n=>n.invoke("open_url",{url:l})).catch(()=>window.open(l,"_blank")):window.open(l,"_blank")}))});document.addEventListener("click",t=>{!t.target.closest("#aboutPop")&&!t.target.closest('#btnAbout, [data-melo="about"]')&&(Dt.style.display="none")});nt&&ot?ot==="library"||ot==="playlist"?Ee(Et,ut):ot==="equalizer"?Me(Et,ut,{remote:!0}):ot==="lyrics"?Te(Et):ot==="settings"&&(Ae(),ze(ut),Se(ut)):(va(Et,ut),Ee(Et,ut),Me(Et,ut),ya(Et),Te(Et),Se(ut),ze(ut),Ae(),setTimeout(async()=>{if(localStorage.getItem("melo-pref-resume")!=="0")try{const t=JSON.parse(localStorage.getItem("melo-resume-state")||"null"),a=window.LumiLibrary,i=window.LumiPlayer;if(!(t!=null&&t.trackId)||!a||!i)return;const e=await a.getTrack(t.trackId);if(!e)return;i.queue=[e],i.loadTrack(0,!0,t.position||0)}catch{}},500));
//# sourceMappingURL=index-DPGd39G3.js.map
