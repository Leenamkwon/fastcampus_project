// BUDGET CONTROLLER
const budgetController = (function () {
  const Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  const Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    total: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: 0
  };

  const calculateTotal = function (type) {
    let sum = 0;
    sum = data.allItems[type].reduce((cal, num) => (cal += num), 0);

    data.total[type] = sum;
  };

  return {
    addItem(type, des, val) {
      let newItem, id;

      // id = last id + 1
      // Create new ID
      if (data.allItems[type].length > 0) {
        id = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        id = 0;
      }

      // Create new item based on 'inc' or 'exp' type
      if (type === 'exp') {
        newItem = new Expense(id, des, val);
      } else if (type === 'inc') {
        newItem = new Income(id, des, val);
      }

      // push it into our data structure
      data.allItems[type].push(newItem);

      // Return the new element
      return newItem;
    },

    calculateBudget() {
      // calculate total income and expense
      calculateTotal('exp');
      calculateTotal('inc');

      // calculate the budget: income - expense
      data.budget = data.total.inc - data.total.exp;

      // calculate the percentage of income that we spent
      if (data.total.inc > 0) {
        data.percentage = Math.round((data.total.exp / data.total.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    getBudget: function () {
      return {
        budget: data.budget,
        totalInc: data.total.inc,
        totalExp: data.total.exp,
        percentage: data.percentage
      };
    },

    testing() {
      console.log(data);
    }
  };
})();

// UI CONTORLLER
const UIcontroller = (function () {
  const DOMstring = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    addBtn: '.add__btn'
  };

  return {
    getinput() {
      const addType = document.querySelector(DOMstring.inputType).value;
      const add__description = document.querySelector(
        DOMstring.inputDescription
      ).value;
      const addValue = +document.querySelector(DOMstring.inputValue).value;

      return { addType, add__description, addValue };
    },

    addListItem(obj, type) {
      // Create HTML string with placeholder text
      let result, element;
      result = '';
      if (type === 'inc') {
        const incomeList = document.querySelector('.income__list');
        element = incomeList;
        result += `
          <div class="item clearfix" id="income-${obj.id}">
            <div class="item__description">${obj.description}</div>
              <div class="right clearfix">
                <div class="item__value">+ ${obj.value}</div>
                  <div class="item__delete">
                    <button class="item__delete--btn" data-id="${obj.id}"><i class="ion-ios-close-outline"></i></button>
                  </div>
                </div>
              </div>`;
      } else if (type === 'exp') {
        const expenseList = document.querySelector('.expenses__list');
        element = expenseList;
        result += `
          <div class="item clearfix" id="income-${obj.id}">
            <div class="item__description">${obj.description}</div>
              <div class="right clearfix">
                <div class="item__value">- ${obj.value}</div>
                <div class="item__percentage">21%</div>
                  <div class="item__delete">
                  <button class="item__delete--btn" data-id="${obj.id}"><i class="ion-ios-close-outline"></i></button>
                  </div>
                </div>
              </div>`;
      }

      element.innerHTML += result;
    },

    clearFields() {
      let fiedls;

      fiedls = [
        ...document.querySelectorAll(
          `${DOMstring.inputDescription},${DOMstring.inputValue}`
        )
      ];

      fiedls.forEach((item) => (item.value = ''));
      fiedls[0].focus();
    },

    getDOMstrings() {
      return DOMstring;
    },

    addMoney(budget) {}
  };
})();

// GLOBAL APP CONTROLLER
const controller = (function (budgetCtrl, UICtrl) {
  const DOM = UICtrl.getDOMstrings();

  const updateBudget = function () {
    // 1. Calculate the budget
    budgetCtrl.calculateBudget();

    // 2. return the budget
    const budget = budgetCtrl.getBudget();

    // 3. Display the budget on the UI
    UICtrl.addMoney(budget);
  };

  //
  const ctrlAddItem = function () {
    let input, newItem;
    // 1. Get the field input data
    input = UICtrl.getinput();

    if (
      input.add__description === '' ||
      input.addValue <= 0 ||
      isNaN(input.addValue) === true
    ) {
      alert('please enter the value');
    } else {
      // 2. Add the item to the budget controller
      newItem = budgetCtrl.addItem(
        input.addType,
        input.add__description,
        input.addValue
      );

      // 3. Add the item to the UI
      UICtrl.addListItem(newItem, input.addType);

      // 4. clear the fields
      UICtrl.clearFields();

      // 5. calculate and update the budget
      updateBudget();

      // 6. display the budget on the UI
    }
  };

  const setupEventListeners = function () {
    document.querySelector(DOM.addBtn).addEventListener('click', () => {
      ctrlAddItem();
    });

    document.addEventListener('keypress', (e) => {
      if (e.keyCode === 13 || e.which === 13) {
        ctrlAddItem();
      }
    });
  };

  return {
    init() {
      setupEventListeners();
      budgetCtrl.testing();
    }
  };
})(budgetController, UIcontroller);

controller.init();
