#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
const program = new Command();

import fs from 'fs';


program.name('gendiff')
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const pathOne = fs.readFileSync(filepath1, 'utf8');
    const fileOne = JSON.parse(pathOne);

    const pathTwo = fs.readFileSync(filepath2, 'utf8');
    const fileTwo = JSON.parse(pathTwo);

    console.log(fileOne);
    console.log(fileTwo);
  });

program.parse();
