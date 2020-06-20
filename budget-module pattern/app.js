// BUDGET CONTROLLER
const budgetController = (function () {
  const Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
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
    sum = data.allItems[type].reduce((cal, num) => (cal += num.value), 0);
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

    deleteItem: function (type, id) {
      data.allItems[type] = data.allItems[type].filter(
        (item) => item.id !== id
      );
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
          <div class="item clearfix" id="inc-${obj.id}">
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
          <div class="item clearfix" id="exp-${obj.id}">
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

    displayBudget(obj) {
      const budgetValue = document.querySelector('.budget__value');
      const budgetIncome = document.querySelector('.budget__income--value');
      const budgetExpense = document.querySelector('.budget__expenses--value');
      const budgetPercentage = document.querySelector(
        '.budget__expenses--percentage'
      );
      budgetValue.textContent = obj.budget;
      budgetIncome.textContent = obj.totalInc;
      budgetExpense.textContent = obj.totalExp;

      if (obj.percentage > 0) {
        budgetPercentage.textContent = obj.percentage + '%';
      } else {
        budgetPercentage.textContent = '---';
      }
    }
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
    UICtrl.displayBudget(budget);
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

      // 5. calculate and update the budget and display on the UI
      updateBudget();

      // 6. Calculate and update percentages
      updatePercentages();
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

    document
      .querySelector('.container')
      .addEventListener('click', (e) => ctrlDeleteItem(e));
  };

  const ctrlDeleteItem = function (e) {
    const id =
      e.target.parentElement.parentElement.parentElement.parentElement.id;
    if (id) {
      const splitID = id.split('-');
      const type = splitID[0];
      const ID = +splitID[1];

      // 1. delete the item from the data structure
      budgetCtrl.deleteItem(type, ID);

      // 2. delete the item from the UI
      if (type === 'inc') {
        const incomeList = document.querySelector('.income__list');
        incomeList.removeChild(
          e.target.parentElement.parentElement.parentElement.parentElement
        );
      } else if (type === 'exp') {
        const expenseList = document.querySelector('.expense__list');
        expenseList.removeChild(
          e.target.parentElement.parentElement.parentElement.parentElement
        );
      }
      // 3. update and show the new budget
      updateBudget();
    } else {
      false;
    }
  };

  const budget = budgetCtrl.getBudget();
  return {
    init() {
      setupEventListeners();
      UICtrl.displayBudget(budget);
      budgetCtrl.testing();
    }
  };
})(budgetController, UIcontroller);

controller.init();
