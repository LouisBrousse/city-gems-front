// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
  ],
  typescript: {
    tsConfig: {
      compilerOptions: {
      }
    }
  },
  
  primevue: {
    options: {
      unstyled: true
    },
    importPT: { from: resolve(__dirname, './presets/aura/') }
  },
  
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || "http://localhost:3004/api",
    }
  }
});
