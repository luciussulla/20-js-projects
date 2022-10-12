

// !!!! THIS API DOES NOT WORK PROPERLY. MOST SONGS ARE NOT THERE 


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
  showData(data); 
}

// Show song and artists on DOM 
// function showData(data) {
//   let output = ''; 
//   data.data.forEach(song => {
//     output += `
//       <li>
//         <span><strong>${song.artist.name}</strong> - ${song.title}</span>
//         <button class="btn" data-artist="${song.artist.name}" data-title="${song.title}">Get lyrics<button>
//       </li>
//       `; 
//   }) 

//   result.innerHTML = `
//   <ul class="songs">
//     ${output} 
//   </ul>
//   `
// }

// Get prev and next results
async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`); 
  const data = await res.json(); 
  showData(data); 
}

function showData(data) {
  result.innerHTML = `
    <ul class="songs">
      ${data.data.map(song => `
        <li>
          <span><strong>${song.artist.name}</strong> - ${song.title}</span>
          <button class="btn" data-artist="${song.artist.name}" data-songTitle="${song.title}">Get lyrics</button>
        </li>
      `).join('')}
    <ul>
  `; 

  if(data.prev || data.next) {
    more.innerHTML =  `
      ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')"> Prev </button>` : ''}
      ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')"> Next </button>` : ''}
    `; 
  } else {
    more.innerHTML = ''; 
  }
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

// get lyrics for song 
async function getLyrics(artist="", songTitle="") {
  console.log(`${apiURL}/v1/${artist}/${songTitle}`); 
  const res  = await fetch(`${apiURL}/v1/${artist}/${songTitle}`); 
  const data = await res.json(); 

  console.log(data); 
}

// Ger lyrics btn click
result.addEventListener('click', e => {
  const clickedEl = e.target;
  console.log(clickedEl.tagName); 
  if(clickedEl.tagName === "BUTTON") {
    let artist =    clickedEl.getAttribute('data-artist') ; 
    let songTitle = clickedEl.getAttribute('data-songTitle'); 
    getLyrics(artist, songTitle); 
  } 
  console.log(clickedEl.getAttribute('data-artist'));   
})