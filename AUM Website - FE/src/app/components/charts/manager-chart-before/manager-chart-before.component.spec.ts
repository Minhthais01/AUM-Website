import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerChartBeforeComponent } from './manager-chart-before.component';

describe('ManagerChartBeforeComponent', () => {
  let component: ManagerChartBeforeComponent;
  let fixture: ComponentFixture<ManagerChartBeforeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerChartBeforeComponent]
    });
    fixture = TestBed.createComponent(ManagerChartBeforeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
