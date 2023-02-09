/* eslint-disable import/extensions */
import stringify from './stylish.js';
import test from './plain.js';

const fileFormats = {
  stylish: stringify,
  plain: test,
};

export default (data, format) => fileFormats[format](data);
