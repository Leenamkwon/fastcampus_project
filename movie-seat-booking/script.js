const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;
populateUI();

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', JSON.stringify(movieIndex));
  localStorage.setItem('selectedMoviePrice', JSON.stringify(moviePrice));
}

// update total and count
function updateSelectedCount() {
  const slectedSeats = document.querySelectorAll('.seat.selected');

  const seatsIndex = [...slectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  count.innerText = slectedSeats.length;
  total.innerText = slectedSeats.length * ticketPrice;
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) seat.classList.add('selected');
    });
  }

  const selectedMovieIndex = JSON.parse(
    localStorage.getItem('selectedMovieIndex')
  );
  const selectedMoviePrice = JSON.parse(
    localStorage.getItem('selectedMoviePrice')
  );

  if (selectedMovieIndex !== null && selectedMoviePrice !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
    ticketPrice = parseFloat(selectedMoviePrice);
  }

  updateSelectedCount();
}

// Movie select event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});
