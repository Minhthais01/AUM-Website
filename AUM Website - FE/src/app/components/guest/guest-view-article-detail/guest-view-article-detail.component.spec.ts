import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestViewArticleDetailComponent } from './guest-view-article-detail.component';

describe('GuestViewArticleDetailComponent', () => {
  let component: GuestViewArticleDetailComponent;
  let fixture: ComponentFixture<GuestViewArticleDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestViewArticleDetailComponent]
    });
    fixture = TestBed.createComponent(GuestViewArticleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
