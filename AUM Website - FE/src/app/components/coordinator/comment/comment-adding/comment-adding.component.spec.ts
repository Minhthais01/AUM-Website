import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentAddingComponent } from './comment-adding.component';

describe('CommentAddingComponent', () => {
  let component: CommentAddingComponent;
  let fixture: ComponentFixture<CommentAddingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentAddingComponent]
    });
    fixture = TestBed.createComponent(CommentAddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
