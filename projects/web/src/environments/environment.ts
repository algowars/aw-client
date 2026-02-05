declare const authDomain: string;
declare const clientId: string;
declare const apiServerUrl: string;

export const environment = {
  production: true,
  apiServerUrl: apiServerUrl,
  auth: {
    domain: authDomain,
    clientId: clientId,
    authorizationParams: {
      redirect_uri: window.location.origin,
    },
  },
};
