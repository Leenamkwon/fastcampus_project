export const element = {
  searchInput: document.querySelector('.search__field'),
  searchFrom: document.querySelector('.search'),
  resultList: document.querySelector('.results__list'),
  result: document.querySelector('.results')
};

export const renderLoader = (parent) => {
  const loader = `
    <div class="loader">
      <svg>
        <use href="../img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;
  parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
  const loader = document.querySelector('.loader');
  if (loader) loader.parentElement.removeChild(loader);
};
