const itemCtrl = (() => {
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structure / State
  const data = {
    items: [],
    currentItem: null,
    total: 0,
  };

  return {
    getItems() {
      return data.items;
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
  };
})();

export default itemCtrl;
