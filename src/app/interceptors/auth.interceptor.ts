import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { AuthTokenService } from "../services/auth-token.service";
import { API_URL } from "../config";

export function authIntereceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const tokenService = inject(AuthTokenService);
  const accessToken = tokenService.getToken();
  const isApiUrl = req.url.startsWith(API_URL);

  if (accessToken && isApiUrl) {
    const apiReq = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${accessToken}`),
    });
    return next(apiReq);
  }

  return next(req);
}
