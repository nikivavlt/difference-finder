import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const fileFormats = {
  stylish: formatStylish,
  plain: formatPlain,
  json: JSON.stringify,
};

export default (data, format) => fileFormats[format](data);
