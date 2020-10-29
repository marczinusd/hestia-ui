import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ColDef, RowDoubleClickedEvent } from 'ag-grid-community';
import { FileDetailsService } from '../../services/file-details.service';
import { File } from '../../model/file';
import { SelectionService } from '../../services/selection.service';

@Component({
  selector: 'app-snapshot-statistics',
  templateUrl: './snapshot-statistics.component.html',
  styleUrls: ['./snapshot-statistics.component.scss']
})
export class SnapshotStatisticsComponent implements OnInit {
  @Input() public snapshotId: string;
  @Output() public selectedFileId = new EventEmitter<string>();
  constructor(private fileDetailsService: FileDetailsService, private selectionService: SelectionService) {}

  public columnDefs: ColDef[] = [
    {
      field: 'path',
      sortable: true
    },
    {
      field: 'lifetimeAuthors',
      sortable: true
    },
    {
      field: 'lifetimeChanges',
      sortable: true
    },
    {
      field: 'coveragePercentage',
      sortable: true
    }
  ];

  public rowData: File[];

  openFileDetails(event: RowDoubleClickedEvent): void {
    const file = event.data as File;
    this.selectedFileId.emit(file.id);
    this.selectionService.selectFile(file.id);
  }

  ngOnInit(): void {
    this.rowData = [
      { lifetimeAuthors: 1, lifetimeChanges: 42, coveragePercentage: 50, id: '1', path: '/dev/bla.ts', lines: [] },
      { lifetimeAuthors: 1, lifetimeChanges: 42, coveragePercentage: 50, id: '2', path: '/dev/bla.cs', lines: [] },
      { lifetimeAuthors: 1, lifetimeChanges: 42, coveragePercentage: 50, id: '3', path: '/dev/bla.js', lines: [] }
    ];
    this.fileDetailsService.getAllFilesForSnapshot(this.snapshotId).subscribe((val) => {
      this.rowData = val.map((f) => {
        return {
          ...f,
          path: f.path.split('\\').pop().split('/').pop()
        };
      });
      console.log(this.rowData);
    });
  }
}
