import Budget from './model/search.js';
import * as budgetUI from './view/searchView.js';

const btn = document.querySelector('.add__btn');
const container = document.querySelector('.container');
const state = {
  budget: new Budget()
};

const updateBudget = () => {
  state.budget.calculateTotal('exp');
  state.budget.calculateTotal('inc');
  const calcData = state.budget.getBudget();
  budgetUI.renderBudget(calcData);
};

const controlBudget = () => {
  // get value
  const input = budgetUI.getInput();
  const tempEmpty = document.querySelector('.add__description');

  if (tempEmpty.value.trim() !== '') {
    // 1. send model ctr
    const data = state.budget.addItem(
      input.type,
      input.description,
      input.value
    );

    // 2. calc update -> models -> views
    updateBudget();
    // end of calc update

    // 3. calc percentage
    const percentage = state.budget.calculatePercentage();
    console.log(percentage);

    // 4. render ui
    budgetUI.renderList(input.type, data, percentage);

    // 5. clear input
    budgetUI.clearValue();
  } else {
    alert('please enter a value');
  }
};

btn.addEventListener('click', () => {
  controlBudget();
});

document.addEventListener('keypress', (e) => {
  if (e.keyCode === 13 || e.which === 13) {
    controlBudget();
  }
});

container.addEventListener('click', (e) => {
  const target = e.target.closest('.item__delete--btn');

  if (target) {
    const parent =
      e.target.parentElement.parentElement.parentElement.parentElement;
    const tempID = parent.getAttribute('id');
    const split = tempID.split('-');

    const type = split[0];
    const id = parseInt(split[1], 10);

    state.budget.deleteItem(type, id);
    budgetUI.removeList(type, parent);

    // update
    updateBudget();
  }
  return;
});
