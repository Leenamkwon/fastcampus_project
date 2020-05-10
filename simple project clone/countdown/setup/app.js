const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = deadline.querySelectorAll('.deadline-format h4');

const futureDate = new Date(2020, 5, 10, 14, 30, 0);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
month = months[month];
const date = futureDate.getDate();

const weekday = weekdays[futureDate.getDay()];

giveaway.textContent = `giveaway ends on ${weekday} ${date} ${month} ${year} ${hours} : ${minutes}am`;

const futureTime = futureDate.getTime();

function getRemainingTime() {
  const now = new Date().getTime();
  const t = futureTime - now;

  const oneDay = 24 * 60 * 60 * 1000;
  const oneHours = 60 * 60 * 1000;
  const oneMinutes = 60 * 1000;

  let days = Math.floor(t / oneDay);
  let hours = Math.floor((t % oneDay) / oneHours);
  let minutes = Math.floor((t % oneHours) / oneMinutes);
  let seconds = Math.floor((t % oneMinutes) / 1000);

  const values = [days, hours, minutes, seconds];

  function format(item) {
    if (item < 10) return `0${item}`;
    return item;
  }

  items.forEach((item, index) => {
    item.innerHTML = format(values[index]);
  });

  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired</h4>`;
  }
}

let countdown = setInterval(() => {
  getRemainingTime();
}, 1000);
