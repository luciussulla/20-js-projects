const cardsContainer = document.getElementById('cards-container'); 
const prevBtn = document.getElementById('prev'); 
const nextBtn = document.getElementById('next'); 
const currentEl = document.getElementById('current'); 
const showBtn = document.getElementById('show'); 
const hideBtn = document.getElementById('hide'); 
const questionEl = document.getElementById('question'); 
const answerEl = document.getElementById('answer'); 
const addCardBtn = document.getElementById('add-card'); 
const clearBtn = document.getElementById('clear'); 
const addContainer = document.getElementById('add-container'); 

// Keep track of current card
let currentActiveCard = 0; 

// Store DOM cards 
const cardsEl = []; 

// Store card data 
let cardsData = []
cardsData = getCardsData(); 
// const cardsData = [
//   {
//     question: 'What must a variable begin with?', 
//     answer: 'A letter, $ or _'
//   }, 
//   {
//     question: 'What is a variable?', 
//     answer: 'COntainer for a piece of data'
//   }, 
//   {
//     question: 'Example of Case Sensiitr variabel', 
//     answer: 'this is a variable'
//   }
// ]



// Create all cards 
function createCards() {
  if(cardsData.length > 0) { 
    cardsData.forEach((data, idx)=> createCard(data, idx));
  } 
}

//create a single card in DOM 
function createCard(data, idx) {
  const card = document.createElement('div'); 
  card.classList.add('card'); 

  if(idx===0) {
    card.classList.add('active'); 
  }

  card.innerHTML = `
  <div class="inner-card">
    <div class="inner-card-front">
      <p>
        ${data.question}
      </p>
    </div>
    <div class="inner-card-back">
      <p>
        ${data.answer}
      </p>
    </div>
  </div>
  `; 

  card.addEventListener('click', ()=> card.classList.toggle('show-answer')); 

  // Add to DOM cards 
  cardsEl.push(card); 
  cardsContainer.appendChild(card); 
  updateCurrentText()
}

// show number of cards 
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard +1 }/${cardsEl.length}`; 
}

// get Cards data 
function getCardsData() {
  cardsData = JSON.parse(localStorage.getItem('cards')); 
  return cardsData === null ? [] : cardsData; 
}

// Add card to local storage 
function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards)); 
  window.location.reload();
}

createCards(); 

// Event listeners for arrows 
nextBtn.addEventListener('click', ()=> {
  cardsEl[currentActiveCard].className = 'card left';
  
  currentActiveCard = currentActiveCard + 1; 
  
  if(currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1; 
  }

  cardsEl[currentActiveCard].className = 'card active';
  updateCurrentText(); 
})

prevBtn.addEventListener('click', ()=> {
  cardsEl[currentActiveCard].className = 'card left';
  
  currentActiveCard = currentActiveCard - 1; 
  
  if(currentActiveCard < 0) {
    currentActiveCard = 0; 
  }

  cardsEl[currentActiveCard].className = 'card active';
  updateCurrentText(); 
})

// show add container 
showBtn.addEventListener('click', ()=> addContainer.classList.add('show')); 

// remove add container 
hideBtn.addEventListener('click', ()=> addContainer.classList.remove('show'));

addCardBtn.addEventListener('click', ()=> {
  const question = questionEl.value;
  const answer   = answerEl.value;

  if(question.trim() && answer.trim()) {
    const newCard = {question, answer}; 
    createCard(newCard); 
    questionEl.value = ''; 
    answerEl.value = ''; 
    
    addContainer.classList.remove('show'); 

    cardsData.push(newCard); 
    setCardsData(cardsData); 
  }
})

// clear cards 
clearBtn.addEventListener('click', ()=> {
  localStorage.clear(); 
  cardsContainer.innerHTML = ''; 
  window.location.reload(); 
})
