import { Component } from '@angular/core';
import { LandingLayout } from '../../shared/layouts/landing-layout/landing-layout';
import { AccountSetupForm } from '../account-setup-form/account-setup-form';

@Component({
  selector: 'app-account-setup',
  imports: [LandingLayout, AccountSetupForm],
  templateUrl: './account-setup.html',
})
export class AccountSetup {}
