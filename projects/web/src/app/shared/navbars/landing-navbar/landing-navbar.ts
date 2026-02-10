import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonDirective, Button } from 'primeng/button';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0Store } from '../../../auth/auth0-store';

interface NavItems {
  label: string;
  path?: string;
  onClick?: () => void;
  variant?: Button['variant'];
  severity?: Button['severity'];
  size?: Button['size'];
}

@Component({
  selector: 'app-landing-navbar',
  imports: [RouterLink, ButtonDirective, Button],
  templateUrl: './landing-navbar.html',
})
export class LandingNavbar {
  private readonly auth = inject(AuthService);
  private readonly authStore = inject(Auth0Store);

  private authenticatedRoutes: NavItems[] = [
    {
      label: 'Log out',
      onClick: () => this.logOut(),
      size: 'small',
    },
  ];

  private unauthenticatedRoutes: NavItems[] = [
    {
      label: 'Log In',
      onClick: () => this.logIn(),
      variant: 'text',
      severity: 'secondary',
      size: 'small',
    },
    { label: 'Sign Up', onClick: () => this.signUp(), size: 'small' },
  ];

  protected navItems = computed<NavItems[]>(() => [
    { label: 'Home', path: '/', variant: 'text', severity: 'secondary', size: 'small' },
    {
      label: 'Problems',
      path: '/problems',
      variant: 'text',
      severity: 'secondary',
      size: 'small',
    },
    ...(this.authStore.isAuthenticated() ? this.authenticatedRoutes : this.unauthenticatedRoutes),
  ]);

  logIn() {
    this.auth.loginWithRedirect({
      appState: {
        target: '/auth/callback',
      },
      authorizationParams: {
        prompt: 'login',
      },
    });
  }

  signUp() {
    this.auth.loginWithRedirect({
      appState: {
        target: '/auth/callback',
      },
      authorizationParams: {
        prompt: 'login',
        screen_hint: 'signup',
      },
    });
  }

  logOut() {
    this.auth.logout({
      logoutParams: {
        returnTo: globalThis.window.document.location.origin,
      },
    });
  }
}
