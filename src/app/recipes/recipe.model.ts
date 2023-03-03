import { Ingredient } from '../shared/ingredients.model';

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor(
    name: string,
    dsc: string,
    imagePath: string,
    ingredients: Ingredient[]
  ) {
    this.name = name;
    this.description = dsc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
