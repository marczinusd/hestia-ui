import { API_BASE_URL, SnapshotsService } from './snapshots.service';
import { SpectatorService, createHttpFactory, mockProvider } from '@ngneat/spectator/jest';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { Snapshot } from '../model/snapshot';

describe('SnapshotsService', () => {
  let spectator: SpectatorService<SnapshotsService>;
  const createHttp = createHttpFactory({
    providers: [
      { provide: API_BASE_URL, useFactory: () => 'url' },
      mockProvider(HttpClient, {
        get: () => of<Snapshot[]>([snapshot])
      })
    ],
    service: SnapshotsService
  });
  const snapshot: Snapshot = { id: '1', commitDate: '', files: [], name: '', atHash: '' };
  const jestExpect = (actual, expected) => expect(actual).toStrictEqual(expected);

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
      const testScheduler = new TestScheduler(jestExpect);

      testScheduler.run((helpers) => {
        helpers.expectObservable(spectator.service.getAllHeaders()).toBe('(b|)', { b: [snapshot] });
      });
    });
  });

  describe('getSnapshotDetails(id)', () => {
    it('should return mock details with id passed in', () => {
      expect(spectator.service.getSnapshotDetails('1').id).toBe('1');
    });
  });
});
