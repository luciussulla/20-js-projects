
const search = document.getElementById('search'), 
      submit  = document.getElementById('submit'), 
      random = document.getElementById('random'), 
      mealsEl = document.getElementById('meals'), 
      resultHeading = document.getElementById('result-heading'), 
      single_meal = document.getElementById('single-meal')
      

function searchMeal(e) {
  e.preventDefault(); 

  // Clear single meal
  single_meal.innerHTML = ""; 
  const term = search.value; 

  // Check for empty
  if(term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
  } 
  else {
    alert('Please enter a search value'); 
  }
}    

//Event listenes 
submit.addEventListener('submit', searchMeal); 