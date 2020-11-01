import { Component, OnDestroy, OnInit } from '@angular/core';
import { ColDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, RowDoubleClickedEvent } from 'ag-grid-community';
import { FileDetailsService } from '../../services/file-details.service';
import { File } from '../../model/file';
import { SelectionService } from '../../services/selection.service';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ButtonCellRendererComponent } from '../button-cell-renderer/button-cell-renderer.component';

@Component({
  selector: 'app-snapshot-statistics',
  templateUrl: './snapshot-statistics.component.html',
  styleUrls: ['./snapshot-statistics.component.scss']
})
export class SnapshotStatisticsComponent implements OnInit, OnDestroy {
  constructor(private fileDetailsService: FileDetailsService, private selectionService: SelectionService) {}

  public columnDefs: (ColDef | { field: keyof File })[] = [
    {
      field: 'filename'
    },
    {
      field: 'path'
    },
    {
      field: 'lifetimeAuthors'
    },
    {
      field: 'lifetimeChanges'
    },
    {
      field: 'coveragePercentage'
    },
    {
      field: 'id'
    },
    {
      field: 'open',
      cellRenderer: 'buttonCellRenderer',
      headerName: '',
      cellRendererParams: {
        clicked: (field: { data: File }): void => {
          this.selectionService.selectFile(field.data.id);
        }
      },
      minWidth: 90
    }
  ];
  public defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    flex: 1,
    filter: true
  };

  public frameworkComponents;

  options: GridOptions = {};
  gridApi: GridApi;
  columnApi: ColumnApi;

  public rowData: File[] = [];
  private selectedSnapshotSubscription: Subscription;

  openFileDetails = (event: RowDoubleClickedEvent): void => this.selectionService.selectFile((event.data as File).id);

  public ngOnDestroy(): void {
    this.selectedSnapshotSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.frameworkComponents = {
      buttonCellRenderer: ButtonCellRendererComponent
    };
    this.selectedSnapshotSubscription = this.selectionService.selectedSnapshotId
      .pipe(switchMap((id) => this.fileDetailsService.getAllFilesForSnapshot(id)))
      .subscribe((val) => {
        this.rowData = val.map((f) => ({
          ...f,
          filename: f.path.split('\\').pop().split('/').pop()
        }));
        this.columnApi?.autoSizeAllColumns();
        this.gridApi?.sizeColumnsToFit();
      });
  }

  gridReady($event: GridReadyEvent): void {
    this.gridApi = $event.api;
    this.columnApi = $event.columnApi;
  }
}
