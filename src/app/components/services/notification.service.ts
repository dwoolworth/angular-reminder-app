import { Injectable } from "@angular/core";

interface NotificationOptions {
    duration?: number;
    title?: string;
}

@Injectable({ providedIn: "root" })
export class NotificationService {
  isOpen = false;
  message = "";
  title = "Notification";
  duration = 3000;

  private timerId: any = undefined;

  close() {
    clearTimeout(this.timerId);
    this.isOpen = false;
  }

  withTitle(title: string) {
    this.title = title;
    return this;
  }

  withDuration(duration: number) {
    this.duration = duration;
    return this;
  }

  show(message: string, options: NotificationOptions = {}) {
    this.message = message;
    this.isOpen = true;
    this.duration = options.duration || 3000;
    this.title = options.title || "Notification";

    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => {
      this.close();
    }, this.duration);
  }
}
