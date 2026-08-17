const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/event-CNdo2oXa.js","assets/core-DhEqZVGG.js","assets/index-DiyoAAdc.js","assets/index-CHth0gh2.js","assets/index-Bq0iOnRE.js","assets/index-CS3Qnt9j.js","assets/webviewWindow-mjQkSB26.js","assets/dpi-fvP-W2qr.js","assets/window-BWd3Cypy.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function i(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(o){if(o.ep)return;o.ep=!0;const n=i(o);fetch(o.href,n)}})();const Ia="modulepreload",_a=function(t){return"/"+t},Be={},F=function(e,i,a){let o=Promise.resolve();if(i&&i.length>0){let l=function(c){return Promise.all(c.map(d=>Promise.resolve(d).then(w=>({status:"fulfilled",value:w}),w=>({status:"rejected",reason:w}))))};document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),p=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));o=l(i.map(c=>{if(c=_a(c),c in Be)return;Be[c]=!0;const d=c.endsWith(".css"),w=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${w}`))return;const x=document.createElement("link");if(x.rel=d?"stylesheet":Ia,d||(x.as="script"),x.crossOrigin="",x.href=c,p&&x.setAttribute("nonce",p),document.head.appendChild(x),d)return new Promise((m,k)=>{x.addEventListener("load",m),x.addEventListener("error",()=>k(new Error(`Unable to preload CSS for ${c}`)))})}))}function n(l){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=l,window.dispatchEvent(s),!s.defaultPrevented)throw l}return o.then(l=>{for(const s of l||[])s.status==="rejected"&&n(s.reason);return e().catch(n)})},K=typeof window.__TAURI_INTERNALS__<"u"||typeof window.__TAURI__<"u";async function j(t,e){if(K)try{const{emit:i}=await F(async()=>{const{emit:a}=await import("./event-CNdo2oXa.js");return{emit:a}},__vite__mapDeps([0,1]));await i(t,e);return}catch{}window.dispatchEvent(new CustomEvent(t,{detail:e}))}function X(t,e){K&&F(async()=>{const{listen:i}=await import("./event-CNdo2oXa.js");return{listen:i}},__vite__mapDeps([0,1])).then(({listen:i})=>{i(t,a=>{e(a.payload)})}).catch(()=>{}),window.addEventListener(t,i=>e(i.detail))}let tt=null,be=null,ze=!1,it={total:0,currentSeq:null,currentTrack:null,currentPosition:0,shuffle:!1,repeat:"off",currentOrderIndex:null};const we=new Set;function Ge(t){if(!t)return null;let e=t.cover;return e&&be&&!/^(data:|blob:|https?:)/i.test(e)&&(e=be(e)),{...t,cover:e,source:"scan"}}function xe(t){var a,o,n,l,s;const e=Ge((a=t==null?void 0:t.currentTrack)!=null?a:null),i=(t==null?void 0:t.repeat)==="all"?"all":(t==null?void 0:t.repeat)==="one"?"one":"off";return{total:Number((o=t==null?void 0:t.total)!=null?o:0),currentSeq:(n=t==null?void 0:t.currentSeq)!=null?n:null,currentTrack:e,currentPosition:Number((l=t==null?void 0:t.currentPosition)!=null?l:0),shuffle:!!(t!=null&&t.shuffle),repeat:i,currentOrderIndex:(s=t==null?void 0:t.currentOrderIndex)!=null?s:null}}async function ut(){if(!ze){if(K){const t=await F(()=>import("./core-DhEqZVGG.js"),[]);tt=t.invoke,be=t.convertFileSrc}ze=!0}}function ke(t,e=!0){it=t,e&&we.forEach(i=>{try{i(it)}catch{}})}async function Qe(){if(!(!K||!tt))try{const t=await tt("queue_get_state");ke(xe(t))}catch{}}async function Ye(){return await ut(),K&&await Qe(),it}function Je(t){we.add(t);try{t(it)}catch{}return()=>we.delete(t)}function qt(){return it}async function Xe(t,e,i){if(await ut(),K&&tt){const a=await tt("queue_get_page",{search:i&&i.trim()?i:null,limit:t,offset:e});return{...a,items:(a.items||[]).map(o=>{const n=Ge(o);return n?{...n,seq:Number(o.seq)}:null}).filter(Boolean)}}return{items:[],total:0,limit:t,offset:e,currentSeq:null}}async function Lt(t,e){if(!tt)return it;const i=await tt(t,e);return ke(xe(i)),it}async function Ot(t,e={}){var i,a,o;return await ut(),tt?Lt("queue_populate",{source:t,startSeq:(i=e.startSeq)!=null?i:null,startTrackId:(a=e.startTrackId)!=null?a:null,autoplay:(o=e.autoplay)!=null?o:!0}):it}async function le(t){return await ut(),!tt||!t.length?it:Lt("queue_append",{trackIds:t})}async function Ca(t){return await ut(),!tt||!t.length?it:Lt("queue_play_next",{trackIds:t})}async function Ke(t){return await ut(),tt?Lt("queue_remove",{seq:t}):it}async function Ze(t,e){return await ut(),tt?Lt("queue_reorder",{fromSeq:t,toSeq:e}):it}async function ta(){return await ut(),tt?Lt("queue_clear"):it}async function ea(){return await ut(),tt?Lt("queue_next"):it}async function aa(){return await ut(),tt?Lt("queue_prev"):it}async function se(t,e=0){return await ut(),tt?Lt("queue_jump",{seq:t,position:e}):it}async function Aa(t){if(await ut(),!!tt){it.currentPosition=t;try{await tt("queue_set_position",{position:t})}catch{}}}async function ia(t){return await ut(),tt?Lt("queue_set_shuffle",{enabled:t}):it}async function na(t){return await ut(),tt?Lt("queue_set_repeat",{mode:t}):it}async function Ba(t=100){return await ut(),tt?tt("queue_history",{limit:t}):[]}X("melo:queue-state",t=>{ke(xe(t))});X("melo:queue-refresh",()=>{Qe()});window.MeloQueue={get state(){return it},populate:Ot,append:le,playNext:Ca,remove:Ke,reorder:Ze,clear:ta,next:ea,prev:aa,jump:se,setShuffle:ia,setRepeat:na,page:Xe,history:Ba};let Pe=!1;async function za(){if(!Pe){Pe=!0;try{const t=globalThis;if(typeof t.Buffer>"u"){const e=await F(()=>import("./index-DiyoAAdc.js").then(i=>i.i),__vite__mapDeps([2,3]));t.Buffer=e.Buffer}typeof t.process>"u"&&(t.process={env:{},browser:!0,nextTick:e=>setTimeout(e,0)})}catch{}}}async function Pa(t,e){var i;try{await za();const a=await F(()=>import("./index-Bq0iOnRE.js").then(c=>c.i),__vite__mapDeps([4,3])),o=a&&typeof a.parseBlob=="function"?a:a.default||a,n=await Promise.race([o.parseBlob(t),new Promise((c,d)=>setTimeout(()=>d(new Error("timeout")),1800))]),l=n==null?void 0:n.common;if(!l)return;l.title&&(e.title=l.title),l.artist?e.artist=l.artist:l.artists&&l.artists[0]&&(e.artist=l.artists[0]),l.album&&(e.album=l.album),l.genre&&l.genre[0]&&(e.genre=l.genre[0]),l.year&&(e.year=l.year);const s=(i=l.picture)==null?void 0:i[0];if(s&&s.data){const c=s.format||"image/jpeg",d=s.data;if(d.length>6e5)return;let w="";const x=8192;for(let m=0;m<d.length;m+=x){const k=d.subarray(m,m+x);w+=String.fromCharCode.apply(null,k)}e.cover=`data:${c};base64,${btoa(w)}`}const p=n==null?void 0:n.format;p&&p.duration&&!e.duration&&(e.duration=Math.floor(p.duration))}catch{}}async function oa(t,e,i=1800){return await Pa(t,e),e}async function qa(t){return new Promise(e=>{if(!t)return e(null);const i=new Image;i.crossOrigin="anonymous",i.onload=()=>{try{const a=document.createElement("canvas"),o=a.getContext("2d");if(!o)return e(null);a.width=40,a.height=40,o.drawImage(i,0,0,40,40);const n=o.getImageData(0,0,40,40).data;let l={r:42,g:123,b:214},s=-1;for(let p=0;p<n.length;p+=4){const c=n[p],d=n[p+1],w=n[p+2];if(n[p+3]<128)continue;const m=Math.max(c,d,w),k=Math.min(c,d,w),v=(m+k)/510,A=m-k,I=A===0?0:A/(1-Math.abs(2*v-1));if(I>.25&&v>.25&&v<.82){const O=I*1.5+(1-Math.abs(v-.5));O>s&&(s=O,l={r:c,g:d,b:w})}}s>0?e(l):e(null)}catch{e(null)}},i.onerror=()=>e(null),i.src=t})}async function ra(t){const e=localStorage.getItem("melo-dynamic-theme")!=="0",i=document.documentElement;if(!e||!t){i.style.removeProperty("--accent"),i.style.removeProperty("--visualizer"),i.style.removeProperty("--accent-glow");return}const a=await qa(t);if(a){const o=`rgb(${a.r}, ${a.g}, ${a.b})`;i.style.setProperty("--accent",o),i.style.setProperty("--visualizer",o),i.style.setProperty("--accent-glow",`rgba(${a.r}, ${a.g}, ${a.b}, 0.35)`)}else i.style.removeProperty("--accent"),i.style.removeProperty("--visualizer"),i.style.removeProperty("--accent-glow")}const Zt=[31,62,125,250,500,1e3,2e3,4e3,8e3,16e3];let St=null,ge=null,ve=[],Xt=null,Qt=null;function ce(t){if(!St){const e=window.AudioContext||window.webkitAudioContext;St=new e;try{ge=St.createMediaElementSource(t)}catch{}if(ve=Zt.map(i=>{const a=St.createBiquadFilter();return a.type="peaking",a.frequency.value=i,a.Q.value=1.4,a.gain.value=0,a}),Xt=St.createGain(),Xt.gain.value=1,Qt=St.createAnalyser(),Qt.fftSize=2048,Qt.smoothingTimeConstant=.72,ge){let i=ge;for(const a of ve)i.connect(a),i=a;i.connect(Xt),Xt.connect(Qt),Qt.connect(St.destination)}}return{ctx:St,filters:ve,gain:Xt,analyser:Qt,async resume(){St&&St.state==="suspended"&&await St.resume().catch(()=>{})}}}async function Ra(t,e){let i,a,o,n,l,s,p,c=null,d,w,x,m,k,v,A,I,O,W,et,P,g,u=null,S=!1,$=-1;await Ye();function Y(r){if(!isFinite(r))return"0:00";const y=Math.floor(r/60),L=Math.floor(r%60).toString().padStart(2,"0");return`${y}:${L}`}function nt(){if(!d)return;const r=parseFloat(d.max)||100,y=parseFloat(d.value)||0,L=r>0?y/r*100:0;d.style.setProperty("--progress",L+"%")}function ot(){w&&w.style.setProperty("--vol",w.value+"%")}function st(){v&&(v.classList.toggle("muted",t.muted),v.title=t.muted?"Unmute":"Mute")}function mt(r=!0){t.muted=!t.muted,st(),r&&e(t.muted?"Muted":"Unmuted")}async function Tt(r){if(!r)return"";if(/^(https?|data|blob):/.test(r))return r;if(K)try{const{convertFileSrc:y}=await F(async()=>{const{convertFileSrc:L}=await import("./core-DhEqZVGG.js");return{convertFileSrc:L}},[]);return y(r)}catch{}return r}function wt(r){try{if(!r){localStorage.removeItem("melo-current-track");return}const{cover:y,...L}=r;localStorage.setItem("melo-current-track",JSON.stringify(L))}catch{}}function Pt(r){if(!r){document.querySelectorAll(".track-row.active").forEach(y=>y.classList.remove("active"));return}document.querySelectorAll(".track-row").forEach(y=>{y.classList.toggle("active",y.getAttribute("data-track-id")===r||y.getAttribute("data-pl-track")===r)})}async function xt(r,y,L){if(u=r,A||C(),!r){t.pause(),t.removeAttribute("src"),t.load(),A&&(A.textContent="No track loaded"),I&&(I.textContent="Add music to start playing"),O&&(O.textContent=""),W&&(W.textContent="—"),et&&(et.textContent=""),P&&(P.style.display="none"),g&&(g.style.display="grid"),d&&(d.max="240",d.value="0",nt()),m&&(m.textContent="0:00"),x&&(x.textContent="0:00"),a&&(a.style.display="block"),o&&(o.style.display="none"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="none"),Pt(),wt(null),window.dispatchEvent(new CustomEvent("melo:trackChange",{detail:null})),j("melo:track-changed",null),j("melo:playback-state",{track:null,currentTime:0,paused:!0});return}if(t.src=await Tt(r.path),t.load(),L&&L>0){const H=()=>{t.removeEventListener("loadedmetadata",H);try{t.currentTime=L}catch{}};t.addEventListener("loadedmetadata",H)}A&&(A.textContent=r.title||"Unknown Title"),I&&(I.textContent=r.artist||"Unknown Artist"),O&&(O.textContent=r.album||""),W&&(W.textContent=r.codec||"AUDIO"),et&&(et.textContent=r.specs||""),r.cover&&P?(P.src=r.cover,P.style.display="block",g&&(g.style.display="none")):(P&&(P.style.display="none"),g&&(g.style.display="grid")),d&&(d.max=String(r.duration||240),d.value="0",nt()),m&&(m.textContent=Y(r.duration)),x&&(x.textContent="0:00"),_(),ra(r.cover||null),Pt(r.id),"mediaSession"in navigator&&(navigator.mediaSession.metadata=new MediaMetadata({title:r.title,artist:r.artist,album:r.album,artwork:r.cover?[{src:r.cover,sizes:"512x512",type:"image/jpeg"}]:[]}),navigator.mediaSession.setActionHandler("play",()=>yt()),navigator.mediaSession.setActionHandler("pause",()=>It()),navigator.mediaSession.setActionHandler("previoustrack",()=>E()),navigator.mediaSession.setActionHandler("nexttrack",()=>b()),navigator.mediaSession.setActionHandler("seekto",H=>{H.seekTime&&(t.currentTime=H.seekTime)})),wt(r),window.dispatchEvent(new CustomEvent("melo:trackChange",{detail:r})),j("melo:track-changed",r),j("melo:playback-state",{track:r,currentTime:t.currentTime||L||0,paused:t.paused}),y?yt():(a&&(a.style.display="block"),o&&(o.style.display="none"))}let ft=!1;async function dt(){try{await ce(t).resume()}catch{}ft&&(ft=!1,t.play().then(()=>{a&&(a.style.display="none"),o&&(o.style.display="block")}).catch(()=>{}))}window.addEventListener("pointerdown",dt),window.addEventListener("keydown",dt),X("melo:pref-changed",r=>{r&&r.key==="replayGainGlobal"&&_(),r&&r.key==="showStopBtn"&&D(!!r.value)}),X("melo:request-playback-state",()=>{j("melo:playback-state",{track:u,currentTime:t.currentTime||0,paused:t.paused})}),X("melo:seek-playback",r=>{const y=Number(r);Number.isFinite(y)&&y>=0&&(t.currentTime=y)});let Ct=null,kt=!1;function vt(r,y,L){Ct&&cancelAnimationFrame(Ct);const H=t.volume,at=performance.now(),G=bt=>{const Ft=Math.min(1,(bt-at)/y);t.volume=H+(r-H)*Ft,Ft<1?Ct=requestAnimationFrame(G):(Ct=null,L==null||L())};Ct=requestAnimationFrame(G)}async function yt(){try{await ce(t).resume()}catch{}const r=localStorage.getItem("melo-pref-fadePause")!=="0",y=M();r&&kt&&(t.volume=0),t.play().then(()=>{ft=!1,a&&(a.style.display="none"),o&&(o.style.display="block"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="playing"),r&&kt?(kt=!1,vt(y,300)):t.volume=y}).catch(()=>{ft||(ft=!0,e("Click once inside player to begin audio playback"))})}function It(){localStorage.getItem("melo-pref-fadePause")!=="0"&&!t.paused?(kt=!0,vt(0,500,()=>t.pause())):(kt=!1,t.pause()),a&&(a.style.display="block"),o&&(o.style.display="none"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}function At(){if(!u){const r=qt();if(r.currentSeq!=null){se(r.currentSeq,0);return}return}t.paused?yt():It()}function f(){t.pause();try{t.currentTime=0}catch{}a&&(a.style.display="block"),o&&(o.style.display="none"),d&&(d.value="0",nt()),x&&(x.textContent="0:00"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}async function b(){if(!u)return;if(qt().repeat==="one"){try{t.currentTime=0}catch{}yt();return}await ea()}async function E(){if(u){if(t.currentTime>3){t.currentTime=0;return}await aa()}}function M(){var at;if(!w)return 1;const r=parseInt(w.value,10)/100,L=localStorage.getItem("melo-pref-replayGainGlobal")!=="0"&&(at=u==null?void 0:u.replayGain)!=null?at:0,H=Math.pow(10,L/20);return Math.min(1,Math.max(0,r*H))}function _(){!u||!w||(t.volume=M())}function D(r=localStorage.getItem("melo-pref-showStopBtn")==="1"){const y=document.getElementById("btnStop");y&&y.style.setProperty("display",r?"inline-flex":"none","important")}function q(r){if(s&&s.classList.toggle("active",r.shuffle),p){p.classList.toggle("active",r.repeat!=="off");const y={off:"Repeat off",all:"Repeat all",one:"Repeat one"};p.title=y[r.repeat]}}function C(){i=document.getElementById("btnPlay"),a=document.getElementById("iconPlay"),o=document.getElementById("iconPause"),n=document.getElementById("btnPrev"),l=document.getElementById("btnNext"),s=document.getElementById("btnShuffle"),p=document.getElementById("btnRepeat"),c=document.getElementById("btnStop"),D(),d=document.getElementById("seekBar"),w=document.getElementById("volBar"),x=document.getElementById("curTime"),m=document.getElementById("durTime"),k=document.getElementById("volPct"),v=document.getElementById("volIcon"),v&&(v.onclick=()=>mt()),st(),A=document.getElementById("trackTitle"),I=document.getElementById("trackArtist"),O=document.getElementById("trackAlbum"),W=document.getElementById("trackCodec"),et=document.getElementById("trackSpecs"),P=document.getElementById("coverImg"),g=document.getElementById("coverFallback"),i&&(i.onclick=At),c&&(c.onclick=f),n&&(n.onclick=E),l&&(l.onclick=b),s&&(s.onclick=async()=>{const L=!qt().shuffle;await ia(L),e(L?"Shuffle on":"Shuffle off")}),p&&(p.onclick=async()=>{const y=qt(),L=y.repeat==="off"?"all":y.repeat==="all"?"one":"off";await na(L),e({off:"Repeat off",all:"Repeat all",one:"Repeat one"}[L])}),d&&(d.oninput=()=>{S=!0,x&&(x.textContent=Y(parseFloat(d.value))),nt()},d.onchange=()=>{t.currentTime=parseFloat(d.value),S=!1}),w&&(w.oninput=()=>{ot(),k&&(k.textContent=w.value+"%"),_()}),nt(),ot(),q(qt());const r=Number.isFinite(t.duration)&&t.duration>0?Math.floor(t.duration):(u==null?void 0:u.duration)||0;d&&(r>0&&(d.max=String(r)),d.value=String(Math.floor(t.currentTime||0)),nt()),m&&(m.textContent=Y(r)),x&&(x.textContent=Y(t.currentTime||0)),u&&(A&&(A.textContent=u.title||"Unknown Title"),I&&(I.textContent=u.artist||"Unknown Artist"),O&&(O.textContent=u.album||""),W&&(W.textContent=u.codec||"AUDIO"),et&&(et.textContent=u.specs||""),u.cover&&P&&(P.src=u.cover,P.style.display="block",g&&(g.style.display="none")))}C(),Je(r=>{q(r);const y=u==null?void 0:u.id,L=r.currentTrack;if((L==null?void 0:L.id)!==y){const H=r.currentSeq!=null&&r.currentTrack!=null&&y!=null;xt(L,H);return}if(L&&Number.isFinite(r.currentPosition)&&Math.abs(r.currentPosition-(t.currentTime||0))>1.5)try{t.currentTime=r.currentPosition}catch{}}),X("melo:queue-populated",r=>{const y=qt();if(!y.currentTrack)return;const L=(r==null?void 0:r.autoplay)!==!1;(u==null?void 0:u.id)!==y.currentTrack.id&&xt(y.currentTrack,L,y.currentPosition||0)}),document.addEventListener("wheel",r=>{const y=r.target;if(!(y!=null&&y.closest("#playerCard"))||!w)return;r.preventDefault();const L=r.deltaY<0?5:-5;w.value=String(Math.max(0,Math.min(100,Number(w.value)+L))),w.dispatchEvent(new Event("input"))},{passive:!1});async function B(r=!1){const y=t.currentTime||0;if(!(!r&&Math.abs(y-$)<5)){$=y;try{localStorage.setItem("melo-resume-state",JSON.stringify({trackId:(u==null?void 0:u.id)||null,position:y}))}catch{}await Aa(y)}}t.addEventListener("timeupdate",()=>{j("melo:playback-position",t.currentTime||0),!S&&d&&x&&(d.value=String(Math.floor(t.currentTime)),x.textContent=Y(t.currentTime),nt()),B(!1)}),t.addEventListener("loadedmetadata",()=>{if(!d||!m)return;const r=Math.floor(t.duration||(u==null?void 0:u.duration)||240);d.max=String(r),m.textContent=Y(r),nt()}),t.addEventListener("ended",()=>{b()}),t.addEventListener("pause",()=>{a&&(a.style.display="block"),o&&(o.style.display="none"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused"),u&&B(!0)}),t.addEventListener("error",()=>{u&&(e("Could not play this track — skipping"),b())}),window.addEventListener("keydown",r=>{r.target.tagName!=="INPUT"&&(r.code==="Space"&&(r.preventDefault(),At()),r.code==="ArrowRight"&&(t.currentTime+=5),r.code==="ArrowLeft"&&(t.currentTime-=5),(r.key==="m"||r.key==="M")&&mt(),(r.key==="s"||r.key==="S")&&s&&s.click(),(r.key==="r"||r.key==="R")&&p&&p.click(),r.code==="ArrowUp"&&w&&(w.value=String(Math.min(100,parseInt(w.value,10)+5)),w.dispatchEvent(new Event("input"))),r.code==="ArrowDown"&&w&&(w.value=String(Math.max(0,parseInt(w.value,10)-5)),w.dispatchEvent(new Event("input"))))}),X("melo:tray-action",r=>{r==="play_pause"?At():r==="next"?b():r==="prev"?E():r==="mute"&&mt()}),window.MeloPlayer={get currentTrack(){return u},get currentIndex(){var r;return(r=qt().currentOrderIndex)!=null?r:0},loadTrack:async(r,y=!0,L)=>{await se(r,L||0)},play:yt,pause:It,stop:f,next:b,prev:E,get audio(){return t},rebind:C},window.__MELO_REBIND__=C;const N=qt();N.currentTrack&&N.currentPosition>1?xt(N.currentTrack,!1,N.currentPosition):N.currentTrack&&xt(N.currentTrack,!1)}const oe=new URLSearchParams(location.search).get("panel")||"main",Q=t=>String(t!=null?t:"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");function qe(t){const e=Number.isFinite(t)?Math.max(0,t):0;return`${Math.floor(e/60)}:${String(Math.floor(e%60)).padStart(2,"0")}`}function Re(t,e){const i=document.getElementById("trackList"),a=document.getElementById("libraryStats"),o=document.getElementById("searchInput"),n=document.getElementById("libraryTabs"),l=document.getElementById("btn-scan"),s=document.getElementById("btn-clear-library"),p=document.getElementById("winPlaylistTracks"),c=document.getElementById("winPlaylistEmpty"),d=document.getElementById("playlistSearchInput"),w=document.getElementById("queueCount"),x=document.getElementById("btn-clear-playlist");let m=null,k=null,v=!1,A=[],I=null,O=null,W=!1,et=[],P=null;const g=new Map;let u="artists",S=null,$=null,Y=null,nt="";const ot=54,st=52;let mt=0,Tt=0,wt=0,Pt=0,xt=0,ft=null;const dt=document.createElement("div");dt.className="ctx-menu",dt.style.display="none",dt.innerHTML='<button class="ctx-item danger" id="ctxRemoveLibraryTrack">Remove from Library</button>',document.body.appendChild(dt),document.addEventListener("click",h=>{h.target.closest("#ctxRemoveLibraryTrack")||(dt.style.display="none")}),dt.querySelector("#ctxRemoveLibraryTrack").onclick=async h=>{h.stopPropagation(),!(!m||!ft)&&(await m("delete_tracks",{ids:[ft]}),dt.style.display="none",ft=null,j("melo:library-changed",{removed:1}))};function Ct(){return new Promise(h=>{const T=document.createElement("div");T.className="confirm-overlay",T.innerHTML=`<div class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="clearLibraryTitle">
        <div id="clearLibraryTitle" class="confirm-title">Clear Library?</div>
        <div class="confirm-message">All tracks will be removed from Library browsing. Your playlists and their tracks will remain unchanged.</div>
        <div class="confirm-actions"><button class="btn small" data-confirm="cancel">Cancel</button><button class="btn small danger-confirm" data-confirm="yes">Clear Library</button></div>
      </div>`,document.body.appendChild(T);const z=R=>{document.removeEventListener("keydown",V),T.remove(),h(R)};T.querySelector("[data-confirm='cancel']").onclick=()=>z(!1),T.querySelector("[data-confirm='yes']").onclick=()=>z(!0),T.onclick=R=>{R.target===T&&z(!1)};const V=R=>{R.key==="Escape"&&(document.removeEventListener("keydown",V),z(!1))};document.addEventListener("keydown",V)})}function kt(h){const T=l==null?void 0:l.querySelector(".scan-label");T&&(T.textContent=h)}function vt(h){if(!h)return"";if(/^(data:|blob:|https?:)/i.test(h))return h;try{return k?k(h):""}catch{return""}}function yt(h){return{...h,cover:vt(h.cover),source:"scan"}}const It=[],At=new Set;let f=0;function b(h,T){!h||!m||At.has(h)||(At.add(h),It.push({id:h,element:T}),E())}function E(){for(;m&&f<2&&It.length;){const h=It.shift();f++,m("ensure_track_artwork",{id:h.id}).then(T=>{if(!T||!h.element.isConnected)return;const z=vt(T),V=et.find(R=>R.id===h.id);V&&(V.cover=z),h.element.style.backgroundImage=`url("${z.replace(/"/g,"%22")}")`,h.element.textContent=""}).catch(()=>{}).finally(()=>{f--,At.delete(h.id),E()})}}function M(){P&&document.querySelectorAll(".track-row").forEach(h=>{const T=h,z=T.dataset.trackId||T.dataset.plTrack;T.classList.toggle("active",z===P)})}function _(h){const T=[...h.querySelectorAll("[data-artwork-id]")];if(!("IntersectionObserver"in window)){T.forEach(V=>b(V.dataset.artworkId,V));return}const z=new IntersectionObserver(V=>{V.forEach(R=>{if(!R.isIntersecting)return;const U=R.target;z.unobserve(U),b(U.dataset.artworkId,U)})},{root:h,rootMargin:"120px"});T.forEach(V=>z.observe(V))}async function D(){if(v)return;if(!K){v=!0,q();return}const h=await F(()=>import("./core-DhEqZVGG.js"),[]);m=h.invoke,k=h.convertFileSrc,v=!0,await Promise.all([C(),B()]),await G(!0),await Ut(!0)}function q(){i&&(i.innerHTML='<div style="padding:30px;text-align:center;color:var(--text-muted)">The persistent Library is available in the Tauri desktop build.</div>')}async function C(){if(!(!m||!a))try{const h=await m("library_stats");a.textContent=`${h.tracks} tracks • ${h.artists} artists • ${h.albums} albums`}catch{}}async function B(){if(m)try{A=await m("list_playlists")}catch{}}function N(){S=$=Y=null,i&&(i.scrollTop=0)}function r(){return u==="artists"?S?"tracks":"groups":u==="albums"?$?"tracks":"groups":Y?"tracks":"groups"}function y(){return u}function L(){return u==="artists"&&S?$?`${S} › ${$}`:S:u==="albums"&&$?$:u==="genres"&&Y?Y:""}async function H(h,T){if(!m)return{items:[],total:0,limit:T,offset:h};if(r()==="groups")return m("library_groups",{kind:y(),search:nt||null,artist:u==="artists"?S:null,limit:T,offset:h});const z=await m("library_tracks",{search:nt||null,artist:S,album:$,genre:Y,sort:"title-asc",limit:T,offset:h});return z.items=z.items.map(yt),et=z.items,z}async function at(h){const T=g.get(h);if(T)return T;if(!m)return[];const z=await m("library_groups",{kind:"albums",search:null,artist:h,limit:500,offset:0});return g.set(h,z.items),z.items}async function G(h=!1){if(!i||!m)return;h&&(i.scrollTop=0),i.style.display="block",i.style.position="relative",i.style.overflowY="auto";const T=Math.max(300,i.clientHeight||420),z=u==="artists"&&!!S,V=L(),R=z?84:V?38:0,U=Math.ceil(T/ot),Z=Math.max(0,i.scrollTop-R),$t=Math.max(0,Math.floor(Z/ot)-8),jt=Math.max(40,U+16),ae=++mt;try{const rt=z&&S?at(S):Promise.resolve(null),[ht,J]=await Promise.all([H($t,jt),rt]);if(ae!==mt)return;const ie=ht.total*ot+R,fe=ht.items.map((Ht,Yt)=>{const Jt=ht.offset+Yt,ne=R+Jt*ot;if(r()==="groups"){const Gt=Ht,Ce=vt(Gt.cover),Ae=`lib-avatar ${y()==="albums"?"lib-avatar-album":""}`,La=y()==="albums"?"💿":Q((Gt.name[0]||"?").toUpperCase()),Ta=Ce?`<div class="${Ae}" style="background-image:url('${Q(Ce)}')"></div>`:`<div class="${Ae}" data-artwork-id="${Q(Gt.artworkTrackId||"")}">${La}</div>`;return`<div class="lib-item virtual-row" data-group-index="${Yt}" style="position:absolute;left:0;right:0;top:${ne}px;height:${ot}px">${Ta}<div style="flex:1;min-width:0"><div class="t-title">${Q(Gt.name)}</div><div class="t-artist">${Q(Gt.subtitle||`${Gt.count} tracks`)}</div></div><span class="chev-r">›</span></div>`}const Bt=Ht;return`<div class="track-row virtual-row" data-track-id="${Q(Bt.id)}" data-page-index="${Yt}" style="position:absolute;left:0;right:0;top:${ne}px;height:${ot}px">
          <span class="num">${Jt+1}</span>
          ${Bt.cover?`<div class="track-cover-mini" style="background-image:url('${Q(Bt.cover)}');background-size:cover;background-position:center"></div>`:`<div class="track-cover-mini cover-default" data-artwork-id="${Q(Bt.id)}">♪</div>`}
          <div style="flex:1;min-width:0"><div class="t-title">${Q(Bt.title)}</div><div class="t-artist">${Q(Bt.artist)} • ${Q(Bt.album)}</div></div>
          <span class="t-dur">${qe(Bt.duration)}</span>
          <button class="btn small ghost" data-add-track="${Q(Bt.id)}" title="Add to queue">+</button>
        </div>`}).join(""),Ea=z&&J?`<div class="artist-detail-header" style="position:sticky;top:0;height:${R}px;z-index:4;background:var(--card)">
            <div class="lib-crumb" style="height:38px"><button class="btn small" id="virtualBack">‹ Artists</button><b>${Q(S)}</b></div>
            <div class="chip-row artist-album-chips custom-scrollbar" style="height:46px;padding-top:6px;padding-bottom:6px">
              <button class="chip ${$===null?"active":""}" data-artist-album="all">All Tracks</button>
              ${J.map((Ht,Yt)=>{const Jt=vt(Ht.cover),ne=Jt?`<span class="chip-thumb" style="background-image:url('${Q(Jt)}')"></span>`:`<span class="chip-thumb cover-default" data-artwork-id="${Q(Ht.artworkTrackId||"")}">♪</span>`;return`<button class="chip ${$===Ht.name?"active":""}" data-artist-album-index="${Yt}">${ne}${Q(Ht.name)}</button>`}).join("")}
            </div>
          </div>`:V?`<div class="lib-crumb virtual-crumb" style="position:sticky;top:0;height:${R}px;z-index:3;background:var(--card)"><button class="btn small" id="virtualBack">‹ Back</button><b>${Q(V)}</b></div>`:"";i.innerHTML=`<div class="virtual-list-space" style="position:relative;height:${Math.max(ie,T)}px">${Ea}${fe}</div>`,Ft(ht.items,J||[]),_(i),M()}catch{i.innerHTML='<div style="padding:24px;text-align:center;color:var(--text-muted)">Could not read the Library database.</div>'}}function bt(){return{type:"library",search:nt||null,artist:S,album:$,genre:Y,sort:"title-asc"}}function Ft(h,T=[]){var z,V;i&&(i.querySelectorAll("[data-group-index]").forEach(R=>{R.onclick=()=>{const U=h[Number(R.dataset.groupIndex||0)],Z=(U==null?void 0:U.name)||"",$t=(U==null?void 0:U.key)||Z;if(u==="artists"&&!S)S=Z;else if(u==="artists"&&S||u==="albums"){const jt=$t.split("\0");u==="albums"&&(S=jt[0]||null),$=jt[1]||Z}else u==="genres"&&(Y=Z);G(!0)}}),i.querySelectorAll("[data-add-track]").forEach(R=>{R.onclick=async U=>{U.stopPropagation(),R.dataset.addTrack&&(await le([R.dataset.addTrack]),e("Added to queue"))}}),i.querySelectorAll("[data-track-id]").forEach(R=>{R.onclick=async U=>{if(U.target.closest("[data-add-track]"))return;const Z=R.dataset.trackId||null,$t=bt();await Ot($t,{autoplay:!0,startTrackId:Z})},R.oncontextmenu=U=>{U.preventDefault(),U.stopPropagation(),ft=R.dataset.trackId||null,dt.style.display="block";const Z=dt.getBoundingClientRect();dt.style.left=`${Math.max(6,Math.min(U.clientX,window.innerWidth-Z.width-6))}px`,dt.style.top=`${Math.max(6,Math.min(U.clientY,window.innerHeight-Z.height-6))}px`}}),(z=i.querySelector("#virtualBack"))==null||z.addEventListener("click",()=>{u==="artists"&&S?(S=null,$=null):$?$=null:S?S=null:Y=null,G(!0)}),(V=i.querySelector("[data-artist-album='all']"))==null||V.addEventListener("click",()=>{$=null,G(!0)}),i.querySelectorAll("[data-artist-album-index]").forEach(R=>{R.onclick=()=>{const U=T[Number(R.dataset.artistAlbumIndex||0)];$=(U==null?void 0:U.name)||null,G(!0)}}))}let Wt=null;async function Ut(h=!1){var ae;if(!p)return;h&&(p.scrollTop=0),p.style.display="block",p.style.position="relative",p.style.overflowY="auto";const T=Math.max(260,p.clientHeight||420),z=((ae=d==null?void 0:d.value)==null?void 0:ae.trim())||"",V=Math.max(0,Math.floor(p.scrollTop/st)-8),R=Math.max(40,Math.ceil(T/st)+16),U=++Tt;let Z;try{Z=await Xe(R,V,z)}catch{return}if(U!==Tt)return;const $t=Z.items;if(w&&(w.textContent=z?`${Z.total} matches`:`${Z.total} track${Z.total===1?"":"s"}`),c&&(c.style.display=Z.total?"none":"block"),p.style.display=Z.total?"block":"none",!Z.total){p.innerHTML="";return}const jt=$t.map((rt,ht)=>{const J=rt,ie=Z.offset+ht,fe=ie*st;return`<div class="track-row virtual-row queue-row" data-queue-seq="${Q(J.seq)}" data-track-id="${Q(J.id)}" draggable="${z?"false":"true"}" style="position:absolute;left:0;right:0;top:${fe}px;height:${st}px">
        <span class="num">${ie+1}</span>
        ${J.cover?`<div class="track-cover-mini" style="background-image:url('${Q(J.cover)}');background-size:cover;background-position:center"></div>`:`<div class="track-cover-mini cover-default" data-artwork-id="${Q(J.id)}">♪</div>`}
        <div style="flex:1;min-width:0"><div class="t-title">${Q(J.title)}</div><div class="t-artist">${Q(J.artist)} • ${Q(J.album)}</div></div>
        <span class="t-dur">${qe(J.duration)}</span>
        <button class="btn small ghost" data-remove-seq="${Q(J.seq)}" title="Remove from queue">×</button>
      </div>`}).join("");p.innerHTML=`<div style="position:relative;height:${Math.max(T,Z.total*st)}px">${jt}</div>`,_(p),M(),p.querySelectorAll(".queue-row").forEach(rt=>{rt.onclick=async ht=>{if(ht.target.closest("[data-remove-seq]"))return;const J=Number(rt.dataset.queueSeq);Number.isFinite(J)&&await se(J,0)},rt.ondragstart=()=>{Wt=Number(rt.dataset.queueSeq),rt.classList.add("dragging")},rt.ondragend=()=>{rt.classList.remove("dragging"),Wt=null},rt.ondragover=ht=>{ht.preventDefault()},rt.ondrop=async ht=>{ht.preventDefault();const J=Number(rt.dataset.queueSeq);Number.isFinite(Wt)&&Number.isFinite(J)&&Wt!==J&&!z&&await Ze(Wt,J),Wt=null}}),p.querySelectorAll("[data-remove-seq]").forEach(rt=>{rt.onclick=async ht=>{ht.stopPropagation();const J=Number(rt.dataset.removeSeq);Number.isFinite(J)&&await Ke(J)}})}async function Ie(h,T="replace"){if(await D(),!m||!h.length)return[];const V=(await m("import_audio_files",{paths:h,playlistId:T==="none"?null:"p1",replacePlaylist:T==="replace"})).map(yt);return await Promise.all([C(),B(),G()]),j("melo:library-changed",{imported:V.length}),V}async function he(h,T=!1){if(await D(),!m)return null;if(I)return I;const z=await m("start_library_scan",{path:h});return I=z.scanId,O=z.scanId,W=T,l&&kt("Cancel Scan"),I}async function Sa(){if(!K)return;if(I&&m){await m("cancel_library_scan",{scanId:I});return}const{open:h}=await F(async()=>{const{open:z}=await import("./index-CS3Qnt9j.js");return{open:z}},__vite__mapDeps([5,1])),T=await h({directory:!0,multiple:!1});T&&await he(T)}async function Ma(h){if(await D(),!m)return null;const T=await m("get_track_by_id",{id:h});return T?yt(T):null}n==null||n.querySelectorAll("[data-libtab]").forEach(h=>{h.onclick=()=>{n.querySelectorAll("[data-libtab]").forEach(T=>T.classList.remove("active")),h.classList.add("active"),u=h.dataset.libtab||"artists",N(),G(!0)}}),o==null||o.addEventListener("input",()=>{nt=o.value.trim(),window.clearTimeout(wt),wt=window.setTimeout(()=>G(!0),180)}),i==null||i.addEventListener("scroll",()=>{window.clearTimeout(wt),wt=window.setTimeout(()=>G(),60)}),p==null||p.addEventListener("scroll",()=>{window.clearTimeout(Pt),Pt=window.setTimeout(()=>Ut(),60)}),d==null||d.addEventListener("input",()=>{window.clearTimeout(xt),xt=window.setTimeout(()=>Ut(!0),160)}),l==null||l.addEventListener("click",Sa),s==null||s.addEventListener("click",async()=>{if(m){if(I){alert("Cancel the active scan before clearing the Library database.");return}await Ct()&&(await m("clear_library_database"),et=[],g.clear(),await Promise.all([C(),B(),G(!0)]),j("melo:library-changed",{cleared:!0}))}}),x==null||x.addEventListener("click",async()=>{await ta()}),K&&F(async()=>{const{getCurrentWebviewWindow:h}=await import("./webviewWindow-mjQkSB26.js");return{getCurrentWebviewWindow:h}},__vite__mapDeps([6,7,1,0,8])).then(({getCurrentWebviewWindow:h})=>{h().onDragDropEvent(async T=>{if(T.payload.type!=="drop")return;const z=T.payload.paths||[];if(!z.length)return;const V=await Ie(z,oe==="playlist"?"append":"none");if(V.length)oe==="playlist"?await le(V.map(R=>R.id)):await Ot({type:"tracks",ids:V.map(R=>R.id)},{autoplay:!0});else for(const R of z)try{await he(R,oe!=="playlist")}catch{}})}).catch(()=>{}),X("melo:scan-progress",async h=>{if(h){if(h.scanId&&(I=h.scanId),l&&!h.finished&&kt(`Cancel ${h.done||0}/${h.total||"…"}`),l){const T=h.total?Math.max(0,Math.min(100,Number(h.done||0)/Number(h.total)*100)):0;l.style.setProperty("--scan-progress",`${T}%`),l.classList.toggle("scanning",!h.finished)}h.finished&&(h.scanId===O&&W&&!h.cancelled&&await Ot({type:"scan",scanId:h.scanId},{autoplay:!0}),I=null,O=null,W=!1,l&&(kt("Scan"),l.classList.remove("scanning"),l.style.setProperty("--scan-progress","0%")),await Promise.all([C(),B(),G()]))}});let _e=0;X("melo:library-changed",()=>{g.clear(),window.clearTimeout(_e),_e=window.setTimeout(()=>{C(),G()},500)}),X("melo:queue-changed",()=>Ut()),X("melo:queue-cleared",()=>Ut(!0)),window.MeloLibrary={get tracks(){return et},get playlists(){return A},scanFolder:he,importPaths:Ie,getTrack:Ma,render:()=>G(),addToCurrentPlaylist:async h=>{h.length&&await le(h.map(T=>T.id))},currentPlaylistName:()=>"Playing Queue"},Je(h=>{var T;P=((T=h.currentTrack)==null?void 0:T.id)||null,M(),w&&(w.textContent=`${h.total} track${h.total===1?"":"s"}`)}),oe==="playlist"?Ye().then(()=>D()).then(()=>Ut(!0)).then(()=>M()).catch(()=>e("Could not initialize the Playing Queue")):D().catch(()=>e("Could not initialize the Library database"))}const te={flat:[0,0,0,0,0,0,0,0,0,0],pop:[-1,2,4,4,2,-1,-1,2,3,3],rock:[4,3,2,-1,-2,-2,1,3,4,4],bass:[6,5,4,2,1,0,-1,-1,-2,-3],treble:[-3,-2,-1,0,1,2,3,5,6,6],dance:[5,4,2,0,-1,-1,2,4,5,3],jazz:[2,1,2,3,2,0,1,2,3,2],classical:[3,2,1,0,0,0,-1,2,3,4],vocal:[-2,-1,0,2,4,4,3,1,0,-1],acoustic:[3,2,1,1,2,2,3,3,2,1],hiphop:[5,4,1,2,-1,-1,1,-1,2,3],metal:[4,2,-1,-2,-1,1,3,4,5,4]};function ye(t){for(const[e,i]of Object.entries(te))if(i.every((a,o)=>a===t[o]))return e;return"custom"}function Oe(t,e,i={}){const a=!!i.remote,o=document.getElementById("eqEnable"),n=document.getElementById("eqPreset"),l=document.getElementById("btnEqReset"),s=document.getElementById("eqBands"),p=document.getElementById("eqCanvas"),c=p?p.getContext("2d"):null;let d=null,w=[],x=[],m=new Array(Zt.length).fill(0);try{const g=JSON.parse(localStorage.getItem("melo-eq-gains")||"null");Array.isArray(g)&&g.length===Zt.length&&(m=g.map(u=>typeof u=="number"?Math.max(-12,Math.min(12,u)):0))}catch{}let k=localStorage.getItem("melo-eq-preset")||ye(m),v=localStorage.getItem("melo-eq-enabled")!=="0";function A(){if(!d)try{const g=ce(t);d=g.ctx,w=g.filters,w.forEach((u,S)=>{u.gain.value=v?m[S]:0})}catch{}}function I(g,u){A(),w[g]&&v&&(w[g].gain.value=u)}function O(g){A(),m=[...g],v&&g.forEach((u,S)=>{w[S]&&(w[S].gain.value=u)}),P()}function W(g){A(),v=g,g?m.forEach((u,S)=>{w[S]&&(w[S].gain.value=u)}):w.forEach(u=>{u.gain.value=0}),P()}a||t&&t.addEventListener("play",()=>{A(),(d==null?void 0:d.state)==="suspended"&&d.resume().catch(()=>{})}),X("melo:eq",g=>{g&&(g.type==="gain"?(a||I(g.idx,g.val),m[g.idx]=g.val,x[g.idx]&&(x[g.idx].value=String(g.val),et(x[g.idx])),n&&(n.value=ye(m)),P()):g.type==="gains"?(a||O(g.values),m=[...g.values],x.length&&x.forEach((u,S)=>{u.value=String(m[S]),et(u)}),n&&g.preset&&(n.value=g.preset),P()):g.type==="enable"&&(v=!!g.on,a||W(v),o&&(o.checked=v),P()))});function et(g){var $;const u=parseInt(g.value),S=($=g.parentElement)==null?void 0:$.querySelector(".val");S&&(S.textContent=(u>0?"+":"")+u+"dB")}function P(){if(!p||!c)return;const g=window.devicePixelRatio||1,u=p.clientWidth*g,S=p.clientHeight*g;if(u<=0||S<=0)return;p.width=u,p.height=S,c.clearRect(0,0,u,S);const $=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#2a7bd6",Y=m;if(!v){c.strokeStyle="rgba(100,120,150,0.25)",c.lineWidth=2*g,c.beginPath(),c.moveTo(0,S/2),c.lineTo(u,S/2),c.stroke();return}c.strokeStyle=$,c.lineWidth=2.5*g,c.lineJoin="round",c.beginPath(),Y.forEach((nt,ot)=>{const st=ot/(Y.length-1)*u,mt=S/2-nt/12*(S/2-10*g);if(ot===0)c.moveTo(st,mt);else{const Tt=(ot-1)/(Y.length-1)*u,wt=S/2-Y[ot-1]/12*(S/2-10*g);c.quadraticCurveTo((Tt+st)/2,wt,st,mt)}}),c.stroke(),Y.forEach((nt,ot)=>{const st=ot/(Y.length-1)*u,mt=S/2-nt/12*(S/2-10*g);c.fillStyle=$,c.beginPath(),c.arc(st,mt,4*g,0,Math.PI*2),c.fill(),c.fillStyle="white",c.beginPath(),c.arc(st,mt,2*g,0,Math.PI*2),c.fill()}),c.strokeStyle="rgba(100,120,150,0.3)",c.lineWidth=1*g,c.setLineDash([4*g,4*g]),c.beginPath(),c.moveTo(0,S/2),c.lineTo(u,S/2),c.stroke(),c.setLineDash([])}s&&(s.innerHTML="",Zt.forEach((g,u)=>{const S=m[u]||0,$=document.createElement("div");$.className="eq-band",$.innerHTML=`
        <input type="range" min="-12" max="12" value="${S}" step="1" data-idx="${u}" orient="vertical" />
        <label>${g>=1e3?g/1e3+"k":g}</label>
        <span style="font-size:10px;color:var(--text-muted);min-height:12px;" class="val">${(S>0?"+":"")+S+"dB"}</span>
      `,s.appendChild($)}),x=Array.from(s.querySelectorAll("input")),x.forEach(g=>{g.addEventListener("input",()=>{const u=parseInt(g.dataset.idx),S=parseInt(g.value);et(g),m[u]=S,P();const $=ye(m);n&&(n.value=$),localStorage.setItem("melo-eq-gains",JSON.stringify(m)),localStorage.setItem("melo-eq-preset",$),a||I(u,S),j("melo:eq",{type:"gain",idx:u,val:S,values:m})})})),n&&(n.value=k,n.addEventListener("change",()=>{const g=te[n.value]||te.flat;x.length&&x.forEach((u,S)=>{u.value=String(g[S]),et(u)}),m=[...g],P(),localStorage.setItem("melo-eq-gains",JSON.stringify(m)),localStorage.setItem("melo-eq-preset",n.value),a||O(g),j("melo:eq",{type:"gains",values:g,preset:n.value}),e(`Preset: ${n.options[n.selectedIndex].text}`)})),l&&l.addEventListener("click",()=>{const g=te.flat;x.length&&x.forEach((u,S)=>{u.value="0",et(u)}),m=[...g],n&&(n.value="flat"),localStorage.setItem("melo-eq-gains",JSON.stringify(m)),localStorage.setItem("melo-eq-preset","flat"),a||O(g),j("melo:eq",{type:"gains",values:g,preset:"flat"}),P(),e("Equalizer reset to Flat (0dB)")}),o&&(o.checked=v,o.addEventListener("change",()=>{v=o.checked,localStorage.setItem("melo-eq-enabled",v?"1":"0"),a||W(v),j("melo:eq",{type:"enable",on:v}),P(),e(v?"Equalizer On":"Equalizer off — Flat")})),p&&new ResizeObserver(()=>P()).observe(p),P(),window.MeloEqualizer={presets:te,frequencies:Zt,displayGains:m,reset:()=>l==null?void 0:l.click()}}const Kt=[{id:"bars",label:"Classic Bars"},{id:"thin",label:"Thin Bars"},{id:"line",label:"Spectrum Line"},{id:"mirror",label:"Mirror Bars"},{id:"wave",label:"Oscilloscope"},{id:"spectrumWave",label:"Spectrum Wave"},{id:"blocks",label:"Block Equalizer"}];function Oa(t){let e=document.getElementById("vizBars");if(!e)return;let i=v(e),a=i.getContext("2d"),o=null,n=null,l=null,s=null,p=null,c=!1,d=localStorage.getItem("melo-viz-mode")||"bars";Kt.some(f=>f.id===d)||(d="bars");let w=0,x=[],m=.45,k=null;function v(f){let b=f.querySelector("canvas");return b||(f.innerHTML="",b=document.createElement("canvas"),f.appendChild(b)),b}function A(){if(!(n&&l))try{const f=ce(t);o=f.ctx,n=f.analyser,l=new Uint8Array(n.frequencyBinCount),s=new Uint8Array(n.fftSize)}catch{c=!0}}function I(f){const b=l.length,E=((o==null?void 0:o.sampleRate)||44100)/2,M=45,_=Math.min(15e3,E*.95),D=Math.log(M),q=Math.log(_),C=[];for(let B=0;B<f;B++){const N=Math.exp(D+(q-D)*B/f),r=Math.exp(D+(q-D)*(B+1)/f);let y=Math.floor(N/E*b),L=Math.max(y+1,Math.ceil(r/E*b));y<0&&(y=0),L>b&&(L=b);let H=0;for(let at=y;at<L;at++)H+=l[at];C.push(H/(L-y)/255)}return C}function O(f){const b=performance.now()/1e3,E=Math.pow(Math.abs(Math.sin(b*2.2)),2.5),M=[];for(let _=0;_<f;_++){let D=.42+.26*Math.sin(b*1.35+_*.62)+.2*Math.sin(b*2.9+_*1.31)+Math.random()*.07;D*=.55+.5*E,M.push(Math.max(.04,Math.min(1,D)))}return M}function W(f){const b=performance.now()/1e3,E=.5+.5*Math.pow(Math.abs(Math.sin(b*1.9)),2);for(let M=0;M<f.length;M++){const _=M/f.length;f[M]=128+66*E*(Math.sin(_*Math.PI*6+b*7)*.6+Math.sin(_*Math.PI*13-b*11)*.4)}}function et(f){let b;if(c||!n||!l)b=O(f);else if(n.getByteFrequencyData(l),b=I(f),!b.some(_=>_>.01)&&!t.paused)b=O(f);else for(let _=0;_<f;_++)b[_]*=1+1.7*(_/Math.max(1,f-1));let E=0;for(const M of b)M>E&&(E=M);E>m?m=E:m=Math.max(.35,m*.985),x.length!==f&&(x=new Array(f).fill(0));for(let M=0;M<f;M++){const _=Math.min(1,b[M]/m),D=_>x[M]?.55:.16;x[M]+=(_-x[M])*D}return x}function P(f,b){return getComputedStyle(document.documentElement).getPropertyValue(f).trim()||b}function g(){return i.width/Math.max(1,i.clientWidth)||1}function u(f,b,E,M,_){if(_=Math.min(_,E/2,M/2),a.roundRect){a.roundRect(f,b,E,M,_);return}a.rect(f,b,E,M)}function S(){const f=window.devicePixelRatio||1,b=i.clientWidth||(e==null?void 0:e.clientWidth)||200,E=i.clientHeight||(e==null?void 0:e.clientHeight)||56;b>0&&E>0&&(i.width=Math.round(b*f),i.height=Math.round(E*f))}new ResizeObserver(S).observe(i),S();function $(f,b,E,M){const _=g(),D=P("--visualizer","#38bdf8"),q=P("--accent","#0284c7"),C=f.length,B=b/C,N=Math.max(1.2*_,B*(1-M));for(let r=0;r<C;r++){const y=f[r],L=Math.max(2*_,y*(E-4*_)),H=r*B+(B-N)/2,at=E-L-1*_,G=a.createLinearGradient(0,at,0,E);G.addColorStop(0,q),G.addColorStop(1,D),a.fillStyle=G,a.beginPath(),u(H,at,N,L,Math.min(N/2,3.5*_)),a.fill()}}function Y(f,b,E){const M=g(),_=P("--visualizer","#38bdf8"),D=P("--accent","#0284c7"),q=f.length,C=b/q,B=E/2,N=Math.max(1.5*M,C*.62);for(let r=0;r<q;r++){const y=Math.max(1.5*M,f[r]*(E/2-3*M)),L=r*C+(C-N)/2,H=a.createLinearGradient(0,B-y,0,B+y);H.addColorStop(0,D),H.addColorStop(.5,_),H.addColorStop(1,D),a.fillStyle=H,a.beginPath(),u(L,B-y,N,y*2,Math.min(N/2,3*M)),a.fill()}}function nt(f,b,E){const M=g(),_=P("--visualizer","#38bdf8"),D=P("--accent","#0284c7"),q=f.length,C=[],B=[];for(let r=0;r<q;r++)C.push((r+.5)/q*b),B.push(E-2*M-f[r]*(E-8*M));a.beginPath(),a.moveTo(C[0],E),a.lineTo(C[0],B[0]);for(let r=1;r<q;r++){const y=(C[r-1]+C[r])/2;a.quadraticCurveTo(C[r-1],B[r-1],y,(B[r-1]+B[r])/2)}a.lineTo(C[q-1],B[q-1]),a.lineTo(C[q-1],E),a.closePath();const N=a.createLinearGradient(0,0,0,E);N.addColorStop(0,_),N.addColorStop(1,"transparent"),a.globalAlpha=.18,a.fillStyle=N,a.fill(),a.globalAlpha=1,a.beginPath(),a.moveTo(C[0],B[0]);for(let r=1;r<q;r++){const y=(C[r-1]+C[r])/2;a.quadraticCurveTo(C[r-1],B[r-1],y,(B[r-1]+B[r])/2)}a.lineTo(C[q-1],B[q-1]),a.strokeStyle=D,a.lineWidth=2*M,a.lineJoin="round",a.stroke()}function ot(f,b,E){const M=g(),_=P("--visualizer","#38bdf8"),D=P("--accent","#0284c7"),q=E/2,C=f.length,B=f.map((y,L)=>{const H=L/Math.max(1,C-1),at=Math.pow(Math.sin(Math.PI*H),.28);return Math.max(.7*M,y*at*(E*.46))}),N=y=>{a.beginPath();for(let L=0;L<C;L++){const H=L/Math.max(1,C-1)*b,at=q+(y?-B[L]:B[L]);if(L===0)a.moveTo(H,at);else{const G=(L-1)/Math.max(1,C-1)*b,bt=q+(y?-B[L-1]:B[L-1]);a.quadraticCurveTo(G,bt,(G+H)/2,(bt+at)/2)}}};N(!0);for(let y=C-1;y>=0;y--){const L=y/Math.max(1,C-1)*b;a.lineTo(L,q+B[y])}a.closePath();const r=a.createLinearGradient(0,0,0,E);r.addColorStop(0,D),r.addColorStop(.5,_),r.addColorStop(1,D),a.fillStyle=r,a.globalAlpha=.3,a.fill(),a.globalAlpha=.18,a.shadowColor=_,a.shadowBlur=8*M,N(!0),a.strokeStyle=_,a.lineWidth=4*M,a.stroke(),N(!1),a.stroke(),a.shadowBlur=0,a.globalAlpha=1,N(!0),a.strokeStyle=D,a.lineWidth=1.2*M,a.stroke(),N(!1),a.stroke(),a.beginPath(),a.moveTo(0,q),a.lineTo(b,q),a.strokeStyle=_,a.globalAlpha=.45,a.lineWidth=.8*M,a.stroke(),a.globalAlpha=1}function st(f,b,E){const M=g(),_=P("--visualizer","#38bdf8"),D=P("--accent","#0284c7"),q=f.length,C=8,B=Math.max(1*M,b*.0035),N=Math.max(1*M,E*.025),r=Math.max(1,(b-B*(q-1))/q),y=Math.max(1,(E-N*(C-1))/C),L=a.createLinearGradient(0,0,0,E);L.addColorStop(0,D),L.addColorStop(1,_),a.fillStyle=L;for(let H=0;H<q;H++){const at=Math.max(1,Math.min(C,Math.round(f[H]*C))),G=H*(r+B);for(let bt=0;bt<at;bt++){const Ft=E-(bt+1)*y-bt*N;a.globalAlpha=.58+.42*((bt+1)/C),a.fillRect(G,Ft,r,y)}}a.globalAlpha=1}function mt(){const f=i.width,b=i.height,E=g(),M=P("--accent","#0284c7");let _;c||!n||!s?(p||(p=new Uint8Array(1024)),W(p),_=p):(n.getByteTimeDomainData(s),_=s);const D=()=>{a.beginPath();for(let q=0;q<=f;q+=2){const C=Math.min(_.length-1,Math.floor(q/f*_.length)),B=_[C]/255*b;q===0?a.moveTo(q,B):a.lineTo(q,B)}};D(),a.strokeStyle=M,a.globalAlpha=.16,a.lineWidth=6*E,a.lineJoin="round",a.stroke(),D(),a.globalAlpha=1,a.lineWidth=1.8*E,a.stroke()}function Tt(f){var M;const b=(M=e==null?void 0:e.dataset)==null?void 0:M.bars;if(!b)return f;const E=parseInt(b,10);return Number.isFinite(E)&&E>=4&&E<=256?Math.round(E):f}function wt(){const f=i.width,b=i.height;if(!f||!b)return;if(a.clearRect(0,0,f,b),d==="wave"){mt();return}const E=d==="bars"?Tt(16):d==="thin"?Tt(56):d==="line"?64:d==="spectrumWave"?72:d==="blocks"?22:Tt(24),M=et(E);d==="bars"?$(M,f,b,.34):d==="thin"?$(M,f,b,.32):d==="line"?nt(M,f,b):d==="mirror"?Y(M,f,b):d==="spectrumWave"?ot(M,f,b):d==="blocks"&&st(M,f,b)}function Pt(){w=requestAnimationFrame(Pt),wt()}function xt(){w||Pt()}function ft(f,b=!1){d=f,x=[],localStorage.setItem("melo-viz-mode",f)}function dt(){return k||(k=document.createElement("div"),k.className="viz-menu",k.style.display="none",document.body.appendChild(k),k)}function Ct(){const f=dt();f.innerHTML='<div class="viz-menu-label">Visualizer type</div>'+Kt.map(b=>`<button class="viz-menu-item ${b.id===d?"active":""}" data-mode="${b.id}">${b.id===d?"✓":""}<span>${b.label}</span></button>`).join(""),f.querySelectorAll("[data-mode]").forEach(b=>{b.addEventListener("click",E=>{E.stopPropagation(),ft(b.dataset.mode),vt()})})}function kt(f,b){Ct();const E=k;E.style.display="block";const M=E.getBoundingClientRect();E.style.left=Math.max(8,Math.min(f,window.innerWidth-M.width-8))+"px",E.style.top=Math.max(8,Math.min(b,window.innerHeight-M.height-8))+"px"}function vt(){k&&(k.style.display="none")}function yt(){e&&(e.title="Click: next mode • Right-click: choose mode",e.addEventListener("click",()=>{vt();const f=Kt.findIndex(b=>b.id===d);ft(Kt[(f+1)%Kt.length].id)}),e.addEventListener("contextmenu",f=>{f.preventDefault(),f.stopPropagation(),kt(f.clientX,f.clientY)}))}document.addEventListener("click",f=>{k&&k.style.display!=="none"&&!k.contains(f.target)&&vt()}),document.addEventListener("keydown",f=>{f.key==="Escape"&&vt()});function It(){A(),xt(),(o==null?void 0:o.state)==="suspended"&&o.resume().catch(()=>{})}t.addEventListener("play",It),It(),yt(),document.addEventListener("visibilitychange",()=>{document.hidden?(cancelAnimationFrame(w),w=0):xt()});function At(){cancelAnimationFrame(w),w=0,e=document.getElementById("vizBars"),e&&(i=v(e),a=i.getContext("2d"),new ResizeObserver(S).observe(i),S(),yt(),xt())}window.__MELO_REBIND_VISUALIZER__=At}function $e(t){if(!t||!t.trim())return{isSynced:!1,lines:[],raw:""};const e=[],i=t.split(/\r?\n/),a=/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;let o=!1;for(const n of i){const l=n.trim();if(!l||/^\[[a-z]{2,8}:/i.test(l))continue;const s=[...l.matchAll(a)];if(s.length>0){o=!0;const p=l.replace(a,"").trim();for(const c of s){const d=parseInt(c[1],10),w=parseInt(c[2],10),x=c[3]||"0",m=x.length===2?parseInt(x,10)*10:x.length===1?parseInt(x,10)*100:parseInt(x.slice(0,3),10),k=d*60+w+m/1e3;e.push({time:k,text:p})}}else e.push({time:-1,text:l})}return e.sort((n,l)=>n.time-l.time),{isSynced:o,lines:e,raw:t}}function He(t,e){var k;const i=document.getElementById("lyricsContainer"),a=document.getElementById("lyricsStatus"),o=document.getElementById("lyricsTrackTitle");let n={isSynced:!1,lines:[]},l=null,s=-1,p=0;async function c(v){if(v.lyrics&&v.lyrics.trim().length>0)return v.lyrics;if(window.__TAURI__)try{const{invoke:A}=await F(async()=>{const{invoke:O}=await import("./core-DhEqZVGG.js");return{invoke:O}},[]),I=await A("get_track_lyrics",{path:v.path});if(I)return I}catch{}return null}async function d(v){if(!v){l=null,n={isSynced:!1,lines:[],raw:""},o&&(o.textContent="No track playing"),w();return}l=v.id,o&&(o.textContent=`${v.title} — ${v.artist}`);const A=await c(v);n=$e(A||""),w()}function w(){if(i){if(i.innerHTML="",s=-1,!n.lines.length){a&&(a.style.display="block",a.innerHTML='No synced lyrics found (.lrc)<br/><span style="font-size:10.5px; opacity:0.7;">Place a matching .lrc file in the song folder or add lyrics in the tag editor.</span>');return}a&&(a.style.display="none"),n.lines.forEach((v,A)=>{const I=document.createElement("div");I.className="lyric-line",I.dataset.idx=String(A),I.dataset.time=String(v.time),I.textContent=v.text||"♪",v.time>=0&&(I.style.cursor="pointer",I.title=`Seek to ${Math.floor(v.time/60)}:${Math.floor(v.time%60).toString().padStart(2,"0")}`,I.addEventListener("click",()=>{j("melo:seek-playback",v.time),window.__TAURI__||(t.currentTime=v.time,t.play().catch(()=>{}))})),i.appendChild(I)})}}function x(){if(!i||!n.isSynced||!n.lines.length)return;const v=window.__TAURI__?p:t.currentTime;let A=-1;for(let I=0;I<n.lines.length&&n.lines[I].time<=v;I++)A=I;if(A!==s){s=A;const I=i.querySelectorAll(".lyric-line");if(I.forEach((O,W)=>{O.classList.toggle("active",W===s),O.classList.toggle("passed",W<s)}),s>=0&&I[s]){const O=I[s],W=i.clientHeight,P=O.offsetTop-i.offsetTop-W/2+O.clientHeight/2;i.scrollTo({top:Math.max(0,P),behavior:"smooth"})}}}t.addEventListener("timeupdate",x),window.addEventListener("melo:trackChange",v=>{d(v.detail)}),X("melo:track-changed",v=>{d(v)}),X("melo:playback-state",v=>{v&&(p=Number(v.currentTime)||0,v.track&&v.track.id!==l?d(v.track):x())}),X("melo:playback-position",v=>{p=Number(v)||0,x()});const m=((k=window.MeloPlayer)==null?void 0:k.currentTrack)||null;if(m)d(m);else try{const v=JSON.parse(localStorage.getItem("melo-current-track")||"null");v&&d(v)}catch{}j("melo:request-playback-state"),setTimeout(()=>j("melo:request-playback-state"),250),window.MeloLyrics={loadTrackLyrics:d,parseLRC:$e}}let _t=null;const De=`<!doctype html>
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
    border-radius: 6px; cursor: default; letter-spacing: 0.02em;
    pointer-events: none;
  }
  
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
    border: 3.5px solid var(--accent, #5b92a5) !important;
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
      <span class="app-name-btn" id="appMenuBtn">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M2 12h2l1-7 2 14 3-10 2 6h2l2-9 2 14 2-7h2"/></svg>
        Melo
      </span>
      <div class="mini-sep"></div>
      <button class="mini-btn" id="btnAddFiles" title="Add files (Ctrl+O)">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 12v6"/><path d="M9 15h6"/></svg>
      </span>
      <button class="mini-btn" id="btnAddFolder" title="Add folder (Ctrl+Shift+O)">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><path d="M12 10v6"/><path d="M9 13h6"/></svg>
      </span>
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
    border-radius: 6px; cursor: default; letter-spacing: 0.02em;
    pointer-events: none;
  }
  
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
    border: 3.5px solid var(--accent, #4db6ac) !important;
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
      <span class="app-name-btn" id="appMenuBtn">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M2 12h2l1-7 2 14 3-10 2 6h2l2-9 2 14 2-7h2"/></svg>
        Melo
      </span>
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
`,de={"compact-pill-light.html":De,"compact-pill-dark.html":Ne,"compact-pill-light":De,"compact-pill-dark":Ne},$a=[{id:"compact-pill-light",name:"Minimal Compact (Light)",filename:"compact-pill-light.html"},{id:"compact-pill-dark",name:"Minimal Compact (Dark)",filename:"compact-pill-dark.html"},{id:"full-html-example",name:"Full HTML Example (Vertical)",filename:"full-html-example.html"}];let Se=null;function Ha(){return Se}function la(t){const e=["trackTitle","btnPlay","seekBar","coverImg"];let i=0;for(const a of e)t.includes(a)&&i++;return i>=3}function Da(t){const e={},i=t.match(/<meta[^>]+name=["']melo-window["'][^>]*content=["']([^"']*)["']/i);if(!i)return e;for(const a of i[1].split(",")){const[o,n]=a.split("=").map(s=>s.trim());if(!o||n===void 0)continue;const l=o;if(l==="resizable"||l==="transparent")e[l]=/^(1|true|yes)$/i.test(n);else{const s=parseInt(n,10);Number.isFinite(s)&&s>0&&(e[l]=s)}}return e}function Rt(t,e){const i=document.getElementById("playerCard");if(!i)return;const a=i._originalHTML||i.innerHTML;i._originalHTML||(i._originalHTML=a),_t&&(_t.remove(),_t=null);let n=[...t.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(w=>w[1]).join(`
`);n&&(_t=document.createElement("style"),_t.id="melo-custom-skin",_t.textContent=n,document.head.appendChild(_t));const l=la(t);document.documentElement.classList.toggle("full-html-skin-active",l),document.body.classList.toggle("full-html-skin-active",l);let s="";const p=t.match(/<body[^>]*>([\s\S]*?)<\/body>/i);p?s=p[1]:s=t.split(/<\/style>/i).pop()||"";const c=document.createElement("div");c.innerHTML=s;const d=c.querySelector("#melo-player");if(d&&(s=d.innerHTML),l&&s.trim().length>20){Se=t;const w=s.trim();i.innerHTML=w,e&&e("Skin applied"),setTimeout(()=>{var m,k;(m=window.__MELO_REBIND__)==null||m.call(window);const x=window.__MELO_AUDIO__;x&&window.__MELO_REBIND_VISUALIZER__&&window.__MELO_REBIND_VISUALIZER__(x),(k=window.__MELO_REBIND_MAIN__)==null||k.call(window)},40)}else n&&e&&e("Skin CSS applied");localStorage.setItem("melo-custom-skin",t),localStorage.setItem("melo-custom-skin-isFull",l?"1":"0")}function Me(t,e=!0){Se=null,document.documentElement.classList.remove("compact-skin-active","full-html-skin-active"),document.body.classList.remove("compact-skin-active","full-html-skin-active"),_t&&(_t.remove(),_t=null);const i=document.getElementById("playerCard");i&&i._originalHTML&&(i.innerHTML=i._originalHTML,setTimeout(()=>{var o,n;(o=window.__MELO_REBIND__)==null||o.call(window);const a=window.__MELO_AUDIO__;a&&window.__MELO_REBIND_VISUALIZER__&&window.__MELO_REBIND_VISUALIZER__(a),(n=window.__MELO_REBIND_MAIN__)==null||n.call(window)},40)),localStorage.removeItem("melo-custom-skin"),localStorage.removeItem("melo-custom-skin-isFull"),localStorage.setItem("melo-active-skin-id","default"),e&&j("melo:skin-changed","default"),t&&t("Switched to Default Melo skin")}async function sa(){if(K)try{const{invoke:t}=await F(async()=>{const{invoke:i}=await import("./core-DhEqZVGG.js");return{invoke:i}},[]),e=await t("list_installed_skins");if(Array.isArray(e)&&e.length>0)return e}catch{}return $a}async function ca(t,e){if(K)try{const{invoke:a}=await F(async()=>{const{invoke:n}=await import("./core-DhEqZVGG.js");return{invoke:n}},[]),o=await a("read_skin_file",{filenameOrPath:t});if(o&&o.trim().length>0)return Rt(o,e),!0}catch{}try{const a=t.startsWith("skins/")?t:`skins/${t}`,o=await fetch(a);if(o.ok){const n=await o.text();return Rt(n,e),!0}}catch{}const i=t.replace(/^.*[\\/]/,"");return de[i]?(Rt(de[i],e),!0):(e&&e(`Could not load skin: ${t}`),!1)}async function Nt(t,e,i,a=!0){if(t==="default"){Me(i,a);return}let o=t;const n=t==="compact-pill"||t.startsWith("compact-pill");document.documentElement.classList.toggle("compact-skin-active",n),document.body.classList.toggle("compact-skin-active",n),n?o=e==="dark"?"compact-pill-dark.html":"compact-pill-light.html":!o.endsWith(".html")&&!o.endsWith(".htm")&&(o=o+".html");let l=!1;n&&de[o]?(Rt(de[o],i),l=!0):l=await ca(o,i),l&&(localStorage.setItem("melo-active-skin-id",t),a&&j("melo:skin-changed",t))}async function da(t){if(K)try{const{invoke:e}=await F(async()=>{const{invoke:i}=await import("./core-DhEqZVGG.js");return{invoke:i}},[]);await e("open_skins_folder"),t&&t("Opening skins folder...")}catch{t&&t("Could not open skins folder")}else t&&t("Skins are located in the skins/ folder")}function Na(t){const e=document.getElementById("skinUpload"),i=document.getElementById("linkDownloadExample");i&&i.addEventListener("click",n=>{n.preventDefault(),ca("compact-pill-light.html")});const a=localStorage.getItem("melo-active-skin-id")||"default",o=localStorage.getItem("melo-theme")||"dark";a!=="default"&&setTimeout(()=>{Nt(a,o,void 0,!1)},150),X("melo:theme",n=>{const l=localStorage.getItem("melo-active-skin-id");l&&l!=="default"&&Nt(l,n,void 0,!1)}),X("melo:skin-changed",n=>{if(n&&typeof n=="string"){const l=localStorage.getItem("melo-theme")||"dark";Nt(n,l,void 0,!1)}}),e&&e.addEventListener("change",async()=>{var p;const n=(p=e.files)==null?void 0:p[0];if(!n)return;const l=await n.text(),s=n.name;if(K)try{const{invoke:c}=await F(async()=>{const{invoke:w}=await import("./core-DhEqZVGG.js");return{invoke:w}},[]),d=await c("save_custom_skin_file",{filename:s,content:l});j("melo:skins-changed"),t(`Imported ${s}`),Rt(l,t),localStorage.setItem("melo-active-skin-id",s),j("melo:skin-changed",s),e.value="";return}catch(c){console.error("Failed to save imported skin",c),t("Could not save skin to the skins folder. See the log for details.")}Rt(l,t),localStorage.setItem("melo-active-skin-id",s),j("melo:skin-changed",s),e.value=""}),document.addEventListener("dragover",n=>{var l;[...((l=n.dataTransfer)==null?void 0:l.types)||[]].includes("Files")&&n.preventDefault()}),document.addEventListener("drop",async n=>{var s;const l=[...((s=n.dataTransfer)==null?void 0:s.files)||[]].find(p=>p.name.endsWith(".html")||p.name.endsWith(".htm"));if(l){n.preventDefault();const p=await l.text();if(p.includes("<style")||p.includes("<html")||la(p)){const c=l.name;if(K)try{const{invoke:d}=await F(async()=>{const{invoke:w}=await import("./core-DhEqZVGG.js");return{invoke:w}},[]);await d("save_custom_skin_file",{filename:c,content:p}),j("melo:skins-changed")}catch(d){console.error("Failed to save dragged skin",d),t("Could not save skin to the skins folder.")}Rt(p,t),localStorage.setItem("melo-active-skin-id",c),j("melo:skin-changed",c)}}}),window.MeloSkin={applyCustomSkin:Rt,resetSkin:Me,applySkinChoice:Nt,listInstalledSkins:sa,openSkinsFolderOnDisk:da}}const Va=(t,e,i)=>{const a=t[e];return a?typeof a=="function"?a():Promise.resolve(a):new Promise((o,n)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(n.bind(null,new Error("Unknown variable dynamic import: "+e+(e.split("/").length!==i?". Note that variables only represent file names one level deep.":""))))})},pa={code:"en",name:"English",nativeName:"English",authors:["Melo Team"]},Ee={_meta:pa,"settings.tabs.general":"General","settings.tabs.playback":"Playback","settings.tabs.appearance":"Appearance & Skin","settings.tabs.shortcuts":"Shortcuts","settings.tabs.about":"About","settings.general.language.label":"Language","settings.general.language.desc":"Interface language — more languages coming via community translation","settings.general.tray.label":"Close to system tray","settings.general.tray.desc":"Minimize to system tray on window close","settings.general.resume.label":"Resume playback on reopen","settings.general.resume.desc":"Continue playback of the previous track where you left off","settings.playback.replaygain.label":"ReplayGain normalization","settings.playback.replaygain.desc":"Equalize track volume levels automatically","settings.playback.fadepause.label":"Fade out on pause","settings.playback.fadepause.desc":"Smooth 0.3s fade-out on pause, fade back in on resume","settings.appearance.showstop.label":"Show Stop button","settings.appearance.showstop.desc":"Display a Stop control next to Play/Pause in the player"},Fa=Object.freeze(Object.defineProperty({__proto__:null,_meta:pa,default:Ee},Symbol.toStringTag,{value:"Module"})),ua=[{code:"en",nativeName:"English"}],Dt={en:Ee};let ma=Dt.en,ha="en";function Wa(){return ha}async function fa(t){if(ua.some(e=>e.code===t)||(t="en"),!Dt[t])if(t==="en")Dt.en=Ee;else try{const e=await Va(Object.assign({"./locales/en.json":()=>F(()=>Promise.resolve().then(()=>Fa),void 0)}),`./locales/${t}.json`,3);Dt[t]=e.default||e}catch{t="en"}ha=t,ma=Dt[t]||Dt.en,localStorage.setItem("melo-pref-language",t),document.dispatchEvent(new CustomEvent("melo:locale-changed",{detail:t}))}function ct(t){var e,i;return(i=(e=ma[t])!=null?e:Dt.en[t])!=null?i:t}function Ve(){const t=localStorage.getItem("melo-pref-language")||"en";fa(t)}const ga=document.querySelector("#app");ga.innerHTML=`
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
            <select class="settings-select" id="setLanguage">${ua.map(t=>`<option value="${t.code}">${t.nativeName}</option>`).join("")}</select>
          </div>
          <div class="settings-row">
            <div><div class="label">${ct("settings.general.tray.label")}</div><div class="desc">${ct("settings.general.tray.desc")}</div></div>
            <div class="switch" id="swTray" data-key="tray"></div>
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
            <div class="switch on" id="swFadePause" data-key="fadePause" data-default="on"></div>
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
`;const lt=new URLSearchParams(location.search).get("panel");lt&&(document.documentElement.classList.add("panel-window",`panel-${lt}`),document.body.classList.add("panel-window",`panel-${lt}`));var Ue,je;if(K&&lt){F(async()=>{const{getCurrentWindow:a}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:a}},__vite__mapDeps([8,7,1,0])).then(({getCurrentWindow:a})=>{const o=a();Ga(o,"melo-geo-panel-"+lt),o.onCloseRequested(()=>{j("melo:panel-closed",lt)}),window.addEventListener("beforeunload",()=>{j("melo:panel-closed",lt)})});const t=document.getElementById("win-"+lt),e=((Ue=t==null?void 0:t.querySelector(".float-title"))==null?void 0:Ue.innerHTML)||"",i=((je=t==null?void 0:t.querySelector(".float-body"))==null?void 0:je.innerHTML)||"";ga.innerHTML=`
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
</div>`}K&&!lt&&(document.documentElement.classList.add("tauri-main"),document.body.classList.add("tauri-main"),document.querySelectorAll(".side-actions .sbtn").forEach(t=>t.classList.remove("active")),F(async()=>{const{WebviewWindow:t}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:t}},__vite__mapDeps([6,7,1,0,8])).then(({WebviewWindow:t})=>{const e=async()=>{var i;for(const a of["library","playlist","equalizer","lyrics","settings"])try{const o=await t.getByLabel("panel-"+a);(i=document.getElementById(Le[a]))==null||i.classList.toggle("active",!!o)}catch{}};e(),setInterval(e,1200)}));K&&!lt&&(F(()=>import("./window-BWd3Cypy.js"),__vite__mapDeps([8,7,1,0])).then(async({getCurrentWindow:t})=>{const e=t(),i=()=>{const n=localStorage.getItem("melo-active-skin-id");if(n==="compact-pill"||typeof n=="string"&&n.startsWith("compact-pill"))return{width:780,height:138,minWidth:780,maxWidth:780,minHeight:138,maxHeight:138,resizable:!1,fixed:!0};if(n&&n!=="default"){const s=Ha();if(s)return{...Da(s),fixed:!1}}return{width:960,height:240,minWidth:650,minHeight:240,resizable:!0,fixed:!1}},a=async n=>{var k,v,A,I;const{LogicalSize:l}=await F(async()=>{const{LogicalSize:O}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:O}},__vite__mapDeps([7,1])),s=i();await e.setResizable(!!s.resizable);const p=await e.scaleFactor(),c=(await e.innerSize()).toLogical(p),d=(v=s.minWidth)!=null?v:s.resizable?280:(k=s.width)!=null?k:c.width,w=(I=s.minHeight)!=null?I:s.resizable?200:(A=s.height)!=null?A:c.height,x=s.maxWidth,m=s.maxHeight;await e.setMinSize(new l(d,w)),x&&m?await e.setMaxSize(new l(x,m)):x?await e.setMaxSize(new l(x,99999)):m?await e.setMaxSize(new l(99999,m)):await e.setMaxSize(new l(99999,99999));{let O=s.width?s.width:c.width,W=s.height?s.height:c.height;O=Math.max(d,x?Math.min(x,O):O),W=Math.max(w,m?Math.min(m,W):W),(Math.abs(O-c.width)>.5||Math.abs(W-c.height)>.5)&&await e.setSize(new l(O,W))}};try{const n=JSON.parse(localStorage.getItem("melo-geo-main")||"null"),{LogicalPosition:l}=await F(async()=>{const{LogicalPosition:s}=await import("./dpi-fvP-W2qr.js");return{LogicalPosition:s}},__vite__mapDeps([7,1]));await a(!0),(n==null?void 0:n.x)!=null&&(n==null?void 0:n.y)!=null&&await e.setPosition(new l(n.x,n.y))}catch{}const o=async()=>{try{const n=await e.outerPosition(),l=await e.innerSize();localStorage.setItem("melo-geo-main",JSON.stringify({x:n.x,y:n.y,w:l.width,h:l.height}))}catch{}};e.onMoved(o),e.onResized(async()=>{try{i().resizable||await a(!0)}catch{}o()}),X("melo:skin-changed",async n=>{try{!lt&&n&&await Nt(n,zt,void 0,!1),await new Promise(l=>setTimeout(l,60)),await a(!0),o()}catch{}}),e.onCloseRequested(async n=>{if(n.preventDefault(),localStorage.getItem("melo-pref-tray")==="1")try{await e.hide();return}catch{}const{WebviewWindow:s}=await F(async()=>{const{WebviewWindow:p}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:p}},__vite__mapDeps([6,7,1,0,8]));for(const p of["library","playlist","equalizer","lyrics","settings"])try{const c=await s.getByLabel("panel-"+p);c&&await c.close()}catch{}try{await e.destroy()}catch{window.close()}})}),F(()=>import("./core-DhEqZVGG.js"),[]).then(async({invoke:t})=>{try{const e=await t("get_cli_tracks");Array.isArray(e)&&e.length>0&&setTimeout(async()=>{const i=window.MeloLibrary,a=e.map(n=>n.path).filter(Boolean),o=await(i==null?void 0:i.importPaths(a,"none"))||[];o.length&&await Ot({type:"tracks",ids:o.map(n=>n.id)},{autoplay:!0})},350)}catch{}}),X("melo:open-files",t=>{if(Array.isArray(t)&&t.length>0){const e=t.map(i=>i.path).filter(Boolean);setTimeout(async()=>{const i=window.MeloLibrary,a=await(i==null?void 0:i.importPaths(e,"none"))||[];a.length&&await Ot({type:"tracks",ids:a.map(o=>o.id)},{autoplay:!0})},100)}}));document.addEventListener("contextmenu",t=>{t.preventDefault()});const re=document.getElementById("toast"),pt=t=>{re&&(re.textContent=t,re.classList.add("show"),setTimeout(()=>re.classList.remove("show"),2200))},Mt=new Audio;Mt.preload="metadata";Mt.crossOrigin="anonymous";window.__MELO_AUDIO__=Mt;window.__TOAST__=pt;localStorage.getItem("melo-dynamic-theme")===null&&localStorage.setItem("melo-dynamic-theme","1");let zt=localStorage.getItem("melo-theme")||"dark";function ue(t){document.documentElement.setAttribute("data-theme",t),localStorage.setItem("melo-theme",t),zt=t}function va(t){ue(t),j("melo:theme",t)}ue(zt);X("melo:theme",t=>{(t==="light"||t==="dark")&&ue(t)});setInterval(()=>{const t=localStorage.getItem("melo-theme");(t==="light"||t==="dark")&&t!==zt&&ue(t)},1e3);document.body.classList.toggle("show-stop-btn",localStorage.getItem("melo-pref-showStopBtn")==="1");X("melo:pref-changed",t=>{t&&t.key==="showStopBtn"&&document.body.classList.toggle("show-stop-btn",!!t.value)});const Ua=["win-library","win-playlist","win-equalizer","win-lyrics","win-settings"],pe=document.getElementById("desktop"),ya={btnToggleLibrary:"win-library",btnTogglePlaylist:"win-playlist",btnToggleEq:"win-equalizer",btnToggleLyrics:"win-lyrics",btnOpenSettings:"win-settings",menuToggleLibrary:"win-library",menuTogglePlaylist:"win-playlist",menuToggleEq:"win-equalizer",menuToggleLyrics:"win-lyrics",menuToggleSettings:"win-settings"};function ja(t){const e=document.getElementById(t);return!!e&&!e.classList.contains("hidden")}const Le={library:"btnToggleLibrary",playlist:"btnTogglePlaylist",equalizer:"btnToggleEq",lyrics:"btnToggleLyrics",settings:"btnOpenSettings"};async function Ga(t,e){const i=async()=>{try{const a=await t.outerPosition(),o=await t.outerSize();localStorage.setItem(e,JSON.stringify({x:a.x,y:a.y,w:o.width,h:o.height}))}catch{}};t.onMoved(i),t.onResized(i)}async function Qa(t){const{WebviewWindow:e}=await F(async()=>{const{WebviewWindow:d}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:d}},__vite__mapDeps([6,7,1,0,8])),i="panel-"+t,a=document.getElementById(Le[t]),o=await e.getByLabel(i);if(o){await o.close(),a==null||a.classList.remove("active");return}const n={library:[430,620],playlist:[440,560],equalizer:[700,440],lyrics:[380,520],settings:[600,540]},l={library:[360,400],playlist:[360,360],equalizer:[620,400],lyrics:[320,360],settings:[500,400]},s={library:"Library",playlist:"Playing Queue",equalizer:"Equalizer",lyrics:"Lyric",settings:"Settings"},p=n[t]||[420,520];let c=null;try{c=JSON.parse(localStorage.getItem("melo-geo-panel-"+t)||"null")}catch{}new e(i,{url:`/?panel=${t}`,title:s[t]||t,width:(c==null?void 0:c.w)||p[0],height:(c==null?void 0:c.h)||p[1],minWidth:(l[t]||[360,360])[0],minHeight:(l[t]||[360,360])[1],...(c==null?void 0:c.x)!=null?{x:c.x,y:c.y}:{center:!0},decorations:!1,transparent:!0,shadow:!1,skipTaskbar:!0}),a==null||a.classList.add("active")}X("melo:panel-closed",t=>{var i;const e=Le[t];e&&((i=document.getElementById(e))==null||i.classList.remove("active"))});function Te(t){if(K){Qa(t.replace(/^win-/,""));return}const e=ja(t);ee(t,!e),e||me(document.getElementById(t))}function Ya(t){if(t.classList.contains("hidden")||!pe||window.matchMedia("(max-width: 860px)").matches)return;const e=pe.getBoundingClientRect();if(e.width<=0||e.height<=0)return;const i=t.getBoundingClientRect(),a=Math.min(i.width,e.width),o=Math.min(i.height,e.height);let n=i.left-e.left,l=i.top-e.top;n=Math.max(0,Math.min(e.width-a,n)),l=Math.max(0,Math.min(e.height-o,l)),t.style.left=n+"px",t.style.top=l+"px",t.style.right="auto",t.style.bottom="auto",t.style.transform="none"}function ee(t,e){var o,n,l,s,p,c,d,w,x,m;const i=document.getElementById(t);if(!i)return;i.classList.toggle("hidden",!e),localStorage.setItem("melov2-"+t,e?"1":"0"),e&&Ya(i);const a=e;t==="win-library"&&((o=document.getElementById("btnToggleLibrary"))==null||o.classList.toggle("active",a),(n=document.getElementById("menuToggleLibrary"))==null||n.classList.toggle("active",a)),t==="win-playlist"&&((l=document.getElementById("btnTogglePlaylist"))==null||l.classList.toggle("active",a),(s=document.getElementById("menuTogglePlaylist"))==null||s.classList.toggle("active",a)),t==="win-equalizer"&&((p=document.getElementById("btnToggleEq"))==null||p.classList.toggle("active",a),(c=document.getElementById("menuToggleEq"))==null||c.classList.toggle("active",a)),t==="win-lyrics"&&((d=document.getElementById("btnToggleLyrics"))==null||d.classList.toggle("active",a),(w=document.getElementById("menuToggleLyrics"))==null||w.classList.toggle("active",a)),t==="win-settings"&&((x=document.getElementById("btnOpenSettings"))==null||x.classList.toggle("active",a),(m=document.getElementById("menuToggleSettings"))==null||m.classList.toggle("active",a))}lt||Ua.forEach(t=>{const e=localStorage.getItem("melov2-"+t);e!==null?ee(t,e==="1"):t==="win-settings"?ee(t,!1):ee(t,!0)});Object.entries(ya).forEach(([t,e])=>{var i;(i=document.getElementById(t))==null||i.addEventListener("click",()=>Te(e))});document.querySelectorAll("[data-close]").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.close;ee(e,!1)})});let gt=null,Et=null,Fe=10;function me(t){Fe++,t.style.zIndex=String(Fe),document.querySelectorAll(".float-win").forEach(e=>e.classList.remove("active")),t.classList.add("active")}document.querySelectorAll(".float-win").forEach(t=>{t.addEventListener("mousedown",()=>me(t))});document.querySelectorAll("[data-drag]").forEach(t=>{t.addEventListener("mousedown",e=>{if(e.target.closest("button")||e.target.closest("input")||e.target.closest("select"))return;const i=t.dataset.drag,a=document.getElementById(i);me(a),a.classList.add("dragging");const o=a.getBoundingClientRect();gt={id:i,startX:e.clientX,startY:e.clientY,initX:o.left,initY:o.top,width:o.width,height:o.height}})});document.querySelectorAll("[data-resize]").forEach(t=>{t.addEventListener("mousedown",e=>{e.stopPropagation();const i=t.dataset.resize,a=document.getElementById(i);me(a),a.classList.add("resizing");const o=a.getBoundingClientRect();Et={id:i,startX:e.clientX,startY:e.clientY,initW:o.width,initH:o.height}})});window.addEventListener("mousemove",t=>{if(gt){const e=document.getElementById(gt.id);let i=t.clientX-gt.startX,a=t.clientY-gt.startY,o=gt.initX+i,n=gt.initY+a;if(pe&&!window.matchMedia("(max-width: 860px)").matches){const l=pe.getBoundingClientRect(),s=l.left,p=l.right-gt.width,c=l.top,d=l.bottom-gt.height;o=Math.max(s,Math.min(p,o))-l.left,n=Math.max(c,Math.min(d,n))-l.top}e.style.left=o+"px",e.style.top=n+"px",e.style.right="auto",e.style.bottom="auto",e.style.transform="none"}if(Et){const e=document.getElementById(Et.id);let i=Et.initW+(t.clientX-Et.startX),a=Et.initH+(t.clientY-Et.startY);i=Math.max(260,i),a=Math.max(160,a),e.style.width=i+"px",e.style.height=a+"px"}});window.addEventListener("mouseup",()=>{if(gt){const t=document.getElementById(gt.id);t&&(t.classList.remove("dragging"),localStorage.setItem("melov2-pos-"+gt.id,JSON.stringify({left:t.style.left,top:t.style.top}))),gt=null}if(Et){const t=document.getElementById(Et.id);t&&(t.classList.remove("resizing"),localStorage.setItem("melov2-size-"+Et.id,JSON.stringify({width:t.style.width,height:t.style.height}))),Et=null}});async function ba(){const t=window.MeloLibrary;if(K){try{const{open:i}=await F(async()=>{const{open:l}=await import("./index-CS3Qnt9j.js");return{open:l}},__vite__mapDeps([5,1])),a=await i({multiple:!0,filters:[{name:"Audio",extensions:["mp3","flac","wav","aac","ogg","m4a","alac","opus","wma","aiff"]}]});if(!a)return;const o=Array.isArray(a)?a:[a],n=await(t==null?void 0:t.importPaths(o,"none"))||[];n.length&&(await Ot({type:"tracks",ids:n.map(l=>l.id)},{autoplay:!0}),pt(`${n.length} file(s) added`))}catch{pt("Error opening files")}return}const e=document.createElement("input");e.type="file",e.multiple=!0,e.accept="audio/*,.mp3,.flac,.wav,.aac,.ogg,.m4a,.alac,.opus,.wma,.aiff",e.onchange=async()=>{const i=Array.from(e.files||[]);if(i.length){for(const a of i){const o=a.path,n=o||URL.createObjectURL(a),l=a.name,s=l.lastIndexOf("."),p=s>0?l.slice(0,s):l,c=s>0?l.slice(s+1).toUpperCase():"AUDIO",d={id:o||"imp_"+Math.random().toString(36).slice(2,9),title:p,artist:"Unknown Artist",album:"Single",duration:0,path:n,codec:c,specs:"Local File",source:"import"};await oa(a,d)}pt("Direct browser file playback is not used in desktop builds.")}},e.click()}async function wa(){const t=window.MeloLibrary;if(K){try{const{open:i}=await F(async()=>{const{open:n}=await import("./index-CS3Qnt9j.js");return{open:n}},__vite__mapDeps([5,1])),a=await i({directory:!0});if(!a)return;const o=a;await(t==null?void 0:t.scanFolder(o,!0)),await Ot({type:"folder",path:o},{autoplay:!0})}catch{pt("Error scanning folder")}return}const e=document.createElement("input");e.type="file",e.webkitdirectory=!0,e.multiple=!0,e.accept="audio/*",e.onchange=async()=>{const i=Array.from(e.files||[]).filter(a=>/\.(mp3|flac|wav|aac|ogg|m4a|alac|opus|wma|aiff)$/i.test(a.name));if(i.length){for(const a of i){const o=a.path,n=o||URL.createObjectURL(a),l=a.name,s=l.lastIndexOf("."),p=s>0?l.slice(0,s):l,c=s>0?l.slice(s+1).toUpperCase():"AUDIO",d={id:o||"imp_"+Math.random().toString(36).slice(2,9),title:p,artist:"Unknown Artist",album:"Folder Import",duration:0,path:n,codec:c,specs:"Local File",source:"import"};await oa(a,d)}pt("Direct browser folder playback is not used in desktop builds.")}},e.click()}document.addEventListener("click",t=>{var i;const e=(i=t.target)==null?void 0:i.closest("#btnAddFiles, #btnAddFolder, #btnThemeToggle");e&&(e.id==="btnAddFiles"?ba():e.id==="btnAddFolder"?wa():e.id==="btnThemeToggle"&&va(zt==="light"?"dark":"light"))});window.addEventListener("keydown",t=>{(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="o"&&(t.shiftKey?(t.preventDefault(),wa()):(t.preventDefault(),ba())),((t.ctrlKey||t.metaKey)&&t.key===","||t.key==="F2")&&(t.preventDefault(),Te("win-settings"))});function We(t){var x,m;function e(k){document.querySelectorAll(".settings-tab").forEach(v=>{v.classList.toggle("active",v.dataset.stab===k)}),document.querySelectorAll(".settings-section[data-panel]").forEach(v=>{v.classList.toggle("active",v.dataset.panel===k)}),localStorage.setItem("melo-settings-tab",k)}document.querySelectorAll(".settings-tab").forEach(k=>{k.addEventListener("click",()=>e(k.dataset.stab))}),e(localStorage.getItem("melo-settings-tab")||"general"),document.querySelectorAll(".switch[data-key]").forEach(k=>{const v=k.dataset.key,A=localStorage.getItem("melo-pref-"+v);A!==null&&k.classList.toggle("on",A==="1"),k.onclick=()=>{k.classList.toggle("on");const I=k.classList.contains("on");localStorage.setItem("melo-pref-"+v,I?"1":"0"),j("melo:pref-changed",{key:v,value:I})}});const i=document.getElementById("setLanguage");i&&(i.value=Wa(),i.onchange=async()=>{await fa(i.value),t(`Language set to ${i.options[i.selectedIndex].text} — restart Melo to fully apply`)});const a=document.getElementById("swDynamicTheme");if(a){const k=localStorage.getItem("melo-dynamic-theme")!=="0";a.classList.toggle("on",k),a.onclick=()=>{var I;const v=!a.classList.contains("on");a.classList.toggle("on",v),localStorage.setItem("melo-dynamic-theme",v?"1":"0");const A=((I=window.MeloPlayer)==null?void 0:I.currentTrack)||null;A&&ra(v?A.cover:null)}}const o=document.getElementById("skinSelect"),n=document.getElementById("btnSkinThemeToggle"),l=document.getElementById("btnRefreshSkins"),s=document.getElementById("btnOpenSkinsFolder"),p=document.getElementById("skinThemeIcon"),c=document.getElementById("skinThemeLabel");function d(k){p&&(p.textContent=k==="dark"?"🌙":"☀️"),c&&(c.textContent=k==="dark"?"Dark":"Light")}d(zt),n==null||n.addEventListener("click",()=>{const k=zt==="dark"?"light":"dark";va(k),d(k),t(k==="dark"?"Dark theme":"Light theme")}),X("melo:theme",k=>{(k==="light"||k==="dark")&&d(k)});async function w(){if(!o)return;const k=localStorage.getItem("melo-active-skin-id")||"default",v=await sa();o.innerHTML=`
      <option value="default">Default Melo (Standard)</option>
      <option value="compact-pill">Minimal Compact (Pill Bar)</option>
    `,v.forEach(A=>{if(A.filename!=="compact-pill-light.html"&&A.filename!=="compact-pill-dark.html"){const I=document.createElement("option");I.value=A.filename,I.textContent=`${A.name} (${A.filename})`,o.appendChild(I)}}),o.value=k}w(),o&&(o.onchange=()=>{const k=o.value;Nt(k,zt,t)}),l==null||l.addEventListener("click",async()=>{await w();const k=localStorage.getItem("melo-active-skin-id")||"default";Nt(k,zt,t),t("Skins reloaded from disk")}),X("melo:skins-changed",async()=>{const k=localStorage.getItem("melo-active-skin-id")||"default";await w(),o&&(o.value=k)}),s==null||s.addEventListener("click",()=>{da(t)}),(x=document.getElementById("btn-reset-skin-settings"))==null||x.addEventListener("click",()=>{Me(t),o&&(o.value="default")}),(m=document.getElementById("btn-settings-reset"))==null||m.addEventListener("click",()=>{localStorage.clear(),t("Settings reset — reloading..."),setTimeout(()=>location.reload(),600)})}function xa(){document.querySelectorAll(".win-btn").forEach(t=>{t.onclick=async()=>{const e=t.getAttribute("aria-label");if(window.__TAURI__){const{getCurrentWindow:i}=await F(async()=>{const{getCurrentWindow:o}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:o}},__vite__mapDeps([8,7,1,0])),a=i();e==="minimize"?a.minimize():e==="close"&&a.close()}else e==="close"&&pt("Window close requires the Tauri desktop build")}})}xa();window.__MELO_REBIND_MAIN__=()=>{xa(),Object.entries(ya).forEach(([t,e])=>{const i=document.getElementById(t);i&&(i.onclick=()=>Te(e))})};const Vt=document.createElement("div");Vt.id="aboutPop";Vt.style.display="none";document.body.appendChild(Vt);document.addEventListener("click",t=>{var e,i;(e=t.target)!=null&&e.closest("#btnAbout")&&(t.stopPropagation(),Vt.innerHTML=`
    <div class="about-head">Melo <b>0.5.0 Beta</b></div>
    <div style="font-size:11.5px; color:var(--text-soft); margin:6px 0 10px;">
      Modern Windows Music Player<br/>
      Tauri 2 + TypeScript + Rust
    </div>
    <a class="about-link" id="aboutLink" href="https://github.com/Arvanta/Melo" rel="noopener">github.com/Arvanta/Melo ↗</a>`,Vt.style.display=Vt.style.display==="none"?"block":"none",(i=document.getElementById("aboutLink"))==null||i.addEventListener("click",a=>{a.preventDefault();const o="https://github.com/Arvanta/Melo";K?F(()=>import("./core-DhEqZVGG.js"),[]).then(n=>n.invoke("open_url",{url:o})).catch(()=>window.open(o,"_blank")):window.open(o,"_blank")}))});document.addEventListener("click",t=>{!t.target.closest("#aboutPop")&&!t.target.closest("#btnAbout")&&(Vt.style.display="none")});function ka(t=document){t.querySelectorAll("input.search-input").forEach(e=>{var o;if(e.dataset.clearWired==="1")return;e.hasAttribute("placeholder")||e.setAttribute("placeholder"," ");let i=e.closest(".search-field");i||(i=document.createElement("span"),i.className="search-field",(o=e.parentNode)==null||o.insertBefore(i,e),i.appendChild(e));const a=document.createElement("button");a.type="button",a.className="search-clear",a.setAttribute("aria-label","Clear search"),a.textContent="×",a.tabIndex=-1,a.onclick=()=>{e.value="",e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),e.focus()},i.appendChild(a),e.dataset.clearWired="1"})}ka();new MutationObserver(()=>ka()).observe(document.body,{childList:!0,subtree:!0});K&&lt?lt==="library"||lt==="playlist"?Re(Mt,pt):lt==="equalizer"?Oe(Mt,pt,{remote:!0}):lt==="lyrics"?He(Mt):lt==="settings"&&(Ve(),We(pt)):(Ra(Mt,pt),Re(Mt,pt),Oe(Mt,pt),Oa(Mt),He(Mt),Na(pt),We(pt),Ve());
//# sourceMappingURL=index-CcDr2tFc.js.map
