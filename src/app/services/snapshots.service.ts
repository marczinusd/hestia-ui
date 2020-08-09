import { Injectable } from '@angular/core';
import { File as ModelFile } from '../model/file';
import { Snapshot } from '../model/snapshot';
import { SnapshotHeader } from '../model/snapshot-header';

@Injectable({
  providedIn: 'root'
})
export class SnapshotsService {
  public getAllHeaders(): SnapshotHeader[] {
    return [new SnapshotHeader(1, '')];
  }

  public getSnapshotDetails(id: number): Snapshot {
    return new Snapshot(id, '', '', [new ModelFile('')]);
  }
}
