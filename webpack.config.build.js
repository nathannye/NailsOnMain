import merge from 'webpack-merge';
import path from 'path';
import config from './webpack.config.js';

const buildCOnfig = merge(config, {
  mode: 'production',

  output: {
    path: path.join(__dirname, 'public'),
  },
});

export default buildConfig;
