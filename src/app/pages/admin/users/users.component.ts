import { Component, inject, OnInit } from "@angular/core";
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
export class UsersComponent implements OnInit {

  userService = inject(UserService);
  errorMessageService = inject(ErrorMessageService);
  dialogService = inject(DialogService);
  notificationService = inject(NotificationService);

  dialogTitle = "";
  dialogOpen = false;
  showFormErrors = false;

  roles: Array<any> = [
    { description: "Admin", value: "admin" },
    { description: "Subscriber", value: "subscriber" },
  ];

  editUserId = "";

  userForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    phoneNumber: new FormControl("", []),
    password: new FormControl("", []),
    roleAdmin: new FormControl(false),
  });

  ngOnInit(): void {
    this.userService.loadAllUsers();
  }

  showAddUserDialog() {
    this.dialogTitle = "Create User"
    this.dialogOpen = true;
    this.showFormErrors = false;
    this.userForm.reset();
    this.editUserId = "";
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
    } else {
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

    if (this.editUserId === "") {
      this.userService.create(user).subscribe((data) => {
        this.userService.loadAllUsers();
        this.notificationService.show(`User ${user.firstName} ${user.lastName} has been created.`, {type: "success"});
     });
    } else {
      user._id = this.editUserId;
      this.userService.update(user).subscribe((data) => {
        this.userService.loadAllUsers();
        this.notificationService.show(`User ${user.firstName} ${user.lastName} has been updated.`, {type: "success"});
     });
    }

  }

  showEditUserDialog(user: User) {

    this.dialogTitle = "Edit User";
    this.dialogOpen = true;
    this.showFormErrors = false;
    this.editUserId = user._id ?? "";

    this.userForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber ?? "",
      password: user.password ?? "",
      roleAdmin: user.roles.includes("admin"),
    })

  }


  getErrorMessage(control: FormControl) {
    if (this.showFormErrors) {
      return this.errorMessageService.getErrorMessage(control);
    }
    return "";
  }
}
