const form = document.querySelector('.js-form'),
      input = document.querySelector('input'),
      greeting = document.querySelector('.js-greeting');
      
const USER_LS = "currentUser",
      SHOWING_LS = "showing";

function paintGreeting(text) {
  form.classList.remove(SHOWING_LS);
  greeting.classList.add(SHOWING_LS);
  greeting.innerText = `Hello ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if(currentUser === null) {
  
  }else {
    paintGreeting(greeting);
  }
}

function init() {
  loadName();
}
init();