import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { SnapshotsState, SnapshotsStore } from './snapshots.store';

@Injectable({ providedIn: 'root' })
export class SnapshotsQuery extends QueryEntity<SnapshotsState> {
  activeId$: Observable<string> = this.selectActiveId().pipe(filter((id) => id !== undefined));

  constructor(protected store: SnapshotsStore) {
    super(store);
  }
}
