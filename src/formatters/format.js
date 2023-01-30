/* eslint-disable import/extensions */
import createString from './stylish.js';

const fileFormats = {
  stylish: createString,
};

export default (data, format) => fileFormats[format](data);
