import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private readonly selectedSnapshotIdSubject: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);
  private readonly selectedFileIdSubject: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);

  public selectedFileId: Observable<string> = this.selectedFileIdSubject;
  public selectedSnapshotId: Observable<string> = this.selectedSnapshotIdSubject;

  public selectFile(id: string): void {
    this.selectedFileIdSubject.next(id);
  }

  public selectSnapshot(id: string): void {
    this.selectedSnapshotIdSubject.next(id);
  }
}
