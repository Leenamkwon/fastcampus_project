// DOM Elements
const time = document.getElementById('time'),
  greeting = document.getElementById('greeting'),
  name = document.getElementById('name'),
  focus = document.getElementById('focus');

// show time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Set AM or PM
  const amPm = hour >= 12 ? 'PM' : 'AM';

  // 12hr Format
  hour = hour % 12 || 12;

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${numberFormat(
    min
  )}<span>:</span>${numberFormat(sec)} ${amPm}`;

  setBgGreet();
  setTimeout(showTime, 1000);
}

function numberFormat(num) {
  return num < 10 ? `0${num}` : num;
}

function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 12) {
    // moring
    document.body.style.backgroundImage = `url('./images/1.jpg')`;
    document.body.style.color = '#fff';
    greeting.textContent = 'Good Morining';
  } else if (hour < 18) {
    // afternoon
    document.body.style.backgroundImage = `url('./images/2.jpg')`;
    greeting.textContent = 'Good Afternoon';
  } else {
    // evening
    document.body.style.backgroundImage = `url('./images/3.jpg')`;
    greeting.textContent = 'Good Evening';
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.keyCode === 13 || e.witch === 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.keyCode === 13 || e.witch === 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

showTime();
getName();
getFocus();
