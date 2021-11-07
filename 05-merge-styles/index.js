const fs = require('fs/promises');
const path = require('path');

const src = path.join(__dirname, 'styles');
const dest = path.join(__dirname, 'project-dist');

const writeFile = async () => {
  await fs.writeFile(`${dest}/bundle.css`, '');
};

writeFile();

const createCSSBundle = async () => {
  const files = await fs.readdir(src, { withFileTypes: true });
  files.filter((file) => {
    return file.isFile() && path.extname(file.name) === '.css';
  }).forEach(async (file) => {
    const content = await fs.readFile(path.join(src, file.name), 'utf8');
    await fs.appendFile(path.join(dest, 'bundle.css'), content);
  });
};

createCSSBundle();
