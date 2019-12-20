require('dotenv').config();

const path = require('path');
const withCSS = require('@zeit/next-css');
const Dotenv = require('dotenv-webpack');

module.exports = withCSS({
  env: {
    GRAPHQL_URL: process.env.GRAPHQL_URL,
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
          publicPath: '/_next/static/',
          outputPath: 'static/',
          name: '[name].[ext]',
        },
      },
    });
    config.plugins = config.plugins || [];
    config.plugins = [
      ...config.plugins,
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
        silent: true,
      }),
    ];

    return config;
  },
});
