/* eslint-disable @typescript-eslint/unbound-method */
import { HttpClient } from '@angular/common/http';
import { createRoutingFactory, Spectator } from '@ngneat/spectator/jest';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, ColumnApi, CsvExportParams, GridApi, RowDoubleClickedEvent } from 'ag-grid-community';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { SnapshotStatisticsComponent } from './snapshot-statistics.component';

import { FilesService } from '@modules/files/state/files.service';
import { SnapshotsQuery } from '@modules/snapshots/state/snapshots.query';
import { mockFile } from '@shared/mocks/file.mock';

describe('SnapshotStatisticsComponent', () => {
  let spectator: Spectator<SnapshotStatisticsComponent>;
  const event: RowDoubleClickedEvent = {
    api: undefined,
    columnApi: undefined,
    context: undefined,
    node: undefined,
    rowIndex: 0,
    rowPinned: '',
    type: '',
    data: undefined
  };
  const createComponent = createRoutingFactory({
    component: SnapshotStatisticsComponent,
    imports: [AgGridModule.withComponents()],
    providers: [],
    mocks: [HttpClient, FilesService, SnapshotsQuery],
    detectChanges: false
  });
  const jestExpect = (actual, expected) => expect(actual).toStrictEqual(expected);

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toExist();
  });

  it('should publish selected file id on observable', () => {
    const filesService = spectator.inject(FilesService);
    const query = spectator.inject(SnapshotsQuery);
    query.activeId$ = of('1');
    filesService.getAllFilesForSnapshot.andReturn(of([mockFile]));
    spectator.component.gridReady({
      columnApi: {
        autoSizeAllColumns: () => {}
      } as ColumnApi,
      api: {
        sizeColumnsToFit: () => {},
        exportDataAsCsv: () => {},
        exportDataAsExcel: () => {}
      } as GridApi,
      type: ''
    });
    spectator.detectChanges();

    spectator.component.openFileDetails({ ...event, data: { id: '42' } });

    expect(filesService.selectActive).toHaveBeenCalled();
  });

  it('should provide callback for cell renderer that invokes FilesService', () => {
    const filesService = spectator.inject(FilesService);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const callback = (spectator.component.columnDefs[7] as ColDef)?.cellRendererParams?.clicked as ({ data: File }) => void;

    callback({ data: mockFile });

    expect(filesService.selectActive).toHaveBeenCalledWith(mockFile.id);
  });

  it('should use gridApi.exportDataAsCsv() when export to csv button is pressed', () => {
    const query = spectator.inject(SnapshotsQuery);
    query.activeId$ = of('1');
    const filesService = spectator.inject(FilesService);
    filesService.getAllFilesForSnapshot.andReturn(of([mockFile]));

    let exportAsCsvInvoked = false;
    spectator.component.gridReady({
      columnApi: {
        autoSizeAllColumns: () => {}
      } as ColumnApi,
      api: {
        sizeColumnsToFit: () => {},
        exportDataAsCsv: () => {
          exportAsCsvInvoked = true;
        }
      } as GridApi,
      type: ''
    });
    spectator.detectChanges();

    spectator.click(spectator.query('#export-to-csv-button'));

    expect(exportAsCsvInvoked).toBeTruthy();
  });

  it('should set rowData correctly', () => {
    const filesService = spectator.inject(FilesService);
    const query = spectator.inject(SnapshotsQuery);
    const scheduler = new TestScheduler(jestExpect);
    scheduler.run(({ cold }) => {
      filesService.getAllFilesForSnapshot.andReturn(cold('(a|)', { a: [mockFile] }));
      query.activeId$ = cold('(a|)', { a: '1' });

      spectator.detectChanges();
      scheduler.flush();

      expect(spectator.component.rowData).toHaveLength(1);
    });
  });
});
