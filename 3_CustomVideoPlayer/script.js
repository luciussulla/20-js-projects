const video = document.getElementById('video'); 
const play = document.getElementById('play'); 
const stopIt = document.getElementById('stop'); 
const progress = document.getElementById('progress'); 
const timestamp = document.getElementById('timestamp'); 

video.addEventListener('click', toggleVideoStatus)
video.addEventListener('pause', updatePlayIcon)
video.addEventListener('play', updatePlayIcon)
video.addEventListener('timeupdate', updateProgress)

play.addEventListener('click', toggleVideoStatus); 

stopIt.addEventListener('click', stopVideo); 

progress.addEventListener('change', setVideoProgress);
