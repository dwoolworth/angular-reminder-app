import { Injectable } from "@angular/core";

interface NotificationOptions {
    duration?: number;
    type?: string
}

@Injectable({ providedIn: "root" })
export class NotificationService {
  isOpen = false;
  message = "Notification";
  duration = 3000;
  type="info";

  private timerId: any = undefined;

  close() {
    clearTimeout(this.timerId);
    this.isOpen = false;
  }

  show(message: string, options: NotificationOptions = {}) {
    this.message = message;
    this.isOpen = true;
    this.duration = options.duration || 3000;
    this.type = options.type || "primary";

    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => {
      this.close();
    }, this.duration);
  }
}
