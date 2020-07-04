import 'core-js';
import regeneratorRuntime from 'regenerator-runtime';
import Search from '../models/search';
import Recipe from '../models/recipe';
import { element, renderLoader, removeLoader } from '../view/base';
import * as searchView from '../view/searchView';

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

const controlRecipe = () => {
  const hash = window.location.hash.replace('#', '');

  if (id) {
    state.recipe = new Recipe(hash);
  }
};

['hashchange', 'load'].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);
