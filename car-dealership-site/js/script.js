window.addEventListener('load', () => {
  document.querySelector('.preloader').classList.add('hide');
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
    makeCar('mercedes', 'german');
    makeCar('chevy', 'american');
    makeCar('chevy', 'american');
    makeCar('chevy', 'american');
  }
  produceCars();
})();
