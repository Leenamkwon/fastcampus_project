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
    return `${type === 'inc' ? '+' : '-'}${num}`;
  }
};

export const renderPercentage = (per) => {
  const percentage = document.querySelectorAll('.item__percentage');
  if (percentage.length > 0) {
    per.forEach((el, index) => {
      percentage[index].innerText = Math.round(el.percentage) + '%';
    });
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

  budget.innerText = `${formatNumber(total, 'inc')} `;
  budgetInc.innerText = `${formatNumber(totalINC, 'inc')} `;
  budgetExp.innerText = `${formatNumber(totalEXP, 'exp')} `;
  budgetPercentage.innerText = `${formatNumber(percentage)}%`;
};

export const renderList = (type, obj) => {
  const inc = document.querySelector('.income__list');
  const exp = document.querySelector('.expenses__list');

  let markup;
  if (type) {
    markup = `
      <div class="item clearfix" id="${type === 'exp' ? 'exp' : 'inc'}-${
      obj.id
    }">
          <div class="item__description">${obj.des}</div>
          <div class="right clearfix">
              <div class="item__value">${formatNumber(obj.val, type)}</div>
              ${type === 'exp' ? `<div class="item__percentage">0%</div>` : ''}
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

export const renderDate = () => {
  const dateText = document.querySelector('.budget__title--month');
  const daysKOR = ['월', '화', '수', '목', '금', '토', '일'];

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const days = now.getDay();
  const date = now.getDate();

  dateText.innerText = `${year}년 ${month}월 ${date}일 ${daysKOR[days]}`;
};

export const changeType = () => {
  const type = document.querySelector('.add__type');
  const des = document.querySelector('.add__description');
  const value = document.querySelector('.add__value');
  const btn = document.querySelector('.add__btn');
  if (type.value === 'exp') {
    [type, des, value].forEach((el) => el.classList.add('red-focus'));
    btn.style.color = 'red';
  } else if (type.value === 'inc') {
    [type, des, value].forEach((el) => el.classList.remove('red-focus'));
    btn.style.color = '#28b9b5';
  }
  des.focus();
};
