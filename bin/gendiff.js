#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import { Command } from 'commander/esm.mjs';
import pathConverter from './converter.js';

const program = new Command();

program.name('gendiff')
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => pathConverter(filepath1, filepath2));

program.parse();
