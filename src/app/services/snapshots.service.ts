import { Inject, Injectable, InjectionToken } from '@angular/core';
import { File as ModelFile } from '../model/file';
import { Snapshot } from '../model/snapshot';
import { SnapshotHeader } from '../model/snapshot-header';
import { Observable } from 'rxjs';
import { subscribeToResult } from 'rxjs/internal-compatibility';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root'
})
export class SnapshotsService {
  constructor(private http: HttpClient, @Inject(API_BASE_URL) private baseUrl?: string) {}

  public getAllHeaders(): Observable<SnapshotHeader[]> {
    return this.http.get<SnapshotHeader[]>(`${this.baseUrl}/snapshots`);
  }

  public getSnapshotDetails(id: number): Snapshot {
    return new Snapshot(id, '', '', [new ModelFile('')]);
  }
}
