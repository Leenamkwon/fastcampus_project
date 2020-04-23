const toDoForm = document.querySelector('.js-toDoForm'),
      toDoInput = toDoForm.querySelector('input'),
      toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDos';

let toDos = [];

function saveToDo() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function deleteToDos(e) {
  console.log(e);
  const target = e.target;
  const parent = target.parentNode;
  toDoList.removeChild(parent);
  const cleanToDos = toDos.filter(todo => {
    return todo.id !== Number(parent.id);
  });
  console.log(cleanToDos);
  toDos = cleanToDos;
  saveToDo();
}

function paintToDo(text) {
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  delBtn.innerText = "🥰";
  delBtn.addEventListener('click', deleteToDos);
  const span = document.createElement('span');
  const newID = toDos.length + 1;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newID;
  span.innerText = text;
  toDoList.appendChild(li);
  const arrObj = {
    toDos: text,
    id: toDos.length + 1
  }
  toDos.push(arrObj);
  saveToDo();
}

function handleSubmit(e) {
  e.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  this.reset();
}

function loadToDos() {
  const toDos = localStorage.getItem(TODOS_LS);
  if (toDos !== null) {
    const jsonParse = JSON.parse(toDos);
    jsonParse.forEach(item => {
      paintToDo(item.toDos);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener('submit', handleSubmit);
}

init();