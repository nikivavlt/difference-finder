/* eslint-disable import/extensions */
import fs from 'fs';
import genDiff from '../src/index.js';

const pathConverter = (filepath1, filepath2) => {
  const fileOne = fs.readFileSync(filepath1, 'utf8');
  const objectOne = JSON.parse(fileOne);

  const fileTwo = fs.readFileSync(filepath2, 'utf8');
  const objectTwo = JSON.parse(fileTwo);

  genDiff(objectOne, objectTwo);
};

export default pathConverter;
