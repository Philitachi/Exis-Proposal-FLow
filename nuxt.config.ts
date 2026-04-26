// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  ssr: false,
  app: {
    head: {
      title: 'ExSIS — Proposal Management Prototype',
      meta: [
        { name: 'description', content: 'ExSIS Extension Services Information System - Proposal Management Module Prototype' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  }
})
