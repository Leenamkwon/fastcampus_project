const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedCount = selectedSeats.length;
  count.innerText = selectedCount;
  total.innerText = selectedCount * ticketPrice;
}

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const movieIndex = localStorage.getItem('selectedMovieIndex');
  if (movieIndex !== null) {
    movieSelect.selectedIndex = movieIndex;
  }
}

container.addEventListener('click', function (e) {
  if (e.target.classList.contains('seat')) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

movieSelect.addEventListener('change', (e) => {
  e.preventDefault();
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

window.addEventListener('DOMContentLoaded', function () {
  populateUI();
  updateSelectedCount();
});
