import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

import { RecipePostService } from '../recipes/recipe-post.serive';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() loadData: string;
  recipies: Recipe[];
  isAuthenticated: boolean = false;
  private userSub: Subscription;
  constructor(
    private shop: ShoppingListService,
    private rec: RecipeService,
    private router: Router,
    private recipeHttp: RecipePostService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      console.log(this.isAuthenticated);
      console.log(this.authService.user);
    });
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
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
