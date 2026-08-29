const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/event-CNdo2oXa.js","assets/core-DhEqZVGG.js","assets/index-DiyoAAdc.js","assets/index-CHth0gh2.js","assets/index-Bq0iOnRE.js","assets/index-CS3Qnt9j.js","assets/webviewWindow-mjQkSB26.js","assets/dpi-fvP-W2qr.js","assets/window-BWd3Cypy.js"])))=>i.map(i=>d[i]);
(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))e(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&e(l)}).observe(document,{childList:!0,subtree:!0});function i(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function e(n){if(n.ep)return;n.ep=!0;const o=i(n);fetch(n.href,o)}})();const ja="modulepreload",Ya=function(t){return"/"+t},aa={},Q=function(a,i,e){let n=Promise.resolve();if(i&&i.length>0){let l=function(c){return Promise.all(c.map(m=>Promise.resolve(m).then(y=>({status:"fulfilled",value:y}),y=>({status:"rejected",reason:y}))))};document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),u=(d==null?void 0:d.nonce)||(d==null?void 0:d.getAttribute("nonce"));n=l(i.map(c=>{if(c=Ya(c),c in aa)return;aa[c]=!0;const m=c.endsWith(".css"),y=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${y}`))return;const w=document.createElement("link");if(w.rel=m?"stylesheet":ja,m||(w.as="script"),w.crossOrigin="",w.href=c,u&&w.setAttribute("nonce",u),document.head.appendChild(w),m)return new Promise((x,B)=>{w.addEventListener("load",x),w.addEventListener("error",()=>B(new Error(`Unable to preload CSS for ${c}`)))})}))}function o(l){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=l,window.dispatchEvent(d),!d.defaultPrevented)throw l}return n.then(l=>{for(const d of l||[])d.status==="rejected"&&o(d.reason);return a().catch(o)})},wt=typeof window.__TAURI_INTERNALS__<"u"||typeof window.__TAURI__<"u";async function R(t,a){if(wt)try{const{emit:i}=await Q(async()=>{const{emit:e}=await import("./event-CNdo2oXa.js");return{emit:e}},__vite__mapDeps([0,1]));await i(t,a);return}catch{}window.dispatchEvent(new CustomEvent(t,{detail:a}))}function ut(t,a){wt&&Q(async()=>{const{listen:i}=await import("./event-CNdo2oXa.js");return{listen:i}},__vite__mapDeps([0,1])).then(({listen:i})=>{i(t,e=>{a(e.payload)})}).catch(()=>{}),window.addEventListener(t,i=>a(i.detail))}let ia=!1;async function Ka(){if(!ia){ia=!0;try{const t=globalThis;if(typeof t.Buffer>"u"){const a=await Q(()=>import("./index-DiyoAAdc.js").then(i=>i.i),__vite__mapDeps([2,3]));t.Buffer=a.Buffer}typeof t.process>"u"&&(t.process={env:{},browser:!0,nextTick:a=>setTimeout(a,0)})}catch{}}}async function Ja(t,a){var i;try{await Ka();const e=await Q(()=>import("./index-Bq0iOnRE.js").then(c=>c.i),__vite__mapDeps([4,3])),n=e&&typeof e.parseBlob=="function"?e:e.default||e,o=await Promise.race([n.parseBlob(t),new Promise((c,m)=>setTimeout(()=>m(new Error("timeout")),1800))]),l=o==null?void 0:o.common;if(!l)return;l.title&&(a.title=l.title),l.artist?a.artist=l.artist:l.artists&&l.artists[0]&&(a.artist=l.artists[0]),l.album&&(a.album=l.album),l.genre&&l.genre[0]&&(a.genre=l.genre[0]),l.year&&(a.year=l.year);const d=(i=l.picture)==null?void 0:i[0];if(d&&d.data){const c=d.format||"image/jpeg",m=d.data;if(m.length>6e5)return;let y="";const w=8192;for(let x=0;x<m.length;x+=w){const B=m.subarray(x,x+w);y+=String.fromCharCode.apply(null,B)}a.cover=`data:${c};base64,${btoa(y)}`}const u=o==null?void 0:o.format;u&&u.duration&&!a.duration&&(a.duration=Math.floor(u.duration))}catch{}}async function va(t,a,i=1800){return await Ja(t,a),a}async function Xa(t){return new Promise(a=>{if(!t)return a(null);const i=new Image;i.crossOrigin="anonymous",i.onload=()=>{try{const e=document.createElement("canvas"),n=e.getContext("2d");if(!n)return a(null);e.width=40,e.height=40,n.drawImage(i,0,0,40,40);const o=n.getImageData(0,0,40,40).data;let l={r:42,g:123,b:214},d=-1;for(let u=0;u<o.length;u+=4){const c=o[u],m=o[u+1],y=o[u+2];if(o[u+3]<128)continue;const x=Math.max(c,m,y),B=Math.min(c,m,y),H=(x+B)/510,tt=x-B,dt=tt===0?0:tt/(1-Math.abs(2*H-1));if(dt>.25&&H>.25&&H<.82){const g=dt*1.5+(1-Math.abs(H-.5));g>d&&(d=g,l={r:c,g:m,b:y})}}d>0?a(l):a(null)}catch{a(null)}},i.onerror=()=>a(null),i.src=t})}async function ya(t){const a=localStorage.getItem("melo-dynamic-theme")!=="0",i=document.documentElement;if(!a||!t){i.style.removeProperty("--accent"),i.style.removeProperty("--visualizer"),i.style.removeProperty("--accent-glow");return}const e=await Xa(t);if(e){const n=`rgb(${e.r}, ${e.g}, ${e.b})`;i.style.setProperty("--accent",n),i.style.setProperty("--visualizer",n),i.style.setProperty("--accent-glow",`rgba(${e.r}, ${e.g}, ${e.b}, 0.35)`)}else i.style.removeProperty("--accent"),i.style.removeProperty("--visualizer"),i.style.removeProperty("--accent-glow")}const ve=[31,62,125,250,500,1e3,2e3,4e3,8e3,16e3];let Rt=null,Jt=[],ye=null,ue=null;const na=new WeakMap;function ba(){if(Rt)return;const t=window.AudioContext||window.webkitAudioContext;Rt=new t,Jt=ve.map(a=>{const i=Rt.createBiquadFilter();return i.type="peaking",i.frequency.value=a,i.Q.value=1.4,i.gain.value=0,i});for(let a=0;a<Jt.length-1;a++)Jt[a].connect(Jt[a+1]);ye=Rt.createGain(),ye.gain.value=1,ue=Rt.createAnalyser(),ue.fftSize=2048,ue.smoothingTimeConstant=.72,Jt[Jt.length-1].connect(ye),ye.connect(ue),ue.connect(Rt.destination)}function la(t){ba();const a=na.get(t);if(a)return a;try{const i=Rt.createMediaElementSource(t),e=Rt.createGain();e.gain.value=1,i.connect(e),e.connect(Jt[0]);const n={source:i,gain:e};return na.set(t,n),n}catch{return null}}function pe(t){return ba(),la(t),{ctx:Rt,filters:Jt,gain:ye,analyser:ue,async resume(){Rt&&Rt.state==="suspended"&&await Rt.resume().catch(()=>{})},getDeck(a){return la(a)}}}let Nt=null;function lt(t,a){const i=document.getElementById(t);return i||document.querySelector(`[data-melo="${a}"]`)}function Za(t){const a=c=>{const m=t.match(new RegExp(c+`\\s*=\\s*["']?(\\d+)`));return m?parseInt(m[1],10):null},i=a("data-window-width"),e=a("data-window-height"),n=a("data-min-width"),o=a("data-min-height"),l=a("data-max-width"),d=a("data-max-height"),u=!/data-resizable\s*=\s*["\']?false/i.test(t);return i==null&&e==null&&n==null&&o==null&&l==null&&d==null?null:{width:i!=null?i:void 0,height:e!=null?e:void 0,minWidth:n!=null?n:void 0,minHeight:o!=null?o:void 0,maxWidth:l!=null?l:void 0,maxHeight:d!=null?d:void 0,resizable:u}}function Qa(){try{const t=JSON.parse(localStorage.getItem("melo-skin-geometry")||"null");return!t||typeof t!="object"?null:t}catch{}return null}const de=`<!doctype html>
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
<div id="melo-player">
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
`,Ie={"compact-pill.html":de,"compact-pill":de,"compact-pill-light.html":de,"compact-pill-dark.html":de,"compact-pill-light":de,"compact-pill-dark":de},ti=[{id:"compact-pill",name:"Minimal Compact (Light/Dark)",filename:"compact-pill.html"},{id:"full-html-example",name:"Full HTML Example",filename:"full-html-example.html"},{id:"slate",name:"Slate",filename:"slate.html"},{id:"silk-orbit",name:"Silk Orbit",filename:"silk-orbit.html"},{id:"ivory",name:"Ivory",filename:"ivory.html"},{id:"microline",name:"Microline",filename:"microline.html"}];function wa(t){const a=["trackTitle","btnPlay","seekBar","coverImg"];let i=0;for(const n of a)t.includes(n)&&i++;const e=(t.match(/data-melo\s*=/g)||[]).length;return i+=Math.min(e,3),i>=3}function ne(t,a,i=!0){const e=document.getElementById("playerCard");if(!e)return;const n=e._originalHTML||e.innerHTML;e._originalHTML||(e._originalHTML=n),Nt&&(Nt.remove(),Nt=null);let l=[...t.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(w=>w[1]).join(`
`);l&&(Nt=document.createElement("style"),Nt.id="melo-custom-skin",Nt.textContent=l,document.head.appendChild(Nt));const d=wa(t);let u="";const c=t.match(/<body[^>]*>([\s\S]*?)<\/body>/i);c?u=c[1]:u=t.split(/<\/style>/i).pop()||"";const m=document.createElement("div");m.innerHTML=u;const y=m.querySelector("#melo-player")||m.querySelector("#lumi-player");if(y&&(u=y.innerHTML),d&&u.trim().length>20){const w=u.trim();e.innerHTML=w,a&&a("Skin applied"),setTimeout(()=>{var B,H;(B=window.__LUMI_REBIND__)==null||B.call(window);const x=window.__LUMI_AUDIO__;x&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(x),(H=window.__LUMI_REBIND_MAIN__)==null||H.call(window)},40)}else l&&a&&a("Skin CSS applied");if(d){const w=Za(t);w?(localStorage.setItem("melo-skin-geometry",JSON.stringify(w)),i&&R("melo:skin-geometry",w)):localStorage.removeItem("melo-skin-geometry")}localStorage.setItem("melo-custom-skin",t),localStorage.setItem("melo-custom-skin-isFull",d?"1":"0")}function He(t,a=!0){document.documentElement.classList.remove("compact-skin-active"),document.body.classList.remove("compact-skin-active"),document.documentElement.classList.remove("custom-skin-active"),document.body.classList.remove("custom-skin-active"),Nt&&(Nt.remove(),Nt=null);const i=document.getElementById("playerCard");i&&i._originalHTML&&(i.innerHTML=i._originalHTML,setTimeout(()=>{var n,o;(n=window.__LUMI_REBIND__)==null||n.call(window);const e=window.__LUMI_AUDIO__;e&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(e),(o=window.__LUMI_REBIND_MAIN__)==null||o.call(window)},40)),localStorage.removeItem("melo-custom-skin"),localStorage.removeItem("melo-custom-skin-isFull"),localStorage.removeItem("melo-skin-geometry"),localStorage.setItem("melo-active-skin-id","default"),a&&R("melo:skin-changed","default"),t&&t("Switched to Default Melo skin")}async function ka(){if(wt)try{const{invoke:t}=await Q(async()=>{const{invoke:i}=await import("./core-DhEqZVGG.js");return{invoke:i}},[]),a=await t("list_installed_skins");if(Array.isArray(a)&&a.length>0)return a}catch{}return ti}async function ei(t,a,i=!0){if(wt)try{const{invoke:n}=await Q(async()=>{const{invoke:l}=await import("./core-DhEqZVGG.js");return{invoke:l}},[]),o=await n("read_skin_file",{filenameOrPath:t});if(o&&o.trim().length>0)return ne(o,a,i),!0}catch{}try{const n=t.startsWith("skins/")?t:`skins/${t}`,o=await fetch(n);if(o.ok){const l=await o.text();return ne(l,a,i),!0}}catch{}const e=t.replace(/^.*[\\/]/,"");return Ie[e]?(ne(Ie[e],a,i),!0):(a&&a(`Could not load skin: ${t}`),!1)}async function ie(t,a,i,e=!0,n=!0){if(t==="default"){He(i,e);return}let o=t;const l=t==="compact-pill"||t.startsWith("compact-pill"),d=!l;document.documentElement.classList.toggle("compact-skin-active",l),document.body.classList.toggle("compact-skin-active",l),document.documentElement.classList.toggle("custom-skin-active",d),document.body.classList.toggle("custom-skin-active",d),l?o="compact-pill.html":!o.endsWith(".html")&&!o.endsWith(".htm")&&(o=o+".html");let u=!1;l&&Ie[o]?(ne(Ie[o],i,n),u=!0):u=await ei(o,i,n),u&&(localStorage.setItem("melo-active-skin-id",t),e&&R("melo:skin-changed",t))}async function xa(t){if(wt)try{const{invoke:a}=await Q(async()=>{const{invoke:i}=await import("./core-DhEqZVGG.js");return{invoke:i}},[]);await a("open_skins_folder"),t&&t("Opening skins folder...")}catch{t&&t("Could not open skins folder")}else t&&t("Skins are located in the skins/ folder")}function oa(t){const a=document.getElementById("skinUpload"),i=localStorage.getItem("melo-active-skin-id")||"default",e=localStorage.getItem("melo-theme")||"dark";i!=="default"&&setTimeout(()=>{ie(i,e,void 0,!1,!1)},150),ut("melo:theme",n=>{const o=localStorage.getItem("melo-active-skin-id");o&&o!=="default"&&ie(o,n,void 0,!1,!1)}),ut("melo:skin-changed",n=>{if(n&&typeof n=="string"){const o=localStorage.getItem("melo-theme")||"dark";ie(n,o,void 0,!1,!1)}}),a&&a.addEventListener("change",async()=>{var d;const n=(d=a.files)==null?void 0:d[0];if(!n)return;const o=await n.text(),l=n.name;if(wt)try{const{invoke:u}=await Q(async()=>{const{invoke:c}=await import("./core-DhEqZVGG.js");return{invoke:c}},[]);await u("save_custom_skin_file",{filename:l,content:o}),t(`Saved ${l} to skins folder`)}catch{}ne(o,t),localStorage.setItem("melo-active-skin-id",l),R("melo:skin-changed",l),a.value=""}),document.addEventListener("dragover",n=>{var o;[...((o=n.dataTransfer)==null?void 0:o.types)||[]].includes("Files")&&n.preventDefault()}),document.addEventListener("drop",async n=>{var l;const o=[...((l=n.dataTransfer)==null?void 0:l.files)||[]].find(d=>d.name.endsWith(".html")||d.name.endsWith(".htm"));if(o){n.preventDefault();const d=await o.text();if(d.includes("<style")||d.includes("<html")||wa(d)){const u=o.name;if(wt)try{const{invoke:c}=await Q(async()=>{const{invoke:m}=await import("./core-DhEqZVGG.js");return{invoke:m}},[]);await c("save_custom_skin_file",{filename:u,content:d})}catch{}ne(d,t),localStorage.setItem("melo-active-skin-id",u),R("melo:skin-changed",u)}}}),window.LumiSkin={applyCustomSkin:ne,resetSkin:He,applySkinChoice:ie,listInstalledSkins:ka,openSkinsFolderOnDisk:xa}}function ai(t,a){let i,e,n,o,l,d,u,c=null,m,y,w,x,B,H,tt,dt,g,et,D,S,f,p=t,T=null,_=[],Y=0,G=!1,V="off",X=!1;function pt(){if(!_.length)return null;if(V==="one")return Y;let s=Y+1;if(G&&(s=Math.floor(Math.random()*_.length),s===Y&&_.length>1&&(s=(s+1)%_.length)),s>=_.length)if(V==="all")s=0;else return null;return s}window.__LUMI_QUEUE__=_,window.__LUMI_SET_QUEUE__=s=>{_=s,window.__LUMI_QUEUE__=s};function vt(s){if(!isFinite(s))return"0:00";const C=Math.floor(s/60),U=Math.floor(s%60).toString().padStart(2,"0");return`${C}:${U}`}function L(){if(!m)return;const s=parseFloat(m.max)||100,C=parseFloat(m.value)||0,U=s>0?C/s*100:0;m.style.setProperty("--progress",U+"%")}function N(){y&&y.style.setProperty("--vol",y.value+"%")}function ot(){H&&(H.classList.toggle("muted",p.muted),H.title=p.muted?"Unmute":"Mute")}function yt(s=!0){p.muted=!p.muted,gt&&at&&(at.muted=p.muted),ot(),s&&a(p.muted?"Muted":"Unmuted")}async function $t(s){if(!s)return"";if(/^(https?|data|blob):/.test(s))return s;if(wt)try{const{convertFileSrc:C}=await Q(async()=>{const{convertFileSrc:U}=await import("./core-DhEqZVGG.js");return{convertFileSrc:U}},[]);return C(s)}catch{}return s}let gt=!1,Tt=null,at=null,St=null,Ct=null;function Lt(){return localStorage.getItem("melo-pref-crossfade")==="1"}function bt(){const s=parseInt(localStorage.getItem("melo-pref-crossfadeDuration")||"4",10);return Number.isFinite(s)?Math.min(12,Math.max(1,s)):4}function b(){return T||(T=new Audio,T.preload="auto",T.crossOrigin="anonymous",ke(T)),T}function k(){return p===t?b():t}function M(s,C){try{const U=pe(t),nt=U.getDeck(s);nt==null||nt.gain.gain.cancelScheduledValues(U.ctx.currentTime),nt==null||nt.gain.gain.setValueAtTime(C,U.ctx.currentTime)}catch{}}function I(){if(Ct&&(clearTimeout(Ct),Ct=null),!gt){Tt=null,at=null,St=null;return}if(gt=!1,at){M(at,0);try{at.pause(),at.currentTime=0}catch{}}Tt&&M(Tt,1),Tt=null,at=null,St=null}function P(s){var zt;if(!y)return 1;const C=parseInt(y.value,10)/100,nt=localStorage.getItem("melo-pref-replayGainGlobal")!=="0"&&(zt=s==null?void 0:s.replayGain)!=null?zt:0,st=Math.pow(10,nt/20);return Math.min(1,Math.max(0,C*st))}function W(){return P(_[Y])}function F(){if(gt||!Lt()||V==="one"||_.length<=1)return;const s=p.duration;if(!isFinite(s)||s<=0)return;const C=pt();if(C===null)return;const U=s-p.currentTime;if(U<=0)return;const nt=Math.min(bt(),Math.max(1,s*.9));if(U>nt)return;const st=Math.max(.15,Math.min(nt,U));$(C,st)}async function $(s,C){const U=_[s];if(!U)return;gt=!0;const nt=p,st=k();Tt=nt,at=st,St=s;try{st.pause(),st.src=await $t(U.path),st.load()}catch{I();return}if(at!==st||!gt)return;const zt=()=>{st.removeEventListener("error",zt),at===st&&I()};st.addEventListener("error",zt,{once:!0});const Ft=pe(t),ht=Ft.getDeck(nt),me=Ft.getDeck(st);if(!ht||!me){I();return}st.volume=P(U),st.muted=nt.muted;try{await Ft.resume()}catch{}try{await st.play()}catch{I();return}if(at!==st||!gt)return;const kt=Ft.ctx.currentTime,te=40,fe=new Float32Array(te+1),re=new Float32Array(te+1);for(let ee=0;ee<=te;ee++){const ge=ee/te;fe[ee]=Math.sin(ge*Math.PI/2),re[ee]=Math.cos(ge*Math.PI/2)}me.gain.gain.cancelScheduledValues(kt),me.gain.gain.setValueCurveAtTime(fe,kt,C),ht.gain.gain.cancelScheduledValues(kt),ht.gain.gain.setValueCurveAtTime(re,kt,C),Ct=window.setTimeout(()=>q(),Math.round(C*1e3))}function q(){if(Ct=null,!gt||!Tt||!at||St===null){gt=!1;return}const s=Tt,C=at,U=St;gt=!1,Tt=null,at=null,St=null;try{s.pause(),s.currentTime=0}catch{}M(s,1),M(C,1),p=C,Y=U,Z(_[U],{resetProgress:!1})}function Z(s,C){tt||Ot(),tt&&(tt.textContent=s.title||"Unknown Title"),dt&&(dt.textContent=s.artist||"Unknown Artist"),g&&(g.textContent=s.album||""),et&&(et.textContent=s.codec||"AUDIO"),D&&(D.textContent=s.specs||""),s.cover&&S?(S.src=s.cover,S.style.display="block",f&&(f.style.display="none")):(S&&(S.style.display="none"),f&&(f.style.display="grid")),m&&(m.max=String(s.duration||240),C.resetProgress?m.value="0":m.value=String(Math.floor(p.currentTime||0)),L()),x&&(x.textContent=vt(s.duration)),w&&(w.textContent=C.resetProgress?"0:00":vt(p.currentTime||0)),se(),ya(s.cover||null),document.querySelectorAll(".track-row").forEach((U,nt)=>{var st;U.classList.toggle("active",((st=_[nt])==null?void 0:st.id)===s.id)}),"mediaSession"in navigator&&(navigator.mediaSession.metadata=new MediaMetadata({title:s.title,artist:s.artist,album:s.album,artwork:s.cover?[{src:s.cover,sizes:"512x512",type:"image/jpeg"}]:[]}),navigator.mediaSession.setActionHandler("play",()=>Dt()),navigator.mediaSession.setActionHandler("pause",()=>_t()),navigator.mediaSession.setActionHandler("previoustrack",()=>Zt()),navigator.mediaSession.setActionHandler("nexttrack",()=>Ut()),navigator.mediaSession.setActionHandler("seekto",U=>{U.seekTime&&(p.currentTime=U.seekTime)}));try{const{cover:U,...nt}=s;localStorage.setItem("melo-current-track",JSON.stringify(nt))}catch{}window.dispatchEvent(new CustomEvent("lumi:trackChange",{detail:s})),R("melo:track-changed",s),R("melo:playback-state",{track:s,currentTime:p.currentTime||0,paused:p.paused})}async function z(s,C=!0,U){if(!_.length)return;I(),s<0&&(s=_.length-1),s>=_.length&&(s=0),Y=s;const nt=_[s];if(nt){if(tt||Ot(),M(p,1),p.src=await $t(nt.path),p.load(),U&&U>0){const st=()=>{p.removeEventListener("loadedmetadata",st);try{p.currentTime=U}catch{}};p.addEventListener("loadedmetadata",st)}Z(nt,{resetProgress:!0}),C?Dt():(e&&(e.style.display="block"),n&&(n.style.display="none"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused"))}}let j=!1;async function K(){try{await pe(t).resume()}catch{}j&&(j=!1,p.play().then(()=>{e&&(e.style.display="none"),n&&(n.style.display="block")}).catch(()=>{}))}window.addEventListener("pointerdown",K),window.addEventListener("keydown",K),ut("melo:pref-changed",s=>{s&&s.key==="replayGainGlobal"&&se(),s&&s.key==="showStopBtn"&&Qt(!!s.value),s&&s.key==="crossfade"&&!s.value&&I()}),ut("melo:request-playback-state",()=>{const s=_[Y]||null;R("melo:playback-state",{track:s,currentTime:p.currentTime||0,paused:p.paused})}),ut("melo:seek-playback",s=>{const C=Number(s);Number.isFinite(C)&&C>=0&&(p.currentTime=C)});let it=null,mt=!1;const At=500;function Mt(s,C,U){it&&cancelAnimationFrame(it);const nt=p.volume,st=performance.now(),zt=Ft=>{const ht=Math.min(1,(Ft-st)/C);p.volume=nt+(s-nt)*ht,ht<1?it=requestAnimationFrame(zt):(it=null,U==null||U())};it=requestAnimationFrame(zt)}async function Dt(){try{await pe(t).resume()}catch{}const s=localStorage.getItem("melo-pref-fadePause")!=="0",C=W();s&&mt&&(p.volume=0),p.play().then(()=>{j=!1,e&&(e.style.display="none"),n&&(n.style.display="block"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="playing"),s&&mt?(mt=!1,Mt(C,At)):p.volume=C}).catch(()=>{j||(j=!0,a("Click once inside player to begin audio playback"))})}function _t(){I(),localStorage.getItem("melo-pref-fadePause")!=="0"&&!p.paused?(mt=!0,Mt(0,At,()=>p.pause())):(mt=!1,p.pause()),e&&(e.style.display="block"),n&&(n.style.display="none"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused");const C=_[Y];if(C)try{localStorage.setItem("melo-resume-state",JSON.stringify({trackId:C.id,position:p.currentTime}))}catch{}}function Xt(){p.paused?Dt():_t()}function oe(){I(),p.pause();try{p.currentTime=0}catch{}e&&(e.style.display="block"),n&&(n.style.display="none"),m&&(m.value="0",L()),w&&(w.textContent="0:00"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}function Ut(){if(!_.length)return;if(I(),V==="one"){p.currentTime=0,Dt();return}const s=pt();if(s===null){_t();return}z(s)}function Zt(){if(!_.length)return;if(I(),p.currentTime>3){p.currentTime=0;return}let s=Y-1;G&&(s=Math.floor(Math.random()*_.length)),s<0&&(V==="all"?s=_.length-1:s=0),z(s)}function se(){if(!(!_[Y]||!y)&&(p.volume=W(),gt&&at&&St!==null)){const s=_[St];s&&(at.volume=P(s))}}function Qt(s=localStorage.getItem("melo-pref-showStopBtn")==="1"){const C=lt("btnStop","stop");C&&C.style.setProperty("display",s?"inline-flex":"none","important")}function Ot(){if(i=lt("btnPlay","play"),e=lt("iconPlay","play-icon"),n=lt("iconPause","pause-icon"),o=lt("btnPrev","prev"),l=lt("btnNext","next"),d=lt("btnShuffle","shuffle"),u=lt("btnRepeat","repeat"),c=lt("btnStop","stop"),Qt(),m=lt("seekBar","seek"),y=lt("volBar","volume"),w=lt("curTime","current-time"),x=lt("durTime","duration"),B=lt("volPct","volume-pct"),H=lt("volIcon","volume-icon"),H&&(H.onclick=()=>yt()),ot(),tt=lt("trackTitle","title"),dt=lt("trackArtist","artist"),g=lt("trackAlbum","album"),et=lt("trackCodec","codec"),D=lt("trackSpecs","specs"),S=lt("coverImg","cover"),f=lt("coverFallback","cover-fallback"),i&&(i.onclick=Xt),c&&(c.onclick=oe),o&&(o.onclick=Zt),l&&(l.onclick=Ut),d&&(d.onclick=()=>{G=!G,d.classList.toggle("active",G),a(G?"Shuffle on":"Shuffle off")}),u&&(u.onclick=()=>{V=V==="off"?"all":V==="all"?"one":"off",u.classList.toggle("active",V!=="off");const s={off:"Repeat off",all:"Repeat all",one:"Repeat one"};a(s[V]),u.title=s[V]}),m&&(m.oninput=()=>{X=!0,w&&(w.textContent=vt(parseFloat(m.value))),L()},m.onchange=()=>{I(),p.currentTime=parseFloat(m.value),X=!1}),y&&(y.oninput=()=>{N(),B&&(B.textContent=y.value+"%"),se()}),L(),N(),_[Y]){const s=_[Y];if(tt&&(tt.textContent=s.title||"Unknown Title"),dt&&(dt.textContent=s.artist||"Unknown Artist"),g&&(g.textContent=s.album||""),et&&(et.textContent=s.codec||"AUDIO"),D&&(D.textContent=s.specs||""),s.cover&&S?(S.src=s.cover,S.style.display="block",f&&(f.style.display="none")):(S&&(S.style.display="none"),f&&(f.style.display="grid")),m){const C=Math.floor(p.duration||s.duration||240);m.max=String(C),m.value=String(Math.floor(p.currentTime||0)),L()}if(x&&(x.textContent=vt(p.duration||s.duration)),w&&(w.textContent=vt(p.currentTime||0)),y&&B&&(B.textContent=y.value+"%",N()),e&&n){const C=!p.paused;e.style.display=C?"none":"block",n.style.display=C?"block":"none"}d&&d.classList.toggle("active",G),u&&u.classList.toggle("active",V!=="off")}}Ot(),document.addEventListener("wheel",s=>{const C=s.target;if(!(C!=null&&C.closest("#playerCard"))||!y)return;s.preventDefault();const U=s.deltaY<0?5:-5;y.value=String(Math.max(0,Math.min(100,Number(y.value)+U))),y.dispatchEvent(new Event("input"))},{passive:!1});function ke(s){s.addEventListener("timeupdate",()=>{s===p&&(R("melo:playback-position",s.currentTime||0),!X&&m&&w&&(m.value=String(Math.floor(s.currentTime)),w.textContent=vt(s.currentTime),L()),Te(),F())}),s.addEventListener("loadedmetadata",()=>{var U;if(s!==p||!m||!x)return;const C=Math.floor(s.duration||((U=_[Y])==null?void 0:U.duration)||240);m.max=String(C),x.textContent=vt(C),L()}),s.addEventListener("ended",()=>{s!==p||gt||Ut()})}let Vt=null;function Te(){Vt||(Vt=setTimeout(()=>{Vt=null;const s=_[Y];if(!(!s||p.paused))try{localStorage.setItem("melo-resume-state",JSON.stringify({trackId:s.id,position:p.currentTime}))}catch{}},4e3))}ke(t),window.addEventListener("keydown",s=>{s.target.tagName!=="INPUT"&&(s.code==="Space"&&(s.preventDefault(),Xt()),s.code==="ArrowRight"&&(I(),p.currentTime+=5),s.code==="ArrowLeft"&&(I(),p.currentTime-=5),(s.key==="m"||s.key==="M")&&yt(),(s.key==="s"||s.key==="S")&&d&&d.click(),(s.key==="r"||s.key==="R")&&u&&u.click(),s.code==="ArrowUp"&&y&&(y.value=String(Math.min(100,parseInt(y.value,10)+5)),y.dispatchEvent(new Event("input"))),s.code==="ArrowDown"&&y&&(y.value=String(Math.max(0,parseInt(y.value,10)-5)),y.dispatchEvent(new Event("input"))))}),ut("melo:tray-action",s=>{s==="play_pause"?Xt():s==="next"?Ut():s==="prev"?Zt():s==="mute"&&yt()}),window.LumiPlayer={get queue(){return _},set queue(s){_=s,window.__LUMI_QUEUE__=s},get currentIndex(){return Y},loadTrack:z,play:Dt,pause:_t,stop:oe,next:Ut,prev:Zt,get audio(){return p},rebind:Ot},window.__LUMI_REBIND__=Ot,ut("melo:play-tracks",s=>{if(!s||!Array.isArray(s.tracks)||!s.tracks.length)return;I(),_=s.tracks,window.__LUMI_SET_QUEUE__(_);const C=Math.max(0,Math.min(s.index||0,_.length-1));z(C,!0)})}const Re=new URLSearchParams(location.search).get("panel")||"main",J=t=>String(t!=null?t:"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");function xe(t){const a=Number.isFinite(t)?Math.max(0,t):0;return`${Math.floor(a/60)}:${String(Math.floor(a%60)).padStart(2,"0")}`}function sa(t,a){const i=document.getElementById("trackList"),e=document.getElementById("libraryStats"),n=document.getElementById("searchInput"),o=document.getElementById("searchClear"),l=document.getElementById("libraryTabs"),d=document.getElementById("btn-scan"),u=document.getElementById("btn-clear-library"),c=document.getElementById("winPlaylistTracks"),m=document.getElementById("winPlaylistEmpty"),y=document.getElementById("playlistSelect"),w=document.getElementById("playlistSearchInput"),x=document.getElementById("playlistSearchClear"),B=document.getElementById("playlistSortSelect"),H=document.getElementById("btn-clear-playlist"),tt=document.getElementById("btn-export-playlist"),dt=document.getElementById("btn-new-playlist");let g=null,et=null,D=!1,S=localStorage.getItem("melo-currentPlaylist")||"p1",f=[],p=null,T=null,_=!1,Y=[],G="artists",V=null,X=null,pt=null,vt="",L=null;const N=54,ot=52;let yt=0,$t=0,gt=1,Tt=0,at=0,St=0,Ct=null;const Lt=document.createElement("div");Lt.className="ctx-menu",Lt.style.display="none",Lt.innerHTML='<button class="ctx-item danger" id="ctxRemoveLibraryTrack">Remove from Library</button>',document.body.appendChild(Lt),document.addEventListener("click",r=>{r.target.closest("#ctxRemoveLibraryTrack")||(Lt.style.display="none")}),Lt.querySelector("#ctxRemoveLibraryTrack").onclick=async r=>{r.stopPropagation(),!(!g||!Ct)&&(await g("delete_tracks",{ids:[Ct]}),Lt.style.display="none",Ct=null,R("melo:library-changed",{removed:1}))};const bt=new Set;let b=null;const k=new Set;let M=null;function I(r,h,E,v,A,O){if(O.shiftKey&&A!==null){const It=Math.min(A,E),ct=Math.max(A,E);for(let ft=It;ft<=ct;ft++)v[ft]&&r.add(v[ft]);return A}return r.has(h)?r.delete(h):r.add(h),E}function P(r){const h=document.createElement("div");h.className="bulk-action-bar",h.style.display="none";const E=document.createElement("span");E.className="bulk-count",h.appendChild(E);for(const A of r){const O=document.createElement("button");O.className=`btn small ${A.danger?"danger":""}`,O.textContent=A.label,O.onclick=A.onClick,h.appendChild(O)}const v=document.createElement("button");return v.className="btn small ghost",v.textContent="Clear",h.appendChild(v),document.body.appendChild(h),{bar:h,countEl:E,clearBtn:v}}const W=P([{label:"Add to Playlist",onClick:async()=>{!g||!bt.size||(await g("add_tracks_to_playlist",{playlistId:S,trackIds:Array.from(bt)}),R("melo:playlist-changed",{playlistId:S}),a(`Added ${bt.size} track(s) to playlist`),bt.clear(),$())}},{label:"Remove from Library",danger:!0,onClick:async()=>{if(!g||!bt.size)return;const r=Array.from(bt);await g("delete_tracks",{ids:r}),bt.clear(),$(),R("melo:library-changed",{removed:r.length})}}]);W.clearBtn.onclick=()=>{bt.clear(),$()};const F=P([{label:"Remove from Playlist",danger:!0,onClick:async()=>{if(!g||!k.size)return;const r=Array.from(k);for(const h of r)await g("remove_track_from_playlist",{playlistId:S,trackId:h});k.clear(),q(),R("melo:playlist-changed",{playlistId:S})}}]);F.clearBtn.onclick=()=>{k.clear(),q()};function $(){i&&(i.querySelectorAll("[data-track-id]").forEach(r=>{r.classList.toggle("row-selected",bt.has(r.dataset.trackId||""))}),W.bar.style.display=bt.size?"flex":"none",W.countEl.textContent=`${bt.size} selected`)}function q(){c&&(c.querySelectorAll("[data-pl-track]").forEach(r=>{r.classList.toggle("row-selected",k.has(r.dataset.plTrack||""))}),F.bar.style.display=k.size?"flex":"none",F.countEl.textContent=`${k.size} selected`)}function Z(){bt.size&&(bt.clear(),b=null,$())}function z(){k.size&&(k.clear(),M=null,q())}function j(){return new Promise(r=>{const h=document.createElement("div");h.className="confirm-overlay",h.innerHTML=`<div class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="clearLibraryTitle">
        <div id="clearLibraryTitle" class="confirm-title">Clear Library?</div>
        <div class="confirm-message">All tracks will be removed from Library browsing. Your playlists and their tracks will remain unchanged.</div>
        <div class="confirm-actions"><button class="btn small" data-confirm="cancel">Cancel</button><button class="btn small danger-confirm" data-confirm="yes">Clear Library</button></div>
      </div>`,document.body.appendChild(h);const E=A=>{document.removeEventListener("keydown",v),h.remove(),r(A)};h.querySelector("[data-confirm='cancel']").onclick=()=>E(!1),h.querySelector("[data-confirm='yes']").onclick=()=>E(!0),h.onclick=A=>{A.target===h&&E(!1)};const v=A=>{A.key==="Escape"&&(document.removeEventListener("keydown",v),E(!1))};document.addEventListener("keydown",v)})}function K(r){const h=d==null?void 0:d.querySelector(".scan-label");h&&(h.textContent=r)}function it(){o==null||o.classList.toggle("show",!!(n!=null&&n.value))}function mt(){x==null||x.classList.toggle("show",!!(w!=null&&w.value))}function At(){c==null||c.querySelectorAll("[data-pl-track]").forEach(r=>{r.classList.toggle("active",r.dataset.plTrack===L)})}function Mt(r){L=r,At()}function Dt(r){if(!r)return"";if(/^(data:|blob:|https?:)/i.test(r))return r;try{return et?et(r):""}catch{return""}}function _t(r){return{...r,cover:Dt(r.cover),source:"scan"}}const Xt=[],oe=new Set;let Ut=0;function Zt(r,h){!r||!g||oe.has(r)||(oe.add(r),Xt.push({id:r,element:h}),se())}function se(){for(;g&&Ut<2&&Xt.length;){const r=Xt.shift();Ut++,g("ensure_track_artwork",{id:r.id}).then(h=>{if(!h||!r.element.isConnected)return;const E=Dt(h),v=Y.find(A=>A.id===r.id);v&&(v.cover=E),r.element.style.backgroundImage=`url("${E.replace(/"/g,"%22")}")`,r.element.textContent=""}).catch(()=>{}).finally(()=>{Ut--,oe.delete(r.id),se()})}}function Qt(r){const h=[...r.querySelectorAll("[data-artwork-id]")];if(!("IntersectionObserver"in window)){h.forEach(v=>Zt(v.dataset.artworkId,v));return}const E=new IntersectionObserver(v=>{v.forEach(A=>{if(!A.isIntersecting)return;const O=A.target;E.unobserve(O),Zt(O.dataset.artworkId,O)})},{root:r,rootMargin:"120px"});h.forEach(v=>E.observe(v))}async function Ot(){if(D)return;if(!wt){D=!0,ke();return}const r=await Q(()=>import("./core-DhEqZVGG.js"),[]);g=r.invoke,et=r.convertFileSrc,D=!0,await Promise.all([Vt(),Yt()]),await ht(!0),await kt(!0)}function ke(){i&&(i.innerHTML='<div style="padding:30px;text-align:center;color:var(--text-muted)">The persistent Library is available in the Tauri desktop build.</div>')}async function Vt(){if(!(!g||!e))try{const r=await g("library_stats");e.textContent=`${r.tracks} tracks • ${r.artists} artists • ${r.albums} albums`}catch{}}function Te(){V=X=pt=null,$t=0,Z(),i&&(i.scrollTop=0)}function s(){return G==="artists"?V&&X?"tracks":"groups":G==="albums"?X?"tracks":"groups":pt?"tracks":"groups"}function C(){return G==="artists"&&V&&!X?"albums":G==="recent"?"artists":G}function U(){return G==="artists"&&V?X?`${V} › ${X}`:V:G==="albums"&&X?X:G==="genres"&&pt?pt:""}async function nt(r,h){if(!g)return{items:[],total:0,limit:h,offset:r};if(s()==="groups")return g("library_groups",{kind:C(),search:vt||null,artist:G==="artists"?V:null,limit:h,offset:r});const E=await g("library_tracks",{search:vt||null,artist:V,album:X,genre:pt,sort:"title-asc",limit:h,offset:r});return E.items=E.items.map(_t),Y=E.items,E}const st=300,zt=8;function Ft(){return!i||s()!=="tracks"?1:(i.clientWidth||0)>=st*2+zt?2:1}async function ht(r=!1){if(!i||!g)return;if(G==="recent")return r&&(i.scrollTop=0),We();r&&(i.scrollTop=0),i.style.display="block",i.style.position="relative",i.style.overflowY="auto";const h=Math.max(300,i.clientHeight||420),E=U(),v=E?38:0,A=Ft();gt=A;const O=Math.ceil(h/N),It=Math.max(0,i.scrollTop-v),ft=Math.max(0,Math.floor(It/N)-4)*A,Kt=Math.max(40,(O+8)*A),Ae=++yt;try{const Ht=await nt(ft,Kt);if(Ae!==yt)return;const Pe=Math.max(1,Math.ceil(Ht.total/A))*N+v,Ke=100/A,Ua=Ht.items.map((Je,ze)=>{const Be=Ht.offset+ze,Fa=Math.floor(Be/A),Xe=Be%A,Ze=v+Fa*N,Qe=A>1?`position:absolute;top:${Ze}px;height:${N}px;left:calc(${Xe*Ke}% + ${Xe===0?0:zt/2}px);width:calc(${Ke}% - ${zt/2}px)`:`position:absolute;left:0;right:0;top:${Ze}px;height:${N}px`;if(s()==="groups"){const ce=Je,ta=Dt(ce.cover),ea=`lib-avatar ${C()==="albums"?"lib-avatar-album":""}`,Wa=C()==="albums"?"💿":J((ce.name[0]||"?").toUpperCase()),Ga=ta?`<div class="${ea}" style="background-image:url('${J(ta)}')"></div>`:`<div class="${ea}" data-artwork-id="${J(ce.artworkTrackId||"")}">${Wa}</div>`;return`<div class="lib-item virtual-row" data-group-index="${ze}" style="${Qe}">${Ga}<div style="flex:1;min-width:0"><div class="t-title">${J(ce.name)}</div><div class="t-artist">${J(ce.subtitle||`${ce.count} tracks`)}</div></div><span class="chev-r">›</span></div>`}const Gt=Je;return`<div class="track-row virtual-row" data-track-id="${J(Gt.id)}" data-page-index="${ze}" style="${Qe}">
          <span class="num">${Be+1}</span>
          ${Gt.cover?`<div class="track-cover-mini" style="background-image:url('${J(Gt.cover)}');background-size:cover;background-position:center"></div>`:`<div class="track-cover-mini cover-default" data-artwork-id="${J(Gt.id)}">♪</div>`}
          <div style="flex:1;min-width:0"><div class="t-title">${J(Gt.title)}</div><div class="t-artist">${J(Gt.artist)} • ${J(Gt.album)}</div></div>
          <span class="t-dur">${xe(Gt.duration)}</span>
          <button class="btn small ghost" data-add-track="${J(Gt.id)}" title="Add to current playlist">+</button>
        </div>`}).join(""),Va=E?`<div class="lib-crumb virtual-crumb" style="position:sticky;top:0;height:${v}px;z-index:3;background:var(--card)"><button class="btn small" id="virtualBack">‹ Back</button><b>${J(E)}</b></div>`:"";i.innerHTML=`<div class="virtual-list-space" style="position:relative;height:${Math.max(Pe,h)}px">${Va}${Ua}</div>`,me(Ht.items),Qt(i)}catch{i.innerHTML='<div style="padding:24px;text-align:center;color:var(--text-muted)">Could not read the Library database.</div>'}}function me(r){var h;i&&(i.querySelectorAll("[data-group-index]").forEach(E=>{E.onclick=()=>{const v=r[Number(E.dataset.groupIndex||0)],A=(v==null?void 0:v.name)||"",O=(v==null?void 0:v.key)||A;if($t=i.scrollTop,Z(),G==="artists"&&!V)V=A;else if(G==="artists"&&V&&!X)X=O.split("\0")[1]||A;else if(G==="albums"){const It=O.split("\0");V=It[0]||null,X=It[1]||A}else G==="genres"&&(pt=A);ht(!0)}}),i.querySelectorAll("[data-add-track]").forEach(E=>{E.onclick=async v=>{v.stopPropagation(),!(!g||!E.dataset.addTrack)&&(await g("add_tracks_to_playlist",{playlistId:S,trackIds:[E.dataset.addTrack]}),R("melo:playlist-changed",{playlistId:S}))}}),i.querySelectorAll("[data-track-id]").forEach(E=>{E.onclick=async v=>{if(v.target.closest("[data-add-track]"))return;const A=Number(E.dataset.pageIndex||0),O=E.dataset.trackId||"",It=v;if(It.shiftKey||It.ctrlKey||It.metaKey){const ft=r.filter(Kt=>"path"in Kt).map(Kt=>Kt.id);b=I(bt,O,A,ft,b,It),$();return}bt.size&&Z();const ct=r.filter(ft=>"path"in ft).map(_t);g&&ct.length&&(await g("replace_playlist_tracks",{playlistId:S,trackIds:ct.map(ft=>ft.id)}),R("melo:playlist-changed",{playlistId:S})),R("melo:play-tracks",{tracks:ct,index:A})},E.oncontextmenu=v=>{v.preventDefault(),v.stopPropagation(),Ct=E.dataset.trackId||null,Lt.style.display="block";const A=Lt.getBoundingClientRect();Lt.style.left=`${Math.max(6,Math.min(v.clientX,window.innerWidth-A.width-6))}px`,Lt.style.top=`${Math.max(6,Math.min(v.clientY,window.innerHeight-A.height-6))}px`}}),(h=i.querySelector("#virtualBack"))==null||h.addEventListener("click",()=>{G==="artists"&&X?X=null:G==="artists"&&V?V=null:G==="albums"&&X?(V=null,X=null):G==="genres"&&pt&&(pt=null),Z(),i.scrollTop=$t,ht(!1)}),$())}if(i&&typeof ResizeObserver<"u"){let r=null;new ResizeObserver(()=>{r&&window.clearTimeout(r),r=window.setTimeout(()=>{r=null,Ft()!==gt&&ht(!1)},120)}).observe(i)}async function Yt(){var r;g&&(f=await g("list_playlists"),f.some(h=>h.id===S)||(S=((r=f[0])==null?void 0:r.id)||"p1"),localStorage.setItem("melo-currentPlaylist",S),y&&(y.innerHTML=f.map(h=>`<option value="${J(h.id)}" ${h.id===S?"selected":""}>${J(h.name)} (${h.trackCount})</option>`).join("")))}async function kt(r=!1){if(!c||!g)return;r&&(c.scrollTop=0),c.style.display="block",c.style.position="relative",c.style.overflowY="auto";const h=Math.max(260,c.clientHeight||420),E=Math.max(0,Math.floor(c.scrollTop/ot)-8),v=Math.max(40,Math.ceil(h/ot)+16),A=++Tt,O=await g("playlist_tracks",{playlistId:S,search:(w==null?void 0:w.value)||null,sort:(B==null?void 0:B.value)||"default",limit:v,offset:E});if(A!==Tt)return;if(O.items=O.items.map(_t),Y=O.items,m&&(m.style.display=O.total?"none":"block"),c.style.display=O.total?"block":"none",!O.total){c.innerHTML="";return}const It=O.items.map((ct,ft)=>`<div class="track-row virtual-row ${ct.id===L?"active":""}" data-pl-track="${J(ct.id)}" data-page-index="${ft}" style="position:absolute;left:0;right:0;top:${(O.offset+ft)*ot}px;height:${ot}px"><span class="num">${O.offset+ft+1}</span>${ct.cover?`<div class="track-cover-mini" style="background-image:url('${J(ct.cover)}');background-size:cover;background-position:center"></div>`:`<div class="track-cover-mini cover-default" data-artwork-id="${J(ct.id)}">♪</div>`}<div style="flex:1;min-width:0"><div class="t-title">${J(ct.title)}</div><div class="t-artist">${J(ct.artist)} • ${J(ct.album)}</div></div><span class="t-dur">${xe(ct.duration)}</span><button class="btn small ghost" data-remove-track="${J(ct.id)}">×</button></div>`).join("");c.innerHTML=`<div style="position:relative;height:${Math.max(h,O.total*ot)}px">${It}</div>`,Qt(c),c.querySelectorAll("[data-pl-track]").forEach(ct=>{ct.onclick=ft=>{if(ft.target.closest("[data-remove-track]"))return;const Kt=Number(ct.dataset.pageIndex||0),Ae=ct.dataset.plTrack||"",Ht=ft;if(Ht.shiftKey||Ht.ctrlKey||Ht.metaKey){const Ye=O.items.map(Pe=>Pe.id);M=I(k,Ae,Kt,Ye,M,Ht),q();return}k.size&&z(),R("melo:play-tracks",{tracks:O.items,index:Kt})}}),q(),c.querySelectorAll("[data-remove-track]").forEach(ct=>{ct.onclick=async ft=>{ft.stopPropagation(),await g("remove_track_from_playlist",{playlistId:S,trackId:ct.dataset.removeTrack}),R("melo:playlist-changed",{playlistId:S})}})}async function te(r,h){return g?g(r,h):null}async function fe(r,h="replace"){if(await Ot(),!g||!r.length)return[];const v=(await g("import_audio_files",{paths:r,playlistId:h==="none"?null:S,replacePlaylist:h==="replace"})).map(_t);return await Promise.all([Vt(),Yt(),ht(),kt()]),R("melo:library-changed",{imported:v.length}),v}async function re(r,h=!1){if(await Ot(),!g)return null;if(p)return p;const E=await g("start_library_scan",{path:r});return p=E.scanId,T=E.scanId,_=h,d&&K("Cancel Scan"),p}async function ee(){if(!wt)return;if(p&&g){await g("cancel_library_scan",{scanId:p});return}const{open:r}=await Q(async()=>{const{open:E}=await import("./index-CS3Qnt9j.js");return{open:E}},__vite__mapDeps([5,1])),h=await r({directory:!0,multiple:!1});h&&await re(h)}async function ge(r){if(await Ot(),!g)return null;const h=await g("get_track_by_id",{id:r});return h?_t(h):null}const Ce="melo-recently-played",Fe=50;function Ba(r){if(r)try{const h=localStorage.getItem(Ce);let E=h?JSON.parse(h):[];E=E.filter(v=>v.id!==r),E.unshift({id:r,playedAt:Date.now()}),E.length>Fe&&(E=E.slice(0,Fe)),localStorage.setItem(Ce,JSON.stringify(E)),G==="recent"&&We()}catch{}}function Ra(){try{const r=localStorage.getItem(Ce);return(r?JSON.parse(r):[]).map(E=>E.id)}catch{return[]}}async function We(){if(!i)return;i.style.display="block",i.style.position="relative",i.style.overflowY="auto";const r=Ra();if(!r.length){i.innerHTML='<div style="padding:32px 16px;text-align:center;color:var(--text-muted)">No recently played tracks yet.</div>';return}const h=(await Promise.all(r.map(v=>ge(v)))).filter(v=>!!v);if(!h.length){i.innerHTML='<div style="padding:32px 16px;text-align:center;color:var(--text-muted)">No recently played tracks yet.</div>';return}const E=h.map((v,A)=>`<div class="track-row" data-track-id="${J(v.id)}" data-recent-index="${A}">
      <span class="num">${A+1}</span>
      ${v.cover?`<div class="track-cover-mini" style="background-image:url('${J(v.cover)}');background-size:cover;background-position:center"></div>`:`<div class="track-cover-mini cover-default" data-artwork-id="${J(v.id)}">♪</div>`}
      <div style="flex:1;min-width:0"><div class="t-title">${J(v.title)}</div><div class="t-artist">${J(v.artist)} • ${J(v.album)}</div></div>
      <span class="t-dur">${xe(v.duration)}</span>
      <button class="btn small ghost" data-add-track="${J(v.id)}" title="Add to current playlist">+</button>
    </div>`).join("");i.innerHTML=`<div class="virtual-list-space" style="position:relative">${E}</div>`,i.querySelectorAll("[data-add-track]").forEach(v=>{v.onclick=async A=>{A.stopPropagation(),!(!g||!v.dataset.addTrack)&&(await g("add_tracks_to_playlist",{playlistId:S,trackIds:[v.dataset.addTrack]}),R("melo:playlist-changed",{playlistId:S}))}}),i.querySelectorAll("[data-track-id]").forEach(v=>{v.onclick=async A=>{if(A.target.closest("[data-add-track]"))return;const O=Number(v.dataset.recentIndex||0);g&&h.length&&(await g("replace_playlist_tracks",{playlistId:S,trackIds:h.map(It=>It.id)}),R("melo:playlist-changed",{playlistId:S})),R("melo:play-tracks",{tracks:h,index:O})}}),Qt(i)}const $a=150,Wt=document.createElement("div");Wt.className="embedded-playlist";function Da(){return localStorage.getItem("melo-pref-embeddedPlaylistCover")!=="0"}function qa(){const r=parseInt(localStorage.getItem("melo-pref-embeddedPlaylistFontScale")||"100",10);return Math.min(140,Math.max(70,Number.isFinite(r)?r:100))}async function Ge(){if(!Wt.isConnected||!g)return;Wt.style.fontSize=`${qa()}%`;const r=await g("playlist_tracks",{playlistId:S,search:null,sort:"default",limit:$a,offset:0}).catch(()=>null);if(!r)return;const h=r.items.map(_t),E=Da();if(!h.length){Wt.innerHTML='<div class="embedded-playlist-empty">Playlist is empty</div>';return}Wt.innerHTML=h.map((v,A)=>`
      <div class="embedded-playlist-row ${v.id===L?"active":""}" data-ep-track="${J(v.id)}" data-ep-index="${A}">
        ${E?v.cover?`<div class="track-cover-mini" style="background-image:url('${J(v.cover)}');background-size:cover;background-position:center"></div>`:`<div class="track-cover-mini cover-default" data-artwork-id="${J(v.id)}">♪</div>`:""}
        <div class="ep-meta"><div class="t-title">${J(v.title)}</div><div class="t-artist">${J(v.artist)}</div></div>
        <span class="t-dur">${xe(v.duration)}</span>
      </div>`).join(""),Wt.querySelectorAll("[data-ep-track]").forEach(v=>{v.onclick=()=>{R("melo:play-tracks",{tracks:h,index:Number(v.dataset.epIndex||0)})}}),E&&Qt(Wt)}window.__MELO_EMBEDDED_PLAYLIST__={container:Wt,refresh:Ge},l==null||l.querySelectorAll("[data-libtab]").forEach(r=>{r.onclick=()=>{l.querySelectorAll("[data-libtab]").forEach(h=>h.classList.remove("active")),r.classList.add("active"),G=r.dataset.libtab||"artists",Te(),ht(!0)}}),n==null||n.addEventListener("input",()=>{it(),vt=n.value.trim(),window.clearTimeout(at),at=window.setTimeout(()=>ht(!0),180)}),o==null||o.addEventListener("click",()=>{n&&(n.value="",n.focus(),it(),vt="",window.clearTimeout(at),ht(!0))}),i==null||i.addEventListener("scroll",()=>{window.clearTimeout(at),at=window.setTimeout(()=>ht(),60)}),c==null||c.addEventListener("scroll",()=>{window.clearTimeout(St),St=window.setTimeout(()=>kt(),60)}),w==null||w.addEventListener("input",()=>{mt(),window.clearTimeout(St),St=window.setTimeout(()=>kt(!0),180)}),x==null||x.addEventListener("click",()=>{w&&(w.value="",w.focus(),mt(),window.clearTimeout(St),z(),kt(!0))}),B==null||B.addEventListener("change",()=>{z(),kt(!0)}),y==null||y.addEventListener("change",()=>{S=y.value,localStorage.setItem("melo-currentPlaylist",S),z(),kt(!0)}),d==null||d.addEventListener("click",ee),u==null||u.addEventListener("click",async()=>{if(g){if(p){alert("Cancel the active scan before clearing the Library database.");return}await j()&&(await g("clear_library_database"),Y=[],await Promise.all([Vt(),Yt(),ht(!0),kt(!0)]),R("melo:library-changed",{cleared:!0}))}}),H==null||H.addEventListener("click",async()=>{await te("clear_playlist",{playlistId:S}),await Promise.all([Yt(),kt(!0)]),R("melo:playlist-changed",{playlistId:S})}),dt==null||dt.addEventListener("click",async()=>{var E;const r=(E=prompt("New playlist name:"))==null?void 0:E.trim();if(!r)return;const h=await te("create_playlist",{name:r});h&&(S=h.id),await Promise.all([Yt(),kt(!0)])}),tt==null||tt.addEventListener("click",async()=>{var A;if(!g)return;const r=[];let h=0;for(;;){const O=await g("playlist_tracks",{playlistId:S,search:null,sort:"default",limit:500,offset:h});if(r.push(...O.items),h+=O.items.length,h>=O.total||!O.items.length)break}if(!r.length)return;const E=`#EXTM3U
`+r.map(O=>`#EXTINF:${Math.floor(O.duration)},${O.artist} - ${O.title}
${O.path}`).join(`
`),v=document.createElement("a");v.href=URL.createObjectURL(new Blob([E],{type:"audio/x-mpegurl"})),v.download=`${((A=f.find(O=>O.id===S))==null?void 0:A.name)||"playlist"}.m3u`,v.click(),setTimeout(()=>URL.revokeObjectURL(v.href),1e3)}),wt&&Q(async()=>{const{getCurrentWebviewWindow:r}=await import("./webviewWindow-mjQkSB26.js");return{getCurrentWebviewWindow:r}},__vite__mapDeps([6,7,1,0,8])).then(({getCurrentWebviewWindow:r})=>{r().onDragDropEvent(async h=>{if(h.payload.type!=="drop")return;const E=h.payload.paths||[];if(!E.length)return;const v=await fe(E,Re==="playlist"?"append":"replace");if(v.length)Re!=="playlist"&&R("melo:play-tracks",{tracks:v,index:0});else for(const A of E)try{await re(A,Re!=="playlist")}catch{}})}).catch(()=>{}),ut("melo:scan-progress",async r=>{if(r){if(r.scanId&&(p=r.scanId),d&&!r.finished&&K(`Cancel ${r.done||0}/${r.total||"…"}`),d){const h=r.total?Math.max(0,Math.min(100,Number(r.done||0)/Number(r.total)*100)):0;d.style.setProperty("--scan-progress",`${h}%`),d.classList.toggle("scanning",!r.finished)}if(r.finished){if(r.scanId===T&&_&&!r.cancelled&&g){await g("replace_playlist_from_scan",{playlistId:S,scanId:r.scanId});const v=(await g("playlist_tracks",{playlistId:S,search:null,sort:"default",limit:100,offset:0})).items.map(_t);v.length&&R("melo:play-tracks",{tracks:v,index:0}),R("melo:playlist-changed",{playlistId:S})}p=null,T=null,_=!1,d&&(K("Scan"),d.classList.remove("scanning"),d.style.setProperty("--scan-progress","0%")),await Promise.all([Vt(),Yt(),ht(),kt()])}}});let je=0;ut("melo:library-changed",()=>{window.clearTimeout(je),je=window.setTimeout(()=>{Vt(),ht(),kt()},500)}),ut("melo:playlist-changed",()=>{Yt(),kt(),Ge()}),ut("melo:track-changed",r=>{Mt((r==null?void 0:r.id)||null),r!=null&&r.id&&Ba(r.id),Wt.querySelectorAll("[data-ep-track]").forEach(h=>{h.classList.toggle("active",h.dataset.epTrack===((r==null?void 0:r.id)||null))})}),ut("melo:playback-state",r=>{var h;return Mt(((h=r==null?void 0:r.track)==null?void 0:h.id)||null)});try{const r=JSON.parse(localStorage.getItem("melo-current-track")||"null");r!=null&&r.id&&Mt(r.id)}catch{}R("melo:request-playback-state"),setTimeout(()=>R("melo:request-playback-state"),250);function Oa(){return S}async function Ha(r){if(!g||!r)return[];try{return(await g("playlist_tracks",{playlistId:r,search:null,sort:"default",limit:2e4,offset:0})).items.map(_t)}catch{return[]}}async function Na(){if(!g)return[];try{return(await g("library_tracks",{search:null,artist:null,album:null,genre:null,sort:"title-asc",limit:2e4,offset:0})).items.map(_t)}catch{return[]}}window.LumiLibrary={get tracks(){return Y},get playlists(){return f},scanFolder:re,importPaths:fe,getTrack:ge,getCurrentPlaylistId:Oa,getPlaylistTracksAll:Ha,getAllTracks:Na,render:()=>ht(),addTracks:()=>{},addToCurrentPlaylist:async r=>{!g||!r.length||(await g("add_tracks_to_playlist",{playlistId:S,trackIds:r.map(h=>h.id)}),R("melo:playlist-changed",{playlistId:S}))},currentPlaylistName:()=>{var r;return((r=f.find(h=>h.id===S))==null?void 0:r.name)||"Playlist"}},Ot().catch(()=>a("Could not initialize the Library database"))}const be={flat:[0,0,0,0,0,0,0,0,0,0],pop:[-1,2,4,4,2,-1,-1,2,3,3],rock:[4,3,2,-1,-2,-2,1,3,4,4],bass:[6,5,4,2,1,0,-1,-1,-2,-3],treble:[-3,-2,-1,0,1,2,3,5,6,6],dance:[5,4,2,0,-1,-1,2,4,5,3],jazz:[2,1,2,3,2,0,1,2,3,2],classical:[3,2,1,0,0,0,-1,2,3,4],vocal:[-2,-1,0,2,4,4,3,1,0,-1],acoustic:[3,2,1,1,2,2,3,3,2,1],hiphop:[5,4,1,2,-1,-1,1,-1,2,3],metal:[4,2,-1,-2,-1,1,3,4,5,4]};function $e(t){for(const[a,i]of Object.entries(be))if(i.every((e,n)=>e===t[n]))return a;return"custom"}function ra(t,a,i={}){const e=!!i.remote,n=document.getElementById("eqEnable"),o=document.getElementById("eqPreset"),l=document.getElementById("btnEqReset"),d=document.getElementById("eqBands"),u=document.getElementById("eqCanvas"),c=u?u.getContext("2d"):null;let m=null,y=[],w=[],x=new Array(ve.length).fill(0);try{const f=JSON.parse(localStorage.getItem("melo-eq-gains")||"null");Array.isArray(f)&&f.length===ve.length&&(x=f.map(p=>typeof p=="number"?Math.max(-12,Math.min(12,p)):0))}catch{}let B=localStorage.getItem("melo-eq-preset")||$e(x),H=localStorage.getItem("melo-eq-enabled")!=="0";function tt(){if(!m)try{const f=pe(t);m=f.ctx,y=f.filters,y.forEach((p,T)=>{p.gain.value=H?x[T]:0})}catch{}}function dt(f,p){tt(),y[f]&&H&&(y[f].gain.value=p)}function g(f){tt(),x=[...f],H&&f.forEach((p,T)=>{y[T]&&(y[T].gain.value=p)}),S()}function et(f){tt(),H=f,f?x.forEach((p,T)=>{y[T]&&(y[T].gain.value=p)}):y.forEach(p=>{p.gain.value=0}),S()}e||t&&t.addEventListener("play",()=>{tt(),(m==null?void 0:m.state)==="suspended"&&m.resume().catch(()=>{})}),ut("melo:eq",f=>{f&&(f.type==="gain"?(e||dt(f.idx,f.val),x[f.idx]=f.val,w[f.idx]&&(w[f.idx].value=String(f.val),D(w[f.idx])),o&&(o.value=$e(x)),S()):f.type==="gains"?(e||g(f.values),x=[...f.values],w.length&&w.forEach((p,T)=>{p.value=String(x[T]),D(p)}),o&&f.preset&&(o.value=f.preset),S()):f.type==="enable"&&(H=!!f.on,e||et(H),n&&(n.checked=H),S()))});function D(f){var _;const p=parseInt(f.value),T=(_=f.parentElement)==null?void 0:_.querySelector(".val");T&&(T.textContent=(p>0?"+":"")+p+"dB")}function S(){if(!u||!c)return;const f=window.devicePixelRatio||1,p=u.clientWidth*f,T=u.clientHeight*f;if(p<=0||T<=0)return;u.width=p,u.height=T,c.clearRect(0,0,p,T);const _=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#2a7bd6",Y=x;if(!H){c.strokeStyle="rgba(100,120,150,0.25)",c.lineWidth=2*f,c.beginPath(),c.moveTo(0,T/2),c.lineTo(p,T/2),c.stroke();return}c.strokeStyle=_,c.lineWidth=2.5*f,c.lineJoin="round",c.beginPath(),Y.forEach((G,V)=>{const X=V/(Y.length-1)*p,pt=T/2-G/12*(T/2-10*f);if(V===0)c.moveTo(X,pt);else{const vt=(V-1)/(Y.length-1)*p,L=T/2-Y[V-1]/12*(T/2-10*f);c.quadraticCurveTo((vt+X)/2,L,X,pt)}}),c.stroke(),Y.forEach((G,V)=>{const X=V/(Y.length-1)*p,pt=T/2-G/12*(T/2-10*f);c.fillStyle=_,c.beginPath(),c.arc(X,pt,4*f,0,Math.PI*2),c.fill(),c.fillStyle="white",c.beginPath(),c.arc(X,pt,2*f,0,Math.PI*2),c.fill()}),c.strokeStyle="rgba(100,120,150,0.3)",c.lineWidth=1*f,c.setLineDash([4*f,4*f]),c.beginPath(),c.moveTo(0,T/2),c.lineTo(p,T/2),c.stroke(),c.setLineDash([])}d&&(d.innerHTML="",ve.forEach((f,p)=>{const T=x[p]||0,_=document.createElement("div");_.className="eq-band",_.innerHTML=`
        <input type="range" min="-12" max="12" value="${T}" step="1" data-idx="${p}" orient="vertical" />
        <label>${f>=1e3?f/1e3+"k":f}</label>
        <span style="font-size:10px;color:var(--text-muted);min-height:12px;" class="val">${(T>0?"+":"")+T+"dB"}</span>
      `,d.appendChild(_)}),w=Array.from(d.querySelectorAll("input")),w.forEach(f=>{f.addEventListener("input",()=>{const p=parseInt(f.dataset.idx),T=parseInt(f.value);D(f),x[p]=T,S();const _=$e(x);o&&(o.value=_),localStorage.setItem("melo-eq-gains",JSON.stringify(x)),localStorage.setItem("melo-eq-preset",_),e||dt(p,T),R("melo:eq",{type:"gain",idx:p,val:T,values:x})})})),o&&(o.value=B,o.addEventListener("change",()=>{const f=be[o.value]||be.flat;w.length&&w.forEach((p,T)=>{p.value=String(f[T]),D(p)}),x=[...f],S(),localStorage.setItem("melo-eq-gains",JSON.stringify(x)),localStorage.setItem("melo-eq-preset",o.value),e||g(f),R("melo:eq",{type:"gains",values:f,preset:o.value}),a(`Preset: ${o.options[o.selectedIndex].text}`)})),l&&l.addEventListener("click",()=>{const f=be.flat;w.length&&w.forEach((p,T)=>{p.value="0",D(p)}),x=[...f],o&&(o.value="flat"),localStorage.setItem("melo-eq-gains",JSON.stringify(x)),localStorage.setItem("melo-eq-preset","flat"),e||g(f),R("melo:eq",{type:"gains",values:f,preset:"flat"}),S(),a("Equalizer reset to Flat (0dB)")}),n&&(n.checked=H,n.addEventListener("change",()=>{H=n.checked,localStorage.setItem("melo-eq-enabled",H?"1":"0"),e||et(H),R("melo:eq",{type:"enable",on:H}),S(),a(H?"Equalizer On":"Equalizer off — Flat")})),u&&new ResizeObserver(()=>S()).observe(u),S(),window.LumiEqualizer={presets:be,frequencies:ve,displayGains:x,reset:()=>l==null?void 0:l.click()}}const he=[{id:"bars",label:"Classic Bars"},{id:"thin",label:"Thin Bars"},{id:"line",label:"Spectrum Line"},{id:"mirror",label:"Mirror Bars"},{id:"wave",label:"Oscilloscope"},{id:"spectrumWave",label:"Spectrum Wave"},{id:"blocks",label:"Block Equalizer"}];function ca(){return document.getElementById("vizBars")||document.querySelector('[data-melo="visualizer"]')}function ii(t){let a=ca();if(!a)return;let i=tt(a),e=i.getContext("2d"),n=null,o=null,l=null,d=null,u=null,c=!1,m=localStorage.getItem("melo-viz-mode")||"bars";he.some(b=>b.id===m)||(m="bars");let y=0,w=[],x=.45,B=null,H=!1;function tt(b){let k=b.querySelector("canvas");return k||(b.innerHTML="",k=document.createElement("canvas"),b.appendChild(k)),k}function dt(){if(!(o&&l))try{const b=pe(t);n=b.ctx,o=b.analyser,l=new Uint8Array(o.frequencyBinCount),d=new Uint8Array(o.fftSize)}catch{c=!0}}function g(b){const k=l.length,M=((n==null?void 0:n.sampleRate)||44100)/2,I=45,P=Math.min(15e3,M*.95),W=Math.log(I),F=Math.log(P),$=[];for(let q=0;q<b;q++){const Z=Math.exp(W+(F-W)*q/b),z=Math.exp(W+(F-W)*(q+1)/b);let j=Math.floor(Z/M*k),K=Math.max(j+1,Math.ceil(z/M*k));j<0&&(j=0),K>k&&(K=k);let it=0;for(let mt=j;mt<K;mt++)it+=l[mt];$.push(it/(K-j)/255)}return $}function et(b){const k=performance.now()/1e3,M=Math.pow(Math.abs(Math.sin(k*2.2)),2.5),I=[];for(let P=0;P<b;P++){let W=.42+.26*Math.sin(k*1.35+P*.62)+.2*Math.sin(k*2.9+P*1.31)+Math.random()*.07;W*=.55+.5*M,I.push(Math.max(.04,Math.min(1,W)))}return I}function D(b){const k=performance.now()/1e3,M=.5+.5*Math.pow(Math.abs(Math.sin(k*1.9)),2);for(let I=0;I<b.length;I++){const P=I/b.length;b[I]=128+66*M*(Math.sin(P*Math.PI*6+k*7)*.6+Math.sin(P*Math.PI*13-k*11)*.4)}}function S(b){let k;if(c||!o||!l)k=et(b);else if(o.getByteFrequencyData(l),k=g(b),!k.some(P=>P>.01)&&!t.paused)k=et(b);else for(let P=0;P<b;P++)k[P]*=1+1.7*(P/Math.max(1,b-1));let M=0;for(const I of k)I>M&&(M=I);M>x?x=M:x=Math.max(.35,x*.985),w.length!==b&&(w=new Array(b).fill(0));for(let I=0;I<b;I++){const P=Math.min(1,k[I]/x),W=P>w[I]?.55:.16;w[I]+=(P-w[I])*W}return w}function f(b,k){return getComputedStyle(document.documentElement).getPropertyValue(b).trim()||k}function p(){return i.width/Math.max(1,i.clientWidth)||1}function T(b,k,M,I,P){if(P=Math.min(P,M/2,I/2),e.roundRect){e.roundRect(b,k,M,I,P);return}e.rect(b,k,M,I)}function _(){const b=window.devicePixelRatio||1,k=i.clientWidth||(a==null?void 0:a.clientWidth)||200,M=i.clientHeight||(a==null?void 0:a.clientHeight)||56;k>0&&M>0&&(i.width=Math.round(k*b),i.height=Math.round(M*b))}new ResizeObserver(_).observe(i),_();function Y(b,k,M,I){const P=p(),W=f("--visualizer","#38bdf8"),F=f("--accent","#0284c7"),$=b.length,q=k/$,Z=Math.max(1.2*P,q*(1-I));for(let z=0;z<$;z++){const j=b[z],K=Math.max(2*P,j*(M-4*P)),it=z*q+(q-Z)/2,mt=M-K-1*P,At=e.createLinearGradient(0,mt,0,M);At.addColorStop(0,F),At.addColorStop(1,W),e.fillStyle=At,e.beginPath(),T(it,mt,Z,K,Math.min(Z/2,3.5*P)),e.fill()}}function G(b,k,M){const I=p(),P=f("--visualizer","#38bdf8"),W=f("--accent","#0284c7"),F=b.length,$=k/F,q=M/2,Z=Math.max(1.5*I,$*.62);for(let z=0;z<F;z++){const j=Math.max(1.5*I,b[z]*(M/2-3*I)),K=z*$+($-Z)/2,it=e.createLinearGradient(0,q-j,0,q+j);it.addColorStop(0,W),it.addColorStop(.5,P),it.addColorStop(1,W),e.fillStyle=it,e.beginPath(),T(K,q-j,Z,j*2,Math.min(Z/2,3*I)),e.fill()}}function V(b,k,M){const I=p(),P=f("--visualizer","#38bdf8"),W=f("--accent","#0284c7"),F=b.length,$=[],q=[];for(let z=0;z<F;z++)$.push((z+.5)/F*k),q.push(M-2*I-b[z]*(M-8*I));e.beginPath(),e.moveTo($[0],M),e.lineTo($[0],q[0]);for(let z=1;z<F;z++){const j=($[z-1]+$[z])/2;e.quadraticCurveTo($[z-1],q[z-1],j,(q[z-1]+q[z])/2)}e.lineTo($[F-1],q[F-1]),e.lineTo($[F-1],M),e.closePath();const Z=e.createLinearGradient(0,0,0,M);Z.addColorStop(0,P),Z.addColorStop(1,"transparent"),e.globalAlpha=.18,e.fillStyle=Z,e.fill(),e.globalAlpha=1,e.beginPath(),e.moveTo($[0],q[0]);for(let z=1;z<F;z++){const j=($[z-1]+$[z])/2;e.quadraticCurveTo($[z-1],q[z-1],j,(q[z-1]+q[z])/2)}e.lineTo($[F-1],q[F-1]),e.strokeStyle=W,e.lineWidth=2*I,e.lineJoin="round",e.stroke()}function X(b,k,M){const I=p(),P=f("--visualizer","#38bdf8"),W=f("--accent","#0284c7"),F=M/2,$=b.length,q=b.map((j,K)=>{const it=K/Math.max(1,$-1),mt=Math.pow(Math.sin(Math.PI*it),.28);return Math.max(.7*I,j*mt*(M*.46))}),Z=j=>{e.beginPath();for(let K=0;K<$;K++){const it=K/Math.max(1,$-1)*k,mt=F+(j?-q[K]:q[K]);if(K===0)e.moveTo(it,mt);else{const At=(K-1)/Math.max(1,$-1)*k,Mt=F+(j?-q[K-1]:q[K-1]);e.quadraticCurveTo(At,Mt,(At+it)/2,(Mt+mt)/2)}}};Z(!0);for(let j=$-1;j>=0;j--){const K=j/Math.max(1,$-1)*k;e.lineTo(K,F+q[j])}e.closePath();const z=e.createLinearGradient(0,0,0,M);z.addColorStop(0,W),z.addColorStop(.5,P),z.addColorStop(1,W),e.fillStyle=z,e.globalAlpha=.3,e.fill(),e.globalAlpha=.18,e.shadowColor=P,e.shadowBlur=8*I,Z(!0),e.strokeStyle=P,e.lineWidth=4*I,e.stroke(),Z(!1),e.stroke(),e.shadowBlur=0,e.globalAlpha=1,Z(!0),e.strokeStyle=W,e.lineWidth=1.2*I,e.stroke(),Z(!1),e.stroke(),e.beginPath(),e.moveTo(0,F),e.lineTo(k,F),e.strokeStyle=P,e.globalAlpha=.45,e.lineWidth=.8*I,e.stroke(),e.globalAlpha=1}function pt(b,k,M){const I=p(),P=f("--visualizer","#38bdf8"),W=f("--accent","#0284c7"),F=b.length,$=8,q=Math.max(1*I,k*.0035),Z=Math.max(1*I,M*.025),z=Math.max(1,(k-q*(F-1))/F),j=Math.max(1,(M-Z*($-1))/$),K=e.createLinearGradient(0,0,0,M);K.addColorStop(0,W),K.addColorStop(1,P),e.fillStyle=K;for(let it=0;it<F;it++){const mt=Math.max(1,Math.min($,Math.round(b[it]*$))),At=it*(z+q);for(let Mt=0;Mt<mt;Mt++){const Dt=M-(Mt+1)*j-Mt*Z;e.globalAlpha=.58+.42*((Mt+1)/$),e.fillRect(At,Dt,z,j)}}e.globalAlpha=1}function vt(){const b=i.width,k=i.height,M=p(),I=f("--accent","#0284c7");let P;c||!o||!d?(u||(u=new Uint8Array(1024)),D(u),P=u):(o.getByteTimeDomainData(d),P=d);const W=()=>{e.beginPath();for(let F=0;F<=b;F+=2){const $=Math.min(P.length-1,Math.floor(F/b*P.length)),q=P[$]/255*k;F===0?e.moveTo(F,q):e.lineTo(F,q)}};W(),e.strokeStyle=I,e.globalAlpha=.16,e.lineWidth=6*M,e.lineJoin="round",e.stroke(),W(),e.globalAlpha=1,e.lineWidth=1.8*M,e.stroke()}function L(){const b=i.width,k=i.height;if(!b||!k)return;if(e.clearRect(0,0,b,k),m==="wave"){vt();return}const M=m==="bars"?16:m==="thin"?56:m==="line"?64:m==="spectrumWave"?72:m==="blocks"?22:24,I=parseInt((a==null?void 0:a.dataset.bars)||"",10),P=Number.isFinite(I)&&I>0?I:M,W=S(P);m==="bars"?Y(W,b,k,.34):m==="thin"?Y(W,b,k,.32):m==="line"?V(W,b,k):m==="mirror"?G(W,b,k):m==="spectrumWave"?X(W,b,k):m==="blocks"&&pt(W,b,k)}function N(){y=requestAnimationFrame(N),L()}function ot(){H||y||N()}function yt(b,k=!1){m=b,w=[],localStorage.setItem("melo-viz-mode",b)}function $t(){return B||(B=document.createElement("div"),B.className="viz-menu",B.style.display="none",document.body.appendChild(B),B)}function gt(){const b=$t();b.innerHTML='<div class="viz-menu-label">Visualizer type</div>'+he.map(k=>`<button class="viz-menu-item ${k.id===m?"active":""}" data-mode="${k.id}">${k.id===m?"✓":""}<span>${k.label}</span></button>`).join(""),b.querySelectorAll("[data-mode]").forEach(k=>{k.addEventListener("click",M=>{M.stopPropagation(),yt(k.dataset.mode),at()})})}function Tt(b,k){gt();const M=B;M.style.display="block";const I=M.getBoundingClientRect();M.style.left=Math.max(8,Math.min(b,window.innerWidth-I.width-8))+"px",M.style.top=Math.max(8,Math.min(k,window.innerHeight-I.height-8))+"px"}function at(){B&&(B.style.display="none")}function St(){a&&(a.title="Click: next mode • Right-click: choose mode",a.addEventListener("click",()=>{at();const b=he.findIndex(k=>k.id===m);yt(he[(b+1)%he.length].id)}),a.addEventListener("contextmenu",b=>{b.preventDefault(),b.stopPropagation(),Tt(b.clientX,b.clientY)}))}document.addEventListener("click",b=>{B&&B.style.display!=="none"&&!B.contains(b.target)&&at()}),document.addEventListener("keydown",b=>{b.key==="Escape"&&at()});function Ct(){dt(),ot(),(n==null?void 0:n.state)==="suspended"&&n.resume().catch(()=>{})}t.addEventListener("play",Ct),Ct(),St(),document.addEventListener("visibilitychange",()=>{document.hidden?(cancelAnimationFrame(y),y=0):ot()});function Lt(){cancelAnimationFrame(y),y=0,a=ca(),a&&(i=tt(a),e=i.getContext("2d"),new ResizeObserver(_).observe(i),_(),St(),ot())}window.__LUMI_REBIND_VISUALIZER__=Lt;function bt(b){H=b,b?(cancelAnimationFrame(y),y=0):document.hidden||ot()}window.__MELO_VISUALIZER_SET_PAUSED__=bt}function da(t){if(!t||!t.trim())return{isSynced:!1,lines:[],raw:""};const a=[],i=t.split(/\r?\n/),e=/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;let n=!1;for(const o of i){const l=o.trim();if(!l||/^\[[a-z]{2,8}:/i.test(l))continue;const d=[...l.matchAll(e)];if(d.length>0){n=!0;const u=l.replace(e,"").trim();for(const c of d){const m=parseInt(c[1],10),y=parseInt(c[2],10),w=c[3]||"0",x=w.length===2?parseInt(w,10)*10:w.length===1?parseInt(w,10)*100:parseInt(w.slice(0,3),10),B=m*60+y+x/1e3;a.push({time:B,text:u})}}else a.push({time:-1,text:l})}return a.sort((o,l)=>o.time-l.time),{isSynced:n,lines:a,raw:t}}function qe(t,a,i){var H,tt,dt;const e=i?i.container:document.getElementById("lyricsContainer"),n=i?(H=i.status)!=null?H:null:document.getElementById("lyricsStatus"),o=i?(tt=i.title)!=null?tt:null:document.getElementById("lyricsTrackTitle");if(!e)return;let l={isSynced:!1,lines:[]},d=null,u=-1,c=0;async function m(g){if(g.lyrics&&g.lyrics.trim().length>0)return g.lyrics;if(window.__TAURI__)try{const{invoke:et}=await Q(async()=>{const{invoke:S}=await import("./core-DhEqZVGG.js");return{invoke:S}},[]),D=await et("get_track_lyrics",{path:g.path});if(D)return D}catch{}return null}async function y(g){if(!g){d=null,l={isSynced:!1,lines:[],raw:""},o&&(o.textContent="No track playing"),w();return}d=g.id,o&&(o.textContent=`${g.title} — ${g.artist}`);const et=await m(g);l=da(et||""),w()}function w(){if(e){if(e.innerHTML="",u=-1,!l.lines.length){n&&(n.style.display="block",n.innerHTML='No synced lyrics found (.lrc)<br/><span style="font-size:10.5px; opacity:0.7;">Place a matching .lrc file in the song folder or add lyrics in the tag editor.</span>');return}n&&(n.style.display="none"),l.lines.forEach((g,et)=>{const D=document.createElement("div");D.className="lyric-line",D.dataset.idx=String(et),D.dataset.time=String(g.time),D.textContent=g.text||"♪",g.time>=0&&(D.style.cursor="pointer",D.title=`Seek to ${Math.floor(g.time/60)}:${Math.floor(g.time%60).toString().padStart(2,"0")}`,D.addEventListener("click",()=>{R("melo:seek-playback",g.time),window.__TAURI__||(t.currentTime=g.time,t.play().catch(()=>{}))})),e.appendChild(D)})}}function x(){if(!e||!l.isSynced||!l.lines.length)return;const g=window.__TAURI__?c:t.currentTime;let et=-1;for(let D=0;D<l.lines.length&&l.lines[D].time<=g;D++)et=D;if(et!==u){u=et;const D=e.querySelectorAll(".lyric-line");if(D.forEach((S,f)=>{S.classList.toggle("active",f===u),S.classList.toggle("passed",f<u)}),u>=0&&D[u]){const S=D[u],f=e.clientHeight,T=S.offsetTop-e.offsetTop-f/2+S.clientHeight/2;e.scrollTo({top:Math.max(0,T),behavior:"smooth"})}}}t.addEventListener("timeupdate",x),window.addEventListener("lumi:trackChange",g=>{y(g.detail)}),ut("melo:track-changed",g=>{y(g)}),ut("melo:playback-state",g=>{g&&(c=Number(g.currentTime)||0,g.track&&g.track.id!==d?y(g.track):x())}),ut("melo:playback-position",g=>{c=Number(g)||0,x()});const B=window.__LUMI_QUEUE__;if(Array.isArray(B)&&B.length>0)y(B[((dt=window.LumiPlayer)==null?void 0:dt.currentIndex)||0]);else try{const g=JSON.parse(localStorage.getItem("melo-current-track")||"null");g&&y(g)}catch{}R("melo:request-playback-state"),setTimeout(()=>R("melo:request-playback-state"),250),window.LumiLyrics={loadTrackLyrics:y,parseLRC:da}}const ni=(t,a,i)=>{const e=t[a];return e?typeof e=="function"?e():Promise.resolve(e):new Promise((n,o)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(o.bind(null,new Error("Unknown variable dynamic import: "+a+(a.split("/").length!==i?". Note that variables only represent file names one level deep.":""))))})},Sa={code:"en",name:"English",nativeName:"English",authors:["Melo Team"]},Ne={_meta:Sa,"settings.tabs.general":"General","settings.tabs.playback":"Playback","settings.tabs.appearance":"Appearance & Skin","settings.tabs.shortcuts":"Shortcuts","settings.tabs.about":"About","settings.general.language.label":"Language","settings.general.language.desc":"Interface language — more languages coming via community translation","settings.general.tray.label":"Close to system tray","settings.general.tray.desc":"Minimize to system tray on window close","settings.general.resume.label":"Resume playback on reopen","settings.general.resume.desc":"Continue playback of the previous track where you left off","settings.playback.replaygain.label":"ReplayGain normalization","settings.playback.replaygain.desc":"Equalize track volume levels automatically","settings.playback.fadepause.label":"Fade out on pause","settings.playback.fadepause.desc":"Smooth 0.5s fade-out on pause, fade back in on resume","settings.playback.crossfade.label":"Crossfade","settings.playback.crossfade.desc":"Smoothly blend the end of one track into the start of the next","settings.playback.crossfadeDuration.label":"Crossfade duration","settings.playback.crossfadeDuration.desc":"How long the transition between tracks lasts (1–12 seconds)","settings.appearance.embeddedPlaylist.label":"Embedded Playlist (skins)","settings.appearance.embeddedPlaylist.desc":"If the active skin includes a playlist slot, these control how it looks. Skins without this slot are unaffected.","settings.appearance.embeddedPlaylistCover.label":"Show track cover art","settings.appearance.embeddedPlaylistFontScale.label":"Text size","settings.appearance.showstop.label":"Show Stop button","settings.appearance.showstop.desc":"Display a Stop control next to Play/Pause in the player"},li=Object.freeze(Object.defineProperty({__proto__:null,_meta:Sa,default:Ne},Symbol.toStringTag,{value:"Module"})),Ea=[{code:"en",nativeName:"English"}],ae={en:Ne};let Ia=ae.en,La="en";function oi(){return La}async function Ma(t){if(Ea.some(a=>a.code===t)||(t="en"),!ae[t])if(t==="en")ae.en=Ne;else try{const a=await ni(Object.assign({"./locales/en.json":()=>Q(()=>Promise.resolve().then(()=>li),void 0)}),`./locales/${t}.json`,3);ae[t]=a.default||a}catch{t="en"}La=t,Ia=ae[t]||ae.en,localStorage.setItem("melo-pref-language",t),document.dispatchEvent(new CustomEvent("melo:locale-changed",{detail:t}))}function rt(t){var a,i;return(i=(a=Ia[t])!=null?a:ae.en[t])!=null?i:t}function ua(){const t=localStorage.getItem("melo-pref-language")||"en";Ma(t)}(function(){const a=[["lumi-theme","melo-theme"],["lumi-custom-skin","melo-custom-skin"],["lumi-custom-skin-isFull","melo-custom-skin-isFull"]];for(const[i,e]of a)try{const n=localStorage.getItem(i);n!==null&&localStorage.getItem(e)===null&&localStorage.setItem(e,n),n!==null&&localStorage.removeItem(i)}catch{}try{const i=[];for(let e=0;e<localStorage.length;e++){const n=localStorage.key(e);n&&n.startsWith("lumiv2-")&&i.push(n)}for(const e of i){const n="melo-win-"+e.slice(7),o=localStorage.getItem(e);o!==null&&localStorage.getItem(n)===null&&localStorage.setItem(n,o),localStorage.removeItem(e)}}catch{}})();const _a=document.querySelector("#app");_a.innerHTML=`
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
          <button class="tab" data-libtab="recent">Recent</button>
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
          <button class="settings-tab active" data-stab="general"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>${rt("settings.tabs.general")}</button>
          <button class="settings-tab" data-stab="playback"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4z"/></svg>${rt("settings.tabs.playback")}</button>
          <button class="settings-tab" data-stab="appearance"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>${rt("settings.tabs.appearance")}</button>
          <button class="settings-tab" data-stab="shortcuts"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M18 14h.01M9 14h6"/></svg>${rt("settings.tabs.shortcuts")}</button>
          <button class="settings-tab" data-stab="about"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>${rt("settings.tabs.about")}</button>
        </div>

        <!-- GENERAL TAB -->
        <div class="settings-section active" data-panel="general">
          <div class="settings-row">
            <div><div class="label">${rt("settings.general.language.label")}</div><div class="desc">${rt("settings.general.language.desc")}</div></div>
            <select class="settings-select" id="setLanguage">${Ea.map(t=>`<option value="${t.code}">${t.nativeName}</option>`).join("")}</select>
          </div>
          <div class="settings-row">
            <div><div class="label">${rt("settings.general.tray.label")}</div><div class="desc">${rt("settings.general.tray.desc")}</div></div>
            <div class="switch" id="swTray" data-key="tray"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">${rt("settings.general.resume.label")}</div><div class="desc">${rt("settings.general.resume.desc")}</div></div>
            <div class="switch on" id="swResume" data-key="resume"></div>
          </div>
        </div>

        <!-- PLAYBACK TAB -->
        <div class="settings-section" data-panel="playback">
          <div class="settings-row">
            <div><div class="label">${rt("settings.playback.replaygain.label")}</div><div class="desc">${rt("settings.playback.replaygain.desc")}</div></div>
            <div class="switch on" id="swReplayGain" data-key="replayGainGlobal"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">${rt("settings.playback.fadepause.label")}</div><div class="desc">${rt("settings.playback.fadepause.desc")}</div></div>
            <div class="switch on" id="swFadePause" data-key="fadePause"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">${rt("settings.playback.crossfade.label")}</div><div class="desc">${rt("settings.playback.crossfade.desc")}</div></div>
            <div class="switch" id="swCrossfade" data-key="crossfade"></div>
          </div>
          <div class="settings-row" id="crossfadeDurationRow">
            <div><div class="label">${rt("settings.playback.crossfadeDuration.label")}</div><div class="desc">${rt("settings.playback.crossfadeDuration.desc")}</div></div>
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
            <div><div class="label">${rt("settings.appearance.showstop.label")}</div><div class="desc">${rt("settings.appearance.showstop.desc")}</div></div>
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
          <div class="settings-row" style="flex-direction:column; align-items:stretch;">
            <div class="label" style="margin-bottom:4px;">${rt("settings.appearance.embeddedPlaylist.label")}</div>
            <div style="font-size:11px; color:var(--text-soft); line-height:1.6; margin-bottom:8px;">
              ${rt("settings.appearance.embeddedPlaylist.desc")}
            </div>
            <div class="settings-row" style="padding:0;">
              <div><div class="label" style="font-size:12px;">${rt("settings.appearance.embeddedPlaylistCover.label")}</div></div>
              <div class="switch on" id="swEmbeddedPlaylistCover" data-key="embeddedPlaylistCover"></div>
            </div>
            <div class="settings-row" style="padding:0;">
              <div><div class="label" style="font-size:12px;">${rt("settings.appearance.embeddedPlaylistFontScale.label")}</div></div>
              <div class="stepper-control">
                <button type="button" class="btn small stepper-btn" id="btnEmbeddedFontDown" aria-label="Decrease font size">−</button>
                <input type="range" class="crossfade-range" id="embeddedFontScaleRange" min="70" max="140" step="10" value="100" />
                <span class="stepper-value" id="embeddedFontScaleValue">100%</span>
                <button type="button" class="btn small stepper-btn" id="btnEmbeddedFontUp" aria-label="Increase font size">+</button>
              </div>
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
            <div style="font-size:16px; font-weight:800; color:var(--text); margin-bottom:4px;">Melo 0.6.0 Beta</div>
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
`;const xt=new URLSearchParams(location.search).get("panel");xt&&(document.documentElement.classList.add("panel-window",`panel-${xt}`),document.body.classList.add("panel-window",`panel-${xt}`));var ga,ha;if(wt&&xt){Q(async()=>{const{getCurrentWindow:e}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:e}},__vite__mapDeps([8,7,1,0])).then(({getCurrentWindow:e})=>{const n=e();di(n,"melo-geo-panel-"+xt),n.onCloseRequested(()=>{R("melo:panel-closed",xt)}),window.addEventListener("beforeunload",()=>{R("melo:panel-closed",xt)})});const t=document.getElementById("win-"+xt),a=((ga=t==null?void 0:t.querySelector(".float-title"))==null?void 0:ga.innerHTML)||"",i=((ha=t==null?void 0:t.querySelector(".float-body"))==null?void 0:ha.innerHTML)||"";_a.innerHTML=`
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
</div>`}wt&&!xt&&(document.documentElement.classList.add("tauri-main"),document.body.classList.add("tauri-main"),document.querySelectorAll(".side-actions .sbtn").forEach(t=>t.classList.remove("active")),Q(async()=>{const{WebviewWindow:t}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:t}},__vite__mapDeps([6,7,1,0,8])).then(({WebviewWindow:t})=>{const a=async()=>{var i;for(const e of["library","playlist","equalizer","lyrics","settings"])try{const n=await t.getByLabel("panel-"+e);(i=document.getElementById(Ue[e]))==null||i.classList.toggle("active",!!n)}catch{}};a(),setInterval(a,1200)}));wt&&!xt&&(Q(()=>import("./window-BWd3Cypy.js"),__vite__mapDeps([8,7,1,0])).then(async({getCurrentWindow:t})=>{const a=t(),i=()=>{const l=localStorage.getItem("melo-active-skin-id")||"default";if(l==="compact-pill"||typeof l=="string"&&l.startsWith("compact-pill"))return{w:780,h:138,resizable:!1,fixed:!0,custom:!1,force:!0,minW:780,minH:138,maxW:780,maxH:138};if(l!=="default"){const u=Qa();if(u){const c=Number.isFinite(u.width)&&Number.isFinite(u.height)&&(u.width||0)>0&&(u.height||0)>0;return{w:u.width||0,h:u.height||0,resizable:u.resizable!==!1,fixed:!1,custom:!0,force:c,minW:u.minWidth,minH:u.minHeight,maxW:u.maxWidth,maxH:u.maxHeight}}return{w:0,h:0,resizable:!0,fixed:!1,custom:!0,force:!1,minW:void 0,minH:void 0,maxW:void 0,maxH:void 0}}return{w:960,h:240,resizable:!0,fixed:!1,custom:!1,force:!0,minW:650,minH:135,maxW:1e4,maxH:260}},e=async l=>{try{const{LogicalSize:d}=await Q(async()=>{const{LogicalSize:u}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:u}},__vite__mapDeps([7,1]));if(l.fixed)await a.setMinSize(new d(l.w,l.h)),await a.setMaxSize(new d(l.w,l.h));else if(l.custom){const u=l.minW||240,c=l.minH||120,m=Math.max(u,l.maxW||1e4),y=Math.max(c,l.maxH||1e4);await a.setMinSize(new d(u,c)),await a.setMaxSize(new d(m,y))}else await a.setMinSize(new d(650,135)),await a.setMaxSize(new d(1e4,260));await a.setResizable(l.resizable)}catch{}},n=(l,d,u,c)=>{let m=Number.isFinite(l)&&l>0?l:d;return u!=null&&m<u&&(m=u),c!=null&&m>c&&(m=c),m};try{const l=JSON.parse(localStorage.getItem("melo-geo-main")||"null"),{LogicalPosition:d,LogicalSize:u}=await Q(async()=>{const{LogicalPosition:m,LogicalSize:y}=await import("./dpi-fvP-W2qr.js");return{LogicalPosition:m,LogicalSize:y}},__vite__mapDeps([7,1])),c=i();if(c.force){let m=c.w,y=c.h;l&&!c.fixed&&(c.custom?(m=n(l.w,c.w,c.minW,c.maxW),y=n(l.h,c.h,c.minH,c.maxH)):(m=Math.max(650,l.w),y=c.h)),await a.setSize(new u(m,y))}await e(c),(l==null?void 0:l.x)!=null&&(l==null?void 0:l.y)!=null&&await a.setPosition(new d(l.x,l.y))}catch{}const o=async()=>{try{const l=await a.outerPosition(),d=await a.innerSize();localStorage.setItem("melo-geo-main",JSON.stringify({x:l.x,y:l.y,w:d.width,h:d.height}))}catch{}};a.onMoved(o),a.onResized(async()=>{try{const l=i(),{LogicalSize:d}=await Q(async()=>{const{LogicalSize:u}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:u}},__vite__mapDeps([7,1]));if(l.fixed)await a.setSize(new d(l.w,l.h));else if(!l.custom){const c=(await a.innerSize()).toLogical(await a.scaleFactor());(c.width<650||c.height!==l.h)&&await a.setSize(new d(Math.max(650,c.width),l.h))}}catch{}o()}),ut("melo:skin-changed",async l=>{try{!xt&&l&&await ie(l,jt,void 0,!1,!1);const d=i();if(d.force){const{LogicalSize:u}=await Q(async()=>{const{LogicalSize:c}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:c}},__vite__mapDeps([7,1]));await a.setSize(new u(d.w,d.h))}await e(d),o()}catch{}}),ut("melo:skin-geometry",async()=>{try{const l=i();if(l.force){const{LogicalSize:d}=await Q(async()=>{const{LogicalSize:u}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:u}},__vite__mapDeps([7,1]));await a.setSize(new d(l.w,l.h))}await e(l),o()}catch{}}),a.onCloseRequested(async l=>{if(l.preventDefault(),localStorage.getItem("melo-pref-tray")==="1")try{await a.hide();return}catch{}const{WebviewWindow:u}=await Q(async()=>{const{WebviewWindow:c}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:c}},__vite__mapDeps([6,7,1,0,8]));for(const c of["library","playlist","equalizer","lyrics","settings"])try{const m=await u.getByLabel("panel-"+c);m&&await m.close()}catch{}try{await a.destroy()}catch{window.close()}})}),Q(()=>import("./core-DhEqZVGG.js"),[]).then(async({invoke:t})=>{try{const a=await t("get_cli_tracks");Array.isArray(a)&&a.length>0&&setTimeout(async()=>{const i=window.LumiLibrary,e=a.map(o=>o.path).filter(Boolean),n=await(i==null?void 0:i.importPaths(e,"replace"))||[];n.length&&R("melo:play-tracks",{tracks:n,index:0})},350)}catch{}}),ut("melo:open-files",t=>{if(Array.isArray(t)&&t.length>0){const a=t.map(i=>i.path).filter(Boolean);setTimeout(async()=>{const i=window.LumiLibrary,e=await(i==null?void 0:i.importPaths(a,"replace"))||[];e.length&&R("melo:play-tracks",{tracks:e,index:0})},100)}}));document.addEventListener("contextmenu",t=>{t.preventDefault()});const Se=document.getElementById("toast"),Et=t=>{Se&&(Se.textContent=t,Se.classList.add("show"),setTimeout(()=>Se.classList.remove("show"),2200))},Bt=new Audio;Bt.preload="metadata";Bt.crossOrigin="anonymous";window.__LUMI_AUDIO__=Bt;window.__TOAST__=Et;localStorage.getItem("melo-dynamic-theme")===null&&localStorage.setItem("melo-dynamic-theme","1");let jt=localStorage.getItem("melo-theme")||"dark";function Me(t){document.documentElement.setAttribute("data-theme",t),localStorage.setItem("melo-theme",t),jt=t}function Ta(t){Me(t),R("melo:theme",t)}Me(jt);ut("melo:theme",t=>{(t==="light"||t==="dark")&&Me(t)});setInterval(()=>{const t=localStorage.getItem("melo-theme");(t==="light"||t==="dark")&&t!==jt&&Me(t)},1e3);document.body.classList.toggle("show-stop-btn",localStorage.getItem("melo-pref-showStopBtn")==="1");ut("melo:pref-changed",t=>{t&&t.key==="showStopBtn"&&document.body.classList.toggle("show-stop-btn",!!t.value)});const si=["win-library","win-playlist","win-equalizer","win-lyrics","win-settings"],Le=document.getElementById("desktop"),ri={btnToggleLibrary:"win-library",btnTogglePlaylist:"win-playlist",btnToggleEq:"win-equalizer",btnToggleLyrics:"win-lyrics",btnOpenSettings:"win-settings",menuToggleLibrary:"win-library",menuTogglePlaylist:"win-playlist",menuToggleEq:"win-equalizer",menuToggleLyrics:"win-lyrics",menuToggleSettings:"win-settings"};function ci(t){const a=document.getElementById(t);return!!a&&!a.classList.contains("hidden")}const Ue={library:"btnToggleLibrary",playlist:"btnTogglePlaylist",equalizer:"btnToggleEq",lyrics:"btnToggleLyrics",settings:"btnOpenSettings"};async function di(t,a){const i=async()=>{try{const e=await t.outerPosition(),n=await t.outerSize();localStorage.setItem(a,JSON.stringify({x:e.x,y:e.y,w:n.width,h:n.height}))}catch{}};t.onMoved(i),t.onResized(i)}async function ui(t){const{WebviewWindow:a}=await Q(async()=>{const{WebviewWindow:m}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:m}},__vite__mapDeps([6,7,1,0,8])),i="panel-"+t,e=document.getElementById(Ue[t]),n=await a.getByLabel(i);if(n){await n.close(),e==null||e.classList.remove("active");return}const o={library:[430,620],playlist:[440,560],equalizer:[700,440],lyrics:[380,520],settings:[600,540]},l={library:[360,400],playlist:[360,360],equalizer:[620,400],lyrics:[320,360],settings:[500,400]},d={library:"Library",playlist:"Playlist",equalizer:"Equalizer",lyrics:"Lyric",settings:"Settings"},u=o[t]||[420,520];let c=null;try{c=JSON.parse(localStorage.getItem("melo-geo-panel-"+t)||"null")}catch{}new a(i,{url:`/?panel=${t}`,title:d[t]||t,width:(c==null?void 0:c.w)||u[0],height:(c==null?void 0:c.h)||u[1],minWidth:(l[t]||[360,360])[0],minHeight:(l[t]||[360,360])[1],...(c==null?void 0:c.x)!=null?{x:c.x,y:c.y}:{center:!0},decorations:!1,transparent:!0,shadow:!1,skipTaskbar:!0}),e==null||e.classList.add("active")}ut("melo:panel-closed",t=>{var i;const a=Ue[t];a&&((i=document.getElementById(a))==null||i.classList.remove("active"))});function Ve(t){if(wt){ui(t.replace(/^win-/,""));return}const a=ci(t);we(t,!a),a||_e(document.getElementById(t))}function pi(t){if(t.classList.contains("hidden")||!Le||window.matchMedia("(max-width: 860px)").matches)return;const a=Le.getBoundingClientRect();if(a.width<=0||a.height<=0)return;const i=t.getBoundingClientRect(),e=Math.min(i.width,a.width),n=Math.min(i.height,a.height);let o=i.left-a.left,l=i.top-a.top;o=Math.max(0,Math.min(a.width-e,o)),l=Math.max(0,Math.min(a.height-n,l)),t.style.left=o+"px",t.style.top=l+"px",t.style.right="auto",t.style.bottom="auto",t.style.transform="none"}function we(t,a){var n,o,l,d,u,c,m,y,w,x;const i=document.getElementById(t);if(!i)return;i.classList.toggle("hidden",!a),localStorage.setItem("melo-win-"+t,a?"1":"0"),a&&pi(i);const e=a;t==="win-library"&&((n=document.getElementById("btnToggleLibrary"))==null||n.classList.toggle("active",e),(o=document.getElementById("menuToggleLibrary"))==null||o.classList.toggle("active",e)),t==="win-playlist"&&((l=document.getElementById("btnTogglePlaylist"))==null||l.classList.toggle("active",e),(d=document.getElementById("menuTogglePlaylist"))==null||d.classList.toggle("active",e)),t==="win-equalizer"&&((u=document.getElementById("btnToggleEq"))==null||u.classList.toggle("active",e),(c=document.getElementById("menuToggleEq"))==null||c.classList.toggle("active",e)),t==="win-lyrics"&&((m=document.getElementById("btnToggleLyrics"))==null||m.classList.toggle("active",e),(y=document.getElementById("menuToggleLyrics"))==null||y.classList.toggle("active",e)),t==="win-settings"&&((w=document.getElementById("btnOpenSettings"))==null||w.classList.toggle("active",e),(x=document.getElementById("menuToggleSettings"))==null||x.classList.toggle("active",e))}xt||si.forEach(t=>{const a=localStorage.getItem("melo-win-"+t);a!==null?we(t,a==="1"):t==="win-settings"?we(t,!1):we(t,!0)});Object.entries(ri).forEach(([t,a])=>{var i;(i=document.getElementById(t))==null||i.addEventListener("click",()=>Ve(a))});document.querySelectorAll("[data-close]").forEach(t=>{t.addEventListener("click",()=>{const a=t.dataset.close;we(a,!1)})});let Pt=null,qt=null,pa=10;function _e(t){pa++,t.style.zIndex=String(pa),document.querySelectorAll(".float-win").forEach(a=>a.classList.remove("active")),t.classList.add("active")}document.querySelectorAll(".float-win").forEach(t=>{t.addEventListener("mousedown",()=>_e(t))});document.querySelectorAll("[data-drag]").forEach(t=>{t.addEventListener("mousedown",a=>{if(a.target.closest("button")||a.target.closest("input")||a.target.closest("select"))return;const i=t.dataset.drag,e=document.getElementById(i);_e(e),e.classList.add("dragging");const n=e.getBoundingClientRect();Pt={id:i,startX:a.clientX,startY:a.clientY,initX:n.left,initY:n.top,width:n.width,height:n.height}})});document.querySelectorAll("[data-resize]").forEach(t=>{t.addEventListener("mousedown",a=>{a.stopPropagation();const i=t.dataset.resize,e=document.getElementById(i);_e(e),e.classList.add("resizing");const n=e.getBoundingClientRect();qt={id:i,startX:a.clientX,startY:a.clientY,initW:n.width,initH:n.height}})});window.addEventListener("mousemove",t=>{if(Pt){const a=document.getElementById(Pt.id);let i=t.clientX-Pt.startX,e=t.clientY-Pt.startY,n=Pt.initX+i,o=Pt.initY+e;if(Le&&!window.matchMedia("(max-width: 860px)").matches){const l=Le.getBoundingClientRect(),d=l.left,u=l.right-Pt.width,c=l.top,m=l.bottom-Pt.height;n=Math.max(d,Math.min(u,n))-l.left,o=Math.max(c,Math.min(m,o))-l.top}a.style.left=n+"px",a.style.top=o+"px",a.style.right="auto",a.style.bottom="auto",a.style.transform="none"}if(qt){const a=document.getElementById(qt.id);let i=qt.initW+(t.clientX-qt.startX),e=qt.initH+(t.clientY-qt.startY);i=Math.max(260,i),e=Math.max(160,e),a.style.width=i+"px",a.style.height=e+"px"}});window.addEventListener("mouseup",()=>{if(Pt){const t=document.getElementById(Pt.id);t&&(t.classList.remove("dragging"),localStorage.setItem("melo-win-pos-"+Pt.id,JSON.stringify({left:t.style.left,top:t.style.top}))),Pt=null}if(qt){const t=document.getElementById(qt.id);t&&(t.classList.remove("resizing"),localStorage.setItem("melo-win-size-"+qt.id,JSON.stringify({width:t.style.width,height:t.style.height}))),qt=null}});async function Ca(){const t=window.LumiLibrary,a=window.LumiPlayer;if(wt){try{const{open:e}=await Q(async()=>{const{open:d}=await import("./index-CS3Qnt9j.js");return{open:d}},__vite__mapDeps([5,1])),n=await e({multiple:!0,filters:[{name:"Audio",extensions:["mp3","flac","wav","aac","ogg","m4a","alac","opus","wma","aiff"]}]});if(!n)return;const o=Array.isArray(n)?n:[n],l=await(t==null?void 0:t.importPaths(o,"replace"))||[];l.length&&(R("melo:play-tracks",{tracks:l,index:0}),Et(`${l.length} file(s) added`))}catch{Et("Error opening files")}return}const i=document.createElement("input");i.type="file",i.multiple=!0,i.accept="audio/*,.mp3,.flac,.wav,.aac,.ogg,.m4a,.alac,.opus,.wma,.aiff",i.onchange=async()=>{const e=Array.from(i.files||[]);if(!e.length)return;const n=[];for(const o of e){const l=o.path,d=l||URL.createObjectURL(o),u=o.name,c=u.lastIndexOf("."),m=c>0?u.slice(0,c):u,y=c>0?u.slice(c+1).toUpperCase():"AUDIO",w={id:l||"imp_"+Math.random().toString(36).slice(2,9),title:m,artist:"Unknown Artist",album:"Single",duration:0,path:d,codec:y,specs:"Local File",source:"import"};await va(o,w),n.push(w)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(o=>a==null?void 0:a.queue.push(o)),R("melo:play-tracks",{tracks:n,index:0}),Et(`${n.length} file(s) added`)},i.click()}async function Aa(){const t=window.LumiLibrary,a=window.LumiPlayer;if(wt){try{const{open:e}=await Q(async()=>{const{open:l}=await import("./index-CS3Qnt9j.js");return{open:l}},__vite__mapDeps([5,1])),n=await e({directory:!0});if(!n)return;const o=n;await(t==null?void 0:t.scanFolder(o,!0))}catch{Et("Error scanning folder")}return}const i=document.createElement("input");i.type="file",i.webkitdirectory=!0,i.multiple=!0,i.accept="audio/*",i.onchange=async()=>{const e=Array.from(i.files||[]).filter(o=>/\.(mp3|flac|wav|aac|ogg|m4a|alac|opus|wma|aiff)$/i.test(o.name));if(!e.length)return;const n=[];for(const o of e){const l=o.path,d=l||URL.createObjectURL(o),u=o.name,c=u.lastIndexOf("."),m=c>0?u.slice(0,c):u,y=c>0?u.slice(c+1).toUpperCase():"AUDIO",w={id:l||"imp_"+Math.random().toString(36).slice(2,9),title:m,artist:"Unknown Artist",album:"Folder Import",duration:0,path:d,codec:y,specs:"Local File",source:"import"};await va(o,w),n.push(w)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(o=>a==null?void 0:a.queue.push(o)),R("melo:play-tracks",{tracks:n,index:0}),Et(`${n.length} file(s) added from folder`)},i.click()}document.addEventListener("click",t=>{var e;const a=(e=t.target)==null?void 0:e.closest('#btnAddFiles, #btnAddFolder, #btnThemeToggle, [data-melo="add-files"], [data-melo="add-folder"], [data-melo="theme-toggle"]');if(!a)return;const i=a.getAttribute("data-melo")||a.id;i==="btnAddFiles"||i==="add-files"?Ca():i==="btnAddFolder"||i==="add-folder"?Aa():(i==="btnThemeToggle"||i==="theme-toggle")&&Ta(jt==="light"?"dark":"light")});window.addEventListener("keydown",t=>{(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="o"&&(t.shiftKey?(t.preventDefault(),Aa()):(t.preventDefault(),Ca())),((t.ctrlKey||t.metaKey)&&t.key===","||t.key==="F2")&&(t.preventDefault(),Ve("win-settings"))});function ma(t){var pt,vt;function a(L){document.querySelectorAll(".settings-tab").forEach(N=>{N.classList.toggle("active",N.dataset.stab===L)}),document.querySelectorAll(".settings-section[data-panel]").forEach(N=>{N.classList.toggle("active",N.dataset.panel===L)}),localStorage.setItem("melo-settings-tab",L)}document.querySelectorAll(".settings-tab").forEach(L=>{L.addEventListener("click",()=>a(L.dataset.stab))}),a(localStorage.getItem("melo-settings-tab")||"general"),document.querySelectorAll(".switch[data-key]").forEach(L=>{const N=L.dataset.key,ot=localStorage.getItem("melo-pref-"+N);ot!==null&&L.classList.toggle("on",ot==="1"),L.onclick=()=>{L.classList.toggle("on");const yt=L.classList.contains("on");localStorage.setItem("melo-pref-"+N,yt?"1":"0"),R("melo:pref-changed",{key:N,value:yt})}});const i=document.getElementById("swCrossfade"),e=document.getElementById("crossfadeDurationRow"),n=document.getElementById("crossfadeDurationRange"),o=document.getElementById("crossfadeDurationValue"),l=document.getElementById("btnCrossfadeDown"),d=document.getElementById("btnCrossfadeUp");function u(){const L=localStorage.getItem("melo-pref-crossfade")==="1";e==null||e.classList.toggle("disabled-row",!L)}u(),i==null||i.addEventListener("click",()=>setTimeout(u,0));function c(){if(!n)return;const N=((parseInt(n.value,10)||1)-1)/11*100;n.style.setProperty("--progress",N+"%")}function m(L){const N=Math.min(12,Math.max(1,Math.round(L)));localStorage.setItem("melo-pref-crossfadeDuration",String(N)),n&&(n.value=String(N)),o&&(o.textContent=N+"s"),c(),R("melo:pref-changed",{key:"crossfadeDuration",value:N})}const y=parseInt(localStorage.getItem("melo-pref-crossfadeDuration")||"4",10);{const L=Math.min(12,Math.max(1,Number.isFinite(y)?y:4));n&&(n.value=String(L)),o&&(o.textContent=L+"s"),c()}n&&(n.oninput=()=>m(parseInt(n.value,10))),l==null||l.addEventListener("click",()=>m(parseInt((n==null?void 0:n.value)||"4",10)-1)),d==null||d.addEventListener("click",()=>m(parseInt((n==null?void 0:n.value)||"4",10)+1));const w=document.getElementById("swEmbeddedPlaylistCover"),x=document.getElementById("embeddedFontScaleRange"),B=document.getElementById("embeddedFontScaleValue"),H=document.getElementById("btnEmbeddedFontDown"),tt=document.getElementById("btnEmbeddedFontUp");function dt(){var L,N;(N=(L=window.__MELO_EMBEDDED_PLAYLIST__)==null?void 0:L.refresh)==null||N.call(L)}w==null||w.addEventListener("click",()=>setTimeout(dt,0));function g(L){const N=Math.min(140,Math.max(70,Math.round(L/10)*10));localStorage.setItem("melo-pref-embeddedPlaylistFontScale",String(N)),x&&(x.value=String(N)),B&&(B.textContent=N+"%"),dt()}const et=parseInt(localStorage.getItem("melo-pref-embeddedPlaylistFontScale")||"100",10);{const L=Math.min(140,Math.max(70,Number.isFinite(et)?et:100));x&&(x.value=String(L)),B&&(B.textContent=L+"%")}x&&(x.oninput=()=>g(parseInt(x.value,10))),H==null||H.addEventListener("click",()=>g(parseInt((x==null?void 0:x.value)||"100",10)-10)),tt==null||tt.addEventListener("click",()=>g(parseInt((x==null?void 0:x.value)||"100",10)+10));const D=document.getElementById("setLanguage");D&&(D.value=oi(),D.onchange=async()=>{await Ma(D.value),t(`Language set to ${D.options[D.selectedIndex].text} — restart Melo to fully apply`)});const S=document.getElementById("swDynamicTheme");if(S){const L=localStorage.getItem("melo-dynamic-theme")!=="0";S.classList.toggle("on",L),S.onclick=()=>{var $t,gt;const N=!S.classList.contains("on");S.classList.toggle("on",N),localStorage.setItem("melo-dynamic-theme",N?"1":"0");const ot=window.__LUMI_QUEUE__,yt=(gt=($t=window.LumiPlayer)==null?void 0:$t.currentIndex)!=null?gt:0;ot&&ot[yt]&&ya(N?ot[yt].cover:null)}}const f=document.getElementById("skinSelect"),p=document.getElementById("btnSkinThemeToggle"),T=document.getElementById("btnRefreshSkins"),_=document.getElementById("btnOpenSkinsFolder"),Y=document.getElementById("skinThemeIcon"),G=document.getElementById("skinThemeLabel");function V(L){Y&&(Y.textContent=L==="dark"?"🌙":"☀️"),G&&(G.textContent=L==="dark"?"Dark":"Light")}V(jt),p==null||p.addEventListener("click",()=>{const L=jt==="dark"?"light":"dark";Ta(L),V(L),t(L==="dark"?"Dark theme":"Light theme")}),ut("melo:theme",L=>{(L==="light"||L==="dark")&&V(L)});async function X(){if(!f)return;const L=localStorage.getItem("melo-active-skin-id")||"default",N=await ka();f.innerHTML=`
      <option value="default">Default Melo (Standard)</option>
      <option value="compact-pill">Minimal Compact (Pill Bar)</option>
    `,N.forEach(ot=>{if(ot.filename!=="compact-pill.html"&&ot.filename!=="compact-pill-light.html"&&ot.filename!=="compact-pill-dark.html"){const yt=document.createElement("option");yt.value=ot.filename,yt.textContent=`${ot.name} (${ot.filename})`,f.appendChild(yt)}}),f.value=L}X(),f&&(f.onchange=()=>{const L=f.value;ie(L,jt,t)}),T==null||T.addEventListener("click",async()=>{await X();const L=localStorage.getItem("melo-active-skin-id")||"default";ie(L,jt,t),t("Skins reloaded from disk")}),_==null||_.addEventListener("click",()=>{xa(t)}),(pt=document.getElementById("btn-reset-skin-settings"))==null||pt.addEventListener("click",()=>{He(t),f&&(f.value="default")}),(vt=document.getElementById("btn-settings-reset"))==null||vt.addEventListener("click",()=>{localStorage.clear(),t("Settings reset — reloading..."),setTimeout(()=>location.reload(),600)})}function Pa(){document.querySelectorAll('.win-btn, [data-melo="minimize"], [data-melo="close"]').forEach(t=>{t.onclick=async()=>{const a=t.getAttribute("aria-label")||t.getAttribute("data-melo");if(window.__TAURI__){const{getCurrentWindow:i}=await Q(async()=>{const{getCurrentWindow:n}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:n}},__vite__mapDeps([8,7,1,0])),e=i();a==="minimize"?e.minimize():a==="close"&&e.close()}else a==="close"&&Et("Window close requires the Tauri desktop build")}})}Pa();const mi=[["btnToggleLibrary","toggle-library","win-library"],["btnTogglePlaylist","toggle-playlist","win-playlist"],["btnToggleEq","toggle-eq","win-equalizer"],["btnToggleLyrics","toggle-lyrics","win-lyrics"],["btnOpenSettings","toggle-settings","win-settings"]];window.__LUMI_REBIND_MAIN__=()=>{Pa(),mi.forEach(([t,a,i])=>{const e=lt(t,a);e&&(e.onclick=()=>Ve(i))}),za()};const Ee=document.createElement("div");Ee.className="embedded-lyrics";const Oe=document.createElement("div");Oe.className="embedded-lyrics-title";let fa=!1;function De(){var i;const t=lt("visualizer","visualizer"),a=!t||t.offsetParent===null;(i=window.__MELO_VISUALIZER_SET_PAUSED__)==null||i.call(window,a)}function za(){var o;const t=window.__MELO_EMBEDDED_PLAYLIST__,a=lt("embedded-playlist","embedded-playlist");a&&(t!=null&&t.container)&&(t.container.parentElement!==a&&a.appendChild(t.container),(o=t.refresh)==null||o.call(t));const i=lt("embedded-lyrics","embedded-lyrics");i&&(Ee.parentElement!==i&&(i.appendChild(Oe),i.appendChild(Ee)),fa||(fa=!0,qe(Bt,Et,{container:Ee,title:Oe})));const e=lt("toggle-embedded-playlist","toggle-embedded-playlist");e&&(e.onclick=()=>{var l;document.documentElement.classList.toggle("melo-show-playlist"),document.documentElement.classList.remove("melo-show-lyrics"),(l=t==null?void 0:t.refresh)==null||l.call(t),De()});const n=lt("toggle-embedded-lyrics","toggle-embedded-lyrics");n&&(n.onclick=()=>{document.documentElement.classList.toggle("melo-show-lyrics"),document.documentElement.classList.remove("melo-show-playlist"),De()}),De()}const le=document.createElement("div");le.id="aboutPop";le.style.display="none";document.body.appendChild(le);document.addEventListener("click",t=>{var a,i;(a=t.target)!=null&&a.closest('#btnAbout, [data-melo="about"]')&&(t.stopPropagation(),le.innerHTML=`
    <div class="about-head">Melo <b>0.5.2 Beta</b></div>
    <div style="font-size:11.5px; color:var(--text-soft); margin:6px 0 10px;">
      Modern Windows Music Player<br/>
      Tauri 2 + TypeScript + Rust
    </div>
    <a class="about-link" id="aboutLink" href="https://github.com/Arvanta/Melo" rel="noopener">github.com/Arvanta/Melo ↗</a>`,le.style.display=le.style.display==="none"?"block":"none",(i=document.getElementById("aboutLink"))==null||i.addEventListener("click",e=>{e.preventDefault();const n="https://github.com/Arvanta/Melo";wt?Q(()=>import("./core-DhEqZVGG.js"),[]).then(o=>o.invoke("open_url",{url:n})).catch(()=>window.open(n,"_blank")):window.open(n,"_blank")}))});document.addEventListener("click",t=>{!t.target.closest("#aboutPop")&&!t.target.closest('#btnAbout, [data-melo="about"]')&&(le.style.display="none")});wt&&xt?xt==="library"||xt==="playlist"?sa(Bt,Et):xt==="equalizer"?ra(Bt,Et,{remote:!0}):xt==="lyrics"?qe(Bt):xt==="settings"&&(ua(),ma(Et),oa(Et)):(ai(Bt,Et),sa(Bt,Et),ra(Bt,Et),ii(Bt),qe(Bt),oa(Et),ma(Et),ua(),za(),setTimeout(async()=>{try{const t=localStorage.getItem("melo-pref-resume")!=="0",a=JSON.parse(localStorage.getItem("melo-resume-state")||"null"),i=window.LumiLibrary,e=window.LumiPlayer;if(!(a!=null&&a.trackId)||!i||!e)return;const n=await i.getTrack(a.trackId);if(!n)return;let o=[n],l=0;if(typeof i.getCurrentPlaylistId=="function"&&typeof i.getPlaylistTracksAll=="function"){const d=i.getCurrentPlaylistId();if(d){const u=await i.getPlaylistTracksAll(d),c=u.findIndex(m=>m.id===n.id);c>=0&&(o=u,l=c)}}if(o.length===1&&typeof i.getAllTracks=="function"){const d=await i.getAllTracks(),u=d.findIndex(c=>c.id===n.id);u>=0&&(o=d,l=u)}e.queue=o,e.loadTrack(l,t,a.position||0)}catch{}},500));
//# sourceMappingURL=index-f-CUYaSK.js.map
