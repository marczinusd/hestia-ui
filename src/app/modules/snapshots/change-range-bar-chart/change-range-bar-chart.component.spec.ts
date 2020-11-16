import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRangeBarChartComponent } from './change-range-bar-chart.component';

describe('ChangeRangeBarChartComponent', () => {
  let component: ChangeRangeBarChartComponent;
  let fixture: ComponentFixture<ChangeRangeBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeRangeBarChartComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeRangeBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
