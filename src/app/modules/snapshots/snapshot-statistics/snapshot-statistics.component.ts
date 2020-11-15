import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilesService } from '@modules/files/state/files.service';
import { SnapshotsQuery } from '@modules/snapshots/state/snapshots.query';
import { ButtonCellRendererComponent } from '@shared/components/button-cell-renderer/button-cell-renderer.component';
import { File } from '@shared/model/file';
import { ColDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, RowDoubleClickedEvent } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-snapshot-statistics',
  templateUrl: './snapshot-statistics.component.html',
  styleUrls: ['./snapshot-statistics.component.scss']
})
export class SnapshotStatisticsComponent implements OnInit, OnDestroy {
  constructor(private filesService: FilesService, private snapshotsQuery: SnapshotsQuery) {}

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
          this.filesService.selectActive(field.data.id);
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

  openFileDetails = (event: RowDoubleClickedEvent): void => this.filesService.selectActive((event.data as File).id);

  public ngOnDestroy(): void {
    this.selectedSnapshotSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.frameworkComponents = {
      buttonCellRenderer: ButtonCellRendererComponent
    };
    this.selectedSnapshotSubscription = this.snapshotsQuery.activeId$
      .pipe(switchMap((id: string) => this.filesService.getAllFilesForSnapshot(id)))
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
