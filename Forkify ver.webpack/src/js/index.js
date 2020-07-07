import 'core-js';
import 'regenerator-runtime/runtime';
import Search from '../models/search';
import Recipe from '../models/recipe';
import { element, renderLoader, removeLoader } from '../view/base';
import * as searchView from '../view/searchView';
import * as recipeView from '../view/recipeView';
import List from '../models/list';
import * as listView from '../view/listView';
import Likes from '../models/Like';
import * as LikeView from '../view/LikeView';

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

    searchView.highlightSelected(id);

    // Get recipe data
    await state.recipe.getRecipe();
    state.recipe.parseIngredients();

    // calculate servings and time
    state.recipe.calcTime();
    state.recipe.calcServings();

    recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
    console.log(state.recipe);
  }
};

['hashchange'].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);

// LIST CONTROLLER
const controlList = () => {
  // Create a new list
  if (!state.list) state.list = new List();

  // Add each ingredients
  state.recipe.ingredients.forEach((el) => {
    const arr = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(arr);
  });
};

// TESTING
state.likes = new Likes();
LikeView.toggleLikeMenu(state.likes.getNumLikes());

// LIKE CONTORLLER
const controlLike = () => {
  if (!state.likes) state.likes = new Likes();
  const currentID = state.recipe.id;

  if (!state.likes.isLiked(currentID)) {
    // Add like to the state
    const newLike = state.likes.addLike(
      currentID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    );

    // toggle the like button
    LikeView.toggleLikeBtn(true);

    LikeView.toggleLikeMenu(state.likes.getNumLikes());

    // Add like to UI list
    LikeView.renderLike(newLike);

    // user has liked current recipe
  } else {
    // remove like from the state
    state.likes.deleteLike(currentID);

    // toggle the like button
    LikeView.toggleLikeBtn(false);

    LikeView.toggleLikeMenu(state.likes.getNumLikes());

    // remove like from UI list
    LikeView.deleteLike(currentID);
  }
};

// page load
window.addEventListener('load', () => {
  state.likes.readStorage();

  // Restore likes
  LikeView.toggleLikeMenu(state.likes.getNumLikes());

  // Render the existing links
  state.likes.likes.forEach((like) => LikeView.renderLike(like));
});

// Handle delete and update list item events
element.shopping.addEventListener('click', (e) => {
  const id = e.target.closest('.shopping__item').dataset.itemid;

  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    state.list.deleteItem(id);
    listView.deleteItem(id);
  } else if (
    e.target.matches('.shopping__count-value, .shopping__count-value *')
  ) {
    const val = +e.target.value;
    state.list.updateCount(id, val);
  }
});

// Handling recipe button clicks
element.recipe.addEventListener('click', (e) => {
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.undateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    state.recipe.updateServings('inc');
    recipeView.undateServingsIngredients(state.recipe);
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    controlList();
  } else if (e.target.matches('.recipe__love, .recipe__love *')) {
    controlLike();
  }
});
