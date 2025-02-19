import { Component, inject } from '@angular/core';
import { DialogService } from './dialog.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-dialog-service',
  imports: [DialogComponent],
  template: `
      <app-dialog
        saveActionTitle="Ok"
        closeActionTitle="Cancel"
        saveClass="btn-danger"
        [(open)]="service.isOpen"
        (saveAction)="service.close(true)"
        (closeAction)="service.close(false)"
        title="Confirmation">

        {{ service.message }}
      </app-dialog>
  `,
})
export class DialogServiceComponent {
  service = inject(DialogService);
}