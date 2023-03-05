import {
  BoundElementProperty,
  TmplAstRecursiveVisitor,
} from '@angular/compiler';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  constructor(private authService: AuthService, private router: Router) {}
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  onSubmit(f: NgForm) {
    const email = f.value.email;
    const password = f.value.password;
    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;

    if (!f.valid) {
      return;
    }

    if (this.isLoginMode) {
      authObs = this.authService.signIn(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipe']);
      },
      (errorMessage) => {
        this.error = errorMessage;

        this.isLoading = false;
      }
    );
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    console.log(this.isLoginMode);
  }
  onCancelError() {
    this.error = null;
  }
}
