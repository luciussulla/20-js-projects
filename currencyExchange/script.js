const currencyEl_one = document.getElementById('currency-one'); 
const amountEl_one   = document.getElementById('amount-one'); 
const currencyEl_two = document.getElementById('currency-two'); 
const amountEl_two   = document.getElementById('amount-two'); 
// https://api.exchangerate-api.com/v4/latest/

// [currencyEl_one, amountEl_one, currencyEl_two, amountEl_two].forEach(el=> console.log(el))

const rate = document.getElementById('rate'); 
const swap = document.getElementById('swap'); 

// Fetch exchange rates and update the dom 

function calculate() {
  const currency_one = currencyEl_one.value
  const currency_two = currencyEl_two.value

  console.log(currency_one, currency_two); 

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
  .then(res=>res.json())
  .then(data => {
    console.log(data); 
    const rate = data.rates[currency_two]; 

    console.log(rate); 
  })

}

// event listeners
currencyEl_one.addEventListener('change', calculate); 
amountEl_one.addEventListener('input', calculate); 
currencyEl_two.addEventListener('change', calculate); 
amountEl_two.addEventListener('input', calculate);