import selector from './selector.js';

const UICtrl = (() => {
  return {
    populateItemList(items) {
      let html = '';

      items.forEach((item) => {
        html += `<li class="collection-item" id="item-${item.id}">
                 <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                 <a href="#" class="secondary-content">
                   <i class="edit-item fa fa-pencil"></i>
                 </a>
                 </li>`;
      });

      // Insert list items
      selector['item-list'].innerHTML = html;
    },

    addListItem(item) {
      this.hideList('block');
      const li = document.createElement('li');

      // Add class
      li.className = 'collection-item';
      li.id = `item-${item.id}`;
      li.innerHTML = `
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      `;
      selector['item-list'].insertAdjacentElement('beforeend', li);
    },

    clearInput() {
      selector.meal.value = '';
      selector.calories.value = '';
    },

    hideList(style) {
      selector['item-list'].style.display = style;
    },

    totalCalories(calc) {
      selector.totalCalories.textContent = calc;
    },
  };
})();

export default UICtrl;
