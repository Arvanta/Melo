const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/event-CNdo2oXa.js","assets/core-DhEqZVGG.js","assets/index-DiyoAAdc.js","assets/index-CHth0gh2.js","assets/index-Bq0iOnRE.js","assets/index-CS3Qnt9j.js","assets/webviewWindow-mjQkSB26.js","assets/dpi-fvP-W2qr.js","assets/window-BWd3Cypy.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();const He="modulepreload",Ve=function(t){return"/"+t},le={},F=function(e,a,i){let n=Promise.resolve();if(a&&a.length>0){let l=function(r){return Promise.all(r.map(m=>Promise.resolve(m).then(x=>({status:"fulfilled",value:x}),x=>({status:"rejected",reason:x}))))};document.getElementsByTagName("link");const g=document.querySelector("meta[property=csp-nonce]"),d=(g==null?void 0:g.nonce)||(g==null?void 0:g.getAttribute("nonce"));n=l(a.map(r=>{if(r=Ve(r),r in le)return;le[r]=!0;const m=r.endsWith(".css"),x=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${x}`))return;const v=document.createElement("link");if(v.rel=m?"stylesheet":He,m||(v.as="script"),v.crossOrigin="",v.href=r,d&&v.setAttribute("nonce",d),document.head.appendChild(v),m)return new Promise((M,C)=>{v.addEventListener("load",M),v.addEventListener("error",()=>C(new Error(`Unable to preload CSS for ${r}`)))})}))}function s(l){const g=new Event("vite:preloadError",{cancelable:!0});if(g.payload=l,window.dispatchEvent(g),!g.defaultPrevented)throw l}return n.then(l=>{for(const g of l||[])g.status==="rejected"&&s(g.reason);return e().catch(s)})},_t=typeof window.__TAURI_INTERNALS__<"u"||typeof window.__TAURI__<"u";async function J(t,e){if(_t)try{const{emit:a}=await F(async()=>{const{emit:i}=await import("./event-CNdo2oXa.js");return{emit:i}},__vite__mapDeps([0,1]));await a(t,e)}catch{window.dispatchEvent(new CustomEvent(t,{detail:e}))}else window.dispatchEvent(new CustomEvent(t,{detail:e}))}function at(t,e){_t?F(async()=>{const{listen:a}=await import("./event-CNdo2oXa.js");return{listen:a}},__vite__mapDeps([0,1])).then(({listen:a})=>{a(t,i=>e(i.payload))}).catch(()=>{window.addEventListener(t,a=>e(a.detail))}):window.addEventListener(t,a=>e(a.detail))}let re=!1;async function Ne(){if(!re){re=!0;try{const t=globalThis;if(typeof t.Buffer>"u"){const e=await F(()=>import("./index-DiyoAAdc.js").then(a=>a.i),__vite__mapDeps([2,3]));t.Buffer=e.Buffer}typeof t.process>"u"&&(t.process={env:{},browser:!0,nextTick:e=>setTimeout(e,0)})}catch{}}}async function Fe(t,e){var a;try{await Ne();const i=await F(()=>import("./index-Bq0iOnRE.js").then(r=>r.i),__vite__mapDeps([4,3])),n=i&&typeof i.parseBlob=="function"?i:i.default||i,s=await Promise.race([n.parseBlob(t),new Promise((r,m)=>setTimeout(()=>m(new Error("timeout")),1800))]),l=s==null?void 0:s.common;if(!l)return;l.title&&(e.title=l.title),l.artist?e.artist=l.artist:l.artists&&l.artists[0]&&(e.artist=l.artists[0]),l.album&&(e.album=l.album),l.genre&&l.genre[0]&&(e.genre=l.genre[0]),l.year&&(e.year=l.year);const g=(a=l.picture)==null?void 0:a[0];if(g&&g.data){const r=g.format||"image/jpeg",m=g.data;if(m.length>6e5)return;let x="";const v=8192;for(let M=0;M<m.length;M+=v){const C=m.subarray(M,M+v);x+=String.fromCharCode.apply(null,C)}e.cover=`data:${r};base64,${btoa(x)}`}const d=s==null?void 0:s.format;d&&d.duration&&!e.duration&&(e.duration=Math.floor(d.duration))}catch{}}async function Ht(t,e,a=1800){return await Fe(t,e),e}async function We(t){return new Promise(e=>{if(!t)return e(null);const a=new Image;a.crossOrigin="anonymous",a.onload=()=>{try{const i=document.createElement("canvas"),n=i.getContext("2d");if(!n)return e(null);i.width=40,i.height=40,n.drawImage(a,0,0,40,40);const s=n.getImageData(0,0,40,40).data;let l={r:42,g:123,b:214},g=-1;for(let d=0;d<s.length;d+=4){const r=s[d],m=s[d+1],x=s[d+2];if(s[d+3]<128)continue;const M=Math.max(r,m,x),C=Math.min(r,m,x),$=(M+C)/510,X=M-C,B=X===0?0:X/(1-Math.abs(2*$-1));if(B>.25&&$>.25&&$<.82){const q=B*1.5+(1-Math.abs($-.5));q>g&&(g=q,l={r,g:m,b:x})}}g>0?e(l):e(null)}catch{e(null)}},a.onerror=()=>e(null),a.src=t})}async function Ce(t){const e=localStorage.getItem("melo-dynamic-theme")!=="0",a=document.documentElement;if(!e||!t){a.style.removeProperty("--accent"),a.style.removeProperty("--visualizer"),a.style.removeProperty("--accent-glow");return}const i=await We(t);if(i){const n=`rgb(${i.r}, ${i.g}, ${i.b})`;a.style.setProperty("--accent",n),a.style.setProperty("--visualizer",n),a.style.setProperty("--accent-glow",`rgba(${i.r}, ${i.g}, ${i.b}, 0.35)`)}else a.style.removeProperty("--accent"),a.style.removeProperty("--visualizer"),a.style.removeProperty("--accent-glow")}const $t=[31,62,125,250,500,1e3,2e3,4e3,8e3,16e3];let xt=null,ce=null,Jt=[],Ot=null,Pt=null;function Qt(t){if(!xt){const e=window.AudioContext||window.webkitAudioContext;xt=new e,ce=xt.createMediaElementSource(t),Jt=$t.map(i=>{const n=xt.createBiquadFilter();return n.type="peaking",n.frequency.value=i,n.Q.value=1.4,n.gain.value=0,n}),Ot=xt.createGain(),Ot.gain.value=1,Pt=xt.createAnalyser(),Pt.fftSize=2048,Pt.smoothingTimeConstant=.72;let a=ce;for(const i of Jt)a.connect(i),a=i;a.connect(Ot),Ot.connect(Pt),Pt.connect(xt.destination)}return{ctx:xt,filters:Jt,gain:Ot,analyser:Pt,resume(){xt&&xt.state==="suspended"&&xt.resume().catch(()=>{})}}}function je(t,e){let a,i,n,s,l,g,d,r=null,m,x,v,M,C,$,X,B,q,G,N,U,b,k=[],_=0,W=!1,Y="off",it=!1;window.__LUMI_QUEUE__=k,window.__LUMI_SET_QUEUE__=c=>{k=c,window.__LUMI_QUEUE__=c};function K(c){if(!isFinite(c))return"0:00";const P=Math.floor(c/60),T=Math.floor(c%60).toString().padStart(2,"0");return`${P}:${T}`}function nt(){if(!m)return;const c=parseFloat(m.value)/parseFloat(m.max)*100;m.style.setProperty("--progress",c+"%")}function lt(){x&&x.style.setProperty("--vol",x.value+"%")}async function gt(c){if(/^(https?|data|blob):/.test(c))return c;if(_t)try{const{convertFileSrc:P}=await F(async()=>{const{convertFileSrc:T}=await import("./core-DhEqZVGG.js");return{convertFileSrc:T}},[]);return P(c)}catch{}return c}async function ct(c,P=!0){c<0&&(c=k.length-1),c>=k.length&&(c=0),_=c;const T=k[c];if(!T)return;$||S(),t.src=await gt(T.path),t.load(),$&&($.textContent=T.title),X&&(X.textContent=T.artist),B&&(B.textContent=T.album),q&&(q.textContent=T.codec),G&&(G.textContent=T.specs),T.cover&&N?(N.src=T.cover,N.style.display="block",U&&(U.style.display="none")):(N&&(N.style.display="none"),U&&(U.style.display="grid")),m&&(m.max=String(T.duration||276),m.value="0",nt()),M&&(M.textContent=K(T.duration)),v&&(v.textContent="0:00"),E(),Ce(T.cover||null),document.querySelectorAll(".track-row").forEach((O,D)=>{var et;O.classList.toggle("active",((et=k[D])==null?void 0:et.id)===T.id)}),document.querySelectorAll("#queueList .track-row").forEach(O=>{O.classList.toggle("active",O.dataset.id===T.id)}),"mediaSession"in navigator&&(navigator.mediaSession.metadata=new MediaMetadata({title:T.title,artist:T.artist,album:T.album,artwork:T.cover?[{src:T.cover,sizes:"512x512",type:"image/jpeg"}]:[]}),navigator.mediaSession.setActionHandler("play",()=>Et()),navigator.mediaSession.setActionHandler("pause",()=>vt()),navigator.mediaSession.setActionHandler("previoustrack",()=>w()),navigator.mediaSession.setActionHandler("nexttrack",()=>bt()),navigator.mediaSession.setActionHandler("seekto",O=>{O.seekTime&&(t.currentTime=O.seekTime)})),P&&Et();const R=document.getElementById("lyricsBox");R&&(R.textContent=T.lyrics||"No lyrics found for this track. You can add it via the tag editor."),window.dispatchEvent(new CustomEvent("lumi:trackChange",{detail:T})),J("melo:track-changed",T)}let ft=!1;function Bt(){ft&&(ft=!1,t.play().then(()=>{i&&(i.style.display="none"),n&&(n.style.display="block")}).catch(()=>{}))}window.addEventListener("pointerdown",Bt),window.addEventListener("keydown",Bt);function Et(){try{Qt(t).resume()}catch{}t.play().then(()=>{ft=!1,i&&(i.style.display="none"),n&&(n.style.display="block"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="playing")}).catch(()=>{ft||(ft=!0,e("Click once inside the player window to start playback"))})}function vt(){t.pause(),i&&(i.style.display="block"),n&&(n.style.display="none"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}function yt(){t.paused?Et():vt()}function Z(){t.pause();try{t.currentTime=0}catch{}i&&(i.style.display="block"),n&&(n.style.display="none"),m&&(m.value="0",nt()),v&&(v.textContent="0:00"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}function bt(){if(Y==="one"){t.currentTime=0,Et();return}let c=_+1;if(W&&(c=Math.floor(Math.random()*k.length),c===_&&(c=(c+1)%k.length)),c>=k.length)if(Y==="all")c=0;else{vt();return}ct(c)}function w(){if(t.currentTime>3){t.currentTime=0;return}let c=_-1;W&&(c=Math.floor(Math.random()*k.length)),c<0&&(Y==="all"?c=k.length-1:c=0),ct(c)}function E(){var D;const c=k[_];if(!c||!x)return;const P=parseInt(x.value)/100,T=b&&b.checked&&(D=c.replayGain)!=null?D:0,R=Math.pow(10,T/20);let O=P*R;O=Math.min(1,Math.max(0,O)),t.volume=O}function S(){if(a=document.getElementById("btnPlay"),i=document.getElementById("iconPlay"),n=document.getElementById("iconPause"),s=document.getElementById("btnPrev"),l=document.getElementById("btnNext"),g=document.getElementById("btnShuffle"),d=document.getElementById("btnRepeat"),r=document.getElementById("btnStop"),m=document.getElementById("seekBar"),x=document.getElementById("volBar"),v=document.getElementById("curTime"),M=document.getElementById("durTime"),C=document.getElementById("volPct"),$=document.getElementById("trackTitle"),X=document.getElementById("trackArtist"),B=document.getElementById("trackAlbum"),q=document.getElementById("trackCodec"),G=document.getElementById("trackSpecs"),N=document.getElementById("coverImg"),U=document.getElementById("coverFallback"),b=document.getElementById("replayGainToggle"),a&&(a.onclick=yt),r&&(r.onclick=Z,r.style.display=localStorage.getItem("lumiv2-showStop")==="1"?"":"none"),s&&(s.onclick=w),l&&(l.onclick=bt),g&&(g.onclick=()=>{W=!W,g.classList.toggle("active",W),e(W?"Playback Shuffle on":"Playback Shuffle off")}),d&&(d.onclick=()=>{Y=Y==="off"?"all":Y==="all"?"one":"off",d.classList.toggle("active",Y!=="off");const c={off:"Repeat off",all:"Repeat all",one:"Repeat one"};e(c[Y]),d.title=c[Y],Y==="one"?d.style.color="var(--accent)":d.style.color=""}),m&&(m.oninput=()=>{it=!0,v&&(v.textContent=K(parseFloat(m.value))),nt()},m.onchange=()=>{t.currentTime=parseFloat(m.value),it=!1}),x&&(x.oninput=()=>{lt(),C&&(C.textContent=x.value+"%"),E()}),b&&(b.onchange=()=>E()),nt(),lt(),k[_]){const c=k[_];$&&($.textContent=c.title),X&&(X.textContent=c.artist),B&&(B.textContent=c.album),q&&(q.textContent=c.codec),G&&(G.textContent=c.specs),c.cover&&N&&(N.src=c.cover,N.style.display="block",U&&(U.style.display="none"))}}S(),t.addEventListener("timeupdate",()=>{!it&&m&&v&&(m.value=String(Math.floor(t.currentTime)),v.textContent=K(t.currentTime),nt())}),t.addEventListener("loadedmetadata",()=>{!m||!M||(m.max=String(Math.floor(t.duration||k[_].duration||276)),M.textContent=K(t.duration||k[_].duration),nt())}),t.addEventListener("ended",()=>{bt()}),window.addEventListener("keydown",c=>{c.target.tagName!=="INPUT"&&(c.code==="Space"&&(c.preventDefault(),yt()),c.code==="ArrowRight"&&(t.currentTime+=5),c.code==="ArrowLeft"&&(t.currentTime-=5),(c.key==="m"||c.key==="M")&&(t.muted=!t.muted,e(t.muted?"Muted":"Unmuted")),(c.key==="s"||c.key==="S")&&g&&g.click(),(c.key==="r"||c.key==="R")&&d&&d.click(),c.code==="ArrowUp"&&x&&(x.value=String(Math.min(100,parseInt(x.value)+5)),x.dispatchEvent(new Event("input"))),c.code==="ArrowDown"&&x&&(x.value=String(Math.max(0,parseInt(x.value)-5)),x.dispatchEvent(new Event("input"))))}),at("melo:tray-action",c=>{c==="play_pause"?yt():c==="next"?bt():c==="prev"?w():c==="mute"&&(t.muted=!t.muted,e(t.muted?"Muted":"Unmuted"))}),ct(0,!1),window.LumiPlayer={get queue(){return k},set queue(c){k=c},get currentIndex(){return _},loadTrack:ct,play:Et,pause:vt,stop:Z,next:bt,prev:w,get audio(){return t},rebind:S},window.__LUMI_REBIND__=S,at("melo:play-tracks",c=>{if(!c||!Array.isArray(c.tracks)||!c.tracks.length)return;k=c.tracks,window.__LUMI_SET_QUEUE__(k);const P=Math.max(0,Math.min(c.index||0,k.length-1));ct(P)}),at("melo:add-queue",c=>{c&&(k.push(c),window.__LUMI_SET_QUEUE__(k))}),at("melo:tag-updated",c=>{c&&k[_]&&k[_].id===c.id&&(Object.assign(k[_],c),ct(_,!1))})}const zt=!!window.__TAURI__,Tt=new URLSearchParams(location.search).get("panel")||"main";let Q=[],dt=[];try{const t=localStorage.getItem("melo-playlists");if(t){const e=JSON.parse(t);Array.isArray(e)&&e.length&&(dt=e)}}catch{}dt.length||(dt=[{id:"p1",name:"Favorites",tracks:[],createdAt:Date.now()}]);try{const t=localStorage.getItem("melo-tracks");if(t){const e=JSON.parse(t);Array.isArray(e)&&(Q=e)}}catch{}function de(t,e){var ae,ne,oe,se;const a=document.getElementById("trackList");document.getElementById("playlistList");const i=document.getElementById("winPlaylistTracks"),n=document.getElementById("winPlaylistEmpty"),s=document.getElementById("playlistSelect"),l=document.getElementById("searchInput"),g=document.getElementById("libraryStats"),d=document.getElementById("btn-scan"),r=document.getElementById("btn-export-playlist"),m=document.getElementById("btn-new-playlist"),x=document.getElementById("queueList"),v=document.getElementById("tagEditor"),M=document.getElementById("tagTitle"),C=document.getElementById("tagArtist"),$=document.getElementById("tagAlbum"),X=document.getElementById("tagYear"),B=document.getElementById("tagCover");let q="",G=localStorage.getItem("melo-currentPlaylist")||((ae=dt[0])==null?void 0:ae.id)||"",N="artists",U=null,b=null,k=null,_=null,W=[];(ne=document.getElementById("libraryTabs"))==null||ne.querySelectorAll(".tab").forEach(o=>{o.addEventListener("click",()=>{document.querySelectorAll("#libraryTabs .tab").forEach(p=>p.classList.remove("active")),o.classList.add("active"),N=o.dataset.libtab,U=b=k=_=null,V()})}),l==null||l.addEventListener("input",()=>{q=l.value.toLowerCase(),V()}),V(),wt(),d==null||d.addEventListener("click",async()=>{if(window.__TAURI__)try{const{open:o}=await F(async()=>{const{open:f}=await import("./index-CS3Qnt9j.js");return{open:f}},__vite__mapDeps([5,1])),p=await o({directory:!0,multiple:!1});if(p){e("Scanning folder in the background…");const{invoke:f}=await F(async()=>{const{invoke:y}=await import("./core-DhEqZVGG.js");return{invoke:y}},[]),h=await f("scan_library",{path:p});h.forEach(y=>y.source="scan"),gt(h,!0),ct(h),V()}}catch{e("Scanning requires the Tauri build")}else{const o=document.createElement("input");o.type="file",o.multiple=!0,o.accept="audio/*",o.onchange=async()=>{var f;const p=Array.from(o.files||[]);for(const h of p){const y=URL.createObjectURL(h),u=Math.random().toString(36).slice(2),L=((f=h.name.split(".").pop())==null?void 0:f.toUpperCase())||"MP3",I={id:u,title:h.name.replace(/\.[^/.]+$/,""),artist:"Unknown",album:"Imported",genre:"Unknown",year:new Date().getFullYear(),duration:180,path:y,codec:L,specs:"Imported · Stereo",replayGain:0},A=new Audio(y);await new Promise(j=>{A.addEventListener("loadedmetadata",()=>{I.duration=Math.floor(A.duration)||180,j(null)},{once:!0}),A.load(),setTimeout(()=>j(null),1500)}),await Ht(h,I),Q.push(I)}e(`${p.length} file(s) added`),V(),wt()},o.click()}}),document.addEventListener("dragover",o=>{o.preventDefault()}),document.addEventListener("drop",async o=>{var f,h;o.preventDefault();const p=Array.from(((f=o.dataTransfer)==null?void 0:f.files)||[]).filter(y=>y.type.startsWith("audio/")||/\.(mp3|flac|wav|ogg|aac|m4a|alac)$/i.test(y.name));if(p.length){for(const y of p){const u=URL.createObjectURL(y),L=Math.random().toString(36).slice(2),I=((h=y.name.split(".").pop())==null?void 0:h.toUpperCase())||"MP3",A={id:L,title:y.name.replace(/\.[^/.]+$/,""),artist:"Imported",album:"Drop",genre:"Unknown",year:new Date().getFullYear(),duration:200,path:u,codec:I,specs:"Drag & Drop"};await Ht(y,A);const j=new Audio(u);await new Promise(st=>{j.addEventListener("loadedmetadata",()=>{A.duration=Math.floor(j.duration)||200,st(null)},{once:!0}),j.load(),setTimeout(()=>st(null),800)}),Q.push(A)}e(`${p.length} File added via drag & drop`),V()}});function Y(){return dt.find(o=>o.id===G)||dt[0]}function it(){localStorage.setItem("melo-rev",String(Date.now())),localStorage.setItem("melo-playlists",JSON.stringify(dt))}function K(){zt&&J("melo:playlists-sync",{src:Tt,playlists:dt})}function nt(o){G=o,localStorage.setItem("melo-currentPlaylist",o),Z()}at("melo:playlists-sync",o=>{o&&o.src!==Tt&&Array.isArray(o.playlists)&&(dt=o.playlists,Z(),V())});function lt(){localStorage.setItem("melo-rev",String(Date.now()));try{localStorage.setItem("melo-tracks",JSON.stringify(Q))}catch{try{localStorage.setItem("melo-tracks",JSON.stringify(Q.map(({cover:o,...p})=>p)))}catch{}}}function gt(o,p=!1){let f=!1;o.forEach(h=>{Q.some(y=>y.id===h.id)||(Q.push(h),f=!0)}),f&&(lt(),V(),Z()),p&&zt&&J("melo:tracks-add",{src:Tt,list:o})}at("melo:tracks-add",o=>{o&&o.src!==Tt&&Array.isArray(o.list)&&gt(o.list)});function ct(o){const p=Y();if(!p)return;let f=!1;o.forEach(h=>{p.tracks.includes(h.id)||(p.tracks.push(h.id),f=!0)}),f&&(it(),K(),Z(),V())}async function ft(o){if(!zt)return[];const{invoke:p}=await F(async()=>{const{invoke:h}=await import("./core-DhEqZVGG.js");return{invoke:h}},[]),f=[];for(const h of o)try{const y=await p("scan_library",{path:h});y&&f.push(...y)}catch{}return f}zt&&F(async()=>{const{getCurrentWebviewWindow:o}=await import("./webviewWindow-mjQkSB26.js");return{getCurrentWebviewWindow:o}},__vite__mapDeps([6,7,1,0,8])).then(({getCurrentWebviewWindow:o})=>{o().onDragDropEvent(async f=>{var h;if(f.payload.type==="drop"){const y=f.payload.paths||[];if(!y.length)return;const u=await ft(y);if(!u.length)return;u.forEach(L=>L.source="import"),gt(u,!0),ct(u),J("melo:play-tracks",{tracks:u,index:0}),e(`Playing ${((h=u[0])==null?void 0:h.title)||"track"}`)}})}).catch(()=>{});function Bt(o){return`${Math.floor(o/60)}:${String(Math.floor(o%60)).padStart(2,"0")}`}function Et(o){return o.type.startsWith("audio/")||/\.(mp3|flac|wav|ogg|aac|m4a|alac|opus)$/i.test(o.name)}async function vt(o){var I;const p=o.path;if(p&&zt){const A=await ft([p]);if(A.length)return A[0].source="import",A[0]}const f=p||URL.createObjectURL(o),h=p||Math.random().toString(36).slice(2),y=((I=o.name.split(".").pop())==null?void 0:I.toUpperCase())||"MP3",u=o.name.replace(/\.[^/.]+$/,""),L={id:h,title:u,artist:"Unknown Artist",album:"Single",genre:"Unknown",year:new Date().getFullYear(),duration:180,path:f,codec:y,specs:"Local File",replayGain:0,source:"import"};try{const A=new Audio(URL.createObjectURL(o));await new Promise(j=>{A.addEventListener("loadedmetadata",()=>{L.duration=Math.floor(A.duration)||180,j(null)},{once:!0}),A.load(),setTimeout(()=>j(null),800)})}catch{}return await Ht(o,L),L}let yt="";function Z(){if(!i)return;try{const y=localStorage.getItem("melo-tracks");if(y){const u=JSON.parse(y);Array.isArray(u)&&u.length>Q.length&&(Q=u)}}catch{}const o=Y();if(s&&(s.innerHTML=dt.map(y=>`<option value="${y.id}" ${o&&y.id===o.id?"selected":""}>${y.name}</option>`).join("")),!o){i.innerHTML="",i.style.display="none",n&&(n.style.display="block");return}let p=o.tracks.map(y=>Q.find(u=>u.id===y)).filter(Boolean),f=p;if(yt.trim()){const y=yt.toLowerCase().trim();f=p.filter(u=>u.title.toLowerCase().includes(y)||u.artist.toLowerCase().includes(y)||u.album.toLowerCase().includes(y))}if(n&&(n.style.display=p.length?"none":"block"),i.style.display=p.length?"flex":"none",!f.length&&p.length){i.innerHTML=`<div style="padding:16px;text-align:center;color:var(--text-muted);font-size:11px;">No tracks match "${yt}"</div>`;return}i.innerHTML=f.map((y,u)=>{const L=o.tracks.indexOf(y.id);return`
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
    `}).join("");let h=null;i.querySelectorAll(".track-row").forEach(y=>{const u=y;u.addEventListener("dragstart",L=>{h=parseInt(u.dataset.plIdx),L.dataTransfer.setData("application/x-melo-ids",u.dataset.id),L.dataTransfer.setData("application/x-melo-pl-idx",String(h)),L.dataTransfer.effectAllowed="move",u.style.opacity="0.4"}),u.addEventListener("dragend",()=>{u.style.opacity="1",h=null,i==null||i.querySelectorAll(".track-row").forEach(L=>L.classList.remove("drag-over-target"))}),u.addEventListener("dragover",L=>{L.preventDefault(),L.stopPropagation(),u.classList.add("drag-over-target")}),u.addEventListener("dragleave",()=>{u.classList.remove("drag-over-target")}),u.addEventListener("drop",L=>{var j;L.preventDefault(),L.stopPropagation(),u.classList.remove("drag-over-target");const I=parseInt(u.dataset.plIdx),A=(j=L.dataTransfer)==null?void 0:j.getData("application/x-melo-pl-idx");if(A!==void 0&&A!==""&&!isNaN(parseInt(A))){const st=parseInt(A);if(st!==I&&st>=0&&I>=0&&st<o.tracks.length&&I<o.tracks.length){const Nt=o.tracks.splice(st,1)[0];o.tracks.splice(I,0,Nt),it(),K(),Z(),V(),e("Track reordered in playlist");return}}}),u.addEventListener("click",L=>{const I=L.target;if(I.closest("[data-action='pl-remove']")){const st=parseInt(I.closest("[data-action='pl-remove']").dataset.idx);o.tracks.splice(st,1),it(),K(),Z(),V();return}const A=u.dataset.id,j=f.findIndex(st=>st.id===A);J("melo:play-tracks",{tracks:f,index:j>=0?j:0})})})}const bt=document.getElementById("playlistSearchInput");bt&&bt.addEventListener("input",()=>{yt=bt.value,Z()});const w=document.getElementById("playlistSortSelect");if(w&&w.addEventListener("change",()=>{const o=Y();if(!o||!o.tracks.length)return;const p=w.value,f=o.tracks.map(h=>Q.find(y=>y.id===h)).filter(Boolean);p==="title-asc"?f.sort((h,y)=>h.title.localeCompare(y.title)):p==="artist-asc"?f.sort((h,y)=>h.artist.localeCompare(y.artist)):p==="album-asc"?f.sort((h,y)=>h.album.localeCompare(y.album)):p==="dur-asc"?f.sort((h,y)=>h.duration-y.duration):p==="dur-desc"&&f.sort((h,y)=>y.duration-h.duration),o.tracks=f.map(h=>h.id),it(),K(),Z(),e(`Playlist sorted by ${w.options[w.selectedIndex].text}`)}),s==null||s.addEventListener("change",()=>nt(s.value)),r==null||r.addEventListener("click",()=>{const o=Y();if(!o)return e("No playlist available");const p=o.tracks.map(L=>Q.find(I=>I.id===L)).filter(Boolean);if(!p.length)return e("Current list is empty");let f=`#EXTM3U
`;p.forEach(L=>{f+=`#EXTINF:${Math.floor(L.duration)},${L.artist} - ${L.title}
${L.path}
`});const h=new Blob([f],{type:"audio/x-mpegurl"}),y=URL.createObjectURL(h),u=document.createElement("a");u.href=y,u.download=`${o.name}.m3u`,u.click(),URL.revokeObjectURL(y),e(`M3U exported for "${o.name}"`)}),m==null||m.addEventListener("click",()=>{const o=prompt("New playlist name:");if(!o)return;const p=Math.random().toString(36).slice(2,8);dt.push({id:p,name:o,tracks:[],createdAt:Date.now()}),nt(p),it(),K(),V(),e(`Playlist "${o}" created`)}),i){const o=i.parentElement;["dragover","dragenter"].forEach(p=>o.addEventListener(p,f=>{f.preventDefault(),f.stopPropagation(),i.classList.add("drag-over")})),o.addEventListener("dragleave",p=>{o.contains(p.relatedTarget)||i.classList.remove("drag-over")}),o.addEventListener("drop",async p=>{var u,L;p.preventDefault(),p.stopPropagation(),i.classList.remove("drag-over");const f=Y();if(!f)return e("Create a playlist first (+ New)");const h=(((u=p.dataTransfer)==null?void 0:u.getData("application/x-melo-ids"))||"").split(",").filter(Boolean);let y=0;if(h.length)h.forEach(I=>{f.tracks.includes(I)||(f.tracks.push(I),y++)});else{const I=Array.from(((L=p.dataTransfer)==null?void 0:L.files)||[]).filter(Et);for(const A of I){const j=await vt(A);Q.push(j),f.tracks.includes(j.id)||(f.tracks.push(j.id),y++)}}y&&e(`${y} track(s) added to "${f.name}"`),lt(),it(),K(),V(),Z()})}const E=document.getElementById("playerCard");E&&(["dragover","dragenter"].forEach(o=>E.addEventListener(o,p=>{p.preventDefault(),p.stopPropagation(),E.classList.add("drag-over")})),E.addEventListener("dragleave",o=>{E.contains(o.relatedTarget)||E.classList.remove("drag-over")}),E.addEventListener("drop",async o=>{var y,u;o.preventDefault(),o.stopPropagation(),E.classList.remove("drag-over");const p=window.LumiPlayer,f=(((y=o.dataTransfer)==null?void 0:y.getData("application/x-melo-ids"))||"").split(",").filter(Boolean);let h=[];if(f.length)h=f.map(L=>Q.find(I=>I.id===L)).filter(Boolean),p&&h.length&&e(`Playback ${h.length} track(s)`);else{const L=Array.from(((u=o.dataTransfer)==null?void 0:u.files)||[]).filter(Et),I=Y();let A=!1;for(const j of L){const st=await vt(j);Q.push(st),h.push(st),I&&!I.tracks.includes(st.id)&&(I.tracks.push(st.id),A=!0)}L.length&&(lt(),it(),K(),V(),Z()),p&&h.length&&e(A&&I?`Playback ${h.length} track(s) + added to "${I.name}"`:`Playback ${h.length} track(s)`)}h.length&&J("melo:play-tracks",{tracks:h,index:0})}));let S=null;function c(o){if(S=o,!S)return e("No track to edit");v.style.display="flex",M.value=S.title,C.value=S.artist,$.value=S.album,X.value=String(S.year)}function P(o){const p=Q.filter(o).map(f=>f.id);p.length&&(Q=Q.filter(f=>!o(f)),dt.forEach(f=>{f.tracks=f.tracks.filter(h=>!p.includes(h))}),lt(),it(),K(),zt&&J("melo:tracks-remove",{src:Tt,ids:p}),V(),Z())}at("melo:tracks-remove",o=>{if(o&&o.src!==Tt&&Array.isArray(o.ids)){const p=o.ids;Q=Q.filter(f=>!p.includes(f.id)),dt.forEach(f=>{f.tracks=f.tracks.filter(h=>!p.includes(h))}),V(),Z()}});const T=document.createElement("div");T.className="ctx-menu",T.style.display="none",document.body.appendChild(T);let R=null;function O(){T.style.display="none"}document.addEventListener("click",O),document.addEventListener("keydown",o=>{o.key==="Escape"&&O()}),T.addEventListener("click",o=>{const p=o.target.closest("[data-act]");if(!p||!R)return;o.stopPropagation();const f=p.dataset.act;f==="edit"&&c(R.track),f==="remove"&&(R.type==="track"?P(h=>h.id===R.track.id):R.type==="artist"?P(h=>h.artist===R.name):R.type==="album"?P(h=>h.artist===R.artist&&h.album===R.album):R.type==="genre"&&P(h=>h.genre===R.name)),O()});const D=document.createElement("div");D.className="ctx-menu",D.style.display="none",document.body.appendChild(D);let et=-1;document.addEventListener("click",()=>{D.style.display="none"}),D.addEventListener("click",o=>{if(!o.target.closest("[data-act='plremove']"))return;o.stopPropagation();const p=Y();p&&et>=0&&et<p.tracks.length&&(p.tracks.splice(et,1),it(),K(),Z(),V()),D.style.display="none"}),document.addEventListener("contextmenu",o=>{O(),D.style.display="none";const p=o.target,f=p.closest("#winPlaylistTracks .track-row");if(f){o.preventDefault(),et=parseInt(f.dataset.plIdx||"-1"),D.innerHTML='<button class="ctx-item danger" data-act="plremove">Remove from Playlist</button>',D.style.display="block";const L=D.getBoundingClientRect();D.style.left=Math.max(4,Math.min(o.clientX,window.innerWidth-L.width-6))+"px",D.style.top=Math.max(4,Math.min(o.clientY,window.innerHeight-L.height-6))+"px";return}if(!(Tt==="library"?!0:!!p.closest("#win-library"))){o.preventDefault();return}o.preventDefault();const y=p.closest(".track-row, [data-artist], [data-albumkey], [data-genre]");if(!y){O();return}if(y.classList.contains("track-row")){const L=W[parseInt(y.dataset.viewIdx)];if(!L){O();return}R={type:"track",track:L},T.innerHTML='<button class="ctx-item" data-act="edit">Edit tags</button><button class="ctx-item danger" data-act="remove">Remove track from library</button>'}else if(y.dataset.artist)R={type:"artist",name:y.dataset.artist},T.innerHTML='<button class="ctx-item danger" data-act="remove">Remove artist from library</button>';else if(y.dataset.albumkey){const[L,I]=(y.dataset.albumkey||"").split("\0");R={type:"album",artist:L,album:I},T.innerHTML='<button class="ctx-item danger" data-act="remove">Remove album from library</button>'}else R={type:"genre",name:y.dataset.genre},T.innerHTML='<button class="ctx-item danger" data-act="remove">Remove genre from library</button>';T.style.display="block";const u=T.getBoundingClientRect();T.style.left=Math.max(4,Math.min(o.clientX,window.innerWidth-u.width-6))+"px",T.style.top=Math.max(4,Math.min(o.clientY,window.innerHeight-u.height-6))+"px"}),(oe=document.getElementById("btn-tag-cancel"))==null||oe.addEventListener("click",()=>v.style.display="none"),(se=document.getElementById("btn-tag-save"))==null||se.addEventListener("click",async()=>{if(S){if(S.title=M.value,S.artist=C.value,S.album=$.value,S.year=parseInt(X.value)||S.year,B.files&&B.files[0]){const o=B.files[0],p=URL.createObjectURL(o),f=new FileReader;f.onload=()=>{S.cover=f.result,V(),wt(),J("melo:tag-updated",S)},f.readAsDataURL(o),S.cover=p}if(window.__TAURI__)try{const{invoke:o}=await F(async()=>{const{invoke:p}=await import("./core-DhEqZVGG.js");return{invoke:p}},[]);await o("write_tags",{path:S.path,tags:{title:S.title,artist:S.artist,album:S.album}})}catch{}v.style.display="none",lt(),V(),wt(),J("melo:tag-updated",S),e("Metadata saved")}});function z(o){return String(o!=null?o:"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ot(){return Q.filter(o=>o.source==="scan")}function ut(o){return W=o,o.length?o.map((p,f)=>{const h=`${Math.floor(p.duration/60)}:${String(Math.floor(p.duration%60)).padStart(2,"0")}`;return`
      <div class="track-row" draggable="true" data-view-idx="${f}" data-id="${z(p.id)}">
        <span class="num">${f+1}</span>
        <img class="track-cover-mini" src="${p.cover||""}" style="${p.cover?"":"display:none"}" onerror="this.style.display='none'"/>
        <div style="flex:1;min-width:0;">
          <div class="t-title">${z(p.title)}</div>
          <div class="t-artist">${z(p.artist)} • ${z(p.album)}${p.year?" • "+p.year:""}</div>
        </div>
        <span style="font-size:10px;padding:3px 6px;border-radius:6px;background:var(--badge-bg);color:var(--badge-text);border:1px solid var(--card-border);">${z(p.codec)}</span>
        <span class="t-dur">${h}</span>
        <button class="btn small ghost" data-action="add-queue" data-view-idx="${f}">+</button>
      </div>`}).join(""):'<div style="padding:30px;text-align:center;color:var(--text-muted);">Nothing here yet.<br/><span style="font-size:12px;">Use "Scan Folder" to build your library</span></div>'}function V(){if(!a){Z();return}const o=ot(),p=new Set(o.map(u=>u.artist)).size,f=new Set(o.map(u=>u.artist+"\0"+u.album)).size;g&&(g.textContent=`${o.length} tracks • ${p} artists • ${f} albums`);const h=q.trim().toLowerCase();let y="";if(N==="artists")if(U){const u=o.filter(A=>A.artist===U),L=[...new Set(u.map(A=>A.album))].sort((A,j)=>A.localeCompare(j)),I=b?u.filter(A=>A.album===b):u;y=`<div class="lib-crumb"><button class="btn small" data-back="artists">‹ Artists</button><b>${z(U)}</b></div>
          <div class="chip-row"><button class="chip ${b?"":"active"}" data-album="">All albums</button>`+L.map(A=>`<button class="chip ${b===A?"active":""}" data-album="${z(A)}">${z(A)}</button>`).join("")+"</div>"+ut(h?I.filter(A=>(A.title+A.album).toLowerCase().includes(h)):I)}else{W=[];const u=[...new Set(o.map(I=>I.artist))].sort((I,A)=>I.localeCompare(A));y=(h?u.filter(I=>I.toLowerCase().includes(h)):u).map(I=>{const A=o.filter(j=>j.artist===I).length;return`<div class="lib-item" data-artist="${z(I)}"><div class="lib-avatar">${z((I[0]||"?").toUpperCase())}</div><div style="flex:1;min-width:0;"><div class="t-title">${z(I)}</div><div class="t-artist">${A} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No artists found.</div>'}else if(N==="albums")if(k){const[u,L]=k.split("\0"),I=o.filter(A=>A.artist===u&&A.album===L);y=`<div class="lib-crumb"><button class="btn small" data-back="albums">‹ Albums</button><b>${z(L)}</b><span class="t-artist" style="margin-left:8px;">${z(u)}</span></div>`+ut(h?I.filter(A=>A.title.toLowerCase().includes(h)):I)}else{W=[];const u=[...new Set(o.map(I=>I.artist+"\0"+I.album))].sort((I,A)=>I.localeCompare(A));y=(h?u.filter(I=>I.toLowerCase().includes(h)):u).map(I=>{const[A,j]=I.split("\0"),st=o.filter(Nt=>Nt.artist===A&&Nt.album===j).length;return`<div class="lib-item" data-albumkey="${z(I)}"><div class="lib-avatar">💿</div><div style="flex:1;min-width:0;"><div class="t-title">${z(j)}</div><div class="t-artist">${z(A)} • ${st} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No albums found.</div>'}else if(_){const u=o.filter(L=>L.genre===_);y=`<div class="lib-crumb"><button class="btn small" data-back="genres">‹ Genres</button><b>${z(_)}</b></div>`+ut(h?u.filter(L=>(L.title+L.artist).toLowerCase().includes(h)):u)}else{W=[];const u=[...new Set(o.map(I=>I.genre))].sort((I,A)=>I.localeCompare(A));y=(h?u.filter(I=>I.toLowerCase().includes(h)):u).map(I=>{const A=o.filter(j=>j.genre===I).length;return`<div class="lib-item" data-genre="${z(I)}"><div class="lib-avatar">🎼</div><div style="flex:1;min-width:0;"><div class="t-title">${z(I)}</div><div class="t-artist">${A} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No genres found.</div>'}a.innerHTML=y,a.querySelectorAll("[data-artist]").forEach(u=>u.addEventListener("click",()=>{U=u.dataset.artist,b=null,V()})),a.querySelectorAll("[data-albumkey]").forEach(u=>u.addEventListener("click",()=>{k=u.dataset.albumkey,V()})),a.querySelectorAll("[data-genre]").forEach(u=>u.addEventListener("click",()=>{_=u.dataset.genre,V()})),a.querySelectorAll("[data-back]").forEach(u=>u.addEventListener("click",()=>{const L=u.dataset.back;L==="artists"?(U=null,b=null):L==="albums"?k=null:_=null,V()})),a.querySelectorAll(".chip[data-album]").forEach(u=>u.addEventListener("click",()=>{b=u.dataset.album||null,V()})),a.querySelectorAll(".track-row").forEach(u=>{u.addEventListener("dragstart",L=>{L.dataTransfer.setData("application/x-melo-ids",u.dataset.id),L.dataTransfer.effectAllowed="copy"}),u.addEventListener("click",L=>{const I=L.target,A=parseInt(u.dataset.viewIdx);if(I.closest("[data-action='add-queue']")){It(W[A]);return}J("melo:play-tracks",{tracks:W,index:A})})}),Z()}function It(o){J("melo:add-queue",o),e(`Queued: ${o.title}`)}function wt(){if(!x)return;const o=window.LumiPlayer,p=(o==null?void 0:o.queue)||Q.slice(0,4);if(!p.length){x.innerHTML='<div style="text-align:center;color:var(--text-muted);font-size:12px;padding:12px;">Queue is empty</div>';return}x.innerHTML=p.map((f,h)=>{var y;return`
      <div class="track-row" data-id="${f.id}" data-queue-idx="${h}" style="padding:6px 8px;border-radius:8px;border:1px solid ${h===((y=o==null?void 0:o.currentIndex)!=null?y:0)?"var(--accent)":"transparent"};">
        <img class="track-cover-mini" src="${f.cover||""}" style="width:24px;height:24px;${f.cover?"":"display:none"}" />
        <div style="flex:1;min-width:0;">
          <div class="t-title" style="font-size:12px;">${f.title}</div>
          <div class="t-artist" style="font-size:11px;">${f.artist}</div>
        </div>
        <button class="btn small ghost" data-remove="${h}" style="padding:2px 6px;">×</button>
      </div>
    `}).join(""),x.querySelectorAll("[data-remove]").forEach(f=>{f.addEventListener("click",()=>{const h=parseInt(f.dataset.remove);p.splice(h,1),wt()})}),x.querySelectorAll(".track-row").forEach(f=>{f.addEventListener("click",h=>{if(h.target.closest("[data-remove]"))return;const y=parseInt(f.dataset.queueIdx),u=window.LumiPlayer;u&&u.loadTrack(y)})})}at("melo:track-changed",o=>{wt();const p=document.getElementById("lyricsBox");p&&o&&(p.textContent=o.lyrics||"No lyrics found for this track. You can add it via the tag editor."),document.querySelectorAll(".track-row").forEach(f=>{f.classList.toggle("active",f.dataset.id===(o==null?void 0:o.id))})}),setInterval(()=>wt(),2e3);let ie=localStorage.getItem("melo-rev")||"";setInterval(()=>{const o=localStorage.getItem("melo-rev")||"";if(o!==ie){ie=o;try{const p=JSON.parse(localStorage.getItem("melo-tracks")||"null");Array.isArray(p)&&(Q=p)}catch{}try{const p=JSON.parse(localStorage.getItem("melo-playlists")||"null");Array.isArray(p)&&p.length&&(dt=p)}catch{}V(),Z()}},1200),window.LumiLibrary={get tracks(){return Q},get playlists(){return dt},render:V,addTracks:gt,addToCurrentPlaylist:ct,importPaths:ft,currentPlaylistName:()=>{var o;return((o=Y())==null?void 0:o.name)||"Playlist"}}}const Ut={flat:[0,0,0,0,0,0,0,0,0,0],pop:[-1,2,4,4,2,-1,-1,2,3,3],rock:[4,3,2,-1,-2,-2,1,3,4,4],bass:[6,5,4,2,1,0,-1,-1,-2,-3],treble:[-3,-2,-1,0,1,2,3,5,6,6],dance:[5,4,2,0,-1,-1,2,4,5,3],jazz:[2,1,2,3,2,0,1,2,3,2],classical:[3,2,1,0,0,0,-1,2,3,4],vocal:[-2,-1,0,2,4,4,3,1,0,-1],acoustic:[3,2,1,1,2,2,3,3,2,1],hiphop:[5,4,1,2,-1,-1,1,-1,2,3],metal:[4,2,-1,-2,-1,1,3,4,5,4]};function Xt(t){for(const[e,a]of Object.entries(Ut))if(a.every((i,n)=>i===t[n]))return e;return"custom"}function pe(t,e,a={}){const i=!!a.remote,n=document.getElementById("eqEnable"),s=document.getElementById("eqPreset"),l=document.getElementById("btnEqReset"),g=document.getElementById("eqBands"),d=document.getElementById("eqCanvas"),r=d?d.getContext("2d"):null;let m=null,x=[],v=[],M=new Array($t.length).fill(0);try{const b=JSON.parse(localStorage.getItem("melo-eq-gains")||"null");Array.isArray(b)&&b.length===$t.length&&(M=b.map(k=>typeof k=="number"?Math.max(-12,Math.min(12,k)):0))}catch{}let C=localStorage.getItem("melo-eq-preset")||Xt(M),$=localStorage.getItem("melo-eq-enabled")!=="0";function X(){if(!m)try{const b=Qt(t);m=b.ctx,x=b.filters,x.forEach((k,_)=>{k.gain.value=$?M[_]:0})}catch{}}function B(b,k){X(),x[b]&&$&&(x[b].gain.value=k)}function q(b){X(),M=[...b],$&&b.forEach((k,_)=>{x[_]&&(x[_].gain.value=k)}),U()}function G(b){X(),$=b,b?M.forEach((k,_)=>{x[_]&&(x[_].gain.value=k)}):x.forEach(k=>{k.gain.value=0}),U()}i||t&&t.addEventListener("play",()=>{X(),(m==null?void 0:m.state)==="suspended"&&m.resume().catch(()=>{})}),at("melo:eq",b=>{b&&(b.type==="gain"?(i||B(b.idx,b.val),M[b.idx]=b.val,v[b.idx]&&(v[b.idx].value=String(b.val),N(v[b.idx])),s&&(s.value=Xt(M)),U()):b.type==="gains"?(i||q(b.values),M=[...b.values],v.length&&v.forEach((k,_)=>{k.value=String(M[_]),N(k)}),s&&b.preset&&(s.value=b.preset),U()):b.type==="enable"&&($=!!b.on,i||G($),n&&(n.checked=$),U()))});function N(b){var W;const k=parseInt(b.value),_=(W=b.parentElement)==null?void 0:W.querySelector(".val");_&&(_.textContent=(k>0?"+":"")+k+"dB")}function U(){if(!d||!r)return;const b=window.devicePixelRatio||1,k=d.clientWidth*b,_=d.clientHeight*b;if(k<=0||_<=0)return;d.width=k,d.height=_,r.clearRect(0,0,k,_);const W=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#2a7bd6",Y=M;if(!$){r.strokeStyle="rgba(100,120,150,0.25)",r.lineWidth=2*b,r.beginPath(),r.moveTo(0,_/2),r.lineTo(k,_/2),r.stroke();return}r.strokeStyle=W,r.lineWidth=2.5*b,r.lineJoin="round",r.beginPath(),Y.forEach((it,K)=>{const nt=K/(Y.length-1)*k,lt=_/2-it/12*(_/2-10*b);if(K===0)r.moveTo(nt,lt);else{const gt=(K-1)/(Y.length-1)*k,ct=_/2-Y[K-1]/12*(_/2-10*b);r.quadraticCurveTo((gt+nt)/2,ct,nt,lt)}}),r.stroke(),Y.forEach((it,K)=>{const nt=K/(Y.length-1)*k,lt=_/2-it/12*(_/2-10*b);r.fillStyle=W,r.beginPath(),r.arc(nt,lt,4*b,0,Math.PI*2),r.fill(),r.fillStyle="white",r.beginPath(),r.arc(nt,lt,2*b,0,Math.PI*2),r.fill()}),r.strokeStyle="rgba(100,120,150,0.3)",r.lineWidth=1*b,r.setLineDash([4*b,4*b]),r.beginPath(),r.moveTo(0,_/2),r.lineTo(k,_/2),r.stroke(),r.setLineDash([])}g&&(g.innerHTML="",$t.forEach((b,k)=>{const _=M[k]||0,W=document.createElement("div");W.className="eq-band",W.innerHTML=`
        <input type="range" min="-12" max="12" value="${_}" step="1" data-idx="${k}" orient="vertical" />
        <label>${b>=1e3?b/1e3+"k":b}</label>
        <span style="font-size:10px;color:var(--text-muted);min-height:12px;" class="val">${(_>0?"+":"")+_+"dB"}</span>
      `,g.appendChild(W)}),v=Array.from(g.querySelectorAll("input")),v.forEach(b=>{b.addEventListener("input",()=>{const k=parseInt(b.dataset.idx),_=parseInt(b.value);N(b),M[k]=_,U();const W=Xt(M);s&&(s.value=W),localStorage.setItem("melo-eq-gains",JSON.stringify(M)),localStorage.setItem("melo-eq-preset",W),i||B(k,_),J("melo:eq",{type:"gain",idx:k,val:_,values:M})})})),s&&(s.value=C,s.addEventListener("change",()=>{const b=Ut[s.value]||Ut.flat;v.length&&v.forEach((k,_)=>{k.value=String(b[_]),N(k)}),M=[...b],U(),localStorage.setItem("melo-eq-gains",JSON.stringify(M)),localStorage.setItem("melo-eq-preset",s.value),i||q(b),J("melo:eq",{type:"gains",values:b,preset:s.value}),e(`Preset: ${s.options[s.selectedIndex].text}`)})),l&&l.addEventListener("click",()=>{const b=Ut.flat;v.length&&v.forEach((k,_)=>{k.value="0",N(k)}),M=[...b],s&&(s.value="flat"),localStorage.setItem("melo-eq-gains",JSON.stringify(M)),localStorage.setItem("melo-eq-preset","flat"),i||q(b),J("melo:eq",{type:"gains",values:b,preset:"flat"}),U(),e("Equalizer reset to Flat (0dB)")}),n&&(n.checked=$,n.addEventListener("change",()=>{$=n.checked,localStorage.setItem("melo-eq-enabled",$?"1":"0"),i||G($),J("melo:eq",{type:"enable",on:$}),U(),e($?"Equalizer On":"Equalizer off — Flat")})),d&&new ResizeObserver(()=>U()).observe(d),U(),window.LumiEqualizer={presets:Ut,frequencies:$t,displayGains:M,reset:()=>l==null?void 0:l.click()}}const Rt=[{id:"bars",label:"Classic Bars"},{id:"thin",label:"Thin Bars"},{id:"line",label:"Spectrum Line"},{id:"mirror",label:"Mirror Bars"},{id:"wave",label:"Oscilloscope"}];function Ge(t){let e=document.getElementById("vizBars");if(!e)return;let a=$(e),i=a.getContext("2d"),n=null,s=null,l=null,g=null,d=null,r=!1,m=localStorage.getItem("melo-viz-mode")||"bars";Rt.some(w=>w.id===m)||(m="bars");let x=0,v=[],M=.45,C=null;function $(w){let E=w.querySelector("canvas");return E||(w.innerHTML="",E=document.createElement("canvas"),w.appendChild(E)),E}function X(){if(!(s&&l))try{const w=Qt(t);n=w.ctx,s=w.analyser,l=new Uint8Array(s.frequencyBinCount),g=new Uint8Array(s.fftSize)}catch{r=!0}}function B(w){const E=l.length,S=((n==null?void 0:n.sampleRate)||44100)/2,c=45,P=Math.min(15e3,S*.95),T=Math.log(c),R=Math.log(P),O=[];for(let D=0;D<w;D++){const et=Math.exp(T+(R-T)*D/w),z=Math.exp(T+(R-T)*(D+1)/w);let ot=Math.floor(et/S*E),ut=Math.max(ot+1,Math.ceil(z/S*E));ot<0&&(ot=0),ut>E&&(ut=E);let V=0;for(let It=ot;It<ut;It++)V+=l[It];O.push(V/(ut-ot)/255)}return O}function q(w){const E=performance.now()/1e3,S=Math.pow(Math.abs(Math.sin(E*2.2)),2.5),c=[];for(let P=0;P<w;P++){let T=.42+.26*Math.sin(E*1.35+P*.62)+.2*Math.sin(E*2.9+P*1.31)+Math.random()*.07;T*=.55+.5*S,c.push(Math.max(.04,Math.min(1,T)))}return c}function G(w){const E=performance.now()/1e3,S=.5+.5*Math.pow(Math.abs(Math.sin(E*1.9)),2);for(let c=0;c<w.length;c++){const P=c/w.length;w[c]=128+66*S*(Math.sin(P*Math.PI*6+E*7)*.6+Math.sin(P*Math.PI*13-E*11)*.4)}}function N(w){let E;if(r||!s||!l)E=q(w);else if(s.getByteFrequencyData(l),E=B(w),!E.some(P=>P>.01)&&!t.paused)E=q(w);else for(let P=0;P<w;P++)E[P]*=1+1.7*(P/Math.max(1,w-1));let S=0;for(const c of E)c>S&&(S=c);S>M?M=S:M=Math.max(.35,M*.985),v.length!==w&&(v=new Array(w).fill(0));for(let c=0;c<w;c++){const P=Math.min(1,E[c]/M),T=P>v[c]?.55:.16;v[c]+=(P-v[c])*T}return v}function U(w,E){return getComputedStyle(document.documentElement).getPropertyValue(w).trim()||E}function b(){return a.width/Math.max(1,a.clientWidth)||1}function k(w,E,S,c,P){if(P=Math.min(P,S/2,c/2),i.roundRect){i.roundRect(w,E,S,c,P);return}i.rect(w,E,S,c)}function _(){const w=window.devicePixelRatio||1,E=a.clientWidth||(e==null?void 0:e.clientWidth)||200,S=a.clientHeight||(e==null?void 0:e.clientHeight)||56;E>0&&S>0&&(a.width=Math.round(E*w),a.height=Math.round(S*w))}new ResizeObserver(_).observe(a),_();function W(w,E,S,c){const P=b(),T=U("--visualizer","#38bdf8"),R=U("--accent","#0284c7"),O=w.length,D=E/O,et=Math.max(1.2*P,D*(1-c));for(let z=0;z<O;z++){const ot=w[z],ut=Math.max(2*P,ot*(S-4*P)),V=z*D+(D-et)/2,It=S-ut-1*P,wt=i.createLinearGradient(0,It,0,S);wt.addColorStop(0,R),wt.addColorStop(1,T),i.fillStyle=wt,i.beginPath(),k(V,It,et,ut,Math.min(et/2,3.5*P)),i.fill()}}function Y(w,E,S){const c=b(),P=U("--visualizer","#38bdf8"),T=U("--accent","#0284c7"),R=w.length,O=E/R,D=S/2,et=Math.max(1.5*c,O*.62);for(let z=0;z<R;z++){const ot=Math.max(1.5*c,w[z]*(S/2-3*c)),ut=z*O+(O-et)/2,V=i.createLinearGradient(0,D-ot,0,D+ot);V.addColorStop(0,T),V.addColorStop(.5,P),V.addColorStop(1,T),i.fillStyle=V,i.beginPath(),k(ut,D-ot,et,ot*2,Math.min(et/2,3*c)),i.fill()}}function it(w,E,S){const c=b(),P=U("--visualizer","#38bdf8"),T=U("--accent","#0284c7"),R=w.length,O=[],D=[];for(let z=0;z<R;z++)O.push((z+.5)/R*E),D.push(S-2*c-w[z]*(S-8*c));i.beginPath(),i.moveTo(O[0],S),i.lineTo(O[0],D[0]);for(let z=1;z<R;z++){const ot=(O[z-1]+O[z])/2;i.quadraticCurveTo(O[z-1],D[z-1],ot,(D[z-1]+D[z])/2)}i.lineTo(O[R-1],D[R-1]),i.lineTo(O[R-1],S),i.closePath();const et=i.createLinearGradient(0,0,0,S);et.addColorStop(0,P),et.addColorStop(1,"transparent"),i.globalAlpha=.18,i.fillStyle=et,i.fill(),i.globalAlpha=1,i.beginPath(),i.moveTo(O[0],D[0]);for(let z=1;z<R;z++){const ot=(O[z-1]+O[z])/2;i.quadraticCurveTo(O[z-1],D[z-1],ot,(D[z-1]+D[z])/2)}i.lineTo(O[R-1],D[R-1]),i.strokeStyle=T,i.lineWidth=2*c,i.lineJoin="round",i.stroke()}function K(){const w=a.width,E=a.height,S=b(),c=U("--accent","#0284c7");let P;r||!s||!g?(d||(d=new Uint8Array(1024)),G(d),P=d):(s.getByteTimeDomainData(g),P=g);const T=()=>{i.beginPath();for(let R=0;R<=w;R+=2){const O=Math.min(P.length-1,Math.floor(R/w*P.length)),D=P[O]/255*E;R===0?i.moveTo(R,D):i.lineTo(R,D)}};T(),i.strokeStyle=c,i.globalAlpha=.16,i.lineWidth=6*S,i.lineJoin="round",i.stroke(),T(),i.globalAlpha=1,i.lineWidth=1.8*S,i.stroke()}function nt(){const w=a.width,E=a.height;if(!w||!E)return;if(i.clearRect(0,0,w,E),m==="wave"){K();return}const c=N(m==="bars"?16:m==="thin"?56:m==="line"?64:24);m==="bars"?W(c,w,E,.34):m==="thin"?W(c,w,E,.32):m==="line"?it(c,w,E):m==="mirror"&&Y(c,w,E)}function lt(){x=requestAnimationFrame(lt),nt()}function gt(){x||lt()}function ct(w,E=!1){var S;if(m=w,v=[],localStorage.setItem("melo-viz-mode",w),!E){const c=window.__TOAST__,P=(S=Rt.find(T=>T.id===w))==null?void 0:S.label;c&&P&&c(`Visualizer: ${P}`)}}function ft(){return C||(C=document.createElement("div"),C.className="viz-menu",C.style.display="none",document.body.appendChild(C),C)}function Bt(){const w=ft();w.innerHTML='<div class="viz-menu-label">Visualizer type</div>'+Rt.map(E=>`<button class="viz-menu-item ${E.id===m?"active":""}" data-mode="${E.id}">${E.id===m?"✓":""}<span>${E.label}</span></button>`).join(""),w.querySelectorAll("[data-mode]").forEach(E=>{E.addEventListener("click",S=>{S.stopPropagation(),ct(E.dataset.mode),vt()})})}function Et(w,E){Bt();const S=C;S.style.display="block";const c=S.getBoundingClientRect();S.style.left=Math.max(8,Math.min(w,window.innerWidth-c.width-8))+"px",S.style.top=Math.max(8,Math.min(E,window.innerHeight-c.height-8))+"px"}function vt(){C&&(C.style.display="none")}function yt(){e&&(e.title="Click: next mode • Right-click: choose mode",e.addEventListener("click",()=>{vt();const w=Rt.findIndex(E=>E.id===m);ct(Rt[(w+1)%Rt.length].id)}),e.addEventListener("contextmenu",w=>{w.preventDefault(),w.stopPropagation(),Et(w.clientX,w.clientY)}))}document.addEventListener("click",w=>{C&&C.style.display!=="none"&&!C.contains(w.target)&&vt()}),document.addEventListener("keydown",w=>{w.key==="Escape"&&vt()});function Z(){X(),gt(),(n==null?void 0:n.state)==="suspended"&&n.resume().catch(()=>{})}t.addEventListener("play",Z),Z(),yt(),document.addEventListener("visibilitychange",()=>{document.hidden?(cancelAnimationFrame(x),x=0):gt()});function bt(){cancelAnimationFrame(x),x=0,e=document.getElementById("vizBars"),e&&(a=$(e),i=a.getContext("2d"),new ResizeObserver(_).observe(a),_(),yt(),gt())}window.__LUMI_REBIND_VISUALIZER__=bt}function ue(t){if(!t||!t.trim())return{isSynced:!1,lines:[],raw:""};const e=[],a=t.split(/\r?\n/),i=/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;let n=!1;for(const s of a){const l=s.trim();if(!l||/^\[[a-z]{2,8}:/i.test(l))continue;const g=[...l.matchAll(i)];if(g.length>0){n=!0;const d=l.replace(i,"").trim();for(const r of g){const m=parseInt(r[1],10),x=parseInt(r[2],10),v=r[3]||"0",M=v.length===2?parseInt(v,10)*10:v.length===1?parseInt(v,10)*100:parseInt(v.slice(0,3),10),C=m*60+x+M/1e3;e.push({time:C,text:d})}}else e.push({time:-1,text:l})}return e.sort((s,l)=>s.time-l.time),{isSynced:n,lines:e,raw:t}}function me(t,e){const a=document.getElementById("lyricsContainer"),i=document.getElementById("lyricsStatus"),n=document.getElementById("lyricsTrackTitle");let s={isSynced:!1,lines:[]},l=-1;async function g(v){if(v.lyrics&&v.lyrics.trim().length>0)return v.lyrics;if(window.__TAURI__)try{const{invoke:M}=await F(async()=>{const{invoke:$}=await import("./core-DhEqZVGG.js");return{invoke:$}},[]),C=await M("get_track_lyrics",{path:v.path});if(C)return C}catch{}return null}async function d(v){if(!v){s={isSynced:!1,lines:[],raw:""},r();return}v.id,n&&(n.textContent=`${v.title} — ${v.artist}`);const M=await g(v);s=ue(M||""),r()}function r(){if(a){if(a.innerHTML="",l=-1,!s.lines.length){i&&(i.style.display="block",i.innerHTML='No synced lyrics found (.lrc)<br/><span style="font-size:10.5px; opacity:0.7;">Place a matching .lrc file in the song folder or add lyrics in the tag editor.</span>');return}i&&(i.style.display="none"),s.lines.forEach((v,M)=>{const C=document.createElement("div");C.className="lyric-line",C.dataset.idx=String(M),C.dataset.time=String(v.time),C.textContent=v.text||"♪",v.time>=0&&(C.style.cursor="pointer",C.title=`Seek to ${Math.floor(v.time/60)}:${Math.floor(v.time%60).toString().padStart(2,"0")}`,C.addEventListener("click",()=>{t.currentTime=v.time,t.play().catch(()=>{})})),a.appendChild(C)})}}function m(){if(!a||!s.isSynced||!s.lines.length)return;const v=t.currentTime;let M=-1;for(let C=0;C<s.lines.length&&s.lines[C].time<=v;C++)M=C;if(M!==l){l=M;const C=a.querySelectorAll(".lyric-line");if(C.forEach(($,X)=>{$.classList.toggle("active",X===l),$.classList.toggle("passed",X<l)}),l>=0&&C[l]){const $=C[l],X=a.clientHeight,q=$.offsetTop-a.offsetTop-X/2+$.clientHeight/2;a.scrollTo({top:Math.max(0,q),behavior:"smooth"})}}}t.addEventListener("timeupdate",m),window.addEventListener("lumi:trackChange",v=>{d(v.detail)}),at("melo:track-changed",v=>{d(v)});const x=window.__LUMI_QUEUE__;Array.isArray(x)&&x.length>0&&d(x[0]),window.LumiLyrics={loadTrackLyrics:d,parseLRC:ue}}let St=null;const ge=`<!doctype html>
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
</html>`,he={"compact-pill-light.html":ge,"compact-pill-dark.html":ve,"compact-pill-light":ge,"compact-pill-dark":ve},Ye=[{id:"compact-pill-light",name:"Minimal Compact (Light)",filename:"compact-pill-light.html"},{id:"compact-pill-dark",name:"Minimal Compact (Dark)",filename:"compact-pill-dark.html"},{id:"full-html-example",name:"Full HTML Example",filename:"full-html-example.html"},{id:"example-custom",name:"Custom CSS Example",filename:"example-custom.html"}];function Be(t){const e=["trackTitle","btnPlay","seekBar","coverImg"];let a=0;for(const i of e)t.includes(i)&&a++;return a>=3}function qt(t,e){const a=document.getElementById("playerCard");if(!a)return;const i=a._originalHTML||a.innerHTML;a._originalHTML||(a._originalHTML=i),St&&(St.remove(),St=null);let s=[...t.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(x=>x[1]).join(`
`);s&&(St=document.createElement("style"),St.id="melo-custom-skin",St.textContent=s,document.head.appendChild(St));const l=Be(t);let g="";const d=t.match(/<body[^>]*>([\s\S]*?)<\/body>/i);d?g=d[1]:g=t.split(/<\/style>/i).pop()||"";const r=document.createElement("div");r.innerHTML=g;const m=r.querySelector("#lumi-player");if(m&&(g=m.innerHTML),l&&g.trim().length>20){const x=g.trim();a.innerHTML=x,e&&e("Skin applied"),setTimeout(()=>{var M,C;(M=window.__LUMI_REBIND__)==null||M.call(window);const v=window.__LUMI_AUDIO__;v&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(v),(C=window.__LUMI_REBIND_MAIN__)==null||C.call(window)},40)}else s&&e&&e("Skin CSS applied");localStorage.setItem("lumi-custom-skin",t),localStorage.setItem("lumi-custom-skin-isFull",l?"1":"0")}function jt(t,e=!0){St&&(St.remove(),St=null);const a=document.getElementById("playerCard");a&&a._originalHTML&&(a.innerHTML=a._originalHTML,setTimeout(()=>{var n,s;(n=window.__LUMI_REBIND__)==null||n.call(window);const i=window.__LUMI_AUDIO__;i&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(i),(s=window.__LUMI_REBIND_MAIN__)==null||s.call(window)},40)),localStorage.removeItem("lumi-custom-skin"),localStorage.removeItem("lumi-custom-skin-isFull"),localStorage.setItem("melo-active-skin-id","default"),e&&J("melo:skin-changed","default"),t&&t("Switched to Default Melo skin")}async function Pe(){if(_t)try{const{invoke:t}=await F(async()=>{const{invoke:a}=await import("./core-DhEqZVGG.js");return{invoke:a}},[]),e=await t("list_installed_skins");if(Array.isArray(e)&&e.length>0)return e}catch{}return Ye}async function ze(t,e){if(_t)try{const{invoke:i}=await F(async()=>{const{invoke:s}=await import("./core-DhEqZVGG.js");return{invoke:s}},[]),n=await i("read_skin_file",{filenameOrPath:t});if(n&&n.trim().length>0)return qt(n,e),!0}catch{}try{const i=t.startsWith("skins/")?t:`skins/${t}`,n=await fetch(i);if(n.ok){const s=await n.text();return qt(s,e),!0}}catch{}const a=t.replace(/^.*[\\/]/,"");return he[a]?(qt(he[a],e),!0):(e&&e(`Could not load skin: ${t}`),!1)}async function Mt(t,e,a,i=!0){if(t==="default"){jt(a,i);return}let n=t;t==="compact-pill"||t.startsWith("compact-pill")?n=e==="dark"?"compact-pill-dark.html":"compact-pill-light.html":!n.endsWith(".html")&&!n.endsWith(".htm")&&(n=n+".html"),await ze(n,a)&&(localStorage.setItem("melo-active-skin-id",t),i&&J("melo:skin-changed",t))}async function Re(t){if(_t)try{const{invoke:e}=await F(async()=>{const{invoke:a}=await import("./core-DhEqZVGG.js");return{invoke:a}},[]);await e("open_skins_folder"),t&&t("Opening skins folder...")}catch{t&&t("Could not open skins folder")}else t&&t("Skins are located in the skins/ folder")}function Je(t){const e=document.getElementById("skinUpload"),a=document.getElementById("linkDownloadExample");a&&a.addEventListener("click",s=>{s.preventDefault(),ze("compact-pill-light.html")});const i=localStorage.getItem("melo-active-skin-id")||"default",n=localStorage.getItem("lumi-theme")||"dark";i!=="default"&&setTimeout(()=>{Mt(i,n,void 0,!1)},150),at("melo:theme",s=>{const l=localStorage.getItem("melo-active-skin-id");l&&l!=="default"&&Mt(l,s,void 0,!1)}),at("melo:skin-changed",s=>{if(s&&typeof s=="string"){const l=localStorage.getItem("lumi-theme")||"dark";Mt(s,l,void 0,!1)}}),e&&e.addEventListener("change",async()=>{var d;const s=(d=e.files)==null?void 0:d[0];if(!s)return;const l=await s.text(),g=s.name;if(_t)try{const{invoke:r}=await F(async()=>{const{invoke:m}=await import("./core-DhEqZVGG.js");return{invoke:m}},[]);await r("save_custom_skin_file",{filename:g,content:l}),t(`Saved ${g} to skins folder`)}catch{}qt(l,t),localStorage.setItem("melo-active-skin-id",g),J("melo:skin-changed",g),e.value=""}),document.addEventListener("dragover",s=>{var l;[...((l=s.dataTransfer)==null?void 0:l.types)||[]].includes("Files")&&s.preventDefault()}),document.addEventListener("drop",async s=>{var g;const l=[...((g=s.dataTransfer)==null?void 0:g.files)||[]].find(d=>d.name.endsWith(".html")||d.name.endsWith(".htm"));if(l){s.preventDefault();const d=await l.text();if(d.includes("<style")||d.includes("<html")||Be(d)){const r=l.name;if(_t)try{const{invoke:m}=await F(async()=>{const{invoke:x}=await import("./core-DhEqZVGG.js");return{invoke:x}},[]);await m("save_custom_skin_file",{filename:r,content:d})}catch{}qt(d,t),localStorage.setItem("melo-active-skin-id",r),J("melo:skin-changed",r)}}}),window.LumiSkin={applyCustomSkin:qt,resetSkin:jt,applySkinChoice:Mt,listInstalledSkins:Pe,openSkinsFolderOnDisk:Re}}const De=document.querySelector("#app");De.innerHTML=`
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
`;const Ct=!!window.__TAURI__,rt=new URLSearchParams(location.search).get("panel");var we,xe;if(Ct&&rt){F(async()=>{const{getCurrentWindow:i}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:i}},__vite__mapDeps([8,7,1,0])).then(({getCurrentWindow:i})=>{const n=i();Ke(n,"melo-geo-panel-"+rt),n.onCloseRequested(()=>{J("melo:panel-closed",rt)}),window.addEventListener("beforeunload",()=>{J("melo:panel-closed",rt)})});const t=document.getElementById("win-"+rt),e=((we=t==null?void 0:t.querySelector(".float-title"))==null?void 0:we.innerHTML)||"",a=((xe=t==null?void 0:t.querySelector(".float-body"))==null?void 0:xe.innerHTML)||"";De.innerHTML=`
<div class="panel-root">
  <div class="panel-titlebar">${e}</div>
  <div class="panel-body">${a}</div>
  <div id="toast" class="toast"></div>
</div>`}Ct&&!rt&&(document.documentElement.classList.add("tauri-main"),document.body.classList.add("tauri-main"),document.querySelectorAll(".side-actions .sbtn").forEach(t=>t.classList.remove("active")),F(async()=>{const{WebviewWindow:t}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:t}},__vite__mapDeps([6,7,1,0,8])).then(({WebviewWindow:t})=>{const e=async()=>{var a;for(const i of["library","playlist","equalizer","settings"])try{const n=await t.getByLabel("panel-"+i);(a=document.getElementById(Zt[i]))==null||a.classList.toggle("active",!!n)}catch{}};e(),setInterval(e,1200)}));Ct&&!rt&&(F(()=>import("./window-BWd3Cypy.js"),__vite__mapDeps([8,7,1,0])).then(async({getCurrentWindow:t})=>{const e=t(),a=()=>{const n=localStorage.getItem("melo-active-skin-id"),s=n==="compact-pill"||typeof n=="string"&&n.startsWith("compact-pill");return{w:s?780:960,h:s?138:240}};try{const n=JSON.parse(localStorage.getItem("melo-geo-main")||"null"),{LogicalPosition:s,LogicalSize:l}=await F(async()=>{const{LogicalPosition:d,LogicalSize:r}=await import("./dpi-fvP-W2qr.js");return{LogicalPosition:d,LogicalSize:r}},__vite__mapDeps([7,1])),g=a();await e.setSize(new l(n!=null&&n.w?Math.max(650,n.w):g.w,g.h)),(n==null?void 0:n.x)!=null&&(n==null?void 0:n.y)!=null&&await e.setPosition(new s(n.x,n.y))}catch{}const i=async()=>{try{const n=await e.outerPosition(),s=await e.innerSize(),l=a();localStorage.setItem("melo-geo-main",JSON.stringify({x:n.x,y:n.y,w:s.width,h:l.h}))}catch{}};e.onMoved(i),e.onResized(async()=>{try{const n=await e.innerSize(),s=a(),{LogicalSize:l}=await F(async()=>{const{LogicalSize:g}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:g}},__vite__mapDeps([7,1]));(n.width<650||n.height!==s.h)&&await e.setSize(new l(Math.max(650,n.width),s.h))}catch{}i()}),at("melo:skin-changed",async n=>{try{!rt&&n&&await Mt(n,ht,void 0,!1);const s=n==="compact-pill"||typeof n=="string"&&n.startsWith("compact-pill"),l=s?780:960,g=s?138:240,{LogicalSize:d}=await F(async()=>{const{LogicalSize:r}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:r}},__vite__mapDeps([7,1]));await e.setSize(new d(l,g)),i()}catch{}}),e.onCloseRequested(async n=>{n.preventDefault();const{WebviewWindow:s}=await F(async()=>{const{WebviewWindow:l}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:l}},__vite__mapDeps([6,7,1,0,8]));for(const l of["library","playlist","equalizer","settings"])try{const g=await s.getByLabel("panel-"+l);g&&await g.close()}catch{}try{await e.destroy()}catch{window.close()}})}),F(()=>import("./core-DhEqZVGG.js"),[]).then(async({invoke:t})=>{try{const e=await t("get_cli_tracks");if(Array.isArray(e)&&e.length>0){const a=window.LumiLibrary,i=window.LumiPlayer;e.forEach(n=>n.source="import"),a==null||a.addToCurrentPlaylist(e),e.forEach(n=>i==null?void 0:i.queue.push(n)),setTimeout(()=>{if(i&&i.queue.length>0){const n=i.queue.findIndex(s=>s.id===e[0].id);i.loadTrack(n>=0?n:0,!0)}},150)}}catch{}}),at("melo:open-files",t=>{if(Array.isArray(t)&&t.length>0){const e=window.LumiLibrary,a=window.LumiPlayer;t.forEach(i=>i.source="import"),e==null||e.addToCurrentPlaylist(t),t.forEach(i=>a==null?void 0:a.queue.push(i)),tt(`Playing ${t[0].title}`),setTimeout(()=>{if(a&&a.queue.length>0){const i=a.queue.findIndex(n=>n.id===t[0].id);a.loadTrack(i>=0?i:0,!0)}},150)}}));document.addEventListener("contextmenu",t=>{t.preventDefault()});const Ft=document.getElementById("toast"),tt=t=>{Ft&&(Ft.textContent=t,Ft.classList.add("show"),setTimeout(()=>Ft.classList.remove("show"),2200))},Lt=new Audio;Lt.preload="metadata";window.__LUMI_AUDIO__=Lt;window.__TOAST__=tt;let ht=localStorage.getItem("lumi-theme")||"dark";function Gt(t){document.documentElement.setAttribute("data-theme",t),localStorage.setItem("lumi-theme",t),ht=t}function Kt(t){Gt(t),J("melo:theme",t)}Gt(ht);at("melo:theme",t=>{(t==="light"||t==="dark")&&Gt(t)});setInterval(()=>{const t=localStorage.getItem("lumi-theme");(t==="light"||t==="dark")&&t!==ht&&Gt(t)},1e3);const Xe=["win-library","win-playlist","win-equalizer","win-lyrics","win-settings"],Wt=document.getElementById("desktop"),qe={btnToggleLibrary:"win-library",btnTogglePlaylist:"win-playlist",btnToggleEq:"win-equalizer",btnToggleLyrics:"win-lyrics",btnOpenSettings:"win-settings",menuToggleLibrary:"win-library",menuTogglePlaylist:"win-playlist",menuToggleEq:"win-equalizer",menuToggleLyrics:"win-lyrics",menuToggleSettings:"win-settings"};function Qe(t){const e=document.getElementById(t);return!!e&&!e.classList.contains("hidden")}const Zt={library:"btnToggleLibrary",playlist:"btnTogglePlaylist",equalizer:"btnToggleEq",lyrics:"btnToggleLyrics",settings:"btnOpenSettings"};async function Ke(t,e){const a=async()=>{try{const i=await t.outerPosition(),n=await t.outerSize();localStorage.setItem(e,JSON.stringify({x:i.x,y:i.y,w:n.width,h:n.height}))}catch{}};t.onMoved(a),t.onResized(a)}async function Ze(t){const{WebviewWindow:e}=await F(async()=>{const{WebviewWindow:m}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:m}},__vite__mapDeps([6,7,1,0,8])),a="panel-"+t,i=document.getElementById(Zt[t]),n=await e.getByLabel(a);if(n){await n.close(),i==null||i.classList.remove("active");return}const s={library:[430,620],playlist:[440,560],equalizer:[700,440],lyrics:[380,520],settings:[600,540]},l={library:[360,400],playlist:[360,360],equalizer:[620,400],lyrics:[320,360],settings:[500,400]},g={library:"Library",playlist:"Playlist",equalizer:"Equalizer",lyrics:"Synced Lyrics",settings:"Settings"},d=s[t]||[420,520];let r=null;try{r=JSON.parse(localStorage.getItem("melo-geo-panel-"+t)||"null")}catch{}new e(a,{url:`/?panel=${t}`,title:g[t]||t,width:(r==null?void 0:r.w)||d[0],height:(r==null?void 0:r.h)||d[1],minWidth:(l[t]||[360,360])[0],minHeight:(l[t]||[360,360])[1],...(r==null?void 0:r.x)!=null?{x:r.x,y:r.y}:{center:!0},decorations:!0,skipTaskbar:!0}),i==null||i.classList.add("active"),J("melo:theme",ht)}at("melo:panel-closed",t=>{var a;const e=Zt[t];e&&((a=document.getElementById(e))==null||a.classList.remove("active"))});function te(t){if(Ct){Ze(t.replace(/^win-/,""));return}const e=Qe(t);Vt(t,!e),e||Yt(document.getElementById(t))}function ti(t){if(t.classList.contains("hidden")||!Wt||window.matchMedia("(max-width: 860px)").matches)return;const e=Wt.getBoundingClientRect();if(e.width<=0||e.height<=0)return;const a=t.getBoundingClientRect(),i=Math.min(a.width,e.width),n=Math.min(a.height,e.height);let s=a.left-e.left,l=a.top-e.top;s=Math.max(0,Math.min(e.width-i,s)),l=Math.max(0,Math.min(e.height-n,l)),t.style.left=s+"px",t.style.top=l+"px",t.style.right="auto",t.style.bottom="auto",t.style.transform="none"}function Vt(t,e){var n,s,l,g,d,r,m,x,v,M;const a=document.getElementById(t);if(!a)return;a.classList.toggle("hidden",!e),localStorage.setItem("lumiv2-"+t,e?"1":"0"),e&&ti(a);const i=e;t==="win-library"&&((n=document.getElementById("btnToggleLibrary"))==null||n.classList.toggle("active",i),(s=document.getElementById("menuToggleLibrary"))==null||s.classList.toggle("active",i)),t==="win-playlist"&&((l=document.getElementById("btnTogglePlaylist"))==null||l.classList.toggle("active",i),(g=document.getElementById("menuTogglePlaylist"))==null||g.classList.toggle("active",i)),t==="win-equalizer"&&((d=document.getElementById("btnToggleEq"))==null||d.classList.toggle("active",i),(r=document.getElementById("menuToggleEq"))==null||r.classList.toggle("active",i)),t==="win-lyrics"&&((m=document.getElementById("btnToggleLyrics"))==null||m.classList.toggle("active",i),(x=document.getElementById("menuToggleLyrics"))==null||x.classList.toggle("active",i)),t==="win-settings"&&((v=document.getElementById("btnOpenSettings"))==null||v.classList.toggle("active",i),(M=document.getElementById("menuToggleSettings"))==null||M.classList.toggle("active",i))}rt||Xe.forEach(t=>{const e=localStorage.getItem("lumiv2-"+t);e!==null?Vt(t,e==="1"):t==="win-settings"?Vt(t,!1):Vt(t,!0)});Object.entries(qe).forEach(([t,e])=>{var a;(a=document.getElementById(t))==null||a.addEventListener("click",()=>te(e))});document.querySelectorAll("[data-close]").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.close;Vt(e,!1)})});let mt=null,kt=null,fe=10;function Yt(t){fe++,t.style.zIndex=String(fe),document.querySelectorAll(".float-win").forEach(e=>e.classList.remove("active")),t.classList.add("active")}document.querySelectorAll(".float-win").forEach(t=>{t.addEventListener("mousedown",()=>Yt(t))});document.querySelectorAll("[data-drag]").forEach(t=>{t.addEventListener("mousedown",e=>{if(e.target.closest("button")||e.target.closest("input")||e.target.closest("select"))return;const a=t.dataset.drag,i=document.getElementById(a);Yt(i),i.classList.add("dragging");const n=i.getBoundingClientRect();mt={id:a,startX:e.clientX,startY:e.clientY,initX:n.left,initY:n.top,width:n.width,height:n.height}})});document.querySelectorAll("[data-resize]").forEach(t=>{t.addEventListener("mousedown",e=>{e.stopPropagation();const a=t.dataset.resize,i=document.getElementById(a);Yt(i),i.classList.add("resizing");const n=i.getBoundingClientRect();kt={id:a,startX:e.clientX,startY:e.clientY,initW:n.width,initH:n.height}})});window.addEventListener("mousemove",t=>{if(mt){const e=document.getElementById(mt.id);let a=t.clientX-mt.startX,i=t.clientY-mt.startY,n=mt.initX+a,s=mt.initY+i;if(Wt&&!window.matchMedia("(max-width: 860px)").matches){const l=Wt.getBoundingClientRect(),g=l.left,d=l.right-mt.width,r=l.top,m=l.bottom-mt.height;n=Math.max(g,Math.min(d,n))-l.left,s=Math.max(r,Math.min(m,s))-l.top}e.style.left=n+"px",e.style.top=s+"px",e.style.right="auto",e.style.bottom="auto",e.style.transform="none"}if(kt){const e=document.getElementById(kt.id);let a=kt.initW+(t.clientX-kt.startX),i=kt.initH+(t.clientY-kt.startY);a=Math.max(260,a),i=Math.max(160,i),e.style.width=a+"px",e.style.height=i+"px"}});window.addEventListener("mouseup",()=>{if(mt){const t=document.getElementById(mt.id);t&&(t.classList.remove("dragging"),localStorage.setItem("lumiv2-pos-"+mt.id,JSON.stringify({left:t.style.left,top:t.style.top}))),mt=null}if(kt){const t=document.getElementById(kt.id);t&&(t.classList.remove("resizing"),localStorage.setItem("lumiv2-size-"+kt.id,JSON.stringify({width:t.style.width,height:t.style.height}))),kt=null}});let pt=document.getElementById("appMenuBtn"),H=document.getElementById("appMenu");function ei(){const t=H==null?void 0:H.classList.toggle("open");pt==null||pt.classList.toggle("open",!!t)}pt==null||pt.addEventListener("click",t=>{t.stopPropagation(),ei()});document.addEventListener("click",t=>{H&&!H.contains(t.target)&&t.target!==pt&&(H.classList.remove("open"),pt==null||pt.classList.remove("open"))});document.addEventListener("keydown",t=>{t.key==="Escape"&&(H==null||H.classList.remove("open"),pt==null||pt.classList.remove("open"))});var ke;(ke=document.getElementById("menuCustomSkin"))==null||ke.addEventListener("click",()=>{var t;(t=document.getElementById("skinUpload"))==null||t.click(),H==null||H.classList.remove("open")});var Ee;(Ee=document.getElementById("menuSkinDefault"))==null||Ee.addEventListener("click",()=>{jt(tt);const t=document.getElementById("skinSelect");t&&(t.value="default"),H==null||H.classList.remove("open")});var Le;(Le=document.getElementById("menuSkinCompact"))==null||Le.addEventListener("click",()=>{Mt("compact-pill",ht,tt);const t=document.getElementById("skinSelect");t&&(t.value="compact-pill"),H==null||H.classList.remove("open")});var Se;(Se=document.getElementById("menuThemeToggle"))==null||Se.addEventListener("click",()=>{Kt(ht==="light"?"dark":"light"),H==null||H.classList.remove("open")});var Ie;(Ie=document.getElementById("menuAbout"))==null||Ie.addEventListener("click",()=>{tt("Melo 0.2 Beta — Tauri 2 + TypeScript + Rust"),H==null||H.classList.remove("open")});const ee=typeof window.__TAURI_INTERNALS__<"u"||typeof window.__TAURI__<"u";async function Oe(){const t=window.LumiLibrary,e=window.LumiPlayer;if(ee){try{const{open:i}=await F(async()=>{const{open:d}=await import("./index-CS3Qnt9j.js");return{open:d}},__vite__mapDeps([5,1])),n=await i({multiple:!0,filters:[{name:"Audio",extensions:["mp3","flac","wav","aac","ogg","m4a","alac","opus","wma","aiff"]}]});if(!n)return;const s=Array.isArray(n)?n:[n],{invoke:l}=await F(async()=>{const{invoke:d}=await import("./core-DhEqZVGG.js");return{invoke:d}},[]),g=[];for(const d of s)try{const r=await l("scan_library",{path:d});if(r&&r.length)r.forEach(m=>m.source="import"),g.push(...r);else{const m=d.replace(/^.*[\\/]/,""),x=m.lastIndexOf("."),v=x>0?m.slice(0,x):m,M=x>0?m.slice(x+1).toUpperCase():"AUDIO";g.push({id:d,title:v,artist:"Unknown Artist",album:"Single",duration:0,path:d,codec:M,specs:"Local File",source:"import"})}}catch{const r=d.replace(/^.*[\\/]/,""),m=r.lastIndexOf("."),x=m>0?r.slice(0,m):r,v=m>0?r.slice(m+1).toUpperCase():"AUDIO";g.push({id:d,title:x,artist:"Unknown Artist",album:"Single",duration:0,path:d,codec:v,specs:"Local File",source:"import"})}t==null||t.addTracks(g,!0),t==null||t.addToCurrentPlaylist(g),g.forEach(d=>e==null?void 0:e.queue.push(d)),J("melo:play-tracks",{tracks:g,index:0}),tt(`${g.length} file(s) added`)}catch{tt("Error opening files")}H==null||H.classList.remove("open");return}const a=document.createElement("input");a.type="file",a.multiple=!0,a.accept="audio/*,.mp3,.flac,.wav,.aac,.ogg,.m4a,.alac,.opus,.wma,.aiff",a.onchange=async()=>{const i=Array.from(a.files||[]);if(!i.length)return;const n=[];for(const s of i){const l=s.path,g=l||URL.createObjectURL(s),d=s.name,r=d.lastIndexOf("."),m=r>0?d.slice(0,r):d,x=r>0?d.slice(r+1).toUpperCase():"AUDIO",v={id:l||"imp_"+Math.random().toString(36).slice(2,9),title:m,artist:"Unknown Artist",album:"Single",duration:0,path:g,codec:x,specs:"Local File",source:"import"};await Ht(s,v),n.push(v)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(s=>e==null?void 0:e.queue.push(s)),J("melo:play-tracks",{tracks:n,index:0}),tt(`${n.length} file(s) added`)},a.click(),H==null||H.classList.remove("open")}async function $e(){const t=window.LumiLibrary,e=window.LumiPlayer;if(ee){try{const{open:i}=await F(async()=>{const{open:r}=await import("./index-CS3Qnt9j.js");return{open:r}},__vite__mapDeps([5,1])),n=await i({directory:!0});if(!n)return;const s=n,{invoke:l}=await F(async()=>{const{invoke:r}=await import("./core-DhEqZVGG.js");return{invoke:r}},[]),d=(await l("scan_library",{path:s})).map(r=>({...r,source:"import"}));t==null||t.addTracks(d,!0),t==null||t.addToCurrentPlaylist(d),d.forEach(r=>e==null?void 0:e.queue.push(r)),J("melo:play-tracks",{tracks:d,index:0}),tt(`${d.length} track(s) added from folder`)}catch{tt("Error scanning folder")}H==null||H.classList.remove("open");return}const a=document.createElement("input");a.type="file",a.webkitdirectory=!0,a.multiple=!0,a.accept="audio/*",a.onchange=async()=>{const i=Array.from(a.files||[]).filter(s=>/\.(mp3|flac|wav|aac|ogg|m4a|alac|opus|wma|aiff)$/i.test(s.name));if(!i.length)return;const n=[];for(const s of i){const l=s.path,g=l||URL.createObjectURL(s),d=s.name,r=d.lastIndexOf("."),m=r>0?d.slice(0,r):d,x=r>0?d.slice(r+1).toUpperCase():"AUDIO",v={id:l||"imp_"+Math.random().toString(36).slice(2,9),title:m,artist:"Unknown Artist",album:"Folder Import",duration:0,path:g,codec:x,specs:"Local File",source:"import"};await Ht(s,v),n.push(v)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(s=>e==null?void 0:e.queue.push(s)),J("melo:play-tracks",{tracks:n,index:0}),tt(`${n.length} file(s) added from folder`)},a.click(),H==null||H.classList.remove("open")}var Me;(Me=document.getElementById("btnAddFiles"))==null||Me.addEventListener("click",Oe);var _e;(_e=document.getElementById("btnAddFolder"))==null||_e.addEventListener("click",$e);var Te;(Te=document.getElementById("btnThemeToggle"))==null||Te.addEventListener("click",()=>{Kt(ht==="light"?"dark":"light")});window.addEventListener("keydown",t=>{(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="o"&&(t.shiftKey?(t.preventDefault(),$e()):(t.preventDefault(),Oe())),((t.ctrlKey||t.metaKey)&&t.key===","||t.key==="F2")&&(t.preventDefault(),te("win-settings"))});function ye(t){var C,$,X;function e(B){document.querySelectorAll(".settings-tab").forEach(q=>{q.classList.toggle("active",q.dataset.stab===B)}),document.querySelectorAll(".settings-section[data-panel]").forEach(q=>{q.classList.toggle("active",q.dataset.panel===B)}),localStorage.setItem("melo-settings-tab",B)}document.querySelectorAll(".settings-tab").forEach(B=>{B.addEventListener("click",()=>e(B.dataset.stab))}),e(localStorage.getItem("melo-settings-tab")||"general"),document.querySelectorAll(".switch[data-key]").forEach(B=>{const q=B.dataset.key,G=localStorage.getItem("melo-pref-"+q);G!==null&&B.classList.toggle("on",G==="1"),B.onclick=()=>{B.classList.toggle("on");const N=B.classList.contains("on");localStorage.setItem("melo-pref-"+q,N?"1":"0"),t(N?"Enabled":"Disabled"),J("melo:pref-changed",{key:q,value:N})}});const a=document.getElementById("setCrossfade"),i=document.getElementById("crossfadeVal");if(a){const B=localStorage.getItem("melo-pref-crossfade")||"0";a.value=B,i&&(i.textContent=B+"s"),a.oninput=()=>{const q=a.value;i&&(i.textContent=q+"s"),localStorage.setItem("melo-pref-crossfade",q)}}const n=document.getElementById("setLanguage");if(n){const B=localStorage.getItem("melo-pref-lang")||"en";n.value=B,n.onchange=()=>{localStorage.setItem("melo-pref-lang",n.value),t(`Language set to ${n.options[n.selectedIndex].text}`)}}const s=document.getElementById("swDynamicTheme");if(s){const B=localStorage.getItem("melo-dynamic-theme")!=="0";s.classList.toggle("on",B),s.onclick=()=>{var U,b;const q=!s.classList.contains("on");s.classList.toggle("on",q),localStorage.setItem("melo-dynamic-theme",q?"1":"0");const G=window.__LUMI_QUEUE__,N=(b=(U=window.LumiPlayer)==null?void 0:U.currentIndex)!=null?b:0;G&&G[N]&&Ce(q?G[N].cover:null),t(q?"Dynamic theme enabled":"Dynamic theme disabled")}}const l=document.getElementById("skinSelect"),g=document.getElementById("btnSkinThemeToggle"),d=document.getElementById("btnRefreshSkins"),r=document.getElementById("btnOpenSkinsFolder"),m=document.getElementById("skinThemeIcon"),x=document.getElementById("skinThemeLabel");function v(B){m&&(m.textContent=B==="dark"?"🌙":"☀️"),x&&(x.textContent=B==="dark"?"Dark":"Light")}v(ht),g==null||g.addEventListener("click",()=>{const B=ht==="dark"?"light":"dark";Kt(B),v(B),t(B==="dark"?"Dark theme":"Light theme")}),at("melo:theme",B=>{(B==="light"||B==="dark")&&v(B)});async function M(){if(!l)return;const B=localStorage.getItem("melo-active-skin-id")||"default",q=await Pe();l.innerHTML=`
      <option value="default">Default Melo (Standard)</option>
      <option value="compact-pill">Minimal Compact (Pill Bar)</option>
    `,q.forEach(G=>{if(G.filename!=="compact-pill-light.html"&&G.filename!=="compact-pill-dark.html"){const N=document.createElement("option");N.value=G.filename,N.textContent=`${G.name} (${G.filename})`,l.appendChild(N)}}),l.value=B}M(),l&&(l.onchange=()=>{const B=l.value;Mt(B,ht,t)}),d==null||d.addEventListener("click",async()=>{await M();const B=localStorage.getItem("melo-active-skin-id")||"default";Mt(B,ht,t),t("Skins reloaded from disk")}),r==null||r.addEventListener("click",()=>{Re(t)}),(C=document.getElementById("btn-reset-skin-settings"))==null||C.addEventListener("click",()=>{jt(t),l&&(l.value="default")}),($=document.getElementById("btn-settings-reset"))==null||$.addEventListener("click",()=>{localStorage.clear(),t("Settings reset — reloading..."),setTimeout(()=>location.reload(),600)}),(X=document.getElementById("btnChooseFolder"))==null||X.addEventListener("click",async()=>{if(ee)try{const{open:B}=await F(async()=>{const{open:G}=await import("./index-CS3Qnt9j.js");return{open:G}},__vite__mapDeps([5,1])),q=await B({directory:!0});q&&(document.getElementById("setMusicFolder").value=q,localStorage.setItem("melo-pref-music-folder",q),t("Music folder updated"))}catch{}else t("Folder selection dialog requires Tauri build")})}function Ue(){document.querySelectorAll(".win-btn").forEach(t=>{t.onclick=async()=>{const e=t.getAttribute("aria-label");if(window.__TAURI__){const{getCurrentWindow:a}=await F(async()=>{const{getCurrentWindow:n}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:n}},__vite__mapDeps([8,7,1,0])),i=a();e==="minimize"?i.minimize():e==="maximize"?i.toggleMaximize():e==="close"&&i.close()}else e==="close"&&tt("Window close requires the Tauri desktop build"),e==="maximize"&&tt("Resize: drag corner handle")}})}Ue();window.__LUMI_REBIND_MAIN__=()=>{const t=document.getElementById("appMenuBtn"),e=document.getElementById("appMenu");t&&e&&(pt=t,H=e,t.onclick=a=>{a.stopPropagation(),e.classList.toggle("open"),t.classList.toggle("open",e.classList.contains("open"))}),Ue(),Object.entries(qe).forEach(([a,i])=>{const n=document.getElementById(a);n&&(n.onclick=()=>te(i))})};const Dt=document.createElement("div");Dt.id="scanBar";document.body.appendChild(Dt);let be=0;at("melo:scan-progress",t=>{if(!t)return;const e=t.total?Math.round(t.done/t.total*100):100;Dt.style.opacity="1",Dt.style.width=e+"%",clearTimeout(be),(t.finished||t.total&&t.done>=t.total)&&(be=setTimeout(()=>{Dt.style.opacity="0",Dt.style.width="0"},800))});Ct&&!rt&&at("melo:scan-batch",t=>{const e=window.LumiLibrary;e&&Array.isArray(t)&&t.length&&(t.forEach(a=>a.source="scan"),e.addTracks(t,!0),e.addToCurrentPlaylist(t))});const At=document.createElement("div");At.id="aboutPop";At.style.display="none";document.body.appendChild(At);var Ae;(Ae=document.getElementById("btnAbout"))==null||Ae.addEventListener("click",t=>{var e;t.stopPropagation(),At.innerHTML=`
    <div class="about-head">Melo <b>0.3 Beta</b></div>
    <div style="font-size:11.5px; color:var(--text-soft); margin:6px 0 10px;">
      Modern Windows Music Player<br/>
      Tauri 2 + TypeScript + Rust
    </div>
    <a class="about-link" id="aboutLink" href="https://github.com/Arvanta/Melo" rel="noopener">github.com/Arvanta/Melo ↗</a>`,At.style.display=At.style.display==="none"?"block":"none",(e=document.getElementById("aboutLink"))==null||e.addEventListener("click",a=>{a.preventDefault();const i="https://github.com/Arvanta/Melo";Ct?F(()=>import("./core-DhEqZVGG.js"),[]).then(n=>n.invoke("open_url",{url:i})).catch(()=>window.open(i,"_blank")):window.open(i,"_blank")})});document.addEventListener("click",t=>{!t.target.closest("#aboutPop")&&!t.target.closest("#btnAbout")&&(At.style.display="none")});Ct&&rt?rt==="library"||rt==="playlist"?de(Lt,tt):rt==="equalizer"?pe(Lt,tt,{remote:!0}):rt==="lyrics"?me(Lt):rt==="settings"&&ye(tt):(je(Lt,tt),de(Lt,tt),pe(Lt,tt),Ge(Lt),me(Lt),Je(tt),ye(tt));tt("Melo 0.3 Beta is ready");
