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
httpForm.addEventListener('click', submitItem);

// get items
function getItemsAPI(callback) {
  const url = 'https://5eceb7c461c848001670196a.mockapi.io/articles';
  const ajax = new XMLHttpRequest();

  ajax.open('GET', url, true);

  ajax.onload = function () {
    if (this.status === 200) {
      callback(this.responseText);
    } else {
      this.onerror('i');
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
    <img src="${item.image}" id='itemImage' class='itemImage img-thumbnail' alt="">
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
}
