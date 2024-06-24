import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorStatisticComponent } from './coordinator-statistic.component';

describe('CoordinatorStatisticComponent', () => {
  let component: CoordinatorStatisticComponent;
  let fixture: ComponentFixture<CoordinatorStatisticComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoordinatorStatisticComponent]
    });
    fixture = TestBed.createComponent(CoordinatorStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
