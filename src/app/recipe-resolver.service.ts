import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { RecipePostService } from './recipes/recipe-post.serive';
import { Recipe } from './recipes/recipe.model';
import { RecipeService } from './recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(private postRec: RecipePostService, private rec: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.rec.getRecipe();
    if (recipes.length === 0) {
      return this.postRec.onFetchRecipe();
    } else {
      return recipes;
    }
  }
}
