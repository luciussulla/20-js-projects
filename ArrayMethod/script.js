const main = document.getElementById('main')
const addUsersBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')

let data = []; 
let totalMoney = 0; 

async function getRandomUser() {
  const res  = await fetch('https://randomuser.me/api')
  const data = await res.json()

  const user = data.results[0]; 

  const newUser = {
    name:  `${user.name.first} ${user.name.last}`, 
    money: Math.floor(Math.random()* 100000)
  }
  addData(newUser); 
}

// Add new objs to data arrat
 function addData(obj) {
  data.push(obj); 
  updateDOM(); 
 }

 // Update DOM
 function updateDOM(providedData = data) {
  // Clear main div 
  main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`; 
  providedData.forEach(person => {
    const element = document.createElement('div'); 
    element.classList.add('person'); 
    element.innerHTML =  `<strong>${person.name}</strong> ${formatMoney(person.money)}`; 
    main.appendChild(element); 
  })
 }

 // Format number as money 
 function formatMoney(number) {
  return  '$ ' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
 }

 function doubleMoney() {
  data = data.map(user=> {return {...user, money: user.money*2}})
  updateDOM(); 
 }

 // sorts users by richest
 function sortByRichest() {
  console.log(data)
  data.sort((a,b) => {
    return b.money - a.money
  })
  updateDOM(); 
 }
 // show only millionnaires

 function showOnlyMillionnaires() {
  data = data.filter(person=> person.money >= 1000000); 
  updateDOM(); 
 }

 // Calculate the wealth 
function calculateWealth() {
  let totalMoney = data.reduce((acc, item)=> {
    return acc + item.money; 
  }, 0);
  let wealthEl = document.createElement('div'); 
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(totalMoney)}</strong></h3>`; 
  main.appendChild(wealthEl); 
}

 // Event listeners 
 addUsersBtn.addEventListener('click', getRandomUser); 
 doubleBtn.addEventListener('click', doubleMoney);
 sortBtn.addEventListener('click', sortByRichest); 
 showMillionairesBtn.addEventListener('click', showOnlyMillionnaires);
 calculateWealthBtn.addEventListener('click', calculateWealth);  