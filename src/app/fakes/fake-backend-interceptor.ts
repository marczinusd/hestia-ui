/* eslint-disable @typescript-eslint/no-explicit-any */
// based on https://jasonwatmore.com/post/2020/07/18/angular-10-fake-backend-example-for-backendless-development
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Snapshot } from '../model/snapshot';
import { File } from '../model/file';
import { Line } from '../model/line';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method } = request;
    const lines: Line[] = [
      { content: 'console.log()', isCovered: true, lineNumber: 1, numberOfAuthors: 0, numberOfChanges: 0 },
      { content: 'console.error()', isCovered: true, lineNumber: 2, numberOfAuthors: 0, numberOfChanges: 0 },
      { content: 'console.warn()', isCovered: true, lineNumber: 3, numberOfAuthors: 0, numberOfChanges: 0 }
    ];
    const files: File[] = [
      { id: '1', lines: [], numberOfAuthors: 1, numberOfCommits: 5, path: '/dev/file1.js' },
      { id: '2', lines: [lines[0]], numberOfAuthors: 1, numberOfCommits: 5, path: '/dev/file2.cs' },
      { id: '3', lines: [...lines], numberOfAuthors: 1, numberOfCommits: 5, path: '/dev/file3.js' }
    ];
    const snapshots: Snapshot[] = [
      { id: '1', files: [], name: 'snapshot1', atHash: 'hash', commitDate: '2020-10-20T23:45:05' },
      { id: '2', files: [], name: 'snapshot2', atHash: 'hash', commitDate: '2020-10-20T23:45:05' },
      { id: '3', files: [...files], name: 'snapshot3', atHash: 'hash', commitDate: '2020-10-20T23:45:05' }
    ];

    return of(null).pipe(mergeMap(handleRoute)).pipe(delay(500)).pipe(materialize()).pipe(dematerialize());

    function handleRoute(): Observable<HttpEvent<any>> {
      switch (true) {
        case url.endsWith('/snapshots') && method === 'GET':
          return getAllSnapshots();
        case url.includes('/files/'):
          return getFileDetails();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    function getFileDetails(): Observable<HttpEvent<any>> {
      return ok(files);
    }

    function getAllSnapshots(): Observable<HttpEvent<any>> {
      console.log('Triggered GET /snapshots on FakeBackendInterceptor');

      return ok(snapshots);
    }

    function ok(messageBody?): Observable<HttpEvent<any>> {
      return of(new HttpResponse({ status: 200, body: messageBody }));
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
