import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ThemeSwitcher } from './shared/theme/theme-switcher/theme-switcher';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ButtonModule, ThemeSwitcher],
  templateUrl: './app.html',
})
export class App {}
