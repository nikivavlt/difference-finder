/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

const compareObjects = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  const setOfKeys = [...new Set([...keys1, ...keys2])];
  setOfKeys.sort();

  const result = setOfKeys.map((key) => {
    const object1HasKey = object1.hasOwnProperty(key);
    const object2HasKey = object2.hasOwnProperty(key);

    if (object1HasKey && !object2HasKey) return { name: key, value: object1[key], type: 'deleted' };

    if (!object1HasKey && object2HasKey) return { name: key, value: object2[key], type: 'added' };

    if (object1HasKey && object2HasKey) {
      if (object1[key] === object2[key]) return { name: key, value: object1[key], type: 'unchanged' };
      return { name: key, oldValue: object1[key], newValue: object2[key], type: 'changed' };
    }
  });
  return result;
};

const createString = (setOfKeys) => {
  console.log('{');
  setOfKeys.filter((key) => {
    if (key.type === 'unchanged') return console.log(`    ${key.name}: ${key.value}`);

    if (key.type === 'changed') {
      console.log(`  - ${key.name}: ${key.oldValue}`);
      return console.log(`  + ${key.name}: ${key.newValue}`);
    }

    if (key.type === 'added') return console.log(`  + ${key.name}: ${key.value}`);

    if (key.type === 'deleted') return console.log(`  - ${key.name}: ${key.value}`);
  });
  console.log('}');
};

const genDiff = (filepath1, filepath2) => {
  const object1 = JSON.parse(fs.readFileSync(path.resolve(filepath1)));
  const object2 = JSON.parse(fs.readFileSync(path.resolve(filepath2)));

  const setOfKeys = compareObjects(object1, object2);
  const result = createString(setOfKeys);
  // const str = stringifyAndSort(obj3); stringifyAndSort - делает из объекта строку в заданном формате.
};

export default genDiff;
