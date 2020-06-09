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
    this.cityName = document.querySelector('.cityName');
    this.cityCountry = document.querySelector('.cityCountry');
    this.cityIcon = document.querySelector('.cityIcon');
    this.cityTemp = document.querySelector('.cityTemp');
    this.cityHumidity = document.querySelector('.cityHumidity');
  }

  showWeather(data) {
    const {
      name,
      sys: { country },
      main: { temp, humidity }
    } = data;
    const { icon } = data.weather[0];

    this.result.classList.add('showItem');
    this.cityCountry.textContent = country;
    this.cityName.textContent = name;
    this.cityTemp.textContent = temp;
    this.cityHumidity.textContent = humidity;
    this.cityIcon.src = `http://openweathermap.org/img/w/${icon}.png`;
  }
}

(function () {
  const form = document.getElementById('wheatherForm');
  const cityInput = document.getElementById('cityInput');
  const feedback = document.querySelector('.feedback');

  const city = cityInput.value;
  const ajax = new AjaxWheather();
  const display = new Display();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (city.length === 0) {
      showFeedback('city value cannot be empty');
    } else {
      ajax.getWheather(city).then((data) => display.showWeather(data));
    }
  });

  function showFeedback(text) {
    feedback.classList.add('showItem');
    feedback.innerHTML = `<p>${text}</p>`;

    setTimeout(() => {
      feedback.classList.remove('showItem');
    }, 2000);
  }
})();
