const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/event-CNdo2oXa.js","assets/core-DhEqZVGG.js","assets/index-DiyoAAdc.js","assets/index-CHth0gh2.js","assets/index-Bq0iOnRE.js","assets/index-CS3Qnt9j.js","assets/webviewWindow-mjQkSB26.js","assets/dpi-fvP-W2qr.js","assets/window-BWd3Cypy.js"])))=>i.map(i=>d[i]);
(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))e(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&e(r)}).observe(document,{childList:!0,subtree:!0});function a(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function e(n){if(n.ep)return;n.ep=!0;const o=a(n);fetch(n.href,o)}})();const Ye="modulepreload",Je=function(t){return"/"+t},ce={},X=function(i,a,e){let n=Promise.resolve();if(a&&a.length>0){let r=function(s){return Promise.all(s.map(d=>Promise.resolve(d).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const p=document.querySelector("meta[property=csp-nonce]"),c=(p==null?void 0:p.nonce)||(p==null?void 0:p.getAttribute("nonce"));n=r(a.map(s=>{if(s=Je(s),s in ce)return;ce[s]=!0;const d=s.endsWith(".css"),f=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${f}`))return;const w=document.createElement("link");if(w.rel=d?"stylesheet":Ye,d||(w.as="script"),w.crossOrigin="",w.href=s,c&&w.setAttribute("nonce",c),document.head.appendChild(w),d)return new Promise((L,x)=>{w.addEventListener("load",L),w.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${s}`)))})}))}function o(r){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=r,window.dispatchEvent(p),!p.defaultPrevented)throw r}return n.then(r=>{for(const p of r||[])p.status==="rejected"&&o(p.reason);return i().catch(o)})},at=typeof window.__TAURI_INTERNALS__<"u"||typeof window.__TAURI__<"u";async function U(t,i){if(at)try{const{emit:a}=await X(async()=>{const{emit:e}=await import("./event-CNdo2oXa.js");return{emit:e}},__vite__mapDeps([0,1]));await a(t,i);return}catch{}window.dispatchEvent(new CustomEvent(t,{detail:i}))}function it(t,i){at&&X(async()=>{const{listen:a}=await import("./event-CNdo2oXa.js");return{listen:a}},__vite__mapDeps([0,1])).then(({listen:a})=>{a(t,e=>{i(e.payload)})}).catch(()=>{}),window.addEventListener(t,a=>i(a.detail))}let de=!1;async function Xe(){if(!de){de=!0;try{const t=globalThis;if(typeof t.Buffer>"u"){const i=await X(()=>import("./index-DiyoAAdc.js").then(a=>a.i),__vite__mapDeps([2,3]));t.Buffer=i.Buffer}typeof t.process>"u"&&(t.process={env:{},browser:!0,nextTick:i=>setTimeout(i,0)})}catch{}}}async function Ze(t,i){var a;try{await Xe();const e=await X(()=>import("./index-Bq0iOnRE.js").then(s=>s.i),__vite__mapDeps([4,3])),n=e&&typeof e.parseBlob=="function"?e:e.default||e,o=await Promise.race([n.parseBlob(t),new Promise((s,d)=>setTimeout(()=>d(new Error("timeout")),1800))]),r=o==null?void 0:o.common;if(!r)return;r.title&&(i.title=r.title),r.artist?i.artist=r.artist:r.artists&&r.artists[0]&&(i.artist=r.artists[0]),r.album&&(i.album=r.album),r.genre&&r.genre[0]&&(i.genre=r.genre[0]),r.year&&(i.year=r.year);const p=(a=r.picture)==null?void 0:a[0];if(p&&p.data){const s=p.format||"image/jpeg",d=p.data;if(d.length>6e5)return;let f="";const w=8192;for(let L=0;L<d.length;L+=w){const x=d.subarray(L,L+w);f+=String.fromCharCode.apply(null,x)}i.cover=`data:${s};base64,${btoa(f)}`}const c=o==null?void 0:o.format;c&&c.duration&&!i.duration&&(i.duration=Math.floor(c.duration))}catch{}}async function Se(t,i,a=1800){return await Ze(t,i),i}async function Ke(t){return new Promise(i=>{if(!t)return i(null);const a=new Image;a.crossOrigin="anonymous",a.onload=()=>{try{const e=document.createElement("canvas"),n=e.getContext("2d");if(!n)return i(null);e.width=40,e.height=40,n.drawImage(a,0,0,40,40);const o=n.getImageData(0,0,40,40).data;let r={r:42,g:123,b:214},p=-1;for(let c=0;c<o.length;c+=4){const s=o[c],d=o[c+1],f=o[c+2];if(o[c+3]<128)continue;const L=Math.max(s,d,f),x=Math.min(s,d,f),g=(L+x)/510,v=L-x,A=v===0?0:v/(1-Math.abs(2*g-1));if(A>.25&&g>.25&&g<.82){const j=A*1.5+(1-Math.abs(g-.5));j>p&&(p=j,r={r:s,g:d,b:f})}}p>0?i(r):i(null)}catch{i(null)}},a.onerror=()=>i(null),a.src=t})}async function Ee(t){const i=localStorage.getItem("melo-dynamic-theme")!=="0",a=document.documentElement;if(!i||!t){a.style.removeProperty("--accent"),a.style.removeProperty("--visualizer"),a.style.removeProperty("--accent-glow");return}const e=await Ke(t);if(e){const n=`rgb(${e.r}, ${e.g}, ${e.b})`;a.style.setProperty("--accent",n),a.style.setProperty("--visualizer",n),a.style.setProperty("--accent-glow",`rgba(${e.r}, ${e.g}, ${e.b}, 0.35)`)}else a.style.removeProperty("--accent"),a.style.removeProperty("--visualizer"),a.style.removeProperty("--accent-glow")}const Dt=[31,62,125,250,500,1e3,2e3,4e3,8e3,16e3];let wt=null,Xt=null,Zt=[],$t=null,Rt=null;function Nt(t){if(!wt){const i=window.AudioContext||window.webkitAudioContext;wt=new i;try{Xt=wt.createMediaElementSource(t)}catch{}if(Zt=Dt.map(a=>{const e=wt.createBiquadFilter();return e.type="peaking",e.frequency.value=a,e.Q.value=1.4,e.gain.value=0,e}),$t=wt.createGain(),$t.gain.value=1,Rt=wt.createAnalyser(),Rt.fftSize=2048,Rt.smoothingTimeConstant=.72,Xt){let a=Xt;for(const e of Zt)a.connect(e),a=e;a.connect($t),$t.connect(Rt),Rt.connect(wt.destination)}}return{ctx:wt,filters:Zt,gain:$t,analyser:Rt,async resume(){wt&&wt.state==="suspended"&&await wt.resume().catch(()=>{})}}}function Qe(t,i){let a,e,n,o,r,p,c,s=null,d,f,w,L,x,g,v,A,j,P,Q,z,h,b=[],M=0,H=!1,V="off",K=!1;function nt(){if(!b.length)return null;if(V==="one")return M;let l=M+1;if(H&&(l=Math.floor(Math.random()*b.length),l===M&&b.length>1&&(l=(l+1)%b.length)),l>=b.length)if(V==="all")l=0;else return null;return l}window.__LUMI_QUEUE__=b,window.__LUMI_SET_QUEUE__=l=>{b=l,window.__LUMI_QUEUE__=l};function lt(l){if(!isFinite(l))return"0:00";const S=Math.floor(l/60),T=Math.floor(l%60).toString().padStart(2,"0");return`${S}:${T}`}function et(){if(!d)return;const l=parseFloat(d.max)||100,S=parseFloat(d.value)||0,T=l>0?S/l*100:0;d.style.setProperty("--progress",T+"%")}function mt(){f&&f.style.setProperty("--vol",f.value+"%")}function Mt(){g&&(g.classList.toggle("muted",t.muted),g.title=t.muted?"Unmute":"Mute")}function St(l=!0){t.muted=!t.muted,Mt(),l&&i(t.muted?"Muted":"Unmuted")}async function Lt(l){if(!l)return"";if(/^(https?|data|blob):/.test(l))return l;if(at)try{const{convertFileSrc:S}=await X(async()=>{const{convertFileSrc:T}=await import("./core-DhEqZVGG.js");return{convertFileSrc:T}},[]);return S(l)}catch{}return l}async function vt(l,S=!0,T){if(!b.length)return;l<0&&(l=b.length-1),l>=b.length&&(l=0),M=l;const q=b[l];if(q){if(v||R(),t.src=await Lt(q.path),t.load(),T&&T>0){const Y=()=>{t.removeEventListener("loadedmetadata",Y);try{t.currentTime=T}catch{}};t.addEventListener("loadedmetadata",Y)}v&&(v.textContent=q.title||"Unknown Title"),A&&(A.textContent=q.artist||"Unknown Artist"),j&&(j.textContent=q.album||""),P&&(P.textContent=q.codec||"AUDIO"),Q&&(Q.textContent=q.specs||""),q.cover&&z?(z.src=q.cover,z.style.display="block",h&&(h.style.display="none")):(z&&(z.style.display="none"),h&&(h.style.display="grid")),d&&(d.max=String(q.duration||240),d.value="0",et()),L&&(L.textContent=lt(q.duration)),w&&(w.textContent="0:00"),$(),Ee(q.cover||null),document.querySelectorAll(".track-row").forEach((Y,F)=>{var _t;Y.classList.toggle("active",((_t=b[F])==null?void 0:_t.id)===q.id)}),"mediaSession"in navigator&&(navigator.mediaSession.metadata=new MediaMetadata({title:q.title,artist:q.artist,album:q.album,artwork:q.cover?[{src:q.cover,sizes:"512x512",type:"image/jpeg"}]:[]}),navigator.mediaSession.setActionHandler("play",()=>yt()),navigator.mediaSession.setActionHandler("pause",()=>m()),navigator.mediaSession.setActionHandler("previoustrack",()=>I()),navigator.mediaSession.setActionHandler("nexttrack",()=>k()),navigator.mediaSession.setActionHandler("seekto",Y=>{Y.seekTime&&(t.currentTime=Y.seekTime)})),S&&yt();try{const{cover:Y,...F}=q;localStorage.setItem("melo-current-track",JSON.stringify(F))}catch{}window.dispatchEvent(new CustomEvent("lumi:trackChange",{detail:q})),U("melo:track-changed",q),U("melo:playback-state",{track:q,currentTime:t.currentTime||0,paused:t.paused})}}let ht=!1;async function st(){try{await Nt(t).resume()}catch{}ht&&(ht=!1,t.play().then(()=>{e&&(e.style.display="none"),n&&(n.style.display="block")}).catch(()=>{}))}window.addEventListener("pointerdown",st),window.addEventListener("keydown",st),it("melo:pref-changed",l=>{l&&l.key==="replayGainGlobal"&&$(),l&&l.key==="showStopBtn"&&B(!!l.value)}),it("melo:request-playback-state",()=>{const l=b[M]||null;U("melo:playback-state",{track:l,currentTime:t.currentTime||0,paused:t.paused})}),it("melo:seek-playback",l=>{const S=Number(l);Number.isFinite(S)&&S>=0&&(t.currentTime=S)});let dt=null,gt=!1;function ft(l,S,T){dt&&cancelAnimationFrame(dt);const q=t.volume,Y=performance.now(),F=_t=>{const qt=Math.min(1,(_t-Y)/S);t.volume=q+(l-q)*qt,qt<1?dt=requestAnimationFrame(F):(dt=null,T==null||T())};dt=requestAnimationFrame(F)}async function yt(){try{await Nt(t).resume()}catch{}const l=localStorage.getItem("melo-pref-fadePause")==="1",S=N();l&&gt&&(t.volume=0),t.play().then(()=>{ht=!1,e&&(e.style.display="none"),n&&(n.style.display="block"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="playing"),l&&gt?(gt=!1,ft(S,300)):t.volume=S}).catch(()=>{ht||(ht=!0,i("Click once inside player to begin audio playback"))})}function m(){localStorage.getItem("melo-pref-fadePause")==="1"&&!t.paused?(gt=!0,ft(0,300,()=>t.pause())):(gt=!1,t.pause()),e&&(e.style.display="block"),n&&(n.style.display="none"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused");const S=b[M];if(S)try{localStorage.setItem("melo-resume-state",JSON.stringify({trackId:S.id,position:t.currentTime}))}catch{}}function y(){t.paused?yt():m()}function _(){t.pause();try{t.currentTime=0}catch{}e&&(e.style.display="block"),n&&(n.style.display="none"),d&&(d.value="0",et()),w&&(w.textContent="0:00"),"mediaSession"in navigator&&(navigator.mediaSession.playbackState="paused")}function k(){if(!b.length)return;if(V==="one"){t.currentTime=0,yt();return}const l=nt();if(l===null){m();return}vt(l)}function I(){if(!b.length)return;if(t.currentTime>3){t.currentTime=0;return}let l=M-1;H&&(l=Math.floor(Math.random()*b.length)),l<0&&(V==="all"?l=b.length-1:l=0),vt(l)}function N(){var F;const l=b[M];if(!f)return 1;const S=parseInt(f.value,10)/100,q=localStorage.getItem("melo-pref-replayGainGlobal")!=="0"&&(F=l==null?void 0:l.replayGain)!=null?F:0,Y=Math.pow(10,q/20);return Math.min(1,Math.max(0,S*Y))}function $(){!b[M]||!f||(t.volume=N())}function B(l=localStorage.getItem("melo-pref-showStopBtn")==="1"){const S=document.getElementById("btnStop");S&&S.style.setProperty("display",l?"inline-flex":"none","important")}function R(){if(a=document.getElementById("btnPlay"),e=document.getElementById("iconPlay"),n=document.getElementById("iconPause"),o=document.getElementById("btnPrev"),r=document.getElementById("btnNext"),p=document.getElementById("btnShuffle"),c=document.getElementById("btnRepeat"),s=document.getElementById("btnStop"),B(),d=document.getElementById("seekBar"),f=document.getElementById("volBar"),w=document.getElementById("curTime"),L=document.getElementById("durTime"),x=document.getElementById("volPct"),g=document.getElementById("volIcon"),g&&(g.onclick=()=>St()),Mt(),v=document.getElementById("trackTitle"),A=document.getElementById("trackArtist"),j=document.getElementById("trackAlbum"),P=document.getElementById("trackCodec"),Q=document.getElementById("trackSpecs"),z=document.getElementById("coverImg"),h=document.getElementById("coverFallback"),a&&(a.onclick=y),s&&(s.onclick=_),o&&(o.onclick=I),r&&(r.onclick=k),p&&(p.onclick=()=>{H=!H,p.classList.toggle("active",H),i(H?"Shuffle on":"Shuffle off")}),c&&(c.onclick=()=>{V=V==="off"?"all":V==="all"?"one":"off",c.classList.toggle("active",V!=="off");const l={off:"Repeat off",all:"Repeat all",one:"Repeat one"};i(l[V]),c.title=l[V]}),d&&(d.oninput=()=>{K=!0,w&&(w.textContent=lt(parseFloat(d.value))),et()},d.onchange=()=>{t.currentTime=parseFloat(d.value),K=!1}),f&&(f.oninput=()=>{mt(),x&&(x.textContent=f.value+"%"),$()}),et(),mt(),b[M]){const l=b[M];v&&(v.textContent=l.title||"Unknown Title"),A&&(A.textContent=l.artist||"Unknown Artist"),j&&(j.textContent=l.album||""),P&&(P.textContent=l.codec||"AUDIO"),Q&&(Q.textContent=l.specs||""),l.cover&&z&&(z.src=l.cover,z.style.display="block",h&&(h.style.display="none"))}}R(),document.addEventListener("wheel",l=>{const S=l.target;if(!(S!=null&&S.closest("#playerCard"))||!f)return;l.preventDefault();const T=l.deltaY<0?5:-5;f.value=String(Math.max(0,Math.min(100,Number(f.value)+T))),f.dispatchEvent(new Event("input"))},{passive:!1}),t.addEventListener("timeupdate",()=>{U("melo:playback-position",t.currentTime||0),!K&&d&&w&&(d.value=String(Math.floor(t.currentTime)),w.textContent=lt(t.currentTime),et()),C()});let G=null;function C(){G||(G=setTimeout(()=>{G=null;const l=b[M];if(!(!l||t.paused))try{localStorage.setItem("melo-resume-state",JSON.stringify({trackId:l.id,position:t.currentTime}))}catch{}},4e3))}t.addEventListener("loadedmetadata",()=>{var S;if(!d||!L)return;const l=Math.floor(t.duration||((S=b[M])==null?void 0:S.duration)||240);d.max=String(l),L.textContent=lt(l),et()}),t.addEventListener("ended",()=>{k()}),window.addEventListener("keydown",l=>{l.target.tagName!=="INPUT"&&(l.code==="Space"&&(l.preventDefault(),y()),l.code==="ArrowRight"&&(t.currentTime+=5),l.code==="ArrowLeft"&&(t.currentTime-=5),(l.key==="m"||l.key==="M")&&St(),(l.key==="s"||l.key==="S")&&p&&p.click(),(l.key==="r"||l.key==="R")&&c&&c.click(),l.code==="ArrowUp"&&f&&(f.value=String(Math.min(100,parseInt(f.value,10)+5)),f.dispatchEvent(new Event("input"))),l.code==="ArrowDown"&&f&&(f.value=String(Math.max(0,parseInt(f.value,10)-5)),f.dispatchEvent(new Event("input"))))}),it("melo:tray-action",l=>{l==="play_pause"?y():l==="next"?k():l==="prev"?I():l==="mute"&&St()}),window.LumiPlayer={get queue(){return b},set queue(l){b=l,window.__LUMI_QUEUE__=l},get currentIndex(){return M},loadTrack:vt,play:yt,pause:m,stop:_,next:k,prev:I,get audio(){return t},rebind:R},window.__LUMI_REBIND__=R,it("melo:play-tracks",l=>{if(!l||!Array.isArray(l.tracks)||!l.tracks.length)return;b=l.tracks,window.__LUMI_SET_QUEUE__(b);const S=Math.max(0,Math.min(l.index||0,b.length-1));vt(S,!0)})}const pe=new URLSearchParams(location.search).get("panel")||"main",tt=t=>String(t!=null?t:"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");function ue(t){const i=Number.isFinite(t)?Math.max(0,t):0;return`${Math.floor(i/60)}:${String(Math.floor(i%60)).padStart(2,"0")}`}function me(t,i){const a=document.getElementById("trackList"),e=document.getElementById("libraryStats"),n=document.getElementById("searchInput"),o=document.getElementById("libraryTabs"),r=document.getElementById("btn-scan"),p=document.getElementById("btn-clear-library"),c=document.getElementById("winPlaylistTracks"),s=document.getElementById("winPlaylistEmpty"),d=document.getElementById("playlistSelect"),f=document.getElementById("playlistSearchInput"),w=document.getElementById("playlistSortSelect"),L=document.getElementById("btn-clear-playlist"),x=document.getElementById("btn-export-playlist"),g=document.getElementById("btn-new-playlist");let v=null,A=null,j=!1,P=localStorage.getItem("melo-currentPlaylist")||"p1",Q=[],z=null,h=null,b=!1,M=[],H="artists",V=null,K=null,nt=null,lt="";const et=54,mt=52;let Mt=0,St=0,Lt=0,vt=0,ht=null;const st=document.createElement("div");st.className="ctx-menu",st.style.display="none",st.innerHTML='<button class="ctx-item danger" id="ctxRemoveLibraryTrack">Remove from Library</button>',document.body.appendChild(st),document.addEventListener("click",u=>{u.target.closest("#ctxRemoveLibraryTrack")||(st.style.display="none")}),st.querySelector("#ctxRemoveLibraryTrack").onclick=async u=>{u.stopPropagation(),!(!v||!ht)&&(await v("delete_tracks",{ids:[ht]}),st.style.display="none",ht=null,U("melo:library-changed",{removed:1}))};function dt(u){const E=r==null?void 0:r.querySelector(".scan-label");E&&(E.textContent=u)}function gt(u){if(!u)return"";if(/^(data:|blob:|https?:)/i.test(u))return u;try{return A?A(u):""}catch{return""}}function ft(u){return{...u,cover:gt(u.cover),source:"scan"}}const yt=[],m=new Set;let y=0;function _(u,E){!u||!v||m.has(u)||(m.add(u),yt.push({id:u,element:E}),k())}function k(){for(;v&&y<2&&yt.length;){const u=yt.shift();y++,v("ensure_track_artwork",{id:u.id}).then(E=>{if(!E||!u.element.isConnected)return;const W=gt(E),O=M.find(J=>J.id===u.id);O&&(O.cover=W),u.element.style.backgroundImage=`url("${W.replace(/"/g,"%22")}")`,u.element.textContent=""}).catch(()=>{}).finally(()=>{y--,m.delete(u.id),k()})}}function I(u){const E=[...u.querySelectorAll("[data-artwork-id]")];if(!("IntersectionObserver"in window)){E.forEach(O=>_(O.dataset.artworkId,O));return}const W=new IntersectionObserver(O=>{O.forEach(J=>{if(!J.isIntersecting)return;const D=J.target;W.unobserve(D),_(D.dataset.artworkId,D)})},{root:u,rootMargin:"120px"});E.forEach(O=>W.observe(O))}async function N(){if(j)return;if(!at){j=!0,$();return}const u=await X(()=>import("./core-DhEqZVGG.js"),[]);v=u.invoke,A=u.convertFileSrc,j=!0,await Promise.all([B(),Y()]),await T(!0),await F(!0)}function $(){a&&(a.innerHTML='<div style="padding:30px;text-align:center;color:var(--text-muted)">The persistent Library is available in the Tauri desktop build.</div>')}async function B(){if(!(!v||!e))try{const u=await v("library_stats");e.textContent=`${u.tracks} tracks • ${u.artists} artists • ${u.albums} albums`}catch{}}function R(){V=K=nt=null,a&&(a.scrollTop=0)}function G(){return H==="artists"?V&&K?"tracks":"groups":H==="albums"?K?"tracks":"groups":nt?"tracks":"groups"}function C(){return H==="artists"&&V?"albums":H}function l(){return H==="artists"&&V?K?`${V} › ${K==="__ALL__"?"All tracks":K}`:V:H==="albums"&&K?K:H==="genres"&&nt?nt:""}async function S(u,E){if(!v)return{items:[],total:0,limit:E,offset:u};if(G()==="groups")return v("library_groups",{kind:C(),search:lt||null,artist:H==="artists"?V:null,limit:E,offset:u});const W=await v("library_tracks",{search:lt||null,artist:V,album:K==="__ALL__"?null:K,genre:nt,sort:"title-asc",limit:E,offset:u});return W.items=W.items.map(ft),M=W.items,W}async function T(u=!1){if(!a||!v)return;u&&(a.scrollTop=0),a.style.display="block",a.style.position="relative",a.style.overflowY="auto";const E=Math.max(300,a.clientHeight||420),W=Math.ceil(E/et),O=Math.max(0,Math.floor(a.scrollTop/et)-8),J=Math.max(40,W+16),D=++Mt;try{const pt=await S(O,J);if(D!==Mt)return;const Z=l(),bt=Z?38:0,Ne=pt.total*et+bt,We=pt.items.map((ne,Jt)=>{const oe=pt.offset+Jt,le=bt+oe*et;if(G()==="groups"){const Pt=ne,re=gt(Pt.cover),se=`lib-avatar ${C()==="albums"?"lib-avatar-album":""}`,je=C()==="albums"?"💿":tt((Pt.name[0]||"?").toUpperCase()),Ge=re?`<div class="${se}" style="background-image:url('${tt(re)}')"></div>`:`<div class="${se}" data-artwork-id="${tt(Pt.artworkTrackId||"")}">${je}</div>`;return`<div class="lib-item virtual-row" data-group-index="${Jt}" style="position:absolute;left:0;right:0;top:${le}px;height:${et}px">${Ge}<div style="flex:1;min-width:0"><div class="t-title">${tt(Pt.name)}</div><div class="t-artist">${tt(Pt.subtitle||`${Pt.count} tracks`)}</div></div><span class="chev-r">›</span></div>`}const It=ne;return`<div class="track-row virtual-row" data-track-id="${tt(It.id)}" data-page-index="${Jt}" style="position:absolute;left:0;right:0;top:${le}px;height:${et}px">
          <span class="num">${oe+1}</span>
          ${It.cover?`<div class="track-cover-mini" style="background-image:url('${tt(It.cover)}');background-size:cover;background-position:center"></div>`:`<div class="track-cover-mini cover-default" data-artwork-id="${tt(It.id)}">♪</div>`}
          <div style="flex:1;min-width:0"><div class="t-title">${tt(It.title)}</div><div class="t-artist">${tt(It.artist)} • ${tt(It.album)}</div></div>
          <span class="t-dur">${ue(It.duration)}</span>
          <button class="btn small ghost" data-add-track="${tt(It.id)}" title="Add to current playlist">+</button>
        </div>`}).join(""),Fe=Z?`<div class="lib-crumb virtual-crumb" style="position:sticky;top:0;height:${bt}px;z-index:3;background:var(--card)"><button class="btn small" id="virtualBack">‹ Back</button><b>${tt(Z)}</b>${H==="artists"&&V&&!K?'<button class="btn small" id="virtualAllTracks">All tracks</button>':""}</div>`:"";a.innerHTML=`<div class="virtual-list-space" style="position:relative;height:${Math.max(Ne,E)}px">${Fe}${We}</div>`,q(pt.items),I(a)}catch{a.innerHTML='<div style="padding:24px;text-align:center;color:var(--text-muted)">Could not read the Library database.</div>'}}function q(u){var E,W;a&&(a.querySelectorAll("[data-group-index]").forEach(O=>{O.onclick=()=>{const J=u[Number(O.dataset.groupIndex||0)],D=(J==null?void 0:J.name)||"",pt=(J==null?void 0:J.key)||D;if(H==="artists"&&!V)V=D;else if(H==="artists"&&V||H==="albums"){const Z=pt.split("\0");H==="albums"&&(V=Z[0]||null),K=Z[1]||D}else H==="genres"&&(nt=D);T(!0)}}),a.querySelectorAll("[data-add-track]").forEach(O=>{O.onclick=async J=>{J.stopPropagation(),!(!v||!O.dataset.addTrack)&&(await v("add_tracks_to_playlist",{playlistId:P,trackIds:[O.dataset.addTrack]}),U("melo:playlist-changed",{playlistId:P}))}}),a.querySelectorAll("[data-track-id]").forEach(O=>{O.onclick=async J=>{if(J.target.closest("[data-add-track]"))return;const D=Number(O.dataset.pageIndex||0),pt=u.filter(Z=>"path"in Z).map(ft);v&&pt.length&&(await v("replace_playlist_tracks",{playlistId:P,trackIds:pt.map(Z=>Z.id)}),U("melo:playlist-changed",{playlistId:P})),U("melo:play-tracks",{tracks:pt,index:D})},O.oncontextmenu=J=>{J.preventDefault(),J.stopPropagation(),ht=O.dataset.trackId||null,st.style.display="block";const D=st.getBoundingClientRect();st.style.left=`${Math.max(6,Math.min(J.clientX,window.innerWidth-D.width-6))}px`,st.style.top=`${Math.max(6,Math.min(J.clientY,window.innerHeight-D.height-6))}px`}}),(E=a.querySelector("#virtualBack"))==null||E.addEventListener("click",()=>{K?K=null:V?V=null:nt=null,T(!0)}),(W=a.querySelector("#virtualAllTracks"))==null||W.addEventListener("click",()=>{K="__ALL__",T(!0)}))}async function Y(){var u;v&&(Q=await v("list_playlists"),Q.some(E=>E.id===P)||(P=((u=Q[0])==null?void 0:u.id)||"p1"),localStorage.setItem("melo-currentPlaylist",P),d&&(d.innerHTML=Q.map(E=>`<option value="${tt(E.id)}" ${E.id===P?"selected":""}>${tt(E.name)} (${E.trackCount})</option>`).join("")))}async function F(u=!1){if(!c||!v)return;u&&(c.scrollTop=0),c.style.display="block",c.style.position="relative",c.style.overflowY="auto";const E=Math.max(260,c.clientHeight||420),W=Math.max(0,Math.floor(c.scrollTop/mt)-8),O=Math.max(40,Math.ceil(E/mt)+16),J=++St,D=await v("playlist_tracks",{playlistId:P,search:(f==null?void 0:f.value)||null,sort:(w==null?void 0:w.value)||"default",limit:O,offset:W});if(J!==St)return;if(D.items=D.items.map(ft),M=D.items,s&&(s.style.display=D.total?"none":"block"),c.style.display=D.total?"block":"none",!D.total){c.innerHTML="";return}const pt=D.items.map((Z,bt)=>`<div class="track-row virtual-row" data-pl-track="${tt(Z.id)}" data-page-index="${bt}" style="position:absolute;left:0;right:0;top:${(D.offset+bt)*mt}px;height:${mt}px"><span class="num">${D.offset+bt+1}</span>${Z.cover?`<div class="track-cover-mini" style="background-image:url('${tt(Z.cover)}');background-size:cover;background-position:center"></div>`:`<div class="track-cover-mini cover-default" data-artwork-id="${tt(Z.id)}">♪</div>`}<div style="flex:1;min-width:0"><div class="t-title">${tt(Z.title)}</div><div class="t-artist">${tt(Z.artist)} • ${tt(Z.album)}</div></div><span class="t-dur">${ue(Z.duration)}</span><button class="btn small ghost" data-remove-track="${tt(Z.id)}">×</button></div>`).join("");c.innerHTML=`<div style="position:relative;height:${Math.max(E,D.total*mt)}px">${pt}</div>`,I(c),c.querySelectorAll("[data-pl-track]").forEach(Z=>{Z.onclick=bt=>{bt.target.closest("[data-remove-track]")||U("melo:play-tracks",{tracks:D.items,index:Number(Z.dataset.pageIndex||0)})}}),c.querySelectorAll("[data-remove-track]").forEach(Z=>{Z.onclick=async bt=>{bt.stopPropagation(),await v("remove_track_from_playlist",{playlistId:P,trackId:Z.dataset.removeTrack}),U("melo:playlist-changed",{playlistId:P})}})}async function _t(u,E){return v?v(u,E):null}async function qt(u,E="replace"){if(await N(),!v||!u.length)return[];const O=(await v("import_audio_files",{paths:u,playlistId:E==="none"?null:P,replacePlaylist:E==="replace"})).map(ft);return await Promise.all([B(),Y(),T(),F()]),U("melo:library-changed",{imported:O.length}),O}async function Yt(u,E=!1){if(await N(),!v)return null;if(z)return z;const W=await v("start_library_scan",{path:u});return z=W.scanId,h=W.scanId,b=E,r&&dt("Cancel Scan"),z}async function Ue(){if(!at)return;if(z&&v){await v("cancel_library_scan",{scanId:z});return}const{open:u}=await X(async()=>{const{open:W}=await import("./index-CS3Qnt9j.js");return{open:W}},__vite__mapDeps([5,1])),E=await u({directory:!0,multiple:!1});E&&await Yt(E)}async function Ve(u){if(await N(),!v)return null;const E=await v("get_track_by_id",{id:u});return E?ft(E):null}o==null||o.querySelectorAll("[data-libtab]").forEach(u=>{u.onclick=()=>{o.querySelectorAll("[data-libtab]").forEach(E=>E.classList.remove("active")),u.classList.add("active"),H=u.dataset.libtab||"artists",R(),T(!0)}}),n==null||n.addEventListener("input",()=>{lt=n.value.trim(),window.clearTimeout(Lt),Lt=window.setTimeout(()=>T(!0),180)}),a==null||a.addEventListener("scroll",()=>{window.clearTimeout(Lt),Lt=window.setTimeout(()=>T(),60)}),c==null||c.addEventListener("scroll",()=>{window.clearTimeout(vt),vt=window.setTimeout(()=>F(),60)}),f==null||f.addEventListener("input",()=>{window.clearTimeout(vt),vt=window.setTimeout(()=>F(!0),180)}),w==null||w.addEventListener("change",()=>F(!0)),d==null||d.addEventListener("change",()=>{P=d.value,localStorage.setItem("melo-currentPlaylist",P),F(!0)}),r==null||r.addEventListener("click",Ue),p==null||p.addEventListener("click",async()=>{if(v){if(z){alert("Cancel the active scan before clearing the Library database.");return}confirm("Clear all Library tracks, playlist contents, and cached artwork? This cannot be undone.")&&(await v("clear_library_database"),M=[],await Promise.all([B(),Y(),T(!0),F(!0)]),U("melo:library-changed",{cleared:!0}))}}),L==null||L.addEventListener("click",async()=>{await _t("clear_playlist",{playlistId:P}),await Promise.all([Y(),F(!0)]),U("melo:playlist-changed",{playlistId:P})}),g==null||g.addEventListener("click",async()=>{var W;const u=(W=prompt("New playlist name:"))==null?void 0:W.trim();if(!u)return;const E=await _t("create_playlist",{name:u});E&&(P=E.id),await Promise.all([Y(),F(!0)])}),x==null||x.addEventListener("click",async()=>{var J;if(!v)return;const u=[];let E=0;for(;;){const D=await v("playlist_tracks",{playlistId:P,search:null,sort:"default",limit:500,offset:E});if(u.push(...D.items),E+=D.items.length,E>=D.total||!D.items.length)break}if(!u.length)return;const W=`#EXTM3U
`+u.map(D=>`#EXTINF:${Math.floor(D.duration)},${D.artist} - ${D.title}
${D.path}`).join(`
`),O=document.createElement("a");O.href=URL.createObjectURL(new Blob([W],{type:"audio/x-mpegurl"})),O.download=`${((J=Q.find(D=>D.id===P))==null?void 0:J.name)||"playlist"}.m3u`,O.click(),setTimeout(()=>URL.revokeObjectURL(O.href),1e3)}),at&&X(async()=>{const{getCurrentWebviewWindow:u}=await import("./webviewWindow-mjQkSB26.js");return{getCurrentWebviewWindow:u}},__vite__mapDeps([6,7,1,0,8])).then(({getCurrentWebviewWindow:u})=>{u().onDragDropEvent(async E=>{if(E.payload.type!=="drop")return;const W=E.payload.paths||[];if(!W.length)return;const O=await qt(W,pe==="playlist"?"append":"replace");if(O.length)U("melo:play-tracks",{tracks:O,index:0});else for(const J of W)try{await Yt(J,pe!=="playlist")}catch{}})}).catch(()=>{}),it("melo:scan-progress",async u=>{if(u){if(u.scanId&&(z=u.scanId),r&&!u.finished&&dt(`Cancel ${u.done||0}/${u.total||"…"}`),r){const E=u.total?Math.max(0,Math.min(100,Number(u.done||0)/Number(u.total)*100)):0;r.style.setProperty("--scan-progress",`${E}%`),r.classList.toggle("scanning",!u.finished)}if(u.finished){if(u.scanId===h&&b&&!u.cancelled&&v){await v("replace_playlist_from_scan",{playlistId:P,scanId:u.scanId});const O=(await v("playlist_tracks",{playlistId:P,search:null,sort:"default",limit:100,offset:0})).items.map(ft);O.length&&U("melo:play-tracks",{tracks:O,index:0}),U("melo:playlist-changed",{playlistId:P})}z=null,h=null,b=!1,r&&(dt("Scan"),r.classList.remove("scanning"),r.style.setProperty("--scan-progress","0%")),await Promise.all([B(),Y(),T(),F()])}}});let ae=0;it("melo:library-changed",()=>{window.clearTimeout(ae),ae=window.setTimeout(()=>{B(),T(),F()},500)}),it("melo:playlist-changed",()=>{Y(),F()}),window.LumiLibrary={get tracks(){return M},get playlists(){return Q},scanFolder:Yt,importPaths:qt,getTrack:Ve,render:()=>T(),addTracks:()=>{},addToCurrentPlaylist:async u=>{!v||!u.length||(await v("add_tracks_to_playlist",{playlistId:P,trackIds:u.map(E=>E.id)}),U("melo:playlist-changed",{playlistId:P}))},currentPlaylistName:()=>{var u;return((u=Q.find(E=>E.id===P))==null?void 0:u.name)||"Playlist"}},N().catch(()=>i("Could not initialize the Library database"))}const Ht={flat:[0,0,0,0,0,0,0,0,0,0],pop:[-1,2,4,4,2,-1,-1,2,3,3],rock:[4,3,2,-1,-2,-2,1,3,4,4],bass:[6,5,4,2,1,0,-1,-1,-2,-3],treble:[-3,-2,-1,0,1,2,3,5,6,6],dance:[5,4,2,0,-1,-1,2,4,5,3],jazz:[2,1,2,3,2,0,1,2,3,2],classical:[3,2,1,0,0,0,-1,2,3,4],vocal:[-2,-1,0,2,4,4,3,1,0,-1],acoustic:[3,2,1,1,2,2,3,3,2,1],hiphop:[5,4,1,2,-1,-1,1,-1,2,3],metal:[4,2,-1,-2,-1,1,3,4,5,4]};function Kt(t){for(const[i,a]of Object.entries(Ht))if(a.every((e,n)=>e===t[n]))return i;return"custom"}function he(t,i,a={}){const e=!!a.remote,n=document.getElementById("eqEnable"),o=document.getElementById("eqPreset"),r=document.getElementById("btnEqReset"),p=document.getElementById("eqBands"),c=document.getElementById("eqCanvas"),s=c?c.getContext("2d"):null;let d=null,f=[],w=[],L=new Array(Dt.length).fill(0);try{const h=JSON.parse(localStorage.getItem("melo-eq-gains")||"null");Array.isArray(h)&&h.length===Dt.length&&(L=h.map(b=>typeof b=="number"?Math.max(-12,Math.min(12,b)):0))}catch{}let x=localStorage.getItem("melo-eq-preset")||Kt(L),g=localStorage.getItem("melo-eq-enabled")!=="0";function v(){if(!d)try{const h=Nt(t);d=h.ctx,f=h.filters,f.forEach((b,M)=>{b.gain.value=g?L[M]:0})}catch{}}function A(h,b){v(),f[h]&&g&&(f[h].gain.value=b)}function j(h){v(),L=[...h],g&&h.forEach((b,M)=>{f[M]&&(f[M].gain.value=b)}),z()}function P(h){v(),g=h,h?L.forEach((b,M)=>{f[M]&&(f[M].gain.value=b)}):f.forEach(b=>{b.gain.value=0}),z()}e||t&&t.addEventListener("play",()=>{v(),(d==null?void 0:d.state)==="suspended"&&d.resume().catch(()=>{})}),it("melo:eq",h=>{h&&(h.type==="gain"?(e||A(h.idx,h.val),L[h.idx]=h.val,w[h.idx]&&(w[h.idx].value=String(h.val),Q(w[h.idx])),o&&(o.value=Kt(L)),z()):h.type==="gains"?(e||j(h.values),L=[...h.values],w.length&&w.forEach((b,M)=>{b.value=String(L[M]),Q(b)}),o&&h.preset&&(o.value=h.preset),z()):h.type==="enable"&&(g=!!h.on,e||P(g),n&&(n.checked=g),z()))});function Q(h){var H;const b=parseInt(h.value),M=(H=h.parentElement)==null?void 0:H.querySelector(".val");M&&(M.textContent=(b>0?"+":"")+b+"dB")}function z(){if(!c||!s)return;const h=window.devicePixelRatio||1,b=c.clientWidth*h,M=c.clientHeight*h;if(b<=0||M<=0)return;c.width=b,c.height=M,s.clearRect(0,0,b,M);const H=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#2a7bd6",V=L;if(!g){s.strokeStyle="rgba(100,120,150,0.25)",s.lineWidth=2*h,s.beginPath(),s.moveTo(0,M/2),s.lineTo(b,M/2),s.stroke();return}s.strokeStyle=H,s.lineWidth=2.5*h,s.lineJoin="round",s.beginPath(),V.forEach((K,nt)=>{const lt=nt/(V.length-1)*b,et=M/2-K/12*(M/2-10*h);if(nt===0)s.moveTo(lt,et);else{const mt=(nt-1)/(V.length-1)*b,Mt=M/2-V[nt-1]/12*(M/2-10*h);s.quadraticCurveTo((mt+lt)/2,Mt,lt,et)}}),s.stroke(),V.forEach((K,nt)=>{const lt=nt/(V.length-1)*b,et=M/2-K/12*(M/2-10*h);s.fillStyle=H,s.beginPath(),s.arc(lt,et,4*h,0,Math.PI*2),s.fill(),s.fillStyle="white",s.beginPath(),s.arc(lt,et,2*h,0,Math.PI*2),s.fill()}),s.strokeStyle="rgba(100,120,150,0.3)",s.lineWidth=1*h,s.setLineDash([4*h,4*h]),s.beginPath(),s.moveTo(0,M/2),s.lineTo(b,M/2),s.stroke(),s.setLineDash([])}p&&(p.innerHTML="",Dt.forEach((h,b)=>{const M=L[b]||0,H=document.createElement("div");H.className="eq-band",H.innerHTML=`
        <input type="range" min="-12" max="12" value="${M}" step="1" data-idx="${b}" orient="vertical" />
        <label>${h>=1e3?h/1e3+"k":h}</label>
        <span style="font-size:10px;color:var(--text-muted);min-height:12px;" class="val">${(M>0?"+":"")+M+"dB"}</span>
      `,p.appendChild(H)}),w=Array.from(p.querySelectorAll("input")),w.forEach(h=>{h.addEventListener("input",()=>{const b=parseInt(h.dataset.idx),M=parseInt(h.value);Q(h),L[b]=M,z();const H=Kt(L);o&&(o.value=H),localStorage.setItem("melo-eq-gains",JSON.stringify(L)),localStorage.setItem("melo-eq-preset",H),e||A(b,M),U("melo:eq",{type:"gain",idx:b,val:M,values:L})})})),o&&(o.value=x,o.addEventListener("change",()=>{const h=Ht[o.value]||Ht.flat;w.length&&w.forEach((b,M)=>{b.value=String(h[M]),Q(b)}),L=[...h],z(),localStorage.setItem("melo-eq-gains",JSON.stringify(L)),localStorage.setItem("melo-eq-preset",o.value),e||j(h),U("melo:eq",{type:"gains",values:h,preset:o.value}),i(`Preset: ${o.options[o.selectedIndex].text}`)})),r&&r.addEventListener("click",()=>{const h=Ht.flat;w.length&&w.forEach((b,M)=>{b.value="0",Q(b)}),L=[...h],o&&(o.value="flat"),localStorage.setItem("melo-eq-gains",JSON.stringify(L)),localStorage.setItem("melo-eq-preset","flat"),e||j(h),U("melo:eq",{type:"gains",values:h,preset:"flat"}),z(),i("Equalizer reset to Flat (0dB)")}),n&&(n.checked=g,n.addEventListener("change",()=>{g=n.checked,localStorage.setItem("melo-eq-enabled",g?"1":"0"),e||P(g),U("melo:eq",{type:"enable",on:g}),z(),i(g?"Equalizer On":"Equalizer off — Flat")})),c&&new ResizeObserver(()=>z()).observe(c),z(),window.LumiEqualizer={presets:Ht,frequencies:Dt,displayGains:L,reset:()=>r==null?void 0:r.click()}}const Ot=[{id:"bars",label:"Classic Bars"},{id:"thin",label:"Thin Bars"},{id:"line",label:"Spectrum Line"},{id:"mirror",label:"Mirror Bars"},{id:"wave",label:"Oscilloscope"},{id:"spectrumWave",label:"Spectrum Wave"},{id:"blocks",label:"Block Equalizer"}];function ti(t){let i=document.getElementById("vizBars");if(!i)return;let a=g(i),e=a.getContext("2d"),n=null,o=null,r=null,p=null,c=null,s=!1,d=localStorage.getItem("melo-viz-mode")||"bars";Ot.some(m=>m.id===d)||(d="bars");let f=0,w=[],L=.45,x=null;function g(m){let y=m.querySelector("canvas");return y||(m.innerHTML="",y=document.createElement("canvas"),m.appendChild(y)),y}function v(){if(!(o&&r))try{const m=Nt(t);n=m.ctx,o=m.analyser,r=new Uint8Array(o.frequencyBinCount),p=new Uint8Array(o.fftSize)}catch{s=!0}}function A(m){const y=r.length,_=((n==null?void 0:n.sampleRate)||44100)/2,k=45,I=Math.min(15e3,_*.95),N=Math.log(k),$=Math.log(I),B=[];for(let R=0;R<m;R++){const G=Math.exp(N+($-N)*R/m),C=Math.exp(N+($-N)*(R+1)/m);let l=Math.floor(G/_*y),S=Math.max(l+1,Math.ceil(C/_*y));l<0&&(l=0),S>y&&(S=y);let T=0;for(let q=l;q<S;q++)T+=r[q];B.push(T/(S-l)/255)}return B}function j(m){const y=performance.now()/1e3,_=Math.pow(Math.abs(Math.sin(y*2.2)),2.5),k=[];for(let I=0;I<m;I++){let N=.42+.26*Math.sin(y*1.35+I*.62)+.2*Math.sin(y*2.9+I*1.31)+Math.random()*.07;N*=.55+.5*_,k.push(Math.max(.04,Math.min(1,N)))}return k}function P(m){const y=performance.now()/1e3,_=.5+.5*Math.pow(Math.abs(Math.sin(y*1.9)),2);for(let k=0;k<m.length;k++){const I=k/m.length;m[k]=128+66*_*(Math.sin(I*Math.PI*6+y*7)*.6+Math.sin(I*Math.PI*13-y*11)*.4)}}function Q(m){let y;if(s||!o||!r)y=j(m);else if(o.getByteFrequencyData(r),y=A(m),!y.some(I=>I>.01)&&!t.paused)y=j(m);else for(let I=0;I<m;I++)y[I]*=1+1.7*(I/Math.max(1,m-1));let _=0;for(const k of y)k>_&&(_=k);_>L?L=_:L=Math.max(.35,L*.985),w.length!==m&&(w=new Array(m).fill(0));for(let k=0;k<m;k++){const I=Math.min(1,y[k]/L),N=I>w[k]?.55:.16;w[k]+=(I-w[k])*N}return w}function z(m,y){return getComputedStyle(document.documentElement).getPropertyValue(m).trim()||y}function h(){return a.width/Math.max(1,a.clientWidth)||1}function b(m,y,_,k,I){if(I=Math.min(I,_/2,k/2),e.roundRect){e.roundRect(m,y,_,k,I);return}e.rect(m,y,_,k)}function M(){const m=window.devicePixelRatio||1,y=a.clientWidth||(i==null?void 0:i.clientWidth)||200,_=a.clientHeight||(i==null?void 0:i.clientHeight)||56;y>0&&_>0&&(a.width=Math.round(y*m),a.height=Math.round(_*m))}new ResizeObserver(M).observe(a),M();function H(m,y,_,k){const I=h(),N=z("--visualizer","#38bdf8"),$=z("--accent","#0284c7"),B=m.length,R=y/B,G=Math.max(1.2*I,R*(1-k));for(let C=0;C<B;C++){const l=m[C],S=Math.max(2*I,l*(_-4*I)),T=C*R+(R-G)/2,q=_-S-1*I,Y=e.createLinearGradient(0,q,0,_);Y.addColorStop(0,$),Y.addColorStop(1,N),e.fillStyle=Y,e.beginPath(),b(T,q,G,S,Math.min(G/2,3.5*I)),e.fill()}}function V(m,y,_){const k=h(),I=z("--visualizer","#38bdf8"),N=z("--accent","#0284c7"),$=m.length,B=y/$,R=_/2,G=Math.max(1.5*k,B*.62);for(let C=0;C<$;C++){const l=Math.max(1.5*k,m[C]*(_/2-3*k)),S=C*B+(B-G)/2,T=e.createLinearGradient(0,R-l,0,R+l);T.addColorStop(0,N),T.addColorStop(.5,I),T.addColorStop(1,N),e.fillStyle=T,e.beginPath(),b(S,R-l,G,l*2,Math.min(G/2,3*k)),e.fill()}}function K(m,y,_){const k=h(),I=z("--visualizer","#38bdf8"),N=z("--accent","#0284c7"),$=m.length,B=[],R=[];for(let C=0;C<$;C++)B.push((C+.5)/$*y),R.push(_-2*k-m[C]*(_-8*k));e.beginPath(),e.moveTo(B[0],_),e.lineTo(B[0],R[0]);for(let C=1;C<$;C++){const l=(B[C-1]+B[C])/2;e.quadraticCurveTo(B[C-1],R[C-1],l,(R[C-1]+R[C])/2)}e.lineTo(B[$-1],R[$-1]),e.lineTo(B[$-1],_),e.closePath();const G=e.createLinearGradient(0,0,0,_);G.addColorStop(0,I),G.addColorStop(1,"transparent"),e.globalAlpha=.18,e.fillStyle=G,e.fill(),e.globalAlpha=1,e.beginPath(),e.moveTo(B[0],R[0]);for(let C=1;C<$;C++){const l=(B[C-1]+B[C])/2;e.quadraticCurveTo(B[C-1],R[C-1],l,(R[C-1]+R[C])/2)}e.lineTo(B[$-1],R[$-1]),e.strokeStyle=N,e.lineWidth=2*k,e.lineJoin="round",e.stroke()}function nt(m,y,_){const k=h(),I=z("--visualizer","#38bdf8"),N=z("--accent","#0284c7"),$=_/2,B=m.length,R=m.map((l,S)=>{const T=S/Math.max(1,B-1),q=Math.pow(Math.sin(Math.PI*T),.28);return Math.max(.7*k,l*q*(_*.46))}),G=l=>{e.beginPath();for(let S=0;S<B;S++){const T=S/Math.max(1,B-1)*y,q=$+(l?-R[S]:R[S]);if(S===0)e.moveTo(T,q);else{const Y=(S-1)/Math.max(1,B-1)*y,F=$+(l?-R[S-1]:R[S-1]);e.quadraticCurveTo(Y,F,(Y+T)/2,(F+q)/2)}}};G(!0);for(let l=B-1;l>=0;l--){const S=l/Math.max(1,B-1)*y;e.lineTo(S,$+R[l])}e.closePath();const C=e.createLinearGradient(0,0,0,_);C.addColorStop(0,N),C.addColorStop(.5,I),C.addColorStop(1,N),e.fillStyle=C,e.globalAlpha=.3,e.fill(),e.globalAlpha=.18,e.shadowColor=I,e.shadowBlur=8*k,G(!0),e.strokeStyle=I,e.lineWidth=4*k,e.stroke(),G(!1),e.stroke(),e.shadowBlur=0,e.globalAlpha=1,G(!0),e.strokeStyle=N,e.lineWidth=1.2*k,e.stroke(),G(!1),e.stroke(),e.beginPath(),e.moveTo(0,$),e.lineTo(y,$),e.strokeStyle=I,e.globalAlpha=.45,e.lineWidth=.8*k,e.stroke(),e.globalAlpha=1}function lt(m,y,_){const k=h(),I=z("--visualizer","#38bdf8"),N=z("--accent","#0284c7"),$=m.length,B=8,R=Math.max(1*k,y*.0035),G=Math.max(1*k,_*.025),C=Math.max(1,(y-R*($-1))/$),l=Math.max(1,(_-G*(B-1))/B),S=e.createLinearGradient(0,0,0,_);S.addColorStop(0,N),S.addColorStop(1,I),e.fillStyle=S;for(let T=0;T<$;T++){const q=Math.max(1,Math.min(B,Math.round(m[T]*B))),Y=T*(C+R);for(let F=0;F<q;F++){const _t=_-(F+1)*l-F*G;e.globalAlpha=.58+.42*((F+1)/B),e.fillRect(Y,_t,C,l)}}e.globalAlpha=1}function et(){const m=a.width,y=a.height,_=h(),k=z("--accent","#0284c7");let I;s||!o||!p?(c||(c=new Uint8Array(1024)),P(c),I=c):(o.getByteTimeDomainData(p),I=p);const N=()=>{e.beginPath();for(let $=0;$<=m;$+=2){const B=Math.min(I.length-1,Math.floor($/m*I.length)),R=I[B]/255*y;$===0?e.moveTo($,R):e.lineTo($,R)}};N(),e.strokeStyle=k,e.globalAlpha=.16,e.lineWidth=6*_,e.lineJoin="round",e.stroke(),N(),e.globalAlpha=1,e.lineWidth=1.8*_,e.stroke()}function mt(){const m=a.width,y=a.height;if(!m||!y)return;if(e.clearRect(0,0,m,y),d==="wave"){et();return}const k=Q(d==="bars"?16:d==="thin"?56:d==="line"?64:d==="spectrumWave"?72:d==="blocks"?22:24);d==="bars"?H(k,m,y,.34):d==="thin"?H(k,m,y,.32):d==="line"?K(k,m,y):d==="mirror"?V(k,m,y):d==="spectrumWave"?nt(k,m,y):d==="blocks"&&lt(k,m,y)}function Mt(){f=requestAnimationFrame(Mt),mt()}function St(){f||Mt()}function Lt(m,y=!1){d=m,w=[],localStorage.setItem("melo-viz-mode",m)}function vt(){return x||(x=document.createElement("div"),x.className="viz-menu",x.style.display="none",document.body.appendChild(x),x)}function ht(){const m=vt();m.innerHTML='<div class="viz-menu-label">Visualizer type</div>'+Ot.map(y=>`<button class="viz-menu-item ${y.id===d?"active":""}" data-mode="${y.id}">${y.id===d?"✓":""}<span>${y.label}</span></button>`).join(""),m.querySelectorAll("[data-mode]").forEach(y=>{y.addEventListener("click",_=>{_.stopPropagation(),Lt(y.dataset.mode),dt()})})}function st(m,y){ht();const _=x;_.style.display="block";const k=_.getBoundingClientRect();_.style.left=Math.max(8,Math.min(m,window.innerWidth-k.width-8))+"px",_.style.top=Math.max(8,Math.min(y,window.innerHeight-k.height-8))+"px"}function dt(){x&&(x.style.display="none")}function gt(){i&&(i.title="Click: next mode • Right-click: choose mode",i.addEventListener("click",()=>{dt();const m=Ot.findIndex(y=>y.id===d);Lt(Ot[(m+1)%Ot.length].id)}),i.addEventListener("contextmenu",m=>{m.preventDefault(),m.stopPropagation(),st(m.clientX,m.clientY)}))}document.addEventListener("click",m=>{x&&x.style.display!=="none"&&!x.contains(m.target)&&dt()}),document.addEventListener("keydown",m=>{m.key==="Escape"&&dt()});function ft(){v(),St(),(n==null?void 0:n.state)==="suspended"&&n.resume().catch(()=>{})}t.addEventListener("play",ft),ft(),gt(),document.addEventListener("visibilitychange",()=>{document.hidden?(cancelAnimationFrame(f),f=0):St()});function yt(){cancelAnimationFrame(f),f=0,i=document.getElementById("vizBars"),i&&(a=g(i),e=a.getContext("2d"),new ResizeObserver(M).observe(a),M(),gt(),St())}window.__LUMI_REBIND_VISUALIZER__=yt}function ge(t){if(!t||!t.trim())return{isSynced:!1,lines:[],raw:""};const i=[],a=t.split(/\r?\n/),e=/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;let n=!1;for(const o of a){const r=o.trim();if(!r||/^\[[a-z]{2,8}:/i.test(r))continue;const p=[...r.matchAll(e)];if(p.length>0){n=!0;const c=r.replace(e,"").trim();for(const s of p){const d=parseInt(s[1],10),f=parseInt(s[2],10),w=s[3]||"0",L=w.length===2?parseInt(w,10)*10:w.length===1?parseInt(w,10)*100:parseInt(w.slice(0,3),10),x=d*60+f+L/1e3;i.push({time:x,text:c})}}else i.push({time:-1,text:r})}return i.sort((o,r)=>o.time-r.time),{isSynced:n,lines:i,raw:t}}function fe(t,i){var x;const a=document.getElementById("lyricsContainer"),e=document.getElementById("lyricsStatus"),n=document.getElementById("lyricsTrackTitle");let o={isSynced:!1,lines:[]},r=null,p=-1,c=0;async function s(g){if(g.lyrics&&g.lyrics.trim().length>0)return g.lyrics;if(window.__TAURI__)try{const{invoke:v}=await X(async()=>{const{invoke:j}=await import("./core-DhEqZVGG.js");return{invoke:j}},[]),A=await v("get_track_lyrics",{path:g.path});if(A)return A}catch{}return null}async function d(g){if(!g){r=null,o={isSynced:!1,lines:[],raw:""},n&&(n.textContent="No track playing"),f();return}r=g.id,n&&(n.textContent=`${g.title} — ${g.artist}`);const v=await s(g);o=ge(v||""),f()}function f(){if(a){if(a.innerHTML="",p=-1,!o.lines.length){e&&(e.style.display="block",e.innerHTML='No synced lyrics found (.lrc)<br/><span style="font-size:10.5px; opacity:0.7;">Place a matching .lrc file in the song folder or add lyrics in the tag editor.</span>');return}e&&(e.style.display="none"),o.lines.forEach((g,v)=>{const A=document.createElement("div");A.className="lyric-line",A.dataset.idx=String(v),A.dataset.time=String(g.time),A.textContent=g.text||"♪",g.time>=0&&(A.style.cursor="pointer",A.title=`Seek to ${Math.floor(g.time/60)}:${Math.floor(g.time%60).toString().padStart(2,"0")}`,A.addEventListener("click",()=>{U("melo:seek-playback",g.time),window.__TAURI__||(t.currentTime=g.time,t.play().catch(()=>{}))})),a.appendChild(A)})}}function w(){if(!a||!o.isSynced||!o.lines.length)return;const g=window.__TAURI__?c:t.currentTime;let v=-1;for(let A=0;A<o.lines.length&&o.lines[A].time<=g;A++)v=A;if(v!==p){p=v;const A=a.querySelectorAll(".lyric-line");if(A.forEach((j,P)=>{j.classList.toggle("active",P===p),j.classList.toggle("passed",P<p)}),p>=0&&A[p]){const j=A[p],P=a.clientHeight,z=j.offsetTop-a.offsetTop-P/2+j.clientHeight/2;a.scrollTo({top:Math.max(0,z),behavior:"smooth"})}}}t.addEventListener("timeupdate",w),window.addEventListener("lumi:trackChange",g=>{d(g.detail)}),it("melo:track-changed",g=>{d(g)}),it("melo:playback-state",g=>{g&&(c=Number(g.currentTime)||0,g.track&&g.track.id!==r?d(g.track):w())}),it("melo:playback-position",g=>{c=Number(g)||0,w()});const L=window.__LUMI_QUEUE__;if(Array.isArray(L)&&L.length>0)d(L[((x=window.LumiPlayer)==null?void 0:x.currentIndex)||0]);else try{const g=JSON.parse(localStorage.getItem("melo-current-track")||"null");g&&d(g)}catch{}U("melo:request-playback-state"),setTimeout(()=>U("melo:request-playback-state"),250),window.LumiLyrics={loadTrackLyrics:d,parseLRC:ge}}let Et=null;const ve=`<!doctype html>
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
`,ye=`<!doctype html>
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
`,Wt={"compact-pill-light.html":ve,"compact-pill-dark.html":ye,"compact-pill-light":ve,"compact-pill-dark":ye},ei=[{id:"compact-pill-light",name:"Minimal Compact (Light)",filename:"compact-pill-light.html"},{id:"compact-pill-dark",name:"Minimal Compact (Dark)",filename:"compact-pill-dark.html"},{id:"full-html-example",name:"Full HTML Example",filename:"full-html-example.html"},{id:"example-custom",name:"Custom CSS Example",filename:"example-custom.html"}];function Le(t){const i=["trackTitle","btnPlay","seekBar","coverImg"];let a=0;for(const e of i)t.includes(e)&&a++;return a>=3}function Bt(t,i){const a=document.getElementById("playerCard");if(!a)return;const e=a._originalHTML||a.innerHTML;a._originalHTML||(a._originalHTML=e),Et&&(Et.remove(),Et=null);let o=[...t.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(f=>f[1]).join(`
`);o&&(Et=document.createElement("style"),Et.id="melo-custom-skin",Et.textContent=o,document.head.appendChild(Et));const r=Le(t);let p="";const c=t.match(/<body[^>]*>([\s\S]*?)<\/body>/i);c?p=c[1]:p=t.split(/<\/style>/i).pop()||"";const s=document.createElement("div");s.innerHTML=p;const d=s.querySelector("#lumi-player");if(d&&(p=d.innerHTML),r&&p.trim().length>20){const f=p.trim();a.innerHTML=f,i&&i("Skin applied"),setTimeout(()=>{var L,x;(L=window.__LUMI_REBIND__)==null||L.call(window);const w=window.__LUMI_AUDIO__;w&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(w),(x=window.__LUMI_REBIND_MAIN__)==null||x.call(window)},40)}else o&&i&&i("Skin CSS applied");localStorage.setItem("lumi-custom-skin",t),localStorage.setItem("lumi-custom-skin-isFull",r?"1":"0")}function Qt(t,i=!0){document.documentElement.classList.remove("compact-skin-active"),document.body.classList.remove("compact-skin-active"),Et&&(Et.remove(),Et=null);const a=document.getElementById("playerCard");a&&a._originalHTML&&(a.innerHTML=a._originalHTML,setTimeout(()=>{var n,o;(n=window.__LUMI_REBIND__)==null||n.call(window);const e=window.__LUMI_AUDIO__;e&&window.__LUMI_REBIND_VISUALIZER__&&window.__LUMI_REBIND_VISUALIZER__(e),(o=window.__LUMI_REBIND_MAIN__)==null||o.call(window)},40)),localStorage.removeItem("lumi-custom-skin"),localStorage.removeItem("lumi-custom-skin-isFull"),localStorage.setItem("melo-active-skin-id","default"),i&&U("melo:skin-changed","default"),t&&t("Switched to Default Melo skin")}async function _e(){if(at)try{const{invoke:t}=await X(async()=>{const{invoke:a}=await import("./core-DhEqZVGG.js");return{invoke:a}},[]),i=await t("list_installed_skins");if(Array.isArray(i)&&i.length>0)return i}catch{}return ei}async function Ie(t,i){if(at)try{const{invoke:e}=await X(async()=>{const{invoke:o}=await import("./core-DhEqZVGG.js");return{invoke:o}},[]),n=await e("read_skin_file",{filenameOrPath:t});if(n&&n.trim().length>0)return Bt(n,i),!0}catch{}try{const e=t.startsWith("skins/")?t:`skins/${t}`,n=await fetch(e);if(n.ok){const o=await n.text();return Bt(o,i),!0}}catch{}const a=t.replace(/^.*[\\/]/,"");return Wt[a]?(Bt(Wt[a],i),!0):(i&&i(`Could not load skin: ${t}`),!1)}async function Ct(t,i,a,e=!0){if(t==="default"){Qt(a,e);return}let n=t;const o=t==="compact-pill"||t.startsWith("compact-pill");document.documentElement.classList.toggle("compact-skin-active",o),document.body.classList.toggle("compact-skin-active",o),o?n=i==="dark"?"compact-pill-dark.html":"compact-pill-light.html":!n.endsWith(".html")&&!n.endsWith(".htm")&&(n=n+".html");let r=!1;o&&Wt[n]?(Bt(Wt[n],a),r=!0):r=await Ie(n,a),r&&(localStorage.setItem("melo-active-skin-id",t),e&&U("melo:skin-changed",t))}async function Te(t){if(at)try{const{invoke:i}=await X(async()=>{const{invoke:a}=await import("./core-DhEqZVGG.js");return{invoke:a}},[]);await i("open_skins_folder"),t&&t("Opening skins folder...")}catch{t&&t("Could not open skins folder")}else t&&t("Skins are located in the skins/ folder")}function ii(t){const i=document.getElementById("skinUpload"),a=document.getElementById("linkDownloadExample");a&&a.addEventListener("click",o=>{o.preventDefault(),Ie("compact-pill-light.html")});const e=localStorage.getItem("melo-active-skin-id")||"default",n=localStorage.getItem("lumi-theme")||"dark";e!=="default"&&setTimeout(()=>{Ct(e,n,void 0,!1)},150),it("melo:theme",o=>{const r=localStorage.getItem("melo-active-skin-id");r&&r!=="default"&&Ct(r,o,void 0,!1)}),it("melo:skin-changed",o=>{if(o&&typeof o=="string"){const r=localStorage.getItem("lumi-theme")||"dark";Ct(o,r,void 0,!1)}}),i&&i.addEventListener("change",async()=>{var c;const o=(c=i.files)==null?void 0:c[0];if(!o)return;const r=await o.text(),p=o.name;if(at)try{const{invoke:s}=await X(async()=>{const{invoke:d}=await import("./core-DhEqZVGG.js");return{invoke:d}},[]);await s("save_custom_skin_file",{filename:p,content:r}),t(`Saved ${p} to skins folder`)}catch{}Bt(r,t),localStorage.setItem("melo-active-skin-id",p),U("melo:skin-changed",p),i.value=""}),document.addEventListener("dragover",o=>{var r;[...((r=o.dataTransfer)==null?void 0:r.types)||[]].includes("Files")&&o.preventDefault()}),document.addEventListener("drop",async o=>{var p;const r=[...((p=o.dataTransfer)==null?void 0:p.files)||[]].find(c=>c.name.endsWith(".html")||c.name.endsWith(".htm"));if(r){o.preventDefault();const c=await r.text();if(c.includes("<style")||c.includes("<html")||Le(c)){const s=r.name;if(at)try{const{invoke:d}=await X(async()=>{const{invoke:f}=await import("./core-DhEqZVGG.js");return{invoke:f}},[]);await d("save_custom_skin_file",{filename:s,content:c})}catch{}Bt(c,t),localStorage.setItem("melo-active-skin-id",s),U("melo:skin-changed",s)}}}),window.LumiSkin={applyCustomSkin:Bt,resetSkin:Qt,applySkinChoice:Ct,listInstalledSkins:_e,openSkinsFolderOnDisk:Te}}const ai=(t,i,a)=>{const e=t[i];return e?typeof e=="function"?e():Promise.resolve(e):new Promise((n,o)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(o.bind(null,new Error("Unknown variable dynamic import: "+i+(i.split("/").length!==a?". Note that variables only represent file names one level deep.":""))))})},Ae={code:"en",name:"English",nativeName:"English",authors:["Melo Team"]},te={_meta:Ae,"settings.tabs.general":"General","settings.tabs.playback":"Playback","settings.tabs.appearance":"Appearance & Skin","settings.tabs.shortcuts":"Shortcuts","settings.tabs.about":"About","settings.general.language.label":"Language","settings.general.language.desc":"Interface language — more languages coming via community translation","settings.general.tray.label":"Close to system tray","settings.general.tray.desc":"Minimize to system tray on window close","settings.general.resume.label":"Resume playback on reopen","settings.general.resume.desc":"Continue playback of the previous track where you left off","settings.playback.replaygain.label":"ReplayGain normalization","settings.playback.replaygain.desc":"Equalize track volume levels automatically","settings.playback.fadepause.label":"Fade out on pause","settings.playback.fadepause.desc":"Smooth 0.3s fade-out on pause, fade back in on resume","settings.appearance.showstop.label":"Show Stop button","settings.appearance.showstop.desc":"Display a Stop control next to Play/Pause in the player"},ni=Object.freeze(Object.defineProperty({__proto__:null,_meta:Ae,default:te},Symbol.toStringTag,{value:"Module"})),Ce=[{code:"en",nativeName:"English"}],At={en:te};let Be=At.en,ze="en";function oi(){return ze}async function Pe(t){if(Ce.some(i=>i.code===t)||(t="en"),!At[t])if(t==="en")At.en=te;else try{const i=await ai(Object.assign({"./locales/en.json":()=>X(()=>Promise.resolve().then(()=>ni),void 0)}),`./locales/${t}.json`,3);At[t]=i.default||i}catch{t="en"}ze=t,Be=At[t]||At.en,localStorage.setItem("melo-pref-language",t),document.dispatchEvent(new CustomEvent("melo:locale-changed",{detail:t}))}function rt(t){var i,a;return(a=(i=Be[t])!=null?i:At.en[t])!=null?a:t}function be(){const t=localStorage.getItem("melo-pref-language")||"en";Pe(t)}const Re=document.querySelector("#app");Re.innerHTML=`
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
        <div class="library-search-row">
          <div class="search-wrap">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input id="searchInput" class="search-input" placeholder="Search artist, album, track…" />
          </div>
          <button class="btn small library-action scan-action" id="btn-scan" title="Scan a music folder">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><path d="M12 10v6M9 13h6"/></svg>
            <span class="scan-label">Scan</span>
          </button>
          <button class="btn small library-action danger" id="btn-clear-library" title="Clear the entire Library database">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>
            <span>Clear</span>
          </button>
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
          <button class="settings-tab active" data-stab="general"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>${rt("settings.tabs.general")}</button>
          <button class="settings-tab" data-stab="playback"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4z"/></svg>${rt("settings.tabs.playback")}</button>
          <button class="settings-tab" data-stab="appearance"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>${rt("settings.tabs.appearance")}</button>
          <button class="settings-tab" data-stab="shortcuts"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M18 14h.01M9 14h6"/></svg>${rt("settings.tabs.shortcuts")}</button>
          <button class="settings-tab" data-stab="about"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>${rt("settings.tabs.about")}</button>
        </div>

        <!-- GENERAL TAB -->
        <div class="settings-section active" data-panel="general">
          <div class="settings-row">
            <div><div class="label">${rt("settings.general.language.label")}</div><div class="desc">${rt("settings.general.language.desc")}</div></div>
            <select class="settings-select" id="setLanguage">${Ce.map(t=>`<option value="${t.code}">${t.nativeName}</option>`).join("")}</select>
          </div>
          <div class="settings-row">
            <div><div class="label">${rt("settings.general.tray.label")}</div><div class="desc">${rt("settings.general.tray.desc")}</div></div>
            <div class="switch on" id="swTray" data-key="tray"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">${rt("settings.general.resume.label")}</div><div class="desc">${rt("settings.general.resume.desc")}</div></div>
            <div class="switch on" id="swResume" data-key="resume"></div>
          </div>
        </div>

        <!-- PLAYBACK TAB -->
        <div class="settings-section" data-panel="playback">
          <div class="settings-row">
            <div><div class="label">${rt("settings.playback.replaygain.label")}</div><div class="desc">${rt("settings.playback.replaygain.desc")}</div></div>
            <div class="switch on" id="swReplayGain" data-key="replayGainGlobal"></div>
          </div>
          <div class="settings-row">
            <div><div class="label">${rt("settings.playback.fadepause.label")}</div><div class="desc">${rt("settings.playback.fadepause.desc")}</div></div>
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
            <div><div class="label">${rt("settings.appearance.showstop.label")}</div><div class="desc">${rt("settings.appearance.showstop.desc")}</div></div>
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
`;const ot=new URLSearchParams(location.search).get("panel");ot&&(document.documentElement.classList.add("panel-window",`panel-${ot}`),document.body.classList.add("panel-window",`panel-${ot}`));var ke,Me;if(at&&ot){X(async()=>{const{getCurrentWindow:e}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:e}},__vite__mapDeps([8,7,1,0])).then(({getCurrentWindow:e})=>{const n=e();si(n,"melo-geo-panel-"+ot),n.onCloseRequested(()=>{U("melo:panel-closed",ot)}),window.addEventListener("beforeunload",()=>{U("melo:panel-closed",ot)})});const t=document.getElementById("win-"+ot),i=((ke=t==null?void 0:t.querySelector(".float-title"))==null?void 0:ke.innerHTML)||"",a=((Me=t==null?void 0:t.querySelector(".float-body"))==null?void 0:Me.innerHTML)||"";Re.innerHTML=`
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
</div>`}at&&!ot&&(document.documentElement.classList.add("tauri-main"),document.body.classList.add("tauri-main"),document.querySelectorAll(".side-actions .sbtn").forEach(t=>t.classList.remove("active")),X(async()=>{const{WebviewWindow:t}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:t}},__vite__mapDeps([6,7,1,0,8])).then(({WebviewWindow:t})=>{const i=async()=>{var a;for(const e of["library","playlist","equalizer","lyrics","settings"])try{const n=await t.getByLabel("panel-"+e);(a=document.getElementById(ee[e]))==null||a.classList.toggle("active",!!n)}catch{}};i(),setInterval(i,1200)}));at&&!ot&&(X(()=>import("./window-BWd3Cypy.js"),__vite__mapDeps([8,7,1,0])).then(async({getCurrentWindow:t})=>{const i=t(),a=()=>{const n=localStorage.getItem("melo-active-skin-id"),o=n==="compact-pill"||typeof n=="string"&&n.startsWith("compact-pill");return{w:o?780:960,h:o?138:240}};try{const n=JSON.parse(localStorage.getItem("melo-geo-main")||"null"),{LogicalPosition:o,LogicalSize:r}=await X(async()=>{const{LogicalPosition:d,LogicalSize:f}=await import("./dpi-fvP-W2qr.js");return{LogicalPosition:d,LogicalSize:f}},__vite__mapDeps([7,1])),p=a(),c=p.w===780,s=c?p.w:n!=null&&n.w?Math.max(650,n.w):p.w;await i.setSize(new r(s,p.h)),await i.setResizable(!c),(n==null?void 0:n.x)!=null&&(n==null?void 0:n.y)!=null&&await i.setPosition(new o(n.x,n.y))}catch{}const e=async()=>{try{const n=await i.outerPosition(),o=await i.innerSize(),r=a();localStorage.setItem("melo-geo-main",JSON.stringify({x:n.x,y:n.y,w:o.width,h:r.h}))}catch{}};i.onMoved(e),i.onResized(async()=>{try{const n=await i.innerSize(),o=a(),r=o.w===780,{LogicalSize:p}=await X(async()=>{const{LogicalSize:c}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:c}},__vite__mapDeps([7,1]));if(!r){const c=n.toLogical(await i.scaleFactor());(c.width<650||c.height!==o.h)&&await i.setSize(new p(Math.max(650,c.width),o.h))}}catch{}e()}),it("melo:skin-changed",async n=>{try{!ot&&n&&await Ct(n,Tt,void 0,!1);const o=n==="compact-pill"||typeof n=="string"&&n.startsWith("compact-pill"),r=o?780:960,p=o?138:240,{LogicalSize:c}=await X(async()=>{const{LogicalSize:s}=await import("./dpi-fvP-W2qr.js");return{LogicalSize:s}},__vite__mapDeps([7,1]));await i.setSize(new c(r,p)),await i.setResizable(!o),e()}catch{}}),i.onCloseRequested(async n=>{if(n.preventDefault(),localStorage.getItem("melo-pref-tray")!=="0")try{await i.hide();return}catch{}const{WebviewWindow:r}=await X(async()=>{const{WebviewWindow:p}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:p}},__vite__mapDeps([6,7,1,0,8]));for(const p of["library","playlist","equalizer","lyrics","settings"])try{const c=await r.getByLabel("panel-"+p);c&&await c.close()}catch{}try{await i.destroy()}catch{window.close()}})}),X(()=>import("./core-DhEqZVGG.js"),[]).then(async({invoke:t})=>{try{const i=await t("get_cli_tracks");Array.isArray(i)&&i.length>0&&setTimeout(async()=>{const a=window.LumiLibrary,e=i.map(o=>o.path).filter(Boolean),n=await(a==null?void 0:a.importPaths(e,"replace"))||[];n.length&&U("melo:play-tracks",{tracks:n,index:0})},350)}catch{}}),it("melo:open-files",t=>{if(Array.isArray(t)&&t.length>0){const i=t.map(a=>a.path).filter(Boolean);setTimeout(async()=>{const a=window.LumiLibrary,e=await(a==null?void 0:a.importPaths(i,"replace"))||[];e.length&&U("melo:play-tracks",{tracks:e,index:0})},100)}}));document.addEventListener("contextmenu",t=>{t.preventDefault()});const Vt=document.getElementById("toast"),ct=t=>{Vt&&(Vt.textContent=t,Vt.classList.add("show"),setTimeout(()=>Vt.classList.remove("show"),2200))},xt=new Audio;xt.preload="metadata";xt.crossOrigin="anonymous";window.__LUMI_AUDIO__=xt;window.__TOAST__=ct;localStorage.getItem("melo-dynamic-theme")===null&&localStorage.setItem("melo-dynamic-theme","1");let Tt=localStorage.getItem("lumi-theme")||"dark";function jt(t){document.documentElement.setAttribute("data-theme",t),localStorage.setItem("lumi-theme",t),Tt=t}function qe(t){jt(t),U("melo:theme",t)}jt(Tt);it("melo:theme",t=>{(t==="light"||t==="dark")&&jt(t)});setInterval(()=>{const t=localStorage.getItem("lumi-theme");(t==="light"||t==="dark")&&t!==Tt&&jt(t)},1e3);document.body.classList.toggle("show-stop-btn",localStorage.getItem("melo-pref-showStopBtn")==="1");it("melo:pref-changed",t=>{t&&t.key==="showStopBtn"&&document.body.classList.toggle("show-stop-btn",!!t.value)});const li=["win-library","win-playlist","win-equalizer","win-lyrics","win-settings"],Ft=document.getElementById("desktop"),$e={btnToggleLibrary:"win-library",btnTogglePlaylist:"win-playlist",btnToggleEq:"win-equalizer",btnToggleLyrics:"win-lyrics",btnOpenSettings:"win-settings",menuToggleLibrary:"win-library",menuTogglePlaylist:"win-playlist",menuToggleEq:"win-equalizer",menuToggleLyrics:"win-lyrics",menuToggleSettings:"win-settings"};function ri(t){const i=document.getElementById(t);return!!i&&!i.classList.contains("hidden")}const ee={library:"btnToggleLibrary",playlist:"btnTogglePlaylist",equalizer:"btnToggleEq",lyrics:"btnToggleLyrics",settings:"btnOpenSettings"};async function si(t,i){const a=async()=>{try{const e=await t.outerPosition(),n=await t.outerSize();localStorage.setItem(i,JSON.stringify({x:e.x,y:e.y,w:n.width,h:n.height}))}catch{}};t.onMoved(a),t.onResized(a)}async function ci(t){const{WebviewWindow:i}=await X(async()=>{const{WebviewWindow:d}=await import("./webviewWindow-mjQkSB26.js");return{WebviewWindow:d}},__vite__mapDeps([6,7,1,0,8])),a="panel-"+t,e=document.getElementById(ee[t]),n=await i.getByLabel(a);if(n){await n.close(),e==null||e.classList.remove("active");return}const o={library:[430,620],playlist:[440,560],equalizer:[700,440],lyrics:[380,520],settings:[600,540]},r={library:[360,400],playlist:[360,360],equalizer:[620,400],lyrics:[320,360],settings:[500,400]},p={library:"Library",playlist:"Playlist",equalizer:"Equalizer",lyrics:"Lyric",settings:"Settings"},c=o[t]||[420,520];let s=null;try{s=JSON.parse(localStorage.getItem("melo-geo-panel-"+t)||"null")}catch{}new i(a,{url:`/?panel=${t}`,title:p[t]||t,width:(s==null?void 0:s.w)||c[0],height:(s==null?void 0:s.h)||c[1],minWidth:(r[t]||[360,360])[0],minHeight:(r[t]||[360,360])[1],...(s==null?void 0:s.x)!=null?{x:s.x,y:s.y}:{center:!0},decorations:!1,transparent:!0,shadow:!1,skipTaskbar:!0}),e==null||e.classList.add("active")}it("melo:panel-closed",t=>{var a;const i=ee[t];i&&((a=document.getElementById(i))==null||a.classList.remove("active"))});function ie(t){if(at){ci(t.replace(/^win-/,""));return}const i=ri(t);Ut(t,!i),i||Gt(document.getElementById(t))}function di(t){if(t.classList.contains("hidden")||!Ft||window.matchMedia("(max-width: 860px)").matches)return;const i=Ft.getBoundingClientRect();if(i.width<=0||i.height<=0)return;const a=t.getBoundingClientRect(),e=Math.min(a.width,i.width),n=Math.min(a.height,i.height);let o=a.left-i.left,r=a.top-i.top;o=Math.max(0,Math.min(i.width-e,o)),r=Math.max(0,Math.min(i.height-n,r)),t.style.left=o+"px",t.style.top=r+"px",t.style.right="auto",t.style.bottom="auto",t.style.transform="none"}function Ut(t,i){var n,o,r,p,c,s,d,f,w,L;const a=document.getElementById(t);if(!a)return;a.classList.toggle("hidden",!i),localStorage.setItem("lumiv2-"+t,i?"1":"0"),i&&di(a);const e=i;t==="win-library"&&((n=document.getElementById("btnToggleLibrary"))==null||n.classList.toggle("active",e),(o=document.getElementById("menuToggleLibrary"))==null||o.classList.toggle("active",e)),t==="win-playlist"&&((r=document.getElementById("btnTogglePlaylist"))==null||r.classList.toggle("active",e),(p=document.getElementById("menuTogglePlaylist"))==null||p.classList.toggle("active",e)),t==="win-equalizer"&&((c=document.getElementById("btnToggleEq"))==null||c.classList.toggle("active",e),(s=document.getElementById("menuToggleEq"))==null||s.classList.toggle("active",e)),t==="win-lyrics"&&((d=document.getElementById("btnToggleLyrics"))==null||d.classList.toggle("active",e),(f=document.getElementById("menuToggleLyrics"))==null||f.classList.toggle("active",e)),t==="win-settings"&&((w=document.getElementById("btnOpenSettings"))==null||w.classList.toggle("active",e),(L=document.getElementById("menuToggleSettings"))==null||L.classList.toggle("active",e))}ot||li.forEach(t=>{const i=localStorage.getItem("lumiv2-"+t);i!==null?Ut(t,i==="1"):t==="win-settings"?Ut(t,!1):Ut(t,!0)});Object.entries($e).forEach(([t,i])=>{var a;(a=document.getElementById(t))==null||a.addEventListener("click",()=>ie(i))});document.querySelectorAll("[data-close]").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.close;Ut(i,!1)})});let ut=null,kt=null,we=10;function Gt(t){we++,t.style.zIndex=String(we),document.querySelectorAll(".float-win").forEach(i=>i.classList.remove("active")),t.classList.add("active")}document.querySelectorAll(".float-win").forEach(t=>{t.addEventListener("mousedown",()=>Gt(t))});document.querySelectorAll("[data-drag]").forEach(t=>{t.addEventListener("mousedown",i=>{if(i.target.closest("button")||i.target.closest("input")||i.target.closest("select"))return;const a=t.dataset.drag,e=document.getElementById(a);Gt(e),e.classList.add("dragging");const n=e.getBoundingClientRect();ut={id:a,startX:i.clientX,startY:i.clientY,initX:n.left,initY:n.top,width:n.width,height:n.height}})});document.querySelectorAll("[data-resize]").forEach(t=>{t.addEventListener("mousedown",i=>{i.stopPropagation();const a=t.dataset.resize,e=document.getElementById(a);Gt(e),e.classList.add("resizing");const n=e.getBoundingClientRect();kt={id:a,startX:i.clientX,startY:i.clientY,initW:n.width,initH:n.height}})});window.addEventListener("mousemove",t=>{if(ut){const i=document.getElementById(ut.id);let a=t.clientX-ut.startX,e=t.clientY-ut.startY,n=ut.initX+a,o=ut.initY+e;if(Ft&&!window.matchMedia("(max-width: 860px)").matches){const r=Ft.getBoundingClientRect(),p=r.left,c=r.right-ut.width,s=r.top,d=r.bottom-ut.height;n=Math.max(p,Math.min(c,n))-r.left,o=Math.max(s,Math.min(d,o))-r.top}i.style.left=n+"px",i.style.top=o+"px",i.style.right="auto",i.style.bottom="auto",i.style.transform="none"}if(kt){const i=document.getElementById(kt.id);let a=kt.initW+(t.clientX-kt.startX),e=kt.initH+(t.clientY-kt.startY);a=Math.max(260,a),e=Math.max(160,e),i.style.width=a+"px",i.style.height=e+"px"}});window.addEventListener("mouseup",()=>{if(ut){const t=document.getElementById(ut.id);t&&(t.classList.remove("dragging"),localStorage.setItem("lumiv2-pos-"+ut.id,JSON.stringify({left:t.style.left,top:t.style.top}))),ut=null}if(kt){const t=document.getElementById(kt.id);t&&(t.classList.remove("resizing"),localStorage.setItem("lumiv2-size-"+kt.id,JSON.stringify({width:t.style.width,height:t.style.height}))),kt=null}});async function Oe(){const t=window.LumiLibrary,i=window.LumiPlayer;if(at){try{const{open:e}=await X(async()=>{const{open:p}=await import("./index-CS3Qnt9j.js");return{open:p}},__vite__mapDeps([5,1])),n=await e({multiple:!0,filters:[{name:"Audio",extensions:["mp3","flac","wav","aac","ogg","m4a","alac","opus","wma","aiff"]}]});if(!n)return;const o=Array.isArray(n)?n:[n],r=await(t==null?void 0:t.importPaths(o,"replace"))||[];r.length&&(U("melo:play-tracks",{tracks:r,index:0}),ct(`${r.length} file(s) added`))}catch{ct("Error opening files")}return}const a=document.createElement("input");a.type="file",a.multiple=!0,a.accept="audio/*,.mp3,.flac,.wav,.aac,.ogg,.m4a,.alac,.opus,.wma,.aiff",a.onchange=async()=>{const e=Array.from(a.files||[]);if(!e.length)return;const n=[];for(const o of e){const r=o.path,p=r||URL.createObjectURL(o),c=o.name,s=c.lastIndexOf("."),d=s>0?c.slice(0,s):c,f=s>0?c.slice(s+1).toUpperCase():"AUDIO",w={id:r||"imp_"+Math.random().toString(36).slice(2,9),title:d,artist:"Unknown Artist",album:"Single",duration:0,path:p,codec:f,specs:"Local File",source:"import"};await Se(o,w),n.push(w)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(o=>i==null?void 0:i.queue.push(o)),U("melo:play-tracks",{tracks:n,index:0}),ct(`${n.length} file(s) added`)},a.click()}async function De(){const t=window.LumiLibrary,i=window.LumiPlayer;if(at){try{const{open:e}=await X(async()=>{const{open:r}=await import("./index-CS3Qnt9j.js");return{open:r}},__vite__mapDeps([5,1])),n=await e({directory:!0});if(!n)return;const o=n;await(t==null?void 0:t.scanFolder(o,!0))}catch{ct("Error scanning folder")}return}const a=document.createElement("input");a.type="file",a.webkitdirectory=!0,a.multiple=!0,a.accept="audio/*",a.onchange=async()=>{const e=Array.from(a.files||[]).filter(o=>/\.(mp3|flac|wav|aac|ogg|m4a|alac|opus|wma|aiff)$/i.test(o.name));if(!e.length)return;const n=[];for(const o of e){const r=o.path,p=r||URL.createObjectURL(o),c=o.name,s=c.lastIndexOf("."),d=s>0?c.slice(0,s):c,f=s>0?c.slice(s+1).toUpperCase():"AUDIO",w={id:r||"imp_"+Math.random().toString(36).slice(2,9),title:d,artist:"Unknown Artist",album:"Folder Import",duration:0,path:p,codec:f,specs:"Local File",source:"import"};await Se(o,w),n.push(w)}t==null||t.addTracks(n,!0),t==null||t.addToCurrentPlaylist(n),n.forEach(o=>i==null?void 0:i.queue.push(o)),U("melo:play-tracks",{tracks:n,index:0}),ct(`${n.length} file(s) added from folder`)},a.click()}document.addEventListener("click",t=>{var a;const i=(a=t.target)==null?void 0:a.closest("#btnAddFiles, #btnAddFolder, #btnThemeToggle");i&&(i.id==="btnAddFiles"?Oe():i.id==="btnAddFolder"?De():i.id==="btnThemeToggle"&&qe(Tt==="light"?"dark":"light"))});window.addEventListener("keydown",t=>{(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="o"&&(t.shiftKey?(t.preventDefault(),De()):(t.preventDefault(),Oe())),((t.ctrlKey||t.metaKey)&&t.key===","||t.key==="F2")&&(t.preventDefault(),ie("win-settings"))});function xe(t){var w,L;function i(x){document.querySelectorAll(".settings-tab").forEach(g=>{g.classList.toggle("active",g.dataset.stab===x)}),document.querySelectorAll(".settings-section[data-panel]").forEach(g=>{g.classList.toggle("active",g.dataset.panel===x)}),localStorage.setItem("melo-settings-tab",x)}document.querySelectorAll(".settings-tab").forEach(x=>{x.addEventListener("click",()=>i(x.dataset.stab))}),i(localStorage.getItem("melo-settings-tab")||"general"),document.querySelectorAll(".switch[data-key]").forEach(x=>{const g=x.dataset.key,v=localStorage.getItem("melo-pref-"+g);v!==null&&x.classList.toggle("on",v==="1"),x.onclick=()=>{x.classList.toggle("on");const A=x.classList.contains("on");localStorage.setItem("melo-pref-"+g,A?"1":"0"),U("melo:pref-changed",{key:g,value:A})}});const a=document.getElementById("setLanguage");a&&(a.value=oi(),a.onchange=async()=>{await Pe(a.value),t(`Language set to ${a.options[a.selectedIndex].text} — restart Melo to fully apply`)});const e=document.getElementById("swDynamicTheme");if(e){const x=localStorage.getItem("melo-dynamic-theme")!=="0";e.classList.toggle("on",x),e.onclick=()=>{var j,P;const g=!e.classList.contains("on");e.classList.toggle("on",g),localStorage.setItem("melo-dynamic-theme",g?"1":"0");const v=window.__LUMI_QUEUE__,A=(P=(j=window.LumiPlayer)==null?void 0:j.currentIndex)!=null?P:0;v&&v[A]&&Ee(g?v[A].cover:null)}}const n=document.getElementById("skinSelect"),o=document.getElementById("btnSkinThemeToggle"),r=document.getElementById("btnRefreshSkins"),p=document.getElementById("btnOpenSkinsFolder"),c=document.getElementById("skinThemeIcon"),s=document.getElementById("skinThemeLabel");function d(x){c&&(c.textContent=x==="dark"?"🌙":"☀️"),s&&(s.textContent=x==="dark"?"Dark":"Light")}d(Tt),o==null||o.addEventListener("click",()=>{const x=Tt==="dark"?"light":"dark";qe(x),d(x),t(x==="dark"?"Dark theme":"Light theme")}),it("melo:theme",x=>{(x==="light"||x==="dark")&&d(x)});async function f(){if(!n)return;const x=localStorage.getItem("melo-active-skin-id")||"default",g=await _e();n.innerHTML=`
      <option value="default">Default Melo (Standard)</option>
      <option value="compact-pill">Minimal Compact (Pill Bar)</option>
    `,g.forEach(v=>{if(v.filename!=="compact-pill-light.html"&&v.filename!=="compact-pill-dark.html"){const A=document.createElement("option");A.value=v.filename,A.textContent=`${v.name} (${v.filename})`,n.appendChild(A)}}),n.value=x}f(),n&&(n.onchange=()=>{const x=n.value;Ct(x,Tt,t)}),r==null||r.addEventListener("click",async()=>{await f();const x=localStorage.getItem("melo-active-skin-id")||"default";Ct(x,Tt,t),t("Skins reloaded from disk")}),p==null||p.addEventListener("click",()=>{Te(t)}),(w=document.getElementById("btn-reset-skin-settings"))==null||w.addEventListener("click",()=>{Qt(t),n&&(n.value="default")}),(L=document.getElementById("btn-settings-reset"))==null||L.addEventListener("click",()=>{localStorage.clear(),t("Settings reset — reloading..."),setTimeout(()=>location.reload(),600)})}function He(){document.querySelectorAll(".win-btn").forEach(t=>{t.onclick=async()=>{const i=t.getAttribute("aria-label");if(window.__TAURI__){const{getCurrentWindow:a}=await X(async()=>{const{getCurrentWindow:n}=await import("./window-BWd3Cypy.js");return{getCurrentWindow:n}},__vite__mapDeps([8,7,1,0])),e=a();i==="minimize"?e.minimize():i==="maximize"?e.toggleMaximize():i==="close"&&e.close()}else i==="close"&&ct("Window close requires the Tauri desktop build"),i==="maximize"&&ct("Resize: drag corner handle")}})}He();window.__LUMI_REBIND_MAIN__=()=>{He(),Object.entries($e).forEach(([t,i])=>{const a=document.getElementById(t);a&&(a.onclick=()=>ie(i))})};const zt=document.createElement("div");zt.id="aboutPop";zt.style.display="none";document.body.appendChild(zt);document.addEventListener("click",t=>{var i,a;(i=t.target)!=null&&i.closest("#btnAbout")&&(t.stopPropagation(),zt.innerHTML=`
    <div class="about-head">Melo <b>0.4.0 Beta</b></div>
    <div style="font-size:11.5px; color:var(--text-soft); margin:6px 0 10px;">
      Modern Windows Music Player<br/>
      Tauri 2 + TypeScript + Rust
    </div>
    <a class="about-link" id="aboutLink" href="https://github.com/Arvanta/Melo" rel="noopener">github.com/Arvanta/Melo ↗</a>`,zt.style.display=zt.style.display==="none"?"block":"none",(a=document.getElementById("aboutLink"))==null||a.addEventListener("click",e=>{e.preventDefault();const n="https://github.com/Arvanta/Melo";at?X(()=>import("./core-DhEqZVGG.js"),[]).then(o=>o.invoke("open_url",{url:n})).catch(()=>window.open(n,"_blank")):window.open(n,"_blank")}))});document.addEventListener("click",t=>{!t.target.closest("#aboutPop")&&!t.target.closest("#btnAbout")&&(zt.style.display="none")});at&&ot?ot==="library"||ot==="playlist"?me(xt,ct):ot==="equalizer"?he(xt,ct,{remote:!0}):ot==="lyrics"?fe(xt):ot==="settings"&&(be(),xe(ct)):(Qe(xt,ct),me(xt,ct),he(xt,ct),ti(xt),fe(xt),ii(ct),xe(ct),be(),setTimeout(async()=>{if(localStorage.getItem("melo-pref-resume")!=="0")try{const t=JSON.parse(localStorage.getItem("melo-resume-state")||"null"),i=window.LumiLibrary,a=window.LumiPlayer;if(!(t!=null&&t.trackId)||!i||!a)return;const e=await i.getTrack(t.trackId);if(!e)return;a.queue=[e],a.loadTrack(0,!1,t.position||0)}catch{}},500));
//# sourceMappingURL=index-BOc4Qlwt.js.map
