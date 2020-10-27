import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileDetails } from '../model/fileDetails';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from './snapshots.service';

@Injectable({
  providedIn: 'root'
})
export class FileDetailsService {
  constructor(private http: HttpClient, @Inject(API_BASE_URL) private baseUrl?: string) {}

  public getFileDetails(id: string): Observable<FileDetails> {
    return this.http.get<FileDetails>(`${this.baseUrl}/files/${id}`);
  }
}
