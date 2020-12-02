import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';

import { FilesQuery } from '@modules/files/state/files.query';
import { ChartsBase } from '@modules/snapshots/charts-base/charts-base';
import { SnapshotsQuery } from '@modules/snapshots/state/snapshots.query';

@Component({
  selector: 'app-author-groups-chart',
  templateUrl: './author-groups-chart.component.html',
  styleUrls: ['./author-groups-chart.component.scss']
})
export class AuthorGroupsChartComponent extends ChartsBase implements OnInit {
  constructor(private snapshotsQuery: SnapshotsQuery, private filesQuery: FilesQuery) {
    super();
  }

  ngOnInit(): void {
    combineLatest([this.snapshotsQuery.activeId$, this.filesQuery.selectAll()])
      .pipe(
        filter(([id, files]) => {
          return id !== undefined && files !== undefined;
        })
      )
      .subscribe(([id, files]) => {
        const authorGroups = _.chain(files)
          .filter((f) => f !== undefined && f.snapshotId === id)
          .groupBy('lifetimeAuthors')
          .map((group, key) => ({ key: _.parseInt(key), length: group.length }))
          .orderBy('key', 'asc')
          .value();

        this.lineChartLabels = authorGroups.map((g) => g.key.toString());
        this.lineChartData = [{ data: authorGroups.map((g) => g.length), label: 'Number of files in group' }];
      });
  }
}
