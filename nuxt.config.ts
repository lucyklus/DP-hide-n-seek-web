// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/eslint-module',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Inter: true,
        },
      },
    ],
    '@nuxtjs/i18n',
    'nuxt-icon',
    'nuxt-shiki',
  ],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      'postcss-import': {},
      'tailwindcss/nesting': {},
    },
  },
  runtimeConfig: {
    supabaseKey: process.env.SUPABASE_KEY,
    supabaseUrl: process.env.SUPABASE_URL,
  },
  i18n: {
    locales: ['en', 'sk'],
    defaultLocale: 'en',
  },
  shiki: {
    defaultTheme: 'one-dark-pro',
    bundledLangs: ['python', 'bash', 'markdown'],
  },
});
