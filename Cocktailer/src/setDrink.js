const setDrink = (section) => {
  section.addEventListener('click', (e) => {
    // e.preventDefault();
    const id = +e.target.closest('a').dataset.id;
    if (id) {
      localStorage.setItem('drink', id);
    }
  });
};

export default setDrink;
