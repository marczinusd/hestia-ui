import { SnapshotDetailsComponent } from './snapshot-details.component';
import { createRoutingFactory, mockProvider, SpectatorRouting, SpyObject } from '@ngneat/spectator/jest';
import { SnapshotsService } from '../../services/snapshots.service';
import { Snapshot } from '../../model/snapshot';

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

  it('should render dashboard id', () => {
    expect(spectator.query('p')).toHaveText('4');
  });
});
