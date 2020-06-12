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
        console.log(resList);

        const {
          thumb: img,
          name,
          location: { address },
          user_rating: { aggregate_rating },
          cuisines,
          average_cost_for_two,
          menu_url,
          url
        } = resList.restaurant;
        if (img !== '') {
          this.showRestaurant(
            img,
            name,
            address,
            aggregate_rating,
            cuisines,
            average_cost_for_two,
            menu_url,
            url
          );
        }
      });
    }
  }

  showRestaurant(
    img,
    name,
    address,
    aggregate_rating,
    cuisines,
    average_cost_for_two,
    menu_url,
    url
  ) {
    const div = document.createElement('div');
    div.classList.add('col-11', 'mx-auto', 'my-3', 'col-md-4');
    div.innerHTML = `
    <div class="card">
    <div class="card">
     <div class="row p-3">
      <div class="col-5">
       <img src="${img}" class="img-fluid img-thumbnail" alt="">
      </div>
      <div class="col-5 text-capitalize">
       <h6 class="text-uppercase pt-2 redText">${name}</h6>
       <p>${address}</p>
      </div>
      <div class="col-1">
       <div class="badge badge-success">
        ${aggregate_rating}
       </div>
      </div>
     </div>
     <hr>
     <div class="row py-3 ml-1">
      <div class="col-5 text-uppercase ">
       <p>cousines : </p>
       <p>cost for two : </p>
      </div>
      <div class="col-7 text-uppercase">
       <p> ${cuisines}</p>
       <p>${average_cost_for_two}</p>
      </div>
     </div>
     <hr>
     <div class="row text-center no-gutters pb-3">
      <div class="col-6">
       <a href="${menu_url}" target="_blank" class="btn redBtn  text-uppercase"><i class="fas fa-book"></i> menu</a>
      </div>
      <div class="col-6">
       <a href="${url}" target="_blank" class="btn redBtn  text-uppercase"><i class="fas fa-book"></i> website</a>
      </div>
     </div>
    </div>
   </div>
    `;
    this.restaurantList.appendChild(div);
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
