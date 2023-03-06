import { LowerCasePipe } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs-compat';
import { CanComponentDeactivate } from '../deactivate-recipe.service';
import { RecipePostService } from '../recipe-post.serive';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent
  implements OnInit, OnChanges, CanComponentDeactivate
{
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rec: RecipeService,
    private recPost: RecipePostService
  ) {}
  id: number;
  editMode: boolean = false;
  form: FormGroup;
  testCalue = true;
  show: boolean = true;
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.form.dirty) {
      return confirm('test');
    }
    return true;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }
  ngOnChanges() {
    if (this.form.dirty) {
      this.show = true;
    }
  }
  initForm() {
    let recipe = this.rec.getOneRecipe(this.id);
    let recipeTitle = '';
    let recipeImagePath = '';
    let recipeDesription = '';
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      recipeTitle = recipe.name;
      recipeDesription = recipe.description;
      recipeImagePath = recipe.imagePath;
      if (recipe['ingredients']) {
        for (let ing of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ing.name, Validators.required),
              amount: new FormControl(ing.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }
    this.form = new FormGroup({
      title: new FormControl(recipeTitle, Validators.required),
      description: new FormControl(recipeDesription),
      imagePath: new FormControl(recipeImagePath),
      ingredients: recipeIngredients,
    });
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.form.value['title'],
      this.form.value['description'],
      this.form.value['imagePath'],
      this.form.value['ingredients']
    );
    if (this.editMode) {
      this.rec.updateRecipe(this.id, newRecipe);
    } else {
      this.rec.addRecipe(newRecipe);
    }
    this.onDiscard();
    this.recPost.onSendRecipe();
  }
  onDiscard() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onResetIng(index: number) {
    (<FormArray>this.form.get('ingredients')).removeAt(index);
  }
  get control() {
    return (<FormArray>this.form.get('ingredients')).controls;
  }
  onGetIngredient() {
    (<FormArray>this.form.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }
}
