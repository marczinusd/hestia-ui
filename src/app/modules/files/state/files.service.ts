import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FilesQuery } from '@modules/files/state/files.query';
import { API_BASE_URL } from '@shared/config/tokens';
import { File } from '@shared/model/file';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { FilesStore } from './files.store';

@Injectable({ providedIn: 'root' })
export class FilesService {
  constructor(private http: HttpClient, private store: FilesStore, private query: FilesQuery, @Inject(API_BASE_URL) private baseUrl?: string) {}

  public getFileDetails(id: string): Observable<File> {
    if (id === undefined) {
      return of();
    }

    return this.http.get<File>(`${this.baseUrl}/files/${id}`).pipe(
      tap((file) => {
        this.store.update(file.id, (state) => ({
          lines: file.lines,
          ...state
        }));
      })
    );
  }

  public getAllFilesForSnapshot(snapshotId: string): Observable<File[]> {
    if (this.query.getAll().find((f) => f.snapshotId === snapshotId) !== undefined) {
      return this.query.selectAll();
    }

    return this.http.get<File[]>(`${this.baseUrl}/snapshots/${snapshotId}/files`).pipe(
      tap((files) => {
        this.store.upsertMany(files);
      })
    );
  }

  public selectActive(fileId: string): void {
    this.store.setActive(fileId);
  }
}
