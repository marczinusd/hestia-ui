import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from './snapshots.service';
import { File } from '../model/file';

@Injectable({
  providedIn: 'root'
})
export class FileDetailsService {
  constructor(private http: HttpClient, @Inject(API_BASE_URL) private baseUrl?: string) {}

  public getFileDetails(id: string): Observable<File> {
    return this.http.get<File>(`${this.baseUrl}/files/${id}`);
  }

  public getAllFilesForSnapshot(snapshotId: string): Observable<File[]> {
    return this.http.get<File[]>(`${this.baseUrl}/snapshots/${snapshotId}/files`);
  }
}
