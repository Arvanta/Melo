const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/event-CNdo2oXa.js","assets/core-DhEqZVGG.js","assets/index-DiyoAAdc.js","assets/index-CHth0gh2.js","assets/index-Bq0iOnRE.js","assets/index-CS3Qnt9j.js","assets/webviewWindow-mjQkSB26.js","assets/dpi-fvP-W2qr.js","assets/window-BWd3Cypy.js"])))=>i.map(i=>d[i]);
(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))e(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const s of l.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&e(s)}).observe(document,{childList:!0,subtree:!0});function i(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerPolicy&&(l.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?l.credentials="include":n.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function e(n){if(n.ep)return;n.ep=!0;const l=i(n);fetch(n.href,l)}})();const sa="modulepreload",ra=function(t){return"/"+t},we={},Y=function(a,i,e){let n=Promise.resolve();if(i&&i.length>0){let s=function(r){return Promise.all(r.map(u=>Promise.resolve(u).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),p=(d==null?void 0:d.nonce)||(d==null?void 0:d.getAttribute("nonce"));n=s(i.map(r=>{if(r=ra(r),r in we)return;we[r]=!0;const u=r.endsWith(".css"),g=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${g}`))return;const y=document.createElement("link");if(y.rel=u?"stylesheet":sa,u||(y.as="script"),y.crossOrigin="",y.href=r,p&&y.setAttribute("nonce",p),document.head.appendChild(y),u)return new Promise((S,k)=>{y.addEventListener("load",S),y.addEventListener("error",()=>k(new Error(`Unable to preload CSS for ${r}`)))})}))}function l(s){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=s,window.dispatchEvent(d),!d.defaultPrevented)throw s}return n.then(s=>{for(const d of s||[])d.status==="rejected"&&l(d.reason);return a().catch(l)})},it=typeof window.__TAURI_INTERNALS__<"u"||typeof window.__TAURI__<"u";async function D(t,a){if(it)try{const{emit:i}=await Y(async()=>{const{emit:e}=await import("./event-CNdo2oXa.js");return{emit:e}},__vite__mapDeps([0,1]));await i(t,a);return}catch{}window.dispatchEvent(new CustomEvent(t,{detail:a}))}function at(t,a){it&&Y(async()=>{const{listen:i}=await import("./event-CNdo2oXa.js");return{listen:i}},__vite__mapDeps([0,1])).then(({listen:i})=>{i(t,e=>{a(e.payload)})}).catch(()=>{}),window.addEventListener(t,i=>a(i.detail))}let ke=!1;async function ca(){if(!ke){ke=!0;try{const t=globalThis;if(typeof t.Buffer>"u"){const a=await Y(()=>import("./index-DiyoAAdc.js").then(i=>i.i),__vite__mapDeps([2,3]));t.Buffer=a.Buffer}typeof t.process>"u"&&(t.process={env:{},browser:!0,nextTick:a=>setTimeout(a,0)})}catch{}}}async function da(t,a){var i;try{await ca();const e=await Y(()=>import("./index-Bq0iOnRE.js").then(r=>r.i),__vite__mapDeps([4,3])),n=e&&typeof e.parseBlob=="function"?e:e.default||e,l=await Promise.race([n.parseBlob(t),new Promise((r,u)=>setTimeout(()=>u(new Error("timeout")),1800))]),s=l==null?void 0:l.common;if(!s)return;s.title&&(a.title=s.title),s.artist?a.artist=s.artist:s.artists&&s.artists[0]&&(a.artist=s.artists[0]),s.album&&(a.album=s.album),s.genre&&s.genre[0]&&(a.genre=s.genre[0]),s.year&&(a.year=s.year);const d=(i=s.picture)==null?void 0:i[0];if(d&&d.data){const r=d.format||"image/jpeg",u=d.data;if(u.length>6e5)return;let g="";const y=8192;for(let S=0;S<u.length;S+=y){const k=u.subarray(S,S+y);g+=String.fromCharCode.apply(null,k)}a.cover=`data:${r};base64,${btoa(g)}`}const p=l==null?void 0:l.format;p&&p.duration&&!a.duration&&(a.duration=Math.floor(p.duration))}catch{}}async function Be(t,a,i=1800){return await da(t,a),a}async function ua(t){return new Promise(a=>{if(!t)return a(null);const i=new Image;i.crossOrigin="anonymous",i.onload=()=>{try{const e=document.createElement("canvas"),n=e.getContext("2d");if(!n)return a(null);e.width=40,e.height=40,n.drawImage(i,0,0,40,40);const l=n.getImageData(0,0,40,40).data;let s={r:42,g:123,b:214},d=-1;for(let p=0;p<l.length;p+=4){const r=l[p],u=l[p+1],g=l[p+2];if(l[p+3]<128)continue;const S=Math.max(r,u,g),k=Math.min(r,u,g),h=(S+k)/510,z=S-k,P=z===0?0:z/(1-Math.abs(2*h-1));if(P>.25&&h>.25&&h<.82){const x=P*1.5+(1-Math.abs(h-.5));x>d&&(d=x,s={r,g:u,b:g})}}d>0?a(s):a(null)}catch{a(null)}},i.onerror=()=>a(null),i.src=t})}async function Pe(t){const a=localStorage.getItem("melo-dynamic-theme")!=="0",i=document.documentElement;if(!a||!t){i.style.removeProperty("--accent"),i.style.removeProperty("--visualizer"),i.style.removeProperty("--accent-glow");return}const e=await ua(t);if(e){const n=`rgb(${e.r}, ${e.g}, ${e.b})`;i.style.setProperty("--accent",n),i.style.setProperty("--visualizer",n),i.style.setProperty("--accent-glow",`rgba(${e.r}, ${e.g}, ${e.b}, 0.35)`)}else i.style.removeProperty("--accent"),i.style.removeProperty("--visualizer"),i.style.removeProperty("--accent-glow")}const Gt=[31,62,125,250,500,1e3,2e3,4e3,8e3,16e3];let St=null,oe=null,se=[],Ft=null,Ut=null;function Qt(t){if(!St){const a=window.AudioContext||window.webkitAudioContext;St=new a;try{oe=St.createMediaElementSource(t)}catch{}if(se=Gt.map(i=>{const e=St.createBiquadFilter();return e.type="peaking",e.frequency.value=i,e.Q.value=1.4,e.gain.value=0,e}),Ft=St.createGain(),Ft.gain.value=1,Ut=St.createAnalyser(),Ut.fftSize=2048,Ut.smoothingTimeConstant=.72,oe){let i=oe;for(const e of se)i.connect(e),i=e;i.connect(Ft),Ft.connect(Ut),Ut.connect(St.destination)}}return{ctx:St,filters:se,gain:Ft,analyser:Ut,async resume(){St&&St.state==="suspended"&&await St.resume().catch(()=>{})}}}function pa(t,a){let i,e,n,l,s,d,p,r=null,u,g,y,S,k,h,z,P,x,et,nt,E,m,v=[],M=0,J=!1,Z="off",pt=!1;function K(){if(!v.length)return null;if(Z==="one")return M;let o=M+1;if(J&&(o=Math.floor(Math.random()*v.length),o===M&&v.length>1&&(o=(o+1)%v.length)),o>=v.length)if(Z==="all")o=0;else return null;return o}window.__LUMI_QUEUE__=v,window.__LUMI_SET_QUEUE__=o=>{v=o,window.__LUMI_QUEUE__=o};function N(o){if(!isFinite(o))return"0:00";const I=Math.floor(o/60),V=Math.floor(o%60).toString().padStart(2,"0");return`${I}:${V}`}function j(){if(!u)return;const o=parseFloat(u.max)||100,I=parseFloat(u.value)||0,V=o>0?I/o*100:0;u.style.setProperty("--progress",V+"%")}function dt(){g&&g.style.setProperty("--vol",g.value+"%")}function bt(){h&&(h.classList.toggle("muted",t.muted),h.title=t.muted?"Unmute":"Mute")}function kt(o=!0){t.muted=!t.muted,bt(),o&&a(t.muted?"Muted":"Unmuted")}async function xt(o){if(!o)return"";if(/^(https?|data|blob):/.test(o))return o;if(it)try{const{convertFileSrc:I}=await Y(async()=>{const{convertFileSrc:V}=await import("./core-DhEqZVGG.js");return{convertFileSrc:V}},[]);return I(o)}catch{}return o}async function wt(o,I=!0,V){if(!v.length)return;o<0&&(o=v.length-1),o>=v.length&&(o=0),M=o;const O=v[o];if(O){if(z||G(),t.src=await xt(O.path),t.load(),V&&V>0){const X=()=>{t.removeEventListener("loadedmetadata",X);try{t.currentTime=V}catch{}};t.addEventListener("loadedmetadata",X)}z&&(z.textContent=O.title||"Unknown Title"),P&&(P.textContent=O.artist||"Unknown Artist"),x&&(x.textContent=O.album||""),et&&(et.textContent=O.codec||"AUDIO"),nt&&(nt.textContent=O.specs||""),O.cover&&E?(E.src=O.cover,E.style.display="block",m&&(m.style.display="none")):(E&&(E.style.display="none"),m&&(m.style.display="grid")),u&&(u.max=String(O.duration||240),u.value="0",j()),S&&(S.textContent=N(O.duration)),y&&(y.textContent="0:00"),C(),Pe(O.cover||null),document.querySelectorAll(".track-row").forEach((X,gt)=>{var Bt;X.classList.toggle("active",((Bt=v[gt])==null?void 0:Bt.id)===O.id)}),"mediaSession"in navigator&&(navigator.mediaSession.metadata=new MediaMetadata({title:O.title,artist:O.artist,album:O.album,artwork:O.cover?[{src:O.cover,sizes:"512x512",type:"image/jpeg"}]:[]}),navigator.mediaSession.setActionHandler("play",()=>f()),navigator.mediaSession.setActionHandler("pause",()=>b()),navigator.mediaSession.setActionHandler("previoustrack",()=>W()),navigator.mediaSession.setActionHandler("nexttrack",()=>T()),navigator.mediaSession.setActionHandler("seekto",X=>{X.seekTime&&(t.currentTime=X.seekTime)})),I&&f();try{const{cover:X,...gt}=O;localStorage.setItem("melo-current-track",JSON.stringify(gt))}catch{}window.dispatchEvent(new CustomEvent("lumi:trackChange",{detail:O})),D("melo:track-changed",O),D("melo:playback-state",{track:O,currentTime:t.currentTime||0,paused:t.paused})}}let Mt=!1;async function Ct(){try{await Qt(t).resume()}catch{}Mt&&(Mt=!1,t.play().then(()=>{e&&(e.style.display="none"),n&&(n.style.display="block")}).catch(()=>{}))}window.addEventListener("pointerdown",Ct),window.addEventListener("keydown",Ct),at("melo:pref-changed",o=>{o&&o.key==="replayGainGlobal"&&C(),o&&o.key==="showStopBtn"&&R(!!o.value)}),at("melo:request-playback-state",()=>{const o=v[M]||null;D("melo:playback-state",{track:o,currentTime:t.currentTime||0,paused:t.paused})}),at("melo:seek-playback",o=>{const I=Number(o);Number.isFinite(I)&&I>=0&&(t.currentTime=I)});let st=null,mt=!1;const It=500;function rt(o,I,V){st&&cancelAnimationFrame(st);const O=t.volume,X=performance.now(),gt=Bt=>{const Ot=Math.min(1,(Bt-X)/I);t.volume=O+(o-O)*Ot,Ot<1?st=requestAnimationFrame(gt):(st=null,V==null||V())};st=requestAnimationFrame(gt)}async function f(){try{await Qt(t).resume()}catch{}const o=localStorage.getItem("melo-pref-fadePause")!=="0",I=$();o&&mt&&(t.volume=0),t.play().then(()=>{Mt=!1,e&&(e.style.display="none"),n&&(n.style.display="block"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="playing"),o&&mt?(mt=!1,rt(I,It)):t.volume=I}).catch(()=>{Mt||(Mt=!0,a("Click once inside player to begin audio playback"))})}function b(){localStorage.getItem("melo-pref-fadePause")!=="0"&&!t.paused?(mt=!0,rt(0,It,()=>t.pause())):(mt=!1,t.pause()),e&&(e.style.display="block"),n&&(n.style.display="none"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused");const I=v[M];if(I)try{localStorage.setItem("melo-resume-state",JSON.stringify({trackId:I.id,position:t.currentTime}))}catch{}}function _(){t.paused?f():b()}function L(){t.pause();try{t.currentTime=0}catch{}e&&(e.style.display="block"),n&&(n.style.display="none"),u&&(u.value="0",j()),y&&(y.textContent="0:00"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}function T(){if(!v.length)return;if(Z==="one"){t.currentTime=0,f();return}const o=K();if(o===null){b();return}wt(o)}function W(){if(!v.length)return;if(t.currentTime>3){t.currentTime=0;return}let o=M-1;J&&(o=Math.floor(Math.random()*v.length)),o<0&&(Z==="all"?o=v.length-1:o=0),wt(o)}function $(){var gt;const o=v[M];if(!g)return 1;const I=parseInt(g.value,10)/100,O=localStorage.getItem("melo-pref-replayGainGlobal")!=="0"&&(gt=o==null?void 0:o.replayGain)!=null?gt:0,X=Math.pow(10,O/20);return Math.min(1,Math.max(0,I*X))}function C(){!v[M]||!g||(t.volume=$())}function R(o=localStorage.getItem("melo-pref-showStopBtn")==="1"){const I=document.getElementById("btnStop");I&&I.style.setProperty("display",o?"inline-flex":"none","important")}function G(){if(i=document.getElementById("btnPlay"),e=document.getElementById("iconPlay"),n=document.getElementById("iconPause"),l=document.getElementById("btnPrev"),s=document.getElementById("btnNext"),d=document.getElementById("btnShuffle"),p=document.getElementById("btnRepeat"),r=document.getElementById("btnStop"),R(),u=document.getElementById("seekBar"),g=document.getElementById("volBar"),y=document.getElementById("curTime"),S=document.getElementById("durTime"),k=document.getElementById("volPct"),h=document.getElementById("volIcon"),h&&(h.onclick=()=>kt()),bt(),z=document.getElementById("trackTitle"),P=document.getElementById("trackArtist"),x=document.getElementById("trackAlbum"),et=document.getElementById("trackCodec"),nt=document.getElementById("trackSpecs"),E=document.getElementById("coverImg"),m=document.getElementById("coverFallback"),i&&(i.onclick=_),r&&(r.onclick=L),l&&(l.onclick=W),s&&(s.onclick=T),d&&(d.onclick=()=>{J=!J,d.classList.toggle("active",J),a(J?"Shuffle on":"Shuffle off")}),p&&(p.onclick=()=>{Z=Z==="off"?"all":Z==="all"?"one":"off",p.classList.toggle("active",Z!=="off");const o={off:"Repeat off",all:"Repeat all",one:"Repeat one"};a(o[Z]),p.title=o[Z]}),u&&(u.oninput=()=>{pt=!0,y&&(y.textContent=N(parseFloat(u.value))),j()},u.onchange=()=>{t.currentTime=parseFloat(u.value),pt=!1}),g&&(g.oninput=()=>{dt(),k&&(k.textContent=g.value+"%"),C()}),j(),dt(),v[M]){const o=v[M];if(z&&(z.textContent=o.title||"Unknown Title"),P&&(P.textContent=o.artist||"Unknown Artist"),x&&(x.textContent=o.album||""),et&&(et.textContent=o.codec||"AUDIO"),nt&&(nt.textContent=o.specs||""),o.cover&&E?(E.src=o.cover,E.style.display="block",m&&(m.style.display="none")):(E&&(E.style.display="none"),m&&(m.style.display="grid")),u){const I=Math.floor(t.duration||o.duration||240);u.max=String(I),u.value=String(Math.floor(t.currentTime||0)),j()}if(S&&(S.textContent=N(t.duration||o.duration)),y&&(y.textContent=N(t.currentTime||0)),g&&k&&(k.textContent=g.value+"%",dt()),e&&n){const I=!t.paused;e.style.display=I?"none":"block",n.style.display=I?"block":"none"}d&&d.classList.toggle("active",J),p&&p.classList.toggle("active",Z!=="off")}}G(),document.addEventListener("wheel",o=>{const I=o.target;if(!(I!=null&&I.closest("#playerCard"))||!g)return;o.preventDefault();const V=o.deltaY<0?5:-5;g.value=String(Math.max(0,Math.min(100,Number(g.value)+V))),g.dispatchEvent(new Event("input"))},{passive:!1}),t.addEventListener("timeupdate",()=>{D("melo:playback-position",t.currentTime||0),!pt&&u&&y&&(u.value=String(Math.floor(t.currentTime)),y.textContent=N(t.currentTime),j()),F()});let A=null;function F(){A||(A=setTimeout(()=>{A=null;const o=v[M];if(!(!o||t.paused))try{localStorage.setItem("melo-resume-state",JSON.stringify({trackId:o.id,position:t.currentTime}))}catch{}},4e3))}t.addEventListener("loadedmetadata",()=>{var I;if(!u||!S)return;const o=Math.floor(t.duration||((I=v[M])==null?void 0:I.duration)||240);u.max=String(o),S.textContent=N(o),j()}),t.addEventListener("ended",()=>{T()}),window.addEventListener("keydown",o=>{o.target.tagName!=="INPUT"&&(o.code==="Space"&&(o.preventDefault(),_()),o.code==="ArrowRight"&&(t.currentTime+=5),o.code==="ArrowLeft"&&(t.currentTime-=5),(o.key==="m"||o.key==="M")&&kt(),(o.key==="s"||o.key==="S")&&d&&d.click(),(o.key==="r"||o.key==="R")&&p&&p.click(),o.code==="ArrowUp"&&g&&(g.value=String(Math.min(100,parseInt(g.value,10)+5)),g.dispatchEvent(new Event("input"))),o.code==="ArrowDown"&&g&&(g.value=String(Math.max(0,parseInt(g.value,10)-5)),g.dispatchEvent(new Event("input"))))}),at("melo:tray-action",o=>{o==="play_pause"?_():o==="next"?T():o==="prev"?W():o==="mute"&&kt()}),window.LumiPlayer={get queue(){return v},set queue(o){v=o,window.__LUMI_QUEUE__=o},get currentIndex(){return M},loadTrack:wt,play:f,pause:b,stop:L,next:T,prev:W,get audio(){return t},rebind:G},window.__LUMI_REBIND__=G,at("melo:play-tracks",o=>{if(!o||!Array.isArray(o.tracks)||!o.tracks.length)return;v=o.tracks,window.__LUMI_SET_QUEUE__(v);const I=Math.max(0,Math.min(o.index||0,v.length-1));wt(I,!0)})}const re=new URLSearchParams(location.search).get("panel")||"main",Q=t=>String(t!=null?t:"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");function xe(t){const a=Number.isFinite(t)?Math.max(0,t):0;return`${Math.floor(a/60)}:${String(Math.floor(a%60)).padStart(2,"0")}`}function Se(t,a){const i=document.getElementById("trackList"),e=document.getElementById("libraryStats"),n=document.getElementById("searchInput"),l=document.getElementById("searchClear"),s=document.getElementById("libraryTabs"),d=document.getElementById("btn-scan"),p=document.getElementById("btn-clear-library"),r=document.getElementById("winPlaylistTracks"),u=document.getElementById("winPlaylistEmpty"),g=document.getElementById("playlistSelect"),y=document.getElementById("playlistSearchInput"),S=document.getElementById("playlistSearchClear"),k=document.getElementById("playlistSortSelect"),h=document.getElementById("btn-clear-playlist"),z=document.getElementById("btn-export-playlist"),P=document.getElementById("btn-new-playlist");let x=null,et=null,nt=!1,E=localStorage.getItem("melo-currentPlaylist")||"p1",m=[],v=null,M=null,J=!1,Z=[];const pt=new Map;let K="artists",N=null,j=null,dt=null,bt="",kt=null;const xt=54,wt=52;let Mt=0,Ct=0,st=0,mt=0,It=null;const rt=document.createElement("div");rt.className="ctx-menu",rt.style.display="none",rt.innerHTML='<button class="ctx-item danger" id="ctxRemoveLibraryTrack">Remove from Library</button>',document.body.appendChild(rt),document.addEventListener("click",c=>{c.target.closest("#ctxRemoveLibraryTrack")||(rt.style.display="none")}),rt.querySelector("#ctxRemoveLibraryTrack").onclick=async c=>{c.stopPropagation(),!(!x||!It)&&(await x("delete_tracks",{ids:[It]}),rt.style.display="none",It=null,D("melo:library-changed",{removed:1}))};function f(){return new Promise(c=>{const w=document.createElement("div");w.className="confirm-overlay",w.innerHTML=`<div class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="clearLibraryTitle">
        <div id="clearLibraryTitle" class="confirm-title">Clear Library?</div>
        <div class="confirm-message">All tracks will be removed from Library browsing. Your playlists and their tracks will remain unchanged.</div>
        <div class="confirm-actions"><button class="btn small" data-confirm="cancel">Cancel</button><button class="btn small danger-confirm" data-confirm="yes">Clear Library</button></div>
      </div>`,document.body.appendChild(w);const q=H=>{document.removeEventListener("keydown",U),w.remove(),c(H)};w.querySelector("[data-confirm='cancel']").onclick=()=>q(!1),w.querySelector("[data-confirm='yes']").onclick=()=>q(!0),w.onclick=H=>{H.target===w&&q(!1)};const U=H=>{H.key==="Escape"&&(document.removeEventListener("keydown",U),q(!1))};document.addEventListener("keydown",U)})}function b(c){const w=d==null?void 0:d.querySelector(".scan-label");w&&(w.textContent=c)}function _(){l==null||l.classList.toggle("show",!!(n!=null&&n.value))}function L(){S==null||S.classList.toggle("show",!!(y!=null&&y.value))}function T(){r==null||r.querySelectorAll("[data-pl-track]").forEach(c=>{c.classList.toggle("active",c.dataset.plTrack===kt)})}function W(c){kt=c,T()}function $(c){if(!c)return"";if(/^(data:|blob:|https?:)/i.test(c))return c;try{return et?et(c):""}catch{return""}}function C(c){return{...c,cover:$(c.cover),source:"scan"}}const R=[],G=new Set;let A=0;function F(c,w){!c||!x||G.has(c)||(G.add(c),R.push({id:c,element:w}),o())}function o(){for(;x&&A<2&&R.length;){const c=R.shift();A++,x("ensure_track_artwork",{id:c.id}).then(w=>{if(!w||!c.element.isConnected)return;const q=$(w),U=Z.find(H=>H.id===c.id);U&&(U.cover=q),c.element.style.backgroundImage=`url("${q.replace(/"/g,"%22")}")`,c.element.textContent=""}).catch(()=>{}).finally(()=>{A--,G.delete(c.id),o()})}}function I(c){const w=[...c.querySelectorAll("[data-artwork-id]")];if(!("IntersectionObserver"in window)){w.forEach(U=>F(U.dataset.artworkId,U));return}const q=new IntersectionObserver(U=>{U.forEach(H=>{if(!H.isIntersecting)return;const B=H.target;q.unobserve(B),F(B.dataset.artworkId,B)})},{root:c,rootMargin:"120px"});w.forEach(U=>q.observe(U))}async function V(){if(nt)return;if(!it){nt=!0,O();return}const c=await Y(()=>import("./core-DhEqZVGG.js"),[]);x=c.invoke,et=c.convertFileSrc,nt=!0,await Promise.all([X(),Pt()]),await ft(!0),await ht(!0)}function O(){i&&(i.innerHTML='<div style="padding:30px;text-align:center;color:var(--text-muted)">The persistent Library is available in the Tauri desktop build.</div>')}async function X(){if(!(!x||!e))try{const c=await x("library_stats");e.textContent=`${c.tracks} tracks • ${c.artists} artists • ${c.albums} albums`}catch{}}function gt(){N=j=dt=null,i&&(i.scrollTop=0)}function Bt(){return K==="artists"?N?"tracks":"groups":K==="albums"?j?"tracks":"groups":dt?"tracks":"groups"}function Ot(){return K}function Je(){return K==="artists"&&N?j?`${N} › ${j}`:N:K==="albums"&&j?j:K==="genres"&&dt?dt:""}async function Xe(c,w){if(!x)return{items:[],total:0,limit:w,offset:c};if(Bt()==="groups")return x("library_groups",{kind:Ot(),search:bt||null,artist:K==="artists"?N:null,limit:w,offset:c});const q=await x("library_tracks",{search:bt||null,artist:N,album:j,genre:dt,sort:"title-asc",limit:w,offset:c});return q.items=q.items.map(C),Z=q.items,q}async function Ze(c){const w=pt.get(c);if(w)return w;if(!x)return[];const q=await x("library_groups",{kind:"albums",search:null,artist:c,limit:500,offset:0});return pt.set(c,q.items),q.items}async function ft(c=!1){if(!i||!x)return;c&&(i.scrollTop=0),i.style.display="block",i.style.position="relative",i.style.overflowY="auto";const w=Math.max(300,i.clientHeight||420),q=K==="artists"&&!!N,U=Je(),H=q?84:U?38:0,B=Math.ceil(w/xt),vt=Math.max(0,i.scrollTop-H),tt=Math.max(0,Math.floor(vt/xt)-8),ct=Math.max(40,B+16),ea=++Mt;try{const ve=q&&N?Ze(N):Promise.resolve(null),[Xt,le]=await Promise.all([Xe(tt,ct),ve]);if(ea!==Mt)return;const aa=Xt.total*xt+H,ia=Xt.items.map((zt,Vt)=>{const Wt=Xt.offset+Vt,Zt=H+Wt*xt;if(Bt()==="groups"){const Ht=zt,ye=$(Ht.cover),be=`lib-avatar ${Ot()==="albums"?"lib-avatar-album":""}`,la=Ot()==="albums"?"💿":Q((Ht.name[0]||"?").toUpperCase()),oa=ye?`<div class="${be}" style="background-image:url('${Q(ye)}')"></div>`:`<div class="${be}" data-artwork-id="${Q(Ht.artworkTrackId||"")}">${la}</div>`;return`<div class="lib-item virtual-row" data-group-index="${Vt}" style="position:absolute;left:0;right:0;top:${Zt}px;height:${xt}px">${oa}<div style="flex:1;min-width:0"><div class="t-title">${Q(Ht.name)}</div><div class="t-artist">${Q(Ht.subtitle||`${Ht.count} tracks`)}</div></div><span class="chev-r">›</span></div>`}const Tt=zt;return`<div class="track-row virtual-row" data-track-id="${Q(Tt.id)}" data-page-index="${Vt}" style="position:absolute;left:0;right:0;top:${Zt}px;height:${xt}px">
          <span class="num">${Wt+1}</span>
          ${Tt.cover?`<div class="track-cover-mini" style="background-image:url('${Q(Tt.cover)}');background-size:cover;background-position:center"></div>`:`<div class="track-cover-mini cover-default" data-artwork-id="${Q(Tt.id)}">♪</div>`}
          <div style="flex:1;min-width:0"><div class="t-title">${Q(Tt.title)}</div><div class="t-artist">${Q(Tt.artist)} • ${Q(Tt.album)}</div></div>
          <span class="t-dur">${xe(Tt.duration)}</span>
          <button class="btn small ghost" data-add-track="${Q(Tt.id)}" title="Add to current playlist">+</button>
        </div>`}).join(""),na=q&&le?`<div class="artist-detail-header" style="position:sticky;top:0;height:${H}px;z-index:4;background:var(--card)">
            <div class="lib-crumb" style="height:38px"><button class="btn small" id="virtualBack">‹ Artists</button><b>${Q(N)}</b></div>
            <div class="chip-row artist-album-chips custom-scrollbar" style="height:46px;padding-top:6px;padding-bottom:6px">
              <button class="chip ${j===null?"active":""}" data-artist-album="all">All Tracks</button>
              ${le.map((zt,Vt)=>{const Wt=$(zt.cover),Zt=Wt?`<span class="chip-thumb" style="background-image:url('${Q(Wt)}')"></span>`:`<span class="chip-thumb cover-default" data-artwork-id="${Q(zt.artworkTrackId||"")}">♪</span>`;return`<button class="chip ${j===zt.name?"active":""}" data-artist-album-index="${Vt}">${Zt}${Q(zt.name)}</button>`}).join("")}
            </div>
          </div>`:U?`<div class="lib-crumb virtual-crumb" style="position:sticky;top:0;height:${H}px;z-index:3;background:var(--card)"><button class="btn small" id="virtualBack">‹ Back</button><b>${Q(U)}</b></div>`:"";i.innerHTML=`<div class="virtual-list-space" style="position:relative;height:${Math.max(aa,w)}px">${na}${ia}</div>`,Ke(Xt.items,le||[]),I(i)}catch{i.innerHTML='<div style="padding:24px;text-align:center;color:var(--text-muted)">Could not read the Library database.</div>'}}function Ke(c,w=[]){var q,U;i&&(i.querySelectorAll("[data-group-index]").forEach(H=>{H.onclick=()=>{const B=c[Number(H.dataset.groupIndex||0)],vt=(B==null?void 0:B.name)||"",tt=(B==null?void 0:B.key)||vt;if(K==="artists"&&!N)N=vt;else if(K==="artists"&&N||K==="albums"){const ct=tt.split("\0");K==="albums"&&(N=ct[0]||null),j=ct[1]||vt}else K==="genres"&&(dt=vt);ft(!0)}}),i.querySelectorAll("[data-add-track]").forEach(H=>{H.onclick=async B=>{B.stopPropagation(),!(!x||!H.dataset.addTrack)&&(await x("add_tracks_to_playlist",{playlistId:E,trackIds:[H.dataset.addTrack]}),D("melo:playlist-changed",{playlistId:E}))}}),i.querySelectorAll("[data-track-id]").forEach(H=>{H.onclick=async B=>{if(B.target.closest("[data-add-track]"))return;const vt=Number(H.dataset.pageIndex||0),tt=c.filter(ct=>"path"in ct).map(C);x&&tt.length&&(await x("replace_playlist_tracks",{playlistId:E,trackIds:tt.map(ct=>ct.id)}),D("melo:playlist-changed",{playlistId:E})),D("melo:play-tracks",{tracks:tt,index:vt})},H.oncontextmenu=B=>{B.preventDefault(),B.stopPropagation(),It=H.dataset.trackId||null,rt.style.display="block";const vt=rt.getBoundingClientRect();rt.style.left=`${Math.max(6,Math.min(B.clientX,window.innerWidth-vt.width-6))}px`,rt.style.top=`${Math.max(6,Math.min(B.clientY,window.innerHeight-vt.height-6))}px`}}),(q=i.querySelector("#virtualBack"))==null||q.addEventListener("click",()=>{K==="artists"&&N?(N=null,j=null):j?j=null:N?N=null:dt=null,ft(!0)}),(U=i.querySelector("[data-artist-album='all']"))==null||U.addEventListener("click",()=>{j=null,ft(!0)}),i.querySelectorAll("[data-artist-album-index]").forEach(H=>{H.onclick=()=>{const B=w[Number(H.dataset.artistAlbumIndex||0)];j=(B==null?void 0:B.name)||null,ft(!0)}}))}async function Pt(){var c;x&&(m=await x("list_playlists"),m.some(w=>w.id===E)||(E=((c=m[0])==null?void 0:c.id)||"p1"),localStorage.setItem("melo-currentPlaylist",E),g&&(g.innerHTML=m.map(w=>`<option value="${Q(w.id)}" ${w.id===E?"selected":""}>${Q(w.name)} (${w.trackCount})</option>`).join("")))}async function ht(c=!1){if(!r||!x)return;c&&(r.scrollTop=0),r.style.display="block",r.style.position="relative",r.style.overflowY="auto";const w=Math.max(260,r.clientHeight||420),q=Math.max(0,Math.floor(r.scrollTop/wt)-8),U=Math.max(40,Math.ceil(w/wt)+16),H=++Ct,B=await x("playlist_tracks",{playlistId:E,search:(y==null?void 0:y.value)||null,sort:(k==null?void 0:k.value)||"default",limit:U,offset:q});if(H!==Ct)return;if(B.items=B.items.map(C),Z=B.items,u&&(u.style.display=B.total?"none":"block"),r.style.display=B.total?"block":"none",!B.total){r.innerHTML="";return}const vt=B.items.map((tt,ct)=>`<div class="track-row virtual-row ${tt.id===kt?"active":""}" data-pl-track="${Q(tt.id)}" data-page-index="${ct}" style="position:absolute;left:0;right:0;top:${(B.offset+ct)*wt}px;height:${wt}px"><span class="num">${B.offset+ct+1}</span>${tt.cover?`<div class="track-cover-mini" style="background-image:url('${Q(tt.cover)}');background-size:cover;background-position:center"></div>`:`<div class="track-cover-mini cover-default" data-artwork-id="${Q(tt.id)}">♪</div>`}<div style="flex:1;min-width:0"><div class="t-title">${Q(tt.title)}</div><div class="t-artist">${Q(tt.artist)} • ${Q(tt.album)}</div></div><span class="t-dur">${xe(tt.duration)}</span><button class="btn small ghost" data-remove-track="${Q(tt.id)}">×</button></div>`).join("");r.innerHTML=`<div style="position:relative;height:${Math.max(w,B.total*wt)}px">${vt}</div>`,I(r),r.querySelectorAll("[data-pl-track]").forEach(tt=>{tt.onclick=ct=>{ct.target.closest("[data-remove-track]")||D("melo:play-tracks",{tracks:B.items,index:Number(tt.dataset.pageIndex||0)})}}),r.querySelectorAll("[data-remove-track]").forEach(tt=>{tt.onclick=async ct=>{ct.stopPropagation(),await x("remove_track_from_playlist",{playlistId:E,trackId:tt.dataset.removeTrack}),D("melo:playlist-changed",{playlistId:E})}})}async function fe(c,w){return x?x(c,w):null}async function ge(c,w="replace"){if(await V(),!x||!c.length)return[];const U=(await x("import_audio_files",{paths:c,playlistId:w==="none"?null:E,replacePlaylist:w==="replace"})).map(C);return await Promise.all([X(),Pt(),ft(),ht()]),D("melo:library-changed",{imported:U.length}),U}async function ne(c,w=!1){if(await V(),!x)return null;if(v)return v;const q=await x("start_library_scan",{path:c});return v=q.scanId,M=q.scanId,J=w,d&&b("Cancel Scan"),v}async function Qe(){if(!it)return;if(v&&x){await x("cancel_library_scan",{scanId:v});return}const{open:c}=await Y(async()=>{const{open:q}=await import("./index-CS3Qnt9j.js");return{open:q}},__vite__mapDeps([5,1])),w=await c({directory:!0,multiple:!1});w&&await ne(w)}async function ta(c){if(await V(),!x)return null;const w=await x("get_track_by_id",{id:c});return w?C(w):null}s==null||s.querySelectorAll("[data-libtab]").forEach(c=>{c.onclick=()=>{s.querySelectorAll("[data-libtab]").forEach(w=>w.classList.remove("active")),c.classList.add("active"),K=c.dataset.libtab||"artists",gt(),ft(!0)}}),n==null||n.addEventListener("input",()=>{_(),bt=n.value.trim(),window.clearTimeout(st),st=window.setTimeout(()=>ft(!0),180)}),l==null||l.addEventListener("click",()=>{n&&(n.value="",n.focus(),_(),bt="",window.clearTimeout(st),ft(!0))}),i==null||i.addEventListener("scroll",()=>{window.clearTimeout(st),st=window.setTimeout(()=>ft(),60)}),r==null||r.addEventListener("scroll",()=>{window.clearTimeout(mt),mt=window.setTimeout(()=>ht(),60)}),y==null||y.addEventListener("input",()=>{L(),window.clearTimeout(mt),mt=window.setTimeout(()=>ht(!0),180)}),S==null||S.addEventListener("click",()=>{y&&(y.value="",y.focus(),L(),window.clearTimeout(mt),ht(!0))}),k==null||k.addEventListener("change",()=>ht(!0)),g==null||g.addEventListener("change",()=>{E=g.value,localStorage.setItem("melo-currentPlaylist",E),ht(!0)}),d==null||d.addEventListener("click",Qe),p==null||p.addEventListener("click",async()=>{if(x){if(v){alert("Cancel the active scan before clearing the Library database.");return}await f()&&(await x("clear_library_database"),Z=[],pt.clear(),await Promise.all([X(),Pt(),ft(!0),ht(!0)]),D("melo:library-changed",{cleared:!0}))}}),h==null||h.addEventListener("click",async()=>{await fe("clear_playlist",{playlistId:E}),await Promise.all([Pt(),ht(!0)]),D("melo:playlist-changed",{playlistId:E})}),P==null||P.addEventListener("click",async()=>{var q;const c=(q=prompt("New playlist name:"))==null?void 0:q.trim();if(!c)return;const w=await fe("create_playlist",{name:c});w&&(E=w.id),await Promise.all([Pt(),ht(!0)])}),z==null||z.addEventListener("click",async()=>{var H;if(!x)return;const c=[];let w=0;for(;;){const B=await x("playlist_tracks",{playlistId:E,search:null,sort:"default",limit:500,offset:w});if(c.push(...B.items),w+=B.items.length,w>=B.total||!B.items.length)break}if(!c.length)return;const q=`#EXTM3U
`+c.map(B=>`#EXTINF:${Math.floor(B.duration)},${B.artist} - ${B.title}
${B.path}`).join(`
`),U=document.createElement("a");U.href=URL.createObjectURL(new Blob([q],{type:"audio/x-mpegurl"})),U.download=`${((H=m.find(B=>B.id===E))==null?void 0:H.name)||"playlist"}.m3u`,U.click(),setTimeout(()=>URL.revokeObjectURL(U.href),1e3)}),it&&Y(async()=>{const{getCurrentWebviewWindow:c}=await import("./webviewWindow-mjQkSB26.js");return{getCurrentWebviewWindow:c}},__vite__mapDeps([6,7,1,0,8])).then(({getCurrentWebviewWindow:c})=>{c().onDragDropEvent(async w=>{if(w.payload.type!=="drop")return;const q=w.payload.paths||[];if(!q.length)return;const U=await ge(q,re==="playlist"?"append":"replace");if(U.length)re!=="playlist"&&D("melo:play-tracks",{tracks:U,index:0});else for(const H of q)try{await ne(H,re!=="playlist")}catch{}})}).catch(()=>{}),at("melo:scan-progress",async c=>{if(c){if(c.scanId&&(v=c.scanId),d&&!c.finished&&b(`Cancel ${c.done||0}/${c.total||"…"}`),d){const w=c.total?Math.max(0,Math.min(100,Number(c.done||0)/Number(c.total)*100)):0;d.style.setProperty("--scan-progress",`${w}%`),d.classList.toggle("scanning",!c.finished)}if(c.finished){if(c.scanId===M&&J&&!c.cancelled&&x){await x("replace_playlist_from_scan",{playlistId:E,scanId:c.scanId});const U=(await x("playlist_tracks",{playlistId:E,search:null,sort:"default",limit:100,offset:0})).items.map(C);U.length&&D("melo:play-tracks",{tracks:U,index:0}),D("melo:playlist-changed",{playlistId:E})}v=null,M=null,J=!1,d&&(b("Scan"),d.classList.remove("scanning"),d.style.setProperty("--scan-progress","0%")),await Promise.all([X(),Pt(),ft(),ht()])}}});let he=0;at("melo:library-changed",()=>{pt.clear(),window.clearTimeout(he),he=window.setTimeout(()=>{X(),ft(),ht()},500)}),at("melo:playlist-changed",()=>{Pt(),ht()}),at("melo:track-changed",c=>W((c==null?void 0:c.id)||null)),at("melo:playback-state",c=>{var w;return W(((w=c==null?void 0:c.track)==null?void 0:w.id)||null)});try{const c=JSON.parse(localStorage.getItem("melo-current-track")||"null");c!=null&&c.id&&W(c.id)}catch{}D("melo:request-playback-state"),setTimeout(()=>D("melo:request-playback-state"),250),window.LumiLibrary={get tracks(){return Z},get playlists(){return m},scanFolder:ne,importPaths:ge,getTrack:ta,render:()=>ft(),addTracks:()=>{},addToCurrentPlaylist:async c=>{!x||!c.length||(await x("add_tracks_to_playlist",{playlistId:E,trackIds:c.map(w=>w.id)}),D("melo:playlist-changed",{playlistId:E}))},currentPlaylistName:()=>{var c;return((c=m.find(w=>w.id===E))==null?void 0:c.name)||"Playlist"}},V().catch(()=>a("Could not initialize the Library database"))}const Yt={flat:[0,0,0,0,0,0,0,0,0,0],pop:[-1,2,4,4,2,-1,-1,2,3,3],rock:[4,3,2,-1,-2,-2,1,3,4,4],bass:[6,5,4,2,1,0,-1,-1,-2,-3],treble:[-3,-2,-1,0,1,2,3,5,6,6],dance:[5,4,2,0,-1,-1,2,4,5,3],jazz:[2,1,2,3,2,0,1,2,3,2],classical:[3,2,1,0,0,0,-1,2,3,4],vocal:[-2,-1,0,2,4,4,3,1,0,-1],acoustic:[3,2,1,1,2,2,3,3,2,1],hiphop:[5,4,1,2,-1,-1,1,-1,2,3],metal:[4,2,-1,-2,-1,1,3,4,5,4]};function ce(t){for(const[a,i]of Object.entries(Yt))if(i.every((e,n)=>e===t[n]))return a;return"custom"}function Ee(t,a,i={}){const e=!!i.remote,n=document.getElementById("eqEnable"),l=document.getElementById("eqPreset"),s=document.getElementById("btnEqReset"),d=document.getElementById("eqBands"),p=document.getElementById("eqCanvas"),r=p?p.getContext("2d"):null;let u=null,g=[],y=[],S=new Array(Gt.length).fill(0);try{const m=JSON.parse(localStorage.getItem("melo-eq-gains")||"null");Array.isArray(m)&&m.length===Gt.length&&(S=m.map(v=>typeof v=="number"?Math.max(-12,Math.min(12,v)):0))}catch{}let k=localStorage.getItem("melo-eq-preset")||ce(S),h=localStorage.getItem("melo-eq-enabled")!=="0";function z(){if(!u)try{const m=Qt(t);u=m.ctx,g=m.filters,g.forEach((v,M)=>{v.gain.value=h?S[M]:0})}catch{}}function P(m,v){z(),g[m]&&h&&(g[m].gain.value=v)}function x(m){z(),S=[...m],h&&m.forEach((v,M)=>{g[M]&&(g[M].gain.value=v)}),E()}function et(m){z(),h=m,m?S.forEach((v,M)=>{g[M]&&(g[M].gain.value=v)}):g.forEach(v=>{v.gain.value=0}),E()}e||t&&t.addEventListener("play",()=>{z(),(u==null?void 0:u.state)==="suspended"&&u.resume().catch(()=>{})}),at("melo:eq",m=>{m&&(m.type==="gain"?(e||P(m.idx,m.val),S[m.idx]=m.val,y[m.idx]&&(y[m.idx].value=String(m.val),nt(y[m.idx])),l&&(l.value=ce(S)),E()):m.type==="gains"?(e||x(m.values),S=[...m.values],y.length&&y.forEach((v,M)=>{v.value=String(S[M]),nt(v)}),l&&m.preset&&(l.value=m.preset),E()):m.type==="enable"&&(h=!!m.on,e||et(h),n&&(n.checked=h),E()))});function nt(m){var J;const v=parseInt(m.value),M=(J=m.parentElement)==null?void 0:J.querySelector(".val");M&&(M.textContent=(v>0?"+":"")+v+"dB")}function E(){if(!p||!r)return;const m=window.devicePixelRatio||1,v=p.clientWidth*m,M=p.clientHeight*m;if(v<=0||M<=0)return;p.width=v,p.height=M,r.clearRect(0,0,v,M);const J=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#2a7bd6",Z=S;if(!h){r.strokeStyle="rgba(100,120,150,0.25)",r.lineWidth=2*m,r.beginPath(),r.moveTo(0,M/2),r.lineTo(v,M/2),r.stroke();return}r.strokeStyle=J,r.lineWidth=2.5*m,r.lineJoin="round",r.beginPath(),Z.forEach((pt,K)=>{const N=K/(Z.length-1)*v,j=M/2-pt/12*(M/2-10*m);if(K===0)r.moveTo(N,j);else{const dt=(K-1)/(Z.length-1)*v,bt=M/2-Z[K-1]/12*(M/2-10*m);r.quadraticCurveTo((dt+N)/2,bt,N,j)}}),r.stroke(),Z.forEach((pt,K)=>{const N=K/(Z.length-1)*v,j=M/2-pt/12*(M/2-10*m);r.fillStyle=J,r.beginPath(),r.arc(N,j,4*m,0,Math.PI*2),r.fill(),r.fillStyle="white",r.beginPath(),r.arc(N,j,2*m,0,Math.PI*2),r.fill()}),r.strokeStyle="rgba(100,120,150,0.3)",r.lineWidth=1*m,r.setLineDash([4*m,4*m]),r.beginPath(),r.moveTo(0,M/2),r.lineTo(v,M/2),r.stroke(),r.setLineDash([])}d&&(d.innerHTML="",Gt.forEach((m,v)=>{const M=S[v]||0,J=document.createElement("div");J.className="eq-band",J.innerHTML=`
        <input type="range" min="-12" max="12" value="${M}" step="1" data-idx="${v}" orient="vertical" />
        <label>${m>=1e3?m/1e3+"k":m}</label>
        <span style="font-size:10px;color:var(--text-muted);min-height:12px;" class="val">${(M>0?"+":"")+M+"dB"}</span>
      `,d.appendChild(J)}),y=Array.from(d.querySelectorAll("input")),y.forEach(m=>{m.addEventListener("input",()=>{const v=parseInt(m.dataset.idx),M=parseInt(m.value);nt(m),S[v]=M,E();const J=ce(S);l&&(l.value=J),localStorage.setItem("melo-eq-gains",JSON.stringify(S)),localStorage.setItem("melo-eq-preset",J),e||P(v,M),D("melo:eq",{type:"gain",idx:v,val:M,values:S})})})),l&&(l.value=k,l.addEventListener("change",()=>{const m=Yt[l.value]||Yt.flat;y.length&&y.forEach((v,M)=>{v.value=String(m[M]),nt(v)}),S=[...m],E(),localStorage.setItem("melo-eq-gains",JSON.stringify(S)),localStorage.setItem("melo-eq-preset",l.value),e||x(m),D("melo:eq",{type:"gains",values:m,preset:l.value}),a(`Preset: ${l.options[l.selectedIndex].text}`)})),s&&s.addEventListener("click",()=>{const m=Yt.flat;y.length&&y.forEach((v,M)=>{v.value="0",nt(v)}),S=[...m],l&&(l.value="flat"),localStorage.setItem("melo-eq-gains",JSON.stringify(S)),localStorage.setItem("melo-eq-preset","flat"),e||x(m),D("melo:eq",{type:"gains",values:m,preset:"flat"}),E(),a("Equalizer reset to Flat (0dB)")}),n&&(n.checked=h,n.addEventListener("change",()=>{h=n.checked,localStorage.setItem("melo-eq-enabled",h?"1":"0"),e||et(h),D("melo:eq",{type:"enable",on:h}),E(),a(h?"Equalizer On":"Equalizer off — Flat")})),p&&new ResizeObserver(()=>E()).observe(p),E(),window.LumiEqualizer={presets:Yt,frequencies:Gt,displayGains:S,reset:()=>s==null?void 0:s.click()}}const jt=[{id:"bars",label:"Classic Bars"},{id:"thin",label:"Thin Bars"},{id:"line",label:"Spectrum Line"},{id:"mirror",label:"Mirror Bars"},{id:"wave",label:"Oscilloscope"},{id:"spectrumWave",label:"Spectrum Wave"},{id:"blocks",label:"Block Equalizer"}];function ma(t){let a=document.getElementById("vizBars");if(!a)return;let i=h(a),e=i.getContext("2d"),n=null,l=null,s=null,d=null,p=null,r=!1,u=localStorage.getItem("melo-viz-mode")||"bars";jt.some(f=>f.id===u)||(u="bars");let g=0,y=[],S=.45,k=null;function h(f){let b=f.querySelector("canvas");return b||(f.innerHTML="",b=document.createElement("canvas"),f.appendChild(b)),b}function z(){if(!(l&&s))try{const f=Qt(t);n=f.ctx,l=f.analyser,s=new Uint8Array(l.frequencyBinCount),d=new Uint8Array(l.fftSize)}catch{r=!0}}function P(f){const b=s.length,_=((n==null?void 0:n.sampleRate)||44100)/2,L=45,T=Math.min(15e3,_*.95),W=Math.log(L),$=Math.log(T),C=[];for(let R=0;R<f;R++){const G=Math.exp(W+($-W)*R/f),A=Math.exp(W+($-W)*(R+1)/f);let F=Math.floor(G/_*b),o=Math.max(F+1,Math.ceil(A/_*b));F<0&&(F=0),o>b&&(o=b);let I=0;for(let V=F;V<o;V++)I+=s[V];C.push(I/(o-F)/255)}return C}function x(f){const b=performance.now()/1e3,_=Math.pow(Math.abs(Math.sin(b*2.2)),2.5),L=[];for(let T=0;T<f;T++){let W=.42+.26*Math.sin(b*1.35+T*.62)+.2*Math.sin(b*2.9+T*1.31)+Math.random()*.07;W*=.55+.5*_,L.push(Math.max(.04,Math.min(1,W)))}return L}function et(f){const b=performance.now()/1e3,_=.5+.5*Math.pow(Math.abs(Math.sin(b*1.9)),2);for(let L=0;L<f.length;L++){const T=L/f.length;f[L]=128+66*_*(Math.sin(T*Math.PI*6+b*7)*.6+Math.sin(T*Math.PI*13-b*11)*.4)}}function nt(f){let b;if(r||!l||!s)b=x(f);else if(l.getByteFrequencyData(s),b=P(f),!b.some(T=>T>.01)&&!t.paused)b=x(f);else for(let T=0;T<f;T++)b[T]*=1+1.7*(T/Math.max(1,f-1));let _=0;for(const L of b)L>_&&(_=L);_>S?S=_:S=Math.max(.35,S*.985),y.length!==f&&(y=new Array(f).fill(0));for(let L=0;L<f;L++){const T=Math.min(1,b[L]/S),W=T>y[L]?.55:.16;y[L]+=(T-y[L])*W}return y}function E(f,b){return getComputedStyle(document.documentElement).getPropertyValue(f).trim()||b}function m(){return i.width/Math.max(1,i.clientWidth)||1}function v(f,b,_,L,T){if(T=Math.min(T,_/2,L/2),e.roundRect){e.roundRect(f,b,_,L,T);return}e.rect(f,b,_,L)}function M(){const f=window.devicePixelRatio||1,b=i.clientWidth||(a==null?void 0:a.clientWidth)||200,_=i.clientHeight||(a==null?void 0:a.clientHeight)||56;b>0&&_>0&&(i.width=Math.round(b*f),i.height=Math.round(_*f))}new ResizeObserver(M).observe(i),M();function J(f,b,_,L){const T=m(),W=E("--visualizer","#38bdf8"),$=E("--accent","#0284c7"),C=f.length,R=b/C,G=Math.max(1.2*T,R*(1-L));for(let A=0;A<C;A++){const F=f[A],o=Math.max(2*T,F*(_-4*T)),I=A*R+(R-G)/2,V=_-o-1*T,O=e.createLinearGradient(0,V,0,_);O.addColorStop(0,$),O.addColorStop(1,W),e.fillStyle=O,e.beginPath(),v(I,V,G,o,Math.min(G/2,3.5*T)),e.fill()}}function Z(f,b,_){const L=m(),T=E("--visualizer","#38bdf8"),W=E("--accent","#0284c7"),$=f.length,C=b/$,R=_/2,G=Math.max(1.5*L,C*.62);for(let A=0;A<$;A++){const F=Math.max(1.5*L,f[A]*(_/2-3*L)),o=A*C+(C-G)/2,I=e.createLinearGradient(0,R-F,0,R+F);I.addColorStop(0,W),I.addColorStop(.5,T),I.addColorStop(1,W),e.fillStyle=I,e.beginPath(),v(o,R-F,G,F*2,Math.min(G/2,3*L)),e.fill()}}function pt(f,b,_){const L=m(),T=E("--visualizer","#38bdf8"),W=E("--accent","#0284c7"),$=f.length,C=[],R=[];for(let A=0;A<$;A++)C.push((A+.5)/$*b),R.push(_-2*L-f[A]*(_-8*L));e.beginPath(),e.moveTo(C[0],_),e.lineTo(C[0],R[0]);for(let A=1;A<$;A++){const F=(C[A-1]+C[A])/2;e.quadraticCurveTo(C[A-1],R[A-1],F,(R[A-1]+R[A])/2)}e.lineTo(C[$-1],R[$-1]),e.lineTo(C[$-1],_),e.closePath();const G=e.createLinearGradient(0,0,0,_);G.addColorStop(0,T),G.addColorStop(1,"transparent"),e.globalAlpha=.18,e.fillStyle=G,e.fill(),e.globalAlpha=1,e.beginPath(),e.moveTo(C[0],R[0]);for(let A=1;A<$;A++){const F=(C[A-1]+C[A])/2;e.quadraticCurveTo(C[A-1],R[A-1],F,(R[A-1]+R[A])/2)}e.lineTo(C[$-1],R[$-1]),e.strokeStyle=W,e.lineWidth=2*L,e.lineJoin="round",e.stroke()}function K(f,b,_){const L=m(),T=E("--visualizer","#38bdf8"),W=E("--accent","#0284c7"),$=_/2,C=f.length,R=f.map((F,o)=>{const I=o/Math.max(1,C-1),V=Math.pow(Math.sin(Math.PI*I),.28);return Math.max(.7*L,F*V*(_*.46))}),G=F=>{e.beginPath();for(let o=0;o<C;o++){const I=o/Math.max(1,C-1)*b,V=$+(F?-R[o]:R[o]);if(o===0)e.moveTo(I,V);else{const O=(o-1)/Math.max(1,C-1)*b,X=$+(F?-R[o-1]:R[o-1]);e.quadraticCurveTo(O,X,(O+I)/2,(X+V)/2)}}};G(!0);for(let F=C-1;F>=0;F--){const o=F/Math.max(1,C-1)*b;e.lineTo(o,$+R[F])}e.closePath();const A=e.createLinearGradient(0,0,0,_);A.addColorStop(0,W),A.addColorStop(.5,T),A.addColorStop(1,W),e.fillStyle=A,e.globalAlpha=.3,e.fill(),e.globalAlpha=.18,e.shadowColor=T,e.shadowBlur=8*L,G(!0),e.strokeStyle=T,e.lineWidth=4*L,e.stroke(),G(!1),e.stroke(),e.shadowBlur=0,e.globalAlpha=1,G(!0),e.strokeStyle=W,e.lineWidth=1.2*L,e.stroke(),G(!1),e.stroke(),e.beginPath(),e.moveTo(0,$),e.lineTo(b,$),e.strokeStyle=T,e.globalAlpha=.45,e.lineWidth=.8*L,e.stroke(),e.globalAlpha=1}function N(f,b,_){const L=m(),T=E("--visualizer","#38bdf8"),W=E("--accent","#0284c7"),$=f.length,C=8,R=Math.max(1*L,b*.0035),G=Math.max(1*L,_*.025),A=Math.max(1,(b-R*($-1))/$),F=Math.max(1,(_-G*(C-1))/C),o=e.createLinearGradient(0,0,0,_);o.addColorStop(0,W),o.addColorStop(1,T),e.fillStyle=o;for(let I=0;I<$;I++){const V=Math.max(1,Math.min(C,Math.round(f[I]*C))),O=I*(A+R);for(let X=0;X<V;X++){const gt=_-(X+1)*F-X*G;e.globalAlpha=.58+.42*((X+1)/C),e.fillRect(O,gt,A,F)}}e.globalAlpha=1}function j(){const f=i.width,b=i.height,_=m(),L=E("--accent","#0284c7");let T;r||!l||!d?(p||(p=new Uint8Array(1024)),et(p),T=p):(l.getByteTimeDomainData(d),T=d);const W=()=>{e.beginPath();for(let $=0;$<=f;$+=2){const C=Math.min(T.length-1,Math.floor($/f*T.length)),R=T[C]/255*b;$===0?e.moveTo($,R):e.lineTo($,R)}};W(),e.strokeStyle=L,e.globalAlpha=.16,e.lineWidth=6*_,e.lineJoin="round",e.stroke(),W(),e.globalAlpha=1,e.lineWidth=1.8*_,e.stroke()}function dt(){const f=i.width,b=i.height;if(!f||!b)return;if(e.clearRect(0,0,f,b),u==="wave"){j();return}const L=nt(u==="bars"?16:u==="thin"?56:u==="line"?64:u==="spectrumWave"?72:u==="blocks"?22:24);u==="bars"?J(L,f,b,.34):u==="thin"?J(L,f,b,.32):u==="line"?pt(L,f,b):u==="mirror"?Z(L,f,b):u==="spectrumWave"?K(L,f,b):u==="blocks"&&N(L,f,b)}function bt(){g=requestAnimationFrame(bt),dt()}function kt(){g||bt()}function xt(f,b=!1){u=f,y=[],localStorage.setItem("melo-viz-mode",f)}function wt(){return k||(k=document.createElement("div"),k.className="viz-menu",k.style.display="none",document.body.appendChild(k),k)}function Mt(){const f=wt();f.innerHTML='<div class="viz-menu-label">Visualizer type</div>'+jt.map(b=>`<button class="viz-menu-item ${b.id===u?"active":""}" data-mode="${b.id}">${b.id===u?"✓":""}<span>${b.label}</span></button>`).join(""),f.querySelectorAll("[data-mode]").forEach(b=>{b.addEventListener("click",_=>{_.stopPropagation(),xt(b.dataset.mode),st()})})}function Ct(f,b){Mt();const _=k;_.style.display="block";const L=_.getBoundingClientRect();_.style.left=Math.max(8,Math.min(f,window.innerWidth-L.width-8))+"px",_.style.top=Math.max(8,Math.min(b,window.innerHeight-L.height-8))+"px"}function st(){k&&(k.style.display="none")}function mt(){a&&(a.title="Click: next mode • Right-click: choose mode",a.addEventListener("click",()=>{st();const f=jt.findIndex(b=>b.id===u);xt(jt[(f+1)%jt.length].id)}),a.addEventListener("contextmenu",f=>{f.preventDefault(),f.stopPropagation(),Ct(f.clientX,f.clientY)}))}document.addEventListener("click",f=>{k&&k.style.display!=="none"&&!k.contains(f.target)&&st()}),document.addEventListener("keydown",f=>{f.key==="Escape"&&st()});function It(){z(),kt(),(n==null?void 0:n.state)==="suspended"&&n.resume().catch(()=>{})}t.addEventListener("play",It),It(),mt(),document.addEventListener("visibilitychange",()=>{document.hidden?(cancelAnimationFrame(g),g=0):kt()});function rt(){cancelAnimationFrame(g),g=0,a=document.getElementById("vizBars"),a&&(i=h(a),e=i.getContext("2d"),new ResizeObserver(M).observe(i),M(),mt(),kt())}window.__LUMI_REBIND_VISUALIZER__=rt}function Le(t){if(!t||!t.trim())return{isSynced:!1,lines:[],raw:""};const a=[],i=t.split(/\r?\n/),e=/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;let n=!1;for(const l of i){const s=l.trim();if(!s||/^\[[a-z]{2,8}:/i.test(s))continue;const d=[...s.matchAll(e)];if(d.length>0){n=!0;const p=s.replace(e,"").trim();for(const r of d){const u=parseInt(r[1],10),g=parseInt(r[2],10),y=r[3]||"0",S=y.length===2?parseInt(y,10)*10:y.length===1?parseInt(y,10)*100:parseInt(y.slice(0,3),10),k=u*60+g+S/1e3;a.push({time:k,text:p})}}else a.push({time:-1,text:s})}return a.sort((l,s)=>l.time-s.time),{isSynced:n,lines:a,raw:t}}function Me(t,a){var k;const i=document.getElementById("lyricsContainer"),e=document.getElementById("lyricsStatus"),n=document.getElementById("lyricsTrackTitle");let l={isSynced:!1,lines:[]},s=null,d=-1,p=0;async function r(h){if(h.lyrics&&h.lyrics.trim().length>0)return h.lyrics;if(window.__TAURI__)try{const{invoke:z}=await Y(async()=>{const{invoke:x}=await import("./core-DhEqZVGG.js");return{invoke:x}},[]),P=await z("get_track_lyrics",{path:h.path});if(P)return P}catch{}return null}async function u(h){if(!h){s=null,l={isSynced:!1,lines:[],raw:""},n&&(n.textContent="No track playing"),g();return}s=h.id,n&&(n.textContent=`${h.title} — ${h.artist}`);const z=await r(h);l=Le(z||""),g()}function g(){if(i){if(i.innerHTML="",d=-1,!l.lines.length){e&&(e.style.display="block",e.innerHTML='No synced lyrics found (.lrc)<br/><span style="font-size:10.5px; opacity:0.7;">Place a matching .lrc file in the song folder or add lyrics in the tag editor.</span>');return}e&&(e.style.display="none"),l.lines.forEach((h,z)=>{const P=document.createElement("div");P.className="lyric-line",P.dataset.idx=String(z),P.dataset.time=String(h.time),P.textContent=h.text||"♪",h.time>=0&&(P.style.cursor="pointer",P.title=`Seek to ${Math.floor(h.time/60)}:${Math.floor(h.time%60).toString().padStart(2,"0")}`,P.addEventListener("click",()=>{D("melo:seek-playback",h.time),window.__TAURI__||(t.currentTime=h.time,t.play().catch(()=>{}))})),i.appendChild(P)})}}function y(){if(!i||!l.isSynced||!l.lines.length)return;const h=window.__TAURI__?p:t.currentTime;let z=-1;for(let P=0;P<l.lines.length&&l.lines[P].time<=h;P++)z=P;if(z!==d){d=z;const P=i.querySelectorAll(".lyric-line");if(P.forEach((x,et)=>{x.classList.toggle("active",et===d),x.classList.toggle("passed",et<d)}),d>=0&&P[d]){const x=P[d],et=i.clientHeight,E=x.offsetTop-i.offsetTop-et/2+x.clientHeight/2;i.scrollTo({top:Math.max(0,E),behavior:"smooth"})}}}t.addEventListener("timeupdate",y),window.addEventListener("lumi:trackChange",h=>{u(h.detail)}),at("melo:track-changed",h=>{u(h)}),at("melo:playback-state",h=>{h&&(p=Number(h.currentTime)||0,h.track&&h.track.id!==s?u(h.track):y())}),at("melo:playback-position",h=>{p=Number(h)||0,y()});const S=window.__LUMI_QUEUE__;if(Array.isArray(S)&&S.length>0)u(S[((k=window.LumiPlayer)==null?void 0:k.currentIndex)||0]);else try{const h=JSON.parse(localStorage.getItem("melo-current-track")||"null");h&&u(h)}catch{}D("melo:request-playback-state"),setTimeout(()=>D("melo:request-playback-state"),250),window.LumiLyrics={loadTrackLyrics:u,parseLRC:Le}}let _t=null;const Nt=`<!doctype html>
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
`,te={"compact-pill.html":Nt,"compact-pill":Nt,"compact-pill-light.html":Nt,"compact-pill-dark.html":Nt,"compact-pill-light":Nt,"compact-pill-dark":Nt},fa=[{id:"compact-pill",name:"Minimal Compact (Light/Dark)",filename:"compact-pill.html"},{id:"full-html-example",name:"Full HTML Example",filename:"full-html-example.html"},{id:"example-custom",name:"Custom CSS Example",filename:"example-custom.html"}];function ze(t){const a=["trackTitle","btnPlay","seekBar","coverImg"];let i=0;for(const e of a)t.includes(e)&&i++;return i>=3}function $t(t,a){const i=document.getElementById("playerCard");if(!i)return;const e=i._originalHTML||i.innerHTML;i._originalHTML||(i._originalHTML=e),_t&&(_t.remove(),_t=null);let l=[...t.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(g=>g[1]).join(`
`);l&&(_t=document.createElement("style"),_t.id="melo-custom-skin",_t.textContent=l,document.head.appendChild(_t));const s=ze(t);let d="";const p=t.match(/<body[^>]*>([\s\S]*?)<\/body>/i);p?d=p[1]:d=t.split(/<\/style>/i).pop()||"";const r=document.createElement("div");r.innerHTML=d;const u=r.querySelector("#lumi-player");if(u&&(d=u.innerHTML),s&&d.trim().length>20){const g=d.trim();i.innerHTML=g,a&&a("Skin applied"),setTimeout(()=>{var S,k;(S=window.__LUMI_REBIND__)==null||S.call(window);const y=window.__LUMI_AUDIO__;y&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(y),(k=window.__LUMI_REBIND_MAIN__)==null||k.call(window)},40)}else l&&a&&a("Skin CSS applied");localStorage.setItem("lumi-custom-skin",t),localStorage.setItem("lumi-custom-skin-isFull",s?"1":"0")}function de(t,a=!0){document.documentElement.classList.remove("compact-skin-active"),document.body.classList.remove("compact-skin-active"),_t&&(_t.remove(),_t=null);const i=document.getElementById("playerCard");i&&i._originalHTML&&(i.innerHTML=i._originalHTML,setTimeout(()=>{var n,l;(n=window.__LUMI_REBIND__)==null||n.call(window);const e=window.__LUMI_AUDIO__;e&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(e),(l=window.__LUMI_REBIND_MAIN__)==null||l.call(window)},40)),localStorage.removeItem("lumi-custom-skin"),localStorage.removeItem("lumi-custom-skin-isFull"),localStorage.setItem("melo-active-skin-id","default"),a&&D("melo:skin-changed","default"),t&&t("Switched to Default Melo skin")}async function Re(){if(it)try{const{invoke:t}=await Y(async()=>{const{invoke:i}=await import("./core-DhEqZVGG.js");return{invoke:i}},[]),a=await t("list_installed_skins");if(Array.isArray(a)&&a.length>0)return a}catch{}return fa}async function qe(t,a){if(it)try{const{invoke:e}=await Y(async()=>{const{invoke:l}=await import("./core-DhEqZVGG.js");return{invoke:l}},[]),n=await e("read_skin_file",{filenameOrPath:t});if(n&&n.trim().length>0)return $t(n,a),!0}catch{}try{const e=t.startsWith("skins/")?t:`skins/${t}`,n=await fetch(e);if(n.ok){const l=await n.text();return $t(l,a),!0}}catch{}const i=t.replace(/^.*[\\/]/,"");return te[i]?($t(te[i],a),!0):(a&&a(`Could not load skin: ${t}`),!1)}async function qt(t,a,i,e=!0){if(t==="default"){de(i,e);return}let n=t;const l=t==="compact-pill"||t.startsWith("compact-pill");document.documentElement.classList.toggle("compact-skin-active",l),document.body.classList.toggle("compact-skin-active",l),l?n="compact-pill.html":!n.endsWith(".html")&&!n.endsWith(".htm")&&(n=n+".html");let s=!1;l&&te[n]?($t(te[n],i),s=!0):s=await qe(n,i),s&&(localStorage.setItem("melo-active-skin-id",t),e&&D("melo:skin-changed",t))}async function $e(t){if(it)try{const{invoke:a}=await Y(async()=>{const{invoke:i}=await import("./core-DhEqZVGG.js");return{invoke:i}},[]);await a("open_skins_folder"),t&&t("Opening skins folder...")}catch{t&&t("Could not open skins folder")}else t&&t("Skins are located in the skins/ folder")}function ga(t){const a=document.getElementById("skinUpload"),i=document.getElementById("linkDownloadExample");i&&i.addEventListener("click",l=>{l.preventDefault(),qe("compact-pill.html")});const e=localStorage.getItem("melo-active-skin-id")||"default",n=localStorage.getItem("lumi-theme")||"dark";e!=="default"&&setTimeout(()=>{qt(e,n,void 0,!1)},150),at("melo:theme",l=>{const s=localStorage.getItem("melo-active-skin-id");s&&s!=="default"&&qt(s,l,void 0,!1)}),at("melo:skin-changed",l=>{if(l&&typeof l=="string"){const s=localStorage.getItem("lumi-theme")||"dark";qt(l,s,void 0,!1)}}),a&&a.addEventListener("change",async()=>{var p;const l=(p=a.files)==null?void 0:p[0];if(!l)return;const s=await l.text(),d=l.name;if(it)try{const{invoke:r}=await Y(async()=>{const{invoke:u}=await import("./core-DhEqZVGG.js");return{invoke:u}},[]);await r("save_custom_skin_file",{filename:d,content:s}),t(`Saved ${d} to skins folder`)}catch{}$t(s,t),localStorage.setItem("melo-active-skin-id",d),D("melo:skin-changed",d),a.value=""}),document.addEventListener("dragover",l=>{var s;[...((s=l.dataTransfer)==null?void 0:s.types)||[]].includes("Files")&&l.preventDefault()}),document.addEventListener("drop",async l=>{var d;const s=[...((d=l.dataTransfer)==null?void 0:d.files)||[]].find(p=>p.name.endsWith(".html")||p.name.endsWith(".htm"));if(s){l.preventDefault();const p=await s.text();if(p.includes("<style")||p.includes("<html")||ze(p)){const r=s.name;if(it)try{const{invoke:u}=await Y(async()=>{const{invoke:g}=await import("./core-DhEqZVGG.js");return{invoke:g}},[]);await u("save_custom_skin_file",{filename:r,content:p})}catch{}$t(p,t),localStorage.setItem("melo-active-skin-id",r),D("melo:skin-changed",r)}}}),window.LumiSkin={applyCustomSkin:$t,resetSkin:de,applySkinChoice:qt,listInstalledSkins:Re,openSkinsFolderOnDisk:$e}}const ha=(t,a,i)=>{const e=t[a];return e?typeof e=="function"?e():Promise.resolve(e):new Promise((n,l)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(l.bind(null,new Error("Unknown variable dynamic import: "+a+(a.split("/").length!==i?". Note that variables only represent file names one level deep.":""))))})},De={code:"en",name:"English",nativeName:"English",authors:["Melo Team"]},ue={_meta:De,"settings.tabs.general":"General","settings.tabs.playback":"Playback","settings.tabs.appearance":"Appearance & Skin","settings.tabs.shortcuts":"Shortcuts","settings.tabs.about":"About","settings.general.language.label":"Language","settings.general.language.desc":"Interface language — more languages coming via community translation","settings.general.tray.label":"Close to system tray","settings.general.tray.desc":"Minimize to system tray on window close","settings.general.resume.label":"Resume playback on reopen","settings.general.resume.desc":"Continue playback of the previous track where you left off","settings.playback.replaygain.label":"ReplayGain normalization","settings.playback.replaygain.desc":"Equalize track volume levels automatically","settings.playback.fadepause.label":"Fade out on pause","settings.playback.fadepause.desc":"Smooth 0.5s fade-out on pause, fade back in on resume","settings.appearance.showstop.label":"Show Stop button","settings.appearance.showstop.desc":"Display a Stop control next to Play/Pause in the player"},va=Object.freeze(Object.defineProperty({__proto__:null,_meta:De,default:ue},Symbol.toStringTag,{value:"Module"})),Oe=[{code:"en",nativeName:"English"}],Rt={en:ue};let He=Rt.en,Ue="en";function ya(){return Ue}async function Ne(t){if(Oe.some(a=>a.code===t)||(t="en"),!Rt[t])if(t==="en")Rt.en=ue;else try{const a=await ha(Object.assign({"./locales/en.json":()=>Y(()=>Promise.resolve().then(()=>va),void 0)}),`./locales/${t}.json`,3);Rt[t]=a.default||a}catch{t="en"}Ue=t,He=Rt[t]||Rt.en,localStorage.setItem("melo-pref-language",t),document.dispatchEvent(new CustomEvent("melo:locale-changed",{detail:t}))}function ot(t){var a,i;return(i=(a=He[t])!=null?a:Rt.en[t])!=null?i:t}function Ie(){const t=localStorage.getItem("melo-pref-language")||"en";Ne(t)}const Ve=document.querySelector("#app");Ve.innerHTML=`
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
          <button class="settings-tab active" data-stab="general"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>${ot("settings.tabs.general")}</button>
          <button class="settings-tab" data-stab="playback"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4z"/></svg>${ot("settings.tabs.playback")}</button>
          <button class="settings-tab" data-stab="appearance"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>${ot("settings.tabs.appearance")}</button>
          <button class="settings-tab" data-stab="shortcuts"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M18 14h.01M9 14h6"/></svg>${ot("settings.tabs.shortcuts")}</button>
          <button class="settings-tab" data-stab="about"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>${ot("settings.tabs.about")}</button>
        </div>

        <!-- GENERAL TAB -->
        <div class="settings-section active" data-panel="general">
          <div class="settings-row">
            <div><div class="label">${ot("settings.general.language.label")}</div><div class="desc">${ot("settings.general.language.desc")}</div></div>
            <select class="settings-select" id="setLanguage">${Oe.map(t=>`<option value="${t.code}">${t.nativeName}</option>`).join("")}</select>
          </div>
          <div class="settings-row">
            <div><div class="label">${ot("settings.general.tray.label")}</div><div class="desc">${ot("settings.general.tray.desc")}</div></div>
            <div class="switch" id="swTray" data-key="tray"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">${ot("settings.general.resume.label")}</div><div class="desc">${ot("settings.general.resume.desc")}</div></div>
            <div class="switch on" id="swResume" data-key="resume"></div>
          </div>
        </div>

        <!-- PLAYBACK TAB -->
        <div class="settings-section" data-panel="playback">
          <div class="settings-row">
            <div><div class="label">${ot("settings.playback.replaygain.label")}</div><div class="desc">${ot("settings.playback.replaygain.desc")}</div></div>
            <div class="switch on" id="swReplayGain" data-key="replayGainGlobal"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">${ot("settings.playback.fadepause.label")}</div><div class="desc">${ot("settings.playback.fadepause.desc")}</div></div>
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
            <div><div class="label">${ot("settings.appearance.showstop.label")}</div><div class="desc">${ot("settings.appearance.showstop.desc")}</div></div>
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
`;const lt=new URLSearchParams(location.search).get("panel");lt&&(document.documentElement.classList.add("panel-window",`panel-${lt}`),document.body.classList.add("panel-window",`panel-${lt}`));var Ae,Ce;if(it&&lt){Y(async()=>{const{getCurrentWindow:e}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:e}},__vite__mapDeps([8,7,1,0])).then(({getCurrentWindow:e})=>{const n=e();ka(n,"melo-geo-panel-"+lt),n.onCloseRequested(()=>{D("melo:panel-closed",lt)}),window.addEventListener("beforeunload",()=>{D("melo:panel-closed",lt)})});const t=document.getElementById("win-"+lt),a=((Ae=t==null?void 0:t.querySelector(".float-title"))==null?void 0:Ae.innerHTML)||"",i=((Ce=t==null?void 0:t.querySelector(".float-body"))==null?void 0:Ce.innerHTML)||"";Ve.innerHTML=`
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
</div>`}it&&!lt&&(document.documentElement.classList.add("tauri-main"),document.body.classList.add("tauri-main"),document.querySelectorAll(".side-actions .sbtn").forEach(t=>t.classList.remove("active")),Y(async()=>{const{WebviewWindow:t}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:t}},__vite__mapDeps([6,7,1,0,8])).then(({WebviewWindow:t})=>{const a=async()=>{var i;for(const e of["library","playlist","equalizer","lyrics","settings"])try{const n=await t.getByLabel("panel-"+e);(i=document.getElementById(pe[e]))==null||i.classList.toggle("active",!!n)}catch{}};a(),setInterval(a,1200)}));it&&!lt&&(Y(()=>import("./window-BWd3Cypy.js"),__vite__mapDeps([8,7,1,0])).then(async({getCurrentWindow:t})=>{const a=t(),i=()=>{const n=localStorage.getItem("melo-active-skin-id"),l=n==="compact-pill"||typeof n=="string"&&n.startsWith("compact-pill");return{w:l?780:960,h:l?138:240}};try{const n=JSON.parse(localStorage.getItem("melo-geo-main")||"null"),{LogicalPosition:l,LogicalSize:s}=await Y(async()=>{const{LogicalPosition:u,LogicalSize:g}=await import("./dpi-fvP-W2qr.js");return{LogicalPosition:u,LogicalSize:g}},__vite__mapDeps([7,1])),d=i(),p=d.w===780,r=p?d.w:n!=null&&n.w?Math.max(650,n.w):d.w;await a.setSize(new s(r,d.h)),await a.setResizable(!p),(n==null?void 0:n.x)!=null&&(n==null?void 0:n.y)!=null&&await a.setPosition(new l(n.x,n.y))}catch{}const e=async()=>{try{const n=await a.outerPosition(),l=await a.innerSize(),s=i();localStorage.setItem("melo-geo-main",JSON.stringify({x:n.x,y:n.y,w:l.width,h:s.h}))}catch{}};a.onMoved(e),a.onResized(async()=>{try{const n=await a.innerSize(),l=i(),s=l.w===780,{LogicalSize:d}=await Y(async()=>{const{LogicalSize:p}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:p}},__vite__mapDeps([7,1]));if(!s){const p=n.toLogical(await a.scaleFactor());(p.width<650||p.height!==l.h)&&await a.setSize(new d(Math.max(650,p.width),l.h))}}catch{}e()}),at("melo:skin-changed",async n=>{try{!lt&&n&&await qt(n,At,void 0,!1);const l=n==="compact-pill"||typeof n=="string"&&n.startsWith("compact-pill"),s=l?780:960,d=l?138:240,{LogicalSize:p}=await Y(async()=>{const{LogicalSize:r}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:r}},__vite__mapDeps([7,1]));await a.setSize(new p(s,d)),await a.setResizable(!l),e()}catch{}}),a.onCloseRequested(async n=>{if(n.preventDefault(),localStorage.getItem("melo-pref-tray")==="1")try{await a.hide();return}catch{}const{WebviewWindow:s}=await Y(async()=>{const{WebviewWindow:d}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:d}},__vite__mapDeps([6,7,1,0,8]));for(const d of["library","playlist","equalizer","lyrics","settings"])try{const p=await s.getByLabel("panel-"+d);p&&await p.close()}catch{}try{await a.destroy()}catch{window.close()}})}),Y(()=>import("./core-DhEqZVGG.js"),[]).then(async({invoke:t})=>{try{const a=await t("get_cli_tracks");Array.isArray(a)&&a.length>0&&setTimeout(async()=>{const i=window.LumiLibrary,e=a.map(l=>l.path).filter(Boolean),n=await(i==null?void 0:i.importPaths(e,"replace"))||[];n.length&&D("melo:play-tracks",{tracks:n,index:0})},350)}catch{}}),at("melo:open-files",t=>{if(Array.isArray(t)&&t.length>0){const a=t.map(i=>i.path).filter(Boolean);setTimeout(async()=>{const i=window.LumiLibrary,e=await(i==null?void 0:i.importPaths(a,"replace"))||[];e.length&&D("melo:play-tracks",{tracks:e,index:0})},100)}}));document.addEventListener("contextmenu",t=>{t.preventDefault()});const Kt=document.getElementById("toast"),ut=t=>{Kt&&(Kt.textContent=t,Kt.classList.add("show"),setTimeout(()=>Kt.classList.remove("show"),2200))},Et=new Audio;Et.preload="metadata";Et.crossOrigin="anonymous";window.__LUMI_AUDIO__=Et;window.__TOAST__=ut;localStorage.getItem("melo-dynamic-theme")===null&&localStorage.setItem("melo-dynamic-theme","1");let At=localStorage.getItem("lumi-theme")||"dark";function ae(t){document.documentElement.setAttribute("data-theme",t),localStorage.setItem("lumi-theme",t),At=t}function We(t){ae(t),D("melo:theme",t)}ae(At);at("melo:theme",t=>{(t==="light"||t==="dark")&&ae(t)});setInterval(()=>{const t=localStorage.getItem("lumi-theme");(t==="light"||t==="dark")&&t!==At&&ae(t)},1e3);document.body.classList.toggle("show-stop-btn",localStorage.getItem("melo-pref-showStopBtn")==="1");at("melo:pref-changed",t=>{t&&t.key==="showStopBtn"&&document.body.classList.toggle("show-stop-btn",!!t.value)});const ba=["win-library","win-playlist","win-equalizer","win-lyrics","win-settings"],ee=document.getElementById("desktop"),Fe={btnToggleLibrary:"win-library",btnTogglePlaylist:"win-playlist",btnToggleEq:"win-equalizer",btnToggleLyrics:"win-lyrics",btnOpenSettings:"win-settings",menuToggleLibrary:"win-library",menuTogglePlaylist:"win-playlist",menuToggleEq:"win-equalizer",menuToggleLyrics:"win-lyrics",menuToggleSettings:"win-settings"};function wa(t){const a=document.getElementById(t);return!!a&&!a.classList.contains("hidden")}const pe={library:"btnToggleLibrary",playlist:"btnTogglePlaylist",equalizer:"btnToggleEq",lyrics:"btnToggleLyrics",settings:"btnOpenSettings"};async function ka(t,a){const i=async()=>{try{const e=await t.outerPosition(),n=await t.outerSize();localStorage.setItem(a,JSON.stringify({x:e.x,y:e.y,w:n.width,h:n.height}))}catch{}};t.onMoved(i),t.onResized(i)}async function xa(t){const{WebviewWindow:a}=await Y(async()=>{const{WebviewWindow:u}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:u}},__vite__mapDeps([6,7,1,0,8])),i="panel-"+t,e=document.getElementById(pe[t]),n=await a.getByLabel(i);if(n){await n.close(),e==null||e.classList.remove("active");return}const l={library:[430,620],playlist:[440,560],equalizer:[700,440],lyrics:[380,520],settings:[600,540]},s={library:[360,400],playlist:[360,360],equalizer:[620,400],lyrics:[320,360],settings:[500,400]},d={library:"Library",playlist:"Playlist",equalizer:"Equalizer",lyrics:"Lyric",settings:"Settings"},p=l[t]||[420,520];let r=null;try{r=JSON.parse(localStorage.getItem("melo-geo-panel-"+t)||"null")}catch{}new a(i,{url:`/?panel=${t}`,title:d[t]||t,width:(r==null?void 0:r.w)||p[0],height:(r==null?void 0:r.h)||p[1],minWidth:(s[t]||[360,360])[0],minHeight:(s[t]||[360,360])[1],...(r==null?void 0:r.x)!=null?{x:r.x,y:r.y}:{center:!0},decorations:!1,transparent:!0,shadow:!1,skipTaskbar:!0}),e==null||e.classList.add("active")}at("melo:panel-closed",t=>{var i;const a=pe[t];a&&((i=document.getElementById(a))==null||i.classList.remove("active"))});function me(t){if(it){xa(t.replace(/^win-/,""));return}const a=wa(t);Jt(t,!a),a||ie(document.getElementById(t))}function Sa(t){if(t.classList.contains("hidden")||!ee||window.matchMedia("(max-width: 860px)").matches)return;const a=ee.getBoundingClientRect();if(a.width<=0||a.height<=0)return;const i=t.getBoundingClientRect(),e=Math.min(i.width,a.width),n=Math.min(i.height,a.height);let l=i.left-a.left,s=i.top-a.top;l=Math.max(0,Math.min(a.width-e,l)),s=Math.max(0,Math.min(a.height-n,s)),t.style.left=l+"px",t.style.top=s+"px",t.style.right="auto",t.style.bottom="auto",t.style.transform="none"}function Jt(t,a){var n,l,s,d,p,r,u,g,y,S;const i=document.getElementById(t);if(!i)return;i.classList.toggle("hidden",!a),localStorage.setItem("lumiv2-"+t,a?"1":"0"),a&&Sa(i);const e=a;t==="win-library"&&((n=document.getElementById("btnToggleLibrary"))==null||n.classList.toggle("active",e),(l=document.getElementById("menuToggleLibrary"))==null||l.classList.toggle("active",e)),t==="win-playlist"&&((s=document.getElementById("btnTogglePlaylist"))==null||s.classList.toggle("active",e),(d=document.getElementById("menuTogglePlaylist"))==null||d.classList.toggle("active",e)),t==="win-equalizer"&&((p=document.getElementById("btnToggleEq"))==null||p.classList.toggle("active",e),(r=document.getElementById("menuToggleEq"))==null||r.classList.toggle("active",e)),t==="win-lyrics"&&((u=document.getElementById("btnToggleLyrics"))==null||u.classList.toggle("active",e),(g=document.getElementById("menuToggleLyrics"))==null||g.classList.toggle("active",e)),t==="win-settings"&&((y=document.getElementById("btnOpenSettings"))==null||y.classList.toggle("active",e),(S=document.getElementById("menuToggleSettings"))==null||S.classList.toggle("active",e))}lt||ba.forEach(t=>{const a=localStorage.getItem("lumiv2-"+t);a!==null?Jt(t,a==="1"):t==="win-settings"?Jt(t,!1):Jt(t,!0)});Object.entries(Fe).forEach(([t,a])=>{var i;(i=document.getElementById(t))==null||i.addEventListener("click",()=>me(a))});document.querySelectorAll("[data-close]").forEach(t=>{t.addEventListener("click",()=>{const a=t.dataset.close;Jt(a,!1)})});let yt=null,Lt=null,_e=10;function ie(t){_e++,t.style.zIndex=String(_e),document.querySelectorAll(".float-win").forEach(a=>a.classList.remove("active")),t.classList.add("active")}document.querySelectorAll(".float-win").forEach(t=>{t.addEventListener("mousedown",()=>ie(t))});document.querySelectorAll("[data-drag]").forEach(t=>{t.addEventListener("mousedown",a=>{if(a.target.closest("button")||a.target.closest("input")||a.target.closest("select"))return;const i=t.dataset.drag,e=document.getElementById(i);ie(e),e.classList.add("dragging");const n=e.getBoundingClientRect();yt={id:i,startX:a.clientX,startY:a.clientY,initX:n.left,initY:n.top,width:n.width,height:n.height}})});document.querySelectorAll("[data-resize]").forEach(t=>{t.addEventListener("mousedown",a=>{a.stopPropagation();const i=t.dataset.resize,e=document.getElementById(i);ie(e),e.classList.add("resizing");const n=e.getBoundingClientRect();Lt={id:i,startX:a.clientX,startY:a.clientY,initW:n.width,initH:n.height}})});window.addEventListener("mousemove",t=>{if(yt){const a=document.getElementById(yt.id);let i=t.clientX-yt.startX,e=t.clientY-yt.startY,n=yt.initX+i,l=yt.initY+e;if(ee&&!window.matchMedia("(max-width: 860px)").matches){const s=ee.getBoundingClientRect(),d=s.left,p=s.right-yt.width,r=s.top,u=s.bottom-yt.height;n=Math.max(d,Math.min(p,n))-s.left,l=Math.max(r,Math.min(u,l))-s.top}a.style.left=n+"px",a.style.top=l+"px",a.style.right="auto",a.style.bottom="auto",a.style.transform="none"}if(Lt){const a=document.getElementById(Lt.id);let i=Lt.initW+(t.clientX-Lt.startX),e=Lt.initH+(t.clientY-Lt.startY);i=Math.max(260,i),e=Math.max(160,e),a.style.width=i+"px",a.style.height=e+"px"}});window.addEventListener("mouseup",()=>{if(yt){const t=document.getElementById(yt.id);t&&(t.classList.remove("dragging"),localStorage.setItem("lumiv2-pos-"+yt.id,JSON.stringify({left:t.style.left,top:t.style.top}))),yt=null}if(Lt){const t=document.getElementById(Lt.id);t&&(t.classList.remove("resizing"),localStorage.setItem("lumiv2-size-"+Lt.id,JSON.stringify({width:t.style.width,height:t.style.height}))),Lt=null}});async function je(){const t=window.LumiLibrary,a=window.LumiPlayer;if(it){try{const{open:e}=await Y(async()=>{const{open:d}=await import("./index-CS3Qnt9j.js");return{open:d}},__vite__mapDeps([5,1])),n=await e({multiple:!0,filters:[{name:"Audio",extensions:["mp3","flac","wav","aac","ogg","m4a","alac","opus","wma","aiff"]}]});if(!n)return;const l=Array.isArray(n)?n:[n],s=await(t==null?void 0:t.importPaths(l,"replace"))||[];s.length&&(D("melo:play-tracks",{tracks:s,index:0}),ut(`${s.length} file(s) added`))}catch{ut("Error opening files")}return}const i=document.createElement("input");i.type="file",i.multiple=!0,i.accept="audio/*,.mp3,.flac,.wav,.aac,.ogg,.m4a,.alac,.opus,.wma,.aiff",i.onchange=async()=>{const e=Array.from(i.files||[]);if(!e.length)return;const n=[];for(const l of e){const s=l.path,d=s||URL.createObjectURL(l),p=l.name,r=p.lastIndexOf("."),u=r>0?p.slice(0,r):p,g=r>0?p.slice(r+1).toUpperCase():"AUDIO",y={id:s||"imp_"+Math.random().toString(36).slice(2,9),title:u,artist:"Unknown Artist",album:"Single",duration:0,path:d,codec:g,specs:"Local File",source:"import"};await Be(l,y),n.push(y)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(l=>a==null?void 0:a.queue.push(l)),D("melo:play-tracks",{tracks:n,index:0}),ut(`${n.length} file(s) added`)},i.click()}async function Ge(){const t=window.LumiLibrary,a=window.LumiPlayer;if(it){try{const{open:e}=await Y(async()=>{const{open:s}=await import("./index-CS3Qnt9j.js");return{open:s}},__vite__mapDeps([5,1])),n=await e({directory:!0});if(!n)return;const l=n;await(t==null?void 0:t.scanFolder(l,!0))}catch{ut("Error scanning folder")}return}const i=document.createElement("input");i.type="file",i.webkitdirectory=!0,i.multiple=!0,i.accept="audio/*",i.onchange=async()=>{const e=Array.from(i.files||[]).filter(l=>/\.(mp3|flac|wav|aac|ogg|m4a|alac|opus|wma|aiff)$/i.test(l.name));if(!e.length)return;const n=[];for(const l of e){const s=l.path,d=s||URL.createObjectURL(l),p=l.name,r=p.lastIndexOf("."),u=r>0?p.slice(0,r):p,g=r>0?p.slice(r+1).toUpperCase():"AUDIO",y={id:s||"imp_"+Math.random().toString(36).slice(2,9),title:u,artist:"Unknown Artist",album:"Folder Import",duration:0,path:d,codec:g,specs:"Local File",source:"import"};await Be(l,y),n.push(y)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(l=>a==null?void 0:a.queue.push(l)),D("melo:play-tracks",{tracks:n,index:0}),ut(`${n.length} file(s) added from folder`)},i.click()}document.addEventListener("click",t=>{var i;const a=(i=t.target)==null?void 0:i.closest("#btnAddFiles, #btnAddFolder, #btnThemeToggle");a&&(a.id==="btnAddFiles"?je():a.id==="btnAddFolder"?Ge():a.id==="btnThemeToggle"&&We(At==="light"?"dark":"light"))});window.addEventListener("keydown",t=>{(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="o"&&(t.shiftKey?(t.preventDefault(),Ge()):(t.preventDefault(),je())),((t.ctrlKey||t.metaKey)&&t.key===","||t.key==="F2")&&(t.preventDefault(),me("win-settings"))});function Te(t){var y,S;function a(k){document.querySelectorAll(".settings-tab").forEach(h=>{h.classList.toggle("active",h.dataset.stab===k)}),document.querySelectorAll(".settings-section[data-panel]").forEach(h=>{h.classList.toggle("active",h.dataset.panel===k)}),localStorage.setItem("melo-settings-tab",k)}document.querySelectorAll(".settings-tab").forEach(k=>{k.addEventListener("click",()=>a(k.dataset.stab))}),a(localStorage.getItem("melo-settings-tab")||"general"),document.querySelectorAll(".switch[data-key]").forEach(k=>{const h=k.dataset.key,z=localStorage.getItem("melo-pref-"+h);z!==null&&k.classList.toggle("on",z==="1"),k.onclick=()=>{k.classList.toggle("on");const P=k.classList.contains("on");localStorage.setItem("melo-pref-"+h,P?"1":"0"),D("melo:pref-changed",{key:h,value:P})}});const i=document.getElementById("setLanguage");i&&(i.value=ya(),i.onchange=async()=>{await Ne(i.value),t(`Language set to ${i.options[i.selectedIndex].text} — restart Melo to fully apply`)});const e=document.getElementById("swDynamicTheme");if(e){const k=localStorage.getItem("melo-dynamic-theme")!=="0";e.classList.toggle("on",k),e.onclick=()=>{var x,et;const h=!e.classList.contains("on");e.classList.toggle("on",h),localStorage.setItem("melo-dynamic-theme",h?"1":"0");const z=window.__LUMI_QUEUE__,P=(et=(x=window.LumiPlayer)==null?void 0:x.currentIndex)!=null?et:0;z&&z[P]&&Pe(h?z[P].cover:null)}}const n=document.getElementById("skinSelect"),l=document.getElementById("btnSkinThemeToggle"),s=document.getElementById("btnRefreshSkins"),d=document.getElementById("btnOpenSkinsFolder"),p=document.getElementById("skinThemeIcon"),r=document.getElementById("skinThemeLabel");function u(k){p&&(p.textContent=k==="dark"?"🌙":"☀️"),r&&(r.textContent=k==="dark"?"Dark":"Light")}u(At),l==null||l.addEventListener("click",()=>{const k=At==="dark"?"light":"dark";We(k),u(k),t(k==="dark"?"Dark theme":"Light theme")}),at("melo:theme",k=>{(k==="light"||k==="dark")&&u(k)});async function g(){if(!n)return;const k=localStorage.getItem("melo-active-skin-id")||"default",h=await Re();n.innerHTML=`
      <option value="default">Default Melo (Standard)</option>
      <option value="compact-pill">Minimal Compact (Pill Bar)</option>
    `,h.forEach(z=>{if(z.filename!=="compact-pill.html"&&z.filename!=="compact-pill-light.html"&&z.filename!=="compact-pill-dark.html"){const P=document.createElement("option");P.value=z.filename,P.textContent=`${z.name} (${z.filename})`,n.appendChild(P)}}),n.value=k}g(),n&&(n.onchange=()=>{const k=n.value;qt(k,At,t)}),s==null||s.addEventListener("click",async()=>{await g();const k=localStorage.getItem("melo-active-skin-id")||"default";qt(k,At,t),t("Skins reloaded from disk")}),d==null||d.addEventListener("click",()=>{$e(t)}),(y=document.getElementById("btn-reset-skin-settings"))==null||y.addEventListener("click",()=>{de(t),n&&(n.value="default")}),(S=document.getElementById("btn-settings-reset"))==null||S.addEventListener("click",()=>{localStorage.clear(),t("Settings reset — reloading..."),setTimeout(()=>location.reload(),600)})}function Ye(){document.querySelectorAll(".win-btn").forEach(t=>{t.onclick=async()=>{const a=t.getAttribute("aria-label");if(window.__TAURI__){const{getCurrentWindow:i}=await Y(async()=>{const{getCurrentWindow:n}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:n}},__vite__mapDeps([8,7,1,0])),e=i();a==="minimize"?e.minimize():a==="close"&&e.close()}else a==="close"&&ut("Window close requires the Tauri desktop build")}})}Ye();window.__LUMI_REBIND_MAIN__=()=>{Ye(),Object.entries(Fe).forEach(([t,a])=>{const i=document.getElementById(t);i&&(i.onclick=()=>me(a))})};const Dt=document.createElement("div");Dt.id="aboutPop";Dt.style.display="none";document.body.appendChild(Dt);document.addEventListener("click",t=>{var a,i;(a=t.target)!=null&&a.closest("#btnAbout")&&(t.stopPropagation(),Dt.innerHTML=`
    <div class="about-head">Melo <b>0.5.1 Beta</b></div>
    <div style="font-size:11.5px; color:var(--text-soft); margin:6px 0 10px;">
      Modern Windows Music Player<br/>
      Tauri 2 + TypeScript + Rust
    </div>
    <a class="about-link" id="aboutLink" href="https://github.com/Arvanta/Melo" rel="noopener">github.com/Arvanta/Melo ↗</a>`,Dt.style.display=Dt.style.display==="none"?"block":"none",(i=document.getElementById("aboutLink"))==null||i.addEventListener("click",e=>{e.preventDefault();const n="https://github.com/Arvanta/Melo";it?Y(()=>import("./core-DhEqZVGG.js"),[]).then(l=>l.invoke("open_url",{url:n})).catch(()=>window.open(n,"_blank")):window.open(n,"_blank")}))});document.addEventListener("click",t=>{!t.target.closest("#aboutPop")&&!t.target.closest("#btnAbout")&&(Dt.style.display="none")});it&&lt?lt==="library"||lt==="playlist"?Se(Et,ut):lt==="equalizer"?Ee(Et,ut,{remote:!0}):lt==="lyrics"?Me(Et):lt==="settings"&&(Ie(),Te(ut)):(pa(Et,ut),Se(Et,ut),Ee(Et,ut),ma(Et),Me(Et),ga(ut),Te(ut),Ie(),setTimeout(async()=>{if(localStorage.getItem("melo-pref-resume")!=="0")try{const t=JSON.parse(localStorage.getItem("melo-resume-state")||"null"),a=window.LumiLibrary,i=window.LumiPlayer;if(!(t!=null&&t.trackId)||!a||!i)return;const e=await a.getTrack(t.trackId);if(!e)return;i.queue=[e],i.loadTrack(0,!0,t.position||0)}catch{}},500));
//# sourceMappingURL=index-D6jYAPJ7.js.map
