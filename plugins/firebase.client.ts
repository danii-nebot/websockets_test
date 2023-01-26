import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
  };
  const app = initializeApp(firebaseConfig);

  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth(app);

  nuxtApp.vueApp.provide("auth", auth);
  nuxtApp.provide("auth", auth);
});
