import { element } from './base.js';

export const getInput = () => element.searchInput.value;

export const clearInput = () => {
  element.searchInput.value = '';
};

export const clearResults = () => {
  element.resultList.innerHTML = '';
  element.searchResPages.innerHTML = '';
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
              <img src=${recipes.image_url} alt=${recipes.title}>
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

const pageClick = (page) => {
  const pageBtn = document.querySelector('.btn-inline');
  pageBtn.addEventListener('click', (e) => {
    console.log(e.currentTarget);
    console.log(page++);
  });
};

// type: prev or next
const createButton = (page, type) => {
  const markup = `
  <button class="btn-inline results__btn--${type}" data-goto=${
    type === 'prev' ? page - 1 : page + 1
  }>
    <svg class="search__icon">
      <use href="img/icons.svg#icon-triangle-${
        type === 'prev' ? 'left' : 'right'
      }"></use>
    </svg>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
  </button>
  `;

  return markup;
};

const renderButton = (page, numResults, resPerpage) => {
  // 전체 페이지 구하는 공식
  const pages = Math.ceil(numResults / resPerpage);
  let button;

  if (page === 1 && pages > 1) {
    // only next
    button = createButton(page, 'next');
  } else if (page < pages) {
    // both button
    button = `${createButton(page, 'prev')}
              ${createButton(page, 'next')}`;
  } else if (page === pages && pages > 1) {
    // only previous
    button = createButton(page, 'prev');
  }
  element.searchResPages.innerHTML = button;
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  // 렌더링 페이지
  const start = (page - 1) * resPerPage; // 10, 5
  const end = page * resPerPage; // 20, 10

  // 몇개 씩 페이지에 보이게 할 것인지
  recipes.slice(start, end).forEach((el) => renderRecipe(el));

  // 렌더링 페이지 버튼
  renderButton(page, recipes.length, resPerPage);

  // 페이지 클릭
  pageClick(page);
};
