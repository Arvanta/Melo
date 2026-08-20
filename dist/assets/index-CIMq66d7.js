const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/event-CNdo2oXa.js","assets/core-DhEqZVGG.js","assets/index-DiyoAAdc.js","assets/index-CHth0gh2.js","assets/index-Bq0iOnRE.js","assets/index-CS3Qnt9j.js","assets/webviewWindow-mjQkSB26.js","assets/dpi-fvP-W2qr.js","assets/window-BWd3Cypy.js"])))=>i.map(i=>d[i]);
(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))e(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&e(l)}).observe(document,{childList:!0,subtree:!0});function i(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function e(n){if(n.ep)return;n.ep=!0;const s=i(n);fetch(n.href,s)}})();const da="modulepreload",ua=function(t){return"/"+t},_e={},Y=function(a,i,e){let n=Promise.resolve();if(i&&i.length>0){let l=function(c){return Promise.all(c.map(p=>Promise.resolve(p).then(y=>({status:"fulfilled",value:y}),y=>({status:"rejected",reason:y}))))};document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),u=(d==null?void 0:d.nonce)||(d==null?void 0:d.getAttribute("nonce"));n=l(i.map(c=>{if(c=ua(c),c in _e)return;_e[c]=!0;const p=c.endsWith(".css"),y=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${y}`))return;const v=document.createElement("link");if(v.rel=p?"stylesheet":da,p||(v.as="script"),v.crossOrigin="",v.href=c,u&&v.setAttribute("nonce",u),document.head.appendChild(v),p)return new Promise((S,P)=>{v.addEventListener("load",S),v.addEventListener("error",()=>P(new Error(`Unable to preload CSS for ${c}`)))})}))}function s(l){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=l,window.dispatchEvent(d),!d.defaultPrevented)throw l}return n.then(l=>{for(const d of l||[])d.status==="rejected"&&s(d.reason);return a().catch(s)})},ft=typeof window.__TAURI_INTERNALS__<"u"||typeof window.__TAURI__<"u";async function U(t,a){if(ft)try{const{emit:i}=await Y(async()=>{const{emit:e}=await import("./event-CNdo2oXa.js");return{emit:e}},__vite__mapDeps([0,1]));await i(t,a);return}catch{}window.dispatchEvent(new CustomEvent(t,{detail:a}))}function it(t,a){ft&&Y(async()=>{const{listen:i}=await import("./event-CNdo2oXa.js");return{listen:i}},__vite__mapDeps([0,1])).then(({listen:i})=>{i(t,e=>{a(e.payload)})}).catch(()=>{}),window.addEventListener(t,i=>a(i.detail))}let Te=!1;async function pa(){if(!Te){Te=!0;try{const t=globalThis;if(typeof t.Buffer>"u"){const a=await Y(()=>import("./index-DiyoAAdc.js").then(i=>i.i),__vite__mapDeps([2,3]));t.Buffer=a.Buffer}typeof t.process>"u"&&(t.process={env:{},browser:!0,nextTick:a=>setTimeout(a,0)})}catch{}}}async function ma(t,a){var i;try{await pa();const e=await Y(()=>import("./index-Bq0iOnRE.js").then(c=>c.i),__vite__mapDeps([4,3])),n=e&&typeof e.parseBlob=="function"?e:e.default||e,s=await Promise.race([n.parseBlob(t),new Promise((c,p)=>setTimeout(()=>p(new Error("timeout")),1800))]),l=s==null?void 0:s.common;if(!l)return;l.title&&(a.title=l.title),l.artist?a.artist=l.artist:l.artists&&l.artists[0]&&(a.artist=l.artists[0]),l.album&&(a.album=l.album),l.genre&&l.genre[0]&&(a.genre=l.genre[0]),l.year&&(a.year=l.year);const d=(i=l.picture)==null?void 0:i[0];if(d&&d.data){const c=d.format||"image/jpeg",p=d.data;if(p.length>6e5)return;let y="";const v=8192;for(let S=0;S<p.length;S+=v){const P=p.subarray(S,S+v);y+=String.fromCharCode.apply(null,P)}a.cover=`data:${c};base64,${btoa(y)}`}const u=s==null?void 0:s.format;u&&u.duration&&!a.duration&&(a.duration=Math.floor(u.duration))}catch{}}async function We(t,a,i=1800){return await ma(t,a),a}async function fa(t){return new Promise(a=>{if(!t)return a(null);const i=new Image;i.crossOrigin="anonymous",i.onload=()=>{try{const e=document.createElement("canvas"),n=e.getContext("2d");if(!n)return a(null);e.width=40,e.height=40,n.drawImage(i,0,0,40,40);const s=n.getImageData(0,0,40,40).data;let l={r:42,g:123,b:214},d=-1;for(let u=0;u<s.length;u+=4){const c=s[u],p=s[u+1],y=s[u+2];if(s[u+3]<128)continue;const S=Math.max(c,p,y),P=Math.min(c,p,y),k=(S+P)/510,W=S-P,H=W===0?0:W/(1-Math.abs(2*k-1));if(H>.25&&k>.25&&k<.82){const M=H*1.5+(1-Math.abs(k-.5));M>d&&(d=M,l={r:c,g:p,b:y})}}d>0?a(l):a(null)}catch{a(null)}},i.onerror=()=>a(null),i.src=t})}async function Fe(t){const a=localStorage.getItem("melo-dynamic-theme")!=="0",i=document.documentElement;if(!a||!t){i.style.removeProperty("--accent"),i.style.removeProperty("--visualizer"),i.style.removeProperty("--accent-glow");return}const e=await fa(t);if(e){const n=`rgb(${e.r}, ${e.g}, ${e.b})`;i.style.setProperty("--accent",n),i.style.setProperty("--visualizer",n),i.style.setProperty("--accent-glow",`rgba(${e.r}, ${e.g}, ${e.b}, 0.35)`)}else i.style.removeProperty("--accent"),i.style.removeProperty("--visualizer"),i.style.removeProperty("--accent-glow")}const se=[31,62,125,250,500,1e3,2e3,4e3,8e3,16e3];let Et=null,Dt=[],re=null,Kt=null;const Ce=new WeakMap;function je(){if(Et)return;const t=window.AudioContext||window.webkitAudioContext;Et=new t,Dt=se.map(a=>{const i=Et.createBiquadFilter();return i.type="peaking",i.frequency.value=a,i.Q.value=1.4,i.gain.value=0,i});for(let a=0;a<Dt.length-1;a++)Dt[a].connect(Dt[a+1]);re=Et.createGain(),re.gain.value=1,Kt=Et.createAnalyser(),Kt.fftSize=2048,Kt.smoothingTimeConstant=.72,Dt[Dt.length-1].connect(re),re.connect(Kt),Kt.connect(Et.destination)}function Ae(t){je();const a=Ce.get(t);if(a)return a;try{const i=Et.createMediaElementSource(t),e=Et.createGain();e.gain.value=1,i.connect(e),e.connect(Dt[0]);const n={source:i,gain:e};return Ce.set(t,n),n}catch{return null}}function Qt(t){return je(),Ae(t),{ctx:Et,filters:Dt,gain:re,analyser:Kt,async resume(){Et&&Et.state==="suspended"&&await Et.resume().catch(()=>{})},getDeck(a){return Ae(a)}}}let At=null;function at(t,a){const i=document.getElementById(t);return i||document.querySelector(`[data-melo="${a}"]`)}function ga(t){const a=c=>{const p=t.match(new RegExp(c+`\\s*=\\s*["']?(\\d+)`));return p?parseInt(p[1],10):null},i=a("data-window-width"),e=a("data-window-height"),n=a("data-min-width"),s=a("data-min-height"),l=a("data-max-width"),d=a("data-max-height"),u=!/data-resizable\s*=\s*["\']?false/i.test(t);return i==null&&e==null&&n==null&&s==null&&l==null&&d==null?null:{width:i!=null?i:void 0,height:e!=null?e:void 0,minWidth:n!=null?n:void 0,minHeight:s!=null?s:void 0,maxWidth:l!=null?l:void 0,maxHeight:d!=null?d:void 0,resizable:u}}function ha(){try{const t=JSON.parse(localStorage.getItem("melo-skin-geometry")||"null");return!t||typeof t!="object"?null:t}catch{}return null}const Zt=`<!doctype html>
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
`,ge={"compact-pill.html":Zt,"compact-pill":Zt,"compact-pill-light.html":Zt,"compact-pill-dark.html":Zt,"compact-pill-light":Zt,"compact-pill-dark":Zt},va=[{id:"compact-pill",name:"Minimal Compact (Light/Dark)",filename:"compact-pill.html"},{id:"full-html-example",name:"Full HTML Example",filename:"full-html-example.html"},{id:"slate",name:"Slate",filename:"slate.html"},{id:"silk-orbit",name:"Silk Orbit",filename:"silk-orbit.html"},{id:"ivory",name:"Ivory",filename:"ivory.html"},{id:"microline",name:"Microline",filename:"microline.html"}];function Ge(t){const a=["trackTitle","btnPlay","seekBar","coverImg"];let i=0;for(const n of a)t.includes(n)&&i++;const e=(t.match(/data-melo\s*=/g)||[]).length;return i+=Math.min(e,3),i>=3}function Wt(t,a,i=!0){const e=document.getElementById("playerCard");if(!e)return;const n=e._originalHTML||e.innerHTML;e._originalHTML||(e._originalHTML=n),At&&(At.remove(),At=null);let l=[...t.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(v=>v[1]).join(`
`);l&&(At=document.createElement("style"),At.id="melo-custom-skin",At.textContent=l,document.head.appendChild(At));const d=Ge(t);let u="";const c=t.match(/<body[^>]*>([\s\S]*?)<\/body>/i);c?u=c[1]:u=t.split(/<\/style>/i).pop()||"";const p=document.createElement("div");p.innerHTML=u;const y=p.querySelector("#lumi-player");if(y&&(u=y.innerHTML),d&&u.trim().length>20){const v=u.trim();e.innerHTML=v,a&&a("Skin applied"),setTimeout(()=>{var P,k;(P=window.__LUMI_REBIND__)==null||P.call(window);const S=window.__LUMI_AUDIO__;S&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(S),(k=window.__LUMI_REBIND_MAIN__)==null||k.call(window)},40)}else l&&a&&a("Skin CSS applied");if(d){const v=ga(t);v?(localStorage.setItem("melo-skin-geometry",JSON.stringify(v)),i&&U("melo:skin-geometry",v)):localStorage.removeItem("melo-skin-geometry")}localStorage.setItem("lumi-custom-skin",t),localStorage.setItem("lumi-custom-skin-isFull",d?"1":"0")}function xe(t,a=!0){document.documentElement.classList.remove("compact-skin-active"),document.body.classList.remove("compact-skin-active"),document.documentElement.classList.remove("custom-skin-active"),document.body.classList.remove("custom-skin-active"),At&&(At.remove(),At=null);const i=document.getElementById("playerCard");i&&i._originalHTML&&(i.innerHTML=i._originalHTML,setTimeout(()=>{var n,s;(n=window.__LUMI_REBIND__)==null||n.call(window);const e=window.__LUMI_AUDIO__;e&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(e),(s=window.__LUMI_REBIND_MAIN__)==null||s.call(window)},40)),localStorage.removeItem("lumi-custom-skin"),localStorage.removeItem("lumi-custom-skin-isFull"),localStorage.removeItem("melo-skin-geometry"),localStorage.setItem("melo-active-skin-id","default"),a&&U("melo:skin-changed","default"),t&&t("Switched to Default Melo skin")}async function Ye(){if(ft)try{const{invoke:t}=await Y(async()=>{const{invoke:i}=await import("./core-DhEqZVGG.js");return{invoke:i}},[]),a=await t("list_installed_skins");if(Array.isArray(a)&&a.length>0)return a}catch{}return va}async function ya(t,a,i=!0){if(ft)try{const{invoke:n}=await Y(async()=>{const{invoke:l}=await import("./core-DhEqZVGG.js");return{invoke:l}},[]),s=await n("read_skin_file",{filenameOrPath:t});if(s&&s.trim().length>0)return Wt(s,a,i),!0}catch{}try{const n=t.startsWith("skins/")?t:`skins/${t}`,s=await fetch(n);if(s.ok){const l=await s.text();return Wt(l,a,i),!0}}catch{}const e=t.replace(/^.*[\\/]/,"");return ge[e]?(Wt(ge[e],a,i),!0):(a&&a(`Could not load skin: ${t}`),!1)}async function Vt(t,a,i,e=!0,n=!0){if(t==="default"){xe(i,e);return}let s=t;const l=t==="compact-pill"||t.startsWith("compact-pill"),d=!l;document.documentElement.classList.toggle("compact-skin-active",l),document.body.classList.toggle("compact-skin-active",l),document.documentElement.classList.toggle("custom-skin-active",d),document.body.classList.toggle("custom-skin-active",d),l?s="compact-pill.html":!s.endsWith(".html")&&!s.endsWith(".htm")&&(s=s+".html");let u=!1;l&&ge[s]?(Wt(ge[s],i,n),u=!0):u=await ya(s,i,n),u&&(localStorage.setItem("melo-active-skin-id",t),e&&U("melo:skin-changed",t))}async function Je(t){if(ft)try{const{invoke:a}=await Y(async()=>{const{invoke:i}=await import("./core-DhEqZVGG.js");return{invoke:i}},[]);await a("open_skins_folder"),t&&t("Opening skins folder...")}catch{t&&t("Could not open skins folder")}else t&&t("Skins are located in the skins/ folder")}function Pe(t){const a=document.getElementById("skinUpload"),i=localStorage.getItem("melo-active-skin-id")||"default",e=localStorage.getItem("lumi-theme")||"dark";i!=="default"&&setTimeout(()=>{Vt(i,e,void 0,!1,!1)},150),it("melo:theme",n=>{const s=localStorage.getItem("melo-active-skin-id");s&&s!=="default"&&Vt(s,n,void 0,!1,!1)}),it("melo:skin-changed",n=>{if(n&&typeof n=="string"){const s=localStorage.getItem("lumi-theme")||"dark";Vt(n,s,void 0,!1,!1)}}),a&&a.addEventListener("change",async()=>{var d;const n=(d=a.files)==null?void 0:d[0];if(!n)return;const s=await n.text(),l=n.name;if(ft)try{const{invoke:u}=await Y(async()=>{const{invoke:c}=await import("./core-DhEqZVGG.js");return{invoke:c}},[]);await u("save_custom_skin_file",{filename:l,content:s}),t(`Saved ${l} to skins folder`)}catch{}Wt(s,t),localStorage.setItem("melo-active-skin-id",l),U("melo:skin-changed",l),a.value=""}),document.addEventListener("dragover",n=>{var s;[...((s=n.dataTransfer)==null?void 0:s.types)||[]].includes("Files")&&n.preventDefault()}),document.addEventListener("drop",async n=>{var l;const s=[...((l=n.dataTransfer)==null?void 0:l.files)||[]].find(d=>d.name.endsWith(".html")||d.name.endsWith(".htm"));if(s){n.preventDefault();const d=await s.text();if(d.includes("<style")||d.includes("<html")||Ge(d)){const u=s.name;if(ft)try{const{invoke:c}=await Y(async()=>{const{invoke:p}=await import("./core-DhEqZVGG.js");return{invoke:p}},[]);await c("save_custom_skin_file",{filename:u,content:d})}catch{}Wt(d,t),localStorage.setItem("melo-active-skin-id",u),U("melo:skin-changed",u)}}}),window.LumiSkin={applyCustomSkin:Wt,resetSkin:xe,applySkinChoice:Vt,listInstalledSkins:Ye,openSkinsFolderOnDisk:Je}}function ba(t,a){let i,e,n,s,l,d,u,c=null,p,y,v,S,P,k,W,H,M,nt,lt,L,g,m=t,h=null,x=[],$=0,J=!1,V="off",F=!1;function K(){if(!x.length)return null;if(V==="one")return $;let o=$+1;if(J&&(o=Math.floor(Math.random()*x.length),o===$&&x.length>1&&(o=(o+1)%x.length)),o>=x.length)if(V==="all")o=0;else return null;return o}window.__LUMI_QUEUE__=x,window.__LUMI_SET_QUEUE__=o=>{x=o,window.__LUMI_QUEUE__=o};function ut(o){if(!isFinite(o))return"0:00";const C=Math.floor(o/60),r=Math.floor(o%60).toString().padStart(2,"0");return`${C}:${r}`}function ht(){if(!p)return;const o=parseFloat(p.max)||100,C=parseFloat(p.value)||0,r=o>0?C/o*100:0;p.style.setProperty("--progress",r+"%")}function Lt(){y&&y.style.setProperty("--vol",y.value+"%")}function Mt(){k&&(k.classList.toggle("muted",m.muted),k.title=m.muted?"Unmute":"Mute")}function It(o=!0){m.muted=!m.muted,vt&&Q&&(Q.muted=m.muted),Mt(),o&&a(m.muted?"Muted":"Unmuted")}async function $t(o){if(!o)return"";if(/^(https?|data|blob):/.test(o))return o;if(ft)try{const{convertFileSrc:C}=await Y(async()=>{const{convertFileSrc:r}=await import("./core-DhEqZVGG.js");return{convertFileSrc:r}},[]);return C(o)}catch{}return o}let vt=!1,pt=null,Q=null,bt=null,mt=null;function b(){return localStorage.getItem("melo-pref-crossfade")==="1"}function w(){const o=parseInt(localStorage.getItem("melo-pref-crossfadeDuration")||"4",10);return Number.isFinite(o)?Math.min(12,Math.max(1,o)):4}function I(){return h||(h=new Audio,h.preload="auto",h.crossOrigin="anonymous",ae(h)),h}function _(){return m===t?I():t}function T(o,C){try{const r=Qt(t),f=r.getDeck(o);f==null||f.gain.gain.cancelScheduledValues(r.ctx.currentTime),f==null||f.gain.gain.setValueAtTime(C,r.ctx.currentTime)}catch{}}function z(){if(mt&&(clearTimeout(mt),mt=null),!vt){pt=null,Q=null,bt=null;return}if(vt=!1,Q){T(Q,0);try{Q.pause(),Q.currentTime=0}catch{}}pt&&T(pt,1),pt=null,Q=null,bt=null}function O(o){var q;if(!y)return 1;const C=parseInt(y.value,10)/100,f=localStorage.getItem("melo-pref-replayGainGlobal")!=="0"&&(q=o==null?void 0:o.replayGain)!=null?q:0,E=Math.pow(10,f/20);return Math.min(1,Math.max(0,C*E))}function B(){return O(x[$])}function N(){if(vt||!b()||V==="one"||x.length<=1)return;const o=m.duration;if(!isFinite(o)||o<=0)return;const C=K();if(C===null)return;const r=o-m.currentTime;if(r<=0)return;const f=Math.min(w(),Math.max(1,o*.9));r<=f&&X(C,f)}async function X(o,C){const r=x[o];if(!r)return;vt=!0;const f=m,E=_();pt=f,Q=E,bt=o;try{E.pause(),E.src=await $t(r.path),E.load()}catch{z();return}if(Q!==E||!vt)return;const q=()=>{E.removeEventListener("error",q),Q===E&&z()};E.addEventListener("error",q,{once:!0});const D=Qt(t),A=D.getDeck(f),yt=D.getDeck(E);if(!A||!yt){z();return}E.volume=O(r),E.muted=f.muted;try{await D.resume()}catch{}try{await E.play()}catch{z();return}if(Q!==E||!vt)return;const st=D.ctx.currentTime,Jt=40,ie=new Float32Array(Jt+1),Ht=new Float32Array(Jt+1);for(let zt=0;zt<=Jt;zt++){const pe=zt/Jt;ie[zt]=Math.sin(pe*Math.PI/2),Ht[zt]=Math.cos(pe*Math.PI/2)}yt.gain.gain.cancelScheduledValues(st),yt.gain.gain.setValueCurveAtTime(ie,st,C),A.gain.gain.cancelScheduledValues(st),A.gain.gain.setValueCurveAtTime(Ht,st,C),mt=window.setTimeout(()=>R(),Math.round(C*1e3))}function R(){if(mt=null,!vt||!pt||!Q||bt===null){vt=!1;return}const o=pt,C=Q,r=bt;vt=!1,pt=null,Q=null,bt=null;try{o.pause(),o.currentTime=0}catch{}T(o,1),T(C,1),m=C,$=r,j(x[r],{resetProgress:!1})}function j(o,C){W||qt(),W&&(W.textContent=o.title||"Unknown Title"),H&&(H.textContent=o.artist||"Unknown Artist"),M&&(M.textContent=o.album||""),nt&&(nt.textContent=o.codec||"AUDIO"),lt&&(lt.textContent=o.specs||""),o.cover&&L?(L.src=o.cover,L.style.display="block",g&&(g.style.display="none")):(L&&(L.style.display="none"),g&&(g.style.display="grid")),p&&(p.max=String(o.duration||240),C.resetProgress?p.value="0":p.value=String(Math.floor(m.currentTime||0)),ht()),S&&(S.textContent=ut(o.duration)),v&&(v.textContent=C.resetProgress?"0:00":ut(m.currentTime||0)),_t(),Fe(o.cover||null),document.querySelectorAll(".track-row").forEach((r,f)=>{var E;r.classList.toggle("active",((E=x[f])==null?void 0:E.id)===o.id)}),"mediaSession"in navigator&&(navigator.mediaSession.metadata=new MediaMetadata({title:o.title,artist:o.artist,album:o.album,artwork:o.cover?[{src:o.cover,sizes:"512x512",type:"image/jpeg"}]:[]}),navigator.mediaSession.setActionHandler("play",()=>Pt()),navigator.mediaSession.setActionHandler("pause",()=>Gt()),navigator.mediaSession.setActionHandler("previoustrack",()=>Yt()),navigator.mediaSession.setActionHandler("nexttrack",()=>dt()),navigator.mediaSession.setActionHandler("seekto",r=>{r.seekTime&&(m.currentTime=r.seekTime)}));try{const{cover:r,...f}=o;localStorage.setItem("melo-current-track",JSON.stringify(f))}catch{}window.dispatchEvent(new CustomEvent("lumi:trackChange",{detail:o})),U("melo:track-changed",o),U("melo:playback-state",{track:o,currentTime:m.currentTime||0,paused:m.paused})}async function G(o,C=!0,r){if(!x.length)return;z(),o<0&&(o=x.length-1),o>=x.length&&(o=0),$=o;const f=x[o];if(f){if(W||qt(),T(m,1),m.src=await $t(f.path),m.load(),r&&r>0){const E=()=>{m.removeEventListener("loadedmetadata",E);try{m.currentTime=r}catch{}};m.addEventListener("loadedmetadata",E)}j(f,{resetProgress:!0}),C&&Pt()}}let Z=!1;async function ot(){try{await Qt(t).resume()}catch{}Z&&(Z=!1,m.play().then(()=>{e&&(e.style.display="none"),n&&(n.style.display="block")}).catch(()=>{}))}window.addEventListener("pointerdown",ot),window.addEventListener("keydown",ot),it("melo:pref-changed",o=>{o&&o.key==="replayGainGlobal"&&_t(),o&&o.key==="showStopBtn"&&kt(!!o.value),o&&o.key==="crossfade"&&!o.value&&z()}),it("melo:request-playback-state",()=>{const o=x[$]||null;U("melo:playback-state",{track:o,currentTime:m.currentTime||0,paused:m.paused})}),it("melo:seek-playback",o=>{const C=Number(o);Number.isFinite(C)&&C>=0&&(m.currentTime=C)});let wt=null,ct=!1;const jt=500;function te(o,C,r){wt&&cancelAnimationFrame(wt);const f=m.volume,E=performance.now(),q=D=>{const A=Math.min(1,(D-E)/C);m.volume=f+(o-f)*A,A<1?wt=requestAnimationFrame(q):(wt=null,r==null||r())};wt=requestAnimationFrame(q)}async function Pt(){try{await Qt(t).resume()}catch{}const o=localStorage.getItem("melo-pref-fadePause")!=="0",C=B();o&&ct&&(m.volume=0),m.play().then(()=>{Z=!1,e&&(e.style.display="none"),n&&(n.style.display="block"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="playing"),o&&ct?(ct=!1,te(C,jt)):m.volume=C}).catch(()=>{Z||(Z=!0,a("Click once inside player to begin audio playback"))})}function Gt(){z(),localStorage.getItem("melo-pref-fadePause")!=="0"&&!m.paused?(ct=!0,te(0,jt,()=>m.pause())):(ct=!1,m.pause()),e&&(e.style.display="block"),n&&(n.style.display="none"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused");const C=x[$];if(C)try{localStorage.setItem("melo-resume-state",JSON.stringify({trackId:C.id,position:m.currentTime}))}catch{}}function ee(){m.paused?Pt():Gt()}function ue(){z(),m.pause();try{m.currentTime=0}catch{}e&&(e.style.display="block"),n&&(n.style.display="none"),p&&(p.value="0",ht()),v&&(v.textContent="0:00"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}function dt(){if(!x.length)return;if(z(),V==="one"){m.currentTime=0,Pt();return}const o=K();if(o===null){Gt();return}G(o)}function Yt(){if(!x.length)return;if(z(),m.currentTime>3){m.currentTime=0;return}let o=$-1;J&&(o=Math.floor(Math.random()*x.length)),o<0&&(V==="all"?o=x.length-1:o=0),G(o)}function _t(){if(!(!x[$]||!y)&&(m.volume=B(),vt&&Q&&bt!==null)){const o=x[bt];o&&(Q.volume=O(o))}}function kt(o=localStorage.getItem("melo-pref-showStopBtn")==="1"){const C=at("btnStop","stop");C&&C.style.setProperty("display",o?"inline-flex":"none","important")}function qt(){if(i=at("btnPlay","play"),e=at("iconPlay","play-icon"),n=at("iconPause","pause-icon"),s=at("btnPrev","prev"),l=at("btnNext","next"),d=at("btnShuffle","shuffle"),u=at("btnRepeat","repeat"),c=at("btnStop","stop"),kt(),p=at("seekBar","seek"),y=at("volBar","volume"),v=at("curTime","current-time"),S=at("durTime","duration"),P=at("volPct","volume-pct"),k=at("volIcon","volume-icon"),k&&(k.onclick=()=>It()),Mt(),W=at("trackTitle","title"),H=at("trackArtist","artist"),M=at("trackAlbum","album"),nt=at("trackCodec","codec"),lt=at("trackSpecs","specs"),L=at("coverImg","cover"),g=at("coverFallback","cover-fallback"),i&&(i.onclick=ee),c&&(c.onclick=ue),s&&(s.onclick=Yt),l&&(l.onclick=dt),d&&(d.onclick=()=>{J=!J,d.classList.toggle("active",J),a(J?"Shuffle on":"Shuffle off")}),u&&(u.onclick=()=>{V=V==="off"?"all":V==="all"?"one":"off",u.classList.toggle("active",V!=="off");const o={off:"Repeat off",all:"Repeat all",one:"Repeat one"};a(o[V]),u.title=o[V]}),p&&(p.oninput=()=>{F=!0,v&&(v.textContent=ut(parseFloat(p.value))),ht()},p.onchange=()=>{z(),m.currentTime=parseFloat(p.value),F=!1}),y&&(y.oninput=()=>{Lt(),P&&(P.textContent=y.value+"%"),_t()}),ht(),Lt(),x[$]){const o=x[$];if(W&&(W.textContent=o.title||"Unknown Title"),H&&(H.textContent=o.artist||"Unknown Artist"),M&&(M.textContent=o.album||""),nt&&(nt.textContent=o.codec||"AUDIO"),lt&&(lt.textContent=o.specs||""),o.cover&&L?(L.src=o.cover,L.style.display="block",g&&(g.style.display="none")):(L&&(L.style.display="none"),g&&(g.style.display="grid")),p){const C=Math.floor(m.duration||o.duration||240);p.max=String(C),p.value=String(Math.floor(m.currentTime||0)),ht()}if(S&&(S.textContent=ut(m.duration||o.duration)),v&&(v.textContent=ut(m.currentTime||0)),y&&P&&(P.textContent=y.value+"%",Lt()),e&&n){const C=!m.paused;e.style.display=C?"none":"block",n.style.display=C?"block":"none"}d&&d.classList.toggle("active",J),u&&u.classList.toggle("active",V!=="off")}}qt(),document.addEventListener("wheel",o=>{const C=o.target;if(!(C!=null&&C.closest("#playerCard"))||!y)return;o.preventDefault();const r=o.deltaY<0?5:-5;y.value=String(Math.max(0,Math.min(100,Number(y.value)+r))),y.dispatchEvent(new Event("input"))},{passive:!1});function ae(o){o.addEventListener("timeupdate",()=>{o===m&&(U("melo:playback-position",o.currentTime||0),!F&&p&&v&&(p.value=String(Math.floor(o.currentTime)),v.textContent=ut(o.currentTime),ht()),be(),N())}),o.addEventListener("loadedmetadata",()=>{var r;if(o!==m||!p||!S)return;const C=Math.floor(o.duration||((r=x[$])==null?void 0:r.duration)||240);p.max=String(C),S.textContent=ut(C),ht()}),o.addEventListener("ended",()=>{o!==m||vt||dt()})}let Ot=null;function be(){Ot||(Ot=setTimeout(()=>{Ot=null;const o=x[$];if(!(!o||m.paused))try{localStorage.setItem("melo-resume-state",JSON.stringify({trackId:o.id,position:m.currentTime}))}catch{}},4e3))}ae(t),window.addEventListener("keydown",o=>{o.target.tagName!=="INPUT"&&(o.code==="Space"&&(o.preventDefault(),ee()),o.code==="ArrowRight"&&(z(),m.currentTime+=5),o.code==="ArrowLeft"&&(z(),m.currentTime-=5),(o.key==="m"||o.key==="M")&&It(),(o.key==="s"||o.key==="S")&&d&&d.click(),(o.key==="r"||o.key==="R")&&u&&u.click(),o.code==="ArrowUp"&&y&&(y.value=String(Math.min(100,parseInt(y.value,10)+5)),y.dispatchEvent(new Event("input"))),o.code==="ArrowDown"&&y&&(y.value=String(Math.max(0,parseInt(y.value,10)-5)),y.dispatchEvent(new Event("input"))))}),it("melo:tray-action",o=>{o==="play_pause"?ee():o==="next"?dt():o==="prev"?Yt():o==="mute"&&It()}),window.LumiPlayer={get queue(){return x},set queue(o){x=o,window.__LUMI_QUEUE__=o},get currentIndex(){return $},loadTrack:G,play:Pt,pause:Gt,stop:ue,next:dt,prev:Yt,get audio(){return m},rebind:qt},window.__LUMI_REBIND__=qt,it("melo:play-tracks",o=>{if(!o||!Array.isArray(o.tracks)||!o.tracks.length)return;z(),x=o.tracks,window.__LUMI_SET_QUEUE__(x);const C=Math.max(0,Math.min(o.index||0,x.length-1));G(C,!0)})}const we=new URLSearchParams(location.search).get("panel")||"main",tt=t=>String(t!=null?t:"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");function ze(t){const a=Number.isFinite(t)?Math.max(0,t):0;return`${Math.floor(a/60)}:${String(Math.floor(a%60)).padStart(2,"0")}`}function Be(t,a){const i=document.getElementById("trackList"),e=document.getElementById("libraryStats"),n=document.getElementById("searchInput"),s=document.getElementById("searchClear"),l=document.getElementById("libraryTabs"),d=document.getElementById("btn-scan"),u=document.getElementById("btn-clear-library"),c=document.getElementById("winPlaylistTracks"),p=document.getElementById("winPlaylistEmpty"),y=document.getElementById("playlistSelect"),v=document.getElementById("playlistSearchInput"),S=document.getElementById("playlistSearchClear"),P=document.getElementById("playlistSortSelect"),k=document.getElementById("btn-clear-playlist"),W=document.getElementById("btn-export-playlist"),H=document.getElementById("btn-new-playlist");let M=null,nt=null,lt=!1,L=localStorage.getItem("melo-currentPlaylist")||"p1",g=[],m=null,h=null,x=!1,$=[];const J=new Map;let V="artists",F=null,K=null,ut=null,ht="",Lt=null;const Mt=54,It=52;let $t=0,vt=0,pt=0,Q=0,bt=null;const mt=document.createElement("div");mt.className="ctx-menu",mt.style.display="none",mt.innerHTML='<button class="ctx-item danger" id="ctxRemoveLibraryTrack">Remove from Library</button>',document.body.appendChild(mt),document.addEventListener("click",r=>{r.target.closest("#ctxRemoveLibraryTrack")||(mt.style.display="none")}),mt.querySelector("#ctxRemoveLibraryTrack").onclick=async r=>{r.stopPropagation(),!(!M||!bt)&&(await M("delete_tracks",{ids:[bt]}),mt.style.display="none",bt=null,U("melo:library-changed",{removed:1}))};function b(){return new Promise(r=>{const f=document.createElement("div");f.className="confirm-overlay",f.innerHTML=`<div class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="clearLibraryTitle">
        <div id="clearLibraryTitle" class="confirm-title">Clear Library?</div>
        <div class="confirm-message">All tracks will be removed from Library browsing. Your playlists and their tracks will remain unchanged.</div>
        <div class="confirm-actions"><button class="btn small" data-confirm="cancel">Cancel</button><button class="btn small danger-confirm" data-confirm="yes">Clear Library</button></div>
      </div>`,document.body.appendChild(f);const E=D=>{document.removeEventListener("keydown",q),f.remove(),r(D)};f.querySelector("[data-confirm='cancel']").onclick=()=>E(!1),f.querySelector("[data-confirm='yes']").onclick=()=>E(!0),f.onclick=D=>{D.target===f&&E(!1)};const q=D=>{D.key==="Escape"&&(document.removeEventListener("keydown",q),E(!1))};document.addEventListener("keydown",q)})}function w(r){const f=d==null?void 0:d.querySelector(".scan-label");f&&(f.textContent=r)}function I(){s==null||s.classList.toggle("show",!!(n!=null&&n.value))}function _(){S==null||S.classList.toggle("show",!!(v!=null&&v.value))}function T(){c==null||c.querySelectorAll("[data-pl-track]").forEach(r=>{r.classList.toggle("active",r.dataset.plTrack===Lt)})}function z(r){Lt=r,T()}function O(r){if(!r)return"";if(/^(data:|blob:|https?:)/i.test(r))return r;try{return nt?nt(r):""}catch{return""}}function B(r){return{...r,cover:O(r.cover),source:"scan"}}const N=[],X=new Set;let R=0;function j(r,f){!r||!M||X.has(r)||(X.add(r),N.push({id:r,element:f}),G())}function G(){for(;M&&R<2&&N.length;){const r=N.shift();R++,M("ensure_track_artwork",{id:r.id}).then(f=>{if(!f||!r.element.isConnected)return;const E=O(f),q=$.find(D=>D.id===r.id);q&&(q.cover=E),r.element.style.backgroundImage=`url("${E.replace(/"/g,"%22")}")`,r.element.textContent=""}).catch(()=>{}).finally(()=>{R--,X.delete(r.id),G()})}}function Z(r){const f=[...r.querySelectorAll("[data-artwork-id]")];if(!("IntersectionObserver"in window)){f.forEach(q=>j(q.dataset.artworkId,q));return}const E=new IntersectionObserver(q=>{q.forEach(D=>{if(!D.isIntersecting)return;const A=D.target;E.unobserve(A),j(A.dataset.artworkId,A)})},{root:r,rootMargin:"120px"});f.forEach(q=>E.observe(q))}async function ot(){if(lt)return;if(!ft){lt=!0,wt();return}const r=await Y(()=>import("./core-DhEqZVGG.js"),[]);M=r.invoke,nt=r.convertFileSrc,lt=!0,await Promise.all([ct(),_t()]),await dt(!0),await kt(!0)}function wt(){i&&(i.innerHTML='<div style="padding:30px;text-align:center;color:var(--text-muted)">The persistent Library is available in the Tauri desktop build.</div>')}async function ct(){if(!(!M||!e))try{const r=await M("library_stats");e.textContent=`${r.tracks} tracks • ${r.artists} artists • ${r.albums} albums`}catch{}}function jt(){F=K=ut=null,i&&(i.scrollTop=0)}function te(){return V==="artists"?F?"tracks":"groups":V==="albums"?K?"tracks":"groups":ut?"tracks":"groups"}function Pt(){return V}function Gt(){return V==="artists"&&F?K?`${F} › ${K}`:F:V==="albums"&&K?K:V==="genres"&&ut?ut:""}async function ee(r,f){if(!M)return{items:[],total:0,limit:f,offset:r};if(te()==="groups")return M("library_groups",{kind:Pt(),search:ht||null,artist:V==="artists"?F:null,limit:f,offset:r});const E=await M("library_tracks",{search:ht||null,artist:F,album:K,genre:ut,sort:"title-asc",limit:f,offset:r});return E.items=E.items.map(B),$=E.items,E}async function ue(r){const f=J.get(r);if(f)return f;if(!M)return[];const E=await M("library_groups",{kind:"albums",search:null,artist:r,limit:500,offset:0});return J.set(r,E.items),E.items}async function dt(r=!1){if(!i||!M)return;r&&(i.scrollTop=0),i.style.display="block",i.style.position="relative",i.style.overflowY="auto";const f=Math.max(300,i.clientHeight||420),E=V==="artists"&&!!F,q=Gt(),D=E?84:q?38:0,A=Math.ceil(f/Mt),yt=Math.max(0,i.scrollTop-D),et=Math.max(0,Math.floor(yt/Mt)-8),st=Math.max(40,A+16),Jt=++$t;try{const ie=E&&F?ue(F):Promise.resolve(null),[Ht,zt]=await Promise.all([ee(et,st),ie]);if(Jt!==$t)return;const pe=Ht.total*Mt+D,oa=Ht.items.map((Nt,ne)=>{const le=Ht.offset+ne,me=D+le*Mt;if(te()==="groups"){const Xt=Nt,Le=O(Xt.cover),Ie=`lib-avatar ${Pt()==="albums"?"lib-avatar-album":""}`,ra=Pt()==="albums"?"💿":tt((Xt.name[0]||"?").toUpperCase()),ca=Le?`<div class="${Ie}" style="background-image:url('${tt(Le)}')"></div>`:`<div class="${Ie}" data-artwork-id="${tt(Xt.artworkTrackId||"")}">${ra}</div>`;return`<div class="lib-item virtual-row" data-group-index="${ne}" style="position:absolute;left:0;right:0;top:${me}px;height:${Mt}px">${ca}<div style="flex:1;min-width:0"><div class="t-title">${tt(Xt.name)}</div><div class="t-artist">${tt(Xt.subtitle||`${Xt.count} tracks`)}</div></div><span class="chev-r">›</span></div>`}const Bt=Nt;return`<div class="track-row virtual-row" data-track-id="${tt(Bt.id)}" data-page-index="${ne}" style="position:absolute;left:0;right:0;top:${me}px;height:${Mt}px">
          <span class="num">${le+1}</span>
          ${Bt.cover?`<div class="track-cover-mini" style="background-image:url('${tt(Bt.cover)}');background-size:cover;background-position:center"></div>`:`<div class="track-cover-mini cover-default" data-artwork-id="${tt(Bt.id)}">♪</div>`}
          <div style="flex:1;min-width:0"><div class="t-title">${tt(Bt.title)}</div><div class="t-artist">${tt(Bt.artist)} • ${tt(Bt.album)}</div></div>
          <span class="t-dur">${ze(Bt.duration)}</span>
          <button class="btn small ghost" data-add-track="${tt(Bt.id)}" title="Add to current playlist">+</button>
        </div>`}).join(""),sa=E&&zt?`<div class="artist-detail-header" style="position:sticky;top:0;height:${D}px;z-index:4;background:var(--card)">
            <div class="lib-crumb" style="height:38px"><button class="btn small" id="virtualBack">‹ Artists</button><b>${tt(F)}</b></div>
            <div class="chip-row artist-album-chips custom-scrollbar" style="height:46px;padding-top:6px;padding-bottom:6px">
              <button class="chip ${K===null?"active":""}" data-artist-album="all">All Tracks</button>
              ${zt.map((Nt,ne)=>{const le=O(Nt.cover),me=le?`<span class="chip-thumb" style="background-image:url('${tt(le)}')"></span>`:`<span class="chip-thumb cover-default" data-artwork-id="${tt(Nt.artworkTrackId||"")}">♪</span>`;return`<button class="chip ${K===Nt.name?"active":""}" data-artist-album-index="${ne}">${me}${tt(Nt.name)}</button>`}).join("")}
            </div>
          </div>`:q?`<div class="lib-crumb virtual-crumb" style="position:sticky;top:0;height:${D}px;z-index:3;background:var(--card)"><button class="btn small" id="virtualBack">‹ Back</button><b>${tt(q)}</b></div>`:"";i.innerHTML=`<div class="virtual-list-space" style="position:relative;height:${Math.max(pe,f)}px">${sa}${oa}</div>`,Yt(Ht.items,zt||[]),Z(i)}catch{i.innerHTML='<div style="padding:24px;text-align:center;color:var(--text-muted)">Could not read the Library database.</div>'}}function Yt(r,f=[]){var E,q;i&&(i.querySelectorAll("[data-group-index]").forEach(D=>{D.onclick=()=>{const A=r[Number(D.dataset.groupIndex||0)],yt=(A==null?void 0:A.name)||"",et=(A==null?void 0:A.key)||yt;if(V==="artists"&&!F)F=yt;else if(V==="artists"&&F||V==="albums"){const st=et.split("\0");V==="albums"&&(F=st[0]||null),K=st[1]||yt}else V==="genres"&&(ut=yt);dt(!0)}}),i.querySelectorAll("[data-add-track]").forEach(D=>{D.onclick=async A=>{A.stopPropagation(),!(!M||!D.dataset.addTrack)&&(await M("add_tracks_to_playlist",{playlistId:L,trackIds:[D.dataset.addTrack]}),U("melo:playlist-changed",{playlistId:L}))}}),i.querySelectorAll("[data-track-id]").forEach(D=>{D.onclick=async A=>{if(A.target.closest("[data-add-track]"))return;const yt=Number(D.dataset.pageIndex||0),et=r.filter(st=>"path"in st).map(B);M&&et.length&&(await M("replace_playlist_tracks",{playlistId:L,trackIds:et.map(st=>st.id)}),U("melo:playlist-changed",{playlistId:L})),U("melo:play-tracks",{tracks:et,index:yt})},D.oncontextmenu=A=>{A.preventDefault(),A.stopPropagation(),bt=D.dataset.trackId||null,mt.style.display="block";const yt=mt.getBoundingClientRect();mt.style.left=`${Math.max(6,Math.min(A.clientX,window.innerWidth-yt.width-6))}px`,mt.style.top=`${Math.max(6,Math.min(A.clientY,window.innerHeight-yt.height-6))}px`}}),(E=i.querySelector("#virtualBack"))==null||E.addEventListener("click",()=>{V==="artists"&&F?(F=null,K=null):K?K=null:F?F=null:ut=null,dt(!0)}),(q=i.querySelector("[data-artist-album='all']"))==null||q.addEventListener("click",()=>{K=null,dt(!0)}),i.querySelectorAll("[data-artist-album-index]").forEach(D=>{D.onclick=()=>{const A=f[Number(D.dataset.artistAlbumIndex||0)];K=(A==null?void 0:A.name)||null,dt(!0)}}))}async function _t(){var r;M&&(g=await M("list_playlists"),g.some(f=>f.id===L)||(L=((r=g[0])==null?void 0:r.id)||"p1"),localStorage.setItem("melo-currentPlaylist",L),y&&(y.innerHTML=g.map(f=>`<option value="${tt(f.id)}" ${f.id===L?"selected":""}>${tt(f.name)} (${f.trackCount})</option>`).join("")))}async function kt(r=!1){if(!c||!M)return;r&&(c.scrollTop=0),c.style.display="block",c.style.position="relative",c.style.overflowY="auto";const f=Math.max(260,c.clientHeight||420),E=Math.max(0,Math.floor(c.scrollTop/It)-8),q=Math.max(40,Math.ceil(f/It)+16),D=++vt,A=await M("playlist_tracks",{playlistId:L,search:(v==null?void 0:v.value)||null,sort:(P==null?void 0:P.value)||"default",limit:q,offset:E});if(D!==vt)return;if(A.items=A.items.map(B),$=A.items,p&&(p.style.display=A.total?"none":"block"),c.style.display=A.total?"block":"none",!A.total){c.innerHTML="";return}const yt=A.items.map((et,st)=>`<div class="track-row virtual-row ${et.id===Lt?"active":""}" data-pl-track="${tt(et.id)}" data-page-index="${st}" style="position:absolute;left:0;right:0;top:${(A.offset+st)*It}px;height:${It}px"><span class="num">${A.offset+st+1}</span>${et.cover?`<div class="track-cover-mini" style="background-image:url('${tt(et.cover)}');background-size:cover;background-position:center"></div>`:`<div class="track-cover-mini cover-default" data-artwork-id="${tt(et.id)}">♪</div>`}<div style="flex:1;min-width:0"><div class="t-title">${tt(et.title)}</div><div class="t-artist">${tt(et.artist)} • ${tt(et.album)}</div></div><span class="t-dur">${ze(et.duration)}</span><button class="btn small ghost" data-remove-track="${tt(et.id)}">×</button></div>`).join("");c.innerHTML=`<div style="position:relative;height:${Math.max(f,A.total*It)}px">${yt}</div>`,Z(c),c.querySelectorAll("[data-pl-track]").forEach(et=>{et.onclick=st=>{st.target.closest("[data-remove-track]")||U("melo:play-tracks",{tracks:A.items,index:Number(et.dataset.pageIndex||0)})}}),c.querySelectorAll("[data-remove-track]").forEach(et=>{et.onclick=async st=>{st.stopPropagation(),await M("remove_track_from_playlist",{playlistId:L,trackId:et.dataset.removeTrack}),U("melo:playlist-changed",{playlistId:L})}})}async function qt(r,f){return M?M(r,f):null}async function ae(r,f="replace"){if(await ot(),!M||!r.length)return[];const q=(await M("import_audio_files",{paths:r,playlistId:f==="none"?null:L,replacePlaylist:f==="replace"})).map(B);return await Promise.all([ct(),_t(),dt(),kt()]),U("melo:library-changed",{imported:q.length}),q}async function Ot(r,f=!1){if(await ot(),!M)return null;if(m)return m;const E=await M("start_library_scan",{path:r});return m=E.scanId,h=E.scanId,x=f,d&&w("Cancel Scan"),m}async function be(){if(!ft)return;if(m&&M){await M("cancel_library_scan",{scanId:m});return}const{open:r}=await Y(async()=>{const{open:E}=await import("./index-CS3Qnt9j.js");return{open:E}},__vite__mapDeps([5,1])),f=await r({directory:!0,multiple:!1});f&&await Ot(f)}async function o(r){if(await ot(),!M)return null;const f=await M("get_track_by_id",{id:r});return f?B(f):null}l==null||l.querySelectorAll("[data-libtab]").forEach(r=>{r.onclick=()=>{l.querySelectorAll("[data-libtab]").forEach(f=>f.classList.remove("active")),r.classList.add("active"),V=r.dataset.libtab||"artists",jt(),dt(!0)}}),n==null||n.addEventListener("input",()=>{I(),ht=n.value.trim(),window.clearTimeout(pt),pt=window.setTimeout(()=>dt(!0),180)}),s==null||s.addEventListener("click",()=>{n&&(n.value="",n.focus(),I(),ht="",window.clearTimeout(pt),dt(!0))}),i==null||i.addEventListener("scroll",()=>{window.clearTimeout(pt),pt=window.setTimeout(()=>dt(),60)}),c==null||c.addEventListener("scroll",()=>{window.clearTimeout(Q),Q=window.setTimeout(()=>kt(),60)}),v==null||v.addEventListener("input",()=>{_(),window.clearTimeout(Q),Q=window.setTimeout(()=>kt(!0),180)}),S==null||S.addEventListener("click",()=>{v&&(v.value="",v.focus(),_(),window.clearTimeout(Q),kt(!0))}),P==null||P.addEventListener("change",()=>kt(!0)),y==null||y.addEventListener("change",()=>{L=y.value,localStorage.setItem("melo-currentPlaylist",L),kt(!0)}),d==null||d.addEventListener("click",be),u==null||u.addEventListener("click",async()=>{if(M){if(m){alert("Cancel the active scan before clearing the Library database.");return}await b()&&(await M("clear_library_database"),$=[],J.clear(),await Promise.all([ct(),_t(),dt(!0),kt(!0)]),U("melo:library-changed",{cleared:!0}))}}),k==null||k.addEventListener("click",async()=>{await qt("clear_playlist",{playlistId:L}),await Promise.all([_t(),kt(!0)]),U("melo:playlist-changed",{playlistId:L})}),H==null||H.addEventListener("click",async()=>{var E;const r=(E=prompt("New playlist name:"))==null?void 0:E.trim();if(!r)return;const f=await qt("create_playlist",{name:r});f&&(L=f.id),await Promise.all([_t(),kt(!0)])}),W==null||W.addEventListener("click",async()=>{var D;if(!M)return;const r=[];let f=0;for(;;){const A=await M("playlist_tracks",{playlistId:L,search:null,sort:"default",limit:500,offset:f});if(r.push(...A.items),f+=A.items.length,f>=A.total||!A.items.length)break}if(!r.length)return;const E=`#EXTM3U
`+r.map(A=>`#EXTINF:${Math.floor(A.duration)},${A.artist} - ${A.title}
${A.path}`).join(`
`),q=document.createElement("a");q.href=URL.createObjectURL(new Blob([E],{type:"audio/x-mpegurl"})),q.download=`${((D=g.find(A=>A.id===L))==null?void 0:D.name)||"playlist"}.m3u`,q.click(),setTimeout(()=>URL.revokeObjectURL(q.href),1e3)}),ft&&Y(async()=>{const{getCurrentWebviewWindow:r}=await import("./webviewWindow-mjQkSB26.js");return{getCurrentWebviewWindow:r}},__vite__mapDeps([6,7,1,0,8])).then(({getCurrentWebviewWindow:r})=>{r().onDragDropEvent(async f=>{if(f.payload.type!=="drop")return;const E=f.payload.paths||[];if(!E.length)return;const q=await ae(E,we==="playlist"?"append":"replace");if(q.length)we!=="playlist"&&U("melo:play-tracks",{tracks:q,index:0});else for(const D of E)try{await Ot(D,we!=="playlist")}catch{}})}).catch(()=>{}),it("melo:scan-progress",async r=>{if(r){if(r.scanId&&(m=r.scanId),d&&!r.finished&&w(`Cancel ${r.done||0}/${r.total||"…"}`),d){const f=r.total?Math.max(0,Math.min(100,Number(r.done||0)/Number(r.total)*100)):0;d.style.setProperty("--scan-progress",`${f}%`),d.classList.toggle("scanning",!r.finished)}if(r.finished){if(r.scanId===h&&x&&!r.cancelled&&M){await M("replace_playlist_from_scan",{playlistId:L,scanId:r.scanId});const q=(await M("playlist_tracks",{playlistId:L,search:null,sort:"default",limit:100,offset:0})).items.map(B);q.length&&U("melo:play-tracks",{tracks:q,index:0}),U("melo:playlist-changed",{playlistId:L})}m=null,h=null,x=!1,d&&(w("Scan"),d.classList.remove("scanning"),d.style.setProperty("--scan-progress","0%")),await Promise.all([ct(),_t(),dt(),kt()])}}});let C=0;it("melo:library-changed",()=>{J.clear(),window.clearTimeout(C),C=window.setTimeout(()=>{ct(),dt(),kt()},500)}),it("melo:playlist-changed",()=>{_t(),kt()}),it("melo:track-changed",r=>z((r==null?void 0:r.id)||null)),it("melo:playback-state",r=>{var f;return z(((f=r==null?void 0:r.track)==null?void 0:f.id)||null)});try{const r=JSON.parse(localStorage.getItem("melo-current-track")||"null");r!=null&&r.id&&z(r.id)}catch{}U("melo:request-playback-state"),setTimeout(()=>U("melo:request-playback-state"),250),window.LumiLibrary={get tracks(){return $},get playlists(){return g},scanFolder:Ot,importPaths:ae,getTrack:o,render:()=>dt(),addTracks:()=>{},addToCurrentPlaylist:async r=>{!M||!r.length||(await M("add_tracks_to_playlist",{playlistId:L,trackIds:r.map(f=>f.id)}),U("melo:playlist-changed",{playlistId:L}))},currentPlaylistName:()=>{var r;return((r=g.find(f=>f.id===L))==null?void 0:r.name)||"Playlist"}},ot().catch(()=>a("Could not initialize the Library database"))}const ce={flat:[0,0,0,0,0,0,0,0,0,0],pop:[-1,2,4,4,2,-1,-1,2,3,3],rock:[4,3,2,-1,-2,-2,1,3,4,4],bass:[6,5,4,2,1,0,-1,-1,-2,-3],treble:[-3,-2,-1,0,1,2,3,5,6,6],dance:[5,4,2,0,-1,-1,2,4,5,3],jazz:[2,1,2,3,2,0,1,2,3,2],classical:[3,2,1,0,0,0,-1,2,3,4],vocal:[-2,-1,0,2,4,4,3,1,0,-1],acoustic:[3,2,1,1,2,2,3,3,2,1],hiphop:[5,4,1,2,-1,-1,1,-1,2,3],metal:[4,2,-1,-2,-1,1,3,4,5,4]};function ke(t){for(const[a,i]of Object.entries(ce))if(i.every((e,n)=>e===t[n]))return a;return"custom"}function Re(t,a,i={}){const e=!!i.remote,n=document.getElementById("eqEnable"),s=document.getElementById("eqPreset"),l=document.getElementById("btnEqReset"),d=document.getElementById("eqBands"),u=document.getElementById("eqCanvas"),c=u?u.getContext("2d"):null;let p=null,y=[],v=[],S=new Array(se.length).fill(0);try{const g=JSON.parse(localStorage.getItem("melo-eq-gains")||"null");Array.isArray(g)&&g.length===se.length&&(S=g.map(m=>typeof m=="number"?Math.max(-12,Math.min(12,m)):0))}catch{}let P=localStorage.getItem("melo-eq-preset")||ke(S),k=localStorage.getItem("melo-eq-enabled")!=="0";function W(){if(!p)try{const g=Qt(t);p=g.ctx,y=g.filters,y.forEach((m,h)=>{m.gain.value=k?S[h]:0})}catch{}}function H(g,m){W(),y[g]&&k&&(y[g].gain.value=m)}function M(g){W(),S=[...g],k&&g.forEach((m,h)=>{y[h]&&(y[h].gain.value=m)}),L()}function nt(g){W(),k=g,g?S.forEach((m,h)=>{y[h]&&(y[h].gain.value=m)}):y.forEach(m=>{m.gain.value=0}),L()}e||t&&t.addEventListener("play",()=>{W(),(p==null?void 0:p.state)==="suspended"&&p.resume().catch(()=>{})}),it("melo:eq",g=>{g&&(g.type==="gain"?(e||H(g.idx,g.val),S[g.idx]=g.val,v[g.idx]&&(v[g.idx].value=String(g.val),lt(v[g.idx])),s&&(s.value=ke(S)),L()):g.type==="gains"?(e||M(g.values),S=[...g.values],v.length&&v.forEach((m,h)=>{m.value=String(S[h]),lt(m)}),s&&g.preset&&(s.value=g.preset),L()):g.type==="enable"&&(k=!!g.on,e||nt(k),n&&(n.checked=k),L()))});function lt(g){var x;const m=parseInt(g.value),h=(x=g.parentElement)==null?void 0:x.querySelector(".val");h&&(h.textContent=(m>0?"+":"")+m+"dB")}function L(){if(!u||!c)return;const g=window.devicePixelRatio||1,m=u.clientWidth*g,h=u.clientHeight*g;if(m<=0||h<=0)return;u.width=m,u.height=h,c.clearRect(0,0,m,h);const x=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#2a7bd6",$=S;if(!k){c.strokeStyle="rgba(100,120,150,0.25)",c.lineWidth=2*g,c.beginPath(),c.moveTo(0,h/2),c.lineTo(m,h/2),c.stroke();return}c.strokeStyle=x,c.lineWidth=2.5*g,c.lineJoin="round",c.beginPath(),$.forEach((J,V)=>{const F=V/($.length-1)*m,K=h/2-J/12*(h/2-10*g);if(V===0)c.moveTo(F,K);else{const ut=(V-1)/($.length-1)*m,ht=h/2-$[V-1]/12*(h/2-10*g);c.quadraticCurveTo((ut+F)/2,ht,F,K)}}),c.stroke(),$.forEach((J,V)=>{const F=V/($.length-1)*m,K=h/2-J/12*(h/2-10*g);c.fillStyle=x,c.beginPath(),c.arc(F,K,4*g,0,Math.PI*2),c.fill(),c.fillStyle="white",c.beginPath(),c.arc(F,K,2*g,0,Math.PI*2),c.fill()}),c.strokeStyle="rgba(100,120,150,0.3)",c.lineWidth=1*g,c.setLineDash([4*g,4*g]),c.beginPath(),c.moveTo(0,h/2),c.lineTo(m,h/2),c.stroke(),c.setLineDash([])}d&&(d.innerHTML="",se.forEach((g,m)=>{const h=S[m]||0,x=document.createElement("div");x.className="eq-band",x.innerHTML=`
        <input type="range" min="-12" max="12" value="${h}" step="1" data-idx="${m}" orient="vertical" />
        <label>${g>=1e3?g/1e3+"k":g}</label>
        <span style="font-size:10px;color:var(--text-muted);min-height:12px;" class="val">${(h>0?"+":"")+h+"dB"}</span>
      `,d.appendChild(x)}),v=Array.from(d.querySelectorAll("input")),v.forEach(g=>{g.addEventListener("input",()=>{const m=parseInt(g.dataset.idx),h=parseInt(g.value);lt(g),S[m]=h,L();const x=ke(S);s&&(s.value=x),localStorage.setItem("melo-eq-gains",JSON.stringify(S)),localStorage.setItem("melo-eq-preset",x),e||H(m,h),U("melo:eq",{type:"gain",idx:m,val:h,values:S})})})),s&&(s.value=P,s.addEventListener("change",()=>{const g=ce[s.value]||ce.flat;v.length&&v.forEach((m,h)=>{m.value=String(g[h]),lt(m)}),S=[...g],L(),localStorage.setItem("melo-eq-gains",JSON.stringify(S)),localStorage.setItem("melo-eq-preset",s.value),e||M(g),U("melo:eq",{type:"gains",values:g,preset:s.value}),a(`Preset: ${s.options[s.selectedIndex].text}`)})),l&&l.addEventListener("click",()=>{const g=ce.flat;v.length&&v.forEach((m,h)=>{m.value="0",lt(m)}),S=[...g],s&&(s.value="flat"),localStorage.setItem("melo-eq-gains",JSON.stringify(S)),localStorage.setItem("melo-eq-preset","flat"),e||M(g),U("melo:eq",{type:"gains",values:g,preset:"flat"}),L(),a("Equalizer reset to Flat (0dB)")}),n&&(n.checked=k,n.addEventListener("change",()=>{k=n.checked,localStorage.setItem("melo-eq-enabled",k?"1":"0"),e||nt(k),U("melo:eq",{type:"enable",on:k}),L(),a(k?"Equalizer On":"Equalizer off — Flat")})),u&&new ResizeObserver(()=>L()).observe(u),L(),window.LumiEqualizer={presets:ce,frequencies:se,displayGains:S,reset:()=>l==null?void 0:l.click()}}const oe=[{id:"bars",label:"Classic Bars"},{id:"thin",label:"Thin Bars"},{id:"line",label:"Spectrum Line"},{id:"mirror",label:"Mirror Bars"},{id:"wave",label:"Oscilloscope"},{id:"spectrumWave",label:"Spectrum Wave"},{id:"blocks",label:"Block Equalizer"}];function qe(){return document.getElementById("vizBars")||document.querySelector('[data-melo="visualizer"]')}function wa(t){let a=qe();if(!a)return;let i=k(a),e=i.getContext("2d"),n=null,s=null,l=null,d=null,u=null,c=!1,p=localStorage.getItem("melo-viz-mode")||"bars";oe.some(b=>b.id===p)||(p="bars");let y=0,v=[],S=.45,P=null;function k(b){let w=b.querySelector("canvas");return w||(b.innerHTML="",w=document.createElement("canvas"),b.appendChild(w)),w}function W(){if(!(s&&l))try{const b=Qt(t);n=b.ctx,s=b.analyser,l=new Uint8Array(s.frequencyBinCount),d=new Uint8Array(s.fftSize)}catch{c=!0}}function H(b){const w=l.length,I=((n==null?void 0:n.sampleRate)||44100)/2,_=45,T=Math.min(15e3,I*.95),z=Math.log(_),O=Math.log(T),B=[];for(let N=0;N<b;N++){const X=Math.exp(z+(O-z)*N/b),R=Math.exp(z+(O-z)*(N+1)/b);let j=Math.floor(X/I*w),G=Math.max(j+1,Math.ceil(R/I*w));j<0&&(j=0),G>w&&(G=w);let Z=0;for(let ot=j;ot<G;ot++)Z+=l[ot];B.push(Z/(G-j)/255)}return B}function M(b){const w=performance.now()/1e3,I=Math.pow(Math.abs(Math.sin(w*2.2)),2.5),_=[];for(let T=0;T<b;T++){let z=.42+.26*Math.sin(w*1.35+T*.62)+.2*Math.sin(w*2.9+T*1.31)+Math.random()*.07;z*=.55+.5*I,_.push(Math.max(.04,Math.min(1,z)))}return _}function nt(b){const w=performance.now()/1e3,I=.5+.5*Math.pow(Math.abs(Math.sin(w*1.9)),2);for(let _=0;_<b.length;_++){const T=_/b.length;b[_]=128+66*I*(Math.sin(T*Math.PI*6+w*7)*.6+Math.sin(T*Math.PI*13-w*11)*.4)}}function lt(b){let w;if(c||!s||!l)w=M(b);else if(s.getByteFrequencyData(l),w=H(b),!w.some(T=>T>.01)&&!t.paused)w=M(b);else for(let T=0;T<b;T++)w[T]*=1+1.7*(T/Math.max(1,b-1));let I=0;for(const _ of w)_>I&&(I=_);I>S?S=I:S=Math.max(.35,S*.985),v.length!==b&&(v=new Array(b).fill(0));for(let _=0;_<b;_++){const T=Math.min(1,w[_]/S),z=T>v[_]?.55:.16;v[_]+=(T-v[_])*z}return v}function L(b,w){return getComputedStyle(document.documentElement).getPropertyValue(b).trim()||w}function g(){return i.width/Math.max(1,i.clientWidth)||1}function m(b,w,I,_,T){if(T=Math.min(T,I/2,_/2),e.roundRect){e.roundRect(b,w,I,_,T);return}e.rect(b,w,I,_)}function h(){const b=window.devicePixelRatio||1,w=i.clientWidth||(a==null?void 0:a.clientWidth)||200,I=i.clientHeight||(a==null?void 0:a.clientHeight)||56;w>0&&I>0&&(i.width=Math.round(w*b),i.height=Math.round(I*b))}new ResizeObserver(h).observe(i),h();function x(b,w,I,_){const T=g(),z=L("--visualizer","#38bdf8"),O=L("--accent","#0284c7"),B=b.length,N=w/B,X=Math.max(1.2*T,N*(1-_));for(let R=0;R<B;R++){const j=b[R],G=Math.max(2*T,j*(I-4*T)),Z=R*N+(N-X)/2,ot=I-G-1*T,wt=e.createLinearGradient(0,ot,0,I);wt.addColorStop(0,O),wt.addColorStop(1,z),e.fillStyle=wt,e.beginPath(),m(Z,ot,X,G,Math.min(X/2,3.5*T)),e.fill()}}function $(b,w,I){const _=g(),T=L("--visualizer","#38bdf8"),z=L("--accent","#0284c7"),O=b.length,B=w/O,N=I/2,X=Math.max(1.5*_,B*.62);for(let R=0;R<O;R++){const j=Math.max(1.5*_,b[R]*(I/2-3*_)),G=R*B+(B-X)/2,Z=e.createLinearGradient(0,N-j,0,N+j);Z.addColorStop(0,z),Z.addColorStop(.5,T),Z.addColorStop(1,z),e.fillStyle=Z,e.beginPath(),m(G,N-j,X,j*2,Math.min(X/2,3*_)),e.fill()}}function J(b,w,I){const _=g(),T=L("--visualizer","#38bdf8"),z=L("--accent","#0284c7"),O=b.length,B=[],N=[];for(let R=0;R<O;R++)B.push((R+.5)/O*w),N.push(I-2*_-b[R]*(I-8*_));e.beginPath(),e.moveTo(B[0],I),e.lineTo(B[0],N[0]);for(let R=1;R<O;R++){const j=(B[R-1]+B[R])/2;e.quadraticCurveTo(B[R-1],N[R-1],j,(N[R-1]+N[R])/2)}e.lineTo(B[O-1],N[O-1]),e.lineTo(B[O-1],I),e.closePath();const X=e.createLinearGradient(0,0,0,I);X.addColorStop(0,T),X.addColorStop(1,"transparent"),e.globalAlpha=.18,e.fillStyle=X,e.fill(),e.globalAlpha=1,e.beginPath(),e.moveTo(B[0],N[0]);for(let R=1;R<O;R++){const j=(B[R-1]+B[R])/2;e.quadraticCurveTo(B[R-1],N[R-1],j,(N[R-1]+N[R])/2)}e.lineTo(B[O-1],N[O-1]),e.strokeStyle=z,e.lineWidth=2*_,e.lineJoin="round",e.stroke()}function V(b,w,I){const _=g(),T=L("--visualizer","#38bdf8"),z=L("--accent","#0284c7"),O=I/2,B=b.length,N=b.map((j,G)=>{const Z=G/Math.max(1,B-1),ot=Math.pow(Math.sin(Math.PI*Z),.28);return Math.max(.7*_,j*ot*(I*.46))}),X=j=>{e.beginPath();for(let G=0;G<B;G++){const Z=G/Math.max(1,B-1)*w,ot=O+(j?-N[G]:N[G]);if(G===0)e.moveTo(Z,ot);else{const wt=(G-1)/Math.max(1,B-1)*w,ct=O+(j?-N[G-1]:N[G-1]);e.quadraticCurveTo(wt,ct,(wt+Z)/2,(ct+ot)/2)}}};X(!0);for(let j=B-1;j>=0;j--){const G=j/Math.max(1,B-1)*w;e.lineTo(G,O+N[j])}e.closePath();const R=e.createLinearGradient(0,0,0,I);R.addColorStop(0,z),R.addColorStop(.5,T),R.addColorStop(1,z),e.fillStyle=R,e.globalAlpha=.3,e.fill(),e.globalAlpha=.18,e.shadowColor=T,e.shadowBlur=8*_,X(!0),e.strokeStyle=T,e.lineWidth=4*_,e.stroke(),X(!1),e.stroke(),e.shadowBlur=0,e.globalAlpha=1,X(!0),e.strokeStyle=z,e.lineWidth=1.2*_,e.stroke(),X(!1),e.stroke(),e.beginPath(),e.moveTo(0,O),e.lineTo(w,O),e.strokeStyle=T,e.globalAlpha=.45,e.lineWidth=.8*_,e.stroke(),e.globalAlpha=1}function F(b,w,I){const _=g(),T=L("--visualizer","#38bdf8"),z=L("--accent","#0284c7"),O=b.length,B=8,N=Math.max(1*_,w*.0035),X=Math.max(1*_,I*.025),R=Math.max(1,(w-N*(O-1))/O),j=Math.max(1,(I-X*(B-1))/B),G=e.createLinearGradient(0,0,0,I);G.addColorStop(0,z),G.addColorStop(1,T),e.fillStyle=G;for(let Z=0;Z<O;Z++){const ot=Math.max(1,Math.min(B,Math.round(b[Z]*B))),wt=Z*(R+N);for(let ct=0;ct<ot;ct++){const jt=I-(ct+1)*j-ct*X;e.globalAlpha=.58+.42*((ct+1)/B),e.fillRect(wt,jt,R,j)}}e.globalAlpha=1}function K(){const b=i.width,w=i.height,I=g(),_=L("--accent","#0284c7");let T;c||!s||!d?(u||(u=new Uint8Array(1024)),nt(u),T=u):(s.getByteTimeDomainData(d),T=d);const z=()=>{e.beginPath();for(let O=0;O<=b;O+=2){const B=Math.min(T.length-1,Math.floor(O/b*T.length)),N=T[B]/255*w;O===0?e.moveTo(O,N):e.lineTo(O,N)}};z(),e.strokeStyle=_,e.globalAlpha=.16,e.lineWidth=6*I,e.lineJoin="round",e.stroke(),z(),e.globalAlpha=1,e.lineWidth=1.8*I,e.stroke()}function ut(){const b=i.width,w=i.height;if(!b||!w)return;if(e.clearRect(0,0,b,w),p==="wave"){K();return}const I=p==="bars"?16:p==="thin"?56:p==="line"?64:p==="spectrumWave"?72:p==="blocks"?22:24,_=parseInt((a==null?void 0:a.dataset.bars)||"",10),T=Number.isFinite(_)&&_>0?_:I,z=lt(T);p==="bars"?x(z,b,w,.34):p==="thin"?x(z,b,w,.32):p==="line"?J(z,b,w):p==="mirror"?$(z,b,w):p==="spectrumWave"?V(z,b,w):p==="blocks"&&F(z,b,w)}function ht(){y=requestAnimationFrame(ht),ut()}function Lt(){y||ht()}function Mt(b,w=!1){p=b,v=[],localStorage.setItem("melo-viz-mode",b)}function It(){return P||(P=document.createElement("div"),P.className="viz-menu",P.style.display="none",document.body.appendChild(P),P)}function $t(){const b=It();b.innerHTML='<div class="viz-menu-label">Visualizer type</div>'+oe.map(w=>`<button class="viz-menu-item ${w.id===p?"active":""}" data-mode="${w.id}">${w.id===p?"✓":""}<span>${w.label}</span></button>`).join(""),b.querySelectorAll("[data-mode]").forEach(w=>{w.addEventListener("click",I=>{I.stopPropagation(),Mt(w.dataset.mode),pt()})})}function vt(b,w){$t();const I=P;I.style.display="block";const _=I.getBoundingClientRect();I.style.left=Math.max(8,Math.min(b,window.innerWidth-_.width-8))+"px",I.style.top=Math.max(8,Math.min(w,window.innerHeight-_.height-8))+"px"}function pt(){P&&(P.style.display="none")}function Q(){a&&(a.title="Click: next mode • Right-click: choose mode",a.addEventListener("click",()=>{pt();const b=oe.findIndex(w=>w.id===p);Mt(oe[(b+1)%oe.length].id)}),a.addEventListener("contextmenu",b=>{b.preventDefault(),b.stopPropagation(),vt(b.clientX,b.clientY)}))}document.addEventListener("click",b=>{P&&P.style.display!=="none"&&!P.contains(b.target)&&pt()}),document.addEventListener("keydown",b=>{b.key==="Escape"&&pt()});function bt(){W(),Lt(),(n==null?void 0:n.state)==="suspended"&&n.resume().catch(()=>{})}t.addEventListener("play",bt),bt(),Q(),document.addEventListener("visibilitychange",()=>{document.hidden?(cancelAnimationFrame(y),y=0):Lt()});function mt(){cancelAnimationFrame(y),y=0,a=qe(),a&&(i=k(a),e=i.getContext("2d"),new ResizeObserver(h).observe(i),h(),Q(),Lt())}window.__LUMI_REBIND_VISUALIZER__=mt}function De(t){if(!t||!t.trim())return{isSynced:!1,lines:[],raw:""};const a=[],i=t.split(/\r?\n/),e=/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;let n=!1;for(const s of i){const l=s.trim();if(!l||/^\[[a-z]{2,8}:/i.test(l))continue;const d=[...l.matchAll(e)];if(d.length>0){n=!0;const u=l.replace(e,"").trim();for(const c of d){const p=parseInt(c[1],10),y=parseInt(c[2],10),v=c[3]||"0",S=v.length===2?parseInt(v,10)*10:v.length===1?parseInt(v,10)*100:parseInt(v.slice(0,3),10),P=p*60+y+S/1e3;a.push({time:P,text:u})}}else a.push({time:-1,text:l})}return a.sort((s,l)=>s.time-l.time),{isSynced:n,lines:a,raw:t}}function $e(t,a){var P;const i=document.getElementById("lyricsContainer"),e=document.getElementById("lyricsStatus"),n=document.getElementById("lyricsTrackTitle");let s={isSynced:!1,lines:[]},l=null,d=-1,u=0;async function c(k){if(k.lyrics&&k.lyrics.trim().length>0)return k.lyrics;if(window.__TAURI__)try{const{invoke:W}=await Y(async()=>{const{invoke:M}=await import("./core-DhEqZVGG.js");return{invoke:M}},[]),H=await W("get_track_lyrics",{path:k.path});if(H)return H}catch{}return null}async function p(k){if(!k){l=null,s={isSynced:!1,lines:[],raw:""},n&&(n.textContent="No track playing"),y();return}l=k.id,n&&(n.textContent=`${k.title} — ${k.artist}`);const W=await c(k);s=De(W||""),y()}function y(){if(i){if(i.innerHTML="",d=-1,!s.lines.length){e&&(e.style.display="block",e.innerHTML='No synced lyrics found (.lrc)<br/><span style="font-size:10.5px; opacity:0.7;">Place a matching .lrc file in the song folder or add lyrics in the tag editor.</span>');return}e&&(e.style.display="none"),s.lines.forEach((k,W)=>{const H=document.createElement("div");H.className="lyric-line",H.dataset.idx=String(W),H.dataset.time=String(k.time),H.textContent=k.text||"♪",k.time>=0&&(H.style.cursor="pointer",H.title=`Seek to ${Math.floor(k.time/60)}:${Math.floor(k.time%60).toString().padStart(2,"0")}`,H.addEventListener("click",()=>{U("melo:seek-playback",k.time),window.__TAURI__||(t.currentTime=k.time,t.play().catch(()=>{}))})),i.appendChild(H)})}}function v(){if(!i||!s.isSynced||!s.lines.length)return;const k=window.__TAURI__?u:t.currentTime;let W=-1;for(let H=0;H<s.lines.length&&s.lines[H].time<=k;H++)W=H;if(W!==d){d=W;const H=i.querySelectorAll(".lyric-line");if(H.forEach((M,nt)=>{M.classList.toggle("active",nt===d),M.classList.toggle("passed",nt<d)}),d>=0&&H[d]){const M=H[d],nt=i.clientHeight,L=M.offsetTop-i.offsetTop-nt/2+M.clientHeight/2;i.scrollTo({top:Math.max(0,L),behavior:"smooth"})}}}t.addEventListener("timeupdate",v),window.addEventListener("lumi:trackChange",k=>{p(k.detail)}),it("melo:track-changed",k=>{p(k)}),it("melo:playback-state",k=>{k&&(u=Number(k.currentTime)||0,k.track&&k.track.id!==l?p(k.track):v())}),it("melo:playback-position",k=>{u=Number(k)||0,v()});const S=window.__LUMI_QUEUE__;if(Array.isArray(S)&&S.length>0)p(S[((P=window.LumiPlayer)==null?void 0:P.currentIndex)||0]);else try{const k=JSON.parse(localStorage.getItem("melo-current-track")||"null");k&&p(k)}catch{}U("melo:request-playback-state"),setTimeout(()=>U("melo:request-playback-state"),250),window.LumiLyrics={loadTrackLyrics:p,parseLRC:De}}const ka=(t,a,i)=>{const e=t[a];return e?typeof e=="function"?e():Promise.resolve(e):new Promise((n,s)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(s.bind(null,new Error("Unknown variable dynamic import: "+a+(a.split("/").length!==i?". Note that variables only represent file names one level deep.":""))))})},Xe={code:"en",name:"English",nativeName:"English",authors:["Melo Team"]},Se={_meta:Xe,"settings.tabs.general":"General","settings.tabs.playback":"Playback","settings.tabs.appearance":"Appearance & Skin","settings.tabs.shortcuts":"Shortcuts","settings.tabs.about":"About","settings.general.language.label":"Language","settings.general.language.desc":"Interface language — more languages coming via community translation","settings.general.tray.label":"Close to system tray","settings.general.tray.desc":"Minimize to system tray on window close","settings.general.resume.label":"Resume playback on reopen","settings.general.resume.desc":"Continue playback of the previous track where you left off","settings.playback.replaygain.label":"ReplayGain normalization","settings.playback.replaygain.desc":"Equalize track volume levels automatically","settings.playback.fadepause.label":"Fade out on pause","settings.playback.fadepause.desc":"Smooth 0.5s fade-out on pause, fade back in on resume","settings.playback.crossfade.label":"Crossfade","settings.playback.crossfade.desc":"Smoothly blend the end of one track into the start of the next","settings.playback.crossfadeDuration.label":"Crossfade duration","settings.playback.crossfadeDuration.desc":"How long the transition between tracks lasts (1–12 seconds)","settings.appearance.showstop.label":"Show Stop button","settings.appearance.showstop.desc":"Display a Stop control next to Play/Pause in the player"},xa=Object.freeze(Object.defineProperty({__proto__:null,_meta:Xe,default:Se},Symbol.toStringTag,{value:"Module"})),Ze=[{code:"en",nativeName:"English"}],Ut={en:Se};let Ke=Ut.en,Qe="en";function Sa(){return Qe}async function ta(t){if(Ze.some(a=>a.code===t)||(t="en"),!Ut[t])if(t==="en")Ut.en=Se;else try{const a=await ka(Object.assign({"./locales/en.json":()=>Y(()=>Promise.resolve().then(()=>xa),void 0)}),`./locales/${t}.json`,3);Ut[t]=a.default||a}catch{t="en"}Qe=t,Ke=Ut[t]||Ut.en,localStorage.setItem("melo-pref-language",t),document.dispatchEvent(new CustomEvent("melo:locale-changed",{detail:t}))}function rt(t){var a,i;return(i=(a=Ke[t])!=null?a:Ut.en[t])!=null?i:t}function Oe(){const t=localStorage.getItem("melo-pref-language")||"en";ta(t)}const ea=document.querySelector("#app");ea.innerHTML=`
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
            <select class="settings-select" id="setLanguage">${Ze.map(t=>`<option value="${t.code}">${t.nativeName}</option>`).join("")}</select>
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
`;const gt=new URLSearchParams(location.search).get("panel");gt&&(document.documentElement.classList.add("panel-window",`panel-${gt}`),document.body.classList.add("panel-window",`panel-${gt}`));var Ue,Ve;if(ft&&gt){Y(async()=>{const{getCurrentWindow:e}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:e}},__vite__mapDeps([8,7,1,0])).then(({getCurrentWindow:e})=>{const n=e();Ia(n,"melo-geo-panel-"+gt),n.onCloseRequested(()=>{U("melo:panel-closed",gt)}),window.addEventListener("beforeunload",()=>{U("melo:panel-closed",gt)})});const t=document.getElementById("win-"+gt),a=((Ue=t==null?void 0:t.querySelector(".float-title"))==null?void 0:Ue.innerHTML)||"",i=((Ve=t==null?void 0:t.querySelector(".float-body"))==null?void 0:Ve.innerHTML)||"";ea.innerHTML=`
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
</div>`}ft&&!gt&&(document.documentElement.classList.add("tauri-main"),document.body.classList.add("tauri-main"),document.querySelectorAll(".side-actions .sbtn").forEach(t=>t.classList.remove("active")),Y(async()=>{const{WebviewWindow:t}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:t}},__vite__mapDeps([6,7,1,0,8])).then(({WebviewWindow:t})=>{const a=async()=>{var i;for(const e of["library","playlist","equalizer","lyrics","settings"])try{const n=await t.getByLabel("panel-"+e);(i=document.getElementById(Me[e]))==null||i.classList.toggle("active",!!n)}catch{}};a(),setInterval(a,1200)}));ft&&!gt&&(Y(()=>import("./window-BWd3Cypy.js"),__vite__mapDeps([8,7,1,0])).then(async({getCurrentWindow:t})=>{const a=t(),i=()=>{const l=localStorage.getItem("melo-active-skin-id")||"default";if(l==="compact-pill"||typeof l=="string"&&l.startsWith("compact-pill"))return{w:780,h:138,resizable:!1,fixed:!0,custom:!1,force:!0,minW:780,minH:138,maxW:780,maxH:138};if(l!=="default"){const u=ha();if(u){const c=Number.isFinite(u.width)&&Number.isFinite(u.height)&&(u.width||0)>0&&(u.height||0)>0;return{w:u.width||0,h:u.height||0,resizable:u.resizable!==!1,fixed:!1,custom:!0,force:c,minW:u.minWidth,minH:u.minHeight,maxW:u.maxWidth,maxH:u.maxHeight}}return{w:0,h:0,resizable:!0,fixed:!1,custom:!0,force:!1,minW:void 0,minH:void 0,maxW:void 0,maxH:void 0}}return{w:960,h:240,resizable:!0,fixed:!1,custom:!1,force:!0,minW:650,minH:135,maxW:1e4,maxH:260}},e=async l=>{try{const{LogicalSize:d}=await Y(async()=>{const{LogicalSize:u}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:u}},__vite__mapDeps([7,1]));if(l.fixed)await a.setMinSize(new d(l.w,l.h)),await a.setMaxSize(new d(l.w,l.h));else if(l.custom){const u=l.minW||240,c=l.minH||120,p=Math.max(u,l.maxW||1e4),y=Math.max(c,l.maxH||1e4);await a.setMinSize(new d(u,c)),await a.setMaxSize(new d(p,y))}else await a.setMinSize(new d(650,135)),await a.setMaxSize(new d(1e4,260));await a.setResizable(l.resizable)}catch{}},n=(l,d,u,c)=>{let p=Number.isFinite(l)&&l>0?l:d;return u!=null&&p<u&&(p=u),c!=null&&p>c&&(p=c),p};try{const l=JSON.parse(localStorage.getItem("melo-geo-main")||"null"),{LogicalPosition:d,LogicalSize:u}=await Y(async()=>{const{LogicalPosition:p,LogicalSize:y}=await import("./dpi-fvP-W2qr.js");return{LogicalPosition:p,LogicalSize:y}},__vite__mapDeps([7,1])),c=i();if(c.force){let p=c.w,y=c.h;l&&!c.fixed&&(c.custom?(p=n(l.w,c.w,c.minW,c.maxW),y=n(l.h,c.h,c.minH,c.maxH)):(p=Math.max(650,l.w),y=c.h)),await a.setSize(new u(p,y))}await e(c),(l==null?void 0:l.x)!=null&&(l==null?void 0:l.y)!=null&&await a.setPosition(new d(l.x,l.y))}catch{}const s=async()=>{try{const l=await a.outerPosition(),d=await a.innerSize();localStorage.setItem("melo-geo-main",JSON.stringify({x:l.x,y:l.y,w:d.width,h:d.height}))}catch{}};a.onMoved(s),a.onResized(async()=>{try{const l=i(),{LogicalSize:d}=await Y(async()=>{const{LogicalSize:u}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:u}},__vite__mapDeps([7,1]));if(l.fixed)await a.setSize(new d(l.w,l.h));else if(!l.custom){const c=(await a.innerSize()).toLogical(await a.scaleFactor());(c.width<650||c.height!==l.h)&&await a.setSize(new d(Math.max(650,c.width),l.h))}}catch{}s()}),it("melo:skin-changed",async l=>{try{!gt&&l&&await Vt(l,Rt,void 0,!1,!1);const d=i();if(d.force){const{LogicalSize:u}=await Y(async()=>{const{LogicalSize:c}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:c}},__vite__mapDeps([7,1]));await a.setSize(new u(d.w,d.h))}await e(d),s()}catch{}}),it("melo:skin-geometry",async()=>{try{const l=i();if(l.force){const{LogicalSize:d}=await Y(async()=>{const{LogicalSize:u}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:u}},__vite__mapDeps([7,1]));await a.setSize(new d(l.w,l.h))}await e(l),s()}catch{}}),a.onCloseRequested(async l=>{if(l.preventDefault(),localStorage.getItem("melo-pref-tray")==="1")try{await a.hide();return}catch{}const{WebviewWindow:u}=await Y(async()=>{const{WebviewWindow:c}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:c}},__vite__mapDeps([6,7,1,0,8]));for(const c of["library","playlist","equalizer","lyrics","settings"])try{const p=await u.getByLabel("panel-"+c);p&&await p.close()}catch{}try{await a.destroy()}catch{window.close()}})}),Y(()=>import("./core-DhEqZVGG.js"),[]).then(async({invoke:t})=>{try{const a=await t("get_cli_tracks");Array.isArray(a)&&a.length>0&&setTimeout(async()=>{const i=window.LumiLibrary,e=a.map(s=>s.path).filter(Boolean),n=await(i==null?void 0:i.importPaths(e,"replace"))||[];n.length&&U("melo:play-tracks",{tracks:n,index:0})},350)}catch{}}),it("melo:open-files",t=>{if(Array.isArray(t)&&t.length>0){const a=t.map(i=>i.path).filter(Boolean);setTimeout(async()=>{const i=window.LumiLibrary,e=await(i==null?void 0:i.importPaths(a,"replace"))||[];e.length&&U("melo:play-tracks",{tracks:e,index:0})},100)}}));document.addEventListener("contextmenu",t=>{t.preventDefault()});const fe=document.getElementById("toast"),xt=t=>{fe&&(fe.textContent=t,fe.classList.add("show"),setTimeout(()=>fe.classList.remove("show"),2200))},Tt=new Audio;Tt.preload="metadata";Tt.crossOrigin="anonymous";window.__LUMI_AUDIO__=Tt;window.__TOAST__=xt;localStorage.getItem("melo-dynamic-theme")===null&&localStorage.setItem("melo-dynamic-theme","1");let Rt=localStorage.getItem("lumi-theme")||"dark";function ve(t){document.documentElement.setAttribute("data-theme",t),localStorage.setItem("lumi-theme",t),Rt=t}function aa(t){ve(t),U("melo:theme",t)}ve(Rt);it("melo:theme",t=>{(t==="light"||t==="dark")&&ve(t)});setInterval(()=>{const t=localStorage.getItem("lumi-theme");(t==="light"||t==="dark")&&t!==Rt&&ve(t)},1e3);document.body.classList.toggle("show-stop-btn",localStorage.getItem("melo-pref-showStopBtn")==="1");it("melo:pref-changed",t=>{t&&t.key==="showStopBtn"&&document.body.classList.toggle("show-stop-btn",!!t.value)});const Ma=["win-library","win-playlist","win-equalizer","win-lyrics","win-settings"],he=document.getElementById("desktop"),Ea={btnToggleLibrary:"win-library",btnTogglePlaylist:"win-playlist",btnToggleEq:"win-equalizer",btnToggleLyrics:"win-lyrics",btnOpenSettings:"win-settings",menuToggleLibrary:"win-library",menuTogglePlaylist:"win-playlist",menuToggleEq:"win-equalizer",menuToggleLyrics:"win-lyrics",menuToggleSettings:"win-settings"};function La(t){const a=document.getElementById(t);return!!a&&!a.classList.contains("hidden")}const Me={library:"btnToggleLibrary",playlist:"btnTogglePlaylist",equalizer:"btnToggleEq",lyrics:"btnToggleLyrics",settings:"btnOpenSettings"};async function Ia(t,a){const i=async()=>{try{const e=await t.outerPosition(),n=await t.outerSize();localStorage.setItem(a,JSON.stringify({x:e.x,y:e.y,w:n.width,h:n.height}))}catch{}};t.onMoved(i),t.onResized(i)}async function _a(t){const{WebviewWindow:a}=await Y(async()=>{const{WebviewWindow:p}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:p}},__vite__mapDeps([6,7,1,0,8])),i="panel-"+t,e=document.getElementById(Me[t]),n=await a.getByLabel(i);if(n){await n.close(),e==null||e.classList.remove("active");return}const s={library:[430,620],playlist:[440,560],equalizer:[700,440],lyrics:[380,520],settings:[600,540]},l={library:[360,400],playlist:[360,360],equalizer:[620,400],lyrics:[320,360],settings:[500,400]},d={library:"Library",playlist:"Playlist",equalizer:"Equalizer",lyrics:"Lyric",settings:"Settings"},u=s[t]||[420,520];let c=null;try{c=JSON.parse(localStorage.getItem("melo-geo-panel-"+t)||"null")}catch{}new a(i,{url:`/?panel=${t}`,title:d[t]||t,width:(c==null?void 0:c.w)||u[0],height:(c==null?void 0:c.h)||u[1],minWidth:(l[t]||[360,360])[0],minHeight:(l[t]||[360,360])[1],...(c==null?void 0:c.x)!=null?{x:c.x,y:c.y}:{center:!0},decorations:!1,transparent:!0,shadow:!1,skipTaskbar:!0}),e==null||e.classList.add("active")}it("melo:panel-closed",t=>{var i;const a=Me[t];a&&((i=document.getElementById(a))==null||i.classList.remove("active"))});function Ee(t){if(ft){_a(t.replace(/^win-/,""));return}const a=La(t);de(t,!a),a||ye(document.getElementById(t))}function Ta(t){if(t.classList.contains("hidden")||!he||window.matchMedia("(max-width: 860px)").matches)return;const a=he.getBoundingClientRect();if(a.width<=0||a.height<=0)return;const i=t.getBoundingClientRect(),e=Math.min(i.width,a.width),n=Math.min(i.height,a.height);let s=i.left-a.left,l=i.top-a.top;s=Math.max(0,Math.min(a.width-e,s)),l=Math.max(0,Math.min(a.height-n,l)),t.style.left=s+"px",t.style.top=l+"px",t.style.right="auto",t.style.bottom="auto",t.style.transform="none"}function de(t,a){var n,s,l,d,u,c,p,y,v,S;const i=document.getElementById(t);if(!i)return;i.classList.toggle("hidden",!a),localStorage.setItem("lumiv2-"+t,a?"1":"0"),a&&Ta(i);const e=a;t==="win-library"&&((n=document.getElementById("btnToggleLibrary"))==null||n.classList.toggle("active",e),(s=document.getElementById("menuToggleLibrary"))==null||s.classList.toggle("active",e)),t==="win-playlist"&&((l=document.getElementById("btnTogglePlaylist"))==null||l.classList.toggle("active",e),(d=document.getElementById("menuTogglePlaylist"))==null||d.classList.toggle("active",e)),t==="win-equalizer"&&((u=document.getElementById("btnToggleEq"))==null||u.classList.toggle("active",e),(c=document.getElementById("menuToggleEq"))==null||c.classList.toggle("active",e)),t==="win-lyrics"&&((p=document.getElementById("btnToggleLyrics"))==null||p.classList.toggle("active",e),(y=document.getElementById("menuToggleLyrics"))==null||y.classList.toggle("active",e)),t==="win-settings"&&((v=document.getElementById("btnOpenSettings"))==null||v.classList.toggle("active",e),(S=document.getElementById("menuToggleSettings"))==null||S.classList.toggle("active",e))}gt||Ma.forEach(t=>{const a=localStorage.getItem("lumiv2-"+t);a!==null?de(t,a==="1"):t==="win-settings"?de(t,!1):de(t,!0)});Object.entries(Ea).forEach(([t,a])=>{var i;(i=document.getElementById(t))==null||i.addEventListener("click",()=>Ee(a))});document.querySelectorAll("[data-close]").forEach(t=>{t.addEventListener("click",()=>{const a=t.dataset.close;de(a,!1)})});let St=null,Ct=null,He=10;function ye(t){He++,t.style.zIndex=String(He),document.querySelectorAll(".float-win").forEach(a=>a.classList.remove("active")),t.classList.add("active")}document.querySelectorAll(".float-win").forEach(t=>{t.addEventListener("mousedown",()=>ye(t))});document.querySelectorAll("[data-drag]").forEach(t=>{t.addEventListener("mousedown",a=>{if(a.target.closest("button")||a.target.closest("input")||a.target.closest("select"))return;const i=t.dataset.drag,e=document.getElementById(i);ye(e),e.classList.add("dragging");const n=e.getBoundingClientRect();St={id:i,startX:a.clientX,startY:a.clientY,initX:n.left,initY:n.top,width:n.width,height:n.height}})});document.querySelectorAll("[data-resize]").forEach(t=>{t.addEventListener("mousedown",a=>{a.stopPropagation();const i=t.dataset.resize,e=document.getElementById(i);ye(e),e.classList.add("resizing");const n=e.getBoundingClientRect();Ct={id:i,startX:a.clientX,startY:a.clientY,initW:n.width,initH:n.height}})});window.addEventListener("mousemove",t=>{if(St){const a=document.getElementById(St.id);let i=t.clientX-St.startX,e=t.clientY-St.startY,n=St.initX+i,s=St.initY+e;if(he&&!window.matchMedia("(max-width: 860px)").matches){const l=he.getBoundingClientRect(),d=l.left,u=l.right-St.width,c=l.top,p=l.bottom-St.height;n=Math.max(d,Math.min(u,n))-l.left,s=Math.max(c,Math.min(p,s))-l.top}a.style.left=n+"px",a.style.top=s+"px",a.style.right="auto",a.style.bottom="auto",a.style.transform="none"}if(Ct){const a=document.getElementById(Ct.id);let i=Ct.initW+(t.clientX-Ct.startX),e=Ct.initH+(t.clientY-Ct.startY);i=Math.max(260,i),e=Math.max(160,e),a.style.width=i+"px",a.style.height=e+"px"}});window.addEventListener("mouseup",()=>{if(St){const t=document.getElementById(St.id);t&&(t.classList.remove("dragging"),localStorage.setItem("lumiv2-pos-"+St.id,JSON.stringify({left:t.style.left,top:t.style.top}))),St=null}if(Ct){const t=document.getElementById(Ct.id);t&&(t.classList.remove("resizing"),localStorage.setItem("lumiv2-size-"+Ct.id,JSON.stringify({width:t.style.width,height:t.style.height}))),Ct=null}});async function ia(){const t=window.LumiLibrary,a=window.LumiPlayer;if(ft){try{const{open:e}=await Y(async()=>{const{open:d}=await import("./index-CS3Qnt9j.js");return{open:d}},__vite__mapDeps([5,1])),n=await e({multiple:!0,filters:[{name:"Audio",extensions:["mp3","flac","wav","aac","ogg","m4a","alac","opus","wma","aiff"]}]});if(!n)return;const s=Array.isArray(n)?n:[n],l=await(t==null?void 0:t.importPaths(s,"replace"))||[];l.length&&(U("melo:play-tracks",{tracks:l,index:0}),xt(`${l.length} file(s) added`))}catch{xt("Error opening files")}return}const i=document.createElement("input");i.type="file",i.multiple=!0,i.accept="audio/*,.mp3,.flac,.wav,.aac,.ogg,.m4a,.alac,.opus,.wma,.aiff",i.onchange=async()=>{const e=Array.from(i.files||[]);if(!e.length)return;const n=[];for(const s of e){const l=s.path,d=l||URL.createObjectURL(s),u=s.name,c=u.lastIndexOf("."),p=c>0?u.slice(0,c):u,y=c>0?u.slice(c+1).toUpperCase():"AUDIO",v={id:l||"imp_"+Math.random().toString(36).slice(2,9),title:p,artist:"Unknown Artist",album:"Single",duration:0,path:d,codec:y,specs:"Local File",source:"import"};await We(s,v),n.push(v)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(s=>a==null?void 0:a.queue.push(s)),U("melo:play-tracks",{tracks:n,index:0}),xt(`${n.length} file(s) added`)},i.click()}async function na(){const t=window.LumiLibrary,a=window.LumiPlayer;if(ft){try{const{open:e}=await Y(async()=>{const{open:l}=await import("./index-CS3Qnt9j.js");return{open:l}},__vite__mapDeps([5,1])),n=await e({directory:!0});if(!n)return;const s=n;await(t==null?void 0:t.scanFolder(s,!0))}catch{xt("Error scanning folder")}return}const i=document.createElement("input");i.type="file",i.webkitdirectory=!0,i.multiple=!0,i.accept="audio/*",i.onchange=async()=>{const e=Array.from(i.files||[]).filter(s=>/\.(mp3|flac|wav|aac|ogg|m4a|alac|opus|wma|aiff)$/i.test(s.name));if(!e.length)return;const n=[];for(const s of e){const l=s.path,d=l||URL.createObjectURL(s),u=s.name,c=u.lastIndexOf("."),p=c>0?u.slice(0,c):u,y=c>0?u.slice(c+1).toUpperCase():"AUDIO",v={id:l||"imp_"+Math.random().toString(36).slice(2,9),title:p,artist:"Unknown Artist",album:"Folder Import",duration:0,path:d,codec:y,specs:"Local File",source:"import"};await We(s,v),n.push(v)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(s=>a==null?void 0:a.queue.push(s)),U("melo:play-tracks",{tracks:n,index:0}),xt(`${n.length} file(s) added from folder`)},i.click()}document.addEventListener("click",t=>{var e;const a=(e=t.target)==null?void 0:e.closest('#btnAddFiles, #btnAddFolder, #btnThemeToggle, [data-melo="add-files"], [data-melo="add-folder"], [data-melo="theme-toggle"]');if(!a)return;const i=a.getAttribute("data-melo")||a.id;i==="btnAddFiles"||i==="add-files"?ia():i==="btnAddFolder"||i==="add-folder"?na():(i==="btnThemeToggle"||i==="theme-toggle")&&aa(Rt==="light"?"dark":"light")});window.addEventListener("keydown",t=>{(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="o"&&(t.shiftKey?(t.preventDefault(),na()):(t.preventDefault(),ia())),((t.ctrlKey||t.metaKey)&&t.key===","||t.key==="F2")&&(t.preventDefault(),Ee("win-settings"))});function Ne(t){var g,m;function a(h){document.querySelectorAll(".settings-tab").forEach(x=>{x.classList.toggle("active",x.dataset.stab===h)}),document.querySelectorAll(".settings-section[data-panel]").forEach(x=>{x.classList.toggle("active",x.dataset.panel===h)}),localStorage.setItem("melo-settings-tab",h)}document.querySelectorAll(".settings-tab").forEach(h=>{h.addEventListener("click",()=>a(h.dataset.stab))}),a(localStorage.getItem("melo-settings-tab")||"general"),document.querySelectorAll(".switch[data-key]").forEach(h=>{const x=h.dataset.key,$=localStorage.getItem("melo-pref-"+x);$!==null&&h.classList.toggle("on",$==="1"),h.onclick=()=>{h.classList.toggle("on");const J=h.classList.contains("on");localStorage.setItem("melo-pref-"+x,J?"1":"0"),U("melo:pref-changed",{key:x,value:J})}});const i=document.getElementById("swCrossfade"),e=document.getElementById("crossfadeDurationRow"),n=document.getElementById("crossfadeDurationRange"),s=document.getElementById("crossfadeDurationValue"),l=document.getElementById("btnCrossfadeDown"),d=document.getElementById("btnCrossfadeUp");function u(){const h=localStorage.getItem("melo-pref-crossfade")==="1";e==null||e.classList.toggle("disabled-row",!h)}u(),i==null||i.addEventListener("click",()=>setTimeout(u,0));function c(){if(!n)return;const x=((parseInt(n.value,10)||1)-1)/11*100;n.style.setProperty("--progress",x+"%")}function p(h){const x=Math.min(12,Math.max(1,Math.round(h)));localStorage.setItem("melo-pref-crossfadeDuration",String(x)),n&&(n.value=String(x)),s&&(s.textContent=x+"s"),c(),U("melo:pref-changed",{key:"crossfadeDuration",value:x})}const y=parseInt(localStorage.getItem("melo-pref-crossfadeDuration")||"4",10);{const h=Math.min(12,Math.max(1,Number.isFinite(y)?y:4));n&&(n.value=String(h)),s&&(s.textContent=h+"s"),c()}n&&(n.oninput=()=>p(parseInt(n.value,10))),l==null||l.addEventListener("click",()=>p(parseInt((n==null?void 0:n.value)||"4",10)-1)),d==null||d.addEventListener("click",()=>p(parseInt((n==null?void 0:n.value)||"4",10)+1));const v=document.getElementById("setLanguage");v&&(v.value=Sa(),v.onchange=async()=>{await ta(v.value),t(`Language set to ${v.options[v.selectedIndex].text} — restart Melo to fully apply`)});const S=document.getElementById("swDynamicTheme");if(S){const h=localStorage.getItem("melo-dynamic-theme")!=="0";S.classList.toggle("on",h),S.onclick=()=>{var V,F;const x=!S.classList.contains("on");S.classList.toggle("on",x),localStorage.setItem("melo-dynamic-theme",x?"1":"0");const $=window.__LUMI_QUEUE__,J=(F=(V=window.LumiPlayer)==null?void 0:V.currentIndex)!=null?F:0;$&&$[J]&&Fe(x?$[J].cover:null)}}const P=document.getElementById("skinSelect"),k=document.getElementById("btnSkinThemeToggle"),W=document.getElementById("btnRefreshSkins"),H=document.getElementById("btnOpenSkinsFolder"),M=document.getElementById("skinThemeIcon"),nt=document.getElementById("skinThemeLabel");function lt(h){M&&(M.textContent=h==="dark"?"🌙":"☀️"),nt&&(nt.textContent=h==="dark"?"Dark":"Light")}lt(Rt),k==null||k.addEventListener("click",()=>{const h=Rt==="dark"?"light":"dark";aa(h),lt(h),t(h==="dark"?"Dark theme":"Light theme")}),it("melo:theme",h=>{(h==="light"||h==="dark")&&lt(h)});async function L(){if(!P)return;const h=localStorage.getItem("melo-active-skin-id")||"default",x=await Ye();P.innerHTML=`
      <option value="default">Default Melo (Standard)</option>
      <option value="compact-pill">Minimal Compact (Pill Bar)</option>
    `,x.forEach($=>{if($.filename!=="compact-pill.html"&&$.filename!=="compact-pill-light.html"&&$.filename!=="compact-pill-dark.html"){const J=document.createElement("option");J.value=$.filename,J.textContent=`${$.name} (${$.filename})`,P.appendChild(J)}}),P.value=h}L(),P&&(P.onchange=()=>{const h=P.value;Vt(h,Rt,t)}),W==null||W.addEventListener("click",async()=>{await L();const h=localStorage.getItem("melo-active-skin-id")||"default";Vt(h,Rt,t),t("Skins reloaded from disk")}),H==null||H.addEventListener("click",()=>{Je(t)}),(g=document.getElementById("btn-reset-skin-settings"))==null||g.addEventListener("click",()=>{xe(t),P&&(P.value="default")}),(m=document.getElementById("btn-settings-reset"))==null||m.addEventListener("click",()=>{localStorage.clear(),t("Settings reset — reloading..."),setTimeout(()=>location.reload(),600)})}function la(){document.querySelectorAll('.win-btn, [data-melo="minimize"], [data-melo="close"]').forEach(t=>{t.onclick=async()=>{const a=t.getAttribute("aria-label")||t.getAttribute("data-melo");if(window.__TAURI__){const{getCurrentWindow:i}=await Y(async()=>{const{getCurrentWindow:n}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:n}},__vite__mapDeps([8,7,1,0])),e=i();a==="minimize"?e.minimize():a==="close"&&e.close()}else a==="close"&&xt("Window close requires the Tauri desktop build")}})}la();const Ca=[["btnToggleLibrary","toggle-library","win-library"],["btnTogglePlaylist","toggle-playlist","win-playlist"],["btnToggleEq","toggle-eq","win-equalizer"],["btnToggleLyrics","toggle-lyrics","win-lyrics"],["btnOpenSettings","toggle-settings","win-settings"]];window.__LUMI_REBIND_MAIN__=()=>{la(),Ca.forEach(([t,a,i])=>{const e=at(t,a);e&&(e.onclick=()=>Ee(i))})};const Ft=document.createElement("div");Ft.id="aboutPop";Ft.style.display="none";document.body.appendChild(Ft);document.addEventListener("click",t=>{var a,i;(a=t.target)!=null&&a.closest('#btnAbout, [data-melo="about"]')&&(t.stopPropagation(),Ft.innerHTML=`
    <div class="about-head">Melo <b>0.5.2 Beta</b></div>
    <div style="font-size:11.5px; color:var(--text-soft); margin:6px 0 10px;">
      Modern Windows Music Player<br/>
      Tauri 2 + TypeScript + Rust
    </div>
    <a class="about-link" id="aboutLink" href="https://github.com/Arvanta/Melo" rel="noopener">github.com/Arvanta/Melo ↗</a>`,Ft.style.display=Ft.style.display==="none"?"block":"none",(i=document.getElementById("aboutLink"))==null||i.addEventListener("click",e=>{e.preventDefault();const n="https://github.com/Arvanta/Melo";ft?Y(()=>import("./core-DhEqZVGG.js"),[]).then(s=>s.invoke("open_url",{url:n})).catch(()=>window.open(n,"_blank")):window.open(n,"_blank")}))});document.addEventListener("click",t=>{!t.target.closest("#aboutPop")&&!t.target.closest('#btnAbout, [data-melo="about"]')&&(Ft.style.display="none")});ft&&gt?gt==="library"||gt==="playlist"?Be(Tt,xt):gt==="equalizer"?Re(Tt,xt,{remote:!0}):gt==="lyrics"?$e(Tt):gt==="settings"&&(Oe(),Ne(xt),Pe(xt)):(ba(Tt,xt),Be(Tt,xt),Re(Tt,xt),wa(Tt),$e(Tt),Pe(xt),Ne(xt),Oe(),setTimeout(async()=>{if(localStorage.getItem("melo-pref-resume")!=="0")try{const t=JSON.parse(localStorage.getItem("melo-resume-state")||"null"),a=window.LumiLibrary,i=window.LumiPlayer;if(!(t!=null&&t.trackId)||!a||!i)return;const e=await a.getTrack(t.trackId);if(!e)return;i.queue=[e],i.loadTrack(0,!0,t.position||0)}catch{}},500));
//# sourceMappingURL=index-CIMq66d7.js.map
