import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentViewingComponent } from './comment-viewing.component';

describe('CommentViewingComponent', () => {
  let component: CommentViewingComponent;
  let fixture: ComponentFixture<CommentViewingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentViewingComponent]
    });
    fixture = TestBed.createComponent(CommentViewingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
