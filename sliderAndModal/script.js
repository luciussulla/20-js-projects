const toggle = document.getElementById('toggle'); 
const close = document.getElementById('close'); 
const open = document.getElementById('open'); 
const modalContainer = document.getElementById('modal'); 
const modal = document.querySelector('.modal'); 

// Toggle nav 
toggle.addEventListener('click', ()=> {
  document.body.classList.toggle('show-nav'); 
})

// Show modal 
open.addEventListener('click', ()=> {
  modalContainer.classList.add('show-modal'); 

  modal.classList.add('visible'); 
  console.log("click"); 
})

// Hide modal 
close.addEventListener('click', ()=> {
  modalContainer.classList.remove('show-modal'); 
  modal.classList.remove('visible'); 
  console.log("click"); 
})

// hide modal on outside click
window.addEventListener('click', e =>  {
  if(e.target==modalContainer) {
    modalContainer.classList.remove('show-modal'); 
    modal.classList.remove('visible'); 
    console.log("click"); 
  }
}); 

