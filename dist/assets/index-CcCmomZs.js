const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/event-CNdo2oXa.js","assets/core-DhEqZVGG.js","assets/index-DiyoAAdc.js","assets/index-CHth0gh2.js","assets/index-Bq0iOnRE.js","assets/index-CS3Qnt9j.js","assets/webviewWindow-mjQkSB26.js","assets/dpi-fvP-W2qr.js","assets/window-BWd3Cypy.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const s of l.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function a(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerPolicy&&(l.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?l.credentials="include":n.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(n){if(n.ep)return;n.ep=!0;const l=a(n);fetch(n.href,l)}})();const He="modulepreload",Ve=function(t){return"/"+t},ne={},N=function(e,a,i){let n=Promise.resolve();if(a&&a.length>0){let s=function(r){return Promise.all(r.map(v=>Promise.resolve(v).then(w=>({status:"fulfilled",value:w}),w=>({status:"rejected",reason:w}))))};document.getElementsByTagName("link");const g=document.querySelector("meta[property=csp-nonce]"),p=(g==null?void 0:g.nonce)||(g==null?void 0:g.getAttribute("nonce"));n=s(a.map(r=>{if(r=Ve(r),r in ne)return;ne[r]=!0;const v=r.endsWith(".css"),w=v?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${w}`))return;const f=document.createElement("link");if(f.rel=v?"stylesheet":He,v||(f.as="script"),f.crossOrigin="",f.href=r,p&&f.setAttribute("nonce",p),document.head.appendChild(f),v)return new Promise((M,z)=>{f.addEventListener("load",M),f.addEventListener("error",()=>z(new Error(`Unable to preload CSS for ${r}`)))})}))}function l(s){const g=new Event("vite:preloadError",{cancelable:!0});if(g.payload=s,window.dispatchEvent(g),!g.defaultPrevented)throw s}return n.then(s=>{for(const g of s||[])g.status==="rejected"&&l(g.reason);return e().catch(l)})},It=typeof window.__TAURI_INTERNALS__<"u"||typeof window.__TAURI__<"u";async function Y(t,e){if(It)try{const{emit:a}=await N(async()=>{const{emit:i}=await import("./event-CNdo2oXa.js");return{emit:i}},__vite__mapDeps([0,1]));await a(t,e)}catch{window.dispatchEvent(new CustomEvent(t,{detail:e}))}else window.dispatchEvent(new CustomEvent(t,{detail:e}))}function st(t,e){It?N(async()=>{const{listen:a}=await import("./event-CNdo2oXa.js");return{listen:a}},__vite__mapDeps([0,1])).then(({listen:a})=>{a(t,i=>e(i.payload))}).catch(()=>{window.addEventListener(t,a=>e(a.detail))}):window.addEventListener(t,a=>e(a.detail))}let oe=!1;async function Ne(){if(!oe){oe=!0;try{const t=globalThis;if(typeof t.Buffer>"u"){const e=await N(()=>import("./index-DiyoAAdc.js").then(a=>a.i),__vite__mapDeps([2,3]));t.Buffer=e.Buffer}typeof t.process>"u"&&(t.process={env:{},browser:!0,nextTick:e=>setTimeout(e,0)})}catch{}}}async function Fe(t,e){var a;try{await Ne();const i=await N(()=>import("./index-Bq0iOnRE.js").then(r=>r.i),__vite__mapDeps([4,3])),n=i&&typeof i.parseBlob=="function"?i:i.default||i,l=await Promise.race([n.parseBlob(t),new Promise((r,v)=>setTimeout(()=>v(new Error("timeout")),1800))]),s=l==null?void 0:l.common;if(!s)return;s.title&&(e.title=s.title),s.artist?e.artist=s.artist:s.artists&&s.artists[0]&&(e.artist=s.artists[0]),s.album&&(e.album=s.album),s.genre&&s.genre[0]&&(e.genre=s.genre[0]),s.year&&(e.year=s.year);const g=(a=s.picture)==null?void 0:a[0];if(g&&g.data){const r=g.format||"image/jpeg",v=g.data;if(v.length>6e5)return;let w="";const f=8192;for(let M=0;M<v.length;M+=f){const z=v.subarray(M,M+f);w+=String.fromCharCode.apply(null,z)}e.cover=`data:${r};base64,${btoa(w)}`}const p=l==null?void 0:l.format;p&&p.duration&&!e.duration&&(e.duration=Math.floor(p.duration))}catch{}}async function Ot(t,e,a=1800){return await Fe(t,e),e}async function We(t){return new Promise(e=>{if(!t)return e(null);const a=new Image;a.crossOrigin="anonymous",a.onload=()=>{try{const i=document.createElement("canvas"),n=i.getContext("2d");if(!n)return e(null);i.width=40,i.height=40,n.drawImage(a,0,0,40,40);const l=n.getImageData(0,0,40,40).data;let s={r:42,g:123,b:214},g=-1;for(let p=0;p<l.length;p+=4){const r=l[p],v=l[p+1],w=l[p+2];if(l[p+3]<128)continue;const M=Math.max(r,v,w),z=Math.min(r,v,w),q=(M+z)/510,K=M-z,B=K===0?0:K/(1-Math.abs(2*q-1));if(B>.25&&q>.25&&q<.82){const D=B*1.5+(1-Math.abs(q-.5));D>g&&(g=D,s={r,g:v,b:w})}}g>0?e(s):e(null)}catch{e(null)}},a.onerror=()=>e(null),a.src=t})}async function _e(t){const e=localStorage.getItem("melo-dynamic-theme")!=="0",a=document.documentElement;if(!e||!t){a.style.removeProperty("--accent"),a.style.removeProperty("--visualizer"),a.style.removeProperty("--accent-glow");return}const i=await We(t);if(i){const n=`rgb(${i.r}, ${i.g}, ${i.b})`;a.style.setProperty("--accent",n),a.style.setProperty("--visualizer",n),a.style.setProperty("--accent-glow",`rgba(${i.r}, ${i.g}, ${i.b}, 0.35)`)}else a.style.removeProperty("--accent"),a.style.removeProperty("--visualizer"),a.style.removeProperty("--accent-glow")}function je(t,e){let a,i,n,l,s,g,p,r=null,v,w,f,M,z,q,K,B,D,J,O,V,b,x=[],T=0,G=!1,W="off",ot=!1;window.__LUMI_QUEUE__=x,window.__LUMI_SET_QUEUE__=d=>{x=d,window.__LUMI_QUEUE__=d};function et(d){if(!isFinite(d))return"0:00";const X=Math.floor(d/60),k=Math.floor(d%60).toString().padStart(2,"0");return`${X}:${k}`}function lt(){if(!v)return;const d=parseFloat(v.value)/parseFloat(v.max)*100;v.style.setProperty("--progress",d+"%")}function rt(){w&&w.style.setProperty("--vol",w.value+"%")}async function ft(d){if(/^(https?|data|blob):/.test(d))return d;if(window.__TAURI__)try{const{convertFileSrc:X}=await N(async()=>{const{convertFileSrc:k}=await import("./core-DhEqZVGG.js");return{convertFileSrc:k}},[]);return X(d)}catch{}return d}async function ct(d,X=!0){d<0&&(d=x.length-1),d>=x.length&&(d=0),T=d;const k=x[d];if(!k)return;q||C(),t.src=await ft(k.path),t.load(),q&&(q.textContent=k.title),K&&(K.textContent=k.artist),B&&(B.textContent=k.album),D&&(D.textContent=k.codec),J&&(J.textContent=k.specs),k.cover&&O?(O.src=k.cover,O.style.display="block",V&&(V.style.display="none")):(O&&(O.style.display="none"),V&&(V.style.display="grid")),v&&(v.max=String(k.duration||276),v.value="0",lt()),M&&(M.textContent=et(k.duration)),f&&(f.textContent="0:00"),$(),_e(k.cover||null),document.querySelectorAll(".track-row").forEach((Q,Z)=>{var mt;Q.classList.toggle("active",((mt=x[Z])==null?void 0:mt.id)===k.id)}),document.querySelectorAll("#queueList .track-row").forEach(Q=>{Q.classList.toggle("active",Q.dataset.id===k.id)}),"mediaSession"in navigator&&(navigator.mediaSession.metadata=new MediaMetadata({title:k.title,artist:k.artist,album:k.album,artwork:k.cover?[{src:k.cover,sizes:"512x512",type:"image/jpeg"}]:[]}),navigator.mediaSession.setActionHandler("play",()=>S()),navigator.mediaSession.setActionHandler("pause",()=>A()),navigator.mediaSession.setActionHandler("previoustrack",()=>F()),navigator.mediaSession.setActionHandler("nexttrack",()=>R()),navigator.mediaSession.setActionHandler("seekto",Q=>{Q.seekTime&&(t.currentTime=Q.seekTime)})),X&&S();const U=document.getElementById("lyricsBox");U&&(U.textContent=k.lyrics||"No lyrics found for this track. You can add it via the tag editor."),window.dispatchEvent(new CustomEvent("lumi:trackChange",{detail:k})),Y("melo:track-changed",k)}let vt=!1;function _t(){vt&&(vt=!1,t.play().then(()=>{i&&(i.style.display="none"),n&&(n.style.display="block")}).catch(()=>{}))}window.addEventListener("pointerdown",_t),window.addEventListener("keydown",_t);function S(){t.play().then(()=>{vt=!1,i&&(i.style.display="none"),n&&(n.style.display="block"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="playing")}).catch(()=>{vt||(vt=!0,e("Click once inside the player window to start playback"))})}function A(){t.pause(),i&&(i.style.display="block"),n&&(n.style.display="none"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}function P(){t.paused?S():A()}function I(){t.pause();try{t.currentTime=0}catch{}i&&(i.style.display="block"),n&&(n.style.display="none"),v&&(v.value="0",lt()),f&&(f.textContent="0:00"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}function R(){if(W==="one"){t.currentTime=0,S();return}let d=T+1;if(G&&(d=Math.floor(Math.random()*x.length),d===T&&(d=(d+1)%x.length)),d>=x.length)if(W==="all")d=0;else{A();return}ct(d)}function F(){if(t.currentTime>3){t.currentTime=0;return}let d=T-1;G&&(d=Math.floor(Math.random()*x.length)),d<0&&(W==="all"?d=x.length-1:d=0),ct(d)}function $(){var Z;const d=x[T];if(!d||!w)return;const X=parseInt(w.value)/100,k=b&&b.checked&&(Z=d.replayGain)!=null?Z:0,U=Math.pow(10,k/20);let Q=X*U;Q=Math.min(1,Math.max(0,Q)),t.volume=Q}function C(){if(a=document.getElementById("btnPlay"),i=document.getElementById("iconPlay"),n=document.getElementById("iconPause"),l=document.getElementById("btnPrev"),s=document.getElementById("btnNext"),g=document.getElementById("btnShuffle"),p=document.getElementById("btnRepeat"),r=document.getElementById("btnStop"),v=document.getElementById("seekBar"),w=document.getElementById("volBar"),f=document.getElementById("curTime"),M=document.getElementById("durTime"),z=document.getElementById("volPct"),q=document.getElementById("trackTitle"),K=document.getElementById("trackArtist"),B=document.getElementById("trackAlbum"),D=document.getElementById("trackCodec"),J=document.getElementById("trackSpecs"),O=document.getElementById("coverImg"),V=document.getElementById("coverFallback"),b=document.getElementById("replayGainToggle"),a&&(a.onclick=P),r&&(r.onclick=I,r.style.display=localStorage.getItem("lumiv2-showStop")==="1"?"":"none"),l&&(l.onclick=F),s&&(s.onclick=R),g&&(g.onclick=()=>{G=!G,g.classList.toggle("active",G),e(G?"Playback Shuffle on":"Playback Shuffle off")}),p&&(p.onclick=()=>{W=W==="off"?"all":W==="all"?"one":"off",p.classList.toggle("active",W!=="off");const d={off:"Repeat off",all:"Repeat all",one:"Repeat one"};e(d[W]),p.title=d[W],W==="one"?p.style.color="var(--accent)":p.style.color=""}),v&&(v.oninput=()=>{ot=!0,f&&(f.textContent=et(parseFloat(v.value))),lt()},v.onchange=()=>{t.currentTime=parseFloat(v.value),ot=!1}),w&&(w.oninput=()=>{rt(),z&&(z.textContent=w.value+"%"),$()}),b&&(b.onchange=()=>$()),lt(),rt(),x[T]){const d=x[T];q&&(q.textContent=d.title),K&&(K.textContent=d.artist),B&&(B.textContent=d.album),D&&(D.textContent=d.codec),J&&(J.textContent=d.specs),d.cover&&O&&(O.src=d.cover,O.style.display="block",V&&(V.style.display="none"))}}C(),t.addEventListener("timeupdate",()=>{!ot&&v&&f&&(v.value=String(Math.floor(t.currentTime)),f.textContent=et(t.currentTime),lt())}),t.addEventListener("loadedmetadata",()=>{!v||!M||(v.max=String(Math.floor(t.duration||x[T].duration||276)),M.textContent=et(t.duration||x[T].duration),lt())}),t.addEventListener("ended",()=>{R()}),window.addEventListener("keydown",d=>{d.target.tagName!=="INPUT"&&(d.code==="Space"&&(d.preventDefault(),P()),d.code==="ArrowRight"&&(t.currentTime+=5),d.code==="ArrowLeft"&&(t.currentTime-=5),(d.key==="m"||d.key==="M")&&(t.muted=!t.muted,e(t.muted?"Muted":"Unmuted")),(d.key==="s"||d.key==="S")&&g&&g.click(),(d.key==="r"||d.key==="R")&&p&&p.click(),d.code==="ArrowUp"&&w&&(w.value=String(Math.min(100,parseInt(w.value)+5)),w.dispatchEvent(new Event("input"))),d.code==="ArrowDown"&&w&&(w.value=String(Math.max(0,parseInt(w.value)-5)),w.dispatchEvent(new Event("input"))))}),st("melo:tray-action",d=>{d==="play_pause"?P():d==="next"?R():d==="prev"?F():d==="mute"&&(t.muted=!t.muted,e(t.muted?"Muted":"Unmuted"))}),ct(0,!1),window.LumiPlayer={get queue(){return x},set queue(d){x=d},get currentIndex(){return T},loadTrack:ct,play:S,pause:A,stop:I,next:R,prev:F,get audio(){return t},rebind:C},window.__LUMI_REBIND__=C,st("melo:play-tracks",d=>{if(!d||!Array.isArray(d.tracks)||!d.tracks.length)return;x=d.tracks,window.__LUMI_SET_QUEUE__(x);const X=Math.max(0,Math.min(d.index||0,x.length-1));ct(X)}),st("melo:add-queue",d=>{d&&(x.push(d),window.__LUMI_SET_QUEUE__(x))}),st("melo:tag-updated",d=>{d&&x[T]&&x[T].id===d.id&&(Object.assign(x[T],d),ct(T,!1))})}const Tt=!!window.__TAURI__,yt=new URLSearchParams(location.search).get("panel")||"main";let at=[],pt=[];try{const t=localStorage.getItem("melo-playlists");if(t){const e=JSON.parse(t);Array.isArray(e)&&e.length&&(pt=e)}}catch{}pt.length||(pt=[{id:"p1",name:"Favorites",tracks:[],createdAt:Date.now()}]);try{const t=localStorage.getItem("melo-tracks");if(t){const e=JSON.parse(t);Array.isArray(e)&&(at=e)}}catch{}function le(t,e){var te,ee,ie,ae;const a=document.getElementById("trackList");document.getElementById("playlistList");const i=document.getElementById("winPlaylistTracks"),n=document.getElementById("winPlaylistEmpty"),l=document.getElementById("playlistSelect"),s=document.getElementById("searchInput"),g=document.getElementById("libraryStats"),p=document.getElementById("btn-scan"),r=document.getElementById("btn-export-playlist"),v=document.getElementById("btn-new-playlist"),w=document.getElementById("queueList"),f=document.getElementById("tagEditor"),M=document.getElementById("tagTitle"),z=document.getElementById("tagArtist"),q=document.getElementById("tagAlbum"),K=document.getElementById("tagYear"),B=document.getElementById("tagCover");let D="",J=localStorage.getItem("melo-currentPlaylist")||((te=pt[0])==null?void 0:te.id)||"",O="artists",V=null,b=null,x=null,T=null,G=[];(ee=document.getElementById("libraryTabs"))==null||ee.querySelectorAll(".tab").forEach(o=>{o.addEventListener("click",()=>{document.querySelectorAll("#libraryTabs .tab").forEach(c=>c.classList.remove("active")),o.classList.add("active"),O=o.dataset.libtab,V=b=x=T=null,tt()})}),s==null||s.addEventListener("input",()=>{D=s.value.toLowerCase(),tt()}),tt(),Lt(),p==null||p.addEventListener("click",async()=>{if(window.__TAURI__)try{const{open:o}=await N(async()=>{const{open:h}=await import("./index-CS3Qnt9j.js");return{open:h}},__vite__mapDeps([5,1])),c=await o({directory:!0,multiple:!1});if(c){e("Scanning folder in the background…");const{invoke:h}=await N(async()=>{const{invoke:y}=await import("./core-DhEqZVGG.js");return{invoke:y}},[]),u=await h("scan_library",{path:c});u.forEach(y=>y.source="scan"),ft(u,!0),ct(u),tt()}}catch{e("Scanning requires the Tauri build")}else{const o=document.createElement("input");o.type="file",o.multiple=!0,o.accept="audio/*",o.onchange=async()=>{var h;const c=Array.from(o.files||[]);for(const u of c){const y=URL.createObjectURL(u),m=Math.random().toString(36).slice(2),E=((h=u.name.split(".").pop())==null?void 0:h.toUpperCase())||"MP3",L={id:m,title:u.name.replace(/\.[^/.]+$/,""),artist:"Unknown",album:"Imported",genre:"Unknown",year:new Date().getFullYear(),duration:180,path:y,codec:E,specs:"Imported · Stereo",replayGain:0},_=new Audio(y);await new Promise(j=>{_.addEventListener("loadedmetadata",()=>{L.duration=Math.floor(_.duration)||180,j(null)},{once:!0}),_.load(),setTimeout(()=>j(null),1500)}),await Ot(u,L),at.push(L)}e(`${c.length} file(s) added`),tt(),Lt()},o.click()}}),document.addEventListener("dragover",o=>{o.preventDefault()}),document.addEventListener("drop",async o=>{var h,u;o.preventDefault();const c=Array.from(((h=o.dataTransfer)==null?void 0:h.files)||[]).filter(y=>y.type.startsWith("audio/")||/\.(mp3|flac|wav|ogg|aac|m4a|alac)$/i.test(y.name));if(c.length){for(const y of c){const m=URL.createObjectURL(y),E=Math.random().toString(36).slice(2),L=((u=y.name.split(".").pop())==null?void 0:u.toUpperCase())||"MP3",_={id:E,title:y.name.replace(/\.[^/.]+$/,""),artist:"Imported",album:"Drop",genre:"Unknown",year:new Date().getFullYear(),duration:200,path:m,codec:L,specs:"Drag & Drop"};await Ot(y,_);const j=new Audio(m);await new Promise(dt=>{j.addEventListener("loadedmetadata",()=>{_.duration=Math.floor(j.duration)||200,dt(null)},{once:!0}),j.load(),setTimeout(()=>dt(null),800)}),at.push(_)}e(`${c.length} File added via drag & drop`),tt()}});function W(){return pt.find(o=>o.id===J)||pt[0]}function ot(){localStorage.setItem("melo-rev",String(Date.now())),localStorage.setItem("melo-playlists",JSON.stringify(pt))}function et(){Tt&&Y("melo:playlists-sync",{src:yt,playlists:pt})}function lt(o){J=o,localStorage.setItem("melo-currentPlaylist",o),I()}st("melo:playlists-sync",o=>{o&&o.src!==yt&&Array.isArray(o.playlists)&&(pt=o.playlists,I(),tt())});function rt(){localStorage.setItem("melo-rev",String(Date.now()));try{localStorage.setItem("melo-tracks",JSON.stringify(at))}catch{try{localStorage.setItem("melo-tracks",JSON.stringify(at.map(({cover:o,...c})=>c)))}catch{}}}function ft(o,c=!1){let h=!1;o.forEach(u=>{at.some(y=>y.id===u.id)||(at.push(u),h=!0)}),h&&(rt(),tt(),I()),c&&Tt&&Y("melo:tracks-add",{src:yt,list:o})}st("melo:tracks-add",o=>{o&&o.src!==yt&&Array.isArray(o.list)&&ft(o.list)});function ct(o){const c=W();if(!c)return;let h=!1;o.forEach(u=>{c.tracks.includes(u.id)||(c.tracks.push(u.id),h=!0)}),h&&(ot(),et(),I(),tt())}async function vt(o){if(!Tt)return[];const{invoke:c}=await N(async()=>{const{invoke:u}=await import("./core-DhEqZVGG.js");return{invoke:u}},[]),h=[];for(const u of o)try{const y=await c("scan_library",{path:u});y&&h.push(...y)}catch{}return h}Tt&&(N(async()=>{const{getCurrentWebviewWindow:o}=await import("./webviewWindow-mjQkSB26.js");return{getCurrentWebviewWindow:o}},__vite__mapDeps([6,7,1,0,8])).then(({getCurrentWebviewWindow:o})=>{o().onDragDropEvent(async h=>{var u;if(h.payload.type==="drop"){const y=h.payload.paths||[];if(!y.length)return;const m=await vt(y);if(!m.length)return;m.forEach(E=>E.source="import"),ft(m,!0),yt==="main"?(ct(m),Y("melo:play-tracks",{tracks:m,index:0})):yt==="playlist"?(ct(m),e(`Added ${m.length} track(s) to "${(u=W())==null?void 0:u.name}"`)):e(`Added ${m.length} file(s) to library`)}})}).catch(()=>{}),N(async()=>{const{listen:o}=await import("./event-CNdo2oXa.js");return{listen:o}},__vite__mapDeps([0,1])).then(({listen:o})=>{o("tauri://drag-drop",async c=>{var y,m;const h=((y=c==null?void 0:c.payload)==null?void 0:y.paths)||[];if(!h.length)return;const u=await vt(h);u.length&&(u.forEach(E=>E.source="import"),ft(u,!0),yt==="main"?(ct(u),Y("melo:play-tracks",{tracks:u,index:0})):yt==="playlist"?(ct(u),e(`Added ${u.length} track(s) to "${(m=W())==null?void 0:m.name}"`)):e(`Added ${u.length} file(s) to the library`))})}).catch(()=>{}));function _t(o){return`${Math.floor(o/60)}:${String(Math.floor(o%60)).padStart(2,"0")}`}function S(o){return o.type.startsWith("audio/")||/\.(mp3|flac|wav|ogg|aac|m4a|alac|opus)$/i.test(o.name)}async function A(o){var L;const c=o.path;if(c&&Tt){const _=await vt([c]);if(_.length)return _[0].source="import",_[0]}const h=c||URL.createObjectURL(o),u=c||Math.random().toString(36).slice(2),y=((L=o.name.split(".").pop())==null?void 0:L.toUpperCase())||"MP3",m=o.name.replace(/\.[^/.]+$/,""),E={id:u,title:m,artist:"Unknown Artist",album:"Single",genre:"Unknown",year:new Date().getFullYear(),duration:180,path:h,codec:y,specs:"Local File",replayGain:0,source:"import"};try{const _=new Audio(URL.createObjectURL(o));await new Promise(j=>{_.addEventListener("loadedmetadata",()=>{E.duration=Math.floor(_.duration)||180,j(null)},{once:!0}),_.load(),setTimeout(()=>j(null),800)})}catch{}return await Ot(o,E),E}let P="";function I(){if(!i)return;const o=W();if(l&&(l.innerHTML=pt.map(y=>`<option value="${y.id}" ${o&&y.id===o.id?"selected":""}>${y.name}</option>`).join("")),!o){i.innerHTML="",i.style.display="none",n&&(n.style.display="block");return}let c=o.tracks.map(y=>at.find(m=>m.id===y)).filter(Boolean),h=c;if(P.trim()){const y=P.toLowerCase().trim();h=c.filter(m=>m.title.toLowerCase().includes(y)||m.artist.toLowerCase().includes(y)||m.album.toLowerCase().includes(y))}if(n&&(n.style.display=c.length?"none":"block"),i.style.display=c.length?"flex":"none",!h.length&&c.length){i.innerHTML=`<div style="padding:16px;text-align:center;color:var(--text-muted);font-size:11px;">No tracks match "${P}"</div>`;return}i.innerHTML=h.map((y,m)=>{const E=o.tracks.indexOf(y.id);return`
      <div class="track-row" draggable="true" data-id="${y.id}" data-pl-idx="${E>=0?E:m}">
        <span class="num">${m+1}</span>
        ${y.cover?`<img class="track-cover-mini" src="${y.cover}" onerror="this.style.display='none'"/>`:'<div class="track-cover-mini cover-default">♪</div>'}
        <div style="flex:1;min-width:0;">
          <div class="t-title">${y.title}</div>
          <div class="t-artist">${y.artist} • ${y.album}</div>
        </div>
        <span class="t-dur">${_t(y.duration)}</span>
        <button class="btn small ghost" data-action="pl-remove" data-idx="${E>=0?E:m}" title="Remove from playlist">×</button>
      </div>
    `}).join("");let u=null;i.querySelectorAll(".track-row").forEach(y=>{const m=y;m.addEventListener("dragstart",E=>{u=parseInt(m.dataset.plIdx),E.dataTransfer.setData("application/x-melo-ids",m.dataset.id),E.dataTransfer.setData("application/x-melo-pl-idx",String(u)),E.dataTransfer.effectAllowed="move",m.style.opacity="0.4"}),m.addEventListener("dragend",()=>{m.style.opacity="1",u=null,i==null||i.querySelectorAll(".track-row").forEach(E=>E.classList.remove("drag-over-target"))}),m.addEventListener("dragover",E=>{E.preventDefault(),E.stopPropagation(),m.classList.add("drag-over-target")}),m.addEventListener("dragleave",()=>{m.classList.remove("drag-over-target")}),m.addEventListener("drop",E=>{var j;E.preventDefault(),E.stopPropagation(),m.classList.remove("drag-over-target");const L=parseInt(m.dataset.plIdx),_=(j=E.dataTransfer)==null?void 0:j.getData("application/x-melo-pl-idx");if(_!==void 0&&_!==""&&!isNaN(parseInt(_))){const dt=parseInt(_);if(dt!==L&&dt>=0&&L>=0&&dt<o.tracks.length&&L<o.tracks.length){const Ht=o.tracks.splice(dt,1)[0];o.tracks.splice(L,0,Ht),ot(),et(),I(),tt(),e("Track reordered in playlist");return}}}),m.addEventListener("click",E=>{const L=E.target;if(L.closest("[data-action='pl-remove']")){const dt=parseInt(L.closest("[data-action='pl-remove']").dataset.idx);o.tracks.splice(dt,1),ot(),et(),I(),tt();return}const _=m.dataset.id,j=h.findIndex(dt=>dt.id===_);Y("melo:play-tracks",{tracks:h,index:j>=0?j:0})})})}const R=document.getElementById("playlistSearchInput");R&&R.addEventListener("input",()=>{P=R.value,I()});const F=document.getElementById("playlistSortSelect");if(F&&F.addEventListener("change",()=>{const o=W();if(!o||!o.tracks.length)return;const c=F.value,h=o.tracks.map(u=>at.find(y=>y.id===u)).filter(Boolean);c==="title-asc"?h.sort((u,y)=>u.title.localeCompare(y.title)):c==="artist-asc"?h.sort((u,y)=>u.artist.localeCompare(y.artist)):c==="album-asc"?h.sort((u,y)=>u.album.localeCompare(y.album)):c==="dur-asc"?h.sort((u,y)=>u.duration-y.duration):c==="dur-desc"&&h.sort((u,y)=>y.duration-u.duration),o.tracks=h.map(u=>u.id),ot(),et(),I(),e(`Playlist sorted by ${F.options[F.selectedIndex].text}`)}),l==null||l.addEventListener("change",()=>lt(l.value)),r==null||r.addEventListener("click",()=>{const o=W();if(!o)return e("No playlist available");const c=o.tracks.map(E=>at.find(L=>L.id===E)).filter(Boolean);if(!c.length)return e("Current list is empty");let h=`#EXTM3U
`;c.forEach(E=>{h+=`#EXTINF:${Math.floor(E.duration)},${E.artist} - ${E.title}
${E.path}
`});const u=new Blob([h],{type:"audio/x-mpegurl"}),y=URL.createObjectURL(u),m=document.createElement("a");m.href=y,m.download=`${o.name}.m3u`,m.click(),URL.revokeObjectURL(y),e(`M3U exported for "${o.name}"`)}),v==null||v.addEventListener("click",()=>{const o=prompt("New playlist name:");if(!o)return;const c=Math.random().toString(36).slice(2,8);pt.push({id:c,name:o,tracks:[],createdAt:Date.now()}),lt(c),ot(),et(),tt(),e(`Playlist "${o}" created`)}),i){const o=i.parentElement;["dragover","dragenter"].forEach(c=>o.addEventListener(c,h=>{h.preventDefault(),h.stopPropagation(),i.classList.add("drag-over")})),o.addEventListener("dragleave",c=>{o.contains(c.relatedTarget)||i.classList.remove("drag-over")}),o.addEventListener("drop",async c=>{var m,E;c.preventDefault(),c.stopPropagation(),i.classList.remove("drag-over");const h=W();if(!h)return e("Create a playlist first (+ New)");const u=(((m=c.dataTransfer)==null?void 0:m.getData("application/x-melo-ids"))||"").split(",").filter(Boolean);let y=0;if(u.length)u.forEach(L=>{h.tracks.includes(L)||(h.tracks.push(L),y++)});else{const L=Array.from(((E=c.dataTransfer)==null?void 0:E.files)||[]).filter(S);for(const _ of L){const j=await A(_);at.push(j),h.tracks.includes(j.id)||(h.tracks.push(j.id),y++)}}y&&e(`${y} track(s) added to "${h.name}"`),rt(),ot(),et(),tt(),I()})}const $=document.getElementById("playerCard");$&&(["dragover","dragenter"].forEach(o=>$.addEventListener(o,c=>{c.preventDefault(),c.stopPropagation(),$.classList.add("drag-over")})),$.addEventListener("dragleave",o=>{$.contains(o.relatedTarget)||$.classList.remove("drag-over")}),$.addEventListener("drop",async o=>{var y,m;o.preventDefault(),o.stopPropagation(),$.classList.remove("drag-over");const c=window.LumiPlayer,h=(((y=o.dataTransfer)==null?void 0:y.getData("application/x-melo-ids"))||"").split(",").filter(Boolean);let u=[];if(h.length)u=h.map(E=>at.find(L=>L.id===E)).filter(Boolean),c&&u.length&&e(`Playback ${u.length} track(s)`);else{const E=Array.from(((m=o.dataTransfer)==null?void 0:m.files)||[]).filter(S),L=W();let _=!1;for(const j of E){const dt=await A(j);at.push(dt),u.push(dt),L&&!L.tracks.includes(dt.id)&&(L.tracks.push(dt.id),_=!0)}E.length&&(rt(),ot(),et(),tt(),I()),c&&u.length&&e(_&&L?`Playback ${u.length} track(s) + added to "${L.name}"`:`Playback ${u.length} track(s)`)}u.length&&Y("melo:play-tracks",{tracks:u,index:0})}));let C=null;function d(o){if(C=o,!C)return e("No track to edit");f.style.display="flex",M.value=C.title,z.value=C.artist,q.value=C.album,K.value=String(C.year)}function X(o){const c=at.filter(o).map(h=>h.id);c.length&&(at=at.filter(h=>!o(h)),pt.forEach(h=>{h.tracks=h.tracks.filter(u=>!c.includes(u))}),rt(),ot(),et(),Tt&&Y("melo:tracks-remove",{src:yt,ids:c}),tt(),I())}st("melo:tracks-remove",o=>{if(o&&o.src!==yt&&Array.isArray(o.ids)){const c=o.ids;at=at.filter(h=>!c.includes(h.id)),pt.forEach(h=>{h.tracks=h.tracks.filter(u=>!c.includes(u))}),tt(),I()}});const k=document.createElement("div");k.className="ctx-menu",k.style.display="none",document.body.appendChild(k);let U=null;function Q(){k.style.display="none"}document.addEventListener("click",Q),document.addEventListener("keydown",o=>{o.key==="Escape"&&Q()}),k.addEventListener("click",o=>{const c=o.target.closest("[data-act]");if(!c||!U)return;o.stopPropagation();const h=c.dataset.act;h==="edit"&&d(U.track),h==="remove"&&(U.type==="track"?X(u=>u.id===U.track.id):U.type==="artist"?X(u=>u.artist===U.name):U.type==="album"?X(u=>u.artist===U.artist&&u.album===U.album):U.type==="genre"&&X(u=>u.genre===U.name)),Q()});const Z=document.createElement("div");Z.className="ctx-menu",Z.style.display="none",document.body.appendChild(Z);let mt=-1;document.addEventListener("click",()=>{Z.style.display="none"}),Z.addEventListener("click",o=>{if(!o.target.closest("[data-act='plremove']"))return;o.stopPropagation();const c=W();c&&mt>=0&&mt<c.tracks.length&&(c.tracks.splice(mt,1),ot(),et(),I(),tt()),Z.style.display="none"}),document.addEventListener("contextmenu",o=>{Q(),Z.style.display="none";const c=o.target,h=c.closest("#winPlaylistTracks .track-row");if(h){o.preventDefault(),mt=parseInt(h.dataset.plIdx||"-1"),Z.innerHTML='<button class="ctx-item danger" data-act="plremove">Remove from Playlist</button>',Z.style.display="block";const E=Z.getBoundingClientRect();Z.style.left=Math.max(4,Math.min(o.clientX,window.innerWidth-E.width-6))+"px",Z.style.top=Math.max(4,Math.min(o.clientY,window.innerHeight-E.height-6))+"px";return}if(!(yt==="library"?!0:!!c.closest("#win-library"))){o.preventDefault();return}o.preventDefault();const y=c.closest(".track-row, [data-artist], [data-albumkey], [data-genre]");if(!y){Q();return}if(y.classList.contains("track-row")){const E=G[parseInt(y.dataset.viewIdx)];if(!E){Q();return}U={type:"track",track:E},k.innerHTML='<button class="ctx-item" data-act="edit">Edit tags</button><button class="ctx-item danger" data-act="remove">Remove track from library</button>'}else if(y.dataset.artist)U={type:"artist",name:y.dataset.artist},k.innerHTML='<button class="ctx-item danger" data-act="remove">Remove artist from library</button>';else if(y.dataset.albumkey){const[E,L]=(y.dataset.albumkey||"").split("\0");U={type:"album",artist:E,album:L},k.innerHTML='<button class="ctx-item danger" data-act="remove">Remove album from library</button>'}else U={type:"genre",name:y.dataset.genre},k.innerHTML='<button class="ctx-item danger" data-act="remove">Remove genre from library</button>';k.style.display="block";const m=k.getBoundingClientRect();k.style.left=Math.max(4,Math.min(o.clientX,window.innerWidth-m.width-6))+"px",k.style.top=Math.max(4,Math.min(o.clientY,window.innerHeight-m.height-6))+"px"}),(ie=document.getElementById("btn-tag-cancel"))==null||ie.addEventListener("click",()=>f.style.display="none"),(ae=document.getElementById("btn-tag-save"))==null||ae.addEventListener("click",async()=>{if(C){if(C.title=M.value,C.artist=z.value,C.album=q.value,C.year=parseInt(K.value)||C.year,B.files&&B.files[0]){const o=B.files[0],c=URL.createObjectURL(o),h=new FileReader;h.onload=()=>{C.cover=h.result,tt(),Lt(),Y("melo:tag-updated",C)},h.readAsDataURL(o),C.cover=c}if(window.__TAURI__)try{const{invoke:o}=await N(async()=>{const{invoke:c}=await import("./core-DhEqZVGG.js");return{invoke:c}},[]);await o("write_tags",{path:C.path,tags:{title:C.title,artist:C.artist,album:C.album}})}catch{}f.style.display="none",rt(),tt(),Lt(),Y("melo:tag-updated",C),e("Metadata saved")}});function it(o){return String(o!=null?o:"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function $e(){return at.filter(o=>o.source==="scan")}function jt(o){return G=o,o.length?o.map((c,h)=>{const u=`${Math.floor(c.duration/60)}:${String(Math.floor(c.duration%60)).padStart(2,"0")}`;return`
      <div class="track-row" draggable="true" data-view-idx="${h}" data-id="${it(c.id)}">
        <span class="num">${h+1}</span>
        <img class="track-cover-mini" src="${c.cover||""}" style="${c.cover?"":"display:none"}" onerror="this.style.display='none'"/>
        <div style="flex:1;min-width:0;">
          <div class="t-title">${it(c.title)}</div>
          <div class="t-artist">${it(c.artist)} • ${it(c.album)}${c.year?" • "+c.year:""}</div>
        </div>
        <span style="font-size:10px;padding:3px 6px;border-radius:6px;background:var(--badge-bg);color:var(--badge-text);border:1px solid var(--card-border);">${it(c.codec)}</span>
        <span class="t-dur">${u}</span>
        <button class="btn small ghost" data-action="add-queue" data-view-idx="${h}">+</button>
      </div>`}).join(""):'<div style="padding:30px;text-align:center;color:var(--text-muted);">Nothing here yet.<br/><span style="font-size:12px;">Use "Scan Folder" to build your library</span></div>'}function tt(){if(!a){I();return}const o=$e(),c=new Set(o.map(m=>m.artist)).size,h=new Set(o.map(m=>m.artist+"\0"+m.album)).size;g&&(g.textContent=`${o.length} tracks • ${c} artists • ${h} albums`);const u=D.trim().toLowerCase();let y="";if(O==="artists")if(V){const m=o.filter(_=>_.artist===V),E=[...new Set(m.map(_=>_.album))].sort((_,j)=>_.localeCompare(j)),L=b?m.filter(_=>_.album===b):m;y=`<div class="lib-crumb"><button class="btn small" data-back="artists">‹ Artists</button><b>${it(V)}</b></div>
          <div class="chip-row"><button class="chip ${b?"":"active"}" data-album="">All albums</button>`+E.map(_=>`<button class="chip ${b===_?"active":""}" data-album="${it(_)}">${it(_)}</button>`).join("")+"</div>"+jt(u?L.filter(_=>(_.title+_.album).toLowerCase().includes(u)):L)}else{G=[];const m=[...new Set(o.map(L=>L.artist))].sort((L,_)=>L.localeCompare(_));y=(u?m.filter(L=>L.toLowerCase().includes(u)):m).map(L=>{const _=o.filter(j=>j.artist===L).length;return`<div class="lib-item" data-artist="${it(L)}"><div class="lib-avatar">${it((L[0]||"?").toUpperCase())}</div><div style="flex:1;min-width:0;"><div class="t-title">${it(L)}</div><div class="t-artist">${_} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No artists found.</div>'}else if(O==="albums")if(x){const[m,E]=x.split("\0"),L=o.filter(_=>_.artist===m&&_.album===E);y=`<div class="lib-crumb"><button class="btn small" data-back="albums">‹ Albums</button><b>${it(E)}</b><span class="t-artist" style="margin-left:8px;">${it(m)}</span></div>`+jt(u?L.filter(_=>_.title.toLowerCase().includes(u)):L)}else{G=[];const m=[...new Set(o.map(L=>L.artist+"\0"+L.album))].sort((L,_)=>L.localeCompare(_));y=(u?m.filter(L=>L.toLowerCase().includes(u)):m).map(L=>{const[_,j]=L.split("\0"),dt=o.filter(Ht=>Ht.artist===_&&Ht.album===j).length;return`<div class="lib-item" data-albumkey="${it(L)}"><div class="lib-avatar">💿</div><div style="flex:1;min-width:0;"><div class="t-title">${it(j)}</div><div class="t-artist">${it(_)} • ${dt} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No albums found.</div>'}else if(T){const m=o.filter(E=>E.genre===T);y=`<div class="lib-crumb"><button class="btn small" data-back="genres">‹ Genres</button><b>${it(T)}</b></div>`+jt(u?m.filter(E=>(E.title+E.artist).toLowerCase().includes(u)):m)}else{G=[];const m=[...new Set(o.map(L=>L.genre))].sort((L,_)=>L.localeCompare(_));y=(u?m.filter(L=>L.toLowerCase().includes(u)):m).map(L=>{const _=o.filter(j=>j.genre===L).length;return`<div class="lib-item" data-genre="${it(L)}"><div class="lib-avatar">🎼</div><div style="flex:1;min-width:0;"><div class="t-title">${it(L)}</div><div class="t-artist">${_} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No genres found.</div>'}a.innerHTML=y,a.querySelectorAll("[data-artist]").forEach(m=>m.addEventListener("click",()=>{V=m.dataset.artist,b=null,tt()})),a.querySelectorAll("[data-albumkey]").forEach(m=>m.addEventListener("click",()=>{x=m.dataset.albumkey,tt()})),a.querySelectorAll("[data-genre]").forEach(m=>m.addEventListener("click",()=>{T=m.dataset.genre,tt()})),a.querySelectorAll("[data-back]").forEach(m=>m.addEventListener("click",()=>{const E=m.dataset.back;E==="artists"?(V=null,b=null):E==="albums"?x=null:T=null,tt()})),a.querySelectorAll(".chip[data-album]").forEach(m=>m.addEventListener("click",()=>{b=m.dataset.album||null,tt()})),a.querySelectorAll(".track-row").forEach(m=>{m.addEventListener("dragstart",E=>{E.dataTransfer.setData("application/x-melo-ids",m.dataset.id),E.dataTransfer.effectAllowed="copy"}),m.addEventListener("click",E=>{const L=E.target,_=parseInt(m.dataset.viewIdx);if(L.closest("[data-action='add-queue']")){Ue(G[_]);return}Y("melo:play-tracks",{tracks:G,index:_})})}),I()}function Ue(o){Y("melo:add-queue",o),e(`Queued: ${o.title}`)}function Lt(){if(!w)return;const o=window.LumiPlayer,c=(o==null?void 0:o.queue)||at.slice(0,4);if(!c.length){w.innerHTML='<div style="text-align:center;color:var(--text-muted);font-size:12px;padding:12px;">Queue is empty</div>';return}w.innerHTML=c.map((h,u)=>{var y;return`
      <div class="track-row" data-id="${h.id}" data-queue-idx="${u}" style="padding:6px 8px;border-radius:8px;border:1px solid ${u===((y=o==null?void 0:o.currentIndex)!=null?y:0)?"var(--accent)":"transparent"};">
        <img class="track-cover-mini" src="${h.cover||""}" style="width:24px;height:24px;${h.cover?"":"display:none"}" />
        <div style="flex:1;min-width:0;">
          <div class="t-title" style="font-size:12px;">${h.title}</div>
          <div class="t-artist" style="font-size:11px;">${h.artist}</div>
        </div>
        <button class="btn small ghost" data-remove="${u}" style="padding:2px 6px;">×</button>
      </div>
    `}).join(""),w.querySelectorAll("[data-remove]").forEach(h=>{h.addEventListener("click",()=>{const u=parseInt(h.dataset.remove);c.splice(u,1),Lt()})}),w.querySelectorAll(".track-row").forEach(h=>{h.addEventListener("click",u=>{if(u.target.closest("[data-remove]"))return;const y=parseInt(h.dataset.queueIdx),m=window.LumiPlayer;m&&m.loadTrack(y)})})}st("melo:track-changed",o=>{Lt();const c=document.getElementById("lyricsBox");c&&o&&(c.textContent=o.lyrics||"No lyrics found for this track. You can add it via the tag editor."),document.querySelectorAll(".track-row").forEach(h=>{h.classList.toggle("active",h.dataset.id===(o==null?void 0:o.id))})}),setInterval(()=>Lt(),2e3);let Kt=localStorage.getItem("melo-rev")||"";setInterval(()=>{const o=localStorage.getItem("melo-rev")||"";if(o!==Kt){Kt=o;try{const c=JSON.parse(localStorage.getItem("melo-tracks")||"null");Array.isArray(c)&&(at=c)}catch{}try{const c=JSON.parse(localStorage.getItem("melo-playlists")||"null");Array.isArray(c)&&c.length&&(pt=c)}catch{}tt(),I()}},1200),window.LumiLibrary={get tracks(){return at},get playlists(){return pt},render:tt,addTracks:ft,addToCurrentPlaylist:ct,importPaths:vt,currentPlaylistName:()=>{var o;return((o=W())==null?void 0:o.name)||"Playlist"}}}const Dt=[31,62,125,250,500,1e3,2e3,4e3,8e3,16e3];let bt=null,se=null,Gt=[],zt=null,At=null;function Te(t){if(!bt){const e=window.AudioContext||window.webkitAudioContext;bt=new e,se=bt.createMediaElementSource(t),Gt=Dt.map(i=>{const n=bt.createBiquadFilter();return n.type="peaking",n.frequency.value=i,n.Q.value=1.4,n.gain.value=0,n}),zt=bt.createGain(),zt.gain.value=1,At=bt.createAnalyser(),At.fftSize=2048,At.smoothingTimeConstant=.72;let a=se;for(const i of Gt)a.connect(i),a=i;a.connect(zt),zt.connect(At),At.connect(bt.destination)}return{ctx:bt,filters:Gt,gain:zt,analyser:At,resume(){bt&&bt.state==="suspended"&&bt.resume().catch(()=>{})}}}const qt={flat:[0,0,0,0,0,0,0,0,0,0],pop:[-1,2,4,4,2,-1,-1,2,3,3],rock:[4,3,2,-1,-2,-2,1,3,4,4],bass:[6,5,4,2,1,0,-1,-1,-2,-3],treble:[-3,-2,-1,0,1,2,3,5,6,6],dance:[5,4,2,0,-1,-1,2,4,5,3],jazz:[2,1,2,3,2,0,1,2,3,2],classical:[3,2,1,0,0,0,-1,2,3,4],vocal:[-2,-1,0,2,4,4,3,1,0,-1],acoustic:[3,2,1,1,2,2,3,3,2,1],hiphop:[5,4,1,2,-1,-1,1,-1,2,3],metal:[4,2,-1,-2,-1,1,3,4,5,4]};function Yt(t){for(const[e,a]of Object.entries(qt))if(a.every((i,n)=>i===t[n]))return e;return"custom"}function re(t,e,a={}){const i=!!a.remote,n=document.getElementById("eqEnable"),l=document.getElementById("eqPreset"),s=document.getElementById("btnEqReset"),g=document.getElementById("eqBands"),p=document.getElementById("eqCanvas"),r=p?p.getContext("2d"):null;let v=null,w=[],f=[],M=new Array(Dt.length).fill(0);try{const b=JSON.parse(localStorage.getItem("melo-eq-gains")||"null");Array.isArray(b)&&b.length===Dt.length&&(M=b.map(x=>typeof x=="number"?Math.max(-12,Math.min(12,x)):0))}catch{}let z=localStorage.getItem("melo-eq-preset")||Yt(M),q=localStorage.getItem("melo-eq-enabled")!=="0";function K(){if(!v)try{const b=Te(t);v=b.ctx,w=b.filters,w.forEach((x,T)=>{x.gain.value=q?M[T]:0})}catch{}}function B(b,x){K(),w[b]&&q&&(w[b].gain.value=x)}function D(b){K(),M=[...b],q&&b.forEach((x,T)=>{w[T]&&(w[T].gain.value=x)}),V()}function J(b){K(),q=b,b?M.forEach((x,T)=>{w[T]&&(w[T].gain.value=x)}):w.forEach(x=>{x.gain.value=0}),V()}i||t&&t.addEventListener("play",()=>{K(),(v==null?void 0:v.state)==="suspended"&&v.resume().catch(()=>{})}),st("melo:eq",b=>{b&&(b.type==="gain"?(i||B(b.idx,b.val),M[b.idx]=b.val,f[b.idx]&&(f[b.idx].value=String(b.val),O(f[b.idx])),l&&(l.value=Yt(M)),V()):b.type==="gains"?(i||D(b.values),M=[...b.values],f.length&&f.forEach((x,T)=>{x.value=String(M[T]),O(x)}),l&&b.preset&&(l.value=b.preset),V()):b.type==="enable"&&(q=!!b.on,i||J(q),n&&(n.checked=q),V()))});function O(b){var G;const x=parseInt(b.value),T=(G=b.parentElement)==null?void 0:G.querySelector(".val");T&&(T.textContent=(x>0?"+":"")+x+"dB")}function V(){if(!p||!r)return;const b=window.devicePixelRatio||1,x=p.clientWidth*b,T=p.clientHeight*b;if(x<=0||T<=0)return;p.width=x,p.height=T,r.clearRect(0,0,x,T);const G=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#2a7bd6",W=M;if(!q){r.strokeStyle="rgba(100,120,150,0.25)",r.lineWidth=2*b,r.beginPath(),r.moveTo(0,T/2),r.lineTo(x,T/2),r.stroke();return}r.strokeStyle=G,r.lineWidth=2.5*b,r.lineJoin="round",r.beginPath(),W.forEach((ot,et)=>{const lt=et/(W.length-1)*x,rt=T/2-ot/12*(T/2-10*b);if(et===0)r.moveTo(lt,rt);else{const ft=(et-1)/(W.length-1)*x,ct=T/2-W[et-1]/12*(T/2-10*b);r.quadraticCurveTo((ft+lt)/2,ct,lt,rt)}}),r.stroke(),W.forEach((ot,et)=>{const lt=et/(W.length-1)*x,rt=T/2-ot/12*(T/2-10*b);r.fillStyle=G,r.beginPath(),r.arc(lt,rt,4*b,0,Math.PI*2),r.fill(),r.fillStyle="white",r.beginPath(),r.arc(lt,rt,2*b,0,Math.PI*2),r.fill()}),r.strokeStyle="rgba(100,120,150,0.3)",r.lineWidth=1*b,r.setLineDash([4*b,4*b]),r.beginPath(),r.moveTo(0,T/2),r.lineTo(x,T/2),r.stroke(),r.setLineDash([])}g&&(g.innerHTML="",Dt.forEach((b,x)=>{const T=M[x]||0,G=document.createElement("div");G.className="eq-band",G.innerHTML=`
        <input type="range" min="-12" max="12" value="${T}" step="1" data-idx="${x}" orient="vertical" />
        <label>${b>=1e3?b/1e3+"k":b}</label>
        <span style="font-size:10px;color:var(--text-muted);min-height:12px;" class="val">${(T>0?"+":"")+T+"dB"}</span>
      `,g.appendChild(G)}),f=Array.from(g.querySelectorAll("input")),f.forEach(b=>{b.addEventListener("input",()=>{const x=parseInt(b.dataset.idx),T=parseInt(b.value);O(b),M[x]=T,V();const G=Yt(M);l&&(l.value=G),localStorage.setItem("melo-eq-gains",JSON.stringify(M)),localStorage.setItem("melo-eq-preset",G),i||B(x,T),Y("melo:eq",{type:"gain",idx:x,val:T,values:M})})})),l&&(l.value=z,l.addEventListener("change",()=>{const b=qt[l.value]||qt.flat;f.length&&f.forEach((x,T)=>{x.value=String(b[T]),O(x)}),M=[...b],V(),localStorage.setItem("melo-eq-gains",JSON.stringify(M)),localStorage.setItem("melo-eq-preset",l.value),i||D(b),Y("melo:eq",{type:"gains",values:b,preset:l.value}),e(`Preset: ${l.options[l.selectedIndex].text}`)})),s&&s.addEventListener("click",()=>{const b=qt.flat;f.length&&f.forEach((x,T)=>{x.value="0",O(x)}),M=[...b],l&&(l.value="flat"),localStorage.setItem("melo-eq-gains",JSON.stringify(M)),localStorage.setItem("melo-eq-preset","flat"),i||D(b),Y("melo:eq",{type:"gains",values:b,preset:"flat"}),V(),e("Equalizer reset to Flat (0dB)")}),n&&(n.checked=q,n.addEventListener("change",()=>{q=n.checked,localStorage.setItem("melo-eq-enabled",q?"1":"0"),i||J(q),Y("melo:eq",{type:"enable",on:q}),V(),e(q?"Equalizer On":"Equalizer off — Flat")})),p&&new ResizeObserver(()=>V()).observe(p),V(),window.LumiEqualizer={presets:qt,frequencies:Dt,displayGains:M,reset:()=>s==null?void 0:s.click()}}const Rt=[{id:"bars",label:"Classic Bars"},{id:"thin",label:"Thin Bars"},{id:"line",label:"Spectrum Line"},{id:"mirror",label:"Mirror Bars"},{id:"wave",label:"Oscilloscope"}];function Ge(t){let e=document.getElementById("vizBars");if(!e)return;let a=z(e),i=a.getContext("2d"),n=null,l=null,s=null,g=null,p=null,r=!1,v=localStorage.getItem("melo-viz-mode")||"bars";Rt.some(S=>S.id===v)||(v="bars");let w=0,f=[],M=.45;function z(S){let A=S.querySelector("canvas");return A||(S.innerHTML="",A=document.createElement("canvas"),S.appendChild(A)),A}function q(){if(!(l&&s))try{const S=Te(t);n=S.ctx,l=S.analyser,s=new Uint8Array(l.frequencyBinCount),g=new Uint8Array(l.fftSize)}catch{r=!0}}function K(S){const A=s.length,P=n.sampleRate/2,I=45,R=Math.min(15e3,P*.95),F=Math.log(I),$=Math.log(R),C=[];for(let d=0;d<S;d++){const X=Math.exp(F+($-F)*d/S),k=Math.exp(F+($-F)*(d+1)/S);let U=Math.floor(X/P*A),Q=Math.max(U+1,Math.ceil(k/P*A));U<0&&(U=0),Q>A&&(Q=A);let Z=0;for(let mt=U;mt<Q;mt++)Z+=s[mt];C.push(Z/(Q-U)/255)}return C}function B(S){const A=performance.now()/1e3,P=Math.pow(Math.abs(Math.sin(A*2.2)),2.5),I=[];for(let R=0;R<S;R++){let F=.42+.26*Math.sin(A*1.35+R*.62)+.2*Math.sin(A*2.9+R*1.31)+Math.random()*.07;F*=.55+.5*P,I.push(Math.max(.04,Math.min(1,F)))}return I}function D(S){const A=performance.now()/1e3,P=.5+.5*Math.pow(Math.abs(Math.sin(A*1.9)),2);for(let I=0;I<S.length;I++){const R=I/S.length;S[I]=128+66*P*(Math.sin(R*Math.PI*6+A*7)*.6+Math.sin(R*Math.PI*13-A*11)*.4)}}function J(S){let A;if(r||!l||!s)A=B(S);else{l.getByteFrequencyData(s),A=K(S);for(let I=0;I<S;I++)A[I]*=1+1.7*(I/Math.max(1,S-1))}let P=0;for(const I of A)I>P&&(P=I);P>M?M=P:M=Math.max(.35,M*.985),f.length!==S&&(f=new Array(S).fill(0));for(let I=0;I<S;I++){const R=Math.min(1,A[I]/M),F=R>f[I]?.55:.16;f[I]+=(R-f[I])*F}return f}function O(S,A){return getComputedStyle(document.documentElement).getPropertyValue(S).trim()||A}function V(){return a.width/Math.max(1,a.clientWidth)||1}function b(S,A,P,I,R){if(R=Math.min(R,P/2,I/2),i.roundRect){i.roundRect(S,A,P,I,R);return}i.rect(S,A,P,I)}function x(){const S=window.devicePixelRatio||1,A=a.clientWidth,P=a.clientHeight;A>0&&P>0&&(a.width=Math.round(A*S),a.height=Math.round(P*S))}new ResizeObserver(x).observe(a),x();function T(S,A,P,I){const R=V(),F=O("--visualizer","#5ea0e6"),$=O("--accent","#2a7bd6"),C=S.length,d=A/C,X=Math.max(1.2*R,d*(1-I));for(let k=0;k<C;k++){const U=S[k],Q=Math.max(2*R,U*(P-4*R)),Z=k*d+(d-X)/2,mt=P-Q-1*R,it=i.createLinearGradient(0,mt,0,P);it.addColorStop(0,$),it.addColorStop(1,F),i.fillStyle=it,i.beginPath(),b(Z,mt,X,Q,Math.min(X/2,3.5*R)),i.fill()}}function G(S,A,P){const I=V(),R=O("--visualizer","#5ea0e6"),F=O("--accent","#2a7bd6"),$=S.length,C=A/$,d=P/2,X=Math.max(1.5*I,C*.62);for(let k=0;k<$;k++){const U=Math.max(1.5*I,S[k]*(P/2-3*I)),Q=k*C+(C-X)/2,Z=i.createLinearGradient(0,d-U,0,d+U);Z.addColorStop(0,F),Z.addColorStop(.5,R),Z.addColorStop(1,F),i.fillStyle=Z,i.beginPath(),b(Q,d-U,X,U*2,Math.min(X/2,3*I)),i.fill()}}function W(S,A,P){const I=V(),R=O("--visualizer","#5ea0e6"),F=O("--accent","#2a7bd6"),$=S.length,C=[],d=[];for(let k=0;k<$;k++)C.push((k+.5)/$*A),d.push(P-2*I-S[k]*(P-8*I));i.beginPath(),i.moveTo(C[0],P),i.lineTo(C[0],d[0]);for(let k=1;k<$;k++){const U=(C[k-1]+C[k])/2;i.quadraticCurveTo(C[k-1],d[k-1],U,(d[k-1]+d[k])/2)}i.lineTo(C[$-1],d[$-1]),i.lineTo(C[$-1],P),i.closePath();const X=i.createLinearGradient(0,0,0,P);X.addColorStop(0,R),X.addColorStop(1,"transparent"),i.globalAlpha=.18,i.fillStyle=X,i.fill(),i.globalAlpha=1,i.beginPath(),i.moveTo(C[0],d[0]);for(let k=1;k<$;k++){const U=(C[k-1]+C[k])/2;i.quadraticCurveTo(C[k-1],d[k-1],U,(d[k-1]+d[k])/2)}i.lineTo(C[$-1],d[$-1]),i.strokeStyle=F,i.lineWidth=2*I,i.lineJoin="round",i.stroke()}function ot(){const S=a.width,A=a.height,P=V(),I=O("--accent","#2a7bd6");let R;r||!l||!g?(p||(p=new Uint8Array(1024)),D(p),R=p):(l.getByteTimeDomainData(g),R=g);const F=()=>{i.beginPath();for(let $=0;$<=S;$+=2){const C=Math.min(R.length-1,Math.floor($/S*R.length)),d=R[C]/255*A;$===0?i.moveTo($,d):i.lineTo($,d)}};F(),i.strokeStyle=I,i.globalAlpha=.16,i.lineWidth=6*P,i.lineJoin="round",i.stroke(),F(),i.globalAlpha=1,i.lineWidth=1.8*P,i.stroke()}function et(){const S=a.width,A=a.height;if(!S||!A)return;if(i.clearRect(0,0,S,A),v==="wave"){ot();return}const I=J(v==="bars"?16:v==="thin"?56:v==="line"?64:24);v==="bars"?T(I,S,A,.34):v==="thin"?T(I,S,A,.32):v==="line"?W(I,S,A):v==="mirror"&&G(I,S,A)}function lt(){w=requestAnimationFrame(lt),et()}function rt(){w||lt()}function ft(S,A=!1){var P;if(v=S,f=[],localStorage.setItem("melo-viz-mode",S),!A){const I=window.__TOAST__,R=(P=Rt.find(F=>F.id===S))==null?void 0:P.label;I&&R&&I(`Visualizer: ${R}`)}}function ct(){e&&(e.title="Click: next mode • Right-click: choose mode",e.addEventListener("click",()=>{const S=Rt.findIndex(A=>A.id===v);ft(Rt[(S+1)%Rt.length].id)}))}document.addEventListener("click",S=>{}),document.addEventListener("keydown",S=>{S.key});function vt(){q(),rt(),(n==null?void 0:n.state)==="suspended"&&n.resume()}t.addEventListener("play",vt),vt(),ct(),document.addEventListener("visibilitychange",()=>{document.hidden?(cancelAnimationFrame(w),w=0):rt()});function _t(){cancelAnimationFrame(w),w=0,e=document.getElementById("vizBars"),e&&(a=z(e),i=a.getContext("2d"),new ResizeObserver(x).observe(a),x(),ct(),rt())}window.__LUMI_REBIND_VISUALIZER__=_t}function ce(t){if(!t||!t.trim())return{isSynced:!1,lines:[],raw:""};const e=[],a=t.split(/\r?\n/),i=/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;let n=!1;for(const l of a){const s=l.trim();if(!s||/^\[[a-z]{2,8}:/i.test(s))continue;const g=[...s.matchAll(i)];if(g.length>0){n=!0;const p=s.replace(i,"").trim();for(const r of g){const v=parseInt(r[1],10),w=parseInt(r[2],10),f=r[3]||"0",M=f.length===2?parseInt(f,10)*10:f.length===1?parseInt(f,10)*100:parseInt(f.slice(0,3),10),z=v*60+w+M/1e3;e.push({time:z,text:p})}}else e.push({time:-1,text:s})}return e.sort((l,s)=>l.time-s.time),{isSynced:n,lines:e,raw:t}}function de(t,e){const a=document.getElementById("lyricsContainer"),i=document.getElementById("lyricsStatus"),n=document.getElementById("lyricsTrackTitle");let l={isSynced:!1,lines:[]},s=-1;async function g(f){if(f.lyrics&&f.lyrics.trim().length>0)return f.lyrics;if(window.__TAURI__)try{const{invoke:M}=await N(async()=>{const{invoke:q}=await import("./core-DhEqZVGG.js");return{invoke:q}},[]),z=await M("get_track_lyrics",{path:f.path});if(z)return z}catch{}return null}async function p(f){if(!f){l={isSynced:!1,lines:[],raw:""},r();return}f.id,n&&(n.textContent=`${f.title} — ${f.artist}`);const M=await g(f);l=ce(M||""),r()}function r(){if(a){if(a.innerHTML="",s=-1,!l.lines.length){i&&(i.style.display="block",i.innerHTML='No synced lyrics found (.lrc)<br/><span style="font-size:10.5px; opacity:0.7;">Place a matching .lrc file in the song folder or add lyrics in the tag editor.</span>');return}i&&(i.style.display="none"),l.lines.forEach((f,M)=>{const z=document.createElement("div");z.className="lyric-line",z.dataset.idx=String(M),z.dataset.time=String(f.time),z.textContent=f.text||"♪",f.time>=0&&(z.style.cursor="pointer",z.title=`Seek to ${Math.floor(f.time/60)}:${Math.floor(f.time%60).toString().padStart(2,"0")}`,z.addEventListener("click",()=>{t.currentTime=f.time,t.play().catch(()=>{})})),a.appendChild(z)})}}function v(){if(!a||!l.isSynced||!l.lines.length)return;const f=t.currentTime;let M=-1;for(let z=0;z<l.lines.length&&l.lines[z].time<=f;z++)M=z;if(M!==s){s=M;const z=a.querySelectorAll(".lyric-line");if(z.forEach((q,K)=>{q.classList.toggle("active",K===s),q.classList.toggle("passed",K<s)}),s>=0&&z[s]){const q=z[s],K=a.clientHeight,D=q.offsetTop-a.offsetTop-K/2+q.clientHeight/2;a.scrollTo({top:Math.max(0,D),behavior:"smooth"})}}}t.addEventListener("timeupdate",v),window.addEventListener("lumi:trackChange",f=>{p(f.detail)}),st("melo:track-changed",f=>{p(f)});const w=window.__LUMI_QUEUE__;Array.isArray(w)&&w.length>0&&p(w[0]),window.LumiLyrics={loadTrackLyrics:p,parseLRC:ce}}let Et=null;const pe=`<!doctype html>
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
    background: transparent;
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
    height: 100% !important;
    min-height: 135px !important;
    max-height: 145px !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    position: relative !important;
    box-sizing: border-box !important;
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
      <button class="icon-btn" id="btnStop" title="Stop" style="display:none">
        <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>
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
</html>`,ue=`<!doctype html>
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
    background: transparent;
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
    height: 100% !important;
    min-height: 135px !important;
    max-height: 145px !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    position: relative !important;
    box-sizing: border-box !important;
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
      <button class="icon-btn" id="btnStop" title="Stop" style="display:none">
        <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>
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
</html>`,me={"compact-pill-light.html":pe,"compact-pill-dark.html":ue,"compact-pill-light":pe,"compact-pill-dark":ue},Ye=[{id:"compact-pill-light",name:"Minimal Compact (Light)",filename:"compact-pill-light.html"},{id:"compact-pill-dark",name:"Minimal Compact (Dark)",filename:"compact-pill-dark.html"},{id:"full-html-example",name:"Full HTML Example",filename:"full-html-example.html"},{id:"example-custom",name:"Custom CSS Example",filename:"example-custom.html"}];function Ae(t){const e=["trackTitle","btnPlay","seekBar","coverImg"];let a=0;for(const i of e)t.includes(i)&&a++;return a>=3}function Ct(t,e){const a=document.getElementById("playerCard");if(!a)return;const i=a._originalHTML||a.innerHTML;a._originalHTML||(a._originalHTML=i),Et&&(Et.remove(),Et=null);let l=[...t.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(w=>w[1]).join(`
`);l&&(Et=document.createElement("style"),Et.id="melo-custom-skin",Et.textContent=l,document.head.appendChild(Et));const s=Ae(t);let g="";const p=t.match(/<body[^>]*>([\s\S]*?)<\/body>/i);p?g=p[1]:g=t.split(/<\/style>/i).pop()||"";const r=document.createElement("div");r.innerHTML=g;const v=r.querySelector("#lumi-player");if(v&&(g=v.innerHTML),s&&g.trim().length>20){const w=g.trim();a.innerHTML=w,e&&e("Skin applied"),setTimeout(()=>{var M,z;(M=window.__LUMI_REBIND__)==null||M.call(window);const f=window.__LUMI_AUDIO__;f&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(f),(z=window.__LUMI_REBIND_MAIN__)==null||z.call(window)},40)}else l&&e&&e("Skin CSS applied");localStorage.setItem("lumi-custom-skin",t),localStorage.setItem("lumi-custom-skin-isFull",s?"1":"0")}function Ut(t){Et&&(Et.remove(),Et=null);const e=document.getElementById("playerCard");e&&e._originalHTML&&(e.innerHTML=e._originalHTML,setTimeout(()=>{var i,n;(i=window.__LUMI_REBIND__)==null||i.call(window);const a=window.__LUMI_AUDIO__;a&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(a),(n=window.__LUMI_REBIND_MAIN__)==null||n.call(window)},40)),localStorage.removeItem("lumi-custom-skin"),localStorage.removeItem("lumi-custom-skin-isFull"),localStorage.setItem("melo-active-skin-id","default"),Y("melo:skin-changed","default"),t&&t("Switched to Default Melo skin")}async function Be(){if(It)try{const{invoke:t}=await N(async()=>{const{invoke:a}=await import("./core-DhEqZVGG.js");return{invoke:a}},[]),e=await t("list_installed_skins");if(Array.isArray(e)&&e.length>0)return e}catch{}return Ye}async function Jt(t,e){if(It)try{const{invoke:i}=await N(async()=>{const{invoke:l}=await import("./core-DhEqZVGG.js");return{invoke:l}},[]),n=await i("read_skin_file",{filenameOrPath:t});if(n&&n.trim().length>0)return Ct(n,e),!0}catch{}try{const i=t.startsWith("skins/")?t:`skins/${t}`,n=await fetch(i);if(n.ok){const l=await n.text();return Ct(l,e),!0}}catch{}const a=t.replace(/^.*[\\/]/,"");return me[a]?(Ct(me[a],e),!0):(e&&e(`Could not load skin: ${t}`),!1)}async function Pt(t,e,a){if(t==="default"){Ut(a);return}let i=t;t==="compact-pill"||t.startsWith("compact-pill")?i=e==="dark"?"compact-pill-dark.html":"compact-pill-light.html":!i.endsWith(".html")&&!i.endsWith(".htm")&&(i=i+".html"),await Jt(i,a)&&(localStorage.setItem("melo-active-skin-id",t),Y("melo:skin-changed",t))}async function Ce(t){if(It)try{const{invoke:e}=await N(async()=>{const{invoke:a}=await import("./core-DhEqZVGG.js");return{invoke:a}},[]);await e("open_skins_folder"),t&&t("Opening skins folder...")}catch{t&&t("Could not open skins folder")}else t&&t("Skins are located in the skins/ folder")}function Je(t){const e=document.getElementById("skinUpload"),a=document.getElementById("linkDownloadExample");a&&a.addEventListener("click",l=>{l.preventDefault(),Jt("compact-pill-light.html")});const i=localStorage.getItem("melo-active-skin-id")||"default",n=localStorage.getItem("lumi-theme")||"dark";i!=="default"&&setTimeout(()=>{Pt(i,n)},150),st("melo:theme",l=>{const s=localStorage.getItem("melo-active-skin-id");s&&s!=="default"&&Pt(s,l)}),st("melo:skin-changed",l=>{if(l&&typeof l=="string"){const s=localStorage.getItem("lumi-theme")||"dark";if(l==="default")Ut();else{let g=l;(l==="compact-pill"||l.startsWith("compact-pill"))&&(g=s==="dark"?"compact-pill-dark.html":"compact-pill-light.html"),Jt(g)}}}),e&&e.addEventListener("change",async()=>{var p;const l=(p=e.files)==null?void 0:p[0];if(!l)return;const s=await l.text(),g=l.name;if(It)try{const{invoke:r}=await N(async()=>{const{invoke:v}=await import("./core-DhEqZVGG.js");return{invoke:v}},[]);await r("save_custom_skin_file",{filename:g,content:s}),t(`Saved ${g} to skins folder`)}catch{}Ct(s,t),localStorage.setItem("melo-active-skin-id",g),Y("melo:skin-changed",g),e.value=""}),document.addEventListener("dragover",l=>{var s;[...((s=l.dataTransfer)==null?void 0:s.types)||[]].includes("Files")&&l.preventDefault()}),document.addEventListener("drop",async l=>{var g;const s=[...((g=l.dataTransfer)==null?void 0:g.files)||[]].find(p=>p.name.endsWith(".html")||p.name.endsWith(".htm"));if(s){l.preventDefault();const p=await s.text();if(p.includes("<style")||p.includes("<html")||Ae(p)){const r=s.name;if(It)try{const{invoke:v}=await N(async()=>{const{invoke:w}=await import("./core-DhEqZVGG.js");return{invoke:w}},[]);await v("save_custom_skin_file",{filename:r,content:p})}catch{}Ct(p,t),localStorage.setItem("melo-active-skin-id",r),Y("melo:skin-changed",r)}}}),window.LumiSkin={applyCustomSkin:Ct,resetSkin:Ut,applySkinChoice:Pt,listInstalledSkins:Be,openSkinsFolderOnDisk:Ce}}const Pe=document.querySelector("#app");Pe.innerHTML=`
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
          <div style="display:grid; grid-template-columns: 140px 1fr; gap:10px 16px; font-size:12px; line-height:1.6; padding:4px 0;">
            <b>Space</b><span>Play / Pause</span>
            <b>Left / Right</b><span>Seek 5 seconds backward / forward</span>
            <b>Up / Down</b><span>Adjust volume (±5%)</span>
            <b>M</b><span>Mute / Unmute audio</span>
            <b>S</b><span>Toggle Shuffle playback</span>
            <b>R</b><span>Toggle Repeat mode (Off / All / One)</span>
            <b>Ctrl + O</b><span>Add audio files via file dialog</span>
            <b>Ctrl + Shift + O</b><span>Scan folder via folder dialog</span>
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
`;const Mt=!!window.__TAURI__,ut=new URLSearchParams(location.search).get("panel");var fe,ye;if(Mt&&ut){N(async()=>{const{getCurrentWindow:i}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:i}},__vite__mapDeps([8,7,1,0])).then(({getCurrentWindow:i})=>{const n=i();Ze(n,"melo-geo-panel-"+ut),n.onCloseRequested(()=>{Y("melo:panel-closed",ut)}),window.addEventListener("beforeunload",()=>{Y("melo:panel-closed",ut)})});const t=document.getElementById("win-"+ut),e=((fe=t==null?void 0:t.querySelector(".float-title"))==null?void 0:fe.innerHTML)||"",a=((ye=t==null?void 0:t.querySelector(".float-body"))==null?void 0:ye.innerHTML)||"";Pe.innerHTML=`
<div class="panel-root">
  <div class="panel-titlebar">${e}</div>
  <div class="panel-body">${a}</div>
  <div id="toast" class="toast"></div>
</div>`}Mt&&!ut&&(document.body.classList.add("tauri-main"),document.querySelectorAll(".side-actions .sbtn").forEach(t=>t.classList.remove("active")),N(async()=>{const{WebviewWindow:t}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:t}},__vite__mapDeps([6,7,1,0,8])).then(({WebviewWindow:t})=>{const e=async()=>{var a;for(const i of["library","playlist","equalizer","settings"])try{const n=await t.getByLabel("panel-"+i);(a=document.getElementById(Qt[i]))==null||a.classList.toggle("active",!!n)}catch{}};e(),setInterval(e,1200)}));Mt&&!ut&&(N(()=>import("./window-BWd3Cypy.js"),__vite__mapDeps([8,7,1,0])).then(async({getCurrentWindow:t})=>{const e=t(),a=()=>localStorage.getItem("melo-active-skin-id")==="compact-pill"?140:240;try{const n=JSON.parse(localStorage.getItem("melo-geo-main")||"null"),{LogicalPosition:l,LogicalSize:s}=await N(async()=>{const{LogicalPosition:r,LogicalSize:v}=await import("./dpi-fvP-W2qr.js");return{LogicalPosition:r,LogicalSize:v}},__vite__mapDeps([7,1])),g=a(),p=n!=null&&n.w?Math.max(650,n.w):960;await e.setSize(new s(p,g)),(n==null?void 0:n.x)!=null&&(n==null?void 0:n.y)!=null&&await e.setPosition(new l(n.x,n.y))}catch{}const i=async()=>{try{const n=await e.outerPosition(),l=await e.innerSize();localStorage.setItem("melo-geo-main",JSON.stringify({x:n.x,y:n.y,w:l.width,h:a()}))}catch{}};e.onMoved(i),e.onResized(async()=>{try{const n=await e.innerSize(),l=a(),{LogicalSize:s}=await N(async()=>{const{LogicalSize:g}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:g}},__vite__mapDeps([7,1]));(n.width<650||n.height!==l)&&await e.setSize(new s(Math.max(650,n.width),l))}catch{}i()}),st("melo:skin-changed",async n=>{try{const l=n==="compact-pill"||typeof n=="string"&&n.startsWith("compact-pill")?140:240,s=await e.innerSize(),{LogicalSize:g}=await N(async()=>{const{LogicalSize:p}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:p}},__vite__mapDeps([7,1]));await e.setSize(new g(Math.max(650,s.width),l)),i()}catch{}}),e.onCloseRequested(async n=>{n.preventDefault();const{WebviewWindow:l}=await N(async()=>{const{WebviewWindow:s}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:s}},__vite__mapDeps([6,7,1,0,8]));for(const s of["library","playlist","equalizer","settings"])try{const g=await l.getByLabel("panel-"+s);g&&await g.close()}catch{}try{await e.destroy()}catch{window.close()}})}),N(()=>import("./core-DhEqZVGG.js"),[]).then(async({invoke:t})=>{try{const e=await t("get_cli_tracks");if(Array.isArray(e)&&e.length>0){const a=window.LumiLibrary,i=window.LumiPlayer;e.forEach(n=>n.source="import"),a==null||a.addToCurrentPlaylist(e),e.forEach(n=>i==null?void 0:i.queue.push(n)),setTimeout(()=>{if(i&&i.queue.length>0){const n=i.queue.findIndex(l=>l.id===e[0].id);i.loadTrack(n>=0?n:0,!0)}},150)}}catch{}}),st("melo:open-files",t=>{if(Array.isArray(t)&&t.length>0){const e=window.LumiLibrary,a=window.LumiPlayer;t.forEach(i=>i.source="import"),e==null||e.addToCurrentPlaylist(t),t.forEach(i=>a==null?void 0:a.queue.push(i)),nt(`Playing ${t[0].title}`),setTimeout(()=>{if(a&&a.queue.length>0){const i=a.queue.findIndex(n=>n.id===t[0].id);a.loadTrack(i>=0?i:0,!0)}},150)}}));document.addEventListener("contextmenu",t=>{t.preventDefault()});const Vt=document.getElementById("toast"),nt=t=>{Vt&&(Vt.textContent=t,Vt.classList.add("show"),setTimeout(()=>Vt.classList.remove("show"),2200))},kt=new Audio;kt.preload="metadata";window.__LUMI_AUDIO__=kt;window.__TOAST__=nt;let xt=localStorage.getItem("lumi-theme")||"dark";function Ft(t){document.documentElement.setAttribute("data-theme",t),localStorage.setItem("lumi-theme",t),xt=t}function Xt(t){Ft(t),Y("melo:theme",t)}Ft(xt);st("melo:theme",t=>{(t==="light"||t==="dark")&&Ft(t)});setInterval(()=>{const t=localStorage.getItem("lumi-theme");(t==="light"||t==="dark")&&t!==xt&&Ft(t)},1e3);const Xe=["win-library","win-playlist","win-equalizer","win-lyrics","win-settings"],Nt=document.getElementById("desktop"),ze={btnToggleLibrary:"win-library",btnTogglePlaylist:"win-playlist",btnToggleEq:"win-equalizer",btnToggleLyrics:"win-lyrics",btnOpenSettings:"win-settings",menuToggleLibrary:"win-library",menuTogglePlaylist:"win-playlist",menuToggleEq:"win-equalizer",menuToggleLyrics:"win-lyrics",menuToggleSettings:"win-settings"};function Qe(t){const e=document.getElementById(t);return!!e&&!e.classList.contains("hidden")}const Qt={library:"btnToggleLibrary",playlist:"btnTogglePlaylist",equalizer:"btnToggleEq",lyrics:"btnToggleLyrics",settings:"btnOpenSettings"};async function Ze(t,e){const a=async()=>{try{const i=await t.outerPosition(),n=await t.outerSize();localStorage.setItem(e,JSON.stringify({x:i.x,y:i.y,w:n.width,h:n.height}))}catch{}};t.onMoved(a),t.onResized(a)}async function Ke(t){const{WebviewWindow:e}=await N(async()=>{const{WebviewWindow:v}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:v}},__vite__mapDeps([6,7,1,0,8])),a="panel-"+t,i=document.getElementById(Qt[t]),n=await e.getByLabel(a);if(n){await n.close(),i==null||i.classList.remove("active");return}const l={library:[430,620],playlist:[440,560],equalizer:[700,440],lyrics:[380,520],settings:[600,540]},s={library:[360,400],playlist:[360,360],equalizer:[620,400],lyrics:[320,360],settings:[500,400]},g={library:"Library",playlist:"Playlist",equalizer:"Equalizer",lyrics:"Synced Lyrics",settings:"Settings"},p=l[t]||[420,520];let r=null;try{r=JSON.parse(localStorage.getItem("melo-geo-panel-"+t)||"null")}catch{}new e(a,{url:`/?panel=${t}`,title:g[t]||t,width:(r==null?void 0:r.w)||p[0],height:(r==null?void 0:r.h)||p[1],minWidth:(s[t]||[360,360])[0],minHeight:(s[t]||[360,360])[1],...(r==null?void 0:r.x)!=null?{x:r.x,y:r.y}:{center:!0},decorations:!0,skipTaskbar:!0}),i==null||i.classList.add("active"),Y("melo:theme",xt)}st("melo:panel-closed",t=>{var a;const e=Qt[t];e&&((a=document.getElementById(e))==null||a.classList.remove("active"))});function Re(t){if(Mt){Ke(t.replace(/^win-/,""));return}const e=Qe(t);$t(t,!e),e||Wt(document.getElementById(t))}function ti(t){if(t.classList.contains("hidden")||!Nt||window.matchMedia("(max-width: 860px)").matches)return;const e=Nt.getBoundingClientRect();if(e.width<=0||e.height<=0)return;const a=t.getBoundingClientRect(),i=Math.min(a.width,e.width),n=Math.min(a.height,e.height);let l=a.left-e.left,s=a.top-e.top;l=Math.max(0,Math.min(e.width-i,l)),s=Math.max(0,Math.min(e.height-n,s)),t.style.left=l+"px",t.style.top=s+"px",t.style.right="auto",t.style.bottom="auto",t.style.transform="none"}function $t(t,e){var n,l,s,g,p,r,v,w,f,M;const a=document.getElementById(t);if(!a)return;a.classList.toggle("hidden",!e),localStorage.setItem("lumiv2-"+t,e?"1":"0"),e&&ti(a);const i=e;t==="win-library"&&((n=document.getElementById("btnToggleLibrary"))==null||n.classList.toggle("active",i),(l=document.getElementById("menuToggleLibrary"))==null||l.classList.toggle("active",i)),t==="win-playlist"&&((s=document.getElementById("btnTogglePlaylist"))==null||s.classList.toggle("active",i),(g=document.getElementById("menuTogglePlaylist"))==null||g.classList.toggle("active",i)),t==="win-equalizer"&&((p=document.getElementById("btnToggleEq"))==null||p.classList.toggle("active",i),(r=document.getElementById("menuToggleEq"))==null||r.classList.toggle("active",i)),t==="win-lyrics"&&((v=document.getElementById("btnToggleLyrics"))==null||v.classList.toggle("active",i),(w=document.getElementById("menuToggleLyrics"))==null||w.classList.toggle("active",i)),t==="win-settings"&&((f=document.getElementById("btnOpenSettings"))==null||f.classList.toggle("active",i),(M=document.getElementById("menuToggleSettings"))==null||M.classList.toggle("active",i))}ut||Xe.forEach(t=>{const e=localStorage.getItem("lumiv2-"+t);e!==null?$t(t,e==="1"):t==="win-settings"?$t(t,!1):$t(t,!0)});Object.entries(ze).forEach(([t,e])=>{var a;(a=document.getElementById(t))==null||a.addEventListener("click",()=>Re(e))});document.querySelectorAll("[data-close]").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.close;$t(e,!1)})});let ht=null,wt=null,ge=10;function Wt(t){ge++,t.style.zIndex=String(ge),document.querySelectorAll(".float-win").forEach(e=>e.classList.remove("active")),t.classList.add("active")}document.querySelectorAll(".float-win").forEach(t=>{t.addEventListener("mousedown",()=>Wt(t))});document.querySelectorAll("[data-drag]").forEach(t=>{t.addEventListener("mousedown",e=>{if(e.target.closest("button")||e.target.closest("input")||e.target.closest("select"))return;const a=t.dataset.drag,i=document.getElementById(a);Wt(i),i.classList.add("dragging");const n=i.getBoundingClientRect();ht={id:a,startX:e.clientX,startY:e.clientY,initX:n.left,initY:n.top,width:n.width,height:n.height}})});document.querySelectorAll("[data-resize]").forEach(t=>{t.addEventListener("mousedown",e=>{e.stopPropagation();const a=t.dataset.resize,i=document.getElementById(a);Wt(i),i.classList.add("resizing");const n=i.getBoundingClientRect();wt={id:a,startX:e.clientX,startY:e.clientY,initW:n.width,initH:n.height}})});window.addEventListener("mousemove",t=>{if(ht){const e=document.getElementById(ht.id);let a=t.clientX-ht.startX,i=t.clientY-ht.startY,n=ht.initX+a,l=ht.initY+i;if(Nt&&!window.matchMedia("(max-width: 860px)").matches){const s=Nt.getBoundingClientRect(),g=s.left,p=s.right-ht.width,r=s.top,v=s.bottom-ht.height;n=Math.max(g,Math.min(p,n))-s.left,l=Math.max(r,Math.min(v,l))-s.top}e.style.left=n+"px",e.style.top=l+"px",e.style.right="auto",e.style.bottom="auto",e.style.transform="none"}if(wt){const e=document.getElementById(wt.id);let a=wt.initW+(t.clientX-wt.startX),i=wt.initH+(t.clientY-wt.startY);a=Math.max(260,a),i=Math.max(160,i),e.style.width=a+"px",e.style.height=i+"px"}});window.addEventListener("mouseup",()=>{if(ht){const t=document.getElementById(ht.id);t&&(t.classList.remove("dragging"),localStorage.setItem("lumiv2-pos-"+ht.id,JSON.stringify({left:t.style.left,top:t.style.top}))),ht=null}if(wt){const t=document.getElementById(wt.id);t&&(t.classList.remove("resizing"),localStorage.setItem("lumiv2-size-"+wt.id,JSON.stringify({width:t.style.width,height:t.style.height}))),wt=null}});let gt=document.getElementById("appMenuBtn"),H=document.getElementById("appMenu");function ei(){const t=H==null?void 0:H.classList.toggle("open");gt==null||gt.classList.toggle("open",!!t)}gt==null||gt.addEventListener("click",t=>{t.stopPropagation(),ei()});document.addEventListener("click",t=>{H&&!H.contains(t.target)&&t.target!==gt&&(H.classList.remove("open"),gt==null||gt.classList.remove("open"))});document.addEventListener("keydown",t=>{t.key==="Escape"&&(H==null||H.classList.remove("open"),gt==null||gt.classList.remove("open"))});var be;(be=document.getElementById("menuCustomSkin"))==null||be.addEventListener("click",()=>{var t;(t=document.getElementById("skinUpload"))==null||t.click(),H==null||H.classList.remove("open")});var we;(we=document.getElementById("menuSkinDefault"))==null||we.addEventListener("click",()=>{Ut(nt);const t=document.getElementById("skinSelect");t&&(t.value="default"),H==null||H.classList.remove("open")});var xe;(xe=document.getElementById("menuSkinCompact"))==null||xe.addEventListener("click",()=>{Pt("compact-pill",xt,nt);const t=document.getElementById("skinSelect");t&&(t.value="compact-pill"),H==null||H.classList.remove("open")});var ke;(ke=document.getElementById("menuThemeToggle"))==null||ke.addEventListener("click",()=>{Xt(xt==="light"?"dark":"light"),H==null||H.classList.remove("open")});var Ee;(Ee=document.getElementById("menuAbout"))==null||Ee.addEventListener("click",()=>{nt("Melo 0.2 Beta — Tauri 2 + TypeScript + Rust"),H==null||H.classList.remove("open")});const Zt=typeof window.__TAURI_INTERNALS__<"u"||typeof window.__TAURI__<"u";async function De(){const t=window.LumiLibrary,e=window.LumiPlayer;if(Zt){try{const{open:i}=await N(async()=>{const{open:p}=await import("./index-CS3Qnt9j.js");return{open:p}},__vite__mapDeps([5,1])),n=await i({multiple:!0,filters:[{name:"Audio",extensions:["mp3","flac","wav","aac","ogg","m4a","alac","opus","wma","aiff"]}]});if(!n)return;const l=Array.isArray(n)?n:[n],{invoke:s}=await N(async()=>{const{invoke:p}=await import("./core-DhEqZVGG.js");return{invoke:p}},[]),g=[];for(const p of l)try{const r=await s("scan_library",{path:p});if(r&&r.length)r.forEach(v=>v.source="import"),g.push(...r);else{const v=p.replace(/^.*[\\/]/,""),w=v.lastIndexOf("."),f=w>0?v.slice(0,w):v,M=w>0?v.slice(w+1).toUpperCase():"AUDIO";g.push({id:p,title:f,artist:"Unknown Artist",album:"Single",duration:0,path:p,codec:M,specs:"Local File",source:"import"})}}catch{const r=p.replace(/^.*[\\/]/,""),v=r.lastIndexOf("."),w=v>0?r.slice(0,v):r,f=v>0?r.slice(v+1).toUpperCase():"AUDIO";g.push({id:p,title:w,artist:"Unknown Artist",album:"Single",duration:0,path:p,codec:f,specs:"Local File",source:"import"})}t==null||t.addTracks(g,!0),t==null||t.addToCurrentPlaylist(g),g.forEach(p=>e==null?void 0:e.queue.push(p)),Y("melo:play-tracks",{tracks:g,index:0}),nt(`${g.length} file(s) added`)}catch{nt("Error opening files")}H==null||H.classList.remove("open");return}const a=document.createElement("input");a.type="file",a.multiple=!0,a.accept="audio/*,.mp3,.flac,.wav,.aac,.ogg,.m4a,.alac,.opus,.wma,.aiff",a.onchange=async()=>{const i=Array.from(a.files||[]);if(!i.length)return;const n=[];for(const l of i){const s=l.path,g=s||URL.createObjectURL(l),p=l.name,r=p.lastIndexOf("."),v=r>0?p.slice(0,r):p,w=r>0?p.slice(r+1).toUpperCase():"AUDIO",f={id:s||"imp_"+Math.random().toString(36).slice(2,9),title:v,artist:"Unknown Artist",album:"Single",duration:0,path:g,codec:w,specs:"Local File",source:"import"};await Ot(l,f),n.push(f)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(l=>e==null?void 0:e.queue.push(l)),Y("melo:play-tracks",{tracks:n,index:0}),nt(`${n.length} file(s) added`)},a.click(),H==null||H.classList.remove("open")}async function qe(){const t=window.LumiLibrary,e=window.LumiPlayer;if(Zt){try{const{open:i}=await N(async()=>{const{open:r}=await import("./index-CS3Qnt9j.js");return{open:r}},__vite__mapDeps([5,1])),n=await i({directory:!0});if(!n)return;const l=n,{invoke:s}=await N(async()=>{const{invoke:r}=await import("./core-DhEqZVGG.js");return{invoke:r}},[]),p=(await s("scan_library",{path:l})).map(r=>({...r,source:"import"}));t==null||t.addTracks(p,!0),t==null||t.addToCurrentPlaylist(p),p.forEach(r=>e==null?void 0:e.queue.push(r)),Y("melo:play-tracks",{tracks:p,index:0}),nt(`${p.length} track(s) added from folder`)}catch{nt("Error scanning folder")}H==null||H.classList.remove("open");return}const a=document.createElement("input");a.type="file",a.webkitdirectory=!0,a.multiple=!0,a.accept="audio/*",a.onchange=async()=>{const i=Array.from(a.files||[]).filter(l=>/\.(mp3|flac|wav|aac|ogg|m4a|alac|opus|wma|aiff)$/i.test(l.name));if(!i.length)return;const n=[];for(const l of i){const s=l.path,g=s||URL.createObjectURL(l),p=l.name,r=p.lastIndexOf("."),v=r>0?p.slice(0,r):p,w=r>0?p.slice(r+1).toUpperCase():"AUDIO",f={id:s||"imp_"+Math.random().toString(36).slice(2,9),title:v,artist:"Unknown Artist",album:"Folder Import",duration:0,path:g,codec:w,specs:"Local File",source:"import"};await Ot(l,f),n.push(f)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(l=>e==null?void 0:e.queue.push(l)),Y("melo:play-tracks",{tracks:n,index:0}),nt(`${n.length} file(s) added from folder`)},a.click(),H==null||H.classList.remove("open")}var Le;(Le=document.getElementById("btnAddFiles"))==null||Le.addEventListener("click",De);var Se;(Se=document.getElementById("btnAddFolder"))==null||Se.addEventListener("click",qe);var Ie;(Ie=document.getElementById("btnThemeToggle"))==null||Ie.addEventListener("click",()=>{Xt(xt==="light"?"dark":"light")});window.addEventListener("keydown",t=>{(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="o"&&(t.shiftKey?(t.preventDefault(),qe()):(t.preventDefault(),De()))});function ve(t){var z,q,K;function e(B){document.querySelectorAll(".settings-tab").forEach(D=>{D.classList.toggle("active",D.dataset.stab===B)}),document.querySelectorAll(".settings-section[data-panel]").forEach(D=>{D.classList.toggle("active",D.dataset.panel===B)}),localStorage.setItem("melo-settings-tab",B)}document.querySelectorAll(".settings-tab").forEach(B=>{B.addEventListener("click",()=>e(B.dataset.stab))}),e(localStorage.getItem("melo-settings-tab")||"general"),document.querySelectorAll(".switch[data-key]").forEach(B=>{const D=B.dataset.key,J=localStorage.getItem("melo-pref-"+D);J!==null&&B.classList.toggle("on",J==="1"),B.onclick=()=>{B.classList.toggle("on");const O=B.classList.contains("on");localStorage.setItem("melo-pref-"+D,O?"1":"0"),t(O?"Enabled":"Disabled"),Y("melo:pref-changed",{key:D,value:O})}});const a=document.getElementById("setCrossfade"),i=document.getElementById("crossfadeVal");if(a){const B=localStorage.getItem("melo-pref-crossfade")||"0";a.value=B,i&&(i.textContent=B+"s"),a.oninput=()=>{const D=a.value;i&&(i.textContent=D+"s"),localStorage.setItem("melo-pref-crossfade",D)}}const n=document.getElementById("setLanguage");if(n){const B=localStorage.getItem("melo-pref-lang")||"en";n.value=B,n.onchange=()=>{localStorage.setItem("melo-pref-lang",n.value),t(`Language set to ${n.options[n.selectedIndex].text}`)}}const l=document.getElementById("swDynamicTheme");if(l){const B=localStorage.getItem("melo-dynamic-theme")!=="0";l.classList.toggle("on",B),l.onclick=()=>{var V,b;const D=!l.classList.contains("on");l.classList.toggle("on",D),localStorage.setItem("melo-dynamic-theme",D?"1":"0");const J=window.__LUMI_QUEUE__,O=(b=(V=window.LumiPlayer)==null?void 0:V.currentIndex)!=null?b:0;J&&J[O]&&_e(D?J[O].cover:null),t(D?"Dynamic theme enabled":"Dynamic theme disabled")}}const s=document.getElementById("skinSelect"),g=document.getElementById("btnSkinThemeToggle"),p=document.getElementById("btnRefreshSkins"),r=document.getElementById("btnOpenSkinsFolder"),v=document.getElementById("skinThemeIcon"),w=document.getElementById("skinThemeLabel");function f(B){v&&(v.textContent=B==="dark"?"🌙":"☀️"),w&&(w.textContent=B==="dark"?"Dark":"Light")}f(xt),g==null||g.addEventListener("click",()=>{const B=xt==="dark"?"light":"dark";Xt(B),f(B),t(B==="dark"?"Dark theme":"Light theme")}),st("melo:theme",B=>{(B==="light"||B==="dark")&&f(B)});async function M(){if(!s)return;const B=localStorage.getItem("melo-active-skin-id")||"default",D=await Be();s.innerHTML=`
      <option value="default">Default Melo (Standard)</option>
      <option value="compact-pill">Minimal Compact (Pill Bar)</option>
    `,D.forEach(J=>{if(J.filename!=="compact-pill-light.html"&&J.filename!=="compact-pill-dark.html"){const O=document.createElement("option");O.value=J.filename,O.textContent=`${J.name} (${J.filename})`,s.appendChild(O)}}),s.value=B}M(),s&&(s.onchange=()=>{const B=s.value;Pt(B,xt,t)}),p==null||p.addEventListener("click",async()=>{await M();const B=localStorage.getItem("melo-active-skin-id")||"default";Pt(B,xt,t),t("Skins reloaded from disk")}),r==null||r.addEventListener("click",()=>{Ce(t)}),(z=document.getElementById("btn-reset-skin-settings"))==null||z.addEventListener("click",()=>{Ut(t),s&&(s.value="default")}),(q=document.getElementById("btn-settings-reset"))==null||q.addEventListener("click",()=>{localStorage.clear(),t("Settings reset — reloading..."),setTimeout(()=>location.reload(),600)}),(K=document.getElementById("btnChooseFolder"))==null||K.addEventListener("click",async()=>{if(Zt)try{const{open:B}=await N(async()=>{const{open:J}=await import("./index-CS3Qnt9j.js");return{open:J}},__vite__mapDeps([5,1])),D=await B({directory:!0});D&&(document.getElementById("setMusicFolder").value=D,localStorage.setItem("melo-pref-music-folder",D),t("Music folder updated"))}catch{}else t("Folder selection dialog requires Tauri build")})}function Oe(){document.querySelectorAll(".win-btn").forEach(t=>{t.onclick=async()=>{const e=t.getAttribute("aria-label");if(window.__TAURI__){const{getCurrentWindow:a}=await N(async()=>{const{getCurrentWindow:n}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:n}},__vite__mapDeps([8,7,1,0])),i=a();e==="minimize"?i.minimize():e==="maximize"?i.toggleMaximize():e==="close"&&i.close()}else e==="close"&&nt("Window close requires the Tauri desktop build"),e==="maximize"&&nt("Resize: drag corner handle")}})}Oe();window.__LUMI_REBIND_MAIN__=()=>{const t=document.getElementById("appMenuBtn"),e=document.getElementById("appMenu");t&&e&&(gt=t,H=e,t.onclick=a=>{a.stopPropagation(),e.classList.toggle("open"),t.classList.toggle("open",e.classList.contains("open"))}),Oe(),Object.entries(ze).forEach(([a,i])=>{const n=document.getElementById(a);n&&(n.onclick=()=>Re(i))})};const Bt=document.createElement("div");Bt.id="scanBar";document.body.appendChild(Bt);let he=0;st("melo:scan-progress",t=>{if(!t)return;const e=t.total?Math.round(t.done/t.total*100):100;Bt.style.opacity="1",Bt.style.width=e+"%",clearTimeout(he),(t.finished||t.total&&t.done>=t.total)&&(he=setTimeout(()=>{Bt.style.opacity="0",Bt.style.width="0"},800))});Mt&&!ut&&st("melo:scan-batch",t=>{const e=window.LumiLibrary;e&&Array.isArray(t)&&t.length&&(t.forEach(a=>a.source="scan"),e.addTracks(t,!0),e.addToCurrentPlaylist(t))});const St=document.createElement("div");St.id="aboutPop";St.style.display="none";document.body.appendChild(St);var Me;(Me=document.getElementById("btnAbout"))==null||Me.addEventListener("click",t=>{var e;t.stopPropagation(),St.innerHTML=`
    <div class="about-head">Melo <b>0.3 Beta</b></div>
    <div style="font-size:11.5px; color:var(--text-soft); margin:6px 0 10px;">
      Modern Windows Music Player<br/>
      Tauri 2 + TypeScript + Rust
    </div>
    <a class="about-link" id="aboutLink" href="https://github.com/Arvanta/Melo" rel="noopener">github.com/Arvanta/Melo ↗</a>`,St.style.display=St.style.display==="none"?"block":"none",(e=document.getElementById("aboutLink"))==null||e.addEventListener("click",a=>{a.preventDefault();const i="https://github.com/Arvanta/Melo";Mt?N(()=>import("./core-DhEqZVGG.js"),[]).then(n=>n.invoke("open_url",{url:i})).catch(()=>window.open(i,"_blank")):window.open(i,"_blank")})});document.addEventListener("click",t=>{!t.target.closest("#aboutPop")&&!t.target.closest("#btnAbout")&&(St.style.display="none")});Mt&&ut?ut==="library"||ut==="playlist"?le(kt,nt):ut==="equalizer"?re(kt,nt,{remote:!0}):ut==="lyrics"?de(kt):ut==="settings"&&ve(nt):(je(kt,nt),le(kt,nt),re(kt,nt),Ge(kt),de(kt),Je(nt),ve(nt));nt("Melo 0.3 Beta is ready");
