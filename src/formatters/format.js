/* eslint-disable import/extensions */
import stringify from './stylish.js';

const fileFormats = {
  stylish: stringify,
};

export default (data, format) => fileFormats[format](data);
