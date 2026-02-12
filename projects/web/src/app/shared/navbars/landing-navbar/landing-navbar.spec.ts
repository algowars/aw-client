import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LandingNavbar } from './landing-navbar';
import { Auth0Store } from '../../../auth/auth0-store';
import { AuthService } from '@auth0/auth0-angular';
import { ActivatedRoute } from '@angular/router';

describe('LandingNavbar', () => {
  let component: LandingNavbar;
  let fixture: ComponentFixture<LandingNavbar>;
  let mockAuthService: {
    loginWithRedirect: ReturnType<typeof vi.fn>;
    logout: ReturnType<typeof vi.fn>;
  };
  let mockAuthStore: { isAuthenticated: ReturnType<typeof vi.fn> };

  const setup = async (isAuthenticated: boolean) => {
    TestBed.resetTestingModule();

    mockAuthService = {
      loginWithRedirect: vi.fn(),
      logout: vi.fn(),
    };

    mockAuthStore = {
      isAuthenticated: vi.fn().mockReturnValue(isAuthenticated),
    };

    await TestBed.configureTestingModule({
      imports: [LandingNavbar],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Auth0Store, useValue: mockAuthStore },
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingNavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  };

  beforeEach(async () => {
    await setup(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render authenticated nav item when user is authenticated', async () => {
    await setup(true);

    const authButtons = fixture.debugElement.queryAll(By.css('p-button'));
    const labels = authButtons
      .map((button) => button.nativeElement.textContent.trim())
      .filter((text) => text.length > 0);

    expect(labels).toContain('Log out');
  });

  it('should render unauthenticated nav items when user is not authenticated', async () => {
    await setup(false);

    const authButtons = fixture.debugElement.queryAll(By.css('p-button'));
    const labels = authButtons
      .map((button) => button.nativeElement.textContent.trim())
      .filter((text) => text.length > 0);

    expect(labels).toContain('Log In');
    expect(labels).toContain('Sign Up');
  });

  it('should read a router link nav item from the template', async () => {
    await setup(true);

    const navLinks = fixture.debugElement.queryAll(By.css('a[pbutton]'));
    const labels = navLinks
      .map((link) => link.nativeElement.textContent.trim())
      .filter((text) => text.length > 0);

    expect(labels).toContain('Home');
  });
});
