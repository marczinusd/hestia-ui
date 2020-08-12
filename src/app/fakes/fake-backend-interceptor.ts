/* eslint-disable @typescript-eslint/no-explicit-any */
// based on https://jasonwatmore.com/post/2020/07/18/angular-10-fake-backend-example-for-backendless-development
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
const users = JSON.parse(localStorage.getItem('users')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, body } = request;

    return of(null).pipe(mergeMap(handleRoute)).pipe(delay(500)).pipe(materialize()).pipe(dematerialize());

    function handleRoute(): Observable<HttpEvent<any>> {
      switch (true) {
        case url.endsWith('/snapshots') && method === 'GET':
          return getAllSnapshots();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    function getAllSnapshots(): Observable<HttpEvent<any>> {
      const { username, password } = body;
      const user = users.find((x) => x.username === username && x.password === password);
      if (!user) {
        return error('Username or password is incorrect');
      }
      return ok({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        token: 'fake-jwt-token'
      });
    }

    function ok(messageBody?): Observable<HttpEvent<any>> {
      return of(new HttpResponse({ status: 200, body: messageBody }));
    }

    function error(message): Observable<HttpEvent<any>> {
      return throwError({ error: { message } });
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
