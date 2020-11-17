import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { FilesState, FilesStore } from './files.store';

@Injectable({ providedIn: 'root' })
export class FilesQuery extends QueryEntity<FilesState> {
  activeId$: Observable<string> = this.selectActiveId().pipe(filter((id) => id !== undefined)) as Observable<string>;

  constructor(protected store: FilesStore) {
    super(store);
  }
}
