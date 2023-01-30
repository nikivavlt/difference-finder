#!/usr/bin/env node
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { program } from 'commander';
import genDiff from '../src/index.js';

program.name('gendiff')
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2, program.format));
  });

program.parse();
