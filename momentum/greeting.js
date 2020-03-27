const form = document.querySelector('.js-form'),
      input = form.querySelector('input'),
      greeting = document.querySelector('.js-greeting');
   
const USER_LS = "currentUser",
      SHOWING_CN = 'showing';

function setName(text) {
    localStorage.setItem(USER_LS, text);
}

function handlesubmit(e) {
  e.preventDefault();
  const inputValue = document.querySelector('input').value;
  paintGreeting(inputValue);
  setName(inputValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener('submit', handlesubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  form.style.display = "none";
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
}

function loadName(){
  const currentUser = localStorage.getItem(USER_LS);
  if(currentUser === null){
    askForName();
  }else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}
init();