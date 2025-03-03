import { Component, inject } from "@angular/core";
import { ReminderService } from "../../services/reminder.service.";
import { AppModule } from "../../app.module";
import { RemindersComponent } from "../../components/reminder/reminder.component";

@Component({
  selector: "app-dashboard",
  imports: [AppModule],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent {
  reminders = inject(ReminderService);
}
