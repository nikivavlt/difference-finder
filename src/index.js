import { readFile, getExtension, compareObjects, createString } from './tools.js';
import parse from './parsers.js';

const genDiff = (filepath1, filepath2, format) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);

  const object1 = parse(file1, getExtension(filepath1));
  const object2 = parse(file2, getExtension(filepath2));

  const keysData = compareObjects(object1, object2);

  return createString(keysData);
};

export default genDiff;
