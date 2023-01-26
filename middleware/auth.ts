// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user } = useFirebase();
  if (!user.value) {
    console.error("not allowed!");
    return navigateTo("/"); // "/login"
  }
});
