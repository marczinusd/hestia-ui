import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Snapshot } from './snapshot.model';

export type SnapshotState = EntityState<Snapshot>;

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'snapshot' })
export class SnapshotStore extends EntityStore<SnapshotState> {
  constructor() {
    super();
  }
}
