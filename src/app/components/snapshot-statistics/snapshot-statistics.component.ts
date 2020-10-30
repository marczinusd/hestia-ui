import { Component, OnInit } from '@angular/core';
import { ColDef, RowDoubleClickedEvent } from 'ag-grid-community';
import { FileDetailsService } from '../../services/file-details.service';
import { File } from '../../model/file';
import { SelectionService } from '../../services/selection.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-snapshot-statistics',
  templateUrl: './snapshot-statistics.component.html',
  styleUrls: ['./snapshot-statistics.component.scss']
})
export class SnapshotStatisticsComponent implements OnInit {
  constructor(private fileDetailsService: FileDetailsService, private selectionService: SelectionService) {}

  public columnDefs: (ColDef | { field: keyof File })[] = [
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

  public rowData: File[] = [];

  openFileDetails = (event: RowDoubleClickedEvent): void => this.selectionService.selectFile((event.data as File).id);

  ngOnInit(): void {
    this.selectionService.selectedSnapshotId.pipe(switchMap((id) => this.fileDetailsService.getAllFilesForSnapshot(id))).subscribe((val) => {
      this.rowData = val.map((f) => {
        return {
          ...f,
          path: f.path.split('\\').pop().split('/').pop()
        };
      });
    });
  }
}
