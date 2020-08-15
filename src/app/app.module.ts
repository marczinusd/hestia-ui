import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { fakeBackendProvider } from './fakes/fake-backend-interceptor';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SnapshotDetailsComponent } from './components/snapshot-details/snapshot-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { API_BASE_URL } from './services/snapshots.service';
import { MatTabsModule } from '@angular/material/tabs';
import { SnapshotStatisticsComponent } from './components/snapshot-statistics/snapshot-statistics.component';
import { SnapshotTreeComponent } from './components/snapshot-tree/snapshot-tree.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatTableModule } from '@angular/material/table';
import { AgGridModule } from 'ag-grid-angular';
import { FileDetailsComponent } from './components/file-details/file-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotFoundComponent,
    DashboardComponent,
    SnapshotDetailsComponent,
    HeaderComponent,
    SnapshotStatisticsComponent,
    SnapshotTreeComponent,
    FileDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatTabsModule,
    MatTreeModule,
    MatTableModule,
    AgGridModule.withComponents([])
  ],
  providers: [fakeBackendProvider, { provide: API_BASE_URL, useFactory: () => environment.apiRoot }],
  bootstrap: [AppComponent]
})
export class AppModule {}
