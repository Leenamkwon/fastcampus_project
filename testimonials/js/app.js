(function () {
  let customers = [];
  let index = 0;
  // object constructor function
  function Customer(name, img, text) {
    this.name = name;
    this.img = img;
    this.text = text;
  }
  // create objects function

  function createCustomer(name, img, text) {
    // full img
    let fullImg = `img/customer-${img}.jpg`;
    // create new customer instance
    const customer = new Customer(name, fullImg, text);
    // add to customers
    customers.push(customer);
  }

  // call function
  createCustomer(
    'john',
    1,
    `Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sit voluptatum illo? Quae fugi aspernatur harum aperiam, quis eos officia.`
  );
  createCustomer(
    'bob',
    2,
    `Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sit voluptatum illo? Quae fugiat aspernatur harum aperiam, quis eos officia.`
  );
  createCustomer(
    'peter',
    3,
    `Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sit voluptatum illo? Quae fugiataspernatur harum aperiam, quis eos officia.`
  );
  createCustomer(
    'arnold',
    4,
    `Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sit voluptatum illo? Quae fugiat aspernatur harum aperiam, quis eos officia.`
  );

  // console.log(customers);

  document.querySelectorAll('.btn').forEach(function (item) {
    item.addEventListener('click', function (event) {
      event.preventDefault();
      if (event.target.parentElement.classList.contains('prevBtn')) {
        index--;
        if (index < 0) {
          index = customers.length;
        }
        document.getElementById('customer-img').src = customers[index].img;
        document.getElementById('customer-name').textContent =
          customers[index].name;
        document.getElementById('customer-text').textContent =
          customers[index].text;
      }
      // end of prev
      if (event.target.parentElement.classList.contains('nextBtn')) {
        index++;
        if (index > customers.length - 1) {
          index = 0;
        }
        document.getElementById('customer-img').src = customers[index].img;
        document.getElementById('customer-name').textContent =
          customers[index].name;
        document.getElementById('customer-text').textContent =
          customers[index].text;
      }
    });
  });
})();
