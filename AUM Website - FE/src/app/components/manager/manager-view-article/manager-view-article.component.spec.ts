import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerViewArticleComponent } from './manager-view-article.component';

describe('ManagerViewArticleComponent', () => {
  let component: ManagerViewArticleComponent;
  let fixture: ComponentFixture<ManagerViewArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerViewArticleComponent]
    });
    fixture = TestBed.createComponent(ManagerViewArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
