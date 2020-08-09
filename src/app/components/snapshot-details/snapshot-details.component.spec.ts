import { SnapshotDetailsComponent } from './snapshot-details.component';
import { createRoutingFactory, SpectatorRouting } from '@ngneat/spectator/jest';

describe('SnapshotDetailsComponent', () => {
  let spectator: SpectatorRouting<SnapshotDetailsComponent>;
  const createComponent = createRoutingFactory({
    component: SnapshotDetailsComponent,
    params: { id: '4' }
  });
  beforeEach(() => (spectator = createComponent()));

  it('should create component successfully', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should render dashboard id', () => {
    expect(spectator.query('p')).toHaveText('4');
  });
});
