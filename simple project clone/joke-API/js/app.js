const mainBtn = document.getElementById('mainBtn');
const result = document.getElementById('result');
const imgContainer = document.getElementById('img');

mainBtn.addEventListener('click', () => {
  const ajax = new XMLHttpRequest();

  ajax.open('GET', 'https://api.chucknorris.io/jokes/random');

  ajax.onerror = function () {
    console.log('error');
  };

  ajax.onload = function () {
    if (this.status === 200) {
      const data = JSON.parse(this.responseText);
      const { icon_url: img, value: joke } = data;

      result.textContent = joke;
      imgContainer.src = img;
    }
  };
});

// https://api.chucknorris.io/jokes/random
