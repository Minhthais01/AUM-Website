import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatisticAtiveTimeComponent } from './admin-statistic-ative-time.component';

describe('AdminStatisticAtiveTimeComponent', () => {
  let component: AdminStatisticAtiveTimeComponent;
  let fixture: ComponentFixture<AdminStatisticAtiveTimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminStatisticAtiveTimeComponent]
    });
    fixture = TestBed.createComponent(AdminStatisticAtiveTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
