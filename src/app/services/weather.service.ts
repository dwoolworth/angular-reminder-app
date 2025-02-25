import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { WeatherServiceResponse } from "../models/weather";

@Injectable({ providedIn: "root" })
export class WeatherService {
  latitude = 44.5384;
  longitude = 18.6671;
  weather = signal<WeatherServiceResponse|null>(null);
  iconUrl = signal("");
  loaded = signal(false);

  constructor(private httpClient: HttpClient) {}

  getWeather() {
    if (this.loaded()) {
      return of(true);
    }

    return new Observable((observer) => {
      const fullUrl = `weather?latitude=${this.latitude}&longitude=${this.longitude}`;

      return this.httpClient.get(fullUrl).subscribe((data: any) => {
        this.weather.set(data);
        this.iconUrl.set(
          `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        );

        const timezoneOffset = data.timezone;
        const formatTime = (unixTime: number, offset: number) => {
          const localTime = new Date((unixTime + offset) * 1000);
          return localTime.toISOString().substr(11, 5);
        };
        const sunriseTime = formatTime(data.sys.sunrise, timezoneOffset);
        const sunsetTime = formatTime(data.sys.sunset, timezoneOffset);

        const roundedTemp = Math.ceil(data.main.temp);
        const roundedFeelsLike = Math.ceil(data.main.feels_like);

        this.weather.set({
          ...data,
          main: {
            ...data.main,
            temp: roundedTemp,
            feels_like: roundedFeelsLike,
          },
          localSunrise: sunriseTime,
          localSunset: sunsetTime,
        } as WeatherServiceResponse);

        this.loaded.set(true);
        observer.next(true);
        observer.complete();
      });
    });
  }

  convertToLocalTime(timestamp: number, timezoneOffset: number): string {
    const date = new Date((timestamp + timezoneOffset) * 1000); // Convert to milliseconds
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // Format time
  }
}
