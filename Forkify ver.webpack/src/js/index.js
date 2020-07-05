import 'core-js';
import regeneratorRuntime from 'regenerator-runtime';
import Search from '../models/search';
import Recipe from '../models/recipe';
import { element, renderLoader, removeLoader } from '../view/base';
import * as searchView from '../view/searchView';
import * as recipeView from '../view/recipeView';

const state = {};

const controlSearch = async () => {
  const query = searchView.getInput();

  if (query) {
    renderLoader(element.searchList);
    state.search = new Search(query);

    await state.search.getResults();

    // clear input
    searchView.clearField();
    searchView.clearResults();

    // render data
    searchView.renderResults(state.search.result);
  } else {
  }
};

element.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  controlSearch();
});

element.resultPage.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto);
    searchView.renderResults(state.search.result, goToPage);
  }
});

// RECIPE CONTROLE
const controlRecipe = async () => {
  renderLoader(element.recipe);
  const id = window.location.hash.replace('#', '');

  if (id) {
    // Create new recipe object
    state.recipe = new Recipe(id);

    // Get recipe data
    await state.recipe.getRecipe();
    state.recipe.parseIngredients();

    // calculate servings and time
    state.recipe.calcTime();
    state.recipe.calcServings();

    recipeView.renderRecipe(state.recipe);
    console.log(state.recipe);
  }
};

['hashchange', 'load'].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);
