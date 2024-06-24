import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerChartApprovalRejectComponent } from './manager-chart-approval-reject.component';

describe('ManagerChartApprovalRejectComponent', () => {
  let component: ManagerChartApprovalRejectComponent;
  let fixture: ComponentFixture<ManagerChartApprovalRejectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerChartApprovalRejectComponent]
    });
    fixture = TestBed.createComponent(ManagerChartApprovalRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
