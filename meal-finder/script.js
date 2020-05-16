const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal');

// Search meal and fetch from API
function searchMeal(e) {
  e.preventDefault();

  // clear single meal
  single_mealEl.innerHTML = '';

  // Get search term
  const term = search.value;

  // Check for empty
  if (term.trim()) {
    fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${search.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        resultHeading.innerHTML = `<h2>Search results for '${term}'</h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There are no search results. Try again</p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map((meal) => {
              return `<div class="meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMealThumb}" />
                <div class="meal-info" data-mealID="${meal.idMeal}">
                  <h3>${meal.strMeal}</h3>
                </div>
            </div>`;
            })
            .join('');
        }
      });
    // Clear search value
    search.value = '';
  } else {
    alert('Please enter a search value');
  }
}

// Fetch meal by ID
function getMealByID(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      console.log(meal);

      addMealToDOM(meal);
    });
}

// Add meal the DOM
function addMealToDOM(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i += 1) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  single_mealEl.innerHTML = `
    <ul>
      ${ingredients.map((list) => list).join('')}
    </ul>
  `;
}

// Event listeners
submit.addEventListener('submit', searchMeal);
meals.addEventListener('click', (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    getMealByID(mealID);
  }
});
