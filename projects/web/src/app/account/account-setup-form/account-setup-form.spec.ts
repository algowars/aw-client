import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSetupForm } from './account-setup-form';

describe('AccountSetupForm', () => {
  let component: AccountSetupForm;
  let fixture: ComponentFixture<AccountSetupForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountSetupForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountSetupForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
