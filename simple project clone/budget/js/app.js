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
    if (value.trim() === '' || value.length < 0) {
      this.budgetFeedback.classList.add('showItem');
      this.budgetFeedback.innerHTML = `<p>value cannot be empty or negative</p>`;
      const self = this;

      setTimeout(() => {
        // setTimeout 스코프 안에서 this는 window이다.
        self.budgetFeedback.classList.remove('showItem');
      }, 1000);
    } else {
      this.budgetAmount.textContent = value;
      this.budgetInput.value = '';
      this.showBalance();
    }
  }

  // show balance
  showBalance() {
    const expense = this.totalExpense();
    const total = +this.budgetAmount.textContent - expense;
    this.balanceAmount.textContent = total;
    if (total < 0) {
      this.balance.classList.remove('showGreen', 'showBlack');
      this.balance.classList.add('showRed');
    } else if (total > 0) {
      this.balance.classList.remove('showRed', 'showBlack');
      this.balance.classList.add('showGreen');
    } else if (total === 0) {
      this.balance.classList.remove('showGreen', 'showRed');
      this.balance.classList.add('showBlack');
    }
  }

  // submit expense form
  submitExpenseForm() {
    const expenseValue = this.expenseInput.value;
    const amountValue = this.amountInput.value;
    const value = this.budgetInput.value;

    if (expenseValue === '' || amountValue === '' || amountValue < 0) {
      this.expenseFeedback.classList.add('showItem');
      this.expenseFeedback.textContent = `값을 입력하세요 ㅡㅡ;`;
      const self = this;

      setTimeout(() => {
        self.expenseFeedback.classList.remove('showItem');
      }, 2000);
    } else {
      let amount = +amountValue;
      this.expenseInput.value = '';
      this.amountInput.value = '';

      let expense = {
        id: this.itemID,
        title: expenseValue,
        amount
      };
      this.itemID++;
      this.itemList.push(expense);
      this.addExpense(expense);
      this.showBalance();

      // show balance
    }

    if (value.trim() === '' || value.length < 0) {
      this.expenseFeedback.classList.add('showItem');
      this.expenseFeedback.textContent = `당신 지갑에 있는 돈을 전부 입력하세요`;
      setTimeout(() => {
        this.expenseFeedback.classList.remove('showItem');
      }, 2000);
    }
  }

  // add expense
  addExpense(expense) {
    const div = document.createElement('div');
    div.classList.add('expense');
    div.innerHTML = ` <div class="expense">
    <div class="expense-item d-flex justify-content-between align-items-baseline">

     <h6 class="expense-title mb-0 text-uppercase list-item">- $${expense.title}</h6>
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
   </div>`;
    this.expenseList.appendChild(div);
  }

  // total expense
  totalExpense() {
    let total = 0;
    if (this.itemList.length > 0) {
      total = this.itemList.reduce((acc, curr) => {
        return (acc += curr.amount);
      }, 0);
    }
    this.expenseAmount.textContent = total;
    return total;
  }

  // edit
  editExpense(element) {
    let id = +element.dataset.id;
    let parent = element.parentElement.parentElement.parentElement;

    // remove from DOM
    this.expenseList.removeChild(parent);

    // remove from the list
    let expense = this.itemList.filter((item) => {
      return item.id === id;
    });

    // show expense input value
    this.expenseInput.value = expense[0].title;
    this.expenseInput.value = expense[0].amount;

    // delete expense
    let tempList = this.itemList.filter((item) => {
      return item.id !== id;
    });

    this.itemList = tempList;
    this.showBalance();
  }

  // delelte
  deleteExpense(element) {
    let id = +element.dataset.id;
    let parent = element.parentElement.parentElement.parentElement;

    // remove from DOM
    this.expenseList.removeChild(parent);

    // remove from the list
    let removeBtn = this.itemList.filter((item) => {
      return item.id !== id;
    });

    this.itemList = removeBtn;
    this.showBalance();
  }
}

function addEventListener() {
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

  // expense form submit
  expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    ui.submitExpenseForm();
  });

  // expense click
  expenseList.addEventListener('click', (e) => {
    e.preventDefault();
    const removeBtn = e.target.parentElement.classList.contains('delete-icon');
    const editBtn = e.target.parentElement.classList.contains('edit-icon');
    if (editBtn) {
      ui.editExpense(e.target.parentElement);
    } else if (removeBtn) {
      ui.deleteExpense(e.target.parentElement);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  addEventListener();
});
