const UICtrl = (() => {
  return {
    populateItemList(items) {
      let html = '';

      items.forEach((item) => {
        html += `<li class="collection-item" id="item-${item.id}">
                 <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                 <a href="#" class="secondary-content">
                   <i class="edit-item fa fa-pencil"></i>
                 </a>
                 </li>`;
      });

      // Insert list items
      document.querySelector('#item-list').innerHTML = html;
    },
  };
})();

export default UICtrl;
