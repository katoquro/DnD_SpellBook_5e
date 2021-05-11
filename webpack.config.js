const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    // hack to use version with bundled template compiler
    alias: { vue: 'vue/dist/vue.esm.js' }
  },
  plugins: [
    new ESLintPlugin({
      lintDirtyModulesOnly: true,
      failOnError: false,
    }),
    new StylelintPlugin({
      files: '**/*.(less|css)',
      context: './src/style',
      lintDirtyModulesOnly: true,
      failOnError: false,
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
  ]
}
