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
  main.appendChild(box); 
}