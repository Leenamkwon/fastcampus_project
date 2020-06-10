class ZOMATO {
  constructor() {
    this.api = 'd69e9a9bc887d008189243d7ef35c6a6';
    this.header = {
      method: 'GET',
      headers: {
        'user-key': this.api,
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    };
  }

  async searchAPI(city, categoryID) {
    const categoryURL = `https://developers.zomato.com/api/v2.1/categories`;
    const cityURL = `https://developers.zomato.com/api/v2.1/cities?q=${city}`;

    const categoryList = await fetch(categoryURL, this.header);
    const categoryJSON = await categoryList.json();
    const categoryInfo = await categoryJSON.categories;

    return { categoryInfo };
  }
}

class UI {
  constructor() {
    this.loader = document.querySelector('.loader');
    this.restaurantList = document.getElementById('restaurant-list');
  }
  addSelectOptions(categories) {
    const searchList = document.getElementById('searchCategory');
    const { categoryInfo } = categories;

    let input = `<option value="0" selected>Selected...</option>`;
    categoryInfo.forEach((item) => {
      input += `<option value="${item.categories.id}" selected>${item.categories.name}</option>`;
    });

    searchList.innerHTML = input;
  }
}

(function () {
  const zomato = new ZOMATO();
  const ui = new UI();

  const searchList = document.getElementById('searchCategory');
  const searchInput = document.getElementById('searchCity');
  const searchForm = document.getElementById('searchForm');

  window.addEventListener('DOMContentLoaded', () => {
    zomato.searchAPI().then((data) => ui.addSelectOptions(data));
  });

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
  });
})();
