import path from 'path';
import config from './webpack.config.js';
import { fileURLToPath } from 'url';
import { merge } from 'webpack-merge';
const { merge } = merge;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const buildConfig = merge(config, {
  mode: 'production',

  output: {
    path: path.join(__dirname, 'public'),
  },
});

export default buildConfig;
