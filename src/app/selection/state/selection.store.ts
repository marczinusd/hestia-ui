import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface SelectionState {
  selectedFileId: string;
  selectedSnapshotId: string;
}

export function createInitialState(): SelectionState {
  return {
    selectedFileId: undefined,
    selectedSnapshotId: undefined
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'selection' })
export class SelectionStore extends Store<SelectionState> {
  constructor() {
    super(createInitialState());
  }
}
