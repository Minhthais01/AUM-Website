import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticBeforeClosingComponent } from './statistic-before-closing.component';

describe('StatisticBeforeClosingComponent', () => {
  let component: StatisticBeforeClosingComponent;
  let fixture: ComponentFixture<StatisticBeforeClosingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticBeforeClosingComponent]
    });
    fixture = TestBed.createComponent(StatisticBeforeClosingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
