import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnapshotService } from '../../snapshot/state/snapshot.service';
import { Snapshot } from '../../snapshot/state/snapshot.model';
import { SnapshotQuery } from '../../snapshot/state/snapshot.query';
import { Observable, of } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public snapshots$: Observable<Snapshot[]>;
  public isLoading$: Observable<boolean>;
  public error: string;

  constructor(private service: SnapshotService, private query: SnapshotQuery, private router: Router) {}

  ngOnInit(): void {
    this.isLoading$ = this.query.isLoading$;
    this.snapshots$ = this.query.selectAll();
    if (!this.query.getHasCache()) {
      this.refreshSnapshots();
    }
  }

  refreshSnapshots(): void {
    this.service
      .loadSnapshots()
      .pipe(
        untilDestroyed(this),
        catchError((err) => {
          this.error = err;
          return of([]);
        })
      )
      .subscribe();
  }

  openSnapshot(id: string): void {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['snapshots', id]);
  }

  hideError(): void {
    this.error = '';
  }
}
