const form = document.getElementById('wheatherForm');
const cityInput = document.getElementById('cityInput');
const feedback = document.querySelector('.feedback');

// class
class AjaxWheather {
  constructor() {
    this.apikey = `9272334326503e63e6cc26603bf630e2`;
  }
  async getWheather(city) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apikey}`;
    const wheatherData = await fetch(url);
    const wheather = await wheatherData.json();
    return wheather;
  }
}

class Display {
  constructor() {
    this.result = document.querySelector('.results');
    this.cityName = document.getElementById('cityName');
    this.cityCountry = document.getElementById('cityCountry');
    this.cityIcon = document.getElementById('cityIcon');
    this.cityTemp = document.getElementById('cityTemp');
    this.cityHumidity = document.getElementById('cityHumidity');
  }
  showWheather(data) {
    const {
      name,
      sys: { country },
      main: { temp, humidity }
    } = data;

    const { icon } = data.weather[0];

    this.results.classList.add('showItem');
    this.cityName.textContent = name;
    this.cityCountry.textContent = country;
    this.cityTemp.textContent = temp;
    this.cityHumidity.textContent = humidity;
    this.cityIcon.src = `http://openweathermap.org/img/w/${icon}.png`;
  }
}

const ajax = new AjaxWheather();
const display = new Display();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const cityValue = cityInput.value;

  if (cityValue.trim() === 0) {
    showFeedback('city value cannot be empty');
  } else {
    ajax.getWheather(cityValue).then((data) => display.showWheather(data));
  }
});

function showFeedback(text) {
  feedback.classList.add('showItem');
  feedback.innerHTML = `<p>${text}</p>`;

  setTimeout(() => {
    feedback.classList.remove('showItem');
  }, 1300);
}
