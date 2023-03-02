import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipePostService } from '../recipe-post.serive';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private rec: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private recPost: RecipePostService
  ) {}
  recHolder: boolean = true;

  onAddToShoppingList() {
    this.rec.addIngToShopList(this.recipe.ingredients);
  }
  onDeleteRecipe() {
    this.rec.deleteRecipe(this.id, this.recipe);
    this.recHolder = false;
    this.router.navigate(['../'], { relativeTo: this.route });
    this.recPost.onSendRecipe();
  }
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.rec.getOneRecipe(this.id);
    });
  }
  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }
}
