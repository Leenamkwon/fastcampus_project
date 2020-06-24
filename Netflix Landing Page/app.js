const tabItems = document.querySelectorAll('.tab-item');
const tabContentItems = document.querySelectorAll('.tab-content-item');
const border = document.querySelector('.tab-border');

function borderMoving() {
  const width = event.target.parentElement.getBoundingClientRect();
  const parent = event.target.parentElement;
  border.classList.add('trans');

  if (parent.id === 'tab-1') {
    border.style.transform = `translateX(${0}px)`;
  } else if (parent.id === 'tab-2') {
    border.style.transform = `translateX(${width.width + 16}px)`;
  } else if (parent.id === 'tab-3') {
    border.style.transform = `translateX(${width.width * 2 + 32}px)`;
  }
}

function selecItem(self) {
  removeShow();
  // Grab content item dom
  console.log(self.id);

  const tabContentItem = document.querySelector(`#${self.id}-content`);
  tabContentItem.classList.add('show');
}

function removeShow() {
  tabContentItems.forEach((item) => item.classList.remove('show'));
}

tabItems.forEach((tab) => {
  tab.addEventListener('click', function () {
    const self = this;
    borderMoving();
    selecItem(self);
  });
});
