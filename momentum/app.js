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

  console.log(hour);

  // Set AM or PM
  const amPm = hour >= 12 ? 'PM' : 'AM';

  // 12hr Format
  hour = hour % 12 || 12;

  // Output Time
  time.innerHTML = `${hour}<small>${amPm}</small><span>:</span>${numberFormat(
    min
  )}<span>:</span>${numberFormat(sec)}`;

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

showTime();
