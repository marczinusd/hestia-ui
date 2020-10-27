import { createHttpFactory, SpectatorService } from '@ngneat/spectator/jest';
import { API_BASE_URL } from '../../services/snapshots.service';
import { HttpClient } from '@angular/common/http';
import { SnapshotService } from './snapshot.service';
import { SnapshotStore } from './snapshot.store';
import { SnapshotQuery } from './snapshot.query';
import { createFile, createSnapshot } from './snapshot.model';
import { of } from 'rxjs';

describe('SnapshotsService', () => {
  let spectator: SpectatorService<SnapshotService>;
  const createHttp = createHttpFactory({
    providers: [{ provide: API_BASE_URL, useFactory: () => 'url' }],
    mocks: [HttpClient],
    service: SnapshotService
  });
  const file = { id: '1', lines: [], name: '', numberOfAuthors: 1, numberOfChanges: 2, path: '' };
  const snapshot = { id: '1', files: [], hash: 'bla', name: 'bla' };

  beforeEach(() => (spectator = createHttp()));

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('loadSnapshots()', () => {
    it('should call the expected endpoint', () => {
      spectator.inject(HttpClient).get.andReturn(of([snapshot]));
      spectator.service.loadSnapshots();

      expect(spectator.inject(HttpClient).get).toHaveBeenCalledWith('url/snapshots');
    });

    it('should add the results received from the endpoint to the store', async () => {
      const query = spectator.inject(SnapshotQuery);
      spectator.inject(HttpClient).get.andReturn(of([snapshot]));

      await spectator.service.loadSnapshots().toPromise();

      expect(query.getAll()).toHaveLength(1);
    });
  });

  describe('loadFilesForSnapshot()', () => {
    it('should call the expected endpoint', () => {
      spectator.inject(HttpClient).get.andReturn(of([file]));
      spectator.service.loadFilesForSnapshot('2');

      expect(spectator.inject(HttpClient).get).toHaveBeenCalledWith('url/snapshots/2/files');
    });

    it('should add the results received from the endpoint to the store', async () => {
      const store = spectator.inject(SnapshotStore);
      const query = spectator.inject(SnapshotQuery);
      spectator.inject(HttpClient).get.andReturn(of([createFile(file)]));
      store.add(createSnapshot(snapshot));

      await spectator.service.loadFilesForSnapshot('1').toPromise();

      expect(query.getAll()[0].files).toHaveLength(1);
    });
  });
});
