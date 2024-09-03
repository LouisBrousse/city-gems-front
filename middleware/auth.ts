import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';

export default defineNuxtRouteMiddleware(() => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return navigateTo('/login');
  }
});
