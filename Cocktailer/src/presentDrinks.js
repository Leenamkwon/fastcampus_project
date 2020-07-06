import fetchDrinks from './fetchDrinks.js';
import displayDrinks from './displayDrinks.js';
import setDrink from './setDrink.js';

const showDrink = async (url) => {
  const cocktailDB = await fetchDrinks(url);

  const section = await displayDrinks(cocktailDB.drinks);

  if (section) {
    setDrink(section);
  }
};

export default showDrink;

// controller
