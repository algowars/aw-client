import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-account-setup-form',
  imports: [MessageModule, InputTextModule, ReactiveFormsModule, CardModule, Button],
  templateUrl: './account-setup-form.html',
})
export class AccountSetupForm {
  pr;
  protected readonly createAccountForm = new FormGroup({
    username: new FormControl('', Validators.required),
  });

  protected formSubmitted = false;

  onSubmit() {
    if (this.createAccountForm.valid) {
      // Handle form submission
    }
  }

  isInvalid(controlName: string) {
    const control = this.createAccountForm.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }
}
