const form = document.querySelector('.js-form'),
      input = form.querySelector('input'),
      greeting = document.querySelector('.js-greetings');
      
const USER_LS = 'currentUser',
      CLASS_CN = 'showing';

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(e) {
  const currentValue = input.value;
  e.preventDefault();
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(CLASS_CN);
  form.addEventListener('submit', handleSubmit);
}
////////////

function paintGreeting(text) {
  form.classList.remove(CLASS_CN);
  greeting.classList.add(CLASS_CN);
  greeting.innerText = `Hello ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);

  if(currentUser === null) {
    askForName();
  }else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}
init();