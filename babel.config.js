/**
 * @type {import("@babel/core").ConfigFunction}
 */
 module.exports = function (api) {
  const envName = api.env();
  const esm = envName === 'esm'; // from BABEL_ENV
  const cjs = envName === 'cjs'; // from BABEL_ENV
  return {
    babelrcRoots: ['applications/*', 'packages/*'],
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
          modules: cjs ? 'commonjs' : 'auto',
        },
      ],
      '@babel/preset-typescript',
      '@babel/preset-react',
    ],
    plugins: [
      // umd 不使用runtime
      envName && [
        '@babel/plugin-transform-runtime',
        {
          regenerator: false,
        },
      ],
      esm && ['babel-plugin-add-import-extension', { extension: 'mjs' }],
    ].filter(Boolean),
  };
};
