//get elements
const itemList = document.querySelector('.items');
const httpForm = document.getElementById('httpForm');
const itemInput = document.getElementById('itemInput');
const imageInput = document.getElementById('imageInput');
const feedback = document.querySelector('.feedback');
const items = document.querySelector('.items');
const submtiBtn = document.getElementById('submitBtn');
let editedItemID = 0;

const url = `https://5eceb7c461c848001670196a.mockapi.io/article`;

// load items
document.addEventListener('DOMContentLoaded', () => {
  // get items
  getItemsAPI(showItems);
});

httpForm.addEventListener('submit', submitItem);

function submitItem(e) {
  e.preventDefault();
  const itemValue = itemInput.value;
  const imageValue = imageInput.value;

  if (itemValue === 0 || imageValue === 0) {
    showFeedback('please enter valid values');
  } else {
    postItemAPI(imageValue, itemValue);
    imageInput.value = '';
    itemInput.value = '';
  }
}

// show Feedback
function showFeedback(text) {
  feedback.classList.add('showItem');
  feedback.innerHTML = `<p>${text}</p>`;

  setTimeout(() => {
    feedback.classList.remove('showItem');
  }, 2000);
}

// get items
function getItemsAPI(cb) {
  const url = `https://5eceb7c461c848001670196a.mockapi.io/articles`;
  const ajax = new XMLHttpRequest();

  ajax.open('GET', url);

  ajax.onload = function () {
    if (this.status === 200) {
      cb(this.responseText);
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

  itemList.innerHTML = info;
  // get icons
  getIcons();
}

function postItemAPI(imageValue, itemValue) {
  const avatar = `img/${imageValue}.jpeg`;
  const name = itemValue;

  const url = `https://5eceb7c461c848001670196a.mockapi.io/articles`;
  const ajax = new XMLHttpRequest();

  ajax.setRequestHeader('Content-Type', 'application/json');

  ajax.open('POST', url);

  ajax.onload = function () {
    if (this.status === 200) {
      getItemsAPI(showItems);
    } else {
      console.log('something went wrong');
    }
  };

  ajax.onerror = function () {
    alert('post is error');
  };

  ajax.send(`avatar=${avatar}&name=${name}`);
}

function getIcons() {
  const editIcon = document.querySelectorAll('.edit-icon');
  const deleteIcon = document.querySelectorAll('.delete-icon');

  deleteIcon.forEach((icon) => {
    const itemID = icon.dataset.id;
    console.log(itemID);
    icon.addEventListener('click', (e) => {
      e.preventDefault();
      // const target = e.currentTarget.dataset.id;
      deleteItemAPI(itemID);
    });
  });

  editIcon.forEach((icon) => {
    const itemID = icon.dataset.id;
    console.log(itemID);
    icon.addEventListener('click', (e) => {
      e.preventDefault();
      // const target = e.currentTarget.dataset.id;
      deleteItemAPI(itemID);
    });
  });
}

// delete user
function deleteItemAPI(id) {
  const url = `https://5eceb7c461c848001670196a.mockapi.io/articles/${id}`;
  const ajax = new XMLHttpRequest();

  ajax.open('DELETE', url);

  ajax.onload = function () {
    if (this.status === 200) {
      getItemsAPI(showItems);
    } else {
      console.log('something went wrong');
    }
  };

  ajax.onerror = function () {
    console.log('there was an error');
  };

  ajax.send();
}
