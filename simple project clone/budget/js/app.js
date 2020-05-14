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
      this.budgetFeedback.classList('showItem');
      this.budgetFeedback.innerHTML = `<p>value cannot be empty or negative</p>`;
      const self = this;

      setTimeout(function () {
        self.budgetFeedback.classList.remove('showItem');
      }, 1000);
    } else {
      this.budgetAmount.textContent = value;
      this.budgetInput.value = '';
      this.showBalance();
    }
  }

  submitExpenseForm() {
    const expenseValue = this.expenseInput.value;
    const amountValue = this.amountInput.value;

    if (
      expenseValue.trim() === '' ||
      amountValue.trim() === '' ||
      amountValue < 0
    ) {
      this.expenseFeedback.classList.add('showItem');
      this.expenseFeedback.innerHTML = `<p>values cannot be empty or negative</p>`;

      const self = this;
      setTimeout(() => {
        self.expenseFeedback.classList.remove(showItem);
      }, 1000);
    } else {
      let amount = +amountValue;
      this.expenseValue = '';
      this.amountValue = '';

      let expense = {
        id: this.itemID,
        title: expenseValue,
        amount: amount
      };

      this.itemID += 1;
      this.itemList.push(expense);
      this.addExpense(expense);
      this.showBalance();
    }
  }

  // show balance
  showBalance() {
    const expense = this.totalExpense();
    const total = +this.budgetAmount.textContent - expense;
    this.balanceAmount.textContent = total;

    if (total < 0) {
      this.balance.classList.remove('showGreen');
      this.balance.classList.add('showRed');
    } else if (total > 0) {
      this.balance.classList.remove('showRed');
      this.balance.classList.add('showGreen');
    } else if (total === 0) {
      this.balance.classList.remove('showRed', 'showGreen');
      this.balance.classList.add('showBlack');
    }
  }

  addExpense(obj) {
    const div = document.createElement('div');
    div.classList.add('expense');
    div.innerHTML = ` <div class="expense">
    <div class="expense-item d-flex justify-content-between align-items-baseline">

     <h6 class="expense-title mb-0 text-uppercase list-item">- $${obj.title}</h6>
     <h5 class="expense-amount mb-0 list-item">${obj.amount}</h5>

     <div class="expense-icons list-item">

      <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
       <i class="fas fa-edit"></i>
      </a>
      <a href="#" class="delete-icon" data-id="${expense.id}">
       <i class="fas fa-trash"></i>
      </a>
     </div>
    </div>
   </div>`;
    this.expenseList.appendChild(div);
  }

  // total expense
  totalExpense() {
    let total = 0;
    total = this.itemList.reduce((acc, cal) => {
      return (acc += cal.amount);
    }, 0);
    this.expenseAmount.textContent = total;
    return total;
  }

  // edit btn
  editExpense(ele) {
    const id = ele.dataset.id;
    const parent = ele.parentElement.parentElement.parentElement;

    // remove from dom
    this.expenseList.removeChild(parent);

    let expense = itemList.filter((itemID) => {
      return itemID === id;
    });

    this.expenseInput.value = expense[0].title;
    this.amountInput.value = expense[0].amount;

    // remove form the array
    this.itemList = itemList.filter((itemID) => {
      return itemID !== id;
    });
    this.showBalance();
  }

  // remove btn
  removeExpense(ele) {
    const id = ele.dataset.id;
    const parent = ele.parentElement.parentElement.parentElement;

    this.expenseList.removeChild(parent);
    // remove form the array
    this.itemList = itemList.filter((itemID) => {
      return itemID !== id;
    });
  }
}

function eventListenters() {
  const budgetForm = document.getElementById('budget-form');
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');

  const ui = new UI();

  budgetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    ui.submitBudgetForm();
  });

  expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    ui.submitExpenseForm();
  });

  expenseList.addEventListener('click', (e) => {
    const target = e.target.parentElement;

    if (target.classList.contains('delete-icon')) {
      ui.removeExpense(target);
    } else if (target.classList.contains('edit-icon')) {
      ui.editExpense(target);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  eventListenters();
});
