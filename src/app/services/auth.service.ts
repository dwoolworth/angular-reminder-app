
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { LoginResponse } from '../models/login-response';
import { UserService } from './user.service.';


@Injectable({providedIn: 'root'})
export class AuthService {

    currentUser = signal<User|null>(null);

    constructor(
        private httpClient: HttpClient,
        private userService: UserService
    ) { }

    authenticate() {
        return of(true);
    }

    signIn(email: string, password: string): Observable<LoginResponse> {
        const user = this.userService.findUserByEmail(email);

        const result : LoginResponse = {
            refreshToken: 'RefreshToken',
            accessToken: 'AccessToken',
            user: user
        }
        return of(result);
    }

    isAuthenticated() {
        return true;
    }
}