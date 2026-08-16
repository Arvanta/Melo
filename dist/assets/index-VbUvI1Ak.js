const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/event-CNdo2oXa.js","assets/core-DhEqZVGG.js","assets/index-DiyoAAdc.js","assets/index-CHth0gh2.js","assets/index-Bq0iOnRE.js","assets/index-CS3Qnt9j.js","assets/webviewWindow-mjQkSB26.js","assets/dpi-fvP-W2qr.js","assets/window-BWd3Cypy.js"])))=>i.map(i=>d[i]);
(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))e(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&e(r)}).observe(document,{childList:!0,subtree:!0});function a(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function e(n){if(n.ep)return;n.ep=!0;const o=a(n);fetch(n.href,o)}})();const ei="modulepreload",ii=function(t){return"/"+t},fe={},J=function(i,a,e){let n=Promise.resolve();if(a&&a.length>0){let r=function(s){return Promise.all(s.map(d=>Promise.resolve(d).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),c=(u==null?void 0:u.nonce)||(u==null?void 0:u.getAttribute("nonce"));n=r(a.map(s=>{if(s=ii(s),s in fe)return;fe[s]=!0;const d=s.endsWith(".css"),f=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${f}`))return;const w=document.createElement("link");if(w.rel=d?"stylesheet":ei,d||(w.as="script"),w.crossOrigin="",w.href=s,c&&w.setAttribute("nonce",c),document.head.appendChild(w),d)return new Promise((L,k)=>{w.addEventListener("load",L),w.addEventListener("error",()=>k(new Error(`Unable to preload CSS for ${s}`)))})}))}function o(r){const u=new Event("vite:preloadError",{cancelable:!0});if(u.payload=r,window.dispatchEvent(u),!u.defaultPrevented)throw r}return n.then(r=>{for(const u of r||[])u.status==="rejected"&&o(u.reason);return i().catch(o)})},ot=typeof window.__TAURI_INTERNALS__<"u"||typeof window.__TAURI__<"u";async function U(t,i){if(ot)try{const{emit:a}=await J(async()=>{const{emit:e}=await import("./event-CNdo2oXa.js");return{emit:e}},__vite__mapDeps([0,1]));await a(t,i);return}catch{}window.dispatchEvent(new CustomEvent(t,{detail:i}))}function nt(t,i){ot&&J(async()=>{const{listen:a}=await import("./event-CNdo2oXa.js");return{listen:a}},__vite__mapDeps([0,1])).then(({listen:a})=>{a(t,e=>{i(e.payload)})}).catch(()=>{}),window.addEventListener(t,a=>i(a.detail))}let ve=!1;async function ai(){if(!ve){ve=!0;try{const t=globalThis;if(typeof t.Buffer>"u"){const i=await J(()=>import("./index-DiyoAAdc.js").then(a=>a.i),__vite__mapDeps([2,3]));t.Buffer=i.Buffer}typeof t.process>"u"&&(t.process={env:{},browser:!0,nextTick:i=>setTimeout(i,0)})}catch{}}}async function ni(t,i){var a;try{await ai();const e=await J(()=>import("./index-Bq0iOnRE.js").then(s=>s.i),__vite__mapDeps([4,3])),n=e&&typeof e.parseBlob=="function"?e:e.default||e,o=await Promise.race([n.parseBlob(t),new Promise((s,d)=>setTimeout(()=>d(new Error("timeout")),1800))]),r=o==null?void 0:o.common;if(!r)return;r.title&&(i.title=r.title),r.artist?i.artist=r.artist:r.artists&&r.artists[0]&&(i.artist=r.artists[0]),r.album&&(i.album=r.album),r.genre&&r.genre[0]&&(i.genre=r.genre[0]),r.year&&(i.year=r.year);const u=(a=r.picture)==null?void 0:a[0];if(u&&u.data){const s=u.format||"image/jpeg",d=u.data;if(d.length>6e5)return;let f="";const w=8192;for(let L=0;L<d.length;L+=w){const k=d.subarray(L,L+w);f+=String.fromCharCode.apply(null,k)}i.cover=`data:${s};base64,${btoa(f)}`}const c=o==null?void 0:o.format;c&&c.duration&&!i.duration&&(i.duration=Math.floor(c.duration))}catch{}}async function Ce(t,i,a=1800){return await ni(t,i),i}async function oi(t){return new Promise(i=>{if(!t)return i(null);const a=new Image;a.crossOrigin="anonymous",a.onload=()=>{try{const e=document.createElement("canvas"),n=e.getContext("2d");if(!n)return i(null);e.width=40,e.height=40,n.drawImage(a,0,0,40,40);const o=n.getImageData(0,0,40,40).data;let r={r:42,g:123,b:214},u=-1;for(let c=0;c<o.length;c+=4){const s=o[c],d=o[c+1],f=o[c+2];if(o[c+3]<128)continue;const L=Math.max(s,d,f),k=Math.min(s,d,f),g=(L+k)/510,v=L-k,C=v===0?0:v/(1-Math.abs(2*g-1));if(C>.25&&g>.25&&g<.82){const G=C*1.5+(1-Math.abs(g-.5));G>u&&(u=G,r={r:s,g:d,b:f})}}u>0?i(r):i(null)}catch{i(null)}},a.onerror=()=>i(null),a.src=t})}async function Ae(t){const i=localStorage.getItem("melo-dynamic-theme")!=="0",a=document.documentElement;if(!i||!t){a.style.removeProperty("--accent"),a.style.removeProperty("--visualizer"),a.style.removeProperty("--accent-glow");return}const e=await oi(t);if(e){const n=`rgb(${e.r}, ${e.g}, ${e.b})`;a.style.setProperty("--accent",n),a.style.setProperty("--visualizer",n),a.style.setProperty("--accent-glow",`rgba(${e.r}, ${e.g}, ${e.b}, 0.35)`)}else a.style.removeProperty("--accent"),a.style.removeProperty("--visualizer"),a.style.removeProperty("--accent-glow")}const Vt=[31,62,125,250,500,1e3,2e3,4e3,8e3,16e3];let bt=null,ie=null,ae=[],Ut=null,Ot=null;function Jt(t){if(!bt){const i=window.AudioContext||window.webkitAudioContext;bt=new i;try{ie=bt.createMediaElementSource(t)}catch{}if(ae=Vt.map(a=>{const e=bt.createBiquadFilter();return e.type="peaking",e.frequency.value=a,e.Q.value=1.4,e.gain.value=0,e}),Ut=bt.createGain(),Ut.gain.value=1,Ot=bt.createAnalyser(),Ot.fftSize=2048,Ot.smoothingTimeConstant=.72,ie){let a=ie;for(const e of ae)a.connect(e),a=e;a.connect(Ut),Ut.connect(Ot),Ot.connect(bt.destination)}}return{ctx:bt,filters:ae,gain:Ut,analyser:Ot,async resume(){bt&&bt.state==="suspended"&&await bt.resume().catch(()=>{})}}}function li(t,i){let a,e,n,o,r,u,c,s=null,d,f,w,L,k,g,v,C,G,P,et,z,h,b=[],E=0,X=!1,V="off",Y=!1;function Z(){if(!b.length)return null;if(V==="one")return E;let l=E+1;if(X&&(l=Math.floor(Math.random()*b.length),l===E&&b.length>1&&(l=(l+1)%b.length)),l>=b.length)if(V==="all")l=0;else return null;return l}window.__LUMI_QUEUE__=b,window.__LUMI_SET_QUEUE__=l=>{b=l,window.__LUMI_QUEUE__=l};function at(l){if(!isFinite(l))return"0:00";const S=Math.floor(l/60),D=Math.floor(l%60).toString().padStart(2,"0");return`${S}:${D}`}function lt(){if(!d)return;const l=parseFloat(d.max)||100,S=parseFloat(d.value)||0,D=l>0?S/l*100:0;d.style.setProperty("--progress",D+"%")}function pt(){f&&f.style.setProperty("--vol",f.value+"%")}function ut(){g&&(g.classList.toggle("muted",t.muted),g.title=t.muted?"Unmute":"Mute")}function kt(l=!0){t.muted=!t.muted,ut(),l&&i(t.muted?"Muted":"Unmuted")}async function At(l){if(!l)return"";if(/^(https?|data|blob):/.test(l))return l;if(ot)try{const{convertFileSrc:S}=await J(async()=>{const{convertFileSrc:D}=await import("./core-DhEqZVGG.js");return{convertFileSrc:D}},[]);return S(l)}catch{}return l}async function yt(l,S=!0,D){if(!b.length)return;l<0&&(l=b.length-1),l>=b.length&&(l=0),E=l;const q=b[l];if(q){if(v||R(),t.src=await At(q.path),t.load(),D&&D>0){const Q=()=>{t.removeEventListener("loadedmetadata",Q);try{t.currentTime=D}catch{}};t.addEventListener("loadedmetadata",Q)}v&&(v.textContent=q.title||"Unknown Title"),C&&(C.textContent=q.artist||"Unknown Artist"),G&&(G.textContent=q.album||""),P&&(P.textContent=q.codec||"AUDIO"),et&&(et.textContent=q.specs||""),q.cover&&z?(z.src=q.cover,z.style.display="block",h&&(h.style.display="none")):(z&&(z.style.display="none"),h&&(h.style.display="grid")),d&&(d.max=String(q.duration||240),d.value="0",lt()),L&&(L.textContent=at(q.duration)),w&&(w.textContent="0:00"),O(),Ae(q.cover||null),document.querySelectorAll(".track-row").forEach((Q,F)=>{var Ct;Q.classList.toggle("active",((Ct=b[F])==null?void 0:Ct.id)===q.id)}),"mediaSession"in navigator&&(navigator.mediaSession.metadata=new MediaMetadata({title:q.title,artist:q.artist,album:q.album,artwork:q.cover?[{src:q.cover,sizes:"512x512",type:"image/jpeg"}]:[]}),navigator.mediaSession.setActionHandler("play",()=>ft()),navigator.mediaSession.setActionHandler("pause",()=>m()),navigator.mediaSession.setActionHandler("previoustrack",()=>_()),navigator.mediaSession.setActionHandler("nexttrack",()=>M()),navigator.mediaSession.setActionHandler("seekto",Q=>{Q.seekTime&&(t.currentTime=Q.seekTime)})),S&&ft();try{const{cover:Q,...F}=q;localStorage.setItem("melo-current-track",JSON.stringify(F))}catch{}window.dispatchEvent(new CustomEvent("lumi:trackChange",{detail:q})),U("melo:track-changed",q),U("melo:playback-state",{track:q,currentTime:t.currentTime||0,paused:t.paused})}}let gt=!1;async function Lt(){try{await Jt(t).resume()}catch{}gt&&(gt=!1,t.play().then(()=>{e&&(e.style.display="none"),n&&(n.style.display="block")}).catch(()=>{}))}window.addEventListener("pointerdown",Lt),window.addEventListener("keydown",Lt),nt("melo:pref-changed",l=>{l&&l.key==="replayGainGlobal"&&O(),l&&l.key==="showStopBtn"&&A(!!l.value)}),nt("melo:request-playback-state",()=>{const l=b[E]||null;U("melo:playback-state",{track:l,currentTime:t.currentTime||0,paused:t.paused})}),nt("melo:seek-playback",l=>{const S=Number(l);Number.isFinite(S)&&S>=0&&(t.currentTime=S)});let it=null,Mt=!1;function It(l,S,D){it&&cancelAnimationFrame(it);const q=t.volume,Q=performance.now(),F=Ct=>{const St=Math.min(1,(Ct-Q)/S);t.volume=q+(l-q)*St,St<1?it=requestAnimationFrame(F):(it=null,D==null||D())};it=requestAnimationFrame(F)}async function ft(){try{await Jt(t).resume()}catch{}const l=localStorage.getItem("melo-pref-fadePause")==="1",S=j();l&&Mt&&(t.volume=0),t.play().then(()=>{gt=!1,e&&(e.style.display="none"),n&&(n.style.display="block"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="playing"),l&&Mt?(Mt=!1,It(S,300)):t.volume=S}).catch(()=>{gt||(gt=!0,i("Click once inside player to begin audio playback"))})}function m(){localStorage.getItem("melo-pref-fadePause")==="1"&&!t.paused?(Mt=!0,It(0,300,()=>t.pause())):(Mt=!1,t.pause()),e&&(e.style.display="block"),n&&(n.style.display="none"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused");const S=b[E];if(S)try{localStorage.setItem("melo-resume-state",JSON.stringify({trackId:S.id,position:t.currentTime}))}catch{}}function y(){t.paused?ft():m()}function I(){t.pause();try{t.currentTime=0}catch{}e&&(e.style.display="block"),n&&(n.style.display="none"),d&&(d.value="0",lt()),w&&(w.textContent="0:00"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}function M(){if(!b.length)return;if(V==="one"){t.currentTime=0,ft();return}const l=Z();if(l===null){m();return}yt(l)}function _(){if(!b.length)return;if(t.currentTime>3){t.currentTime=0;return}let l=E-1;X&&(l=Math.floor(Math.random()*b.length)),l<0&&(V==="all"?l=b.length-1:l=0),yt(l)}function j(){var F;const l=b[E];if(!f)return 1;const S=parseInt(f.value,10)/100,q=localStorage.getItem("melo-pref-replayGainGlobal")!=="0"&&(F=l==null?void 0:l.replayGain)!=null?F:0,Q=Math.pow(10,q/20);return Math.min(1,Math.max(0,S*Q))}function O(){!b[E]||!f||(t.volume=j())}function A(l=localStorage.getItem("melo-pref-showStopBtn")==="1"){const S=document.getElementById("btnStop");S&&S.style.setProperty("display",l?"inline-flex":"none","important")}function R(){if(a=document.getElementById("btnPlay"),e=document.getElementById("iconPlay"),n=document.getElementById("iconPause"),o=document.getElementById("btnPrev"),r=document.getElementById("btnNext"),u=document.getElementById("btnShuffle"),c=document.getElementById("btnRepeat"),s=document.getElementById("btnStop"),A(),d=document.getElementById("seekBar"),f=document.getElementById("volBar"),w=document.getElementById("curTime"),L=document.getElementById("durTime"),k=document.getElementById("volPct"),g=document.getElementById("volIcon"),g&&(g.onclick=()=>kt()),ut(),v=document.getElementById("trackTitle"),C=document.getElementById("trackArtist"),G=document.getElementById("trackAlbum"),P=document.getElementById("trackCodec"),et=document.getElementById("trackSpecs"),z=document.getElementById("coverImg"),h=document.getElementById("coverFallback"),a&&(a.onclick=y),s&&(s.onclick=I),o&&(o.onclick=_),r&&(r.onclick=M),u&&(u.onclick=()=>{X=!X,u.classList.toggle("active",X),i(X?"Shuffle on":"Shuffle off")}),c&&(c.onclick=()=>{V=V==="off"?"all":V==="all"?"one":"off",c.classList.toggle("active",V!=="off");const l={off:"Repeat off",all:"Repeat all",one:"Repeat one"};i(l[V]),c.title=l[V]}),d&&(d.oninput=()=>{Y=!0,w&&(w.textContent=at(parseFloat(d.value))),lt()},d.onchange=()=>{t.currentTime=parseFloat(d.value),Y=!1}),f&&(f.oninput=()=>{pt(),k&&(k.textContent=f.value+"%"),O()}),lt(),pt(),b[E]){const l=b[E];v&&(v.textContent=l.title||"Unknown Title"),C&&(C.textContent=l.artist||"Unknown Artist"),G&&(G.textContent=l.album||""),P&&(P.textContent=l.codec||"AUDIO"),et&&(et.textContent=l.specs||""),l.cover&&z&&(z.src=l.cover,z.style.display="block",h&&(h.style.display="none"))}}R(),document.addEventListener("wheel",l=>{const S=l.target;if(!(S!=null&&S.closest("#playerCard"))||!f)return;l.preventDefault();const D=l.deltaY<0?5:-5;f.value=String(Math.max(0,Math.min(100,Number(f.value)+D))),f.dispatchEvent(new Event("input"))},{passive:!1}),t.addEventListener("timeupdate",()=>{U("melo:playback-position",t.currentTime||0),!Y&&d&&w&&(d.value=String(Math.floor(t.currentTime)),w.textContent=at(t.currentTime),lt()),B()});let W=null;function B(){W||(W=setTimeout(()=>{W=null;const l=b[E];if(!(!l||t.paused))try{localStorage.setItem("melo-resume-state",JSON.stringify({trackId:l.id,position:t.currentTime}))}catch{}},4e3))}t.addEventListener("loadedmetadata",()=>{var S;if(!d||!L)return;const l=Math.floor(t.duration||((S=b[E])==null?void 0:S.duration)||240);d.max=String(l),L.textContent=at(l),lt()}),t.addEventListener("ended",()=>{M()}),window.addEventListener("keydown",l=>{l.target.tagName!=="INPUT"&&(l.code==="Space"&&(l.preventDefault(),y()),l.code==="ArrowRight"&&(t.currentTime+=5),l.code==="ArrowLeft"&&(t.currentTime-=5),(l.key==="m"||l.key==="M")&&kt(),(l.key==="s"||l.key==="S")&&u&&u.click(),(l.key==="r"||l.key==="R")&&c&&c.click(),l.code==="ArrowUp"&&f&&(f.value=String(Math.min(100,parseInt(f.value,10)+5)),f.dispatchEvent(new Event("input"))),l.code==="ArrowDown"&&f&&(f.value=String(Math.max(0,parseInt(f.value,10)-5)),f.dispatchEvent(new Event("input"))))}),nt("melo:tray-action",l=>{l==="play_pause"?y():l==="next"?M():l==="prev"?_():l==="mute"&&kt()}),window.LumiPlayer={get queue(){return b},set queue(l){b=l,window.__LUMI_QUEUE__=l},get currentIndex(){return E},loadTrack:yt,play:ft,pause:m,stop:I,next:M,prev:_,get audio(){return t},rebind:R},window.__LUMI_REBIND__=R,nt("melo:play-tracks",l=>{if(!l||!Array.isArray(l.tracks)||!l.tracks.length)return;b=l.tracks,window.__LUMI_SET_QUEUE__(b);const S=Math.max(0,Math.min(l.index||0,b.length-1));yt(S,!0)})}const ne=new URLSearchParams(location.search).get("panel")||"main",K=t=>String(t!=null?t:"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");function ye(t){const i=Number.isFinite(t)?Math.max(0,t):0;return`${Math.floor(i/60)}:${String(Math.floor(i%60)).padStart(2,"0")}`}function be(t,i){const a=document.getElementById("trackList"),e=document.getElementById("libraryStats"),n=document.getElementById("searchInput"),o=document.getElementById("libraryTabs"),r=document.getElementById("btn-scan"),u=document.getElementById("btn-clear-library"),c=document.getElementById("winPlaylistTracks"),s=document.getElementById("winPlaylistEmpty"),d=document.getElementById("playlistSelect"),f=document.getElementById("playlistSearchInput"),w=document.getElementById("playlistSortSelect"),L=document.getElementById("btn-clear-playlist"),k=document.getElementById("btn-export-playlist"),g=document.getElementById("btn-new-playlist");let v=null,C=null,G=!1,P=localStorage.getItem("melo-currentPlaylist")||"p1",et=[],z=null,h=null,b=!1,E=[];const X=new Map;let V="artists",Y=null,Z=null,at=null,lt="";const pt=54,ut=52;let kt=0,At=0,yt=0,gt=0,Lt=null;const it=document.createElement("div");it.className="ctx-menu",it.style.display="none",it.innerHTML='<button class="ctx-item danger" id="ctxRemoveLibraryTrack">Remove from Library</button>',document.body.appendChild(it),document.addEventListener("click",p=>{p.target.closest("#ctxRemoveLibraryTrack")||(it.style.display="none")}),it.querySelector("#ctxRemoveLibraryTrack").onclick=async p=>{p.stopPropagation(),!(!v||!Lt)&&(await v("delete_tracks",{ids:[Lt]}),it.style.display="none",Lt=null,U("melo:library-changed",{removed:1}))};function Mt(){return new Promise(p=>{const x=document.createElement("div");x.className="confirm-overlay",x.innerHTML=`<div class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="clearLibraryTitle">
        <div id="clearLibraryTitle" class="confirm-title">Clear Library?</div>
        <div class="confirm-message">All tracks will be removed from Library browsing. Your playlists and their tracks will remain unchanged.</div>
        <div class="confirm-actions"><button class="btn small" data-confirm="cancel">Cancel</button><button class="btn small danger-confirm" data-confirm="yes">Clear Library</button></div>
      </div>`,document.body.appendChild(x);const $=H=>{document.removeEventListener("keydown",N),x.remove(),p(H)};x.querySelector("[data-confirm='cancel']").onclick=()=>$(!1),x.querySelector("[data-confirm='yes']").onclick=()=>$(!0),x.onclick=H=>{H.target===x&&$(!1)};const N=H=>{H.key==="Escape"&&(document.removeEventListener("keydown",N),$(!1))};document.addEventListener("keydown",N)})}function It(p){const x=r==null?void 0:r.querySelector(".scan-label");x&&(x.textContent=p)}function ft(p){if(!p)return"";if(/^(data:|blob:|https?:)/i.test(p))return p;try{return C?C(p):""}catch{return""}}function m(p){return{...p,cover:ft(p.cover),source:"scan"}}const y=[],I=new Set;let M=0;function _(p,x){!p||!v||I.has(p)||(I.add(p),y.push({id:p,element:x}),j())}function j(){for(;v&&M<2&&y.length;){const p=y.shift();M++,v("ensure_track_artwork",{id:p.id}).then(x=>{if(!x||!p.element.isConnected)return;const $=ft(x),N=E.find(H=>H.id===p.id);N&&(N.cover=$),p.element.style.backgroundImage=`url("${$.replace(/"/g,"%22")}")`,p.element.textContent=""}).catch(()=>{}).finally(()=>{M--,I.delete(p.id),j()})}}function O(p){const x=[...p.querySelectorAll("[data-artwork-id]")];if(!("IntersectionObserver"in window)){x.forEach(N=>_(N.dataset.artworkId,N));return}const $=new IntersectionObserver(N=>{N.forEach(H=>{if(!H.isIntersecting)return;const T=H.target;$.unobserve(T),_(T.dataset.artworkId,T)})},{root:p,rootMargin:"120px"});x.forEach(N=>$.observe(N))}async function A(){if(G)return;if(!ot){G=!0,R();return}const p=await J(()=>import("./core-DhEqZVGG.js"),[]);v=p.invoke,C=p.convertFileSrc,G=!0,await Promise.all([W(),St()]),await F(!0),await vt(!0)}function R(){a&&(a.innerHTML='<div style="padding:30px;text-align:center;color:var(--text-muted)">The persistent Library is available in the Tauri desktop build.</div>')}async function W(){if(!(!v||!e))try{const p=await v("library_stats");e.textContent=`${p.tracks} tracks • ${p.artists} artists • ${p.albums} albums`}catch{}}function B(){Y=Z=at=null,a&&(a.scrollTop=0)}function l(){return V==="artists"?Y?"tracks":"groups":V==="albums"?Z?"tracks":"groups":at?"tracks":"groups"}function S(){return V}function D(){return V==="artists"&&Y?Z?`${Y} › ${Z}`:Y:V==="albums"&&Z?Z:V==="genres"&&at?at:""}async function q(p,x){if(!v)return{items:[],total:0,limit:x,offset:p};if(l()==="groups")return v("library_groups",{kind:S(),search:lt||null,artist:V==="artists"?Y:null,limit:x,offset:p});const $=await v("library_tracks",{search:lt||null,artist:Y,album:Z,genre:at,sort:"title-asc",limit:x,offset:p});return $.items=$.items.map(m),E=$.items,$}async function Q(p){const x=X.get(p);if(x)return x;if(!v)return[];const $=await v("library_groups",{kind:"albums",search:null,artist:p,limit:500,offset:0});return X.set(p,$.items),$.items}async function F(p=!1){if(!a||!v)return;p&&(a.scrollTop=0),a.style.display="block",a.style.position="relative",a.style.overflowY="auto";const x=Math.max(300,a.clientHeight||420),$=V==="artists"&&!!Y,N=D(),H=$?84:N?38:0,T=Math.ceil(x/pt),mt=Math.max(0,a.scrollTop-H),tt=Math.max(0,Math.floor(mt/pt)-8),ct=Math.max(40,T+16),Je=++kt;try{const me=$&&Y?Q(Y):Promise.resolve(null),[jt,ee]=await Promise.all([q(tt,ct),me]);if(Je!==kt)return;const Xe=jt.total*pt+H,Ze=jt.items.map((Bt,Dt)=>{const Ht=jt.offset+Dt,Gt=H+Ht*pt;if(l()==="groups"){const $t=Bt,he=ft($t.cover),ge=`lib-avatar ${S()==="albums"?"lib-avatar-album":""}`,Qe=S()==="albums"?"💿":K(($t.name[0]||"?").toUpperCase()),ti=he?`<div class="${ge}" style="background-image:url('${K(he)}')"></div>`:`<div class="${ge}" data-artwork-id="${K($t.artworkTrackId||"")}">${Qe}</div>`;return`<div class="lib-item virtual-row" data-group-index="${Dt}" style="position:absolute;left:0;right:0;top:${Gt}px;height:${pt}px">${ti}<div style="flex:1;min-width:0"><div class="t-title">${K($t.name)}</div><div class="t-artist">${K($t.subtitle||`${$t.count} tracks`)}</div></div><span class="chev-r">›</span></div>`}const _t=Bt;return`<div class="track-row virtual-row" data-track-id="${K(_t.id)}" data-page-index="${Dt}" style="position:absolute;left:0;right:0;top:${Gt}px;height:${pt}px">
          <span class="num">${Ht+1}</span>
          ${_t.cover?`<div class="track-cover-mini" style="background-image:url('${K(_t.cover)}');background-size:cover;background-position:center"></div>`:`<div class="track-cover-mini cover-default" data-artwork-id="${K(_t.id)}">♪</div>`}
          <div style="flex:1;min-width:0"><div class="t-title">${K(_t.title)}</div><div class="t-artist">${K(_t.artist)} • ${K(_t.album)}</div></div>
          <span class="t-dur">${ye(_t.duration)}</span>
          <button class="btn small ghost" data-add-track="${K(_t.id)}" title="Add to current playlist">+</button>
        </div>`}).join(""),Ke=$&&ee?`<div class="artist-detail-header" style="position:sticky;top:0;height:${H}px;z-index:4;background:var(--card)">
            <div class="lib-crumb" style="height:38px"><button class="btn small" id="virtualBack">‹ Artists</button><b>${K(Y)}</b></div>
            <div class="chip-row artist-album-chips custom-scrollbar" style="height:46px;padding-top:6px;padding-bottom:6px">
              <button class="chip ${Z===null?"active":""}" data-artist-album="all">All Tracks</button>
              ${ee.map((Bt,Dt)=>{const Ht=ft(Bt.cover),Gt=Ht?`<span class="chip-thumb" style="background-image:url('${K(Ht)}')"></span>`:`<span class="chip-thumb cover-default" data-artwork-id="${K(Bt.artworkTrackId||"")}">♪</span>`;return`<button class="chip ${Z===Bt.name?"active":""}" data-artist-album-index="${Dt}">${Gt}${K(Bt.name)}</button>`}).join("")}
            </div>
          </div>`:N?`<div class="lib-crumb virtual-crumb" style="position:sticky;top:0;height:${H}px;z-index:3;background:var(--card)"><button class="btn small" id="virtualBack">‹ Back</button><b>${K(N)}</b></div>`:"";a.innerHTML=`<div class="virtual-list-space" style="position:relative;height:${Math.max(Xe,x)}px">${Ke}${Ze}</div>`,Ct(jt.items,ee||[]),O(a)}catch{a.innerHTML='<div style="padding:24px;text-align:center;color:var(--text-muted)">Could not read the Library database.</div>'}}function Ct(p,x=[]){var $,N;a&&(a.querySelectorAll("[data-group-index]").forEach(H=>{H.onclick=()=>{const T=p[Number(H.dataset.groupIndex||0)],mt=(T==null?void 0:T.name)||"",tt=(T==null?void 0:T.key)||mt;if(V==="artists"&&!Y)Y=mt;else if(V==="artists"&&Y||V==="albums"){const ct=tt.split("\0");V==="albums"&&(Y=ct[0]||null),Z=ct[1]||mt}else V==="genres"&&(at=mt);F(!0)}}),a.querySelectorAll("[data-add-track]").forEach(H=>{H.onclick=async T=>{T.stopPropagation(),!(!v||!H.dataset.addTrack)&&(await v("add_tracks_to_playlist",{playlistId:P,trackIds:[H.dataset.addTrack]}),U("melo:playlist-changed",{playlistId:P}))}}),a.querySelectorAll("[data-track-id]").forEach(H=>{H.onclick=async T=>{if(T.target.closest("[data-add-track]"))return;const mt=Number(H.dataset.pageIndex||0),tt=p.filter(ct=>"path"in ct).map(m);v&&tt.length&&(await v("replace_playlist_tracks",{playlistId:P,trackIds:tt.map(ct=>ct.id)}),U("melo:playlist-changed",{playlistId:P})),U("melo:play-tracks",{tracks:tt,index:mt})},H.oncontextmenu=T=>{T.preventDefault(),T.stopPropagation(),Lt=H.dataset.trackId||null,it.style.display="block";const mt=it.getBoundingClientRect();it.style.left=`${Math.max(6,Math.min(T.clientX,window.innerWidth-mt.width-6))}px`,it.style.top=`${Math.max(6,Math.min(T.clientY,window.innerHeight-mt.height-6))}px`}}),($=a.querySelector("#virtualBack"))==null||$.addEventListener("click",()=>{V==="artists"&&Y?(Y=null,Z=null):Z?Z=null:Y?Y=null:at=null,F(!0)}),(N=a.querySelector("[data-artist-album='all']"))==null||N.addEventListener("click",()=>{Z=null,F(!0)}),a.querySelectorAll("[data-artist-album-index]").forEach(H=>{H.onclick=()=>{const T=x[Number(H.dataset.artistAlbumIndex||0)];Z=(T==null?void 0:T.name)||null,F(!0)}}))}async function St(){var p;v&&(et=await v("list_playlists"),et.some(x=>x.id===P)||(P=((p=et[0])==null?void 0:p.id)||"p1"),localStorage.setItem("melo-currentPlaylist",P),d&&(d.innerHTML=et.map(x=>`<option value="${K(x.id)}" ${x.id===P?"selected":""}>${K(x.name)} (${x.trackCount})</option>`).join("")))}async function vt(p=!1){if(!c||!v)return;p&&(c.scrollTop=0),c.style.display="block",c.style.position="relative",c.style.overflowY="auto";const x=Math.max(260,c.clientHeight||420),$=Math.max(0,Math.floor(c.scrollTop/ut)-8),N=Math.max(40,Math.ceil(x/ut)+16),H=++At,T=await v("playlist_tracks",{playlistId:P,search:(f==null?void 0:f.value)||null,sort:(w==null?void 0:w.value)||"default",limit:N,offset:$});if(H!==At)return;if(T.items=T.items.map(m),E=T.items,s&&(s.style.display=T.total?"none":"block"),c.style.display=T.total?"block":"none",!T.total){c.innerHTML="";return}const mt=T.items.map((tt,ct)=>`<div class="track-row virtual-row" data-pl-track="${K(tt.id)}" data-page-index="${ct}" style="position:absolute;left:0;right:0;top:${(T.offset+ct)*ut}px;height:${ut}px"><span class="num">${T.offset+ct+1}</span>${tt.cover?`<div class="track-cover-mini" style="background-image:url('${K(tt.cover)}');background-size:cover;background-position:center"></div>`:`<div class="track-cover-mini cover-default" data-artwork-id="${K(tt.id)}">♪</div>`}<div style="flex:1;min-width:0"><div class="t-title">${K(tt.title)}</div><div class="t-artist">${K(tt.artist)} • ${K(tt.album)}</div></div><span class="t-dur">${ye(tt.duration)}</span><button class="btn small ghost" data-remove-track="${K(tt.id)}">×</button></div>`).join("");c.innerHTML=`<div style="position:relative;height:${Math.max(x,T.total*ut)}px">${mt}</div>`,O(c),c.querySelectorAll("[data-pl-track]").forEach(tt=>{tt.onclick=ct=>{ct.target.closest("[data-remove-track]")||U("melo:play-tracks",{tracks:T.items,index:Number(tt.dataset.pageIndex||0)})}}),c.querySelectorAll("[data-remove-track]").forEach(tt=>{tt.onclick=async ct=>{ct.stopPropagation(),await v("remove_track_from_playlist",{playlistId:P,trackId:tt.dataset.removeTrack}),U("melo:playlist-changed",{playlistId:P})}})}async function de(p,x){return v?v(p,x):null}async function pe(p,x="replace"){if(await A(),!v||!p.length)return[];const N=(await v("import_audio_files",{paths:p,playlistId:x==="none"?null:P,replacePlaylist:x==="replace"})).map(m);return await Promise.all([W(),St(),F(),vt()]),U("melo:library-changed",{imported:N.length}),N}async function te(p,x=!1){if(await A(),!v)return null;if(z)return z;const $=await v("start_library_scan",{path:p});return z=$.scanId,h=$.scanId,b=x,r&&It("Cancel Scan"),z}async function Ge(){if(!ot)return;if(z&&v){await v("cancel_library_scan",{scanId:z});return}const{open:p}=await J(async()=>{const{open:$}=await import("./index-CS3Qnt9j.js");return{open:$}},__vite__mapDeps([5,1])),x=await p({directory:!0,multiple:!1});x&&await te(x)}async function Ye(p){if(await A(),!v)return null;const x=await v("get_track_by_id",{id:p});return x?m(x):null}o==null||o.querySelectorAll("[data-libtab]").forEach(p=>{p.onclick=()=>{o.querySelectorAll("[data-libtab]").forEach(x=>x.classList.remove("active")),p.classList.add("active"),V=p.dataset.libtab||"artists",B(),F(!0)}}),n==null||n.addEventListener("input",()=>{lt=n.value.trim(),window.clearTimeout(yt),yt=window.setTimeout(()=>F(!0),180)}),a==null||a.addEventListener("scroll",()=>{window.clearTimeout(yt),yt=window.setTimeout(()=>F(),60)}),c==null||c.addEventListener("scroll",()=>{window.clearTimeout(gt),gt=window.setTimeout(()=>vt(),60)}),f==null||f.addEventListener("input",()=>{window.clearTimeout(gt),gt=window.setTimeout(()=>vt(!0),180)}),w==null||w.addEventListener("change",()=>vt(!0)),d==null||d.addEventListener("change",()=>{P=d.value,localStorage.setItem("melo-currentPlaylist",P),vt(!0)}),r==null||r.addEventListener("click",Ge),u==null||u.addEventListener("click",async()=>{if(v){if(z){alert("Cancel the active scan before clearing the Library database.");return}await Mt()&&(await v("clear_library_database"),E=[],X.clear(),await Promise.all([W(),St(),F(!0),vt(!0)]),U("melo:library-changed",{cleared:!0}))}}),L==null||L.addEventListener("click",async()=>{await de("clear_playlist",{playlistId:P}),await Promise.all([St(),vt(!0)]),U("melo:playlist-changed",{playlistId:P})}),g==null||g.addEventListener("click",async()=>{var $;const p=($=prompt("New playlist name:"))==null?void 0:$.trim();if(!p)return;const x=await de("create_playlist",{name:p});x&&(P=x.id),await Promise.all([St(),vt(!0)])}),k==null||k.addEventListener("click",async()=>{var H;if(!v)return;const p=[];let x=0;for(;;){const T=await v("playlist_tracks",{playlistId:P,search:null,sort:"default",limit:500,offset:x});if(p.push(...T.items),x+=T.items.length,x>=T.total||!T.items.length)break}if(!p.length)return;const $=`#EXTM3U
`+p.map(T=>`#EXTINF:${Math.floor(T.duration)},${T.artist} - ${T.title}
${T.path}`).join(`
`),N=document.createElement("a");N.href=URL.createObjectURL(new Blob([$],{type:"audio/x-mpegurl"})),N.download=`${((H=et.find(T=>T.id===P))==null?void 0:H.name)||"playlist"}.m3u`,N.click(),setTimeout(()=>URL.revokeObjectURL(N.href),1e3)}),ot&&J(async()=>{const{getCurrentWebviewWindow:p}=await import("./webviewWindow-mjQkSB26.js");return{getCurrentWebviewWindow:p}},__vite__mapDeps([6,7,1,0,8])).then(({getCurrentWebviewWindow:p})=>{p().onDragDropEvent(async x=>{if(x.payload.type!=="drop")return;const $=x.payload.paths||[];if(!$.length)return;const N=await pe($,ne==="playlist"?"append":"replace");if(N.length)ne!=="playlist"&&U("melo:play-tracks",{tracks:N,index:0});else for(const H of $)try{await te(H,ne!=="playlist")}catch{}})}).catch(()=>{}),nt("melo:scan-progress",async p=>{if(p){if(p.scanId&&(z=p.scanId),r&&!p.finished&&It(`Cancel ${p.done||0}/${p.total||"…"}`),r){const x=p.total?Math.max(0,Math.min(100,Number(p.done||0)/Number(p.total)*100)):0;r.style.setProperty("--scan-progress",`${x}%`),r.classList.toggle("scanning",!p.finished)}if(p.finished){if(p.scanId===h&&b&&!p.cancelled&&v){await v("replace_playlist_from_scan",{playlistId:P,scanId:p.scanId});const N=(await v("playlist_tracks",{playlistId:P,search:null,sort:"default",limit:100,offset:0})).items.map(m);N.length&&U("melo:play-tracks",{tracks:N,index:0}),U("melo:playlist-changed",{playlistId:P})}z=null,h=null,b=!1,r&&(It("Scan"),r.classList.remove("scanning"),r.style.setProperty("--scan-progress","0%")),await Promise.all([W(),St(),F(),vt()])}}});let ue=0;nt("melo:library-changed",()=>{X.clear(),window.clearTimeout(ue),ue=window.setTimeout(()=>{W(),F(),vt()},500)}),nt("melo:playlist-changed",()=>{St(),vt()}),window.LumiLibrary={get tracks(){return E},get playlists(){return et},scanFolder:te,importPaths:pe,getTrack:Ye,render:()=>F(),addTracks:()=>{},addToCurrentPlaylist:async p=>{!v||!p.length||(await v("add_tracks_to_playlist",{playlistId:P,trackIds:p.map(x=>x.id)}),U("melo:playlist-changed",{playlistId:P}))},currentPlaylistName:()=>{var p;return((p=et.find(x=>x.id===P))==null?void 0:p.name)||"Playlist"}},A().catch(()=>i("Could not initialize the Library database"))}const Wt={flat:[0,0,0,0,0,0,0,0,0,0],pop:[-1,2,4,4,2,-1,-1,2,3,3],rock:[4,3,2,-1,-2,-2,1,3,4,4],bass:[6,5,4,2,1,0,-1,-1,-2,-3],treble:[-3,-2,-1,0,1,2,3,5,6,6],dance:[5,4,2,0,-1,-1,2,4,5,3],jazz:[2,1,2,3,2,0,1,2,3,2],classical:[3,2,1,0,0,0,-1,2,3,4],vocal:[-2,-1,0,2,4,4,3,1,0,-1],acoustic:[3,2,1,1,2,2,3,3,2,1],hiphop:[5,4,1,2,-1,-1,1,-1,2,3],metal:[4,2,-1,-2,-1,1,3,4,5,4]};function oe(t){for(const[i,a]of Object.entries(Wt))if(a.every((e,n)=>e===t[n]))return i;return"custom"}function we(t,i,a={}){const e=!!a.remote,n=document.getElementById("eqEnable"),o=document.getElementById("eqPreset"),r=document.getElementById("btnEqReset"),u=document.getElementById("eqBands"),c=document.getElementById("eqCanvas"),s=c?c.getContext("2d"):null;let d=null,f=[],w=[],L=new Array(Vt.length).fill(0);try{const h=JSON.parse(localStorage.getItem("melo-eq-gains")||"null");Array.isArray(h)&&h.length===Vt.length&&(L=h.map(b=>typeof b=="number"?Math.max(-12,Math.min(12,b)):0))}catch{}let k=localStorage.getItem("melo-eq-preset")||oe(L),g=localStorage.getItem("melo-eq-enabled")!=="0";function v(){if(!d)try{const h=Jt(t);d=h.ctx,f=h.filters,f.forEach((b,E)=>{b.gain.value=g?L[E]:0})}catch{}}function C(h,b){v(),f[h]&&g&&(f[h].gain.value=b)}function G(h){v(),L=[...h],g&&h.forEach((b,E)=>{f[E]&&(f[E].gain.value=b)}),z()}function P(h){v(),g=h,h?L.forEach((b,E)=>{f[E]&&(f[E].gain.value=b)}):f.forEach(b=>{b.gain.value=0}),z()}e||t&&t.addEventListener("play",()=>{v(),(d==null?void 0:d.state)==="suspended"&&d.resume().catch(()=>{})}),nt("melo:eq",h=>{h&&(h.type==="gain"?(e||C(h.idx,h.val),L[h.idx]=h.val,w[h.idx]&&(w[h.idx].value=String(h.val),et(w[h.idx])),o&&(o.value=oe(L)),z()):h.type==="gains"?(e||G(h.values),L=[...h.values],w.length&&w.forEach((b,E)=>{b.value=String(L[E]),et(b)}),o&&h.preset&&(o.value=h.preset),z()):h.type==="enable"&&(g=!!h.on,e||P(g),n&&(n.checked=g),z()))});function et(h){var X;const b=parseInt(h.value),E=(X=h.parentElement)==null?void 0:X.querySelector(".val");E&&(E.textContent=(b>0?"+":"")+b+"dB")}function z(){if(!c||!s)return;const h=window.devicePixelRatio||1,b=c.clientWidth*h,E=c.clientHeight*h;if(b<=0||E<=0)return;c.width=b,c.height=E,s.clearRect(0,0,b,E);const X=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#2a7bd6",V=L;if(!g){s.strokeStyle="rgba(100,120,150,0.25)",s.lineWidth=2*h,s.beginPath(),s.moveTo(0,E/2),s.lineTo(b,E/2),s.stroke();return}s.strokeStyle=X,s.lineWidth=2.5*h,s.lineJoin="round",s.beginPath(),V.forEach((Y,Z)=>{const at=Z/(V.length-1)*b,lt=E/2-Y/12*(E/2-10*h);if(Z===0)s.moveTo(at,lt);else{const pt=(Z-1)/(V.length-1)*b,ut=E/2-V[Z-1]/12*(E/2-10*h);s.quadraticCurveTo((pt+at)/2,ut,at,lt)}}),s.stroke(),V.forEach((Y,Z)=>{const at=Z/(V.length-1)*b,lt=E/2-Y/12*(E/2-10*h);s.fillStyle=X,s.beginPath(),s.arc(at,lt,4*h,0,Math.PI*2),s.fill(),s.fillStyle="white",s.beginPath(),s.arc(at,lt,2*h,0,Math.PI*2),s.fill()}),s.strokeStyle="rgba(100,120,150,0.3)",s.lineWidth=1*h,s.setLineDash([4*h,4*h]),s.beginPath(),s.moveTo(0,E/2),s.lineTo(b,E/2),s.stroke(),s.setLineDash([])}u&&(u.innerHTML="",Vt.forEach((h,b)=>{const E=L[b]||0,X=document.createElement("div");X.className="eq-band",X.innerHTML=`
        <input type="range" min="-12" max="12" value="${E}" step="1" data-idx="${b}" orient="vertical" />
        <label>${h>=1e3?h/1e3+"k":h}</label>
        <span style="font-size:10px;color:var(--text-muted);min-height:12px;" class="val">${(E>0?"+":"")+E+"dB"}</span>
      `,u.appendChild(X)}),w=Array.from(u.querySelectorAll("input")),w.forEach(h=>{h.addEventListener("input",()=>{const b=parseInt(h.dataset.idx),E=parseInt(h.value);et(h),L[b]=E,z();const X=oe(L);o&&(o.value=X),localStorage.setItem("melo-eq-gains",JSON.stringify(L)),localStorage.setItem("melo-eq-preset",X),e||C(b,E),U("melo:eq",{type:"gain",idx:b,val:E,values:L})})})),o&&(o.value=k,o.addEventListener("change",()=>{const h=Wt[o.value]||Wt.flat;w.length&&w.forEach((b,E)=>{b.value=String(h[E]),et(b)}),L=[...h],z(),localStorage.setItem("melo-eq-gains",JSON.stringify(L)),localStorage.setItem("melo-eq-preset",o.value),e||G(h),U("melo:eq",{type:"gains",values:h,preset:o.value}),i(`Preset: ${o.options[o.selectedIndex].text}`)})),r&&r.addEventListener("click",()=>{const h=Wt.flat;w.length&&w.forEach((b,E)=>{b.value="0",et(b)}),L=[...h],o&&(o.value="flat"),localStorage.setItem("melo-eq-gains",JSON.stringify(L)),localStorage.setItem("melo-eq-preset","flat"),e||G(h),U("melo:eq",{type:"gains",values:h,preset:"flat"}),z(),i("Equalizer reset to Flat (0dB)")}),n&&(n.checked=g,n.addEventListener("change",()=>{g=n.checked,localStorage.setItem("melo-eq-enabled",g?"1":"0"),e||P(g),U("melo:eq",{type:"enable",on:g}),z(),i(g?"Equalizer On":"Equalizer off — Flat")})),c&&new ResizeObserver(()=>z()).observe(c),z(),window.LumiEqualizer={presets:Wt,frequencies:Vt,displayGains:L,reset:()=>r==null?void 0:r.click()}}const Nt=[{id:"bars",label:"Classic Bars"},{id:"thin",label:"Thin Bars"},{id:"line",label:"Spectrum Line"},{id:"mirror",label:"Mirror Bars"},{id:"wave",label:"Oscilloscope"},{id:"spectrumWave",label:"Spectrum Wave"},{id:"blocks",label:"Block Equalizer"}];function ri(t){let i=document.getElementById("vizBars");if(!i)return;let a=g(i),e=a.getContext("2d"),n=null,o=null,r=null,u=null,c=null,s=!1,d=localStorage.getItem("melo-viz-mode")||"bars";Nt.some(m=>m.id===d)||(d="bars");let f=0,w=[],L=.45,k=null;function g(m){let y=m.querySelector("canvas");return y||(m.innerHTML="",y=document.createElement("canvas"),m.appendChild(y)),y}function v(){if(!(o&&r))try{const m=Jt(t);n=m.ctx,o=m.analyser,r=new Uint8Array(o.frequencyBinCount),u=new Uint8Array(o.fftSize)}catch{s=!0}}function C(m){const y=r.length,I=((n==null?void 0:n.sampleRate)||44100)/2,M=45,_=Math.min(15e3,I*.95),j=Math.log(M),O=Math.log(_),A=[];for(let R=0;R<m;R++){const W=Math.exp(j+(O-j)*R/m),B=Math.exp(j+(O-j)*(R+1)/m);let l=Math.floor(W/I*y),S=Math.max(l+1,Math.ceil(B/I*y));l<0&&(l=0),S>y&&(S=y);let D=0;for(let q=l;q<S;q++)D+=r[q];A.push(D/(S-l)/255)}return A}function G(m){const y=performance.now()/1e3,I=Math.pow(Math.abs(Math.sin(y*2.2)),2.5),M=[];for(let _=0;_<m;_++){let j=.42+.26*Math.sin(y*1.35+_*.62)+.2*Math.sin(y*2.9+_*1.31)+Math.random()*.07;j*=.55+.5*I,M.push(Math.max(.04,Math.min(1,j)))}return M}function P(m){const y=performance.now()/1e3,I=.5+.5*Math.pow(Math.abs(Math.sin(y*1.9)),2);for(let M=0;M<m.length;M++){const _=M/m.length;m[M]=128+66*I*(Math.sin(_*Math.PI*6+y*7)*.6+Math.sin(_*Math.PI*13-y*11)*.4)}}function et(m){let y;if(s||!o||!r)y=G(m);else if(o.getByteFrequencyData(r),y=C(m),!y.some(_=>_>.01)&&!t.paused)y=G(m);else for(let _=0;_<m;_++)y[_]*=1+1.7*(_/Math.max(1,m-1));let I=0;for(const M of y)M>I&&(I=M);I>L?L=I:L=Math.max(.35,L*.985),w.length!==m&&(w=new Array(m).fill(0));for(let M=0;M<m;M++){const _=Math.min(1,y[M]/L),j=_>w[M]?.55:.16;w[M]+=(_-w[M])*j}return w}function z(m,y){return getComputedStyle(document.documentElement).getPropertyValue(m).trim()||y}function h(){return a.width/Math.max(1,a.clientWidth)||1}function b(m,y,I,M,_){if(_=Math.min(_,I/2,M/2),e.roundRect){e.roundRect(m,y,I,M,_);return}e.rect(m,y,I,M)}function E(){const m=window.devicePixelRatio||1,y=a.clientWidth||(i==null?void 0:i.clientWidth)||200,I=a.clientHeight||(i==null?void 0:i.clientHeight)||56;y>0&&I>0&&(a.width=Math.round(y*m),a.height=Math.round(I*m))}new ResizeObserver(E).observe(a),E();function X(m,y,I,M){const _=h(),j=z("--visualizer","#38bdf8"),O=z("--accent","#0284c7"),A=m.length,R=y/A,W=Math.max(1.2*_,R*(1-M));for(let B=0;B<A;B++){const l=m[B],S=Math.max(2*_,l*(I-4*_)),D=B*R+(R-W)/2,q=I-S-1*_,Q=e.createLinearGradient(0,q,0,I);Q.addColorStop(0,O),Q.addColorStop(1,j),e.fillStyle=Q,e.beginPath(),b(D,q,W,S,Math.min(W/2,3.5*_)),e.fill()}}function V(m,y,I){const M=h(),_=z("--visualizer","#38bdf8"),j=z("--accent","#0284c7"),O=m.length,A=y/O,R=I/2,W=Math.max(1.5*M,A*.62);for(let B=0;B<O;B++){const l=Math.max(1.5*M,m[B]*(I/2-3*M)),S=B*A+(A-W)/2,D=e.createLinearGradient(0,R-l,0,R+l);D.addColorStop(0,j),D.addColorStop(.5,_),D.addColorStop(1,j),e.fillStyle=D,e.beginPath(),b(S,R-l,W,l*2,Math.min(W/2,3*M)),e.fill()}}function Y(m,y,I){const M=h(),_=z("--visualizer","#38bdf8"),j=z("--accent","#0284c7"),O=m.length,A=[],R=[];for(let B=0;B<O;B++)A.push((B+.5)/O*y),R.push(I-2*M-m[B]*(I-8*M));e.beginPath(),e.moveTo(A[0],I),e.lineTo(A[0],R[0]);for(let B=1;B<O;B++){const l=(A[B-1]+A[B])/2;e.quadraticCurveTo(A[B-1],R[B-1],l,(R[B-1]+R[B])/2)}e.lineTo(A[O-1],R[O-1]),e.lineTo(A[O-1],I),e.closePath();const W=e.createLinearGradient(0,0,0,I);W.addColorStop(0,_),W.addColorStop(1,"transparent"),e.globalAlpha=.18,e.fillStyle=W,e.fill(),e.globalAlpha=1,e.beginPath(),e.moveTo(A[0],R[0]);for(let B=1;B<O;B++){const l=(A[B-1]+A[B])/2;e.quadraticCurveTo(A[B-1],R[B-1],l,(R[B-1]+R[B])/2)}e.lineTo(A[O-1],R[O-1]),e.strokeStyle=j,e.lineWidth=2*M,e.lineJoin="round",e.stroke()}function Z(m,y,I){const M=h(),_=z("--visualizer","#38bdf8"),j=z("--accent","#0284c7"),O=I/2,A=m.length,R=m.map((l,S)=>{const D=S/Math.max(1,A-1),q=Math.pow(Math.sin(Math.PI*D),.28);return Math.max(.7*M,l*q*(I*.46))}),W=l=>{e.beginPath();for(let S=0;S<A;S++){const D=S/Math.max(1,A-1)*y,q=O+(l?-R[S]:R[S]);if(S===0)e.moveTo(D,q);else{const Q=(S-1)/Math.max(1,A-1)*y,F=O+(l?-R[S-1]:R[S-1]);e.quadraticCurveTo(Q,F,(Q+D)/2,(F+q)/2)}}};W(!0);for(let l=A-1;l>=0;l--){const S=l/Math.max(1,A-1)*y;e.lineTo(S,O+R[l])}e.closePath();const B=e.createLinearGradient(0,0,0,I);B.addColorStop(0,j),B.addColorStop(.5,_),B.addColorStop(1,j),e.fillStyle=B,e.globalAlpha=.3,e.fill(),e.globalAlpha=.18,e.shadowColor=_,e.shadowBlur=8*M,W(!0),e.strokeStyle=_,e.lineWidth=4*M,e.stroke(),W(!1),e.stroke(),e.shadowBlur=0,e.globalAlpha=1,W(!0),e.strokeStyle=j,e.lineWidth=1.2*M,e.stroke(),W(!1),e.stroke(),e.beginPath(),e.moveTo(0,O),e.lineTo(y,O),e.strokeStyle=_,e.globalAlpha=.45,e.lineWidth=.8*M,e.stroke(),e.globalAlpha=1}function at(m,y,I){const M=h(),_=z("--visualizer","#38bdf8"),j=z("--accent","#0284c7"),O=m.length,A=8,R=Math.max(1*M,y*.0035),W=Math.max(1*M,I*.025),B=Math.max(1,(y-R*(O-1))/O),l=Math.max(1,(I-W*(A-1))/A),S=e.createLinearGradient(0,0,0,I);S.addColorStop(0,j),S.addColorStop(1,_),e.fillStyle=S;for(let D=0;D<O;D++){const q=Math.max(1,Math.min(A,Math.round(m[D]*A))),Q=D*(B+R);for(let F=0;F<q;F++){const Ct=I-(F+1)*l-F*W;e.globalAlpha=.58+.42*((F+1)/A),e.fillRect(Q,Ct,B,l)}}e.globalAlpha=1}function lt(){const m=a.width,y=a.height,I=h(),M=z("--accent","#0284c7");let _;s||!o||!u?(c||(c=new Uint8Array(1024)),P(c),_=c):(o.getByteTimeDomainData(u),_=u);const j=()=>{e.beginPath();for(let O=0;O<=m;O+=2){const A=Math.min(_.length-1,Math.floor(O/m*_.length)),R=_[A]/255*y;O===0?e.moveTo(O,R):e.lineTo(O,R)}};j(),e.strokeStyle=M,e.globalAlpha=.16,e.lineWidth=6*I,e.lineJoin="round",e.stroke(),j(),e.globalAlpha=1,e.lineWidth=1.8*I,e.stroke()}function pt(){const m=a.width,y=a.height;if(!m||!y)return;if(e.clearRect(0,0,m,y),d==="wave"){lt();return}const M=et(d==="bars"?16:d==="thin"?56:d==="line"?64:d==="spectrumWave"?72:d==="blocks"?22:24);d==="bars"?X(M,m,y,.34):d==="thin"?X(M,m,y,.32):d==="line"?Y(M,m,y):d==="mirror"?V(M,m,y):d==="spectrumWave"?Z(M,m,y):d==="blocks"&&at(M,m,y)}function ut(){f=requestAnimationFrame(ut),pt()}function kt(){f||ut()}function At(m,y=!1){d=m,w=[],localStorage.setItem("melo-viz-mode",m)}function yt(){return k||(k=document.createElement("div"),k.className="viz-menu",k.style.display="none",document.body.appendChild(k),k)}function gt(){const m=yt();m.innerHTML='<div class="viz-menu-label">Visualizer type</div>'+Nt.map(y=>`<button class="viz-menu-item ${y.id===d?"active":""}" data-mode="${y.id}">${y.id===d?"✓":""}<span>${y.label}</span></button>`).join(""),m.querySelectorAll("[data-mode]").forEach(y=>{y.addEventListener("click",I=>{I.stopPropagation(),At(y.dataset.mode),it()})})}function Lt(m,y){gt();const I=k;I.style.display="block";const M=I.getBoundingClientRect();I.style.left=Math.max(8,Math.min(m,window.innerWidth-M.width-8))+"px",I.style.top=Math.max(8,Math.min(y,window.innerHeight-M.height-8))+"px"}function it(){k&&(k.style.display="none")}function Mt(){i&&(i.title="Click: next mode • Right-click: choose mode",i.addEventListener("click",()=>{it();const m=Nt.findIndex(y=>y.id===d);At(Nt[(m+1)%Nt.length].id)}),i.addEventListener("contextmenu",m=>{m.preventDefault(),m.stopPropagation(),Lt(m.clientX,m.clientY)}))}document.addEventListener("click",m=>{k&&k.style.display!=="none"&&!k.contains(m.target)&&it()}),document.addEventListener("keydown",m=>{m.key==="Escape"&&it()});function It(){v(),kt(),(n==null?void 0:n.state)==="suspended"&&n.resume().catch(()=>{})}t.addEventListener("play",It),It(),Mt(),document.addEventListener("visibilitychange",()=>{document.hidden?(cancelAnimationFrame(f),f=0):kt()});function ft(){cancelAnimationFrame(f),f=0,i=document.getElementById("vizBars"),i&&(a=g(i),e=a.getContext("2d"),new ResizeObserver(E).observe(a),E(),Mt(),kt())}window.__LUMI_REBIND_VISUALIZER__=ft}function xe(t){if(!t||!t.trim())return{isSynced:!1,lines:[],raw:""};const i=[],a=t.split(/\r?\n/),e=/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;let n=!1;for(const o of a){const r=o.trim();if(!r||/^\[[a-z]{2,8}:/i.test(r))continue;const u=[...r.matchAll(e)];if(u.length>0){n=!0;const c=r.replace(e,"").trim();for(const s of u){const d=parseInt(s[1],10),f=parseInt(s[2],10),w=s[3]||"0",L=w.length===2?parseInt(w,10)*10:w.length===1?parseInt(w,10)*100:parseInt(w.slice(0,3),10),k=d*60+f+L/1e3;i.push({time:k,text:c})}}else i.push({time:-1,text:r})}return i.sort((o,r)=>o.time-r.time),{isSynced:n,lines:i,raw:t}}function ke(t,i){var k;const a=document.getElementById("lyricsContainer"),e=document.getElementById("lyricsStatus"),n=document.getElementById("lyricsTrackTitle");let o={isSynced:!1,lines:[]},r=null,u=-1,c=0;async function s(g){if(g.lyrics&&g.lyrics.trim().length>0)return g.lyrics;if(window.__TAURI__)try{const{invoke:v}=await J(async()=>{const{invoke:G}=await import("./core-DhEqZVGG.js");return{invoke:G}},[]),C=await v("get_track_lyrics",{path:g.path});if(C)return C}catch{}return null}async function d(g){if(!g){r=null,o={isSynced:!1,lines:[],raw:""},n&&(n.textContent="No track playing"),f();return}r=g.id,n&&(n.textContent=`${g.title} — ${g.artist}`);const v=await s(g);o=xe(v||""),f()}function f(){if(a){if(a.innerHTML="",u=-1,!o.lines.length){e&&(e.style.display="block",e.innerHTML='No synced lyrics found (.lrc)<br/><span style="font-size:10.5px; opacity:0.7;">Place a matching .lrc file in the song folder or add lyrics in the tag editor.</span>');return}e&&(e.style.display="none"),o.lines.forEach((g,v)=>{const C=document.createElement("div");C.className="lyric-line",C.dataset.idx=String(v),C.dataset.time=String(g.time),C.textContent=g.text||"♪",g.time>=0&&(C.style.cursor="pointer",C.title=`Seek to ${Math.floor(g.time/60)}:${Math.floor(g.time%60).toString().padStart(2,"0")}`,C.addEventListener("click",()=>{U("melo:seek-playback",g.time),window.__TAURI__||(t.currentTime=g.time,t.play().catch(()=>{}))})),a.appendChild(C)})}}function w(){if(!a||!o.isSynced||!o.lines.length)return;const g=window.__TAURI__?c:t.currentTime;let v=-1;for(let C=0;C<o.lines.length&&o.lines[C].time<=g;C++)v=C;if(v!==u){u=v;const C=a.querySelectorAll(".lyric-line");if(C.forEach((G,P)=>{G.classList.toggle("active",P===u),G.classList.toggle("passed",P<u)}),u>=0&&C[u]){const G=C[u],P=a.clientHeight,z=G.offsetTop-a.offsetTop-P/2+G.clientHeight/2;a.scrollTo({top:Math.max(0,z),behavior:"smooth"})}}}t.addEventListener("timeupdate",w),window.addEventListener("lumi:trackChange",g=>{d(g.detail)}),nt("melo:track-changed",g=>{d(g)}),nt("melo:playback-state",g=>{g&&(c=Number(g.currentTime)||0,g.track&&g.track.id!==r?d(g.track):w())}),nt("melo:playback-position",g=>{c=Number(g)||0,w()});const L=window.__LUMI_QUEUE__;if(Array.isArray(L)&&L.length>0)d(L[((k=window.LumiPlayer)==null?void 0:k.currentIndex)||0]);else try{const g=JSON.parse(localStorage.getItem("melo-current-track")||"null");g&&d(g)}catch{}U("melo:request-playback-state"),setTimeout(()=>U("melo:request-playback-state"),250),window.LumiLyrics={loadTrackLyrics:d,parseLRC:xe}}let Et=null;const Me=`<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Melo Skin - Minimal Compact (Light)</title>
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
    background: #e2e8f0 !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.10) !important;
    flex-shrink: 0 !important;
    border: 2px solid #ffffff !important;
  }
  .cover-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .cover-fallback { width: 100%; height: 100%; display: grid; place-items: center; background: linear-gradient(135deg, #a5b4fc, #67e8f9); color: white; font-size: 24px; }

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
    background: linear-gradient(to right, var(--accent, #5b92a5) 0%, var(--accent, #5b92a5) var(--progress, 35%), #e5e7eb var(--progress, 35%), #e5e7eb 100%) !important;
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
`,Se=`<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Melo Skin - Minimal Compact (Dark)</title>
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
    background: #0d1117 !important;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4) !important;
    flex-shrink: 0 !important;
    border: 2px solid #30363d !important;
  }
  .cover-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .cover-fallback { width: 100%; height: 100%; display: grid; place-items: center; background: linear-gradient(135deg, #1e293b, #0f766e); color: #5eead4; font-size: 24px; }

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
    background: linear-gradient(to right, var(--accent, #4db6ac) 0%, var(--accent, #4db6ac) var(--progress, 35%), #212833 var(--progress, 35%), #212833 100%) !important;
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
`,Xt={"compact-pill-light.html":Me,"compact-pill-dark.html":Se,"compact-pill-light":Me,"compact-pill-dark":Se},si=[{id:"compact-pill-light",name:"Minimal Compact (Light)",filename:"compact-pill-light.html"},{id:"compact-pill-dark",name:"Minimal Compact (Dark)",filename:"compact-pill-dark.html"},{id:"full-html-example",name:"Full HTML Example",filename:"full-html-example.html"},{id:"example-custom",name:"Custom CSS Example",filename:"example-custom.html"}];function Be(t){const i=["trackTitle","btnPlay","seekBar","coverImg"];let a=0;for(const e of i)t.includes(e)&&a++;return a>=3}function Rt(t,i){const a=document.getElementById("playerCard");if(!a)return;const e=a._originalHTML||a.innerHTML;a._originalHTML||(a._originalHTML=e),Et&&(Et.remove(),Et=null);let o=[...t.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(f=>f[1]).join(`
`);o&&(Et=document.createElement("style"),Et.id="melo-custom-skin",Et.textContent=o,document.head.appendChild(Et));const r=Be(t);let u="";const c=t.match(/<body[^>]*>([\s\S]*?)<\/body>/i);c?u=c[1]:u=t.split(/<\/style>/i).pop()||"";const s=document.createElement("div");s.innerHTML=u;const d=s.querySelector("#lumi-player");if(d&&(u=d.innerHTML),r&&u.trim().length>20){const f=u.trim();a.innerHTML=f,i&&i("Skin applied"),setTimeout(()=>{var L,k;(L=window.__LUMI_REBIND__)==null||L.call(window);const w=window.__LUMI_AUDIO__;w&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(w),(k=window.__LUMI_REBIND_MAIN__)==null||k.call(window)},40)}else o&&i&&i("Skin CSS applied");localStorage.setItem("lumi-custom-skin",t),localStorage.setItem("lumi-custom-skin-isFull",r?"1":"0")}function le(t,i=!0){document.documentElement.classList.remove("compact-skin-active"),document.body.classList.remove("compact-skin-active"),Et&&(Et.remove(),Et=null);const a=document.getElementById("playerCard");a&&a._originalHTML&&(a.innerHTML=a._originalHTML,setTimeout(()=>{var n,o;(n=window.__LUMI_REBIND__)==null||n.call(window);const e=window.__LUMI_AUDIO__;e&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(e),(o=window.__LUMI_REBIND_MAIN__)==null||o.call(window)},40)),localStorage.removeItem("lumi-custom-skin"),localStorage.removeItem("lumi-custom-skin-isFull"),localStorage.setItem("melo-active-skin-id","default"),i&&U("melo:skin-changed","default"),t&&t("Switched to Default Melo skin")}async function ze(){if(ot)try{const{invoke:t}=await J(async()=>{const{invoke:a}=await import("./core-DhEqZVGG.js");return{invoke:a}},[]),i=await t("list_installed_skins");if(Array.isArray(i)&&i.length>0)return i}catch{}return si}async function Pe(t,i){if(ot)try{const{invoke:e}=await J(async()=>{const{invoke:o}=await import("./core-DhEqZVGG.js");return{invoke:o}},[]),n=await e("read_skin_file",{filenameOrPath:t});if(n&&n.trim().length>0)return Rt(n,i),!0}catch{}try{const e=t.startsWith("skins/")?t:`skins/${t}`,n=await fetch(e);if(n.ok){const o=await n.text();return Rt(o,i),!0}}catch{}const a=t.replace(/^.*[\\/]/,"");return Xt[a]?(Rt(Xt[a],i),!0):(i&&i(`Could not load skin: ${t}`),!1)}async function Pt(t,i,a,e=!0){if(t==="default"){le(a,e);return}let n=t;const o=t==="compact-pill"||t.startsWith("compact-pill");document.documentElement.classList.toggle("compact-skin-active",o),document.body.classList.toggle("compact-skin-active",o),o?n=i==="dark"?"compact-pill-dark.html":"compact-pill-light.html":!n.endsWith(".html")&&!n.endsWith(".htm")&&(n=n+".html");let r=!1;o&&Xt[n]?(Rt(Xt[n],a),r=!0):r=await Pe(n,a),r&&(localStorage.setItem("melo-active-skin-id",t),e&&U("melo:skin-changed",t))}async function Re(t){if(ot)try{const{invoke:i}=await J(async()=>{const{invoke:a}=await import("./core-DhEqZVGG.js");return{invoke:a}},[]);await i("open_skins_folder"),t&&t("Opening skins folder...")}catch{t&&t("Could not open skins folder")}else t&&t("Skins are located in the skins/ folder")}function ci(t){const i=document.getElementById("skinUpload"),a=document.getElementById("linkDownloadExample");a&&a.addEventListener("click",o=>{o.preventDefault(),Pe("compact-pill-light.html")});const e=localStorage.getItem("melo-active-skin-id")||"default",n=localStorage.getItem("lumi-theme")||"dark";e!=="default"&&setTimeout(()=>{Pt(e,n,void 0,!1)},150),nt("melo:theme",o=>{const r=localStorage.getItem("melo-active-skin-id");r&&r!=="default"&&Pt(r,o,void 0,!1)}),nt("melo:skin-changed",o=>{if(o&&typeof o=="string"){const r=localStorage.getItem("lumi-theme")||"dark";Pt(o,r,void 0,!1)}}),i&&i.addEventListener("change",async()=>{var c;const o=(c=i.files)==null?void 0:c[0];if(!o)return;const r=await o.text(),u=o.name;if(ot)try{const{invoke:s}=await J(async()=>{const{invoke:d}=await import("./core-DhEqZVGG.js");return{invoke:d}},[]);await s("save_custom_skin_file",{filename:u,content:r}),t(`Saved ${u} to skins folder`)}catch{}Rt(r,t),localStorage.setItem("melo-active-skin-id",u),U("melo:skin-changed",u),i.value=""}),document.addEventListener("dragover",o=>{var r;[...((r=o.dataTransfer)==null?void 0:r.types)||[]].includes("Files")&&o.preventDefault()}),document.addEventListener("drop",async o=>{var u;const r=[...((u=o.dataTransfer)==null?void 0:u.files)||[]].find(c=>c.name.endsWith(".html")||c.name.endsWith(".htm"));if(r){o.preventDefault();const c=await r.text();if(c.includes("<style")||c.includes("<html")||Be(c)){const s=r.name;if(ot)try{const{invoke:d}=await J(async()=>{const{invoke:f}=await import("./core-DhEqZVGG.js");return{invoke:f}},[]);await d("save_custom_skin_file",{filename:s,content:c})}catch{}Rt(c,t),localStorage.setItem("melo-active-skin-id",s),U("melo:skin-changed",s)}}}),window.LumiSkin={applyCustomSkin:Rt,resetSkin:le,applySkinChoice:Pt,listInstalledSkins:ze,openSkinsFolderOnDisk:Re}}const di=(t,i,a)=>{const e=t[i];return e?typeof e=="function"?e():Promise.resolve(e):new Promise((n,o)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(o.bind(null,new Error("Unknown variable dynamic import: "+i+(i.split("/").length!==a?". Note that variables only represent file names one level deep.":""))))})},qe={code:"en",name:"English",nativeName:"English",authors:["Melo Team"]},re={_meta:qe,"settings.tabs.general":"General","settings.tabs.playback":"Playback","settings.tabs.appearance":"Appearance & Skin","settings.tabs.shortcuts":"Shortcuts","settings.tabs.about":"About","settings.general.language.label":"Language","settings.general.language.desc":"Interface language — more languages coming via community translation","settings.general.tray.label":"Close to system tray","settings.general.tray.desc":"Minimize to system tray on window close","settings.general.resume.label":"Resume playback on reopen","settings.general.resume.desc":"Continue playback of the previous track where you left off","settings.playback.replaygain.label":"ReplayGain normalization","settings.playback.replaygain.desc":"Equalize track volume levels automatically","settings.playback.fadepause.label":"Fade out on pause","settings.playback.fadepause.desc":"Smooth 0.3s fade-out on pause, fade back in on resume","settings.appearance.showstop.label":"Show Stop button","settings.appearance.showstop.desc":"Display a Stop control next to Play/Pause in the player"},pi=Object.freeze(Object.defineProperty({__proto__:null,_meta:qe,default:re},Symbol.toStringTag,{value:"Module"})),$e=[{code:"en",nativeName:"English"}],zt={en:re};let Oe=zt.en,De="en";function ui(){return De}async function He(t){if($e.some(i=>i.code===t)||(t="en"),!zt[t])if(t==="en")zt.en=re;else try{const i=await di(Object.assign({"./locales/en.json":()=>J(()=>Promise.resolve().then(()=>pi),void 0)}),`./locales/${t}.json`,3);zt[t]=i.default||i}catch{t="en"}De=t,Oe=zt[t]||zt.en,localStorage.setItem("melo-pref-language",t),document.dispatchEvent(new CustomEvent("melo:locale-changed",{detail:t}))}function st(t){var i,a;return(a=(i=Oe[t])!=null?i:zt.en[t])!=null?a:t}function Ee(){const t=localStorage.getItem("melo-pref-language")||"en";He(t)}const Ue=document.querySelector("#app");Ue.innerHTML=`
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
          <select id="playlistSelect" class="settings-select" style="height:26px; font-size:11px; padding:2px 6px; flex:1 1 140px;" title="Current playlist"></select>
          <button class="btn small ghost" id="btn-new-playlist" style="height:26px; font-size:11px;">+ New</button>
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
            <select class="settings-select" id="setLanguage">${$e.map(t=>`<option value="${t.code}">${t.nativeName}</option>`).join("")}</select>
          </div>
          <div class="settings-row">
            <div><div class="label">${st("settings.general.tray.label")}</div><div class="desc">${st("settings.general.tray.desc")}</div></div>
            <div class="switch on" id="swTray" data-key="tray"></div>
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
            <div class="switch" id="swFadePause" data-key="fadePause"></div>
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
            <div style="font-size:16px; font-weight:800; color:var(--text); margin-bottom:4px;">Melo 0.4.0 Beta</div>
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
`;const rt=new URLSearchParams(location.search).get("panel");rt&&(document.documentElement.classList.add("panel-window",`panel-${rt}`),document.body.classList.add("panel-window",`panel-${rt}`));var _e,Te;if(ot&&rt){J(async()=>{const{getCurrentWindow:e}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:e}},__vite__mapDeps([8,7,1,0])).then(({getCurrentWindow:e})=>{const n=e();gi(n,"melo-geo-panel-"+rt),n.onCloseRequested(()=>{U("melo:panel-closed",rt)}),window.addEventListener("beforeunload",()=>{U("melo:panel-closed",rt)})});const t=document.getElementById("win-"+rt),i=((_e=t==null?void 0:t.querySelector(".float-title"))==null?void 0:_e.innerHTML)||"",a=((Te=t==null?void 0:t.querySelector(".float-body"))==null?void 0:Te.innerHTML)||"";Ue.innerHTML=`
<div class="panel-root">
  <div class="panel-titlebar" data-tauri-drag-region>
    <div class="panel-title" data-tauri-drag-region>${i}</div>
    <div class="win-controls">
      <button class="win-btn" aria-label="minimize" title="Minimize">—</button>
      <button class="win-btn" aria-label="maximize" title="Maximize / Restore">□</button>
      <button class="win-btn close" aria-label="close" title="Close">×</button>
    </div>
  </div>
  <div class="panel-body">${a}</div>
  <div id="toast" class="toast"></div>
</div>`}ot&&!rt&&(document.documentElement.classList.add("tauri-main"),document.body.classList.add("tauri-main"),document.querySelectorAll(".side-actions .sbtn").forEach(t=>t.classList.remove("active")),J(async()=>{const{WebviewWindow:t}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:t}},__vite__mapDeps([6,7,1,0,8])).then(({WebviewWindow:t})=>{const i=async()=>{var a;for(const e of["library","playlist","equalizer","lyrics","settings"])try{const n=await t.getByLabel("panel-"+e);(a=document.getElementById(se[e]))==null||a.classList.toggle("active",!!n)}catch{}};i(),setInterval(i,1200)}));ot&&!rt&&(J(()=>import("./window-BWd3Cypy.js"),__vite__mapDeps([8,7,1,0])).then(async({getCurrentWindow:t})=>{const i=t(),a=()=>{const n=localStorage.getItem("melo-active-skin-id"),o=n==="compact-pill"||typeof n=="string"&&n.startsWith("compact-pill");return{w:o?780:960,h:o?138:240}};try{const n=JSON.parse(localStorage.getItem("melo-geo-main")||"null"),{LogicalPosition:o,LogicalSize:r}=await J(async()=>{const{LogicalPosition:d,LogicalSize:f}=await import("./dpi-fvP-W2qr.js");return{LogicalPosition:d,LogicalSize:f}},__vite__mapDeps([7,1])),u=a(),c=u.w===780,s=c?u.w:n!=null&&n.w?Math.max(650,n.w):u.w;await i.setSize(new r(s,u.h)),await i.setResizable(!c),(n==null?void 0:n.x)!=null&&(n==null?void 0:n.y)!=null&&await i.setPosition(new o(n.x,n.y))}catch{}const e=async()=>{try{const n=await i.outerPosition(),o=await i.innerSize(),r=a();localStorage.setItem("melo-geo-main",JSON.stringify({x:n.x,y:n.y,w:o.width,h:r.h}))}catch{}};i.onMoved(e),i.onResized(async()=>{try{const n=await i.innerSize(),o=a(),r=o.w===780,{LogicalSize:u}=await J(async()=>{const{LogicalSize:c}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:c}},__vite__mapDeps([7,1]));if(!r){const c=n.toLogical(await i.scaleFactor());(c.width<650||c.height!==o.h)&&await i.setSize(new u(Math.max(650,c.width),o.h))}}catch{}e()}),nt("melo:skin-changed",async n=>{try{!rt&&n&&await Pt(n,Tt,void 0,!1);const o=n==="compact-pill"||typeof n=="string"&&n.startsWith("compact-pill"),r=o?780:960,u=o?138:240,{LogicalSize:c}=await J(async()=>{const{LogicalSize:s}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:s}},__vite__mapDeps([7,1]));await i.setSize(new c(r,u)),await i.setResizable(!o),e()}catch{}}),i.onCloseRequested(async n=>{if(n.preventDefault(),localStorage.getItem("melo-pref-tray")!=="0")try{await i.hide();return}catch{}const{WebviewWindow:r}=await J(async()=>{const{WebviewWindow:u}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:u}},__vite__mapDeps([6,7,1,0,8]));for(const u of["library","playlist","equalizer","lyrics","settings"])try{const c=await r.getByLabel("panel-"+u);c&&await c.close()}catch{}try{await i.destroy()}catch{window.close()}})}),J(()=>import("./core-DhEqZVGG.js"),[]).then(async({invoke:t})=>{try{const i=await t("get_cli_tracks");Array.isArray(i)&&i.length>0&&setTimeout(async()=>{const a=window.LumiLibrary,e=i.map(o=>o.path).filter(Boolean),n=await(a==null?void 0:a.importPaths(e,"replace"))||[];n.length&&U("melo:play-tracks",{tracks:n,index:0})},350)}catch{}}),nt("melo:open-files",t=>{if(Array.isArray(t)&&t.length>0){const i=t.map(a=>a.path).filter(Boolean);setTimeout(async()=>{const a=window.LumiLibrary,e=await(a==null?void 0:a.importPaths(i,"replace"))||[];e.length&&U("melo:play-tracks",{tracks:e,index:0})},100)}}));document.addEventListener("contextmenu",t=>{t.preventDefault()});const Yt=document.getElementById("toast"),dt=t=>{Yt&&(Yt.textContent=t,Yt.classList.add("show"),setTimeout(()=>Yt.classList.remove("show"),2200))},wt=new Audio;wt.preload="metadata";wt.crossOrigin="anonymous";window.__LUMI_AUDIO__=wt;window.__TOAST__=dt;localStorage.getItem("melo-dynamic-theme")===null&&localStorage.setItem("melo-dynamic-theme","1");let Tt=localStorage.getItem("lumi-theme")||"dark";function Kt(t){document.documentElement.setAttribute("data-theme",t),localStorage.setItem("lumi-theme",t),Tt=t}function Ne(t){Kt(t),U("melo:theme",t)}Kt(Tt);nt("melo:theme",t=>{(t==="light"||t==="dark")&&Kt(t)});setInterval(()=>{const t=localStorage.getItem("lumi-theme");(t==="light"||t==="dark")&&t!==Tt&&Kt(t)},1e3);document.body.classList.toggle("show-stop-btn",localStorage.getItem("melo-pref-showStopBtn")==="1");nt("melo:pref-changed",t=>{t&&t.key==="showStopBtn"&&document.body.classList.toggle("show-stop-btn",!!t.value)});const mi=["win-library","win-playlist","win-equalizer","win-lyrics","win-settings"],Zt=document.getElementById("desktop"),Ve={btnToggleLibrary:"win-library",btnTogglePlaylist:"win-playlist",btnToggleEq:"win-equalizer",btnToggleLyrics:"win-lyrics",btnOpenSettings:"win-settings",menuToggleLibrary:"win-library",menuTogglePlaylist:"win-playlist",menuToggleEq:"win-equalizer",menuToggleLyrics:"win-lyrics",menuToggleSettings:"win-settings"};function hi(t){const i=document.getElementById(t);return!!i&&!i.classList.contains("hidden")}const se={library:"btnToggleLibrary",playlist:"btnTogglePlaylist",equalizer:"btnToggleEq",lyrics:"btnToggleLyrics",settings:"btnOpenSettings"};async function gi(t,i){const a=async()=>{try{const e=await t.outerPosition(),n=await t.outerSize();localStorage.setItem(i,JSON.stringify({x:e.x,y:e.y,w:n.width,h:n.height}))}catch{}};t.onMoved(a),t.onResized(a)}async function fi(t){const{WebviewWindow:i}=await J(async()=>{const{WebviewWindow:d}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:d}},__vite__mapDeps([6,7,1,0,8])),a="panel-"+t,e=document.getElementById(se[t]),n=await i.getByLabel(a);if(n){await n.close(),e==null||e.classList.remove("active");return}const o={library:[430,620],playlist:[440,560],equalizer:[700,440],lyrics:[380,520],settings:[600,540]},r={library:[360,400],playlist:[360,360],equalizer:[620,400],lyrics:[320,360],settings:[500,400]},u={library:"Library",playlist:"Playlist",equalizer:"Equalizer",lyrics:"Lyric",settings:"Settings"},c=o[t]||[420,520];let s=null;try{s=JSON.parse(localStorage.getItem("melo-geo-panel-"+t)||"null")}catch{}new i(a,{url:`/?panel=${t}`,title:u[t]||t,width:(s==null?void 0:s.w)||c[0],height:(s==null?void 0:s.h)||c[1],minWidth:(r[t]||[360,360])[0],minHeight:(r[t]||[360,360])[1],...(s==null?void 0:s.x)!=null?{x:s.x,y:s.y}:{center:!0},decorations:!1,transparent:!0,shadow:!1,skipTaskbar:!0}),e==null||e.classList.add("active")}nt("melo:panel-closed",t=>{var a;const i=se[t];i&&((a=document.getElementById(i))==null||a.classList.remove("active"))});function ce(t){if(ot){fi(t.replace(/^win-/,""));return}const i=hi(t);Ft(t,!i),i||Qt(document.getElementById(t))}function vi(t){if(t.classList.contains("hidden")||!Zt||window.matchMedia("(max-width: 860px)").matches)return;const i=Zt.getBoundingClientRect();if(i.width<=0||i.height<=0)return;const a=t.getBoundingClientRect(),e=Math.min(a.width,i.width),n=Math.min(a.height,i.height);let o=a.left-i.left,r=a.top-i.top;o=Math.max(0,Math.min(i.width-e,o)),r=Math.max(0,Math.min(i.height-n,r)),t.style.left=o+"px",t.style.top=r+"px",t.style.right="auto",t.style.bottom="auto",t.style.transform="none"}function Ft(t,i){var n,o,r,u,c,s,d,f,w,L;const a=document.getElementById(t);if(!a)return;a.classList.toggle("hidden",!i),localStorage.setItem("lumiv2-"+t,i?"1":"0"),i&&vi(a);const e=i;t==="win-library"&&((n=document.getElementById("btnToggleLibrary"))==null||n.classList.toggle("active",e),(o=document.getElementById("menuToggleLibrary"))==null||o.classList.toggle("active",e)),t==="win-playlist"&&((r=document.getElementById("btnTogglePlaylist"))==null||r.classList.toggle("active",e),(u=document.getElementById("menuTogglePlaylist"))==null||u.classList.toggle("active",e)),t==="win-equalizer"&&((c=document.getElementById("btnToggleEq"))==null||c.classList.toggle("active",e),(s=document.getElementById("menuToggleEq"))==null||s.classList.toggle("active",e)),t==="win-lyrics"&&((d=document.getElementById("btnToggleLyrics"))==null||d.classList.toggle("active",e),(f=document.getElementById("menuToggleLyrics"))==null||f.classList.toggle("active",e)),t==="win-settings"&&((w=document.getElementById("btnOpenSettings"))==null||w.classList.toggle("active",e),(L=document.getElementById("menuToggleSettings"))==null||L.classList.toggle("active",e))}rt||mi.forEach(t=>{const i=localStorage.getItem("lumiv2-"+t);i!==null?Ft(t,i==="1"):t==="win-settings"?Ft(t,!1):Ft(t,!0)});Object.entries(Ve).forEach(([t,i])=>{var a;(a=document.getElementById(t))==null||a.addEventListener("click",()=>ce(i))});document.querySelectorAll("[data-close]").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.close;Ft(i,!1)})});let ht=null,xt=null,Le=10;function Qt(t){Le++,t.style.zIndex=String(Le),document.querySelectorAll(".float-win").forEach(i=>i.classList.remove("active")),t.classList.add("active")}document.querySelectorAll(".float-win").forEach(t=>{t.addEventListener("mousedown",()=>Qt(t))});document.querySelectorAll("[data-drag]").forEach(t=>{t.addEventListener("mousedown",i=>{if(i.target.closest("button")||i.target.closest("input")||i.target.closest("select"))return;const a=t.dataset.drag,e=document.getElementById(a);Qt(e),e.classList.add("dragging");const n=e.getBoundingClientRect();ht={id:a,startX:i.clientX,startY:i.clientY,initX:n.left,initY:n.top,width:n.width,height:n.height}})});document.querySelectorAll("[data-resize]").forEach(t=>{t.addEventListener("mousedown",i=>{i.stopPropagation();const a=t.dataset.resize,e=document.getElementById(a);Qt(e),e.classList.add("resizing");const n=e.getBoundingClientRect();xt={id:a,startX:i.clientX,startY:i.clientY,initW:n.width,initH:n.height}})});window.addEventListener("mousemove",t=>{if(ht){const i=document.getElementById(ht.id);let a=t.clientX-ht.startX,e=t.clientY-ht.startY,n=ht.initX+a,o=ht.initY+e;if(Zt&&!window.matchMedia("(max-width: 860px)").matches){const r=Zt.getBoundingClientRect(),u=r.left,c=r.right-ht.width,s=r.top,d=r.bottom-ht.height;n=Math.max(u,Math.min(c,n))-r.left,o=Math.max(s,Math.min(d,o))-r.top}i.style.left=n+"px",i.style.top=o+"px",i.style.right="auto",i.style.bottom="auto",i.style.transform="none"}if(xt){const i=document.getElementById(xt.id);let a=xt.initW+(t.clientX-xt.startX),e=xt.initH+(t.clientY-xt.startY);a=Math.max(260,a),e=Math.max(160,e),i.style.width=a+"px",i.style.height=e+"px"}});window.addEventListener("mouseup",()=>{if(ht){const t=document.getElementById(ht.id);t&&(t.classList.remove("dragging"),localStorage.setItem("lumiv2-pos-"+ht.id,JSON.stringify({left:t.style.left,top:t.style.top}))),ht=null}if(xt){const t=document.getElementById(xt.id);t&&(t.classList.remove("resizing"),localStorage.setItem("lumiv2-size-"+xt.id,JSON.stringify({width:t.style.width,height:t.style.height}))),xt=null}});async function We(){const t=window.LumiLibrary,i=window.LumiPlayer;if(ot){try{const{open:e}=await J(async()=>{const{open:u}=await import("./index-CS3Qnt9j.js");return{open:u}},__vite__mapDeps([5,1])),n=await e({multiple:!0,filters:[{name:"Audio",extensions:["mp3","flac","wav","aac","ogg","m4a","alac","opus","wma","aiff"]}]});if(!n)return;const o=Array.isArray(n)?n:[n],r=await(t==null?void 0:t.importPaths(o,"replace"))||[];r.length&&(U("melo:play-tracks",{tracks:r,index:0}),dt(`${r.length} file(s) added`))}catch{dt("Error opening files")}return}const a=document.createElement("input");a.type="file",a.multiple=!0,a.accept="audio/*,.mp3,.flac,.wav,.aac,.ogg,.m4a,.alac,.opus,.wma,.aiff",a.onchange=async()=>{const e=Array.from(a.files||[]);if(!e.length)return;const n=[];for(const o of e){const r=o.path,u=r||URL.createObjectURL(o),c=o.name,s=c.lastIndexOf("."),d=s>0?c.slice(0,s):c,f=s>0?c.slice(s+1).toUpperCase():"AUDIO",w={id:r||"imp_"+Math.random().toString(36).slice(2,9),title:d,artist:"Unknown Artist",album:"Single",duration:0,path:u,codec:f,specs:"Local File",source:"import"};await Ce(o,w),n.push(w)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(o=>i==null?void 0:i.queue.push(o)),U("melo:play-tracks",{tracks:n,index:0}),dt(`${n.length} file(s) added`)},a.click()}async function Fe(){const t=window.LumiLibrary,i=window.LumiPlayer;if(ot){try{const{open:e}=await J(async()=>{const{open:r}=await import("./index-CS3Qnt9j.js");return{open:r}},__vite__mapDeps([5,1])),n=await e({directory:!0});if(!n)return;const o=n;await(t==null?void 0:t.scanFolder(o,!0))}catch{dt("Error scanning folder")}return}const a=document.createElement("input");a.type="file",a.webkitdirectory=!0,a.multiple=!0,a.accept="audio/*",a.onchange=async()=>{const e=Array.from(a.files||[]).filter(o=>/\.(mp3|flac|wav|aac|ogg|m4a|alac|opus|wma|aiff)$/i.test(o.name));if(!e.length)return;const n=[];for(const o of e){const r=o.path,u=r||URL.createObjectURL(o),c=o.name,s=c.lastIndexOf("."),d=s>0?c.slice(0,s):c,f=s>0?c.slice(s+1).toUpperCase():"AUDIO",w={id:r||"imp_"+Math.random().toString(36).slice(2,9),title:d,artist:"Unknown Artist",album:"Folder Import",duration:0,path:u,codec:f,specs:"Local File",source:"import"};await Ce(o,w),n.push(w)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(o=>i==null?void 0:i.queue.push(o)),U("melo:play-tracks",{tracks:n,index:0}),dt(`${n.length} file(s) added from folder`)},a.click()}document.addEventListener("click",t=>{var a;const i=(a=t.target)==null?void 0:a.closest("#btnAddFiles, #btnAddFolder, #btnThemeToggle");i&&(i.id==="btnAddFiles"?We():i.id==="btnAddFolder"?Fe():i.id==="btnThemeToggle"&&Ne(Tt==="light"?"dark":"light"))});window.addEventListener("keydown",t=>{(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="o"&&(t.shiftKey?(t.preventDefault(),Fe()):(t.preventDefault(),We())),((t.ctrlKey||t.metaKey)&&t.key===","||t.key==="F2")&&(t.preventDefault(),ce("win-settings"))});function Ie(t){var w,L;function i(k){document.querySelectorAll(".settings-tab").forEach(g=>{g.classList.toggle("active",g.dataset.stab===k)}),document.querySelectorAll(".settings-section[data-panel]").forEach(g=>{g.classList.toggle("active",g.dataset.panel===k)}),localStorage.setItem("melo-settings-tab",k)}document.querySelectorAll(".settings-tab").forEach(k=>{k.addEventListener("click",()=>i(k.dataset.stab))}),i(localStorage.getItem("melo-settings-tab")||"general"),document.querySelectorAll(".switch[data-key]").forEach(k=>{const g=k.dataset.key,v=localStorage.getItem("melo-pref-"+g);v!==null&&k.classList.toggle("on",v==="1"),k.onclick=()=>{k.classList.toggle("on");const C=k.classList.contains("on");localStorage.setItem("melo-pref-"+g,C?"1":"0"),U("melo:pref-changed",{key:g,value:C})}});const a=document.getElementById("setLanguage");a&&(a.value=ui(),a.onchange=async()=>{await He(a.value),t(`Language set to ${a.options[a.selectedIndex].text} — restart Melo to fully apply`)});const e=document.getElementById("swDynamicTheme");if(e){const k=localStorage.getItem("melo-dynamic-theme")!=="0";e.classList.toggle("on",k),e.onclick=()=>{var G,P;const g=!e.classList.contains("on");e.classList.toggle("on",g),localStorage.setItem("melo-dynamic-theme",g?"1":"0");const v=window.__LUMI_QUEUE__,C=(P=(G=window.LumiPlayer)==null?void 0:G.currentIndex)!=null?P:0;v&&v[C]&&Ae(g?v[C].cover:null)}}const n=document.getElementById("skinSelect"),o=document.getElementById("btnSkinThemeToggle"),r=document.getElementById("btnRefreshSkins"),u=document.getElementById("btnOpenSkinsFolder"),c=document.getElementById("skinThemeIcon"),s=document.getElementById("skinThemeLabel");function d(k){c&&(c.textContent=k==="dark"?"🌙":"☀️"),s&&(s.textContent=k==="dark"?"Dark":"Light")}d(Tt),o==null||o.addEventListener("click",()=>{const k=Tt==="dark"?"light":"dark";Ne(k),d(k),t(k==="dark"?"Dark theme":"Light theme")}),nt("melo:theme",k=>{(k==="light"||k==="dark")&&d(k)});async function f(){if(!n)return;const k=localStorage.getItem("melo-active-skin-id")||"default",g=await ze();n.innerHTML=`
      <option value="default">Default Melo (Standard)</option>
      <option value="compact-pill">Minimal Compact (Pill Bar)</option>
    `,g.forEach(v=>{if(v.filename!=="compact-pill-light.html"&&v.filename!=="compact-pill-dark.html"){const C=document.createElement("option");C.value=v.filename,C.textContent=`${v.name} (${v.filename})`,n.appendChild(C)}}),n.value=k}f(),n&&(n.onchange=()=>{const k=n.value;Pt(k,Tt,t)}),r==null||r.addEventListener("click",async()=>{await f();const k=localStorage.getItem("melo-active-skin-id")||"default";Pt(k,Tt,t),t("Skins reloaded from disk")}),u==null||u.addEventListener("click",()=>{Re(t)}),(w=document.getElementById("btn-reset-skin-settings"))==null||w.addEventListener("click",()=>{le(t),n&&(n.value="default")}),(L=document.getElementById("btn-settings-reset"))==null||L.addEventListener("click",()=>{localStorage.clear(),t("Settings reset — reloading..."),setTimeout(()=>location.reload(),600)})}function je(){document.querySelectorAll(".win-btn").forEach(t=>{t.onclick=async()=>{const i=t.getAttribute("aria-label");if(window.__TAURI__){const{getCurrentWindow:a}=await J(async()=>{const{getCurrentWindow:n}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:n}},__vite__mapDeps([8,7,1,0])),e=a();i==="minimize"?e.minimize():i==="maximize"?e.toggleMaximize():i==="close"&&e.close()}else i==="close"&&dt("Window close requires the Tauri desktop build"),i==="maximize"&&dt("Resize: drag corner handle")}})}je();window.__LUMI_REBIND_MAIN__=()=>{je(),Object.entries(Ve).forEach(([t,i])=>{const a=document.getElementById(t);a&&(a.onclick=()=>ce(i))})};const qt=document.createElement("div");qt.id="aboutPop";qt.style.display="none";document.body.appendChild(qt);document.addEventListener("click",t=>{var i,a;(i=t.target)!=null&&i.closest("#btnAbout")&&(t.stopPropagation(),qt.innerHTML=`
    <div class="about-head">Melo <b>0.4.0 Beta</b></div>
    <div style="font-size:11.5px; color:var(--text-soft); margin:6px 0 10px;">
      Modern Windows Music Player<br/>
      Tauri 2 + TypeScript + Rust
    </div>
    <a class="about-link" id="aboutLink" href="https://github.com/Arvanta/Melo" rel="noopener">github.com/Arvanta/Melo ↗</a>`,qt.style.display=qt.style.display==="none"?"block":"none",(a=document.getElementById("aboutLink"))==null||a.addEventListener("click",e=>{e.preventDefault();const n="https://github.com/Arvanta/Melo";ot?J(()=>import("./core-DhEqZVGG.js"),[]).then(o=>o.invoke("open_url",{url:n})).catch(()=>window.open(n,"_blank")):window.open(n,"_blank")}))});document.addEventListener("click",t=>{!t.target.closest("#aboutPop")&&!t.target.closest("#btnAbout")&&(qt.style.display="none")});ot&&rt?rt==="library"||rt==="playlist"?be(wt,dt):rt==="equalizer"?we(wt,dt,{remote:!0}):rt==="lyrics"?ke(wt):rt==="settings"&&(Ee(),Ie(dt)):(li(wt,dt),be(wt,dt),we(wt,dt),ri(wt),ke(wt),ci(dt),Ie(dt),Ee(),setTimeout(async()=>{if(localStorage.getItem("melo-pref-resume")!=="0")try{const t=JSON.parse(localStorage.getItem("melo-resume-state")||"null"),i=window.LumiLibrary,a=window.LumiPlayer;if(!(t!=null&&t.trackId)||!i||!a)return;const e=await i.getTrack(t.trackId);if(!e)return;a.queue=[e],a.loadTrack(0,!1,t.position||0)}catch{}},500));
//# sourceMappingURL=index-VbUvI1Ak.js.map
