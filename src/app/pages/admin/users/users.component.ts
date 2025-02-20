import { Component, inject } from "@angular/core";
import { UserService } from "../../../services/user.service.";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ErrorMessageService } from "../../../services/error-message.service";
import { AppModule } from "../../../app.module";
import { User } from "../../../models/user";
import { DialogService } from "../../../components/services/dialog.service";
import { NotificationService } from "../../../components/services/notification.service";

@Component({
  selector: "app-users",
  imports: [AppModule],
  templateUrl: "./users.component.html",
  styleUrl: "./users.component.scss",
})
export class UsersComponent {
  userService = inject(UserService);
  errorMessageService = inject(ErrorMessageService);
  dialogService = inject(DialogService);
  notificationService = inject(NotificationService);

  dialogOpen = false;
  showFormErrors = false;

  roles: Array<any> = [
    { description: "Admin", value: "admin" },
    { description: "Subscriber", value: "subscriber" },
  ];

  userForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.email]),
    phoneNumber: new FormControl("", []),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
    roleAdmin: new FormControl(false),
    roleSubscriber: new FormControl(false),
  });

  showAddUserDialog() {
    this.dialogOpen = true;
    this.showFormErrors = false;
  }

  saveUser() {
    if (!this.userForm.valid) {
      this.showFormErrors = true;
      return;
    }
    this.dialogOpen = false;
    this.showFormErrors = false;

    const data = this.userForm.value;
    const roles = [];

    if (data.roleAdmin) {
      roles.push("admin");
    }
    if (data.roleSubscriber) {
      roles.push("subscriber");
    }

    const user: User = {
      firstName: data.firstName ?? "",
      lastName: data.lastName ?? "",
      email: data.email ?? "",
      phoneNumber: data.phoneNumber ?? "",
      password: data.password ?? "",
      roles: roles,
    };

    this.userService.create(user).subscribe((data) => {
      console.log(data);
    });
  }

  showDialog() {
    this.dialogService
      .confirm("Are you sure you want to delete selected user?", {
        title: "Delete user",
        cancelTitle: "Cancel",
        acceptTitle: "Delete",
      })
      .subscribe((result) => {

        this.notificationService.show("Dialog closed");

      });
  }


  getErrorMessage(control: FormControl) {
    if (this.showFormErrors) {
      return this.errorMessageService.getErrorMessage(control);
    }
    return "";
  }
}
