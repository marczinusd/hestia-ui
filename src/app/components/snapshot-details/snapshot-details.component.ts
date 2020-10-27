import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnapshotsService } from '../../services/snapshots.service';
import { Snapshot } from '../../model/snapshot';

@Component({
  selector: 'app-snapshot-details',
  templateUrl: './snapshot-details.component.html',
  styleUrls: ['./snapshot-details.component.scss']
})
export class SnapshotDetailsComponent implements OnInit {
  snapshot: Snapshot;
  public snapshotId: string;

  constructor(private route: ActivatedRoute, private service: SnapshotsService) {}

  ngOnInit(): void {
    this.snapshotId = this.route.snapshot.paramMap.get('id');
    this.snapshot = this.service.getSnapshotDetails(this.snapshotId);
  }
}
