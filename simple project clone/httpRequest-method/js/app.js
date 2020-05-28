//get elements
const itemList = document.querySelector('.items');
const httpForm = document.getElementById('httpForm');
const itemInput = document.getElementById('itemInput');
const imageInput = document.getElementById('imageInput');
const feedback = document.querySelector('.feedback');
const items = document.querySelector('.items');
const submtiBtn = document.getElementById('submitBtn');
let editedItemID = 0;

// load items
document.addEventListener('DOMContentLoaded', () => {
  getItemsAPI(showItems);
});

// submit item
httpForm.addEventListener('submit', submitItem);

// submit item function
function submitItem(e) {
  e.preventDefault();
  const itemValue = itemInput.value;
  const imageValue = imageInput.value;

  if (itemValue.trim() === '' || imageValue.trim() === '') {
    showFeedback('please enter valid values');
  } else {
    postItemAPI(imageValue, itemValue);
    imageInput.value = '';
    itemInput.value = '';
  }
}

function showFeedback(text) {
  feedback.classList.add('showItems');
  feedback.innerHTML = `<p>${text}</p>`;

  setTimeout(() => {
    feedback.classList.remove('showItems');
  }, 1300);
}

// get items
function getItemsAPI(callback) {
  const url = 'https://5eceb7c461c848001670196a.mockapi.io/articles';
  const ajax = new XMLHttpRequest();

  ajax.open('GET', url, true);

  ajax.onload = function () {
    if (this.status === 200) {
      callback(this.responseText);
    } else {
      this.onerror('error');
    }
  };

  ajax.onerror = function () {
    console.log('there was an error');
  };

  ajax.send();
}

// show items
function showItems(data) {
  const items = JSON.parse(data);

  let info = '';
  items.forEach((item) => {
    info += `
    <li class="list-group-item d-flex align-items-center justify-content-between flex-wrap item my-2">
    <img src="${item.image}" id='itemImage' class='itemImage img-thumbnail' alt="${item.name}">
    <h6 id="itemName" class="text-capitalize itemName">${item.name}</h6>
    <div class="icons">

     <a href='#' class="itemIcon mx-2 edit-icon" data-id='${item.id}'>
      <i class="fas fa-edit"></i>
     </a>
     <a href='#' class="itemIcon mx-2 delete-icon" data-id='${item.id}'>
      <i class="fas fa-trash"></i>
     </a>
    </div>
   </li>
      `;
  });

  itemList.innerHTML = info;
  // get Icons
  getIcons();
}

function postItemAPI(img, name) {
  const foodImg = `img/${img}.jpeg`;
  const foodName = name;

  const url = 'https://5eceb7c461c848001670196a.mockapi.io/articles';
  const ajax = new XMLHttpRequest();

  ajax.open('POST', url, true);

  ajax.onload = function () {
    getItemsAPI(showItems);
  };

  ajax.onerror = function () {
    console.log('there was an error');
  };

  ajax.send(`image=${foodImg}&name=${foodName}`);
}

// get icons
function getIcons() {
  const editIcon = document.querySelectorAll('.edit-icon');
  const deleteIcon = document.querySelectorAll('.delete-icon');

  deleteIcon.forEach((icon) => {
    icon.addEventListener('click', (e) => {
      e.preventDefault();
      const id = e.currentTarget.dataset.id;
      deleteItemAPI(id);
    });
  });

  editIcon.forEach((icon) => {
    icon.addEventListener('click', (e) => {
      e.preventDefault();
      const id = e.currentTarget.dataset.id;
      const parent = e.target.parentElement.parentElement.parentElement;
      const img = parent.querySelector('.itemImage').src;
      const name = parent.querySelector('.itemName').textContent;
      editItemUI(parent, img, name, id);
    });
  });
}

// delete item
function deleteItemAPI(id) {
  const url = `https://5eceb7c461c848001670196a.mockapi.io/articles/${id}`;
  const ajax = new XMLHttpRequest();

  ajax.open('DELETE', url, true);

  ajax.onload = function () {
    if (this.status === 200) {
      getItemsAPI(showItems);
    } else {
      this.onerror('error');
    }
  };

  ajax.onerror = function () {
    console.log('there was an error');
  };

  ajax.send();
}

function editItemUI(parent, itemImg, name, itemID) {
  event.preventDefault();

  itemList.removeChild(parent);

  const imgIndex = itemImg.indexOf('img/');
  const jpegIndex = itemImg.indexOf('.jepg');

  const img = itemImg.slice(imgIndex + 4, jpegIndex);

  itemInput.value = name.trim();
  imageInput.value = img;
  editedItemID = itemID;
  submtiBtn.innerHTML = `Edit item`;
  httpForm.removeEventListener('submit', submitItem);
  httpForm.addEventListener('submit', editItemAPI);
}

// edit item
function editItemAPI(id) {
  event.preventDefault();
  const url = `https://5eceb7c461c848001670196a.mockapi.io/articles/${id}`;
  const ajax = new XMLHttpRequest();

  ajax.open('PUT', url, true);

  ajax.onload = function () {
    if (this.status === 200) {
      getItemsAPI(showItems);
    } else {
      this.onerror('error');
    }
  };

  ajax.onerror = function () {
    console.log('there was an error');
  };

  ajax.send();
}
