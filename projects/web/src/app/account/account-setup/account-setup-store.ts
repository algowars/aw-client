import { setError, setLoaded, setLoading, withCallState } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods } from '@ngrx/signals';
import { UserService } from '../../user/user-service';
import { mapResponse } from '@ngrx/operators';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

export const AccountSetupStore = signalStore(
  withCallState(),

  withComputed((store) => ({
    hasError: computed(() => !!store.error()),
  })),

  withMethods(
    (
      store,
      userService = inject(UserService),
      router = inject(Router),
      messageService = inject(MessageService),
    ) => ({
      createAccount: (form: { username: string }) => {
        patchState(store, setLoading());

        return userService
          .createAccount(form)
          .pipe(
            mapResponse({
              next: () => {
                patchState(store, setLoaded());
                messageService.add({
                  severity: 'success',
                  summary: 'Account Created',
                });
                router.navigate(['/dashboard']);
              },
              error: (error) => {
                if (error instanceof HttpErrorResponse) {
                  patchState(store, setError(error), setLoaded());
                  messageService.add({
                    severity: 'error',
                    summary: 'Account Creation Failed',
                    detail: error.error?.message || 'An unknown error occurred.',
                  });
                  return;
                }

                patchState(store, setError(error), setLoaded());
              },
            }),
          )
          .subscribe();
      },
    }),
  ),
);
