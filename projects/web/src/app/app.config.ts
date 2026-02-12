import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AuthHttpInterceptor, provideAuth0 } from '@auth0/auth0-angular';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { themePreset } from './theme';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { customAuthInterceptor } from './auth/custom-auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAuth0(environment.auth),
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    provideHttpClient(withInterceptors([customAuthInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    MessageService,
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
