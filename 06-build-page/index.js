const fs = require('fs/promises');
const path = require('path');

const srcStyles = path.join(__dirname, 'styles');
const srcAssets = path.join(__dirname, 'assets');
const srcComponents = path.join(__dirname, 'components');
const dest = path.join(__dirname, 'project-dist');
const destIndex = path.join(dest, 'index.html');
const destAssets = path.join(dest, 'assets');

const clearDir = async (dir) => {
  try {
    await fs.rm(dir, { recursive: true });
  }
  catch (err) {
    //console.log(err);
  }
  await makeDirectory(dir);
};

const createCSSBundle = async (src, dest, fileName) => {
  await fs.writeFile(path.join(dest, fileName), '');
  const files = await readFilesFromDir(src);
  files
    .filter((file) => {
      return path.extname(file.name) === '.css';
    })
    .forEach(async (file) => {
      let content = await readUTFFile(`${src}/${file.name}`);
      await fs.appendFile(`${dest}/${fileName}`, content);
    });
};

const createIndexFile = async (componentsSrc, indexDest) => {
  const files = await fs.readdir(componentsSrc);
  const contentWithComps = await files.reduce(async (result, file) => {
    const filePath = path.join(componentsSrc, file);
    const { name } = path.parse(filePath);
    const componentContent = await readUTFFile(filePath);
    const newResult = await result;
    return newResult.replace(`{{${name}}}`, componentContent);
    
  }, await readUTFFile(indexDest));
  await fs.writeFile(indexDest, contentWithComps, 'utf8');
};

function readdirWithFileTypes(src) {
  return fs.readdir(src, { withFileTypes: true });
}

function readUTFFile(src) {
  return fs.readFile(src, 'utf8');
}

function makeDirectory(src) {
  return fs.mkdir(src, { recursive: true });
}

async function readFilesFromDir(src) {
  const entries = await readdirWithFileTypes(src);
  return entries.filter((file) => {
    return file.isFile();
  });
}

async function copyAssets(src, dest) {
  await makeDirectory(dest);
  const assetsFiles = await readdirWithFileTypes(src);
  assetsFiles.forEach(async ({name: fileName}) => {
    await makeDirectory(path.join(dest, fileName));
    const content = await readFilesFromDir(path.join(src, fileName));
    content.forEach(async (content) => {
      const filePath = `${fileName}/${content.name}`;
      const copyWeg = path.join(dest, filePath);
      const mainWeg = path.join(src, filePath);
      await fs.copyFile(mainWeg, copyWeg);
    });
  });
}

async function init() {
  await clearDir(dest);
  await fs.copyFile(path.join(__dirname, 'template.html'), destIndex);
  await createIndexFile(srcComponents, destIndex);

  await createCSSBundle(srcStyles, dest,'style.css');

  await copyAssets(srcAssets, destAssets);
}

init();
