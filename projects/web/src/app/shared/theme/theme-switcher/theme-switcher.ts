import { Component } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-theme-switcher',
  imports: [Button],
  template: `<p-button
    [icon]="isDarkMode ? 'pi pi-sun' : 'pi pi-moon'"
    (onClick)="toggleDarkMode()"
    type="text"
  />`,
})
export class ThemeSwitcher {
  protected readonly htmlElement = document.querySelector('html');

  protected readonly isDarkMode = this.htmlElement?.classList.contains('p-dark');

  toggleDarkMode() {
    this.htmlElement?.classList.toggle('p-dark');
  }
}
