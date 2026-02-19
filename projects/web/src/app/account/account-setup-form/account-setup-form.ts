import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { Button } from 'primeng/button';
import { AccountSetupStore } from '../account-setup/account-setup-store';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-account-setup-form',
  imports: [MessageModule, InputTextModule, ReactiveFormsModule, JsonPipe, CardModule, Button],
  templateUrl: './account-setup-form.html',
})
export class AccountSetupForm {
  protected readonly accountSetupStore = inject(AccountSetupStore);

  protected formSubmitted = signal(false);

  readonly form = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  isInvalid(controlName: 'username'): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.touched || this.formSubmitted());
  }

  onSubmit() {
    this.formSubmitted.set(true);
    if (this.form.valid) {
      this.accountSetupStore.createAccount({ username: this.form.value.username! });
    }
  }
}
