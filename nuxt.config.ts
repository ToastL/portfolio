// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', "@nuxtjs/strapi"],
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            "white": "#fff",
            "black": "#000",
            "primary": {
              light: "#fff",
              DEFAULT: "#fff",
              dark: "#222"
            },
            "secondary": {
              light: "#eee",
              DEFAULT: "#eee",
              dark: "#333"
            }
          }
        }
      },
      darkMode: "class"
    }
  },
  strapi: {
    url: process.env.STRAPI_URL || 'http://localhost:1337',
    prefix: '/api',
    admin: '/admin',
    version: 'v4',
    cookie: {},
    cookieName: 'strapi_jwt',
    devtools: true
  }
})