import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerStatisticApproveRejectComponent } from './manager-statistic-approve-reject.component';

describe('ManagerStatisticApproveRejectComponent', () => {
  let component: ManagerStatisticApproveRejectComponent;
  let fixture: ComponentFixture<ManagerStatisticApproveRejectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerStatisticApproveRejectComponent]
    });
    fixture = TestBed.createComponent(ManagerStatisticApproveRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
