import itemCtrl from './item.js';
import UICtrl from './view.js';
import selector from './selector.js';

const App = ((itemCtrl, UICtrl) => {
  const loadEventListeners = () => {
    selector.addBtn.addEventListener('click', itemAddSubmit);
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

      // Get total calories
      const totalCalories = itemCtrl.getTotalCalories();
      UICtrl.totalCalories(totalCalories);

      //
    } else {
      alert('값을 입력하세요.');
    }
  };

  return {
    init() {
      // fatch items from data structure
      const items = itemCtrl.getItems();

      // Populate list with items
      !items.length ? UICtrl.hideList('none') : UICtrl.populateItemList(items);

      loadEventListeners();
    },
  };
})(itemCtrl, UICtrl);

App.init();
