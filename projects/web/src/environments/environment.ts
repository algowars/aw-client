export const environment = {
  production: true,
  apiServerUrl: import.meta.env['NG_APP_API_SERVER_URL'],
  auth: {
    domain: import.meta.env['NG_APP_AUTH_DOMAIN'],
    clientId: import.meta.env['NG_APP_AUTH_CLIENT_ID'],
    authorizationParams: {
      redirect_uri: import.meta.env['NG_APP_AUTH_CALLBACK_URL'],
    },
    httpInterceptor: {
      allowedList: [`${import.meta.env['NG_APP_API_SERVER_URL']}/api/*`],
    },
  },
};
