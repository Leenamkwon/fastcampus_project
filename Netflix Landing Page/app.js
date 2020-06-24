const tabs = document.querySelectorAll('.tab-item');
const border = document.querySelector('.tab-border');

let index = 0;

function borderMoving() {
  const width = event.target.parentElement.getBoundingClientRect();
  const parent = event.target.parentElement;
  border.style.width = `${width}px`;
  border.classList.add('trans');

  if (parent.id === 'tab-2') {
    border.style.transform = `translateX(${width.width + 16}px)`;
  } else if (parent.id === 'tab-3') {
    border.style.transform = `translateX(${width.width * 2 + 32}px)`;
  } else if (parent.id === 'tab-1') {
    border.style.transform = `translateX(${0}px)`;
  }
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    borderMoving();
  });
});

document.addEventListener('resize', () => {
  const width = event.target.parentElement.getBoundingClientRect();
  border.style.width = `${width}px`;
});
