// Questions Array
const questions = [
  { questions: 'Enter Your First Name', type: 'text' },
  { questions: 'Enter Your Last Name', type: 'text' },
  {
    questions: 'Enter Your Email',
    pattern: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    type: 'email'
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

// EVENTS
document.addEventListener('DOMContentLoaded', getQuestion);

// FN
function getQuestion() {
  // Get current Question
  inputLabel.innerHTML = questions[position].questions;

  // Get current Type
  inputField.type = questions[position].type || 'text';

  // Get current answer
}
