const fs = require('fs/promises');
const path = require('path');

const src = path.join(__dirname, 'files');
const dest = path.join(__dirname, 'files-copy');

const makeDir = async () => {
  try {
    await fs.rm(dest, {recursive: true});
  }
  catch (err) {
    //console.log(err);
  }
  await fs.mkdir(dest, {recursive: true});
  const files = await fs.readdir(src, {withFileTypes: true});
  files.filter((file) => {
    return file.isFile();
  }).forEach(async (file) => {
    await fs.copyFile(path.join(src, file.name), path.join(dest, file.name));
  });
};

makeDir();


