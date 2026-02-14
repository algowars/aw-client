import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { Button } from 'primeng/button';
import { UserService } from '../../user/user-service';
import { injectDispatch } from '@ngrx/signals/events';
import { userEvents } from '../../user/user-store';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ErrorService } from '../../errors/error-service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-account-setup-form',
  imports: [MessageModule, InputTextModule, ReactiveFormsModule, CardModule, Button],
  templateUrl: './account-setup-form.html',
})
export class AccountSetupForm {
  private readonly userService = inject(UserService);
  private readonly userDispatch = injectDispatch(userEvents);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  private readonly errorService = inject(ErrorService);

  protected isPending = signal(false);

  protected readonly createAccountForm = new FormGroup({
    username: new FormControl('', Validators.required),
  });

  protected formSubmitted = false;

  onSubmit() {
    if (this.createAccountForm.valid) {
      this.isPending.set(true);
      this.userService
        .createAccount(this.createAccountForm.value.username!)
        .pipe(
          finalize(() => {
            this.isPending.set(false);
          }),
        )
        .subscribe({
          next: () => {
            this.userDispatch.loadUser();
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            console.log('ERROR: ', error);
            this.errorService.logError(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Account Creation Failed',
              detail: error.message || 'An unexpected error occurred.',
            });
          },
        });
    }
  }

  isInvalid(controlName: string) {
    const control = this.createAccountForm.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }
}
