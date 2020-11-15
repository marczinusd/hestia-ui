import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FilesModule } from '@modules/files/files.module';
import { SnapshotsModule } from '@modules/snapshots/snapshots.module';
import { ButtonCellRendererComponent } from '@shared/components/button-cell-renderer/button-cell-renderer.component';
import { DashboardComponent } from '@shared/components/dashboard/dashboard.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { PageNotFoundComponent } from '@shared/components/page-not-found/page-not-found.component';
import { SnapshotViewComponent } from '@shared/components/snapshot-details/snapshot-view.component';

@NgModule({
  declarations: [HeaderComponent, PageNotFoundComponent, DashboardComponent, HeaderComponent, ButtonCellRendererComponent, SnapshotViewComponent],
  exports: [HeaderComponent],
  imports: [CommonModule, MatTabsModule, MatIconModule, MatToolbarModule, MatCardModule, MatButtonModule, SnapshotsModule, FilesModule]
})
export class SharedModule {}
