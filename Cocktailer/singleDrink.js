import fetchDrinks from './src/fetchDrinks.js';
import displayDrink from './src/displaySingleDrink.js';

const presentDrink = async () => {
  // get id
  const id = localStorage.getItem('drink');
  const detailID = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  if (!id) {
    window.location.replace('index.html');
  } else {
    // get data
    const data = await fetchDrinks(detailID);

    // display item
    displayDrink(data.drinks);
  }
};

window.addEventListener('DOMContentLoaded', presentDrink);
