const main = document.getElementById('main')
const addUsersBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionnaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')

let data = []; 
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api')
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

 // Event listeners 
 addUsersBtn.addEventListener('click', getRandomUser); 
 doubleBtn.addEventListener('click', doubleMoney);