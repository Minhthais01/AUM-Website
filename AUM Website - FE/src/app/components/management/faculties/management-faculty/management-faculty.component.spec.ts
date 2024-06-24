import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementFacultyComponent } from './management-faculty.component';

describe('ManagementFacultyComponent', () => {
  let component: ManagementFacultyComponent;
  let fixture: ComponentFixture<ManagementFacultyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagementFacultyComponent]
    });
    fixture = TestBed.createComponent(ManagementFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
