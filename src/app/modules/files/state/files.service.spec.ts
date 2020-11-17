/* eslint-disable @typescript-eslint/unbound-method */
import { HttpClient } from '@angular/common/http';
import { SpectatorService } from '@ngneat/spectator';
import { createHttpFactory } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { FilesQuery } from '@modules/files/state/files.query';
import { FilesService } from '@modules/files/state/files.service';
import { API_BASE_URL } from '@shared/config/tokens';
import { File } from '@shared/model/file';

describe('FilesService', () => {
  let spectator: SpectatorService<FilesService>;
  const file: File = {
    id: 'id',
    lifetimeChanges: 1,
    lifetimeAuthors: 2,
    coveragePercentage: 50,
    path: 'file.ts',
    lines: [],
    filename: '',
    snapshotId: 'snapshotId'
  };
  const createHttp = createHttpFactory({
    providers: [{ provide: API_BASE_URL, useFactory: () => 'url' }],
    mocks: [HttpClient],
    service: FilesService
  });
  const jestExpect = (actual, expected) => expect(actual).toStrictEqual(expected);

  beforeEach(() => (spectator = createHttp()));

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('getFileDetails(id)', () => {
    it('should invoke the correct endpoint', () => {
      const http = spectator.inject(HttpClient);
      http.get.andReturn(of());

      spectator.service.getFileDetails('id').subscribe();

      expect(http.get).toHaveBeenCalledWith('url/files/id');
    });

    it('should insert the file details into the store', () => {
      const http = spectator.inject(HttpClient);
      const query = spectator.inject(FilesQuery);
      http.get.andReturn(of(file));

      spectator.service.getFileDetails('id').subscribe();

      expect(query.getEntity('id')).not.toBeUndefined();
    });

    it('should return newly fetched file details', () => {
      const http = spectator.inject(HttpClient);
      const scheduler = new TestScheduler(jestExpect);

      scheduler.run(({ expectObservable, cold }) => {
        http.get.andReturn(cold('--a|', { a: file }));

        expectObservable(spectator.service.getFileDetails('id')).toBe('--a|', { a: file });
      });
    });

    it('should set store error if server query fails', () => {
      const http = spectator.inject(HttpClient);
      const scheduler = new TestScheduler(jestExpect);
      const query = spectator.inject(FilesQuery);

      scheduler.run(({ expectObservable, cold }) => {
        http.get.andReturn(cold('--#|'));

        expectObservable(spectator.service.getFileDetails('id')).toBe('--#', { a: 'error' });
        expectObservable(query.selectError()).toBe('a-b', { a: null, b: 'error' });
        expectObservable(query.selectLoading()).toBe('a-b', { a: true, b: false });
      });
    });

    it('should set loading flag while the query is in progress', () => {
      const http = spectator.inject(HttpClient);
      const scheduler = new TestScheduler(jestExpect);
      const query = spectator.inject(FilesQuery);

      scheduler.run(({ expectObservable, cold }) => {
        http.get.andReturn(cold('--a|', { a: file }));

        expectObservable(spectator.service.getFileDetails('id')).toBe('--a|', { a: file });
        expectObservable(query.selectLoading()).toBe('a-b', { a: true, b: false });
      });
    });
  });

  describe('getAllFilesForSnapshot(snapshotId)', () => {
    it('should invoke the correct endpoint', () => {
      const http = spectator.inject(HttpClient);
      http.get.andReturn(of());

      spectator.service.getAllFilesForSnapshot('id').subscribe();

      expect(http.get).toHaveBeenCalledWith('url/snapshots/id/files');
    });

    it('should insert files into the store', () => {
      const http = spectator.inject(HttpClient);
      const query = spectator.inject(FilesQuery);
      http.get.andReturn(of([file]));

      spectator.service.getAllFilesForSnapshot('id').subscribe();

      expect(query.getAll()).toHaveLength(1);
    });

    it('should not invoke the endpoint twice if files are already in store', () => {
      const http = spectator.inject(HttpClient);
      http.get.andReturn(of([file]));

      spectator.service.getAllFilesForSnapshot('id').subscribe();

      expect(http.get).toHaveBeenCalledTimes(1);
    });

    it('should return newly retrieved files', () => {
      const http = spectator.inject(HttpClient);
      const scheduler = new TestScheduler(jestExpect);

      scheduler.run(({ expectObservable, cold }) => {
        http.get.andReturn(cold('--a|', { a: [file] }));

        expectObservable(spectator.service.getAllFilesForSnapshot('id')).toBe('--a|', { a: [file] });
      });
    });

    it('should set store error if server query fails', () => {
      const http = spectator.inject(HttpClient);
      const scheduler = new TestScheduler(jestExpect);
      const query = spectator.inject(FilesQuery);

      scheduler.run(({ expectObservable, cold }) => {
        http.get.andReturn(cold('--#|'));

        expectObservable(spectator.service.getAllFilesForSnapshot('id')).toBe('--#', { a: 'error' });
        expectObservable(query.selectError()).toBe('a-b', { a: null, b: 'error' });
        expectObservable(query.selectLoading()).toBe('a-b', { a: true, b: false });
      });
    });

    it('should set loading flag while query is in progress', () => {
      const http = spectator.inject(HttpClient);
      const scheduler = new TestScheduler(jestExpect);
      const query = spectator.inject(FilesQuery);

      scheduler.run(({ expectObservable, cold }) => {
        http.get.andReturn(cold('--a|', { a: [file] }));

        expectObservable(spectator.service.getAllFilesForSnapshot('id')).toBe('--a|', { a: [file] });
        expectObservable(query.selectLoading()).toBe('a-b', { a: true, b: false });
      });
    });
  });

  describe('selectActive', () => {
    it('should set the correct file as active', () => {
      const http = spectator.inject(HttpClient);
      const query = spectator.inject(FilesQuery);
      http.get.andReturn(of(file));
      spectator.service.getFileDetails('id');

      spectator.service.selectActive('id');

      expect(query.getActiveId()).toBe('id');
    });
  });
});
