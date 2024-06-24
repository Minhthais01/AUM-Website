import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationViewingComponent } from './publication-viewing.component';

describe('PublicationViewingComponent', () => {
  let component: PublicationViewingComponent;
  let fixture: ComponentFixture<PublicationViewingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicationViewingComponent]
    });
    fixture = TestBed.createComponent(PublicationViewingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
