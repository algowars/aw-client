import { Component } from '@angular/core';
import { LandingLayout } from "../shared/layouts/landing-layout/landing-layout";
import { LoginButton } from "../auth/login-button/login-button";
import { ButtonDirective } from "primeng/button";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [LandingLayout, LoginButton, ButtonDirective, RouterLink],
  templateUrl: './home.html',
})
export class Home {
}
