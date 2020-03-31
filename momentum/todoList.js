const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos'

const toDos = [];

function deleteToDo(e) {
  console.log(e.target);
}

function setToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const delBtn = document.createElement('button');
  const newId = toDos.length + 1;
  delBtn.innerText = '❌';
  delBtn.addEventListener('click', deleteToDo);
  span.innerText = text; 
  toDoList.appendChild(li);
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId

  const toDoObj = {
    text: text,
    id: newId
  }
  toDos.push(toDoObj);
  setToDos();
}

function handleSubmit(e) {
  const currentValue = toDoInput.value;
  e.preventDefault();
  paintToDo(currentValue);
  toDoInput.value = '';
}

function something(toDo) {
  console.log(toDo.text);
}

function loadToDos(){
  const loadedtoDos = localStorage.getItem(TODOS_LS);
  if (loadedtoDos !== null) {
    const parsedToDos = JSON.parse(loadedtoDos);
    parsedToDos.forEach(function(todo){
      paintToDo(toDos.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener('submit', handleSubmit);
}
init();