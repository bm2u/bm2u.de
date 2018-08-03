const autoprefixer = require('autoprefixer');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintWebpackPlugin = require('stylelint-webpack-plugin');
const path = require('path');

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
        {loader: 'extract-loader'},
        {loader: 'css-loader'},
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [autoprefixer({grid: false})]
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
    new CopyWebpackPlugin([
      {from: 'src/**/*.html', to: '.', flatten: true}
    ]),
    new BrowserSyncPlugin({
        // BrowserSync options
        host: 'localhost',
        port: 3000,
        notify: false,
        open: false,
        proxy: 'http://localhost:3100/'
      },
      // plugin options
      {
        reload: true
      }),
    new StyleLintWebpackPlugin()
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
