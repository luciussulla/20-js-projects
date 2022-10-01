const word = document.getElementById('word'); 
const text = document.getElementById('text'); 
const scoreEl = document.getElementById('score'); 
const timeEl = document.getElementById('time'); 
const endgameEl = document.getElementById('end-game'); 
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
})