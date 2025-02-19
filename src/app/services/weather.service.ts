import { Injectable, signal } from "@angular/core";
import { HttpBackend, HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";

@Injectable({ providedIn: "root" })
export class WeatherService {
  private url = "https://api.openweathermap.org/data/2.5/weather";
  private apiKey = "f00c38e0279b7bc85480c3fe775d518c";
  private httpClient: HttpClient;

  cityName: string = "Tuzla";
  weather = signal("");
  iconUrl = signal("");
  loaded = signal(false);

  constructor(private httpBackend: HttpBackend) {
    /**
     * Construct http client to prevent using interceptors
     */
    this.httpClient = new HttpClient(this.httpBackend);
  }

  getWeather() {

    if (this.loaded()) {
      return of(true);
    }

    return new Observable((observer) => {
      const fullUrl = `${this.url}?q=${this.cityName}&appid=${this.apiKey}&units=metric`;

      return this.httpClient.get(fullUrl).subscribe((data: any) => {
        const weather = data.weather[0];
        this.weather.set(weather.main);
        this.iconUrl.set(
          `https://openweathermap.org/img/w/${weather.icon}.png`
        );

        this.loaded.set(true);
        observer.next(true);
        observer.complete();
      });
    });
  }
}
