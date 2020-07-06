const setDrink = (section) => {
  section.addEventListener('click', (e) => {
    e.preventDefault();
    const id = e.target.closest('a').dataset.id;
    if (id) {
    }
  });
};

export default setDrink;
