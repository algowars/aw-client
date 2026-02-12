import { Routes } from '@angular/router';
import { Home } from './home/home';
import { NotFound } from './not-found/not-found';
import { userGuard } from './user/user-guard';
import { noUserGuard } from './user/no-user-guard';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'account/setup',
    canActivate: [noUserGuard],
    loadComponent: () =>
      import('./account/account-setup/account-setup').then((m) => m.AccountSetup),
  },
  {
    path: 'auth/callback',
    canActivate: [userGuard],
    loadComponent: () => import('./auth/auth-callback/auth-callback').then((m) => m.AuthCallback),
  },
  {
    path: 'forbidden',
    loadComponent: () => import('./forbidden/forbidden').then((m) => m.Forbidden),
  },
  {
    path: '**',
    component: NotFound,
  },
];
