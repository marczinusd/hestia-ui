import { API_BASE_URL, SnapshotsService } from './snapshots.service';
import { SpectatorService, createHttpFactory, mockProvider } from '@ngneat/spectator/jest';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { SnapshotHeader } from '../model/snapshot-header';
import { TestScheduler } from 'rxjs/testing';

describe('SnapshotsService', () => {
  let spectator: SpectatorService<SnapshotsService>;
  const createHttp = createHttpFactory({
    providers: [
      { provide: API_BASE_URL, useFactory: () => 'url' },
      mockProvider(HttpClient, {
        get: () => of<SnapshotHeader[]>([new SnapshotHeader(1, 'bla')])
      })
    ],
    service: SnapshotsService
  });
  const testScheduler = new TestScheduler((actual, expected) => expect(actual).toStrictEqual(expected));

  beforeEach(() => (spectator = createHttp()));

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('getAllHeaders()', () => {
    it('should invoke correct http endpoint', () => {
      const httpClient = spectator.inject(HttpClient);
      const get = jest.spyOn(httpClient, 'get');

      spectator.service.getAllHeaders();

      expect(get).toBeCalledWith(expect.stringMatching('url/snapshots'));
    });

    it('should return query results as snapshots', () => {
      testScheduler.run((helpers) => {
        helpers.expectObservable(spectator.service.getAllHeaders()).toBe('(b|)', { b: [new SnapshotHeader(1, 'bla')] });
      });
    });
  });

  describe('getSnapshotDetails(id)', () => {
    it('should return mock details with id passed in', () => {
      expect(spectator.service.getSnapshotDetails(1).id).toBe(1);
    });
  });
});
