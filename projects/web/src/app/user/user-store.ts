import { signalStore, type, withComputed } from '@ngrx/signals';
import { eventGroup, Events, on, withEventHandlers, withReducer } from '@ngrx/signals/events';
import {
  setError,
  setLoaded,
  setLoading,
  withCallState,
  withImmutableState,
} from '@angular-architects/ngrx-toolkit';
import { User } from './user';
import { computed, inject } from '@angular/core';
import { exhaustMap, tap } from 'rxjs';
import { UserService } from './user-service';
import { mapResponse } from '@ngrx/operators';
import { ErrorService } from '../errors/error-service';
import { MessageService } from 'primeng/api';

export const userEvents = eventGroup({
  source: '[Global] User',
  events: {
    loadUser: type<void>(),
    loadUserSuccess: type<User | null>(),
    loadUserFailure: type<unknown>(),
  },
});

export interface UserStoreState {
  _user: User | null;
}

export const initialState: UserStoreState = {
  _user: null,
};

export const UserStore = signalStore(
  { providedIn: 'root', protectedState: false },
  withImmutableState(initialState),
  withCallState(),
  withComputed((store) => ({
    isAuthenticated: computed(() => !!store._user()),
  })),
  withReducer(
    on(userEvents.loadUser, () => setLoading()),
    on(userEvents.loadUserSuccess, ({ payload: user }) => [{ _user: user }, setLoaded()]),
    on(userEvents.loadUserFailure, ({ payload: error }) => [setError(error), setLoaded()]),
  ),
  withEventHandlers(
    (
      store,
      events = inject(Events),
      userService = inject(UserService),
      errorService = inject(ErrorService),
      messageService = inject(MessageService),
    ) => ({
      loadUser$: events.on(userEvents.loadUser).pipe(
        exhaustMap(() =>
          userService.getUser().pipe(
            mapResponse({
              next: (user: User | null) => {
                console.log('USER: ', user);
                return userEvents.loadUserSuccess(user);
              },
              error: (error: unknown) => userEvents.loadUserFailure(error),
            }),
          ),
        ),
      ),
      loadUserFailure$: events.on(userEvents.loadUserFailure).pipe(
        tap((event) => {
          console.error('Failed to load user:', event.payload);
          errorService.logError(event.payload);
          messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load user.',
          });
        }),
      ),
    }),
  ),
);
