const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'styles');
const dest = path.join(__dirname, 'project-dist');

fs.writeFile(`${dest}/bundle.css`, '', (err) => {
  if (err) {
    console.error(err);
  }
});

fs.readdir(src, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    if (file.isFile()) {
      if (path.extname(file.name) === '.css') {
        fs.readFile(path.join(src, file.name), 'utf8', (err, content) => {
          if (err) throw err;
          fs.appendFile(path.join(dest, 'bundle.css'), content, (err) => {
            if (err) throw err;
          });
        });
      }
    }
  });
});
