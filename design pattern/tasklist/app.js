class Task {
  constructor() {
    this.form = document.querySelector('#task-form');
    this.taskList = document.querySelector('.collection');
    this.clearBtn = document.querySelector('.clear-tasks');
    this.filter = document.querySelector('#filter');
    this.taskInput = document.querySelector('#task');
    this.loadEventListeners();
    this.state = [];
    this.id;
  }

  // MODEL
  uniqid() {
    this.state.length === 0
      ? false
      : (this.state[this.state.length - 1].id = this.state.length);
  }

  removeData(id) {
    this.state = this.state.filter((data) => data.id !== id);
    console.log(this.state);
  }

  // CONTROLLER
  loadEventListeners() {
    this.form.addEventListener('submit', this.addTask.bind(this));
    this.taskList.addEventListener('click', this.removeTask.bind(this));
    this.clearBtn.addEventListener('click', this.clearTask.bind(this));
    this.filter.addEventListener('keyup', this.filterTask.bind(this));
  }

  removeTask(e) {
    if (e.target.closest('.delete-item')) {
      if (confirm('Are You Sure?')) {
        this.removeData(+e.target.closest('.delete-item').dataset.id);
        this.taskList.removeChild(
          e.target.closest('.delete-item').parentElement
        );
      }
    }
  }

  addTask(e) {
    e.preventDefault();
    if (this.taskInput.value === '') alert('Add a Task');
    this.state.push({ task: this.taskInput.value });
    this.uniqid();
    this.makingList();
    this.taskInput.value = '';
  }

  clearTask() {
    if (confirm('정말 지우실 건가요? 복구 불가입니다.')) {
      this.state = [];
      this.taskList.innerHTML = '';
    }
  }

  filterTask(e) {
    const text = e.target.value.toLowerCase();
    [...document.querySelectorAll('.collection-item')].forEach((task) => {
      const item = task.innerText;
      if (item.toLowerCase().indexOf(text) !== -1) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    });
  }

  // VIEW
  makingList() {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.textContent = this.taskInput.value;
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.setAttribute('data-id', this.state.length);
    link.innerHTML = `<i class="fa fa-remove"></i>`;
    li.appendChild(link);
    this.taskList.appendChild(li);
  }
}

const task = new Task();
