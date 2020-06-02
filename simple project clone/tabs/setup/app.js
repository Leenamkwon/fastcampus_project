const btns = document.querySelectorAll('.tab-btn');
const about = document.querySelector('.about');
const articles = document.querySelectorAll('.content');

about.addEventListener('click', (e) => {
  const id = e.target.dataset.id;

  if (id) {
    btns.forEach((item) => {
      item.classList.remove('active');
      e.target.classList.add('active');
    });

    articles.forEach((item) => {
      item.classList.remove('active');
      if (id === item.id) {
        item.classList.add('active');
      }
    });

    if (id === 'vision') {
      document.querySelector('body').style.backgroundColor = '#999';
    } else {
      document.querySelector('body').style.backgroundColor = '#222';
    }
  }
});
