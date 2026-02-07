import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-signup-button',
    imports: [Button],
  template: `
  <p-button (onClick)="signUp()" styleClass="h-8 px-2.5 flex justify-center items-center">Sign Up</p-button>
  `
})
export class SignupButton {
  protected readonly auth = inject(AuthService);

  signUp() {
    this.auth.loginWithRedirect({ appState: { screen_hint: 'signup' } });
  }
}
