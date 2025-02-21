import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class AuthTokenService {
  saveToken(token: string) {
    localStorage.setItem("AuthToken", token);
  }

  getToken() {
    return localStorage.getItem("AuthToken");
  }

  removeToken() {
    localStorage.removeItem("AuthToken");
  }

  isTokenValid() {
    const token = this.getToken();
    const decodedToken = this.decodeJWT(token);

    console.log(decodedToken, new Date().getTime());

    if (decodedToken && decodedToken.payload) {
      const exp = decodedToken.payload.exp * 1000;
      const now = new Date().getTime();
      const isValid = now < exp;

      return isValid;
    }
    return true;
  }

  isExpired() {
    return !this.isTokenValid();
  }

  decodeJWT(token: string | null) {
    if (!token) {
      return null;
    }

    const parts = token.split(".");

    if (parts?.length !== 3) {
      return null;
    }

    const header = JSON.parse(atob(parts[0]));
    const payload = JSON.parse(atob(parts[1]));
    return { header, payload };
  }
}
