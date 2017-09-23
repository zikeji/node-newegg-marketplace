if (!process.argv[2] || !process.argv[3]) {
  console.log('Missing parameters!');
  console.log('Provide JSON file path (argument one) and output path (argument two).');
  process.exit(-1);
}

const jsonPath = process.argv[2];
const outPath = process.argv[3];

const fs = require('fs');
const Generator = require('./generator');

const data = JSON.parse(fs.readFileSync(jsonPath));

const generator = new Generator(data.sectionSchema);

fs.writeFileSync(outPath, generator.generate());

console.log('Done');

process.exit();
