import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AppModule } from "../../../app.module";
import { AuthService } from "../../../services/auth.service";
import { AuthTokenService } from "../../../services/auth-token.service";
import { catchError } from "rxjs";
import { Router } from "@angular/router";
import { NotificationService } from "../../../components/services/notification.service";

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
  notificationService = inject(NotificationService);

  loginForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
    rememberMe: new FormControl(false),
  });


  login() {
    console.log(this.loginForm.value);
    this.errorMessage = '';
    const email = this.loginForm.value.email ?? "";
    const password = this.loginForm.value.password ?? "";

    this.authService
      .logIn(email, password)
      .subscribe((result) => {
        if(result.error) {
          this.notificationService.show('Invalid username or password', {type: 'danger'} );
          return;
        }

        this.tokenService.saveToken(result.accessToken);

        this.router.navigate(["/"]);

      });
  }
}
