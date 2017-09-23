if (!process.argv[2] || !process.argv[3]) {
  console.log('Missing parameters!');
  console.log('Provide JSON file path (argument one) and output directory path (argument two).');
  process.exit(-1);
}

const jsonPath = process.argv[2];
const outDir = process.argv[3];

const fs = require('fs');

const deleteFolderRecursive = path => {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      const curPath = `${path}/${file}`;
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

const generateHeadClass = require('./generateHeadClass');
const generateSubClass = require('./generateSubClass');

if (fs.existsSync(outDir)) deleteFolderRecursive(outDir);
fs.mkdirSync(outDir);

const data = JSON.parse(fs.readFileSync(jsonPath));

const classes = Object.keys(data.classDef);

for (let i = 0; i < classes.length; i++) {
  fs.mkdirSync(`${outDir}/${classes[i]}`);
  fs.writeFileSync(`${outDir}/${classes[i]}/index.js`, generateSubClass(classes[i], data.classDef[classes[i]]));
}

fs.writeFileSync(`${outDir}/index.js`, generateHeadClass(classes));

console.log('Done');

process.exit();
