import type { Track, RepeatMode } from "./types";
import { busEmit, busOn, isTauri } from "./bus";
import { applyDynamicAmbientTheme } from "./cover";
import { getAudioGraph } from "./audio-graph";


export function setupPlayer(audio: HTMLAudioElement, toast: (m:string)=>void){
  // DOM refs - will be rebound on skin change
  let btnPlay: HTMLButtonElement, iconPlay: HTMLElement, iconPause: HTMLElement;
  let btnPrev: HTMLButtonElement, btnNext: HTMLButtonElement, btnShuffle: HTMLButtonElement, btnRepeat: HTMLButtonElement;
  let btnStop: HTMLButtonElement | null = null;
  let seekBar: HTMLInputElement, volBar: HTMLInputElement, curTime: HTMLElement, durTime: HTMLElement, volPct: HTMLElement;
  let trackTitle: HTMLElement, trackArtist: HTMLElement, trackAlbum: HTMLElement, trackCodec: HTMLElement, trackSpecs: HTMLElement;
  let coverImg: HTMLImageElement, coverFallback: HTMLElement, replayGainToggle: HTMLInputElement;

  let queue: Track[] = [];
  let currentIndex = 0;
  let isShuffle = false;
  let repeatMode: RepeatMode = "off";
  let isSeeking = false;

  (window as any).__LUMI_QUEUE__ = queue;
  (window as any).__LUMI_SET_QUEUE__ = (q: Track[])=>{ queue = q; (window as any).__LUMI_QUEUE__ = q; };

  function formatTime(s:number){
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s/60);
    const sec = Math.floor(s%60).toString().padStart(2,"0");
    return `${m}:${sec}`;
  }
  function updateSeekBackground(){
    if(!seekBar) return;
    const pct = (parseFloat(seekBar.value)/parseFloat(seekBar.max))*100;
    seekBar.style.setProperty("--progress", pct+"%");
  }
  function updateVolBackground(){
    if(!volBar) return;
    volBar.style.setProperty("--vol", volBar.value+"%");
  }
  // <audio> cannot open raw OS paths; convert them to the tauri asset protocol
  async function resolveSrc(p: string): Promise<string> {
    if (/^(https?|data|blob):/.test(p)) return p;
    if (isTauri) {
      try {
        const { convertFileSrc } = await import("@tauri-apps/api/core");
        return convertFileSrc(p);
      } catch {}
    }
    return p;
  }

  async function loadTrack(idx:number, autoplay=true){
    if(idx<0) idx = queue.length-1;
    if(idx>=queue.length) idx = 0;
    currentIndex = idx;
    const t = queue[idx];
    if(!t) return;
    if(!trackTitle) bindDOM(); // ensure DOM bound
    audio.src = await resolveSrc(t.path);
    audio.load();
    if(trackTitle) trackTitle.textContent = t.title;
    if(trackArtist) trackArtist.textContent = t.artist;
    if(trackAlbum) trackAlbum.textContent = t.album;
    if(trackCodec) trackCodec.textContent = t.codec;
    if(trackSpecs) trackSpecs.textContent = t.specs;
    if(t.cover && coverImg){
      coverImg.src = t.cover;
      coverImg.style.display = "block";
      if(coverFallback) coverFallback.style.display = "none";
    } else {
      if(coverImg) coverImg.style.display = "none";
      if(coverFallback) coverFallback.style.display = "grid";
    }
    if(seekBar){
      seekBar.max = String(t.duration || 276);
      seekBar.value = "0";
      updateSeekBackground();
    }
    if(durTime) durTime.textContent = formatTime(t.duration);
    if(curTime) curTime.textContent = "0:00";
    applyReplayGain();
    applyDynamicAmbientTheme(t.cover || null);
    document.querySelectorAll(".track-row").forEach((el, i)=>{
      el.classList.toggle("active", queue[i]?.id === t.id);
    });
    document.querySelectorAll("#queueList .track-row").forEach(el=>{
      el.classList.toggle("active", (el as HTMLElement).dataset.id === t.id);
    });
    if("mediaSession" in navigator){
      navigator.mediaSession.metadata = new MediaMetadata({
        title: t.title,
        artist: t.artist,
        album: t.album,
        artwork: t.cover ? [{src: t.cover, sizes: "512x512", type:"image/jpeg"}] : []
      });
      navigator.mediaSession.setActionHandler("play", ()=> play());
      navigator.mediaSession.setActionHandler("pause", ()=> pause());
      navigator.mediaSession.setActionHandler("previoustrack", ()=> prev());
      navigator.mediaSession.setActionHandler("nexttrack", ()=> next());
      navigator.mediaSession.setActionHandler("seekto", (details)=>{
        if(details.seekTime) audio.currentTime = details.seekTime;
      });
    }
    if(autoplay) play();
    const lyricsBox = document.getElementById("lyricsBox");
    if(lyricsBox){
      lyricsBox.textContent = t.lyrics || "No lyrics found for this track. You can add it via the tag editor.";
    }
    window.dispatchEvent(new CustomEvent("lumi:trackChange", {detail:t}));
    busEmit("melo:track-changed", t);
  }
  // WebView2 blocks autoplay until a user gesture happens INSIDE the player window.
  // Remember the intent and start playback on the next click/key in this window.
  let pendingPlay = false;
  function onUnlocked(){
    if(!pendingPlay) return;
    pendingPlay = false;
    audio.play().then(()=>{
      if(iconPlay) iconPlay.style.display="none";
      if(iconPause) iconPause.style.display="block";
    }).catch(()=>{});
  }
  window.addEventListener("pointerdown", onUnlocked);
  window.addEventListener("keydown", onUnlocked);

  function play(){
    try {
      const g = getAudioGraph(audio);
      g.resume();
    } catch {}
    audio.play().then(()=>{
      pendingPlay = false;
      if(iconPlay) iconPlay.style.display="none";
      if(iconPause) iconPause.style.display="block";
      if("mediaSession" in navigator) navigator.mediaSession.playbackState="playing";
    }).catch(()=>{
      if(!pendingPlay){
        pendingPlay = true;
        toast("Click once inside the player window to start playback");
      }
    });
  }
  function pause(){
    audio.pause();
    if(iconPlay) iconPlay.style.display="block";
    if(iconPause) iconPause.style.display="none";
    if("mediaSession" in navigator) navigator.mediaSession.playbackState="paused";
  }
  function togglePlay(){ if(audio.paused) play(); else pause(); }
  function stop(){
    audio.pause();
    try { audio.currentTime = 0; } catch {}
    if(iconPlay) iconPlay.style.display="block";
    if(iconPause) iconPause.style.display="none";
    if(seekBar){ seekBar.value = "0"; updateSeekBackground(); }
    if(curTime) curTime.textContent = "0:00";
    if("mediaSession" in navigator) navigator.mediaSession.playbackState="paused";
  }
  function next(){
    if(repeatMode==="one"){ audio.currentTime=0; play(); return; }
    let nxt = currentIndex+1;
    if(isShuffle){ nxt = Math.floor(Math.random()*queue.length); if(nxt===currentIndex) nxt = (nxt+1)%queue.length; }
    if(nxt>=queue.length){ if(repeatMode==="all") nxt=0; else { pause(); return; } }
    loadTrack(nxt);
  }
  function prev(){
    if(audio.currentTime>3){ audio.currentTime=0; return; }
    let prv = currentIndex-1;
    if(isShuffle) prv = Math.floor(Math.random()*queue.length);
    if(prv<0){ if(repeatMode==="all") prv=queue.length-1; else prv=0; }
    loadTrack(prv);
  }
  function applyReplayGain(){
    const t = queue[currentIndex];
    if(!t || !volBar) return;
    const baseVol = parseInt(volBar.value)/100;
    const gainDb = (replayGainToggle && replayGainToggle.checked) ? (t.replayGain ?? 0) : 0;
    const linear = Math.pow(10, gainDb/20);
    let effective = baseVol * linear;
    effective = Math.min(1, Math.max(0, effective));
    audio.volume = effective;
  }

  function bindDOM(){
    btnPlay = document.getElementById("btnPlay") as HTMLButtonElement;
    iconPlay = document.getElementById("iconPlay") as HTMLElement;
    iconPause = document.getElementById("iconPause") as HTMLElement;
    btnPrev = document.getElementById("btnPrev") as HTMLButtonElement;
    btnNext = document.getElementById("btnNext") as HTMLButtonElement;
    btnShuffle = document.getElementById("btnShuffle") as HTMLButtonElement;
    btnRepeat = document.getElementById("btnRepeat") as HTMLButtonElement;
    btnStop = document.getElementById("btnStop") as HTMLButtonElement | null;
    seekBar = document.getElementById("seekBar") as HTMLInputElement;
    volBar = document.getElementById("volBar") as HTMLInputElement;
    curTime = document.getElementById("curTime") as HTMLElement;
    durTime = document.getElementById("durTime") as HTMLElement;
    volPct = document.getElementById("volPct") as HTMLElement;
    trackTitle = document.getElementById("trackTitle") as HTMLElement;
    trackArtist = document.getElementById("trackArtist") as HTMLElement;
    trackAlbum = document.getElementById("trackAlbum") as HTMLElement;
    trackCodec = document.getElementById("trackCodec") as HTMLElement;
    trackSpecs = document.getElementById("trackSpecs") as HTMLElement;
    coverImg = document.getElementById("coverImg") as HTMLImageElement;
    coverFallback = document.getElementById("coverFallback") as HTMLElement;
    replayGainToggle = document.getElementById("replayGainToggle") as HTMLInputElement;

    // Re-attach events (remove old by cloning? we just attach to new elements, old detached so fine)
    if(btnPlay) btnPlay.onclick = togglePlay;
    if(btnStop){
      btnStop.onclick = stop;
      btnStop.style.display = localStorage.getItem("lumiv2-showStop")==="1" ? "" : "none";
    }
    if(btnPrev) btnPrev.onclick = prev;
    if(btnNext) btnNext.onclick = next;
    if(btnShuffle) btnShuffle.onclick = ()=>{
      isShuffle = !isShuffle;
      btnShuffle.classList.toggle("active", isShuffle);
      toast(isShuffle ? "Playback Shuffle on" : "Playback Shuffle off");
    };
    if(btnRepeat) btnRepeat.onclick = ()=>{
      repeatMode = repeatMode==="off" ? "all" : repeatMode==="all" ? "one" : "off";
      btnRepeat.classList.toggle("active", repeatMode!=="off");
      const labels:Record<RepeatMode,string> = {off:"Repeat off", all:"Repeat all", one:"Repeat one"};
      toast(labels[repeatMode]);
      btnRepeat.title = labels[repeatMode];
      if(repeatMode==="one") btnRepeat.style.color = "var(--accent)";
      else btnRepeat.style.color = "";
    };
    if(seekBar){
      seekBar.oninput = ()=>{
        isSeeking=true;
        if(curTime) curTime.textContent = formatTime(parseFloat(seekBar.value));
        updateSeekBackground();
      };
      seekBar.onchange = ()=>{
        audio.currentTime = parseFloat(seekBar.value);
        isSeeking=false;
      };
    }
    if(volBar){
      volBar.oninput = ()=>{
        updateVolBackground();
        if(volPct) volPct.textContent = volBar.value+"%";
        applyReplayGain();
      };
    }
    if(replayGainToggle) replayGainToggle.onchange = ()=> applyReplayGain();
    updateSeekBackground(); updateVolBackground();
    // update current track display without autoplay
    if(queue[currentIndex]){
      const t = queue[currentIndex];
      if(trackTitle) trackTitle.textContent = t.title;
      if(trackArtist) trackArtist.textContent = t.artist;
      if(trackAlbum) trackAlbum.textContent = t.album;
      if(trackCodec) trackCodec.textContent = t.codec;
      if(trackSpecs) trackSpecs.textContent = t.specs;
      if(t.cover && coverImg){ coverImg.src = t.cover; coverImg.style.display="block"; if(coverFallback) coverFallback.style.display="none"; }
    }
  }

  // Initial bind
  bindDOM();
  // Audio events (once)
  audio.addEventListener("timeupdate", ()=>{
    if(!isSeeking && seekBar && curTime){
      seekBar.value = String(Math.floor(audio.currentTime));
      curTime.textContent = formatTime(audio.currentTime);
      updateSeekBackground();
    }
  });
  audio.addEventListener("loadedmetadata", ()=>{
    if(!seekBar || !durTime) return;
    seekBar.max = String(Math.floor(audio.duration || queue[currentIndex].duration || 276));
    durTime.textContent = formatTime(audio.duration || queue[currentIndex].duration);
    updateSeekBackground();
  });
  audio.addEventListener("ended", ()=>{ next(); });
  window.addEventListener("keydown", (e)=>{
    if((e.target as HTMLElement).tagName==="INPUT") return;
    if(e.code==="Space"){ e.preventDefault(); togglePlay(); }
    if(e.code==="ArrowRight"){ audio.currentTime+=5; }
    if(e.code==="ArrowLeft"){ audio.currentTime-=5; }
    if(e.key==="m"||e.key==="M"){ audio.muted=!audio.muted; toast(audio.muted?"Muted":"Unmuted"); }
    if(e.key==="s"||e.key==="S"){ if(btnShuffle) btnShuffle.click(); }
    if(e.key==="r"||e.key==="R"){ if(btnRepeat) btnRepeat.click(); }
    if(e.code==="ArrowUp"){ if(volBar){ volBar.value = String(Math.min(100, parseInt(volBar.value)+5)); volBar.dispatchEvent(new Event("input")); } }
    if(e.code==="ArrowDown"){ if(volBar){ volBar.value = String(Math.max(0, parseInt(volBar.value)-5)); volBar.dispatchEvent(new Event("input")); } }
  });

  // Tray actions
  busOn("melo:tray-action", (action: any) => {
    if (action === "play_pause") togglePlay();
    else if (action === "next") next();
    else if (action === "prev") prev();
    else if (action === "mute") {
      audio.muted = !audio.muted;
      toast(audio.muted ? "Muted" : "Unmuted");
    }
  });

  loadTrack(0, false);

  (window as any).LumiPlayer = {
    get queue(){return queue}, set queue(v){queue=v},
    get currentIndex(){return currentIndex},
    loadTrack, play, pause, stop, next, prev,
    get audio(){return audio},
    rebind: bindDOM
  };
  (window as any).__LUMI_REBIND__ = bindDOM;

  // ---- cross-window control bus: secondary OS windows drive the player ----
  busOn("melo:play-tracks", (p: any)=>{
    if(!p || !Array.isArray(p.tracks) || !p.tracks.length) return;
    queue = p.tracks;
    (window as any).__LUMI_SET_QUEUE__(queue);
    const idx = Math.max(0, Math.min(p.index || 0, queue.length - 1));
    loadTrack(idx);
  });
  busOn("melo:add-queue", (t: any)=>{
    if(!t) return;
    queue.push(t);
    (window as any).__LUMI_SET_QUEUE__(queue);
  });
  busOn("melo:tag-updated", (t: any)=>{
    if(t && queue[currentIndex] && queue[currentIndex].id === t.id){
      Object.assign(queue[currentIndex], t);
      loadTrack(currentIndex, false);
    }
  });
}
