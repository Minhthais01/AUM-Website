import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorChartComponent } from './coordinator-chart.component';

describe('CoordinatorChartComponent', () => {
  let component: CoordinatorChartComponent;
  let fixture: ComponentFixture<CoordinatorChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoordinatorChartComponent]
    });
    fixture = TestBed.createComponent(CoordinatorChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
