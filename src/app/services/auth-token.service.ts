import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class AuthTokenService {

    saveToken(token: string) {
        localStorage.setItem('AuthToken', token);
    }

    getToken() {
        return localStorage.getItem('AuthToken');
    }

    removeToken() {
        localStorage.removeItem('AuthToken');
    }
}
