export const environment = {
  production: true,
  apiServerUrl: import.meta.env['NG_APP_API_SERVER_URL'] as string,
  auth: {
    domain: import.meta.env['NG_APP_AUTH_DOMAIN'] as string,
    clientId: import.meta.env['NG_APP_AUTH_CLIENT_ID'] as string,
    authorizationParams: {
      audience: import.meta.env['NG_APP_AUTH_AUDIENCE'] as string,
      redirect_uri: import.meta.env['NG_APP_AUTH_REDIRECT_URI'] as string,
    },
    httpInterceptor: {
      allowedList: [import.meta.env['NG_APP_API_SERVER_URL'] as string],
    },
    errorPath: '/auth/callback',
  },
};
