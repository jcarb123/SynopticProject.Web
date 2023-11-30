import { createAuth0 } from "@auth0/auth0-vue";

export default defineNuxtPlugin((nuxtApp) => {
  const auth0 = createAuth0({
    domain: "dev-1mgxvq17vh1314n5.us.auth0.com",
    clientId: "sTaHxz4u8vyy6ZtCpns4L41WJwH5f4AE",
    authorizationParams: {
      redirect_uri: "https://zealous-mud-0b8b86403.4.azurestaticapps.net/",
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
