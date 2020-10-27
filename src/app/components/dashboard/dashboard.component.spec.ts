import { DashboardComponent } from './dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { of, throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { byText, createRoutingFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { Router } from '@angular/router';
import { SnapshotService } from '../../snapshot/state/snapshot.service';
import { HttpClient } from '@angular/common/http';
import { createSnapshot, Snapshot } from '../../snapshot/state/snapshot.model';
import { API_BASE_URL } from '../../services/snapshots.service';

describe('DashboardComponent', () => {
  let spectator: Spectator<DashboardComponent>;
  const createComponent = createRoutingFactory({
    component: DashboardComponent,
    imports: [MatCardModule, MatProgressSpinnerModule],
    providers: [
      { provide: API_BASE_URL, useFactory: () => 'url' },
      mockProvider(HttpClient, {
        get: () => of([createSnapshot(snapshot)])
      })
    ],
    mocks: [Router]
  });
  const snapshot: Snapshot = { files: [], atHash: '', name: '', id: '1' };
  const jestExpect = (actual, expected) => expect(actual).toStrictEqual(expected);

  beforeEach(() => {
    spectator = createComponent();
    spectator.detectComponentChanges();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should contain expected snapshots header', () => {
    expect(spectator.query('h2')).toHaveText('Your snapshots');
  });

  it('should render one snapshot header card', () => {
    // verify on scheduler
    const testScheduler = new TestScheduler(jestExpect);
    testScheduler.run(({ expectObservable }) => {
      spectator.component.ngOnInit();

      expectObservable(spectator.component.snapshots$).toBe('a', { a: [snapshot] });
    });
  });

  it('should show a refresh button', () => {
    expect(spectator.query(byText('Refresh snapshots'))).toHaveText('Refresh snapshots');
  });

  it('should fetch all snapshots if the refresh button is clicked', () => {
    const spy = jest.spyOn(spectator.inject(SnapshotService), 'loadSnapshots');

    spectator.click(spectator.query(byText('Refresh snapshots')));

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should show progress spinner while snapshots are loading', () => {
    const testScheduler = new TestScheduler(jestExpect);
    testScheduler.run(({ cold }) => {
      jest.spyOn(spectator.inject(HttpClient), 'get').mockReturnValue(cold('-b|'));
      spectator.click(spectator.query(byText('Refresh snapshots')));

      expect(spectator.query('.spinner-container')).toBeTruthy();
    });
  });

  it('should hide progress spinner once loading is finished', () => {
    const testScheduler = new TestScheduler(jestExpect);
    testScheduler.run(({ cold }) => {
      jest.spyOn(spectator.inject(HttpClient), 'get').mockReturnValue(cold('-b|', { b: [snapshot] }));
      spectator.click(spectator.query(byText('Refresh snapshots')));
      testScheduler.flush();
      spectator.detectComponentChanges();

      expect(spectator.query(byText('OK'))).toBeFalsy();
    });
  });

  it('should show error message if snapshots could not be loaded', () => {
    const errorMsg = 'Oh no!';
    jest.spyOn(spectator.inject(HttpClient), 'get').mockReturnValue(throwError(errorMsg));

    spectator.click(spectator.query(byText('Refresh snapshots')));

    expect(spectator.query(byText(`Failed to load snapshots: ${errorMsg}`))).toBeTruthy();
  });

  it('should redirect to correct route when open button is clicked on a snapshot', () => {
    spectator.component.ngOnInit();
    spectator.detectComponentChanges();

    spectator.click(spectator.query('.open-snapshot-button'));

    expect(spectator.inject(Router).navigate).toHaveBeenCalledWith(['snapshots', '1']);
  });

  it('should hide loading errors if the popups hide button is pressed', () => {
    jest.spyOn(spectator.inject(HttpClient), 'get').mockReturnValue(throwError('Oh no!'));
    spectator.click(spectator.query(byText('Refresh snapshots')));

    spectator.click(spectator.query(byText('OK')));

    expect(spectator.component.error).toBeFalsy();
  });
});
