const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/event-CNdo2oXa.js","assets/core-DhEqZVGG.js","assets/index-DiyoAAdc.js","assets/index-CHth0gh2.js","assets/index-Bq0iOnRE.js","assets/index-CS3Qnt9j.js","assets/webviewWindow-mjQkSB26.js","assets/dpi-fvP-W2qr.js","assets/window-BWd3Cypy.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function i(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=i(n);fetch(n.href,r)}})();const Ye="modulepreload",Je=function(t){return"/"+t},ve={},X=function(e,i,a){let n=Promise.resolve();if(i&&i.length>0){let c=function(s){return Promise.all(s.map(g=>Promise.resolve(g).then(y=>({status:"fulfilled",value:y}),y=>({status:"rejected",reason:y}))))};document.getElementsByTagName("link");const m=document.querySelector("meta[property=csp-nonce]"),d=(m==null?void 0:m.nonce)||(m==null?void 0:m.getAttribute("nonce"));n=c(i.map(s=>{if(s=Je(s),s in ve)return;ve[s]=!0;const g=s.endsWith(".css"),y=g?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${y}`))return;const k=document.createElement("link");if(k.rel=g?"stylesheet":Ye,g||(k.as="script"),k.crossOrigin="",k.href=s,d&&k.setAttribute("nonce",d),document.head.appendChild(k),g)return new Promise((_,S)=>{k.addEventListener("load",_),k.addEventListener("error",()=>S(new Error(`Unable to preload CSS for ${s}`)))})}))}function r(c){const m=new Event("vite:preloadError",{cancelable:!0});if(m.payload=c,window.dispatchEvent(m),!m.defaultPrevented)throw c}return n.then(c=>{for(const m of c||[])m.status==="rejected"&&r(m.reason);return e().catch(r)})},ut=typeof window.__TAURI_INTERNALS__<"u"||typeof window.__TAURI__<"u";async function j(t,e){if(ut)try{const{emit:i}=await X(async()=>{const{emit:a}=await import("./event-CNdo2oXa.js");return{emit:a}},__vite__mapDeps([0,1]));await i(t,e);return}catch{}window.dispatchEvent(new CustomEvent(t,{detail:e}))}function ot(t,e){ut&&X(async()=>{const{listen:i}=await import("./event-CNdo2oXa.js");return{listen:i}},__vite__mapDeps([0,1])).then(({listen:i})=>{i(t,a=>{e(a.payload)})}).catch(()=>{}),window.addEventListener(t,i=>e(i.detail))}let ye=!1;async function Xe(){if(!ye){ye=!0;try{const t=globalThis;if(typeof t.Buffer>"u"){const e=await X(()=>import("./index-DiyoAAdc.js").then(i=>i.i),__vite__mapDeps([2,3]));t.Buffer=e.Buffer}typeof t.process>"u"&&(t.process={env:{},browser:!0,nextTick:e=>setTimeout(e,0)})}catch{}}}async function Ze(t,e){var i;try{await Xe();const a=await X(()=>import("./index-Bq0iOnRE.js").then(s=>s.i),__vite__mapDeps([4,3])),n=a&&typeof a.parseBlob=="function"?a:a.default||a,r=await Promise.race([n.parseBlob(t),new Promise((s,g)=>setTimeout(()=>g(new Error("timeout")),1800))]),c=r==null?void 0:r.common;if(!c)return;c.title&&(e.title=c.title),c.artist?e.artist=c.artist:c.artists&&c.artists[0]&&(e.artist=c.artists[0]),c.album&&(e.album=c.album),c.genre&&c.genre[0]&&(e.genre=c.genre[0]),c.year&&(e.year=c.year);const m=(i=c.picture)==null?void 0:i[0];if(m&&m.data){const s=m.format||"image/jpeg",g=m.data;if(g.length>6e5)return;let y="";const k=8192;for(let _=0;_<g.length;_+=k){const S=g.subarray(_,_+k);y+=String.fromCharCode.apply(null,S)}e.cover=`data:${s};base64,${btoa(y)}`}const d=r==null?void 0:r.format;d&&d.duration&&!e.duration&&(e.duration=Math.floor(d.duration))}catch{}}async function Jt(t,e,i=1800){return await Ze(t,e),e}async function Qe(t){return new Promise(e=>{if(!t)return e(null);const i=new Image;i.crossOrigin="anonymous",i.onload=()=>{try{const a=document.createElement("canvas"),n=a.getContext("2d");if(!n)return e(null);a.width=40,a.height=40,n.drawImage(i,0,0,40,40);const r=n.getImageData(0,0,40,40).data;let c={r:42,g:123,b:214},m=-1;for(let d=0;d<r.length;d+=4){const s=r[d],g=r[d+1],y=r[d+2];if(r[d+3]<128)continue;const _=Math.max(s,g,y),S=Math.min(s,g,y),b=(_+S)/510,H=_-S,$=H===0?0:H/(1-Math.abs(2*b-1));if($>.25&&b>.25&&b<.82){const Q=$*1.5+(1-Math.abs(b-.5));Q>m&&(m=Q,c={r:s,g,b:y})}}m>0?e(c):e(null)}catch{e(null)}},i.onerror=()=>e(null),i.src=t})}async function Ce(t){const e=localStorage.getItem("melo-dynamic-theme")!=="0",i=document.documentElement;if(!e||!t){i.style.removeProperty("--accent"),i.style.removeProperty("--visualizer"),i.style.removeProperty("--accent-glow");return}const a=await Qe(t);if(a){const n=`rgb(${a.r}, ${a.g}, ${a.b})`;i.style.setProperty("--accent",n),i.style.setProperty("--visualizer",n),i.style.setProperty("--accent-glow",`rgba(${a.r}, ${a.g}, ${a.b}, 0.35)`)}else i.style.removeProperty("--accent"),i.style.removeProperty("--visualizer"),i.style.removeProperty("--accent-glow")}const Gt=[31,62,125,250,500,1e3,2e3,4e3,8e3,16e3];let Lt=null,oe=null,re=[],Wt=null,Vt=null;function Kt(t){if(!Lt){const e=window.AudioContext||window.webkitAudioContext;Lt=new e;try{oe=Lt.createMediaElementSource(t)}catch{}if(re=Gt.map(i=>{const a=Lt.createBiquadFilter();return a.type="peaking",a.frequency.value=i,a.Q.value=1.4,a.gain.value=0,a}),Wt=Lt.createGain(),Wt.gain.value=1,Vt=Lt.createAnalyser(),Vt.fftSize=2048,Vt.smoothingTimeConstant=.72,oe){let i=oe;for(const a of re)i.connect(a),i=a;i.connect(Wt),Wt.connect(Vt),Vt.connect(Lt.destination)}}return{ctx:Lt,filters:re,gain:Wt,analyser:Vt,async resume(){Lt&&Lt.state==="suspended"&&await Lt.resume().catch(()=>{})}}}function Ke(t,e){let i,a,n,r,c,m,d,s=null,g,y,k,_,S,b,H,$,Q,st,at,G,u=[],M=0,B=!1,Y="off",dt=!1;function _t(){if(!u.length)return null;if(Y==="one")return M;let l=M+1;if(B&&(l=Math.floor(Math.random()*u.length),l===M&&u.length>1&&(l=(l+1)%u.length)),l>=u.length)if(Y==="all")l=0;else return null;return l}window.__LUMI_QUEUE__=u,window.__LUMI_SET_QUEUE__=l=>{u=l,window.__LUMI_QUEUE__=l};function rt(l){if(!isFinite(l))return"0:00";const z=Math.floor(l/60),R=Math.floor(l%60).toString().padStart(2,"0");return`${z}:${R}`}function K(){if(!g)return;const l=parseFloat(g.max)||100,z=parseFloat(g.value)||0,R=l>0?z/l*100:0;g.style.setProperty("--progress",R+"%")}function ct(){y&&y.style.setProperty("--vol",y.value+"%")}async function Tt(l){if(!l)return"";if(/^(https?|data|blob):/.test(l))return l;if(ut)try{const{convertFileSrc:z}=await X(async()=>{const{convertFileSrc:R}=await import("./core-DhEqZVGG.js");return{convertFileSrc:R}},[]);return z(l)}catch{}return l}async function ht(l,z=!0,R){if(!u.length)return;l<0&&(l=u.length-1),l>=u.length&&(l=0),M=l;const V=u[l];if(V){if(b||q(),t.src=await Tt(V.path),t.load(),R&&R>0){const it=()=>{t.removeEventListener("loadedmetadata",it);try{t.currentTime=R}catch{}};t.addEventListener("loadedmetadata",it)}b&&(b.textContent=V.title||"Unknown Title"),H&&(H.textContent=V.artist||"Unknown Artist"),$&&($.textContent=V.album||""),Q&&(Q.textContent=V.codec||"AUDIO"),st&&(st.textContent=V.specs||""),V.cover&&at?(at.src=V.cover,at.style.display="block",G&&(G.style.display="none")):(at&&(at.style.display="none"),G&&(G.style.display="grid")),g&&(g.max=String(V.duration||240),g.value="0",K()),_&&(_.textContent=rt(V.duration)),k&&(k.textContent="0:00"),tt(),Ce(V.cover||null),document.querySelectorAll(".track-row").forEach((it,N)=>{var Nt;it.classList.toggle("active",((Nt=u[N])==null?void 0:Nt.id)===V.id)}),"mediaSession"in navigator&&(navigator.mediaSession.metadata=new MediaMetadata({title:V.title,artist:V.artist,album:V.album,artwork:V.cover?[{src:V.cover,sizes:"512x512",type:"image/jpeg"}]:[]}),navigator.mediaSession.setActionHandler("play",()=>Et()),navigator.mediaSession.setActionHandler("pause",()=>Rt()),navigator.mediaSession.setActionHandler("previoustrack",()=>T()),navigator.mediaSession.setActionHandler("nexttrack",()=>P()),navigator.mediaSession.setActionHandler("seekto",it=>{it.seekTime&&(t.currentTime=it.seekTime)})),z&&Et();try{const{cover:it,...N}=V;localStorage.setItem("melo-current-track",JSON.stringify(N))}catch{}window.dispatchEvent(new CustomEvent("lumi:trackChange",{detail:V})),j("melo:track-changed",V),j("melo:playback-state",{track:V,currentTime:t.currentTime||0,paused:t.paused})}}let wt=!1;async function zt(){try{await Kt(t).resume()}catch{}wt&&(wt=!1,t.play().then(()=>{a&&(a.style.display="none"),n&&(n.style.display="block")}).catch(()=>{}))}window.addEventListener("pointerdown",zt),window.addEventListener("keydown",zt),ot("melo:pref-changed",l=>{l&&l.key==="replayGainGlobal"&&tt(),l&&l.key==="showStopBtn"&&Z(!!l.value)}),ot("melo:request-playback-state",()=>{const l=u[M]||null;j("melo:playback-state",{track:l,currentTime:t.currentTime||0,paused:t.paused})}),ot("melo:seek-playback",l=>{const z=Number(l);Number.isFinite(z)&&z>=0&&(t.currentTime=z)});let kt=null,bt=!1;function Dt(l,z,R){kt&&cancelAnimationFrame(kt);const V=t.volume,it=performance.now(),N=Nt=>{const At=Math.min(1,(Nt-it)/z);t.volume=V+(l-V)*At,At<1?kt=requestAnimationFrame(N):(kt=null,R==null||R())};kt=requestAnimationFrame(N)}async function Et(){try{await Kt(t).resume()}catch{}const l=localStorage.getItem("melo-pref-fadePause")==="1",z=I();l&&bt&&(t.volume=0),t.play().then(()=>{wt=!1,a&&(a.style.display="none"),n&&(n.style.display="block"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="playing"),l&&bt?(bt=!1,Dt(z,300)):t.volume=z}).catch(()=>{wt||(wt=!0,e("Click once inside player to begin audio playback"))})}function Rt(){localStorage.getItem("melo-pref-fadePause")==="1"&&!t.paused?(bt=!0,Dt(0,300,()=>t.pause())):(bt=!1,t.pause()),a&&(a.style.display="block"),n&&(n.style.display="none"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused");const z=u[M];if(z)try{localStorage.setItem("melo-resume-state",JSON.stringify({trackId:z.id,position:t.currentTime}))}catch{}}function v(){t.paused?Et():Rt()}function L(){t.pause();try{t.currentTime=0}catch{}a&&(a.style.display="block"),n&&(n.style.display="none"),g&&(g.value="0",K()),k&&(k.textContent="0:00"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}function P(){if(!u.length)return;if(Y==="one"){t.currentTime=0,Et();return}const l=_t();if(l===null){Rt();return}ht(l)}function T(){if(!u.length)return;if(t.currentTime>3){t.currentTime=0;return}let l=M-1;B&&(l=Math.floor(Math.random()*u.length)),l<0&&(Y==="all"?l=u.length-1:l=0),ht(l)}function I(){var N;const l=u[M];if(!y)return 1;const z=parseInt(y.value,10)/100,V=localStorage.getItem("melo-pref-replayGainGlobal")!=="0"&&(N=l==null?void 0:l.replayGain)!=null?N:0,it=Math.pow(10,V/20);return Math.min(1,Math.max(0,z*it))}function tt(){!u[M]||!y||(t.volume=I())}function Z(l=localStorage.getItem("melo-pref-showStopBtn")==="1"){const z=document.getElementById("btnStop");z&&z.style.setProperty("display",l?"inline-flex":"none","important")}function q(){if(i=document.getElementById("btnPlay"),a=document.getElementById("iconPlay"),n=document.getElementById("iconPause"),r=document.getElementById("btnPrev"),c=document.getElementById("btnNext"),m=document.getElementById("btnShuffle"),d=document.getElementById("btnRepeat"),s=document.getElementById("btnStop"),Z(),g=document.getElementById("seekBar"),y=document.getElementById("volBar"),k=document.getElementById("curTime"),_=document.getElementById("durTime"),S=document.getElementById("volPct"),b=document.getElementById("trackTitle"),H=document.getElementById("trackArtist"),$=document.getElementById("trackAlbum"),Q=document.getElementById("trackCodec"),st=document.getElementById("trackSpecs"),at=document.getElementById("coverImg"),G=document.getElementById("coverFallback"),i&&(i.onclick=v),s&&(s.onclick=L),r&&(r.onclick=T),c&&(c.onclick=P),m&&(m.onclick=()=>{B=!B,m.classList.toggle("active",B),e(B?"Shuffle on":"Shuffle off")}),d&&(d.onclick=()=>{Y=Y==="off"?"all":Y==="all"?"one":"off",d.classList.toggle("active",Y!=="off");const l={off:"Repeat off",all:"Repeat all",one:"Repeat one"};e(l[Y]),d.title=l[Y]}),g&&(g.oninput=()=>{dt=!0,k&&(k.textContent=rt(parseFloat(g.value))),K()},g.onchange=()=>{t.currentTime=parseFloat(g.value),dt=!1}),y&&(y.oninput=()=>{ct(),S&&(S.textContent=y.value+"%"),tt()}),K(),ct(),u[M]){const l=u[M];b&&(b.textContent=l.title||"Unknown Title"),H&&(H.textContent=l.artist||"Unknown Artist"),$&&($.textContent=l.album||""),Q&&(Q.textContent=l.codec||"AUDIO"),st&&(st.textContent=l.specs||""),l.cover&&at&&(at.src=l.cover,at.style.display="block",G&&(G.style.display="none"))}}q(),t.addEventListener("timeupdate",()=>{j("melo:playback-position",t.currentTime||0),!dt&&g&&k&&(g.value=String(Math.floor(t.currentTime)),k.textContent=rt(t.currentTime),K()),lt()});let D=null;function lt(){D||(D=setTimeout(()=>{D=null;const l=u[M];if(!(!l||t.paused))try{localStorage.setItem("melo-resume-state",JSON.stringify({trackId:l.id,position:t.currentTime}))}catch{}},4e3))}t.addEventListener("loadedmetadata",()=>{var z;if(!g||!_)return;const l=Math.floor(t.duration||((z=u[M])==null?void 0:z.duration)||240);g.max=String(l),_.textContent=rt(l),K()}),t.addEventListener("ended",()=>{P()}),window.addEventListener("keydown",l=>{l.target.tagName!=="INPUT"&&(l.code==="Space"&&(l.preventDefault(),v()),l.code==="ArrowRight"&&(t.currentTime+=5),l.code==="ArrowLeft"&&(t.currentTime-=5),(l.key==="m"||l.key==="M")&&(t.muted=!t.muted,e(t.muted?"Muted":"Unmuted")),(l.key==="s"||l.key==="S")&&m&&m.click(),(l.key==="r"||l.key==="R")&&d&&d.click(),l.code==="ArrowUp"&&y&&(y.value=String(Math.min(100,parseInt(y.value,10)+5)),y.dispatchEvent(new Event("input"))),l.code==="ArrowDown"&&y&&(y.value=String(Math.max(0,parseInt(y.value,10)-5)),y.dispatchEvent(new Event("input"))))}),ot("melo:tray-action",l=>{l==="play_pause"?v():l==="next"?P():l==="prev"?T():l==="mute"&&(t.muted=!t.muted,e(t.muted?"Muted":"Unmuted"))}),window.LumiPlayer={get queue(){return u},set queue(l){u=l,window.__LUMI_QUEUE__=l},get currentIndex(){return M},loadTrack:ht,play:Et,pause:Rt,stop:L,next:P,prev:T,get audio(){return t},rebind:q},window.__LUMI_REBIND__=q,ot("melo:play-tracks",l=>{if(!l||!Array.isArray(l.tracks)||!l.tracks.length)return;u=l.tracks,window.__LUMI_SET_QUEUE__(u);const z=Math.max(0,Math.min(l.index||0,u.length-1));ht(z,!0)})}const Ct=ut,$t=new URLSearchParams(location.search).get("panel")||"main";let et=[],yt=[];try{const t=localStorage.getItem("melo-playlists");if(t){const e=JSON.parse(t);Array.isArray(e)&&e.length&&(yt=e)}}catch{}yt.length||(yt=[{id:"p1",name:"Favorites",tracks:[],createdAt:Date.now()}]);try{const t=localStorage.getItem("melo-tracks");if(t){const e=JSON.parse(t);Array.isArray(e)&&(et=e)}}catch{}function be(t,e){var me,ge,fe,he;const i=document.getElementById("trackList");document.getElementById("playlistList");const a=document.getElementById("winPlaylistTracks"),n=document.getElementById("winPlaylistEmpty"),r=document.getElementById("playlistSelect"),c=document.getElementById("searchInput"),m=document.getElementById("libraryStats"),d=document.getElementById("btn-scan"),s=document.getElementById("btn-export-playlist"),g=document.getElementById("btn-new-playlist"),y=document.getElementById("queueList"),k=document.getElementById("tagEditor"),_=document.getElementById("tagTitle"),S=document.getElementById("tagArtist"),b=document.getElementById("tagAlbum"),H=document.getElementById("tagYear"),$=document.getElementById("tagCover");let Q="",st=localStorage.getItem("melo-currentPlaylist")||((me=yt[0])==null?void 0:me.id)||"",at="",G="artists",u=null,M=null,B=null,Y=null,dt=[];(ge=document.getElementById("libraryTabs"))==null||ge.querySelectorAll(".tab").forEach(o=>{o.addEventListener("click",()=>{document.querySelectorAll("#libraryTabs .tab").forEach(p=>p.classList.remove("active")),o.classList.add("active"),G=o.dataset.libtab,u=M=B=Y=null,N()})}),c==null||c.addEventListener("input",()=>{Q=c.value.toLowerCase(),N()}),N(),At();async function _t(o){const{invoke:p}=await X(async()=>{const{invoke:A}=await import("./core-DhEqZVGG.js");return{invoke:A}},[]),{listen:f}=await X(async()=>{const{listen:A}=await import("./event-CNdo2oXa.js");return{listen:A}},__vite__mapDeps([0,1]));let h=0,x=0,O=0;e("Scanning folder…");const U=await f("melo:scan-batch",A=>{const E=Array.isArray(A.payload)?A.payload:[];E.length&&(E.forEach(W=>W.source="scan"),O+=E.length,zt(E,!1,!0),kt(E,!0),Zt())}),w=await f("melo:scan-progress",A=>{const E=A.payload||{};x=E.done||0,h=E.total||0,!E.finished&&h&&e(`Scanning… ${x}/${h} files`)});try{const A=await p("scan_library",{path:o});return U(),w(),Zt(),Ct&&j("melo:tracks-add",{src:$t,list:A.map(E=>({...E,source:"scan"}))}),e(`${O||A.length} track(s) added from folder`),O||A.length}catch(A){throw U(),w(),Zt(),A}}d==null||d.addEventListener("click",async()=>{if(window.__TAURI__)try{const{open:o}=await X(async()=>{const{open:f}=await import("./index-CS3Qnt9j.js");return{open:f}},__vite__mapDeps([5,1])),p=await o({directory:!0,multiple:!1});p&&await _t(p)}catch{e("Scanning requires the Tauri build")}else{const o=document.createElement("input");o.type="file",o.multiple=!0,o.accept="audio/*",o.onchange=async()=>{var f;const p=Array.from(o.files||[]);for(const h of p){const x=URL.createObjectURL(h),O=Math.random().toString(36).slice(2),U=((f=h.name.split(".").pop())==null?void 0:f.toUpperCase())||"MP3",w={id:O,title:h.name.replace(/\.[^/.]+$/,""),artist:"Unknown",album:"Imported",genre:"Unknown",year:new Date().getFullYear(),duration:180,path:x,codec:U,specs:"Imported · Stereo",replayGain:0},A=new Audio(x);await new Promise(E=>{A.addEventListener("loadedmetadata",()=>{w.duration=Math.floor(A.duration)||180,E(null)},{once:!0}),A.load(),setTimeout(()=>E(null),1500)}),await Jt(h,w),et.push(w)}e(`${p.length} file(s) added`),N(),At()},o.click()}}),document.addEventListener("dragover",o=>{o.preventDefault()}),document.addEventListener("drop",async o=>{var f,h;if(o.preventDefault(),Ct)return;const p=Array.from(((f=o.dataTransfer)==null?void 0:f.files)||[]).filter(x=>x.type.startsWith("audio/")||/\.(mp3|flac|wav|ogg|aac|m4a|alac)$/i.test(x.name));if(p.length){for(const x of p){const O=URL.createObjectURL(x),U=Math.random().toString(36).slice(2),w=((h=x.name.split(".").pop())==null?void 0:h.toUpperCase())||"MP3",A={id:U,title:x.name.replace(/\.[^/.]+$/,""),artist:"Imported",album:"Drop",genre:"Unknown",year:new Date().getFullYear(),duration:200,path:O,codec:w,specs:"Drag & Drop"};await Jt(x,A);const E=new Audio(O);await new Promise(W=>{E.addEventListener("loadedmetadata",()=>{A.duration=Math.floor(E.duration)||200,W(null)},{once:!0}),E.load(),setTimeout(()=>W(null),800)}),et.push(A)}e(`${p.length} File added via drag & drop`),N()}});function rt(){return yt.find(o=>o.id===st)||yt[0]}function K(){localStorage.setItem("melo-rev",String(Date.now())),localStorage.setItem("melo-playlists",JSON.stringify(yt))}function ct(){Ct&&j("melo:playlists-sync",{src:$t,playlists:yt})}function Tt(o){st=o,localStorage.setItem("melo-currentPlaylist",o),v()}ot("melo:playlists-sync",o=>{o&&o.src!==$t&&Array.isArray(o.playlists)&&(yt=o.playlists,v(),N())});function ht(){localStorage.setItem("melo-rev",String(Date.now()));try{localStorage.setItem("melo-tracks",JSON.stringify(et))}catch{try{localStorage.setItem("melo-tracks",JSON.stringify(et.map(({cover:o,...p})=>p)))}catch{}}}let wt=new Set(et.map(o=>o.id));function zt(o,p=!1,f=!1){let h=!1;for(const x of o)wt.has(x.id)||(et.push(x),wt.add(x.id),h=!0);h&&!f&&(ht(),N(),v()),p&&Ct&&j("melo:tracks-add",{src:$t,list:o})}ot("melo:tracks-add",o=>{o&&o.src!==$t&&Array.isArray(o.list)&&zt(o.list)});function kt(o,p=!1){const f=rt();if(!f)return;let h=!1;const x=new Set(f.tracks);o.forEach(O=>{x.has(O.id)||(f.tracks.push(O.id),x.add(O.id),h=!0)}),h&&!p?(K(),ct(),v(),N()):h&&K()}async function bt(o){if(!Ct)return[];const{invoke:p}=await X(async()=>{const{invoke:h}=await import("./core-DhEqZVGG.js");return{invoke:h}},[]),f=[];for(const h of o)try{const x=await p("scan_library",{path:h});x&&f.push(...x)}catch{}return f}Ct&&X(async()=>{const{getCurrentWebviewWindow:o}=await import("./webviewWindow-mjQkSB26.js");return{getCurrentWebviewWindow:o}},__vite__mapDeps([6,7,1,0,8])).then(({getCurrentWebviewWindow:o})=>{o().onDragDropEvent(async f=>{var h;if(f.payload.type==="drop"){const x=f.payload.paths||[];if(!x.length)return;const O=await bt(x);if(!O.length)return;O.forEach(U=>U.source="import"),zt(O,!0),kt(O),j("melo:play-tracks",{tracks:O,index:0}),e(`Playing ${((h=O[0])==null?void 0:h.title)||"track"}`)}})}).catch(()=>{});function Dt(o){return`${Math.floor(o/60)}:${String(Math.floor(o%60)).padStart(2,"0")}`}function Et(o){return o.type.startsWith("audio/")||/\.(mp3|flac|wav|ogg|aac|m4a|alac|opus)$/i.test(o.name)}async function Rt(o){var w;const p=o.path;if(p&&Ct){const A=await bt([p]);if(A.length)return A[0].source="import",A[0]}const f=p||URL.createObjectURL(o),h=p||Math.random().toString(36).slice(2),x=((w=o.name.split(".").pop())==null?void 0:w.toUpperCase())||"MP3",O=o.name.replace(/\.[^/.]+$/,""),U={id:h,title:O,artist:"Unknown Artist",album:"Single",genre:"Unknown",year:new Date().getFullYear(),duration:180,path:f,codec:x,specs:"Local File",replayGain:0,source:"import"};try{const A=new Audio(URL.createObjectURL(o));await new Promise(E=>{A.addEventListener("loadedmetadata",()=>{U.duration=Math.floor(A.duration)||180,E(null)},{once:!0}),A.load(),setTimeout(()=>E(null),800)})}catch{}return await Jt(o,U),U}function v(){var w,A,E,W;if(!a)return;try{const F=localStorage.getItem("melo-tracks");if(F){const C=JSON.parse(F);Array.isArray(C)&&C.length>et.length&&(et=C)}}catch{}const o=rt();if(r&&(r.innerHTML=yt.map(F=>`<option value="${F.id}" ${o&&F.id===o.id?"selected":""}>${F.name}</option>`).join("")),!o){a.innerHTML="",a.style.display="none",n&&(n.style.display="block");return}const p=o.tracks.map((F,C)=>{const J=et.find(St=>St.id===F||St.path===F);if(J)return J;const nt=F.replace(/^.*[\\/]/,""),vt=nt.lastIndexOf("."),mt=vt>0?nt.slice(0,vt):nt;return{id:F,title:mt||`Track ${C+1}`,artist:"Audio Track",album:o.name,duration:0,path:F,codec:"AUDIO",specs:"Local File",source:"import"}});let f=p;if(at.trim()){const F=at.toLowerCase().trim();f=p.filter(C=>(C.title||"").toLowerCase().includes(F)||(C.artist||"").toLowerCase().includes(F)||(C.album||"").toLowerCase().includes(F))}if(n&&(n.style.display=p.length?"none":"block"),a.style.display=p.length?"flex":"none",!f.length&&p.length){a.innerHTML=`<div style="padding:16px;text-align:center;color:var(--text-muted);font-size:11px;">No tracks match "${at}"</div>`;return}const h=window.LumiPlayer,x=h&&h.queue&&h.queue.length&&(A=(w=h.queue[h.currentIndex])==null?void 0:w.id)!=null?A:null,O=!!x&&!((W=(E=h==null?void 0:h.audio)==null?void 0:E.paused)==null||W);a.innerHTML=f.map((F,C)=>{const J=o.tracks.indexOf(F.id),nt=x===F.id;return`
      <div class="track-row ${nt?"active":""}" draggable="true" data-id="${F.id}" data-pl-idx="${J>=0?J:C}">
        <span class="num">${nt?O?"▶":"❚❚":C+1}</span>
        ${F.cover?`<img class="track-cover-mini" src="${F.cover}" onerror="this.style.display='none'"/>`:'<div class="track-cover-mini cover-default">♪</div>'}
        <div style="flex:1;min-width:0;">
          <div class="t-title">${F.title}</div>
          <div class="t-artist">${F.artist} • ${F.album}</div>
        </div>
        <span class="t-dur">${Dt(F.duration)}</span>
        <button class="btn small ghost" data-action="pl-remove" data-idx="${J>=0?J:C}" title="Remove from playlist">×</button>
      </div>
    `}).join("");let U=null;a.querySelectorAll(".track-row").forEach(F=>{const C=F;C.addEventListener("dragstart",J=>{U=parseInt(C.dataset.plIdx),J.dataTransfer.setData("application/x-melo-ids",C.dataset.id),J.dataTransfer.setData("application/x-melo-pl-idx",String(U)),J.dataTransfer.effectAllowed="move",C.style.opacity="0.4"}),C.addEventListener("dragend",()=>{C.style.opacity="1",U=null,a==null||a.querySelectorAll(".track-row").forEach(J=>J.classList.remove("drag-over-target"))}),C.addEventListener("dragover",J=>{J.preventDefault(),J.stopPropagation(),C.classList.add("drag-over-target")}),C.addEventListener("dragleave",()=>{C.classList.remove("drag-over-target")}),C.addEventListener("drop",J=>{var mt;J.preventDefault(),J.stopPropagation(),C.classList.remove("drag-over-target");const nt=parseInt(C.dataset.plIdx),vt=(mt=J.dataTransfer)==null?void 0:mt.getData("application/x-melo-pl-idx");if(vt!==void 0&&vt!==""&&!isNaN(parseInt(vt))){const St=parseInt(vt);if(St!==nt&&St>=0&&nt>=0&&St<o.tracks.length&&nt<o.tracks.length){const Ge=o.tracks.splice(St,1)[0];o.tracks.splice(nt,0,Ge),K(),ct(),v(),N(),e("Track reordered in playlist");return}}}),C.addEventListener("click",J=>{const nt=J.target;if(nt.closest("[data-action='pl-remove']")){const St=parseInt(nt.closest("[data-action='pl-remove']").dataset.idx);o.tracks.splice(St,1),K(),ct(),v(),N();return}const vt=C.dataset.id,mt=f.findIndex(St=>St.id===vt);j("melo:play-tracks",{tracks:f,index:mt>=0?mt:0})})})}const L=document.getElementById("playlistSearchInput");L&&L.addEventListener("input",()=>{at=L.value,v()});const P=document.getElementById("playlistSortSelect");if(P&&P.addEventListener("change",()=>{const o=rt();if(!o||!o.tracks.length)return;const p=P.value,f=o.tracks.map(h=>et.find(x=>x.id===h)).filter(Boolean);p==="title-asc"?f.sort((h,x)=>h.title.localeCompare(x.title)):p==="artist-asc"?f.sort((h,x)=>h.artist.localeCompare(x.artist)):p==="album-asc"?f.sort((h,x)=>h.album.localeCompare(x.album)):p==="dur-asc"?f.sort((h,x)=>h.duration-x.duration):p==="dur-desc"&&f.sort((h,x)=>x.duration-h.duration),o.tracks=f.map(h=>h.id),K(),ct(),v(),e(`Playlist sorted by ${P.options[P.selectedIndex].text}`)}),r==null||r.addEventListener("change",()=>Tt(r.value)),s==null||s.addEventListener("click",()=>{const o=rt();if(!o)return e("No playlist available");const p=o.tracks.map(U=>et.find(w=>w.id===U)).filter(Boolean);if(!p.length)return e("Current list is empty");let f=`#EXTM3U
`;p.forEach(U=>{f+=`#EXTINF:${Math.floor(U.duration)},${U.artist} - ${U.title}
${U.path}
`});const h=new Blob([f],{type:"audio/x-mpegurl"}),x=URL.createObjectURL(h),O=document.createElement("a");O.href=x,O.download=`${o.name}.m3u`,O.click(),URL.revokeObjectURL(x),e(`M3U exported for "${o.name}"`)}),g==null||g.addEventListener("click",()=>{const o=prompt("New playlist name:");if(!o)return;const p=Math.random().toString(36).slice(2,8);yt.push({id:p,name:o,tracks:[],createdAt:Date.now()}),Tt(p),K(),ct(),N(),e(`Playlist "${o}" created`)}),a){const o=a.parentElement;["dragover","dragenter"].forEach(p=>o.addEventListener(p,f=>{f.preventDefault(),f.stopPropagation(),a.classList.add("drag-over")})),o.addEventListener("dragleave",p=>{o.contains(p.relatedTarget)||a.classList.remove("drag-over")}),o.addEventListener("drop",async p=>{var O,U;p.preventDefault(),p.stopPropagation(),a.classList.remove("drag-over");const f=rt();if(!f)return e("Create a playlist first (+ New)");const h=(((O=p.dataTransfer)==null?void 0:O.getData("application/x-melo-ids"))||"").split(",").filter(Boolean);let x=0;if(h.length)h.forEach(w=>{f.tracks.includes(w)||(f.tracks.push(w),x++)});else if(!Ct){const w=Array.from(((U=p.dataTransfer)==null?void 0:U.files)||[]).filter(Et);for(const A of w){const E=await Rt(A);et.push(E),f.tracks.includes(E.id)||(f.tracks.push(E.id),x++)}}x&&e(`${x} track(s) added to "${f.name}"`),ht(),K(),ct(),N(),v()})}const T=document.getElementById("playerCard");T&&(["dragover","dragenter"].forEach(o=>T.addEventListener(o,p=>{p.preventDefault(),p.stopPropagation(),T.classList.add("drag-over")})),T.addEventListener("dragleave",o=>{T.contains(o.relatedTarget)||T.classList.remove("drag-over")}),T.addEventListener("drop",async o=>{var x,O;o.preventDefault(),o.stopPropagation(),T.classList.remove("drag-over");const p=window.LumiPlayer,f=(((x=o.dataTransfer)==null?void 0:x.getData("application/x-melo-ids"))||"").split(",").filter(Boolean);let h=[];if(f.length)h=f.map(U=>et.find(w=>w.id===U)).filter(Boolean),p&&h.length&&e(`Playback ${h.length} track(s)`);else if(!Ct){const U=Array.from(((O=o.dataTransfer)==null?void 0:O.files)||[]).filter(Et),w=rt();let A=!1;for(const E of U){const W=await Rt(E);et.push(W),h.push(W),w&&!w.tracks.includes(W.id)&&(w.tracks.push(W.id),A=!0)}U.length&&(ht(),K(),ct(),N(),v()),p&&h.length&&e(A&&w?`Playback ${h.length} track(s) + added to "${w.name}"`:`Playback ${h.length} track(s)`)}h.length&&j("melo:play-tracks",{tracks:h,index:0})}));let I=null;function tt(o){if(I=o,!I)return e("No track to edit");k.style.display="flex",_.value=I.title,S.value=I.artist,b.value=I.album,H.value=String(I.year)}function Z(o){const p=et.filter(o).map(f=>f.id);p.length&&(et=et.filter(f=>!o(f)),p.forEach(f=>wt.delete(f)),yt.forEach(f=>{f.tracks=f.tracks.filter(h=>!p.includes(h))}),ht(),K(),ct(),Ct&&j("melo:tracks-remove",{src:$t,ids:p}),N(),v())}ot("melo:tracks-remove",o=>{if(o&&o.src!==$t&&Array.isArray(o.ids)){const p=o.ids;et=et.filter(f=>!p.includes(f.id)),p.forEach(f=>wt.delete(f)),yt.forEach(f=>{f.tracks=f.tracks.filter(h=>!p.includes(h))}),N(),v()}});const q=document.createElement("div");q.className="ctx-menu",q.style.display="none",document.body.appendChild(q);let D=null;function lt(){q.style.display="none"}document.addEventListener("click",lt),document.addEventListener("keydown",o=>{o.key==="Escape"&&lt()}),q.addEventListener("click",o=>{const p=o.target.closest("[data-act]");if(!p||!D)return;o.stopPropagation();const f=p.dataset.act;f==="edit"&&tt(D.track),f==="remove"&&(D.type==="track"?Z(h=>h.id===D.track.id):D.type==="artist"?Z(h=>h.artist===D.name):D.type==="album"?Z(h=>h.artist===D.artist&&h.album===D.album):D.type==="genre"&&Z(h=>h.genre===D.name)),lt()});const l=document.createElement("div");l.className="ctx-menu",l.style.display="none",document.body.appendChild(l);let z=-1;document.addEventListener("click",()=>{l.style.display="none"}),l.addEventListener("click",o=>{if(!o.target.closest("[data-act='plremove']"))return;o.stopPropagation();const p=rt();p&&z>=0&&z<p.tracks.length&&(p.tracks.splice(z,1),K(),ct(),v(),N()),l.style.display="none"}),document.addEventListener("contextmenu",o=>{lt(),l.style.display="none";const p=o.target,f=p.closest("#winPlaylistTracks .track-row");if(f){o.preventDefault(),z=parseInt(f.dataset.plIdx||"-1"),l.innerHTML='<button class="ctx-item danger" data-act="plremove">Remove from Playlist</button>',l.style.display="block";const U=l.getBoundingClientRect();l.style.left=Math.max(4,Math.min(o.clientX,window.innerWidth-U.width-6))+"px",l.style.top=Math.max(4,Math.min(o.clientY,window.innerHeight-U.height-6))+"px";return}if(!($t==="library"?!0:!!p.closest("#win-library"))){o.preventDefault();return}o.preventDefault();const x=p.closest(".track-row, [data-artist], [data-albumkey], [data-genre]");if(!x){lt();return}if(x.classList.contains("track-row")){const U=dt[parseInt(x.dataset.viewIdx)];if(!U){lt();return}D={type:"track",track:U},q.innerHTML='<button class="ctx-item" data-act="edit">Edit tags</button><button class="ctx-item danger" data-act="remove">Remove track from library</button>'}else if(x.dataset.artist)D={type:"artist",name:x.dataset.artist},q.innerHTML='<button class="ctx-item danger" data-act="remove">Remove artist from library</button>';else if(x.dataset.albumkey){const[U,w]=(x.dataset.albumkey||"").split("\0");D={type:"album",artist:U,album:w},q.innerHTML='<button class="ctx-item danger" data-act="remove">Remove album from library</button>'}else D={type:"genre",name:x.dataset.genre},q.innerHTML='<button class="ctx-item danger" data-act="remove">Remove genre from library</button>';q.style.display="block";const O=q.getBoundingClientRect();q.style.left=Math.max(4,Math.min(o.clientX,window.innerWidth-O.width-6))+"px",q.style.top=Math.max(4,Math.min(o.clientY,window.innerHeight-O.height-6))+"px"}),(fe=document.getElementById("btn-tag-cancel"))==null||fe.addEventListener("click",()=>k.style.display="none"),(he=document.getElementById("btn-tag-save"))==null||he.addEventListener("click",async()=>{if(I){if(I.title=_.value,I.artist=S.value,I.album=b.value,I.year=parseInt(H.value)||I.year,$.files&&$.files[0]){const o=$.files[0],p=URL.createObjectURL(o),f=new FileReader;f.onload=()=>{I.cover=f.result,N(),At(),j("melo:tag-updated",I)},f.readAsDataURL(o),I.cover=p}if(window.__TAURI__)try{const{invoke:o}=await X(async()=>{const{invoke:p}=await import("./core-DhEqZVGG.js");return{invoke:p}},[]);await o("write_tags",{path:I.path,tags:{title:I.title,artist:I.artist,album:I.album}})}catch{}k.style.display="none",ht(),N(),At(),j("melo:tag-updated",I),e("Metadata saved")}});function R(o){return String(o!=null?o:"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function V(){return et.filter(o=>o.source==="scan")}function it(o){return dt=o,o.length?o.map((p,f)=>{const h=`${Math.floor(p.duration/60)}:${String(Math.floor(p.duration%60)).padStart(2,"0")}`;return`
      <div class="track-row" draggable="true" data-view-idx="${f}" data-id="${R(p.id)}">
        <span class="num">${f+1}</span>
        <img class="track-cover-mini" src="${p.cover||""}" style="${p.cover?"":"display:none"}" onerror="this.style.display='none'"/>
        <div style="flex:1;min-width:0;">
          <div class="t-title">${R(p.title)}</div>
          <div class="t-artist">${R(p.artist)} • ${R(p.album)}${p.year?" • "+p.year:""}</div>
        </div>
        <span style="font-size:10px;padding:3px 6px;border-radius:6px;background:var(--badge-bg);color:var(--badge-text);border:1px solid var(--card-border);">${R(p.codec)}</span>
        <span class="t-dur">${h}</span>
        <button class="btn small ghost" data-action="add-queue" data-view-idx="${f}">+</button>
      </div>`}).join(""):'<div style="padding:30px;text-align:center;color:var(--text-muted);">Nothing here yet.<br/><span style="font-size:12px;">Use "Scan Folder" to build your library</span></div>'}function N(){var O,U;if(!i){v();return}const o=V(),p=new Set(o.map(w=>w.artist)).size,f=new Set(o.map(w=>w.artist+"\0"+w.album)).size;m&&(m.textContent=`${o.length} tracks • ${p} artists • ${f} albums`);const h=Q.trim().toLowerCase();let x="";if(G==="artists")if(u){const w=o.filter(C=>C.artist===u),A=[...new Set(w.map(C=>C.album))].sort((C,J)=>C.localeCompare(J)),E=M?w.filter(C=>C.album===M):w,W=(O=w.find(C=>C.cover))==null?void 0:O.cover;x=`<div class="lib-crumb"><button class="btn small" data-back="artists">‹ Artists</button>${W?`<div class="lib-avatar" style="background-image:url('${R(W)}')"></div>`:`<div class="lib-avatar">${R((u[0]||"?").toUpperCase())}</div>`}<b>${R(u)}</b></div>
          <div class="chip-row"><button class="chip ${M?"":"active"}" data-album="">All albums</button>`+A.map(C=>{var vt;const J=(vt=w.find(mt=>mt.album===C&&mt.cover))==null?void 0:vt.cover,nt=J?`<span class="chip-thumb" style="background-image:url('${R(J)}')"></span>`:"";return`<button class="chip ${M===C?"active":""}" data-album="${R(C)}">${nt}${R(C)}</button>`}).join("")+"</div>"+it(h?E.filter(C=>(C.title+C.album).toLowerCase().includes(h)):E)}else{dt=[];const w=[...new Set(o.map(E=>E.artist))].sort((E,W)=>E.localeCompare(W));x=(h?w.filter(E=>E.toLowerCase().includes(h)):w).map(E=>{var J;const W=o.filter(nt=>nt.artist===E).length,F=(J=o.find(nt=>nt.artist===E&&nt.cover))==null?void 0:J.cover,C=F?`<div class="lib-avatar" style="background-image:url('${R(F)}')"></div>`:`<div class="lib-avatar">${R((E[0]||"?").toUpperCase())}</div>`;return`<div class="lib-item" data-artist="${R(E)}">${C}<div style="flex:1;min-width:0;"><div class="t-title">${R(E)}</div><div class="t-artist">${W} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No artists found.</div>'}else if(G==="albums")if(B){const[w,A]=B.split("\0"),E=o.filter(C=>C.artist===w&&C.album===A),W=(U=E.find(C=>C.cover))==null?void 0:U.cover;x=`<div class="lib-crumb"><button class="btn small" data-back="albums">‹ Albums</button>${W?`<div class="lib-avatar lib-avatar-album" style="background-image:url('${R(W)}')"></div>`:'<div class="lib-avatar lib-avatar-album">💿</div>'}<b>${R(A)}</b><span class="t-artist" style="margin-left:8px;">${R(w)}</span></div>`+it(h?E.filter(C=>C.title.toLowerCase().includes(h)):E)}else{dt=[];const w=[...new Set(o.map(E=>E.artist+"\0"+E.album))].sort((E,W)=>E.localeCompare(W));x=(h?w.filter(E=>E.toLowerCase().includes(h)):w).map(E=>{var vt;const[W,F]=E.split("\0"),C=o.filter(mt=>mt.artist===W&&mt.album===F).length,J=(vt=o.find(mt=>mt.artist===W&&mt.album===F&&mt.cover))==null?void 0:vt.cover,nt=J?`<div class="lib-avatar lib-avatar-album" style="background-image:url('${R(J)}')"></div>`:'<div class="lib-avatar lib-avatar-album">💿</div>';return`<div class="lib-item" data-albumkey="${R(E)}">${nt}<div style="flex:1;min-width:0;"><div class="t-title">${R(F)}</div><div class="t-artist">${R(W)} • ${C} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No albums found.</div>'}else if(Y){const w=o.filter(A=>A.genre===Y);x=`<div class="lib-crumb"><button class="btn small" data-back="genres">‹ Genres</button><b>${R(Y)}</b></div>`+it(h?w.filter(A=>(A.title+A.artist).toLowerCase().includes(h)):w)}else{dt=[];const w=[...new Set(o.map(E=>E.genre))].sort((E,W)=>E.localeCompare(W));x=(h?w.filter(E=>E.toLowerCase().includes(h)):w).map(E=>{const W=o.filter(F=>F.genre===E).length;return`<div class="lib-item" data-genre="${R(E)}"><div class="lib-avatar">🎼</div><div style="flex:1;min-width:0;"><div class="t-title">${R(E)}</div><div class="t-artist">${W} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No genres found.</div>'}i.innerHTML=x,i.querySelectorAll("[data-artist]").forEach(w=>w.addEventListener("click",()=>{u=w.dataset.artist,M=null,N()})),i.querySelectorAll("[data-albumkey]").forEach(w=>w.addEventListener("click",()=>{B=w.dataset.albumkey,N()})),i.querySelectorAll("[data-genre]").forEach(w=>w.addEventListener("click",()=>{Y=w.dataset.genre,N()})),i.querySelectorAll("[data-back]").forEach(w=>w.addEventListener("click",()=>{const A=w.dataset.back;A==="artists"?(u=null,M=null):A==="albums"?B=null:Y=null,N()})),i.querySelectorAll(".chip[data-album]").forEach(w=>w.addEventListener("click",()=>{M=w.dataset.album||null,N()})),i.querySelectorAll(".track-row").forEach(w=>{w.addEventListener("dragstart",A=>{A.dataTransfer.setData("application/x-melo-ids",w.dataset.id),A.dataTransfer.effectAllowed="copy"}),w.addEventListener("click",A=>{const E=A.target,W=parseInt(w.dataset.viewIdx);if(E.closest("[data-action='add-queue']")){Nt(dt[W]);return}j("melo:play-tracks",{tracks:dt,index:W})})}),v()}function Nt(o){j("melo:add-queue",o),e(`Queued: ${o.title}`)}function At(){if(!y)return;const o=window.LumiPlayer,p=(o==null?void 0:o.queue)||et.slice(0,4);if(!p.length){y.innerHTML='<div style="text-align:center;color:var(--text-muted);font-size:12px;padding:12px;">Queue is empty</div>';return}y.innerHTML=p.map((f,h)=>{var x;return`
      <div class="track-row" data-id="${f.id}" data-queue-idx="${h}" style="padding:6px 8px;border-radius:8px;border:1px solid ${h===((x=o==null?void 0:o.currentIndex)!=null?x:0)?"var(--accent)":"transparent"};">
        <img class="track-cover-mini" src="${f.cover||""}" style="width:24px;height:24px;${f.cover?"":"display:none"}" />
        <div style="flex:1;min-width:0;">
          <div class="t-title" style="font-size:12px;">${f.title}</div>
          <div class="t-artist" style="font-size:11px;">${f.artist}</div>
        </div>
        <button class="btn small ghost" data-remove="${h}" style="padding:2px 6px;">×</button>
      </div>
    `}).join(""),y.querySelectorAll("[data-remove]").forEach(f=>{f.addEventListener("click",()=>{const h=parseInt(f.dataset.remove);p.splice(h,1),At()})}),y.querySelectorAll(".track-row").forEach(f=>{f.addEventListener("click",h=>{if(h.target.closest("[data-remove]"))return;const x=parseInt(f.dataset.queueIdx),O=window.LumiPlayer;O&&O.loadTrack(x)})})}ot("melo:track-changed",o=>{At();const p=document.getElementById("lyricsBox");p&&o&&(p.textContent=o.lyrics||"No lyrics found for this track. You can add it via the tag editor."),document.querySelectorAll(".track-row").forEach(f=>{f.classList.toggle("active",f.dataset.id===(o==null?void 0:o.id))})}),setInterval(()=>At(),2e3);let ue=localStorage.getItem("melo-rev")||"";setInterval(()=>{const o=localStorage.getItem("melo-rev")||"";if(o!==ue){ue=o;try{const p=JSON.parse(localStorage.getItem("melo-tracks")||"null");Array.isArray(p)&&(et=p,wt=new Set(et.map(f=>f.id)))}catch{}try{const p=JSON.parse(localStorage.getItem("melo-playlists")||"null");Array.isArray(p)&&p.length&&(yt=p)}catch{}N(),v()}},1200);let ne=null;function Zt(){ne||(ne=setTimeout(()=>{ne=null,ht(),N(),v()},350))}window.LumiLibrary={get tracks(){return et},get playlists(){return yt},render:N,addTracks:zt,addToCurrentPlaylist:kt,importPaths:bt,flushDeferred:Zt,scanFolder:_t,currentPlaylistName:()=>{var o;return((o=rt())==null?void 0:o.name)||"Playlist"}}}const Yt={flat:[0,0,0,0,0,0,0,0,0,0],pop:[-1,2,4,4,2,-1,-1,2,3,3],rock:[4,3,2,-1,-2,-2,1,3,4,4],bass:[6,5,4,2,1,0,-1,-1,-2,-3],treble:[-3,-2,-1,0,1,2,3,5,6,6],dance:[5,4,2,0,-1,-1,2,4,5,3],jazz:[2,1,2,3,2,0,1,2,3,2],classical:[3,2,1,0,0,0,-1,2,3,4],vocal:[-2,-1,0,2,4,4,3,1,0,-1],acoustic:[3,2,1,1,2,2,3,3,2,1],hiphop:[5,4,1,2,-1,-1,1,-1,2,3],metal:[4,2,-1,-2,-1,1,3,4,5,4]};function le(t){for(const[e,i]of Object.entries(Yt))if(i.every((a,n)=>a===t[n]))return e;return"custom"}function we(t,e,i={}){const a=!!i.remote,n=document.getElementById("eqEnable"),r=document.getElementById("eqPreset"),c=document.getElementById("btnEqReset"),m=document.getElementById("eqBands"),d=document.getElementById("eqCanvas"),s=d?d.getContext("2d"):null;let g=null,y=[],k=[],_=new Array(Gt.length).fill(0);try{const u=JSON.parse(localStorage.getItem("melo-eq-gains")||"null");Array.isArray(u)&&u.length===Gt.length&&(_=u.map(M=>typeof M=="number"?Math.max(-12,Math.min(12,M)):0))}catch{}let S=localStorage.getItem("melo-eq-preset")||le(_),b=localStorage.getItem("melo-eq-enabled")!=="0";function H(){if(!g)try{const u=Kt(t);g=u.ctx,y=u.filters,y.forEach((M,B)=>{M.gain.value=b?_[B]:0})}catch{}}function $(u,M){H(),y[u]&&b&&(y[u].gain.value=M)}function Q(u){H(),_=[...u],b&&u.forEach((M,B)=>{y[B]&&(y[B].gain.value=M)}),G()}function st(u){H(),b=u,u?_.forEach((M,B)=>{y[B]&&(y[B].gain.value=M)}):y.forEach(M=>{M.gain.value=0}),G()}a||t&&t.addEventListener("play",()=>{H(),(g==null?void 0:g.state)==="suspended"&&g.resume().catch(()=>{})}),ot("melo:eq",u=>{u&&(u.type==="gain"?(a||$(u.idx,u.val),_[u.idx]=u.val,k[u.idx]&&(k[u.idx].value=String(u.val),at(k[u.idx])),r&&(r.value=le(_)),G()):u.type==="gains"?(a||Q(u.values),_=[...u.values],k.length&&k.forEach((M,B)=>{M.value=String(_[B]),at(M)}),r&&u.preset&&(r.value=u.preset),G()):u.type==="enable"&&(b=!!u.on,a||st(b),n&&(n.checked=b),G()))});function at(u){var Y;const M=parseInt(u.value),B=(Y=u.parentElement)==null?void 0:Y.querySelector(".val");B&&(B.textContent=(M>0?"+":"")+M+"dB")}function G(){if(!d||!s)return;const u=window.devicePixelRatio||1,M=d.clientWidth*u,B=d.clientHeight*u;if(M<=0||B<=0)return;d.width=M,d.height=B,s.clearRect(0,0,M,B);const Y=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#2a7bd6",dt=_;if(!b){s.strokeStyle="rgba(100,120,150,0.25)",s.lineWidth=2*u,s.beginPath(),s.moveTo(0,B/2),s.lineTo(M,B/2),s.stroke();return}s.strokeStyle=Y,s.lineWidth=2.5*u,s.lineJoin="round",s.beginPath(),dt.forEach((_t,rt)=>{const K=rt/(dt.length-1)*M,ct=B/2-_t/12*(B/2-10*u);if(rt===0)s.moveTo(K,ct);else{const Tt=(rt-1)/(dt.length-1)*M,ht=B/2-dt[rt-1]/12*(B/2-10*u);s.quadraticCurveTo((Tt+K)/2,ht,K,ct)}}),s.stroke(),dt.forEach((_t,rt)=>{const K=rt/(dt.length-1)*M,ct=B/2-_t/12*(B/2-10*u);s.fillStyle=Y,s.beginPath(),s.arc(K,ct,4*u,0,Math.PI*2),s.fill(),s.fillStyle="white",s.beginPath(),s.arc(K,ct,2*u,0,Math.PI*2),s.fill()}),s.strokeStyle="rgba(100,120,150,0.3)",s.lineWidth=1*u,s.setLineDash([4*u,4*u]),s.beginPath(),s.moveTo(0,B/2),s.lineTo(M,B/2),s.stroke(),s.setLineDash([])}m&&(m.innerHTML="",Gt.forEach((u,M)=>{const B=_[M]||0,Y=document.createElement("div");Y.className="eq-band",Y.innerHTML=`
        <input type="range" min="-12" max="12" value="${B}" step="1" data-idx="${M}" orient="vertical" />
        <label>${u>=1e3?u/1e3+"k":u}</label>
        <span style="font-size:10px;color:var(--text-muted);min-height:12px;" class="val">${(B>0?"+":"")+B+"dB"}</span>
      `,m.appendChild(Y)}),k=Array.from(m.querySelectorAll("input")),k.forEach(u=>{u.addEventListener("input",()=>{const M=parseInt(u.dataset.idx),B=parseInt(u.value);at(u),_[M]=B,G();const Y=le(_);r&&(r.value=Y),localStorage.setItem("melo-eq-gains",JSON.stringify(_)),localStorage.setItem("melo-eq-preset",Y),a||$(M,B),j("melo:eq",{type:"gain",idx:M,val:B,values:_})})})),r&&(r.value=S,r.addEventListener("change",()=>{const u=Yt[r.value]||Yt.flat;k.length&&k.forEach((M,B)=>{M.value=String(u[B]),at(M)}),_=[...u],G(),localStorage.setItem("melo-eq-gains",JSON.stringify(_)),localStorage.setItem("melo-eq-preset",r.value),a||Q(u),j("melo:eq",{type:"gains",values:u,preset:r.value}),e(`Preset: ${r.options[r.selectedIndex].text}`)})),c&&c.addEventListener("click",()=>{const u=Yt.flat;k.length&&k.forEach((M,B)=>{M.value="0",at(M)}),_=[...u],r&&(r.value="flat"),localStorage.setItem("melo-eq-gains",JSON.stringify(_)),localStorage.setItem("melo-eq-preset","flat"),a||Q(u),j("melo:eq",{type:"gains",values:u,preset:"flat"}),G(),e("Equalizer reset to Flat (0dB)")}),n&&(n.checked=b,n.addEventListener("change",()=>{b=n.checked,localStorage.setItem("melo-eq-enabled",b?"1":"0"),a||st(b),j("melo:eq",{type:"enable",on:b}),G(),e(b?"Equalizer On":"Equalizer off — Flat")})),d&&new ResizeObserver(()=>G()).observe(d),G(),window.LumiEqualizer={presets:Yt,frequencies:Gt,displayGains:_,reset:()=>c==null?void 0:c.click()}}const jt=[{id:"bars",label:"Classic Bars"},{id:"thin",label:"Thin Bars"},{id:"line",label:"Spectrum Line"},{id:"mirror",label:"Mirror Bars"},{id:"wave",label:"Oscilloscope"}];function ta(t){let e=document.getElementById("vizBars");if(!e)return;let i=b(e),a=i.getContext("2d"),n=null,r=null,c=null,m=null,d=null,s=!1,g=localStorage.getItem("melo-viz-mode")||"bars";jt.some(v=>v.id===g)||(g="bars");let y=0,k=[],_=.45,S=null;function b(v){let L=v.querySelector("canvas");return L||(v.innerHTML="",L=document.createElement("canvas"),v.appendChild(L)),L}function H(){if(!(r&&c))try{const v=Kt(t);n=v.ctx,r=v.analyser,c=new Uint8Array(r.frequencyBinCount),m=new Uint8Array(r.fftSize)}catch{s=!0}}function $(v){const L=c.length,P=((n==null?void 0:n.sampleRate)||44100)/2,T=45,I=Math.min(15e3,P*.95),tt=Math.log(T),Z=Math.log(I),q=[];for(let D=0;D<v;D++){const lt=Math.exp(tt+(Z-tt)*D/v),l=Math.exp(tt+(Z-tt)*(D+1)/v);let z=Math.floor(lt/P*L),R=Math.max(z+1,Math.ceil(l/P*L));z<0&&(z=0),R>L&&(R=L);let V=0;for(let it=z;it<R;it++)V+=c[it];q.push(V/(R-z)/255)}return q}function Q(v){const L=performance.now()/1e3,P=Math.pow(Math.abs(Math.sin(L*2.2)),2.5),T=[];for(let I=0;I<v;I++){let tt=.42+.26*Math.sin(L*1.35+I*.62)+.2*Math.sin(L*2.9+I*1.31)+Math.random()*.07;tt*=.55+.5*P,T.push(Math.max(.04,Math.min(1,tt)))}return T}function st(v){const L=performance.now()/1e3,P=.5+.5*Math.pow(Math.abs(Math.sin(L*1.9)),2);for(let T=0;T<v.length;T++){const I=T/v.length;v[T]=128+66*P*(Math.sin(I*Math.PI*6+L*7)*.6+Math.sin(I*Math.PI*13-L*11)*.4)}}function at(v){let L;if(s||!r||!c)L=Q(v);else if(r.getByteFrequencyData(c),L=$(v),!L.some(I=>I>.01)&&!t.paused)L=Q(v);else for(let I=0;I<v;I++)L[I]*=1+1.7*(I/Math.max(1,v-1));let P=0;for(const T of L)T>P&&(P=T);P>_?_=P:_=Math.max(.35,_*.985),k.length!==v&&(k=new Array(v).fill(0));for(let T=0;T<v;T++){const I=Math.min(1,L[T]/_),tt=I>k[T]?.55:.16;k[T]+=(I-k[T])*tt}return k}function G(v,L){return getComputedStyle(document.documentElement).getPropertyValue(v).trim()||L}function u(){return i.width/Math.max(1,i.clientWidth)||1}function M(v,L,P,T,I){if(I=Math.min(I,P/2,T/2),a.roundRect){a.roundRect(v,L,P,T,I);return}a.rect(v,L,P,T)}function B(){const v=window.devicePixelRatio||1,L=i.clientWidth||(e==null?void 0:e.clientWidth)||200,P=i.clientHeight||(e==null?void 0:e.clientHeight)||56;L>0&&P>0&&(i.width=Math.round(L*v),i.height=Math.round(P*v))}new ResizeObserver(B).observe(i),B();function Y(v,L,P,T){const I=u(),tt=G("--visualizer","#38bdf8"),Z=G("--accent","#0284c7"),q=v.length,D=L/q,lt=Math.max(1.2*I,D*(1-T));for(let l=0;l<q;l++){const z=v[l],R=Math.max(2*I,z*(P-4*I)),V=l*D+(D-lt)/2,it=P-R-1*I,N=a.createLinearGradient(0,it,0,P);N.addColorStop(0,Z),N.addColorStop(1,tt),a.fillStyle=N,a.beginPath(),M(V,it,lt,R,Math.min(lt/2,3.5*I)),a.fill()}}function dt(v,L,P){const T=u(),I=G("--visualizer","#38bdf8"),tt=G("--accent","#0284c7"),Z=v.length,q=L/Z,D=P/2,lt=Math.max(1.5*T,q*.62);for(let l=0;l<Z;l++){const z=Math.max(1.5*T,v[l]*(P/2-3*T)),R=l*q+(q-lt)/2,V=a.createLinearGradient(0,D-z,0,D+z);V.addColorStop(0,tt),V.addColorStop(.5,I),V.addColorStop(1,tt),a.fillStyle=V,a.beginPath(),M(R,D-z,lt,z*2,Math.min(lt/2,3*T)),a.fill()}}function _t(v,L,P){const T=u(),I=G("--visualizer","#38bdf8"),tt=G("--accent","#0284c7"),Z=v.length,q=[],D=[];for(let l=0;l<Z;l++)q.push((l+.5)/Z*L),D.push(P-2*T-v[l]*(P-8*T));a.beginPath(),a.moveTo(q[0],P),a.lineTo(q[0],D[0]);for(let l=1;l<Z;l++){const z=(q[l-1]+q[l])/2;a.quadraticCurveTo(q[l-1],D[l-1],z,(D[l-1]+D[l])/2)}a.lineTo(q[Z-1],D[Z-1]),a.lineTo(q[Z-1],P),a.closePath();const lt=a.createLinearGradient(0,0,0,P);lt.addColorStop(0,I),lt.addColorStop(1,"transparent"),a.globalAlpha=.18,a.fillStyle=lt,a.fill(),a.globalAlpha=1,a.beginPath(),a.moveTo(q[0],D[0]);for(let l=1;l<Z;l++){const z=(q[l-1]+q[l])/2;a.quadraticCurveTo(q[l-1],D[l-1],z,(D[l-1]+D[l])/2)}a.lineTo(q[Z-1],D[Z-1]),a.strokeStyle=tt,a.lineWidth=2*T,a.lineJoin="round",a.stroke()}function rt(){const v=i.width,L=i.height,P=u(),T=G("--accent","#0284c7");let I;s||!r||!m?(d||(d=new Uint8Array(1024)),st(d),I=d):(r.getByteTimeDomainData(m),I=m);const tt=()=>{a.beginPath();for(let Z=0;Z<=v;Z+=2){const q=Math.min(I.length-1,Math.floor(Z/v*I.length)),D=I[q]/255*L;Z===0?a.moveTo(Z,D):a.lineTo(Z,D)}};tt(),a.strokeStyle=T,a.globalAlpha=.16,a.lineWidth=6*P,a.lineJoin="round",a.stroke(),tt(),a.globalAlpha=1,a.lineWidth=1.8*P,a.stroke()}function K(){const v=i.width,L=i.height;if(!v||!L)return;if(a.clearRect(0,0,v,L),g==="wave"){rt();return}const T=at(g==="bars"?16:g==="thin"?56:g==="line"?64:24);g==="bars"?Y(T,v,L,.34):g==="thin"?Y(T,v,L,.32):g==="line"?_t(T,v,L):g==="mirror"&&dt(T,v,L)}function ct(){y=requestAnimationFrame(ct),K()}function Tt(){y||ct()}function ht(v,L=!1){g=v,k=[],localStorage.setItem("melo-viz-mode",v)}function wt(){return S||(S=document.createElement("div"),S.className="viz-menu",S.style.display="none",document.body.appendChild(S),S)}function zt(){const v=wt();v.innerHTML='<div class="viz-menu-label">Visualizer type</div>'+jt.map(L=>`<button class="viz-menu-item ${L.id===g?"active":""}" data-mode="${L.id}">${L.id===g?"✓":""}<span>${L.label}</span></button>`).join(""),v.querySelectorAll("[data-mode]").forEach(L=>{L.addEventListener("click",P=>{P.stopPropagation(),ht(L.dataset.mode),bt()})})}function kt(v,L){zt();const P=S;P.style.display="block";const T=P.getBoundingClientRect();P.style.left=Math.max(8,Math.min(v,window.innerWidth-T.width-8))+"px",P.style.top=Math.max(8,Math.min(L,window.innerHeight-T.height-8))+"px"}function bt(){S&&(S.style.display="none")}function Dt(){e&&(e.title="Click: next mode • Right-click: choose mode",e.addEventListener("click",()=>{bt();const v=jt.findIndex(L=>L.id===g);ht(jt[(v+1)%jt.length].id)}),e.addEventListener("contextmenu",v=>{v.preventDefault(),v.stopPropagation(),kt(v.clientX,v.clientY)}))}document.addEventListener("click",v=>{S&&S.style.display!=="none"&&!S.contains(v.target)&&bt()}),document.addEventListener("keydown",v=>{v.key==="Escape"&&bt()});function Et(){H(),Tt(),(n==null?void 0:n.state)==="suspended"&&n.resume().catch(()=>{})}t.addEventListener("play",Et),Et(),Dt(),document.addEventListener("visibilitychange",()=>{document.hidden?(cancelAnimationFrame(y),y=0):Tt()});function Rt(){cancelAnimationFrame(y),y=0,e=document.getElementById("vizBars"),e&&(i=b(e),a=i.getContext("2d"),new ResizeObserver(B).observe(i),B(),Dt(),Tt())}window.__LUMI_REBIND_VISUALIZER__=Rt}function xe(t){if(!t||!t.trim())return{isSynced:!1,lines:[],raw:""};const e=[],i=t.split(/\r?\n/),a=/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;let n=!1;for(const r of i){const c=r.trim();if(!c||/^\[[a-z]{2,8}:/i.test(c))continue;const m=[...c.matchAll(a)];if(m.length>0){n=!0;const d=c.replace(a,"").trim();for(const s of m){const g=parseInt(s[1],10),y=parseInt(s[2],10),k=s[3]||"0",_=k.length===2?parseInt(k,10)*10:k.length===1?parseInt(k,10)*100:parseInt(k.slice(0,3),10),S=g*60+y+_/1e3;e.push({time:S,text:d})}}else e.push({time:-1,text:c})}return e.sort((r,c)=>r.time-c.time),{isSynced:n,lines:e,raw:t}}function ke(t,e){var S;const i=document.getElementById("lyricsContainer"),a=document.getElementById("lyricsStatus"),n=document.getElementById("lyricsTrackTitle");let r={isSynced:!1,lines:[]},c=null,m=-1,d=0;async function s(b){if(b.lyrics&&b.lyrics.trim().length>0)return b.lyrics;if(window.__TAURI__)try{const{invoke:H}=await X(async()=>{const{invoke:Q}=await import("./core-DhEqZVGG.js");return{invoke:Q}},[]),$=await H("get_track_lyrics",{path:b.path});if($)return $}catch{}return null}async function g(b){if(!b){c=null,r={isSynced:!1,lines:[],raw:""},n&&(n.textContent="No track playing"),y();return}c=b.id,n&&(n.textContent=`${b.title} — ${b.artist}`);const H=await s(b);r=xe(H||""),y()}function y(){if(i){if(i.innerHTML="",m=-1,!r.lines.length){a&&(a.style.display="block",a.innerHTML='No synced lyrics found (.lrc)<br/><span style="font-size:10.5px; opacity:0.7;">Place a matching .lrc file in the song folder or add lyrics in the tag editor.</span>');return}a&&(a.style.display="none"),r.lines.forEach((b,H)=>{const $=document.createElement("div");$.className="lyric-line",$.dataset.idx=String(H),$.dataset.time=String(b.time),$.textContent=b.text||"♪",b.time>=0&&($.style.cursor="pointer",$.title=`Seek to ${Math.floor(b.time/60)}:${Math.floor(b.time%60).toString().padStart(2,"0")}`,$.addEventListener("click",()=>{j("melo:seek-playback",b.time),window.__TAURI__||(t.currentTime=b.time,t.play().catch(()=>{}))})),i.appendChild($)})}}function k(){if(!i||!r.isSynced||!r.lines.length)return;const b=window.__TAURI__?d:t.currentTime;let H=-1;for(let $=0;$<r.lines.length&&r.lines[$].time<=b;$++)H=$;if(H!==m){m=H;const $=i.querySelectorAll(".lyric-line");if($.forEach((Q,st)=>{Q.classList.toggle("active",st===m),Q.classList.toggle("passed",st<m)}),m>=0&&$[m]){const Q=$[m],st=i.clientHeight,G=Q.offsetTop-i.offsetTop-st/2+Q.clientHeight/2;i.scrollTo({top:Math.max(0,G),behavior:"smooth"})}}}t.addEventListener("timeupdate",k),window.addEventListener("lumi:trackChange",b=>{g(b.detail)}),ot("melo:track-changed",b=>{g(b)}),ot("melo:playback-state",b=>{b&&(d=Number(b.currentTime)||0,b.track&&b.track.id!==c?g(b.track):k())}),ot("melo:playback-position",b=>{d=Number(b)||0,k()});const _=window.__LUMI_QUEUE__;if(Array.isArray(_)&&_.length>0)g(_[((S=window.LumiPlayer)==null?void 0:S.currentIndex)||0]);else try{const b=JSON.parse(localStorage.getItem("melo-current-track")||"null");b&&g(b)}catch{}j("melo:request-playback-state"),setTimeout(()=>j("melo:request-playback-state"),250),window.LumiLyrics={loadTrackLyrics:g,parseLRC:xe}}let Bt=null;const Ee=`<!doctype html>
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
`,te={"compact-pill-light.html":Ee,"compact-pill-dark.html":Se,"compact-pill-light":Ee,"compact-pill-dark":Se},ea=[{id:"compact-pill-light",name:"Minimal Compact (Light)",filename:"compact-pill-light.html"},{id:"compact-pill-dark",name:"Minimal Compact (Dark)",filename:"compact-pill-dark.html"},{id:"full-html-example",name:"Full HTML Example",filename:"full-html-example.html"},{id:"example-custom",name:"Custom CSS Example",filename:"example-custom.html"}];function Be(t){const e=["trackTitle","btnPlay","seekBar","coverImg"];let i=0;for(const a of e)t.includes(a)&&i++;return i>=3}function Ut(t,e){const i=document.getElementById("playerCard");if(!i)return;const a=i._originalHTML||i.innerHTML;i._originalHTML||(i._originalHTML=a),Bt&&(Bt.remove(),Bt=null);let r=[...t.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(y=>y[1]).join(`
`);r&&(Bt=document.createElement("style"),Bt.id="melo-custom-skin",Bt.textContent=r,document.head.appendChild(Bt));const c=Be(t);let m="";const d=t.match(/<body[^>]*>([\s\S]*?)<\/body>/i);d?m=d[1]:m=t.split(/<\/style>/i).pop()||"";const s=document.createElement("div");s.innerHTML=m;const g=s.querySelector("#lumi-player");if(g&&(m=g.innerHTML),c&&m.trim().length>20){const y=m.trim();i.innerHTML=y,e&&e("Skin applied"),setTimeout(()=>{var _,S;(_=window.__LUMI_REBIND__)==null||_.call(window);const k=window.__LUMI_AUDIO__;k&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(k),(S=window.__LUMI_REBIND_MAIN__)==null||S.call(window)},40)}else r&&e&&e("Skin CSS applied");localStorage.setItem("lumi-custom-skin",t),localStorage.setItem("lumi-custom-skin-isFull",c?"1":"0")}function se(t,e=!0){document.documentElement.classList.remove("compact-skin-active"),document.body.classList.remove("compact-skin-active"),Bt&&(Bt.remove(),Bt=null);const i=document.getElementById("playerCard");i&&i._originalHTML&&(i.innerHTML=i._originalHTML,setTimeout(()=>{var n,r;(n=window.__LUMI_REBIND__)==null||n.call(window);const a=window.__LUMI_AUDIO__;a&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(a),(r=window.__LUMI_REBIND_MAIN__)==null||r.call(window)},40)),localStorage.removeItem("lumi-custom-skin"),localStorage.removeItem("lumi-custom-skin-isFull"),localStorage.setItem("melo-active-skin-id","default"),e&&j("melo:skin-changed","default"),t&&t("Switched to Default Melo skin")}async function Pe(){if(ut)try{const{invoke:t}=await X(async()=>{const{invoke:i}=await import("./core-DhEqZVGG.js");return{invoke:i}},[]),e=await t("list_installed_skins");if(Array.isArray(e)&&e.length>0)return e}catch{}return ea}async function ze(t,e){if(ut)try{const{invoke:a}=await X(async()=>{const{invoke:r}=await import("./core-DhEqZVGG.js");return{invoke:r}},[]),n=await a("read_skin_file",{filenameOrPath:t});if(n&&n.trim().length>0)return Ut(n,e),!0}catch{}try{const a=t.startsWith("skins/")?t:`skins/${t}`,n=await fetch(a);if(n.ok){const r=await n.text();return Ut(r,e),!0}}catch{}const i=t.replace(/^.*[\\/]/,"");return te[i]?(Ut(te[i],e),!0):(e&&e(`Could not load skin: ${t}`),!1)}async function Ot(t,e,i,a=!0){if(t==="default"){se(i,a);return}let n=t;const r=t==="compact-pill"||t.startsWith("compact-pill");document.documentElement.classList.toggle("compact-skin-active",r),document.body.classList.toggle("compact-skin-active",r),r?n=e==="dark"?"compact-pill-dark.html":"compact-pill-light.html":!n.endsWith(".html")&&!n.endsWith(".htm")&&(n=n+".html");let c=!1;r&&te[n]?(Ut(te[n],i),c=!0):c=await ze(n,i),c&&(localStorage.setItem("melo-active-skin-id",t),a&&j("melo:skin-changed",t))}async function Re(t){if(ut)try{const{invoke:e}=await X(async()=>{const{invoke:i}=await import("./core-DhEqZVGG.js");return{invoke:i}},[]);await e("open_skins_folder"),t&&t("Opening skins folder...")}catch{t&&t("Could not open skins folder")}else t&&t("Skins are located in the skins/ folder")}function aa(t){const e=document.getElementById("skinUpload"),i=document.getElementById("linkDownloadExample");i&&i.addEventListener("click",r=>{r.preventDefault(),ze("compact-pill-light.html")});const a=localStorage.getItem("melo-active-skin-id")||"default",n=localStorage.getItem("lumi-theme")||"dark";a!=="default"&&setTimeout(()=>{Ot(a,n,void 0,!1)},150),ot("melo:theme",r=>{const c=localStorage.getItem("melo-active-skin-id");c&&c!=="default"&&Ot(c,r,void 0,!1)}),ot("melo:skin-changed",r=>{if(r&&typeof r=="string"){const c=localStorage.getItem("lumi-theme")||"dark";Ot(r,c,void 0,!1)}}),e&&e.addEventListener("change",async()=>{var d;const r=(d=e.files)==null?void 0:d[0];if(!r)return;const c=await r.text(),m=r.name;if(ut)try{const{invoke:s}=await X(async()=>{const{invoke:g}=await import("./core-DhEqZVGG.js");return{invoke:g}},[]);await s("save_custom_skin_file",{filename:m,content:c}),t(`Saved ${m} to skins folder`)}catch{}Ut(c,t),localStorage.setItem("melo-active-skin-id",m),j("melo:skin-changed",m),e.value=""}),document.addEventListener("dragover",r=>{var c;[...((c=r.dataTransfer)==null?void 0:c.types)||[]].includes("Files")&&r.preventDefault()}),document.addEventListener("drop",async r=>{var m;const c=[...((m=r.dataTransfer)==null?void 0:m.files)||[]].find(d=>d.name.endsWith(".html")||d.name.endsWith(".htm"));if(c){r.preventDefault();const d=await c.text();if(d.includes("<style")||d.includes("<html")||Be(d)){const s=c.name;if(ut)try{const{invoke:g}=await X(async()=>{const{invoke:y}=await import("./core-DhEqZVGG.js");return{invoke:y}},[]);await g("save_custom_skin_file",{filename:s,content:d})}catch{}Ut(d,t),localStorage.setItem("melo-active-skin-id",s),j("melo:skin-changed",s)}}}),window.LumiSkin={applyCustomSkin:Ut,resetSkin:se,applySkinChoice:Ot,listInstalledSkins:Pe,openSkinsFolderOnDisk:Re}}const ia=(t,e,i)=>{const a=t[e];return a?typeof a=="function"?a():Promise.resolve(a):new Promise((n,r)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(r.bind(null,new Error("Unknown variable dynamic import: "+e+(e.split("/").length!==i?". Note that variables only represent file names one level deep.":""))))})},$e={code:"en",name:"English",nativeName:"English",authors:["Melo Team"]},ce={_meta:$e,"settings.tabs.general":"General","settings.tabs.playback":"Playback","settings.tabs.appearance":"Appearance & Skin","settings.tabs.shortcuts":"Shortcuts","settings.tabs.about":"About","settings.general.language.label":"Language","settings.general.language.desc":"Interface language — more languages coming via community translation","settings.general.tray.label":"Close to system tray","settings.general.tray.desc":"Minimize to system tray on window close","settings.general.resume.label":"Resume playback on reopen","settings.general.resume.desc":"Continue playback of the previous track where you left off","settings.playback.replaygain.label":"ReplayGain normalization","settings.playback.replaygain.desc":"Equalize track volume levels automatically","settings.playback.fadepause.label":"Fade out on pause","settings.playback.fadepause.desc":"Smooth 0.3s fade-out on pause, fade back in on resume","settings.appearance.showstop.label":"Show Stop button","settings.appearance.showstop.desc":"Display a Stop control next to Play/Pause in the player"},na=Object.freeze(Object.defineProperty({__proto__:null,_meta:$e,default:ce},Symbol.toStringTag,{value:"Module"})),De=[{code:"en",nativeName:"English"}],qt={en:ce};let qe=qt.en,Oe="en";function oa(){return Oe}async function Ue(t){if(De.some(e=>e.code===t)||(t="en"),!qt[t])if(t==="en")qt.en=ce;else try{const e=await ia(Object.assign({"./locales/en.json":()=>X(()=>Promise.resolve().then(()=>na),void 0)}),`./locales/${t}.json`,3);qt[t]=e.default||e}catch{t="en"}Oe=t,qe=qt[t]||qt.en,localStorage.setItem("melo-pref-language",t),document.dispatchEvent(new CustomEvent("melo:locale-changed",{detail:t}))}function gt(t){var e,i;return(i=(e=qe[t])!=null?e:qt.en[t])!=null?i:t}function Le(){const t=localStorage.getItem("melo-pref-language")||"en";Ue(t)}const He=document.querySelector("#app");He.innerHTML=`
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
`;const ft=new URLSearchParams(location.search).get("panel");var Te,Ae;if(ut&&ft){X(async()=>{const{getCurrentWindow:a}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:a}},__vite__mapDeps([8,7,1,0])).then(({getCurrentWindow:a})=>{const n=a();sa(n,"melo-geo-panel-"+ft),n.onCloseRequested(()=>{j("melo:panel-closed",ft)}),window.addEventListener("beforeunload",()=>{j("melo:panel-closed",ft)})});const t=document.getElementById("win-"+ft),e=((Te=t==null?void 0:t.querySelector(".float-title"))==null?void 0:Te.innerHTML)||"",i=((Ae=t==null?void 0:t.querySelector(".float-body"))==null?void 0:Ae.innerHTML)||"";He.innerHTML=`
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
</div>`}ut&&!ft&&(document.documentElement.classList.add("tauri-main"),document.body.classList.add("tauri-main"),document.querySelectorAll(".side-actions .sbtn").forEach(t=>t.classList.remove("active")),X(async()=>{const{WebviewWindow:t}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:t}},__vite__mapDeps([6,7,1,0,8])).then(({WebviewWindow:t})=>{const e=async()=>{var i;for(const a of["library","playlist","equalizer","lyrics","settings"])try{const n=await t.getByLabel("panel-"+a);(i=document.getElementById(de[a]))==null||i.classList.toggle("active",!!n)}catch{}};e(),setInterval(e,1200)}));ut&&!ft&&(X(()=>import("./window-BWd3Cypy.js"),__vite__mapDeps([8,7,1,0])).then(async({getCurrentWindow:t})=>{const e=t(),i=()=>{const n=localStorage.getItem("melo-active-skin-id"),r=n==="compact-pill"||typeof n=="string"&&n.startsWith("compact-pill");return{w:r?780:960,h:r?138:240}};try{const n=JSON.parse(localStorage.getItem("melo-geo-main")||"null"),{LogicalPosition:r,LogicalSize:c}=await X(async()=>{const{LogicalPosition:g,LogicalSize:y}=await import("./dpi-fvP-W2qr.js");return{LogicalPosition:g,LogicalSize:y}},__vite__mapDeps([7,1])),m=i(),d=m.w===780,s=d?m.w:n!=null&&n.w?Math.max(650,n.w):m.w;await e.setSize(new c(s,m.h)),await e.setResizable(!d),(n==null?void 0:n.x)!=null&&(n==null?void 0:n.y)!=null&&await e.setPosition(new r(n.x,n.y))}catch{}const a=async()=>{try{const n=await e.outerPosition(),r=await e.innerSize(),c=i();localStorage.setItem("melo-geo-main",JSON.stringify({x:n.x,y:n.y,w:r.width,h:c.h}))}catch{}};e.onMoved(a),e.onResized(async()=>{try{const n=await e.innerSize(),r=i(),c=r.w===780,{LogicalSize:m}=await X(async()=>{const{LogicalSize:d}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:d}},__vite__mapDeps([7,1]));c?(n.width!==r.w||n.height!==r.h)&&await e.setSize(new m(r.w,r.h)):(n.width<650||n.height!==r.h)&&await e.setSize(new m(Math.max(650,n.width),r.h))}catch{}a()}),ot("melo:skin-changed",async n=>{try{!ft&&n&&await Ot(n,Pt,void 0,!1);const r=n==="compact-pill"||typeof n=="string"&&n.startsWith("compact-pill"),c=r?780:960,m=r?138:240,{LogicalSize:d}=await X(async()=>{const{LogicalSize:s}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:s}},__vite__mapDeps([7,1]));await e.setSize(new d(c,m)),await e.setResizable(!r),a()}catch{}}),e.onCloseRequested(async n=>{if(n.preventDefault(),localStorage.getItem("melo-pref-tray")!=="0")try{await e.hide();return}catch{}const{WebviewWindow:c}=await X(async()=>{const{WebviewWindow:m}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:m}},__vite__mapDeps([6,7,1,0,8]));for(const m of["library","playlist","equalizer","lyrics","settings"])try{const d=await c.getByLabel("panel-"+m);d&&await d.close()}catch{}try{await e.destroy()}catch{window.close()}})}),X(()=>import("./core-DhEqZVGG.js"),[]).then(async({invoke:t})=>{try{const e=await t("get_cli_tracks");if(Array.isArray(e)&&e.length>0){const i=window.LumiLibrary,a=window.LumiPlayer;e.forEach(n=>n.source="import"),i==null||i.addToCurrentPlaylist(e),e.forEach(n=>a==null?void 0:a.queue.push(n)),setTimeout(()=>{if(a&&a.queue.length>0){const n=a.queue.findIndex(r=>r.id===e[0].id);a.loadTrack(n>=0?n:0,!0)}},150)}}catch{}}),ot("melo:open-files",t=>{if(Array.isArray(t)&&t.length>0){const e=window.LumiLibrary,i=window.LumiPlayer;t.forEach(a=>a.source="import"),e==null||e.addToCurrentPlaylist(t),t.forEach(a=>i==null?void 0:i.queue.push(a)),pt(`Playing ${t[0].title}`),setTimeout(()=>{if(i&&i.queue.length>0){const a=i.queue.findIndex(n=>n.id===t[0].id);i.loadTrack(a>=0?a:0,!0)}},150)}}));document.addEventListener("contextmenu",t=>{t.preventDefault()});const Qt=document.getElementById("toast"),pt=t=>{Qt&&(Qt.textContent=t,Qt.classList.add("show"),setTimeout(()=>Qt.classList.remove("show"),2200))},Mt=new Audio;Mt.preload="metadata";Mt.crossOrigin="anonymous";window.__LUMI_AUDIO__=Mt;window.__TOAST__=pt;let Pt=localStorage.getItem("lumi-theme")||"dark";function ae(t){document.documentElement.setAttribute("data-theme",t),localStorage.setItem("lumi-theme",t),Pt=t}function Ne(t){ae(t),j("melo:theme",t)}ae(Pt);ot("melo:theme",t=>{(t==="light"||t==="dark")&&ae(t)});setInterval(()=>{const t=localStorage.getItem("lumi-theme");(t==="light"||t==="dark")&&t!==Pt&&ae(t)},1e3);document.body.classList.toggle("show-stop-btn",localStorage.getItem("melo-pref-showStopBtn")==="1");ot("melo:pref-changed",t=>{t&&t.key==="showStopBtn"&&document.body.classList.toggle("show-stop-btn",!!t.value)});const ra=["win-library","win-playlist","win-equalizer","win-lyrics","win-settings"],ee=document.getElementById("desktop"),Ve={btnToggleLibrary:"win-library",btnTogglePlaylist:"win-playlist",btnToggleEq:"win-equalizer",btnToggleLyrics:"win-lyrics",btnOpenSettings:"win-settings",menuToggleLibrary:"win-library",menuTogglePlaylist:"win-playlist",menuToggleEq:"win-equalizer",menuToggleLyrics:"win-lyrics",menuToggleSettings:"win-settings"};function la(t){const e=document.getElementById(t);return!!e&&!e.classList.contains("hidden")}const de={library:"btnToggleLibrary",playlist:"btnTogglePlaylist",equalizer:"btnToggleEq",lyrics:"btnToggleLyrics",settings:"btnOpenSettings"};async function sa(t,e){const i=async()=>{try{const a=await t.outerPosition(),n=await t.outerSize();localStorage.setItem(e,JSON.stringify({x:a.x,y:a.y,w:n.width,h:n.height}))}catch{}};t.onMoved(i),t.onResized(i)}async function ca(t){const{WebviewWindow:e}=await X(async()=>{const{WebviewWindow:g}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:g}},__vite__mapDeps([6,7,1,0,8])),i="panel-"+t,a=document.getElementById(de[t]),n=await e.getByLabel(i);if(n){await n.close(),a==null||a.classList.remove("active");return}const r={library:[430,620],playlist:[440,560],equalizer:[700,440],lyrics:[380,520],settings:[600,540]},c={library:[360,400],playlist:[360,360],equalizer:[620,400],lyrics:[320,360],settings:[500,400]},m={library:"Library",playlist:"Playlist",equalizer:"Equalizer",lyrics:"Lyric",settings:"Settings"},d=r[t]||[420,520];let s=null;try{s=JSON.parse(localStorage.getItem("melo-geo-panel-"+t)||"null")}catch{}new e(i,{url:`/?panel=${t}`,title:m[t]||t,width:(s==null?void 0:s.w)||d[0],height:(s==null?void 0:s.h)||d[1],minWidth:(c[t]||[360,360])[0],minHeight:(c[t]||[360,360])[1],...(s==null?void 0:s.x)!=null?{x:s.x,y:s.y}:{center:!0},decorations:!1,transparent:!0,shadow:!1,skipTaskbar:!0}),a==null||a.classList.add("active"),j("melo:theme",Pt)}ot("melo:panel-closed",t=>{var i;const e=de[t];e&&((i=document.getElementById(e))==null||i.classList.remove("active"))});function pe(t){if(ut){ca(t.replace(/^win-/,""));return}const e=la(t);Xt(t,!e),e||ie(document.getElementById(t))}function da(t){if(t.classList.contains("hidden")||!ee||window.matchMedia("(max-width: 860px)").matches)return;const e=ee.getBoundingClientRect();if(e.width<=0||e.height<=0)return;const i=t.getBoundingClientRect(),a=Math.min(i.width,e.width),n=Math.min(i.height,e.height);let r=i.left-e.left,c=i.top-e.top;r=Math.max(0,Math.min(e.width-a,r)),c=Math.max(0,Math.min(e.height-n,c)),t.style.left=r+"px",t.style.top=c+"px",t.style.right="auto",t.style.bottom="auto",t.style.transform="none"}function Xt(t,e){var n,r,c,m,d,s,g,y,k,_;const i=document.getElementById(t);if(!i)return;i.classList.toggle("hidden",!e),localStorage.setItem("lumiv2-"+t,e?"1":"0"),e&&da(i);const a=e;t==="win-library"&&((n=document.getElementById("btnToggleLibrary"))==null||n.classList.toggle("active",a),(r=document.getElementById("menuToggleLibrary"))==null||r.classList.toggle("active",a)),t==="win-playlist"&&((c=document.getElementById("btnTogglePlaylist"))==null||c.classList.toggle("active",a),(m=document.getElementById("menuTogglePlaylist"))==null||m.classList.toggle("active",a)),t==="win-equalizer"&&((d=document.getElementById("btnToggleEq"))==null||d.classList.toggle("active",a),(s=document.getElementById("menuToggleEq"))==null||s.classList.toggle("active",a)),t==="win-lyrics"&&((g=document.getElementById("btnToggleLyrics"))==null||g.classList.toggle("active",a),(y=document.getElementById("menuToggleLyrics"))==null||y.classList.toggle("active",a)),t==="win-settings"&&((k=document.getElementById("btnOpenSettings"))==null||k.classList.toggle("active",a),(_=document.getElementById("menuToggleSettings"))==null||_.classList.toggle("active",a))}ft||ra.forEach(t=>{const e=localStorage.getItem("lumiv2-"+t);e!==null?Xt(t,e==="1"):t==="win-settings"?Xt(t,!1):Xt(t,!0)});Object.entries(Ve).forEach(([t,e])=>{var i;(i=document.getElementById(t))==null||i.addEventListener("click",()=>pe(e))});document.querySelectorAll("[data-close]").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.close;Xt(e,!1)})});let xt=null,It=null,Me=10;function ie(t){Me++,t.style.zIndex=String(Me),document.querySelectorAll(".float-win").forEach(e=>e.classList.remove("active")),t.classList.add("active")}document.querySelectorAll(".float-win").forEach(t=>{t.addEventListener("mousedown",()=>ie(t))});document.querySelectorAll("[data-drag]").forEach(t=>{t.addEventListener("mousedown",e=>{if(e.target.closest("button")||e.target.closest("input")||e.target.closest("select"))return;const i=t.dataset.drag,a=document.getElementById(i);ie(a),a.classList.add("dragging");const n=a.getBoundingClientRect();xt={id:i,startX:e.clientX,startY:e.clientY,initX:n.left,initY:n.top,width:n.width,height:n.height}})});document.querySelectorAll("[data-resize]").forEach(t=>{t.addEventListener("mousedown",e=>{e.stopPropagation();const i=t.dataset.resize,a=document.getElementById(i);ie(a),a.classList.add("resizing");const n=a.getBoundingClientRect();It={id:i,startX:e.clientX,startY:e.clientY,initW:n.width,initH:n.height}})});window.addEventListener("mousemove",t=>{if(xt){const e=document.getElementById(xt.id);let i=t.clientX-xt.startX,a=t.clientY-xt.startY,n=xt.initX+i,r=xt.initY+a;if(ee&&!window.matchMedia("(max-width: 860px)").matches){const c=ee.getBoundingClientRect(),m=c.left,d=c.right-xt.width,s=c.top,g=c.bottom-xt.height;n=Math.max(m,Math.min(d,n))-c.left,r=Math.max(s,Math.min(g,r))-c.top}e.style.left=n+"px",e.style.top=r+"px",e.style.right="auto",e.style.bottom="auto",e.style.transform="none"}if(It){const e=document.getElementById(It.id);let i=It.initW+(t.clientX-It.startX),a=It.initH+(t.clientY-It.startY);i=Math.max(260,i),a=Math.max(160,a),e.style.width=i+"px",e.style.height=a+"px"}});window.addEventListener("mouseup",()=>{if(xt){const t=document.getElementById(xt.id);t&&(t.classList.remove("dragging"),localStorage.setItem("lumiv2-pos-"+xt.id,JSON.stringify({left:t.style.left,top:t.style.top}))),xt=null}if(It){const t=document.getElementById(It.id);t&&(t.classList.remove("resizing"),localStorage.setItem("lumiv2-size-"+It.id,JSON.stringify({width:t.style.width,height:t.style.height}))),It=null}});async function Fe(){const t=window.LumiLibrary,e=window.LumiPlayer;if(ut){try{const{open:a}=await X(async()=>{const{open:d}=await import("./index-CS3Qnt9j.js");return{open:d}},__vite__mapDeps([5,1])),n=await a({multiple:!0,filters:[{name:"Audio",extensions:["mp3","flac","wav","aac","ogg","m4a","alac","opus","wma","aiff"]}]});if(!n)return;const r=Array.isArray(n)?n:[n],{invoke:c}=await X(async()=>{const{invoke:d}=await import("./core-DhEqZVGG.js");return{invoke:d}},[]),m=[];for(const d of r)try{const s=await c("scan_library",{path:d});if(s&&s.length)s.forEach(g=>g.source="import"),m.push(...s);else{const g=d.replace(/^.*[\\/]/,""),y=g.lastIndexOf("."),k=y>0?g.slice(0,y):g,_=y>0?g.slice(y+1).toUpperCase():"AUDIO";m.push({id:d,title:k,artist:"Unknown Artist",album:"Single",duration:0,path:d,codec:_,specs:"Local File",source:"import"})}}catch{const s=d.replace(/^.*[\\/]/,""),g=s.lastIndexOf("."),y=g>0?s.slice(0,g):s,k=g>0?s.slice(g+1).toUpperCase():"AUDIO";m.push({id:d,title:y,artist:"Unknown Artist",album:"Single",duration:0,path:d,codec:k,specs:"Local File",source:"import"})}t==null||t.addTracks(m,!0),t==null||t.addToCurrentPlaylist(m),m.forEach(d=>e==null?void 0:e.queue.push(d)),j("melo:play-tracks",{tracks:m,index:0}),pt(`${m.length} file(s) added`)}catch{pt("Error opening files")}return}const i=document.createElement("input");i.type="file",i.multiple=!0,i.accept="audio/*,.mp3,.flac,.wav,.aac,.ogg,.m4a,.alac,.opus,.wma,.aiff",i.onchange=async()=>{const a=Array.from(i.files||[]);if(!a.length)return;const n=[];for(const r of a){const c=r.path,m=c||URL.createObjectURL(r),d=r.name,s=d.lastIndexOf("."),g=s>0?d.slice(0,s):d,y=s>0?d.slice(s+1).toUpperCase():"AUDIO",k={id:c||"imp_"+Math.random().toString(36).slice(2,9),title:g,artist:"Unknown Artist",album:"Single",duration:0,path:m,codec:y,specs:"Local File",source:"import"};await Jt(r,k),n.push(k)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(r=>e==null?void 0:e.queue.push(r)),j("melo:play-tracks",{tracks:n,index:0}),pt(`${n.length} file(s) added`)},i.click()}async function We(){const t=window.LumiLibrary,e=window.LumiPlayer;if(ut){try{const{open:a}=await X(async()=>{const{open:s}=await import("./index-CS3Qnt9j.js");return{open:s}},__vite__mapDeps([5,1])),n=await a({directory:!0});if(!n)return;const r=n,{invoke:c}=await X(async()=>{const{invoke:s}=await import("./core-DhEqZVGG.js");return{invoke:s}},[]),d=(await c("scan_library",{path:r})).map(s=>({...s,source:"import"}));t==null||t.addTracks(d,!0),t==null||t.addToCurrentPlaylist(d),d.forEach(s=>e==null?void 0:e.queue.push(s)),j("melo:play-tracks",{tracks:d,index:0}),pt(`${d.length} track(s) added from folder`)}catch{pt("Error scanning folder")}return}const i=document.createElement("input");i.type="file",i.webkitdirectory=!0,i.multiple=!0,i.accept="audio/*",i.onchange=async()=>{const a=Array.from(i.files||[]).filter(r=>/\.(mp3|flac|wav|aac|ogg|m4a|alac|opus|wma|aiff)$/i.test(r.name));if(!a.length)return;const n=[];for(const r of a){const c=r.path,m=c||URL.createObjectURL(r),d=r.name,s=d.lastIndexOf("."),g=s>0?d.slice(0,s):d,y=s>0?d.slice(s+1).toUpperCase():"AUDIO",k={id:c||"imp_"+Math.random().toString(36).slice(2,9),title:g,artist:"Unknown Artist",album:"Folder Import",duration:0,path:m,codec:y,specs:"Local File",source:"import"};await Jt(r,k),n.push(k)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(r=>e==null?void 0:e.queue.push(r)),j("melo:play-tracks",{tracks:n,index:0}),pt(`${n.length} file(s) added from folder`)},i.click()}document.addEventListener("click",t=>{var i;const e=(i=t.target)==null?void 0:i.closest("#btnAddFiles, #btnAddFolder, #btnThemeToggle");e&&(e.id==="btnAddFiles"?Fe():e.id==="btnAddFolder"?We():e.id==="btnThemeToggle"&&Ne(Pt==="light"?"dark":"light"))});window.addEventListener("keydown",t=>{(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="o"&&(t.shiftKey?(t.preventDefault(),We()):(t.preventDefault(),Fe())),((t.ctrlKey||t.metaKey)&&t.key===","||t.key==="F2")&&(t.preventDefault(),pe("win-settings"))});function Ie(t){var k,_;function e(S){document.querySelectorAll(".settings-tab").forEach(b=>{b.classList.toggle("active",b.dataset.stab===S)}),document.querySelectorAll(".settings-section[data-panel]").forEach(b=>{b.classList.toggle("active",b.dataset.panel===S)}),localStorage.setItem("melo-settings-tab",S)}document.querySelectorAll(".settings-tab").forEach(S=>{S.addEventListener("click",()=>e(S.dataset.stab))}),e(localStorage.getItem("melo-settings-tab")||"general"),document.querySelectorAll(".switch[data-key]").forEach(S=>{const b=S.dataset.key,H=localStorage.getItem("melo-pref-"+b);H!==null&&S.classList.toggle("on",H==="1"),S.onclick=()=>{S.classList.toggle("on");const $=S.classList.contains("on");localStorage.setItem("melo-pref-"+b,$?"1":"0"),t($?"Enabled":"Disabled"),j("melo:pref-changed",{key:b,value:$})}});const i=document.getElementById("setLanguage");i&&(i.value=oa(),i.onchange=async()=>{await Ue(i.value),t(`Language set to ${i.options[i.selectedIndex].text} — restart Melo to fully apply`)});const a=document.getElementById("swDynamicTheme");if(a){const S=localStorage.getItem("melo-dynamic-theme")!=="0";a.classList.toggle("on",S),a.onclick=()=>{var Q,st;const b=!a.classList.contains("on");a.classList.toggle("on",b),localStorage.setItem("melo-dynamic-theme",b?"1":"0");const H=window.__LUMI_QUEUE__,$=(st=(Q=window.LumiPlayer)==null?void 0:Q.currentIndex)!=null?st:0;H&&H[$]&&Ce(b?H[$].cover:null),t(b?"Dynamic theme enabled":"Dynamic theme disabled")}}const n=document.getElementById("skinSelect"),r=document.getElementById("btnSkinThemeToggle"),c=document.getElementById("btnRefreshSkins"),m=document.getElementById("btnOpenSkinsFolder"),d=document.getElementById("skinThemeIcon"),s=document.getElementById("skinThemeLabel");function g(S){d&&(d.textContent=S==="dark"?"🌙":"☀️"),s&&(s.textContent=S==="dark"?"Dark":"Light")}g(Pt),r==null||r.addEventListener("click",()=>{const S=Pt==="dark"?"light":"dark";Ne(S),g(S),t(S==="dark"?"Dark theme":"Light theme")}),ot("melo:theme",S=>{(S==="light"||S==="dark")&&g(S)});async function y(){if(!n)return;const S=localStorage.getItem("melo-active-skin-id")||"default",b=await Pe();n.innerHTML=`
      <option value="default">Default Melo (Standard)</option>
      <option value="compact-pill">Minimal Compact (Pill Bar)</option>
    `,b.forEach(H=>{if(H.filename!=="compact-pill-light.html"&&H.filename!=="compact-pill-dark.html"){const $=document.createElement("option");$.value=H.filename,$.textContent=`${H.name} (${H.filename})`,n.appendChild($)}}),n.value=S}y(),n&&(n.onchange=()=>{const S=n.value;Ot(S,Pt,t)}),c==null||c.addEventListener("click",async()=>{await y();const S=localStorage.getItem("melo-active-skin-id")||"default";Ot(S,Pt,t),t("Skins reloaded from disk")}),m==null||m.addEventListener("click",()=>{Re(t)}),(k=document.getElementById("btn-reset-skin-settings"))==null||k.addEventListener("click",()=>{se(t),n&&(n.value="default")}),(_=document.getElementById("btn-settings-reset"))==null||_.addEventListener("click",()=>{localStorage.clear(),t("Settings reset — reloading..."),setTimeout(()=>location.reload(),600)})}function je(){document.querySelectorAll(".win-btn").forEach(t=>{t.onclick=async()=>{const e=t.getAttribute("aria-label");if(window.__TAURI__){const{getCurrentWindow:i}=await X(async()=>{const{getCurrentWindow:n}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:n}},__vite__mapDeps([8,7,1,0])),a=i();e==="minimize"?a.minimize():e==="maximize"?a.toggleMaximize():e==="close"&&a.close()}else e==="close"&&pt("Window close requires the Tauri desktop build"),e==="maximize"&&pt("Resize: drag corner handle")}})}je();window.__LUMI_REBIND_MAIN__=()=>{je(),Object.entries(Ve).forEach(([t,e])=>{const i=document.getElementById(t);i&&(i.onclick=()=>pe(e))})};const Ft=document.createElement("div");Ft.id="scanBar";document.body.appendChild(Ft);let _e=0;ot("melo:scan-progress",t=>{if(!t)return;const e=t.total?Math.round(t.done/t.total*100):100;Ft.style.opacity="1",Ft.style.width=e+"%",clearTimeout(_e),(t.finished||t.total&&t.done>=t.total)&&(_e=setTimeout(()=>{Ft.style.opacity="0",Ft.style.width="0"},800))});ut&&!ft&&ot("melo:scan-batch",t=>{const e=window.LumiLibrary;e&&Array.isArray(t)&&t.length&&(t.forEach(i=>i.source="scan"),e.addTracks(t,!0),e.addToCurrentPlaylist(t))});const Ht=document.createElement("div");Ht.id="aboutPop";Ht.style.display="none";document.body.appendChild(Ht);document.addEventListener("click",t=>{var e,i;(e=t.target)!=null&&e.closest("#btnAbout")&&(t.stopPropagation(),Ht.innerHTML=`
    <div class="about-head">Melo <b>0.3 Beta</b></div>
    <div style="font-size:11.5px; color:var(--text-soft); margin:6px 0 10px;">
      Modern Windows Music Player<br/>
      Tauri 2 + TypeScript + Rust
    </div>
    <a class="about-link" id="aboutLink" href="https://github.com/Arvanta/Melo" rel="noopener">github.com/Arvanta/Melo ↗</a>`,Ht.style.display=Ht.style.display==="none"?"block":"none",(i=document.getElementById("aboutLink"))==null||i.addEventListener("click",a=>{a.preventDefault();const n="https://github.com/Arvanta/Melo";ut?X(()=>import("./core-DhEqZVGG.js"),[]).then(r=>r.invoke("open_url",{url:n})).catch(()=>window.open(n,"_blank")):window.open(n,"_blank")}))});document.addEventListener("click",t=>{!t.target.closest("#aboutPop")&&!t.target.closest("#btnAbout")&&(Ht.style.display="none")});ut&&ft?ft==="library"||ft==="playlist"?be(Mt,pt):ft==="equalizer"?we(Mt,pt,{remote:!0}):ft==="lyrics"?ke(Mt):ft==="settings"&&(Le(),Ie(pt)):(Ke(Mt,pt),be(Mt,pt),we(Mt,pt),ta(Mt),ke(Mt),aa(pt),Ie(pt),Le(),setTimeout(()=>{if(localStorage.getItem("melo-pref-resume")!=="0")try{const t=JSON.parse(localStorage.getItem("melo-resume-state")||"null"),e=window.LumiLibrary,i=window.LumiPlayer;if(!(t!=null&&t.trackId)||!e||!i)return;const a=e.tracks,n=a.findIndex(r=>r.id===t.trackId);if(n===-1)return;i.queue=a,i.loadTrack(n,!1,t.position||0)}catch{}},400));ft||pt("Melo 0.3 Beta is ready");
//# sourceMappingURL=index-DBDPUcPp.js.map
