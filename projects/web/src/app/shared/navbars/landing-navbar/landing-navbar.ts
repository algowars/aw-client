import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonDirective, Button } from 'primeng/button';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-landing-navbar',
  imports: [RouterLink, ButtonDirective, Button],
  templateUrl: './landing-navbar.html',
})
export class LandingNavbar {
  private readonly auth = inject(AuthService);

  logIn() {
    this.auth.loginWithRedirect();
  }

  signUp() {
    this.auth.loginWithRedirect({ appState: { screen_hint: 'signup' } });
  }

  logOut() {
    this.auth.logout({
      logoutParams: {
        returnTo: globalThis.window.document.location.origin,
      },
    });
  }
}
