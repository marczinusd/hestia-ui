/* eslint-disable @typescript-eslint/no-explicit-any */
// based on https://jasonwatmore.com/post/2020/07/18/angular-10-fake-backend-example-for-backendless-development
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';

import { File } from '../model/file';
import { Line } from '../model/line';
import { Snapshot } from '../model/snapshot';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method } = request;
    const lines: Line[] = [
      {
        content: 'console.log()',
        isCovered: true,
        lineNumber: 1,
        numberOfAuthors: 0,
        numberOfChanges: 0,
        hitCount: 1,
        isBranched: false,
        conditionCoverage: ''
      },
      {
        content: 'console.error()',
        isCovered: true,
        lineNumber: 2,
        numberOfAuthors: 0,
        numberOfChanges: 0,
        hitCount: 1,
        isBranched: false,
        conditionCoverage: ''
      },
      {
        content: 'console.warn()',
        isCovered: true,
        lineNumber: 3,
        numberOfAuthors: 0,
        numberOfChanges: 0,
        hitCount: 1,
        isBranched: false,
        conditionCoverage: ''
      }
    ];
    const files: File[] = [
      { id: '1', lines: [], lifetimeAuthors: 1, lifetimeChanges: 5, coveragePercentage: 50, path: '/dev/file1.js', snapshotId: '', filename: '' },
      { id: '2', lines: [lines[0]], lifetimeAuthors: 1, lifetimeChanges: 5, coveragePercentage: 50, path: '/dev/file2.cs', snapshotId: '', filename: '' },
      { id: '3', lines: [...lines], lifetimeAuthors: 1, lifetimeChanges: 5, coveragePercentage: 50, path: '/dev/file3.js', snapshotId: '', filename: '' }
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
          console.log('invoked /snapshots on interceptor');
          return getAllSnapshots();
        case url.endsWith('/files') && method === 'GET':
          console.log('invoked /files/ on interceptor');
          return getFileDetails();
        case url.includes('/files/'):
          const id = url.split('/files/')[1];
          console.log(`invoked /files/${id} on interceptor`);
          return ok(files.find((f) => f.id === id));
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    function getFileDetails(): Observable<HttpEvent<any>> {
      return ok(files);
    }

    function getAllSnapshots(): Observable<HttpEvent<any>> {
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
