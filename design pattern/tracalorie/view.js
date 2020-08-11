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
      this.hideList('block', 'item-list');
      const li = document.createElement('li');

      // Add class
      li.className = 'collection-item';
      li.id = `item-${item.id}`;
      li.innerHTML = `
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content" dataset-id="${item.id}">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      `;
      selector['item-list'].insertAdjacentElement('beforeend', li);
    },

    clearInput() {
      selector.meal.value = '';
      selector.calories.value = '';
    },

    hideList(style = 'none', dom) {
      selector[dom].style.display = style;
    },

    showTotalCalories(calc) {
      selector.totalCalories.textContent = calc;
    },

    addItemToForm({ id, name, calories }) {
      selector.meal.value = name;
      selector.calories.value = calories;

      ['backBtn', 'deleteBtn', 'updateBtn'].forEach((dom) =>
        this.hideList('inline-block', dom)
      );
      this.hideList('none', 'addBtn');
    },

    getItemInput() {
      return {
        name: selector.meal.value,
        calories: selector.calories.value,
      };
    },

    updateListItem(item) {
      const listItems = [...document.querySelectorAll('#item-list li')];

      listItems.forEach((list) => {
        const listID = list
          .getAttribute('id')
          .split('')
          .join('')
          .replace('item', '');

        if (parseInt(listID) === item.id) {
          document.querySelector(`#item-${item.id}`).innerHTML = `
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content" dataset-id="${item.id}">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      `;
        }
      });
    },

    deleteListItem(item) {
      const deleteItem = document.querySelector(`#item-${item.id}`);
      deleteItem.remove();
    },
  };
})();

export default UICtrl;
