import { Component, OnInit } from '@angular/core';
import { FilesQuery } from '@modules/files/state/files.query';
import { SnapshotsQuery } from '@modules/snapshots/state/snapshots.query';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as _ from 'lodash';
import { Color, Label } from 'ng2-charts';
import { combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-author-groups-chart',
  templateUrl: './author-groups-chart.component.html',
  styleUrls: ['./author-groups-chart.component.scss']
})
export class AuthorGroupsChartComponent implements OnInit {
  constructor(private snapshotsQuery: SnapshotsQuery, private filesQuery: FilesQuery) {}

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
  lineChartOptions: ChartOptions = {};

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
          .map((group, key) => ({ key, length: group.length }))
          .orderBy('length', 'asc')
          .value();

        this.lineChartLabels = authorGroups.map((g) => g.key);
        this.lineChartData = [{ data: authorGroups.map((g) => g.length), label: 'Number of files in group' }];
      });
  }
}
