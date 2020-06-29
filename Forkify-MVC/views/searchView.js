import { element } from './base.js';

export const getInput = () => element.searchInput.value;

export const clearInput = () => {
  element.searchInput.value = '';
};

export const clearResults = () => {
  element.resultList.innerHTML = '';
};

const limitRecipeTitle = (title, limit = 20) => {
  const newTitle = [];

  if (title.length > limit) {
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);

    // return the result
    return `${newTitle.join(' ')} ...`;
  }
  return title;
};

const renderRecipe = (recipes) => {
  const markup = `
    <li>
      <a class="results__link" href="#${recipes.recipe_id}">
          <figure class="results__fig">
              <img src=${recipes.image_url} alt="Test">
          </figure>
          <div class="results__data">
              <h4 class="results__name">${limitRecipeTitle(recipes.title)}</h4>
              <p class="results__author">${recipes.publisher}</p>
          </div>
      </a>
  </li>
 `;
  element.resultList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = (recipes) => {
  recipes.forEach((el) => renderRecipe(el));
};
