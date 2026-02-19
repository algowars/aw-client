import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSetupForm } from './account-setup-form';
import { AccountSetupStore } from '../account-setup/account-setup-store';

describe('AccountSetupForm', () => {
  let component: AccountSetupForm;
  let fixture: ComponentFixture<AccountSetupForm>;

  beforeEach(async () => {
    const mockUserStore = {
      hasError: () => false,
      loading: () => false,
    };
    await TestBed.configureTestingModule({
      imports: [AccountSetupForm],
      providers: [{ provide: AccountSetupStore, useValue: mockUserStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountSetupForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
