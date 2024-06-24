import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticAfterClosingComponent } from './statistic-after-closing.component';

describe('StatisticAfterClosingComponent', () => {
  let component: StatisticAfterClosingComponent;
  let fixture: ComponentFixture<StatisticAfterClosingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticAfterClosingComponent]
    });
    fixture = TestBed.createComponent(StatisticAfterClosingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
