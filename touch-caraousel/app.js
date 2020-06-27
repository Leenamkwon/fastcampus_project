const container = document.querySelector('.container');
const slide = document.querySelector('.slider');
const box = document.querySelectorAll('.box');

let width = box[0].offsetWidth + 10;

slide.style.minWidth = `${box.length * width}px`;

let start, change;

container.addEventListener('dragstart', (e) => {
  start = e.clientX;
});

container.addEventListener('dragover', (e) => {
  e.preventDefault();
  let touch = e.clientX;
  change = start - touch;
});

container.addEventListener('dragend', slideShow);

// 핸드폰, 패드
container.addEventListener('touchstart', (e) => {
  console.log(e.touches[0].clientX);
});

container.addEventListener('touchmove', (e) => {
  e.preventDefault();
  let touch = e.touches[0];
  change = start - touch.clientX;
});

container.addEventListener('touchend', slideShow);

function slideShow() {
  if (change > 0) {
    container.scrollLeft += width;
  } else {
    container.scrollLeft -= width;
  }
}
