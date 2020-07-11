export default class Budget {
  constructor() {
    this.expense = [];
    this.income = [];

    this.data = {
      allItems: {
        exp: [],
        inc: []
      }
    };
    this.totals = {
      exp: 0,
      inc: 0
    };
    this.budget = 0;
    this.percentage = 0;
  }

  addItem(type, des, val) {
    let id;
    if (this.data.allItems[type].length > 0) {
      id = this.data.allItems[type][this.data.allItems[type].length - 1].id + 1;
    } else {
      id = 0;
    }

    let obj = { id, des, val: parseInt(val, 10), percentage: -1 };
    if (type === 'inc') {
      this.income.push(obj);
    } else if (type === 'exp') {
      this.expense.push(obj);
    }
    // all item push
    this.data.allItems[type].push(obj);
    return obj;
  }

  deleteItem(type, id) {
    this.data.allItems[type] = this.data.allItems[type].filter(
      (el) => el.id !== id
    );
  }

  calculateTotal(type) {
    let sum = 0;
    this.data.allItems[type].forEach((item) => (sum += item.val));
    this.totals[type] = sum;

    this.budget = this.totals['inc'] - this.totals['exp'];
    if (this.totals['inc'] > 0) {
      this.percentage = Math.round(
        (this.totals['exp'] / this.totals['inc']) * 100
      );
    }
  }

  getBudget() {
    return {
      percentage: this.percentage,
      total: this.budget,
      totalINC: this.totals['inc'],
      totalEXP: this.totals['exp']
    };
  }

  calculatePercentage() {
    if (this.totals.inc > 0) {
      this.expense = this.expense.map((el) => {
        el.percentage = (el.val / this.totals['inc']) * 100;
        return el;
      });
    }
    return this.expense;
  }
}
