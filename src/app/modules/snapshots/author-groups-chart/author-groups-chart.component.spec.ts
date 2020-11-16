import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorGroupsChartComponent } from './author-groups-chart.component';

describe('AuthorGroupsChartComponent', () => {
  let component: AuthorGroupsChartComponent;
  let fixture: ComponentFixture<AuthorGroupsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorGroupsChartComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorGroupsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
