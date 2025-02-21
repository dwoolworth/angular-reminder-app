import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { InspirationServiceResponse } from "../models/inspiration";

@Injectable({ providedIn: "root" })
export class InspirationService {
  inspiration = signal(<InspirationServiceResponse>{});

  constructor(private httpClient: HttpClient) {}

  getInspiration(
    longitude: string,
    latitude: string
  ): Observable<InspirationServiceResponse> {
    const url = "ai/inspiration";
    const body = { longitude, latitude };
    return this.httpClient.post<InspirationServiceResponse>(url, body);
  }
}
