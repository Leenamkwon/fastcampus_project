// variables
const carBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const carContent = document.querySelector('.cart-content');
const productDOM = document.querySelector('.products-center');

let cart = [];
let buttonsDOM = [];

class Product {
  async getProducts() {
    try {
      let result = await fetch('./products.json');
      let data = await result.json();
      let products = data.items;

      products = products.map((item) => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;

        return { title, price, image, id };
      });
      return products;
    } catch (error) {
      console.log('error');
    }
  }
}

class UI {
  displayDOM(products) {
    let result = '';
    products.forEach((product) => {
      result += `
         <article class="product">
          <div class="img-container">
            <img
              src="${product.image}"
              alt="product"
              class="product-img"
            />
            <button class="bag-btn" data-id="${product.id}">
              <i class="fas fa-shopping-cart"></i>
              add to bag
            </button>
          </div>
          <h3>${product.title}</h3>
          <h4>$${product.price}</h4>
        </article>
      `;
    });
    productDOM.innerHTML = result;
  }

  getBagButtons() {
    const btns = [...document.querySelectorAll('.bag-btn')];
    buttonsDOM = btns;

    btns.forEach((button) => {
      let id = button.dataset.id;
      let inCart = cart.find((item) => item.id === id);

      if (inCart) {
        button.innerText = 'In Cart';
        button.disabled = true;
      }

      button.addEventListener('click', (e) => {
        e.target.innerText = 'In Cart';
        e.target.disabled = true;

        // get product from local
        let product = Storage.getProducts();
        product = product.find((item) => item.id === id);

        const productData = { ...product, amount: 1 };
        // add product to the cart
        cart = [...cart, productData];

        // set local storage
        Storage.setCart(cart);

        // dispaly shopping cart DOM
        this.displayCartItem(cart);

        // total
        this.setTotal(cart);

        // show cart
        this.showCart();
      });
    });
  }

  displayCartItem(product) {
    const div = document.createElement('div');
    div.classList.add('cart-item');
    product.forEach((item) => {
      console.log(item);
      div.innerHTML = `
            <img src=${item.image} alt="product" />
            <div>
              <h4>${item.title}</h4>
              <h5>${item.price}</h5>
              <span class="remove-item" data-id=${item.id}>remove</span>
            </div>
            <div>
              <i class="fas fa-chevron-up" data-id=${item.id}></i>
              <p class="item-amount">${item.amount}</p>
              <i class="fas fa-chevron-down" data-id=${item.id}></i>
            </div>
      `;
    });
    carContent.appendChild(div);
  }

  setTotal(cart) {
    let tempTotal = 0;
    let itemTotal = 0;
    cart.forEach((item) => {
      tempTotal += item.price * item.amount;
      itemTotal += item.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemTotal;
  }

  showCart() {
    cartOverlay.classList.add('transparentBcg');
    cartDOM.classList.add('showCart');
  }

  hideCart() {
    cartOverlay.classList.remove('transparentBcg');
    cartDOM.classList.remove('showCart');
  }
}

class Storage {
  static setProducts(data) {
    localStorage.setItem('products', JSON.stringify(data));
  }

  static getProducts() {
    return JSON.parse(localStorage.getItem('products'));
  }

  static setCart(data) {
    localStorage.setItem('cart', JSON.stringify(data));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const product = new Product();

  product
    .getProducts()
    .then((data) => {
      ui.displayDOM(data);
      Storage.setProducts(data);
    })
    .then(() => {
      ui.getBagButtons();
    });

  closeCartBtn.addEventListener('click', ui.hideCart);
  carBtn.addEventListener('click', ui.showCart);
});
