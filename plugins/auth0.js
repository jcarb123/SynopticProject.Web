import { createAuth0 } from "@auth0/auth0-vue";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const auth0 = createAuth0({
    domain: "dev-1mgxvq17vh1314n5.us.auth0.com",
    clientId: "sTaHxz4u8vyy6ZtCpns4L41WJwH5f4AE",
    authorizationParams: {
      redirect_uri: "https://purple-moss-06c10f903.4.azurestaticapps.net",
      audience: "https://thamco-orders.com",
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
