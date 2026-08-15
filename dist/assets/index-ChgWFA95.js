const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/event-CNdo2oXa.js","assets/core-DhEqZVGG.js","assets/index-DiyoAAdc.js","assets/index-CHth0gh2.js","assets/index-Bq0iOnRE.js","assets/index-CS3Qnt9j.js","assets/webviewWindow-mjQkSB26.js","assets/dpi-fvP-W2qr.js","assets/window-BWd3Cypy.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(a){if(a.ep)return;a.ep=!0;const o=n(a);fetch(a.href,o)}})();const Qe="modulepreload",Xe=function(t){return"/"+t},ve={},V=function(e,n,i){let a=Promise.resolve();if(n&&n.length>0){let s=function(r){return Promise.all(r.map(u=>Promise.resolve(u).then(v=>({status:"fulfilled",value:v}),v=>({status:"rejected",reason:v}))))};document.getElementsByTagName("link");const p=document.querySelector("meta[property=csp-nonce]"),d=(p==null?void 0:p.nonce)||(p==null?void 0:p.getAttribute("nonce"));a=s(n.map(r=>{if(r=Xe(r),r in ve)return;ve[r]=!0;const u=r.endsWith(".css"),v=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${v}`))return;const m=document.createElement("link");if(m.rel=u?"stylesheet":Qe,u||(m.as="script"),m.crossOrigin="",m.href=r,d&&m.setAttribute("nonce",d),document.head.appendChild(m),u)return new Promise((w,E)=>{m.addEventListener("load",w),m.addEventListener("error",()=>E(new Error(`Unable to preload CSS for ${r}`)))})}))}function o(s){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=s,window.dispatchEvent(p),!p.defaultPrevented)throw s}return a.then(s=>{for(const p of s||[])p.status==="rejected"&&o(p.reason);return e().catch(o)})},tt=typeof window.__TAURI_INTERNALS__<"u"||typeof window.__TAURI__<"u";async function F(t,e){if(tt)try{const{emit:n}=await V(async()=>{const{emit:i}=await import("./event-CNdo2oXa.js");return{emit:i}},__vite__mapDeps([0,1]));await n(t,e);return}catch{}window.dispatchEvent(new CustomEvent(t,{detail:e}))}function ct(t,e){tt&&V(async()=>{const{listen:n}=await import("./event-CNdo2oXa.js");return{listen:n}},__vite__mapDeps([0,1])).then(({listen:n})=>{n(t,i=>{e(i.payload)})}).catch(()=>{}),window.addEventListener(t,n=>e(n.detail))}let he=!1;async function Ze(){if(!he){he=!0;try{const t=globalThis;if(typeof t.Buffer>"u"){const e=await V(()=>import("./index-DiyoAAdc.js").then(n=>n.i),__vite__mapDeps([2,3]));t.Buffer=e.Buffer}typeof t.process>"u"&&(t.process={env:{},browser:!0,nextTick:e=>setTimeout(e,0)})}catch{}}}async function ti(t,e){var n;try{await Ze();const i=await V(()=>import("./index-Bq0iOnRE.js").then(r=>r.i),__vite__mapDeps([4,3])),a=i&&typeof i.parseBlob=="function"?i:i.default||i,o=await Promise.race([a.parseBlob(t),new Promise((r,u)=>setTimeout(()=>u(new Error("timeout")),1800))]),s=o==null?void 0:o.common;if(!s)return;s.title&&(e.title=s.title),s.artist?e.artist=s.artist:s.artists&&s.artists[0]&&(e.artist=s.artists[0]),s.album&&(e.album=s.album),s.genre&&s.genre[0]&&(e.genre=s.genre[0]),s.year&&(e.year=s.year);const p=(n=s.picture)==null?void 0:n[0];if(p&&p.data){const r=p.format||"image/jpeg",u=p.data;if(u.length>6e5)return;let v="";const m=8192;for(let w=0;w<u.length;w+=m){const E=u.subarray(w,w+m);v+=String.fromCharCode.apply(null,E)}e.cover=`data:${r};base64,${btoa(v)}`}const d=o==null?void 0:o.format;d&&d.duration&&!e.duration&&(e.duration=Math.floor(d.duration))}catch{}}async function le(t,e,n=1800){return await ti(t,e),e}async function ei(t){return new Promise(e=>{if(!t)return e(null);const n=new Image;n.crossOrigin="anonymous",n.onload=()=>{try{const i=document.createElement("canvas"),a=i.getContext("2d");if(!a)return e(null);i.width=40,i.height=40,a.drawImage(n,0,0,40,40);const o=a.getImageData(0,0,40,40).data;let s={r:42,g:123,b:214},p=-1;for(let d=0;d<o.length;d+=4){const r=o[d],u=o[d+1],v=o[d+2];if(o[d+3]<128)continue;const w=Math.max(r,u,v),E=Math.min(r,u,v),C=(w+E)/510,J=w-E,et=J===0?0:J/(1-Math.abs(2*C-1));if(et>.25&&C>.25&&C<.82){const S=et*1.5+(1-Math.abs(C-.5));S>p&&(p=S,s={r,g:u,b:v})}}p>0?e(s):e(null)}catch{e(null)}},n.onerror=()=>e(null),n.src=t})}async function $e(t){const e=localStorage.getItem("melo-dynamic-theme")!=="0",n=document.documentElement;if(!e||!t){n.style.removeProperty("--accent"),n.style.removeProperty("--visualizer"),n.style.removeProperty("--accent-glow");return}const i=await ei(t);if(i){const a=`rgb(${i.r}, ${i.g}, ${i.b})`;n.style.setProperty("--accent",a),n.style.setProperty("--visualizer",a),n.style.setProperty("--accent-glow",`rgba(${i.r}, ${i.g}, ${i.b}, 0.35)`)}else n.style.removeProperty("--accent"),n.style.removeProperty("--visualizer"),n.style.removeProperty("--accent-glow")}const jt=[31,62,125,250,500,1e3,2e3,4e3,8e3,16e3];let Mt=null,ie=null,ne=[],Nt=null,Ot=null;function Kt(t){if(!Mt){const e=window.AudioContext||window.webkitAudioContext;Mt=new e;try{ie=Mt.createMediaElementSource(t)}catch{}if(ne=jt.map(n=>{const i=Mt.createBiquadFilter();return i.type="peaking",i.frequency.value=n,i.Q.value=1.4,i.gain.value=0,i}),Nt=Mt.createGain(),Nt.gain.value=1,Ot=Mt.createAnalyser(),Ot.fftSize=2048,Ot.smoothingTimeConstant=.72,ie){let n=ie;for(const i of ne)n.connect(i),n=i;n.connect(Nt),Nt.connect(Ot),Ot.connect(Mt.destination)}}return{ctx:Mt,filters:ne,gain:Nt,analyser:Ot,async resume(){Mt&&Mt.state==="suspended"&&await Mt.resume().catch(()=>{})}}}function ii(t,e){let n,i,a,o,s,p,d,r=null,u,v,m,w,E,C,J,et,S,D,O,z,g,y=[],T=0,W=!1,it="off",ut=!1;window.__LUMI_QUEUE__=y,window.__LUMI_SET_QUEUE__=c=>{y=c,window.__LUMI_QUEUE__=c};function nt(c){if(!isFinite(c))return"0:00";const L=Math.floor(c/60),I=Math.floor(c%60).toString().padStart(2,"0");return`${L}:${I}`}function Z(){if(!u)return;const c=parseFloat(u.max)||100,L=parseFloat(u.value)||0,I=c>0?L/c*100:0;u.style.setProperty("--progress",I+"%")}function lt(){v&&v.style.setProperty("--vol",v.value+"%")}async function mt(c){if(!c)return"";if(/^(https?|data|blob):/.test(c))return c;if(tt)try{const{convertFileSrc:L}=await V(async()=>{const{convertFileSrc:I}=await import("./core-DhEqZVGG.js");return{convertFileSrc:I}},[]);return L(c)}catch{}return c}async function gt(c,L=!0){if(!y.length)return;c<0&&(c=y.length-1),c>=y.length&&(c=0),T=c;const I=y[c];if(I){if(C||A(),t.src=await mt(I.path),t.load(),C&&(C.textContent=I.title||"Unknown Title"),J&&(J.textContent=I.artist||"Unknown Artist"),et&&(et.textContent=I.album||""),S&&(S.textContent=I.codec||"AUDIO"),D&&(D.textContent=I.specs||""),!I.cover&&I.path&&tt)try{const{invoke:U}=await V(async()=>{const{invoke:R}=await import("./core-DhEqZVGG.js");return{invoke:R}},[]),H=await U("get_track_cover",{path:I.path});H&&(I.cover=H)}catch{}I.cover&&O?(O.src=I.cover,O.style.display="block",z&&(z.style.display="none")):(O&&(O.style.display="none"),z&&(z.style.display="grid")),u&&(u.max=String(I.duration||240),u.value="0",Z()),w&&(w.textContent=nt(I.duration)),m&&(m.textContent="0:00"),b(),$e(I.cover||null),document.querySelectorAll(".track-row").forEach((U,H)=>{var R;U.classList.toggle("active",((R=y[H])==null?void 0:R.id)===I.id)}),"mediaSession"in navigator&&(navigator.mediaSession.metadata=new MediaMetadata({title:I.title,artist:I.artist,album:I.album,artwork:I.cover?[{src:I.cover,sizes:"512x512",type:"image/jpeg"}]:[]}),navigator.mediaSession.setActionHandler("play",()=>Lt()),navigator.mediaSession.setActionHandler("pause",()=>dt()),navigator.mediaSession.setActionHandler("previoustrack",()=>h()),navigator.mediaSession.setActionHandler("nexttrack",()=>At()),navigator.mediaSession.setActionHandler("seekto",U=>{U.seekTime&&(t.currentTime=U.seekTime)})),L&&Lt(),window.dispatchEvent(new CustomEvent("lumi:trackChange",{detail:I})),F("melo:track-changed",I)}}let rt=!1;function vt(){try{Kt(t).resume()}catch{}rt&&(rt=!1,t.play().then(()=>{i&&(i.style.display="none"),a&&(a.style.display="block")}).catch(()=>{}))}window.addEventListener("pointerdown",vt),window.addEventListener("keydown",vt);function Lt(){try{Kt(t).resume()}catch{}t.play().then(()=>{rt=!1,i&&(i.style.display="none"),a&&(a.style.display="block"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="playing")}).catch(()=>{rt||(rt=!0,e("Click once inside player to begin audio playback"))})}function dt(){t.pause(),i&&(i.style.display="block"),a&&(a.style.display="none"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}function It(){t.paused?Lt():dt()}function zt(){t.pause();try{t.currentTime=0}catch{}i&&(i.style.display="block"),a&&(a.style.display="none"),u&&(u.value="0",Z()),m&&(m.textContent="0:00"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}function At(){if(!y.length)return;if(it==="one"){t.currentTime=0,Lt();return}let c=T+1;if(W&&(c=Math.floor(Math.random()*y.length),c===T&&y.length>1&&(c=(c+1)%y.length)),c>=y.length)if(it==="all")c=0;else{dt();return}gt(c)}function h(){if(!y.length)return;if(t.currentTime>3){t.currentTime=0;return}let c=T-1;W&&(c=Math.floor(Math.random()*y.length)),c<0&&(it==="all"?c=y.length-1:c=0),gt(c)}function b(){var R;const c=y[T];if(!c||!v)return;const L=parseInt(v.value,10)/100,I=g&&g.checked&&(R=c.replayGain)!=null?R:0,U=Math.pow(10,I/20);let H=L*U;H=Math.min(1,Math.max(0,H)),t.volume=H}function A(){if(n=document.getElementById("btnPlay"),i=document.getElementById("iconPlay"),a=document.getElementById("iconPause"),o=document.getElementById("btnPrev"),s=document.getElementById("btnNext"),p=document.getElementById("btnShuffle"),d=document.getElementById("btnRepeat"),r=document.getElementById("btnStop"),u=document.getElementById("seekBar"),v=document.getElementById("volBar"),m=document.getElementById("curTime"),w=document.getElementById("durTime"),E=document.getElementById("volPct"),C=document.getElementById("trackTitle"),J=document.getElementById("trackArtist"),et=document.getElementById("trackAlbum"),S=document.getElementById("trackCodec"),D=document.getElementById("trackSpecs"),O=document.getElementById("coverImg"),z=document.getElementById("coverFallback"),g=document.getElementById("replayGainToggle"),n&&(n.onclick=It),r&&(r.onclick=zt),o&&(o.onclick=h),s&&(s.onclick=At),p&&(p.onclick=()=>{W=!W,p.classList.toggle("active",W),e(W?"Shuffle on":"Shuffle off")}),d&&(d.onclick=()=>{it=it==="off"?"all":it==="all"?"one":"off",d.classList.toggle("active",it!=="off");const c={off:"Repeat off",all:"Repeat all",one:"Repeat one"};e(c[it]),d.title=c[it]}),u&&(u.oninput=()=>{ut=!0,m&&(m.textContent=nt(parseFloat(u.value))),Z()},u.onchange=()=>{t.currentTime=parseFloat(u.value),ut=!1}),v&&(v.oninput=()=>{lt(),E&&(E.textContent=v.value+"%"),b()}),g&&(g.onchange=()=>b()),Z(),lt(),y[T]){const c=y[T];C&&(C.textContent=c.title||"Unknown Title"),J&&(J.textContent=c.artist||"Unknown Artist"),et&&(et.textContent=c.album||""),S&&(S.textContent=c.codec||"AUDIO"),D&&(D.textContent=c.specs||""),c.cover&&O&&(O.src=c.cover,O.style.display="block",z&&(z.style.display="none"))}}A(),t.addEventListener("timeupdate",()=>{!ut&&u&&m&&(u.value=String(Math.floor(t.currentTime)),m.textContent=nt(t.currentTime),Z())}),t.addEventListener("loadedmetadata",()=>{var L;if(!u||!w)return;const c=Math.floor(t.duration||((L=y[T])==null?void 0:L.duration)||240);u.max=String(c),w.textContent=nt(c),Z()}),t.addEventListener("ended",()=>{At()}),window.addEventListener("keydown",c=>{c.target.tagName!=="INPUT"&&(c.code==="Space"&&(c.preventDefault(),It()),c.code==="ArrowRight"&&(t.currentTime+=5),c.code==="ArrowLeft"&&(t.currentTime-=5),(c.key==="m"||c.key==="M")&&(t.muted=!t.muted,e(t.muted?"Muted":"Unmuted")),(c.key==="s"||c.key==="S")&&p&&p.click(),(c.key==="r"||c.key==="R")&&d&&d.click(),c.code==="ArrowUp"&&v&&(v.value=String(Math.min(100,parseInt(v.value,10)+5)),v.dispatchEvent(new Event("input"))),c.code==="ArrowDown"&&v&&(v.value=String(Math.max(0,parseInt(v.value,10)-5)),v.dispatchEvent(new Event("input"))))}),ct("melo:tray-action",c=>{c==="play_pause"?It():c==="next"?At():c==="prev"?h():c==="mute"&&(t.muted=!t.muted,e(t.muted?"Muted":"Unmuted"))}),window.LumiPlayer={get queue(){return y},set queue(c){y=c,window.__LUMI_QUEUE__=c},get currentIndex(){return T},loadTrack:gt,play:Lt,pause:dt,stop:zt,next:At,prev:h,get audio(){return t},rebind:A},window.__LUMI_REBIND__=A,ct("melo:play-tracks",c=>{if(!c||!Array.isArray(c.tracks)||!c.tracks.length)return;y=c.tracks,window.__LUMI_SET_QUEUE__(y);const L=Math.max(0,Math.min(c.index||0,y.length-1));gt(L,!0)})}const ni="MeloDB",ai=1;let ae=null;function Xt(){return ae||(ae=new Promise((t,e)=>{if(typeof indexedDB>"u")return e(new Error("IndexedDB not supported"));const n=indexedDB.open(ni,ai);n.onupgradeneeded=()=>{const i=n.result;i.objectStoreNames.contains("tracks")||i.createObjectStore("tracks",{keyPath:"id"}),i.objectStoreNames.contains("playlists")||i.createObjectStore("playlists",{keyPath:"id"}),i.objectStoreNames.contains("kv")||i.createObjectStore("kv",{keyPath:"key"})},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})),ae}async function Wt(t){try{const e=await Xt();return new Promise((n,i)=>{const a=e.transaction("tracks","readwrite"),o=a.objectStore("tracks");o.clear();for(const s of t)o.put(s);a.oncomplete=()=>n(),a.onerror=()=>i(a.error)})}catch{try{localStorage.setItem("melo-tracks",JSON.stringify(t.map(({cover:n,...i})=>i)))}catch{}}}async function se(){try{const t=await Xt();return new Promise(e=>{const a=t.transaction("tracks","readonly").objectStore("tracks").getAll();a.onsuccess=()=>{if(Array.isArray(a.result)&&a.result.length>0)e(a.result);else try{const o=localStorage.getItem("melo-tracks");e(o?JSON.parse(o):[])}catch{e([])}},a.onerror=()=>{try{const o=localStorage.getItem("melo-tracks");e(o?JSON.parse(o):[])}catch{e([])}}})}catch{try{const t=localStorage.getItem("melo-tracks");return t?JSON.parse(t):[]}catch{return[]}}}async function fe(t){try{const e=await Xt();return new Promise((n,i)=>{const a=e.transaction("playlists","readwrite"),o=a.objectStore("playlists");o.clear();for(const s of t)o.put(s);a.oncomplete=()=>n(),a.onerror=()=>i(a.error)})}catch{try{localStorage.setItem("melo-playlists",JSON.stringify(t))}catch{}}}async function Ue(){try{const t=await Xt();return new Promise(e=>{const a=t.transaction("playlists","readonly").objectStore("playlists").getAll();a.onsuccess=()=>{if(Array.isArray(a.result)&&a.result.length>0)e(a.result);else try{const o=localStorage.getItem("melo-playlists");e(o?JSON.parse(o):[])}catch{e([])}},a.onerror=()=>{try{const o=localStorage.getItem("melo-playlists");e(o?JSON.parse(o):[])}catch{e([])}}})}catch{try{const t=localStorage.getItem("melo-playlists");return t?JSON.parse(t):[]}catch{return[]}}}const Dt=tt,Rt=new URLSearchParams(location.search).get("panel")||"main";let at=[],yt=[{id:"p1",name:"Favorites",tracks:[],createdAt:Date.now()}];Ue().then(t=>{Array.isArray(t)&&t.length&&(yt=t)});se().then(t=>{Array.isArray(t)&&t.length&&(at=t)});function K(t){return String(t!=null?t:"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function oi(t){const e=Math.floor(t/60),n=Math.floor(t%60);return`${e}:${String(n).padStart(2,"0")}`}function ye(t,e){var pe,ue,me,ge;const n=document.getElementById("trackList");document.getElementById("playlistList");const i=document.getElementById("winPlaylistTracks"),a=document.getElementById("winPlaylistEmpty"),o=document.getElementById("playlistSelect"),s=document.getElementById("playlistSortSelect"),p=document.getElementById("searchInput"),d=document.getElementById("playlistSearchInput"),r=document.getElementById("libraryStats"),u=document.getElementById("btn-scan"),v=document.getElementById("btn-export-playlist"),m=document.getElementById("btn-new-playlist"),w=document.getElementById("queueList"),E=document.getElementById("tagEditor"),C=document.getElementById("libScanProgressWrap"),J=document.getElementById("libScanStatusText"),et=document.getElementById("libScanStatusPct"),S=document.getElementById("libScanProgressBar"),D=document.getElementById("tagTitle"),O=document.getElementById("tagArtist"),z=document.getElementById("tagAlbum"),g=document.getElementById("tagYear");document.getElementById("tagCover");let y="",T="",W="default",it=localStorage.getItem("melo-currentPlaylist")||((pe=yt[0])==null?void 0:pe.id)||"",ut="artists",nt=null,Z=null,lt=null,mt=null;const gt=document.getElementById("replayGainToggle");if(gt){const l=localStorage.getItem("melo-pref-rg");l!==null&&(gt.checked=l==="1"),gt.addEventListener("change",()=>{localStorage.setItem("melo-pref-rg",gt.checked?"1":"0")})}(ue=document.getElementById("libraryTabs"))==null||ue.querySelectorAll(".tab").forEach(l=>{l.addEventListener("click",()=>{document.querySelectorAll("#libraryTabs .tab").forEach(_=>_.classList.remove("active")),l.classList.add("active"),ut=l.dataset.libtab,nt=Z=lt=mt=null,$()})}),p==null||p.addEventListener("input",()=>{y=((p==null?void 0:p.value)||"").toLowerCase(),$()}),d&&d.addEventListener("input",()=>{T=d.value||"",B()}),s&&s.addEventListener("change",()=>{W=s.value||"default",B()}),Promise.all([se(),Ue()]).then(([l,_])=>{Array.isArray(l)&&l.length&&(at=l),Array.isArray(_)&&_.length&&(yt=_),$(),B(),xt()});const rt=document.createElement("div");rt.className="ctx-menu",rt.style.cssText="position:fixed; z-index:99999; background:var(--card-bg, #1a1a1a); border:1px solid var(--card-border, #333); border-radius:8px; padding:4px 0; box-shadow:0 8px 24px rgba(0,0,0,0.5); min-width:140px; display:none;",document.body.appendChild(rt);let vt=null;const Lt=()=>{rt.style.display="none",vt=null};document.addEventListener("click",Lt),document.addEventListener("keydown",l=>{l.key==="Escape"&&Lt()}),rt.addEventListener("click",l=>{var M;l.stopPropagation();const _=(M=l.target.closest("[data-act]"))==null?void 0:M.getAttribute("data-act");if(_==="edit"&&vt)Ht(vt);else if(_==="add-pl"&&vt)A([vt]),e("Added to playlist");else if(_==="remove"&&vt){const f=vt.id;at=at.filter(k=>k.id!==f),yt.forEach(k=>{k.tracks=k.tracks.filter(G=>G!==f)}),Wt(at),It(),$(),B(),e("Removed from library")}Lt()});function dt(){return yt.find(l=>l.id===it)||yt[0]}function It(){fe(yt),Dt&&F("melo:playlists-sync",{src:Rt,playlists:yt})}function zt(){Dt&&F("melo:playlists-sync",{src:Rt,playlists:yt})}function At(l){it=l,localStorage.setItem("melo-currentPlaylist",l),B()}ct("melo:playlists-sync",l=>{l&&l.src!==Rt&&Array.isArray(l.playlists)&&(yt=l.playlists,B(),$())});function h(){Wt(at)}function b(l,_=!1){let M=!1;const f=new Set(at.map(k=>k.id));for(const k of l)f.has(k.id)||(at.push(k),f.add(k.id),M=!0);M&&(h(),$(),B()),_&&Dt&&F("melo:tracks-add",{src:Rt,list:l})}ct("melo:tracks-add",l=>{l&&l.src!==Rt&&Array.isArray(l.list)&&b(l.list)}),ct("melo:tracks-sync",l=>{l&&l.src!==Rt&&se().then(_=>{Array.isArray(_)&&(at=_,$(),B())})});function A(l){const _=dt();if(!_)return;let M=!1;const f=new Set(_.tracks);for(const k of l)f.has(k.id)||(_.tracks.push(k.id),f.add(k.id),M=!0);M&&(It(),zt(),B(),$())}let c=0,L=[],I=0;ct("melo:scan-progress",l=>{if(l&&C&&J&&et&&S){C.style.display="flex";const _=l.done||0,M=l.total||0,f=M?Math.min(100,Math.round(_/M*100)):0;J.textContent=`Scanning: ${_.toLocaleString()} / ${M.toLocaleString()} files`,et.textContent=`${f}%`,S.style.width=`${f}%`,clearTimeout(c),(l.finished||M>0&&_>=M)&&(J.textContent=`Scan complete: ${M.toLocaleString()} tracks`,et.textContent="100%",S.style.width="100%",c=setTimeout(()=>{C&&(C.style.display="none")},2e3))}}),ct("melo:scan-batch",l=>{if(Array.isArray(l)&&l.length){for(const _ of l)_.source="scan",L.push(_);I||(I=setTimeout(()=>{if(I=0,L.length){const _=L;L=[];const M=new Set(at.map(k=>k.id));let f=!1;for(const k of _)M.has(k.id)||(at.push(k),M.add(k.id),f=!0);if(f){const k=at.filter(Q=>Q.source==="scan"),G=new Set(k.map(Q=>Q.artist)).size,Y=new Set(k.map(Q=>Q.artist+"\0"+Q.album)).size;r&&(r.textContent=`${k.length.toLocaleString()} tracks • ${G.toLocaleString()} artists • ${Y.toLocaleString()} albums`)}}},400))}}),u==null||u.addEventListener("click",async()=>{if(Dt)try{const{open:l}=await V(async()=>{const{open:M}=await import("./index-CS3Qnt9j.js");return{open:M}},__vite__mapDeps([5,1])),_=await l({directory:!0,multiple:!1});if(_){e("Scanning folder in the background…"),C&&(C.style.display="flex");const{invoke:M}=await V(async()=>{const{invoke:k}=await import("./core-DhEqZVGG.js");return{invoke:k}},[]),f=await M("scan_library",{path:_});Array.isArray(f)&&(f.forEach(k=>k.source="scan"),b(f,!0),A(f),await Wt(at),await fe(yt),F("melo:tracks-sync",{src:Rt}),$(),B(),e(`Library updated: ${f.length.toLocaleString()} tracks`))}}catch{e("Scanning requires the Tauri build")}else{const l=document.createElement("input");l.type="file",l.multiple=!0,l.accept="audio/*",l.onchange=async()=>{var M;const _=Array.from(l.files||[]);for(const f of _){const k=URL.createObjectURL(f),G=Math.random().toString(36).slice(2),Y=((M=f.name.split(".").pop())==null?void 0:M.toUpperCase())||"MP3",Q={id:G,title:f.name.replace(/\.[^/.]+$/,""),artist:"Unknown",album:"Imported",genre:"Unknown",year:new Date().getFullYear(),duration:180,path:k,codec:Y,specs:"Imported · Stereo",replayGain:0,source:"scan"};await le(f,Q),at.push(Q)}await Wt(at),e(`${_.length} file(s) added`),$(),xt()},l.click()}});async function U(l){if(!Dt)return[];const{invoke:_}=await V(async()=>{const{invoke:f}=await import("./core-DhEqZVGG.js");return{invoke:f}},[]),M=[];for(const f of l)try{const k=await _("scan_library",{path:f});k&&M.push(...k)}catch{}return M}Dt&&V(async()=>{const{getCurrentWebviewWindow:l}=await import("./webviewWindow-mjQkSB26.js");return{getCurrentWebviewWindow:l}},__vite__mapDeps([6,7,1,0,8])).then(({getCurrentWebviewWindow:l})=>{l().onDragDropEvent(async M=>{var f;if(M.payload.type==="drop"){const k=M.payload.paths||[];if(!k.length)return;const G=await U(k);if(!G.length)return;G.forEach(Y=>Y.source="import"),b(G,!0),A(G),F("melo:play-tracks",{tracks:G,index:0}),e(`Playing ${((f=G[0])==null?void 0:f.title)||"track"}`)}})}).catch(()=>{});function H(){return at.filter(l=>l.source==="scan")}const R=44;function st(l,_,M,f){if(!_.length){l.innerHTML='<div style="padding:30px; text-align:center; color:var(--text-muted); font-size:12px;">No tracks found</div>';return}l.style.position="relative",l.style.overflowY="auto";const k=()=>{const G=l.scrollTop,Y=l.clientHeight||400,Q=_.length,ft=Math.max(0,Math.floor(G/R)-4),kt=Math.min(Q,Math.ceil((G+Y)/R)+4),Et=ft*R,Vt=Math.max(0,(Q-kt)*R),ot=_.slice(ft,kt).map((x,P)=>{const j=ft+P,Ft=oi(x.duration||0);return M==="library"?`
          <div class="track-row" draggable="true" data-vidx="${j}" data-id="${K(x.id)}" style="height:${R}px; box-sizing:border-box;">
            <span class="num">${j+1}</span>
            ${x.cover?`<img class="track-cover-mini" src="${x.cover}" onerror="this.style.display='none'"/>`:'<div class="track-cover-mini cover-default">♪</div>'}
            <div style="flex:1; min-width:0;">
              <div class="t-title">${K(x.title)}</div>
              <div class="t-artist">${K(x.artist)} • ${K(x.album)}${x.year?" • "+x.year:""}</div>
            </div>
            <span style="font-size:10px; padding:2px 6px; border-radius:6px; background:var(--badge-bg); color:var(--badge-text); border:1px solid var(--card-border);">${K(x.codec||"AUDIO")}</span>
            <span class="t-dur">${Ft}</span>
            <button class="btn small ghost" data-action="add-queue" data-vidx="${j}">+</button>
          </div>`:`
          <div class="track-row" draggable="true" data-vidx="${j}" data-id="${K(x.id)}" style="height:${R}px; box-sizing:border-box;">
            <span class="num">${j+1}</span>
            ${x.cover?`<img class="track-cover-mini" src="${x.cover}" onerror="this.style.display='none'"/>`:'<div class="track-cover-mini cover-default">♪</div>'}
            <div style="flex:1; min-width:0;">
              <div class="t-title">${K(x.title)}</div>
              <div class="t-artist">${K(x.artist)} • ${K(x.album)}</div>
            </div>
            <span class="t-dur">${Ft}</span>
            <button class="btn small ghost" data-action="pl-remove" data-vidx="${j}" title="Remove from playlist">×</button>
          </div>`}).join("");l.innerHTML=`
        <div class="vscroll-wrapper" style="padding-top:${Et}px; padding-bottom:${Vt}px; display:flex; flex-direction:column;">
          ${ot}
        </div>
      `};if(!l.__vscrollAttached){l.__vscrollAttached=!0;let G=0;l.addEventListener("scroll",()=>{G&&cancelAnimationFrame(G),G=requestAnimationFrame(()=>{l.__vscrollUpdate&&l.__vscrollUpdate()})}),l.addEventListener("contextmenu",Y=>{const ft=Y.target.closest(".track-row");if(!ft)return;Y.preventDefault(),Y.stopPropagation();const kt=parseInt(ft.dataset.vidx||"0",10);vt=(l.__vscrollItems||[])[kt]||null,vt&&(rt.innerHTML=`
          <button class="ctx-item" data-act="edit" style="width:100%; text-align:left; background:transparent; border:none; color:var(--text, #fff); padding:6px 12px; font-size:11px; cursor:pointer; display:flex; align-items:center; gap:8px;">✏️ Edit Metadata</button>
          <button class="ctx-item" data-act="add-pl" style="width:100%; text-align:left; background:transparent; border:none; color:var(--text, #fff); padding:6px 12px; font-size:11px; cursor:pointer; display:flex; align-items:center; gap:8px;">➕ Add to Playlist</button>
          <button class="ctx-item" data-act="remove" style="width:100%; text-align:left; background:transparent; border:none; color:#ff5c5c; padding:6px 12px; font-size:11px; cursor:pointer; display:flex; align-items:center; gap:8px;">🗑️ Remove</button>
        `,rt.style.left=`${Math.min(window.innerWidth-160,Y.clientX)}px`,rt.style.top=`${Math.min(window.innerHeight-130,Y.clientY)}px`,rt.style.display="block")}),l.addEventListener("click",Y=>{const Q=Y.target,ft=Q.closest(".track-row");if(!ft)return;const kt=parseInt(ft.dataset.vidx||"0",10);if(Q.closest("[data-action='add-queue']")){Y.stopPropagation();const Et=l.__vscrollItems||[];Et[kt]&&_t(Et[kt]);return}if(Q.closest("[data-action='pl-remove']")){Y.stopPropagation();const Et=dt();if(Et){const N=(l.__vscrollItems||[])[kt];if(N){const ot=Et.tracks.indexOf(N.id);ot>=0&&(Et.tracks.splice(ot,1),It(),B(),e("Removed from playlist"))}}return}f(kt,Y)})}l.__vscrollItems=_,l.__vscrollUpdate=k,k()}function B(){if(!i)return;const l=dt();if(o&&(o.innerHTML=yt.map(f=>`<option value="${f.id}" ${l&&f.id===l.id?"selected":""}>${K(f.name)}</option>`).join("")),!l){i.innerHTML="",i.style.display="none",a&&(a.style.display="block");return}const _=new Map;for(const f of at)_.set(f.id,f),_.set(f.path,f);let M=l.tracks.map((f,k)=>{const G=_.get(f);if(G)return G;const Y=f.replace(/^.*[\\/]/,""),Q=Y.lastIndexOf("."),ft=Q>0?Y.slice(0,Q):Y;return{id:f,title:ft||`Track ${k+1}`,artist:"Audio Track",album:l.name,duration:0,path:f,codec:"AUDIO",specs:"Local File",source:"import"}});if(T.trim()){const f=T.toLowerCase().trim();M=M.filter(k=>(k.title||"").toLowerCase().includes(f)||(k.artist||"").toLowerCase().includes(f)||(k.album||"").toLowerCase().includes(f))}W==="title-asc"?M.sort((f,k)=>(f.title||"").localeCompare(k.title||"")):W==="artist-asc"?M.sort((f,k)=>(f.artist||"").localeCompare(k.artist||"")):W==="album-asc"?M.sort((f,k)=>(f.album||"").localeCompare(k.album||"")):W==="dur-asc"?M.sort((f,k)=>(f.duration||0)-(k.duration||0)):W==="dur-desc"&&M.sort((f,k)=>(k.duration||0)-(f.duration||0)),a&&(a.style.display=M.length?"none":"block"),i.style.display=M.length?"flex":"none",st(i,M,"playlist",f=>{M[f]&&F("melo:play-tracks",{tracks:M,index:f})})}function $(){var k,G,Y,Q,ft,kt,Et,Vt;if(!n){B();return}const l=H(),_=new Set(l.map(N=>N.artist)).size,M=new Set(l.map(N=>N.artist+"\0"+N.album)).size;r&&(r.textContent=`${l.length.toLocaleString()} tracks • ${_.toLocaleString()} artists • ${M.toLocaleString()} albums`);const f=y.trim().toLowerCase();if(ut==="artists")if(nt){const N=l.filter(x=>x.artist===nt),ot=[...new Set(N.map(x=>x.album))].sort((x,P)=>x.localeCompare(P));if(Z){const x=N.filter(j=>j.album===Z);n.innerHTML=`
            <div class="breadcrumb">
              <span class="crumb-link" id="crumbBackArtist">‹ ${K(nt)}</span>
              <span class="crumb-sep">/</span>
              <span class="crumb-cur">${K(Z)}</span>
              <button class="btn small primary play-all-btn" id="btnPlayAlbAll">▶ Play Album (${x.length})</button>
            </div>
            <div id="innerVirtualTrackList" style="flex:1; overflow-y:auto;"></div>
          `,(Y=document.getElementById("crumbBackArtist"))==null||Y.addEventListener("click",()=>{Z=null,$()}),(Q=document.getElementById("btnPlayAlbAll"))==null||Q.addEventListener("click",()=>{F("melo:play-tracks",{tracks:x,index:0})});const P=document.getElementById("innerVirtualTrackList");P&&st(P,x,"library",j=>{F("melo:play-tracks",{tracks:x,index:j})})}else{let x=`
            <div class="breadcrumb">
              <span class="crumb-link" id="crumbBackArtists">‹ All Artists</span>
              <span class="crumb-sep">/</span>
              <span class="crumb-cur">${K(nt)}</span>
              <button class="btn small primary play-all-btn" id="btnPlayArtistAll">▶ Play All (${N.length})</button>
            </div>
          `;x+=ot.map(P=>{var Ft;const j=N.filter(Ke=>Ke.album===P);return`<div class="lib-item" data-album="${K(P)}"><div class="lib-avatar alb">💿</div><div style="flex:1;min-width:0;"><div class="t-title">${K(P)}</div><div class="t-artist">${j.length} track(s)${(Ft=j[0])!=null&&Ft.year?" • "+j[0].year:""}</div></div><span class="chev-r">›</span></div>`}).join(""),n.innerHTML=x,(k=document.getElementById("crumbBackArtists"))==null||k.addEventListener("click",()=>{nt=null,$()}),(G=document.getElementById("btnPlayArtistAll"))==null||G.addEventListener("click",()=>{F("melo:play-tracks",{tracks:N,index:0})}),n.querySelectorAll("[data-album]").forEach(P=>{P.addEventListener("click",()=>{Z=P.dataset.album,$()})})}}else{const N=[...new Set(l.map(x=>x.artist))].sort((x,P)=>x.localeCompare(P)),ot=f?N.filter(x=>x.toLowerCase().includes(f)):N;n.innerHTML=ot.map(x=>{const P=l.filter(j=>j.artist===x).length;return`<div class="lib-item" data-artist="${K(x)}"><div class="lib-avatar">${K((x[0]||"?").toUpperCase())}</div><div style="flex:1;min-width:0;"><div class="t-title">${K(x)}</div><div class="t-artist">${P} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No artists found.</div>',n.querySelectorAll("[data-artist]").forEach(x=>{x.addEventListener("click",()=>{nt=x.dataset.artist,Z=null,$()})})}else if(ut==="albums")if(lt){const[N,ot]=lt.split("\0"),x=l.filter(j=>j.artist===N&&j.album===ot);n.innerHTML=`
          <div class="breadcrumb">
            <span class="crumb-link" id="crumbBackAlbums">‹ All Albums</span>
            <span class="crumb-sep">/</span>
            <span class="crumb-cur">${K(ot)}</span>
            <button class="btn small primary play-all-btn" id="btnPlayAlbumKey">▶ Play (${x.length})</button>
          </div>
          <div id="innerVirtualTrackList" style="flex:1; overflow-y:auto;"></div>
        `,(ft=document.getElementById("crumbBackAlbums"))==null||ft.addEventListener("click",()=>{lt=null,$()}),(kt=document.getElementById("btnPlayAlbumKey"))==null||kt.addEventListener("click",()=>{F("melo:play-tracks",{tracks:x,index:0})});const P=document.getElementById("innerVirtualTrackList");P&&st(P,x,"library",j=>{F("melo:play-tracks",{tracks:x,index:j})})}else{const N=new Map;l.forEach(P=>{const j=P.artist+"\0"+P.album;N.has(j)?N.get(j).count++:N.set(j,{artist:P.artist,album:P.album,count:1,year:P.year||0})});const ot=Array.from(N.values()).sort((P,j)=>P.album.localeCompare(j.album)),x=f?ot.filter(P=>P.album.toLowerCase().includes(f)||P.artist.toLowerCase().includes(f)):ot;n.innerHTML=x.map(P=>`
          <div class="lib-item" data-albkey="${K(P.artist+"\0"+P.album)}">
            <div class="lib-avatar alb">💿</div>
            <div style="flex:1;min-width:0;">
              <div class="t-title">${K(P.album)}</div>
              <div class="t-artist">${K(P.artist)} • ${P.count} track(s)${P.year?" • "+P.year:""}</div>
            </div>
            <span class="chev-r">›</span>
          </div>
        `).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No albums found.</div>',n.querySelectorAll("[data-albkey]").forEach(P=>{P.addEventListener("click",()=>{lt=P.dataset.albkey,$()})})}else if(ut==="genres")if(mt){const N=l.filter(x=>(x.genre||"Unknown")===mt);n.innerHTML=`
          <div class="breadcrumb">
            <span class="crumb-link" id="crumbBackGenres">‹ All Genres</span>
            <span class="crumb-sep">/</span>
            <span class="crumb-cur">${K(mt)}</span>
            <button class="btn small primary play-all-btn" id="btnPlayGenreAll">▶ Play (${N.length})</button>
          </div>
          <div id="innerVirtualTrackList" style="flex:1; overflow-y:auto;"></div>
        `,(Et=document.getElementById("crumbBackGenres"))==null||Et.addEventListener("click",()=>{mt=null,$()}),(Vt=document.getElementById("btnPlayGenreAll"))==null||Vt.addEventListener("click",()=>{F("melo:play-tracks",{tracks:N,index:0})});const ot=document.getElementById("innerVirtualTrackList");ot&&st(ot,N,"library",x=>{F("melo:play-tracks",{tracks:N,index:x})})}else{const N=[...new Set(l.map(x=>x.genre||"Unknown"))].sort((x,P)=>x.localeCompare(P)),ot=f?N.filter(x=>x.toLowerCase().includes(f)):N;n.innerHTML=ot.map(x=>{const P=l.filter(j=>(j.genre||"Unknown")===x).length;return`<div class="lib-item" data-genre="${K(x)}"><div class="lib-avatar gen">🏷️</div><div style="flex:1;min-width:0;"><div class="t-title">${K(x)}</div><div class="t-artist">${P} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No genres found.</div>',n.querySelectorAll("[data-genre]").forEach(x=>{x.addEventListener("click",()=>{mt=x.dataset.genre,$()})})}B()}function _t(l){F("melo:add-queue",l),e(`Queued: ${l.title}`)}function xt(){if(!w)return;const l=window.LumiPlayer,_=(l==null?void 0:l.queue)||at.slice(0,4);if(!_.length){w.innerHTML='<div style="text-align:center;color:var(--text-muted);font-size:12px;padding:12px;">Queue is empty</div>';return}w.innerHTML=_.map((M,f)=>{var k;return`
      <div class="track-row" data-id="${M.id}" data-queue-idx="${f}" style="padding:6px 8px;border-radius:8px;border:1px solid ${f===((k=l==null?void 0:l.currentIndex)!=null?k:0)?"var(--accent)":"transparent"};">
        <img class="track-cover-mini" src="${M.cover||""}" style="width:24px;height:24px;${M.cover?"":"display:none"}" />
        <div style="flex:1;min-width:0;">
          <div class="t-title" style="font-size:11.5px;">${K(M.title)}</div>
          <div class="t-artist" style="font-size:10px;">${K(M.artist)}</div>
        </div>
      </div>
    `}).join("")}m==null||m.addEventListener("click",()=>{const l=prompt("New playlist name:");if(!l)return;const _={id:"pl_"+Math.random().toString(36).slice(2,9),name:l.trim(),tracks:[],createdAt:Date.now()};yt.push(_),It(),At(_.id),e(`Playlist "${_.name}" created`)}),o&&o.addEventListener("change",()=>{At(o.value)}),v==null||v.addEventListener("click",()=>{const l=dt();if(!l||!l.tracks.length)return e("Current playlist is empty");const _=["#EXTM3U",...l.tracks.map(G=>{const Y=at.find(Q=>Q.id===G);return Y?Y.path:G})].join(`
`),M=new Blob([_],{type:"audio/x-mpegurl"}),f=URL.createObjectURL(M),k=document.createElement("a");k.href=f,k.download=`${l.name||"playlist"}.m3u`,k.click(),URL.revokeObjectURL(f),e("M3U Playlist exported")});let ht=null;function Ht(l){if(ht=l,!ht||!E)return e("No track to edit");E.style.display="flex",D&&(D.value=ht.title||""),O&&(O.value=ht.artist||""),z&&(z.value=ht.album||""),g&&(g.value=String(ht.year||""))}(me=document.getElementById("btn-tag-cancel"))==null||me.addEventListener("click",()=>{E&&(E.style.display="none")}),(ge=document.getElementById("btn-tag-save"))==null||ge.addEventListener("click",async()=>{const l=ht;if(!(!l||!E)){if(l.title=(D==null?void 0:D.value.trim())||l.title,l.artist=(O==null?void 0:O.value.trim())||l.artist,l.album=(z==null?void 0:z.value.trim())||l.album,l.year=parseInt((g==null?void 0:g.value)||"0",10)||0,Dt&&l.path)try{const{invoke:_}=await V(async()=>{const{invoke:M}=await import("./core-DhEqZVGG.js");return{invoke:M}},[]);await _("write_tags",{path:l.path,tags:{title:l.title,artist:l.artist,album:l.album}})}catch{}E.style.display="none",await Wt(at),$(),B(),F("melo:tag-updated",l),e("Metadata saved")}}),window.LumiLibrary={get tracks(){return at},get playlists(){return yt},render:$,addTracks:b,addToCurrentPlaylist:A,importPaths:U,currentPlaylistName:()=>{var l;return((l=dt())==null?void 0:l.name)||"Playlist"}}}const Gt={flat:[0,0,0,0,0,0,0,0,0,0],pop:[-1,2,4,4,2,-1,-1,2,3,3],rock:[4,3,2,-1,-2,-2,1,3,4,4],bass:[6,5,4,2,1,0,-1,-1,-2,-3],treble:[-3,-2,-1,0,1,2,3,5,6,6],dance:[5,4,2,0,-1,-1,2,4,5,3],jazz:[2,1,2,3,2,0,1,2,3,2],classical:[3,2,1,0,0,0,-1,2,3,4],vocal:[-2,-1,0,2,4,4,3,1,0,-1],acoustic:[3,2,1,1,2,2,3,3,2,1],hiphop:[5,4,1,2,-1,-1,1,-1,2,3],metal:[4,2,-1,-2,-1,1,3,4,5,4]};function oe(t){for(const[e,n]of Object.entries(Gt))if(n.every((i,a)=>i===t[a]))return e;return"custom"}function be(t,e,n={}){const i=!!n.remote,a=document.getElementById("eqEnable"),o=document.getElementById("eqPreset"),s=document.getElementById("btnEqReset"),p=document.getElementById("eqBands"),d=document.getElementById("eqCanvas"),r=d?d.getContext("2d"):null;let u=null,v=[],m=[],w=new Array(jt.length).fill(0);try{const g=JSON.parse(localStorage.getItem("melo-eq-gains")||"null");Array.isArray(g)&&g.length===jt.length&&(w=g.map(y=>typeof y=="number"?Math.max(-12,Math.min(12,y)):0))}catch{}let E=localStorage.getItem("melo-eq-preset")||oe(w),C=localStorage.getItem("melo-eq-enabled")!=="0";function J(){if(!u)try{const g=Kt(t);u=g.ctx,v=g.filters,v.forEach((y,T)=>{y.gain.value=C?w[T]:0})}catch{}}function et(g,y){J(),v[g]&&C&&(v[g].gain.value=y)}function S(g){J(),w=[...g],C&&g.forEach((y,T)=>{v[T]&&(v[T].gain.value=y)}),z()}function D(g){J(),C=g,g?w.forEach((y,T)=>{v[T]&&(v[T].gain.value=y)}):v.forEach(y=>{y.gain.value=0}),z()}i||t&&t.addEventListener("play",()=>{J(),(u==null?void 0:u.state)==="suspended"&&u.resume().catch(()=>{})}),ct("melo:eq",g=>{g&&(g.type==="gain"?(i||et(g.idx,g.val),w[g.idx]=g.val,m[g.idx]&&(m[g.idx].value=String(g.val),O(m[g.idx])),o&&(o.value=oe(w)),z()):g.type==="gains"?(i||S(g.values),w=[...g.values],m.length&&m.forEach((y,T)=>{y.value=String(w[T]),O(y)}),o&&g.preset&&(o.value=g.preset),z()):g.type==="enable"&&(C=!!g.on,i||D(C),a&&(a.checked=C),z()))});function O(g){var W;const y=parseInt(g.value),T=(W=g.parentElement)==null?void 0:W.querySelector(".val");T&&(T.textContent=(y>0?"+":"")+y+"dB")}function z(){if(!d||!r)return;const g=window.devicePixelRatio||1,y=d.clientWidth*g,T=d.clientHeight*g;if(y<=0||T<=0)return;d.width=y,d.height=T,r.clearRect(0,0,y,T);const W=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#2a7bd6",it=w;if(!C){r.strokeStyle="rgba(100,120,150,0.25)",r.lineWidth=2*g,r.beginPath(),r.moveTo(0,T/2),r.lineTo(y,T/2),r.stroke();return}r.strokeStyle=W,r.lineWidth=2.5*g,r.lineJoin="round",r.beginPath(),it.forEach((ut,nt)=>{const Z=nt/(it.length-1)*y,lt=T/2-ut/12*(T/2-10*g);if(nt===0)r.moveTo(Z,lt);else{const mt=(nt-1)/(it.length-1)*y,gt=T/2-it[nt-1]/12*(T/2-10*g);r.quadraticCurveTo((mt+Z)/2,gt,Z,lt)}}),r.stroke(),it.forEach((ut,nt)=>{const Z=nt/(it.length-1)*y,lt=T/2-ut/12*(T/2-10*g);r.fillStyle=W,r.beginPath(),r.arc(Z,lt,4*g,0,Math.PI*2),r.fill(),r.fillStyle="white",r.beginPath(),r.arc(Z,lt,2*g,0,Math.PI*2),r.fill()}),r.strokeStyle="rgba(100,120,150,0.3)",r.lineWidth=1*g,r.setLineDash([4*g,4*g]),r.beginPath(),r.moveTo(0,T/2),r.lineTo(y,T/2),r.stroke(),r.setLineDash([])}p&&(p.innerHTML="",jt.forEach((g,y)=>{const T=w[y]||0,W=document.createElement("div");W.className="eq-band",W.innerHTML=`
        <input type="range" min="-12" max="12" value="${T}" step="1" data-idx="${y}" orient="vertical" />
        <label>${g>=1e3?g/1e3+"k":g}</label>
        <span style="font-size:10px;color:var(--text-muted);min-height:12px;" class="val">${(T>0?"+":"")+T+"dB"}</span>
      `,p.appendChild(W)}),m=Array.from(p.querySelectorAll("input")),m.forEach(g=>{g.addEventListener("input",()=>{const y=parseInt(g.dataset.idx),T=parseInt(g.value);O(g),w[y]=T,z();const W=oe(w);o&&(o.value=W),localStorage.setItem("melo-eq-gains",JSON.stringify(w)),localStorage.setItem("melo-eq-preset",W),i||et(y,T),F("melo:eq",{type:"gain",idx:y,val:T,values:w})})})),o&&(o.value=E,o.addEventListener("change",()=>{const g=Gt[o.value]||Gt.flat;m.length&&m.forEach((y,T)=>{y.value=String(g[T]),O(y)}),w=[...g],z(),localStorage.setItem("melo-eq-gains",JSON.stringify(w)),localStorage.setItem("melo-eq-preset",o.value),i||S(g),F("melo:eq",{type:"gains",values:g,preset:o.value}),e(`Preset: ${o.options[o.selectedIndex].text}`)})),s&&s.addEventListener("click",()=>{const g=Gt.flat;m.length&&m.forEach((y,T)=>{y.value="0",O(y)}),w=[...g],o&&(o.value="flat"),localStorage.setItem("melo-eq-gains",JSON.stringify(w)),localStorage.setItem("melo-eq-preset","flat"),i||S(g),F("melo:eq",{type:"gains",values:g,preset:"flat"}),z(),e("Equalizer reset to Flat (0dB)")}),a&&(a.checked=C,a.addEventListener("change",()=>{C=a.checked,localStorage.setItem("melo-eq-enabled",C?"1":"0"),i||D(C),F("melo:eq",{type:"enable",on:C}),z(),e(C?"Equalizer On":"Equalizer off — Flat")})),d&&new ResizeObserver(()=>z()).observe(d),z(),window.LumiEqualizer={presets:Gt,frequencies:jt,displayGains:w,reset:()=>s==null?void 0:s.click()}}const $t=[{id:"bars",label:"Classic Bars"},{id:"thin",label:"Thin Bars"},{id:"line",label:"Spectrum Line"},{id:"mirror",label:"Mirror Bars"},{id:"wave",label:"Oscilloscope"}];function si(t){let e=document.getElementById("vizBars");if(!e)return;let n=C(e),i=n.getContext("2d"),a=null,o=null,s=null,p=null,d=null,r=!1,u=localStorage.getItem("melo-viz-mode")||"bars";$t.some(h=>h.id===u)||(u="bars");let v=0,m=[],w=.45,E=null;function C(h){let b=h.querySelector("canvas");return b||(h.innerHTML="",b=document.createElement("canvas"),h.appendChild(b)),b}function J(){if(!(o&&s))try{const h=Kt(t);a=h.ctx,o=h.analyser,s=new Uint8Array(o.frequencyBinCount),p=new Uint8Array(o.fftSize)}catch{r=!0}}function et(h){const b=s.length,A=((a==null?void 0:a.sampleRate)||44100)/2,c=45,L=Math.min(15e3,A*.95),I=Math.log(c),U=Math.log(L),H=[];for(let R=0;R<h;R++){const st=Math.exp(I+(U-I)*R/h),B=Math.exp(I+(U-I)*(R+1)/h);let $=Math.floor(st/A*b),_t=Math.max($+1,Math.ceil(B/A*b));$<0&&($=0),_t>b&&(_t=b);let xt=0;for(let ht=$;ht<_t;ht++)xt+=s[ht];H.push(xt/(_t-$)/255)}return H}function S(h){const b=performance.now()/1e3,A=Math.pow(Math.abs(Math.sin(b*2.2)),2.5),c=[];for(let L=0;L<h;L++){let I=.42+.26*Math.sin(b*1.35+L*.62)+.2*Math.sin(b*2.9+L*1.31)+Math.random()*.07;I*=.55+.5*A,c.push(Math.max(.04,Math.min(1,I)))}return c}function D(h){const b=performance.now()/1e3,A=.5+.5*Math.pow(Math.abs(Math.sin(b*1.9)),2);for(let c=0;c<h.length;c++){const L=c/h.length;h[c]=128+66*A*(Math.sin(L*Math.PI*6+b*7)*.6+Math.sin(L*Math.PI*13-b*11)*.4)}}function O(h){let b;if(r||!o||!s)b=S(h);else if(o.getByteFrequencyData(s),b=et(h),!b.some(L=>L>.01)&&!t.paused)b=S(h);else for(let L=0;L<h;L++)b[L]*=1+1.7*(L/Math.max(1,h-1));let A=0;for(const c of b)c>A&&(A=c);A>w?w=A:w=Math.max(.35,w*.985),m.length!==h&&(m=new Array(h).fill(0));for(let c=0;c<h;c++){const L=Math.min(1,b[c]/w),I=L>m[c]?.55:.16;m[c]+=(L-m[c])*I}return m}function z(h,b){return getComputedStyle(document.documentElement).getPropertyValue(h).trim()||b}function g(){return n.width/Math.max(1,n.clientWidth)||1}function y(h,b,A,c,L){if(L=Math.min(L,A/2,c/2),i.roundRect){i.roundRect(h,b,A,c,L);return}i.rect(h,b,A,c)}function T(){const h=window.devicePixelRatio||1,b=n.clientWidth||(e==null?void 0:e.clientWidth)||200,A=n.clientHeight||(e==null?void 0:e.clientHeight)||56;b>0&&A>0&&(n.width=Math.round(b*h),n.height=Math.round(A*h))}new ResizeObserver(T).observe(n),T();function W(h,b,A,c){const L=g(),I=z("--visualizer","#38bdf8"),U=z("--accent","#0284c7"),H=h.length,R=b/H,st=Math.max(1.2*L,R*(1-c));for(let B=0;B<H;B++){const $=h[B],_t=Math.max(2*L,$*(A-4*L)),xt=B*R+(R-st)/2,ht=A-_t-1*L,Ht=i.createLinearGradient(0,ht,0,A);Ht.addColorStop(0,U),Ht.addColorStop(1,I),i.fillStyle=Ht,i.beginPath(),y(xt,ht,st,_t,Math.min(st/2,3.5*L)),i.fill()}}function it(h,b,A){const c=g(),L=z("--visualizer","#38bdf8"),I=z("--accent","#0284c7"),U=h.length,H=b/U,R=A/2,st=Math.max(1.5*c,H*.62);for(let B=0;B<U;B++){const $=Math.max(1.5*c,h[B]*(A/2-3*c)),_t=B*H+(H-st)/2,xt=i.createLinearGradient(0,R-$,0,R+$);xt.addColorStop(0,I),xt.addColorStop(.5,L),xt.addColorStop(1,I),i.fillStyle=xt,i.beginPath(),y(_t,R-$,st,$*2,Math.min(st/2,3*c)),i.fill()}}function ut(h,b,A){const c=g(),L=z("--visualizer","#38bdf8"),I=z("--accent","#0284c7"),U=h.length,H=[],R=[];for(let B=0;B<U;B++)H.push((B+.5)/U*b),R.push(A-2*c-h[B]*(A-8*c));i.beginPath(),i.moveTo(H[0],A),i.lineTo(H[0],R[0]);for(let B=1;B<U;B++){const $=(H[B-1]+H[B])/2;i.quadraticCurveTo(H[B-1],R[B-1],$,(R[B-1]+R[B])/2)}i.lineTo(H[U-1],R[U-1]),i.lineTo(H[U-1],A),i.closePath();const st=i.createLinearGradient(0,0,0,A);st.addColorStop(0,L),st.addColorStop(1,"transparent"),i.globalAlpha=.18,i.fillStyle=st,i.fill(),i.globalAlpha=1,i.beginPath(),i.moveTo(H[0],R[0]);for(let B=1;B<U;B++){const $=(H[B-1]+H[B])/2;i.quadraticCurveTo(H[B-1],R[B-1],$,(R[B-1]+R[B])/2)}i.lineTo(H[U-1],R[U-1]),i.strokeStyle=I,i.lineWidth=2*c,i.lineJoin="round",i.stroke()}function nt(){const h=n.width,b=n.height,A=g(),c=z("--accent","#0284c7");let L;r||!o||!p?(d||(d=new Uint8Array(1024)),D(d),L=d):(o.getByteTimeDomainData(p),L=p);const I=()=>{i.beginPath();for(let U=0;U<=h;U+=2){const H=Math.min(L.length-1,Math.floor(U/h*L.length)),R=L[H]/255*b;U===0?i.moveTo(U,R):i.lineTo(U,R)}};I(),i.strokeStyle=c,i.globalAlpha=.16,i.lineWidth=6*A,i.lineJoin="round",i.stroke(),I(),i.globalAlpha=1,i.lineWidth=1.8*A,i.stroke()}function Z(){const h=n.width,b=n.height;if(!h||!b)return;if(i.clearRect(0,0,h,b),u==="wave"){nt();return}const c=O(u==="bars"?16:u==="thin"?56:u==="line"?64:24);u==="bars"?W(c,h,b,.34):u==="thin"?W(c,h,b,.32):u==="line"?ut(c,h,b):u==="mirror"&&it(c,h,b)}function lt(){v=requestAnimationFrame(lt),Z()}function mt(){v||lt()}function gt(h,b=!1){var A;if(u=h,m=[],localStorage.setItem("melo-viz-mode",h),!b){const c=window.__TOAST__,L=(A=$t.find(I=>I.id===h))==null?void 0:A.label;c&&L&&c(`Visualizer: ${L}`)}}function rt(){return E||(E=document.createElement("div"),E.className="viz-menu",E.style.display="none",document.body.appendChild(E),E)}function vt(){const h=rt();h.innerHTML='<div class="viz-menu-label">Visualizer type</div>'+$t.map(b=>`<button class="viz-menu-item ${b.id===u?"active":""}" data-mode="${b.id}">${b.id===u?"✓":""}<span>${b.label}</span></button>`).join(""),h.querySelectorAll("[data-mode]").forEach(b=>{b.addEventListener("click",A=>{A.stopPropagation(),gt(b.dataset.mode),dt()})})}function Lt(h,b){vt();const A=E;A.style.display="block";const c=A.getBoundingClientRect();A.style.left=Math.max(8,Math.min(h,window.innerWidth-c.width-8))+"px",A.style.top=Math.max(8,Math.min(b,window.innerHeight-c.height-8))+"px"}function dt(){E&&(E.style.display="none")}function It(){e&&(e.title="Click: next mode • Right-click: choose mode",e.addEventListener("click",()=>{dt();const h=$t.findIndex(b=>b.id===u);gt($t[(h+1)%$t.length].id)}),e.addEventListener("contextmenu",h=>{h.preventDefault(),h.stopPropagation(),Lt(h.clientX,h.clientY)}))}document.addEventListener("click",h=>{E&&E.style.display!=="none"&&!E.contains(h.target)&&dt()}),document.addEventListener("keydown",h=>{h.key==="Escape"&&dt()});function zt(){J(),mt(),(a==null?void 0:a.state)==="suspended"&&a.resume().catch(()=>{})}t.addEventListener("play",zt),zt(),It(),document.addEventListener("visibilitychange",()=>{document.hidden?(cancelAnimationFrame(v),v=0):mt()});function At(){cancelAnimationFrame(v),v=0,e=document.getElementById("vizBars"),e&&(n=C(e),i=n.getContext("2d"),new ResizeObserver(T).observe(n),T(),It(),mt())}window.__LUMI_REBIND_VISUALIZER__=At}function we(t){if(!t||!t.trim())return{isSynced:!1,lines:[],raw:""};const e=[],n=t.split(/\r?\n/),i=/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;let a=!1;for(const o of n){const s=o.trim();if(!s||/^\[[a-z]{2,8}:/i.test(s))continue;const p=[...s.matchAll(i)];if(p.length>0){a=!0;const d=s.replace(i,"").trim();for(const r of p){const u=parseInt(r[1],10),v=parseInt(r[2],10),m=r[3]||"0",w=m.length===2?parseInt(m,10)*10:m.length===1?parseInt(m,10)*100:parseInt(m.slice(0,3),10),E=u*60+v+w/1e3;e.push({time:E,text:d})}}else e.push({time:-1,text:s})}return e.sort((o,s)=>o.time-s.time),{isSynced:a,lines:e,raw:t}}function xe(t,e){const n=document.getElementById("lyricsContainer"),i=document.getElementById("lyricsStatus"),a=document.getElementById("lyricsTrackTitle");let o={isSynced:!1,lines:[]},s=-1;async function p(m){if(m.lyrics&&m.lyrics.trim().length>0)return m.lyrics;if(window.__TAURI__)try{const{invoke:w}=await V(async()=>{const{invoke:C}=await import("./core-DhEqZVGG.js");return{invoke:C}},[]),E=await w("get_track_lyrics",{path:m.path});if(E)return E}catch{}return null}async function d(m){if(!m){o={isSynced:!1,lines:[],raw:""},r();return}m.id,a&&(a.textContent=`${m.title} — ${m.artist}`);const w=await p(m);o=we(w||""),r()}function r(){if(n){if(n.innerHTML="",s=-1,!o.lines.length){i&&(i.style.display="block",i.innerHTML='No synced lyrics found (.lrc)<br/><span style="font-size:10.5px; opacity:0.7;">Place a matching .lrc file in the song folder or add lyrics in the tag editor.</span>');return}i&&(i.style.display="none"),o.lines.forEach((m,w)=>{const E=document.createElement("div");E.className="lyric-line",E.dataset.idx=String(w),E.dataset.time=String(m.time),E.textContent=m.text||"♪",m.time>=0&&(E.style.cursor="pointer",E.title=`Seek to ${Math.floor(m.time/60)}:${Math.floor(m.time%60).toString().padStart(2,"0")}`,E.addEventListener("click",()=>{t.currentTime=m.time,t.play().catch(()=>{})})),n.appendChild(E)})}}function u(){if(!n||!o.isSynced||!o.lines.length)return;const m=t.currentTime;let w=-1;for(let E=0;E<o.lines.length&&o.lines[E].time<=m;E++)w=E;if(w!==s){s=w;const E=n.querySelectorAll(".lyric-line");if(E.forEach((C,J)=>{C.classList.toggle("active",J===s),C.classList.toggle("passed",J<s)}),s>=0&&E[s]){const C=E[s],J=n.clientHeight,S=C.offsetTop-n.offsetTop-J/2+C.clientHeight/2;n.scrollTo({top:Math.max(0,S),behavior:"smooth"})}}}t.addEventListener("timeupdate",u),window.addEventListener("lumi:trackChange",m=>{d(m.detail)}),ct("melo:track-changed",m=>{d(m)});const v=window.__LUMI_QUEUE__;Array.isArray(v)&&v.length>0&&d(v[0]),window.LumiLyrics={loadTrackLyrics:d,parseLRC:we}}let Ct=null;const ke=`<!doctype html>
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
      <button class="win-btn" aria-label="minimize" title="Minimize">—</button>
      <button class="win-btn close" aria-label="close" title="Close">×</button>
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
</html>`,Ee=`<!doctype html>
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
      <button class="win-btn" aria-label="minimize" title="Minimize">—</button>
      <button class="win-btn close" aria-label="close" title="Close">×</button>
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
</html>`,Se={"compact-pill-light.html":ke,"compact-pill-dark.html":Ee,"compact-pill-light":ke,"compact-pill-dark":Ee},li=[{id:"compact-pill-light",name:"Minimal Compact (Light)",filename:"compact-pill-light.html"},{id:"compact-pill-dark",name:"Minimal Compact (Dark)",filename:"compact-pill-dark.html"},{id:"full-html-example",name:"Full HTML Example",filename:"full-html-example.html"},{id:"example-custom",name:"Custom CSS Example",filename:"example-custom.html"}];function He(t){const e=["trackTitle","btnPlay","seekBar","coverImg"];let n=0;for(const i of e)t.includes(i)&&n++;return n>=3}function Ut(t,e){const n=document.getElementById("playerCard");if(!n)return;const i=n._originalHTML||n.innerHTML;n._originalHTML||(n._originalHTML=i),Ct&&(Ct.remove(),Ct=null);let o=[...t.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(v=>v[1]).join(`
`);o&&(Ct=document.createElement("style"),Ct.id="melo-custom-skin",Ct.textContent=o,document.head.appendChild(Ct));const s=He(t);let p="";const d=t.match(/<body[^>]*>([\s\S]*?)<\/body>/i);d?p=d[1]:p=t.split(/<\/style>/i).pop()||"";const r=document.createElement("div");r.innerHTML=p;const u=r.querySelector("#lumi-player");if(u&&(p=u.innerHTML),s&&p.trim().length>20){const v=p.trim();n.innerHTML=v,e&&e("Skin applied"),setTimeout(()=>{var w,E;(w=window.__LUMI_REBIND__)==null||w.call(window);const m=window.__LUMI_AUDIO__;m&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(m),(E=window.__LUMI_REBIND_MAIN__)==null||E.call(window)},40)}else o&&e&&e("Skin CSS applied");localStorage.setItem("lumi-custom-skin",t),localStorage.setItem("lumi-custom-skin-isFull",s?"1":"0")}function Zt(t,e=!0){Ct&&(Ct.remove(),Ct=null);const n=document.getElementById("playerCard");n&&n._originalHTML&&(n.innerHTML=n._originalHTML,setTimeout(()=>{var a,o;(a=window.__LUMI_REBIND__)==null||a.call(window);const i=window.__LUMI_AUDIO__;i&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(i),(o=window.__LUMI_REBIND_MAIN__)==null||o.call(window)},40)),localStorage.removeItem("lumi-custom-skin"),localStorage.removeItem("lumi-custom-skin-isFull"),localStorage.setItem("melo-active-skin-id","default"),e&&F("melo:skin-changed","default"),t&&t("Switched to Default Melo skin")}async function Ve(){if(tt)try{const{invoke:t}=await V(async()=>{const{invoke:n}=await import("./core-DhEqZVGG.js");return{invoke:n}},[]),e=await t("list_installed_skins");if(Array.isArray(e)&&e.length>0)return e}catch{}return li}async function Fe(t,e){if(tt)try{const{invoke:i}=await V(async()=>{const{invoke:o}=await import("./core-DhEqZVGG.js");return{invoke:o}},[]),a=await i("read_skin_file",{filenameOrPath:t});if(a&&a.trim().length>0)return Ut(a,e),!0}catch{}try{const i=t.startsWith("skins/")?t:`skins/${t}`,a=await fetch(i);if(a.ok){const o=await a.text();return Ut(o,e),!0}}catch{}const n=t.replace(/^.*[\\/]/,"");return Se[n]?(Ut(Se[n],e),!0):(e&&e(`Could not load skin: ${t}`),!1)}async function Pt(t,e,n,i=!0){if(t==="default"){Zt(n,i);return}let a=t;t==="compact-pill"||t.startsWith("compact-pill")?a=e==="dark"?"compact-pill-dark.html":"compact-pill-light.html":!a.endsWith(".html")&&!a.endsWith(".htm")&&(a=a+".html"),await Fe(a,n)&&(localStorage.setItem("melo-active-skin-id",t),i&&F("melo:skin-changed",t))}async function Ne(t){if(tt)try{const{invoke:e}=await V(async()=>{const{invoke:n}=await import("./core-DhEqZVGG.js");return{invoke:n}},[]);await e("open_skins_folder"),t&&t("Opening skins folder...")}catch{t&&t("Could not open skins folder")}else t&&t("Skins are located in the skins/ folder")}function ri(t){const e=document.getElementById("skinUpload"),n=document.getElementById("linkDownloadExample");n&&n.addEventListener("click",o=>{o.preventDefault(),Fe("compact-pill-light.html")});const i=localStorage.getItem("melo-active-skin-id")||"default",a=localStorage.getItem("lumi-theme")||"dark";i!=="default"&&setTimeout(()=>{Pt(i,a,void 0,!1)},150),ct("melo:theme",o=>{const s=localStorage.getItem("melo-active-skin-id");s&&s!=="default"&&Pt(s,o,void 0,!1)}),ct("melo:skin-changed",o=>{if(o&&typeof o=="string"){const s=localStorage.getItem("lumi-theme")||"dark";Pt(o,s,void 0,!1)}}),e&&e.addEventListener("change",async()=>{var d;const o=(d=e.files)==null?void 0:d[0];if(!o)return;const s=await o.text(),p=o.name;if(tt)try{const{invoke:r}=await V(async()=>{const{invoke:u}=await import("./core-DhEqZVGG.js");return{invoke:u}},[]);await r("save_custom_skin_file",{filename:p,content:s}),t(`Saved ${p} to skins folder`)}catch{}Ut(s,t),localStorage.setItem("melo-active-skin-id",p),F("melo:skin-changed",p),e.value=""}),document.addEventListener("dragover",o=>{var s;[...((s=o.dataTransfer)==null?void 0:s.types)||[]].includes("Files")&&o.preventDefault()}),document.addEventListener("drop",async o=>{var p;const s=[...((p=o.dataTransfer)==null?void 0:p.files)||[]].find(d=>d.name.endsWith(".html")||d.name.endsWith(".htm"));if(s){o.preventDefault();const d=await s.text();if(d.includes("<style")||d.includes("<html")||He(d)){const r=s.name;if(tt)try{const{invoke:u}=await V(async()=>{const{invoke:v}=await import("./core-DhEqZVGG.js");return{invoke:v}},[]);await u("save_custom_skin_file",{filename:r,content:d})}catch{}Ut(d,t),localStorage.setItem("melo-active-skin-id",r),F("melo:skin-changed",r)}}}),window.LumiSkin={applyCustomSkin:Ut,resetSkin:Zt,applySkinChoice:Pt,listInstalledSkins:Ve,openSkinsFolderOnDisk:Ne}}const We=document.querySelector("#app");We.innerHTML=`
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
          <button class="btn small block" id="btn-scan">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><line x1="12" y1="10" x2="12" y2="16"/><line x1="9" y1="13" x2="15" y2="13"/></svg>
            Scan Folder
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
          <button class="float-btn" data-close="win-playlist" title="Hide">—</button>
          <button class="float-btn close" data-close="win-playlist">×</button>
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

    <!-- SYNCED LYRICS WINDOW -->
    <div class="float-win" id="win-lyrics" style="left:740px; top:12px; width:340px; height:460px; z-index:3;">
      <div class="float-header" data-drag="win-lyrics">
        <div class="float-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Synced Lyrics (.lrc)
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
            <div style="font-size:16px; font-weight:800; color:var(--text); margin-bottom:4px;">Melo 0.3 Beta</div>
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
        <button class="menu-item" id="menuAbout">About Melo 0.3 Beta</button>
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
          <button class="icon-btn" id="btnStop" title="Stop" style="display:none">
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
`;const pt=new URLSearchParams(location.search).get("panel");var _e,Me;if(tt&&pt){V(async()=>{const{getCurrentWindow:i}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:i}},__vite__mapDeps([8,7,1,0])).then(({getCurrentWindow:i})=>{const a=i();pi(a,"melo-geo-panel-"+pt),a.onCloseRequested(()=>{F("melo:panel-closed",pt)}),window.addEventListener("beforeunload",()=>{F("melo:panel-closed",pt)})});const t=document.getElementById("win-"+pt),e=((_e=t==null?void 0:t.querySelector(".float-title"))==null?void 0:_e.innerHTML)||"",n=((Me=t==null?void 0:t.querySelector(".float-body"))==null?void 0:Me.innerHTML)||"";We.innerHTML=`
<div class="panel-root">
  <div class="panel-titlebar">${e}</div>
  <div class="panel-body">${n}</div>
  <div id="toast" class="toast"></div>
</div>`}tt&&!pt&&(document.documentElement.classList.add("tauri-main"),document.body.classList.add("tauri-main"),document.querySelectorAll(".side-actions .sbtn").forEach(t=>t.classList.remove("active")),V(async()=>{const{WebviewWindow:t}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:t}},__vite__mapDeps([6,7,1,0,8])).then(({WebviewWindow:t})=>{const e=async()=>{var n;for(const i of["library","playlist","equalizer","settings"])try{const a=await t.getByLabel("panel-"+i);(n=document.getElementById(ce[i]))==null||n.classList.toggle("active",!!a)}catch{}};e(),setInterval(e,1200)}));tt&&!pt&&(V(()=>import("./window-BWd3Cypy.js"),__vite__mapDeps([8,7,1,0])).then(async({getCurrentWindow:t})=>{const e=t(),n=()=>{const a=localStorage.getItem("melo-active-skin-id"),o=a==="compact-pill"||typeof a=="string"&&a.startsWith("compact-pill");return{w:o?780:960,h:o?138:240}};try{const a=JSON.parse(localStorage.getItem("melo-geo-main")||"null"),{LogicalPosition:o,LogicalSize:s}=await V(async()=>{const{LogicalPosition:d,LogicalSize:r}=await import("./dpi-fvP-W2qr.js");return{LogicalPosition:d,LogicalSize:r}},__vite__mapDeps([7,1])),p=n();await e.setSize(new s(a!=null&&a.w?Math.max(650,a.w):p.w,p.h)),(a==null?void 0:a.x)!=null&&(a==null?void 0:a.y)!=null&&await e.setPosition(new o(a.x,a.y))}catch{}const i=async()=>{try{const a=await e.outerPosition(),o=await e.innerSize(),s=n();localStorage.setItem("melo-geo-main",JSON.stringify({x:a.x,y:a.y,w:o.width,h:s.h}))}catch{}};e.onMoved(i),e.onResized(async()=>{try{const a=await e.innerSize(),o=n(),{LogicalSize:s}=await V(async()=>{const{LogicalSize:p}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:p}},__vite__mapDeps([7,1]));(a.width<650||a.height!==o.h)&&await e.setSize(new s(Math.max(650,a.width),o.h))}catch{}i()}),ct("melo:skin-changed",async a=>{try{!pt&&a&&await Pt(a,St,void 0,!1);const o=a==="compact-pill"||typeof a=="string"&&a.startsWith("compact-pill"),s=o?780:960,p=o?138:240,{LogicalSize:d}=await V(async()=>{const{LogicalSize:r}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:r}},__vite__mapDeps([7,1]));await e.setSize(new d(s,p)),i()}catch{}}),e.onCloseRequested(async a=>{a.preventDefault();const{WebviewWindow:o}=await V(async()=>{const{WebviewWindow:s}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:s}},__vite__mapDeps([6,7,1,0,8]));for(const s of["library","playlist","equalizer","settings"])try{const p=await o.getByLabel("panel-"+s);p&&await p.close()}catch{}try{await e.destroy()}catch{window.close()}})}),V(()=>import("./core-DhEqZVGG.js"),[]).then(async({invoke:t})=>{try{const e=await t("get_cli_tracks");if(Array.isArray(e)&&e.length>0){const n=window.LumiLibrary,i=window.LumiPlayer;e.forEach(a=>a.source="import"),n==null||n.addToCurrentPlaylist(e),e.forEach(a=>i==null?void 0:i.queue.push(a)),setTimeout(()=>{if(i&&i.queue.length>0){const a=i.queue.findIndex(o=>o.id===e[0].id);i.loadTrack(a>=0?a:0,!0)}},150)}}catch{}}),ct("melo:open-files",t=>{if(Array.isArray(t)&&t.length>0){const e=window.LumiLibrary,n=window.LumiPlayer;t.forEach(i=>i.source="import"),e==null||e.addToCurrentPlaylist(t),t.forEach(i=>n==null?void 0:n.queue.push(i)),X(`Playing ${t[0].title}`),setTimeout(()=>{if(n&&n.queue.length>0){const i=n.queue.findIndex(a=>a.id===t[0].id);n.loadTrack(i>=0?i:0,!0)}},150)}}));document.addEventListener("contextmenu",t=>{t.preventDefault()});const Jt=document.getElementById("toast"),X=t=>{Jt&&(Jt.textContent=t,Jt.classList.add("show"),setTimeout(()=>Jt.classList.remove("show"),2200))},Bt=new Audio;Bt.preload="metadata";window.__LUMI_AUDIO__=Bt;window.__TOAST__=X;let St=localStorage.getItem("lumi-theme")||"dark";function te(t){document.documentElement.setAttribute("data-theme",t),localStorage.setItem("lumi-theme",t),St=t}function re(t){te(t),F("melo:theme",t)}te(St);ct("melo:theme",t=>{(t==="light"||t==="dark")&&te(t)});setInterval(()=>{const t=localStorage.getItem("lumi-theme");(t==="light"||t==="dark")&&t!==St&&te(t)},1e3);const ci=["win-library","win-playlist","win-equalizer","win-lyrics","win-settings"],Qt=document.getElementById("desktop"),je={btnToggleLibrary:"win-library",btnTogglePlaylist:"win-playlist",btnToggleEq:"win-equalizer",btnToggleLyrics:"win-lyrics",btnOpenSettings:"win-settings",menuToggleLibrary:"win-library",menuTogglePlaylist:"win-playlist",menuToggleEq:"win-equalizer",menuToggleLyrics:"win-lyrics",menuToggleSettings:"win-settings"};function di(t){const e=document.getElementById(t);return!!e&&!e.classList.contains("hidden")}const ce={library:"btnToggleLibrary",playlist:"btnTogglePlaylist",equalizer:"btnToggleEq",lyrics:"btnToggleLyrics",settings:"btnOpenSettings"};async function pi(t,e){const n=async()=>{try{const i=await t.outerPosition(),a=await t.outerSize();localStorage.setItem(e,JSON.stringify({x:i.x,y:i.y,w:a.width,h:a.height}))}catch{}};t.onMoved(n),t.onResized(n)}async function ui(t){const{WebviewWindow:e}=await V(async()=>{const{WebviewWindow:u}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:u}},__vite__mapDeps([6,7,1,0,8])),n="panel-"+t,i=document.getElementById(ce[t]),a=await e.getByLabel(n);if(a){await a.close(),i==null||i.classList.remove("active");return}const o={library:[430,620],playlist:[440,560],equalizer:[700,440],lyrics:[380,520],settings:[600,540]},s={library:[360,400],playlist:[360,360],equalizer:[620,400],lyrics:[320,360],settings:[500,400]},p={library:"Library",playlist:"Playlist",equalizer:"Equalizer",lyrics:"Synced Lyrics",settings:"Settings"},d=o[t]||[420,520];let r=null;try{r=JSON.parse(localStorage.getItem("melo-geo-panel-"+t)||"null")}catch{}new e(n,{url:`/?panel=${t}`,title:p[t]||t,width:(r==null?void 0:r.w)||d[0],height:(r==null?void 0:r.h)||d[1],minWidth:(s[t]||[360,360])[0],minHeight:(s[t]||[360,360])[1],...(r==null?void 0:r.x)!=null?{x:r.x,y:r.y}:{center:!0},decorations:!0,skipTaskbar:!0}),i==null||i.classList.add("active"),F("melo:theme",St)}ct("melo:panel-closed",t=>{var n;const e=ce[t];e&&((n=document.getElementById(e))==null||n.classList.remove("active"))});function de(t){if(tt){ui(t.replace(/^win-/,""));return}const e=di(t);Yt(t,!e),e||ee(document.getElementById(t))}function mi(t){if(t.classList.contains("hidden")||!Qt||window.matchMedia("(max-width: 860px)").matches)return;const e=Qt.getBoundingClientRect();if(e.width<=0||e.height<=0)return;const n=t.getBoundingClientRect(),i=Math.min(n.width,e.width),a=Math.min(n.height,e.height);let o=n.left-e.left,s=n.top-e.top;o=Math.max(0,Math.min(e.width-i,o)),s=Math.max(0,Math.min(e.height-a,s)),t.style.left=o+"px",t.style.top=s+"px",t.style.right="auto",t.style.bottom="auto",t.style.transform="none"}function Yt(t,e){var a,o,s,p,d,r,u,v,m,w;const n=document.getElementById(t);if(!n)return;n.classList.toggle("hidden",!e),localStorage.setItem("lumiv2-"+t,e?"1":"0"),e&&mi(n);const i=e;t==="win-library"&&((a=document.getElementById("btnToggleLibrary"))==null||a.classList.toggle("active",i),(o=document.getElementById("menuToggleLibrary"))==null||o.classList.toggle("active",i)),t==="win-playlist"&&((s=document.getElementById("btnTogglePlaylist"))==null||s.classList.toggle("active",i),(p=document.getElementById("menuTogglePlaylist"))==null||p.classList.toggle("active",i)),t==="win-equalizer"&&((d=document.getElementById("btnToggleEq"))==null||d.classList.toggle("active",i),(r=document.getElementById("menuToggleEq"))==null||r.classList.toggle("active",i)),t==="win-lyrics"&&((u=document.getElementById("btnToggleLyrics"))==null||u.classList.toggle("active",i),(v=document.getElementById("menuToggleLyrics"))==null||v.classList.toggle("active",i)),t==="win-settings"&&((m=document.getElementById("btnOpenSettings"))==null||m.classList.toggle("active",i),(w=document.getElementById("menuToggleSettings"))==null||w.classList.toggle("active",i))}pt||ci.forEach(t=>{const e=localStorage.getItem("lumiv2-"+t);e!==null?Yt(t,e==="1"):t==="win-settings"?Yt(t,!1):Yt(t,!0)});Object.entries(je).forEach(([t,e])=>{var n;(n=document.getElementById(t))==null||n.addEventListener("click",()=>de(e))});document.querySelectorAll("[data-close]").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.close;Yt(e,!1)})});let wt=null,Tt=null,Le=10;function ee(t){Le++,t.style.zIndex=String(Le),document.querySelectorAll(".float-win").forEach(e=>e.classList.remove("active")),t.classList.add("active")}document.querySelectorAll(".float-win").forEach(t=>{t.addEventListener("mousedown",()=>ee(t))});document.querySelectorAll("[data-drag]").forEach(t=>{t.addEventListener("mousedown",e=>{if(e.target.closest("button")||e.target.closest("input")||e.target.closest("select"))return;const n=t.dataset.drag,i=document.getElementById(n);ee(i),i.classList.add("dragging");const a=i.getBoundingClientRect();wt={id:n,startX:e.clientX,startY:e.clientY,initX:a.left,initY:a.top,width:a.width,height:a.height}})});document.querySelectorAll("[data-resize]").forEach(t=>{t.addEventListener("mousedown",e=>{e.stopPropagation();const n=t.dataset.resize,i=document.getElementById(n);ee(i),i.classList.add("resizing");const a=i.getBoundingClientRect();Tt={id:n,startX:e.clientX,startY:e.clientY,initW:a.width,initH:a.height}})});window.addEventListener("mousemove",t=>{if(wt){const e=document.getElementById(wt.id);let n=t.clientX-wt.startX,i=t.clientY-wt.startY,a=wt.initX+n,o=wt.initY+i;if(Qt&&!window.matchMedia("(max-width: 860px)").matches){const s=Qt.getBoundingClientRect(),p=s.left,d=s.right-wt.width,r=s.top,u=s.bottom-wt.height;a=Math.max(p,Math.min(d,a))-s.left,o=Math.max(r,Math.min(u,o))-s.top}e.style.left=a+"px",e.style.top=o+"px",e.style.right="auto",e.style.bottom="auto",e.style.transform="none"}if(Tt){const e=document.getElementById(Tt.id);let n=Tt.initW+(t.clientX-Tt.startX),i=Tt.initH+(t.clientY-Tt.startY);n=Math.max(260,n),i=Math.max(160,i),e.style.width=n+"px",e.style.height=i+"px"}});window.addEventListener("mouseup",()=>{if(wt){const t=document.getElementById(wt.id);t&&(t.classList.remove("dragging"),localStorage.setItem("lumiv2-pos-"+wt.id,JSON.stringify({left:t.style.left,top:t.style.top}))),wt=null}if(Tt){const t=document.getElementById(Tt.id);t&&(t.classList.remove("resizing"),localStorage.setItem("lumiv2-size-"+Tt.id,JSON.stringify({width:t.style.width,height:t.style.height}))),Tt=null}});let bt=document.getElementById("appMenuBtn"),q=document.getElementById("appMenu");function gi(){const t=q==null?void 0:q.classList.toggle("open");bt==null||bt.classList.toggle("open",!!t)}bt==null||bt.addEventListener("click",t=>{t.stopPropagation(),gi()});document.addEventListener("click",t=>{q&&!q.contains(t.target)&&t.target!==bt&&(q.classList.remove("open"),bt==null||bt.classList.remove("open"))});document.addEventListener("keydown",t=>{t.key==="Escape"&&(q==null||q.classList.remove("open"),bt==null||bt.classList.remove("open"))});var Te;(Te=document.getElementById("menuCustomSkin"))==null||Te.addEventListener("click",()=>{var t;(t=document.getElementById("skinUpload"))==null||t.click(),q==null||q.classList.remove("open")});var Ae;(Ae=document.getElementById("menuSkinDefault"))==null||Ae.addEventListener("click",()=>{Zt(X);const t=document.getElementById("skinSelect");t&&(t.value="default"),q==null||q.classList.remove("open")});var Be;(Be=document.getElementById("menuSkinCompact"))==null||Be.addEventListener("click",()=>{Pt("compact-pill",St,X);const t=document.getElementById("skinSelect");t&&(t.value="compact-pill"),q==null||q.classList.remove("open")});var Ce;(Ce=document.getElementById("menuThemeToggle"))==null||Ce.addEventListener("click",()=>{re(St==="light"?"dark":"light"),q==null||q.classList.remove("open")});var Pe;(Pe=document.getElementById("menuToggleDevTools"))==null||Pe.addEventListener("click",async()=>{if(tt)try{const{invoke:t}=await V(async()=>{const{invoke:e}=await import("./core-DhEqZVGG.js");return{invoke:e}},[]);await t("toggle_devtools")}catch{}else X("DevTools toggle requires Tauri desktop runtime");q==null||q.classList.remove("open")});var ze;(ze=document.getElementById("menuAbout"))==null||ze.addEventListener("click",()=>{X("Melo 0.3 Beta — Tauri 2 + TypeScript + Rust"),q==null||q.classList.remove("open")});async function Ge(){const t=window.LumiLibrary,e=window.LumiPlayer;if(tt){try{const{open:i}=await V(async()=>{const{open:d}=await import("./index-CS3Qnt9j.js");return{open:d}},__vite__mapDeps([5,1])),a=await i({multiple:!0,filters:[{name:"Audio",extensions:["mp3","flac","wav","aac","ogg","m4a","alac","opus","wma","aiff"]}]});if(!a)return;const o=Array.isArray(a)?a:[a],{invoke:s}=await V(async()=>{const{invoke:d}=await import("./core-DhEqZVGG.js");return{invoke:d}},[]),p=[];for(const d of o)try{const r=await s("scan_library",{path:d});if(r&&r.length)r.forEach(u=>u.source="import"),p.push(...r);else{const u=d.replace(/^.*[\\/]/,""),v=u.lastIndexOf("."),m=v>0?u.slice(0,v):u,w=v>0?u.slice(v+1).toUpperCase():"AUDIO";p.push({id:d,title:m,artist:"Unknown Artist",album:"Single",duration:0,path:d,codec:w,specs:"Local File",source:"import"})}}catch{const r=d.replace(/^.*[\\/]/,""),u=r.lastIndexOf("."),v=u>0?r.slice(0,u):r,m=u>0?r.slice(u+1).toUpperCase():"AUDIO";p.push({id:d,title:v,artist:"Unknown Artist",album:"Single",duration:0,path:d,codec:m,specs:"Local File",source:"import"})}t==null||t.addTracks(p,!0),t==null||t.addToCurrentPlaylist(p),p.forEach(d=>e==null?void 0:e.queue.push(d)),F("melo:play-tracks",{tracks:p,index:0}),X(`${p.length} file(s) added`)}catch{X("Error opening files")}q==null||q.classList.remove("open");return}const n=document.createElement("input");n.type="file",n.multiple=!0,n.accept="audio/*,.mp3,.flac,.wav,.aac,.ogg,.m4a,.alac,.opus,.wma,.aiff",n.onchange=async()=>{const i=Array.from(n.files||[]);if(!i.length)return;const a=[];for(const o of i){const s=o.path,p=s||URL.createObjectURL(o),d=o.name,r=d.lastIndexOf("."),u=r>0?d.slice(0,r):d,v=r>0?d.slice(r+1).toUpperCase():"AUDIO",m={id:s||"imp_"+Math.random().toString(36).slice(2,9),title:u,artist:"Unknown Artist",album:"Single",duration:0,path:p,codec:v,specs:"Local File",source:"import"};await le(o,m),a.push(m)}t==null||t.addTracks(a,!0),t==null||t.addToCurrentPlaylist(a),a.forEach(o=>e==null?void 0:e.queue.push(o)),F("melo:play-tracks",{tracks:a,index:0}),X(`${a.length} file(s) added`)},n.click(),q==null||q.classList.remove("open")}async function Ye(){const t=window.LumiLibrary,e=window.LumiPlayer;if(tt){try{const{open:i}=await V(async()=>{const{open:r}=await import("./index-CS3Qnt9j.js");return{open:r}},__vite__mapDeps([5,1])),a=await i({directory:!0});if(!a)return;const o=a,{invoke:s}=await V(async()=>{const{invoke:r}=await import("./core-DhEqZVGG.js");return{invoke:r}},[]),d=(await s("scan_library",{path:o})).map(r=>({...r,source:"import"}));t==null||t.addTracks(d,!0),t==null||t.addToCurrentPlaylist(d),d.forEach(r=>e==null?void 0:e.queue.push(r)),F("melo:play-tracks",{tracks:d,index:0}),X(`${d.length} track(s) added from folder`)}catch{X("Error scanning folder")}q==null||q.classList.remove("open");return}const n=document.createElement("input");n.type="file",n.webkitdirectory=!0,n.multiple=!0,n.accept="audio/*",n.onchange=async()=>{const i=Array.from(n.files||[]).filter(o=>/\.(mp3|flac|wav|aac|ogg|m4a|alac|opus|wma|aiff)$/i.test(o.name));if(!i.length)return;const a=[];for(const o of i){const s=o.path,p=s||URL.createObjectURL(o),d=o.name,r=d.lastIndexOf("."),u=r>0?d.slice(0,r):d,v=r>0?d.slice(r+1).toUpperCase():"AUDIO",m={id:s||"imp_"+Math.random().toString(36).slice(2,9),title:u,artist:"Unknown Artist",album:"Folder Import",duration:0,path:p,codec:v,specs:"Local File",source:"import"};await le(o,m),a.push(m)}t==null||t.addTracks(a,!0),t==null||t.addToCurrentPlaylist(a),a.forEach(o=>e==null?void 0:e.queue.push(o)),F("melo:play-tracks",{tracks:a,index:0}),X(`${a.length} file(s) added from folder`)},n.click(),q==null||q.classList.remove("open")}var De;(De=document.getElementById("btnAddFiles"))==null||De.addEventListener("click",Ge);var Re;(Re=document.getElementById("btnAddFolder"))==null||Re.addEventListener("click",Ye);var qe;(qe=document.getElementById("btnThemeToggle"))==null||qe.addEventListener("click",()=>{re(St==="light"?"dark":"light")});window.addEventListener("keydown",async t=>{if(t.key==="F12"||(t.ctrlKey||t.metaKey)&&t.shiftKey&&t.key.toLowerCase()==="i")if(t.preventDefault(),tt)try{const{invoke:e}=await V(async()=>{const{invoke:n}=await import("./core-DhEqZVGG.js");return{invoke:n}},[]);await e("toggle_devtools")}catch{}else X("DevTools shortcut requires Tauri desktop runtime");(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="o"&&(t.shiftKey?(t.preventDefault(),Ye()):(t.preventDefault(),Ge())),((t.ctrlKey||t.metaKey)&&t.key===","||t.key==="F2")&&(t.preventDefault(),de("win-settings"))});function Ie(t){var E,C,J,et;function e(S){document.querySelectorAll(".settings-tab").forEach(D=>{D.classList.toggle("active",D.dataset.stab===S)}),document.querySelectorAll(".settings-section[data-panel]").forEach(D=>{D.classList.toggle("active",D.dataset.panel===S)}),localStorage.setItem("melo-settings-tab",S)}document.querySelectorAll(".settings-tab").forEach(S=>{S.addEventListener("click",()=>e(S.dataset.stab))}),e(localStorage.getItem("melo-settings-tab")||"general"),document.querySelectorAll(".switch[data-key]").forEach(S=>{const D=S.dataset.key,O=localStorage.getItem("melo-pref-"+D);O!==null&&S.classList.toggle("on",O==="1"),S.onclick=()=>{S.classList.toggle("on");const z=S.classList.contains("on");localStorage.setItem("melo-pref-"+D,z?"1":"0"),t(z?"Enabled":"Disabled"),F("melo:pref-changed",{key:D,value:z})}});const n=document.getElementById("setCrossfade"),i=document.getElementById("crossfadeVal");if(n){const S=localStorage.getItem("melo-pref-crossfade")||"0";n.value=S,i&&(i.textContent=S+"s"),n.oninput=()=>{const D=n.value;i&&(i.textContent=D+"s"),localStorage.setItem("melo-pref-crossfade",D)}}const a=document.getElementById("setLanguage");if(a){const S=localStorage.getItem("melo-pref-lang")||"en";a.value=S,a.onchange=()=>{localStorage.setItem("melo-pref-lang",a.value),t(`Language set to ${a.options[a.selectedIndex].text}`)}}const o=document.getElementById("swDynamicTheme");if(o){const S=localStorage.getItem("melo-dynamic-theme")!=="0";o.classList.toggle("on",S),o.onclick=()=>{var g,y;const D=!o.classList.contains("on");o.classList.toggle("on",D),localStorage.setItem("melo-dynamic-theme",D?"1":"0");const O=window.__LUMI_QUEUE__,z=(y=(g=window.LumiPlayer)==null?void 0:g.currentIndex)!=null?y:0;O&&O[z]&&$e(D?O[z].cover:null),t(D?"Dynamic theme enabled":"Dynamic theme disabled")}}const s=document.getElementById("skinSelect"),p=document.getElementById("btnSkinThemeToggle"),d=document.getElementById("btnRefreshSkins"),r=document.getElementById("btnOpenSkinsFolder"),u=document.getElementById("skinThemeIcon"),v=document.getElementById("skinThemeLabel");function m(S){u&&(u.textContent=S==="dark"?"🌙":"☀️"),v&&(v.textContent=S==="dark"?"Dark":"Light")}m(St),p==null||p.addEventListener("click",()=>{const S=St==="dark"?"light":"dark";re(S),m(S),t(S==="dark"?"Dark theme":"Light theme")}),ct("melo:theme",S=>{(S==="light"||S==="dark")&&m(S)});async function w(){if(!s)return;const S=localStorage.getItem("melo-active-skin-id")||"default",D=await Ve();s.innerHTML=`
      <option value="default">Default Melo (Standard)</option>
      <option value="compact-pill">Minimal Compact (Pill Bar)</option>
    `,D.forEach(O=>{if(O.filename!=="compact-pill-light.html"&&O.filename!=="compact-pill-dark.html"){const z=document.createElement("option");z.value=O.filename,z.textContent=`${O.name} (${O.filename})`,s.appendChild(z)}}),s.value=S}w(),s&&(s.onchange=()=>{const S=s.value;Pt(S,St,t)}),d==null||d.addEventListener("click",async()=>{await w();const S=localStorage.getItem("melo-active-skin-id")||"default";Pt(S,St,t),t("Skins reloaded from disk")}),r==null||r.addEventListener("click",()=>{Ne(t)}),(E=document.getElementById("btn-reset-skin-settings"))==null||E.addEventListener("click",()=>{Zt(t),s&&(s.value="default")}),(C=document.getElementById("btn-settings-reset"))==null||C.addEventListener("click",()=>{localStorage.clear(),t("Settings reset — reloading..."),setTimeout(()=>location.reload(),600)}),(J=document.getElementById("btnChooseFolder"))==null||J.addEventListener("click",async()=>{if(tt)try{const{open:S}=await V(async()=>{const{open:O}=await import("./index-CS3Qnt9j.js");return{open:O}},__vite__mapDeps([5,1])),D=await S({directory:!0});D&&(document.getElementById("setMusicFolder").value=D,localStorage.setItem("melo-pref-music-folder",D),t("Music folder updated"))}catch{}else t("Folder selection dialog requires Tauri build")}),(et=document.getElementById("btnOpenDevTools"))==null||et.addEventListener("click",async()=>{if(tt)try{const{invoke:S}=await V(async()=>{const{invoke:D}=await import("./core-DhEqZVGG.js");return{invoke:D}},[]);await S("toggle_devtools")}catch{}else t("DevTools requires Tauri desktop runtime")})}function Je(){document.querySelectorAll(".win-btn").forEach(t=>{t.onclick=async()=>{const e=t.getAttribute("aria-label");if(window.__TAURI__){const{getCurrentWindow:n}=await V(async()=>{const{getCurrentWindow:a}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:a}},__vite__mapDeps([8,7,1,0])),i=n();e==="minimize"?i.minimize():e==="maximize"?i.toggleMaximize():e==="close"&&i.close()}else e==="close"&&X("Window close requires the Tauri desktop build"),e==="maximize"&&X("Resize: drag corner handle")}})}Je();window.__LUMI_REBIND_MAIN__=()=>{const t=document.getElementById("appMenuBtn"),e=document.getElementById("appMenu");t&&e&&(bt=t,q=e,t.onclick=n=>{n.stopPropagation(),e.classList.toggle("open"),t.classList.toggle("open",e.classList.contains("open"))}),Je(),Object.entries(je).forEach(([n,i])=>{const a=document.getElementById(n);a&&(a.onclick=()=>de(i))})};const qt=document.createElement("div");qt.id="aboutPop";qt.style.display="none";document.body.appendChild(qt);var Oe;(Oe=document.getElementById("btnAbout"))==null||Oe.addEventListener("click",t=>{var e;t.stopPropagation(),qt.innerHTML=`
    <div class="about-head">Melo <b>0.3 Beta</b></div>
    <div style="font-size:11.5px; color:var(--text-soft); margin:6px 0 10px;">
      Modern Windows Music Player<br/>
      Tauri 2 + TypeScript + Rust
    </div>
    <a class="about-link" id="aboutLink" href="https://github.com/Arvanta/Melo" rel="noopener">github.com/Arvanta/Melo ↗</a>`,qt.style.display=qt.style.display==="none"?"block":"none",(e=document.getElementById("aboutLink"))==null||e.addEventListener("click",n=>{n.preventDefault();const i="https://github.com/Arvanta/Melo";tt?V(()=>import("./core-DhEqZVGG.js"),[]).then(a=>a.invoke("open_url",{url:i})).catch(()=>window.open(i,"_blank")):window.open(i,"_blank")})});document.addEventListener("click",t=>{!t.target.closest("#aboutPop")&&!t.target.closest("#btnAbout")&&(qt.style.display="none")});tt&&pt?pt==="library"||pt==="playlist"?ye(Bt,X):pt==="equalizer"?be(Bt,X,{remote:!0}):pt==="lyrics"?xe(Bt):pt==="settings"&&Ie(X):(ii(Bt,X),ye(Bt,X),be(Bt,X),si(Bt),xe(Bt),ri(X),Ie(X));X("Melo 0.3 Beta is ready");
