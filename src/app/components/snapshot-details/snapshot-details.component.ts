import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnapshotsService } from '../../services/snapshots.service';
import { Snapshot } from '../../model/snapshot';
import { Observable } from 'rxjs';
import { SelectionService } from '../../services/selection.service';

@Component({
  selector: 'app-snapshot-details',
  templateUrl: './snapshot-details.component.html',
  styleUrls: ['./snapshot-details.component.scss']
})
export class SnapshotDetailsComponent implements OnInit {
  snapshot$: Observable<Snapshot>;
  public snapshotId: string;
  public selectedIndex: number;

  constructor(private route: ActivatedRoute, private service: SnapshotsService, private selection: SelectionService) {}

  ngOnInit(): void {
    this.snapshotId = this.route.snapshot.paramMap.get('id');
    this.snapshot$ = this.service.getSnapshotDetails(this.snapshotId);
    this.selectedIndex = 1;
    this.selection.selectedFileId.subscribe(() => {
      this.selectedIndex = 2;
    });
  }
}
