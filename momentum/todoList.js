const toDoForm = document.querySelector('.js-toDoForm'),
      toDoInput = toDoForm.querySelector('input'),
      toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'currentValue';

let toDos = [];


function delFn(e) {
  const btn = e.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  // 조건에 걸쳐서 필터링 후 마지막에 array 반환
  const cleanToDos = toDos.filter(clean => {
    // 객체 id 값과 li id 값이 다른 나머지만 배열로 반환해서 넣어야하기 떄문에 !== 써야함 
    return clean.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

// toDo 텍스트 핸들링
function paintToDo(text) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const delBtn = document.createElement('button');
  const newID = toDos.length + 1;
  span.innerText = text;
  delBtn.innerText = '❌';
  delBtn.addEventListener('click', delFn);
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newID;
  toDoList.appendChild(li);
  
  // 데이터 저장하기 위한 객체, 배열로 넘길 것임.
  // 왜? 값으로 넘긴 데이터를 어플에 보존하기 위해서임.
  const toDoObj = {
    text: text,
    id: newID
  };
  toDos.push(toDoObj);
  saveToDos();
}

// 인풋 핸들링
function handleSubmit(e) {
  e.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = '';
}

// 로컬 스토리지 불러오기 
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  // 로컬스토리지가 비어 있지 않다면
  if(loadedToDos !== null) {
    const parsedToDo = JSON.parse(loadedToDos);
    console.log(parsedToDo);

    // 배열을 뷰에다가 뿌리기 위해서 hof 이용.
    parsedToDo.forEach(todo => {
      console.log(todo.text);
      paintToDo(todo.text);
    })
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener('submit', handleSubmit);
}
init();