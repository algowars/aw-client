import { TestBed } from '@angular/core/testing';
import { Auth0Store } from './auth0-store';
import { of } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

describe('Auth0Store', () => {
  test.each([true, false])(
    'isAuthenticated should be %s when user is authenticated',
    (isAuthenticated: boolean) => {
      const authServiceMock = {
        isAuthenticated$: of(isAuthenticated),
        user$: of(isAuthenticated ? { sub: '123' } : null),
      };

      TestBed.configureTestingModule({
        providers: [{ provide: AuthService, useValue: authServiceMock }],
      });

      const store = TestBed.inject(Auth0Store);

      expect(store.isAuthenticated()).toBe(isAuthenticated);
    },
  );
});
