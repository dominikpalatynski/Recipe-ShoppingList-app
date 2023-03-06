import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';

import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';

import { DropDownDirective } from './shared/dropdown.directive';

import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModel } from './app-routing-module';

import { AuthGuard } from './auth-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

import { FormComponent } from './form/form.component';

import { ShortenPipe } from './shorten.pipe';
import { FilterPipe } from './filter.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PostsService } from './post.service';

// import { LoggingInterceptorService } from './logging-interceptor.service';
import { RecipePostService } from './recipes/recipe-post.serive';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor-service';
import { CanDeactivateGuard } from './recipes/deactivate-recipe.service';
import { WorkingCopyComponent } from './working-copy/working-copy.component';

@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,

    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,

    DropDownDirective,

    PageNotFoundComponent,
    ErrorPageComponent,
    RecipeStartComponent,
    RecipeEditComponent,

    FormComponent,

    ShortenPipe,
    FilterPipe,
    AuthComponent,
    LoadingSpinnerComponent,
    WorkingCopyComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModel,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    RecipeService,
    ShoppingListService,
    AuthGuard,

    PostsService,
    RecipePostService,
    CanDeactivateGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: LoggingInterceptorService,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
