#!/usr/bin/env node
/* eslint-disable no-console */
import { Command } from 'commander/esm';
import genDiff from '../src/index';

const program = new Command();

program.name('gendiff')
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2, program.format));
  });

program.parse();
