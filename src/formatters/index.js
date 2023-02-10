/* eslint-disable import/extensions */
import stringify from './stylish.js';
import createPlainString from './plain.js';

const fileFormats = {
  stylish: stringify,
  plain: createPlainString,
};

export default (data, format) => fileFormats[format](data);
