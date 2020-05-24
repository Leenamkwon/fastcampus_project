class UI {
  constructor() {
    this.budgetFeedback = document.querySelector('.budget-feedback');
    this.expenseFeedback = document.querySelector('.expense-feedback');
    this.budgetForm = document.getElementById('budget-form');
    this.budgetInput = document.getElementById('budget-input');
    this.budgetAmount = document.getElementById('budget-amount');
    this.expenseAmount = document.getElementById('expense-amount');
    this.balance = document.getElementById('balance');
    this.balanceAmount = document.getElementById('balance-amount');
    this.expenseForm = document.getElementById('expense-form');
    this.expenseInput = document.getElementById('expense-input');
    this.amountInput = document.getElementById('amount-input');
    this.expenseList = document.getElementById('expense-list');
    this.itemList = [];
    this.itemID = 0;
  }

  submitBudgetForm() {
    const value = this.budgetInput.value;
    if (value.trim() === '' || value.length < 0) {
      this.budgetFeedback.classList.add('showItem');
      this.budgetFeedback.innerHTML = `<p>value cannot be empty or negative</p>`;
      const self = this;

      setTimeout(() => {
        self.budgetFeedback.classList.remove('showItem');
      }, 4000);
    } else {
      this.budgetAmount.textContent = value;
      this.budgetInput.value = '';
      this.showBalance();
    }
  }

  // show balance
  showBalance() {
    const expense = this.totalExpense();
    const total = +value - expense;
    this.balanceAmount.textContent = total;
    if (total < 0) {
      this.balance.classList.remove('showGreen', 'showBlack');
      this.balance.classList.add('showRed');
    } else if (total > 0) {
      this.balance.classList.add('showGreen');
      this.balance.classList.remove('showRed');
    } else if (total === 0) {
      this.balance.classList.remove('showGreen');
      this.balance.classList.add('showBlack');
    }
  }

  // total expense
  totalExpense() {
    let total = 0;
    if (this.itemList.length > 0) {
      total = this.itemList.reduce((acc, item) => (acc += item.amount), 0) * -1;
    }
    this.expenseAmount.textContent = total;
    return total;
  }

  // submit expense form
  submitExpenseForm() {
    const expenseValue = this.expenseInput.value;
    const amountValue = this.amountInput.value;

    if (expenseValue === '' || amountValue === '' || amountValue < 0) {
      this.expenseFeedback.classList.add('showItem');
      this.expenseFeedback.innerHTML = `<p>valuese cannot be empty or negative</p>`;
      const self = this;

      setTimeout(() => {
        self.expenseFeedback.classList.remove('showItem');
      }, 4000);
    } else {
      let amount = +amountValue;
      this.expenseInput.value = '';
      this.amountInput.value = '';

      let expense = {
        id: this.itemID,
        title: expenseValue,
        amount: amount
      };
      this.itemID += 1;
      this.itemList.push(expense);
      this.addExpense(expense);

      // show balance
      this.showBalance();
    }
  }
  // add expense
  addExpense(expense) {
    const div = document.createElement('div');
    div.classList.add('expense');
    div.innerHTML = `
        <div class="expense-item d-flex justify-content-between align-items-baseline">

         <h6 class="expense-title mb-0 text-uppercase list-item">- ${expense.title}</h6>
         <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

         <div class="expense-icons list-item">

          <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
           <i class="fas fa-edit"></i>
          </a>
          <a href="#" class="delete-icon" data-id="${expense.id}">
           <i class="fas fa-trash"></i>
          </a>
         </div>
        </div>
        `;
    this.expenseList.appendChild(div);
  }

  // remove expense
  removeItem(ele) {
    let id = +ele.dataset.id;
    let parent = ele.parentElement.parentElement.parentElement;

    // remove from dom
    this.expenseList(parent);

    this.itemList = this.itemList.filter((item) => item.id !== id);
    this.showBalance();
  }

  // edit expense
  editItem(ele) {
    let id = +ele.dataset.id;
    let parent = ele.parentElement.parentElement.parentElement;

    // remove from dom
    this.expenseList(parent);

    // remove from the list
    let expense = this.itemList.filter((item) => item.id === id);

    this.expenseInput.value = expense[0].title;
    this.amountInput.value = expense[0].amount;

    // remove from list
    let tempList = this.itemList.filter((item) => item.id !== item);

    this.itemList = tempList;
    this.showBalance();
  }
}

function evnetLisenters() {
  const budgetForm = document.getElementById('budget-form');
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');

  // new instance ui
  const ui = new UI();

  // budget form submit
  budgetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    ui.submitBudgetForm();
  });

  expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    ui.submitExpenseForm();
  });

  expenseList.addEventListener('click', (e) => {
    const deleteBtn = e.target.classList.contains('delete-icon');
    const editBtn = e.target.classList.contains('edit-icon');
    if (editBtn) {
      ui.editItem(e.target.parentElement);
    } else if (deleteBtn) {
      ui.removeItem(e.target.parentElement);
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  eventListeners();
});
