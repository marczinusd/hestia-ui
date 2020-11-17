import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as _ from 'lodash';
import { Color, Label } from 'ng2-charts';
import { combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';

import { FilesQuery } from '@modules/files/state/files.query';
import { ChartsBase } from '@modules/snapshots/charts-base/charts-base';
import { SnapshotsQuery } from '@modules/snapshots/state/snapshots.query';

@Component({
  selector: 'app-snapshot-stats-line-chart',
  templateUrl: './snapshot-stats-line-chart.component.html',
  styleUrls: ['./snapshot-stats-line-chart.component.scss']
})
export class SnapshotStatsLineChartComponent extends ChartsBase implements OnInit {
  constructor(private snapshotsQuery: SnapshotsQuery, private filesQuery: FilesQuery) {
    super();
    this.lineChartOptions = {
      scales: {
        xAxes: [
          {
            display: false
          }
        ]
      }
    };
  }

  ngOnInit(): void {
    combineLatest([this.snapshotsQuery.activeId$, this.filesQuery.selectAll()])
      .pipe(
        filter(([id, files]) => {
          return id !== undefined && files !== undefined;
        })
      )
      .subscribe(([id, files]) => {
        const filesForCurrentId = _.chain(files)
          .filter((f) => f !== undefined && f.snapshotId === id)
          .orderBy('lifetimeChanges', 'desc')
          .take(50)
          .value();

        this.lineChartLabels = filesForCurrentId.map((f) => f.path);
        this.lineChartData = [
          { data: filesForCurrentId.map((f) => f.lifetimeChanges), label: 'Lifetime changes' },
          { data: filesForCurrentId.map((f) => f.lifetimeAuthors), label: 'Lifetime authors' },
          { data: filesForCurrentId.map(() => _.meanBy(filesForCurrentId, 'lifetimeChanges')), label: 'Average no. of changes' }
        ];
      });
  }
}
