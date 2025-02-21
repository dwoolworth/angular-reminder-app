import { Component, inject } from '@angular/core';
import { DialogService } from './dialog.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-dialog-service',
  imports: [DialogComponent],
  template: `
      <app-dialog
        footerClass="d-flex align-items-center justify-content-center"
        [saveActionTitle]="service.acceptTitle"
        [closeActionTitle]="service.cancelTitle"
        saveClass="btn-danger w-25"
        closeClass="btn-secondary w-25"
        [(open)]="service.isOpen"
        (saveAction)="service.close(true)"
        (closeAction)="service.close(false)"
        [title]="service.title">

        {{ service.message }}
      </app-dialog>
  `,
})
export class DialogServiceComponent {
  service = inject(DialogService);
}