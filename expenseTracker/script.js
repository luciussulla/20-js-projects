const balance     = document.getElementById('balance'); 
const money_plus  = document.getElementById('money-plus'); 
const money_minus = document.getElementById('money-minus'); 
const list        = document.getElementById('list'); 
const form        = document.getElementById('form'); 
const text        = document.getElementById('text'); 
const amount      = document.getElementById('amount'); 

// const dummyTransactions = [
//   {id: 1, text: "FLoer",  amount: -20}, 
//   {id: 2, text: "Salary", amount: 300}, 
//   {id: 3, text: "Book",   amount: -10}, 
//   {id: 4, text: "Camera", amount: 150}, 
// ]; 

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions')); 

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [] ; 

// Update local storage "transactions"

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions)); 
}

// Add transacsion

function addTransaction(e) {
  e.preventDefault(); 

  if(text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount')
  } else {
    const transaction = {
      id: generateID(), 
      text: text.value, 
      amount: +amount.value
    }
    console.log(transaction);
    transactions.push(transaction); 
    addTransactionDOM(transaction); 
    updateValues(); 
    updateLocalStorage(); // Here we can optionally also update the local storage
    text.value = ''; 
    amount.value = ''; 
  }
}

// remove Transaction
function removeTransaction(id) {
  transactions = transactions.filter(transact => {
    return transact.id !== id
   }); 

   updateLocalStorage(); // Here we can optionally also update the local storage
   
  init(); 
}

// Generate rando ID 

function generateID() {
  return Math.floor(Math.random() * 100000); 
}

// Add transactions to DOM list 

function addTransactionDOM(transaction) {
  // get sign 
  const sign = transaction.amount < 0 ? '-' : '+'; 
  const item = document.createElement('li'); 
  // Add class based on value

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus'); 
  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})" >x</button>
  `

  list.appendChild(item);
}

// Update the balance, income and expense 

function updateValues() {
  const amounts = transactions.map(transaction => 
    transaction.amount
  ); 
  const total   = amounts.reduce((acc, amount) => (acc+= amount),0).toFixed(2); 
  const income  = amounts.filter(item => item > 0)
                         .reduce((acc, item)=> (acc+=item), 0).toFixed(2);               
  const expense = amounts.filter(item => item < 0)
                         .reduce((acc, item)=> (acc+=item), 0).toFixed(2); 

  balance.innerText     = `${total}`
  money_plus.innerText  = `${income}`
  money_minus.innerText = `${expense}`
}

// Init app 
function init() {
  list.innerHTML = ''; 
  transactions.forEach(transaction=> {
    addTransactionDOM(transaction); 
  })
  updateValues(); 
}

init(); 

form.addEventListener('submit', addTransaction); 