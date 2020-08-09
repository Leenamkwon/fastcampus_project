class GitHub {
  constructor() {
    this.client_id = `68f0b364e8f27175b572`;
    this.client_secret = `ea9a4fd78d2348f1879cf41ea0fbf053a5f8c85a`;
  }

  async getUser(user) {
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    const profile = await profileResponse.json();

    console.log(profile);
    return {
      profile,
    };
  }
}
