const chalk = require('chalk');

function logger(namespace) {
  return {
    info: (msg, prefix = '') => {
      console.log(`${prefix}${chalk.cyan.bold(`[${namespace}]`)}`, msg);
    },
    error: (msg, prefix = '') => {
      console.log(`${prefix}${chalk.cyan.bold(`[${namespace}]`)}`, chalk.red(msg));
    },
    warn: (msg, prefix = '') => {
      console.log(`${prefix}${chalk.cyan.bold(`[${namespace}]`)}`, chalk.yellow(msg));
    },
  };
}

module.exports = {
  logger,
};