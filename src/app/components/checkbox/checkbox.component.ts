import { Component, forwardRef, Input } from '@angular/core';
import { AbstractFormComponent } from '../form/abstract-form.component';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

export const CHECKBOX_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxComponent),
  multi: true,
};

@Component({
  selector: 'app-checkbox',
  imports: [FormsModule],
  providers: [CHECKBOX_VALUE_ACCESSOR],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent extends AbstractFormComponent {
  @Input() label: string = '';
}
