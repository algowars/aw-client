export const environment = {
  production: true,
  apiServerUrl: '#{{API_SERVER_URL}}#',
  auth: {
    domain: '#{{AUTH_DOMAIN}}#',
    clientId: '#{{AUTH_CLIENT_ID}}#',
    authorizationParams: {
      redirect_uri: window.location.origin,
    },
  },
};
