export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const result = await fetch(
        `https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
      );
      const data = await result.json();
      this.title = data.recipe.title;
      this.author = data.recipe.publisher;
      this.img = data.recipe.image_url;
      this.url = data.recipe.source_url;
      this.ingredients = data.recipe.ingredients;
    } catch (error) {
      console.log(error);
      alert('Something went wrong :');
    }
  }

  calcTime() {
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {
    const unitsLong = [
      'tablespoons',
      'tablespoon',
      'ounce',
      'ounces',
      'teaspoon',
      'teaspoons',
      'cups',
      'pounds'
    ];
    const unitsShort = [
      'tbsp',
      'tbsp',
      'oz',
      'oz',
      'tsp',
      'tsp',
      'cup',
      'pound'
    ];

    const newIngredients = this.ingredients.map((el) => {
      // Uniform units
      let ingredients = el.toLowerCase();

      unitsLong.forEach((unit, i) => {
        ingredients = ingredients.replace(unit, unitsShort[i]);
      });

      // Remove parentheses
      ingredients = ingredients.replace(/ *\([^)]*\) */g, '');
    });

    console.log(newIngredients);

    this.ingredients = newIngredients;
  }
}
