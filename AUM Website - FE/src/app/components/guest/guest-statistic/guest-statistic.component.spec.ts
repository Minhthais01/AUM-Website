import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestStatisticComponent } from './guest-statistic.component';

describe('GuestStatisticComponent', () => {
  let component: GuestStatisticComponent;
  let fixture: ComponentFixture<GuestStatisticComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestStatisticComponent]
    });
    fixture = TestBed.createComponent(GuestStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
