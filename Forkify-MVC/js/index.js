import Search from '../models/search.js';
import * as searchView from '../views/searchView.js';
import { element, renderLoader, clearLoader } from '../views/base.js';
import Recipe from '../models/Recipe.js';

const state = {};

// search controller
const controlSearch = async () => {
  const query = searchView.getInput();

  if (query) {
    state.search = new Search(query);

    try {
      renderLoader(element.result);

      // prepare ui
      searchView.clearResults();

      // Search for recipes
      await state.search.getResult();

      // render results on UI
      await searchView.renderResults(state.search.results);

      // clear Input
      searchView.clearInput();
      clearLoader();
    } catch (error) {
      alert('search data wrong');
    }
  }
};

element.searchFrom.addEventListener('submit', (e) => {
  e.preventDefault();
  controlSearch();
});

element.searchResPages.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goToPage = +btn.dataset.goto;
    searchView.clearResults();
    searchView.renderResults(state.search.results, goToPage);
  }
});

// RECIPE CONTROLLER
const controlRecipe = async () => {
  // Get ID from url
  const id = +window.location.hash.replace('#', '');

  if (id) {
    // prepare UI for changes
    state.recipe = new Recipe(id);

    try {
      // Create new recipe object
      await state.recipe.getRecipe();

      // Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render recipe
      console.log(state.recipe.ingredients);
      // state.recipe.parseIngredients();
    } catch (error) {
      alert('Error processing recipe!');
    }
  }
};

['hashchange', 'load'].forEach((event) => {
  window.addEventListener(event, controlRecipe);
});

//const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
