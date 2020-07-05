import get from './getElement.js';
import presentDrinks from './presentDrinks.js';

const baseURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`;

const form = get('.search-form');
const input = get('[name="drink"]');

console.log(form);

const search = () => {
  form.addEventListener('keyup', (e) => {
    e.preventDefault();
    if (!input.value) {
      return;
    } else if (input.value.trim()) {
      presentDrinks(`${baseURL}${input.value}`);
    }
  });
};

export default search;
