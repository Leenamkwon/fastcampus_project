const slider = document.querySelector('.slider');
const btns = document.querySelectorAll('.btn');
const slides = document.querySelectorAll('.img');
const backgrounds = document.querySelector('.bg');
const options = document.querySelectorAll('.option');

let index = 1;
let opindex = 0;
let size = slides[index].getBoundingClientRect().width;

function update() {
  slider.style.transform = `translateX(${-size * index}px)`;
}

function slide() {
  slider.style.transition = `transform .5s ease-in-out`;
  options.forEach((op) => op.classList.remove('colored'));
  options[opindex].classList.add('colored');
  update();
}

function btnCheck() {
  if (this.id === 'prev') {
    index--;
    opindex--;
    if (opindex === -1) opindex = 4;
  } else if (this.id === 'next') {
    index++;
    opindex++;
    if (opindex === 5) opindex = 0;
  }
  slide();
}

function cricleSlide(e) {
  const target = +e.target.dataset.index;
  if (target) {
    index = target;
    slider.style.transition = `transform .5s ease-in-out`;
    slider.style.transform = `translateX(${-size * index}px)`;
    options.forEach((circle) => circle.classList.remove('colored'));
    e.target.classList.add('colored');
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
  options[opindex].classList.add('colored');
  option.addEventListener('click', (e) => {
    cricleSlide(e);
  });
});
