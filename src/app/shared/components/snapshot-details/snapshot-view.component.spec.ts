import { MatTabsModule } from '@angular/material/tabs';
import { createRoutingFactory, mockProvider, SpectatorRouting } from '@ngneat/spectator/jest';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';

import { FileDetailsComponent } from '@modules/files/file-details/file-details.component';
import { FilesQuery } from '@modules/files/state/files.query';
import { SnapshotChartsComponent } from '@modules/snapshots/snapshot-charts/snapshot-charts.component';
import { SnapshotStatisticsComponent } from '@modules/snapshots/snapshot-statistics/snapshot-statistics.component';
import { SnapshotViewComponent } from '@shared/components/snapshot-details/snapshot-view.component';

describe('SnapshotViewComponent', () => {
  let spectator: SpectatorRouting<SnapshotViewComponent>;
  const createComponent = createRoutingFactory({
    component: SnapshotViewComponent,
    providers: [
      mockProvider(FilesQuery, {
        activeId$: of('1')
      })
    ],
    declarations: [MockComponent(SnapshotStatisticsComponent), MockComponent(FileDetailsComponent), MockComponent(SnapshotChartsComponent)],
    imports: [MatTabsModule],
    params: { id: '4' }
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create component successfully', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should switch tabs if file selection changed', () => {
    spectator.component.ngOnInit();

    expect(spectator.component.selectedIndex).toBe(1);
  });
});
