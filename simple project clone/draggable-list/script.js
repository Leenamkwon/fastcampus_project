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
  dragStartIndex = this.closest('li').getAttribute('data-index');
}

function dragEnter() {
  this.classList.add('over');
}

function dragLeave() {
  this.classList.remove('over');
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index');
  swap(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}

function swap(start, end) {
  const startItem = listItems[start].querySelector('.draggable');
  const endItem = listItems[end].querySelector('.draggable');

  listItems[start].appendChild(endItem);
  listItems[end].appendChild(startItem);
}

function checkOrder() {}

function addEventListener() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItem = document.querySelectorAll('.draggable-list li');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItem.forEach((li) => {
    li.addEventListener('dragover', dragOver);
    li.addEventListener('dragenter', dragEnter);
    li.addEventListener('dragleave', dragLeave);
    li.addEventListener('drop', dragDrop);
  });
}

check.addEventListener('click', checkOrder);
