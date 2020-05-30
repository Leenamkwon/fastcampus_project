class GITHUB {
  constructor() {
    this.client_id = '68f0b364e8f27175b572';
    this.client_secret = 'ea9a4fd78d2348f1879cf41ea0fbf053a5f8c85a';
    this.base = 'https://api.github.com/users/';
  }
  async ajaxUser(userValue) {
    const userURL = `${this.base}${userValue}?client_id=${this.client_id}&client_secret=${this.client_secret}`;

    const userData = await fetch(userURL);
    const user = await userData.json();

    return {
      user
    };
  }
}

class UI {
  constructor() {}
  // show feedback
  showFeedback(text) {
    const feedback = document.querySelector('.feedback');
    feedback.classList.add('showItem');
    feedback.innerHTML = `<p>${text}</p>`;
    setTimeout(() => {
      feedback.classList.remove('showItem');
    }, 3000);
  }
  // get user
  getUser(user) {
    const {
      avatar_url: image,
      html_url: link,
      public_repos: repos,
      name,
      login,
      message
    } = user;
    if (message === 'Not Found') {
      this.showFeedback('no such user exists, please enter a valid value');
    } else {
      this.displayUser(image, link, repos, name, login);
      const searchUser = document.getElementById('searchUser');
      searchUser.value = '';
    }
  }
  displayUser(image, link, repos, name, login) {}
}

(function () {
  const ui = new UI();
  const github = new GITHUB();

  const searchForm = document.getElementById('searchForm');
  const searchUser = document.getElementById('searchUser');
  const userList = document.getElementById('userList');

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const textValue = searchUser.value;

    if (textValue === '') {
      ui.showFeedback('please enter the user');
    } else {
      github.ajaxUser(textValue).then((data) => {});
    }
  });
})();
