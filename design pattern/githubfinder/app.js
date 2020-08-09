const github = new GitHub();
const ui = new UI();

const debounce = (() => {
  let timeoutId;

  return (txt, delay = 1000) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(getUser, delay, txt);
  };
})();

const getUser = (txt) => {
  if (!txt.length) {
    ui.clearProfile();
    ui.clearAlert();
    return;
  }

  github.getUser(txt).then((data) => {
    if (data.profile.message === 'Not Found') {
      ui.showAlert('User Not Found', 'alert alert-danger');
    } else {
      // show profile
      ui.clearAlert();
      ui.showProfile(data.profile);
    }
  });
};

document.querySelector('#searchUser').addEventListener('input', (e) => {
  const userText = e.target.value;
  debounce(userText, 800);
});
