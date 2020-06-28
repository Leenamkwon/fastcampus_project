const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page'
];

const listItems = [];

let dragStartIndex;

createListItem();

function createListItem() {
  [...richestPeople]
    .map((item) => ({ value: item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((item) => item.value)
    .forEach((person, index) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('data-index', index);
      listItem.innerHTML = `
    <span class="number">${index + 1}</span>
    <div class="draggable" draggable="true">
      <p class="person-name" ContentEditable="true" >${person}</p>
      <i class="fas fa-grip-lines"></i>
    </div>
    `;
      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });

  contenteditable();
  addEventListener();
}

function contenteditable() {
  const p = document.querySelectorAll('.person-name');
  p.forEach((item) =>
    item.addEventListener('blur', (e) => {
      let index = +e.target.parentElement.parentElement.dataset.index;
      if (index) richestPeople[index] = e.target.innerText;
    })
  );
}

function dragStart() {
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
  this.classList.add('over');
}

function dragOver(e) {
  e.preventDefault();
}

function dragLeave() {
  this.classList.remove('over');
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove('over');
}

function swapItems(FromIndex, toIndex) {
  const itemOne = listItems[FromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[FromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);

  listItems.forEach((item) => {
    console.log(item);
  });
}

function addEventListener() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

function checkOrder() {
  listItems.forEach((item, index) => {
    const order = listItems[index]
      .querySelector('.person-name')
      .innerText.trim();
    if (richestPeople[index] === order) {
      listItems[index].classList.remove('wrong');
      listItems[index].classList.add('right');
    } else {
      listItems[index].classList.add('wrong');
    }
  });
}

check.addEventListener('click', checkOrder);
