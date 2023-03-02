import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipePostService {
  constructor(private http: HttpClient, private rec: RecipeService) {}

  onSendRecipe() {
    const recipes: Recipe[] = this.rec.getRecipe();
    this.http
      .put(
        'https://angular-app-8c29b-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes
      )

      .subscribe((recipes) => {
        console.log(recipes);
      });
  }
  onFetchRecipe() {
    return this.http
      .get(
        'https://angular-app-8c29b-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((recipes: Recipe[]) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes: Recipe[]) => {
          this.rec.setRecipe(recipes);
        })
      );
  }
}
