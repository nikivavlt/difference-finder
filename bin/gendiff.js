#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import fs from 'fs';

const program = new Command();

const genDiff = (objectOne, objectTwo) => {
  const arrayOne = (Object.entries(objectOne)).sort();
  const arrayTwo = (Object.entries(objectTwo)).sort();

  console.log('{');
  (Object.keys(objectOne).sort()).map((key) => {
    console.log(key);
    console.log(`${key}: ${objectOne.key}`);
    //if (!objectTwo.hasOwnProperty(key)) return console.log(`- ${key}: ${objectOne.key}`);
  });
  console.log('}');
};

/*arrayOne.map((keyOne) => {
  console.log(`KEY ONE: ${keyOne}`);
  if (!objectTwo.hasOwnProperty(keyOne[0])) return console.log(`- ${keyOne[0]}: ${keyOne[1]}`);
  arrayTwo.map((keyTwo) => {
    console.log(`COMPARE KEY TWO: ${keyTwo}`);
    if (keyOne[0] === keyTwo[0] && keyOne[1] === keyTwo[1]) console.log(`  ${keyOne[0]}: ${keyOne[1]}`);
    else if (keyOne[0] === keyTwo[0] && keyOne[1] !== keyTwo[1]) {
      console.log(`- ${keyOne[0]}: ${keyOne[1]}`);
      console.log(`+ ${keyTwo[0]}: ${keyTwo[1]}`);
      return;
    }
    if (!objectOne.hasOwnProperty(keyTwo[0])) console.log(`+ ${keyTwo[0]}: ${keyTwo[1]}`);
  });
});*/


program.name('gendiff')
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const pathOne = fs.readFileSync(filepath1, 'utf8');
    const fileOne = JSON.parse(pathOne);

    const pathTwo = fs.readFileSync(filepath2, 'utf8');
    const fileTwo = JSON.parse([pathTwo]);

    genDiff(fileOne, fileTwo);
  });

program.parse();

export default genDiff;
