/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import _ from 'lodash';
import { getFormat, readFile } from './tools.js';
import parse from './parsers.js';

const compareObjects = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  return _.union(keys1, keys2)
    .sort()
    .map((key) => {
      const object1HasKey = object1.hasOwnProperty(key);
      const object2HasKey = object2.hasOwnProperty(key);

      if (object1HasKey && object2HasKey) {
        if (object1[key] === object2[key]) return { name: key, value: object1[key], type: 'unchanged' };

        return {
          name: key, oldValue: object1[key], newValue: object2[key], type: 'changed',
        };
      }

      if (!object1HasKey && object2HasKey) return { name: key, value: object2[key], type: 'added' };

      return { name: key, value: object1[key], type: 'deleted' };
    });
};

const createString = (keysData) => {
  const openSymbol = '{';
  const closeSymbol = '}';

  const keysString = keysData.map((key) => {
    if (key.type === 'unchanged') return `    ${key.name}: ${key.value}`;

    if (key.type === 'changed') {
      return `  - ${key.name}: ${key.oldValue}\n  + ${key.name}: ${key.newValue}`;
    }

    if (key.type === 'added') return `  + ${key.name}: ${key.value}`;

    return `  - ${key.name}: ${key.value}`;
  });

  const newString = [openSymbol, ...keysString, closeSymbol].join('\n');
  return newString;
};

const genDiff = (filepath1, filepath2, format) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);

  const object1 = parse(file1, getFormat(filepath1));
  const object2 = parse(file2, getFormat(filepath2));

  const keysData = compareObjects(object1, object2);

  return createString(keysData);
};

export default genDiff;
