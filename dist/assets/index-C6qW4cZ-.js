const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/event-CNdo2oXa.js","assets/core-DhEqZVGG.js","assets/index-DiyoAAdc.js","assets/index-CHth0gh2.js","assets/index-Bq0iOnRE.js","assets/index-CS3Qnt9j.js","assets/webviewWindow-mjQkSB26.js","assets/dpi-fvP-W2qr.js","assets/window-BWd3Cypy.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function i(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=i(n);fetch(n.href,o)}})();const ma="modulepreload",fa=function(t){return"/"+t},Ae={},J=function(e,i,a){let n=Promise.resolve();if(i&&i.length>0){let l=function(r){return Promise.all(r.map(p=>Promise.resolve(p).then(v=>({status:"fulfilled",value:v}),v=>({status:"rejected",reason:v}))))};document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),u=(c==null?void 0:c.nonce)||(c==null?void 0:c.getAttribute("nonce"));n=l(i.map(r=>{if(r=fa(r),r in Ae)return;Ae[r]=!0;const p=r.endsWith(".css"),v=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${v}`))return;const h=document.createElement("link");if(h.rel=p?"stylesheet":ma,p||(h.as="script"),h.crossOrigin="",h.href=r,u&&h.setAttribute("nonce",u),document.head.appendChild(h),p)return new Promise((M,C)=>{h.addEventListener("load",M),h.addEventListener("error",()=>C(new Error(`Unable to preload CSS for ${r}`)))})}))}function o(l){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=l,window.dispatchEvent(c),!c.defaultPrevented)throw l}return n.then(l=>{for(const c of l||[])c.status==="rejected"&&o(c.reason);return e().catch(o)})},vt=typeof window.__TAURI_INTERNALS__<"u"||typeof window.__TAURI__<"u";async function N(t,e){if(vt)try{const{emit:i}=await J(async()=>{const{emit:a}=await import("./event-CNdo2oXa.js");return{emit:a}},__vite__mapDeps([0,1]));await i(t,e);return}catch{}window.dispatchEvent(new CustomEvent(t,{detail:e}))}function ot(t,e){vt&&J(async()=>{const{listen:i}=await import("./event-CNdo2oXa.js");return{listen:i}},__vite__mapDeps([0,1])).then(({listen:i})=>{i(t,a=>{e(a.payload)})}).catch(()=>{}),window.addEventListener(t,i=>e(i.detail))}let Ce=!1;async function ga(){if(!Ce){Ce=!0;try{const t=globalThis;if(typeof t.Buffer>"u"){const e=await J(()=>import("./index-DiyoAAdc.js").then(i=>i.i),__vite__mapDeps([2,3]));t.Buffer=e.Buffer}typeof t.process>"u"&&(t.process={env:{},browser:!0,nextTick:e=>setTimeout(e,0)})}catch{}}}async function ha(t,e){var i;try{await ga();const a=await J(()=>import("./index-Bq0iOnRE.js").then(r=>r.i),__vite__mapDeps([4,3])),n=a&&typeof a.parseBlob=="function"?a:a.default||a,o=await Promise.race([n.parseBlob(t),new Promise((r,p)=>setTimeout(()=>p(new Error("timeout")),1800))]),l=o==null?void 0:o.common;if(!l)return;l.title&&(e.title=l.title),l.artist?e.artist=l.artist:l.artists&&l.artists[0]&&(e.artist=l.artists[0]),l.album&&(e.album=l.album),l.genre&&l.genre[0]&&(e.genre=l.genre[0]),l.year&&(e.year=l.year);const c=(i=l.picture)==null?void 0:i[0];if(c&&c.data){const r=c.format||"image/jpeg",p=c.data;if(p.length>6e5)return;let v="";const h=8192;for(let M=0;M<p.length;M+=h){const C=p.subarray(M,M+h);v+=String.fromCharCode.apply(null,C)}e.cover=`data:${r};base64,${btoa(v)}`}const u=o==null?void 0:o.format;u&&u.duration&&!e.duration&&(e.duration=Math.floor(u.duration))}catch{}}async function je(t,e,i=1800){return await ha(t,e),e}async function va(t){return new Promise(e=>{if(!t)return e(null);const i=new Image;i.crossOrigin="anonymous",i.onload=()=>{try{const a=document.createElement("canvas"),n=a.getContext("2d");if(!n)return e(null);a.width=40,a.height=40,n.drawImage(i,0,0,40,40);const o=n.getImageData(0,0,40,40).data;let l={r:42,g:123,b:214},c=-1;for(let u=0;u<o.length;u+=4){const r=o[u],p=o[u+1],v=o[u+2];if(o[u+3]<128)continue;const M=Math.max(r,p,v),C=Math.min(r,p,v),k=(M+C)/510,F=M-C,$=F===0?0:F/(1-Math.abs(2*k-1));if($>.25&&k>.25&&k<.82){const S=$*1.5+(1-Math.abs(k-.5));S>c&&(c=S,l={r,g:p,b:v})}}c>0?e(l):e(null)}catch{e(null)}},i.onerror=()=>e(null),i.src=t})}async function Ge(t){const e=localStorage.getItem("melo-dynamic-theme")!=="0",i=document.documentElement;if(!e||!t){i.style.removeProperty("--accent"),i.style.removeProperty("--visualizer"),i.style.removeProperty("--accent-glow");return}const a=await va(t);if(a){const n=`rgb(${a.r}, ${a.g}, ${a.b})`;i.style.setProperty("--accent",n),i.style.setProperty("--visualizer",n),i.style.setProperty("--accent-glow",`rgba(${a.r}, ${a.g}, ${a.b}, 0.35)`)}else i.style.removeProperty("--accent"),i.style.removeProperty("--visualizer"),i.style.removeProperty("--accent-glow")}const re=[31,62,125,250,500,1e3,2e3,4e3,8e3,16e3];let _t=null,Ot=[],ce=null,Qt=null;const Pe=new WeakMap;function Ye(){if(_t)return;const t=window.AudioContext||window.webkitAudioContext;_t=new t,Ot=re.map(e=>{const i=_t.createBiquadFilter();return i.type="peaking",i.frequency.value=e,i.Q.value=1.4,i.gain.value=0,i});for(let e=0;e<Ot.length-1;e++)Ot[e].connect(Ot[e+1]);ce=_t.createGain(),ce.gain.value=1,Qt=_t.createAnalyser(),Qt.fftSize=2048,Qt.smoothingTimeConstant=.72,Ot[Ot.length-1].connect(ce),ce.connect(Qt),Qt.connect(_t.destination)}function ze(t){Ye();const e=Pe.get(t);if(e)return e;try{const i=_t.createMediaElementSource(t),a=_t.createGain();a.gain.value=1,i.connect(a),a.connect(Ot[0]);const n={source:i,gain:a};return Pe.set(t,n),n}catch{return null}}function te(t){return Ye(),ze(t),{ctx:_t,filters:Ot,gain:ce,analyser:Qt,async resume(){_t&&_t.state==="suspended"&&await _t.resume().catch(()=>{})},getDeck(e){return ze(e)}}}let Bt=null;function lt(t,e){const i=document.getElementById(t);return i||document.querySelector(`[data-melo="${e}"]`)}function ya(t){const e=r=>{const p=t.match(new RegExp(r+`\\s*=\\s*["']?(\\d+)`));return p?parseInt(p[1],10):null},i=e("data-window-width"),a=e("data-window-height"),n=e("data-min-width"),o=e("data-min-height"),l=e("data-max-width"),c=e("data-max-height"),u=!/data-resizable\s*=\s*["\']?false/i.test(t);return i==null&&a==null&&n==null&&o==null&&l==null&&c==null?null:{width:i!=null?i:void 0,height:a!=null?a:void 0,minWidth:n!=null?n:void 0,minHeight:o!=null?o:void 0,maxWidth:l!=null?l:void 0,maxHeight:c!=null?c:void 0,resizable:u}}function ba(){try{const t=JSON.parse(localStorage.getItem("melo-skin-geometry")||"null");return!t||typeof t!="object"?null:t}catch{}return null}const Kt=`<!doctype html>
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
`,he={"compact-pill.html":Kt,"compact-pill":Kt,"compact-pill-light.html":Kt,"compact-pill-dark.html":Kt,"compact-pill-light":Kt,"compact-pill-dark":Kt},wa=[{id:"compact-pill",name:"Minimal Compact (Light/Dark)",filename:"compact-pill.html"},{id:"full-html-example",name:"Full HTML Example",filename:"full-html-example.html"},{id:"slate",name:"Slate",filename:"slate.html"},{id:"silk-orbit",name:"Silk Orbit",filename:"silk-orbit.html"},{id:"ivory",name:"Ivory",filename:"ivory.html"},{id:"microline",name:"Microline",filename:"microline.html"}];function Je(t){const e=["trackTitle","btnPlay","seekBar","coverImg"];let i=0;for(const n of e)t.includes(n)&&i++;const a=(t.match(/data-melo\s*=/g)||[]).length;return i+=Math.min(a,3),i>=3}function jt(t,e,i=!0){const a=document.getElementById("playerCard");if(!a)return;const n=a._originalHTML||a.innerHTML;a._originalHTML||(a._originalHTML=n),Bt&&(Bt.remove(),Bt=null);let l=[...t.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(h=>h[1]).join(`
`);l&&(Bt=document.createElement("style"),Bt.id="melo-custom-skin",Bt.textContent=l,document.head.appendChild(Bt));const c=Je(t);let u="";const r=t.match(/<body[^>]*>([\s\S]*?)<\/body>/i);r?u=r[1]:u=t.split(/<\/style>/i).pop()||"";const p=document.createElement("div");p.innerHTML=u;const v=p.querySelector("#lumi-player");if(v&&(u=v.innerHTML),c&&u.trim().length>20){const h=u.trim();a.innerHTML=h,e&&e("Skin applied"),setTimeout(()=>{var C,k;(C=window.__LUMI_REBIND__)==null||C.call(window);const M=window.__LUMI_AUDIO__;M&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(M),(k=window.__LUMI_REBIND_MAIN__)==null||k.call(window)},40)}else l&&e&&e("Skin CSS applied");if(c){const h=ya(t);h?(localStorage.setItem("melo-skin-geometry",JSON.stringify(h)),i&&N("melo:skin-geometry",h)):localStorage.removeItem("melo-skin-geometry")}localStorage.setItem("lumi-custom-skin",t),localStorage.setItem("lumi-custom-skin-isFull",c?"1":"0")}function Me(t,e=!0){document.documentElement.classList.remove("compact-skin-active"),document.body.classList.remove("compact-skin-active"),document.documentElement.classList.remove("custom-skin-active"),document.body.classList.remove("custom-skin-active"),Bt&&(Bt.remove(),Bt=null);const i=document.getElementById("playerCard");i&&i._originalHTML&&(i.innerHTML=i._originalHTML,setTimeout(()=>{var n,o;(n=window.__LUMI_REBIND__)==null||n.call(window);const a=window.__LUMI_AUDIO__;a&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(a),(o=window.__LUMI_REBIND_MAIN__)==null||o.call(window)},40)),localStorage.removeItem("lumi-custom-skin"),localStorage.removeItem("lumi-custom-skin-isFull"),localStorage.removeItem("melo-skin-geometry"),localStorage.setItem("melo-active-skin-id","default"),e&&N("melo:skin-changed","default"),t&&t("Switched to Default Melo skin")}async function Xe(){if(vt)try{const{invoke:t}=await J(async()=>{const{invoke:i}=await import("./core-DhEqZVGG.js");return{invoke:i}},[]),e=await t("list_installed_skins");if(Array.isArray(e)&&e.length>0)return e}catch{}return wa}async function ka(t,e,i=!0){if(vt)try{const{invoke:n}=await J(async()=>{const{invoke:l}=await import("./core-DhEqZVGG.js");return{invoke:l}},[]),o=await n("read_skin_file",{filenameOrPath:t});if(o&&o.trim().length>0)return jt(o,e,i),!0}catch{}try{const n=t.startsWith("skins/")?t:`skins/${t}`,o=await fetch(n);if(o.ok){const l=await o.text();return jt(l,e,i),!0}}catch{}const a=t.replace(/^.*[\\/]/,"");return he[a]?(jt(he[a],e,i),!0):(e&&e(`Could not load skin: ${t}`),!1)}async function Ft(t,e,i,a=!0,n=!0){if(t==="default"){Me(i,a);return}let o=t;const l=t==="compact-pill"||t.startsWith("compact-pill"),c=!l;document.documentElement.classList.toggle("compact-skin-active",l),document.body.classList.toggle("compact-skin-active",l),document.documentElement.classList.toggle("custom-skin-active",c),document.body.classList.toggle("custom-skin-active",c),l?o="compact-pill.html":!o.endsWith(".html")&&!o.endsWith(".htm")&&(o=o+".html");let u=!1;l&&he[o]?(jt(he[o],i,n),u=!0):u=await ka(o,i,n),u&&(localStorage.setItem("melo-active-skin-id",t),a&&N("melo:skin-changed",t))}async function Ze(t){if(vt)try{const{invoke:e}=await J(async()=>{const{invoke:i}=await import("./core-DhEqZVGG.js");return{invoke:i}},[]);await e("open_skins_folder"),t&&t("Opening skins folder...")}catch{t&&t("Could not open skins folder")}else t&&t("Skins are located in the skins/ folder")}function Be(t){const e=document.getElementById("skinUpload"),i=localStorage.getItem("melo-active-skin-id")||"default",a=localStorage.getItem("lumi-theme")||"dark";i!=="default"&&setTimeout(()=>{Ft(i,a,void 0,!1,!1)},150),ot("melo:theme",n=>{const o=localStorage.getItem("melo-active-skin-id");o&&o!=="default"&&Ft(o,n,void 0,!1,!1)}),ot("melo:skin-changed",n=>{if(n&&typeof n=="string"){const o=localStorage.getItem("lumi-theme")||"dark";Ft(n,o,void 0,!1,!1)}}),e&&e.addEventListener("change",async()=>{var c;const n=(c=e.files)==null?void 0:c[0];if(!n)return;const o=await n.text(),l=n.name;if(vt)try{const{invoke:u}=await J(async()=>{const{invoke:r}=await import("./core-DhEqZVGG.js");return{invoke:r}},[]);await u("save_custom_skin_file",{filename:l,content:o}),t(`Saved ${l} to skins folder`)}catch{}jt(o,t),localStorage.setItem("melo-active-skin-id",l),N("melo:skin-changed",l),e.value=""}),document.addEventListener("dragover",n=>{var o;[...((o=n.dataTransfer)==null?void 0:o.types)||[]].includes("Files")&&n.preventDefault()}),document.addEventListener("drop",async n=>{var l;const o=[...((l=n.dataTransfer)==null?void 0:l.files)||[]].find(c=>c.name.endsWith(".html")||c.name.endsWith(".htm"));if(o){n.preventDefault();const c=await o.text();if(c.includes("<style")||c.includes("<html")||Je(c)){const u=o.name;if(vt)try{const{invoke:r}=await J(async()=>{const{invoke:p}=await import("./core-DhEqZVGG.js");return{invoke:p}},[]);await r("save_custom_skin_file",{filename:u,content:c})}catch{}jt(c,t),localStorage.setItem("melo-active-skin-id",u),N("melo:skin-changed",u)}}}),window.LumiSkin={applyCustomSkin:jt,resetSkin:Me,applySkinChoice:Ft,listInstalledSkins:Xe,openSkinsFolderOnDisk:Ze}}function xa(t,e){let i,a,n,o,l,c,u,r=null,p,v,h,M,C,k,F,$,S,st,rt,E,f,m=t,g=null,x=[],q=0,X=!1,U="off",j=!1;function et(){if(!x.length)return null;if(U==="one")return q;let s=q+1;if(X&&(s=Math.floor(Math.random()*x.length),s===q&&x.length>1&&(s=(s+1)%x.length)),s>=x.length)if(U==="all")s=0;else return null;return s}window.__LUMI_QUEUE__=x,window.__LUMI_SET_QUEUE__=s=>{x=s,window.__LUMI_QUEUE__=s};function mt(s){if(!isFinite(s))return"0:00";const T=Math.floor(s/60),H=Math.floor(s%60).toString().padStart(2,"0");return`${T}:${H}`}function wt(){if(!p)return;const s=parseFloat(p.max)||100,T=parseFloat(p.value)||0,H=s>0?T/s*100:0;p.style.setProperty("--progress",H+"%")}function Tt(){v&&v.style.setProperty("--vol",v.value+"%")}function It(){k&&(k.classList.toggle("muted",m.muted),k.title=m.muted?"Unmute":"Mute")}function At(s=!0){m.muted=!m.muted,kt&&at&&(at.muted=m.muted),It(),s&&e(m.muted?"Muted":"Unmuted")}async function Ht(s){if(!s)return"";if(/^(https?|data|blob):/.test(s))return s;if(vt)try{const{convertFileSrc:T}=await J(async()=>{const{convertFileSrc:H}=await import("./core-DhEqZVGG.js");return{convertFileSrc:H}},[]);return T(s)}catch{}return s}let kt=!1,ft=null,at=null,xt=null,gt=null;function y(){return localStorage.getItem("melo-pref-crossfade")==="1"}function w(){const s=parseInt(localStorage.getItem("melo-pref-crossfadeDuration")||"4",10);return Number.isFinite(s)?Math.min(12,Math.max(1,s)):4}function L(){return g||(g=new Audio,g.preload="auto",g.crossOrigin="anonymous",ie(g)),g}function I(){return m===t?L():t}function _(s,T){try{const H=te(t),Q=H.getDeck(s);Q==null||Q.gain.gain.cancelScheduledValues(H.ctx.currentTime),Q==null||Q.gain.gain.setValueAtTime(T,H.ctx.currentTime)}catch{}}function P(){if(gt&&(clearTimeout(gt),gt=null),!kt){ft=null,at=null,xt=null;return}if(kt=!1,at){_(at,0);try{at.pause(),at.currentTime=0}catch{}}ft&&_(ft,1),ft=null,at=null,xt=null}function D(s){var d;if(!v)return 1;const T=parseInt(v.value,10)/100,Q=localStorage.getItem("melo-pref-replayGainGlobal")!=="0"&&(d=s==null?void 0:s.replayGain)!=null?d:0,nt=Math.pow(10,Q/20);return Math.min(1,Math.max(0,T*nt))}function z(){return D(x[q])}function O(){if(kt||!y()||U==="one"||x.length<=1)return;const s=m.duration;if(!isFinite(s)||s<=0)return;const T=et();if(T===null)return;const H=s-m.currentTime;if(H<=0)return;const Q=Math.min(w(),Math.max(1,s*.9));H<=Q&&Z(T,Q)}async function Z(s,T){const H=x[s];if(!H)return;kt=!0;const Q=m,nt=I();ft=Q,at=nt,xt=s;try{nt.pause(),nt.src=await Ht(H.path),nt.load()}catch{P();return}if(at!==nt||!kt)return;const d=()=>{nt.removeEventListener("error",d),at===nt&&P()};nt.addEventListener("error",d,{once:!0});const b=te(t),B=b.getDeck(Q),V=b.getDeck(nt);if(!B||!V){P();return}nt.volume=D(H),nt.muted=Q.muted;try{await b.resume()}catch{}try{await nt.play()}catch{P();return}if(at!==nt||!kt)return;const A=b.ctx.currentTime,yt=40,tt=new Float32Array(yt+1),ht=new Float32Array(yt+1);for(let Ut=0;Ut<=yt;Ut++){const ne=Ut/yt;tt[Ut]=Math.sin(ne*Math.PI/2),ht[Ut]=Math.cos(ne*Math.PI/2)}V.gain.gain.cancelScheduledValues(A),V.gain.gain.setValueCurveAtTime(tt,A,T),B.gain.gain.cancelScheduledValues(A),B.gain.gain.setValueCurveAtTime(ht,A,T),gt=window.setTimeout(()=>R(),Math.round(T*1e3))}function R(){if(gt=null,!kt||!ft||!at||xt===null){kt=!1;return}const s=ft,T=at,H=xt;kt=!1,ft=null,at=null,xt=null;try{s.pause(),s.currentTime=0}catch{}_(s,1),_(T,1),m=T,q=H,G(x[H],{resetProgress:!1})}function G(s,T){F||$t(),F&&(F.textContent=s.title||"Unknown Title"),$&&($.textContent=s.artist||"Unknown Artist"),S&&(S.textContent=s.album||""),st&&(st.textContent=s.codec||"AUDIO"),rt&&(rt.textContent=s.specs||""),s.cover&&E?(E.src=s.cover,E.style.display="block",f&&(f.style.display="none")):(E&&(E.style.display="none"),f&&(f.style.display="grid")),p&&(p.max=String(s.duration||240),T.resetProgress?p.value="0":p.value=String(Math.floor(m.currentTime||0)),wt()),M&&(M.textContent=mt(s.duration)),h&&(h.textContent=T.resetProgress?"0:00":mt(m.currentTime||0)),Ct(),Ge(s.cover||null),document.querySelectorAll(".track-row").forEach((H,Q)=>{var nt;H.classList.toggle("active",((nt=x[Q])==null?void 0:nt.id)===s.id)}),"mediaSession"in navigator&&(navigator.mediaSession.metadata=new MediaMetadata({title:s.title,artist:s.artist,album:s.album,artwork:s.cover?[{src:s.cover,sizes:"512x512",type:"image/jpeg"}]:[]}),navigator.mediaSession.setActionHandler("play",()=>Rt()),navigator.mediaSession.setActionHandler("pause",()=>Jt()),navigator.mediaSession.setActionHandler("previoustrack",()=>Xt()),navigator.mediaSession.setActionHandler("nexttrack",()=>pt()),navigator.mediaSession.setActionHandler("seekto",H=>{H.seekTime&&(m.currentTime=H.seekTime)}));try{const{cover:H,...Q}=s;localStorage.setItem("melo-current-track",JSON.stringify(Q))}catch{}window.dispatchEvent(new CustomEvent("lumi:trackChange",{detail:s})),N("melo:track-changed",s),N("melo:playback-state",{track:s,currentTime:m.currentTime||0,paused:m.paused})}async function Y(s,T=!0,H){if(!x.length)return;P(),s<0&&(s=x.length-1),s>=x.length&&(s=0),q=s;const Q=x[s];if(Q){if(F||$t(),_(m,1),m.src=await Ht(Q.path),m.load(),H&&H>0){const nt=()=>{m.removeEventListener("loadedmetadata",nt);try{m.currentTime=H}catch{}};m.addEventListener("loadedmetadata",nt)}G(Q,{resetProgress:!0}),T&&Rt()}}let K=!1;async function ct(){try{await te(t).resume()}catch{}K&&(K=!1,m.play().then(()=>{a&&(a.style.display="none"),n&&(n.style.display="block")}).catch(()=>{}))}window.addEventListener("pointerdown",ct),window.addEventListener("keydown",ct),ot("melo:pref-changed",s=>{s&&s.key==="replayGainGlobal"&&Ct(),s&&s.key==="showStopBtn"&&Mt(!!s.value),s&&s.key==="crossfade"&&!s.value&&P()}),ot("melo:request-playback-state",()=>{const s=x[q]||null;N("melo:playback-state",{track:s,currentTime:m.currentTime||0,paused:m.paused})}),ot("melo:seek-playback",s=>{const T=Number(s);Number.isFinite(T)&&T>=0&&(m.currentTime=T)});let St=null,ut=!1;const Yt=500;function ee(s,T,H){St&&cancelAnimationFrame(St);const Q=m.volume,nt=performance.now(),d=b=>{const B=Math.min(1,(b-nt)/T);m.volume=Q+(s-Q)*B,B<1?St=requestAnimationFrame(d):(St=null,H==null||H())};St=requestAnimationFrame(d)}async function Rt(){try{await te(t).resume()}catch{}const s=localStorage.getItem("melo-pref-fadePause")!=="0",T=z();s&&ut&&(m.volume=0),m.play().then(()=>{K=!1,a&&(a.style.display="none"),n&&(n.style.display="block"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="playing"),s&&ut?(ut=!1,ee(T,Yt)):m.volume=T}).catch(()=>{K||(K=!0,e("Click once inside player to begin audio playback"))})}function Jt(){P(),localStorage.getItem("melo-pref-fadePause")!=="0"&&!m.paused?(ut=!0,ee(0,Yt,()=>m.pause())):(ut=!1,m.pause()),a&&(a.style.display="block"),n&&(n.style.display="none"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused");const T=x[q];if(T)try{localStorage.setItem("melo-resume-state",JSON.stringify({trackId:T.id,position:m.currentTime}))}catch{}}function ae(){m.paused?Rt():Jt()}function pe(){P(),m.pause();try{m.currentTime=0}catch{}a&&(a.style.display="block"),n&&(n.style.display="none"),p&&(p.value="0",wt()),h&&(h.textContent="0:00"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}function pt(){if(!x.length)return;if(P(),U==="one"){m.currentTime=0,Rt();return}const s=et();if(s===null){Jt();return}Y(s)}function Xt(){if(!x.length)return;if(P(),m.currentTime>3){m.currentTime=0;return}let s=q-1;X&&(s=Math.floor(Math.random()*x.length)),s<0&&(U==="all"?s=x.length-1:s=0),Y(s)}function Ct(){if(!(!x[q]||!v)&&(m.volume=z(),kt&&at&&xt!==null)){const s=x[xt];s&&(at.volume=D(s))}}function Mt(s=localStorage.getItem("melo-pref-showStopBtn")==="1"){const T=lt("btnStop","stop");T&&T.style.setProperty("display",s?"inline-flex":"none","important")}function $t(){if(i=lt("btnPlay","play"),a=lt("iconPlay","play-icon"),n=lt("iconPause","pause-icon"),o=lt("btnPrev","prev"),l=lt("btnNext","next"),c=lt("btnShuffle","shuffle"),u=lt("btnRepeat","repeat"),r=lt("btnStop","stop"),Mt(),p=lt("seekBar","seek"),v=lt("volBar","volume"),h=lt("curTime","current-time"),M=lt("durTime","duration"),C=lt("volPct","volume-pct"),k=lt("volIcon","volume-icon"),k&&(k.onclick=()=>At()),It(),F=lt("trackTitle","title"),$=lt("trackArtist","artist"),S=lt("trackAlbum","album"),st=lt("trackCodec","codec"),rt=lt("trackSpecs","specs"),E=lt("coverImg","cover"),f=lt("coverFallback","cover-fallback"),i&&(i.onclick=ae),r&&(r.onclick=pe),o&&(o.onclick=Xt),l&&(l.onclick=pt),c&&(c.onclick=()=>{X=!X,c.classList.toggle("active",X),e(X?"Shuffle on":"Shuffle off")}),u&&(u.onclick=()=>{U=U==="off"?"all":U==="all"?"one":"off",u.classList.toggle("active",U!=="off");const s={off:"Repeat off",all:"Repeat all",one:"Repeat one"};e(s[U]),u.title=s[U]}),p&&(p.oninput=()=>{j=!0,h&&(h.textContent=mt(parseFloat(p.value))),wt()},p.onchange=()=>{P(),m.currentTime=parseFloat(p.value),j=!1}),v&&(v.oninput=()=>{Tt(),C&&(C.textContent=v.value+"%"),Ct()}),wt(),Tt(),x[q]){const s=x[q];if(F&&(F.textContent=s.title||"Unknown Title"),$&&($.textContent=s.artist||"Unknown Artist"),S&&(S.textContent=s.album||""),st&&(st.textContent=s.codec||"AUDIO"),rt&&(rt.textContent=s.specs||""),s.cover&&E?(E.src=s.cover,E.style.display="block",f&&(f.style.display="none")):(E&&(E.style.display="none"),f&&(f.style.display="grid")),p){const T=Math.floor(m.duration||s.duration||240);p.max=String(T),p.value=String(Math.floor(m.currentTime||0)),wt()}if(M&&(M.textContent=mt(m.duration||s.duration)),h&&(h.textContent=mt(m.currentTime||0)),v&&C&&(C.textContent=v.value+"%",Tt()),a&&n){const T=!m.paused;a.style.display=T?"none":"block",n.style.display=T?"block":"none"}c&&c.classList.toggle("active",X),u&&u.classList.toggle("active",U!=="off")}}$t(),document.addEventListener("wheel",s=>{const T=s.target;if(!(T!=null&&T.closest("#playerCard"))||!v)return;s.preventDefault();const H=s.deltaY<0?5:-5;v.value=String(Math.max(0,Math.min(100,Number(v.value)+H))),v.dispatchEvent(new Event("input"))},{passive:!1});function ie(s){s.addEventListener("timeupdate",()=>{s===m&&(N("melo:playback-position",s.currentTime||0),!j&&p&&h&&(p.value=String(Math.floor(s.currentTime)),h.textContent=mt(s.currentTime),wt()),we(),O())}),s.addEventListener("loadedmetadata",()=>{var H;if(s!==m||!p||!M)return;const T=Math.floor(s.duration||((H=x[q])==null?void 0:H.duration)||240);p.max=String(T),M.textContent=mt(T),wt()}),s.addEventListener("ended",()=>{s!==m||kt||pt()})}let Nt=null;function we(){Nt||(Nt=setTimeout(()=>{Nt=null;const s=x[q];if(!(!s||m.paused))try{localStorage.setItem("melo-resume-state",JSON.stringify({trackId:s.id,position:m.currentTime}))}catch{}},4e3))}ie(t),window.addEventListener("keydown",s=>{s.target.tagName!=="INPUT"&&(s.code==="Space"&&(s.preventDefault(),ae()),s.code==="ArrowRight"&&(P(),m.currentTime+=5),s.code==="ArrowLeft"&&(P(),m.currentTime-=5),(s.key==="m"||s.key==="M")&&At(),(s.key==="s"||s.key==="S")&&c&&c.click(),(s.key==="r"||s.key==="R")&&u&&u.click(),s.code==="ArrowUp"&&v&&(v.value=String(Math.min(100,parseInt(v.value,10)+5)),v.dispatchEvent(new Event("input"))),s.code==="ArrowDown"&&v&&(v.value=String(Math.max(0,parseInt(v.value,10)-5)),v.dispatchEvent(new Event("input"))))}),ot("melo:tray-action",s=>{s==="play_pause"?ae():s==="next"?pt():s==="prev"?Xt():s==="mute"&&At()}),window.LumiPlayer={get queue(){return x},set queue(s){x=s,window.__LUMI_QUEUE__=s},get currentIndex(){return q},loadTrack:Y,play:Rt,pause:Jt,stop:pe,next:pt,prev:Xt,get audio(){return m},rebind:$t},window.__LUMI_REBIND__=$t,ot("melo:play-tracks",s=>{if(!s||!Array.isArray(s.tracks)||!s.tracks.length)return;P(),x=s.tracks,window.__LUMI_SET_QUEUE__(x);const T=Math.max(0,Math.min(s.index||0,x.length-1));Y(T,!0)})}const xe=new URLSearchParams(location.search).get("panel")||"main",it=t=>String(t!=null?t:"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");function Re(t){const e=Number.isFinite(t)?Math.max(0,t):0;return`${Math.floor(e/60)}:${String(Math.floor(e%60)).padStart(2,"0")}`}function qe(t,e){const i=document.getElementById("trackList"),a=document.getElementById("libraryStats"),n=document.getElementById("searchInput"),o=document.getElementById("searchClear"),l=document.getElementById("libraryTabs"),c=document.getElementById("btn-scan"),u=document.getElementById("btn-clear-library"),r=document.getElementById("winPlaylistTracks"),p=document.getElementById("winPlaylistEmpty"),v=document.getElementById("playlistSelect"),h=document.getElementById("playlistSearchInput"),M=document.getElementById("playlistSearchClear"),C=document.getElementById("playlistSortSelect"),k=document.getElementById("btn-clear-playlist"),F=document.getElementById("btn-export-playlist"),$=document.getElementById("btn-new-playlist");let S=null,st=null,rt=!1,E=localStorage.getItem("melo-currentPlaylist")||"p1",f=[],m=null,g=null,x=!1,q=[];const X=new Map;let U="artists",j=null,et=null,mt=null,wt="",Tt=null;const It=54,At=52;let Ht=0,kt=0,ft=0,at=0,xt=null;const gt=document.createElement("div");gt.className="ctx-menu",gt.style.display="none",gt.innerHTML='<button class="ctx-item danger" id="ctxRemoveLibraryTrack">Remove from Library</button>',document.body.appendChild(gt),document.addEventListener("click",d=>{d.target.closest("#ctxRemoveLibraryTrack")||(gt.style.display="none")}),gt.querySelector("#ctxRemoveLibraryTrack").onclick=async d=>{d.stopPropagation(),!(!S||!xt)&&(await S("delete_tracks",{ids:[xt]}),gt.style.display="none",xt=null,N("melo:library-changed",{removed:1}))};function y(){return new Promise(d=>{const b=document.createElement("div");b.className="confirm-overlay",b.innerHTML=`<div class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="clearLibraryTitle">
        <div id="clearLibraryTitle" class="confirm-title">Clear Library?</div>
        <div class="confirm-message">All tracks will be removed from Library browsing. Your playlists and their tracks will remain unchanged.</div>
        <div class="confirm-actions"><button class="btn small" data-confirm="cancel">Cancel</button><button class="btn small danger-confirm" data-confirm="yes">Clear Library</button></div>
      </div>`,document.body.appendChild(b);const B=W=>{document.removeEventListener("keydown",V),b.remove(),d(W)};b.querySelector("[data-confirm='cancel']").onclick=()=>B(!1),b.querySelector("[data-confirm='yes']").onclick=()=>B(!0),b.onclick=W=>{W.target===b&&B(!1)};const V=W=>{W.key==="Escape"&&(document.removeEventListener("keydown",V),B(!1))};document.addEventListener("keydown",V)})}function w(d){const b=c==null?void 0:c.querySelector(".scan-label");b&&(b.textContent=d)}function L(){o==null||o.classList.toggle("show",!!(n!=null&&n.value))}function I(){M==null||M.classList.toggle("show",!!(h!=null&&h.value))}function _(){r==null||r.querySelectorAll("[data-pl-track]").forEach(d=>{d.classList.toggle("active",d.dataset.plTrack===Tt)})}function P(d){Tt=d,_()}function D(d){if(!d)return"";if(/^(data:|blob:|https?:)/i.test(d))return d;try{return st?st(d):""}catch{return""}}function z(d){return{...d,cover:D(d.cover),source:"scan"}}const O=[],Z=new Set;let R=0;function G(d,b){!d||!S||Z.has(d)||(Z.add(d),O.push({id:d,element:b}),Y())}function Y(){for(;S&&R<2&&O.length;){const d=O.shift();R++,S("ensure_track_artwork",{id:d.id}).then(b=>{if(!b||!d.element.isConnected)return;const B=D(b),V=q.find(W=>W.id===d.id);V&&(V.cover=B),d.element.style.backgroundImage=`url("${B.replace(/"/g,"%22")}")`,d.element.textContent=""}).catch(()=>{}).finally(()=>{R--,Z.delete(d.id),Y()})}}function K(d){const b=[...d.querySelectorAll("[data-artwork-id]")];if(!("IntersectionObserver"in window)){b.forEach(V=>G(V.dataset.artworkId,V));return}const B=new IntersectionObserver(V=>{V.forEach(W=>{if(!W.isIntersecting)return;const A=W.target;B.unobserve(A),G(A.dataset.artworkId,A)})},{root:d,rootMargin:"120px"});b.forEach(V=>B.observe(V))}async function ct(){if(rt)return;if(!vt){rt=!0,St();return}const d=await J(()=>import("./core-DhEqZVGG.js"),[]);S=d.invoke,st=d.convertFileSrc,rt=!0,await Promise.all([ut(),Ct()]),await pt(!0),await Mt(!0)}function St(){i&&(i.innerHTML='<div style="padding:30px;text-align:center;color:var(--text-muted)">The persistent Library is available in the Tauri desktop build.</div>')}async function ut(){if(!(!S||!a))try{const d=await S("library_stats");a.textContent=`${d.tracks} tracks • ${d.artists} artists • ${d.albums} albums`}catch{}}function Yt(){j=et=mt=null,i&&(i.scrollTop=0)}function ee(){return U==="artists"?j?"tracks":"groups":U==="albums"?et?"tracks":"groups":mt?"tracks":"groups"}function Rt(){return U}function Jt(){return U==="artists"&&j?et?`${j} › ${et}`:j:U==="albums"&&et?et:U==="genres"&&mt?mt:""}async function ae(d,b){if(!S)return{items:[],total:0,limit:b,offset:d};if(ee()==="groups")return S("library_groups",{kind:Rt(),search:wt||null,artist:U==="artists"?j:null,limit:b,offset:d});const B=await S("library_tracks",{search:wt||null,artist:j,album:et,genre:mt,sort:"title-asc",limit:b,offset:d});return B.items=B.items.map(z),q=B.items,B}async function pe(d){const b=X.get(d);if(b)return b;if(!S)return[];const B=await S("library_groups",{kind:"albums",search:null,artist:d,limit:500,offset:0});return X.set(d,B.items),B.items}async function pt(d=!1){if(!i||!S)return;d&&(i.scrollTop=0),i.style.display="block",i.style.position="relative",i.style.overflowY="auto";const b=Math.max(300,i.clientHeight||420),B=U==="artists"&&!!j,V=Jt(),W=B?84:V?38:0,A=Math.ceil(b/It),yt=Math.max(0,i.scrollTop-W),tt=Math.max(0,Math.floor(yt/It)-8),ht=Math.max(40,A+16),Ut=++Ht;try{const ne=B&&j?pe(j):Promise.resolve(null),[me,ke]=await Promise.all([ae(tt,ht),ne]);if(Ut!==Ht)return;const ra=me.total*It+W,ca=me.items.map((Vt,le)=>{const oe=me.offset+le,fe=W+oe*It;if(ee()==="groups"){const Zt=Vt,_e=D(Zt.cover),Te=`lib-avatar ${Rt()==="albums"?"lib-avatar-album":""}`,ua=Rt()==="albums"?"💿":it((Zt.name[0]||"?").toUpperCase()),pa=_e?`<div class="${Te}" style="background-image:url('${it(_e)}')"></div>`:`<div class="${Te}" data-artwork-id="${it(Zt.artworkTrackId||"")}">${ua}</div>`;return`<div class="lib-item virtual-row" data-group-index="${le}" style="position:absolute;left:0;right:0;top:${fe}px;height:${It}px">${pa}<div style="flex:1;min-width:0"><div class="t-title">${it(Zt.name)}</div><div class="t-artist">${it(Zt.subtitle||`${Zt.count} tracks`)}</div></div><span class="chev-r">›</span></div>`}const qt=Vt;return`<div class="track-row virtual-row" data-track-id="${it(qt.id)}" data-page-index="${le}" style="position:absolute;left:0;right:0;top:${fe}px;height:${It}px">
          <span class="num">${oe+1}</span>
          ${qt.cover?`<div class="track-cover-mini" style="background-image:url('${it(qt.cover)}');background-size:cover;background-position:center"></div>`:`<div class="track-cover-mini cover-default" data-artwork-id="${it(qt.id)}">♪</div>`}
          <div style="flex:1;min-width:0"><div class="t-title">${it(qt.title)}</div><div class="t-artist">${it(qt.artist)} • ${it(qt.album)}</div></div>
          <span class="t-dur">${Re(qt.duration)}</span>
          <button class="btn small ghost" data-add-track="${it(qt.id)}" title="Add to current playlist">+</button>
        </div>`}).join(""),da=B&&ke?`<div class="artist-detail-header" style="position:sticky;top:0;height:${W}px;z-index:4;background:var(--card)">
            <div class="lib-crumb" style="height:38px"><button class="btn small" id="virtualBack">‹ Artists</button><b>${it(j)}</b></div>
            <div class="chip-row artist-album-chips custom-scrollbar" style="height:46px;padding-top:6px;padding-bottom:6px">
              <button class="chip ${et===null?"active":""}" data-artist-album="all">All Tracks</button>
              ${ke.map((Vt,le)=>{const oe=D(Vt.cover),fe=oe?`<span class="chip-thumb" style="background-image:url('${it(oe)}')"></span>`:`<span class="chip-thumb cover-default" data-artwork-id="${it(Vt.artworkTrackId||"")}">♪</span>`;return`<button class="chip ${et===Vt.name?"active":""}" data-artist-album-index="${le}">${fe}${it(Vt.name)}</button>`}).join("")}
            </div>
          </div>`:V?`<div class="lib-crumb virtual-crumb" style="position:sticky;top:0;height:${W}px;z-index:3;background:var(--card)"><button class="btn small" id="virtualBack">‹ Back</button><b>${it(V)}</b></div>`:"";i.innerHTML=`<div class="virtual-list-space" style="position:relative;height:${Math.max(ra,b)}px">${da}${ca}</div>`,Xt(me.items,ke||[]),K(i)}catch{i.innerHTML='<div style="padding:24px;text-align:center;color:var(--text-muted)">Could not read the Library database.</div>'}}function Xt(d,b=[]){var B,V;i&&(i.querySelectorAll("[data-group-index]").forEach(W=>{W.onclick=()=>{const A=d[Number(W.dataset.groupIndex||0)],yt=(A==null?void 0:A.name)||"",tt=(A==null?void 0:A.key)||yt;if(U==="artists"&&!j)j=yt;else if(U==="artists"&&j||U==="albums"){const ht=tt.split("\0");U==="albums"&&(j=ht[0]||null),et=ht[1]||yt}else U==="genres"&&(mt=yt);pt(!0)}}),i.querySelectorAll("[data-add-track]").forEach(W=>{W.onclick=async A=>{A.stopPropagation(),!(!S||!W.dataset.addTrack)&&(await S("add_tracks_to_playlist",{playlistId:E,trackIds:[W.dataset.addTrack]}),N("melo:playlist-changed",{playlistId:E}))}}),i.querySelectorAll("[data-track-id]").forEach(W=>{W.onclick=async A=>{if(A.target.closest("[data-add-track]"))return;const yt=Number(W.dataset.pageIndex||0),tt=d.filter(ht=>"path"in ht).map(z);S&&tt.length&&(await S("replace_playlist_tracks",{playlistId:E,trackIds:tt.map(ht=>ht.id)}),N("melo:playlist-changed",{playlistId:E})),N("melo:play-tracks",{tracks:tt,index:yt})},W.oncontextmenu=A=>{A.preventDefault(),A.stopPropagation(),xt=W.dataset.trackId||null,gt.style.display="block";const yt=gt.getBoundingClientRect();gt.style.left=`${Math.max(6,Math.min(A.clientX,window.innerWidth-yt.width-6))}px`,gt.style.top=`${Math.max(6,Math.min(A.clientY,window.innerHeight-yt.height-6))}px`}}),(B=i.querySelector("#virtualBack"))==null||B.addEventListener("click",()=>{U==="artists"&&j?(j=null,et=null):et?et=null:j?j=null:mt=null,pt(!0)}),(V=i.querySelector("[data-artist-album='all']"))==null||V.addEventListener("click",()=>{et=null,pt(!0)}),i.querySelectorAll("[data-artist-album-index]").forEach(W=>{W.onclick=()=>{const A=b[Number(W.dataset.artistAlbumIndex||0)];et=(A==null?void 0:A.name)||null,pt(!0)}}))}async function Ct(){var d;S&&(f=await S("list_playlists"),f.some(b=>b.id===E)||(E=((d=f[0])==null?void 0:d.id)||"p1"),localStorage.setItem("melo-currentPlaylist",E),v&&(v.innerHTML=f.map(b=>`<option value="${it(b.id)}" ${b.id===E?"selected":""}>${it(b.name)} (${b.trackCount})</option>`).join("")))}async function Mt(d=!1){if(!r||!S)return;d&&(r.scrollTop=0),r.style.display="block",r.style.position="relative",r.style.overflowY="auto";const b=Math.max(260,r.clientHeight||420),B=Math.max(0,Math.floor(r.scrollTop/At)-8),V=Math.max(40,Math.ceil(b/At)+16),W=++kt,A=await S("playlist_tracks",{playlistId:E,search:(h==null?void 0:h.value)||null,sort:(C==null?void 0:C.value)||"default",limit:V,offset:B});if(W!==kt)return;if(A.items=A.items.map(z),q=A.items,p&&(p.style.display=A.total?"none":"block"),r.style.display=A.total?"block":"none",!A.total){r.innerHTML="";return}const yt=A.items.map((tt,ht)=>`<div class="track-row virtual-row ${tt.id===Tt?"active":""}" data-pl-track="${it(tt.id)}" data-page-index="${ht}" style="position:absolute;left:0;right:0;top:${(A.offset+ht)*At}px;height:${At}px"><span class="num">${A.offset+ht+1}</span>${tt.cover?`<div class="track-cover-mini" style="background-image:url('${it(tt.cover)}');background-size:cover;background-position:center"></div>`:`<div class="track-cover-mini cover-default" data-artwork-id="${it(tt.id)}">♪</div>`}<div style="flex:1;min-width:0"><div class="t-title">${it(tt.title)}</div><div class="t-artist">${it(tt.artist)} • ${it(tt.album)}</div></div><span class="t-dur">${Re(tt.duration)}</span><button class="btn small ghost" data-remove-track="${it(tt.id)}">×</button></div>`).join("");r.innerHTML=`<div style="position:relative;height:${Math.max(b,A.total*At)}px">${yt}</div>`,K(r),r.querySelectorAll("[data-pl-track]").forEach(tt=>{tt.onclick=ht=>{ht.target.closest("[data-remove-track]")||N("melo:play-tracks",{tracks:A.items,index:Number(tt.dataset.pageIndex||0)})}}),r.querySelectorAll("[data-remove-track]").forEach(tt=>{tt.onclick=async ht=>{ht.stopPropagation(),await S("remove_track_from_playlist",{playlistId:E,trackId:tt.dataset.removeTrack}),N("melo:playlist-changed",{playlistId:E})}})}async function $t(d,b){return S?S(d,b):null}async function ie(d,b="replace"){if(await ct(),!S||!d.length)return[];const V=(await S("import_audio_files",{paths:d,playlistId:b==="none"?null:E,replacePlaylist:b==="replace"})).map(z);return await Promise.all([ut(),Ct(),pt(),Mt()]),N("melo:library-changed",{imported:V.length}),V}async function Nt(d,b=!1){if(await ct(),!S)return null;if(m)return m;const B=await S("start_library_scan",{path:d});return m=B.scanId,g=B.scanId,x=b,c&&w("Cancel Scan"),m}async function we(){if(!vt)return;if(m&&S){await S("cancel_library_scan",{scanId:m});return}const{open:d}=await J(async()=>{const{open:B}=await import("./index-CS3Qnt9j.js");return{open:B}},__vite__mapDeps([5,1])),b=await d({directory:!0,multiple:!1});b&&await Nt(b)}async function s(d){if(await ct(),!S)return null;const b=await S("get_track_by_id",{id:d});return b?z(b):null}l==null||l.querySelectorAll("[data-libtab]").forEach(d=>{d.onclick=()=>{l.querySelectorAll("[data-libtab]").forEach(b=>b.classList.remove("active")),d.classList.add("active"),U=d.dataset.libtab||"artists",Yt(),pt(!0)}}),n==null||n.addEventListener("input",()=>{L(),wt=n.value.trim(),window.clearTimeout(ft),ft=window.setTimeout(()=>pt(!0),180)}),o==null||o.addEventListener("click",()=>{n&&(n.value="",n.focus(),L(),wt="",window.clearTimeout(ft),pt(!0))}),i==null||i.addEventListener("scroll",()=>{window.clearTimeout(ft),ft=window.setTimeout(()=>pt(),60)}),r==null||r.addEventListener("scroll",()=>{window.clearTimeout(at),at=window.setTimeout(()=>Mt(),60)}),h==null||h.addEventListener("input",()=>{I(),window.clearTimeout(at),at=window.setTimeout(()=>Mt(!0),180)}),M==null||M.addEventListener("click",()=>{h&&(h.value="",h.focus(),I(),window.clearTimeout(at),Mt(!0))}),C==null||C.addEventListener("change",()=>Mt(!0)),v==null||v.addEventListener("change",()=>{E=v.value,localStorage.setItem("melo-currentPlaylist",E),Mt(!0)}),c==null||c.addEventListener("click",we),u==null||u.addEventListener("click",async()=>{if(S){if(m){alert("Cancel the active scan before clearing the Library database.");return}await y()&&(await S("clear_library_database"),q=[],X.clear(),await Promise.all([ut(),Ct(),pt(!0),Mt(!0)]),N("melo:library-changed",{cleared:!0}))}}),k==null||k.addEventListener("click",async()=>{await $t("clear_playlist",{playlistId:E}),await Promise.all([Ct(),Mt(!0)]),N("melo:playlist-changed",{playlistId:E})}),$==null||$.addEventListener("click",async()=>{var B;const d=(B=prompt("New playlist name:"))==null?void 0:B.trim();if(!d)return;const b=await $t("create_playlist",{name:d});b&&(E=b.id),await Promise.all([Ct(),Mt(!0)])}),F==null||F.addEventListener("click",async()=>{var W;if(!S)return;const d=[];let b=0;for(;;){const A=await S("playlist_tracks",{playlistId:E,search:null,sort:"default",limit:500,offset:b});if(d.push(...A.items),b+=A.items.length,b>=A.total||!A.items.length)break}if(!d.length)return;const B=`#EXTM3U
`+d.map(A=>`#EXTINF:${Math.floor(A.duration)},${A.artist} - ${A.title}
${A.path}`).join(`
`),V=document.createElement("a");V.href=URL.createObjectURL(new Blob([B],{type:"audio/x-mpegurl"})),V.download=`${((W=f.find(A=>A.id===E))==null?void 0:W.name)||"playlist"}.m3u`,V.click(),setTimeout(()=>URL.revokeObjectURL(V.href),1e3)}),vt&&J(async()=>{const{getCurrentWebviewWindow:d}=await import("./webviewWindow-mjQkSB26.js");return{getCurrentWebviewWindow:d}},__vite__mapDeps([6,7,1,0,8])).then(({getCurrentWebviewWindow:d})=>{d().onDragDropEvent(async b=>{if(b.payload.type!=="drop")return;const B=b.payload.paths||[];if(!B.length)return;const V=await ie(B,xe==="playlist"?"append":"replace");if(V.length)xe!=="playlist"&&N("melo:play-tracks",{tracks:V,index:0});else for(const W of B)try{await Nt(W,xe!=="playlist")}catch{}})}).catch(()=>{}),ot("melo:scan-progress",async d=>{if(d){if(d.scanId&&(m=d.scanId),c&&!d.finished&&w(`Cancel ${d.done||0}/${d.total||"…"}`),c){const b=d.total?Math.max(0,Math.min(100,Number(d.done||0)/Number(d.total)*100)):0;c.style.setProperty("--scan-progress",`${b}%`),c.classList.toggle("scanning",!d.finished)}if(d.finished){if(d.scanId===g&&x&&!d.cancelled&&S){await S("replace_playlist_from_scan",{playlistId:E,scanId:d.scanId});const V=(await S("playlist_tracks",{playlistId:E,search:null,sort:"default",limit:100,offset:0})).items.map(z);V.length&&N("melo:play-tracks",{tracks:V,index:0}),N("melo:playlist-changed",{playlistId:E})}m=null,g=null,x=!1,c&&(w("Scan"),c.classList.remove("scanning"),c.style.setProperty("--scan-progress","0%")),await Promise.all([ut(),Ct(),pt(),Mt()])}}});let T=0;ot("melo:library-changed",()=>{X.clear(),window.clearTimeout(T),T=window.setTimeout(()=>{ut(),pt(),Mt()},500)}),ot("melo:playlist-changed",()=>{Ct(),Mt()}),ot("melo:track-changed",d=>P((d==null?void 0:d.id)||null)),ot("melo:playback-state",d=>{var b;return P(((b=d==null?void 0:d.track)==null?void 0:b.id)||null)});try{const d=JSON.parse(localStorage.getItem("melo-current-track")||"null");d!=null&&d.id&&P(d.id)}catch{}N("melo:request-playback-state"),setTimeout(()=>N("melo:request-playback-state"),250);function H(){return E}async function Q(d){if(!S||!d)return[];try{return(await S("playlist_tracks",{playlistId:d,search:null,sort:"default",limit:2e4,offset:0})).items.map(z)}catch{return[]}}async function nt(){if(!S)return[];try{return(await S("library_tracks",{search:null,artist:null,album:null,genre:null,sort:"title-asc",limit:2e4,offset:0})).items.map(z)}catch{return[]}}window.LumiLibrary={get tracks(){return q},get playlists(){return f},scanFolder:Nt,importPaths:ie,getTrack:s,getCurrentPlaylistId:H,getPlaylistTracksAll:Q,getAllTracks:nt,render:()=>pt(),addTracks:()=>{},addToCurrentPlaylist:async d=>{!S||!d.length||(await S("add_tracks_to_playlist",{playlistId:E,trackIds:d.map(b=>b.id)}),N("melo:playlist-changed",{playlistId:E}))},currentPlaylistName:()=>{var d;return((d=f.find(b=>b.id===E))==null?void 0:d.name)||"Playlist"}},ct().catch(()=>e("Could not initialize the Library database"))}const de={flat:[0,0,0,0,0,0,0,0,0,0],pop:[-1,2,4,4,2,-1,-1,2,3,3],rock:[4,3,2,-1,-2,-2,1,3,4,4],bass:[6,5,4,2,1,0,-1,-1,-2,-3],treble:[-3,-2,-1,0,1,2,3,5,6,6],dance:[5,4,2,0,-1,-1,2,4,5,3],jazz:[2,1,2,3,2,0,1,2,3,2],classical:[3,2,1,0,0,0,-1,2,3,4],vocal:[-2,-1,0,2,4,4,3,1,0,-1],acoustic:[3,2,1,1,2,2,3,3,2,1],hiphop:[5,4,1,2,-1,-1,1,-1,2,3],metal:[4,2,-1,-2,-1,1,3,4,5,4]};function Se(t){for(const[e,i]of Object.entries(de))if(i.every((a,n)=>a===t[n]))return e;return"custom"}function De(t,e,i={}){const a=!!i.remote,n=document.getElementById("eqEnable"),o=document.getElementById("eqPreset"),l=document.getElementById("btnEqReset"),c=document.getElementById("eqBands"),u=document.getElementById("eqCanvas"),r=u?u.getContext("2d"):null;let p=null,v=[],h=[],M=new Array(re.length).fill(0);try{const f=JSON.parse(localStorage.getItem("melo-eq-gains")||"null");Array.isArray(f)&&f.length===re.length&&(M=f.map(m=>typeof m=="number"?Math.max(-12,Math.min(12,m)):0))}catch{}let C=localStorage.getItem("melo-eq-preset")||Se(M),k=localStorage.getItem("melo-eq-enabled")!=="0";function F(){if(!p)try{const f=te(t);p=f.ctx,v=f.filters,v.forEach((m,g)=>{m.gain.value=k?M[g]:0})}catch{}}function $(f,m){F(),v[f]&&k&&(v[f].gain.value=m)}function S(f){F(),M=[...f],k&&f.forEach((m,g)=>{v[g]&&(v[g].gain.value=m)}),E()}function st(f){F(),k=f,f?M.forEach((m,g)=>{v[g]&&(v[g].gain.value=m)}):v.forEach(m=>{m.gain.value=0}),E()}a||t&&t.addEventListener("play",()=>{F(),(p==null?void 0:p.state)==="suspended"&&p.resume().catch(()=>{})}),ot("melo:eq",f=>{f&&(f.type==="gain"?(a||$(f.idx,f.val),M[f.idx]=f.val,h[f.idx]&&(h[f.idx].value=String(f.val),rt(h[f.idx])),o&&(o.value=Se(M)),E()):f.type==="gains"?(a||S(f.values),M=[...f.values],h.length&&h.forEach((m,g)=>{m.value=String(M[g]),rt(m)}),o&&f.preset&&(o.value=f.preset),E()):f.type==="enable"&&(k=!!f.on,a||st(k),n&&(n.checked=k),E()))});function rt(f){var x;const m=parseInt(f.value),g=(x=f.parentElement)==null?void 0:x.querySelector(".val");g&&(g.textContent=(m>0?"+":"")+m+"dB")}function E(){if(!u||!r)return;const f=window.devicePixelRatio||1,m=u.clientWidth*f,g=u.clientHeight*f;if(m<=0||g<=0)return;u.width=m,u.height=g,r.clearRect(0,0,m,g);const x=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#2a7bd6",q=M;if(!k){r.strokeStyle="rgba(100,120,150,0.25)",r.lineWidth=2*f,r.beginPath(),r.moveTo(0,g/2),r.lineTo(m,g/2),r.stroke();return}r.strokeStyle=x,r.lineWidth=2.5*f,r.lineJoin="round",r.beginPath(),q.forEach((X,U)=>{const j=U/(q.length-1)*m,et=g/2-X/12*(g/2-10*f);if(U===0)r.moveTo(j,et);else{const mt=(U-1)/(q.length-1)*m,wt=g/2-q[U-1]/12*(g/2-10*f);r.quadraticCurveTo((mt+j)/2,wt,j,et)}}),r.stroke(),q.forEach((X,U)=>{const j=U/(q.length-1)*m,et=g/2-X/12*(g/2-10*f);r.fillStyle=x,r.beginPath(),r.arc(j,et,4*f,0,Math.PI*2),r.fill(),r.fillStyle="white",r.beginPath(),r.arc(j,et,2*f,0,Math.PI*2),r.fill()}),r.strokeStyle="rgba(100,120,150,0.3)",r.lineWidth=1*f,r.setLineDash([4*f,4*f]),r.beginPath(),r.moveTo(0,g/2),r.lineTo(m,g/2),r.stroke(),r.setLineDash([])}c&&(c.innerHTML="",re.forEach((f,m)=>{const g=M[m]||0,x=document.createElement("div");x.className="eq-band",x.innerHTML=`
        <input type="range" min="-12" max="12" value="${g}" step="1" data-idx="${m}" orient="vertical" />
        <label>${f>=1e3?f/1e3+"k":f}</label>
        <span style="font-size:10px;color:var(--text-muted);min-height:12px;" class="val">${(g>0?"+":"")+g+"dB"}</span>
      `,c.appendChild(x)}),h=Array.from(c.querySelectorAll("input")),h.forEach(f=>{f.addEventListener("input",()=>{const m=parseInt(f.dataset.idx),g=parseInt(f.value);rt(f),M[m]=g,E();const x=Se(M);o&&(o.value=x),localStorage.setItem("melo-eq-gains",JSON.stringify(M)),localStorage.setItem("melo-eq-preset",x),a||$(m,g),N("melo:eq",{type:"gain",idx:m,val:g,values:M})})})),o&&(o.value=C,o.addEventListener("change",()=>{const f=de[o.value]||de.flat;h.length&&h.forEach((m,g)=>{m.value=String(f[g]),rt(m)}),M=[...f],E(),localStorage.setItem("melo-eq-gains",JSON.stringify(M)),localStorage.setItem("melo-eq-preset",o.value),a||S(f),N("melo:eq",{type:"gains",values:f,preset:o.value}),e(`Preset: ${o.options[o.selectedIndex].text}`)})),l&&l.addEventListener("click",()=>{const f=de.flat;h.length&&h.forEach((m,g)=>{m.value="0",rt(m)}),M=[...f],o&&(o.value="flat"),localStorage.setItem("melo-eq-gains",JSON.stringify(M)),localStorage.setItem("melo-eq-preset","flat"),a||S(f),N("melo:eq",{type:"gains",values:f,preset:"flat"}),E(),e("Equalizer reset to Flat (0dB)")}),n&&(n.checked=k,n.addEventListener("change",()=>{k=n.checked,localStorage.setItem("melo-eq-enabled",k?"1":"0"),a||st(k),N("melo:eq",{type:"enable",on:k}),E(),e(k?"Equalizer On":"Equalizer off — Flat")})),u&&new ResizeObserver(()=>E()).observe(u),E(),window.LumiEqualizer={presets:de,frequencies:re,displayGains:M,reset:()=>l==null?void 0:l.click()}}const se=[{id:"bars",label:"Classic Bars"},{id:"thin",label:"Thin Bars"},{id:"line",label:"Spectrum Line"},{id:"mirror",label:"Mirror Bars"},{id:"wave",label:"Oscilloscope"},{id:"spectrumWave",label:"Spectrum Wave"},{id:"blocks",label:"Block Equalizer"}];function $e(){return document.getElementById("vizBars")||document.querySelector('[data-melo="visualizer"]')}function Sa(t){let e=$e();if(!e)return;let i=k(e),a=i.getContext("2d"),n=null,o=null,l=null,c=null,u=null,r=!1,p=localStorage.getItem("melo-viz-mode")||"bars";se.some(y=>y.id===p)||(p="bars");let v=0,h=[],M=.45,C=null;function k(y){let w=y.querySelector("canvas");return w||(y.innerHTML="",w=document.createElement("canvas"),y.appendChild(w)),w}function F(){if(!(o&&l))try{const y=te(t);n=y.ctx,o=y.analyser,l=new Uint8Array(o.frequencyBinCount),c=new Uint8Array(o.fftSize)}catch{r=!0}}function $(y){const w=l.length,L=((n==null?void 0:n.sampleRate)||44100)/2,I=45,_=Math.min(15e3,L*.95),P=Math.log(I),D=Math.log(_),z=[];for(let O=0;O<y;O++){const Z=Math.exp(P+(D-P)*O/y),R=Math.exp(P+(D-P)*(O+1)/y);let G=Math.floor(Z/L*w),Y=Math.max(G+1,Math.ceil(R/L*w));G<0&&(G=0),Y>w&&(Y=w);let K=0;for(let ct=G;ct<Y;ct++)K+=l[ct];z.push(K/(Y-G)/255)}return z}function S(y){const w=performance.now()/1e3,L=Math.pow(Math.abs(Math.sin(w*2.2)),2.5),I=[];for(let _=0;_<y;_++){let P=.42+.26*Math.sin(w*1.35+_*.62)+.2*Math.sin(w*2.9+_*1.31)+Math.random()*.07;P*=.55+.5*L,I.push(Math.max(.04,Math.min(1,P)))}return I}function st(y){const w=performance.now()/1e3,L=.5+.5*Math.pow(Math.abs(Math.sin(w*1.9)),2);for(let I=0;I<y.length;I++){const _=I/y.length;y[I]=128+66*L*(Math.sin(_*Math.PI*6+w*7)*.6+Math.sin(_*Math.PI*13-w*11)*.4)}}function rt(y){let w;if(r||!o||!l)w=S(y);else if(o.getByteFrequencyData(l),w=$(y),!w.some(_=>_>.01)&&!t.paused)w=S(y);else for(let _=0;_<y;_++)w[_]*=1+1.7*(_/Math.max(1,y-1));let L=0;for(const I of w)I>L&&(L=I);L>M?M=L:M=Math.max(.35,M*.985),h.length!==y&&(h=new Array(y).fill(0));for(let I=0;I<y;I++){const _=Math.min(1,w[I]/M),P=_>h[I]?.55:.16;h[I]+=(_-h[I])*P}return h}function E(y,w){return getComputedStyle(document.documentElement).getPropertyValue(y).trim()||w}function f(){return i.width/Math.max(1,i.clientWidth)||1}function m(y,w,L,I,_){if(_=Math.min(_,L/2,I/2),a.roundRect){a.roundRect(y,w,L,I,_);return}a.rect(y,w,L,I)}function g(){const y=window.devicePixelRatio||1,w=i.clientWidth||(e==null?void 0:e.clientWidth)||200,L=i.clientHeight||(e==null?void 0:e.clientHeight)||56;w>0&&L>0&&(i.width=Math.round(w*y),i.height=Math.round(L*y))}new ResizeObserver(g).observe(i),g();function x(y,w,L,I){const _=f(),P=E("--visualizer","#38bdf8"),D=E("--accent","#0284c7"),z=y.length,O=w/z,Z=Math.max(1.2*_,O*(1-I));for(let R=0;R<z;R++){const G=y[R],Y=Math.max(2*_,G*(L-4*_)),K=R*O+(O-Z)/2,ct=L-Y-1*_,St=a.createLinearGradient(0,ct,0,L);St.addColorStop(0,D),St.addColorStop(1,P),a.fillStyle=St,a.beginPath(),m(K,ct,Z,Y,Math.min(Z/2,3.5*_)),a.fill()}}function q(y,w,L){const I=f(),_=E("--visualizer","#38bdf8"),P=E("--accent","#0284c7"),D=y.length,z=w/D,O=L/2,Z=Math.max(1.5*I,z*.62);for(let R=0;R<D;R++){const G=Math.max(1.5*I,y[R]*(L/2-3*I)),Y=R*z+(z-Z)/2,K=a.createLinearGradient(0,O-G,0,O+G);K.addColorStop(0,P),K.addColorStop(.5,_),K.addColorStop(1,P),a.fillStyle=K,a.beginPath(),m(Y,O-G,Z,G*2,Math.min(Z/2,3*I)),a.fill()}}function X(y,w,L){const I=f(),_=E("--visualizer","#38bdf8"),P=E("--accent","#0284c7"),D=y.length,z=[],O=[];for(let R=0;R<D;R++)z.push((R+.5)/D*w),O.push(L-2*I-y[R]*(L-8*I));a.beginPath(),a.moveTo(z[0],L),a.lineTo(z[0],O[0]);for(let R=1;R<D;R++){const G=(z[R-1]+z[R])/2;a.quadraticCurveTo(z[R-1],O[R-1],G,(O[R-1]+O[R])/2)}a.lineTo(z[D-1],O[D-1]),a.lineTo(z[D-1],L),a.closePath();const Z=a.createLinearGradient(0,0,0,L);Z.addColorStop(0,_),Z.addColorStop(1,"transparent"),a.globalAlpha=.18,a.fillStyle=Z,a.fill(),a.globalAlpha=1,a.beginPath(),a.moveTo(z[0],O[0]);for(let R=1;R<D;R++){const G=(z[R-1]+z[R])/2;a.quadraticCurveTo(z[R-1],O[R-1],G,(O[R-1]+O[R])/2)}a.lineTo(z[D-1],O[D-1]),a.strokeStyle=P,a.lineWidth=2*I,a.lineJoin="round",a.stroke()}function U(y,w,L){const I=f(),_=E("--visualizer","#38bdf8"),P=E("--accent","#0284c7"),D=L/2,z=y.length,O=y.map((G,Y)=>{const K=Y/Math.max(1,z-1),ct=Math.pow(Math.sin(Math.PI*K),.28);return Math.max(.7*I,G*ct*(L*.46))}),Z=G=>{a.beginPath();for(let Y=0;Y<z;Y++){const K=Y/Math.max(1,z-1)*w,ct=D+(G?-O[Y]:O[Y]);if(Y===0)a.moveTo(K,ct);else{const St=(Y-1)/Math.max(1,z-1)*w,ut=D+(G?-O[Y-1]:O[Y-1]);a.quadraticCurveTo(St,ut,(St+K)/2,(ut+ct)/2)}}};Z(!0);for(let G=z-1;G>=0;G--){const Y=G/Math.max(1,z-1)*w;a.lineTo(Y,D+O[G])}a.closePath();const R=a.createLinearGradient(0,0,0,L);R.addColorStop(0,P),R.addColorStop(.5,_),R.addColorStop(1,P),a.fillStyle=R,a.globalAlpha=.3,a.fill(),a.globalAlpha=.18,a.shadowColor=_,a.shadowBlur=8*I,Z(!0),a.strokeStyle=_,a.lineWidth=4*I,a.stroke(),Z(!1),a.stroke(),a.shadowBlur=0,a.globalAlpha=1,Z(!0),a.strokeStyle=P,a.lineWidth=1.2*I,a.stroke(),Z(!1),a.stroke(),a.beginPath(),a.moveTo(0,D),a.lineTo(w,D),a.strokeStyle=_,a.globalAlpha=.45,a.lineWidth=.8*I,a.stroke(),a.globalAlpha=1}function j(y,w,L){const I=f(),_=E("--visualizer","#38bdf8"),P=E("--accent","#0284c7"),D=y.length,z=8,O=Math.max(1*I,w*.0035),Z=Math.max(1*I,L*.025),R=Math.max(1,(w-O*(D-1))/D),G=Math.max(1,(L-Z*(z-1))/z),Y=a.createLinearGradient(0,0,0,L);Y.addColorStop(0,P),Y.addColorStop(1,_),a.fillStyle=Y;for(let K=0;K<D;K++){const ct=Math.max(1,Math.min(z,Math.round(y[K]*z))),St=K*(R+O);for(let ut=0;ut<ct;ut++){const Yt=L-(ut+1)*G-ut*Z;a.globalAlpha=.58+.42*((ut+1)/z),a.fillRect(St,Yt,R,G)}}a.globalAlpha=1}function et(){const y=i.width,w=i.height,L=f(),I=E("--accent","#0284c7");let _;r||!o||!c?(u||(u=new Uint8Array(1024)),st(u),_=u):(o.getByteTimeDomainData(c),_=c);const P=()=>{a.beginPath();for(let D=0;D<=y;D+=2){const z=Math.min(_.length-1,Math.floor(D/y*_.length)),O=_[z]/255*w;D===0?a.moveTo(D,O):a.lineTo(D,O)}};P(),a.strokeStyle=I,a.globalAlpha=.16,a.lineWidth=6*L,a.lineJoin="round",a.stroke(),P(),a.globalAlpha=1,a.lineWidth=1.8*L,a.stroke()}function mt(){const y=i.width,w=i.height;if(!y||!w)return;if(a.clearRect(0,0,y,w),p==="wave"){et();return}const L=p==="bars"?16:p==="thin"?56:p==="line"?64:p==="spectrumWave"?72:p==="blocks"?22:24,I=parseInt((e==null?void 0:e.dataset.bars)||"",10),_=Number.isFinite(I)&&I>0?I:L,P=rt(_);p==="bars"?x(P,y,w,.34):p==="thin"?x(P,y,w,.32):p==="line"?X(P,y,w):p==="mirror"?q(P,y,w):p==="spectrumWave"?U(P,y,w):p==="blocks"&&j(P,y,w)}function wt(){v=requestAnimationFrame(wt),mt()}function Tt(){v||wt()}function It(y,w=!1){p=y,h=[],localStorage.setItem("melo-viz-mode",y)}function At(){return C||(C=document.createElement("div"),C.className="viz-menu",C.style.display="none",document.body.appendChild(C),C)}function Ht(){const y=At();y.innerHTML='<div class="viz-menu-label">Visualizer type</div>'+se.map(w=>`<button class="viz-menu-item ${w.id===p?"active":""}" data-mode="${w.id}">${w.id===p?"✓":""}<span>${w.label}</span></button>`).join(""),y.querySelectorAll("[data-mode]").forEach(w=>{w.addEventListener("click",L=>{L.stopPropagation(),It(w.dataset.mode),ft()})})}function kt(y,w){Ht();const L=C;L.style.display="block";const I=L.getBoundingClientRect();L.style.left=Math.max(8,Math.min(y,window.innerWidth-I.width-8))+"px",L.style.top=Math.max(8,Math.min(w,window.innerHeight-I.height-8))+"px"}function ft(){C&&(C.style.display="none")}function at(){e&&(e.title="Click: next mode • Right-click: choose mode",e.addEventListener("click",()=>{ft();const y=se.findIndex(w=>w.id===p);It(se[(y+1)%se.length].id)}),e.addEventListener("contextmenu",y=>{y.preventDefault(),y.stopPropagation(),kt(y.clientX,y.clientY)}))}document.addEventListener("click",y=>{C&&C.style.display!=="none"&&!C.contains(y.target)&&ft()}),document.addEventListener("keydown",y=>{y.key==="Escape"&&ft()});function xt(){F(),Tt(),(n==null?void 0:n.state)==="suspended"&&n.resume().catch(()=>{})}t.addEventListener("play",xt),xt(),at(),document.addEventListener("visibilitychange",()=>{document.hidden?(cancelAnimationFrame(v),v=0):Tt()});function gt(){cancelAnimationFrame(v),v=0,e=$e(),e&&(i=k(e),a=i.getContext("2d"),new ResizeObserver(g).observe(i),g(),at(),Tt())}window.__LUMI_REBIND_VISUALIZER__=gt}function Oe(t){if(!t||!t.trim())return{isSynced:!1,lines:[],raw:""};const e=[],i=t.split(/\r?\n/),a=/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;let n=!1;for(const o of i){const l=o.trim();if(!l||/^\[[a-z]{2,8}:/i.test(l))continue;const c=[...l.matchAll(a)];if(c.length>0){n=!0;const u=l.replace(a,"").trim();for(const r of c){const p=parseInt(r[1],10),v=parseInt(r[2],10),h=r[3]||"0",M=h.length===2?parseInt(h,10)*10:h.length===1?parseInt(h,10)*100:parseInt(h.slice(0,3),10),C=p*60+v+M/1e3;e.push({time:C,text:u})}}else e.push({time:-1,text:l})}return e.sort((o,l)=>o.time-l.time),{isSynced:n,lines:e,raw:t}}function He(t,e){var C;const i=document.getElementById("lyricsContainer"),a=document.getElementById("lyricsStatus"),n=document.getElementById("lyricsTrackTitle");let o={isSynced:!1,lines:[]},l=null,c=-1,u=0;async function r(k){if(k.lyrics&&k.lyrics.trim().length>0)return k.lyrics;if(window.__TAURI__)try{const{invoke:F}=await J(async()=>{const{invoke:S}=await import("./core-DhEqZVGG.js");return{invoke:S}},[]),$=await F("get_track_lyrics",{path:k.path});if($)return $}catch{}return null}async function p(k){if(!k){l=null,o={isSynced:!1,lines:[],raw:""},n&&(n.textContent="No track playing"),v();return}l=k.id,n&&(n.textContent=`${k.title} — ${k.artist}`);const F=await r(k);o=Oe(F||""),v()}function v(){if(i){if(i.innerHTML="",c=-1,!o.lines.length){a&&(a.style.display="block",a.innerHTML='No synced lyrics found (.lrc)<br/><span style="font-size:10.5px; opacity:0.7;">Place a matching .lrc file in the song folder or add lyrics in the tag editor.</span>');return}a&&(a.style.display="none"),o.lines.forEach((k,F)=>{const $=document.createElement("div");$.className="lyric-line",$.dataset.idx=String(F),$.dataset.time=String(k.time),$.textContent=k.text||"♪",k.time>=0&&($.style.cursor="pointer",$.title=`Seek to ${Math.floor(k.time/60)}:${Math.floor(k.time%60).toString().padStart(2,"0")}`,$.addEventListener("click",()=>{N("melo:seek-playback",k.time),window.__TAURI__||(t.currentTime=k.time,t.play().catch(()=>{}))})),i.appendChild($)})}}function h(){if(!i||!o.isSynced||!o.lines.length)return;const k=window.__TAURI__?u:t.currentTime;let F=-1;for(let $=0;$<o.lines.length&&o.lines[$].time<=k;$++)F=$;if(F!==c){c=F;const $=i.querySelectorAll(".lyric-line");if($.forEach((S,st)=>{S.classList.toggle("active",st===c),S.classList.toggle("passed",st<c)}),c>=0&&$[c]){const S=$[c],st=i.clientHeight,E=S.offsetTop-i.offsetTop-st/2+S.clientHeight/2;i.scrollTo({top:Math.max(0,E),behavior:"smooth"})}}}t.addEventListener("timeupdate",h),window.addEventListener("lumi:trackChange",k=>{p(k.detail)}),ot("melo:track-changed",k=>{p(k)}),ot("melo:playback-state",k=>{k&&(u=Number(k.currentTime)||0,k.track&&k.track.id!==l?p(k.track):h())}),ot("melo:playback-position",k=>{u=Number(k)||0,h()});const M=window.__LUMI_QUEUE__;if(Array.isArray(M)&&M.length>0)p(M[((C=window.LumiPlayer)==null?void 0:C.currentIndex)||0]);else try{const k=JSON.parse(localStorage.getItem("melo-current-track")||"null");k&&p(k)}catch{}N("melo:request-playback-state"),setTimeout(()=>N("melo:request-playback-state"),250),window.LumiLyrics={loadTrackLyrics:p,parseLRC:Oe}}const Ma=(t,e,i)=>{const a=t[e];return a?typeof a=="function"?a():Promise.resolve(a):new Promise((n,o)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(o.bind(null,new Error("Unknown variable dynamic import: "+e+(e.split("/").length!==i?". Note that variables only represent file names one level deep.":""))))})},Ke={code:"en",name:"English",nativeName:"English",authors:["Melo Team"]},Ee={_meta:Ke,"settings.tabs.general":"General","settings.tabs.playback":"Playback","settings.tabs.appearance":"Appearance & Skin","settings.tabs.shortcuts":"Shortcuts","settings.tabs.about":"About","settings.general.language.label":"Language","settings.general.language.desc":"Interface language — more languages coming via community translation","settings.general.tray.label":"Close to system tray","settings.general.tray.desc":"Minimize to system tray on window close","settings.general.resume.label":"Resume playback on reopen","settings.general.resume.desc":"Continue playback of the previous track where you left off","settings.playback.replaygain.label":"ReplayGain normalization","settings.playback.replaygain.desc":"Equalize track volume levels automatically","settings.playback.fadepause.label":"Fade out on pause","settings.playback.fadepause.desc":"Smooth 0.5s fade-out on pause, fade back in on resume","settings.playback.crossfade.label":"Crossfade","settings.playback.crossfade.desc":"Smoothly blend the end of one track into the start of the next","settings.playback.crossfadeDuration.label":"Crossfade duration","settings.playback.crossfadeDuration.desc":"How long the transition between tracks lasts (1–12 seconds)","settings.appearance.showstop.label":"Show Stop button","settings.appearance.showstop.desc":"Display a Stop control next to Play/Pause in the player"},Ea=Object.freeze(Object.defineProperty({__proto__:null,_meta:Ke,default:Ee},Symbol.toStringTag,{value:"Module"})),Qe=[{code:"en",nativeName:"English"}],Wt={en:Ee};let ta=Wt.en,ea="en";function La(){return ea}async function aa(t){if(Qe.some(e=>e.code===t)||(t="en"),!Wt[t])if(t==="en")Wt.en=Ee;else try{const e=await Ma(Object.assign({"./locales/en.json":()=>J(()=>Promise.resolve().then(()=>Ea),void 0)}),`./locales/${t}.json`,3);Wt[t]=e.default||e}catch{t="en"}ea=t,ta=Wt[t]||Wt.en,localStorage.setItem("melo-pref-language",t),document.dispatchEvent(new CustomEvent("melo:locale-changed",{detail:t}))}function dt(t){var e,i;return(i=(e=ta[t])!=null?e:Wt.en[t])!=null?i:t}function Ne(){const t=localStorage.getItem("melo-pref-language")||"en";aa(t)}const ia=document.querySelector("#app");ia.innerHTML=`
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
          <button class="settings-tab active" data-stab="general"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>${dt("settings.tabs.general")}</button>
          <button class="settings-tab" data-stab="playback"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4z"/></svg>${dt("settings.tabs.playback")}</button>
          <button class="settings-tab" data-stab="appearance"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>${dt("settings.tabs.appearance")}</button>
          <button class="settings-tab" data-stab="shortcuts"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M18 14h.01M9 14h6"/></svg>${dt("settings.tabs.shortcuts")}</button>
          <button class="settings-tab" data-stab="about"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>${dt("settings.tabs.about")}</button>
        </div>

        <!-- GENERAL TAB -->
        <div class="settings-section active" data-panel="general">
          <div class="settings-row">
            <div><div class="label">${dt("settings.general.language.label")}</div><div class="desc">${dt("settings.general.language.desc")}</div></div>
            <select class="settings-select" id="setLanguage">${Qe.map(t=>`<option value="${t.code}">${t.nativeName}</option>`).join("")}</select>
          </div>
          <div class="settings-row">
            <div><div class="label">${dt("settings.general.tray.label")}</div><div class="desc">${dt("settings.general.tray.desc")}</div></div>
            <div class="switch" id="swTray" data-key="tray"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">${dt("settings.general.resume.label")}</div><div class="desc">${dt("settings.general.resume.desc")}</div></div>
            <div class="switch on" id="swResume" data-key="resume"></div>
          </div>
        </div>

        <!-- PLAYBACK TAB -->
        <div class="settings-section" data-panel="playback">
          <div class="settings-row">
            <div><div class="label">${dt("settings.playback.replaygain.label")}</div><div class="desc">${dt("settings.playback.replaygain.desc")}</div></div>
            <div class="switch on" id="swReplayGain" data-key="replayGainGlobal"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">${dt("settings.playback.fadepause.label")}</div><div class="desc">${dt("settings.playback.fadepause.desc")}</div></div>
            <div class="switch on" id="swFadePause" data-key="fadePause"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">${dt("settings.playback.crossfade.label")}</div><div class="desc">${dt("settings.playback.crossfade.desc")}</div></div>
            <div class="switch" id="swCrossfade" data-key="crossfade"></div>
          </div>
          <div class="settings-row" id="crossfadeDurationRow">
            <div><div class="label">${dt("settings.playback.crossfadeDuration.label")}</div><div class="desc">${dt("settings.playback.crossfadeDuration.desc")}</div></div>
            <div class="stepper-control">
              <button type="button" class="btn small stepper-btn" id="btnCrossfadeDown" aria-label="Decrease crossfade duration">−</button>
              <input type="range" class="crossfade-range" id="crossfadeDurationRange" min="1" max="12" step="1" value="4" />
              <span class="stepper-value" id="crossfadeDurationValue">4s</span>
              <button type="button" class="btn small stepper-btn" id="btnCrossfadeUp" aria-label="Increase crossfade duration">+</button>
            </div>
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
            <div><div class="label">${dt("settings.appearance.showstop.label")}</div><div class="desc">${dt("settings.appearance.showstop.desc")}</div></div>
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
            <div style="font-size:16px; font-weight:800; color:var(--text); margin-bottom:4px;">Melo 0.5.2 Beta</div>
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
`;const bt=new URLSearchParams(location.search).get("panel");bt&&(document.documentElement.classList.add("panel-window",`panel-${bt}`),document.body.classList.add("panel-window",`panel-${bt}`));var We,Fe;if(vt&&bt){J(async()=>{const{getCurrentWindow:a}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:a}},__vite__mapDeps([8,7,1,0])).then(({getCurrentWindow:a})=>{const n=a();Aa(n,"melo-geo-panel-"+bt),n.onCloseRequested(()=>{N("melo:panel-closed",bt)}),window.addEventListener("beforeunload",()=>{N("melo:panel-closed",bt)})});const t=document.getElementById("win-"+bt),e=((We=t==null?void 0:t.querySelector(".float-title"))==null?void 0:We.innerHTML)||"",i=((Fe=t==null?void 0:t.querySelector(".float-body"))==null?void 0:Fe.innerHTML)||"";ia.innerHTML=`
<div class="panel-root">
  <div class="panel-titlebar" data-tauri-drag-region>
    <div class="panel-title" data-tauri-drag-region>${e}</div>
    <div class="win-controls">
      <button class="win-btn" aria-label="minimize" title="Minimize">—</button>
      <button class="win-btn close" aria-label="close" title="Close">×</button>
    </div>
  </div>
  <div class="panel-body">${i}</div>
  <div id="toast" class="toast"></div>
</div>`}vt&&!bt&&(document.documentElement.classList.add("tauri-main"),document.body.classList.add("tauri-main"),document.querySelectorAll(".side-actions .sbtn").forEach(t=>t.classList.remove("active")),J(async()=>{const{WebviewWindow:t}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:t}},__vite__mapDeps([6,7,1,0,8])).then(({WebviewWindow:t})=>{const e=async()=>{var i;for(const a of["library","playlist","equalizer","lyrics","settings"])try{const n=await t.getByLabel("panel-"+a);(i=document.getElementById(Le[a]))==null||i.classList.toggle("active",!!n)}catch{}};e(),setInterval(e,1200)}));vt&&!bt&&(J(()=>import("./window-BWd3Cypy.js"),__vite__mapDeps([8,7,1,0])).then(async({getCurrentWindow:t})=>{const e=t(),i=()=>{const l=localStorage.getItem("melo-active-skin-id")||"default";if(l==="compact-pill"||typeof l=="string"&&l.startsWith("compact-pill"))return{w:780,h:138,resizable:!1,fixed:!0,custom:!1,force:!0,minW:780,minH:138,maxW:780,maxH:138};if(l!=="default"){const u=ba();if(u){const r=Number.isFinite(u.width)&&Number.isFinite(u.height)&&(u.width||0)>0&&(u.height||0)>0;return{w:u.width||0,h:u.height||0,resizable:u.resizable!==!1,fixed:!1,custom:!0,force:r,minW:u.minWidth,minH:u.minHeight,maxW:u.maxWidth,maxH:u.maxHeight}}return{w:0,h:0,resizable:!0,fixed:!1,custom:!0,force:!1,minW:void 0,minH:void 0,maxW:void 0,maxH:void 0}}return{w:960,h:240,resizable:!0,fixed:!1,custom:!1,force:!0,minW:650,minH:135,maxW:1e4,maxH:260}},a=async l=>{try{const{LogicalSize:c}=await J(async()=>{const{LogicalSize:u}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:u}},__vite__mapDeps([7,1]));if(l.fixed)await e.setMinSize(new c(l.w,l.h)),await e.setMaxSize(new c(l.w,l.h));else if(l.custom){const u=l.minW||240,r=l.minH||120,p=Math.max(u,l.maxW||1e4),v=Math.max(r,l.maxH||1e4);await e.setMinSize(new c(u,r)),await e.setMaxSize(new c(p,v))}else await e.setMinSize(new c(650,135)),await e.setMaxSize(new c(1e4,260));await e.setResizable(l.resizable)}catch{}},n=(l,c,u,r)=>{let p=Number.isFinite(l)&&l>0?l:c;return u!=null&&p<u&&(p=u),r!=null&&p>r&&(p=r),p};try{const l=JSON.parse(localStorage.getItem("melo-geo-main")||"null"),{LogicalPosition:c,LogicalSize:u}=await J(async()=>{const{LogicalPosition:p,LogicalSize:v}=await import("./dpi-fvP-W2qr.js");return{LogicalPosition:p,LogicalSize:v}},__vite__mapDeps([7,1])),r=i();if(r.force){let p=r.w,v=r.h;l&&!r.fixed&&(r.custom?(p=n(l.w,r.w,r.minW,r.maxW),v=n(l.h,r.h,r.minH,r.maxH)):(p=Math.max(650,l.w),v=r.h)),await e.setSize(new u(p,v))}await a(r),(l==null?void 0:l.x)!=null&&(l==null?void 0:l.y)!=null&&await e.setPosition(new c(l.x,l.y))}catch{}const o=async()=>{try{const l=await e.outerPosition(),c=await e.innerSize();localStorage.setItem("melo-geo-main",JSON.stringify({x:l.x,y:l.y,w:c.width,h:c.height}))}catch{}};e.onMoved(o),e.onResized(async()=>{try{const l=i(),{LogicalSize:c}=await J(async()=>{const{LogicalSize:u}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:u}},__vite__mapDeps([7,1]));if(l.fixed)await e.setSize(new c(l.w,l.h));else if(!l.custom){const r=(await e.innerSize()).toLogical(await e.scaleFactor());(r.width<650||r.height!==l.h)&&await e.setSize(new c(Math.max(650,r.width),l.h))}}catch{}o()}),ot("melo:skin-changed",async l=>{try{!bt&&l&&await Ft(l,Dt,void 0,!1,!1);const c=i();if(c.force){const{LogicalSize:u}=await J(async()=>{const{LogicalSize:r}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:r}},__vite__mapDeps([7,1]));await e.setSize(new u(c.w,c.h))}await a(c),o()}catch{}}),ot("melo:skin-geometry",async()=>{try{const l=i();if(l.force){const{LogicalSize:c}=await J(async()=>{const{LogicalSize:u}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:u}},__vite__mapDeps([7,1]));await e.setSize(new c(l.w,l.h))}await a(l),o()}catch{}}),e.onCloseRequested(async l=>{if(l.preventDefault(),localStorage.getItem("melo-pref-tray")==="1")try{await e.hide();return}catch{}const{WebviewWindow:u}=await J(async()=>{const{WebviewWindow:r}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:r}},__vite__mapDeps([6,7,1,0,8]));for(const r of["library","playlist","equalizer","lyrics","settings"])try{const p=await u.getByLabel("panel-"+r);p&&await p.close()}catch{}try{await e.destroy()}catch{window.close()}})}),J(()=>import("./core-DhEqZVGG.js"),[]).then(async({invoke:t})=>{try{const e=await t("get_cli_tracks");Array.isArray(e)&&e.length>0&&setTimeout(async()=>{const i=window.LumiLibrary,a=e.map(o=>o.path).filter(Boolean),n=await(i==null?void 0:i.importPaths(a,"replace"))||[];n.length&&N("melo:play-tracks",{tracks:n,index:0})},350)}catch{}}),ot("melo:open-files",t=>{if(Array.isArray(t)&&t.length>0){const e=t.map(i=>i.path).filter(Boolean);setTimeout(async()=>{const i=window.LumiLibrary,a=await(i==null?void 0:i.importPaths(e,"replace"))||[];a.length&&N("melo:play-tracks",{tracks:a,index:0})},100)}}));document.addEventListener("contextmenu",t=>{t.preventDefault()});const ge=document.getElementById("toast"),Et=t=>{ge&&(ge.textContent=t,ge.classList.add("show"),setTimeout(()=>ge.classList.remove("show"),2200))},Pt=new Audio;Pt.preload="metadata";Pt.crossOrigin="anonymous";window.__LUMI_AUDIO__=Pt;window.__TOAST__=Et;localStorage.getItem("melo-dynamic-theme")===null&&localStorage.setItem("melo-dynamic-theme","1");let Dt=localStorage.getItem("lumi-theme")||"dark";function ye(t){document.documentElement.setAttribute("data-theme",t),localStorage.setItem("lumi-theme",t),Dt=t}function na(t){ye(t),N("melo:theme",t)}ye(Dt);ot("melo:theme",t=>{(t==="light"||t==="dark")&&ye(t)});setInterval(()=>{const t=localStorage.getItem("lumi-theme");(t==="light"||t==="dark")&&t!==Dt&&ye(t)},1e3);document.body.classList.toggle("show-stop-btn",localStorage.getItem("melo-pref-showStopBtn")==="1");ot("melo:pref-changed",t=>{t&&t.key==="showStopBtn"&&document.body.classList.toggle("show-stop-btn",!!t.value)});const Ia=["win-library","win-playlist","win-equalizer","win-lyrics","win-settings"],ve=document.getElementById("desktop"),_a={btnToggleLibrary:"win-library",btnTogglePlaylist:"win-playlist",btnToggleEq:"win-equalizer",btnToggleLyrics:"win-lyrics",btnOpenSettings:"win-settings",menuToggleLibrary:"win-library",menuTogglePlaylist:"win-playlist",menuToggleEq:"win-equalizer",menuToggleLyrics:"win-lyrics",menuToggleSettings:"win-settings"};function Ta(t){const e=document.getElementById(t);return!!e&&!e.classList.contains("hidden")}const Le={library:"btnToggleLibrary",playlist:"btnTogglePlaylist",equalizer:"btnToggleEq",lyrics:"btnToggleLyrics",settings:"btnOpenSettings"};async function Aa(t,e){const i=async()=>{try{const a=await t.outerPosition(),n=await t.outerSize();localStorage.setItem(e,JSON.stringify({x:a.x,y:a.y,w:n.width,h:n.height}))}catch{}};t.onMoved(i),t.onResized(i)}async function Ca(t){const{WebviewWindow:e}=await J(async()=>{const{WebviewWindow:p}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:p}},__vite__mapDeps([6,7,1,0,8])),i="panel-"+t,a=document.getElementById(Le[t]),n=await e.getByLabel(i);if(n){await n.close(),a==null||a.classList.remove("active");return}const o={library:[430,620],playlist:[440,560],equalizer:[700,440],lyrics:[380,520],settings:[600,540]},l={library:[360,400],playlist:[360,360],equalizer:[620,400],lyrics:[320,360],settings:[500,400]},c={library:"Library",playlist:"Playlist",equalizer:"Equalizer",lyrics:"Lyric",settings:"Settings"},u=o[t]||[420,520];let r=null;try{r=JSON.parse(localStorage.getItem("melo-geo-panel-"+t)||"null")}catch{}new e(i,{url:`/?panel=${t}`,title:c[t]||t,width:(r==null?void 0:r.w)||u[0],height:(r==null?void 0:r.h)||u[1],minWidth:(l[t]||[360,360])[0],minHeight:(l[t]||[360,360])[1],...(r==null?void 0:r.x)!=null?{x:r.x,y:r.y}:{center:!0},decorations:!1,transparent:!0,shadow:!1,skipTaskbar:!0}),a==null||a.classList.add("active")}ot("melo:panel-closed",t=>{var i;const e=Le[t];e&&((i=document.getElementById(e))==null||i.classList.remove("active"))});function Ie(t){if(vt){Ca(t.replace(/^win-/,""));return}const e=Ta(t);ue(t,!e),e||be(document.getElementById(t))}function Pa(t){if(t.classList.contains("hidden")||!ve||window.matchMedia("(max-width: 860px)").matches)return;const e=ve.getBoundingClientRect();if(e.width<=0||e.height<=0)return;const i=t.getBoundingClientRect(),a=Math.min(i.width,e.width),n=Math.min(i.height,e.height);let o=i.left-e.left,l=i.top-e.top;o=Math.max(0,Math.min(e.width-a,o)),l=Math.max(0,Math.min(e.height-n,l)),t.style.left=o+"px",t.style.top=l+"px",t.style.right="auto",t.style.bottom="auto",t.style.transform="none"}function ue(t,e){var n,o,l,c,u,r,p,v,h,M;const i=document.getElementById(t);if(!i)return;i.classList.toggle("hidden",!e),localStorage.setItem("lumiv2-"+t,e?"1":"0"),e&&Pa(i);const a=e;t==="win-library"&&((n=document.getElementById("btnToggleLibrary"))==null||n.classList.toggle("active",a),(o=document.getElementById("menuToggleLibrary"))==null||o.classList.toggle("active",a)),t==="win-playlist"&&((l=document.getElementById("btnTogglePlaylist"))==null||l.classList.toggle("active",a),(c=document.getElementById("menuTogglePlaylist"))==null||c.classList.toggle("active",a)),t==="win-equalizer"&&((u=document.getElementById("btnToggleEq"))==null||u.classList.toggle("active",a),(r=document.getElementById("menuToggleEq"))==null||r.classList.toggle("active",a)),t==="win-lyrics"&&((p=document.getElementById("btnToggleLyrics"))==null||p.classList.toggle("active",a),(v=document.getElementById("menuToggleLyrics"))==null||v.classList.toggle("active",a)),t==="win-settings"&&((h=document.getElementById("btnOpenSettings"))==null||h.classList.toggle("active",a),(M=document.getElementById("menuToggleSettings"))==null||M.classList.toggle("active",a))}bt||Ia.forEach(t=>{const e=localStorage.getItem("lumiv2-"+t);e!==null?ue(t,e==="1"):t==="win-settings"?ue(t,!1):ue(t,!0)});Object.entries(_a).forEach(([t,e])=>{var i;(i=document.getElementById(t))==null||i.addEventListener("click",()=>Ie(e))});document.querySelectorAll("[data-close]").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.close;ue(e,!1)})});let Lt=null,zt=null,Ue=10;function be(t){Ue++,t.style.zIndex=String(Ue),document.querySelectorAll(".float-win").forEach(e=>e.classList.remove("active")),t.classList.add("active")}document.querySelectorAll(".float-win").forEach(t=>{t.addEventListener("mousedown",()=>be(t))});document.querySelectorAll("[data-drag]").forEach(t=>{t.addEventListener("mousedown",e=>{if(e.target.closest("button")||e.target.closest("input")||e.target.closest("select"))return;const i=t.dataset.drag,a=document.getElementById(i);be(a),a.classList.add("dragging");const n=a.getBoundingClientRect();Lt={id:i,startX:e.clientX,startY:e.clientY,initX:n.left,initY:n.top,width:n.width,height:n.height}})});document.querySelectorAll("[data-resize]").forEach(t=>{t.addEventListener("mousedown",e=>{e.stopPropagation();const i=t.dataset.resize,a=document.getElementById(i);be(a),a.classList.add("resizing");const n=a.getBoundingClientRect();zt={id:i,startX:e.clientX,startY:e.clientY,initW:n.width,initH:n.height}})});window.addEventListener("mousemove",t=>{if(Lt){const e=document.getElementById(Lt.id);let i=t.clientX-Lt.startX,a=t.clientY-Lt.startY,n=Lt.initX+i,o=Lt.initY+a;if(ve&&!window.matchMedia("(max-width: 860px)").matches){const l=ve.getBoundingClientRect(),c=l.left,u=l.right-Lt.width,r=l.top,p=l.bottom-Lt.height;n=Math.max(c,Math.min(u,n))-l.left,o=Math.max(r,Math.min(p,o))-l.top}e.style.left=n+"px",e.style.top=o+"px",e.style.right="auto",e.style.bottom="auto",e.style.transform="none"}if(zt){const e=document.getElementById(zt.id);let i=zt.initW+(t.clientX-zt.startX),a=zt.initH+(t.clientY-zt.startY);i=Math.max(260,i),a=Math.max(160,a),e.style.width=i+"px",e.style.height=a+"px"}});window.addEventListener("mouseup",()=>{if(Lt){const t=document.getElementById(Lt.id);t&&(t.classList.remove("dragging"),localStorage.setItem("lumiv2-pos-"+Lt.id,JSON.stringify({left:t.style.left,top:t.style.top}))),Lt=null}if(zt){const t=document.getElementById(zt.id);t&&(t.classList.remove("resizing"),localStorage.setItem("lumiv2-size-"+zt.id,JSON.stringify({width:t.style.width,height:t.style.height}))),zt=null}});async function la(){const t=window.LumiLibrary,e=window.LumiPlayer;if(vt){try{const{open:a}=await J(async()=>{const{open:c}=await import("./index-CS3Qnt9j.js");return{open:c}},__vite__mapDeps([5,1])),n=await a({multiple:!0,filters:[{name:"Audio",extensions:["mp3","flac","wav","aac","ogg","m4a","alac","opus","wma","aiff"]}]});if(!n)return;const o=Array.isArray(n)?n:[n],l=await(t==null?void 0:t.importPaths(o,"replace"))||[];l.length&&(N("melo:play-tracks",{tracks:l,index:0}),Et(`${l.length} file(s) added`))}catch{Et("Error opening files")}return}const i=document.createElement("input");i.type="file",i.multiple=!0,i.accept="audio/*,.mp3,.flac,.wav,.aac,.ogg,.m4a,.alac,.opus,.wma,.aiff",i.onchange=async()=>{const a=Array.from(i.files||[]);if(!a.length)return;const n=[];for(const o of a){const l=o.path,c=l||URL.createObjectURL(o),u=o.name,r=u.lastIndexOf("."),p=r>0?u.slice(0,r):u,v=r>0?u.slice(r+1).toUpperCase():"AUDIO",h={id:l||"imp_"+Math.random().toString(36).slice(2,9),title:p,artist:"Unknown Artist",album:"Single",duration:0,path:c,codec:v,specs:"Local File",source:"import"};await je(o,h),n.push(h)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(o=>e==null?void 0:e.queue.push(o)),N("melo:play-tracks",{tracks:n,index:0}),Et(`${n.length} file(s) added`)},i.click()}async function oa(){const t=window.LumiLibrary,e=window.LumiPlayer;if(vt){try{const{open:a}=await J(async()=>{const{open:l}=await import("./index-CS3Qnt9j.js");return{open:l}},__vite__mapDeps([5,1])),n=await a({directory:!0});if(!n)return;const o=n;await(t==null?void 0:t.scanFolder(o,!0))}catch{Et("Error scanning folder")}return}const i=document.createElement("input");i.type="file",i.webkitdirectory=!0,i.multiple=!0,i.accept="audio/*",i.onchange=async()=>{const a=Array.from(i.files||[]).filter(o=>/\.(mp3|flac|wav|aac|ogg|m4a|alac|opus|wma|aiff)$/i.test(o.name));if(!a.length)return;const n=[];for(const o of a){const l=o.path,c=l||URL.createObjectURL(o),u=o.name,r=u.lastIndexOf("."),p=r>0?u.slice(0,r):u,v=r>0?u.slice(r+1).toUpperCase():"AUDIO",h={id:l||"imp_"+Math.random().toString(36).slice(2,9),title:p,artist:"Unknown Artist",album:"Folder Import",duration:0,path:c,codec:v,specs:"Local File",source:"import"};await je(o,h),n.push(h)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(o=>e==null?void 0:e.queue.push(o)),N("melo:play-tracks",{tracks:n,index:0}),Et(`${n.length} file(s) added from folder`)},i.click()}document.addEventListener("click",t=>{var a;const e=(a=t.target)==null?void 0:a.closest('#btnAddFiles, #btnAddFolder, #btnThemeToggle, [data-melo="add-files"], [data-melo="add-folder"], [data-melo="theme-toggle"]');if(!e)return;const i=e.getAttribute("data-melo")||e.id;i==="btnAddFiles"||i==="add-files"?la():i==="btnAddFolder"||i==="add-folder"?oa():(i==="btnThemeToggle"||i==="theme-toggle")&&na(Dt==="light"?"dark":"light")});window.addEventListener("keydown",t=>{(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="o"&&(t.shiftKey?(t.preventDefault(),oa()):(t.preventDefault(),la())),((t.ctrlKey||t.metaKey)&&t.key===","||t.key==="F2")&&(t.preventDefault(),Ie("win-settings"))});function Ve(t){var f,m;function e(g){document.querySelectorAll(".settings-tab").forEach(x=>{x.classList.toggle("active",x.dataset.stab===g)}),document.querySelectorAll(".settings-section[data-panel]").forEach(x=>{x.classList.toggle("active",x.dataset.panel===g)}),localStorage.setItem("melo-settings-tab",g)}document.querySelectorAll(".settings-tab").forEach(g=>{g.addEventListener("click",()=>e(g.dataset.stab))}),e(localStorage.getItem("melo-settings-tab")||"general"),document.querySelectorAll(".switch[data-key]").forEach(g=>{const x=g.dataset.key,q=localStorage.getItem("melo-pref-"+x);q!==null&&g.classList.toggle("on",q==="1"),g.onclick=()=>{g.classList.toggle("on");const X=g.classList.contains("on");localStorage.setItem("melo-pref-"+x,X?"1":"0"),N("melo:pref-changed",{key:x,value:X})}});const i=document.getElementById("swCrossfade"),a=document.getElementById("crossfadeDurationRow"),n=document.getElementById("crossfadeDurationRange"),o=document.getElementById("crossfadeDurationValue"),l=document.getElementById("btnCrossfadeDown"),c=document.getElementById("btnCrossfadeUp");function u(){const g=localStorage.getItem("melo-pref-crossfade")==="1";a==null||a.classList.toggle("disabled-row",!g)}u(),i==null||i.addEventListener("click",()=>setTimeout(u,0));function r(){if(!n)return;const x=((parseInt(n.value,10)||1)-1)/11*100;n.style.setProperty("--progress",x+"%")}function p(g){const x=Math.min(12,Math.max(1,Math.round(g)));localStorage.setItem("melo-pref-crossfadeDuration",String(x)),n&&(n.value=String(x)),o&&(o.textContent=x+"s"),r(),N("melo:pref-changed",{key:"crossfadeDuration",value:x})}const v=parseInt(localStorage.getItem("melo-pref-crossfadeDuration")||"4",10);{const g=Math.min(12,Math.max(1,Number.isFinite(v)?v:4));n&&(n.value=String(g)),o&&(o.textContent=g+"s"),r()}n&&(n.oninput=()=>p(parseInt(n.value,10))),l==null||l.addEventListener("click",()=>p(parseInt((n==null?void 0:n.value)||"4",10)-1)),c==null||c.addEventListener("click",()=>p(parseInt((n==null?void 0:n.value)||"4",10)+1));const h=document.getElementById("setLanguage");h&&(h.value=La(),h.onchange=async()=>{await aa(h.value),t(`Language set to ${h.options[h.selectedIndex].text} — restart Melo to fully apply`)});const M=document.getElementById("swDynamicTheme");if(M){const g=localStorage.getItem("melo-dynamic-theme")!=="0";M.classList.toggle("on",g),M.onclick=()=>{var U,j;const x=!M.classList.contains("on");M.classList.toggle("on",x),localStorage.setItem("melo-dynamic-theme",x?"1":"0");const q=window.__LUMI_QUEUE__,X=(j=(U=window.LumiPlayer)==null?void 0:U.currentIndex)!=null?j:0;q&&q[X]&&Ge(x?q[X].cover:null)}}const C=document.getElementById("skinSelect"),k=document.getElementById("btnSkinThemeToggle"),F=document.getElementById("btnRefreshSkins"),$=document.getElementById("btnOpenSkinsFolder"),S=document.getElementById("skinThemeIcon"),st=document.getElementById("skinThemeLabel");function rt(g){S&&(S.textContent=g==="dark"?"🌙":"☀️"),st&&(st.textContent=g==="dark"?"Dark":"Light")}rt(Dt),k==null||k.addEventListener("click",()=>{const g=Dt==="dark"?"light":"dark";na(g),rt(g),t(g==="dark"?"Dark theme":"Light theme")}),ot("melo:theme",g=>{(g==="light"||g==="dark")&&rt(g)});async function E(){if(!C)return;const g=localStorage.getItem("melo-active-skin-id")||"default",x=await Xe();C.innerHTML=`
      <option value="default">Default Melo (Standard)</option>
      <option value="compact-pill">Minimal Compact (Pill Bar)</option>
    `,x.forEach(q=>{if(q.filename!=="compact-pill.html"&&q.filename!=="compact-pill-light.html"&&q.filename!=="compact-pill-dark.html"){const X=document.createElement("option");X.value=q.filename,X.textContent=`${q.name} (${q.filename})`,C.appendChild(X)}}),C.value=g}E(),C&&(C.onchange=()=>{const g=C.value;Ft(g,Dt,t)}),F==null||F.addEventListener("click",async()=>{await E();const g=localStorage.getItem("melo-active-skin-id")||"default";Ft(g,Dt,t),t("Skins reloaded from disk")}),$==null||$.addEventListener("click",()=>{Ze(t)}),(f=document.getElementById("btn-reset-skin-settings"))==null||f.addEventListener("click",()=>{Me(t),C&&(C.value="default")}),(m=document.getElementById("btn-settings-reset"))==null||m.addEventListener("click",()=>{localStorage.clear(),t("Settings reset — reloading..."),setTimeout(()=>location.reload(),600)})}function sa(){document.querySelectorAll('.win-btn, [data-melo="minimize"], [data-melo="close"]').forEach(t=>{t.onclick=async()=>{const e=t.getAttribute("aria-label")||t.getAttribute("data-melo");if(window.__TAURI__){const{getCurrentWindow:i}=await J(async()=>{const{getCurrentWindow:n}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:n}},__vite__mapDeps([8,7,1,0])),a=i();e==="minimize"?a.minimize():e==="close"&&a.close()}else e==="close"&&Et("Window close requires the Tauri desktop build")}})}sa();const za=[["btnToggleLibrary","toggle-library","win-library"],["btnTogglePlaylist","toggle-playlist","win-playlist"],["btnToggleEq","toggle-eq","win-equalizer"],["btnToggleLyrics","toggle-lyrics","win-lyrics"],["btnOpenSettings","toggle-settings","win-settings"]];window.__LUMI_REBIND_MAIN__=()=>{sa(),za.forEach(([t,e,i])=>{const a=lt(t,e);a&&(a.onclick=()=>Ie(i))})};const Gt=document.createElement("div");Gt.id="aboutPop";Gt.style.display="none";document.body.appendChild(Gt);document.addEventListener("click",t=>{var e,i;(e=t.target)!=null&&e.closest('#btnAbout, [data-melo="about"]')&&(t.stopPropagation(),Gt.innerHTML=`
    <div class="about-head">Melo <b>0.5.2 Beta</b></div>
    <div style="font-size:11.5px; color:var(--text-soft); margin:6px 0 10px;">
      Modern Windows Music Player<br/>
      Tauri 2 + TypeScript + Rust
    </div>
    <a class="about-link" id="aboutLink" href="https://github.com/Arvanta/Melo" rel="noopener">github.com/Arvanta/Melo ↗</a>`,Gt.style.display=Gt.style.display==="none"?"block":"none",(i=document.getElementById("aboutLink"))==null||i.addEventListener("click",a=>{a.preventDefault();const n="https://github.com/Arvanta/Melo";vt?J(()=>import("./core-DhEqZVGG.js"),[]).then(o=>o.invoke("open_url",{url:n})).catch(()=>window.open(n,"_blank")):window.open(n,"_blank")}))});document.addEventListener("click",t=>{!t.target.closest("#aboutPop")&&!t.target.closest('#btnAbout, [data-melo="about"]')&&(Gt.style.display="none")});vt&&bt?bt==="library"||bt==="playlist"?qe(Pt,Et):bt==="equalizer"?De(Pt,Et,{remote:!0}):bt==="lyrics"?He(Pt):bt==="settings"&&(Ne(),Ve(Et),Be(Et)):(xa(Pt,Et),qe(Pt,Et),De(Pt,Et),Sa(Pt),He(Pt),Be(Et),Ve(Et),Ne(),setTimeout(async()=>{if(localStorage.getItem("melo-pref-resume")!=="0")try{const t=JSON.parse(localStorage.getItem("melo-resume-state")||"null"),e=window.LumiLibrary,i=window.LumiPlayer;if(!(t!=null&&t.trackId)||!e||!i)return;const a=await e.getTrack(t.trackId);if(!a)return;let n=[a],o=0;if(typeof e.getCurrentPlaylistId=="function"&&typeof e.getPlaylistTracksAll=="function"){const l=e.getCurrentPlaylistId();if(l){const c=await e.getPlaylistTracksAll(l),u=c.findIndex(r=>r.id===a.id);u>=0&&(n=c,o=u)}}if(n.length===1&&typeof e.getAllTracks=="function"){const l=await e.getAllTracks(),c=l.findIndex(u=>u.id===a.id);c>=0&&(n=l,o=c)}i.queue=n,i.loadTrack(o,!0,t.position||0)}catch{}},500));
//# sourceMappingURL=index-C6qW4cZ-.js.map
