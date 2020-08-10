const itemCtrl = (() => {
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structure / State
  const data = {
    items: [{ id: 0, name: 'steak', calories: 1200 }],
    currentItem: null,
    total: 0,
  };

  return {
    getItems() {
      return data.items;
    },
    logData() {
      return data;
    },
  };
})();

export default itemCtrl;
