export default class Budget {
  constructor() {
    this.expense = [];
    this.income = [];

    this.data = {
      allItems: {
        exp: [],
        inc: []
      },
      totals: {
        exp: 0,
        inc: 0
      }
    };
  }

  addItem(type, des, val) {
    let id;
    if (this.data.allItems[type].length > 0) {
      id = this.data.allItems[type][this.data.allItems[type].length - 1].id + 1;
    } else {
      id = 0;
    }

    let obj = { id, des, val: parseInt(val, 10) };
    if (type === 'inc') {
      this.income.push(obj);
    } else if (type === 'exp') {
      this.expense.push(obj);
    }
    this.data.allItems[type].push(obj);
    return obj;
  }

  updateBudget() {
    
}
