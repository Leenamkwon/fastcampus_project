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

export const renderBudget = (data) => {
  const { percentage, total, totalINC, totalEXP } = data;
};

export const renderList = (type, obj) => {
  const inc = document.querySelector('.income__list');
  const exp = document.querySelector('.expenses__list');
  let markup;
  console.log(obj);
  if (type === 'exp') {
    markup = `
      <div class="item clearfix" id="expense-${obj.id}">
          <div class="item__description">${obj.des}</div>
          <div class="right clearfix">
              <div class="item__value">- ${formatNumber(obj.val)}</div>
              <div class="item__percentage">${obj.percentage}%</div>
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
