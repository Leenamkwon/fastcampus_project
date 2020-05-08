// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

const date = document.getElementById('date');
date.textContent = new Date().getFullYear();

const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');

// 동적으로 높이 계산하기
navToggle.addEventListener('click', () => {
  // linksContainer.classList.toggle('show-links');
  const containerHeight = linksContainer.getBoundingClientRect().height;
  const linksHeight = links.getBoundingClientRect().height;

  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
});

const navbar = document.querySelector('nav');
const topLink = document.querySelector('.top-link');

// 네비게이션 고정시키기
window.addEventListener('scroll', () => {
  const offsetY = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;
  if (offsetY > navHeight) {
    navbar.classList.add('fixed-nav');
  } else {
    navbar.classList.remove('fixed-nav');
  }

  if (offsetY > 500) {
    topLink.classList.add('show-link');
  } else {
    topLink.classList.remove('show-link');
  }

  // css의 프로퍼티인 scroll-behavior: smooth; 떄문에 자연스럽게 올라가는 것임
});

// 스크롤 정확하게 상단에 이동하기
const scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const id = e.target.getAttribute('href').slice(1);
    const sectionEl = document.getElementById(id);
    // calculate the heights
    const navHeight = navbar.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains('fixed-nav');

    let position = sectionEl.offsetTop - navHeight;

    if (!fixedNav) {
      position = position - navHeight;
    }

    window.scrollTo({
      left: 0,
      top: position
    });
    linksContainer.style.height = 0;
  });
});
