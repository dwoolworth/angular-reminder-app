import { Component, forwardRef, Input, NgModule } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractFormComponent } from '../form/abstract-form.component';

export const ENTRY_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EntryComponent),
  multi: true,
};

@Component({
  selector: 'app-entry',
  imports: [FormsModule],
  providers: [ENTRY_VALUE_ACCESSOR, NgModule],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss'
})
export class EntryComponent extends AbstractFormComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() description: string = '';
  @Input() errorMessage: string = '';

}
