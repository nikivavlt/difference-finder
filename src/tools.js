import path from 'path';
import fs from 'fs';

const getExtension = (filePath) => path.extname(filePath).slice(1);

const readFile = (filePath) => fs.readFileSync(path.resolve(filePath), 'utf8');

const isObject = (data) => (typeof data === 'object' && data !== null);

export {
  getExtension,
  readFile,
  isObject,
};
