const word = document.getElementById('word'); 
const text = document.getElementById('text'); 
const scoreEl = document.getElementById('score'); 
const timeEl = document.getElementById('time'); 
const endgameEl = document.getElementById('end-game-container'); 
const settingsBtn = document.getElementById('settings-btn'); 
const settings = document.getElementById('settings'); 
const settingsForm = document.getElementById('settings-form'); 
const difficultySelect = document.getElementById('difficulty');

// List of words for game 
const words = [
  'sign', 
  'juice', 
  'warlike', 
  'steer'
]
// Init word 
let randomWord; 

// Init score 
let score = 0; 

// Init time 
let time = 10; 

// Init difficulty to the local storage value or medium
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium'; 

// set diffuclyt select value 
difficultySelect.value = difficulty; 

// Focus on text on start 
text.focus(); 

// Start counting down 
const timeInterval = setInterval(updateTime, 1000); 

// random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// add word to DOM 
function addWordToDOM() {
  randomWord = getRandomWord(); 
  word.innerHTML = randomWord; 
}

// update score 
function updateScore() {
  score++; 
  scoreEl.innerHTML = score; 
}

// update time 
function updateTime() {
  time--; 
  timeEl.innerHTML = time + 's'; 

  if(time === 0) {
    clearInterval(time); 
    // end game 
    gameOver(); 
  }
}

// Game over, show end screen

function gameOver() {
  endgameEl.innerHTML = `
    <h1> Time ran out </h1>
    <p>  Your final score is ${score} </p>
    <button onclick="location.reload()">Reload</button>
  `; 
  endgameEl.style.display = 'flex'; 
}

addWordToDOM(); 
// Event listeners 

// Typing 
text.addEventListener('input', e => {
  const insertedText = e.target.value; 
  console.log(e.target.value, randomWord); 

  if(insertedText === randomWord) {
    addWordToDOM(); 
    updateScore(); 
    // Clear input 
    e.target.value = '';

    switch(difficulty) {
      case 'easy':
        time +=5; 
        break; 
      case 'medium':
        time +=2;
        break; 
      case 'hard': 
        time+=1; 
        break; 
      default: 
        time+=5; 
        break;   
    }  

    updateTime(); 
  }
}); 

// Settings btn click 
settingsBtn.addEventListener('click', ()=> {
  settings.classList.toggle('hide'); 
})

// settings select difficulty 
settingsForm.addEventListener('change', e => {
  difficulty = e.target.value; 
  localStorage.setItem('difficulty', difficulty); 
}); 

