import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { Snapshot } from '@shared/model/snapshot';

export type SnapshotsState = EntityState<Snapshot>;

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'snapshots' })
export class SnapshotsStore extends EntityStore<SnapshotsState> {
  constructor() {
    super();
  }
}
