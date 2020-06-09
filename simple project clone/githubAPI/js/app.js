class GITHUB {
  constructor() {
    this.client_id = `68f0b364e8f27175b572`;
    this.client_secret = `ea9a4fd78d2348f1879cf41ea0fbf053a5f8c85a`;
    this.base = 'https://api.github.com/user/';
  }

  async ajaxUser(userValue) {
    // user url
    const userURL = `${this.base}${userValue}?client_id='${this.client_id}'&client_secret='${this.client_score}'`;

    // repos url
    const userData = await fetch(userURL);
    const user = await userData.json();

    return {
      user
    };
  }
}

class UI {}

(function () {
  const ui = new UI();
  const git = new GITHUB();

  const searchForm = document.getElementById('searchForm');
  const searchUser = document.getElementById('searchUser');
  const userList = document.getElementById('userList');

  searchForm.addEventListener('submit', (e) => {
    const Searchvalue = searchUser.value;
    e.preventDefault();
    if (Searchvalue === '') {
      console.log('hi');
    } else {
      git.ajaxUser(Searchvalue).then((data) => console.log(data));
    }
  });
})();
