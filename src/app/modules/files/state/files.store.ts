import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { File } from '@shared/model/file';

export type FilesState = EntityState<File>;

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'files' })
export class FilesStore extends EntityStore<FilesState> {
  constructor() {
    super();
  }
}
