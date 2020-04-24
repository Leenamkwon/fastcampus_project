const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('moive');

const ticketPrice = +movieSelect.value;

// Update total and count
function updateSelectedCount() {}

container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    console.log(e.target);
    e.target.classList.toggle('selected');

    //Count 기능
    updateSelectedCount();
  }
});
