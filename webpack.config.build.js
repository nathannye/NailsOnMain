import path from 'path';
import config from './webpack.config.js';
import { fileURLToPath } from 'url';
import { merge } from 'webpack-merge';
import config from './webpack.config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const buildCOnfig = merge(config, {
  mode: 'production',

  output: {
    path: path.join(__dirname, 'public'),
  },
});

export default buildConfig;
