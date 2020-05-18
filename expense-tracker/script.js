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

const localStorageTransactions = JSON.parse(localStorage.getItem('listItem'));

let transactions =
  localStorage.getItem('listItem') !== null ? localStorageTransactions : [];

console.log(transactions);

// Add transactions to DOM List
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}$${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeList(${
    transaction.id
  })">x</button>
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
  money_plus.innerText = income;
  money_minus.innerText = expense;
}

function inputValue(e) {
  e.preventDefault();
  const textValue = text.value;
  const amountValue = amount.value;

  if (textValue.trim() === '' || amountValue.trim() === '') {
    alert('Please adding value');
  } else {
    const dataObj = {
      id: getRandomID(),
      text: text.value,
      amount: +amount.value
    };

    transactions.push(dataObj);

    addTransactionDOM(dataObj);

    updateValues();

    updateLocalStorage();

    text.value = '';
    amount.value = '';
  }
}

function getRandomID() {
  return Math.floor(Math.random() * 1000000);
}

function removeList(id) {
  transactions = transactions.filter((item) => item.id !== id);

  updateLocalStorage();

  init();
}

function updateLocalStorage() {
  localStorage.setItem('listItem', JSON.stringify(transactions));
}

function init() {
  list.innerHTML = '';
  transactions.forEach((item) => addTransactionDOM(item));
  updateValues();
}

init();

form.addEventListener('submit', inputValue);
