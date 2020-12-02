/* eslint-disable @typescript-eslint/unbound-method */
import { HttpClient } from '@angular/common/http';
import { SpectatorService } from '@ngneat/spectator';
import { createHttpFactory } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { SnapshotsQuery } from '@modules/snapshots/state/snapshots.query';
import { SnapshotsService } from '@modules/snapshots/state/snapshots.service';
import { API_BASE_URL } from '@shared/config/tokens';
import { File } from '@shared/model/file';
import { Snapshot } from '@shared/model/snapshot';

describe('SnapshotsService', () => {
  let spectator: SpectatorService<SnapshotsService>;
  const file: File = {
    id: 'id',
    lifetimeChanges: 1,
    lifetimeAuthors: 2,
    coveragePercentage: 50,
    path: 'file.ts',
    lines: [],
    filename: '',
    snapshotId: 'snapshotId',
    lineCount: 0
  };
  const snapshot: Snapshot = {
    id: 'snapshotId',
    commitDate: 'bla',
    atHash: 'hash',
    name: 'name',
    files: [file]
  };
  const createHttp = createHttpFactory({
    providers: [{ provide: API_BASE_URL, useFactory: () => 'url' }],
    mocks: [HttpClient],
    service: SnapshotsService
  });
  const jestExpect = (actual, expected) => expect(actual).toStrictEqual(expected);

  beforeEach(() => (spectator = createHttp()));

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('getSnapshotDetails(id)', () => {
    it('should invoke the correct endpoint', () => {
      const http = spectator.inject(HttpClient);
      http.get.andReturn(of());

      spectator.service.getSnapshotDetails('snapshotId').subscribe();

      expect(http.get).toHaveBeenCalledWith('url/snapshots/snapshotId');
    });

    it('should insert the snapshot details into the store', () => {
      const http = spectator.inject(HttpClient);
      const query = spectator.inject(SnapshotsQuery);
      http.get.andReturn(of(snapshot));

      spectator.service.getSnapshotDetails('snapshotId').subscribe();

      expect(query.getEntity('snapshotId')).not.toBeUndefined();
    });

    it('should return newly fetched snapshot details', () => {
      const http = spectator.inject(HttpClient);
      const scheduler = new TestScheduler(jestExpect);

      scheduler.run(({ expectObservable, cold }) => {
        http.get.andReturn(cold('--a|', { a: snapshot }));

        expectObservable(spectator.service.getSnapshotDetails('id')).toBe('--a|', { a: snapshot });
      });
    });

    it('should set store error if server query fails', () => {
      const http = spectator.inject(HttpClient);
      const scheduler = new TestScheduler(jestExpect);
      const query = spectator.inject(SnapshotsQuery);

      scheduler.run(({ expectObservable, cold }) => {
        http.get.andReturn(cold('--#|'));

        expectObservable(spectator.service.getSnapshotDetails('id')).toBe('--#', { a: 'error' });
        expectObservable(query.selectError()).toBe('a-b', { a: null, b: 'error' });
        expectObservable(query.selectLoading()).toBe('a-b', { a: true, b: false });
      });
    });

    it('should set loading flag while the query is in progress', () => {
      const http = spectator.inject(HttpClient);
      const scheduler = new TestScheduler(jestExpect);
      const query = spectator.inject(SnapshotsQuery);

      scheduler.run(({ expectObservable, cold }) => {
        http.get.andReturn(cold('--a|', { a: file }));

        expectObservable(spectator.service.getSnapshotDetails('id')).toBe('--a|', { a: file });
        expectObservable(query.selectLoading()).toBe('a-b', { a: true, b: false });
      });
    });
  });

  describe('getAllHeaders()', () => {
    it('should invoke the correct endpoint', () => {
      const http = spectator.inject(HttpClient);
      http.get.andReturn(of());

      spectator.service.getAllHeaders().subscribe();

      expect(http.get).toHaveBeenCalledWith('url/snapshots');
    });

    it('should insert snapshots into the store', () => {
      const http = spectator.inject(HttpClient);
      const query = spectator.inject(SnapshotsQuery);
      http.get.andReturn(of([file]));

      spectator.service.getAllHeaders().subscribe();

      expect(query.getAll()).toHaveLength(1);
    });

    it('should return newly retrieved snapshots', () => {
      const http = spectator.inject(HttpClient);
      const scheduler = new TestScheduler(jestExpect);

      scheduler.run(({ expectObservable, cold }) => {
        http.get.andReturn(cold('--a|', { a: [snapshot] }));

        expectObservable(spectator.service.getAllHeaders()).toBe('--a|', { a: [snapshot] });
      });
    });

    it('should set store error if server query fails', () => {
      const http = spectator.inject(HttpClient);
      const scheduler = new TestScheduler(jestExpect);
      const query = spectator.inject(SnapshotsQuery);

      scheduler.run(({ expectObservable, cold }) => {
        http.get.andReturn(cold('--#|'));

        expectObservable(spectator.service.getAllHeaders()).toBe('--#', { a: 'error' });
        expectObservable(query.selectError()).toBe('a-b', { a: null, b: 'error' });
        expectObservable(query.selectLoading()).toBe('a-b', { a: true, b: false });
      });
    });

    it('should set loading flag while query is in progress', () => {
      const http = spectator.inject(HttpClient);
      const scheduler = new TestScheduler(jestExpect);
      const query = spectator.inject(SnapshotsQuery);

      scheduler.run(({ expectObservable, cold }) => {
        http.get.andReturn(cold('--a|', { a: [snapshot] }));

        expectObservable(spectator.service.getAllHeaders()).toBe('--a|', { a: [snapshot] });
        expectObservable(query.selectLoading()).toBe('a-b', { a: true, b: false });
      });
    });
  });

  describe('selectActive', () => {
    it('should set the correct file as active', () => {
      const http = spectator.inject(HttpClient);
      const query = spectator.inject(SnapshotsQuery);
      http.get.andReturn(of(file));
      spectator.service.getSnapshotDetails('snapshotId');

      spectator.service.selectActive('snapshotId');

      expect(query.getActiveId()).toBe('snapshotId');
    });
  });
});
