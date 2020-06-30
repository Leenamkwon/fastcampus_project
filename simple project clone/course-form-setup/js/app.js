(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const display = new Display();
    display.checkFields();
    display.hideSubmit();
  });

  // add customer on submit
  document
    .getElementById('customer-form')
    .addEventListener('submit', function (e) {
      e.preventDefault();

      const display = new Display();
      const name = display.name.value;
      const course = display.course.value;
      const author = display.author.value;

      let customer = { name, course, author };

      display.feedback(customer);
      display.clearFields();
      document.querySelector('.submitBtn').disabled = true;
    });

  function Display() {
    this.name = document.getElementById('name');
    this.course = document.getElementById('course');
    this.author = document.getElementById('author');
    this.customers = document.querySelector('.customer-list');
    this.tempArr = [this.name, this.course, this.author];
  }

  Display.prototype.checkFields = function () {
    this.tempArr.forEach((valueInput) => {
      valueInput.addEventListener('input', this.validateField);
    });
  };

  Display.prototype.validateField = function () {
    if (this.value.trim() === '') {
      this.classList.remove('complete');
      this.classList.add('fail');
    } else {
      this.classList.add('complete');
      this.classList.remove('fail');
    }

    const complete = document.querySelectorAll('.complete');
    if (complete.length === 3) {
      document.querySelector('.submitBtn').disabled = false;
    } else {
      document.querySelector('.submitBtn').disabled = true;
    }
  };

  Display.prototype.hideSubmit = function () {
    const btn = document.querySelector('.submitBtn');
    btn.disabled = true;
  };

  Display.prototype.feedback = function (customer) {
    const feedback = document.querySelector('.feedback');
    const loading = document.querySelector('.loading');

    feedback.classList.add('showItem', 'alert', 'alert-success');
    loading.classList.add('showItem');
    const self = this;
    setTimeout(() => {
      feedback.classList.remove('showItem', 'alert', 'alert-success');
      loading.classList.remove('showItem');
      self.addCustomer(customer);
    }, 1000);
  };

  Display.prototype.addCustomer = function (customer) {
    const div = document.createElement('div');
    const { name, course, author } = customer;
    const random = Math.floor(Math.random() * 5);
    div.classList.add('col-11', 'mx-auto', 'col-md-6', 'my-3', 'col-lg-4');

    div.innerHTML = `
    <div class="card text-left">
    <img src="img/cust-${random}.jpg" class="card-img-top" alt="">
    <div class="card-body">
     <!-- customer name -->
     <h6 class="text-capitalize "><span class="badge badge-warning mr-2">name :</span><span id="customer-name">${name}</span></h6>
     <!-- end of customer name -->
     <!-- customer name -->
     <h6 class="text-capitalize my-3"><span class="badge badge-success mr-2">course :</span><span id="customer-course">
       ${course}
      </span></h6>
     <!-- end of customer name -->
     <!-- customer name -->
     <h6 class="text-capitalize"><span class="badge badge-danger mr-2">author :</span><span id="course-author">${author}</span></h6>
     <!-- end of customer name -->
    </div>
   </div>
    `;
    this.customers.appendChild(div);
  };

  Display.prototype.clearFields = function () {
    this.tempArr.forEach((items) => {
      items.value = '';
      items.classList.remove('complete', 'fail');
    });
  };
})();
