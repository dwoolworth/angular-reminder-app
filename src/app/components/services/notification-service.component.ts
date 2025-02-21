import { Component, inject } from "@angular/core";
import { NotificationService } from "./notification.service";
import { NgClass } from "@angular/common";

@Component({
  selector: "app-notification-service",
  imports: [NgClass],
  templateUrl: './notification-service.component.html',
})
export class NotificationServiceComponent {
  service = inject(NotificationService);

  className() {
    const className = this.service.isOpen ? "fade show" : " fade hidde";

    return className + " alert-" + this.service.type;
  }
}
