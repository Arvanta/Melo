const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/event-CNdo2oXa.js","assets/core-DhEqZVGG.js","assets/index-DiyoAAdc.js","assets/index-CHth0gh2.js","assets/index-Bq0iOnRE.js","assets/index-CS3Qnt9j.js","assets/webviewWindow-mjQkSB26.js","assets/dpi-fvP-W2qr.js","assets/window-BWd3Cypy.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();const je="modulepreload",Ge=function(t){return"/"+t},ue={},N=function(e,a,i){let n=Promise.resolve();if(a&&a.length>0){let l=function(r){return Promise.all(r.map(m=>Promise.resolve(m).then(b=>({status:"fulfilled",value:b}),b=>({status:"rejected",reason:b}))))};document.getElementsByTagName("link");const g=document.querySelector("meta[property=csp-nonce]"),p=(g==null?void 0:g.nonce)||(g==null?void 0:g.getAttribute("nonce"));n=l(a.map(r=>{if(r=Ge(r),r in ue)return;ue[r]=!0;const m=r.endsWith(".css"),b=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${b}`))return;const v=document.createElement("link");if(v.rel=m?"stylesheet":je,m||(v.as="script"),v.crossOrigin="",v.href=r,p&&v.setAttribute("nonce",p),document.head.appendChild(v),m)return new Promise((S,A)=>{v.addEventListener("load",S),v.addEventListener("error",()=>A(new Error(`Unable to preload CSS for ${r}`)))})}))}function s(l){const g=new Event("vite:preloadError",{cancelable:!0});if(g.payload=l,window.dispatchEvent(g),!g.defaultPrevented)throw l}return n.then(l=>{for(const g of l||[])g.status==="rejected"&&s(g.reason);return e().catch(s)})},ot=typeof window.__TAURI_INTERNALS__<"u"||typeof window.__TAURI__<"u";async function J(t,e){if(ot)try{const{emit:a}=await N(async()=>{const{emit:i}=await import("./event-CNdo2oXa.js");return{emit:i}},__vite__mapDeps([0,1]));await a(t,e);return}catch{}window.dispatchEvent(new CustomEvent(t,{detail:e}))}function ct(t,e){ot&&N(async()=>{const{listen:a}=await import("./event-CNdo2oXa.js");return{listen:a}},__vite__mapDeps([0,1])).then(({listen:a})=>{a(t,i=>{e(i.payload)})}).catch(()=>{}),window.addEventListener(t,a=>e(a.detail))}let me=!1;async function Ye(){if(!me){me=!0;try{const t=globalThis;if(typeof t.Buffer>"u"){const e=await N(()=>import("./index-DiyoAAdc.js").then(a=>a.i),__vite__mapDeps([2,3]));t.Buffer=e.Buffer}typeof t.process>"u"&&(t.process={env:{},browser:!0,nextTick:e=>setTimeout(e,0)})}catch{}}}async function Je(t,e){var a;try{await Ye();const i=await N(()=>import("./index-Bq0iOnRE.js").then(r=>r.i),__vite__mapDeps([4,3])),n=i&&typeof i.parseBlob=="function"?i:i.default||i,s=await Promise.race([n.parseBlob(t),new Promise((r,m)=>setTimeout(()=>m(new Error("timeout")),1800))]),l=s==null?void 0:s.common;if(!l)return;l.title&&(e.title=l.title),l.artist?e.artist=l.artist:l.artists&&l.artists[0]&&(e.artist=l.artists[0]),l.album&&(e.album=l.album),l.genre&&l.genre[0]&&(e.genre=l.genre[0]),l.year&&(e.year=l.year);const g=(a=l.picture)==null?void 0:a[0];if(g&&g.data){const r=g.format||"image/jpeg",m=g.data;if(m.length>6e5)return;let b="";const v=8192;for(let S=0;S<m.length;S+=v){const A=m.subarray(S,S+v);b+=String.fromCharCode.apply(null,A)}e.cover=`data:${r};base64,${btoa(b)}`}const p=s==null?void 0:s.format;p&&p.duration&&!e.duration&&(e.duration=Math.floor(p.duration))}catch{}}async function Gt(t,e,a=1800){return await Je(t,e),e}async function Xe(t){return new Promise(e=>{if(!t)return e(null);const a=new Image;a.crossOrigin="anonymous",a.onload=()=>{try{const i=document.createElement("canvas"),n=i.getContext("2d");if(!n)return e(null);i.width=40,i.height=40,n.drawImage(a,0,0,40,40);const s=n.getImageData(0,0,40,40).data;let l={r:42,g:123,b:214},g=-1;for(let p=0;p<s.length;p+=4){const r=s[p],m=s[p+1],b=s[p+2];if(s[p+3]<128)continue;const S=Math.max(r,m,b),A=Math.min(r,m,b),O=(S+A)/510,Q=S-A,B=Q===0?0:Q/(1-Math.abs(2*O-1));if(B>.25&&O>.25&&O<.82){const q=B*1.5+(1-Math.abs(O-.5));q>g&&(g=q,l={r,g:m,b})}}g>0?e(l):e(null)}catch{e(null)}},a.onerror=()=>e(null),a.src=t})}async function Re(t){const e=localStorage.getItem("melo-dynamic-theme")!=="0",a=document.documentElement;if(!e||!t){a.style.removeProperty("--accent"),a.style.removeProperty("--visualizer"),a.style.removeProperty("--accent-glow");return}const i=await Xe(t);if(i){const n=`rgb(${i.r}, ${i.g}, ${i.b})`;a.style.setProperty("--accent",n),a.style.setProperty("--visualizer",n),a.style.setProperty("--accent-glow",`rgba(${i.r}, ${i.g}, ${i.b}, 0.35)`)}else a.style.removeProperty("--accent"),a.style.removeProperty("--visualizer"),a.style.removeProperty("--accent-glow")}const Wt=[31,62,125,250,500,1e3,2e3,4e3,8e3,16e3];let It=null,ee=null,ie=[],Nt=null,$t=null;function Xt(t){if(!It){const e=window.AudioContext||window.webkitAudioContext;It=new e;try{ee=It.createMediaElementSource(t)}catch{}if(ie=Wt.map(a=>{const i=It.createBiquadFilter();return i.type="peaking",i.frequency.value=a,i.Q.value=1.4,i.gain.value=0,i}),Nt=It.createGain(),Nt.gain.value=1,$t=It.createAnalyser(),$t.fftSize=2048,$t.smoothingTimeConstant=.72,ee){let a=ee;for(const i of ie)a.connect(i),a=i;a.connect(Nt),Nt.connect($t),$t.connect(It.destination)}}return{ctx:It,filters:ie,gain:Nt,analyser:$t,async resume(){It&&It.state==="suspended"&&await It.resume().catch(()=>{})}}}function Qe(t,e){let a,i,n,s,l,g,p,r=null,m,b,v,S,A,O,Q,B,q,Y,F,V,f,w=[],C=0,j=!1,K="off",st=!1;window.__LUMI_QUEUE__=w,window.__LUMI_SET_QUEUE__=c=>{w=c,window.__LUMI_QUEUE__=c};function et(c){if(!isFinite(c))return"0:00";const _=Math.floor(c/60),M=Math.floor(c%60).toString().padStart(2,"0");return`${_}:${M}`}function Z(){if(!m)return;const c=parseFloat(m.max)||100,_=parseFloat(m.value)||0,M=c>0?_/c*100:0;m.style.setProperty("--progress",M+"%")}function ut(){b&&b.style.setProperty("--vol",b.value+"%")}async function ht(c){if(!c)return"";if(/^(https?|data|blob):/.test(c))return c;if(ot)try{const{convertFileSrc:_}=await N(async()=>{const{convertFileSrc:M}=await import("./core-DhEqZVGG.js");return{convertFileSrc:M}},[]);return _(c)}catch{}return c}async function mt(c,_=!0){if(!w.length)return;c<0&&(c=w.length-1),c>=w.length&&(c=0),C=c;const M=w[c];M&&(O||E(),t.src=await ht(M.path),t.load(),O&&(O.textContent=M.title||"Unknown Title"),Q&&(Q.textContent=M.artist||"Unknown Artist"),B&&(B.textContent=M.album||""),q&&(q.textContent=M.codec||"AUDIO"),Y&&(Y.textContent=M.specs||""),M.cover&&F?(F.src=M.cover,F.style.display="block",V&&(V.style.display="none")):(F&&(F.style.display="none"),V&&(V.style.display="grid")),m&&(m.max=String(M.duration||240),m.value="0",Z()),S&&(S.textContent=et(M.duration)),v&&(v.textContent="0:00"),x(),Re(M.cover||null),document.querySelectorAll(".track-row").forEach((R,U)=>{var D;R.classList.toggle("active",((D=w[U])==null?void 0:D.id)===M.id)}),"mediaSession"in navigator&&(navigator.mediaSession.metadata=new MediaMetadata({title:M.title,artist:M.artist,album:M.album,artwork:M.cover?[{src:M.cover,sizes:"512x512",type:"image/jpeg"}]:[]}),navigator.mediaSession.setActionHandler("play",()=>At()),navigator.mediaSession.setActionHandler("pause",()=>bt()),navigator.mediaSession.setActionHandler("previoustrack",()=>y()),navigator.mediaSession.setActionHandler("nexttrack",()=>Et()),navigator.mediaSession.setActionHandler("seekto",R=>{R.seekTime&&(t.currentTime=R.seekTime)})),_&&At(),window.dispatchEvent(new CustomEvent("lumi:trackChange",{detail:M})),J("melo:track-changed",M))}let kt=!1;async function zt(){try{await Xt(t).resume()}catch{}kt&&(kt=!1,t.play().then(()=>{i&&(i.style.display="none"),n&&(n.style.display="block")}).catch(()=>{}))}window.addEventListener("pointerdown",zt),window.addEventListener("keydown",zt);async function At(){try{await Xt(t).resume()}catch{}t.play().then(()=>{kt=!1,i&&(i.style.display="none"),n&&(n.style.display="block"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="playing")}).catch(()=>{kt||(kt=!0,e("Click once inside player to begin audio playback"))})}function bt(){t.pause(),i&&(i.style.display="block"),n&&(n.style.display="none"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}function Ct(){t.paused?At():bt()}function it(){t.pause();try{t.currentTime=0}catch{}i&&(i.style.display="block"),n&&(n.style.display="none"),m&&(m.value="0",Z()),v&&(v.textContent="0:00"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}function Et(){if(!w.length)return;if(K==="one"){t.currentTime=0,At();return}let c=C+1;if(j&&(c=Math.floor(Math.random()*w.length),c===C&&w.length>1&&(c=(c+1)%w.length)),c>=w.length)if(K==="all")c=0;else{bt();return}mt(c)}function y(){if(!w.length)return;if(t.currentTime>3){t.currentTime=0;return}let c=C-1;j&&(c=Math.floor(Math.random()*w.length)),c<0&&(K==="all"?c=w.length-1:c=0),mt(c)}function x(){var D;const c=w[C];if(!c||!b)return;const _=parseInt(b.value,10)/100,M=f&&f.checked&&(D=c.replayGain)!=null?D:0,R=Math.pow(10,M/20);let U=_*R;U=Math.min(1,Math.max(0,U)),t.volume=U}function E(){if(a=document.getElementById("btnPlay"),i=document.getElementById("iconPlay"),n=document.getElementById("iconPause"),s=document.getElementById("btnPrev"),l=document.getElementById("btnNext"),g=document.getElementById("btnShuffle"),p=document.getElementById("btnRepeat"),r=document.getElementById("btnStop"),m=document.getElementById("seekBar"),b=document.getElementById("volBar"),v=document.getElementById("curTime"),S=document.getElementById("durTime"),A=document.getElementById("volPct"),O=document.getElementById("trackTitle"),Q=document.getElementById("trackArtist"),B=document.getElementById("trackAlbum"),q=document.getElementById("trackCodec"),Y=document.getElementById("trackSpecs"),F=document.getElementById("coverImg"),V=document.getElementById("coverFallback"),f=document.getElementById("replayGainToggle"),a&&(a.onclick=Ct),r&&(r.onclick=it),s&&(s.onclick=y),l&&(l.onclick=Et),g&&(g.onclick=()=>{j=!j,g.classList.toggle("active",j),e(j?"Shuffle on":"Shuffle off")}),p&&(p.onclick=()=>{K=K==="off"?"all":K==="all"?"one":"off",p.classList.toggle("active",K!=="off");const c={off:"Repeat off",all:"Repeat all",one:"Repeat one"};e(c[K]),p.title=c[K]}),m&&(m.oninput=()=>{st=!0,v&&(v.textContent=et(parseFloat(m.value))),Z()},m.onchange=()=>{t.currentTime=parseFloat(m.value),st=!1}),b&&(b.oninput=()=>{ut(),A&&(A.textContent=b.value+"%"),x()}),f&&(f.onchange=()=>x()),Z(),ut(),w[C]){const c=w[C];O&&(O.textContent=c.title||"Unknown Title"),Q&&(Q.textContent=c.artist||"Unknown Artist"),B&&(B.textContent=c.album||""),q&&(q.textContent=c.codec||"AUDIO"),Y&&(Y.textContent=c.specs||""),c.cover&&F&&(F.src=c.cover,F.style.display="block",V&&(V.style.display="none"))}}E(),t.addEventListener("timeupdate",()=>{!st&&m&&v&&(m.value=String(Math.floor(t.currentTime)),v.textContent=et(t.currentTime),Z())}),t.addEventListener("loadedmetadata",()=>{var _;if(!m||!S)return;const c=Math.floor(t.duration||((_=w[C])==null?void 0:_.duration)||240);m.max=String(c),S.textContent=et(c),Z()}),t.addEventListener("ended",()=>{Et()}),window.addEventListener("keydown",c=>{c.target.tagName!=="INPUT"&&(c.code==="Space"&&(c.preventDefault(),Ct()),c.code==="ArrowRight"&&(t.currentTime+=5),c.code==="ArrowLeft"&&(t.currentTime-=5),(c.key==="m"||c.key==="M")&&(t.muted=!t.muted,e(t.muted?"Muted":"Unmuted")),(c.key==="s"||c.key==="S")&&g&&g.click(),(c.key==="r"||c.key==="R")&&p&&p.click(),c.code==="ArrowUp"&&b&&(b.value=String(Math.min(100,parseInt(b.value,10)+5)),b.dispatchEvent(new Event("input"))),c.code==="ArrowDown"&&b&&(b.value=String(Math.max(0,parseInt(b.value,10)-5)),b.dispatchEvent(new Event("input"))))}),ct("melo:tray-action",c=>{c==="play_pause"?Ct():c==="next"?Et():c==="prev"?y():c==="mute"&&(t.muted=!t.muted,e(t.muted?"Muted":"Unmuted"))}),window.LumiPlayer={get queue(){return w},set queue(c){w=c,window.__LUMI_QUEUE__=c},get currentIndex(){return C},loadTrack:mt,play:At,pause:bt,stop:it,next:Et,prev:y,get audio(){return t},rebind:E},window.__LUMI_REBIND__=E,ct("melo:play-tracks",c=>{if(!c||!Array.isArray(c.tracks)||!c.tracks.length)return;w=c.tracks,window.__LUMI_SET_QUEUE__(w);const _=Math.max(0,Math.min(c.index||0,w.length-1));mt(_,!0)})}const Pt=ot,Ot=new URLSearchParams(location.search).get("panel")||"main";let tt=[],pt=[];try{const t=localStorage.getItem("melo-playlists");if(t){const e=JSON.parse(t);Array.isArray(e)&&e.length&&(pt=e)}}catch{}pt.length||(pt=[{id:"p1",name:"Favorites",tracks:[],createdAt:Date.now()}]);try{const t=localStorage.getItem("melo-tracks");if(t){const e=JSON.parse(t);Array.isArray(e)&&(tt=e)}}catch{}function ge(t,e){var re,ce,de,pe;const a=document.getElementById("trackList");document.getElementById("playlistList");const i=document.getElementById("winPlaylistTracks"),n=document.getElementById("winPlaylistEmpty"),s=document.getElementById("playlistSelect"),l=document.getElementById("searchInput"),g=document.getElementById("libraryStats"),p=document.getElementById("btn-scan"),r=document.getElementById("btn-export-playlist"),m=document.getElementById("btn-new-playlist"),b=document.getElementById("queueList"),v=document.getElementById("tagEditor"),S=document.getElementById("tagTitle"),A=document.getElementById("tagArtist"),O=document.getElementById("tagAlbum"),Q=document.getElementById("tagYear"),B=document.getElementById("tagCover");let q="",Y=localStorage.getItem("melo-currentPlaylist")||((re=pt[0])==null?void 0:re.id)||"",F="",V="artists",f=null,w=null,C=null,j=null,K=[];(ce=document.getElementById("libraryTabs"))==null||ce.querySelectorAll(".tab").forEach(o=>{o.addEventListener("click",()=>{document.querySelectorAll("#libraryTabs .tab").forEach(d=>d.classList.remove("active")),o.classList.add("active"),V=o.dataset.libtab,f=w=C=j=null,H()})}),l==null||l.addEventListener("input",()=>{q=l.value.toLowerCase(),H()}),H(),Lt(),p==null||p.addEventListener("click",async()=>{if(window.__TAURI__)try{const{open:o}=await N(async()=>{const{open:h}=await import("./index-CS3Qnt9j.js");return{open:h}},__vite__mapDeps([5,1])),d=await o({directory:!0,multiple:!1});if(d){e("Scanning folder in the background…");const{invoke:h}=await N(async()=>{const{invoke:L}=await import("./core-DhEqZVGG.js");return{invoke:L}},[]),u=await h("scan_library",{path:d});u.forEach(L=>L.source="scan"),mt(u,!0),kt(u),H()}}catch{e("Scanning requires the Tauri build")}else{const o=document.createElement("input");o.type="file",o.multiple=!0,o.accept="audio/*",o.onchange=async()=>{var h;const d=Array.from(o.files||[]);for(const u of d){const L=URL.createObjectURL(u),k=Math.random().toString(36).slice(2),P=((h=u.name.split(".").pop())==null?void 0:h.toUpperCase())||"MP3",I={id:k,title:u.name.replace(/\.[^/.]+$/,""),artist:"Unknown",album:"Imported",genre:"Unknown",year:new Date().getFullYear(),duration:180,path:L,codec:P,specs:"Imported · Stereo",replayGain:0},T=new Audio(L);await new Promise(X=>{T.addEventListener("loadedmetadata",()=>{I.duration=Math.floor(T.duration)||180,X(null)},{once:!0}),T.load(),setTimeout(()=>X(null),1500)}),await Gt(u,I),tt.push(I)}e(`${d.length} file(s) added`),H(),Lt()},o.click()}}),document.addEventListener("dragover",o=>{o.preventDefault()}),document.addEventListener("drop",async o=>{var h,u;if(o.preventDefault(),Pt)return;const d=Array.from(((h=o.dataTransfer)==null?void 0:h.files)||[]).filter(L=>L.type.startsWith("audio/")||/\.(mp3|flac|wav|ogg|aac|m4a|alac)$/i.test(L.name));if(d.length){for(const L of d){const k=URL.createObjectURL(L),P=Math.random().toString(36).slice(2),I=((u=L.name.split(".").pop())==null?void 0:u.toUpperCase())||"MP3",T={id:P,title:L.name.replace(/\.[^/.]+$/,""),artist:"Imported",album:"Drop",genre:"Unknown",year:new Date().getFullYear(),duration:200,path:k,codec:I,specs:"Drag & Drop"};await Gt(L,T);const X=new Audio(k);await new Promise(wt=>{X.addEventListener("loadedmetadata",()=>{T.duration=Math.floor(X.duration)||200,wt(null)},{once:!0}),X.load(),setTimeout(()=>wt(null),800)}),tt.push(T)}e(`${d.length} File added via drag & drop`),H()}});function st(){return pt.find(o=>o.id===Y)||pt[0]}function et(){localStorage.setItem("melo-rev",String(Date.now())),localStorage.setItem("melo-playlists",JSON.stringify(pt))}function Z(){Pt&&J("melo:playlists-sync",{src:Ot,playlists:pt})}function ut(o){Y=o,localStorage.setItem("melo-currentPlaylist",o),it()}ct("melo:playlists-sync",o=>{o&&o.src!==Ot&&Array.isArray(o.playlists)&&(pt=o.playlists,it(),H())});function ht(){localStorage.setItem("melo-rev",String(Date.now()));try{localStorage.setItem("melo-tracks",JSON.stringify(tt))}catch{try{localStorage.setItem("melo-tracks",JSON.stringify(tt.map(({cover:o,...d})=>d)))}catch{}}}function mt(o,d=!1){let h=!1;o.forEach(u=>{tt.some(L=>L.id===u.id)||(tt.push(u),h=!0)}),h&&(ht(),H(),it()),d&&Pt&&J("melo:tracks-add",{src:Ot,list:o})}ct("melo:tracks-add",o=>{o&&o.src!==Ot&&Array.isArray(o.list)&&mt(o.list)});function kt(o){const d=st();if(!d)return;let h=!1;o.forEach(u=>{d.tracks.includes(u.id)||(d.tracks.push(u.id),h=!0)}),h&&(et(),Z(),it(),H())}async function zt(o){if(!Pt)return[];const{invoke:d}=await N(async()=>{const{invoke:u}=await import("./core-DhEqZVGG.js");return{invoke:u}},[]),h=[];for(const u of o)try{const L=await d("scan_library",{path:u});L&&h.push(...L)}catch{}return h}Pt&&N(async()=>{const{getCurrentWebviewWindow:o}=await import("./webviewWindow-mjQkSB26.js");return{getCurrentWebviewWindow:o}},__vite__mapDeps([6,7,1,0,8])).then(({getCurrentWebviewWindow:o})=>{o().onDragDropEvent(async h=>{var u;if(h.payload.type==="drop"){const L=h.payload.paths||[];if(!L.length)return;const k=await zt(L);if(!k.length)return;k.forEach(P=>P.source="import"),mt(k,!0),kt(k),J("melo:play-tracks",{tracks:k,index:0}),e(`Playing ${((u=k[0])==null?void 0:u.title)||"track"}`)}})}).catch(()=>{});function At(o){return`${Math.floor(o/60)}:${String(Math.floor(o%60)).padStart(2,"0")}`}function bt(o){return o.type.startsWith("audio/")||/\.(mp3|flac|wav|ogg|aac|m4a|alac|opus)$/i.test(o.name)}async function Ct(o){var I;const d=o.path;if(d&&Pt){const T=await zt([d]);if(T.length)return T[0].source="import",T[0]}const h=d||URL.createObjectURL(o),u=d||Math.random().toString(36).slice(2),L=((I=o.name.split(".").pop())==null?void 0:I.toUpperCase())||"MP3",k=o.name.replace(/\.[^/.]+$/,""),P={id:u,title:k,artist:"Unknown Artist",album:"Single",genre:"Unknown",year:new Date().getFullYear(),duration:180,path:h,codec:L,specs:"Local File",replayGain:0,source:"import"};try{const T=new Audio(URL.createObjectURL(o));await new Promise(X=>{T.addEventListener("loadedmetadata",()=>{P.duration=Math.floor(T.duration)||180,X(null)},{once:!0}),T.load(),setTimeout(()=>X(null),800)})}catch{}return await Gt(o,P),P}function it(){var I,T,X,wt;if(!i)return;try{const W=localStorage.getItem("melo-tracks");if(W){const G=JSON.parse(W);Array.isArray(G)&&G.length>tt.length&&(tt=G)}}catch{}const o=st();if(s&&(s.innerHTML=pt.map(W=>`<option value="${W.id}" ${o&&W.id===o.id?"selected":""}>${W.name}</option>`).join("")),!o){i.innerHTML="",i.style.display="none",n&&(n.style.display="block");return}const d=o.tracks.map((W,G)=>{const at=tt.find(St=>St.id===W||St.path===W);if(at)return at;const gt=W.replace(/^.*[\\/]/,""),Bt=gt.lastIndexOf("."),qt=Bt>0?gt.slice(0,Bt):gt;return{id:W,title:qt||`Track ${G+1}`,artist:"Audio Track",album:o.name,duration:0,path:W,codec:"AUDIO",specs:"Local File",source:"import"}});let h=d;if(F.trim()){const W=F.toLowerCase().trim();h=d.filter(G=>(G.title||"").toLowerCase().includes(W)||(G.artist||"").toLowerCase().includes(W)||(G.album||"").toLowerCase().includes(W))}if(n&&(n.style.display=d.length?"none":"block"),i.style.display=d.length?"flex":"none",!h.length&&d.length){i.innerHTML=`<div style="padding:16px;text-align:center;color:var(--text-muted);font-size:11px;">No tracks match "${F}"</div>`;return}const u=window.LumiPlayer,L=u&&u.queue&&u.queue.length&&(T=(I=u.queue[u.currentIndex])==null?void 0:I.id)!=null?T:null,k=!!L&&!((wt=(X=u==null?void 0:u.audio)==null?void 0:X.paused)==null||wt);i.innerHTML=h.map((W,G)=>{const at=o.tracks.indexOf(W.id),gt=L===W.id;return`
      <div class="track-row ${gt?"active":""}" draggable="true" data-id="${W.id}" data-pl-idx="${at>=0?at:G}">
        <span class="num">${gt?k?"▶":"❚❚":G+1}</span>
        ${W.cover?`<img class="track-cover-mini" src="${W.cover}" onerror="this.style.display='none'"/>`:'<div class="track-cover-mini cover-default">♪</div>'}
        <div style="flex:1;min-width:0;">
          <div class="t-title">${W.title}</div>
          <div class="t-artist">${W.artist} • ${W.album}</div>
        </div>
        <span class="t-dur">${At(W.duration)}</span>
        <button class="btn small ghost" data-action="pl-remove" data-idx="${at>=0?at:G}" title="Remove from playlist">×</button>
      </div>
    `}).join("");let P=null;i.querySelectorAll(".track-row").forEach(W=>{const G=W;G.addEventListener("dragstart",at=>{P=parseInt(G.dataset.plIdx),at.dataTransfer.setData("application/x-melo-ids",G.dataset.id),at.dataTransfer.setData("application/x-melo-pl-idx",String(P)),at.dataTransfer.effectAllowed="move",G.style.opacity="0.4"}),G.addEventListener("dragend",()=>{G.style.opacity="1",P=null,i==null||i.querySelectorAll(".track-row").forEach(at=>at.classList.remove("drag-over-target"))}),G.addEventListener("dragover",at=>{at.preventDefault(),at.stopPropagation(),G.classList.add("drag-over-target")}),G.addEventListener("dragleave",()=>{G.classList.remove("drag-over-target")}),G.addEventListener("drop",at=>{var qt;at.preventDefault(),at.stopPropagation(),G.classList.remove("drag-over-target");const gt=parseInt(G.dataset.plIdx),Bt=(qt=at.dataTransfer)==null?void 0:qt.getData("application/x-melo-pl-idx");if(Bt!==void 0&&Bt!==""&&!isNaN(parseInt(Bt))){const St=parseInt(Bt);if(St!==gt&&St>=0&&gt>=0&&St<o.tracks.length&&gt<o.tracks.length){const We=o.tracks.splice(St,1)[0];o.tracks.splice(gt,0,We),et(),Z(),it(),H(),e("Track reordered in playlist");return}}}),G.addEventListener("click",at=>{const gt=at.target;if(gt.closest("[data-action='pl-remove']")){const St=parseInt(gt.closest("[data-action='pl-remove']").dataset.idx);o.tracks.splice(St,1),et(),Z(),it(),H();return}const Bt=G.dataset.id,qt=h.findIndex(St=>St.id===Bt);J("melo:play-tracks",{tracks:h,index:qt>=0?qt:0})})})}const Et=document.getElementById("playlistSearchInput");Et&&Et.addEventListener("input",()=>{F=Et.value,it()});const y=document.getElementById("playlistSortSelect");if(y&&y.addEventListener("change",()=>{const o=st();if(!o||!o.tracks.length)return;const d=y.value,h=o.tracks.map(u=>tt.find(L=>L.id===u)).filter(Boolean);d==="title-asc"?h.sort((u,L)=>u.title.localeCompare(L.title)):d==="artist-asc"?h.sort((u,L)=>u.artist.localeCompare(L.artist)):d==="album-asc"?h.sort((u,L)=>u.album.localeCompare(L.album)):d==="dur-asc"?h.sort((u,L)=>u.duration-L.duration):d==="dur-desc"&&h.sort((u,L)=>L.duration-u.duration),o.tracks=h.map(u=>u.id),et(),Z(),it(),e(`Playlist sorted by ${y.options[y.selectedIndex].text}`)}),s==null||s.addEventListener("change",()=>ut(s.value)),r==null||r.addEventListener("click",()=>{const o=st();if(!o)return e("No playlist available");const d=o.tracks.map(P=>tt.find(I=>I.id===P)).filter(Boolean);if(!d.length)return e("Current list is empty");let h=`#EXTM3U
`;d.forEach(P=>{h+=`#EXTINF:${Math.floor(P.duration)},${P.artist} - ${P.title}
${P.path}
`});const u=new Blob([h],{type:"audio/x-mpegurl"}),L=URL.createObjectURL(u),k=document.createElement("a");k.href=L,k.download=`${o.name}.m3u`,k.click(),URL.revokeObjectURL(L),e(`M3U exported for "${o.name}"`)}),m==null||m.addEventListener("click",()=>{const o=prompt("New playlist name:");if(!o)return;const d=Math.random().toString(36).slice(2,8);pt.push({id:d,name:o,tracks:[],createdAt:Date.now()}),ut(d),et(),Z(),H(),e(`Playlist "${o}" created`)}),i){const o=i.parentElement;["dragover","dragenter"].forEach(d=>o.addEventListener(d,h=>{h.preventDefault(),h.stopPropagation(),i.classList.add("drag-over")})),o.addEventListener("dragleave",d=>{o.contains(d.relatedTarget)||i.classList.remove("drag-over")}),o.addEventListener("drop",async d=>{var k,P;d.preventDefault(),d.stopPropagation(),i.classList.remove("drag-over");const h=st();if(!h)return e("Create a playlist first (+ New)");const u=(((k=d.dataTransfer)==null?void 0:k.getData("application/x-melo-ids"))||"").split(",").filter(Boolean);let L=0;if(u.length)u.forEach(I=>{h.tracks.includes(I)||(h.tracks.push(I),L++)});else if(!Pt){const I=Array.from(((P=d.dataTransfer)==null?void 0:P.files)||[]).filter(bt);for(const T of I){const X=await Ct(T);tt.push(X),h.tracks.includes(X.id)||(h.tracks.push(X.id),L++)}}L&&e(`${L} track(s) added to "${h.name}"`),ht(),et(),Z(),H(),it()})}const x=document.getElementById("playerCard");x&&(["dragover","dragenter"].forEach(o=>x.addEventListener(o,d=>{d.preventDefault(),d.stopPropagation(),x.classList.add("drag-over")})),x.addEventListener("dragleave",o=>{x.contains(o.relatedTarget)||x.classList.remove("drag-over")}),x.addEventListener("drop",async o=>{var L,k;o.preventDefault(),o.stopPropagation(),x.classList.remove("drag-over");const d=window.LumiPlayer,h=(((L=o.dataTransfer)==null?void 0:L.getData("application/x-melo-ids"))||"").split(",").filter(Boolean);let u=[];if(h.length)u=h.map(P=>tt.find(I=>I.id===P)).filter(Boolean),d&&u.length&&e(`Playback ${u.length} track(s)`);else if(!Pt){const P=Array.from(((k=o.dataTransfer)==null?void 0:k.files)||[]).filter(bt),I=st();let T=!1;for(const X of P){const wt=await Ct(X);tt.push(wt),u.push(wt),I&&!I.tracks.includes(wt.id)&&(I.tracks.push(wt.id),T=!0)}P.length&&(ht(),et(),Z(),H(),it()),d&&u.length&&e(T&&I?`Playback ${u.length} track(s) + added to "${I.name}"`:`Playback ${u.length} track(s)`)}u.length&&J("melo:play-tracks",{tracks:u,index:0})}));let E=null;function c(o){if(E=o,!E)return e("No track to edit");v.style.display="flex",S.value=E.title,A.value=E.artist,O.value=E.album,Q.value=String(E.year)}function _(o){const d=tt.filter(o).map(h=>h.id);d.length&&(tt=tt.filter(h=>!o(h)),pt.forEach(h=>{h.tracks=h.tracks.filter(u=>!d.includes(u))}),ht(),et(),Z(),Pt&&J("melo:tracks-remove",{src:Ot,ids:d}),H(),it())}ct("melo:tracks-remove",o=>{if(o&&o.src!==Ot&&Array.isArray(o.ids)){const d=o.ids;tt=tt.filter(h=>!d.includes(h.id)),pt.forEach(h=>{h.tracks=h.tracks.filter(u=>!d.includes(u))}),H(),it()}});const M=document.createElement("div");M.className="ctx-menu",M.style.display="none",document.body.appendChild(M);let R=null;function U(){M.style.display="none"}document.addEventListener("click",U),document.addEventListener("keydown",o=>{o.key==="Escape"&&U()}),M.addEventListener("click",o=>{const d=o.target.closest("[data-act]");if(!d||!R)return;o.stopPropagation();const h=d.dataset.act;h==="edit"&&c(R.track),h==="remove"&&(R.type==="track"?_(u=>u.id===R.track.id):R.type==="artist"?_(u=>u.artist===R.name):R.type==="album"?_(u=>u.artist===R.artist&&u.album===R.album):R.type==="genre"&&_(u=>u.genre===R.name)),U()});const D=document.createElement("div");D.className="ctx-menu",D.style.display="none",document.body.appendChild(D);let lt=-1;document.addEventListener("click",()=>{D.style.display="none"}),D.addEventListener("click",o=>{if(!o.target.closest("[data-act='plremove']"))return;o.stopPropagation();const d=st();d&&lt>=0&&lt<d.tracks.length&&(d.tracks.splice(lt,1),et(),Z(),it(),H()),D.style.display="none"}),document.addEventListener("contextmenu",o=>{U(),D.style.display="none";const d=o.target,h=d.closest("#winPlaylistTracks .track-row");if(h){o.preventDefault(),lt=parseInt(h.dataset.plIdx||"-1"),D.innerHTML='<button class="ctx-item danger" data-act="plremove">Remove from Playlist</button>',D.style.display="block";const P=D.getBoundingClientRect();D.style.left=Math.max(4,Math.min(o.clientX,window.innerWidth-P.width-6))+"px",D.style.top=Math.max(4,Math.min(o.clientY,window.innerHeight-P.height-6))+"px";return}if(!(Ot==="library"?!0:!!d.closest("#win-library"))){o.preventDefault();return}o.preventDefault();const L=d.closest(".track-row, [data-artist], [data-albumkey], [data-genre]");if(!L){U();return}if(L.classList.contains("track-row")){const P=K[parseInt(L.dataset.viewIdx)];if(!P){U();return}R={type:"track",track:P},M.innerHTML='<button class="ctx-item" data-act="edit">Edit tags</button><button class="ctx-item danger" data-act="remove">Remove track from library</button>'}else if(L.dataset.artist)R={type:"artist",name:L.dataset.artist},M.innerHTML='<button class="ctx-item danger" data-act="remove">Remove artist from library</button>';else if(L.dataset.albumkey){const[P,I]=(L.dataset.albumkey||"").split("\0");R={type:"album",artist:P,album:I},M.innerHTML='<button class="ctx-item danger" data-act="remove">Remove album from library</button>'}else R={type:"genre",name:L.dataset.genre},M.innerHTML='<button class="ctx-item danger" data-act="remove">Remove genre from library</button>';M.style.display="block";const k=M.getBoundingClientRect();M.style.left=Math.max(4,Math.min(o.clientX,window.innerWidth-k.width-6))+"px",M.style.top=Math.max(4,Math.min(o.clientY,window.innerHeight-k.height-6))+"px"}),(de=document.getElementById("btn-tag-cancel"))==null||de.addEventListener("click",()=>v.style.display="none"),(pe=document.getElementById("btn-tag-save"))==null||pe.addEventListener("click",async()=>{if(E){if(E.title=S.value,E.artist=A.value,E.album=O.value,E.year=parseInt(Q.value)||E.year,B.files&&B.files[0]){const o=B.files[0],d=URL.createObjectURL(o),h=new FileReader;h.onload=()=>{E.cover=h.result,H(),Lt(),J("melo:tag-updated",E)},h.readAsDataURL(o),E.cover=d}if(window.__TAURI__)try{const{invoke:o}=await N(async()=>{const{invoke:d}=await import("./core-DhEqZVGG.js");return{invoke:d}},[]);await o("write_tags",{path:E.path,tags:{title:E.title,artist:E.artist,album:E.album}})}catch{}v.style.display="none",ht(),H(),Lt(),J("melo:tag-updated",E),e("Metadata saved")}});function z(o){return String(o!=null?o:"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function rt(){return tt.filter(o=>o.source==="scan")}function ft(o){return K=o,o.length?o.map((d,h)=>{const u=`${Math.floor(d.duration/60)}:${String(Math.floor(d.duration%60)).padStart(2,"0")}`;return`
      <div class="track-row" draggable="true" data-view-idx="${h}" data-id="${z(d.id)}">
        <span class="num">${h+1}</span>
        <img class="track-cover-mini" src="${d.cover||""}" style="${d.cover?"":"display:none"}" onerror="this.style.display='none'"/>
        <div style="flex:1;min-width:0;">
          <div class="t-title">${z(d.title)}</div>
          <div class="t-artist">${z(d.artist)} • ${z(d.album)}${d.year?" • "+d.year:""}</div>
        </div>
        <span style="font-size:10px;padding:3px 6px;border-radius:6px;background:var(--badge-bg);color:var(--badge-text);border:1px solid var(--card-border);">${z(d.codec)}</span>
        <span class="t-dur">${u}</span>
        <button class="btn small ghost" data-action="add-queue" data-view-idx="${h}">+</button>
      </div>`}).join(""):'<div style="padding:30px;text-align:center;color:var(--text-muted);">Nothing here yet.<br/><span style="font-size:12px;">Use "Scan Folder" to build your library</span></div>'}function H(){if(!a){it();return}const o=rt(),d=new Set(o.map(k=>k.artist)).size,h=new Set(o.map(k=>k.artist+"\0"+k.album)).size;g&&(g.textContent=`${o.length} tracks • ${d} artists • ${h} albums`);const u=q.trim().toLowerCase();let L="";if(V==="artists")if(f){const k=o.filter(T=>T.artist===f),P=[...new Set(k.map(T=>T.album))].sort((T,X)=>T.localeCompare(X)),I=w?k.filter(T=>T.album===w):k;L=`<div class="lib-crumb"><button class="btn small" data-back="artists">‹ Artists</button><b>${z(f)}</b></div>
          <div class="chip-row"><button class="chip ${w?"":"active"}" data-album="">All albums</button>`+P.map(T=>`<button class="chip ${w===T?"active":""}" data-album="${z(T)}">${z(T)}</button>`).join("")+"</div>"+ft(u?I.filter(T=>(T.title+T.album).toLowerCase().includes(u)):I)}else{K=[];const k=[...new Set(o.map(I=>I.artist))].sort((I,T)=>I.localeCompare(T));L=(u?k.filter(I=>I.toLowerCase().includes(u)):k).map(I=>{const T=o.filter(X=>X.artist===I).length;return`<div class="lib-item" data-artist="${z(I)}"><div class="lib-avatar">${z((I[0]||"?").toUpperCase())}</div><div style="flex:1;min-width:0;"><div class="t-title">${z(I)}</div><div class="t-artist">${T} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No artists found.</div>'}else if(V==="albums")if(C){const[k,P]=C.split("\0"),I=o.filter(T=>T.artist===k&&T.album===P);L=`<div class="lib-crumb"><button class="btn small" data-back="albums">‹ Albums</button><b>${z(P)}</b><span class="t-artist" style="margin-left:8px;">${z(k)}</span></div>`+ft(u?I.filter(T=>T.title.toLowerCase().includes(u)):I)}else{K=[];const k=[...new Set(o.map(I=>I.artist+"\0"+I.album))].sort((I,T)=>I.localeCompare(T));L=(u?k.filter(I=>I.toLowerCase().includes(u)):k).map(I=>{const[T,X]=I.split("\0"),wt=o.filter(W=>W.artist===T&&W.album===X).length;return`<div class="lib-item" data-albumkey="${z(I)}"><div class="lib-avatar">💿</div><div style="flex:1;min-width:0;"><div class="t-title">${z(X)}</div><div class="t-artist">${z(T)} • ${wt} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No albums found.</div>'}else if(j){const k=o.filter(P=>P.genre===j);L=`<div class="lib-crumb"><button class="btn small" data-back="genres">‹ Genres</button><b>${z(j)}</b></div>`+ft(u?k.filter(P=>(P.title+P.artist).toLowerCase().includes(u)):k)}else{K=[];const k=[...new Set(o.map(I=>I.genre))].sort((I,T)=>I.localeCompare(T));L=(u?k.filter(I=>I.toLowerCase().includes(u)):k).map(I=>{const T=o.filter(X=>X.genre===I).length;return`<div class="lib-item" data-genre="${z(I)}"><div class="lib-avatar">🎼</div><div style="flex:1;min-width:0;"><div class="t-title">${z(I)}</div><div class="t-artist">${T} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No genres found.</div>'}a.innerHTML=L,a.querySelectorAll("[data-artist]").forEach(k=>k.addEventListener("click",()=>{f=k.dataset.artist,w=null,H()})),a.querySelectorAll("[data-albumkey]").forEach(k=>k.addEventListener("click",()=>{C=k.dataset.albumkey,H()})),a.querySelectorAll("[data-genre]").forEach(k=>k.addEventListener("click",()=>{j=k.dataset.genre,H()})),a.querySelectorAll("[data-back]").forEach(k=>k.addEventListener("click",()=>{const P=k.dataset.back;P==="artists"?(f=null,w=null):P==="albums"?C=null:j=null,H()})),a.querySelectorAll(".chip[data-album]").forEach(k=>k.addEventListener("click",()=>{w=k.dataset.album||null,H()})),a.querySelectorAll(".track-row").forEach(k=>{k.addEventListener("dragstart",P=>{P.dataTransfer.setData("application/x-melo-ids",k.dataset.id),P.dataTransfer.effectAllowed="copy"}),k.addEventListener("click",P=>{const I=P.target,T=parseInt(k.dataset.viewIdx);if(I.closest("[data-action='add-queue']")){Rt(K[T]);return}J("melo:play-tracks",{tracks:K,index:T})})}),it()}function Rt(o){J("melo:add-queue",o),e(`Queued: ${o.title}`)}function Lt(){if(!b)return;const o=window.LumiPlayer,d=(o==null?void 0:o.queue)||tt.slice(0,4);if(!d.length){b.innerHTML='<div style="text-align:center;color:var(--text-muted);font-size:12px;padding:12px;">Queue is empty</div>';return}b.innerHTML=d.map((h,u)=>{var L;return`
      <div class="track-row" data-id="${h.id}" data-queue-idx="${u}" style="padding:6px 8px;border-radius:8px;border:1px solid ${u===((L=o==null?void 0:o.currentIndex)!=null?L:0)?"var(--accent)":"transparent"};">
        <img class="track-cover-mini" src="${h.cover||""}" style="width:24px;height:24px;${h.cover?"":"display:none"}" />
        <div style="flex:1;min-width:0;">
          <div class="t-title" style="font-size:12px;">${h.title}</div>
          <div class="t-artist" style="font-size:11px;">${h.artist}</div>
        </div>
        <button class="btn small ghost" data-remove="${u}" style="padding:2px 6px;">×</button>
      </div>
    `}).join(""),b.querySelectorAll("[data-remove]").forEach(h=>{h.addEventListener("click",()=>{const u=parseInt(h.dataset.remove);d.splice(u,1),Lt()})}),b.querySelectorAll(".track-row").forEach(h=>{h.addEventListener("click",u=>{if(u.target.closest("[data-remove]"))return;const L=parseInt(h.dataset.queueIdx),k=window.LumiPlayer;k&&k.loadTrack(L)})})}ct("melo:track-changed",o=>{Lt();const d=document.getElementById("lyricsBox");d&&o&&(d.textContent=o.lyrics||"No lyrics found for this track. You can add it via the tag editor."),document.querySelectorAll(".track-row").forEach(h=>{h.classList.toggle("active",h.dataset.id===(o==null?void 0:o.id))})}),setInterval(()=>Lt(),2e3);let le=localStorage.getItem("melo-rev")||"";setInterval(()=>{const o=localStorage.getItem("melo-rev")||"";if(o!==le){le=o;try{const d=JSON.parse(localStorage.getItem("melo-tracks")||"null");Array.isArray(d)&&(tt=d)}catch{}try{const d=JSON.parse(localStorage.getItem("melo-playlists")||"null");Array.isArray(d)&&d.length&&(pt=d)}catch{}H(),it()}},1200),window.LumiLibrary={get tracks(){return tt},get playlists(){return pt},render:H,addTracks:mt,addToCurrentPlaylist:kt,importPaths:zt,currentPlaylistName:()=>{var o;return((o=st())==null?void 0:o.name)||"Playlist"}}}const jt={flat:[0,0,0,0,0,0,0,0,0,0],pop:[-1,2,4,4,2,-1,-1,2,3,3],rock:[4,3,2,-1,-2,-2,1,3,4,4],bass:[6,5,4,2,1,0,-1,-1,-2,-3],treble:[-3,-2,-1,0,1,2,3,5,6,6],dance:[5,4,2,0,-1,-1,2,4,5,3],jazz:[2,1,2,3,2,0,1,2,3,2],classical:[3,2,1,0,0,0,-1,2,3,4],vocal:[-2,-1,0,2,4,4,3,1,0,-1],acoustic:[3,2,1,1,2,2,3,3,2,1],hiphop:[5,4,1,2,-1,-1,1,-1,2,3],metal:[4,2,-1,-2,-1,1,3,4,5,4]};function ae(t){for(const[e,a]of Object.entries(jt))if(a.every((i,n)=>i===t[n]))return e;return"custom"}function ve(t,e,a={}){const i=!!a.remote,n=document.getElementById("eqEnable"),s=document.getElementById("eqPreset"),l=document.getElementById("btnEqReset"),g=document.getElementById("eqBands"),p=document.getElementById("eqCanvas"),r=p?p.getContext("2d"):null;let m=null,b=[],v=[],S=new Array(Wt.length).fill(0);try{const f=JSON.parse(localStorage.getItem("melo-eq-gains")||"null");Array.isArray(f)&&f.length===Wt.length&&(S=f.map(w=>typeof w=="number"?Math.max(-12,Math.min(12,w)):0))}catch{}let A=localStorage.getItem("melo-eq-preset")||ae(S),O=localStorage.getItem("melo-eq-enabled")!=="0";function Q(){if(!m)try{const f=Xt(t);m=f.ctx,b=f.filters,b.forEach((w,C)=>{w.gain.value=O?S[C]:0})}catch{}}function B(f,w){Q(),b[f]&&O&&(b[f].gain.value=w)}function q(f){Q(),S=[...f],O&&f.forEach((w,C)=>{b[C]&&(b[C].gain.value=w)}),V()}function Y(f){Q(),O=f,f?S.forEach((w,C)=>{b[C]&&(b[C].gain.value=w)}):b.forEach(w=>{w.gain.value=0}),V()}i||t&&t.addEventListener("play",()=>{Q(),(m==null?void 0:m.state)==="suspended"&&m.resume().catch(()=>{})}),ct("melo:eq",f=>{f&&(f.type==="gain"?(i||B(f.idx,f.val),S[f.idx]=f.val,v[f.idx]&&(v[f.idx].value=String(f.val),F(v[f.idx])),s&&(s.value=ae(S)),V()):f.type==="gains"?(i||q(f.values),S=[...f.values],v.length&&v.forEach((w,C)=>{w.value=String(S[C]),F(w)}),s&&f.preset&&(s.value=f.preset),V()):f.type==="enable"&&(O=!!f.on,i||Y(O),n&&(n.checked=O),V()))});function F(f){var j;const w=parseInt(f.value),C=(j=f.parentElement)==null?void 0:j.querySelector(".val");C&&(C.textContent=(w>0?"+":"")+w+"dB")}function V(){if(!p||!r)return;const f=window.devicePixelRatio||1,w=p.clientWidth*f,C=p.clientHeight*f;if(w<=0||C<=0)return;p.width=w,p.height=C,r.clearRect(0,0,w,C);const j=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#2a7bd6",K=S;if(!O){r.strokeStyle="rgba(100,120,150,0.25)",r.lineWidth=2*f,r.beginPath(),r.moveTo(0,C/2),r.lineTo(w,C/2),r.stroke();return}r.strokeStyle=j,r.lineWidth=2.5*f,r.lineJoin="round",r.beginPath(),K.forEach((st,et)=>{const Z=et/(K.length-1)*w,ut=C/2-st/12*(C/2-10*f);if(et===0)r.moveTo(Z,ut);else{const ht=(et-1)/(K.length-1)*w,mt=C/2-K[et-1]/12*(C/2-10*f);r.quadraticCurveTo((ht+Z)/2,mt,Z,ut)}}),r.stroke(),K.forEach((st,et)=>{const Z=et/(K.length-1)*w,ut=C/2-st/12*(C/2-10*f);r.fillStyle=j,r.beginPath(),r.arc(Z,ut,4*f,0,Math.PI*2),r.fill(),r.fillStyle="white",r.beginPath(),r.arc(Z,ut,2*f,0,Math.PI*2),r.fill()}),r.strokeStyle="rgba(100,120,150,0.3)",r.lineWidth=1*f,r.setLineDash([4*f,4*f]),r.beginPath(),r.moveTo(0,C/2),r.lineTo(w,C/2),r.stroke(),r.setLineDash([])}g&&(g.innerHTML="",Wt.forEach((f,w)=>{const C=S[w]||0,j=document.createElement("div");j.className="eq-band",j.innerHTML=`
        <input type="range" min="-12" max="12" value="${C}" step="1" data-idx="${w}" orient="vertical" />
        <label>${f>=1e3?f/1e3+"k":f}</label>
        <span style="font-size:10px;color:var(--text-muted);min-height:12px;" class="val">${(C>0?"+":"")+C+"dB"}</span>
      `,g.appendChild(j)}),v=Array.from(g.querySelectorAll("input")),v.forEach(f=>{f.addEventListener("input",()=>{const w=parseInt(f.dataset.idx),C=parseInt(f.value);F(f),S[w]=C,V();const j=ae(S);s&&(s.value=j),localStorage.setItem("melo-eq-gains",JSON.stringify(S)),localStorage.setItem("melo-eq-preset",j),i||B(w,C),J("melo:eq",{type:"gain",idx:w,val:C,values:S})})})),s&&(s.value=A,s.addEventListener("change",()=>{const f=jt[s.value]||jt.flat;v.length&&v.forEach((w,C)=>{w.value=String(f[C]),F(w)}),S=[...f],V(),localStorage.setItem("melo-eq-gains",JSON.stringify(S)),localStorage.setItem("melo-eq-preset",s.value),i||q(f),J("melo:eq",{type:"gains",values:f,preset:s.value}),e(`Preset: ${s.options[s.selectedIndex].text}`)})),l&&l.addEventListener("click",()=>{const f=jt.flat;v.length&&v.forEach((w,C)=>{w.value="0",F(w)}),S=[...f],s&&(s.value="flat"),localStorage.setItem("melo-eq-gains",JSON.stringify(S)),localStorage.setItem("melo-eq-preset","flat"),i||q(f),J("melo:eq",{type:"gains",values:f,preset:"flat"}),V(),e("Equalizer reset to Flat (0dB)")}),n&&(n.checked=O,n.addEventListener("change",()=>{O=n.checked,localStorage.setItem("melo-eq-enabled",O?"1":"0"),i||Y(O),J("melo:eq",{type:"enable",on:O}),V(),e(O?"Equalizer On":"Equalizer off — Flat")})),p&&new ResizeObserver(()=>V()).observe(p),V(),window.LumiEqualizer={presets:jt,frequencies:Wt,displayGains:S,reset:()=>l==null?void 0:l.click()}}const Ht=[{id:"bars",label:"Classic Bars"},{id:"thin",label:"Thin Bars"},{id:"line",label:"Spectrum Line"},{id:"mirror",label:"Mirror Bars"},{id:"wave",label:"Oscilloscope"}];function Ke(t){let e=document.getElementById("vizBars");if(!e)return;let a=O(e),i=a.getContext("2d"),n=null,s=null,l=null,g=null,p=null,r=!1,m=localStorage.getItem("melo-viz-mode")||"bars";Ht.some(y=>y.id===m)||(m="bars");let b=0,v=[],S=.45,A=null;function O(y){let x=y.querySelector("canvas");return x||(y.innerHTML="",x=document.createElement("canvas"),y.appendChild(x)),x}function Q(){if(!(s&&l))try{const y=Xt(t);n=y.ctx,s=y.analyser,l=new Uint8Array(s.frequencyBinCount),g=new Uint8Array(s.fftSize)}catch{r=!0}}function B(y){const x=l.length,E=((n==null?void 0:n.sampleRate)||44100)/2,c=45,_=Math.min(15e3,E*.95),M=Math.log(c),R=Math.log(_),U=[];for(let D=0;D<y;D++){const lt=Math.exp(M+(R-M)*D/y),z=Math.exp(M+(R-M)*(D+1)/y);let rt=Math.floor(lt/E*x),ft=Math.max(rt+1,Math.ceil(z/E*x));rt<0&&(rt=0),ft>x&&(ft=x);let H=0;for(let Rt=rt;Rt<ft;Rt++)H+=l[Rt];U.push(H/(ft-rt)/255)}return U}function q(y){const x=performance.now()/1e3,E=Math.pow(Math.abs(Math.sin(x*2.2)),2.5),c=[];for(let _=0;_<y;_++){let M=.42+.26*Math.sin(x*1.35+_*.62)+.2*Math.sin(x*2.9+_*1.31)+Math.random()*.07;M*=.55+.5*E,c.push(Math.max(.04,Math.min(1,M)))}return c}function Y(y){const x=performance.now()/1e3,E=.5+.5*Math.pow(Math.abs(Math.sin(x*1.9)),2);for(let c=0;c<y.length;c++){const _=c/y.length;y[c]=128+66*E*(Math.sin(_*Math.PI*6+x*7)*.6+Math.sin(_*Math.PI*13-x*11)*.4)}}function F(y){let x;if(r||!s||!l)x=q(y);else if(s.getByteFrequencyData(l),x=B(y),!x.some(_=>_>.01)&&!t.paused)x=q(y);else for(let _=0;_<y;_++)x[_]*=1+1.7*(_/Math.max(1,y-1));let E=0;for(const c of x)c>E&&(E=c);E>S?S=E:S=Math.max(.35,S*.985),v.length!==y&&(v=new Array(y).fill(0));for(let c=0;c<y;c++){const _=Math.min(1,x[c]/S),M=_>v[c]?.55:.16;v[c]+=(_-v[c])*M}return v}function V(y,x){return getComputedStyle(document.documentElement).getPropertyValue(y).trim()||x}function f(){return a.width/Math.max(1,a.clientWidth)||1}function w(y,x,E,c,_){if(_=Math.min(_,E/2,c/2),i.roundRect){i.roundRect(y,x,E,c,_);return}i.rect(y,x,E,c)}function C(){const y=window.devicePixelRatio||1,x=a.clientWidth||(e==null?void 0:e.clientWidth)||200,E=a.clientHeight||(e==null?void 0:e.clientHeight)||56;x>0&&E>0&&(a.width=Math.round(x*y),a.height=Math.round(E*y))}new ResizeObserver(C).observe(a),C();function j(y,x,E,c){const _=f(),M=V("--visualizer","#38bdf8"),R=V("--accent","#0284c7"),U=y.length,D=x/U,lt=Math.max(1.2*_,D*(1-c));for(let z=0;z<U;z++){const rt=y[z],ft=Math.max(2*_,rt*(E-4*_)),H=z*D+(D-lt)/2,Rt=E-ft-1*_,Lt=i.createLinearGradient(0,Rt,0,E);Lt.addColorStop(0,R),Lt.addColorStop(1,M),i.fillStyle=Lt,i.beginPath(),w(H,Rt,lt,ft,Math.min(lt/2,3.5*_)),i.fill()}}function K(y,x,E){const c=f(),_=V("--visualizer","#38bdf8"),M=V("--accent","#0284c7"),R=y.length,U=x/R,D=E/2,lt=Math.max(1.5*c,U*.62);for(let z=0;z<R;z++){const rt=Math.max(1.5*c,y[z]*(E/2-3*c)),ft=z*U+(U-lt)/2,H=i.createLinearGradient(0,D-rt,0,D+rt);H.addColorStop(0,M),H.addColorStop(.5,_),H.addColorStop(1,M),i.fillStyle=H,i.beginPath(),w(ft,D-rt,lt,rt*2,Math.min(lt/2,3*c)),i.fill()}}function st(y,x,E){const c=f(),_=V("--visualizer","#38bdf8"),M=V("--accent","#0284c7"),R=y.length,U=[],D=[];for(let z=0;z<R;z++)U.push((z+.5)/R*x),D.push(E-2*c-y[z]*(E-8*c));i.beginPath(),i.moveTo(U[0],E),i.lineTo(U[0],D[0]);for(let z=1;z<R;z++){const rt=(U[z-1]+U[z])/2;i.quadraticCurveTo(U[z-1],D[z-1],rt,(D[z-1]+D[z])/2)}i.lineTo(U[R-1],D[R-1]),i.lineTo(U[R-1],E),i.closePath();const lt=i.createLinearGradient(0,0,0,E);lt.addColorStop(0,_),lt.addColorStop(1,"transparent"),i.globalAlpha=.18,i.fillStyle=lt,i.fill(),i.globalAlpha=1,i.beginPath(),i.moveTo(U[0],D[0]);for(let z=1;z<R;z++){const rt=(U[z-1]+U[z])/2;i.quadraticCurveTo(U[z-1],D[z-1],rt,(D[z-1]+D[z])/2)}i.lineTo(U[R-1],D[R-1]),i.strokeStyle=M,i.lineWidth=2*c,i.lineJoin="round",i.stroke()}function et(){const y=a.width,x=a.height,E=f(),c=V("--accent","#0284c7");let _;r||!s||!g?(p||(p=new Uint8Array(1024)),Y(p),_=p):(s.getByteTimeDomainData(g),_=g);const M=()=>{i.beginPath();for(let R=0;R<=y;R+=2){const U=Math.min(_.length-1,Math.floor(R/y*_.length)),D=_[U]/255*x;R===0?i.moveTo(R,D):i.lineTo(R,D)}};M(),i.strokeStyle=c,i.globalAlpha=.16,i.lineWidth=6*E,i.lineJoin="round",i.stroke(),M(),i.globalAlpha=1,i.lineWidth=1.8*E,i.stroke()}function Z(){const y=a.width,x=a.height;if(!y||!x)return;if(i.clearRect(0,0,y,x),m==="wave"){et();return}const c=F(m==="bars"?16:m==="thin"?56:m==="line"?64:24);m==="bars"?j(c,y,x,.34):m==="thin"?j(c,y,x,.32):m==="line"?st(c,y,x):m==="mirror"&&K(c,y,x)}function ut(){b=requestAnimationFrame(ut),Z()}function ht(){b||ut()}function mt(y,x=!1){var E;if(m=y,v=[],localStorage.setItem("melo-viz-mode",y),!x){const c=window.__TOAST__,_=(E=Ht.find(M=>M.id===y))==null?void 0:E.label;c&&_&&c(`Visualizer: ${_}`)}}function kt(){return A||(A=document.createElement("div"),A.className="viz-menu",A.style.display="none",document.body.appendChild(A),A)}function zt(){const y=kt();y.innerHTML='<div class="viz-menu-label">Visualizer type</div>'+Ht.map(x=>`<button class="viz-menu-item ${x.id===m?"active":""}" data-mode="${x.id}">${x.id===m?"✓":""}<span>${x.label}</span></button>`).join(""),y.querySelectorAll("[data-mode]").forEach(x=>{x.addEventListener("click",E=>{E.stopPropagation(),mt(x.dataset.mode),bt()})})}function At(y,x){zt();const E=A;E.style.display="block";const c=E.getBoundingClientRect();E.style.left=Math.max(8,Math.min(y,window.innerWidth-c.width-8))+"px",E.style.top=Math.max(8,Math.min(x,window.innerHeight-c.height-8))+"px"}function bt(){A&&(A.style.display="none")}function Ct(){e&&(e.title="Click: next mode • Right-click: choose mode",e.addEventListener("click",()=>{bt();const y=Ht.findIndex(x=>x.id===m);mt(Ht[(y+1)%Ht.length].id)}),e.addEventListener("contextmenu",y=>{y.preventDefault(),y.stopPropagation(),At(y.clientX,y.clientY)}))}document.addEventListener("click",y=>{A&&A.style.display!=="none"&&!A.contains(y.target)&&bt()}),document.addEventListener("keydown",y=>{y.key==="Escape"&&bt()});function it(){Q(),ht(),(n==null?void 0:n.state)==="suspended"&&n.resume().catch(()=>{})}t.addEventListener("play",it),it(),Ct(),document.addEventListener("visibilitychange",()=>{document.hidden?(cancelAnimationFrame(b),b=0):ht()});function Et(){cancelAnimationFrame(b),b=0,e=document.getElementById("vizBars"),e&&(a=O(e),i=a.getContext("2d"),new ResizeObserver(C).observe(a),C(),Ct(),ht())}window.__LUMI_REBIND_VISUALIZER__=Et}function he(t){if(!t||!t.trim())return{isSynced:!1,lines:[],raw:""};const e=[],a=t.split(/\r?\n/),i=/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;let n=!1;for(const s of a){const l=s.trim();if(!l||/^\[[a-z]{2,8}:/i.test(l))continue;const g=[...l.matchAll(i)];if(g.length>0){n=!0;const p=l.replace(i,"").trim();for(const r of g){const m=parseInt(r[1],10),b=parseInt(r[2],10),v=r[3]||"0",S=v.length===2?parseInt(v,10)*10:v.length===1?parseInt(v,10)*100:parseInt(v.slice(0,3),10),A=m*60+b+S/1e3;e.push({time:A,text:p})}}else e.push({time:-1,text:l})}return e.sort((s,l)=>s.time-l.time),{isSynced:n,lines:e,raw:t}}function fe(t,e){const a=document.getElementById("lyricsContainer"),i=document.getElementById("lyricsStatus"),n=document.getElementById("lyricsTrackTitle");let s={isSynced:!1,lines:[]},l=-1;async function g(v){if(v.lyrics&&v.lyrics.trim().length>0)return v.lyrics;if(window.__TAURI__)try{const{invoke:S}=await N(async()=>{const{invoke:O}=await import("./core-DhEqZVGG.js");return{invoke:O}},[]),A=await S("get_track_lyrics",{path:v.path});if(A)return A}catch{}return null}async function p(v){if(!v){s={isSynced:!1,lines:[],raw:""},r();return}v.id,n&&(n.textContent=`${v.title} — ${v.artist}`);const S=await g(v);s=he(S||""),r()}function r(){if(a){if(a.innerHTML="",l=-1,!s.lines.length){i&&(i.style.display="block",i.innerHTML='No synced lyrics found (.lrc)<br/><span style="font-size:10.5px; opacity:0.7;">Place a matching .lrc file in the song folder or add lyrics in the tag editor.</span>');return}i&&(i.style.display="none"),s.lines.forEach((v,S)=>{const A=document.createElement("div");A.className="lyric-line",A.dataset.idx=String(S),A.dataset.time=String(v.time),A.textContent=v.text||"♪",v.time>=0&&(A.style.cursor="pointer",A.title=`Seek to ${Math.floor(v.time/60)}:${Math.floor(v.time%60).toString().padStart(2,"0")}`,A.addEventListener("click",()=>{t.currentTime=v.time,t.play().catch(()=>{})})),a.appendChild(A)})}}function m(){if(!a||!s.isSynced||!s.lines.length)return;const v=t.currentTime;let S=-1;for(let A=0;A<s.lines.length&&s.lines[A].time<=v;A++)S=A;if(S!==l){l=S;const A=a.querySelectorAll(".lyric-line");if(A.forEach((O,Q)=>{O.classList.toggle("active",Q===l),O.classList.toggle("passed",Q<l)}),l>=0&&A[l]){const O=A[l],Q=a.clientHeight,q=O.offsetTop-a.offsetTop-Q/2+O.clientHeight/2;a.scrollTo({top:Math.max(0,q),behavior:"smooth"})}}}t.addEventListener("timeupdate",m),window.addEventListener("lumi:trackChange",v=>{p(v.detail)}),ct("melo:track-changed",v=>{p(v)});const b=window.__LUMI_QUEUE__;Array.isArray(b)&&b.length>0&&p(b[0]),window.LumiLyrics={loadTrackLyrics:p,parseLRC:he}}let Tt=null;const ye=`<!doctype html>
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
</html>`,be=`<!doctype html>
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
</html>`,we={"compact-pill-light.html":ye,"compact-pill-dark.html":be,"compact-pill-light":ye,"compact-pill-dark":be},Ze=[{id:"compact-pill-light",name:"Minimal Compact (Light)",filename:"compact-pill-light.html"},{id:"compact-pill-dark",name:"Minimal Compact (Dark)",filename:"compact-pill-dark.html"},{id:"full-html-example",name:"Full HTML Example",filename:"full-html-example.html"},{id:"example-custom",name:"Custom CSS Example",filename:"example-custom.html"}];function De(t){const e=["trackTitle","btnPlay","seekBar","coverImg"];let a=0;for(const i of e)t.includes(i)&&a++;return a>=3}function Ft(t,e){const a=document.getElementById("playerCard");if(!a)return;const i=a._originalHTML||a.innerHTML;a._originalHTML||(a._originalHTML=i),Tt&&(Tt.remove(),Tt=null);let s=[...t.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(b=>b[1]).join(`
`);s&&(Tt=document.createElement("style"),Tt.id="melo-custom-skin",Tt.textContent=s,document.head.appendChild(Tt));const l=De(t);let g="";const p=t.match(/<body[^>]*>([\s\S]*?)<\/body>/i);p?g=p[1]:g=t.split(/<\/style>/i).pop()||"";const r=document.createElement("div");r.innerHTML=g;const m=r.querySelector("#lumi-player");if(m&&(g=m.innerHTML),l&&g.trim().length>20){const b=g.trim();a.innerHTML=b,e&&e("Skin applied"),setTimeout(()=>{var S,A;(S=window.__LUMI_REBIND__)==null||S.call(window);const v=window.__LUMI_AUDIO__;v&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(v),(A=window.__LUMI_REBIND_MAIN__)==null||A.call(window)},40)}else s&&e&&e("Skin CSS applied");localStorage.setItem("lumi-custom-skin",t),localStorage.setItem("lumi-custom-skin-isFull",l?"1":"0")}function Kt(t,e=!0){Tt&&(Tt.remove(),Tt=null);const a=document.getElementById("playerCard");a&&a._originalHTML&&(a.innerHTML=a._originalHTML,setTimeout(()=>{var n,s;(n=window.__LUMI_REBIND__)==null||n.call(window);const i=window.__LUMI_AUDIO__;i&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(i),(s=window.__LUMI_REBIND_MAIN__)==null||s.call(window)},40)),localStorage.removeItem("lumi-custom-skin"),localStorage.removeItem("lumi-custom-skin-isFull"),localStorage.setItem("melo-active-skin-id","default"),e&&J("melo:skin-changed","default"),t&&t("Switched to Default Melo skin")}async function qe(){if(ot)try{const{invoke:t}=await N(async()=>{const{invoke:a}=await import("./core-DhEqZVGG.js");return{invoke:a}},[]),e=await t("list_installed_skins");if(Array.isArray(e)&&e.length>0)return e}catch{}return Ze}async function Oe(t,e){if(ot)try{const{invoke:i}=await N(async()=>{const{invoke:s}=await import("./core-DhEqZVGG.js");return{invoke:s}},[]),n=await i("read_skin_file",{filenameOrPath:t});if(n&&n.trim().length>0)return Ft(n,e),!0}catch{}try{const i=t.startsWith("skins/")?t:`skins/${t}`,n=await fetch(i);if(n.ok){const s=await n.text();return Ft(s,e),!0}}catch{}const a=t.replace(/^.*[\\/]/,"");return we[a]?(Ft(we[a],e),!0):(e&&e(`Could not load skin: ${t}`),!1)}async function Dt(t,e,a,i=!0){if(t==="default"){Kt(a,i);return}let n=t;t==="compact-pill"||t.startsWith("compact-pill")?n=e==="dark"?"compact-pill-dark.html":"compact-pill-light.html":!n.endsWith(".html")&&!n.endsWith(".htm")&&(n=n+".html"),await Oe(n,a)&&(localStorage.setItem("melo-active-skin-id",t),i&&J("melo:skin-changed",t))}async function Ue(t){if(ot)try{const{invoke:e}=await N(async()=>{const{invoke:a}=await import("./core-DhEqZVGG.js");return{invoke:a}},[]);await e("open_skins_folder"),t&&t("Opening skins folder...")}catch{t&&t("Could not open skins folder")}else t&&t("Skins are located in the skins/ folder")}function ti(t){const e=document.getElementById("skinUpload"),a=document.getElementById("linkDownloadExample");a&&a.addEventListener("click",s=>{s.preventDefault(),Oe("compact-pill-light.html")});const i=localStorage.getItem("melo-active-skin-id")||"default",n=localStorage.getItem("lumi-theme")||"dark";i!=="default"&&setTimeout(()=>{Dt(i,n,void 0,!1)},150),ct("melo:theme",s=>{const l=localStorage.getItem("melo-active-skin-id");l&&l!=="default"&&Dt(l,s,void 0,!1)}),ct("melo:skin-changed",s=>{if(s&&typeof s=="string"){const l=localStorage.getItem("lumi-theme")||"dark";Dt(s,l,void 0,!1)}}),e&&e.addEventListener("change",async()=>{var p;const s=(p=e.files)==null?void 0:p[0];if(!s)return;const l=await s.text(),g=s.name;if(ot)try{const{invoke:r}=await N(async()=>{const{invoke:m}=await import("./core-DhEqZVGG.js");return{invoke:m}},[]);await r("save_custom_skin_file",{filename:g,content:l}),t(`Saved ${g} to skins folder`)}catch{}Ft(l,t),localStorage.setItem("melo-active-skin-id",g),J("melo:skin-changed",g),e.value=""}),document.addEventListener("dragover",s=>{var l;[...((l=s.dataTransfer)==null?void 0:l.types)||[]].includes("Files")&&s.preventDefault()}),document.addEventListener("drop",async s=>{var g;const l=[...((g=s.dataTransfer)==null?void 0:g.files)||[]].find(p=>p.name.endsWith(".html")||p.name.endsWith(".htm"));if(l){s.preventDefault();const p=await l.text();if(p.includes("<style")||p.includes("<html")||De(p)){const r=l.name;if(ot)try{const{invoke:m}=await N(async()=>{const{invoke:b}=await import("./core-DhEqZVGG.js");return{invoke:b}},[]);await m("save_custom_skin_file",{filename:r,content:p})}catch{}Ft(p,t),localStorage.setItem("melo-active-skin-id",r),J("melo:skin-changed",r)}}}),window.LumiSkin={applyCustomSkin:Ft,resetSkin:Kt,applySkinChoice:Dt,listInstalledSkins:qe,openSkinsFolderOnDisk:Ue}}const $e=document.querySelector("#app");$e.innerHTML=`
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
`;const dt=new URLSearchParams(location.search).get("panel");var Le,Se;if(ot&&dt){N(async()=>{const{getCurrentWindow:i}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:i}},__vite__mapDeps([8,7,1,0])).then(({getCurrentWindow:i})=>{const n=i();ai(n,"melo-geo-panel-"+dt),n.onCloseRequested(()=>{J("melo:panel-closed",dt)}),window.addEventListener("beforeunload",()=>{J("melo:panel-closed",dt)})});const t=document.getElementById("win-"+dt),e=((Le=t==null?void 0:t.querySelector(".float-title"))==null?void 0:Le.innerHTML)||"",a=((Se=t==null?void 0:t.querySelector(".float-body"))==null?void 0:Se.innerHTML)||"";$e.innerHTML=`
<div class="panel-root">
  <div class="panel-titlebar">${e}</div>
  <div class="panel-body">${a}</div>
  <div id="toast" class="toast"></div>
</div>`}ot&&!dt&&(document.documentElement.classList.add("tauri-main"),document.body.classList.add("tauri-main"),document.querySelectorAll(".side-actions .sbtn").forEach(t=>t.classList.remove("active")),N(async()=>{const{WebviewWindow:t}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:t}},__vite__mapDeps([6,7,1,0,8])).then(({WebviewWindow:t})=>{const e=async()=>{var a;for(const i of["library","playlist","equalizer","settings"])try{const n=await t.getByLabel("panel-"+i);(a=document.getElementById(oe[i]))==null||a.classList.toggle("active",!!n)}catch{}};e(),setInterval(e,1200)}));ot&&!dt&&(N(()=>import("./window-BWd3Cypy.js"),__vite__mapDeps([8,7,1,0])).then(async({getCurrentWindow:t})=>{const e=t(),a=()=>{const n=localStorage.getItem("melo-active-skin-id"),s=n==="compact-pill"||typeof n=="string"&&n.startsWith("compact-pill");return{w:s?780:960,h:s?138:240}};try{const n=JSON.parse(localStorage.getItem("melo-geo-main")||"null"),{LogicalPosition:s,LogicalSize:l}=await N(async()=>{const{LogicalPosition:p,LogicalSize:r}=await import("./dpi-fvP-W2qr.js");return{LogicalPosition:p,LogicalSize:r}},__vite__mapDeps([7,1])),g=a();await e.setSize(new l(n!=null&&n.w?Math.max(650,n.w):g.w,g.h)),(n==null?void 0:n.x)!=null&&(n==null?void 0:n.y)!=null&&await e.setPosition(new s(n.x,n.y))}catch{}const i=async()=>{try{const n=await e.outerPosition(),s=await e.innerSize(),l=a();localStorage.setItem("melo-geo-main",JSON.stringify({x:n.x,y:n.y,w:s.width,h:l.h}))}catch{}};e.onMoved(i),e.onResized(async()=>{try{const n=await e.innerSize(),s=a(),{LogicalSize:l}=await N(async()=>{const{LogicalSize:g}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:g}},__vite__mapDeps([7,1]));(n.width<650||n.height!==s.h)&&await e.setSize(new l(Math.max(650,n.width),s.h))}catch{}i()}),ct("melo:skin-changed",async n=>{try{!dt&&n&&await Dt(n,xt,void 0,!1);const s=n==="compact-pill"||typeof n=="string"&&n.startsWith("compact-pill"),l=s?780:960,g=s?138:240,{LogicalSize:p}=await N(async()=>{const{LogicalSize:r}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:r}},__vite__mapDeps([7,1]));await e.setSize(new p(l,g)),i()}catch{}}),e.onCloseRequested(async n=>{n.preventDefault();const{WebviewWindow:s}=await N(async()=>{const{WebviewWindow:l}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:l}},__vite__mapDeps([6,7,1,0,8]));for(const l of["library","playlist","equalizer","settings"])try{const g=await s.getByLabel("panel-"+l);g&&await g.close()}catch{}try{await e.destroy()}catch{window.close()}})}),N(()=>import("./core-DhEqZVGG.js"),[]).then(async({invoke:t})=>{try{const e=await t("get_cli_tracks");if(Array.isArray(e)&&e.length>0){const a=window.LumiLibrary,i=window.LumiPlayer;e.forEach(n=>n.source="import"),a==null||a.addToCurrentPlaylist(e),e.forEach(n=>i==null?void 0:i.queue.push(n)),setTimeout(()=>{if(i&&i.queue.length>0){const n=i.queue.findIndex(s=>s.id===e[0].id);i.loadTrack(n>=0?n:0,!0)}},150)}}catch{}}),ct("melo:open-files",t=>{if(Array.isArray(t)&&t.length>0){const e=window.LumiLibrary,a=window.LumiPlayer;t.forEach(i=>i.source="import"),e==null||e.addToCurrentPlaylist(t),t.forEach(i=>a==null?void 0:a.queue.push(i)),nt(`Playing ${t[0].title}`),setTimeout(()=>{if(a&&a.queue.length>0){const i=a.queue.findIndex(n=>n.id===t[0].id);a.loadTrack(i>=0?i:0,!0)}},150)}}));document.addEventListener("contextmenu",t=>{t.preventDefault()});const Jt=document.getElementById("toast"),nt=t=>{Jt&&(Jt.textContent=t,Jt.classList.add("show"),setTimeout(()=>Jt.classList.remove("show"),2200))},Mt=new Audio;Mt.preload="metadata";Mt.crossOrigin="anonymous";window.__LUMI_AUDIO__=Mt;window.__TOAST__=nt;let xt=localStorage.getItem("lumi-theme")||"dark";function Zt(t){document.documentElement.setAttribute("data-theme",t),localStorage.setItem("lumi-theme",t),xt=t}function ne(t){Zt(t),J("melo:theme",t)}Zt(xt);ct("melo:theme",t=>{(t==="light"||t==="dark")&&Zt(t)});setInterval(()=>{const t=localStorage.getItem("lumi-theme");(t==="light"||t==="dark")&&t!==xt&&Zt(t)},1e3);const ei=["win-library","win-playlist","win-equalizer","win-lyrics","win-settings"],Qt=document.getElementById("desktop"),He={btnToggleLibrary:"win-library",btnTogglePlaylist:"win-playlist",btnToggleEq:"win-equalizer",btnToggleLyrics:"win-lyrics",btnOpenSettings:"win-settings",menuToggleLibrary:"win-library",menuTogglePlaylist:"win-playlist",menuToggleEq:"win-equalizer",menuToggleLyrics:"win-lyrics",menuToggleSettings:"win-settings"};function ii(t){const e=document.getElementById(t);return!!e&&!e.classList.contains("hidden")}const oe={library:"btnToggleLibrary",playlist:"btnTogglePlaylist",equalizer:"btnToggleEq",lyrics:"btnToggleLyrics",settings:"btnOpenSettings"};async function ai(t,e){const a=async()=>{try{const i=await t.outerPosition(),n=await t.outerSize();localStorage.setItem(e,JSON.stringify({x:i.x,y:i.y,w:n.width,h:n.height}))}catch{}};t.onMoved(a),t.onResized(a)}async function ni(t){const{WebviewWindow:e}=await N(async()=>{const{WebviewWindow:m}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:m}},__vite__mapDeps([6,7,1,0,8])),a="panel-"+t,i=document.getElementById(oe[t]),n=await e.getByLabel(a);if(n){await n.close(),i==null||i.classList.remove("active");return}const s={library:[430,620],playlist:[440,560],equalizer:[700,440],lyrics:[380,520],settings:[600,540]},l={library:[360,400],playlist:[360,360],equalizer:[620,400],lyrics:[320,360],settings:[500,400]},g={library:"Library",playlist:"Playlist",equalizer:"Equalizer",lyrics:"Synced Lyrics",settings:"Settings"},p=s[t]||[420,520];let r=null;try{r=JSON.parse(localStorage.getItem("melo-geo-panel-"+t)||"null")}catch{}new e(a,{url:`/?panel=${t}`,title:g[t]||t,width:(r==null?void 0:r.w)||p[0],height:(r==null?void 0:r.h)||p[1],minWidth:(l[t]||[360,360])[0],minHeight:(l[t]||[360,360])[1],...(r==null?void 0:r.x)!=null?{x:r.x,y:r.y}:{center:!0},decorations:!0,skipTaskbar:!0}),i==null||i.classList.add("active"),J("melo:theme",xt)}ct("melo:panel-closed",t=>{var a;const e=oe[t];e&&((a=document.getElementById(e))==null||a.classList.remove("active"))});function se(t){if(ot){ni(t.replace(/^win-/,""));return}const e=ii(t);Yt(t,!e),e||te(document.getElementById(t))}function oi(t){if(t.classList.contains("hidden")||!Qt||window.matchMedia("(max-width: 860px)").matches)return;const e=Qt.getBoundingClientRect();if(e.width<=0||e.height<=0)return;const a=t.getBoundingClientRect(),i=Math.min(a.width,e.width),n=Math.min(a.height,e.height);let s=a.left-e.left,l=a.top-e.top;s=Math.max(0,Math.min(e.width-i,s)),l=Math.max(0,Math.min(e.height-n,l)),t.style.left=s+"px",t.style.top=l+"px",t.style.right="auto",t.style.bottom="auto",t.style.transform="none"}function Yt(t,e){var n,s,l,g,p,r,m,b,v,S;const a=document.getElementById(t);if(!a)return;a.classList.toggle("hidden",!e),localStorage.setItem("lumiv2-"+t,e?"1":"0"),e&&oi(a);const i=e;t==="win-library"&&((n=document.getElementById("btnToggleLibrary"))==null||n.classList.toggle("active",i),(s=document.getElementById("menuToggleLibrary"))==null||s.classList.toggle("active",i)),t==="win-playlist"&&((l=document.getElementById("btnTogglePlaylist"))==null||l.classList.toggle("active",i),(g=document.getElementById("menuTogglePlaylist"))==null||g.classList.toggle("active",i)),t==="win-equalizer"&&((p=document.getElementById("btnToggleEq"))==null||p.classList.toggle("active",i),(r=document.getElementById("menuToggleEq"))==null||r.classList.toggle("active",i)),t==="win-lyrics"&&((m=document.getElementById("btnToggleLyrics"))==null||m.classList.toggle("active",i),(b=document.getElementById("menuToggleLyrics"))==null||b.classList.toggle("active",i)),t==="win-settings"&&((v=document.getElementById("btnOpenSettings"))==null||v.classList.toggle("active",i),(S=document.getElementById("menuToggleSettings"))==null||S.classList.toggle("active",i))}dt||ei.forEach(t=>{const e=localStorage.getItem("lumiv2-"+t);e!==null?Yt(t,e==="1"):t==="win-settings"?Yt(t,!1):Yt(t,!0)});Object.entries(He).forEach(([t,e])=>{var a;(a=document.getElementById(t))==null||a.addEventListener("click",()=>se(e))});document.querySelectorAll("[data-close]").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.close;Yt(e,!1)})});let yt=null,_t=null,xe=10;function te(t){xe++,t.style.zIndex=String(xe),document.querySelectorAll(".float-win").forEach(e=>e.classList.remove("active")),t.classList.add("active")}document.querySelectorAll(".float-win").forEach(t=>{t.addEventListener("mousedown",()=>te(t))});document.querySelectorAll("[data-drag]").forEach(t=>{t.addEventListener("mousedown",e=>{if(e.target.closest("button")||e.target.closest("input")||e.target.closest("select"))return;const a=t.dataset.drag,i=document.getElementById(a);te(i),i.classList.add("dragging");const n=i.getBoundingClientRect();yt={id:a,startX:e.clientX,startY:e.clientY,initX:n.left,initY:n.top,width:n.width,height:n.height}})});document.querySelectorAll("[data-resize]").forEach(t=>{t.addEventListener("mousedown",e=>{e.stopPropagation();const a=t.dataset.resize,i=document.getElementById(a);te(i),i.classList.add("resizing");const n=i.getBoundingClientRect();_t={id:a,startX:e.clientX,startY:e.clientY,initW:n.width,initH:n.height}})});window.addEventListener("mousemove",t=>{if(yt){const e=document.getElementById(yt.id);let a=t.clientX-yt.startX,i=t.clientY-yt.startY,n=yt.initX+a,s=yt.initY+i;if(Qt&&!window.matchMedia("(max-width: 860px)").matches){const l=Qt.getBoundingClientRect(),g=l.left,p=l.right-yt.width,r=l.top,m=l.bottom-yt.height;n=Math.max(g,Math.min(p,n))-l.left,s=Math.max(r,Math.min(m,s))-l.top}e.style.left=n+"px",e.style.top=s+"px",e.style.right="auto",e.style.bottom="auto",e.style.transform="none"}if(_t){const e=document.getElementById(_t.id);let a=_t.initW+(t.clientX-_t.startX),i=_t.initH+(t.clientY-_t.startY);a=Math.max(260,a),i=Math.max(160,i),e.style.width=a+"px",e.style.height=i+"px"}});window.addEventListener("mouseup",()=>{if(yt){const t=document.getElementById(yt.id);t&&(t.classList.remove("dragging"),localStorage.setItem("lumiv2-pos-"+yt.id,JSON.stringify({left:t.style.left,top:t.style.top}))),yt=null}if(_t){const t=document.getElementById(_t.id);t&&(t.classList.remove("resizing"),localStorage.setItem("lumiv2-size-"+_t.id,JSON.stringify({width:t.style.width,height:t.style.height}))),_t=null}});let vt=document.getElementById("appMenuBtn"),$=document.getElementById("appMenu");function si(){const t=$==null?void 0:$.classList.toggle("open");vt==null||vt.classList.toggle("open",!!t)}vt==null||vt.addEventListener("click",t=>{t.stopPropagation(),si()});document.addEventListener("click",t=>{$&&!$.contains(t.target)&&t.target!==vt&&($.classList.remove("open"),vt==null||vt.classList.remove("open"))});document.addEventListener("keydown",t=>{t.key==="Escape"&&($==null||$.classList.remove("open"),vt==null||vt.classList.remove("open"))});var Ie;(Ie=document.getElementById("menuCustomSkin"))==null||Ie.addEventListener("click",()=>{var t;(t=document.getElementById("skinUpload"))==null||t.click(),$==null||$.classList.remove("open")});var Me;(Me=document.getElementById("menuSkinDefault"))==null||Me.addEventListener("click",()=>{Kt(nt);const t=document.getElementById("skinSelect");t&&(t.value="default"),$==null||$.classList.remove("open")});var _e;(_e=document.getElementById("menuSkinCompact"))==null||_e.addEventListener("click",()=>{Dt("compact-pill",xt,nt);const t=document.getElementById("skinSelect");t&&(t.value="compact-pill"),$==null||$.classList.remove("open")});var Te;(Te=document.getElementById("menuThemeToggle"))==null||Te.addEventListener("click",()=>{ne(xt==="light"?"dark":"light"),$==null||$.classList.remove("open")});var Ae;(Ae=document.getElementById("menuAbout"))==null||Ae.addEventListener("click",()=>{nt("Melo 0.3 Beta — Tauri 2 + TypeScript + Rust"),$==null||$.classList.remove("open")});async function Ve(){const t=window.LumiLibrary,e=window.LumiPlayer;if(ot){try{const{open:i}=await N(async()=>{const{open:p}=await import("./index-CS3Qnt9j.js");return{open:p}},__vite__mapDeps([5,1])),n=await i({multiple:!0,filters:[{name:"Audio",extensions:["mp3","flac","wav","aac","ogg","m4a","alac","opus","wma","aiff"]}]});if(!n)return;const s=Array.isArray(n)?n:[n],{invoke:l}=await N(async()=>{const{invoke:p}=await import("./core-DhEqZVGG.js");return{invoke:p}},[]),g=[];for(const p of s)try{const r=await l("scan_library",{path:p});if(r&&r.length)r.forEach(m=>m.source="import"),g.push(...r);else{const m=p.replace(/^.*[\\/]/,""),b=m.lastIndexOf("."),v=b>0?m.slice(0,b):m,S=b>0?m.slice(b+1).toUpperCase():"AUDIO";g.push({id:p,title:v,artist:"Unknown Artist",album:"Single",duration:0,path:p,codec:S,specs:"Local File",source:"import"})}}catch{const r=p.replace(/^.*[\\/]/,""),m=r.lastIndexOf("."),b=m>0?r.slice(0,m):r,v=m>0?r.slice(m+1).toUpperCase():"AUDIO";g.push({id:p,title:b,artist:"Unknown Artist",album:"Single",duration:0,path:p,codec:v,specs:"Local File",source:"import"})}t==null||t.addTracks(g,!0),t==null||t.addToCurrentPlaylist(g),g.forEach(p=>e==null?void 0:e.queue.push(p)),J("melo:play-tracks",{tracks:g,index:0}),nt(`${g.length} file(s) added`)}catch{nt("Error opening files")}$==null||$.classList.remove("open");return}const a=document.createElement("input");a.type="file",a.multiple=!0,a.accept="audio/*,.mp3,.flac,.wav,.aac,.ogg,.m4a,.alac,.opus,.wma,.aiff",a.onchange=async()=>{const i=Array.from(a.files||[]);if(!i.length)return;const n=[];for(const s of i){const l=s.path,g=l||URL.createObjectURL(s),p=s.name,r=p.lastIndexOf("."),m=r>0?p.slice(0,r):p,b=r>0?p.slice(r+1).toUpperCase():"AUDIO",v={id:l||"imp_"+Math.random().toString(36).slice(2,9),title:m,artist:"Unknown Artist",album:"Single",duration:0,path:g,codec:b,specs:"Local File",source:"import"};await Gt(s,v),n.push(v)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(s=>e==null?void 0:e.queue.push(s)),J("melo:play-tracks",{tracks:n,index:0}),nt(`${n.length} file(s) added`)},a.click(),$==null||$.classList.remove("open")}async function Fe(){const t=window.LumiLibrary,e=window.LumiPlayer;if(ot){try{const{open:i}=await N(async()=>{const{open:r}=await import("./index-CS3Qnt9j.js");return{open:r}},__vite__mapDeps([5,1])),n=await i({directory:!0});if(!n)return;const s=n,{invoke:l}=await N(async()=>{const{invoke:r}=await import("./core-DhEqZVGG.js");return{invoke:r}},[]),p=(await l("scan_library",{path:s})).map(r=>({...r,source:"import"}));t==null||t.addTracks(p,!0),t==null||t.addToCurrentPlaylist(p),p.forEach(r=>e==null?void 0:e.queue.push(r)),J("melo:play-tracks",{tracks:p,index:0}),nt(`${p.length} track(s) added from folder`)}catch{nt("Error scanning folder")}$==null||$.classList.remove("open");return}const a=document.createElement("input");a.type="file",a.webkitdirectory=!0,a.multiple=!0,a.accept="audio/*",a.onchange=async()=>{const i=Array.from(a.files||[]).filter(s=>/\.(mp3|flac|wav|aac|ogg|m4a|alac|opus|wma|aiff)$/i.test(s.name));if(!i.length)return;const n=[];for(const s of i){const l=s.path,g=l||URL.createObjectURL(s),p=s.name,r=p.lastIndexOf("."),m=r>0?p.slice(0,r):p,b=r>0?p.slice(r+1).toUpperCase():"AUDIO",v={id:l||"imp_"+Math.random().toString(36).slice(2,9),title:m,artist:"Unknown Artist",album:"Folder Import",duration:0,path:g,codec:b,specs:"Local File",source:"import"};await Gt(s,v),n.push(v)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(s=>e==null?void 0:e.queue.push(s)),J("melo:play-tracks",{tracks:n,index:0}),nt(`${n.length} file(s) added from folder`)},a.click(),$==null||$.classList.remove("open")}var Ce;(Ce=document.getElementById("btnAddFiles"))==null||Ce.addEventListener("click",Ve);var Be;(Be=document.getElementById("btnAddFolder"))==null||Be.addEventListener("click",Fe);var Pe;(Pe=document.getElementById("btnThemeToggle"))==null||Pe.addEventListener("click",()=>{ne(xt==="light"?"dark":"light")});window.addEventListener("keydown",t=>{(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="o"&&(t.shiftKey?(t.preventDefault(),Fe()):(t.preventDefault(),Ve())),((t.ctrlKey||t.metaKey)&&t.key===","||t.key==="F2")&&(t.preventDefault(),se("win-settings"))});function ke(t){var A,O,Q;function e(B){document.querySelectorAll(".settings-tab").forEach(q=>{q.classList.toggle("active",q.dataset.stab===B)}),document.querySelectorAll(".settings-section[data-panel]").forEach(q=>{q.classList.toggle("active",q.dataset.panel===B)}),localStorage.setItem("melo-settings-tab",B)}document.querySelectorAll(".settings-tab").forEach(B=>{B.addEventListener("click",()=>e(B.dataset.stab))}),e(localStorage.getItem("melo-settings-tab")||"general"),document.querySelectorAll(".switch[data-key]").forEach(B=>{const q=B.dataset.key,Y=localStorage.getItem("melo-pref-"+q);Y!==null&&B.classList.toggle("on",Y==="1"),B.onclick=()=>{B.classList.toggle("on");const F=B.classList.contains("on");localStorage.setItem("melo-pref-"+q,F?"1":"0"),t(F?"Enabled":"Disabled"),J("melo:pref-changed",{key:q,value:F})}});const a=document.getElementById("setCrossfade"),i=document.getElementById("crossfadeVal");if(a){const B=localStorage.getItem("melo-pref-crossfade")||"0";a.value=B,i&&(i.textContent=B+"s"),a.oninput=()=>{const q=a.value;i&&(i.textContent=q+"s"),localStorage.setItem("melo-pref-crossfade",q)}}const n=document.getElementById("setLanguage");if(n){const B=localStorage.getItem("melo-pref-lang")||"en";n.value=B,n.onchange=()=>{localStorage.setItem("melo-pref-lang",n.value),t(`Language set to ${n.options[n.selectedIndex].text}`)}}const s=document.getElementById("swDynamicTheme");if(s){const B=localStorage.getItem("melo-dynamic-theme")!=="0";s.classList.toggle("on",B),s.onclick=()=>{var V,f;const q=!s.classList.contains("on");s.classList.toggle("on",q),localStorage.setItem("melo-dynamic-theme",q?"1":"0");const Y=window.__LUMI_QUEUE__,F=(f=(V=window.LumiPlayer)==null?void 0:V.currentIndex)!=null?f:0;Y&&Y[F]&&Re(q?Y[F].cover:null),t(q?"Dynamic theme enabled":"Dynamic theme disabled")}}const l=document.getElementById("skinSelect"),g=document.getElementById("btnSkinThemeToggle"),p=document.getElementById("btnRefreshSkins"),r=document.getElementById("btnOpenSkinsFolder"),m=document.getElementById("skinThemeIcon"),b=document.getElementById("skinThemeLabel");function v(B){m&&(m.textContent=B==="dark"?"🌙":"☀️"),b&&(b.textContent=B==="dark"?"Dark":"Light")}v(xt),g==null||g.addEventListener("click",()=>{const B=xt==="dark"?"light":"dark";ne(B),v(B),t(B==="dark"?"Dark theme":"Light theme")}),ct("melo:theme",B=>{(B==="light"||B==="dark")&&v(B)});async function S(){if(!l)return;const B=localStorage.getItem("melo-active-skin-id")||"default",q=await qe();l.innerHTML=`
      <option value="default">Default Melo (Standard)</option>
      <option value="compact-pill">Minimal Compact (Pill Bar)</option>
    `,q.forEach(Y=>{if(Y.filename!=="compact-pill-light.html"&&Y.filename!=="compact-pill-dark.html"){const F=document.createElement("option");F.value=Y.filename,F.textContent=`${Y.name} (${Y.filename})`,l.appendChild(F)}}),l.value=B}S(),l&&(l.onchange=()=>{const B=l.value;Dt(B,xt,t)}),p==null||p.addEventListener("click",async()=>{await S();const B=localStorage.getItem("melo-active-skin-id")||"default";Dt(B,xt,t),t("Skins reloaded from disk")}),r==null||r.addEventListener("click",()=>{Ue(t)}),(A=document.getElementById("btn-reset-skin-settings"))==null||A.addEventListener("click",()=>{Kt(t),l&&(l.value="default")}),(O=document.getElementById("btn-settings-reset"))==null||O.addEventListener("click",()=>{localStorage.clear(),t("Settings reset — reloading..."),setTimeout(()=>location.reload(),600)}),(Q=document.getElementById("btnChooseFolder"))==null||Q.addEventListener("click",async()=>{if(ot)try{const{open:B}=await N(async()=>{const{open:Y}=await import("./index-CS3Qnt9j.js");return{open:Y}},__vite__mapDeps([5,1])),q=await B({directory:!0});q&&(document.getElementById("setMusicFolder").value=q,localStorage.setItem("melo-pref-music-folder",q),t("Music folder updated"))}catch{}else t("Folder selection dialog requires Tauri build")})}function Ne(){document.querySelectorAll(".win-btn").forEach(t=>{t.onclick=async()=>{const e=t.getAttribute("aria-label");if(window.__TAURI__){const{getCurrentWindow:a}=await N(async()=>{const{getCurrentWindow:n}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:n}},__vite__mapDeps([8,7,1,0])),i=a();e==="minimize"?i.minimize():e==="maximize"?i.toggleMaximize():e==="close"&&i.close()}else e==="close"&&nt("Window close requires the Tauri desktop build"),e==="maximize"&&nt("Resize: drag corner handle")}})}Ne();window.__LUMI_REBIND_MAIN__=()=>{const t=document.getElementById("appMenuBtn"),e=document.getElementById("appMenu");t&&e&&(vt=t,$=e,t.onclick=a=>{a.stopPropagation(),e.classList.toggle("open"),t.classList.toggle("open",e.classList.contains("open"))}),Ne(),Object.entries(He).forEach(([a,i])=>{const n=document.getElementById(a);n&&(n.onclick=()=>se(i))})};const Vt=document.createElement("div");Vt.id="scanBar";document.body.appendChild(Vt);let Ee=0;ct("melo:scan-progress",t=>{if(!t)return;const e=t.total?Math.round(t.done/t.total*100):100;Vt.style.opacity="1",Vt.style.width=e+"%",clearTimeout(Ee),(t.finished||t.total&&t.done>=t.total)&&(Ee=setTimeout(()=>{Vt.style.opacity="0",Vt.style.width="0"},800))});ot&&!dt&&ct("melo:scan-batch",t=>{const e=window.LumiLibrary;e&&Array.isArray(t)&&t.length&&(t.forEach(a=>a.source="scan"),e.addTracks(t,!0),e.addToCurrentPlaylist(t))});const Ut=document.createElement("div");Ut.id="aboutPop";Ut.style.display="none";document.body.appendChild(Ut);var ze;(ze=document.getElementById("btnAbout"))==null||ze.addEventListener("click",t=>{var e;t.stopPropagation(),Ut.innerHTML=`
    <div class="about-head">Melo <b>0.3 Beta</b></div>
    <div style="font-size:11.5px; color:var(--text-soft); margin:6px 0 10px;">
      Modern Windows Music Player<br/>
      Tauri 2 + TypeScript + Rust
    </div>
    <a class="about-link" id="aboutLink" href="https://github.com/Arvanta/Melo" rel="noopener">github.com/Arvanta/Melo ↗</a>`,Ut.style.display=Ut.style.display==="none"?"block":"none",(e=document.getElementById("aboutLink"))==null||e.addEventListener("click",a=>{a.preventDefault();const i="https://github.com/Arvanta/Melo";ot?N(()=>import("./core-DhEqZVGG.js"),[]).then(n=>n.invoke("open_url",{url:i})).catch(()=>window.open(i,"_blank")):window.open(i,"_blank")})});document.addEventListener("click",t=>{!t.target.closest("#aboutPop")&&!t.target.closest("#btnAbout")&&(Ut.style.display="none")});ot&&dt?dt==="library"||dt==="playlist"?ge(Mt,nt):dt==="equalizer"?ve(Mt,nt,{remote:!0}):dt==="lyrics"?fe(Mt):dt==="settings"&&ke(nt):(Qe(Mt,nt),ge(Mt,nt),ve(Mt,nt),Ke(Mt),fe(Mt),ti(nt),ke(nt));nt("Melo 0.3 Beta is ready");
//# sourceMappingURL=index-t5Vfc7qs.js.map
