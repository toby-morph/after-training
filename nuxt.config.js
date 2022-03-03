// import fs from 'fs'
// import path from 'path'
// import axios from 'axios'

export default {
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'en',
    },
    title: 'Digitrial - Digital Participant Information Sheets by Morph',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Digitrial - Digital Participant Information Sheets by Morph',
      },
      {
        hid: 'theme-color',
        name: 'theme-color',
        content: '#085680',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'manifest', href: '/manifest.json' },
      // { rel: 'apple-touch-icon', href: '/icon.png' },
      {
        rel: 'apple-touch-icon',
        href: 'icons/apple-touch-icon.png',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/utilities.scss',
    '@/assets/css/theme.scss',
    // '@/assets/css/typography.scss',
    '@/assets/css/app-layout.scss',
    '@/assets/css/animations.scss',
    '@/assets/css/forms.scss',
    '@/assets/css/buttons.scss',
    '@/assets/css/pit.scss',
  ],

  // these stylesheets should contain mixins only
  styleResources: {
    scss: ['@/assets/css/forms.scss'],
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/utils.js', mode: 'client' },
    // { src: '@/plugins/vue-fullscreen.js', mode: 'client' },
    { src: '~/plugins/vue-announcer.js', mode: 'client' },
    { src: '@/plugins/vue-uuid.js', mode: 'client' },
    { src: '@/plugins/vue-vimeo-player.js', mode: 'client' },
    { src: '~/plugins/persistedState.client.js', mode: 'client' },
    { src: '@/plugins/morph-cookies.js', mode: 'client' },
    // { src: '~/plugins/vue-axe.js', mode: 'client' },
    // { src: '@/plugins/swRegistration', mode: 'client' },
    { src: '@/plugins/pi-tool.js', mode: 'client' },
    // { src: '@/plugins/vue-skip-to.js', mode: 'client' },
    { src: '@/plugins/vuelidate.js', mode: 'client' },
    { src: '@/plugins/vue-scrollto.js', mode: 'client' },
    // https://github.com/nuxt/nuxt.js/issues/240#issuecomment-326893386
    { src: '~/plugins/nuxt-client-init.js', mode: 'client' },
    { src: '~/plugins/viewport-height.js', mode: 'client' },
    { src: '~/plugins/animations.js', mode: 'client' },
    { src: '~/plugins/gtag' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // '@/modules/fetch-data',
    '@nuxtjs/svg',
    '@nuxtjs/style-resources',
    // '@nuxt/image'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['@nuxtjs/auth-next', '@nuxtjs/axios', 'nuxt-polyfill', '@nuxtjs/markdownit'],

  markdownit: {
    runtime: true, // Support `$md()`
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    // extractCSS: true,
  },

  loading: {
    color: 'var(--primary)',
    height: '5px',
    throttle: 0,
    duration: 5000,
  },

  // image: {
  //   provider: 'static',
  //   // dir: 'assets/img',
  //   screens: {
  //     xs: 360,
  //     sm: 640,
  //     md: 768,
  //     lg: 1024,
  //     xl: 1280,
  //     xxl: 1536,
  //     '2xl': 1536
  //   },
  // },

  generate: {
    fallback: true,
    // Current solution requires steps to be added manually here
    // routes: [
    //   '/steps/1',
    //   '/steps/2',
    //   '/steps/3',
    //   '/steps/4',
    //   '/steps/5',
    //   '/steps/6',
    //   '/steps/7',
    //   '_nuxt',
    // ],
  },

  router: {
    middleware: ['auth', 'steps-version', 'steps-completed', 'current-page', 'current-step'],
  },

  publicRuntimeConfig: {
    fullScreen: process.env.FULLSCREEN,
    largeText: process.env.LARGE_TEXT,
    amplitudeEnabled: process.env.AMPLITUDE_ENABLED,
    amplitudeApiKey: process.env.AMPLITUDE_API_KEY,
    cookieControlEnabled: process.env.COOKIE_CONTROL_ENABLED,
    useNuxtImageModule: process.env.USE_NUXT_IMAGE_MODULE,
    offlineEnabled: process.env.OFFLINE_ENABLED,
    versions: process.env.VERSIONS,
    wpHeadlessUrl: process.env.WP_HEADLESS_URL,
    siteUrl: process.env.URL,
    siteAdminEmail: process.env.SITE_ADMIN_EMAIL
  },

  polyfill: {
    features: [
      {
        require: 'intersection-observer',
        detect: () => 'IntersectionObserver' in window,
      },
    ],
  },

  tailwindcss: {
    exposeConfig: true,
  },

  // https://stackoverflow.com/questions/53346558/vue-devtools-always-disabled-with-nuxt-js
  vue: {
    config: {
      productionTip: false,
      devtools: true,
    },
  },

  // https://nuxtjs.org/docs/features/transitions
  layoutTransition: {
    name: 'fade-in',
    mode: 'out-in'
  },

  auth: {
    plugins: ['~/plugins/appUser.js'],
    redirect: {
      login: '/login',
      logout: '/login',
      home: false,
    },
    strategies: {
      local: {
        token: {
          property: 'data.token',
        },
        user: {
          property: '',
        },
        endpoints: {
          login: {
            url: process.env.WP_HEADLESS_URL + '/wp-json/jwt-auth/v1/token',
            method: 'post',
            propertyName: 'data.token',
          },
          logout: false,
          user: {
            url: process.env.WP_HEADLESS_URL + '/wp-json/wp/v2/users/me/',
            method: 'get',
          },
          // user: false,
          tokenRequired: true,
          tokenType: 'Bearer',
          globalToken: true,
          // localStorage: false,
        },
      },
    },
  },
}
