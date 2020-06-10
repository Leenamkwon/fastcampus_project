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

    const categoryInfo = await fetch(categoryURL, this.header);
    const categoryJSON = await categoryInfo.json();
    const categories = await categoryJSON.categories;

    const cityInfo = await fetch(cityURL, this.header);
    const cityJSON = await cityInfo.json();
    const cityData = await cityJSON.location_suggestions;

    let cityID = 0;

    if (cityData.length > 0) {
      cityID = await cityData[0].id;
    }

    // search restaurant
    const restaurantURL = `https://developers.zomato.com/api/v2.1/search?entity_id=${city}&entity_type=city&category=${categoryID}&sort=rating`;

    const resInfo = await fetch(restaurantURL, this.header);
    const resJSON = await resInfo.json();
    const resData = await resJSON.restaurants;

    return { categories, cityID, resData };
  }
}

class UI {
  constructor() {
    this.loader = document.querySelector('.loader');
    this.restaurantList = document.getElementById('restaurant-list');
  }

  addSelectOptions(categories) {
    const searchCategory = document.getElementById('searchCategory');
    let output = `<option value="0" selected>select cuisne menu ^^</option>`;

    categories.forEach((item) => {
      output += `<option value="${item.categories.id}" selected>${item.categories.name}</option>`;
    });
    searchCategory.innerHTML = output;
  }

  showFeedback(text) {
    const feedback = document.querySelector('.feedback');
    feedback.innerHTML = `<p>${text}</p>`;
    feedback.classList.add('showItem');
    setTimeout(() => {
      feedback.classList.remove('showItem');
    }, 3000);
  }

  showLoader() {
    this.loader.classList.add('showItem');
  }

  hideLoader() {
    this.loader.classList.remove('showItem');
  }

  getRestaurants(restaurants) {
    this.hideLoader();
    console.log(restaurants);

    if (restaurants.length === 0) {
      this.showFeedback('no such categories exist in the selected');
    } else {
      this.restaurantList.innerHTML = '';
      restaurants.forEach((restaurants) => {
        console.log(restaurants);

        const {
          thumb: img,
          name,
          location: { address },
          user_rating: { aggregate_rating },
          cousines,
          average_cost_for_two: { cost, menu_url, url }
        } = restaurants.restaurants;

        if (img !== '') {
          this.showRestaurant(
            img,
            name,
            address,
            aggregate_rating,
            cousines,
            cost,
            menu_url,
            url
          );
        } else {
          false;
        }
      });
    }
  }
  showRestaurant(
    img,
    name,
    address,
    aggregate_rating,
    cousines,
    cost,
    menu_url,
    url
  ) {
    const div = document.querySelector('div');
    div.classList.add('col-11', 'mx-auto', 'my-3', 'col-md-4');
    div.innerHTML = `
    <div class="col-11 mx-auto my-3">
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
        <p>cousines : ${cousines}</p>
        <p>cost for two : ${cost}</p>
       </div>
       <div class="col-7 text-uppercase">
        <p>cousines</p>
        <p>cost</p>
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

    <!-- item -->
   </div>
    `;
    this.restaurantList.appendChild(div);
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

    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const city = searchCity.value;
      const categoryID = parseInt(searchCategory.value);

      if (city === '' || categoryID === 0) {
        ui.showFeedback('please enter value');
      } else {
        // logic goes here
        zomato.searchAPI(city).then((data) => {
          if (data.cityID === 0) {
            ui.showFeedback('please enter a valid city !');
          } else {
            ui.showLoader();
            zomato.searchAPI(city, categoryID).then((data) => {
              ui.getRestaurants(data.resData);
            });
          }
        });
      }
    });

    ////
  });
})();
