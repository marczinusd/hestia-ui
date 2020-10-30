import { Component, OnInit } from '@angular/core';
import { SelectionService } from '../../services/selection.service';

@Component({
  selector: 'app-snapshot-details',
  templateUrl: './snapshot-details.component.html',
  styleUrls: ['./snapshot-details.component.scss']
})
export class SnapshotDetailsComponent implements OnInit {
  public snapshotId: string;
  public selectedIndex = 1;

  constructor(private selection: SelectionService) {}

  ngOnInit(): void {
    this.selection.selectedFileId.subscribe(() => {
      this.selectedIndex = 2;
    });
  }
}
