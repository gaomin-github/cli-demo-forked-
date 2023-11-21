import path from 'path';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import progress from 'rollup-plugin-progress';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import filesize from 'rollup-plugin-filesize';

import pkg from './package.json';

const dependencies = (({ peerDependencies }) =>
  Object.keys(peerDependencies || {}).concat(['@babel/runtime-corejs3']))(pkg);
const extensions = [...DEFAULT_EXTENSIONS, '.ts', '.tsx'];

export default {
  input: `${__dirname}/src/index.ts`,
  output: [
    {
      file: 'lib/ejs/index.js',
      format: 'es',
      sourcemap: true,
      hoistTransitiveImports: false,
    },
    {
      file: 'lib/cjs/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
  ],
  external: (id) => {
    for (const dep of dependencies) {
      const reg = new RegExp(`^${dep}`);
      if (dep === id || reg.test(id)) return true;
    }
    return false;
  },
  plugins: [
    progress(),
    resolve({ browser: true }),
    commonjs(),
    typescript(),
    babel({
      extensions,
      babelHelpers: 'runtime',
      configFile: path.resolve(__dirname, '..', '..', 'babel.config.js'),
    }),
    filesize(),
  ],
};
