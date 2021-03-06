/*
budgetController
*/
const budgetController = (function () {
  const Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = +value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function (totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function () {
    return this.percentage;
  };

  const Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = +value;
  };

  const data = {
    allItems: {
      exp: [],
      inc: []
    },
    total: {
      exp: 0,
      inc: 0,
      percentage: 0
    },
    budget: 0
  };

  const calculateTotal = function (type) {
    data.total[type] = data.allItems[type].reduce(
      (cal, num) => (cal += num.value),
      0
    );
  };

  return {
    addItem(type, des, val) {
      let newItem, id;

      if (data.allItems[type].length > 0) {
        id = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        id = 0;
      }

      if (type === 'exp') {
        newItem = new Expense(id, des, val);
      } else if (type === 'inc') {
        newItem = new Income(id, des, val);
      }
      data.allItems[type] = [...data.allItems[type], newItem];

      // return the new element
      return newItem;
    },

    calculateBudget() {
      // calculate total income and expense
      calculateTotal('inc');
      calculateTotal('exp');

      // calculate the budget: income - expense
      data.budget = data.total.inc - data.total.exp;

      // calculate the percentage of income that we spnet
      if (data.total.inc > 0) {
        data.total.percentage = Math.round(
          (data.total.exp / data.total.inc) * 100
        );
      } else {
        data.total.percentage = -1;
      }
    },

    getBudget() {
      return {
        budget: data.budget,
        totalInc: data.total.inc,
        totalExp: data.total.exp,
        percentage: data.total.percentage
      };
    },

    deleteItem(type, id) {
      data.allItems[type] = data.allItems[type].filter(
        (item) => item.id !== +id
      );
    },

    calculatePercentages() {
      data.allItems.exp.forEach((item) => {
        item.calcPercentage(data.total.inc);
      });
    },

    getPercentages() {
      const allPerc = data.allItems.exp.map((item) => {
        return item.getPercentage();
      });
      return allPerc;
    },

    testing() {
      console.log(data);
    }
  };
})();

/*
UIcontroller
*/
const UIcontroller = (function () {
  return {
    getInput() {
      const type = document.querySelector('.add__type').value;
      const description = document.querySelector('.add__description').value;
      const value = +document.querySelector('.add__value').value;
      return { type, description, value };
    },

    clearFields() {
      document.querySelector('.add__description').value = '';
      document.querySelector('.add__value').value = '';
      document.querySelector('.add__description').focus();
    },

    displayBudget(obj) {
      let type;
      obj.budget > 0 ? (type = 'inc') : (type = 'exp');

      document.querySelector('.budget__value').textContent = this.formatNumber(
        type,
        obj.budget
      );
      document.querySelector(
        '.budget__income--value'
      ).textContent = this.formatNumber(type, obj.totalInc);
      document.querySelector(
        '.budget__expenses--value'
      ).textContent = this.formatNumber(type, obj.totalExp);
      document.querySelector('.budget__expenses--percentage').textContent =
        obj.percentage + '%';
    },

    addListItem(type, obj) {
      let result = '';
      let list = document.querySelector(`.${type}__list`);
      const { id, description, value } = obj;

      if (type === 'exp') {
        result = `
                                <div class="item clearfix" id="exp-${id}">
                            <div class="item__description">${description}</div>
                            <div class="right clearfix">
                                <div class="item__value">${this.formatNumber(
                                  'exp',
                                  value
                                )}</div>
                                <div class="item__percentage">10%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn" data-id="${id}"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>
        `;
      } else if (type === 'inc') {
        result = `
                                <div class="item clearfix" id="inc-${id}">
                            <div class="item__description">${description}</div>
                            <div class="right clearfix">
                                <div class="item__value">${this.formatNumber(
                                  'inc',
                                  value
                                )}</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn" data-id="${id}"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>
        `;
      }
      list.innerHTML += result;
    },

    displayPercentages(percentages) {
      const itemPercentage = document.querySelectorAll('.item__percentage');

      const nodeListForEach = function (list, cb) {
        for (let i = 0; i < list.length; i++) {
          cb(list, i);
        }
      };

      nodeListForEach(itemPercentage, function (list, index) {
        if (percentages[index] > 0) {
          list[index].innerText = percentages[index] + '%';
        } else {
          list[index].innerText = '---';
        }
      });
      // 2번쨰 방법
      // const arr = function(list) {
      //   list.forEach((item, index) => {
      //     itemPercentage[index].textContent = list[index] + '%';
      //   })
      // }
    },

    deleteItemUI(id) {
      const el = document.getElementById(id);
      el.parentNode.removeChild(el);
    },

    formatNumber(type, num) {
      num = Math.abs(num);
      num = num.toFixed(2);

      const split = num.split('.');

      let int = split[0];
      if (int.length > 3) {
        int = int.slice(0, int.length - 3) + ',' + int.slice(int.length - 3); // input 2310, output 2,310
      } else if (int.length > 7) {
        int = `${int.slice(0, int.length - 6)},${int.slice(
          int.length - 5,
          int.length - 3
        )},${int.slice(int.length - 2)}`;
      }

      const dec = split[1];

      return `${type === 'exp' ? '-' : '+'} ${int}.${dec}`;
    },

    displayMonth() {
      const now = new Date();

      const year = now.getFullYear();
      const month = now.getMonth();
      const day = now.getDay();

      function caclDate(date) {
        return date >= 10 ? date : `0${date}`;
      }

      const monthArr = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'Auguse',
        'September',
        'October',
        'November',
        'December'
      ];

      document.querySelector(
        '.budget__title--month'
      ).innerText = `${year}. ${caclDate(month)}  ${
        monthArr[month]
      }. ${caclDate(day)}`;
    },

    changeType() {
      const a = document.querySelector('.add__value');
      const b = document.querySelector('.add__btn');
      const c = document.querySelector('.add__type');
      const d = document.querySelector('.add__description');

      const fields = [a, b, c, d];

      const nodeForEach = function (fields, cb) {
        for (let i = 0; i < fields.length; i++) {
          cb(fields[i], i);
        }
      };

      nodeForEach(fields, function (cur) {
        cur.classList.toggle('red-focus');
      });
    }
  };
})();

