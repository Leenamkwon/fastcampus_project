const body = document.querySelector('body');

const IMG_NUMBER = 3;

function paintImage(num) {
  const image = new Image();
  image.src = `/images/${num + 1}.jpg`;
  body.appendChild(image);
  image.classList.add('bgImage');
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}
init();