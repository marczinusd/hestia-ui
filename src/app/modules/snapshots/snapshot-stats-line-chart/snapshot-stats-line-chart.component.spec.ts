import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapshotStatsLineChartComponent } from './snapshot-stats-line-chart.component';

describe('SnapshotStatsLineChartComponent', () => {
  let component: SnapshotStatsLineChartComponent;
  let fixture: ComponentFixture<SnapshotStatsLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SnapshotStatsLineChartComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnapshotStatsLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
