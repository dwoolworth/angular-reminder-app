import { Component, inject } from "@angular/core";
import { NotificationService } from "./notification.service";
import { NgClass } from "@angular/common";

@Component({
  selector: "app-notification-service",
  imports: [NgClass],
  template: `
    <div class="position-fixed top-0 end-0 p-3" style="z-index: 100">
      <div
        id="liveToast"
        class="toast"
        [ngClass]="className()"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-header">
          <strong class="me-auto">{{ service.title }}</strong>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            (click)="service.close()"
          ></button>
        </div>
        <div class="toast-body">{{ service.message }}</div>
      </div>
    </div>
  `,
})
export class NotificationServiceComponent {
  service = inject(NotificationService);

  className() {
    return this.service.isOpen ? "fade show" : " fade hide";
  }
}
