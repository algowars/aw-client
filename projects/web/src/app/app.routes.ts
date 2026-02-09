import { Routes } from '@angular/router';
import { Home } from './home/home';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'auth/callback',
    loadComponent: () => import('./auth/auth-callback/auth-callback').then((m) => m.AuthCallback),
  },
  {
    path: '**',
    component: NotFound,
  },
];
