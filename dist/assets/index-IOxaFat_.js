const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/event-CNdo2oXa.js","assets/core-DhEqZVGG.js","assets/index-DiyoAAdc.js","assets/index-CHth0gh2.js","assets/index-Bq0iOnRE.js","assets/index-CS3Qnt9j.js","assets/webviewWindow-mjQkSB26.js","assets/dpi-fvP-W2qr.js","assets/window-BWd3Cypy.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function i(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=i(n);fetch(n.href,r)}})();const Ye="modulepreload",Je=function(t){return"/"+t},he={},Z=function(e,i,a){let n=Promise.resolve();if(i&&i.length>0){let s=function(l){return Promise.all(l.map(g=>Promise.resolve(g).then(y=>({status:"fulfilled",value:y}),y=>({status:"rejected",reason:y}))))};document.getElementsByTagName("link");const m=document.querySelector("meta[property=csp-nonce]"),d=(m==null?void 0:m.nonce)||(m==null?void 0:m.getAttribute("nonce"));n=s(i.map(l=>{if(l=Je(l),l in he)return;he[l]=!0;const g=l.endsWith(".css"),y=g?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${y}`))return;const k=document.createElement("link");if(k.rel=g?"stylesheet":Ye,g||(k.as="script"),k.crossOrigin="",k.href=l,d&&k.setAttribute("nonce",d),document.head.appendChild(k),g)return new Promise((A,L)=>{k.addEventListener("load",A),k.addEventListener("error",()=>L(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(s){const m=new Event("vite:preloadError",{cancelable:!0});if(m.payload=s,window.dispatchEvent(m),!m.defaultPrevented)throw s}return n.then(s=>{for(const m of s||[])m.status==="rejected"&&r(m.reason);return e().catch(r)})},ut=typeof window.__TAURI_INTERNALS__<"u"||typeof window.__TAURI__<"u";async function j(t,e){if(ut)try{const{emit:i}=await Z(async()=>{const{emit:a}=await import("./event-CNdo2oXa.js");return{emit:a}},__vite__mapDeps([0,1]));await i(t,e);return}catch{}window.dispatchEvent(new CustomEvent(t,{detail:e}))}function ot(t,e){ut&&Z(async()=>{const{listen:i}=await import("./event-CNdo2oXa.js");return{listen:i}},__vite__mapDeps([0,1])).then(({listen:i})=>{i(t,a=>{e(a.payload)})}).catch(()=>{}),window.addEventListener(t,i=>e(i.detail))}let ve=!1;async function Xe(){if(!ve){ve=!0;try{const t=globalThis;if(typeof t.Buffer>"u"){const e=await Z(()=>import("./index-DiyoAAdc.js").then(i=>i.i),__vite__mapDeps([2,3]));t.Buffer=e.Buffer}typeof t.process>"u"&&(t.process={env:{},browser:!0,nextTick:e=>setTimeout(e,0)})}catch{}}}async function Ze(t,e){var i;try{await Xe();const a=await Z(()=>import("./index-Bq0iOnRE.js").then(l=>l.i),__vite__mapDeps([4,3])),n=a&&typeof a.parseBlob=="function"?a:a.default||a,r=await Promise.race([n.parseBlob(t),new Promise((l,g)=>setTimeout(()=>g(new Error("timeout")),1800))]),s=r==null?void 0:r.common;if(!s)return;s.title&&(e.title=s.title),s.artist?e.artist=s.artist:s.artists&&s.artists[0]&&(e.artist=s.artists[0]),s.album&&(e.album=s.album),s.genre&&s.genre[0]&&(e.genre=s.genre[0]),s.year&&(e.year=s.year);const m=(i=s.picture)==null?void 0:i[0];if(m&&m.data){const l=m.format||"image/jpeg",g=m.data;if(g.length>6e5)return;let y="";const k=8192;for(let A=0;A<g.length;A+=k){const L=g.subarray(A,A+k);y+=String.fromCharCode.apply(null,L)}e.cover=`data:${l};base64,${btoa(y)}`}const d=r==null?void 0:r.format;d&&d.duration&&!e.duration&&(e.duration=Math.floor(d.duration))}catch{}}async function Yt(t,e,i=1800){return await Ze(t,e),e}async function Qe(t){return new Promise(e=>{if(!t)return e(null);const i=new Image;i.crossOrigin="anonymous",i.onload=()=>{try{const a=document.createElement("canvas"),n=a.getContext("2d");if(!n)return e(null);a.width=40,a.height=40,n.drawImage(i,0,0,40,40);const r=n.getImageData(0,0,40,40).data;let s={r:42,g:123,b:214},m=-1;for(let d=0;d<r.length;d+=4){const l=r[d],g=r[d+1],y=r[d+2];if(r[d+3]<128)continue;const A=Math.max(l,g,y),L=Math.min(l,g,y),b=(A+L)/510,H=A-L,$=H===0?0:H/(1-Math.abs(2*b-1));if($>.25&&b>.25&&b<.82){const Q=$*1.5+(1-Math.abs(b-.5));Q>m&&(m=Q,s={r:l,g,b:y})}}m>0?e(s):e(null)}catch{e(null)}},i.onerror=()=>e(null),i.src=t})}async function Ce(t){const e=localStorage.getItem("melo-dynamic-theme")!=="0",i=document.documentElement;if(!e||!t){i.style.removeProperty("--accent"),i.style.removeProperty("--visualizer"),i.style.removeProperty("--accent-glow");return}const a=await Qe(t);if(a){const n=`rgb(${a.r}, ${a.g}, ${a.b})`;i.style.setProperty("--accent",n),i.style.setProperty("--visualizer",n),i.style.setProperty("--accent-glow",`rgba(${a.r}, ${a.g}, ${a.b}, 0.35)`)}else i.style.removeProperty("--accent"),i.style.removeProperty("--visualizer"),i.style.removeProperty("--accent-glow")}const jt=[31,62,125,250,500,1e3,2e3,4e3,8e3,16e3];let Lt=null,ne=null,oe=[],Ft=null,Ht=null;function Kt(t){if(!Lt){const e=window.AudioContext||window.webkitAudioContext;Lt=new e;try{ne=Lt.createMediaElementSource(t)}catch{}if(oe=jt.map(i=>{const a=Lt.createBiquadFilter();return a.type="peaking",a.frequency.value=i,a.Q.value=1.4,a.gain.value=0,a}),Ft=Lt.createGain(),Ft.gain.value=1,Ht=Lt.createAnalyser(),Ht.fftSize=2048,Ht.smoothingTimeConstant=.72,ne){let i=ne;for(const a of oe)i.connect(a),i=a;i.connect(Ft),Ft.connect(Ht),Ht.connect(Lt.destination)}}return{ctx:Lt,filters:oe,gain:Ft,analyser:Ht,async resume(){Lt&&Lt.state==="suspended"&&await Lt.resume().catch(()=>{})}}}function Ke(t,e){let i,a,n,r,s,m,d,l=null,g,y,k,A,L,b,H,$,Q,lt,it,Y,u=[],I=0,z=!1,J="off",ct=!1;function _t(){if(!u.length)return null;if(J==="one")return I;let c=I+1;if(z&&(c=Math.floor(Math.random()*u.length),c===I&&u.length>1&&(c=(c+1)%u.length)),c>=u.length)if(J==="all")c=0;else return null;return c}window.__LUMI_QUEUE__=u,window.__LUMI_SET_QUEUE__=c=>{u=c,window.__LUMI_QUEUE__=c};function rt(c){if(!isFinite(c))return"0:00";const E=Math.floor(c/60),V=Math.floor(c%60).toString().padStart(2,"0");return`${E}:${V}`}function K(){if(!g)return;const c=parseFloat(g.max)||100,E=parseFloat(g.value)||0,V=c>0?E/c*100:0;g.style.setProperty("--progress",V+"%")}function st(){y&&y.style.setProperty("--vol",y.value+"%")}async function Tt(c){if(!c)return"";if(/^(https?|data|blob):/.test(c))return c;if(ut)try{const{convertFileSrc:E}=await Z(async()=>{const{convertFileSrc:V}=await import("./core-DhEqZVGG.js");return{convertFileSrc:V}},[]);return E(c)}catch{}return c}async function ft(c,E=!0,V){if(!u.length)return;c<0&&(c=u.length-1),c>=u.length&&(c=0),I=c;const T=u[c];if(T){if(b||G(),t.src=await Tt(T.path),t.load(),V&&V>0){const at=()=>{t.removeEventListener("loadedmetadata",at);try{t.currentTime=V}catch{}};t.addEventListener("loadedmetadata",at)}b&&(b.textContent=T.title||"Unknown Title"),H&&(H.textContent=T.artist||"Unknown Artist"),$&&($.textContent=T.album||""),Q&&(Q.textContent=T.codec||"AUDIO"),lt&&(lt.textContent=T.specs||""),T.cover&&it?(it.src=T.cover,it.style.display="block",Y&&(Y.style.display="none")):(it&&(it.style.display="none"),Y&&(Y.style.display="grid")),g&&(g.max=String(T.duration||240),g.value="0",K()),A&&(A.textContent=rt(T.duration)),k&&(k.textContent="0:00"),tt(),Ce(T.cover||null),document.querySelectorAll(".track-row").forEach((at,dt)=>{var F;at.classList.toggle("active",((F=u[dt])==null?void 0:F.id)===T.id)}),"mediaSession"in navigator&&(navigator.mediaSession.metadata=new MediaMetadata({title:T.title,artist:T.artist,album:T.album,artwork:T.cover?[{src:T.cover,sizes:"512x512",type:"image/jpeg"}]:[]}),navigator.mediaSession.setActionHandler("play",()=>Et()),navigator.mediaSession.setActionHandler("pause",()=>zt()),navigator.mediaSession.setActionHandler("previoustrack",()=>C()),navigator.mediaSession.setActionHandler("nexttrack",()=>R()),navigator.mediaSession.setActionHandler("seekto",at=>{at.seekTime&&(t.currentTime=at.seekTime)})),E&&Et();try{const{cover:at,...dt}=T;localStorage.setItem("melo-current-track",JSON.stringify(dt))}catch{}window.dispatchEvent(new CustomEvent("lumi:trackChange",{detail:T})),j("melo:track-changed",T),j("melo:playback-state",{track:T,currentTime:t.currentTime||0,paused:t.paused})}}let wt=!1;async function Pt(){try{await Kt(t).resume()}catch{}wt&&(wt=!1,t.play().then(()=>{a&&(a.style.display="none"),n&&(n.style.display="block")}).catch(()=>{}))}window.addEventListener("pointerdown",Pt),window.addEventListener("keydown",Pt),ot("melo:pref-changed",c=>{c&&c.key==="replayGainGlobal"&&tt()}),ot("melo:request-playback-state",()=>{const c=u[I]||null;j("melo:playback-state",{track:c,currentTime:t.currentTime||0,paused:t.paused})}),ot("melo:seek-playback",c=>{const E=Number(c);Number.isFinite(E)&&E>=0&&(t.currentTime=E)});let kt=null,bt=!1;function $t(c,E,V){kt&&cancelAnimationFrame(kt);const T=t.volume,at=performance.now(),dt=F=>{const Xt=Math.min(1,(F-at)/E);t.volume=T+(c-T)*Xt,Xt<1?kt=requestAnimationFrame(dt):(kt=null,V==null||V())};kt=requestAnimationFrame(dt)}async function Et(){try{await Kt(t).resume()}catch{}const c=localStorage.getItem("melo-pref-fadePause")==="1",E=_();c&&bt&&(t.volume=0),t.play().then(()=>{wt=!1,a&&(a.style.display="none"),n&&(n.style.display="block"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="playing"),c&&bt?(bt=!1,$t(E,300)):t.volume=E}).catch(()=>{wt||(wt=!0,e("Click once inside player to begin audio playback"))})}function zt(){localStorage.getItem("melo-pref-fadePause")==="1"&&!t.paused?(bt=!0,$t(0,300,()=>t.pause())):(bt=!1,t.pause()),a&&(a.style.display="block"),n&&(n.style.display="none"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused");const E=u[I];if(E)try{localStorage.setItem("melo-resume-state",JSON.stringify({trackId:E.id,position:t.currentTime}))}catch{}}function v(){t.paused?Et():zt()}function M(){t.pause();try{t.currentTime=0}catch{}a&&(a.style.display="block"),n&&(n.style.display="none"),g&&(g.value="0",K()),k&&(k.textContent="0:00"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}function R(){if(!u.length)return;if(J==="one"){t.currentTime=0,Et();return}const c=_t();if(c===null){zt();return}ft(c)}function C(){if(!u.length)return;if(t.currentTime>3){t.currentTime=0;return}let c=I-1;z&&(c=Math.floor(Math.random()*u.length)),c<0&&(J==="all"?c=u.length-1:c=0),ft(c)}function _(){var dt;const c=u[I];if(!y)return 1;const E=parseInt(y.value,10)/100,T=localStorage.getItem("melo-pref-replayGainGlobal")!=="0"&&(dt=c==null?void 0:c.replayGain)!=null?dt:0,at=Math.pow(10,T/20);return Math.min(1,Math.max(0,E*at))}function tt(){!u[I]||!y||(t.volume=_())}function G(){if(i=document.getElementById("btnPlay"),a=document.getElementById("iconPlay"),n=document.getElementById("iconPause"),r=document.getElementById("btnPrev"),s=document.getElementById("btnNext"),m=document.getElementById("btnShuffle"),d=document.getElementById("btnRepeat"),l=document.getElementById("btnStop"),g=document.getElementById("seekBar"),y=document.getElementById("volBar"),k=document.getElementById("curTime"),A=document.getElementById("durTime"),L=document.getElementById("volPct"),b=document.getElementById("trackTitle"),H=document.getElementById("trackArtist"),$=document.getElementById("trackAlbum"),Q=document.getElementById("trackCodec"),lt=document.getElementById("trackSpecs"),it=document.getElementById("coverImg"),Y=document.getElementById("coverFallback"),i&&(i.onclick=v),l&&(l.onclick=M),r&&(r.onclick=C),s&&(s.onclick=R),m&&(m.onclick=()=>{z=!z,m.classList.toggle("active",z),e(z?"Shuffle on":"Shuffle off")}),d&&(d.onclick=()=>{J=J==="off"?"all":J==="all"?"one":"off",d.classList.toggle("active",J!=="off");const c={off:"Repeat off",all:"Repeat all",one:"Repeat one"};e(c[J]),d.title=c[J]}),g&&(g.oninput=()=>{ct=!0,k&&(k.textContent=rt(parseFloat(g.value))),K()},g.onchange=()=>{t.currentTime=parseFloat(g.value),ct=!1}),y&&(y.oninput=()=>{st(),L&&(L.textContent=y.value+"%"),tt()}),K(),st(),u[I]){const c=u[I];b&&(b.textContent=c.title||"Unknown Title"),H&&(H.textContent=c.artist||"Unknown Artist"),$&&($.textContent=c.album||""),Q&&(Q.textContent=c.codec||"AUDIO"),lt&&(lt.textContent=c.specs||""),c.cover&&it&&(it.src=c.cover,it.style.display="block",Y&&(Y.style.display="none"))}}G(),t.addEventListener("timeupdate",()=>{j("melo:playback-position",t.currentTime||0),!ct&&g&&k&&(g.value=String(Math.floor(t.currentTime)),k.textContent=rt(t.currentTime),K()),D()});let q=null;function D(){q||(q=setTimeout(()=>{q=null;const c=u[I];if(!(!c||t.paused))try{localStorage.setItem("melo-resume-state",JSON.stringify({trackId:c.id,position:t.currentTime}))}catch{}},4e3))}t.addEventListener("loadedmetadata",()=>{var E;if(!g||!A)return;const c=Math.floor(t.duration||((E=u[I])==null?void 0:E.duration)||240);g.max=String(c),A.textContent=rt(c),K()}),t.addEventListener("ended",()=>{R()}),window.addEventListener("keydown",c=>{c.target.tagName!=="INPUT"&&(c.code==="Space"&&(c.preventDefault(),v()),c.code==="ArrowRight"&&(t.currentTime+=5),c.code==="ArrowLeft"&&(t.currentTime-=5),(c.key==="m"||c.key==="M")&&(t.muted=!t.muted,e(t.muted?"Muted":"Unmuted")),(c.key==="s"||c.key==="S")&&m&&m.click(),(c.key==="r"||c.key==="R")&&d&&d.click(),c.code==="ArrowUp"&&y&&(y.value=String(Math.min(100,parseInt(y.value,10)+5)),y.dispatchEvent(new Event("input"))),c.code==="ArrowDown"&&y&&(y.value=String(Math.max(0,parseInt(y.value,10)-5)),y.dispatchEvent(new Event("input"))))}),ot("melo:tray-action",c=>{c==="play_pause"?v():c==="next"?R():c==="prev"?C():c==="mute"&&(t.muted=!t.muted,e(t.muted?"Muted":"Unmuted"))}),window.LumiPlayer={get queue(){return u},set queue(c){u=c,window.__LUMI_QUEUE__=c},get currentIndex(){return I},loadTrack:ft,play:Et,pause:zt,stop:M,next:R,prev:C,get audio(){return t},rebind:G},window.__LUMI_REBIND__=G,ot("melo:play-tracks",c=>{if(!c||!Array.isArray(c.tracks)||!c.tracks.length)return;u=c.tracks,window.__LUMI_SET_QUEUE__(u);const E=Math.max(0,Math.min(c.index||0,u.length-1));ft(E,!0)})}const At=ut,Rt=new URLSearchParams(location.search).get("panel")||"main";let et=[],yt=[];try{const t=localStorage.getItem("melo-playlists");if(t){const e=JSON.parse(t);Array.isArray(e)&&e.length&&(yt=e)}}catch{}yt.length||(yt=[{id:"p1",name:"Favorites",tracks:[],createdAt:Date.now()}]);try{const t=localStorage.getItem("melo-tracks");if(t){const e=JSON.parse(t);Array.isArray(e)&&(et=e)}}catch{}function ye(t,e){var ue,me,ge,fe;const i=document.getElementById("trackList");document.getElementById("playlistList");const a=document.getElementById("winPlaylistTracks"),n=document.getElementById("winPlaylistEmpty"),r=document.getElementById("playlistSelect"),s=document.getElementById("searchInput"),m=document.getElementById("libraryStats"),d=document.getElementById("btn-scan"),l=document.getElementById("btn-export-playlist"),g=document.getElementById("btn-new-playlist"),y=document.getElementById("queueList"),k=document.getElementById("tagEditor"),A=document.getElementById("tagTitle"),L=document.getElementById("tagArtist"),b=document.getElementById("tagAlbum"),H=document.getElementById("tagYear"),$=document.getElementById("tagCover");let Q="",lt=localStorage.getItem("melo-currentPlaylist")||((ue=yt[0])==null?void 0:ue.id)||"",it="",Y="artists",u=null,I=null,z=null,J=null,ct=[];(me=document.getElementById("libraryTabs"))==null||me.querySelectorAll(".tab").forEach(o=>{o.addEventListener("click",()=>{document.querySelectorAll("#libraryTabs .tab").forEach(p=>p.classList.remove("active")),o.classList.add("active"),Y=o.dataset.libtab,u=I=z=J=null,F()})}),s==null||s.addEventListener("input",()=>{Q=s.value.toLowerCase(),F()}),F(),Dt();async function _t(o){const{invoke:p}=await Z(async()=>{const{invoke:B}=await import("./core-DhEqZVGG.js");return{invoke:B}},[]),{listen:f}=await Z(async()=>{const{listen:B}=await import("./event-CNdo2oXa.js");return{listen:B}},__vite__mapDeps([0,1]));let h=0,x=0,O=0;e("Scanning folder…");const U=await f("melo:scan-batch",B=>{const S=Array.isArray(B.payload)?B.payload:[];S.length&&(S.forEach(W=>W.source="scan"),O+=S.length,Pt(S,!1,!0),kt(S,!0),Zt())}),w=await f("melo:scan-progress",B=>{const S=B.payload||{};x=S.done||0,h=S.total||0,!S.finished&&h&&e(`Scanning… ${x}/${h} files`)});try{const B=await p("scan_library",{path:o});return U(),w(),Zt(),At&&j("melo:tracks-add",{src:Rt,list:B.map(S=>({...S,source:"scan"}))}),e(`${O||B.length} track(s) added from folder`),O||B.length}catch(B){throw U(),w(),Zt(),B}}d==null||d.addEventListener("click",async()=>{if(window.__TAURI__)try{const{open:o}=await Z(async()=>{const{open:f}=await import("./index-CS3Qnt9j.js");return{open:f}},__vite__mapDeps([5,1])),p=await o({directory:!0,multiple:!1});p&&await _t(p)}catch{e("Scanning requires the Tauri build")}else{const o=document.createElement("input");o.type="file",o.multiple=!0,o.accept="audio/*",o.onchange=async()=>{var f;const p=Array.from(o.files||[]);for(const h of p){const x=URL.createObjectURL(h),O=Math.random().toString(36).slice(2),U=((f=h.name.split(".").pop())==null?void 0:f.toUpperCase())||"MP3",w={id:O,title:h.name.replace(/\.[^/.]+$/,""),artist:"Unknown",album:"Imported",genre:"Unknown",year:new Date().getFullYear(),duration:180,path:x,codec:U,specs:"Imported · Stereo",replayGain:0},B=new Audio(x);await new Promise(S=>{B.addEventListener("loadedmetadata",()=>{w.duration=Math.floor(B.duration)||180,S(null)},{once:!0}),B.load(),setTimeout(()=>S(null),1500)}),await Yt(h,w),et.push(w)}e(`${p.length} file(s) added`),F(),Dt()},o.click()}}),document.addEventListener("dragover",o=>{o.preventDefault()}),document.addEventListener("drop",async o=>{var f,h;if(o.preventDefault(),At)return;const p=Array.from(((f=o.dataTransfer)==null?void 0:f.files)||[]).filter(x=>x.type.startsWith("audio/")||/\.(mp3|flac|wav|ogg|aac|m4a|alac)$/i.test(x.name));if(p.length){for(const x of p){const O=URL.createObjectURL(x),U=Math.random().toString(36).slice(2),w=((h=x.name.split(".").pop())==null?void 0:h.toUpperCase())||"MP3",B={id:U,title:x.name.replace(/\.[^/.]+$/,""),artist:"Imported",album:"Drop",genre:"Unknown",year:new Date().getFullYear(),duration:200,path:O,codec:w,specs:"Drag & Drop"};await Yt(x,B);const S=new Audio(O);await new Promise(W=>{S.addEventListener("loadedmetadata",()=>{B.duration=Math.floor(S.duration)||200,W(null)},{once:!0}),S.load(),setTimeout(()=>W(null),800)}),et.push(B)}e(`${p.length} File added via drag & drop`),F()}});function rt(){return yt.find(o=>o.id===lt)||yt[0]}function K(){localStorage.setItem("melo-rev",String(Date.now())),localStorage.setItem("melo-playlists",JSON.stringify(yt))}function st(){At&&j("melo:playlists-sync",{src:Rt,playlists:yt})}function Tt(o){lt=o,localStorage.setItem("melo-currentPlaylist",o),v()}ot("melo:playlists-sync",o=>{o&&o.src!==Rt&&Array.isArray(o.playlists)&&(yt=o.playlists,v(),F())});function ft(){localStorage.setItem("melo-rev",String(Date.now()));try{localStorage.setItem("melo-tracks",JSON.stringify(et))}catch{try{localStorage.setItem("melo-tracks",JSON.stringify(et.map(({cover:o,...p})=>p)))}catch{}}}let wt=new Set(et.map(o=>o.id));function Pt(o,p=!1,f=!1){let h=!1;for(const x of o)wt.has(x.id)||(et.push(x),wt.add(x.id),h=!0);h&&!f&&(ft(),F(),v()),p&&At&&j("melo:tracks-add",{src:Rt,list:o})}ot("melo:tracks-add",o=>{o&&o.src!==Rt&&Array.isArray(o.list)&&Pt(o.list)});function kt(o,p=!1){const f=rt();if(!f)return;let h=!1;const x=new Set(f.tracks);o.forEach(O=>{x.has(O.id)||(f.tracks.push(O.id),x.add(O.id),h=!0)}),h&&!p?(K(),st(),v(),F()):h&&K()}async function bt(o){if(!At)return[];const{invoke:p}=await Z(async()=>{const{invoke:h}=await import("./core-DhEqZVGG.js");return{invoke:h}},[]),f=[];for(const h of o)try{const x=await p("scan_library",{path:h});x&&f.push(...x)}catch{}return f}At&&Z(async()=>{const{getCurrentWebviewWindow:o}=await import("./webviewWindow-mjQkSB26.js");return{getCurrentWebviewWindow:o}},__vite__mapDeps([6,7,1,0,8])).then(({getCurrentWebviewWindow:o})=>{o().onDragDropEvent(async f=>{var h;if(f.payload.type==="drop"){const x=f.payload.paths||[];if(!x.length)return;const O=await bt(x);if(!O.length)return;O.forEach(U=>U.source="import"),Pt(O,!0),kt(O),j("melo:play-tracks",{tracks:O,index:0}),e(`Playing ${((h=O[0])==null?void 0:h.title)||"track"}`)}})}).catch(()=>{});function $t(o){return`${Math.floor(o/60)}:${String(Math.floor(o%60)).padStart(2,"0")}`}function Et(o){return o.type.startsWith("audio/")||/\.(mp3|flac|wav|ogg|aac|m4a|alac|opus)$/i.test(o.name)}async function zt(o){var w;const p=o.path;if(p&&At){const B=await bt([p]);if(B.length)return B[0].source="import",B[0]}const f=p||URL.createObjectURL(o),h=p||Math.random().toString(36).slice(2),x=((w=o.name.split(".").pop())==null?void 0:w.toUpperCase())||"MP3",O=o.name.replace(/\.[^/.]+$/,""),U={id:h,title:O,artist:"Unknown Artist",album:"Single",genre:"Unknown",year:new Date().getFullYear(),duration:180,path:f,codec:x,specs:"Local File",replayGain:0,source:"import"};try{const B=new Audio(URL.createObjectURL(o));await new Promise(S=>{B.addEventListener("loadedmetadata",()=>{U.duration=Math.floor(B.duration)||180,S(null)},{once:!0}),B.load(),setTimeout(()=>S(null),800)})}catch{}return await Yt(o,U),U}function v(){var w,B,S,W;if(!a)return;try{const N=localStorage.getItem("melo-tracks");if(N){const P=JSON.parse(N);Array.isArray(P)&&P.length>et.length&&(et=P)}}catch{}const o=rt();if(r&&(r.innerHTML=yt.map(N=>`<option value="${N.id}" ${o&&N.id===o.id?"selected":""}>${N.name}</option>`).join("")),!o){a.innerHTML="",a.style.display="none",n&&(n.style.display="block");return}const p=o.tracks.map((N,P)=>{const X=et.find(St=>St.id===N||St.path===N);if(X)return X;const nt=N.replace(/^.*[\\/]/,""),vt=nt.lastIndexOf("."),mt=vt>0?nt.slice(0,vt):nt;return{id:N,title:mt||`Track ${P+1}`,artist:"Audio Track",album:o.name,duration:0,path:N,codec:"AUDIO",specs:"Local File",source:"import"}});let f=p;if(it.trim()){const N=it.toLowerCase().trim();f=p.filter(P=>(P.title||"").toLowerCase().includes(N)||(P.artist||"").toLowerCase().includes(N)||(P.album||"").toLowerCase().includes(N))}if(n&&(n.style.display=p.length?"none":"block"),a.style.display=p.length?"flex":"none",!f.length&&p.length){a.innerHTML=`<div style="padding:16px;text-align:center;color:var(--text-muted);font-size:11px;">No tracks match "${it}"</div>`;return}const h=window.LumiPlayer,x=h&&h.queue&&h.queue.length&&(B=(w=h.queue[h.currentIndex])==null?void 0:w.id)!=null?B:null,O=!!x&&!((W=(S=h==null?void 0:h.audio)==null?void 0:S.paused)==null||W);a.innerHTML=f.map((N,P)=>{const X=o.tracks.indexOf(N.id),nt=x===N.id;return`
      <div class="track-row ${nt?"active":""}" draggable="true" data-id="${N.id}" data-pl-idx="${X>=0?X:P}">
        <span class="num">${nt?O?"▶":"❚❚":P+1}</span>
        ${N.cover?`<img class="track-cover-mini" src="${N.cover}" onerror="this.style.display='none'"/>`:'<div class="track-cover-mini cover-default">♪</div>'}
        <div style="flex:1;min-width:0;">
          <div class="t-title">${N.title}</div>
          <div class="t-artist">${N.artist} • ${N.album}</div>
        </div>
        <span class="t-dur">${$t(N.duration)}</span>
        <button class="btn small ghost" data-action="pl-remove" data-idx="${X>=0?X:P}" title="Remove from playlist">×</button>
      </div>
    `}).join("");let U=null;a.querySelectorAll(".track-row").forEach(N=>{const P=N;P.addEventListener("dragstart",X=>{U=parseInt(P.dataset.plIdx),X.dataTransfer.setData("application/x-melo-ids",P.dataset.id),X.dataTransfer.setData("application/x-melo-pl-idx",String(U)),X.dataTransfer.effectAllowed="move",P.style.opacity="0.4"}),P.addEventListener("dragend",()=>{P.style.opacity="1",U=null,a==null||a.querySelectorAll(".track-row").forEach(X=>X.classList.remove("drag-over-target"))}),P.addEventListener("dragover",X=>{X.preventDefault(),X.stopPropagation(),P.classList.add("drag-over-target")}),P.addEventListener("dragleave",()=>{P.classList.remove("drag-over-target")}),P.addEventListener("drop",X=>{var mt;X.preventDefault(),X.stopPropagation(),P.classList.remove("drag-over-target");const nt=parseInt(P.dataset.plIdx),vt=(mt=X.dataTransfer)==null?void 0:mt.getData("application/x-melo-pl-idx");if(vt!==void 0&&vt!==""&&!isNaN(parseInt(vt))){const St=parseInt(vt);if(St!==nt&&St>=0&&nt>=0&&St<o.tracks.length&&nt<o.tracks.length){const Ge=o.tracks.splice(St,1)[0];o.tracks.splice(nt,0,Ge),K(),st(),v(),F(),e("Track reordered in playlist");return}}}),P.addEventListener("click",X=>{const nt=X.target;if(nt.closest("[data-action='pl-remove']")){const St=parseInt(nt.closest("[data-action='pl-remove']").dataset.idx);o.tracks.splice(St,1),K(),st(),v(),F();return}const vt=P.dataset.id,mt=f.findIndex(St=>St.id===vt);j("melo:play-tracks",{tracks:f,index:mt>=0?mt:0})})})}const M=document.getElementById("playlistSearchInput");M&&M.addEventListener("input",()=>{it=M.value,v()});const R=document.getElementById("playlistSortSelect");if(R&&R.addEventListener("change",()=>{const o=rt();if(!o||!o.tracks.length)return;const p=R.value,f=o.tracks.map(h=>et.find(x=>x.id===h)).filter(Boolean);p==="title-asc"?f.sort((h,x)=>h.title.localeCompare(x.title)):p==="artist-asc"?f.sort((h,x)=>h.artist.localeCompare(x.artist)):p==="album-asc"?f.sort((h,x)=>h.album.localeCompare(x.album)):p==="dur-asc"?f.sort((h,x)=>h.duration-x.duration):p==="dur-desc"&&f.sort((h,x)=>x.duration-h.duration),o.tracks=f.map(h=>h.id),K(),st(),v(),e(`Playlist sorted by ${R.options[R.selectedIndex].text}`)}),r==null||r.addEventListener("change",()=>Tt(r.value)),l==null||l.addEventListener("click",()=>{const o=rt();if(!o)return e("No playlist available");const p=o.tracks.map(U=>et.find(w=>w.id===U)).filter(Boolean);if(!p.length)return e("Current list is empty");let f=`#EXTM3U
`;p.forEach(U=>{f+=`#EXTINF:${Math.floor(U.duration)},${U.artist} - ${U.title}
${U.path}
`});const h=new Blob([f],{type:"audio/x-mpegurl"}),x=URL.createObjectURL(h),O=document.createElement("a");O.href=x,O.download=`${o.name}.m3u`,O.click(),URL.revokeObjectURL(x),e(`M3U exported for "${o.name}"`)}),g==null||g.addEventListener("click",()=>{const o=prompt("New playlist name:");if(!o)return;const p=Math.random().toString(36).slice(2,8);yt.push({id:p,name:o,tracks:[],createdAt:Date.now()}),Tt(p),K(),st(),F(),e(`Playlist "${o}" created`)}),a){const o=a.parentElement;["dragover","dragenter"].forEach(p=>o.addEventListener(p,f=>{f.preventDefault(),f.stopPropagation(),a.classList.add("drag-over")})),o.addEventListener("dragleave",p=>{o.contains(p.relatedTarget)||a.classList.remove("drag-over")}),o.addEventListener("drop",async p=>{var O,U;p.preventDefault(),p.stopPropagation(),a.classList.remove("drag-over");const f=rt();if(!f)return e("Create a playlist first (+ New)");const h=(((O=p.dataTransfer)==null?void 0:O.getData("application/x-melo-ids"))||"").split(",").filter(Boolean);let x=0;if(h.length)h.forEach(w=>{f.tracks.includes(w)||(f.tracks.push(w),x++)});else if(!At){const w=Array.from(((U=p.dataTransfer)==null?void 0:U.files)||[]).filter(Et);for(const B of w){const S=await zt(B);et.push(S),f.tracks.includes(S.id)||(f.tracks.push(S.id),x++)}}x&&e(`${x} track(s) added to "${f.name}"`),ft(),K(),st(),F(),v()})}const C=document.getElementById("playerCard");C&&(["dragover","dragenter"].forEach(o=>C.addEventListener(o,p=>{p.preventDefault(),p.stopPropagation(),C.classList.add("drag-over")})),C.addEventListener("dragleave",o=>{C.contains(o.relatedTarget)||C.classList.remove("drag-over")}),C.addEventListener("drop",async o=>{var x,O;o.preventDefault(),o.stopPropagation(),C.classList.remove("drag-over");const p=window.LumiPlayer,f=(((x=o.dataTransfer)==null?void 0:x.getData("application/x-melo-ids"))||"").split(",").filter(Boolean);let h=[];if(f.length)h=f.map(U=>et.find(w=>w.id===U)).filter(Boolean),p&&h.length&&e(`Playback ${h.length} track(s)`);else if(!At){const U=Array.from(((O=o.dataTransfer)==null?void 0:O.files)||[]).filter(Et),w=rt();let B=!1;for(const S of U){const W=await zt(S);et.push(W),h.push(W),w&&!w.tracks.includes(W.id)&&(w.tracks.push(W.id),B=!0)}U.length&&(ft(),K(),st(),F(),v()),p&&h.length&&e(B&&w?`Playback ${h.length} track(s) + added to "${w.name}"`:`Playback ${h.length} track(s)`)}h.length&&j("melo:play-tracks",{tracks:h,index:0})}));let _=null;function tt(o){if(_=o,!_)return e("No track to edit");k.style.display="flex",A.value=_.title,L.value=_.artist,b.value=_.album,H.value=String(_.year)}function G(o){const p=et.filter(o).map(f=>f.id);p.length&&(et=et.filter(f=>!o(f)),p.forEach(f=>wt.delete(f)),yt.forEach(f=>{f.tracks=f.tracks.filter(h=>!p.includes(h))}),ft(),K(),st(),At&&j("melo:tracks-remove",{src:Rt,ids:p}),F(),v())}ot("melo:tracks-remove",o=>{if(o&&o.src!==Rt&&Array.isArray(o.ids)){const p=o.ids;et=et.filter(f=>!p.includes(f.id)),p.forEach(f=>wt.delete(f)),yt.forEach(f=>{f.tracks=f.tracks.filter(h=>!p.includes(h))}),F(),v()}});const q=document.createElement("div");q.className="ctx-menu",q.style.display="none",document.body.appendChild(q);let D=null;function c(){q.style.display="none"}document.addEventListener("click",c),document.addEventListener("keydown",o=>{o.key==="Escape"&&c()}),q.addEventListener("click",o=>{const p=o.target.closest("[data-act]");if(!p||!D)return;o.stopPropagation();const f=p.dataset.act;f==="edit"&&tt(D.track),f==="remove"&&(D.type==="track"?G(h=>h.id===D.track.id):D.type==="artist"?G(h=>h.artist===D.name):D.type==="album"?G(h=>h.artist===D.artist&&h.album===D.album):D.type==="genre"&&G(h=>h.genre===D.name)),c()});const E=document.createElement("div");E.className="ctx-menu",E.style.display="none",document.body.appendChild(E);let V=-1;document.addEventListener("click",()=>{E.style.display="none"}),E.addEventListener("click",o=>{if(!o.target.closest("[data-act='plremove']"))return;o.stopPropagation();const p=rt();p&&V>=0&&V<p.tracks.length&&(p.tracks.splice(V,1),K(),st(),v(),F()),E.style.display="none"}),document.addEventListener("contextmenu",o=>{c(),E.style.display="none";const p=o.target,f=p.closest("#winPlaylistTracks .track-row");if(f){o.preventDefault(),V=parseInt(f.dataset.plIdx||"-1"),E.innerHTML='<button class="ctx-item danger" data-act="plremove">Remove from Playlist</button>',E.style.display="block";const U=E.getBoundingClientRect();E.style.left=Math.max(4,Math.min(o.clientX,window.innerWidth-U.width-6))+"px",E.style.top=Math.max(4,Math.min(o.clientY,window.innerHeight-U.height-6))+"px";return}if(!(Rt==="library"?!0:!!p.closest("#win-library"))){o.preventDefault();return}o.preventDefault();const x=p.closest(".track-row, [data-artist], [data-albumkey], [data-genre]");if(!x){c();return}if(x.classList.contains("track-row")){const U=ct[parseInt(x.dataset.viewIdx)];if(!U){c();return}D={type:"track",track:U},q.innerHTML='<button class="ctx-item" data-act="edit">Edit tags</button><button class="ctx-item danger" data-act="remove">Remove track from library</button>'}else if(x.dataset.artist)D={type:"artist",name:x.dataset.artist},q.innerHTML='<button class="ctx-item danger" data-act="remove">Remove artist from library</button>';else if(x.dataset.albumkey){const[U,w]=(x.dataset.albumkey||"").split("\0");D={type:"album",artist:U,album:w},q.innerHTML='<button class="ctx-item danger" data-act="remove">Remove album from library</button>'}else D={type:"genre",name:x.dataset.genre},q.innerHTML='<button class="ctx-item danger" data-act="remove">Remove genre from library</button>';q.style.display="block";const O=q.getBoundingClientRect();q.style.left=Math.max(4,Math.min(o.clientX,window.innerWidth-O.width-6))+"px",q.style.top=Math.max(4,Math.min(o.clientY,window.innerHeight-O.height-6))+"px"}),(ge=document.getElementById("btn-tag-cancel"))==null||ge.addEventListener("click",()=>k.style.display="none"),(fe=document.getElementById("btn-tag-save"))==null||fe.addEventListener("click",async()=>{if(_){if(_.title=A.value,_.artist=L.value,_.album=b.value,_.year=parseInt(H.value)||_.year,$.files&&$.files[0]){const o=$.files[0],p=URL.createObjectURL(o),f=new FileReader;f.onload=()=>{_.cover=f.result,F(),Dt(),j("melo:tag-updated",_)},f.readAsDataURL(o),_.cover=p}if(window.__TAURI__)try{const{invoke:o}=await Z(async()=>{const{invoke:p}=await import("./core-DhEqZVGG.js");return{invoke:p}},[]);await o("write_tags",{path:_.path,tags:{title:_.title,artist:_.artist,album:_.album}})}catch{}k.style.display="none",ft(),F(),Dt(),j("melo:tag-updated",_),e("Metadata saved")}});function T(o){return String(o!=null?o:"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function at(){return et.filter(o=>o.source==="scan")}function dt(o){return ct=o,o.length?o.map((p,f)=>{const h=`${Math.floor(p.duration/60)}:${String(Math.floor(p.duration%60)).padStart(2,"0")}`;return`
      <div class="track-row" draggable="true" data-view-idx="${f}" data-id="${T(p.id)}">
        <span class="num">${f+1}</span>
        <img class="track-cover-mini" src="${p.cover||""}" style="${p.cover?"":"display:none"}" onerror="this.style.display='none'"/>
        <div style="flex:1;min-width:0;">
          <div class="t-title">${T(p.title)}</div>
          <div class="t-artist">${T(p.artist)} • ${T(p.album)}${p.year?" • "+p.year:""}</div>
        </div>
        <span style="font-size:10px;padding:3px 6px;border-radius:6px;background:var(--badge-bg);color:var(--badge-text);border:1px solid var(--card-border);">${T(p.codec)}</span>
        <span class="t-dur">${h}</span>
        <button class="btn small ghost" data-action="add-queue" data-view-idx="${f}">+</button>
      </div>`}).join(""):'<div style="padding:30px;text-align:center;color:var(--text-muted);">Nothing here yet.<br/><span style="font-size:12px;">Use "Scan Folder" to build your library</span></div>'}function F(){var O,U;if(!i){v();return}const o=at(),p=new Set(o.map(w=>w.artist)).size,f=new Set(o.map(w=>w.artist+"\0"+w.album)).size;m&&(m.textContent=`${o.length} tracks • ${p} artists • ${f} albums`);const h=Q.trim().toLowerCase();let x="";if(Y==="artists")if(u){const w=o.filter(P=>P.artist===u),B=[...new Set(w.map(P=>P.album))].sort((P,X)=>P.localeCompare(X)),S=I?w.filter(P=>P.album===I):w,W=(O=w.find(P=>P.cover))==null?void 0:O.cover;x=`<div class="lib-crumb"><button class="btn small" data-back="artists">‹ Artists</button>${W?`<div class="lib-avatar" style="background-image:url('${T(W)}')"></div>`:`<div class="lib-avatar">${T((u[0]||"?").toUpperCase())}</div>`}<b>${T(u)}</b></div>
          <div class="chip-row"><button class="chip ${I?"":"active"}" data-album="">All albums</button>`+B.map(P=>{var vt;const X=(vt=w.find(mt=>mt.album===P&&mt.cover))==null?void 0:vt.cover,nt=X?`<span class="chip-thumb" style="background-image:url('${T(X)}')"></span>`:"";return`<button class="chip ${I===P?"active":""}" data-album="${T(P)}">${nt}${T(P)}</button>`}).join("")+"</div>"+dt(h?S.filter(P=>(P.title+P.album).toLowerCase().includes(h)):S)}else{ct=[];const w=[...new Set(o.map(S=>S.artist))].sort((S,W)=>S.localeCompare(W));x=(h?w.filter(S=>S.toLowerCase().includes(h)):w).map(S=>{var X;const W=o.filter(nt=>nt.artist===S).length,N=(X=o.find(nt=>nt.artist===S&&nt.cover))==null?void 0:X.cover,P=N?`<div class="lib-avatar" style="background-image:url('${T(N)}')"></div>`:`<div class="lib-avatar">${T((S[0]||"?").toUpperCase())}</div>`;return`<div class="lib-item" data-artist="${T(S)}">${P}<div style="flex:1;min-width:0;"><div class="t-title">${T(S)}</div><div class="t-artist">${W} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No artists found.</div>'}else if(Y==="albums")if(z){const[w,B]=z.split("\0"),S=o.filter(P=>P.artist===w&&P.album===B),W=(U=S.find(P=>P.cover))==null?void 0:U.cover;x=`<div class="lib-crumb"><button class="btn small" data-back="albums">‹ Albums</button>${W?`<div class="lib-avatar lib-avatar-album" style="background-image:url('${T(W)}')"></div>`:'<div class="lib-avatar lib-avatar-album">💿</div>'}<b>${T(B)}</b><span class="t-artist" style="margin-left:8px;">${T(w)}</span></div>`+dt(h?S.filter(P=>P.title.toLowerCase().includes(h)):S)}else{ct=[];const w=[...new Set(o.map(S=>S.artist+"\0"+S.album))].sort((S,W)=>S.localeCompare(W));x=(h?w.filter(S=>S.toLowerCase().includes(h)):w).map(S=>{var vt;const[W,N]=S.split("\0"),P=o.filter(mt=>mt.artist===W&&mt.album===N).length,X=(vt=o.find(mt=>mt.artist===W&&mt.album===N&&mt.cover))==null?void 0:vt.cover,nt=X?`<div class="lib-avatar lib-avatar-album" style="background-image:url('${T(X)}')"></div>`:'<div class="lib-avatar lib-avatar-album">💿</div>';return`<div class="lib-item" data-albumkey="${T(S)}">${nt}<div style="flex:1;min-width:0;"><div class="t-title">${T(N)}</div><div class="t-artist">${T(W)} • ${P} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No albums found.</div>'}else if(J){const w=o.filter(B=>B.genre===J);x=`<div class="lib-crumb"><button class="btn small" data-back="genres">‹ Genres</button><b>${T(J)}</b></div>`+dt(h?w.filter(B=>(B.title+B.artist).toLowerCase().includes(h)):w)}else{ct=[];const w=[...new Set(o.map(S=>S.genre))].sort((S,W)=>S.localeCompare(W));x=(h?w.filter(S=>S.toLowerCase().includes(h)):w).map(S=>{const W=o.filter(N=>N.genre===S).length;return`<div class="lib-item" data-genre="${T(S)}"><div class="lib-avatar">🎼</div><div style="flex:1;min-width:0;"><div class="t-title">${T(S)}</div><div class="t-artist">${W} track(s)</div></div><span class="chev-r">›</span></div>`}).join("")||'<div style="padding:30px;text-align:center;color:var(--text-muted);">No genres found.</div>'}i.innerHTML=x,i.querySelectorAll("[data-artist]").forEach(w=>w.addEventListener("click",()=>{u=w.dataset.artist,I=null,F()})),i.querySelectorAll("[data-albumkey]").forEach(w=>w.addEventListener("click",()=>{z=w.dataset.albumkey,F()})),i.querySelectorAll("[data-genre]").forEach(w=>w.addEventListener("click",()=>{J=w.dataset.genre,F()})),i.querySelectorAll("[data-back]").forEach(w=>w.addEventListener("click",()=>{const B=w.dataset.back;B==="artists"?(u=null,I=null):B==="albums"?z=null:J=null,F()})),i.querySelectorAll(".chip[data-album]").forEach(w=>w.addEventListener("click",()=>{I=w.dataset.album||null,F()})),i.querySelectorAll(".track-row").forEach(w=>{w.addEventListener("dragstart",B=>{B.dataTransfer.setData("application/x-melo-ids",w.dataset.id),B.dataTransfer.effectAllowed="copy"}),w.addEventListener("click",B=>{const S=B.target,W=parseInt(w.dataset.viewIdx);if(S.closest("[data-action='add-queue']")){Xt(ct[W]);return}j("melo:play-tracks",{tracks:ct,index:W})})}),v()}function Xt(o){j("melo:add-queue",o),e(`Queued: ${o.title}`)}function Dt(){if(!y)return;const o=window.LumiPlayer,p=(o==null?void 0:o.queue)||et.slice(0,4);if(!p.length){y.innerHTML='<div style="text-align:center;color:var(--text-muted);font-size:12px;padding:12px;">Queue is empty</div>';return}y.innerHTML=p.map((f,h)=>{var x;return`
      <div class="track-row" data-id="${f.id}" data-queue-idx="${h}" style="padding:6px 8px;border-radius:8px;border:1px solid ${h===((x=o==null?void 0:o.currentIndex)!=null?x:0)?"var(--accent)":"transparent"};">
        <img class="track-cover-mini" src="${f.cover||""}" style="width:24px;height:24px;${f.cover?"":"display:none"}" />
        <div style="flex:1;min-width:0;">
          <div class="t-title" style="font-size:12px;">${f.title}</div>
          <div class="t-artist" style="font-size:11px;">${f.artist}</div>
        </div>
        <button class="btn small ghost" data-remove="${h}" style="padding:2px 6px;">×</button>
      </div>
    `}).join(""),y.querySelectorAll("[data-remove]").forEach(f=>{f.addEventListener("click",()=>{const h=parseInt(f.dataset.remove);p.splice(h,1),Dt()})}),y.querySelectorAll(".track-row").forEach(f=>{f.addEventListener("click",h=>{if(h.target.closest("[data-remove]"))return;const x=parseInt(f.dataset.queueIdx),O=window.LumiPlayer;O&&O.loadTrack(x)})})}ot("melo:track-changed",o=>{Dt();const p=document.getElementById("lyricsBox");p&&o&&(p.textContent=o.lyrics||"No lyrics found for this track. You can add it via the tag editor."),document.querySelectorAll(".track-row").forEach(f=>{f.classList.toggle("active",f.dataset.id===(o==null?void 0:o.id))})}),setInterval(()=>Dt(),2e3);let pe=localStorage.getItem("melo-rev")||"";setInterval(()=>{const o=localStorage.getItem("melo-rev")||"";if(o!==pe){pe=o;try{const p=JSON.parse(localStorage.getItem("melo-tracks")||"null");Array.isArray(p)&&(et=p,wt=new Set(et.map(f=>f.id)))}catch{}try{const p=JSON.parse(localStorage.getItem("melo-playlists")||"null");Array.isArray(p)&&p.length&&(yt=p)}catch{}F(),v()}},1200);let ie=null;function Zt(){ie||(ie=setTimeout(()=>{ie=null,ft(),F(),v()},350))}window.LumiLibrary={get tracks(){return et},get playlists(){return yt},render:F,addTracks:Pt,addToCurrentPlaylist:kt,importPaths:bt,flushDeferred:Zt,scanFolder:_t,currentPlaylistName:()=>{var o;return((o=rt())==null?void 0:o.name)||"Playlist"}}}const Gt={flat:[0,0,0,0,0,0,0,0,0,0],pop:[-1,2,4,4,2,-1,-1,2,3,3],rock:[4,3,2,-1,-2,-2,1,3,4,4],bass:[6,5,4,2,1,0,-1,-1,-2,-3],treble:[-3,-2,-1,0,1,2,3,5,6,6],dance:[5,4,2,0,-1,-1,2,4,5,3],jazz:[2,1,2,3,2,0,1,2,3,2],classical:[3,2,1,0,0,0,-1,2,3,4],vocal:[-2,-1,0,2,4,4,3,1,0,-1],acoustic:[3,2,1,1,2,2,3,3,2,1],hiphop:[5,4,1,2,-1,-1,1,-1,2,3],metal:[4,2,-1,-2,-1,1,3,4,5,4]};function re(t){for(const[e,i]of Object.entries(Gt))if(i.every((a,n)=>a===t[n]))return e;return"custom"}function be(t,e,i={}){const a=!!i.remote,n=document.getElementById("eqEnable"),r=document.getElementById("eqPreset"),s=document.getElementById("btnEqReset"),m=document.getElementById("eqBands"),d=document.getElementById("eqCanvas"),l=d?d.getContext("2d"):null;let g=null,y=[],k=[],A=new Array(jt.length).fill(0);try{const u=JSON.parse(localStorage.getItem("melo-eq-gains")||"null");Array.isArray(u)&&u.length===jt.length&&(A=u.map(I=>typeof I=="number"?Math.max(-12,Math.min(12,I)):0))}catch{}let L=localStorage.getItem("melo-eq-preset")||re(A),b=localStorage.getItem("melo-eq-enabled")!=="0";function H(){if(!g)try{const u=Kt(t);g=u.ctx,y=u.filters,y.forEach((I,z)=>{I.gain.value=b?A[z]:0})}catch{}}function $(u,I){H(),y[u]&&b&&(y[u].gain.value=I)}function Q(u){H(),A=[...u],b&&u.forEach((I,z)=>{y[z]&&(y[z].gain.value=I)}),Y()}function lt(u){H(),b=u,u?A.forEach((I,z)=>{y[z]&&(y[z].gain.value=I)}):y.forEach(I=>{I.gain.value=0}),Y()}a||t&&t.addEventListener("play",()=>{H(),(g==null?void 0:g.state)==="suspended"&&g.resume().catch(()=>{})}),ot("melo:eq",u=>{u&&(u.type==="gain"?(a||$(u.idx,u.val),A[u.idx]=u.val,k[u.idx]&&(k[u.idx].value=String(u.val),it(k[u.idx])),r&&(r.value=re(A)),Y()):u.type==="gains"?(a||Q(u.values),A=[...u.values],k.length&&k.forEach((I,z)=>{I.value=String(A[z]),it(I)}),r&&u.preset&&(r.value=u.preset),Y()):u.type==="enable"&&(b=!!u.on,a||lt(b),n&&(n.checked=b),Y()))});function it(u){var J;const I=parseInt(u.value),z=(J=u.parentElement)==null?void 0:J.querySelector(".val");z&&(z.textContent=(I>0?"+":"")+I+"dB")}function Y(){if(!d||!l)return;const u=window.devicePixelRatio||1,I=d.clientWidth*u,z=d.clientHeight*u;if(I<=0||z<=0)return;d.width=I,d.height=z,l.clearRect(0,0,I,z);const J=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#2a7bd6",ct=A;if(!b){l.strokeStyle="rgba(100,120,150,0.25)",l.lineWidth=2*u,l.beginPath(),l.moveTo(0,z/2),l.lineTo(I,z/2),l.stroke();return}l.strokeStyle=J,l.lineWidth=2.5*u,l.lineJoin="round",l.beginPath(),ct.forEach((_t,rt)=>{const K=rt/(ct.length-1)*I,st=z/2-_t/12*(z/2-10*u);if(rt===0)l.moveTo(K,st);else{const Tt=(rt-1)/(ct.length-1)*I,ft=z/2-ct[rt-1]/12*(z/2-10*u);l.quadraticCurveTo((Tt+K)/2,ft,K,st)}}),l.stroke(),ct.forEach((_t,rt)=>{const K=rt/(ct.length-1)*I,st=z/2-_t/12*(z/2-10*u);l.fillStyle=J,l.beginPath(),l.arc(K,st,4*u,0,Math.PI*2),l.fill(),l.fillStyle="white",l.beginPath(),l.arc(K,st,2*u,0,Math.PI*2),l.fill()}),l.strokeStyle="rgba(100,120,150,0.3)",l.lineWidth=1*u,l.setLineDash([4*u,4*u]),l.beginPath(),l.moveTo(0,z/2),l.lineTo(I,z/2),l.stroke(),l.setLineDash([])}m&&(m.innerHTML="",jt.forEach((u,I)=>{const z=A[I]||0,J=document.createElement("div");J.className="eq-band",J.innerHTML=`
        <input type="range" min="-12" max="12" value="${z}" step="1" data-idx="${I}" orient="vertical" />
        <label>${u>=1e3?u/1e3+"k":u}</label>
        <span style="font-size:10px;color:var(--text-muted);min-height:12px;" class="val">${(z>0?"+":"")+z+"dB"}</span>
      `,m.appendChild(J)}),k=Array.from(m.querySelectorAll("input")),k.forEach(u=>{u.addEventListener("input",()=>{const I=parseInt(u.dataset.idx),z=parseInt(u.value);it(u),A[I]=z,Y();const J=re(A);r&&(r.value=J),localStorage.setItem("melo-eq-gains",JSON.stringify(A)),localStorage.setItem("melo-eq-preset",J),a||$(I,z),j("melo:eq",{type:"gain",idx:I,val:z,values:A})})})),r&&(r.value=L,r.addEventListener("change",()=>{const u=Gt[r.value]||Gt.flat;k.length&&k.forEach((I,z)=>{I.value=String(u[z]),it(I)}),A=[...u],Y(),localStorage.setItem("melo-eq-gains",JSON.stringify(A)),localStorage.setItem("melo-eq-preset",r.value),a||Q(u),j("melo:eq",{type:"gains",values:u,preset:r.value}),e(`Preset: ${r.options[r.selectedIndex].text}`)})),s&&s.addEventListener("click",()=>{const u=Gt.flat;k.length&&k.forEach((I,z)=>{I.value="0",it(I)}),A=[...u],r&&(r.value="flat"),localStorage.setItem("melo-eq-gains",JSON.stringify(A)),localStorage.setItem("melo-eq-preset","flat"),a||Q(u),j("melo:eq",{type:"gains",values:u,preset:"flat"}),Y(),e("Equalizer reset to Flat (0dB)")}),n&&(n.checked=b,n.addEventListener("change",()=>{b=n.checked,localStorage.setItem("melo-eq-enabled",b?"1":"0"),a||lt(b),j("melo:eq",{type:"enable",on:b}),Y(),e(b?"Equalizer On":"Equalizer off — Flat")})),d&&new ResizeObserver(()=>Y()).observe(d),Y(),window.LumiEqualizer={presets:Gt,frequencies:jt,displayGains:A,reset:()=>s==null?void 0:s.click()}}const Wt=[{id:"bars",label:"Classic Bars"},{id:"thin",label:"Thin Bars"},{id:"line",label:"Spectrum Line"},{id:"mirror",label:"Mirror Bars"},{id:"wave",label:"Oscilloscope"}];function ta(t){let e=document.getElementById("vizBars");if(!e)return;let i=b(e),a=i.getContext("2d"),n=null,r=null,s=null,m=null,d=null,l=!1,g=localStorage.getItem("melo-viz-mode")||"bars";Wt.some(v=>v.id===g)||(g="bars");let y=0,k=[],A=.45,L=null;function b(v){let M=v.querySelector("canvas");return M||(v.innerHTML="",M=document.createElement("canvas"),v.appendChild(M)),M}function H(){if(!(r&&s))try{const v=Kt(t);n=v.ctx,r=v.analyser,s=new Uint8Array(r.frequencyBinCount),m=new Uint8Array(r.fftSize)}catch{l=!0}}function $(v){const M=s.length,R=((n==null?void 0:n.sampleRate)||44100)/2,C=45,_=Math.min(15e3,R*.95),tt=Math.log(C),G=Math.log(_),q=[];for(let D=0;D<v;D++){const c=Math.exp(tt+(G-tt)*D/v),E=Math.exp(tt+(G-tt)*(D+1)/v);let V=Math.floor(c/R*M),T=Math.max(V+1,Math.ceil(E/R*M));V<0&&(V=0),T>M&&(T=M);let at=0;for(let dt=V;dt<T;dt++)at+=s[dt];q.push(at/(T-V)/255)}return q}function Q(v){const M=performance.now()/1e3,R=Math.pow(Math.abs(Math.sin(M*2.2)),2.5),C=[];for(let _=0;_<v;_++){let tt=.42+.26*Math.sin(M*1.35+_*.62)+.2*Math.sin(M*2.9+_*1.31)+Math.random()*.07;tt*=.55+.5*R,C.push(Math.max(.04,Math.min(1,tt)))}return C}function lt(v){const M=performance.now()/1e3,R=.5+.5*Math.pow(Math.abs(Math.sin(M*1.9)),2);for(let C=0;C<v.length;C++){const _=C/v.length;v[C]=128+66*R*(Math.sin(_*Math.PI*6+M*7)*.6+Math.sin(_*Math.PI*13-M*11)*.4)}}function it(v){let M;if(l||!r||!s)M=Q(v);else if(r.getByteFrequencyData(s),M=$(v),!M.some(_=>_>.01)&&!t.paused)M=Q(v);else for(let _=0;_<v;_++)M[_]*=1+1.7*(_/Math.max(1,v-1));let R=0;for(const C of M)C>R&&(R=C);R>A?A=R:A=Math.max(.35,A*.985),k.length!==v&&(k=new Array(v).fill(0));for(let C=0;C<v;C++){const _=Math.min(1,M[C]/A),tt=_>k[C]?.55:.16;k[C]+=(_-k[C])*tt}return k}function Y(v,M){return getComputedStyle(document.documentElement).getPropertyValue(v).trim()||M}function u(){return i.width/Math.max(1,i.clientWidth)||1}function I(v,M,R,C,_){if(_=Math.min(_,R/2,C/2),a.roundRect){a.roundRect(v,M,R,C,_);return}a.rect(v,M,R,C)}function z(){const v=window.devicePixelRatio||1,M=i.clientWidth||(e==null?void 0:e.clientWidth)||200,R=i.clientHeight||(e==null?void 0:e.clientHeight)||56;M>0&&R>0&&(i.width=Math.round(M*v),i.height=Math.round(R*v))}new ResizeObserver(z).observe(i),z();function J(v,M,R,C){const _=u(),tt=Y("--visualizer","#38bdf8"),G=Y("--accent","#0284c7"),q=v.length,D=M/q,c=Math.max(1.2*_,D*(1-C));for(let E=0;E<q;E++){const V=v[E],T=Math.max(2*_,V*(R-4*_)),at=E*D+(D-c)/2,dt=R-T-1*_,F=a.createLinearGradient(0,dt,0,R);F.addColorStop(0,G),F.addColorStop(1,tt),a.fillStyle=F,a.beginPath(),I(at,dt,c,T,Math.min(c/2,3.5*_)),a.fill()}}function ct(v,M,R){const C=u(),_=Y("--visualizer","#38bdf8"),tt=Y("--accent","#0284c7"),G=v.length,q=M/G,D=R/2,c=Math.max(1.5*C,q*.62);for(let E=0;E<G;E++){const V=Math.max(1.5*C,v[E]*(R/2-3*C)),T=E*q+(q-c)/2,at=a.createLinearGradient(0,D-V,0,D+V);at.addColorStop(0,tt),at.addColorStop(.5,_),at.addColorStop(1,tt),a.fillStyle=at,a.beginPath(),I(T,D-V,c,V*2,Math.min(c/2,3*C)),a.fill()}}function _t(v,M,R){const C=u(),_=Y("--visualizer","#38bdf8"),tt=Y("--accent","#0284c7"),G=v.length,q=[],D=[];for(let E=0;E<G;E++)q.push((E+.5)/G*M),D.push(R-2*C-v[E]*(R-8*C));a.beginPath(),a.moveTo(q[0],R),a.lineTo(q[0],D[0]);for(let E=1;E<G;E++){const V=(q[E-1]+q[E])/2;a.quadraticCurveTo(q[E-1],D[E-1],V,(D[E-1]+D[E])/2)}a.lineTo(q[G-1],D[G-1]),a.lineTo(q[G-1],R),a.closePath();const c=a.createLinearGradient(0,0,0,R);c.addColorStop(0,_),c.addColorStop(1,"transparent"),a.globalAlpha=.18,a.fillStyle=c,a.fill(),a.globalAlpha=1,a.beginPath(),a.moveTo(q[0],D[0]);for(let E=1;E<G;E++){const V=(q[E-1]+q[E])/2;a.quadraticCurveTo(q[E-1],D[E-1],V,(D[E-1]+D[E])/2)}a.lineTo(q[G-1],D[G-1]),a.strokeStyle=tt,a.lineWidth=2*C,a.lineJoin="round",a.stroke()}function rt(){const v=i.width,M=i.height,R=u(),C=Y("--accent","#0284c7");let _;l||!r||!m?(d||(d=new Uint8Array(1024)),lt(d),_=d):(r.getByteTimeDomainData(m),_=m);const tt=()=>{a.beginPath();for(let G=0;G<=v;G+=2){const q=Math.min(_.length-1,Math.floor(G/v*_.length)),D=_[q]/255*M;G===0?a.moveTo(G,D):a.lineTo(G,D)}};tt(),a.strokeStyle=C,a.globalAlpha=.16,a.lineWidth=6*R,a.lineJoin="round",a.stroke(),tt(),a.globalAlpha=1,a.lineWidth=1.8*R,a.stroke()}function K(){const v=i.width,M=i.height;if(!v||!M)return;if(a.clearRect(0,0,v,M),g==="wave"){rt();return}const C=it(g==="bars"?16:g==="thin"?56:g==="line"?64:24);g==="bars"?J(C,v,M,.34):g==="thin"?J(C,v,M,.32):g==="line"?_t(C,v,M):g==="mirror"&&ct(C,v,M)}function st(){y=requestAnimationFrame(st),K()}function Tt(){y||st()}function ft(v,M=!1){g=v,k=[],localStorage.setItem("melo-viz-mode",v)}function wt(){return L||(L=document.createElement("div"),L.className="viz-menu",L.style.display="none",document.body.appendChild(L),L)}function Pt(){const v=wt();v.innerHTML='<div class="viz-menu-label">Visualizer type</div>'+Wt.map(M=>`<button class="viz-menu-item ${M.id===g?"active":""}" data-mode="${M.id}">${M.id===g?"✓":""}<span>${M.label}</span></button>`).join(""),v.querySelectorAll("[data-mode]").forEach(M=>{M.addEventListener("click",R=>{R.stopPropagation(),ft(M.dataset.mode),bt()})})}function kt(v,M){Pt();const R=L;R.style.display="block";const C=R.getBoundingClientRect();R.style.left=Math.max(8,Math.min(v,window.innerWidth-C.width-8))+"px",R.style.top=Math.max(8,Math.min(M,window.innerHeight-C.height-8))+"px"}function bt(){L&&(L.style.display="none")}function $t(){e&&(e.title="Click: next mode • Right-click: choose mode",e.addEventListener("click",()=>{bt();const v=Wt.findIndex(M=>M.id===g);ft(Wt[(v+1)%Wt.length].id)}),e.addEventListener("contextmenu",v=>{v.preventDefault(),v.stopPropagation(),kt(v.clientX,v.clientY)}))}document.addEventListener("click",v=>{L&&L.style.display!=="none"&&!L.contains(v.target)&&bt()}),document.addEventListener("keydown",v=>{v.key==="Escape"&&bt()});function Et(){H(),Tt(),(n==null?void 0:n.state)==="suspended"&&n.resume().catch(()=>{})}t.addEventListener("play",Et),Et(),$t(),document.addEventListener("visibilitychange",()=>{document.hidden?(cancelAnimationFrame(y),y=0):Tt()});function zt(){cancelAnimationFrame(y),y=0,e=document.getElementById("vizBars"),e&&(i=b(e),a=i.getContext("2d"),new ResizeObserver(z).observe(i),z(),$t(),Tt())}window.__LUMI_REBIND_VISUALIZER__=zt}function we(t){if(!t||!t.trim())return{isSynced:!1,lines:[],raw:""};const e=[],i=t.split(/\r?\n/),a=/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;let n=!1;for(const r of i){const s=r.trim();if(!s||/^\[[a-z]{2,8}:/i.test(s))continue;const m=[...s.matchAll(a)];if(m.length>0){n=!0;const d=s.replace(a,"").trim();for(const l of m){const g=parseInt(l[1],10),y=parseInt(l[2],10),k=l[3]||"0",A=k.length===2?parseInt(k,10)*10:k.length===1?parseInt(k,10)*100:parseInt(k.slice(0,3),10),L=g*60+y+A/1e3;e.push({time:L,text:d})}}else e.push({time:-1,text:s})}return e.sort((r,s)=>r.time-s.time),{isSynced:n,lines:e,raw:t}}function xe(t,e){var L;const i=document.getElementById("lyricsContainer"),a=document.getElementById("lyricsStatus"),n=document.getElementById("lyricsTrackTitle");let r={isSynced:!1,lines:[]},s=null,m=-1,d=0;async function l(b){if(b.lyrics&&b.lyrics.trim().length>0)return b.lyrics;if(window.__TAURI__)try{const{invoke:H}=await Z(async()=>{const{invoke:Q}=await import("./core-DhEqZVGG.js");return{invoke:Q}},[]),$=await H("get_track_lyrics",{path:b.path});if($)return $}catch{}return null}async function g(b){if(!b){s=null,r={isSynced:!1,lines:[],raw:""},n&&(n.textContent="No track playing"),y();return}s=b.id,n&&(n.textContent=`${b.title} — ${b.artist}`);const H=await l(b);r=we(H||""),y()}function y(){if(i){if(i.innerHTML="",m=-1,!r.lines.length){a&&(a.style.display="block",a.innerHTML='No synced lyrics found (.lrc)<br/><span style="font-size:10.5px; opacity:0.7;">Place a matching .lrc file in the song folder or add lyrics in the tag editor.</span>');return}a&&(a.style.display="none"),r.lines.forEach((b,H)=>{const $=document.createElement("div");$.className="lyric-line",$.dataset.idx=String(H),$.dataset.time=String(b.time),$.textContent=b.text||"♪",b.time>=0&&($.style.cursor="pointer",$.title=`Seek to ${Math.floor(b.time/60)}:${Math.floor(b.time%60).toString().padStart(2,"0")}`,$.addEventListener("click",()=>{j("melo:seek-playback",b.time),window.__TAURI__||(t.currentTime=b.time,t.play().catch(()=>{}))})),i.appendChild($)})}}function k(){if(!i||!r.isSynced||!r.lines.length)return;const b=window.__TAURI__?d:t.currentTime;let H=-1;for(let $=0;$<r.lines.length&&r.lines[$].time<=b;$++)H=$;if(H!==m){m=H;const $=i.querySelectorAll(".lyric-line");if($.forEach((Q,lt)=>{Q.classList.toggle("active",lt===m),Q.classList.toggle("passed",lt<m)}),m>=0&&$[m]){const Q=$[m],lt=i.clientHeight,Y=Q.offsetTop-i.offsetTop-lt/2+Q.clientHeight/2;i.scrollTo({top:Math.max(0,Y),behavior:"smooth"})}}}t.addEventListener("timeupdate",k),window.addEventListener("lumi:trackChange",b=>{g(b.detail)}),ot("melo:track-changed",b=>{g(b)}),ot("melo:playback-state",b=>{b&&(d=Number(b.currentTime)||0,b.track&&b.track.id!==s?g(b.track):k())}),ot("melo:playback-position",b=>{d=Number(b)||0,k()});const A=window.__LUMI_QUEUE__;if(Array.isArray(A)&&A.length>0)g(A[((L=window.LumiPlayer)==null?void 0:L.currentIndex)||0]);else try{const b=JSON.parse(localStorage.getItem("melo-current-track")||"null");b&&g(b)}catch{}j("melo:request-playback-state"),setTimeout(()=>j("melo:request-playback-state"),250),window.LumiLyrics={loadTrackLyrics:g,parseLRC:we}}let Ct=null;const ke=`<!doctype html>
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
    border: 1px solid var(--card-border) !important;
    border-radius: 24px !important;
    box-shadow: none !important;
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

  .transport #btnStop { display: none !important; }
  body.show-stop-btn .transport #btnStop { display: grid !important; }

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
`,Ee=`<!doctype html>
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
    border: 1px solid var(--card-border) !important;
    border-radius: 24px !important;
    box-shadow: none !important;
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

  .transport #btnStop { display: none !important; }
  body.show-stop-btn .transport #btnStop { display: grid !important; }

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
`,Se={"compact-pill-light.html":ke,"compact-pill-dark.html":Ee,"compact-pill-light":ke,"compact-pill-dark":Ee},ea=[{id:"compact-pill-light",name:"Minimal Compact (Light)",filename:"compact-pill-light.html"},{id:"compact-pill-dark",name:"Minimal Compact (Dark)",filename:"compact-pill-dark.html"},{id:"full-html-example",name:"Full HTML Example",filename:"full-html-example.html"},{id:"example-custom",name:"Custom CSS Example",filename:"example-custom.html"}];function Be(t){const e=["trackTitle","btnPlay","seekBar","coverImg"];let i=0;for(const a of e)t.includes(a)&&i++;return i>=3}function Vt(t,e){const i=document.getElementById("playerCard");if(!i)return;const a=i._originalHTML||i.innerHTML;i._originalHTML||(i._originalHTML=a),Ct&&(Ct.remove(),Ct=null);let r=[...t.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(y=>y[1]).join(`
`);r&&(Ct=document.createElement("style"),Ct.id="melo-custom-skin",Ct.textContent=r,document.head.appendChild(Ct));const s=Be(t);let m="";const d=t.match(/<body[^>]*>([\s\S]*?)<\/body>/i);d?m=d[1]:m=t.split(/<\/style>/i).pop()||"";const l=document.createElement("div");l.innerHTML=m;const g=l.querySelector("#lumi-player");if(g&&(m=g.innerHTML),s&&m.trim().length>20){const y=m.trim();i.innerHTML=y,e&&e("Skin applied"),setTimeout(()=>{var A,L;(A=window.__LUMI_REBIND__)==null||A.call(window);const k=window.__LUMI_AUDIO__;k&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(k),(L=window.__LUMI_REBIND_MAIN__)==null||L.call(window)},40)}else r&&e&&e("Skin CSS applied");localStorage.setItem("lumi-custom-skin",t),localStorage.setItem("lumi-custom-skin-isFull",s?"1":"0")}function le(t,e=!0){Ct&&(Ct.remove(),Ct=null);const i=document.getElementById("playerCard");i&&i._originalHTML&&(i.innerHTML=i._originalHTML,setTimeout(()=>{var n,r;(n=window.__LUMI_REBIND__)==null||n.call(window);const a=window.__LUMI_AUDIO__;a&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(a),(r=window.__LUMI_REBIND_MAIN__)==null||r.call(window)},40)),localStorage.removeItem("lumi-custom-skin"),localStorage.removeItem("lumi-custom-skin-isFull"),localStorage.setItem("melo-active-skin-id","default"),e&&j("melo:skin-changed","default"),t&&t("Switched to Default Melo skin")}async function Pe(){if(ut)try{const{invoke:t}=await Z(async()=>{const{invoke:i}=await import("./core-DhEqZVGG.js");return{invoke:i}},[]),e=await t("list_installed_skins");if(Array.isArray(e)&&e.length>0)return e}catch{}return ea}async function ze(t,e){if(ut)try{const{invoke:a}=await Z(async()=>{const{invoke:r}=await import("./core-DhEqZVGG.js");return{invoke:r}},[]),n=await a("read_skin_file",{filenameOrPath:t});if(n&&n.trim().length>0)return Vt(n,e),!0}catch{}try{const a=t.startsWith("skins/")?t:`skins/${t}`,n=await fetch(a);if(n.ok){const r=await n.text();return Vt(r,e),!0}}catch{}const i=t.replace(/^.*[\\/]/,"");return Se[i]?(Vt(Se[i],e),!0):(e&&e(`Could not load skin: ${t}`),!1)}async function Ot(t,e,i,a=!0){if(t==="default"){le(i,a);return}let n=t;t==="compact-pill"||t.startsWith("compact-pill")?n=e==="dark"?"compact-pill-dark.html":"compact-pill-light.html":!n.endsWith(".html")&&!n.endsWith(".htm")&&(n=n+".html"),await ze(n,i)&&(localStorage.setItem("melo-active-skin-id",t),a&&j("melo:skin-changed",t))}async function Re(t){if(ut)try{const{invoke:e}=await Z(async()=>{const{invoke:i}=await import("./core-DhEqZVGG.js");return{invoke:i}},[]);await e("open_skins_folder"),t&&t("Opening skins folder...")}catch{t&&t("Could not open skins folder")}else t&&t("Skins are located in the skins/ folder")}function aa(t){const e=document.getElementById("skinUpload"),i=document.getElementById("linkDownloadExample");i&&i.addEventListener("click",r=>{r.preventDefault(),ze("compact-pill-light.html")});const a=localStorage.getItem("melo-active-skin-id")||"default",n=localStorage.getItem("lumi-theme")||"dark";a!=="default"&&setTimeout(()=>{Ot(a,n,void 0,!1)},150),ot("melo:theme",r=>{const s=localStorage.getItem("melo-active-skin-id");s&&s!=="default"&&Ot(s,r,void 0,!1)}),ot("melo:skin-changed",r=>{if(r&&typeof r=="string"){const s=localStorage.getItem("lumi-theme")||"dark";Ot(r,s,void 0,!1)}}),e&&e.addEventListener("change",async()=>{var d;const r=(d=e.files)==null?void 0:d[0];if(!r)return;const s=await r.text(),m=r.name;if(ut)try{const{invoke:l}=await Z(async()=>{const{invoke:g}=await import("./core-DhEqZVGG.js");return{invoke:g}},[]);await l("save_custom_skin_file",{filename:m,content:s}),t(`Saved ${m} to skins folder`)}catch{}Vt(s,t),localStorage.setItem("melo-active-skin-id",m),j("melo:skin-changed",m),e.value=""}),document.addEventListener("dragover",r=>{var s;[...((s=r.dataTransfer)==null?void 0:s.types)||[]].includes("Files")&&r.preventDefault()}),document.addEventListener("drop",async r=>{var m;const s=[...((m=r.dataTransfer)==null?void 0:m.files)||[]].find(d=>d.name.endsWith(".html")||d.name.endsWith(".htm"));if(s){r.preventDefault();const d=await s.text();if(d.includes("<style")||d.includes("<html")||Be(d)){const l=s.name;if(ut)try{const{invoke:g}=await Z(async()=>{const{invoke:y}=await import("./core-DhEqZVGG.js");return{invoke:y}},[]);await g("save_custom_skin_file",{filename:l,content:d})}catch{}Vt(d,t),localStorage.setItem("melo-active-skin-id",l),j("melo:skin-changed",l)}}}),window.LumiSkin={applyCustomSkin:Vt,resetSkin:le,applySkinChoice:Ot,listInstalledSkins:Pe,openSkinsFolderOnDisk:Re}}const ia=(t,e,i)=>{const a=t[e];return a?typeof a=="function"?a():Promise.resolve(a):new Promise((n,r)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(r.bind(null,new Error("Unknown variable dynamic import: "+e+(e.split("/").length!==i?". Note that variables only represent file names one level deep.":""))))})},$e={code:"en",name:"English",nativeName:"English",authors:["Melo Team"]},se={_meta:$e,"settings.tabs.general":"General","settings.tabs.playback":"Playback","settings.tabs.appearance":"Appearance & Skin","settings.tabs.shortcuts":"Shortcuts","settings.tabs.about":"About","settings.general.language.label":"Language","settings.general.language.desc":"Interface language — more languages coming via community translation","settings.general.tray.label":"Close to system tray","settings.general.tray.desc":"Minimize to system tray on window close","settings.general.resume.label":"Resume playback on reopen","settings.general.resume.desc":"Continue playback of the previous track where you left off","settings.playback.replaygain.label":"ReplayGain normalization","settings.playback.replaygain.desc":"Equalize track volume levels automatically","settings.playback.fadepause.label":"Fade out on pause","settings.playback.fadepause.desc":"Smooth 0.3s fade-out on pause, fade back in on resume","settings.appearance.showstop.label":"Show Stop button","settings.appearance.showstop.desc":"Display a Stop control next to Play/Pause in the player"},na=Object.freeze(Object.defineProperty({__proto__:null,_meta:$e,default:se},Symbol.toStringTag,{value:"Module"})),De=[{code:"en",nativeName:"English"}],qt={en:se};let qe=qt.en,Oe="en";function oa(){return Oe}async function Ue(t){if(De.some(e=>e.code===t)||(t="en"),!qt[t])if(t==="en")qt.en=se;else try{const e=await ia(Object.assign({"./locales/en.json":()=>Z(()=>Promise.resolve().then(()=>na),void 0)}),`./locales/${t}.json`,3);qt[t]=e.default||e}catch{t="en"}Oe=t,qe=qt[t]||qt.en,localStorage.setItem("melo-pref-language",t),document.dispatchEvent(new CustomEvent("melo:locale-changed",{detail:t}))}function gt(t){var e,i;return(i=(e=qe[t])!=null?e:qt.en[t])!=null?i:t}function Le(){const t=localStorage.getItem("melo-pref-language")||"en";Ue(t)}const He=document.querySelector("#app");He.innerHTML=`
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
      <span class="app-name-static">Melo</span>
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
`;const ht=new URLSearchParams(location.search).get("panel");var Te,Ae;if(ut&&ht){Z(async()=>{const{getCurrentWindow:a}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:a}},__vite__mapDeps([8,7,1,0])).then(({getCurrentWindow:a})=>{const n=a();sa(n,"melo-geo-panel-"+ht),n.onCloseRequested(()=>{j("melo:panel-closed",ht)}),window.addEventListener("beforeunload",()=>{j("melo:panel-closed",ht)})});const t=document.getElementById("win-"+ht),e=((Te=t==null?void 0:t.querySelector(".float-title"))==null?void 0:Te.innerHTML)||"",i=((Ae=t==null?void 0:t.querySelector(".float-body"))==null?void 0:Ae.innerHTML)||"";He.innerHTML=`
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
</div>`}ut&&!ht&&(document.documentElement.classList.add("tauri-main"),document.body.classList.add("tauri-main"),document.querySelectorAll(".side-actions .sbtn").forEach(t=>t.classList.remove("active")),Z(async()=>{const{WebviewWindow:t}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:t}},__vite__mapDeps([6,7,1,0,8])).then(({WebviewWindow:t})=>{const e=async()=>{var i;for(const a of["library","playlist","equalizer","lyrics","settings"])try{const n=await t.getByLabel("panel-"+a);(i=document.getElementById(ce[a]))==null||i.classList.toggle("active",!!n)}catch{}};e(),setInterval(e,1200)}));ut&&!ht&&(Z(()=>import("./window-BWd3Cypy.js"),__vite__mapDeps([8,7,1,0])).then(async({getCurrentWindow:t})=>{const e=t(),i=()=>{const n=localStorage.getItem("melo-active-skin-id"),r=n==="compact-pill"||typeof n=="string"&&n.startsWith("compact-pill");return{w:r?780:960,h:r?138:240}};try{const n=JSON.parse(localStorage.getItem("melo-geo-main")||"null"),{LogicalPosition:r,LogicalSize:s}=await Z(async()=>{const{LogicalPosition:g,LogicalSize:y}=await import("./dpi-fvP-W2qr.js");return{LogicalPosition:g,LogicalSize:y}},__vite__mapDeps([7,1])),m=i(),d=m.w===780,l=d?m.w:n!=null&&n.w?Math.max(650,n.w):m.w;await e.setSize(new s(l,m.h)),await e.setResizable(!d),(n==null?void 0:n.x)!=null&&(n==null?void 0:n.y)!=null&&await e.setPosition(new r(n.x,n.y))}catch{}const a=async()=>{try{const n=await e.outerPosition(),r=await e.innerSize(),s=i();localStorage.setItem("melo-geo-main",JSON.stringify({x:n.x,y:n.y,w:r.width,h:s.h}))}catch{}};e.onMoved(a),e.onResized(async()=>{try{const n=await e.innerSize(),r=i(),s=r.w===780,{LogicalSize:m}=await Z(async()=>{const{LogicalSize:d}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:d}},__vite__mapDeps([7,1]));s?(n.width!==r.w||n.height!==r.h)&&await e.setSize(new m(r.w,r.h)):(n.width<650||n.height!==r.h)&&await e.setSize(new m(Math.max(650,n.width),r.h))}catch{}a()}),ot("melo:skin-changed",async n=>{try{!ht&&n&&await Ot(n,Bt,void 0,!1);const r=n==="compact-pill"||typeof n=="string"&&n.startsWith("compact-pill"),s=r?780:960,m=r?138:240,{LogicalSize:d}=await Z(async()=>{const{LogicalSize:l}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:l}},__vite__mapDeps([7,1]));await e.setSize(new d(s,m)),await e.setResizable(!r),a()}catch{}}),e.onCloseRequested(async n=>{if(n.preventDefault(),localStorage.getItem("melo-pref-tray")!=="0")try{await e.hide();return}catch{}const{WebviewWindow:s}=await Z(async()=>{const{WebviewWindow:m}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:m}},__vite__mapDeps([6,7,1,0,8]));for(const m of["library","playlist","equalizer","lyrics","settings"])try{const d=await s.getByLabel("panel-"+m);d&&await d.close()}catch{}try{await e.destroy()}catch{window.close()}})}),Z(()=>import("./core-DhEqZVGG.js"),[]).then(async({invoke:t})=>{try{const e=await t("get_cli_tracks");if(Array.isArray(e)&&e.length>0){const i=window.LumiLibrary,a=window.LumiPlayer;e.forEach(n=>n.source="import"),i==null||i.addToCurrentPlaylist(e),e.forEach(n=>a==null?void 0:a.queue.push(n)),setTimeout(()=>{if(a&&a.queue.length>0){const n=a.queue.findIndex(r=>r.id===e[0].id);a.loadTrack(n>=0?n:0,!0)}},150)}}catch{}}),ot("melo:open-files",t=>{if(Array.isArray(t)&&t.length>0){const e=window.LumiLibrary,i=window.LumiPlayer;t.forEach(a=>a.source="import"),e==null||e.addToCurrentPlaylist(t),t.forEach(a=>i==null?void 0:i.queue.push(a)),pt(`Playing ${t[0].title}`),setTimeout(()=>{if(i&&i.queue.length>0){const a=i.queue.findIndex(n=>n.id===t[0].id);i.loadTrack(a>=0?a:0,!0)}},150)}}));document.addEventListener("contextmenu",t=>{t.preventDefault()});const Qt=document.getElementById("toast"),pt=t=>{Qt&&(Qt.textContent=t,Qt.classList.add("show"),setTimeout(()=>Qt.classList.remove("show"),2200))},Mt=new Audio;Mt.preload="metadata";Mt.crossOrigin="anonymous";window.__LUMI_AUDIO__=Mt;window.__TOAST__=pt;let Bt=localStorage.getItem("lumi-theme")||"dark";function ee(t){document.documentElement.setAttribute("data-theme",t),localStorage.setItem("lumi-theme",t),Bt=t}function Ne(t){ee(t),j("melo:theme",t)}ee(Bt);ot("melo:theme",t=>{(t==="light"||t==="dark")&&ee(t)});setInterval(()=>{const t=localStorage.getItem("lumi-theme");(t==="light"||t==="dark")&&t!==Bt&&ee(t)},1e3);document.body.classList.toggle("show-stop-btn",localStorage.getItem("melo-pref-showStopBtn")==="1");ot("melo:pref-changed",t=>{t&&t.key==="showStopBtn"&&document.body.classList.toggle("show-stop-btn",!!t.value)});const ra=["win-library","win-playlist","win-equalizer","win-lyrics","win-settings"],te=document.getElementById("desktop"),Ve={btnToggleLibrary:"win-library",btnTogglePlaylist:"win-playlist",btnToggleEq:"win-equalizer",btnToggleLyrics:"win-lyrics",btnOpenSettings:"win-settings",menuToggleLibrary:"win-library",menuTogglePlaylist:"win-playlist",menuToggleEq:"win-equalizer",menuToggleLyrics:"win-lyrics",menuToggleSettings:"win-settings"};function la(t){const e=document.getElementById(t);return!!e&&!e.classList.contains("hidden")}const ce={library:"btnToggleLibrary",playlist:"btnTogglePlaylist",equalizer:"btnToggleEq",lyrics:"btnToggleLyrics",settings:"btnOpenSettings"};async function sa(t,e){const i=async()=>{try{const a=await t.outerPosition(),n=await t.outerSize();localStorage.setItem(e,JSON.stringify({x:a.x,y:a.y,w:n.width,h:n.height}))}catch{}};t.onMoved(i),t.onResized(i)}async function ca(t){const{WebviewWindow:e}=await Z(async()=>{const{WebviewWindow:g}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:g}},__vite__mapDeps([6,7,1,0,8])),i="panel-"+t,a=document.getElementById(ce[t]),n=await e.getByLabel(i);if(n){await n.close(),a==null||a.classList.remove("active");return}const r={library:[430,620],playlist:[440,560],equalizer:[700,440],lyrics:[380,520],settings:[600,540]},s={library:[360,400],playlist:[360,360],equalizer:[620,400],lyrics:[320,360],settings:[500,400]},m={library:"Library",playlist:"Playlist",equalizer:"Equalizer",lyrics:"Lyric",settings:"Settings"},d=r[t]||[420,520];let l=null;try{l=JSON.parse(localStorage.getItem("melo-geo-panel-"+t)||"null")}catch{}new e(i,{url:`/?panel=${t}`,title:m[t]||t,width:(l==null?void 0:l.w)||d[0],height:(l==null?void 0:l.h)||d[1],minWidth:(s[t]||[360,360])[0],minHeight:(s[t]||[360,360])[1],...(l==null?void 0:l.x)!=null?{x:l.x,y:l.y}:{center:!0},decorations:!1,transparent:!0,shadow:!1,skipTaskbar:!0}),a==null||a.classList.add("active"),j("melo:theme",Bt)}ot("melo:panel-closed",t=>{var i;const e=ce[t];e&&((i=document.getElementById(e))==null||i.classList.remove("active"))});function de(t){if(ut){ca(t.replace(/^win-/,""));return}const e=la(t);Jt(t,!e),e||ae(document.getElementById(t))}function da(t){if(t.classList.contains("hidden")||!te||window.matchMedia("(max-width: 860px)").matches)return;const e=te.getBoundingClientRect();if(e.width<=0||e.height<=0)return;const i=t.getBoundingClientRect(),a=Math.min(i.width,e.width),n=Math.min(i.height,e.height);let r=i.left-e.left,s=i.top-e.top;r=Math.max(0,Math.min(e.width-a,r)),s=Math.max(0,Math.min(e.height-n,s)),t.style.left=r+"px",t.style.top=s+"px",t.style.right="auto",t.style.bottom="auto",t.style.transform="none"}function Jt(t,e){var n,r,s,m,d,l,g,y,k,A;const i=document.getElementById(t);if(!i)return;i.classList.toggle("hidden",!e),localStorage.setItem("lumiv2-"+t,e?"1":"0"),e&&da(i);const a=e;t==="win-library"&&((n=document.getElementById("btnToggleLibrary"))==null||n.classList.toggle("active",a),(r=document.getElementById("menuToggleLibrary"))==null||r.classList.toggle("active",a)),t==="win-playlist"&&((s=document.getElementById("btnTogglePlaylist"))==null||s.classList.toggle("active",a),(m=document.getElementById("menuTogglePlaylist"))==null||m.classList.toggle("active",a)),t==="win-equalizer"&&((d=document.getElementById("btnToggleEq"))==null||d.classList.toggle("active",a),(l=document.getElementById("menuToggleEq"))==null||l.classList.toggle("active",a)),t==="win-lyrics"&&((g=document.getElementById("btnToggleLyrics"))==null||g.classList.toggle("active",a),(y=document.getElementById("menuToggleLyrics"))==null||y.classList.toggle("active",a)),t==="win-settings"&&((k=document.getElementById("btnOpenSettings"))==null||k.classList.toggle("active",a),(A=document.getElementById("menuToggleSettings"))==null||A.classList.toggle("active",a))}ht||ra.forEach(t=>{const e=localStorage.getItem("lumiv2-"+t);e!==null?Jt(t,e==="1"):t==="win-settings"?Jt(t,!1):Jt(t,!0)});Object.entries(Ve).forEach(([t,e])=>{var i;(i=document.getElementById(t))==null||i.addEventListener("click",()=>de(e))});document.querySelectorAll("[data-close]").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.close;Jt(e,!1)})});let xt=null,It=null,Me=10;function ae(t){Me++,t.style.zIndex=String(Me),document.querySelectorAll(".float-win").forEach(e=>e.classList.remove("active")),t.classList.add("active")}document.querySelectorAll(".float-win").forEach(t=>{t.addEventListener("mousedown",()=>ae(t))});document.querySelectorAll("[data-drag]").forEach(t=>{t.addEventListener("mousedown",e=>{if(e.target.closest("button")||e.target.closest("input")||e.target.closest("select"))return;const i=t.dataset.drag,a=document.getElementById(i);ae(a),a.classList.add("dragging");const n=a.getBoundingClientRect();xt={id:i,startX:e.clientX,startY:e.clientY,initX:n.left,initY:n.top,width:n.width,height:n.height}})});document.querySelectorAll("[data-resize]").forEach(t=>{t.addEventListener("mousedown",e=>{e.stopPropagation();const i=t.dataset.resize,a=document.getElementById(i);ae(a),a.classList.add("resizing");const n=a.getBoundingClientRect();It={id:i,startX:e.clientX,startY:e.clientY,initW:n.width,initH:n.height}})});window.addEventListener("mousemove",t=>{if(xt){const e=document.getElementById(xt.id);let i=t.clientX-xt.startX,a=t.clientY-xt.startY,n=xt.initX+i,r=xt.initY+a;if(te&&!window.matchMedia("(max-width: 860px)").matches){const s=te.getBoundingClientRect(),m=s.left,d=s.right-xt.width,l=s.top,g=s.bottom-xt.height;n=Math.max(m,Math.min(d,n))-s.left,r=Math.max(l,Math.min(g,r))-s.top}e.style.left=n+"px",e.style.top=r+"px",e.style.right="auto",e.style.bottom="auto",e.style.transform="none"}if(It){const e=document.getElementById(It.id);let i=It.initW+(t.clientX-It.startX),a=It.initH+(t.clientY-It.startY);i=Math.max(260,i),a=Math.max(160,a),e.style.width=i+"px",e.style.height=a+"px"}});window.addEventListener("mouseup",()=>{if(xt){const t=document.getElementById(xt.id);t&&(t.classList.remove("dragging"),localStorage.setItem("lumiv2-pos-"+xt.id,JSON.stringify({left:t.style.left,top:t.style.top}))),xt=null}if(It){const t=document.getElementById(It.id);t&&(t.classList.remove("resizing"),localStorage.setItem("lumiv2-size-"+It.id,JSON.stringify({width:t.style.width,height:t.style.height}))),It=null}});async function Fe(){const t=window.LumiLibrary,e=window.LumiPlayer;if(ut){try{const{open:a}=await Z(async()=>{const{open:d}=await import("./index-CS3Qnt9j.js");return{open:d}},__vite__mapDeps([5,1])),n=await a({multiple:!0,filters:[{name:"Audio",extensions:["mp3","flac","wav","aac","ogg","m4a","alac","opus","wma","aiff"]}]});if(!n)return;const r=Array.isArray(n)?n:[n],{invoke:s}=await Z(async()=>{const{invoke:d}=await import("./core-DhEqZVGG.js");return{invoke:d}},[]),m=[];for(const d of r)try{const l=await s("scan_library",{path:d});if(l&&l.length)l.forEach(g=>g.source="import"),m.push(...l);else{const g=d.replace(/^.*[\\/]/,""),y=g.lastIndexOf("."),k=y>0?g.slice(0,y):g,A=y>0?g.slice(y+1).toUpperCase():"AUDIO";m.push({id:d,title:k,artist:"Unknown Artist",album:"Single",duration:0,path:d,codec:A,specs:"Local File",source:"import"})}}catch{const l=d.replace(/^.*[\\/]/,""),g=l.lastIndexOf("."),y=g>0?l.slice(0,g):l,k=g>0?l.slice(g+1).toUpperCase():"AUDIO";m.push({id:d,title:y,artist:"Unknown Artist",album:"Single",duration:0,path:d,codec:k,specs:"Local File",source:"import"})}t==null||t.addTracks(m,!0),t==null||t.addToCurrentPlaylist(m),m.forEach(d=>e==null?void 0:e.queue.push(d)),j("melo:play-tracks",{tracks:m,index:0}),pt(`${m.length} file(s) added`)}catch{pt("Error opening files")}return}const i=document.createElement("input");i.type="file",i.multiple=!0,i.accept="audio/*,.mp3,.flac,.wav,.aac,.ogg,.m4a,.alac,.opus,.wma,.aiff",i.onchange=async()=>{const a=Array.from(i.files||[]);if(!a.length)return;const n=[];for(const r of a){const s=r.path,m=s||URL.createObjectURL(r),d=r.name,l=d.lastIndexOf("."),g=l>0?d.slice(0,l):d,y=l>0?d.slice(l+1).toUpperCase():"AUDIO",k={id:s||"imp_"+Math.random().toString(36).slice(2,9),title:g,artist:"Unknown Artist",album:"Single",duration:0,path:m,codec:y,specs:"Local File",source:"import"};await Yt(r,k),n.push(k)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(r=>e==null?void 0:e.queue.push(r)),j("melo:play-tracks",{tracks:n,index:0}),pt(`${n.length} file(s) added`)},i.click()}async function We(){const t=window.LumiLibrary,e=window.LumiPlayer;if(ut){try{const{open:a}=await Z(async()=>{const{open:l}=await import("./index-CS3Qnt9j.js");return{open:l}},__vite__mapDeps([5,1])),n=await a({directory:!0});if(!n)return;const r=n,{invoke:s}=await Z(async()=>{const{invoke:l}=await import("./core-DhEqZVGG.js");return{invoke:l}},[]),d=(await s("scan_library",{path:r})).map(l=>({...l,source:"import"}));t==null||t.addTracks(d,!0),t==null||t.addToCurrentPlaylist(d),d.forEach(l=>e==null?void 0:e.queue.push(l)),j("melo:play-tracks",{tracks:d,index:0}),pt(`${d.length} track(s) added from folder`)}catch{pt("Error scanning folder")}return}const i=document.createElement("input");i.type="file",i.webkitdirectory=!0,i.multiple=!0,i.accept="audio/*",i.onchange=async()=>{const a=Array.from(i.files||[]).filter(r=>/\.(mp3|flac|wav|aac|ogg|m4a|alac|opus|wma|aiff)$/i.test(r.name));if(!a.length)return;const n=[];for(const r of a){const s=r.path,m=s||URL.createObjectURL(r),d=r.name,l=d.lastIndexOf("."),g=l>0?d.slice(0,l):d,y=l>0?d.slice(l+1).toUpperCase():"AUDIO",k={id:s||"imp_"+Math.random().toString(36).slice(2,9),title:g,artist:"Unknown Artist",album:"Folder Import",duration:0,path:m,codec:y,specs:"Local File",source:"import"};await Yt(r,k),n.push(k)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(r=>e==null?void 0:e.queue.push(r)),j("melo:play-tracks",{tracks:n,index:0}),pt(`${n.length} file(s) added from folder`)},i.click()}document.addEventListener("click",t=>{var i;const e=(i=t.target)==null?void 0:i.closest("#btnAddFiles, #btnAddFolder, #btnThemeToggle");e&&(e.id==="btnAddFiles"?Fe():e.id==="btnAddFolder"?We():e.id==="btnThemeToggle"&&Ne(Bt==="light"?"dark":"light"))});window.addEventListener("keydown",t=>{(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="o"&&(t.shiftKey?(t.preventDefault(),We()):(t.preventDefault(),Fe())),((t.ctrlKey||t.metaKey)&&t.key===","||t.key==="F2")&&(t.preventDefault(),de("win-settings"))});function Ie(t){var k,A;function e(L){document.querySelectorAll(".settings-tab").forEach(b=>{b.classList.toggle("active",b.dataset.stab===L)}),document.querySelectorAll(".settings-section[data-panel]").forEach(b=>{b.classList.toggle("active",b.dataset.panel===L)}),localStorage.setItem("melo-settings-tab",L)}document.querySelectorAll(".settings-tab").forEach(L=>{L.addEventListener("click",()=>e(L.dataset.stab))}),e(localStorage.getItem("melo-settings-tab")||"general"),document.querySelectorAll(".switch[data-key]").forEach(L=>{const b=L.dataset.key,H=localStorage.getItem("melo-pref-"+b);H!==null&&L.classList.toggle("on",H==="1"),L.onclick=()=>{L.classList.toggle("on");const $=L.classList.contains("on");localStorage.setItem("melo-pref-"+b,$?"1":"0"),t($?"Enabled":"Disabled"),j("melo:pref-changed",{key:b,value:$})}});const i=document.getElementById("setLanguage");i&&(i.value=oa(),i.onchange=async()=>{await Ue(i.value),t(`Language set to ${i.options[i.selectedIndex].text} — restart Melo to fully apply`)});const a=document.getElementById("swDynamicTheme");if(a){const L=localStorage.getItem("melo-dynamic-theme")!=="0";a.classList.toggle("on",L),a.onclick=()=>{var Q,lt;const b=!a.classList.contains("on");a.classList.toggle("on",b),localStorage.setItem("melo-dynamic-theme",b?"1":"0");const H=window.__LUMI_QUEUE__,$=(lt=(Q=window.LumiPlayer)==null?void 0:Q.currentIndex)!=null?lt:0;H&&H[$]&&Ce(b?H[$].cover:null),t(b?"Dynamic theme enabled":"Dynamic theme disabled")}}const n=document.getElementById("skinSelect"),r=document.getElementById("btnSkinThemeToggle"),s=document.getElementById("btnRefreshSkins"),m=document.getElementById("btnOpenSkinsFolder"),d=document.getElementById("skinThemeIcon"),l=document.getElementById("skinThemeLabel");function g(L){d&&(d.textContent=L==="dark"?"🌙":"☀️"),l&&(l.textContent=L==="dark"?"Dark":"Light")}g(Bt),r==null||r.addEventListener("click",()=>{const L=Bt==="dark"?"light":"dark";Ne(L),g(L),t(L==="dark"?"Dark theme":"Light theme")}),ot("melo:theme",L=>{(L==="light"||L==="dark")&&g(L)});async function y(){if(!n)return;const L=localStorage.getItem("melo-active-skin-id")||"default",b=await Pe();n.innerHTML=`
      <option value="default">Default Melo (Standard)</option>
      <option value="compact-pill">Minimal Compact (Pill Bar)</option>
    `,b.forEach(H=>{if(H.filename!=="compact-pill-light.html"&&H.filename!=="compact-pill-dark.html"){const $=document.createElement("option");$.value=H.filename,$.textContent=`${H.name} (${H.filename})`,n.appendChild($)}}),n.value=L}y(),n&&(n.onchange=()=>{const L=n.value;Ot(L,Bt,t)}),s==null||s.addEventListener("click",async()=>{await y();const L=localStorage.getItem("melo-active-skin-id")||"default";Ot(L,Bt,t),t("Skins reloaded from disk")}),m==null||m.addEventListener("click",()=>{Re(t)}),(k=document.getElementById("btn-reset-skin-settings"))==null||k.addEventListener("click",()=>{le(t),n&&(n.value="default")}),(A=document.getElementById("btn-settings-reset"))==null||A.addEventListener("click",()=>{localStorage.clear(),t("Settings reset — reloading..."),setTimeout(()=>location.reload(),600)})}function je(){document.querySelectorAll(".win-btn").forEach(t=>{t.onclick=async()=>{const e=t.getAttribute("aria-label");if(window.__TAURI__){const{getCurrentWindow:i}=await Z(async()=>{const{getCurrentWindow:n}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:n}},__vite__mapDeps([8,7,1,0])),a=i();e==="minimize"?a.minimize():e==="maximize"?a.toggleMaximize():e==="close"&&a.close()}else e==="close"&&pt("Window close requires the Tauri desktop build"),e==="maximize"&&pt("Resize: drag corner handle")}})}je();window.__LUMI_REBIND_MAIN__=()=>{je(),Object.entries(Ve).forEach(([t,e])=>{const i=document.getElementById(t);i&&(i.onclick=()=>de(e))})};const Nt=document.createElement("div");Nt.id="scanBar";document.body.appendChild(Nt);let _e=0;ot("melo:scan-progress",t=>{if(!t)return;const e=t.total?Math.round(t.done/t.total*100):100;Nt.style.opacity="1",Nt.style.width=e+"%",clearTimeout(_e),(t.finished||t.total&&t.done>=t.total)&&(_e=setTimeout(()=>{Nt.style.opacity="0",Nt.style.width="0"},800))});ut&&!ht&&ot("melo:scan-batch",t=>{const e=window.LumiLibrary;e&&Array.isArray(t)&&t.length&&(t.forEach(i=>i.source="scan"),e.addTracks(t,!0),e.addToCurrentPlaylist(t))});const Ut=document.createElement("div");Ut.id="aboutPop";Ut.style.display="none";document.body.appendChild(Ut);document.addEventListener("click",t=>{var e,i;(e=t.target)!=null&&e.closest("#btnAbout")&&(t.stopPropagation(),Ut.innerHTML=`
    <div class="about-head">Melo <b>0.3 Beta</b></div>
    <div style="font-size:11.5px; color:var(--text-soft); margin:6px 0 10px;">
      Modern Windows Music Player<br/>
      Tauri 2 + TypeScript + Rust
    </div>
    <a class="about-link" id="aboutLink" href="https://github.com/Arvanta/Melo" rel="noopener">github.com/Arvanta/Melo ↗</a>`,Ut.style.display=Ut.style.display==="none"?"block":"none",(i=document.getElementById("aboutLink"))==null||i.addEventListener("click",a=>{a.preventDefault();const n="https://github.com/Arvanta/Melo";ut?Z(()=>import("./core-DhEqZVGG.js"),[]).then(r=>r.invoke("open_url",{url:n})).catch(()=>window.open(n,"_blank")):window.open(n,"_blank")}))});document.addEventListener("click",t=>{!t.target.closest("#aboutPop")&&!t.target.closest("#btnAbout")&&(Ut.style.display="none")});ut&&ht?ht==="library"||ht==="playlist"?ye(Mt,pt):ht==="equalizer"?be(Mt,pt,{remote:!0}):ht==="lyrics"?xe(Mt):ht==="settings"&&(Le(),Ie(pt)):(Ke(Mt,pt),ye(Mt,pt),be(Mt,pt),ta(Mt),xe(Mt),aa(pt),Ie(pt),Le(),setTimeout(()=>{if(localStorage.getItem("melo-pref-resume")!=="0")try{const t=JSON.parse(localStorage.getItem("melo-resume-state")||"null"),e=window.LumiLibrary,i=window.LumiPlayer;if(!(t!=null&&t.trackId)||!e||!i)return;const a=e.tracks,n=a.findIndex(r=>r.id===t.trackId);if(n===-1)return;i.queue=a,i.loadTrack(n,!1,t.position||0)}catch{}},400));pt("Melo 0.3 Beta is ready");
//# sourceMappingURL=index-IOxaFat_.js.map
