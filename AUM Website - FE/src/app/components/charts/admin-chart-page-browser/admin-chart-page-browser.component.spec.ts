import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChartPageBrowserComponent } from './admin-chart-page-browser.component';

describe('AdminChartPageBrowserComponent', () => {
  let component: AdminChartPageBrowserComponent;
  let fixture: ComponentFixture<AdminChartPageBrowserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminChartPageBrowserComponent]
    });
    fixture = TestBed.createComponent(AdminChartPageBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
