import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { SnapshotStore, SnapshotState } from './snapshot.store';

@Injectable({ providedIn: 'root' })
export class SnapshotQuery extends QueryEntity<SnapshotState> {
  isLoading$ = this.select((store) => store.loading);

  constructor(protected store: SnapshotStore) {
    super(store);
  }
}
