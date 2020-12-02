import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { combineLatest, concat, Observable, of } from 'rxjs';
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
  @Input() initialDataCount = 10;
  chartDataCountControl: FormControl;
  dataCount: Observable<number>;

  constructor(private snapshotsQuery: SnapshotsQuery, private filesQuery: FilesQuery) {
    super();
    this.hideXAxis();
    this.chartDataCountControl = new FormControl(this.initialDataCount, Validators.min(1));
    this.dataCount = concat(of(this.initialDataCount), this.chartDataCountControl.valueChanges) as Observable<number>;
  }

  ngOnInit(): void {
    combineLatest([this.snapshotsQuery.activeId$, this.filesQuery.selectAll(), this.dataCount])
      .pipe(filter(([id, files]) => id !== undefined && files !== undefined))
      .subscribe(([id, files, count]) => {
        const filesForCurrentId = _.chain(files)
          .filter((f) => f !== undefined && f.snapshotId === id)
          .orderBy('lifetimeChanges', 'desc')
          .take(count)
          .value();

        this.lineChartLabels = filesForCurrentId.map((f) => f.path);
        this.lineChartData = [
          { data: filesForCurrentId.map((f) => f.lifetimeChanges), label: 'Lifetime changes' },
          { data: filesForCurrentId.map((f) => f.lifetimeAuthors), label: 'Lifetime authors' },
          { data: filesForCurrentId.map((f) => f.lineCount), label: 'File length' },
          { data: filesForCurrentId.map(() => _.meanBy(filesForCurrentId, 'lifetimeChanges')), label: 'Average file length' },
          { data: filesForCurrentId.map(() => _.meanBy(filesForCurrentId, 'lineCount')), label: 'Average no. of changes' }
        ];
      });
  }
}
