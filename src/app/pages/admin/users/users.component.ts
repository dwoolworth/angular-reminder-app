import { Component, inject } from "@angular/core";
import { UserService } from "../../../services/user.service.";
import { DialogComponent } from "../../../components/dialog/dialog.component";
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { EntryComponent } from "../../../components/entry/entry.component";
import { CheckboxComponent } from "../../../components/checkbox/checkbox.component";
import { CommonModule } from "@angular/common";
import { ErrorMessageService } from "../../../services/errormessage.service";

@Component({
  selector: "app-users",
  imports: [DialogComponent, CommonModule, EntryComponent, CheckboxComponent, ReactiveFormsModule],
  templateUrl: "./users.component.html",
  styleUrl: "./users.component.scss",
})
export class UsersComponent {
  userService = inject(UserService);
  errorMessageService = inject(ErrorMessageService);

  dialogOpen = false;
  showFormErrors = false;

  roles: Array<any> = [
    { description: "Admin", value: "admin" },
    { description: "Subscriber", value: "subscriber" },
  ];

  userForm = new FormGroup({
    firstName: new FormControl("", [Validators.required ]),
    lastName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.email]),
    phoneNumber: new FormControl("", []),
    password: new FormControl("", [Validators.required, Validators.minLength(8) ]),
    roleAdmin: new FormControl(false),
    roleSubscriber: new FormControl(false),
  });

  showAddUserDialog() {
    this.dialogOpen = true;
    this.showFormErrors = false;
  }

  saveUser() {
    //this.dialogOpen = false;
    this.showFormErrors = true;
  }


  getErrorMessage(control: FormControl) {
    if (this.showFormErrors) {
      return this.errorMessageService.getErrorMessage(control);
    }
    return '';
  }
}
