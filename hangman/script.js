const wordEl         = document.getElementById('word'); 
const wrongLettersEl = document.getElementById('wrong-letter'); 
const playAgainBtn   = document.getElementById('play-again'); 
const popup          = document.getElementById('popup-container'); 
const notification   = document.getElementById('notification-container'); 
const finalMessage   = document.getElementById('final-message'); 

const figureParts    = document.querySelectorAll('.figure-part'); 

const words = ['application', 'programming', 'interface', 'wizard']; 

let selectedWord = words[Math.floor(Math.random() * words.length)]; 

console.log(selectedWord); 

const correctLetters = []; 
const wrongLetters  = []; 

// show hidden word 
function displayWrod() {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(letter=> `
        <span class="letter">
          ${correctLetters.includes(letter) ? letter : ''}
        </span>
      `)
      .join('')
    }`; 

    const innerWord = wordEl.innerText.replace(/\n/g,'');  
    if(innerWord === selectedWord) {
      finalMessage.innerText = 'Congrats you won!'; 
      popup.style.display = 'flex'; 
    }
}

// Update wrong letters 
function updateWrongLettersEl() {
  console.log('Update wrong '); 
  // Display wrong letters 
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : '' }
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `
  figureParts.forEach((part,i)=> {
    // narysuje tyle części ile jest błędów
    const errors = wrongLetters.length; 
    if(i<errors) {
      part.style.display = 'block'; 
    } else {
      part.style.display = 'none'; 
    }
  }); 
  // Check if lost 
  if(wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately you lost ;(';
    popup.style.display = 'flex'; 
  }
}

// Show notification 
function showNotification() {
  notification.classList.add('show'); 
  setTimeout(()=> {
    notification.classList.remove('show');
  }, 2000); 
}

// Keydown letter press 
window.addEventListener('keydown', e=> {
  // console.log(e.keyCode )
  if(e.keyCode>=65 && e.keyCode<=90) {
    console.log('workds'); 
    const letter = e.key; 

    if(selectedWord.includes(letter)) { // letter is correct 
      if(!correctLetters.includes(letter)) {
        correctLetters.push(letter); 
        displayWrod(); 
      } else {
        showNotification(); 
      } 
    } else { // letter is !correct
      if(!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl(); 
      } else {
        showNotification(); 
      }
    }

  }
})

// Restart game and play again 

playAgainBtn.addEventListener('click', ()=> {
  // Empty arrays 
  correctLetters.splice(0); 
  wrongLetters.splice(0); 

  selectedWord = words[Math.floor(Math.random() * words.length)]
  displayWrod(); 

  updateWrongLettersEl(); // hides figure
  popup.style.display = 'none' // hides popup
})

displayWrod(); 