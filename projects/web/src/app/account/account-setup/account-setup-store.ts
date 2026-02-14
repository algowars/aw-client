import { inject } from '@angular/core';
import {
  patchState,
  signalMethod,
  signalStore,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { UserService } from '../../user/user-service';

import { injectDispatch } from '@ngrx/signals/events';
import { userEvents } from '../../user/user-store';
import { MessageService } from 'primeng/api';
import { ErrorService } from '../../errors/error-service';
import { Router } from '@angular/router';

export interface AccountSetupStoreState {
  username: string;
}

const initialState: AccountSetupStoreState = {
  username: '',
};

export const AccountSetupStore = signalStore(
  withState(initialState),

  withProps(() => ({
    _userService: inject(UserService),
    _userDispatch: injectDispatch(userEvents),
    _messageService: inject(MessageService),
    _errorService: inject(ErrorService),
    _router: inject(Router),
  })),

  withMethods((store) => ({
    updateUsername: signalMethod((username: string) => {
      patchState(store, {
        username,
      });
    }),
  })),
);
