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
    <button onlick="location.reload()">Reload</button>
  `; 
  endgameEl.style.display = 'flex'; 
}

addWordToDOM(); 

// Event listeners 
text.addEventListener('input', e => {
  const insertedText = e.target.value; 
  console.log(e.target.value, randomWord); 

  if(insertedText === randomWord) {
    addWordToDOM(); 
    updateScore(); 
    // Clear input 
    e.target.value = '';
  }
}); 
