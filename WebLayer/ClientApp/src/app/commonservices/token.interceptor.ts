import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { PersistStorageUtility } from './PersistInStorage';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: PersistStorageUtility) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.GetTokenFromLocalStorage()}`
      }
    });

    return next.handle(request);
  }
}
