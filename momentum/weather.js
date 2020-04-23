const weather = document.querySelector(".js-weather");

const API_KEY = "9272334326503e63e6cc26603bf630e2";
const COORDS = "coords";

function getWeather(let, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${let}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      const wind = json.wind.speed;
      const main = json.weather[0]["icon"];
      // const weather = json.weather[0].id;
      const country = json.sys.country;
      weather.innerText = `${temperature} @ ${country} ${place} @ 풍속: ${wind} 오늘의 날씨는 ${main}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// 위치 기반 이벤트 핸들링
function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("can't access geolocation!!");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}
init();
