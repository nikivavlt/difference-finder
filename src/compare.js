/* eslint-disable padded-blocks */
import _ from 'lodash';
import { isObject } from './tools.js';

const isContainsKey = (object, key) => Object.prototype.hasOwnProperty.call(object, key);

const compareObjects = (object1, object2) => {
  const keys = new Set([
    ...Object.keys(object1),
    ...Object.keys(object2),
  ]);

  return _.sortBy([...keys])
    .map((key) => {
      if (!isContainsKey(object1, key)) return { name: key, value: object2[key], type: 'added' };

      if (!isContainsKey(object2, key)) return { name: key, value: object1[key], type: 'deleted' };

      if (isObject(object1[key]) && isObject(object2[key])) {
        const children = compareObjects(object1[key], object2[key]);
        return { name: key, value: children, type: 'nested' };
      }

      return (object1[key] === object2[key])
        ? { name: key, value: object1[key], type: 'unchanged' }
        : {
          name: key, oldValue: object1[key], newValue: object2[key], type: 'changed',
        };
    });
};

export default compareObjects;
