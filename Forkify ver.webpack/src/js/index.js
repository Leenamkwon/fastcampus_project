import 'core-js';
import regeneratorRuntime from 'regenerator-runtime';
import Search from '../models/search';
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

window.addEventListener('hashchange', (e) => {
  e.preventDefault();
  console.log('hi');
});
window.addEventListener('load', (e) => {
  e.preventDefault();
  console.log('hi');
});
