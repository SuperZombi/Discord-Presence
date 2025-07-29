const fs = require('fs-extra');
const path = require('path');

async function prepareWebFolder() {
  const webDir = path.resolve(__dirname, 'web');
  const webDevDir = path.resolve(__dirname, 'web_dev');
  await fs.ensureDir(webDir);

  await fs.copyFile(path.join(webDevDir, 'index.html'), path.join(webDir, 'index.html'));
  await fs.copy(path.join(webDevDir, 'assets'), path.join(webDir, 'assets'), { overwrite: true });
  await fs.copy(path.join(webDevDir, 'locales'), path.join(webDir, 'locales'), { overwrite: true });
  await fs.copy(path.join(webDevDir, 'react'), path.join(webDir, 'react'), { overwrite: true });
}
prepareWebFolder().catch(console.error);
