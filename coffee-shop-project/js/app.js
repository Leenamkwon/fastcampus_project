// A base class is defined using the new reserved 'class' keyword

// window event list

function UI() {}

UI.prototype.hidePreloader = function () {
  setInterval(() => {
    document.querySelector('.preloader').style.display = 'none';
  }, 1000);
};

const ui = new UI();

function eventListeners() {
  window.addEventListener('load', () => {
    ui.hidePreloader();
  });
  document.querySelector('.navBtn').addEventListener('click', () => {
    document.querySelector('.nav').classList.toggle('nav--show');
  });
}

eventListeners();
