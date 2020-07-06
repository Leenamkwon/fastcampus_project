import { showLoading, hideLading } from './toggleLoading.js';
import get from './getElement.js';

const singleDrink = (drink) => {
  hideLading();

  let markup = `
      <section class="single-drink">
     <img src="./cocktail.jpg" class="drink-img" alt="" />
     <article class="drink-info">
       <h2 class="drink-name"></h2>
       <p class="drink-desc"></p>
       <ul class="drink-ingredients"></ul>
       <a href="index.html" class="btn">all cocktails</a>
     </article>
  `;
};

export default singleDrink;
