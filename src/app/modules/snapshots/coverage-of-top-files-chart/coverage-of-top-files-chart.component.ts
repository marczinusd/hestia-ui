import { Component, Input, OnInit } from '@angular/core';
import { FilesQuery } from '@modules/files/state/files.query';
import { SnapshotsQuery } from '@modules/snapshots/state/snapshots.query';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as _ from 'lodash';
import { Color, Label } from 'ng2-charts';
import { combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-coverage-of-top-files-chart',
  templateUrl: './coverage-of-top-files-chart.component.html',
  styleUrls: ['./coverage-of-top-files-chart.component.scss']
})
export class CoverageOfTopFilesChartComponent implements OnInit {
  @Input() numberOfFiles = 25;
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'bar';
  public lineChartPlugins = [];
  public lineChartOptions: ChartOptions = {
    scales: {
      xAxes: [
        {
          display: false
        }
      ]
    }
  };

  constructor(private snapshotsQuery: SnapshotsQuery, private filesQuery: FilesQuery) {}

  ngOnInit(): void {
    combineLatest([this.snapshotsQuery.activeId$, this.filesQuery.selectAll()])
      .pipe(
        filter(([id, files]) => {
          return id !== undefined && files !== undefined;
        })
      )
      .subscribe(([id, files]) => {
        const filesForCurrentId = _.chain(files)
          .filter((f) => f !== undefined && f.snapshotId === id && f.coveragePercentage > 0)
          .orderBy('lifetimeChanges', 'desc')
          .take(this.numberOfFiles)
          .value();

        this.lineChartLabels = filesForCurrentId.map((f) => f.path);
        this.lineChartData = [
          { data: filesForCurrentId.map((f) => f.coveragePercentage), label: 'Coverage %' },
          { data: filesForCurrentId.map((f) => f.lifetimeChanges), label: 'Lifetime changes' }
        ];
      });
  }
}
