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

    const cityList = await fetch(cityURL, this.header);
    const cityJSON = await cityList.json();
    const cityInfo = await cityJSON.location_suggestions;

    let cityID = 0;

    if (cityInfo.length > 0) {
      cityID = cityInfo[0].id;
    }

    const restaurantURL = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityID}&entity_type=city&category=${categoryID}&sort=rating`;

    const resList = await fetch(restaurantURL, this.header);
    const resJSON = await resList.json();
    const resInfo = await resJSON.restaurants;

    return { categoryInfo, cityID, resInfo };
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

    let output = `<option value="0" selected>Selected option</option>`;
    categoryInfo.forEach((item) => {
      output += `<option value="${item.categories.id}" selected>${item.categories.name}</option>`;
    });

    searchList.innerHTML = output;
  }

  showFeedback(text) {
    const feedback = docuemnt.querySelector('.feedback');
    feedback.classList.add('showItem');
    feedback.innerHTML = `<p>${text}</p>`;

    setTimeout(() => {
      feedback.classList.remove('showItem');
    }, 1000);
  }

  showLoader() {
    this.loader.classList.add('showItem');
  }

  hideLoader() {
    this.loader.classList.remove('showItem');
  }

  getRestaurants(res) {
    this.hideLoader();
    if (res.length === 0) {
      this.showFeedback('no such categories exist in the selected city');
    } else {
      this.restaurantList.innerHTML = '';
      res.forEach((resList) => {
        const {} = resList;
      });
    }
  }
}

(function () {
  const zomato = new ZOMATO();
  const ui = new UI();

  const searchCategory = document.getElementById('searchCategory');
  const searchInput = document.getElementById('searchCity');
  const searchForm = document.getElementById('searchForm');

  window.addEventListener('DOMContentLoaded', () => {
    zomato.searchAPI().then((data) => ui.addSelectOptions(data));
  });

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = searchInput.value;
    const categoryID = +searchCategory.value;

    if (city.trim() === '' || categoryID === 0) {
      showFeedback('enter the value');
    } else {
      zomato.searchAPI(city).then((data) => {
        const { cityID } = data;
        if (cityID === 0) {
          showFeedback('해당 결과가 없습니다.');
        } else {
          ui.showLoader();
          zomato.searchAPI(city, cityID).then((data) => {
            ui.getRestaurants(data.resInfo);
          });
        }
      });
    }
  });
})();
