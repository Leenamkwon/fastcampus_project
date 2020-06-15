// variables
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productDOM = document.querySelector('.products-center');

// cart
let cart = [];
// buttons
let buttonsDOM = [];

// getting the products
class Products {
  async getProducts() {
    try {
      const result = await fetch('products.json');
      const json = await result.json();
      let products = await json.items;

      products = products.map((item) => {
        const { url: image } = item.fields.image.fields.file;
        const { price, title } = item.fields;
        const { id } = item.sys;
        return { id, title, price, image };
      });

      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

// display product
class UI {
  displayItem(data) {
    productDOM.innerHTML = '';
    let result = '';
    data.forEach((item) => {
      result += `
         <article class="product">
          <div class="img-container">
            <img
              src=${item.image}
              alt="product"
              class="product-img"
            />
            <button class="bag-btn" data-id=${item.id}>
              <i class="fas fa-shopping-cart"></i>
              add to bag
            </button>
          </div>
          <h3>${item.title}</h3>
          <h4>$${item.price}</h4>
        </article>
      `;
    });
    productDOM.innerHTML = result;
  }

  getBagbuttons() {
    const btn = [...document.querySelectorAll('.bag-btn')];
    buttonsDOM = btn;
  }
}

// local Storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
  }

  static getProducts() {
    JSON.parse(localStorage.setItem('products', products));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const products = new Products();
  products
    .getProducts()
    .then((products) => {
      ui.displayItem(products);
      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getBagbuttons();
    });
});
