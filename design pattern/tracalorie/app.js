import itemCtrl from './item.js';
import UICtrl from './view.js';

const App = ((itemCtrl, UICtrl) => {
  return {
    init() {
      console.log('Initializing App...');

      // fatch items from data structure
      const items = itemCtrl.getItems();

      // Populate list with items
      !items.length ? false : UICtrl.populateItemList(items);
    },
  };
})(itemCtrl, UICtrl);

App.init();
