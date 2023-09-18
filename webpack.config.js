const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const OfflinePlugin = require('@lcdp/offline-plugin');

module.exports = {
  context: path.resolve('src'),
  entry: './main.js',
  output: {
    path: path.resolve('dist'),
    publicPath: '/',
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new CopyWebpackPlugin([
      { from: 'favicons' }
    ]),
    new OfflinePlugin({
      externals: [
          '/',

          // Note that appcache does not support external URLs for offline usage;
          // use this list with caution.
          // The icon URLs must have the query params ordered alphabetically to work in the production environment.
          // Example: '?format=svg&source=ft-app&tint=%23FFFFFF%2C%23FFFFFF'
          'https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1:cross?format=svg&source=ft-app&tint=%23FFFFFF%2C%23FFFFFF',
          'https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1:pause?format=svg&source=ft-app&tint=%23FFFFFF%2C%23FFFFFF',
          'https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1:play?format=svg&source=ft-app&tint=%23FFFFFF%2C%23FFFFFF',
          'https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1:hamburger?format=svg&source=ft-app&tint=%23000000%2C%23000000',
          'https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1:search?format=svg&source=ft-app&tint=%23000000%2C%23000000',
          'https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1:refresh?format=svg&source=ft-app&tint=%23000000%2C%23000000',
          'https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1:audio?format=svg&source=ft-app&tint=%23FFFFFF%2C%23FFFFFF',
          'https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1:speech-left?format=svg&source=ft-app&tint=%2333302E%2C%2333302E',
          'https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1:plus?format=svg&source=o-icons&tint=%23990F3D%2C%23990F3D',
          'https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1:bookmark-outline?format=svg&source=ft-app&tint=%2366605C%2C%2366605C',
          'https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1:bookmark-outline?format=svg&source=ft-app&tint=%23FFFFFF%2C%23FFFFFF',
          'https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1:bookmark?format=svg&source=ft-app&tint=%23990F3D%2C%23990F3D',
          'https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1:audio?format=svg&source=ft-app&tint=%2366605C%2C%2366605C',

          // Pinned post icon
          'https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1:pin?format=svg&source=ft-app&tint=%23333333%2C%23333333',

          // Crosswords icons
          'https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1:list?format=svg&source=ft-app&tint=%23000000%2C%23000000',
          'https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1:list?format=svg&source=ft-app&tint=%23FFFFFF%2C%23FFFFFF',
          'https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1:eye-open?format=svg&source=ft-app&tint=%23000000%2C%23000000',
          'https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1:eye-open?format=svg&source=ft-app&tint=%23FFFFFF%2C%23FFFFFF',
          'https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1:more?format=svg&source=ft-app&tint=%23000000%2C%23000000',
          'https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1:more?format=svg&source=ft-app&tint=%23FFFFFF%2C%23FFFFFF',
          'https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1:arrow-down?format=svg&source=ft-app&tint=%23000000%2C%23000000',
          'https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1:arrow-left?format=svg&source=crosswords&tint=%23FFFFFF%2C%23FFFFFF',
          'https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1:arrow-left?format=svg&source=crosswords&tint=%230D7680%2C%230D7680',
          'https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1:arrow-right?format=svg&source=crosswords&tint=%23FFFFFF%2C%23FFFFFF',
          'https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1:arrow-right?format=svg&source=crosswords&tint=%230D7680%2C%230D7680',
      ],
      excludes: [
          '/dist/manifest.json',
          '/dist/manifest.html',
          '/dist/manifest.appcache',
          '/dist/manifest-buster.appcache',
          '/dist/sw.js',
          '**/*.LICENSE', // not cached for offline as they'll never be used there; also see /opensource.html
          '**/*.md', // exclude Markdown documentation files in some of the source folders
          '**/*.map', // generated JS / CSS map files
          '**/.*', // dot files
          '**/ios-upgrade-migration/*.png', // iOS migration is only available online
          '**/*.gz', // Generic issue preventer
          '**/*.ttf', // Was only needed for (currently) unsupported browsers
      ],
      //autoUpdate: autoUpdateInterval,
      //responseStrategy: responseStrategy,
      appShell: '/',
      cacheMaps: [
          {
              match: url => {
                  // Route requests for main pages (index pages, articles,
                  // etc) to the home page to allow for offline startups
                  // Also see the list in server/routes/legacy/index.js
                  if (
                      url.pathname.match(
                          /^\/(acccount-deletion|auth-login|cms|content|crossword|explore|fragment|globetrotter|home|index_page|intl|lex|manage_cookies|marketsdata|myft|newsfeed|personalise-details|portfolio|privacy|registration|search|stream|subscriber-login|subscription_error|tearsheet|top_level_article|topics|video)\//,
                      )
                  ) {
                      return new URL('/', url);
                  }
                  return url;
              },
              requestTypes: ['navigate', 'same-origin'],
          },
      ],
      AppCache: {
          // AppCache fallbacks are used when the server is unavailable or returning error
          // codes. For the app to load offline on any index page or deep-linked article page,
          // we need to request that all pages try to load from the home page if their network
          // request fails, defined as "'/': '/'". So if the app tries to start up from
          // `/content/long-uuid`, that fails offline, and instead falls back to loading from
          // `/`, which succeeds and boots up the app so it can load `/content/long-uuid` from
          // databases.
          // But by specifying the required fallback of `/`, *all* paths try to load from it -
          // including all API requests, which when offline or erroring will now return a
          // 200 OK response with the home page HTML. To avoid this we specify a fallback API
          // response for any path prefixed with /api, which still returns a 200 OK response
          // but is at least a JSON object with an error key that the javascript can check for.
          // This object is output with a "errorgeneratedby":"appcache-fallback" hint
          // to point back to here.
          FALLBACK: {
              '/': '/',
              '/api': '/fallback/api',
          },
          directory: '',
          publicPath: '/dist/',
          events: true,
      },
      ServiceWorker: {
          publicPath: '/sw.js',
          output: 'sw.js',
          events: true,
      }
    })
  ]
};