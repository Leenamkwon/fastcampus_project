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
    const buttons = [...document.querySelectorAll('.bag-btn')];
    buttonsDOM = buttons;

    buttons.forEach((button) => {
      const id = button.dataset.id;
      const inCart = cart.find((item) => item.id === id);

      if (inCart) {
        button.innerText = 'In Cart';
        button.disabled = true;
      }

      button.addEventListener('click', (e) => {
        // 장바구니 버튼을 추가됐다고 텍스트를 변경한다.
        e.target.innerText = 'In Cart';
        e.target.disabled = true;

        // 해당 버튼 id와 품목의 id가 같은 지 비교를 한다.
        let products = Storage.getProducts(id);

        // 비교한 값을 얻었으면 카트 node로 display를 해준다. (UI)
        let arr = { ...products, amount: 1 };

        // 같은 항목 끼리 빈 배열에 저장한다. (data module)
        cart = [...cart, arr];

        this.addCartItem(arr);

        // 카트 아이콘의 숫자가 변경된다.
        this.setValueCart(cart);

        // 카트돔에 데이터 ui가 들어갔는지 보여야 한다.
        this.showCart();

        // 카트를 로컬스토리지에 저장한다.
        Storage.saveCart(cart);
      });
    });
  }

  setValueCart(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map((item) => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemsTotal;
  }

  addCartItem(cart) {
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
            <img src=${cart.image} alt="product" />
            <div>
              <h4>${cart.title}</h4>
              <h5>$${cart.price}</h5>
              <span class="remove-item" data-id=${cart.id}>remove</span>
            </div>
            <div>
              <i class="fas fa-chevron-up" data-id=${cart.id}></i>
              <p class="item-amount" data-id=${cart.id}>1</p>
              <i class="fas fa-chevron-down" data-id=${cart.id}></i>
            </div>
      `;
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
    this.setValueCart(cart);
    this.populateCart(cart);
    cartBtn.addEventListener('click', this.showCart);
    closeCartBtn.addEventListener('click', this.hideCart);
  }

  populateCart(cart) {
    cart.forEach((item) => this.addCartItem(item));
  }

  cartLogic() {
    clearCartBtn.addEventListener('click', () => {
      this.clearCart();
    });
    cartContent.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-item')) {
        this.removeSingleItem(e);
      } else if (e.target.classList.contains('fa-chevron-up')) {
        let addAmount = e.target;
        let id = addAmount.dataset.id;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount++;
        Storage.saveCart(cart);
        this.setValueCart(cart);
        addAmount.nextElementSibling.innerText = tempItem.amount;
      } else if ('fa-chevron-down') {
        let addAmount = e.target;
        let id = addAmount.dataset.id;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount++;
        addAmount.nextElementSibling.innerText = tempItem.amount;
        Storage.saveCart(cart);
        this.setValueCart(cart);
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
    cart = cart.filter((cartID) => cartID.id !== id);
    this.setValueCart(cart);
    Storage.saveCart(cart);
    let button = this.getSingleButton(id);
    button.disabled = false;
    button.innerHTML = `<i class="fas fa-shopping-cart"></i>add to cart`;
  }

  getSingleButton(id) {
    return buttonsDOM.find((button) => button.dataset.id === id);
  }

  removeSingleItem(e) {
    cart = cart.filter((cartID) => cartID.id !== e.target.dataset.id);
    this.setValueCart(cart);
    const parent = e.target.parentElement.parentElement;
    cartContent.removeChild(parent);
  }
}

// local Storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
  }

  static getProducts(id) {
    const product = JSON.parse(localStorage.getItem('products'));
    return product.find((item) => item.id === id);
  }

  static saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  static getCart() {
    return localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const products = new Products();

  // setup APP
  ui.setupAPP();

  // get all products
  products
    .getProducts()
    .then((products) => {
      ui.displayItem(products);
      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getBagbuttons();
      ui.cartLogic();
    });
});
