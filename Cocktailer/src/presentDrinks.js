import fetchDrinks from './fetchDrinks.js';
import displayDrinks from './displayDrinks.js';

const showDrink = async (url) => {
  const cocktailDB = await fetchDrinks(url);

  const section = await displayDrinks(cocktailDB.drinks);

  return section;
};

export default showDrink;

// controller
