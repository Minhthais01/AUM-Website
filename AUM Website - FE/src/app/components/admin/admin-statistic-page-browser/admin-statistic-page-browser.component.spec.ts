import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatisticPageBrowserComponent } from './admin-statistic-page-browser.component';

describe('AdminStatisticPageBrowserComponent', () => {
  let component: AdminStatisticPageBrowserComponent;
  let fixture: ComponentFixture<AdminStatisticPageBrowserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminStatisticPageBrowserComponent]
    });
    fixture = TestBed.createComponent(AdminStatisticPageBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
