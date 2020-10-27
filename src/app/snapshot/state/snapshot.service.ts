import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Snapshot, File } from './snapshot.model';
import { SnapshotStore } from './snapshot.store';
import { Observable, throwError } from 'rxjs';
import { arrayAdd, arrayUpsert } from '@datorama/akita';
import { API_BASE_URL } from '../../services/snapshots.service';

@Injectable({ providedIn: 'root' })
export class SnapshotService {
  constructor(private snapshotStore: SnapshotStore, private http: HttpClient, @Inject(API_BASE_URL) private baseUrl?: string) {}

  public loadSnapshots(): Observable<Snapshot[]> {
    this.snapshotStore.setLoading(true);
    return this.http.get<Snapshot[]>(`${this.baseUrl}/snapshots`).pipe(
      tap((snapshots) => {
        this.snapshotStore.set(snapshots);
        this.snapshotStore.setLoading(false);
      }),
      catchError((err) => {
        this.snapshotStore.setError(err);
        return throwError(err);
      })
    );
  }

  public loadFilesForSnapshot(snapshotId: string): Observable<File[]> {
    return this.http.get<File[]>(`${this.baseUrl}/snapshots/${snapshotId}/files`).pipe(
      tap((newFiles) => {
        this.snapshotStore.update(snapshotId, ({ files }) => ({
          files: arrayAdd(files, newFiles)
        }));
      })
    );
  }

  public loadFileDetails(fileId: string, snapshotId: string): Observable<File> {
    return this.http.get<File>(`${this.baseUrl}/files/${fileId}`).pipe(
      tap((newFile) => {
        this.snapshotStore.update(snapshotId, ({ files }) => ({
          files: arrayUpsert(files, fileId, newFile)
        }));
      })
    );
  }
}
