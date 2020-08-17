const slideContainer = document.querySelector('.container');
const slide = document.querySelector('.slide-container');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const nav = document.querySelectorAll('.index__navigation');

let index = 1;
let slides = document.querySelectorAll('.slide'); // 4개
let autoMoving = null;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
firstClone.id = 'first';
lastClone.id = 'last';

slide.append(firstClone);
slide.prepend(lastClone);

const slideWidth = slides[index].getBoundingClientRect().width;

slide.style.transform = `translateX(${-slideWidth * index}px)`;

const startSlide = () => {
  autoMoving = setInterval(moveToNextSlide, 5000);
};

const moveToNextSlide = () => {
  slides = document.querySelectorAll('.slide');
  if (index >= slides.length - 1) return;

  index++;
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
  slide.style.transition = `.7s ease`;
};

const moveToPrevSlide = () => {
  slides = document.querySelectorAll('.slide');
  if (index <= 0) return;

  index--;
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
  slide.style.transition = `.7s ease`;
};

const resetSlide = () => {
  if (index === slides.length - 1) {
    index = 1;
    slide.style.transition = 'none';
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
    // startSlide();
  }

  if (index === 0) {
    index = slides.length - 2;
    slide.style.transition = 'none';
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
    // startSlide();
  }
};

const debounce = (fn, delay = 300) => {
  let timeOut;
  return (args) => {
    if (timeOut) {
      clearInterval(timeOut);
    }
    timeOut = setTimeout(() => {
      fn(args);
      clearInterval(autoMoving);
      setTimeout(() => {
        console.log('start');
        startSlide();
        return;
      }, 2000);
    }, delay);
  };
};

const clickIndexMove = (e) => {
  slides = document.querySelectorAll('.slide');
  if (e.target.dataset.index) {
    index = e.target.dataset.index;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
    slide.style.transition = `.7s ease`;
  }
};

slide.addEventListener('transitionend', resetSlide);
document.addEventListener('DOMContentLoaded', startSlide);
// slideContainer.addEventListener('mouseenter', () => clearInterval(autoMoving));
// slideContainer.addEventListener('mouseout', startSlide);
nextBtn.addEventListener('click', debounce(moveToNextSlide));
prevBtn.addEventListener('click', debounce(moveToPrevSlide));
[...nav].forEach((li) =>
  li.addEventListener('click', debounce(clickIndexMove))
);
