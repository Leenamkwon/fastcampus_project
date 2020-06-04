// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// set date
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();

// close links
const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');
const topLinks = document.querySelector('.top-link');
const navBar = document.querySelector('#nav');

navToggle.addEventListener('click', () => {
  const containerHeight = linksContainer.getBoundingClientRect().height;
  const linksHeight = links.getBoundingClientRect().height;

  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
});

// fixed navbar
window.addEventListener('scroll', function () {
  const scrollHeight = window.pageYOffset;
  const navHeight = navBar.getBoundingClientRect().height;

  if (scrollHeight > 500) {
    topLinks.classList.add('show-link');
  } else {
    topLinks.classList.remove('show-link');
  }

  if (scrollHeight > navHeight) {
    navBar.classList.add('fixed-nav');
  } else {
    navBar.classList.remove('fixed-nav');
  }
});

// smooth scroll
const scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach((link) => {
  link.addEventListener('click', function (e) {
    // prevent default
    e.preventDefault();
    // navigate to specific spot
    const id = e.currentTarget.getAttribute('href').slice(1);
    const element = document.getElementById(id);
    let position = element.offsetTop;
    const fiexedNav = navBar.classList.contains('fixed-nav');
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const navHeight = navBar.getBoundingClientRect().height;

    if (fiexedNav) {
      position = element.offsetTop - navHeight;
    }

    if (navHeight > 82) {
      position = position + containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position
    });

    linksContainer.style.height = 0;
  });
});

// select links
