import { inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class WeatherService {
  weather = signal("");

  constructor(private httpClient: HttpClient) {
    this.weather.set("Sunny");
  }
}
