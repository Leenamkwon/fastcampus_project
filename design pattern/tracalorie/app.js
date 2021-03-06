import itemCtrl from './item.js';
import UICtrl from './view.js';
import selector from './selector.js';
import strCtrl from './storage.js';

const App = ((itemCtrl, UICtrl, strCtrl) => {
  const loadEventListeners = () => {
    selector.addBtn.addEventListener('click', itemAddSubmit);
  };

  document.addEventListener('keypress', (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      e.preventDefault();
      return false;
    }
  });

  const update = () => {
    // hide edit btn
    ['updateBtn', 'deleteBtn', 'backBtn'].forEach((dom) => {
      UICtrl.hideList('none', dom);
    });

    // show add btn
    UICtrl.hideList('inline-block', 'addBtn');

    // clear Input
    UICtrl.clearInput();

    // Get total calories
    const totalCalories = itemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);
  };

  const itemAddSubmit = (e) => {
    e.preventDefault();
    // get form input from UI Controller
    const meal = selector.meal,
      calories = selector.calories;

    if (meal.value && calories.value) {
      const newItem = itemCtrl.addItems(meal.value, parseInt(calories.value));

      // Add item UI list
      UICtrl.addListItem(newItem);

      // clear Fields
      UICtrl.clearInput();

      // Store in localStorage
      strCtrl.storeItem(newItem);

      // Get total calories
      const totalCalories = itemCtrl.getTotalCalories();
      UICtrl.showTotalCalories(totalCalories);
    } else {
      alert('값을 입력하세요.');
    }
  };

  const itemUpdateClick = (e) => {
    e.preventDefault();

    if (e.target.classList.contains('edit-item')) {
      // Get list item id (item-0, item-1)
      const listId = e.target.parentElement.parentElement.id;

      // Break into an array
      const listIdArr = parseInt(listId.split('-').splice(1, 1).join(''));

      // Get the actual id
      const itemToEdit = itemCtrl.getItemID(listIdArr);

      // Set current item
      const currentItem = itemCtrl.setCurrentItem(itemToEdit);

      // Add item to form
      UICtrl.addItemToForm(currentItem);
    }
  };

  // Update item submit
  const itemUpdateSubmit = (e) => {
    e.preventDefault();

    // Get item input
    const input = UICtrl.getItemInput();

    // update item
    const updatedItem = itemCtrl.updatedItem(input.name, input.calories);

    // Update local storage
    strCtrl.updateItemStorage(updatedItem);

    // Update UI
    UICtrl.updateListItem(updatedItem);

    update();
  };

  const deleteItem = () => {
    itemCtrl.deleteList();
    UICtrl.deleteListItem(itemCtrl.getCurrentItem());
    strCtrl.deleteItemFromStorage(itemCtrl.getCurrentItem());
    update();
  };

  const clearAllItemsClick = () => {
    // Delete all items from data structure
    itemCtrl.clearAllItem();
    UICtrl.hideList('none', 'item-list');
    strCtrl.clearItemFromStorage();
    update();
    UICtrl.removeItems();
  };

  // Edit icon click
  selector['item-list'].addEventListener('click', itemUpdateClick);
  // update btn click
  selector.updateBtn.addEventListener('click', itemUpdateSubmit);
  selector.deleteBtn.addEventListener('click', deleteItem);
  selector.clearBtn.addEventListener('click', clearAllItemsClick);
  selector.backBtn.addEventListener('click', update);

  return {
    init() {
      // Clear edit state / set initial set
      ['updateBtn', 'deleteBtn', 'backBtn'].forEach((dom) => {
        UICtrl.hideList('none', dom);
      });

      // fatch items from data structure
      const items = itemCtrl.getItems();

      // Populate list with items
      !items.length
        ? UICtrl.hideList('none', 'item-list')
        : UICtrl.populateItemList(items);

      loadEventListeners();

      // Get total calories
      const totalCalories = itemCtrl.getTotalCalories();
      UICtrl.showTotalCalories(totalCalories);
    },
  };
})(itemCtrl, UICtrl, strCtrl);

App.init();
