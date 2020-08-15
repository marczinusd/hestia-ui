import { SnapshotDetailsComponent } from './snapshot-details.component';
import { createRoutingFactory, mockProvider, SpectatorRouting } from '@ngneat/spectator/jest';
import { SnapshotsService } from '../../services/snapshots.service';
import { Snapshot } from '../../model/snapshot';
import { MatTabsModule } from '@angular/material/tabs';
import { SnapshotStatisticsComponent } from '../snapshot-statistics/snapshot-statistics.component';
import { SnapshotTreeComponent } from '../snapshot-tree/snapshot-tree.component';
import { MockComponent } from 'ng-mocks';
import { FileDetailsComponent } from '../file-details/file-details.component';

describe('SnapshotDetailsComponent', () => {
  let spectator: SpectatorRouting<SnapshotDetailsComponent>;
  const createComponent = createRoutingFactory({
    component: SnapshotDetailsComponent,
    providers: [
      mockProvider(SnapshotsService, {
        getSnapshotDetails: (id: number): Snapshot => {
          return new Snapshot(id, '', '', []);
        }
      })
    ],
    declarations: [MockComponent(SnapshotStatisticsComponent), MockComponent(SnapshotTreeComponent), MockComponent(FileDetailsComponent)],
    imports: [MatTabsModule],
    params: { id: '4' }
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create component successfully', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should invoke snapshots service', () => {
    const service = spectator.inject(SnapshotsService);
    const method = jest.spyOn(service, 'getSnapshotDetails');

    spectator.component.ngOnInit();

    expect(method).toHaveBeenCalledTimes(1);
  });
});
