class GitHub {
  constructor() {
    this.client_id = `68f0b364e8f27175b572`;
    this.client_secret = `ea9a4fd78d2348f1879cf41ea0fbf053a5f8c85a`;
    this.repos_count = 10;
    this.repos_sort = 'created: asc';
  }

  async getUser(user) {
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    const repoResponse = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    const profile = await profileResponse.json();
    const repos = await repoResponse.json();

    console.log(profile);
    return {
      profile,
      repos,
    };
  }
}
