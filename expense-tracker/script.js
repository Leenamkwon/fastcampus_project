const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dummyTransactions = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 }
];

let transactions = dummyTransactions;

// Add transactions to DOM List
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}$${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn">x</button>
  `;
  list.appendChild(item);
}

// Updata the balance, income and expense
function updateValues() {
  const amount = transactions.map((item) => item.amount);

  const total = amount.reduce((acc, item) => (acc += item), 0);

  const income = amount
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amount.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = total;
  income.innerText = income;
  expense.innerText = expense;
}

function init() {
  transactions.forEach((item) => addTransactionDOM(item));
}

init();
