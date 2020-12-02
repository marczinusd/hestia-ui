import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { combineLatest, concat, Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';

import { FilesQuery } from '@modules/files/state/files.query';
import { ChartsBase } from '@modules/snapshots/charts-base/charts-base';
import { SnapshotsQuery } from '@modules/snapshots/state/snapshots.query';

@Component({
  selector: 'app-coverage-of-top-files-chart',
  templateUrl: './coverage-of-top-files-chart.component.html',
  styleUrls: ['./coverage-of-top-files-chart.component.scss']
})
export class CoverageOfTopFilesChartComponent extends ChartsBase implements OnInit {
  @Input() initialDataCount = 25;
  public chartDataCountControl: FormControl;
  private dataCount: Observable<number>;

  constructor(private snapshotsQuery: SnapshotsQuery, private filesQuery: FilesQuery) {
    super();
    this.hideXAxis();
    this.chartDataCountControl = new FormControl(this.initialDataCount, Validators.min(1));
    this.dataCount = concat(of(this.initialDataCount), this.chartDataCountControl.valueChanges) as Observable<number>;
  }

  ngOnInit(): void {
    combineLatest([this.snapshotsQuery.activeId$, this.filesQuery.selectAll(), this.dataCount])
      .pipe(
        filter(([id, files]) => {
          return id !== undefined && files !== undefined;
        })
      )
      .subscribe(([id, files, count]) => {
        const filesForCurrentId = _.chain(files)
          .filter((f) => f !== undefined && f.snapshotId === id && f.coveragePercentage > 0)
          .orderBy('lifetimeChanges', 'desc')
          .take(count)
          .value();

        this.lineChartLabels = filesForCurrentId.map((f) => f.path);
        this.lineChartData = [
          { data: filesForCurrentId.map((f) => f.coveragePercentage), label: 'Coverage %' },
          { data: filesForCurrentId.map((f) => f.lifetimeChanges), label: 'Lifetime changes' }
        ];
      });
  }
}
