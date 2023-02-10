import { readFile, getExtension } from './tools.js';
import parse from './parsers.js';
import compareObjects from './compare.js';
import formatData from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);

  const object1 = parse(file1, getExtension(filepath1));
  const object2 = parse(file2, getExtension(filepath2));

  const keysData = compareObjects(object1, object2);

  return formatData(keysData, formatName);
};

export default genDiff;
