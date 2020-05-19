const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150 }
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function addTransaction(e) {
  e.preventDefault();
  const textValue = text.value;
  const amountValue = +amount.value;

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('please value enter');
  } else {
    const dataObj = {
      id: getRandomObj(),
      text: text.value,
      amount: +amount.value
    };

    transactions.push(dataObj);
    addTransactionDOM(dataObj);

    localStorage.setItem('transactions', JSON.stringify(transactions));
    updateValues();

    text.value = '';
    amount.value = '';
  }
}

function getRandomObj() {
  return Math.floor(Math.random() * 1000000);
}

// Add transactions to DOM List
function addTransactionDOM(transaction) {
  // Get Sign
  const sign = transaction.amount < 0 ? '-' : '+';
  const li = document.createElement('li');
  li.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  li.innerHTML = `${transaction.text} <span>
  $${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" onclick="removeList(${
    transaction.id
  })">x</button>`;

  list.appendChild(li);
}

// Update the balance, income and expense
function updateValues() {
  const amounts = transactions.map((item) => item.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

function removeList(id) {
  transactions = transactions.filter((item) => item.id !== id);

  localStorage.setItem('transactions', JSON.stringify(transactions));

  init();
}

function init() {
  list.innerHTML = '';

  transactions.forEach((item) => addTransactionDOM(item));
  updateValues();
}

init();

form.addEventListener('submit', addTransaction);
