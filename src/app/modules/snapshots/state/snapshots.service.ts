import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '@shared/config/tokens';
import { Snapshot } from '@shared/model/snapshot';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SnapshotsStore } from './snapshots.store';

@Injectable({ providedIn: 'root' })
export class SnapshotsService {
  constructor(protected store: SnapshotsStore, private http: HttpClient, @Inject(API_BASE_URL) private baseUrl?: string) {}

  public getSnapshotDetails(id: string): Observable<Snapshot> {
    this.store.setLoading(true);

    return this.http.get<Snapshot>(`${this.baseUrl}/snapshots/${id}`).pipe(
      tap((snapshot) => {
        this.store.upsert(snapshot.id, snapshot);
        this.store.setLoading(false);
      })
    );
  }

  public getAllHeaders(): Observable<Snapshot[]> {
    return this.http.get<Snapshot[]>(`${this.baseUrl}/snapshots`).pipe(
      tap((snapshots) => {
        this.store.set(snapshots);
      })
    );
  }

  public selectSnapshot(id: string): void {
    this.store.setActive(id);
  }
}
