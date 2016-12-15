'use strict';

const path = require('path');

const webpack = require('webpack');

const {
  name,
  version,
} = require('./package');

module.exports = {

  context: __dirname,

  target: 'web',

  entry: './index.js',

  output: {
    path: __dirname,
    filename: '[name].js',
    library: [
      name.replace(/-[a-z]/g,
        (s) => s.slice(1).toUpperCase()
      ),
    ],
    libraryTarget: 'umd',
  },

  resolve: {
    extensions: [
      '',
      '.js',
    ],
    modulesDirectories: [
      'node_modules',
    ],
  },

  plugins: [
    new webpack.NoErrorsPlugin,
    new webpack.IgnorePlugin(/vertx/),
    new webpack.optimize.OccurenceOrderPlugin,
    new webpack.optimize.DedupePlugin,
    new webpack.optimize.AggressiveMergingPlugin,
    new webpack.BannerPlugin([
      `@license ${name}.js ver.${version} Copyright(c) 2016 sasa+1`,
      `https://github.com/sasaplus1-prototype/${name}.js`,
      'Released under the MIT license.',
    ].join('\n'), {
      options: {
        raw: false,
        entryOnly: true,
      },
    })
  ],

};