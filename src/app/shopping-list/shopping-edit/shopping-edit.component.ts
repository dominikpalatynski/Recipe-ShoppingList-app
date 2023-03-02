import {
  Component,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';
import { BoundElementProperty } from '@angular/compiler';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('nameInput') nameRef: ElementRef;
  @ViewChild('amountInput') amountRef: ElementRef;
  @ViewChild('f') form: NgForm;

  subscription: Subscription;
  subscription2: Subscription;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  constructor(
    private shop: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  index: number;
  holder: boolean = true;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  ngOnInit() {
    this.subscription = this.route.params.subscribe((params: Params) => {
      // this.index = +this.route.snapshot.params['id'];
      this.index = +this.route.snapshot.params.id;
    });
    this.subscription2 = this.shop.startedEditing.subscribe((index: number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.shop.getOneIngredient(index);
      this.form.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount,
      });
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

  onAddItem(form: NgForm) {
    // const newIngredient = new Ingredient(
    //   this.nameRef.nativeElement.value,
    //   this.amountRef.nativeElement.value
    // );
    // this.shop.onAdd(newIngredient);

    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shop.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shop.onAdd(newIngredient);
    }

    form.reset();

    // this.ingredientAdded.emit(newIngredient);
  }
  onDeleteIngr() {
    this.shop.onDeleteIngr(this.index);
    // const currentId = +this.route.snapshot.params['id'];
    // this.index = currentId;
    // this.router.navigate([this.index, 'edit'], { relativeTo: this.route });
    this.router.navigate(['/shop', 'edit']);
    this.editMode = false;
  }
  onClearIngr() {
    this.form.reset();
    this.editMode = false;
  }
}
