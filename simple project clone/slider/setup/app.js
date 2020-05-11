const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.nextBtn');
const prevBtn = document.querySelector('.prevBtn');

slides.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`;
});

let counter = 0;

function moving() {
  // working with slides
  if (counter === slides.length) {
    counter = 0;
  }
  if (counter < 0) {
    counter = slides.length - 1;
  }

  slides.forEach((slide) => {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
}

nextBtn.addEventListener('click', () => {
  counter++;
  moving();
});

prevBtn.addEventListener('click', () => {
  counter--;
  moving();
});

const autoSlide = setInterval(() => {
  counter++;
  moving();
}, 2600);
