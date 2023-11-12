const PACKAGE = process.env.PACKAGE || 'btns';
const path = require('path');
const { default: TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
// const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
const PROJECT_ROOT = path.resolve(__dirname, '../packages', PACKAGE);

module.exports = {
  framework: '@storybook/react',
  stories: [`../packages/${PACKAGE}/stories/**/*.stories.@(jsx|js|tsx|ts|mdx)`],
  core: {
    builder: 'webpack5',
  },
  typescript: {
    check: true,
    // fork-ts-checker-webpack-plugin 使用的是 6.5.x

    checkOptions: {
      typescript: {
        configFile: path.resolve(PROJECT_ROOT, 'tsconfig.json'),
      }
    }
  },
  webpackFinal: async (config) => {
    config.resolve.plugins = [
      new TsconfigPathsPlugin({
      configFile: path.resolve(PROJECT_ROOT, 'tsconfig.json'),
      }),
    ];
    return config;
  },
  babel: async options => {
    // https://github.com/storybookjs/storybook/issues/13834
    return {
      ...options,
      presets: [
        ['@babel/preset-env', { shippedProposals: true }],
        '@babel/preset-typescript',
        ['@babel/preset-react', { runtime: 'automatic' }],
      ],
      plugins: [['@babel/plugin-transform-typescript', { isTSX: true }], ...options.plugins],
    };
  },
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
}