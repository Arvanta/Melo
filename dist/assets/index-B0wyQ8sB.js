const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/event-CNdo2oXa.js","assets/core-DhEqZVGG.js","assets/index-DiyoAAdc.js","assets/index-CHth0gh2.js","assets/index-Bq0iOnRE.js","assets/index-CS3Qnt9j.js","assets/window-BWd3Cypy.js","assets/dpi-fvP-W2qr.js","assets/webviewWindow-mjQkSB26.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const d of l.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function n(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function a(o){if(o.ep)return;o.ep=!0;const l=n(o);fetch(o.href,l)}})();const Ie="modulepreload",_e=function(t){return"/"+t},Qt={},Y=function(e,n,a){let o=Promise.resolve();if(n&&n.length>0){let d=function(r){return Promise.all(r.map(h=>Promise.resolve(h).then(x=>({status:"fulfilled",value:x}),x=>({status:"rejected",reason:x}))))};document.getElementsByTagName("link");const g=document.querySelector("meta[property=csp-nonce]"),v=(g==null?void 0:g.nonce)||(g==null?void 0:g.getAttribute("nonce"));o=d(n.map(r=>{if(r=_e(r),r in Qt)return;Qt[r]=!0;const h=r.endsWith(".css"),x=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${x}`))return;const z=document.createElement("link");if(z.rel=h?"stylesheet":Ie,h||(z.as="script"),z.crossOrigin="",z.href=r,v&&z.setAttribute("nonce",v),document.head.appendChild(z),h)return new Promise((O,q)=>{z.addEventListener("load",O),z.addEventListener("error",()=>q(new Error(`Unable to preload CSS for ${r}`)))})}))}function l(d){const g=new Event("vite:preloadError",{cancelable:!0});if(g.payload=d,window.dispatchEvent(g),!g.defaultPrevented)throw d}return o.then(d=>{for(const g of d||[])g.status==="rejected"&&l(g.reason);return e().catch(l)})},he=()=>!!window.__TAURI__;async function j(t,e){if(he()){const{emit:n}=await Y(async()=>{const{emit:a}=await import("./event-CNdo2oXa.js");return{emit:a}},__vite__mapDeps([0,1]));await n(t,e)}else window.dispatchEvent(new CustomEvent(t,{detail:e}))}function rt(t,e){he()?Y(async()=>{const{listen:n}=await import("./event-CNdo2oXa.js");return{listen:n}},__vite__mapDeps([0,1])).then(({listen:n})=>{n(t,a=>e(a.payload))}):window.addEventListener(t,n=>e(n.detail))}function Te(t,e){let n,a,o,l,d,g,v,r=null,h,x,z,O,q,nt,w,C,J,et,X,G,V,c=[],k=0,T=!1,D="off",at=!1;window.__LUMI_QUEUE__=c,window.__LUMI_SET_QUEUE__=s=>{c=s,window.__LUMI_QUEUE__=s};function ot(s){if(!isFinite(s))return"0:00";const H=Math.floor(s/60),f=Math.floor(s%60).toString().padStart(2,"0");return`${H}:${f}`}function tt(){if(!h)return;const s=parseFloat(h.value)/parseFloat(h.max)*100;h.style.setProperty("--progress",s+"%")}function it(){x&&x.style.setProperty("--vol",x.value+"%")}async function dt(s){if(/^(https?|data|blob):/.test(s))return s;if(window.__TAURI__)try{const{convertFileSrc:H}=await Y(async()=>{const{convertFileSrc:f}=await import("./core-DhEqZVGG.js");return{convertFileSrc:f}},[]);return H(s)}catch{}return s}async function lt(s,H=!0){s<0&&(s=c.length-1),s>=c.length&&(s=0),k=s;const f=c[s];if(!f)return;nt||P(),t.src=await dt(f.path),t.load(),nt&&(nt.textContent=f.title),w&&(w.textContent=f.artist),C&&(C.textContent=f.album),J&&(J.textContent=f.codec),et&&(et.textContent=f.specs),f.cover&&X?(X.src=f.cover,X.style.display="block",G&&(G.style.display="none")):(X&&(X.style.display="none"),G&&(G.style.display="grid")),h&&(h.max=String(f.duration||276),h.value="0",tt()),O&&(O.textContent=ot(f.duration)),z&&(z.textContent="0:00"),$(),document.querySelectorAll(".track-row").forEach((R,st)=>{var gt;R.classList.toggle("active",((gt=c[st])==null?void 0:gt.id)===f.id)}),document.querySelectorAll("#queueList .track-row").forEach(R=>{R.classList.toggle("active",R.dataset.id===f.id)}),"mediaSession"in navigator&&(navigator.mediaSession.metadata=new MediaMetadata({title:f.title,artist:f.artist,album:f.album,artwork:f.cover?[{src:f.cover,sizes:"512x512",type:"image/jpeg"}]:[]}),navigator.mediaSession.setActionHandler("play",()=>y()),navigator.mediaSession.setActionHandler("pause",()=>I()),navigator.mediaSession.setActionHandler("previoustrack",()=>N()),navigator.mediaSession.setActionHandler("nexttrack",()=>M()),navigator.mediaSession.setActionHandler("seekto",R=>{R.seekTime&&(t.currentTime=R.seekTime)})),H&&y();const W=document.getElementById("lyricsBox");W&&(W.textContent=f.lyrics||"No lyrics found for this track. You can add it via the tag editor."),window.dispatchEvent(new CustomEvent("lumi:trackChange",{detail:f})),j("melo:track-changed",f)}let mt=!1;function It(){mt&&(mt=!1,t.play().then(()=>{a&&(a.style.display="none"),o&&(o.style.display="block")}).catch(()=>{}))}window.addEventListener("pointerdown",It),window.addEventListener("keydown",It);function y(){t.play().then(()=>{mt=!1,a&&(a.style.display="none"),o&&(o.style.display="block"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="playing")}).catch(()=>{mt||(mt=!0,e("Click once inside the player window to start playback"))})}function I(){t.pause(),a&&(a.style.display="block"),o&&(o.style.display="none"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}function _(){t.paused?y():I()}function S(){t.pause();try{t.currentTime=0}catch{}a&&(a.style.display="block"),o&&(o.style.display="none"),h&&(h.value="0",tt()),z&&(z.textContent="0:00"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}function M(){if(D==="one"){t.currentTime=0,y();return}let s=k+1;if(T&&(s=Math.floor(Math.random()*c.length),s===k&&(s=(s+1)%c.length)),s>=c.length)if(D==="all")s=0;else{I();return}lt(s)}function N(){if(t.currentTime>3){t.currentTime=0;return}let s=k-1;T&&(s=Math.floor(Math.random()*c.length)),s<0&&(D==="all"?s=c.length-1:s=0),lt(s)}function $(){var st;const s=c[k];if(!s||!x)return;const H=parseInt(x.value)/100,f=V&&V.checked&&(st=s.replayGain)!=null?st:0,W=Math.pow(10,f/20);let R=H*W;R=Math.min(1,Math.max(0,R)),t.volume=R}function P(){if(n=document.getElementById("btnPlay"),a=document.getElementById("iconPlay"),o=document.getElementById("iconPause"),l=document.getElementById("btnPrev"),d=document.getElementById("btnNext"),g=document.getElementById("btnShuffle"),v=document.getElementById("btnRepeat"),r=document.getElementById("btnStop"),h=document.getElementById("seekBar"),x=document.getElementById("volBar"),z=document.getElementById("curTime"),O=document.getElementById("durTime"),q=document.getElementById("volPct"),nt=document.getElementById("trackTitle"),w=document.getElementById("trackArtist"),C=document.getElementById("trackAlbum"),J=document.getElementById("trackCodec"),et=document.getElementById("trackSpecs"),X=document.getElementById("coverImg"),G=document.getElementById("coverFallback"),V=document.getElementById("replayGainToggle"),n&&(n.onclick=_),r&&(r.onclick=S,r.style.display=localStorage.getItem("lumiv2-showStop")==="1"?"":"none"),l&&(l.onclick=N),d&&(d.onclick=M),g&&(g.onclick=()=>{T=!T,g.classList.toggle("active",T),e(T?"Playback Shuffle on":"Playback Shuffle off")}),v&&(v.onclick=()=>{D=D==="off"?"all":D==="all"?"one":"off",v.classList.toggle("active",D!=="off");const s={off:"Repeat off",all:"Repeat all",one:"Repeat one"};e(s[D]),v.title=s[D],D==="one"?v.style.color="var(--accent)":v.style.color=""}),h&&(h.oninput=()=>{at=!0,z&&(z.textContent=ot(parseFloat(h.value))),tt()},h.onchange=()=>{t.currentTime=parseFloat(h.value),at=!1}),x&&(x.oninput=()=>{it(),q&&(q.textContent=x.value+"%"),$()}),V&&(V.onchange=()=>$()),tt(),it(),c[k]){const s=c[k];nt&&(nt.textContent=s.title),w&&(w.textContent=s.artist),C&&(C.textContent=s.album),J&&(J.textContent=s.codec),et&&(et.textContent=s.specs),s.cover&&X&&(X.src=s.cover,X.style.display="block",G&&(G.style.display="none"))}}P(),t.addEventListener("timeupdate",()=>{!at&&h&&z&&(h.value=String(Math.floor(t.currentTime)),z.textContent=ot(t.currentTime),tt())}),t.addEventListener("loadedmetadata",()=>{!h||!O||(h.max=String(Math.floor(t.duration||c[k].duration||276)),O.textContent=ot(t.duration||c[k].duration),tt())}),t.addEventListener("ended",()=>{M()}),window.addEventListener("keydown",s=>{s.target.tagName!=="INPUT"&&(s.code==="Space"&&(s.preventDefault(),_()),s.code==="ArrowRight"&&(t.currentTime+=5),s.code==="ArrowLeft"&&(t.currentTime-=5),(s.key==="m"||s.key==="M")&&(t.muted=!t.muted,e(t.muted?"Muted":"Unmuted")),(s.key==="s"||s.key==="S")&&g&&g.click(),(s.key==="r"||s.key==="R")&&v&&v.click(),s.code==="ArrowUp"&&x&&(x.value=String(Math.min(100,parseInt(x.value)+5)),x.dispatchEvent(new Event("input"))),s.code==="ArrowDown"&&x&&(x.value=String(Math.max(0,parseInt(x.value)-5)),x.dispatchEvent(new Event("input"))))}),lt(0,!1),window.LumiPlayer={get queue(){return c},set queue(s){c=s},get currentIndex(){return k},loadTrack:lt,play:y,pause:I,stop:S,next:M,prev:N,get audio(){return t},rebind:P},window.__LUMI_REBIND__=P,rt("melo:play-tracks",s=>{if(!s||!Array.isArray(s.tracks)||!s.tracks.length)return;c=s.tracks,window.__LUMI_SET_QUEUE__(c);const H=Math.max(0,Math.min(s.index||0,c.length-1));lt(H)}),rt("melo:add-queue",s=>{s&&(c.push(s),window.__LUMI_SET_QUEUE__(c))}),rt("melo:tag-updated",s=>{s&&c[k]&&c[k].id===s.id&&(Object.assign(c[k],s),lt(k,!1))})}let Zt=!1;async function Be(){if(!Zt){Zt=!0;try{const t=globalThis;if(typeof t.Buffer>"u"){const e=await Y(()=>import("./index-DiyoAAdc.js").then(n=>n.i),__vite__mapDeps([2,3]));t.Buffer=e.Buffer}typeof t.process>"u"&&(t.process={env:{},browser:!0,nextTick:e=>setTimeout(e,0)})}catch{}}}async function Ae(t,e){var n;try{await Be();const a=await Y(()=>import("./index-Bq0iOnRE.js").then(r=>r.i),__vite__mapDeps([4,3])),o=a&&typeof a.parseBlob=="function"?a:a.default||a,l=await Promise.race([o.parseBlob(t),new Promise((r,h)=>setTimeout(()=>h(new Error("timeout")),1800))]),d=l==null?void 0:l.common;if(!d)return;d.title&&(e.title=d.title),d.artist?e.artist=d.artist:d.artists&&d.artists[0]&&(e.artist=d.artists[0]),d.album&&(e.album=d.album),d.genre&&d.genre[0]&&(e.genre=d.genre[0]),d.year&&(e.year=d.year);const g=(n=d.picture)==null?void 0:n[0];if(g&&g.data){const r=g.format||"image/jpeg",h=g.data;if(h.length>6e5)return;let x="";const z=8192;for(let O=0;O<h.length;O+=z){const q=h.subarray(O,O+z);x+=String.fromCharCode.apply(null,q)}e.cover=`data:${r};base64,${btoa(x)}`}const v=l==null?void 0:l.format;v&&v.duration&&!e.duration&&(e.duration=Math.floor(v.duration))}catch{}}async function zt(t,e,n=1800){return await Ae(t,e),e}const Bt=!!window.__TAURI__,wt=new URLSearchParams(location.search).get("panel")||"main";let K=[],ct=[];try{const t=localStorage.getItem("melo-playlists");if(t){const e=JSON.parse(t);Array.isArray(e)&&e.length&&(ct=e)}}catch{}ct.length||(ct=[{id:"p1",name:"Favorites",tracks:[],createdAt:Date.now()}]);try{const t=localStorage.getItem("melo-tracks");if(t){const e=JSON.parse(t);Array.isArray(e)&&(K=e)}}catch{}function Kt(t,e){var jt,Gt,Yt,Jt;const n=document.getElementById("trackList");document.getElementById("playlistList");const a=document.getElementById("winPlaylistTracks"),o=document.getElementById("winPlaylistEmpty"),l=document.getElementById("playlistSelect"),d=document.getElementById("searchInput"),g=document.getElementById("libraryStats"),v=document.getElementById("btn-scan"),r=document.getElementById("btn-export-playlist"),h=document.getElementById("btn-new-playlist"),x=document.getElementById("queueList"),z=document.getElementById("tagEditor"),O=document.getElementById("tagTitle"),q=document.getElementById("tagArtist"),nt=document.getElementById("tagAlbum"),w=document.getElementById("tagYear"),C=document.getElementById("tagCover");let J="",et=localStorage.getItem("melo-currentPlaylist")||((jt=ct[0])==null?void 0:jt.id)||"",X="artists",G=null,V=null,c=null,k=null,T=[];(Gt=document.getElementById("libraryTabs"))==null||Gt.querySelectorAll(".tab").forEach(i=>{i.addEventListener("click",()=>{document.querySelectorAll("#libraryTabs .tab").forEach(p=>p.classList.remove("active")),i.classList.add("active"),X=i.dataset.libtab,G=V=c=k=null,F()})}),d==null||d.addEventListener("input",()=>{J=d.value.toLowerCase(),F()}),F(),Lt(),v==null||v.addEventListener("click",async()=>{if(window.__TAURI__)try{const{open:i}=await Y(async()=>{const{open:u}=await import("./index-CS3Qnt9j.js");return{open:u}},__vite__mapDeps([5,1])),p=await i({directory:!0,multiple:!1});if(p){e("Scanning folder in the background…");const{invoke:u}=await Y(async()=>{const{invoke:L}=await import("./core-DhEqZVGG.js");return{invoke:L}},[]),m=await u("scan_library",{path:p});m.forEach(L=>L.source="scan"),dt(m,!0),lt(m),F()}}catch{e("Scanning requires the Tauri build")}else{const i=document.createElement("input");i.type="file",i.multiple=!0,i.accept="audio/*",i.onchange=async()=>{var u;const p=Array.from(i.files||[]);for(const m of p){const L=URL.createObjectURL(m),b=Math.random().toString(36).slice(2),B=((u=m.name.split(".").pop())==null?void 0:u.toUpperCase())||"MP3",E={id:b,title:m.name.replace(/\.[^/.]+$/,""),artist:"Unknown",album:"Imported",genre:"Unknown",year:new Date().getFullYear(),duration:180,path:L,codec:B,specs:"Imported · Stereo",replayGain:0},A=new Audio(L);await new Promise(Z=>{A.addEventListener("loadedmetadata",()=>{E.duration=Math.floor(A.duration)||180,Z(null)},{once:!0}),A.load(),setTimeout(()=>Z(null),1500)}),await zt(m,E),K.push(E)}e(`${p.length} file(s) added`),F(),Lt()},i.click()}}),document.addEventListener("dragover",i=>{i.preventDefault()}),document.addEventListener("drop",async i=>{var u,m;i.preventDefault();const p=Array.from(((u=i.dataTransfer)==null?void 0:u.files)||[]).filter(L=>L.type.startsWith("audio/")||/\.(mp3|flac|wav|ogg|aac|m4a|alac)$/i.test(L.name));if(p.length){for(const L of p){const b=URL.createObjectURL(L),B=Math.random().toString(36).slice(2),E=((m=L.name.split(".").pop())==null?void 0:m.toUpperCase())||"MP3",A={id:B,title:L.name.replace(/\.[^/.]+$/,""),artist:"Imported",album:"Drop",genre:"Unknown",year:new Date().getFullYear(),duration:200,path:b,codec:E,specs:"Drag & Drop"};await zt(L,A);const Z=new Audio(b);await new Promise(yt=>{Z.addEventListener("loadedmetadata",()=>{A.duration=Math.floor(Z.duration)||200,yt(null)},{once:!0}),Z.load(),setTimeout(()=>yt(null),800)}),K.push(A)}e(`${p.length} File added via drag & drop`),F()}});function D(){return ct.find(i=>i.id===et)||ct[0]}function at(){localStorage.setItem("melo-rev",String(Date.now())),localStorage.setItem("melo-playlists",JSON.stringify(ct))}function ot(){Bt&&j("melo:playlists-sync",{src:wt,playlists:ct})}function tt(i){et=i,localStorage.setItem("melo-currentPlaylist",i),_()}rt("melo:playlists-sync",i=>{i&&i.src!==wt&&Array.isArray(i.playlists)&&(ct=i.playlists,_(),F())});function it(){localStorage.setItem("melo-rev",String(Date.now()));try{localStorage.setItem("melo-tracks",JSON.stringify(K))}catch{try{localStorage.setItem("melo-tracks",JSON.stringify(K.map(({cover:i,...p})=>p)))}catch{}}}function dt(i,p=!1){let u=!1;i.forEach(m=>{K.some(L=>L.id===m.id)||(K.push(m),u=!0)}),u&&(it(),F(),_()),p&&Bt&&j("melo:tracks-add",{src:wt,list:i})}rt("melo:tracks-add",i=>{i&&i.src!==wt&&Array.isArray(i.list)&&dt(i.list)});function lt(i){const p=D();if(!p)return;let u=!1;i.forEach(m=>{p.tracks.includes(m.id)||(p.tracks.push(m.id),u=!0)}),u&&(at(),ot(),_(),F())}async function mt(i){if(!Bt)return[];const{invoke:p}=await Y(async()=>{const{invoke:m}=await import("./core-DhEqZVGG.js");return{invoke:m}},[]),u=[];for(const m of i)try{const L=await p("scan_library",{path:m});L&&u.push(...L)}catch{}return u}Bt&&Y(async()=>{const{listen:i}=await import("./event-CNdo2oXa.js");return{listen:i}},__vite__mapDeps([0,1])).then(({listen:i})=>{i("tauri://drag-drop",async p=>{var L,b;const u=((L=p==null?void 0:p.payload)==null?void 0:L.paths)||[];if(!u.length)return;const m=await mt(u);m.length&&(m.forEach(B=>B.source="import"),dt(m,!0),wt==="main"?(lt(m),j("melo:play-tracks",{tracks:m,index:0})):wt==="playlist"?(lt(m),e(`Added ${m.length} track(s) to "${(b=D())==null?void 0:b.name}"`)):e(`Added ${m.length} file(s) to the library`))})});function It(i){return`${Math.floor(i/60)}:${String(Math.floor(i%60)).padStart(2,"0")}`}function y(i){return i.type.startsWith("audio/")||/\.(mp3|flac|wav|ogg|aac|m4a|alac|opus)$/i.test(i.name)}async function I(i){var B;const p=URL.createObjectURL(i),u=Math.random().toString(36).slice(2),m=((B=i.name.split(".").pop())==null?void 0:B.toUpperCase())||"MP3",L={id:u,title:i.name.replace(/\.[^/.]+$/,""),artist:"Unknown",album:"Imported",genre:"Unknown",year:new Date().getFullYear(),duration:180,path:p,codec:m,specs:"Imported · Stereo",replayGain:0},b=new Audio(p);return await new Promise(E=>{b.addEventListener("loadedmetadata",()=>{L.duration=Math.floor(b.duration)||180,E(null)},{once:!0}),b.load(),setTimeout(()=>E(null),1200)}),await zt(i,L),L}function _(){if(!a)return;const i=D();if(l&&(l.innerHTML=ct.map(u=>`<option value="${u.id}" ${i&&u.id===i.id?"selected":""}>${u.name}</option>`).join("")),!i){a.innerHTML="",a.style.display="none",o&&(o.style.display="block");return}const p=i.tracks.map(u=>K.find(m=>m.id===u)).filter(Boolean);o&&(o.style.display=p.length?"none":"block"),a.style.display=p.length?"flex":"none",a.innerHTML=p.map((u,m)=>`
      <div class="track-row" draggable="true" data-id="${u.id}" data-pl-idx="${m}">
        <span class="num">${m+1}</span>
        ${u.cover?`<img class="track-cover-mini" src="${u.cover}" onerror="this.style.display='none'"/>`:'<div class="track-cover-mini cover-default">♪</div>'}
        <div style="flex:1;min-width:0;">
          <div class="t-title">${u.title}</div>
          <div class="t-artist">${u.artist} • ${u.album}</div>
        </div>
        <span class="t-dur">${It(u.duration)}</span>
        <button class="btn small ghost" data-action="pl-remove" data-idx="${m}" title="Remove from playlist">×</button>
      </div>
    `).join(""),a.querySelectorAll(".track-row").forEach(u=>{u.addEventListener("dragstart",m=>{m.dataTransfer.setData("application/x-melo-ids",u.dataset.id),m.dataTransfer.effectAllowed="copy"}),u.addEventListener("click",m=>{const L=m.target;if(L.closest("[data-action='pl-remove']")){const B=parseInt(L.closest("[data-action='pl-remove']").dataset.idx);i.tracks.splice(B,1),at(),ot(),_(),F();return}const b=parseInt(u.dataset.plIdx);j("melo:play-tracks",{tracks:p,index:b})})})}if(l==null||l.addEventListener("change",()=>tt(l.value)),r==null||r.addEventListener("click",()=>{const i=D();if(!i)return e("No playlist available");const p=i.tracks.map(B=>K.find(E=>E.id===B)).filter(Boolean);if(!p.length)return e("Current list is empty");let u=`#EXTM3U
`;p.forEach(B=>{u+=`#EXTINF:${Math.floor(B.duration)},${B.artist} - ${B.title}
${B.path}
`});const m=new Blob([u],{type:"audio/x-mpegurl"}),L=URL.createObjectURL(m),b=document.createElement("a");b.href=L,b.download=`${i.name}.m3u`,b.click(),URL.revokeObjectURL(L),e(`M3U exported for "${i.name}"`)}),h==null||h.addEventListener("click",()=>{const i=prompt("New playlist name:");if(!i)return;const p=Math.random().toString(36).slice(2,8);ct.push({id:p,name:i,tracks:[],createdAt:Date.now()}),tt(p),at(),ot(),F(),e(`Playlist "${i}" created`)}),a){const i=a.parentElement;["dragover","dragenter"].forEach(p=>i.addEventListener(p,u=>{u.preventDefault(),u.stopPropagation(),a.classList.add("drag-over")})),i.addEventListener("dragleave",p=>{i.contains(p.relatedTarget)||a.classList.remove("drag-over")}),i.addEventListener("drop",async p=>{var b,B;p.preventDefault(),p.stopPropagation(),a.classList.remove("drag-over");const u=D();if(!u)return e("Create a playlist first (+ New)");const m=(((b=p.dataTransfer)==null?void 0:b.getData("application/x-melo-ids"))||"").split(",").filter(Boolean);let L=0;if(m.length)m.forEach(E=>{u.tracks.includes(E)||(u.tracks.push(E),L++)});else{const E=Array.from(((B=p.dataTransfer)==null?void 0:B.files)||[]).filter(y);for(const A of E){const Z=await I(A);K.push(Z),u.tracks.includes(Z.id)||(u.tracks.push(Z.id),L++)}}L&&e(`${L} track(s) added to "${u.name}"`),F(),_()})}const S=document.getElementById("playerCard");S&&(["dragover","dragenter"].forEach(i=>S.addEventListener(i,p=>{p.preventDefault(),p.stopPropagation(),S.classList.add("drag-over")})),S.addEventListener("dragleave",i=>{S.contains(i.relatedTarget)||S.classList.remove("drag-over")}),S.addEventListener("drop",async i=>{var L,b;i.preventDefault(),i.stopPropagation(),S.classList.remove("drag-over");const p=window.LumiPlayer,u=(((L=i.dataTransfer)==null?void 0:L.getData("application/x-melo-ids"))||"").split(",").filter(Boolean);let m=[];if(u.length)m=u.map(B=>K.find(E=>E.id===B)).filter(Boolean),p&&m.length&&e(`Playback ${m.length} track(s)`);else{const B=Array.from(((b=i.dataTransfer)==null?void 0:b.files)||[]).filter(y),E=D();let A=!1;for(const Z of B){const yt=await I(Z);K.push(yt),m.push(yt),E&&!E.tracks.includes(yt.id)&&(E.tracks.push(yt.id),A=!0)}B.length&&(F(),_()),p&&m.length&&e(A&&E?`Playback ${m.length} track(s) + added to "${E.name}»`:`Playback ${m.length} track(s)`)}m.length&&j("melo:play-tracks",{tracks:m,index:0})}));let M=null;function N(i){if(M=i,!M)return e("No track to edit");z.style.display="flex",O.value=M.title,q.value=M.artist,nt.value=M.album,w.value=String(M.year)}function $(i){const p=K.filter(i).map(u=>u.id);p.length&&(K=K.filter(u=>!i(u)),ct.forEach(u=>{u.tracks=u.tracks.filter(m=>!p.includes(m))}),it(),at(),ot(),Bt&&j("melo:tracks-remove",{src:wt,ids:p}),F(),_())}rt("melo:tracks-remove",i=>{if(i&&i.src!==wt&&Array.isArray(i.ids)){const p=i.ids;K=K.filter(u=>!p.includes(u.id)),ct.forEach(u=>{u.tracks=u.tracks.filter(m=>!p.includes(m))}),F(),_()}});const P=document.createElement("div");P.className="ctx-menu",P.style.display="none",document.body.appendChild(P);let s=null;function H(){P.style.display="none"}document.addEventListener("click",H),document.addEventListener("keydown",i=>{i.key==="Escape"&&H()}),P.addEventListener("click",i=>{const p=i.target.closest("[data-act]");if(!p||!s)return;i.stopPropagation();const u=p.dataset.act;u==="edit"&&N(s.track),u==="remove"&&(s.type==="track"?$(m=>m.id===s.track.id):s.type==="artist"?$(m=>m.artist===s.name):s.type==="album"?$(m=>m.artist===s.artist&&m.album===s.album):s.type==="genre"&&$(m=>m.genre===s.name)),H()});const f=document.createElement("div");f.className="ctx-menu",f.style.display="none",document.body.appendChild(f);let W=-1;document.addEventListener("click",()=>{f.style.display="none"}),f.addEventListener("click",i=>{if(!i.target.closest("[data-act='plremove']"))return;i.stopPropagation();const p=D();p&&W>=0&&W<p.tracks.length&&(p.tracks.splice(W,1),at(),ot(),_(),F()),f.style.display="none"}),document.addEventListener("contextmenu",i=>{H(),f.style.display="none";const p=i.target,u=p.closest("#winPlaylistTracks .track-row");if(u){i.preventDefault(),W=parseInt(u.dataset.plIdx||"-1"),f.innerHTML='<button class="ctx-item danger" data-act="plremove">Remove from Playlist</button>',f.style.display="block";const B=f.getBoundingClientRect();f.style.left=Math.max(4,Math.min(i.clientX,window.innerWidth-B.width-6))+"px",f.style.top=Math.max(4,Math.min(i.clientY,window.innerHeight-B.height-6))+"px";return}if(!(wt==="library"?!0:!!p.closest("#win-library"))){i.preventDefault();return}i.preventDefault();const L=p.closest(".track-row, [data-artist], [data-albumkey], [data-genre]");if(!L){H();return}if(L.classList.contains("track-row")){const B=T[parseInt(L.dataset.viewIdx)];if(!B){H();return}s={type:"track",track:B},P.innerHTML='<button class="ctx-item" data-act="edit">Edit tags</button><button class="ctx-item danger" data-act="remove">Remove track from library</button>'}else if(L.dataset.artist)s={type:"artist",name:L.dataset.artist},P.innerHTML='<button class="ctx-item danger" data-act="remove">Remove artist from library</button>';else if(L.dataset.albumkey){const[B,E]=(L.dataset.albumkey||"").split("\0");s={type:"album",artist:B,album:E},P.innerHTML='<button class="ctx-item danger" data-act="remove">Remove album from library</button>'}else s={type:"genre",name:L.dataset.genre},P.innerHTML='<button class="ctx-item danger" data-act="remove">Remove genre from library</button>';P.style.display="block";const b=P.getBoundingClientRect();P.style.left=Math.max(4,Math.min(i.clientX,window.innerWidth-b.width-6))+"px",P.style.top=Math.max(4,Math.min(i.clientY,window.innerHeight-b.height-6))+"px"}),(Yt=document.getElementById("btn-tag-cancel"))==null||Yt.addEventListener("click",()=>z.style.display="none"),(Jt=document.getElementById("btn-tag-save"))==null||Jt.addEventListener("click",async()=>{if(M){if(M.title=O.value,M.artist=q.value,M.album=nt.value,M.year=parseInt(w.value)||M.year,C.files&&C.files[0]){const i=C.files[0],p=URL.createObjectURL(i),u=new FileReader;u.onload=()=>{M.cover=u.result,F(),Lt(),j("melo:tag-updated",M)},u.readAsDataURL(i),M.cover=p}if(window.__TAURI__)try{const{invoke:i}=await Y(async()=>{const{invoke:p}=await import("./core-DhEqZVGG.js");return{invoke:p}},[]);await i("write_tags",{path:M.path,tags:{title:M.title,artist:M.artist,album:M.album}})}catch{}z.style.display="none",it(),F(),Lt(),j("melo:tag-updated",M),e("Metadata saved")}});function R(i){return String(i!=null?i:"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function st(){return K.filter(i=>i.source==="scan")}function gt(i){return T=i,i.length?i.map((p,u)=>{const m=`${Math.floor(p.duration/60)}:${String(Math.floor(p.duration%60)).padStart(2,"0")}`;return`
      <div class="track-row" draggable="true" data-view-idx="${u}" data-id="${R(p.id)}">
        <span class="num">${u+1}</span>
        <img class="track-cover-mini" src="${p.cover||""}" style="${p.cover?"":"display:none"}" onerror="this.style.display='none'"/>
        <div style="flex:1;min-width:0;">
          <div class="t-title">${R(p.title)}</div>
          <div class="t-artist">${R(p.artist)} • ${R(p.album)}${p.year?" • "+p.year:""}</div>
        </div>
        <span style="font-size:10px;padding:3px 6px;border-radius:6px;background:var(--badge-bg);color:var(--badge-text);border:1px solid var(--card-border);">${R(p.codec)}</span>
        <span class="t-dur">${m}</span>
        <button class="btn small ghost" data-action="add-queue" data-view-idx="${u}">+</button>
      </div>`}).join(""):'<div style="padding:30px;text-align:center;color:var(--text-muted);">Nothing here yet.<br/><span style="font-size:12px;">Use "Scan Folder" to build your library</span></div>'}function F(){if(!n){_();return}const i=st(),p=new Set(i.map(b=>b.artist)).size,u=new Set(i.map(b=>b.artist+"\0"+b.album)).size;g&&(g.textContent=`${i.length} tracks • ${p} artists • ${u} albums`);const m=J.trim().toLowerCase();let L="";if(X==="artists")if(G){const b=i.filter(A=>A.artist===G),B=[...new Set(b.map(A=>A.album))].sort((A,Z)=>A.localeCompare(Z)),E=V?b.filter(A=>A.album===V):b;L=`<div class="lib-crumb"><button class="btn small" data-back="artists">‹ Artists</button><b>${R(G)}</b></div>
          <div class="chip-row"><button class="chip ${V?"":"active"}" data-album="">All albums</button>`+B.map(A=>`<button class="chip ${V===A?"active":""}" data-album="${R(A)}">${R(A)}</button>`).join("")+"</div>"+gt(m?E.filter(A=>(A.title+A.album).toLowerCase().includes(m)):E)}else{T=[];const b=[...new Set(i.map(E=>E.artist))].sort((E,A)=>E.localeCompare(A));L=(m?b.filter(E=>E.toLowerCase().includes(m)):b).map(E=>{const A=i.filter(Z=>Z.artist===E).length;return`<div class="lib-item" data-artist="${R(E)}"><div class="lib-avatar">${R((E[0]||"?").toUpperCase())}</div><div style="flex:1;min-width:0;"><div class="t-title">${R(E)}</div><div class="t-artist">${A} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No artists found.</div>'}else if(X==="albums")if(c){const[b,B]=c.split("\0"),E=i.filter(A=>A.artist===b&&A.album===B);L=`<div class="lib-crumb"><button class="btn small" data-back="albums">‹ Albums</button><b>${R(B)}</b><span class="t-artist" style="margin-left:8px;">${R(b)}</span></div>`+gt(m?E.filter(A=>A.title.toLowerCase().includes(m)):E)}else{T=[];const b=[...new Set(i.map(E=>E.artist+"\0"+E.album))].sort((E,A)=>E.localeCompare(A));L=(m?b.filter(E=>E.toLowerCase().includes(m)):b).map(E=>{const[A,Z]=E.split("\0"),yt=i.filter(Xt=>Xt.artist===A&&Xt.album===Z).length;return`<div class="lib-item" data-albumkey="${R(E)}"><div class="lib-avatar">💿</div><div style="flex:1;min-width:0;"><div class="t-title">${R(Z)}</div><div class="t-artist">${R(A)} • ${yt} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No albums found.</div>'}else if(k){const b=i.filter(B=>B.genre===k);L=`<div class="lib-crumb"><button class="btn small" data-back="genres">‹ Genres</button><b>${R(k)}</b></div>`+gt(m?b.filter(B=>(B.title+B.artist).toLowerCase().includes(m)):b)}else{T=[];const b=[...new Set(i.map(E=>E.genre))].sort((E,A)=>E.localeCompare(A));L=(m?b.filter(E=>E.toLowerCase().includes(m)):b).map(E=>{const A=i.filter(Z=>Z.genre===E).length;return`<div class="lib-item" data-genre="${R(E)}"><div class="lib-avatar">🎼</div><div style="flex:1;min-width:0;"><div class="t-title">${R(E)}</div><div class="t-artist">${A} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No genres found.</div>'}n.innerHTML=L,n.querySelectorAll("[data-artist]").forEach(b=>b.addEventListener("click",()=>{G=b.dataset.artist,V=null,F()})),n.querySelectorAll("[data-albumkey]").forEach(b=>b.addEventListener("click",()=>{c=b.dataset.albumkey,F()})),n.querySelectorAll("[data-genre]").forEach(b=>b.addEventListener("click",()=>{k=b.dataset.genre,F()})),n.querySelectorAll("[data-back]").forEach(b=>b.addEventListener("click",()=>{const B=b.dataset.back;B==="artists"?(G=null,V=null):B==="albums"?c=null:k=null,F()})),n.querySelectorAll(".chip[data-album]").forEach(b=>b.addEventListener("click",()=>{V=b.dataset.album||null,F()})),n.querySelectorAll(".track-row").forEach(b=>{b.addEventListener("dragstart",B=>{B.dataTransfer.setData("application/x-melo-ids",b.dataset.id),B.dataTransfer.effectAllowed="copy"}),b.addEventListener("click",B=>{const E=B.target,A=parseInt(b.dataset.viewIdx);if(E.closest("[data-action='add-queue']")){Me(T[A]);return}j("melo:play-tracks",{tracks:T,index:A})})}),_()}function Me(i){j("melo:add-queue",i),e(`Queued: ${i.title}`)}function Lt(){if(!x)return;const i=window.LumiPlayer,p=(i==null?void 0:i.queue)||K.slice(0,4);if(!p.length){x.innerHTML='<div style="text-align:center;color:var(--text-muted);font-size:12px;padding:12px;">Queue is empty</div>';return}x.innerHTML=p.map((u,m)=>{var L;return`
      <div class="track-row" data-id="${u.id}" data-queue-idx="${m}" style="padding:6px 8px;border-radius:8px;border:1px solid ${m===((L=i==null?void 0:i.currentIndex)!=null?L:0)?"var(--accent)":"transparent"};">
        <img class="track-cover-mini" src="${u.cover||""}" style="width:24px;height:24px;${u.cover?"":"display:none"}" />
        <div style="flex:1;min-width:0;">
          <div class="t-title" style="font-size:12px;">${u.title}</div>
          <div class="t-artist" style="font-size:11px;">${u.artist}</div>
        </div>
        <button class="btn small ghost" data-remove="${m}" style="padding:2px 6px;">×</button>
      </div>
    `}).join(""),x.querySelectorAll("[data-remove]").forEach(u=>{u.addEventListener("click",()=>{const m=parseInt(u.dataset.remove);p.splice(m,1),Lt()})}),x.querySelectorAll(".track-row").forEach(u=>{u.addEventListener("click",m=>{if(m.target.closest("[data-remove]"))return;const L=parseInt(u.dataset.queueIdx),b=window.LumiPlayer;b&&b.loadTrack(L)})})}rt("melo:track-changed",i=>{Lt();const p=document.getElementById("lyricsBox");p&&i&&(p.textContent=i.lyrics||"No lyrics found for this track. You can add it via the tag editor."),document.querySelectorAll(".track-row").forEach(u=>{u.classList.toggle("active",u.dataset.id===(i==null?void 0:i.id))})}),setInterval(()=>Lt(),2e3);let Wt=localStorage.getItem("melo-rev")||"";setInterval(()=>{const i=localStorage.getItem("melo-rev")||"";if(i!==Wt){Wt=i;try{const p=JSON.parse(localStorage.getItem("melo-tracks")||"null");Array.isArray(p)&&(K=p)}catch{}try{const p=JSON.parse(localStorage.getItem("melo-playlists")||"null");Array.isArray(p)&&p.length&&(ct=p)}catch{}F(),_()}},1200),window.LumiLibrary={get tracks(){return K},get playlists(){return ct},render:F,addTracks:dt,addToCurrentPlaylist:lt,importPaths:mt,currentPlaylistName:()=>{var i;return((i=D())==null?void 0:i.name)||"Playlist"}}}let Et=null,te=null,xt=null;function fe(t){Et||(Et=new(window.AudioContext||window.webkitAudioContext),te=Et.createMediaElementSource(t),xt=te);const e={get ctx(){return Et},append(n){try{xt.disconnect()}catch{}let a=xt;for(const o of n)a.connect(o),a=o;return xt=a,e},tap(n){try{xt.disconnect()}catch{}return xt.connect(n),n.connect(Et.destination),xt=n,e},toDestination(){try{xt.disconnect()}catch{}return xt.connect(Et.destination),e},resume(){Et.state==="suspended"&&Et.resume()}};return e}const At=[31,62,125,250,500,1e3,2e3,4e3,8e3,16e3],Pt={flat:[0,0,0,0,0,0,0,0,0,0],pop:[-1,2,4,4,2,-1,-1,2,3,3],rock:[4,3,2,-1,-2,-2,1,3,4,4],bass:[6,5,4,2,1,0,-1,-1,-2,-3],treble:[-3,-2,-1,0,1,2,3,5,6,6],dance:[5,4,2,0,-1,-1,2,4,5,3],jazz:[2,1,2,3,2,0,1,2,3,2],classical:[3,2,1,0,0,0,-1,2,3,4],vocal:[-2,-1,0,2,4,4,3,1,0,-1],acoustic:[3,2,1,1,2,2,3,3,2,1],hiphop:[5,4,1,2,-1,-1,1,-1,2,3],metal:[4,2,-1,-2,-1,1,3,4,5,4]};function Vt(t){for(const[e,n]of Object.entries(Pt))if(n.every((a,o)=>a===t[o]))return e;return"custom"}function ee(t,e,n={}){const a=!!n.remote,o=document.getElementById("eqEnable"),l=document.getElementById("eqPreset"),d=document.getElementById("btnEqReset"),g=document.getElementById("eqBands"),v=document.getElementById("eqCanvas"),r=v?v.getContext("2d"):null;let h=null,x=[],z=null,O=[],q=new Array(At.length).fill(0);try{const c=JSON.parse(localStorage.getItem("melo-eq-gains")||"null");Array.isArray(c)&&c.length===At.length&&(q=c.map(k=>typeof k=="number"?Math.max(-12,Math.min(12,k)):0))}catch{}let nt=localStorage.getItem("melo-eq-preset")||Vt(q),w=localStorage.getItem("melo-eq-enabled")!=="0";function C(){if(!h)try{const c=fe(t);h=c.ctx,z=h.createGain(),x=At.map((k,T)=>{const D=h.createBiquadFilter();return D.type="peaking",D.frequency.value=k,D.Q.value=1.4,D.gain.value=w?q[T]:0,D}),c.append(x),c.append([z]),c.toDestination()}catch{}}function J(c,k){x[c]&&w&&(x[c].gain.value=k)}function et(c){C(),q=[...c],w&&c.forEach((k,T)=>{x[T]&&(x[T].gain.value=k)}),V()}function X(c){C(),w=c,c?q.forEach((k,T)=>{x[T]&&(x[T].gain.value=k)}):x.forEach(k=>{k.gain.value=0}),V()}a||t&&t.addEventListener("play",()=>{C(),(h==null?void 0:h.state)==="suspended"&&h.resume()}),rt("melo:eq",c=>{c&&(c.type==="gain"?(a||(C(),J(c.idx,c.val)),q[c.idx]=c.val,O[c.idx]&&(O[c.idx].value=String(c.val),G(O[c.idx])),l&&(l.value=Vt(q)),V()):c.type==="gains"?(a||et(c.values),q=[...c.values],O.length&&O.forEach((k,T)=>{k.value=String(q[T]),G(k)}),l&&c.preset&&(l.value=c.preset),V()):c.type==="enable"&&(w=!!c.on,a||X(w),o&&(o.checked=w),V()))});function G(c){var D;const k=parseInt(c.value),T=(D=c.parentElement)==null?void 0:D.querySelector(".val");T&&(T.textContent=(k>0?"+":"")+k+"dB")}function V(){if(!v||!r)return;const c=window.devicePixelRatio||1,k=v.clientWidth*c,T=v.clientHeight*c;if(k<=0||T<=0)return;v.width=k,v.height=T,r.clearRect(0,0,k,T);const D=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#2a7bd6",at=q;if(!w){r.strokeStyle="rgba(100,120,150,0.25)",r.lineWidth=2*c,r.beginPath(),r.moveTo(0,T/2),r.lineTo(k,T/2),r.stroke();return}r.strokeStyle=D,r.lineWidth=2.5*c,r.lineJoin="round",r.beginPath(),at.forEach((ot,tt)=>{const it=tt/(at.length-1)*k,dt=T/2-ot/12*(T/2-10*c);if(tt===0)r.moveTo(it,dt);else{const lt=(tt-1)/(at.length-1)*k,mt=T/2-at[tt-1]/12*(T/2-10*c);r.quadraticCurveTo((lt+it)/2,mt,it,dt)}}),r.stroke(),at.forEach((ot,tt)=>{const it=tt/(at.length-1)*k,dt=T/2-ot/12*(T/2-10*c);r.fillStyle=D,r.beginPath(),r.arc(it,dt,4*c,0,Math.PI*2),r.fill(),r.fillStyle="white",r.beginPath(),r.arc(it,dt,2*c,0,Math.PI*2),r.fill()}),r.strokeStyle="rgba(100,120,150,0.3)",r.lineWidth=1*c,r.setLineDash([4*c,4*c]),r.beginPath(),r.moveTo(0,T/2),r.lineTo(k,T/2),r.stroke(),r.setLineDash([])}g&&(g.innerHTML="",At.forEach((c,k)=>{const T=q[k]||0,D=document.createElement("div");D.className="eq-band",D.innerHTML=`
        <input type="range" min="-12" max="12" value="${T}" step="1" data-idx="${k}" orient="vertical" />
        <label>${c>=1e3?c/1e3+"k":c}</label>
        <span style="font-size:10px;color:var(--text-muted);min-height:12px;" class="val">${(T>0?"+":"")+T+"dB"}</span>
      `,g.appendChild(D)}),O=Array.from(g.querySelectorAll("input")),O.forEach(c=>{c.addEventListener("input",()=>{const k=parseInt(c.dataset.idx),T=parseInt(c.value);G(c),q[k]=T,V();const D=Vt(q);l&&(l.value=D),localStorage.setItem("melo-eq-gains",JSON.stringify(q)),localStorage.setItem("melo-eq-preset",D),a||J(k,T),j("melo:eq",{type:"gain",idx:k,val:T,values:q})})})),l&&(l.value=nt,l.addEventListener("change",()=>{const c=Pt[l.value]||Pt.flat;O.length&&O.forEach((k,T)=>{k.value=String(c[T]),G(k)}),q=[...c],V(),localStorage.setItem("melo-eq-gains",JSON.stringify(q)),localStorage.setItem("melo-eq-preset",l.value),a||et(c),j("melo:eq",{type:"gains",values:c,preset:l.value}),e(`Preset: ${l.options[l.selectedIndex].text}`)})),d&&d.addEventListener("click",()=>{const c=Pt.flat;O.length&&O.forEach((k,T)=>{k.value="0",G(k)}),q=[...c],l&&(l.value="flat"),localStorage.setItem("melo-eq-gains",JSON.stringify(q)),localStorage.setItem("melo-eq-preset","flat"),a||et(c),j("melo:eq",{type:"gains",values:c,preset:"flat"}),V(),e("Equalizer reset to Flat (0dB)")}),o&&(o.checked=w,o.addEventListener("change",()=>{w=o.checked,localStorage.setItem("melo-eq-enabled",w?"1":"0"),a||X(w),j("melo:eq",{type:"enable",on:w}),V(),e(w?"Equalizer On":"Equalizer off — Flat")})),v&&new ResizeObserver(()=>V()).observe(v),V(),window.LumiEqualizer={presets:Pt,frequencies:At,displayGains:q,reset:()=>d==null?void 0:d.click()}}const Ct=[{id:"bars",label:"Classic Bars"},{id:"thin",label:"Thin Bars"},{id:"line",label:"Spectrum Line"},{id:"mirror",label:"Mirror Bars"},{id:"wave",label:"Oscilloscope"}];function Ce(t){let e=document.getElementById("vizBars");if(!e)return;let n=q(e),a=n.getContext("2d"),o=null,l=null,d=null,g=null,v=null,r=!1,h=localStorage.getItem("melo-viz-mode")||"bars";Ct.some(y=>y.id===h)||(h="bars");let x=0,z=[],O=.45;function q(y){let I=y.querySelector("canvas");return I||(y.innerHTML="",I=document.createElement("canvas"),y.appendChild(I)),I}function nt(){if(!l)try{const y=fe(t);o=y.ctx,l=o.createAnalyser(),l.fftSize=2048,l.smoothingTimeConstant=.72,d=new Uint8Array(l.frequencyBinCount),g=new Uint8Array(l.fftSize);try{y.tap(l)}catch{r=!0}}catch{r=!0}}function w(y){const I=d.length,_=o.sampleRate/2,S=45,M=Math.min(15e3,_*.95),N=Math.log(S),$=Math.log(M),P=[];for(let s=0;s<y;s++){const H=Math.exp(N+($-N)*s/y),f=Math.exp(N+($-N)*(s+1)/y);let W=Math.floor(H/_*I),R=Math.max(W+1,Math.ceil(f/_*I));W<0&&(W=0),R>I&&(R=I);let st=0;for(let gt=W;gt<R;gt++)st+=d[gt];P.push(st/(R-W)/255)}return P}function C(y){const I=performance.now()/1e3,_=Math.pow(Math.abs(Math.sin(I*2.2)),2.5),S=[];for(let M=0;M<y;M++){let N=.42+.26*Math.sin(I*1.35+M*.62)+.2*Math.sin(I*2.9+M*1.31)+Math.random()*.07;N*=.55+.5*_,S.push(Math.max(.04,Math.min(1,N)))}return S}function J(y){const I=performance.now()/1e3,_=.5+.5*Math.pow(Math.abs(Math.sin(I*1.9)),2);for(let S=0;S<y.length;S++){const M=S/y.length;y[S]=128+66*_*(Math.sin(M*Math.PI*6+I*7)*.6+Math.sin(M*Math.PI*13-I*11)*.4)}}function et(y){let I;if(r||!l||!d)I=C(y);else{l.getByteFrequencyData(d),I=w(y);for(let S=0;S<y;S++)I[S]*=1+1.7*(S/Math.max(1,y-1))}let _=0;for(const S of I)S>_&&(_=S);_>O?O=_:O=Math.max(.35,O*.985),z.length!==y&&(z=new Array(y).fill(0));for(let S=0;S<y;S++){const M=Math.min(1,I[S]/O),N=M>z[S]?.55:.16;z[S]+=(M-z[S])*N}return z}function X(y,I){return getComputedStyle(document.documentElement).getPropertyValue(y).trim()||I}function G(){return n.width/Math.max(1,n.clientWidth)||1}function V(y,I,_,S,M){if(M=Math.min(M,_/2,S/2),a.roundRect){a.roundRect(y,I,_,S,M);return}a.rect(y,I,_,S)}function c(){const y=window.devicePixelRatio||1,I=n.clientWidth,_=n.clientHeight;I>0&&_>0&&(n.width=Math.round(I*y),n.height=Math.round(_*y))}new ResizeObserver(c).observe(n),c();function k(y,I,_,S){const M=G(),N=X("--visualizer","#5ea0e6"),$=X("--accent","#2a7bd6"),P=y.length,s=I/P,H=Math.max(1.2*M,s*(1-S));for(let f=0;f<P;f++){const W=y[f],R=Math.max(2*M,W*(_-4*M)),st=f*s+(s-H)/2,gt=_-R-1*M,F=a.createLinearGradient(0,gt,0,_);F.addColorStop(0,$),F.addColorStop(1,N),a.fillStyle=F,a.beginPath(),V(st,gt,H,R,Math.min(H/2,3.5*M)),a.fill()}}function T(y,I,_){const S=G(),M=X("--visualizer","#5ea0e6"),N=X("--accent","#2a7bd6"),$=y.length,P=I/$,s=_/2,H=Math.max(1.5*S,P*.62);for(let f=0;f<$;f++){const W=Math.max(1.5*S,y[f]*(_/2-3*S)),R=f*P+(P-H)/2,st=a.createLinearGradient(0,s-W,0,s+W);st.addColorStop(0,N),st.addColorStop(.5,M),st.addColorStop(1,N),a.fillStyle=st,a.beginPath(),V(R,s-W,H,W*2,Math.min(H/2,3*S)),a.fill()}}function D(y,I,_){const S=G(),M=X("--visualizer","#5ea0e6"),N=X("--accent","#2a7bd6"),$=y.length,P=[],s=[];for(let f=0;f<$;f++)P.push((f+.5)/$*I),s.push(_-2*S-y[f]*(_-8*S));a.beginPath(),a.moveTo(P[0],_),a.lineTo(P[0],s[0]);for(let f=1;f<$;f++){const W=(P[f-1]+P[f])/2;a.quadraticCurveTo(P[f-1],s[f-1],W,(s[f-1]+s[f])/2)}a.lineTo(P[$-1],s[$-1]),a.lineTo(P[$-1],_),a.closePath();const H=a.createLinearGradient(0,0,0,_);H.addColorStop(0,M),H.addColorStop(1,"transparent"),a.globalAlpha=.18,a.fillStyle=H,a.fill(),a.globalAlpha=1,a.beginPath(),a.moveTo(P[0],s[0]);for(let f=1;f<$;f++){const W=(P[f-1]+P[f])/2;a.quadraticCurveTo(P[f-1],s[f-1],W,(s[f-1]+s[f])/2)}a.lineTo(P[$-1],s[$-1]),a.strokeStyle=N,a.lineWidth=2*S,a.lineJoin="round",a.stroke()}function at(){const y=n.width,I=n.height,_=G(),S=X("--accent","#2a7bd6");let M;r||!l||!g?(v||(v=new Uint8Array(1024)),J(v),M=v):(l.getByteTimeDomainData(g),M=g);const N=()=>{a.beginPath();for(let $=0;$<=y;$+=2){const P=Math.min(M.length-1,Math.floor($/y*M.length)),s=M[P]/255*I;$===0?a.moveTo($,s):a.lineTo($,s)}};N(),a.strokeStyle=S,a.globalAlpha=.16,a.lineWidth=6*_,a.lineJoin="round",a.stroke(),N(),a.globalAlpha=1,a.lineWidth=1.8*_,a.stroke()}function ot(){const y=n.width,I=n.height;if(!y||!I)return;if(a.clearRect(0,0,y,I),h==="wave"){at();return}const S=et(h==="bars"?16:h==="thin"?56:h==="line"?64:24);h==="bars"?k(S,y,I,.34):h==="thin"?k(S,y,I,.32):h==="line"?D(S,y,I):h==="mirror"&&T(S,y,I)}function tt(){x=requestAnimationFrame(tt),ot()}function it(){x||tt()}function dt(y,I=!1){var _;if(h=y,z=[],localStorage.setItem("melo-viz-mode",y),!I){const S=window.__TOAST__,M=(_=Ct.find(N=>N.id===y))==null?void 0:_.label;S&&M&&S(`Visualizer: ${M}`)}}function lt(){e&&(e.title="Click: next mode • Right-click: choose mode",e.addEventListener("click",()=>{const y=Ct.findIndex(I=>I.id===h);dt(Ct[(y+1)%Ct.length].id)}))}document.addEventListener("click",y=>{}),document.addEventListener("keydown",y=>{y.key});function mt(){nt(),it(),(o==null?void 0:o.state)==="suspended"&&o.resume()}t.addEventListener("play",mt),mt(),lt(),document.addEventListener("visibilitychange",()=>{document.hidden?(cancelAnimationFrame(x),x=0):it()});function It(){cancelAnimationFrame(x),x=0,e=document.getElementById("vizBars"),e&&(n=q(e),a=n.getContext("2d"),new ResizeObserver(c).observe(n),c(),lt(),it())}window.__LUMI_REBIND_VISUALIZER__=It}let ft=null;const be=`<!doctype html>
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
</html>`,Pe=`<!doctype html>
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
</html>`;function ye(t){const e=["trackTitle","btnPlay","seekBar","coverImg"];let n=0;for(const a of e)t.includes(a)&&n++;return n>=3}function _t(t,e){const n=document.getElementById("playerCard");if(!n)return;const a=n._originalHTML||n.innerHTML;n._originalHTML||(n._originalHTML=a),ft&&(ft.remove(),ft=null);let l=[...t.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(x=>x[1]).join(`
`);l&&(ft=document.createElement("style"),ft.id="melo-custom-skin",ft.textContent=l,document.head.appendChild(ft));const d=ye(t);let g="";const v=t.match(/<body[^>]*>([\s\S]*?)<\/body>/i);v?g=v[1]:g=t.split(/<\/style>/i).pop()||"";const r=document.createElement("div");r.innerHTML=g;const h=r.querySelector("#lumi-player");if(h&&(g=h.innerHTML),d&&g.trim().length>20){const x=g.trim();n.innerHTML=x,e&&e("Skin applied"),setTimeout(()=>{var O,q;(O=window.__LUMI_REBIND__)==null||O.call(window);const z=window.__LUMI_AUDIO__;z&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(z),(q=window.__LUMI_REBIND_MAIN__)==null||q.call(window)},40)}else l&&e&&e("Skin CSS applied");localStorage.setItem("lumi-custom-skin",t),localStorage.setItem("lumi-custom-skin-isFull",d?"1":"0")}function Dt(t){ft&&(ft.remove(),ft=null);const e=document.getElementById("playerCard");e&&e._originalHTML&&(e.innerHTML=e._originalHTML,setTimeout(()=>{var a,o;(a=window.__LUMI_REBIND__)==null||a.call(window);const n=window.__LUMI_AUDIO__;n&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(n),(o=window.__LUMI_REBIND_MAIN__)==null||o.call(window)},40)),localStorage.removeItem("lumi-custom-skin"),localStorage.removeItem("lumi-custom-skin-isFull"),localStorage.removeItem("melo-active-skin-id"),j("melo:skin-changed","default"),t&&t("Switched to Default Melo skin")}function Rt(t,e,n){if(t==="default"){Dt(n);return}if(t==="compact-pill"){const o=(e||localStorage.getItem("lumi-theme")||"light")==="dark"?Pe:be;_t(o,n),localStorage.setItem("melo-active-skin-id","compact-pill"),j("melo:skin-changed","compact-pill")}}function ze(t){const e=document.getElementById("skinUpload"),n=document.getElementById("linkDownloadExample");n&&n.addEventListener("click",l=>{l.preventDefault();const d=new Blob([be],{type:"text/html"}),g=URL.createObjectURL(d),v=document.createElement("a");v.href=g,v.download="melo-compact-skin.html",v.click(),URL.revokeObjectURL(g),t("Sample skin downloaded")});const a=localStorage.getItem("melo-active-skin-id"),o=localStorage.getItem("lumi-custom-skin");if(a==="compact-pill"){const l=localStorage.getItem("lumi-theme")||"light";setTimeout(()=>Rt("compact-pill",l),150)}else o&&setTimeout(()=>_t(o),150);rt("melo:theme",l=>{localStorage.getItem("melo-active-skin-id")==="compact-pill"&&Rt("compact-pill",l)}),e&&e.addEventListener("change",async()=>{var v;const l=(v=e.files)==null?void 0:v[0];if(!l)return;const d=await l.text(),g=l.name.replace(/\.[^/.]+$/,"");localStorage.setItem("melo-active-skin-id","custom-"+g),_t(d,t),e.value=""}),document.addEventListener("dragover",l=>{var d;[...((d=l.dataTransfer)==null?void 0:d.types)||[]].includes("Files")&&l.preventDefault()}),document.addEventListener("drop",async l=>{var g;const d=[...((g=l.dataTransfer)==null?void 0:g.files)||[]].find(v=>v.name.endsWith(".html")||v.name.endsWith(".htm"));if(d){l.preventDefault();const v=await d.text();if(v.includes("<style")||v.includes("<html")||ye(v)){const r=d.name.replace(/\.[^/.]+$/,"");localStorage.setItem("melo-active-skin-id","custom-"+r),_t(v,t)}}}),window.LumiSkin={applyCustomSkin:_t,resetSkin:Dt,applySkinPreset:Rt}}const we=document.querySelector("#app");we.innerHTML=`
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
    <div class="float-win" id="win-playlist" style="left:370px; top:12px; width:340px; height:460px; z-index:3;">
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
      <div class="float-body" style="padding:8px; display:flex; flex-direction:column; gap:8px;">
        <div id="winPlaylistTracks" class="drop-zone" style="flex:1; overflow:auto; display:flex; flex-direction:column; min-height:140px;"></div>
        <div id="winPlaylistEmpty" style="display:none; border:1px dashed var(--card-border); border-radius:10px; padding:16px 10px; background:var(--track-bg); text-align:center; font-size:11px; color:var(--text-muted); line-height:1.8;">
          Playlist is empty<br/>Drag tracks from the Library and drop them here
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
              <div class="desc">Select active player skin and toggle between Light and Dark themes</div>
            </div>
            <div style="display:flex; gap:8px; align-items:center;">
              <select class="settings-select" id="skinSelect" style="flex:1; height:34px; font-size:12px; padding:4px 10px;">
                <option value="default">Default Melo (Standard)</option>
                <option value="compact-pill">Minimal Compact (Pill Bar)</option>
              </select>
              <button class="btn small" id="btnSkinThemeToggle" title="Toggle Light / Dark theme" style="height:34px; padding:0 14px; font-size:12px; display:inline-flex; align-items:center; gap:6px; flex-shrink:0;">
                <span id="skinThemeIcon">🌙</span>
                <span id="skinThemeLabel">Dark</span>
              </button>
            </div>
          </div>

          <div class="settings-row">
            <div><div class="label">Show Stop button</div><div class="desc">Add dedicated stop button to the transport controls</div></div>
            <div class="switch" id="swStopBtn" data-key="showStop"></div>
          </div>

          <div class="settings-row" style="flex-direction:column; align-items:stretch;">
            <div class="label" style="margin-bottom:6px;">Custom HTML/CSS Skin</div>
            <div style="font-size:11px; color:var(--text-soft); line-height:1.6; margin-bottom:8px;">
              Load custom HTML/CSS skins. <a href="#" id="linkDownloadExample" style="color:var(--accent);">Download template</a>
            </div>
            <div style="display:flex; gap:8px;">
              <label class="btn small" style="cursor:pointer; flex:1; justify-content:center;">
                Load HTML Skin File
                <input id="skinUpload" type="file" accept=".html,.htm" style="display:none" />
              </label>
              <button class="btn small" id="btn-reset-skin-settings">Reset to Default</button>
            </div>
          </div>

          <div class="settings-row">
            <div><div class="label">Window Opacity</div><div class="desc">Player background transparency</div></div>
            <input type="range" min="30" max="100" value="100" id="setOpacity" style="width:100px;" />
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
            <div style="font-size:16px; font-weight:800; color:var(--text); margin-bottom:4px;">Melo 0.2 Beta</div>
            <b>Tauri 2 + TypeScript + Vite + Rust</b><br/>
            Supports: FLAC, ALAC, MP3, WAV, AAC, OGG, OPUS • 10-band EQ • Real-time FFT Visualizer • Multi-Window & Custom Skins<br/>
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
        <button class="menu-item" id="menuToggleSettings">Settings</button>
        <div class="menu-sep"></div>
        <div class="menu-label">Skins & Themes</div>
        <button class="menu-item" id="menuSkinDefault">Skin: Default Melo</button>
        <button class="menu-item" id="menuSkinCompact">Skin: Minimal Compact</button>
        <div class="menu-sep"></div>
        <button class="menu-item" id="menuThemeToggle">Toggle Light / Dark Theme</button>
        <button class="menu-item" id="menuCustomSkin">Load Custom HTML Skin...</button>
        <button class="menu-item" id="menuAbout">About Melo 0.2 Beta</button>
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
          <button class="sbtn" id="btnOpenSettings" title="Settings">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div id="toast" class="toast"></div>
</div>
`;const Mt=!!window.__TAURI__,pt=new URLSearchParams(location.search).get("panel");var oe,le;if(Mt&&pt){Y(async()=>{const{getCurrentWindow:a}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:a}},__vite__mapDeps([6,7,1,0])).then(({getCurrentWindow:a})=>{const o=a();De(o,"melo-geo-panel-"+pt),o.onCloseRequested(()=>{j("melo:panel-closed",pt)}),window.addEventListener("beforeunload",()=>{j("melo:panel-closed",pt)})});const t=document.getElementById("win-"+pt),e=((oe=t==null?void 0:t.querySelector(".float-title"))==null?void 0:oe.innerHTML)||"",n=((le=t==null?void 0:t.querySelector(".float-body"))==null?void 0:le.innerHTML)||"";we.innerHTML=`
<div class="panel-root">
  <div class="panel-titlebar">${e}</div>
  <div class="panel-body">${n}</div>
  <div id="toast" class="toast"></div>
</div>`}Mt&&!pt&&(document.body.classList.add("tauri-main"),document.querySelectorAll(".side-actions .sbtn").forEach(t=>t.classList.remove("active")),Y(async()=>{const{WebviewWindow:t}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:t}},__vite__mapDeps([8,7,1,0,6])).then(({WebviewWindow:t})=>{const e=async()=>{var n;for(const a of["library","playlist","equalizer","settings"])try{const o=await t.getByLabel("panel-"+a);(n=document.getElementById(Nt[a]))==null||n.classList.toggle("active",!!o)}catch{}};e(),setInterval(e,1200)}));Mt&&!pt&&(Y(()=>import("./window-BWd3Cypy.js"),__vite__mapDeps([6,7,1,0])).then(async({getCurrentWindow:t})=>{const e=t(),n=()=>localStorage.getItem("melo-active-skin-id")==="compact-pill"?140:240;try{const o=JSON.parse(localStorage.getItem("melo-geo-main")||"null"),{LogicalPosition:l,LogicalSize:d}=await Y(async()=>{const{LogicalPosition:r,LogicalSize:h}=await import("./dpi-fvP-W2qr.js");return{LogicalPosition:r,LogicalSize:h}},__vite__mapDeps([7,1])),g=n(),v=o!=null&&o.w?Math.max(650,o.w):960;await e.setSize(new d(v,g)),(o==null?void 0:o.x)!=null&&(o==null?void 0:o.y)!=null&&await e.setPosition(new l(o.x,o.y))}catch{}const a=async()=>{try{const o=await e.outerPosition(),l=await e.innerSize();localStorage.setItem("melo-geo-main",JSON.stringify({x:o.x,y:o.y,w:l.width,h:n()}))}catch{}};e.onMoved(a),e.onResized(async()=>{try{const o=await e.innerSize(),l=n(),{LogicalSize:d}=await Y(async()=>{const{LogicalSize:g}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:g}},__vite__mapDeps([7,1]));(o.width<650||o.height!==l)&&await e.setSize(new d(Math.max(650,o.width),l))}catch{}a()}),rt("melo:skin-changed",async o=>{try{const l=o==="compact-pill"?140:240,d=await e.innerSize(),{LogicalSize:g}=await Y(async()=>{const{LogicalSize:v}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:v}},__vite__mapDeps([7,1]));await e.setSize(new g(Math.max(650,d.width),l)),a()}catch{}}),e.onCloseRequested(async o=>{o.preventDefault();const{WebviewWindow:l}=await Y(async()=>{const{WebviewWindow:d}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:d}},__vite__mapDeps([8,7,1,0,6]));for(const d of["library","playlist","equalizer","settings"])try{const g=await l.getByLabel("panel-"+d);g&&await g.close()}catch{}try{await e.destroy()}catch{window.close()}})}),Y(()=>import("./core-DhEqZVGG.js"),[]).then(async({invoke:t})=>{try{const e=await t("get_cli_tracks");if(Array.isArray(e)&&e.length>0){const n=window.LumiLibrary,a=window.LumiPlayer;e.forEach(o=>o.source="import"),n==null||n.addToCurrentPlaylist(e),e.forEach(o=>a==null?void 0:a.queue.push(o)),setTimeout(()=>{if(a&&a.queue.length>0){const o=a.queue.findIndex(l=>l.id===e[0].id);a.loadTrack(o>=0?o:0,!0)}},150)}}catch{}}),rt("melo:open-files",t=>{if(Array.isArray(t)&&t.length>0){const e=window.LumiLibrary,n=window.LumiPlayer;t.forEach(a=>a.source="import"),e==null||e.addToCurrentPlaylist(t),t.forEach(a=>n==null?void 0:n.queue.push(a)),Q(`Playing ${t[0].title}`),setTimeout(()=>{if(n&&n.queue.length>0){const a=n.queue.findIndex(o=>o.id===t[0].id);n.loadTrack(a>=0?a:0,!0)}},150)}}));document.addEventListener("contextmenu",t=>{t.preventDefault()});const Ot=document.getElementById("toast"),Q=t=>{Ot&&(Ot.textContent=t,Ot.classList.add("show"),setTimeout(()=>Ot.classList.remove("show"),2200))},kt=new Audio;kt.crossOrigin="anonymous";kt.preload="metadata";window.__LUMI_AUDIO__=kt;window.__TOAST__=Q;let bt=localStorage.getItem("lumi-theme")||"dark";function $t(t){document.documentElement.setAttribute("data-theme",t),localStorage.setItem("lumi-theme",t),bt=t}function Ft(t){$t(t),j("melo:theme",t)}$t(bt);rt("melo:theme",t=>{(t==="light"||t==="dark")&&$t(t)});setInterval(()=>{const t=localStorage.getItem("lumi-theme");(t==="light"||t==="dark")&&t!==bt&&$t(t)},1e3);const Re=["win-library","win-playlist","win-equalizer","win-settings"],Ut=document.getElementById("desktop"),xe={btnToggleLibrary:"win-library",btnTogglePlaylist:"win-playlist",btnToggleEq:"win-equalizer",btnOpenSettings:"win-settings",menuToggleLibrary:"win-library",menuTogglePlaylist:"win-playlist",menuToggleEq:"win-equalizer",menuToggleSettings:"win-settings"};function qe(t){const e=document.getElementById(t);return!!e&&!e.classList.contains("hidden")}const Nt={library:"btnToggleLibrary",playlist:"btnTogglePlaylist",equalizer:"btnToggleEq",settings:"btnOpenSettings"};async function De(t,e){const n=async()=>{try{const a=await t.outerPosition(),o=await t.outerSize();localStorage.setItem(e,JSON.stringify({x:a.x,y:a.y,w:o.width,h:o.height}))}catch{}};t.onMoved(n),t.onResized(n)}async function Oe(t){const{WebviewWindow:e}=await Y(async()=>{const{WebviewWindow:h}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:h}},__vite__mapDeps([8,7,1,0,6])),n="panel-"+t,a=document.getElementById(Nt[t]),o=await e.getByLabel(n);if(o){await o.close(),a==null||a.classList.remove("active");return}const l={library:[430,620],playlist:[440,560],equalizer:[700,440],settings:[600,540]},d={library:[360,400],playlist:[360,360],equalizer:[620,400],settings:[500,400]},g={library:"Library",playlist:"Playlist",equalizer:"Equalizer",settings:"Settings"},v=l[t]||[420,520];let r=null;try{r=JSON.parse(localStorage.getItem("melo-geo-panel-"+t)||"null")}catch{}new e(n,{url:`/?panel=${t}`,title:g[t]||t,width:(r==null?void 0:r.w)||v[0],height:(r==null?void 0:r.h)||v[1],minWidth:(d[t]||[360,360])[0],minHeight:(d[t]||[360,360])[1],...(r==null?void 0:r.x)!=null?{x:r.x,y:r.y}:{center:!0},decorations:!0,skipTaskbar:!0}),a==null||a.classList.add("active"),j("melo:theme",bt)}rt("melo:panel-closed",t=>{var n;const e=Nt[t];e&&((n=document.getElementById(e))==null||n.classList.remove("active"))});function ke(t){if(Mt){Oe(t.replace(/^win-/,""));return}const e=qe(t);qt(t,!e),e||Ht(document.getElementById(t))}function Ue(t){if(t.classList.contains("hidden")||!Ut||window.matchMedia("(max-width: 860px)").matches)return;const e=Ut.getBoundingClientRect();if(e.width<=0||e.height<=0)return;const n=t.getBoundingClientRect(),a=Math.min(n.width,e.width),o=Math.min(n.height,e.height);let l=n.left-e.left,d=n.top-e.top;l=Math.max(0,Math.min(e.width-a,l)),d=Math.max(0,Math.min(e.height-o,d)),t.style.left=l+"px",t.style.top=d+"px",t.style.right="auto",t.style.bottom="auto",t.style.transform="none"}function qt(t,e){var o,l,d,g,v,r,h,x;const n=document.getElementById(t);if(!n)return;n.classList.toggle("hidden",!e),localStorage.setItem("lumiv2-"+t,e?"1":"0"),e&&Ue(n);const a=e;t==="win-library"&&((o=document.getElementById("btnToggleLibrary"))==null||o.classList.toggle("active",a),(l=document.getElementById("menuToggleLibrary"))==null||l.classList.toggle("active",a)),t==="win-playlist"&&((d=document.getElementById("btnTogglePlaylist"))==null||d.classList.toggle("active",a),(g=document.getElementById("menuTogglePlaylist"))==null||g.classList.toggle("active",a)),t==="win-equalizer"&&((v=document.getElementById("btnToggleEq"))==null||v.classList.toggle("active",a),(r=document.getElementById("menuToggleEq"))==null||r.classList.toggle("active",a)),t==="win-settings"&&((h=document.getElementById("btnOpenSettings"))==null||h.classList.toggle("active",a),(x=document.getElementById("menuToggleSettings"))==null||x.classList.toggle("active",a))}pt||Re.forEach(t=>{const e=localStorage.getItem("lumiv2-"+t);e!==null?qt(t,e==="1"):t==="win-settings"?qt(t,!1):qt(t,!0)});Object.entries(xe).forEach(([t,e])=>{var n;(n=document.getElementById(t))==null||n.addEventListener("click",()=>ke(e))});document.querySelectorAll("[data-close]").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.close;qt(e,!1)})});let vt=null,ht=null,ae=10;function Ht(t){ae++,t.style.zIndex=String(ae),document.querySelectorAll(".float-win").forEach(e=>e.classList.remove("active")),t.classList.add("active")}document.querySelectorAll(".float-win").forEach(t=>{t.addEventListener("mousedown",()=>Ht(t))});document.querySelectorAll("[data-drag]").forEach(t=>{t.addEventListener("mousedown",e=>{if(e.target.closest("button")||e.target.closest("input")||e.target.closest("select"))return;const n=t.dataset.drag,a=document.getElementById(n);Ht(a),a.classList.add("dragging");const o=a.getBoundingClientRect();vt={id:n,startX:e.clientX,startY:e.clientY,initX:o.left,initY:o.top,width:o.width,height:o.height}})});document.querySelectorAll("[data-resize]").forEach(t=>{t.addEventListener("mousedown",e=>{e.stopPropagation();const n=t.dataset.resize,a=document.getElementById(n);Ht(a),a.classList.add("resizing");const o=a.getBoundingClientRect();ht={id:n,startX:e.clientX,startY:e.clientY,initW:o.width,initH:o.height}})});window.addEventListener("mousemove",t=>{if(vt){const e=document.getElementById(vt.id);let n=t.clientX-vt.startX,a=t.clientY-vt.startY,o=vt.initX+n,l=vt.initY+a;if(Ut&&!window.matchMedia("(max-width: 860px)").matches){const d=Ut.getBoundingClientRect(),g=d.left,v=d.right-vt.width,r=d.top,h=d.bottom-vt.height;o=Math.max(g,Math.min(v,o))-d.left,l=Math.max(r,Math.min(h,l))-d.top}e.style.left=o+"px",e.style.top=l+"px",e.style.right="auto",e.style.bottom="auto",e.style.transform="none"}if(ht){const e=document.getElementById(ht.id);let n=ht.initW+(t.clientX-ht.startX),a=ht.initH+(t.clientY-ht.startY);n=Math.max(260,n),a=Math.max(160,a),e.style.width=n+"px",e.style.height=a+"px"}});window.addEventListener("mouseup",()=>{if(vt){const t=document.getElementById(vt.id);t&&(t.classList.remove("dragging"),localStorage.setItem("lumiv2-pos-"+vt.id,JSON.stringify({left:t.style.left,top:t.style.top}))),vt=null}if(ht){const t=document.getElementById(ht.id);t&&(t.classList.remove("resizing"),localStorage.setItem("lumiv2-size-"+ht.id,JSON.stringify({width:t.style.width,height:t.style.height}))),ht=null}});let ut=document.getElementById("appMenuBtn"),U=document.getElementById("appMenu");function $e(){const t=U==null?void 0:U.classList.toggle("open");ut==null||ut.classList.toggle("open",!!t)}ut==null||ut.addEventListener("click",t=>{t.stopPropagation(),$e()});document.addEventListener("click",t=>{U&&!U.contains(t.target)&&t.target!==ut&&(U.classList.remove("open"),ut==null||ut.classList.remove("open"))});document.addEventListener("keydown",t=>{t.key==="Escape"&&(U==null||U.classList.remove("open"),ut==null||ut.classList.remove("open"))});var se;(se=document.getElementById("menuCustomSkin"))==null||se.addEventListener("click",()=>{var t;(t=document.getElementById("skinUpload"))==null||t.click(),U==null||U.classList.remove("open")});var re;(re=document.getElementById("menuSkinDefault"))==null||re.addEventListener("click",()=>{Dt(Q);const t=document.getElementById("skinSelect");t&&(t.value="default"),U==null||U.classList.remove("open")});var ce;(ce=document.getElementById("menuSkinCompact"))==null||ce.addEventListener("click",()=>{Rt("compact-pill",bt,Q);const t=document.getElementById("skinSelect");t&&(t.value="compact-pill"),U==null||U.classList.remove("open")});var de;(de=document.getElementById("menuThemeToggle"))==null||de.addEventListener("click",()=>{Ft(bt==="light"?"dark":"light"),U==null||U.classList.remove("open")});var pe;(pe=document.getElementById("menuAbout"))==null||pe.addEventListener("click",()=>{Q("Melo 0.2 Beta — Tauri 2 + TypeScript + Rust"),U==null||U.classList.remove("open")});async function Ee(){const t=window.LumiLibrary,e=window.LumiPlayer;if(window.__TAURI__){try{const{open:a}=await Y(async()=>{const{open:g}=await import("./index-CS3Qnt9j.js");return{open:g}},__vite__mapDeps([5,1])),o=await a({multiple:!0,filters:[{name:"Audio",extensions:["mp3","flac","wav","aac","ogg","m4a","alac","opus"]}]});if(!o)return;const l=Array.isArray(o)?o:[o],d=[];for(const g of l){const v=g.replace(/^.*[\\/]/,""),r=v.lastIndexOf("."),h=r>0?v.slice(0,r):v,x=r>0?v.slice(r+1).toUpperCase():"AUDIO";d.push({id:"imp_"+Math.random().toString(36).slice(2,9),title:h,artist:"Unknown Artist",album:"Single",duration:0,path:g,codec:x,specs:"Local File",source:"import"})}t.addToCurrentPlaylist(d),d.forEach(g=>e==null?void 0:e.queue.push(g)),j("melo:play-tracks",{tracks:d,index:0}),Q(`${d.length} file(s) added to playlist`)}catch{Q("Add files requires desktop build")}U==null||U.classList.remove("open");return}const n=document.createElement("input");n.type="file",n.multiple=!0,n.accept="audio/*,.mp3,.flac,.wav,.aac,.ogg,.m4a,.alac,.opus",n.onchange=async()=>{const a=Array.from(n.files||[]);if(!a.length)return;const o=[];for(const l of a){const d=URL.createObjectURL(l),g=l.name,v=g.lastIndexOf("."),r=v>0?g.slice(0,v):g,h=v>0?g.slice(v+1).toUpperCase():"AUDIO",x={id:"imp_"+Math.random().toString(36).slice(2,9),title:r,artist:"Unknown Artist",album:"Single",duration:0,path:d,codec:h,specs:"Local File",source:"import"};await zt(l,x),o.push(x)}t.addToCurrentPlaylist(o),o.forEach(l=>e==null?void 0:e.queue.push(l)),j("melo:play-tracks",{tracks:o,index:0}),Q(`${o.length} file(s) added`)},n.click(),U==null||U.classList.remove("open")}async function Le(){const t=window.LumiLibrary,e=window.LumiPlayer;if(window.__TAURI__){try{const{open:a}=await Y(async()=>{const{open:r}=await import("./index-CS3Qnt9j.js");return{open:r}},__vite__mapDeps([5,1])),o=await a({directory:!0});if(!o)return;const l=o,{invoke:d}=await Y(async()=>{const{invoke:r}=await import("./core-DhEqZVGG.js");return{invoke:r}},[]),v=(await d("scan_library",{root:l})).map(r=>({...r,source:"import"}));t.addToCurrentPlaylist(v),v.forEach(r=>e==null?void 0:e.queue.push(r)),j("melo:play-tracks",{tracks:v,index:0}),Q(`${v.length} track(s) added from folder`)}catch{Q("Add folder requires desktop build")}U==null||U.classList.remove("open");return}const n=document.createElement("input");n.type="file",n.webkitdirectory=!0,n.multiple=!0,n.accept="audio/*",n.onchange=async()=>{const a=Array.from(n.files||[]).filter(l=>/\.(mp3|flac|wav|aac|ogg|m4a|alac|opus)$/i.test(l.name));if(!a.length)return;const o=[];for(const l of a){const d=URL.createObjectURL(l),g=l.name,v=g.lastIndexOf("."),r=v>0?g.slice(0,v):g,h=v>0?g.slice(v+1).toUpperCase():"AUDIO",x={id:"imp_"+Math.random().toString(36).slice(2,9),title:r,artist:"Unknown Artist",album:"Folder Import",duration:0,path:d,codec:h,specs:"Local File",source:"import"};await zt(l,x),o.push(x)}t.addToCurrentPlaylist(o),o.forEach(l=>e==null?void 0:e.queue.push(l)),j("melo:play-tracks",{tracks:o,index:0}),Q(`${o.length} file(s) added from folder`)},n.click(),U==null||U.classList.remove("open")}var ue;(ue=document.getElementById("btnAddFiles"))==null||ue.addEventListener("click",Ee);var me;(me=document.getElementById("btnAddFolder"))==null||me.addEventListener("click",Le);var ge;(ge=document.getElementById("btnThemeToggle"))==null||ge.addEventListener("click",()=>{Ft(bt==="light"?"dark":"light")});window.addEventListener("keydown",t=>{(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="o"&&(t.shiftKey?(t.preventDefault(),Le()):(t.preventDefault(),Ee()))});function ie(t){var O,q,nt;function e(w){document.querySelectorAll(".settings-tab").forEach(C=>{C.classList.toggle("active",C.dataset.stab===w)}),document.querySelectorAll(".settings-section[data-panel]").forEach(C=>{C.classList.toggle("active",C.dataset.panel===w)}),localStorage.setItem("melo-settings-tab",w)}document.querySelectorAll(".settings-tab").forEach(w=>{w.addEventListener("click",()=>e(w.dataset.stab))}),e(localStorage.getItem("melo-settings-tab")||"general"),document.querySelectorAll(".switch[data-key]").forEach(w=>{const C=w.dataset.key,J=localStorage.getItem("melo-pref-"+C);J!==null&&w.classList.toggle("on",J==="1"),w.onclick=()=>{w.classList.toggle("on");const et=w.classList.contains("on");localStorage.setItem("melo-pref-"+C,et?"1":"0"),t(et?"Enabled":"Disabled"),j("melo:pref-changed",{key:C,value:et})}});const n=document.getElementById("setCrossfade"),a=document.getElementById("crossfadeVal");if(n){const w=localStorage.getItem("melo-pref-crossfade")||"0";n.value=w,a&&(a.textContent=w+"s"),n.oninput=()=>{const C=n.value;a&&(a.textContent=C+"s"),localStorage.setItem("melo-pref-crossfade",C)}}const o=document.getElementById("setLanguage");if(o){const w=localStorage.getItem("melo-pref-lang")||"en";o.value=w,o.onchange=()=>{localStorage.setItem("melo-pref-lang",o.value),t(`Language set to ${o.options[o.selectedIndex].text}`)}}const l=document.getElementById("swStopBtn");function d(){const w=localStorage.getItem("lumiv2-showStop")==="1";l&&l.classList.toggle("on",w);const C=document.getElementById("btnStop");C&&(C.style.display=w?"":"none")}l&&(d(),l.onclick=()=>{const w=!l.classList.contains("on");l.classList.toggle("on",w),localStorage.setItem("lumiv2-showStop",w?"1":"0"),d(),t(w?"Stop button shown":"Stop button hidden")});const g=document.getElementById("setOpacity");if(g){const w=localStorage.getItem("melo-pref-opacity")||"100";if(g.value=w,g.oninput=()=>{const C=parseInt(g.value)/100,J=document.getElementById("playerCard");J&&(J.style.opacity=String(Math.max(.2,C))),localStorage.setItem("melo-pref-opacity",g.value)},w!=="100"){const C=document.getElementById("playerCard");C&&(C.style.opacity=String(Math.max(.2,parseInt(w)/100)))}}const v=document.getElementById("skinSelect"),r=document.getElementById("btnSkinThemeToggle"),h=document.getElementById("skinThemeIcon"),x=document.getElementById("skinThemeLabel");function z(w){h&&(h.textContent=w==="dark"?"🌙":"☀️"),x&&(x.textContent=w==="dark"?"Dark":"Light")}if(z(bt),r==null||r.addEventListener("click",()=>{const w=bt==="dark"?"light":"dark";Ft(w),z(w),t(w==="dark"?"Dark theme":"Light theme")}),rt("melo:theme",w=>{(w==="light"||w==="dark")&&z(w)}),v){const w=localStorage.getItem("melo-active-skin-id")||"default";v.value=w,v.onchange=()=>{const C=v.value;if(C==="default")Dt(t);else if(C==="compact-pill")Rt("compact-pill",bt,t);else{const J=localStorage.getItem("lumi-custom-skin");J&&(_t(J,t),localStorage.setItem("melo-active-skin-id",C))}}}(O=document.getElementById("btn-reset-skin-settings"))==null||O.addEventListener("click",()=>{Dt(t),v&&(v.value="default")}),(q=document.getElementById("btn-settings-reset"))==null||q.addEventListener("click",()=>{localStorage.clear(),t("Settings reset — reloading..."),setTimeout(()=>location.reload(),600)}),(nt=document.getElementById("btnChooseFolder"))==null||nt.addEventListener("click",async()=>{if(window.__TAURI__)try{const{open:w}=await Y(async()=>{const{open:J}=await import("./index-CS3Qnt9j.js");return{open:J}},__vite__mapDeps([5,1])),C=await w({directory:!0});C&&(document.getElementById("setMusicFolder").value=C,localStorage.setItem("melo-pref-music-folder",C),t("Music folder updated"))}catch{}else t("Folder selection dialog requires Tauri build")})}function Se(){document.querySelectorAll(".win-btn").forEach(t=>{t.onclick=async()=>{const e=t.getAttribute("aria-label");if(window.__TAURI__){const{getCurrentWindow:n}=await Y(async()=>{const{getCurrentWindow:o}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:o}},__vite__mapDeps([6,7,1,0])),a=n();e==="minimize"?a.minimize():e==="maximize"?a.toggleMaximize():e==="close"&&a.close()}else e==="close"&&Q("Window close requires the Tauri desktop build"),e==="maximize"&&Q("Resize: drag corner handle")}})}Se();window.__LUMI_REBIND_MAIN__=()=>{const t=document.getElementById("appMenuBtn"),e=document.getElementById("appMenu");t&&e&&(ut=t,U=e,t.onclick=n=>{n.stopPropagation(),e.classList.toggle("open"),t.classList.toggle("open",e.classList.contains("open"))}),Se(),Object.entries(xe).forEach(([n,a])=>{const o=document.getElementById(n);o&&(o.onclick=()=>ke(a))})};const Tt=document.createElement("div");Tt.id="scanBar";document.body.appendChild(Tt);let ne=0;rt("melo:scan-progress",t=>{if(!t)return;const e=t.total?Math.round(t.done/t.total*100):100;Tt.style.opacity="1",Tt.style.width=e+"%",clearTimeout(ne),(t.finished||t.total&&t.done>=t.total)&&(ne=setTimeout(()=>{Tt.style.opacity="0",Tt.style.width="0"},800))});Mt&&!pt&&rt("melo:scan-batch",t=>{const e=window.LumiLibrary;e&&Array.isArray(t)&&t.length&&(t.forEach(n=>n.source="scan"),e.addTracks(t,!0),e.addToCurrentPlaylist(t))});const St=document.createElement("div");St.id="aboutPop";St.style.display="none";document.body.appendChild(St);var ve;(ve=document.getElementById("btnAbout"))==null||ve.addEventListener("click",t=>{var e;t.stopPropagation(),St.innerHTML=`
    <div class="about-head">Melo <b>0.2 Beta</b></div>
    <div style="font-size:11.5px; color:var(--text-soft); margin:6px 0 10px;">
      Modern Windows Music Player<br/>
      Tauri 2 + TypeScript + Rust
    </div>
    <a class="about-link" id="aboutLink" href="https://github.com/Arvanta/Melo" rel="noopener">github.com/Arvanta/Melo ↗</a>`,St.style.display=St.style.display==="none"?"block":"none",(e=document.getElementById("aboutLink"))==null||e.addEventListener("click",n=>{n.preventDefault();const a="https://github.com/Arvanta/Melo";Mt?Y(()=>import("./core-DhEqZVGG.js"),[]).then(o=>o.invoke("open_url",{url:a})).catch(()=>window.open(a,"_blank")):window.open(a,"_blank")})});document.addEventListener("click",t=>{!t.target.closest("#aboutPop")&&!t.target.closest("#btnAbout")&&(St.style.display="none")});Mt&&pt?pt==="library"||pt==="playlist"?Kt(kt,Q):pt==="equalizer"?ee(kt,Q,{remote:!0}):pt==="settings"&&ie(Q):(Te(kt,Q),Kt(kt,Q),ee(kt,Q),Ce(kt),ze(Q),ie(Q));Q("Melo 0.2 Beta is ready");
