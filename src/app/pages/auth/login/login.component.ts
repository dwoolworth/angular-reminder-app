import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AppModule } from "../../../app.module";
import { AuthService } from "../../../services/auth.service";
import { AuthTokenService } from "../../../services/auth-token.service";
import { catchError } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  imports: [AppModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  errorMessage: string = "";

  authService = inject(AuthService);
  tokenService = inject(AuthTokenService);
  router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
    rememberMe: new FormControl(false),
  });


  login() {
    console.log(this.loginForm.value);
    this.errorMessage = 's';
    const email = this.loginForm.value.email ?? "";
    const password = this.loginForm.value.password ?? "";

    this.authService
      .logIn(email, password)
      .subscribe((result) => {
        if(result.error) {
          this.errorMessage = 'Please check your credentials';
          return;
        }

        this.tokenService.saveToken(result.accessToken);

        this.router.navigate(["/"]);

      });
  }
}
