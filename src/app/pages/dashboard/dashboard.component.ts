import { Component } from '@angular/core';
import { WeatherComponent } from "../../components/weather/weather.component";

@Component({
  selector: 'app-dashboard',
  imports: [WeatherComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
