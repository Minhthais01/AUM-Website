import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementArticlesComponent } from './management-articles.component';

describe('ManagementArticlesComponent', () => {
  let component: ManagementArticlesComponent;
  let fixture: ComponentFixture<ManagementArticlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagementArticlesComponent]
    });
    fixture = TestBed.createComponent(ManagementArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
