import { inject, toObservable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Auth0Store } from '../auth/auth0-store';
import { UserStore } from './user-store';
import { combineLatest, map } from 'rxjs';

export const userGuard: CanActivateFn = (route, state) => {
  const authStore = inject(Auth0Store);
  const userStore = inject(UserStore);

  const isAuth0Authenticated$ = toObservable(authStore.isAuthenticated());
  const isUserAuthenticated$ = toObservable(userStore.isAuthenticated());

  return combineLatest(isAuth0Authenticated$, isUserAuthenticated$).pipe(
    map((isAuth0Authenticated, isUserAuthenticated) => isAuth0Authenticated && isUserAuthenticated),
  );
};
