import get from './getElement.js';
import * as loading from './toggleLoading.js';

const displayDrinks = (data) => {
  const section = get('.section-center');
  const title = get('.title');

  if (!data) {
    loading.hideLading();
    title.textContent = 'sorry, no drinks matched your search';
    section.innerHTML = '';
    return;
  }
  const newDrinks = data
    .map((data) => {
      const { idDrink: id, strDrink: name, strDrinkThumb: image } = data;
      let markup = `
        <a href="#" data-id="${id}">
         <article class="cocktail" data-id="${id}">
           <img src=${image} alt="cocktail" />
           <h3>${name}</h3>
         </article>
        </a>
   `;
      return markup;
    })
    .join('');

  // hide loading
  loading.hideLading();
  title.textContent = '';
  section.innerHTML = newDrinks;

  return section;
};

export default displayDrinks;

// view
