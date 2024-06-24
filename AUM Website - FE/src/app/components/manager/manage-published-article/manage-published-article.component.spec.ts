import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePublishedArticleComponent } from './manage-published-article.component';

describe('ManagePublishedArticleComponent', () => {
  let component: ManagePublishedArticleComponent;
  let fixture: ComponentFixture<ManagePublishedArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagePublishedArticleComponent]
    });
    fixture = TestBed.createComponent(ManagePublishedArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
