import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { applyTransaction, withTransaction } from '@datorama/akita';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { FilesStore } from './files.store';

import { FilesQuery } from '@modules/files/state/files.query';
import { API_BASE_URL } from '@shared/config/tokens';
import { File } from '@shared/model/file';

@Injectable({ providedIn: 'root' })
export class FilesService {
  constructor(private http: HttpClient, private store: FilesStore, private query: FilesQuery, @Inject(API_BASE_URL) private baseUrl?: string) {}

  public getFileDetails(id: string): Observable<File> {
    this.store.setLoading(true);

    return this.http.get<File>(`${this.baseUrl}/files/${id}`).pipe(
      withTransaction((file) => {
        this.store.upsert(file.id, (state) => ({
          lines: file.lines,
          filename: file.path.split('\\').pop().split('/').pop(),
          ...state
        }));
        this.store.setLoading(false);
      }),
      catchError((error) => {
        applyTransaction(() => {
          this.store.setLoading(false);
          this.store.setError(error);
        });

        return throwError(error);
      })
    );
  }

  public getAllFilesForSnapshot(snapshotId: string): Observable<File[]> {
    this.store.setLoading(true);

    return this.http.get<File[]>(`${this.baseUrl}/snapshots/${snapshotId}/files`).pipe(
      withTransaction((files) => {
        this.store.upsertMany(
          files.map((f) => ({
            filename: f.path.split('\\').pop().split('/').pop(),
            ...f
          }))
        );
        this.store.setLoading(false);
      }),
      catchError((error) => {
        applyTransaction(() => {
          this.store.setLoading(false);
          this.store.setError(error);
        });

        return throwError(error);
      })
    );
  }

  public selectActive(fileId: string): void {
    this.store.setActive(fileId);
  }
}
