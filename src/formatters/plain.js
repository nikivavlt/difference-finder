import { isObject } from '../tools.js';

const getValue = (objectValue) => {
  if (isObject(objectValue)) return '[complex value]';

  if (typeof objectValue === 'string') return `'${objectValue}'`;

  return objectValue;
};

const createPlainString = (data, parentName = '') => data
  .flatMap((element) => {
    const fullName = (parentName === '') ? element.name : `${parentName}.${element.name}`;

    switch (element.type) {
      case 'nested':
        return createPlainString(element.value, fullName);
      case 'unchanged':
        return null;
      case 'deleted':
        return `${fullName} was removed`;
      case 'added':
        return `${fullName} was added with value: ${getValue(element.value)}`;
      case 'changed':
        return `${fullName} was updated. From ${getValue(element.oldValue)} to ${getValue(element.newValue)}`;
      default:
        throw new Error(`Unknown element type: ${element.type}`);
    }
  })
  .filter((element) => element !== null)
  .join('\n');

export default createPlainString;
