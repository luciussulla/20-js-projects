
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
      resultHeading.innerHTML = `<h2>Search results for '${term}' </h2>`;
      if(data.meals === null) {
        resultHeading.innerHTML = `<p>There are no results</p>`; 
      } else {
        mealsEl.innerHTML = data.meals.map(meal => `
          <div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="meal-info" data-mealId="${meal.idMeal}">
              <h3>${meal.strMeal}</h3>
            </div>
          </div>
        `). join(''); 
      }
      // Clear search text
      search.value = ""; 
    })
  } 
  else {
    alert('Please enter a search value'); 
  }
}    

// Add meal to DOM 
function addMealToDom (meal) {
  const ingredients = []; 

  for (let i =1; i<=20; i++) {
    if(meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient[${i}]`]} - ${meal[`strMeasure${i}`]}`)
    } else {
      break
    }
  }

  single_meal.innerHTML =  `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strCategory}</p>` : ''}  
      </div>  
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
      </div>
    </div>
  ` 
}

// Fetch meal by id
function getMealById(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
  .then(res => res.json())
  .then(data => {
    const meal = data.meals[0];
    console.log(meal)
    addMealToDom(meal); 
  })
}

//Event listenes 
submit.addEventListener('submit', searchMeal); 

mealsEl.addEventListener('click', e=> {
  const mealInfo = e.path.find(item=> {
    // console.log(item); 
    if(item.classList) {
      return item.classList.contains('meal-info'); 
    } else {
      return false
    }
  })

  if(mealInfo) {
    const mealId = mealInfo.getAttribute('data-mealId'); 
    console.log(mealId); 
    getMealById(mealId); 
  }
})