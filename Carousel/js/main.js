const slider = document.querySelector('.slider');
const btns = document.querySelectorAll('.btn');
const slides = document.querySelectorAll('.img');
const backgrounds = document.querySelector('.bg');
const options = document.querySelectorAll('.option');

let index = 1;
let opindex = 0;
let size = slides[index].clientWidth;

update();

function update() {
  slider.style.transform = `translateX(${-size * index}px)`;
  backgroundUpdate();
}

function backgroundUpdate() {
  backgrounds.src = `./img/bg${index}.jpg`;
  backgrounds.classList.add('show');
}

function slide() {
  slider.style.transition = 'transform .5s ease-in-out';
  update();
}

function btnCheck() {
  if (this.id === 'prev') {
    index--;
  } else if (this.id === 'next') {
    index++;
  }
  slide();
}

function optionClick() {
  const target = event.target.dataset.index;
  if (target) {
    index = +target;
    event.target.classList.add('colored');
    slide();
  }
}

function checkIndex() {
  if (slides[index].id === 'last') {
    slider.style.transition = 'none';
    index = 1;
    opindex = 0;
    update();
  } else if (slides[index].id === 'first') {
    slider.style.transition = 'none';
    index = slides.length - 2;
    update();
  }
}

function autoCircleColored() {
  options.forEach((item) => item.classList.remove('colored'));
  options[opindex].classList.add('colored');
  opindex++;
}

slider.addEventListener('transitionend', checkIndex);

btns.forEach((btn) => btn.addEventListener('click', btnCheck));

options.forEach((option) =>
  option.addEventListener('click', () => {
    options.forEach((item) => item.classList.remove('colored'));
    optionClick();
  })
);

setInterval(() => {
  index += 1;
  slide();
  autoCircleColored();
  slider.addEventListener('transitionend', checkIndex);
}, 10000);
