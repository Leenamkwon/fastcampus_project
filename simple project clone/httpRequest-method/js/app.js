//get elements
const itemList = document.querySelector('.items');
const httpForm = document.getElementById('httpForm');
const itemInput = document.getElementById('itemInput');
const imageInput = document.getElementById('imageInput');
const feedback = document.querySelector('.feedback');
const itemsContainer = document.querySelector('.items');
const submtiBtn = document.getElementById('submitBtn');
let editedItemID = 0;

// load items
document.addEventListener('DOMContentLoaded', () => {
  getItemsAPI(showItems);
});

httpForm.addEventListener('submit', submitItem);

function submitItem(e) {
  e.preventDefault();
  const itemValue = itemInput.value;
  const imageValue = imageInput.value;

  if (itemValue.length === 0 || imageValue.length === 0) {
    showFeedback('please enter valid values');
  } else {
    postItemsAPI(itemValue, imageValue);
  }
}

function showFeedback(text) {
  feedback.classList.add('showItem');
  feedback.innerHTML = `<p>${text}</p>`;
  setTimeout(() => {
    feedback.classList.remove('showItem');
  }, 1500);
}

// get items
function getItemsAPI(callback) {
  const url = 'https://5eceb7c461c848001670196a.mockapi.io/articles';
  const ajax = new XMLHttpRequest();

  ajax.open('GET', url);

  ajax.onload = function () {
    if (this.status === 200) {
      callback(this.responseText);
    } else {
      console.log('something went wrong');
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
  itemsContainer.innerHTML = info;

  // get Icons
  getIcon();
}

function postItemsAPI(itemName, img) {
  const avatar = `img/${img}.jpeg`;
  const name = itemName;

  const url = 'https://5eceb7c461c848001670196a.mockapi.io/articles';

  const ajax = new XMLHttpRequest();

  ajax.open('POST', url);

  ajax.setRequestHeader('Content-TYPE', 'application/x-www.form-urlencoded');

  ajax.onload = function () {
    if (this.status === 200) {
      getItemsAPI(showItems);
    } else {
      this.onerror;
    }
  };

  ajax.onerror = function () {
    console.log('POST is error');
  };

  ajax.send(`name=${name}&image=${avatar}`);
}

function getIcon() {
  const editIcon = document.querySelectorAll('.edit-icon');
  const deleteIcon = document.querySelectorAll('.delete-icon');

  editIcon.forEach((edit) => {
    edit.addEventListener('click', (e) => {
      e.preventDefault();
      const itemID = e.currentTarget.dataset.id;
      const parent = e.currentTarget.parentElement.parentElement;
      const img = parent.querySelector('.itemImage').src;
      const name = parent.querySelector('.itemName').textContent;

      editItemUI(parent, img, name, itemID);
    });
  });

  deleteIcon.forEach((edit) => {
    edit.addEventListener('click', (e) => {
      e.preventDefault();
      const itemID = e.currentTarget.dataset.id;
      deleteItemAPI(itemID);
    });
  });
}

function deleteItemAPI(id) {
  const url = `https://5eceb7c461c848001670196a.mockapi.io/articles${id}`;

  const ajax = new XMLHttpRequest();

  ajax.open('DELETE', url);

  ajax.setRequestHeader('Content-TYPE', 'application/x-www.form-urlencoded');

  ajax.onload = function () {
    if (this.status === 200) {
      getItemsAPI(showItems);
    } else {
      this.onerror;
    }
  };

  ajax.onerror = function () {
    console.log('POST is error');
  };

  ajax.send();
}

function editItemUI(parent, itemImg, name, itemID) {
  event.preventDefault();
  itemsContainer.removeChild(parent);

  const imgIndex = itemImg.indexOf('img/');
  const jpegIndex = itemImg.indexOf('.jpeg');
  const img = itemImg.slice(imgIndex + 4, jpegIndex);
  editedItemID = itemID;

  itemInput.value = name.trim();
  imageInput.value = img;
  submtiBtn.innerHTML = 'Edit item';
  httpForm.removeEventListener('submit', submitItem);
  httpForm.addEventListener('submit', editItemAPI);
}

function editItemAPI(e) {
  e.preventDefault();
  const itemValue = itemInput.value;
  const imageValue = imageInput.value;
  const id = editedItemID;

  if (itemValue.length === 0 || imageValue.length === 0) {
    showFeedback('please enter valid values');
  } else {
    const img = `img/${imageValue}.jpeg`;
    const name = itemValue;

    const url = `https://5eceb7c461c848001670196a.mockapi.io/articles${id}`;

    const ajax = new XMLHttpRequest();

    ajax.open('PUT', url);

    ajax.setRequestHeader('Content-TYPE', 'application/x-www.form-urlencoded');

    ajax.onload = function () {
      if (this.status === 200) {
        reverseForm();
      } else {
        this.onerror;
      }
    };

    ajax.onerror = function () {
      console.log('POST is error');
    };

    ajax.send(`name=${name}&image=${img}`);
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
