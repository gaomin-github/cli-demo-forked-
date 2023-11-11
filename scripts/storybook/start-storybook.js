const { execSync } = require('child_process');
const { logger } = require('../utils/log');

const PACKAGE = process.env.PACKAGE || 'btns';
const port = process.env.PORT || '6001';

(async() => {
  try {
    if (!PACKAGE) {
      throw new Error('no package is specified');
    }
    execSync(`cross-env PACKAGE=${PACKAGE} start-storybook - p ${port} --no-open`, { stdio: 'inherit'})
  } catch (e) {
    logger(PACKAGE).error(e);
  }
})();