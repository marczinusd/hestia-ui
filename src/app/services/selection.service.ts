import { Injectable } from '@angular/core';
import { Subject, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private readonly selectedSnapshotIdSubject: Subject<string> = new ReplaySubject<string>(1);
  private readonly selectedFileIdSubject: Subject<string> = new Subject<string>();

  public selectedFileId: Observable<string> = this.selectedFileIdSubject;
  public selectedSnapshotId: Observable<string> = this.selectedSnapshotIdSubject;

  public selectFile(id: string): void {
    this.selectedFileIdSubject.next(id);
  }

  public selectSnapshot(id: string): void {
    this.selectedSnapshotIdSubject.next(id);
  }
}
