import { Component, inject, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather',
  providers: [
    WeatherService
  ],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent implements OnInit {

  weatherService = inject(WeatherService);

  ngOnInit(): void {
    this.weatherService.getWeather();
  }
}
