import { Ingredient } from '../shared/ingredients.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  public ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Potatos', 10),
  ];
  getIngredients() {
    return this.ingredients;
  }
  onAdd(ingr: Ingredient) {
    this.ingredients.push(ingr);
    this.ingredientsChanged.next(this.ingredients.slice());
    return this.ingredients;
  }
  pushIngToShop(ingr: Ingredient[]) {
    this.ingredients.push(...ingr);
    console.log(ingr);
    this.ingredientsChanged.next(this.ingredients.slice());
    return this.ingredients;
  }
  onDeleteIngr(id: number) {
    this.ingredients.splice(id, 1);
    this.ingredientsChanged.next(this.ingredients);
  }
  onClearIngr(id: number) {
    const ingredient = this.ingredients[id];
    if (ingredient) {
      ingredient.name = 'siemano';
    }
    console.log(id);
  }
  getOneIngredient(index: number) {
    return this.ingredients[index];
  }
  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
