// ===== SAFE DOM READY WRAPPER =====
(function() {
  'use strict';

  // Wait for DOM
  function waitForDOM(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }

  // ===== DATA LAGU (Dengan sample audio dari URL) =====
  const songs = [
    {
    id: 1,
    title: "Siapa kita",
    artist: "Poseidon",
    album: "Album 1",
    albumArtUrl: "Image/Siapa kita.png",
    audioSrc: "audio/Siapa kita.mp3",
    videoBgSrc: "/videos/Siapa kita.mp4",
    lyrics: [
        { time: 0, text: "Siapa kita? (FPIK)" },
        { time: 3, text: "Warnanya apa? (warna biru)" },
        { time: 6, text: "Jargonnya apa?" },
        { time: 7, text: "Jos tak gentar gentar jos" },
        { time: 9, text: "tak gentar gentar jos" },
        { time: 11, text: "tak gentar gentar joss joss joss" },
        { time: 13, text: "Siapa kita? (FPIK)" },
        { time: 17, text: "Warnanya apa? (warna biru)" },
        { time: 19, text: "Jargonnya apa?" },
        { time: 20, text: "Jos tak gentar gentar jos" },
        { time: 22, text: "tak gentar gentar jos" },
        { time: 24, text: "tak gentar gentar joss joss joss" },
    ]
},
   {
  id:2,
  title: "Jadilah Juara",
  artist: "Poseidon",
  album: "Album 2",
  albumArtUrl: "image/Jadilah Juara.jpg.png",
  audioSrc: "audio/Jadilah Juara.mp3",
  videoBgSrc: "/videos/Jadilah Juara.mp4",
  lyrics: [
    { time: 0.0, text: "Jadilah juara poseidon ku" },
    { time: 9.0, text: "Semua terjadi karena cinta" },
    { time: 16.0, text: "Semangat dan panggilan jiwa (melangkah)" },
    { time: 24.0, text: "Melangkah, dan berjalan bersama (oooo)" },
    { time: 31.0, text: "Kami semua, yakin engkau pasti bisa" },
    { time: 39.0, text: "Bangkitlah kau FPIK ku" },
    { time: 41.0, text: "Bangkitlah kau kebanggaan ku" },
    { time: 45.0, text: "Kami kan slalu bersamamu" },
    { time: 52.0, text: "Bangkitlah kau FPIK ku" },
    { time: 56.0, text: "Bangkitlah kau kebanggaan ku" },
    { time: 60.5, text: "Jadilah juara poseidon ku" }
  ]
},
{
    id: 3,
    title: "Sosis so nice",
    artist: "Poseidon",
    album: "Album 3",
    albumArtUrl: "Image/Sosis so nice.png",
    audioSrc: "audio/Sosis so nice.mp3",
    videoBgSrc: "/videos/Sosis so nice.mp4",
    lyrics: [
        { time: 0, text: "Poseidon poseidon FPIK (oi oi oi)" },
        { time: 9, text: "FPIK jadi juara (sya la la la la la la)" },
        { time: 17, text: "Di laut di darat kita jaya" },
        { time: 25, text: "FPIK pasti juara (lagi lagi lagi oi)" },
        { time: 34, text: "Poseidon poseidon FPIK (oi oi oi)" },
        { time: 42, text: "FPIK jadi juara (sya la la la la la la)" },
        { time: 50, text: "Di laut di darat kita jaya" },
        { time: 59, text: "FPIK pasti juara (lagi lagi lagi oi)" }
    ]
},
    {
    id: 4,
    title: "Salam",
    artist: "Poseidon",
    album: "Album 1",
    albumArtUrl: "Image/Salam.png",
    audioSrc: "audio/Salam.mp3",
    videoBgSrc: "/videos/Salam.mp4",
    lyrics: [
        { time: 0, text: "Salam assalamualaikum" },
        { time: 6, text: "Salam assalamualaikum" },
        { time: 12, text: "La la la la la la la la la la la" },
        { time: 18, text: "La la la la la la la la la la la" },
        { time: 24, text: "Ayo kita dukung FPIK" },
        { time: 30, text: "Kobarkan semangat jiwa dan raga" },
        { time: 36, text: "FPIK pasti juara" },
        { time: 42, text: "Membuat kita semua bangga" }
    ]
},
    {
  id: 5,
  title: "Untuk FPIK",
  artist: "Poseidon",
  album: "Album Tentatif",
  albumArtUrl: "Image/Untuk FPIK.png",
  audioSrc: "audio/Untuk FPIK.mp3",
  videoBgSrc: "/videos/Untuk FPIK.mp4",
  lyrics: [
    { time: 0.0, text: "Jiwa kami" },
    { time: 4.0, text: "Nyawa kami" },
    { time: 9.0, text: "Raga kami, untuk FPIK" },
    { time: 17.0, text: "Panas dan hujan" },
    { time: 22.0, text: "Tak kurasakan" },
    { time: 27.0, text: "Inilah kami, untuk FPIK" },
  ]
}
  ];

  // ===== APP STATE =====
  let currentSongIndex = 0;
  let isPlaying = false;

  // ===== ELEMENTS =====
  let homePage, playerPage, splashScreen, songGrid, album1Grid, album2Grid, album3Grid, tentatifGrid, backToHomeBtn;
  let addSongForm, songTitleInput, songArtistInput, songAlbumSelect, songFileInput, songCoverInput;
  let audioPlayer, albumArt, trackTitle, trackArtist, lyricsContainer;
  let progressBarContainer, progressBar, currentTime, totalDuration;
  let playPauseBtn, prevBtn, nextBtn, volumeSlider, shuffleBtn, repeatBtn, speedSlider, speedDisplay;
  let videoBackground = null, backgroundVideo = null;

  // State
  let isShuffle = false;
  let repeatMode = 0; // 0=none, 1=one, 2=all

  // ===== GET DOM ELEMENTS SAFELY =====
  function getDOMElements() {
    homePage = document.getElementById('homePage');
    playerPage = document.getElementById('playerPage');
    splashScreen = document.getElementById('splashScreen');
    songGrid = document.getElementById('songGrid');
    backToHomeBtn = document.getElementById('backToHomeBtn');

    videoBackground = document.getElementById('videoBackground');
    backgroundVideo = document.getElementById('backgroundVideo');

    audioPlayer = document.getElementById('audioPlayer');
    albumArt = document.getElementById('albumArt');
    trackTitle = document.getElementById('trackTitle');
    trackArtist = document.getElementById('trackArtist');
    lyricsContainer = document.getElementById('lyricsContainer');

    addSongForm = document.getElementById('addSongForm');
    songTitleInput = document.getElementById('songTitle');
    songArtistInput = document.getElementById('songArtist');
    songAlbumSelect = document.getElementById('songAlbum');
    songFileInput = document.getElementById('songFile');
    songCoverInput = document.getElementById('songCover');

    album1Grid = document.getElementById('songGridAlbum1');
    album2Grid = document.getElementById('songGridAlbum2');
    album3Grid = document.getElementById('songGridAlbum3');
    tentatifGrid = document.getElementById('songGridAlbumTentatif');

    progressBarContainer = document.getElementById('progressBarContainer');
    progressBar = document.getElementById('progressBar');
    currentTime = document.getElementById('currentTime');
    totalDuration = document.getElementById('totalDuration');

    playPauseBtn = document.getElementById('playPauseBtn');
    prevBtn = document.getElementById('prevBtn');
    nextBtn = document.getElementById('nextBtn');
    shuffleBtn = document.getElementById('shuffleBtn');
    repeatBtn = document.getElementById('repeatBtn');
    volumeSlider = document.getElementById('volumeSlider');
    speedSlider = document.getElementById('speedSlider');
    speedDisplay = document.getElementById('speedDisplay');

    return !!audioPlayer && !!album1Grid && !!album2Grid;
  }

  // ===== MAIN INIT =====
  function init() {
    if (!getDOMElements()) {
      console.error('Missing DOM elements, retrying...');
      setTimeout(init, 100);
      return;
    }

    // Hide splash after 2 seconds
    setTimeout(() => {
      if (splashScreen) {
        splashScreen.style.opacity = '0';
        setTimeout(() => {
          if (splashScreen) splashScreen.style.display = 'none';
        }, 500);
      }
    }, 2000);

    renderSongGrid();

    // Muat lagu pertama agar info track dan lirik langsung muncul di player
    if (songs.length > 0) {
      loadSong(songs[currentSongIndex]);
    }

    setupEventListeners();
    console.log('Music Player loaded successfully!');
  }

  // ===== RENDER FUNCTIONS =====
  function renderSongCardList(container, list) {
    if (!container) return;
    container.innerHTML = '';
    list.forEach((song) => {
      const card = document.createElement('div');
      card.className = 'song-card';
      card.innerHTML = `
        <div class="song-card-img">
          <img src="${song.albumArtUrl}" alt="${song.title}" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\\'fas fa-music\\'></i>'">
        </div>
        <h3>${song.title}</h3>
        <p>${song.artist}</p>
      `;
      card.onclick = () => playSong(songs.indexOf(song));
      container.appendChild(card);
    });
  }

  function normalizeAlbumName(albumName) {
    if (!albumName) return '';
    const normalized = albumName.toString().trim().toLowerCase();
    if (normalized === 'album 1' || normalized === 'album1') return 'Album 1';
    if (normalized === 'album 2' || normalized === 'album2') return 'Album 2';
    if (normalized === 'album 3' || normalized === 'album3') return 'Album 3';
    if (normalized === 'tentatif' || normalized === 'album tentatif' || normalized === 'albumentatif') return 'Tentatif';
    return albumName.toString().trim();
  }

  function renderSongGrid() {
    if (!album1Grid || !album2Grid || !album3Grid || !tentatifGrid) return;

    const album1Songs = songs.filter(song => normalizeAlbumName(song.album) === 'Album 1');
    const album2Songs = songs.filter(song => normalizeAlbumName(song.album) === 'Album 2');
    const album3Songs = songs.filter(song => normalizeAlbumName(song.album) === 'Album 3');
    const tentatifSongs = songs.filter(song => normalizeAlbumName(song.album) === 'Tentatif');
    const fallbackSongs = songs.filter(song => !['Album 1', 'Album 2', 'Album 3', 'Tentatif'].includes(normalizeAlbumName(song.album)));

    renderSongCardList(album1Grid, album1Songs.concat(fallbackSongs));
    renderSongCardList(album2Grid, album2Songs);
    renderSongCardList(album3Grid, album3Songs);
    renderSongCardList(tentatifGrid, tentatifSongs);
  }

  function addSongFromForm(event) {
    event.preventDefault();
    if (!songTitleInput || !songArtistInput || !songAlbumSelect || !songFileInput) return;

    const title = songTitleInput.value.trim();
    const artist = songArtistInput.value.trim();
    const album = normalizeAlbumName(songAlbumSelect.value);
    const albumArtUrl = songCoverInput?.value.trim() || 'https://placehold.co/220x220/000000/ffffff?text=Cover';
    const file = songFileInput.files && songFileInput.files[0];

    if (!title || !artist || !album || !file) {
      alert('Lengkapi semua field wajib (judul, artist, album, file audio).');
      return;
    }

    const objectUrl = URL.createObjectURL(file);

    const newSong = {
      id: Date.now(),
      title,
      artist,
      album,
      albumArtUrl,
      audioSrc: objectUrl,
      videoBgSrc: '',
      lyrics: []
    };

    songs.push(newSong);
    renderSongGrid();

    addSongForm.reset();
    alert(`Lagu '${title}' sudah ditambahkan ke ${album}.`);
  }

  function playSong(index) {
    currentSongIndex = index;
    loadSong(songs[index]);
    if (playerPage) playerPage.classList.add('active');
    if (homePage) homePage.classList.remove('active');
    updateBackgroundVideo(songs[index]);
    playTrack();
  }

  // ===== SONG CONTROL =====
  function loadSong(song) {
    if (!song || !albumArt || !trackTitle || !trackArtist) return;
    
    albumArt.src = song.albumArtUrl;
    trackTitle.textContent = song.title;
    trackArtist.textContent = song.artist;
    
    renderLyrics(song.lyrics);
    
    if (audioPlayer) {
      audioPlayer.src = song.audioSrc;
      audioPlayer.load();
    }

    // no change here; actual player page video control handled in updateBackgroundVideo
    if (videoBackground) {
      videoBackground.classList.remove('active');
    }
  }

  function updateBackgroundVideo(song) {
    const isPlayerPageActive = playerPage && playerPage.classList.contains('active');

    if (isPlayerPageActive && song && song.videoBgSrc && backgroundVideo && videoBackground) {
      backgroundVideo.src = song.videoBgSrc;
      backgroundVideo.load();
      videoBackground.classList.add('active');
      return;
    }

    if (videoBackground) {
      videoBackground.classList.remove('active');
      if (backgroundVideo) {
        backgroundVideo.pause();
        backgroundVideo.src = '';
      }
    }
  }

  function renderLyrics(lyrics) {
    if (!lyricsContainer) return;
    lyricsContainer.innerHTML = lyrics && lyrics.length ? 
      lyrics.map(line => `<span class="lyric-line" data-time="${line.time}">${line.text}</span>`).join('') :
      '<p class="lyrics-placeholder">Lirik tidak tersedia</p>';
  }

  function playTrack() {
    if (audioPlayer) {
      isPlaying = true;
      audioPlayer.play().catch(e => console.error('Play error:', e));
      updatePlayPauseIcon();
      if (backgroundVideo) backgroundVideo.play().catch(e => console.log('Video play prevented'));
    }
  }

  function pauseTrack() {
    if (audioPlayer) {
      isPlaying = false;
      audioPlayer.pause();
      updatePlayPauseIcon();
      if (backgroundVideo) backgroundVideo.pause();
    }
  }

  function updatePlayPauseIcon() {
    if (playPauseBtn) {
      playPauseBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
    }
  }

  function nextTrack() {
    if (isShuffle) {
      currentSongIndex = Math.floor(Math.random() * songs.length);
    } else {
      currentSongIndex = (currentSongIndex + 1) % songs.length;
    }
    loadSong(songs[currentSongIndex]);
    playTrack();
  }

  function prevTrack() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    playTrack();
  }

  // ===== EVENT LISTENERS =====
  function setupEventListeners() {
    // Form tambah lagu
    if (addSongForm) addSongForm.onsubmit = addSongFromForm;

    // Back button
    if (backToHomeBtn) backToHomeBtn.onclick = () => {
      if (homePage) homePage.classList.add('active');
      if (playerPage) playerPage.classList.remove('active');
      pauseTrack();
      updateBackgroundVideo(null);
    };

    // Player controls
    if (playPauseBtn) playPauseBtn.onclick = () => isPlaying ? pauseTrack() : playTrack();
    if (prevBtn) prevBtn.onclick = prevTrack;
    if (nextBtn) nextBtn.onclick = nextTrack;

    // Shuffle
    if (shuffleBtn) shuffleBtn.onclick = () => {
      isShuffle = !isShuffle;
      shuffleBtn.classList.toggle('active-feature', isShuffle);
    };

    // Repeat
    if (repeatBtn) repeatBtn.onclick = () => {
      repeatMode = (repeatMode + 1) % 3;
      repeatBtn.classList.toggle('active-feature', repeatMode > 0);
      if (repeatMode === 1) {
        repeatBtn.innerHTML = '<i class="fas fa-repeat-1"></i>';
      } else {
        repeatBtn.innerHTML = '<i class="fas fa-repeat"></i>';
      }
    };

    // Volume
    if (volumeSlider) volumeSlider.oninput = (e) => {
      if (audioPlayer) audioPlayer.volume = e.target.value;
    };

    // Speed
    if (speedSlider) speedSlider.oninput = (e) => {
      if (audioPlayer) audioPlayer.playbackRate = e.target.value;
      if (speedDisplay) speedDisplay.textContent = `${parseFloat(e.target.value).toFixed(1)}x`;
    };

    // Setup audio events
    if (audioPlayer) {
      audioPlayer.ontimeupdate = () => {
        if (audioPlayer.duration) {
          if (progressBar) progressBar.style.width = `${(audioPlayer.currentTime / audioPlayer.duration) * 100}%`;
          if (currentTime) currentTime.textContent = formatTime(audioPlayer.currentTime);
          if (totalDuration) totalDuration.textContent = formatTime(audioPlayer.duration);
          updateLyricsHighlight();
        }
      };

      audioPlayer.onloadedmetadata = () => {
        if (totalDuration) totalDuration.textContent = formatTime(audioPlayer.duration);
      };

      audioPlayer.onended = () => {
        if (repeatMode === 1) {
          // Repeat one
          audioPlayer.currentTime = 0;
          playTrack();
        } else if (repeatMode === 2) {
          // Repeat all
          nextTrack();
        } else {
          // No repeat - just go to next
          if (currentSongIndex < songs.length - 1) {
            nextTrack();
          } else {
            pauseTrack();
          }
        }
      };
    }

    // Progress click
    if (progressBarContainer) progressBarContainer.onclick = (e) => {
      const rect = progressBarContainer.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      if (audioPlayer && audioPlayer.duration) {
        audioPlayer.currentTime = pos * audioPlayer.duration;
      }
    };
  }

  function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  function updateLyricsHighlight() {
    if (!lyricsContainer || !audioPlayer) return;
    const time = audioPlayer.currentTime || 0;
    const lines = lyricsContainer.querySelectorAll('.lyric-line');
    let activeLineIndex = -1;
    
    lines.forEach((line, i) => {
      const lineTime = parseFloat(line.dataset.time) || 0;
      const nextTime = parseFloat(lines[i + 1]?.dataset.time) || Infinity;
      const isActive = time >= lineTime && time < nextTime;
      line.classList.toggle('highlight', isActive);
      
      if (isActive) {
        activeLineIndex = i;
      }
    });

    // Auto scroll to active line
    if (activeLineIndex >= 0 && lines[activeLineIndex]) {
      lines[activeLineIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // Start when DOM ready
  waitForDOM(init);
})();