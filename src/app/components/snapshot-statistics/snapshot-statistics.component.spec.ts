import { SnapshotStatisticsComponent } from './snapshot-statistics.component';
import { createRoutingFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { AgGridModule } from 'ag-grid-angular';
import { RowDoubleClickedEvent } from 'ag-grid-community';
import { FileDetailsService } from '../../services/file-details.service';
import { SelectionService } from '../../services/selection.service';
import { of } from 'rxjs';

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
    providers: [mockProvider(FileDetailsService, { getAllFilesForSnapshot: () => of() }), mockProvider(SelectionService, { selectedSnapshotId: of('1') })]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should publish selected file id on observable', () => {
    const selectionService = spectator.inject(SelectionService);
    const selectFn = jest.spyOn(selectionService, 'selectFile');

    spectator.component.openFileDetails({ ...event, data: { id: '42' } });

    expect(selectFn).toHaveBeenCalled();
  });
});
