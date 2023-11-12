const { runCommandAsync }  = require('../../../scripts/utils/process');

(async function() {
  try {
    await runCommandAsync('pnpm', 'rollup','-c', `${__dirname}/../rollup.config.js`);
    // await runCommandAsync('pnpm', 'dts-bundle-generator', '-o', 'dist/index.d.ts', 'src/index.ts', '--no-banner');
  } catch(e) {
    throw e;
  }
})();