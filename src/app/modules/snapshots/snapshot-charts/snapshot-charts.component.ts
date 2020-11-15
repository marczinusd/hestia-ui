import { Component, OnInit } from '@angular/core';
import { SnapshotsQuery } from '@modules/snapshots/state/snapshots.query';
import { SnapshotsService } from '@modules/snapshots/state/snapshots.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-snapshot-charts',
  templateUrl: './snapshot-charts.component.html',
  styleUrls: ['./snapshot-charts.component.scss']
})
export class SnapshotChartsComponent implements OnInit {
  currentSnapshot$: Observable<string>;

  constructor(private snapshotsQuery: SnapshotsQuery) {}

  ngOnInit(): void {
    this.currentSnapshot$ = this.snapshotsQuery.activeId$;
  }
}
