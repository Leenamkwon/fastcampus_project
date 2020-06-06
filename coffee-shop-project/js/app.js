function UI() {
  this.customerList = document.querySelector('.drink-card__list');
}

UI.prototype.hidePreloader = function () {
  document.querySelector('.preloader').style.display = 'none';
};

UI.prototype.showMenu = function () {
  document.querySelector('.nav').classList.toggle('nav--show');
};

UI.prototype.controlVideo = function () {
  let btn = document.querySelector('.video__switch-btn');
  const videoEl = document.querySelector('.video__item');

  if (btn.classList.contains('btnSlide')) {
    btn.classList.remove('btnSlide');
    videoEl.play();
  } else {
    btn.classList.add('btnSlide');
    videoEl.pause();
  }
};

UI.prototype.checkEmpty = function (name, lastName, email) {
  let result;
  if (name === '' || lastName === '' || email === '') {
    result = false;
  } else {
    result = true;
  }
  return result;
};

UI.prototype.showFeedback = function (text, action) {
  let feedback = document.querySelector('.drink-form__feedback');
  if (action === 'success') {
    feedback.classList.add('success');
    feedback.innerText = text;
    this.removeAlert('success');
  } else if (action === 'error') {
    feedback.classList.add('error');
    feedback.innerText = text;
    this.removeAlert('error');
  }
};

UI.prototype.removeAlert = function (type) {
  setTimeout(() => {
    document.querySelector('.drink-form__feedback').classList.remove(type);
  }, 1300);
};

UI.prototype.addCustomer = function (customerData) {
  const images = [1, 2, 3, 4, 5];
  const random = Math.floor(Math.random() * images.length);
  const { name, lastName, email } = customerData;
  const div = document.createElement('div');
  div.classList.add('person');

  div.innerHTML = `
  <div class="person">
  <img
    src="img/person-${random}.jpeg"
    alt="person"
    class="person_thumbnail"
  />
  <h4 class="person__name">${name}</h4>
  <h4 class="person__last-name">${lastName}</h4>
  <p>${email}</p>
</div>
  `;
  this.customerList.appendChild(div);
};

UI.prototype.clearFiedls = function () {
  document.querySelector('.input-name').value = '';
  document.querySelector('.input-lastname').value = '';
  document.querySelector('.input-email').value = '';
};

UI.prototype.showModal = function (e) {
  if (e.currentTarget.classList.contains('work-item__icon')) {
    const modal = document.querySelector('.work-modal');
    const modalItem = document.querySelector('.work-modal__item');
    const src = e.currentTarget.previousElementSibling.src;
    modal.classList.add('work-modal--show');
    modalItem.style.backgroundImage = `url(${src})`;
  }
};

UI.prototype.closeModal = function () {
  const modal = document.querySelector('.work-modal');
  modal.classList.remove('work-modal--show');
};

function eventListeners() {
  const ui = new UI();
  window.addEventListener('load', () => {
    ui.hidePreloader();
  });

  // nav btn
  document.querySelector('.navBtn').addEventListener('click', () => {
    ui.showMenu();
  });

  document.querySelector('.video__switch').addEventListener('click', () => {
    ui.controlVideo();
  });

  document.querySelector('.drink-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('.input-name').value;
    const lastName = document.querySelector('.input-lastname').value;
    const email = document.querySelector('.input-email').value;
    let customerData = { name, lastName, email };
    let value = ui.checkEmpty(name, lastName, email);

    if (!value) {
      ui.showFeedback('값이 비었습니다', 'error');
    } else {
      ui.showFeedback('성공적!', 'error');
      ui.addCustomer(customerData);
      ui.clearFiedls();
    }
  });

  const links = document.querySelectorAll('.work-item__icon');
  links.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      ui.showModal(e);
    });
  });

  document
    .querySelector('.work-modal__close')
    .addEventListener('click', ui.closeModal);
}
eventListeners();
