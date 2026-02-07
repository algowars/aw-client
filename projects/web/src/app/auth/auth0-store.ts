import {
  setError,
  setLoaded,
  setLoading,
  withCallState,
  withImmutableState,
} from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { signalStore, type, withHooks } from '@ngrx/signals';
import {
  eventGroup,
  Events,
  injectDispatch,
  on,
  withEventHandlers,
  withReducer,
} from '@ngrx/signals/events';
import { ErrorService } from '../errors/error-service';
import { userEvents } from '../user/user-store';
import { tap } from 'rxjs';
import { AuthService, User } from '@auth0/auth0-angular';

export interface Auth0State {
  user: User | null;
  isAuthenticated: boolean;
}

export const auth0Events = eventGroup({
  source: '[Global] Auth0',
  events: {
    authenticate: type<void>(),
    authenticateSuccess: type<Auth0State>(),
    authenticateFailure: type<unknown>(),
  },
});

export interface Auth0StoreState {
  _isAuthenticated: boolean;
}

export const initialState: Auth0StoreState = {
  _isAuthenticated: false,
};

export const Auth0Store = signalStore(
  { providedIn: 'root' },
  withImmutableState(initialState),
  withCallState(),
  withReducer(
    on(auth0Events.authenticate, () => setLoading()),
    on(auth0Events.authenticateSuccess, ({ payload: authState }) => [
      { _isAuthenticated: authState.isAuthenticated },
      setLoaded(),
    ]),
    on(auth0Events.authenticateFailure, ({ payload: error }) => setError(error)),
  ),
  withEventHandlers(
    (
      store,
      events = inject(Events),
      errorService = inject(ErrorService),
      userDispatch = injectDispatch(userEvents),
    ) => ({
      authenticateSuccess$: events.on(auth0Events.authenticateSuccess).pipe(
        tap((event) => {
          if (event.payload.isAuthenticated) {
            userDispatch.loadUser();
          }
        }),
      ),
      authenticateFailure$: events.on(auth0Events.authenticateFailure).pipe(
        tap((event) => {
          errorService.logError(event.payload);
        }),
      ),
    }),
  ),
  withHooks(() => ({
    onInit() {
      const auth = inject(AuthService);
      const auth0Dispatch = injectDispatch(auth0Events);
      auth0Dispatch.authenticate();

      auth.user$.subscribe((user) => {
        if (user) {
          auth0Dispatch.authenticateSuccess({ user, isAuthenticated: true });
        }
      });
    },
  })),
);
