const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");
const wave = document.getElementById("wave");

// Songs list
const songs = [
  { title: "Shape of You", artist: "Ed Sheeran", src: "songs/shape_of_you.mp3" },
  { title: "Blinding Lights", artist: "The Weeknd", src: "songs/blinding_lights.mp3" },
  { title: "Someone You Loved", artist: "Lewis Capaldi", src: "songs/someone_you_loved.mp3" }
];


let songIndex = 0;
let isPlaying = false;

// Load song
function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;

  document.querySelectorAll("#playlist li").forEach((li, index) => {
    li.classList.toggle("active", index === songIndex);
  });
}

// Play song
function playSong() {
  isPlaying = true;
  playBtn.textContent = "⏸";
  audio.play();
  wave.classList.remove("paused"); // animate wave
}

// Pause song
function pauseSong() {
  isPlaying = false;
  playBtn.textContent = "▶";
  audio.pause();
  wave.classList.add("paused"); // stop wave
}

// Previous song
function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

// Next song
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

// Update progress bar
function updateProgress() {
  if (audio.duration) {
    const { duration, currentTime } = audio;
    const percent = (currentTime / duration) * 100;
    progress.style.width = `${percent}%`;

    // Time update
    let min = Math.floor(currentTime / 60);
    let sec = Math.floor(currentTime % 60);
    if (sec < 10) sec = `0${sec}`;
    currentTimeEl.textContent = `${min}:${sec}`;

    let dmin = Math.floor(duration / 60);
    let dsec = Math.floor(duration % 60);
    if (dsec < 10) dsec = `0${dsec}`;
    durationEl.textContent = `${dmin}:${dsec}`;
  }
}

// Set progress on click
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Volume control
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

// Event Listeners
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong); // autoplay

// Build playlist
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = `${song.title} - ${song.artist}`;
  li.addEventListener("click", () => {
    songIndex = index;
    loadSong(songs[songIndex]);
    playSong();
  });
  playlistEl.appendChild(li);
});

// Init
loadSong(songs[songIndex]);
