const fs = require('fs');
const path = require('path');
const folder = path.join(__dirname, 'secret-folder');

fs.readdir(folder, {withFileTypes: true}, (err, files) => {
  if(err) throw err;
  files.forEach((file) => {
    if(file.isFile()) {
      let filePath = path.join(folder, file.name);
      const {ext, name} = path.parse(filePath);
      fs.stat(filePath, (err, el) => {
        if(err) throw err;
        const size = el.size / 1024;
        console.log(name + ' - ' + ext.substr(1) + ' - ' + size + 'kb');
      });
    }
  });
});