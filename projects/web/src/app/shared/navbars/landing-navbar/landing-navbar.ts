import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginButton } from '../../../auth/login-button/login-button';
import { SignupButton } from '../../../auth/signup-button/signup-button';
import { ButtonDirective } from 'primeng/button';

@Component({
  selector: 'app-landing-navbar',
  imports: [RouterLink, LoginButton, SignupButton, ButtonDirective],
  templateUrl: './landing-navbar.html',
})
export class LandingNavbar {}
