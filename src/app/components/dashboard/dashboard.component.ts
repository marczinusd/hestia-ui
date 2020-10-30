import { Component, OnInit } from '@angular/core';
import { SnapshotsService } from '../../services/snapshots.service';
import { Router } from '@angular/router';
import { Snapshot } from '../../model/snapshot';
import { SelectionService } from '../../services/selection.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public headers: Snapshot[];
  public isLoading: boolean;
  public showError: boolean;

  constructor(private service: SnapshotsService, private selectionService: SelectionService, private router: Router) {}

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
    this.router.navigate(['snapshots', id]).then(() => {
      this.selectionService.selectSnapshot(id);
    });
  }

  hideError(): void {
    this.showError = false;
  }
}
