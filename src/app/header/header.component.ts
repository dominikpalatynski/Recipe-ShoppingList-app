import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoggingServices } from '../logging.services';
import { RecipePostService } from '../recipes/recipe-post.serive';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() loadData: string;
  recipies: Recipe[];
  constructor(
    public loggingService: LoggingServices,

    private shop: ShoppingListService,
    private rec: RecipeService,
    private router: Router,
    private recipeHttp: RecipePostService
  ) {}
  ngOnInit() {
    this.recipeHttp.onFetchRecipe().subscribe();
  }

  onShowEdit() {
    if (this.shop.ingredients.length === 0) {
      this.router.navigate(['/shop', 'edit']);
    } else {
      this.router.navigate(['/shop']);
    }
    console.log(this.shop.ingredients);
  }
  onSaveData() {
    this.recipeHttp.onSendRecipe();
  }
  onFetchData() {
    this.recipeHttp.onFetchRecipe().subscribe();
  }
}
