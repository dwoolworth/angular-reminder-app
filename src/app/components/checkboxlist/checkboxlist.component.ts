import { Component, forwardRef } from "@angular/core";
import { AbstractFormComponent } from "../form/abstract-form.component";
import { CheckboxComponent } from "../checkbox/checkbox.component";
import { FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";

export const CHECKBOXLIST_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxListComponent),
  multi: true,
};

@Component({
  selector: "app-checkboxlist",
  imports: [FormsModule, CheckboxComponent],
  providers: [CHECKBOXLIST_VALUE_ACCESSOR],
  templateUrl: "./checkboxlist.component.html",
  styleUrl: "./checkboxlist.component.scss",
})
export class CheckboxListComponent extends AbstractFormComponent {}
