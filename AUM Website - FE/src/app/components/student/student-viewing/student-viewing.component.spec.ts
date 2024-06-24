import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViewingComponent } from './student-viewing.component';

describe('StudentViewingComponent', () => {
  let component: StudentViewingComponent;
  let fixture: ComponentFixture<StudentViewingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentViewingComponent]
    });
    fixture = TestBed.createComponent(StudentViewingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
