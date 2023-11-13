const fs = require('fs-extra');

const threshold = 1024 * 1024 * 10;

function byteToKB(byte, fix = 2) {
  return `${(byte / 1024).toFixed(fix)} k`;
}

const ENV_KEY = 'SKIP_OVERSIZE_FILES';

function checkFiles(files) {
  if (!files || !Array.isArray(files)) {
    return;
  }

  const oversizeFiles = [];

  files.forEach((file) => {
    if (!fs.existsSync(file)) {
      return;
    }
    const fileStat = fs.statSync(file);
    const fileSize = fileStat.size;
    if (fileSize >= threshold) {
      oversizeFiles.push({
        name: file,
        size: fileSize,
      });
    }
  });

  if (oversizeFiles.length) {
    oversizeFiles.forEach((file) => {
      console.error(`${file.size} ${file.name}`);
    });
    process.exitCode = 1;
  }
}

async function checkOversizeFiles() {
  try {
    if (process.env[ENV_KEY] && process.env[ENV_KEY].trim() === 'true') {
      console.info('skip lint oversize file');
    } else {
      const start = Date.now();
      const params = process.argv.slice(2);
      const files = params;
      checkFiles(files);
      console.info(`lint file size end: ${Date.now() - start}ms`);
    }
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}

checkOversizeFiles();
