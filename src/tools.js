import _ from 'lodash';
import path from 'path';
import fs from 'fs';

export const getExtension = (filePath) => path.extname(filePath).slice(1);

export const readFile = (filePath) => fs.readFileSync(path.resolve(filePath), 'utf8');

const isContainsKey = (object, key) => _.has(object, key);

export const compareObjects = (object1, object2) => {
  const result = _.union(Object.keys(object1), Object.keys(object2))
    .sort()
    .map((key) => {
      if (isContainsKey(object1, key) && isContainsKey(object2, key)) {
        if (object1[key] === object2[key]) return { name: key, value: object1[key], type: 'unchanged' };

        return {
          name: key, oldValue: object1[key], newValue: object2[key], type: 'changed',
        };
      }

      if (!isContainsKey(object1, key) && isContainsKey(object2, key)) return { name: key, value: object2[key], type: 'added' };

      return { name: key, value: object1[key], type: 'deleted' };
    });

  return result;
};

export const createString = (keysData) => {
  const openSymbol = '{';
  const closeSymbol = '}';

  const keys = keysData.map((key) => {
    if (key.type === 'unchanged') return `    ${key.name}: ${key.value}`;

    if (key.type === 'changed') {
      return `  - ${key.name}: ${key.oldValue}\n  + ${key.name}: ${key.newValue}`;
    }

    if (key.type === 'added') return `  + ${key.name}: ${key.value}`;

    return `  - ${key.name}: ${key.value}`;
  });

  return [openSymbol, ...keys, closeSymbol].join('\n');
};