/*
APP controller
*/
const controller = (function (budCtrl, UICtrl) {
  const setUpEventListner = function () {
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', (e) => {
      if (e.keyCode === 13 || e.which === 13) {
        ctrlAddItem();
      }
    });
    document.querySelector('.container').addEventListener('click', (e) => {
      ctrlDeleteItem(e);
    });

    document
      .querySelector('.add__type')
      .addEventListener('change', UICtrl.changeType);
  };

  const updateBudget = function () {
    // 1. calculate the budget
    budCtrl.calculateBudget();

    // 2. Return the budget
    const budget = budCtrl.getBudget();

    // 3. Display the budget on the UI
    UICtrl.displayBudget(budget);
  };

  const ctrlAddItem = function () {
    if (
      document.querySelector('.add__description').value === '' ||
      document.querySelector('.add__value') === ''
    ) {
      alert('enter the value');
    } else {
      // 1. get the fiedls input data
      const input = UICtrl.getInput();
      // 2. Add the item to the budget controller
      const newItem = budCtrl.addItem(
        input.type,
        input.description,
        input.value
      );

      // 3. Add the item UI
      UICtrl.addListItem(input.type, newItem);
      UICtrl.clearFields();

      // 4. Calculate budget data and display UI
      updateBudget();

      // 5. Calculate and update percentages
      updatePercentages();
    }
  };

  const ctrlDeleteItem = function (e) {
    let itemID =
      e.target.parentElement.parentElement.parentElement.parentElement.id;

    if (itemID) {
      const splitID = itemID.split('-');
      const type = splitID[0];
      const id = +splitID[1];

      // 1. delete the item from the data structure
      budCtrl.deleteItem(type, id);

      // 2. Delete the item from UI
      UICtrl.deleteItemUI(itemID);

      // 3. Update and show the new budget
      updateBudget();

      // 4. Calculate and update percentages
      updatePercentages();
    }
  };

  const updatePercentages = function () {
    // 1. Calculate percentage
    budCtrl.calculatePercentages();

    // 2. Read percentages from the budget controller
    const percentages = budCtrl.getPercentages();

    // 3. Update the user with the new percentages
    UICtrl.displayPercentages(percentages);
  };

  return {
    init() {
      setUpEventListner();
      updateBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      UICtrl.displayMonth();
      budCtrl.testing();
    }
  };
})(budgetController, UIcontroller);
controller.init();
