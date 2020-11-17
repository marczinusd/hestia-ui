import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { applyTransaction, withTransaction } from '@datorama/akita';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SnapshotsStore } from './snapshots.store';

import { API_BASE_URL } from '@shared/config/tokens';
import { Snapshot } from '@shared/model/snapshot';

@Injectable({ providedIn: 'root' })
export class SnapshotsService {
  constructor(protected store: SnapshotsStore, private http: HttpClient, @Inject(API_BASE_URL) private baseUrl?: string) {}

  public getSnapshotDetails(id: string): Observable<Snapshot> {
    this.store.setLoading(true);

    return this.http.get<Snapshot>(`${this.baseUrl}/snapshots/${id}`).pipe(
      withTransaction((snapshot) => {
        this.store.upsert(snapshot.id, snapshot);
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

  public getAllHeaders(): Observable<Snapshot[]> {
    this.store.setLoading(true);

    return this.http.get<Snapshot[]>(`${this.baseUrl}/snapshots`).pipe(
      withTransaction((snapshots) => {
        this.store.set(snapshots);
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

  public selectActive(id: string): void {
    this.store.setActive(id);
  }
}
