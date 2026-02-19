import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSetup } from './account-setup';
import { MessageService } from 'primeng/api';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0Store } from '../../auth/auth0-store';
import { ActivatedRoute } from '@angular/router';

describe('AccountSetup', () => {
  let component: AccountSetup;
  let fixture: ComponentFixture<AccountSetup>;

  beforeEach(async () => {
    const mockMessageService = {};
    const mockAuthService = {
      loginWithRedirect: vi.fn(),
      logout: vi.fn(),
    };
    const mockAuth0Store = {
      isAuthenticated: vi.fn().mockReturnValue(false),
    };

    await TestBed.configureTestingModule({
      imports: [AccountSetup],
      providers: [
        { provide: MessageService, useValue: mockMessageService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Auth0Store, useValue: mockAuth0Store },
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountSetup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
