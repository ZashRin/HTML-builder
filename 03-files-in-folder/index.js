const fs = require('fs/promises');
const path = require('path');
const folder = path.join(__dirname, 'secret-folder');

const readDir = async () => {
  const files = await fs.readdir(folder, {withFileTypes: true});
  files.filter((file) => {
    return file.isFile();
  }).forEach(async (file) => {
    let filePath = path.join(folder, file.name);
    const {ext, name} = path.parse(filePath);
    const {size} = await fs.stat(filePath);
    console.log(name + ' - ' + ext.substr(1) + ' - ' + size / 1024 + 'kb');
  });
};

readDir();

