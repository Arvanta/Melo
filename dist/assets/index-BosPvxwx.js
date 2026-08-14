const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/event-CNdo2oXa.js","assets/core-DhEqZVGG.js","assets/index-DiyoAAdc.js","assets/index-CHth0gh2.js","assets/index-Bq0iOnRE.js","assets/index-CS3Qnt9j.js","assets/webviewWindow-mjQkSB26.js","assets/dpi-fvP-W2qr.js","assets/window-BWd3Cypy.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function i(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerPolicy&&(l.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?l.credentials="include":n.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function a(n){if(n.ep)return;n.ep=!0;const l=i(n);fetch(n.href,l)}})();const Je="modulepreload",Xe=function(t){return"/"+t},ye={},Q=function(e,i,a){let n=Promise.resolve();if(i&&i.length>0){let c=function(s){return Promise.all(s.map(m=>Promise.resolve(m).then(w=>({status:"fulfilled",value:w}),w=>({status:"rejected",reason:w}))))};document.getElementsByTagName("link");const h=document.querySelector("meta[property=csp-nonce]"),d=(h==null?void 0:h.nonce)||(h==null?void 0:h.getAttribute("nonce"));n=c(i.map(s=>{if(s=Xe(s),s in ye)return;ye[s]=!0;const m=s.endsWith(".css"),w=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${w}`))return;const S=document.createElement("link");if(S.rel=m?"stylesheet":Je,m||(S.as="script"),S.crossOrigin="",S.href=s,d&&S.setAttribute("nonce",d),document.head.appendChild(S),m)return new Promise((C,I)=>{S.addEventListener("load",C),S.addEventListener("error",()=>I(new Error(`Unable to preload CSS for ${s}`)))})}))}function l(c){const h=new Event("vite:preloadError",{cancelable:!0});if(h.payload=c,window.dispatchEvent(h),!h.defaultPrevented)throw c}return n.then(c=>{for(const h of c||[])h.status==="rejected"&&l(h.reason);return e().catch(l)})},ut=typeof window.__TAURI_INTERNALS__<"u"||typeof window.__TAURI__<"u";async function J(t,e){if(ut)try{const{emit:i}=await Q(async()=>{const{emit:a}=await import("./event-CNdo2oXa.js");return{emit:a}},__vite__mapDeps([0,1]));await i(t,e);return}catch{}window.dispatchEvent(new CustomEvent(t,{detail:e}))}function ot(t,e){ut&&Q(async()=>{const{listen:i}=await import("./event-CNdo2oXa.js");return{listen:i}},__vite__mapDeps([0,1])).then(({listen:i})=>{i(t,a=>{e(a.payload)})}).catch(()=>{}),window.addEventListener(t,i=>e(i.detail))}let be=!1;async function Ze(){if(!be){be=!0;try{const t=globalThis;if(typeof t.Buffer>"u"){const e=await Q(()=>import("./index-DiyoAAdc.js").then(i=>i.i),__vite__mapDeps([2,3]));t.Buffer=e.Buffer}typeof t.process>"u"&&(t.process={env:{},browser:!0,nextTick:e=>setTimeout(e,0)})}catch{}}}async function Qe(t,e){var i;try{await Ze();const a=await Q(()=>import("./index-Bq0iOnRE.js").then(s=>s.i),__vite__mapDeps([4,3])),n=a&&typeof a.parseBlob=="function"?a:a.default||a,l=await Promise.race([n.parseBlob(t),new Promise((s,m)=>setTimeout(()=>m(new Error("timeout")),1800))]),c=l==null?void 0:l.common;if(!c)return;c.title&&(e.title=c.title),c.artist?e.artist=c.artist:c.artists&&c.artists[0]&&(e.artist=c.artists[0]),c.album&&(e.album=c.album),c.genre&&c.genre[0]&&(e.genre=c.genre[0]),c.year&&(e.year=c.year);const h=(i=c.picture)==null?void 0:i[0];if(h&&h.data){const s=h.format||"image/jpeg",m=h.data;if(m.length>6e5)return;let w="";const S=8192;for(let C=0;C<m.length;C+=S){const I=m.subarray(C,C+S);w+=String.fromCharCode.apply(null,I)}e.cover=`data:${s};base64,${btoa(w)}`}const d=l==null?void 0:l.format;d&&d.duration&&!e.duration&&(e.duration=Math.floor(d.duration))}catch{}}async function Xt(t,e,i=1800){return await Qe(t,e),e}async function Ke(t){return new Promise(e=>{if(!t)return e(null);const i=new Image;i.crossOrigin="anonymous",i.onload=()=>{try{const a=document.createElement("canvas"),n=a.getContext("2d");if(!n)return e(null);a.width=40,a.height=40,n.drawImage(i,0,0,40,40);const l=n.getImageData(0,0,40,40).data;let c={r:42,g:123,b:214},h=-1;for(let d=0;d<l.length;d+=4){const s=l[d],m=l[d+1],w=l[d+2];if(l[d+3]<128)continue;const C=Math.max(s,m,w),I=Math.min(s,m,w),y=(C+I)/510,F=C-I,O=F===0?0:F/(1-Math.abs(2*y-1));if(O>.25&&y>.25&&y<.82){const tt=O*1.5+(1-Math.abs(y-.5));tt>h&&(h=tt,c={r:s,g:m,b:w})}}h>0?e(c):e(null)}catch{e(null)}},i.onerror=()=>e(null),i.src=t})}async function Be(t){const e=localStorage.getItem("melo-dynamic-theme")!=="0",i=document.documentElement;if(!e||!t){i.style.removeProperty("--accent"),i.style.removeProperty("--visualizer"),i.style.removeProperty("--accent-glow");return}const a=await Ke(t);if(a){const n=`rgb(${a.r}, ${a.g}, ${a.b})`;i.style.setProperty("--accent",n),i.style.setProperty("--visualizer",n),i.style.setProperty("--accent-glow",`rgba(${a.r}, ${a.g}, ${a.b}, 0.35)`)}else i.style.removeProperty("--accent"),i.style.removeProperty("--visualizer"),i.style.removeProperty("--accent-glow")}const Yt=[31,62,125,250,500,1e3,2e3,4e3,8e3,16e3];let At=null,re=null,se=[],jt=null,Ft=null;function ee(t){if(!At){const e=window.AudioContext||window.webkitAudioContext;At=new e;try{re=At.createMediaElementSource(t)}catch{}if(se=Yt.map(i=>{const a=At.createBiquadFilter();return a.type="peaking",a.frequency.value=i,a.Q.value=1.4,a.gain.value=0,a}),jt=At.createGain(),jt.gain.value=1,Ft=At.createAnalyser(),Ft.fftSize=2048,Ft.smoothingTimeConstant=.72,re){let i=re;for(const a of se)i.connect(a),i=a;i.connect(jt),jt.connect(Ft),Ft.connect(At.destination)}}return{ctx:At,filters:se,gain:jt,analyser:Ft,async resume(){At&&At.state==="suspended"&&await At.resume().catch(()=>{})}}}function ta(t,e){let i,a,n,l,c,h,d,s=null,m,w,S,C,I,y,F,O,tt,rt,st,j,g=[],T=0,z=!1,K="off",ct=!1;function bt(){if(!g.length)return null;if(K==="one")return T;let r=T+1;if(z&&(r=Math.floor(Math.random()*g.length),r===T&&g.length>1&&(r=(r+1)%g.length)),r>=g.length)if(K==="all")r=0;else return null;return r}window.__LUMI_QUEUE__=g,window.__LUMI_SET_QUEUE__=r=>{g=r,window.__LUMI_QUEUE__=r};function ht(r){if(!isFinite(r))return"0:00";const _=Math.floor(r/60),B=Math.floor(r%60).toString().padStart(2,"0");return`${_}:${B}`}function at(){if(!m)return;const r=parseFloat(m.max)||100,_=parseFloat(m.value)||0,B=r>0?_/r*100:0;m.style.setProperty("--progress",B+"%")}function lt(){w&&w.style.setProperty("--vol",w.value+"%")}async function ft(r){if(!r)return"";if(/^(https?|data|blob):/.test(r))return r;if(ut)try{const{convertFileSrc:_}=await Q(async()=>{const{convertFileSrc:B}=await import("./core-DhEqZVGG.js");return{convertFileSrc:B}},[]);return _(r)}catch{}return r}async function St(r,_=!0,B){if(!g.length)return;r<0&&(r=g.length-1),r>=g.length&&(r=0),T=r;const x=g[r];if(x){if(y||G(),t.src=await ft(x.path),t.load(),B&&B>0){const V=()=>{t.removeEventListener("loadedmetadata",V);try{t.currentTime=B}catch{}};t.addEventListener("loadedmetadata",V)}y&&(y.textContent=x.title||"Unknown Title"),F&&(F.textContent=x.artist||"Unknown Artist"),O&&(O.textContent=x.album||""),tt&&(tt.textContent=x.codec||"AUDIO"),rt&&(rt.textContent=x.specs||""),x.cover&&st?(st.src=x.cover,st.style.display="block",j&&(j.style.display="none")):(st&&(st.style.display="none"),j&&(j.style.display="grid")),m&&(m.max=String(x.duration||240),m.value="0",at()),C&&(C.textContent=ht(x.duration)),S&&(S.textContent="0:00"),E(),Be(x.cover||null),document.querySelectorAll(".track-row").forEach((V,X)=>{var N;V.classList.toggle("active",((N=g[X])==null?void 0:N.id)===x.id)}),"mediaSession"in navigator&&(navigator.mediaSession.metadata=new MediaMetadata({title:x.title,artist:x.artist,album:x.album,artwork:x.cover?[{src:x.cover,sizes:"512x512",type:"image/jpeg"}]:[]}),navigator.mediaSession.setActionHandler("play",()=>Mt()),navigator.mediaSession.setActionHandler("pause",()=>Pt()),navigator.mediaSession.setActionHandler("previoustrack",()=>k()),navigator.mediaSession.setActionHandler("nexttrack",()=>v()),navigator.mediaSession.setActionHandler("seekto",V=>{V.seekTime&&(t.currentTime=V.seekTime)})),_&&Mt();try{const{cover:V,...X}=x;localStorage.setItem("melo-current-track",JSON.stringify(X))}catch{}window.dispatchEvent(new CustomEvent("lumi:trackChange",{detail:x})),J("melo:track-changed",x),J("melo:playback-state",{track:x,currentTime:t.currentTime||0,paused:t.paused})}}let vt=!1;async function It(){try{await ee(t).resume()}catch{}vt&&(vt=!1,t.play().then(()=>{a&&(a.style.display="none"),n&&(n.style.display="block")}).catch(()=>{}))}window.addEventListener("pointerdown",It),window.addEventListener("keydown",It),ot("melo:pref-changed",r=>{r&&r.key==="replayGainGlobal"&&E(),r&&r.key==="showStopBtn"&&D(!!r.value)}),ot("melo:request-playback-state",()=>{const r=g[T]||null;J("melo:playback-state",{track:r,currentTime:t.currentTime||0,paused:t.paused})}),ot("melo:seek-playback",r=>{const _=Number(r);Number.isFinite(_)&&_>=0&&(t.currentTime=_)});let Lt=null,Tt=!1;function Dt(r,_,B){Lt&&cancelAnimationFrame(Lt);const x=t.volume,V=performance.now(),X=N=>{const kt=Math.min(1,(N-V)/_);t.volume=x+(r-x)*kt,kt<1?Lt=requestAnimationFrame(X):(Lt=null,B==null||B())};Lt=requestAnimationFrame(X)}async function Mt(){try{await ee(t).resume()}catch{}const r=localStorage.getItem("melo-pref-fadePause")==="1",_=A();r&&Tt&&(t.volume=0),t.play().then(()=>{vt=!1,a&&(a.style.display="none"),n&&(n.style.display="block"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="playing"),r&&Tt?(Tt=!1,Dt(_,300)):t.volume=_}).catch(()=>{vt||(vt=!0,e("Click once inside player to begin audio playback"))})}function Pt(){localStorage.getItem("melo-pref-fadePause")==="1"&&!t.paused?(Tt=!0,Dt(0,300,()=>t.pause())):(Tt=!1,t.pause()),a&&(a.style.display="block"),n&&(n.style.display="none"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused");const _=g[T];if(_)try{localStorage.setItem("melo-resume-state",JSON.stringify({trackId:_.id,position:t.currentTime}))}catch{}}function $t(){t.paused?Mt():Pt()}function it(){t.pause();try{t.currentTime=0}catch{}a&&(a.style.display="block"),n&&(n.style.display="none"),m&&(m.value="0",at()),S&&(S.textContent="0:00"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}function v(){if(!g.length)return;if(K==="one"){t.currentTime=0,Mt();return}const r=bt();if(r===null){Pt();return}St(r)}function k(){if(!g.length)return;if(t.currentTime>3){t.currentTime=0;return}let r=T-1;z&&(r=Math.floor(Math.random()*g.length)),r<0&&(K==="all"?r=g.length-1:r=0),St(r)}function A(){var X;const r=g[T];if(!w)return 1;const _=parseInt(w.value,10)/100,x=localStorage.getItem("melo-pref-replayGainGlobal")!=="0"&&(X=r==null?void 0:r.replayGain)!=null?X:0,V=Math.pow(10,x/20);return Math.min(1,Math.max(0,_*V))}function E(){!g[T]||!w||(t.volume=A())}function D(r=localStorage.getItem("melo-pref-showStopBtn")==="1"){const _=document.getElementById("btnStop");_&&_.style.setProperty("display",r?"inline-flex":"none","important")}function G(){if(i=document.getElementById("btnPlay"),a=document.getElementById("iconPlay"),n=document.getElementById("iconPause"),l=document.getElementById("btnPrev"),c=document.getElementById("btnNext"),h=document.getElementById("btnShuffle"),d=document.getElementById("btnRepeat"),s=document.getElementById("btnStop"),D(),m=document.getElementById("seekBar"),w=document.getElementById("volBar"),S=document.getElementById("curTime"),C=document.getElementById("durTime"),I=document.getElementById("volPct"),y=document.getElementById("trackTitle"),F=document.getElementById("trackArtist"),O=document.getElementById("trackAlbum"),tt=document.getElementById("trackCodec"),rt=document.getElementById("trackSpecs"),st=document.getElementById("coverImg"),j=document.getElementById("coverFallback"),i&&(i.onclick=$t),s&&(s.onclick=it),l&&(l.onclick=k),c&&(c.onclick=v),h&&(h.onclick=()=>{z=!z,h.classList.toggle("active",z),e(z?"Shuffle on":"Shuffle off")}),d&&(d.onclick=()=>{K=K==="off"?"all":K==="all"?"one":"off",d.classList.toggle("active",K!=="off");const r={off:"Repeat off",all:"Repeat all",one:"Repeat one"};e(r[K]),d.title=r[K]}),m&&(m.oninput=()=>{ct=!0,S&&(S.textContent=ht(parseFloat(m.value))),at()},m.onchange=()=>{t.currentTime=parseFloat(m.value),ct=!1}),w&&(w.oninput=()=>{lt(),I&&(I.textContent=w.value+"%"),E()}),at(),lt(),g[T]){const r=g[T];y&&(y.textContent=r.title||"Unknown Title"),F&&(F.textContent=r.artist||"Unknown Artist"),O&&(O.textContent=r.album||""),tt&&(tt.textContent=r.codec||"AUDIO"),rt&&(rt.textContent=r.specs||""),r.cover&&st&&(st.src=r.cover,st.style.display="block",j&&(j.style.display="none"))}}G(),t.addEventListener("timeupdate",()=>{J("melo:playback-position",t.currentTime||0),!ct&&m&&S&&(m.value=String(Math.floor(t.currentTime)),S.textContent=ht(t.currentTime),at()),$()});let q=null;function $(){q||(q=setTimeout(()=>{q=null;const r=g[T];if(!(!r||t.paused))try{localStorage.setItem("melo-resume-state",JSON.stringify({trackId:r.id,position:t.currentTime}))}catch{}},4e3))}t.addEventListener("loadedmetadata",()=>{var _;if(!m||!C)return;const r=Math.floor(t.duration||((_=g[T])==null?void 0:_.duration)||240);m.max=String(r),C.textContent=ht(r),at()}),t.addEventListener("ended",()=>{v()}),window.addEventListener("keydown",r=>{r.target.tagName!=="INPUT"&&(r.code==="Space"&&(r.preventDefault(),$t()),r.code==="ArrowRight"&&(t.currentTime+=5),r.code==="ArrowLeft"&&(t.currentTime-=5),(r.key==="m"||r.key==="M")&&(t.muted=!t.muted,e(t.muted?"Muted":"Unmuted")),(r.key==="s"||r.key==="S")&&h&&h.click(),(r.key==="r"||r.key==="R")&&d&&d.click(),r.code==="ArrowUp"&&w&&(w.value=String(Math.min(100,parseInt(w.value,10)+5)),w.dispatchEvent(new Event("input"))),r.code==="ArrowDown"&&w&&(w.value=String(Math.max(0,parseInt(w.value,10)-5)),w.dispatchEvent(new Event("input"))))}),ot("melo:tray-action",r=>{r==="play_pause"?$t():r==="next"?v():r==="prev"?k():r==="mute"&&(t.muted=!t.muted,e(t.muted?"Muted":"Unmuted"))}),window.LumiPlayer={get queue(){return g},set queue(r){g=r,window.__LUMI_QUEUE__=r},get currentIndex(){return T},loadTrack:St,play:Mt,pause:Pt,stop:it,next:v,prev:k,get audio(){return t},rebind:G},window.__LUMI_REBIND__=G,ot("melo:play-tracks",r=>{if(!r||!Array.isArray(r.tracks)||!r.tracks.length)return;g=r.tracks,window.__LUMI_SET_QUEUE__(g);const _=Math.max(0,Math.min(r.index||0,g.length-1));St(_,!0)})}const zt=ut,Ot=new URLSearchParams(location.search).get("panel")||"main";let et=[],xt=[];try{const t=localStorage.getItem("melo-playlists");if(t){const e=JSON.parse(t);Array.isArray(e)&&e.length&&(xt=e)}}catch{}xt.length||(xt=[{id:"p1",name:"Favorites",tracks:[],createdAt:Date.now()}]);try{const t=localStorage.getItem("melo-tracks");if(t){const e=JSON.parse(t);Array.isArray(e)&&(et=e)}}catch{}function we(t,e){var ge,he,fe,ve;const i=document.getElementById("trackList");document.getElementById("playlistList");const a=document.getElementById("winPlaylistTracks"),n=document.getElementById("winPlaylistEmpty"),l=document.getElementById("playlistSelect"),c=document.getElementById("searchInput"),h=document.getElementById("libraryStats"),d=document.getElementById("btn-scan"),s=document.getElementById("btn-export-playlist"),m=document.getElementById("btn-clear-playlist"),w=document.getElementById("btn-new-playlist"),S=document.getElementById("queueList"),C=document.getElementById("tagEditor"),I=document.getElementById("tagTitle"),y=document.getElementById("tagArtist"),F=document.getElementById("tagAlbum"),O=document.getElementById("tagYear"),tt=document.getElementById("tagCover");let rt="",st=localStorage.getItem("melo-currentPlaylist")||((ge=xt[0])==null?void 0:ge.id)||"",j="",g="artists",T=null,z=null,K=null,ct=null,bt=[];(he=document.getElementById("libraryTabs"))==null||he.querySelectorAll(".tab").forEach(o=>{o.addEventListener("click",()=>{document.querySelectorAll("#libraryTabs .tab").forEach(u=>u.classList.remove("active")),o.classList.add("active"),g=o.dataset.libtab,T=z=K=ct=null,N()})}),c==null||c.addEventListener("input",()=>{rt=c.value.toLowerCase(),N()}),N(),yt();async function ht(o){const{invoke:u}=await Q(async()=>{const{invoke:P}=await import("./core-DhEqZVGG.js");return{invoke:P}},[]),{listen:f}=await Q(async()=>{const{listen:P}=await import("./event-CNdo2oXa.js");return{listen:P}},__vite__mapDeps([0,1]));let p=0,b=0,U=0;e("Scanning folder…");const H=await f("melo:scan-batch",P=>{const M=Array.isArray(P.payload)?P.payload:[];M.length&&(M.forEach(Y=>Y.source="scan"),U+=M.length,Lt(M,!1,!0),Tt(M,!0),Kt())}),L=await f("melo:scan-progress",P=>{const M=P.payload||{};b=M.done||0,p=M.total||0,!M.finished&&p&&e(`Scanning… ${b}/${p} files`)});try{const P=await u("scan_library",{path:o});return H(),L(),Kt(),zt&&J("melo:tracks-add",{src:Ot,list:P.map(M=>({...M,source:"scan"}))}),e(`${U||P.length} track(s) added from folder`),U||P.length}catch(P){throw H(),L(),Kt(),P}}d==null||d.addEventListener("click",async()=>{if(window.__TAURI__)try{const{open:o}=await Q(async()=>{const{open:f}=await import("./index-CS3Qnt9j.js");return{open:f}},__vite__mapDeps([5,1])),u=await o({directory:!0,multiple:!1});u&&await ht(u)}catch{e("Scanning requires the Tauri build")}else{const o=document.createElement("input");o.type="file",o.multiple=!0,o.accept="audio/*",o.onchange=async()=>{var f;const u=Array.from(o.files||[]);for(const p of u){const b=URL.createObjectURL(p),U=Math.random().toString(36).slice(2),H=((f=p.name.split(".").pop())==null?void 0:f.toUpperCase())||"MP3",L={id:U,title:p.name.replace(/\.[^/.]+$/,""),artist:"Unknown",album:"Imported",genre:"Unknown",year:new Date().getFullYear(),duration:180,path:b,codec:H,specs:"Imported · Stereo",replayGain:0},P=new Audio(b);await new Promise(M=>{P.addEventListener("loadedmetadata",()=>{L.duration=Math.floor(P.duration)||180,M(null)},{once:!0}),P.load(),setTimeout(()=>M(null),1500)}),await Xt(p,L),et.push(L)}e(`${u.length} file(s) added`),N(),yt()},o.click()}}),document.addEventListener("dragover",o=>{o.preventDefault()}),document.addEventListener("drop",async o=>{var f,p;if(o.preventDefault(),zt)return;const u=Array.from(((f=o.dataTransfer)==null?void 0:f.files)||[]).filter(b=>b.type.startsWith("audio/")||/\.(mp3|flac|wav|ogg|aac|m4a|alac)$/i.test(b.name));if(u.length){for(const b of u){const U=URL.createObjectURL(b),H=Math.random().toString(36).slice(2),L=((p=b.name.split(".").pop())==null?void 0:p.toUpperCase())||"MP3",P={id:H,title:b.name.replace(/\.[^/.]+$/,""),artist:"Imported",album:"Drop",genre:"Unknown",year:new Date().getFullYear(),duration:200,path:U,codec:L,specs:"Drag & Drop"};await Xt(b,P);const M=new Audio(U);await new Promise(Y=>{M.addEventListener("loadedmetadata",()=>{P.duration=Math.floor(M.duration)||200,Y(null)},{once:!0}),M.load(),setTimeout(()=>Y(null),800)}),et.push(P)}e(`${u.length} File added via drag & drop`),N()}});function at(){return xt.find(o=>o.id===st)||xt[0]}function lt(){localStorage.setItem("melo-rev",String(Date.now())),localStorage.setItem("melo-playlists",JSON.stringify(xt))}function ft(){zt&&J("melo:playlists-sync",{src:Ot,playlists:xt})}function St(o){st=o,localStorage.setItem("melo-currentPlaylist",o),it()}ot("melo:playlists-sync",o=>{o&&o.src!==Ot&&Array.isArray(o.playlists)&&(xt=o.playlists,it(),N())});function vt(){localStorage.setItem("melo-rev",String(Date.now()));try{localStorage.setItem("melo-tracks",JSON.stringify(et))}catch{try{localStorage.setItem("melo-tracks",JSON.stringify(et.map(({cover:o,...u})=>u)))}catch{}}}let It=new Set(et.map(o=>o.id));function Lt(o,u=!1,f=!1){let p=!1;for(const b of o)if(!It.has(b.id))et.push(b),It.add(b.id),p=!0;else{const U=et.find(H=>H.id===b.id);if(U){const H=U.cover;Object.assign(U,b),!b.cover&&H&&(U.cover=H),p=!0}}p&&!f&&(vt(),N(),it()),u&&zt&&J("melo:tracks-add",{src:Ot,list:o})}ot("melo:tracks-add",o=>{o&&o.src!==Ot&&Array.isArray(o.list)&&Lt(o.list)});function Tt(o,u=!1){const f=at();if(!f)return;let p=!1;const b=new Set(f.tracks);o.forEach(U=>{b.has(U.id)||(f.tracks.push(U.id),b.add(U.id),p=!0)}),p&&!u?(lt(),ft(),it(),N()):p&&lt()}async function Dt(o){if(!zt)return[];const{invoke:u}=await Q(async()=>{const{invoke:p}=await import("./core-DhEqZVGG.js");return{invoke:p}},[]),f=[];for(const p of o)try{const b=await u("scan_library",{path:p});b&&f.push(...b)}catch{}return f}zt&&Q(async()=>{const{getCurrentWebviewWindow:o}=await import("./webviewWindow-mjQkSB26.js");return{getCurrentWebviewWindow:o}},__vite__mapDeps([6,7,1,0,8])).then(({getCurrentWebviewWindow:o})=>{o().onDragDropEvent(async f=>{var p;if(f.payload.type==="drop"){const b=f.payload.paths||[];if(!b.length)return;const U=await Dt(b);if(!U.length)return;U.forEach(H=>H.source="import"),Lt(U,!0),Tt(U),J("melo:play-tracks",{tracks:U,index:0}),e(`Playing ${((p=U[0])==null?void 0:p.title)||"track"}`)}})}).catch(()=>{});function Mt(o){return`${Math.floor(o/60)}:${String(Math.floor(o%60)).padStart(2,"0")}`}function Pt(o){return o.type.startsWith("audio/")||/\.(mp3|flac|wav|ogg|aac|m4a|alac|opus)$/i.test(o.name)}async function $t(o){var L;const u=o.path;if(u&&zt){const P=await Dt([u]);if(P.length)return P[0].source="import",P[0]}const f=u||URL.createObjectURL(o),p=u||Math.random().toString(36).slice(2),b=((L=o.name.split(".").pop())==null?void 0:L.toUpperCase())||"MP3",U=o.name.replace(/\.[^/.]+$/,""),H={id:p,title:U,artist:"Unknown Artist",album:"Single",genre:"Unknown",year:new Date().getFullYear(),duration:180,path:f,codec:b,specs:"Local File",replayGain:0,source:"import"};try{const P=new Audio(URL.createObjectURL(o));await new Promise(M=>{P.addEventListener("loadedmetadata",()=>{H.duration=Math.floor(P.duration)||180,M(null)},{once:!0}),P.load(),setTimeout(()=>M(null),800)})}catch{}return await Xt(o,H),H}function it(){var L,P,M,Y;if(!a)return;try{const W=localStorage.getItem("melo-tracks");if(W){const R=JSON.parse(W);Array.isArray(R)&&R.length>et.length&&(et=R)}}catch{}const o=at();if(l&&(l.innerHTML=xt.map(W=>`<option value="${W.id}" ${o&&W.id===o.id?"selected":""}>${W.name}</option>`).join("")),!o){a.innerHTML="",a.style.display="none",n&&(n.style.display="block");return}const u=o.tracks.map((W,R)=>{const Z=et.find(_t=>_t.id===W||_t.path===W);if(Z)return Z;const nt=W.replace(/^.*[\\/]/,""),wt=nt.lastIndexOf("."),mt=wt>0?nt.slice(0,wt):nt;return{id:W,title:mt||`Track ${R+1}`,artist:"Audio Track",album:o.name,duration:0,path:W,codec:"AUDIO",specs:"Local File",source:"import"}});let f=u;if(j.trim()){const W=j.toLowerCase().trim();f=u.filter(R=>(R.title||"").toLowerCase().includes(W)||(R.artist||"").toLowerCase().includes(W)||(R.album||"").toLowerCase().includes(W))}if(n&&(n.style.display=u.length?"none":"block"),a.style.display=u.length?"flex":"none",!f.length&&u.length){a.innerHTML=`<div style="padding:16px;text-align:center;color:var(--text-muted);font-size:11px;">No tracks match "${j}"</div>`;return}const p=window.LumiPlayer,b=p&&p.queue&&p.queue.length&&(P=(L=p.queue[p.currentIndex])==null?void 0:L.id)!=null?P:null,U=!!b&&!((Y=(M=p==null?void 0:p.audio)==null?void 0:M.paused)==null||Y);a.innerHTML=f.map((W,R)=>{const Z=o.tracks.indexOf(W.id),nt=b===W.id;return`
      <div class="track-row ${nt?"active":""}" draggable="true" data-id="${W.id}" data-pl-idx="${Z>=0?Z:R}">
        <span class="num">${nt?U?"▶":"❚❚":R+1}</span>
        ${W.cover?`<img class="track-cover-mini" src="${W.cover}" onerror="this.style.display='none'"/>`:'<div class="track-cover-mini cover-default">♪</div>'}
        <div style="flex:1;min-width:0;">
          <div class="t-title">${W.title}</div>
          <div class="t-artist">${W.artist} • ${W.album}</div>
        </div>
        <span class="t-dur">${Mt(W.duration)}</span>
        <button class="btn small ghost" data-action="pl-remove" data-idx="${Z>=0?Z:R}" title="Remove from playlist">×</button>
      </div>
    `}).join("");let H=null;a.querySelectorAll(".track-row").forEach(W=>{const R=W;R.addEventListener("dragstart",Z=>{H=parseInt(R.dataset.plIdx),Z.dataTransfer.setData("application/x-melo-ids",R.dataset.id),Z.dataTransfer.setData("application/x-melo-pl-idx",String(H)),Z.dataTransfer.effectAllowed="move",R.style.opacity="0.4"}),R.addEventListener("dragend",()=>{R.style.opacity="1",H=null,a==null||a.querySelectorAll(".track-row").forEach(Z=>Z.classList.remove("drag-over-target"))}),R.addEventListener("dragover",Z=>{Z.preventDefault(),Z.stopPropagation(),R.classList.add("drag-over-target")}),R.addEventListener("dragleave",()=>{R.classList.remove("drag-over-target")}),R.addEventListener("drop",Z=>{var mt;Z.preventDefault(),Z.stopPropagation(),R.classList.remove("drag-over-target");const nt=parseInt(R.dataset.plIdx),wt=(mt=Z.dataTransfer)==null?void 0:mt.getData("application/x-melo-pl-idx");if(wt!==void 0&&wt!==""&&!isNaN(parseInt(wt))){const _t=parseInt(wt);if(_t!==nt&&_t>=0&&nt>=0&&_t<o.tracks.length&&nt<o.tracks.length){const Ye=o.tracks.splice(_t,1)[0];o.tracks.splice(nt,0,Ye),lt(),ft(),it(),N(),e("Track reordered in playlist");return}}}),R.addEventListener("click",Z=>{const nt=Z.target;if(nt.closest("[data-action='pl-remove']")){const _t=parseInt(nt.closest("[data-action='pl-remove']").dataset.idx);o.tracks.splice(_t,1),lt(),ft(),it(),N();return}const wt=R.dataset.id,mt=f.findIndex(_t=>_t.id===wt);J("melo:play-tracks",{tracks:f,index:mt>=0?mt:0})})})}const v=document.getElementById("playlistSearchInput");v&&v.addEventListener("input",()=>{j=v.value,it()});const k=document.getElementById("playlistSortSelect");if(k&&k.addEventListener("change",()=>{const o=at();if(!o||!o.tracks.length)return;const u=k.value,f=o.tracks.map(p=>et.find(b=>b.id===p)).filter(Boolean);u==="title-asc"?f.sort((p,b)=>p.title.localeCompare(b.title)):u==="artist-asc"?f.sort((p,b)=>p.artist.localeCompare(b.artist)):u==="album-asc"?f.sort((p,b)=>p.album.localeCompare(b.album)):u==="dur-asc"?f.sort((p,b)=>p.duration-b.duration):u==="dur-desc"&&f.sort((p,b)=>b.duration-p.duration),o.tracks=f.map(p=>p.id),lt(),ft(),it(),e(`Playlist sorted by ${k.options[k.selectedIndex].text}`)}),l==null||l.addEventListener("change",()=>St(l.value)),m==null||m.addEventListener("click",()=>{const o=at();!o||!o.tracks.length||(o.tracks=[],lt(),ft(),it(),N())}),s==null||s.addEventListener("click",()=>{const o=at();if(!o)return e("No playlist available");const u=o.tracks.map(H=>et.find(L=>L.id===H)).filter(Boolean);if(!u.length)return e("Current list is empty");let f=`#EXTM3U
`;u.forEach(H=>{f+=`#EXTINF:${Math.floor(H.duration)},${H.artist} - ${H.title}
${H.path}
`});const p=new Blob([f],{type:"audio/x-mpegurl"}),b=URL.createObjectURL(p),U=document.createElement("a");U.href=b,U.download=`${o.name}.m3u`,U.click(),URL.revokeObjectURL(b),e(`M3U exported for "${o.name}"`)}),w==null||w.addEventListener("click",()=>{const o=prompt("New playlist name:");if(!o)return;const u=Math.random().toString(36).slice(2,8);xt.push({id:u,name:o,tracks:[],createdAt:Date.now()}),St(u),lt(),ft(),N(),e(`Playlist "${o}" created`)}),a){const o=a.parentElement;["dragover","dragenter"].forEach(u=>o.addEventListener(u,f=>{f.preventDefault(),f.stopPropagation(),a.classList.add("drag-over")})),o.addEventListener("dragleave",u=>{o.contains(u.relatedTarget)||a.classList.remove("drag-over")}),o.addEventListener("drop",async u=>{var U,H;u.preventDefault(),u.stopPropagation(),a.classList.remove("drag-over");const f=at();if(!f)return e("Create a playlist first (+ New)");const p=(((U=u.dataTransfer)==null?void 0:U.getData("application/x-melo-ids"))||"").split(",").filter(Boolean);let b=0;if(p.length)p.forEach(L=>{f.tracks.includes(L)||(f.tracks.push(L),b++)});else if(!zt){const L=Array.from(((H=u.dataTransfer)==null?void 0:H.files)||[]).filter(Pt);for(const P of L){const M=await $t(P);et.push(M),f.tracks.includes(M.id)||(f.tracks.push(M.id),b++)}}b&&e(`${b} track(s) added to "${f.name}"`),vt(),lt(),ft(),N(),it()})}const A=document.getElementById("playerCard");A&&(["dragover","dragenter"].forEach(o=>A.addEventListener(o,u=>{u.preventDefault(),u.stopPropagation(),A.classList.add("drag-over")})),A.addEventListener("dragleave",o=>{A.contains(o.relatedTarget)||A.classList.remove("drag-over")}),A.addEventListener("drop",async o=>{var b,U;o.preventDefault(),o.stopPropagation(),A.classList.remove("drag-over");const u=window.LumiPlayer,f=(((b=o.dataTransfer)==null?void 0:b.getData("application/x-melo-ids"))||"").split(",").filter(Boolean);let p=[];if(f.length)p=f.map(H=>et.find(L=>L.id===H)).filter(Boolean),u&&p.length&&e(`Playback ${p.length} track(s)`);else if(!zt){const H=Array.from(((U=o.dataTransfer)==null?void 0:U.files)||[]).filter(Pt),L=at();let P=!1;for(const M of H){const Y=await $t(M);et.push(Y),p.push(Y),L&&!L.tracks.includes(Y.id)&&(L.tracks.push(Y.id),P=!0)}H.length&&(vt(),lt(),ft(),N(),it()),u&&p.length&&e(P&&L?`Playback ${p.length} track(s) + added to "${L.name}"`:`Playback ${p.length} track(s)`)}p.length&&J("melo:play-tracks",{tracks:p,index:0})}));let E=null;function D(o){if(E=o,!E)return e("No track to edit");C.style.display="flex",I.value=E.title,y.value=E.artist,F.value=E.album,O.value=String(E.year)}function G(o){const u=et.filter(o).map(f=>f.id);u.length&&(et=et.filter(f=>!o(f)),u.forEach(f=>It.delete(f)),xt.forEach(f=>{f.tracks=f.tracks.filter(p=>!u.includes(p))}),vt(),lt(),ft(),zt&&J("melo:tracks-remove",{src:Ot,ids:u}),N(),it())}ot("melo:tracks-remove",o=>{if(o&&o.src!==Ot&&Array.isArray(o.ids)){const u=o.ids;et=et.filter(f=>!u.includes(f.id)),u.forEach(f=>It.delete(f)),xt.forEach(f=>{f.tracks=f.tracks.filter(p=>!u.includes(p))}),N(),it()}});const q=document.createElement("div");q.className="ctx-menu",q.style.display="none",document.body.appendChild(q);let $=null;function r(){q.style.display="none"}document.addEventListener("click",r),document.addEventListener("keydown",o=>{o.key==="Escape"&&r()}),q.addEventListener("click",o=>{const u=o.target.closest("[data-act]");if(!u||!$)return;o.stopPropagation();const f=u.dataset.act;f==="edit"&&D($.track),f==="remove"&&($.type==="track"?G(p=>p.id===$.track.id):$.type==="artist"?G(p=>p.artist===$.name):$.type==="album"?G(p=>p.artist===$.artist&&p.album===$.album):$.type==="genre"&&G(p=>p.genre===$.name)),r()});const _=document.createElement("div");_.className="ctx-menu",_.style.display="none",document.body.appendChild(_);let B=-1;document.addEventListener("click",()=>{_.style.display="none"}),_.addEventListener("click",o=>{if(!o.target.closest("[data-act='plremove']"))return;o.stopPropagation();const u=at();u&&B>=0&&B<u.tracks.length&&(u.tracks.splice(B,1),lt(),ft(),it(),N()),_.style.display="none"}),document.addEventListener("contextmenu",o=>{r(),_.style.display="none";const u=o.target,f=u.closest("#winPlaylistTracks .track-row");if(f){o.preventDefault(),B=parseInt(f.dataset.plIdx||"-1"),_.innerHTML='<button class="ctx-item danger" data-act="plremove">Remove from Playlist</button>',_.style.display="block";const H=_.getBoundingClientRect();_.style.left=Math.max(4,Math.min(o.clientX,window.innerWidth-H.width-6))+"px",_.style.top=Math.max(4,Math.min(o.clientY,window.innerHeight-H.height-6))+"px";return}if(!(Ot==="library"?!0:!!u.closest("#win-library"))){o.preventDefault();return}o.preventDefault();const b=u.closest(".track-row, [data-artist], [data-albumkey], [data-genre]");if(!b){r();return}if(b.classList.contains("track-row")){const H=bt[parseInt(b.dataset.viewIdx)];if(!H){r();return}$={type:"track",track:H},q.innerHTML='<button class="ctx-item" data-act="edit">Edit tags</button><button class="ctx-item danger" data-act="remove">Remove track from library</button>'}else if(b.dataset.artist)$={type:"artist",name:b.dataset.artist},q.innerHTML='<button class="ctx-item danger" data-act="remove">Remove artist from library</button>';else if(b.dataset.albumkey){const[H,L]=(b.dataset.albumkey||"").split("\0");$={type:"album",artist:H,album:L},q.innerHTML='<button class="ctx-item danger" data-act="remove">Remove album from library</button>'}else $={type:"genre",name:b.dataset.genre},q.innerHTML='<button class="ctx-item danger" data-act="remove">Remove genre from library</button>';q.style.display="block";const U=q.getBoundingClientRect();q.style.left=Math.max(4,Math.min(o.clientX,window.innerWidth-U.width-6))+"px",q.style.top=Math.max(4,Math.min(o.clientY,window.innerHeight-U.height-6))+"px"}),(fe=document.getElementById("btn-tag-cancel"))==null||fe.addEventListener("click",()=>C.style.display="none"),(ve=document.getElementById("btn-tag-save"))==null||ve.addEventListener("click",async()=>{if(E){if(E.title=I.value,E.artist=y.value,E.album=F.value,E.year=parseInt(O.value)||E.year,tt.files&&tt.files[0]){const o=tt.files[0],u=URL.createObjectURL(o),f=new FileReader;f.onload=()=>{E.cover=f.result,N(),yt(),J("melo:tag-updated",E)},f.readAsDataURL(o),E.cover=u}if(window.__TAURI__)try{const{invoke:o}=await Q(async()=>{const{invoke:u}=await import("./core-DhEqZVGG.js");return{invoke:u}},[]);await o("write_tags",{path:E.path,tags:{title:E.title,artist:E.artist,album:E.album}})}catch{}C.style.display="none",vt(),N(),yt(),J("melo:tag-updated",E),e("Metadata saved")}});function x(o){return String(o!=null?o:"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function V(){return et.filter(o=>o.source==="scan")}function X(o){return bt=o,o.length?o.map((u,f)=>{const p=`${Math.floor(u.duration/60)}:${String(Math.floor(u.duration%60)).padStart(2,"0")}`;return`
      <div class="track-row" draggable="true" data-view-idx="${f}" data-id="${x(u.id)}">
        <span class="num">${f+1}</span>
        <img class="track-cover-mini" src="${u.cover||""}" style="${u.cover?"":"display:none"}" onerror="this.style.display='none'"/>
        <div style="flex:1;min-width:0;">
          <div class="t-title">${x(u.title)}</div>
          <div class="t-artist">${x(u.artist)} • ${x(u.album)}${u.year?" • "+u.year:""}</div>
        </div>
        <span style="font-size:10px;padding:3px 6px;border-radius:6px;background:var(--badge-bg);color:var(--badge-text);border:1px solid var(--card-border);">${x(u.codec)}</span>
        <span class="t-dur">${p}</span>
        <button class="btn small ghost" data-action="add-queue" data-view-idx="${f}">+</button>
      </div>`}).join(""):'<div style="padding:30px;text-align:center;color:var(--text-muted);">Nothing here yet.<br/><span style="font-size:12px;">Use "Scan Folder" to build your library</span></div>'}function N(){var U,H;if(!i){it();return}const o=V(),u=new Set(o.map(L=>L.artist)).size,f=new Set(o.map(L=>L.artist+"\0"+L.album)).size;h&&(h.textContent=`${o.length} tracks • ${u} artists • ${f} albums`);const p=rt.trim().toLowerCase();let b="";if(g==="artists")if(T){const L=o.filter(R=>R.artist===T),P=[...new Set(L.map(R=>R.album))].sort((R,Z)=>R.localeCompare(Z)),M=z?L.filter(R=>R.album===z):L,Y=(U=L.find(R=>R.cover))==null?void 0:U.cover;b=`<div class="lib-crumb"><button class="btn small" data-back="artists">‹ Artists</button>${Y?`<div class="lib-avatar" style="background-image:url('${x(Y)}')"></div>`:`<div class="lib-avatar">${x((T[0]||"?").toUpperCase())}</div>`}<b>${x(T)}</b></div>
          <div class="chip-row"><button class="chip ${z?"":"active"}" data-album="">All albums</button>`+P.map(R=>{var wt;const Z=(wt=L.find(mt=>mt.album===R&&mt.cover))==null?void 0:wt.cover,nt=Z?`<span class="chip-thumb" style="background-image:url('${x(Z)}')"></span>`:"";return`<button class="chip ${z===R?"active":""}" data-album="${x(R)}">${nt}${x(R)}</button>`}).join("")+"</div>"+X(p?M.filter(R=>(R.title+R.album).toLowerCase().includes(p)):M)}else{bt=[];const L=[...new Set(o.map(M=>M.artist))].sort((M,Y)=>M.localeCompare(Y));b=(p?L.filter(M=>M.toLowerCase().includes(p)):L).map(M=>{var Z;const Y=o.filter(nt=>nt.artist===M).length,W=(Z=o.find(nt=>nt.artist===M&&nt.cover))==null?void 0:Z.cover,R=W?`<div class="lib-avatar" style="background-image:url('${x(W)}')"></div>`:`<div class="lib-avatar">${x((M[0]||"?").toUpperCase())}</div>`;return`<div class="lib-item" data-artist="${x(M)}">${R}<div style="flex:1;min-width:0;"><div class="t-title">${x(M)}</div><div class="t-artist">${Y} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No artists found.</div>'}else if(g==="albums")if(K){const[L,P]=K.split("\0"),M=o.filter(R=>R.artist===L&&R.album===P),Y=(H=M.find(R=>R.cover))==null?void 0:H.cover;b=`<div class="lib-crumb"><button class="btn small" data-back="albums">‹ Albums</button>${Y?`<div class="lib-avatar lib-avatar-album" style="background-image:url('${x(Y)}')"></div>`:'<div class="lib-avatar lib-avatar-album">💿</div>'}<b>${x(P)}</b><span class="t-artist" style="margin-left:8px;">${x(L)}</span></div>`+X(p?M.filter(R=>R.title.toLowerCase().includes(p)):M)}else{bt=[];const L=[...new Set(o.map(M=>M.artist+"\0"+M.album))].sort((M,Y)=>M.localeCompare(Y));b=(p?L.filter(M=>M.toLowerCase().includes(p)):L).map(M=>{var wt;const[Y,W]=M.split("\0"),R=o.filter(mt=>mt.artist===Y&&mt.album===W).length,Z=(wt=o.find(mt=>mt.artist===Y&&mt.album===W&&mt.cover))==null?void 0:wt.cover,nt=Z?`<div class="lib-avatar lib-avatar-album" style="background-image:url('${x(Z)}')"></div>`:'<div class="lib-avatar lib-avatar-album">💿</div>';return`<div class="lib-item" data-albumkey="${x(M)}">${nt}<div style="flex:1;min-width:0;"><div class="t-title">${x(W)}</div><div class="t-artist">${x(Y)} • ${R} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No albums found.</div>'}else if(ct){const L=o.filter(P=>P.genre===ct);b=`<div class="lib-crumb"><button class="btn small" data-back="genres">‹ Genres</button><b>${x(ct)}</b></div>`+X(p?L.filter(P=>(P.title+P.artist).toLowerCase().includes(p)):L)}else{bt=[];const L=[...new Set(o.map(M=>M.genre))].sort((M,Y)=>M.localeCompare(Y));b=(p?L.filter(M=>M.toLowerCase().includes(p)):L).map(M=>{const Y=o.filter(W=>W.genre===M).length;return`<div class="lib-item" data-genre="${x(M)}"><div class="lib-avatar">🎼</div><div style="flex:1;min-width:0;"><div class="t-title">${x(M)}</div><div class="t-artist">${Y} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No genres found.</div>'}i.innerHTML=b,i.querySelectorAll("[data-artist]").forEach(L=>L.addEventListener("click",()=>{T=L.dataset.artist,z=null,N()})),i.querySelectorAll("[data-albumkey]").forEach(L=>L.addEventListener("click",()=>{K=L.dataset.albumkey,N()})),i.querySelectorAll("[data-genre]").forEach(L=>L.addEventListener("click",()=>{ct=L.dataset.genre,N()})),i.querySelectorAll("[data-back]").forEach(L=>L.addEventListener("click",()=>{const P=L.dataset.back;P==="artists"?(T=null,z=null):P==="albums"?K=null:ct=null,N()})),i.querySelectorAll(".chip[data-album]").forEach(L=>L.addEventListener("click",()=>{z=L.dataset.album||null,N()})),i.querySelectorAll(".track-row").forEach(L=>{L.addEventListener("dragstart",P=>{P.dataTransfer.setData("application/x-melo-ids",L.dataset.id),P.dataTransfer.effectAllowed="copy"}),L.addEventListener("click",P=>{const M=P.target,Y=parseInt(L.dataset.viewIdx);if(M.closest("[data-action='add-queue']")){kt(bt[Y]);return}J("melo:play-tracks",{tracks:bt,index:Y})})}),it()}function kt(o){J("melo:add-queue",o),e(`Queued: ${o.title}`)}function yt(){if(!S)return;const o=window.LumiPlayer,u=(o==null?void 0:o.queue)||et.slice(0,4);if(!u.length){S.innerHTML='<div style="text-align:center;color:var(--text-muted);font-size:12px;padding:12px;">Queue is empty</div>';return}S.innerHTML=u.map((f,p)=>{var b;return`
      <div class="track-row" data-id="${f.id}" data-queue-idx="${p}" style="padding:6px 8px;border-radius:8px;border:1px solid ${p===((b=o==null?void 0:o.currentIndex)!=null?b:0)?"var(--accent)":"transparent"};">
        <img class="track-cover-mini" src="${f.cover||""}" style="width:24px;height:24px;${f.cover?"":"display:none"}" />
        <div style="flex:1;min-width:0;">
          <div class="t-title" style="font-size:12px;">${f.title}</div>
          <div class="t-artist" style="font-size:11px;">${f.artist}</div>
        </div>
        <button class="btn small ghost" data-remove="${p}" style="padding:2px 6px;">×</button>
      </div>
    `}).join(""),S.querySelectorAll("[data-remove]").forEach(f=>{f.addEventListener("click",()=>{const p=parseInt(f.dataset.remove);u.splice(p,1),yt()})}),S.querySelectorAll(".track-row").forEach(f=>{f.addEventListener("click",p=>{if(p.target.closest("[data-remove]"))return;const b=parseInt(f.dataset.queueIdx),U=window.LumiPlayer;U&&U.loadTrack(b)})})}ot("melo:track-changed",o=>{yt();const u=document.getElementById("lyricsBox");u&&o&&(u.textContent=o.lyrics||"No lyrics found for this track. You can add it via the tag editor."),document.querySelectorAll(".track-row").forEach(f=>{f.classList.toggle("active",f.dataset.id===(o==null?void 0:o.id))})}),setInterval(()=>yt(),2e3);let Qt=localStorage.getItem("melo-rev")||"";setInterval(()=>{const o=localStorage.getItem("melo-rev")||"";if(o!==Qt){Qt=o;try{const u=JSON.parse(localStorage.getItem("melo-tracks")||"null");if(Array.isArray(u)){const f=new Map(et.map(p=>[p.id,p]));et=u.map(p=>{const b=f.get(p.id);return!p.cover&&(b!=null&&b.cover)?{...p,cover:b.cover}:p}),It=new Set(et.map(p=>p.id))}}catch{}try{const u=JSON.parse(localStorage.getItem("melo-playlists")||"null");Array.isArray(u)&&u.length&&(xt=u)}catch{}N(),it()}},1200);let le=null;function Kt(){le||(le=setTimeout(()=>{le=null,vt(),N(),it()},350))}window.LumiLibrary={get tracks(){return et},get playlists(){return xt},render:N,addTracks:Lt,addToCurrentPlaylist:Tt,importPaths:Dt,flushDeferred:Kt,scanFolder:ht,currentPlaylistName:()=>{var o;return((o=at())==null?void 0:o.name)||"Playlist"}}}const Jt={flat:[0,0,0,0,0,0,0,0,0,0],pop:[-1,2,4,4,2,-1,-1,2,3,3],rock:[4,3,2,-1,-2,-2,1,3,4,4],bass:[6,5,4,2,1,0,-1,-1,-2,-3],treble:[-3,-2,-1,0,1,2,3,5,6,6],dance:[5,4,2,0,-1,-1,2,4,5,3],jazz:[2,1,2,3,2,0,1,2,3,2],classical:[3,2,1,0,0,0,-1,2,3,4],vocal:[-2,-1,0,2,4,4,3,1,0,-1],acoustic:[3,2,1,1,2,2,3,3,2,1],hiphop:[5,4,1,2,-1,-1,1,-1,2,3],metal:[4,2,-1,-2,-1,1,3,4,5,4]};function ce(t){for(const[e,i]of Object.entries(Jt))if(i.every((a,n)=>a===t[n]))return e;return"custom"}function xe(t,e,i={}){const a=!!i.remote,n=document.getElementById("eqEnable"),l=document.getElementById("eqPreset"),c=document.getElementById("btnEqReset"),h=document.getElementById("eqBands"),d=document.getElementById("eqCanvas"),s=d?d.getContext("2d"):null;let m=null,w=[],S=[],C=new Array(Yt.length).fill(0);try{const g=JSON.parse(localStorage.getItem("melo-eq-gains")||"null");Array.isArray(g)&&g.length===Yt.length&&(C=g.map(T=>typeof T=="number"?Math.max(-12,Math.min(12,T)):0))}catch{}let I=localStorage.getItem("melo-eq-preset")||ce(C),y=localStorage.getItem("melo-eq-enabled")!=="0";function F(){if(!m)try{const g=ee(t);m=g.ctx,w=g.filters,w.forEach((T,z)=>{T.gain.value=y?C[z]:0})}catch{}}function O(g,T){F(),w[g]&&y&&(w[g].gain.value=T)}function tt(g){F(),C=[...g],y&&g.forEach((T,z)=>{w[z]&&(w[z].gain.value=T)}),j()}function rt(g){F(),y=g,g?C.forEach((T,z)=>{w[z]&&(w[z].gain.value=T)}):w.forEach(T=>{T.gain.value=0}),j()}a||t&&t.addEventListener("play",()=>{F(),(m==null?void 0:m.state)==="suspended"&&m.resume().catch(()=>{})}),ot("melo:eq",g=>{g&&(g.type==="gain"?(a||O(g.idx,g.val),C[g.idx]=g.val,S[g.idx]&&(S[g.idx].value=String(g.val),st(S[g.idx])),l&&(l.value=ce(C)),j()):g.type==="gains"?(a||tt(g.values),C=[...g.values],S.length&&S.forEach((T,z)=>{T.value=String(C[z]),st(T)}),l&&g.preset&&(l.value=g.preset),j()):g.type==="enable"&&(y=!!g.on,a||rt(y),n&&(n.checked=y),j()))});function st(g){var K;const T=parseInt(g.value),z=(K=g.parentElement)==null?void 0:K.querySelector(".val");z&&(z.textContent=(T>0?"+":"")+T+"dB")}function j(){if(!d||!s)return;const g=window.devicePixelRatio||1,T=d.clientWidth*g,z=d.clientHeight*g;if(T<=0||z<=0)return;d.width=T,d.height=z,s.clearRect(0,0,T,z);const K=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#2a7bd6",ct=C;if(!y){s.strokeStyle="rgba(100,120,150,0.25)",s.lineWidth=2*g,s.beginPath(),s.moveTo(0,z/2),s.lineTo(T,z/2),s.stroke();return}s.strokeStyle=K,s.lineWidth=2.5*g,s.lineJoin="round",s.beginPath(),ct.forEach((bt,ht)=>{const at=ht/(ct.length-1)*T,lt=z/2-bt/12*(z/2-10*g);if(ht===0)s.moveTo(at,lt);else{const ft=(ht-1)/(ct.length-1)*T,St=z/2-ct[ht-1]/12*(z/2-10*g);s.quadraticCurveTo((ft+at)/2,St,at,lt)}}),s.stroke(),ct.forEach((bt,ht)=>{const at=ht/(ct.length-1)*T,lt=z/2-bt/12*(z/2-10*g);s.fillStyle=K,s.beginPath(),s.arc(at,lt,4*g,0,Math.PI*2),s.fill(),s.fillStyle="white",s.beginPath(),s.arc(at,lt,2*g,0,Math.PI*2),s.fill()}),s.strokeStyle="rgba(100,120,150,0.3)",s.lineWidth=1*g,s.setLineDash([4*g,4*g]),s.beginPath(),s.moveTo(0,z/2),s.lineTo(T,z/2),s.stroke(),s.setLineDash([])}h&&(h.innerHTML="",Yt.forEach((g,T)=>{const z=C[T]||0,K=document.createElement("div");K.className="eq-band",K.innerHTML=`
        <input type="range" min="-12" max="12" value="${z}" step="1" data-idx="${T}" orient="vertical" />
        <label>${g>=1e3?g/1e3+"k":g}</label>
        <span style="font-size:10px;color:var(--text-muted);min-height:12px;" class="val">${(z>0?"+":"")+z+"dB"}</span>
      `,h.appendChild(K)}),S=Array.from(h.querySelectorAll("input")),S.forEach(g=>{g.addEventListener("input",()=>{const T=parseInt(g.dataset.idx),z=parseInt(g.value);st(g),C[T]=z,j();const K=ce(C);l&&(l.value=K),localStorage.setItem("melo-eq-gains",JSON.stringify(C)),localStorage.setItem("melo-eq-preset",K),a||O(T,z),J("melo:eq",{type:"gain",idx:T,val:z,values:C})})})),l&&(l.value=I,l.addEventListener("change",()=>{const g=Jt[l.value]||Jt.flat;S.length&&S.forEach((T,z)=>{T.value=String(g[z]),st(T)}),C=[...g],j(),localStorage.setItem("melo-eq-gains",JSON.stringify(C)),localStorage.setItem("melo-eq-preset",l.value),a||tt(g),J("melo:eq",{type:"gains",values:g,preset:l.value}),e(`Preset: ${l.options[l.selectedIndex].text}`)})),c&&c.addEventListener("click",()=>{const g=Jt.flat;S.length&&S.forEach((T,z)=>{T.value="0",st(T)}),C=[...g],l&&(l.value="flat"),localStorage.setItem("melo-eq-gains",JSON.stringify(C)),localStorage.setItem("melo-eq-preset","flat"),a||tt(g),J("melo:eq",{type:"gains",values:g,preset:"flat"}),j(),e("Equalizer reset to Flat (0dB)")}),n&&(n.checked=y,n.addEventListener("change",()=>{y=n.checked,localStorage.setItem("melo-eq-enabled",y?"1":"0"),a||rt(y),J("melo:eq",{type:"enable",on:y}),j(),e(y?"Equalizer On":"Equalizer off — Flat")})),d&&new ResizeObserver(()=>j()).observe(d),j(),window.LumiEqualizer={presets:Jt,frequencies:Yt,displayGains:C,reset:()=>c==null?void 0:c.click()}}const Gt=[{id:"bars",label:"Classic Bars"},{id:"thin",label:"Thin Bars"},{id:"line",label:"Spectrum Line"},{id:"mirror",label:"Mirror Bars"},{id:"wave",label:"Oscilloscope"},{id:"spectrumWave",label:"Spectrum Wave"},{id:"blocks",label:"Block Equalizer"}];function ea(t){let e=document.getElementById("vizBars");if(!e)return;let i=y(e),a=i.getContext("2d"),n=null,l=null,c=null,h=null,d=null,s=!1,m=localStorage.getItem("melo-viz-mode")||"bars";Gt.some(v=>v.id===m)||(m="bars");let w=0,S=[],C=.45,I=null;function y(v){let k=v.querySelector("canvas");return k||(v.innerHTML="",k=document.createElement("canvas"),v.appendChild(k)),k}function F(){if(!(l&&c))try{const v=ee(t);n=v.ctx,l=v.analyser,c=new Uint8Array(l.frequencyBinCount),h=new Uint8Array(l.fftSize)}catch{s=!0}}function O(v){const k=c.length,A=((n==null?void 0:n.sampleRate)||44100)/2,E=45,D=Math.min(15e3,A*.95),G=Math.log(E),q=Math.log(D),$=[];for(let r=0;r<v;r++){const _=Math.exp(G+(q-G)*r/v),B=Math.exp(G+(q-G)*(r+1)/v);let x=Math.floor(_/A*k),V=Math.max(x+1,Math.ceil(B/A*k));x<0&&(x=0),V>k&&(V=k);let X=0;for(let N=x;N<V;N++)X+=c[N];$.push(X/(V-x)/255)}return $}function tt(v){const k=performance.now()/1e3,A=Math.pow(Math.abs(Math.sin(k*2.2)),2.5),E=[];for(let D=0;D<v;D++){let G=.42+.26*Math.sin(k*1.35+D*.62)+.2*Math.sin(k*2.9+D*1.31)+Math.random()*.07;G*=.55+.5*A,E.push(Math.max(.04,Math.min(1,G)))}return E}function rt(v){const k=performance.now()/1e3,A=.5+.5*Math.pow(Math.abs(Math.sin(k*1.9)),2);for(let E=0;E<v.length;E++){const D=E/v.length;v[E]=128+66*A*(Math.sin(D*Math.PI*6+k*7)*.6+Math.sin(D*Math.PI*13-k*11)*.4)}}function st(v){let k;if(s||!l||!c)k=tt(v);else if(l.getByteFrequencyData(c),k=O(v),!k.some(D=>D>.01)&&!t.paused)k=tt(v);else for(let D=0;D<v;D++)k[D]*=1+1.7*(D/Math.max(1,v-1));let A=0;for(const E of k)E>A&&(A=E);A>C?C=A:C=Math.max(.35,C*.985),S.length!==v&&(S=new Array(v).fill(0));for(let E=0;E<v;E++){const D=Math.min(1,k[E]/C),G=D>S[E]?.55:.16;S[E]+=(D-S[E])*G}return S}function j(v,k){return getComputedStyle(document.documentElement).getPropertyValue(v).trim()||k}function g(){return i.width/Math.max(1,i.clientWidth)||1}function T(v,k,A,E,D){if(D=Math.min(D,A/2,E/2),a.roundRect){a.roundRect(v,k,A,E,D);return}a.rect(v,k,A,E)}function z(){const v=window.devicePixelRatio||1,k=i.clientWidth||(e==null?void 0:e.clientWidth)||200,A=i.clientHeight||(e==null?void 0:e.clientHeight)||56;k>0&&A>0&&(i.width=Math.round(k*v),i.height=Math.round(A*v))}new ResizeObserver(z).observe(i),z();function K(v,k,A,E){const D=g(),G=j("--visualizer","#38bdf8"),q=j("--accent","#0284c7"),$=v.length,r=k/$,_=Math.max(1.2*D,r*(1-E));for(let B=0;B<$;B++){const x=v[B],V=Math.max(2*D,x*(A-4*D)),X=B*r+(r-_)/2,N=A-V-1*D,kt=a.createLinearGradient(0,N,0,A);kt.addColorStop(0,q),kt.addColorStop(1,G),a.fillStyle=kt,a.beginPath(),T(X,N,_,V,Math.min(_/2,3.5*D)),a.fill()}}function ct(v,k,A){const E=g(),D=j("--visualizer","#38bdf8"),G=j("--accent","#0284c7"),q=v.length,$=k/q,r=A/2,_=Math.max(1.5*E,$*.62);for(let B=0;B<q;B++){const x=Math.max(1.5*E,v[B]*(A/2-3*E)),V=B*$+($-_)/2,X=a.createLinearGradient(0,r-x,0,r+x);X.addColorStop(0,G),X.addColorStop(.5,D),X.addColorStop(1,G),a.fillStyle=X,a.beginPath(),T(V,r-x,_,x*2,Math.min(_/2,3*E)),a.fill()}}function bt(v,k,A){const E=g(),D=j("--visualizer","#38bdf8"),G=j("--accent","#0284c7"),q=v.length,$=[],r=[];for(let B=0;B<q;B++)$.push((B+.5)/q*k),r.push(A-2*E-v[B]*(A-8*E));a.beginPath(),a.moveTo($[0],A),a.lineTo($[0],r[0]);for(let B=1;B<q;B++){const x=($[B-1]+$[B])/2;a.quadraticCurveTo($[B-1],r[B-1],x,(r[B-1]+r[B])/2)}a.lineTo($[q-1],r[q-1]),a.lineTo($[q-1],A),a.closePath();const _=a.createLinearGradient(0,0,0,A);_.addColorStop(0,D),_.addColorStop(1,"transparent"),a.globalAlpha=.18,a.fillStyle=_,a.fill(),a.globalAlpha=1,a.beginPath(),a.moveTo($[0],r[0]);for(let B=1;B<q;B++){const x=($[B-1]+$[B])/2;a.quadraticCurveTo($[B-1],r[B-1],x,(r[B-1]+r[B])/2)}a.lineTo($[q-1],r[q-1]),a.strokeStyle=G,a.lineWidth=2*E,a.lineJoin="round",a.stroke()}function ht(v,k,A){const E=g(),D=j("--visualizer","#38bdf8"),G=j("--accent","#0284c7"),q=A/2,$=v.length,r=v.map((x,V)=>{const X=V/Math.max(1,$-1),N=Math.pow(Math.sin(Math.PI*X),.28);return Math.max(.7*E,x*N*(A*.46))}),_=x=>{a.beginPath();for(let V=0;V<$;V++){const X=V/Math.max(1,$-1)*k,N=q+(x?-r[V]:r[V]);if(V===0)a.moveTo(X,N);else{const kt=(V-1)/Math.max(1,$-1)*k,yt=q+(x?-r[V-1]:r[V-1]);a.quadraticCurveTo(kt,yt,(kt+X)/2,(yt+N)/2)}}};_(!0);for(let x=$-1;x>=0;x--){const V=x/Math.max(1,$-1)*k;a.lineTo(V,q+r[x])}a.closePath();const B=a.createLinearGradient(0,0,0,A);B.addColorStop(0,G),B.addColorStop(.5,D),B.addColorStop(1,G),a.fillStyle=B,a.globalAlpha=.3,a.fill(),a.globalAlpha=.18,a.shadowColor=D,a.shadowBlur=8*E,_(!0),a.strokeStyle=D,a.lineWidth=4*E,a.stroke(),_(!1),a.stroke(),a.shadowBlur=0,a.globalAlpha=1,_(!0),a.strokeStyle=G,a.lineWidth=1.2*E,a.stroke(),_(!1),a.stroke(),a.beginPath(),a.moveTo(0,q),a.lineTo(k,q),a.strokeStyle=D,a.globalAlpha=.45,a.lineWidth=.8*E,a.stroke(),a.globalAlpha=1}function at(v,k,A){const E=g(),D=j("--visualizer","#38bdf8"),G=j("--accent","#0284c7"),q=v.length,$=8,r=Math.max(1*E,k*.0035),_=Math.max(1*E,A*.025),B=Math.max(1,(k-r*(q-1))/q),x=Math.max(1,(A-_*($-1))/$),V=a.createLinearGradient(0,0,0,A);V.addColorStop(0,G),V.addColorStop(1,D),a.fillStyle=V;for(let X=0;X<q;X++){const N=Math.max(1,Math.min($,Math.round(v[X]*$))),kt=X*(B+r);for(let yt=0;yt<N;yt++){const Qt=A-(yt+1)*x-yt*_;a.globalAlpha=.58+.42*((yt+1)/$),a.fillRect(kt,Qt,B,x)}}a.globalAlpha=1}function lt(){const v=i.width,k=i.height,A=g(),E=j("--accent","#0284c7");let D;s||!l||!h?(d||(d=new Uint8Array(1024)),rt(d),D=d):(l.getByteTimeDomainData(h),D=h);const G=()=>{a.beginPath();for(let q=0;q<=v;q+=2){const $=Math.min(D.length-1,Math.floor(q/v*D.length)),r=D[$]/255*k;q===0?a.moveTo(q,r):a.lineTo(q,r)}};G(),a.strokeStyle=E,a.globalAlpha=.16,a.lineWidth=6*A,a.lineJoin="round",a.stroke(),G(),a.globalAlpha=1,a.lineWidth=1.8*A,a.stroke()}function ft(){const v=i.width,k=i.height;if(!v||!k)return;if(a.clearRect(0,0,v,k),m==="wave"){lt();return}const E=st(m==="bars"?16:m==="thin"?56:m==="line"?64:m==="spectrumWave"?72:m==="blocks"?22:24);m==="bars"?K(E,v,k,.34):m==="thin"?K(E,v,k,.32):m==="line"?bt(E,v,k):m==="mirror"?ct(E,v,k):m==="spectrumWave"?ht(E,v,k):m==="blocks"&&at(E,v,k)}function St(){w=requestAnimationFrame(St),ft()}function vt(){w||St()}function It(v,k=!1){m=v,S=[],localStorage.setItem("melo-viz-mode",v)}function Lt(){return I||(I=document.createElement("div"),I.className="viz-menu",I.style.display="none",document.body.appendChild(I),I)}function Tt(){const v=Lt();v.innerHTML='<div class="viz-menu-label">Visualizer type</div>'+Gt.map(k=>`<button class="viz-menu-item ${k.id===m?"active":""}" data-mode="${k.id}">${k.id===m?"✓":""}<span>${k.label}</span></button>`).join(""),v.querySelectorAll("[data-mode]").forEach(k=>{k.addEventListener("click",A=>{A.stopPropagation(),It(k.dataset.mode),Mt()})})}function Dt(v,k){Tt();const A=I;A.style.display="block";const E=A.getBoundingClientRect();A.style.left=Math.max(8,Math.min(v,window.innerWidth-E.width-8))+"px",A.style.top=Math.max(8,Math.min(k,window.innerHeight-E.height-8))+"px"}function Mt(){I&&(I.style.display="none")}function Pt(){e&&(e.title="Click: next mode • Right-click: choose mode",e.addEventListener("click",()=>{Mt();const v=Gt.findIndex(k=>k.id===m);It(Gt[(v+1)%Gt.length].id)}),e.addEventListener("contextmenu",v=>{v.preventDefault(),v.stopPropagation(),Dt(v.clientX,v.clientY)}))}document.addEventListener("click",v=>{I&&I.style.display!=="none"&&!I.contains(v.target)&&Mt()}),document.addEventListener("keydown",v=>{v.key==="Escape"&&Mt()});function $t(){F(),vt(),(n==null?void 0:n.state)==="suspended"&&n.resume().catch(()=>{})}t.addEventListener("play",$t),$t(),Pt(),document.addEventListener("visibilitychange",()=>{document.hidden?(cancelAnimationFrame(w),w=0):vt()});function it(){cancelAnimationFrame(w),w=0,e=document.getElementById("vizBars"),e&&(i=y(e),a=i.getContext("2d"),new ResizeObserver(z).observe(i),z(),Pt(),vt())}window.__LUMI_REBIND_VISUALIZER__=it}function ke(t){if(!t||!t.trim())return{isSynced:!1,lines:[],raw:""};const e=[],i=t.split(/\r?\n/),a=/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;let n=!1;for(const l of i){const c=l.trim();if(!c||/^\[[a-z]{2,8}:/i.test(c))continue;const h=[...c.matchAll(a)];if(h.length>0){n=!0;const d=c.replace(a,"").trim();for(const s of h){const m=parseInt(s[1],10),w=parseInt(s[2],10),S=s[3]||"0",C=S.length===2?parseInt(S,10)*10:S.length===1?parseInt(S,10)*100:parseInt(S.slice(0,3),10),I=m*60+w+C/1e3;e.push({time:I,text:d})}}else e.push({time:-1,text:c})}return e.sort((l,c)=>l.time-c.time),{isSynced:n,lines:e,raw:t}}function Ee(t,e){var I;const i=document.getElementById("lyricsContainer"),a=document.getElementById("lyricsStatus"),n=document.getElementById("lyricsTrackTitle");let l={isSynced:!1,lines:[]},c=null,h=-1,d=0;async function s(y){if(y.lyrics&&y.lyrics.trim().length>0)return y.lyrics;if(window.__TAURI__)try{const{invoke:F}=await Q(async()=>{const{invoke:tt}=await import("./core-DhEqZVGG.js");return{invoke:tt}},[]),O=await F("get_track_lyrics",{path:y.path});if(O)return O}catch{}return null}async function m(y){if(!y){c=null,l={isSynced:!1,lines:[],raw:""},n&&(n.textContent="No track playing"),w();return}c=y.id,n&&(n.textContent=`${y.title} — ${y.artist}`);const F=await s(y);l=ke(F||""),w()}function w(){if(i){if(i.innerHTML="",h=-1,!l.lines.length){a&&(a.style.display="block",a.innerHTML='No synced lyrics found (.lrc)<br/><span style="font-size:10.5px; opacity:0.7;">Place a matching .lrc file in the song folder or add lyrics in the tag editor.</span>');return}a&&(a.style.display="none"),l.lines.forEach((y,F)=>{const O=document.createElement("div");O.className="lyric-line",O.dataset.idx=String(F),O.dataset.time=String(y.time),O.textContent=y.text||"♪",y.time>=0&&(O.style.cursor="pointer",O.title=`Seek to ${Math.floor(y.time/60)}:${Math.floor(y.time%60).toString().padStart(2,"0")}`,O.addEventListener("click",()=>{J("melo:seek-playback",y.time),window.__TAURI__||(t.currentTime=y.time,t.play().catch(()=>{}))})),i.appendChild(O)})}}function S(){if(!i||!l.isSynced||!l.lines.length)return;const y=window.__TAURI__?d:t.currentTime;let F=-1;for(let O=0;O<l.lines.length&&l.lines[O].time<=y;O++)F=O;if(F!==h){h=F;const O=i.querySelectorAll(".lyric-line");if(O.forEach((tt,rt)=>{tt.classList.toggle("active",rt===h),tt.classList.toggle("passed",rt<h)}),h>=0&&O[h]){const tt=O[h],rt=i.clientHeight,j=tt.offsetTop-i.offsetTop-rt/2+tt.clientHeight/2;i.scrollTo({top:Math.max(0,j),behavior:"smooth"})}}}t.addEventListener("timeupdate",S),window.addEventListener("lumi:trackChange",y=>{m(y.detail)}),ot("melo:track-changed",y=>{m(y)}),ot("melo:playback-state",y=>{y&&(d=Number(y.currentTime)||0,y.track&&y.track.id!==c?m(y.track):S())}),ot("melo:playback-position",y=>{d=Number(y)||0,S()});const C=window.__LUMI_QUEUE__;if(Array.isArray(C)&&C.length>0)m(C[((I=window.LumiPlayer)==null?void 0:I.currentIndex)||0]);else try{const y=JSON.parse(localStorage.getItem("melo-current-track")||"null");y&&m(y)}catch{}J("melo:request-playback-state"),setTimeout(()=>J("melo:request-playback-state"),250),window.LumiLyrics={loadTrackLyrics:m,parseLRC:ke}}let Rt=null;const Se=`<!doctype html>
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
`,Le=`<!doctype html>
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
`,ae={"compact-pill-light.html":Se,"compact-pill-dark.html":Le,"compact-pill-light":Se,"compact-pill-dark":Le},aa=[{id:"compact-pill-light",name:"Minimal Compact (Light)",filename:"compact-pill-light.html"},{id:"compact-pill-dark",name:"Minimal Compact (Dark)",filename:"compact-pill-dark.html"},{id:"full-html-example",name:"Full HTML Example",filename:"full-html-example.html"},{id:"example-custom",name:"Custom CSS Example",filename:"example-custom.html"}];function Pe(t){const e=["trackTitle","btnPlay","seekBar","coverImg"];let i=0;for(const a of e)t.includes(a)&&i++;return i>=3}function Nt(t,e){const i=document.getElementById("playerCard");if(!i)return;const a=i._originalHTML||i.innerHTML;i._originalHTML||(i._originalHTML=a),Rt&&(Rt.remove(),Rt=null);let l=[...t.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(w=>w[1]).join(`
`);l&&(Rt=document.createElement("style"),Rt.id="melo-custom-skin",Rt.textContent=l,document.head.appendChild(Rt));const c=Pe(t);let h="";const d=t.match(/<body[^>]*>([\s\S]*?)<\/body>/i);d?h=d[1]:h=t.split(/<\/style>/i).pop()||"";const s=document.createElement("div");s.innerHTML=h;const m=s.querySelector("#lumi-player");if(m&&(h=m.innerHTML),c&&h.trim().length>20){const w=h.trim();i.innerHTML=w,e&&e("Skin applied"),setTimeout(()=>{var C,I;(C=window.__LUMI_REBIND__)==null||C.call(window);const S=window.__LUMI_AUDIO__;S&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(S),(I=window.__LUMI_REBIND_MAIN__)==null||I.call(window)},40)}else l&&e&&e("Skin CSS applied");localStorage.setItem("lumi-custom-skin",t),localStorage.setItem("lumi-custom-skin-isFull",c?"1":"0")}function de(t,e=!0){document.documentElement.classList.remove("compact-skin-active"),document.body.classList.remove("compact-skin-active"),Rt&&(Rt.remove(),Rt=null);const i=document.getElementById("playerCard");i&&i._originalHTML&&(i.innerHTML=i._originalHTML,setTimeout(()=>{var n,l;(n=window.__LUMI_REBIND__)==null||n.call(window);const a=window.__LUMI_AUDIO__;a&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(a),(l=window.__LUMI_REBIND_MAIN__)==null||l.call(window)},40)),localStorage.removeItem("lumi-custom-skin"),localStorage.removeItem("lumi-custom-skin-isFull"),localStorage.setItem("melo-active-skin-id","default"),e&&J("melo:skin-changed","default"),t&&t("Switched to Default Melo skin")}async function ze(){if(ut)try{const{invoke:t}=await Q(async()=>{const{invoke:i}=await import("./core-DhEqZVGG.js");return{invoke:i}},[]),e=await t("list_installed_skins");if(Array.isArray(e)&&e.length>0)return e}catch{}return aa}async function Re(t,e){if(ut)try{const{invoke:a}=await Q(async()=>{const{invoke:l}=await import("./core-DhEqZVGG.js");return{invoke:l}},[]),n=await a("read_skin_file",{filenameOrPath:t});if(n&&n.trim().length>0)return Nt(n,e),!0}catch{}try{const a=t.startsWith("skins/")?t:`skins/${t}`,n=await fetch(a);if(n.ok){const l=await n.text();return Nt(l,e),!0}}catch{}const i=t.replace(/^.*[\\/]/,"");return ae[i]?(Nt(ae[i],e),!0):(e&&e(`Could not load skin: ${t}`),!1)}async function Ht(t,e,i,a=!0){if(t==="default"){de(i,a);return}let n=t;const l=t==="compact-pill"||t.startsWith("compact-pill");document.documentElement.classList.toggle("compact-skin-active",l),document.body.classList.toggle("compact-skin-active",l),l?n=e==="dark"?"compact-pill-dark.html":"compact-pill-light.html":!n.endsWith(".html")&&!n.endsWith(".htm")&&(n=n+".html");let c=!1;l&&ae[n]?(Nt(ae[n],i),c=!0):c=await Re(n,i),c&&(localStorage.setItem("melo-active-skin-id",t),a&&J("melo:skin-changed",t))}async function $e(t){if(ut)try{const{invoke:e}=await Q(async()=>{const{invoke:i}=await import("./core-DhEqZVGG.js");return{invoke:i}},[]);await e("open_skins_folder"),t&&t("Opening skins folder...")}catch{t&&t("Could not open skins folder")}else t&&t("Skins are located in the skins/ folder")}function ia(t){const e=document.getElementById("skinUpload"),i=document.getElementById("linkDownloadExample");i&&i.addEventListener("click",l=>{l.preventDefault(),Re("compact-pill-light.html")});const a=localStorage.getItem("melo-active-skin-id")||"default",n=localStorage.getItem("lumi-theme")||"dark";a!=="default"&&setTimeout(()=>{Ht(a,n,void 0,!1)},150),ot("melo:theme",l=>{const c=localStorage.getItem("melo-active-skin-id");c&&c!=="default"&&Ht(c,l,void 0,!1)}),ot("melo:skin-changed",l=>{if(l&&typeof l=="string"){const c=localStorage.getItem("lumi-theme")||"dark";Ht(l,c,void 0,!1)}}),e&&e.addEventListener("change",async()=>{var d;const l=(d=e.files)==null?void 0:d[0];if(!l)return;const c=await l.text(),h=l.name;if(ut)try{const{invoke:s}=await Q(async()=>{const{invoke:m}=await import("./core-DhEqZVGG.js");return{invoke:m}},[]);await s("save_custom_skin_file",{filename:h,content:c}),t(`Saved ${h} to skins folder`)}catch{}Nt(c,t),localStorage.setItem("melo-active-skin-id",h),J("melo:skin-changed",h),e.value=""}),document.addEventListener("dragover",l=>{var c;[...((c=l.dataTransfer)==null?void 0:c.types)||[]].includes("Files")&&l.preventDefault()}),document.addEventListener("drop",async l=>{var h;const c=[...((h=l.dataTransfer)==null?void 0:h.files)||[]].find(d=>d.name.endsWith(".html")||d.name.endsWith(".htm"));if(c){l.preventDefault();const d=await c.text();if(d.includes("<style")||d.includes("<html")||Pe(d)){const s=c.name;if(ut)try{const{invoke:m}=await Q(async()=>{const{invoke:w}=await import("./core-DhEqZVGG.js");return{invoke:w}},[]);await m("save_custom_skin_file",{filename:s,content:d})}catch{}Nt(d,t),localStorage.setItem("melo-active-skin-id",s),J("melo:skin-changed",s)}}}),window.LumiSkin={applyCustomSkin:Nt,resetSkin:de,applySkinChoice:Ht,listInstalledSkins:ze,openSkinsFolderOnDisk:$e}}const na=(t,e,i)=>{const a=t[e];return a?typeof a=="function"?a():Promise.resolve(a):new Promise((n,l)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(l.bind(null,new Error("Unknown variable dynamic import: "+e+(e.split("/").length!==i?". Note that variables only represent file names one level deep.":""))))})},qe={code:"en",name:"English",nativeName:"English",authors:["Melo Team"]},pe={_meta:qe,"settings.tabs.general":"General","settings.tabs.playback":"Playback","settings.tabs.appearance":"Appearance & Skin","settings.tabs.shortcuts":"Shortcuts","settings.tabs.about":"About","settings.general.language.label":"Language","settings.general.language.desc":"Interface language — more languages coming via community translation","settings.general.tray.label":"Close to system tray","settings.general.tray.desc":"Minimize to system tray on window close","settings.general.resume.label":"Resume playback on reopen","settings.general.resume.desc":"Continue playback of the previous track where you left off","settings.playback.replaygain.label":"ReplayGain normalization","settings.playback.replaygain.desc":"Equalize track volume levels automatically","settings.playback.fadepause.label":"Fade out on pause","settings.playback.fadepause.desc":"Smooth 0.3s fade-out on pause, fade back in on resume","settings.appearance.showstop.label":"Show Stop button","settings.appearance.showstop.desc":"Display a Stop control next to Play/Pause in the player"},oa=Object.freeze(Object.defineProperty({__proto__:null,_meta:qe,default:pe},Symbol.toStringTag,{value:"Module"})),De=[{code:"en",nativeName:"English"}],Ut={en:pe};let Oe=Ut.en,Ue="en";function la(){return Ue}async function He(t){if(De.some(e=>e.code===t)||(t="en"),!Ut[t])if(t==="en")Ut.en=pe;else try{const e=await na(Object.assign({"./locales/en.json":()=>Q(()=>Promise.resolve().then(()=>oa),void 0)}),`./locales/${t}.json`,3);Ut[t]=e.default||e}catch{t="en"}Ue=t,Oe=Ut[t]||Ut.en,localStorage.setItem("melo-pref-language",t),document.dispatchEvent(new CustomEvent("melo:locale-changed",{detail:t}))}function gt(t){var e,i;return(i=(e=Oe[t])!=null?e:Ut.en[t])!=null?i:t}function Me(){const t=localStorage.getItem("melo-pref-language")||"en";He(t)}const Ne=document.querySelector("#app");Ne.innerHTML=`
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
        <div class="playlist-toolbar" style="display:flex; gap:6px; align-items:center; flex-shrink:0;">
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
          <button class="settings-tab active" data-stab="general"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>${gt("settings.tabs.general")}</button>
          <button class="settings-tab" data-stab="playback"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4z"/></svg>${gt("settings.tabs.playback")}</button>
          <button class="settings-tab" data-stab="appearance"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>${gt("settings.tabs.appearance")}</button>
          <button class="settings-tab" data-stab="shortcuts"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M18 14h.01M9 14h6"/></svg>${gt("settings.tabs.shortcuts")}</button>
          <button class="settings-tab" data-stab="about"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>${gt("settings.tabs.about")}</button>
        </div>

        <!-- GENERAL TAB -->
        <div class="settings-section active" data-panel="general">
          <div class="settings-row">
            <div><div class="label">${gt("settings.general.language.label")}</div><div class="desc">${gt("settings.general.language.desc")}</div></div>
            <select class="settings-select" id="setLanguage">${De.map(t=>`<option value="${t.code}">${t.nativeName}</option>`).join("")}</select>
          </div>
          <div class="settings-row">
            <div><div class="label">${gt("settings.general.tray.label")}</div><div class="desc">${gt("settings.general.tray.desc")}</div></div>
            <div class="switch on" id="swTray" data-key="tray"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">${gt("settings.general.resume.label")}</div><div class="desc">${gt("settings.general.resume.desc")}</div></div>
            <div class="switch on" id="swResume" data-key="resume"></div>
          </div>
        </div>

        <!-- PLAYBACK TAB -->
        <div class="settings-section" data-panel="playback">
          <div class="settings-row">
            <div><div class="label">${gt("settings.playback.replaygain.label")}</div><div class="desc">${gt("settings.playback.replaygain.desc")}</div></div>
            <div class="switch on" id="swReplayGain" data-key="replayGainGlobal"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">${gt("settings.playback.fadepause.label")}</div><div class="desc">${gt("settings.playback.fadepause.desc")}</div></div>
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
            <div><div class="label">${gt("settings.appearance.showstop.label")}</div><div class="desc">${gt("settings.appearance.showstop.desc")}</div></div>
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
            <div style="font-size:16px; font-weight:800; color:var(--text); margin-bottom:4px;">Melo 0.3 Beta</div>
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
`;const dt=new URLSearchParams(location.search).get("panel");dt&&(document.documentElement.classList.add("panel-window",`panel-${dt}`),document.body.classList.add("panel-window",`panel-${dt}`));var Ae,Ce;if(ut&&dt){Q(async()=>{const{getCurrentWindow:a}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:a}},__vite__mapDeps([8,7,1,0])).then(({getCurrentWindow:a})=>{const n=a();ca(n,"melo-geo-panel-"+dt),n.onCloseRequested(()=>{J("melo:panel-closed",dt)}),window.addEventListener("beforeunload",()=>{J("melo:panel-closed",dt)})});const t=document.getElementById("win-"+dt),e=((Ae=t==null?void 0:t.querySelector(".float-title"))==null?void 0:Ae.innerHTML)||"",i=((Ce=t==null?void 0:t.querySelector(".float-body"))==null?void 0:Ce.innerHTML)||"";Ne.innerHTML=`
<div class="panel-root">
  <div class="panel-titlebar" data-tauri-drag-region>
    <div class="panel-title" data-tauri-drag-region>${e}</div>
    <div class="win-controls">
      <button class="win-btn" aria-label="minimize" title="Minimize">—</button>
      <button class="win-btn" aria-label="maximize" title="Maximize / Restore">□</button>
      <button class="win-btn close" aria-label="close" title="Close">×</button>
    </div>
  </div>
  <div class="panel-body">${i}</div>
  <div id="toast" class="toast"></div>
</div>`}ut&&!dt&&(document.documentElement.classList.add("tauri-main"),document.body.classList.add("tauri-main"),document.querySelectorAll(".side-actions .sbtn").forEach(t=>t.classList.remove("active")),Q(async()=>{const{WebviewWindow:t}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:t}},__vite__mapDeps([6,7,1,0,8])).then(({WebviewWindow:t})=>{const e=async()=>{var i;for(const a of["library","playlist","equalizer","lyrics","settings"])try{const n=await t.getByLabel("panel-"+a);(i=document.getElementById(ue[a]))==null||i.classList.toggle("active",!!n)}catch{}};e(),setInterval(e,1200)}));ut&&!dt&&(Q(()=>import("./window-BWd3Cypy.js"),__vite__mapDeps([8,7,1,0])).then(async({getCurrentWindow:t})=>{const e=t(),i=()=>{const n=localStorage.getItem("melo-active-skin-id"),l=n==="compact-pill"||typeof n=="string"&&n.startsWith("compact-pill");return{w:l?780:960,h:l?138:240}};try{const n=JSON.parse(localStorage.getItem("melo-geo-main")||"null"),{LogicalPosition:l,LogicalSize:c}=await Q(async()=>{const{LogicalPosition:m,LogicalSize:w}=await import("./dpi-fvP-W2qr.js");return{LogicalPosition:m,LogicalSize:w}},__vite__mapDeps([7,1])),h=i(),d=h.w===780,s=d?h.w:n!=null&&n.w?Math.max(650,n.w):h.w;await e.setSize(new c(s,h.h)),await e.setResizable(!d),(n==null?void 0:n.x)!=null&&(n==null?void 0:n.y)!=null&&await e.setPosition(new l(n.x,n.y))}catch{}const a=async()=>{try{const n=await e.outerPosition(),l=await e.innerSize(),c=i();localStorage.setItem("melo-geo-main",JSON.stringify({x:n.x,y:n.y,w:l.width,h:c.h}))}catch{}};e.onMoved(a),e.onResized(async()=>{try{const n=await e.innerSize(),l=i(),c=l.w===780,{LogicalSize:h}=await Q(async()=>{const{LogicalSize:d}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:d}},__vite__mapDeps([7,1]));if(!c){const d=n.toLogical(await e.scaleFactor());(d.width<650||d.height!==l.h)&&await e.setSize(new h(Math.max(650,d.width),l.h))}}catch{}a()}),ot("melo:skin-changed",async n=>{try{!dt&&n&&await Ht(n,qt,void 0,!1);const l=n==="compact-pill"||typeof n=="string"&&n.startsWith("compact-pill"),c=l?780:960,h=l?138:240,{LogicalSize:d}=await Q(async()=>{const{LogicalSize:s}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:s}},__vite__mapDeps([7,1]));await e.setSize(new d(c,h)),await e.setResizable(!l),a()}catch{}}),e.onCloseRequested(async n=>{if(n.preventDefault(),localStorage.getItem("melo-pref-tray")!=="0")try{await e.hide();return}catch{}const{WebviewWindow:c}=await Q(async()=>{const{WebviewWindow:h}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:h}},__vite__mapDeps([6,7,1,0,8]));for(const h of["library","playlist","equalizer","lyrics","settings"])try{const d=await c.getByLabel("panel-"+h);d&&await d.close()}catch{}try{await e.destroy()}catch{window.close()}})}),Q(()=>import("./core-DhEqZVGG.js"),[]).then(async({invoke:t})=>{try{const e=await t("get_cli_tracks");if(Array.isArray(e)&&e.length>0){const i=window.LumiLibrary,a=window.LumiPlayer;e.forEach(n=>n.source="import"),i==null||i.addToCurrentPlaylist(e),e.forEach(n=>a==null?void 0:a.queue.push(n)),setTimeout(()=>{if(a&&a.queue.length>0){const n=a.queue.findIndex(l=>l.id===e[0].id);a.loadTrack(n>=0?n:0,!0)}},150)}}catch{}}),ot("melo:open-files",t=>{if(Array.isArray(t)&&t.length>0){const e=window.LumiLibrary,i=window.LumiPlayer;t.forEach(a=>a.source="import"),e==null||e.addToCurrentPlaylist(t),t.forEach(a=>i==null?void 0:i.queue.push(a)),pt(`Playing ${t[0].title}`),setTimeout(()=>{if(i&&i.queue.length>0){const a=i.queue.findIndex(n=>n.id===t[0].id);i.loadTrack(a>=0?a:0,!0)}},150)}}));document.addEventListener("contextmenu",t=>{t.preventDefault()});const te=document.getElementById("toast"),pt=t=>{te&&(te.textContent=t,te.classList.add("show"),setTimeout(()=>te.classList.remove("show"),2200))},Ct=new Audio;Ct.preload="metadata";Ct.crossOrigin="anonymous";window.__LUMI_AUDIO__=Ct;window.__TOAST__=pt;let qt=localStorage.getItem("lumi-theme")||"dark";function ne(t){document.documentElement.setAttribute("data-theme",t),localStorage.setItem("lumi-theme",t),qt=t}function Ve(t){ne(t),J("melo:theme",t)}ne(qt);ot("melo:theme",t=>{(t==="light"||t==="dark")&&ne(t)});setInterval(()=>{const t=localStorage.getItem("lumi-theme");(t==="light"||t==="dark")&&t!==qt&&ne(t)},1e3);document.body.classList.toggle("show-stop-btn",localStorage.getItem("melo-pref-showStopBtn")==="1");ot("melo:pref-changed",t=>{t&&t.key==="showStopBtn"&&document.body.classList.toggle("show-stop-btn",!!t.value)});const ra=["win-library","win-playlist","win-equalizer","win-lyrics","win-settings"],ie=document.getElementById("desktop"),Fe={btnToggleLibrary:"win-library",btnTogglePlaylist:"win-playlist",btnToggleEq:"win-equalizer",btnToggleLyrics:"win-lyrics",btnOpenSettings:"win-settings",menuToggleLibrary:"win-library",menuTogglePlaylist:"win-playlist",menuToggleEq:"win-equalizer",menuToggleLyrics:"win-lyrics",menuToggleSettings:"win-settings"};function sa(t){const e=document.getElementById(t);return!!e&&!e.classList.contains("hidden")}const ue={library:"btnToggleLibrary",playlist:"btnTogglePlaylist",equalizer:"btnToggleEq",lyrics:"btnToggleLyrics",settings:"btnOpenSettings"};async function ca(t,e){const i=async()=>{try{const a=await t.outerPosition(),n=await t.outerSize();localStorage.setItem(e,JSON.stringify({x:a.x,y:a.y,w:n.width,h:n.height}))}catch{}};t.onMoved(i),t.onResized(i)}async function da(t){const{WebviewWindow:e}=await Q(async()=>{const{WebviewWindow:m}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:m}},__vite__mapDeps([6,7,1,0,8])),i="panel-"+t,a=document.getElementById(ue[t]),n=await e.getByLabel(i);if(n){await n.close(),a==null||a.classList.remove("active");return}const l={library:[430,620],playlist:[440,560],equalizer:[700,440],lyrics:[380,520],settings:[600,540]},c={library:[360,400],playlist:[360,360],equalizer:[620,400],lyrics:[320,360],settings:[500,400]},h={library:"Library",playlist:"Playlist",equalizer:"Equalizer",lyrics:"Lyric",settings:"Settings"},d=l[t]||[420,520];let s=null;try{s=JSON.parse(localStorage.getItem("melo-geo-panel-"+t)||"null")}catch{}new e(i,{url:`/?panel=${t}`,title:h[t]||t,width:(s==null?void 0:s.w)||d[0],height:(s==null?void 0:s.h)||d[1],minWidth:(c[t]||[360,360])[0],minHeight:(c[t]||[360,360])[1],...(s==null?void 0:s.x)!=null?{x:s.x,y:s.y}:{center:!0},decorations:!1,transparent:!0,shadow:!1,skipTaskbar:!0}),a==null||a.classList.add("active")}ot("melo:panel-closed",t=>{var i;const e=ue[t];e&&((i=document.getElementById(e))==null||i.classList.remove("active"))});function me(t){if(ut){da(t.replace(/^win-/,""));return}const e=sa(t);Zt(t,!e),e||oe(document.getElementById(t))}function pa(t){if(t.classList.contains("hidden")||!ie||window.matchMedia("(max-width: 860px)").matches)return;const e=ie.getBoundingClientRect();if(e.width<=0||e.height<=0)return;const i=t.getBoundingClientRect(),a=Math.min(i.width,e.width),n=Math.min(i.height,e.height);let l=i.left-e.left,c=i.top-e.top;l=Math.max(0,Math.min(e.width-a,l)),c=Math.max(0,Math.min(e.height-n,c)),t.style.left=l+"px",t.style.top=c+"px",t.style.right="auto",t.style.bottom="auto",t.style.transform="none"}function Zt(t,e){var n,l,c,h,d,s,m,w,S,C;const i=document.getElementById(t);if(!i)return;i.classList.toggle("hidden",!e),localStorage.setItem("lumiv2-"+t,e?"1":"0"),e&&pa(i);const a=e;t==="win-library"&&((n=document.getElementById("btnToggleLibrary"))==null||n.classList.toggle("active",a),(l=document.getElementById("menuToggleLibrary"))==null||l.classList.toggle("active",a)),t==="win-playlist"&&((c=document.getElementById("btnTogglePlaylist"))==null||c.classList.toggle("active",a),(h=document.getElementById("menuTogglePlaylist"))==null||h.classList.toggle("active",a)),t==="win-equalizer"&&((d=document.getElementById("btnToggleEq"))==null||d.classList.toggle("active",a),(s=document.getElementById("menuToggleEq"))==null||s.classList.toggle("active",a)),t==="win-lyrics"&&((m=document.getElementById("btnToggleLyrics"))==null||m.classList.toggle("active",a),(w=document.getElementById("menuToggleLyrics"))==null||w.classList.toggle("active",a)),t==="win-settings"&&((S=document.getElementById("btnOpenSettings"))==null||S.classList.toggle("active",a),(C=document.getElementById("menuToggleSettings"))==null||C.classList.toggle("active",a))}dt||ra.forEach(t=>{const e=localStorage.getItem("lumiv2-"+t);e!==null?Zt(t,e==="1"):t==="win-settings"?Zt(t,!1):Zt(t,!0)});Object.entries(Fe).forEach(([t,e])=>{var i;(i=document.getElementById(t))==null||i.addEventListener("click",()=>me(e))});document.querySelectorAll("[data-close]").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.close;Zt(e,!1)})});let Et=null,Bt=null,Ie=10;function oe(t){Ie++,t.style.zIndex=String(Ie),document.querySelectorAll(".float-win").forEach(e=>e.classList.remove("active")),t.classList.add("active")}document.querySelectorAll(".float-win").forEach(t=>{t.addEventListener("mousedown",()=>oe(t))});document.querySelectorAll("[data-drag]").forEach(t=>{t.addEventListener("mousedown",e=>{if(e.target.closest("button")||e.target.closest("input")||e.target.closest("select"))return;const i=t.dataset.drag,a=document.getElementById(i);oe(a),a.classList.add("dragging");const n=a.getBoundingClientRect();Et={id:i,startX:e.clientX,startY:e.clientY,initX:n.left,initY:n.top,width:n.width,height:n.height}})});document.querySelectorAll("[data-resize]").forEach(t=>{t.addEventListener("mousedown",e=>{e.stopPropagation();const i=t.dataset.resize,a=document.getElementById(i);oe(a),a.classList.add("resizing");const n=a.getBoundingClientRect();Bt={id:i,startX:e.clientX,startY:e.clientY,initW:n.width,initH:n.height}})});window.addEventListener("mousemove",t=>{if(Et){const e=document.getElementById(Et.id);let i=t.clientX-Et.startX,a=t.clientY-Et.startY,n=Et.initX+i,l=Et.initY+a;if(ie&&!window.matchMedia("(max-width: 860px)").matches){const c=ie.getBoundingClientRect(),h=c.left,d=c.right-Et.width,s=c.top,m=c.bottom-Et.height;n=Math.max(h,Math.min(d,n))-c.left,l=Math.max(s,Math.min(m,l))-c.top}e.style.left=n+"px",e.style.top=l+"px",e.style.right="auto",e.style.bottom="auto",e.style.transform="none"}if(Bt){const e=document.getElementById(Bt.id);let i=Bt.initW+(t.clientX-Bt.startX),a=Bt.initH+(t.clientY-Bt.startY);i=Math.max(260,i),a=Math.max(160,a),e.style.width=i+"px",e.style.height=a+"px"}});window.addEventListener("mouseup",()=>{if(Et){const t=document.getElementById(Et.id);t&&(t.classList.remove("dragging"),localStorage.setItem("lumiv2-pos-"+Et.id,JSON.stringify({left:t.style.left,top:t.style.top}))),Et=null}if(Bt){const t=document.getElementById(Bt.id);t&&(t.classList.remove("resizing"),localStorage.setItem("lumiv2-size-"+Bt.id,JSON.stringify({width:t.style.width,height:t.style.height}))),Bt=null}});async function We(){const t=window.LumiLibrary,e=window.LumiPlayer;if(ut){try{const{open:a}=await Q(async()=>{const{open:d}=await import("./index-CS3Qnt9j.js");return{open:d}},__vite__mapDeps([5,1])),n=await a({multiple:!0,filters:[{name:"Audio",extensions:["mp3","flac","wav","aac","ogg","m4a","alac","opus","wma","aiff"]}]});if(!n)return;const l=Array.isArray(n)?n:[n],{invoke:c}=await Q(async()=>{const{invoke:d}=await import("./core-DhEqZVGG.js");return{invoke:d}},[]),h=[];for(const d of l)try{const s=await c("scan_library",{path:d});if(s&&s.length)s.forEach(m=>m.source="import"),h.push(...s);else{const m=d.replace(/^.*[\\/]/,""),w=m.lastIndexOf("."),S=w>0?m.slice(0,w):m,C=w>0?m.slice(w+1).toUpperCase():"AUDIO";h.push({id:d,title:S,artist:"Unknown Artist",album:"Single",duration:0,path:d,codec:C,specs:"Local File",source:"import"})}}catch{const s=d.replace(/^.*[\\/]/,""),m=s.lastIndexOf("."),w=m>0?s.slice(0,m):s,S=m>0?s.slice(m+1).toUpperCase():"AUDIO";h.push({id:d,title:w,artist:"Unknown Artist",album:"Single",duration:0,path:d,codec:S,specs:"Local File",source:"import"})}t==null||t.addTracks(h,!0),t==null||t.addToCurrentPlaylist(h),h.forEach(d=>e==null?void 0:e.queue.push(d)),J("melo:play-tracks",{tracks:h,index:0}),pt(`${h.length} file(s) added`)}catch{pt("Error opening files")}return}const i=document.createElement("input");i.type="file",i.multiple=!0,i.accept="audio/*,.mp3,.flac,.wav,.aac,.ogg,.m4a,.alac,.opus,.wma,.aiff",i.onchange=async()=>{const a=Array.from(i.files||[]);if(!a.length)return;const n=[];for(const l of a){const c=l.path,h=c||URL.createObjectURL(l),d=l.name,s=d.lastIndexOf("."),m=s>0?d.slice(0,s):d,w=s>0?d.slice(s+1).toUpperCase():"AUDIO",S={id:c||"imp_"+Math.random().toString(36).slice(2,9),title:m,artist:"Unknown Artist",album:"Single",duration:0,path:h,codec:w,specs:"Local File",source:"import"};await Xt(l,S),n.push(S)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(l=>e==null?void 0:e.queue.push(l)),J("melo:play-tracks",{tracks:n,index:0}),pt(`${n.length} file(s) added`)},i.click()}async function je(){const t=window.LumiLibrary,e=window.LumiPlayer;if(ut){try{const{open:a}=await Q(async()=>{const{open:s}=await import("./index-CS3Qnt9j.js");return{open:s}},__vite__mapDeps([5,1])),n=await a({directory:!0});if(!n)return;const l=n,{invoke:c}=await Q(async()=>{const{invoke:s}=await import("./core-DhEqZVGG.js");return{invoke:s}},[]),d=(await c("scan_library",{path:l})).map(s=>({...s,source:"import"}));t==null||t.addTracks(d,!0),t==null||t.addToCurrentPlaylist(d),d.forEach(s=>e==null?void 0:e.queue.push(s)),J("melo:play-tracks",{tracks:d,index:0}),pt(`${d.length} track(s) added from folder`)}catch{pt("Error scanning folder")}return}const i=document.createElement("input");i.type="file",i.webkitdirectory=!0,i.multiple=!0,i.accept="audio/*",i.onchange=async()=>{const a=Array.from(i.files||[]).filter(l=>/\.(mp3|flac|wav|aac|ogg|m4a|alac|opus|wma|aiff)$/i.test(l.name));if(!a.length)return;const n=[];for(const l of a){const c=l.path,h=c||URL.createObjectURL(l),d=l.name,s=d.lastIndexOf("."),m=s>0?d.slice(0,s):d,w=s>0?d.slice(s+1).toUpperCase():"AUDIO",S={id:c||"imp_"+Math.random().toString(36).slice(2,9),title:m,artist:"Unknown Artist",album:"Folder Import",duration:0,path:h,codec:w,specs:"Local File",source:"import"};await Xt(l,S),n.push(S)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(l=>e==null?void 0:e.queue.push(l)),J("melo:play-tracks",{tracks:n,index:0}),pt(`${n.length} file(s) added from folder`)},i.click()}document.addEventListener("click",t=>{var i;const e=(i=t.target)==null?void 0:i.closest("#btnAddFiles, #btnAddFolder, #btnThemeToggle");e&&(e.id==="btnAddFiles"?We():e.id==="btnAddFolder"?je():e.id==="btnThemeToggle"&&Ve(qt==="light"?"dark":"light"))});window.addEventListener("keydown",t=>{(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="o"&&(t.shiftKey?(t.preventDefault(),je()):(t.preventDefault(),We())),((t.ctrlKey||t.metaKey)&&t.key===","||t.key==="F2")&&(t.preventDefault(),me("win-settings"))});function Te(t){var S,C;function e(I){document.querySelectorAll(".settings-tab").forEach(y=>{y.classList.toggle("active",y.dataset.stab===I)}),document.querySelectorAll(".settings-section[data-panel]").forEach(y=>{y.classList.toggle("active",y.dataset.panel===I)}),localStorage.setItem("melo-settings-tab",I)}document.querySelectorAll(".settings-tab").forEach(I=>{I.addEventListener("click",()=>e(I.dataset.stab))}),e(localStorage.getItem("melo-settings-tab")||"general"),document.querySelectorAll(".switch[data-key]").forEach(I=>{const y=I.dataset.key,F=localStorage.getItem("melo-pref-"+y);F!==null&&I.classList.toggle("on",F==="1"),I.onclick=()=>{I.classList.toggle("on");const O=I.classList.contains("on");localStorage.setItem("melo-pref-"+y,O?"1":"0"),J("melo:pref-changed",{key:y,value:O})}});const i=document.getElementById("setLanguage");i&&(i.value=la(),i.onchange=async()=>{await He(i.value),t(`Language set to ${i.options[i.selectedIndex].text} — restart Melo to fully apply`)});const a=document.getElementById("swDynamicTheme");if(a){const I=localStorage.getItem("melo-dynamic-theme")!=="0";a.classList.toggle("on",I),a.onclick=()=>{var tt,rt;const y=!a.classList.contains("on");a.classList.toggle("on",y),localStorage.setItem("melo-dynamic-theme",y?"1":"0");const F=window.__LUMI_QUEUE__,O=(rt=(tt=window.LumiPlayer)==null?void 0:tt.currentIndex)!=null?rt:0;F&&F[O]&&Be(y?F[O].cover:null)}}const n=document.getElementById("skinSelect"),l=document.getElementById("btnSkinThemeToggle"),c=document.getElementById("btnRefreshSkins"),h=document.getElementById("btnOpenSkinsFolder"),d=document.getElementById("skinThemeIcon"),s=document.getElementById("skinThemeLabel");function m(I){d&&(d.textContent=I==="dark"?"🌙":"☀️"),s&&(s.textContent=I==="dark"?"Dark":"Light")}m(qt),l==null||l.addEventListener("click",()=>{const I=qt==="dark"?"light":"dark";Ve(I),m(I),t(I==="dark"?"Dark theme":"Light theme")}),ot("melo:theme",I=>{(I==="light"||I==="dark")&&m(I)});async function w(){if(!n)return;const I=localStorage.getItem("melo-active-skin-id")||"default",y=await ze();n.innerHTML=`
      <option value="default">Default Melo (Standard)</option>
      <option value="compact-pill">Minimal Compact (Pill Bar)</option>
    `,y.forEach(F=>{if(F.filename!=="compact-pill-light.html"&&F.filename!=="compact-pill-dark.html"){const O=document.createElement("option");O.value=F.filename,O.textContent=`${F.name} (${F.filename})`,n.appendChild(O)}}),n.value=I}w(),n&&(n.onchange=()=>{const I=n.value;Ht(I,qt,t)}),c==null||c.addEventListener("click",async()=>{await w();const I=localStorage.getItem("melo-active-skin-id")||"default";Ht(I,qt,t),t("Skins reloaded from disk")}),h==null||h.addEventListener("click",()=>{$e(t)}),(S=document.getElementById("btn-reset-skin-settings"))==null||S.addEventListener("click",()=>{de(t),n&&(n.value="default")}),(C=document.getElementById("btn-settings-reset"))==null||C.addEventListener("click",()=>{localStorage.clear(),t("Settings reset — reloading..."),setTimeout(()=>location.reload(),600)})}function Ge(){document.querySelectorAll(".win-btn").forEach(t=>{t.onclick=async()=>{const e=t.getAttribute("aria-label");if(window.__TAURI__){const{getCurrentWindow:i}=await Q(async()=>{const{getCurrentWindow:n}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:n}},__vite__mapDeps([8,7,1,0])),a=i();e==="minimize"?a.minimize():e==="maximize"?a.toggleMaximize():e==="close"&&a.close()}else e==="close"&&pt("Window close requires the Tauri desktop build"),e==="maximize"&&pt("Resize: drag corner handle")}})}Ge();window.__LUMI_REBIND_MAIN__=()=>{Ge(),Object.entries(Fe).forEach(([t,e])=>{const i=document.getElementById(t);i&&(i.onclick=()=>me(e))})};const Wt=document.createElement("div");Wt.id="scanBar";document.body.appendChild(Wt);let _e=0;ot("melo:scan-progress",t=>{if(!t)return;const e=t.total?Math.round(t.done/t.total*100):100;Wt.style.opacity="1",Wt.style.width=e+"%",clearTimeout(_e),(t.finished||t.total&&t.done>=t.total)&&(_e=setTimeout(()=>{Wt.style.opacity="0",Wt.style.width="0"},800))});ut&&!dt&&ot("melo:scan-batch",t=>{const e=window.LumiLibrary;e&&Array.isArray(t)&&t.length&&(t.forEach(i=>i.source="scan"),e.addTracks(t,!0),e.addToCurrentPlaylist(t))});const Vt=document.createElement("div");Vt.id="aboutPop";Vt.style.display="none";document.body.appendChild(Vt);document.addEventListener("click",t=>{var e,i;(e=t.target)!=null&&e.closest("#btnAbout")&&(t.stopPropagation(),Vt.innerHTML=`
    <div class="about-head">Melo <b>0.3 Beta</b></div>
    <div style="font-size:11.5px; color:var(--text-soft); margin:6px 0 10px;">
      Modern Windows Music Player<br/>
      Tauri 2 + TypeScript + Rust
    </div>
    <a class="about-link" id="aboutLink" href="https://github.com/Arvanta/Melo" rel="noopener">github.com/Arvanta/Melo ↗</a>`,Vt.style.display=Vt.style.display==="none"?"block":"none",(i=document.getElementById("aboutLink"))==null||i.addEventListener("click",a=>{a.preventDefault();const n="https://github.com/Arvanta/Melo";ut?Q(()=>import("./core-DhEqZVGG.js"),[]).then(l=>l.invoke("open_url",{url:n})).catch(()=>window.open(n,"_blank")):window.open(n,"_blank")}))});document.addEventListener("click",t=>{!t.target.closest("#aboutPop")&&!t.target.closest("#btnAbout")&&(Vt.style.display="none")});ut&&dt?dt==="library"||dt==="playlist"?we(Ct,pt):dt==="equalizer"?xe(Ct,pt,{remote:!0}):dt==="lyrics"?Ee(Ct):dt==="settings"&&(Me(),Te(pt)):(ta(Ct,pt),we(Ct,pt),xe(Ct,pt),ea(Ct),Ee(Ct),ia(pt),Te(pt),Me(),setTimeout(()=>{if(localStorage.getItem("melo-pref-resume")!=="0")try{const t=JSON.parse(localStorage.getItem("melo-resume-state")||"null"),e=window.LumiLibrary,i=window.LumiPlayer;if(!(t!=null&&t.trackId)||!e||!i)return;const a=e.tracks,n=a.findIndex(l=>l.id===t.trackId);if(n===-1)return;i.queue=a,i.loadTrack(n,!1,t.position||0)}catch{}},400));
//# sourceMappingURL=index-BosPvxwx.js.map
