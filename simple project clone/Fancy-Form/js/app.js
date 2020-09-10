// Questions Array
const questions = [
  { questions: 'Enter Your First Name' },
  { questions: 'Enter Your Last Name' },
  {
    questions: 'Enter Your Email',
    pattern: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  },
  { questions: 'Create A Password', type: 'password' },
];

// Transition Times
const shakeTime = 100;

const switchTime = 200;

// Init Position At First question
let position = 0;

// Init DOM Elements
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');

// Get question on DOM Load
document.addEventListener('DOMContentLoaded', getQuestion);

// Next btn click
nextBtn.addEventListener('click', validate);

inputField.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    validate();
  }
  return;
});

function getQuestion() {
  inputLabel.innerHTML = questions[position].questions;

  inputField.type = questions[position].type || 'text';

  inputField.value = '';

  // Focus On Element
  inputField.focus();

  // Set progress bar width
  progress.style.width = `${(position / questions.length) * 100}%`;

  prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

  showQuestion();

  console.log(position);
}

function showQuestion() {
  inputGroup.style.opacity = 1;
  inputProgress.style.width = '100%';
}

// Hide Question From User
function hideQuestion() {
  inputGroup.style.opacity = 0;
  inputProgress.style.width = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.transition = 'none';
  inputGroup.style.border = null;
}

// TransForm to Create shake Motion
function transform(x, y) {
  formBox.style.transform = `translate(${x}px, ${y}px)`;
}

function validate() {
  if (!inputField.value.match(questions[position].pattern || /.+/)) {
    fail();
  } else {
    pass();
  }
}
// 0 : -20
// 1 : 20
// 2 : -20
// 1 : 20

function fail() {
  formBox.className = 'error';
  // Repeat Shake Motion - Set i to number of shakes
  for (let i = 0; i < 6; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    setTimeout(transform, shakeTime * 6, 0, 0);
    inputField.focus();
  }
}

function pass() {
  formBox.className = '';
  setTimeout(transform, shakeTime * 0, 0, 10);
  setTimeout(transform, shakeTime, 0, 0);

  questions[position] ? (questions[position].answer = inputField.value) : '';

  // position inc
  position === questions.length - 1 ? (position = 0) : position++;

  if (questions[position]) {
    hideQuestion();
    getQuestion();
  } else {
    hideQuestion();
    formBox.className = 'close';
    progress.style.width = '100%';

    // Form complete
    formComplete();
  }
}

function formComplete() {
  const h1 = document.createElement('h1');
  h1.innerText = `hello ${questions[0].answer}! welcome my website`;
  h1.classList.add('end');

  setTimeout(() => {
    document.querySelector('#container').appendChild(h1);
    setTimeout(() => (h1.style.opacity = 1), 100);
  }, 500);
}
