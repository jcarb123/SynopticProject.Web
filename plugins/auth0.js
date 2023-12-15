import { createAuth0 } from "@auth0/auth0-vue";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public;

  const auth0 = createAuth0({
    domain: config.AUTH0_DOMAIN,
    clientId: config.AUTH0_CLIENT_ID,
    authorizationParams: {
      redirect_uri: config.AUTH0_REDIRECT_URI,
      audience: config.AUTH0_AUDIENCE,
    },
  });

  if (process.client) {
    nuxtApp.vueApp.use(auth0);
  }

  addRouteMiddleware("auth", () => {
    if (process.client) {
      auth0.checkSession();
      if (!auth0.isAuthenticated.value) {
        auth0.loginWithRedirect({
          appState: {
            target: useRoute().path,
          },
        });
      }
    }
  });
});
