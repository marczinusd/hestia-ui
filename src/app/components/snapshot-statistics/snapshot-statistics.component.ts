import { Component, Input, OnInit } from '@angular/core';
import { ColDef, RowDoubleClickedEvent } from 'ag-grid-community';
import { Router } from '@angular/router';

@Component({
  selector: 'app-snapshot-statistics',
  templateUrl: './snapshot-statistics.component.html',
  styleUrls: ['./snapshot-statistics.component.scss']
})
export class SnapshotStatisticsComponent {
  @Input() public snapshotId: number;

  constructor(private router: Router) {}

  public columnDefs: ColDef[] = [
    { field: 'filename', sortable: true },
    { field: 'numberOfAuthors', sortable: true },
    {
      field: 'numberOfChanges',
      sortable: true
    }
  ];

  public rowData: File[] = [
    { filename: 'bla.ts', numberOfAuthors: 1, numberOfChanges: 42, id: 1 },
    { filename: 'foo.ts', numberOfAuthors: 5, numberOfChanges: 232, id: 2 },
    { filename: 'bar.ts', numberOfAuthors: 75, numberOfChanges: 123, id: 3 }
  ];

  openFileDetails(event: RowDoubleClickedEvent): void {
    const file = event.data as File;
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['snapshots', this.snapshotId, 'files', file.id]);
  }
}

type File = { filename: string; numberOfAuthors: number; numberOfChanges: number; id: number };
