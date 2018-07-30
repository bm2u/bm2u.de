const autoprefixer = require('autoprefixer');

module.exports = [{
  mode: 'production',
  entry: './src/scss/styles.scss',
  output: {
    // This is necessary for webpack to compile
    // But we never use style-bundle.js
    filename: 'style-bundle.js',
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