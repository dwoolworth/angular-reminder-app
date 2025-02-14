import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URL } from "../config";

export function baseUrlIntereceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {

    if (req.url.startsWith('http')) {
      return next(req);
    }

    const apiReq = req.clone({ url: `${API_URL}/${req.url}` });
    return next(apiReq);
}
