const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
  getPerson(getData);
});

function getPerson(callback) {
  const url = 'https://randomuser.me/api/';
  const ajax = new XMLHttpRequest();

  ajax.open('GET', url);

  ajax.onload = function () {
    const data = JSON.parse(this.responseText);
    if (this.status === 200) {
      callback(data, showData);
    }
  };

  ajax.send();
}

function getData(data, showData) {
  showData(data);
}

function showData(data) {
  const {
    name: { first, last },
    location: { city },
    phone,
    email,
    picture: { large }
  } = data.results[0];
  console.log(data.results[0]);

  const container = document.querySelector('.card-body');
  const img = document.getElementById('photo');
  img.src = large;
  container.innerHTML = `
  <div class="person-info">
  <!-- single input -->
  <p class="text-capitalize"><span class="mr-3 text-primary"><i class="fas fa-user"></i></span>name :<span id="first"
    class="text-uppercase ml-2 badge badge-secondary single-info">${first}</span></p>
  <!-- end of single input -->
  <!-- single input -->
  <p class="text-capitalize"><span class="mr-3 text-primary"><i class="fas fa-user"></i></span>last name :<span id="last"
    class="text-uppercase ml-2 badge badge-secondary single-info">${last}</span></p>
  <!-- end of single input -->
  <!-- single input -->
  <p class="text-capitalize"><span class="mr-3 text-primary"><i class="fas fa-search-location"></i></span>location
   :<span id="street" class="text-uppercase ml-2 badge badge-secondary single-info">s${city}</span></p>
  <!-- end of single input -->
  <!-- single input -->
  <p class="text-capitalize"><span class="mr-3 text-primary"><i class="fas fa-phone"></i></span>phone :<span id="phone"
    class="text-uppercase ml-2 badge badge-secondary single-info">${phone}</span></p>
  <!-- end of single input -->
  <!-- single input -->
  <p class="text-capitalize"><span class="mr-3 text-primary"><i class="fas fa-envelope"></i></span>email :<span id="email"
    class="text-uppercase ml-2 badge badge-secondary single-info">${email}</span></p>
  <!-- end of single input -->
 </div>
  `;
}
