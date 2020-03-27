const clockContainer = document.querySelector('.js-clock'),
      clockTitle = document.querySelector('h1');

function getTime() {
  const date = new Date();
  const minute = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  const milliS = date.getMilliseconds();
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minute}:${seconds < 10 ?
  `0${seconds}` : `${seconds}`}`;
}

function init() {
  setInterval(getTime, 1000);
}
init();
