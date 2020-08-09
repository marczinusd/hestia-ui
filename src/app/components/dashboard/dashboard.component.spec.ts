import { DashboardComponent } from './dashboard.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('DashboardComponent', () => {
  let spectator: Spectator<DashboardComponent>;
  const createComponent = createComponentFactory({
    component: DashboardComponent,
    imports: []
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should contain expected snapshots header', () => {
    expect(spectator.query('h2')).toHaveText('Your snapshots');
  });
});
