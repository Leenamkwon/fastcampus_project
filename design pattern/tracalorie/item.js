// import selector from './selector';
import strCtrl from './storage.js';

const itemCtrl = (() => {
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structure / State
  const data = {
    items: strCtrl.getItems(),
    currentItem: null,
    total: 0,
  };

  return {
    getItems() {
      return data.items;
    },

    getCurrentItem() {
      return data.currentItem;
    },

    getItemID(id) {
      let found = data.items.find((item) => item.id === id);
      return found;
    },

    setCurrentItem(item) {
      data.currentItem = item;
      return data.currentItem;
    },

    updatedItem(name, calories) {
      calories = parseInt(calories);
      let found;

      data.items.forEach((item) => {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });

      return found;
    },

    addItems(name, calories) {
      let id;
      data.items.length ? (id = data.items.length) : (id = 0);

      const newItem = new Item(id, name, calories);
      data.items.push(newItem);

      return newItem;
    },

    logData() {
      return data;
    },

    getTotalCalories() {
      data.total = data.items.reduce((acc, cal) => acc + cal.calories, 0);
      return data.total;
    },

    deleteList() {
      // MY SOLUTION 1
      // data.items = data.items.filter((item) => item.id !== data.currentItem.id);

      // MY SOLUTION 2
      const remover = data.items.findIndex((item) => {
        if (item.id === data.currentItem.id) {
          return item;
        }
      });
      data.items.splice(remover, 1);
      return remover;
    },

    clearAllItem() {
      data.items = [];
      data.currentItem = null;
    },
  };
})();

export default itemCtrl;
