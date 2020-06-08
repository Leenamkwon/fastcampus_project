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

(function () {
  const form = document.getElementById('wheatherForm');
  const cityInput = document.getElementById('cityInput');
  const feedback = document.querySelector('.feedback');

  const city = cityInput.value;
  const ajax = new AjaxWheather();

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (city.length === 0) {
      showFeedback('city value cannot be empty');
    } else {
      ajax.getWheather(city).then((data) => console.log(data));
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
