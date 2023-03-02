import { Component, OnInit, OnChanges, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  constructor(
    private shop: ShoppingListService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ingredients: Ingredient[];
  index: number;

  ngOnInit() {
    this.ingredients = this.shop.getIngredients();
    this.shop.ingredientsChanged.subscribe((ing: Ingredient[]) => {
      this.ingredients = ing;
    });
    if (this.ingredients.length === 0) {
      this.router.navigate(['/shop', 'edit']);
    } else this.router.navigate(['/shop']);
  }
  ngOnDestroy() {}
  onTest(index: number) {
    this.router.navigate([index, 'edit'], { relativeTo: this.route });
    this.shop.startedEditing.next(index);
  }
  ngOnChanges() {}
  onEditIngredient() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }
}
