const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const formArr = [username, email, password, password2];

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = `${message}`;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function isValidEmail(email) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!regex.test(email.value)) {
    showError(email, `${toUpperCase(email.id)} is not email`);
  } else {
    showSuccess(email);
  }
}

function toUpperCase(text) {
  const text1 = text.slice(0, 1).toUpperCase() + text.slice(1);
  return `${text1}`;
}

function checkRequired(arr) {
  arr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${toUpperCase(input.id)} is not value`);
    } else {
      showSuccess(input);
      input.value = '';
    }
  });
}

function checkLength(input, min, max) {
  if (input.value > min && input.value < max) {
    showSuccess(input);
  } else if (input.value < min) {
    showError(input, `${toUpperCase(input.id)} is min than lower`);
  } else if (input.value > min) {
    showError(input, `${toUpperCase(input.id)} is max than high`);
  }
}

function matchPassword(ps1, ps2) {
  if (ps1.value !== ps2.value) {
    showError(ps1, `${toUpperCase(input.id)} is not same`);
  } else {
  }
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  checkRequired(formArr);
  checkLength(username, 3, 15);
  checkLength(password, 6, 20);
  isValidEmail(email);
  matchPassword(password, password2);
});
