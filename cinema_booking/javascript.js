
const container = document.querySelector('.container'); 
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); /* NOde list */ 

const count = document.getElementById('count'); 
const total = document.getElementById('total'); 
const movieSelect = document.getElementById('movie'); 
let ticketPrice = +movieSelect.value; 

populateUi();

// actual populate ui func 

function populateUi() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
  console.log(selectedSeats)

  if(selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if(selectedSeats.indexOf(index)>-1) {
        seat.classList.add('selected');
      }   
    }); 
  }

  const selectedMovieIndex = localStorage.getItem('selectedMoiveIndex'); 
  
  if(selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex; 
  }
}

// save selected movie index and price 

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex); 
  localStorage.setItem('selectedMoviePrice', moviePrice); 
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected'); 
  const seatsIndex = [...selectedSeats].map(seat=> [...seats].indexOf(seat))
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

  const selectedSeatsCount = selectedSeats.length
  count.innerText = selectedSeatsCount
  total.innerText = selectedSeatsCount * ticketPrice
}

// movie select event 
movieSelect.addEventListener('change', e => {
  ticketPrice = movieSelect.value*1; 
  setMovieData(e.target.selectedIndex, e.target.value); 
  updateSelectedCount();
})

// Seat click event 
container.addEventListener('click', (e)=> {
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedCount(); 
  }
}); 

// Iniial count and total set 
updateSelectedCount();