import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-signup-button',
    imports: [Button],
  template: `
  <p-button (onClick)="signUp()" size="small">Sign Up</p-button>
  `
})
export class SignupButton {
  protected readonly auth = inject(AuthService);

  signUp() {
    this.auth.loginWithRedirect({ appState: { screen_hint: 'signup' } });
  }
}
