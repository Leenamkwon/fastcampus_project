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
    } catch (error) {}
  }
}

// display products
class UI {
  displayDOM(data) {
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

  getBagButtons() {
    const buttons = [...document.querySelectorAll('.bag-btn')];
    buttonsDOM = [...buttons];
    buttons.forEach((button) => {
      let id = button.dataset.id;

      let inCart = cart.find((item) => item.id === id);
      if (inCart) {
        button.innerText = 'In Cart';
        button.disabled = true;
      }

      button.addEventListener('click', (e) => {
        e.target.innerText = 'In Cart';
        e.target.disabled = true;

        // get product from products
        let products = Storage.getProducts(id);

        let cartTemp = { ...products, amount: 1 };

        // add product to the cart
        cart = [...cart, cartTemp];

        // local store
        Storage.saveCart(cart);

        // set values
        this.setCartValues(cart);

        // add cart item
        this.addCart(cartTemp);

        // show the cart
        this.showCart();
      });
    });
  }

  setCartValues(cart) {
    let TempTotal = 0;
    let TempCart = 0;
    cart.forEach((item) => {
      TempTotal += item.price * item.amount;
      TempCart += item.amount;
    });
    cartTotal.innerText = TempTotal;
    cartItems.innerText = TempCart;
  }

  addCart(item) {
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
            <img src=${item.image} alt="product" />
            <div>
              <h4>${item.title}</h4>
              <h5>$${item.price}</h5>
              <span class="remove-item" data-id="${item.id}">remove</span>
            </div>
            <div>
              <i class="fas fa-chevron-up" data-id="${item.id}"></i>
              <p class="item-amount">1</p>
              <i class="fas fa-chevron-down" data-id="${item.id}"></i>
            </div>`;
    cartContent.appendChild(div);
  }

  showCart() {
    cartOverlay.classList.add('transparentBcg');
    cartDOM.classList.add('showCart');
  }

  hideCart() {
    cartOverlay.classList.remove('transparentBcg');
    cartDOM.classList.remove('showCart');
  }

  setupAPP() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
    cartBtn.addEventListener('click', this.showCart);
    closeCartBtn.addEventListener('click', this.hideCart);
  }

  populateCart(cart) {
    cart.forEach((item) => this.addCart(item));
  }

  cartLogic() {
    clearCartBtn.addEventListener('click', () => {
      this.clearCart();
    });

    cartContent.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-item')) {
        let removeItem = e.target.dataset.id;
        cart = cart.filter((item) => item.id !== removeItem);
        this.setCartValues(cart);
        const parent = e.target.parentElement.parentElement;
        cartContent.removeChild(parent);
      } else if (e.target.classList.contains('fa-chevron-up')) {
        const itemAmount = document.querySelector('.item-amount');
        let upItem = e.target.dataset.id;
        cart = cart.map((item) => {
          if (item.id === upItem) {
            item.amount++;
            itemAmount.innerText = item.amount;
          }
          return item;
        });
        Storage.saveCart(cart);
        this.setCartValues(cart);
      } else if (e.target.classList.contains('fa-chevron-down')) {
        const itemAmount = document.querySelector('.item-amount');
        let downItem = e.target.dataset.id;
        cart = cart.map((item) => {
          if (item.id === downItem) {
            if (item.amount <= 0) {
              item.amount = 0;
              itemAmount.innerText = 0;
              alert('0보다 작을 수 없습니다.');
            } else {
              item.amount--;
              itemAmount.innerText = item.amount;
            }
          }
          return item;
        });
        Storage.saveCart(cart);
        this.setCartValues(cart);
      }
    });
  }

  clearCart() {
    let cartItems = cart.map((item) => item.id);
    cartItems.forEach((id) => this.removeItem(id));
    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
    }
  }

  removeItem(id) {
    cart = cart.filter((item) => item.id !== id);
    Storage.saveCart(cart);
    this.setCartValues(cart);
    const buttons = this.getSingleButton(id);
    buttons.disabled = false;
    buttons.innerHTML = `<i class="fas fa-shopping-cart"></i>add to cart`;
  }

  getSingleButton(id) {
    return buttonsDOM.find((button) => button.dataset.id === id);
  }
}

class Storage {
  static saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
  }

  static getProducts(id) {
    let products = JSON.parse(localStorage.getItem('products'));
    return (products = products.find((item) => item.id === id));
  }

  static saveCart(data) {
    localStorage.setItem('cart', JSON.stringify(data));
  }

  static getCart() {
    return JSON.parse(localStorage.getItem('cart'))
      ? JSON.parse(localStorage.getItem('cart'))
      : [];
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const products = new Products();
  const ui = new UI();

  ui.setupAPP();

  products
    .getProducts()
    .then((data) => {
      Storage.saveProducts(data);
      ui.displayDOM(data);
    })
    .then(() => {
      ui.getBagButtons();
      ui.cartLogic();
      console.log(buttonsDOM);
    });
});
