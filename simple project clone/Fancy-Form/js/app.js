// Questions Array
const questions = [
  { questions: 'Enter Your First Name', type: 'text' },
  { questions: 'Enter Your Last Name', type: 'text' },
  {
    questions: 'Enter Your Email',
    pattern: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  },
  { questions: 'Create A Password', type: 'password' }
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

// Get Question On DOM Load
document.addEventListener('DOMContentLoaded', getQuestion);

// Next btn click
nextBtn.addEventListener('click', validate);

inputField.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    validate();
  }
});

// FN
function getQuestion() {
  // Get current Question
  inputLabel.innerHTML = questions[position].questions;

  // Get current Type
  inputField.type = questions[position].type || 'text';

  // Get current answer
  inputField.value = questions[position].answer || '';

  inputField.focus();

  // Set progress Bar width
  progress.style.width = `${(position / questions.length) * 100}%`;

  // Add user icon or back arrow
  prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

  showQuestion();
}

// Display Question To User
function showQuestion() {
  inputGroup.style.opacity = 1;
  inputProgress.style.transition = `all .7s ease`;
  inputProgress.style.width = '100%';
}

// Hide
function hideQuestion() {
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = 'none';
  inputGroup.style.border = null;
}

// Transform to create shake motion
function transform(x, y) {
  formBox.style.transform = `translate(${x}px, ${y}px)`;
}

// Validate Field
function validate() {
  // Make sure pattern Matches
  if (!inputField.value.match(questions[position].pattern || /.+/)) {
    inputFail();
  } else {
    inputPass();
  }
}

// Field Input Fail
function inputFail() {
  formBox.className = 'error';
  // Repeat Shake Motion - Set i to number of shakes
  for (let i = 0; i < 6; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    setTimeout(transform, shakeTime * 6, 0, 0);
    inputField.focus();
  }
}

// Field Input Pass
function inputPass() {
  formBox.className = '';
  setTimeout(transform, shakeTime * 0, 0, 10);
  setTimeout(transform, shakeTime * 1, 0, 0);

  questions[position].answer = inputField.value;

  // Increment Position
  position++;

  // If New Question, Hide Current and Get Next
  if (questions[position]) {
    hideQuestion();
    setTimeout(getQuestion, 50);
  } else {
    // Remove If no more questions
    formBox.className = 'close';
    progress.style.width = '100%';

    // Form Complete
    formComplete();
  }
}

// All Fields Complete - Show h1 end
function formComplete() {
  const h1 = document.createElement('h1');
  h1.classList.add('end');
  h1.appendChild(
    document.createTextNode(
      `Thx ${questions[0].answer} you are registered and will get an email shortly`
    )
  );

  setTimeout(() => {
    formBox.parentElement.appendChild(h1);

    setTimeout(() => (h1.style.opacity = 1), 50);
  }, 1000);
}
