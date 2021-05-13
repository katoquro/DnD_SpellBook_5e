const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    vendor: ['jquery', 'file-saver', 'vue', 'vue-styled-components'],
    spellDb: {
      import: './src/data/SpellDb.ts',
      dependOn: ['vendor']
    },
    app: {
      import: './src/index.jsx',
      dependOn: ['vendor', 'spellDb']
    }
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
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
        test: /\.(js|jsx|tsx)?$/,
        exclude: /src\/data/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      },
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
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  plugins: [
    new ESLintPlugin({
      lintDirtyModulesOnly: true,
      failOnError: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      buildDate: new Date().toISOString()
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
