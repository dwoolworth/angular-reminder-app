import { inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";

@Injectable({ providedIn: "root" })
export class WeatherService {
  private url = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

  cityName: string = 'Tuzla';
  weather = signal("");
  iconUrl = signal("");
  loaded = false;

  constructor(private httpClient: HttpClient) {

  }

  getWeather() {

    if (this.loaded) {
      return of(true)
    }

    const fullUrl = `${this.url}?q=${this.cityName}&appid=${this.apiKey}&units=metric`;

    return this.httpClient.get(fullUrl).subscribe((data: any) => {

      const weather = data.weather[0];

      this.weather.set(weather.main);
      this.iconUrl.set(`https://openweathermap.org/img/w/${weather.icon}.png`);
    });
  }
}
