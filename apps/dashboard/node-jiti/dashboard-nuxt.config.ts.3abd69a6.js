"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _viteSvgLoader = _interopRequireDefault(require("vite-svg-loader"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// https://v3.nuxtjs.org/api/configuration/nuxt.config
var _default = {
  modules: ['@pinia/nuxt', 'nuxt-vue3-google-signin'],
  googleSignIn: {
    clientId: '449255202885-cqnnl6mlvd9jos7tj535t0rg17neaq80.apps.googleusercontent.com'
  },
  axios: {
    proxy: true
  },
  watch: ['pages'],
  alias: {

    // TODO: styles: resolve(__dirname, '../../packages/style')
  }, vite: {
    plugins: [(0, _viteSvgLoader.default)()]
  },
  plugins: ['~/plugins/socketIO.ts']
};exports.default = _default; /* v7-55123cc4b475353a */