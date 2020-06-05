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

  // submit budget method
  submitBudgetForm() {
    const value = this.budgetInput.value;
    if (value.trim() === '') {
      this.showFeedback('값을 입력해주세요');
    } else {
      this.budgetAmount.innerText = value;
      this.budgetInput.value = '';
      this.showBalance();
    }
  }

  showFeedback(text) {
    this.budgetFeedback.classList.add('showItem');
    this.budgetFeedback.innerHTML = `<p>${text}</p>`;

    const self = this;
    setTimeout(() => {
      self.budgetFeedback.classList.remove('showItem');
    }, 1000);
  }

  showExpenseFeedback(text) {
    this.expenseFeedback.classList.add('showItem');
    this.expenseFeedback.innerHTML = `<p>${text}</p>`;

    const self = this;
    setTimeout(() => {
      self.budgetFeedback.classList.remove('showItem');
    }, 1000);
  }

  expenseColor(total) {
    if (total < 0) {
      this.balance.classList.remove('showGreen', 'showBlack');
      this.balance.classList.add('showRed');
    } else if (total > 0) {
      this.balance.classList.add('showGreen');
      this.balance.classList.remove('showRed');
    } else {
      this.balance.classList.add('showBlack');
      this.balance.classList.remove('showRed', 'showGreen');
    }
  }

  submitExpenseForm() {
    const expenseValue = this.expenseInput.value;
    const amountValue = this.amountInput.value;

    if (expenseValue === '' || amountValue === '' || amountValue < 0) {
      this.showExpenseFeedback('값을 입력해주세요');
    } else {
      let amount = +amountValue;
      this.expenseInput.value = '';
      this.amountInput.value = '';

      const expense = {
        id: this.itemID++,
        title: expenseValue,
        amount: amount
      };
      this.itemList.push(expense);
      this.addList(expense);
    }
  }

  addList(expenseList) {
    const { id, title, amount } = expenseList;
    const div = document.createElement('div');
    div.classList.add('expense');
    div.innerHTML = `
    <div class="expense-item d-flex justify-content-between align-items-baseline">

     <h6 class="expense-title mb-0 text-uppercase list-item">- ${title}</h6>
     <h5 class="expense-amount mb-0 list-item">${amount}</h5>

     <div class="expense-icons list-item">

      <a href="#" class="edit-icon mx-2" data-id="${id}">
       <i class="fas fa-edit"></i>
      </a>
      <a href="#" class="delete-icon" data-id="${id}">
       <i class="fas fa-trash"></i>
      </a>
     </div>
    `;
    this.expenseList.appendChild(div);
    this.showBalance();
  }

  showBalance() {
    const expense = this.totalExpense();
    const total = +this.budgetAmount.innerText - expense;
    this.expenseAmount.innerText = expense;
    this.balanceAmount.innerText = total;
    this.expenseColor(total);
  }

  totalExpense() {
    let total = 0;
    if (this.itemList.length > 0) {
      total = this.itemList.reduce((cal, num) => (cal += num.amount), 0) * -1;
    }
    return total;
  }
}

function eventListenters() {
  const budgetForm = document.getElementById('budget-form');
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');

  // new instance of UI CLASS
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
}

document.addEventListener('DOMContentLoaded', () => {
  eventListenters();
});
