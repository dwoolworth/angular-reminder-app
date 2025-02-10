import { Component, inject } from '@angular/core';
import { WeatherComponent } from "../../components/weather/weather.component";
import { ReminderService } from '../../services/reminder.service.';

@Component({
  selector: 'app-dashboard',
  imports: [WeatherComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  reminders = inject(ReminderService)
}
