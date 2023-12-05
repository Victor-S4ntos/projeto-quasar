const { configure } = require('quasar/wrappers');

module.exports = configure(function (ctx) {
  return {
    framework: {
      plugins: [
        'Notify',
        'Dialog'
      ],
      config: {
        brand: {
          primary: '#ff6c22',
          secondary: '#26A69A',
          accent: '#9C27B0',

          dark: '#1d1d1d',
          darkPage: '#121212',

          positive: '#21BA45',
          negative: '#B31312',
          info: '#31CCEC',
          warning: '#F2C037'
        },
      }
    },

    eslint: {
      warnings: true,
      errors: true
    },

    boot: ['axios'],

    css: ['app.scss'],

    extras: [
      'roboto-font',
      'material-icons',
    ],

    build: {
      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node16',
      },

      vueRouterMode: 'history',
      env: {
        API_URL: ctx.dev
          ? 'http://localhost:3000/'
          : 'http://localhost:3000/'
      },

      devServer: {
        port: 8080,
        open: true
      },

      animations: [],

      ssr: {
        pwa: false,
        prodPort: 3000,
        middlewares: [
          'render',
        ],
      },

      pwa: {
        workboxMode: 'generateSW',
        injectPwaMetaTags: true,
        swFilename: 'sw.js',
        manifestFilename: 'manifest.json',
        useCredentialsForManifestTag: false,
      },

      capacitor: {
        hideSplashscreen: true,
      },

      electron: {
        inspectPort: 5858,
        bundler: 'packager',
        packager: {
          appId: 'quasar-project',
        },
        builder: {
          appId: 'quasar-project',
        },
      },

      bex: {
        contentScripts: ['my-content-script'],
      },
    },
  }
});
