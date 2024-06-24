import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestChartComponent } from './guest-chart.component';

describe('GuestChartComponent', () => {
  let component: GuestChartComponent;
  let fixture: ComponentFixture<GuestChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestChartComponent]
    });
    fixture = TestBed.createComponent(GuestChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
