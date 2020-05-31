//get elements
const itemList = document.querySelector('.items');
const httpForm = document.getElementById('httpForm');
const itemInput = document.getElementById('itemInput');
const imageInput = document.getElementById('imageInput');
const feedback = document.querySelector('.feedback');
const items = document.querySelector('.items');
const submtiBtn = document.getElementById('submitBtn');
let editedItemID = 0;

let baseURL = `https://5eceb7c461c848001670196a.mockapi.io`;

httpForm.addEventListener('submit', submitItem);

// load items
document.addEventListener('DOMContentLoaded', function () {
  getItemsAPI(showItems);
});

// show item
function submitItem(e) {
  e.preventDefault();
  const itemValue = itemInput.value;
  const imageValue = imageInput.value;

  if (itemValue.trim() === '' || imageValue.trim() === '') {
    showFeedback('please enter valid values');
  } else {
    postItemAPI(imageValue, itemValue);
    imageInput.value = '';
    itemValue.value = '';
  }
}

function showFeedback(text) {
  feedback.classList.add('showItem');
  feedback.innerHTML = `<p>${text}</p>`;

  setTimeout(() => {
    feedback.classList.remove('showItem');
  }, 1300);
}

// get items
function getItemsAPI(cb) {
  const url = 'https://5eceb7c461c848001670196a.mockapi.io/articles/';
  const ajax = new XMLHttpRequest();

  ajax.open('GET', url, true);

  ajax.onload = function () {
    if (this.status === 200) {
      console.log((this.response = 'ok success status 200'));

      cb(this.responseText);
    } else {
      this.onerror;
    }
  };

  ajax.onerror = function () {
    console.log('This is error');
  };

  ajax.send();
}

// show items
function showItems(data) {
  const items = JSON.parse(data);

  let input = '';
  items.forEach((item) => {
    input += `
      <li class="list-group-item d-flex align-items-center justify-content-between flex-wrap item my-2">
        <img src="${item.image}" id="itemImage" class="itemImage img-thumbnail" alt="">
        <h6 id="itemName" class="text-capitalize itemName">${item.name}</h6>
        <div class="icons">
        <a href="#" class="itemIcon mx-2 edit-icon" data-id="${item.id}">
        <i class="fas fa-edit"></i>
        </a>
        <a href="#" class="itemIcon mx-2 delete-icon" data-id="${item.id}">
        <i class="fas fa-trash"></i>
        </a>
        </div>
      </li>
    `;
  });
  itemList.innerHTML = input;

  // get Icons
  getIcons();
}

function getIcons() {
  const editIcon = document.querySelectorAll('.edit-icon');
  const deleteIcon = document.querySelectorAll('.delete-icon');

  deleteIcon.forEach((icon) => {
    icon.addEventListener('click', (e) => {
      e.preventDefault();
      const id = e.target.dataset.id;
      deleteItemAPI(id);
    });
  });

  editIcon.forEach((icon) => {
    icon.addEventListener('click', (e) => {
      e.preventDefault();
      const id = e.target.dataset.id;
      const parent = e.currentTarget.parentElement.parentElement;
      const img = parent.querySelector('.itemImage').src;
      const name = parent.querySelector('.itemName').textContent;
      itemList.removeChild = parent;
      editedItemID = id;
      editItemUI(parent, img, name, id);
    });
  });
}

function postItemAPI(imgValue, nameValue) {
  const url = 'https://5eceb7c461c848001670196a.mockapi.io/articles/';
  const ajax = new XMLHttpRequest();

  const img = `img/${imgValue}.jpeg`;
  const name = nameValue;

  ajax.open('POST', url, true);

  ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  ajax.onload = function () {
    if (this.status === 200) {
      getItemsAPI(showItems);
    } else {
      console.log(this.onerror);
    }
  };

  ajax.onerror = function () {
    console.log('POST is error');
  };

  ajax.send(`image="${img}"&name="${name}"`);
}

function deleteItemAPI(id) {
  const url = `https://5eceb7c461c848001670196a.mockapi.io/articles/${id}`;
  const ajax = new XMLHttpRequest();

  ajax.open('DELETE', url, true);

  ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  ajax.onload = function () {
    if (this.status === 200) {
      getItemsAPI(showItems);
    } else {
      console.log(this.onerror);
    }
  };

  ajax.onerror = function () {
    console.log('DELETE is error');
  };

  ajax.send();
}

function editItemUI(parent, itemImg, name, itemID) {
  event.preventDefault();

  itemList.removeChild(parent);

  const imgIndex = itemImg.indexOf('img/');
  const jpegIndex = itemImg.indexOf('.jpeg');

  const img = itemImg.slice(imgIndex + 4, jpegIndex);

  itemInput.value = name.trim();
  imageInput.value = img;
  submtiBtn.innerHTML = 'Edit Item';
  editedItemID = itemID;

  httpForm.removeEventListener('submit', submitItem);
  httpForm.addEventListener('submit', editItemAPI);
}

function editItemAPI() {
  event.preventDefault();
  const id = editedItemID;

  const itemValue = itemInput.value;
  const imageValue = imageInput.value;

  if (itemValue.trim() === '' || imageValue.trim() === '') {
    showFeedback('값 입력하세요 둘 다');
  } else {
    const img = `img/${imageValue}.jpeg`;
    const name = itemValue;
    const url = `https://5eceb7c461c848001670196a.mockapi.io/articles/${id}`;
    const ajax = new XMLHttpRequest();

    ajax.open('PUT', url, true);

    ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    ajax.onload = function () {
      reverseForm();
    };

    ajax.onerror = function () {
      console.log('PUT is error');
    };

    ajax.send(`image=${img}&name=${name}`);
  }
}

function reverseForm() {
  itemInput.value = '';
  imageInput.value = '';
  submtiBtn.innerHTML = 'Add Item';
  httpForm.removeEventListener('submit', editItemAPI);
  httpForm.addEventListener('submit', submitItem);
  getItemsAPI(showItems);
}
