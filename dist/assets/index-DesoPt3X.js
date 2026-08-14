const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/event-CNdo2oXa.js","assets/core-DhEqZVGG.js","assets/index-DiyoAAdc.js","assets/index-CHth0gh2.js","assets/index-Bq0iOnRE.js","assets/index-CS3Qnt9j.js","assets/webviewWindow-mjQkSB26.js","assets/dpi-fvP-W2qr.js","assets/window-BWd3Cypy.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function i(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=i(n);fetch(n.href,r)}})();const Je="modulepreload",Xe=function(t){return"/"+t},ye={},Y=function(e,i,a){let n=Promise.resolve();if(i&&i.length>0){let c=function(s){return Promise.all(s.map(g=>Promise.resolve(g).then(b=>({status:"fulfilled",value:b}),b=>({status:"rejected",reason:b}))))};document.getElementsByTagName("link");const m=document.querySelector("meta[property=csp-nonce]"),d=(m==null?void 0:m.nonce)||(m==null?void 0:m.getAttribute("nonce"));n=c(i.map(s=>{if(s=Xe(s),s in ye)return;ye[s]=!0;const g=s.endsWith(".css"),b=g?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${b}`))return;const k=document.createElement("link");if(k.rel=g?"stylesheet":Je,g||(k.as="script"),k.crossOrigin="",k.href=s,d&&k.setAttribute("nonce",d),document.head.appendChild(k),g)return new Promise((I,S)=>{k.addEventListener("load",I),k.addEventListener("error",()=>S(new Error(`Unable to preload CSS for ${s}`)))})}))}function r(c){const m=new Event("vite:preloadError",{cancelable:!0});if(m.payload=c,window.dispatchEvent(m),!m.defaultPrevented)throw c}return n.then(c=>{for(const m of c||[])m.status==="rejected"&&r(m.reason);return e().catch(r)})},mt=typeof window.__TAURI_INTERNALS__<"u"||typeof window.__TAURI__<"u";async function W(t,e){if(mt)try{const{emit:i}=await Y(async()=>{const{emit:a}=await import("./event-CNdo2oXa.js");return{emit:a}},__vite__mapDeps([0,1]));await i(t,e);return}catch{}window.dispatchEvent(new CustomEvent(t,{detail:e}))}function ot(t,e){mt&&Y(async()=>{const{listen:i}=await import("./event-CNdo2oXa.js");return{listen:i}},__vite__mapDeps([0,1])).then(({listen:i})=>{i(t,a=>{e(a.payload)})}).catch(()=>{}),window.addEventListener(t,i=>e(i.detail))}let be=!1;async function Ze(){if(!be){be=!0;try{const t=globalThis;if(typeof t.Buffer>"u"){const e=await Y(()=>import("./index-DiyoAAdc.js").then(i=>i.i),__vite__mapDeps([2,3]));t.Buffer=e.Buffer}typeof t.process>"u"&&(t.process={env:{},browser:!0,nextTick:e=>setTimeout(e,0)})}catch{}}}async function Qe(t,e){var i;try{await Ze();const a=await Y(()=>import("./index-Bq0iOnRE.js").then(s=>s.i),__vite__mapDeps([4,3])),n=a&&typeof a.parseBlob=="function"?a:a.default||a,r=await Promise.race([n.parseBlob(t),new Promise((s,g)=>setTimeout(()=>g(new Error("timeout")),1800))]),c=r==null?void 0:r.common;if(!c)return;c.title&&(e.title=c.title),c.artist?e.artist=c.artist:c.artists&&c.artists[0]&&(e.artist=c.artists[0]),c.album&&(e.album=c.album),c.genre&&c.genre[0]&&(e.genre=c.genre[0]),c.year&&(e.year=c.year);const m=(i=c.picture)==null?void 0:i[0];if(m&&m.data){const s=m.format||"image/jpeg",g=m.data;if(g.length>6e5)return;let b="";const k=8192;for(let I=0;I<g.length;I+=k){const S=g.subarray(I,I+k);b+=String.fromCharCode.apply(null,S)}e.cover=`data:${s};base64,${btoa(b)}`}const d=r==null?void 0:r.format;d&&d.duration&&!e.duration&&(e.duration=Math.floor(d.duration))}catch{}}async function Jt(t,e,i=1800){return await Qe(t,e),e}async function Ke(t){return new Promise(e=>{if(!t)return e(null);const i=new Image;i.crossOrigin="anonymous",i.onload=()=>{try{const a=document.createElement("canvas"),n=a.getContext("2d");if(!n)return e(null);a.width=40,a.height=40,n.drawImage(i,0,0,40,40);const r=n.getImageData(0,0,40,40).data;let c={r:42,g:123,b:214},m=-1;for(let d=0;d<r.length;d+=4){const s=r[d],g=r[d+1],b=r[d+2];if(r[d+3]<128)continue;const I=Math.max(s,g,b),S=Math.min(s,g,b),v=(I+S)/510,H=I-S,$=H===0?0:H/(1-Math.abs(2*v-1));if($>.25&&v>.25&&v<.82){const Q=$*1.5+(1-Math.abs(v-.5));Q>m&&(m=Q,c={r:s,g,b})}}m>0?e(c):e(null)}catch{e(null)}},i.onerror=()=>e(null),i.src=t})}async function Be(t){const e=localStorage.getItem("melo-dynamic-theme")!=="0",i=document.documentElement;if(!e||!t){i.style.removeProperty("--accent"),i.style.removeProperty("--visualizer"),i.style.removeProperty("--accent-glow");return}const a=await Ke(t);if(a){const n=`rgb(${a.r}, ${a.g}, ${a.b})`;i.style.setProperty("--accent",n),i.style.setProperty("--visualizer",n),i.style.setProperty("--accent-glow",`rgba(${a.r}, ${a.g}, ${a.b}, 0.35)`)}else i.style.removeProperty("--accent"),i.style.removeProperty("--visualizer"),i.style.removeProperty("--accent-glow")}const Gt=[31,62,125,250,500,1e3,2e3,4e3,8e3,16e3];let It=null,re=null,le=[],Wt=null,Vt=null;function te(t){if(!It){const e=window.AudioContext||window.webkitAudioContext;It=new e;try{re=It.createMediaElementSource(t)}catch{}if(le=Gt.map(i=>{const a=It.createBiquadFilter();return a.type="peaking",a.frequency.value=i,a.Q.value=1.4,a.gain.value=0,a}),Wt=It.createGain(),Wt.gain.value=1,Vt=It.createAnalyser(),Vt.fftSize=2048,Vt.smoothingTimeConstant=.72,re){let i=re;for(const a of le)i.connect(a),i=a;i.connect(Wt),Wt.connect(Vt),Vt.connect(It.destination)}}return{ctx:It,filters:le,gain:Wt,analyser:Vt,async resume(){It&&It.state==="suspended"&&await It.resume().catch(()=>{})}}}function ta(t,e){let i,a,n,r,c,m,d,s=null,g,b,k,I,S,v,H,$,Q,rt,lt,j,f=[],M=0,C=!1,J="off",dt=!1;function yt(){if(!f.length)return null;if(J==="one")return M;let l=M+1;if(C&&(l=Math.floor(Math.random()*f.length),l===M&&f.length>1&&(l=(l+1)%f.length)),l>=f.length)if(J==="all")l=0;else return null;return l}window.__LUMI_QUEUE__=f,window.__LUMI_SET_QUEUE__=l=>{f=l,window.__LUMI_QUEUE__=l};function vt(l){if(!isFinite(l))return"0:00";const T=Math.floor(l/60),tt=Math.floor(l%60).toString().padStart(2,"0");return`${T}:${tt}`}function at(){if(!g)return;const l=parseFloat(g.max)||100,T=parseFloat(g.value)||0,tt=l>0?T/l*100:0;g.style.setProperty("--progress",tt+"%")}function it(){b&&b.style.setProperty("--vol",b.value+"%")}async function ut(l){if(!l)return"";if(/^(https?|data|blob):/.test(l))return l;if(mt)try{const{convertFileSrc:T}=await Y(async()=>{const{convertFileSrc:tt}=await import("./core-DhEqZVGG.js");return{convertFileSrc:tt}},[]);return T(l)}catch{}return l}async function Lt(l,T=!0,tt){if(!f.length)return;l<0&&(l=f.length-1),l>=f.length&&(l=0),M=l;const _=f[l];if(_){if(v||V(),t.src=await ut(_.path),t.load(),tt&&tt>0){const st=()=>{t.removeEventListener("loadedmetadata",st);try{t.currentTime=tt}catch{}};t.addEventListener("loadedmetadata",st)}v&&(v.textContent=_.title||"Unknown Title"),H&&(H.textContent=_.artist||"Unknown Artist"),$&&($.textContent=_.album||""),Q&&(Q.textContent=_.codec||"AUDIO"),rt&&(rt.textContent=_.specs||""),_.cover&&lt?(lt.src=_.cover,lt.style.display="block",j&&(j.style.display="none")):(lt&&(lt.style.display="none"),j&&(j.style.display="grid")),g&&(g.max=String(_.duration||240),g.value="0",at()),I&&(I.textContent=vt(_.duration)),k&&(k.textContent="0:00"),U(),Be(_.cover||null),document.querySelectorAll(".track-row").forEach((st,gt)=>{var X;st.classList.toggle("active",((X=f[gt])==null?void 0:X.id)===_.id)}),"mediaSession"in navigator&&(navigator.mediaSession.metadata=new MediaMetadata({title:_.title,artist:_.artist,album:_.album,artwork:_.cover?[{src:_.cover,sizes:"512x512",type:"image/jpeg"}]:[]}),navigator.mediaSession.setActionHandler("play",()=>Ct()),navigator.mediaSession.setActionHandler("pause",()=>$t()),navigator.mediaSession.setActionHandler("previoustrack",()=>P()),navigator.mediaSession.setActionHandler("nexttrack",()=>z()),navigator.mediaSession.setActionHandler("seekto",st=>{st.seekTime&&(t.currentTime=st.seekTime)})),T&&Ct();try{const{cover:st,...gt}=_;localStorage.setItem("melo-current-track",JSON.stringify(gt))}catch{}window.dispatchEvent(new CustomEvent("lumi:trackChange",{detail:_})),W("melo:track-changed",_),W("melo:playback-state",{track:_,currentTime:t.currentTime||0,paused:t.paused})}}let xt=!1;async function At(){try{await te(t).resume()}catch{}xt&&(xt=!1,t.play().then(()=>{a&&(a.style.display="none"),n&&(n.style.display="block")}).catch(()=>{}))}window.addEventListener("pointerdown",At),window.addEventListener("keydown",At),ot("melo:pref-changed",l=>{l&&l.key==="replayGainGlobal"&&U(),l&&l.key==="showStopBtn"&&K(!!l.value)}),ot("melo:request-playback-state",()=>{const l=f[M]||null;W("melo:playback-state",{track:l,currentTime:t.currentTime||0,paused:t.paused})}),ot("melo:seek-playback",l=>{const T=Number(l);Number.isFinite(T)&&T>=0&&(t.currentTime=T)});let St=null,kt=!1;function Rt(l,T,tt){St&&cancelAnimationFrame(St);const _=t.volume,st=performance.now(),gt=X=>{const Zt=Math.min(1,(X-st)/T);t.volume=_+(l-_)*Zt,Zt<1?St=requestAnimationFrame(gt):(St=null,tt==null||tt())};St=requestAnimationFrame(gt)}async function Ct(){try{await te(t).resume()}catch{}const l=localStorage.getItem("melo-pref-fadePause")==="1",T=R();l&&kt&&(t.volume=0),t.play().then(()=>{xt=!1,a&&(a.style.display="none"),n&&(n.style.display="block"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="playing"),l&&kt?(kt=!1,Rt(T,300)):t.volume=T}).catch(()=>{xt||(xt=!0,e("Click once inside player to begin audio playback"))})}function $t(){localStorage.getItem("melo-pref-fadePause")==="1"&&!t.paused?(kt=!0,Rt(0,300,()=>t.pause())):(kt=!1,t.pause()),a&&(a.style.display="block"),n&&(n.style.display="none"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused");const T=f[M];if(T)try{localStorage.setItem("melo-resume-state",JSON.stringify({trackId:T.id,position:t.currentTime}))}catch{}}function x(){t.paused?Ct():$t()}function w(){t.pause();try{t.currentTime=0}catch{}a&&(a.style.display="block"),n&&(n.style.display="none"),g&&(g.value="0",at()),k&&(k.textContent="0:00"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}function z(){if(!f.length)return;if(J==="one"){t.currentTime=0,Ct();return}const l=yt();if(l===null){$t();return}Lt(l)}function P(){if(!f.length)return;if(t.currentTime>3){t.currentTime=0;return}let l=M-1;C&&(l=Math.floor(Math.random()*f.length)),l<0&&(J==="all"?l=f.length-1:l=0),Lt(l)}function R(){var gt;const l=f[M];if(!b)return 1;const T=parseInt(b.value,10)/100,_=localStorage.getItem("melo-pref-replayGainGlobal")!=="0"&&(gt=l==null?void 0:l.replayGain)!=null?gt:0,st=Math.pow(10,_/20);return Math.min(1,Math.max(0,T*st))}function U(){!f[M]||!b||(t.volume=R())}function K(l=localStorage.getItem("melo-pref-showStopBtn")==="1"){const T=document.getElementById("btnStop");T&&T.style.setProperty("display",l?"inline-flex":"none","important")}function V(){if(i=document.getElementById("btnPlay"),a=document.getElementById("iconPlay"),n=document.getElementById("iconPause"),r=document.getElementById("btnPrev"),c=document.getElementById("btnNext"),m=document.getElementById("btnShuffle"),d=document.getElementById("btnRepeat"),s=document.getElementById("btnStop"),K(),g=document.getElementById("seekBar"),b=document.getElementById("volBar"),k=document.getElementById("curTime"),I=document.getElementById("durTime"),S=document.getElementById("volPct"),v=document.getElementById("trackTitle"),H=document.getElementById("trackArtist"),$=document.getElementById("trackAlbum"),Q=document.getElementById("trackCodec"),rt=document.getElementById("trackSpecs"),lt=document.getElementById("coverImg"),j=document.getElementById("coverFallback"),i&&(i.onclick=x),s&&(s.onclick=w),r&&(r.onclick=P),c&&(c.onclick=z),m&&(m.onclick=()=>{C=!C,m.classList.toggle("active",C),e(C?"Shuffle on":"Shuffle off")}),d&&(d.onclick=()=>{J=J==="off"?"all":J==="all"?"one":"off",d.classList.toggle("active",J!=="off");const l={off:"Repeat off",all:"Repeat all",one:"Repeat one"};e(l[J]),d.title=l[J]}),g&&(g.oninput=()=>{dt=!0,k&&(k.textContent=vt(parseFloat(g.value))),at()},g.onchange=()=>{t.currentTime=parseFloat(g.value),dt=!1}),b&&(b.oninput=()=>{it(),S&&(S.textContent=b.value+"%"),U()}),at(),it(),f[M]){const l=f[M];v&&(v.textContent=l.title||"Unknown Title"),H&&(H.textContent=l.artist||"Unknown Artist"),$&&($.textContent=l.album||""),Q&&(Q.textContent=l.codec||"AUDIO"),rt&&(rt.textContent=l.specs||""),l.cover&&lt&&(lt.src=l.cover,lt.style.display="block",j&&(j.style.display="none"))}}V(),t.addEventListener("timeupdate",()=>{W("melo:playback-position",t.currentTime||0),!dt&&g&&k&&(g.value=String(Math.floor(t.currentTime)),k.textContent=vt(t.currentTime),at()),Z()});let O=null;function Z(){O||(O=setTimeout(()=>{O=null;const l=f[M];if(!(!l||t.paused))try{localStorage.setItem("melo-resume-state",JSON.stringify({trackId:l.id,position:t.currentTime}))}catch{}},4e3))}t.addEventListener("loadedmetadata",()=>{var T;if(!g||!I)return;const l=Math.floor(t.duration||((T=f[M])==null?void 0:T.duration)||240);g.max=String(l),I.textContent=vt(l),at()}),t.addEventListener("ended",()=>{z()}),window.addEventListener("keydown",l=>{l.target.tagName!=="INPUT"&&(l.code==="Space"&&(l.preventDefault(),x()),l.code==="ArrowRight"&&(t.currentTime+=5),l.code==="ArrowLeft"&&(t.currentTime-=5),(l.key==="m"||l.key==="M")&&(t.muted=!t.muted,e(t.muted?"Muted":"Unmuted")),(l.key==="s"||l.key==="S")&&m&&m.click(),(l.key==="r"||l.key==="R")&&d&&d.click(),l.code==="ArrowUp"&&b&&(b.value=String(Math.min(100,parseInt(b.value,10)+5)),b.dispatchEvent(new Event("input"))),l.code==="ArrowDown"&&b&&(b.value=String(Math.max(0,parseInt(b.value,10)-5)),b.dispatchEvent(new Event("input"))))}),ot("melo:tray-action",l=>{l==="play_pause"?x():l==="next"?z():l==="prev"?P():l==="mute"&&(t.muted=!t.muted,e(t.muted?"Muted":"Unmuted"))}),window.LumiPlayer={get queue(){return f},set queue(l){f=l,window.__LUMI_QUEUE__=l},get currentIndex(){return M},loadTrack:Lt,play:Ct,pause:$t,stop:w,next:z,prev:P,get audio(){return t},rebind:V},window.__LUMI_REBIND__=V,ot("melo:play-tracks",l=>{if(!l||!Array.isArray(l.tracks)||!l.tracks.length)return;f=l.tracks,window.__LUMI_SET_QUEUE__(f);const T=Math.max(0,Math.min(l.index||0,f.length-1));Lt(T,!0)})}const Bt=mt,qt=new URLSearchParams(location.search).get("panel")||"main";let et=[],wt=[];try{const t=localStorage.getItem("melo-playlists");if(t){const e=JSON.parse(t);Array.isArray(e)&&e.length&&(wt=e)}}catch{}wt.length||(wt=[{id:"p1",name:"Favorites",tracks:[],createdAt:Date.now()}]);try{const t=localStorage.getItem("melo-tracks");if(t){const e=JSON.parse(t);Array.isArray(e)&&(et=e)}}catch{}function we(t,e){var ge,fe,he,ve;const i=document.getElementById("trackList");document.getElementById("playlistList");const a=document.getElementById("winPlaylistTracks"),n=document.getElementById("winPlaylistEmpty"),r=document.getElementById("playlistSelect"),c=document.getElementById("searchInput"),m=document.getElementById("libraryStats"),d=document.getElementById("btn-scan"),s=document.getElementById("btn-export-playlist"),g=document.getElementById("btn-clear-playlist"),b=document.getElementById("btn-new-playlist"),k=document.getElementById("queueList"),I=document.getElementById("tagEditor"),S=document.getElementById("tagTitle"),v=document.getElementById("tagArtist"),H=document.getElementById("tagAlbum"),$=document.getElementById("tagYear"),Q=document.getElementById("tagCover");let rt="",lt=localStorage.getItem("melo-currentPlaylist")||((ge=wt[0])==null?void 0:ge.id)||"",j="",f="artists",M=null,C=null,J=null,dt=null,yt=[];(fe=document.getElementById("libraryTabs"))==null||fe.querySelectorAll(".tab").forEach(o=>{o.addEventListener("click",()=>{document.querySelectorAll("#libraryTabs .tab").forEach(u=>u.classList.remove("active")),o.classList.add("active"),f=o.dataset.libtab,M=C=J=dt=null,X()})}),c==null||c.addEventListener("input",()=>{rt=c.value.toLowerCase(),X()}),X(),Dt();async function vt(o){const{invoke:u}=await Y(async()=>{const{invoke:A}=await import("./core-DhEqZVGG.js");return{invoke:A}},[]),{listen:h}=await Y(async()=>{const{listen:A}=await import("./event-CNdo2oXa.js");return{listen:A}},__vite__mapDeps([0,1]));let p=0,y=0,q=0;e("Scanning folder…");const D=await h("melo:scan-batch",A=>{const L=Array.isArray(A.payload)?A.payload:[];L.length&&(L.forEach(F=>F.source="scan"),q+=L.length,St(L,!1,!0),kt(L,!0),Qt())}),E=await h("melo:scan-progress",A=>{const L=A.payload||{};y=L.done||0,p=L.total||0,!L.finished&&p&&e(`Scanning… ${y}/${p} files`)});try{const A=await u("scan_library",{path:o});return D(),E(),Qt(),Bt&&W("melo:tracks-add",{src:qt,list:A.map(L=>({...L,source:"scan"}))}),e(`${q||A.length} track(s) added from folder`),q||A.length}catch(A){throw D(),E(),Qt(),A}}d==null||d.addEventListener("click",async()=>{if(window.__TAURI__)try{const{open:o}=await Y(async()=>{const{open:h}=await import("./index-CS3Qnt9j.js");return{open:h}},__vite__mapDeps([5,1])),u=await o({directory:!0,multiple:!1});u&&await vt(u)}catch{e("Scanning requires the Tauri build")}else{const o=document.createElement("input");o.type="file",o.multiple=!0,o.accept="audio/*",o.onchange=async()=>{var h;const u=Array.from(o.files||[]);for(const p of u){const y=URL.createObjectURL(p),q=Math.random().toString(36).slice(2),D=((h=p.name.split(".").pop())==null?void 0:h.toUpperCase())||"MP3",E={id:q,title:p.name.replace(/\.[^/.]+$/,""),artist:"Unknown",album:"Imported",genre:"Unknown",year:new Date().getFullYear(),duration:180,path:y,codec:D,specs:"Imported · Stereo",replayGain:0},A=new Audio(y);await new Promise(L=>{A.addEventListener("loadedmetadata",()=>{E.duration=Math.floor(A.duration)||180,L(null)},{once:!0}),A.load(),setTimeout(()=>L(null),1500)}),await Jt(p,E),et.push(E)}e(`${u.length} file(s) added`),X(),Dt()},o.click()}}),document.addEventListener("dragover",o=>{o.preventDefault()}),document.addEventListener("drop",async o=>{var h,p;if(o.preventDefault(),Bt)return;const u=Array.from(((h=o.dataTransfer)==null?void 0:h.files)||[]).filter(y=>y.type.startsWith("audio/")||/\.(mp3|flac|wav|ogg|aac|m4a|alac)$/i.test(y.name));if(u.length){for(const y of u){const q=URL.createObjectURL(y),D=Math.random().toString(36).slice(2),E=((p=y.name.split(".").pop())==null?void 0:p.toUpperCase())||"MP3",A={id:D,title:y.name.replace(/\.[^/.]+$/,""),artist:"Imported",album:"Drop",genre:"Unknown",year:new Date().getFullYear(),duration:200,path:q,codec:E,specs:"Drag & Drop"};await Jt(y,A);const L=new Audio(q);await new Promise(F=>{L.addEventListener("loadedmetadata",()=>{A.duration=Math.floor(L.duration)||200,F(null)},{once:!0}),L.load(),setTimeout(()=>F(null),800)}),et.push(A)}e(`${u.length} File added via drag & drop`),X()}});function at(){return wt.find(o=>o.id===lt)||wt[0]}function it(){localStorage.setItem("melo-rev",String(Date.now())),localStorage.setItem("melo-playlists",JSON.stringify(wt))}function ut(){Bt&&W("melo:playlists-sync",{src:qt,playlists:wt})}function Lt(o){lt=o,localStorage.setItem("melo-currentPlaylist",o),w()}ot("melo:playlists-sync",o=>{o&&o.src!==qt&&Array.isArray(o.playlists)&&(wt=o.playlists,w(),X())});function xt(){localStorage.setItem("melo-rev",String(Date.now()));try{localStorage.setItem("melo-tracks",JSON.stringify(et))}catch{try{localStorage.setItem("melo-tracks",JSON.stringify(et.map(({cover:o,...u})=>u)))}catch{}}}let At=new Set(et.map(o=>o.id));function St(o,u=!1,h=!1){let p=!1;for(const y of o)if(!At.has(y.id))et.push(y),At.add(y.id),p=!0;else{const q=et.find(D=>D.id===y.id);if(q){const D=q.cover;Object.assign(q,y),!y.cover&&D&&(q.cover=D),p=!0}}p&&!h&&(xt(),X(),w()),u&&Bt&&W("melo:tracks-add",{src:qt,list:o})}ot("melo:tracks-add",o=>{o&&o.src!==qt&&Array.isArray(o.list)&&St(o.list)});function kt(o,u=!1){const h=at();if(!h)return;let p=!1;const y=new Set(h.tracks);o.forEach(q=>{y.has(q.id)||(h.tracks.push(q.id),y.add(q.id),p=!0)}),p&&!u?(it(),ut(),w(),X()):p&&it()}async function Rt(o){if(!Bt)return[];const{invoke:u}=await Y(async()=>{const{invoke:p}=await import("./core-DhEqZVGG.js");return{invoke:p}},[]),h=[];for(const p of o)try{const y=await u("scan_library",{path:p});y&&h.push(...y)}catch{}return h}Bt&&Y(async()=>{const{getCurrentWebviewWindow:o}=await import("./webviewWindow-mjQkSB26.js");return{getCurrentWebviewWindow:o}},__vite__mapDeps([6,7,1,0,8])).then(({getCurrentWebviewWindow:o})=>{o().onDragDropEvent(async h=>{var p;if(h.payload.type==="drop"){const y=h.payload.paths||[];if(!y.length)return;const q=await Rt(y);if(!q.length)return;q.forEach(D=>D.source="import"),St(q,!0),kt(q),W("melo:play-tracks",{tracks:q,index:0}),e(`Playing ${((p=q[0])==null?void 0:p.title)||"track"}`)}})}).catch(()=>{});function Ct(o){return`${Math.floor(o/60)}:${String(Math.floor(o%60)).padStart(2,"0")}`}function $t(o){return o.type.startsWith("audio/")||/\.(mp3|flac|wav|ogg|aac|m4a|alac|opus)$/i.test(o.name)}async function x(o){var E;const u=o.path;if(u&&Bt){const A=await Rt([u]);if(A.length)return A[0].source="import",A[0]}const h=u||URL.createObjectURL(o),p=u||Math.random().toString(36).slice(2),y=((E=o.name.split(".").pop())==null?void 0:E.toUpperCase())||"MP3",q=o.name.replace(/\.[^/.]+$/,""),D={id:p,title:q,artist:"Unknown Artist",album:"Single",genre:"Unknown",year:new Date().getFullYear(),duration:180,path:h,codec:y,specs:"Local File",replayGain:0,source:"import"};try{const A=new Audio(URL.createObjectURL(o));await new Promise(L=>{A.addEventListener("loadedmetadata",()=>{D.duration=Math.floor(A.duration)||180,L(null)},{once:!0}),A.load(),setTimeout(()=>L(null),800)})}catch{}return await Jt(o,D),D}function w(){var E,A,L,F;if(!a)return;try{const N=localStorage.getItem("melo-tracks");if(N){const B=JSON.parse(N);Array.isArray(B)&&B.length>et.length&&(et=B)}}catch{}const o=at();if(r&&(r.innerHTML=wt.map(N=>`<option value="${N.id}" ${o&&N.id===o.id?"selected":""}>${N.name}</option>`).join("")),!o){a.innerHTML="",a.style.display="none",n&&(n.style.display="block");return}const u=o.tracks.map((N,B)=>{const G=et.find(Mt=>Mt.id===N||Mt.path===N);if(G)return G;const nt=N.replace(/^.*[\\/]/,""),bt=nt.lastIndexOf("."),ft=bt>0?nt.slice(0,bt):nt;return{id:N,title:ft||`Track ${B+1}`,artist:"Audio Track",album:o.name,duration:0,path:N,codec:"AUDIO",specs:"Local File",source:"import"}});let h=u;if(j.trim()){const N=j.toLowerCase().trim();h=u.filter(B=>(B.title||"").toLowerCase().includes(N)||(B.artist||"").toLowerCase().includes(N)||(B.album||"").toLowerCase().includes(N))}if(n&&(n.style.display=u.length?"none":"block"),a.style.display=u.length?"flex":"none",!h.length&&u.length){a.innerHTML=`<div style="padding:16px;text-align:center;color:var(--text-muted);font-size:11px;">No tracks match "${j}"</div>`;return}const p=window.LumiPlayer,y=p&&p.queue&&p.queue.length&&(A=(E=p.queue[p.currentIndex])==null?void 0:E.id)!=null?A:null,q=!!y&&!((F=(L=p==null?void 0:p.audio)==null?void 0:L.paused)==null||F);a.innerHTML=h.map((N,B)=>{const G=o.tracks.indexOf(N.id),nt=y===N.id;return`
      <div class="track-row ${nt?"active":""}" draggable="true" data-id="${N.id}" data-pl-idx="${G>=0?G:B}">
        <span class="num">${nt?q?"▶":"❚❚":B+1}</span>
        ${N.cover?`<img class="track-cover-mini" src="${N.cover}" onerror="this.style.display='none'"/>`:'<div class="track-cover-mini cover-default">♪</div>'}
        <div style="flex:1;min-width:0;">
          <div class="t-title">${N.title}</div>
          <div class="t-artist">${N.artist} • ${N.album}</div>
        </div>
        <span class="t-dur">${Ct(N.duration)}</span>
        <button class="btn small ghost" data-action="pl-remove" data-idx="${G>=0?G:B}" title="Remove from playlist">×</button>
      </div>
    `}).join("");let D=null;a.querySelectorAll(".track-row").forEach(N=>{const B=N;B.addEventListener("dragstart",G=>{D=parseInt(B.dataset.plIdx),G.dataTransfer.setData("application/x-melo-ids",B.dataset.id),G.dataTransfer.setData("application/x-melo-pl-idx",String(D)),G.dataTransfer.effectAllowed="move",B.style.opacity="0.4"}),B.addEventListener("dragend",()=>{B.style.opacity="1",D=null,a==null||a.querySelectorAll(".track-row").forEach(G=>G.classList.remove("drag-over-target"))}),B.addEventListener("dragover",G=>{G.preventDefault(),G.stopPropagation(),B.classList.add("drag-over-target")}),B.addEventListener("dragleave",()=>{B.classList.remove("drag-over-target")}),B.addEventListener("drop",G=>{var ft;G.preventDefault(),G.stopPropagation(),B.classList.remove("drag-over-target");const nt=parseInt(B.dataset.plIdx),bt=(ft=G.dataTransfer)==null?void 0:ft.getData("application/x-melo-pl-idx");if(bt!==void 0&&bt!==""&&!isNaN(parseInt(bt))){const Mt=parseInt(bt);if(Mt!==nt&&Mt>=0&&nt>=0&&Mt<o.tracks.length&&nt<o.tracks.length){const Ye=o.tracks.splice(Mt,1)[0];o.tracks.splice(nt,0,Ye),it(),ut(),w(),X(),e("Track reordered in playlist");return}}}),B.addEventListener("click",G=>{const nt=G.target;if(nt.closest("[data-action='pl-remove']")){const Mt=parseInt(nt.closest("[data-action='pl-remove']").dataset.idx);o.tracks.splice(Mt,1),it(),ut(),w(),X();return}const bt=B.dataset.id,ft=h.findIndex(Mt=>Mt.id===bt);W("melo:play-tracks",{tracks:h,index:ft>=0?ft:0})})})}const z=document.getElementById("playlistSearchInput");z&&z.addEventListener("input",()=>{j=z.value,w()});const P=document.getElementById("playlistSortSelect");if(P&&P.addEventListener("change",()=>{const o=at();if(!o||!o.tracks.length)return;const u=P.value,h=o.tracks.map(p=>et.find(y=>y.id===p)).filter(Boolean);u==="title-asc"?h.sort((p,y)=>p.title.localeCompare(y.title)):u==="artist-asc"?h.sort((p,y)=>p.artist.localeCompare(y.artist)):u==="album-asc"?h.sort((p,y)=>p.album.localeCompare(y.album)):u==="dur-asc"?h.sort((p,y)=>p.duration-y.duration):u==="dur-desc"&&h.sort((p,y)=>y.duration-p.duration),o.tracks=h.map(p=>p.id),it(),ut(),w(),e(`Playlist sorted by ${P.options[P.selectedIndex].text}`)}),r==null||r.addEventListener("change",()=>Lt(r.value)),g==null||g.addEventListener("click",()=>{const o=at();!o||!o.tracks.length||(o.tracks=[],it(),ut(),w(),X())}),s==null||s.addEventListener("click",()=>{const o=at();if(!o)return e("No playlist available");const u=o.tracks.map(D=>et.find(E=>E.id===D)).filter(Boolean);if(!u.length)return e("Current list is empty");let h=`#EXTM3U
`;u.forEach(D=>{h+=`#EXTINF:${Math.floor(D.duration)},${D.artist} - ${D.title}
${D.path}
`});const p=new Blob([h],{type:"audio/x-mpegurl"}),y=URL.createObjectURL(p),q=document.createElement("a");q.href=y,q.download=`${o.name}.m3u`,q.click(),URL.revokeObjectURL(y),e(`M3U exported for "${o.name}"`)}),b==null||b.addEventListener("click",()=>{const o=prompt("New playlist name:");if(!o)return;const u=Math.random().toString(36).slice(2,8);wt.push({id:u,name:o,tracks:[],createdAt:Date.now()}),Lt(u),it(),ut(),X(),e(`Playlist "${o}" created`)}),a){const o=a.parentElement;["dragover","dragenter"].forEach(u=>o.addEventListener(u,h=>{h.preventDefault(),h.stopPropagation(),a.classList.add("drag-over")})),o.addEventListener("dragleave",u=>{o.contains(u.relatedTarget)||a.classList.remove("drag-over")}),o.addEventListener("drop",async u=>{var q,D;u.preventDefault(),u.stopPropagation(),a.classList.remove("drag-over");const h=at();if(!h)return e("Create a playlist first (+ New)");const p=(((q=u.dataTransfer)==null?void 0:q.getData("application/x-melo-ids"))||"").split(",").filter(Boolean);let y=0;if(p.length)p.forEach(E=>{h.tracks.includes(E)||(h.tracks.push(E),y++)});else if(!Bt){const E=Array.from(((D=u.dataTransfer)==null?void 0:D.files)||[]).filter($t);for(const A of E){const L=await x(A);et.push(L),h.tracks.includes(L.id)||(h.tracks.push(L.id),y++)}}y&&e(`${y} track(s) added to "${h.name}"`),xt(),it(),ut(),X(),w()})}const R=document.getElementById("playerCard");R&&(["dragover","dragenter"].forEach(o=>R.addEventListener(o,u=>{u.preventDefault(),u.stopPropagation(),R.classList.add("drag-over")})),R.addEventListener("dragleave",o=>{R.contains(o.relatedTarget)||R.classList.remove("drag-over")}),R.addEventListener("drop",async o=>{var y,q;o.preventDefault(),o.stopPropagation(),R.classList.remove("drag-over");const u=window.LumiPlayer,h=(((y=o.dataTransfer)==null?void 0:y.getData("application/x-melo-ids"))||"").split(",").filter(Boolean);let p=[];if(h.length)p=h.map(D=>et.find(E=>E.id===D)).filter(Boolean),u&&p.length&&e(`Playback ${p.length} track(s)`);else if(!Bt){const D=Array.from(((q=o.dataTransfer)==null?void 0:q.files)||[]).filter($t),E=at();let A=!1;for(const L of D){const F=await x(L);et.push(F),p.push(F),E&&!E.tracks.includes(F.id)&&(E.tracks.push(F.id),A=!0)}D.length&&(xt(),it(),ut(),X(),w()),u&&p.length&&e(A&&E?`Playback ${p.length} track(s) + added to "${E.name}"`:`Playback ${p.length} track(s)`)}p.length&&W("melo:play-tracks",{tracks:p,index:0})}));let U=null;function K(o){if(U=o,!U)return e("No track to edit");I.style.display="flex",S.value=U.title,v.value=U.artist,H.value=U.album,$.value=String(U.year)}function V(o){const u=et.filter(o).map(h=>h.id);u.length&&(et=et.filter(h=>!o(h)),u.forEach(h=>At.delete(h)),wt.forEach(h=>{h.tracks=h.tracks.filter(p=>!u.includes(p))}),xt(),it(),ut(),Bt&&W("melo:tracks-remove",{src:qt,ids:u}),X(),w())}ot("melo:tracks-remove",o=>{if(o&&o.src!==qt&&Array.isArray(o.ids)){const u=o.ids;et=et.filter(h=>!u.includes(h.id)),u.forEach(h=>At.delete(h)),wt.forEach(h=>{h.tracks=h.tracks.filter(p=>!u.includes(p))}),X(),w()}});const O=document.createElement("div");O.className="ctx-menu",O.style.display="none",document.body.appendChild(O);let Z=null;function l(){O.style.display="none"}document.addEventListener("click",l),document.addEventListener("keydown",o=>{o.key==="Escape"&&l()}),O.addEventListener("click",o=>{const u=o.target.closest("[data-act]");if(!u||!Z)return;o.stopPropagation();const h=u.dataset.act;h==="edit"&&K(Z.track),h==="remove"&&(Z.type==="track"?V(p=>p.id===Z.track.id):Z.type==="artist"?V(p=>p.artist===Z.name):Z.type==="album"?V(p=>p.artist===Z.artist&&p.album===Z.album):Z.type==="genre"&&V(p=>p.genre===Z.name)),l()});const T=document.createElement("div");T.className="ctx-menu",T.style.display="none",document.body.appendChild(T);let tt=-1;document.addEventListener("click",()=>{T.style.display="none"}),T.addEventListener("click",o=>{if(!o.target.closest("[data-act='plremove']"))return;o.stopPropagation();const u=at();u&&tt>=0&&tt<u.tracks.length&&(u.tracks.splice(tt,1),it(),ut(),w(),X()),T.style.display="none"}),document.addEventListener("contextmenu",o=>{l(),T.style.display="none";const u=o.target,h=u.closest("#winPlaylistTracks .track-row");if(h){o.preventDefault(),tt=parseInt(h.dataset.plIdx||"-1"),T.innerHTML='<button class="ctx-item danger" data-act="plremove">Remove from Playlist</button>',T.style.display="block";const D=T.getBoundingClientRect();T.style.left=Math.max(4,Math.min(o.clientX,window.innerWidth-D.width-6))+"px",T.style.top=Math.max(4,Math.min(o.clientY,window.innerHeight-D.height-6))+"px";return}if(!(qt==="library"?!0:!!u.closest("#win-library"))){o.preventDefault();return}o.preventDefault();const y=u.closest(".track-row, [data-artist], [data-albumkey], [data-genre]");if(!y){l();return}if(y.classList.contains("track-row")){const D=yt[parseInt(y.dataset.viewIdx)];if(!D){l();return}Z={type:"track",track:D},O.innerHTML='<button class="ctx-item" data-act="edit">Edit tags</button><button class="ctx-item danger" data-act="remove">Remove track from library</button>'}else if(y.dataset.artist)Z={type:"artist",name:y.dataset.artist},O.innerHTML='<button class="ctx-item danger" data-act="remove">Remove artist from library</button>';else if(y.dataset.albumkey){const[D,E]=(y.dataset.albumkey||"").split("\0");Z={type:"album",artist:D,album:E},O.innerHTML='<button class="ctx-item danger" data-act="remove">Remove album from library</button>'}else Z={type:"genre",name:y.dataset.genre},O.innerHTML='<button class="ctx-item danger" data-act="remove">Remove genre from library</button>';O.style.display="block";const q=O.getBoundingClientRect();O.style.left=Math.max(4,Math.min(o.clientX,window.innerWidth-q.width-6))+"px",O.style.top=Math.max(4,Math.min(o.clientY,window.innerHeight-q.height-6))+"px"}),(he=document.getElementById("btn-tag-cancel"))==null||he.addEventListener("click",()=>I.style.display="none"),(ve=document.getElementById("btn-tag-save"))==null||ve.addEventListener("click",async()=>{if(U){if(U.title=S.value,U.artist=v.value,U.album=H.value,U.year=parseInt($.value)||U.year,Q.files&&Q.files[0]){const o=Q.files[0],u=URL.createObjectURL(o),h=new FileReader;h.onload=()=>{U.cover=h.result,X(),Dt(),W("melo:tag-updated",U)},h.readAsDataURL(o),U.cover=u}if(window.__TAURI__)try{const{invoke:o}=await Y(async()=>{const{invoke:u}=await import("./core-DhEqZVGG.js");return{invoke:u}},[]);await o("write_tags",{path:U.path,tags:{title:U.title,artist:U.artist,album:U.album}})}catch{}I.style.display="none",xt(),X(),Dt(),W("melo:tag-updated",U),e("Metadata saved")}});function _(o){return String(o!=null?o:"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function st(){return et.filter(o=>o.source==="scan")}function gt(o){return yt=o,o.length?o.map((u,h)=>{const p=`${Math.floor(u.duration/60)}:${String(Math.floor(u.duration%60)).padStart(2,"0")}`;return`
      <div class="track-row" draggable="true" data-view-idx="${h}" data-id="${_(u.id)}">
        <span class="num">${h+1}</span>
        <img class="track-cover-mini" src="${u.cover||""}" style="${u.cover?"":"display:none"}" onerror="this.style.display='none'"/>
        <div style="flex:1;min-width:0;">
          <div class="t-title">${_(u.title)}</div>
          <div class="t-artist">${_(u.artist)} • ${_(u.album)}${u.year?" • "+u.year:""}</div>
        </div>
        <span style="font-size:10px;padding:3px 6px;border-radius:6px;background:var(--badge-bg);color:var(--badge-text);border:1px solid var(--card-border);">${_(u.codec)}</span>
        <span class="t-dur">${p}</span>
        <button class="btn small ghost" data-action="add-queue" data-view-idx="${h}">+</button>
      </div>`}).join(""):'<div style="padding:30px;text-align:center;color:var(--text-muted);">Nothing here yet.<br/><span style="font-size:12px;">Use "Scan Folder" to build your library</span></div>'}function X(){var q,D;if(!i){w();return}const o=st(),u=new Set(o.map(E=>E.artist)).size,h=new Set(o.map(E=>E.artist+"\0"+E.album)).size;m&&(m.textContent=`${o.length} tracks • ${u} artists • ${h} albums`);const p=rt.trim().toLowerCase();let y="";if(f==="artists")if(M){const E=o.filter(B=>B.artist===M),A=[...new Set(E.map(B=>B.album))].sort((B,G)=>B.localeCompare(G)),L=C?E.filter(B=>B.album===C):E,F=(q=E.find(B=>B.cover))==null?void 0:q.cover;y=`<div class="lib-crumb"><button class="btn small" data-back="artists">‹ Artists</button>${F?`<div class="lib-avatar" style="background-image:url('${_(F)}')"></div>`:`<div class="lib-avatar">${_((M[0]||"?").toUpperCase())}</div>`}<b>${_(M)}</b></div>
          <div class="chip-row"><button class="chip ${C?"":"active"}" data-album="">All albums</button>`+A.map(B=>{var bt;const G=(bt=E.find(ft=>ft.album===B&&ft.cover))==null?void 0:bt.cover,nt=G?`<span class="chip-thumb" style="background-image:url('${_(G)}')"></span>`:"";return`<button class="chip ${C===B?"active":""}" data-album="${_(B)}">${nt}${_(B)}</button>`}).join("")+"</div>"+gt(p?L.filter(B=>(B.title+B.album).toLowerCase().includes(p)):L)}else{yt=[];const E=[...new Set(o.map(L=>L.artist))].sort((L,F)=>L.localeCompare(F));y=(p?E.filter(L=>L.toLowerCase().includes(p)):E).map(L=>{var G;const F=o.filter(nt=>nt.artist===L).length,N=(G=o.find(nt=>nt.artist===L&&nt.cover))==null?void 0:G.cover,B=N?`<div class="lib-avatar" style="background-image:url('${_(N)}')"></div>`:`<div class="lib-avatar">${_((L[0]||"?").toUpperCase())}</div>`;return`<div class="lib-item" data-artist="${_(L)}">${B}<div style="flex:1;min-width:0;"><div class="t-title">${_(L)}</div><div class="t-artist">${F} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No artists found.</div>'}else if(f==="albums")if(J){const[E,A]=J.split("\0"),L=o.filter(B=>B.artist===E&&B.album===A),F=(D=L.find(B=>B.cover))==null?void 0:D.cover;y=`<div class="lib-crumb"><button class="btn small" data-back="albums">‹ Albums</button>${F?`<div class="lib-avatar lib-avatar-album" style="background-image:url('${_(F)}')"></div>`:'<div class="lib-avatar lib-avatar-album">💿</div>'}<b>${_(A)}</b><span class="t-artist" style="margin-left:8px;">${_(E)}</span></div>`+gt(p?L.filter(B=>B.title.toLowerCase().includes(p)):L)}else{yt=[];const E=[...new Set(o.map(L=>L.artist+"\0"+L.album))].sort((L,F)=>L.localeCompare(F));y=(p?E.filter(L=>L.toLowerCase().includes(p)):E).map(L=>{var bt;const[F,N]=L.split("\0"),B=o.filter(ft=>ft.artist===F&&ft.album===N).length,G=(bt=o.find(ft=>ft.artist===F&&ft.album===N&&ft.cover))==null?void 0:bt.cover,nt=G?`<div class="lib-avatar lib-avatar-album" style="background-image:url('${_(G)}')"></div>`:'<div class="lib-avatar lib-avatar-album">💿</div>';return`<div class="lib-item" data-albumkey="${_(L)}">${nt}<div style="flex:1;min-width:0;"><div class="t-title">${_(N)}</div><div class="t-artist">${_(F)} • ${B} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No albums found.</div>'}else if(dt){const E=o.filter(A=>A.genre===dt);y=`<div class="lib-crumb"><button class="btn small" data-back="genres">‹ Genres</button><b>${_(dt)}</b></div>`+gt(p?E.filter(A=>(A.title+A.artist).toLowerCase().includes(p)):E)}else{yt=[];const E=[...new Set(o.map(L=>L.genre))].sort((L,F)=>L.localeCompare(F));y=(p?E.filter(L=>L.toLowerCase().includes(p)):E).map(L=>{const F=o.filter(N=>N.genre===L).length;return`<div class="lib-item" data-genre="${_(L)}"><div class="lib-avatar">🎼</div><div style="flex:1;min-width:0;"><div class="t-title">${_(L)}</div><div class="t-artist">${F} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No genres found.</div>'}i.innerHTML=y,i.querySelectorAll("[data-artist]").forEach(E=>E.addEventListener("click",()=>{M=E.dataset.artist,C=null,X()})),i.querySelectorAll("[data-albumkey]").forEach(E=>E.addEventListener("click",()=>{J=E.dataset.albumkey,X()})),i.querySelectorAll("[data-genre]").forEach(E=>E.addEventListener("click",()=>{dt=E.dataset.genre,X()})),i.querySelectorAll("[data-back]").forEach(E=>E.addEventListener("click",()=>{const A=E.dataset.back;A==="artists"?(M=null,C=null):A==="albums"?J=null:dt=null,X()})),i.querySelectorAll(".chip[data-album]").forEach(E=>E.addEventListener("click",()=>{C=E.dataset.album||null,X()})),i.querySelectorAll(".track-row").forEach(E=>{E.addEventListener("dragstart",A=>{A.dataTransfer.setData("application/x-melo-ids",E.dataset.id),A.dataTransfer.effectAllowed="copy"}),E.addEventListener("click",A=>{const L=A.target,F=parseInt(E.dataset.viewIdx);if(L.closest("[data-action='add-queue']")){Zt(yt[F]);return}W("melo:play-tracks",{tracks:yt,index:F})})}),w()}function Zt(o){W("melo:add-queue",o),e(`Queued: ${o.title}`)}function Dt(){if(!k)return;const o=window.LumiPlayer,u=(o==null?void 0:o.queue)||et.slice(0,4);if(!u.length){k.innerHTML='<div style="text-align:center;color:var(--text-muted);font-size:12px;padding:12px;">Queue is empty</div>';return}k.innerHTML=u.map((h,p)=>{var y;return`
      <div class="track-row" data-id="${h.id}" data-queue-idx="${p}" style="padding:6px 8px;border-radius:8px;border:1px solid ${p===((y=o==null?void 0:o.currentIndex)!=null?y:0)?"var(--accent)":"transparent"};">
        <img class="track-cover-mini" src="${h.cover||""}" style="width:24px;height:24px;${h.cover?"":"display:none"}" />
        <div style="flex:1;min-width:0;">
          <div class="t-title" style="font-size:12px;">${h.title}</div>
          <div class="t-artist" style="font-size:11px;">${h.artist}</div>
        </div>
        <button class="btn small ghost" data-remove="${p}" style="padding:2px 6px;">×</button>
      </div>
    `}).join(""),k.querySelectorAll("[data-remove]").forEach(h=>{h.addEventListener("click",()=>{const p=parseInt(h.dataset.remove);u.splice(p,1),Dt()})}),k.querySelectorAll(".track-row").forEach(h=>{h.addEventListener("click",p=>{if(p.target.closest("[data-remove]"))return;const y=parseInt(h.dataset.queueIdx),q=window.LumiPlayer;q&&q.loadTrack(y)})})}ot("melo:track-changed",o=>{Dt();const u=document.getElementById("lyricsBox");u&&o&&(u.textContent=o.lyrics||"No lyrics found for this track. You can add it via the tag editor."),document.querySelectorAll(".track-row").forEach(h=>{h.classList.toggle("active",h.dataset.id===(o==null?void 0:o.id))})}),setInterval(()=>Dt(),2e3);let me=localStorage.getItem("melo-rev")||"";setInterval(()=>{const o=localStorage.getItem("melo-rev")||"";if(o!==me){me=o;try{const u=JSON.parse(localStorage.getItem("melo-tracks")||"null");if(Array.isArray(u)){const h=new Map(et.map(p=>[p.id,p]));et=u.map(p=>{const y=h.get(p.id);return!p.cover&&(y!=null&&y.cover)?{...p,cover:y.cover}:p}),At=new Set(et.map(p=>p.id))}}catch{}try{const u=JSON.parse(localStorage.getItem("melo-playlists")||"null");Array.isArray(u)&&u.length&&(wt=u)}catch{}X(),w()}},1200);let oe=null;function Qt(){oe||(oe=setTimeout(()=>{oe=null,xt(),X(),w()},350))}window.LumiLibrary={get tracks(){return et},get playlists(){return wt},render:X,addTracks:St,addToCurrentPlaylist:kt,importPaths:Rt,flushDeferred:Qt,scanFolder:vt,currentPlaylistName:()=>{var o;return((o=at())==null?void 0:o.name)||"Playlist"}}}const Yt={flat:[0,0,0,0,0,0,0,0,0,0],pop:[-1,2,4,4,2,-1,-1,2,3,3],rock:[4,3,2,-1,-2,-2,1,3,4,4],bass:[6,5,4,2,1,0,-1,-1,-2,-3],treble:[-3,-2,-1,0,1,2,3,5,6,6],dance:[5,4,2,0,-1,-1,2,4,5,3],jazz:[2,1,2,3,2,0,1,2,3,2],classical:[3,2,1,0,0,0,-1,2,3,4],vocal:[-2,-1,0,2,4,4,3,1,0,-1],acoustic:[3,2,1,1,2,2,3,3,2,1],hiphop:[5,4,1,2,-1,-1,1,-1,2,3],metal:[4,2,-1,-2,-1,1,3,4,5,4]};function se(t){for(const[e,i]of Object.entries(Yt))if(i.every((a,n)=>a===t[n]))return e;return"custom"}function xe(t,e,i={}){const a=!!i.remote,n=document.getElementById("eqEnable"),r=document.getElementById("eqPreset"),c=document.getElementById("btnEqReset"),m=document.getElementById("eqBands"),d=document.getElementById("eqCanvas"),s=d?d.getContext("2d"):null;let g=null,b=[],k=[],I=new Array(Gt.length).fill(0);try{const f=JSON.parse(localStorage.getItem("melo-eq-gains")||"null");Array.isArray(f)&&f.length===Gt.length&&(I=f.map(M=>typeof M=="number"?Math.max(-12,Math.min(12,M)):0))}catch{}let S=localStorage.getItem("melo-eq-preset")||se(I),v=localStorage.getItem("melo-eq-enabled")!=="0";function H(){if(!g)try{const f=te(t);g=f.ctx,b=f.filters,b.forEach((M,C)=>{M.gain.value=v?I[C]:0})}catch{}}function $(f,M){H(),b[f]&&v&&(b[f].gain.value=M)}function Q(f){H(),I=[...f],v&&f.forEach((M,C)=>{b[C]&&(b[C].gain.value=M)}),j()}function rt(f){H(),v=f,f?I.forEach((M,C)=>{b[C]&&(b[C].gain.value=M)}):b.forEach(M=>{M.gain.value=0}),j()}a||t&&t.addEventListener("play",()=>{H(),(g==null?void 0:g.state)==="suspended"&&g.resume().catch(()=>{})}),ot("melo:eq",f=>{f&&(f.type==="gain"?(a||$(f.idx,f.val),I[f.idx]=f.val,k[f.idx]&&(k[f.idx].value=String(f.val),lt(k[f.idx])),r&&(r.value=se(I)),j()):f.type==="gains"?(a||Q(f.values),I=[...f.values],k.length&&k.forEach((M,C)=>{M.value=String(I[C]),lt(M)}),r&&f.preset&&(r.value=f.preset),j()):f.type==="enable"&&(v=!!f.on,a||rt(v),n&&(n.checked=v),j()))});function lt(f){var J;const M=parseInt(f.value),C=(J=f.parentElement)==null?void 0:J.querySelector(".val");C&&(C.textContent=(M>0?"+":"")+M+"dB")}function j(){if(!d||!s)return;const f=window.devicePixelRatio||1,M=d.clientWidth*f,C=d.clientHeight*f;if(M<=0||C<=0)return;d.width=M,d.height=C,s.clearRect(0,0,M,C);const J=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#2a7bd6",dt=I;if(!v){s.strokeStyle="rgba(100,120,150,0.25)",s.lineWidth=2*f,s.beginPath(),s.moveTo(0,C/2),s.lineTo(M,C/2),s.stroke();return}s.strokeStyle=J,s.lineWidth=2.5*f,s.lineJoin="round",s.beginPath(),dt.forEach((yt,vt)=>{const at=vt/(dt.length-1)*M,it=C/2-yt/12*(C/2-10*f);if(vt===0)s.moveTo(at,it);else{const ut=(vt-1)/(dt.length-1)*M,Lt=C/2-dt[vt-1]/12*(C/2-10*f);s.quadraticCurveTo((ut+at)/2,Lt,at,it)}}),s.stroke(),dt.forEach((yt,vt)=>{const at=vt/(dt.length-1)*M,it=C/2-yt/12*(C/2-10*f);s.fillStyle=J,s.beginPath(),s.arc(at,it,4*f,0,Math.PI*2),s.fill(),s.fillStyle="white",s.beginPath(),s.arc(at,it,2*f,0,Math.PI*2),s.fill()}),s.strokeStyle="rgba(100,120,150,0.3)",s.lineWidth=1*f,s.setLineDash([4*f,4*f]),s.beginPath(),s.moveTo(0,C/2),s.lineTo(M,C/2),s.stroke(),s.setLineDash([])}m&&(m.innerHTML="",Gt.forEach((f,M)=>{const C=I[M]||0,J=document.createElement("div");J.className="eq-band",J.innerHTML=`
        <input type="range" min="-12" max="12" value="${C}" step="1" data-idx="${M}" orient="vertical" />
        <label>${f>=1e3?f/1e3+"k":f}</label>
        <span style="font-size:10px;color:var(--text-muted);min-height:12px;" class="val">${(C>0?"+":"")+C+"dB"}</span>
      `,m.appendChild(J)}),k=Array.from(m.querySelectorAll("input")),k.forEach(f=>{f.addEventListener("input",()=>{const M=parseInt(f.dataset.idx),C=parseInt(f.value);lt(f),I[M]=C,j();const J=se(I);r&&(r.value=J),localStorage.setItem("melo-eq-gains",JSON.stringify(I)),localStorage.setItem("melo-eq-preset",J),a||$(M,C),W("melo:eq",{type:"gain",idx:M,val:C,values:I})})})),r&&(r.value=S,r.addEventListener("change",()=>{const f=Yt[r.value]||Yt.flat;k.length&&k.forEach((M,C)=>{M.value=String(f[C]),lt(M)}),I=[...f],j(),localStorage.setItem("melo-eq-gains",JSON.stringify(I)),localStorage.setItem("melo-eq-preset",r.value),a||Q(f),W("melo:eq",{type:"gains",values:f,preset:r.value}),e(`Preset: ${r.options[r.selectedIndex].text}`)})),c&&c.addEventListener("click",()=>{const f=Yt.flat;k.length&&k.forEach((M,C)=>{M.value="0",lt(M)}),I=[...f],r&&(r.value="flat"),localStorage.setItem("melo-eq-gains",JSON.stringify(I)),localStorage.setItem("melo-eq-preset","flat"),a||Q(f),W("melo:eq",{type:"gains",values:f,preset:"flat"}),j(),e("Equalizer reset to Flat (0dB)")}),n&&(n.checked=v,n.addEventListener("change",()=>{v=n.checked,localStorage.setItem("melo-eq-enabled",v?"1":"0"),a||rt(v),W("melo:eq",{type:"enable",on:v}),j(),e(v?"Equalizer On":"Equalizer off — Flat")})),d&&new ResizeObserver(()=>j()).observe(d),j(),window.LumiEqualizer={presets:Yt,frequencies:Gt,displayGains:I,reset:()=>c==null?void 0:c.click()}}const jt=[{id:"bars",label:"Classic Bars"},{id:"thin",label:"Thin Bars"},{id:"line",label:"Spectrum Line"},{id:"mirror",label:"Mirror Bars"},{id:"wave",label:"Oscilloscope"}];function ea(t){let e=document.getElementById("vizBars");if(!e)return;let i=v(e),a=i.getContext("2d"),n=null,r=null,c=null,m=null,d=null,s=!1,g=localStorage.getItem("melo-viz-mode")||"bars";jt.some(x=>x.id===g)||(g="bars");let b=0,k=[],I=.45,S=null;function v(x){let w=x.querySelector("canvas");return w||(x.innerHTML="",w=document.createElement("canvas"),x.appendChild(w)),w}function H(){if(!(r&&c))try{const x=te(t);n=x.ctx,r=x.analyser,c=new Uint8Array(r.frequencyBinCount),m=new Uint8Array(r.fftSize)}catch{s=!0}}function $(x){const w=c.length,z=((n==null?void 0:n.sampleRate)||44100)/2,P=45,R=Math.min(15e3,z*.95),U=Math.log(P),K=Math.log(R),V=[];for(let O=0;O<x;O++){const Z=Math.exp(U+(K-U)*O/x),l=Math.exp(U+(K-U)*(O+1)/x);let T=Math.floor(Z/z*w),tt=Math.max(T+1,Math.ceil(l/z*w));T<0&&(T=0),tt>w&&(tt=w);let _=0;for(let st=T;st<tt;st++)_+=c[st];V.push(_/(tt-T)/255)}return V}function Q(x){const w=performance.now()/1e3,z=Math.pow(Math.abs(Math.sin(w*2.2)),2.5),P=[];for(let R=0;R<x;R++){let U=.42+.26*Math.sin(w*1.35+R*.62)+.2*Math.sin(w*2.9+R*1.31)+Math.random()*.07;U*=.55+.5*z,P.push(Math.max(.04,Math.min(1,U)))}return P}function rt(x){const w=performance.now()/1e3,z=.5+.5*Math.pow(Math.abs(Math.sin(w*1.9)),2);for(let P=0;P<x.length;P++){const R=P/x.length;x[P]=128+66*z*(Math.sin(R*Math.PI*6+w*7)*.6+Math.sin(R*Math.PI*13-w*11)*.4)}}function lt(x){let w;if(s||!r||!c)w=Q(x);else if(r.getByteFrequencyData(c),w=$(x),!w.some(R=>R>.01)&&!t.paused)w=Q(x);else for(let R=0;R<x;R++)w[R]*=1+1.7*(R/Math.max(1,x-1));let z=0;for(const P of w)P>z&&(z=P);z>I?I=z:I=Math.max(.35,I*.985),k.length!==x&&(k=new Array(x).fill(0));for(let P=0;P<x;P++){const R=Math.min(1,w[P]/I),U=R>k[P]?.55:.16;k[P]+=(R-k[P])*U}return k}function j(x,w){return getComputedStyle(document.documentElement).getPropertyValue(x).trim()||w}function f(){return i.width/Math.max(1,i.clientWidth)||1}function M(x,w,z,P,R){if(R=Math.min(R,z/2,P/2),a.roundRect){a.roundRect(x,w,z,P,R);return}a.rect(x,w,z,P)}function C(){const x=window.devicePixelRatio||1,w=i.clientWidth||(e==null?void 0:e.clientWidth)||200,z=i.clientHeight||(e==null?void 0:e.clientHeight)||56;w>0&&z>0&&(i.width=Math.round(w*x),i.height=Math.round(z*x))}new ResizeObserver(C).observe(i),C();function J(x,w,z,P){const R=f(),U=j("--visualizer","#38bdf8"),K=j("--accent","#0284c7"),V=x.length,O=w/V,Z=Math.max(1.2*R,O*(1-P));for(let l=0;l<V;l++){const T=x[l],tt=Math.max(2*R,T*(z-4*R)),_=l*O+(O-Z)/2,st=z-tt-1*R,gt=a.createLinearGradient(0,st,0,z);gt.addColorStop(0,K),gt.addColorStop(1,U),a.fillStyle=gt,a.beginPath(),M(_,st,Z,tt,Math.min(Z/2,3.5*R)),a.fill()}}function dt(x,w,z){const P=f(),R=j("--visualizer","#38bdf8"),U=j("--accent","#0284c7"),K=x.length,V=w/K,O=z/2,Z=Math.max(1.5*P,V*.62);for(let l=0;l<K;l++){const T=Math.max(1.5*P,x[l]*(z/2-3*P)),tt=l*V+(V-Z)/2,_=a.createLinearGradient(0,O-T,0,O+T);_.addColorStop(0,U),_.addColorStop(.5,R),_.addColorStop(1,U),a.fillStyle=_,a.beginPath(),M(tt,O-T,Z,T*2,Math.min(Z/2,3*P)),a.fill()}}function yt(x,w,z){const P=f(),R=j("--visualizer","#38bdf8"),U=j("--accent","#0284c7"),K=x.length,V=[],O=[];for(let l=0;l<K;l++)V.push((l+.5)/K*w),O.push(z-2*P-x[l]*(z-8*P));a.beginPath(),a.moveTo(V[0],z),a.lineTo(V[0],O[0]);for(let l=1;l<K;l++){const T=(V[l-1]+V[l])/2;a.quadraticCurveTo(V[l-1],O[l-1],T,(O[l-1]+O[l])/2)}a.lineTo(V[K-1],O[K-1]),a.lineTo(V[K-1],z),a.closePath();const Z=a.createLinearGradient(0,0,0,z);Z.addColorStop(0,R),Z.addColorStop(1,"transparent"),a.globalAlpha=.18,a.fillStyle=Z,a.fill(),a.globalAlpha=1,a.beginPath(),a.moveTo(V[0],O[0]);for(let l=1;l<K;l++){const T=(V[l-1]+V[l])/2;a.quadraticCurveTo(V[l-1],O[l-1],T,(O[l-1]+O[l])/2)}a.lineTo(V[K-1],O[K-1]),a.strokeStyle=U,a.lineWidth=2*P,a.lineJoin="round",a.stroke()}function vt(){const x=i.width,w=i.height,z=f(),P=j("--accent","#0284c7");let R;s||!r||!m?(d||(d=new Uint8Array(1024)),rt(d),R=d):(r.getByteTimeDomainData(m),R=m);const U=()=>{a.beginPath();for(let K=0;K<=x;K+=2){const V=Math.min(R.length-1,Math.floor(K/x*R.length)),O=R[V]/255*w;K===0?a.moveTo(K,O):a.lineTo(K,O)}};U(),a.strokeStyle=P,a.globalAlpha=.16,a.lineWidth=6*z,a.lineJoin="round",a.stroke(),U(),a.globalAlpha=1,a.lineWidth=1.8*z,a.stroke()}function at(){const x=i.width,w=i.height;if(!x||!w)return;if(a.clearRect(0,0,x,w),g==="wave"){vt();return}const P=lt(g==="bars"?16:g==="thin"?56:g==="line"?64:24);g==="bars"?J(P,x,w,.34):g==="thin"?J(P,x,w,.32):g==="line"?yt(P,x,w):g==="mirror"&&dt(P,x,w)}function it(){b=requestAnimationFrame(it),at()}function ut(){b||it()}function Lt(x,w=!1){g=x,k=[],localStorage.setItem("melo-viz-mode",x)}function xt(){return S||(S=document.createElement("div"),S.className="viz-menu",S.style.display="none",document.body.appendChild(S),S)}function At(){const x=xt();x.innerHTML='<div class="viz-menu-label">Visualizer type</div>'+jt.map(w=>`<button class="viz-menu-item ${w.id===g?"active":""}" data-mode="${w.id}">${w.id===g?"✓":""}<span>${w.label}</span></button>`).join(""),x.querySelectorAll("[data-mode]").forEach(w=>{w.addEventListener("click",z=>{z.stopPropagation(),Lt(w.dataset.mode),kt()})})}function St(x,w){At();const z=S;z.style.display="block";const P=z.getBoundingClientRect();z.style.left=Math.max(8,Math.min(x,window.innerWidth-P.width-8))+"px",z.style.top=Math.max(8,Math.min(w,window.innerHeight-P.height-8))+"px"}function kt(){S&&(S.style.display="none")}function Rt(){e&&(e.title="Click: next mode • Right-click: choose mode",e.addEventListener("click",()=>{kt();const x=jt.findIndex(w=>w.id===g);Lt(jt[(x+1)%jt.length].id)}),e.addEventListener("contextmenu",x=>{x.preventDefault(),x.stopPropagation(),St(x.clientX,x.clientY)}))}document.addEventListener("click",x=>{S&&S.style.display!=="none"&&!S.contains(x.target)&&kt()}),document.addEventListener("keydown",x=>{x.key==="Escape"&&kt()});function Ct(){H(),ut(),(n==null?void 0:n.state)==="suspended"&&n.resume().catch(()=>{})}t.addEventListener("play",Ct),Ct(),Rt(),document.addEventListener("visibilitychange",()=>{document.hidden?(cancelAnimationFrame(b),b=0):ut()});function $t(){cancelAnimationFrame(b),b=0,e=document.getElementById("vizBars"),e&&(i=v(e),a=i.getContext("2d"),new ResizeObserver(C).observe(i),C(),Rt(),ut())}window.__LUMI_REBIND_VISUALIZER__=$t}function ke(t){if(!t||!t.trim())return{isSynced:!1,lines:[],raw:""};const e=[],i=t.split(/\r?\n/),a=/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;let n=!1;for(const r of i){const c=r.trim();if(!c||/^\[[a-z]{2,8}:/i.test(c))continue;const m=[...c.matchAll(a)];if(m.length>0){n=!0;const d=c.replace(a,"").trim();for(const s of m){const g=parseInt(s[1],10),b=parseInt(s[2],10),k=s[3]||"0",I=k.length===2?parseInt(k,10)*10:k.length===1?parseInt(k,10)*100:parseInt(k.slice(0,3),10),S=g*60+b+I/1e3;e.push({time:S,text:d})}}else e.push({time:-1,text:c})}return e.sort((r,c)=>r.time-c.time),{isSynced:n,lines:e,raw:t}}function Ee(t,e){var S;const i=document.getElementById("lyricsContainer"),a=document.getElementById("lyricsStatus"),n=document.getElementById("lyricsTrackTitle");let r={isSynced:!1,lines:[]},c=null,m=-1,d=0;async function s(v){if(v.lyrics&&v.lyrics.trim().length>0)return v.lyrics;if(window.__TAURI__)try{const{invoke:H}=await Y(async()=>{const{invoke:Q}=await import("./core-DhEqZVGG.js");return{invoke:Q}},[]),$=await H("get_track_lyrics",{path:v.path});if($)return $}catch{}return null}async function g(v){if(!v){c=null,r={isSynced:!1,lines:[],raw:""},n&&(n.textContent="No track playing"),b();return}c=v.id,n&&(n.textContent=`${v.title} — ${v.artist}`);const H=await s(v);r=ke(H||""),b()}function b(){if(i){if(i.innerHTML="",m=-1,!r.lines.length){a&&(a.style.display="block",a.innerHTML='No synced lyrics found (.lrc)<br/><span style="font-size:10.5px; opacity:0.7;">Place a matching .lrc file in the song folder or add lyrics in the tag editor.</span>');return}a&&(a.style.display="none"),r.lines.forEach((v,H)=>{const $=document.createElement("div");$.className="lyric-line",$.dataset.idx=String(H),$.dataset.time=String(v.time),$.textContent=v.text||"♪",v.time>=0&&($.style.cursor="pointer",$.title=`Seek to ${Math.floor(v.time/60)}:${Math.floor(v.time%60).toString().padStart(2,"0")}`,$.addEventListener("click",()=>{W("melo:seek-playback",v.time),window.__TAURI__||(t.currentTime=v.time,t.play().catch(()=>{}))})),i.appendChild($)})}}function k(){if(!i||!r.isSynced||!r.lines.length)return;const v=window.__TAURI__?d:t.currentTime;let H=-1;for(let $=0;$<r.lines.length&&r.lines[$].time<=v;$++)H=$;if(H!==m){m=H;const $=i.querySelectorAll(".lyric-line");if($.forEach((Q,rt)=>{Q.classList.toggle("active",rt===m),Q.classList.toggle("passed",rt<m)}),m>=0&&$[m]){const Q=$[m],rt=i.clientHeight,j=Q.offsetTop-i.offsetTop-rt/2+Q.clientHeight/2;i.scrollTo({top:Math.max(0,j),behavior:"smooth"})}}}t.addEventListener("timeupdate",k),window.addEventListener("lumi:trackChange",v=>{g(v.detail)}),ot("melo:track-changed",v=>{g(v)}),ot("melo:playback-state",v=>{v&&(d=Number(v.currentTime)||0,v.track&&v.track.id!==c?g(v.track):k())}),ot("melo:playback-position",v=>{d=Number(v)||0,k()});const I=window.__LUMI_QUEUE__;if(Array.isArray(I)&&I.length>0)g(I[((S=window.LumiPlayer)==null?void 0:S.currentIndex)||0]);else try{const v=JSON.parse(localStorage.getItem("melo-current-track")||"null");v&&g(v)}catch{}W("melo:request-playback-state"),setTimeout(()=>W("melo:request-playback-state"),250),window.LumiLyrics={loadTrackLyrics:g,parseLRC:ke}}let Pt=null;const Le=`<!doctype html>
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
`,ee={"compact-pill-light.html":Le,"compact-pill-dark.html":Se,"compact-pill-light":Le,"compact-pill-dark":Se},aa=[{id:"compact-pill-light",name:"Minimal Compact (Light)",filename:"compact-pill-light.html"},{id:"compact-pill-dark",name:"Minimal Compact (Dark)",filename:"compact-pill-dark.html"},{id:"full-html-example",name:"Full HTML Example",filename:"full-html-example.html"},{id:"example-custom",name:"Custom CSS Example",filename:"example-custom.html"}];function Pe(t){const e=["trackTitle","btnPlay","seekBar","coverImg"];let i=0;for(const a of e)t.includes(a)&&i++;return i>=3}function Ht(t,e){const i=document.getElementById("playerCard");if(!i)return;const a=i._originalHTML||i.innerHTML;i._originalHTML||(i._originalHTML=a),Pt&&(Pt.remove(),Pt=null);let r=[...t.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(b=>b[1]).join(`
`);r&&(Pt=document.createElement("style"),Pt.id="melo-custom-skin",Pt.textContent=r,document.head.appendChild(Pt));const c=Pe(t);let m="";const d=t.match(/<body[^>]*>([\s\S]*?)<\/body>/i);d?m=d[1]:m=t.split(/<\/style>/i).pop()||"";const s=document.createElement("div");s.innerHTML=m;const g=s.querySelector("#lumi-player");if(g&&(m=g.innerHTML),c&&m.trim().length>20){const b=m.trim();i.innerHTML=b,e&&e("Skin applied"),setTimeout(()=>{var I,S;(I=window.__LUMI_REBIND__)==null||I.call(window);const k=window.__LUMI_AUDIO__;k&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(k),(S=window.__LUMI_REBIND_MAIN__)==null||S.call(window)},40)}else r&&e&&e("Skin CSS applied");localStorage.setItem("lumi-custom-skin",t),localStorage.setItem("lumi-custom-skin-isFull",c?"1":"0")}function ce(t,e=!0){document.documentElement.classList.remove("compact-skin-active"),document.body.classList.remove("compact-skin-active"),Pt&&(Pt.remove(),Pt=null);const i=document.getElementById("playerCard");i&&i._originalHTML&&(i.innerHTML=i._originalHTML,setTimeout(()=>{var n,r;(n=window.__LUMI_REBIND__)==null||n.call(window);const a=window.__LUMI_AUDIO__;a&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(a),(r=window.__LUMI_REBIND_MAIN__)==null||r.call(window)},40)),localStorage.removeItem("lumi-custom-skin"),localStorage.removeItem("lumi-custom-skin-isFull"),localStorage.setItem("melo-active-skin-id","default"),e&&W("melo:skin-changed","default"),t&&t("Switched to Default Melo skin")}async function ze(){if(mt)try{const{invoke:t}=await Y(async()=>{const{invoke:i}=await import("./core-DhEqZVGG.js");return{invoke:i}},[]),e=await t("list_installed_skins");if(Array.isArray(e)&&e.length>0)return e}catch{}return aa}async function Re(t,e){if(mt)try{const{invoke:a}=await Y(async()=>{const{invoke:r}=await import("./core-DhEqZVGG.js");return{invoke:r}},[]),n=await a("read_skin_file",{filenameOrPath:t});if(n&&n.trim().length>0)return Ht(n,e),!0}catch{}try{const a=t.startsWith("skins/")?t:`skins/${t}`,n=await fetch(a);if(n.ok){const r=await n.text();return Ht(r,e),!0}}catch{}const i=t.replace(/^.*[\\/]/,"");return ee[i]?(Ht(ee[i],e),!0):(e&&e(`Could not load skin: ${t}`),!1)}async function Ut(t,e,i,a=!0){if(t==="default"){ce(i,a);return}let n=t;const r=t==="compact-pill"||t.startsWith("compact-pill");document.documentElement.classList.toggle("compact-skin-active",r),document.body.classList.toggle("compact-skin-active",r),r?n=e==="dark"?"compact-pill-dark.html":"compact-pill-light.html":!n.endsWith(".html")&&!n.endsWith(".htm")&&(n=n+".html");let c=!1;r&&ee[n]?(Ht(ee[n],i),c=!0):c=await Re(n,i),c&&(localStorage.setItem("melo-active-skin-id",t),a&&W("melo:skin-changed",t))}async function $e(t){if(mt)try{const{invoke:e}=await Y(async()=>{const{invoke:i}=await import("./core-DhEqZVGG.js");return{invoke:i}},[]);await e("open_skins_folder"),t&&t("Opening skins folder...")}catch{t&&t("Could not open skins folder")}else t&&t("Skins are located in the skins/ folder")}function ia(t){const e=document.getElementById("skinUpload"),i=document.getElementById("linkDownloadExample");i&&i.addEventListener("click",r=>{r.preventDefault(),Re("compact-pill-light.html")});const a=localStorage.getItem("melo-active-skin-id")||"default",n=localStorage.getItem("lumi-theme")||"dark";a!=="default"&&setTimeout(()=>{Ut(a,n,void 0,!1)},150),ot("melo:theme",r=>{const c=localStorage.getItem("melo-active-skin-id");c&&c!=="default"&&Ut(c,r,void 0,!1)}),ot("melo:skin-changed",r=>{if(r&&typeof r=="string"){const c=localStorage.getItem("lumi-theme")||"dark";Ut(r,c,void 0,!1)}}),e&&e.addEventListener("change",async()=>{var d;const r=(d=e.files)==null?void 0:d[0];if(!r)return;const c=await r.text(),m=r.name;if(mt)try{const{invoke:s}=await Y(async()=>{const{invoke:g}=await import("./core-DhEqZVGG.js");return{invoke:g}},[]);await s("save_custom_skin_file",{filename:m,content:c}),t(`Saved ${m} to skins folder`)}catch{}Ht(c,t),localStorage.setItem("melo-active-skin-id",m),W("melo:skin-changed",m),e.value=""}),document.addEventListener("dragover",r=>{var c;[...((c=r.dataTransfer)==null?void 0:c.types)||[]].includes("Files")&&r.preventDefault()}),document.addEventListener("drop",async r=>{var m;const c=[...((m=r.dataTransfer)==null?void 0:m.files)||[]].find(d=>d.name.endsWith(".html")||d.name.endsWith(".htm"));if(c){r.preventDefault();const d=await c.text();if(d.includes("<style")||d.includes("<html")||Pe(d)){const s=c.name;if(mt)try{const{invoke:g}=await Y(async()=>{const{invoke:b}=await import("./core-DhEqZVGG.js");return{invoke:b}},[]);await g("save_custom_skin_file",{filename:s,content:d})}catch{}Ht(d,t),localStorage.setItem("melo-active-skin-id",s),W("melo:skin-changed",s)}}}),window.LumiSkin={applyCustomSkin:Ht,resetSkin:ce,applySkinChoice:Ut,listInstalledSkins:ze,openSkinsFolderOnDisk:$e}}const na=(t,e,i)=>{const a=t[e];return a?typeof a=="function"?a():Promise.resolve(a):new Promise((n,r)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(r.bind(null,new Error("Unknown variable dynamic import: "+e+(e.split("/").length!==i?". Note that variables only represent file names one level deep.":""))))})},qe={code:"en",name:"English",nativeName:"English",authors:["Melo Team"]},de={_meta:qe,"settings.tabs.general":"General","settings.tabs.playback":"Playback","settings.tabs.appearance":"Appearance & Skin","settings.tabs.shortcuts":"Shortcuts","settings.tabs.about":"About","settings.general.language.label":"Language","settings.general.language.desc":"Interface language — more languages coming via community translation","settings.general.tray.label":"Close to system tray","settings.general.tray.desc":"Minimize to system tray on window close","settings.general.resume.label":"Resume playback on reopen","settings.general.resume.desc":"Continue playback of the previous track where you left off","settings.playback.replaygain.label":"ReplayGain normalization","settings.playback.replaygain.desc":"Equalize track volume levels automatically","settings.playback.fadepause.label":"Fade out on pause","settings.playback.fadepause.desc":"Smooth 0.3s fade-out on pause, fade back in on resume","settings.appearance.showstop.label":"Show Stop button","settings.appearance.showstop.desc":"Display a Stop control next to Play/Pause in the player"},oa=Object.freeze(Object.defineProperty({__proto__:null,_meta:qe,default:de},Symbol.toStringTag,{value:"Module"})),De=[{code:"en",nativeName:"English"}],Ot={en:de};let Oe=Ot.en,Ue="en";function ra(){return Ue}async function He(t){if(De.some(e=>e.code===t)||(t="en"),!Ot[t])if(t==="en")Ot.en=de;else try{const e=await na(Object.assign({"./locales/en.json":()=>Y(()=>Promise.resolve().then(()=>oa),void 0)}),`./locales/${t}.json`,3);Ot[t]=e.default||e}catch{t="en"}Ue=t,Oe=Ot[t]||Ot.en,localStorage.setItem("melo-pref-language",t),document.dispatchEvent(new CustomEvent("melo:locale-changed",{detail:t}))}function ht(t){var e,i;return(i=(e=Oe[t])!=null?e:Ot.en[t])!=null?i:t}function Me(){const t=localStorage.getItem("melo-pref-language")||"en";He(t)}const Ne=document.querySelector("#app");Ne.innerHTML=`
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
          <button class="settings-tab active" data-stab="general"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>${ht("settings.tabs.general")}</button>
          <button class="settings-tab" data-stab="playback"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4z"/></svg>${ht("settings.tabs.playback")}</button>
          <button class="settings-tab" data-stab="appearance"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>${ht("settings.tabs.appearance")}</button>
          <button class="settings-tab" data-stab="shortcuts"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M18 14h.01M9 14h6"/></svg>${ht("settings.tabs.shortcuts")}</button>
          <button class="settings-tab" data-stab="about"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>${ht("settings.tabs.about")}</button>
        </div>

        <!-- GENERAL TAB -->
        <div class="settings-section active" data-panel="general">
          <div class="settings-row">
            <div><div class="label">${ht("settings.general.language.label")}</div><div class="desc">${ht("settings.general.language.desc")}</div></div>
            <select class="settings-select" id="setLanguage">${De.map(t=>`<option value="${t.code}">${t.nativeName}</option>`).join("")}</select>
          </div>
          <div class="settings-row">
            <div><div class="label">${ht("settings.general.tray.label")}</div><div class="desc">${ht("settings.general.tray.desc")}</div></div>
            <div class="switch on" id="swTray" data-key="tray"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">${ht("settings.general.resume.label")}</div><div class="desc">${ht("settings.general.resume.desc")}</div></div>
            <div class="switch on" id="swResume" data-key="resume"></div>
          </div>
        </div>

        <!-- PLAYBACK TAB -->
        <div class="settings-section" data-panel="playback">
          <div class="settings-row">
            <div><div class="label">${ht("settings.playback.replaygain.label")}</div><div class="desc">${ht("settings.playback.replaygain.desc")}</div></div>
            <div class="switch on" id="swReplayGain" data-key="replayGainGlobal"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">${ht("settings.playback.fadepause.label")}</div><div class="desc">${ht("settings.playback.fadepause.desc")}</div></div>
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
            <div><div class="label">${ht("settings.appearance.showstop.label")}</div><div class="desc">${ht("settings.appearance.showstop.desc")}</div></div>
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
`;const ct=new URLSearchParams(location.search).get("panel");ct&&(document.documentElement.classList.add("panel-window",`panel-${ct}`),document.body.classList.add("panel-window",`panel-${ct}`));var Ae,Ce;if(mt&&ct){Y(async()=>{const{getCurrentWindow:a}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:a}},__vite__mapDeps([8,7,1,0])).then(({getCurrentWindow:a})=>{const n=a();ca(n,"melo-geo-panel-"+ct),n.onCloseRequested(()=>{W("melo:panel-closed",ct)}),window.addEventListener("beforeunload",()=>{W("melo:panel-closed",ct)})});const t=document.getElementById("win-"+ct),e=((Ae=t==null?void 0:t.querySelector(".float-title"))==null?void 0:Ae.innerHTML)||"",i=((Ce=t==null?void 0:t.querySelector(".float-body"))==null?void 0:Ce.innerHTML)||"";Ne.innerHTML=`
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
</div>`}mt&&!ct&&(document.documentElement.classList.add("tauri-main"),document.body.classList.add("tauri-main"),document.querySelectorAll(".side-actions .sbtn").forEach(t=>t.classList.remove("active")),Y(async()=>{const{WebviewWindow:t}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:t}},__vite__mapDeps([6,7,1,0,8])).then(({WebviewWindow:t})=>{const e=async()=>{var i;for(const a of["library","playlist","equalizer","lyrics","settings"])try{const n=await t.getByLabel("panel-"+a);(i=document.getElementById(pe[a]))==null||i.classList.toggle("active",!!n)}catch{}};e(),setInterval(e,1200)}));mt&&!ct&&(Y(()=>import("./window-BWd3Cypy.js"),__vite__mapDeps([8,7,1,0])).then(async({getCurrentWindow:t})=>{const e=t(),i=()=>{const n=localStorage.getItem("melo-active-skin-id"),r=n==="compact-pill"||typeof n=="string"&&n.startsWith("compact-pill");return{w:r?780:960,h:r?138:240}};try{const n=JSON.parse(localStorage.getItem("melo-geo-main")||"null"),{LogicalPosition:r,LogicalSize:c}=await Y(async()=>{const{LogicalPosition:g,LogicalSize:b}=await import("./dpi-fvP-W2qr.js");return{LogicalPosition:g,LogicalSize:b}},__vite__mapDeps([7,1])),m=i(),d=m.w===780,s=d?m.w:n!=null&&n.w?Math.max(650,n.w):m.w;await e.setSize(new c(s,m.h)),await e.setResizable(!d),(n==null?void 0:n.x)!=null&&(n==null?void 0:n.y)!=null&&await e.setPosition(new r(n.x,n.y))}catch{}const a=async()=>{try{const n=await e.outerPosition(),r=await e.innerSize(),c=i();localStorage.setItem("melo-geo-main",JSON.stringify({x:n.x,y:n.y,w:r.width,h:c.h}))}catch{}};e.onMoved(a),e.onResized(async()=>{try{const n=await e.innerSize(),r=i(),c=r.w===780,{LogicalSize:m}=await Y(async()=>{const{LogicalSize:d}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:d}},__vite__mapDeps([7,1]));if(!c){const d=n.toLogical(await e.scaleFactor());(d.width<650||d.height!==r.h)&&await e.setSize(new m(Math.max(650,d.width),r.h))}}catch{}a()}),ot("melo:skin-changed",async n=>{try{!ct&&n&&await Ut(n,zt,void 0,!1);const r=n==="compact-pill"||typeof n=="string"&&n.startsWith("compact-pill"),c=r?780:960,m=r?138:240,{LogicalSize:d}=await Y(async()=>{const{LogicalSize:s}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:s}},__vite__mapDeps([7,1]));await e.setSize(new d(c,m)),await e.setResizable(!r),a()}catch{}}),e.onCloseRequested(async n=>{if(n.preventDefault(),localStorage.getItem("melo-pref-tray")!=="0")try{await e.hide();return}catch{}const{WebviewWindow:c}=await Y(async()=>{const{WebviewWindow:m}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:m}},__vite__mapDeps([6,7,1,0,8]));for(const m of["library","playlist","equalizer","lyrics","settings"])try{const d=await c.getByLabel("panel-"+m);d&&await d.close()}catch{}try{await e.destroy()}catch{window.close()}})}),Y(()=>import("./core-DhEqZVGG.js"),[]).then(async({invoke:t})=>{try{const e=await t("get_cli_tracks");if(Array.isArray(e)&&e.length>0){const i=window.LumiLibrary,a=window.LumiPlayer;e.forEach(n=>n.source="import"),i==null||i.addToCurrentPlaylist(e),e.forEach(n=>a==null?void 0:a.queue.push(n)),setTimeout(()=>{if(a&&a.queue.length>0){const n=a.queue.findIndex(r=>r.id===e[0].id);a.loadTrack(n>=0?n:0,!0)}},150)}}catch{}}),ot("melo:open-files",t=>{if(Array.isArray(t)&&t.length>0){const e=window.LumiLibrary,i=window.LumiPlayer;t.forEach(a=>a.source="import"),e==null||e.addToCurrentPlaylist(t),t.forEach(a=>i==null?void 0:i.queue.push(a)),pt(`Playing ${t[0].title}`),setTimeout(()=>{if(i&&i.queue.length>0){const a=i.queue.findIndex(n=>n.id===t[0].id);i.loadTrack(a>=0?a:0,!0)}},150)}}));document.addEventListener("contextmenu",t=>{t.preventDefault()});const Kt=document.getElementById("toast"),pt=t=>{Kt&&(Kt.textContent=t,Kt.classList.add("show"),setTimeout(()=>Kt.classList.remove("show"),2200))},_t=new Audio;_t.preload="metadata";_t.crossOrigin="anonymous";window.__LUMI_AUDIO__=_t;window.__TOAST__=pt;let zt=localStorage.getItem("lumi-theme")||"dark";function ie(t){document.documentElement.setAttribute("data-theme",t),localStorage.setItem("lumi-theme",t),zt=t}function Ve(t){ie(t),W("melo:theme",t)}ie(zt);ot("melo:theme",t=>{(t==="light"||t==="dark")&&ie(t)});setInterval(()=>{const t=localStorage.getItem("lumi-theme");(t==="light"||t==="dark")&&t!==zt&&ie(t)},1e3);document.body.classList.toggle("show-stop-btn",localStorage.getItem("melo-pref-showStopBtn")==="1");ot("melo:pref-changed",t=>{t&&t.key==="showStopBtn"&&document.body.classList.toggle("show-stop-btn",!!t.value)});const la=["win-library","win-playlist","win-equalizer","win-lyrics","win-settings"],ae=document.getElementById("desktop"),Fe={btnToggleLibrary:"win-library",btnTogglePlaylist:"win-playlist",btnToggleEq:"win-equalizer",btnToggleLyrics:"win-lyrics",btnOpenSettings:"win-settings",menuToggleLibrary:"win-library",menuTogglePlaylist:"win-playlist",menuToggleEq:"win-equalizer",menuToggleLyrics:"win-lyrics",menuToggleSettings:"win-settings"};function sa(t){const e=document.getElementById(t);return!!e&&!e.classList.contains("hidden")}const pe={library:"btnToggleLibrary",playlist:"btnTogglePlaylist",equalizer:"btnToggleEq",lyrics:"btnToggleLyrics",settings:"btnOpenSettings"};async function ca(t,e){const i=async()=>{try{const a=await t.outerPosition(),n=await t.outerSize();localStorage.setItem(e,JSON.stringify({x:a.x,y:a.y,w:n.width,h:n.height}))}catch{}};t.onMoved(i),t.onResized(i)}async function da(t){const{WebviewWindow:e}=await Y(async()=>{const{WebviewWindow:g}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:g}},__vite__mapDeps([6,7,1,0,8])),i="panel-"+t,a=document.getElementById(pe[t]),n=await e.getByLabel(i);if(n){await n.close(),a==null||a.classList.remove("active");return}const r={library:[430,620],playlist:[440,560],equalizer:[700,440],lyrics:[380,520],settings:[600,540]},c={library:[360,400],playlist:[360,360],equalizer:[620,400],lyrics:[320,360],settings:[500,400]},m={library:"Library",playlist:"Playlist",equalizer:"Equalizer",lyrics:"Lyric",settings:"Settings"},d=r[t]||[420,520];let s=null;try{s=JSON.parse(localStorage.getItem("melo-geo-panel-"+t)||"null")}catch{}new e(i,{url:`/?panel=${t}`,title:m[t]||t,width:(s==null?void 0:s.w)||d[0],height:(s==null?void 0:s.h)||d[1],minWidth:(c[t]||[360,360])[0],minHeight:(c[t]||[360,360])[1],...(s==null?void 0:s.x)!=null?{x:s.x,y:s.y}:{center:!0},decorations:!1,transparent:!0,shadow:!1,skipTaskbar:!0}),a==null||a.classList.add("active"),W("melo:theme",zt)}ot("melo:panel-closed",t=>{var i;const e=pe[t];e&&((i=document.getElementById(e))==null||i.classList.remove("active"))});function ue(t){if(mt){da(t.replace(/^win-/,""));return}const e=sa(t);Xt(t,!e),e||ne(document.getElementById(t))}function pa(t){if(t.classList.contains("hidden")||!ae||window.matchMedia("(max-width: 860px)").matches)return;const e=ae.getBoundingClientRect();if(e.width<=0||e.height<=0)return;const i=t.getBoundingClientRect(),a=Math.min(i.width,e.width),n=Math.min(i.height,e.height);let r=i.left-e.left,c=i.top-e.top;r=Math.max(0,Math.min(e.width-a,r)),c=Math.max(0,Math.min(e.height-n,c)),t.style.left=r+"px",t.style.top=c+"px",t.style.right="auto",t.style.bottom="auto",t.style.transform="none"}function Xt(t,e){var n,r,c,m,d,s,g,b,k,I;const i=document.getElementById(t);if(!i)return;i.classList.toggle("hidden",!e),localStorage.setItem("lumiv2-"+t,e?"1":"0"),e&&pa(i);const a=e;t==="win-library"&&((n=document.getElementById("btnToggleLibrary"))==null||n.classList.toggle("active",a),(r=document.getElementById("menuToggleLibrary"))==null||r.classList.toggle("active",a)),t==="win-playlist"&&((c=document.getElementById("btnTogglePlaylist"))==null||c.classList.toggle("active",a),(m=document.getElementById("menuTogglePlaylist"))==null||m.classList.toggle("active",a)),t==="win-equalizer"&&((d=document.getElementById("btnToggleEq"))==null||d.classList.toggle("active",a),(s=document.getElementById("menuToggleEq"))==null||s.classList.toggle("active",a)),t==="win-lyrics"&&((g=document.getElementById("btnToggleLyrics"))==null||g.classList.toggle("active",a),(b=document.getElementById("menuToggleLyrics"))==null||b.classList.toggle("active",a)),t==="win-settings"&&((k=document.getElementById("btnOpenSettings"))==null||k.classList.toggle("active",a),(I=document.getElementById("menuToggleSettings"))==null||I.classList.toggle("active",a))}ct||la.forEach(t=>{const e=localStorage.getItem("lumiv2-"+t);e!==null?Xt(t,e==="1"):t==="win-settings"?Xt(t,!1):Xt(t,!0)});Object.entries(Fe).forEach(([t,e])=>{var i;(i=document.getElementById(t))==null||i.addEventListener("click",()=>ue(e))});document.querySelectorAll("[data-close]").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.close;Xt(e,!1)})});let Et=null,Tt=null,Ie=10;function ne(t){Ie++,t.style.zIndex=String(Ie),document.querySelectorAll(".float-win").forEach(e=>e.classList.remove("active")),t.classList.add("active")}document.querySelectorAll(".float-win").forEach(t=>{t.addEventListener("mousedown",()=>ne(t))});document.querySelectorAll("[data-drag]").forEach(t=>{t.addEventListener("mousedown",e=>{if(e.target.closest("button")||e.target.closest("input")||e.target.closest("select"))return;const i=t.dataset.drag,a=document.getElementById(i);ne(a),a.classList.add("dragging");const n=a.getBoundingClientRect();Et={id:i,startX:e.clientX,startY:e.clientY,initX:n.left,initY:n.top,width:n.width,height:n.height}})});document.querySelectorAll("[data-resize]").forEach(t=>{t.addEventListener("mousedown",e=>{e.stopPropagation();const i=t.dataset.resize,a=document.getElementById(i);ne(a),a.classList.add("resizing");const n=a.getBoundingClientRect();Tt={id:i,startX:e.clientX,startY:e.clientY,initW:n.width,initH:n.height}})});window.addEventListener("mousemove",t=>{if(Et){const e=document.getElementById(Et.id);let i=t.clientX-Et.startX,a=t.clientY-Et.startY,n=Et.initX+i,r=Et.initY+a;if(ae&&!window.matchMedia("(max-width: 860px)").matches){const c=ae.getBoundingClientRect(),m=c.left,d=c.right-Et.width,s=c.top,g=c.bottom-Et.height;n=Math.max(m,Math.min(d,n))-c.left,r=Math.max(s,Math.min(g,r))-c.top}e.style.left=n+"px",e.style.top=r+"px",e.style.right="auto",e.style.bottom="auto",e.style.transform="none"}if(Tt){const e=document.getElementById(Tt.id);let i=Tt.initW+(t.clientX-Tt.startX),a=Tt.initH+(t.clientY-Tt.startY);i=Math.max(260,i),a=Math.max(160,a),e.style.width=i+"px",e.style.height=a+"px"}});window.addEventListener("mouseup",()=>{if(Et){const t=document.getElementById(Et.id);t&&(t.classList.remove("dragging"),localStorage.setItem("lumiv2-pos-"+Et.id,JSON.stringify({left:t.style.left,top:t.style.top}))),Et=null}if(Tt){const t=document.getElementById(Tt.id);t&&(t.classList.remove("resizing"),localStorage.setItem("lumiv2-size-"+Tt.id,JSON.stringify({width:t.style.width,height:t.style.height}))),Tt=null}});async function We(){const t=window.LumiLibrary,e=window.LumiPlayer;if(mt){try{const{open:a}=await Y(async()=>{const{open:d}=await import("./index-CS3Qnt9j.js");return{open:d}},__vite__mapDeps([5,1])),n=await a({multiple:!0,filters:[{name:"Audio",extensions:["mp3","flac","wav","aac","ogg","m4a","alac","opus","wma","aiff"]}]});if(!n)return;const r=Array.isArray(n)?n:[n],{invoke:c}=await Y(async()=>{const{invoke:d}=await import("./core-DhEqZVGG.js");return{invoke:d}},[]),m=[];for(const d of r)try{const s=await c("scan_library",{path:d});if(s&&s.length)s.forEach(g=>g.source="import"),m.push(...s);else{const g=d.replace(/^.*[\\/]/,""),b=g.lastIndexOf("."),k=b>0?g.slice(0,b):g,I=b>0?g.slice(b+1).toUpperCase():"AUDIO";m.push({id:d,title:k,artist:"Unknown Artist",album:"Single",duration:0,path:d,codec:I,specs:"Local File",source:"import"})}}catch{const s=d.replace(/^.*[\\/]/,""),g=s.lastIndexOf("."),b=g>0?s.slice(0,g):s,k=g>0?s.slice(g+1).toUpperCase():"AUDIO";m.push({id:d,title:b,artist:"Unknown Artist",album:"Single",duration:0,path:d,codec:k,specs:"Local File",source:"import"})}t==null||t.addTracks(m,!0),t==null||t.addToCurrentPlaylist(m),m.forEach(d=>e==null?void 0:e.queue.push(d)),W("melo:play-tracks",{tracks:m,index:0}),pt(`${m.length} file(s) added`)}catch{pt("Error opening files")}return}const i=document.createElement("input");i.type="file",i.multiple=!0,i.accept="audio/*,.mp3,.flac,.wav,.aac,.ogg,.m4a,.alac,.opus,.wma,.aiff",i.onchange=async()=>{const a=Array.from(i.files||[]);if(!a.length)return;const n=[];for(const r of a){const c=r.path,m=c||URL.createObjectURL(r),d=r.name,s=d.lastIndexOf("."),g=s>0?d.slice(0,s):d,b=s>0?d.slice(s+1).toUpperCase():"AUDIO",k={id:c||"imp_"+Math.random().toString(36).slice(2,9),title:g,artist:"Unknown Artist",album:"Single",duration:0,path:m,codec:b,specs:"Local File",source:"import"};await Jt(r,k),n.push(k)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(r=>e==null?void 0:e.queue.push(r)),W("melo:play-tracks",{tracks:n,index:0}),pt(`${n.length} file(s) added`)},i.click()}async function je(){const t=window.LumiLibrary,e=window.LumiPlayer;if(mt){try{const{open:a}=await Y(async()=>{const{open:s}=await import("./index-CS3Qnt9j.js");return{open:s}},__vite__mapDeps([5,1])),n=await a({directory:!0});if(!n)return;const r=n,{invoke:c}=await Y(async()=>{const{invoke:s}=await import("./core-DhEqZVGG.js");return{invoke:s}},[]),d=(await c("scan_library",{path:r})).map(s=>({...s,source:"import"}));t==null||t.addTracks(d,!0),t==null||t.addToCurrentPlaylist(d),d.forEach(s=>e==null?void 0:e.queue.push(s)),W("melo:play-tracks",{tracks:d,index:0}),pt(`${d.length} track(s) added from folder`)}catch{pt("Error scanning folder")}return}const i=document.createElement("input");i.type="file",i.webkitdirectory=!0,i.multiple=!0,i.accept="audio/*",i.onchange=async()=>{const a=Array.from(i.files||[]).filter(r=>/\.(mp3|flac|wav|aac|ogg|m4a|alac|opus|wma|aiff)$/i.test(r.name));if(!a.length)return;const n=[];for(const r of a){const c=r.path,m=c||URL.createObjectURL(r),d=r.name,s=d.lastIndexOf("."),g=s>0?d.slice(0,s):d,b=s>0?d.slice(s+1).toUpperCase():"AUDIO",k={id:c||"imp_"+Math.random().toString(36).slice(2,9),title:g,artist:"Unknown Artist",album:"Folder Import",duration:0,path:m,codec:b,specs:"Local File",source:"import"};await Jt(r,k),n.push(k)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(r=>e==null?void 0:e.queue.push(r)),W("melo:play-tracks",{tracks:n,index:0}),pt(`${n.length} file(s) added from folder`)},i.click()}document.addEventListener("click",t=>{var i;const e=(i=t.target)==null?void 0:i.closest("#btnAddFiles, #btnAddFolder, #btnThemeToggle");e&&(e.id==="btnAddFiles"?We():e.id==="btnAddFolder"?je():e.id==="btnThemeToggle"&&Ve(zt==="light"?"dark":"light"))});window.addEventListener("keydown",t=>{(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="o"&&(t.shiftKey?(t.preventDefault(),je()):(t.preventDefault(),We())),((t.ctrlKey||t.metaKey)&&t.key===","||t.key==="F2")&&(t.preventDefault(),ue("win-settings"))});function _e(t){var k,I;function e(S){document.querySelectorAll(".settings-tab").forEach(v=>{v.classList.toggle("active",v.dataset.stab===S)}),document.querySelectorAll(".settings-section[data-panel]").forEach(v=>{v.classList.toggle("active",v.dataset.panel===S)}),localStorage.setItem("melo-settings-tab",S)}document.querySelectorAll(".settings-tab").forEach(S=>{S.addEventListener("click",()=>e(S.dataset.stab))}),e(localStorage.getItem("melo-settings-tab")||"general"),document.querySelectorAll(".switch[data-key]").forEach(S=>{const v=S.dataset.key,H=localStorage.getItem("melo-pref-"+v);H!==null&&S.classList.toggle("on",H==="1"),S.onclick=()=>{S.classList.toggle("on");const $=S.classList.contains("on");localStorage.setItem("melo-pref-"+v,$?"1":"0"),W("melo:pref-changed",{key:v,value:$})}});const i=document.getElementById("setLanguage");i&&(i.value=ra(),i.onchange=async()=>{await He(i.value),t(`Language set to ${i.options[i.selectedIndex].text} — restart Melo to fully apply`)});const a=document.getElementById("swDynamicTheme");if(a){const S=localStorage.getItem("melo-dynamic-theme")!=="0";a.classList.toggle("on",S),a.onclick=()=>{var Q,rt;const v=!a.classList.contains("on");a.classList.toggle("on",v),localStorage.setItem("melo-dynamic-theme",v?"1":"0");const H=window.__LUMI_QUEUE__,$=(rt=(Q=window.LumiPlayer)==null?void 0:Q.currentIndex)!=null?rt:0;H&&H[$]&&Be(v?H[$].cover:null),t(v?"Dynamic theme enabled":"Dynamic theme disabled")}}const n=document.getElementById("skinSelect"),r=document.getElementById("btnSkinThemeToggle"),c=document.getElementById("btnRefreshSkins"),m=document.getElementById("btnOpenSkinsFolder"),d=document.getElementById("skinThemeIcon"),s=document.getElementById("skinThemeLabel");function g(S){d&&(d.textContent=S==="dark"?"🌙":"☀️"),s&&(s.textContent=S==="dark"?"Dark":"Light")}g(zt),r==null||r.addEventListener("click",()=>{const S=zt==="dark"?"light":"dark";Ve(S),g(S),t(S==="dark"?"Dark theme":"Light theme")}),ot("melo:theme",S=>{(S==="light"||S==="dark")&&g(S)});async function b(){if(!n)return;const S=localStorage.getItem("melo-active-skin-id")||"default",v=await ze();n.innerHTML=`
      <option value="default">Default Melo (Standard)</option>
      <option value="compact-pill">Minimal Compact (Pill Bar)</option>
    `,v.forEach(H=>{if(H.filename!=="compact-pill-light.html"&&H.filename!=="compact-pill-dark.html"){const $=document.createElement("option");$.value=H.filename,$.textContent=`${H.name} (${H.filename})`,n.appendChild($)}}),n.value=S}b(),n&&(n.onchange=()=>{const S=n.value;Ut(S,zt,t)}),c==null||c.addEventListener("click",async()=>{await b();const S=localStorage.getItem("melo-active-skin-id")||"default";Ut(S,zt,t),t("Skins reloaded from disk")}),m==null||m.addEventListener("click",()=>{$e(t)}),(k=document.getElementById("btn-reset-skin-settings"))==null||k.addEventListener("click",()=>{ce(t),n&&(n.value="default")}),(I=document.getElementById("btn-settings-reset"))==null||I.addEventListener("click",()=>{localStorage.clear(),t("Settings reset — reloading..."),setTimeout(()=>location.reload(),600)})}function Ge(){document.querySelectorAll(".win-btn").forEach(t=>{t.onclick=async()=>{const e=t.getAttribute("aria-label");if(window.__TAURI__){const{getCurrentWindow:i}=await Y(async()=>{const{getCurrentWindow:n}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:n}},__vite__mapDeps([8,7,1,0])),a=i();e==="minimize"?a.minimize():e==="maximize"?a.toggleMaximize():e==="close"&&a.close()}else e==="close"&&pt("Window close requires the Tauri desktop build"),e==="maximize"&&pt("Resize: drag corner handle")}})}Ge();window.__LUMI_REBIND_MAIN__=()=>{Ge(),Object.entries(Fe).forEach(([t,e])=>{const i=document.getElementById(t);i&&(i.onclick=()=>ue(e))})};const Ft=document.createElement("div");Ft.id="scanBar";document.body.appendChild(Ft);let Te=0;ot("melo:scan-progress",t=>{if(!t)return;const e=t.total?Math.round(t.done/t.total*100):100;Ft.style.opacity="1",Ft.style.width=e+"%",clearTimeout(Te),(t.finished||t.total&&t.done>=t.total)&&(Te=setTimeout(()=>{Ft.style.opacity="0",Ft.style.width="0"},800))});mt&&!ct&&ot("melo:scan-batch",t=>{const e=window.LumiLibrary;e&&Array.isArray(t)&&t.length&&(t.forEach(i=>i.source="scan"),e.addTracks(t,!0),e.addToCurrentPlaylist(t))});const Nt=document.createElement("div");Nt.id="aboutPop";Nt.style.display="none";document.body.appendChild(Nt);document.addEventListener("click",t=>{var e,i;(e=t.target)!=null&&e.closest("#btnAbout")&&(t.stopPropagation(),Nt.innerHTML=`
    <div class="about-head">Melo <b>0.3 Beta</b></div>
    <div style="font-size:11.5px; color:var(--text-soft); margin:6px 0 10px;">
      Modern Windows Music Player<br/>
      Tauri 2 + TypeScript + Rust
    </div>
    <a class="about-link" id="aboutLink" href="https://github.com/Arvanta/Melo" rel="noopener">github.com/Arvanta/Melo ↗</a>`,Nt.style.display=Nt.style.display==="none"?"block":"none",(i=document.getElementById("aboutLink"))==null||i.addEventListener("click",a=>{a.preventDefault();const n="https://github.com/Arvanta/Melo";mt?Y(()=>import("./core-DhEqZVGG.js"),[]).then(r=>r.invoke("open_url",{url:n})).catch(()=>window.open(n,"_blank")):window.open(n,"_blank")}))});document.addEventListener("click",t=>{!t.target.closest("#aboutPop")&&!t.target.closest("#btnAbout")&&(Nt.style.display="none")});mt&&ct?ct==="library"||ct==="playlist"?we(_t,pt):ct==="equalizer"?xe(_t,pt,{remote:!0}):ct==="lyrics"?Ee(_t):ct==="settings"&&(Me(),_e(pt)):(ta(_t,pt),we(_t,pt),xe(_t,pt),ea(_t),Ee(_t),ia(pt),_e(pt),Me(),setTimeout(()=>{if(localStorage.getItem("melo-pref-resume")!=="0")try{const t=JSON.parse(localStorage.getItem("melo-resume-state")||"null"),e=window.LumiLibrary,i=window.LumiPlayer;if(!(t!=null&&t.trackId)||!e||!i)return;const a=e.tracks,n=a.findIndex(r=>r.id===t.trackId);if(n===-1)return;i.queue=a,i.loadTrack(n,!1,t.position||0)}catch{}},400));ct||pt("Melo 0.3 Beta is ready");
//# sourceMappingURL=index-DesoPt3X.js.map
