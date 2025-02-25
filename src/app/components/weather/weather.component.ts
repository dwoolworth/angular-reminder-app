import { Component, inject, OnInit } from "@angular/core";
import { WeatherService } from "../../services/weather.service";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-weather",
  imports:[NgIf],
  providers: [WeatherService],
  templateUrl: "./weather.component.html",
  styleUrl: "./weather.component.scss",
})
export class WeatherComponent implements OnInit {
  weatherService = inject(WeatherService);

  ngOnInit(): void {
    this.weatherService.getWeather().subscribe();
  }
}
