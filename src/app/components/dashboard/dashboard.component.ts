import { Component, OnInit } from '@angular/core';
import { SnapshotsService } from '../../services/snapshots.service';
import { SnapshotHeader } from '../../model/snapshot-header';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public headers: SnapshotHeader[];
  public isLoading: boolean;
  public showError: boolean;

  constructor(private service: SnapshotsService, private router: Router) {}

  ngOnInit(): void {
    this.refreshSnapshots();
  }

  refreshSnapshots(): void {
    this.isLoading = true;
    this.headers = [];
    this.service.getAllHeaders().subscribe(
      (value) => {
        this.headers = value;
      },
      () => {
        this.showError = true;
      },
      () => (this.isLoading = false)
    );
  }

  openSnapshot(id: number): void {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['snapshots', id]);
  }

  hideError(): void {
    this.showError = false;
  }
}
