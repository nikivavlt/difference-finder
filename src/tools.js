import path from 'path';
import fs from 'fs';

export const getExtension = (filePath) => path.extname(filePath).slice(1);

export const readFile = (filePath) => fs.readFileSync(path.resolve(filePath), 'utf8');
