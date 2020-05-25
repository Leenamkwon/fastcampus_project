// A base class is defined using the new reserved 'class' keyword

// window event list

function UI() {}

// show preloader
UI.prototype.hidePreloader = function () {
  setInterval(() => {
    document.querySelector('.preloader').style.display = 'none';
  }, 1000);
};

// show nav
UI.prototype.showNav = function () {
  document.querySelector('.nav').classList.toggle('nav--show');
};

// play , pause video
UI.prototype.videoControl = function () {
  let btn = document.querySelector('.video__switch-btn');
  const video = document.querySelector('.video__item');

  if (!btn.classList.contains('btnSlide')) {
    btn.classList.add('btnSlide');
    video.pause();
  } else {
    btn.classList.remove('btnSlide');
    video.play();
  }
};

const ui = new UI();

function eventListeners() {
  window.addEventListener('load', () => {
    ui.hidePreloader();
  });

  document.querySelector('.navBtn').addEventListener('click', () => {
    ui.showNav();
  });

  document.querySelector('.video__switch').addEventListener('click', () => {
    ui.videoControl();
  });
}

eventListeners();
