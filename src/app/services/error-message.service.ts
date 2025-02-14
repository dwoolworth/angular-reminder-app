import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";

@Injectable({ providedIn: "root" })
export class ErrorMessageService {

  getErrorMessage(control: FormControl) {
    const errors: Record<string, any> = control.errors || {};

    if (errors["required"]) {
        return "This field is required";
    }
    if (errors["email"]) {
        return "Please enter a valid email address";
    }

    return "";
  }
}
