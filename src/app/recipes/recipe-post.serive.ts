import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { exhaustMap, map, tap, take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipePostService {
  constructor(
    private http: HttpClient,
    private rec: RecipeService,
    private authService: AuthService
  ) {}

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
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http
          .get<Recipe[]>(
            'https://angular-app-8c29b-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
            {
              params: new HttpParams().set('auth', user.token),
            }
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
      })
    );
  }
}
