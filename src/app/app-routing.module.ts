import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '@shared/components/dashboard/dashboard.component';
import { PageNotFoundComponent } from '@shared/components/page-not-found/page-not-found.component';
import { SnapshotViewComponent } from '@shared/components/snapshot-details/snapshot-view.component';

const routes: Routes = [
  { path: 'snapshots/:id', component: SnapshotViewComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
