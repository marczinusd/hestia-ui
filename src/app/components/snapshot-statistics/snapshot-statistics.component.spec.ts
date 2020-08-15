import { SnapshotStatisticsComponent } from './snapshot-statistics.component';
import { createRoutingFactory, Spectator } from '@ngneat/spectator/jest';
import { RouterTestingModule } from '@angular/router/testing';
import { AgGridModule } from 'ag-grid-angular';
import { Router } from '@angular/router';

describe('SnapshotStatisticsComponent', () => {
  let spectator: Spectator<SnapshotStatisticsComponent>;
  const createComponent = createRoutingFactory({
    component: SnapshotStatisticsComponent,
    imports: [RouterTestingModule, AgGridModule.withComponents()],
    mocks: [Router]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create the component', () => {
    const navigate = jest.spyOn(spectator.inject(Router), 'navigate');
    spectator.component.snapshotId = 123;

    spectator.component.openFileDetails({
      api: undefined,
      columnApi: undefined,
      context: undefined,
      node: undefined,
      rowIndex: 0,
      rowPinned: '',
      type: '',
      data: { id: 42 }
    });

    expect(navigate).toHaveBeenCalledWith(['snapshots', 123, 'files', 42]);
  });
});
