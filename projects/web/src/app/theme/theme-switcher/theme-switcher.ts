import { Component } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-theme-switcher',
  imports: [Button],
  template: `<p-button label="Dark Mode" (onClick)="toggleDarkMode()" />`,
})
export class ThemeSwitcher {
  toggleDarkMode() {
    const element = document.querySelector('html');
    element?.classList.toggle('p-dark');
  }
}
