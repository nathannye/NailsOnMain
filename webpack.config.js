const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const IS_DEV = process.env.NODE_ENV === 'development';

const dirApp = path.resolve(__dirname, 'app');
const dirShared = path.resolve(__dirname, 'shared');
const dirStyles = path.resolve('styles');
const dirNode = 'node_modules';

module.exports = {
  entry: [path.join(dirApp, 'index.js'), path.join(dirStyles, 'index.sass')],

  resolve: {
    modules: [dirApp, dirStyles, dirShared, dirNode],
  },

  plugins: [
    new webpack.DefinePlugin({
      IS_DEV,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './shared',
          to: '',
          noErrorOnMissing: true,
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id.css]',
    }),
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          plugins: [
            ['gifsicle', { interlaced: true }],
            ['jpegtran', { progressive: true }],
            ['optipng', { optimizationLevel: 2 }],
          ],
        },
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.sass$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff2?|fnt|webp)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(glsl|frag|vert)$/,
        type: 'asset/resource',
        exclude: /node_modules/,
      },
      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'glslify-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
