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

    const categoryInfo = await fetch(categoryURL, this.header);
    const categoryJSON = await categoryInfo.json();
    const categories = await categoryJSON.categories;

    return { categories };
  }
}

class UI {
  constructor() {
    this.loader = document.querySelector('.loader');
    this.restaurantList = document.getElementById('restaurant-list');
  }

  addSelectOptions(categories) {
    const searchCategory = document.getElementById('searchCategory');
    let output = `<option selected>select cuisne menu</option>`;

    categories.forEach((item) => {
      console.log(item);
      output += `<option value="${item.categories.id}" selected>${item.categories.name}</option>`;
    });
    searchCategory.innerHTML = output;
  }
}

(function () {
  const searchForm = document.getElementById('searchForm');
  const searchCity = document.getElementById('searchCity');
  const searchCategory = document.getElementById('searchCategory');

  const zomato = new ZOMATO();

  const ui = new UI();

  // add select option
  window.addEventListener('DOMContentLoaded', () => {
    // logic goes here
    zomato.searchAPI().then((data) => {
      const { categories } = data;
      ui.addSelectOptions(categories);
    });
  });
})();
