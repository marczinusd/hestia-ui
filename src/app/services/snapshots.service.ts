import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Snapshot } from '../model/snapshot';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root'
})
export class SnapshotsService {
  constructor(private http: HttpClient, @Inject(API_BASE_URL) private baseUrl?: string) {}

  public getAllHeaders(): Observable<Snapshot[]> {
    return this.http.get<Snapshot[]>(`${this.baseUrl}/snapshots`);
  }

  public getSnapshotDetails(id: string): Observable<Snapshot> {
    return this.http.get<Snapshot>(`${this.baseUrl}/snapshots/${id}`);
  }
}
