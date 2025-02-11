
import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(private httpClient: HttpClient) { }

    authenticate() {
        return of(true);
    }

    isAuthenticated() {
        return true;
    }
}