import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAcademicYearComponent } from './update-academic-year.component';

describe('UpdateAcademicYearComponent', () => {
  let component: UpdateAcademicYearComponent;
  let fixture: ComponentFixture<UpdateAcademicYearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAcademicYearComponent]
    });
    fixture = TestBed.createComponent(UpdateAcademicYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
