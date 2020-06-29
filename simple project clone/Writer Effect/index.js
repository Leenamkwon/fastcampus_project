const TypeWriter = function (txtEl, words, wait = 3000) {
  this.txtEl = txtEl;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

// Type Method
TypeWriter.prototype.type = function () {
  // Current index of word
  const current = this.wordIndex % this.words.length; // 배열인덱스, 배열 길이

  // Get full text of current word
  const fullTxt = this.words[current];

  if (this.isDeleting) {
    this.txt = fullTxt.slice(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.slice(0, this.txt.length + 1);
  }

  this.txtEl.innerHTML = `<span class="txt">${this.txt}</span>`;

  // Type speed
  let typeSpeed = 300;

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  // if word is complete
  if (!this.isDeleting && this.txt === fullTxt) {
    // Make pause at end
    typeSpeed = this.wait;
    // Set delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;

    this.wordIndex++;

    typeSpeed = 1000;
  }

  setTimeout(() => this.type(), typeSpeed);
};
document.addEventListener('DOMContentLoaded', init);

// Init on DOM Load
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // init TypeWriter
  new TypeWriter(txtElement, words, wait);
}
