export const environment = {
    production: false,
    apiServerUrl: "http://localhost:6000",
    auth: {
        domain: "",
        clientId: "",
        authorizationParams: {
            redirect_uri: window.location.origin
        }
    }
};
