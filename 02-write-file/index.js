const fs = require('fs');
const path = require('path');
const process = require('process');
const readLine = require('readline');

let p = path.join(__dirname, 'text.txt');
let content = '';

fs.writeFile(p, content, (err) => {
  if(err) {
    console.error(err);
  }
});

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (e) => new Promise(resolve => rl.question(e, resolve));

const steps = {
  start: async () => {
    return steps.inputText();
  },

  inputText: async () => {
    const text = await question('Input text:');
    if(text !== 'exit') {
      content = text;
      steps.write();
      return steps.inputText();
    }
    else return steps.endInput();
  },

  endInput: async () => {
    console.log('Input ended');
    return steps.end();
  },

  end: async () => {
    rl.close();
  },

  write: async () => {
    fs.appendFile(p, content, (err) => {
      if(err) {
        console.log(err);
      }
    });
  }
};

steps.start();

process.stdin.on('keypress', (e, key) => {
  if(key && key.name === 'c' && key.ctrl) {
    console.log('\nInput ended on ctrl + c');
    steps.end();
  }
});