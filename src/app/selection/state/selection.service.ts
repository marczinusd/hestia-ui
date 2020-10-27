import { Injectable } from '@angular/core';
import { SelectionStore } from './selection.store';

@Injectable({ providedIn: 'root' })
export class SelectionService {
  constructor(private selectionStore: SelectionStore) {}

  public setFileSelection(fileId: string): void {
    this.selectionStore.update({ selectedFileId: fileId });
  }

  public setSnapshotSelection(snapshotId: string): void {
    this.selectionStore.update({ selectedSnapshotId: snapshotId });
  }
}
