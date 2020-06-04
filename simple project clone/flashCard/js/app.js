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

  showBtn.addEventListener('click', () => {
    ui.showQuestion(questionCard);
  });
  closeBtn.addEventListener('click', () => {
    ui.hideQuestion(questionCard);
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const questionValue = questionInput.value;
    const answerValue = answerInput.value;

    if (questionValue.trim() === '' || answerValue.trim() === '') {
      ui.feedback('값을 입력하세요', feedback);
    } else {
      const questionData = {
        id: id++,
        question: questionValue,
        answer: answerValue
      };
      data.push(questionData);
      ui.addQuestion(questionData, questionList);
      ui.clearFields(questionInput, answerInput);
      localStorage.setItem('list', JSON.stringify(data));
    }
  });

  questionList.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('delete-flashcard')) {
      // delete
      ui.deleteQuestion(questionList, e.target, data);
    } else if (e.target.classList.contains('edit-flashcard')) {
      // edit
      ui.editQuestion(questionList, e.target, data);
    } else if (e.target.classList.contains('show-answer')) {
      // 정답 공개
      e.target.nextElementSibling.classList.toggle('answer');
    }
  });
}

// ui constructor
function UI() {}

function Question() {}

// show question card
UI.prototype.showQuestion = function (element) {
  element.classList.add('showItem');
};
// hide question card
UI.prototype.hideQuestion = function (element) {
  element.classList.remove('showItem');
};
// show feedback
UI.prototype.feedback = function (text, element) {
  element.classList.add('showItem', 'alert-danger');
  element.textContent = text;
  setTimeout(() => {
    element.classList.remove('showItem', 'alert-danger');
  }, 1300);
};
// clearFiedls
UI.prototype.clearFields = function (question, answer) {
  question.value = '';
  answer.value = '';
};
// add Question
UI.prototype.addQuestion = function (data, container) {
  const { id, question, answer } = data;
  const div = document.createElement('div');
  div.classList.add('col-md-4');
  div.innerHTML = `
  <div class="card card-body flashcard my-3">
  <h4 class="text-capitalize">${question}</h4>
  <a href="#" class="text-capitalize my-3 show-answer"
    >show/hide answer</a
  >
  <h5 class="answer mb-3">${answer}</h5>
  <div class="flashcard-btn d-flex justify-content-between">
    <a
      href="#"
      id="edit-flashcard"
      class="btn my-1 edit-flashcard text-uppercase"
      data-id="${id}"
      >edit</a
    >
    <a
      href="#"
      id="delete-flashcard"
      class="btn my-1 delete-flashcard text-uppercase"
      data-id="${id}"
      >delete</a
    >
  </div>
</div>
</div>
  `;
  container.appendChild(div);
};

UI.prototype.showNhide = function () {
  document.querySelector('.show-answer').classList.toggle('showItem');
};

UI.prototype.deleteQuestion = function (container, target, data) {
  const id = target.dataset.id;
  const parent = target.parentElement.parentElement.parentElement;
  container.removeChild(parent);
  data = data.filter((items) => items.id !== +id);
  localStorage.setItem('list', JSON.stringify(data));
};

UI.prototype.editQuestion = function (container, target, data) {
  const questionCard = document.querySelector('.question-card');
  const feedback = document.querySelector('.feedback');
  const questionInput = document.getElementById('question-input');
  const answerInput = document.getElementById('answer-input');
  const question = container.querySelector('h4');
  const answer = container.querySelector('h5');
  const parent = target.parentElement.parentElement.parentElement;
  const id = target.dataset.id;

  this.showQuestion(questionCard);
  questionInput.value = question.textContent;
  answerInput.value = answer.textContent;

  container.removeChild(parent);
  this.feedback('수정하시면 됩니다', feedback);
  data = data.filter((items) => {
    if (data.id === id) {
      items.question = questionInput.value;
      items.answer = answerInput.value;
    }
    return items;
  });
  localStorage.setItem('list', JSON.stringify(data));
};

document.addEventListener('DOMContentLoaded', () => {
  eventListeners();
  const ui = new UI();
  const local = JSON.parse(localStorage.getItem('list'));
  local.forEach((items) => {
    const questionList = document.getElementById('questions-list');
    ui.addQuestion(items, questionList);
  });
});
