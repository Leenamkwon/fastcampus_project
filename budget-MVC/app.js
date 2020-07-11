import Budget from './model/search.js';
import * as budgetUI from './view/searchView.js';

const btn = document.querySelector('.add__btn');

const state = {
  budget: new Budget()
};

const controlBudget = () => {
  // get value
  const input = budgetUI.getInput();
  const tempEmpty = document.querySelector('.add__description');

  if (tempEmpty.value.trim() !== '') {
    // send model ctr
    const data = state.budget.addItem(
      input.type,
      input.description,
      input.value
    );

    // calc update -> models -> views
    const sum = state.budget.updateBudget();
    budgetUI.renderCalc(sum);
    // end of calc update

    // render ui
    budgetUI.renderList(input.type, data);

    // clear input
    budgetUI.clearValue();
  } else {
    alert('please enter a value');
  }
};

btn.addEventListener('click', () => controlBudget);

document.addEventListener('keypress', (e) => {
  if (e.keyCode === 13 || e.which === 13) {
    controlBudget();
  }
});
