#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
const program = new Command();


program.name('gendiff')
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')

program.parse();

const options = program.opts();
if (options.help) console.log(options);