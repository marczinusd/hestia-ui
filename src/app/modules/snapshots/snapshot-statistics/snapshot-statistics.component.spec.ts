import { HttpClient } from '@angular/common/http';
import { FilesQuery } from '@modules/files/state/files.query';
import { FilesService } from '@modules/files/state/files.service';
import { SnapshotsQuery } from '@modules/snapshots/state/snapshots.query';
import { createRoutingFactory, Spectator } from '@ngneat/spectator/jest';
import { mockFile } from '@shared/mocks/file.mock';
import { AgGridModule } from 'ag-grid-angular';
import { RowDoubleClickedEvent } from 'ag-grid-community';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { SnapshotStatisticsComponent } from './snapshot-statistics.component';

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
    spectator.detectChanges();

    spectator.component.openFileDetails({ ...event, data: { id: '42' } });

    expect(filesService.selectActive).toHaveBeenCalled();
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
