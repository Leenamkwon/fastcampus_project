export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResult() {
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/search?&q=${this.query}`
      );
      const data = await res.json();
      const recipes = data.recipes;

      this.results = recipes;
    } catch (error) {
      alert(error);
    }
  }
}
