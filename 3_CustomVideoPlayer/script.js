// video API
// video.currentTime 
// video.duration 
// video.play bool 
// video.pause bool
// video.timeupdate

const video = document.getElementById('video'); 
const play = document.getElementById('play'); 
const stopIt = document.getElementById('stop'); 
const progress = document.getElementById('progress'); 
const timestamp = document.getElementById('timestamp'); 

// Play & pause video 
function toggleVideoStatus() {
  if(video.paused) {
    video.play(); 
  } else {
    video.pause(); 
  }
}

// update play/pause icon 
function updatePlayIcon() {
 if(video.paused) {
  play.innerHTML = '<i class="fa fa-play fa-2x"></i>'; 
 } else {
  play.innerHTML = '<i class="fa fa-pause fa-2x"></i>'; 
 }
}

// update progress & timestamp 
function updateProgress() {
  console.log(video.currentTime); 

  progress.value = (video.currentTime / video.duration ) * 100; 

  // get minutes 
  let mins = Math.floor(video.currentTime) / 60;
  if(mins < 10) {
    mins = '0' + String(mins)
  } 
  
  // let secs
  let secs = Math.floor(video.currentTime) % 60; 
  if(secs < 10) {
    secs = '0' + String(secs)
  } 

  timestamp.innerHTML= `${mins}:${secs}`; 
}

// When you touch the progress bar and move it. Set video time to progress 
function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100; 
}

// Stop video 
function stopVideo() {
  video.currentTime = 0; 
  video.pause(); 
}

video.addEventListener('click', toggleVideoStatus)
video.addEventListener('pause', updatePlayIcon)
video.addEventListener('play', updatePlayIcon)
video.addEventListener('timeupdate', updateProgress)

play.addEventListener('click', toggleVideoStatus); 

stopIt.addEventListener('click', stopVideo); 

progress.addEventListener('change', setVideoProgress);