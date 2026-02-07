import { Component, inject, input } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-login-button',
  imports: [Button],
  template: `
  <p-button (onClick)="login()" [variant]="variant()" [styleClass]="class()">Sign In</p-button>
  `
})
export class LoginButton {
  protected readonly auth = inject(AuthService);
  readonly variant = input<"text" | "outlined" | undefined>();
  readonly class = input<string | undefined>();

  login() {
    this.auth.loginWithRedirect();
  }
}
