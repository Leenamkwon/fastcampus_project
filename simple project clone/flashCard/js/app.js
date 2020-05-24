// event listeners
function eventListeners() {
  const showBtn = document.getElementById('show-btn');
  const questionCard = document.querySelector('.question-card');
  const closeBtn = document.querySelector('.close-btn');
  const form = document.getElementById('question-form');
  const feedback = document.querySelector('.feedback');
  const questionInput = document.getElementById('question-input');
  const answerInput = document.getElementById('answer-input');
  const questionList = document.getElementById('questions-list');
  let data = [];
  let id = 1;

  const ui = new UI();
  // show question form
  showBtn.addEventListener('click', () => {
    ui.showQuestion(questionCard);
  });

  // hide question form
  closeBtn.addEventListener('click', () => {
    ui.hideQuestion(questionCard);
  });

  // add question
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const questionValue = questionInput.value;
    const answerValue = answerInput.value;

    if (questionValue === '' || answerValue === '') {
      feedback.classList.add('showItem', 'alert-danger');
      feedback.textContent = 'cannot add empty value';

      setTimeout(() => {
        feedback.classList.remove('showItem', 'alert-danger');
      }, 2000);
    } else {
      const question = new Question(id, questionValue, answerValue);
      data.push(question);
      id += 1;
      ui.addQuestion(question, questionList);
      ui.clearFields(questionInput, answerInput);
    }
  });
  // work width a question
  questionList.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.classList.contains('delete-flashcard')) {
      questionList.removeChild(
        'e.target.parentElement.parentElement.parentElement'
      );
    } else if (e.target.classList.contains('show-answer')) {
      e.target.nextElementSibling.classList.toggle('show');
    } else if (e.target.classList.contains('edit-flashcard')) {
    }
  });
}

// UI constructor
function UI() {}

// show question card
UI.prototype.showQuestion = function (element) {
  element.classList.add('showItem');
};

// hide question card
UI.prototype.hideQuestion = function (element) {
  element.classList.remove('showItem');
};

// clear Fiedls
UI.prototype.clearFields = function (question, answer) {
  question.value = '';
  answer.value = '';
};

// add question
UI.prototype.addQuestion = function (element, question) {
  const div = document.createElement('div');
  div.classList.add('col-md-4');
  div.innerHTML = `
  <div class="card card-body flashcard my-3">
  <h4 class="text-capitalize">${question.title}</h4>
  <a href="#" class="text-capitalize my-3 show-answer"
    >show/hide answer</a
  >
  <h5 class="answer mb-3">${question.answer}</h5>
  <div class="flashcard-btn d-flex justify-content-between">
    <a
      href="#"
      id="edit-flashcard"
      class="btn my-1 edit-flashcard text-uppercase"
      data-id="${question.id}"
      >edit</a
    >
    <a
      href="#"
      id="delete-flashcard"
      class="btn my-1 delete-flashcard text-uppercase"
      >delete</a
    >
  </div>
</div>
</div>
  `;
  element.appendChild(div);
};

// question constructor
function Question(id, title, answer) {
  this.id = id;
  this.title = title;
  this.answer = answer;
}

// dom event listener
document.addEventListener('DOMContentLoaded', function () {
  eventListeners();
});
