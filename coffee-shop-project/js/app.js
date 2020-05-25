// A base class is defined using the new reserved 'class' keyword

// window event list

function UI() {}

// show preloader
UI.prototype.hidePreloader = function () {
  setInterval(() => {
    document.querySelector('.preloader').style.display = 'none';
  }, 500);
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

UI.prototype.checkEmpty = function (name, lastname, email) {
  let result;

  if (name === '' || lastname === '' || email === '') {
    result = false;
  } else {
    result = true;
  }
  return result;
};

UI.prototype.showFeedback = function (text, type) {
  let feedback = document.querySelector('.drink-form__feedback');

  if (type === 'success') {
    feedback.classList.add('success');
    feedback.innerText = text;
    this.removeAlert('success');
  } else if (type === 'error') {
    feedback.classList.add('error');
    feedback.innerText = text;
    this.removeAlert('error');
  }
};

UI.prototype.removeAlert = function (type) {
  setTimeout(() => {
    document.querySelector('.drink-form__feedback').classList.remove(type);
  }, 3000);
};

UI.prototype.addCustomer = function (Customer) {
  const images = [1, 2, 3, 4, 5];
  let random = Math.floor(Math.random() * images.length);
  const div = document.createElement('div');
  div.classList.add('person');
  div.innerHTML = `
  <img
                src="img/person-${random}.jpeg"
                alt="person${random}"
                class="person_thumbnail"
              />
              <h4 class="person__name">${Customer.name}</h4>
              <h4 class="person__last-name">${Customer.lastname}</h4>
  `;
  document.querySelector('.drink-card__list').appendChild(div);

  this.clearFiedls();
};

UI.prototype.clearFiedls = function () {
  document.querySelector('.input-name').value = '';
  document.querySelector('.input-lastname').value = '';
  document.querySelector('.input-email').value = '';
};

UI.prototype.showModal = function (e) {
  let id = e.target.parentElement.dataset.id;
  if (e.target.parentElement.classList.contains('work-item__icon')) {
    const modal = document.querySelector('.work-modal');
    const modalItem = document.querySelector('.work-modal__item');
    const modalClose = document.querySelector('.work-modal__close');
    modal.classList.add('work-modal--show');
    modalItem.style.backgroundImage = `url('./img/work-${id}.jpeg')`;

    modalClose.addEventListener('click', () => {
      modal.classList.remove('work-modal--show');
    });
    modal.addEventListener('click', () => {
      modal.classList.remove('work-modal--show');
    });
  }
};

function Customer(name, lastname, email) {
  this.name = name;
  this.lastname = lastname;
  this.email = email;
}

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

  // submit the form
  document.querySelector('.drink-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.querySelector('.input-name').value;
    const lastName = document.querySelector('.input-lastname').value;
    const email = document.querySelector('.input-email').value;

    let value = ui.checkEmpty(name, lastName, email);

    if (value) {
      let display = new Customer(name, lastName, email);
      ui.addCustomer(display);
      ui.showFeedback('good job', 'success');
    } else {
      ui.showFeedback('some form values empty', 'error');
    }
  });

  const links = document.querySelectorAll('.work-item');

  links.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      ui.showModal(e);
    });
  });
}

eventListeners();
