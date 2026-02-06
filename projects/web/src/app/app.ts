import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { LoginButtonComponent } from './components/login-button/login-button';
import { LogoutButtonComponent } from './components/logout-button/logout-button';
import { ProfileComponent } from './components/profile/profile';
import { ButtonModule } from 'primeng/button';
import { ThemeSwitcher } from './theme/theme-switcher/theme-switcher';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    LoginButtonComponent,
    LogoutButtonComponent,
    ProfileComponent,
    ButtonModule,
    ThemeSwitcher,
  ],
  templateUrl: './app.html',
})
export class App {
  protected auth = inject(AuthService);
}
