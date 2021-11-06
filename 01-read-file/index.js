const fs = require('fs');
const path = require('path');

let p = path.join(__dirname, 'text.txt');

let readStream = fs.createReadStream(p, 'utf-8');
readStream.on('data', (chunk) => { console.log(chunk); });