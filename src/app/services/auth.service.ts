import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of } from "rxjs";
import { User } from "../models/user";
import { LoginResponse } from "../models/login-response";
import { UserService } from "./user.service.";
import { AuthTokenService } from "./auth-token.service";
import { CookieService } from "./cookie.service";

interface AuthResult {
  access_token: string;
}

export interface CurrentUser {
  email: string;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  currentUser = signal<CurrentUser | null>(null);

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private authTokenService: AuthTokenService,
    private cookieService: CookieService
  ) {}

  authenticate() {
    return of(true);
  }

  logout() {
    this.authTokenService.removeToken();
    this.currentUser.set(null);
  }

  logIn(email: string, password: string): Observable<LoginResponse> {
    this.authTokenService.removeToken();

    const result: LoginResponse = {
      refreshToken: "",
      accessToken: "",
      user: undefined,
      error: undefined
    };

    return new Observable((observer) => {
      this.httpClient
        .post<AuthResult>("auth/login", { email, password })
        .subscribe({
          next: (data) => {
            this.authTokenService.saveToken(data.access_token);
            result.refreshToken = this.cookieService.getCookie('refreshToken');
            result.accessToken = data.access_token;

            this.currentUser.set({
                email: email
            });
            observer.next(result);
            observer.complete();
          },
          error: (error) => {
            result.error = error;
            this.currentUser.set(null);
            console.log(error)
            observer.next(result);
            observer.complete();
          },
        });
    });
  }

  isAuthenticated() {
    return this.currentUser() !== null;
  }
}
