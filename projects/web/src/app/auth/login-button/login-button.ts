import { Component, inject, input } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Button, ButtonSeverity } from 'primeng/button';

@Component({
  selector: 'app-login-button',
  imports: [Button],
  template: `
  <p-button (onClick)="login()" [variant]="variant()" [severity]="severity()" [styleClass]="class()" [size]="size()">Sign In</p-button>
  `
})
export class LoginButton {
  protected readonly auth = inject(AuthService);
  readonly variant = input<"text" | "outlined" | undefined>();
  readonly severity = input<ButtonSeverity>();
  readonly class = input<string | undefined>();
  readonly size = input<"small" | "large" | undefined>();

  login() {
    this.auth.loginWithRedirect();
  }
}
