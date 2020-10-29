import { SnapshotStatisticsComponent } from './snapshot-statistics.component';
import { createRoutingFactory, Spectator } from '@ngneat/spectator/jest';
import { AgGridModule } from 'ag-grid-angular';
import { TestScheduler } from 'rxjs/testing';
import { RowDoubleClickedEvent } from 'ag-grid-community';

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
    imports: [AgGridModule.withComponents()]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should publish selected file id on observable', () => {
    const testScheduler: TestScheduler = new TestScheduler((actual, expected) => expect(actual).toStrictEqual(expected));
    spectator.component.snapshotId = '123';

    testScheduler.run(() => {
      const values = [];
      spectator.component.selectedFileId.subscribe((val) => values.push(val));
      spectator.component.openFileDetails({ ...event, data: { id: '42' } });

      expect(values[0]).toBe('42');
    });
  });
});
