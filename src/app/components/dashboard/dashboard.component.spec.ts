import { DashboardComponent } from './dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SnapshotsService } from '../../services/snapshots.service';
import { of, throwError } from 'rxjs';
import { SnapshotHeader } from '../../model/snapshot-header';
import { TestScheduler } from 'rxjs/testing';
import { mockProvider, Spectator, byText, createRoutingFactory } from '@ngneat/spectator/jest';
import { Router } from '@angular/router';

describe('DashboardComponent', () => {
  let spectator: Spectator<DashboardComponent>;
  let snapshotService: SnapshotsService;
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
  const testScheduler = new TestScheduler((actual, expected) => expect(actual).toStrictEqual(expected));

  beforeEach(() => {
    spectator = createComponent();
    snapshotService = spectator.inject<SnapshotsService>(SnapshotsService);
    spectator.detectComponentChanges();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should contain expected snapshots header', () => {
    expect(spectator.query('h2')).toHaveText('Your snapshots');
  });

  it('should render one snapshot header card', () => {
    const service = spectator.inject<SnapshotsService>(SnapshotsService);
    jest.spyOn(service, 'getAllHeaders').mockReturnValue(of([new SnapshotHeader(1, 'bla')]));

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
    testScheduler.run(({ cold }) => {
      jest.spyOn(service, 'getAllHeaders').mockReturnValue(cold('-b|'));
      spectator.click(spectator.query('.refresh-button'));

      expect(spectator.query('.spinner-container')).toBeTruthy();
    });
  });

  it('should hide progress spinner once loading is finished', () => {
    const service = spectator.inject<SnapshotsService>(SnapshotsService);
    testScheduler.run(({ cold }) => {
      jest.spyOn(service, 'getAllHeaders').mockReturnValue(cold('-b|', { b: [new SnapshotHeader(1, 'bla')] }));
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
    jest.spyOn(service, 'getAllHeaders').mockReturnValue(of([new SnapshotHeader(1, 'bla')]));
    const navigate = jest.spyOn(spectator.inject(Router), 'navigate');
    spectator.component.ngOnInit();
    spectator.detectComponentChanges();

    spectator.click(spectator.query('.open-snapshot-button'));

    expect(navigate).toHaveBeenCalledWith(['snapshots', 1]);
  });

  it('should hide loading errors if the popups hide button is pressed', () => {
    const service = spectator.inject<SnapshotsService>(SnapshotsService);
    jest.spyOn(service, 'getAllHeaders').mockReturnValue(throwError('Oh no!'));
    spectator.click(spectator.query('.refresh-button'));

    spectator.click(spectator.query('.hide-error-button'));

    expect(spectator.component.showError).toBeFalsy();
  });
});
