import { merge } from 'webpack-merge';
import path from 'path';
import config from './webpack.config.js';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const devConfig = merge(config, {
  mode: 'development',

  devtool: 'inline-source-map',

  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
    hot: true,
  },

  output: {
    path: path.resolve(__dirname, 'public'),
  },
});

export default devConfig;
