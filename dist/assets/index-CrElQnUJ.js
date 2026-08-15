const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/event-CNdo2oXa.js","assets/core-DhEqZVGG.js","assets/index-DiyoAAdc.js","assets/index-CHth0gh2.js","assets/index-Bq0iOnRE.js","assets/index-CS3Qnt9j.js","assets/webviewWindow-mjQkSB26.js","assets/dpi-fvP-W2qr.js","assets/window-BWd3Cypy.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();const Ue="modulepreload",$e=function(t){return"/"+t},se={},W=function(e,a,i){let n=Promise.resolve();if(a&&a.length>0){let l=function(r){return Promise.all(r.map(m=>Promise.resolve(m).then(x=>({status:"fulfilled",value:x}),x=>({status:"rejected",reason:x}))))};document.getElementsByTagName("link");const g=document.querySelector("meta[property=csp-nonce]"),p=(g==null?void 0:g.nonce)||(g==null?void 0:g.getAttribute("nonce"));n=l(a.map(r=>{if(r=$e(r),r in se)return;se[r]=!0;const m=r.endsWith(".css"),x=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${x}`))return;const h=document.createElement("link");if(h.rel=m?"stylesheet":Ue,m||(h.as="script"),h.crossOrigin="",h.href=r,p&&h.setAttribute("nonce",p),document.head.appendChild(h),m)return new Promise((M,B)=>{h.addEventListener("load",M),h.addEventListener("error",()=>B(new Error(`Unable to preload CSS for ${r}`)))})}))}function s(l){const g=new Event("vite:preloadError",{cancelable:!0});if(g.payload=l,window.dispatchEvent(g),!g.defaultPrevented)throw l}return n.then(l=>{for(const g of l||[])g.status==="rejected"&&s(g.reason);return e().catch(s)})},at=typeof window.__TAURI_INTERNALS__<"u"||typeof window.__TAURI__<"u";async function Y(t,e){if(at)try{const{emit:a}=await W(async()=>{const{emit:i}=await import("./event-CNdo2oXa.js");return{emit:i}},__vite__mapDeps([0,1]));await a(t,e);return}catch{}window.dispatchEvent(new CustomEvent(t,{detail:e}))}function rt(t,e){at&&W(async()=>{const{listen:a}=await import("./event-CNdo2oXa.js");return{listen:a}},__vite__mapDeps([0,1])).then(({listen:a})=>{a(t,i=>{e(i.payload)})}).catch(()=>{}),window.addEventListener(t,a=>e(a.detail))}let le=!1;async function He(){if(!le){le=!0;try{const t=globalThis;if(typeof t.Buffer>"u"){const e=await W(()=>import("./index-DiyoAAdc.js").then(a=>a.i),__vite__mapDeps([2,3]));t.Buffer=e.Buffer}typeof t.process>"u"&&(t.process={env:{},browser:!0,nextTick:e=>setTimeout(e,0)})}catch{}}}async function Ve(t,e){var a;try{await He();const i=await W(()=>import("./index-Bq0iOnRE.js").then(r=>r.i),__vite__mapDeps([4,3])),n=i&&typeof i.parseBlob=="function"?i:i.default||i,s=await Promise.race([n.parseBlob(t),new Promise((r,m)=>setTimeout(()=>m(new Error("timeout")),1800))]),l=s==null?void 0:s.common;if(!l)return;l.title&&(e.title=l.title),l.artist?e.artist=l.artist:l.artists&&l.artists[0]&&(e.artist=l.artists[0]),l.album&&(e.album=l.album),l.genre&&l.genre[0]&&(e.genre=l.genre[0]),l.year&&(e.year=l.year);const g=(a=l.picture)==null?void 0:a[0];if(g&&g.data){const r=g.format||"image/jpeg",m=g.data;if(m.length>6e5)return;let x="";const h=8192;for(let M=0;M<m.length;M+=h){const B=m.subarray(M,M+h);x+=String.fromCharCode.apply(null,B)}e.cover=`data:${r};base64,${btoa(x)}`}const p=s==null?void 0:s.format;p&&p.duration&&!e.duration&&(e.duration=Math.floor(p.duration))}catch{}}async function $t(t,e,a=1800){return await Ve(t,e),e}async function Fe(t){return new Promise(e=>{if(!t)return e(null);const a=new Image;a.crossOrigin="anonymous",a.onload=()=>{try{const i=document.createElement("canvas"),n=i.getContext("2d");if(!n)return e(null);i.width=40,i.height=40,n.drawImage(a,0,0,40,40);const s=n.getImageData(0,0,40,40).data;let l={r:42,g:123,b:214},g=-1;for(let p=0;p<s.length;p+=4){const r=s[p],m=s[p+1],x=s[p+2];if(s[p+3]<128)continue;const M=Math.max(r,m,x),B=Math.min(r,m,x),O=(M+B)/510,X=M-B,P=X===0?0:X/(1-Math.abs(2*O-1));if(P>.25&&O>.25&&O<.82){const q=P*1.5+(1-Math.abs(O-.5));q>g&&(g=q,l={r,g:m,b:x})}}g>0?e(l):e(null)}catch{e(null)}},a.onerror=()=>e(null),a.src=t})}async function Te(t){const e=localStorage.getItem("melo-dynamic-theme")!=="0",a=document.documentElement;if(!e||!t){a.style.removeProperty("--accent"),a.style.removeProperty("--visualizer"),a.style.removeProperty("--accent-glow");return}const i=await Fe(t);if(i){const n=`rgb(${i.r}, ${i.g}, ${i.b})`;a.style.setProperty("--accent",n),a.style.setProperty("--visualizer",n),a.style.setProperty("--accent-glow",`rgba(${i.r}, ${i.g}, ${i.b}, 0.35)`)}else a.style.removeProperty("--accent"),a.style.removeProperty("--visualizer"),a.style.removeProperty("--accent-glow")}const Ot=[31,62,125,250,500,1e3,2e3,4e3,8e3,16e3];let kt=null,Jt=null,Xt=[],qt=null,Bt=null;function Nt(t){if(!kt){const e=window.AudioContext||window.webkitAudioContext;kt=new e;try{Jt=kt.createMediaElementSource(t)}catch{}if(Xt=Ot.map(a=>{const i=kt.createBiquadFilter();return i.type="peaking",i.frequency.value=a,i.Q.value=1.4,i.gain.value=0,i}),qt=kt.createGain(),qt.gain.value=1,Bt=kt.createAnalyser(),Bt.fftSize=2048,Bt.smoothingTimeConstant=.72,Jt){let a=Jt;for(const i of Xt)a.connect(i),a=i;a.connect(qt),qt.connect(Bt),Bt.connect(kt.destination)}}return{ctx:kt,filters:Xt,gain:qt,analyser:Bt,async resume(){kt&&kt.state==="suspended"&&await kt.resume().catch(()=>{})}}}function Ne(t,e){let a,i,n,s,l,g,p,r=null,m,x,h,M,B,O,X,P,q,G,F,$,b,S=[],C=0,j=!1,J="off",it=!1;window.__LUMI_QUEUE__=S,window.__LUMI_SET_QUEUE__=c=>{S=c,window.__LUMI_QUEUE__=c};function K(c){if(!isFinite(c))return"0:00";const A=Math.floor(c/60),T=Math.floor(c%60).toString().padStart(2,"0");return`${A}:${T}`}function nt(){if(!m)return;const c=parseFloat(m.max)||100,A=parseFloat(m.value)||0,T=c>0?A/c*100:0;m.style.setProperty("--progress",T+"%")}function lt(){x&&x.style.setProperty("--vol",x.value+"%")}async function vt(c){if(!c)return"";if(/^(https?|data|blob):/.test(c))return c;if(at)try{const{convertFileSrc:A}=await W(async()=>{const{convertFileSrc:T}=await import("./core-DhEqZVGG.js");return{convertFileSrc:T}},[]);return A(c)}catch{}return c}async function ut(c,A=!0){if(!S.length)return;c<0&&(c=S.length-1),c>=S.length&&(c=0),C=c;const T=S[c];T&&(O||I(),t.src=await vt(T.path),t.load(),O&&(O.textContent=T.title||"Unknown Title"),X&&(X.textContent=T.artist||"Unknown Artist"),P&&(P.textContent=T.album||""),q&&(q.textContent=T.codec||"AUDIO"),G&&(G.textContent=T.specs||""),T.cover&&F?(F.src=T.cover,F.style.display="block",$&&($.style.display="none")):(F&&(F.style.display="none"),$&&($.style.display="grid")),m&&(m.max=String(T.duration||240),m.value="0",nt()),M&&(M.textContent=K(T.duration)),h&&(h.textContent="0:00"),L(),Te(T.cover||null),document.querySelectorAll(".track-row").forEach((R,U)=>{var D;R.classList.toggle("active",((D=S[U])==null?void 0:D.id)===T.id)}),"mediaSession"in navigator&&(navigator.mediaSession.metadata=new MediaMetadata({title:T.title,artist:T.artist,album:T.album,artwork:T.cover?[{src:T.cover,sizes:"512x512",type:"image/jpeg"}]:[]}),navigator.mediaSession.setActionHandler("play",()=>Lt()),navigator.mediaSession.setActionHandler("pause",()=>ht()),navigator.mediaSession.setActionHandler("previoustrack",()=>w()),navigator.mediaSession.setActionHandler("nexttrack",()=>wt()),navigator.mediaSession.setActionHandler("seekto",R=>{R.seekTime&&(t.currentTime=R.seekTime)})),A&&Lt(),window.dispatchEvent(new CustomEvent("lumi:trackChange",{detail:T})),Y("melo:track-changed",T))}let yt=!1;function Ct(){try{Nt(t).resume()}catch{}yt&&(yt=!1,t.play().then(()=>{i&&(i.style.display="none"),n&&(n.style.display="block")}).catch(()=>{}))}window.addEventListener("pointerdown",Ct),window.addEventListener("keydown",Ct);function Lt(){try{Nt(t).resume()}catch{}t.play().then(()=>{yt=!1,i&&(i.style.display="none"),n&&(n.style.display="block"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="playing")}).catch(()=>{yt||(yt=!0,e("Click once inside player to begin audio playback"))})}function ht(){t.pause(),i&&(i.style.display="block"),n&&(n.style.display="none"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}function bt(){t.paused?Lt():ht()}function Z(){t.pause();try{t.currentTime=0}catch{}i&&(i.style.display="block"),n&&(n.style.display="none"),m&&(m.value="0",nt()),h&&(h.textContent="0:00"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}function wt(){if(!S.length)return;if(J==="one"){t.currentTime=0,Lt();return}let c=C+1;if(j&&(c=Math.floor(Math.random()*S.length),c===C&&S.length>1&&(c=(c+1)%S.length)),c>=S.length)if(J==="all")c=0;else{ht();return}ut(c)}function w(){if(!S.length)return;if(t.currentTime>3){t.currentTime=0;return}let c=C-1;j&&(c=Math.floor(Math.random()*S.length)),c<0&&(J==="all"?c=S.length-1:c=0),ut(c)}function L(){var D;const c=S[C];if(!c||!x)return;const A=parseInt(x.value,10)/100,T=b&&b.checked&&(D=c.replayGain)!=null?D:0,R=Math.pow(10,T/20);let U=A*R;U=Math.min(1,Math.max(0,U)),t.volume=U}function I(){if(a=document.getElementById("btnPlay"),i=document.getElementById("iconPlay"),n=document.getElementById("iconPause"),s=document.getElementById("btnPrev"),l=document.getElementById("btnNext"),g=document.getElementById("btnShuffle"),p=document.getElementById("btnRepeat"),r=document.getElementById("btnStop"),m=document.getElementById("seekBar"),x=document.getElementById("volBar"),h=document.getElementById("curTime"),M=document.getElementById("durTime"),B=document.getElementById("volPct"),O=document.getElementById("trackTitle"),X=document.getElementById("trackArtist"),P=document.getElementById("trackAlbum"),q=document.getElementById("trackCodec"),G=document.getElementById("trackSpecs"),F=document.getElementById("coverImg"),$=document.getElementById("coverFallback"),b=document.getElementById("replayGainToggle"),a&&(a.onclick=bt),r&&(r.onclick=Z),s&&(s.onclick=w),l&&(l.onclick=wt),g&&(g.onclick=()=>{j=!j,g.classList.toggle("active",j),e(j?"Shuffle on":"Shuffle off")}),p&&(p.onclick=()=>{J=J==="off"?"all":J==="all"?"one":"off",p.classList.toggle("active",J!=="off");const c={off:"Repeat off",all:"Repeat all",one:"Repeat one"};e(c[J]),p.title=c[J]}),m&&(m.oninput=()=>{it=!0,h&&(h.textContent=K(parseFloat(m.value))),nt()},m.onchange=()=>{t.currentTime=parseFloat(m.value),it=!1}),x&&(x.oninput=()=>{lt(),B&&(B.textContent=x.value+"%"),L()}),b&&(b.onchange=()=>L()),nt(),lt(),S[C]){const c=S[C];O&&(O.textContent=c.title||"Unknown Title"),X&&(X.textContent=c.artist||"Unknown Artist"),P&&(P.textContent=c.album||""),q&&(q.textContent=c.codec||"AUDIO"),G&&(G.textContent=c.specs||""),c.cover&&F&&(F.src=c.cover,F.style.display="block",$&&($.style.display="none"))}}I(),t.addEventListener("timeupdate",()=>{!it&&m&&h&&(m.value=String(Math.floor(t.currentTime)),h.textContent=K(t.currentTime),nt())}),t.addEventListener("loadedmetadata",()=>{var A;if(!m||!M)return;const c=Math.floor(t.duration||((A=S[C])==null?void 0:A.duration)||240);m.max=String(c),M.textContent=K(c),nt()}),t.addEventListener("ended",()=>{wt()}),window.addEventListener("keydown",c=>{c.target.tagName!=="INPUT"&&(c.code==="Space"&&(c.preventDefault(),bt()),c.code==="ArrowRight"&&(t.currentTime+=5),c.code==="ArrowLeft"&&(t.currentTime-=5),(c.key==="m"||c.key==="M")&&(t.muted=!t.muted,e(t.muted?"Muted":"Unmuted")),(c.key==="s"||c.key==="S")&&g&&g.click(),(c.key==="r"||c.key==="R")&&p&&p.click(),c.code==="ArrowUp"&&x&&(x.value=String(Math.min(100,parseInt(x.value,10)+5)),x.dispatchEvent(new Event("input"))),c.code==="ArrowDown"&&x&&(x.value=String(Math.max(0,parseInt(x.value,10)-5)),x.dispatchEvent(new Event("input"))))}),rt("melo:tray-action",c=>{c==="play_pause"?bt():c==="next"?wt():c==="prev"?w():c==="mute"&&(t.muted=!t.muted,e(t.muted?"Muted":"Unmuted"))}),window.LumiPlayer={get queue(){return S},set queue(c){S=c,window.__LUMI_QUEUE__=c},get currentIndex(){return C},loadTrack:ut,play:Lt,pause:ht,stop:Z,next:wt,prev:w,get audio(){return t},rebind:I},window.__LUMI_REBIND__=I,rt("melo:play-tracks",c=>{if(!c||!Array.isArray(c.tracks)||!c.tracks.length)return;S=c.tracks,window.__LUMI_SET_QUEUE__(S);const A=Math.max(0,Math.min(c.index||0,S.length-1));ut(A,!0)})}const Pt=at,Tt=new URLSearchParams(location.search).get("panel")||"main";let Q=[],dt=[];try{const t=localStorage.getItem("melo-playlists");if(t){const e=JSON.parse(t);Array.isArray(e)&&e.length&&(dt=e)}}catch{}dt.length||(dt=[{id:"p1",name:"Favorites",tracks:[],createdAt:Date.now()}]);try{const t=localStorage.getItem("melo-tracks");if(t){const e=JSON.parse(t);Array.isArray(e)&&(Q=e)}}catch{}function re(t,e){var ie,ae,ne,oe;const a=document.getElementById("trackList");document.getElementById("playlistList");const i=document.getElementById("winPlaylistTracks"),n=document.getElementById("winPlaylistEmpty"),s=document.getElementById("playlistSelect"),l=document.getElementById("searchInput"),g=document.getElementById("libraryStats"),p=document.getElementById("btn-scan"),r=document.getElementById("btn-export-playlist"),m=document.getElementById("btn-new-playlist"),x=document.getElementById("queueList"),h=document.getElementById("tagEditor"),M=document.getElementById("tagTitle"),B=document.getElementById("tagArtist"),O=document.getElementById("tagAlbum"),X=document.getElementById("tagYear"),P=document.getElementById("tagCover");let q="",G=localStorage.getItem("melo-currentPlaylist")||((ie=dt[0])==null?void 0:ie.id)||"",F="artists",$=null,b=null,S=null,C=null,j=[];(ae=document.getElementById("libraryTabs"))==null||ae.querySelectorAll(".tab").forEach(o=>{o.addEventListener("click",()=>{document.querySelectorAll("#libraryTabs .tab").forEach(d=>d.classList.remove("active")),o.classList.add("active"),F=o.dataset.libtab,$=b=S=C=null,V()})}),l==null||l.addEventListener("input",()=>{q=l.value.toLowerCase(),V()}),V(),xt(),p==null||p.addEventListener("click",async()=>{if(window.__TAURI__)try{const{open:o}=await W(async()=>{const{open:y}=await import("./index-CS3Qnt9j.js");return{open:y}},__vite__mapDeps([5,1])),d=await o({directory:!0,multiple:!1});if(d){e("Scanning folder in the background…");const{invoke:y}=await W(async()=>{const{invoke:v}=await import("./core-DhEqZVGG.js");return{invoke:v}},[]),f=await y("scan_library",{path:d});f.forEach(v=>v.source="scan"),vt(f,!0),ut(f),V()}}catch{e("Scanning requires the Tauri build")}else{const o=document.createElement("input");o.type="file",o.multiple=!0,o.accept="audio/*",o.onchange=async()=>{var y;const d=Array.from(o.files||[]);for(const f of d){const v=URL.createObjectURL(f),u=Math.random().toString(36).slice(2),k=((y=f.name.split(".").pop())==null?void 0:y.toUpperCase())||"MP3",E={id:u,title:f.name.replace(/\.[^/.]+$/,""),artist:"Unknown",album:"Imported",genre:"Unknown",year:new Date().getFullYear(),duration:180,path:v,codec:k,specs:"Imported · Stereo",replayGain:0},_=new Audio(v);await new Promise(N=>{_.addEventListener("loadedmetadata",()=>{E.duration=Math.floor(_.duration)||180,N(null)},{once:!0}),_.load(),setTimeout(()=>N(null),1500)}),await $t(f,E),Q.push(E)}e(`${d.length} file(s) added`),V(),xt()},o.click()}}),document.addEventListener("dragover",o=>{o.preventDefault()}),document.addEventListener("drop",async o=>{var y,f;o.preventDefault();const d=Array.from(((y=o.dataTransfer)==null?void 0:y.files)||[]).filter(v=>v.type.startsWith("audio/")||/\.(mp3|flac|wav|ogg|aac|m4a|alac)$/i.test(v.name));if(d.length){for(const v of d){const u=URL.createObjectURL(v),k=Math.random().toString(36).slice(2),E=((f=v.name.split(".").pop())==null?void 0:f.toUpperCase())||"MP3",_={id:k,title:v.name.replace(/\.[^/.]+$/,""),artist:"Imported",album:"Drop",genre:"Unknown",year:new Date().getFullYear(),duration:200,path:u,codec:E,specs:"Drag & Drop"};await $t(v,_);const N=new Audio(u);await new Promise(et=>{N.addEventListener("loadedmetadata",()=>{_.duration=Math.floor(N.duration)||200,et(null)},{once:!0}),N.load(),setTimeout(()=>et(null),800)}),Q.push(_)}e(`${d.length} File added via drag & drop`),V()}});function J(){return dt.find(o=>o.id===G)||dt[0]}function it(){localStorage.setItem("melo-rev",String(Date.now())),localStorage.setItem("melo-playlists",JSON.stringify(dt))}function K(){Pt&&Y("melo:playlists-sync",{src:Tt,playlists:dt})}function nt(o){G=o,localStorage.setItem("melo-currentPlaylist",o),Z()}rt("melo:playlists-sync",o=>{o&&o.src!==Tt&&Array.isArray(o.playlists)&&(dt=o.playlists,Z(),V())});function lt(){localStorage.setItem("melo-rev",String(Date.now()));try{localStorage.setItem("melo-tracks",JSON.stringify(Q))}catch{try{localStorage.setItem("melo-tracks",JSON.stringify(Q.map(({cover:o,...d})=>d)))}catch{}}}function vt(o,d=!1){let y=!1;o.forEach(f=>{Q.some(v=>v.id===f.id)||(Q.push(f),y=!0)}),y&&(lt(),V(),Z()),d&&Pt&&Y("melo:tracks-add",{src:Tt,list:o})}rt("melo:tracks-add",o=>{o&&o.src!==Tt&&Array.isArray(o.list)&&vt(o.list)});function ut(o){const d=J();if(!d)return;let y=!1;o.forEach(f=>{d.tracks.includes(f.id)||(d.tracks.push(f.id),y=!0)}),y&&(it(),K(),Z(),V())}async function yt(o){if(!Pt)return[];const{invoke:d}=await W(async()=>{const{invoke:f}=await import("./core-DhEqZVGG.js");return{invoke:f}},[]),y=[];for(const f of o)try{const v=await d("scan_library",{path:f});v&&y.push(...v)}catch{}return y}Pt&&W(async()=>{const{getCurrentWebviewWindow:o}=await import("./webviewWindow-mjQkSB26.js");return{getCurrentWebviewWindow:o}},__vite__mapDeps([6,7,1,0,8])).then(({getCurrentWebviewWindow:o})=>{o().onDragDropEvent(async y=>{var f;if(y.payload.type==="drop"){const v=y.payload.paths||[];if(!v.length)return;const u=await yt(v);if(!u.length)return;u.forEach(k=>k.source="import"),vt(u,!0),ut(u),Y("melo:play-tracks",{tracks:u,index:0}),e(`Playing ${((f=u[0])==null?void 0:f.title)||"track"}`)}})}).catch(()=>{});function Ct(o){return`${Math.floor(o/60)}:${String(Math.floor(o%60)).padStart(2,"0")}`}function Lt(o){return o.type.startsWith("audio/")||/\.(mp3|flac|wav|ogg|aac|m4a|alac|opus)$/i.test(o.name)}async function ht(o){var E;const d=o.path;if(d&&Pt){const _=await yt([d]);if(_.length)return _[0].source="import",_[0]}const y=d||URL.createObjectURL(o),f=d||Math.random().toString(36).slice(2),v=((E=o.name.split(".").pop())==null?void 0:E.toUpperCase())||"MP3",u=o.name.replace(/\.[^/.]+$/,""),k={id:f,title:u,artist:"Unknown Artist",album:"Single",genre:"Unknown",year:new Date().getFullYear(),duration:180,path:y,codec:v,specs:"Local File",replayGain:0,source:"import"};try{const _=new Audio(URL.createObjectURL(o));await new Promise(N=>{_.addEventListener("loadedmetadata",()=>{k.duration=Math.floor(_.duration)||180,N(null)},{once:!0}),_.load(),setTimeout(()=>N(null),800)})}catch{}return await $t(o,k),k}let bt="";function Z(){if(!i)return;try{const v=localStorage.getItem("melo-tracks");if(v){const u=JSON.parse(v);Array.isArray(u)&&u.length>Q.length&&(Q=u)}}catch{}const o=J();if(s&&(s.innerHTML=dt.map(v=>`<option value="${v.id}" ${o&&v.id===o.id?"selected":""}>${v.name}</option>`).join("")),!o){i.innerHTML="",i.style.display="none",n&&(n.style.display="block");return}const d=o.tracks.map((v,u)=>{const k=Q.find(et=>et.id===v||et.path===v);if(k)return k;const E=v.replace(/^.*[\\/]/,""),_=E.lastIndexOf("."),N=_>0?E.slice(0,_):E;return{id:v,title:N||`Track ${u+1}`,artist:"Audio Track",album:o.name,duration:0,path:v,codec:"AUDIO",specs:"Local File",source:"import"}});let y=d;if(bt.trim()){const v=bt.toLowerCase().trim();y=d.filter(u=>(u.title||"").toLowerCase().includes(v)||(u.artist||"").toLowerCase().includes(v)||(u.album||"").toLowerCase().includes(v))}if(n&&(n.style.display=d.length?"none":"block"),i.style.display=d.length?"flex":"none",!y.length&&d.length){i.innerHTML=`<div style="padding:16px;text-align:center;color:var(--text-muted);font-size:11px;">No tracks match "${bt}"</div>`;return}i.innerHTML=y.map((v,u)=>{const k=o.tracks.indexOf(v.id);return`
      <div class="track-row" draggable="true" data-id="${v.id}" data-pl-idx="${k>=0?k:u}">
        <span class="num">${u+1}</span>
        ${v.cover?`<img class="track-cover-mini" src="${v.cover}" onerror="this.style.display='none'"/>`:'<div class="track-cover-mini cover-default">♪</div>'}
        <div style="flex:1;min-width:0;">
          <div class="t-title">${v.title}</div>
          <div class="t-artist">${v.artist} • ${v.album}</div>
        </div>
        <span class="t-dur">${Ct(v.duration)}</span>
        <button class="btn small ghost" data-action="pl-remove" data-idx="${k>=0?k:u}" title="Remove from playlist">×</button>
      </div>
    `}).join("");let f=null;i.querySelectorAll(".track-row").forEach(v=>{const u=v;u.addEventListener("dragstart",k=>{f=parseInt(u.dataset.plIdx),k.dataTransfer.setData("application/x-melo-ids",u.dataset.id),k.dataTransfer.setData("application/x-melo-pl-idx",String(f)),k.dataTransfer.effectAllowed="move",u.style.opacity="0.4"}),u.addEventListener("dragend",()=>{u.style.opacity="1",f=null,i==null||i.querySelectorAll(".track-row").forEach(k=>k.classList.remove("drag-over-target"))}),u.addEventListener("dragover",k=>{k.preventDefault(),k.stopPropagation(),u.classList.add("drag-over-target")}),u.addEventListener("dragleave",()=>{u.classList.remove("drag-over-target")}),u.addEventListener("drop",k=>{var N;k.preventDefault(),k.stopPropagation(),u.classList.remove("drag-over-target");const E=parseInt(u.dataset.plIdx),_=(N=k.dataTransfer)==null?void 0:N.getData("application/x-melo-pl-idx");if(_!==void 0&&_!==""&&!isNaN(parseInt(_))){const et=parseInt(_);if(et!==E&&et>=0&&E>=0&&et<o.tracks.length&&E<o.tracks.length){const Vt=o.tracks.splice(et,1)[0];o.tracks.splice(E,0,Vt),it(),K(),Z(),V(),e("Track reordered in playlist");return}}}),u.addEventListener("click",k=>{const E=k.target;if(E.closest("[data-action='pl-remove']")){const et=parseInt(E.closest("[data-action='pl-remove']").dataset.idx);o.tracks.splice(et,1),it(),K(),Z(),V();return}const _=u.dataset.id,N=y.findIndex(et=>et.id===_);Y("melo:play-tracks",{tracks:y,index:N>=0?N:0})})})}const wt=document.getElementById("playlistSearchInput");wt&&wt.addEventListener("input",()=>{bt=wt.value,Z()});const w=document.getElementById("playlistSortSelect");if(w&&w.addEventListener("change",()=>{const o=J();if(!o||!o.tracks.length)return;const d=w.value,y=o.tracks.map(f=>Q.find(v=>v.id===f)).filter(Boolean);d==="title-asc"?y.sort((f,v)=>f.title.localeCompare(v.title)):d==="artist-asc"?y.sort((f,v)=>f.artist.localeCompare(v.artist)):d==="album-asc"?y.sort((f,v)=>f.album.localeCompare(v.album)):d==="dur-asc"?y.sort((f,v)=>f.duration-v.duration):d==="dur-desc"&&y.sort((f,v)=>v.duration-f.duration),o.tracks=y.map(f=>f.id),it(),K(),Z(),e(`Playlist sorted by ${w.options[w.selectedIndex].text}`)}),s==null||s.addEventListener("change",()=>nt(s.value)),r==null||r.addEventListener("click",()=>{const o=J();if(!o)return e("No playlist available");const d=o.tracks.map(k=>Q.find(E=>E.id===k)).filter(Boolean);if(!d.length)return e("Current list is empty");let y=`#EXTM3U
`;d.forEach(k=>{y+=`#EXTINF:${Math.floor(k.duration)},${k.artist} - ${k.title}
${k.path}
`});const f=new Blob([y],{type:"audio/x-mpegurl"}),v=URL.createObjectURL(f),u=document.createElement("a");u.href=v,u.download=`${o.name}.m3u`,u.click(),URL.revokeObjectURL(v),e(`M3U exported for "${o.name}"`)}),m==null||m.addEventListener("click",()=>{const o=prompt("New playlist name:");if(!o)return;const d=Math.random().toString(36).slice(2,8);dt.push({id:d,name:o,tracks:[],createdAt:Date.now()}),nt(d),it(),K(),V(),e(`Playlist "${o}" created`)}),i){const o=i.parentElement;["dragover","dragenter"].forEach(d=>o.addEventListener(d,y=>{y.preventDefault(),y.stopPropagation(),i.classList.add("drag-over")})),o.addEventListener("dragleave",d=>{o.contains(d.relatedTarget)||i.classList.remove("drag-over")}),o.addEventListener("drop",async d=>{var u,k;d.preventDefault(),d.stopPropagation(),i.classList.remove("drag-over");const y=J();if(!y)return e("Create a playlist first (+ New)");const f=(((u=d.dataTransfer)==null?void 0:u.getData("application/x-melo-ids"))||"").split(",").filter(Boolean);let v=0;if(f.length)f.forEach(E=>{y.tracks.includes(E)||(y.tracks.push(E),v++)});else{const E=Array.from(((k=d.dataTransfer)==null?void 0:k.files)||[]).filter(Lt);for(const _ of E){const N=await ht(_);Q.push(N),y.tracks.includes(N.id)||(y.tracks.push(N.id),v++)}}v&&e(`${v} track(s) added to "${y.name}"`),lt(),it(),K(),V(),Z()})}const L=document.getElementById("playerCard");L&&(["dragover","dragenter"].forEach(o=>L.addEventListener(o,d=>{d.preventDefault(),d.stopPropagation(),L.classList.add("drag-over")})),L.addEventListener("dragleave",o=>{L.contains(o.relatedTarget)||L.classList.remove("drag-over")}),L.addEventListener("drop",async o=>{var v,u;o.preventDefault(),o.stopPropagation(),L.classList.remove("drag-over");const d=window.LumiPlayer,y=(((v=o.dataTransfer)==null?void 0:v.getData("application/x-melo-ids"))||"").split(",").filter(Boolean);let f=[];if(y.length)f=y.map(k=>Q.find(E=>E.id===k)).filter(Boolean),d&&f.length&&e(`Playback ${f.length} track(s)`);else{const k=Array.from(((u=o.dataTransfer)==null?void 0:u.files)||[]).filter(Lt),E=J();let _=!1;for(const N of k){const et=await ht(N);Q.push(et),f.push(et),E&&!E.tracks.includes(et.id)&&(E.tracks.push(et.id),_=!0)}k.length&&(lt(),it(),K(),V(),Z()),d&&f.length&&e(_&&E?`Playback ${f.length} track(s) + added to "${E.name}"`:`Playback ${f.length} track(s)`)}f.length&&Y("melo:play-tracks",{tracks:f,index:0})}));let I=null;function c(o){if(I=o,!I)return e("No track to edit");h.style.display="flex",M.value=I.title,B.value=I.artist,O.value=I.album,X.value=String(I.year)}function A(o){const d=Q.filter(o).map(y=>y.id);d.length&&(Q=Q.filter(y=>!o(y)),dt.forEach(y=>{y.tracks=y.tracks.filter(f=>!d.includes(f))}),lt(),it(),K(),Pt&&Y("melo:tracks-remove",{src:Tt,ids:d}),V(),Z())}rt("melo:tracks-remove",o=>{if(o&&o.src!==Tt&&Array.isArray(o.ids)){const d=o.ids;Q=Q.filter(y=>!d.includes(y.id)),dt.forEach(y=>{y.tracks=y.tracks.filter(f=>!d.includes(f))}),V(),Z()}});const T=document.createElement("div");T.className="ctx-menu",T.style.display="none",document.body.appendChild(T);let R=null;function U(){T.style.display="none"}document.addEventListener("click",U),document.addEventListener("keydown",o=>{o.key==="Escape"&&U()}),T.addEventListener("click",o=>{const d=o.target.closest("[data-act]");if(!d||!R)return;o.stopPropagation();const y=d.dataset.act;y==="edit"&&c(R.track),y==="remove"&&(R.type==="track"?A(f=>f.id===R.track.id):R.type==="artist"?A(f=>f.artist===R.name):R.type==="album"?A(f=>f.artist===R.artist&&f.album===R.album):R.type==="genre"&&A(f=>f.genre===R.name)),U()});const D=document.createElement("div");D.className="ctx-menu",D.style.display="none",document.body.appendChild(D);let ot=-1;document.addEventListener("click",()=>{D.style.display="none"}),D.addEventListener("click",o=>{if(!o.target.closest("[data-act='plremove']"))return;o.stopPropagation();const d=J();d&&ot>=0&&ot<d.tracks.length&&(d.tracks.splice(ot,1),it(),K(),Z(),V()),D.style.display="none"}),document.addEventListener("contextmenu",o=>{U(),D.style.display="none";const d=o.target,y=d.closest("#winPlaylistTracks .track-row");if(y){o.preventDefault(),ot=parseInt(y.dataset.plIdx||"-1"),D.innerHTML='<button class="ctx-item danger" data-act="plremove">Remove from Playlist</button>',D.style.display="block";const k=D.getBoundingClientRect();D.style.left=Math.max(4,Math.min(o.clientX,window.innerWidth-k.width-6))+"px",D.style.top=Math.max(4,Math.min(o.clientY,window.innerHeight-k.height-6))+"px";return}if(!(Tt==="library"?!0:!!d.closest("#win-library"))){o.preventDefault();return}o.preventDefault();const v=d.closest(".track-row, [data-artist], [data-albumkey], [data-genre]");if(!v){U();return}if(v.classList.contains("track-row")){const k=j[parseInt(v.dataset.viewIdx)];if(!k){U();return}R={type:"track",track:k},T.innerHTML='<button class="ctx-item" data-act="edit">Edit tags</button><button class="ctx-item danger" data-act="remove">Remove track from library</button>'}else if(v.dataset.artist)R={type:"artist",name:v.dataset.artist},T.innerHTML='<button class="ctx-item danger" data-act="remove">Remove artist from library</button>';else if(v.dataset.albumkey){const[k,E]=(v.dataset.albumkey||"").split("\0");R={type:"album",artist:k,album:E},T.innerHTML='<button class="ctx-item danger" data-act="remove">Remove album from library</button>'}else R={type:"genre",name:v.dataset.genre},T.innerHTML='<button class="ctx-item danger" data-act="remove">Remove genre from library</button>';T.style.display="block";const u=T.getBoundingClientRect();T.style.left=Math.max(4,Math.min(o.clientX,window.innerWidth-u.width-6))+"px",T.style.top=Math.max(4,Math.min(o.clientY,window.innerHeight-u.height-6))+"px"}),(ne=document.getElementById("btn-tag-cancel"))==null||ne.addEventListener("click",()=>h.style.display="none"),(oe=document.getElementById("btn-tag-save"))==null||oe.addEventListener("click",async()=>{if(I){if(I.title=M.value,I.artist=B.value,I.album=O.value,I.year=parseInt(X.value)||I.year,P.files&&P.files[0]){const o=P.files[0],d=URL.createObjectURL(o),y=new FileReader;y.onload=()=>{I.cover=y.result,V(),xt(),Y("melo:tag-updated",I)},y.readAsDataURL(o),I.cover=d}if(window.__TAURI__)try{const{invoke:o}=await W(async()=>{const{invoke:d}=await import("./core-DhEqZVGG.js");return{invoke:d}},[]);await o("write_tags",{path:I.path,tags:{title:I.title,artist:I.artist,album:I.album}})}catch{}h.style.display="none",lt(),V(),xt(),Y("melo:tag-updated",I),e("Metadata saved")}});function z(o){return String(o!=null?o:"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function st(){return Q.filter(o=>o.source==="scan")}function mt(o){return j=o,o.length?o.map((d,y)=>{const f=`${Math.floor(d.duration/60)}:${String(Math.floor(d.duration%60)).padStart(2,"0")}`;return`
      <div class="track-row" draggable="true" data-view-idx="${y}" data-id="${z(d.id)}">
        <span class="num">${y+1}</span>
        <img class="track-cover-mini" src="${d.cover||""}" style="${d.cover?"":"display:none"}" onerror="this.style.display='none'"/>
        <div style="flex:1;min-width:0;">
          <div class="t-title">${z(d.title)}</div>
          <div class="t-artist">${z(d.artist)} • ${z(d.album)}${d.year?" • "+d.year:""}</div>
        </div>
        <span style="font-size:10px;padding:3px 6px;border-radius:6px;background:var(--badge-bg);color:var(--badge-text);border:1px solid var(--card-border);">${z(d.codec)}</span>
        <span class="t-dur">${f}</span>
        <button class="btn small ghost" data-action="add-queue" data-view-idx="${y}">+</button>
      </div>`}).join(""):'<div style="padding:30px;text-align:center;color:var(--text-muted);">Nothing here yet.<br/><span style="font-size:12px;">Use "Scan Folder" to build your library</span></div>'}function V(){if(!a){Z();return}const o=st(),d=new Set(o.map(u=>u.artist)).size,y=new Set(o.map(u=>u.artist+"\0"+u.album)).size;g&&(g.textContent=`${o.length} tracks • ${d} artists • ${y} albums`);const f=q.trim().toLowerCase();let v="";if(F==="artists")if($){const u=o.filter(_=>_.artist===$),k=[...new Set(u.map(_=>_.album))].sort((_,N)=>_.localeCompare(N)),E=b?u.filter(_=>_.album===b):u;v=`<div class="lib-crumb"><button class="btn small" data-back="artists">‹ Artists</button><b>${z($)}</b></div>
          <div class="chip-row"><button class="chip ${b?"":"active"}" data-album="">All albums</button>`+k.map(_=>`<button class="chip ${b===_?"active":""}" data-album="${z(_)}">${z(_)}</button>`).join("")+"</div>"+mt(f?E.filter(_=>(_.title+_.album).toLowerCase().includes(f)):E)}else{j=[];const u=[...new Set(o.map(E=>E.artist))].sort((E,_)=>E.localeCompare(_));v=(f?u.filter(E=>E.toLowerCase().includes(f)):u).map(E=>{const _=o.filter(N=>N.artist===E).length;return`<div class="lib-item" data-artist="${z(E)}"><div class="lib-avatar">${z((E[0]||"?").toUpperCase())}</div><div style="flex:1;min-width:0;"><div class="t-title">${z(E)}</div><div class="t-artist">${_} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No artists found.</div>'}else if(F==="albums")if(S){const[u,k]=S.split("\0"),E=o.filter(_=>_.artist===u&&_.album===k);v=`<div class="lib-crumb"><button class="btn small" data-back="albums">‹ Albums</button><b>${z(k)}</b><span class="t-artist" style="margin-left:8px;">${z(u)}</span></div>`+mt(f?E.filter(_=>_.title.toLowerCase().includes(f)):E)}else{j=[];const u=[...new Set(o.map(E=>E.artist+"\0"+E.album))].sort((E,_)=>E.localeCompare(_));v=(f?u.filter(E=>E.toLowerCase().includes(f)):u).map(E=>{const[_,N]=E.split("\0"),et=o.filter(Vt=>Vt.artist===_&&Vt.album===N).length;return`<div class="lib-item" data-albumkey="${z(E)}"><div class="lib-avatar">💿</div><div style="flex:1;min-width:0;"><div class="t-title">${z(N)}</div><div class="t-artist">${z(_)} • ${et} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No albums found.</div>'}else if(C){const u=o.filter(k=>k.genre===C);v=`<div class="lib-crumb"><button class="btn small" data-back="genres">‹ Genres</button><b>${z(C)}</b></div>`+mt(f?u.filter(k=>(k.title+k.artist).toLowerCase().includes(f)):u)}else{j=[];const u=[...new Set(o.map(E=>E.genre))].sort((E,_)=>E.localeCompare(_));v=(f?u.filter(E=>E.toLowerCase().includes(f)):u).map(E=>{const _=o.filter(N=>N.genre===E).length;return`<div class="lib-item" data-genre="${z(E)}"><div class="lib-avatar">🎼</div><div style="flex:1;min-width:0;"><div class="t-title">${z(E)}</div><div class="t-artist">${_} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No genres found.</div>'}a.innerHTML=v,a.querySelectorAll("[data-artist]").forEach(u=>u.addEventListener("click",()=>{$=u.dataset.artist,b=null,V()})),a.querySelectorAll("[data-albumkey]").forEach(u=>u.addEventListener("click",()=>{S=u.dataset.albumkey,V()})),a.querySelectorAll("[data-genre]").forEach(u=>u.addEventListener("click",()=>{C=u.dataset.genre,V()})),a.querySelectorAll("[data-back]").forEach(u=>u.addEventListener("click",()=>{const k=u.dataset.back;k==="artists"?($=null,b=null):k==="albums"?S=null:C=null,V()})),a.querySelectorAll(".chip[data-album]").forEach(u=>u.addEventListener("click",()=>{b=u.dataset.album||null,V()})),a.querySelectorAll(".track-row").forEach(u=>{u.addEventListener("dragstart",k=>{k.dataTransfer.setData("application/x-melo-ids",u.dataset.id),k.dataTransfer.effectAllowed="copy"}),u.addEventListener("click",k=>{const E=k.target,_=parseInt(u.dataset.viewIdx);if(E.closest("[data-action='add-queue']")){Mt(j[_]);return}Y("melo:play-tracks",{tracks:j,index:_})})}),Z()}function Mt(o){Y("melo:add-queue",o),e(`Queued: ${o.title}`)}function xt(){if(!x)return;const o=window.LumiPlayer,d=(o==null?void 0:o.queue)||Q.slice(0,4);if(!d.length){x.innerHTML='<div style="text-align:center;color:var(--text-muted);font-size:12px;padding:12px;">Queue is empty</div>';return}x.innerHTML=d.map((y,f)=>{var v;return`
      <div class="track-row" data-id="${y.id}" data-queue-idx="${f}" style="padding:6px 8px;border-radius:8px;border:1px solid ${f===((v=o==null?void 0:o.currentIndex)!=null?v:0)?"var(--accent)":"transparent"};">
        <img class="track-cover-mini" src="${y.cover||""}" style="width:24px;height:24px;${y.cover?"":"display:none"}" />
        <div style="flex:1;min-width:0;">
          <div class="t-title" style="font-size:12px;">${y.title}</div>
          <div class="t-artist" style="font-size:11px;">${y.artist}</div>
        </div>
        <button class="btn small ghost" data-remove="${f}" style="padding:2px 6px;">×</button>
      </div>
    `}).join(""),x.querySelectorAll("[data-remove]").forEach(y=>{y.addEventListener("click",()=>{const f=parseInt(y.dataset.remove);d.splice(f,1),xt()})}),x.querySelectorAll(".track-row").forEach(y=>{y.addEventListener("click",f=>{if(f.target.closest("[data-remove]"))return;const v=parseInt(y.dataset.queueIdx),u=window.LumiPlayer;u&&u.loadTrack(v)})})}rt("melo:track-changed",o=>{xt();const d=document.getElementById("lyricsBox");d&&o&&(d.textContent=o.lyrics||"No lyrics found for this track. You can add it via the tag editor."),document.querySelectorAll(".track-row").forEach(y=>{y.classList.toggle("active",y.dataset.id===(o==null?void 0:o.id))})}),setInterval(()=>xt(),2e3);let ee=localStorage.getItem("melo-rev")||"";setInterval(()=>{const o=localStorage.getItem("melo-rev")||"";if(o!==ee){ee=o;try{const d=JSON.parse(localStorage.getItem("melo-tracks")||"null");Array.isArray(d)&&(Q=d)}catch{}try{const d=JSON.parse(localStorage.getItem("melo-playlists")||"null");Array.isArray(d)&&d.length&&(dt=d)}catch{}V(),Z()}},1200),window.LumiLibrary={get tracks(){return Q},get playlists(){return dt},render:V,addTracks:vt,addToCurrentPlaylist:ut,importPaths:yt,currentPlaylistName:()=>{var o;return((o=J())==null?void 0:o.name)||"Playlist"}}}const Ut={flat:[0,0,0,0,0,0,0,0,0,0],pop:[-1,2,4,4,2,-1,-1,2,3,3],rock:[4,3,2,-1,-2,-2,1,3,4,4],bass:[6,5,4,2,1,0,-1,-1,-2,-3],treble:[-3,-2,-1,0,1,2,3,5,6,6],dance:[5,4,2,0,-1,-1,2,4,5,3],jazz:[2,1,2,3,2,0,1,2,3,2],classical:[3,2,1,0,0,0,-1,2,3,4],vocal:[-2,-1,0,2,4,4,3,1,0,-1],acoustic:[3,2,1,1,2,2,3,3,2,1],hiphop:[5,4,1,2,-1,-1,1,-1,2,3],metal:[4,2,-1,-2,-1,1,3,4,5,4]};function Qt(t){for(const[e,a]of Object.entries(Ut))if(a.every((i,n)=>i===t[n]))return e;return"custom"}function ce(t,e,a={}){const i=!!a.remote,n=document.getElementById("eqEnable"),s=document.getElementById("eqPreset"),l=document.getElementById("btnEqReset"),g=document.getElementById("eqBands"),p=document.getElementById("eqCanvas"),r=p?p.getContext("2d"):null;let m=null,x=[],h=[],M=new Array(Ot.length).fill(0);try{const b=JSON.parse(localStorage.getItem("melo-eq-gains")||"null");Array.isArray(b)&&b.length===Ot.length&&(M=b.map(S=>typeof S=="number"?Math.max(-12,Math.min(12,S)):0))}catch{}let B=localStorage.getItem("melo-eq-preset")||Qt(M),O=localStorage.getItem("melo-eq-enabled")!=="0";function X(){if(!m)try{const b=Nt(t);m=b.ctx,x=b.filters,x.forEach((S,C)=>{S.gain.value=O?M[C]:0})}catch{}}function P(b,S){X(),x[b]&&O&&(x[b].gain.value=S)}function q(b){X(),M=[...b],O&&b.forEach((S,C)=>{x[C]&&(x[C].gain.value=S)}),$()}function G(b){X(),O=b,b?M.forEach((S,C)=>{x[C]&&(x[C].gain.value=S)}):x.forEach(S=>{S.gain.value=0}),$()}i||t&&t.addEventListener("play",()=>{X(),(m==null?void 0:m.state)==="suspended"&&m.resume().catch(()=>{})}),rt("melo:eq",b=>{b&&(b.type==="gain"?(i||P(b.idx,b.val),M[b.idx]=b.val,h[b.idx]&&(h[b.idx].value=String(b.val),F(h[b.idx])),s&&(s.value=Qt(M)),$()):b.type==="gains"?(i||q(b.values),M=[...b.values],h.length&&h.forEach((S,C)=>{S.value=String(M[C]),F(S)}),s&&b.preset&&(s.value=b.preset),$()):b.type==="enable"&&(O=!!b.on,i||G(O),n&&(n.checked=O),$()))});function F(b){var j;const S=parseInt(b.value),C=(j=b.parentElement)==null?void 0:j.querySelector(".val");C&&(C.textContent=(S>0?"+":"")+S+"dB")}function $(){if(!p||!r)return;const b=window.devicePixelRatio||1,S=p.clientWidth*b,C=p.clientHeight*b;if(S<=0||C<=0)return;p.width=S,p.height=C,r.clearRect(0,0,S,C);const j=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#2a7bd6",J=M;if(!O){r.strokeStyle="rgba(100,120,150,0.25)",r.lineWidth=2*b,r.beginPath(),r.moveTo(0,C/2),r.lineTo(S,C/2),r.stroke();return}r.strokeStyle=j,r.lineWidth=2.5*b,r.lineJoin="round",r.beginPath(),J.forEach((it,K)=>{const nt=K/(J.length-1)*S,lt=C/2-it/12*(C/2-10*b);if(K===0)r.moveTo(nt,lt);else{const vt=(K-1)/(J.length-1)*S,ut=C/2-J[K-1]/12*(C/2-10*b);r.quadraticCurveTo((vt+nt)/2,ut,nt,lt)}}),r.stroke(),J.forEach((it,K)=>{const nt=K/(J.length-1)*S,lt=C/2-it/12*(C/2-10*b);r.fillStyle=j,r.beginPath(),r.arc(nt,lt,4*b,0,Math.PI*2),r.fill(),r.fillStyle="white",r.beginPath(),r.arc(nt,lt,2*b,0,Math.PI*2),r.fill()}),r.strokeStyle="rgba(100,120,150,0.3)",r.lineWidth=1*b,r.setLineDash([4*b,4*b]),r.beginPath(),r.moveTo(0,C/2),r.lineTo(S,C/2),r.stroke(),r.setLineDash([])}g&&(g.innerHTML="",Ot.forEach((b,S)=>{const C=M[S]||0,j=document.createElement("div");j.className="eq-band",j.innerHTML=`
        <input type="range" min="-12" max="12" value="${C}" step="1" data-idx="${S}" orient="vertical" />
        <label>${b>=1e3?b/1e3+"k":b}</label>
        <span style="font-size:10px;color:var(--text-muted);min-height:12px;" class="val">${(C>0?"+":"")+C+"dB"}</span>
      `,g.appendChild(j)}),h=Array.from(g.querySelectorAll("input")),h.forEach(b=>{b.addEventListener("input",()=>{const S=parseInt(b.dataset.idx),C=parseInt(b.value);F(b),M[S]=C,$();const j=Qt(M);s&&(s.value=j),localStorage.setItem("melo-eq-gains",JSON.stringify(M)),localStorage.setItem("melo-eq-preset",j),i||P(S,C),Y("melo:eq",{type:"gain",idx:S,val:C,values:M})})})),s&&(s.value=B,s.addEventListener("change",()=>{const b=Ut[s.value]||Ut.flat;h.length&&h.forEach((S,C)=>{S.value=String(b[C]),F(S)}),M=[...b],$(),localStorage.setItem("melo-eq-gains",JSON.stringify(M)),localStorage.setItem("melo-eq-preset",s.value),i||q(b),Y("melo:eq",{type:"gains",values:b,preset:s.value}),e(`Preset: ${s.options[s.selectedIndex].text}`)})),l&&l.addEventListener("click",()=>{const b=Ut.flat;h.length&&h.forEach((S,C)=>{S.value="0",F(S)}),M=[...b],s&&(s.value="flat"),localStorage.setItem("melo-eq-gains",JSON.stringify(M)),localStorage.setItem("melo-eq-preset","flat"),i||q(b),Y("melo:eq",{type:"gains",values:b,preset:"flat"}),$(),e("Equalizer reset to Flat (0dB)")}),n&&(n.checked=O,n.addEventListener("change",()=>{O=n.checked,localStorage.setItem("melo-eq-enabled",O?"1":"0"),i||G(O),Y("melo:eq",{type:"enable",on:O}),$(),e(O?"Equalizer On":"Equalizer off — Flat")})),p&&new ResizeObserver(()=>$()).observe(p),$(),window.LumiEqualizer={presets:Ut,frequencies:Ot,displayGains:M,reset:()=>l==null?void 0:l.click()}}const zt=[{id:"bars",label:"Classic Bars"},{id:"thin",label:"Thin Bars"},{id:"line",label:"Spectrum Line"},{id:"mirror",label:"Mirror Bars"},{id:"wave",label:"Oscilloscope"}];function We(t){let e=document.getElementById("vizBars");if(!e)return;let a=O(e),i=a.getContext("2d"),n=null,s=null,l=null,g=null,p=null,r=!1,m=localStorage.getItem("melo-viz-mode")||"bars";zt.some(w=>w.id===m)||(m="bars");let x=0,h=[],M=.45,B=null;function O(w){let L=w.querySelector("canvas");return L||(w.innerHTML="",L=document.createElement("canvas"),w.appendChild(L)),L}function X(){if(!(s&&l))try{const w=Nt(t);n=w.ctx,s=w.analyser,l=new Uint8Array(s.frequencyBinCount),g=new Uint8Array(s.fftSize)}catch{r=!0}}function P(w){const L=l.length,I=((n==null?void 0:n.sampleRate)||44100)/2,c=45,A=Math.min(15e3,I*.95),T=Math.log(c),R=Math.log(A),U=[];for(let D=0;D<w;D++){const ot=Math.exp(T+(R-T)*D/w),z=Math.exp(T+(R-T)*(D+1)/w);let st=Math.floor(ot/I*L),mt=Math.max(st+1,Math.ceil(z/I*L));st<0&&(st=0),mt>L&&(mt=L);let V=0;for(let Mt=st;Mt<mt;Mt++)V+=l[Mt];U.push(V/(mt-st)/255)}return U}function q(w){const L=performance.now()/1e3,I=Math.pow(Math.abs(Math.sin(L*2.2)),2.5),c=[];for(let A=0;A<w;A++){let T=.42+.26*Math.sin(L*1.35+A*.62)+.2*Math.sin(L*2.9+A*1.31)+Math.random()*.07;T*=.55+.5*I,c.push(Math.max(.04,Math.min(1,T)))}return c}function G(w){const L=performance.now()/1e3,I=.5+.5*Math.pow(Math.abs(Math.sin(L*1.9)),2);for(let c=0;c<w.length;c++){const A=c/w.length;w[c]=128+66*I*(Math.sin(A*Math.PI*6+L*7)*.6+Math.sin(A*Math.PI*13-L*11)*.4)}}function F(w){let L;if(r||!s||!l)L=q(w);else if(s.getByteFrequencyData(l),L=P(w),!L.some(A=>A>.01)&&!t.paused)L=q(w);else for(let A=0;A<w;A++)L[A]*=1+1.7*(A/Math.max(1,w-1));let I=0;for(const c of L)c>I&&(I=c);I>M?M=I:M=Math.max(.35,M*.985),h.length!==w&&(h=new Array(w).fill(0));for(let c=0;c<w;c++){const A=Math.min(1,L[c]/M),T=A>h[c]?.55:.16;h[c]+=(A-h[c])*T}return h}function $(w,L){return getComputedStyle(document.documentElement).getPropertyValue(w).trim()||L}function b(){return a.width/Math.max(1,a.clientWidth)||1}function S(w,L,I,c,A){if(A=Math.min(A,I/2,c/2),i.roundRect){i.roundRect(w,L,I,c,A);return}i.rect(w,L,I,c)}function C(){const w=window.devicePixelRatio||1,L=a.clientWidth||(e==null?void 0:e.clientWidth)||200,I=a.clientHeight||(e==null?void 0:e.clientHeight)||56;L>0&&I>0&&(a.width=Math.round(L*w),a.height=Math.round(I*w))}new ResizeObserver(C).observe(a),C();function j(w,L,I,c){const A=b(),T=$("--visualizer","#38bdf8"),R=$("--accent","#0284c7"),U=w.length,D=L/U,ot=Math.max(1.2*A,D*(1-c));for(let z=0;z<U;z++){const st=w[z],mt=Math.max(2*A,st*(I-4*A)),V=z*D+(D-ot)/2,Mt=I-mt-1*A,xt=i.createLinearGradient(0,Mt,0,I);xt.addColorStop(0,R),xt.addColorStop(1,T),i.fillStyle=xt,i.beginPath(),S(V,Mt,ot,mt,Math.min(ot/2,3.5*A)),i.fill()}}function J(w,L,I){const c=b(),A=$("--visualizer","#38bdf8"),T=$("--accent","#0284c7"),R=w.length,U=L/R,D=I/2,ot=Math.max(1.5*c,U*.62);for(let z=0;z<R;z++){const st=Math.max(1.5*c,w[z]*(I/2-3*c)),mt=z*U+(U-ot)/2,V=i.createLinearGradient(0,D-st,0,D+st);V.addColorStop(0,T),V.addColorStop(.5,A),V.addColorStop(1,T),i.fillStyle=V,i.beginPath(),S(mt,D-st,ot,st*2,Math.min(ot/2,3*c)),i.fill()}}function it(w,L,I){const c=b(),A=$("--visualizer","#38bdf8"),T=$("--accent","#0284c7"),R=w.length,U=[],D=[];for(let z=0;z<R;z++)U.push((z+.5)/R*L),D.push(I-2*c-w[z]*(I-8*c));i.beginPath(),i.moveTo(U[0],I),i.lineTo(U[0],D[0]);for(let z=1;z<R;z++){const st=(U[z-1]+U[z])/2;i.quadraticCurveTo(U[z-1],D[z-1],st,(D[z-1]+D[z])/2)}i.lineTo(U[R-1],D[R-1]),i.lineTo(U[R-1],I),i.closePath();const ot=i.createLinearGradient(0,0,0,I);ot.addColorStop(0,A),ot.addColorStop(1,"transparent"),i.globalAlpha=.18,i.fillStyle=ot,i.fill(),i.globalAlpha=1,i.beginPath(),i.moveTo(U[0],D[0]);for(let z=1;z<R;z++){const st=(U[z-1]+U[z])/2;i.quadraticCurveTo(U[z-1],D[z-1],st,(D[z-1]+D[z])/2)}i.lineTo(U[R-1],D[R-1]),i.strokeStyle=T,i.lineWidth=2*c,i.lineJoin="round",i.stroke()}function K(){const w=a.width,L=a.height,I=b(),c=$("--accent","#0284c7");let A;r||!s||!g?(p||(p=new Uint8Array(1024)),G(p),A=p):(s.getByteTimeDomainData(g),A=g);const T=()=>{i.beginPath();for(let R=0;R<=w;R+=2){const U=Math.min(A.length-1,Math.floor(R/w*A.length)),D=A[U]/255*L;R===0?i.moveTo(R,D):i.lineTo(R,D)}};T(),i.strokeStyle=c,i.globalAlpha=.16,i.lineWidth=6*I,i.lineJoin="round",i.stroke(),T(),i.globalAlpha=1,i.lineWidth=1.8*I,i.stroke()}function nt(){const w=a.width,L=a.height;if(!w||!L)return;if(i.clearRect(0,0,w,L),m==="wave"){K();return}const c=F(m==="bars"?16:m==="thin"?56:m==="line"?64:24);m==="bars"?j(c,w,L,.34):m==="thin"?j(c,w,L,.32):m==="line"?it(c,w,L):m==="mirror"&&J(c,w,L)}function lt(){x=requestAnimationFrame(lt),nt()}function vt(){x||lt()}function ut(w,L=!1){var I;if(m=w,h=[],localStorage.setItem("melo-viz-mode",w),!L){const c=window.__TOAST__,A=(I=zt.find(T=>T.id===w))==null?void 0:I.label;c&&A&&c(`Visualizer: ${A}`)}}function yt(){return B||(B=document.createElement("div"),B.className="viz-menu",B.style.display="none",document.body.appendChild(B),B)}function Ct(){const w=yt();w.innerHTML='<div class="viz-menu-label">Visualizer type</div>'+zt.map(L=>`<button class="viz-menu-item ${L.id===m?"active":""}" data-mode="${L.id}">${L.id===m?"✓":""}<span>${L.label}</span></button>`).join(""),w.querySelectorAll("[data-mode]").forEach(L=>{L.addEventListener("click",I=>{I.stopPropagation(),ut(L.dataset.mode),ht()})})}function Lt(w,L){Ct();const I=B;I.style.display="block";const c=I.getBoundingClientRect();I.style.left=Math.max(8,Math.min(w,window.innerWidth-c.width-8))+"px",I.style.top=Math.max(8,Math.min(L,window.innerHeight-c.height-8))+"px"}function ht(){B&&(B.style.display="none")}function bt(){e&&(e.title="Click: next mode • Right-click: choose mode",e.addEventListener("click",()=>{ht();const w=zt.findIndex(L=>L.id===m);ut(zt[(w+1)%zt.length].id)}),e.addEventListener("contextmenu",w=>{w.preventDefault(),w.stopPropagation(),Lt(w.clientX,w.clientY)}))}document.addEventListener("click",w=>{B&&B.style.display!=="none"&&!B.contains(w.target)&&ht()}),document.addEventListener("keydown",w=>{w.key==="Escape"&&ht()});function Z(){X(),vt(),(n==null?void 0:n.state)==="suspended"&&n.resume().catch(()=>{})}t.addEventListener("play",Z),Z(),bt(),document.addEventListener("visibilitychange",()=>{document.hidden?(cancelAnimationFrame(x),x=0):vt()});function wt(){cancelAnimationFrame(x),x=0,e=document.getElementById("vizBars"),e&&(a=O(e),i=a.getContext("2d"),new ResizeObserver(C).observe(a),C(),bt(),vt())}window.__LUMI_REBIND_VISUALIZER__=wt}function de(t){if(!t||!t.trim())return{isSynced:!1,lines:[],raw:""};const e=[],a=t.split(/\r?\n/),i=/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;let n=!1;for(const s of a){const l=s.trim();if(!l||/^\[[a-z]{2,8}:/i.test(l))continue;const g=[...l.matchAll(i)];if(g.length>0){n=!0;const p=l.replace(i,"").trim();for(const r of g){const m=parseInt(r[1],10),x=parseInt(r[2],10),h=r[3]||"0",M=h.length===2?parseInt(h,10)*10:h.length===1?parseInt(h,10)*100:parseInt(h.slice(0,3),10),B=m*60+x+M/1e3;e.push({time:B,text:p})}}else e.push({time:-1,text:l})}return e.sort((s,l)=>s.time-l.time),{isSynced:n,lines:e,raw:t}}function pe(t,e){const a=document.getElementById("lyricsContainer"),i=document.getElementById("lyricsStatus"),n=document.getElementById("lyricsTrackTitle");let s={isSynced:!1,lines:[]},l=-1;async function g(h){if(h.lyrics&&h.lyrics.trim().length>0)return h.lyrics;if(window.__TAURI__)try{const{invoke:M}=await W(async()=>{const{invoke:O}=await import("./core-DhEqZVGG.js");return{invoke:O}},[]),B=await M("get_track_lyrics",{path:h.path});if(B)return B}catch{}return null}async function p(h){if(!h){s={isSynced:!1,lines:[],raw:""},r();return}h.id,n&&(n.textContent=`${h.title} — ${h.artist}`);const M=await g(h);s=de(M||""),r()}function r(){if(a){if(a.innerHTML="",l=-1,!s.lines.length){i&&(i.style.display="block",i.innerHTML='No synced lyrics found (.lrc)<br/><span style="font-size:10.5px; opacity:0.7;">Place a matching .lrc file in the song folder or add lyrics in the tag editor.</span>');return}i&&(i.style.display="none"),s.lines.forEach((h,M)=>{const B=document.createElement("div");B.className="lyric-line",B.dataset.idx=String(M),B.dataset.time=String(h.time),B.textContent=h.text||"♪",h.time>=0&&(B.style.cursor="pointer",B.title=`Seek to ${Math.floor(h.time/60)}:${Math.floor(h.time%60).toString().padStart(2,"0")}`,B.addEventListener("click",()=>{t.currentTime=h.time,t.play().catch(()=>{})})),a.appendChild(B)})}}function m(){if(!a||!s.isSynced||!s.lines.length)return;const h=t.currentTime;let M=-1;for(let B=0;B<s.lines.length&&s.lines[B].time<=h;B++)M=B;if(M!==l){l=M;const B=a.querySelectorAll(".lyric-line");if(B.forEach((O,X)=>{O.classList.toggle("active",X===l),O.classList.toggle("passed",X<l)}),l>=0&&B[l]){const O=B[l],X=a.clientHeight,q=O.offsetTop-a.offsetTop-X/2+O.clientHeight/2;a.scrollTo({top:Math.max(0,q),behavior:"smooth"})}}}t.addEventListener("timeupdate",m),window.addEventListener("lumi:trackChange",h=>{p(h.detail)}),rt("melo:track-changed",h=>{p(h)});const x=window.__LUMI_QUEUE__;Array.isArray(x)&&x.length>0&&p(x[0]),window.LumiLyrics={loadTrackLyrics:p,parseLRC:de}}let It=null;const ue=`<!doctype html>
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
</html>`,me=`<!doctype html>
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
</html>`,ge={"compact-pill-light.html":ue,"compact-pill-dark.html":me,"compact-pill-light":ue,"compact-pill-dark":me},je=[{id:"compact-pill-light",name:"Minimal Compact (Light)",filename:"compact-pill-light.html"},{id:"compact-pill-dark",name:"Minimal Compact (Dark)",filename:"compact-pill-dark.html"},{id:"full-html-example",name:"Full HTML Example",filename:"full-html-example.html"},{id:"example-custom",name:"Custom CSS Example",filename:"example-custom.html"}];function Ae(t){const e=["trackTitle","btnPlay","seekBar","coverImg"];let a=0;for(const i of e)t.includes(i)&&a++;return a>=3}function Dt(t,e){const a=document.getElementById("playerCard");if(!a)return;const i=a._originalHTML||a.innerHTML;a._originalHTML||(a._originalHTML=i),It&&(It.remove(),It=null);let s=[...t.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(x=>x[1]).join(`
`);s&&(It=document.createElement("style"),It.id="melo-custom-skin",It.textContent=s,document.head.appendChild(It));const l=Ae(t);let g="";const p=t.match(/<body[^>]*>([\s\S]*?)<\/body>/i);p?g=p[1]:g=t.split(/<\/style>/i).pop()||"";const r=document.createElement("div");r.innerHTML=g;const m=r.querySelector("#lumi-player");if(m&&(g=m.innerHTML),l&&g.trim().length>20){const x=g.trim();a.innerHTML=x,e&&e("Skin applied"),setTimeout(()=>{var M,B;(M=window.__LUMI_REBIND__)==null||M.call(window);const h=window.__LUMI_AUDIO__;h&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(h),(B=window.__LUMI_REBIND_MAIN__)==null||B.call(window)},40)}else s&&e&&e("Skin CSS applied");localStorage.setItem("lumi-custom-skin",t),localStorage.setItem("lumi-custom-skin-isFull",l?"1":"0")}function jt(t,e=!0){It&&(It.remove(),It=null);const a=document.getElementById("playerCard");a&&a._originalHTML&&(a.innerHTML=a._originalHTML,setTimeout(()=>{var n,s;(n=window.__LUMI_REBIND__)==null||n.call(window);const i=window.__LUMI_AUDIO__;i&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(i),(s=window.__LUMI_REBIND_MAIN__)==null||s.call(window)},40)),localStorage.removeItem("lumi-custom-skin"),localStorage.removeItem("lumi-custom-skin-isFull"),localStorage.setItem("melo-active-skin-id","default"),e&&Y("melo:skin-changed","default"),t&&t("Switched to Default Melo skin")}async function Ce(){if(at)try{const{invoke:t}=await W(async()=>{const{invoke:a}=await import("./core-DhEqZVGG.js");return{invoke:a}},[]),e=await t("list_installed_skins");if(Array.isArray(e)&&e.length>0)return e}catch{}return je}async function Be(t,e){if(at)try{const{invoke:i}=await W(async()=>{const{invoke:s}=await import("./core-DhEqZVGG.js");return{invoke:s}},[]),n=await i("read_skin_file",{filenameOrPath:t});if(n&&n.trim().length>0)return Dt(n,e),!0}catch{}try{const i=t.startsWith("skins/")?t:`skins/${t}`,n=await fetch(i);if(n.ok){const s=await n.text();return Dt(s,e),!0}}catch{}const a=t.replace(/^.*[\\/]/,"");return ge[a]?(Dt(ge[a],e),!0):(e&&e(`Could not load skin: ${t}`),!1)}async function _t(t,e,a,i=!0){if(t==="default"){jt(a,i);return}let n=t;t==="compact-pill"||t.startsWith("compact-pill")?n=e==="dark"?"compact-pill-dark.html":"compact-pill-light.html":!n.endsWith(".html")&&!n.endsWith(".htm")&&(n=n+".html"),await Be(n,a)&&(localStorage.setItem("melo-active-skin-id",t),i&&Y("melo:skin-changed",t))}async function Pe(t){if(at)try{const{invoke:e}=await W(async()=>{const{invoke:a}=await import("./core-DhEqZVGG.js");return{invoke:a}},[]);await e("open_skins_folder"),t&&t("Opening skins folder...")}catch{t&&t("Could not open skins folder")}else t&&t("Skins are located in the skins/ folder")}function Ge(t){const e=document.getElementById("skinUpload"),a=document.getElementById("linkDownloadExample");a&&a.addEventListener("click",s=>{s.preventDefault(),Be("compact-pill-light.html")});const i=localStorage.getItem("melo-active-skin-id")||"default",n=localStorage.getItem("lumi-theme")||"dark";i!=="default"&&setTimeout(()=>{_t(i,n,void 0,!1)},150),rt("melo:theme",s=>{const l=localStorage.getItem("melo-active-skin-id");l&&l!=="default"&&_t(l,s,void 0,!1)}),rt("melo:skin-changed",s=>{if(s&&typeof s=="string"){const l=localStorage.getItem("lumi-theme")||"dark";_t(s,l,void 0,!1)}}),e&&e.addEventListener("change",async()=>{var p;const s=(p=e.files)==null?void 0:p[0];if(!s)return;const l=await s.text(),g=s.name;if(at)try{const{invoke:r}=await W(async()=>{const{invoke:m}=await import("./core-DhEqZVGG.js");return{invoke:m}},[]);await r("save_custom_skin_file",{filename:g,content:l}),t(`Saved ${g} to skins folder`)}catch{}Dt(l,t),localStorage.setItem("melo-active-skin-id",g),Y("melo:skin-changed",g),e.value=""}),document.addEventListener("dragover",s=>{var l;[...((l=s.dataTransfer)==null?void 0:l.types)||[]].includes("Files")&&s.preventDefault()}),document.addEventListener("drop",async s=>{var g;const l=[...((g=s.dataTransfer)==null?void 0:g.files)||[]].find(p=>p.name.endsWith(".html")||p.name.endsWith(".htm"));if(l){s.preventDefault();const p=await l.text();if(p.includes("<style")||p.includes("<html")||Ae(p)){const r=l.name;if(at)try{const{invoke:m}=await W(async()=>{const{invoke:x}=await import("./core-DhEqZVGG.js");return{invoke:x}},[]);await m("save_custom_skin_file",{filename:r,content:p})}catch{}Dt(p,t),localStorage.setItem("melo-active-skin-id",r),Y("melo:skin-changed",r)}}}),window.LumiSkin={applyCustomSkin:Dt,resetSkin:jt,applySkinChoice:_t,listInstalledSkins:Ce,openSkinsFolderOnDisk:Pe}}const ze=document.querySelector("#app");ze.innerHTML=`
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
`;const ct=new URLSearchParams(location.search).get("panel");var ye,be;if(at&&ct){W(async()=>{const{getCurrentWindow:i}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:i}},__vite__mapDeps([8,7,1,0])).then(({getCurrentWindow:i})=>{const n=i();Xe(n,"melo-geo-panel-"+ct),n.onCloseRequested(()=>{Y("melo:panel-closed",ct)}),window.addEventListener("beforeunload",()=>{Y("melo:panel-closed",ct)})});const t=document.getElementById("win-"+ct),e=((ye=t==null?void 0:t.querySelector(".float-title"))==null?void 0:ye.innerHTML)||"",a=((be=t==null?void 0:t.querySelector(".float-body"))==null?void 0:be.innerHTML)||"";ze.innerHTML=`
<div class="panel-root">
  <div class="panel-titlebar">${e}</div>
  <div class="panel-body">${a}</div>
  <div id="toast" class="toast"></div>
</div>`}at&&!ct&&(document.documentElement.classList.add("tauri-main"),document.body.classList.add("tauri-main"),document.querySelectorAll(".side-actions .sbtn").forEach(t=>t.classList.remove("active")),W(async()=>{const{WebviewWindow:t}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:t}},__vite__mapDeps([6,7,1,0,8])).then(({WebviewWindow:t})=>{const e=async()=>{var a;for(const i of["library","playlist","equalizer","settings"])try{const n=await t.getByLabel("panel-"+i);(a=document.getElementById(Zt[i]))==null||a.classList.toggle("active",!!n)}catch{}};e(),setInterval(e,1200)}));at&&!ct&&(W(()=>import("./window-BWd3Cypy.js"),__vite__mapDeps([8,7,1,0])).then(async({getCurrentWindow:t})=>{const e=t(),a=()=>{const n=localStorage.getItem("melo-active-skin-id"),s=n==="compact-pill"||typeof n=="string"&&n.startsWith("compact-pill");return{w:s?780:960,h:s?138:240}};try{const n=JSON.parse(localStorage.getItem("melo-geo-main")||"null"),{LogicalPosition:s,LogicalSize:l}=await W(async()=>{const{LogicalPosition:p,LogicalSize:r}=await import("./dpi-fvP-W2qr.js");return{LogicalPosition:p,LogicalSize:r}},__vite__mapDeps([7,1])),g=a();await e.setSize(new l(n!=null&&n.w?Math.max(650,n.w):g.w,g.h)),(n==null?void 0:n.x)!=null&&(n==null?void 0:n.y)!=null&&await e.setPosition(new s(n.x,n.y))}catch{}const i=async()=>{try{const n=await e.outerPosition(),s=await e.innerSize(),l=a();localStorage.setItem("melo-geo-main",JSON.stringify({x:n.x,y:n.y,w:s.width,h:l.h}))}catch{}};e.onMoved(i),e.onResized(async()=>{try{const n=await e.innerSize(),s=a(),{LogicalSize:l}=await W(async()=>{const{LogicalSize:g}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:g}},__vite__mapDeps([7,1]));(n.width<650||n.height!==s.h)&&await e.setSize(new l(Math.max(650,n.width),s.h))}catch{}i()}),rt("melo:skin-changed",async n=>{try{!ct&&n&&await _t(n,ft,void 0,!1);const s=n==="compact-pill"||typeof n=="string"&&n.startsWith("compact-pill"),l=s?780:960,g=s?138:240,{LogicalSize:p}=await W(async()=>{const{LogicalSize:r}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:r}},__vite__mapDeps([7,1]));await e.setSize(new p(l,g)),i()}catch{}}),e.onCloseRequested(async n=>{n.preventDefault();const{WebviewWindow:s}=await W(async()=>{const{WebviewWindow:l}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:l}},__vite__mapDeps([6,7,1,0,8]));for(const l of["library","playlist","equalizer","settings"])try{const g=await s.getByLabel("panel-"+l);g&&await g.close()}catch{}try{await e.destroy()}catch{window.close()}})}),W(()=>import("./core-DhEqZVGG.js"),[]).then(async({invoke:t})=>{try{const e=await t("get_cli_tracks");if(Array.isArray(e)&&e.length>0){const a=window.LumiLibrary,i=window.LumiPlayer;e.forEach(n=>n.source="import"),a==null||a.addToCurrentPlaylist(e),e.forEach(n=>i==null?void 0:i.queue.push(n)),setTimeout(()=>{if(i&&i.queue.length>0){const n=i.queue.findIndex(s=>s.id===e[0].id);i.loadTrack(n>=0?n:0,!0)}},150)}}catch{}}),rt("melo:open-files",t=>{if(Array.isArray(t)&&t.length>0){const e=window.LumiLibrary,a=window.LumiPlayer;t.forEach(i=>i.source="import"),e==null||e.addToCurrentPlaylist(t),t.forEach(i=>a==null?void 0:a.queue.push(i)),tt(`Playing ${t[0].title}`),setTimeout(()=>{if(a&&a.queue.length>0){const i=a.queue.findIndex(n=>n.id===t[0].id);a.loadTrack(i>=0?i:0,!0)}},150)}}));document.addEventListener("contextmenu",t=>{t.preventDefault()});const Ft=document.getElementById("toast"),tt=t=>{Ft&&(Ft.textContent=t,Ft.classList.add("show"),setTimeout(()=>Ft.classList.remove("show"),2200))},St=new Audio;St.preload="metadata";window.__LUMI_AUDIO__=St;window.__TOAST__=tt;let ft=localStorage.getItem("lumi-theme")||"dark";function Gt(t){document.documentElement.setAttribute("data-theme",t),localStorage.setItem("lumi-theme",t),ft=t}function Kt(t){Gt(t),Y("melo:theme",t)}Gt(ft);rt("melo:theme",t=>{(t==="light"||t==="dark")&&Gt(t)});setInterval(()=>{const t=localStorage.getItem("lumi-theme");(t==="light"||t==="dark")&&t!==ft&&Gt(t)},1e3);const Ye=["win-library","win-playlist","win-equalizer","win-lyrics","win-settings"],Wt=document.getElementById("desktop"),Re={btnToggleLibrary:"win-library",btnTogglePlaylist:"win-playlist",btnToggleEq:"win-equalizer",btnToggleLyrics:"win-lyrics",btnOpenSettings:"win-settings",menuToggleLibrary:"win-library",menuTogglePlaylist:"win-playlist",menuToggleEq:"win-equalizer",menuToggleLyrics:"win-lyrics",menuToggleSettings:"win-settings"};function Je(t){const e=document.getElementById(t);return!!e&&!e.classList.contains("hidden")}const Zt={library:"btnToggleLibrary",playlist:"btnTogglePlaylist",equalizer:"btnToggleEq",lyrics:"btnToggleLyrics",settings:"btnOpenSettings"};async function Xe(t,e){const a=async()=>{try{const i=await t.outerPosition(),n=await t.outerSize();localStorage.setItem(e,JSON.stringify({x:i.x,y:i.y,w:n.width,h:n.height}))}catch{}};t.onMoved(a),t.onResized(a)}async function Qe(t){const{WebviewWindow:e}=await W(async()=>{const{WebviewWindow:m}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:m}},__vite__mapDeps([6,7,1,0,8])),a="panel-"+t,i=document.getElementById(Zt[t]),n=await e.getByLabel(a);if(n){await n.close(),i==null||i.classList.remove("active");return}const s={library:[430,620],playlist:[440,560],equalizer:[700,440],lyrics:[380,520],settings:[600,540]},l={library:[360,400],playlist:[360,360],equalizer:[620,400],lyrics:[320,360],settings:[500,400]},g={library:"Library",playlist:"Playlist",equalizer:"Equalizer",lyrics:"Synced Lyrics",settings:"Settings"},p=s[t]||[420,520];let r=null;try{r=JSON.parse(localStorage.getItem("melo-geo-panel-"+t)||"null")}catch{}new e(a,{url:`/?panel=${t}`,title:g[t]||t,width:(r==null?void 0:r.w)||p[0],height:(r==null?void 0:r.h)||p[1],minWidth:(l[t]||[360,360])[0],minHeight:(l[t]||[360,360])[1],...(r==null?void 0:r.x)!=null?{x:r.x,y:r.y}:{center:!0},decorations:!0,skipTaskbar:!0}),i==null||i.classList.add("active"),Y("melo:theme",ft)}rt("melo:panel-closed",t=>{var a;const e=Zt[t];e&&((a=document.getElementById(e))==null||a.classList.remove("active"))});function te(t){if(at){Qe(t.replace(/^win-/,""));return}const e=Je(t);Ht(t,!e),e||Yt(document.getElementById(t))}function Ke(t){if(t.classList.contains("hidden")||!Wt||window.matchMedia("(max-width: 860px)").matches)return;const e=Wt.getBoundingClientRect();if(e.width<=0||e.height<=0)return;const a=t.getBoundingClientRect(),i=Math.min(a.width,e.width),n=Math.min(a.height,e.height);let s=a.left-e.left,l=a.top-e.top;s=Math.max(0,Math.min(e.width-i,s)),l=Math.max(0,Math.min(e.height-n,l)),t.style.left=s+"px",t.style.top=l+"px",t.style.right="auto",t.style.bottom="auto",t.style.transform="none"}function Ht(t,e){var n,s,l,g,p,r,m,x,h,M;const a=document.getElementById(t);if(!a)return;a.classList.toggle("hidden",!e),localStorage.setItem("lumiv2-"+t,e?"1":"0"),e&&Ke(a);const i=e;t==="win-library"&&((n=document.getElementById("btnToggleLibrary"))==null||n.classList.toggle("active",i),(s=document.getElementById("menuToggleLibrary"))==null||s.classList.toggle("active",i)),t==="win-playlist"&&((l=document.getElementById("btnTogglePlaylist"))==null||l.classList.toggle("active",i),(g=document.getElementById("menuTogglePlaylist"))==null||g.classList.toggle("active",i)),t==="win-equalizer"&&((p=document.getElementById("btnToggleEq"))==null||p.classList.toggle("active",i),(r=document.getElementById("menuToggleEq"))==null||r.classList.toggle("active",i)),t==="win-lyrics"&&((m=document.getElementById("btnToggleLyrics"))==null||m.classList.toggle("active",i),(x=document.getElementById("menuToggleLyrics"))==null||x.classList.toggle("active",i)),t==="win-settings"&&((h=document.getElementById("btnOpenSettings"))==null||h.classList.toggle("active",i),(M=document.getElementById("menuToggleSettings"))==null||M.classList.toggle("active",i))}ct||Ye.forEach(t=>{const e=localStorage.getItem("lumiv2-"+t);e!==null?Ht(t,e==="1"):t==="win-settings"?Ht(t,!1):Ht(t,!0)});Object.entries(Re).forEach(([t,e])=>{var a;(a=document.getElementById(t))==null||a.addEventListener("click",()=>te(e))});document.querySelectorAll("[data-close]").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.close;Ht(e,!1)})});let gt=null,Et=null,ve=10;function Yt(t){ve++,t.style.zIndex=String(ve),document.querySelectorAll(".float-win").forEach(e=>e.classList.remove("active")),t.classList.add("active")}document.querySelectorAll(".float-win").forEach(t=>{t.addEventListener("mousedown",()=>Yt(t))});document.querySelectorAll("[data-drag]").forEach(t=>{t.addEventListener("mousedown",e=>{if(e.target.closest("button")||e.target.closest("input")||e.target.closest("select"))return;const a=t.dataset.drag,i=document.getElementById(a);Yt(i),i.classList.add("dragging");const n=i.getBoundingClientRect();gt={id:a,startX:e.clientX,startY:e.clientY,initX:n.left,initY:n.top,width:n.width,height:n.height}})});document.querySelectorAll("[data-resize]").forEach(t=>{t.addEventListener("mousedown",e=>{e.stopPropagation();const a=t.dataset.resize,i=document.getElementById(a);Yt(i),i.classList.add("resizing");const n=i.getBoundingClientRect();Et={id:a,startX:e.clientX,startY:e.clientY,initW:n.width,initH:n.height}})});window.addEventListener("mousemove",t=>{if(gt){const e=document.getElementById(gt.id);let a=t.clientX-gt.startX,i=t.clientY-gt.startY,n=gt.initX+a,s=gt.initY+i;if(Wt&&!window.matchMedia("(max-width: 860px)").matches){const l=Wt.getBoundingClientRect(),g=l.left,p=l.right-gt.width,r=l.top,m=l.bottom-gt.height;n=Math.max(g,Math.min(p,n))-l.left,s=Math.max(r,Math.min(m,s))-l.top}e.style.left=n+"px",e.style.top=s+"px",e.style.right="auto",e.style.bottom="auto",e.style.transform="none"}if(Et){const e=document.getElementById(Et.id);let a=Et.initW+(t.clientX-Et.startX),i=Et.initH+(t.clientY-Et.startY);a=Math.max(260,a),i=Math.max(160,i),e.style.width=a+"px",e.style.height=i+"px"}});window.addEventListener("mouseup",()=>{if(gt){const t=document.getElementById(gt.id);t&&(t.classList.remove("dragging"),localStorage.setItem("lumiv2-pos-"+gt.id,JSON.stringify({left:t.style.left,top:t.style.top}))),gt=null}if(Et){const t=document.getElementById(Et.id);t&&(t.classList.remove("resizing"),localStorage.setItem("lumiv2-size-"+Et.id,JSON.stringify({width:t.style.width,height:t.style.height}))),Et=null}});let pt=document.getElementById("appMenuBtn"),H=document.getElementById("appMenu");function Ze(){const t=H==null?void 0:H.classList.toggle("open");pt==null||pt.classList.toggle("open",!!t)}pt==null||pt.addEventListener("click",t=>{t.stopPropagation(),Ze()});document.addEventListener("click",t=>{H&&!H.contains(t.target)&&t.target!==pt&&(H.classList.remove("open"),pt==null||pt.classList.remove("open"))});document.addEventListener("keydown",t=>{t.key==="Escape"&&(H==null||H.classList.remove("open"),pt==null||pt.classList.remove("open"))});var we;(we=document.getElementById("menuCustomSkin"))==null||we.addEventListener("click",()=>{var t;(t=document.getElementById("skinUpload"))==null||t.click(),H==null||H.classList.remove("open")});var xe;(xe=document.getElementById("menuSkinDefault"))==null||xe.addEventListener("click",()=>{jt(tt);const t=document.getElementById("skinSelect");t&&(t.value="default"),H==null||H.classList.remove("open")});var ke;(ke=document.getElementById("menuSkinCompact"))==null||ke.addEventListener("click",()=>{_t("compact-pill",ft,tt);const t=document.getElementById("skinSelect");t&&(t.value="compact-pill"),H==null||H.classList.remove("open")});var Ee;(Ee=document.getElementById("menuThemeToggle"))==null||Ee.addEventListener("click",()=>{Kt(ft==="light"?"dark":"light"),H==null||H.classList.remove("open")});var Le;(Le=document.getElementById("menuAbout"))==null||Le.addEventListener("click",()=>{tt("Melo 0.3 Beta — Tauri 2 + TypeScript + Rust"),H==null||H.classList.remove("open")});async function De(){const t=window.LumiLibrary,e=window.LumiPlayer;if(at){try{const{open:i}=await W(async()=>{const{open:p}=await import("./index-CS3Qnt9j.js");return{open:p}},__vite__mapDeps([5,1])),n=await i({multiple:!0,filters:[{name:"Audio",extensions:["mp3","flac","wav","aac","ogg","m4a","alac","opus","wma","aiff"]}]});if(!n)return;const s=Array.isArray(n)?n:[n],{invoke:l}=await W(async()=>{const{invoke:p}=await import("./core-DhEqZVGG.js");return{invoke:p}},[]),g=[];for(const p of s)try{const r=await l("scan_library",{path:p});if(r&&r.length)r.forEach(m=>m.source="import"),g.push(...r);else{const m=p.replace(/^.*[\\/]/,""),x=m.lastIndexOf("."),h=x>0?m.slice(0,x):m,M=x>0?m.slice(x+1).toUpperCase():"AUDIO";g.push({id:p,title:h,artist:"Unknown Artist",album:"Single",duration:0,path:p,codec:M,specs:"Local File",source:"import"})}}catch{const r=p.replace(/^.*[\\/]/,""),m=r.lastIndexOf("."),x=m>0?r.slice(0,m):r,h=m>0?r.slice(m+1).toUpperCase():"AUDIO";g.push({id:p,title:x,artist:"Unknown Artist",album:"Single",duration:0,path:p,codec:h,specs:"Local File",source:"import"})}t==null||t.addTracks(g,!0),t==null||t.addToCurrentPlaylist(g),g.forEach(p=>e==null?void 0:e.queue.push(p)),Y("melo:play-tracks",{tracks:g,index:0}),tt(`${g.length} file(s) added`)}catch{tt("Error opening files")}H==null||H.classList.remove("open");return}const a=document.createElement("input");a.type="file",a.multiple=!0,a.accept="audio/*,.mp3,.flac,.wav,.aac,.ogg,.m4a,.alac,.opus,.wma,.aiff",a.onchange=async()=>{const i=Array.from(a.files||[]);if(!i.length)return;const n=[];for(const s of i){const l=s.path,g=l||URL.createObjectURL(s),p=s.name,r=p.lastIndexOf("."),m=r>0?p.slice(0,r):p,x=r>0?p.slice(r+1).toUpperCase():"AUDIO",h={id:l||"imp_"+Math.random().toString(36).slice(2,9),title:m,artist:"Unknown Artist",album:"Single",duration:0,path:g,codec:x,specs:"Local File",source:"import"};await $t(s,h),n.push(h)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(s=>e==null?void 0:e.queue.push(s)),Y("melo:play-tracks",{tracks:n,index:0}),tt(`${n.length} file(s) added`)},a.click(),H==null||H.classList.remove("open")}async function qe(){const t=window.LumiLibrary,e=window.LumiPlayer;if(at){try{const{open:i}=await W(async()=>{const{open:r}=await import("./index-CS3Qnt9j.js");return{open:r}},__vite__mapDeps([5,1])),n=await i({directory:!0});if(!n)return;const s=n,{invoke:l}=await W(async()=>{const{invoke:r}=await import("./core-DhEqZVGG.js");return{invoke:r}},[]),p=(await l("scan_library",{path:s})).map(r=>({...r,source:"import"}));t==null||t.addTracks(p,!0),t==null||t.addToCurrentPlaylist(p),p.forEach(r=>e==null?void 0:e.queue.push(r)),Y("melo:play-tracks",{tracks:p,index:0}),tt(`${p.length} track(s) added from folder`)}catch{tt("Error scanning folder")}H==null||H.classList.remove("open");return}const a=document.createElement("input");a.type="file",a.webkitdirectory=!0,a.multiple=!0,a.accept="audio/*",a.onchange=async()=>{const i=Array.from(a.files||[]).filter(s=>/\.(mp3|flac|wav|aac|ogg|m4a|alac|opus|wma|aiff)$/i.test(s.name));if(!i.length)return;const n=[];for(const s of i){const l=s.path,g=l||URL.createObjectURL(s),p=s.name,r=p.lastIndexOf("."),m=r>0?p.slice(0,r):p,x=r>0?p.slice(r+1).toUpperCase():"AUDIO",h={id:l||"imp_"+Math.random().toString(36).slice(2,9),title:m,artist:"Unknown Artist",album:"Folder Import",duration:0,path:g,codec:x,specs:"Local File",source:"import"};await $t(s,h),n.push(h)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(s=>e==null?void 0:e.queue.push(s)),Y("melo:play-tracks",{tracks:n,index:0}),tt(`${n.length} file(s) added from folder`)},a.click(),H==null||H.classList.remove("open")}var Se;(Se=document.getElementById("btnAddFiles"))==null||Se.addEventListener("click",De);var Ie;(Ie=document.getElementById("btnAddFolder"))==null||Ie.addEventListener("click",qe);var Me;(Me=document.getElementById("btnThemeToggle"))==null||Me.addEventListener("click",()=>{Kt(ft==="light"?"dark":"light")});window.addEventListener("keydown",t=>{(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="o"&&(t.shiftKey?(t.preventDefault(),qe()):(t.preventDefault(),De())),((t.ctrlKey||t.metaKey)&&t.key===","||t.key==="F2")&&(t.preventDefault(),te("win-settings"))});function he(t){var B,O,X;function e(P){document.querySelectorAll(".settings-tab").forEach(q=>{q.classList.toggle("active",q.dataset.stab===P)}),document.querySelectorAll(".settings-section[data-panel]").forEach(q=>{q.classList.toggle("active",q.dataset.panel===P)}),localStorage.setItem("melo-settings-tab",P)}document.querySelectorAll(".settings-tab").forEach(P=>{P.addEventListener("click",()=>e(P.dataset.stab))}),e(localStorage.getItem("melo-settings-tab")||"general"),document.querySelectorAll(".switch[data-key]").forEach(P=>{const q=P.dataset.key,G=localStorage.getItem("melo-pref-"+q);G!==null&&P.classList.toggle("on",G==="1"),P.onclick=()=>{P.classList.toggle("on");const F=P.classList.contains("on");localStorage.setItem("melo-pref-"+q,F?"1":"0"),t(F?"Enabled":"Disabled"),Y("melo:pref-changed",{key:q,value:F})}});const a=document.getElementById("setCrossfade"),i=document.getElementById("crossfadeVal");if(a){const P=localStorage.getItem("melo-pref-crossfade")||"0";a.value=P,i&&(i.textContent=P+"s"),a.oninput=()=>{const q=a.value;i&&(i.textContent=q+"s"),localStorage.setItem("melo-pref-crossfade",q)}}const n=document.getElementById("setLanguage");if(n){const P=localStorage.getItem("melo-pref-lang")||"en";n.value=P,n.onchange=()=>{localStorage.setItem("melo-pref-lang",n.value),t(`Language set to ${n.options[n.selectedIndex].text}`)}}const s=document.getElementById("swDynamicTheme");if(s){const P=localStorage.getItem("melo-dynamic-theme")!=="0";s.classList.toggle("on",P),s.onclick=()=>{var $,b;const q=!s.classList.contains("on");s.classList.toggle("on",q),localStorage.setItem("melo-dynamic-theme",q?"1":"0");const G=window.__LUMI_QUEUE__,F=(b=($=window.LumiPlayer)==null?void 0:$.currentIndex)!=null?b:0;G&&G[F]&&Te(q?G[F].cover:null),t(q?"Dynamic theme enabled":"Dynamic theme disabled")}}const l=document.getElementById("skinSelect"),g=document.getElementById("btnSkinThemeToggle"),p=document.getElementById("btnRefreshSkins"),r=document.getElementById("btnOpenSkinsFolder"),m=document.getElementById("skinThemeIcon"),x=document.getElementById("skinThemeLabel");function h(P){m&&(m.textContent=P==="dark"?"🌙":"☀️"),x&&(x.textContent=P==="dark"?"Dark":"Light")}h(ft),g==null||g.addEventListener("click",()=>{const P=ft==="dark"?"light":"dark";Kt(P),h(P),t(P==="dark"?"Dark theme":"Light theme")}),rt("melo:theme",P=>{(P==="light"||P==="dark")&&h(P)});async function M(){if(!l)return;const P=localStorage.getItem("melo-active-skin-id")||"default",q=await Ce();l.innerHTML=`
      <option value="default">Default Melo (Standard)</option>
      <option value="compact-pill">Minimal Compact (Pill Bar)</option>
    `,q.forEach(G=>{if(G.filename!=="compact-pill-light.html"&&G.filename!=="compact-pill-dark.html"){const F=document.createElement("option");F.value=G.filename,F.textContent=`${G.name} (${G.filename})`,l.appendChild(F)}}),l.value=P}M(),l&&(l.onchange=()=>{const P=l.value;_t(P,ft,t)}),p==null||p.addEventListener("click",async()=>{await M();const P=localStorage.getItem("melo-active-skin-id")||"default";_t(P,ft,t),t("Skins reloaded from disk")}),r==null||r.addEventListener("click",()=>{Pe(t)}),(B=document.getElementById("btn-reset-skin-settings"))==null||B.addEventListener("click",()=>{jt(t),l&&(l.value="default")}),(O=document.getElementById("btn-settings-reset"))==null||O.addEventListener("click",()=>{localStorage.clear(),t("Settings reset — reloading..."),setTimeout(()=>location.reload(),600)}),(X=document.getElementById("btnChooseFolder"))==null||X.addEventListener("click",async()=>{if(at)try{const{open:P}=await W(async()=>{const{open:G}=await import("./index-CS3Qnt9j.js");return{open:G}},__vite__mapDeps([5,1])),q=await P({directory:!0});q&&(document.getElementById("setMusicFolder").value=q,localStorage.setItem("melo-pref-music-folder",q),t("Music folder updated"))}catch{}else t("Folder selection dialog requires Tauri build")})}function Oe(){document.querySelectorAll(".win-btn").forEach(t=>{t.onclick=async()=>{const e=t.getAttribute("aria-label");if(window.__TAURI__){const{getCurrentWindow:a}=await W(async()=>{const{getCurrentWindow:n}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:n}},__vite__mapDeps([8,7,1,0])),i=a();e==="minimize"?i.minimize():e==="maximize"?i.toggleMaximize():e==="close"&&i.close()}else e==="close"&&tt("Window close requires the Tauri desktop build"),e==="maximize"&&tt("Resize: drag corner handle")}})}Oe();window.__LUMI_REBIND_MAIN__=()=>{const t=document.getElementById("appMenuBtn"),e=document.getElementById("appMenu");t&&e&&(pt=t,H=e,t.onclick=a=>{a.stopPropagation(),e.classList.toggle("open"),t.classList.toggle("open",e.classList.contains("open"))}),Oe(),Object.entries(Re).forEach(([a,i])=>{const n=document.getElementById(a);n&&(n.onclick=()=>te(i))})};const Rt=document.createElement("div");Rt.id="scanBar";document.body.appendChild(Rt);let fe=0;rt("melo:scan-progress",t=>{if(!t)return;const e=t.total?Math.round(t.done/t.total*100):100;Rt.style.opacity="1",Rt.style.width=e+"%",clearTimeout(fe),(t.finished||t.total&&t.done>=t.total)&&(fe=setTimeout(()=>{Rt.style.opacity="0",Rt.style.width="0"},800))});at&&!ct&&rt("melo:scan-batch",t=>{const e=window.LumiLibrary;e&&Array.isArray(t)&&t.length&&(t.forEach(a=>a.source="scan"),e.addTracks(t,!0),e.addToCurrentPlaylist(t))});const At=document.createElement("div");At.id="aboutPop";At.style.display="none";document.body.appendChild(At);var _e;(_e=document.getElementById("btnAbout"))==null||_e.addEventListener("click",t=>{var e;t.stopPropagation(),At.innerHTML=`
    <div class="about-head">Melo <b>0.3 Beta</b></div>
    <div style="font-size:11.5px; color:var(--text-soft); margin:6px 0 10px;">
      Modern Windows Music Player<br/>
      Tauri 2 + TypeScript + Rust
    </div>
    <a class="about-link" id="aboutLink" href="https://github.com/Arvanta/Melo" rel="noopener">github.com/Arvanta/Melo ↗</a>`,At.style.display=At.style.display==="none"?"block":"none",(e=document.getElementById("aboutLink"))==null||e.addEventListener("click",a=>{a.preventDefault();const i="https://github.com/Arvanta/Melo";at?W(()=>import("./core-DhEqZVGG.js"),[]).then(n=>n.invoke("open_url",{url:i})).catch(()=>window.open(i,"_blank")):window.open(i,"_blank")})});document.addEventListener("click",t=>{!t.target.closest("#aboutPop")&&!t.target.closest("#btnAbout")&&(At.style.display="none")});at&&ct?ct==="library"||ct==="playlist"?re(St,tt):ct==="equalizer"?ce(St,tt,{remote:!0}):ct==="lyrics"?pe(St):ct==="settings"&&he(tt):(Ne(St,tt),re(St,tt),ce(St,tt),We(St),pe(St),Ge(tt),he(tt));tt("Melo 0.3 Beta is ready");
