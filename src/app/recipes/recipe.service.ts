import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  constructor(private shop: ShoppingListService) {}
  recipesChanged = new Subject<Recipe[]>();
  deleteHold: boolean = true;

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'test name',
  //     'test description',
  //     'https://plus.unsplash.com/premium_photo-1661545840525-91d0808097fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVjaXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  //     [
  //       new Ingredient('Beef', 1),
  //       new Ingredient('Corn', 4),
  //       new Ingredient('Beef', 1),
  //     ]
  //   ),
  //   new Recipe(
  //     'test name',
  //     'test description',
  //     'https://plus.unsplash.com/premium_photo-1661545840525-91d0808097fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVjaXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  //     [
  //       new Ingredient('Beef', 1),
  //       new Ingredient('Tomatoes', 4),
  //       new Ingredient('Pork', 1),
  //     ]
  //   ),
  //   new Recipe(
  //     'test name',
  //     'test description',
  //     'https://plus.unsplash.com/premium_photo-1661545840525-91d0808097fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVjaXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  //     [
  //       new Ingredient('Beef', 1),
  //       new Ingredient('Tomatoes', 4),
  //       new Ingredient('Beef', 1),
  //     ]
  //   ),
  // ];
  private recipes: Recipe[] = [];
  recipeSelected = new EventEmitter<Recipe>();
  getRecipe() {
    return this.recipes.slice();
  }
  getOneRecipe(index: number) {
    return this.recipes[index];
  }
  addIngToShopList(ingredients: Ingredient[]) {
    this.shop.pushIngToShop(ingredients);
  }
  deleteRecipe(id: number, rec: Recipe) {
    this.recipes.splice(id, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  setRecipe(recipies: Recipe[]) {
    this.recipes = recipies;
    this.recipesChanged.next(this.recipes.slice());
    console.log(this.recipes);
  }
}
