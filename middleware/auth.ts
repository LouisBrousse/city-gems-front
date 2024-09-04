import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';

export default defineNuxtRouteMiddleware(() => {
  const accessToken = useCookie('auth_token').value;

  if (!accessToken) {
    return navigateTo('/login');
  }
});

