import stringify from './stylish.js';
import createPlainString from './plain.js';
import createJSON from './json.js';

const fileFormats = {
  stylish: stringify,
  plain: createPlainString,
  json: createJSON,
};

export default (data, format) => fileFormats[format](data);
