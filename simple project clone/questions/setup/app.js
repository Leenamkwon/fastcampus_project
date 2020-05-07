//using selectors inside the element

const questions = document.querySelectorAll('.question');

// 여러개의 btn nodeList
function showIngText() {
  questions.forEach((article) => {
    const btn = article.querySelector('.question-btn');

    btn.addEventListener('click', () => {
      questions.forEach((item) => {
        if (article !== item) {
          item.classList.remove('show-text');
        }
      });
      article.classList.toggle('show-text');
    });
  });
}

function init() {
  showIngText();
}

init();
// traversing the dom

// const btns = document.querySelectorAll('.question-btn');

// btns.forEach((btn) => {
//   btn.addEventListener('click', function (e) {
//     const question = e.currentTarget.parentElement.parentElement;
//     question.classList.toggle('show-text');
//   });
// });
