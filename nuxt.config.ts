// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["./modules/socket.js"],
  runtimeConfig: {
    // Private keys are only available on the server
    apiSecret: "123",
    // Public keys that are exposed to the client
    public: {
      wssUrl: process.env.WSS || "",
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
    },
  },
  css: ["~/assets/css/tailwind.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
