const childProcess = require('child_process');

function runCommandAsync(cmd, ...args) {
  return new Promise((resolve, reject) => {
    const child = childProcess.spawn(cmd, args, { stdio: 'inherit' });
    child.on('exit', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(code);
      }
    })
  })
}

module.exports = {
  runCommandAsync,
}