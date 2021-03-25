import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpEventType,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, skipWhile } from 'rxjs/operators';
import { HttpStatusCodesEnum } from '@app/core/enums/status-code.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = this.prepareRequest(req);
    return next.handle(req).pipe(
      skipWhile((event: HttpEvent<any>) => {
        return event.type === HttpEventType.Sent;
      }),
      catchError((res) => {
        return throwError(this.handleErrors(req, res));
      })
    );
  }

  handleErrors(req: HttpRequest<any>, response: HttpErrorResponse) {
    const errors = {};
    switch (response.status) {
      case HttpStatusCodesEnum.BAD_REQUEST:
        for (const [key, value] of Object.entries(response.error.data.errors)) {
          errors[key] = value[0];
        }
        return errors;
      case HttpStatusCodesEnum.UNSUPPORTED_MEDIA_TYPE:
        break;
    }
    return response.error;
  }
  prepareRequest(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({});
  }
}
