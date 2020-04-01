const API_KEY = '9272334326503e63e6cc26603bf630e2';
const COORDS = 'coords'


function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
}

function handleGeoError() {
  console.log('cant access geolocation!!');
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null) {
    askForCoords();
  } else {
    
  }
}

function init() {
  loadCoords();
}

init();