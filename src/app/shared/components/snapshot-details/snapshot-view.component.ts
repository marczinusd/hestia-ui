import { Component, OnInit } from '@angular/core';

import { FilesQuery } from '@modules/files/state/files.query';

@Component({
  selector: 'app-snapshot-view',
  templateUrl: './snapshot-view.component.html',
  styleUrls: ['./snapshot-view.component.scss']
})
export class SnapshotViewComponent implements OnInit {
  public snapshotId: string;
  public selectedIndex = 0;

  constructor(private filesQuery: FilesQuery) {}

  ngOnInit(): void {
    this.filesQuery.selectActiveId().subscribe((id) => {
      if (id !== undefined) {
        this.selectedIndex = 1;
      }
    });
  }
}
