import Search from '../models/search.js';
import * as searchView from '../views/searchView.js';
import { element, renderLoader, clearLoader } from '../views/base.js';

const state = {};

const controlSearch = async () => {
  const query = searchView.getInput();

  if (query) {
    state.search = new Search(query);

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
  }
};

element.searchFrom.addEventListener('submit', (e) => {
  e.preventDefault();
  controlSearch();
});

//const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
