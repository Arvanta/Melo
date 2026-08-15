const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/event-CNdo2oXa.js","assets/core-DhEqZVGG.js","assets/index-DiyoAAdc.js","assets/index-CHth0gh2.js","assets/index-Bq0iOnRE.js","assets/index-CS3Qnt9j.js","assets/webviewWindow-mjQkSB26.js","assets/dpi-fvP-W2qr.js","assets/window-BWd3Cypy.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(a){if(a.ep)return;a.ep=!0;const o=n(a);fetch(a.href,o)}})();const Ze="modulepreload",ti=function(t){return"/"+t},ye={},V=function(e,n,i){let a=Promise.resolve();if(n&&n.length>0){let s=function(c){return Promise.all(c.map(u=>Promise.resolve(u).then(v=>({status:"fulfilled",value:v}),v=>({status:"rejected",reason:v}))))};document.getElementsByTagName("link");const p=document.querySelector("meta[property=csp-nonce]"),d=(p==null?void 0:p.nonce)||(p==null?void 0:p.getAttribute("nonce"));a=s(n.map(c=>{if(c=ti(c),c in ye)return;ye[c]=!0;const u=c.endsWith(".css"),v=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${v}`))return;const m=document.createElement("link");if(m.rel=u?"stylesheet":Ze,u||(m.as="script"),m.crossOrigin="",m.href=c,d&&m.setAttribute("nonce",d),document.head.appendChild(m),u)return new Promise((k,M)=>{m.addEventListener("load",k),m.addEventListener("error",()=>M(new Error(`Unable to preload CSS for ${c}`)))})}))}function o(s){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=s,window.dispatchEvent(p),!p.defaultPrevented)throw s}return a.then(s=>{for(const p of s||[])p.status==="rejected"&&o(p.reason);return e().catch(o)})},it=typeof window.__TAURI_INTERNALS__<"u"||typeof window.__TAURI__<"u";async function U(t,e){if(it)try{const{emit:n}=await V(async()=>{const{emit:i}=await import("./event-CNdo2oXa.js");return{emit:i}},__vite__mapDeps([0,1]));await n(t,e);return}catch{}window.dispatchEvent(new CustomEvent(t,{detail:e}))}function rt(t,e){it&&V(async()=>{const{listen:n}=await import("./event-CNdo2oXa.js");return{listen:n}},__vite__mapDeps([0,1])).then(({listen:n})=>{n(t,i=>{e(i.payload)})}).catch(()=>{}),window.addEventListener(t,n=>e(n.detail))}let be=!1;async function ei(){if(!be){be=!0;try{const t=globalThis;if(typeof t.Buffer>"u"){const e=await V(()=>import("./index-DiyoAAdc.js").then(n=>n.i),__vite__mapDeps([2,3]));t.Buffer=e.Buffer}typeof t.process>"u"&&(t.process={env:{},browser:!0,nextTick:e=>setTimeout(e,0)})}catch{}}}async function ii(t,e){var n;try{await ei();const i=await V(()=>import("./index-Bq0iOnRE.js").then(c=>c.i),__vite__mapDeps([4,3])),a=i&&typeof i.parseBlob=="function"?i:i.default||i,o=await Promise.race([a.parseBlob(t),new Promise((c,u)=>setTimeout(()=>u(new Error("timeout")),1800))]),s=o==null?void 0:o.common;if(!s)return;s.title&&(e.title=s.title),s.artist?e.artist=s.artist:s.artists&&s.artists[0]&&(e.artist=s.artists[0]),s.album&&(e.album=s.album),s.genre&&s.genre[0]&&(e.genre=s.genre[0]),s.year&&(e.year=s.year);const p=(n=s.picture)==null?void 0:n[0];if(p&&p.data){const c=p.format||"image/jpeg",u=p.data;if(u.length>6e5)return;let v="";const m=8192;for(let k=0;k<u.length;k+=m){const M=u.subarray(k,k+m);v+=String.fromCharCode.apply(null,M)}e.cover=`data:${c};base64,${btoa(v)}`}const d=o==null?void 0:o.format;d&&d.duration&&!e.duration&&(e.duration=Math.floor(d.duration))}catch{}}async function ce(t,e,n=1800){return await ii(t,e),e}async function ni(t){return new Promise(e=>{if(!t)return e(null);const n=new Image;n.crossOrigin="anonymous",n.onload=()=>{try{const i=document.createElement("canvas"),a=i.getContext("2d");if(!a)return e(null);i.width=40,i.height=40,a.drawImage(n,0,0,40,40);const o=a.getImageData(0,0,40,40).data;let s={r:42,g:123,b:214},p=-1;for(let d=0;d<o.length;d+=4){const c=o[d],u=o[d+1],v=o[d+2];if(o[d+3]<128)continue;const k=Math.max(c,u,v),M=Math.min(c,u,v),A=(k+M)/510,K=k-M,nt=K===0?0:K/(1-Math.abs(2*A-1));if(nt>.25&&A>.25&&A<.82){const _=nt*1.5+(1-Math.abs(A-.5));_>p&&(p=_,s={r:c,g:u,b:v})}}p>0?e(s):e(null)}catch{e(null)}},n.onerror=()=>e(null),n.src=t})}async function He(t){const e=localStorage.getItem("melo-dynamic-theme")!=="0",n=document.documentElement;if(!e||!t){n.style.removeProperty("--accent"),n.style.removeProperty("--visualizer"),n.style.removeProperty("--accent-glow");return}const i=await ni(t);if(i){const a=`rgb(${i.r}, ${i.g}, ${i.b})`;n.style.setProperty("--accent",a),n.style.setProperty("--visualizer",a),n.style.setProperty("--accent-glow",`rgba(${i.r}, ${i.g}, ${i.b}, 0.35)`)}else n.style.removeProperty("--accent"),n.style.removeProperty("--visualizer"),n.style.removeProperty("--accent-glow")}const jt=[31,62,125,250,500,1e3,2e3,4e3,8e3,16e3];let _t=null,ne=null,ae=[],Wt=null,$t=null;function Qt(t){if(!_t){const e=window.AudioContext||window.webkitAudioContext;_t=new e;try{ne=_t.createMediaElementSource(t)}catch{}if(ae=jt.map(n=>{const i=_t.createBiquadFilter();return i.type="peaking",i.frequency.value=n,i.Q.value=1.4,i.gain.value=0,i}),Wt=_t.createGain(),Wt.gain.value=1,$t=_t.createAnalyser(),$t.fftSize=2048,$t.smoothingTimeConstant=.72,ne){let n=ne;for(const i of ae)n.connect(i),n=i;n.connect(Wt),Wt.connect($t),$t.connect(_t.destination)}}return{ctx:_t,filters:ae,gain:Wt,analyser:$t,async resume(){_t&&_t.state==="suspended"&&await _t.resume().catch(()=>{})}}}function ai(t,e){let n,i,a,o,s,p,d,c=null,u,v,m,k,M,A,K,nt,_,z,$,P,g,y=[],T=0,G=!1,at="off",gt=!1;window.__LUMI_QUEUE__=y,window.__LUMI_SET_QUEUE__=r=>{y=r,window.__LUMI_QUEUE__=r};function ot(r){if(!isFinite(r))return"0:00";const w=Math.floor(r/60),b=Math.floor(r%60).toString().padStart(2,"0");return`${w}:${b}`}function tt(){if(!u)return;const r=parseFloat(u.max)||100,w=parseFloat(u.value)||0,b=r>0?w/r*100:0;u.style.setProperty("--progress",b+"%")}function ct(){v&&v.style.setProperty("--vol",v.value+"%")}async function vt(r){if(!r)return"";if(/^(https?|data|blob):/.test(r))return r;if(it)try{const{convertFileSrc:w}=await V(async()=>{const{convertFileSrc:b}=await import("./core-DhEqZVGG.js");return{convertFileSrc:b}},[]);return w(r)}catch{}return r}async function ht(r,w=!0){if(!y.length)return;r<0&&(r=y.length-1),r>=y.length&&(r=0),T=r;const b=y[r];if(b){if(A||B(),t.src=await vt(b.path),t.load(),A&&(A.textContent=b.title||"Unknown Title"),K&&(K.textContent=b.artist||"Unknown Artist"),nt&&(nt.textContent=b.album||""),_&&(_.textContent=b.codec||"AUDIO"),z&&(z.textContent=b.specs||""),!b.cover&&b.path&&it)try{const{invoke:q}=await V(async()=>{const{invoke:H}=await import("./core-DhEqZVGG.js");return{invoke:H}},[]),D=await q("get_track_cover",{path:b.path});D&&(b.cover=D,U("melo:cover-loaded",{id:b.id,path:b.path,cover:D}))}catch{}b.cover&&$?($.src=b.cover,$.style.display="block",P&&(P.style.display="none")):($&&($.style.display="none"),P&&(P.style.display="grid")),u&&(u.max=String(b.duration||240),u.value="0",tt()),k&&(k.textContent=ot(b.duration)),m&&(m.textContent="0:00"),x(),He(b.cover||null),document.querySelectorAll(".track-row").forEach((q,D)=>{var H;q.classList.toggle("active",((H=y[D])==null?void 0:H.id)===b.id)}),"mediaSession"in navigator&&(navigator.mediaSession.metadata=new MediaMetadata({title:b.title,artist:b.artist,album:b.album,artwork:b.cover?[{src:b.cover,sizes:"512x512",type:"image/jpeg"}]:[]}),navigator.mediaSession.setActionHandler("play",()=>Lt()),navigator.mediaSession.setActionHandler("pause",()=>ut()),navigator.mediaSession.setActionHandler("previoustrack",()=>h()),navigator.mediaSession.setActionHandler("nexttrack",()=>Bt()),navigator.mediaSession.setActionHandler("seekto",q=>{q.seekTime&&(t.currentTime=q.seekTime)})),w&&Lt(),window.dispatchEvent(new CustomEvent("lumi:trackChange",{detail:b})),U("melo:track-changed",b)}}let dt=!1;function ft(){try{Qt(t).resume()}catch{}dt&&(dt=!1,t.play().then(()=>{i&&(i.style.display="none"),a&&(a.style.display="block")}).catch(()=>{}))}window.addEventListener("pointerdown",ft),window.addEventListener("keydown",ft);function Lt(){try{Qt(t).resume()}catch{}t.play().then(()=>{dt=!1,i&&(i.style.display="none"),a&&(a.style.display="block"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="playing")}).catch(()=>{dt||(dt=!0,e("Click once inside player to begin audio playback"))})}function ut(){t.pause(),i&&(i.style.display="block"),a&&(a.style.display="none"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}function xt(){t.paused?Lt():ut()}function Dt(){t.pause();try{t.currentTime=0}catch{}i&&(i.style.display="block"),a&&(a.style.display="none"),u&&(u.value="0",tt()),m&&(m.textContent="0:00"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}function Bt(){if(!y.length)return;if(at==="one"){t.currentTime=0,Lt();return}let r=T+1;if(G&&(r=Math.floor(Math.random()*y.length),r===T&&y.length>1&&(r=(r+1)%y.length)),r>=y.length)if(at==="all")r=0;else{ut();return}ht(r)}function h(){if(!y.length)return;if(t.currentTime>3){t.currentTime=0;return}let r=T-1;G&&(r=Math.floor(Math.random()*y.length)),r<0&&(at==="all"?r=y.length-1:r=0),ht(r)}function x(){var H;const r=y[T];if(!r||!v)return;const w=parseInt(v.value,10)/100,b=g&&g.checked&&(H=r.replayGain)!=null?H:0,q=Math.pow(10,b/20);let D=w*q;D=Math.min(1,Math.max(0,D)),t.volume=D}function B(){n=document.getElementById("btnPlay"),i=document.getElementById("iconPlay"),a=document.getElementById("iconPause"),o=document.getElementById("btnPrev"),s=document.getElementById("btnNext"),p=document.getElementById("btnShuffle"),d=document.getElementById("btnRepeat"),c=document.getElementById("btnStop"),u=document.getElementById("seekBar"),v=document.getElementById("volBar"),m=document.getElementById("curTime"),k=document.getElementById("durTime"),M=document.getElementById("volPct"),A=document.getElementById("trackTitle"),K=document.getElementById("trackArtist"),nt=document.getElementById("trackAlbum"),_=document.getElementById("trackCodec"),z=document.getElementById("trackSpecs"),$=document.getElementById("coverImg"),P=document.getElementById("coverFallback"),g=document.getElementById("replayGainToggle"),n&&(n.onclick=xt),c&&(c.onclick=Dt),o&&(o.onclick=h),s&&(s.onclick=Bt),p&&(p.onclick=()=>{G=!G,p.classList.toggle("active",G),e(G?"Shuffle on":"Shuffle off")}),d&&(d.onclick=()=>{at=at==="off"?"all":at==="all"?"one":"off",d.classList.toggle("active",at!=="off");const b={off:"Repeat off",all:"Repeat all",one:"Repeat one"};e(b[at]),d.title=b[at]}),u&&(u.oninput=()=>{gt=!0,m&&(m.textContent=ot(parseFloat(u.value))),tt()},u.onchange=()=>{t.currentTime=parseFloat(u.value),gt=!1}),v&&(v.oninput=()=>{ct(),M&&(M.textContent=v.value+"%"),x()});const r=document.getElementById("volIcon"),w=()=>{r&&(t.muted?r.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>':r.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.08"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>')};if(r&&(r.style.cursor="pointer",r.onclick=()=>{t.muted=!t.muted,w(),e(t.muted?"Muted":"Unmuted")},w()),g&&(g.onchange=()=>x()),tt(),ct(),y[T]){const b=y[T];A&&(A.textContent=b.title||"Unknown Title"),K&&(K.textContent=b.artist||"Unknown Artist"),nt&&(nt.textContent=b.album||""),_&&(_.textContent=b.codec||"AUDIO"),z&&(z.textContent=b.specs||""),b.cover&&$&&($.src=b.cover,$.style.display="block",P&&(P.style.display="none"))}}B(),t.addEventListener("timeupdate",()=>{!gt&&u&&m&&(u.value=String(Math.floor(t.currentTime)),m.textContent=ot(t.currentTime),tt())}),t.addEventListener("loadedmetadata",()=>{var w;if(!u||!k)return;const r=Math.floor(t.duration||((w=y[T])==null?void 0:w.duration)||240);u.max=String(r),k.textContent=ot(r),tt()}),t.addEventListener("ended",()=>{Bt()}),window.addEventListener("keydown",r=>{if(r.target.tagName!=="INPUT"){if(r.code==="Space"&&(r.preventDefault(),xt()),r.code==="ArrowRight"&&(t.currentTime+=5),r.code==="ArrowLeft"&&(t.currentTime-=5),r.key==="m"||r.key==="M"){t.muted=!t.muted;const w=document.getElementById("volIcon");w&&(w.innerHTML=t.muted?`
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
        `:`
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.08"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
        `),e(t.muted?"Muted":"Unmuted")}(r.key==="s"||r.key==="S")&&p&&p.click(),(r.key==="r"||r.key==="R")&&d&&d.click(),r.code==="ArrowUp"&&v&&(v.value=String(Math.min(100,parseInt(v.value,10)+5)),v.dispatchEvent(new Event("input"))),r.code==="ArrowDown"&&v&&(v.value=String(Math.max(0,parseInt(v.value,10)-5)),v.dispatchEvent(new Event("input")))}}),window.addEventListener("wheel",r=>{const w=r.target;if(!(w.closest(".lyrics-scroll-container")||w.closest(".vscroll-wrapper")||w.closest("#trackList")||w.closest("#winPlaylistTracks")||w.closest(".settings-section"))&&v){const b=r.deltaY<0?3:-3,q=parseInt(v.value,10)||60,D=Math.max(0,Math.min(100,q+b));v.value=String(D),v.dispatchEvent(new Event("input"))}},{passive:!0}),rt("melo:tray-action",r=>{r==="play_pause"?xt():r==="next"?Bt():r==="prev"?h():r==="mute"&&(t.muted=!t.muted,e(t.muted?"Muted":"Unmuted"))}),window.LumiPlayer={get queue(){return y},set queue(r){y=r,window.__LUMI_QUEUE__=r},get currentIndex(){return T},loadTrack:ht,play:Lt,pause:ut,stop:Dt,next:Bt,prev:h,get audio(){return t},rebind:B},window.__LUMI_REBIND__=B,rt("melo:play-tracks",r=>{if(!r||!Array.isArray(r.tracks)||!r.tracks.length)return;y=r.tracks,window.__LUMI_SET_QUEUE__(y);const w=Math.max(0,Math.min(r.index||0,y.length-1));ht(w,!0)})}const oi="MeloDB",li=1;let oe=null;function Zt(){return oe||(oe=new Promise((t,e)=>{if(typeof indexedDB>"u")return e(new Error("IndexedDB not supported"));const n=indexedDB.open(oi,li);n.onupgradeneeded=()=>{const i=n.result;i.objectStoreNames.contains("tracks")||i.createObjectStore("tracks",{keyPath:"id"}),i.objectStoreNames.contains("playlists")||i.createObjectStore("playlists",{keyPath:"id"}),i.objectStoreNames.contains("kv")||i.createObjectStore("kv",{keyPath:"key"})},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})),oe}async function Ut(t){try{const e=await Zt();return new Promise((n,i)=>{const a=e.transaction("tracks","readwrite"),o=a.objectStore("tracks");o.clear();for(const s of t)o.put(s);a.oncomplete=()=>n(),a.onerror=()=>i(a.error)})}catch{try{localStorage.setItem("melo-tracks",JSON.stringify(t.map(({cover:n,...i})=>i)))}catch{}}}async function re(){try{const t=await Zt();return new Promise(e=>{const a=t.transaction("tracks","readonly").objectStore("tracks").getAll();a.onsuccess=()=>{if(Array.isArray(a.result)&&a.result.length>0)e(a.result);else try{const o=localStorage.getItem("melo-tracks");e(o?JSON.parse(o):[])}catch{e([])}},a.onerror=()=>{try{const o=localStorage.getItem("melo-tracks");e(o?JSON.parse(o):[])}catch{e([])}}})}catch{try{const t=localStorage.getItem("melo-tracks");return t?JSON.parse(t):[]}catch{return[]}}}async function le(t){try{const e=await Zt();return new Promise((n,i)=>{const a=e.transaction("playlists","readwrite"),o=a.objectStore("playlists");o.clear();for(const s of t)o.put(s);a.oncomplete=()=>n(),a.onerror=()=>i(a.error)})}catch{try{localStorage.setItem("melo-playlists",JSON.stringify(t))}catch{}}}async function Ve(){try{const t=await Zt();return new Promise(e=>{const a=t.transaction("playlists","readonly").objectStore("playlists").getAll();a.onsuccess=()=>{if(Array.isArray(a.result)&&a.result.length>0)e(a.result);else try{const o=localStorage.getItem("melo-playlists");e(o?JSON.parse(o):[])}catch{e([])}},a.onerror=()=>{try{const o=localStorage.getItem("melo-playlists");e(o?JSON.parse(o):[])}catch{e([])}}})}catch{try{const t=localStorage.getItem("melo-playlists");return t?JSON.parse(t):[]}catch{return[]}}}const qt=it,Ct=new URLSearchParams(location.search).get("panel")||"main";let et=[],pt=[{id:"p1",name:"Favorites",tracks:[],createdAt:Date.now()}];Ve().then(t=>{Array.isArray(t)&&t.length&&(pt=t)});re().then(t=>{Array.isArray(t)&&t.length&&(et=t)});function Q(t){return String(t!=null?t:"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function si(t){const e=Math.floor(t/60),n=Math.floor(t%60);return`${e}:${String(n).padStart(2,"0")}`}function we(t,e){var me,ge,ve,he,fe;const n=document.getElementById("trackList");document.getElementById("playlistList");const i=document.getElementById("winPlaylistTracks"),a=document.getElementById("winPlaylistEmpty"),o=document.getElementById("playlistSelect"),s=document.getElementById("playlistSortSelect"),p=document.getElementById("searchInput"),d=document.getElementById("playlistSearchInput"),c=document.getElementById("libraryStats"),u=document.getElementById("btn-scan"),v=document.getElementById("btn-export-playlist"),m=document.getElementById("btn-new-playlist"),k=document.getElementById("queueList"),M=document.getElementById("tagEditor"),A=document.getElementById("libScanProgressWrap"),K=document.getElementById("libScanStatusText"),nt=document.getElementById("libScanStatusPct"),_=document.getElementById("libScanProgressBar"),z=document.getElementById("tagTitle"),$=document.getElementById("tagArtist"),P=document.getElementById("tagAlbum"),g=document.getElementById("tagYear");document.getElementById("tagCover");let y="",T="",G="default",at=localStorage.getItem("melo-currentPlaylist")||((me=pt[0])==null?void 0:me.id)||"",gt="artists",ot=null,tt=null,ct=null,vt=null;const ht=document.getElementById("replayGainToggle");if(ht){const l=localStorage.getItem("melo-pref-rg");l!==null&&(ht.checked=l==="1"),ht.addEventListener("change",()=>{localStorage.setItem("melo-pref-rg",ht.checked?"1":"0")})}(ge=document.getElementById("libraryTabs"))==null||ge.querySelectorAll(".tab").forEach(l=>{l.addEventListener("click",()=>{document.querySelectorAll("#libraryTabs .tab").forEach(L=>L.classList.remove("active")),l.classList.add("active"),gt=l.dataset.libtab,ot=tt=ct=vt=null,W()})}),p==null||p.addEventListener("input",()=>{y=((p==null?void 0:p.value)||"").toLowerCase(),W()}),d&&d.addEventListener("input",()=>{T=d.value||"",F()}),s&&s.addEventListener("change",()=>{G=s.value||"default",F()}),Promise.all([re(),Ve()]).then(([l,L])=>{Array.isArray(l)&&l.length&&(et=l),Array.isArray(L)&&L.length&&(pt=L),W(),F(),At()});const dt=document.createElement("div");dt.className="ctx-menu",dt.style.cssText="position:fixed; z-index:99999; background:var(--card-bg, #1a1a1a); border:1px solid var(--card-border, #333); border-radius:8px; padding:4px 0; box-shadow:0 8px 24px rgba(0,0,0,0.5); min-width:140px; display:none;",document.body.appendChild(dt);let ft=null;const Lt=()=>{dt.style.display="none",ft=null};document.addEventListener("click",Lt),document.addEventListener("keydown",l=>{l.key==="Escape"&&Lt()}),dt.addEventListener("click",l=>{var I;l.stopPropagation();const L=(I=l.target.closest("[data-act]"))==null?void 0:I.getAttribute("data-act");if(L==="edit"&&ft)Xe(ft);else if(L==="add-pl"&&ft)r([ft]),e("Added to playlist");else if(L==="remove"&&ft){const f=ft.id;et=et.filter(E=>E.id!==f),pt.forEach(E=>{E.tracks=E.tracks.filter(j=>j!==f)}),Ut(et),xt(),W(),F(),e("Removed from library")}Lt()});function ut(){return pt.find(l=>l.id===at)||pt[0]}function xt(){le(pt),qt&&U("melo:playlists-sync",{src:Ct,playlists:pt})}function Dt(){qt&&U("melo:playlists-sync",{src:Ct,playlists:pt})}function Bt(l){at=l,localStorage.setItem("melo-currentPlaylist",l),F()}rt("melo:playlists-sync",l=>{l&&l.src!==Ct&&Array.isArray(l.playlists)&&(pt=l.playlists,F(),W())});function h(){Ut(et)}function x(l){const L=ut();L&&(L.tracks=l.map(I=>I.id),xt(),Dt(),F())}rt("melo:play-tracks",l=>{!l||!Array.isArray(l.tracks)||!l.tracks.length||l.fromPlaylist||x(l.tracks)}),rt("melo:cover-loaded",l=>{if(l&&(l.id||l.path)&&l.cover){const L=et.find(I=>I.id===l.id||I.path===l.path);L&&(L.cover=l.cover,F())}});function B(l,L=!1){let I=!1;const f=new Set(et.map(E=>E.id));for(const E of l)f.has(E.id)||(et.push(E),f.add(E.id),I=!0);I&&(h(),W(),F()),L&&qt&&U("melo:tracks-add",{src:Ct,list:l})}rt("melo:tracks-add",l=>{l&&l.src!==Ct&&Array.isArray(l.list)&&B(l.list)}),rt("melo:tracks-sync",l=>{l&&l.src!==Ct&&re().then(L=>{Array.isArray(L)&&(et=L,W(),F())})});function r(l){const L=ut();if(!L)return;let I=!1;const f=new Set(L.tracks);for(const E of l)f.has(E.id)||(L.tracks.push(E.id),f.add(E.id),I=!0);I&&(xt(),Dt(),F(),W())}let w=0,b=[],q=0;rt("melo:scan-progress",l=>{if(l&&A&&K&&nt&&_){A.style.display="flex";const L=l.done||0,I=l.total||0,f=I?Math.min(100,Math.round(L/I*100)):0;K.textContent=`Scanning: ${L.toLocaleString()} / ${I.toLocaleString()} files`,nt.textContent=`${f}%`,_.style.width=`${f}%`,clearTimeout(w),(l.finished||I>0&&L>=I)&&(K.textContent=`Scan complete: ${I.toLocaleString()} tracks`,nt.textContent="100%",_.style.width="100%",w=setTimeout(()=>{A&&(A.style.display="none")},2e3))}}),rt("melo:scan-batch",l=>{if(Array.isArray(l)&&l.length){for(const L of l)L.source="scan",b.push(L);q||(q=setTimeout(()=>{if(q=0,b.length){const L=b;b=[];const I=new Set(et.map(E=>E.id));let f=!1;for(const E of L)I.has(E.id)||(et.push(E),I.add(E.id),f=!0);if(f){const E=et.filter(X=>X.source==="scan"),j=new Set(E.map(X=>X.artist)).size,J=new Set(E.map(X=>X.artist+"\0"+X.album)).size;c&&(c.textContent=`${E.length.toLocaleString()} tracks • ${j.toLocaleString()} artists • ${J.toLocaleString()} albums`)}}},400))}}),u==null||u.addEventListener("click",async()=>{if(qt)try{const{open:l}=await V(async()=>{const{open:I}=await import("./index-CS3Qnt9j.js");return{open:I}},__vite__mapDeps([5,1])),L=await l({directory:!0,multiple:!1});if(L){e("Scanning folder in the background…"),A&&(A.style.display="flex");const{invoke:I}=await V(async()=>{const{invoke:E}=await import("./core-DhEqZVGG.js");return{invoke:E}},[]),f=await I("scan_library",{path:L});Array.isArray(f)&&(f.forEach(E=>E.source="scan"),B(f,!0),r(f),await Ut(et),await le(pt),U("melo:tracks-sync",{src:Ct}),W(),F(),e(`Library updated: ${f.length.toLocaleString()} tracks`))}}catch{e("Scanning requires the Tauri build")}else{const l=document.createElement("input");l.type="file",l.multiple=!0,l.accept="audio/*",l.onchange=async()=>{var I;const L=Array.from(l.files||[]);for(const f of L){const E=URL.createObjectURL(f),j=Math.random().toString(36).slice(2),J=((I=f.name.split(".").pop())==null?void 0:I.toUpperCase())||"MP3",X={id:j,title:f.name.replace(/\.[^/.]+$/,""),artist:"Unknown",album:"Imported",genre:"Unknown",year:new Date().getFullYear(),duration:180,path:E,codec:J,specs:"Imported · Stereo",replayGain:0,source:"scan"};await ce(f,X),et.push(X)}await Ut(et),e(`${L.length} file(s) added`),W(),At()},l.click()}});async function D(l){if(!qt)return[];const{invoke:L}=await V(async()=>{const{invoke:f}=await import("./core-DhEqZVGG.js");return{invoke:f}},[]),I=[];for(const f of l)try{const E=await L("scan_library",{path:f});E&&I.push(...E)}catch{}return I}qt&&V(async()=>{const{getCurrentWebviewWindow:l}=await import("./webviewWindow-mjQkSB26.js");return{getCurrentWebviewWindow:l}},__vite__mapDeps([6,7,1,0,8])).then(({getCurrentWebviewWindow:l})=>{l().onDragDropEvent(async I=>{var f;if(I.payload.type==="drop"){const E=I.payload.paths||[];if(!E.length)return;const j=await D(E);if(!j.length)return;j.forEach(J=>J.source="import"),B(j,!0),Ct==="playlist"?(r(j),e(`${j.length} track(s) added to playlist`)):(x(j),U("melo:play-tracks",{tracks:j,index:0}),e(`Playing ${((f=j[0])==null?void 0:f.title)||"track"}`))}})}).catch(()=>{});function H(){return et.filter(l=>l.source==="scan")}const lt=44;function O(l,L,I,f){if(!L.length){l.innerHTML='<div style="padding:30px; text-align:center; color:var(--text-muted); font-size:12px;">No tracks found</div>';return}l.style.position="relative",l.style.overflowY="auto";const E=()=>{const j=l.scrollTop,J=l.clientHeight||400,X=L.length,yt=Math.max(0,Math.floor(j/lt)-4),kt=Math.min(X,Math.ceil((j+J)/lt)+4),Et=yt*lt,Ft=Math.max(0,(X-kt)*lt),st=L.slice(yt,kt).map((S,C)=>{const Y=yt+C,Nt=si(S.duration||0),Jt=S.cover?`<img class="track-cover-mini" src="${S.cover}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" /><div class="track-cover-fallback" style="display:none;"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></div>`:'<div class="track-cover-fallback"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></div>';return I==="library"?`
          <div class="track-row" draggable="true" data-vidx="${Y}" data-id="${Q(S.id)}" style="height:${lt}px; box-sizing:border-box;">
            <span class="num">${Y+1}</span>
            ${Jt}
            <div style="flex:1; min-width:0;">
              <div class="t-title">${Q(S.title)}</div>
              <div class="t-artist">${Q(S.artist)} • ${Q(S.album)}${S.year?" • "+S.year:""}</div>
            </div>
            <span style="font-size:10px; padding:2px 6px; border-radius:6px; background:var(--badge-bg); color:var(--badge-text); border:1px solid var(--card-border);">${Q(S.codec||"AUDIO")}</span>
            <span class="t-dur">${Nt}</span>
            <button class="btn small ghost" data-action="add-queue" data-vidx="${Y}">+</button>
          </div>`:`
          <div class="track-row" draggable="true" data-vidx="${Y}" data-id="${Q(S.id)}" style="height:${lt}px; box-sizing:border-box;">
            <span class="num">${Y+1}</span>
            ${Jt}
            <div style="flex:1; min-width:0;">
              <div class="t-title">${Q(S.title)}</div>
              <div class="t-artist">${Q(S.artist)} • ${Q(S.album)}</div>
            </div>
            <span class="t-dur">${Nt}</span>
            <button class="btn small ghost" data-action="pl-remove" data-vidx="${Y}" title="Remove from playlist">×</button>
          </div>`}).join("");l.innerHTML=`
        <div class="vscroll-wrapper" style="padding-top:${Et}px; padding-bottom:${Ft}px; display:flex; flex-direction:column;">
          ${st}
        </div>
      `};if(!l.__vscrollAttached){l.__vscrollAttached=!0;let j=0;l.addEventListener("scroll",()=>{j&&cancelAnimationFrame(j),j=requestAnimationFrame(()=>{l.__vscrollUpdate&&l.__vscrollUpdate()})}),l.addEventListener("contextmenu",J=>{const yt=J.target.closest(".track-row");if(!yt)return;J.preventDefault(),J.stopPropagation();const kt=parseInt(yt.dataset.vidx||"0",10);ft=(l.__vscrollItems||[])[kt]||null,ft&&(dt.innerHTML=`
          <button class="ctx-item" data-act="edit" style="width:100%; text-align:left; background:transparent; border:none; color:var(--text, #fff); padding:6px 12px; font-size:11px; cursor:pointer; display:flex; align-items:center; gap:8px;">✏️ Edit Metadata</button>
          <button class="ctx-item" data-act="add-pl" style="width:100%; text-align:left; background:transparent; border:none; color:var(--text, #fff); padding:6px 12px; font-size:11px; cursor:pointer; display:flex; align-items:center; gap:8px;">➕ Add to Playlist</button>
          <button class="ctx-item" data-act="remove" style="width:100%; text-align:left; background:transparent; border:none; color:#ff5c5c; padding:6px 12px; font-size:11px; cursor:pointer; display:flex; align-items:center; gap:8px;">🗑️ Remove</button>
        `,dt.style.left=`${Math.min(window.innerWidth-160,J.clientX)}px`,dt.style.top=`${Math.min(window.innerHeight-130,J.clientY)}px`,dt.style.display="block")}),l.addEventListener("click",J=>{const X=J.target,yt=X.closest(".track-row");if(!yt)return;const kt=parseInt(yt.dataset.vidx||"0",10);if(X.closest("[data-action='add-queue']")){J.stopPropagation();const Et=l.__vscrollItems||[];Et[kt]&&It(Et[kt]);return}if(X.closest("[data-action='pl-remove']")){J.stopPropagation();const Et=ut();if(Et){const N=(l.__vscrollItems||[])[kt];if(N){const st=Et.tracks.indexOf(N.id);st>=0&&(Et.tracks.splice(st,1),xt(),F(),e("Removed from playlist"))}}return}f(kt,J)})}l.__vscrollItems=L,l.__vscrollUpdate=E,E()}function F(){if(!i)return;const l=ut();if(o&&(o.innerHTML=pt.map(f=>`<option value="${f.id}" ${l&&f.id===l.id?"selected":""}>${Q(f.name)}</option>`).join("")),!l){i.innerHTML="",i.style.display="none",a&&(a.style.display="block");return}const L=new Map;for(const f of et)L.set(f.id,f),L.set(f.path,f);let I=l.tracks.map((f,E)=>{const j=L.get(f);if(j)return j;const J=f.replace(/^.*[\\/]/,""),X=J.lastIndexOf("."),yt=X>0?J.slice(0,X):J;return{id:f,title:yt||`Track ${E+1}`,artist:"Audio Track",album:l.name,duration:0,path:f,codec:"AUDIO",specs:"Local File",source:"import"}});if(T.trim()){const f=T.toLowerCase().trim();I=I.filter(E=>(E.title||"").toLowerCase().includes(f)||(E.artist||"").toLowerCase().includes(f)||(E.album||"").toLowerCase().includes(f))}G==="title-asc"?I.sort((f,E)=>(f.title||"").localeCompare(E.title||"")):G==="artist-asc"?I.sort((f,E)=>(f.artist||"").localeCompare(E.artist||"")):G==="album-asc"?I.sort((f,E)=>(f.album||"").localeCompare(E.album||"")):G==="dur-asc"?I.sort((f,E)=>(f.duration||0)-(E.duration||0)):G==="dur-desc"&&I.sort((f,E)=>(E.duration||0)-(f.duration||0)),a&&(a.style.display=I.length?"none":"block"),i.style.display=I.length?"flex":"none",O(i,I,"playlist",f=>{I[f]&&U("melo:play-tracks",{tracks:I,index:f,fromPlaylist:!0})})}function W(){var E,j,J,X,yt,kt,Et,Ft;if(!n){F();return}const l=H(),L=new Set(l.map(N=>N.artist)).size,I=new Set(l.map(N=>N.artist+"\0"+N.album)).size;c&&(c.textContent=`${l.length.toLocaleString()} tracks • ${L.toLocaleString()} artists • ${I.toLocaleString()} albums`);const f=y.trim().toLowerCase();if(gt==="artists")if(ot){const N=l.filter(S=>S.artist===ot),st=[...new Set(N.map(S=>S.album))].sort((S,C)=>S.localeCompare(C));if(tt){const S=N.filter(Y=>Y.album===tt);n.innerHTML=`
            <div class="breadcrumb">
              <span class="crumb-link" id="crumbBackArtist">‹ ${Q(ot)}</span>
              <span class="crumb-sep">/</span>
              <span class="crumb-cur">${Q(tt)}</span>
              <button class="btn small primary play-all-btn" id="btnPlayAlbAll">▶ Play Album (${S.length})</button>
            </div>
            <div id="innerVirtualTrackList" style="flex:1; overflow-y:auto;"></div>
          `,(J=document.getElementById("crumbBackArtist"))==null||J.addEventListener("click",()=>{tt=null,W()}),(X=document.getElementById("btnPlayAlbAll"))==null||X.addEventListener("click",()=>{U("melo:play-tracks",{tracks:S,index:0})});const C=document.getElementById("innerVirtualTrackList");C&&O(C,S,"library",Y=>{U("melo:play-tracks",{tracks:S,index:Y})})}else{let S=`
            <div class="breadcrumb">
              <span class="crumb-link" id="crumbBackArtists">‹ All Artists</span>
              <span class="crumb-sep">/</span>
              <span class="crumb-cur">${Q(ot)}</span>
              <button class="btn small primary play-all-btn" id="btnPlayArtistAll">▶ Play All (${N.length})</button>
            </div>
          `;S+=st.map(C=>{var Nt;const Y=N.filter(Jt=>Jt.album===C);return`<div class="lib-item" data-album="${Q(C)}"><div class="lib-avatar alb">💿</div><div style="flex:1;min-width:0;"><div class="t-title">${Q(C)}</div><div class="t-artist">${Y.length} track(s)${(Nt=Y[0])!=null&&Nt.year?" • "+Y[0].year:""}</div></div><span class="chev-r">›</span></div>`}).join(""),n.innerHTML=S,(E=document.getElementById("crumbBackArtists"))==null||E.addEventListener("click",()=>{ot=null,W()}),(j=document.getElementById("btnPlayArtistAll"))==null||j.addEventListener("click",()=>{U("melo:play-tracks",{tracks:N,index:0})}),n.querySelectorAll("[data-album]").forEach(C=>{C.addEventListener("click",()=>{tt=C.dataset.album,W()})})}}else{const N=[...new Set(l.map(S=>S.artist))].sort((S,C)=>S.localeCompare(C)),st=f?N.filter(S=>S.toLowerCase().includes(f)):N;n.innerHTML=st.map(S=>{const C=l.filter(Y=>Y.artist===S).length;return`<div class="lib-item" data-artist="${Q(S)}"><div class="lib-avatar">${Q((S[0]||"?").toUpperCase())}</div><div style="flex:1;min-width:0;"><div class="t-title">${Q(S)}</div><div class="t-artist">${C} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No artists found.</div>',n.querySelectorAll("[data-artist]").forEach(S=>{S.addEventListener("click",()=>{ot=S.dataset.artist,tt=null,W()})})}else if(gt==="albums")if(ct){const[N,st]=ct.split("\0"),S=l.filter(Y=>Y.artist===N&&Y.album===st);n.innerHTML=`
          <div class="breadcrumb">
            <span class="crumb-link" id="crumbBackAlbums">‹ All Albums</span>
            <span class="crumb-sep">/</span>
            <span class="crumb-cur">${Q(st)}</span>
            <button class="btn small primary play-all-btn" id="btnPlayAlbumKey">▶ Play (${S.length})</button>
          </div>
          <div id="innerVirtualTrackList" style="flex:1; overflow-y:auto;"></div>
        `,(yt=document.getElementById("crumbBackAlbums"))==null||yt.addEventListener("click",()=>{ct=null,W()}),(kt=document.getElementById("btnPlayAlbumKey"))==null||kt.addEventListener("click",()=>{U("melo:play-tracks",{tracks:S,index:0})});const C=document.getElementById("innerVirtualTrackList");C&&O(C,S,"library",Y=>{U("melo:play-tracks",{tracks:S,index:Y})})}else{const N=new Map;l.forEach(C=>{const Y=C.artist+"\0"+C.album;N.has(Y)?N.get(Y).count++:N.set(Y,{artist:C.artist,album:C.album,count:1,year:C.year||0})});const st=Array.from(N.values()).sort((C,Y)=>C.album.localeCompare(Y.album)),S=f?st.filter(C=>C.album.toLowerCase().includes(f)||C.artist.toLowerCase().includes(f)):st;n.innerHTML=S.map(C=>`
          <div class="lib-item" data-albkey="${Q(C.artist+"\0"+C.album)}">
            <div class="lib-avatar alb">💿</div>
            <div style="flex:1;min-width:0;">
              <div class="t-title">${Q(C.album)}</div>
              <div class="t-artist">${Q(C.artist)} • ${C.count} track(s)${C.year?" • "+C.year:""}</div>
            </div>
            <span class="chev-r">›</span>
          </div>
        `).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No albums found.</div>',n.querySelectorAll("[data-albkey]").forEach(C=>{C.addEventListener("click",()=>{ct=C.dataset.albkey,W()})})}else if(gt==="genres")if(vt){const N=l.filter(S=>(S.genre||"Unknown")===vt);n.innerHTML=`
          <div class="breadcrumb">
            <span class="crumb-link" id="crumbBackGenres">‹ All Genres</span>
            <span class="crumb-sep">/</span>
            <span class="crumb-cur">${Q(vt)}</span>
            <button class="btn small primary play-all-btn" id="btnPlayGenreAll">▶ Play (${N.length})</button>
          </div>
          <div id="innerVirtualTrackList" style="flex:1; overflow-y:auto;"></div>
        `,(Et=document.getElementById("crumbBackGenres"))==null||Et.addEventListener("click",()=>{vt=null,W()}),(Ft=document.getElementById("btnPlayGenreAll"))==null||Ft.addEventListener("click",()=>{U("melo:play-tracks",{tracks:N,index:0})});const st=document.getElementById("innerVirtualTrackList");st&&O(st,N,"library",S=>{U("melo:play-tracks",{tracks:N,index:S})})}else{const N=[...new Set(l.map(S=>S.genre||"Unknown"))].sort((S,C)=>S.localeCompare(C)),st=f?N.filter(S=>S.toLowerCase().includes(f)):N;n.innerHTML=st.map(S=>{const C=l.filter(Y=>(Y.genre||"Unknown")===S).length;return`<div class="lib-item" data-genre="${Q(S)}"><div class="lib-avatar gen">🏷️</div><div style="flex:1;min-width:0;"><div class="t-title">${Q(S)}</div><div class="t-artist">${C} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No genres found.</div>',n.querySelectorAll("[data-genre]").forEach(S=>{S.addEventListener("click",()=>{vt=S.dataset.genre,W()})})}F()}function It(l){U("melo:add-queue",l),e(`Queued: ${l.title}`)}function At(){if(!k)return;const l=window.LumiPlayer,L=(l==null?void 0:l.queue)||et.slice(0,4);if(!L.length){k.innerHTML='<div style="text-align:center;color:var(--text-muted);font-size:12px;padding:12px;">Queue is empty</div>';return}k.innerHTML=L.map((I,f)=>{var E;return`
      <div class="track-row" data-id="${I.id}" data-queue-idx="${f}" style="padding:6px 8px;border-radius:8px;border:1px solid ${f===((E=l==null?void 0:l.currentIndex)!=null?E:0)?"var(--accent)":"transparent"};">
        <img class="track-cover-mini" src="${I.cover||""}" style="width:24px;height:24px;${I.cover?"":"display:none"}" />
        <div style="flex:1;min-width:0;">
          <div class="t-title" style="font-size:11.5px;">${Q(I.title)}</div>
          <div class="t-artist" style="font-size:10px;">${Q(I.artist)}</div>
        </div>
      </div>
    `}).join("")}m==null||m.addEventListener("click",()=>{const l=prompt("New playlist name:");if(!l)return;const L={id:"pl_"+Math.random().toString(36).slice(2,9),name:l.trim(),tracks:[],createdAt:Date.now()};pt.push(L),xt(),Bt(L.id),e(`Playlist "${L.name}" created`)}),o&&o.addEventListener("change",()=>{Bt(o.value)}),v==null||v.addEventListener("click",()=>{const l=ut();if(!l||!l.tracks.length)return e("Current playlist is empty");const L=["#EXTM3U",...l.tracks.map(j=>{const J=et.find(X=>X.id===j);return J?J.path:j})].join(`
`),I=new Blob([L],{type:"audio/x-mpegurl"}),f=URL.createObjectURL(I),E=document.createElement("a");E.href=f,E.download=`${l.name||"playlist"}.m3u`,E.click(),URL.revokeObjectURL(f),e("M3U Playlist exported")});let Mt=null;function Xe(l){if(Mt=l,!Mt||!M)return e("No track to edit");M.style.display="flex",z&&(z.value=Mt.title||""),$&&($.value=Mt.artist||""),P&&(P.value=Mt.album||""),g&&(g.value=String(Mt.year||""))}(ve=document.getElementById("btn-tag-cancel"))==null||ve.addEventListener("click",()=>{M&&(M.style.display="none")}),(he=document.getElementById("btn-tag-save"))==null||he.addEventListener("click",async()=>{const l=Mt;if(!(!l||!M)){if(l.title=(z==null?void 0:z.value.trim())||l.title,l.artist=($==null?void 0:$.value.trim())||l.artist,l.album=(P==null?void 0:P.value.trim())||l.album,l.year=parseInt((g==null?void 0:g.value)||"0",10)||0,qt&&l.path)try{const{invoke:L}=await V(async()=>{const{invoke:I}=await import("./core-DhEqZVGG.js");return{invoke:I}},[]);await L("write_tags",{path:l.path,tags:{title:l.title,artist:l.artist,album:l.album}})}catch{}M.style.display="none",await Ut(et),W(),F(),U("melo:tag-updated",l),e("Metadata saved")}}),(fe=document.getElementById("btn-clear-library"))==null||fe.addEventListener("click",async()=>{confirm("Are you sure you want to clear the entire library database? This cannot be undone.")&&(et=[],pt.forEach(l=>l.tracks=[]),await Ut([]),await le(pt),U("melo:tracks-sync",{src:Ct}),U("melo:playlists-sync",{src:Ct,playlists:pt}),W(),F(),At(),e("Library database cleared"))}),window.LumiLibrary={get tracks(){return et},get playlists(){return pt},render:W,addTracks:B,replaceCurrentPlaylist:x,addToCurrentPlaylist:r,importPaths:D,currentPlaylistName:()=>{var l;return((l=ut())==null?void 0:l.name)||"Playlist"}}}const Gt={flat:[0,0,0,0,0,0,0,0,0,0],pop:[-1,2,4,4,2,-1,-1,2,3,3],rock:[4,3,2,-1,-2,-2,1,3,4,4],bass:[6,5,4,2,1,0,-1,-1,-2,-3],treble:[-3,-2,-1,0,1,2,3,5,6,6],dance:[5,4,2,0,-1,-1,2,4,5,3],jazz:[2,1,2,3,2,0,1,2,3,2],classical:[3,2,1,0,0,0,-1,2,3,4],vocal:[-2,-1,0,2,4,4,3,1,0,-1],acoustic:[3,2,1,1,2,2,3,3,2,1],hiphop:[5,4,1,2,-1,-1,1,-1,2,3],metal:[4,2,-1,-2,-1,1,3,4,5,4]};function se(t){for(const[e,n]of Object.entries(Gt))if(n.every((i,a)=>i===t[a]))return e;return"custom"}function xe(t,e,n={}){const i=!!n.remote,a=document.getElementById("eqEnable"),o=document.getElementById("eqPreset"),s=document.getElementById("btnEqReset"),p=document.getElementById("eqBands"),d=document.getElementById("eqCanvas"),c=d?d.getContext("2d"):null;let u=null,v=[],m=[],k=new Array(jt.length).fill(0);try{const g=JSON.parse(localStorage.getItem("melo-eq-gains")||"null");Array.isArray(g)&&g.length===jt.length&&(k=g.map(y=>typeof y=="number"?Math.max(-12,Math.min(12,y)):0))}catch{}let M=localStorage.getItem("melo-eq-preset")||se(k),A=localStorage.getItem("melo-eq-enabled")!=="0";function K(){if(!u)try{const g=Qt(t);u=g.ctx,v=g.filters,v.forEach((y,T)=>{y.gain.value=A?k[T]:0})}catch{}}function nt(g,y){K(),v[g]&&A&&(v[g].gain.value=y)}function _(g){K(),k=[...g],A&&g.forEach((y,T)=>{v[T]&&(v[T].gain.value=y)}),P()}function z(g){K(),A=g,g?k.forEach((y,T)=>{v[T]&&(v[T].gain.value=y)}):v.forEach(y=>{y.gain.value=0}),P()}i||t&&t.addEventListener("play",()=>{K(),(u==null?void 0:u.state)==="suspended"&&u.resume().catch(()=>{})}),rt("melo:eq",g=>{g&&(g.type==="gain"?(i||nt(g.idx,g.val),k[g.idx]=g.val,m[g.idx]&&(m[g.idx].value=String(g.val),$(m[g.idx])),o&&(o.value=se(k)),P()):g.type==="gains"?(i||_(g.values),k=[...g.values],m.length&&m.forEach((y,T)=>{y.value=String(k[T]),$(y)}),o&&g.preset&&(o.value=g.preset),P()):g.type==="enable"&&(A=!!g.on,i||z(A),a&&(a.checked=A),P()))});function $(g){var G;const y=parseInt(g.value),T=(G=g.parentElement)==null?void 0:G.querySelector(".val");T&&(T.textContent=(y>0?"+":"")+y+"dB")}function P(){if(!d||!c)return;const g=window.devicePixelRatio||1,y=d.clientWidth*g,T=d.clientHeight*g;if(y<=0||T<=0)return;d.width=y,d.height=T,c.clearRect(0,0,y,T);const G=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#2a7bd6",at=k;if(!A){c.strokeStyle="rgba(100,120,150,0.25)",c.lineWidth=2*g,c.beginPath(),c.moveTo(0,T/2),c.lineTo(y,T/2),c.stroke();return}c.strokeStyle=G,c.lineWidth=2.5*g,c.lineJoin="round",c.beginPath(),at.forEach((gt,ot)=>{const tt=ot/(at.length-1)*y,ct=T/2-gt/12*(T/2-10*g);if(ot===0)c.moveTo(tt,ct);else{const vt=(ot-1)/(at.length-1)*y,ht=T/2-at[ot-1]/12*(T/2-10*g);c.quadraticCurveTo((vt+tt)/2,ht,tt,ct)}}),c.stroke(),at.forEach((gt,ot)=>{const tt=ot/(at.length-1)*y,ct=T/2-gt/12*(T/2-10*g);c.fillStyle=G,c.beginPath(),c.arc(tt,ct,4*g,0,Math.PI*2),c.fill(),c.fillStyle="white",c.beginPath(),c.arc(tt,ct,2*g,0,Math.PI*2),c.fill()}),c.strokeStyle="rgba(100,120,150,0.3)",c.lineWidth=1*g,c.setLineDash([4*g,4*g]),c.beginPath(),c.moveTo(0,T/2),c.lineTo(y,T/2),c.stroke(),c.setLineDash([])}p&&(p.innerHTML="",jt.forEach((g,y)=>{const T=k[y]||0,G=document.createElement("div");G.className="eq-band",G.innerHTML=`
        <input type="range" min="-12" max="12" value="${T}" step="1" data-idx="${y}" orient="vertical" />
        <label>${g>=1e3?g/1e3+"k":g}</label>
        <span style="font-size:10px;color:var(--text-muted);min-height:12px;" class="val">${(T>0?"+":"")+T+"dB"}</span>
      `,p.appendChild(G)}),m=Array.from(p.querySelectorAll("input")),m.forEach(g=>{g.addEventListener("input",()=>{const y=parseInt(g.dataset.idx),T=parseInt(g.value);$(g),k[y]=T,P();const G=se(k);o&&(o.value=G),localStorage.setItem("melo-eq-gains",JSON.stringify(k)),localStorage.setItem("melo-eq-preset",G),i||nt(y,T),U("melo:eq",{type:"gain",idx:y,val:T,values:k})})})),o&&(o.value=M,o.addEventListener("change",()=>{const g=Gt[o.value]||Gt.flat;m.length&&m.forEach((y,T)=>{y.value=String(g[T]),$(y)}),k=[...g],P(),localStorage.setItem("melo-eq-gains",JSON.stringify(k)),localStorage.setItem("melo-eq-preset",o.value),i||_(g),U("melo:eq",{type:"gains",values:g,preset:o.value}),e(`Preset: ${o.options[o.selectedIndex].text}`)})),s&&s.addEventListener("click",()=>{const g=Gt.flat;m.length&&m.forEach((y,T)=>{y.value="0",$(y)}),k=[...g],o&&(o.value="flat"),localStorage.setItem("melo-eq-gains",JSON.stringify(k)),localStorage.setItem("melo-eq-preset","flat"),i||_(g),U("melo:eq",{type:"gains",values:g,preset:"flat"}),P(),e("Equalizer reset to Flat (0dB)")}),a&&(a.checked=A,a.addEventListener("change",()=>{A=a.checked,localStorage.setItem("melo-eq-enabled",A?"1":"0"),i||z(A),U("melo:eq",{type:"enable",on:A}),P(),e(A?"Equalizer On":"Equalizer off — Flat")})),d&&new ResizeObserver(()=>P()).observe(d),P(),window.LumiEqualizer={presets:Gt,frequencies:jt,displayGains:k,reset:()=>s==null?void 0:s.click()}}const Ht=[{id:"bars",label:"Classic Bars"},{id:"thin",label:"Thin Bars"},{id:"line",label:"Spectrum Line"},{id:"mirror",label:"Mirror Bars"},{id:"wave",label:"Oscilloscope"}];function ri(t){let e=document.getElementById("vizBars");if(!e)return;let n=A(e),i=n.getContext("2d"),a=null,o=null,s=null,p=null,d=null,c=!1,u=localStorage.getItem("melo-viz-mode")||"bars";Ht.some(h=>h.id===u)||(u="bars");let v=0,m=[],k=.45,M=null;function A(h){let x=h.querySelector("canvas");return x||(h.innerHTML="",x=document.createElement("canvas"),h.appendChild(x)),x}function K(){if(!(o&&s))try{const h=Qt(t);a=h.ctx,o=h.analyser,s=new Uint8Array(o.frequencyBinCount),p=new Uint8Array(o.fftSize)}catch{c=!0}}function nt(h){const x=s.length,B=((a==null?void 0:a.sampleRate)||44100)/2,r=45,w=Math.min(15e3,B*.95),b=Math.log(r),q=Math.log(w),D=[];for(let H=0;H<h;H++){const lt=Math.exp(b+(q-b)*H/h),O=Math.exp(b+(q-b)*(H+1)/h);let F=Math.floor(lt/B*x),W=Math.max(F+1,Math.ceil(O/B*x));F<0&&(F=0),W>x&&(W=x);let It=0;for(let At=F;At<W;At++)It+=s[At];D.push(It/(W-F)/255)}return D}function _(h){const x=performance.now()/1e3,B=Math.pow(Math.abs(Math.sin(x*2.2)),2.5),r=[];for(let w=0;w<h;w++){let b=.42+.26*Math.sin(x*1.35+w*.62)+.2*Math.sin(x*2.9+w*1.31)+Math.random()*.07;b*=.55+.5*B,r.push(Math.max(.04,Math.min(1,b)))}return r}function z(h){const x=performance.now()/1e3,B=.5+.5*Math.pow(Math.abs(Math.sin(x*1.9)),2);for(let r=0;r<h.length;r++){const w=r/h.length;h[r]=128+66*B*(Math.sin(w*Math.PI*6+x*7)*.6+Math.sin(w*Math.PI*13-x*11)*.4)}}function $(h){let x;if(c||!o||!s)x=_(h);else if(o.getByteFrequencyData(s),x=nt(h),!x.some(w=>w>.01)&&!t.paused)x=_(h);else for(let w=0;w<h;w++)x[w]*=1+1.7*(w/Math.max(1,h-1));let B=0;for(const r of x)r>B&&(B=r);B>k?k=B:k=Math.max(.35,k*.985),m.length!==h&&(m=new Array(h).fill(0));for(let r=0;r<h;r++){const w=Math.min(1,x[r]/k),b=w>m[r]?.55:.16;m[r]+=(w-m[r])*b}return m}function P(h,x){return getComputedStyle(document.documentElement).getPropertyValue(h).trim()||x}function g(){return n.width/Math.max(1,n.clientWidth)||1}function y(h,x,B,r,w){if(w=Math.min(w,B/2,r/2),i.roundRect){i.roundRect(h,x,B,r,w);return}i.rect(h,x,B,r)}function T(){const h=window.devicePixelRatio||1,x=n.clientWidth||(e==null?void 0:e.clientWidth)||200,B=n.clientHeight||(e==null?void 0:e.clientHeight)||56;x>0&&B>0&&(n.width=Math.round(x*h),n.height=Math.round(B*h))}new ResizeObserver(T).observe(n),T();function G(h,x,B,r){const w=g(),b=P("--visualizer","#38bdf8"),q=P("--accent","#0284c7"),D=h.length,H=x/D,lt=Math.max(1.2*w,H*(1-r));for(let O=0;O<D;O++){const F=h[O],W=Math.max(2*w,F*(B-4*w)),It=O*H+(H-lt)/2,At=B-W-1*w,Mt=i.createLinearGradient(0,At,0,B);Mt.addColorStop(0,q),Mt.addColorStop(1,b),i.fillStyle=Mt,i.beginPath(),y(It,At,lt,W,Math.min(lt/2,3.5*w)),i.fill()}}function at(h,x,B){const r=g(),w=P("--visualizer","#38bdf8"),b=P("--accent","#0284c7"),q=h.length,D=x/q,H=B/2,lt=Math.max(1.5*r,D*.62);for(let O=0;O<q;O++){const F=Math.max(1.5*r,h[O]*(B/2-3*r)),W=O*D+(D-lt)/2,It=i.createLinearGradient(0,H-F,0,H+F);It.addColorStop(0,b),It.addColorStop(.5,w),It.addColorStop(1,b),i.fillStyle=It,i.beginPath(),y(W,H-F,lt,F*2,Math.min(lt/2,3*r)),i.fill()}}function gt(h,x,B){const r=g(),w=P("--visualizer","#38bdf8"),b=P("--accent","#0284c7"),q=h.length,D=[],H=[];for(let O=0;O<q;O++)D.push((O+.5)/q*x),H.push(B-2*r-h[O]*(B-8*r));i.beginPath(),i.moveTo(D[0],B),i.lineTo(D[0],H[0]);for(let O=1;O<q;O++){const F=(D[O-1]+D[O])/2;i.quadraticCurveTo(D[O-1],H[O-1],F,(H[O-1]+H[O])/2)}i.lineTo(D[q-1],H[q-1]),i.lineTo(D[q-1],B),i.closePath();const lt=i.createLinearGradient(0,0,0,B);lt.addColorStop(0,w),lt.addColorStop(1,"transparent"),i.globalAlpha=.18,i.fillStyle=lt,i.fill(),i.globalAlpha=1,i.beginPath(),i.moveTo(D[0],H[0]);for(let O=1;O<q;O++){const F=(D[O-1]+D[O])/2;i.quadraticCurveTo(D[O-1],H[O-1],F,(H[O-1]+H[O])/2)}i.lineTo(D[q-1],H[q-1]),i.strokeStyle=b,i.lineWidth=2*r,i.lineJoin="round",i.stroke()}function ot(){const h=n.width,x=n.height,B=g(),r=P("--accent","#0284c7");let w;c||!o||!p?(d||(d=new Uint8Array(1024)),z(d),w=d):(o.getByteTimeDomainData(p),w=p);const b=()=>{i.beginPath();for(let q=0;q<=h;q+=2){const D=Math.min(w.length-1,Math.floor(q/h*w.length)),H=w[D]/255*x;q===0?i.moveTo(q,H):i.lineTo(q,H)}};b(),i.strokeStyle=r,i.globalAlpha=.16,i.lineWidth=6*B,i.lineJoin="round",i.stroke(),b(),i.globalAlpha=1,i.lineWidth=1.8*B,i.stroke()}function tt(){const h=n.width,x=n.height;if(!h||!x)return;if(i.clearRect(0,0,h,x),u==="wave"){ot();return}const r=$(u==="bars"?16:u==="thin"?56:u==="line"?64:24);u==="bars"?G(r,h,x,.34):u==="thin"?G(r,h,x,.32):u==="line"?gt(r,h,x):u==="mirror"&&at(r,h,x)}function ct(){v=requestAnimationFrame(ct),tt()}function vt(){v||ct()}function ht(h,x=!1){var B;if(u=h,m=[],localStorage.setItem("melo-viz-mode",h),!x){const r=window.__TOAST__,w=(B=Ht.find(b=>b.id===h))==null?void 0:B.label;r&&w&&r(`Visualizer: ${w}`)}}function dt(){return M||(M=document.createElement("div"),M.className="viz-menu",M.style.display="none",document.body.appendChild(M),M)}function ft(){const h=dt();h.innerHTML='<div class="viz-menu-label">Visualizer type</div>'+Ht.map(x=>`<button class="viz-menu-item ${x.id===u?"active":""}" data-mode="${x.id}">${x.id===u?"✓":""}<span>${x.label}</span></button>`).join(""),h.querySelectorAll("[data-mode]").forEach(x=>{x.addEventListener("click",B=>{B.stopPropagation(),ht(x.dataset.mode),ut()})})}function Lt(h,x){ft();const B=M;B.style.display="block";const r=B.getBoundingClientRect();B.style.left=Math.max(8,Math.min(h,window.innerWidth-r.width-8))+"px",B.style.top=Math.max(8,Math.min(x,window.innerHeight-r.height-8))+"px"}function ut(){M&&(M.style.display="none")}function xt(){e&&(e.title="Click: next mode • Right-click: choose mode",e.addEventListener("click",()=>{ut();const h=Ht.findIndex(x=>x.id===u);ht(Ht[(h+1)%Ht.length].id)}),e.addEventListener("contextmenu",h=>{h.preventDefault(),h.stopPropagation(),Lt(h.clientX,h.clientY)}))}document.addEventListener("click",h=>{M&&M.style.display!=="none"&&!M.contains(h.target)&&ut()}),document.addEventListener("keydown",h=>{h.key==="Escape"&&ut()});function Dt(){K(),vt(),(a==null?void 0:a.state)==="suspended"&&a.resume().catch(()=>{})}t.addEventListener("play",Dt),Dt(),xt(),document.addEventListener("visibilitychange",()=>{document.hidden?(cancelAnimationFrame(v),v=0):vt()});function Bt(){cancelAnimationFrame(v),v=0,e=document.getElementById("vizBars"),e&&(n=A(e),i=n.getContext("2d"),new ResizeObserver(T).observe(n),T(),xt(),vt())}window.__LUMI_REBIND_VISUALIZER__=Bt}function ke(t){if(!t||!t.trim())return{isSynced:!1,lines:[],raw:""};const e=[],n=t.split(/\r?\n/),i=/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;let a=!1;for(const o of n){const s=o.trim();if(!s||/^\[[a-z]{2,8}:/i.test(s))continue;const p=[...s.matchAll(i)];if(p.length>0){a=!0;const d=s.replace(i,"").trim();for(const c of p){const u=parseInt(c[1],10),v=parseInt(c[2],10),m=c[3]||"0",k=m.length===2?parseInt(m,10)*10:m.length===1?parseInt(m,10)*100:parseInt(m.slice(0,3),10),M=u*60+v+k/1e3;e.push({time:M,text:d})}}else e.push({time:-1,text:s})}return e.sort((o,s)=>o.time-s.time),{isSynced:a,lines:e,raw:t}}function Ee(t,e){const n=document.getElementById("lyricsContainer"),i=document.getElementById("lyricsStatus"),a=document.getElementById("lyricsTrackTitle");let o={isSynced:!1,lines:[]},s=-1;async function p(m){if(m.lyrics&&m.lyrics.trim().length>0)return m.lyrics;if(window.__TAURI__)try{const{invoke:k}=await V(async()=>{const{invoke:A}=await import("./core-DhEqZVGG.js");return{invoke:A}},[]),M=await k("get_track_lyrics",{path:m.path});if(M)return M}catch{}return null}async function d(m){if(!m){o={isSynced:!1,lines:[],raw:""},c();return}m.id,a&&(a.textContent=`${m.title} — ${m.artist}`);const k=await p(m);o=ke(k||""),c()}function c(){if(n){if(n.innerHTML="",s=-1,!o.lines.length){i&&(i.style.display="block",i.innerHTML='No synced lyrics found (.lrc)<br/><span style="font-size:10.5px; opacity:0.7;">Place a matching .lrc file in the song folder or add lyrics in the tag editor.</span>');return}i&&(i.style.display="none"),o.lines.forEach((m,k)=>{const M=document.createElement("div");M.className="lyric-line",M.dataset.idx=String(k),M.dataset.time=String(m.time),M.textContent=m.text||"♪",m.time>=0&&(M.style.cursor="pointer",M.title=`Seek to ${Math.floor(m.time/60)}:${Math.floor(m.time%60).toString().padStart(2,"0")}`,M.addEventListener("click",()=>{t.currentTime=m.time,t.play().catch(()=>{})})),n.appendChild(M)})}}function u(){if(!n||!o.isSynced||!o.lines.length)return;const m=t.currentTime;let k=-1;for(let M=0;M<o.lines.length&&o.lines[M].time<=m;M++)k=M;if(k!==s){s=k;const M=n.querySelectorAll(".lyric-line");if(M.forEach((A,K)=>{A.classList.toggle("active",K===s),A.classList.toggle("passed",K<s)}),s>=0&&M[s]){const A=M[s],K=n.clientHeight,_=A.offsetTop-n.offsetTop-K/2+A.clientHeight/2;n.scrollTo({top:Math.max(0,_),behavior:"smooth"})}}}t.addEventListener("timeupdate",u),window.addEventListener("lumi:trackChange",m=>{d(m.detail)}),rt("melo:track-changed",m=>{d(m)});const v=window.__LUMI_QUEUE__;Array.isArray(v)&&v.length>0&&d(v[0]),window.LumiLyrics={loadTrackLyrics:d,parseLRC:ke}}let zt=null;const Se=`<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  :root {
    --card: #ffffff;
    --card-border: rgba(0, 0, 0, 0.08);
    --text: #111827;
    --text-soft: #6b7280;
    --text-muted: #9ca3af;
    --accent: #5b92a5;
    --track-bg: #e5e7eb;
    --shadow: 0 12px 32px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04);
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: transparent !important;
    color: var(--text);
    overflow: hidden;
    height: 100vh;
    display: flex;
    align-items: stretch;
  }
  .player-card {
    background: var(--card) !important;
    border: 1px solid var(--card-border) !important;
    border-radius: 24px !important;
    box-shadow: var(--shadow) !important;
    padding: 10px 18px 12px 18px !important;
    width: 100% !important;
    height: 100vh !important;
    min-height: 100vh !important;
    max-height: 100vh !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    position: relative !important;
    box-sizing: border-box !important;
    overflow: hidden !important;
  }
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
    border-radius: 6px; cursor: pointer; letter-spacing: 0.02em;
  }
  .app-name-btn:hover { background: var(--track-bg); }
  .mini-btn {
    width: 22px; height: 22px; border-radius: 5px; border: none;
    background: transparent; color: var(--text-soft); display: grid;
    place-items: center; cursor: pointer; font-size: 11px;
    transition: all 0.15s; padding: 0;
  }
  .mini-btn:hover { background: var(--track-bg); color: var(--text); }
  .mini-btn.active { color: var(--accent); background: rgba(91, 146, 165, 0.15); font-weight: bold; }
  .mini-sep { width: 1px; height: 12px; background: var(--card-border); margin: 0 2px; }
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
  .player-main {
    display: flex !important;
    align-items: center !important;
    gap: 14px !important;
    flex: 1 !important;
    margin-top: 0 !important;
    min-height: 0 !important;
  }
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
    background: #e2e8f0 !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.10) !important;
    flex-shrink: 0 !important;
    border: 2px solid #ffffff !important;
  }
  .cover-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .cover-fallback { width: 100%; height: 100%; display: grid; place-items: center; background: linear-gradient(135deg, #a5b4fc, #67e8f9); color: white; font-size: 24px; }
  .track-info {
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    min-width: 130px !important;
    max-width: 200px !important;
    flex-shrink: 0 !important;
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
    background: linear-gradient(to right, #5b92a5 0%, #5b92a5 var(--progress, 35%), #e5e7eb var(--progress, 35%), #e5e7eb 100%) !important;
    outline: none !important;
    cursor: pointer !important;
  }
  input[type="range"].seek::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    width: 15px !important;
    height: 15px !important;
    border-radius: 50% !important;
    background: #ffffff !important;
    border: 3.5px solid #5b92a5 !important;
    box-shadow: 0 1px 4px rgba(0,0,0,0.18) !important;
    cursor: pointer !important;
    transition: transform 0.1s !important;
  }
  input[type="range"].seek::-webkit-slider-thumb:hover { transform: scale(1.2) !important; }
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
    color: #4b5563 !important;
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
    color: #111827 !important;
    background: var(--track-bg) !important;
    transform: scale(1.08) !important;
  }
  .transport button.active {
    color: var(--accent) !important;
    background: rgba(91, 146, 165, 0.15) !important;
  }
  .transport button svg, .transport .icon-btn svg { width: 16px !important; height: 16px !important; }
  .transport .play-btn { width: 32px !important; height: 32px !important; }
  .transport .play-btn svg { width: 20px !important; height: 20px !important; }
  .hidden-helper { display: none !important; }
</style>
</head>
<body>
<div id="lumi-player">
  <div class="player-titlebar" data-tauri-drag-region>
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
      <button class="mini-btn" id="btnOpenSettings" title="Settings">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
      </button>
    </div>
    <div class="win-controls">
      <button class="win-btn" aria-label="minimize" title="Minimize">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="2" y1="6" x2="10" y2="6" stroke-linecap="round"/></svg>
      </button>
      <button class="win-btn close" aria-label="close" title="Close">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="2.5" y1="2.5" x2="9.5" y2="9.5" stroke-linecap="round"/><line x1="9.5" y1="2.5" x2="2.5" y2="9.5" stroke-linecap="round"/></svg>
      </button>
    </div>
  </div>

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
      <button class="icon-btn" id="btnShuffle" title="Shuffle (S)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5"/><path d="M4 20l8-8"/><path d="M21 3l-8 8"/><path d="M16 21h5v-5"/><path d="M4 4l5 5"/><path d="M9 15l-5 5"/></svg>
      </button>
      <button class="icon-btn" id="btnPrev" title="Previous">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>
      </button>
      <button class="play-btn" id="btnPlay" title="Play / Pause (Space)">
        <svg id="iconPause" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        <svg id="iconPlay" viewBox="0 0 24 24" fill="currentColor" style="display:none"><path d="M8 5v14l11-7z"/></svg>
      </button>
      <button class="icon-btn" id="btnNext" title="Next">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="m6 18 8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
      </button>
      <button class="icon-btn" id="btnRepeat" title="Repeat (R)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
      </button>
    </div>
  </div>

  <div class="hidden-helper">
    <input id="volBar" type="range" min="0" max="100" value="60"/>
    <span id="volIcon">🔊</span>
    <span id="volPct">60%</span>
    <div id="vizBars"></div>
  </div>
</div>
</body>
</html>`,Le=`<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  :root {
    --card: #151b23;
    --card-border: rgba(255, 255, 255, 0.1);
    --text: #f3f4f6;
    --text-soft: #9ca3af;
    --text-muted: #6b7280;
    --accent: #4db6ac;
    --track-bg: #212833;
    --shadow: 0 16px 36px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3);
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: transparent !important;
    color: var(--text);
    overflow: hidden;
    height: 100vh;
    display: flex;
    align-items: stretch;
  }
  .player-card {
    background: var(--card) !important;
    border: 1px solid var(--card-border) !important;
    border-radius: 24px !important;
    box-shadow: var(--shadow) !important;
    padding: 10px 18px 12px 18px !important;
    width: 100% !important;
    height: 100vh !important;
    min-height: 100vh !important;
    max-height: 100vh !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    position: relative !important;
    box-sizing: border-box !important;
    overflow: hidden !important;
  }
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
    border-radius: 6px; cursor: pointer; letter-spacing: 0.02em;
  }
  .app-name-btn:hover { background: var(--track-bg); }
  .mini-btn {
    width: 22px; height: 22px; border-radius: 5px; border: none;
    background: transparent; color: var(--text-soft); display: grid;
    place-items: center; cursor: pointer; font-size: 11px;
    transition: all 0.15s; padding: 0;
  }
  .mini-btn:hover { background: var(--track-bg); color: var(--text); }
  .mini-btn.active { color: var(--accent); background: rgba(77, 182, 172, 0.2); font-weight: bold; }
  .mini-sep { width: 1px; height: 12px; background: var(--card-border); margin: 0 2px; }
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
  .player-main {
    display: flex !important;
    align-items: center !important;
    gap: 14px !important;
    flex: 1 !important;
    margin-top: 0 !important;
    min-height: 0 !important;
  }
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
    background: #0d1117 !important;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4) !important;
    flex-shrink: 0 !important;
    border: 2px solid #30363d !important;
  }
  .cover-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .cover-fallback { width: 100%; height: 100%; display: grid; place-items: center; background: linear-gradient(135deg, #1e293b, #0f766e); color: #5eead4; font-size: 24px; }
  .track-info {
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    min-width: 130px !important;
    max-width: 200px !important;
    flex-shrink: 0 !important;
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
    background: linear-gradient(to right, #4db6ac 0%, #4db6ac var(--progress, 35%), #212833 var(--progress, 35%), #212833 100%) !important;
    outline: none !important;
    cursor: pointer !important;
  }
  input[type="range"].seek::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    width: 15px !important;
    height: 15px !important;
    border-radius: 50% !important;
    background: #ffffff !important;
    border: 3.5px solid #4db6ac !important;
    box-shadow: 0 0 8px rgba(77, 182, 172, 0.4) !important;
    cursor: pointer !important;
    transition: transform 0.1s !important;
  }
  input[type="range"].seek::-webkit-slider-thumb:hover { transform: scale(1.2) !important; }
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
    color: #9ca3af !important;
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
    color: #ffffff !important;
    background: var(--track-bg) !important;
    transform: scale(1.08) !important;
  }
  .transport button.active {
    color: var(--accent) !important;
    background: rgba(77, 182, 172, 0.22) !important;
  }
  .transport button svg, .transport .icon-btn svg { width: 16px !important; height: 16px !important; }
  .transport .play-btn { width: 32px !important; height: 32px !important; }
  .transport .play-btn svg { width: 20px !important; height: 20px !important; }
  .hidden-helper { display: none !important; }
</style>
</head>
<body>
<div id="lumi-player">
  <div class="player-titlebar" data-tauri-drag-region>
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
      <button class="mini-btn" id="btnOpenSettings" title="Settings">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
      </button>
    </div>
    <div class="win-controls">
      <button class="win-btn" aria-label="minimize" title="Minimize">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="2" y1="6" x2="10" y2="6" stroke-linecap="round"/></svg>
      </button>
      <button class="win-btn close" aria-label="close" title="Close">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="2.5" y1="2.5" x2="9.5" y2="9.5" stroke-linecap="round"/><line x1="9.5" y1="2.5" x2="2.5" y2="9.5" stroke-linecap="round"/></svg>
      </button>
    </div>
  </div>

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
      <button class="icon-btn" id="btnShuffle" title="Shuffle (S)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5"/><path d="M4 20l8-8"/><path d="M21 3l-8 8"/><path d="M16 21h5v-5"/><path d="M4 4l5 5"/><path d="M9 15l-5 5"/></svg>
      </button>
      <button class="icon-btn" id="btnPrev" title="Previous">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>
      </button>
      <button class="play-btn" id="btnPlay" title="Play / Pause (Space)">
        <svg id="iconPause" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        <svg id="iconPlay" viewBox="0 0 24 24" fill="currentColor" style="display:none"><path d="M8 5v14l11-7z"/></svg>
      </button>
      <button class="icon-btn" id="btnNext" title="Next">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="m6 18 8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
      </button>
      <button class="icon-btn" id="btnRepeat" title="Repeat (R)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
      </button>
    </div>
  </div>

  <div class="hidden-helper">
    <input id="volBar" type="range" min="0" max="100" value="60"/>
    <span id="volIcon">🔊</span>
    <span id="volPct">60%</span>
    <div id="vizBars"></div>
  </div>
</div>
</body>
</html>`,Ie={"compact-pill-light.html":Se,"compact-pill-dark.html":Le,"compact-pill-light":Se,"compact-pill-dark":Le},ci=[{id:"compact-pill-light",name:"Minimal Compact (Light)",filename:"compact-pill-light.html"},{id:"compact-pill-dark",name:"Minimal Compact (Dark)",filename:"compact-pill-dark.html"},{id:"full-html-example",name:"Full HTML Example",filename:"full-html-example.html"},{id:"example-custom",name:"Custom CSS Example",filename:"example-custom.html"}];function Fe(t){const e=["trackTitle","btnPlay","seekBar","coverImg"];let n=0;for(const i of e)t.includes(i)&&n++;return n>=3}function Vt(t,e){const n=document.getElementById("playerCard");if(!n)return;const i=n._originalHTML||n.innerHTML;n._originalHTML||(n._originalHTML=i),zt&&(zt.remove(),zt=null);let o=[...t.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(v=>v[1]).join(`
`);o&&(zt=document.createElement("style"),zt.id="melo-custom-skin",zt.textContent=o,document.head.appendChild(zt));const s=Fe(t);let p="";const d=t.match(/<body[^>]*>([\s\S]*?)<\/body>/i);d?p=d[1]:p=t.split(/<\/style>/i).pop()||"";const c=document.createElement("div");c.innerHTML=p;const u=c.querySelector("#lumi-player");if(u&&(p=u.innerHTML),s&&p.trim().length>20){const v=p.trim();n.innerHTML=v,e&&e("Skin applied"),setTimeout(()=>{var k,M;(k=window.__LUMI_REBIND__)==null||k.call(window);const m=window.__LUMI_AUDIO__;m&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(m),(M=window.__LUMI_REBIND_MAIN__)==null||M.call(window)},40)}else o&&e&&e("Skin CSS applied");localStorage.setItem("lumi-custom-skin",t),localStorage.setItem("lumi-custom-skin-isFull",s?"1":"0")}function te(t,e=!0){zt&&(zt.remove(),zt=null);const n=document.getElementById("playerCard");n&&n._originalHTML&&(n.innerHTML=n._originalHTML,setTimeout(()=>{var a,o;(a=window.__LUMI_REBIND__)==null||a.call(window);const i=window.__LUMI_AUDIO__;i&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(i),(o=window.__LUMI_REBIND_MAIN__)==null||o.call(window)},40)),localStorage.removeItem("lumi-custom-skin"),localStorage.removeItem("lumi-custom-skin-isFull"),localStorage.setItem("melo-active-skin-id","default"),e&&U("melo:skin-changed","default"),t&&t("Switched to Default Melo skin")}async function Ne(){if(it)try{const{invoke:t}=await V(async()=>{const{invoke:n}=await import("./core-DhEqZVGG.js");return{invoke:n}},[]),e=await t("list_installed_skins");if(Array.isArray(e)&&e.length>0)return e}catch{}return ci}async function We(t,e){if(it)try{const{invoke:i}=await V(async()=>{const{invoke:o}=await import("./core-DhEqZVGG.js");return{invoke:o}},[]),a=await i("read_skin_file",{filenameOrPath:t});if(a&&a.trim().length>0)return Vt(a,e),!0}catch{}try{const i=t.startsWith("skins/")?t:`skins/${t}`,a=await fetch(i);if(a.ok){const o=await a.text();return Vt(o,e),!0}}catch{}const n=t.replace(/^.*[\\/]/,"");return Ie[n]?(Vt(Ie[n],e),!0):(e&&e(`Could not load skin: ${t}`),!1)}async function Rt(t,e,n,i=!0){if(t==="default"){te(n,i);return}let a=t;t==="compact-pill"||t.startsWith("compact-pill")?a=e==="dark"?"compact-pill-dark.html":"compact-pill-light.html":!a.endsWith(".html")&&!a.endsWith(".htm")&&(a=a+".html"),await We(a,n)&&(localStorage.setItem("melo-active-skin-id",t),i&&U("melo:skin-changed",t))}async function je(t){if(it)try{const{invoke:e}=await V(async()=>{const{invoke:n}=await import("./core-DhEqZVGG.js");return{invoke:n}},[]);await e("open_skins_folder"),t&&t("Opening skins folder...")}catch{t&&t("Could not open skins folder")}else t&&t("Skins are located in the skins/ folder")}function di(t){const e=document.getElementById("skinUpload"),n=document.getElementById("linkDownloadExample");n&&n.addEventListener("click",o=>{o.preventDefault(),We("compact-pill-light.html")});const i=localStorage.getItem("melo-active-skin-id")||"default",a=localStorage.getItem("lumi-theme")||"dark";i!=="default"&&setTimeout(()=>{Rt(i,a,void 0,!1)},150),rt("melo:theme",o=>{const s=localStorage.getItem("melo-active-skin-id");s&&s!=="default"&&Rt(s,o,void 0,!1)}),rt("melo:skin-changed",o=>{if(o&&typeof o=="string"){const s=localStorage.getItem("lumi-theme")||"dark";Rt(o,s,void 0,!1)}}),e&&e.addEventListener("change",async()=>{var d;const o=(d=e.files)==null?void 0:d[0];if(!o)return;const s=await o.text(),p=o.name;if(it)try{const{invoke:c}=await V(async()=>{const{invoke:u}=await import("./core-DhEqZVGG.js");return{invoke:u}},[]);await c("save_custom_skin_file",{filename:p,content:s}),t(`Saved ${p} to skins folder`)}catch{}Vt(s,t),localStorage.setItem("melo-active-skin-id",p),U("melo:skin-changed",p),e.value=""}),document.addEventListener("dragover",o=>{var s;[...((s=o.dataTransfer)==null?void 0:s.types)||[]].includes("Files")&&o.preventDefault()}),document.addEventListener("drop",async o=>{var p;const s=[...((p=o.dataTransfer)==null?void 0:p.files)||[]].find(d=>d.name.endsWith(".html")||d.name.endsWith(".htm"));if(s){o.preventDefault();const d=await s.text();if(d.includes("<style")||d.includes("<html")||Fe(d)){const c=s.name;if(it)try{const{invoke:u}=await V(async()=>{const{invoke:v}=await import("./core-DhEqZVGG.js");return{invoke:v}},[]);await u("save_custom_skin_file",{filename:c,content:d})}catch{}Vt(d,t),localStorage.setItem("melo-active-skin-id",c),U("melo:skin-changed",c)}}}),window.LumiSkin={applyCustomSkin:Vt,resetSkin:te,applySkinChoice:Rt,listInstalledSkins:Ne,openSkinsFolderOnDisk:je}}const Ge=document.querySelector("#app");Ge.innerHTML=`
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
          <button class="float-btn" data-close="win-library" title="Hide">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="2" y1="6" x2="10" y2="6" stroke-linecap="round"/></svg>
          </button>
          <button class="float-btn close" data-close="win-library" title="Close">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="2.5" y1="2.5" x2="9.5" y2="9.5" stroke-linecap="round"/><line x1="9.5" y1="2.5" x2="2.5" y2="9.5" stroke-linecap="round"/></svg>
          </button>
        </div>
      </div>
      <div class="float-body" style="padding:0; display:flex; flex-direction:column;">
        <div class="search-wrap">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input id="searchInput" class="search-input" placeholder="Search artist, album, track…" />
        </div>
        <div class="tabs" id="libraryTabs" style="flex-shrink:0;">
          <button class="tab active" data-libtab="artists">Artists</button>
          <button class="tab" data-libtab="albums">Albums</button>
          <button class="tab" data-libtab="genres">Genres</button>
        </div>
        <div style="padding:8px 12px; display:flex; justify-content:space-between; align-items:center; font-size:11px; color:var(--text-muted); border-bottom:1px solid var(--card-border); flex-shrink:0;">
          <span id="libraryStats">0 tracks • 0 artists • 0 albums</span>
          <label class="row" style="gap:4px; cursor:pointer; font-size:11px;"><input type="checkbox" id="replayGainToggle" checked /><span>ReplayGain</span></label>
        </div>
        <div id="libScanProgressWrap" style="display:none; padding:6px 12px; background:var(--track-bg); border-bottom:1px solid var(--card-border); flex-direction:column; gap:4px; flex-shrink:0;">
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px;">
            <span id="libScanStatusText" style="color:var(--text-soft); font-weight:600;">Scanning files: 0 / 0</span>
            <span id="libScanStatusPct" style="color:var(--accent); font-weight:700;">0%</span>
          </div>
          <div style="width:100%; height:4px; background:var(--card-border); border-radius:2px; overflow:hidden;">
            <div id="libScanProgressBar" style="width:0%; height:100%; background:var(--accent); transition:width 0.15s ease;"></div>
          </div>
        </div>
        <div id="trackList" style="display:flex; flex-direction:column; flex:1; overflow:auto;"></div>
        <div id="tagEditor" style="display:none; margin:8px 10px 0; background:var(--track-bg); border-radius:10px; padding:12px; gap:10px; flex-direction:column; border:1px solid var(--card-border); flex-shrink:0;">
          <div style="font-weight:600; font-size:12px;">Metadata Editor</div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
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
        <div style="padding:10px; border-top:1px solid var(--card-border); display:flex; gap:6px; flex-shrink:0;">
          <button class="btn small block" id="btn-scan" style="flex:1;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><line x1="12" y1="10" x2="12" y2="16"/><line x1="9" y1="13" x2="15" y2="13"/></svg>
            Scan Folder
          </button>
          <button class="btn small" id="btn-clear-library" title="Clear entire library database" style="color:#ef4444; border-color:rgba(239,68,68,0.3);">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            Clear
          </button>
        </div>
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
          <select id="playlistSelect" class="settings-select" style="height:24px; font-size:11px; padding:2px 6px; max-width:120px;" title="Current playlist"></select>
          <button class="btn small ghost" id="btn-new-playlist" style="padding:2px 6px; height:22px; font-size:11px;">+ New</button>
          <button class="float-btn" data-close="win-playlist" title="Hide">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="2" y1="6" x2="10" y2="6" stroke-linecap="round"/></svg>
          </button>
          <button class="float-btn close" data-close="win-playlist" title="Close">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="2.5" y1="2.5" x2="9.5" y2="9.5" stroke-linecap="round"/><line x1="9.5" y1="2.5" x2="2.5" y2="9.5" stroke-linecap="round"/></svg>
          </button>
        </div>
      </div>
      <div class="float-body" style="padding:8px; display:flex; flex-direction:column; gap:6px;">
        <div style="display:flex; gap:6px; align-items:center; flex-shrink:0;">
          <input id="playlistSearchInput" class="search-input" placeholder="Search playlist..." style="flex:1; height:26px; font-size:11px; padding-left:8px;" />
          <select id="playlistSortSelect" class="settings-select" style="height:26px; font-size:11px; padding:2px 6px; width:110px;" title="Sort tracks">
            <option value="default">Sort: Default</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="artist-asc">Artist (A-Z)</option>
            <option value="album-asc">Album (A-Z)</option>
            <option value="dur-asc">Duration (Shortest)</option>
            <option value="dur-desc">Duration (Longest)</option>
          </select>
        </div>
        <div id="winPlaylistTracks" class="drop-zone" style="flex:1; overflow:auto; display:flex; flex-direction:column; min-height:140px;"></div>
        <div id="winPlaylistEmpty" style="display:none; border:1px dashed var(--card-border); border-radius:10px; padding:16px 10px; background:var(--track-bg); text-align:center; font-size:11px; color:var(--text-muted); line-height:1.8;">
          Playlist is empty<br/>Drag tracks from Library or drop audio files here
        </div>
        <button class="btn small block" id="btn-export-playlist" style="flex-shrink:0;">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export M3U (current list)
        </button>
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
          <button class="float-btn" data-close="win-equalizer" title="Hide">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="2" y1="6" x2="10" y2="6" stroke-linecap="round"/></svg>
          </button>
          <button class="float-btn close" data-close="win-equalizer" title="Close">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="2.5" y1="2.5" x2="9.5" y2="9.5" stroke-linecap="round"/><line x1="9.5" y1="2.5" x2="2.5" y2="9.5" stroke-linecap="round"/></svg>
          </button>
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

    <!-- SYNCED LYRICS WINDOW -->
    <div class="float-win" id="win-lyrics" style="left:740px; top:12px; width:340px; height:460px; z-index:3;">
      <div class="float-header" data-drag="win-lyrics">
        <div class="float-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Synced Lyrics (.lrc)
        </div>
        <div class="float-actions">
          <button class="float-btn" data-close="win-lyrics" title="Hide">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="2" y1="6" x2="10" y2="6" stroke-linecap="round"/></svg>
          </button>
          <button class="float-btn close" data-close="win-lyrics" title="Close">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="2.5" y1="2.5" x2="9.5" y2="9.5" stroke-linecap="round"/><line x1="9.5" y1="2.5" x2="2.5" y2="9.5" stroke-linecap="round"/></svg>
          </button>
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
          <button class="float-btn close" data-close="win-settings" title="Close">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="2.5" y1="2.5" x2="9.5" y2="9.5" stroke-linecap="round"/><line x1="9.5" y1="2.5" x2="2.5" y2="9.5" stroke-linecap="round"/></svg>
          </button>
        </div>
      </div>
      <div class="float-body" style="padding:0; overflow:auto;">
        <div class="settings-tabs" id="settingsTabs">
          <button class="settings-tab active" data-stab="general"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>General</button>
          <button class="settings-tab" data-stab="playback"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4z"/></svg>Playback</button>
          <button class="settings-tab" data-stab="library"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/></svg>Library</button>
          <button class="settings-tab" data-stab="appearance"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>Appearance & Skin</button>
          <button class="settings-tab" data-stab="shortcuts"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M18 14h.01M9 14h6"/></svg>Shortcuts</button>
          <button class="settings-tab" data-stab="about"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>About</button>
        </div>

        <!-- GENERAL TAB -->
        <div class="settings-section active" data-panel="general">
          <div class="settings-row">
            <div><div class="label">Language</div><div class="desc">Interface language</div></div>
            <select class="settings-select" id="setLanguage"><option value="en">English</option><option value="fa">Persian</option><option value="de">Deutsch</option></select>
          </div>
          <div class="settings-row">
            <div><div class="label">Launch at Windows startup</div><div class="desc">Run automatically when system boots</div></div>
            <div class="switch" id="swAutoStart" data-key="autoStart"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">Close to system tray</div><div class="desc">Minimize to system tray on window close</div></div>
            <div class="switch on" id="swTray" data-key="tray"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">Resume playback on reopen</div><div class="desc">Continue playback of previous track</div></div>
            <div class="switch on" id="swResume" data-key="resume"></div>
          </div>
        </div>

        <!-- PLAYBACK TAB -->
        <div class="settings-section" data-panel="playback">
          <div class="settings-row">
            <div><div class="label">Gapless playback</div><div class="desc">Seamless transition with no pause between tracks</div></div>
            <div class="switch on" data-key="gapless"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">Crossfade duration</div><div class="desc">Overlap track transitions</div></div>
            <div style="display:flex; align-items:center; gap:8px;">
              <input type="range" min="0" max="12" value="0" id="setCrossfade" style="width:100px;" />
              <span id="crossfadeVal" style="font-size:11px; color:var(--text-muted); font-weight:600;">0s</span>
            </div>
          </div>
          <div class="settings-row">
            <div><div class="label">ReplayGain normalization</div><div class="desc">Equalize track volume levels automatically</div></div>
            <div class="switch on" data-key="replayGainGlobal"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">Fade out on pause</div><div class="desc">Smooth 0.3s fade-out on pause</div></div>
            <div class="switch" data-key="fadePause"></div>
          </div>
        </div>

        <!-- LIBRARY TAB -->
        <div class="settings-section" data-panel="library">
          <div class="settings-row">
            <div><div class="label">Auto-scan folders</div><div class="desc">Watch and ingest file changes automatically</div></div>
            <div class="switch on" data-key="autoScan"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">Supported audio formats</div><div class="desc">FLAC, ALAC, MP3, WAV, AAC, OGG, OPUS</div></div>
            <div style="font-size:11px; color:var(--text-muted); font-weight:600;">Full bit-depth support</div>
          </div>
          <div class="settings-row" style="flex-direction:column; align-items:stretch;">
            <div class="label" style="margin-bottom:6px;">Music folders</div>
            <div style="display:flex; gap:6px;">
              <input class="search-input" value="C:\\Music" id="setMusicFolder" style="flex:1; padding-left:10px;" readonly />
              <button class="btn small" id="btnChooseFolder">Browse</button>
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
            <b>F12 / Ctrl+Shift+I</b><span>Toggle Developer Tools (DevTools)</span>
            <b>Escape</b><span>Close popup menus & visualizer selector</span>
          </div>
        </div>

        <!-- ABOUT TAB -->
        <div class="settings-section" data-panel="about">
          <div style="font-size:12px; color:var(--text-soft); line-height:1.8;">
            <div style="font-size:16px; font-weight:800; color:var(--text); margin-bottom:4px;">Melo 0.4.0 Beta</div>
            <b>Tauri 2 + TypeScript + Vite + Rust</b><br/>
            Supports: FLAC, ALAC, MP3, WAV, AAC, OGG, OPUS • 10-band EQ • Real-time FFT Visualizer • Synced Lyrics (.lrc) • Dynamic Ambient Theme<br/>
            License: <b>GPL-3.0</b> • Open Source on GitHub:<br/>
            <a href="https://github.com/Arvanta/Melo" target="_blank" rel="noopener" style="color:var(--accent); font-weight:600;">github.com/Arvanta/Melo ↗</a>
            <div style="margin-top:12px; padding-top:10px; border-top:1px solid var(--card-border);">
              <button class="btn small" id="btnOpenDevTools">Toggle DevTools (F12) 🛠️</button>
            </div>
          </div>
        </div>
      </div>
      <div class="resize-handle" data-resize="win-settings">◢</div>
    </div>

  </div>

  <!-- PLAYER BAR -->
  <div class="player-card" id="playerCard">
    <div class="player-titlebar" data-tauri-drag-region>
      <button class="app-name-btn" id="appMenuBtn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12h2l1-7 2 14 3-10 2 6h2l2-9 2 14 2-7h2"/></svg>
        Melo <span class="chev">▾</span>
      </button>

      <!-- App Dropdown Menu -->
      <div id="appMenu" class="app-menu">
        <div class="menu-label">Files</div>
        <button class="menu-item" id="menuAddFile">Add Files... (Ctrl+O)</button>
        <button class="menu-item" id="menuAddFolder">Scan Folder... (Ctrl+Shift+O)</button>
        <div class="menu-sep"></div>
        <div class="menu-label">Windows</div>
        <button class="menu-item" id="menuToggleLibrary">Library</button>
        <button class="menu-item" id="menuTogglePlaylist">Playlist</button>
        <button class="menu-item" id="menuToggleEq">Equalizer</button>
        <button class="menu-item" id="menuToggleLyrics">Synced Lyrics (.lrc)</button>
        <button class="menu-item" id="menuToggleSettings">Settings</button>
        <div class="menu-sep"></div>
        <div class="menu-label">Skins & Themes</div>
        <button class="menu-item" id="menuSkinDefault">Skin: Default Melo</button>
        <button class="menu-item" id="menuSkinCompact">Skin: Minimal Compact</button>
        <div class="menu-sep"></div>
        <button class="menu-item" id="menuThemeToggle">Toggle Light / Dark Theme</button>
        <button class="menu-item" id="menuCustomSkin">Load Custom HTML Skin...</button>
        <button class="menu-item" id="menuToggleDevTools">Developer Tools (F12)</button>
        <button class="menu-item" id="menuAbout">About Melo 0.4.0 Beta</button>
      </div>

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
        <button class="win-btn" aria-label="minimize" title="Minimize">
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="2" y1="6" x2="10" y2="6" stroke-linecap="round"/></svg>
        </button>
        <button class="win-btn close" aria-label="close" title="Close">
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="2.5" y1="2.5" x2="9.5" y2="9.5" stroke-linecap="round"/><line x1="9.5" y1="2.5" x2="2.5" y2="9.5" stroke-linecap="round"/></svg>
        </button>
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
          <button class="icon-btn" id="btnStop" title="Stop" style="display:none; justify-content:center; align-items:center;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="5" width="14" height="14" rx="2"/></svg>
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
          <button class="sbtn active" id="btnToggleLyrics" title="Synced Lyrics (.lrc)">
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
`;const mt=new URLSearchParams(location.search).get("panel");var Te,Be;if(it&&mt){V(async()=>{const{getCurrentWindow:i}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:i}},__vite__mapDeps([8,7,1,0])).then(({getCurrentWindow:i})=>{const a=i();mi(a,"melo-geo-panel-"+mt),a.onCloseRequested(()=>{U("melo:panel-closed",mt)}),window.addEventListener("beforeunload",()=>{U("melo:panel-closed",mt)})});const t=document.getElementById("win-"+mt),e=((Te=t==null?void 0:t.querySelector(".float-title"))==null?void 0:Te.innerHTML)||"",n=((Be=t==null?void 0:t.querySelector(".float-body"))==null?void 0:Be.innerHTML)||"";Ge.innerHTML=`
<div class="panel-root">
  <div class="panel-titlebar">${e}</div>
  <div class="panel-body">${n}</div>
  <div id="toast" class="toast"></div>
</div>`}it&&!mt&&(document.documentElement.classList.add("tauri-main"),document.body.classList.add("tauri-main"),document.querySelectorAll(".side-actions .sbtn").forEach(t=>t.classList.remove("active")),V(async()=>{const{WebviewWindow:t}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:t}},__vite__mapDeps([6,7,1,0,8])).then(({WebviewWindow:t})=>{const e=async()=>{var n;for(const i of["library","playlist","equalizer","settings"])try{const a=await t.getByLabel("panel-"+i);(n=document.getElementById(pe[i]))==null||n.classList.toggle("active",!!a)}catch{}};e(),setInterval(e,1200)}));it&&!mt&&(V(()=>import("./window-BWd3Cypy.js"),__vite__mapDeps([8,7,1,0])).then(async({getCurrentWindow:t})=>{const e=t(),n=()=>{const a=localStorage.getItem("melo-active-skin-id"),o=a==="compact-pill"||typeof a=="string"&&a.startsWith("compact-pill");return{w:o?780:960,h:o?138:240}};try{const a=JSON.parse(localStorage.getItem("melo-geo-main")||"null"),{LogicalPosition:o,LogicalSize:s}=await V(async()=>{const{LogicalPosition:d,LogicalSize:c}=await import("./dpi-fvP-W2qr.js");return{LogicalPosition:d,LogicalSize:c}},__vite__mapDeps([7,1])),p=n();await e.setSize(new s(a!=null&&a.w?Math.max(650,a.w):p.w,p.h)),(a==null?void 0:a.x)!=null&&(a==null?void 0:a.y)!=null&&await e.setPosition(new o(a.x,a.y))}catch{}const i=async()=>{try{const a=await e.outerPosition(),o=await e.innerSize(),s=n();localStorage.setItem("melo-geo-main",JSON.stringify({x:a.x,y:a.y,w:o.width,h:s.h}))}catch{}};e.onMoved(i),e.onResized(async()=>{try{const a=await e.innerSize(),o=n(),{LogicalSize:s}=await V(async()=>{const{LogicalSize:p}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:p}},__vite__mapDeps([7,1]));(a.width<650||a.height!==o.h)&&await e.setSize(new s(Math.max(650,a.width),o.h))}catch{}i()}),rt("melo:skin-changed",async a=>{try{!mt&&a&&await Rt(a,St,void 0,!1);const o=a==="compact-pill"||typeof a=="string"&&a.startsWith("compact-pill"),s=o?780:960,p=o?138:240,{LogicalSize:d}=await V(async()=>{const{LogicalSize:c}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:c}},__vite__mapDeps([7,1]));await e.setSize(new d(s,p)),i()}catch{}}),e.onCloseRequested(async a=>{a.preventDefault();const{WebviewWindow:o}=await V(async()=>{const{WebviewWindow:s}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:s}},__vite__mapDeps([6,7,1,0,8]));for(const s of["library","playlist","equalizer","settings"])try{const p=await o.getByLabel("panel-"+s);p&&await p.close()}catch{}try{await e.destroy()}catch{window.close()}})}),V(()=>import("./core-DhEqZVGG.js"),[]).then(async({invoke:t})=>{try{const e=await t("get_cli_tracks");if(Array.isArray(e)&&e.length>0){const n=window.LumiLibrary,i=window.LumiPlayer;e.forEach(a=>a.source="import"),n==null||n.addTracks(e,!0),n==null||n.replaceCurrentPlaylist(e),i&&(i.queue=[...e]),U("melo:play-tracks",{tracks:e,index:0})}}catch{}}),rt("melo:open-files",t=>{if(Array.isArray(t)&&t.length>0){const e=window.LumiLibrary,n=window.LumiPlayer;t.forEach(i=>i.source="import"),e==null||e.addTracks(t,!0),e==null||e.replaceCurrentPlaylist(t),n&&(n.queue=[...t]),Z(`Playing ${t[0].title}`),U("melo:play-tracks",{tracks:t,index:0})}}));document.addEventListener("contextmenu",t=>{t.preventDefault()});const Kt=document.getElementById("toast"),Z=t=>{Kt&&(Kt.textContent=t,Kt.classList.add("show"),setTimeout(()=>Kt.classList.remove("show"),2200))},Pt=new Audio;Pt.preload="metadata";window.__LUMI_AUDIO__=Pt;window.__TOAST__=Z;let St=localStorage.getItem("lumi-theme")||"dark";function ee(t){document.documentElement.setAttribute("data-theme",t),localStorage.setItem("lumi-theme",t),St=t}function de(t){ee(t),U("melo:theme",t)}ee(St);rt("melo:theme",t=>{(t==="light"||t==="dark")&&ee(t)});setInterval(()=>{const t=localStorage.getItem("lumi-theme");(t==="light"||t==="dark")&&t!==St&&ee(t)},1e3);const pi=["win-library","win-playlist","win-equalizer","win-lyrics","win-settings"],Xt=document.getElementById("desktop"),Ye={btnToggleLibrary:"win-library",btnTogglePlaylist:"win-playlist",btnToggleEq:"win-equalizer",btnToggleLyrics:"win-lyrics",btnOpenSettings:"win-settings",menuToggleLibrary:"win-library",menuTogglePlaylist:"win-playlist",menuToggleEq:"win-equalizer",menuToggleLyrics:"win-lyrics",menuToggleSettings:"win-settings"};function ui(t){const e=document.getElementById(t);return!!e&&!e.classList.contains("hidden")}const pe={library:"btnToggleLibrary",playlist:"btnTogglePlaylist",equalizer:"btnToggleEq",lyrics:"btnToggleLyrics",settings:"btnOpenSettings"};async function mi(t,e){const n=async()=>{try{const i=await t.outerPosition(),a=await t.outerSize();localStorage.setItem(e,JSON.stringify({x:i.x,y:i.y,w:a.width,h:a.height}))}catch{}};t.onMoved(n),t.onResized(n)}async function gi(t){const{WebviewWindow:e}=await V(async()=>{const{WebviewWindow:u}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:u}},__vite__mapDeps([6,7,1,0,8])),n="panel-"+t,i=document.getElementById(pe[t]),a=await e.getByLabel(n);if(a){await a.close(),i==null||i.classList.remove("active");return}const o={library:[430,620],playlist:[440,560],equalizer:[700,440],lyrics:[380,520],settings:[600,540]},s={library:[360,400],playlist:[360,360],equalizer:[620,400],lyrics:[320,360],settings:[500,400]},p={library:"Library",playlist:"Playlist",equalizer:"Equalizer",lyrics:"Synced Lyrics",settings:"Settings"},d=o[t]||[420,520];let c=null;try{c=JSON.parse(localStorage.getItem("melo-geo-panel-"+t)||"null")}catch{}new e(n,{url:`/?panel=${t}`,title:p[t]||t,width:(c==null?void 0:c.w)||d[0],height:(c==null?void 0:c.h)||d[1],minWidth:(s[t]||[360,360])[0],minHeight:(s[t]||[360,360])[1],...(c==null?void 0:c.x)!=null?{x:c.x,y:c.y}:{center:!0},decorations:!0,skipTaskbar:!0}),i==null||i.classList.add("active"),U("melo:theme",St)}rt("melo:panel-closed",t=>{var n;const e=pe[t];e&&((n=document.getElementById(e))==null||n.classList.remove("active"))});function ue(t){if(it){gi(t.replace(/^win-/,""));return}const e=ui(t);Yt(t,!e),e||ie(document.getElementById(t))}function vi(t){if(t.classList.contains("hidden")||!Xt||window.matchMedia("(max-width: 860px)").matches)return;const e=Xt.getBoundingClientRect();if(e.width<=0||e.height<=0)return;const n=t.getBoundingClientRect(),i=Math.min(n.width,e.width),a=Math.min(n.height,e.height);let o=n.left-e.left,s=n.top-e.top;o=Math.max(0,Math.min(e.width-i,o)),s=Math.max(0,Math.min(e.height-a,s)),t.style.left=o+"px",t.style.top=s+"px",t.style.right="auto",t.style.bottom="auto",t.style.transform="none"}function Yt(t,e){var a,o,s,p,d,c,u,v,m,k;const n=document.getElementById(t);if(!n)return;n.classList.toggle("hidden",!e),localStorage.setItem("lumiv2-"+t,e?"1":"0"),e&&vi(n);const i=e;t==="win-library"&&((a=document.getElementById("btnToggleLibrary"))==null||a.classList.toggle("active",i),(o=document.getElementById("menuToggleLibrary"))==null||o.classList.toggle("active",i)),t==="win-playlist"&&((s=document.getElementById("btnTogglePlaylist"))==null||s.classList.toggle("active",i),(p=document.getElementById("menuTogglePlaylist"))==null||p.classList.toggle("active",i)),t==="win-equalizer"&&((d=document.getElementById("btnToggleEq"))==null||d.classList.toggle("active",i),(c=document.getElementById("menuToggleEq"))==null||c.classList.toggle("active",i)),t==="win-lyrics"&&((u=document.getElementById("btnToggleLyrics"))==null||u.classList.toggle("active",i),(v=document.getElementById("menuToggleLyrics"))==null||v.classList.toggle("active",i)),t==="win-settings"&&((m=document.getElementById("btnOpenSettings"))==null||m.classList.toggle("active",i),(k=document.getElementById("menuToggleSettings"))==null||k.classList.toggle("active",i))}mt||pi.forEach(t=>{const e=localStorage.getItem("lumiv2-"+t);e!==null?Yt(t,e==="1"):t==="win-settings"?Yt(t,!1):Yt(t,!0)});Object.entries(Ye).forEach(([t,e])=>{var n;(n=document.getElementById(t))==null||n.addEventListener("click",()=>ue(e))});document.querySelectorAll("[data-close]").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.close;Yt(e,!1)})});let wt=null,Tt=null,Me=10;function ie(t){Me++,t.style.zIndex=String(Me),document.querySelectorAll(".float-win").forEach(e=>e.classList.remove("active")),t.classList.add("active")}document.querySelectorAll(".float-win").forEach(t=>{t.addEventListener("mousedown",()=>ie(t))});document.querySelectorAll("[data-drag]").forEach(t=>{t.addEventListener("mousedown",e=>{if(e.target.closest("button")||e.target.closest("input")||e.target.closest("select"))return;const n=t.dataset.drag,i=document.getElementById(n);ie(i),i.classList.add("dragging");const a=i.getBoundingClientRect();wt={id:n,startX:e.clientX,startY:e.clientY,initX:a.left,initY:a.top,width:a.width,height:a.height}})});document.querySelectorAll("[data-resize]").forEach(t=>{t.addEventListener("mousedown",e=>{e.stopPropagation();const n=t.dataset.resize,i=document.getElementById(n);ie(i),i.classList.add("resizing");const a=i.getBoundingClientRect();Tt={id:n,startX:e.clientX,startY:e.clientY,initW:a.width,initH:a.height}})});window.addEventListener("mousemove",t=>{if(wt){const e=document.getElementById(wt.id);let n=t.clientX-wt.startX,i=t.clientY-wt.startY,a=wt.initX+n,o=wt.initY+i;if(Xt&&!window.matchMedia("(max-width: 860px)").matches){const s=Xt.getBoundingClientRect(),p=s.left,d=s.right-wt.width,c=s.top,u=s.bottom-wt.height;a=Math.max(p,Math.min(d,a))-s.left,o=Math.max(c,Math.min(u,o))-s.top}e.style.left=a+"px",e.style.top=o+"px",e.style.right="auto",e.style.bottom="auto",e.style.transform="none"}if(Tt){const e=document.getElementById(Tt.id);let n=Tt.initW+(t.clientX-Tt.startX),i=Tt.initH+(t.clientY-Tt.startY);n=Math.max(260,n),i=Math.max(160,i),e.style.width=n+"px",e.style.height=i+"px"}});window.addEventListener("mouseup",()=>{if(wt){const t=document.getElementById(wt.id);t&&(t.classList.remove("dragging"),localStorage.setItem("lumiv2-pos-"+wt.id,JSON.stringify({left:t.style.left,top:t.style.top}))),wt=null}if(Tt){const t=document.getElementById(Tt.id);t&&(t.classList.remove("resizing"),localStorage.setItem("lumiv2-size-"+Tt.id,JSON.stringify({width:t.style.width,height:t.style.height}))),Tt=null}});let bt=document.getElementById("appMenuBtn"),R=document.getElementById("appMenu");function hi(){const t=R==null?void 0:R.classList.toggle("open");bt==null||bt.classList.toggle("open",!!t)}bt==null||bt.addEventListener("click",t=>{t.stopPropagation(),hi()});document.addEventListener("click",t=>{R&&!R.contains(t.target)&&t.target!==bt&&(R.classList.remove("open"),bt==null||bt.classList.remove("open"))});document.addEventListener("keydown",t=>{t.key==="Escape"&&(R==null||R.classList.remove("open"),bt==null||bt.classList.remove("open"))});var Ae;(Ae=document.getElementById("menuCustomSkin"))==null||Ae.addEventListener("click",()=>{var t;(t=document.getElementById("skinUpload"))==null||t.click(),R==null||R.classList.remove("open")});var Ce;(Ce=document.getElementById("menuSkinDefault"))==null||Ce.addEventListener("click",()=>{te(Z);const t=document.getElementById("skinSelect");t&&(t.value="default"),R==null||R.classList.remove("open")});var Pe;(Pe=document.getElementById("menuSkinCompact"))==null||Pe.addEventListener("click",()=>{Rt("compact-pill",St,Z);const t=document.getElementById("skinSelect");t&&(t.value="compact-pill"),R==null||R.classList.remove("open")});var ze;(ze=document.getElementById("menuThemeToggle"))==null||ze.addEventListener("click",()=>{de(St==="light"?"dark":"light"),R==null||R.classList.remove("open")});var De;(De=document.getElementById("menuToggleDevTools"))==null||De.addEventListener("click",async()=>{if(it)try{const{invoke:t}=await V(async()=>{const{invoke:e}=await import("./core-DhEqZVGG.js");return{invoke:e}},[]);await t("toggle_devtools")}catch{}else Z("DevTools toggle requires Tauri desktop runtime");R==null||R.classList.remove("open")});var Re;(Re=document.getElementById("menuAbout"))==null||Re.addEventListener("click",()=>{Z("Melo 0.4.0 Beta — Tauri 2 + TypeScript + Rust"),R==null||R.classList.remove("open")});async function Je(){const t=window.LumiLibrary,e=window.LumiPlayer;if(it){try{const{open:i}=await V(async()=>{const{open:d}=await import("./index-CS3Qnt9j.js");return{open:d}},__vite__mapDeps([5,1])),a=await i({multiple:!0,filters:[{name:"Audio",extensions:["mp3","flac","wav","aac","ogg","m4a","alac","opus","wma","aiff"]}]});if(!a)return;const o=Array.isArray(a)?a:[a],{invoke:s}=await V(async()=>{const{invoke:d}=await import("./core-DhEqZVGG.js");return{invoke:d}},[]),p=[];for(const d of o)try{const c=await s("scan_library",{path:d});if(c&&c.length)c.forEach(u=>u.source="import"),p.push(...c);else{const u=d.replace(/^.*[\\/]/,""),v=u.lastIndexOf("."),m=v>0?u.slice(0,v):u,k=v>0?u.slice(v+1).toUpperCase():"AUDIO";p.push({id:d,title:m,artist:"Unknown Artist",album:"Single",duration:0,path:d,codec:k,specs:"Local File",source:"import"})}}catch{const c=d.replace(/^.*[\\/]/,""),u=c.lastIndexOf("."),v=u>0?c.slice(0,u):c,m=u>0?c.slice(u+1).toUpperCase():"AUDIO";p.push({id:d,title:v,artist:"Unknown Artist",album:"Single",duration:0,path:d,codec:m,specs:"Local File",source:"import"})}t==null||t.addTracks(p,!0),t==null||t.replaceCurrentPlaylist(p),e&&(e.queue=[...p]),U("melo:play-tracks",{tracks:p,index:0}),Z(`${p.length} file(s) added`)}catch{Z("Error opening files")}R==null||R.classList.remove("open");return}const n=document.createElement("input");n.type="file",n.multiple=!0,n.accept="audio/*,.mp3,.flac,.wav,.aac,.ogg,.m4a,.alac,.opus,.wma,.aiff",n.onchange=async()=>{const i=Array.from(n.files||[]);if(!i.length)return;const a=[];for(const o of i){const s=o.path,p=s||URL.createObjectURL(o),d=o.name,c=d.lastIndexOf("."),u=c>0?d.slice(0,c):d,v=c>0?d.slice(c+1).toUpperCase():"AUDIO",m={id:s||"imp_"+Math.random().toString(36).slice(2,9),title:u,artist:"Unknown Artist",album:"Single",duration:0,path:p,codec:v,specs:"Local File",source:"import"};await ce(o,m),a.push(m)}t==null||t.addTracks(a,!0),t==null||t.replaceCurrentPlaylist(a),e&&(e.queue=[...a]),U("melo:play-tracks",{tracks:a,index:0}),Z(`${a.length} file(s) added`)},n.click(),R==null||R.classList.remove("open")}async function Ke(){const t=window.LumiLibrary,e=window.LumiPlayer;if(it){try{const{open:i}=await V(async()=>{const{open:c}=await import("./index-CS3Qnt9j.js");return{open:c}},__vite__mapDeps([5,1])),a=await i({directory:!0});if(!a)return;const o=a,{invoke:s}=await V(async()=>{const{invoke:c}=await import("./core-DhEqZVGG.js");return{invoke:c}},[]),d=(await s("scan_library",{path:o})).map(c=>({...c,source:"import"}));t==null||t.addTracks(d,!0),t==null||t.replaceCurrentPlaylist(d),e&&(e.queue=[...d]),U("melo:play-tracks",{tracks:d,index:0}),Z(`${d.length} track(s) added from folder`)}catch{Z("Error scanning folder")}R==null||R.classList.remove("open");return}const n=document.createElement("input");n.type="file",n.webkitdirectory=!0,n.multiple=!0,n.accept="audio/*",n.onchange=async()=>{const i=Array.from(n.files||[]).filter(o=>/\.(mp3|flac|wav|aac|ogg|m4a|alac|opus|wma|aiff)$/i.test(o.name));if(!i.length)return;const a=[];for(const o of i){const s=o.path,p=s||URL.createObjectURL(o),d=o.name,c=d.lastIndexOf("."),u=c>0?d.slice(0,c):d,v=c>0?d.slice(c+1).toUpperCase():"AUDIO",m={id:s||"imp_"+Math.random().toString(36).slice(2,9),title:u,artist:"Unknown Artist",album:"Folder Import",duration:0,path:p,codec:v,specs:"Local File",source:"import"};await ce(o,m),a.push(m)}t==null||t.addTracks(a,!0),t==null||t.replaceCurrentPlaylist(a),e&&(e.queue=[...a]),U("melo:play-tracks",{tracks:a,index:0}),Z(`${a.length} file(s) added from folder`)},n.click(),R==null||R.classList.remove("open")}var qe;(qe=document.getElementById("btnAddFiles"))==null||qe.addEventListener("click",Je);var Oe;(Oe=document.getElementById("btnAddFolder"))==null||Oe.addEventListener("click",Ke);var $e;($e=document.getElementById("btnThemeToggle"))==null||$e.addEventListener("click",()=>{de(St==="light"?"dark":"light")});window.addEventListener("keydown",async t=>{if(t.key==="F12"||(t.ctrlKey||t.metaKey)&&t.shiftKey&&t.key.toLowerCase()==="i")if(t.preventDefault(),it)try{const{invoke:e}=await V(async()=>{const{invoke:n}=await import("./core-DhEqZVGG.js");return{invoke:n}},[]);await e("toggle_devtools")}catch{}else Z("DevTools shortcut requires Tauri desktop runtime");(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="o"&&(t.shiftKey?(t.preventDefault(),Ke()):(t.preventDefault(),Je())),((t.ctrlKey||t.metaKey)&&t.key===","||t.key==="F2")&&(t.preventDefault(),ue("win-settings"))});function _e(t){var M,A,K,nt;function e(_){document.querySelectorAll(".settings-tab").forEach(z=>{z.classList.toggle("active",z.dataset.stab===_)}),document.querySelectorAll(".settings-section[data-panel]").forEach(z=>{z.classList.toggle("active",z.dataset.panel===_)}),localStorage.setItem("melo-settings-tab",_)}document.querySelectorAll(".settings-tab").forEach(_=>{_.addEventListener("click",()=>e(_.dataset.stab))}),e(localStorage.getItem("melo-settings-tab")||"general"),document.querySelectorAll(".switch[data-key]").forEach(_=>{const z=_.dataset.key,$=localStorage.getItem("melo-pref-"+z);$!==null&&_.classList.toggle("on",$==="1"),_.onclick=()=>{_.classList.toggle("on");const P=_.classList.contains("on");localStorage.setItem("melo-pref-"+z,P?"1":"0"),t(P?"Enabled":"Disabled"),U("melo:pref-changed",{key:z,value:P})}});const n=document.getElementById("setCrossfade"),i=document.getElementById("crossfadeVal");if(n){const _=localStorage.getItem("melo-pref-crossfade")||"0";n.value=_,i&&(i.textContent=_+"s"),n.oninput=()=>{const z=n.value;i&&(i.textContent=z+"s"),localStorage.setItem("melo-pref-crossfade",z)}}const a=document.getElementById("setLanguage");if(a){const _=localStorage.getItem("melo-pref-lang")||"en";a.value=_,a.onchange=()=>{localStorage.setItem("melo-pref-lang",a.value),t(`Language set to ${a.options[a.selectedIndex].text}`)}}const o=document.getElementById("swDynamicTheme");if(o){const _=localStorage.getItem("melo-dynamic-theme")!=="0";o.classList.toggle("on",_),o.onclick=()=>{var g,y;const z=!o.classList.contains("on");o.classList.toggle("on",z),localStorage.setItem("melo-dynamic-theme",z?"1":"0");const $=window.__LUMI_QUEUE__,P=(y=(g=window.LumiPlayer)==null?void 0:g.currentIndex)!=null?y:0;$&&$[P]&&He(z?$[P].cover:null),t(z?"Dynamic theme enabled":"Dynamic theme disabled")}}const s=document.getElementById("skinSelect"),p=document.getElementById("btnSkinThemeToggle"),d=document.getElementById("btnRefreshSkins"),c=document.getElementById("btnOpenSkinsFolder"),u=document.getElementById("skinThemeIcon"),v=document.getElementById("skinThemeLabel");function m(_){u&&(u.textContent=_==="dark"?"🌙":"☀️"),v&&(v.textContent=_==="dark"?"Dark":"Light")}m(St),p==null||p.addEventListener("click",()=>{const _=St==="dark"?"light":"dark";de(_),m(_),t(_==="dark"?"Dark theme":"Light theme")}),rt("melo:theme",_=>{(_==="light"||_==="dark")&&m(_)});async function k(){if(!s)return;const _=localStorage.getItem("melo-active-skin-id")||"default",z=await Ne();s.innerHTML=`
      <option value="default">Default Melo (Standard)</option>
      <option value="compact-pill">Minimal Compact (Pill Bar)</option>
    `,z.forEach($=>{if($.filename!=="compact-pill-light.html"&&$.filename!=="compact-pill-dark.html"){const P=document.createElement("option");P.value=$.filename,P.textContent=`${$.name} (${$.filename})`,s.appendChild(P)}}),s.value=_}k(),s&&(s.onchange=()=>{const _=s.value;Rt(_,St,t)}),d==null||d.addEventListener("click",async()=>{await k();const _=localStorage.getItem("melo-active-skin-id")||"default";Rt(_,St,t),t("Skins reloaded from disk")}),c==null||c.addEventListener("click",()=>{je(t)}),(M=document.getElementById("btn-reset-skin-settings"))==null||M.addEventListener("click",()=>{te(t),s&&(s.value="default")}),(A=document.getElementById("btn-settings-reset"))==null||A.addEventListener("click",()=>{localStorage.clear(),t("Settings reset — reloading..."),setTimeout(()=>location.reload(),600)}),(K=document.getElementById("btnChooseFolder"))==null||K.addEventListener("click",async()=>{if(it)try{const{open:_}=await V(async()=>{const{open:$}=await import("./index-CS3Qnt9j.js");return{open:$}},__vite__mapDeps([5,1])),z=await _({directory:!0});z&&(document.getElementById("setMusicFolder").value=z,localStorage.setItem("melo-pref-music-folder",z),t("Music folder updated"))}catch{}else t("Folder selection dialog requires Tauri build")}),(nt=document.getElementById("btnOpenDevTools"))==null||nt.addEventListener("click",async()=>{if(it)try{const{invoke:_}=await V(async()=>{const{invoke:z}=await import("./core-DhEqZVGG.js");return{invoke:z}},[]);await _("toggle_devtools")}catch{}else t("DevTools requires Tauri desktop runtime")})}function Qe(){document.querySelectorAll(".win-btn").forEach(t=>{t.onclick=async()=>{const e=t.getAttribute("aria-label");if(window.__TAURI__){const{getCurrentWindow:n}=await V(async()=>{const{getCurrentWindow:a}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:a}},__vite__mapDeps([8,7,1,0])),i=n();e==="minimize"?i.minimize():e==="maximize"?i.toggleMaximize():e==="close"&&i.close()}else e==="close"&&Z("Window close requires the Tauri desktop build"),e==="maximize"&&Z("Resize: drag corner handle")}})}Qe();window.__LUMI_REBIND_MAIN__=()=>{const t=document.getElementById("appMenuBtn"),e=document.getElementById("appMenu");t&&e&&(bt=t,R=e,t.onclick=n=>{n.stopPropagation(),e.classList.toggle("open"),t.classList.toggle("open",e.classList.contains("open"))}),Qe(),Object.entries(Ye).forEach(([n,i])=>{const a=document.getElementById(n);a&&(a.onclick=()=>ue(i))})};const Ot=document.createElement("div");Ot.id="aboutPop";Ot.style.display="none";document.body.appendChild(Ot);var Ue;(Ue=document.getElementById("btnAbout"))==null||Ue.addEventListener("click",t=>{var e;t.stopPropagation(),Ot.innerHTML=`
    <div class="about-head">Melo <b>0.4.0 Beta</b></div>
    <div style="font-size:11.5px; color:var(--text-soft); margin:6px 0 10px;">
      Modern Windows Music Player<br/>
      Tauri 2 + TypeScript + Rust
    </div>
    <a class="about-link" id="aboutLink" href="https://github.com/Arvanta/Melo" rel="noopener">github.com/Arvanta/Melo ↗</a>`,Ot.style.display=Ot.style.display==="none"?"block":"none",(e=document.getElementById("aboutLink"))==null||e.addEventListener("click",n=>{n.preventDefault();const i="https://github.com/Arvanta/Melo";it?V(()=>import("./core-DhEqZVGG.js"),[]).then(a=>a.invoke("open_url",{url:i})).catch(()=>window.open(i,"_blank")):window.open(i,"_blank")})});document.addEventListener("click",t=>{!t.target.closest("#aboutPop")&&!t.target.closest("#btnAbout")&&(Ot.style.display="none")});it&&mt?mt==="library"||mt==="playlist"?we(Pt,Z):mt==="equalizer"?xe(Pt,Z,{remote:!0}):mt==="lyrics"?Ee(Pt):mt==="settings"&&_e(Z):(ai(Pt,Z),we(Pt,Z),xe(Pt,Z),ri(Pt),Ee(Pt),di(Z),_e(Z));Z("Melo 0.4.0 Beta is ready");
