import { Component, OnInit } from '@angular/core';
import { Snapshot } from '../../snapshot/state/snapshot.model';
import { SelectionQuery } from '../../selection/state/selection.query';
import { map, switchMap } from 'rxjs/operators';
import { SnapshotService } from '../../snapshot/state/snapshot.service';
import { SnapshotQuery } from '../../snapshot/state/snapshot.query';
import { combineLatest, Observable } from 'rxjs';

@Component({
  selector: 'app-snapshot-details',
  templateUrl: './snapshot-details.component.html',
  styleUrls: ['./snapshot-details.component.scss']
})
export class SnapshotDetailsComponent implements OnInit {
  public snapshot$: Observable<Snapshot>;

  constructor(private selectionQuery: SelectionQuery, private snapshotService: SnapshotService, private snapshotQuery: SnapshotQuery) {}

  ngOnInit(): void {
    this.selectionQuery.selectedSnapshotId$.pipe(switchMap((id) => this.snapshotService.loadFilesForSnapshot(id))).subscribe();
    this.snapshot$ = combineLatest([this.selectionQuery.selectedSnapshotId$, this.snapshotQuery.selectAll()]).pipe(
      map(([id, snapshots]) => {
        return snapshots.find((s) => s.id === id);
      })
    );
  }
}
