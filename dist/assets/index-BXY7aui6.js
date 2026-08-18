const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/event-CNdo2oXa.js","assets/core-DhEqZVGG.js","assets/index-DiyoAAdc.js","assets/index-CHth0gh2.js","assets/index-Bq0iOnRE.js","assets/index-CS3Qnt9j.js","assets/webviewWindow-mjQkSB26.js","assets/dpi-fvP-W2qr.js","assets/window-BWd3Cypy.js"])))=>i.map(i=>d[i]);
(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))e(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&e(l)}).observe(document,{childList:!0,subtree:!0});function i(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function e(n){if(n.ep)return;n.ep=!0;const o=i(n);fetch(n.href,o)}})();const ra="modulepreload",ca=function(t){return"/"+t},ke={},Y=function(a,i,e){let n=Promise.resolve();if(i&&i.length>0){let l=function(s){return Promise.all(s.map(p=>Promise.resolve(p).then(v=>({status:"fulfilled",value:v}),v=>({status:"rejected",reason:v}))))};document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),d=(c==null?void 0:c.nonce)||(c==null?void 0:c.getAttribute("nonce"));n=l(i.map(s=>{if(s=ca(s),s in ke)return;ke[s]=!0;const p=s.endsWith(".css"),v=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${v}`))return;const g=document.createElement("link");if(g.rel=p?"stylesheet":ra,p||(g.as="script"),g.crossOrigin="",g.href=s,d&&g.setAttribute("nonce",d),document.head.appendChild(g),p)return new Promise((S,k)=>{g.addEventListener("load",S),g.addEventListener("error",()=>k(new Error(`Unable to preload CSS for ${s}`)))})}))}function o(l){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=l,window.dispatchEvent(c),!c.defaultPrevented)throw l}return n.then(l=>{for(const c of l||[])c.status==="rejected"&&o(c.reason);return a().catch(o)})},nt=typeof window.__TAURI_INTERNALS__<"u"||typeof window.__TAURI__<"u";async function H(t,a){if(nt)try{const{emit:i}=await Y(async()=>{const{emit:e}=await import("./event-CNdo2oXa.js");return{emit:e}},__vite__mapDeps([0,1]));await i(t,a);return}catch{}window.dispatchEvent(new CustomEvent(t,{detail:a}))}function at(t,a){nt&&Y(async()=>{const{listen:i}=await import("./event-CNdo2oXa.js");return{listen:i}},__vite__mapDeps([0,1])).then(({listen:i})=>{i(t,e=>{a(e.payload)})}).catch(()=>{}),window.addEventListener(t,i=>a(i.detail))}let xe=!1;async function da(){if(!xe){xe=!0;try{const t=globalThis;if(typeof t.Buffer>"u"){const a=await Y(()=>import("./index-DiyoAAdc.js").then(i=>i.i),__vite__mapDeps([2,3]));t.Buffer=a.Buffer}typeof t.process>"u"&&(t.process={env:{},browser:!0,nextTick:a=>setTimeout(a,0)})}catch{}}}async function ua(t,a){var i;try{await da();const e=await Y(()=>import("./index-Bq0iOnRE.js").then(s=>s.i),__vite__mapDeps([4,3])),n=e&&typeof e.parseBlob=="function"?e:e.default||e,o=await Promise.race([n.parseBlob(t),new Promise((s,p)=>setTimeout(()=>p(new Error("timeout")),1800))]),l=o==null?void 0:o.common;if(!l)return;l.title&&(a.title=l.title),l.artist?a.artist=l.artist:l.artists&&l.artists[0]&&(a.artist=l.artists[0]),l.album&&(a.album=l.album),l.genre&&l.genre[0]&&(a.genre=l.genre[0]),l.year&&(a.year=l.year);const c=(i=l.picture)==null?void 0:i[0];if(c&&c.data){const s=c.format||"image/jpeg",p=c.data;if(p.length>6e5)return;let v="";const g=8192;for(let S=0;S<p.length;S+=g){const k=p.subarray(S,S+g);v+=String.fromCharCode.apply(null,k)}a.cover=`data:${s};base64,${btoa(v)}`}const d=o==null?void 0:o.format;d&&d.duration&&!a.duration&&(a.duration=Math.floor(d.duration))}catch{}}async function Re(t,a,i=1800){return await ua(t,a),a}async function pa(t){return new Promise(a=>{if(!t)return a(null);const i=new Image;i.crossOrigin="anonymous",i.onload=()=>{try{const e=document.createElement("canvas"),n=e.getContext("2d");if(!n)return a(null);e.width=40,e.height=40,n.drawImage(i,0,0,40,40);const o=n.getImageData(0,0,40,40).data;let l={r:42,g:123,b:214},c=-1;for(let d=0;d<o.length;d+=4){const s=o[d],p=o[d+1],v=o[d+2];if(o[d+3]<128)continue;const S=Math.max(s,p,v),k=Math.min(s,p,v),h=(S+k)/510,B=S-k,P=B===0?0:B/(1-Math.abs(2*h-1));if(P>.25&&h>.25&&h<.82){const x=P*1.5+(1-Math.abs(h-.5));x>c&&(c=x,l={r:s,g:p,b:v})}}c>0?a(l):a(null)}catch{a(null)}},i.onerror=()=>a(null),i.src=t})}async function qe(t){const a=localStorage.getItem("melo-dynamic-theme")!=="0",i=document.documentElement;if(!a||!t){i.style.removeProperty("--accent"),i.style.removeProperty("--visualizer"),i.style.removeProperty("--accent-glow");return}const e=await pa(t);if(e){const n=`rgb(${e.r}, ${e.g}, ${e.b})`;i.style.setProperty("--accent",n),i.style.setProperty("--visualizer",n),i.style.setProperty("--accent-glow",`rgba(${e.r}, ${e.g}, ${e.b}, 0.35)`)}else i.style.removeProperty("--accent"),i.style.removeProperty("--visualizer"),i.style.removeProperty("--accent-glow")}const Yt=[31,62,125,250,500,1e3,2e3,4e3,8e3,16e3];let Lt=null,se=null,re=[],jt=null,Ut=null;function te(t){if(!Lt){const a=window.AudioContext||window.webkitAudioContext;Lt=new a;try{se=Lt.createMediaElementSource(t)}catch{}if(re=Yt.map(i=>{const e=Lt.createBiquadFilter();return e.type="peaking",e.frequency.value=i,e.Q.value=1.4,e.gain.value=0,e}),jt=Lt.createGain(),jt.gain.value=1,Ut=Lt.createAnalyser(),Ut.fftSize=2048,Ut.smoothingTimeConstant=.72,se){let i=se;for(const e of re)i.connect(e),i=e;i.connect(jt),jt.connect(Ut),Ut.connect(Lt.destination)}}return{ctx:Lt,filters:re,gain:jt,analyser:Ut,async resume(){Lt&&Lt.state==="suspended"&&await Lt.resume().catch(()=>{})}}}let Tt=null;function et(t,a){const i=document.getElementById(t);return i||document.querySelector(`[data-melo="${a}"]`)}function ma(t){const a=s=>{const p=t.match(new RegExp(s+`\\s*=\\s*["']?(\\d+)`));return p?parseInt(p[1],10):null},i=a("data-window-width"),e=a("data-window-height"),n=a("data-min-width"),o=a("data-min-height"),l=a("data-max-width"),c=a("data-max-height"),d=!/data-resizable\s*=\s*["\']?false/i.test(t);return i==null&&e==null&&n==null&&o==null&&l==null&&c==null?null:{width:i!=null?i:void 0,height:e!=null?e:void 0,minWidth:n!=null?n:void 0,minHeight:o!=null?o:void 0,maxWidth:l!=null?l:void 0,maxHeight:c!=null?c:void 0,resizable:d}}function fa(){try{const t=JSON.parse(localStorage.getItem("melo-skin-geometry")||"null");return!t||typeof t!="object"?null:t}catch{}return null}const Wt=`<!doctype html>
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
`,ee={"compact-pill.html":Wt,"compact-pill":Wt,"compact-pill-light.html":Wt,"compact-pill-dark.html":Wt,"compact-pill-light":Wt,"compact-pill-dark":Wt},ga=[{id:"compact-pill",name:"Minimal Compact (Light/Dark)",filename:"compact-pill.html"},{id:"full-html-example",name:"Full HTML Example",filename:"full-html-example.html"},{id:"slate",name:"Slate",filename:"slate.html"},{id:"silk-orbit",name:"Silk Orbit",filename:"silk-orbit.html"},{id:"ivory",name:"Ivory",filename:"ivory.html"},{id:"microline",name:"Microline",filename:"microline.html"}];function $e(t){const a=["trackTitle","btnPlay","seekBar","coverImg"];let i=0;for(const n of a)t.includes(n)&&i++;const e=(t.match(/data-melo\s*=/g)||[]).length;return i+=Math.min(e,3),i>=3}function Ot(t,a,i=!0){const e=document.getElementById("playerCard");if(!e)return;const n=e._originalHTML||e.innerHTML;e._originalHTML||(e._originalHTML=n),Tt&&(Tt.remove(),Tt=null);let l=[...t.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(g=>g[1]).join(`
`);l&&(Tt=document.createElement("style"),Tt.id="melo-custom-skin",Tt.textContent=l,document.head.appendChild(Tt));const c=$e(t);let d="";const s=t.match(/<body[^>]*>([\s\S]*?)<\/body>/i);s?d=s[1]:d=t.split(/<\/style>/i).pop()||"";const p=document.createElement("div");p.innerHTML=d;const v=p.querySelector("#lumi-player");if(v&&(d=v.innerHTML),c&&d.trim().length>20){const g=d.trim();e.innerHTML=g,a&&a("Skin applied"),setTimeout(()=>{var k,h;(k=window.__LUMI_REBIND__)==null||k.call(window);const S=window.__LUMI_AUDIO__;S&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(S),(h=window.__LUMI_REBIND_MAIN__)==null||h.call(window)},40)}else l&&a&&a("Skin CSS applied");if(c){const g=ma(t);g?(localStorage.setItem("melo-skin-geometry",JSON.stringify(g)),i&&H("melo:skin-geometry",g)):localStorage.removeItem("melo-skin-geometry")}localStorage.setItem("lumi-custom-skin",t),localStorage.setItem("lumi-custom-skin-isFull",c?"1":"0")}function ue(t,a=!0){document.documentElement.classList.remove("compact-skin-active"),document.body.classList.remove("compact-skin-active"),document.documentElement.classList.remove("custom-skin-active"),document.body.classList.remove("custom-skin-active"),Tt&&(Tt.remove(),Tt=null);const i=document.getElementById("playerCard");i&&i._originalHTML&&(i.innerHTML=i._originalHTML,setTimeout(()=>{var n,o;(n=window.__LUMI_REBIND__)==null||n.call(window);const e=window.__LUMI_AUDIO__;e&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(e),(o=window.__LUMI_REBIND_MAIN__)==null||o.call(window)},40)),localStorage.removeItem("lumi-custom-skin"),localStorage.removeItem("lumi-custom-skin-isFull"),localStorage.removeItem("melo-skin-geometry"),localStorage.setItem("melo-active-skin-id","default"),a&&H("melo:skin-changed","default"),t&&t("Switched to Default Melo skin")}async function Oe(){if(nt)try{const{invoke:t}=await Y(async()=>{const{invoke:i}=await import("./core-DhEqZVGG.js");return{invoke:i}},[]),a=await t("list_installed_skins");if(Array.isArray(a)&&a.length>0)return a}catch{}return ga}async function ha(t,a,i=!0){if(nt)try{const{invoke:n}=await Y(async()=>{const{invoke:l}=await import("./core-DhEqZVGG.js");return{invoke:l}},[]),o=await n("read_skin_file",{filenameOrPath:t});if(o&&o.trim().length>0)return Ot(o,a,i),!0}catch{}try{const n=t.startsWith("skins/")?t:`skins/${t}`,o=await fetch(n);if(o.ok){const l=await o.text();return Ot(l,a,i),!0}}catch{}const e=t.replace(/^.*[\\/]/,"");return ee[e]?(Ot(ee[e],a,i),!0):(a&&a(`Could not load skin: ${t}`),!1)}async function $t(t,a,i,e=!0,n=!0){if(t==="default"){ue(i,e);return}let o=t;const l=t==="compact-pill"||t.startsWith("compact-pill"),c=!l;document.documentElement.classList.toggle("compact-skin-active",l),document.body.classList.toggle("compact-skin-active",l),document.documentElement.classList.toggle("custom-skin-active",c),document.body.classList.toggle("custom-skin-active",c),l?o="compact-pill.html":!o.endsWith(".html")&&!o.endsWith(".htm")&&(o=o+".html");let d=!1;l&&ee[o]?(Ot(ee[o],i,n),d=!0):d=await ha(o,i,n),d&&(localStorage.setItem("melo-active-skin-id",t),e&&H("melo:skin-changed",t))}async function He(t){if(nt)try{const{invoke:a}=await Y(async()=>{const{invoke:i}=await import("./core-DhEqZVGG.js");return{invoke:i}},[]);await a("open_skins_folder"),t&&t("Opening skins folder...")}catch{t&&t("Could not open skins folder")}else t&&t("Skins are located in the skins/ folder")}function Se(t){const a=document.getElementById("skinUpload"),i=localStorage.getItem("melo-active-skin-id")||"default",e=localStorage.getItem("lumi-theme")||"dark";i!=="default"&&setTimeout(()=>{$t(i,e,void 0,!1,!1)},150),at("melo:theme",n=>{const o=localStorage.getItem("melo-active-skin-id");o&&o!=="default"&&$t(o,n,void 0,!1,!1)}),at("melo:skin-changed",n=>{if(n&&typeof n=="string"){const o=localStorage.getItem("lumi-theme")||"dark";$t(n,o,void 0,!1,!1)}}),a&&a.addEventListener("change",async()=>{var c;const n=(c=a.files)==null?void 0:c[0];if(!n)return;const o=await n.text(),l=n.name;if(nt)try{const{invoke:d}=await Y(async()=>{const{invoke:s}=await import("./core-DhEqZVGG.js");return{invoke:s}},[]);await d("save_custom_skin_file",{filename:l,content:o}),t(`Saved ${l} to skins folder`)}catch{}Ot(o,t),localStorage.setItem("melo-active-skin-id",l),H("melo:skin-changed",l),a.value=""}),document.addEventListener("dragover",n=>{var o;[...((o=n.dataTransfer)==null?void 0:o.types)||[]].includes("Files")&&n.preventDefault()}),document.addEventListener("drop",async n=>{var l;const o=[...((l=n.dataTransfer)==null?void 0:l.files)||[]].find(c=>c.name.endsWith(".html")||c.name.endsWith(".htm"));if(o){n.preventDefault();const c=await o.text();if(c.includes("<style")||c.includes("<html")||$e(c)){const d=o.name;if(nt)try{const{invoke:s}=await Y(async()=>{const{invoke:p}=await import("./core-DhEqZVGG.js");return{invoke:p}},[]);await s("save_custom_skin_file",{filename:d,content:c})}catch{}Ot(c,t),localStorage.setItem("melo-active-skin-id",d),H("melo:skin-changed",d)}}}),window.LumiSkin={applyCustomSkin:Ot,resetSkin:ue,applySkinChoice:$t,listInstalledSkins:Oe,openSkinsFolderOnDisk:He}}function va(t,a){let i,e,n,o,l,c,d,s=null,p,v,g,S,k,h,B,P,x,it,lt,L,m,y=[],M=0,J=!1,Z="off",mt=!1;function K(){if(!y.length)return null;if(Z==="one")return M;let r=M+1;if(J&&(r=Math.floor(Math.random()*y.length),r===M&&y.length>1&&(r=(r+1)%y.length)),r>=y.length)if(Z==="all")r=0;else return null;return r}window.__LUMI_QUEUE__=y,window.__LUMI_SET_QUEUE__=r=>{y=r,window.__LUMI_QUEUE__=r};function W(r){if(!isFinite(r))return"0:00";const E=Math.floor(r/60),V=Math.floor(r%60).toString().padStart(2,"0");return`${E}:${V}`}function j(){if(!p)return;const r=parseFloat(p.max)||100,E=parseFloat(p.value)||0,V=r>0?E/r*100:0;p.style.setProperty("--progress",V+"%")}function pt(){v&&v.style.setProperty("--vol",v.value+"%")}function wt(){h&&(h.classList.toggle("muted",t.muted),h.title=t.muted?"Unmute":"Mute")}function xt(r=!0){t.muted=!t.muted,wt(),r&&a(t.muted?"Muted":"Unmuted")}async function St(r){if(!r)return"";if(/^(https?|data|blob):/.test(r))return r;if(nt)try{const{convertFileSrc:E}=await Y(async()=>{const{convertFileSrc:V}=await import("./core-DhEqZVGG.js");return{convertFileSrc:V}},[]);return E(r)}catch{}return r}async function kt(r,E=!0,V){if(!y.length)return;r<0&&(r=y.length-1),r>=y.length&&(r=0),M=r;const D=y[r];if(D){if(B||G(),t.src=await St(D.path),t.load(),V&&V>0){const X=()=>{t.removeEventListener("loadedmetadata",X);try{t.currentTime=V}catch{}};t.addEventListener("loadedmetadata",X)}B&&(B.textContent=D.title||"Unknown Title"),P&&(P.textContent=D.artist||"Unknown Artist"),x&&(x.textContent=D.album||""),it&&(it.textContent=D.codec||"AUDIO"),lt&&(lt.textContent=D.specs||""),D.cover&&L?(L.src=D.cover,L.style.display="block",m&&(m.style.display="none")):(L&&(L.style.display="none"),m&&(m.style.display="grid")),p&&(p.max=String(D.duration||240),p.value="0",j()),S&&(S.textContent=W(D.duration)),g&&(g.textContent="0:00"),C(),qe(D.cover||null),document.querySelectorAll(".track-row").forEach((X,ht)=>{var Pt;X.classList.toggle("active",((Pt=y[ht])==null?void 0:Pt.id)===D.id)}),"mediaSession"in navigator&&(navigator.mediaSession.metadata=new MediaMetadata({title:D.title,artist:D.artist,album:D.album,artwork:D.cover?[{src:D.cover,sizes:"512x512",type:"image/jpeg"}]:[]}),navigator.mediaSession.setActionHandler("play",()=>f()),navigator.mediaSession.setActionHandler("pause",()=>b()),navigator.mediaSession.setActionHandler("previoustrack",()=>O()),navigator.mediaSession.setActionHandler("nexttrack",()=>T()),navigator.mediaSession.setActionHandler("seekto",X=>{X.seekTime&&(t.currentTime=X.seekTime)})),E&&f();try{const{cover:X,...ht}=D;localStorage.setItem("melo-current-track",JSON.stringify(ht))}catch{}window.dispatchEvent(new CustomEvent("lumi:trackChange",{detail:D})),H("melo:track-changed",D),H("melo:playback-state",{track:D,currentTime:t.currentTime||0,paused:t.paused})}}let _t=!1;async function zt(){try{await te(t).resume()}catch{}_t&&(_t=!1,t.play().then(()=>{e&&(e.style.display="none"),n&&(n.style.display="block")}).catch(()=>{}))}window.addEventListener("pointerdown",zt),window.addEventListener("keydown",zt),at("melo:pref-changed",r=>{r&&r.key==="replayGainGlobal"&&C(),r&&r.key==="showStopBtn"&&R(!!r.value)}),at("melo:request-playback-state",()=>{const r=y[M]||null;H("melo:playback-state",{track:r,currentTime:t.currentTime||0,paused:t.paused})}),at("melo:seek-playback",r=>{const E=Number(r);Number.isFinite(E)&&E>=0&&(t.currentTime=E)});let rt=null,ft=!1;const It=500;function ct(r,E,V){rt&&cancelAnimationFrame(rt);const D=t.volume,X=performance.now(),ht=Pt=>{const Dt=Math.min(1,(Pt-X)/E);t.volume=D+(r-D)*Dt,Dt<1?rt=requestAnimationFrame(ht):(rt=null,V==null||V())};rt=requestAnimationFrame(ht)}async function f(){try{await te(t).resume()}catch{}const r=localStorage.getItem("melo-pref-fadePause")!=="0",E=$();r&&ft&&(t.volume=0),t.play().then(()=>{_t=!1,e&&(e.style.display="none"),n&&(n.style.display="block"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="playing"),r&&ft?(ft=!1,ct(E,It)):t.volume=E}).catch(()=>{_t||(_t=!0,a("Click once inside player to begin audio playback"))})}function b(){localStorage.getItem("melo-pref-fadePause")!=="0"&&!t.paused?(ft=!0,ct(0,It,()=>t.pause())):(ft=!1,t.pause()),e&&(e.style.display="block"),n&&(n.style.display="none"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused");const E=y[M];if(E)try{localStorage.setItem("melo-resume-state",JSON.stringify({trackId:E.id,position:t.currentTime}))}catch{}}function _(){t.paused?f():b()}function I(){t.pause();try{t.currentTime=0}catch{}e&&(e.style.display="block"),n&&(n.style.display="none"),p&&(p.value="0",j()),g&&(g.textContent="0:00"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}function T(){if(!y.length)return;if(Z==="one"){t.currentTime=0,f();return}const r=K();if(r===null){b();return}kt(r)}function O(){if(!y.length)return;if(t.currentTime>3){t.currentTime=0;return}let r=M-1;J&&(r=Math.floor(Math.random()*y.length)),r<0&&(Z==="all"?r=y.length-1:r=0),kt(r)}function $(){var ht;const r=y[M];if(!v)return 1;const E=parseInt(v.value,10)/100,D=localStorage.getItem("melo-pref-replayGainGlobal")!=="0"&&(ht=r==null?void 0:r.replayGain)!=null?ht:0,X=Math.pow(10,D/20);return Math.min(1,Math.max(0,E*X))}function C(){!y[M]||!v||(t.volume=$())}function R(r=localStorage.getItem("melo-pref-showStopBtn")==="1"){const E=et("btnStop","stop");E&&E.style.setProperty("display",r?"inline-flex":"none","important")}function G(){if(i=et("btnPlay","play"),e=et("iconPlay","play-icon"),n=et("iconPause","pause-icon"),o=et("btnPrev","prev"),l=et("btnNext","next"),c=et("btnShuffle","shuffle"),d=et("btnRepeat","repeat"),s=et("btnStop","stop"),R(),p=et("seekBar","seek"),v=et("volBar","volume"),g=et("curTime","current-time"),S=et("durTime","duration"),k=et("volPct","volume-pct"),h=et("volIcon","volume-icon"),h&&(h.onclick=()=>xt()),wt(),B=et("trackTitle","title"),P=et("trackArtist","artist"),x=et("trackAlbum","album"),it=et("trackCodec","codec"),lt=et("trackSpecs","specs"),L=et("coverImg","cover"),m=et("coverFallback","cover-fallback"),i&&(i.onclick=_),s&&(s.onclick=I),o&&(o.onclick=O),l&&(l.onclick=T),c&&(c.onclick=()=>{J=!J,c.classList.toggle("active",J),a(J?"Shuffle on":"Shuffle off")}),d&&(d.onclick=()=>{Z=Z==="off"?"all":Z==="all"?"one":"off",d.classList.toggle("active",Z!=="off");const r={off:"Repeat off",all:"Repeat all",one:"Repeat one"};a(r[Z]),d.title=r[Z]}),p&&(p.oninput=()=>{mt=!0,g&&(g.textContent=W(parseFloat(p.value))),j()},p.onchange=()=>{t.currentTime=parseFloat(p.value),mt=!1}),v&&(v.oninput=()=>{pt(),k&&(k.textContent=v.value+"%"),C()}),j(),pt(),y[M]){const r=y[M];if(B&&(B.textContent=r.title||"Unknown Title"),P&&(P.textContent=r.artist||"Unknown Artist"),x&&(x.textContent=r.album||""),it&&(it.textContent=r.codec||"AUDIO"),lt&&(lt.textContent=r.specs||""),r.cover&&L?(L.src=r.cover,L.style.display="block",m&&(m.style.display="none")):(L&&(L.style.display="none"),m&&(m.style.display="grid")),p){const E=Math.floor(t.duration||r.duration||240);p.max=String(E),p.value=String(Math.floor(t.currentTime||0)),j()}if(S&&(S.textContent=W(t.duration||r.duration)),g&&(g.textContent=W(t.currentTime||0)),v&&k&&(k.textContent=v.value+"%",pt()),e&&n){const E=!t.paused;e.style.display=E?"none":"block",n.style.display=E?"block":"none"}c&&c.classList.toggle("active",J),d&&d.classList.toggle("active",Z!=="off")}}G(),document.addEventListener("wheel",r=>{const E=r.target;if(!(E!=null&&E.closest("#playerCard"))||!v)return;r.preventDefault();const V=r.deltaY<0?5:-5;v.value=String(Math.max(0,Math.min(100,Number(v.value)+V))),v.dispatchEvent(new Event("input"))},{passive:!1}),t.addEventListener("timeupdate",()=>{H("melo:playback-position",t.currentTime||0),!mt&&p&&g&&(p.value=String(Math.floor(t.currentTime)),g.textContent=W(t.currentTime),j()),F()});let A=null;function F(){A||(A=setTimeout(()=>{A=null;const r=y[M];if(!(!r||t.paused))try{localStorage.setItem("melo-resume-state",JSON.stringify({trackId:r.id,position:t.currentTime}))}catch{}},4e3))}t.addEventListener("loadedmetadata",()=>{var E;if(!p||!S)return;const r=Math.floor(t.duration||((E=y[M])==null?void 0:E.duration)||240);p.max=String(r),S.textContent=W(r),j()}),t.addEventListener("ended",()=>{T()}),window.addEventListener("keydown",r=>{r.target.tagName!=="INPUT"&&(r.code==="Space"&&(r.preventDefault(),_()),r.code==="ArrowRight"&&(t.currentTime+=5),r.code==="ArrowLeft"&&(t.currentTime-=5),(r.key==="m"||r.key==="M")&&xt(),(r.key==="s"||r.key==="S")&&c&&c.click(),(r.key==="r"||r.key==="R")&&d&&d.click(),r.code==="ArrowUp"&&v&&(v.value=String(Math.min(100,parseInt(v.value,10)+5)),v.dispatchEvent(new Event("input"))),r.code==="ArrowDown"&&v&&(v.value=String(Math.max(0,parseInt(v.value,10)-5)),v.dispatchEvent(new Event("input"))))}),at("melo:tray-action",r=>{r==="play_pause"?_():r==="next"?T():r==="prev"?O():r==="mute"&&xt()}),window.LumiPlayer={get queue(){return y},set queue(r){y=r,window.__LUMI_QUEUE__=r},get currentIndex(){return M},loadTrack:kt,play:f,pause:b,stop:I,next:T,prev:O,get audio(){return t},rebind:G},window.__LUMI_REBIND__=G,at("melo:play-tracks",r=>{if(!r||!Array.isArray(r.tracks)||!r.tracks.length)return;y=r.tracks,window.__LUMI_SET_QUEUE__(y);const E=Math.max(0,Math.min(r.index||0,y.length-1));kt(E,!0)})}const ce=new URLSearchParams(location.search).get("panel")||"main",Q=t=>String(t!=null?t:"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");function Le(t){const a=Number.isFinite(t)?Math.max(0,t):0;return`${Math.floor(a/60)}:${String(Math.floor(a%60)).padStart(2,"0")}`}function Me(t,a){const i=document.getElementById("trackList"),e=document.getElementById("libraryStats"),n=document.getElementById("searchInput"),o=document.getElementById("searchClear"),l=document.getElementById("libraryTabs"),c=document.getElementById("btn-scan"),d=document.getElementById("btn-clear-library"),s=document.getElementById("winPlaylistTracks"),p=document.getElementById("winPlaylistEmpty"),v=document.getElementById("playlistSelect"),g=document.getElementById("playlistSearchInput"),S=document.getElementById("playlistSearchClear"),k=document.getElementById("playlistSortSelect"),h=document.getElementById("btn-clear-playlist"),B=document.getElementById("btn-export-playlist"),P=document.getElementById("btn-new-playlist");let x=null,it=null,lt=!1,L=localStorage.getItem("melo-currentPlaylist")||"p1",m=[],y=null,M=null,J=!1,Z=[];const mt=new Map;let K="artists",W=null,j=null,pt=null,wt="",xt=null;const St=54,kt=52;let _t=0,zt=0,rt=0,ft=0,It=null;const ct=document.createElement("div");ct.className="ctx-menu",ct.style.display="none",ct.innerHTML='<button class="ctx-item danger" id="ctxRemoveLibraryTrack">Remove from Library</button>',document.body.appendChild(ct),document.addEventListener("click",u=>{u.target.closest("#ctxRemoveLibraryTrack")||(ct.style.display="none")}),ct.querySelector("#ctxRemoveLibraryTrack").onclick=async u=>{u.stopPropagation(),!(!x||!It)&&(await x("delete_tracks",{ids:[It]}),ct.style.display="none",It=null,H("melo:library-changed",{removed:1}))};function f(){return new Promise(u=>{const w=document.createElement("div");w.className="confirm-overlay",w.innerHTML=`<div class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="clearLibraryTitle">
        <div id="clearLibraryTitle" class="confirm-title">Clear Library?</div>
        <div class="confirm-message">All tracks will be removed from Library browsing. Your playlists and their tracks will remain unchanged.</div>
        <div class="confirm-actions"><button class="btn small" data-confirm="cancel">Cancel</button><button class="btn small danger-confirm" data-confirm="yes">Clear Library</button></div>
      </div>`,document.body.appendChild(w);const q=N=>{document.removeEventListener("keydown",U),w.remove(),u(N)};w.querySelector("[data-confirm='cancel']").onclick=()=>q(!1),w.querySelector("[data-confirm='yes']").onclick=()=>q(!0),w.onclick=N=>{N.target===w&&q(!1)};const U=N=>{N.key==="Escape"&&(document.removeEventListener("keydown",U),q(!1))};document.addEventListener("keydown",U)})}function b(u){const w=c==null?void 0:c.querySelector(".scan-label");w&&(w.textContent=u)}function _(){o==null||o.classList.toggle("show",!!(n!=null&&n.value))}function I(){S==null||S.classList.toggle("show",!!(g!=null&&g.value))}function T(){s==null||s.querySelectorAll("[data-pl-track]").forEach(u=>{u.classList.toggle("active",u.dataset.plTrack===xt)})}function O(u){xt=u,T()}function $(u){if(!u)return"";if(/^(data:|blob:|https?:)/i.test(u))return u;try{return it?it(u):""}catch{return""}}function C(u){return{...u,cover:$(u.cover),source:"scan"}}const R=[],G=new Set;let A=0;function F(u,w){!u||!x||G.has(u)||(G.add(u),R.push({id:u,element:w}),r())}function r(){for(;x&&A<2&&R.length;){const u=R.shift();A++,x("ensure_track_artwork",{id:u.id}).then(w=>{if(!w||!u.element.isConnected)return;const q=$(w),U=Z.find(N=>N.id===u.id);U&&(U.cover=q),u.element.style.backgroundImage=`url("${q.replace(/"/g,"%22")}")`,u.element.textContent=""}).catch(()=>{}).finally(()=>{A--,G.delete(u.id),r()})}}function E(u){const w=[...u.querySelectorAll("[data-artwork-id]")];if(!("IntersectionObserver"in window)){w.forEach(U=>F(U.dataset.artworkId,U));return}const q=new IntersectionObserver(U=>{U.forEach(N=>{if(!N.isIntersecting)return;const z=N.target;q.unobserve(z),F(z.dataset.artworkId,z)})},{root:u,rootMargin:"120px"});w.forEach(U=>q.observe(U))}async function V(){if(lt)return;if(!nt){lt=!0,D();return}const u=await Y(()=>import("./core-DhEqZVGG.js"),[]);x=u.invoke,it=u.convertFileSrc,lt=!0,await Promise.all([X(),Bt()]),await gt(!0),await vt(!0)}function D(){i&&(i.innerHTML='<div style="padding:30px;text-align:center;color:var(--text-muted)">The persistent Library is available in the Tauri desktop build.</div>')}async function X(){if(!(!x||!e))try{const u=await x("library_stats");e.textContent=`${u.tracks} tracks • ${u.artists} artists • ${u.albums} albums`}catch{}}function ht(){W=j=pt=null,i&&(i.scrollTop=0)}function Pt(){return K==="artists"?W?"tracks":"groups":K==="albums"?j?"tracks":"groups":pt?"tracks":"groups"}function Dt(){return K}function Xe(){return K==="artists"&&W?j?`${W} › ${j}`:W:K==="albums"&&j?j:K==="genres"&&pt?pt:""}async function Ze(u,w){if(!x)return{items:[],total:0,limit:w,offset:u};if(Pt()==="groups")return x("library_groups",{kind:Dt(),search:wt||null,artist:K==="artists"?W:null,limit:w,offset:u});const q=await x("library_tracks",{search:wt||null,artist:W,album:j,genre:pt,sort:"title-asc",limit:w,offset:u});return q.items=q.items.map(C),Z=q.items,q}async function Ke(u){const w=mt.get(u);if(w)return w;if(!x)return[];const q=await x("library_groups",{kind:"albums",search:null,artist:u,limit:500,offset:0});return mt.set(u,q.items),q.items}async function gt(u=!1){if(!i||!x)return;u&&(i.scrollTop=0),i.style.display="block",i.style.position="relative",i.style.overflowY="auto";const w=Math.max(300,i.clientHeight||420),q=K==="artists"&&!!W,U=Xe(),N=q?84:U?38:0,z=Math.ceil(w/St),yt=Math.max(0,i.scrollTop-N),tt=Math.max(0,Math.floor(yt/St)-8),dt=Math.max(40,z+16),aa=++_t;try{const ye=q&&W?Ke(W):Promise.resolve(null),[Zt,oe]=await Promise.all([Ze(tt,dt),ye]);if(aa!==_t)return;const ia=Zt.total*St+N,na=Zt.items.map((Rt,Vt)=>{const Ft=Zt.offset+Vt,Kt=N+Ft*St;if(Pt()==="groups"){const Nt=Rt,be=$(Nt.cover),we=`lib-avatar ${Dt()==="albums"?"lib-avatar-album":""}`,oa=Dt()==="albums"?"💿":Q((Nt.name[0]||"?").toUpperCase()),sa=be?`<div class="${we}" style="background-image:url('${Q(be)}')"></div>`:`<div class="${we}" data-artwork-id="${Q(Nt.artworkTrackId||"")}">${oa}</div>`;return`<div class="lib-item virtual-row" data-group-index="${Vt}" style="position:absolute;left:0;right:0;top:${Kt}px;height:${St}px">${sa}<div style="flex:1;min-width:0"><div class="t-title">${Q(Nt.name)}</div><div class="t-artist">${Q(Nt.subtitle||`${Nt.count} tracks`)}</div></div><span class="chev-r">›</span></div>`}const At=Rt;return`<div class="track-row virtual-row" data-track-id="${Q(At.id)}" data-page-index="${Vt}" style="position:absolute;left:0;right:0;top:${Kt}px;height:${St}px">
          <span class="num">${Ft+1}</span>
          ${At.cover?`<div class="track-cover-mini" style="background-image:url('${Q(At.cover)}');background-size:cover;background-position:center"></div>`:`<div class="track-cover-mini cover-default" data-artwork-id="${Q(At.id)}">♪</div>`}
          <div style="flex:1;min-width:0"><div class="t-title">${Q(At.title)}</div><div class="t-artist">${Q(At.artist)} • ${Q(At.album)}</div></div>
          <span class="t-dur">${Le(At.duration)}</span>
          <button class="btn small ghost" data-add-track="${Q(At.id)}" title="Add to current playlist">+</button>
        </div>`}).join(""),la=q&&oe?`<div class="artist-detail-header" style="position:sticky;top:0;height:${N}px;z-index:4;background:var(--card)">
            <div class="lib-crumb" style="height:38px"><button class="btn small" id="virtualBack">‹ Artists</button><b>${Q(W)}</b></div>
            <div class="chip-row artist-album-chips custom-scrollbar" style="height:46px;padding-top:6px;padding-bottom:6px">
              <button class="chip ${j===null?"active":""}" data-artist-album="all">All Tracks</button>
              ${oe.map((Rt,Vt)=>{const Ft=$(Rt.cover),Kt=Ft?`<span class="chip-thumb" style="background-image:url('${Q(Ft)}')"></span>`:`<span class="chip-thumb cover-default" data-artwork-id="${Q(Rt.artworkTrackId||"")}">♪</span>`;return`<button class="chip ${j===Rt.name?"active":""}" data-artist-album-index="${Vt}">${Kt}${Q(Rt.name)}</button>`}).join("")}
            </div>
          </div>`:U?`<div class="lib-crumb virtual-crumb" style="position:sticky;top:0;height:${N}px;z-index:3;background:var(--card)"><button class="btn small" id="virtualBack">‹ Back</button><b>${Q(U)}</b></div>`:"";i.innerHTML=`<div class="virtual-list-space" style="position:relative;height:${Math.max(ia,w)}px">${la}${na}</div>`,Qe(Zt.items,oe||[]),E(i)}catch{i.innerHTML='<div style="padding:24px;text-align:center;color:var(--text-muted)">Could not read the Library database.</div>'}}function Qe(u,w=[]){var q,U;i&&(i.querySelectorAll("[data-group-index]").forEach(N=>{N.onclick=()=>{const z=u[Number(N.dataset.groupIndex||0)],yt=(z==null?void 0:z.name)||"",tt=(z==null?void 0:z.key)||yt;if(K==="artists"&&!W)W=yt;else if(K==="artists"&&W||K==="albums"){const dt=tt.split("\0");K==="albums"&&(W=dt[0]||null),j=dt[1]||yt}else K==="genres"&&(pt=yt);gt(!0)}}),i.querySelectorAll("[data-add-track]").forEach(N=>{N.onclick=async z=>{z.stopPropagation(),!(!x||!N.dataset.addTrack)&&(await x("add_tracks_to_playlist",{playlistId:L,trackIds:[N.dataset.addTrack]}),H("melo:playlist-changed",{playlistId:L}))}}),i.querySelectorAll("[data-track-id]").forEach(N=>{N.onclick=async z=>{if(z.target.closest("[data-add-track]"))return;const yt=Number(N.dataset.pageIndex||0),tt=u.filter(dt=>"path"in dt).map(C);x&&tt.length&&(await x("replace_playlist_tracks",{playlistId:L,trackIds:tt.map(dt=>dt.id)}),H("melo:playlist-changed",{playlistId:L})),H("melo:play-tracks",{tracks:tt,index:yt})},N.oncontextmenu=z=>{z.preventDefault(),z.stopPropagation(),It=N.dataset.trackId||null,ct.style.display="block";const yt=ct.getBoundingClientRect();ct.style.left=`${Math.max(6,Math.min(z.clientX,window.innerWidth-yt.width-6))}px`,ct.style.top=`${Math.max(6,Math.min(z.clientY,window.innerHeight-yt.height-6))}px`}}),(q=i.querySelector("#virtualBack"))==null||q.addEventListener("click",()=>{K==="artists"&&W?(W=null,j=null):j?j=null:W?W=null:pt=null,gt(!0)}),(U=i.querySelector("[data-artist-album='all']"))==null||U.addEventListener("click",()=>{j=null,gt(!0)}),i.querySelectorAll("[data-artist-album-index]").forEach(N=>{N.onclick=()=>{const z=w[Number(N.dataset.artistAlbumIndex||0)];j=(z==null?void 0:z.name)||null,gt(!0)}}))}async function Bt(){var u;x&&(m=await x("list_playlists"),m.some(w=>w.id===L)||(L=((u=m[0])==null?void 0:u.id)||"p1"),localStorage.setItem("melo-currentPlaylist",L),v&&(v.innerHTML=m.map(w=>`<option value="${Q(w.id)}" ${w.id===L?"selected":""}>${Q(w.name)} (${w.trackCount})</option>`).join("")))}async function vt(u=!1){if(!s||!x)return;u&&(s.scrollTop=0),s.style.display="block",s.style.position="relative",s.style.overflowY="auto";const w=Math.max(260,s.clientHeight||420),q=Math.max(0,Math.floor(s.scrollTop/kt)-8),U=Math.max(40,Math.ceil(w/kt)+16),N=++zt,z=await x("playlist_tracks",{playlistId:L,search:(g==null?void 0:g.value)||null,sort:(k==null?void 0:k.value)||"default",limit:U,offset:q});if(N!==zt)return;if(z.items=z.items.map(C),Z=z.items,p&&(p.style.display=z.total?"none":"block"),s.style.display=z.total?"block":"none",!z.total){s.innerHTML="";return}const yt=z.items.map((tt,dt)=>`<div class="track-row virtual-row ${tt.id===xt?"active":""}" data-pl-track="${Q(tt.id)}" data-page-index="${dt}" style="position:absolute;left:0;right:0;top:${(z.offset+dt)*kt}px;height:${kt}px"><span class="num">${z.offset+dt+1}</span>${tt.cover?`<div class="track-cover-mini" style="background-image:url('${Q(tt.cover)}');background-size:cover;background-position:center"></div>`:`<div class="track-cover-mini cover-default" data-artwork-id="${Q(tt.id)}">♪</div>`}<div style="flex:1;min-width:0"><div class="t-title">${Q(tt.title)}</div><div class="t-artist">${Q(tt.artist)} • ${Q(tt.album)}</div></div><span class="t-dur">${Le(tt.duration)}</span><button class="btn small ghost" data-remove-track="${Q(tt.id)}">×</button></div>`).join("");s.innerHTML=`<div style="position:relative;height:${Math.max(w,z.total*kt)}px">${yt}</div>`,E(s),s.querySelectorAll("[data-pl-track]").forEach(tt=>{tt.onclick=dt=>{dt.target.closest("[data-remove-track]")||H("melo:play-tracks",{tracks:z.items,index:Number(tt.dataset.pageIndex||0)})}}),s.querySelectorAll("[data-remove-track]").forEach(tt=>{tt.onclick=async dt=>{dt.stopPropagation(),await x("remove_track_from_playlist",{playlistId:L,trackId:tt.dataset.removeTrack}),H("melo:playlist-changed",{playlistId:L})}})}async function ge(u,w){return x?x(u,w):null}async function he(u,w="replace"){if(await V(),!x||!u.length)return[];const U=(await x("import_audio_files",{paths:u,playlistId:w==="none"?null:L,replacePlaylist:w==="replace"})).map(C);return await Promise.all([X(),Bt(),gt(),vt()]),H("melo:library-changed",{imported:U.length}),U}async function le(u,w=!1){if(await V(),!x)return null;if(y)return y;const q=await x("start_library_scan",{path:u});return y=q.scanId,M=q.scanId,J=w,c&&b("Cancel Scan"),y}async function ta(){if(!nt)return;if(y&&x){await x("cancel_library_scan",{scanId:y});return}const{open:u}=await Y(async()=>{const{open:q}=await import("./index-CS3Qnt9j.js");return{open:q}},__vite__mapDeps([5,1])),w=await u({directory:!0,multiple:!1});w&&await le(w)}async function ea(u){if(await V(),!x)return null;const w=await x("get_track_by_id",{id:u});return w?C(w):null}l==null||l.querySelectorAll("[data-libtab]").forEach(u=>{u.onclick=()=>{l.querySelectorAll("[data-libtab]").forEach(w=>w.classList.remove("active")),u.classList.add("active"),K=u.dataset.libtab||"artists",ht(),gt(!0)}}),n==null||n.addEventListener("input",()=>{_(),wt=n.value.trim(),window.clearTimeout(rt),rt=window.setTimeout(()=>gt(!0),180)}),o==null||o.addEventListener("click",()=>{n&&(n.value="",n.focus(),_(),wt="",window.clearTimeout(rt),gt(!0))}),i==null||i.addEventListener("scroll",()=>{window.clearTimeout(rt),rt=window.setTimeout(()=>gt(),60)}),s==null||s.addEventListener("scroll",()=>{window.clearTimeout(ft),ft=window.setTimeout(()=>vt(),60)}),g==null||g.addEventListener("input",()=>{I(),window.clearTimeout(ft),ft=window.setTimeout(()=>vt(!0),180)}),S==null||S.addEventListener("click",()=>{g&&(g.value="",g.focus(),I(),window.clearTimeout(ft),vt(!0))}),k==null||k.addEventListener("change",()=>vt(!0)),v==null||v.addEventListener("change",()=>{L=v.value,localStorage.setItem("melo-currentPlaylist",L),vt(!0)}),c==null||c.addEventListener("click",ta),d==null||d.addEventListener("click",async()=>{if(x){if(y){alert("Cancel the active scan before clearing the Library database.");return}await f()&&(await x("clear_library_database"),Z=[],mt.clear(),await Promise.all([X(),Bt(),gt(!0),vt(!0)]),H("melo:library-changed",{cleared:!0}))}}),h==null||h.addEventListener("click",async()=>{await ge("clear_playlist",{playlistId:L}),await Promise.all([Bt(),vt(!0)]),H("melo:playlist-changed",{playlistId:L})}),P==null||P.addEventListener("click",async()=>{var q;const u=(q=prompt("New playlist name:"))==null?void 0:q.trim();if(!u)return;const w=await ge("create_playlist",{name:u});w&&(L=w.id),await Promise.all([Bt(),vt(!0)])}),B==null||B.addEventListener("click",async()=>{var N;if(!x)return;const u=[];let w=0;for(;;){const z=await x("playlist_tracks",{playlistId:L,search:null,sort:"default",limit:500,offset:w});if(u.push(...z.items),w+=z.items.length,w>=z.total||!z.items.length)break}if(!u.length)return;const q=`#EXTM3U
`+u.map(z=>`#EXTINF:${Math.floor(z.duration)},${z.artist} - ${z.title}
${z.path}`).join(`
`),U=document.createElement("a");U.href=URL.createObjectURL(new Blob([q],{type:"audio/x-mpegurl"})),U.download=`${((N=m.find(z=>z.id===L))==null?void 0:N.name)||"playlist"}.m3u`,U.click(),setTimeout(()=>URL.revokeObjectURL(U.href),1e3)}),nt&&Y(async()=>{const{getCurrentWebviewWindow:u}=await import("./webviewWindow-mjQkSB26.js");return{getCurrentWebviewWindow:u}},__vite__mapDeps([6,7,1,0,8])).then(({getCurrentWebviewWindow:u})=>{u().onDragDropEvent(async w=>{if(w.payload.type!=="drop")return;const q=w.payload.paths||[];if(!q.length)return;const U=await he(q,ce==="playlist"?"append":"replace");if(U.length)ce!=="playlist"&&H("melo:play-tracks",{tracks:U,index:0});else for(const N of q)try{await le(N,ce!=="playlist")}catch{}})}).catch(()=>{}),at("melo:scan-progress",async u=>{if(u){if(u.scanId&&(y=u.scanId),c&&!u.finished&&b(`Cancel ${u.done||0}/${u.total||"…"}`),c){const w=u.total?Math.max(0,Math.min(100,Number(u.done||0)/Number(u.total)*100)):0;c.style.setProperty("--scan-progress",`${w}%`),c.classList.toggle("scanning",!u.finished)}if(u.finished){if(u.scanId===M&&J&&!u.cancelled&&x){await x("replace_playlist_from_scan",{playlistId:L,scanId:u.scanId});const U=(await x("playlist_tracks",{playlistId:L,search:null,sort:"default",limit:100,offset:0})).items.map(C);U.length&&H("melo:play-tracks",{tracks:U,index:0}),H("melo:playlist-changed",{playlistId:L})}y=null,M=null,J=!1,c&&(b("Scan"),c.classList.remove("scanning"),c.style.setProperty("--scan-progress","0%")),await Promise.all([X(),Bt(),gt(),vt()])}}});let ve=0;at("melo:library-changed",()=>{mt.clear(),window.clearTimeout(ve),ve=window.setTimeout(()=>{X(),gt(),vt()},500)}),at("melo:playlist-changed",()=>{Bt(),vt()}),at("melo:track-changed",u=>O((u==null?void 0:u.id)||null)),at("melo:playback-state",u=>{var w;return O(((w=u==null?void 0:u.track)==null?void 0:w.id)||null)});try{const u=JSON.parse(localStorage.getItem("melo-current-track")||"null");u!=null&&u.id&&O(u.id)}catch{}H("melo:request-playback-state"),setTimeout(()=>H("melo:request-playback-state"),250),window.LumiLibrary={get tracks(){return Z},get playlists(){return m},scanFolder:le,importPaths:he,getTrack:ea,render:()=>gt(),addTracks:()=>{},addToCurrentPlaylist:async u=>{!x||!u.length||(await x("add_tracks_to_playlist",{playlistId:L,trackIds:u.map(w=>w.id)}),H("melo:playlist-changed",{playlistId:L}))},currentPlaylistName:()=>{var u;return((u=m.find(w=>w.id===L))==null?void 0:u.name)||"Playlist"}},V().catch(()=>a("Could not initialize the Library database"))}const Jt={flat:[0,0,0,0,0,0,0,0,0,0],pop:[-1,2,4,4,2,-1,-1,2,3,3],rock:[4,3,2,-1,-2,-2,1,3,4,4],bass:[6,5,4,2,1,0,-1,-1,-2,-3],treble:[-3,-2,-1,0,1,2,3,5,6,6],dance:[5,4,2,0,-1,-1,2,4,5,3],jazz:[2,1,2,3,2,0,1,2,3,2],classical:[3,2,1,0,0,0,-1,2,3,4],vocal:[-2,-1,0,2,4,4,3,1,0,-1],acoustic:[3,2,1,1,2,2,3,3,2,1],hiphop:[5,4,1,2,-1,-1,1,-1,2,3],metal:[4,2,-1,-2,-1,1,3,4,5,4]};function de(t){for(const[a,i]of Object.entries(Jt))if(i.every((e,n)=>e===t[n]))return a;return"custom"}function Ee(t,a,i={}){const e=!!i.remote,n=document.getElementById("eqEnable"),o=document.getElementById("eqPreset"),l=document.getElementById("btnEqReset"),c=document.getElementById("eqBands"),d=document.getElementById("eqCanvas"),s=d?d.getContext("2d"):null;let p=null,v=[],g=[],S=new Array(Yt.length).fill(0);try{const m=JSON.parse(localStorage.getItem("melo-eq-gains")||"null");Array.isArray(m)&&m.length===Yt.length&&(S=m.map(y=>typeof y=="number"?Math.max(-12,Math.min(12,y)):0))}catch{}let k=localStorage.getItem("melo-eq-preset")||de(S),h=localStorage.getItem("melo-eq-enabled")!=="0";function B(){if(!p)try{const m=te(t);p=m.ctx,v=m.filters,v.forEach((y,M)=>{y.gain.value=h?S[M]:0})}catch{}}function P(m,y){B(),v[m]&&h&&(v[m].gain.value=y)}function x(m){B(),S=[...m],h&&m.forEach((y,M)=>{v[M]&&(v[M].gain.value=y)}),L()}function it(m){B(),h=m,m?S.forEach((y,M)=>{v[M]&&(v[M].gain.value=y)}):v.forEach(y=>{y.gain.value=0}),L()}e||t&&t.addEventListener("play",()=>{B(),(p==null?void 0:p.state)==="suspended"&&p.resume().catch(()=>{})}),at("melo:eq",m=>{m&&(m.type==="gain"?(e||P(m.idx,m.val),S[m.idx]=m.val,g[m.idx]&&(g[m.idx].value=String(m.val),lt(g[m.idx])),o&&(o.value=de(S)),L()):m.type==="gains"?(e||x(m.values),S=[...m.values],g.length&&g.forEach((y,M)=>{y.value=String(S[M]),lt(y)}),o&&m.preset&&(o.value=m.preset),L()):m.type==="enable"&&(h=!!m.on,e||it(h),n&&(n.checked=h),L()))});function lt(m){var J;const y=parseInt(m.value),M=(J=m.parentElement)==null?void 0:J.querySelector(".val");M&&(M.textContent=(y>0?"+":"")+y+"dB")}function L(){if(!d||!s)return;const m=window.devicePixelRatio||1,y=d.clientWidth*m,M=d.clientHeight*m;if(y<=0||M<=0)return;d.width=y,d.height=M,s.clearRect(0,0,y,M);const J=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#2a7bd6",Z=S;if(!h){s.strokeStyle="rgba(100,120,150,0.25)",s.lineWidth=2*m,s.beginPath(),s.moveTo(0,M/2),s.lineTo(y,M/2),s.stroke();return}s.strokeStyle=J,s.lineWidth=2.5*m,s.lineJoin="round",s.beginPath(),Z.forEach((mt,K)=>{const W=K/(Z.length-1)*y,j=M/2-mt/12*(M/2-10*m);if(K===0)s.moveTo(W,j);else{const pt=(K-1)/(Z.length-1)*y,wt=M/2-Z[K-1]/12*(M/2-10*m);s.quadraticCurveTo((pt+W)/2,wt,W,j)}}),s.stroke(),Z.forEach((mt,K)=>{const W=K/(Z.length-1)*y,j=M/2-mt/12*(M/2-10*m);s.fillStyle=J,s.beginPath(),s.arc(W,j,4*m,0,Math.PI*2),s.fill(),s.fillStyle="white",s.beginPath(),s.arc(W,j,2*m,0,Math.PI*2),s.fill()}),s.strokeStyle="rgba(100,120,150,0.3)",s.lineWidth=1*m,s.setLineDash([4*m,4*m]),s.beginPath(),s.moveTo(0,M/2),s.lineTo(y,M/2),s.stroke(),s.setLineDash([])}c&&(c.innerHTML="",Yt.forEach((m,y)=>{const M=S[y]||0,J=document.createElement("div");J.className="eq-band",J.innerHTML=`
        <input type="range" min="-12" max="12" value="${M}" step="1" data-idx="${y}" orient="vertical" />
        <label>${m>=1e3?m/1e3+"k":m}</label>
        <span style="font-size:10px;color:var(--text-muted);min-height:12px;" class="val">${(M>0?"+":"")+M+"dB"}</span>
      `,c.appendChild(J)}),g=Array.from(c.querySelectorAll("input")),g.forEach(m=>{m.addEventListener("input",()=>{const y=parseInt(m.dataset.idx),M=parseInt(m.value);lt(m),S[y]=M,L();const J=de(S);o&&(o.value=J),localStorage.setItem("melo-eq-gains",JSON.stringify(S)),localStorage.setItem("melo-eq-preset",J),e||P(y,M),H("melo:eq",{type:"gain",idx:y,val:M,values:S})})})),o&&(o.value=k,o.addEventListener("change",()=>{const m=Jt[o.value]||Jt.flat;g.length&&g.forEach((y,M)=>{y.value=String(m[M]),lt(y)}),S=[...m],L(),localStorage.setItem("melo-eq-gains",JSON.stringify(S)),localStorage.setItem("melo-eq-preset",o.value),e||x(m),H("melo:eq",{type:"gains",values:m,preset:o.value}),a(`Preset: ${o.options[o.selectedIndex].text}`)})),l&&l.addEventListener("click",()=>{const m=Jt.flat;g.length&&g.forEach((y,M)=>{y.value="0",lt(y)}),S=[...m],o&&(o.value="flat"),localStorage.setItem("melo-eq-gains",JSON.stringify(S)),localStorage.setItem("melo-eq-preset","flat"),e||x(m),H("melo:eq",{type:"gains",values:m,preset:"flat"}),L(),a("Equalizer reset to Flat (0dB)")}),n&&(n.checked=h,n.addEventListener("change",()=>{h=n.checked,localStorage.setItem("melo-eq-enabled",h?"1":"0"),e||it(h),H("melo:eq",{type:"enable",on:h}),L(),a(h?"Equalizer On":"Equalizer off — Flat")})),d&&new ResizeObserver(()=>L()).observe(d),L(),window.LumiEqualizer={presets:Jt,frequencies:Yt,displayGains:S,reset:()=>l==null?void 0:l.click()}}const Gt=[{id:"bars",label:"Classic Bars"},{id:"thin",label:"Thin Bars"},{id:"line",label:"Spectrum Line"},{id:"mirror",label:"Mirror Bars"},{id:"wave",label:"Oscilloscope"},{id:"spectrumWave",label:"Spectrum Wave"},{id:"blocks",label:"Block Equalizer"}];function _e(){return document.getElementById("vizBars")||document.querySelector('[data-melo="visualizer"]')}function ya(t){let a=_e();if(!a)return;let i=h(a),e=i.getContext("2d"),n=null,o=null,l=null,c=null,d=null,s=!1,p=localStorage.getItem("melo-viz-mode")||"bars";Gt.some(f=>f.id===p)||(p="bars");let v=0,g=[],S=.45,k=null;function h(f){let b=f.querySelector("canvas");return b||(f.innerHTML="",b=document.createElement("canvas"),f.appendChild(b)),b}function B(){if(!(o&&l))try{const f=te(t);n=f.ctx,o=f.analyser,l=new Uint8Array(o.frequencyBinCount),c=new Uint8Array(o.fftSize)}catch{s=!0}}function P(f){const b=l.length,_=((n==null?void 0:n.sampleRate)||44100)/2,I=45,T=Math.min(15e3,_*.95),O=Math.log(I),$=Math.log(T),C=[];for(let R=0;R<f;R++){const G=Math.exp(O+($-O)*R/f),A=Math.exp(O+($-O)*(R+1)/f);let F=Math.floor(G/_*b),r=Math.max(F+1,Math.ceil(A/_*b));F<0&&(F=0),r>b&&(r=b);let E=0;for(let V=F;V<r;V++)E+=l[V];C.push(E/(r-F)/255)}return C}function x(f){const b=performance.now()/1e3,_=Math.pow(Math.abs(Math.sin(b*2.2)),2.5),I=[];for(let T=0;T<f;T++){let O=.42+.26*Math.sin(b*1.35+T*.62)+.2*Math.sin(b*2.9+T*1.31)+Math.random()*.07;O*=.55+.5*_,I.push(Math.max(.04,Math.min(1,O)))}return I}function it(f){const b=performance.now()/1e3,_=.5+.5*Math.pow(Math.abs(Math.sin(b*1.9)),2);for(let I=0;I<f.length;I++){const T=I/f.length;f[I]=128+66*_*(Math.sin(T*Math.PI*6+b*7)*.6+Math.sin(T*Math.PI*13-b*11)*.4)}}function lt(f){let b;if(s||!o||!l)b=x(f);else if(o.getByteFrequencyData(l),b=P(f),!b.some(T=>T>.01)&&!t.paused)b=x(f);else for(let T=0;T<f;T++)b[T]*=1+1.7*(T/Math.max(1,f-1));let _=0;for(const I of b)I>_&&(_=I);_>S?S=_:S=Math.max(.35,S*.985),g.length!==f&&(g=new Array(f).fill(0));for(let I=0;I<f;I++){const T=Math.min(1,b[I]/S),O=T>g[I]?.55:.16;g[I]+=(T-g[I])*O}return g}function L(f,b){return getComputedStyle(document.documentElement).getPropertyValue(f).trim()||b}function m(){return i.width/Math.max(1,i.clientWidth)||1}function y(f,b,_,I,T){if(T=Math.min(T,_/2,I/2),e.roundRect){e.roundRect(f,b,_,I,T);return}e.rect(f,b,_,I)}function M(){const f=window.devicePixelRatio||1,b=i.clientWidth||(a==null?void 0:a.clientWidth)||200,_=i.clientHeight||(a==null?void 0:a.clientHeight)||56;b>0&&_>0&&(i.width=Math.round(b*f),i.height=Math.round(_*f))}new ResizeObserver(M).observe(i),M();function J(f,b,_,I){const T=m(),O=L("--visualizer","#38bdf8"),$=L("--accent","#0284c7"),C=f.length,R=b/C,G=Math.max(1.2*T,R*(1-I));for(let A=0;A<C;A++){const F=f[A],r=Math.max(2*T,F*(_-4*T)),E=A*R+(R-G)/2,V=_-r-1*T,D=e.createLinearGradient(0,V,0,_);D.addColorStop(0,$),D.addColorStop(1,O),e.fillStyle=D,e.beginPath(),y(E,V,G,r,Math.min(G/2,3.5*T)),e.fill()}}function Z(f,b,_){const I=m(),T=L("--visualizer","#38bdf8"),O=L("--accent","#0284c7"),$=f.length,C=b/$,R=_/2,G=Math.max(1.5*I,C*.62);for(let A=0;A<$;A++){const F=Math.max(1.5*I,f[A]*(_/2-3*I)),r=A*C+(C-G)/2,E=e.createLinearGradient(0,R-F,0,R+F);E.addColorStop(0,O),E.addColorStop(.5,T),E.addColorStop(1,O),e.fillStyle=E,e.beginPath(),y(r,R-F,G,F*2,Math.min(G/2,3*I)),e.fill()}}function mt(f,b,_){const I=m(),T=L("--visualizer","#38bdf8"),O=L("--accent","#0284c7"),$=f.length,C=[],R=[];for(let A=0;A<$;A++)C.push((A+.5)/$*b),R.push(_-2*I-f[A]*(_-8*I));e.beginPath(),e.moveTo(C[0],_),e.lineTo(C[0],R[0]);for(let A=1;A<$;A++){const F=(C[A-1]+C[A])/2;e.quadraticCurveTo(C[A-1],R[A-1],F,(R[A-1]+R[A])/2)}e.lineTo(C[$-1],R[$-1]),e.lineTo(C[$-1],_),e.closePath();const G=e.createLinearGradient(0,0,0,_);G.addColorStop(0,T),G.addColorStop(1,"transparent"),e.globalAlpha=.18,e.fillStyle=G,e.fill(),e.globalAlpha=1,e.beginPath(),e.moveTo(C[0],R[0]);for(let A=1;A<$;A++){const F=(C[A-1]+C[A])/2;e.quadraticCurveTo(C[A-1],R[A-1],F,(R[A-1]+R[A])/2)}e.lineTo(C[$-1],R[$-1]),e.strokeStyle=O,e.lineWidth=2*I,e.lineJoin="round",e.stroke()}function K(f,b,_){const I=m(),T=L("--visualizer","#38bdf8"),O=L("--accent","#0284c7"),$=_/2,C=f.length,R=f.map((F,r)=>{const E=r/Math.max(1,C-1),V=Math.pow(Math.sin(Math.PI*E),.28);return Math.max(.7*I,F*V*(_*.46))}),G=F=>{e.beginPath();for(let r=0;r<C;r++){const E=r/Math.max(1,C-1)*b,V=$+(F?-R[r]:R[r]);if(r===0)e.moveTo(E,V);else{const D=(r-1)/Math.max(1,C-1)*b,X=$+(F?-R[r-1]:R[r-1]);e.quadraticCurveTo(D,X,(D+E)/2,(X+V)/2)}}};G(!0);for(let F=C-1;F>=0;F--){const r=F/Math.max(1,C-1)*b;e.lineTo(r,$+R[F])}e.closePath();const A=e.createLinearGradient(0,0,0,_);A.addColorStop(0,O),A.addColorStop(.5,T),A.addColorStop(1,O),e.fillStyle=A,e.globalAlpha=.3,e.fill(),e.globalAlpha=.18,e.shadowColor=T,e.shadowBlur=8*I,G(!0),e.strokeStyle=T,e.lineWidth=4*I,e.stroke(),G(!1),e.stroke(),e.shadowBlur=0,e.globalAlpha=1,G(!0),e.strokeStyle=O,e.lineWidth=1.2*I,e.stroke(),G(!1),e.stroke(),e.beginPath(),e.moveTo(0,$),e.lineTo(b,$),e.strokeStyle=T,e.globalAlpha=.45,e.lineWidth=.8*I,e.stroke(),e.globalAlpha=1}function W(f,b,_){const I=m(),T=L("--visualizer","#38bdf8"),O=L("--accent","#0284c7"),$=f.length,C=8,R=Math.max(1*I,b*.0035),G=Math.max(1*I,_*.025),A=Math.max(1,(b-R*($-1))/$),F=Math.max(1,(_-G*(C-1))/C),r=e.createLinearGradient(0,0,0,_);r.addColorStop(0,O),r.addColorStop(1,T),e.fillStyle=r;for(let E=0;E<$;E++){const V=Math.max(1,Math.min(C,Math.round(f[E]*C))),D=E*(A+R);for(let X=0;X<V;X++){const ht=_-(X+1)*F-X*G;e.globalAlpha=.58+.42*((X+1)/C),e.fillRect(D,ht,A,F)}}e.globalAlpha=1}function j(){const f=i.width,b=i.height,_=m(),I=L("--accent","#0284c7");let T;s||!o||!c?(d||(d=new Uint8Array(1024)),it(d),T=d):(o.getByteTimeDomainData(c),T=c);const O=()=>{e.beginPath();for(let $=0;$<=f;$+=2){const C=Math.min(T.length-1,Math.floor($/f*T.length)),R=T[C]/255*b;$===0?e.moveTo($,R):e.lineTo($,R)}};O(),e.strokeStyle=I,e.globalAlpha=.16,e.lineWidth=6*_,e.lineJoin="round",e.stroke(),O(),e.globalAlpha=1,e.lineWidth=1.8*_,e.stroke()}function pt(){const f=i.width,b=i.height;if(!f||!b)return;if(e.clearRect(0,0,f,b),p==="wave"){j();return}const _=p==="bars"?16:p==="thin"?56:p==="line"?64:p==="spectrumWave"?72:p==="blocks"?22:24,I=parseInt((a==null?void 0:a.dataset.bars)||"",10),T=Number.isFinite(I)&&I>0?I:_,O=lt(T);p==="bars"?J(O,f,b,.34):p==="thin"?J(O,f,b,.32):p==="line"?mt(O,f,b):p==="mirror"?Z(O,f,b):p==="spectrumWave"?K(O,f,b):p==="blocks"&&W(O,f,b)}function wt(){v=requestAnimationFrame(wt),pt()}function xt(){v||wt()}function St(f,b=!1){p=f,g=[],localStorage.setItem("melo-viz-mode",f)}function kt(){return k||(k=document.createElement("div"),k.className="viz-menu",k.style.display="none",document.body.appendChild(k),k)}function _t(){const f=kt();f.innerHTML='<div class="viz-menu-label">Visualizer type</div>'+Gt.map(b=>`<button class="viz-menu-item ${b.id===p?"active":""}" data-mode="${b.id}">${b.id===p?"✓":""}<span>${b.label}</span></button>`).join(""),f.querySelectorAll("[data-mode]").forEach(b=>{b.addEventListener("click",_=>{_.stopPropagation(),St(b.dataset.mode),rt()})})}function zt(f,b){_t();const _=k;_.style.display="block";const I=_.getBoundingClientRect();_.style.left=Math.max(8,Math.min(f,window.innerWidth-I.width-8))+"px",_.style.top=Math.max(8,Math.min(b,window.innerHeight-I.height-8))+"px"}function rt(){k&&(k.style.display="none")}function ft(){a&&(a.title="Click: next mode • Right-click: choose mode",a.addEventListener("click",()=>{rt();const f=Gt.findIndex(b=>b.id===p);St(Gt[(f+1)%Gt.length].id)}),a.addEventListener("contextmenu",f=>{f.preventDefault(),f.stopPropagation(),zt(f.clientX,f.clientY)}))}document.addEventListener("click",f=>{k&&k.style.display!=="none"&&!k.contains(f.target)&&rt()}),document.addEventListener("keydown",f=>{f.key==="Escape"&&rt()});function It(){B(),xt(),(n==null?void 0:n.state)==="suspended"&&n.resume().catch(()=>{})}t.addEventListener("play",It),It(),ft(),document.addEventListener("visibilitychange",()=>{document.hidden?(cancelAnimationFrame(v),v=0):xt()});function ct(){cancelAnimationFrame(v),v=0,a=_e(),a&&(i=h(a),e=i.getContext("2d"),new ResizeObserver(M).observe(i),M(),ft(),xt())}window.__LUMI_REBIND_VISUALIZER__=ct}function Ie(t){if(!t||!t.trim())return{isSynced:!1,lines:[],raw:""};const a=[],i=t.split(/\r?\n/),e=/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;let n=!1;for(const o of i){const l=o.trim();if(!l||/^\[[a-z]{2,8}:/i.test(l))continue;const c=[...l.matchAll(e)];if(c.length>0){n=!0;const d=l.replace(e,"").trim();for(const s of c){const p=parseInt(s[1],10),v=parseInt(s[2],10),g=s[3]||"0",S=g.length===2?parseInt(g,10)*10:g.length===1?parseInt(g,10)*100:parseInt(g.slice(0,3),10),k=p*60+v+S/1e3;a.push({time:k,text:d})}}else a.push({time:-1,text:l})}return a.sort((o,l)=>o.time-l.time),{isSynced:n,lines:a,raw:t}}function Te(t,a){var k;const i=document.getElementById("lyricsContainer"),e=document.getElementById("lyricsStatus"),n=document.getElementById("lyricsTrackTitle");let o={isSynced:!1,lines:[]},l=null,c=-1,d=0;async function s(h){if(h.lyrics&&h.lyrics.trim().length>0)return h.lyrics;if(window.__TAURI__)try{const{invoke:B}=await Y(async()=>{const{invoke:x}=await import("./core-DhEqZVGG.js");return{invoke:x}},[]),P=await B("get_track_lyrics",{path:h.path});if(P)return P}catch{}return null}async function p(h){if(!h){l=null,o={isSynced:!1,lines:[],raw:""},n&&(n.textContent="No track playing"),v();return}l=h.id,n&&(n.textContent=`${h.title} — ${h.artist}`);const B=await s(h);o=Ie(B||""),v()}function v(){if(i){if(i.innerHTML="",c=-1,!o.lines.length){e&&(e.style.display="block",e.innerHTML='No synced lyrics found (.lrc)<br/><span style="font-size:10.5px; opacity:0.7;">Place a matching .lrc file in the song folder or add lyrics in the tag editor.</span>');return}e&&(e.style.display="none"),o.lines.forEach((h,B)=>{const P=document.createElement("div");P.className="lyric-line",P.dataset.idx=String(B),P.dataset.time=String(h.time),P.textContent=h.text||"♪",h.time>=0&&(P.style.cursor="pointer",P.title=`Seek to ${Math.floor(h.time/60)}:${Math.floor(h.time%60).toString().padStart(2,"0")}`,P.addEventListener("click",()=>{H("melo:seek-playback",h.time),window.__TAURI__||(t.currentTime=h.time,t.play().catch(()=>{}))})),i.appendChild(P)})}}function g(){if(!i||!o.isSynced||!o.lines.length)return;const h=window.__TAURI__?d:t.currentTime;let B=-1;for(let P=0;P<o.lines.length&&o.lines[P].time<=h;P++)B=P;if(B!==c){c=B;const P=i.querySelectorAll(".lyric-line");if(P.forEach((x,it)=>{x.classList.toggle("active",it===c),x.classList.toggle("passed",it<c)}),c>=0&&P[c]){const x=P[c],it=i.clientHeight,L=x.offsetTop-i.offsetTop-it/2+x.clientHeight/2;i.scrollTo({top:Math.max(0,L),behavior:"smooth"})}}}t.addEventListener("timeupdate",g),window.addEventListener("lumi:trackChange",h=>{p(h.detail)}),at("melo:track-changed",h=>{p(h)}),at("melo:playback-state",h=>{h&&(d=Number(h.currentTime)||0,h.track&&h.track.id!==l?p(h.track):g())}),at("melo:playback-position",h=>{d=Number(h)||0,g()});const S=window.__LUMI_QUEUE__;if(Array.isArray(S)&&S.length>0)p(S[((k=window.LumiPlayer)==null?void 0:k.currentIndex)||0]);else try{const h=JSON.parse(localStorage.getItem("melo-current-track")||"null");h&&p(h)}catch{}H("melo:request-playback-state"),setTimeout(()=>H("melo:request-playback-state"),250),window.LumiLyrics={loadTrackLyrics:p,parseLRC:Ie}}const ba=(t,a,i)=>{const e=t[a];return e?typeof e=="function"?e():Promise.resolve(e):new Promise((n,o)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(o.bind(null,new Error("Unknown variable dynamic import: "+a+(a.split("/").length!==i?". Note that variables only represent file names one level deep.":""))))})},De={code:"en",name:"English",nativeName:"English",authors:["Melo Team"]},pe={_meta:De,"settings.tabs.general":"General","settings.tabs.playback":"Playback","settings.tabs.appearance":"Appearance & Skin","settings.tabs.shortcuts":"Shortcuts","settings.tabs.about":"About","settings.general.language.label":"Language","settings.general.language.desc":"Interface language — more languages coming via community translation","settings.general.tray.label":"Close to system tray","settings.general.tray.desc":"Minimize to system tray on window close","settings.general.resume.label":"Resume playback on reopen","settings.general.resume.desc":"Continue playback of the previous track where you left off","settings.playback.replaygain.label":"ReplayGain normalization","settings.playback.replaygain.desc":"Equalize track volume levels automatically","settings.playback.fadepause.label":"Fade out on pause","settings.playback.fadepause.desc":"Smooth 0.5s fade-out on pause, fade back in on resume","settings.appearance.showstop.label":"Show Stop button","settings.appearance.showstop.desc":"Display a Stop control next to Play/Pause in the player"},wa=Object.freeze(Object.defineProperty({__proto__:null,_meta:De,default:pe},Symbol.toStringTag,{value:"Module"})),Ne=[{code:"en",nativeName:"English"}],qt={en:pe};let Ue=qt.en,We="en";function ka(){return We}async function Ve(t){if(Ne.some(a=>a.code===t)||(t="en"),!qt[t])if(t==="en")qt.en=pe;else try{const a=await ba(Object.assign({"./locales/en.json":()=>Y(()=>Promise.resolve().then(()=>wa),void 0)}),`./locales/${t}.json`,3);qt[t]=a.default||a}catch{t="en"}We=t,Ue=qt[t]||qt.en,localStorage.setItem("melo-pref-language",t),document.dispatchEvent(new CustomEvent("melo:locale-changed",{detail:t}))}function st(t){var a,i;return(i=(a=Ue[t])!=null?a:qt.en[t])!=null?i:t}function Ae(){const t=localStorage.getItem("melo-pref-language")||"en";Ve(t)}const Fe=document.querySelector("#app");Fe.innerHTML=`
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
`;const ot=new URLSearchParams(location.search).get("panel");ot&&(document.documentElement.classList.add("panel-window",`panel-${ot}`),document.body.classList.add("panel-window",`panel-${ot}`));var Pe,Be;if(nt&&ot){Y(async()=>{const{getCurrentWindow:e}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:e}},__vite__mapDeps([8,7,1,0])).then(({getCurrentWindow:e})=>{const n=e();Ma(n,"melo-geo-panel-"+ot),n.onCloseRequested(()=>{H("melo:panel-closed",ot)}),window.addEventListener("beforeunload",()=>{H("melo:panel-closed",ot)})});const t=document.getElementById("win-"+ot),a=((Pe=t==null?void 0:t.querySelector(".float-title"))==null?void 0:Pe.innerHTML)||"",i=((Be=t==null?void 0:t.querySelector(".float-body"))==null?void 0:Be.innerHTML)||"";Fe.innerHTML=`
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
</div>`}nt&&!ot&&(document.documentElement.classList.add("tauri-main"),document.body.classList.add("tauri-main"),document.querySelectorAll(".side-actions .sbtn").forEach(t=>t.classList.remove("active")),Y(async()=>{const{WebviewWindow:t}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:t}},__vite__mapDeps([6,7,1,0,8])).then(({WebviewWindow:t})=>{const a=async()=>{var i;for(const e of["library","playlist","equalizer","lyrics","settings"])try{const n=await t.getByLabel("panel-"+e);(i=document.getElementById(me[e]))==null||i.classList.toggle("active",!!n)}catch{}};a(),setInterval(a,1200)}));nt&&!ot&&(Y(()=>import("./window-BWd3Cypy.js"),__vite__mapDeps([8,7,1,0])).then(async({getCurrentWindow:t})=>{const a=t(),i=()=>{const l=localStorage.getItem("melo-active-skin-id")||"default";if(l==="compact-pill"||typeof l=="string"&&l.startsWith("compact-pill"))return{w:780,h:138,resizable:!1,fixed:!0,custom:!1,force:!0,minW:780,minH:138,maxW:780,maxH:138};if(l!=="default"){const d=fa();if(d){const s=Number.isFinite(d.width)&&Number.isFinite(d.height)&&(d.width||0)>0&&(d.height||0)>0;return{w:d.width||0,h:d.height||0,resizable:d.resizable!==!1,fixed:!1,custom:!0,force:s,minW:d.minWidth,minH:d.minHeight,maxW:d.maxWidth,maxH:d.maxHeight}}return{w:0,h:0,resizable:!0,fixed:!1,custom:!0,force:!1,minW:void 0,minH:void 0,maxW:void 0,maxH:void 0}}return{w:960,h:240,resizable:!0,fixed:!1,custom:!1,force:!0,minW:650,minH:135,maxW:1e4,maxH:260}},e=async l=>{try{const{LogicalSize:c}=await Y(async()=>{const{LogicalSize:d}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:d}},__vite__mapDeps([7,1]));if(l.fixed)await a.setMinSize(new c(l.w,l.h)),await a.setMaxSize(new c(l.w,l.h));else if(l.custom){const d=l.minW||240,s=l.minH||120,p=Math.max(d,l.maxW||1e4),v=Math.max(s,l.maxH||1e4);await a.setMinSize(new c(d,s)),await a.setMaxSize(new c(p,v))}else await a.setMinSize(new c(650,135)),await a.setMaxSize(new c(1e4,260));await a.setResizable(l.resizable)}catch{}},n=(l,c,d,s)=>{let p=Number.isFinite(l)&&l>0?l:c;return d!=null&&p<d&&(p=d),s!=null&&p>s&&(p=s),p};try{const l=JSON.parse(localStorage.getItem("melo-geo-main")||"null"),{LogicalPosition:c,LogicalSize:d}=await Y(async()=>{const{LogicalPosition:p,LogicalSize:v}=await import("./dpi-fvP-W2qr.js");return{LogicalPosition:p,LogicalSize:v}},__vite__mapDeps([7,1])),s=i();if(s.force){let p=s.w,v=s.h;l&&!s.fixed&&(s.custom?(p=n(l.w,s.w,s.minW,s.maxW),v=n(l.h,s.h,s.minH,s.maxH)):(p=Math.max(650,l.w),v=s.h)),await a.setSize(new d(p,v))}await e(s),(l==null?void 0:l.x)!=null&&(l==null?void 0:l.y)!=null&&await a.setPosition(new c(l.x,l.y))}catch{}const o=async()=>{try{const l=await a.outerPosition(),c=await a.innerSize();localStorage.setItem("melo-geo-main",JSON.stringify({x:l.x,y:l.y,w:c.width,h:c.height}))}catch{}};a.onMoved(o),a.onResized(async()=>{try{const l=i(),{LogicalSize:c}=await Y(async()=>{const{LogicalSize:d}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:d}},__vite__mapDeps([7,1]));if(l.fixed)await a.setSize(new c(l.w,l.h));else if(!l.custom){const s=(await a.innerSize()).toLogical(await a.scaleFactor());(s.width<650||s.height!==l.h)&&await a.setSize(new c(Math.max(650,s.width),l.h))}}catch{}o()}),at("melo:skin-changed",async l=>{try{!ot&&l&&await $t(l,Ct,void 0,!1,!1);const c=i();if(c.force){const{LogicalSize:d}=await Y(async()=>{const{LogicalSize:s}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:s}},__vite__mapDeps([7,1]));await a.setSize(new d(c.w,c.h))}await e(c),o()}catch{}}),at("melo:skin-geometry",async()=>{try{const l=i();if(l.force){const{LogicalSize:c}=await Y(async()=>{const{LogicalSize:d}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:d}},__vite__mapDeps([7,1]));await a.setSize(new c(l.w,l.h))}await e(l),o()}catch{}}),a.onCloseRequested(async l=>{if(l.preventDefault(),localStorage.getItem("melo-pref-tray")==="1")try{await a.hide();return}catch{}const{WebviewWindow:d}=await Y(async()=>{const{WebviewWindow:s}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:s}},__vite__mapDeps([6,7,1,0,8]));for(const s of["library","playlist","equalizer","lyrics","settings"])try{const p=await d.getByLabel("panel-"+s);p&&await p.close()}catch{}try{await a.destroy()}catch{window.close()}})}),Y(()=>import("./core-DhEqZVGG.js"),[]).then(async({invoke:t})=>{try{const a=await t("get_cli_tracks");Array.isArray(a)&&a.length>0&&setTimeout(async()=>{const i=window.LumiLibrary,e=a.map(o=>o.path).filter(Boolean),n=await(i==null?void 0:i.importPaths(e,"replace"))||[];n.length&&H("melo:play-tracks",{tracks:n,index:0})},350)}catch{}}),at("melo:open-files",t=>{if(Array.isArray(t)&&t.length>0){const a=t.map(i=>i.path).filter(Boolean);setTimeout(async()=>{const i=window.LumiLibrary,e=await(i==null?void 0:i.importPaths(a,"replace"))||[];e.length&&H("melo:play-tracks",{tracks:e,index:0})},100)}}));document.addEventListener("contextmenu",t=>{t.preventDefault()});const Qt=document.getElementById("toast"),ut=t=>{Qt&&(Qt.textContent=t,Qt.classList.add("show"),setTimeout(()=>Qt.classList.remove("show"),2200))},Mt=new Audio;Mt.preload="metadata";Mt.crossOrigin="anonymous";window.__LUMI_AUDIO__=Mt;window.__TOAST__=ut;localStorage.getItem("melo-dynamic-theme")===null&&localStorage.setItem("melo-dynamic-theme","1");let Ct=localStorage.getItem("lumi-theme")||"dark";function ie(t){document.documentElement.setAttribute("data-theme",t),localStorage.setItem("lumi-theme",t),Ct=t}function je(t){ie(t),H("melo:theme",t)}ie(Ct);at("melo:theme",t=>{(t==="light"||t==="dark")&&ie(t)});setInterval(()=>{const t=localStorage.getItem("lumi-theme");(t==="light"||t==="dark")&&t!==Ct&&ie(t)},1e3);document.body.classList.toggle("show-stop-btn",localStorage.getItem("melo-pref-showStopBtn")==="1");at("melo:pref-changed",t=>{t&&t.key==="showStopBtn"&&document.body.classList.toggle("show-stop-btn",!!t.value)});const xa=["win-library","win-playlist","win-equalizer","win-lyrics","win-settings"],ae=document.getElementById("desktop"),Sa={btnToggleLibrary:"win-library",btnTogglePlaylist:"win-playlist",btnToggleEq:"win-equalizer",btnToggleLyrics:"win-lyrics",btnOpenSettings:"win-settings",menuToggleLibrary:"win-library",menuTogglePlaylist:"win-playlist",menuToggleEq:"win-equalizer",menuToggleLyrics:"win-lyrics",menuToggleSettings:"win-settings"};function La(t){const a=document.getElementById(t);return!!a&&!a.classList.contains("hidden")}const me={library:"btnToggleLibrary",playlist:"btnTogglePlaylist",equalizer:"btnToggleEq",lyrics:"btnToggleLyrics",settings:"btnOpenSettings"};async function Ma(t,a){const i=async()=>{try{const e=await t.outerPosition(),n=await t.outerSize();localStorage.setItem(a,JSON.stringify({x:e.x,y:e.y,w:n.width,h:n.height}))}catch{}};t.onMoved(i),t.onResized(i)}async function Ea(t){const{WebviewWindow:a}=await Y(async()=>{const{WebviewWindow:p}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:p}},__vite__mapDeps([6,7,1,0,8])),i="panel-"+t,e=document.getElementById(me[t]),n=await a.getByLabel(i);if(n){await n.close(),e==null||e.classList.remove("active");return}const o={library:[430,620],playlist:[440,560],equalizer:[700,440],lyrics:[380,520],settings:[600,540]},l={library:[360,400],playlist:[360,360],equalizer:[620,400],lyrics:[320,360],settings:[500,400]},c={library:"Library",playlist:"Playlist",equalizer:"Equalizer",lyrics:"Lyric",settings:"Settings"},d=o[t]||[420,520];let s=null;try{s=JSON.parse(localStorage.getItem("melo-geo-panel-"+t)||"null")}catch{}new a(i,{url:`/?panel=${t}`,title:c[t]||t,width:(s==null?void 0:s.w)||d[0],height:(s==null?void 0:s.h)||d[1],minWidth:(l[t]||[360,360])[0],minHeight:(l[t]||[360,360])[1],...(s==null?void 0:s.x)!=null?{x:s.x,y:s.y}:{center:!0},decorations:!1,transparent:!0,shadow:!1,skipTaskbar:!0}),e==null||e.classList.add("active")}at("melo:panel-closed",t=>{var i;const a=me[t];a&&((i=document.getElementById(a))==null||i.classList.remove("active"))});function fe(t){if(nt){Ea(t.replace(/^win-/,""));return}const a=La(t);Xt(t,!a),a||ne(document.getElementById(t))}function _a(t){if(t.classList.contains("hidden")||!ae||window.matchMedia("(max-width: 860px)").matches)return;const a=ae.getBoundingClientRect();if(a.width<=0||a.height<=0)return;const i=t.getBoundingClientRect(),e=Math.min(i.width,a.width),n=Math.min(i.height,a.height);let o=i.left-a.left,l=i.top-a.top;o=Math.max(0,Math.min(a.width-e,o)),l=Math.max(0,Math.min(a.height-n,l)),t.style.left=o+"px",t.style.top=l+"px",t.style.right="auto",t.style.bottom="auto",t.style.transform="none"}function Xt(t,a){var n,o,l,c,d,s,p,v,g,S;const i=document.getElementById(t);if(!i)return;i.classList.toggle("hidden",!a),localStorage.setItem("lumiv2-"+t,a?"1":"0"),a&&_a(i);const e=a;t==="win-library"&&((n=document.getElementById("btnToggleLibrary"))==null||n.classList.toggle("active",e),(o=document.getElementById("menuToggleLibrary"))==null||o.classList.toggle("active",e)),t==="win-playlist"&&((l=document.getElementById("btnTogglePlaylist"))==null||l.classList.toggle("active",e),(c=document.getElementById("menuTogglePlaylist"))==null||c.classList.toggle("active",e)),t==="win-equalizer"&&((d=document.getElementById("btnToggleEq"))==null||d.classList.toggle("active",e),(s=document.getElementById("menuToggleEq"))==null||s.classList.toggle("active",e)),t==="win-lyrics"&&((p=document.getElementById("btnToggleLyrics"))==null||p.classList.toggle("active",e),(v=document.getElementById("menuToggleLyrics"))==null||v.classList.toggle("active",e)),t==="win-settings"&&((g=document.getElementById("btnOpenSettings"))==null||g.classList.toggle("active",e),(S=document.getElementById("menuToggleSettings"))==null||S.classList.toggle("active",e))}ot||xa.forEach(t=>{const a=localStorage.getItem("lumiv2-"+t);a!==null?Xt(t,a==="1"):t==="win-settings"?Xt(t,!1):Xt(t,!0)});Object.entries(Sa).forEach(([t,a])=>{var i;(i=document.getElementById(t))==null||i.addEventListener("click",()=>fe(a))});document.querySelectorAll("[data-close]").forEach(t=>{t.addEventListener("click",()=>{const a=t.dataset.close;Xt(a,!1)})});let bt=null,Et=null,Ce=10;function ne(t){Ce++,t.style.zIndex=String(Ce),document.querySelectorAll(".float-win").forEach(a=>a.classList.remove("active")),t.classList.add("active")}document.querySelectorAll(".float-win").forEach(t=>{t.addEventListener("mousedown",()=>ne(t))});document.querySelectorAll("[data-drag]").forEach(t=>{t.addEventListener("mousedown",a=>{if(a.target.closest("button")||a.target.closest("input")||a.target.closest("select"))return;const i=t.dataset.drag,e=document.getElementById(i);ne(e),e.classList.add("dragging");const n=e.getBoundingClientRect();bt={id:i,startX:a.clientX,startY:a.clientY,initX:n.left,initY:n.top,width:n.width,height:n.height}})});document.querySelectorAll("[data-resize]").forEach(t=>{t.addEventListener("mousedown",a=>{a.stopPropagation();const i=t.dataset.resize,e=document.getElementById(i);ne(e),e.classList.add("resizing");const n=e.getBoundingClientRect();Et={id:i,startX:a.clientX,startY:a.clientY,initW:n.width,initH:n.height}})});window.addEventListener("mousemove",t=>{if(bt){const a=document.getElementById(bt.id);let i=t.clientX-bt.startX,e=t.clientY-bt.startY,n=bt.initX+i,o=bt.initY+e;if(ae&&!window.matchMedia("(max-width: 860px)").matches){const l=ae.getBoundingClientRect(),c=l.left,d=l.right-bt.width,s=l.top,p=l.bottom-bt.height;n=Math.max(c,Math.min(d,n))-l.left,o=Math.max(s,Math.min(p,o))-l.top}a.style.left=n+"px",a.style.top=o+"px",a.style.right="auto",a.style.bottom="auto",a.style.transform="none"}if(Et){const a=document.getElementById(Et.id);let i=Et.initW+(t.clientX-Et.startX),e=Et.initH+(t.clientY-Et.startY);i=Math.max(260,i),e=Math.max(160,e),a.style.width=i+"px",a.style.height=e+"px"}});window.addEventListener("mouseup",()=>{if(bt){const t=document.getElementById(bt.id);t&&(t.classList.remove("dragging"),localStorage.setItem("lumiv2-pos-"+bt.id,JSON.stringify({left:t.style.left,top:t.style.top}))),bt=null}if(Et){const t=document.getElementById(Et.id);t&&(t.classList.remove("resizing"),localStorage.setItem("lumiv2-size-"+Et.id,JSON.stringify({width:t.style.width,height:t.style.height}))),Et=null}});async function Ge(){const t=window.LumiLibrary,a=window.LumiPlayer;if(nt){try{const{open:e}=await Y(async()=>{const{open:c}=await import("./index-CS3Qnt9j.js");return{open:c}},__vite__mapDeps([5,1])),n=await e({multiple:!0,filters:[{name:"Audio",extensions:["mp3","flac","wav","aac","ogg","m4a","alac","opus","wma","aiff"]}]});if(!n)return;const o=Array.isArray(n)?n:[n],l=await(t==null?void 0:t.importPaths(o,"replace"))||[];l.length&&(H("melo:play-tracks",{tracks:l,index:0}),ut(`${l.length} file(s) added`))}catch{ut("Error opening files")}return}const i=document.createElement("input");i.type="file",i.multiple=!0,i.accept="audio/*,.mp3,.flac,.wav,.aac,.ogg,.m4a,.alac,.opus,.wma,.aiff",i.onchange=async()=>{const e=Array.from(i.files||[]);if(!e.length)return;const n=[];for(const o of e){const l=o.path,c=l||URL.createObjectURL(o),d=o.name,s=d.lastIndexOf("."),p=s>0?d.slice(0,s):d,v=s>0?d.slice(s+1).toUpperCase():"AUDIO",g={id:l||"imp_"+Math.random().toString(36).slice(2,9),title:p,artist:"Unknown Artist",album:"Single",duration:0,path:c,codec:v,specs:"Local File",source:"import"};await Re(o,g),n.push(g)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(o=>a==null?void 0:a.queue.push(o)),H("melo:play-tracks",{tracks:n,index:0}),ut(`${n.length} file(s) added`)},i.click()}async function Ye(){const t=window.LumiLibrary,a=window.LumiPlayer;if(nt){try{const{open:e}=await Y(async()=>{const{open:l}=await import("./index-CS3Qnt9j.js");return{open:l}},__vite__mapDeps([5,1])),n=await e({directory:!0});if(!n)return;const o=n;await(t==null?void 0:t.scanFolder(o,!0))}catch{ut("Error scanning folder")}return}const i=document.createElement("input");i.type="file",i.webkitdirectory=!0,i.multiple=!0,i.accept="audio/*",i.onchange=async()=>{const e=Array.from(i.files||[]).filter(o=>/\.(mp3|flac|wav|aac|ogg|m4a|alac|opus|wma|aiff)$/i.test(o.name));if(!e.length)return;const n=[];for(const o of e){const l=o.path,c=l||URL.createObjectURL(o),d=o.name,s=d.lastIndexOf("."),p=s>0?d.slice(0,s):d,v=s>0?d.slice(s+1).toUpperCase():"AUDIO",g={id:l||"imp_"+Math.random().toString(36).slice(2,9),title:p,artist:"Unknown Artist",album:"Folder Import",duration:0,path:c,codec:v,specs:"Local File",source:"import"};await Re(o,g),n.push(g)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(o=>a==null?void 0:a.queue.push(o)),H("melo:play-tracks",{tracks:n,index:0}),ut(`${n.length} file(s) added from folder`)},i.click()}document.addEventListener("click",t=>{var e;const a=(e=t.target)==null?void 0:e.closest('#btnAddFiles, #btnAddFolder, #btnThemeToggle, [data-melo="add-files"], [data-melo="add-folder"], [data-melo="theme-toggle"]');if(!a)return;const i=a.getAttribute("data-melo")||a.id;i==="btnAddFiles"||i==="add-files"?Ge():i==="btnAddFolder"||i==="add-folder"?Ye():(i==="btnThemeToggle"||i==="theme-toggle")&&je(Ct==="light"?"dark":"light")});window.addEventListener("keydown",t=>{(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="o"&&(t.shiftKey?(t.preventDefault(),Ye()):(t.preventDefault(),Ge())),((t.ctrlKey||t.metaKey)&&t.key===","||t.key==="F2")&&(t.preventDefault(),fe("win-settings"))});function ze(t){var g,S;function a(k){document.querySelectorAll(".settings-tab").forEach(h=>{h.classList.toggle("active",h.dataset.stab===k)}),document.querySelectorAll(".settings-section[data-panel]").forEach(h=>{h.classList.toggle("active",h.dataset.panel===k)}),localStorage.setItem("melo-settings-tab",k)}document.querySelectorAll(".settings-tab").forEach(k=>{k.addEventListener("click",()=>a(k.dataset.stab))}),a(localStorage.getItem("melo-settings-tab")||"general"),document.querySelectorAll(".switch[data-key]").forEach(k=>{const h=k.dataset.key,B=localStorage.getItem("melo-pref-"+h);B!==null&&k.classList.toggle("on",B==="1"),k.onclick=()=>{k.classList.toggle("on");const P=k.classList.contains("on");localStorage.setItem("melo-pref-"+h,P?"1":"0"),H("melo:pref-changed",{key:h,value:P})}});const i=document.getElementById("setLanguage");i&&(i.value=ka(),i.onchange=async()=>{await Ve(i.value),t(`Language set to ${i.options[i.selectedIndex].text} — restart Melo to fully apply`)});const e=document.getElementById("swDynamicTheme");if(e){const k=localStorage.getItem("melo-dynamic-theme")!=="0";e.classList.toggle("on",k),e.onclick=()=>{var x,it;const h=!e.classList.contains("on");e.classList.toggle("on",h),localStorage.setItem("melo-dynamic-theme",h?"1":"0");const B=window.__LUMI_QUEUE__,P=(it=(x=window.LumiPlayer)==null?void 0:x.currentIndex)!=null?it:0;B&&B[P]&&qe(h?B[P].cover:null)}}const n=document.getElementById("skinSelect"),o=document.getElementById("btnSkinThemeToggle"),l=document.getElementById("btnRefreshSkins"),c=document.getElementById("btnOpenSkinsFolder"),d=document.getElementById("skinThemeIcon"),s=document.getElementById("skinThemeLabel");function p(k){d&&(d.textContent=k==="dark"?"🌙":"☀️"),s&&(s.textContent=k==="dark"?"Dark":"Light")}p(Ct),o==null||o.addEventListener("click",()=>{const k=Ct==="dark"?"light":"dark";je(k),p(k),t(k==="dark"?"Dark theme":"Light theme")}),at("melo:theme",k=>{(k==="light"||k==="dark")&&p(k)});async function v(){if(!n)return;const k=localStorage.getItem("melo-active-skin-id")||"default",h=await Oe();n.innerHTML=`
      <option value="default">Default Melo (Standard)</option>
      <option value="compact-pill">Minimal Compact (Pill Bar)</option>
    `,h.forEach(B=>{if(B.filename!=="compact-pill.html"&&B.filename!=="compact-pill-light.html"&&B.filename!=="compact-pill-dark.html"){const P=document.createElement("option");P.value=B.filename,P.textContent=`${B.name} (${B.filename})`,n.appendChild(P)}}),n.value=k}v(),n&&(n.onchange=()=>{const k=n.value;$t(k,Ct,t)}),l==null||l.addEventListener("click",async()=>{await v();const k=localStorage.getItem("melo-active-skin-id")||"default";$t(k,Ct,t),t("Skins reloaded from disk")}),c==null||c.addEventListener("click",()=>{He(t)}),(g=document.getElementById("btn-reset-skin-settings"))==null||g.addEventListener("click",()=>{ue(t),n&&(n.value="default")}),(S=document.getElementById("btn-settings-reset"))==null||S.addEventListener("click",()=>{localStorage.clear(),t("Settings reset — reloading..."),setTimeout(()=>location.reload(),600)})}function Je(){document.querySelectorAll('.win-btn, [data-melo="minimize"], [data-melo="close"]').forEach(t=>{t.onclick=async()=>{const a=t.getAttribute("aria-label")||t.getAttribute("data-melo");if(window.__TAURI__){const{getCurrentWindow:i}=await Y(async()=>{const{getCurrentWindow:n}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:n}},__vite__mapDeps([8,7,1,0])),e=i();a==="minimize"?e.minimize():a==="close"&&e.close()}else a==="close"&&ut("Window close requires the Tauri desktop build")}})}Je();const Ia=[["btnToggleLibrary","toggle-library","win-library"],["btnTogglePlaylist","toggle-playlist","win-playlist"],["btnToggleEq","toggle-eq","win-equalizer"],["btnToggleLyrics","toggle-lyrics","win-lyrics"],["btnOpenSettings","toggle-settings","win-settings"]];window.__LUMI_REBIND_MAIN__=()=>{Je(),Ia.forEach(([t,a,i])=>{const e=et(t,a);e&&(e.onclick=()=>fe(i))})};const Ht=document.createElement("div");Ht.id="aboutPop";Ht.style.display="none";document.body.appendChild(Ht);document.addEventListener("click",t=>{var a,i;(a=t.target)!=null&&a.closest('#btnAbout, [data-melo="about"]')&&(t.stopPropagation(),Ht.innerHTML=`
    <div class="about-head">Melo <b>0.5.1 Beta</b></div>
    <div style="font-size:11.5px; color:var(--text-soft); margin:6px 0 10px;">
      Modern Windows Music Player<br/>
      Tauri 2 + TypeScript + Rust
    </div>
    <a class="about-link" id="aboutLink" href="https://github.com/Arvanta/Melo" rel="noopener">github.com/Arvanta/Melo ↗</a>`,Ht.style.display=Ht.style.display==="none"?"block":"none",(i=document.getElementById("aboutLink"))==null||i.addEventListener("click",e=>{e.preventDefault();const n="https://github.com/Arvanta/Melo";nt?Y(()=>import("./core-DhEqZVGG.js"),[]).then(o=>o.invoke("open_url",{url:n})).catch(()=>window.open(n,"_blank")):window.open(n,"_blank")}))});document.addEventListener("click",t=>{!t.target.closest("#aboutPop")&&!t.target.closest('#btnAbout, [data-melo="about"]')&&(Ht.style.display="none")});nt&&ot?ot==="library"||ot==="playlist"?Me(Mt,ut):ot==="equalizer"?Ee(Mt,ut,{remote:!0}):ot==="lyrics"?Te(Mt):ot==="settings"&&(Ae(),ze(ut),Se(ut)):(va(Mt,ut),Me(Mt,ut),Ee(Mt,ut),ya(Mt),Te(Mt),Se(ut),ze(ut),Ae(),setTimeout(async()=>{if(localStorage.getItem("melo-pref-resume")!=="0")try{const t=JSON.parse(localStorage.getItem("melo-resume-state")||"null"),a=window.LumiLibrary,i=window.LumiPlayer;if(!(t!=null&&t.trackId)||!a||!i)return;const e=await a.getTrack(t.trackId);if(!e)return;i.queue=[e],i.loadTrack(0,!0,t.position||0)}catch{}},500));
//# sourceMappingURL=index-BXY7aui6.js.map
