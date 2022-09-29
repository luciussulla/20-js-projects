const musicContainer = document.getElementById('music_container'); 

const playBtn = document.getElementById('play'); 
const prevBtn = document.getElementById('prev'); 
const nextBtn = document.getElementById('next'); 

const audio = document.getElementById('audio'); 
const progress = document.getElementById('progress'); 
const progressContainer = document.getElementById('progress_container'); 

const title = document.getElementById('title'); 
const cover = document.getElementById('cover'); 

//
const songs = ['develin', 'tuvan' ]; 

// Keep track of song
let songIndex = 0; 

// Initially load song detaile DOM
loadSong(songs[songIndex]);

// Update song details 
function loadSong(song) {
  title.innerText = song; 
  audio.src = `mp3/${song}.mp3`; 
  cover.src =  `cover/${song}.jpg`;  
  // console.log(audio.src, cover.src); 
}

// Play Song 

function playSong() {
  musicContainer.classList.add('play'); 
  playBtn.querySelector('i.fas').classList.remove('fa-play'); 
  playBtn.querySelector('i.fas').classList.add('fa-pause'); 
  
  audio.play(); 
}

function pauseSong() {
  musicContainer.classList.remove('play'); 
  playBtn.querySelector('i.fas').classList.remove('fa-pause'); 
  playBtn.querySelector('i.fas').classList.add('fa-play'); 
  
  audio.pause(); 
}
// event listeners 

playBtn.addEventListener('click', ()=> {
  const isPlaying = musicContainer.classList.contains('play'); 
  if(isPlaying) {
    pauseSong(); 
  } else {
    playSong(); 
  }
})

function prevSong() {
  songIndex--
  if(songIndex < 0 ) {
    songIndex = songs.length - 1; 
  }
  loadSong(songs[songIndex])
  playSong(); 
}

function nextSong() {
  songIndex++
  if(songIndex > songs.length - 1) {
    songIndex = 0 
  }
  loadSong(songs[songIndex])
  playSong(); 
}

// Update progress bar 
function updateProgress(e) {
  const {duration, currentTime } = e.srcElement; 
  const progressPercent = (currentTime / duration) * 100; 
  progress.style.width = `${progressPercent}%`
}

// Set prgress bar 
function setProgress(e) {
  const width = this.clientWidth; 
  const clickX = e.offsetX; 
  const duration = audio.duration; 
  audio.currentTime = (clickX/width) * duration; 
}

// Change song 
prevBtn.addEventListener('click', prevSong); 
prevBtn.addEventListener('click', nextSong); 

// Time / sing update 
audio.addEventListener('timeupdate', updateProgress); 

// Click on progress bar 
progressContainer.addEventListener('click', setProgress); 

// song ends 
audio.addEventListener('ended', nextSong)