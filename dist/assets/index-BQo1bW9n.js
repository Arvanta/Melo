const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/event-CNdo2oXa.js","assets/core-DhEqZVGG.js","assets/index-DiyoAAdc.js","assets/index-CHth0gh2.js","assets/index-Bq0iOnRE.js","assets/index-CS3Qnt9j.js","assets/webviewWindow-mjQkSB26.js","assets/dpi-fvP-W2qr.js","assets/window-BWd3Cypy.js"])))=>i.map(i=>d[i]);
(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))e(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&e(r)}).observe(document,{childList:!0,subtree:!0});function a(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function e(n){if(n.ep)return;n.ep=!0;const o=a(n);fetch(n.href,o)}})();const Ne="modulepreload",Fe=function(t){return"/"+t},le={},F=function(i,a,e){let n=Promise.resolve();if(a&&a.length>0){let r=function(c){return Promise.all(c.map(u=>Promise.resolve(u).then(v=>({status:"fulfilled",value:v}),v=>({status:"rejected",reason:v}))))};document.getElementsByTagName("link");const p=document.querySelector("meta[property=csp-nonce]"),m=(p==null?void 0:p.nonce)||(p==null?void 0:p.getAttribute("nonce"));n=r(a.map(c=>{if(c=Fe(c),c in le)return;le[c]=!0;const u=c.endsWith(".css"),v=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${v}`))return;const b=document.createElement("link");if(b.rel=u?"stylesheet":Ne,u||(b.as="script"),b.crossOrigin="",b.href=c,m&&b.setAttribute("nonce",m),document.head.appendChild(b),u)return new Promise((S,w)=>{b.addEventListener("load",S),b.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${c}`)))})}))}function o(r){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=r,window.dispatchEvent(p),!p.defaultPrevented)throw r}return n.then(r=>{for(const p of r||[])p.status==="rejected"&&o(p.reason);return i().catch(o)})},Q=typeof window.__TAURI_INTERNALS__<"u"||typeof window.__TAURI__<"u";async function U(t,i){if(Q)try{const{emit:a}=await F(async()=>{const{emit:e}=await import("./event-CNdo2oXa.js");return{emit:e}},__vite__mapDeps([0,1]));await a(t,i);return}catch{}window.dispatchEvent(new CustomEvent(t,{detail:i}))}function X(t,i){Q&&F(async()=>{const{listen:a}=await import("./event-CNdo2oXa.js");return{listen:a}},__vite__mapDeps([0,1])).then(({listen:a})=>{a(t,e=>{i(e.payload)})}).catch(()=>{}),window.addEventListener(t,a=>i(a.detail))}let re=!1;async function We(){if(!re){re=!0;try{const t=globalThis;if(typeof t.Buffer>"u"){const i=await F(()=>import("./index-DiyoAAdc.js").then(a=>a.i),__vite__mapDeps([2,3]));t.Buffer=i.Buffer}typeof t.process>"u"&&(t.process={env:{},browser:!0,nextTick:i=>setTimeout(i,0)})}catch{}}}async function je(t,i){var a;try{await We();const e=await F(()=>import("./index-Bq0iOnRE.js").then(c=>c.i),__vite__mapDeps([4,3])),n=e&&typeof e.parseBlob=="function"?e:e.default||e,o=await Promise.race([n.parseBlob(t),new Promise((c,u)=>setTimeout(()=>u(new Error("timeout")),1800))]),r=o==null?void 0:o.common;if(!r)return;r.title&&(i.title=r.title),r.artist?i.artist=r.artist:r.artists&&r.artists[0]&&(i.artist=r.artists[0]),r.album&&(i.album=r.album),r.genre&&r.genre[0]&&(i.genre=r.genre[0]),r.year&&(i.year=r.year);const p=(a=r.picture)==null?void 0:a[0];if(p&&p.data){const c=p.format||"image/jpeg",u=p.data;if(u.length>6e5)return;let v="";const b=8192;for(let S=0;S<u.length;S+=b){const w=u.subarray(S,S+b);v+=String.fromCharCode.apply(null,w)}i.cover=`data:${c};base64,${btoa(v)}`}const m=o==null?void 0:o.format;m&&m.duration&&!i.duration&&(i.duration=Math.floor(m.duration))}catch{}}async function xe(t,i,a=1800){return await je(t,i),i}async function Ge(t){return new Promise(i=>{if(!t)return i(null);const a=new Image;a.crossOrigin="anonymous",a.onload=()=>{try{const e=document.createElement("canvas"),n=e.getContext("2d");if(!n)return i(null);e.width=40,e.height=40,n.drawImage(a,0,0,40,40);const o=n.getImageData(0,0,40,40).data;let r={r:42,g:123,b:214},p=-1;for(let m=0;m<o.length;m+=4){const c=o[m],u=o[m+1],v=o[m+2];if(o[m+3]<128)continue;const S=Math.max(c,u,v),w=Math.min(c,u,v),d=(S+w)/510,P=S-w,C=P===0?0:P/(1-Math.abs(2*d-1));if(C>.25&&d>.25&&d<.82){const B=C*1.5+(1-Math.abs(d-.5));B>p&&(p=B,r={r:c,g:u,b:v})}}p>0?i(r):i(null)}catch{i(null)}},a.onerror=()=>i(null),a.src=t})}async function ke(t){const i=localStorage.getItem("melo-dynamic-theme")!=="0",a=document.documentElement;if(!i||!t){a.style.removeProperty("--accent"),a.style.removeProperty("--visualizer"),a.style.removeProperty("--accent-glow");return}const e=await Ge(t);if(e){const n=`rgb(${e.r}, ${e.g}, ${e.b})`;a.style.setProperty("--accent",n),a.style.setProperty("--visualizer",n),a.style.setProperty("--accent-glow",`rgba(${e.r}, ${e.g}, ${e.b}, 0.35)`)}else a.style.removeProperty("--accent"),a.style.removeProperty("--visualizer"),a.style.removeProperty("--accent-glow")}const Ot=[31,62,125,250,500,1e3,2e3,4e3,8e3,16e3];let yt=null,Yt=null,Jt=[],qt=null,Pt=null;function Vt(t){if(!yt){const i=window.AudioContext||window.webkitAudioContext;yt=new i;try{Yt=yt.createMediaElementSource(t)}catch{}if(Jt=Ot.map(a=>{const e=yt.createBiquadFilter();return e.type="peaking",e.frequency.value=a,e.Q.value=1.4,e.gain.value=0,e}),qt=yt.createGain(),qt.gain.value=1,Pt=yt.createAnalyser(),Pt.fftSize=2048,Pt.smoothingTimeConstant=.72,Yt){let a=Yt;for(const e of Jt)a.connect(e),a=e;a.connect(qt),qt.connect(Pt),Pt.connect(yt.destination)}}return{ctx:yt,filters:Jt,gain:qt,analyser:Pt,async resume(){yt&&yt.state==="suspended"&&await yt.resume().catch(()=>{})}}}function Ye(t,i){let a,e,n,o,r,p,m,c=null,u,v,b,S,w,d,P,C,B,j,W,$,s=[],y=0,k=!1,D="off",at=!1;function ot(){if(!s.length)return null;if(D==="one")return y;let l=y+1;if(k&&(l=Math.floor(Math.random()*s.length),l===y&&s.length>1&&(l=(l+1)%s.length)),l>=s.length)if(D==="all")l=0;else return null;return l}window.__LUMI_QUEUE__=s,window.__LUMI_SET_QUEUE__=l=>{s=l,window.__LUMI_QUEUE__=l};function K(l){if(!isFinite(l))return"0:00";const L=Math.floor(l/60),x=Math.floor(l%60).toString().padStart(2,"0");return`${L}:${x}`}function tt(){if(!u)return;const l=parseFloat(u.max)||100,L=parseFloat(u.value)||0,x=l>0?L/l*100:0;u.style.setProperty("--progress",x+"%")}function rt(){v&&v.style.setProperty("--vol",v.value+"%")}async function xt(l){if(!l)return"";if(/^(https?|data|blob):/.test(l))return l;if(Q)try{const{convertFileSrc:L}=await F(async()=>{const{convertFileSrc:x}=await import("./core-DhEqZVGG.js");return{convertFileSrc:x}},[]);return L(l)}catch{}return l}async function lt(l,L=!0,x){if(!s.length)return;l<0&&(l=s.length-1),l>=s.length&&(l=0),y=l;const E=s[l];if(E){if(d||V(),t.src=await xt(E.path),t.load(),x&&x>0){const z=()=>{t.removeEventListener("loadedmetadata",z);try{t.currentTime=x}catch{}};t.addEventListener("loadedmetadata",z)}d&&(d.textContent=E.title||"Unknown Title"),P&&(P.textContent=E.artist||"Unknown Artist"),C&&(C.textContent=E.album||""),B&&(B.textContent=E.codec||"AUDIO"),j&&(j.textContent=E.specs||""),E.cover&&W?(W.src=E.cover,W.style.display="block",$&&($.style.display="none")):(W&&(W.style.display="none"),$&&($.style.display="grid")),u&&(u.max=String(E.duration||240),u.value="0",tt()),S&&(S.textContent=K(E.duration)),b&&(b.textContent="0:00"),M(),ke(E.cover||null),document.querySelectorAll(".track-row").forEach((z,H)=>{var Z;z.classList.toggle("active",((Z=s[H])==null?void 0:Z.id)===E.id)}),"mediaSession"in navigator&&(navigator.mediaSession.metadata=new MediaMetadata({title:E.title,artist:E.artist,album:E.album,artwork:E.cover?[{src:E.cover,sizes:"512x512",type:"image/jpeg"}]:[]}),navigator.mediaSession.setActionHandler("play",()=>ct()),navigator.mediaSession.setActionHandler("pause",()=>kt()),navigator.mediaSession.setActionHandler("previoustrack",()=>f()),navigator.mediaSession.setActionHandler("nexttrack",()=>h()),navigator.mediaSession.setActionHandler("seekto",z=>{z.seekTime&&(t.currentTime=z.seekTime)})),L&&ct();try{const{cover:z,...H}=E;localStorage.setItem("melo-current-track",JSON.stringify(H))}catch{}window.dispatchEvent(new CustomEvent("lumi:trackChange",{detail:E})),U("melo:track-changed",E),U("melo:playback-state",{track:E,currentTime:t.currentTime||0,paused:t.paused})}}let st=!1;async function ut(){try{await Vt(t).resume()}catch{}st&&(st=!1,t.play().then(()=>{e&&(e.style.display="none"),n&&(n.style.display="block")}).catch(()=>{}))}window.addEventListener("pointerdown",ut),window.addEventListener("keydown",ut),X("melo:pref-changed",l=>{l&&l.key==="replayGainGlobal"&&M(),l&&l.key==="showStopBtn"&&T(!!l.value)}),X("melo:request-playback-state",()=>{const l=s[y]||null;U("melo:playback-state",{track:l,currentTime:t.currentTime||0,paused:t.paused})}),X("melo:seek-playback",l=>{const L=Number(l);Number.isFinite(L)&&L>=0&&(t.currentTime=L)});let mt=null,ht=!1;function It(l,L,x){mt&&cancelAnimationFrame(mt);const E=t.volume,z=performance.now(),H=Z=>{const dt=Math.min(1,(Z-z)/L);t.volume=E+(l-E)*dt,dt<1?mt=requestAnimationFrame(H):(mt=null,x==null||x())};mt=requestAnimationFrame(H)}async function ct(){try{await Vt(t).resume()}catch{}const l=localStorage.getItem("melo-pref-fadePause")==="1",L=_();l&&ht&&(t.volume=0),t.play().then(()=>{st=!1,e&&(e.style.display="none"),n&&(n.style.display="block"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="playing"),l&&ht?(ht=!1,It(L,300)):t.volume=L}).catch(()=>{st||(st=!0,i("Click once inside player to begin audio playback"))})}function kt(){localStorage.getItem("melo-pref-fadePause")==="1"&&!t.paused?(ht=!0,It(0,300,()=>t.pause())):(ht=!1,t.pause()),e&&(e.style.display="block"),n&&(n.style.display="none"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused");const L=s[y];if(L)try{localStorage.setItem("melo-resume-state",JSON.stringify({trackId:L.id,position:t.currentTime}))}catch{}}function St(){t.paused?ct():kt()}function Et(){t.pause();try{t.currentTime=0}catch{}e&&(e.style.display="block"),n&&(n.style.display="none"),u&&(u.value="0",tt()),b&&(b.textContent="0:00"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}function h(){if(!s.length)return;if(D==="one"){t.currentTime=0,ct();return}const l=ot();if(l===null){kt();return}lt(l)}function f(){if(!s.length)return;if(t.currentTime>3){t.currentTime=0;return}let l=y-1;k&&(l=Math.floor(Math.random()*s.length)),l<0&&(D==="all"?l=s.length-1:l=0),lt(l)}function _(){var H;const l=s[y];if(!v)return 1;const L=parseInt(v.value,10)/100,E=localStorage.getItem("melo-pref-replayGainGlobal")!=="0"&&(H=l==null?void 0:l.replayGain)!=null?H:0,z=Math.pow(10,E/20);return Math.min(1,Math.max(0,L*z))}function M(){!s[y]||!v||(t.volume=_())}function T(l=localStorage.getItem("melo-pref-showStopBtn")==="1"){const L=document.getElementById("btnStop");L&&L.style.setProperty("display",l?"inline-flex":"none","important")}function V(){if(a=document.getElementById("btnPlay"),e=document.getElementById("iconPlay"),n=document.getElementById("iconPause"),o=document.getElementById("btnPrev"),r=document.getElementById("btnNext"),p=document.getElementById("btnShuffle"),m=document.getElementById("btnRepeat"),c=document.getElementById("btnStop"),T(),u=document.getElementById("seekBar"),v=document.getElementById("volBar"),b=document.getElementById("curTime"),S=document.getElementById("durTime"),w=document.getElementById("volPct"),d=document.getElementById("trackTitle"),P=document.getElementById("trackArtist"),C=document.getElementById("trackAlbum"),B=document.getElementById("trackCodec"),j=document.getElementById("trackSpecs"),W=document.getElementById("coverImg"),$=document.getElementById("coverFallback"),a&&(a.onclick=St),c&&(c.onclick=Et),o&&(o.onclick=f),r&&(r.onclick=h),p&&(p.onclick=()=>{k=!k,p.classList.toggle("active",k),i(k?"Shuffle on":"Shuffle off")}),m&&(m.onclick=()=>{D=D==="off"?"all":D==="all"?"one":"off",m.classList.toggle("active",D!=="off");const l={off:"Repeat off",all:"Repeat all",one:"Repeat one"};i(l[D]),m.title=l[D]}),u&&(u.oninput=()=>{at=!0,b&&(b.textContent=K(parseFloat(u.value))),tt()},u.onchange=()=>{t.currentTime=parseFloat(u.value),at=!1}),v&&(v.oninput=()=>{rt(),w&&(w.textContent=v.value+"%"),M()}),tt(),rt(),s[y]){const l=s[y];d&&(d.textContent=l.title||"Unknown Title"),P&&(P.textContent=l.artist||"Unknown Artist"),C&&(C.textContent=l.album||""),B&&(B.textContent=l.codec||"AUDIO"),j&&(j.textContent=l.specs||""),l.cover&&W&&(W.src=l.cover,W.style.display="block",$&&($.style.display="none"))}}V(),t.addEventListener("timeupdate",()=>{U("melo:playback-position",t.currentTime||0),!at&&u&&b&&(u.value=String(Math.floor(t.currentTime)),b.textContent=K(t.currentTime),tt()),A()});let R=null;function A(){R||(R=setTimeout(()=>{R=null;const l=s[y];if(!(!l||t.paused))try{localStorage.setItem("melo-resume-state",JSON.stringify({trackId:l.id,position:t.currentTime}))}catch{}},4e3))}t.addEventListener("loadedmetadata",()=>{var L;if(!u||!S)return;const l=Math.floor(t.duration||((L=s[y])==null?void 0:L.duration)||240);u.max=String(l),S.textContent=K(l),tt()}),t.addEventListener("ended",()=>{h()}),window.addEventListener("keydown",l=>{l.target.tagName!=="INPUT"&&(l.code==="Space"&&(l.preventDefault(),St()),l.code==="ArrowRight"&&(t.currentTime+=5),l.code==="ArrowLeft"&&(t.currentTime-=5),(l.key==="m"||l.key==="M")&&(t.muted=!t.muted,i(t.muted?"Muted":"Unmuted")),(l.key==="s"||l.key==="S")&&p&&p.click(),(l.key==="r"||l.key==="R")&&m&&m.click(),l.code==="ArrowUp"&&v&&(v.value=String(Math.min(100,parseInt(v.value,10)+5)),v.dispatchEvent(new Event("input"))),l.code==="ArrowDown"&&v&&(v.value=String(Math.max(0,parseInt(v.value,10)-5)),v.dispatchEvent(new Event("input"))))}),X("melo:tray-action",l=>{l==="play_pause"?St():l==="next"?h():l==="prev"?f():l==="mute"&&(t.muted=!t.muted,i(t.muted?"Muted":"Unmuted"))}),window.LumiPlayer={get queue(){return s},set queue(l){s=l,window.__LUMI_QUEUE__=l},get currentIndex(){return y},loadTrack:lt,play:ct,pause:kt,stop:Et,next:h,prev:f,get audio(){return t},rebind:V},window.__LUMI_REBIND__=V,X("melo:play-tracks",l=>{if(!l||!Array.isArray(l.tracks)||!l.tracks.length)return;s=l.tracks,window.__LUMI_SET_QUEUE__(s);const L=Math.max(0,Math.min(l.index||0,s.length-1));lt(L,!0)})}new URLSearchParams(location.search).get("panel");const J=t=>String(t!=null?t:"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");function se(t){const i=Number.isFinite(t)?Math.max(0,t):0;return`${Math.floor(i/60)}:${String(Math.floor(i%60)).padStart(2,"0")}`}function ce(t,i){const a=document.getElementById("trackList"),e=document.getElementById("libraryStats"),n=document.getElementById("searchInput"),o=document.getElementById("libraryTabs"),r=document.getElementById("btn-scan"),p=document.getElementById("winPlaylistTracks"),m=document.getElementById("winPlaylistEmpty"),c=document.getElementById("playlistSelect"),u=document.getElementById("playlistSearchInput"),v=document.getElementById("playlistSortSelect"),b=document.getElementById("btn-clear-playlist"),S=document.getElementById("btn-export-playlist"),w=document.getElementById("btn-new-playlist");let d=null,P=null,C=!1,B=localStorage.getItem("melo-currentPlaylist")||"p1",j=[],W=null,$=[],s="artists",y=null,k=null,D=null,at="";const ot=54,K=52;let tt=0,rt=0,xt=0,lt=0;function st(g){if(!g)return"";if(/^(data:|blob:|https?:)/i.test(g))return g;try{return P?P(g):""}catch{return""}}function ut(g){return{...g,cover:st(g.cover),source:"scan"}}const mt=[],ht=new Set;let It=0;function ct(g,I){!g||!d||ht.has(g)||(ht.add(g),mt.push({id:g,element:I}),kt())}function kt(){for(;d&&It<2&&mt.length;){const g=mt.shift();It++,d("ensure_track_artwork",{id:g.id}).then(I=>{if(!I||!g.element.isConnected)return;const N=st(I),O=$.find(G=>G.id===g.id);O&&(O.cover=N),g.element.style.backgroundImage=`url("${N.replace(/"/g,"%22")}")`,g.element.textContent=""}).catch(()=>{}).finally(()=>{It--,ht.delete(g.id),kt()})}}function St(g){const I=[...g.querySelectorAll("[data-artwork-id]")];if(!("IntersectionObserver"in window)){I.forEach(O=>ct(O.dataset.artworkId,O));return}const N=new IntersectionObserver(O=>{O.forEach(G=>{if(!G.isIntersecting)return;const q=G.target;N.unobserve(q),ct(q.dataset.artworkId,q)})},{root:g,rootMargin:"120px"});I.forEach(O=>N.observe(O))}async function Et(){if(C)return;if(!Q){C=!0,h();return}const g=await F(()=>import("./core-DhEqZVGG.js"),[]);d=g.invoke,P=g.convertFileSrc,C=!0,await Promise.all([f(),L()]),await A(!0),await x(!0)}function h(){a&&(a.innerHTML='<div style="padding:30px;text-align:center;color:var(--text-muted)">The persistent Library is available in the Tauri desktop build.</div>')}async function f(){if(!(!d||!e))try{const g=await d("library_stats");e.textContent=`${g.tracks} tracks • ${g.artists} artists • ${g.albums} albums`}catch{}}function _(){y=k=D=null,a&&(a.scrollTop=0)}function M(){return s==="artists"?y&&k?"tracks":"groups":s==="albums"?k?"tracks":"groups":D?"tracks":"groups"}function T(){return s==="artists"&&y?"albums":s}function V(){return s==="artists"&&y?k?`${y} › ${k==="__ALL__"?"All tracks":k}`:y:s==="albums"&&k?k:s==="genres"&&D?D:""}async function R(g,I){if(!d)return{items:[],total:0,limit:I,offset:g};if(M()==="groups")return d("library_groups",{kind:T(),search:at||null,artist:s==="artists"?y:null,limit:I,offset:g});const N=await d("library_tracks",{search:at||null,artist:y,album:k==="__ALL__"?null:k,genre:D,sort:"title-asc",limit:I,offset:g});return N.items=N.items.map(ut),$=N.items,N}async function A(g=!1){if(!a||!d)return;g&&(a.scrollTop=0),a.style.display="block",a.style.position="relative",a.style.overflowY="auto";const I=Math.max(300,a.clientHeight||420),N=Math.ceil(I/ot),O=Math.max(0,Math.floor(a.scrollTop/ot)-8),G=Math.max(40,N+16),q=++tt;try{const ft=await R(O,G);if(q!==tt)return;const Y=V(),vt=Y?38:0,Oe=ft.total*ot+vt,De=ft.items.map((ee,Gt)=>{const ie=ft.offset+Gt,ae=vt+ie*ot;if(M()==="groups"){const zt=ee,ne=st(zt.cover),oe=`lib-avatar ${T()==="albums"?"lib-avatar-album":""}`,Ue=T()==="albums"?"💿":J((zt.name[0]||"?").toUpperCase()),Ve=ne?`<div class="${oe}" style="background-image:url('${J(ne)}')"></div>`:`<div class="${oe}" data-artwork-id="${J(zt.artworkTrackId||"")}">${Ue}</div>`;return`<div class="lib-item virtual-row" data-group-index="${Gt}" style="position:absolute;left:0;right:0;top:${ae}px;height:${ot}px">${Ve}<div style="flex:1;min-width:0"><div class="t-title">${J(zt.name)}</div><div class="t-artist">${J(zt.subtitle||`${zt.count} tracks`)}</div></div><span class="chev-r">›</span></div>`}const Lt=ee;return`<div class="track-row virtual-row" data-track-id="${J(Lt.id)}" data-page-index="${Gt}" style="position:absolute;left:0;right:0;top:${ae}px;height:${ot}px">
          <span class="num">${ie+1}</span>
          ${Lt.cover?`<div class="track-cover-mini" style="background-image:url('${J(Lt.cover)}');background-size:cover;background-position:center"></div>`:`<div class="track-cover-mini cover-default" data-artwork-id="${J(Lt.id)}">♪</div>`}
          <div style="flex:1;min-width:0"><div class="t-title">${J(Lt.title)}</div><div class="t-artist">${J(Lt.artist)} • ${J(Lt.album)}</div></div>
          <span class="t-dur">${se(Lt.duration)}</span>
          <button class="btn small ghost" data-add-track="${J(Lt.id)}" title="Add to current playlist">+</button>
        </div>`}).join(""),He=Y?`<div class="lib-crumb virtual-crumb" style="position:sticky;top:0;height:${vt}px;z-index:3;background:var(--card)"><button class="btn small" id="virtualBack">‹ Back</button><b>${J(Y)}</b>${s==="artists"&&y&&!k?'<button class="btn small" id="virtualAllTracks">All tracks</button>':""}</div>`:"";a.innerHTML=`<div class="virtual-list-space" style="position:relative;height:${Math.max(Oe,I)}px">${He}${De}</div>`,l(ft.items),St(a)}catch{a.innerHTML='<div style="padding:24px;text-align:center;color:var(--text-muted)">Could not read the Library database.</div>'}}function l(g){var I,N;a&&(a.querySelectorAll("[data-group-index]").forEach(O=>{O.onclick=()=>{const G=g[Number(O.dataset.groupIndex||0)],q=(G==null?void 0:G.name)||"",ft=(G==null?void 0:G.key)||q;if(s==="artists"&&!y)y=q;else if(s==="artists"&&y||s==="albums"){const Y=ft.split("\0");s==="albums"&&(y=Y[0]||null),k=Y[1]||q}else s==="genres"&&(D=q);A(!0)}}),a.querySelectorAll("[data-add-track]").forEach(O=>{O.onclick=async G=>{G.stopPropagation(),!(!d||!O.dataset.addTrack)&&(await d("add_tracks_to_playlist",{playlistId:B,trackIds:[O.dataset.addTrack]}),U("melo:playlist-changed",{playlistId:B}))}}),a.querySelectorAll("[data-track-id]").forEach(O=>{O.onclick=G=>{if(G.target.closest("[data-add-track]"))return;const q=Number(O.dataset.pageIndex||0),ft=g.filter(Y=>"path"in Y).map(ut);U("melo:play-tracks",{tracks:ft,index:q})},O.oncontextmenu=async G=>{G.preventDefault();const q=O.dataset.trackId;!q||!d||confirm("Remove this track from the Library?")&&(await d("delete_tracks",{ids:[q]}),U("melo:library-changed",{removed:1}))}}),(I=a.querySelector("#virtualBack"))==null||I.addEventListener("click",()=>{k?k=null:y?y=null:D=null,A(!0)}),(N=a.querySelector("#virtualAllTracks"))==null||N.addEventListener("click",()=>{k="__ALL__",A(!0)}))}async function L(){var g;d&&(j=await d("list_playlists"),j.some(I=>I.id===B)||(B=((g=j[0])==null?void 0:g.id)||"p1"),localStorage.setItem("melo-currentPlaylist",B),c&&(c.innerHTML=j.map(I=>`<option value="${J(I.id)}" ${I.id===B?"selected":""}>${J(I.name)} (${I.trackCount})</option>`).join("")))}async function x(g=!1){if(!p||!d)return;g&&(p.scrollTop=0),p.style.display="block",p.style.position="relative",p.style.overflowY="auto";const I=Math.max(260,p.clientHeight||420),N=Math.max(0,Math.floor(p.scrollTop/K)-8),O=Math.max(40,Math.ceil(I/K)+16),G=++rt,q=await d("playlist_tracks",{playlistId:B,search:(u==null?void 0:u.value)||null,sort:(v==null?void 0:v.value)||"default",limit:O,offset:N});if(G!==rt)return;if(q.items=q.items.map(ut),$=q.items,m&&(m.style.display=q.total?"none":"block"),p.style.display=q.total?"block":"none",!q.total){p.innerHTML="";return}const ft=q.items.map((Y,vt)=>`<div class="track-row virtual-row" data-pl-track="${J(Y.id)}" data-page-index="${vt}" style="position:absolute;left:0;right:0;top:${(q.offset+vt)*K}px;height:${K}px"><span class="num">${q.offset+vt+1}</span>${Y.cover?`<div class="track-cover-mini" style="background-image:url('${J(Y.cover)}');background-size:cover;background-position:center"></div>`:`<div class="track-cover-mini cover-default" data-artwork-id="${J(Y.id)}">♪</div>`}<div style="flex:1;min-width:0"><div class="t-title">${J(Y.title)}</div><div class="t-artist">${J(Y.artist)} • ${J(Y.album)}</div></div><span class="t-dur">${se(Y.duration)}</span><button class="btn small ghost" data-remove-track="${J(Y.id)}">×</button></div>`).join("");p.innerHTML=`<div style="position:relative;height:${Math.max(I,q.total*K)}px">${ft}</div>`,St(p),p.querySelectorAll("[data-pl-track]").forEach(Y=>{Y.onclick=vt=>{vt.target.closest("[data-remove-track]")||U("melo:play-tracks",{tracks:q.items,index:Number(Y.dataset.pageIndex||0)})}}),p.querySelectorAll("[data-remove-track]").forEach(Y=>{Y.onclick=async vt=>{vt.stopPropagation(),await d("remove_track_from_playlist",{playlistId:B,trackId:Y.dataset.removeTrack}),U("melo:playlist-changed",{playlistId:B})}})}async function E(g,I){return d?d(g,I):null}async function z(g,I=!0){if(await Et(),!d||!g.length)return[];const O=(await d("import_audio_files",{paths:g,playlistId:I?B:null})).map(ut);return await Promise.all([f(),L(),A(),x()]),U("melo:library-changed",{imported:O.length}),O}async function H(g){return await Et(),d?W||(W=(await d("start_library_scan",{path:g})).scanId,r&&(r.textContent="Cancel Scan"),W):null}async function Z(){if(!Q)return;if(W&&d){await d("cancel_library_scan",{scanId:W});return}const{open:g}=await F(async()=>{const{open:N}=await import("./index-CS3Qnt9j.js");return{open:N}},__vite__mapDeps([5,1])),I=await g({directory:!0,multiple:!1});I&&await H(I)}async function dt(g){if(await Et(),!d)return null;const I=await d("get_track_by_id",{id:g});return I?ut(I):null}o==null||o.querySelectorAll("[data-libtab]").forEach(g=>{g.onclick=()=>{o.querySelectorAll("[data-libtab]").forEach(I=>I.classList.remove("active")),g.classList.add("active"),s=g.dataset.libtab||"artists",_(),A(!0)}}),n==null||n.addEventListener("input",()=>{at=n.value.trim(),window.clearTimeout(xt),xt=window.setTimeout(()=>A(!0),180)}),a==null||a.addEventListener("scroll",()=>{window.clearTimeout(xt),xt=window.setTimeout(()=>A(),60)}),p==null||p.addEventListener("scroll",()=>{window.clearTimeout(lt),lt=window.setTimeout(()=>x(),60)}),u==null||u.addEventListener("input",()=>{window.clearTimeout(lt),lt=window.setTimeout(()=>x(!0),180)}),v==null||v.addEventListener("change",()=>x(!0)),c==null||c.addEventListener("change",()=>{B=c.value,localStorage.setItem("melo-currentPlaylist",B),x(!0)}),r==null||r.addEventListener("click",Z),b==null||b.addEventListener("click",async()=>{await E("clear_playlist",{playlistId:B}),await Promise.all([L(),x(!0)]),U("melo:playlist-changed",{playlistId:B})}),w==null||w.addEventListener("click",async()=>{var N;const g=(N=prompt("New playlist name:"))==null?void 0:N.trim();if(!g)return;const I=await E("create_playlist",{name:g});I&&(B=I.id),await Promise.all([L(),x(!0)])}),S==null||S.addEventListener("click",async()=>{var G;if(!d)return;const g=[];let I=0;for(;;){const q=await d("playlist_tracks",{playlistId:B,search:null,sort:"default",limit:500,offset:I});if(g.push(...q.items),I+=q.items.length,I>=q.total||!q.items.length)break}if(!g.length)return;const N=`#EXTM3U
`+g.map(q=>`#EXTINF:${Math.floor(q.duration)},${q.artist} - ${q.title}
${q.path}`).join(`
`),O=document.createElement("a");O.href=URL.createObjectURL(new Blob([N],{type:"audio/x-mpegurl"})),O.download=`${((G=j.find(q=>q.id===B))==null?void 0:G.name)||"playlist"}.m3u`,O.click(),setTimeout(()=>URL.revokeObjectURL(O.href),1e3)}),Q&&F(async()=>{const{getCurrentWebviewWindow:g}=await import("./webviewWindow-mjQkSB26.js");return{getCurrentWebviewWindow:g}},__vite__mapDeps([6,7,1,0,8])).then(({getCurrentWebviewWindow:g})=>{g().onDragDropEvent(async I=>{if(I.payload.type!=="drop")return;const N=I.payload.paths||[];if(!N.length)return;const O=await z(N,!0);if(O.length)U("melo:play-tracks",{tracks:O,index:0});else for(const G of N)try{await H(G)}catch{}})}).catch(()=>{}),X("melo:scan-progress",async g=>{g&&(g.scanId&&(W=g.scanId),r&&!g.finished&&(r.textContent=`Cancel Scan (${g.done||0}/${g.total||"…"})`),g.finished&&(W=null,r&&(r.textContent="Scan Folder"),await Promise.all([f(),L(),A(),x()])))});let gt=0;X("melo:library-changed",()=>{window.clearTimeout(gt),gt=window.setTimeout(()=>{f(),A(),x()},500)}),X("melo:playlist-changed",()=>{L(),x()}),window.LumiLibrary={get tracks(){return $},get playlists(){return j},scanFolder:H,importPaths:z,getTrack:dt,render:()=>A(),addTracks:()=>{},addToCurrentPlaylist:async g=>{!d||!g.length||(await d("add_tracks_to_playlist",{playlistId:B,trackIds:g.map(I=>I.id)}),U("melo:playlist-changed",{playlistId:B}))},currentPlaylistName:()=>{var g;return((g=j.find(I=>I.id===B))==null?void 0:g.name)||"Playlist"}},Et().catch(()=>i("Could not initialize the Library database"))}const Dt={flat:[0,0,0,0,0,0,0,0,0,0],pop:[-1,2,4,4,2,-1,-1,2,3,3],rock:[4,3,2,-1,-2,-2,1,3,4,4],bass:[6,5,4,2,1,0,-1,-1,-2,-3],treble:[-3,-2,-1,0,1,2,3,5,6,6],dance:[5,4,2,0,-1,-1,2,4,5,3],jazz:[2,1,2,3,2,0,1,2,3,2],classical:[3,2,1,0,0,0,-1,2,3,4],vocal:[-2,-1,0,2,4,4,3,1,0,-1],acoustic:[3,2,1,1,2,2,3,3,2,1],hiphop:[5,4,1,2,-1,-1,1,-1,2,3],metal:[4,2,-1,-2,-1,1,3,4,5,4]};function Xt(t){for(const[i,a]of Object.entries(Dt))if(a.every((e,n)=>e===t[n]))return i;return"custom"}function de(t,i,a={}){const e=!!a.remote,n=document.getElementById("eqEnable"),o=document.getElementById("eqPreset"),r=document.getElementById("btnEqReset"),p=document.getElementById("eqBands"),m=document.getElementById("eqCanvas"),c=m?m.getContext("2d"):null;let u=null,v=[],b=[],S=new Array(Ot.length).fill(0);try{const s=JSON.parse(localStorage.getItem("melo-eq-gains")||"null");Array.isArray(s)&&s.length===Ot.length&&(S=s.map(y=>typeof y=="number"?Math.max(-12,Math.min(12,y)):0))}catch{}let w=localStorage.getItem("melo-eq-preset")||Xt(S),d=localStorage.getItem("melo-eq-enabled")!=="0";function P(){if(!u)try{const s=Vt(t);u=s.ctx,v=s.filters,v.forEach((y,k)=>{y.gain.value=d?S[k]:0})}catch{}}function C(s,y){P(),v[s]&&d&&(v[s].gain.value=y)}function B(s){P(),S=[...s],d&&s.forEach((y,k)=>{v[k]&&(v[k].gain.value=y)}),$()}function j(s){P(),d=s,s?S.forEach((y,k)=>{v[k]&&(v[k].gain.value=y)}):v.forEach(y=>{y.gain.value=0}),$()}e||t&&t.addEventListener("play",()=>{P(),(u==null?void 0:u.state)==="suspended"&&u.resume().catch(()=>{})}),X("melo:eq",s=>{s&&(s.type==="gain"?(e||C(s.idx,s.val),S[s.idx]=s.val,b[s.idx]&&(b[s.idx].value=String(s.val),W(b[s.idx])),o&&(o.value=Xt(S)),$()):s.type==="gains"?(e||B(s.values),S=[...s.values],b.length&&b.forEach((y,k)=>{y.value=String(S[k]),W(y)}),o&&s.preset&&(o.value=s.preset),$()):s.type==="enable"&&(d=!!s.on,e||j(d),n&&(n.checked=d),$()))});function W(s){var D;const y=parseInt(s.value),k=(D=s.parentElement)==null?void 0:D.querySelector(".val");k&&(k.textContent=(y>0?"+":"")+y+"dB")}function $(){if(!m||!c)return;const s=window.devicePixelRatio||1,y=m.clientWidth*s,k=m.clientHeight*s;if(y<=0||k<=0)return;m.width=y,m.height=k,c.clearRect(0,0,y,k);const D=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#2a7bd6",at=S;if(!d){c.strokeStyle="rgba(100,120,150,0.25)",c.lineWidth=2*s,c.beginPath(),c.moveTo(0,k/2),c.lineTo(y,k/2),c.stroke();return}c.strokeStyle=D,c.lineWidth=2.5*s,c.lineJoin="round",c.beginPath(),at.forEach((ot,K)=>{const tt=K/(at.length-1)*y,rt=k/2-ot/12*(k/2-10*s);if(K===0)c.moveTo(tt,rt);else{const xt=(K-1)/(at.length-1)*y,lt=k/2-at[K-1]/12*(k/2-10*s);c.quadraticCurveTo((xt+tt)/2,lt,tt,rt)}}),c.stroke(),at.forEach((ot,K)=>{const tt=K/(at.length-1)*y,rt=k/2-ot/12*(k/2-10*s);c.fillStyle=D,c.beginPath(),c.arc(tt,rt,4*s,0,Math.PI*2),c.fill(),c.fillStyle="white",c.beginPath(),c.arc(tt,rt,2*s,0,Math.PI*2),c.fill()}),c.strokeStyle="rgba(100,120,150,0.3)",c.lineWidth=1*s,c.setLineDash([4*s,4*s]),c.beginPath(),c.moveTo(0,k/2),c.lineTo(y,k/2),c.stroke(),c.setLineDash([])}p&&(p.innerHTML="",Ot.forEach((s,y)=>{const k=S[y]||0,D=document.createElement("div");D.className="eq-band",D.innerHTML=`
        <input type="range" min="-12" max="12" value="${k}" step="1" data-idx="${y}" orient="vertical" />
        <label>${s>=1e3?s/1e3+"k":s}</label>
        <span style="font-size:10px;color:var(--text-muted);min-height:12px;" class="val">${(k>0?"+":"")+k+"dB"}</span>
      `,p.appendChild(D)}),b=Array.from(p.querySelectorAll("input")),b.forEach(s=>{s.addEventListener("input",()=>{const y=parseInt(s.dataset.idx),k=parseInt(s.value);W(s),S[y]=k,$();const D=Xt(S);o&&(o.value=D),localStorage.setItem("melo-eq-gains",JSON.stringify(S)),localStorage.setItem("melo-eq-preset",D),e||C(y,k),U("melo:eq",{type:"gain",idx:y,val:k,values:S})})})),o&&(o.value=w,o.addEventListener("change",()=>{const s=Dt[o.value]||Dt.flat;b.length&&b.forEach((y,k)=>{y.value=String(s[k]),W(y)}),S=[...s],$(),localStorage.setItem("melo-eq-gains",JSON.stringify(S)),localStorage.setItem("melo-eq-preset",o.value),e||B(s),U("melo:eq",{type:"gains",values:s,preset:o.value}),i(`Preset: ${o.options[o.selectedIndex].text}`)})),r&&r.addEventListener("click",()=>{const s=Dt.flat;b.length&&b.forEach((y,k)=>{y.value="0",W(y)}),S=[...s],o&&(o.value="flat"),localStorage.setItem("melo-eq-gains",JSON.stringify(S)),localStorage.setItem("melo-eq-preset","flat"),e||B(s),U("melo:eq",{type:"gains",values:s,preset:"flat"}),$(),i("Equalizer reset to Flat (0dB)")}),n&&(n.checked=d,n.addEventListener("change",()=>{d=n.checked,localStorage.setItem("melo-eq-enabled",d?"1":"0"),e||j(d),U("melo:eq",{type:"enable",on:d}),$(),i(d?"Equalizer On":"Equalizer off — Flat")})),m&&new ResizeObserver(()=>$()).observe(m),$(),window.LumiEqualizer={presets:Dt,frequencies:Ot,displayGains:S,reset:()=>r==null?void 0:r.click()}}const $t=[{id:"bars",label:"Classic Bars"},{id:"thin",label:"Thin Bars"},{id:"line",label:"Spectrum Line"},{id:"mirror",label:"Mirror Bars"},{id:"wave",label:"Oscilloscope"},{id:"spectrumWave",label:"Spectrum Wave"},{id:"blocks",label:"Block Equalizer"}];function Je(t){let i=document.getElementById("vizBars");if(!i)return;let a=d(i),e=a.getContext("2d"),n=null,o=null,r=null,p=null,m=null,c=!1,u=localStorage.getItem("melo-viz-mode")||"bars";$t.some(h=>h.id===u)||(u="bars");let v=0,b=[],S=.45,w=null;function d(h){let f=h.querySelector("canvas");return f||(h.innerHTML="",f=document.createElement("canvas"),h.appendChild(f)),f}function P(){if(!(o&&r))try{const h=Vt(t);n=h.ctx,o=h.analyser,r=new Uint8Array(o.frequencyBinCount),p=new Uint8Array(o.fftSize)}catch{c=!0}}function C(h){const f=r.length,_=((n==null?void 0:n.sampleRate)||44100)/2,M=45,T=Math.min(15e3,_*.95),V=Math.log(M),R=Math.log(T),A=[];for(let l=0;l<h;l++){const L=Math.exp(V+(R-V)*l/h),x=Math.exp(V+(R-V)*(l+1)/h);let E=Math.floor(L/_*f),z=Math.max(E+1,Math.ceil(x/_*f));E<0&&(E=0),z>f&&(z=f);let H=0;for(let Z=E;Z<z;Z++)H+=r[Z];A.push(H/(z-E)/255)}return A}function B(h){const f=performance.now()/1e3,_=Math.pow(Math.abs(Math.sin(f*2.2)),2.5),M=[];for(let T=0;T<h;T++){let V=.42+.26*Math.sin(f*1.35+T*.62)+.2*Math.sin(f*2.9+T*1.31)+Math.random()*.07;V*=.55+.5*_,M.push(Math.max(.04,Math.min(1,V)))}return M}function j(h){const f=performance.now()/1e3,_=.5+.5*Math.pow(Math.abs(Math.sin(f*1.9)),2);for(let M=0;M<h.length;M++){const T=M/h.length;h[M]=128+66*_*(Math.sin(T*Math.PI*6+f*7)*.6+Math.sin(T*Math.PI*13-f*11)*.4)}}function W(h){let f;if(c||!o||!r)f=B(h);else if(o.getByteFrequencyData(r),f=C(h),!f.some(T=>T>.01)&&!t.paused)f=B(h);else for(let T=0;T<h;T++)f[T]*=1+1.7*(T/Math.max(1,h-1));let _=0;for(const M of f)M>_&&(_=M);_>S?S=_:S=Math.max(.35,S*.985),b.length!==h&&(b=new Array(h).fill(0));for(let M=0;M<h;M++){const T=Math.min(1,f[M]/S),V=T>b[M]?.55:.16;b[M]+=(T-b[M])*V}return b}function $(h,f){return getComputedStyle(document.documentElement).getPropertyValue(h).trim()||f}function s(){return a.width/Math.max(1,a.clientWidth)||1}function y(h,f,_,M,T){if(T=Math.min(T,_/2,M/2),e.roundRect){e.roundRect(h,f,_,M,T);return}e.rect(h,f,_,M)}function k(){const h=window.devicePixelRatio||1,f=a.clientWidth||(i==null?void 0:i.clientWidth)||200,_=a.clientHeight||(i==null?void 0:i.clientHeight)||56;f>0&&_>0&&(a.width=Math.round(f*h),a.height=Math.round(_*h))}new ResizeObserver(k).observe(a),k();function D(h,f,_,M){const T=s(),V=$("--visualizer","#38bdf8"),R=$("--accent","#0284c7"),A=h.length,l=f/A,L=Math.max(1.2*T,l*(1-M));for(let x=0;x<A;x++){const E=h[x],z=Math.max(2*T,E*(_-4*T)),H=x*l+(l-L)/2,Z=_-z-1*T,dt=e.createLinearGradient(0,Z,0,_);dt.addColorStop(0,R),dt.addColorStop(1,V),e.fillStyle=dt,e.beginPath(),y(H,Z,L,z,Math.min(L/2,3.5*T)),e.fill()}}function at(h,f,_){const M=s(),T=$("--visualizer","#38bdf8"),V=$("--accent","#0284c7"),R=h.length,A=f/R,l=_/2,L=Math.max(1.5*M,A*.62);for(let x=0;x<R;x++){const E=Math.max(1.5*M,h[x]*(_/2-3*M)),z=x*A+(A-L)/2,H=e.createLinearGradient(0,l-E,0,l+E);H.addColorStop(0,V),H.addColorStop(.5,T),H.addColorStop(1,V),e.fillStyle=H,e.beginPath(),y(z,l-E,L,E*2,Math.min(L/2,3*M)),e.fill()}}function ot(h,f,_){const M=s(),T=$("--visualizer","#38bdf8"),V=$("--accent","#0284c7"),R=h.length,A=[],l=[];for(let x=0;x<R;x++)A.push((x+.5)/R*f),l.push(_-2*M-h[x]*(_-8*M));e.beginPath(),e.moveTo(A[0],_),e.lineTo(A[0],l[0]);for(let x=1;x<R;x++){const E=(A[x-1]+A[x])/2;e.quadraticCurveTo(A[x-1],l[x-1],E,(l[x-1]+l[x])/2)}e.lineTo(A[R-1],l[R-1]),e.lineTo(A[R-1],_),e.closePath();const L=e.createLinearGradient(0,0,0,_);L.addColorStop(0,T),L.addColorStop(1,"transparent"),e.globalAlpha=.18,e.fillStyle=L,e.fill(),e.globalAlpha=1,e.beginPath(),e.moveTo(A[0],l[0]);for(let x=1;x<R;x++){const E=(A[x-1]+A[x])/2;e.quadraticCurveTo(A[x-1],l[x-1],E,(l[x-1]+l[x])/2)}e.lineTo(A[R-1],l[R-1]),e.strokeStyle=V,e.lineWidth=2*M,e.lineJoin="round",e.stroke()}function K(h,f,_){const M=s(),T=$("--visualizer","#38bdf8"),V=$("--accent","#0284c7"),R=_/2,A=h.length,l=h.map((E,z)=>{const H=z/Math.max(1,A-1),Z=Math.pow(Math.sin(Math.PI*H),.28);return Math.max(.7*M,E*Z*(_*.46))}),L=E=>{e.beginPath();for(let z=0;z<A;z++){const H=z/Math.max(1,A-1)*f,Z=R+(E?-l[z]:l[z]);if(z===0)e.moveTo(H,Z);else{const dt=(z-1)/Math.max(1,A-1)*f,gt=R+(E?-l[z-1]:l[z-1]);e.quadraticCurveTo(dt,gt,(dt+H)/2,(gt+Z)/2)}}};L(!0);for(let E=A-1;E>=0;E--){const z=E/Math.max(1,A-1)*f;e.lineTo(z,R+l[E])}e.closePath();const x=e.createLinearGradient(0,0,0,_);x.addColorStop(0,V),x.addColorStop(.5,T),x.addColorStop(1,V),e.fillStyle=x,e.globalAlpha=.3,e.fill(),e.globalAlpha=.18,e.shadowColor=T,e.shadowBlur=8*M,L(!0),e.strokeStyle=T,e.lineWidth=4*M,e.stroke(),L(!1),e.stroke(),e.shadowBlur=0,e.globalAlpha=1,L(!0),e.strokeStyle=V,e.lineWidth=1.2*M,e.stroke(),L(!1),e.stroke(),e.beginPath(),e.moveTo(0,R),e.lineTo(f,R),e.strokeStyle=T,e.globalAlpha=.45,e.lineWidth=.8*M,e.stroke(),e.globalAlpha=1}function tt(h,f,_){const M=s(),T=$("--visualizer","#38bdf8"),V=$("--accent","#0284c7"),R=h.length,A=8,l=Math.max(1*M,f*.0035),L=Math.max(1*M,_*.025),x=Math.max(1,(f-l*(R-1))/R),E=Math.max(1,(_-L*(A-1))/A),z=e.createLinearGradient(0,0,0,_);z.addColorStop(0,V),z.addColorStop(1,T),e.fillStyle=z;for(let H=0;H<R;H++){const Z=Math.max(1,Math.min(A,Math.round(h[H]*A))),dt=H*(x+l);for(let gt=0;gt<Z;gt++){const g=_-(gt+1)*E-gt*L;e.globalAlpha=.58+.42*((gt+1)/A),e.fillRect(dt,g,x,E)}}e.globalAlpha=1}function rt(){const h=a.width,f=a.height,_=s(),M=$("--accent","#0284c7");let T;c||!o||!p?(m||(m=new Uint8Array(1024)),j(m),T=m):(o.getByteTimeDomainData(p),T=p);const V=()=>{e.beginPath();for(let R=0;R<=h;R+=2){const A=Math.min(T.length-1,Math.floor(R/h*T.length)),l=T[A]/255*f;R===0?e.moveTo(R,l):e.lineTo(R,l)}};V(),e.strokeStyle=M,e.globalAlpha=.16,e.lineWidth=6*_,e.lineJoin="round",e.stroke(),V(),e.globalAlpha=1,e.lineWidth=1.8*_,e.stroke()}function xt(){const h=a.width,f=a.height;if(!h||!f)return;if(e.clearRect(0,0,h,f),u==="wave"){rt();return}const M=W(u==="bars"?16:u==="thin"?56:u==="line"?64:u==="spectrumWave"?72:u==="blocks"?22:24);u==="bars"?D(M,h,f,.34):u==="thin"?D(M,h,f,.32):u==="line"?ot(M,h,f):u==="mirror"?at(M,h,f):u==="spectrumWave"?K(M,h,f):u==="blocks"&&tt(M,h,f)}function lt(){v=requestAnimationFrame(lt),xt()}function st(){v||lt()}function ut(h,f=!1){u=h,b=[],localStorage.setItem("melo-viz-mode",h)}function mt(){return w||(w=document.createElement("div"),w.className="viz-menu",w.style.display="none",document.body.appendChild(w),w)}function ht(){const h=mt();h.innerHTML='<div class="viz-menu-label">Visualizer type</div>'+$t.map(f=>`<button class="viz-menu-item ${f.id===u?"active":""}" data-mode="${f.id}">${f.id===u?"✓":""}<span>${f.label}</span></button>`).join(""),h.querySelectorAll("[data-mode]").forEach(f=>{f.addEventListener("click",_=>{_.stopPropagation(),ut(f.dataset.mode),ct()})})}function It(h,f){ht();const _=w;_.style.display="block";const M=_.getBoundingClientRect();_.style.left=Math.max(8,Math.min(h,window.innerWidth-M.width-8))+"px",_.style.top=Math.max(8,Math.min(f,window.innerHeight-M.height-8))+"px"}function ct(){w&&(w.style.display="none")}function kt(){i&&(i.title="Click: next mode • Right-click: choose mode",i.addEventListener("click",()=>{ct();const h=$t.findIndex(f=>f.id===u);ut($t[(h+1)%$t.length].id)}),i.addEventListener("contextmenu",h=>{h.preventDefault(),h.stopPropagation(),It(h.clientX,h.clientY)}))}document.addEventListener("click",h=>{w&&w.style.display!=="none"&&!w.contains(h.target)&&ct()}),document.addEventListener("keydown",h=>{h.key==="Escape"&&ct()});function St(){P(),st(),(n==null?void 0:n.state)==="suspended"&&n.resume().catch(()=>{})}t.addEventListener("play",St),St(),kt(),document.addEventListener("visibilitychange",()=>{document.hidden?(cancelAnimationFrame(v),v=0):st()});function Et(){cancelAnimationFrame(v),v=0,i=document.getElementById("vizBars"),i&&(a=d(i),e=a.getContext("2d"),new ResizeObserver(k).observe(a),k(),kt(),st())}window.__LUMI_REBIND_VISUALIZER__=Et}function pe(t){if(!t||!t.trim())return{isSynced:!1,lines:[],raw:""};const i=[],a=t.split(/\r?\n/),e=/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;let n=!1;for(const o of a){const r=o.trim();if(!r||/^\[[a-z]{2,8}:/i.test(r))continue;const p=[...r.matchAll(e)];if(p.length>0){n=!0;const m=r.replace(e,"").trim();for(const c of p){const u=parseInt(c[1],10),v=parseInt(c[2],10),b=c[3]||"0",S=b.length===2?parseInt(b,10)*10:b.length===1?parseInt(b,10)*100:parseInt(b.slice(0,3),10),w=u*60+v+S/1e3;i.push({time:w,text:m})}}else i.push({time:-1,text:r})}return i.sort((o,r)=>o.time-r.time),{isSynced:n,lines:i,raw:t}}function ue(t,i){var w;const a=document.getElementById("lyricsContainer"),e=document.getElementById("lyricsStatus"),n=document.getElementById("lyricsTrackTitle");let o={isSynced:!1,lines:[]},r=null,p=-1,m=0;async function c(d){if(d.lyrics&&d.lyrics.trim().length>0)return d.lyrics;if(window.__TAURI__)try{const{invoke:P}=await F(async()=>{const{invoke:B}=await import("./core-DhEqZVGG.js");return{invoke:B}},[]),C=await P("get_track_lyrics",{path:d.path});if(C)return C}catch{}return null}async function u(d){if(!d){r=null,o={isSynced:!1,lines:[],raw:""},n&&(n.textContent="No track playing"),v();return}r=d.id,n&&(n.textContent=`${d.title} — ${d.artist}`);const P=await c(d);o=pe(P||""),v()}function v(){if(a){if(a.innerHTML="",p=-1,!o.lines.length){e&&(e.style.display="block",e.innerHTML='No synced lyrics found (.lrc)<br/><span style="font-size:10.5px; opacity:0.7;">Place a matching .lrc file in the song folder or add lyrics in the tag editor.</span>');return}e&&(e.style.display="none"),o.lines.forEach((d,P)=>{const C=document.createElement("div");C.className="lyric-line",C.dataset.idx=String(P),C.dataset.time=String(d.time),C.textContent=d.text||"♪",d.time>=0&&(C.style.cursor="pointer",C.title=`Seek to ${Math.floor(d.time/60)}:${Math.floor(d.time%60).toString().padStart(2,"0")}`,C.addEventListener("click",()=>{U("melo:seek-playback",d.time),window.__TAURI__||(t.currentTime=d.time,t.play().catch(()=>{}))})),a.appendChild(C)})}}function b(){if(!a||!o.isSynced||!o.lines.length)return;const d=window.__TAURI__?m:t.currentTime;let P=-1;for(let C=0;C<o.lines.length&&o.lines[C].time<=d;C++)P=C;if(P!==p){p=P;const C=a.querySelectorAll(".lyric-line");if(C.forEach((B,j)=>{B.classList.toggle("active",j===p),B.classList.toggle("passed",j<p)}),p>=0&&C[p]){const B=C[p],j=a.clientHeight,$=B.offsetTop-a.offsetTop-j/2+B.clientHeight/2;a.scrollTo({top:Math.max(0,$),behavior:"smooth"})}}}t.addEventListener("timeupdate",b),window.addEventListener("lumi:trackChange",d=>{u(d.detail)}),X("melo:track-changed",d=>{u(d)}),X("melo:playback-state",d=>{d&&(m=Number(d.currentTime)||0,d.track&&d.track.id!==r?u(d.track):b())}),X("melo:playback-position",d=>{m=Number(d)||0,b()});const S=window.__LUMI_QUEUE__;if(Array.isArray(S)&&S.length>0)u(S[((w=window.LumiPlayer)==null?void 0:w.currentIndex)||0]);else try{const d=JSON.parse(localStorage.getItem("melo-current-track")||"null");d&&u(d)}catch{}U("melo:request-playback-state"),setTimeout(()=>U("melo:request-playback-state"),250),window.LumiLyrics={loadTrackLyrics:u,parseLRC:pe}}let Mt=null;const me=`<!doctype html>
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
`,he=`<!doctype html>
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
`,Nt={"compact-pill-light.html":me,"compact-pill-dark.html":he,"compact-pill-light":me,"compact-pill-dark":he},Xe=[{id:"compact-pill-light",name:"Minimal Compact (Light)",filename:"compact-pill-light.html"},{id:"compact-pill-dark",name:"Minimal Compact (Dark)",filename:"compact-pill-dark.html"},{id:"full-html-example",name:"Full HTML Example",filename:"full-html-example.html"},{id:"example-custom",name:"Custom CSS Example",filename:"example-custom.html"}];function Me(t){const i=["trackTitle","btnPlay","seekBar","coverImg"];let a=0;for(const e of i)t.includes(e)&&a++;return a>=3}function Ct(t,i){const a=document.getElementById("playerCard");if(!a)return;const e=a._originalHTML||a.innerHTML;a._originalHTML||(a._originalHTML=e),Mt&&(Mt.remove(),Mt=null);let o=[...t.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(v=>v[1]).join(`
`);o&&(Mt=document.createElement("style"),Mt.id="melo-custom-skin",Mt.textContent=o,document.head.appendChild(Mt));const r=Me(t);let p="";const m=t.match(/<body[^>]*>([\s\S]*?)<\/body>/i);m?p=m[1]:p=t.split(/<\/style>/i).pop()||"";const c=document.createElement("div");c.innerHTML=p;const u=c.querySelector("#lumi-player");if(u&&(p=u.innerHTML),r&&p.trim().length>20){const v=p.trim();a.innerHTML=v,i&&i("Skin applied"),setTimeout(()=>{var S,w;(S=window.__LUMI_REBIND__)==null||S.call(window);const b=window.__LUMI_AUDIO__;b&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(b),(w=window.__LUMI_REBIND_MAIN__)==null||w.call(window)},40)}else o&&i&&i("Skin CSS applied");localStorage.setItem("lumi-custom-skin",t),localStorage.setItem("lumi-custom-skin-isFull",r?"1":"0")}function Zt(t,i=!0){document.documentElement.classList.remove("compact-skin-active"),document.body.classList.remove("compact-skin-active"),Mt&&(Mt.remove(),Mt=null);const a=document.getElementById("playerCard");a&&a._originalHTML&&(a.innerHTML=a._originalHTML,setTimeout(()=>{var n,o;(n=window.__LUMI_REBIND__)==null||n.call(window);const e=window.__LUMI_AUDIO__;e&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(e),(o=window.__LUMI_REBIND_MAIN__)==null||o.call(window)},40)),localStorage.removeItem("lumi-custom-skin"),localStorage.removeItem("lumi-custom-skin-isFull"),localStorage.setItem("melo-active-skin-id","default"),i&&U("melo:skin-changed","default"),t&&t("Switched to Default Melo skin")}async function Se(){if(Q)try{const{invoke:t}=await F(async()=>{const{invoke:a}=await import("./core-DhEqZVGG.js");return{invoke:a}},[]),i=await t("list_installed_skins");if(Array.isArray(i)&&i.length>0)return i}catch{}return Xe}async function Ee(t,i){if(Q)try{const{invoke:e}=await F(async()=>{const{invoke:o}=await import("./core-DhEqZVGG.js");return{invoke:o}},[]),n=await e("read_skin_file",{filenameOrPath:t});if(n&&n.trim().length>0)return Ct(n,i),!0}catch{}try{const e=t.startsWith("skins/")?t:`skins/${t}`,n=await fetch(e);if(n.ok){const o=await n.text();return Ct(o,i),!0}}catch{}const a=t.replace(/^.*[\\/]/,"");return Nt[a]?(Ct(Nt[a],i),!0):(i&&i(`Could not load skin: ${t}`),!1)}async function At(t,i,a,e=!0){if(t==="default"){Zt(a,e);return}let n=t;const o=t==="compact-pill"||t.startsWith("compact-pill");document.documentElement.classList.toggle("compact-skin-active",o),document.body.classList.toggle("compact-skin-active",o),o?n=i==="dark"?"compact-pill-dark.html":"compact-pill-light.html":!n.endsWith(".html")&&!n.endsWith(".htm")&&(n=n+".html");let r=!1;o&&Nt[n]?(Ct(Nt[n],a),r=!0):r=await Ee(n,a),r&&(localStorage.setItem("melo-active-skin-id",t),e&&U("melo:skin-changed",t))}async function Le(t){if(Q)try{const{invoke:i}=await F(async()=>{const{invoke:a}=await import("./core-DhEqZVGG.js");return{invoke:a}},[]);await i("open_skins_folder"),t&&t("Opening skins folder...")}catch{t&&t("Could not open skins folder")}else t&&t("Skins are located in the skins/ folder")}function Ze(t){const i=document.getElementById("skinUpload"),a=document.getElementById("linkDownloadExample");a&&a.addEventListener("click",o=>{o.preventDefault(),Ee("compact-pill-light.html")});const e=localStorage.getItem("melo-active-skin-id")||"default",n=localStorage.getItem("lumi-theme")||"dark";e!=="default"&&setTimeout(()=>{At(e,n,void 0,!1)},150),X("melo:theme",o=>{const r=localStorage.getItem("melo-active-skin-id");r&&r!=="default"&&At(r,o,void 0,!1)}),X("melo:skin-changed",o=>{if(o&&typeof o=="string"){const r=localStorage.getItem("lumi-theme")||"dark";At(o,r,void 0,!1)}}),i&&i.addEventListener("change",async()=>{var m;const o=(m=i.files)==null?void 0:m[0];if(!o)return;const r=await o.text(),p=o.name;if(Q)try{const{invoke:c}=await F(async()=>{const{invoke:u}=await import("./core-DhEqZVGG.js");return{invoke:u}},[]);await c("save_custom_skin_file",{filename:p,content:r}),t(`Saved ${p} to skins folder`)}catch{}Ct(r,t),localStorage.setItem("melo-active-skin-id",p),U("melo:skin-changed",p),i.value=""}),document.addEventListener("dragover",o=>{var r;[...((r=o.dataTransfer)==null?void 0:r.types)||[]].includes("Files")&&o.preventDefault()}),document.addEventListener("drop",async o=>{var p;const r=[...((p=o.dataTransfer)==null?void 0:p.files)||[]].find(m=>m.name.endsWith(".html")||m.name.endsWith(".htm"));if(r){o.preventDefault();const m=await r.text();if(m.includes("<style")||m.includes("<html")||Me(m)){const c=r.name;if(Q)try{const{invoke:u}=await F(async()=>{const{invoke:v}=await import("./core-DhEqZVGG.js");return{invoke:v}},[]);await u("save_custom_skin_file",{filename:c,content:m})}catch{}Ct(m,t),localStorage.setItem("melo-active-skin-id",c),U("melo:skin-changed",c)}}}),window.LumiSkin={applyCustomSkin:Ct,resetSkin:Zt,applySkinChoice:At,listInstalledSkins:Se,openSkinsFolderOnDisk:Le}}const Ke=(t,i,a)=>{const e=t[i];return e?typeof e=="function"?e():Promise.resolve(e):new Promise((n,o)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(o.bind(null,new Error("Unknown variable dynamic import: "+i+(i.split("/").length!==a?". Note that variables only represent file names one level deep.":""))))})},_e={code:"en",name:"English",nativeName:"English",authors:["Melo Team"]},Kt={_meta:_e,"settings.tabs.general":"General","settings.tabs.playback":"Playback","settings.tabs.appearance":"Appearance & Skin","settings.tabs.shortcuts":"Shortcuts","settings.tabs.about":"About","settings.general.language.label":"Language","settings.general.language.desc":"Interface language — more languages coming via community translation","settings.general.tray.label":"Close to system tray","settings.general.tray.desc":"Minimize to system tray on window close","settings.general.resume.label":"Resume playback on reopen","settings.general.resume.desc":"Continue playback of the previous track where you left off","settings.playback.replaygain.label":"ReplayGain normalization","settings.playback.replaygain.desc":"Equalize track volume levels automatically","settings.playback.fadepause.label":"Fade out on pause","settings.playback.fadepause.desc":"Smooth 0.3s fade-out on pause, fade back in on resume","settings.appearance.showstop.label":"Show Stop button","settings.appearance.showstop.desc":"Display a Stop control next to Play/Pause in the player"},Qe=Object.freeze(Object.defineProperty({__proto__:null,_meta:_e,default:Kt},Symbol.toStringTag,{value:"Module"})),Ie=[{code:"en",nativeName:"English"}],Tt={en:Kt};let Te=Tt.en,Ae="en";function ti(){return Ae}async function Ce(t){if(Ie.some(i=>i.code===t)||(t="en"),!Tt[t])if(t==="en")Tt.en=Kt;else try{const i=await Ke(Object.assign({"./locales/en.json":()=>F(()=>Promise.resolve().then(()=>Qe),void 0)}),`./locales/${t}.json`,3);Tt[t]=i.default||i}catch{t="en"}Ae=t,Te=Tt[t]||Tt.en,localStorage.setItem("melo-pref-language",t),document.dispatchEvent(new CustomEvent("melo:locale-changed",{detail:t}))}function it(t){var i,a;return(a=(i=Te[t])!=null?i:Tt.en[t])!=null?a:t}function ge(){const t=localStorage.getItem("melo-pref-language")||"en";Ce(t)}const Be=document.querySelector("#app");Be.innerHTML=`
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
          <button class="float-btn" data-close="win-playlist" title="Hide">—</button>
          <button class="float-btn close" data-close="win-playlist">×</button>
        </div>
      </div>
      <div class="float-body" style="padding:8px; display:flex; flex-direction:column; gap:6px;">
        <div class="playlist-toolbar" style="display:flex; gap:6px; align-items:center; flex-shrink:0; flex-wrap:wrap;">
          <select id="playlistSelect" class="settings-select" style="height:26px; font-size:11px; padding:2px 6px; flex:1 1 140px;" title="Current playlist"></select>
          <button class="btn small ghost" id="btn-new-playlist" style="height:26px; font-size:11px;">+ New</button>
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
          <button class="settings-tab active" data-stab="general"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>${it("settings.tabs.general")}</button>
          <button class="settings-tab" data-stab="playback"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4z"/></svg>${it("settings.tabs.playback")}</button>
          <button class="settings-tab" data-stab="appearance"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>${it("settings.tabs.appearance")}</button>
          <button class="settings-tab" data-stab="shortcuts"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M18 14h.01M9 14h6"/></svg>${it("settings.tabs.shortcuts")}</button>
          <button class="settings-tab" data-stab="about"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>${it("settings.tabs.about")}</button>
        </div>

        <!-- GENERAL TAB -->
        <div class="settings-section active" data-panel="general">
          <div class="settings-row">
            <div><div class="label">${it("settings.general.language.label")}</div><div class="desc">${it("settings.general.language.desc")}</div></div>
            <select class="settings-select" id="setLanguage">${Ie.map(t=>`<option value="${t.code}">${t.nativeName}</option>`).join("")}</select>
          </div>
          <div class="settings-row">
            <div><div class="label">${it("settings.general.tray.label")}</div><div class="desc">${it("settings.general.tray.desc")}</div></div>
            <div class="switch on" id="swTray" data-key="tray"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">${it("settings.general.resume.label")}</div><div class="desc">${it("settings.general.resume.desc")}</div></div>
            <div class="switch on" id="swResume" data-key="resume"></div>
          </div>
        </div>

        <!-- PLAYBACK TAB -->
        <div class="settings-section" data-panel="playback">
          <div class="settings-row">
            <div><div class="label">${it("settings.playback.replaygain.label")}</div><div class="desc">${it("settings.playback.replaygain.desc")}</div></div>
            <div class="switch on" id="swReplayGain" data-key="replayGainGlobal"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">${it("settings.playback.fadepause.label")}</div><div class="desc">${it("settings.playback.fadepause.desc")}</div></div>
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
            <div><div class="label">${it("settings.appearance.showstop.label")}</div><div class="desc">${it("settings.appearance.showstop.desc")}</div></div>
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
            <div style="font-size:16px; font-weight:800; color:var(--text); margin-bottom:4px;">Melo 0.4.0 Beta</div>
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
`;const et=new URLSearchParams(location.search).get("panel");et&&(document.documentElement.classList.add("panel-window",`panel-${et}`),document.body.classList.add("panel-window",`panel-${et}`));var be,we;if(Q&&et){F(async()=>{const{getCurrentWindow:e}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:e}},__vite__mapDeps([8,7,1,0])).then(({getCurrentWindow:e})=>{const n=e();ai(n,"melo-geo-panel-"+et),n.onCloseRequested(()=>{U("melo:panel-closed",et)}),window.addEventListener("beforeunload",()=>{U("melo:panel-closed",et)})});const t=document.getElementById("win-"+et),i=((be=t==null?void 0:t.querySelector(".float-title"))==null?void 0:be.innerHTML)||"",a=((we=t==null?void 0:t.querySelector(".float-body"))==null?void 0:we.innerHTML)||"";Be.innerHTML=`
<div class="panel-root">
  <div class="panel-titlebar" data-tauri-drag-region>
    <div class="panel-title" data-tauri-drag-region>${i}</div>
    <div class="win-controls">
      <button class="win-btn" aria-label="minimize" title="Minimize">—</button>
      <button class="win-btn" aria-label="maximize" title="Maximize / Restore">□</button>
      <button class="win-btn close" aria-label="close" title="Close">×</button>
    </div>
  </div>
  <div class="panel-body">${a}</div>
  <div id="toast" class="toast"></div>
</div>`}Q&&!et&&(document.documentElement.classList.add("tauri-main"),document.body.classList.add("tauri-main"),document.querySelectorAll(".side-actions .sbtn").forEach(t=>t.classList.remove("active")),F(async()=>{const{WebviewWindow:t}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:t}},__vite__mapDeps([6,7,1,0,8])).then(({WebviewWindow:t})=>{const i=async()=>{var a;for(const e of["library","playlist","equalizer","lyrics","settings"])try{const n=await t.getByLabel("panel-"+e);(a=document.getElementById(Qt[e]))==null||a.classList.toggle("active",!!n)}catch{}};i(),setInterval(i,1200)}));Q&&!et&&(F(()=>import("./window-BWd3Cypy.js"),__vite__mapDeps([8,7,1,0])).then(async({getCurrentWindow:t})=>{const i=t(),a=()=>{const n=localStorage.getItem("melo-active-skin-id"),o=n==="compact-pill"||typeof n=="string"&&n.startsWith("compact-pill");return{w:o?780:960,h:o?138:240}};try{const n=JSON.parse(localStorage.getItem("melo-geo-main")||"null"),{LogicalPosition:o,LogicalSize:r}=await F(async()=>{const{LogicalPosition:u,LogicalSize:v}=await import("./dpi-fvP-W2qr.js");return{LogicalPosition:u,LogicalSize:v}},__vite__mapDeps([7,1])),p=a(),m=p.w===780,c=m?p.w:n!=null&&n.w?Math.max(650,n.w):p.w;await i.setSize(new r(c,p.h)),await i.setResizable(!m),(n==null?void 0:n.x)!=null&&(n==null?void 0:n.y)!=null&&await i.setPosition(new o(n.x,n.y))}catch{}const e=async()=>{try{const n=await i.outerPosition(),o=await i.innerSize(),r=a();localStorage.setItem("melo-geo-main",JSON.stringify({x:n.x,y:n.y,w:o.width,h:r.h}))}catch{}};i.onMoved(e),i.onResized(async()=>{try{const n=await i.innerSize(),o=a(),r=o.w===780,{LogicalSize:p}=await F(async()=>{const{LogicalSize:m}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:m}},__vite__mapDeps([7,1]));if(!r){const m=n.toLogical(await i.scaleFactor());(m.width<650||m.height!==o.h)&&await i.setSize(new p(Math.max(650,m.width),o.h))}}catch{}e()}),X("melo:skin-changed",async n=>{try{!et&&n&&await At(n,_t,void 0,!1);const o=n==="compact-pill"||typeof n=="string"&&n.startsWith("compact-pill"),r=o?780:960,p=o?138:240,{LogicalSize:m}=await F(async()=>{const{LogicalSize:c}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:c}},__vite__mapDeps([7,1]));await i.setSize(new m(r,p)),await i.setResizable(!o),e()}catch{}}),i.onCloseRequested(async n=>{if(n.preventDefault(),localStorage.getItem("melo-pref-tray")!=="0")try{await i.hide();return}catch{}const{WebviewWindow:r}=await F(async()=>{const{WebviewWindow:p}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:p}},__vite__mapDeps([6,7,1,0,8]));for(const p of["library","playlist","equalizer","lyrics","settings"])try{const m=await r.getByLabel("panel-"+p);m&&await m.close()}catch{}try{await i.destroy()}catch{window.close()}})}),F(()=>import("./core-DhEqZVGG.js"),[]).then(async({invoke:t})=>{try{const i=await t("get_cli_tracks");Array.isArray(i)&&i.length>0&&setTimeout(async()=>{const a=window.LumiLibrary,e=i.map(o=>o.path).filter(Boolean),n=await(a==null?void 0:a.importPaths(e,!0))||[];n.length&&U("melo:play-tracks",{tracks:n,index:0})},350)}catch{}}),X("melo:open-files",t=>{if(Array.isArray(t)&&t.length>0){const i=t.map(a=>a.path).filter(Boolean);setTimeout(async()=>{const a=window.LumiLibrary,e=await(a==null?void 0:a.importPaths(i,!0))||[];e.length&&U("melo:play-tracks",{tracks:e,index:0})},100)}}));document.addEventListener("contextmenu",t=>{t.preventDefault()});const Ut=document.getElementById("toast"),nt=t=>{Ut&&(Ut.textContent=t,Ut.classList.add("show"),setTimeout(()=>Ut.classList.remove("show"),2200))},bt=new Audio;bt.preload="metadata";bt.crossOrigin="anonymous";window.__LUMI_AUDIO__=bt;window.__TOAST__=nt;localStorage.getItem("melo-dynamic-theme")===null&&localStorage.setItem("melo-dynamic-theme","1");let _t=localStorage.getItem("lumi-theme")||"dark";function Wt(t){document.documentElement.setAttribute("data-theme",t),localStorage.setItem("lumi-theme",t),_t=t}function ze(t){Wt(t),U("melo:theme",t)}Wt(_t);X("melo:theme",t=>{(t==="light"||t==="dark")&&Wt(t)});setInterval(()=>{const t=localStorage.getItem("lumi-theme");(t==="light"||t==="dark")&&t!==_t&&Wt(t)},1e3);document.body.classList.toggle("show-stop-btn",localStorage.getItem("melo-pref-showStopBtn")==="1");X("melo:pref-changed",t=>{t&&t.key==="showStopBtn"&&document.body.classList.toggle("show-stop-btn",!!t.value)});const ei=["win-library","win-playlist","win-equalizer","win-lyrics","win-settings"],Ft=document.getElementById("desktop"),Pe={btnToggleLibrary:"win-library",btnTogglePlaylist:"win-playlist",btnToggleEq:"win-equalizer",btnToggleLyrics:"win-lyrics",btnOpenSettings:"win-settings",menuToggleLibrary:"win-library",menuTogglePlaylist:"win-playlist",menuToggleEq:"win-equalizer",menuToggleLyrics:"win-lyrics",menuToggleSettings:"win-settings"};function ii(t){const i=document.getElementById(t);return!!i&&!i.classList.contains("hidden")}const Qt={library:"btnToggleLibrary",playlist:"btnTogglePlaylist",equalizer:"btnToggleEq",lyrics:"btnToggleLyrics",settings:"btnOpenSettings"};async function ai(t,i){const a=async()=>{try{const e=await t.outerPosition(),n=await t.outerSize();localStorage.setItem(i,JSON.stringify({x:e.x,y:e.y,w:n.width,h:n.height}))}catch{}};t.onMoved(a),t.onResized(a)}async function ni(t){const{WebviewWindow:i}=await F(async()=>{const{WebviewWindow:u}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:u}},__vite__mapDeps([6,7,1,0,8])),a="panel-"+t,e=document.getElementById(Qt[t]),n=await i.getByLabel(a);if(n){await n.close(),e==null||e.classList.remove("active");return}const o={library:[430,620],playlist:[440,560],equalizer:[700,440],lyrics:[380,520],settings:[600,540]},r={library:[360,400],playlist:[360,360],equalizer:[620,400],lyrics:[320,360],settings:[500,400]},p={library:"Library",playlist:"Playlist",equalizer:"Equalizer",lyrics:"Lyric",settings:"Settings"},m=o[t]||[420,520];let c=null;try{c=JSON.parse(localStorage.getItem("melo-geo-panel-"+t)||"null")}catch{}new i(a,{url:`/?panel=${t}`,title:p[t]||t,width:(c==null?void 0:c.w)||m[0],height:(c==null?void 0:c.h)||m[1],minWidth:(r[t]||[360,360])[0],minHeight:(r[t]||[360,360])[1],...(c==null?void 0:c.x)!=null?{x:c.x,y:c.y}:{center:!0},decorations:!1,transparent:!0,shadow:!1,skipTaskbar:!0}),e==null||e.classList.add("active")}X("melo:panel-closed",t=>{var a;const i=Qt[t];i&&((a=document.getElementById(i))==null||a.classList.remove("active"))});function te(t){if(Q){ni(t.replace(/^win-/,""));return}const i=ii(t);Ht(t,!i),i||jt(document.getElementById(t))}function oi(t){if(t.classList.contains("hidden")||!Ft||window.matchMedia("(max-width: 860px)").matches)return;const i=Ft.getBoundingClientRect();if(i.width<=0||i.height<=0)return;const a=t.getBoundingClientRect(),e=Math.min(a.width,i.width),n=Math.min(a.height,i.height);let o=a.left-i.left,r=a.top-i.top;o=Math.max(0,Math.min(i.width-e,o)),r=Math.max(0,Math.min(i.height-n,r)),t.style.left=o+"px",t.style.top=r+"px",t.style.right="auto",t.style.bottom="auto",t.style.transform="none"}function Ht(t,i){var n,o,r,p,m,c,u,v,b,S;const a=document.getElementById(t);if(!a)return;a.classList.toggle("hidden",!i),localStorage.setItem("lumiv2-"+t,i?"1":"0"),i&&oi(a);const e=i;t==="win-library"&&((n=document.getElementById("btnToggleLibrary"))==null||n.classList.toggle("active",e),(o=document.getElementById("menuToggleLibrary"))==null||o.classList.toggle("active",e)),t==="win-playlist"&&((r=document.getElementById("btnTogglePlaylist"))==null||r.classList.toggle("active",e),(p=document.getElementById("menuTogglePlaylist"))==null||p.classList.toggle("active",e)),t==="win-equalizer"&&((m=document.getElementById("btnToggleEq"))==null||m.classList.toggle("active",e),(c=document.getElementById("menuToggleEq"))==null||c.classList.toggle("active",e)),t==="win-lyrics"&&((u=document.getElementById("btnToggleLyrics"))==null||u.classList.toggle("active",e),(v=document.getElementById("menuToggleLyrics"))==null||v.classList.toggle("active",e)),t==="win-settings"&&((b=document.getElementById("btnOpenSettings"))==null||b.classList.toggle("active",e),(S=document.getElementById("menuToggleSettings"))==null||S.classList.toggle("active",e))}et||ei.forEach(t=>{const i=localStorage.getItem("lumiv2-"+t);i!==null?Ht(t,i==="1"):t==="win-settings"?Ht(t,!1):Ht(t,!0)});Object.entries(Pe).forEach(([t,i])=>{var a;(a=document.getElementById(t))==null||a.addEventListener("click",()=>te(i))});document.querySelectorAll("[data-close]").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.close;Ht(i,!1)})});let pt=null,wt=null,fe=10;function jt(t){fe++,t.style.zIndex=String(fe),document.querySelectorAll(".float-win").forEach(i=>i.classList.remove("active")),t.classList.add("active")}document.querySelectorAll(".float-win").forEach(t=>{t.addEventListener("mousedown",()=>jt(t))});document.querySelectorAll("[data-drag]").forEach(t=>{t.addEventListener("mousedown",i=>{if(i.target.closest("button")||i.target.closest("input")||i.target.closest("select"))return;const a=t.dataset.drag,e=document.getElementById(a);jt(e),e.classList.add("dragging");const n=e.getBoundingClientRect();pt={id:a,startX:i.clientX,startY:i.clientY,initX:n.left,initY:n.top,width:n.width,height:n.height}})});document.querySelectorAll("[data-resize]").forEach(t=>{t.addEventListener("mousedown",i=>{i.stopPropagation();const a=t.dataset.resize,e=document.getElementById(a);jt(e),e.classList.add("resizing");const n=e.getBoundingClientRect();wt={id:a,startX:i.clientX,startY:i.clientY,initW:n.width,initH:n.height}})});window.addEventListener("mousemove",t=>{if(pt){const i=document.getElementById(pt.id);let a=t.clientX-pt.startX,e=t.clientY-pt.startY,n=pt.initX+a,o=pt.initY+e;if(Ft&&!window.matchMedia("(max-width: 860px)").matches){const r=Ft.getBoundingClientRect(),p=r.left,m=r.right-pt.width,c=r.top,u=r.bottom-pt.height;n=Math.max(p,Math.min(m,n))-r.left,o=Math.max(c,Math.min(u,o))-r.top}i.style.left=n+"px",i.style.top=o+"px",i.style.right="auto",i.style.bottom="auto",i.style.transform="none"}if(wt){const i=document.getElementById(wt.id);let a=wt.initW+(t.clientX-wt.startX),e=wt.initH+(t.clientY-wt.startY);a=Math.max(260,a),e=Math.max(160,e),i.style.width=a+"px",i.style.height=e+"px"}});window.addEventListener("mouseup",()=>{if(pt){const t=document.getElementById(pt.id);t&&(t.classList.remove("dragging"),localStorage.setItem("lumiv2-pos-"+pt.id,JSON.stringify({left:t.style.left,top:t.style.top}))),pt=null}if(wt){const t=document.getElementById(wt.id);t&&(t.classList.remove("resizing"),localStorage.setItem("lumiv2-size-"+wt.id,JSON.stringify({width:t.style.width,height:t.style.height}))),wt=null}});async function Re(){const t=window.LumiLibrary,i=window.LumiPlayer;if(Q){try{const{open:e}=await F(async()=>{const{open:p}=await import("./index-CS3Qnt9j.js");return{open:p}},__vite__mapDeps([5,1])),n=await e({multiple:!0,filters:[{name:"Audio",extensions:["mp3","flac","wav","aac","ogg","m4a","alac","opus","wma","aiff"]}]});if(!n)return;const o=Array.isArray(n)?n:[n],r=await(t==null?void 0:t.importPaths(o,!0))||[];r.length&&(U("melo:play-tracks",{tracks:r,index:0}),nt(`${r.length} file(s) added`))}catch{nt("Error opening files")}return}const a=document.createElement("input");a.type="file",a.multiple=!0,a.accept="audio/*,.mp3,.flac,.wav,.aac,.ogg,.m4a,.alac,.opus,.wma,.aiff",a.onchange=async()=>{const e=Array.from(a.files||[]);if(!e.length)return;const n=[];for(const o of e){const r=o.path,p=r||URL.createObjectURL(o),m=o.name,c=m.lastIndexOf("."),u=c>0?m.slice(0,c):m,v=c>0?m.slice(c+1).toUpperCase():"AUDIO",b={id:r||"imp_"+Math.random().toString(36).slice(2,9),title:u,artist:"Unknown Artist",album:"Single",duration:0,path:p,codec:v,specs:"Local File",source:"import"};await xe(o,b),n.push(b)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(o=>i==null?void 0:i.queue.push(o)),U("melo:play-tracks",{tracks:n,index:0}),nt(`${n.length} file(s) added`)},a.click()}async function qe(){const t=window.LumiLibrary,i=window.LumiPlayer;if(Q){try{const{open:e}=await F(async()=>{const{open:r}=await import("./index-CS3Qnt9j.js");return{open:r}},__vite__mapDeps([5,1])),n=await e({directory:!0});if(!n)return;const o=n;await(t==null?void 0:t.scanFolder(o))}catch{nt("Error scanning folder")}return}const a=document.createElement("input");a.type="file",a.webkitdirectory=!0,a.multiple=!0,a.accept="audio/*",a.onchange=async()=>{const e=Array.from(a.files||[]).filter(o=>/\.(mp3|flac|wav|aac|ogg|m4a|alac|opus|wma|aiff)$/i.test(o.name));if(!e.length)return;const n=[];for(const o of e){const r=o.path,p=r||URL.createObjectURL(o),m=o.name,c=m.lastIndexOf("."),u=c>0?m.slice(0,c):m,v=c>0?m.slice(c+1).toUpperCase():"AUDIO",b={id:r||"imp_"+Math.random().toString(36).slice(2,9),title:u,artist:"Unknown Artist",album:"Folder Import",duration:0,path:p,codec:v,specs:"Local File",source:"import"};await xe(o,b),n.push(b)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(o=>i==null?void 0:i.queue.push(o)),U("melo:play-tracks",{tracks:n,index:0}),nt(`${n.length} file(s) added from folder`)},a.click()}document.addEventListener("click",t=>{var a;const i=(a=t.target)==null?void 0:a.closest("#btnAddFiles, #btnAddFolder, #btnThemeToggle");i&&(i.id==="btnAddFiles"?Re():i.id==="btnAddFolder"?qe():i.id==="btnThemeToggle"&&ze(_t==="light"?"dark":"light"))});window.addEventListener("keydown",t=>{(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="o"&&(t.shiftKey?(t.preventDefault(),qe()):(t.preventDefault(),Re())),((t.ctrlKey||t.metaKey)&&t.key===","||t.key==="F2")&&(t.preventDefault(),te("win-settings"))});function ve(t){var b,S;function i(w){document.querySelectorAll(".settings-tab").forEach(d=>{d.classList.toggle("active",d.dataset.stab===w)}),document.querySelectorAll(".settings-section[data-panel]").forEach(d=>{d.classList.toggle("active",d.dataset.panel===w)}),localStorage.setItem("melo-settings-tab",w)}document.querySelectorAll(".settings-tab").forEach(w=>{w.addEventListener("click",()=>i(w.dataset.stab))}),i(localStorage.getItem("melo-settings-tab")||"general"),document.querySelectorAll(".switch[data-key]").forEach(w=>{const d=w.dataset.key,P=localStorage.getItem("melo-pref-"+d);P!==null&&w.classList.toggle("on",P==="1"),w.onclick=()=>{w.classList.toggle("on");const C=w.classList.contains("on");localStorage.setItem("melo-pref-"+d,C?"1":"0"),U("melo:pref-changed",{key:d,value:C})}});const a=document.getElementById("setLanguage");a&&(a.value=ti(),a.onchange=async()=>{await Ce(a.value),t(`Language set to ${a.options[a.selectedIndex].text} — restart Melo to fully apply`)});const e=document.getElementById("swDynamicTheme");if(e){const w=localStorage.getItem("melo-dynamic-theme")!=="0";e.classList.toggle("on",w),e.onclick=()=>{var B,j;const d=!e.classList.contains("on");e.classList.toggle("on",d),localStorage.setItem("melo-dynamic-theme",d?"1":"0");const P=window.__LUMI_QUEUE__,C=(j=(B=window.LumiPlayer)==null?void 0:B.currentIndex)!=null?j:0;P&&P[C]&&ke(d?P[C].cover:null)}}const n=document.getElementById("skinSelect"),o=document.getElementById("btnSkinThemeToggle"),r=document.getElementById("btnRefreshSkins"),p=document.getElementById("btnOpenSkinsFolder"),m=document.getElementById("skinThemeIcon"),c=document.getElementById("skinThemeLabel");function u(w){m&&(m.textContent=w==="dark"?"🌙":"☀️"),c&&(c.textContent=w==="dark"?"Dark":"Light")}u(_t),o==null||o.addEventListener("click",()=>{const w=_t==="dark"?"light":"dark";ze(w),u(w),t(w==="dark"?"Dark theme":"Light theme")}),X("melo:theme",w=>{(w==="light"||w==="dark")&&u(w)});async function v(){if(!n)return;const w=localStorage.getItem("melo-active-skin-id")||"default",d=await Se();n.innerHTML=`
      <option value="default">Default Melo (Standard)</option>
      <option value="compact-pill">Minimal Compact (Pill Bar)</option>
    `,d.forEach(P=>{if(P.filename!=="compact-pill-light.html"&&P.filename!=="compact-pill-dark.html"){const C=document.createElement("option");C.value=P.filename,C.textContent=`${P.name} (${P.filename})`,n.appendChild(C)}}),n.value=w}v(),n&&(n.onchange=()=>{const w=n.value;At(w,_t,t)}),r==null||r.addEventListener("click",async()=>{await v();const w=localStorage.getItem("melo-active-skin-id")||"default";At(w,_t,t),t("Skins reloaded from disk")}),p==null||p.addEventListener("click",()=>{Le(t)}),(b=document.getElementById("btn-reset-skin-settings"))==null||b.addEventListener("click",()=>{Zt(t),n&&(n.value="default")}),(S=document.getElementById("btn-settings-reset"))==null||S.addEventListener("click",()=>{localStorage.clear(),t("Settings reset — reloading..."),setTimeout(()=>location.reload(),600)})}function $e(){document.querySelectorAll(".win-btn").forEach(t=>{t.onclick=async()=>{const i=t.getAttribute("aria-label");if(window.__TAURI__){const{getCurrentWindow:a}=await F(async()=>{const{getCurrentWindow:n}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:n}},__vite__mapDeps([8,7,1,0])),e=a();i==="minimize"?e.minimize():i==="maximize"?e.toggleMaximize():i==="close"&&e.close()}else i==="close"&&nt("Window close requires the Tauri desktop build"),i==="maximize"&&nt("Resize: drag corner handle")}})}$e();window.__LUMI_REBIND_MAIN__=()=>{$e(),Object.entries(Pe).forEach(([t,i])=>{const a=document.getElementById(t);a&&(a.onclick=()=>te(i))})};const Rt=document.createElement("div");Rt.id="scanBar";document.body.appendChild(Rt);let ye=0;X("melo:scan-progress",t=>{if(!t)return;const i=t.total?Math.round(t.done/t.total*100):100;Rt.style.opacity="1",Rt.style.width=i+"%",clearTimeout(ye),(t.finished||t.total&&t.done>=t.total)&&(ye=setTimeout(()=>{Rt.style.opacity="0",Rt.style.width="0"},800))});const Bt=document.createElement("div");Bt.id="aboutPop";Bt.style.display="none";document.body.appendChild(Bt);document.addEventListener("click",t=>{var i,a;(i=t.target)!=null&&i.closest("#btnAbout")&&(t.stopPropagation(),Bt.innerHTML=`
    <div class="about-head">Melo <b>0.4.0 Beta</b></div>
    <div style="font-size:11.5px; color:var(--text-soft); margin:6px 0 10px;">
      Modern Windows Music Player<br/>
      Tauri 2 + TypeScript + Rust
    </div>
    <a class="about-link" id="aboutLink" href="https://github.com/Arvanta/Melo" rel="noopener">github.com/Arvanta/Melo ↗</a>`,Bt.style.display=Bt.style.display==="none"?"block":"none",(a=document.getElementById("aboutLink"))==null||a.addEventListener("click",e=>{e.preventDefault();const n="https://github.com/Arvanta/Melo";Q?F(()=>import("./core-DhEqZVGG.js"),[]).then(o=>o.invoke("open_url",{url:n})).catch(()=>window.open(n,"_blank")):window.open(n,"_blank")}))});document.addEventListener("click",t=>{!t.target.closest("#aboutPop")&&!t.target.closest("#btnAbout")&&(Bt.style.display="none")});Q&&et?et==="library"||et==="playlist"?ce(bt,nt):et==="equalizer"?de(bt,nt,{remote:!0}):et==="lyrics"?ue(bt):et==="settings"&&(ge(),ve(nt)):(Ye(bt,nt),ce(bt,nt),de(bt,nt),Je(bt),ue(bt),Ze(nt),ve(nt),ge(),setTimeout(async()=>{if(localStorage.getItem("melo-pref-resume")!=="0")try{const t=JSON.parse(localStorage.getItem("melo-resume-state")||"null"),i=window.LumiLibrary,a=window.LumiPlayer;if(!(t!=null&&t.trackId)||!i||!a)return;const e=await i.getTrack(t.trackId);if(!e)return;a.queue=[e],a.loadTrack(0,!1,t.position||0)}catch{}},500));
//# sourceMappingURL=index-BQo1bW9n.js.map
