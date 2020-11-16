import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnapshotsService } from '@modules/snapshots/state/snapshots.service';
import { Snapshot } from '@shared/model/snapshot';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public headers: Snapshot[];
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

  openSnapshot(id: string): void {
    this.service.selectActive(id);
    this.router.navigate(['snapshots', id]);
  }

  hideError(): void {
    this.showError = false;
  }
}
