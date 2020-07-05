export const element = {
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  searchList: document.querySelector('.results__list'),
  resultPage: document.querySelector('.results__pages'),
  recipe: document.querySelector('.recipe'),
  shopping: document.querySelector('.shopping__list')
};

export const renderLoader = (parent) => {
  const loader = `
      <div class="loader">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
      </div>
  `;
  parent.innerHTML = loader;
};

// export const removeLoader = (parent) => {
//   parent.removeChild(document.querySelector('.loader'));
// };
