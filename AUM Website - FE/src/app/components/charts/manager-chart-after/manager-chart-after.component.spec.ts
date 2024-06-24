import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerChartAfterComponent } from './manager-chart-after.component';

describe('ManagerChartAfterComponent', () => {
  let component: ManagerChartAfterComponent;
  let fixture: ComponentFixture<ManagerChartAfterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerChartAfterComponent]
    });
    fixture = TestBed.createComponent(ManagerChartAfterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
