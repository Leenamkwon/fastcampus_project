export const getInput = () => {
  const type = document.querySelector('.add__type').value;
  const description = document.querySelector('.add__description').value;
  const value = document.querySelector('.add__value').value;
  return { type, description, value };
};

const formatNumber = (num, type) => {
  num = num.toString();
  if (num.length >= 4) {
    if (num.length >= 7) {
      return `${num.slice(0, num.length - 6)},${num.slice(
        num.length - 5,
        num.length - 2
      )},${num.slice(num.length - 3)} KRW`;
    }
    return `${num.slice(0, num.length - 3)},${num.slice(num.length - 3)} KRW`;
  } else {
    return `${num} KRW`;
  }
};

const renderPercentage = (per) => {
  console.log(per.length);
  for (let i = 0; i < per.length; i += 1) {
    if (i === per.length - 1) {
      return per[i].percentage;
    }
  }
};

export const clearValue = () => {
  const description = document.querySelector('.add__description');
  const value = document.querySelector('.add__value');
  [description, value].forEach((el) => (el.value = ''));
  description.focus();
};

export const renderBudget = (data, type) => {
  const { percentage, total, totalINC, totalEXP } = data;

  const budget = document.querySelector('.budget__value');
  const budgetInc = document.querySelector('.budget__income--value');
  const budgetExp = document.querySelector('.budget__expenses--value');
  const budgetPercentage = document.querySelector(
    '.budget__expenses--percentage'
  );

  budget.innerText = `${formatNumber(total)} `;
  budgetInc.innerText = `+ ${totalINC} `;
  budgetExp.innerText = `- ${totalEXP} `;
  budgetPercentage.innerText = `${percentage}%`;
};

export const renderList = (type, obj, percentage) => {
  const inc = document.querySelector('.income__list');
  const exp = document.querySelector('.expenses__list');
  const percentageUpdate = renderPercentage(percentage);

  let markup;
  if (type) {
    markup = `
      <div class="item clearfix" id="${type === 'exp' ? 'exp' : 'inc'}-${
      obj.id
    }">
          <div class="item__description">${obj.des}</div>
          <div class="right clearfix">
              <div class="item__value">${formatNumber(obj.val)}</div>
              ${
                type === 'exp'
                  ? `<div class="item__percentage">${percentageUpdate}%</div>`
                  : ''
              }
              <div class="item__delete">
                  <button class="item__delete--btn"><i class="ion-ios-close-outline"></i>
                  </button>
              </div>
          </div>
      </div>
   `;
    type === 'exp'
      ? exp.insertAdjacentHTML('beforeend', markup)
      : inc.insertAdjacentHTML('beforeend', markup);
  }
};

export const removeList = (type, parent) => {
  const container = document.querySelector(`.${type}__list`);
  container.removeChild(parent);
};
