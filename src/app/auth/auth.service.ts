import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Subject, throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  user = new BehaviorSubject<User>(null);

  logOut() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
  }

  // autoLogin() {
  //   const userData: {
  //     email: string;
  //     id: string;
  //     _token: string;
  //     _tokenExpiration: string;
  //   } = JSON.parse(localStorage.getItem('userData'));
  //   if (!userData) {
  //     this.router.navigate(['/auth']);
  //     return;
  //   }
  //   const loadedUser = new User(
  //     userData.email,
  //     userData.id,
  //     userData._token,
  //     new Date(userData._tokenExpiration)
  //   );
  //   if (loadedUser.token) {
  //     this.user.next(loadedUser);
  //   }
  //   if (userData) {
  //     this.router.navigate(['/recipe']);
  //   }
  //   this.user.next(loadedUser);
  //   console.log(loadedUser);
  // }
  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string; // Use idToken instead of _token
      _tokenExpiration: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      this.router.navigate(['/auth']);
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token, // Use idToken instead of _token
      new Date(userData._tokenExpiration)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
    this.router.navigate(['/recipe']); // Always navigate to recipe page
    this.user.next(loadedUser);
    console.log(loadedUser);
  }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBJrmwgEmapZ4ZzGYdXgxKMJEzUoUq6f3E',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  signIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBJrmwgEmapZ4ZzGYdXgxKMJEzUoUq6f3E',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    this.user.next(user);
    console.log(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknow error occurred';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exist';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email not found';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password';
        break;
    }

    return throwError(errorMessage);
  }
}
