import { Routes } from '@angular/router';
import { Home } from './home/home';
import { NotFound } from './not-found/not-found';
import { noUserGuard } from './user/no-user-guard';
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'account/setup',
    canActivate: [AuthGuard, noUserGuard],
    loadComponent: () =>
      import('./account/account-setup/account-setup').then((m) => m.AccountSetup),
  },
  {
    path: 'auth/callback',
    canActivate: [AuthGuard],
    loadComponent: () => import('./auth/auth-callback/auth-callback').then((m) => m.AuthCallback),
  },
  {
    path: 'forbidden',
    loadComponent: () => import('./forbidden/forbidden').then((m) => m.Forbidden),
  },
  {
    path: 'problems',
    loadComponent: () => import('./problems/problems').then((m) => m.Problems),
  },
  {
    path: '**',
    component: NotFound,
  },
];
