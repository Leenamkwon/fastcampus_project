const storage = (() => {
  // Public methods
  let items = [];

  return {
    storeItem(newItem) {
      if (localStorage.getItem('items') === null) {
        items.push(newItem);
        // Set localStorage
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        // items = JSON.parse(localStorage.getItem('items'));
        items.push(newItem);
        localStorage.setItem('items', JSON.stringify(items));
      }
    },

    getItems() {
      let items;
      if (localStorage.getItem('items') === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },

    updateItemStorage(updateItem) {
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach((item, index) => {
        if (updateItem.id === item.id) {
          items.splice(index, 1, updateItem);
        }
      });

      localStorage.setItem('items', JSON.stringify(items));
    },

    deleteItemFromStorage(newItem) {
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach((item, index) => {
        if (newItem.id === item.id) {
          items.splice(index, 1);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },

    clearItemFromStorage() {
      localStorage.removeItem('items');
    },
  };
})();

export default storage;
