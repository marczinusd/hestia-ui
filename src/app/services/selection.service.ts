import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileSelectionStateService {
  public selectedFileId: Observable<string>;
}

@Injectable({
  providedIn: 'root'
})
export class SelectionService extends FileSelectionStateService {
  protected readonly selectedFileIdSubject: BehaviorSubject<string>;

  constructor() {
    super();
    this.selectedFileIdSubject = new BehaviorSubject<string>(undefined);
    this.selectedFileId = this.selectedFileIdSubject;
  }

  public selectFile(id: string): void {
    this.selectedFileIdSubject.next(id);
  }
}
