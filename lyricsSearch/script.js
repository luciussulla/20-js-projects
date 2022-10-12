const form = document.getElementById('form'); 
const search = document.getElementById('search'); 
const result = document.getElementById('result'); 
const more = document.getElementById('more'); 

const apiURL = 'https://api.lyrics.ovh'; 

// Search by song or artist

async function searchSongs(searchTerm) {
  let result = await fetch(`${apiURL}/suggest/${searchTerm}`); 
  let data = await result.json(); 
  console.log(data); 
}

// Show song and artists on DOM 
function showData(data) {
  
}

form.addEventListener('submit', e=> {
  e.preventDefault(); 
  const searchTerm = search.value.trim(); 

  if(!searchTerm) {
    alert("Please tye in a search term"); 
  } else {
    searchSongs(searchTerm); 
  }
})