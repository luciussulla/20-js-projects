const msgEl = document.getElementById('msg'); 
const randomNum = getRandomNumber(); 
console.log(randomNum); 

// speech recon initatie
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; 
let recognition = new window.SpeechRecognition(); 

// Start recognition and game 
recognition.start(); 

// gen rand num
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1; 
}

//write msg 
function writeMessage(msg) {
  msgEl.innerHTML = `
  <div>You said: </div>
  <span class="box">${msg}</span>
  `; 
}

// Check msg against number 
function checkNumber(msg) {
  const num = +msg; 
  console.log(msg); 
  console.log(num)

  // check if vailid nuber 
  if(Number.isNaN(num)) {
    msgEl.innerHTML = '<div>That is not a valid number</div>';
    return;  
  }; 

  // check if in range 
  if(num>100 || num < 1) {
    msgEl.innerHTML = '<div>Number muse be in 1... 100 range</div>'; 
    return
  }

  // check number 
  if(num===randomNum) {
    document.body.innerHTML = 
    `<h2>Congrats you guessed the number<br><br/>
    It was ${num}</h2>
    <button class="play-again" id="play-again">Play Again</button>
    ` 
  } else if (num > randomNum) {
    msgEl.innerHTML += '<div>Go Lower</div>'; 
  } else {
    msgEl.innerHTML +=  `<div>Go Higher</div>`; 
  }
}

// capture user speak 
function onSpeak(e) {
  console.log(e); 
  const msg = e.results[0][0].transcript; 
  
  writeMessage(msg); 
  checkNumber(msg); 
}

// speak result 
recognition.addEventListener('result', onSpeak); 

// end speak service 

recognition.addEventListener('end', ()=> {
  recognition.start(); 
})

// button 
document.body.addEventListener('click', (e)=> {
  if(e.target.id === 'play-again') {
    window.location.reload();  
  }
})