/* 
  const message = new SpeechSynthesisUtterance(); 
  message.text = this is where we but the text that be spoken
  speechSynthesis.speak(message) = this is how you actually speak  
  speechSynthesis.getVoices()  we get voices
*/ 

const main          = document.querySelector('main');
const voicesSelect  = document.getElementById('voices'); 
const textarea      = document.getElementById('text'); 
const readBtn       = document.getElementById('read'); 
const toggleBtn     = document.getElementById('toggle'); 
const closeBtn      = document.getElementById('close'); 

const data = [
  {
    image: './img/bozena.png', 
    text: "I'm thirsty", 
  }, 
  {
    image: './img/bozena.png', 
    text: "I'm thirsty", 
  }, 
  {
    image: './img/bozena.png', 
    text: "I'm thirsty", 
  }, 
  {
    image: './img/bozena.png', 
    text: "I'm thirsty", 
  }, 
  {
    image: './img/bozena.png', 
    text: "I'm thirsty", 
  }, 
  {
    image: './img/bozena.png', 
    text: "I'm thirsty", 
  }, 
  {
    image: './img/bozena.png', 
    text: "I'm thirsty", 
  }, 
  {
    image: './img/bozena.png', 
    text: "I'm thirsty", 
  }
]

data.forEach(createBox); 

// Create speech box
function createBox(item) {
  console.log(item); 
  const box = document.createElement('div'); 

  const {image, text} = item; 
  box.classList.add('box'); 
  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `; 
  // @todo speak event;
  box.addEventListener('click', ()=> {
    // before the classes below work we initializa speech synthesis utterance
    setTextMessage(text); 
    speekText(); 
    
    // add active effect
    box.classList.add('active'); 
    setTimeout(()=> {
      box.classList.remove('active'); 
    }, 800); 

  }); 

  main.appendChild(box); 
}

// Init speech synthesis 
const message = new SpeechSynthesisUtterance(); 

// Store voices 
let voices = []; 

function getVoices() {
  voices = speechSynthesis.getVoices(); 
  voices.forEach(voice=> {
    const option  = document.createElement('option'); 
    option.value = voice.name; 
    option.innerText = `${voice.name} ${voice.lang}`; 
    voicesSelect.appendChild(option); 
  })
}

// Set voice
function setVoice(e) {
  message.voice = voices.find(voice=> voice.name === e.target.value); 
}

// Set text 
function setTextMessage(text) {
  message.text = text; 
}

// speek the text 
function speekText() {
  speechSynthesis.speak(message)
}

// Voices changes 
speechSynthesis.addEventListener('voiceschanged', getVoices); 

// Toggle text box 
toggleBtn.addEventListener('click', ()=> document.getElementById('text-box').classList.toggle('show')); 

// Toggle text box 
closeBtn.addEventListener('click', ()=> document.getElementById('text-box').classList.remove('show')); 

// change voice
voicesSelect.addEventListener('change', setVoice); 

// read text button

readBtn.addEventListener('click', ()=> {
  setTextMessage(textarea.value); 
  speekText(); 
})

getVoices(); 