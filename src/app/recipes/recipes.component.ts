import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { interval, Subscription, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit, OnDestroy {
  selectedRecipe: Recipe;
  private firstObsSubscription: Subscription;
  constructor(private rec: RecipeService) {}
  ngOnInit() {
    this.rec.recipeSelected.subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe;
    });
    // this.firstObsSubscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });
    // const customObservable = Observable.create((observer) => {
    //   let count = 0;
    //   setInterval(() => {
    //     observer.next(count);
    //     if (count > 3) {
    //       observer.error(new Error('count is greater than 3 '));
    //     }
    //     if (count === 10) {
    //       observer.complete();
    //     }
    //     count++;
    //   }, 1000);
    // });
    //Operators

    // this.firstObsSubscription = customObservable
    //   .pipe(
    //     filter((data) => data > 1),
    //     map((data: number) => {
    //       return `Return ${data + 1}`;
    //     })
    //   )
    //   .subscribe(
    //     (data) => {
    //       console.log(data);
    //     },
    //     (error) => alert(error.message)
    //   );
  }
  ngOnDestroy() {
    // this.firstObsSubscription.unsubscribe();
  }
}
