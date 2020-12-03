import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { AgGridModule } from 'ag-grid-angular';
import { ChartsModule } from 'ng2-charts';

import { AuthorGroupsChartComponent } from './author-groups-chart/author-groups-chart.component';
import { ChangeRangeBarChartComponent } from './change-range-bar-chart/change-range-bar-chart.component';
import { CoverageOfTopFilesChartComponent } from './coverage-of-top-files-chart/coverage-of-top-files-chart.component';
import { SnapshotStatsLineChartComponent } from './snapshot-stats-line-chart/snapshot-stats-line-chart.component';

import { SnapshotChartsComponent } from '@modules/snapshots/snapshot-charts/snapshot-charts.component';
import { SnapshotStatisticsComponent } from '@modules/snapshots/snapshot-statistics/snapshot-statistics.component';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    AgGridModule.withComponents([]),
    ChartsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [SnapshotStatisticsComponent, SnapshotChartsComponent],
  declarations: [
    SnapshotChartsComponent,
    SnapshotStatisticsComponent,
    SnapshotStatsLineChartComponent,
    ChangeRangeBarChartComponent,
    ChangeRangeBarChartComponent,
    AuthorGroupsChartComponent,
    CoverageOfTopFilesChartComponent
  ]
})
export class SnapshotsModule {}
