import { FileDetailsService } from './file-details.service';
import { createHttpFactory, mockProvider, SpectatorService } from '@ngneat/spectator/jest';
import { API_BASE_URL } from './snapshots.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { FileDetails } from '../model/fileDetails';

describe('FileDetailsService', () => {
  let spectator: SpectatorService<FileDetailsService>;
  const fileDetails = new FileDetails(1, 'bla.ts', 1, 2, []);
  const createHttp = createHttpFactory({
    providers: [
      { provide: API_BASE_URL, useFactory: () => 'url' },
      mockProvider(HttpClient, {
        get: () => of<FileDetails>(fileDetails)
      })
    ],
    service: FileDetailsService
  });
  const testScheduler = new TestScheduler((actual, expected) => expect(actual).toStrictEqual(expected));

  beforeEach(() => (spectator = createHttp()));

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('#getFileDetails(id, snapshotId)', () => {
    it('should invoke the correct endpoint', () => {
      const httpClient = spectator.inject(HttpClient);
      const get = jest.spyOn(httpClient, 'get');

      spectator.service.getFileDetails('1', '2');

      expect(get).toBeCalledWith(expect.stringMatching('url/snapshots/2/files/1'));
    });

    it('should return query results as file details', () => {
      testScheduler.run((helpers) => {
        helpers.expectObservable(spectator.service.getFileDetails('1', '2')).toBe('(b|)', { b: fileDetails });
      });
    });
  });
});
