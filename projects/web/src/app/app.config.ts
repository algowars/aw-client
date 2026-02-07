import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { themePreset } from './theme';
import { UserStore } from './user/user-store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAuth0(environment.auth),
    MessageService,
    UserStore,
    providePrimeNG({
      theme: {
        preset: themePreset,
        options: {
          prefix: 'p',
          darkModeSelector: '.p-dark',
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng',
          },
          ripple: true,
        },
      },
    }),
  ],
};
