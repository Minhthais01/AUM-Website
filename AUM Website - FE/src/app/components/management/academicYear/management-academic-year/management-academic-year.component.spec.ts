import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementAcademicYearComponent } from './management-academic-year.component';

describe('ManagementAcademicYearComponent', () => {
  let component: ManagementAcademicYearComponent;
  let fixture: ComponentFixture<ManagementAcademicYearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagementAcademicYearComponent]
    });
    fixture = TestBed.createComponent(ManagementAcademicYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
