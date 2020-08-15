/* eslint-disable @typescript-eslint/no-explicit-any */
// based on https://jasonwatmore.com/post/2020/07/18/angular-10-fake-backend-example-for-backendless-development
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { SnapshotHeader } from '../model/snapshot-header';

// array in local storage for registered users
const users = JSON.parse(localStorage.getItem('users')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, body } = request;
    const snapshotHeaders = [new SnapshotHeader(1, 'Bla'), new SnapshotHeader(2, 'Bla2'), new SnapshotHeader(3, 'Bla3'), new SnapshotHeader(4, 'Bla4')];

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
      console.log('Triggered GET /snapshots on FakeBackendInterceptor');

      return ok(snapshotHeaders);
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
