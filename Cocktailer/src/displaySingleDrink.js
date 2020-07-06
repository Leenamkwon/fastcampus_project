import { showLoading, hideLading } from './toggleLoading.js';
import get from './getElement.js';

const listIng = (list) => {
  const IngredientList = list
    .map((ing) => {
      let markup = `
    
   `;
    })
    .join('');

  return IngredientList;
};

const singleDrink = (drink) => {
  hideLading();

  console.log(drink);

  const {
    strDrinkThumb: image,
    strDrink: name,
    strInstructions: desc
  } = drink[0];

  const arrIng = drink.map((ing) => {
    const temp = [];
    for (let i = 1; i <= 20; i += 1) {
      if (ing[`strIngredient${i}`]) {
        temp.push(`${ing[`strIngredient${i}`]}`);
      } else {
        break;
      }
    }
    return temp;
  });

  let markup = `
      <section class="single-drink">
     <img src="${image}" class="drink-img" alt="${name}" />
     <article class="drink-info">
       <h2 class="drink-name">${name}</h2>
       <p class="drink-desc">${desc}</p>
       <ul class="drink-ingredients">
        ${listIng(arrIng)}
       </ul>
       <a href="index.html" class="btn">all cocktails</a>
     </article>
  `;
};

export default singleDrink;
