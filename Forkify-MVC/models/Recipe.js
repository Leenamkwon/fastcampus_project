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
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      // Remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      // Parse ingredients into count, unit and ingredient
      const arrIng = ingredient.split(' ');
      const unitIndex = arrIng.findIndex((el) => {
        unitsShort.includes(el);
      });

      let objIng;

      if (unitIndex > -1) {
      } else if (parseInt(arrIng[0], 10)) {
        // 1st element is number
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: '',
          ingredient: arrIng.slice(1).join(' ')
        };
      } else if (unitIndex === -1) {
        objIng = {
          count: 1,
          unit: '',
          ingredient: ingredient
        };
      }

      console.log(objIng);

      return objIng;
    });
    this.ingredients = newIngredients;
  }
}
