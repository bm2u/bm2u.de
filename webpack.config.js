const autoprefixer = require('autoprefixer');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const path = require('path');
const copywebpackplugin = require('copy-webpack-plugin');

module.exports = [{
  mode: 'production',
  entry: './src/scss/styles.scss',
  output: {
    // This is necessary for webpack to compile
    // But we never use style-bundle.js
    filename: 'style-bundle.js',
  },
  devServer: {
    port: 3100,
    hot: false,
    contentBase: path.join(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'css/styles.css',
          },
        },
        { loader: 'extract-loader' },
        { loader: 'css-loader' },
        { loader: 'postcss-loader',
          options: {
             plugins: () => [autoprefixer({ grid: false })]
          }
        },
        {
          loader: 'sass-loader',
          options: {
            includePaths: ['./node_modules']
          }
        },
      ]
    }]
  },
  plugins: [
    new copywebpackplugin([
      { from: 'src/**/*.html', to: '.', flatten: true }
    ]),
    new BrowserSyncPlugin({
        // browse to http://localhost:3000/ during development
        host: 'localhost',
        port: 3000,
        // proxy the Webpack Dev Server endpoint
        // (which should be serving on http://localhost:3100/)
        // through BrowserSync
        proxy: 'http://localhost:3100/'
      },
      // plugin options
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: true
      })
  ]
}];

// module.exports.push({
//   mode: 'production',
//   entry: './app.js',
//   output: {
//     filename: 'bundle.js'
//   },
//   module: {
//     rules: [{
//       test: /\.js$/,
//       use: [{
//           loader: 'babel-loader',
//           options: {
//             presets: [ 'env' ]
//           }
//       }]
//     }]
//   },
// });