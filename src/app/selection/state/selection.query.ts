import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SelectionStore, SelectionState } from './selection.store';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SelectionQuery extends Query<SelectionState> {
  public selectedFileId$: Observable<string> = this.select((state) => state.selectedFileId);
  public selectedSnapshotId$: Observable<string> = this.select((state) => state.selectedSnapshotId);

  constructor(protected store: SelectionStore) {
    super(store);
  }
}
