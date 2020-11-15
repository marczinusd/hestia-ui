import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { byText, createRoutingFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { of, throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { Snapshot } from '../../model/snapshot';
import { SnapshotsService } from '../../services/snapshots.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let spectator: Spectator<DashboardComponent>;
  const createComponent = createRoutingFactory({
    component: DashboardComponent,
    imports: [MatCardModule, MatProgressSpinnerModule],
    mocks: [Router],
    providers: [
      mockProvider(SnapshotsService, {
        getAllHeaders: () => of([])
      })
    ]
  });
  const jestExpect = (actual, expected) => expect(actual).toStrictEqual(expected);
  const snapshot: Snapshot = { id: '1', atHash: '', name: '', files: [], commitDate: '' };

  beforeEach(() => {
    spectator = createComponent();
    spectator.detectComponentChanges();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should contain expected snapshots header', () => {
    expect(spectator.query('h1')).toHaveText('Your snapshots');
  });

  it('should render one snapshot header card', () => {
    const service = spectator.inject<SnapshotsService>(SnapshotsService);
    jest.spyOn(service, 'getAllHeaders').mockReturnValue(of([snapshot]));

    spectator.component.ngOnInit();

    expect(spectator.component.headers.length).toBe(1);
  });

  it('should show a refresh button', () => {
    expect(spectator.query('.refresh-button')).toHaveText('Refresh snapshots');
  });

  it('should fetch all snapshots if the refresh button is clicked', () => {
    const service = spectator.inject(SnapshotsService);
    const spy = jest.spyOn(service, 'getAllHeaders');

    spectator.click(spectator.query('.refresh-button'));

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should show progress spinner while snapshots are loading', () => {
    const service = spectator.inject<SnapshotsService>(SnapshotsService);
    const testScheduler = new TestScheduler(jestExpect);

    testScheduler.run(({ cold }) => {
      jest.spyOn(service, 'getAllHeaders').mockReturnValue(cold('-b|'));
      spectator.click(spectator.query('.refresh-button'));

      expect(spectator.query('.spinner-container')).toBeTruthy();
    });
  });

  it('should hide progress spinner once loading is finished', () => {
    const service = spectator.inject<SnapshotsService>(SnapshotsService);
    const testScheduler = new TestScheduler(jestExpect);

    testScheduler.run(({ cold }) => {
      jest.spyOn(service, 'getAllHeaders').mockReturnValue(cold('-b|', { b: [snapshot] }));
      spectator.click(spectator.query('.refresh-button'));
      testScheduler.flush();
      spectator.detectComponentChanges();

      expect(spectator.query('.spinner-container')).toBeFalsy();
    });
  });

  it('should show error message if snapshots could not be loaded', () => {
    const service = spectator.inject<SnapshotsService>(SnapshotsService);
    jest.spyOn(service, 'getAllHeaders').mockReturnValue(throwError('Oh no!'));

    spectator.click(spectator.query('.refresh-button'));

    expect(spectator.query(byText('Failed to load snapshots'))).toBeTruthy();
  });

  it('should redirect to correct route when open button is clicked on a snapshot', () => {
    const service = spectator.inject<SnapshotsService>(SnapshotsService);
    jest.spyOn(service, 'getAllHeaders').mockReturnValue(of([snapshot]));
    const navigate = jest.spyOn(spectator.inject(Router), 'navigate');
    navigate.mockReturnValue(Promise.resolve(true));

    spectator.component.ngOnInit();
    spectator.detectComponentChanges();

    spectator.click(spectator.query('.open-snapshot-button'));

    expect(navigate).toHaveBeenCalledWith(['snapshots', '1']);
  });

  it('should hide loading errors if the popups hide button is pressed', () => {
    const service = spectator.inject<SnapshotsService>(SnapshotsService);
    jest.spyOn(service, 'getAllHeaders').mockReturnValue(throwError('Oh no!'));
    spectator.click(spectator.query('.refresh-button'));

    spectator.click(spectator.query('.hide-error-button'));

    expect(spectator.component.showError).toBeFalsy();
  });
});
