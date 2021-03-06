import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Label } from 'ng2-charts';
import { combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';

import { FilesQuery } from '@modules/files/state/files.query';
import { ChartsBase } from '@modules/snapshots/charts-base/charts-base';
import { SnapshotsQuery } from '@modules/snapshots/state/snapshots.query';
import { File } from '@shared/model/file';

@Component({
  selector: 'app-change-range-bar-chart',
  templateUrl: './change-range-bar-chart.component.html',
  styleUrls: ['./change-range-bar-chart.component.scss']
})
export class ChangeRangeBarChartComponent extends ChartsBase implements OnInit {
  @Input() public barStepGranularity = 10;

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
        const filesForCurrentId = files.filter((f) => f.snapshotId === id);
        if (filesForCurrentId !== undefined && filesForCurrentId.length !== 0) {
          this.setChartData(filesForCurrentId);
        }
      });
  }

  private setChartData(filesForCurrentId: File[]): void {
    const labels: Label[] = [];
    const values = [];

    const maxLifetimeChanges = _.maxBy(filesForCurrentId, 'lifetimeChanges')?.lifetimeChanges;
    const ranges = _.chain([maxLifetimeChanges, ..._.rangeRight(0, maxLifetimeChanges, maxLifetimeChanges / this.barStepGranularity)]).value();

    for (let i = 1; i < ranges.length; i++) {
      values.push(
        filesForCurrentId.filter((f) => {
          return f.lifetimeChanges <= ranges[i - 1] && f.lifetimeChanges > ranges[i];
        }).length
      );
      labels.push(`${_.parseInt(ranges[i - 1].toString())}-${_.parseInt(ranges[i].toString())}`);
    }

    this.lineChartLabels = labels;
    this.lineChartData = [{ data: values, label: 'Number of files per range' }];
  }
}
