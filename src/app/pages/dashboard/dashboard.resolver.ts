import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { WeatherService } from "../../services/weather.service";

@Injectable({ providedIn: 'root' })
export class DashboardResolver implements Resolve<any> {
  constructor(
    private service: WeatherService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.service.getWeather().subscribe();
  }
}