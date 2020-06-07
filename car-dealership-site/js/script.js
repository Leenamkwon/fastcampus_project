window.addEventListener('load', () => {
  document.querySelector('.preloader').classList.add('hidePreloader');
});

const CreateCars = (() => {
  const cars = [];

  class Car {
    constructor(make, country, img, special, model, price, type, trans, gas) {
      this.make = make;
      this.country = country;
      this.img = img;
      this.special = special;
      this.model = model;
      this.price = price;
      this.type = type;
      this.trans = trans;
    }
  }

  function makeCar(
    make,
    country,
    img = 'img/car-default.jpeg',
    special = true,
    model = 'new model',
    price = 1000,
    type = 'sedan',
    trans = 'automatic',
    gas = '50'
  ) {
    const car = new Car(
      make,
      country,
      img,
      special,
      model,
      price,
      type,
      trans,
      gas
    );
    cars.push(car);
  }

  function produceCars() {
    makeCar('chevy', 'american');
    makeCar('mercedes', 'german', 'img/car-german-1.jpeg', true);
    makeCar('bmw', 'german', 'img/car-german-2.jpeg', false);
    makeCar('bmw', 'german', 'img/car-german-3.jpeg', false, 'some model');
    makeCar('bmw', 'german', 'img/car-german-4.jpeg', undefined, 'some model');
    makeCar('mercedes', 'german', 'img/car-german-5.jpeg', false, 'some model');
    makeCar('chevy', 'american', 'img/car-american-1.jpeg');
    makeCar('chevy', 'american', 'img/car-american-2.jpeg', false);
    makeCar('chevy', 'american', 'img/car-american-3.jpeg', false);
    makeCar('chevy', 'american', 'img/car-american-4.jpeg', false);
    makeCar('chevy', 'american', 'img/car-american-5.jpeg', false);
  }
  produceCars();
  // special cars
  const specialCars = cars.filter((car) => car.special === true);

  return {
    cars,
    specialCars
  };
})();

const DisplaySpecialCars = (() => {
  const specialCars = CreateCars.specialCars;

  const info = document.querySelector('.featured-info');

  document.addEventListener('DOMContentLoaded', () => {
    info.innerHTML = '';

    let data = '';

    specialCars.forEach((item) => {
      data += `
      <div
      class="featured-item my-3 d-flex p-2 text-capitalize align-items-baseline flex-wrap"
    >
      <span data-img="${item.img}" class="featured-icon mr-2">
        <i class="fas fa-car"></i>
      </span>
      <h5 class="font-weight-bold mx-1">${item.make}</h5>
      <h5 class="mx-1">${item.model}</h5>
    </div>
      `;
    });

    info.innerHTML = data;
  });
  // change img
  info.addEventListener('click', (e) => {
    if (e.target.parentElement.classList.contains('featured-icon')) {
      const img = e.target.parentElement.dataset.img;
      document.querySelector('.featured-photo').src = img;
    }
  });
})(CreateCars);
