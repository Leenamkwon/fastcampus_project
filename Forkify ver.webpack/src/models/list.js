import uniqid from 'uniqid';

export default class List {
  constructor() {
    this.items = [];
  }

  addItem(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient
    };
    this.items.push(item);
    return item;
  }

  deleteItem(id) {
    const index = this.items.findIndex((el) => {
      return el.id === id;
    });
    // splice 원본 변경 o 복사 o
    // slice 원본 변경 x 복사 o
    this.items.splice(index, 1);
  }

  updateCount(id, newCount) {
    this.items.find((el) => el.id === id).count = newCount;
  }
}
