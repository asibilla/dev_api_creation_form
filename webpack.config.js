'use strict';

const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const ENTRY = 'src/index.tsx';
const BUILD_DIR = 'dist';

/**
 * [exports description]
 * @return {[type]} [description]
 */
module.exports = (env={}) => {

  return {
    entry: [path.join(__dirname, ENTRY)],
    output: {
      filename: "index.js",
      path: path.join(__dirname, BUILD_DIR)
    },
    target: "web",
    module: {
      rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
        { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
        { test: /\.pug/, loaders: ['html-loader', 'pug-html-loader'] },
        {
          test: /\.scss$/,
          use: [
            { loader: "style-loader" },
            { loader: "css-loader" },
            { loader: "sass-loader" }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        "~" : path.join(__dirname)
      }
    },
    plugins: [
      new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        proxy: 'http://localhost:8080/'
      }),
      new HtmlWebpackPlugin({
        title: 'App Title',
        template: path.join(__dirname, 'src/index.html'),
      })
    ]
  };
};
