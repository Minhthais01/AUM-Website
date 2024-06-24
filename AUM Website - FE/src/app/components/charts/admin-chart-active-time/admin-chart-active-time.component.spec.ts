import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChartActiveTimeComponent } from './admin-chart-active-time.component';

describe('AdminChartActiveTimeComponent', () => {
  let component: AdminChartActiveTimeComponent;
  let fixture: ComponentFixture<AdminChartActiveTimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminChartActiveTimeComponent]
    });
    fixture = TestBed.createComponent(AdminChartActiveTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
