import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { SnapshotChartsComponent } from '@modules/snapshots/snapshot-charts/snapshot-charts.component';
import { SnapshotStatisticsComponent } from '@modules/snapshots/snapshot-statistics/snapshot-statistics.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [CommonModule, MatTabsModule, AgGridModule.withComponents([])],
  exports: [SnapshotStatisticsComponent, SnapshotChartsComponent],
  declarations: [SnapshotChartsComponent, SnapshotStatisticsComponent]
})
export class SnapshotsModule {}
