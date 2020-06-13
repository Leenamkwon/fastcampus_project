// variables

const carBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-car');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const carContent = document.querySelector('.cart-content');
const productDOM = document.querySelector('.products-center');

let cart = [];
let buttonsDOM = [];

// getting the products
class Products {
  async getProducts() {
    try {
      let result = await fetch('products.json');
      let data = await result.json();
      let products = data.items;

      products = products.map((item) => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { title, price, id, image };
      });

      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

// display products
class UI {
  displayProducts(products) {
    let result = '';
    products.forEach((item) => {
      result += `
        <article class="product">
          <div class="img-container">
            <img
              src="${item.image}"
              alt="${item.image}"
              class="product-img"
            />
            <button class="bag-btn" data-id="${item.id}">
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

  getBagButtons() {
    const btns = [...document.querySelectorAll('.bag-btn')];
    buttonsDOM = btns;

    btns.forEach((btn) => {
      let id = btn.dataset.id;
      let inCart = cart.find((item) => item.id === id);

      if (inCart) {
        btn.innerText = 'In Cart';
        btn.disabled = true;
      }

      btn.addEventListener('click', (e) => {
        e.target.innerText = 'In Cart';
        e.target.disabled = true;
        e.target.style.cursor = 'default';

        // get product from products
        let cartItem = { ...Storage.getProduct(id), amount: 1 };

        // add product to the cart
        cart = [...cart, cartItem];

        // save cart in local storage
        Storage.saveCart(cart);

        // set cart values
      });
    });
  }
}

// local storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
  }

  // find 배열반환 x 값을 반환 o
  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem('products'));
    return products.find((product) => product.id === id);
  }

  static saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const products = new Products();

  products
    .getProducts()
    .then((data) => {
      ui.displayProducts(data);
      Storage.saveProducts(data);
    })
    .then(() => {
      ui.getBagButtons();
    });
});
