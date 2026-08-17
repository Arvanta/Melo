const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/event-CNdo2oXa.js","assets/core-DhEqZVGG.js","assets/index-DiyoAAdc.js","assets/index-CHth0gh2.js","assets/index-Bq0iOnRE.js","assets/index-CS3Qnt9j.js","assets/webviewWindow-mjQkSB26.js","assets/dpi-fvP-W2qr.js","assets/window-BWd3Cypy.js"])))=>i.map(i=>d[i]);
(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))e(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&e(l)}).observe(document,{childList:!0,subtree:!0});function i(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function e(o){if(o.ep)return;o.ep=!0;const n=i(o);fetch(o.href,n)}})();const La="modulepreload",Ta=function(t){return"/"+t},Be={},W=function(a,i,e){let o=Promise.resolve();if(i&&i.length>0){let l=function(c){return Promise.all(c.map(d=>Promise.resolve(d).then(x=>({status:"fulfilled",value:x}),x=>({status:"rejected",reason:x}))))};document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),p=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));o=l(i.map(c=>{if(c=Ta(c),c in Be)return;Be[c]=!0;const d=c.endsWith(".css"),x=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${x}`))return;const k=document.createElement("link");if(k.rel=d?"stylesheet":La,d||(k.as="script"),k.crossOrigin="",k.href=c,p&&k.setAttribute("nonce",p),document.head.appendChild(k),d)return new Promise((f,w)=>{k.addEventListener("load",f),k.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${c}`)))})}))}function n(l){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=l,window.dispatchEvent(s),!s.defaultPrevented)throw l}return o.then(l=>{for(const s of l||[])s.status==="rejected"&&n(s.reason);return a().catch(n)})},K=typeof window.__TAURI_INTERNALS__<"u"||typeof window.__TAURI__<"u";async function Y(t,a){if(K)try{const{emit:i}=await W(async()=>{const{emit:e}=await import("./event-CNdo2oXa.js");return{emit:e}},__vite__mapDeps([0,1]));await i(t,a);return}catch{}window.dispatchEvent(new CustomEvent(t,{detail:a}))}function X(t,a){K&&W(async()=>{const{listen:i}=await import("./event-CNdo2oXa.js");return{listen:i}},__vite__mapDeps([0,1])).then(({listen:i})=>{i(t,e=>{a(e.payload)})}).catch(()=>{}),window.addEventListener(t,i=>a(i.detail))}let et=null,be=null,ze=!1,it={total:0,currentSeq:null,currentTrack:null,currentPosition:0,shuffle:!1,repeat:"off",currentOrderIndex:null};const we=new Set;function Ge(t){if(!t)return null;let a=t.cover;return a&&be&&!/^(data:|blob:|https?:)/i.test(a)&&(a=be(a)),{...t,cover:a,source:"scan"}}function xe(t){var e,o,n,l,s;const a=Ge((e=t==null?void 0:t.currentTrack)!=null?e:null),i=(t==null?void 0:t.repeat)==="all"?"all":(t==null?void 0:t.repeat)==="one"?"one":"off";return{total:Number((o=t==null?void 0:t.total)!=null?o:0),currentSeq:(n=t==null?void 0:t.currentSeq)!=null?n:null,currentTrack:a,currentPosition:Number((l=t==null?void 0:t.currentPosition)!=null?l:0),shuffle:!!(t!=null&&t.shuffle),repeat:i,currentOrderIndex:(s=t==null?void 0:t.currentOrderIndex)!=null?s:null}}async function ut(){if(!ze){if(K){const t=await W(()=>import("./core-DhEqZVGG.js"),[]);et=t.invoke,be=t.convertFileSrc}ze=!0}}function ke(t,a=!0){it=t,a&&we.forEach(i=>{try{i(it)}catch{}})}async function Qe(){if(!(!K||!et))try{const t=await et("queue_get_state");ke(xe(t))}catch{}}async function _a(){return await ut(),K&&await Qe(),it}function Ye(t){we.add(t);try{t(it)}catch{}return()=>we.delete(t)}function qt(){return it}async function Je(t,a,i){if(await ut(),K&&et){const e=await et("queue_get_page",{search:i&&i.trim()?i:null,limit:t,offset:a});return{...e,items:(e.items||[]).map(o=>{const n=Ge(o);return n?{...n,seq:Number(o.seq)}:null}).filter(Boolean)}}return{items:[],total:0,limit:t,offset:a,currentSeq:null}}async function Lt(t,a){if(!et)return it;const i=await et(t,a);return ke(xe(i)),it}async function Rt(t,a={}){var i,e,o;return await ut(),et?Lt("queue_populate",{source:t,startSeq:(i=a.startSeq)!=null?i:null,startTrackId:(e=a.startTrackId)!=null?e:null,autoplay:(o=a.autoplay)!=null?o:!0}):it}async function le(t){return await ut(),!et||!t.length?it:Lt("queue_append",{trackIds:t})}async function Ia(t){return await ut(),!et||!t.length?it:Lt("queue_play_next",{trackIds:t})}async function Xe(t){return await ut(),et?Lt("queue_remove",{seq:t}):it}async function Ke(t,a){return await ut(),et?Lt("queue_reorder",{fromSeq:t,toSeq:a}):it}async function Ze(){return await ut(),et?Lt("queue_clear"):it}async function ta(){return await ut(),et?Lt("queue_next"):it}async function ea(){return await ut(),et?Lt("queue_prev"):it}async function se(t,a=0){return await ut(),et?Lt("queue_jump",{seq:t,position:a}):it}async function Ca(t){if(await ut(),!!et){it.currentPosition=t;try{await et("queue_set_position",{position:t})}catch{}}}async function aa(t){return await ut(),et?Lt("queue_set_shuffle",{enabled:t}):it}async function ia(t){return await ut(),et?Lt("queue_set_repeat",{mode:t}):it}async function Aa(t=100){return await ut(),et?et("queue_history",{limit:t}):[]}X("melo:queue-state",t=>{ke(xe(t))});X("melo:queue-refresh",()=>{Qe()});window.MeloQueue={get state(){return it},populate:Rt,append:le,playNext:Ia,remove:Xe,reorder:Ke,clear:Ze,next:ta,prev:ea,jump:se,setShuffle:aa,setRepeat:ia,page:Je,history:Aa};let Pe=!1;async function Ba(){if(!Pe){Pe=!0;try{const t=globalThis;if(typeof t.Buffer>"u"){const a=await W(()=>import("./index-DiyoAAdc.js").then(i=>i.i),__vite__mapDeps([2,3]));t.Buffer=a.Buffer}typeof t.process>"u"&&(t.process={env:{},browser:!0,nextTick:a=>setTimeout(a,0)})}catch{}}}async function za(t,a){var i;try{await Ba();const e=await W(()=>import("./index-Bq0iOnRE.js").then(c=>c.i),__vite__mapDeps([4,3])),o=e&&typeof e.parseBlob=="function"?e:e.default||e,n=await Promise.race([o.parseBlob(t),new Promise((c,d)=>setTimeout(()=>d(new Error("timeout")),1800))]),l=n==null?void 0:n.common;if(!l)return;l.title&&(a.title=l.title),l.artist?a.artist=l.artist:l.artists&&l.artists[0]&&(a.artist=l.artists[0]),l.album&&(a.album=l.album),l.genre&&l.genre[0]&&(a.genre=l.genre[0]),l.year&&(a.year=l.year);const s=(i=l.picture)==null?void 0:i[0];if(s&&s.data){const c=s.format||"image/jpeg",d=s.data;if(d.length>6e5)return;let x="";const k=8192;for(let f=0;f<d.length;f+=k){const w=d.subarray(f,f+k);x+=String.fromCharCode.apply(null,w)}a.cover=`data:${c};base64,${btoa(x)}`}const p=n==null?void 0:n.format;p&&p.duration&&!a.duration&&(a.duration=Math.floor(p.duration))}catch{}}async function na(t,a,i=1800){return await za(t,a),a}async function Pa(t){return new Promise(a=>{if(!t)return a(null);const i=new Image;i.crossOrigin="anonymous",i.onload=()=>{try{const e=document.createElement("canvas"),o=e.getContext("2d");if(!o)return a(null);e.width=40,e.height=40,o.drawImage(i,0,0,40,40);const n=o.getImageData(0,0,40,40).data;let l={r:42,g:123,b:214},s=-1;for(let p=0;p<n.length;p+=4){const c=n[p],d=n[p+1],x=n[p+2];if(n[p+3]<128)continue;const f=Math.max(c,d,x),w=Math.min(c,d,x),u=(f+w)/510,A=f-w,T=A===0?0:A/(1-Math.abs(2*u-1));if(T>.25&&u>.25&&u<.82){const D=T*1.5+(1-Math.abs(u-.5));D>s&&(s=D,l={r:c,g:d,b:x})}}s>0?a(l):a(null)}catch{a(null)}},i.onerror=()=>a(null),i.src=t})}async function oa(t){const a=localStorage.getItem("melo-dynamic-theme")!=="0",i=document.documentElement;if(!a||!t){i.style.removeProperty("--accent"),i.style.removeProperty("--visualizer"),i.style.removeProperty("--accent-glow");return}const e=await Pa(t);if(e){const o=`rgb(${e.r}, ${e.g}, ${e.b})`;i.style.setProperty("--accent",o),i.style.setProperty("--visualizer",o),i.style.setProperty("--accent-glow",`rgba(${e.r}, ${e.g}, ${e.b}, 0.35)`)}else i.style.removeProperty("--accent"),i.style.removeProperty("--visualizer"),i.style.removeProperty("--accent-glow")}const Zt=[31,62,125,250,500,1e3,2e3,4e3,8e3,16e3];let St=null,ge=null,ve=[],Xt=null,Qt=null;function ce(t){if(!St){const a=window.AudioContext||window.webkitAudioContext;St=new a;try{ge=St.createMediaElementSource(t)}catch{}if(ve=Zt.map(i=>{const e=St.createBiquadFilter();return e.type="peaking",e.frequency.value=i,e.Q.value=1.4,e.gain.value=0,e}),Xt=St.createGain(),Xt.gain.value=1,Qt=St.createAnalyser(),Qt.fftSize=2048,Qt.smoothingTimeConstant=.72,ge){let i=ge;for(const e of ve)i.connect(e),i=e;i.connect(Xt),Xt.connect(Qt),Qt.connect(St.destination)}}return{ctx:St,filters:ve,gain:Xt,analyser:Qt,async resume(){St&&St.state==="suspended"&&await St.resume().catch(()=>{})}}}async function qa(t,a){let i,e,o,n,l,s,p,c=null,d,x,k,f,w,u,A,T,D,G,J,P,v,m=null,S=!1,O=-1;await _a();function Z(r){if(!isFinite(r))return"0:00";const y=Math.floor(r/60),_=Math.floor(r%60).toString().padStart(2,"0");return`${y}:${_}`}function nt(){if(!d)return;const r=parseFloat(d.max)||100,y=parseFloat(d.value)||0,_=r>0?y/r*100:0;d.style.setProperty("--progress",_+"%")}function ot(){x&&x.style.setProperty("--vol",x.value+"%")}function st(){u&&(u.classList.toggle("muted",t.muted),u.title=t.muted?"Unmute":"Mute")}function mt(r=!0){t.muted=!t.muted,st(),r&&a(t.muted?"Muted":"Unmuted")}async function Tt(r){if(!r)return"";if(/^(https?|data|blob):/.test(r))return r;if(K)try{const{convertFileSrc:y}=await W(async()=>{const{convertFileSrc:_}=await import("./core-DhEqZVGG.js");return{convertFileSrc:_}},[]);return y(r)}catch{}return r}function wt(r){try{if(!r){localStorage.removeItem("melo-current-track");return}const{cover:y,..._}=r;localStorage.setItem("melo-current-track",JSON.stringify(_))}catch{}}function Pt(r){if(!r){document.querySelectorAll(".track-row.active").forEach(y=>y.classList.remove("active"));return}document.querySelectorAll(".track-row").forEach(y=>{y.classList.toggle("active",y.getAttribute("data-track-id")===r||y.getAttribute("data-pl-track")===r)})}async function xt(r,y,_){if(m=r,A||C(),!r){t.pause(),t.removeAttribute("src"),t.load(),A&&(A.textContent="No track loaded"),T&&(T.textContent="Add music to start playing"),D&&(D.textContent=""),G&&(G.textContent="—"),J&&(J.textContent=""),P&&(P.style.display="none"),v&&(v.style.display="grid"),d&&(d.max="240",d.value="0",nt()),f&&(f.textContent="0:00"),k&&(k.textContent="0:00"),e&&(e.style.display="block"),o&&(o.style.display="none"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="none"),Pt(),wt(null),window.dispatchEvent(new CustomEvent("melo:trackChange",{detail:null})),Y("melo:track-changed",null),Y("melo:playback-state",{track:null,currentTime:0,paused:!0});return}if(t.src=await Tt(r.path),t.load(),_&&_>0){const H=()=>{t.removeEventListener("loadedmetadata",H);try{t.currentTime=_}catch{}};t.addEventListener("loadedmetadata",H)}A&&(A.textContent=r.title||"Unknown Title"),T&&(T.textContent=r.artist||"Unknown Artist"),D&&(D.textContent=r.album||""),G&&(G.textContent=r.codec||"AUDIO"),J&&(J.textContent=r.specs||""),r.cover&&P?(P.src=r.cover,P.style.display="block",v&&(v.style.display="none")):(P&&(P.style.display="none"),v&&(v.style.display="grid")),d&&(d.max=String(r.duration||240),d.value="0",nt()),f&&(f.textContent=Z(r.duration)),k&&(k.textContent="0:00"),I(),oa(r.cover||null),Pt(r.id),"mediaSession"in navigator&&(navigator.mediaSession.metadata=new MediaMetadata({title:r.title,artist:r.artist,album:r.album,artwork:r.cover?[{src:r.cover,sizes:"512x512",type:"image/jpeg"}]:[]}),navigator.mediaSession.setActionHandler("play",()=>yt()),navigator.mediaSession.setActionHandler("pause",()=>_t()),navigator.mediaSession.setActionHandler("previoustrack",()=>M()),navigator.mediaSession.setActionHandler("nexttrack",()=>b()),navigator.mediaSession.setActionHandler("seekto",H=>{H.seekTime&&(t.currentTime=H.seekTime)})),wt(r),window.dispatchEvent(new CustomEvent("melo:trackChange",{detail:r})),Y("melo:track-changed",r),Y("melo:playback-state",{track:r,currentTime:t.currentTime||_||0,paused:t.paused}),y?yt():(e&&(e.style.display="block"),o&&(o.style.display="none"))}let ft=!1;async function dt(){try{await ce(t).resume()}catch{}ft&&(ft=!1,t.play().then(()=>{e&&(e.style.display="none"),o&&(o.style.display="block")}).catch(()=>{}))}window.addEventListener("pointerdown",dt),window.addEventListener("keydown",dt),X("melo:pref-changed",r=>{r&&r.key==="replayGainGlobal"&&I(),r&&r.key==="showStopBtn"&&$(!!r.value)}),X("melo:request-playback-state",()=>{Y("melo:playback-state",{track:m,currentTime:t.currentTime||0,paused:t.paused})}),X("melo:seek-playback",r=>{const y=Number(r);Number.isFinite(y)&&y>=0&&(t.currentTime=y)});let Ct=null,kt=!1;function vt(r,y,_){Ct&&cancelAnimationFrame(Ct);const H=t.volume,at=performance.now(),U=bt=>{const Wt=Math.min(1,(bt-at)/y);t.volume=H+(r-H)*Wt,Wt<1?Ct=requestAnimationFrame(U):(Ct=null,_==null||_())};Ct=requestAnimationFrame(U)}async function yt(){try{await ce(t).resume()}catch{}const r=localStorage.getItem("melo-pref-fadePause")==="1",y=E();r&&kt&&(t.volume=0),t.play().then(()=>{ft=!1,e&&(e.style.display="none"),o&&(o.style.display="block"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="playing"),r&&kt?(kt=!1,vt(y,300)):t.volume=y}).catch(()=>{ft||(ft=!0,a("Click once inside player to begin audio playback"))})}function _t(){localStorage.getItem("melo-pref-fadePause")==="1"&&!t.paused?(kt=!0,vt(0,300,()=>t.pause())):(kt=!1,t.pause()),e&&(e.style.display="block"),o&&(o.style.display="none"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}function At(){if(!m){const r=qt();if(r.currentSeq!=null){se(r.currentSeq,0);return}return}t.paused?yt():_t()}function g(){t.pause();try{t.currentTime=0}catch{}e&&(e.style.display="block"),o&&(o.style.display="none"),d&&(d.value="0",nt()),k&&(k.textContent="0:00"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}async function b(){if(!m)return;if(qt().repeat==="one"){try{t.currentTime=0}catch{}yt();return}await ta()}async function M(){if(m){if(t.currentTime>3){t.currentTime=0;return}await ea()}}function E(){var at;if(!x)return 1;const r=parseInt(x.value,10)/100,_=localStorage.getItem("melo-pref-replayGainGlobal")!=="0"&&(at=m==null?void 0:m.replayGain)!=null?at:0,H=Math.pow(10,_/20);return Math.min(1,Math.max(0,r*H))}function I(){!m||!x||(t.volume=E())}function $(r=localStorage.getItem("melo-pref-showStopBtn")==="1"){const y=document.getElementById("btnStop");y&&y.style.setProperty("display",r?"inline-flex":"none","important")}function q(r){if(s&&s.classList.toggle("active",r.shuffle),p){p.classList.toggle("active",r.repeat!=="off");const y={off:"Repeat off",all:"Repeat all",one:"Repeat one"};p.title=y[r.repeat]}}function C(){i=document.getElementById("btnPlay"),e=document.getElementById("iconPlay"),o=document.getElementById("iconPause"),n=document.getElementById("btnPrev"),l=document.getElementById("btnNext"),s=document.getElementById("btnShuffle"),p=document.getElementById("btnRepeat"),c=document.getElementById("btnStop"),$(),d=document.getElementById("seekBar"),x=document.getElementById("volBar"),k=document.getElementById("curTime"),f=document.getElementById("durTime"),w=document.getElementById("volPct"),u=document.getElementById("volIcon"),u&&(u.onclick=()=>mt()),st(),A=document.getElementById("trackTitle"),T=document.getElementById("trackArtist"),D=document.getElementById("trackAlbum"),G=document.getElementById("trackCodec"),J=document.getElementById("trackSpecs"),P=document.getElementById("coverImg"),v=document.getElementById("coverFallback"),i&&(i.onclick=At),c&&(c.onclick=g),n&&(n.onclick=M),l&&(l.onclick=b),s&&(s.onclick=async()=>{const y=!qt().shuffle;await aa(y),a(y?"Shuffle on":"Shuffle off")}),p&&(p.onclick=async()=>{const r=qt(),y=r.repeat==="off"?"all":r.repeat==="all"?"one":"off";await ia(y),a({off:"Repeat off",all:"Repeat all",one:"Repeat one"}[y])}),d&&(d.oninput=()=>{S=!0,k&&(k.textContent=Z(parseFloat(d.value))),nt()},d.onchange=()=>{t.currentTime=parseFloat(d.value),S=!1}),x&&(x.oninput=()=>{ot(),w&&(w.textContent=x.value+"%"),I()}),nt(),ot(),q(qt()),m&&(A&&(A.textContent=m.title||"Unknown Title"),T&&(T.textContent=m.artist||"Unknown Artist"),D&&(D.textContent=m.album||""),G&&(G.textContent=m.codec||"AUDIO"),J&&(J.textContent=m.specs||""),m.cover&&P&&(P.src=m.cover,P.style.display="block",v&&(v.style.display="none")))}C(),Ye(r=>{q(r);const y=m==null?void 0:m.id,_=r.currentTrack;if((_==null?void 0:_.id)!==y){const H=r.currentSeq!=null&&r.currentTrack!=null&&y!=null;xt(_,H);return}if(_&&Number.isFinite(r.currentPosition)&&Math.abs(r.currentPosition-(t.currentTime||0))>1.5)try{t.currentTime=r.currentPosition}catch{}}),X("melo:queue-populated",r=>{const y=qt();if(!y.currentTrack)return;const _=(r==null?void 0:r.autoplay)!==!1;(m==null?void 0:m.id)!==y.currentTrack.id&&xt(y.currentTrack,_,y.currentPosition||0)}),document.addEventListener("wheel",r=>{const y=r.target;if(!(y!=null&&y.closest("#playerCard"))||!x)return;r.preventDefault();const _=r.deltaY<0?5:-5;x.value=String(Math.max(0,Math.min(100,Number(x.value)+_))),x.dispatchEvent(new Event("input"))},{passive:!1});async function B(r=!1){const y=t.currentTime||0;if(!(!r&&Math.abs(y-O)<5)){O=y;try{localStorage.setItem("melo-resume-state",JSON.stringify({trackId:(m==null?void 0:m.id)||null,position:y}))}catch{}await Ca(y)}}t.addEventListener("timeupdate",()=>{Y("melo:playback-position",t.currentTime||0),!S&&d&&k&&(d.value=String(Math.floor(t.currentTime)),k.textContent=Z(t.currentTime),nt()),B(!1)}),t.addEventListener("loadedmetadata",()=>{if(!d||!f)return;const r=Math.floor(t.duration||(m==null?void 0:m.duration)||240);d.max=String(r),f.textContent=Z(r),nt()}),t.addEventListener("ended",()=>{b()}),t.addEventListener("pause",()=>{e&&(e.style.display="block"),o&&(o.style.display="none"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused"),m&&B(!0)}),t.addEventListener("error",()=>{m&&(a("Could not play this track — skipping"),b())}),window.addEventListener("keydown",r=>{r.target.tagName!=="INPUT"&&(r.code==="Space"&&(r.preventDefault(),At()),r.code==="ArrowRight"&&(t.currentTime+=5),r.code==="ArrowLeft"&&(t.currentTime-=5),(r.key==="m"||r.key==="M")&&mt(),(r.key==="s"||r.key==="S")&&s&&s.click(),(r.key==="r"||r.key==="R")&&p&&p.click(),r.code==="ArrowUp"&&x&&(x.value=String(Math.min(100,parseInt(x.value,10)+5)),x.dispatchEvent(new Event("input"))),r.code==="ArrowDown"&&x&&(x.value=String(Math.max(0,parseInt(x.value,10)-5)),x.dispatchEvent(new Event("input"))))}),X("melo:tray-action",r=>{r==="play_pause"?At():r==="next"?b():r==="prev"?M():r==="mute"&&mt()}),window.MeloPlayer={get currentTrack(){return m},get currentIndex(){var r;return(r=qt().currentOrderIndex)!=null?r:0},loadTrack:async(r,y=!0,_)=>{await se(r,_||0)},play:yt,pause:_t,stop:g,next:b,prev:M,get audio(){return t},rebind:C},window.__MELO_REBIND__=C;const N=qt();N.currentTrack&&N.currentPosition>1?xt(N.currentTrack,!1,N.currentPosition):N.currentTrack&&xt(N.currentTrack,!1)}const oe=new URLSearchParams(location.search).get("panel")||"main",j=t=>String(t!=null?t:"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");function qe(t){const a=Number.isFinite(t)?Math.max(0,t):0;return`${Math.floor(a/60)}:${String(Math.floor(a%60)).padStart(2,"0")}`}function Re(t,a){const i=document.getElementById("trackList"),e=document.getElementById("libraryStats"),o=document.getElementById("searchInput"),n=document.getElementById("libraryTabs"),l=document.getElementById("btn-scan"),s=document.getElementById("btn-clear-library"),p=document.getElementById("winPlaylistTracks"),c=document.getElementById("winPlaylistEmpty"),d=document.getElementById("playlistSearchInput"),x=document.getElementById("queueCount"),k=document.getElementById("btn-clear-playlist");let f=null,w=null,u=!1,A=[],T=null,D=null,G=!1,J=[],P=null;const v=new Map;let m="artists",S=null,O=null,Z=null,nt="";const ot=54,st=52;let mt=0,Tt=0,wt=0,Pt=0,xt=0,ft=null;const dt=document.createElement("div");dt.className="ctx-menu",dt.style.display="none",dt.innerHTML='<button class="ctx-item danger" id="ctxRemoveLibraryTrack">Remove from Library</button>',document.body.appendChild(dt),document.addEventListener("click",h=>{h.target.closest("#ctxRemoveLibraryTrack")||(dt.style.display="none")}),dt.querySelector("#ctxRemoveLibraryTrack").onclick=async h=>{h.stopPropagation(),!(!f||!ft)&&(await f("delete_tracks",{ids:[ft]}),dt.style.display="none",ft=null,Y("melo:library-changed",{removed:1}))};function Ct(){return new Promise(h=>{const L=document.createElement("div");L.className="confirm-overlay",L.innerHTML=`<div class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="clearLibraryTitle">
        <div id="clearLibraryTitle" class="confirm-title">Clear Library?</div>
        <div class="confirm-message">All tracks will be removed from Library browsing. Your playlists and their tracks will remain unchanged.</div>
        <div class="confirm-actions"><button class="btn small" data-confirm="cancel">Cancel</button><button class="btn small danger-confirm" data-confirm="yes">Clear Library</button></div>
      </div>`,document.body.appendChild(L);const z=R=>{document.removeEventListener("keydown",V),L.remove(),h(R)};L.querySelector("[data-confirm='cancel']").onclick=()=>z(!1),L.querySelector("[data-confirm='yes']").onclick=()=>z(!0),L.onclick=R=>{R.target===L&&z(!1)};const V=R=>{R.key==="Escape"&&(document.removeEventListener("keydown",V),z(!1))};document.addEventListener("keydown",V)})}function kt(h){const L=l==null?void 0:l.querySelector(".scan-label");L&&(L.textContent=h)}function vt(h){if(!h)return"";if(/^(data:|blob:|https?:)/i.test(h))return h;try{return w?w(h):""}catch{return""}}function yt(h){return{...h,cover:vt(h.cover),source:"scan"}}const _t=[],At=new Set;let g=0;function b(h,L){!h||!f||At.has(h)||(At.add(h),_t.push({id:h,element:L}),M())}function M(){for(;f&&g<2&&_t.length;){const h=_t.shift();g++,f("ensure_track_artwork",{id:h.id}).then(L=>{if(!L||!h.element.isConnected)return;const z=vt(L),V=J.find(R=>R.id===h.id);V&&(V.cover=z),h.element.style.backgroundImage=`url("${z.replace(/"/g,"%22")}")`,h.element.textContent=""}).catch(()=>{}).finally(()=>{g--,At.delete(h.id),M()})}}function E(){P&&document.querySelectorAll(".track-row").forEach(h=>{const L=h,z=L.dataset.trackId||L.dataset.plTrack;L.classList.toggle("active",z===P)})}function I(h){const L=[...h.querySelectorAll("[data-artwork-id]")];if(!("IntersectionObserver"in window)){L.forEach(V=>b(V.dataset.artworkId,V));return}const z=new IntersectionObserver(V=>{V.forEach(R=>{if(!R.isIntersecting)return;const F=R.target;z.unobserve(F),b(F.dataset.artworkId,F)})},{root:h,rootMargin:"120px"});L.forEach(V=>z.observe(V))}async function $(){if(u)return;if(!K){u=!0,q();return}const h=await W(()=>import("./core-DhEqZVGG.js"),[]);f=h.invoke,w=h.convertFileSrc,u=!0,await Promise.all([C(),B()]),await U(!0),await Ut(!0)}function q(){i&&(i.innerHTML='<div style="padding:30px;text-align:center;color:var(--text-muted)">The persistent Library is available in the Tauri desktop build.</div>')}async function C(){if(!(!f||!e))try{const h=await f("library_stats");e.textContent=`${h.tracks} tracks • ${h.artists} artists • ${h.albums} albums`}catch{}}async function B(){if(f)try{A=await f("list_playlists")}catch{}}function N(){S=O=Z=null,i&&(i.scrollTop=0)}function r(){return m==="artists"?S?"tracks":"groups":m==="albums"?O?"tracks":"groups":Z?"tracks":"groups"}function y(){return m}function _(){return m==="artists"&&S?O?`${S} › ${O}`:S:m==="albums"&&O?O:m==="genres"&&Z?Z:""}async function H(h,L){if(!f)return{items:[],total:0,limit:L,offset:h};if(r()==="groups")return f("library_groups",{kind:y(),search:nt||null,artist:m==="artists"?S:null,limit:L,offset:h});const z=await f("library_tracks",{search:nt||null,artist:S,album:O,genre:Z,sort:"title-asc",limit:L,offset:h});return z.items=z.items.map(yt),J=z.items,z}async function at(h){const L=v.get(h);if(L)return L;if(!f)return[];const z=await f("library_groups",{kind:"albums",search:null,artist:h,limit:500,offset:0});return v.set(h,z.items),z.items}async function U(h=!1){if(!i||!f)return;h&&(i.scrollTop=0),i.style.display="block",i.style.position="relative",i.style.overflowY="auto";const L=Math.max(300,i.clientHeight||420),z=m==="artists"&&!!S,V=_(),R=z?84:V?38:0,F=Math.ceil(L/ot),tt=Math.max(0,i.scrollTop-R),Ot=Math.max(0,Math.floor(tt/ot)-8),jt=Math.max(40,F+16),ae=++mt;try{const rt=z&&S?at(S):Promise.resolve(null),[ht,Q]=await Promise.all([H(Ot,jt),rt]);if(ae!==mt)return;const ie=ht.total*ot+R,fe=ht.items.map(($t,Yt)=>{const Jt=ht.offset+Yt,ne=R+Jt*ot;if(r()==="groups"){const Gt=$t,Ce=vt(Gt.cover),Ae=`lib-avatar ${y()==="albums"?"lib-avatar-album":""}`,Ma=y()==="albums"?"💿":j((Gt.name[0]||"?").toUpperCase()),Ea=Ce?`<div class="${Ae}" style="background-image:url('${j(Ce)}')"></div>`:`<div class="${Ae}" data-artwork-id="${j(Gt.artworkTrackId||"")}">${Ma}</div>`;return`<div class="lib-item virtual-row" data-group-index="${Yt}" style="position:absolute;left:0;right:0;top:${ne}px;height:${ot}px">${Ea}<div style="flex:1;min-width:0"><div class="t-title">${j(Gt.name)}</div><div class="t-artist">${j(Gt.subtitle||`${Gt.count} tracks`)}</div></div><span class="chev-r">›</span></div>`}const Bt=$t;return`<div class="track-row virtual-row" data-track-id="${j(Bt.id)}" data-page-index="${Yt}" style="position:absolute;left:0;right:0;top:${ne}px;height:${ot}px">
          <span class="num">${Jt+1}</span>
          ${Bt.cover?`<div class="track-cover-mini" style="background-image:url('${j(Bt.cover)}');background-size:cover;background-position:center"></div>`:`<div class="track-cover-mini cover-default" data-artwork-id="${j(Bt.id)}">♪</div>`}
          <div style="flex:1;min-width:0"><div class="t-title">${j(Bt.title)}</div><div class="t-artist">${j(Bt.artist)} • ${j(Bt.album)}</div></div>
          <span class="t-dur">${qe(Bt.duration)}</span>
          <button class="btn small ghost" data-add-track="${j(Bt.id)}" title="Add to queue">+</button>
        </div>`}).join(""),Sa=z&&Q?`<div class="artist-detail-header" style="position:sticky;top:0;height:${R}px;z-index:4;background:var(--card)">
            <div class="lib-crumb" style="height:38px"><button class="btn small" id="virtualBack">‹ Artists</button><b>${j(S)}</b></div>
            <div class="chip-row artist-album-chips custom-scrollbar" style="height:46px;padding-top:6px;padding-bottom:6px">
              <button class="chip ${O===null?"active":""}" data-artist-album="all">All Tracks</button>
              ${Q.map(($t,Yt)=>{const Jt=vt($t.cover),ne=Jt?`<span class="chip-thumb" style="background-image:url('${j(Jt)}')"></span>`:`<span class="chip-thumb cover-default" data-artwork-id="${j($t.artworkTrackId||"")}">♪</span>`;return`<button class="chip ${O===$t.name?"active":""}" data-artist-album-index="${Yt}">${ne}${j($t.name)}</button>`}).join("")}
            </div>
          </div>`:V?`<div class="lib-crumb virtual-crumb" style="position:sticky;top:0;height:${R}px;z-index:3;background:var(--card)"><button class="btn small" id="virtualBack">‹ Back</button><b>${j(V)}</b></div>`:"";i.innerHTML=`<div class="virtual-list-space" style="position:relative;height:${Math.max(ie,L)}px">${Sa}${fe}</div>`,Wt(ht.items,Q||[]),I(i),E()}catch{i.innerHTML='<div style="padding:24px;text-align:center;color:var(--text-muted)">Could not read the Library database.</div>'}}function bt(){return{type:"library",search:nt||null,artist:S,album:O,genre:Z,sort:"title-asc"}}function Wt(h,L=[]){var z,V;i&&(i.querySelectorAll("[data-group-index]").forEach(R=>{R.onclick=()=>{const F=h[Number(R.dataset.groupIndex||0)],tt=(F==null?void 0:F.name)||"",Ot=(F==null?void 0:F.key)||tt;if(m==="artists"&&!S)S=tt;else if(m==="artists"&&S||m==="albums"){const jt=Ot.split("\0");m==="albums"&&(S=jt[0]||null),O=jt[1]||tt}else m==="genres"&&(Z=tt);U(!0)}}),i.querySelectorAll("[data-add-track]").forEach(R=>{R.onclick=async F=>{F.stopPropagation(),R.dataset.addTrack&&(await le([R.dataset.addTrack]),a("Added to queue"))}}),i.querySelectorAll("[data-track-id]").forEach(R=>{R.onclick=async F=>{if(F.target.closest("[data-add-track]"))return;const tt=R.dataset.trackId||null,Ot=bt();await Rt(Ot,{autoplay:!0,startTrackId:tt})},R.oncontextmenu=F=>{F.preventDefault(),F.stopPropagation(),ft=R.dataset.trackId||null,dt.style.display="block";const tt=dt.getBoundingClientRect();dt.style.left=`${Math.max(6,Math.min(F.clientX,window.innerWidth-tt.width-6))}px`,dt.style.top=`${Math.max(6,Math.min(F.clientY,window.innerHeight-tt.height-6))}px`}}),(z=i.querySelector("#virtualBack"))==null||z.addEventListener("click",()=>{m==="artists"&&S?(S=null,O=null):O?O=null:S?S=null:Z=null,U(!0)}),(V=i.querySelector("[data-artist-album='all']"))==null||V.addEventListener("click",()=>{O=null,U(!0)}),i.querySelectorAll("[data-artist-album-index]").forEach(R=>{R.onclick=()=>{const F=L[Number(R.dataset.artistAlbumIndex||0)];O=(F==null?void 0:F.name)||null,U(!0)}}))}let Ft=null;async function Ut(h=!1){var ae;if(!p)return;h&&(p.scrollTop=0),p.style.display="block",p.style.position="relative",p.style.overflowY="auto";const L=Math.max(260,p.clientHeight||420),z=((ae=d==null?void 0:d.value)==null?void 0:ae.trim())||"",V=Math.max(0,Math.floor(p.scrollTop/st)-8),R=Math.max(40,Math.ceil(L/st)+16),F=++Tt;let tt;try{tt=await Je(R,V,z)}catch{return}if(F!==Tt)return;const Ot=tt.items;if(x&&(x.textContent=z?`${tt.total} matches`:`${tt.total} track${tt.total===1?"":"s"}`),c&&(c.style.display=tt.total?"none":"block"),p.style.display=tt.total?"block":"none",!tt.total){p.innerHTML="";return}const jt=Ot.map((rt,ht)=>{const Q=rt,ie=tt.offset+ht,fe=ie*st;return`<div class="track-row virtual-row queue-row" data-queue-seq="${j(Q.seq)}" data-track-id="${j(Q.id)}" draggable="${z?"false":"true"}" style="position:absolute;left:0;right:0;top:${fe}px;height:${st}px">
        <span class="num">${ie+1}</span>
        ${Q.cover?`<div class="track-cover-mini" style="background-image:url('${j(Q.cover)}');background-size:cover;background-position:center"></div>`:`<div class="track-cover-mini cover-default" data-artwork-id="${j(Q.id)}">♪</div>`}
        <div style="flex:1;min-width:0"><div class="t-title">${j(Q.title)}</div><div class="t-artist">${j(Q.artist)} • ${j(Q.album)}</div></div>
        <span class="t-dur">${qe(Q.duration)}</span>
        <button class="btn small ghost" data-remove-seq="${j(Q.seq)}" title="Remove from queue">×</button>
      </div>`}).join("");p.innerHTML=`<div style="position:relative;height:${Math.max(L,tt.total*st)}px">${jt}</div>`,I(p),E(),p.querySelectorAll(".queue-row").forEach(rt=>{rt.onclick=async ht=>{if(ht.target.closest("[data-remove-seq]"))return;const Q=Number(rt.dataset.queueSeq);Number.isFinite(Q)&&await se(Q,0)},rt.ondragstart=()=>{Ft=Number(rt.dataset.queueSeq),rt.classList.add("dragging")},rt.ondragend=()=>{rt.classList.remove("dragging"),Ft=null},rt.ondragover=ht=>{ht.preventDefault()},rt.ondrop=async ht=>{ht.preventDefault();const Q=Number(rt.dataset.queueSeq);Number.isFinite(Ft)&&Number.isFinite(Q)&&Ft!==Q&&!z&&await Ke(Ft,Q),Ft=null}}),p.querySelectorAll("[data-remove-seq]").forEach(rt=>{rt.onclick=async ht=>{ht.stopPropagation();const Q=Number(rt.dataset.removeSeq);Number.isFinite(Q)&&await Xe(Q)}})}async function _e(h,L="replace"){if(await $(),!f||!h.length)return[];const V=(await f("import_audio_files",{paths:h,playlistId:L==="none"?null:"p1",replacePlaylist:L==="replace"})).map(yt);return await Promise.all([C(),B(),U()]),Y("melo:library-changed",{imported:V.length}),V}async function he(h,L=!1){if(await $(),!f)return null;if(T)return T;const z=await f("start_library_scan",{path:h});return T=z.scanId,D=z.scanId,G=L,l&&kt("Cancel Scan"),T}async function xa(){if(!K)return;if(T&&f){await f("cancel_library_scan",{scanId:T});return}const{open:h}=await W(async()=>{const{open:z}=await import("./index-CS3Qnt9j.js");return{open:z}},__vite__mapDeps([5,1])),L=await h({directory:!0,multiple:!1});L&&await he(L)}async function ka(h){if(await $(),!f)return null;const L=await f("get_track_by_id",{id:h});return L?yt(L):null}n==null||n.querySelectorAll("[data-libtab]").forEach(h=>{h.onclick=()=>{n.querySelectorAll("[data-libtab]").forEach(L=>L.classList.remove("active")),h.classList.add("active"),m=h.dataset.libtab||"artists",N(),U(!0)}}),o==null||o.addEventListener("input",()=>{nt=o.value.trim(),window.clearTimeout(wt),wt=window.setTimeout(()=>U(!0),180)}),i==null||i.addEventListener("scroll",()=>{window.clearTimeout(wt),wt=window.setTimeout(()=>U(),60)}),p==null||p.addEventListener("scroll",()=>{window.clearTimeout(Pt),Pt=window.setTimeout(()=>Ut(),60)}),d==null||d.addEventListener("input",()=>{window.clearTimeout(xt),xt=window.setTimeout(()=>Ut(!0),160)}),l==null||l.addEventListener("click",xa),s==null||s.addEventListener("click",async()=>{if(f){if(T){alert("Cancel the active scan before clearing the Library database.");return}await Ct()&&(await f("clear_library_database"),J=[],v.clear(),await Promise.all([C(),B(),U(!0)]),Y("melo:library-changed",{cleared:!0}))}}),k==null||k.addEventListener("click",async()=>{await Ze()}),K&&W(async()=>{const{getCurrentWebviewWindow:h}=await import("./webviewWindow-mjQkSB26.js");return{getCurrentWebviewWindow:h}},__vite__mapDeps([6,7,1,0,8])).then(({getCurrentWebviewWindow:h})=>{h().onDragDropEvent(async L=>{if(L.payload.type!=="drop")return;const z=L.payload.paths||[];if(!z.length)return;const V=await _e(z,oe==="playlist"?"append":"none");if(V.length)oe==="playlist"?await le(V.map(R=>R.id)):await Rt({type:"tracks",ids:V.map(R=>R.id)},{autoplay:!0});else for(const R of z)try{await he(R,oe!=="playlist")}catch{}})}).catch(()=>{}),X("melo:scan-progress",async h=>{if(h){if(h.scanId&&(T=h.scanId),l&&!h.finished&&kt(`Cancel ${h.done||0}/${h.total||"…"}`),l){const L=h.total?Math.max(0,Math.min(100,Number(h.done||0)/Number(h.total)*100)):0;l.style.setProperty("--scan-progress",`${L}%`),l.classList.toggle("scanning",!h.finished)}h.finished&&(h.scanId===D&&G&&!h.cancelled&&await Rt({type:"scan",scanId:h.scanId},{autoplay:!0}),T=null,D=null,G=!1,l&&(kt("Scan"),l.classList.remove("scanning"),l.style.setProperty("--scan-progress","0%")),await Promise.all([C(),B(),U()]))}});let Ie=0;X("melo:library-changed",()=>{v.clear(),window.clearTimeout(Ie),Ie=window.setTimeout(()=>{C(),U()},500)}),X("melo:queue-changed",()=>Ut()),X("melo:queue-cleared",()=>Ut(!0)),window.MeloLibrary={get tracks(){return J},get playlists(){return A},scanFolder:he,importPaths:_e,getTrack:ka,render:()=>U(),addToCurrentPlaylist:async h=>{h.length&&await le(h.map(L=>L.id))},currentPlaylistName:()=>"Playing Queue"},Ye(h=>{var L;P=((L=h.currentTrack)==null?void 0:L.id)||null,E(),x&&(x.textContent=`${h.total} track${h.total===1?"":"s"}`)}),oe==="playlist"?$().then(()=>Ut(!0)).catch(()=>a("Could not initialize the Library database")):$().catch(()=>a("Could not initialize the Library database"))}const te={flat:[0,0,0,0,0,0,0,0,0,0],pop:[-1,2,4,4,2,-1,-1,2,3,3],rock:[4,3,2,-1,-2,-2,1,3,4,4],bass:[6,5,4,2,1,0,-1,-1,-2,-3],treble:[-3,-2,-1,0,1,2,3,5,6,6],dance:[5,4,2,0,-1,-1,2,4,5,3],jazz:[2,1,2,3,2,0,1,2,3,2],classical:[3,2,1,0,0,0,-1,2,3,4],vocal:[-2,-1,0,2,4,4,3,1,0,-1],acoustic:[3,2,1,1,2,2,3,3,2,1],hiphop:[5,4,1,2,-1,-1,1,-1,2,3],metal:[4,2,-1,-2,-1,1,3,4,5,4]};function ye(t){for(const[a,i]of Object.entries(te))if(i.every((e,o)=>e===t[o]))return a;return"custom"}function Oe(t,a,i={}){const e=!!i.remote,o=document.getElementById("eqEnable"),n=document.getElementById("eqPreset"),l=document.getElementById("btnEqReset"),s=document.getElementById("eqBands"),p=document.getElementById("eqCanvas"),c=p?p.getContext("2d"):null;let d=null,x=[],k=[],f=new Array(Zt.length).fill(0);try{const v=JSON.parse(localStorage.getItem("melo-eq-gains")||"null");Array.isArray(v)&&v.length===Zt.length&&(f=v.map(m=>typeof m=="number"?Math.max(-12,Math.min(12,m)):0))}catch{}let w=localStorage.getItem("melo-eq-preset")||ye(f),u=localStorage.getItem("melo-eq-enabled")!=="0";function A(){if(!d)try{const v=ce(t);d=v.ctx,x=v.filters,x.forEach((m,S)=>{m.gain.value=u?f[S]:0})}catch{}}function T(v,m){A(),x[v]&&u&&(x[v].gain.value=m)}function D(v){A(),f=[...v],u&&v.forEach((m,S)=>{x[S]&&(x[S].gain.value=m)}),P()}function G(v){A(),u=v,v?f.forEach((m,S)=>{x[S]&&(x[S].gain.value=m)}):x.forEach(m=>{m.gain.value=0}),P()}e||t&&t.addEventListener("play",()=>{A(),(d==null?void 0:d.state)==="suspended"&&d.resume().catch(()=>{})}),X("melo:eq",v=>{v&&(v.type==="gain"?(e||T(v.idx,v.val),f[v.idx]=v.val,k[v.idx]&&(k[v.idx].value=String(v.val),J(k[v.idx])),n&&(n.value=ye(f)),P()):v.type==="gains"?(e||D(v.values),f=[...v.values],k.length&&k.forEach((m,S)=>{m.value=String(f[S]),J(m)}),n&&v.preset&&(n.value=v.preset),P()):v.type==="enable"&&(u=!!v.on,e||G(u),o&&(o.checked=u),P()))});function J(v){var O;const m=parseInt(v.value),S=(O=v.parentElement)==null?void 0:O.querySelector(".val");S&&(S.textContent=(m>0?"+":"")+m+"dB")}function P(){if(!p||!c)return;const v=window.devicePixelRatio||1,m=p.clientWidth*v,S=p.clientHeight*v;if(m<=0||S<=0)return;p.width=m,p.height=S,c.clearRect(0,0,m,S);const O=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#2a7bd6",Z=f;if(!u){c.strokeStyle="rgba(100,120,150,0.25)",c.lineWidth=2*v,c.beginPath(),c.moveTo(0,S/2),c.lineTo(m,S/2),c.stroke();return}c.strokeStyle=O,c.lineWidth=2.5*v,c.lineJoin="round",c.beginPath(),Z.forEach((nt,ot)=>{const st=ot/(Z.length-1)*m,mt=S/2-nt/12*(S/2-10*v);if(ot===0)c.moveTo(st,mt);else{const Tt=(ot-1)/(Z.length-1)*m,wt=S/2-Z[ot-1]/12*(S/2-10*v);c.quadraticCurveTo((Tt+st)/2,wt,st,mt)}}),c.stroke(),Z.forEach((nt,ot)=>{const st=ot/(Z.length-1)*m,mt=S/2-nt/12*(S/2-10*v);c.fillStyle=O,c.beginPath(),c.arc(st,mt,4*v,0,Math.PI*2),c.fill(),c.fillStyle="white",c.beginPath(),c.arc(st,mt,2*v,0,Math.PI*2),c.fill()}),c.strokeStyle="rgba(100,120,150,0.3)",c.lineWidth=1*v,c.setLineDash([4*v,4*v]),c.beginPath(),c.moveTo(0,S/2),c.lineTo(m,S/2),c.stroke(),c.setLineDash([])}s&&(s.innerHTML="",Zt.forEach((v,m)=>{const S=f[m]||0,O=document.createElement("div");O.className="eq-band",O.innerHTML=`
        <input type="range" min="-12" max="12" value="${S}" step="1" data-idx="${m}" orient="vertical" />
        <label>${v>=1e3?v/1e3+"k":v}</label>
        <span style="font-size:10px;color:var(--text-muted);min-height:12px;" class="val">${(S>0?"+":"")+S+"dB"}</span>
      `,s.appendChild(O)}),k=Array.from(s.querySelectorAll("input")),k.forEach(v=>{v.addEventListener("input",()=>{const m=parseInt(v.dataset.idx),S=parseInt(v.value);J(v),f[m]=S,P();const O=ye(f);n&&(n.value=O),localStorage.setItem("melo-eq-gains",JSON.stringify(f)),localStorage.setItem("melo-eq-preset",O),e||T(m,S),Y("melo:eq",{type:"gain",idx:m,val:S,values:f})})})),n&&(n.value=w,n.addEventListener("change",()=>{const v=te[n.value]||te.flat;k.length&&k.forEach((m,S)=>{m.value=String(v[S]),J(m)}),f=[...v],P(),localStorage.setItem("melo-eq-gains",JSON.stringify(f)),localStorage.setItem("melo-eq-preset",n.value),e||D(v),Y("melo:eq",{type:"gains",values:v,preset:n.value}),a(`Preset: ${n.options[n.selectedIndex].text}`)})),l&&l.addEventListener("click",()=>{const v=te.flat;k.length&&k.forEach((m,S)=>{m.value="0",J(m)}),f=[...v],n&&(n.value="flat"),localStorage.setItem("melo-eq-gains",JSON.stringify(f)),localStorage.setItem("melo-eq-preset","flat"),e||D(v),Y("melo:eq",{type:"gains",values:v,preset:"flat"}),P(),a("Equalizer reset to Flat (0dB)")}),o&&(o.checked=u,o.addEventListener("change",()=>{u=o.checked,localStorage.setItem("melo-eq-enabled",u?"1":"0"),e||G(u),Y("melo:eq",{type:"enable",on:u}),P(),a(u?"Equalizer On":"Equalizer off — Flat")})),p&&new ResizeObserver(()=>P()).observe(p),P(),window.MeloEqualizer={presets:te,frequencies:Zt,displayGains:f,reset:()=>l==null?void 0:l.click()}}const Kt=[{id:"bars",label:"Classic Bars"},{id:"thin",label:"Thin Bars"},{id:"line",label:"Spectrum Line"},{id:"mirror",label:"Mirror Bars"},{id:"wave",label:"Oscilloscope"},{id:"spectrumWave",label:"Spectrum Wave"},{id:"blocks",label:"Block Equalizer"}];function Ra(t){let a=document.getElementById("vizBars");if(!a)return;let i=u(a),e=i.getContext("2d"),o=null,n=null,l=null,s=null,p=null,c=!1,d=localStorage.getItem("melo-viz-mode")||"bars";Kt.some(g=>g.id===d)||(d="bars");let x=0,k=[],f=.45,w=null;function u(g){let b=g.querySelector("canvas");return b||(g.innerHTML="",b=document.createElement("canvas"),g.appendChild(b)),b}function A(){if(!(n&&l))try{const g=ce(t);o=g.ctx,n=g.analyser,l=new Uint8Array(n.frequencyBinCount),s=new Uint8Array(n.fftSize)}catch{c=!0}}function T(g){const b=l.length,M=((o==null?void 0:o.sampleRate)||44100)/2,E=45,I=Math.min(15e3,M*.95),$=Math.log(E),q=Math.log(I),C=[];for(let B=0;B<g;B++){const N=Math.exp($+(q-$)*B/g),r=Math.exp($+(q-$)*(B+1)/g);let y=Math.floor(N/M*b),_=Math.max(y+1,Math.ceil(r/M*b));y<0&&(y=0),_>b&&(_=b);let H=0;for(let at=y;at<_;at++)H+=l[at];C.push(H/(_-y)/255)}return C}function D(g){const b=performance.now()/1e3,M=Math.pow(Math.abs(Math.sin(b*2.2)),2.5),E=[];for(let I=0;I<g;I++){let $=.42+.26*Math.sin(b*1.35+I*.62)+.2*Math.sin(b*2.9+I*1.31)+Math.random()*.07;$*=.55+.5*M,E.push(Math.max(.04,Math.min(1,$)))}return E}function G(g){const b=performance.now()/1e3,M=.5+.5*Math.pow(Math.abs(Math.sin(b*1.9)),2);for(let E=0;E<g.length;E++){const I=E/g.length;g[E]=128+66*M*(Math.sin(I*Math.PI*6+b*7)*.6+Math.sin(I*Math.PI*13-b*11)*.4)}}function J(g){let b;if(c||!n||!l)b=D(g);else if(n.getByteFrequencyData(l),b=T(g),!b.some(I=>I>.01)&&!t.paused)b=D(g);else for(let I=0;I<g;I++)b[I]*=1+1.7*(I/Math.max(1,g-1));let M=0;for(const E of b)E>M&&(M=E);M>f?f=M:f=Math.max(.35,f*.985),k.length!==g&&(k=new Array(g).fill(0));for(let E=0;E<g;E++){const I=Math.min(1,b[E]/f),$=I>k[E]?.55:.16;k[E]+=(I-k[E])*$}return k}function P(g,b){return getComputedStyle(document.documentElement).getPropertyValue(g).trim()||b}function v(){return i.width/Math.max(1,i.clientWidth)||1}function m(g,b,M,E,I){if(I=Math.min(I,M/2,E/2),e.roundRect){e.roundRect(g,b,M,E,I);return}e.rect(g,b,M,E)}function S(){const g=window.devicePixelRatio||1,b=i.clientWidth||(a==null?void 0:a.clientWidth)||200,M=i.clientHeight||(a==null?void 0:a.clientHeight)||56;b>0&&M>0&&(i.width=Math.round(b*g),i.height=Math.round(M*g))}new ResizeObserver(S).observe(i),S();function O(g,b,M,E){const I=v(),$=P("--visualizer","#38bdf8"),q=P("--accent","#0284c7"),C=g.length,B=b/C,N=Math.max(1.2*I,B*(1-E));for(let r=0;r<C;r++){const y=g[r],_=Math.max(2*I,y*(M-4*I)),H=r*B+(B-N)/2,at=M-_-1*I,U=e.createLinearGradient(0,at,0,M);U.addColorStop(0,q),U.addColorStop(1,$),e.fillStyle=U,e.beginPath(),m(H,at,N,_,Math.min(N/2,3.5*I)),e.fill()}}function Z(g,b,M){const E=v(),I=P("--visualizer","#38bdf8"),$=P("--accent","#0284c7"),q=g.length,C=b/q,B=M/2,N=Math.max(1.5*E,C*.62);for(let r=0;r<q;r++){const y=Math.max(1.5*E,g[r]*(M/2-3*E)),_=r*C+(C-N)/2,H=e.createLinearGradient(0,B-y,0,B+y);H.addColorStop(0,$),H.addColorStop(.5,I),H.addColorStop(1,$),e.fillStyle=H,e.beginPath(),m(_,B-y,N,y*2,Math.min(N/2,3*E)),e.fill()}}function nt(g,b,M){const E=v(),I=P("--visualizer","#38bdf8"),$=P("--accent","#0284c7"),q=g.length,C=[],B=[];for(let r=0;r<q;r++)C.push((r+.5)/q*b),B.push(M-2*E-g[r]*(M-8*E));e.beginPath(),e.moveTo(C[0],M),e.lineTo(C[0],B[0]);for(let r=1;r<q;r++){const y=(C[r-1]+C[r])/2;e.quadraticCurveTo(C[r-1],B[r-1],y,(B[r-1]+B[r])/2)}e.lineTo(C[q-1],B[q-1]),e.lineTo(C[q-1],M),e.closePath();const N=e.createLinearGradient(0,0,0,M);N.addColorStop(0,I),N.addColorStop(1,"transparent"),e.globalAlpha=.18,e.fillStyle=N,e.fill(),e.globalAlpha=1,e.beginPath(),e.moveTo(C[0],B[0]);for(let r=1;r<q;r++){const y=(C[r-1]+C[r])/2;e.quadraticCurveTo(C[r-1],B[r-1],y,(B[r-1]+B[r])/2)}e.lineTo(C[q-1],B[q-1]),e.strokeStyle=$,e.lineWidth=2*E,e.lineJoin="round",e.stroke()}function ot(g,b,M){const E=v(),I=P("--visualizer","#38bdf8"),$=P("--accent","#0284c7"),q=M/2,C=g.length,B=g.map((y,_)=>{const H=_/Math.max(1,C-1),at=Math.pow(Math.sin(Math.PI*H),.28);return Math.max(.7*E,y*at*(M*.46))}),N=y=>{e.beginPath();for(let _=0;_<C;_++){const H=_/Math.max(1,C-1)*b,at=q+(y?-B[_]:B[_]);if(_===0)e.moveTo(H,at);else{const U=(_-1)/Math.max(1,C-1)*b,bt=q+(y?-B[_-1]:B[_-1]);e.quadraticCurveTo(U,bt,(U+H)/2,(bt+at)/2)}}};N(!0);for(let y=C-1;y>=0;y--){const _=y/Math.max(1,C-1)*b;e.lineTo(_,q+B[y])}e.closePath();const r=e.createLinearGradient(0,0,0,M);r.addColorStop(0,$),r.addColorStop(.5,I),r.addColorStop(1,$),e.fillStyle=r,e.globalAlpha=.3,e.fill(),e.globalAlpha=.18,e.shadowColor=I,e.shadowBlur=8*E,N(!0),e.strokeStyle=I,e.lineWidth=4*E,e.stroke(),N(!1),e.stroke(),e.shadowBlur=0,e.globalAlpha=1,N(!0),e.strokeStyle=$,e.lineWidth=1.2*E,e.stroke(),N(!1),e.stroke(),e.beginPath(),e.moveTo(0,q),e.lineTo(b,q),e.strokeStyle=I,e.globalAlpha=.45,e.lineWidth=.8*E,e.stroke(),e.globalAlpha=1}function st(g,b,M){const E=v(),I=P("--visualizer","#38bdf8"),$=P("--accent","#0284c7"),q=g.length,C=8,B=Math.max(1*E,b*.0035),N=Math.max(1*E,M*.025),r=Math.max(1,(b-B*(q-1))/q),y=Math.max(1,(M-N*(C-1))/C),_=e.createLinearGradient(0,0,0,M);_.addColorStop(0,$),_.addColorStop(1,I),e.fillStyle=_;for(let H=0;H<q;H++){const at=Math.max(1,Math.min(C,Math.round(g[H]*C))),U=H*(r+B);for(let bt=0;bt<at;bt++){const Wt=M-(bt+1)*y-bt*N;e.globalAlpha=.58+.42*((bt+1)/C),e.fillRect(U,Wt,r,y)}}e.globalAlpha=1}function mt(){const g=i.width,b=i.height,M=v(),E=P("--accent","#0284c7");let I;c||!n||!s?(p||(p=new Uint8Array(1024)),G(p),I=p):(n.getByteTimeDomainData(s),I=s);const $=()=>{e.beginPath();for(let q=0;q<=g;q+=2){const C=Math.min(I.length-1,Math.floor(q/g*I.length)),B=I[C]/255*b;q===0?e.moveTo(q,B):e.lineTo(q,B)}};$(),e.strokeStyle=E,e.globalAlpha=.16,e.lineWidth=6*M,e.lineJoin="round",e.stroke(),$(),e.globalAlpha=1,e.lineWidth=1.8*M,e.stroke()}function Tt(g){var E;const b=(E=a==null?void 0:a.dataset)==null?void 0:E.bars;if(!b)return g;const M=parseInt(b,10);return Number.isFinite(M)&&M>=4&&M<=256?Math.round(M):g}function wt(){const g=i.width,b=i.height;if(!g||!b)return;if(e.clearRect(0,0,g,b),d==="wave"){mt();return}const M=d==="bars"?Tt(16):d==="thin"?Tt(56):d==="line"?64:d==="spectrumWave"?72:d==="blocks"?22:Tt(24),E=J(M);d==="bars"?O(E,g,b,.34):d==="thin"?O(E,g,b,.32):d==="line"?nt(E,g,b):d==="mirror"?Z(E,g,b):d==="spectrumWave"?ot(E,g,b):d==="blocks"&&st(E,g,b)}function Pt(){x=requestAnimationFrame(Pt),wt()}function xt(){x||Pt()}function ft(g,b=!1){d=g,k=[],localStorage.setItem("melo-viz-mode",g)}function dt(){return w||(w=document.createElement("div"),w.className="viz-menu",w.style.display="none",document.body.appendChild(w),w)}function Ct(){const g=dt();g.innerHTML='<div class="viz-menu-label">Visualizer type</div>'+Kt.map(b=>`<button class="viz-menu-item ${b.id===d?"active":""}" data-mode="${b.id}">${b.id===d?"✓":""}<span>${b.label}</span></button>`).join(""),g.querySelectorAll("[data-mode]").forEach(b=>{b.addEventListener("click",M=>{M.stopPropagation(),ft(b.dataset.mode),vt()})})}function kt(g,b){Ct();const M=w;M.style.display="block";const E=M.getBoundingClientRect();M.style.left=Math.max(8,Math.min(g,window.innerWidth-E.width-8))+"px",M.style.top=Math.max(8,Math.min(b,window.innerHeight-E.height-8))+"px"}function vt(){w&&(w.style.display="none")}function yt(){a&&(a.title="Click: next mode • Right-click: choose mode",a.addEventListener("click",()=>{vt();const g=Kt.findIndex(b=>b.id===d);ft(Kt[(g+1)%Kt.length].id)}),a.addEventListener("contextmenu",g=>{g.preventDefault(),g.stopPropagation(),kt(g.clientX,g.clientY)}))}document.addEventListener("click",g=>{w&&w.style.display!=="none"&&!w.contains(g.target)&&vt()}),document.addEventListener("keydown",g=>{g.key==="Escape"&&vt()});function _t(){A(),xt(),(o==null?void 0:o.state)==="suspended"&&o.resume().catch(()=>{})}t.addEventListener("play",_t),_t(),yt(),document.addEventListener("visibilitychange",()=>{document.hidden?(cancelAnimationFrame(x),x=0):xt()});function At(){cancelAnimationFrame(x),x=0,a=document.getElementById("vizBars"),a&&(i=u(a),e=i.getContext("2d"),new ResizeObserver(S).observe(i),S(),yt(),xt())}window.__MELO_REBIND_VISUALIZER__=At}function $e(t){if(!t||!t.trim())return{isSynced:!1,lines:[],raw:""};const a=[],i=t.split(/\r?\n/),e=/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;let o=!1;for(const n of i){const l=n.trim();if(!l||/^\[[a-z]{2,8}:/i.test(l))continue;const s=[...l.matchAll(e)];if(s.length>0){o=!0;const p=l.replace(e,"").trim();for(const c of s){const d=parseInt(c[1],10),x=parseInt(c[2],10),k=c[3]||"0",f=k.length===2?parseInt(k,10)*10:k.length===1?parseInt(k,10)*100:parseInt(k.slice(0,3),10),w=d*60+x+f/1e3;a.push({time:w,text:p})}}else a.push({time:-1,text:l})}return a.sort((n,l)=>n.time-l.time),{isSynced:o,lines:a,raw:t}}function He(t,a){var w;const i=document.getElementById("lyricsContainer"),e=document.getElementById("lyricsStatus"),o=document.getElementById("lyricsTrackTitle");let n={isSynced:!1,lines:[]},l=null,s=-1,p=0;async function c(u){if(u.lyrics&&u.lyrics.trim().length>0)return u.lyrics;if(window.__TAURI__)try{const{invoke:A}=await W(async()=>{const{invoke:D}=await import("./core-DhEqZVGG.js");return{invoke:D}},[]),T=await A("get_track_lyrics",{path:u.path});if(T)return T}catch{}return null}async function d(u){if(!u){l=null,n={isSynced:!1,lines:[],raw:""},o&&(o.textContent="No track playing"),x();return}l=u.id,o&&(o.textContent=`${u.title} — ${u.artist}`);const A=await c(u);n=$e(A||""),x()}function x(){if(i){if(i.innerHTML="",s=-1,!n.lines.length){e&&(e.style.display="block",e.innerHTML='No synced lyrics found (.lrc)<br/><span style="font-size:10.5px; opacity:0.7;">Place a matching .lrc file in the song folder or add lyrics in the tag editor.</span>');return}e&&(e.style.display="none"),n.lines.forEach((u,A)=>{const T=document.createElement("div");T.className="lyric-line",T.dataset.idx=String(A),T.dataset.time=String(u.time),T.textContent=u.text||"♪",u.time>=0&&(T.style.cursor="pointer",T.title=`Seek to ${Math.floor(u.time/60)}:${Math.floor(u.time%60).toString().padStart(2,"0")}`,T.addEventListener("click",()=>{Y("melo:seek-playback",u.time),window.__TAURI__||(t.currentTime=u.time,t.play().catch(()=>{}))})),i.appendChild(T)})}}function k(){if(!i||!n.isSynced||!n.lines.length)return;const u=window.__TAURI__?p:t.currentTime;let A=-1;for(let T=0;T<n.lines.length&&n.lines[T].time<=u;T++)A=T;if(A!==s){s=A;const T=i.querySelectorAll(".lyric-line");if(T.forEach((D,G)=>{D.classList.toggle("active",G===s),D.classList.toggle("passed",G<s)}),s>=0&&T[s]){const D=T[s],G=i.clientHeight,P=D.offsetTop-i.offsetTop-G/2+D.clientHeight/2;i.scrollTo({top:Math.max(0,P),behavior:"smooth"})}}}t.addEventListener("timeupdate",k),window.addEventListener("melo:trackChange",u=>{d(u.detail)}),X("melo:track-changed",u=>{d(u)}),X("melo:playback-state",u=>{u&&(p=Number(u.currentTime)||0,u.track&&u.track.id!==l?d(u.track):k())}),X("melo:playback-position",u=>{p=Number(u)||0,k()});const f=((w=window.MeloPlayer)==null?void 0:w.currentTrack)||null;if(f)d(f);else try{const u=JSON.parse(localStorage.getItem("melo-current-track")||"null");u&&d(u)}catch{}Y("melo:request-playback-state"),setTimeout(()=>Y("melo:request-playback-state"),250),window.MeloLyrics={loadTrackLyrics:d,parseLRC:$e}}let It=null;const De=`<!doctype html>
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
`,Ne=`<!doctype html>
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
`,de={"compact-pill-light.html":De,"compact-pill-dark.html":Ne,"compact-pill-light":De,"compact-pill-dark":Ne},Oa=[{id:"compact-pill-light",name:"Minimal Compact (Light)",filename:"compact-pill-light.html"},{id:"compact-pill-dark",name:"Minimal Compact (Dark)",filename:"compact-pill-dark.html"},{id:"full-html-example",name:"Full HTML Example (Vertical)",filename:"full-html-example.html"}];let Se=null;function $a(){return Se}function ra(t){const a=["trackTitle","btnPlay","seekBar","coverImg"];let i=0;for(const e of a)t.includes(e)&&i++;return i>=3}function Ha(t){const a={},i=t.match(/<meta[^>]+name=["']melo-window["'][^>]*content=["']([^"']*)["']/i);if(!i)return a;for(const e of i[1].split(",")){const[o,n]=e.split("=").map(s=>s.trim());if(!o||n===void 0)continue;const l=o;if(l==="resizable"||l==="transparent")a[l]=/^(1|true|yes)$/i.test(n);else{const s=parseInt(n,10);Number.isFinite(s)&&s>0&&(a[l]=s)}}return a}function Nt(t,a){const i=document.getElementById("playerCard");if(!i)return;const e=i._originalHTML||i.innerHTML;i._originalHTML||(i._originalHTML=e),It&&(It.remove(),It=null);let n=[...t.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(x=>x[1]).join(`
`);n&&(It=document.createElement("style"),It.id="melo-custom-skin",It.textContent=n,document.head.appendChild(It));const l=ra(t);let s="";const p=t.match(/<body[^>]*>([\s\S]*?)<\/body>/i);p?s=p[1]:s=t.split(/<\/style>/i).pop()||"";const c=document.createElement("div");c.innerHTML=s;const d=c.querySelector("#melo-player");if(d&&(s=d.innerHTML),l&&s.trim().length>20){Se=t;const x=s.trim();i.innerHTML=x,a&&a("Skin applied"),setTimeout(()=>{var f,w;(f=window.__MELO_REBIND__)==null||f.call(window);const k=window.__MELO_AUDIO__;k&&window.__MELO_REBIND_VISUALIZER__&&window.__MELO_REBIND_VISUALIZER__(k),(w=window.__MELO_REBIND_MAIN__)==null||w.call(window)},40)}else n&&a&&a("Skin CSS applied");localStorage.setItem("melo-custom-skin",t),localStorage.setItem("melo-custom-skin-isFull",l?"1":"0")}function Me(t,a=!0){Se=null,document.documentElement.classList.remove("compact-skin-active"),document.body.classList.remove("compact-skin-active"),It&&(It.remove(),It=null);const i=document.getElementById("playerCard");i&&i._originalHTML&&(i.innerHTML=i._originalHTML,setTimeout(()=>{var o,n;(o=window.__MELO_REBIND__)==null||o.call(window);const e=window.__MELO_AUDIO__;e&&window.__MELO_REBIND_VISUALIZER__&&window.__MELO_REBIND_VISUALIZER__(e),(n=window.__MELO_REBIND_MAIN__)==null||n.call(window)},40)),localStorage.removeItem("melo-custom-skin"),localStorage.removeItem("melo-custom-skin-isFull"),localStorage.setItem("melo-active-skin-id","default"),a&&Y("melo:skin-changed","default"),t&&t("Switched to Default Melo skin")}async function la(){if(K)try{const{invoke:t}=await W(async()=>{const{invoke:i}=await import("./core-DhEqZVGG.js");return{invoke:i}},[]),a=await t("list_installed_skins");if(Array.isArray(a)&&a.length>0)return a}catch{}return Oa}async function sa(t,a){if(K)try{const{invoke:e}=await W(async()=>{const{invoke:n}=await import("./core-DhEqZVGG.js");return{invoke:n}},[]),o=await e("read_skin_file",{filenameOrPath:t});if(o&&o.trim().length>0)return Nt(o,a),!0}catch{}try{const e=t.startsWith("skins/")?t:`skins/${t}`,o=await fetch(e);if(o.ok){const n=await o.text();return Nt(n,a),!0}}catch{}const i=t.replace(/^.*[\\/]/,"");return de[i]?(Nt(de[i],a),!0):(a&&a(`Could not load skin: ${t}`),!1)}async function Dt(t,a,i,e=!0){if(t==="default"){Me(i,e);return}let o=t;const n=t==="compact-pill"||t.startsWith("compact-pill");document.documentElement.classList.toggle("compact-skin-active",n),document.body.classList.toggle("compact-skin-active",n),n?o=a==="dark"?"compact-pill-dark.html":"compact-pill-light.html":!o.endsWith(".html")&&!o.endsWith(".htm")&&(o=o+".html");let l=!1;n&&de[o]?(Nt(de[o],i),l=!0):l=await sa(o,i),l&&(localStorage.setItem("melo-active-skin-id",t),e&&Y("melo:skin-changed",t))}async function ca(t){if(K)try{const{invoke:a}=await W(async()=>{const{invoke:i}=await import("./core-DhEqZVGG.js");return{invoke:i}},[]);await a("open_skins_folder"),t&&t("Opening skins folder...")}catch{t&&t("Could not open skins folder")}else t&&t("Skins are located in the skins/ folder")}function Da(t){const a=document.getElementById("skinUpload"),i=document.getElementById("linkDownloadExample");i&&i.addEventListener("click",n=>{n.preventDefault(),sa("compact-pill-light.html")});const e=localStorage.getItem("melo-active-skin-id")||"default",o=localStorage.getItem("melo-theme")||"dark";e!=="default"&&setTimeout(()=>{Dt(e,o,void 0,!1)},150),X("melo:theme",n=>{const l=localStorage.getItem("melo-active-skin-id");l&&l!=="default"&&Dt(l,n,void 0,!1)}),X("melo:skin-changed",n=>{if(n&&typeof n=="string"){const l=localStorage.getItem("melo-theme")||"dark";Dt(n,l,void 0,!1)}}),a&&a.addEventListener("change",async()=>{var p;const n=(p=a.files)==null?void 0:p[0];if(!n)return;const l=await n.text(),s=n.name;if(K)try{const{invoke:c}=await W(async()=>{const{invoke:d}=await import("./core-DhEqZVGG.js");return{invoke:d}},[]);await c("save_custom_skin_file",{filename:s,content:l}),t(`Saved ${s} to skins folder`)}catch{}Nt(l,t),localStorage.setItem("melo-active-skin-id",s),Y("melo:skin-changed",s),a.value=""}),document.addEventListener("dragover",n=>{var l;[...((l=n.dataTransfer)==null?void 0:l.types)||[]].includes("Files")&&n.preventDefault()}),document.addEventListener("drop",async n=>{var s;const l=[...((s=n.dataTransfer)==null?void 0:s.files)||[]].find(p=>p.name.endsWith(".html")||p.name.endsWith(".htm"));if(l){n.preventDefault();const p=await l.text();if(p.includes("<style")||p.includes("<html")||ra(p)){const c=l.name;if(K)try{const{invoke:d}=await W(async()=>{const{invoke:x}=await import("./core-DhEqZVGG.js");return{invoke:x}},[]);await d("save_custom_skin_file",{filename:c,content:p})}catch{}Nt(p,t),localStorage.setItem("melo-active-skin-id",c),Y("melo:skin-changed",c)}}}),window.MeloSkin={applyCustomSkin:Nt,resetSkin:Me,applySkinChoice:Dt,listInstalledSkins:la,openSkinsFolderOnDisk:ca}}const Na=(t,a,i)=>{const e=t[a];return e?typeof e=="function"?e():Promise.resolve(e):new Promise((o,n)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(n.bind(null,new Error("Unknown variable dynamic import: "+a+(a.split("/").length!==i?". Note that variables only represent file names one level deep.":""))))})},da={code:"en",name:"English",nativeName:"English",authors:["Melo Team"]},Ee={_meta:da,"settings.tabs.general":"General","settings.tabs.playback":"Playback","settings.tabs.appearance":"Appearance & Skin","settings.tabs.shortcuts":"Shortcuts","settings.tabs.about":"About","settings.general.language.label":"Language","settings.general.language.desc":"Interface language — more languages coming via community translation","settings.general.tray.label":"Close to system tray","settings.general.tray.desc":"Minimize to system tray on window close","settings.general.resume.label":"Resume playback on reopen","settings.general.resume.desc":"Continue playback of the previous track where you left off","settings.playback.replaygain.label":"ReplayGain normalization","settings.playback.replaygain.desc":"Equalize track volume levels automatically","settings.playback.fadepause.label":"Fade out on pause","settings.playback.fadepause.desc":"Smooth 0.3s fade-out on pause, fade back in on resume","settings.appearance.showstop.label":"Show Stop button","settings.appearance.showstop.desc":"Display a Stop control next to Play/Pause in the player"},Va=Object.freeze(Object.defineProperty({__proto__:null,_meta:da,default:Ee},Symbol.toStringTag,{value:"Module"})),pa=[{code:"en",nativeName:"English"}],Ht={en:Ee};let ua=Ht.en,ma="en";function Wa(){return ma}async function ha(t){if(pa.some(a=>a.code===t)||(t="en"),!Ht[t])if(t==="en")Ht.en=Ee;else try{const a=await Na(Object.assign({"./locales/en.json":()=>W(()=>Promise.resolve().then(()=>Va),void 0)}),`./locales/${t}.json`,3);Ht[t]=a.default||a}catch{t="en"}ma=t,ua=Ht[t]||Ht.en,localStorage.setItem("melo-pref-language",t),document.dispatchEvent(new CustomEvent("melo:locale-changed",{detail:t}))}function ct(t){var a,i;return(i=(a=ua[t])!=null?a:Ht.en[t])!=null?i:t}function Ve(){const t=localStorage.getItem("melo-pref-language")||"en";ha(t)}const fa=document.querySelector("#app");fa.innerHTML=`
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

    <!-- PLAYING QUEUE WINDOW -->
    <div class="float-win" id="win-playlist" style="left:370px; top:12px; width:360px; height:480px; z-index:3;">
      <div class="float-header" data-drag="win-playlist">
        <div class="float-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          Playing Queue
        </div>
        <div class="float-actions">
          <button class="float-btn" data-close="win-playlist" title="Hide">&mdash;</button>
          <button class="float-btn close" data-close="win-playlist">&times;</button>
        </div>
      </div>
      <div class="float-body" style="padding:8px; display:flex; flex-direction:column; gap:6px;">
        <div class="playlist-toolbar" style="display:flex; gap:6px; align-items:center; flex-shrink:0; flex-wrap:wrap;">
          <input id="playlistSearchInput" class="search-input" placeholder="Search queue..." style="flex:1; height:26px; font-size:11px; padding-left:8px;" />
          <span id="queueCount" style="font-size:11px; color:var(--text-muted); white-space:nowrap;">0 tracks</span>
        </div>
        <div id="winPlaylistTracks" class="drop-zone" style="flex:1; overflow:auto; display:flex; flex-direction:column; min-height:140px;"></div>
        <div id="winPlaylistEmpty" style="display:none; border:1px dashed var(--card-border); border-radius:10px; padding:16px 10px; background:var(--track-bg); text-align:center; font-size:11px; color:var(--text-muted); line-height:1.8;">
          Queue is empty<br/>Open files, scan a folder, or click a track in the Library
        </div>
        <div class="playlist-footer-actions" style="display:flex; gap:6px; flex-shrink:0;">
          <button class="btn small" id="btn-clear-playlist" style="justify-content:center; color:#e5484d;" title="Remove all tracks from the playing queue">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="m19 6-1 14H6L5 6"/></svg>
            Clear Queue
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
          <button class="settings-tab active" data-stab="general"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>${ct("settings.tabs.general")}</button>
          <button class="settings-tab" data-stab="playback"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4z"/></svg>${ct("settings.tabs.playback")}</button>
          <button class="settings-tab" data-stab="appearance"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>${ct("settings.tabs.appearance")}</button>
          <button class="settings-tab" data-stab="shortcuts"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M18 14h.01M9 14h6"/></svg>${ct("settings.tabs.shortcuts")}</button>
          <button class="settings-tab" data-stab="about"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>${ct("settings.tabs.about")}</button>
        </div>

        <!-- GENERAL TAB -->
        <div class="settings-section active" data-panel="general">
          <div class="settings-row">
            <div><div class="label">${ct("settings.general.language.label")}</div><div class="desc">${ct("settings.general.language.desc")}</div></div>
            <select class="settings-select" id="setLanguage">${pa.map(t=>`<option value="${t.code}">${t.nativeName}</option>`).join("")}</select>
          </div>
          <div class="settings-row">
            <div><div class="label">${ct("settings.general.tray.label")}</div><div class="desc">${ct("settings.general.tray.desc")}</div></div>
            <div class="switch on" id="swTray" data-key="tray"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">${ct("settings.general.resume.label")}</div><div class="desc">${ct("settings.general.resume.desc")}</div></div>
            <div class="switch on" id="swResume" data-key="resume"></div>
          </div>
        </div>

        <!-- PLAYBACK TAB -->
        <div class="settings-section" data-panel="playback">
          <div class="settings-row">
            <div><div class="label">${ct("settings.playback.replaygain.label")}</div><div class="desc">${ct("settings.playback.replaygain.desc")}</div></div>
            <div class="switch on" id="swReplayGain" data-key="replayGainGlobal"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">${ct("settings.playback.fadepause.label")}</div><div class="desc">${ct("settings.playback.fadepause.desc")}</div></div>
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
            <div><div class="label">${ct("settings.appearance.showstop.label")}</div><div class="desc">${ct("settings.appearance.showstop.desc")}</div></div>
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
            <div style="font-size:16px; font-weight:800; color:var(--text); margin-bottom:4px;">Melo 0.5.0 Beta</div>
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
          <button class="sbtn active" id="btnTogglePlaylist" title="Playing Queue">
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
`;const lt=new URLSearchParams(location.search).get("panel");lt&&(document.documentElement.classList.add("panel-window",`panel-${lt}`),document.body.classList.add("panel-window",`panel-${lt}`));var Ue,je;if(K&&lt){W(async()=>{const{getCurrentWindow:e}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:e}},__vite__mapDeps([8,7,1,0])).then(({getCurrentWindow:e})=>{const o=e();ja(o,"melo-geo-panel-"+lt),o.onCloseRequested(()=>{Y("melo:panel-closed",lt)}),window.addEventListener("beforeunload",()=>{Y("melo:panel-closed",lt)})});const t=document.getElementById("win-"+lt),a=((Ue=t==null?void 0:t.querySelector(".float-title"))==null?void 0:Ue.innerHTML)||"",i=((je=t==null?void 0:t.querySelector(".float-body"))==null?void 0:je.innerHTML)||"";fa.innerHTML=`
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
</div>`}K&&!lt&&(document.documentElement.classList.add("tauri-main"),document.body.classList.add("tauri-main"),document.querySelectorAll(".side-actions .sbtn").forEach(t=>t.classList.remove("active")),W(async()=>{const{WebviewWindow:t}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:t}},__vite__mapDeps([6,7,1,0,8])).then(({WebviewWindow:t})=>{const a=async()=>{var i;for(const e of["library","playlist","equalizer","lyrics","settings"])try{const o=await t.getByLabel("panel-"+e);(i=document.getElementById(Le[e]))==null||i.classList.toggle("active",!!o)}catch{}};a(),setInterval(a,1200)}));K&&!lt&&(W(()=>import("./window-BWd3Cypy.js"),__vite__mapDeps([8,7,1,0])).then(async({getCurrentWindow:t})=>{const a=t(),i=()=>{const n=localStorage.getItem("melo-active-skin-id");if(n==="compact-pill"||typeof n=="string"&&n.startsWith("compact-pill"))return{width:780,height:138,minWidth:780,maxWidth:780,minHeight:138,maxHeight:138,resizable:!1,fixed:!0};if(n&&n!=="default"){const s=$a();if(s)return{...Ha(s),fixed:!1}}return{width:960,height:240,minWidth:650,minHeight:240,resizable:!0,fixed:!1}},e=async n=>{var A,T,D,G;const{LogicalSize:l}=await W(async()=>{const{LogicalSize:J}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:J}},__vite__mapDeps([7,1])),s=i();await a.setResizable(!!s.resizable);const p=await a.scaleFactor(),c=(await a.innerSize()).toLogical(p),d=(T=s.minWidth)!=null?T:s.resizable?280:(A=s.width)!=null?A:c.width,x=(G=s.minHeight)!=null?G:s.resizable?200:(D=s.height)!=null?D:c.height,k=s.maxWidth,f=s.maxHeight;let w=c.width,u=c.height;s.width&&(w=s.width),s.height&&(u=s.height),w=Math.max(d,k?Math.min(k,w):w),u=Math.max(x,f?Math.min(f,u):u),(Math.abs(w-c.width)>.5||Math.abs(u-c.height)>.5)&&await a.setSize(new l(w,u))};try{const n=JSON.parse(localStorage.getItem("melo-geo-main")||"null"),{LogicalPosition:l}=await W(async()=>{const{LogicalPosition:s}=await import("./dpi-fvP-W2qr.js");return{LogicalPosition:s}},__vite__mapDeps([7,1]));await e(!0),(n==null?void 0:n.x)!=null&&(n==null?void 0:n.y)!=null&&await a.setPosition(new l(n.x,n.y))}catch{}const o=async()=>{try{const n=await a.outerPosition(),l=await a.innerSize();localStorage.setItem("melo-geo-main",JSON.stringify({x:n.x,y:n.y,w:l.width,h:l.height}))}catch{}};a.onMoved(o),a.onResized(async()=>{var n,l;try{const s=i();if(!s.resizable)await e(!0);else{const p=await a.scaleFactor(),c=(await a.innerSize()).toLogical(p),d=(n=s.minWidth)!=null?n:280,x=(l=s.minHeight)!=null?l:200,k=s.maxWidth,f=s.maxHeight;let w=Math.max(d,k?Math.min(k,c.width):c.width),u=Math.max(x,f?Math.min(f,c.height):c.height);if(w!==c.width||u!==c.height){const{LogicalSize:A}=await W(async()=>{const{LogicalSize:T}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:T}},__vite__mapDeps([7,1]));await a.setSize(new A(w,u))}}}catch{}o()}),X("melo:skin-changed",async n=>{try{!lt&&n&&await Dt(n,zt,void 0,!1),await new Promise(l=>setTimeout(l,60)),await e(!0),o()}catch{}}),a.onCloseRequested(async n=>{if(n.preventDefault(),localStorage.getItem("melo-pref-tray")!=="0")try{await a.hide();return}catch{}const{WebviewWindow:s}=await W(async()=>{const{WebviewWindow:p}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:p}},__vite__mapDeps([6,7,1,0,8]));for(const p of["library","playlist","equalizer","lyrics","settings"])try{const c=await s.getByLabel("panel-"+p);c&&await c.close()}catch{}try{await a.destroy()}catch{window.close()}})}),W(()=>import("./core-DhEqZVGG.js"),[]).then(async({invoke:t})=>{try{const a=await t("get_cli_tracks");Array.isArray(a)&&a.length>0&&setTimeout(async()=>{const i=window.MeloLibrary,e=a.map(n=>n.path).filter(Boolean),o=await(i==null?void 0:i.importPaths(e,"none"))||[];o.length&&await Rt({type:"tracks",ids:o.map(n=>n.id)},{autoplay:!0})},350)}catch{}}),X("melo:open-files",t=>{if(Array.isArray(t)&&t.length>0){const a=t.map(i=>i.path).filter(Boolean);setTimeout(async()=>{const i=window.MeloLibrary,e=await(i==null?void 0:i.importPaths(a,"none"))||[];e.length&&await Rt({type:"tracks",ids:e.map(o=>o.id)},{autoplay:!0})},100)}}));document.addEventListener("contextmenu",t=>{t.preventDefault()});const re=document.getElementById("toast"),pt=t=>{re&&(re.textContent=t,re.classList.add("show"),setTimeout(()=>re.classList.remove("show"),2200))},Mt=new Audio;Mt.preload="metadata";Mt.crossOrigin="anonymous";window.__MELO_AUDIO__=Mt;window.__TOAST__=pt;localStorage.getItem("melo-dynamic-theme")===null&&localStorage.setItem("melo-dynamic-theme","1");let zt=localStorage.getItem("melo-theme")||"dark";function ue(t){document.documentElement.setAttribute("data-theme",t),localStorage.setItem("melo-theme",t),zt=t}function ga(t){ue(t),Y("melo:theme",t)}ue(zt);X("melo:theme",t=>{(t==="light"||t==="dark")&&ue(t)});setInterval(()=>{const t=localStorage.getItem("melo-theme");(t==="light"||t==="dark")&&t!==zt&&ue(t)},1e3);document.body.classList.toggle("show-stop-btn",localStorage.getItem("melo-pref-showStopBtn")==="1");X("melo:pref-changed",t=>{t&&t.key==="showStopBtn"&&document.body.classList.toggle("show-stop-btn",!!t.value)});const Fa=["win-library","win-playlist","win-equalizer","win-lyrics","win-settings"],pe=document.getElementById("desktop"),va={btnToggleLibrary:"win-library",btnTogglePlaylist:"win-playlist",btnToggleEq:"win-equalizer",btnToggleLyrics:"win-lyrics",btnOpenSettings:"win-settings",menuToggleLibrary:"win-library",menuTogglePlaylist:"win-playlist",menuToggleEq:"win-equalizer",menuToggleLyrics:"win-lyrics",menuToggleSettings:"win-settings"};function Ua(t){const a=document.getElementById(t);return!!a&&!a.classList.contains("hidden")}const Le={library:"btnToggleLibrary",playlist:"btnTogglePlaylist",equalizer:"btnToggleEq",lyrics:"btnToggleLyrics",settings:"btnOpenSettings"};async function ja(t,a){const i=async()=>{try{const e=await t.outerPosition(),o=await t.outerSize();localStorage.setItem(a,JSON.stringify({x:e.x,y:e.y,w:o.width,h:o.height}))}catch{}};t.onMoved(i),t.onResized(i)}async function Ga(t){const{WebviewWindow:a}=await W(async()=>{const{WebviewWindow:d}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:d}},__vite__mapDeps([6,7,1,0,8])),i="panel-"+t,e=document.getElementById(Le[t]),o=await a.getByLabel(i);if(o){await o.close(),e==null||e.classList.remove("active");return}const n={library:[430,620],playlist:[440,560],equalizer:[700,440],lyrics:[380,520],settings:[600,540]},l={library:[360,400],playlist:[360,360],equalizer:[620,400],lyrics:[320,360],settings:[500,400]},s={library:"Library",playlist:"Playing Queue",equalizer:"Equalizer",lyrics:"Lyric",settings:"Settings"},p=n[t]||[420,520];let c=null;try{c=JSON.parse(localStorage.getItem("melo-geo-panel-"+t)||"null")}catch{}new a(i,{url:`/?panel=${t}`,title:s[t]||t,width:(c==null?void 0:c.w)||p[0],height:(c==null?void 0:c.h)||p[1],minWidth:(l[t]||[360,360])[0],minHeight:(l[t]||[360,360])[1],...(c==null?void 0:c.x)!=null?{x:c.x,y:c.y}:{center:!0},decorations:!1,transparent:!0,shadow:!1,skipTaskbar:!0}),e==null||e.classList.add("active")}X("melo:panel-closed",t=>{var i;const a=Le[t];a&&((i=document.getElementById(a))==null||i.classList.remove("active"))});function Te(t){if(K){Ga(t.replace(/^win-/,""));return}const a=Ua(t);ee(t,!a),a||me(document.getElementById(t))}function Qa(t){if(t.classList.contains("hidden")||!pe||window.matchMedia("(max-width: 860px)").matches)return;const a=pe.getBoundingClientRect();if(a.width<=0||a.height<=0)return;const i=t.getBoundingClientRect(),e=Math.min(i.width,a.width),o=Math.min(i.height,a.height);let n=i.left-a.left,l=i.top-a.top;n=Math.max(0,Math.min(a.width-e,n)),l=Math.max(0,Math.min(a.height-o,l)),t.style.left=n+"px",t.style.top=l+"px",t.style.right="auto",t.style.bottom="auto",t.style.transform="none"}function ee(t,a){var o,n,l,s,p,c,d,x,k,f;const i=document.getElementById(t);if(!i)return;i.classList.toggle("hidden",!a),localStorage.setItem("melov2-"+t,a?"1":"0"),a&&Qa(i);const e=a;t==="win-library"&&((o=document.getElementById("btnToggleLibrary"))==null||o.classList.toggle("active",e),(n=document.getElementById("menuToggleLibrary"))==null||n.classList.toggle("active",e)),t==="win-playlist"&&((l=document.getElementById("btnTogglePlaylist"))==null||l.classList.toggle("active",e),(s=document.getElementById("menuTogglePlaylist"))==null||s.classList.toggle("active",e)),t==="win-equalizer"&&((p=document.getElementById("btnToggleEq"))==null||p.classList.toggle("active",e),(c=document.getElementById("menuToggleEq"))==null||c.classList.toggle("active",e)),t==="win-lyrics"&&((d=document.getElementById("btnToggleLyrics"))==null||d.classList.toggle("active",e),(x=document.getElementById("menuToggleLyrics"))==null||x.classList.toggle("active",e)),t==="win-settings"&&((k=document.getElementById("btnOpenSettings"))==null||k.classList.toggle("active",e),(f=document.getElementById("menuToggleSettings"))==null||f.classList.toggle("active",e))}lt||Fa.forEach(t=>{const a=localStorage.getItem("melov2-"+t);a!==null?ee(t,a==="1"):t==="win-settings"?ee(t,!1):ee(t,!0)});Object.entries(va).forEach(([t,a])=>{var i;(i=document.getElementById(t))==null||i.addEventListener("click",()=>Te(a))});document.querySelectorAll("[data-close]").forEach(t=>{t.addEventListener("click",()=>{const a=t.dataset.close;ee(a,!1)})});let gt=null,Et=null,We=10;function me(t){We++,t.style.zIndex=String(We),document.querySelectorAll(".float-win").forEach(a=>a.classList.remove("active")),t.classList.add("active")}document.querySelectorAll(".float-win").forEach(t=>{t.addEventListener("mousedown",()=>me(t))});document.querySelectorAll("[data-drag]").forEach(t=>{t.addEventListener("mousedown",a=>{if(a.target.closest("button")||a.target.closest("input")||a.target.closest("select"))return;const i=t.dataset.drag,e=document.getElementById(i);me(e),e.classList.add("dragging");const o=e.getBoundingClientRect();gt={id:i,startX:a.clientX,startY:a.clientY,initX:o.left,initY:o.top,width:o.width,height:o.height}})});document.querySelectorAll("[data-resize]").forEach(t=>{t.addEventListener("mousedown",a=>{a.stopPropagation();const i=t.dataset.resize,e=document.getElementById(i);me(e),e.classList.add("resizing");const o=e.getBoundingClientRect();Et={id:i,startX:a.clientX,startY:a.clientY,initW:o.width,initH:o.height}})});window.addEventListener("mousemove",t=>{if(gt){const a=document.getElementById(gt.id);let i=t.clientX-gt.startX,e=t.clientY-gt.startY,o=gt.initX+i,n=gt.initY+e;if(pe&&!window.matchMedia("(max-width: 860px)").matches){const l=pe.getBoundingClientRect(),s=l.left,p=l.right-gt.width,c=l.top,d=l.bottom-gt.height;o=Math.max(s,Math.min(p,o))-l.left,n=Math.max(c,Math.min(d,n))-l.top}a.style.left=o+"px",a.style.top=n+"px",a.style.right="auto",a.style.bottom="auto",a.style.transform="none"}if(Et){const a=document.getElementById(Et.id);let i=Et.initW+(t.clientX-Et.startX),e=Et.initH+(t.clientY-Et.startY);i=Math.max(260,i),e=Math.max(160,e),a.style.width=i+"px",a.style.height=e+"px"}});window.addEventListener("mouseup",()=>{if(gt){const t=document.getElementById(gt.id);t&&(t.classList.remove("dragging"),localStorage.setItem("melov2-pos-"+gt.id,JSON.stringify({left:t.style.left,top:t.style.top}))),gt=null}if(Et){const t=document.getElementById(Et.id);t&&(t.classList.remove("resizing"),localStorage.setItem("melov2-size-"+Et.id,JSON.stringify({width:t.style.width,height:t.style.height}))),Et=null}});async function ya(){const t=window.MeloLibrary;if(K){try{const{open:i}=await W(async()=>{const{open:l}=await import("./index-CS3Qnt9j.js");return{open:l}},__vite__mapDeps([5,1])),e=await i({multiple:!0,filters:[{name:"Audio",extensions:["mp3","flac","wav","aac","ogg","m4a","alac","opus","wma","aiff"]}]});if(!e)return;const o=Array.isArray(e)?e:[e],n=await(t==null?void 0:t.importPaths(o,"none"))||[];n.length&&(await Rt({type:"tracks",ids:n.map(l=>l.id)},{autoplay:!0}),pt(`${n.length} file(s) added`))}catch{pt("Error opening files")}return}const a=document.createElement("input");a.type="file",a.multiple=!0,a.accept="audio/*,.mp3,.flac,.wav,.aac,.ogg,.m4a,.alac,.opus,.wma,.aiff",a.onchange=async()=>{const i=Array.from(a.files||[]);if(i.length){for(const e of i){const o=e.path,n=o||URL.createObjectURL(e),l=e.name,s=l.lastIndexOf("."),p=s>0?l.slice(0,s):l,c=s>0?l.slice(s+1).toUpperCase():"AUDIO",d={id:o||"imp_"+Math.random().toString(36).slice(2,9),title:p,artist:"Unknown Artist",album:"Single",duration:0,path:n,codec:c,specs:"Local File",source:"import"};await na(e,d)}pt("Direct browser file playback is not used in desktop builds.")}},a.click()}async function ba(){const t=window.MeloLibrary;if(K){try{const{open:i}=await W(async()=>{const{open:n}=await import("./index-CS3Qnt9j.js");return{open:n}},__vite__mapDeps([5,1])),e=await i({directory:!0});if(!e)return;const o=e;await(t==null?void 0:t.scanFolder(o,!0)),await Rt({type:"folder",path:o},{autoplay:!0})}catch{pt("Error scanning folder")}return}const a=document.createElement("input");a.type="file",a.webkitdirectory=!0,a.multiple=!0,a.accept="audio/*",a.onchange=async()=>{const i=Array.from(a.files||[]).filter(e=>/\.(mp3|flac|wav|aac|ogg|m4a|alac|opus|wma|aiff)$/i.test(e.name));if(i.length){for(const e of i){const o=e.path,n=o||URL.createObjectURL(e),l=e.name,s=l.lastIndexOf("."),p=s>0?l.slice(0,s):l,c=s>0?l.slice(s+1).toUpperCase():"AUDIO",d={id:o||"imp_"+Math.random().toString(36).slice(2,9),title:p,artist:"Unknown Artist",album:"Folder Import",duration:0,path:n,codec:c,specs:"Local File",source:"import"};await na(e,d)}pt("Direct browser folder playback is not used in desktop builds.")}},a.click()}document.addEventListener("click",t=>{var i;const a=(i=t.target)==null?void 0:i.closest("#btnAddFiles, #btnAddFolder, #btnThemeToggle");a&&(a.id==="btnAddFiles"?ya():a.id==="btnAddFolder"?ba():a.id==="btnThemeToggle"&&ga(zt==="light"?"dark":"light"))});window.addEventListener("keydown",t=>{(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="o"&&(t.shiftKey?(t.preventDefault(),ba()):(t.preventDefault(),ya())),((t.ctrlKey||t.metaKey)&&t.key===","||t.key==="F2")&&(t.preventDefault(),Te("win-settings"))});function Fe(t){var k,f;function a(w){document.querySelectorAll(".settings-tab").forEach(u=>{u.classList.toggle("active",u.dataset.stab===w)}),document.querySelectorAll(".settings-section[data-panel]").forEach(u=>{u.classList.toggle("active",u.dataset.panel===w)}),localStorage.setItem("melo-settings-tab",w)}document.querySelectorAll(".settings-tab").forEach(w=>{w.addEventListener("click",()=>a(w.dataset.stab))}),a(localStorage.getItem("melo-settings-tab")||"general"),document.querySelectorAll(".switch[data-key]").forEach(w=>{const u=w.dataset.key,A=localStorage.getItem("melo-pref-"+u);A!==null&&w.classList.toggle("on",A==="1"),w.onclick=()=>{w.classList.toggle("on");const T=w.classList.contains("on");localStorage.setItem("melo-pref-"+u,T?"1":"0"),Y("melo:pref-changed",{key:u,value:T})}});const i=document.getElementById("setLanguage");i&&(i.value=Wa(),i.onchange=async()=>{await ha(i.value),t(`Language set to ${i.options[i.selectedIndex].text} — restart Melo to fully apply`)});const e=document.getElementById("swDynamicTheme");if(e){const w=localStorage.getItem("melo-dynamic-theme")!=="0";e.classList.toggle("on",w),e.onclick=()=>{var T;const u=!e.classList.contains("on");e.classList.toggle("on",u),localStorage.setItem("melo-dynamic-theme",u?"1":"0");const A=((T=window.MeloPlayer)==null?void 0:T.currentTrack)||null;A&&oa(u?A.cover:null)}}const o=document.getElementById("skinSelect"),n=document.getElementById("btnSkinThemeToggle"),l=document.getElementById("btnRefreshSkins"),s=document.getElementById("btnOpenSkinsFolder"),p=document.getElementById("skinThemeIcon"),c=document.getElementById("skinThemeLabel");function d(w){p&&(p.textContent=w==="dark"?"🌙":"☀️"),c&&(c.textContent=w==="dark"?"Dark":"Light")}d(zt),n==null||n.addEventListener("click",()=>{const w=zt==="dark"?"light":"dark";ga(w),d(w),t(w==="dark"?"Dark theme":"Light theme")}),X("melo:theme",w=>{(w==="light"||w==="dark")&&d(w)});async function x(){if(!o)return;const w=localStorage.getItem("melo-active-skin-id")||"default",u=await la();o.innerHTML=`
      <option value="default">Default Melo (Standard)</option>
      <option value="compact-pill">Minimal Compact (Pill Bar)</option>
    `,u.forEach(A=>{if(A.filename!=="compact-pill-light.html"&&A.filename!=="compact-pill-dark.html"){const T=document.createElement("option");T.value=A.filename,T.textContent=`${A.name} (${A.filename})`,o.appendChild(T)}}),o.value=w}x(),o&&(o.onchange=()=>{const w=o.value;Dt(w,zt,t)}),l==null||l.addEventListener("click",async()=>{await x();const w=localStorage.getItem("melo-active-skin-id")||"default";Dt(w,zt,t),t("Skins reloaded from disk")}),s==null||s.addEventListener("click",()=>{ca(t)}),(k=document.getElementById("btn-reset-skin-settings"))==null||k.addEventListener("click",()=>{Me(t),o&&(o.value="default")}),(f=document.getElementById("btn-settings-reset"))==null||f.addEventListener("click",()=>{localStorage.clear(),t("Settings reset — reloading..."),setTimeout(()=>location.reload(),600)})}function wa(){document.querySelectorAll(".win-btn").forEach(t=>{t.onclick=async()=>{const a=t.getAttribute("aria-label");if(window.__TAURI__){const{getCurrentWindow:i}=await W(async()=>{const{getCurrentWindow:o}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:o}},__vite__mapDeps([8,7,1,0])),e=i();a==="minimize"?e.minimize():a==="close"&&e.close()}else a==="close"&&pt("Window close requires the Tauri desktop build")}})}wa();window.__MELO_REBIND_MAIN__=()=>{wa(),Object.entries(va).forEach(([t,a])=>{const i=document.getElementById(t);i&&(i.onclick=()=>Te(a))})};const Vt=document.createElement("div");Vt.id="aboutPop";Vt.style.display="none";document.body.appendChild(Vt);document.addEventListener("click",t=>{var a,i;(a=t.target)!=null&&a.closest("#btnAbout")&&(t.stopPropagation(),Vt.innerHTML=`
    <div class="about-head">Melo <b>0.5.0 Beta</b></div>
    <div style="font-size:11.5px; color:var(--text-soft); margin:6px 0 10px;">
      Modern Windows Music Player<br/>
      Tauri 2 + TypeScript + Rust
    </div>
    <a class="about-link" id="aboutLink" href="https://github.com/Arvanta/Melo" rel="noopener">github.com/Arvanta/Melo ↗</a>`,Vt.style.display=Vt.style.display==="none"?"block":"none",(i=document.getElementById("aboutLink"))==null||i.addEventListener("click",e=>{e.preventDefault();const o="https://github.com/Arvanta/Melo";K?W(()=>import("./core-DhEqZVGG.js"),[]).then(n=>n.invoke("open_url",{url:o})).catch(()=>window.open(o,"_blank")):window.open(o,"_blank")}))});document.addEventListener("click",t=>{!t.target.closest("#aboutPop")&&!t.target.closest("#btnAbout")&&(Vt.style.display="none")});K&&lt?lt==="library"||lt==="playlist"?Re(Mt,pt):lt==="equalizer"?Oe(Mt,pt,{remote:!0}):lt==="lyrics"?He(Mt):lt==="settings"&&(Ve(),Fe(pt)):(qa(Mt,pt),Re(Mt,pt),Oe(Mt,pt),Ra(Mt),He(Mt),Da(pt),Fe(pt),Ve());
//# sourceMappingURL=index-E_qMIc1l.js.map
