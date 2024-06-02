import svgLoader from 'vite-svg-loader'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default {
  modules: ['@pinia/nuxt', 'nuxt-vue3-google-signin'],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, user-scalable=no'
    }
  },
  googleSignIn: {
    clientId: '449255202885-cqnnl6mlvd9jos7tj535t0rg17neaq80.apps.googleusercontent.com'
  },
  axios: {
    proxy: true
  },
  watch: ['pages'],
  alias: {},
  vite: {
    plugins: [svgLoader()]
  },
  runtimeConfig: {
    public: {
      baseURL: 'http://192.168.1.217:5001'
    }
  },
  plugins: ['~/plugins/socketIO.ts'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  css: [
    '~/assets/css/main.css',
    '@nevo/style/variables.scss',
    '@nevo/style/dark.scss',
    '@nevo/style/variables.scss'
  ]
}
