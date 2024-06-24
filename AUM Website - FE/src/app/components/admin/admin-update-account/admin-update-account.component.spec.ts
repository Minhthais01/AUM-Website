import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateAccountComponent } from './admin-update-account.component';

describe('AdminUpdateAccountComponent', () => {
  let component: AdminUpdateAccountComponent;
  let fixture: ComponentFixture<AdminUpdateAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUpdateAccountComponent]
    });
    fixture = TestBed.createComponent(AdminUpdateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
