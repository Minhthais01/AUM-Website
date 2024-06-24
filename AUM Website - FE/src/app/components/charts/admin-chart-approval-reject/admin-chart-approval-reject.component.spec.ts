import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChartApprovalRejectComponent } from './admin-chart-approval-reject.component';

describe('AdminChartApprovalRejectComponent', () => {
  let component: AdminChartApprovalRejectComponent;
  let fixture: ComponentFixture<AdminChartApprovalRejectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminChartApprovalRejectComponent]
    });
    fixture = TestBed.createComponent(AdminChartApprovalRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
