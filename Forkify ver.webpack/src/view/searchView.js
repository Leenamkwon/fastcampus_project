import { element } from './base';

export const getInput = () => element.searchInput.value;

export const clearField = () => {
  element.searchInput.value = '';
};
export const clearResults = () => {
  element.searchList.innerHTML = '';
};

const limitRecipeTitle = (title, limit = 20) => {
  let arr = [];
  if (title.length > limit) {
    title.split(' ').reduce((acc, num) => {
      if (acc + num.length < limit) {
        arr.push(num);
      }
      return (acc += num.length);
    }, 0);
    return `${arr.join(' ')}...`;
  } else {
    return title;
  }
};

const renderRecipe = (recipe) => {
  let markup = `
     <li>
       <a class="results__link results__link--active" href="#${
         recipe.recipe_id
       }">
           <figure class="results__fig">
               <img src=${recipe.image_url} alt="Test">
           </figure>
           <div class="results__data">
               <h4 class="results__name">${limitRecipeTitle(recipe.title)}
               </h4>
               <p class="results__author">${recipe.publisher}</p>
           </div>
       </a>
   </li>
 `;
  element.searchList.insertAdjacentHTML('afterbegin', markup);
};

const renderBtn = (page, type) => {
  let markup = `
    <button class="btn-inline results__btn--${
      type === 'prev' ? 'prev' : 'next'
    }">
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle---${
          type === 'prev' ? 'prev' : 'next'
        }"></use>
    </svg>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    </button>
   `;
  return markup;
};

const renderPage = (recipe, page, resPerpage) => {
  const pages = Math.ceil(recipe.length / resPerpage);
  let markup;
  if (page === 1 && pages > 1) {
    markup = renderBtn(page, 'next');
  } else if (page < pages) {
    markup = `
     ${renderBtn(page, 'prev')}
     ${renderBtn(page, 'next')}
   `;
  } else if (page === pages && pages > 1) {
    markup = renderBtn(page, 'prev');
  }

  element.resultPage.innerHTML = markup;
};

export const renderResults = (recipe, page = 1, resPerpage = 10) => {
  const start = (page - 1) * resPerpage;
  const end = page * resPerpage;
  recipe.slice(start, end).forEach((item) => renderRecipe(item));
  renderPage(recipe, page, resPerpage);
};
