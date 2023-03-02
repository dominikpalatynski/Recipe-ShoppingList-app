import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface AutrhResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post<AutrhResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC-hxWl-5jSXfA6yb3E_HVbDua0KHVlt3U',
      { email: email, password: password, returnSecureToken: true }
    );
  }
}
