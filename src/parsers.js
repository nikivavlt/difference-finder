import yaml from 'js-yaml';

const formats = {
  json: JSON.parse,
  yml: yaml.safeLoad,
};

export default (data, format) => formats[format](data);
