const slider = document.querySelector('.slider');
const btns = document.querySelectorAll('.btn');
const slides = document.querySelectorAll('.img');
const backgrounds = document.querySelector('.bg');
const options = document.querySelectorAll('.option');

let index = 1;
let opindex = 0;
// let size = slides[index].getBoundingClientRect().width;
update();

window.addEventListener('resize', update);

function update() {
  size = slides[index].getBoundingClientRect().width;
  slider.style.transform = `translateX(${-size * index}px)`;
  options.forEach((op) => op.classList.remove('colored'));
  options[opindex].classList.add('colored');
}

function slide() {
  slider.style.transition = `transform .5s ease-in-out`;
  update();
}

function btnCheck() {
  if (this.id === 'prev') {
    index--;
    opindex--;
    if (opindex === 0) opindex = slider.length - 3;
  } else if (this.id === 'next') {
    index++;
    opindex++;
    if (opindex === options.length) opindex = 0;
  }
  slide();
}

function cricleSlide(e) {
  e.target.classList.add('colored');
  const target = +e.target.dataset.index;
  if (target) {
    index = target;
    slide();
  }
}

slider.addEventListener('transitionend', () => {
  if (slides[index].id === 'last') {
    index = 1;
    slider.style.transition = 'none';
    update();
  } else if (slides[index].id === 'first') {
    index = slides.length - 2;
    slider.style.transition = 'none';
    update();
  }
});

btns.forEach((btn) => btn.addEventListener('click', btnCheck));

options.forEach((option) => {
  option.addEventListener('click', (e) => {
    cricleSlide(e);
  });
});
