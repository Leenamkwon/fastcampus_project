export const getInput = () => {
  const type = document.querySelector('.add__type').value;
  const description = document.querySelector('.add__description').value;
  const value = document.querySelector('.add__value').value;
  return { type, description, value };
};

// num = 10000 -> 10,000
// 5,000,000
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

export const clearValue = () => {
  const description = document.querySelector('.add__description');
  const value = document.querySelector('.add__value');
  [description, value].forEach((el) => (el.value = ''));
  description.focus();
};

// percentage: this.percentage,
//   total: this.budget,
//     totalINC: this.totals['inc'],
//       totalEXP: this.totals['exp']

export const renderBudget = (data, type) => {
  const { percentage, total, totalINC, totalEXP } = data;

  const budget = document.querySelector('.budget__value');
  const budgetInc = document.querySelector('.budget__income--value');
  const budgetExp = document.querySelector('.budget__expenses--value');
  const budgetPercentage = document.querySelector(
    '.budget__expenses--percentage'
  );

  budget.innerText = `${total} KRW`;
  budgetInc.innerText = `+ ${totalINC} KRW`;
  budgetExp.innerText = `- ${totalEXP} KRW`;
  budgetPercentage.innerText = `${percentage}%`;
};

export const renderList = (type, obj) => {
  const inc = document.querySelector('.income__list');
  const exp = document.querySelector('.expenses__list');
  let markup;
  if (type === 'exp') {
    markup = `
      <div class="item clearfix" id="expense-${obj.id}">
          <div class="item__description">${obj.des}</div>
          <div class="right clearfix">
              <div class="item__value">- ${formatNumber(obj.val)}</div>
              <div class="item__percentage">20%</div>
              <div class="item__delete">
                  <button class="item__delete--btn" data-id="${
                    obj.id
                  }"><i class="ion-ios-close-outline"></i>
                  </button>
              </div>
          </div>
      </div>
   `;
    exp.insertAdjacentHTML('beforeend', markup);
  } else if (type === 'inc') {
    markup = `
      <div class="item clearfix" id="income-0">
        <div class="item__description">${obj.des}</div>
        <div class="right clearfix">
         <div class="item__value">+ ${formatNumber(obj.val)}</div>
         <div class="item__delete">
          <button class="item__delete--btn" data-id="${obj.id}">
           <i class="ion-ios-close-outline"></i>
          </button>
         </div>
        </div>
      </div>`;
    inc.insertAdjacentHTML('beforeend', markup);
  }
};
