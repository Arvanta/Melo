const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/event-CNdo2oXa.js","assets/core-DhEqZVGG.js","assets/index-DiyoAAdc.js","assets/index-CHth0gh2.js","assets/index-Bq0iOnRE.js","assets/index-CS3Qnt9j.js","assets/webviewWindow-mjQkSB26.js","assets/dpi-fvP-W2qr.js","assets/window-BWd3Cypy.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();const He="modulepreload",Ve=function(t){return"/"+t},le={},N=function(e,a,i){let n=Promise.resolve();if(a&&a.length>0){let l=function(r){return Promise.all(r.map(g=>Promise.resolve(g).then(x=>({status:"fulfilled",value:x}),x=>({status:"rejected",reason:x}))))};document.getElementsByTagName("link");const h=document.querySelector("meta[property=csp-nonce]"),p=(h==null?void 0:h.nonce)||(h==null?void 0:h.getAttribute("nonce"));n=l(a.map(r=>{if(r=Ve(r),r in le)return;le[r]=!0;const g=r.endsWith(".css"),x=g?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${x}`))return;const f=document.createElement("link");if(f.rel=g?"stylesheet":He,g||(f.as="script"),f.crossOrigin="",f.href=r,p&&f.setAttribute("nonce",p),document.head.appendChild(f),g)return new Promise((M,C)=>{f.addEventListener("load",M),f.addEventListener("error",()=>C(new Error(`Unable to preload CSS for ${r}`)))})}))}function s(l){const h=new Event("vite:preloadError",{cancelable:!0});if(h.payload=l,window.dispatchEvent(h),!h.defaultPrevented)throw l}return n.then(l=>{for(const h of l||[])h.status==="rejected"&&s(h.reason);return e().catch(s)})},Tt=typeof window.__TAURI_INTERNALS__<"u"||typeof window.__TAURI__<"u";async function Y(t,e){if(Tt)try{const{emit:a}=await N(async()=>{const{emit:i}=await import("./event-CNdo2oXa.js");return{emit:i}},__vite__mapDeps([0,1]));await a(t,e)}catch{window.dispatchEvent(new CustomEvent(t,{detail:e}))}else window.dispatchEvent(new CustomEvent(t,{detail:e}))}function at(t,e){Tt?N(async()=>{const{listen:a}=await import("./event-CNdo2oXa.js");return{listen:a}},__vite__mapDeps([0,1])).then(({listen:a})=>{a(t,i=>e(i.payload))}).catch(()=>{window.addEventListener(t,a=>e(a.detail))}):window.addEventListener(t,a=>e(a.detail))}let re=!1;async function Ne(){if(!re){re=!0;try{const t=globalThis;if(typeof t.Buffer>"u"){const e=await N(()=>import("./index-DiyoAAdc.js").then(a=>a.i),__vite__mapDeps([2,3]));t.Buffer=e.Buffer}typeof t.process>"u"&&(t.process={env:{},browser:!0,nextTick:e=>setTimeout(e,0)})}catch{}}}async function Fe(t,e){var a;try{await Ne();const i=await N(()=>import("./index-Bq0iOnRE.js").then(r=>r.i),__vite__mapDeps([4,3])),n=i&&typeof i.parseBlob=="function"?i:i.default||i,s=await Promise.race([n.parseBlob(t),new Promise((r,g)=>setTimeout(()=>g(new Error("timeout")),1800))]),l=s==null?void 0:s.common;if(!l)return;l.title&&(e.title=l.title),l.artist?e.artist=l.artist:l.artists&&l.artists[0]&&(e.artist=l.artists[0]),l.album&&(e.album=l.album),l.genre&&l.genre[0]&&(e.genre=l.genre[0]),l.year&&(e.year=l.year);const h=(a=l.picture)==null?void 0:a[0];if(h&&h.data){const r=h.format||"image/jpeg",g=h.data;if(g.length>6e5)return;let x="";const f=8192;for(let M=0;M<g.length;M+=f){const C=g.subarray(M,M+f);x+=String.fromCharCode.apply(null,C)}e.cover=`data:${r};base64,${btoa(x)}`}const p=s==null?void 0:s.format;p&&p.duration&&!e.duration&&(e.duration=Math.floor(p.duration))}catch{}}async function Ht(t,e,a=1800){return await Fe(t,e),e}async function We(t){return new Promise(e=>{if(!t)return e(null);const a=new Image;a.crossOrigin="anonymous",a.onload=()=>{try{const i=document.createElement("canvas"),n=i.getContext("2d");if(!n)return e(null);i.width=40,i.height=40,n.drawImage(a,0,0,40,40);const s=n.getImageData(0,0,40,40).data;let l={r:42,g:123,b:214},h=-1;for(let p=0;p<s.length;p+=4){const r=s[p],g=s[p+1],x=s[p+2];if(s[p+3]<128)continue;const M=Math.max(r,g,x),C=Math.min(r,g,x),$=(M+C)/510,X=M-C,B=X===0?0:X/(1-Math.abs(2*$-1));if(B>.25&&$>.25&&$<.82){const q=B*1.5+(1-Math.abs($-.5));q>h&&(h=q,l={r,g,b:x})}}h>0?e(l):e(null)}catch{e(null)}},a.onerror=()=>e(null),a.src=t})}async function Ce(t){const e=localStorage.getItem("melo-dynamic-theme")!=="0",a=document.documentElement;if(!e||!t){a.style.removeProperty("--accent"),a.style.removeProperty("--visualizer"),a.style.removeProperty("--accent-glow");return}const i=await We(t);if(i){const n=`rgb(${i.r}, ${i.g}, ${i.b})`;a.style.setProperty("--accent",n),a.style.setProperty("--visualizer",n),a.style.setProperty("--accent-glow",`rgba(${i.r}, ${i.g}, ${i.b}, 0.35)`)}else a.style.removeProperty("--accent"),a.style.removeProperty("--visualizer"),a.style.removeProperty("--accent-glow")}const $t=[31,62,125,250,500,1e3,2e3,4e3,8e3,16e3];let xt=null,ce=null,Jt=[],Ot=null,Pt=null;function Qt(t){if(!xt){const e=window.AudioContext||window.webkitAudioContext;xt=new e,ce=xt.createMediaElementSource(t),Jt=$t.map(i=>{const n=xt.createBiquadFilter();return n.type="peaking",n.frequency.value=i,n.Q.value=1.4,n.gain.value=0,n}),Ot=xt.createGain(),Ot.gain.value=1,Pt=xt.createAnalyser(),Pt.fftSize=2048,Pt.smoothingTimeConstant=.72;let a=ce;for(const i of Jt)a.connect(i),a=i;a.connect(Ot),Ot.connect(Pt),Pt.connect(xt.destination)}return{ctx:xt,filters:Jt,gain:Ot,analyser:Pt,resume(){xt&&xt.state==="suspended"&&xt.resume().catch(()=>{})}}}function je(t,e){let a,i,n,s,l,h,p,r=null,g,x,f,M,C,$,X,B,q,J,F,U,b,k=[],_=0,W=!1,j="off",it=!1;window.__LUMI_QUEUE__=k,window.__LUMI_SET_QUEUE__=c=>{k=c,window.__LUMI_QUEUE__=c};function K(c){if(!isFinite(c))return"0:00";const P=Math.floor(c/60),T=Math.floor(c%60).toString().padStart(2,"0");return`${P}:${T}`}function nt(){if(!g)return;const c=parseFloat(g.value)/parseFloat(g.max)*100;g.style.setProperty("--progress",c+"%")}function rt(){x&&x.style.setProperty("--vol",x.value+"%")}async function ut(c){if(/^(https?|data|blob):/.test(c))return c;if(Tt)try{const{convertFileSrc:P}=await N(async()=>{const{convertFileSrc:T}=await import("./core-DhEqZVGG.js");return{convertFileSrc:T}},[]);return P(c)}catch{}return c}async function ot(c,P=!0){c<0&&(c=k.length-1),c>=k.length&&(c=0),_=c;const T=k[c];if(!T)return;$||S(),t.src=await ut(T.path),t.load(),$&&($.textContent=T.title),X&&(X.textContent=T.artist),B&&(B.textContent=T.album),q&&(q.textContent=T.codec),J&&(J.textContent=T.specs),T.cover&&F?(F.src=T.cover,F.style.display="block",U&&(U.style.display="none")):(F&&(F.style.display="none"),U&&(U.style.display="grid")),g&&(g.max=String(T.duration||276),g.value="0",nt()),M&&(M.textContent=K(T.duration)),f&&(f.textContent="0:00"),E(),Ce(T.cover||null),document.querySelectorAll(".track-row").forEach((O,D)=>{var et;O.classList.toggle("active",((et=k[D])==null?void 0:et.id)===T.id)}),document.querySelectorAll("#queueList .track-row").forEach(O=>{O.classList.toggle("active",O.dataset.id===T.id)}),"mediaSession"in navigator&&(navigator.mediaSession.metadata=new MediaMetadata({title:T.title,artist:T.artist,album:T.album,artwork:T.cover?[{src:T.cover,sizes:"512x512",type:"image/jpeg"}]:[]}),navigator.mediaSession.setActionHandler("play",()=>Lt()),navigator.mediaSession.setActionHandler("pause",()=>ht()),navigator.mediaSession.setActionHandler("previoustrack",()=>w()),navigator.mediaSession.setActionHandler("nexttrack",()=>bt()),navigator.mediaSession.setActionHandler("seekto",O=>{O.seekTime&&(t.currentTime=O.seekTime)})),P&&Lt();const R=document.getElementById("lyricsBox");R&&(R.textContent=T.lyrics||"No lyrics found for this track. You can add it via the tag editor."),window.dispatchEvent(new CustomEvent("lumi:trackChange",{detail:T})),Y("melo:track-changed",T)}let vt=!1;function Bt(){vt&&(vt=!1,t.play().then(()=>{i&&(i.style.display="none"),n&&(n.style.display="block")}).catch(()=>{}))}window.addEventListener("pointerdown",Bt),window.addEventListener("keydown",Bt);function Lt(){try{Qt(t).resume()}catch{}t.play().then(()=>{vt=!1,i&&(i.style.display="none"),n&&(n.style.display="block"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="playing")}).catch(()=>{vt||(vt=!0,e("Click once inside the player window to start playback"))})}function ht(){t.pause(),i&&(i.style.display="block"),n&&(n.style.display="none"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}function yt(){t.paused?Lt():ht()}function Z(){t.pause();try{t.currentTime=0}catch{}i&&(i.style.display="block"),n&&(n.style.display="none"),g&&(g.value="0",nt()),f&&(f.textContent="0:00"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}function bt(){if(j==="one"){t.currentTime=0,Lt();return}let c=_+1;if(W&&(c=Math.floor(Math.random()*k.length),c===_&&(c=(c+1)%k.length)),c>=k.length)if(j==="all")c=0;else{ht();return}ot(c)}function w(){if(t.currentTime>3){t.currentTime=0;return}let c=_-1;W&&(c=Math.floor(Math.random()*k.length)),c<0&&(j==="all"?c=k.length-1:c=0),ot(c)}function E(){var D;const c=k[_];if(!c||!x)return;const P=parseInt(x.value)/100,T=b&&b.checked&&(D=c.replayGain)!=null?D:0,R=Math.pow(10,T/20);let O=P*R;O=Math.min(1,Math.max(0,O)),t.volume=O}function S(){if(a=document.getElementById("btnPlay"),i=document.getElementById("iconPlay"),n=document.getElementById("iconPause"),s=document.getElementById("btnPrev"),l=document.getElementById("btnNext"),h=document.getElementById("btnShuffle"),p=document.getElementById("btnRepeat"),r=document.getElementById("btnStop"),g=document.getElementById("seekBar"),x=document.getElementById("volBar"),f=document.getElementById("curTime"),M=document.getElementById("durTime"),C=document.getElementById("volPct"),$=document.getElementById("trackTitle"),X=document.getElementById("trackArtist"),B=document.getElementById("trackAlbum"),q=document.getElementById("trackCodec"),J=document.getElementById("trackSpecs"),F=document.getElementById("coverImg"),U=document.getElementById("coverFallback"),b=document.getElementById("replayGainToggle"),a&&(a.onclick=yt),r&&(r.onclick=Z,r.style.display=localStorage.getItem("lumiv2-showStop")==="1"?"":"none"),s&&(s.onclick=w),l&&(l.onclick=bt),h&&(h.onclick=()=>{W=!W,h.classList.toggle("active",W),e(W?"Playback Shuffle on":"Playback Shuffle off")}),p&&(p.onclick=()=>{j=j==="off"?"all":j==="all"?"one":"off",p.classList.toggle("active",j!=="off");const c={off:"Repeat off",all:"Repeat all",one:"Repeat one"};e(c[j]),p.title=c[j],j==="one"?p.style.color="var(--accent)":p.style.color=""}),g&&(g.oninput=()=>{it=!0,f&&(f.textContent=K(parseFloat(g.value))),nt()},g.onchange=()=>{t.currentTime=parseFloat(g.value),it=!1}),x&&(x.oninput=()=>{rt(),C&&(C.textContent=x.value+"%"),E()}),b&&(b.onchange=()=>E()),nt(),rt(),k[_]){const c=k[_];$&&($.textContent=c.title),X&&(X.textContent=c.artist),B&&(B.textContent=c.album),q&&(q.textContent=c.codec),J&&(J.textContent=c.specs),c.cover&&F&&(F.src=c.cover,F.style.display="block",U&&(U.style.display="none"))}}S(),t.addEventListener("timeupdate",()=>{!it&&g&&f&&(g.value=String(Math.floor(t.currentTime)),f.textContent=K(t.currentTime),nt())}),t.addEventListener("loadedmetadata",()=>{!g||!M||(g.max=String(Math.floor(t.duration||k[_].duration||276)),M.textContent=K(t.duration||k[_].duration),nt())}),t.addEventListener("ended",()=>{bt()}),window.addEventListener("keydown",c=>{c.target.tagName!=="INPUT"&&(c.code==="Space"&&(c.preventDefault(),yt()),c.code==="ArrowRight"&&(t.currentTime+=5),c.code==="ArrowLeft"&&(t.currentTime-=5),(c.key==="m"||c.key==="M")&&(t.muted=!t.muted,e(t.muted?"Muted":"Unmuted")),(c.key==="s"||c.key==="S")&&h&&h.click(),(c.key==="r"||c.key==="R")&&p&&p.click(),c.code==="ArrowUp"&&x&&(x.value=String(Math.min(100,parseInt(x.value)+5)),x.dispatchEvent(new Event("input"))),c.code==="ArrowDown"&&x&&(x.value=String(Math.max(0,parseInt(x.value)-5)),x.dispatchEvent(new Event("input"))))}),at("melo:tray-action",c=>{c==="play_pause"?yt():c==="next"?bt():c==="prev"?w():c==="mute"&&(t.muted=!t.muted,e(t.muted?"Muted":"Unmuted"))}),ot(0,!1),window.LumiPlayer={get queue(){return k},set queue(c){k=c},get currentIndex(){return _},loadTrack:ot,play:Lt,pause:ht,stop:Z,next:bt,prev:w,get audio(){return t},rebind:S},window.__LUMI_REBIND__=S,at("melo:play-tracks",c=>{if(!c||!Array.isArray(c.tracks)||!c.tracks.length)return;k=c.tracks,window.__LUMI_SET_QUEUE__(k);const P=Math.max(0,Math.min(c.index||0,k.length-1));ot(P)}),at("melo:add-queue",c=>{c&&(k.push(c),window.__LUMI_SET_QUEUE__(k))}),at("melo:tag-updated",c=>{c&&k[_]&&k[_].id===c.id&&(Object.assign(k[_],c),ot(_,!1))})}const zt=!!window.__TAURI__,kt=new URLSearchParams(location.search).get("panel")||"main";let Q=[],dt=[];try{const t=localStorage.getItem("melo-playlists");if(t){const e=JSON.parse(t);Array.isArray(e)&&e.length&&(dt=e)}}catch{}dt.length||(dt=[{id:"p1",name:"Favorites",tracks:[],createdAt:Date.now()}]);try{const t=localStorage.getItem("melo-tracks");if(t){const e=JSON.parse(t);Array.isArray(e)&&(Q=e)}}catch{}function de(t,e){var ae,ne,oe,se;const a=document.getElementById("trackList");document.getElementById("playlistList");const i=document.getElementById("winPlaylistTracks"),n=document.getElementById("winPlaylistEmpty"),s=document.getElementById("playlistSelect"),l=document.getElementById("searchInput"),h=document.getElementById("libraryStats"),p=document.getElementById("btn-scan"),r=document.getElementById("btn-export-playlist"),g=document.getElementById("btn-new-playlist"),x=document.getElementById("queueList"),f=document.getElementById("tagEditor"),M=document.getElementById("tagTitle"),C=document.getElementById("tagArtist"),$=document.getElementById("tagAlbum"),X=document.getElementById("tagYear"),B=document.getElementById("tagCover");let q="",J=localStorage.getItem("melo-currentPlaylist")||((ae=dt[0])==null?void 0:ae.id)||"",F="artists",U=null,b=null,k=null,_=null,W=[];(ne=document.getElementById("libraryTabs"))==null||ne.querySelectorAll(".tab").forEach(o=>{o.addEventListener("click",()=>{document.querySelectorAll("#libraryTabs .tab").forEach(d=>d.classList.remove("active")),o.classList.add("active"),F=o.dataset.libtab,U=b=k=_=null,V()})}),l==null||l.addEventListener("input",()=>{q=l.value.toLowerCase(),V()}),V(),wt(),p==null||p.addEventListener("click",async()=>{if(window.__TAURI__)try{const{open:o}=await N(async()=>{const{open:v}=await import("./index-CS3Qnt9j.js");return{open:v}},__vite__mapDeps([5,1])),d=await o({directory:!0,multiple:!1});if(d){e("Scanning folder in the background…");const{invoke:v}=await N(async()=>{const{invoke:y}=await import("./core-DhEqZVGG.js");return{invoke:y}},[]),m=await v("scan_library",{path:d});m.forEach(y=>y.source="scan"),ut(m,!0),ot(m),V()}}catch{e("Scanning requires the Tauri build")}else{const o=document.createElement("input");o.type="file",o.multiple=!0,o.accept="audio/*",o.onchange=async()=>{var v;const d=Array.from(o.files||[]);for(const m of d){const y=URL.createObjectURL(m),u=Math.random().toString(36).slice(2),L=((v=m.name.split(".").pop())==null?void 0:v.toUpperCase())||"MP3",I={id:u,title:m.name.replace(/\.[^/.]+$/,""),artist:"Unknown",album:"Imported",genre:"Unknown",year:new Date().getFullYear(),duration:180,path:y,codec:L,specs:"Imported · Stereo",replayGain:0},A=new Audio(y);await new Promise(G=>{A.addEventListener("loadedmetadata",()=>{I.duration=Math.floor(A.duration)||180,G(null)},{once:!0}),A.load(),setTimeout(()=>G(null),1500)}),await Ht(m,I),Q.push(I)}e(`${d.length} file(s) added`),V(),wt()},o.click()}}),document.addEventListener("dragover",o=>{o.preventDefault()}),document.addEventListener("drop",async o=>{var v,m;o.preventDefault();const d=Array.from(((v=o.dataTransfer)==null?void 0:v.files)||[]).filter(y=>y.type.startsWith("audio/")||/\.(mp3|flac|wav|ogg|aac|m4a|alac)$/i.test(y.name));if(d.length){for(const y of d){const u=URL.createObjectURL(y),L=Math.random().toString(36).slice(2),I=((m=y.name.split(".").pop())==null?void 0:m.toUpperCase())||"MP3",A={id:L,title:y.name.replace(/\.[^/.]+$/,""),artist:"Imported",album:"Drop",genre:"Unknown",year:new Date().getFullYear(),duration:200,path:u,codec:I,specs:"Drag & Drop"};await Ht(y,A);const G=new Audio(u);await new Promise(lt=>{G.addEventListener("loadedmetadata",()=>{A.duration=Math.floor(G.duration)||200,lt(null)},{once:!0}),G.load(),setTimeout(()=>lt(null),800)}),Q.push(A)}e(`${d.length} File added via drag & drop`),V()}});function j(){return dt.find(o=>o.id===J)||dt[0]}function it(){localStorage.setItem("melo-rev",String(Date.now())),localStorage.setItem("melo-playlists",JSON.stringify(dt))}function K(){zt&&Y("melo:playlists-sync",{src:kt,playlists:dt})}function nt(o){J=o,localStorage.setItem("melo-currentPlaylist",o),Z()}at("melo:playlists-sync",o=>{o&&o.src!==kt&&Array.isArray(o.playlists)&&(dt=o.playlists,Z(),V())});function rt(){localStorage.setItem("melo-rev",String(Date.now()));try{localStorage.setItem("melo-tracks",JSON.stringify(Q))}catch{try{localStorage.setItem("melo-tracks",JSON.stringify(Q.map(({cover:o,...d})=>d)))}catch{}}}function ut(o,d=!1){let v=!1;o.forEach(m=>{Q.some(y=>y.id===m.id)||(Q.push(m),v=!0)}),v&&(rt(),V(),Z()),d&&zt&&Y("melo:tracks-add",{src:kt,list:o})}at("melo:tracks-add",o=>{o&&o.src!==kt&&Array.isArray(o.list)&&ut(o.list)});function ot(o){const d=j();if(!d)return;let v=!1;o.forEach(m=>{d.tracks.includes(m.id)||(d.tracks.push(m.id),v=!0)}),v&&(it(),K(),Z(),V())}async function vt(o){if(!zt)return[];const{invoke:d}=await N(async()=>{const{invoke:m}=await import("./core-DhEqZVGG.js");return{invoke:m}},[]),v=[];for(const m of o)try{const y=await d("scan_library",{path:m});y&&v.push(...y)}catch{}return v}zt&&(N(async()=>{const{getCurrentWebviewWindow:o}=await import("./webviewWindow-mjQkSB26.js");return{getCurrentWebviewWindow:o}},__vite__mapDeps([6,7,1,0,8])).then(({getCurrentWebviewWindow:o})=>{o().onDragDropEvent(async v=>{var m;if(v.payload.type==="drop"){const y=v.payload.paths||[];if(!y.length)return;const u=await vt(y);if(!u.length)return;u.forEach(L=>L.source="import"),ut(u,!0),kt==="main"?(ot(u),Y("melo:play-tracks",{tracks:u,index:0})):kt==="playlist"?(ot(u),e(`Added ${u.length} track(s) to "${(m=j())==null?void 0:m.name}"`)):e(`Added ${u.length} file(s) to library`)}})}).catch(()=>{}),N(async()=>{const{listen:o}=await import("./event-CNdo2oXa.js");return{listen:o}},__vite__mapDeps([0,1])).then(({listen:o})=>{o("tauri://drag-drop",async d=>{var y,u;const v=((y=d==null?void 0:d.payload)==null?void 0:y.paths)||[];if(!v.length)return;const m=await vt(v);m.length&&(m.forEach(L=>L.source="import"),ut(m,!0),kt==="main"?(ot(m),Y("melo:play-tracks",{tracks:m,index:0})):kt==="playlist"?(ot(m),e(`Added ${m.length} track(s) to "${(u=j())==null?void 0:u.name}"`)):e(`Added ${m.length} file(s) to the library`))})}).catch(()=>{}));function Bt(o){return`${Math.floor(o/60)}:${String(Math.floor(o%60)).padStart(2,"0")}`}function Lt(o){return o.type.startsWith("audio/")||/\.(mp3|flac|wav|ogg|aac|m4a|alac|opus)$/i.test(o.name)}async function ht(o){var I;const d=o.path;if(d&&zt){const A=await vt([d]);if(A.length)return A[0].source="import",A[0]}const v=d||URL.createObjectURL(o),m=d||Math.random().toString(36).slice(2),y=((I=o.name.split(".").pop())==null?void 0:I.toUpperCase())||"MP3",u=o.name.replace(/\.[^/.]+$/,""),L={id:m,title:u,artist:"Unknown Artist",album:"Single",genre:"Unknown",year:new Date().getFullYear(),duration:180,path:v,codec:y,specs:"Local File",replayGain:0,source:"import"};try{const A=new Audio(URL.createObjectURL(o));await new Promise(G=>{A.addEventListener("loadedmetadata",()=>{L.duration=Math.floor(A.duration)||180,G(null)},{once:!0}),A.load(),setTimeout(()=>G(null),800)})}catch{}return await Ht(o,L),L}let yt="";function Z(){if(!i)return;try{const y=localStorage.getItem("melo-tracks");if(y){const u=JSON.parse(y);Array.isArray(u)&&u.length>Q.length&&(Q=u)}}catch{}const o=j();if(s&&(s.innerHTML=dt.map(y=>`<option value="${y.id}" ${o&&y.id===o.id?"selected":""}>${y.name}</option>`).join("")),!o){i.innerHTML="",i.style.display="none",n&&(n.style.display="block");return}let d=o.tracks.map(y=>Q.find(u=>u.id===y)).filter(Boolean),v=d;if(yt.trim()){const y=yt.toLowerCase().trim();v=d.filter(u=>u.title.toLowerCase().includes(y)||u.artist.toLowerCase().includes(y)||u.album.toLowerCase().includes(y))}if(n&&(n.style.display=d.length?"none":"block"),i.style.display=d.length?"flex":"none",!v.length&&d.length){i.innerHTML=`<div style="padding:16px;text-align:center;color:var(--text-muted);font-size:11px;">No tracks match "${yt}"</div>`;return}i.innerHTML=v.map((y,u)=>{const L=o.tracks.indexOf(y.id);return`
      <div class="track-row" draggable="true" data-id="${y.id}" data-pl-idx="${L>=0?L:u}">
        <span class="num">${u+1}</span>
        ${y.cover?`<img class="track-cover-mini" src="${y.cover}" onerror="this.style.display='none'"/>`:'<div class="track-cover-mini cover-default">♪</div>'}
        <div style="flex:1;min-width:0;">
          <div class="t-title">${y.title}</div>
          <div class="t-artist">${y.artist} • ${y.album}</div>
        </div>
        <span class="t-dur">${Bt(y.duration)}</span>
        <button class="btn small ghost" data-action="pl-remove" data-idx="${L>=0?L:u}" title="Remove from playlist">×</button>
      </div>
    `}).join("");let m=null;i.querySelectorAll(".track-row").forEach(y=>{const u=y;u.addEventListener("dragstart",L=>{m=parseInt(u.dataset.plIdx),L.dataTransfer.setData("application/x-melo-ids",u.dataset.id),L.dataTransfer.setData("application/x-melo-pl-idx",String(m)),L.dataTransfer.effectAllowed="move",u.style.opacity="0.4"}),u.addEventListener("dragend",()=>{u.style.opacity="1",m=null,i==null||i.querySelectorAll(".track-row").forEach(L=>L.classList.remove("drag-over-target"))}),u.addEventListener("dragover",L=>{L.preventDefault(),L.stopPropagation(),u.classList.add("drag-over-target")}),u.addEventListener("dragleave",()=>{u.classList.remove("drag-over-target")}),u.addEventListener("drop",L=>{var G;L.preventDefault(),L.stopPropagation(),u.classList.remove("drag-over-target");const I=parseInt(u.dataset.plIdx),A=(G=L.dataTransfer)==null?void 0:G.getData("application/x-melo-pl-idx");if(A!==void 0&&A!==""&&!isNaN(parseInt(A))){const lt=parseInt(A);if(lt!==I&&lt>=0&&I>=0&&lt<o.tracks.length&&I<o.tracks.length){const Nt=o.tracks.splice(lt,1)[0];o.tracks.splice(I,0,Nt),it(),K(),Z(),V(),e("Track reordered in playlist");return}}}),u.addEventListener("click",L=>{const I=L.target;if(I.closest("[data-action='pl-remove']")){const lt=parseInt(I.closest("[data-action='pl-remove']").dataset.idx);o.tracks.splice(lt,1),it(),K(),Z(),V();return}const A=u.dataset.id,G=v.findIndex(lt=>lt.id===A);Y("melo:play-tracks",{tracks:v,index:G>=0?G:0})})})}const bt=document.getElementById("playlistSearchInput");bt&&bt.addEventListener("input",()=>{yt=bt.value,Z()});const w=document.getElementById("playlistSortSelect");if(w&&w.addEventListener("change",()=>{const o=j();if(!o||!o.tracks.length)return;const d=w.value,v=o.tracks.map(m=>Q.find(y=>y.id===m)).filter(Boolean);d==="title-asc"?v.sort((m,y)=>m.title.localeCompare(y.title)):d==="artist-asc"?v.sort((m,y)=>m.artist.localeCompare(y.artist)):d==="album-asc"?v.sort((m,y)=>m.album.localeCompare(y.album)):d==="dur-asc"?v.sort((m,y)=>m.duration-y.duration):d==="dur-desc"&&v.sort((m,y)=>y.duration-m.duration),o.tracks=v.map(m=>m.id),it(),K(),Z(),e(`Playlist sorted by ${w.options[w.selectedIndex].text}`)}),s==null||s.addEventListener("change",()=>nt(s.value)),r==null||r.addEventListener("click",()=>{const o=j();if(!o)return e("No playlist available");const d=o.tracks.map(L=>Q.find(I=>I.id===L)).filter(Boolean);if(!d.length)return e("Current list is empty");let v=`#EXTM3U
`;d.forEach(L=>{v+=`#EXTINF:${Math.floor(L.duration)},${L.artist} - ${L.title}
${L.path}
`});const m=new Blob([v],{type:"audio/x-mpegurl"}),y=URL.createObjectURL(m),u=document.createElement("a");u.href=y,u.download=`${o.name}.m3u`,u.click(),URL.revokeObjectURL(y),e(`M3U exported for "${o.name}"`)}),g==null||g.addEventListener("click",()=>{const o=prompt("New playlist name:");if(!o)return;const d=Math.random().toString(36).slice(2,8);dt.push({id:d,name:o,tracks:[],createdAt:Date.now()}),nt(d),it(),K(),V(),e(`Playlist "${o}" created`)}),i){const o=i.parentElement;["dragover","dragenter"].forEach(d=>o.addEventListener(d,v=>{v.preventDefault(),v.stopPropagation(),i.classList.add("drag-over")})),o.addEventListener("dragleave",d=>{o.contains(d.relatedTarget)||i.classList.remove("drag-over")}),o.addEventListener("drop",async d=>{var u,L;d.preventDefault(),d.stopPropagation(),i.classList.remove("drag-over");const v=j();if(!v)return e("Create a playlist first (+ New)");const m=(((u=d.dataTransfer)==null?void 0:u.getData("application/x-melo-ids"))||"").split(",").filter(Boolean);let y=0;if(m.length)m.forEach(I=>{v.tracks.includes(I)||(v.tracks.push(I),y++)});else{const I=Array.from(((L=d.dataTransfer)==null?void 0:L.files)||[]).filter(Lt);for(const A of I){const G=await ht(A);Q.push(G),v.tracks.includes(G.id)||(v.tracks.push(G.id),y++)}}y&&e(`${y} track(s) added to "${v.name}"`),rt(),it(),K(),V(),Z()})}const E=document.getElementById("playerCard");E&&(["dragover","dragenter"].forEach(o=>E.addEventListener(o,d=>{d.preventDefault(),d.stopPropagation(),E.classList.add("drag-over")})),E.addEventListener("dragleave",o=>{E.contains(o.relatedTarget)||E.classList.remove("drag-over")}),E.addEventListener("drop",async o=>{var y,u;o.preventDefault(),o.stopPropagation(),E.classList.remove("drag-over");const d=window.LumiPlayer,v=(((y=o.dataTransfer)==null?void 0:y.getData("application/x-melo-ids"))||"").split(",").filter(Boolean);let m=[];if(v.length)m=v.map(L=>Q.find(I=>I.id===L)).filter(Boolean),d&&m.length&&e(`Playback ${m.length} track(s)`);else{const L=Array.from(((u=o.dataTransfer)==null?void 0:u.files)||[]).filter(Lt),I=j();let A=!1;for(const G of L){const lt=await ht(G);Q.push(lt),m.push(lt),I&&!I.tracks.includes(lt.id)&&(I.tracks.push(lt.id),A=!0)}L.length&&(rt(),it(),K(),V(),Z()),d&&m.length&&e(A&&I?`Playback ${m.length} track(s) + added to "${I.name}"`:`Playback ${m.length} track(s)`)}m.length&&Y("melo:play-tracks",{tracks:m,index:0})}));let S=null;function c(o){if(S=o,!S)return e("No track to edit");f.style.display="flex",M.value=S.title,C.value=S.artist,$.value=S.album,X.value=String(S.year)}function P(o){const d=Q.filter(o).map(v=>v.id);d.length&&(Q=Q.filter(v=>!o(v)),dt.forEach(v=>{v.tracks=v.tracks.filter(m=>!d.includes(m))}),rt(),it(),K(),zt&&Y("melo:tracks-remove",{src:kt,ids:d}),V(),Z())}at("melo:tracks-remove",o=>{if(o&&o.src!==kt&&Array.isArray(o.ids)){const d=o.ids;Q=Q.filter(v=>!d.includes(v.id)),dt.forEach(v=>{v.tracks=v.tracks.filter(m=>!d.includes(m))}),V(),Z()}});const T=document.createElement("div");T.className="ctx-menu",T.style.display="none",document.body.appendChild(T);let R=null;function O(){T.style.display="none"}document.addEventListener("click",O),document.addEventListener("keydown",o=>{o.key==="Escape"&&O()}),T.addEventListener("click",o=>{const d=o.target.closest("[data-act]");if(!d||!R)return;o.stopPropagation();const v=d.dataset.act;v==="edit"&&c(R.track),v==="remove"&&(R.type==="track"?P(m=>m.id===R.track.id):R.type==="artist"?P(m=>m.artist===R.name):R.type==="album"?P(m=>m.artist===R.artist&&m.album===R.album):R.type==="genre"&&P(m=>m.genre===R.name)),O()});const D=document.createElement("div");D.className="ctx-menu",D.style.display="none",document.body.appendChild(D);let et=-1;document.addEventListener("click",()=>{D.style.display="none"}),D.addEventListener("click",o=>{if(!o.target.closest("[data-act='plremove']"))return;o.stopPropagation();const d=j();d&&et>=0&&et<d.tracks.length&&(d.tracks.splice(et,1),it(),K(),Z(),V()),D.style.display="none"}),document.addEventListener("contextmenu",o=>{O(),D.style.display="none";const d=o.target,v=d.closest("#winPlaylistTracks .track-row");if(v){o.preventDefault(),et=parseInt(v.dataset.plIdx||"-1"),D.innerHTML='<button class="ctx-item danger" data-act="plremove">Remove from Playlist</button>',D.style.display="block";const L=D.getBoundingClientRect();D.style.left=Math.max(4,Math.min(o.clientX,window.innerWidth-L.width-6))+"px",D.style.top=Math.max(4,Math.min(o.clientY,window.innerHeight-L.height-6))+"px";return}if(!(kt==="library"?!0:!!d.closest("#win-library"))){o.preventDefault();return}o.preventDefault();const y=d.closest(".track-row, [data-artist], [data-albumkey], [data-genre]");if(!y){O();return}if(y.classList.contains("track-row")){const L=W[parseInt(y.dataset.viewIdx)];if(!L){O();return}R={type:"track",track:L},T.innerHTML='<button class="ctx-item" data-act="edit">Edit tags</button><button class="ctx-item danger" data-act="remove">Remove track from library</button>'}else if(y.dataset.artist)R={type:"artist",name:y.dataset.artist},T.innerHTML='<button class="ctx-item danger" data-act="remove">Remove artist from library</button>';else if(y.dataset.albumkey){const[L,I]=(y.dataset.albumkey||"").split("\0");R={type:"album",artist:L,album:I},T.innerHTML='<button class="ctx-item danger" data-act="remove">Remove album from library</button>'}else R={type:"genre",name:y.dataset.genre},T.innerHTML='<button class="ctx-item danger" data-act="remove">Remove genre from library</button>';T.style.display="block";const u=T.getBoundingClientRect();T.style.left=Math.max(4,Math.min(o.clientX,window.innerWidth-u.width-6))+"px",T.style.top=Math.max(4,Math.min(o.clientY,window.innerHeight-u.height-6))+"px"}),(oe=document.getElementById("btn-tag-cancel"))==null||oe.addEventListener("click",()=>f.style.display="none"),(se=document.getElementById("btn-tag-save"))==null||se.addEventListener("click",async()=>{if(S){if(S.title=M.value,S.artist=C.value,S.album=$.value,S.year=parseInt(X.value)||S.year,B.files&&B.files[0]){const o=B.files[0],d=URL.createObjectURL(o),v=new FileReader;v.onload=()=>{S.cover=v.result,V(),wt(),Y("melo:tag-updated",S)},v.readAsDataURL(o),S.cover=d}if(window.__TAURI__)try{const{invoke:o}=await N(async()=>{const{invoke:d}=await import("./core-DhEqZVGG.js");return{invoke:d}},[]);await o("write_tags",{path:S.path,tags:{title:S.title,artist:S.artist,album:S.album}})}catch{}f.style.display="none",rt(),V(),wt(),Y("melo:tag-updated",S),e("Metadata saved")}});function z(o){return String(o!=null?o:"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function st(){return Q.filter(o=>o.source==="scan")}function mt(o){return W=o,o.length?o.map((d,v)=>{const m=`${Math.floor(d.duration/60)}:${String(Math.floor(d.duration%60)).padStart(2,"0")}`;return`
      <div class="track-row" draggable="true" data-view-idx="${v}" data-id="${z(d.id)}">
        <span class="num">${v+1}</span>
        <img class="track-cover-mini" src="${d.cover||""}" style="${d.cover?"":"display:none"}" onerror="this.style.display='none'"/>
        <div style="flex:1;min-width:0;">
          <div class="t-title">${z(d.title)}</div>
          <div class="t-artist">${z(d.artist)} • ${z(d.album)}${d.year?" • "+d.year:""}</div>
        </div>
        <span style="font-size:10px;padding:3px 6px;border-radius:6px;background:var(--badge-bg);color:var(--badge-text);border:1px solid var(--card-border);">${z(d.codec)}</span>
        <span class="t-dur">${m}</span>
        <button class="btn small ghost" data-action="add-queue" data-view-idx="${v}">+</button>
      </div>`}).join(""):'<div style="padding:30px;text-align:center;color:var(--text-muted);">Nothing here yet.<br/><span style="font-size:12px;">Use "Scan Folder" to build your library</span></div>'}function V(){if(!a){Z();return}const o=st(),d=new Set(o.map(u=>u.artist)).size,v=new Set(o.map(u=>u.artist+"\0"+u.album)).size;h&&(h.textContent=`${o.length} tracks • ${d} artists • ${v} albums`);const m=q.trim().toLowerCase();let y="";if(F==="artists")if(U){const u=o.filter(A=>A.artist===U),L=[...new Set(u.map(A=>A.album))].sort((A,G)=>A.localeCompare(G)),I=b?u.filter(A=>A.album===b):u;y=`<div class="lib-crumb"><button class="btn small" data-back="artists">‹ Artists</button><b>${z(U)}</b></div>
          <div class="chip-row"><button class="chip ${b?"":"active"}" data-album="">All albums</button>`+L.map(A=>`<button class="chip ${b===A?"active":""}" data-album="${z(A)}">${z(A)}</button>`).join("")+"</div>"+mt(m?I.filter(A=>(A.title+A.album).toLowerCase().includes(m)):I)}else{W=[];const u=[...new Set(o.map(I=>I.artist))].sort((I,A)=>I.localeCompare(A));y=(m?u.filter(I=>I.toLowerCase().includes(m)):u).map(I=>{const A=o.filter(G=>G.artist===I).length;return`<div class="lib-item" data-artist="${z(I)}"><div class="lib-avatar">${z((I[0]||"?").toUpperCase())}</div><div style="flex:1;min-width:0;"><div class="t-title">${z(I)}</div><div class="t-artist">${A} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No artists found.</div>'}else if(F==="albums")if(k){const[u,L]=k.split("\0"),I=o.filter(A=>A.artist===u&&A.album===L);y=`<div class="lib-crumb"><button class="btn small" data-back="albums">‹ Albums</button><b>${z(L)}</b><span class="t-artist" style="margin-left:8px;">${z(u)}</span></div>`+mt(m?I.filter(A=>A.title.toLowerCase().includes(m)):I)}else{W=[];const u=[...new Set(o.map(I=>I.artist+"\0"+I.album))].sort((I,A)=>I.localeCompare(A));y=(m?u.filter(I=>I.toLowerCase().includes(m)):u).map(I=>{const[A,G]=I.split("\0"),lt=o.filter(Nt=>Nt.artist===A&&Nt.album===G).length;return`<div class="lib-item" data-albumkey="${z(I)}"><div class="lib-avatar">💿</div><div style="flex:1;min-width:0;"><div class="t-title">${z(G)}</div><div class="t-artist">${z(A)} • ${lt} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No albums found.</div>'}else if(_){const u=o.filter(L=>L.genre===_);y=`<div class="lib-crumb"><button class="btn small" data-back="genres">‹ Genres</button><b>${z(_)}</b></div>`+mt(m?u.filter(L=>(L.title+L.artist).toLowerCase().includes(m)):u)}else{W=[];const u=[...new Set(o.map(I=>I.genre))].sort((I,A)=>I.localeCompare(A));y=(m?u.filter(I=>I.toLowerCase().includes(m)):u).map(I=>{const A=o.filter(G=>G.genre===I).length;return`<div class="lib-item" data-genre="${z(I)}"><div class="lib-avatar">🎼</div><div style="flex:1;min-width:0;"><div class="t-title">${z(I)}</div><div class="t-artist">${A} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No genres found.</div>'}a.innerHTML=y,a.querySelectorAll("[data-artist]").forEach(u=>u.addEventListener("click",()=>{U=u.dataset.artist,b=null,V()})),a.querySelectorAll("[data-albumkey]").forEach(u=>u.addEventListener("click",()=>{k=u.dataset.albumkey,V()})),a.querySelectorAll("[data-genre]").forEach(u=>u.addEventListener("click",()=>{_=u.dataset.genre,V()})),a.querySelectorAll("[data-back]").forEach(u=>u.addEventListener("click",()=>{const L=u.dataset.back;L==="artists"?(U=null,b=null):L==="albums"?k=null:_=null,V()})),a.querySelectorAll(".chip[data-album]").forEach(u=>u.addEventListener("click",()=>{b=u.dataset.album||null,V()})),a.querySelectorAll(".track-row").forEach(u=>{u.addEventListener("dragstart",L=>{L.dataTransfer.setData("application/x-melo-ids",u.dataset.id),L.dataTransfer.effectAllowed="copy"}),u.addEventListener("click",L=>{const I=L.target,A=parseInt(u.dataset.viewIdx);if(I.closest("[data-action='add-queue']")){Mt(W[A]);return}Y("melo:play-tracks",{tracks:W,index:A})})}),Z()}function Mt(o){Y("melo:add-queue",o),e(`Queued: ${o.title}`)}function wt(){if(!x)return;const o=window.LumiPlayer,d=(o==null?void 0:o.queue)||Q.slice(0,4);if(!d.length){x.innerHTML='<div style="text-align:center;color:var(--text-muted);font-size:12px;padding:12px;">Queue is empty</div>';return}x.innerHTML=d.map((v,m)=>{var y;return`
      <div class="track-row" data-id="${v.id}" data-queue-idx="${m}" style="padding:6px 8px;border-radius:8px;border:1px solid ${m===((y=o==null?void 0:o.currentIndex)!=null?y:0)?"var(--accent)":"transparent"};">
        <img class="track-cover-mini" src="${v.cover||""}" style="width:24px;height:24px;${v.cover?"":"display:none"}" />
        <div style="flex:1;min-width:0;">
          <div class="t-title" style="font-size:12px;">${v.title}</div>
          <div class="t-artist" style="font-size:11px;">${v.artist}</div>
        </div>
        <button class="btn small ghost" data-remove="${m}" style="padding:2px 6px;">×</button>
      </div>
    `}).join(""),x.querySelectorAll("[data-remove]").forEach(v=>{v.addEventListener("click",()=>{const m=parseInt(v.dataset.remove);d.splice(m,1),wt()})}),x.querySelectorAll(".track-row").forEach(v=>{v.addEventListener("click",m=>{if(m.target.closest("[data-remove]"))return;const y=parseInt(v.dataset.queueIdx),u=window.LumiPlayer;u&&u.loadTrack(y)})})}at("melo:track-changed",o=>{wt();const d=document.getElementById("lyricsBox");d&&o&&(d.textContent=o.lyrics||"No lyrics found for this track. You can add it via the tag editor."),document.querySelectorAll(".track-row").forEach(v=>{v.classList.toggle("active",v.dataset.id===(o==null?void 0:o.id))})}),setInterval(()=>wt(),2e3);let ie=localStorage.getItem("melo-rev")||"";setInterval(()=>{const o=localStorage.getItem("melo-rev")||"";if(o!==ie){ie=o;try{const d=JSON.parse(localStorage.getItem("melo-tracks")||"null");Array.isArray(d)&&(Q=d)}catch{}try{const d=JSON.parse(localStorage.getItem("melo-playlists")||"null");Array.isArray(d)&&d.length&&(dt=d)}catch{}V(),Z()}},1200),window.LumiLibrary={get tracks(){return Q},get playlists(){return dt},render:V,addTracks:ut,addToCurrentPlaylist:ot,importPaths:vt,currentPlaylistName:()=>{var o;return((o=j())==null?void 0:o.name)||"Playlist"}}}const Ut={flat:[0,0,0,0,0,0,0,0,0,0],pop:[-1,2,4,4,2,-1,-1,2,3,3],rock:[4,3,2,-1,-2,-2,1,3,4,4],bass:[6,5,4,2,1,0,-1,-1,-2,-3],treble:[-3,-2,-1,0,1,2,3,5,6,6],dance:[5,4,2,0,-1,-1,2,4,5,3],jazz:[2,1,2,3,2,0,1,2,3,2],classical:[3,2,1,0,0,0,-1,2,3,4],vocal:[-2,-1,0,2,4,4,3,1,0,-1],acoustic:[3,2,1,1,2,2,3,3,2,1],hiphop:[5,4,1,2,-1,-1,1,-1,2,3],metal:[4,2,-1,-2,-1,1,3,4,5,4]};function Xt(t){for(const[e,a]of Object.entries(Ut))if(a.every((i,n)=>i===t[n]))return e;return"custom"}function pe(t,e,a={}){const i=!!a.remote,n=document.getElementById("eqEnable"),s=document.getElementById("eqPreset"),l=document.getElementById("btnEqReset"),h=document.getElementById("eqBands"),p=document.getElementById("eqCanvas"),r=p?p.getContext("2d"):null;let g=null,x=[],f=[],M=new Array($t.length).fill(0);try{const b=JSON.parse(localStorage.getItem("melo-eq-gains")||"null");Array.isArray(b)&&b.length===$t.length&&(M=b.map(k=>typeof k=="number"?Math.max(-12,Math.min(12,k)):0))}catch{}let C=localStorage.getItem("melo-eq-preset")||Xt(M),$=localStorage.getItem("melo-eq-enabled")!=="0";function X(){if(!g)try{const b=Qt(t);g=b.ctx,x=b.filters,x.forEach((k,_)=>{k.gain.value=$?M[_]:0})}catch{}}function B(b,k){X(),x[b]&&$&&(x[b].gain.value=k)}function q(b){X(),M=[...b],$&&b.forEach((k,_)=>{x[_]&&(x[_].gain.value=k)}),U()}function J(b){X(),$=b,b?M.forEach((k,_)=>{x[_]&&(x[_].gain.value=k)}):x.forEach(k=>{k.gain.value=0}),U()}i||t&&t.addEventListener("play",()=>{X(),(g==null?void 0:g.state)==="suspended"&&g.resume().catch(()=>{})}),at("melo:eq",b=>{b&&(b.type==="gain"?(i||B(b.idx,b.val),M[b.idx]=b.val,f[b.idx]&&(f[b.idx].value=String(b.val),F(f[b.idx])),s&&(s.value=Xt(M)),U()):b.type==="gains"?(i||q(b.values),M=[...b.values],f.length&&f.forEach((k,_)=>{k.value=String(M[_]),F(k)}),s&&b.preset&&(s.value=b.preset),U()):b.type==="enable"&&($=!!b.on,i||J($),n&&(n.checked=$),U()))});function F(b){var W;const k=parseInt(b.value),_=(W=b.parentElement)==null?void 0:W.querySelector(".val");_&&(_.textContent=(k>0?"+":"")+k+"dB")}function U(){if(!p||!r)return;const b=window.devicePixelRatio||1,k=p.clientWidth*b,_=p.clientHeight*b;if(k<=0||_<=0)return;p.width=k,p.height=_,r.clearRect(0,0,k,_);const W=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#2a7bd6",j=M;if(!$){r.strokeStyle="rgba(100,120,150,0.25)",r.lineWidth=2*b,r.beginPath(),r.moveTo(0,_/2),r.lineTo(k,_/2),r.stroke();return}r.strokeStyle=W,r.lineWidth=2.5*b,r.lineJoin="round",r.beginPath(),j.forEach((it,K)=>{const nt=K/(j.length-1)*k,rt=_/2-it/12*(_/2-10*b);if(K===0)r.moveTo(nt,rt);else{const ut=(K-1)/(j.length-1)*k,ot=_/2-j[K-1]/12*(_/2-10*b);r.quadraticCurveTo((ut+nt)/2,ot,nt,rt)}}),r.stroke(),j.forEach((it,K)=>{const nt=K/(j.length-1)*k,rt=_/2-it/12*(_/2-10*b);r.fillStyle=W,r.beginPath(),r.arc(nt,rt,4*b,0,Math.PI*2),r.fill(),r.fillStyle="white",r.beginPath(),r.arc(nt,rt,2*b,0,Math.PI*2),r.fill()}),r.strokeStyle="rgba(100,120,150,0.3)",r.lineWidth=1*b,r.setLineDash([4*b,4*b]),r.beginPath(),r.moveTo(0,_/2),r.lineTo(k,_/2),r.stroke(),r.setLineDash([])}h&&(h.innerHTML="",$t.forEach((b,k)=>{const _=M[k]||0,W=document.createElement("div");W.className="eq-band",W.innerHTML=`
        <input type="range" min="-12" max="12" value="${_}" step="1" data-idx="${k}" orient="vertical" />
        <label>${b>=1e3?b/1e3+"k":b}</label>
        <span style="font-size:10px;color:var(--text-muted);min-height:12px;" class="val">${(_>0?"+":"")+_+"dB"}</span>
      `,h.appendChild(W)}),f=Array.from(h.querySelectorAll("input")),f.forEach(b=>{b.addEventListener("input",()=>{const k=parseInt(b.dataset.idx),_=parseInt(b.value);F(b),M[k]=_,U();const W=Xt(M);s&&(s.value=W),localStorage.setItem("melo-eq-gains",JSON.stringify(M)),localStorage.setItem("melo-eq-preset",W),i||B(k,_),Y("melo:eq",{type:"gain",idx:k,val:_,values:M})})})),s&&(s.value=C,s.addEventListener("change",()=>{const b=Ut[s.value]||Ut.flat;f.length&&f.forEach((k,_)=>{k.value=String(b[_]),F(k)}),M=[...b],U(),localStorage.setItem("melo-eq-gains",JSON.stringify(M)),localStorage.setItem("melo-eq-preset",s.value),i||q(b),Y("melo:eq",{type:"gains",values:b,preset:s.value}),e(`Preset: ${s.options[s.selectedIndex].text}`)})),l&&l.addEventListener("click",()=>{const b=Ut.flat;f.length&&f.forEach((k,_)=>{k.value="0",F(k)}),M=[...b],s&&(s.value="flat"),localStorage.setItem("melo-eq-gains",JSON.stringify(M)),localStorage.setItem("melo-eq-preset","flat"),i||q(b),Y("melo:eq",{type:"gains",values:b,preset:"flat"}),U(),e("Equalizer reset to Flat (0dB)")}),n&&(n.checked=$,n.addEventListener("change",()=>{$=n.checked,localStorage.setItem("melo-eq-enabled",$?"1":"0"),i||J($),Y("melo:eq",{type:"enable",on:$}),U(),e($?"Equalizer On":"Equalizer off — Flat")})),p&&new ResizeObserver(()=>U()).observe(p),U(),window.LumiEqualizer={presets:Ut,frequencies:$t,displayGains:M,reset:()=>l==null?void 0:l.click()}}const Rt=[{id:"bars",label:"Classic Bars"},{id:"thin",label:"Thin Bars"},{id:"line",label:"Spectrum Line"},{id:"mirror",label:"Mirror Bars"},{id:"wave",label:"Oscilloscope"}];function Ge(t){let e=document.getElementById("vizBars");if(!e)return;let a=$(e),i=a.getContext("2d"),n=null,s=null,l=null,h=null,p=null,r=!1,g=localStorage.getItem("melo-viz-mode")||"bars";Rt.some(w=>w.id===g)||(g="bars");let x=0,f=[],M=.45,C=null;function $(w){let E=w.querySelector("canvas");return E||(w.innerHTML="",E=document.createElement("canvas"),w.appendChild(E)),E}function X(){if(!(s&&l))try{const w=Qt(t);n=w.ctx,s=w.analyser,l=new Uint8Array(s.frequencyBinCount),h=new Uint8Array(s.fftSize)}catch{r=!0}}function B(w){const E=l.length,S=((n==null?void 0:n.sampleRate)||44100)/2,c=45,P=Math.min(15e3,S*.95),T=Math.log(c),R=Math.log(P),O=[];for(let D=0;D<w;D++){const et=Math.exp(T+(R-T)*D/w),z=Math.exp(T+(R-T)*(D+1)/w);let st=Math.floor(et/S*E),mt=Math.max(st+1,Math.ceil(z/S*E));st<0&&(st=0),mt>E&&(mt=E);let V=0;for(let Mt=st;Mt<mt;Mt++)V+=l[Mt];O.push(V/(mt-st)/255)}return O}function q(w){const E=performance.now()/1e3,S=Math.pow(Math.abs(Math.sin(E*2.2)),2.5),c=[];for(let P=0;P<w;P++){let T=.42+.26*Math.sin(E*1.35+P*.62)+.2*Math.sin(E*2.9+P*1.31)+Math.random()*.07;T*=.55+.5*S,c.push(Math.max(.04,Math.min(1,T)))}return c}function J(w){const E=performance.now()/1e3,S=.5+.5*Math.pow(Math.abs(Math.sin(E*1.9)),2);for(let c=0;c<w.length;c++){const P=c/w.length;w[c]=128+66*S*(Math.sin(P*Math.PI*6+E*7)*.6+Math.sin(P*Math.PI*13-E*11)*.4)}}function F(w){let E;if(r||!s||!l)E=q(w);else if(s.getByteFrequencyData(l),E=B(w),!E.some(P=>P>.01)&&!t.paused)E=q(w);else for(let P=0;P<w;P++)E[P]*=1+1.7*(P/Math.max(1,w-1));let S=0;for(const c of E)c>S&&(S=c);S>M?M=S:M=Math.max(.35,M*.985),f.length!==w&&(f=new Array(w).fill(0));for(let c=0;c<w;c++){const P=Math.min(1,E[c]/M),T=P>f[c]?.55:.16;f[c]+=(P-f[c])*T}return f}function U(w,E){return getComputedStyle(document.documentElement).getPropertyValue(w).trim()||E}function b(){return a.width/Math.max(1,a.clientWidth)||1}function k(w,E,S,c,P){if(P=Math.min(P,S/2,c/2),i.roundRect){i.roundRect(w,E,S,c,P);return}i.rect(w,E,S,c)}function _(){const w=window.devicePixelRatio||1,E=a.clientWidth||(e==null?void 0:e.clientWidth)||200,S=a.clientHeight||(e==null?void 0:e.clientHeight)||56;E>0&&S>0&&(a.width=Math.round(E*w),a.height=Math.round(S*w))}new ResizeObserver(_).observe(a),_();function W(w,E,S,c){const P=b(),T=U("--visualizer","#38bdf8"),R=U("--accent","#0284c7"),O=w.length,D=E/O,et=Math.max(1.2*P,D*(1-c));for(let z=0;z<O;z++){const st=w[z],mt=Math.max(2*P,st*(S-4*P)),V=z*D+(D-et)/2,Mt=S-mt-1*P,wt=i.createLinearGradient(0,Mt,0,S);wt.addColorStop(0,R),wt.addColorStop(1,T),i.fillStyle=wt,i.beginPath(),k(V,Mt,et,mt,Math.min(et/2,3.5*P)),i.fill()}}function j(w,E,S){const c=b(),P=U("--visualizer","#38bdf8"),T=U("--accent","#0284c7"),R=w.length,O=E/R,D=S/2,et=Math.max(1.5*c,O*.62);for(let z=0;z<R;z++){const st=Math.max(1.5*c,w[z]*(S/2-3*c)),mt=z*O+(O-et)/2,V=i.createLinearGradient(0,D-st,0,D+st);V.addColorStop(0,T),V.addColorStop(.5,P),V.addColorStop(1,T),i.fillStyle=V,i.beginPath(),k(mt,D-st,et,st*2,Math.min(et/2,3*c)),i.fill()}}function it(w,E,S){const c=b(),P=U("--visualizer","#38bdf8"),T=U("--accent","#0284c7"),R=w.length,O=[],D=[];for(let z=0;z<R;z++)O.push((z+.5)/R*E),D.push(S-2*c-w[z]*(S-8*c));i.beginPath(),i.moveTo(O[0],S),i.lineTo(O[0],D[0]);for(let z=1;z<R;z++){const st=(O[z-1]+O[z])/2;i.quadraticCurveTo(O[z-1],D[z-1],st,(D[z-1]+D[z])/2)}i.lineTo(O[R-1],D[R-1]),i.lineTo(O[R-1],S),i.closePath();const et=i.createLinearGradient(0,0,0,S);et.addColorStop(0,P),et.addColorStop(1,"transparent"),i.globalAlpha=.18,i.fillStyle=et,i.fill(),i.globalAlpha=1,i.beginPath(),i.moveTo(O[0],D[0]);for(let z=1;z<R;z++){const st=(O[z-1]+O[z])/2;i.quadraticCurveTo(O[z-1],D[z-1],st,(D[z-1]+D[z])/2)}i.lineTo(O[R-1],D[R-1]),i.strokeStyle=T,i.lineWidth=2*c,i.lineJoin="round",i.stroke()}function K(){const w=a.width,E=a.height,S=b(),c=U("--accent","#0284c7");let P;r||!s||!h?(p||(p=new Uint8Array(1024)),J(p),P=p):(s.getByteTimeDomainData(h),P=h);const T=()=>{i.beginPath();for(let R=0;R<=w;R+=2){const O=Math.min(P.length-1,Math.floor(R/w*P.length)),D=P[O]/255*E;R===0?i.moveTo(R,D):i.lineTo(R,D)}};T(),i.strokeStyle=c,i.globalAlpha=.16,i.lineWidth=6*S,i.lineJoin="round",i.stroke(),T(),i.globalAlpha=1,i.lineWidth=1.8*S,i.stroke()}function nt(){const w=a.width,E=a.height;if(!w||!E)return;if(i.clearRect(0,0,w,E),g==="wave"){K();return}const c=F(g==="bars"?16:g==="thin"?56:g==="line"?64:24);g==="bars"?W(c,w,E,.34):g==="thin"?W(c,w,E,.32):g==="line"?it(c,w,E):g==="mirror"&&j(c,w,E)}function rt(){x=requestAnimationFrame(rt),nt()}function ut(){x||rt()}function ot(w,E=!1){var S;if(g=w,f=[],localStorage.setItem("melo-viz-mode",w),!E){const c=window.__TOAST__,P=(S=Rt.find(T=>T.id===w))==null?void 0:S.label;c&&P&&c(`Visualizer: ${P}`)}}function vt(){return C||(C=document.createElement("div"),C.className="viz-menu",C.style.display="none",document.body.appendChild(C),C)}function Bt(){const w=vt();w.innerHTML='<div class="viz-menu-label">Visualizer type</div>'+Rt.map(E=>`<button class="viz-menu-item ${E.id===g?"active":""}" data-mode="${E.id}">${E.id===g?"✓":""}<span>${E.label}</span></button>`).join(""),w.querySelectorAll("[data-mode]").forEach(E=>{E.addEventListener("click",S=>{S.stopPropagation(),ot(E.dataset.mode),ht()})})}function Lt(w,E){Bt();const S=C;S.style.display="block";const c=S.getBoundingClientRect();S.style.left=Math.max(8,Math.min(w,window.innerWidth-c.width-8))+"px",S.style.top=Math.max(8,Math.min(E,window.innerHeight-c.height-8))+"px"}function ht(){C&&(C.style.display="none")}function yt(){e&&(e.title="Click: next mode • Right-click: choose mode",e.addEventListener("click",()=>{ht();const w=Rt.findIndex(E=>E.id===g);ot(Rt[(w+1)%Rt.length].id)}),e.addEventListener("contextmenu",w=>{w.preventDefault(),w.stopPropagation(),Lt(w.clientX,w.clientY)}))}document.addEventListener("click",w=>{C&&C.style.display!=="none"&&!C.contains(w.target)&&ht()}),document.addEventListener("keydown",w=>{w.key==="Escape"&&ht()});function Z(){X(),ut(),(n==null?void 0:n.state)==="suspended"&&n.resume().catch(()=>{})}t.addEventListener("play",Z),Z(),yt(),document.addEventListener("visibilitychange",()=>{document.hidden?(cancelAnimationFrame(x),x=0):ut()});function bt(){cancelAnimationFrame(x),x=0,e=document.getElementById("vizBars"),e&&(a=$(e),i=a.getContext("2d"),new ResizeObserver(_).observe(a),_(),yt(),ut())}window.__LUMI_REBIND_VISUALIZER__=bt}function ue(t){if(!t||!t.trim())return{isSynced:!1,lines:[],raw:""};const e=[],a=t.split(/\r?\n/),i=/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;let n=!1;for(const s of a){const l=s.trim();if(!l||/^\[[a-z]{2,8}:/i.test(l))continue;const h=[...l.matchAll(i)];if(h.length>0){n=!0;const p=l.replace(i,"").trim();for(const r of h){const g=parseInt(r[1],10),x=parseInt(r[2],10),f=r[3]||"0",M=f.length===2?parseInt(f,10)*10:f.length===1?parseInt(f,10)*100:parseInt(f.slice(0,3),10),C=g*60+x+M/1e3;e.push({time:C,text:p})}}else e.push({time:-1,text:l})}return e.sort((s,l)=>s.time-l.time),{isSynced:n,lines:e,raw:t}}function me(t,e){const a=document.getElementById("lyricsContainer"),i=document.getElementById("lyricsStatus"),n=document.getElementById("lyricsTrackTitle");let s={isSynced:!1,lines:[]},l=-1;async function h(f){if(f.lyrics&&f.lyrics.trim().length>0)return f.lyrics;if(window.__TAURI__)try{const{invoke:M}=await N(async()=>{const{invoke:$}=await import("./core-DhEqZVGG.js");return{invoke:$}},[]),C=await M("get_track_lyrics",{path:f.path});if(C)return C}catch{}return null}async function p(f){if(!f){s={isSynced:!1,lines:[],raw:""},r();return}f.id,n&&(n.textContent=`${f.title} — ${f.artist}`);const M=await h(f);s=ue(M||""),r()}function r(){if(a){if(a.innerHTML="",l=-1,!s.lines.length){i&&(i.style.display="block",i.innerHTML='No synced lyrics found (.lrc)<br/><span style="font-size:10.5px; opacity:0.7;">Place a matching .lrc file in the song folder or add lyrics in the tag editor.</span>');return}i&&(i.style.display="none"),s.lines.forEach((f,M)=>{const C=document.createElement("div");C.className="lyric-line",C.dataset.idx=String(M),C.dataset.time=String(f.time),C.textContent=f.text||"♪",f.time>=0&&(C.style.cursor="pointer",C.title=`Seek to ${Math.floor(f.time/60)}:${Math.floor(f.time%60).toString().padStart(2,"0")}`,C.addEventListener("click",()=>{t.currentTime=f.time,t.play().catch(()=>{})})),a.appendChild(C)})}}function g(){if(!a||!s.isSynced||!s.lines.length)return;const f=t.currentTime;let M=-1;for(let C=0;C<s.lines.length&&s.lines[C].time<=f;C++)M=C;if(M!==l){l=M;const C=a.querySelectorAll(".lyric-line");if(C.forEach(($,X)=>{$.classList.toggle("active",X===l),$.classList.toggle("passed",X<l)}),l>=0&&C[l]){const $=C[l],X=a.clientHeight,q=$.offsetTop-a.offsetTop-X/2+$.clientHeight/2;a.scrollTo({top:Math.max(0,q),behavior:"smooth"})}}}t.addEventListener("timeupdate",g),window.addEventListener("lumi:trackChange",f=>{p(f.detail)}),at("melo:track-changed",f=>{p(f)});const x=window.__LUMI_QUEUE__;Array.isArray(x)&&x.length>0&&p(x[0]),window.LumiLyrics={loadTrackLyrics:p,parseLRC:ue}}let It=null;const ge=`<!doctype html>
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
</html>`,ve=`<!doctype html>
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
</html>`,he={"compact-pill-light.html":ge,"compact-pill-dark.html":ve,"compact-pill-light":ge,"compact-pill-dark":ve},Ye=[{id:"compact-pill-light",name:"Minimal Compact (Light)",filename:"compact-pill-light.html"},{id:"compact-pill-dark",name:"Minimal Compact (Dark)",filename:"compact-pill-dark.html"},{id:"full-html-example",name:"Full HTML Example",filename:"full-html-example.html"},{id:"example-custom",name:"Custom CSS Example",filename:"example-custom.html"}];function Be(t){const e=["trackTitle","btnPlay","seekBar","coverImg"];let a=0;for(const i of e)t.includes(i)&&a++;return a>=3}function qt(t,e){const a=document.getElementById("playerCard");if(!a)return;const i=a._originalHTML||a.innerHTML;a._originalHTML||(a._originalHTML=i),It&&(It.remove(),It=null);let s=[...t.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(x=>x[1]).join(`
`);s&&(It=document.createElement("style"),It.id="melo-custom-skin",It.textContent=s,document.head.appendChild(It));const l=Be(t);let h="";const p=t.match(/<body[^>]*>([\s\S]*?)<\/body>/i);p?h=p[1]:h=t.split(/<\/style>/i).pop()||"";const r=document.createElement("div");r.innerHTML=h;const g=r.querySelector("#lumi-player");if(g&&(h=g.innerHTML),l&&h.trim().length>20){const x=h.trim();a.innerHTML=x,e&&e("Skin applied"),setTimeout(()=>{var M,C;(M=window.__LUMI_REBIND__)==null||M.call(window);const f=window.__LUMI_AUDIO__;f&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(f),(C=window.__LUMI_REBIND_MAIN__)==null||C.call(window)},40)}else s&&e&&e("Skin CSS applied");localStorage.setItem("lumi-custom-skin",t),localStorage.setItem("lumi-custom-skin-isFull",l?"1":"0")}function jt(t,e=!0){It&&(It.remove(),It=null);const a=document.getElementById("playerCard");a&&a._originalHTML&&(a.innerHTML=a._originalHTML,setTimeout(()=>{var n,s;(n=window.__LUMI_REBIND__)==null||n.call(window);const i=window.__LUMI_AUDIO__;i&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(i),(s=window.__LUMI_REBIND_MAIN__)==null||s.call(window)},40)),localStorage.removeItem("lumi-custom-skin"),localStorage.removeItem("lumi-custom-skin-isFull"),localStorage.setItem("melo-active-skin-id","default"),e&&Y("melo:skin-changed","default"),t&&t("Switched to Default Melo skin")}async function Pe(){if(Tt)try{const{invoke:t}=await N(async()=>{const{invoke:a}=await import("./core-DhEqZVGG.js");return{invoke:a}},[]),e=await t("list_installed_skins");if(Array.isArray(e)&&e.length>0)return e}catch{}return Ye}async function ze(t,e){if(Tt)try{const{invoke:i}=await N(async()=>{const{invoke:s}=await import("./core-DhEqZVGG.js");return{invoke:s}},[]),n=await i("read_skin_file",{filenameOrPath:t});if(n&&n.trim().length>0)return qt(n,e),!0}catch{}try{const i=t.startsWith("skins/")?t:`skins/${t}`,n=await fetch(i);if(n.ok){const s=await n.text();return qt(s,e),!0}}catch{}const a=t.replace(/^.*[\\/]/,"");return he[a]?(qt(he[a],e),!0):(e&&e(`Could not load skin: ${t}`),!1)}async function _t(t,e,a,i=!0){if(t==="default"){jt(a,i);return}let n=t;t==="compact-pill"||t.startsWith("compact-pill")?n=e==="dark"?"compact-pill-dark.html":"compact-pill-light.html":!n.endsWith(".html")&&!n.endsWith(".htm")&&(n=n+".html"),await ze(n,a)&&(localStorage.setItem("melo-active-skin-id",t),i&&Y("melo:skin-changed",t))}async function Re(t){if(Tt)try{const{invoke:e}=await N(async()=>{const{invoke:a}=await import("./core-DhEqZVGG.js");return{invoke:a}},[]);await e("open_skins_folder"),t&&t("Opening skins folder...")}catch{t&&t("Could not open skins folder")}else t&&t("Skins are located in the skins/ folder")}function Je(t){const e=document.getElementById("skinUpload"),a=document.getElementById("linkDownloadExample");a&&a.addEventListener("click",s=>{s.preventDefault(),ze("compact-pill-light.html")});const i=localStorage.getItem("melo-active-skin-id")||"default",n=localStorage.getItem("lumi-theme")||"dark";i!=="default"&&setTimeout(()=>{_t(i,n,void 0,!1)},150),at("melo:theme",s=>{const l=localStorage.getItem("melo-active-skin-id");l&&l!=="default"&&_t(l,s,void 0,!1)}),at("melo:skin-changed",s=>{if(s&&typeof s=="string"){const l=localStorage.getItem("lumi-theme")||"dark";_t(s,l,void 0,!1)}}),e&&e.addEventListener("change",async()=>{var p;const s=(p=e.files)==null?void 0:p[0];if(!s)return;const l=await s.text(),h=s.name;if(Tt)try{const{invoke:r}=await N(async()=>{const{invoke:g}=await import("./core-DhEqZVGG.js");return{invoke:g}},[]);await r("save_custom_skin_file",{filename:h,content:l}),t(`Saved ${h} to skins folder`)}catch{}qt(l,t),localStorage.setItem("melo-active-skin-id",h),Y("melo:skin-changed",h),e.value=""}),document.addEventListener("dragover",s=>{var l;[...((l=s.dataTransfer)==null?void 0:l.types)||[]].includes("Files")&&s.preventDefault()}),document.addEventListener("drop",async s=>{var h;const l=[...((h=s.dataTransfer)==null?void 0:h.files)||[]].find(p=>p.name.endsWith(".html")||p.name.endsWith(".htm"));if(l){s.preventDefault();const p=await l.text();if(p.includes("<style")||p.includes("<html")||Be(p)){const r=l.name;if(Tt)try{const{invoke:g}=await N(async()=>{const{invoke:x}=await import("./core-DhEqZVGG.js");return{invoke:x}},[]);await g("save_custom_skin_file",{filename:r,content:p})}catch{}qt(p,t),localStorage.setItem("melo-active-skin-id",r),Y("melo:skin-changed",r)}}}),window.LumiSkin={applyCustomSkin:qt,resetSkin:jt,applySkinChoice:_t,listInstalledSkins:Pe,openSkinsFolderOnDisk:Re}}const De=document.querySelector("#app");De.innerHTML=`
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
`;const Ct=!!window.__TAURI__,ct=new URLSearchParams(location.search).get("panel");var we,xe;if(Ct&&ct){N(async()=>{const{getCurrentWindow:i}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:i}},__vite__mapDeps([8,7,1,0])).then(({getCurrentWindow:i})=>{const n=i();Ke(n,"melo-geo-panel-"+ct),n.onCloseRequested(()=>{Y("melo:panel-closed",ct)}),window.addEventListener("beforeunload",()=>{Y("melo:panel-closed",ct)})});const t=document.getElementById("win-"+ct),e=((we=t==null?void 0:t.querySelector(".float-title"))==null?void 0:we.innerHTML)||"",a=((xe=t==null?void 0:t.querySelector(".float-body"))==null?void 0:xe.innerHTML)||"";De.innerHTML=`
<div class="panel-root">
  <div class="panel-titlebar">${e}</div>
  <div class="panel-body">${a}</div>
  <div id="toast" class="toast"></div>
</div>`}Ct&&!ct&&(document.body.classList.add("tauri-main"),document.querySelectorAll(".side-actions .sbtn").forEach(t=>t.classList.remove("active")),N(async()=>{const{WebviewWindow:t}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:t}},__vite__mapDeps([6,7,1,0,8])).then(({WebviewWindow:t})=>{const e=async()=>{var a;for(const i of["library","playlist","equalizer","settings"])try{const n=await t.getByLabel("panel-"+i);(a=document.getElementById(Zt[i]))==null||a.classList.toggle("active",!!n)}catch{}};e(),setInterval(e,1200)}));Ct&&!ct&&(N(()=>import("./window-BWd3Cypy.js"),__vite__mapDeps([8,7,1,0])).then(async({getCurrentWindow:t})=>{const e=t(),a=()=>{const n=localStorage.getItem("melo-active-skin-id"),s=n==="compact-pill"||typeof n=="string"&&n.startsWith("compact-pill");return{w:s?780:960,h:s?138:240}};try{const n=JSON.parse(localStorage.getItem("melo-geo-main")||"null"),{LogicalPosition:s,LogicalSize:l}=await N(async()=>{const{LogicalPosition:p,LogicalSize:r}=await import("./dpi-fvP-W2qr.js");return{LogicalPosition:p,LogicalSize:r}},__vite__mapDeps([7,1])),h=a();await e.setSize(new l(n!=null&&n.w?Math.max(650,n.w):h.w,h.h)),(n==null?void 0:n.x)!=null&&(n==null?void 0:n.y)!=null&&await e.setPosition(new s(n.x,n.y))}catch{}const i=async()=>{try{const n=await e.outerPosition(),s=await e.innerSize(),l=a();localStorage.setItem("melo-geo-main",JSON.stringify({x:n.x,y:n.y,w:s.width,h:l.h}))}catch{}};e.onMoved(i),e.onResized(async()=>{try{const n=await e.innerSize(),s=a(),{LogicalSize:l}=await N(async()=>{const{LogicalSize:h}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:h}},__vite__mapDeps([7,1]));(n.width<650||n.height!==s.h)&&await e.setSize(new l(Math.max(650,n.width),s.h))}catch{}i()}),at("melo:skin-changed",async n=>{try{!ct&&n&&await _t(n,ft,void 0,!1);const s=n==="compact-pill"||typeof n=="string"&&n.startsWith("compact-pill"),l=s?780:960,h=s?138:240,{LogicalSize:p}=await N(async()=>{const{LogicalSize:r}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:r}},__vite__mapDeps([7,1]));await e.setSize(new p(l,h)),i()}catch{}}),e.onCloseRequested(async n=>{n.preventDefault();const{WebviewWindow:s}=await N(async()=>{const{WebviewWindow:l}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:l}},__vite__mapDeps([6,7,1,0,8]));for(const l of["library","playlist","equalizer","settings"])try{const h=await s.getByLabel("panel-"+l);h&&await h.close()}catch{}try{await e.destroy()}catch{window.close()}})}),N(()=>import("./core-DhEqZVGG.js"),[]).then(async({invoke:t})=>{try{const e=await t("get_cli_tracks");if(Array.isArray(e)&&e.length>0){const a=window.LumiLibrary,i=window.LumiPlayer;e.forEach(n=>n.source="import"),a==null||a.addToCurrentPlaylist(e),e.forEach(n=>i==null?void 0:i.queue.push(n)),setTimeout(()=>{if(i&&i.queue.length>0){const n=i.queue.findIndex(s=>s.id===e[0].id);i.loadTrack(n>=0?n:0,!0)}},150)}}catch{}}),at("melo:open-files",t=>{if(Array.isArray(t)&&t.length>0){const e=window.LumiLibrary,a=window.LumiPlayer;t.forEach(i=>i.source="import"),e==null||e.addToCurrentPlaylist(t),t.forEach(i=>a==null?void 0:a.queue.push(i)),tt(`Playing ${t[0].title}`),setTimeout(()=>{if(a&&a.queue.length>0){const i=a.queue.findIndex(n=>n.id===t[0].id);a.loadTrack(i>=0?i:0,!0)}},150)}}));document.addEventListener("contextmenu",t=>{t.preventDefault()});const Ft=document.getElementById("toast"),tt=t=>{Ft&&(Ft.textContent=t,Ft.classList.add("show"),setTimeout(()=>Ft.classList.remove("show"),2200))},St=new Audio;St.preload="metadata";window.__LUMI_AUDIO__=St;window.__TOAST__=tt;let ft=localStorage.getItem("lumi-theme")||"dark";function Gt(t){document.documentElement.setAttribute("data-theme",t),localStorage.setItem("lumi-theme",t),ft=t}function Kt(t){Gt(t),Y("melo:theme",t)}Gt(ft);at("melo:theme",t=>{(t==="light"||t==="dark")&&Gt(t)});setInterval(()=>{const t=localStorage.getItem("lumi-theme");(t==="light"||t==="dark")&&t!==ft&&Gt(t)},1e3);const Xe=["win-library","win-playlist","win-equalizer","win-lyrics","win-settings"],Wt=document.getElementById("desktop"),qe={btnToggleLibrary:"win-library",btnTogglePlaylist:"win-playlist",btnToggleEq:"win-equalizer",btnToggleLyrics:"win-lyrics",btnOpenSettings:"win-settings",menuToggleLibrary:"win-library",menuTogglePlaylist:"win-playlist",menuToggleEq:"win-equalizer",menuToggleLyrics:"win-lyrics",menuToggleSettings:"win-settings"};function Qe(t){const e=document.getElementById(t);return!!e&&!e.classList.contains("hidden")}const Zt={library:"btnToggleLibrary",playlist:"btnTogglePlaylist",equalizer:"btnToggleEq",lyrics:"btnToggleLyrics",settings:"btnOpenSettings"};async function Ke(t,e){const a=async()=>{try{const i=await t.outerPosition(),n=await t.outerSize();localStorage.setItem(e,JSON.stringify({x:i.x,y:i.y,w:n.width,h:n.height}))}catch{}};t.onMoved(a),t.onResized(a)}async function Ze(t){const{WebviewWindow:e}=await N(async()=>{const{WebviewWindow:g}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:g}},__vite__mapDeps([6,7,1,0,8])),a="panel-"+t,i=document.getElementById(Zt[t]),n=await e.getByLabel(a);if(n){await n.close(),i==null||i.classList.remove("active");return}const s={library:[430,620],playlist:[440,560],equalizer:[700,440],lyrics:[380,520],settings:[600,540]},l={library:[360,400],playlist:[360,360],equalizer:[620,400],lyrics:[320,360],settings:[500,400]},h={library:"Library",playlist:"Playlist",equalizer:"Equalizer",lyrics:"Synced Lyrics",settings:"Settings"},p=s[t]||[420,520];let r=null;try{r=JSON.parse(localStorage.getItem("melo-geo-panel-"+t)||"null")}catch{}new e(a,{url:`/?panel=${t}`,title:h[t]||t,width:(r==null?void 0:r.w)||p[0],height:(r==null?void 0:r.h)||p[1],minWidth:(l[t]||[360,360])[0],minHeight:(l[t]||[360,360])[1],...(r==null?void 0:r.x)!=null?{x:r.x,y:r.y}:{center:!0},decorations:!0,skipTaskbar:!0}),i==null||i.classList.add("active"),Y("melo:theme",ft)}at("melo:panel-closed",t=>{var a;const e=Zt[t];e&&((a=document.getElementById(e))==null||a.classList.remove("active"))});function te(t){if(Ct){Ze(t.replace(/^win-/,""));return}const e=Qe(t);Vt(t,!e),e||Yt(document.getElementById(t))}function ti(t){if(t.classList.contains("hidden")||!Wt||window.matchMedia("(max-width: 860px)").matches)return;const e=Wt.getBoundingClientRect();if(e.width<=0||e.height<=0)return;const a=t.getBoundingClientRect(),i=Math.min(a.width,e.width),n=Math.min(a.height,e.height);let s=a.left-e.left,l=a.top-e.top;s=Math.max(0,Math.min(e.width-i,s)),l=Math.max(0,Math.min(e.height-n,l)),t.style.left=s+"px",t.style.top=l+"px",t.style.right="auto",t.style.bottom="auto",t.style.transform="none"}function Vt(t,e){var n,s,l,h,p,r,g,x,f,M;const a=document.getElementById(t);if(!a)return;a.classList.toggle("hidden",!e),localStorage.setItem("lumiv2-"+t,e?"1":"0"),e&&ti(a);const i=e;t==="win-library"&&((n=document.getElementById("btnToggleLibrary"))==null||n.classList.toggle("active",i),(s=document.getElementById("menuToggleLibrary"))==null||s.classList.toggle("active",i)),t==="win-playlist"&&((l=document.getElementById("btnTogglePlaylist"))==null||l.classList.toggle("active",i),(h=document.getElementById("menuTogglePlaylist"))==null||h.classList.toggle("active",i)),t==="win-equalizer"&&((p=document.getElementById("btnToggleEq"))==null||p.classList.toggle("active",i),(r=document.getElementById("menuToggleEq"))==null||r.classList.toggle("active",i)),t==="win-lyrics"&&((g=document.getElementById("btnToggleLyrics"))==null||g.classList.toggle("active",i),(x=document.getElementById("menuToggleLyrics"))==null||x.classList.toggle("active",i)),t==="win-settings"&&((f=document.getElementById("btnOpenSettings"))==null||f.classList.toggle("active",i),(M=document.getElementById("menuToggleSettings"))==null||M.classList.toggle("active",i))}ct||Xe.forEach(t=>{const e=localStorage.getItem("lumiv2-"+t);e!==null?Vt(t,e==="1"):t==="win-settings"?Vt(t,!1):Vt(t,!0)});Object.entries(qe).forEach(([t,e])=>{var a;(a=document.getElementById(t))==null||a.addEventListener("click",()=>te(e))});document.querySelectorAll("[data-close]").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.close;Vt(e,!1)})});let gt=null,Et=null,fe=10;function Yt(t){fe++,t.style.zIndex=String(fe),document.querySelectorAll(".float-win").forEach(e=>e.classList.remove("active")),t.classList.add("active")}document.querySelectorAll(".float-win").forEach(t=>{t.addEventListener("mousedown",()=>Yt(t))});document.querySelectorAll("[data-drag]").forEach(t=>{t.addEventListener("mousedown",e=>{if(e.target.closest("button")||e.target.closest("input")||e.target.closest("select"))return;const a=t.dataset.drag,i=document.getElementById(a);Yt(i),i.classList.add("dragging");const n=i.getBoundingClientRect();gt={id:a,startX:e.clientX,startY:e.clientY,initX:n.left,initY:n.top,width:n.width,height:n.height}})});document.querySelectorAll("[data-resize]").forEach(t=>{t.addEventListener("mousedown",e=>{e.stopPropagation();const a=t.dataset.resize,i=document.getElementById(a);Yt(i),i.classList.add("resizing");const n=i.getBoundingClientRect();Et={id:a,startX:e.clientX,startY:e.clientY,initW:n.width,initH:n.height}})});window.addEventListener("mousemove",t=>{if(gt){const e=document.getElementById(gt.id);let a=t.clientX-gt.startX,i=t.clientY-gt.startY,n=gt.initX+a,s=gt.initY+i;if(Wt&&!window.matchMedia("(max-width: 860px)").matches){const l=Wt.getBoundingClientRect(),h=l.left,p=l.right-gt.width,r=l.top,g=l.bottom-gt.height;n=Math.max(h,Math.min(p,n))-l.left,s=Math.max(r,Math.min(g,s))-l.top}e.style.left=n+"px",e.style.top=s+"px",e.style.right="auto",e.style.bottom="auto",e.style.transform="none"}if(Et){const e=document.getElementById(Et.id);let a=Et.initW+(t.clientX-Et.startX),i=Et.initH+(t.clientY-Et.startY);a=Math.max(260,a),i=Math.max(160,i),e.style.width=a+"px",e.style.height=i+"px"}});window.addEventListener("mouseup",()=>{if(gt){const t=document.getElementById(gt.id);t&&(t.classList.remove("dragging"),localStorage.setItem("lumiv2-pos-"+gt.id,JSON.stringify({left:t.style.left,top:t.style.top}))),gt=null}if(Et){const t=document.getElementById(Et.id);t&&(t.classList.remove("resizing"),localStorage.setItem("lumiv2-size-"+Et.id,JSON.stringify({width:t.style.width,height:t.style.height}))),Et=null}});let pt=document.getElementById("appMenuBtn"),H=document.getElementById("appMenu");function ei(){const t=H==null?void 0:H.classList.toggle("open");pt==null||pt.classList.toggle("open",!!t)}pt==null||pt.addEventListener("click",t=>{t.stopPropagation(),ei()});document.addEventListener("click",t=>{H&&!H.contains(t.target)&&t.target!==pt&&(H.classList.remove("open"),pt==null||pt.classList.remove("open"))});document.addEventListener("keydown",t=>{t.key==="Escape"&&(H==null||H.classList.remove("open"),pt==null||pt.classList.remove("open"))});var ke;(ke=document.getElementById("menuCustomSkin"))==null||ke.addEventListener("click",()=>{var t;(t=document.getElementById("skinUpload"))==null||t.click(),H==null||H.classList.remove("open")});var Ee;(Ee=document.getElementById("menuSkinDefault"))==null||Ee.addEventListener("click",()=>{jt(tt);const t=document.getElementById("skinSelect");t&&(t.value="default"),H==null||H.classList.remove("open")});var Le;(Le=document.getElementById("menuSkinCompact"))==null||Le.addEventListener("click",()=>{_t("compact-pill",ft,tt);const t=document.getElementById("skinSelect");t&&(t.value="compact-pill"),H==null||H.classList.remove("open")});var Se;(Se=document.getElementById("menuThemeToggle"))==null||Se.addEventListener("click",()=>{Kt(ft==="light"?"dark":"light"),H==null||H.classList.remove("open")});var Ie;(Ie=document.getElementById("menuAbout"))==null||Ie.addEventListener("click",()=>{tt("Melo 0.2 Beta — Tauri 2 + TypeScript + Rust"),H==null||H.classList.remove("open")});const ee=typeof window.__TAURI_INTERNALS__<"u"||typeof window.__TAURI__<"u";async function Oe(){const t=window.LumiLibrary,e=window.LumiPlayer;if(ee){try{const{open:i}=await N(async()=>{const{open:p}=await import("./index-CS3Qnt9j.js");return{open:p}},__vite__mapDeps([5,1])),n=await i({multiple:!0,filters:[{name:"Audio",extensions:["mp3","flac","wav","aac","ogg","m4a","alac","opus","wma","aiff"]}]});if(!n)return;const s=Array.isArray(n)?n:[n],{invoke:l}=await N(async()=>{const{invoke:p}=await import("./core-DhEqZVGG.js");return{invoke:p}},[]),h=[];for(const p of s)try{const r=await l("scan_library",{path:p});if(r&&r.length)r.forEach(g=>g.source="import"),h.push(...r);else{const g=p.replace(/^.*[\\/]/,""),x=g.lastIndexOf("."),f=x>0?g.slice(0,x):g,M=x>0?g.slice(x+1).toUpperCase():"AUDIO";h.push({id:p,title:f,artist:"Unknown Artist",album:"Single",duration:0,path:p,codec:M,specs:"Local File",source:"import"})}}catch{const r=p.replace(/^.*[\\/]/,""),g=r.lastIndexOf("."),x=g>0?r.slice(0,g):r,f=g>0?r.slice(g+1).toUpperCase():"AUDIO";h.push({id:p,title:x,artist:"Unknown Artist",album:"Single",duration:0,path:p,codec:f,specs:"Local File",source:"import"})}t==null||t.addTracks(h,!0),t==null||t.addToCurrentPlaylist(h),h.forEach(p=>e==null?void 0:e.queue.push(p)),Y("melo:play-tracks",{tracks:h,index:0}),tt(`${h.length} file(s) added`)}catch{tt("Error opening files")}H==null||H.classList.remove("open");return}const a=document.createElement("input");a.type="file",a.multiple=!0,a.accept="audio/*,.mp3,.flac,.wav,.aac,.ogg,.m4a,.alac,.opus,.wma,.aiff",a.onchange=async()=>{const i=Array.from(a.files||[]);if(!i.length)return;const n=[];for(const s of i){const l=s.path,h=l||URL.createObjectURL(s),p=s.name,r=p.lastIndexOf("."),g=r>0?p.slice(0,r):p,x=r>0?p.slice(r+1).toUpperCase():"AUDIO",f={id:l||"imp_"+Math.random().toString(36).slice(2,9),title:g,artist:"Unknown Artist",album:"Single",duration:0,path:h,codec:x,specs:"Local File",source:"import"};await Ht(s,f),n.push(f)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(s=>e==null?void 0:e.queue.push(s)),Y("melo:play-tracks",{tracks:n,index:0}),tt(`${n.length} file(s) added`)},a.click(),H==null||H.classList.remove("open")}async function $e(){const t=window.LumiLibrary,e=window.LumiPlayer;if(ee){try{const{open:i}=await N(async()=>{const{open:r}=await import("./index-CS3Qnt9j.js");return{open:r}},__vite__mapDeps([5,1])),n=await i({directory:!0});if(!n)return;const s=n,{invoke:l}=await N(async()=>{const{invoke:r}=await import("./core-DhEqZVGG.js");return{invoke:r}},[]),p=(await l("scan_library",{path:s})).map(r=>({...r,source:"import"}));t==null||t.addTracks(p,!0),t==null||t.addToCurrentPlaylist(p),p.forEach(r=>e==null?void 0:e.queue.push(r)),Y("melo:play-tracks",{tracks:p,index:0}),tt(`${p.length} track(s) added from folder`)}catch{tt("Error scanning folder")}H==null||H.classList.remove("open");return}const a=document.createElement("input");a.type="file",a.webkitdirectory=!0,a.multiple=!0,a.accept="audio/*",a.onchange=async()=>{const i=Array.from(a.files||[]).filter(s=>/\.(mp3|flac|wav|aac|ogg|m4a|alac|opus|wma|aiff)$/i.test(s.name));if(!i.length)return;const n=[];for(const s of i){const l=s.path,h=l||URL.createObjectURL(s),p=s.name,r=p.lastIndexOf("."),g=r>0?p.slice(0,r):p,x=r>0?p.slice(r+1).toUpperCase():"AUDIO",f={id:l||"imp_"+Math.random().toString(36).slice(2,9),title:g,artist:"Unknown Artist",album:"Folder Import",duration:0,path:h,codec:x,specs:"Local File",source:"import"};await Ht(s,f),n.push(f)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(s=>e==null?void 0:e.queue.push(s)),Y("melo:play-tracks",{tracks:n,index:0}),tt(`${n.length} file(s) added from folder`)},a.click(),H==null||H.classList.remove("open")}var Me;(Me=document.getElementById("btnAddFiles"))==null||Me.addEventListener("click",Oe);var _e;(_e=document.getElementById("btnAddFolder"))==null||_e.addEventListener("click",$e);var Te;(Te=document.getElementById("btnThemeToggle"))==null||Te.addEventListener("click",()=>{Kt(ft==="light"?"dark":"light")});window.addEventListener("keydown",t=>{(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="o"&&(t.shiftKey?(t.preventDefault(),$e()):(t.preventDefault(),Oe())),((t.ctrlKey||t.metaKey)&&t.key===","||t.key==="F2")&&(t.preventDefault(),te("win-settings"))});function ye(t){var C,$,X;function e(B){document.querySelectorAll(".settings-tab").forEach(q=>{q.classList.toggle("active",q.dataset.stab===B)}),document.querySelectorAll(".settings-section[data-panel]").forEach(q=>{q.classList.toggle("active",q.dataset.panel===B)}),localStorage.setItem("melo-settings-tab",B)}document.querySelectorAll(".settings-tab").forEach(B=>{B.addEventListener("click",()=>e(B.dataset.stab))}),e(localStorage.getItem("melo-settings-tab")||"general"),document.querySelectorAll(".switch[data-key]").forEach(B=>{const q=B.dataset.key,J=localStorage.getItem("melo-pref-"+q);J!==null&&B.classList.toggle("on",J==="1"),B.onclick=()=>{B.classList.toggle("on");const F=B.classList.contains("on");localStorage.setItem("melo-pref-"+q,F?"1":"0"),t(F?"Enabled":"Disabled"),Y("melo:pref-changed",{key:q,value:F})}});const a=document.getElementById("setCrossfade"),i=document.getElementById("crossfadeVal");if(a){const B=localStorage.getItem("melo-pref-crossfade")||"0";a.value=B,i&&(i.textContent=B+"s"),a.oninput=()=>{const q=a.value;i&&(i.textContent=q+"s"),localStorage.setItem("melo-pref-crossfade",q)}}const n=document.getElementById("setLanguage");if(n){const B=localStorage.getItem("melo-pref-lang")||"en";n.value=B,n.onchange=()=>{localStorage.setItem("melo-pref-lang",n.value),t(`Language set to ${n.options[n.selectedIndex].text}`)}}const s=document.getElementById("swDynamicTheme");if(s){const B=localStorage.getItem("melo-dynamic-theme")!=="0";s.classList.toggle("on",B),s.onclick=()=>{var U,b;const q=!s.classList.contains("on");s.classList.toggle("on",q),localStorage.setItem("melo-dynamic-theme",q?"1":"0");const J=window.__LUMI_QUEUE__,F=(b=(U=window.LumiPlayer)==null?void 0:U.currentIndex)!=null?b:0;J&&J[F]&&Ce(q?J[F].cover:null),t(q?"Dynamic theme enabled":"Dynamic theme disabled")}}const l=document.getElementById("skinSelect"),h=document.getElementById("btnSkinThemeToggle"),p=document.getElementById("btnRefreshSkins"),r=document.getElementById("btnOpenSkinsFolder"),g=document.getElementById("skinThemeIcon"),x=document.getElementById("skinThemeLabel");function f(B){g&&(g.textContent=B==="dark"?"🌙":"☀️"),x&&(x.textContent=B==="dark"?"Dark":"Light")}f(ft),h==null||h.addEventListener("click",()=>{const B=ft==="dark"?"light":"dark";Kt(B),f(B),t(B==="dark"?"Dark theme":"Light theme")}),at("melo:theme",B=>{(B==="light"||B==="dark")&&f(B)});async function M(){if(!l)return;const B=localStorage.getItem("melo-active-skin-id")||"default",q=await Pe();l.innerHTML=`
      <option value="default">Default Melo (Standard)</option>
      <option value="compact-pill">Minimal Compact (Pill Bar)</option>
    `,q.forEach(J=>{if(J.filename!=="compact-pill-light.html"&&J.filename!=="compact-pill-dark.html"){const F=document.createElement("option");F.value=J.filename,F.textContent=`${J.name} (${J.filename})`,l.appendChild(F)}}),l.value=B}M(),l&&(l.onchange=()=>{const B=l.value;_t(B,ft,t)}),p==null||p.addEventListener("click",async()=>{await M();const B=localStorage.getItem("melo-active-skin-id")||"default";_t(B,ft,t),t("Skins reloaded from disk")}),r==null||r.addEventListener("click",()=>{Re(t)}),(C=document.getElementById("btn-reset-skin-settings"))==null||C.addEventListener("click",()=>{jt(t),l&&(l.value="default")}),($=document.getElementById("btn-settings-reset"))==null||$.addEventListener("click",()=>{localStorage.clear(),t("Settings reset — reloading..."),setTimeout(()=>location.reload(),600)}),(X=document.getElementById("btnChooseFolder"))==null||X.addEventListener("click",async()=>{if(ee)try{const{open:B}=await N(async()=>{const{open:J}=await import("./index-CS3Qnt9j.js");return{open:J}},__vite__mapDeps([5,1])),q=await B({directory:!0});q&&(document.getElementById("setMusicFolder").value=q,localStorage.setItem("melo-pref-music-folder",q),t("Music folder updated"))}catch{}else t("Folder selection dialog requires Tauri build")})}function Ue(){document.querySelectorAll(".win-btn").forEach(t=>{t.onclick=async()=>{const e=t.getAttribute("aria-label");if(window.__TAURI__){const{getCurrentWindow:a}=await N(async()=>{const{getCurrentWindow:n}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:n}},__vite__mapDeps([8,7,1,0])),i=a();e==="minimize"?i.minimize():e==="maximize"?i.toggleMaximize():e==="close"&&i.close()}else e==="close"&&tt("Window close requires the Tauri desktop build"),e==="maximize"&&tt("Resize: drag corner handle")}})}Ue();window.__LUMI_REBIND_MAIN__=()=>{const t=document.getElementById("appMenuBtn"),e=document.getElementById("appMenu");t&&e&&(pt=t,H=e,t.onclick=a=>{a.stopPropagation(),e.classList.toggle("open"),t.classList.toggle("open",e.classList.contains("open"))}),Ue(),Object.entries(qe).forEach(([a,i])=>{const n=document.getElementById(a);n&&(n.onclick=()=>te(i))})};const Dt=document.createElement("div");Dt.id="scanBar";document.body.appendChild(Dt);let be=0;at("melo:scan-progress",t=>{if(!t)return;const e=t.total?Math.round(t.done/t.total*100):100;Dt.style.opacity="1",Dt.style.width=e+"%",clearTimeout(be),(t.finished||t.total&&t.done>=t.total)&&(be=setTimeout(()=>{Dt.style.opacity="0",Dt.style.width="0"},800))});Ct&&!ct&&at("melo:scan-batch",t=>{const e=window.LumiLibrary;e&&Array.isArray(t)&&t.length&&(t.forEach(a=>a.source="scan"),e.addTracks(t,!0),e.addToCurrentPlaylist(t))});const At=document.createElement("div");At.id="aboutPop";At.style.display="none";document.body.appendChild(At);var Ae;(Ae=document.getElementById("btnAbout"))==null||Ae.addEventListener("click",t=>{var e;t.stopPropagation(),At.innerHTML=`
    <div class="about-head">Melo <b>0.3 Beta</b></div>
    <div style="font-size:11.5px; color:var(--text-soft); margin:6px 0 10px;">
      Modern Windows Music Player<br/>
      Tauri 2 + TypeScript + Rust
    </div>
    <a class="about-link" id="aboutLink" href="https://github.com/Arvanta/Melo" rel="noopener">github.com/Arvanta/Melo ↗</a>`,At.style.display=At.style.display==="none"?"block":"none",(e=document.getElementById("aboutLink"))==null||e.addEventListener("click",a=>{a.preventDefault();const i="https://github.com/Arvanta/Melo";Ct?N(()=>import("./core-DhEqZVGG.js"),[]).then(n=>n.invoke("open_url",{url:i})).catch(()=>window.open(i,"_blank")):window.open(i,"_blank")})});document.addEventListener("click",t=>{!t.target.closest("#aboutPop")&&!t.target.closest("#btnAbout")&&(At.style.display="none")});Ct&&ct?ct==="library"||ct==="playlist"?de(St,tt):ct==="equalizer"?pe(St,tt,{remote:!0}):ct==="lyrics"?me(St):ct==="settings"&&ye(tt):(je(St,tt),de(St,tt),pe(St,tt),Ge(St),me(St),Je(tt),ye(tt));tt("Melo 0.3 Beta is ready");
