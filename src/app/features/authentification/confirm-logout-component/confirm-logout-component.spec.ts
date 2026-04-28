import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmLogoutComponent } from './confirm-logout-component';

describe('ConfirmLogoutComponent', () => {
  let component: ConfirmLogoutComponent;
  let fixture: ComponentFixture<ConfirmLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmLogoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmLogoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
