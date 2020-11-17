import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockComponent } from 'ng-mocks';

import { AuthorGroupsChartComponent } from '@modules/snapshots/author-groups-chart/author-groups-chart.component';
import { ChangeRangeBarChartComponent } from '@modules/snapshots/change-range-bar-chart/change-range-bar-chart.component';
import { CoverageOfTopFilesChartComponent } from '@modules/snapshots/coverage-of-top-files-chart/coverage-of-top-files-chart.component';
import { SnapshotChartsComponent } from '@modules/snapshots/snapshot-charts/snapshot-charts.component';
import { SnapshotStatsLineChartComponent } from '@modules/snapshots/snapshot-stats-line-chart/snapshot-stats-line-chart.component';

describe('SnapshotChartsComponent', () => {
  let spectator: Spectator<SnapshotChartsComponent>;
  const createComponent = createComponentFactory({
    component: SnapshotChartsComponent,
    declarations: [
      MockComponent(SnapshotStatsLineChartComponent),
      MockComponent(AuthorGroupsChartComponent),
      MockComponent(ChangeRangeBarChartComponent),
      MockComponent(CoverageOfTopFilesChartComponent)
    ],
    imports: [MatCardModule],
    mocks: [HttpClient]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toExist();
  });
});
